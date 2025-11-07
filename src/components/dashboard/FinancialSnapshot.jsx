import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { DollarSign, TrendingUp, Target, Edit, ChevronRight, HelpCircle } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export default function FinancialSnapshot({ user }) {
    const [financialData, setFinancialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.financial_projections) {
            setFinancialData(user.financial_projections);
        }
        setLoading(false);
    }, [user]);

    if (loading) {
        return (
            <div className="card p-6" style={{ borderRadius: '2px' }}>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 w-1/3" style={{ borderRadius: '2px' }}></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700" style={{ borderRadius: '2px' }}></div>
                </div>
            </div>
        );
    }

    if (!financialData || !financialData.freedomNumber) {
        return (
            <div className="card p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700" style={{ borderRadius: '2px' }}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-green-100 dark:bg-green-800 p-2 sm:p-3" style={{ borderRadius: '2px' }}>
                        <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">Set Your Financial Goal</h3>
                        <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-3 sm:mb-4">
                            Calculate your "Freedom Number" - the monthly income you need to achieve financial independence.
                        </p>
                        <Link to={createPageUrl('FreedomCalculator')} className="btn btn-primary w-full justify-center text-sm">
                            <Target className="w-4 h-4 mr-2" />
                            Calculate My Freedom Number
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const freedomNumber = parseFloat(financialData.freedomNumber) || 0;

    return (
        <div className="card p-4 sm:p-6" style={{ borderRadius: '2px' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center flex-wrap gap-2">
                        <span>My Financial Goal</span>
                        <Tooltip content="Your Freedom Number is the monthly income you need to achieve financial independence and quit your day job. It includes your expenses, desired salary, business costs, and a safety buffer.">
                            <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </Tooltip>
                    </h3>
                    <p className="text-xs text-[var(--text-soft)] mt-1">Freedom Number</p>
                </div>
                <Link to={createPageUrl('FreedomCalculator')} className="text-[var(--text-soft)] hover:text-[var(--primary-gold)] flex-shrink-0">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
            </div>

            {/* Freedom Number Display */}
            <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700" style={{ borderRadius: '2px' }}>
                <p className="text-xs text-[var(--text-soft)] mb-1">Monthly Target</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    ${freedomNumber.toLocaleString()}<span className="text-sm">/mo</span>
                </p>
            </div>

            {/* Info Message */}
            <div className="mb-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 flex items-start space-x-2 text-xs" style={{ borderRadius: '2px' }}>
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-700 dark:text-blue-300">
                    This is your target monthly income to achieve financial freedom. Track your progress manually as you build your revenue streams.
                </span>
            </div>

            {/* CTA */}
            <Link to={createPageUrl('FreedomCalculator')} className="btn btn-secondary w-full text-center text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Review Strategy
            </Link>
        </div>
    );
}