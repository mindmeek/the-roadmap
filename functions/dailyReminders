import { createClient } from 'npm:@base44/sdk@0.1.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

Deno.serve(async (req) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const allUsers = await base44.entities.User.filter({
            onboarding_completed: true
        });

        const todayProgress = await base44.entities.DailyProgress.filter({
            date: today
        });

        const usersWithProgress = new Set(todayProgress.map(p => p.created_by));
        const usersToRemind = allUsers.filter(user => 
            !usersWithProgress.has(user.email)
        );

        let remindersSent = 0;

        for (const user of usersToRemind) {
            try {
                const firstName = user.full_name?.split(' ')[0] || 'there';

                // Send email reminder using fetch
                await fetch(`${Deno.env.get('BASE_URL')}/functions/handleEmails`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Deno.env.get('ADMIN_TOKEN')}`
                    },
                    body: JSON.stringify({
                        action: 'sendDailyReminder',
                        payload: { 
                            to: user.email, 
                            name: firstName,
                            week: user.current_week,
                            stage: user.entrepreneurship_stage
                        }
                    })
                });

                remindersSent++;
            } catch (error) {
                console.error(`Error sending reminder to ${user.email}:`, error);
            }
        }

        return new Response(JSON.stringify({ 
            success: true, 
            remindersSent: remindersSent,
            totalUsers: allUsers.length,
            usersWithProgress: usersWithProgress.size
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in daily reminders:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});