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
            console.error('The HQ credentials not configured');
            return Response.json({ error: 'The HQ not configured' }, { status: 500 });
        }

        // Create contact in The HQ
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
                tags: ['Business Minds Member', 'App Signup', 'free community access'],
                source: 'Business Minds App',
                customFields: [
                    {
                        key: 'subscription_level',
                        value: user.subscription_level || 'free'
                    },
                    {
                        key: 'entrepreneurship_stage',
                        value: user.entrepreneurship_stage || 'not_set'
                    },
                    {
                        key: 'selected_goal',
                        value: user.selected_goal || 'not_set'
                    },
                    {
                        key: 'business_name',
                        value: user.business_name || ''
                    },
                    {
                        key: 'industry',
                        value: user.industry || ''
                    },
                    {
                        key: 'business_stage',
                        value: user.business_stage || ''
                    },
                    {
                        key: 'primary_goal',
                        value: user.primary_goal || ''
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('The HQ API error:', errorText);
            return Response.json({ error: 'Failed to add to The HQ', details: errorText }, { status: 500 });
        }

        const ghlContact = await response.json();

        // Send welcome notification to user
        try {
            await base44.asServiceRole.functions.invoke('sendNotification', {
                recipient_email: user.email,
                type: 'general',
                title: '🎉 Welcome to Business Minds!',
                message: 'You now have access to The HQ community! Check your email for your HQ login details.',
                link: '/TheCommunity'
            });
        } catch (notifError) {
            console.error('Error sending welcome notification:', notifError);
        }

        return Response.json({ 
            success: true, 
            message: 'User added to The HQ',
            ghlContactId: ghlContact.contact?.id 
        });

    } catch (error) {
        console.error('Error in addUserToGoHighLevel:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});