import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

// Helper to format date for iCalendar
const formatIcsDate = (date, time) => {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    return `${year}${month}${day}T${hours}${minutes}00`;
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        if (!await base44.auth.isAuthenticated()) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { scheduleItems, scheduleDate } = await req.json();

        if (!scheduleItems || !Array.isArray(scheduleItems) || !scheduleDate) {
            return new Response(JSON.stringify({ error: "Invalid data provided." }), { status: 400, headers: { 'Content-Type': 'application/json' }});
        }
        
        const cal = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//TheBusinessMinds//ScheduleExporter//EN',
        ];

        scheduleItems.forEach(item => {
            const startDate = formatIcsDate(scheduleDate, item.start_time);
            const endDate = formatIcsDate(scheduleDate, item.end_time);
            const uid = `${item.id}@thebusinessminds.com`;

            cal.push('BEGIN:VEVENT');
            cal.push(`UID:${uid}`);
            cal.push(`DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)}Z`);
            cal.push(`DTSTART:${startDate}`);
            cal.push(`DTEND:${endDate}`);
            cal.push(`SUMMARY:${item.title}`);
            cal.push(`DESCRIPTION:Task scheduled via The Business Minds app. Category: ${item.category}`);
            cal.push('END:VEVENT');
        });

        cal.push('END:VCALENDAR');

        const icsContent = cal.join('\r\n');

        return new Response(icsContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': `attachment; filename="schedule.ics"`
            }
        });

    } catch (error) {
        console.error("Error generating ICS file:", error);
        return new Response(JSON.stringify({ error: "Failed to generate calendar file." }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
});