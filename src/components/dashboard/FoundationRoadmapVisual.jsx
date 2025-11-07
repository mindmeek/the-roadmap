
import React, { useState, useEffect, useCallback } from 'react';
import { StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Circle, Clock, ChevronRight, Target, Users, Briefcase, TrendingUp, Lightbulb, DollarSign, Map, HelpCircle, Award } from 'lucide-react'; // Added Award
import Tooltip from '../common/Tooltip';

const FOUNDATION_STEPS = [
    { 
        id: 'ideal_client', 
        title: 'Define Ideal Client', 
        icon: Users, 
        color: 'from-blue-500 to-blue-600',
        link: 'StrategyFormIdealClient',
        description: 'Understand who you serve'
    },
    { 
        id: 'business_model_canvas', 
        title: 'One Page Business Plan', 
        icon: Briefcase, 
        color: 'from-purple-500 to-purple-600',
        link: 'StrategyFormBusinessModelCanvas',
        description: 'Map your business model'
    },
    { 
        id: 'value_proposition_canvas', 
        title: 'Unique Value Proposition Canvas', 
        icon: Target, 
        color: 'from-green-500 to-green-600',
        link: 'StrategyFormValueProposition',
        description: 'Define your unique value'
    },
    { 
        id: 'customer_journey', 
        title: 'Customer Journey Map', 
        icon: Map, 
        color: 'from-orange-500 to-orange-600',
        link: 'StrategyFormCustomerJourney',
        description: 'Understand customer touchpoints'
    },
    { 
        id: 'value_ladder', 
        title: 'Value Ladder', 
        icon: TrendingUp, 
        color: 'from-red-500 to-red-600',
        link: 'StrategyFormValueLadder',
        description: 'Structure your offerings'
    },
    { 
        id: 'swot_analysis', 
        title: 'SWOT Analysis', 
        icon: Lightbulb, 
        color: 'from-yellow-500 to-yellow-600',
        link: 'StrategyFormSWOTAnalysis',
        description: 'Analyze your position'
    },
    { 
        id: 'financial_projections', 
        title: 'Financial Goal', 
        icon: DollarSign, 
        color: 'from-indigo-500 to-indigo-600',
        link: 'FreedomCalculator',
        description: 'Set your freedom number'
    }
];

export default function FoundationRoadmapVisual({ user }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProgress = useCallback(async () => {
        if (!user) return;
        
        try {
            const allDocs = await StrategyDocument.filter({ created_by: user.email });
            const completed = [];

            // Check each document type
            if (allDocs.find(doc => doc.document_type === 'ideal_client')) completed.push('ideal_client');
            if (allDocs.find(doc => doc.document_type === 'business_model_canvas')) completed.push('business_model_canvas');
            if (allDocs.find(doc => doc.document_type === 'value_proposition_canvas')) completed.push('value_proposition_canvas');
            if (allDocs.find(doc => doc.document_type === 'customer_journey')) completed.push('customer_journey');
            if (allDocs.find(doc => doc.document_type === 'value_ladder')) completed.push('value_ladder');
            if (allDocs.find(doc => doc.document_type === 'swot_analysis')) completed.push('swot_analysis');
            
            // Check if financial goal is set
            if (user.competitor_analysis || user.financial_projections) {
                completed.push('financial_projections');
            }

            setCompletedSteps(completed);
        } catch (error) {
            console.error('Error loading foundation progress:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    const getStepStatus = (stepId) => {
        if (completedSteps.includes(stepId)) return 'completed';
        const stepIndex = FOUNDATION_STEPS.findIndex(s => s.id === stepId);
        const prevStep = FOUNDATION_STEPS[stepIndex - 1];
        if (!prevStep || completedSteps.includes(prevStep.id)) return 'available';
        return 'locked';
    };

    const completionPercentage = Math.round((completedSteps.length / FOUNDATION_STEPS.length) * 100);

    if (loading) {
        return (
            <div className="card p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-6" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center">
                        My Foundation Roadmap
                        <Tooltip content="Your Foundation Roadmap contains the essential strategic documents every successful business needs: from understanding your ideal client to mapping your value proposition and financial goals.">
                            <HelpCircle className="w-4 h-4 ml-2 text-[var(--text-soft)]" />
                        </Tooltip>
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mt-1">Build your business foundation step-by-step</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--primary-gold)]">{completionPercentage}%</div>
                    <p className="text-xs text-[var(--text-soft)]">{completedSteps.length} of {FOUNDATION_STEPS.length} complete</p>
                </div>
            </div>

            {/* Celebration for Progress */}
            {completionPercentage > 0 && completionPercentage < 100 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
                    <div className="flex items-start gap-3">
                        <div className="text-3xl">🎉</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-green-800 dark:text-green-200 mb-1">
                                Great Progress! You're {completionPercentage}% Done!
                            </h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                You've completed <strong>{completedSteps.length}</strong> essential strategy documents. Keep going! These foundations will guide every decision in your 90-Day Journey.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
                <div 
                    className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>

            {/* Visual Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {FOUNDATION_STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const status = getStepStatus(step.id);
                    const isCompleted = status === 'completed';
                    const isAvailable = status === 'available';
                    const isLocked = status === 'locked';

                    return (
                        <Tooltip 
                            key={step.id}
                            content={`${step.title}: ${step.description}. ${isLocked ? 'Complete previous steps to unlock.' : isCompleted ? 'Click to review and refine.' : 'Click to start and build this foundation piece.'}`}
                        >
                            <Link
                                to={createPageUrl(step.link)}
                                className={`relative p-4 border-2 transition-all flex flex-col h-full ${ 
                                    isCompleted 
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 hover:shadow-lg' 
                                        : isAvailable
                                        ? 'border-[var(--primary-gold)] bg-white dark:bg-gray-800 hover:shadow-lg hover:border-[var(--primary-gold)]'
                                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed'
                                }`}
                                style={{ borderRadius: '2px', minHeight: '180px' }}
                                onClick={(e) => isLocked && e.preventDefault()}
                            >
                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-[var(--primary-gold)] flex items-center justify-center text-sm font-bold text-[var(--primary-gold)]">
                                    {index + 1}
                                </div>

                                {/* Status Icon */}
                                <div className="absolute -top-3 -right-3">
                                    {isCompleted ? (
                                        <CheckCircle className="w-6 h-6 text-green-500 fill-green-100 dark:fill-green-900" />
                                    ) : isAvailable ? (
                                        <Circle className="w-6 h-6 text-[var(--primary-gold)]" />
                                    ) : (
                                        <Clock className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>

                                {/* Icon */}
                                <div className={`mb-3 p-3 rounded-lg bg-gradient-to-r ${step.color} inline-block self-start`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <h4 className={`font-semibold text-sm mb-2 ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-[var(--text-main)]'}`}>
                                        {step.title}
                                    </h4>
                                    <p className={`text-xs flex-1 ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-[var(--text-soft)]'}`}>
                                        {step.description}
                                    </p>

                                    {/* Action Indicator */}
                                    {isAvailable && !isCompleted && (
                                        <div className="mt-3 flex items-center text-xs text-[var(--primary-gold)] font-medium">
                                            Start Now <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                                            Review & Refine <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </Tooltip>
                    );
                })}
            </div>

            {/* Call to Action */}
            {completionPercentage < 100 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-[var(--text-main)] font-medium flex items-start gap-2">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>
                            <strong>Implementation Tip:</strong> Complete each Foundation step before moving to your 90-Day Journey action steps. Your Foundation guides your Journey—the clearer your foundation, the faster you'll execute. Need help? Ask your <Link to={createPageUrl('ElyzetAIAssistants')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">AI Team</Link> for guidance!
                        </span>
                    </p>
                </div>
            )}

            {completionPercentage === 100 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
                    <p className="text-sm text-[var(--text-main)] font-medium flex items-start gap-2">
                        <Award className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>
                            🎉 <strong>Congratulations!</strong> You've completed your business foundation! You now have the strategic clarity to scale with confidence. Use your Foundation as a reference throughout your 90-Day Journey and beyond!
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
