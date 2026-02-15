import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, CheckCircle, Clock, Target, ChevronDown, ChevronUp, Award, Loader2, Lock, Sparkles, TrendingUp, Zap, Info, ExternalLink, FileText, Edit, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { StrategyDocument } from '@/entities/all';
import StrategyFormModal from '@/components/strategy/StrategyFormModal';
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

// Tool mapping for quick access to interactive forms
const getToolLinks = (hqTools) => {
  const toolMap = {
    'HQ Strategy Tool: Ideal Client Profile': { label: 'Ideal Client Profile', page: 'StrategyFormIdealClient' },
    'HQ Strategy Tool: Value Ladder': { label: 'Value Ladder', page: 'StrategyFormValueLadder' },
    'HQ Strategy Tool: Brand Identity': { label: 'Brand Identity', page: 'StrategyFormBrandIdentity' },
    'HQ Strategy Tools': { label: 'Strategy Tools', page: 'MyFoundationRoadmap' },
    'HQ AI Tools': { label: 'AI Assistants', page: 'ElyzetAIAssistants' },
    'Brand Kit': { label: 'Brand Kit', page: 'BrandKit' },
    'HQ Forms': { label: 'Forms', page: 'MyFoundationRoadmap' },
    'HQ Community': { label: 'Community', page: 'TheCommunity' },
    'HQ Community Hub': { label: 'Community', page: 'TheCommunity' },
  };

  const links = [];
  const addedPages = new Set();
  
  hqTools.forEach(tool => {
    const match = toolMap[tool];
    if (match && !addedPages.has(match.page)) {
      links.push(match);
      addedPages.add(match.page);
    }
  });
  
  return links;
};

export default function NicheRoadmapPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programContent, setProgramContent] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});
  const [idealClientData, setIdealClientData] = useState(null);
  const [activeFormModal, setActiveFormModal] = useState(null);
  const [programKey, setProgramKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);

        const urlParams = new URLSearchParams(window.location.search);
        const programKey = urlParams.get('program');
        setProgramKey(programKey);
        
        if (programKey && programContentMap[programKey]) {
          setProgramContent(programContentMap[programKey]);
          
          // Load saved progress
          const savedCompleted = localStorage.getItem(`niche_${programKey}_completed`);
          if (savedCompleted) {
            try {
              setCompletedTasks(JSON.parse(savedCompleted));
            } catch (parseError) {
              console.error('Error parsing saved progress:', parseError);
              localStorage.removeItem(`niche_${programKey}_completed`);
            }
          }

          // Load ideal client data
          try {
            const idealClientDocs = await StrategyDocument.filter({
              created_by: userData.email,
              document_type: 'ideal_client'
            });

            if (idealClientDocs && idealClientDocs.length > 0) {
              setIdealClientData(idealClientDocs[0].content);
            }
          } catch (strategyError) {
            console.error('Error loading ideal client data:', strategyError);
            // Continue without ideal client data
          }
        } else {
          console.log('Program key not found or invalid:', programKey);
          navigate(createPageUrl('NicheRoadmaps'));
        }
      } catch (e) {
        console.error('Error loading program:', e);
        navigate(createPageUrl('NicheRoadmaps'));
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
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(createPageUrl('NicheRoadmaps'))}
            className="btn btn-ghost"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Niche Roadmaps
          </button>
          <Link
            to={createPageUrl('NicheRoadmapOverview') + `?program=${new URLSearchParams(window.location.search).get('program')}`}
            className="btn btn-secondary text-sm"
          >
            <Target className="w-4 h-4 mr-2" />
            View Overview
          </Link>
        </div>

        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">{programContent.courseTitle}</h1>
          <p className="text-sm sm:text-base text-[var(--text-soft)] mb-4">{programContent.courseDescription}</p>
          
          {/* Success Metrics */}
          {programContent.successMetrics && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-700">
              <p className="font-semibold text-[var(--text-main)] mb-2 sm:mb-3 text-xs sm:text-sm">🎯 Success After 90 Days:</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
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

        {/* Ideal Client Summary */}
        {idealClientData && (
          <div className="mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <h3 className="font-bold text-sm text-[var(--text-main)] mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Your Ideal Client
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {idealClientData.client_avatar_name && (
                <span className="text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-full">
                  👤 {idealClientData.client_avatar_name}
                </span>
              )}
              {idealClientData.age_range && (
                <span className="text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-full">
                  {idealClientData.age_range}
                </span>
              )}
              {idealClientData.occupation && (
                <span className="text-xs px-2 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-full">
                  {idealClientData.occupation}
                </span>
              )}
            </div>
            {idealClientData.pain_points && idealClientData.pain_points.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-medium text-[var(--text-main)] mb-1">Top Pain Points:</p>
                <div className="flex flex-wrap gap-1">
                  {idealClientData.pain_points.slice(0, 3).map((pain, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                      {pain}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-[var(--text-soft)] mt-2">
              💡 Keep your ideal client in mind as you work through each task
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-3 sm:mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-[var(--text-main)]">Your Progress</span>
            <span className="text-xs sm:text-sm text-[var(--text-soft)]">{completedCount}/{totalTasks} tasks ({progressPercentage}%)</span>
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
        <div className="card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)]">
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
        <div className="card p-4 sm:p-6 mb-4 sm:mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-[var(--text-main)] mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            Weekly KPI Checklist
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
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
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-6">
                  {/* Quick Access Strategy Forms for First 4 Weeks */}
                  {week.weekNumber <= 4 && hasAccess && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Strategic Forms for Week {week.weekNumber}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {week.weekNumber === 1 && (
                          <>
                            <button
                              onClick={() => setActiveFormModal('ideal_client')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Ideal Client Profile
                            </button>
                            <button
                              onClick={() => setActiveFormModal('content_strategy')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Content Strategy
                            </button>
                          </>
                        )}
                        {week.weekNumber === 2 && (
                          <>
                            <button
                              onClick={() => setActiveFormModal('social_media')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Social Media Strategy
                            </button>
                            <button
                              onClick={() => setActiveFormModal('email_marketing')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Email Marketing
                            </button>
                          </>
                        )}
                        {week.weekNumber === 3 && (
                          <>
                            <button
                              onClick={() => setActiveFormModal('pricing_strategy')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Pricing Strategy
                            </button>
                          </>
                        )}
                        {week.weekNumber === 4 && (
                          <>
                            <button
                              onClick={() => setActiveFormModal('customer_journey')}
                              className="btn btn-sm bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Customer Journey Map
                            </button>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        💡 Fill out these forms directly here without leaving your roadmap
                      </p>
                    </div>
                  )}

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
                                  <div className="mt-4 space-y-4">
                                    {task.detailedSteps.map((step, idx) => (
                                      <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-5 rounded-lg border-l-4 border-[var(--primary-gold)] shadow-sm">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 text-white rounded-full flex items-center justify-center text-base font-bold shadow-md">
                                            {idx + 1}
                                          </span>
                                          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-main)] flex-1">
                                            {step}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    {task.hqTools && task.hqTools.length > 0 && (
                                      <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4">
                                        <h5 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2 text-base">
                                          <ExternalLink className="w-5 h-5 text-purple-600" />
                                          Interactive Forms & Tools
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                          {getToolLinks(task.hqTools).map((toolLink, tlIdx) => (
                                            <Link
                                              key={tlIdx}
                                              to={createPageUrl(toolLink.page)}
                                              className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-300 dark:border-purple-600 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                                            >
                                              <Zap className="w-4 h-4" />
                                              {toolLink.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    )}
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

            {/* Strategy Form Modal */}
            <StrategyFormModal
            isOpen={activeFormModal !== null}
            onClose={() => setActiveFormModal(null)}
            formType={activeFormModal}
            programKey={programKey}
            />
            </div>
            );
            }