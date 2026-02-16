import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { user_email, notification_type, data } = await req.json();

        if (!user_email || !notification_type) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let title = '';
        let message = '';
        let link = '/Journey';

        switch (notification_type) {
            case 'week_completed':
                title = '🎉 Week Completed!';
                message = `Amazing work! You just completed Week ${data.week_number}. You're ${data.progress_percentage}% through your journey!`;
                break;

            case 'new_week_unlocked':
                title = '📅 New Week Available!';
                message = `Week ${data.week_number} is now unlocked. Ready for your next chapter?`;
                break;

            case 'milestone_reached':
                title = '🎯 Milestone Achieved!';
                message = `You're halfway through your 90-day journey! Time to celebrate your wins.`;
                break;

            case 'monthly_checkpoint':
                title = '📊 Monthly Reflection Time';
                message = `${data.month_name} is complete! Review your progress and plan ahead.`;
                break;

            case 'journey_reminder':
                title = '⏰ Journey Update';
                message = 'It\'s been a few days since your last update. Keep the momentum going!';
                break;

            default:
                return Response.json({ error: 'Invalid notification type' }, { status: 400 });
        }

        await base44.asServiceRole.functions.invoke('sendNotification', {
            recipient_email: user_email,
            type: 'general',
            title,
            message,
            link
        });

        return Response.json({ success: true });

    } catch (error) {
        console.error('Error in sendJourneyNotifications:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});