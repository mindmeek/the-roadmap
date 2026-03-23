import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight, CheckCircle2, Circle, Calendar, Target, TrendingUp, AlertTriangle, Loader2, Zap, Clock, ArrowRight } from 'lucide-react';
import { RoadmapContent } from '@/entities/all';
import roadmapData from '../roadmap';

export default function JourneyTimeline({ user }) {
    const [expandedMonth, setExpandedMonth] = useState(null);
    const [roadmapWeeks, setRoadmapWeeks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentWeekSteps, setCurrentWeekSteps] = useState([]);
    const [currentWeekTitle, setCurrentWeekTitle] = useState('');

    useEffect(() => {
        if (!user?.entrepreneurship_stage || !user?.selected_goal) return;
        loadCurrentWeekSteps();
    }, [user]);

    const loadCurrentWeekSteps = async () => {
        const currentWeekNum = user.current_week || 1;
        try {
            // Try static data first
            const staticRoot = roadmapData.default || roadmapData;
            const goalData = staticRoot?.[user.entrepreneurship_stage]?.goals?.[user.selected_goal]
                || staticRoot?.nicheRoadmaps?.[user.selected_goal];

            if (goalData?.months) {
                let weekCount = 0;
                for (const month of goalData.months) {
                    for (const week of month.weeks) {
                        weekCount++;
                        if (weekCount === currentWeekNum) {
                            setCurrentWeekTitle(week.title);
                            setCurrentWeekSteps((week.actionSteps || []).map(s => ({
                                title: s.title,
                                description: s.description,
                                deliverable: s.deliverable,
                                time_estimate: s.timeEstimate,
                                link_to: s.linkTo,
                            })));
                            return;
                        }
                    }
                }
            }
            // Fallback to DB
            const results = await RoadmapContent.filter({
                stage: user.entrepreneurship_stage,
                goal_id: user.selected_goal,
                week_number: currentWeekNum,
                is_published: true
            });
            if (results.length > 0) {
                setCurrentWeekTitle(results[0].week_title);
                setCurrentWeekSteps(results[0].action_steps || []);
            }
        } catch (err) {
            console.error('Error loading current week steps:', err);
        }
    };

    if (!user || !user.entrepreneurship_stage || !user.selected_goal) {
        return (
            <div className="card p-6 h-full flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">No Journey Selected</h3>
                    <p className="text-[var(--text-soft)] mb-4">
                        Complete your onboarding to start your 90-day journey.
                    </p>
                    <Link to={createPageUrl('Onboarding')} className="btn btn-primary">
                        Start Onboarding
                    </Link>
                </div>
            </div>
        );
    }

    const currentMonth = (user.current_month || 1) - 1;
    const completedWeeks = user.completed_weeks || [];
    const currentWeek = user.current_week || 1;

    // Load weeks for specific month from database
    const loadWeeksForMonth = async (monthIndex) => {
        setLoading(true);
        try {
            const monthNumber = monthIndex + 1;
            const weeks = await RoadmapContent.filter({
                stage: user.entrepreneurship_stage,
                goal_id: user.selected_goal,
                month_number: monthNumber,
                is_published: true
            });
            
            // Sort by week_number
            const sortedWeeks = weeks.sort((a, b) => a.week_number - b.week_number);
            setRoadmapWeeks(sortedWeeks);
        } catch (error) {
            console.error('Error loading weeks:', error);
            setRoadmapWeeks([]);
        } finally {
            setLoading(false);
        }
    };

    const toggleMonth = async (monthIndex) => {
        if (expandedMonth === monthIndex) {
            setExpandedMonth(null);
            setRoadmapWeeks([]);
        } else {
            setExpandedMonth(monthIndex);
            await loadWeeksForMonth(monthIndex);
        }
    };

    const getMonthProgress = (monthIndex) => {
        // Calculate progress based on completed weeks in this month
        const monthNumber = monthIndex + 1;
        const startWeek = (monthNumber - 1) * 4 + 1;
        const endWeek = monthNumber * 4;
        
        const weeksInMonth = [];
        for (let w = startWeek; w <= endWeek; w++) {
            weeksInMonth.push(w);
        }
        
        const completedInMonth = weeksInMonth.filter(w => completedWeeks.includes(w)).length;
        return Math.round((completedInMonth / weeksInMonth.length) * 100);
    };

    // Static month titles based on stage and goal
    const getMonthTitle = (monthIndex) => {
        const monthNumber = monthIndex + 1;
        
        // Default titles by stage
        const defaultTitles = {
            vision: [
                'Month 1: Vision & Validation',
                'Month 2: Business Structure & Brand',
                'Month 3: Launch & Growth'
            ],
            startup: [
                'Month 1: Market Research & Strategy',
                'Month 2: Operations & Financial Planning',
                'Month 3: Launch Strategy & Execution'
            ],
            growth: [
                'Month 1: Optimization Foundation',
                'Month 2: Systems & Scaling',
                'Month 3: Growth & Expansion'
            ]
        };

        return defaultTitles[user.entrepreneurship_stage]?.[monthIndex] || `Month ${monthNumber}`;
    };

    const months = [0, 1, 2]; // Three months

    return (
        <div className="card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Journey Timeline</h2>
                    <p className="text-sm text-[var(--text-soft)] mt-1">
                        {user.entrepreneurship_stage} Stage - {user.selected_goal?.replace(/_/g, ' ')}
                    </p>
                </div>
                <Link to={createPageUrl('Journey')} className="btn btn-secondary text-sm">
                    View Full Journey
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            {/* Progress Celebration */}
            {completedWeeks.length > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
                    <div className="flex items-start gap-3">
                        <div className="text-3xl">🚀</div>
                        <div className="flex-1">
                            <h4 className="font-bold text-green-800 dark:text-green-200 mb-1">
                                You're Making Progress! {completedWeeks.length} Week{completedWeeks.length !== 1 ? 's' : ''} Complete
                            </h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                You're in <strong>Week {currentWeek}</strong> of your 90-Day Journey. Each week builds on your Foundation strategy. Keep executing!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4 flex-1 overflow-y-auto">
                {months.map((monthIndex) => {
                    const isCurrentMonth = monthIndex === currentMonth;
                    const progress = getMonthProgress(monthIndex);
                    const isExpanded = expandedMonth === monthIndex;

                    return (
                        <div key={monthIndex} className={`border rounded-lg overflow-hidden transition-all ${
                            isCurrentMonth ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/10' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                            <button
                                onClick={() => toggleMonth(monthIndex)}
                                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${
                                            isCurrentMonth 
                                                ? 'bg-[var(--primary-gold)] text-white' 
                                                : 'bg-gray-100 dark:bg-gray-700 text-[var(--text-soft)]'
                                        }`}>
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--text-main)]">
                                                {getMonthTitle(monthIndex)}
                                            </h3>
                                            <p className="text-sm text-[var(--text-soft)]">{progress}% complete</p>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-[var(--text-soft)] transition-transform ${
                                        isExpanded ? 'rotate-90' : ''
                                    }`} />
                                </div>
                                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-[var(--primary-gold)] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                                    {loading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
                                            <span className="ml-2 text-[var(--text-soft)]">Loading weeks...</span>
                                        </div>
                                    ) : roadmapWeeks.length > 0 ? (
                                        <div className="space-y-2">
                                            {roadmapWeeks.map((week) => {
                                                const isCompleted = completedWeeks.includes(week.week_number);
                                                const isCurrent = week.week_number === currentWeek;

                                                return (
                                                    <Link
                                                        key={week.id}
                                                        to={createPageUrl('Week') + `?week=${week.week_number}`}
                                                        className={`block p-3 rounded-lg border transition-all hover:shadow-md ${
                                                            isCurrent 
                                                                ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20' 
                                                                : 'border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)]'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                {isCompleted ? (
                                                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                                ) : (
                                                                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                                )}
                                                                <div>
                                                                    <p className="font-medium text-[var(--text-main)]">
                                                                        Week {week.week_number}: {week.week_title}
                                                                    </p>
                                                                    {week.week_description && (
                                                                        <p className="text-xs text-[var(--text-soft)] mt-1">
                                                                            {week.week_description}
                                                                        </p>
                                                                    )}
                                                                    {isCurrent && (
                                                                        <span className="text-xs text-[var(--primary-gold)] font-semibold">Current Week - Take Action!</span>
                                                                    )}
                                                                    {isCompleted && (
                                                                        <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1 mt-1">
                                                                            ✓ Completed
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-[var(--text-soft)]" />
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-[var(--text-soft)]">No weeks found for this month.</p>
                                            <p className="text-xs text-[var(--text-soft)] mt-2">
                                                Content may still be in development.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Implementation Reminder */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                <p className="text-sm text-[var(--text-main)] font-medium flex items-start gap-2">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Journey Implementation:</strong> Each week's action steps reference your Foundation strategy documents. Complete your Foundation first, then execute your Journey with clarity. Stuck? Ask your <Link to={createPageUrl('ElyzetAIAssistants')} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">AI Team</Link> for guidance!
                    </span>
                </p>
            </div>
        </div>
    );
}