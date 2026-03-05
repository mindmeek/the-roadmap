import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, Zap } from 'lucide-react';

/**
 * XPToast - A floating toast that appears when the user earns XP or unlocks a badge.
 *
 * Usage:
 *   import { showXPToast } from '@/components/common/XPToast';
 *   showXPToast({ xp: 10, message: 'Task completed!' });
 *   showXPToast({ xp: 50, badge: 'First Strategy Doc', message: 'Achievement unlocked!' });
 */

let _setToasts = null;

export function showXPToast({ xp = 0, badge = null, message = '' }) {
    if (_setToasts) {
        const id = Date.now();
        _setToasts(prev => [...prev, { id, xp, badge, message }]);
        setTimeout(() => {
            _setToasts(prev => prev.filter(t => t.id !== id));
        }, 3500);
    }
}

export default function XPToastProvider() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        _setToasts = setToasts;
        return () => { _setToasts = null; };
    }, []);

    return (
        <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[200] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map(toast => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-white min-w-[220px] ${
                            toast.badge
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400'
                        }`}
                    >
                        <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                            {toast.badge ? (
                                <Trophy className="w-5 h-5 text-white" />
                            ) : (
                                <Zap className="w-5 h-5 text-white" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            {toast.badge && (
                                <p className="text-xs font-bold uppercase tracking-wide text-white/80">Achievement Unlocked!</p>
                            )}
                            <p className="font-semibold text-sm leading-tight">{toast.badge || toast.message}</p>
                            {toast.xp > 0 && (
                                <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                                    <Star className="w-3 h-3" />
                                    +{toast.xp} XP
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}