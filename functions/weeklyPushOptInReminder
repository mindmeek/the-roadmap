// This file is intended to be run by a cron job weekly.
// Cron: "0 10 * * 1" (Every Monday at 10:00 UTC)

import { createClient } from 'npm:@base44/sdk@0.5.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

Deno.serve(async (req) => {
    try {
        console.log("Starting weekly push opt-in reminder job...");

        // Get all users
        const allUsers = await base44.asServiceRole.entities.User.filter({});

        // Get all active push subscriptions
        const activeSubscriptions = await base44.asServiceRole.entities.PushSubscription.filter({ is_active: true });
        const subscribedEmails = new Set(activeSubscriptions.map(sub => sub.user_email));

        let remindersSent = 0;

        for (const user of allUsers) {
            // Skip if user already has push notifications enabled
            if (subscribedEmails.has(user.email)) {
                continue;
            }

            // Create in-app notification for users without push notifications
            await base44.asServiceRole.entities.Notification.create({
                recipient_email: user.email,
                type: 'general',
                title: '📱 Don\'t Miss Out! Enable Push Notifications',
                message: 'Get instant updates, personalized reminders, and valuable tips delivered straight to your device. Stay on track with your goals and never miss a beat in the community. Tap here to enable them now!',
                link: '/Profile'
            });

            remindersSent++;
        }

        const message = `Push opt-in reminder job complete. Sent ${remindersSent} in-app reminders.`;
        console.log(message);

        return new Response(JSON.stringify({ success: true, message }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error in weeklyPushOptInReminder job:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
});