import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Target, ChevronRight, Calendar, TrendingUp } from 'lucide-react';
import moment from 'moment';

export default function JourneyTimeline({ user }) {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(1);
    const [daysRemaining, setDaysRemaining] = useState(90);

    useEffect(() => {
        if (user?.journey_start_date) {
            const startDate = moment(user.journey_start_date);
            const today = moment();
            const daysPassed = today.diff(startDate, 'days');
            
            setCurrentWeek(Math.min(Math.floor(daysPassed / 7) + 1, 13));
            setCurrentMonth(Math.min(Math.floor(daysPassed / 30) + 1, 3));
            setDaysRemaining(Math.max(90 - daysPassed, 0));
        }
    }, [user]);

    const progressPercentage = Math.min(((90 - daysRemaining) / 90) * 100, 100);

    return (
        <div className="card p-4 sm:p-6 h-full flex flex-col" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--primary-gold)]" />
                    Your 90-Day Journey
                </h3>
                <Link 
                    to={createPageUrl('Journey')} 
                    className="text-[var(--primary-gold)] hover:underline flex items-center text-xs sm:text-sm font-medium"
                >
                    View Full Roadmap <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            {user?.selected_goal ? (
                <div className="flex-1 flex flex-col">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 mb-4" style={{ borderRadius: '2px' }}>
                        <p className="text-xs text-[var(--text-soft)] mb-1">Your Goal</p>
                        <h4 className="font-bold text-[var(--text-main)] mb-2">{user.selected_goal}</h4>
                        <p className="text-xs text-[var(--text-soft)]">
                            {user.entrepreneurship_stage} Stage • Week {currentWeek} of 13
                        </p>
                    </div>

                    <div className="space-y-4 mb-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-[var(--text-soft)]">Journey Progress</span>
                                <span className="text-sm font-bold text-[var(--primary-gold)]">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3" style={{ borderRadius: '2px' }}>
                                <div 
                                    className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-3 transition-all duration-500"
                                    style={{ width: `${progressPercentage}%`, borderRadius: '2px' }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-[var(--text-soft)]">Days Left</span>
                                </div>
                                <p className="text-2xl font-bold text-[var(--text-main)]">{daysRemaining}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-[var(--text-soft)]">Current Month</span>
                                </div>
                                <p className="text-2xl font-bold text-[var(--text-main)]">{currentMonth} of 3</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Link 
                            to={createPageUrl('Journey')}
                            className="btn btn-primary w-full justify-center text-sm"
                        >
                            <Target className="w-4 h-4 mr-2" />
                            Continue Journey
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                        <Target className="w-8 h-8 text-[var(--text-soft)]" />
                    </div>
                    <h4 className="font-semibold text-[var(--text-main)] mb-2">No Active Journey</h4>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Start your personalized 90-day roadmap</p>
                    <Link to={createPageUrl('Onboarding')} className="btn btn-primary text-sm">
                        Set Up Journey
                    </Link>
                </div>
            )}
        </div>
    );
}