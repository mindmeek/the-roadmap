import React, { useState, useEffect } from 'react';
import { Calendar, Users, BookOpen, CheckCircle, Circle, ExternalLink, ChevronDown, ChevronUp, Target, Rocket, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const STORAGE_KEY = 'member_action_checklist';

const entrepreneurshipLevels = [
  {
    name: 'Vision Stage',
    description: 'Building Your Foundation',
    goal: 'Clarify your business idea and create a strategic foundation',
    details: 'This is where you clarify your business idea, define your mission and vision, understand your ideal client, and create the strategic foundation for everything that follows.',
    keyActivities: [
      'Define your mission, vision, and core values',
      'Identify your ideal customer and their pain points',
      'Create your unique value proposition',
      'Develop your brand identity and positioning'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    foundationLink: 'Vision'
  },
  {
    name: 'Startup Stage',
    description: 'Launching & Validating',
    goal: 'Launch your MVP and acquire your first customers',
    details: 'Now you bring your vision to life. Launch your MVP, acquire your first customers, validate your business model, build your marketing systems, and establish your online presence.',
    keyActivities: [
      'Launch your Minimum Viable Product (MVP)',
      'Build your website and online presence',
      'Create marketing and sales systems',
      'Acquire and validate with early customers'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    foundationLink: 'Startup'
  },
  {
    name: 'Growth Stage',
    description: 'Scaling & Systemizing',
    goal: 'Build systems and scale your proven business model',
    details: 'You\'ve proven your business works—now it\'s time to scale. Build systems and automation, hire and delegate, optimize your marketing funnel, and create multiple revenue streams.',
    keyActivities: [
      'Implement automation and systemize operations',
      'Build and manage your team effectively',
      'Optimize your sales funnel and increase LTV',
      'Diversify revenue streams and expand market reach'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    foundationLink: 'Growth'
  }
];

export default function MemberActionChecklist() {
  const [checkedItems, setCheckedItems] = useState({
    strategy_session: false,
    community_intro: false,
    understand_levels: false
  });
  const [expandedLevels, setExpandedLevels] = useState({});
  const [showLevels, setShowLevels] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key) => {
    const newChecked = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(newChecked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked));
  };

  const toggleLevel = (index) => {
    setExpandedLevels(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleShowLevels = () => {
    setShowLevels(!showLevels);
    if (!showLevels && !checkedItems.understand_levels) {
      handleToggle('understand_levels');
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strategy Session */}
        <div className="card p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 border-b-[3px] border-b-blue-600" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <button
              onClick={() => handleToggle('strategy_session')}
              className="mt-1 hover:scale-110 transition-transform"
            >
              {checkedItems.strategy_session ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
          </div>
          <h3 className="font-bold text-[var(--text-main)] mb-2">
            Schedule Your Strategy Session
          </h3>
          <p className="text-sm text-[var(--text-soft)] mb-4">
            Book your complimentary 1-on-1 strategy consultation to get personalized guidance.
          </p>
          <Link
            to={createPageUrl('StrategySession')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group"
          >
            Book Now <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Community */}
        <div className="card p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 border-b-[3px] border-b-purple-600" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <button
              onClick={() => handleToggle('community_intro')}
              className="mt-1 hover:scale-110 transition-transform"
            >
              {checkedItems.community_intro ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
          </div>
          <h3 className="font-bold text-[var(--text-main)] mb-2">
            You're in the Community! 🎉
          </h3>
          <p className="text-sm text-[var(--text-soft)] mb-4">
            Login to ask questions about your journey and connect with fellow entrepreneurs.
          </p>
          <a
            href="https://thebminds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center group"
          >
            Login to Community <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Understanding Levels */}
        <div className="card p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 border-b-[3px] border-b-green-600" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-green-100 dark:bg-green-900 p-2.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <button
              onClick={() => handleToggle('understand_levels')}
              className="mt-1 hover:scale-110 transition-transform"
            >
              {checkedItems.understand_levels ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
          </div>
          <h3 className="font-bold text-[var(--text-main)] mb-2">
            Understand the 3 Levels
          </h3>
          <p className="text-sm text-[var(--text-soft)] mb-4">
            Learn about the Vision, Startup, and Growth stages of entrepreneurship.
          </p>
          <button
            onClick={toggleShowLevels}
            className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center group"
          >
            {showLevels ? 'Hide Details' : 'Learn More'} <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showLevels ? 'rotate-180' : ''} group-hover:translate-y-0.5`} />
          </button>
        </div>
      </div>

      {/* Expandable Levels Details */}
      {showLevels && (
        <div className="card p-6 animate-fadeIn" style={{ borderRadius: '2px' }}>
          <h3 className="text-xl font-bold text-[var(--text-main)] mb-5 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[var(--primary-gold)]" />
            The 3 Levels of Entrepreneurship
          </h3>
          <div className="space-y-4">
            {entrepreneurshipLevels.map((level, index) => (
              <div
                key={index}
                className={`p-5 ${level.bgColor} border-l-4 ${level.borderColor} rounded-lg transition-all duration-300 hover:shadow-md`}
              >
                <button
                  onClick={() => toggleLevel(index)}
                  className="w-full flex items-center justify-between mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${level.bgColor} border-2 ${level.borderColor} flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${level.color}`}>{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-bold text-base ${level.color}`}>{level.name}</h4>
                      <p className="text-xs text-[var(--text-soft)]">{level.description}</p>
                    </div>
                  </div>
                  {expandedLevels[index] ? (
                    <ChevronUp className={`w-5 h-5 ${level.color} transition-transform`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${level.color} transition-transform`} />
                  )}
                </button>
                
                {expandedLevels[index] && (
                  <div className="mt-4 pl-13 space-y-4 animate-fadeIn">
                    {/* Goal */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className={`w-4 h-4 ${level.color}`} />
                        <h5 className="font-semibold text-[var(--text-main)]">Stage Goal:</h5>
                      </div>
                      <p className="text-sm text-[var(--text-main)] pl-6">
                        {level.goal}
                      </p>
                    </div>

                    {/* Details */}
                    <p className="text-sm text-[var(--text-main)] leading-relaxed pl-6">
                      {level.details}
                    </p>

                    {/* Key Activities */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className={`w-4 h-4 ${level.color}`} />
                        <h5 className="font-semibold text-[var(--text-main)]">Key Activities:</h5>
                      </div>
                      <ul className="space-y-2 pl-6">
                        {level.keyActivities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-soft)]">
                            <span className={`${level.color} font-bold flex-shrink-0`}>✓</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Foundation Link */}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                      <Link
                        to={createPageUrl('MyFoundationRoadmap')}
                        className={`text-sm ${level.color} hover:underline font-medium flex items-center group`}
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        Explore {level.name} Tools in Foundation Roadmap
                        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}