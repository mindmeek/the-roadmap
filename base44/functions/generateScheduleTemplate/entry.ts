import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) return new Response('Unauthorized', { status: 401 });

        const { tasks, preferences } = await req.json();
        if (!tasks || tasks.length === 0) {
            return new Response(JSON.stringify({ error: 'At least one task is required.' }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const prompt = `You are an expert productivity coach specializing in time-blocking. Your task is to generate a daily schedule based on a list of tasks and user preferences. The schedule should run from 8:00 AM to 6:00 PM (18:00).

User Preferences: ${preferences || 'No specific preferences provided. Assume a standard workday with a lunch break and short breaks.'}

Tasks to Schedule:
- ${tasks.join('\n- ')}

Structure the schedule with realistic time blocks. Incorporate at least one 15-minute break and a 45-60 minute lunch break. Categorize each block into one of the following: "deep_work", "meetings", "learning", "admin", "breaks", "personal". Ensure the tasks provided are included in the schedule.

Output a valid JSON object with a single key "schedule" which contains an array of schedule item objects with the following format:
[{
  "start_time": "HH:MM",
  "end_time": "HH:MM",
  "title": "Task title or activity",
  "category": "category_name"
}]

Example output:
{"schedule": [
  {"start_time": "09:00", "end_time": "09:15", "title": "Daily Standup & Plan", "category": "admin"},
  {"start_time": "09:15", "end_time": "11:00", "title": "Deep Work on: ${tasks[0]}", "category": "deep_work"}
]}
`;

        const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    schedule: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                start_time: { type: "string" },
                                end_time: { type: "string" },
                                title: { type: "string" },
                                category: { type: "string", enum: ["deep_work", "meetings", "learning", "admin", "breaks", "personal"] }
                            },
                            required: ["start_time", "end_time", "title", "category"]
                        }
                    }
                },
                required: ["schedule"]
            }
        });
        
        const scheduleArray = response?.schedule;

        if (!Array.isArray(scheduleArray)) {
            throw new Error("AI did not return a valid schedule array.");
        }

        return new Response(JSON.stringify({ schedule: scheduleArray, success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error('Generate Schedule Error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Failed to generate schedule.', success: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});