import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Target, Users, Zap, TrendingUp, Calendar, Sparkles, Loader2,
    MessageSquare, BarChart, Globe, Mail, Phone, Edit, Plus, CheckCircle, ArrowLeft,
    DollarSign, ShoppingCart, FileText, Send, UserPlus, Share2, X, ChevronDown, RefreshCw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import AIMarketingGenerator from "@/components/marketing/AIMarketingGenerator";
import AITeamModal from "@/components/ai/AITeamModal";
import MarketingStrategyDashboard from "@/components/marketing/MarketingStrategyDashboard";
import HQExecutionGuide from "@/components/marketing/HQExecutionGuide";

export default function MarketingOverviewPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [annualPlan, setAnnualPlan] = useState(null);
    const [socialMediaPlan, setSocialMediaPlan] = useState(null);
    const [expandedMonth, setExpandedMonth] = useState(1);
    const [financialGoals, setFinancialGoals] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [business, setBusiness] = useState(null);
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiAssistantType, setAiAssistantType] = useState('ava');
    const [selectedChannels, setSelectedChannels] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            // Extract financial projections
            if (userData.financial_projections) {
                setFinancialGoals(userData.financial_projections);
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

            // Fetch Business
            const businesses = await base44.entities.Business.filter({ owner_user_id: userData.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
            }
        } catch (error) {
            console.error("Error loading marketing data:", error);
            toast.error("Failed to load marketing data");
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

    // Check if business overview is complete enough for marketing plan
    const hasBusinessFoundation = business && (
        business.description || 
        strategyDocs.ideal_client?.is_completed || 
        strategyDocs.value_proposition_canvas?.is_completed ||
        financialGoals?.products?.length > 0
    );

    const openAIAssistant = (assistantType) => {
        setAiAssistantType(assistantType);
        setShowAIModal(true);
    };

    const toggleChannel = (channel) => {
        setSelectedChannels(prev => 
            prev.includes(channel) 
                ? prev.filter(c => c !== channel)
                : [...prev, channel]
        );
    };

    // Calculate overall marketing progress
    const overallProgress = React.useMemo(() => {
        const milestones = [
            !!strategyDocs.ideal_client?.is_completed,
            !!strategyDocs.value_proposition_canvas?.is_completed,
            !!strategyDocs.brand_kit?.is_completed,
            !!financialGoals?.freedomNumber,
            !!socialMediaPlan,
            !!annualPlan
        ];
        const completedCount = milestones.filter(Boolean).length;
        return Math.round((completedCount / milestones.length) * 100);
    }, [strategyDocs, financialGoals, socialMediaPlan, annualPlan]);

    const marketingChannels = [
        { id: 'social_media', label: 'Social Media', icon: Share2, color: 'pink' },
        { id: 'email', label: 'Email Marketing', icon: Mail, color: 'blue' },
        { id: 'paid_ads', label: 'Paid Advertising', icon: BarChart, color: 'green' },
        { id: 'content', label: 'Content Marketing', icon: FileText, color: 'purple' },
        { id: 'seo', label: 'SEO', icon: TrendingUp, color: 'indigo' },
        { id: 'partnerships', label: 'Strategic Partnerships', icon: Users, color: 'orange' }
    ];

    const handleRefreshContent = async () => {
        setRefreshing(true);
        try {
            await loadData();
            toast.success("Marketing content refreshed successfully!");
        } catch (error) {
            toast.error("Failed to refresh content");
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Marketing Strategy Dashboard */}
                <MarketingStrategyDashboard
                    user={user}
                    strategyDocs={strategyDocs}
                    financialGoals={financialGoals}
                    socialMediaPlan={socialMediaPlan}
                    annualPlan={annualPlan}
                    business={business}
                />

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <Link to={createPageUrl('BusinessOverview')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-2">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Business Overview
                        </Link>
                        <h1 className="text-3xl font-bold text-[var(--text-main)] flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-[var(--primary-gold)]" />
                            Marketing Hub
                        </h1>
                        <p className="text-[var(--text-soft)] mt-1">
                            Your complete marketing strategy, planning, and messaging center
                        </p>
                    </div>
                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                        <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                            <Sparkles className="w-4 h-4 mr-2" />
                            AI Assistance
                        </Button>
                    </Link>
                </div>

                {/* AI Marketing Plan Generator - Priority CTA */}
                {hasBusinessFoundation ? (
                    <div className="card p-8 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white border-4 border-white shadow-2xl">
                        <div className="flex flex-col items-center gap-6">
                            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                                <Sparkles className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className="text-3xl font-bold mb-2">Ready to Build Your Complete Marketing Plan?</h2>
                                <p className="text-white/90 mb-4">
                                    Your business foundation is in place! Select the marketing channels you want to focus on, 
                                    and our AI Marketing Strategist (Ava) will create a comprehensive, personalized plan with 
                                    strategies, content calendars, ad copy examples, and KPIs for each channel.
                                </p>
                                
                                {/* Channel Selection */}
                                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl mb-4">
                                    <h3 className="text-lg font-bold mb-3">Select Your Marketing Channels:</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {marketingChannels.map(channel => {
                                            const Icon = channel.icon;
                                            const isSelected = selectedChannels.includes(channel.id);
                                            
                                            return (
                                                <button
                                                    key={channel.id}
                                                    onClick={() => toggleChannel(channel.id)}
                                                    className={`p-3 rounded-lg border-2 transition-all ${
                                                        isSelected
                                                            ? 'bg-white text-purple-600 border-white shadow-lg scale-105'
                                                            : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                                                    }`}
                                                >
                                                    <Icon className="w-5 h-5 mx-auto mb-1" />
                                                    <div className="text-xs font-semibold">{channel.label}</div>
                                                    {isSelected && <CheckCircle className="w-4 h-4 mx-auto mt-1" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {selectedChannels.length === 0 && (
                                        <p className="text-sm text-white/80 mt-3 text-center">
                                            Select at least one channel to generate a focused plan
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 text-sm mb-4 justify-center">
                                    <div className="bg-white/20 px-3 py-1 rounded-full">✓ Channel-Specific Strategies</div>
                                    <div className="bg-white/20 px-3 py-1 rounded-full">✓ Content Calendar Ideas</div>
                                    <div className="bg-white/20 px-3 py-1 rounded-full">✓ Ad Copy Examples</div>
                                    <div className="bg-white/20 px-3 py-1 rounded-full">✓ KPIs & Metrics</div>
                                </div>
                            </div>
                            <Button 
                                onClick={() => openAIAssistant('ava')}
                                disabled={selectedChannels.length === 0}
                                className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Sparkles className="w-5 h-5 mr-2" />
                                Generate My Marketing Plan
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="card p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-xl">
                                <Target className="w-12 h-12 text-yellow-600" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Complete Your Business Foundation First</h2>
                                <p className="text-[var(--text-soft)] mb-4">
                                    Before creating your marketing plan, you need to define your business basics: who you serve, 
                                    what you offer, and your revenue goals. This ensures your marketing is targeted and effective.
                                </p>
                                <div className="flex flex-wrap gap-2 text-sm text-[var(--text-soft)]">
                                    <div className="flex items-center gap-1">
                                        {strategyDocs.ideal_client?.is_completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                                        <span>Ideal Client Profile</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {strategyDocs.value_proposition_canvas?.is_completed ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                                        <span>Value Proposition</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {financialGoals?.products?.length > 0 ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                                        <span>Products/Services & Goals</span>
                                    </div>
                                </div>
                            </div>
                            <Link to={createPageUrl('BusinessOverview')}>
                                <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 font-bold text-lg px-8 py-6">
                                    <ArrowRight className="w-5 h-5 mr-2" />
                                    Complete Business Overview
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Financial Goals & Targets */}
                {financialGoals && (
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">Marketing Revenue Targets</h2>
                                    <p className="text-sm text-[var(--text-soft)]">Sales goals to achieve your freedom number</p>
                                </div>
                            </div>
                            <Link to={createPageUrl('FreedomCalculator')}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Update Goals
                                </Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-sm text-[var(--text-soft)] mb-1">Freedom Number</div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${Math.round(financialGoals.freedomNumber || 0).toLocaleString()}/mo
                                </div>
                                <div className="text-xs text-[var(--text-soft)] mt-1">
                                    ${Math.round((financialGoals.freedomNumber || 0) * 12).toLocaleString()}/year
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-sm text-[var(--text-soft)] mb-1">Monthly Expenses</div>
                                <div className="text-2xl font-bold text-[var(--primary-gold)]">
                                    ${(financialGoals.monthlyExpenses || 0).toLocaleString()}
                                </div>
                                <div className="text-xs text-[var(--text-soft)] mt-1">personal + business</div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="text-sm text-[var(--text-soft)] mb-1">Desired Salary</div>
                                <div className="text-2xl font-bold text-blue-600">
                                    ${(financialGoals.desiredSalary || 0).toLocaleString()}
                                </div>
                                <div className="text-xs text-[var(--text-soft)] mt-1">monthly take-home</div>
                            </div>
                        </div>

                        {financialGoals.products && financialGoals.products.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4 text-green-600" />
                                    Your Products/Services ({financialGoals.products.filter(p => p.name && p.price).length})
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {financialGoals.products.filter(p => p.name && p.price).map((product, idx) => {
                                        const price = parseFloat(product.price) || 0;
                                        const cost = parseFloat(product.cost) || 0;
                                        const costPerUnit = product.costType === 'per_unit' ? cost : 0;
                                        const fixedMonthlyCost = product.costType === 'monthly_subscription' ? cost : 0;
                                        const profitPerUnit = price - costPerUnit;
                                        
                                        // Calculate units needed to reach freedom number
                                        const targetProfit = financialGoals.freedomNumber + fixedMonthlyCost;
                                        const unitsNeeded = profitPerUnit > 0 ? Math.ceil(targetProfit / profitPerUnit) : 0;
                                        const monthlyRevenue = unitsNeeded * price;
                                        
                                        return (
                                            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)] transition-all">
                                                <div className="font-bold text-lg text-[var(--text-main)] mb-3">{product.name}</div>
                                                
                                                {/* Pricing Info */}
                                                <div className="space-y-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[var(--text-soft)]">Price per {product.pricingType === 'monthly_subscription' ? 'month' : 'unit'}:</span>
                                                        <span className="font-semibold text-[var(--text-main)]">${price.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[var(--text-soft)]">Cost per {product.costType === 'monthly_subscription' ? 'month' : 'unit'}:</span>
                                                        <span className="font-semibold text-red-600">${cost.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[var(--text-soft)]">Profit per unit:</span>
                                                        <span className="font-semibold text-green-600">${profitPerUnit.toLocaleString()}</span>
                                                    </div>
                                                </div>

                                                {/* Sales Targets */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[var(--text-soft)]">
                                                            {product.pricingType === 'monthly_subscription' ? 'Subscribers needed:' : 'Units to sell:'}
                                                        </span>
                                                        <span className="font-bold text-green-600">{unitsNeeded.toLocaleString()}/mo</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-[var(--text-soft)]">Annual target:</span>
                                                        <span className="font-bold text-blue-600">{(unitsNeeded * 12).toLocaleString()}/yr</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                                                        <span className="text-[var(--text-soft)]">Monthly Revenue:</span>
                                                        <span className="font-bold text-[var(--primary-gold)]">${Math.round(monthlyRevenue).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* AI Marketing Content Generator */}
                <AIMarketingGenerator 
                    user={user}
                    idealClient={idealClient}
                    valueProposition={valueProposition.value_proposition}
                    brandVoice={brandKit.brand_voice}
                />

                {/* Core Marketing Strategy */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Target className="w-6 h-6 text-[var(--primary-gold)]" />
                            Core Marketing Strategy
                        </h2>
                        <Button 
                            onClick={handleRefreshContent} 
                            variant="outline" 
                            size="sm"
                            disabled={refreshing}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                            Refresh Content
                        </Button>
                    </div>

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
                                    {idealClient.goals && (
                                        <div>
                                            <span className="text-[var(--text-soft)]">Goals:</span>
                                            <p className="text-[var(--text-main)]">{idealClient.goals}</p>
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

                {/* Understanding Your Online Presence Options */}
                <div className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800 mb-8">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Globe className="w-6 h-6 text-indigo-600" />
                        Understanding Your Online Presence Options
                    </h2>
                    <p className="text-sm text-[var(--text-soft)] mb-6">
                        Before building, understand what type of online presence fits your business goals:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-600" />
                                Full Business Website
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-2">
                                <strong>Purpose:</strong> Comprehensive online home base showcasing everything about your business
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                <strong>Best For:</strong> Established businesses, service providers, agencies, consultants
                            </p>
                            <div className="text-xs text-[var(--text-soft)] space-y-1">
                                <p>✓ Multiple pages (Home, About, Services, Portfolio, Blog, Contact)</p>
                                <p>✓ SEO optimization for organic traffic</p>
                                <p>✓ Credibility and professional image</p>
                                <p>✓ Educational content and resources</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-600" />
                                Landing Page
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-2">
                                <strong>Purpose:</strong> Single-focus page designed to convert visitors into leads or customers
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                <strong>Best For:</strong> Product launches, lead magnets, event registrations, specific offers
                            </p>
                            <div className="text-xs text-[var(--text-soft)] space-y-1">
                                <p>✓ One clear call-to-action (CTA)</p>
                                <p>✓ Minimal distractions (no navigation menu)</p>
                                <p>✓ High conversion optimization</p>
                                <p>✓ Perfect for paid advertising campaigns</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                Online Community Platform
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-2">
                                <strong>Purpose:</strong> Interactive space where customers connect, share, and engage
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                <strong>Best For:</strong> Membership sites, coaching programs, courses, support groups
                            </p>
                            <div className="text-xs text-[var(--text-soft)] space-y-1">
                                <p>✓ Member discussions and networking</p>
                                <p>✓ Exclusive content and resources</p>
                                <p>✓ Builds loyalty and recurring revenue</p>
                                <p>✓ Creates brand advocates</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-orange-600" />
                                E-Commerce Store
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-2">
                                <strong>Purpose:</strong> Online storefront for selling physical or digital products
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                <strong>Best For:</strong> Product-based businesses, digital products, subscription boxes
                            </p>
                            <div className="text-xs text-[var(--text-soft)] space-y-1">
                                <p>✓ Product catalog with search/filtering</p>
                                <p>✓ Shopping cart and secure checkout</p>
                                <p>✓ Inventory and order management</p>
                                <p>✓ Customer accounts and order tracking</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-[var(--primary-gold)]">
                        <p className="text-sm text-[var(--text-main)]">
                            <strong>💡 Smart Strategy:</strong> Most successful businesses use a combination:
                        </p>
                        <ul className="text-sm text-[var(--text-soft)] mt-2 space-y-1 ml-4">
                            <li>• <strong>Website</strong> as your home base for credibility and SEO</li>
                            <li>• <strong>Landing pages</strong> for specific campaigns and lead generation</li>
                            <li>• <strong>Social media</strong> for community building and engagement</li>
                            <li>• <strong>Email list</strong> to own your audience communication</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Strategy & Purpose */}
                <div className="card p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-2 border-pink-200 dark:border-pink-800 mb-8">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Share2 className="w-6 h-6 text-pink-600" />
                        Your Social Media Strategy & Purpose
                    </h2>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-pink-300 dark:border-pink-700 mb-4">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">
                            🎯 The #1 Goal: Build Relationships, Not Just Followers
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-4">
                            For small business owners, social media is NOT about going viral or chasing follower counts. 
                            It's about creating genuine connections with your ideal customers and building a community 
                            that knows, likes, and trusts you enough to buy from you.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    What TO Focus On
                                </h4>
                                <ul className="text-xs text-[var(--text-soft)] space-y-1">
                                    <li>✓ Engaging with comments and DMs personally</li>
                                    <li>✓ Sharing valuable tips and insights</li>
                                    <li>✓ Showcasing behind-the-scenes of your business</li>
                                    <li>✓ Building trust through consistency</li>
                                    <li>✓ Directing followers to your email list or website</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                                    <X className="w-4 h-4" />
                                    What NOT To Focus On
                                </h4>
                                <ul className="text-xs text-[var(--text-soft)] space-y-1">
                                    <li>✗ Obsessing over likes and follower count</li>
                                    <li>✗ Posting without a purpose or strategy</li>
                                    <li>✗ Being on every single platform</li>
                                    <li>✗ Copying competitors without authenticity</li>
                                    <li>✗ Only promoting/selling (no value)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">🎪 Social Media's True Role in Your Business</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                <div>
                                    <div className="font-medium text-blue-600 mb-1">Top of Funnel</div>
                                    <p className="text-xs text-[var(--text-soft)]">Attract attention and introduce people to your brand through valuable content</p>
                                </div>
                                <div>
                                    <div className="font-medium text-purple-600 mb-1">Middle of Funnel</div>
                                    <p className="text-xs text-[var(--text-soft)]">Build trust by engaging, educating, and showing your expertise consistently</p>
                                </div>
                                <div>
                                    <div className="font-medium text-green-600 mb-1">Bottom of Funnel</div>
                                    <p className="text-xs text-[var(--text-soft)]">Drive traffic to your website, landing pages, or email list where sales happen</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-[var(--primary-gold)]">
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-2">
                                💰 Remember: Social Media Builds the Relationship, But Sales Happen on YOUR Platforms
                            </p>
                            <p className="text-xs text-[var(--text-soft)]">
                                Use social media to warm up your audience, then guide them to your email list, website, or booking page 
                                where you control the conversation and can close the sale. You don't own your social media followers—
                                algorithms can change overnight. Always be building your email list in parallel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Website Content Strategy - Enhanced with User Data */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Globe className="w-6 h-6 text-[var(--primary-gold)]" />
                            Your Website Content & Messaging
                        </h2>
                        <Link to={createPageUrl('MyFoundationRoadmap')}>
                            <Button variant="outline" size="sm">
                                <FileText className="w-4 h-4 mr-2" />
                                Strategy Tools
                            </Button>
                        </Link>
                    </div>

                    {/* User's Messaging Summary */}
                    {(idealClient.demographics || valueProposition.value_proposition || brandKit.brand_voice || socialMediaPlan) && (
                        <div className="bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 p-5 rounded-lg border-2 border-[var(--primary-gold)]/30 mb-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
                                Your Core Messaging (Use This Everywhere!)
                            </h3>

                            {idealClient.demographics && (
                                <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        Who You're Talking To
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)] mb-2"><strong>Demographics:</strong> {idealClient.demographics}</p>
                                    {idealClient.pain_points && (
                                        <p className="text-sm text-[var(--text-soft)] mb-2"><strong>Their Struggles:</strong> {idealClient.pain_points}</p>
                                    )}
                                    {idealClient.goals && (
                                        <p className="text-sm text-[var(--text-soft)]"><strong>What They Want:</strong> {idealClient.goals}</p>
                                    )}
                                </div>
                            )}

                            {valueProposition.value_proposition && (
                                <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-[var(--primary-gold)]" />
                                        What Makes You Different
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)]">{valueProposition.value_proposition}</p>
                                    {valueProposition.benefits && (
                                        <p className="text-sm text-[var(--text-soft)] mt-2"><strong>Key Benefits:</strong> {valueProposition.benefits}</p>
                                    )}
                                </div>
                            )}

                            {brandKit.brand_voice && (
                                <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-purple-600" />
                                        How You Sound
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)]">{brandKit.brand_voice}</p>
                                </div>
                            )}

                            {socialMediaPlan && socialMediaPlan.plan_data?.months?.[0] && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-pink-600" />
                                        Current Social Media Focus
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)]">
                                        <strong>Month 1:</strong> {socialMediaPlan.plan_data.months[0].theme || 'Building Foundation'}
                                    </p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">{socialMediaPlan.plan_data.months[0].focus}</p>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-[var(--primary-gold)]/20">
                                <p className="text-xs text-[var(--text-soft)] italic">
                                    💡 Use this messaging foundation consistently across your homepage, about page, social media, and all marketing materials.
                                </p>
                            </div>
                        </div>
                    )}

                    <Accordion type="multiple" className="space-y-4">
                        {/* Homepage Hero Section */}
                        <AccordionItem value="homepage" className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-[var(--text-main)] text-lg">Homepage Hero Section</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4">
                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <span className="font-medium text-blue-600 mb-2 block">📢 Headline Formula:</span>
                                        <p className="text-sm text-[var(--text-soft)] mb-3">
                                            {valueProposition.value_proposition 
                                                ? `"${valueProposition.value_proposition}"`
                                                : '"[Desired Result] for [Target Audience] Without [Pain Point]"'
                                            }
                                        </p>
                                        <p className="text-xs text-[var(--text-soft)] italic">
                                            Example: "Get More Clients in 90 Days Without Spending a Fortune on Ads"
                                        </p>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <span className="font-medium text-blue-600 mb-2 block">💬 Subheadline (Elaborate):</span>
                                        <p className="text-sm text-[var(--text-soft)]">
                                            Expand on your headline with specific benefits or how you achieve the result in 1-2 sentences.
                                        </p>
                                        <p className="text-xs text-[var(--text-soft)] italic mt-2">
                                            Example: "Our proven 90-day marketing system helps service-based entrepreneurs attract ideal clients through strategic content and relationship building—no expensive ads required."
                                        </p>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <span className="font-medium text-blue-600 mb-2 block">🎯 Call-to-Action Button:</span>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">"Get Started Free"</span>
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">"Book Your Free Call"</span>
                                            <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm">"See How It Works"</span>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* About Page Strategy */}
                        <AccordionItem value="about" className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-[var(--text-main)] text-lg">About Page</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4">
                                <div className="space-y-3 text-sm">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-purple-600 mb-1">1. Your Origin Story</p>
                                        <p className="text-xs text-[var(--text-soft)]">Why did you start this business? What problem were you trying to solve for yourself or others?</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-purple-600 mb-1">2. Mission & Values</p>
                                        <p className="text-xs text-[var(--text-soft)]">What do you stand for? What drives your business decisions and how you serve clients?</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-purple-600 mb-1">3. How You Help</p>
                                        <p className="text-xs text-[var(--text-soft)]">Explain your process, methodology, or approach. What makes working with you different?</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-purple-600 mb-1">4. Social Proof</p>
                                        <p className="text-xs text-[var(--text-soft)]">Include testimonials, case studies, client results, or credentials to build credibility</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Services/Products Page */}
                        <AccordionItem value="services" className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 overflow-hidden">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-[var(--text-main)] text-lg">Services/Products Page</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4">
                                {financialGoals?.products && financialGoals.products.length > 0 && (
                                    <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                                        <p className="text-sm font-medium text-[var(--text-main)] mb-3">✨ Your Current Offerings:</p>
                                        <div className="space-y-2">
                                            {financialGoals.products.filter(p => p.name && p.price).map((product, idx) => (
                                                <div key={idx} className="text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                                    <div className="font-semibold text-[var(--text-main)]">{product.name}</div>
                                                    <div className="text-xs text-[var(--text-soft)]">
                                                        Pricing: ${parseFloat(product.price).toLocaleString()}{product.pricingType === 'monthly_subscription' ? '/month' : ''}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 text-sm">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-green-600 mb-1">✓ Lead with Benefits, Not Features</p>
                                        <p className="text-xs text-[var(--text-soft)]">Instead of "10 hours of coaching," say "Transform your business in 10 weeks with weekly 1-on-1 strategy sessions"</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-green-600 mb-1">✓ Clear Pricing or "Starting At"</p>
                                        <p className="text-xs text-[var(--text-soft)]">Be transparent. If custom pricing, show starting price or range to qualify leads</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-green-600 mb-1">✓ Specific Next Steps</p>
                                        <p className="text-xs text-[var(--text-soft)]">Each service should have a button: "Book Discovery Call," "Enroll Now," "Get Quote"</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-green-600 mb-1">✓ Bullet Points for Scanning</p>
                                        <p className="text-xs text-[var(--text-soft)]">People skim. Use bullets for what's included, process, and deliverables</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Contact Page */}
                        <AccordionItem value="contact" className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 overflow-hidden">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-yellow-600" />
                                    <span className="font-semibold text-[var(--text-main)] text-lg">Contact Page</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-4">
                                <div className="space-y-3 text-sm">
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-yellow-600 mb-1">• Multiple Contact Options</p>
                                        <p className="text-xs text-[var(--text-soft)]">Form, email, phone, and social media. People have preferences—accommodate them all</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-yellow-600 mb-1">• Response Time Expectations</p>
                                        <p className="text-xs text-[var(--text-soft)]">"We respond within 24 business hours" sets clear expectations and builds trust</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-yellow-600 mb-1">• Location/Service Area</p>
                                        <p className="text-xs text-[var(--text-soft)]">If local or regional, specify where you serve to qualify leads properly</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                                        <p className="font-medium text-yellow-600 mb-1">• Link to Social Profiles</p>
                                        <p className="text-xs text-[var(--text-soft)]">Let people follow you and see more of your content before reaching out</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="mt-6 bg-[var(--primary-gold)]/10 p-4 rounded-lg border border-[var(--primary-gold)]/20">
                        <p className="text-sm text-[var(--text-soft)]">
                            💡 <span className="font-medium text-[var(--text-main)]">Pro Tip:</span> Use your AI assistants to generate custom website copy based on your value proposition and target audience defined above.
                        </p>
                    </div>
                </div>

                {/* Welcome Email Templates */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Send className="w-6 h-6 text-[var(--primary-gold)]" />
                            Welcome Email Sequence
                        </h2>
                        <Link to={createPageUrl('ElyzetAIAssistants')}>
                            <Button variant="outline" size="sm">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Custom
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-[var(--text-soft)] mb-6">
                        A strong welcome sequence builds trust and sets expectations. Here's a proven 3-email framework:
                    </p>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                                <h4 className="font-semibold text-[var(--text-main)]">Welcome & Deliver (Day 1)</h4>
                            </div>
                            <div className="text-sm space-y-1 ml-8">
                                <p className="text-[var(--text-main)]"><strong>Subject:</strong> Welcome! Here's Your [Freebie/Resource]</p>
                                <p className="text-[var(--text-soft)]">• Warm welcome and thank you</p>
                                <p className="text-[var(--text-soft)]">• Deliver promised resource immediately</p>
                                <p className="text-[var(--text-soft)]">• Set expectations for future emails</p>
                                <p className="text-[var(--text-soft)]">• Invite reply or social media connection</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border-l-4 border-purple-500">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                                <h4 className="font-semibold text-[var(--text-main)]">Your Story & Value (Day 3)</h4>
                            </div>
                            <div className="text-sm space-y-1 ml-8">
                                <p className="text-[var(--text-main)]"><strong>Subject:</strong> Why I Started [Your Business]</p>
                                <p className="text-[var(--text-soft)]">• Share your origin story</p>
                                <p className="text-[var(--text-soft)]">• Explain your mission and values</p>
                                <p className="text-[var(--text-soft)]">• Build emotional connection</p>
                                <p className="text-[var(--text-soft)]">• Introduce your main offer or services</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                                <h4 className="font-semibold text-[var(--text-main)]">Next Steps & Offer (Day 5)</h4>
                            </div>
                            <div className="text-sm space-y-1 ml-8">
                                <p className="text-[var(--text-main)]"><strong>Subject:</strong> Ready to [Achieve Desired Result]?</p>
                                <p className="text-[var(--text-soft)]">• Present clear call-to-action</p>
                                <p className="text-[var(--text-soft)]">• Offer special welcome discount or bonus</p>
                                <p className="text-[var(--text-soft)]">• Share social proof (testimonials, results)</p>
                                <p className="text-[var(--text-soft)]">• Create urgency (limited time or spots)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Link to={createPageUrl('ElyzetAIAssistants')}>
                            <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate My Welcome Emails
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 90-Day Step-by-Step Social Media Plan */}
                <Accordion type="single" collapsible className="card overflow-hidden bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <AccordionItem value="social-media-plan" className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-[var(--primary-gold)]" />
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">90-Day Social Media Action Plan</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    {socialMediaPlan ? (
                                        <Link to={createPageUrl('SocialMediaPlanner')} onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="w-4 h-4 mr-2" />
                                                Manage Plans
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link to={createPageUrl('SocialMediaPlanner')} onClick={(e) => e.stopPropagation()}>
                                            <Button size="sm">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Generate Plan
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            {socialMediaPlan ? (
                                <div className="space-y-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-3">
                                            <BarChart className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <h4 className="font-semibold text-[var(--text-main)]">Active Plan: {socialMediaPlan.source_name}</h4>
                                                <p className="text-sm text-[var(--text-soft)]">
                                                    Source: {socialMediaPlan.source_type === 'goal' ? 'Your Goal' : socialMediaPlan.source_type === 'niche' ? 'Niche Roadmap' : 'Focused Program'}
                                                </p>
                                                {socialMediaPlan.plan_data?.overview && (
                                                    <p className="text-xs text-[var(--text-soft)] mt-2">{socialMediaPlan.plan_data.overview}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Month Navigation */}
                                    {socialMediaPlan.plan_data?.months && socialMediaPlan.plan_data.months.length > 0 && (
                                        <>
                                            <div className="flex gap-2 mb-4">
                                                {socialMediaPlan.plan_data.months.map((month, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setExpandedMonth(idx)}
                                                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                            expandedMonth === idx
                                                                ? 'bg-[var(--primary-gold)] text-white'
                                                                : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        Month {month.month || (idx + 1)}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Display Selected Month */}
                                            {socialMediaPlan.plan_data.months[expandedMonth] && (
                                                <div className="space-y-4">
                                                    <div className="bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 p-4 rounded-lg border border-[var(--primary-gold)]/20">
                                                        <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">
                                                            {socialMediaPlan.plan_data.months[expandedMonth].theme}
                                                        </h4>
                                                        <p className="text-sm text-[var(--text-soft)]">
                                                            {socialMediaPlan.plan_data.months[expandedMonth].focus}
                                                        </p>
                                                    </div>

                                                    {/* Weeks */}
                                                    {socialMediaPlan.plan_data.months[expandedMonth].weeks && socialMediaPlan.plan_data.months[expandedMonth].weeks.length > 0 && (
                                                        <div className="space-y-3">
                                                            {socialMediaPlan.plan_data.months[expandedMonth].weeks.map((week, weekIdx) => (
                                                                <div key={weekIdx} className="card p-4 bg-white dark:bg-gray-800">
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="bg-[var(--primary-gold)]/20 p-2 rounded-lg">
                                                                            <Calendar className="w-4 h-4 text-[var(--primary-gold)]" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <h5 className="font-semibold text-[var(--text-main)] mb-2">
                                                                                Week {week.week || (weekIdx + 1)}: {week.focus}
                                                                            </h5>
                                                                            
                                                                            {/* Daily Actions */}
                                                                            {week.days && week.days.length > 0 && (
                                                                                <div className="space-y-2">
                                                                                    {week.days.map((day, dayIdx) => (
                                                                                        <div key={dayIdx} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                                                                            <div className="flex items-start gap-2 mb-2">
                                                                                                <span className="font-medium text-[var(--primary-gold)] text-sm">
                                                                                                    Day {day.day || (dayIdx + 1)}:
                                                                                                </span>
                                                                                                <span className="text-xs text-[var(--text-soft)]">{day.platform}</span>
                                                                                                <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                                                                                                    {day.content_type}
                                                                                                </span>
                                                                                            </div>
                                                                                            <p className="text-sm text-[var(--text-main)] font-medium mb-1">{day.topic}</p>
                                                                                            <p className="text-xs text-[var(--text-soft)] mb-2">{day.action}</p>
                                                                                            {day.hq_feature && (
                                                                                                <div className="flex items-center gap-1 text-xs text-[var(--primary-gold)]">
                                                                                                    <Sparkles className="w-3 h-3" />
                                                                                                    Use: {day.hq_feature}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
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
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Craft Marketing Messages Section */}
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-[var(--primary-gold)]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-[var(--primary-gold)]" />
                                Marketing Messages
                            </h2>
                            <p className="text-sm text-[var(--text-soft)] mt-1">Craft compelling messages for every marketing channel</p>
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

                {/* The HQ Execution Platform Guide */}
                <HQExecutionGuide 
                    user={user}
                    hasStrategy={overallProgress >= 50}
                />

                {/* Community Engagement CTA */}
                <div className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Need Marketing Help? The Community Has Your Back
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                Don't tackle marketing alone! Connect with fellow entrepreneurs, ask questions, share your wins, 
                                and get feedback on your marketing strategies in The Business Minds Community. The collective wisdom 
                                and support will accelerate your growth.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to={createPageUrl('TheCommunity')}>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Join the Conversation
                                    </Button>
                                </Link>
                                <Link to={createPageUrl('SocialMediaPlanner')}>
                                    <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        View Content Calendar
                                    </Button>
                                </Link>
                                <Link to={createPageUrl('ElyzetAIAssistants')}>
                                    <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        AI Assistants
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800">
                                <p className="text-xs text-[var(--text-soft)] italic">
                                    💬 Pro tip: Share your marketing challenges in the community and tag specific members for advice. 
                                    The more you engage, the more value you'll receive!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Team Modal */}
            {showAIModal && (
                <AITeamModal
                    isOpen={showAIModal}
                    onClose={() => setShowAIModal(false)}
                    assistantType={aiAssistantType}
                    sectionTitle="Marketing Hub - Complete Marketing Plan"
                    additionalContext={`Business: ${business?.name || user?.business_name || 'Not set'}
Ideal Client: ${idealClient.name || 'Not defined'}
Value Proposition: ${valueProposition.value_proposition || 'Not defined'}
Products/Services: ${financialGoals?.products?.map(p => p.name).join(', ') || 'Not set'}
Freedom Number: $${financialGoals?.freedomNumber || 'Not calculated'}/month`}
                    selectedChannels={selectedChannels}
                    currentBusinessId={business?.id}
                />
            )}
        </div>
    );
}