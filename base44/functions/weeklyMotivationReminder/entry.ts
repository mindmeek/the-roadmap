import { createClient } from 'npm:@base44/sdk@0.5.0';
import webpush from 'npm:web-push@3.6.7';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

const getNotificationForDay = (dayOfWeek) => {
    switch (dayOfWeek) {
        case 0: // Sunday
            return {
                title: "Prep for Success ✨",
                body: "Ready to crush your goals this week? Spend 5 minutes planning your week ahead in the Launch Pad. Let's make it count!",
                url: "/Schedule"
            };
        case 3: // Wednesday
            return {
                title: "Mid-Week Boost 🔥",
                body: "Halfway through the week! Don't lose momentum. Revisit your Daily 1% progress or tackle a quick lesson to reignite your focus.",
                url: "/DailyTrack"
            };
        case 5: // Friday
            return {
                title: "Reflect & Celebrate 🚀",
                body: "Another week, another step closer to your vision! Take a moment to reflect on your wins, big or small. Share your progress in the Community!",
                url: "/TheCommunity"
            };
        default:
            return null;
    }
};

// Cron: "0 2 * * 0,3,5" (Every Sunday, Wednesday, and Friday at 02:00 UTC)
Deno.serve(async (req) => {
    try {
        const today = new Date();
        const dayOfWeek = today.getUTCDay(); // 0 for Sunday, 1 for Monday, etc.

        const notificationContent = getNotificationForDay(dayOfWeek);

        if (!notificationContent) {
            console.log(`No notification scheduled for today (Day ${dayOfWeek}). Exiting.`);
            return new Response(JSON.stringify({ success: true, message: "No notification scheduled for today." }));
        }
        
        console.log(`Sending weekly motivation reminder: "${notificationContent.title}"`);
        
        webpush.setVapidDetails(
            'mailto:support@thebusinessminds.com',
            Deno.env.get('VAPID_PUBLIC_KEY'),
            Deno.env.get('VAPID_PRIVATE_KEY')
        );

        const activeSubscriptions = await base44.asServiceRole.entities.PushSubscription.filter({ is_active: true });
        
        if (activeSubscriptions.length === 0) {
            return new Response(JSON.stringify({ success: true, message: "No active push subscribers to notify." }));
        }

        let successCount = 0;
        let failureCount = 0;

        for (const sub of activeSubscriptions) {
            try {
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: { p256dh: sub.p256dh_key, auth: sub.auth_key }
                };

                await webpush.sendNotification(pushSubscription, JSON.stringify(notificationContent));
                successCount++;

            } catch (error) {
                failureCount++;
                console.error(`Failed to send notification to ${sub.user_email}:`, error);
                if (error.statusCode === 410 || error.statusCode === 404) {
                    await base44.asServiceRole.entities.PushSubscription.update(sub.id, { is_active: false });
                }
            }
        }
        
        const message = `Weekly motivation job complete. Sent ${successCount} notifications, ${failureCount} failed.`;
        console.log(message);

        return new Response(JSON.stringify({ success: true, message }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in weeklyMotivationReminder job:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
});