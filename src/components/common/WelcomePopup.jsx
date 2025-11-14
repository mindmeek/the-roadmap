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
            <div className="bg-white dark:bg-gray-900 shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-y-auto" style={{ borderRadius: '2px' }}>
                {/* Header */}
                <div className="relative p-6 text-center border-b border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-gold)] mb-3" style={{ borderRadius: '2px' }}>
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">Welcome to Your Journey</h2>
                    <p className="text-[var(--text-soft)]">Let's turn your vision into reality</p>
                    
                    {showTrialInfo && (
                        <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium" style={{ borderRadius: '2px' }}>
                            <Rocket className="w-4 h-4" />
                            <span>{trialDaysRemaining} days left in your premium trial</span>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="p-6 space-y-6">
                    {/* Inspiring Welcome Message */}
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-lg text-[var(--text-main)] leading-relaxed mb-4">
                            <strong>You're exactly where you need to be.</strong> Every successful entrepreneur started with a vision and the courage to take action. The difference between dreamers and achievers? <strong>A proven system and consistent execution.</strong>
                        </p>
                        <p className="text-[var(--text-soft)] mb-6">
                            As a Business Minds member, you have access to the complete roadmap, expert guidance, and a supportive community—everything you need to build the business you've envisioned.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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

                    {/* Primary Actions - Centered */}
                    <div className="max-w-2xl mx-auto">
                        <h3 className="font-bold text-[var(--text-main)] mb-4 text-center">Choose Your First Step</h3>
                        <div className="space-y-3">
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="group block p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg transition-all"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="flex items-center justify-between">
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
                                className="group block p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all"
                                style={{ borderRadius: '2px' }}
                            >
                                <div className="flex items-center justify-between">
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

                    {/* Secondary CTAs - Community & Upgrade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {/* Community CTA */}
                        <div className="p-5 border-2 border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20" style={{ borderRadius: '2px' }}>
                            <div className="flex items-start gap-3 mb-3">
                                <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">The Business Minds Community</h3>
                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                        Connect with a thriving network of entrepreneurs who understand your journey and are committed to mutual growth.
                                    </p>
                                </div>
                            </div>
                            
                            <ul className="space-y-2 text-sm text-[var(--text-soft)] mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Weekly Live Coaching:</strong> Join group sessions every Tuesday & Thursday</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Network & Collaborate:</strong> Build valuable connections at every stage</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                    <span><strong>Real-Time Support:</strong> Get instant feedback from the community</span>
                                </li>
                            </ul>

                            <a
                                href="https://thebminds.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary w-full justify-center bg-gradient-to-r from-purple-600 to-blue-600 border-0"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Access Community Now
                            </a>
                        </div>

                        {/* HQ Upgrade CTA */}
                        {user?.subscription_level === 'free' && (
                            <div className="p-5 border-2 border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" style={{ borderRadius: '2px' }}>
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-2 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                        <Crown className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[var(--text-main)] mb-1">Unlock The Full HQ Experience</h3>
                                        <p className="text-sm text-[var(--text-soft)] mb-3">
                                            Get unlimited access to every tool, training, and resource you need to scale your business faster than ever.
                                        </p>
                                    </div>
                                </div>
                                
                                <ul className="space-y-2 text-sm text-[var(--text-soft)] mb-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>Unlimited Journeys:</strong> Switch goals anytime and access every roadmap</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>All Strategy Tools:</strong> Full Foundation Roadmap access</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                        <span><strong>Unlimited AI Access:</strong> Use all assistants with no restrictions</span>
                                    </li>
                                </ul>

                                <Link
                                    to={createPageUrl('Upgrade')}
                                    onClick={onClose}
                                    className="btn w-full justify-center bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white border-0 hover:shadow-lg"
                                >
                                    <Crown className="w-4 h-4 mr-2" />
                                    Upgrade to The HQ - $99/mo
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center">
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