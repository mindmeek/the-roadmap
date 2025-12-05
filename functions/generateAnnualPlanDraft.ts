import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { year, vision, entrepreneurship_stage } = await req.json();

        const prompt = `
        You are an expert business strategist. 
        Create a strategic annual business plan for the year ${year} for an entrepreneur.
        
        User Context:
        - Entrepreneurship Stage: ${entrepreneurship_stage || 'Not specified'}
        - Vision/Goal: ${vision || 'To grow the business significantly'}
        
        Please generate a structured plan with:
        1. An inspiring Title.
        2. A detailed Vision Description.
        3. 4 Quarterly Objectives, each with 2-3 Key Results (measurable outcomes).
        
        Output MUST be valid JSON matching this structure:
        {
            "title": "String",
            "vision_description": "String",
            "quarterly_objectives": [
                {
                    "quarter": 1,
                    "objective": "String",
                    "key_results": ["String", "String"]
                },
                ... (for all 4 quarters)
            ]
        }
        `;

        const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
            prompt: prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    vision_description: { type: "string" },
                    quarterly_objectives: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                quarter: { type: "number" },
                                objective: { type: "string" },
                                key_results: { 
                                    type: "array", 
                                    items: { type: "string" } 
                                }
                            },
                            required: ["quarter", "objective", "key_results"]
                        }
                    }
                },
                required: ["title", "vision_description", "quarterly_objectives"]
            }
        });

        return Response.json({ plan: result });

    } catch (error) {
        console.error("Generate Plan Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});