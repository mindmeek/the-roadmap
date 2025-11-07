import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                                   window.navigator.standalone === true;
        setIsStandalone(isInStandaloneMode);

        // Check if iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(iOS);

        // Check if prompt was dismissed
        const promptDismissed = localStorage.getItem('pwaPromptDismissed');
        const dismissedDate = localStorage.getItem('pwaPromptDismissedDate');
        
        // Show again after 7 days
        const shouldShowAgain = !dismissedDate || 
                               (Date.now() - parseInt(dismissedDate)) > (7 * 24 * 60 * 60 * 1000);

        if (isInStandaloneMode) {
            return; // Already installed
        }

        if (iOS) {
            // iOS doesn't support beforeinstallprompt, show manual instructions
            if (!promptDismissed || shouldShowAgain) {
                // Show after 3 seconds delay on iOS
                setTimeout(() => {
                    setShowPrompt(true);
                }, 3000);
            }
        } else {
            // Listen for the beforeinstallprompt event
            const handleBeforeInstallPrompt = (e) => {
                e.preventDefault();
                setDeferredPrompt(e);
                
                if (!promptDismissed || shouldShowAgain) {
                    // Show after 3 seconds delay
                    setTimeout(() => {
                        setShowPrompt(true);
                    }, 3000);
                }
            };

            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

            return () => {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            };
        }
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt && !isIOS) return;

        if (isIOS) {
            // Can't trigger install programmatically on iOS
            // Just keep the instructions visible
            return;
        }

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }

        // Clear the deferredPrompt
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwaPromptDismissed', 'true');
        localStorage.setItem('pwaPromptDismissedDate', Date.now().toString());
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <>
            {/* Mobile Banner (Bottom) */}
            <div className="fixed bottom-16 left-0 right-0 z-[100] lg:hidden animate-in slide-in-from-bottom-5 duration-500">
                <div className="mx-3 mb-3 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white rounded-lg shadow-2xl border-2 border-white">
                    <div className="p-4">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 text-white/80 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-start gap-3 pr-6">
                            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                                <Smartphone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-base mb-1">
                                    Install Business Minds App
                                </h3>
                                <p className="text-sm text-white/90 mb-3">
                                    {isIOS 
                                        ? 'Add to your home screen for quick access and offline use!' 
                                        : 'Get the full app experience with offline access and faster loading!'}
                                </p>

                                {isIOS ? (
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-xs space-y-2">
                                        <p className="font-semibold">How to install:</p>
                                        <ol className="space-y-1 list-decimal list-inside">
                                            <li>Tap the <strong>Share</strong> button <svg className="inline w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/></svg></li>
                                            <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                                            <li>Tap <strong>"Add"</strong> in the top right</li>
                                        </ol>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleInstallClick}
                                        className="w-full bg-white text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Install Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Banner (Top) */}
            <div className="hidden lg:block fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-2xl px-4 animate-in slide-in-from-top-5 duration-500">
                <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white rounded-lg shadow-2xl border-2 border-white">
                    <div className="p-4 flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                            <Smartphone className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1">
                                Install Business Minds App
                            </h3>
                            <p className="text-sm text-white/90">
                                Get the full app experience with offline access and faster loading!
                            </p>
                        </div>
                        {!isIOS && deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className="bg-white text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
                            >
                                <Download className="w-5 h-5" />
                                Install
                            </button>
                        )}
                        <button
                            onClick={handleDismiss}
                            className="text-white/80 hover:text-white p-2"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}