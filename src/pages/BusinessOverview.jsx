import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Building, Target, Users, Zap, TrendingUp, Calendar,
    Sparkles, ArrowRight, Loader2, Plus, Edit, CheckCircle,
    Lightbulb, MessageSquare, BarChart, Globe, Mail, Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BusinessOverviewPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [annualPlan, setAnnualPlan] = useState(null);
    const [socialMediaPlan, setSocialMediaPlan] = useState(null);
    const [expandedMonth, setExpandedMonth] = useState(1);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            // Fetch user's business
            const businesses = await base44.entities.Business.filter({ owner_user_id: userData.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
            }

            // Fetch strategy documents
            const docs = await base44.entities.StrategyDocument.filter({});
            const docsMap = {};
            docs.forEach(doc => {
                docsMap[doc.document_type] = doc;
            });
            setStrategyDocs(docsMap);

            // Fetch annual plan
            const plans = await base44.entities.AnnualPlan.filter({ status: 'active' }, '-created_date', 1);
            if (plans.length > 0) {
                setAnnualPlan(plans[0]);
            }

            // Fetch active social media plan
            const socialPlans = await base44.entities.SocialMediaPlan.filter({ is_active: true }, '-created_date', 1);
            if (socialPlans.length > 0) {
                setSocialMediaPlan(socialPlans[0]);
            }
        } catch (error) {
            console.error("Error loading business overview:", error);
            toast.error("Failed to load business data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    const idealClient = strategyDocs.ideal_client?.content || {};
    const valueProposition = strategyDocs.value_proposition_canvas?.content || {};
    const brandKit = strategyDocs.brand_kit?.content || {};

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)] flex items-center gap-3">
                            <Building className="w-8 h-8 text-[var(--primary-gold)]" />
                            Complete Business Overview
                        </h1>
                        <p className="text-[var(--text-soft)] mt-1">
                            Your centralized business strategy and marketing command center
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={createPageUrl('ElyzetAIAssistants')}>
                            <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI Assistance
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Core Business Identity */}
                <div className="card p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border-2 border-[var(--primary-gold)]/20">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">Business Identity</h2>
                        {business && (
                            <Link to={createPageUrl('EditBusiness') + `?id=${business.id}`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                    </div>

                    {business ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-[var(--text-soft)] mb-1">Business Name</div>
                                    <div className="text-xl font-bold text-[var(--text-main)]">{business.name}</div>
                                </div>
                                {business.tagline && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Tagline</div>
                                        <div className="text-lg text-[var(--text-main)] italic">"{business.tagline}"</div>
                                    </div>
                                )}
                                {business.description && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Elevator Pitch</div>
                                        <div className="text-[var(--text-main)]">{business.description}</div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {business.industry && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Industry</div>
                                        <div className="text-[var(--text-main)]">{business.industry}</div>
                                    </div>
                                )}
                                {business.services && business.services.length > 0 && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-2">Services Offered</div>
                                        <div className="space-y-2">
                                            {business.services.slice(0, 3).map((service, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-[var(--primary-gold)] mt-0.5" />
                                                    <div>
                                                        <div className="font-medium text-[var(--text-main)]">{service.name}</div>
                                                        {service.description && (
                                                            <div className="text-sm text-[var(--text-soft)]">{service.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-[var(--text-main)] mb-2">No Business Profile Yet</h3>
                            <p className="text-[var(--text-soft)] mb-4">Create your business profile to get started</p>
                            <Link to={createPageUrl('EditBusiness')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Business Profile
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Marketing Strategy & 90-Day Plan Section */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--primary-gold)]/20 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--text-main)]">Marketing Overview & 90-Day Plan</h2>
                                <p className="text-sm text-[var(--text-soft)]">Your complete marketing strategy and action plan</p>
                            </div>
                        </div>
                        <Link to={createPageUrl('ElyzetAIAssistants')}>
                            <Button variant="outline" size="sm">
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI Help
                            </Button>
                        </Link>
                    </div>

                    {/* Core Marketing Strategy */}
                    <div className="space-y-6 mb-8">
                        <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Target className="w-5 h-5 text-[var(--primary-gold)]" />
                            Core Marketing Strategy
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Ideal Client */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[var(--primary-gold)]" />
                                        Target Audience
                                    </h4>
                                    {idealClient.demographics ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Link to={createPageUrl('StrategyFormIdealClient')}>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Define
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                {idealClient.demographics ? (
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-[var(--text-soft)]">Demographics:</span>
                                            <p className="text-[var(--text-main)]">{idealClient.demographics}</p>
                                        </div>
                                        {idealClient.pain_points && (
                                            <div>
                                                <span className="text-[var(--text-soft)]">Pain Points:</span>
                                                <p className="text-[var(--text-main)]">{idealClient.pain_points}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[var(--text-soft)]">Define your ideal client to strengthen your marketing messaging.</p>
                                )}
                            </div>

                            {/* Value Proposition */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-[var(--primary-gold)]" />
                                        Unique Value Proposition
                                    </h4>
                                    {valueProposition.value_proposition ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Link to={createPageUrl('StrategyFormValueProposition')}>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Define
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                {valueProposition.value_proposition ? (
                                    <div className="text-sm">
                                        <p className="text-[var(--text-main)] font-medium">{valueProposition.value_proposition}</p>
                                        {valueProposition.benefits && (
                                            <div className="mt-2">
                                                <span className="text-[var(--text-soft)]">Key Benefits:</span>
                                                <p className="text-[var(--text-main)]">{valueProposition.benefits}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[var(--text-soft)]">Define what makes your business unique.</p>
                                )}
                            </div>

                            {/* Current 90-Day Goal */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                        <Target className="w-4 h-4 text-blue-600" />
                                        90-Day Marketing Goal
                                    </h4>
                                    {annualPlan ? (
                                        <Link to={createPageUrl('AnnualPlanning')}>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Edit className="w-3 h-3 mr-1" />
                                                Edit
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link to={createPageUrl('AnnualPlanning')}>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Set Goal
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                {annualPlan ? (
                                    <div className="text-sm">
                                        <p className="text-[var(--text-main)] font-medium mb-2">{annualPlan.title}</p>
                                        {annualPlan.quarterly_objectives && annualPlan.quarterly_objectives[0] && (
                                            <div>
                                                <span className="text-[var(--text-soft)]">Q1 Focus:</span>
                                                <p className="text-[var(--text-main)]">{annualPlan.quarterly_objectives[0].objective}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[var(--text-soft)]">Set your annual goals to define quarterly marketing objectives.</p>
                                )}
                            </div>

                            {/* Brand Voice */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-[var(--primary-gold)]" />
                                        Brand Voice & Tone
                                    </h4>
                                    {brandKit.brand_voice ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Link to={createPageUrl('StrategyFormBrandKit')}>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Define
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                {brandKit.brand_voice ? (
                                    <p className="text-sm text-[var(--text-main)]">{brandKit.brand_voice}</p>
                                ) : (
                                    <p className="text-sm text-[var(--text-soft)]">Define your brand's voice to maintain consistency.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 90-Day Step-by-Step Social Media Plan */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[var(--primary-gold)]" />
                                90-Day Social Media Action Plan
                            </h3>
                            {socialMediaPlan ? (
                                <Link to={createPageUrl('SocialMediaPlanner')}>
                                    <Button variant="outline" size="sm">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Manage Plans
                                    </Button>
                                </Link>
                            ) : (
                                <Link to={createPageUrl('SocialMediaPlanner')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Generate Plan
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {socialMediaPlan ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3">
                                        <BarChart className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <h4 className="font-semibold text-[var(--text-main)]">Active Plan: {socialMediaPlan.source_name}</h4>
                                            <p className="text-sm text-[var(--text-soft)]">
                                                Source: {socialMediaPlan.source_type === 'goal' ? 'Your Goal' : socialMediaPlan.source_type === 'niche_roadmap' ? 'Niche Roadmap' : 'Focused Program'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Month Navigation */}
                                <div className="flex gap-2 mb-4">
                                    {[1, 2, 3].map(monthNum => (
                                        <button
                                            key={monthNum}
                                            onClick={() => setExpandedMonth(monthNum)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                expandedMonth === monthNum
                                                    ? 'bg-[var(--primary-gold)] text-white'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            Month {monthNum}
                                        </button>
                                    ))}
                                </div>

                                {/* Display Selected Month */}
                                {socialMediaPlan.plan_data && socialMediaPlan.plan_data[`month_${expandedMonth}`] && (
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 p-4 rounded-lg border border-[var(--primary-gold)]/20">
                                            <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">
                                                {socialMediaPlan.plan_data[`month_${expandedMonth}`].theme}
                                            </h4>
                                            <p className="text-sm text-[var(--text-soft)]">
                                                {socialMediaPlan.plan_data[`month_${expandedMonth}`].focus}
                                            </p>
                                        </div>

                                        {/* Weeks */}
                                        <div className="space-y-3">
                                            {Object.entries(socialMediaPlan.plan_data[`month_${expandedMonth}`])
                                                .filter(([key]) => key.startsWith('week_'))
                                                .map(([weekKey, weekData], idx) => (
                                                    <div key={weekKey} className="card p-4 bg-white dark:bg-gray-800">
                                                        <div className="flex items-start gap-3">
                                                            <div className="bg-[var(--primary-gold)]/20 p-2 rounded-lg">
                                                                <Calendar className="w-4 h-4 text-[var(--primary-gold)]" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="font-semibold text-[var(--text-main)] mb-2">
                                                                    Week {idx + 1}: {weekData.focus}
                                                                </h5>
                                                                
                                                                {/* Daily Actions */}
                                                                <div className="space-y-2">
                                                                    {Object.entries(weekData)
                                                                        .filter(([key]) => key.startsWith('day_'))
                                                                        .map(([dayKey, dayContent], dayIdx) => (
                                                                            <div key={dayKey} className="flex items-start gap-2 text-sm">
                                                                                <span className="font-medium text-[var(--primary-gold)] min-w-[50px]">
                                                                                    Day {dayIdx + 1}:
                                                                                </span>
                                                                                <span className="text-[var(--text-main)]">{dayContent}</span>
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <h4 className="text-lg font-medium text-[var(--text-main)] mb-2">No Social Media Plan Yet</h4>
                                <p className="text-[var(--text-soft)] mb-6">Generate a customized 90-day social media plan with AI assistance</p>
                                <Link to={createPageUrl('SocialMediaPlanner')}>
                                    <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Generate Social Media Plan
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* AI Enhancement Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">
                                        Enhance Your Marketing with AI
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)] mb-4">
                                        Use our AI Business Assistants to craft compelling taglines, refine your value proposition, 
                                        generate social media content, and optimize your marketing messaging.
                                    </p>
                                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Launch AI Assistants
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Craft Marketing Messages Section */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[var(--primary-gold)]/20 p-3 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--text-main)]">Marketing Messages</h2>
                                <p className="text-sm text-[var(--text-soft)]">Craft compelling messages for every marketing channel</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Email Subject Lines */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    Email Subject Lines
                                </h4>
                                <Link to={createPageUrl('ElyzetAIAssistants')}>
                                    <Button variant="ghost" size="sm">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        AI Generate
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                High-converting subject lines for email campaigns
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600">1.</span>
                                        <span>Unlock Your [Benefit] in Just 5 Minutes</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600">2.</span>
                                        <span>You're Invited: [Exclusive Offer]</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600">3.</span>
                                        <span>Last Chance: [Time-Sensitive Offer]</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Posts */}
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-pink-600" />
                                    Social Media Hooks
                                </h4>
                                <Link to={createPageUrl('ElyzetAIAssistants')}>
                                    <Button variant="ghost" size="sm">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        AI Generate
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                Attention-grabbing opening lines for social posts
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-pink-600">1.</span>
                                        <span>Here's what nobody tells you about [topic]...</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-pink-600">2.</span>
                                        <span>Stop [common mistake]. Do this instead:</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm text-[var(--text-main)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-pink-600">3.</span>
                                        <span>The [#] secrets to [desired outcome]</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sales Call Scripts */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-green-600" />
                                    Sales Scripts
                                </h4>
                                <Link to={createPageUrl('ElyzetAIAssistants')}>
                                    <Button variant="ghost" size="sm">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        AI Generate
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                Proven conversation starters and objection handlers
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                                    <div className="font-medium text-[var(--text-main)] mb-1">Opening:</div>
                                    <p className="text-[var(--text-soft)]">"Hi [Name], I noticed you're interested in [pain point]. Can I share how we've helped others achieve [result]?"</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                                    <div className="font-medium text-[var(--text-main)] mb-1">Objection Handler:</div>
                                    <p className="text-[var(--text-soft)]">"I understand. Many of our best clients said the same thing before they discovered [value]..."</p>
                                </div>
                            </div>
                        </div>

                        {/* Ad Copy */}
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-purple-600" />
                                    Ad Copy
                                </h4>
                                <Link to={createPageUrl('ElyzetAIAssistants')}>
                                    <Button variant="ghost" size="sm">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        AI Generate
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                High-converting ad copy for paid campaigns
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                                    <div className="font-medium text-[var(--text-main)] mb-1">Headline:</div>
                                    <p className="text-[var(--text-soft)]">[Number] Ways to [Achieve Desire] Without [Pain Point]</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                                    <div className="font-medium text-[var(--text-main)] mb-1">Body:</div>
                                    <p className="text-[var(--text-soft)]">Discover how [ideal client] can [benefit] in [timeframe]. Join [number] others who've already transformed their [area].</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                                    <div className="font-medium text-[var(--text-main)] mb-1">CTA:</div>
                                    <p className="text-[var(--text-soft)]">"Get Started Free" or "Claim Your Spot"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Message Generator CTA */}
                    <div className="bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 p-6 rounded-lg border-2 border-[var(--primary-gold)]/30">
                        <div className="flex items-start gap-4">
                            <div className="bg-[var(--primary-gold)]/20 p-3 rounded-lg">
                                <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">
                                    Need Custom Marketing Messages?
                                </h4>
                                <p className="text-sm text-[var(--text-soft)] mb-4">
                                    Our AI assistants can generate personalized marketing messages based on your business profile, 
                                    target audience, and value proposition. Get custom content for emails, social media, ads, and more.
                                </p>
                                <div className="flex gap-3">
                                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                                        <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate Custom Messages
                                        </Button>
                                    </Link>
                                    <Link to={createPageUrl('SocialMediaPlanner')}>
                                        <Button variant="outline">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            View Content Calendar
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Strategy Tools</h4>
                                <p className="text-xs text-[var(--text-soft)]">Complete your foundation</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>

                    <Link to={createPageUrl('SocialMediaPlanner')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Social Planner</h4>
                                <p className="text-xs text-[var(--text-soft)]">Manage your content</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>

                    <Link to={createPageUrl('AnnualPlanning')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Annual Planning</h4>
                                <p className="text-xs text-[var(--text-soft)]">Set your goals</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}