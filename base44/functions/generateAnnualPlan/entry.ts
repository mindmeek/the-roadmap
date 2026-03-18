import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { questionnaire_responses, entrepreneurship_stage, selected_goal } = await req.json();

        // Platform Resources Context with URLs
        const platformResources = `
        Available Platform Resources to reference in the plan (use these exact URLs):
        
        1. STRATEGY DOCUMENTS:
           - Business Model Canvas: "StrategyFormBusinessModelCanvas"
           - SWOT Analysis: "StrategyFormSWOTAnalysis"
           - Ideal Client Avatar: "StrategyFormIdealClient"
           - Value Proposition Canvas: "StrategyFormValueProposition"
           - Value Ladder: "StrategyFormValueLadder"
           - Lean Canvas: "StrategyFormLeanCanvas"
           - Competitive Analysis: "CompetitorAnalysis"
           - Customer Journey Map: "StrategyFormCustomerJourney"
           - Podcast Plan: "TheBeacon"
           - Brand Kit: "StrategyFormBrandKit"

        2. FOCUSED PROGRAMS:
           - Vision to Reality: "FocusedProgram?id=vision-reality"
           - Launch Your Business: "FocusedProgram?id=launch-business"
           - Scale & Automate: "FocusedProgram?id=scale-automate"
           - Content Mastery: "Courses"
           - Sales Accelerator: "Courses"

        3. CORE TOOLS:
           - Daily 1% Tracker: "DailyTrack"
           - Daily Schedule: "Schedule"
           - The Community: "TheCommunity"
           - Freedom Calculator (Financial goals): "FreedomCalculator"
           - SOP Library: "SOPs"
           - My Businesses: "MyBusinesses"
           - Strategy Session: "StrategySession"
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
        1. Analyze the user's stage, goal, financial targets, and answers.
        2. Create an inspiring 'Title' and 'Vision Description' for the year.
        3. Define objectives for all 4 Quarters (Q1-Q4).
        4. For each quarter, set a main 'Objective'.
        5. Add 3-5 specific 'Key Results'. These must be ACTIONABLE and MEASURABLE.
        6. **CRITICAL**: Suggest 1-2 'Linked Resources' from the list above that will help achieve the objective.
        7. Ensure the plan is realistic but ambitious, directly addressing their challenges.

        OUTPUT FORMAT:
        Return ONLY a JSON object matching the following schema:
        {
            "title": "string",
            "vision_description": "string",
            "financial_goal_snapshot": "string (summary of their financial target)",
            "quarterly_objectives": [
                {
                    "quarter": number,
                    "objective": "string",
                    "key_results": [
                        { "text": "string", "is_completed": false, "added_to_daily": false }
                    ],
                    "linked_resources": [
                        { "title": "string", "url": "string" }
                    ],
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
                    financial_goal_snapshot: { type: "string" },
                    quarterly_objectives: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                quarter: { type: "number" },
                                objective: { type: "string" },
                                key_results: { 
                                    type: "array", 
                                    items: { 
                                        type: "object",
                                        properties: {
                                            text: { type: "string" },
                                            is_completed: { type: "boolean", default: false },
                                            added_to_daily: { type: "boolean", default: false }
                                        },
                                        required: ["text"]
                                    } 
                                },
                                linked_resources: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            title: { type: "string" },
                                            url: { type: "string" }
                                        },
                                        required: ["title", "url"]
                                    }
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

        return Response.json({ plan: result });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});