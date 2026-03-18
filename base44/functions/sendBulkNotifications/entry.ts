import { createClient } from 'npm:@base44/sdk@0.1.0';
import webpush from 'npm:web-push@3.6.7';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

// Configure web-push with VAPID keys
webpush.setVapidDetails(
    'mailto:support@thebusinessminds.com',
    Deno.env.get('VAPID_PUBLIC_KEY'),
    Deno.env.get('VAPID_PRIVATE_KEY')
);

Deno.serve(async (req) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response('Unauthorized', { status: 401 });
        }
        
        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);
        const user = await base44.auth.me();
        
        if (!user || user.role !== 'admin') {
            return new Response('Admin access required', { status: 403 });
        }

        const { title, body, url, targetStage } = await req.json();

        // Get all active push subscriptions
        let subscriptions = await base44.entities.PushSubscription.filter({
            is_active: true
        });

        // If targeting specific stage, filter by user stage
        if (targetStage && targetStage !== 'all') {
            const stageUsers = await base44.entities.User.filter({
                entrepreneurship_stage: targetStage
            });
            const stageEmails = stageUsers.map(u => u.email);
            subscriptions = subscriptions.filter(sub => stageEmails.includes(sub.user_email));
        }

        const notificationPayload = JSON.stringify({
            title: title || 'Business Minds Update',
            body: body || 'You have a new notification',
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            url: url || '/',
            timestamp: Date.now()
        });

        let successCount = 0;
        let failureCount = 0;

        // Send notifications in batches to avoid overwhelming the system
        const batchSize = 100;
        for (let i = 0; i < subscriptions.length; i += batchSize) {
            const batch = subscriptions.slice(i, i + batchSize);
            
            await Promise.all(batch.map(async (subscription) => {
                try {
                    await webpush.sendNotification({
                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.p256dh_key,
                            auth: subscription.auth_key
                        }
                    }, notificationPayload);
                    successCount++;
                } catch (error) {
                    console.error('Failed to send notification:', error);
                    failureCount++;
                    
                    // If subscription is invalid, mark it as inactive
                    if (error.statusCode === 410) {
                        await base44.entities.PushSubscription.update(subscription.id, {
                            is_active: false
                        });
                    }
                }
            }));
        }

        return new Response(JSON.stringify({
            success: true,
            sent: successCount,
            failed: failureCount,
            total: subscriptions.length
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error sending bulk notifications:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});