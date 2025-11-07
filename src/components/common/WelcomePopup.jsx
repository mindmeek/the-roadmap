import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { X, Target, Sparkles, Layers, Users, Zap, ArrowRight, CheckCircle2, BookOpen, Repeat } from 'lucide-react';

export default function WelcomePopup({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const isFreeUser = user?.subscription_level === 'free';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full p-8 relative transform transition-all animate-in fade-in-0 zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2">
              Welcome to The Business Minds, {user?.first_name || 'Entrepreneur'}!
            </h2>
            <p className="text-[var(--text-soft)] text-lg">
              You're officially part of a community of driven entrepreneurs committed to building successful, sustainable businesses.
            </p>
          </div>

          {isFreeUser && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-700">
              <h3 className="font-semibold text-[var(--text-main)] mb-2 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Your Free Membership Includes:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left text-sm">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text-main)]">Vision Stage Tools</p>
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

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-[var(--text-main)] mb-3 text-lg">Here's what happens next:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1">Quick Start Foundation</h4>
                  <p className="text-sm text-[var(--text-soft)]">Complete essential setup steps like domain, email, and brand basics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1">Your 90-Day Journey</h4>
                  <p className="text-sm text-[var(--text-soft)]">Follow your personalized roadmap based on your stage and goals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1">Connect with Peers</h4>
                  <p className="text-sm text-[var(--text-soft)]">Join The Community to share wins, ask questions, and network</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary-gold)] rounded-full p-2 flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-main)] mb-1">AI-Powered Support</h4>
                  <p className="text-sm text-[var(--text-soft)]">Get instant help from Elyzet AI whenever you need guidance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              to={createPageUrl('QuickStartFoundation')}
              onClick={onClose}
              className="btn btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start with Quick Wins
            </Link>
            <Link
              to={createPageUrl('Journey')}
              onClick={onClose}
              className="btn btn-secondary w-full text-lg py-3 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Jump to My 90-Day Journey
            </Link>
            <button
              onClick={onClose}
              className="text-[var(--text-soft)] hover:text-[var(--text-main)] text-sm w-full py-2"
            >
              I'll explore on my own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}