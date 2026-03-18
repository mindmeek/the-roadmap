import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { stage, pathway, userContext, persona } = await req.json();

        const prompt = `
        You are an expert business strategist. 
        The user is working on the "${stage.title}" stage of their Customer Journey.
        They have selected the strategy: "${pathway.title}".

        Here is their Ideal Customer Persona:
        ${JSON.stringify(persona, null, 2)}

        Here is their specific context for this strategy:
        "${userContext}"

        Based on this, please generate specific, actionable content for the following fields:
        ${pathway.formFields.map(f => `- ${f.id}: ${f.label}`).join('\n')}

        Also, provide a "Customized Implementation Plan" (3-5 bullet points) that is specific to their business, not generic advice.

        Return the response as a valid JSON object with keys matching the field IDs above, plus a 'implementation_plan' key for the bullet points (as an array of strings).
        Example format:
        {
            "field_id_1": "Content for field 1...",
            "field_id_2": "Content for field 2...",
            "implementation_plan": ["Step 1...", "Step 2..."]
        }
        `;

        const result = await base44.integrations.Core.InvokeLLM({
            prompt: prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    ...pathway.formFields.reduce((acc, field) => ({ ...acc, [field.id]: { type: "string" } }), {}),
                    implementation_plan: { type: "array", items: { type: "string" } }
                }
            }
        });

        return Response.json(result);

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});