import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Brain, Lightbulb, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

const mindsetHacks = [
  { id: "growth-mindset", title: "Growth vs Fixed Mindset", category: "Mindset" },
  { id: "decision-fatigue", title: "Overcoming Decision Fatigue", category: "Mental Performance" },
  { id: "power-of-no", title: "The Power of Saying No", category: "Boundaries" },
  { id: "three-ps", title: "The Three P's of Time Management", category: "Productivity" },
  { id: "8020-rule", title: "The 80/20 Rule (Pareto Principle)", category: "Productivity" },
  { id: "flow-state", title: "Achieving Flow State", category: "Performance" },
  { id: "two-minute-rule", title: "The Two-Minute Rule", category: "Productivity" },
  { id: "compound-effect", title: "The Compound Effect in Business", category: "Growth" }
];

const quickLessons = [
  { id: "domain-name", title: "How to Choose the Right Domain Name", category: "Branding" },
  { id: "morning-routine", title: "The Entrepreneur's Morning Routine", category: "Productivity" },
  { id: "customer-research", title: "5-Minute Customer Research", category: "Market Research" },
  { id: "pricing-psychology", title: "Pricing Psychology Essentials", category: "Sales" },
  { id: "social-proof", title: "Building Social Proof Fast", category: "Marketing" },
  { id: "productivity-hacks", title: "10 Productivity Hacks for Entrepreneurs", category: "Productivity" }
];

const guides = [
  { id: "1", title: "The Complete Guide to Business Planning", category: "Strategy" },
  { id: "2", title: "Marketing Fundamentals for Entrepreneurs", category: "Marketing" },
  { id: "3", title: "Building Your Brand Identity", category: "Branding" },
  { id: "4", title: "Customer Acquisition Strategies", category: "Growth" },
  { id: "5", title: "Financial Planning for Startups", category: "Finance" }
];

export default function DailyInsightTabs() {
  const [activeTab, setActiveTab] = useState('mindset');
  const [randomMindset, setRandomMindset] = useState(null);
  const [randomLesson, setRandomLesson] = useState(null);
  const [randomGuide, setRandomGuide] = useState(null);

  useEffect(() => {
    // Get random items for each category
    setRandomMindset(mindsetHacks[Math.floor(Math.random() * mindsetHacks.length)]);
    setRandomLesson(quickLessons[Math.floor(Math.random() * quickLessons.length)]);
    setRandomGuide(guides[Math.floor(Math.random() * guides.length)]);
  }, []);

  const tabs = [
    { id: 'mindset', label: 'Daily Mindset', icon: Brain },
    { id: 'lesson', label: 'Quick Lesson', icon: Lightbulb },
    { id: 'guide', label: 'Featured Guide', icon: BookOpen }
  ];

  const getActiveContent = () => {
    if (activeTab === 'mindset' && randomMindset) {
      return {
        title: randomMindset.title,
        category: randomMindset.category,
        link: createPageUrl('MindsetHack') + `?hack=${randomMindset.id}`,
        icon: Brain,
        color: 'from-purple-500 to-purple-600'
      };
    } else if (activeTab === 'lesson' && randomLesson) {
      return {
        title: randomLesson.title,
        category: randomLesson.category,
        link: createPageUrl('QuickLesson') + `?lesson=${randomLesson.id}`,
        icon: Lightbulb,
        color: 'from-yellow-500 to-yellow-600'
      };
    } else if (activeTab === 'guide' && randomGuide) {
      return {
        title: randomGuide.title,
        category: randomGuide.category,
        link: createPageUrl('Guides'),
        icon: BookOpen,
        color: 'from-blue-500 to-blue-600'
      };
    }
    return null;
  };

  const content = getActiveContent();

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
        <h3 className="text-lg font-bold text-[var(--text-main)]">Daily Insights</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-[var(--primary-gold)] text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-[var(--text-soft)] hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {content && (
        <Link to={content.link} className="block group">
          <div className={`bg-gradient-to-r ${content.color} text-white p-4 rounded-lg hover:shadow-lg transition-all`}>
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                <content.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wide opacity-90 mb-1">
                  {content.category}
                </div>
                <h4 className="font-bold text-base mb-2 line-clamp-2 group-hover:underline">
                  {content.title}
                </h4>
                <div className="flex items-center text-sm opacity-90">
                  <span>Explore this insight</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}