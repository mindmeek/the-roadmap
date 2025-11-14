import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { X, Target, Sparkles, Users, Zap, DollarSign, Route, Crown, TrendingUp } from 'lucide-react';

export default function WelcomePopup({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const isOnTrial = user?.is_premium_trial_user && user?.trial_status === 'active';
  const trialDaysRemaining = user?.trial_expires_on ? 
    Math.ceil((new Date(user.trial_expires_on) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  const handleClose = () => {
    localStorage.setItem('welcomePopupShown', 'true');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[200] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
            🎉 Welcome, {user?.first_name || 'Entrepreneur'}!
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Trial Status Banner */}
          {isOnTrial && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-500">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg text-[var(--text-main)]">🎉 You Have Full Premium Access!</h3>
              </div>
              <p className="text-sm text-[var(--text-soft)] mb-2 text-center">
                Your <strong>14-day premium trial</strong> is active. Explore everything The Business Minds has to offer!
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 font-semibold text-center">
                ⏰ {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
              </p>
            </div>
          )}

          {/* Next Step Question */}
          <div className="text-center">
            <h3 className="font-bold text-xl text-[var(--text-main)] mb-2">
              What's Your Next Logical Step?
            </h3>
            <p className="text-sm text-[var(--text-soft)] mb-4">
              Choose where you'd like to begin your journey:
            </p>
          </div>

          {/* Action Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to={createPageUrl('Journey')}
              onClick={handleClose}
              className="card p-5 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-[var(--primary-gold)] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm">Start Your 90-Day Plan</h4>
              <p className="text-xs text-[var(--text-soft)]">
                Follow your personalized roadmap
              </p>
            </Link>

            <a
              href="https://thebminds.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="card p-5 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm">Introduce Yourself</h4>
              <p className="text-xs text-[var(--text-soft)]">
                Connect in the community
              </p>
            </a>

            <Link
              to={createPageUrl('FreedomCalculator')}
              onClick={handleClose}
              className="card p-5 hover:border-[var(--primary-gold)] transition-all text-center group cursor-pointer"
            >
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm">Set Your Financial Goals</h4>
              <p className="text-xs text-[var(--text-soft)]">
                Calculate your freedom number
              </p>
            </Link>
          </div>

          {/* Community Introduction */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
            <h3 className="font-semibold text-[var(--text-main)] mb-2 text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              The Business Minds Community
            </h3>
            <p className="text-sm text-[var(--text-soft)] mb-3">
              Access our exclusive network with the same credentials you just created!
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--text-soft)]">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Network with entrepreneurs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Weekly Live Coaching (Tues & Thurs, 1:15-2:00 PM PST)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">✓</span>
                <span>Real-time support</span>
              </li>
            </ul>
          </div>

          {/* Upgrade CTA */}
          {!isOnTrial && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-[var(--primary-gold)]">
              <div className="flex items-start gap-3">
                <Crown className="w-6 h-6 text-[var(--primary-gold)] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--text-main)] mb-2">Unlock The HQ</h4>
                  <p className="text-sm text-[var(--text-soft)] mb-3">
                    Get unlimited journeys, all strategy tools, and AI access.
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
            className="text-[var(--text-soft)] hover:text-[var(--text-main)] text-sm w-full py-2"
          >
            I'll explore on my own
          </button>
        </div>
      </div>
    </div>
  );
}