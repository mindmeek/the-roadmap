import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Gather all foundational data
        const [strategyDocs, businesses, financialGoals, annualPlan] = await Promise.all([
            base44.entities.StrategyDocument.filter({}, '-updated_date', 20),
            base44.entities.Business.filter({ owner_user_id: user.id }, '-updated_date', 1),
            user.financial_projections || null,
            base44.entities.AnnualPlan.filter({ status: 'active' }, '-created_date', 1)
        ]);

        // Organize strategy documents
        const docsMap = {};
        strategyDocs.forEach(doc => {
            docsMap[doc.document_type] = doc;
        });

        const business = businesses.length > 0 ? businesses[0] : null;
        const idealClient = docsMap.ideal_client?.content || {};
        const valueProposition = docsMap.value_proposition_canvas?.content || {};
        const brandKit = docsMap.brand_kit?.content || {};
        const annualStrategy = annualPlan.length > 0 ? annualPlan[0] : null;

        // Build comprehensive context for AI
        const businessContext = {
            businessName: business?.name || user.business_name || 'Your Business',
            businessDescription: business?.description || '',
            industry: business?.industry || '',
            idealClient: {
                demographics: idealClient.demographics || '',
                psychographics: idealClient.psychographics || '',
                painPoints: idealClient.pain_points || '',
                goals: idealClient.goals || '',
                values: idealClient.values || ''
            },
            valueProposition: {
                value: valueProposition.value_proposition || '',
                benefits: valueProposition.benefits || '',
                uniqueSellingPoints: valueProposition.unique_selling_points || ''
            },
            brandVoice: brandKit.brand_voice || '',
            brandValues: brandKit.brand_values || [],
            financialGoals: {
                freedomNumber: financialGoals?.freedomNumber || 0,
                products: financialGoals?.products || [],
                monthlyTarget: Math.round(financialGoals?.freedomNumber || 0)
            },
            entrepreneurshipStage: user.entrepreneurship_stage || 'startup',
            currentGoal: user.selected_journey_goal || 'attract_clients',
            annualVision: annualStrategy?.vision || ''
        };

        // Generate comprehensive marketing strategy using AI
        const prompt = `You are an expert marketing strategist. Based on the following business information, create a comprehensive 90-day marketing strategy that includes:

1. Content Calendar (90 days of content themes and topics)
2. Social Media Posts (3 sample posts per week for the first month)
3. Email Sequences (Welcome sequence + 2 nurture campaigns)
4. Ad Campaign Outlines (3 campaign ideas with targeting and messaging)

BUSINESS CONTEXT:
${JSON.stringify(businessContext, null, 2)}

REQUIREMENTS:
- All content must align with their brand voice, ideal client, and value proposition
- Strategy should support their ${businessContext.financialGoals.monthlyTarget}/month revenue goal
- Content must be actionable and specific to their ${businessContext.entrepreneurshipStage} stage
- Include specific metrics and KPIs to track
- Make it practical and implementable immediately

Generate a complete, actionable marketing strategy in the following JSON structure:`;

        const schema = {
            type: "object",
            properties: {
                overview: {
                    type: "object",
                    properties: {
                        strategyTheme: { type: "string" },
                        primaryFocus: { type: "string" },
                        keyObjectives: { type: "array", items: { type: "string" } },
                        targetMetrics: { type: "object" }
                    }
                },
                contentCalendar: {
                    type: "object",
                    properties: {
                        months: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    month: { type: "number" },
                                    theme: { type: "string" },
                                    focus: { type: "string" },
                                    contentPillars: { type: "array", items: { type: "string" } },
                                    weeks: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                week: { type: "number" },
                                                theme: { type: "string" },
                                                topics: { type: "array", items: { type: "string" } }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                socialMediaPosts: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            platform: { type: "string" },
                            week: { type: "number" },
                            postType: { type: "string" },
                            caption: { type: "string" },
                            hashtags: { type: "array", items: { type: "string" } },
                            callToAction: { type: "string" }
                        }
                    }
                },
                emailSequences: {
                    type: "object",
                    properties: {
                        welcomeSequence: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    emailNumber: { type: "number" },
                                    subject: { type: "string" },
                                    timing: { type: "string" },
                                    purpose: { type: "string" },
                                    keyPoints: { type: "array", items: { type: "string" } },
                                    cta: { type: "string" }
                                }
                            }
                        },
                        nurtureSequences: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    sequenceName: { type: "string" },
                                    purpose: { type: "string" },
                                    emails: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                emailNumber: { type: "number" },
                                                subject: { type: "string" },
                                                topic: { type: "string" },
                                                cta: { type: "string" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                adCampaigns: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            campaignName: { type: "string" },
                            platform: { type: "string" },
                            objective: { type: "string" },
                            targeting: { type: "object" },
                            adCopy: {
                                type: "object",
                                properties: {
                                    headline: { type: "string" },
                                    primaryText: { type: "string" },
                                    callToAction: { type: "string" }
                                }
                            },
                            budgetRecommendation: { type: "string" },
                            kpis: { type: "array", items: { type: "string" } }
                        }
                    }
                },
                implementationGuide: {
                    type: "object",
                    properties: {
                        week1Actions: { type: "array", items: { type: "string" } },
                        quickWins: { type: "array", items: { type: "string" } },
                        toolsNeeded: { type: "array", items: { type: "string" } },
                        successMetrics: { type: "array", items: { type: "string" } }
                    }
                }
            }
        };

        const aiResponse = await base44.integrations.Core.InvokeLLM({
            prompt,
            response_json_schema: schema
        });

        // Save the generated strategy to the database
        const strategyData = {
            plan_type: 'comprehensive_marketing',
            title: `Complete Marketing Strategy - ${new Date().toLocaleDateString()}`,
            plan_data: aiResponse,
            generation_context: businessContext,
            is_active: true,
            start_date: new Date().toISOString().split('T')[0],
            status: 'active'
        };

        const savedPlan = await base44.entities.MarketingPlan.create(strategyData);

        // Also create/update social media plan with the content calendar
        if (aiResponse.contentCalendar?.months) {
            const socialMediaPlan = {
                source_type: 'ai_comprehensive',
                source_name: 'AI-Generated Complete Strategy',
                plan_data: aiResponse.contentCalendar,
                is_active: true
            };

            // Deactivate any existing active social media plans
            const existingPlans = await base44.entities.SocialMediaPlan.filter({ is_active: true });
            for (const plan of existingPlans) {
                await base44.entities.SocialMediaPlan.update(plan.id, { is_active: false });
            }

            await base44.entities.SocialMediaPlan.create(socialMediaPlan);
        }

        return Response.json({
            success: true,
            strategy: aiResponse,
            planId: savedPlan.id,
            message: 'Comprehensive marketing strategy generated and saved successfully!'
        });

    } catch (error) {
        console.error('Error generating marketing strategy:', error);
        return Response.json({ 
            error: 'Failed to generate marketing strategy',
            details: error.message 
        }, { status: 500 });
    }
});