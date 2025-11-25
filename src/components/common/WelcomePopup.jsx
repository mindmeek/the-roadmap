import React from 'react';
import { X, Target, Users, DollarSign, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function WelcomePopup({ isOpen, onClose, user }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const trialDaysRemaining = user?.trial_expires_on 
        ? Math.max(0, Math.ceil((new Date(user.trial_expires_on) - new Date()) / (1000 * 60 * 60 * 24)))
        : 0;

    const showTrialInfo = user?.is_premium_trial_user && user?.trial_status === 'active' && trialDaysRemaining > 0;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-lg sm:max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto" style={{ borderRadius: '2px' }}>
                {/* Header */}
                <div className="relative p-3 sm:p-4 text-center border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>

                    <div className="flex items-center justify-center gap-2 mb-1">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png" 
                            alt="Business Minds" 
                            className="w-8 h-8"
                        />
                        <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Welcome to Your Journey</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-soft)]">Let's turn your vision into reality</p>

                    {showTrialInfo && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium" style={{ borderRadius: '2px' }}>
                            <Rocket className="w-3 h-3" />
                            <span>{trialDaysRemaining} days left in trial</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                    {/* Quick Welcome */}
                    <div className="text-center">
                        <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                            <strong>You're ready to build something amazing.</strong> Here's what to do next:
                        </p>
                    </div>

                    {/* Primary Actions - Compact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <Link
                            to={createPageUrl('Journey')}
                            onClick={onClose}
                            className="group bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-3 sm:p-4 hover:shadow-lg transition-all"
                            style={{ borderRadius: '2px' }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                                <h4 className="text-sm sm:text-base font-bold">Start 90-Day Journey</h4>
                            </div>
                            <p className="text-white/80 text-xs">Your step-by-step roadmap</p>
                        </Link>

                        <Link
                            to={createPageUrl('FreedomCalculator')}
                            onClick={onClose}
                            className="group bg-gradient-to-br from-green-600 to-emerald-600 text-white p-3 sm:p-4 hover:shadow-lg transition-all"
                            style={{ borderRadius: '2px' }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                                <h4 className="text-sm sm:text-base font-bold">Set Financial Goal</h4>
                            </div>
                            <p className="text-white/80 text-xs">Calculate your freedom number</p>
                        </Link>
                    </div>

                    {/* Community CTA - Compact */}
                    <div className="p-2 sm:p-3 border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                <span className="text-xs sm:text-sm font-medium text-[var(--text-main)]">Join the Community</span>
                            </div>
                            <a
                                href="https://thebminds.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-purple-600 text-white hover:bg-purple-700"
                                style={{ borderRadius: '2px' }}
                            >
                                Access
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center pt-1">
                        <button
                            onClick={onClose}
                            className="text-xs text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                        >
                            I'll explore on my own →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}