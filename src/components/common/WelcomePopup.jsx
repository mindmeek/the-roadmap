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
            <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-5xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto" style={{ borderRadius: '2px' }}>
                {/* Header */}
                <div className="relative p-4 sm:p-6 text-center border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png" 
                            alt="Business Minds" 
                            className="w-10 h-10 sm:w-12 sm:h-12"
                        />
                        <h2 className="text-xl sm:text-3xl font-bold text-[var(--text-main)]">Welcome to Your Journey</h2>
                    </div>
                    <p className="text-sm sm:text-base text-[var(--text-soft)]">Let's turn your vision into reality</p>
                    
                    {showTrialInfo && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium" style={{ borderRadius: '2px' }}>
                            <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{trialDaysRemaining} days left in your premium trial</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Inspiring Welcome Message */}
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-sm sm:text-lg text-[var(--text-main)] leading-relaxed mb-3 sm:mb-4">
                            <strong>You're exactly where you need to be.</strong> Every successful entrepreneur started with a vision and the courage to take action. The difference between dreamers and achievers? <strong>A proven system and consistent execution.</strong>
                        </p>
                        <p className="text-xs sm:text-base text-[var(--text-soft)] mb-4 sm:mb-6">
                            As a Business Minds member, you have access to the complete roadmap, expert guidance, and a supportive community—everything you need to build the business you've envisioned.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                            <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-0.5 sm:mb-1">Foundation Roadmap</div>
                                <div className="text-[10px] sm:text-xs text-[var(--text-soft)]">Strategic clarity</div>
                            </div>
                            <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-0.5 sm:mb-1">90-Day Journey</div>
                                <div className="text-[10px] sm:text-xs text-[var(--text-soft)]">Actionable steps</div>
                            </div>
                            <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-0.5 sm:mb-1">AI Business Team</div>
                                <div className="text-[10px] sm:text-xs text-[var(--text-soft)]">24/7 guidance</div>
                            </div>
                            <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-0.5 sm:mb-1">Community</div>
                                <div className="text-[10px] sm:text-xs text-[var(--text-soft)]">Expert support</div>
                            </div>
                        </div>
                    </div>

                    {/* Primary Actions - Modern & Bold */}
                    <div className="max-w-4xl mx-auto">
                        <h3 className="font-bold text-[var(--text-main)] mb-3 sm:mb-6 text-center text-base sm:text-xl">Choose Your First Step</h3>
                        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2">
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="group relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 p-5 sm:p-8"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="bg-white/20 p-2 sm:p-3 backdrop-blur-sm" style={{ borderRadius: '2px' }}>
                                            <Target className="w-5 h-5 sm:w-8 sm:h-8" />
                                        </div>
                                        <h4 className="text-lg sm:text-2xl font-black">Start Your 90-Day Journey</h4>
                                    </div>
                                    <p className="text-white/90 text-xs sm:text-base mb-4 sm:mb-6 leading-relaxed">
                                        Follow a proven, step-by-step roadmap designed to transform your business vision into reality in just 90 days.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm font-semibold text-white/80">BEGIN NOW</span>
                                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to={createPageUrl('FreedomCalculator')}
                                onClick={onClose}
                                className="group relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 p-5 sm:p-8"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                        <div className="bg-white/20 p-2 sm:p-3 backdrop-blur-sm" style={{ borderRadius: '2px' }}>
                                            <DollarSign className="w-5 h-5 sm:w-8 sm:h-8" />
                                        </div>
                                        <h4 className="text-lg sm:text-2xl font-black">Calculate Your Freedom Number</h4>
                                    </div>
                                    <p className="text-white/90 text-xs sm:text-base mb-4 sm:mb-6 leading-relaxed">
                                        Discover exactly how much you need to earn to achieve true financial freedom and design your business around it.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm font-semibold text-white/80">CALCULATE NOW</span>
                                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Community CTA - Smaller & Focused */}
                    <div className="max-w-2xl mx-auto">
                        <div className="p-3 sm:p-4 border border-purple-200 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20" style={{ borderRadius: '2px' }}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm sm:text-base text-[var(--text-main)]">Join The Community</h3>
                                        <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                            Connect with entrepreneurs, get live coaching, and grow together.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://thebminds.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-sm w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:shadow-lg whitespace-nowrap text-xs sm:text-sm"
                                >
                                    Access Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <button
                            onClick={onClose}
                            className="text-xs sm:text-sm text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                        >
                            I'll explore on my own →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}