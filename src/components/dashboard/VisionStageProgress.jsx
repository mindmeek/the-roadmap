import React, { useState, useEffect } from 'react';
import { StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Circle, ChevronRight, Target, Sparkles, Crown } from 'lucide-react';

const VISION_STAGE_STEPS = [
    {
        id: 'ideal_client',
        title: 'Define Your Ideal Client',
        description: 'Know exactly who you serve',
        documentType: 'ideal_client',
        link: 'StrategyFormIdealClient',
        icon: '👤'
    },
    {
        id: 'value_proposition',
        title: 'Craft Your Value Proposition',
        description: 'What makes you unique',
        documentType: 'value_proposition_canvas',
        link: 'StrategyFormValueProposition',
        icon: '💎'
    },
    {
        id: 'business_model',
        title: 'Map Your Business Model',
        description: 'How your business works',
        documentType: 'business_model_canvas',
        link: 'StrategyFormBusinessModelCanvas',
        icon: '📊'
    },
    {
        id: 'customer_journey',
        title: 'Create Customer Journey',
        description: 'The path to purchase',
        documentType: 'customer_journey',
        link: 'StrategyFormCustomerJourney',
        icon: '🗺️'
    },
    {
        id: 'swot',
        title: 'Complete SWOT Analysis',
        description: 'Strengths & opportunities',
        documentType: 'swot_analysis',
        link: 'StrategyFormSWOTAnalysis',
        icon: '⚡'
    }
];

export default function VisionStageProgress({ user }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProgress();
    }, [user]);

    const loadProgress = async () => {
        if (!user) return;
        
        try {
            const docs = await StrategyDocument.filter({ created_by: user.email });
            const completed = [];
            
            VISION_STAGE_STEPS.forEach(step => {
                const doc = docs.find(d => d.document_type === step.documentType);
                if (doc && doc.is_completed) {
                    completed.push(step.id);
                }
            });
            
            setCompletedSteps(completed);
        } catch (error) {
            console.error('Error loading vision progress:', error);
        } finally {
            setLoading(false);
        }
    };

    // Only show for vision stage free users
    if (!user || user.entrepreneurship_stage !== 'vision' || user.subscription_level !== 'free') {
        return null;
    }

    const progressPercentage = Math.round((completedSteps.length / VISION_STAGE_STEPS.length) * 100);
    const nextStep = VISION_STAGE_STEPS.find(step => !completedSteps.includes(step.id));

    if (loading) {
        return null;
    }

    return (
        <div className="card p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700" style={{ borderRadius: '2px' }}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg flex-shrink-0 mx-auto sm:mx-0">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                            <span>🎯 Vision Stage Progress</span>
                        </h3>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {completedSteps.length}/{VISION_STAGE_STEPS.length} Complete
                        </span>
                    </div>
                    
                    <p className="text-sm text-[var(--text-soft)] mb-3">
                        Complete your foundational strategy tools to build a solid base for your business.
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3" style={{ borderRadius: '2px' }}>
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 transition-all duration-500"
                                style={{ width: `${progressPercentage}%`, borderRadius: '2px' }}
                            ></div>
                        </div>
                        <p className="text-xs text-[var(--text-soft)] mt-1">
                            {progressPercentage}% of Vision Stage foundation complete
                        </p>
                    </div>

                    {/* Step List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
                        {VISION_STAGE_STEPS.map((step) => {
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
                        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
                            <div className="flex items-center gap-2 flex-1">
                                <Sparkles className="w-4 h-4 text-blue-600" />
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

                    {/* Upgrade Incentive */}
                    {progressPercentage >= 60 && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-500/10 border border-[var(--primary-gold)] rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-4 h-4 text-[var(--primary-gold)]" />
                                <span className="text-sm font-bold text-[var(--text-main)]">You're making great progress!</span>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                Complete your Customer Journey to unlock <strong className="text-[var(--primary-gold)]">$49.99/month for 3 months</strong> on The HQ.
                            </p>
                            <Link
                                to={createPageUrl('Upgrade')}
                                className="text-xs text-[var(--primary-gold)] font-medium hover:underline flex items-center"
                            >
                                View HQ Benefits <ChevronRight className="w-3 h-3 ml-1" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}