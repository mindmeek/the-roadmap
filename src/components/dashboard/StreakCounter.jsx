import React from 'react';
import { Flame, Zap, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const milestones = [3, 7, 14, 30, 60, 90];

export default function StreakCounter({ streak = 0, daysTracked = 0 }) {
    const nextMilestone = milestones.find(m => m > streak) || 90;
    const prevMilestone = [...milestones].reverse().find(m => m <= streak) || 0;
    const progressToNext = nextMilestone > prevMilestone
        ? Math.round(((streak - prevMilestone) / (nextMilestone - prevMilestone)) * 100)
        : 100;

    const getFlameColor = () => {
        if (streak >= 30) return 'text-purple-500';
        if (streak >= 14) return 'text-orange-500';
        if (streak >= 7) return 'text-yellow-500';
        return 'text-red-400';
    };

    const getBgColor = () => {
        if (streak >= 30) return 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700';
        if (streak >= 14) return 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700';
        if (streak >= 7) return 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-700';
        return 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-700';
    };

    const getMessage = () => {
        if (streak === 0) return "Start your first day!";
        if (streak === 1) return "You've started! Keep going!";
        if (streak < 7) return `${nextMilestone - streak} days until your 7-day milestone!`;
        if (streak === 7) return "🎉 You hit 7 days! You're building a habit!";
        if (streak < 14) return `${nextMilestone - streak} days to your 2-week milestone!`;
        if (streak < 30) return `${nextMilestone - streak} days to the 30-day legend badge!`;
        if (streak < 90) return `You're a legend! ${nextMilestone - streak} days to 90-day mastery!`;
        return "🏆 90-Day Master! You are unstoppable!";
    };

    return (
        <div className={`card p-4 sm:p-6 bg-gradient-to-br ${getBgColor()} border-2`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                    <Flame className={`w-5 h-5 ${getFlameColor()}`} />
                    Daily Streak
                </h3>
                <Link to={createPageUrl('DailyTrack')} className="text-xs text-[var(--primary-gold)] font-semibold hover:underline">
                    Track Today →
                </Link>
            </div>

            {/* Main Streak Number */}
            <div className="flex items-end gap-4 mb-4">
                <div className="text-center">
                    <div className={`text-5xl sm:text-6xl font-black ${getFlameColor()} leading-none`}>
                        {streak}
                    </div>
                    <div className="text-xs text-[var(--text-soft)] mt-1 font-medium uppercase tracking-wide">day streak</div>
                </div>
                <div className="flex-1 text-right">
                    <div className="text-2xl font-bold text-[var(--text-main)]">{daysTracked}</div>
                    <div className="text-xs text-[var(--text-soft)]">total days tracked</div>
                </div>
            </div>

            {/* Progress to next milestone */}
            {streak < 90 && (
                <div className="mb-3">
                    <div className="flex justify-between text-xs text-[var(--text-soft)] mb-1">
                        <span>{streak} days</span>
                        <span>Next: {nextMilestone} days 🏆</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${streak >= 30 ? 'bg-purple-500' : streak >= 14 ? 'bg-orange-500' : streak >= 7 ? 'bg-yellow-500' : 'bg-red-400'}`}
                            style={{ width: `${progressToNext}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Motivational message */}
            <p className="text-xs sm:text-sm text-[var(--text-soft)] italic">{getMessage()}</p>

            {/* Milestone badges */}
            <div className="flex gap-2 mt-3 flex-wrap">
                {milestones.map(m => (
                    <div
                        key={m}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                            streak >= m
                                ? 'bg-[var(--primary-gold)] text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                        }`}
                    >
                        {streak >= m ? <Star className="w-3 h-3" /> : null}
                        {m}d
                    </div>
                ))}
            </div>
        </div>
    );
}