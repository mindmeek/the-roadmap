import React, { useEffect, useState } from 'react';
import { X, Target, Users, DollarSign, Rocket, ArrowRight, Star, CheckCircle2, Trophy, Lightbulb, TrendingUp, Settings, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { base44 } from '@/api/base44Client';

const GOALS = [
    { id: 'launch', label: 'Launch my first product or service', icon: Rocket, color: 'blue' },
    { id: 'grow', label: 'Grow my audience & revenue', icon: TrendingUp, color: 'green' },
    { id: 'automate', label: 'Automate & scale my operations', icon: Settings, color: 'purple' },
    { id: 'learn', label: 'Learn & build my skills', icon: BookOpen, color: 'orange' },
];

const colorMap = {
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
    orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20',
};

const iconColorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
};

export default function WelcomePopup({ isOpen, onClose, user }) {
    const [step, setStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleGoalContinue = async () => {
        if (!selectedGoal) return;
        setSaving(true);
        try {
            await base44.auth.updateMe({ primary_goal: selectedGoal });
        } catch (e) {
            console.error('Failed to save goal', e);
        } finally {
            setSaving(false);
            setStep(2);
        }
    };

    useEffect(() => {
        if (isOpen) {
            // Trigger confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };
            
            const randomInRange = (min, max) => Math.random() * (max - min) + min;
            
            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
            
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
            
                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
            
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) setStep(1);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const trialDaysRemaining = user?.trial_expires_on 
        ? Math.max(0, Math.ceil((new Date(user.trial_expires_on) - new Date()) / (1000 * 60 * 60 * 24)))
        : 0;

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                onClick={handleBackdropClick}
            >
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-200 dark:border-gray-800"
                >
                    {/* Header Section */}
                    <div className="relative bg-black text-white p-6 overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-gold)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative z-10 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-[var(--primary-gold)]/20 rounded-full mb-4 border border-[var(--primary-gold)]/30">
                                <Trophy className="w-8 h-8 text-[var(--primary-gold)]" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-['Poppins']">
                                Welcome to the Inner Circle
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto">
                                You've taken the first step towards building your empire. 
                                Your 90-Day Journey to freedom starts now.
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-6">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">
                                Ready to Make It Happen?
                            </h3>
                            <p className="text-[var(--text-soft)] text-sm">
                                We've structured everything you need to succeed. Choose your first power move:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Link
                                to={createPageUrl('Journey')}
                                onClick={onClose}
                                className="group relative p-5 rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 hover:border-[var(--primary-gold)] transition-all duration-300 hover:shadow-lg overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-[var(--primary-gold)] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--text-main)] mb-1">Start Your Journey</h4>
                                        <p className="text-xs text-[var(--text-soft)]">
                                            Launch your personalized 90-day roadmap and start checking off wins.
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to={createPageUrl('FreedomCalculator')}
                                onClick={onClose}
                                className="group relative p-5 rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 hover:border-green-500 transition-all duration-300 hover:shadow-lg overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-green-500 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <DollarSign className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[var(--text-main)] mb-1">Define Freedom</h4>
                                        <p className="text-xs text-[var(--text-soft)]">
                                            Calculate your "Freedom Number" and set clear financial targets.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-purple-100 dark:border-purple-900/30">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                                        <Users className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm text-[var(--text-main)]">You Are Not Alone</h4>
                                        <p className="text-xs text-[var(--text-soft)]">Join 1,000+ entrepreneurs in our community</p>
                                    </div>
                                </div>
                                <a
                                    href="https://thebminds.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    <span>Join Community</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {user?.is_premium_trial_user && trialDaysRemaining > 0 && (
                            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-lg">
                                <Rocket className="w-4 h-4" />
                                <span>You have {trialDaysRemaining} days remaining in your premium trial</span>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 text-center">
                        <button
                            onClick={onClose}
                            className="text-sm text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors flex items-center justify-center gap-1 mx-auto group"
                        >
                            <span>I'll explore the dashboard on my own</span>
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}