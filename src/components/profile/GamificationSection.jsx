import React, { useState, useEffect } from 'react';
import { Achievement } from '@/entities/all';
import {
    ShieldQuestion,
    CheckSquare,
    MessageSquare,
    Users,
    ClipboardCheck,
    Award,
    Star
} from 'lucide-react';

const iconMap = {
    CheckSquare,
    MessageSquare,
    Users,
    ClipboardCheck,
    Award,
    Star
};

const LEVEL_FORMULA = (level) => Math.floor(level * 100 * 1.2);

const GamificationSection = ({ user }) => {
    const [allAchievements, setAllAchievements] = useState([]);
    
    useEffect(() => {
        const fetchAchievements = async () => {
            const achievements = await Achievement.list();
            setAllAchievements(achievements);
        };
        fetchAchievements();
    }, []);

    const { level = 1, xp_points = 0, unlocked_achievements = [] } = user;
    const requiredXp = LEVEL_FORMULA(level);
    const progressPercent = Math.round((xp_points / requiredXp) * 100);

    return (
        <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">Your Progress</h3>
            
            {/* Level and XP Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-2xl text-[var(--primary-gold)]">Level {level}</span>
                    <span className="text-sm text-[var(--text-soft)]">{xp_points} / {requiredXp} XP</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                        className="bg-[var(--primary-gold)] h-2.5 rounded-full" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            {/* Achievements */}
            <div>
                <h4 className="font-semibold text-lg mb-3 text-[var(--text-main)]">Achievements</h4>
                {allAchievements.length === 0 ? (
                    <p className="text-[var(--text-soft)]">Loading achievements...</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {allAchievements.map(ach => {
                            const isUnlocked = unlocked_achievements.includes(ach.achievement_id);
                            const Icon = iconMap[ach.icon_name] || ShieldQuestion;
                            
                            return (
                                <div 
                                    key={ach.achievement_id} 
                                    className={`text-center p-4 rounded-lg border-2 transition-all ${
                                        isUnlocked 
                                            ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20' 
                                            : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 opacity-60'
                                    }`}
                                    title={`${ach.title}: ${ach.description}`}
                                >
                                    <Icon className={`w-10 h-10 mx-auto mb-2 ${isUnlocked ? 'text-[var(--primary-gold)]' : 'text-gray-400'}`} />
                                    <p className={`font-semibold text-sm ${isUnlocked ? 'text-[var(--text-main)]' : 'text-gray-500'}`}>
                                        {ach.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamificationSection;