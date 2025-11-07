import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Sparkles, Edit, BarChart3, MessageSquare, Mail, Brain, Camera, ArrowRight } from 'lucide-react';

const aiModules = [
  {
    id: 'sales_copy',
    title: 'Sales Copywriter',
    description: 'Generate compelling sales copy, product descriptions, and ad creatives that convert.',
    icon: Edit,
    url: createPageUrl('FocusedAIChat') + '?module=sales_copy',
  },
  {
    id: 'strategy_advisor',
    title: 'Strategy Advisor',
    description: 'Brainstorm business models, analyze market trends, and create strategic plans.',
    icon: Brain,
    url: createPageUrl('FocusedAIChat') + '?module=strategy_advisor',
  },
  {
    id: 'content_creator',
    title: 'Content Creator',
    description: 'Generate blog post ideas, social media captions, and video scripts to engage your audience.',
    icon: Camera,
    url: createPageUrl('FocusedAIChat') + '?module=content_creator',
  },
  {
    id: 'email_marketer',
    title: 'Email Marketer',
    description: 'Craft effective email subject lines, newsletters, and automated sequences.',
    icon: Mail,
    url: createPageUrl('FocusedAIChat') + '?module=email_marketer',
  },
  {
    id: 'support_pro',
    title: 'Customer Support Pro',
    description: 'Draft professional and empathetic customer service replies and FAQs.',
    icon: MessageSquare,
    url: createPageUrl('FocusedAIChat') + '?module=support_pro',
  },
  {
    id: 'financial_forecaster',
    title: 'Financial Forecaster',
    description: 'Get help creating simple financial projections and budget plans for your business.',
    icon: BarChart3,
    url: createPageUrl('FocusedAIChat') + '?module=financial_forecaster',
  },
];

export default function ElyzetAIModulesPage() {
  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="card p-6 md:p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-md">
              <Sparkles className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-3xl">Elyzet AI Business Assistants</h1>
              <p className="text-[var(--text-soft)] text-lg">Specialized AI tools to help you stay focused and accelerate your growth.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.id}
                to={module.url}
                className="card p-6 flex flex-col group hover:border-[var(--primary-gold)] hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md group-hover:bg-[var(--primary-gold)] transition-colors">
                    <Icon className="w-6 h-6 text-[var(--primary-gold)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--primary-gold)] transition-colors">
                    {module.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--text-soft)] flex-grow mb-4">{module.description}</p>
                <div className="flex items-center justify-end text-sm font-medium text-[var(--primary-gold)] group-hover:underline">
                    <span>Start Session</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}