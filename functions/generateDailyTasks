import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const user = await base44.auth.me();
        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { actionStepTitle, actionStepDescription, context } = await req.json();

        if (!actionStepTitle) {
            return new Response(JSON.stringify({ error: 'Action step title is required.' }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const prompt = `You are a productivity expert and business coach. I need to break down a larger action step into 3-5 concrete, actionable daily tasks. These tasks should be specific, measurable, achievable, relevant, and time-bound (SMART) where possible.

Here's the action step:
Title: "${actionStepTitle}"
Description: "${actionStepDescription || 'No detailed description provided.'}"
${context ? `Additional context about the user's business/situation: ${context}` : ''}

Please provide 3-5 distinct daily tasks. Output them as a JSON object with a single key "tasks" which contains an array of strings. Each string should be a concise task description.

Example Output:
{"tasks": ["Task 1: Research competitor pricing", "Task 2: Draft website homepage copy", "Task 3: Schedule meeting with potential client"]}`;

        const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    "tasks": {
                        "type": "array",
                        "items": { "type": "string" },
                        "description": "A list of 3-5 actionable daily tasks."
                    }
                },
                "required": ["tasks"]
            },
            add_context_from_internet: false
        });

        const tasksArray = response?.tasks;

        if (!Array.isArray(tasksArray) || tasksArray.some(t => typeof t !== 'string')) {
            console.error("LLM did not return a valid object with a tasks array:", response);
            throw new Error("AI did not return tasks in the expected format.");
        }

        return new Response(JSON.stringify(tasksArray), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in generateDailyTasks function:", error);
        return new Response(JSON.stringify({ error: error.message || "An unknown error occurred." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});