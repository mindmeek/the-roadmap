import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import webpush from 'npm:web-push@3.6.7';

webpush.setVapidDetails(
    'mailto:support@thebusinessminds.com',
    Deno.env.get('VAPID_PUBLIC_KEY'),
    Deno.env.get('VAPID_PRIVATE_KEY')
);

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        const { assignedToEmail, taskTitle, taskDate, assignerName, taskType = 'task' } = await req.json();

        if (!assignedToEmail) return Response.json({ error: 'No assignee email provided' }, { status: 400 });

        const notifTitle = 'Task Assigned to You';
        const notifBody = `${assignerName || 'Your team'} assigned: "${taskTitle}"${taskDate ? ` (${taskDate})` : ''}`;
        const notifUrl = taskType === 'schedule' ? '/Schedule' : '/DailyTrack';

        // Send push notification
        const subscriptions = await base44.asServiceRole.entities.PushSubscription.filter({
            user_email: assignedToEmail,
            is_active: true
        });

        const notifPayload = JSON.stringify({
            title: notifTitle,
            body: notifBody,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            url: notifUrl,
            timestamp: Date.now()
        });

        for (const sub of subscriptions) {
            try {
                await webpush.sendNotification({
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh_key, auth: sub.auth_key }
                }, notifPayload);
            } catch (e) {
                if (e.statusCode === 410 || e.statusCode === 404) {
                    await base44.asServiceRole.entities.PushSubscription.update(sub.id, { is_active: false });
                }
            }
        }

        // Send email via Resend
        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
        const RESEND_FROM = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@thebusinessminds.com';

        if (RESEND_API_KEY) {
            const appUrl = taskType === 'schedule'
                ? 'https://hq.thebminds.com/Schedule'
                : 'https://hq.thebminds.com/DailyTrack';

            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: `Business Minds HQ <${RESEND_FROM}>`,
                    to: assignedToEmail,
                    subject: `Task Assigned to You: ${taskTitle}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #8B6F4E;">Task Assigned to You</h2>
                            <p><strong>${assignerName || 'Your team leader'}</strong> has assigned you a task:</p>
                            <div style="background: #f9f9f9; border-left: 4px solid #8B6F4E; padding: 16px; margin: 20px 0; border-radius: 4px;">
                                <h3 style="margin: 0; color: #1F2937;">${taskTitle}</h3>
                                ${taskDate ? `<p style="color: #6B7280; margin-top: 8px;">Due: ${taskDate}</p>` : ''}
                            </div>
                            <a href="${appUrl}" style="display: inline-block; background: #8B6F4E; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                                View Task →
                            </a>
                            <p style="color: #6B7280; margin-top: 20px; font-size: 14px;">
                                Log in to The Business Minds HQ to view and manage your tasks.
                            </p>
                        </div>
                    `
                })
            });
        }

        // Also create an in-app notification
        await base44.asServiceRole.entities.Notification.create({
            recipient_email: assignedToEmail,
            type: 'general',
            title: notifTitle,
            message: notifBody,
            is_read: false,
            link: notifUrl
        });

        return Response.json({ success: true, pushSent: subscriptions.length, emailSent: !!RESEND_API_KEY });

    } catch (error) {
        console.error('Task notification error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});