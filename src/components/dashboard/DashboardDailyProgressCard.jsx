import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { TrendingUp, CheckCircle, Plus, Trash2, Save, ChevronRight, ChevronDown, HelpCircle, Loader2 } from 'lucide-react';
import { showXPToast } from '@/components/common/XPToast';
import { handleGamification } from '@/functions/handleGamification';
import Tooltip from '@/components/common/Tooltip';

export default function DashboardDailyProgressCard({ todayProgress, setTodayProgress, yesterdayProgress }) {
    const [newTaskText, setNewTaskText] = useState('');
    const [reflection, setReflection] = useState(todayProgress?.reflection || '');
    const [savingReflection, setSavingReflection] = useState(false);
    const [showYesterdayReflection, setShowYesterdayReflection] = useState(false);
    const [addingTask, setAddingTask] = useState(false);

    const tasks = todayProgress?.daily_tasks || [];
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const handleTaskToggle = async (taskId) => {
        const wasCompleted = tasks.find(t => t.id === taskId)?.completed;
        const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const updated = { ...todayProgress, daily_tasks: updatedTasks };
        setTodayProgress(updated);

        await base44.entities.DailyProgress.update(todayProgress.id, { daily_tasks: updatedTasks });

        if (!wasCompleted) {
            showXPToast({ xp: 10, message: 'Task completed!' });
            handleGamification({ action: 'COMPLETE_DAILY_TRACK' });
        }
    };

    const handleAddTask = async () => {
        if (!newTaskText.trim() || tasks.length >= 5 || !todayProgress) return;
        setAddingTask(true);
        const newTask = {
            id: crypto.randomUUID(),
            task: newTaskText.trim(),
            completed: false,
            source_type: 'custom',
            order: tasks.length
        };
        const updatedTasks = [...tasks, newTask];
        const updated = { ...todayProgress, daily_tasks: updatedTasks };
        setTodayProgress(updated);
        await base44.entities.DailyProgress.update(todayProgress.id, { daily_tasks: updatedTasks });
        setNewTaskText('');
        setAddingTask(false);
    };

    const handleRemoveTask = async (taskId) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        const updated = { ...todayProgress, daily_tasks: updatedTasks };
        setTodayProgress(updated);
        await base44.entities.DailyProgress.update(todayProgress.id, { daily_tasks: updatedTasks });
    };

    const handleSaveReflection = async () => {
        if (!todayProgress) return;
        setSavingReflection(true);
        await base44.entities.DailyProgress.update(todayProgress.id, { reflection });
        setTodayProgress({ ...todayProgress, reflection });
        setSavingReflection(false);
    };

    return (
        <div id="dashboard-daily-progress" className="card relative overflow-hidden p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all" style={{ borderRadius: '2px' }}>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-200/30 dark:bg-green-600/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-600/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] flex items-center flex-wrap gap-2">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <span>Today's Focus</span>
                    <Tooltip content="Your 3-5 key tasks for today. Check them off right here!">
                        <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </Tooltip>
                </h3>
                <Link to={createPageUrl('DailyTrack')} className="text-[var(--primary-gold)] hover:text-[#6B5838] flex items-center text-xs sm:text-sm font-medium group">
                    Full View <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Yesterday's Reflection */}
            {yesterdayProgress?.reflection && (
                <div className="relative z-10 mb-4">
                    <button
                        onClick={() => setShowYesterdayReflection(!showYesterdayReflection)}
                        className="flex items-center gap-2 text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors mb-1"
                    >
                        <ChevronDown className={`w-3 h-3 transition-transform ${showYesterdayReflection ? 'rotate-180' : ''}`} />
                        Yesterday's Reflection
                    </button>
                    {showYesterdayReflection && (
                        <div className="bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-700 rounded-lg p-3">
                            <p className="text-xs text-[var(--text-soft)] italic">"{yesterdayProgress.reflection}"</p>
                        </div>
                    )}
                </div>
            )}

            {/* Progress Bar */}
            {totalCount > 0 && (
                <div className="relative z-10 mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-soft)]">{completedCount} of {totalCount} completed</span>
                        <span className="text-xs font-bold text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 px-2 py-0.5 rounded">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2" style={{ borderRadius: '2px' }}>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 transition-all" style={{ width: `${progressPct}%`, borderRadius: '2px' }}></div>
                    </div>
                </div>
            )}

            {/* Task List */}
            <div className="relative z-10 space-y-2 mb-4">
                {tasks.length === 0 ? (
                    <p className="text-xs text-[var(--text-soft)] text-center py-2">No tasks yet — add one below!</p>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-lg px-3 py-2 group">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleTaskToggle(task.id)}
                                className="w-4 h-4 cursor-pointer flex-shrink-0"
                            />
                            <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-[var(--text-main)]'}`}>
                                {task.task}
                            </span>
                            <button
                                onClick={() => handleRemoveTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Task */}
            {tasks.length < 5 && todayProgress && (
                <div className="relative z-10 flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTaskText}
                        onChange={e => setNewTaskText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                        placeholder={`Add task (${5 - tasks.length} remaining)`}
                        className="form-input flex-1 text-xs py-2"
                    />
                    <button
                        onClick={handleAddTask}
                        disabled={!newTaskText.trim() || addingTask}
                        className="btn btn-primary py-2 px-3 text-xs disabled:opacity-50"
                    >
                        {addingTask ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                    </button>
                </div>
            )}

            {/* Today's Reflection */}
            {todayProgress && (
                <div className="relative z-10">
                    <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Today's Reflection</p>
                    <textarea
                        value={reflection}
                        onChange={e => setReflection(e.target.value)}
                        placeholder="What progress did you make today? What can be improved?"
                        className="form-input w-full text-xs h-16 resize-none"
                    />
                    {reflection !== (todayProgress.reflection || '') && (
                        <button
                            onClick={handleSaveReflection}
                            disabled={savingReflection}
                            className="btn btn-primary text-xs py-1 px-3 mt-1 w-full"
                        >
                            {savingReflection ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Save className="w-3 h-3 mr-1" />}
                            Save Reflection
                        </button>
                    )}
                </div>
            )}

            {!todayProgress && (
                <div className="relative z-10 text-center py-4">
                    <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Start Tracking Today
                    </Link>
                </div>
            )}
        </div>
    );
}