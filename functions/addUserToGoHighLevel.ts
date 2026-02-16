import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { event, data } = await req.json();

        // Only process user creation events
        if (event?.type !== 'create' || event?.entity_name !== 'User') {
            return Response.json({ success: true, message: 'Not a user creation event' });
        }

        const user = data;
        if (!user || !user.email || !user.full_name) {
            return Response.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const ghlApiKey = Deno.env.get('GOHIGHLEVEL_API_KEY');
        const ghlLocationId = Deno.env.get('GOHIGHLEVEL_LOCATION_ID');

        if (!ghlApiKey || !ghlLocationId) {
            console.error('GoHighLevel credentials not configured');
            return Response.json({ error: 'GoHighLevel not configured' }, { status: 500 });
        }

        // Create contact in GoHighLevel
        const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ghlApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locationId: ghlLocationId,
                email: user.email,
                firstName: user.full_name.split(' ')[0] || user.full_name,
                lastName: user.full_name.split(' ').slice(1).join(' ') || '',
                tags: ['Business Minds Member', 'App Signup'],
                source: 'Business Minds App',
                customFields: [
                    {
                        key: 'subscription_level',
                        value: user.subscription_level || 'free'
                    },
                    {
                        key: 'entrepreneurship_stage',
                        value: user.entrepreneurship_stage || 'not_set'
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GoHighLevel API error:', errorText);
            return Response.json({ error: 'Failed to add to GoHighLevel', details: errorText }, { status: 500 });
        }

        const ghlContact = await response.json();

        // Send welcome notification to user
        try {
            await base44.asServiceRole.functions.invoke('sendNotification', {
                recipient_email: user.email,
                type: 'general',
                title: '🎉 Welcome to Business Minds!',
                message: 'You now have access to our community! Check your email for GoHighLevel community access.',
                link: '/TheCommunity'
            });
        } catch (notifError) {
            console.error('Error sending welcome notification:', notifError);
        }

        return Response.json({ 
            success: true, 
            message: 'User added to GoHighLevel',
            ghlContactId: ghlContact.contact?.id 
        });

    } catch (error) {
        console.error('Error in addUserToGoHighLevel:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});