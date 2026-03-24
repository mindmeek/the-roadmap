import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import {
    ChevronRight, Target, TrendingUp, Zap, CheckCircle, BookOpen,
    ArrowRight, Loader2
} from 'lucide-react';
import moment from 'moment';

export default function NextStepsCard({ user }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) buildNextSteps();
    }, [user]);

    const buildNextSteps = async () => {
        setLoading(true);
        const suggestions = [];

        try {
            // 1. Check if today's progress is tracked
            const today = moment().format('YYYY-MM-DD');
            const todayRecords = await base44.entities.DailyProgress.filter(
                { created_by: user.email, date: today }, '-created_date', 1
            );
            const hasTrackedToday = todayRecords.length > 0 &&
                todayRecords[0].daily_tasks?.some(t => t.completed);

            if (!hasTrackedToday) {
                suggestions.push({
                    id: 'daily-track',
                    icon: TrendingUp,
                    label: "Track Today's 1%",
                    description: "You haven't logged today's progress yet.",
                    href: createPageUrl('DailyTrack'),
                    color: 'text-blue-600',
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    border: 'border-blue-200 dark:border-blue-700',
                    priority: 1,
                });
            }

            // 2. Current journey week
            if (user.current_week) {
                suggestions.push({
                    id: 'journey-week',
                    icon: Target,
                    label: `Continue Week ${user.current_week}`,
                    description: "Pick up where you left off on your 90-day roadmap.",
                    href: `${createPageUrl('Week')}?week=${user.current_week}`,
                    color: 'text-[var(--primary-gold)]',
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    border: 'border-yellow-200 dark:border-yellow-700',
                    priority: 2,
                });
            }

            // 3. Check for incomplete strategy documents
            const docs = await base44.entities.StrategyDocument.filter(
                { created_by: user.email }, '-updated_date', 10
            );
            const docTypeLabels = {
                business_model_canvas: 'Business Model Canvas',
                swot_analysis: 'SWOT Analysis',
                ideal_client: 'Ideal Client Profile',
                value_proposition_canvas: 'Value Proposition',
                value_ladder: 'Value Ladder',
            };
            const docTypeLinks = {
                business_model_canvas: 'StrategyFormBusinessModelCanvas',
                swot_analysis: 'StrategyFormSWOTAnalysis',
                ideal_client: 'StrategyFormIdealClient',
                value_proposition_canvas: 'StrategyFormValueProposition',
                value_ladder: 'StrategyFormValueLadder',
            };
            const completedTypes = new Set(
                docs.filter(d => d.is_completed).map(d => d.document_type)
            );
            const incompleteDoc = docs.find(d => !d.is_completed && docTypeLabels[d.document_type]);

            if (incompleteDoc && docTypeLinks[incompleteDoc.document_type]) {
                suggestions.push({
                    id: 'strategy-doc',
                    icon: BookOpen,
                    label: `Finish: ${docTypeLabels[incompleteDoc.document_type]}`,
                    description: "You have an incomplete strategy tool — pick up where you left off.",
                    href: createPageUrl(docTypeLinks[incompleteDoc.document_type]),
                    color: 'text-purple-600',
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    border: 'border-purple-200 dark:border-purple-700',
                    priority: 3,
                });
            } else if (Object.keys(docTypeLinks).length > completedTypes.size) {
                // Suggest starting the next unstarted tool
                const unstarted = Object.keys(docTypeLinks).find(
                    type => !docs.find(d => d.document_type === type)
                );
                if (unstarted && docTypeLabels[unstarted]) {
                    suggestions.push({
                        id: 'strategy-start',
                        icon: Zap,
                        label: `Start: ${docTypeLabels[unstarted]}`,
                        description: "Build your business foundation with this strategy tool.",
                        href: createPageUrl(docTypeLinks[unstarted]),
                        color: 'text-green-600',
                        bg: 'bg-green-50 dark:bg-green-900/20',
                        border: 'border-green-200 dark:border-green-700',
                        priority: 4,
                    });
                }
            }
        } catch (err) {
            console.error('Error building next steps:', err);
        }

        // Sort by priority and take top 3
        suggestions.sort((a, b) => a.priority - b.priority);
        setSteps(suggestions.slice(0, 3));
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="card p-4 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-[var(--primary-gold)]" />
                <span className="text-sm text-[var(--text-soft)]">Loading your next steps...</span>
            </div>
        );
    }

    if (steps.length === 0) {
        return (
            <div className="card p-4 flex items-center gap-3 border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-[var(--text-main)] text-sm">You're all caught up! 🎉</p>
                    <p className="text-xs text-[var(--text-soft)]">Great work — check back tomorrow for new actions.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-4" style={{ borderRadius: '2px' }}>
            <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="w-4 h-4 text-[var(--primary-gold)]" />
                <h3 className="text-sm font-bold text-[var(--text-main)]">Your Next Steps</h3>
            </div>

            <div className="space-y-2">
                {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                        <Link
                            key={step.id}
                            to={step.href}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border ${step.bg} ${step.border} hover:shadow-md transition-all group`}
                        >
                            <div className="p-1.5 rounded-md bg-white dark:bg-gray-800 flex-shrink-0">
                                <Icon className={`w-4 h-4 ${step.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-xs text-[var(--text-main)]">{step.label}</p>
                                <p className="text-xs text-[var(--text-soft)] truncate">{step.description}</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}