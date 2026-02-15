import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const now = new Date();
        const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

        const upcomingEvents = await base44.asServiceRole.entities.Event.filter({
            is_published: true,
            reminder_sent: false
        });

        const eventsToRemind = upcomingEvents.filter(event => {
            const eventTime = new Date(event.event_date);
            return eventTime > now && eventTime <= oneHourFromNow;
        });

        for (const event of eventsToRemind) {
            for (const attendeeEmail of event.attendees || []) {
                try {
                    await base44.asServiceRole.functions.invoke('handleEmails', {
                        action: 'sendEventReminder',
                        payload: { to: attendeeEmail, event }
                    });
                } catch (error) {
                    console.error(`Error sending reminder to ${attendeeEmail}:`, error);
                }
            }

            await base44.asServiceRole.entities.Event.update(event.id, { reminder_sent: true });
        }

        return new Response(JSON.stringify({ 
            success: true, 
            remindersSent: eventsToRemind.length 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in event reminders:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});