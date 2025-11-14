import React, { useState, useEffect } from 'react';
import { Calendar, Users, BookOpen, CheckCircle, Circle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const STORAGE_KEY = 'member_action_checklist';

const entrepreneurshipLevels = [
  {
    name: 'Vision Stage',
    description: 'Building Your Foundation',
    details: 'This is where you clarify your business idea, define your mission and vision, understand your ideal client, and create the strategic foundation for everything that follows. You\'ll develop your brand identity, value proposition, and core business model.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700'
  },
  {
    name: 'Startup Stage',
    description: 'Launching & Validating',
    details: 'Now you bring your vision to life. Launch your MVP, acquire your first customers, validate your business model, build your marketing systems, and establish your online presence. This stage is about testing assumptions and proving your concept works.',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700'
  },
  {
    name: 'Growth Stage',
    description: 'Scaling & Systemizing',
    details: 'You\'ve proven your business works—now it\'s time to scale. Build systems and automation, hire and delegate, optimize your marketing funnel, increase customer lifetime value, and create multiple revenue streams. This stage is about working ON your business, not IN it.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700'
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
        <div className="card p-5 hover:shadow-lg transition-all" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <button
              onClick={() => handleToggle('strategy_session')}
              className="mt-1"
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
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            Book Now <ExternalLink className="w-3 h-3 ml-1" />
          </Link>
        </div>

        {/* Community */}
        <div className="card p-5 hover:shadow-lg transition-all" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <button
              onClick={() => handleToggle('community_intro')}
              className="mt-1"
            >
              {checkedItems.community_intro ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
          </div>
          <h3 className="font-bold text-[var(--text-main)] mb-2">
            Join The Community
          </h3>
          <p className="text-sm text-[var(--text-soft)] mb-4">
            Connect with fellow entrepreneurs and introduce yourself to the community.
          </p>
          <a
            href="https://thebminds.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            Access Community <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>

        {/* Understanding Levels */}
        <div className="card p-5 hover:shadow-lg transition-all" style={{ borderRadius: '2px' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-green-100 dark:bg-green-900 p-2.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <button
              onClick={() => handleToggle('understand_levels')}
              className="mt-1"
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
            className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            {showLevels ? 'Hide Details' : 'Learn More'} <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showLevels ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Levels Details */}
      {showLevels && (
        <div className="card p-6" style={{ borderRadius: '2px' }}>
          <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">
            The 3 Levels of Entrepreneurship
          </h3>
          <div className="space-y-3">
            {entrepreneurshipLevels.map((level, index) => (
              <div
                key={index}
                className={`p-4 ${level.bgColor} border ${level.borderColor} rounded-lg`}
              >
                <button
                  onClick={() => toggleLevel(index)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${level.bgColor} border-2 ${level.borderColor} flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${level.color}`}>{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h4 className={`font-bold ${level.color}`}>{level.name}</h4>
                      <p className="text-xs text-[var(--text-soft)]">{level.description}</p>
                    </div>
                  </div>
                  {expandedLevels[index] ? (
                    <ChevronUp className={`w-5 h-5 ${level.color}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${level.color}`} />
                  )}
                </button>
                
                {expandedLevels[index] && (
                  <div className="mt-3 pl-11">
                    <p className="text-sm text-[var(--text-main)] leading-relaxed">
                      {level.details}
                    </p>
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