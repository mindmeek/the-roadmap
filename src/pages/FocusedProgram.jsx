import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, CheckCircle, Clock, Target, ChevronDown, ChevronUp, Award, Loader2, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { quickBusinessWinsRoadmap } from '@/components/course_content/quickBusinessWins';
import { buildFoundationRoadmap } from '@/components/course_content/buildFoundation';
import { brandIdentityRoadmap } from '@/components/course_content/brandIdentity';
import { educateAudienceRoadmap } from '@/components/course_content/educateAudience';
import { nurtureRelationshipsRoadmap } from '@/components/course_content/nurtureRelationships';
import { increaseLeadsRoadmap } from '@/components/course_content/increaseLeads';
import { formPartnershipsRoadmap } from '@/components/course_content/formPartnerships';
import { growCommunityRoadmap } from '@/components/course_content/growCommunity';
import { systematizeScaleRoadmap } from '@/components/course_content/systematizeScale';
import { buildAuthorityRoadmap } from '@/components/course_content/buildAuthority';
import { multiplyImpactRoadmap } from '@/components/course_content/multiplyImpact';
import { stepIntoLeadershipRoadmap } from '@/components/course_content/stepIntoLeadership';

const programContentMap = {
  'quick_business_wins': quickBusinessWinsRoadmap,
  'build_foundation': buildFoundationRoadmap,
  'brand_identity': brandIdentityRoadmap,
  'educate_audience': educateAudienceRoadmap,
  'nurture_relationships': nurtureRelationshipsRoadmap,
  'increase_leads': increaseLeadsRoadmap,
  'form_partnerships': formPartnershipsRoadmap,
  'grow_community': growCommunityRoadmap,
  'systematize_scale': systematizeScaleRoadmap,
  'build_authority': buildAuthorityRoadmap,
  'multiply_impact': multiplyImpactRoadmap,
  'step_into_leadership': stepIntoLeadershipRoadmap,
};

export default function FocusedProgramPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programContent, setProgramContent] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

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
          const savedCompleted = localStorage.getItem(`program_${programKey}_completed`);
          if (savedCompleted) {
            setCompletedTasks(JSON.parse(savedCompleted));
          }
        } else {
          navigate(createPageUrl('FocusedPrograms'));
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
    localStorage.setItem(`program_${programKey}_completed`, JSON.stringify(newCompleted));
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

  const hasAccess = user && (
    user.role === 'admin' || 
    user.subscription_level === 'business_hq' ||
    programContent.courseTitle === "Quick Business Wins: 30-Day Revenue Accelerator" ||
    programContent.courseTitle === "Build Your Business Foundation: 90-Day Setup"
  );

  const totalTasks = programContent.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="card p-6 md:p-8 mb-6">
        <button
          onClick={() => navigate(createPageUrl('FocusedPrograms'))}
          className="btn btn-ghost mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Programs
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl mb-2">{programContent.courseTitle}</h1>
            <p className="text-[var(--text-soft)]">{programContent.courseDescription}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-soft)]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{programContent.weeks.length} Weeks</span>
            </div>
            <div className="px-3 py-1 bg-[var(--primary-gold)] text-white rounded-full font-semibold">
              {programContent.difficulty}
            </div>
          </div>
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
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Upgrade to Access This Program</h3>
              <p className="text-[var(--text-soft)] mb-4">
                This is a premium program available exclusively to Business HQ members. Upgrade to unlock all 12 focused programs and accelerate your business growth.
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
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-[var(--primary-gold)]">Week {week.weekNumber}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-[var(--text-soft)]">
                          {weekTasksCompleted}/{week.tasks.length} tasks
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-main)]">{week.weekTitle}</h3>
                      <p className="text-sm text-[var(--text-soft)] mt-1">{week.weekDescription}</p>
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
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h4 className={`font-bold text-[var(--text-main)] mb-2 ${isCompleted && 'line-through opacity-75'}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                              {task.description}
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 mb-3">
                              <p className="text-sm text-[var(--text-main)]">
                                <strong>Action:</strong> {task.action}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Target className="w-4 h-4 text-[var(--primary-gold)]" />
                              <span className="text-[var(--text-soft)]">
                                <strong>Deliverable:</strong> {task.deliverable}
                              </span>
                            </div>
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

      {/* Completion Message */}
      {hasAccess && progressPercentage === 100 && (
        <div className="card p-8 mt-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 inline-block rounded-full mb-4">
            <Award className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Program Complete! 🎉</h3>
          <p className="text-[var(--text-soft)] mb-4">
            Congratulations on completing this 90-day program! You've built systems and skills that will drive your business forward.
          </p>
          <button
            onClick={() => navigate(createPageUrl('FocusedPrograms'))}
            className="btn btn-primary"
          >
            Explore More Programs
          </button>
        </div>
      )}
    </div>
  );
}