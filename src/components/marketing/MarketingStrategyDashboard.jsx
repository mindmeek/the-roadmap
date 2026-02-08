import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    TrendingUp, CheckCircle, Clock, Target, Users, Zap, Share2, Mail, DollarSign,
    Calendar, BarChart, Award, ArrowRight, AlertCircle, Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function MarketingStrategyDashboard({ 
    user, 
    strategyDocs, 
    financialGoals, 
    socialMediaPlan, 
    annualPlan,
    business 
}) {
    const [overallProgress, setOverallProgress] = useState(0);
    const [channelProgress, setChannelProgress] = useState({});
    const [nextSteps, setNextSteps] = useState([]);

    useEffect(() => {
        calculateProgress();
        generateNextSteps();
    }, [strategyDocs, financialGoals, socialMediaPlan, annualPlan]);

    const calculateProgress = () => {
        const milestones = [
            { name: 'Ideal Client Defined', complete: !!strategyDocs.ideal_client?.is_completed },
            { name: 'Value Proposition Set', complete: !!strategyDocs.value_proposition_canvas?.is_completed },
            { name: 'Brand Voice Defined', complete: !!strategyDocs.brand_kit?.is_completed },
            { name: 'Financial Goals Set', complete: !!financialGoals?.freedomNumber },
            { name: 'Social Media Plan Active', complete: !!socialMediaPlan },
            { name: 'Annual Strategy Created', complete: !!annualPlan }
        ];

        const completedCount = milestones.filter(m => m.complete).length;
        const progress = Math.round((completedCount / milestones.length) * 100);
        setOverallProgress(progress);

        // Channel-specific progress
        setChannelProgress({
            social_media: socialMediaPlan ? 100 : 0,
            email: strategyDocs.email_marketing?.is_completed ? 100 : 0,
            content: strategyDocs.content_strategy?.is_completed ? 100 : 0,
            paid_ads: 0 // Placeholder for future
        });
    };

    const generateNextSteps = () => {
        const steps = [];

        if (!strategyDocs.ideal_client?.is_completed) {
            steps.push({
                title: 'Define Your Ideal Client',
                description: 'Complete your ideal client profile to target the right audience',
                link: 'StrategyFormIdealClient',
                priority: 'high',
                icon: Users
            });
        }

        if (!strategyDocs.value_proposition_canvas?.is_completed) {
            steps.push({
                title: 'Create Value Proposition',
                description: 'Clarify what makes your business unique',
                link: 'StrategyFormValueProposition',
                priority: 'high',
                icon: Zap
            });
        }

        if (!financialGoals?.freedomNumber) {
            steps.push({
                title: 'Set Financial Goals',
                description: 'Calculate your freedom number and revenue targets',
                link: 'FreedomCalculator',
                priority: 'high',
                icon: DollarSign
            });
        }

        if (!socialMediaPlan) {
            steps.push({
                title: 'Generate Social Media Plan',
                description: 'Create your 90-day social media action plan',
                link: 'SocialMediaPlanner',
                priority: 'medium',
                icon: Share2
            });
        }

        if (!annualPlan) {
            steps.push({
                title: 'Create Annual Strategy',
                description: 'Plan your year with quarterly objectives',
                link: 'AnnualPlanning',
                priority: 'medium',
                icon: Calendar
            });
        }

        setNextSteps(steps.slice(0, 3)); // Show top 3 priorities
    };

    const channels = [
        { 
            name: 'Social Media', 
            key: 'social_media', 
            icon: Share2, 
            color: 'from-pink-500 to-rose-600',
            link: 'SocialMediaPlanner',
            hqFeatures: ['Multi-platform posting', 'Custom per platform', '9+ social channels']
        },
        { 
            name: 'Email Marketing', 
            key: 'email', 
            icon: Mail, 
            color: 'from-blue-500 to-indigo-600',
            link: 'MyFoundationRoadmap',
            hqFeatures: ['Email campaigns', 'AI copywriting', 'Automation']
        },
        { 
            name: 'Content Strategy', 
            key: 'content', 
            icon: Target, 
            color: 'from-purple-500 to-violet-600',
            link: 'MyFoundationRoadmap',
            hqFeatures: ['Blog platform', 'Landing pages', 'AI page builder']
        },
        { 
            name: 'Paid Advertising', 
            key: 'paid_ads', 
            icon: BarChart, 
            color: 'from-green-500 to-emerald-600',
            link: 'AdvertisingServices',
            hqFeatures: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads']
        }
    ];

    return (
        <div className="space-y-6">
            {/* Overall Progress Header */}
            <div className="card p-6 bg-gradient-to-br from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 border-2 border-[var(--primary-gold)]/30">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Target className="w-6 h-6 text-[var(--primary-gold)]" />
                            Marketing Strategy Dashboard
                        </h2>
                        <p className="text-sm text-[var(--text-soft)] mt-1">
                            Your complete marketing strategy at a glance
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-[var(--primary-gold)]">{overallProgress}%</div>
                        <div className="text-xs text-[var(--text-soft)]">Overall Progress</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div
                        className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${overallProgress}%` }}
                    ></div>
                </div>

                {/* Key Milestones */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${strategyDocs.ideal_client?.is_completed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {strategyDocs.ideal_client?.is_completed ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Ideal Client</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {strategyDocs.ideal_client?.is_completed ? 'Defined ✓' : 'Not set'}
                        </p>
                    </div>

                    <div className={`p-3 rounded-lg ${strategyDocs.value_proposition_canvas?.is_completed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {strategyDocs.value_proposition_canvas?.is_completed ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Value Proposition</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {strategyDocs.value_proposition_canvas?.is_completed ? 'Defined ✓' : 'Not set'}
                        </p>
                    </div>

                    <div className={`p-3 rounded-lg ${financialGoals?.freedomNumber ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {financialGoals?.freedomNumber ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Financial Goals</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {financialGoals?.freedomNumber ? `$${Math.round(financialGoals.freedomNumber).toLocaleString()}/mo` : 'Not set'}
                        </p>
                    </div>

                    <div className={`p-3 rounded-lg ${socialMediaPlan ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {socialMediaPlan ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Social Media Plan</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {socialMediaPlan ? 'Active ✓' : 'Not created'}
                        </p>
                    </div>

                    <div className={`p-3 rounded-lg ${annualPlan ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {annualPlan ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Annual Strategy</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {annualPlan ? `${annualPlan.year} Plan ✓` : 'Not created'}
                        </p>
                    </div>

                    <div className={`p-3 rounded-lg ${strategyDocs.brand_kit?.is_completed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            {strategyDocs.brand_kit?.is_completed ? 
                                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                <Clock className="w-4 h-4 text-gray-400" />
                            }
                            <span className="text-xs font-semibold text-[var(--text-main)]">Brand Voice</span>
                        </div>
                        <p className="text-xs text-[var(--text-soft)]">
                            {strategyDocs.brand_kit?.is_completed ? 'Defined ✓' : 'Not set'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Marketing Channels Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {channels.map((channel) => {
                    const Icon = channel.icon;
                    const progress = channelProgress[channel.key] || 0;
                    
                    return (
                        <div key={channel.key}>
                            <div className="card p-4 hover:shadow-lg transition-all h-full">
                                <div className={`bg-gradient-to-br ${channel.color} p-3 rounded-lg inline-block mb-3`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h4 className="font-bold text-[var(--text-main)] mb-2">{channel.name}</h4>
                                
                                {/* Progress Bar */}
                                <div className="mb-3">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`bg-gradient-to-r ${channel.color} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">Strategy: {progress}% Complete</p>
                                </div>

                                {/* HQ Features */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded mb-3">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Execute in The HQ:</p>
                                    {channel.hqFeatures.map((feature, idx) => (
                                        <p key={idx} className="text-xs text-[var(--text-soft)]">• {feature}</p>
                                    ))}
                                </div>

                                <Link to={createPageUrl(channel.link)}>
                                    <Button variant="outline" size="sm" className="w-full text-xs">
                                        {progress === 100 ? 'View Strategy' : 'Plan Strategy'} 
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Next Steps & Action Items */}
            {nextSteps.length > 0 && (
                <div className="card p-6 bg-white dark:bg-gray-900 border-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <h3 className="text-xl font-bold text-[var(--text-main)]">
                            Your Next Steps
                        </h3>
                    </div>
                    <p className="text-sm text-[var(--text-soft)] mb-4">
                        Complete these foundational steps to unlock the full power of your marketing strategy:
                    </p>
                    <div className="space-y-3">
                        {nextSteps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div 
                                    key={idx}
                                    className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                                        step.priority === 'high' 
                                            ? 'bg-red-50 dark:bg-red-900/20 border-red-500' 
                                            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${step.priority === 'high' ? 'bg-red-100 dark:bg-red-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
                                        <Icon className={`w-4 h-4 ${step.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold text-[var(--text-main)] text-sm">{step.title}</h4>
                                            {step.priority === 'high' && (
                                                <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">High Priority</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-[var(--text-soft)] mb-2">{step.description}</p>
                                        <Link to={createPageUrl(step.link)}>
                                            <Button variant="outline" size="sm" className="text-xs">
                                                Complete Now <ArrowRight className="w-3 h-3 ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Success State - All Complete */}
            {overallProgress === 100 && nextSteps.length === 0 && (
                <div className="card p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 text-center">
                    <Award className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                        🎉 Your Marketing Strategy is Complete!
                    </h3>
                    <p className="text-[var(--text-soft)] mb-6">
                        You've built a comprehensive marketing foundation. Now execute it all seamlessly in The Business Minds HQ—
                        your all-in-one platform for social media, email, ads, landing pages, and more.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a 
                            href="https://app.thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Execute in The HQ
                        </a>
                        <Link to={createPageUrl('SocialMediaPlanner')}>
                            <Button variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                View Social Plan
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* The HQ Execution Platform CTA */}
            <div className="card p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex-shrink-0">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Execute Your Strategy in The Business Minds HQ</h3>
                        <p className="text-white/90 mb-4 text-sm">
                            Once your strategy is planned here, execute it all in The HQ—your complete marketing command center.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-4">
                            <div className="bg-white/10 px-2 py-1 rounded">📱 9+ Social Platforms</div>
                            <div className="bg-white/10 px-2 py-1 rounded">✉️ Email Marketing</div>
                            <div className="bg-white/10 px-2 py-1 rounded">🎯 Google/FB/LinkedIn Ads</div>
                            <div className="bg-white/10 px-2 py-1 rounded">📄 Unlimited Landing Pages</div>
                            <div className="bg-white/10 px-2 py-1 rounded">📝 Blog Platform</div>
                            <div className="bg-white/10 px-2 py-1 rounded">🤖 AI Web Chat</div>
                            <div className="bg-white/10 px-2 py-1 rounded">📞 Voice AI Phone</div>
                            <div className="bg-white/10 px-2 py-1 rounded">⚙️ Marketing Automation</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a 
                            href="https://app.thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
                        >
                            Launch The HQ
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                        {user?.subscription_level === 'free' && (
                            <Link to={createPageUrl('Upgrade')}>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">
                                    Upgrade to Access
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}