import React from 'react';
import { X, Target, Users, DollarSign, Rocket, Sparkles, Crown, ArrowRight } from 'lucide-react';
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ borderRadius: '2px' }}>
                {/* Header */}
                <div className="relative p-8 text-center border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-gold)] mb-4" style={{ borderRadius: '2px' }}>
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">Welcome to Your Journey</h2>
                    <p className="text-[var(--text-soft)]">Let's turn your vision into reality</p>
                    
                    {showTrialInfo && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium" style={{ borderRadius: '2px' }}>
                            <Rocket className="w-4 h-4" />
                            <span>{trialDaysRemaining} days left in your premium trial</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="p-8 space-y-6">
                    {/* Hero Message */}
                    <div className="text-center max-w-lg mx-auto">
                        <p className="text-[var(--text-main)] leading-relaxed mb-4">
                            Every successful entrepreneur started where you are now. The difference? 
                            <strong> A proven system and consistent execution.</strong>
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-1">Foundation Roadmap</div>
                                <div className="text-xs text-[var(--text-soft)]">Strategic clarity</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-1">90-Day Journey</div>
                                <div className="text-xs text-[var(--text-soft)]">Actionable steps</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-1">AI Business Team</div>
                                <div className="text-xs text-[var(--text-soft)]">24/7 guidance</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '2px' }}>
                                <div className="font-semibold text-[var(--text-main)] mb-1">Community</div>
                                <div className="text-xs text-[var(--text-soft)]">Expert support</div>
                            </div>
                        </div>
                    </div>

                    {/* Primary Actions */}
                    <div>
                        <h3 className="font-bold text-[var(--text-main)] mb-4 text-center">Choose Your First Step</h3>
                        <div className="space-y-3">
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="group block p-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg transition-all"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2" style={{ borderRadius: '2px' }}>
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Start Your 90-Day Journey</div>
                                            <div className="text-xs text-white/80">Weekly action steps to achieve your goals</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            <Link
                                to={createPageUrl('FreedomCalculator')}
                                onClick={onClose}
                                className="group block p-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2" style={{ borderRadius: '2px' }}>
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Calculate Financial Freedom</div>
                                            <div className="text-xs text-white/80">Define your freedom number and revenue goals</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href="https://thebminds.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center group"
                            style={{ borderRadius: '2px' }}
                        >
                            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                            <div className="font-semibold text-[var(--text-main)] text-sm mb-1">Community</div>
                            <div className="text-xs text-[var(--text-soft)]">Connect & learn</div>
                        </a>

                        {user?.subscription_level === 'free' && (
                            <Link
                                to={createPageUrl('Upgrade')}
                                onClick={onClose}
                                className="p-4 border-2 border-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-white transition-all text-center group"
                                style={{ borderRadius: '2px' }}
                            >
                                <Crown className="w-6 h-6 text-[var(--primary-gold)] group-hover:text-white mx-auto mb-2 group-hover:scale-110 transition-all" />
                                <div className="font-semibold text-[var(--text-main)] group-hover:text-white text-sm mb-1">Upgrade</div>
                                <div className="text-xs text-[var(--text-soft)] group-hover:text-white/90">Full HQ access</div>
                            </Link>
                        )}
                    </div>

                    {/* 30-Day Guarantee */}
                    <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="inline-flex items-center gap-2 text-sm text-[var(--text-soft)] mb-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 flex items-center justify-center" style={{ borderRadius: '2px' }}>
                                <span className="text-green-600">✓</span>
                            </div>
                            <span>30-Day Money-Back Guarantee</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-sm text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                        >
                            I'll explore on my own →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}