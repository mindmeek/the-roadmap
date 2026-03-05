import React, { useState, useEffect } from "react";
import { User, DailyProgress } from "@/entities/all";
import { RoadmapContent } from "@/entities/RoadmapContent";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, TrendingUp, Target, Edit3, Save, Plus, Trash2, ListChecks, CheckCircle, Loader2, Sparkles, AlertTriangle, X, ChevronRight } from "lucide-react";
import { format, subDays } from "date-fns";
import { handleGamification } from '@/functions/handleGamification';
import { generateDailyTasks } from '@/functions/generateDailyTasks';
import { showXPToast } from '@/components/common/XPToast';
import roadmapData from '../components/roadmap';
import RestartTourButton from '@/components/common/RestartTourButton';

export default function DailyTrack() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [yesterdayProgress, setYesterdayProgress] = useState(null);
  const [formData, setFormData] = useState({
    daily_tasks: [],
    reflection: "",
    next_day_focus_tasks: [""]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [monthlyProgress, setMonthlyProgress] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showActionSelector, setShowActionSelector] = useState(false);
  const [weeklyActionSteps, setWeeklyActionSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);

      // Debug: Log the user data and roadmap structure
      console.log("User data:", {
        stage: userData.entrepreneurship_stage,
        goal: userData.selected_goal,
        month: userData.current_month,
        week: userData.current_week
      });
      console.log("Roadmap data structure:", roadmapData);

      // Fetch Roadmap Content from DB
      try {
        const weekInMonth = ((userData.current_week - 1) % 4) + 1;
        const content = await RoadmapContent.filter({
            stage: userData.entrepreneurship_stage,
            goal_id: userData.selected_goal,
            month_number: userData.current_month,
            week_number: weekInMonth,
            is_published: true
        });

        if (content && content.length > 0) {
            setWeeklyActionSteps(content[0].action_steps || []);
        } else {
            setWeeklyActionSteps([]);
        }
      } catch (roadmapError) {
        console.error("Error accessing roadmap data:", roadmapError);
        setWeeklyActionSteps([]);
      }

      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const yesterdayStr = format(subDays(new Date(), 1), 'yyyy-MM-dd');

      const [todayEntries, yesterdayEntries, last30DaysEntries] = await Promise.all([
        DailyProgress.filter({ date: todayStr, created_by: userData.email }, "-created_date", 1),
        DailyProgress.filter({ date: yesterdayStr, created_by: userData.email }, "-created_date", 1),
        DailyProgress.filter({ created_by: userData.email }, "-date", 30)
      ]);
      
      setMonthlyProgress(last30DaysEntries);
      setCurrentStreak(calculateStreak(last30DaysEntries));
      setYesterdayProgress(yesterdayEntries[0] || null);

      let currentProgress = todayEntries[0];
      if (currentProgress) {
          // Carry over tasks from yesterday if they haven't been already
          const carriedOverTasks = yesterdayEntries[0]?.next_day_focus_tasks?.map(task => ({
              id: crypto.randomUUID(),
              task: task.task,
              completed: false,
              source_type: 'carried_over',
              order: 0
          })) || [];

          const existingCarriedOver = currentProgress.daily_tasks.filter(t => t.source_type === 'carried_over').map(t => t.task);
          const newCarriedOver = carriedOverTasks.filter(t => !existingCarriedOver.includes(t.task));

          if (newCarriedOver.length > 0) {
              const updatedTasks = [...currentProgress.daily_tasks, ...newCarriedOver];
              const updatedProgress = await DailyProgress.update(currentProgress.id, { daily_tasks: updatedTasks });
              setDailyProgress(updatedProgress);
              setFormDataFromProgress(updatedProgress);
          } else {
              setDailyProgress(currentProgress);
              setFormDataFromProgress(currentProgress);
          }
      } else {
          // No entry for today, create one and carry over tasks
          const carriedOverTasks = yesterdayEntries[0]?.next_day_focus_tasks?.map(task => ({
              id: crypto.randomUUID(),
              task: task.task,
              completed: false,
              source_type: 'carried_over',
              order: 0
          })) || [];
          
          const newProgressData = {
              date: todayStr,
              daily_tasks: carriedOverTasks,
              reflection: "",
              next_day_focus_tasks: [],
              week_number: userData.current_week,
              month_number: userData.current_month
          };
          const newProgress = await DailyProgress.create(newProgressData);
          setDailyProgress(newProgress);
          setFormDataFromProgress(newProgress);
          setIsEditing(true);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };
  
  const setFormDataFromProgress = (progress) => {
      setFormData({
        daily_tasks: progress?.daily_tasks || [],
        reflection: progress?.reflection || "",
        next_day_focus_tasks: progress?.next_day_focus_tasks?.map(t => t.task).length > 0 ? progress.next_day_focus_tasks.map(t => t.task) : [""]
      });
  };

  const calculateStreak = (progressData) => {
    if (!progressData.length) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
      const hasProgress = progressData.some(p => p.date === checkDate && p.daily_tasks?.some(t => t.completed));
      if (hasProgress) { streak++; } else { break; }
    }
    return streak;
  };
  
  const handleTaskToggle = async (id) => {
      // Get the current completion status before updating
      const wasCompleted = formData.daily_tasks.find(t => t.id === id)?.completed;

      const newTasks = formData.daily_tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
      );
      setFormData(prev => ({ ...prev, daily_tasks: newTasks }));
      
      // Auto-save when toggling tasks (even when not in edit mode)
      if (dailyProgress) {
          try {
              // Ensure we send all progress data, not just tasks, to keep other fields
              await DailyProgress.update(dailyProgress.id, {
                  ...dailyProgress, // This ensures reflection, next_day_focus_tasks etc. are preserved from current backend state
                  daily_tasks: newTasks
              });

              // Trigger gamification for completing tasks
              const isNowCompleted = newTasks.find(t => t.id === id)?.completed;
              if (!wasCompleted && isNowCompleted) {
                  showXPToast({ xp: 10, message: 'Task completed!' });
                  handleGamification({ action: 'COMPLETE_DAILY_TRACK' });
              }
          } catch (error) {
              console.error("Error auto-saving task toggle:", error);
          }
      }
  };

  const handleAddTask = (source_type = 'custom', source_id = null) => {
    const newTask = {
      id: crypto.randomUUID(),
      task: "",
      completed: false,
      source_type: source_type,
      source_id: source_id,
      order: formData.daily_tasks.length
    };
    setFormData(prev => ({...prev, daily_tasks: [...prev.daily_tasks, newTask]}));
  };

  const handleTaskChange = (id, value) => {
    const newTasks = formData.daily_tasks.map(task => task.id === id ? {...task, task: value} : task);
    setFormData(prev => ({...prev, daily_tasks: newTasks}));
  };

  const handleRemoveTask = (id) => {
    const newTasks = formData.daily_tasks.filter(task => task.id !== id);
    setFormData(prev => ({...prev, daily_tasks: newTasks}));
  };

  const handleNextDayTaskChange = (index, value) => {
    const newTasks = [...formData.next_day_focus_tasks];
    newTasks[index] = value;
    setFormData(prev => ({...prev, next_day_focus_tasks: newTasks}));
  };
  
  const addNextDayTask = () => {
      if(formData.next_day_focus_tasks.length < 3) {
        setFormData(prev => ({...prev, next_day_focus_tasks: [...prev.next_day_focus_tasks, ""]}));
      }
  };

  const removeNextDayTask = (index) => {
      const newTasks = formData.next_day_focus_tasks.filter((_, i) => i !== index);
      setFormData(prev => ({...prev, next_day_focus_tasks: newTasks.length > 0 ? newTasks : [""]}));
  };

  const handleGenerateTasks = async (selectedActionStep) => {
      if (!selectedActionStep) {
        setShowActionSelector(true);
        return;
      }
      setShowActionSelector(false);
      setIsGenerating(true);
      try {
          const { data } = await generateDailyTasks({ 
              actionStepTitle: selectedActionStep.title, 
              actionStepDescription: selectedActionStep.description 
          });
          
          if(data && Array.isArray(data)) {
              const newTasks = data.map((taskText, index) => ({
                  id: crypto.randomUUID(),
                  task: taskText,
                  completed: false,
                  source_type: 'roadmap',
                  source_id: selectedActionStep.title,
                  order: formData.daily_tasks.length + index
              }));
              setFormData(prev => ({...prev, daily_tasks: [...prev.daily_tasks, ...newTasks]}));
          }
      } catch (error) {
          console.error("Error generating tasks:", error);
      } finally {
          setIsGenerating(false);
      }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const progressData = {
        date: format(new Date(), 'yyyy-MM-dd'),
        daily_tasks: formData.daily_tasks.filter(t => t.task.trim()),
        reflection: formData.reflection,
        next_day_focus_tasks: formData.next_day_focus_tasks.filter(t => t.trim()).map(t => ({task: t})),
        week_number: user.current_week,
        month_number: user.current_month,
      };

      // Gamification logic for overall daily completion was moved to handleTaskToggle
      // The previous check (!wasAnythingCompleted && isAnythingCompletedNow) is now handled
      // per task completion in handleTaskToggle, aligning with the new requirement.

      const updated = await DailyProgress.update(dailyProgress.id, progressData);
      setDailyProgress(updated);
      
      setIsEditing(false);
      await loadData();
    } catch (error) {
      console.error("Error saving progress:", error);
    }
    setIsSaving(false);
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
  }
  
  const completedTasks = formData.daily_tasks.filter(t => t.completed).length;
  const totalTasks = formData.daily_tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const progressData30Days = Array.from({length: 30}, (_, i) => {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const progress = monthlyProgress.find(p => p.date === date);
      const total = progress?.daily_tasks?.length || 0;
      const completed = progress?.daily_tasks?.filter(t => t.completed).length || 0;
      return { date, percentage: total > 0 ? Math.round((completed / total) * 100) : 0, hasEntry: !!progress };
  }).reverse();

  return (
    <div className="px-4 pb-20 md:pb-8">
      {showActionSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full shadow-2xl transform transition-all animate-in fade-in-0 zoom-in-95">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-[var(--text-main)]">Select an Action Step</h3>
                <button onClick={() => setShowActionSelector(false)} className="btn btn-ghost btn-circle">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[var(--text-soft)] mb-6">Choose a goal from your current week's roadmap to break down into smaller daily tasks.</p>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {weeklyActionSteps.length > 0 ? weeklyActionSteps.map(step => (
                  <button 
                    key={step.title} 
                    onClick={() => handleGenerateTasks(step)} 
                    disabled={isGenerating}
                    className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[var(--text-main)]">{step.title}</p>
                      <p className="text-sm text-[var(--text-soft)]">{step.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4"/>
                  </button>
                )) : <p className="text-center text-[var(--text-soft)]">No weekly action steps found. Please check your journey progress.</p>}
              </div>
            </div>
          </div>
        )}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div id="daily-track-header" className="card p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md"><Calendar className="w-8 h-8 text-[var(--primary-gold)]" /></div>
                <div>
                    <h1 className="text-3xl">Daily 1% Tracker</h1>
                    <p className="text-[var(--text-soft)] text-lg">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
                <RestartTourButton tourKey="daily_track" />
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="btn btn-secondary"><Edit3 className="w-4 h-4 mr-2" />Edit Today</button>
                )}
            </div>
             {isEditing && (
                <button onClick={() => navigate(createPageUrl('Schedule'))} className="btn btn-primary"><ListChecks className="w-4 h-4 mr-2" />Plan My Day</button>
             )}
          </div>
        </div>

        {/* 30-Day Overview */}
        <div id="daily-track-stats" className="card p-6">
            <h2 className="text-xl font-bold mb-4">30-Day Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 dark:bg-green-900/20 text-center p-4 rounded-lg"><div className="text-3xl font-bold text-green-600 dark:text-green-400">{currentStreak}</div><div className="text-green-700 dark:text-green-300">Day Streak</div></div>
                <div className="bg-blue-50 dark:bg-blue-900/20 text-center p-4 rounded-lg"><div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{monthlyProgress.length}</div><div className="text-blue-700 dark:text-blue-300">Days Tracked</div></div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-center p-4 rounded-lg"><div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{progressPercentage}%</div><div className="text-yellow-700 dark:text-yellow-300">Today's Progress</div></div>
            </div>
            <div className="flex flex-wrap gap-1">
                {progressData30Days.map(day => (
                    <div key={day.date} className={`w-8 h-8 rounded ${day.hasEntry ? (day.percentage > 50 ? 'bg-green-500' : 'bg-yellow-400') : 'bg-gray-200 dark:bg-gray-700'}`} title={`${day.date}: ${day.percentage}%`}></div>
                ))}
            </div>
        </div>

        {/* Today's Tasks */}
        <div id="daily-track-tasks" className="card p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Today's Tasks ({completedTasks}/{totalTasks})</h2>
                {isEditing && (
                    <div className="flex gap-2">
                        <button onClick={() => setShowActionSelector(true)} className="btn btn-secondary" disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Sparkles className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleAddTask()} className="btn btn-primary"><Plus className="w-4 h-4" /></button>
                    </div>
                )}
            </div>
            <div className="space-y-3">
                {formData.daily_tasks.length > 0 ? formData.daily_tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => handleTaskToggle(task.id)} 
                            className="w-5 h-5 cursor-pointer" 
                        />
                        {isEditing ? (
                            <>
                                <input type="text" value={task.task} onChange={(e) => handleTaskChange(task.id, e.target.value)} className="form-input flex-1"/>
                                <button onClick={() => handleRemoveTask(task.id)} className="btn btn-ghost text-red-500 p-2"><Trash2 className="w-4 h-4"/></button>
                            </>
                        ) : (
                            <span 
                                className={`flex-1 cursor-pointer select-none ${task.completed ? 'line-through text-gray-500' : ''}`} 
                                onClick={() => handleTaskToggle(task.id)}
                            >
                                {task.task}
                            </span>
                        )}
                    </div>
                )) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p>No tasks for today. Add some to get started!</p>
                        {isEditing && 
                            <button onClick={() => setShowActionSelector(true)} className="btn btn-secondary mt-2" disabled={isGenerating}>
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Sparkles className="w-4 h-4 mr-2" />}
                                Generate AI Tasks
                            </button>
                        }
                    </div>
                )}
            </div>
        </div>

        {/* Financial Goal Card */}
        <div id="daily-track-financial" className="card p-6">
            <h2 className="text-xl font-bold mb-4">Financial Goals</h2>
            <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-[var(--primary-gold)]" />
                <p className="text-lg">Set your wealth accumulation goals.</p>
            </div>
            <p className="text-[var(--text-soft)] mb-4">
                Use the Freedom Calculator to define your financial independence number and track your progress towards it.
            </p>
            <button
                onClick={() => navigate(createPageUrl('FreedomCalculator'))}
                className="btn btn-primary w-full"
            >
                <TrendingUp className="w-4 h-4 mr-2" /> Open Freedom Calculator
            </button>
        </div>

        {/* Reflection & Next Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="daily-track-reflection" className="card p-6">
                <h2 className="text-xl font-bold mb-4">Daily Reflection</h2>
                {isEditing ? (
                    <textarea value={formData.reflection} onChange={(e) => setFormData(prev => ({...prev, reflection: e.target.value}))} className="form-input h-32" placeholder="What went well? What could be improved?"></textarea>
                ) : (
                    <p className="whitespace-pre-wrap min-h-[8rem] bg-gray-50 dark:bg-gray-800 p-3 rounded">{formData.reflection || 'No reflection added.'}</p>
                )}
            </div>
            <div id="daily-track-next-day" className="card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Tomorrow's Focus</h2>
                    {isEditing && formData.next_day_focus_tasks.length < 3 && <button onClick={addNextDayTask} className="btn btn-primary"><Plus className="w-4 h-4"/></button>}
                </div>
                {isEditing ? (
                    <div className="space-y-2">
                    {formData.next_day_focus_tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="text" value={task} onChange={(e) => handleNextDayTaskChange(index, e.target.value)} className="form-input flex-1" placeholder="e.g., Finalize presentation"/>
                            <button onClick={() => removeNextDayTask(index)} className="btn btn-ghost text-red-500 p-2"><Trash2 className="w-4 h-4"/></button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <ul className="list-disc pl-5 space-y-2">
                        {dailyProgress?.next_day_focus_tasks?.length > 0 ? dailyProgress.next_day_focus_tasks.map((t,i) => <li key={i}>{t.task}</li>) : <li>No focus tasks set.</li>}
                    </ul>
                )}
            </div>
        </div>

        {isEditing && (
            <div className="flex justify-end pt-4">
                <button onClick={handleSave} disabled={isSaving} className="btn btn-primary text-base py-3 px-6">
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{isSaving ? "Saving..." : "Save Today's Progress"}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
}