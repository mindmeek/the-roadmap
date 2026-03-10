import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeVideoPopup({ isOpen, onClose, vimeoVideoId = "76979871" }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-black border-b border-gray-800">
                        <div>
                            <h2 className="text-white font-bold text-lg">Welcome to The Business Minds HQ! 🎉</h2>
                            <p className="text-gray-400 text-sm">Watch this quick overview to get started</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Vimeo Embed */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&title=0&byline=0&portrait=0`}
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Welcome to The Business Minds HQ"
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-black flex justify-end">
                        <button
                            onClick={onClose}
                            className="btn btn-primary text-sm"
                        >
                            Let's Get Started →
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}