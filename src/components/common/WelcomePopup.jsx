import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { X, Target, Sparkles, Layers, Users, Zap, ArrowRight, CheckCircle2, BookOpen, Repeat, Calendar, Crown, Smartphone, Apple } from 'lucide-react';

export default function WelcomePopup({ isOpen, onClose, user }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  if (!isOpen) return null;

  const isFreeUser = user?.subscription_level === 'free';
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /android/i.test(navigator.userAgent);

  const handleClose = () => {
    localStorage.setItem('welcomePopupShown', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[200] p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative transform transition-all animate-in fade-in-0 zoom-in-95 my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] mb-2">
              🎉 Welcome to The Business Minds, {user?.first_name || 'Entrepreneur'}!
            </h2>
            <p className="text-[var(--text-soft)] text-base sm:text-lg">
              You're officially part of a community of driven entrepreneurs committed to building successful, sustainable businesses.
            </p>
          </div>

          {/* Platform Goals */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 sm:p-6 mb-6 text-left border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold text-[var(--text-main)] mb-3 text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--primary-gold)]" />
              Your Platform Journey
            </h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Quick Start Foundation</h4>
                  <p className="text-xs text-[var(--text-soft)]">Complete essential setup: domain, email, and brand basics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm">90-Day Journey</h4>
                  <p className="text-xs text-[var(--text-soft)]">Follow your personalized roadmap to success</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Community</h4>
                  <p className="text-xs text-[var(--text-soft)]">Connect, learn, and grow with peers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Introduction */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 sm:p-6 mb-6 text-left border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold text-[var(--text-main)] mb-3 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Join The Community & Introduce Yourself!
            </h3>
            <p className="text-sm text-[var(--text-soft)] mb-4">
              You now have access to <strong>The Business Minds Community</strong> - an exclusive network of entrepreneurs. 
              Sign in with the same credentials you just created and introduce yourself to fellow members!
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-xs text-[var(--text-soft)] mb-2">
                <strong className="text-[var(--text-main)]">Your Community Benefits:</strong>
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--text-soft)]">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>Network with entrepreneurs at every stage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>Weekly Live Group Coaching (Tuesdays & Thursdays, 1:15-2:00 PM PST)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>Get real-time support and share your wins</span>
                </li>
              </ul>
            </div>
            <a
              href="https://app.thebminds.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Access Community Now
            </a>
          </div>

          {/* Your Membership Benefits */}
          {isFreeUser && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-700 text-left">
              <h3 className="font-semibold text-[var(--text-main)] mb-2 flex items-center justify-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Your Free Membership Includes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs sm:text-sm">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">Foundation Tools</p>
                    <p className="text-xs text-[var(--text-soft)]">5 strategic documents forever</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">ONE 90-Day Journey</p>
                    <p className="text-xs text-[var(--text-soft)]">Plus one goal change</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Repeat className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">Unlimited Restarts</p>
                    <p className="text-xs text-[var(--text-soft)]">Repeat your journey anytime</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile App Download Buttons */}
          {isMobile && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-4 sm:p-6 mb-6 border border-green-200 dark:border-green-700">
              <h3 className="font-semibold text-[var(--text-main)] mb-3 text-lg flex items-center justify-center gap-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                Download Our Mobile App
              </h3>
              <p className="text-sm text-[var(--text-soft)] mb-4 text-center">
                Get the full experience on your mobile device. Download the app for easy access on the go!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isIOS && (
                  <a
                    href="https://apps.apple.com/app/your-app-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-black text-white hover:bg-gray-800 w-full justify-center text-sm"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Download for iOS
                  </a>
                )}
                {isAndroid && (
                  <a
                    href="https://play.google.com/store/apps/details?id=your.app.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-green-600 text-white hover:bg-green-700 w-full justify-center text-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Download for Android
                  </a>
                )}
              </div>
              <p className="text-xs text-[var(--text-soft)] mt-3 text-center">
                Or continue using the web version - it works great on all devices!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to={createPageUrl('QuickStartFoundation')}
                onClick={handleClose}
                className="btn btn-primary w-full text-sm sm:text-base py-3 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Start with Quick Wins
              </Link>
              <Link
                to={createPageUrl('Journey')}
                onClick={handleClose}
                className="btn btn-secondary w-full text-sm sm:text-base py-3 flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                My 90-Day Journey
              </Link>
            </div>

            {user?.subscription_level === 'free' && (
              <Link
                to={createPageUrl('StrategySession')}
                onClick={handleClose}
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 w-full text-sm sm:text-base py-3 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Schedule Free Strategy Session
              </Link>
            )}

            {isFreeUser && (
              <Link
                to={createPageUrl('Upgrade')}
                onClick={handleClose}
                className="btn bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white hover:from-yellow-600 hover:to-[var(--primary-gold)] w-full text-sm sm:text-base py-3 flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                Unlock Full Access with The HQ
              </Link>
            )}

            <button
              onClick={handleClose}
              className="text-[var(--text-soft)] hover:text-[var(--text-main)] text-sm w-full py-2"
            >
              I'll explore on my own
            </button>
          </div>

          {/* The HQ Information */}
          {isFreeUser && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-left">
              <h4 className="font-semibold text-[var(--text-main)] mb-2 text-base flex items-center gap-2">
                <Crown className="w-5 h-5 text-[var(--primary-gold)]" />
                Want More? Upgrade to The Business Minds HQ
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-3">
                Get unlimited access to all journeys, advanced strategy tools, priority support, and exclusive training content.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-[var(--text-soft)]">Unlimited Journeys</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-[var(--text-soft)]">All Strategy Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-[var(--text-soft)]">Unlimited AI Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-[var(--text-soft)]">HQ Training Content</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}