import React from 'react';
import { X, Target, Users, DollarSign, Rocket, Sparkles, Crown, TrendingUp } from 'lucide-react';
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" style={{ borderRadius: '2px' }}>
                {/* Header */}
                <div className="relative bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-4 sm:p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 hover:bg-white/20 transition-colors"
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-white/20 p-1.5 sm:p-2 backdrop-blur-sm" style={{ borderRadius: '2px' }}>
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold">Welcome to Your Journey! 🎉</h2>
                            <p className="text-white/90 text-xs sm:text-sm">Let's turn your vision into reality</p>
                        </div>
                    </div>
                    
                    {showTrialInfo && (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-2 sm:p-3 mt-3 sm:mt-4" style={{ borderRadius: '2px' }}>
                            <div className="flex items-center gap-2 mb-1">
                                <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-semibold text-xs sm:text-sm">Your 14-Day Premium Trial is Active!</span>
                            </div>
                            <p className="text-xs text-white/90">
                                You have <strong>{trialDaysRemaining} days</strong> of full access to explore everything.
                            </p>
                        </div>
                    )}
                </div>

                {/* Inspiring Message */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)] flex-shrink-0" />
                        <div className="w-full">
                            <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">
                                You're Exactly Where You Need to Be
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed mb-2 sm:mb-3">
                                Every successful entrepreneur started right where you are now—with a vision and the courage to take action. 
                                The difference between dreamers and achievers? <strong>A proven system and consistent execution.</strong>
                            </p>
                            <div className="bg-white/50 dark:bg-gray-800/50 p-2 sm:p-3 space-y-2" style={{ borderRadius: '2px' }}>
                                <p className="text-xs font-semibold text-[var(--text-main)] mb-1">As a Business Minds member, you get:</p>
                                <ul className="space-y-1 text-xs text-[var(--text-soft)]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] flex-shrink-0">→</span>
                                        <span><strong>Foundation Roadmap:</strong> Strategic clarity through proven business frameworks</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] flex-shrink-0">→</span>
                                        <span><strong>90-Day Journey:</strong> Actionable weekly steps tailored to your stage & goals</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] flex-shrink-0">→</span>
                                        <span><strong>AI Business Team:</strong> 6 expert assistants available 24/7 for guidance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] flex-shrink-0">→</span>
                                        <span><strong>Community Support:</strong> Connect with entrepreneurs who understand your journey</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-3 sm:mb-4">Choose Your First Step:</h3>
                        
                        {/* Steps Side by Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                            {/* Start Your 90-Day Plan */}
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="block group"
                            >
                                <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all h-full" style={{ borderRadius: '2px' }}>
                                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                        <div className="bg-blue-600 p-1.5 sm:p-2 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ borderRadius: '2px' }}>
                                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1 group-hover:text-blue-600 transition-colors">
                                                Start Your 90-Day Journey
                                            </h4>
                                            <p className="text-xs text-[var(--text-soft)]">
                                                Follow a proven roadmap with weekly action steps
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-1 text-xs text-[var(--text-soft)]">
                                        <li className="flex items-center gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Weekly actionable tasks</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-blue-600">✓</span>
                                            <span>Track progress & milestones</span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>

                            {/* Set Financial Goals */}
                            <Link
                                to={createPageUrl('FreedomCalculator')}
                                onClick={onClose}
                                className="block group"
                            >
                                <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all h-full" style={{ borderRadius: '2px' }}>
                                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                        <div className="bg-green-600 p-1.5 sm:p-2 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ borderRadius: '2px' }}>
                                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm sm:text-base font-bold text-[var(--text-main)] mb-1 group-hover:text-green-600 transition-colors">
                                                Define Financial Freedom
                                            </h4>
                                            <p className="text-xs text-[var(--text-soft)]">
                                                Calculate your freedom number and path
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-1 text-xs text-[var(--text-soft)]">
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>Personal freedom number</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>Revenue milestones</span>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Community + HQ Upgrade - SIDE BY SIDE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Community Info Box */}
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                            <div className="flex items-start gap-2 mb-2 sm:mb-3">
                                <div className="bg-purple-600 p-1.5 sm:p-2 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[var(--text-main)] text-xs sm:text-sm mb-1">
                                        The Business Minds Community
                                    </h4>
                                    <p className="text-xs text-[var(--text-soft)]">
                                        Connect with fellow entrepreneurs
                                    </p>
                                </div>
                            </div>
                            
                            <ul className="space-y-1 text-xs text-[var(--text-soft)] mb-2 sm:mb-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span>Weekly Live Coaching</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span>Network & Collaborate</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span>Real-Time Support</span>
                                </li>
                            </ul>

                            <a
                                href="https://thebminds.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary w-full justify-center text-xs bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                                style={{ borderRadius: '2px' }}
                            >
                                <Users className="w-3 h-3 mr-2" />
                                Access Community
                            </a>
                        </div>

                        {/* HQ Upgrade Info Box */}
                        {user?.subscription_level === 'free' && (
                            <div className="p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-[var(--primary-gold)]" style={{ borderRadius: '2px' }}>
                                <div className="flex items-start gap-2 mb-2 sm:mb-3">
                                    <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-1.5 sm:p-2 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                        <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[var(--text-main)] text-xs sm:text-sm mb-1">
                                            Unlock The Full HQ
                                        </h4>
                                        <p className="text-xs text-[var(--text-soft)]">
                                            Unlimited access to all tools
                                        </p>
                                    </div>
                                </div>
                                
                                <ul className="space-y-1 text-xs text-[var(--text-soft)] mb-2 sm:mb-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span>Unlimited Journeys</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span>All Strategy Tools</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span>Unlimited AI Access</span>
                                    </li>
                                </ul>

                                <Link
                                    to={createPageUrl('Upgrade')}
                                    onClick={onClose}
                                    className="btn w-full justify-center text-xs bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white hover:shadow-lg"
                                    style={{ borderRadius: '2px' }}
                                >
                                    <Crown className="w-3 h-3 mr-2" />
                                    Upgrade - $99/mo
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-xs text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                    >
                        I'll explore on my own →
                    </button>
                </div>
            </div>
        </div>
    );
}