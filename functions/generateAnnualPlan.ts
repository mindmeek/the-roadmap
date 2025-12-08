import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { questionnaire_responses, entrepreneurship_stage, selected_goal } = await req.json();

        // Fetch existing plan if any (optional, for context, but usually generating new)
        // We can just rely on the user context.

        // Platform Resources Context
        const platformResources = `
        Available Platform Resources to reference in the plan:
        
        1. STRATEGY DOCUMENTS (Tools to define business foundation):
           - Business Model Canvas (Business Logic)
           - SWOT Analysis (Strengths, Weaknesses)
           - Ideal Client Avatar (Target Audience)
           - Value Proposition Canvas (Product-Market Fit)
           - Value Ladder (Pricing Strategy)
           - Lean Canvas (Startup validation)
           - Competitive Analysis
           - Customer Journey Map
           - Podcast Plan (The Beacon Studio)
           - Brand Kit (Identity)

        2. FOCUSED PROGRAMS (90-Day Guided Journeys):
           - Vision to Reality (For Vision Stage)
           - Launch Your Business (For Startup Stage)
           - Scale & Automate (For Growth Stage)
           - Content Mastery
           - Sales Accelerator

        3. CORE TOOLS:
           - Daily 1% Tracker (Habit building)
           - Daily Schedule (Time blocking)
           - The Community (Networking & Support)
           - Freedom Calculator (Financial goals)
           - SOP Library (Systems & Processes)
           - My Businesses (Profile management)
        `;

        const prompt = `
        You are an expert Business Strategist and Executive Coach.
        Create a highly personalized Annual Plan for a user on 'The Business Minds' platform.

        USER CONTEXT:
        - Name: ${user.first_name || user.full_name}
        - Entrepreneurship Stage: ${entrepreneurship_stage || user.entrepreneurship_stage || 'Unknown'}
        - Current 90-Day Goal: ${selected_goal || user.selected_goal || 'Not set'}
        - Financial Goals: ${JSON.stringify(user.financial_projections || {})}
        
        QUESTIONNAIRE RESPONSES:
        ${JSON.stringify(questionnaire_responses, null, 2)}

        INSTRUCTIONS:
        1. Analyze the user's stage, goal, and answers.
        2. Create an inspiring 'Title' and 'Vision Description' for the year.
        3. Define objectives for all 4 Quarters (Q1-Q4).
        4. For each quarter, set a main 'Objective' and 3-5 specific 'Key Results'.
        5. **CRITICAL**: You MUST reference specific 'Platform Resources' (listed above) in the Key Results where relevant. 
           Example: "Complete the [Ideal Client Avatar] document" or "Start the [Launch Your Business] program".
        6. Ensure the plan is realistic but ambitious, directly addressing their challenges.

        OUTPUT FORMAT:
        Return ONLY a JSON object matching the following schema (no markdown, no intro text):
        {
            "title": "string",
            "vision_description": "string",
            "quarterly_objectives": [
                {
                    "quarter": number,
                    "objective": "string",
                    "key_results": ["string", "string", ...],
                    "status": "not_started"
                }
            ]
        }
        `;

        const result = await base44.integrations.Core.InvokeLLM({
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
                                },
                                status: { type: "string", enum: ["not_started"], default: "not_started" }
                            },
                            required: ["quarter", "objective", "key_results"]
                        }
                    }
                },
                required: ["title", "vision_description", "quarterly_objectives"]
            }
        });

        // Create the plan in the database
        const planData = {
            year: new Date().getFullYear(), // or next year depending on logic, let's assume current/coming year
            ...result,
            status: 'draft'
        };

        // We'll return the plan data to the frontend so it can decide whether to update an existing one or create new
        // OR we can just create/update here. 
        // The frontend logic in AnnualPlanningPage.js handles saving usually, but the prompt asked for the AI to create it.
        // Let's return the data and let frontend populate the state (User can review before saving).
        
        return Response.json({ plan: result });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});