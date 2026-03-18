import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    
    try {
        const webhookData = await req.json();
        console.log('Received GHL webhook:', JSON.stringify(webhookData, null, 2));
        
        // Extract contact information from the webhook
        const contactEmail = webhookData.contact?.email || webhookData.email;
        const contactTags = webhookData.contact?.tags || webhookData.tags || [];
        const firstName = webhookData.contact?.firstName || webhookData.firstName || '';
        const lastName = webhookData.contact?.lastName || webhookData.lastName || '';
        
        if (!contactEmail) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'No email found in webhook data' 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        console.log(`Processing webhook for email: ${contactEmail}`);
        console.log(`Contact tags:`, contactTags);
        
        // Check if this contact has upgrade tags
        const hasLaunchpadTag = contactTags.some(tag => 
            tag.toLowerCase().includes('launchunlimited')
        );
        
        const hasBusinessHQTag = contactTags.some(tag => 
            tag.toLowerCase().includes('businesshq')
        );
        
        if (!hasLaunchpadTag && !hasBusinessHQTag) {
            console.log('Contact does not have upgrade tags, skipping upgrade');
            return new Response(JSON.stringify({ 
                success: true, 
                message: 'No upgrade needed - contact does not have upgrade tags' 
            }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        // Find the user in our system
        const users = await base44.asServiceRole.entities.User.filter({ email: contactEmail });
        
        if (users.length === 0) {
            console.log(`User with email ${contactEmail} not found in our system`);
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'User not found' 
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        const user = users[0];
        console.log(`Found user: ${user.full_name} (${user.email})`);
        
        // Determine target subscription level
        const targetLevel = hasBusinessHQTag ? 'business_hq' : 'launchpad';
        
        // Check if user is already at this level or higher
        if (user.subscription_level === targetLevel || 
            (targetLevel === 'launchpad' && user.subscription_level === 'business_hq')) {
            console.log(`User already has ${user.subscription_level} subscription`);
            return new Response(JSON.stringify({ 
                success: true, 
                message: `User already has ${user.subscription_level} subscription` 
            }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        // Upgrade the user's subscription
        const updateData = {
            subscription_level: targetLevel,
            total_ai_uses_remaining: -1 // Unlimited AI uses
        };

        // Update first/last name if we got better data from GHL
        if (firstName && lastName) {
            updateData.first_name = firstName;
            updateData.last_name = lastName;
        }

        await base44.asServiceRole.entities.User.update(user.id, updateData);
        
        console.log(`Successfully upgraded user ${contactEmail} to ${targetLevel} subscription`);
        
        // Create appropriate notification
        const welcomeMessage = targetLevel === 'business_hq' 
            ? '🚀 Welcome to The Business HQ! You now have unlimited access to all premium features including advanced business tools, priority support, and exclusive mastermind access.'
            : '🎉 Welcome to The Launchpad! You now have unlimited access to all premium features including unlimited AI assistance.';

        await base44.asServiceRole.entities.Notification.create({
            recipient_email: user.email,
            type: 'general',
            title: targetLevel === 'business_hq' ? '🚀 Welcome to The Business HQ!' : '🎉 Welcome to The Launchpad!',
            message: welcomeMessage,
            link: '/Profile'
        });

        return new Response(JSON.stringify({ 
            success: true, 
            message: `User ${contactEmail} successfully upgraded to ${targetLevel} subscription` 
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Error processing GHL webhook:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: error.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});