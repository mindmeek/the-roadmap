import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        // Admin-only function
        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { reminder_type } = await req.json();

        // Get all active users
        const users = await base44.asServiceRole.entities.User.filter({});

        let sent = 0;
        let errors = 0;

        for (const targetUser of users) {
            try {
                let title = '';
                let message = '';
                let link = '/DailyTrack';

                switch (reminder_type) {
                    case 'morning':
                        title = '☀️ Good morning!';
                        message = 'Ready to make 1% progress today? Start your daily tracker!';
                        break;
                    case 'evening':
                        const todayProgress = await base44.asServiceRole.entities.DailyProgress.filter({
                            created_by: targetUser.email,
                            date: new Date().toISOString().split('T')[0]
                        });
                        
                        if (!todayProgress || todayProgress.length === 0) {
                            title = '🌙 End your day right!';
                            message = 'Quick 5-min check-in: Log today\'s progress before bed';
                        } else {
                            continue; // Skip if already completed
                        }
                        break;
                    case 'streak':
                        title = '🔥 Streak Alert!';
                        message = 'You\'re on a 7-day streak! Don\'t break the momentum';
                        break;
                    default:
                        continue;
                }

                await base44.asServiceRole.functions.invoke('sendNotification', {
                    recipient_email: targetUser.email,
                    type: 'general',
                    title,
                    message,
                    link
                });

                sent++;
            } catch (err) {
                console.error(`Error sending to ${targetUser.email}:`, err);
                errors++;
            }
        }

        return Response.json({ 
            success: true, 
            sent, 
            errors,
            total: users.length 
        });

    } catch (error) {
        console.error('Error in sendDailyReminders:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});