import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight, LayoutDashboard } from 'lucide-react';

const FORM_SEQUENCE = [
  { id: 'define_your_why', title: 'Define Your WHY', page: 'StrategyFormDefineYourWhy' },
  { id: 'mission_vision', title: 'Mission & Vision', page: 'StrategyFormMissionVision' },
  { id: 'brand_identity', title: 'Brand Identity', page: 'StrategyFormBrandIdentity' },
  { id: 'ideal_client', title: 'Ideal Client', page: 'StrategyFormIdealClient' },
  { id: 'value_proposition', title: 'Value Proposition', page: 'StrategyFormValueProposition' },
  { id: 'value_ladder', title: 'Value Ladder', page: 'StrategyFormValueLadder' },
  { id: 'swot', title: 'SWOT Analysis', page: 'StrategyFormSWOTAnalysis' },
  { id: 'business_model', title: 'Business Plan', page: 'StrategyFormBusinessModelCanvas' },
  { id: 'financial_goal', title: 'Financial Goal', page: 'FreedomCalculator' },
  { id: 'customer_journey', title: 'Customer Journey', page: 'StrategyFormCustomerJourney' },
  { id: 'content_strategy', title: 'Content Strategy', page: 'StrategyFormContentStrategy' },
  { id: 'website_launch', title: 'Website Launch', page: 'StrategyFormWebsiteLaunch' },
  { id: 'email_marketing', title: 'Email Marketing', page: 'StrategyFormEmailMarketing' },
  { id: 'social_media_strategy', title: 'Social Media', page: 'StrategyFormSocialMedia' },
  { id: 'pricing_strategies', title: 'Pricing Strategies', page: 'StrategyFormPricingStrategies' },
  { id: 'community_building', title: 'Community Building', page: 'StrategyFormCommunityBuilding' },
  { id: 'affiliate_program', title: 'Affiliate Program', page: 'StrategyFormAffiliateProgram' },
  { id: 'strategic_partnerships', title: 'Strategic Partnerships', page: 'StrategyFormStrategicPartnerships' },
  { id: 'automation_systematization', title: 'Automation & Systems', page: 'StrategyFormAutomation' },
];

export default function FoundationFormNav({ currentFormId }) {
  const currentIndex = FORM_SEQUENCE.findIndex(f => f.id === currentFormId);
  const nextForm = currentIndex >= 0 && currentIndex < FORM_SEQUENCE.length - 1 ? FORM_SEQUENCE[currentIndex + 1] : null;
  const stepNumber = currentIndex + 1;
  const totalSteps = FORM_SEQUENCE.length;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-medium text-[var(--text-soft)] whitespace-nowrap">
          Step {stepNumber} of {totalSteps}
        </span>
        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--primary-gold)] rounded-full transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-[var(--primary-gold)] whitespace-nowrap">
          {Math.round((stepNumber / totalSteps) * 100)}%
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          to={createPageUrl('MyFoundationRoadmap')}
          className="btn btn-ghost flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Foundation Roadmap</span>
        </Link>

        <div className="flex items-center gap-3">
          {nextForm ? (
            <Link
              to={createPageUrl(nextForm.page)}
              className="btn btn-primary flex items-center gap-2 text-sm"
            >
              <span className="hidden sm:inline">Next:</span>
              <span>{nextForm.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to={createPageUrl('MyFoundationRoadmap')}
              className="btn btn-primary flex items-center gap-2 text-sm"
            >
              <span>Complete Foundation ✓</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}