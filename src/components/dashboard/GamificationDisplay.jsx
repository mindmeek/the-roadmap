
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Award, Star, TrendingUp, ChevronRight, HelpCircle } from 'lucide-react';
import Tooltip from '../common/Tooltip'; // Assuming this path is correct based on the outline

const LEVEL_FORMULA = (level) => Math.floor(level * 100 * 1.2);

export default function GamificationDisplay({ user }) {
    if (!user) return null;

    const { level = 1, xp_points = 0, unlocked_achievements = [] } = user;
    const requiredXp = LEVEL_FORMULA(level);
    const progressPercent = Math.min(Math.round((xp_points / requiredXp) * 100), 100);
    const xpToNextLevel = Math.max(requiredXp - xp_points, 0);

    return (
        <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3" style={{ borderRadius: '2px' }}>
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center">
                            Level {level}
                            <Tooltip content="Earn XP by completing tasks, posting in the community, finishing foundation steps, and hitting weekly goals. Level up to unlock achievements and show your progress!">
                                <HelpCircle className="w-4 h-4 ml-2 text-gray-400" />
                            </Tooltip>
                        </h3>
                        <p className="text-sm text-[var(--text-soft)]">{xp_points.toLocaleString()} XP</p>
                    </div>
                </div>
                <Link 
                    to={createPageUrl('Profile')} 
                    className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium"
                >
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            {/* XP Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--text-soft)]">Progress to Level {level + 1}</span>
                    <span className="text-xs font-bold text-purple-600">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <p className="text-xs text-[var(--text-soft)] mt-1">
                    {xpToNextLevel.toLocaleString()} XP to next level
                </p>
            </div>

            {/* Recent Achievements */}
            {unlocked_achievements.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        Recent Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {unlocked_achievements.slice(-3).map((achievementId, index) => (
                            <div 
                                key={index}
                                className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-purple-200 dark:border-purple-700 text-xs font-medium text-[var(--text-main)]"
                            >
                                🏆 {achievementId.replace(/_/g, ' ')}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Earn More XP Tip */}
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-xs text-[var(--text-soft)]">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    <strong>Earn XP by:</strong> Completing daily tasks, posting in the community, finishing foundation steps, and achieving weekly goals!
                </p>
            </div>
        </div>
    );
}
