import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Sparkles, Loader2, Calendar, ArrowLeft, ArrowRight, Send, Users, Target, CheckCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EmailMarketingPlanner() {
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [user, setUser] = useState(null);
    const [activePlan, setActivePlan] = useState(null);
    const [previousPlans, setPreviousPlans] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [business, setBusiness] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            const businesses = await base44.entities.Business.filter({ owner_user_id: userData.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
            }

            const docs = await base44.entities.StrategyDocument.filter({});
            const docsMap = {};
            docs.forEach(doc => {
                docsMap[doc.document_type] = doc;
            });
            setStrategyDocs(docsMap);

            const plans = await base44.entities.MarketingPlan.filter(
                { plan_type: 'email_marketing' },
                '-created_date'
            );

            const active = plans.find(p => p.is_active) || plans[0];
            if (active) {
                setActivePlan(active);
            }

            setPreviousPlans(plans.filter(p => p.id !== active?.id));
        } catch (error) {
            console.error('Error loading data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const generatePlan = async () => {
        setGenerating(true);
        try {
            const businessContext = {
                business_name: business?.name || user?.business_name || 'Your Business',
                industry: business?.industry || user?.industry || 'General',
                ideal_client: strategyDocs.ideal_client?.content || {},
                value_proposition: strategyDocs.value_proposition_canvas?.content || {},
                products: user?.financial_projections?.products || [],
                freedom_number: user?.financial_projections?.freedomNumber || 0,
                previous_plan_summary: activePlan?.plan_data ? 'Building on previous email campaigns' : 'First email marketing plan'
            };

            const prompt = `Create a comprehensive 90-day EMAIL MARKETING plan for this business.

Business Context:
- Business Name: ${businessContext.business_name}
- Industry: ${businessContext.industry}
- Target Audience: ${businessContext.ideal_client.demographics || 'Not defined'}
- Pain Points: ${businessContext.ideal_client.pain_points || 'General business challenges'}
- Value Proposition: ${businessContext.value_proposition.value_proposition || 'Unique business solutions'}
- Products/Services: ${businessContext.products.map(p => p.name).join(', ') || 'Not specified'}
- Monthly Revenue Target: $${businessContext.freedom_number}

${activePlan ? `Previous Plan: Build upon the previous plan's learnings and results. Focus on advancing strategy, testing new approaches, and optimizing based on what worked.` : 'This is the first email marketing plan.'}

Create a detailed 90-day email marketing strategy with:
- 3 months of focused email campaigns
- Weekly email themes and objectives
- Specific email sequence ideas (welcome, nurture, sales, re-engagement)
- Subject line examples for each week
- Engagement tactics and list-building strategies
- Metrics to track (open rates, click rates, conversions)

Make it actionable and specific to this business.`;

            const result = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                add_context_from_internet: false,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        overview: { type: 'string' },
                        months: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    month: { type: 'number' },
                                    theme: { type: 'string' },
                                    focus: { type: 'string' },
                                    weeks: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                week: { type: 'number' },
                                                focus: { type: 'string' },
                                                email_sequences: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        properties: {
                                                            day: { type: 'number' },
                                                            email_type: { type: 'string' },
                                                            subject_line: { type: 'string' },
                                                            topic: { type: 'string' },
                                                            goal: { type: 'string' },
                                                            cta: { type: 'string' }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (activePlan) {
                await base44.entities.MarketingPlan.update(activePlan.id, { is_active: false, status: 'completed' });
            }

            const newPlan = await base44.entities.MarketingPlan.create({
                plan_type: 'email_marketing',
                title: result.title,
                plan_data: result,
                is_active: true,
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                previous_plan_id: activePlan?.id || null,
                generation_context: businessContext,
                status: 'active'
            });

            setActivePlan(newPlan);
            toast.success('90-day email marketing plan generated!');
        } catch (error) {
            console.error('Error generating plan:', error);
            toast.error('Failed to generate plan');
        } finally {
            setGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6 pb-24">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <Link to={createPageUrl('MarketingOverview')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-3">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Marketing Hub
                    </Link>
                    <h1 className="text-3xl font-bold text-[var(--text-main)] flex items-center gap-3">
                        <Mail className="w-8 h-8 text-blue-600" />
                        Email Marketing Planner
                    </h1>
                    <p className="text-[var(--text-soft)] mt-2">
                        Generate your 90-day email marketing strategy with AI
                    </p>
                </div>

                {/* Generate Plan Section */}
                {!activePlan ? (
                    <div className="card p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
                        <div className="text-center">
                            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl inline-block mb-4">
                                <Mail className="w-12 h-12 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                                Generate Your 90-Day Email Marketing Plan
                            </h2>
                            <p className="text-[var(--text-soft)] max-w-2xl mx-auto mb-6">
                                Our AI will create a personalized email marketing strategy based on your business profile, 
                                ideal client, and revenue goals. Get weekly themes, sequence ideas, subject lines, and engagement tactics.
                            </p>
                            <Button 
                                onClick={generatePlan}
                                disabled={generating}
                                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                            >
                                {generating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Generating Plan...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        Generate My Email Plan
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Active Plan Header */}
                        <div className="card p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{activePlan.plan_data.title}</h2>
                                    <p className="text-white/90 mb-4">{activePlan.plan_data.overview}</p>
                                    <div className="flex gap-3 text-sm">
                                        <div className="bg-white/20 px-3 py-1 rounded-full">
                                            📅 {new Date(activePlan.start_date).toLocaleDateString()} - {new Date(activePlan.end_date).toLocaleDateString()}
                                        </div>
                                        <div className="bg-white/20 px-3 py-1 rounded-full">
                                            {activePlan.previous_plan_id ? '🔄 Building on previous plan' : '🆕 First plan'}
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    onClick={generatePlan}
                                    disabled={generating}
                                    className="bg-white text-blue-600 hover:bg-gray-100"
                                >
                                    {generating ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 mr-2" />
                                    )}
                                    New Plan
                                </Button>
                            </div>
                        </div>

                        {/* Month Navigation */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {activePlan.plan_data.months?.map((month, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedMonth(idx)}
                                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                        selectedMonth === idx
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Month {month.month || (idx + 1)}
                                </button>
                            ))}
                        </div>

                        {/* Month Content */}
                        {activePlan.plan_data.months?.[selectedMonth] && (
                            <div className="space-y-4">
                                <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                        {activePlan.plan_data.months[selectedMonth].theme}
                                    </h3>
                                    <p className="text-[var(--text-soft)]">
                                        {activePlan.plan_data.months[selectedMonth].focus}
                                    </p>
                                </div>

                                {/* Weekly Breakdown */}
                                {activePlan.plan_data.months[selectedMonth].weeks?.map((week, weekIdx) => (
                                    <div key={weekIdx} className="card p-5 bg-white dark:bg-gray-900">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                                                <Calendar className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[var(--text-main)]">Week {week.week || (weekIdx + 1)}</h4>
                                                <p className="text-sm text-[var(--text-soft)]">{week.focus}</p>
                                            </div>
                                        </div>

                                        {/* Email Sequences */}
                                        {week.email_sequences && week.email_sequences.length > 0 && (
                                            <div className="space-y-3">
                                                {week.email_sequences.map((email, emailIdx) => (
                                                    <div key={emailIdx} className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                                                    {email.day || (emailIdx + 1)}
                                                                </div>
                                                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                                                    {email.email_type}
                                                                </span>
                                                            </div>
                                                            <Send className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <h5 className="font-semibold text-[var(--text-main)] mb-1">
                                                            Subject: {email.subject_line}
                                                        </h5>
                                                        <p className="text-sm text-[var(--text-soft)] mb-2">
                                                            <strong>Topic:</strong> {email.topic}
                                                        </p>
                                                        <p className="text-xs text-[var(--text-soft)] mb-2">
                                                            <strong>Goal:</strong> {email.goal}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                            <Target className="w-3 h-3 text-green-600" />
                                                            <span className="text-xs font-medium text-green-600">{email.cta}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* HQ Execution CTA */}
                        <div className="card p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <div className="text-center">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 text-white" />
                                <h3 className="text-xl font-bold mb-2">Execute This Plan in The Business Minds HQ</h3>
                                <p className="text-white/90 mb-4 max-w-2xl mx-auto">
                                    Your email strategy is ready! Log into The HQ to send campaigns, build automated sequences, 
                                    manage subscribers, and track performance—all in one platform.
                                </p>
                                <a 
                                    href="https://app.thebminds.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn bg-white text-blue-600 hover:bg-gray-100 font-bold inline-flex items-center"
                                >
                                    Launch The HQ
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Previous Plans */}
                {previousPlans.length > 0 && (
                    <div className="card p-6">
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">Previous Plans</h3>
                        <div className="space-y-2">
                            {previousPlans.map((plan) => (
                                <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <p className="font-medium text-[var(--text-main)]">{plan.title}</p>
                                        <p className="text-xs text-[var(--text-soft)]">
                                            {new Date(plan.start_date).toLocaleDateString()} - {new Date(plan.end_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        {plan.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}