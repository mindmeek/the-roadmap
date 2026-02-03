import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { planType, businessContext } = await req.json();

        if (!planType || !businessContext) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Fetch user's existing data for context
        const [businesses, strategyDocs, currentJourney] = await Promise.all([
            base44.entities.Business.filter({ owner_user_id: user.id }).catch(() => []),
            base44.entities.StrategyDocument.filter({ created_by: user.email }).catch(() => []),
            base44.entities.SocialMediaPlan.filter({ created_by: user.email, is_active: true }).catch(() => [])
        ]);

        const business = businesses[0] || {};
        const idealClient = strategyDocs.find(d => d.document_type === 'ideal_client')?.content || {};
        const valueProposition = strategyDocs.find(d => d.document_type === 'value_proposition_canvas')?.content || {};

        // Build context for AI
        const contextData = {
            businessName: businessContext.business_name || business.name || user.business_name,
            industry: businessContext.industry || business.industry,
            stage: businessContext.stage || user.entrepreneurship_stage,
            goals: businessContext.goals,
            targetAudience: businessContext.target_audience || idealClient.name,
            currentChallenges: businessContext.current_challenges,
            existingProducts: user.financial_projections?.products || [],
            valueProposition: valueProposition.products_services,
            currentGoal: user.selected_goal,
            freedomNumber: user.financial_projections?.freedomNumber
        };

        let prompt = '';
        let responseSchema = {};

        if (planType === '90_day_strategic') {
            prompt = `You are a business strategy expert. Create a comprehensive 90-day strategic plan for:

Business: ${contextData.businessName}
Industry: ${contextData.industry}
Stage: ${contextData.stage}
Main Goals: ${contextData.goals}
Target Audience: ${contextData.targetAudience}
Current Challenges: ${contextData.currentChallenges}
Monthly Freedom Number: $${contextData.freedomNumber || 'Not set'}

Create a detailed 90-day plan broken down into:
- 3 months with monthly themes and objectives
- Weekly action steps for each month (4 weeks per month)
- Specific, measurable KPIs for each month
- Resource requirements
- Risk mitigation strategies

Be specific, actionable, and tailored to their industry and stage.`;

            responseSchema = {
                type: "object",
                properties: {
                    title: { type: "string" },
                    overview: { type: "string" },
                    months: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                month_number: { type: "number" },
                                theme: { type: "string" },
                                objectives: { type: "array", items: { type: "string" } },
                                kpis: { type: "array", items: { type: "string" } },
                                weeks: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            week_number: { type: "number" },
                                            focus: { type: "string" },
                                            action_steps: { type: "array", items: { type: "string" } },
                                            deliverables: { type: "array", items: { type: "string" } }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    resources_needed: { type: "array", items: { type: "string" } },
                    risk_mitigation: { type: "array", items: { type: "string" } }
                }
            };
        } else if (planType === 'marketing') {
            prompt = `You are a marketing strategy expert. Create a comprehensive marketing plan for:

Business: ${contextData.businessName}
Industry: ${contextData.industry}
Target Audience: ${contextData.targetAudience}
Value Proposition: ${contextData.valueProposition}
Products/Services: ${contextData.existingProducts.map(p => p.name).join(', ')}
Goals: ${contextData.goals}

Create a detailed marketing plan including:
- Target audience analysis and personas
- Marketing channels strategy (social media, email, content, paid ads)
- Content calendar themes for 90 days
- Budget allocation recommendations
- Lead generation tactics
- Conversion optimization strategies
- Metrics and tracking plan`;

            responseSchema = {
                type: "object",
                properties: {
                    title: { type: "string" },
                    executive_summary: { type: "string" },
                    target_audience: {
                        type: "object",
                        properties: {
                            primary_persona: { type: "string" },
                            pain_points: { type: "array", items: { type: "string" } },
                            preferred_channels: { type: "array", items: { type: "string" } }
                        }
                    },
                    marketing_channels: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                channel: { type: "string" },
                                strategy: { type: "string" },
                                tactics: { type: "array", items: { type: "string" } },
                                budget_percentage: { type: "number" }
                            }
                        }
                    },
                    content_calendar: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                week: { type: "number" },
                                theme: { type: "string" },
                                content_types: { type: "array", items: { type: "string" } }
                            }
                        }
                    },
                    lead_generation: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                tactic: { type: "string" },
                                description: { type: "string" },
                                expected_result: { type: "string" }
                            }
                        }
                    },
                    metrics: { type: "array", items: { type: "string" } }
                }
            };
        } else if (planType === 'product_roadmap') {
            prompt = `You are a product strategy expert. Create a product roadmap for:

Business: ${contextData.businessName}
Industry: ${contextData.industry}
Current Products: ${contextData.existingProducts.map(p => `${p.name} ($${p.price})`).join(', ')}
Target Market: ${contextData.targetAudience}
Business Goals: ${contextData.goals}

Create a comprehensive product roadmap including:
- Product enhancement recommendations for existing products
- New product/service opportunities based on market trends
- Feature prioritization matrix
- Timeline for development (6-12 months)
- Resource requirements
- Competitive differentiation strategies
- Pricing strategy recommendations`;

            responseSchema = {
                type: "object",
                properties: {
                    title: { type: "string" },
                    vision: { type: "string" },
                    existing_products: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                product_name: { type: "string" },
                                enhancement_suggestions: { type: "array", items: { type: "string" } },
                                priority: { type: "string" }
                            }
                        }
                    },
                    new_opportunities: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                opportunity: { type: "string" },
                                description: { type: "string" },
                                market_size: { type: "string" },
                                competitive_advantage: { type: "string" },
                                timeline: { type: "string" }
                            }
                        }
                    },
                    feature_roadmap: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                quarter: { type: "string" },
                                features: { type: "array", items: { type: "string" } },
                                priority: { type: "string" }
                            }
                        }
                    },
                    pricing_strategy: { type: "string" },
                    resource_requirements: { type: "array", items: { type: "string" } }
                }
            };
        }

        // Generate the plan using AI
        const aiResponse = await base44.integrations.Core.InvokeLLM({
            prompt,
            response_json_schema: responseSchema
        });

        // Save the generated plan
        const newPlan = await base44.entities.AIGeneratedPlan.create({
            plan_type: planType,
            title: aiResponse.title,
            business_context: contextData,
            plan_content: aiResponse,
            status: 'draft'
        });

        return Response.json({
            success: true,
            plan: newPlan
        });

    } catch (error) {
        console.error('Error generating strategy:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});