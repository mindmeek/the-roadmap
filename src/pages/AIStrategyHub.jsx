import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Sparkles, 
    Target, 
    TrendingUp, 
    Package,
    Loader2,
    ChevronRight,
    Calendar,
    CheckCircle,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StrategyGeneratorModal from '@/components/ai/StrategyGeneratorModal';

export default function AIStrategyHub() {
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [selectedPlanType, setSelectedPlanType] = useState(null);
    const [viewingPlan, setViewingPlan] = useState(null);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const user = await base44.auth.me();
            const userPlans = await base44.entities.AIGeneratedPlan.filter({ created_by: user.email }, '-created_date');
            setPlans(userPlans);
        } catch (error) {
            console.error('Error loading plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlanGenerated = (newPlan) => {
        setSelectedPlanType(null);
        setPlans([newPlan, ...plans]);
        setViewingPlan(newPlan);
    };

    const strategyTypes = [
        {
            type: '90_day_strategic',
            icon: Target,
            title: '90-Day Strategic Plan',
            description: 'Get a comprehensive roadmap with monthly objectives and weekly action steps',
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            iconColor: 'text-blue-600'
        },
        {
            type: 'marketing',
            icon: TrendingUp,
            title: 'Marketing Strategy',
            description: 'Receive a complete marketing plan with channels, content calendar, and tactics',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            iconColor: 'text-green-600'
        },
        {
            type: 'product_roadmap',
            icon: Package,
            title: 'Product Roadmap',
            description: 'Get product enhancements, new opportunities, and development timeline',
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            iconColor: 'text-purple-600'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (viewingPlan) {
        return <PlanViewer plan={viewingPlan} onClose={() => setViewingPlan(null)} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-main)] mb-3">
                    AI Strategy Hub
                </h1>
                <p className="text-[var(--text-soft)]">
                    Generate comprehensive business strategies powered by AI, tailored to your business goals and current stage.
                </p>
            </div>

            {/* Strategy Type Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {strategyTypes.map((strategy) => {
                    const Icon = strategy.icon;
                    const existingPlans = plans.filter(p => p.plan_type === strategy.type);
                    
                    return (
                        <div key={strategy.type} className="card p-6">
                            <div className={`${strategy.bgColor} p-4 rounded-lg mb-4`}>
                                <Icon className={`w-8 h-8 ${strategy.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                {strategy.title}
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                {strategy.description}
                            </p>
                            {existingPlans.length > 0 && (
                                <p className="text-xs text-[var(--text-soft)] mb-3">
                                    {existingPlans.length} plan{existingPlans.length > 1 ? 's' : ''} generated
                                </p>
                            )}
                            <Button
                                onClick={() => setSelectedPlanType(strategy.type)}
                                className={`w-full bg-gradient-to-r ${strategy.color} text-white`}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Plan
                            </Button>
                        </div>
                    );
                })}
            </div>

            {/* Existing Plans */}
            {plans.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Your Generated Strategies</h2>
                    <div className="space-y-4">
                        {plans.map((plan) => {
                            const strategy = strategyTypes.find(s => s.plan_type === plan.plan_type);
                            const Icon = strategy?.icon || Target;
                            
                            return (
                                <div key={plan.id} className="card p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={`${strategy?.bgColor} p-3 rounded-lg`}>
                                                <Icon className={`w-6 h-6 ${strategy?.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                                                    {plan.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-[var(--text-soft)] mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(plan.created_date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4" />
                                                        {plan.implementation_progress}% Complete
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[var(--text-soft)]">
                                                    {plan.business_context?.goals?.slice(0, 120)}...
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => setViewingPlan(plan)}
                                            variant="outline"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Plan
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedPlanType && (
                <StrategyGeneratorModal
                    isOpen={!!selectedPlanType}
                    onClose={handlePlanGenerated}
                    planType={selectedPlanType}
                />
            )}
        </div>
    );
}

function PlanViewer({ plan, onClose }) {
    const content = plan.plan_content;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Button onClick={onClose} variant="outline" className="mb-6">
                ← Back to Strategy Hub
            </Button>

            <div className="card p-8">
                <h1 className="text-3xl font-bold text-[var(--text-main)] mb-6">{plan.title}</h1>

                {plan.plan_type === '90_day_strategic' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-3">Overview</h2>
                            <p className="text-[var(--text-soft)]">{content.overview}</p>
                        </div>

                        {content.months?.map((month, idx) => (
                            <div key={idx} className="border-l-4 border-[var(--primary-gold)] pl-6">
                                <h3 className="text-2xl font-bold mb-2">Month {month.month_number}: {month.theme}</h3>
                                
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Objectives:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {month.objectives?.map((obj, i) => (
                                            <li key={i} className="text-[var(--text-soft)]">{obj}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    {month.weeks?.map((week, wIdx) => (
                                        <div key={wIdx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <h5 className="font-semibold mb-2">Week {week.week_number}: {week.focus}</h5>
                                            <div className="text-sm space-y-2">
                                                <div>
                                                    <strong>Action Steps:</strong>
                                                    <ul className="list-disc list-inside ml-4">
                                                        {week.action_steps?.map((step, sIdx) => (
                                                            <li key={sIdx}>{step}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {plan.plan_type === 'marketing' && (
                    <div className="space-y-6">
                        <p className="text-[var(--text-soft)]">{content.executive_summary}</p>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-3">Marketing Channels</h3>
                            <div className="grid gap-4">
                                {content.marketing_channels?.map((channel, idx) => (
                                    <div key={idx} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">{channel.channel}</h4>
                                        <p className="text-sm text-[var(--text-soft)] mb-2">{channel.strategy}</p>
                                        <ul className="list-disc list-inside text-sm">
                                            {channel.tactics?.map((tactic, tIdx) => (
                                                <li key={tIdx}>{tactic}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {plan.plan_type === 'product_roadmap' && (
                    <div className="space-y-6">
                        <p className="text-[var(--text-soft)]">{content.vision}</p>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-3">New Opportunities</h3>
                            <div className="space-y-4">
                                {content.new_opportunities?.map((opp, idx) => (
                                    <div key={idx} className="border-l-4 border-green-500 pl-4">
                                        <h4 className="font-semibold">{opp.opportunity}</h4>
                                        <p className="text-sm text-[var(--text-soft)]">{opp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}