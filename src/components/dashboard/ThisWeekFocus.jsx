import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    CheckCircle2, Circle, ArrowRight, Loader2, Zap, Clock, Target, Sparkles
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import roadmapData from '../roadmap';

export default function ThisWeekFocus({ user }) {
    const [actionSteps, setActionSteps] = useState([]);
    const [weekTitle, setWeekTitle] = useState('');
    const [loading, setLoading] = useState(true);

    const currentWeek = user?.current_week || 1;
    const completedWeeks = user?.completed_weeks || [];
    const isWeekCompleted = completedWeeks.includes(currentWeek);

    useEffect(() => {
        if (!user?.entrepreneurship_stage || !user?.selected_goal) {
            setLoading(false);
            return;
        }
        loadWeekSteps();
    }, [user]);

    const loadWeekSteps = async () => {
        setLoading(true);
        try {
            // 1. Try static roadmap data first
            const staticRoot = roadmapData.default || roadmapData;
            const stageData = staticRoot?.[user.entrepreneurship_stage];
            const goalData = stageData?.goals?.[user.selected_goal]
                || staticRoot?.nicheRoadmaps?.[user.selected_goal];

            if (goalData?.months) {
                let weekCount = 0;
                for (const month of goalData.months) {
                    for (const week of month.weeks) {
                        weekCount++;
                        if (weekCount === currentWeek) {
                            setWeekTitle(week.title);
                            setActionSteps((week.actionSteps || []).map(step => ({
                                title: step.title,
                                description: step.description,
                                deliverable: step.deliverable,
                                time_estimate: step.timeEstimate,
                                link_to: step.linkTo,
                            })));
                            setLoading(false);
                            return;
                        }
                    }
                }
            }

            // 2. Fallback to DB
            const results = await base44.entities.RoadmapContent.filter({
                stage: user.entrepreneurship_stage,
                goal_id: user.selected_goal,
                week_number: currentWeek,
                is_published: true
            });

            if (results.length > 0) {
                const week = results[0];
                setWeekTitle(week.week_title);
                setActionSteps(week.action_steps || []);
            }
        } catch (err) {
            console.error('Error loading this week steps:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!user?.entrepreneurship_stage || !user?.selected_goal) return null;

    return (
        <div className="card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="bg-[var(--primary-gold)] p-2 rounded-lg">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)]">This Week's Focus</h2>
                        <p className="text-xs text-[var(--text-soft)]">
                            Week {currentWeek}
                            {weekTitle ? ` — ${weekTitle}` : ''}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isWeekCompleted && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> Week Complete
                        </span>
                    )}
                    <Link
                        to={createPageUrl('Week') + `?week=${currentWeek}`}
                        className="btn btn-secondary text-sm"
                    >
                        Open Week <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
                    <span className="ml-2 text-[var(--text-soft)]">Loading your week...</span>
                </div>
            ) : actionSteps.length === 0 ? (
                <div className="text-center py-10">
                    <Sparkles className="w-10 h-10 text-[var(--primary-gold)] mx-auto mb-3" />
                    <p className="text-[var(--text-soft)]">No action steps found for this week.</p>
                    <Link to={createPageUrl('Journey')} className="btn btn-primary mt-4">
                        View My Journey
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {actionSteps.map((step, idx) => {
                        const weekPageUrl = createPageUrl('Week') + `?week=${currentWeek}`;
                        const taskUrl = step.link_to ? createPageUrl(step.link_to) : weekPageUrl;

                        return (
                            <Link
                                key={idx}
                                to={taskUrl}
                                className="group flex flex-col justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)] hover:shadow-md transition-all bg-white dark:bg-gray-900"
                            >
                                <div>
                                    {/* Step number + title */}
                                    <div className="flex items-start gap-3 mb-2">
                                        <span className="flex-shrink-0 bg-[var(--primary-gold)]/10 text-[var(--primary-gold)] text-xs font-bold px-2 py-1 rounded-full min-w-[28px] text-center">
                                            {idx + 1}
                                        </span>
                                        <h4 className="font-semibold text-[var(--text-main)] text-sm leading-snug group-hover:text-[var(--primary-gold)] transition-colors">
                                            {step.title}
                                        </h4>
                                    </div>

                                    {/* Description */}
                                    {step.description && (
                                        <p className="text-xs text-[var(--text-soft)] leading-relaxed line-clamp-2 mb-3 ml-8">
                                            {step.description}
                                        </p>
                                    )}
                                </div>

                                <div className="ml-8 space-y-1">
                                    {/* Deliverable */}
                                    {step.deliverable && (
                                        <div className="flex items-start gap-1.5">
                                            <Target className="w-3 h-3 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs text-blue-700 dark:text-blue-300 leading-tight">
                                                {step.deliverable}
                                            </p>
                                        </div>
                                    )}

                                    {/* Time estimate */}
                                    {step.time_estimate && (
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3 text-[var(--text-soft)] flex-shrink-0" />
                                            <span className="text-xs text-[var(--text-soft)]">{step.time_estimate}</span>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="flex items-center gap-1 pt-1 text-[var(--primary-gold)] font-semibold text-xs group-hover:gap-2 transition-all">
                                        {step.link_to ? 'Open Tool' : 'Do The Work'}
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}