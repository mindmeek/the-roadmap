import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { X, Target, Sparkles, Users, Zap, ArrowRight, BookOpen, CheckCircle2, Calendar, Crown, Smartphone, Apple, TrendingUp } from 'lucide-react';

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

  const isOnTrial = user?.is_premium_trial_user && user?.trial_status === 'active';
  const trialDaysRemaining = user?.trial_expires_on ? 
    Math.ceil((new Date(user.trial_expires_on) - new Date()) / (1000 * 60 * 60 * 24)) : 0;
  
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

          {/* Trial Status Banner */}
          {isOnTrial && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-6 border-2 border-green-500">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg text-[var(--text-main)]">🎉 You Have Full Premium Access!</h3>
              </div>
              <p className="text-sm text-[var(--text-soft)] mb-2">
                Your <strong>14-day premium trial</strong> is active. Explore everything The Business Minds has to offer!
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                ⏰ {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
              </p>
            </div>
          )}

          {/* Next Step Question */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6 text-center border border-blue-200 dark:border-blue-700">
            <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">
              What's Your Next Logical Step?
            </h3>
            <p className="text-sm text-[var(--text-soft)] mb-4">
              Choose where you'd like to begin your entrepreneurial journey:
            </p>
          </div>

          {/* Action Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Option 1: Start 90-Day Plan */}
            <Link
              to={createPageUrl('Journey')}
              onClick={handleClose}
              className="card p-6 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-[var(--primary-gold)] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2">Start Your 90-Day Plan</h4>
              <p className="text-sm text-[var(--text-soft)]">
                Follow your personalized roadmap to business success
              </p>
            </Link>

            {/* Option 2: Introduce Yourself */}
            <a
              href="https://thebminds.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="card p-6 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2">Introduce Yourself</h4>
              <p className="text-sm text-[var(--text-soft)]">
                Connect with fellow entrepreneurs in the community
              </p>
            </a>

            {/* Option 3: Do Quick Wins */}
            <Link
              to={createPageUrl('QuickStartFoundation')}
              onClick={handleClose}
              className="card p-6 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-green-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2">Do Your Quick Wins</h4>
              <p className="text-sm text-[var(--text-soft)]">
                Get your essentials set up fast: domain, email, brand
              </p>
            </Link>
          </div>

          {/* Community Introduction */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 sm:p-6 mb-6 text-left border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold text-[var(--text-main)] mb-3 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              The Business Minds Community
            </h3>
            <p className="text-sm text-[var(--text-soft)] mb-4">
              You now have access to <strong>The Business Minds Community</strong> - an exclusive network of entrepreneurs. 
              Sign in with the same credentials you just created!
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
          </div>

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
            </div>
          )}

          {/* Upgrade to HQ CTA */}
          {!isOnTrial && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 mb-4 border border-[var(--primary-gold)]">
              <div className="flex items-start gap-3">
                <Crown className="w-6 h-6 text-[var(--primary-gold)] flex-shrink-0 mt-1" />
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-[var(--text-main)] mb-2">Unlock The Business Minds HQ</h4>
                  <p className="text-sm text-[var(--text-soft)] mb-3">
                    Get unlimited journeys, all strategy tools, AI access, and exclusive training content.
                  </p>
                  <a
                    href="https://TheBusinessMinds.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-sm inline-flex items-center"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to The HQ
                  </a>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleClose}
            className="text-[var(--text-soft)] hover:text-[var(--text-main)] text-sm w-full py-2 mt-4"
          >
            I'll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}