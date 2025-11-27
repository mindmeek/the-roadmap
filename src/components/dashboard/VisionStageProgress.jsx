import React, { useState, useEffect } from 'react';
import { StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Circle, ChevronRight, Target, Sparkles, Crown, Rocket, TrendingUp } from 'lucide-react';

const STAGE_STEPS_CONFIG = {
    vision: {
        title: 'Vision Stage',
        description: 'Build your strategic foundation',
        icon: Target,
        color: 'blue',
        steps: [
            { id: 'ideal_client', title: 'Define Your Ideal Client', documentType: 'ideal_client', link: 'StrategyFormIdealClient', icon: '👤' },
            { id: 'value_proposition', title: 'Craft Your Value Proposition', documentType: 'value_proposition_canvas', link: 'StrategyFormValueProposition', icon: '💎' },
            { id: 'business_model', title: 'Map Your Business Model', documentType: 'business_model_canvas', link: 'StrategyFormBusinessModelCanvas', icon: '📊' },
            { id: 'customer_journey', title: 'Create Customer Journey', documentType: 'customer_journey', link: 'StrategyFormCustomerJourney', icon: '🗺️' },
            { id: 'swot', title: 'Complete SWOT Analysis', documentType: 'swot_analysis', link: 'StrategyFormSWOTAnalysis', icon: '⚡' }
        ]
    },
    startup: {
        title: 'Startup Stage',
        description: 'Launch and validate your business',
        icon: Rocket,
        color: 'green',
        steps: [
            { id: 'value_ladder', title: 'Build Your Value Ladder', documentType: 'value_ladder', link: 'StrategyFormValueLadder', icon: '🪜' },
            { id: 'brand_identity', title: 'Create Brand Identity', documentType: 'brand_identity', link: 'StrategyFormBrandIdentity', icon: '🎨' },
            { id: 'content_strategy', title: 'Plan Content Strategy', documentType: 'content_strategy', link: 'StrategyFormContentStrategy', icon: '📝' },
            { id: 'social_media', title: 'Social Media Strategy', documentType: 'social_media', link: 'StrategyFormSocialMedia', icon: '📱' },
            { id: 'email_marketing', title: 'Email Marketing Setup', documentType: 'email_marketing', link: 'StrategyFormEmailMarketing', icon: '📧' }
        ]
    },
    growth: {
        title: 'Growth Stage',
        description: 'Scale and optimize your business',
        icon: TrendingUp,
        color: 'purple',
        steps: [
            { id: 'pricing_strategies', title: 'Optimize Pricing', documentType: 'pricing_strategies', link: 'StrategyFormPricingStrategies', icon: '💰' },
            { id: 'automation', title: 'Build Automation Systems', documentType: 'automation', link: 'StrategyFormAutomation', icon: '⚙️' },
            { id: 'strategic_partnerships', title: 'Strategic Partnerships', documentType: 'strategic_partnerships', link: 'StrategyFormStrategicPartnerships', icon: '🤝' },
            { id: 'community_building', title: 'Community Building', documentType: 'community_building', link: 'StrategyFormCommunityBuilding', icon: '👥' },
            { id: 'affiliate_program', title: 'Affiliate Program', documentType: 'affiliate_program', link: 'StrategyFormAffiliateProgram', icon: '🔗' }
        ]
    }
};

export default function FoundationProgress({ user }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    const stageConfig = STAGE_STEPS_CONFIG[user?.entrepreneurship_stage] || STAGE_STEPS_CONFIG.vision;
    const currentSteps = stageConfig.steps;

    useEffect(() => {
        loadProgress();
    }, [user]);

    const loadProgress = async () => {
        if (!user) return;
        
        try {
            const docs = await StrategyDocument.filter({ created_by: user.email });
            const completed = [];
            
            currentSteps.forEach(step => {
                const doc = docs.find(d => d.document_type === step.documentType);
                if (doc && doc.is_completed) {
                    completed.push(step.id);
                }
            });
            
            setCompletedSteps(completed);
        } catch (error) {
            console.error('Error loading foundation progress:', error);
        } finally {
            setLoading(false);
        }
    };

    // Show for all users
    if (!user) {
        return null;
    }
    
    const isFreeUser = user.subscription_level === 'free';

    const progressPercentage = currentSteps.length > 0 ? Math.round((completedSteps.length / currentSteps.length) * 100) : 0;
    const nextStep = currentSteps.find(step => !completedSteps.includes(step.id));
    
    const colorClasses = {
        blue: {
            bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
            border: 'border-blue-300 dark:border-blue-700',
            iconBg: 'bg-blue-100 dark:bg-blue-800',
            iconText: 'text-blue-600 dark:text-blue-400',
            progressBar: 'from-blue-500 to-indigo-600'
        },
        green: {
            bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
            border: 'border-green-300 dark:border-green-700',
            iconBg: 'bg-green-100 dark:bg-green-800',
            iconText: 'text-green-600 dark:text-green-400',
            progressBar: 'from-green-500 to-emerald-600'
        },
        purple: {
            bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
            border: 'border-purple-300 dark:border-purple-700',
            iconBg: 'bg-purple-100 dark:bg-purple-800',
            iconText: 'text-purple-600 dark:text-purple-400',
            progressBar: 'from-purple-500 to-pink-600'
        }
    };
    
    const colors = colorClasses[stageConfig.color] || colorClasses.blue;
    const StageIcon = stageConfig.icon;

    if (loading) {
        return null;
    }

    return (
        <div className={`card p-4 sm:p-6 bg-gradient-to-br ${colors.bg} border-2 ${colors.border}`} style={{ borderRadius: '2px' }}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className={`${colors.iconBg} p-3 rounded-lg flex-shrink-0 mx-auto sm:mx-0`}>
                    <StageIcon className={`w-6 h-6 ${colors.iconText}`} />
                </div>
                
                <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                            <span>🎯 {stageConfig.title} Progress</span>
                        </h3>
                        <span className={`text-sm font-bold ${colors.iconText}`}>
                            {completedSteps.length}/{currentSteps.length} Complete
                        </span>
                    </div>
                    
                    <p className="text-sm text-[var(--text-soft)] mb-3">
                        {stageConfig.description} — complete these strategy tools to move forward.
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3" style={{ borderRadius: '2px' }}>
                            <div 
                                className={`bg-gradient-to-r ${colors.progressBar} h-3 transition-all duration-500`}
                                style={{ width: `${progressPercentage}%`, borderRadius: '2px' }}
                            ></div>
                        </div>
                        <p className="text-xs text-[var(--text-soft)] mt-1">
                            {progressPercentage}% of {stageConfig.title.toLowerCase()} foundation complete
                        </p>
                    </div>

                    {/* Step List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
                        {currentSteps.map((step) => {
                            const isCompleted = completedSteps.includes(step.id);
                            return (
                                <Link
                                    key={step.id}
                                    to={createPageUrl(step.link)}
                                    className={`p-2 rounded-lg border transition-all text-left ${
                                        isCompleted 
                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' 
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{step.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-medium truncate ${isCompleted ? 'text-green-700 dark:text-green-400' : 'text-[var(--text-main)]'}`}>
                                                {step.title}
                                            </p>
                                        </div>
                                        {isCompleted ? (
                                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Next Step CTA */}
                    {nextStep && (
                        <div className={`flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border ${colors.border}`}>
                            <div className="flex items-center gap-2 flex-1">
                                <Sparkles className={`w-4 h-4 ${colors.iconText}`} />
                                <span className="text-sm text-[var(--text-main)]">
                                    <strong>Next step:</strong> {nextStep.title}
                                </span>
                            </div>
                            <Link
                                to={createPageUrl(nextStep.link)}
                                className="btn btn-primary text-xs sm:text-sm w-full sm:w-auto justify-center"
                            >
                                Start Now <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    )}

                    {/* Progress Incentive */}
                    {progressPercentage >= 60 && (
                        <div className={`mt-4 p-3 rounded-lg ${isFreeUser ? 'bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-500/10 border border-[var(--primary-gold)]' : 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-300 dark:border-purple-700'}`}>
                            <div className="flex items-center gap-2 mb-2">
                                {isFreeUser ? (
                                    <Crown className="w-4 h-4 text-[var(--primary-gold)]" />
                                ) : (
                                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                )}
                                <span className="text-sm font-bold text-[var(--text-main)]">You're making great progress!</span>
                            </div>
                            {isFreeUser ? (
                                <>
                                    <p className="text-xs text-[var(--text-soft)] mb-2">
                                        Complete your Customer Journey to unlock <strong className="text-[var(--primary-gold)]">$49.99/month for 3 months</strong> on The HQ.
                                    </p>
                                    <Link
                                        to={createPageUrl('Upgrade')}
                                        className="text-xs text-[var(--primary-gold)] font-medium hover:underline flex items-center"
                                    >
                                        View HQ Benefits <ChevronRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <p className="text-xs text-[var(--text-soft)] mb-2">
                                        Share your progress and connect with fellow entrepreneurs in the community!
                                    </p>
                                    <Link
                                        to={createPageUrl('TheCommunity')}
                                        className="text-xs text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center"
                                    >
                                        Share in Community <ChevronRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}