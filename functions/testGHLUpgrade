import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    
    try {
        // Check if user is admin
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Admin access required' 
            }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { testEmail } = await req.json();
        
        if (!testEmail) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Test email is required' 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Check if the user exists
        const testUser = await base44.asServiceRole.entities.User.filter({ email: testEmail });
        if (testUser.length === 0) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: `User with email ${testEmail} not found` 
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Simulate the GHL webhook payload that would be sent when a user gets the launchunlimited tag
        const simulatedWebhookPayload = {
            contact: {
                email: testEmail,
                firstName: testUser[0].first_name || 'Test',
                lastName: testUser[0].last_name || 'User',
                tags: ['The Business Minds Member', 'launchunlimited'] // This is the key tag
            }
        };

        console.log('Simulating GHL webhook with payload:', JSON.stringify(simulatedWebhookPayload, null, 2));

        // Call our webhook function directly
        const webhookResponse = await base44.asServiceRole.functions.invoke('goHighLevelWebhook', simulatedWebhookPayload);
        
        // The webhookResponse from invoke can be a complex object. We only want the data part.
        const responseData = webhookResponse.data || webhookResponse;
        console.log('Webhook response data:', responseData);

        // Check if the user was actually upgraded
        const updatedUser = await base44.asServiceRole.entities.User.filter({ email: testEmail });
        const finalUserState = updatedUser[0];

        return new Response(JSON.stringify({ 
            success: true,
            message: 'Upgrade test completed',
            webhook_response: responseData, // FIX: Only return the data, not the whole response object
            user_before: {
                email: testUser[0].email,
                subscription_level: testUser[0].subscription_level,
                total_ai_uses_remaining: testUser[0].total_ai_uses_remaining
            },
            user_after: {
                email: finalUserState.email,
                subscription_level: finalUserState.subscription_level,
                total_ai_uses_remaining: finalUserState.total_ai_uses_remaining
            },
            upgrade_successful: finalUserState.subscription_level === 'launchpad'
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error testing GHL upgrade:", error);
        return new Response(JSON.stringify({ 
            success: false,
            error: error.message,
            stack: error.stack
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});