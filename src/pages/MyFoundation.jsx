import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Target, Grid3x3, TrendingUp, Lightbulb, CheckCircle,
    ArrowRight, Play, Edit3, Clock, Sparkles, Palette, BookOpen,
    Lock, Loader2, Download, Users, HelpCircle, Eye, ChevronDown
} from 'lucide-react';

export default function MyFoundationPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        loadUserAndDocuments();
    }, []);

    const loadUserAndDocuments = async () => {
        try {
            const userData = await User.me();
            if (!userData.onboarding_completed) {
                navigate(createPageUrl("Onboarding"));
                return;
            }
            setUser(userData);

            const userDocs = await StrategyDocument.filter(
                { created_by: userData.email },
                '-updated_date'
            );
            setDocuments(userDocs);
        } catch (error) {
            console.error("Error loading foundation data:", error);
        } finally {
            setLoading(false);
        }
    };

    const hasAccessToTool = (toolId) => {
        if (!user) return false;
        if (user.role === 'admin' || user.role === 'thought_leader') return true;
        if (user.subscription_level === 'launchpad' || user.subscription_level === 'business_hq') return true;

        if (user.subscription_level === 'free') {
            const isTrialActive = user.free_trial_expires_on && new Date(user.free_trial_expires_on) >= new Date();
            const allowedFreeTools = ['ideal_client', 'swot_analysis'];
             if(isTrialActive) {
                allowedFreeTools.push('competitive_analysis');
            }
            if (allowedFreeTools.includes(toolId)) return true;
            
            const existingDoc = documents.find(doc => doc.document_type === toolId);
            return !!existingDoc;
        }
        return false;
    };

    const canExport = (toolId) => {
        return user && (
            user.role === 'admin' ||
            user.role === 'thought_leader' ||
            user.subscription_level === 'launchpad' ||
            user.subscription_level === 'business_hq'
        );
    };

    const handleExportToPDF = async (toolId, existingDoc) => {
        if (!existingDoc || !canExport(toolId)) return;
        setIsExporting(true);
        try {
            await StrategyDocument.exportToPDF(existingDoc.id);
        } catch (error) {
            console.error(`Failed to export ${toolId} document:`, error);
        } finally {
            setIsExporting(false);
        }
    };

    const getStageInfo = (stage) => {
        const stageData = {
            vision: { title: "Vision Stage", description: "Building your foundation and clarifying your direction", color: "text-blue-600" },
            startup: { title: "Startup Stage", description: "Launching and validating your business concept", color: "text-purple-600" },
            growth: { title: "Growth Stage", description: "Scaling and optimizing your established business", color: "text-green-600" }
        };
        return stageData[stage] || stageData.vision;
    };

    const getDocumentByType = (type) => documents.find(doc => doc.document_type === type);

    const getStrategyTools = () => {
        const stage = user?.entrepreneurship_stage || 'vision';
        return [
            {
                id: 'ideal_client',
                title: 'Ideal Client Profile',
                description: 'Define your perfect customer with detailed demographics, psychographics, and pain points.',
                whyItMatters: 'If you try to talk to everyone, you talk to no one. Defining your ideal client is the most critical foundational step. It ensures your marketing, product, and messaging are focused and effective, saving you time and money.',
                howItHelps: 'This tool helps you create a crystal-clear picture of your target customer. This clarity becomes the lens through which you make all business decisions, ensuring you consistently attract and serve the people who need your solution most.',
                icon: Target,
                estimatedTime: '15-20 min',
                order: 1,
                route: 'StrategyFormIdealClient'
            },
            {
                id: 'value_proposition_canvas',
                title: 'Value Proposition Canvas',
                description: 'Perfect your value proposition by matching customer jobs, pains, and gains with your solutions.',
                whyItMatters: 'Your business only exists if it solves a real problem for your ideal client. The Value Proposition Canvas ensures your product or service is a "painkiller" or "gain creator" that customers are willing to pay for.',
                howItHelps: 'It forces you to move from "what I want to sell" to "what my customer truly needs." This alignment is the core of product-market fit and the key to creating an irresistible offer that stands out from the competition.',
                icon: Target,
                estimatedTime: '25-35 min',
                order: 2,
                route: 'StrategyFormValueProposition'
            },
            {
                id: 'competitive_analysis',
                title: 'Competitor Analysis',
                description: 'Analyze your competition to identify market gaps, positioning opportunities, and competitive advantages.',
                whyItMatters: "You don't operate in a vacuum. Understanding your competitors' strengths and weaknesses allows you to find your unique space in the market, avoid their mistakes, and innovate where they have failed to serve the customer.",
                howItHelps: "This analysis provides the strategic intelligence to position your brand effectively. You'll learn what's working in your industry and, more importantly, identify the gaps that your business can uniquely fill to attract customers.",
                icon: Users,
                estimatedTime: '30-45 min',
                order: 3,
                route: 'CompetitorAnalysis'
            },
            {
                id: 'swot_analysis',
                title: 'SWOT Analysis',
                description: 'Analyze your Strengths, Weaknesses, Opportunities, and Threats for strategic clarity.',
                whyItMatters: "Strategic success comes from amplifying your strengths, mitigating your weaknesses, seizing opportunities, and guarding against threats. A SWOT analysis provides a 360-degree view of your business landscape, both internally and externally.",
                howItHelps: "This framework translates raw data into an actionable strategy. It helps you build a business plan that is both ambitious and realistic, preparing you to capitalize on your advantages while having a plan for potential challenges.",
                icon: TrendingUp,
                estimatedTime: '15-20 min',
                order: 4,
                route: 'StrategyFormSWOTAnalysis'
            },
            {
                id: 'business_model_canvas',
                title: 'Business Model Canvas',
                description: 'Map out your entire business model on one page using the proven 9-block framework.',
                whyItMatters: 'A business is a system of interconnected parts. The Business Model Canvas helps you see how your value proposition, customer segments, channels, and revenue streams all work together to create a viable, profitable business.',
                howItHelps: 'It moves your business plan from a lengthy document to a dynamic, single-page visual map. This makes it easy to spot weaknesses, test assumptions, and communicate your business model clearly to partners, investors, and your team.',
                icon: Grid3x3,
                estimatedTime: '20-30 min',
                order: 5,
                route: 'StrategyFormBusinessModelCanvas'
            },
            {
                id: 'brand_kit',
                title: 'Brand Kit',
                description: 'Define and store your brand\'s core identity, including logos, colors, fonts, and mission.',
                whyItMatters: "A strong brand builds trust and recognition. In a crowded marketplace, a consistent and professional brand identity makes you memorable and signals quality, helping you attract and retain customers.",
                howItHelps: "Your Brand Kit becomes the single source of truth for your visual identity and messaging. It ensures that every touchpoint—from your website to your social media—is cohesive, professional, and instantly recognizable as yours.",
                icon: Palette,
                estimatedTime: '25-35 min',
                order: 6,
                route: 'StrategyFormBrandKit'
            },
            {
                id: 'value_ladder',
                title: 'Value Ladder',
                description: 'Design your customer journey from entry-level to premium offerings for maximum lifetime value.',
                whyItMatters: "Not all customers are ready for your most premium offer upfront. A Value Ladder allows you to meet customers where they are, build trust with low-risk entry points, and guide them towards higher-value solutions as their needs grow.",
                howItHelps: "This tool transforms your business from making one-off sales to building long-term customer relationships. It helps you design a product suite that maximizes customer lifetime value and creates predictable, scalable revenue.",
                icon: TrendingUp,
                estimatedTime: '20-30 min',
                order: 7,
                route: 'StrategyFormValueLadder'
            }
        ].map(tool => {
            const doc = getDocumentByType(tool.id);
            const isCompleted = tool.id === 'competitive_analysis'
                ? user?.competitor_analysis && Object.keys(user.competitor_analysis).length > 0
                : doc?.is_completed || false;
            return { ...tool, isCompleted, lastUpdated: doc?.last_updated };
        }).sort((a, b) => a.order - b.order);
    };

    if (loading) {
        return (
            <div className="px-4 pb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="card p-8 text-center">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--primary-gold)]" />
                        <p className="mt-3 text-[var(--text-soft)]">Loading your foundation hub...</p>
                    </div>
                </div>
            </div>
        );
    }

    const stageInfo = getStageInfo(user?.entrepreneurship_stage);
    const strategyTools = getStrategyTools();
    const completedCount = strategyTools.filter(tool => tool.isCompleted).length;

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="card p-6 md:p-8">
                    <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl mb-2">My Foundation Hub</h1>
                            <p className="text-[var(--text-soft)] text-base md:text-lg">
                                Build your strategic foundation with proven business frameworks—complete them in order for best results.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-[var(--primary-gold)]/10 to-[var(--primary-gold)]/20 border border-[var(--primary-gold)]/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${stageInfo.color.replace('text-', 'bg-')}`}></div>
                            <h3 className="font-bold text-[var(--text-main)]">{stageInfo.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-3">{stageInfo.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[var(--text-soft)]">
                            <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span>{completedCount}/{strategyTools.length} tools completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-md flex-shrink-0">
                            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">💡 Recommended Completion Order</h3>
                            <p className="text-[var(--text-soft)] mb-3">
                                These strategic tools are arranged in the optimal sequence for building your business foundation.
                                Each tool builds upon the insights from the previous ones, creating a comprehensive strategic framework.
                            </p>
                            <div className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Start with:</strong> Ideal Client → Value Proposition → Competitor Analysis → SWOT Analysis → ...
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {strategyTools.map((tool, index) => {
                        const IconComponent = tool.icon;
                        const hasAccess = hasAccessToTool(tool.id);
                        const existingDoc = tool.id === 'competitive_analysis' ? null : documents.find(doc => doc.document_type === tool.id);
                        const isNextRecommended = index === completedCount;

                        return (
                            <div key={tool.id} className={`card hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col ${isNextRecommended && hasAccess && !tool.isCompleted ? 'ring-2 ring-[var(--primary-gold)] ring-opacity-50' : ''}`}>
                                <div className="absolute top-3 left-3 bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-1 rounded-full z-20">{tool.order}</div>
                                {isNextRecommended && hasAccess && !tool.isCompleted && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">Next</div>
                                )}
                                {!hasAccess && (
                                    <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
                                        <div className="text-center text-white">
                                            <Lock className="w-8 h-8 mx-auto mb-2" />
                                            <p className="font-semibold">Upgrade to Unlock</p>
                                        </div>
                                    </div>
                                )}
                                <div className="p-6 pt-12 flex flex-col flex-grow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md"><IconComponent className="w-6 h-6 text-[var(--primary-gold)]" /></div>
                                        {tool.isCompleted && (
                                            <div className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /><span className="text-xs font-medium">Complete</span></div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{tool.title}</h3>
                                    <p className="text-[var(--text-soft)] text-sm mb-4 leading-relaxed">{tool.description}</p>
                                    <div className="mt-auto space-y-4">
                                        <details className="group/details">
                                            <summary className="text-sm font-medium text-[var(--primary-gold)] cursor-pointer list-none flex items-center hover:underline">
                                                <Eye className="w-4 h-4 mr-2" /> Why this matters
                                                <ChevronDown className="w-4 h-4 ml-auto group-open/details:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="mt-3 text-sm text-[var(--text-soft)] border-l-2 border-[var(--primary-gold)]/30 pl-3 space-y-2">
                                                <p><strong>Why it's needed:</strong> {tool.whyItMatters}</p>
                                                <p><strong>How it helps:</strong> {tool.howItHelps}</p>
                                            </div>
                                        </details>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]"><Clock className="w-3 h-3" /><span>{tool.estimatedTime}</span></div>
                                            {tool.lastUpdated && <p className="text-xs text-[var(--text-soft)]">Last updated: {new Date(tool.lastUpdated).toLocaleDateString()}</p>}
                                        </div>
                                        <div className="pt-2">
                                            {hasAccess ? (
                                                <div className="space-y-3">
                                                    <Link to={createPageUrl(tool.route)} className="btn btn-primary w-full text-center">
                                                        {tool.id === 'competitive_analysis' ? (user?.competitor_analysis ? 'Continue Working' : 'Start Building') : (existingDoc ? 'Continue Working' : 'Start Building')}
                                                    </Link>
                                                    {tool.id !== 'competitive_analysis' && existingDoc && canExport(tool.id) && (
                                                        <button onClick={() => handleExportToPDF(tool.id, existingDoc)} className="btn btn-secondary w-full text-center" disabled={isExporting}>
                                                            {isExporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} Export PDF
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-400"><Lock className="w-5 h-5 mx-auto mb-2" /><span className="text-sm">Requires Upgrade</span></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}