
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, Target, Map, TrendingUp, DollarSign, Lightbulb, Calendar, BarChart2, ChevronRight, Zap, HelpCircle, CheckCircle, Circle, ArrowRight, Sparkles } from 'lucide-react';
import Tooltip from '../common/Tooltip';
import { FoundationProgress, StrategyDocument } from '@/entities/all';

const CONNECTIONS = {
    vision: {
        title: 'Vision Stage: Laying Your Foundation',
        description: 'You\'re in the idea and planning phase. Focus on clarity before execution.',
        steps: [
            {
                step: 1,
                icon: Users,
                title: 'Define Your Ideal Client',
                description: 'Start here to understand WHO you serve',
                link: 'StrategyFormIdealClient',
                connects: 'Once you know your ideal client, use the Customer Journey tool to map their buying process.',
                foundationStepId: 'ideal_client',
                docType: 'ideal_client'
            },
            {
                step: 2,
                icon: Map,
                title: 'Map Customer Journey',
                description: 'Understand how they discover, consider, and buy from you',
                link: 'StrategyFormCustomerJourney',
                connects: 'With the journey mapped, create your Value Proposition to stand out at each stage.',
                foundationStepId: 'customer_journey',
                docType: 'customer_journey'
            },
            {
                step: 3,
                icon: Target,
                title: 'Craft Value Proposition',
                description: 'Define what makes you unique',
                link: 'StrategyFormValueProposition',
                connects: 'Now structure your offers with the Value Ladder to maximize customer lifetime value.',
                foundationStepId: 'value_proposition',
                docType: 'value_proposition_canvas'
            },
            {
                step: 4,
                icon: DollarSign,
                title: 'Set Financial Goal',
                description: 'Calculate your Freedom Number',
                link: 'FreedomCalculator',
                connects: 'With your goal set, use Daily 1% Tracker to build momentum toward launch.',
                foundationStepId: 'financial_projections',
                checkUserField: 'financial_projections'
            }
        ]
    },
    startup: {
        title: 'Startup Stage: Validating & Launching',
        description: 'You have a business idea or early offering. Focus on validation and first customers.',
        steps: [
            {
                step: 1,
                icon: Lightbulb,
                title: 'Complete SWOT Analysis',
                description: 'Analyze your competitive position',
                link: 'StrategyFormSWOTAnalysis',
                connects: 'Use insights to refine your One Page Business Plan and identify opportunities.',
                foundationStepId: 'swot_analysis',
                docType: 'swot_analysis'
            },
            {
                step: 2,
                icon: Target,
                title: 'Refine One Page Business Plan',
                description: 'Validate your revenue model',
                link: 'StrategyFormBusinessModelCanvas',
                connects: 'With a solid One Page Business Plan, leverage The HQ\'s CRM to manage your first customers.',
                foundationStepId: 'business_model_canvas',
                docType: 'business_model_canvas'
            },
            {
                step: 3,
                icon: Calendar,
                title: 'Schedule & Execute Daily',
                description: 'Use Daily Scheduler for focused action',
                link: 'Schedule',
                connects: 'Track your execution with Daily 1% Tracker to ensure consistent progress.'
            },
            {
                step: 4,
                icon: BarChart2,
                title: 'Track Daily Progress',
                description: 'Measure your 1% improvements',
                link: 'DailyTrack',
                connects: 'As you gain traction, revisit your Financial Goal to scale strategically.'
            }
        ]
    },
    growth: {
        title: 'Growth Stage: Scaling & Optimizing',
        description: 'You have customers and revenue. Focus on scaling operations and maximizing profitability.',
        steps: [
            {
                step: 1,
                icon: TrendingUp,
                title: 'Optimize Value Ladder',
                description: 'Add upsells and recurring revenue',
                link: 'StrategyFormValueLadder',
                connects: 'Use The HQ\'s Marketing Automation to nurture customers up your ladder.',
                foundationStepId: 'value_ladder',
                docType: 'value_ladder'
            },
            {
                step: 2,
                icon: Map,
                title: 'Refine Customer Journey',
                description: 'Eliminate friction and improve conversions',
                link: 'StrategyFormCustomerJourney',
                connects: 'Leverage The HQ\'s Funnel Builder to automate your optimized journey.',
                foundationStepId: 'customer_journey',
                docType: 'customer_journey'
            },
            {
                step: 3,
                icon: DollarSign,
                title: 'Scale Financial Goals',
                description: 'Set new revenue targets',
                link: 'FreedomCalculator',
                connects: 'Use The HQ\'s Analytics to track performance and make data-driven decisions.',
                foundationStepId: 'financial_projections',
                checkUserField: 'financial_projections'
            },
            {
                step: 4,
                icon: Users,
                title: 'Leverage Community',
                description: 'Network with other growth-stage entrepreneurs',
                link: 'TheCommunity',
                connects: 'Share wins, get feedback, and find collaboration opportunities to accelerate growth.'
            }
        ]
    }
};

export default function HowItAllConnects({ user }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextStep, setNextStep] = useState(null);

    useEffect(() => {
        if (user && user.entrepreneurship_stage) {
            loadCompletionStatus();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadCompletionStatus = async () => {
        if (!user || !user.entrepreneurship_stage) return;

        try {
            // Fetch foundation progress
            const foundationProgressRecords = await FoundationProgress.filter({ created_by: user.email });
            const foundationProgress = foundationProgressRecords.length > 0 ? foundationProgressRecords[0] : null;
            const completedFoundationSteps = foundationProgress?.completed_steps || [];

            // Fetch strategy documents
            const strategyDocs = await StrategyDocument.filter({ created_by: user.email });

            const connectionData = CONNECTIONS[user.entrepreneurship_stage];
            if (!connectionData) {
                setLoading(false);
                return;
            }

            const completed = [];
            let firstIncomplete = null;

            for (const step of connectionData.steps) {
                let isCompleted = false;

                // Check if it's a foundation step
                if (step.foundationStepId) {
                    isCompleted = completedFoundationSteps.includes(step.foundationStepId);
                }

                // Check if it's based on a document type
                if (!isCompleted && step.docType) {
                    const doc = strategyDocs.find(d => d.document_type === step.docType && d.is_completed);
                    if (doc) isCompleted = true;
                }

                // Check if it's based on a user field
                if (!isCompleted && step.checkUserField) {
                    if (user[step.checkUserField]) isCompleted = true;
                }

                if (isCompleted) {
                    completed.push(step.step);
                } else if (!firstIncomplete) {
                    firstIncomplete = step.step;
                }
            }

            setCompletedSteps(completed);
            setNextStep(firstIncomplete);
        } catch (error) {
            console.error('Error loading completion status:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || !user.entrepreneurship_stage) {
        return null;
    }

    const stage = user.entrepreneurship_stage;
    const connectionData = CONNECTIONS[stage];

    if (!connectionData) {
        return null;
    }

    if (loading) {
        return (
            <div className="card p-6" style={{ borderRadius: '2px' }}>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    const completionPercentage = Math.round((completedSteps.length / connectionData.steps.length) * 100);

    return (
        <div className="card p-6" style={{ borderRadius: '2px' }}>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-[var(--primary-gold)]" />
                    <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center">
                        How It All Connects
                        <Tooltip content="This section adapts to your entrepreneurship stage and shows you exactly how to use different features together for maximum impact. It's your personalized success blueprint.">
                            <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
                        </Tooltip>
                    </h3>
                </div>
                <p className="text-[var(--text-soft)]">{connectionData.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--text-soft)]">Connection Flow Progress</span>
                    <span className="text-sm font-bold text-[var(--primary-gold)]">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    ></div>
                </div>
                <p className="text-xs text-[var(--text-soft)] mt-1">
                    {completedSteps.length} of {connectionData.steps.length} steps completed
                </p>
            </div>

            {/* Next Step Highlight */}
            {nextStep && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-[var(--primary-gold)]">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-[var(--primary-gold)]" />
                        <span className="text-sm font-semibold text-[var(--text-main)]">Recommended Next Step:</span>
                    </div>
                    <p className="text-sm text-[var(--text-soft)]">
                        Complete <strong>Step {nextStep}</strong> to continue building your strategic foundation.
                    </p>
                </div>
            )}

            {/* Stage-Specific Workflow */}
            <div className="space-y-4">
                {connectionData.steps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === connectionData.steps.length - 1;
                    const isCompleted = completedSteps.includes(step.step);
                    const isNextStep = step.step === nextStep;

                    return (
                        <div key={index}>
                            <div 
                                className={`block p-4 rounded-lg border-2 transition-all ${
                                    isCompleted
                                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                                        : isNextStep
                                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-[var(--primary-gold)] ring-2 ring-[var(--primary-gold)] ring-offset-2'
                                        : 'bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700'
                                } hover:shadow-lg`}
                            >
                                <div className="flex items-start space-x-4">
                                    {/* Step Number */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                        isCompleted
                                            ? 'bg-green-500 text-white'
                                            : isNextStep
                                            ? 'bg-[var(--primary-gold)] text-white'
                                            : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                    }`}>
                                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.step}
                                    </div>

                                    {/* Icon */}
                                    <div className={`flex-shrink-0 p-2 rounded-lg ${
                                        isCompleted
                                            ? 'bg-green-500'
                                            : isNextStep
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                            : 'bg-gradient-to-r from-blue-500 to-blue-600'
                                    }`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold text-[var(--text-main)]">{step.title}</h4>
                                            {isCompleted && (
                                                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full font-medium">
                                                    Completed
                                                </span>
                                            )}
                                            {isNextStep && (
                                                <span className="text-xs px-2 py-0.5 bg-[var(--primary-gold)] text-white rounded-full font-medium">
                                                    Next
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[var(--text-soft)] mb-2">{step.description}</p>
                                        
                                        {/* Connection Explanation */}
                                        <div className="flex items-start space-x-2 text-xs text-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded mb-3">
                                            <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            <span>{step.connects}</span>
                                        </div>

                                        {/* Action Button */}
                                        <Link 
                                            to={createPageUrl(step.link)}
                                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                                isCompleted
                                                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                                                    : isNextStep
                                                    ? 'bg-[var(--primary-gold)] text-white hover:bg-yellow-600'
                                                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                                            }`}
                                        >
                                            {isCompleted ? (
                                                <>
                                                    Review Tool
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Go To Tool
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {!isLast && (
                                <div className="flex justify-center my-2">
                                    <div className={`w-0.5 h-6 ${
                                        completedSteps.includes(step.step) && completedSteps.includes(step.step + 1)
                                            ? 'bg-gradient-to-b from-green-500 to-green-500'
                                            : completedSteps.includes(step.step)
                                            ? 'bg-gradient-to-b from-green-500 to-gray-300'
                                            : 'bg-gradient-to-b from-gray-300 to-transparent'
                                    }`}></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Additional Context */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm text-[var(--text-main)]">
                    <strong>💡 The Big Picture:</strong> Each tool in The HQ is designed to work together. Your Foundation Roadmap provides strategic clarity, your 90-Day Journey creates execution momentum, and The HQ\'s features (CRM, Marketing Automation, Funnel Builder, etc.) handle the operational heavy lifting - so you can focus on growing your business.
                </p>
            </div>

            {/* Completion Celebration */}
            {completionPercentage === 100 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-500">
                    <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <p className="font-bold text-green-700 dark:text-green-300">🎉 Congratulations!</p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            You\'ve completed all the strategic connections for your stage. You\'re set up for success!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
