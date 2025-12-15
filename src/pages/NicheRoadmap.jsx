import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, CheckCircle, Clock, Target, ChevronDown, ChevronUp, Award, Loader2, Lock, Sparkles, TrendingUp, Zap, Info } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { bookAuthorGrowthRoadmap } from '@/components/course_content/bookAuthorGrowth';
import { lifeCoachGrowthRoadmap } from '@/components/course_content/lifeCoachGrowth';
import { nonProfitGrowthRoadmap } from '@/components/course_content/nonProfitGrowth';
import { ecommerceGrowthRoadmap } from '@/components/course_content/ecommerceGrowth';
import { privateCommunityGrowthRoadmap } from '@/components/course_content/privateCommunityGrowth';
import { podcastGrowthRoadmap } from '@/components/course_content/podcastGrowth';
import { musicalArtistGrowthRoadmap } from '@/components/course_content/musicalArtistGrowth';

const programContentMap = {
  'book_author_growth': bookAuthorGrowthRoadmap,
  'life_coach_growth': lifeCoachGrowthRoadmap,
  'non_profit_growth': nonProfitGrowthRoadmap,
  'ecommerce_growth': ecommerceGrowthRoadmap,
  'private_community_growth': privateCommunityGrowthRoadmap,
  'podcast_growth': podcastGrowthRoadmap,
  'musical_artist_growth': musicalArtistGrowthRoadmap,
};

export default function NicheRoadmapPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programContent, setProgramContent] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);

        const urlParams = new URLSearchParams(window.location.search);
        const programKey = urlParams.get('program');
        
        if (programKey && programContentMap[programKey]) {
          setProgramContent(programContentMap[programKey]);
          
          // Load saved progress
          const savedCompleted = localStorage.getItem(`niche_${programKey}_completed`);
          if (savedCompleted) {
            setCompletedTasks(JSON.parse(savedCompleted));
          }
        } else {
          navigate(createPageUrl('NicheRoadmaps'));
        }
      } catch (e) {
        console.error('Error loading program:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleWeek = (weekNumber) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  const toggleTask = (weekNumber, taskIndex) => {
    const taskKey = `${weekNumber}-${taskIndex}`;
    const newCompleted = {
      ...completedTasks,
      [taskKey]: !completedTasks[taskKey]
    };
    setCompletedTasks(newCompleted);
    
    const urlParams = new URLSearchParams(window.location.search);
    const programKey = urlParams.get('program');
    localStorage.setItem(`niche_${programKey}_completed`, JSON.stringify(newCompleted));
  };

  const toggleTaskDetails = (weekNumber, taskIndex) => {
    const taskKey = `${weekNumber}-${taskIndex}`;
    setExpandedTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  if (!programContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <p className="text-[var(--text-soft)]">Program not found</p>
        </div>
      </div>
    );
  }

  const hasAccess = user && (user.role === 'admin' || user.subscription_level === 'business_hq');

  const totalTasks = programContent.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 md:p-8 mb-6">
        <button
          onClick={() => navigate(createPageUrl('NicheRoadmaps'))}
          className="btn btn-ghost mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Niche Roadmaps
        </button>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">{programContent.courseTitle}</h1>
          <p className="text-[var(--text-soft)] mb-4">{programContent.courseDescription}</p>
          
          {/* Success Metrics */}
          {programContent.successMetrics && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <p className="font-semibold text-[var(--text-main)] mb-3 text-sm">🎯 Success After 90 Days:</p>
              <div className="grid md:grid-cols-4 gap-3">
                {Object.entries(programContent.successMetrics).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[var(--text-main)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-main)]">Your Progress</span>
            <span className="text-sm text-[var(--text-soft)]">{completedCount}/{totalTasks} tasks ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-[var(--primary-gold)] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Access Gate */}
      {!hasAccess && (
        <div className="card p-8 mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)]">
          <div className="flex items-start gap-4">
            <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Upgrade to Access This Roadmap</h3>
              <p className="text-[var(--text-soft)] mb-4">
                This niche-specific roadmap is available exclusively to Business HQ members. Get unlimited access to all roadmaps, HQ tools, and step-by-step guidance.
              </p>
              <button
                onClick={() => navigate(createPageUrl('Upgrade'))}
                className="btn btn-primary"
              >
                Upgrade to The HQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Checklist */}
      {programContent.kpiChecklist && hasAccess && (
        <div className="card p-6 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Weekly KPI Checklist
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {programContent.kpiChecklist.map((kpi, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-[var(--text-main)]">{kpi.metric}</p>
                <p className="text-xs text-[var(--primary-gold)] font-semibold mt-1">Target: {kpi.target}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Roadmap */}
      <div className="space-y-4">
        {programContent.weeks.map((week) => {
          const Icon = week.icon;
          const isExpanded = expandedWeeks[week.weekNumber];
          const weekTasksCompleted = week.tasks.filter((task, idx) => 
            completedTasks[`${week.weekNumber}-${idx}`]
          ).length;

          return (
            <div key={week.weekNumber} className="card overflow-hidden">
              <button
                onClick={() => toggleWeek(week.weekNumber)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-[var(--primary-gold)]">Week {week.weekNumber}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-[var(--text-soft)]">
                          {weekTasksCompleted}/{week.tasks.length} tasks
                        </span>
                        {week.dailyTime && (
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {week.dailyTime}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-main)]">{week.weekTitle}</h3>
                      <p className="text-sm text-[var(--text-soft)] mt-1">{week.weekDescription}</p>
                      {week.weeklyGoal && (
                        <p className="text-xs text-[var(--primary-gold)] mt-2 font-medium">
                          🎯 Goal: {week.weeklyGoal}
                        </p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[var(--text-soft)]" /> : <ChevronDown className="w-5 h-5 text-[var(--text-soft)]" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                  {week.tasks.map((task, taskIndex) => {
                    const taskKey = `${week.weekNumber}-${taskIndex}`;
                    const isCompleted = completedTasks[taskKey];
                    const isTaskExpanded = expandedTasks[taskKey];

                    return (
                      <div
                        key={taskIndex}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isCompleted
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => hasAccess && toggleTask(week.weekNumber, taskIndex)}
                            className={`mt-1 flex-shrink-0 ${!hasAccess && 'cursor-not-allowed opacity-50'}`}
                            disabled={!hasAccess}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-[var(--primary-gold)]" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <h4 className={`font-bold text-[var(--text-main)] mb-2 ${isCompleted && 'line-through opacity-75'}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                              {task.description}
                            </p>

                            {/* Action */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 mb-3">
                              <p className="text-sm text-[var(--text-main)]">
                                <strong>Action:</strong> {task.action}
                              </p>
                            </div>

                            {/* HQ Tools */}
                            {task.hqTools && task.hqTools.length > 0 && (
                              <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-3 mb-3">
                                <p className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2">
                                  <Zap className="w-4 h-4" />
                                  HQ Tools to Use:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {task.hqTools.map((tool, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* KPI */}
                            {task.kpi && (
                              <div className="flex items-center gap-2 text-sm mb-3">
                                <Target className="w-4 h-4 text-[var(--primary-gold)]" />
                                <span className="text-[var(--text-soft)]">
                                  <strong>KPI:</strong> {task.kpi}
                                </span>
                              </div>
                            )}

                            {/* Deliverable */}
                            <div className="flex items-center gap-2 text-sm mb-3">
                              <Award className="w-4 h-4 text-green-600" />
                              <span className="text-[var(--text-soft)]">
                                <strong>Deliverable:</strong> {task.deliverable}
                              </span>
                            </div>

                            {/* Detailed Steps (Expandable) */}
                            {task.detailedSteps && task.detailedSteps.length > 0 && (
                              <div className="mt-3">
                                <button
                                  onClick={() => toggleTaskDetails(week.weekNumber, taskIndex)}
                                  className="flex items-center gap-2 text-sm font-semibold text-[var(--primary-gold)] hover:text-[var(--primary-gold)]/80 transition-colors"
                                >
                                  {isTaskExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  {isTaskExpanded ? 'Hide' : 'Show'} Detailed Step-by-Step
                                </button>
                                
                                {isTaskExpanded && (
                                  <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <ol className="space-y-2 list-decimal list-inside">
                                      {task.detailedSteps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-[var(--text-main)] pl-2">
                                          {step}
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Templates Section */}
      {programContent.templates && hasAccess && (
        <div className="card p-6 mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
          <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Copy-Paste Templates
          </h3>
          <div className="space-y-4">
            {programContent.templates.communityWelcome && (
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)] mb-2">Community Welcome Message:</p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-[var(--text-soft)] italic">{programContent.templates.communityWelcome}</p>
                </div>
              </div>
            )}
            
            {programContent.templates.emailSubjects && (
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)] mb-2">5-Email Welcome Sequence Subject Lines:</p>
                <ol className="list-decimal list-inside space-y-1 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  {programContent.templates.emailSubjects.map((subject, idx) => (
                    <li key={idx} className="text-sm text-[var(--text-soft)]">{subject}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {programContent.templates.affiliateInvite && (
              <div>
                <p className="text-sm font-semibold text-[var(--text-main)] mb-2">Affiliate/Street Team Invite:</p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-[var(--text-soft)] italic">{programContent.templates.affiliateInvite}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion Message */}
      {hasAccess && progressPercentage === 100 && (
        <div className="card p-8 mt-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 inline-block rounded-full mb-4">
            <Award className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Roadmap Complete! 🎉</h3>
          <p className="text-[var(--text-soft)] mb-4">
            Congratulations on completing this niche-specific 90-day roadmap! You've built the foundation for sustainable growth in your industry.
          </p>
          <button
            onClick={() => navigate(createPageUrl('NicheRoadmaps'))}
            className="btn btn-primary"
          >
            Explore More Niche Roadmaps
          </button>
        </div>
      )}
    </div>
  );
}