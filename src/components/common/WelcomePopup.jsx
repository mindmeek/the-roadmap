import React from 'react';
import { X, Target, Users, DollarSign, Rocket, Sparkles, TrendingUp, Crown } from 'lucide-react';
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-8 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Welcome to Your Journey! 🎉</h2>
                            <p className="text-white/90 text-sm mt-1">Let's turn your vision into reality</p>
                        </div>
                    </div>
                    
                    {showTrialInfo && (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Rocket className="w-5 h-5" />
                                <span className="font-semibold">Your 14-Day Premium Trial is Active!</span>
                            </div>
                            <p className="text-sm text-white/90">
                                You have <strong>{trialDaysRemaining} days</strong> of full access to explore everything The Roadmap has to offer.
                            </p>
                        </div>
                    )}
                </div>

                {/* Motivational Message */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                            You're Exactly Where You Need to Be
                        </h3>
                        <p className="text-[var(--text-main)] leading-relaxed mb-4">
                            Every successful entrepreneur started right where you are now—with a vision and the courage to take action. 
                            The difference between dreamers and achievers? <strong>A proven system and consistent execution.</strong>
                        </p>
                        <p className="text-[var(--text-main)] leading-relaxed">
                            You've already taken the hardest step by showing up. Now, The Roadmap will guide you through every phase—from 
                            building your foundation to scaling your success. You're not alone in this journey. 
                            <strong className="text-[var(--primary-gold)]"> Let's build something extraordinary together.</strong>
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Choose Your First Step:</h3>
                        
                        <div className="space-y-4">
                            {/* Start Your 90-Day Plan */}
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="block group"
                            >
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl hover:shadow-lg transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-blue-600 transition-colors">
                                                Start Your 90-Day Journey →
                                            </h4>
                                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                                Follow a proven roadmap with weekly action steps designed for your entrepreneurship stage and goal.
                                            </p>
                                            <ul className="space-y-1 text-xs text-[var(--text-soft)]">
                                                <li className="flex items-center gap-2">
                                                    <span className="text-blue-600">✓</span>
                                                    <span>Weekly actionable tasks tailored to your business</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-blue-600">✓</span>
                                                    <span>Track progress and celebrate milestones</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-blue-600">✓</span>
                                                    <span>Stay focused on what matters most</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Set Financial Goals */}
                            <Link
                                to={createPageUrl('FreedomCalculator')}
                                onClick={onClose}
                                className="block group"
                            >
                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl hover:shadow-lg transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-600 p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <DollarSign className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-green-600 transition-colors">
                                                Define Your Financial Freedom →
                                            </h4>
                                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                                Calculate exactly what financial freedom means for you and create a clear path to get there.
                                            </p>
                                            <ul className="space-y-1 text-xs text-[var(--text-soft)]">
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">✓</span>
                                                    <span>Calculate your personal freedom number</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">✓</span>
                                                    <span>Set revenue milestones and track progress</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-green-600">✓</span>
                                                    <span>Build a roadmap to financial independence</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Community + HQ Upgrade - SIDE BY SIDE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Community Info Box */}
                        <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="bg-purple-600 p-2.5 rounded-lg flex-shrink-0">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[var(--text-main)] mb-1 text-base">
                                        The Business Minds Community
                                    </h4>
                                    <p className="text-xs text-[var(--text-soft)] mb-3">
                                        Connect with entrepreneurs who understand your journey
                                    </p>
                                </div>
                            </div>
                            
                            <ul className="space-y-2 text-xs text-[var(--text-soft)] mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Weekly Live Coaching:</strong> Join Tuesday & Thursday sessions with Christopher Shaw</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Network & Collaborate:</strong> Build valuable connections at every business stage</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Real-Time Support:</strong> Get instant feedback and answers from the community</span>
                                </li>
                            </ul>

                            <a
                                href="https://thebminds.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary w-full justify-center text-sm bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Access Community
                            </a>
                        </div>

                        {/* HQ Upgrade Info Box */}
                        {user?.subscription_level === 'free' && (
                            <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)] rounded-xl">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-2.5 rounded-lg flex-shrink-0">
                                        <Rocket className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[var(--text-main)] mb-1 text-base">
                                            Unlock The Full HQ
                                        </h4>
                                        <p className="text-xs text-[var(--text-soft)] mb-3">
                                            Get unlimited access to accelerate your success
                                        </p>
                                    </div>
                                </div>
                                
                                <ul className="space-y-2 text-xs text-[var(--text-soft)] mb-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>Unlimited Journeys:</strong> Switch goals anytime and explore every roadmap</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>All Strategy Tools:</strong> Full Foundation Roadmap access and premium templates</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>Unlimited AI Access:</strong> Use all AI assistants with no restrictions</span>
                                    </li>
                                </ul>

                                <Link
                                    to={createPageUrl('Upgrade')}
                                    onClick={onClose}
                                    className="btn w-full justify-center text-sm bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white hover:shadow-lg"
                                >
                                    <Crown className="w-4 h-4 mr-2" />
                                    Upgrade to The HQ - $99/mo
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full py-3 text-sm text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                    >
                        I'll explore on my own →
                    </button>
                </div>
            </div>
        </div>
    );
}