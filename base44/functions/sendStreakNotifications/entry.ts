import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import { Resend } from 'npm:resend@3.2.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@thebusinessminds.com';

function calculateStreak(progressEntries) {
    let streak = 0;
    for (let i = 0; i < 30; i++) {
        const checkDate = new Date();
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        const entry = progressEntries.find(p => p.date === dateStr);
        const hasCompleted = entry?.daily_tasks?.some(t => t.completed);
        if (hasCompleted) { streak++; } else { break; }
    }
    return streak;
}

function getStreakEmailContent(user, streak) {
    const name = user.first_name || user.full_name?.split(' ')[0] || 'Entrepreneur';
    
    const milestoneMessages = {
        3: { emoji: '🔥', title: `${name}, you're on fire! 3-day streak!`, body: `You've tracked your progress 3 days in a row. Consistency is the foundation of success. Keep showing up!` },
        7: { emoji: '⚡', title: `${name}, 7 days strong! You're building a real habit!`, body: `A full week of daily progress tracking! Research shows it takes 21 days to build a habit — you're already one-third of the way there.` },
        14: { emoji: '🏅', title: `${name}, 2 weeks of unstoppable momentum!`, body: `14 days of consistent action. You're now in the top 10% of members. Your discipline is setting you apart!` },
        30: { emoji: '🏆', title: `${name}, 30-DAY LEGEND! You've unlocked something special!`, body: `One full month of daily 1% progress! This is extraordinary. You've proven that you have what it takes to build a successful business.` },
        60: { emoji: '👑', title: `${name}, 60 days! You are absolutely elite!`, body: `Two months of daily dedication. You're in rarified air — most people quit before they even start. This habit will compound into massive results.` },
        90: { emoji: '🌟', title: `${name}, 90-DAY MASTER! You've completed the journey!`, body: `This is it. 90 days of daily tracking. You are a 90-Day Master and a true Business Mind. Your consistency has built something remarkable.` },
    };

    const milestone = milestoneMessages[streak];
    if (!milestone) return null;

    return {
        subject: `${milestone.emoji} ${milestone.title}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: #000000; padding: 40px 30px; text-align: center;">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688e3deef052dd144c001643/ebdea9911_THEHQLOGO1200x330pxfdf.png" alt="The HQ" style="height: 50px; margin-bottom: 20px;" />
                <div style="font-size: 64px; margin-bottom: 10px;">${milestone.emoji}</div>
                <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-weight: 900;">${streak}-Day Streak!</h1>
            </div>
            <div style="padding: 40px 30px; background: #fafafa;">
                <h2 style="color: #1F2937; font-size: 22px; margin-bottom: 16px;">${milestone.title}</h2>
                <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">${milestone.body}</p>
                <div style="background: linear-gradient(135deg, #8B6F4E, #A88A6B); padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                    <div style="color: white; font-size: 48px; font-weight: 900; line-height: 1;">${streak}</div>
                    <div style="color: rgba(255,255,255,0.85); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Day Streak</div>
                </div>
                <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">
                    Don't stop now — keep the momentum going and track today's progress!
                </p>
                <div style="text-align: center;">
                    <a href="https://app.thebminds.com/DailyTrack" style="display: inline-block; background: #8B6F4E; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                        📊 Track Today's Progress
                    </a>
                </div>
            </div>
            <div style="padding: 20px 30px; background: #000000; text-align: center;">
                <p style="color: #9CA3AF; font-size: 13px; margin: 0;">The Business Minds HQ · Your daily 1% compound growth engine</p>
            </div>
        </div>`
    };
}

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        // Allow both admin calls and scheduled/automated calls
        let isAuthorized = false;
        try {
            const user = await base44.auth.me();
            isAuthorized = user?.role === 'admin';
        } catch (_) {}
        
        const body = await req.json().catch(() => ({}));
        // Allow if called with admin token or as a scheduled task
        const adminToken = req.headers.get('X-Admin-Token');
        if (!isAuthorized && adminToken !== Deno.env.get('ADMIN_TOKEN')) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
        }

        const users = await base44.asServiceRole.entities.User.filter({});
        let emailsSent = 0;
        let notificationsSent = 0;
        let errors = 0;

        const today = new Date().toISOString().split('T')[0];

        for (const targetUser of users) {
            if (!targetUser.email) continue;
            try {
                // Get last 30 days of progress
                const progressEntries = await base44.asServiceRole.entities.DailyProgress.filter(
                    { created_by: targetUser.email },
                    '-date',
                    30
                );

                const streak = calculateStreak(progressEntries);
                const milestones = [3, 7, 14, 30, 60, 90];

                if (!milestones.includes(streak)) continue;

                // Check if we already sent notification today for this streak milestone
                const todayKey = `streak_notified_${streak}_${today}`;
                if (targetUser[todayKey]) continue;

                // Send in-app notification
                await base44.asServiceRole.functions.invoke('sendNotification', {
                    recipient_email: targetUser.email,
                    type: 'general',
                    title: `🔥 ${streak}-Day Streak!`,
                    message: `Amazing! You've tracked your progress ${streak} days in a row. Keep the momentum going!`,
                    link: '/DailyTrack'
                });
                notificationsSent++;

                // Send email for milestone streaks
                const emailContent = getStreakEmailContent(targetUser, streak);
                if (emailContent) {
                    await resend.emails.send({
                        from: `The Business Minds HQ <${FROM_EMAIL}>`,
                        to: targetUser.email,
                        subject: emailContent.subject,
                        html: emailContent.html,
                    });
                    emailsSent++;
                }

                // Mark as notified for today
                await base44.asServiceRole.entities.User.update(targetUser.id, {
                    [todayKey]: true
                });

            } catch (err) {
                console.error(`Error processing ${targetUser.email}:`, err.message);
                errors++;
            }
        }

        return Response.json({ success: true, emailsSent, notificationsSent, errors, usersProcessed: users.length });
    } catch (error) {
        console.error('Error in sendStreakNotifications:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});