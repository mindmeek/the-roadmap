import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import { Resend } from 'npm:resend@3.2.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@thebusinessminds.com';

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
                        const firstName = targetUser.first_name || targetUser.full_name?.split(' ')[0] || 'there';
                        await resend.emails.send({
                            from: `The Business Minds HQ <${FROM_EMAIL}>`,
                            to: targetUser.email,
                            subject: `☀️ ${firstName}, time to make your 1% progress!`,
                            html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <div style="background: #000000; padding: 30px; text-align: center;">
                                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688e3deef052dd144c001643/ebdea9911_THEHQLOGO1200x330pxfdf.png" alt="The HQ" style="height: 40px;" />
                                </div>
                                <div style="padding: 30px; background: #fafafa;">
                                    <h2 style="color: #1F2937;">Good morning, ${firstName}! ☀️</h2>
                                    <p style="color: #6B7280; font-size: 15px; line-height: 1.6;">Your daily 1% is waiting. Every small action today compounds into massive results. Let's go!</p>
                                    <div style="text-align: center; margin: 24px 0;">
                                        <a href="https://app.thebminds.com/DailyTrack" style="display: inline-block; background: #8B6F4E; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                                            📊 Track Your 1% Now
                                        </a>
                                    </div>
                                    <p style="color: #9CA3AF; font-size: 13px;">Make today count! 💪</p>
                                </div>
                            </div>`
                        }).catch(e => console.error('Email send error:', e.message));
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

                // Also send email for evening reminder if user hasn't tracked
                if (reminder_type === 'evening' && targetUser.email) {
                    const firstName = targetUser.first_name || targetUser.full_name?.split(' ')[0] || 'there';
                    await resend.emails.send({
                        from: `The Business Minds HQ <${FROM_EMAIL}>`,
                        to: targetUser.email,
                        subject: `🌙 ${firstName}, don't forget to log today's progress!`,
                        html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #000000; padding: 30px; text-align: center;">
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688e3deef052dd144c001643/ebdea9911_THEHQLOGO1200x330pxfdf.png" alt="The HQ" style="height: 40px;" />
                            </div>
                            <div style="padding: 30px; background: #fafafa;">
                                <h2 style="color: #1F2937;">Hey ${firstName}, quick check-in! 🌙</h2>
                                <p style="color: #6B7280; font-size: 15px; line-height: 1.6;">You haven't logged today's progress yet. It only takes 2 minutes, and it helps maintain your streak!</p>
                                <div style="text-align: center; margin: 24px 0;">
                                    <a href="https://go.thebminds.com/DailyTrack" style="display: inline-block; background: #8B6F4E; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                                        📊 Track Today's 1%
                                    </a>
                                </div>
                                <p style="color: #9CA3AF; font-size: 13px;">Small consistent actions compound into massive results. Keep building! 💪</p>
                            </div>
                        </div>`
                    }).catch(e => console.error('Email send error:', e.message));
                }

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