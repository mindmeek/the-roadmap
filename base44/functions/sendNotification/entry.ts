import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { recipient_email, type, title, message, related_user_email, connection_id, link } = await req.json();

        if (!recipient_email || !type || !title || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create notification in database
        const notification = await base44.asServiceRole.entities.Notification.create({
            recipient_email,
            type,
            title,
            message,
            is_read: false,
            related_user_email: related_user_email || null,
            connection_id: connection_id || null,
            link: link || null
        });

        // Send push notification if user is subscribed
        try {
            const pushSubscriptions = await base44.asServiceRole.entities.PushSubscription.filter({
                user_email: recipient_email,
                is_active: true
            });

            if (pushSubscriptions.length > 0) {
                await base44.asServiceRole.functions.invoke('pushNotifications', {
                    user_email: recipient_email,
                    title,
                    message,
                    link: link || '/Dashboard'
                });
            }
        } catch (pushError) {
            console.error('Error sending push notification:', pushError);
            // Continue even if push fails
        }

        return Response.json({ success: true, notification });
    } catch (error) {
        console.error('Error sending notification:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});