import React, { useState, useEffect } from 'react';
import { User, MorningRoutine } from '@/entities/all';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Zap, Plus, Trash2, GripVertical, Save, Clock, CheckCircle, Play, ArrowLeft, Sparkles, Sun, Coffee, Dumbbell, Brain, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryConfig = {
  mindfulness: { 
    label: 'Mindfulness', 
    color: 'bg-purple-500', 
    icon: Brain,
    examples: ['Meditation', 'Deep breathing', 'Gratitude journaling']
  },
  physical: { 
    label: 'Physical', 
    color: 'bg-green-500', 
    icon: Dumbbell,
    examples: ['Workout', 'Yoga', 'Stretching', 'Walk']
  },
  planning: { 
    label: 'Planning', 
    color: 'bg-blue-500', 
    icon: CalendarIcon,
    examples: ['Review goals', 'Plan top 3 priorities', 'Check calendar']
  },
  nutrition: { 
    label: 'Nutrition', 
    color: 'bg-orange-500', 
    icon: Coffee,
    examples: ['Healthy breakfast', 'Hydrate', 'Vitamins']
  },
  personal: { 
    label: 'Personal', 
    color: 'bg-pink-500', 
    icon: Sun,
    examples: ['Reading', 'Family time', 'Shower & dress']
  }
};

export default function MorningRoutineBuilder() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'My Morning Routine',
    steps: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);

      const routines = await MorningRoutine.filter(
        { created_by: userData.email },
        '-updated_date',
        1
      );

      if (routines.length > 0) {
        const activeRoutine = routines[0];
        setRoutine(activeRoutine);
        setFormData({
          name: activeRoutine.name,
          steps: activeRoutine.steps || []
        });
        
        // Check if today's tracking is in progress
        const today = new Date().toISOString().split('T')[0];
        if (activeRoutine.last_completed_date === today) {
          setIsTracking(true);
        }
      } else {
        // Create default routine with example steps
        const defaultSteps = [
          {
            id: crypto.randomUUID(),
            description: 'Drink 16oz of water',
            time_estimate_minutes: 2,
            order: 0,
            category: 'nutrition',
            is_completed_today: false
          },
          {
            id: crypto.randomUUID(),
            description: 'Meditate for 10 minutes',
            time_estimate_minutes: 10,
            order: 1,
            category: 'mindfulness',
            is_completed_today: false
          },
          {
            id: crypto.randomUUID(),
            description: 'Review my top 3 priorities',
            time_estimate_minutes: 5,
            order: 2,
            category: 'planning',
            is_completed_today: false
          }
        ];
        
        setFormData({
          name: 'My Morning Routine',
          steps: defaultSteps
        });
      }
    } catch (error) {
      console.error('Error loading routine:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStep = () => {
    const newStep = {
      id: crypto.randomUUID(),
      description: '',
      time_estimate_minutes: 5,
      order: formData.steps.length,
      category: 'personal',
      is_completed_today: false
    };
    
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const handleRemoveStep = (stepId) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s.id !== stepId).map((s, idx) => ({ ...s, order: idx }))
    }));
  };

  const handleStepChange = (stepId, field, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(s => 
        s.id === stepId ? { ...s, [field]: value } : s
      )
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formData.steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSteps = items.map((step, index) => ({
      ...step,
      order: index
    }));

    setFormData(prev => ({ ...prev, steps: reorderedSteps }));
  };

  const handleSaveRoutine = async () => {
    setSaving(true);
    try {
      const totalTime = formData.steps.reduce((sum, step) => sum + (step.time_estimate_minutes || 0), 0);
      
      const routineData = {
        ...formData,
        total_time_estimate: totalTime,
        is_active: true
      };

      if (routine) {
        await MorningRoutine.update(routine.id, routineData);
      } else {
        const newRoutine = await MorningRoutine.create(routineData);
        setRoutine(newRoutine);
      }
      
      alert('Morning routine saved successfully!');
    } catch (error) {
      console.error('Error saving routine:', error);
      alert('Failed to save routine. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  const handleToggleStepComplete = async (stepId) => {
    const newSteps = formData.steps.map(s => 
      s.id === stepId ? { ...s, is_completed_today: !s.is_completed_today } : s
    );
    
    setFormData(prev => ({ ...prev, steps: newSteps }));
    
    // Auto-save progress
    if (routine) {
      try {
        await MorningRoutine.update(routine.id, { steps: newSteps });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleCompleteRoutine = async () => {
    if (!routine) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const currentStreak = routine.last_completed_date === new Date(Date.now() - 86400000).toISOString().split('T')[0]
        ? (routine.completion_streak || 0) + 1
        : 1;

      await MorningRoutine.update(routine.id, {
        last_completed_date: today,
        completion_streak: currentStreak,
        steps: formData.steps.map(s => ({ ...s, is_completed_today: false })) // Reset for tomorrow
      });
      
      alert(`🎉 Morning routine complete! ${currentStreak} day streak!`);
      setIsTracking(false);
      await loadData();
    } catch (error) {
      console.error('Error completing routine:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  const totalTime = formData.steps.reduce((sum, step) => sum + (step.time_estimate_minutes || 0), 0);
  const completedSteps = formData.steps.filter(s => s.is_completed_today).length;
  const totalSteps = formData.steps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="card p-6 md:p-8">
          <button
            onClick={() => navigate(createPageUrl('QuickLesson?lesson=morning-routine'))}
            className="btn btn-ghost mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lesson
          </button>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-4 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">Build Your Morning Routine</h1>
              <p className="text-[var(--text-soft)]">Create a personalized morning routine that sets you up for success</p>
            </div>
          </div>

          {routine && routine.completion_streak > 0 && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                🔥 {routine.completion_streak} day streak! Keep it going!
              </p>
            </div>
          )}
        </div>

        {/* Routine Name */}
        {!isTracking && (
          <div className="card p-6">
            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
              Routine Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="form-input"
              placeholder="My Ideal Morning Routine"
            />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-[var(--primary-gold)] mb-1">{totalSteps}</div>
            <div className="text-xs text-[var(--text-soft)]">Total Steps</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalTime}m</div>
            <div className="text-xs text-[var(--text-soft)]">Total Time</div>
          </div>
          {isTracking && (
            <>
              <div className="card p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{completedSteps}/{totalSteps}</div>
                <div className="text-xs text-[var(--text-soft)]">Completed</div>
              </div>
              <div className="card p-4 text-center">
                <div className="text-2xl font-bold text-[var(--primary-gold)] mb-1">{progressPercentage}%</div>
                <div className="text-xs text-[var(--text-soft)]">Progress</div>
              </div>
            </>
          )}
          {!isTracking && routine && (
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{routine.completion_streak || 0}</div>
              <div className="text-xs text-[var(--text-soft)]">Day Streak</div>
            </div>
          )}
        </div>

        {/* Progress Bar (Only in Tracking Mode) */}
        {isTracking && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[var(--text-main)]">Today's Progress</h3>
              <span className="text-sm text-[var(--text-soft)]">{progressPercentage}% complete</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 bg-gradient-to-r from-green-500 to-emerald-600"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Routine Steps */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--text-main)]">
              {isTracking ? "Today's Routine" : "Your Routine Steps"}
            </h2>
            {!isTracking && (
              <button
                onClick={handleAddStep}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </button>
            )}
          </div>

          {formData.steps.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Sun className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-[var(--text-soft)] mb-4">No steps in your routine yet</p>
              <button onClick={handleAddStep} className="btn btn-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Step
              </button>
            </div>
          ) : isTracking ? (
            // Tracking Mode: Simple Checklist
            <div className="space-y-3">
              {formData.steps.map((step, index) => {
                const CategoryIcon = categoryConfig[step.category]?.icon || Sun;
                const categoryColor = categoryConfig[step.category]?.color || 'bg-gray-500';
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      step.is_completed_today 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className={`${categoryColor} p-2 rounded-lg flex-shrink-0`}>
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${step.is_completed_today ? 'text-green-800 dark:text-green-200 line-through' : 'text-[var(--text-main)]'}`}>
                        {step.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[var(--text-soft)] flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.time_estimate_minutes} min
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-[var(--text-soft)]">
                          {categoryConfig[step.category]?.label}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleStepComplete(step.id)}
                      className={`p-2 rounded-full transition-all ${
                        step.is_completed_today 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 hover:bg-gray-300'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            // Building Mode: Drag and Drop
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="routine-steps">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {formData.steps.map((step, index) => {
                      const CategoryIcon = categoryConfig[step.category]?.icon || Sun;
                      
                      return (
                        <Draggable key={step.id} draggableId={step.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-grab mt-2">
                                  <GripVertical className="w-5 h-5" />
                                </div>

                                <div className="flex-1 space-y-3">
                                  <input
                                    type="text"
                                    value={step.description}
                                    onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                                    placeholder="What do you want to do? (e.g., Meditate for 10 minutes)"
                                    className="form-input w-full"
                                  />
                                  
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">
                                        Time (minutes)
                                      </label>
                                      <input
                                        type="number"
                                        value={step.time_estimate_minutes}
                                        onChange={(e) => handleStepChange(step.id, 'time_estimate_minutes', parseInt(e.target.value) || 0)}
                                        className="form-input w-full"
                                        min="1"
                                        max="120"
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-xs font-medium text-[var(--text-soft)] mb-1">
                                        Category
                                      </label>
                                      <select
                                        value={step.category}
                                        onChange={(e) => handleStepChange(step.id, 'category', e.target.value)}
                                        className="form-input w-full"
                                      >
                                        {Object.entries(categoryConfig).map(([key, config]) => (
                                          <option key={key} value={key}>
                                            {config.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleRemoveStep(step.id)}
                                  className="btn btn-ghost text-red-500 p-2 mt-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        {/* Category Examples */}
        {!isTracking && (
          <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
            <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Routine Ideas by Category
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div key={key} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`${config.color} p-1.5 rounded`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-semibold text-sm text-[var(--text-main)]">{config.label}</p>
                    </div>
                    <ul className="space-y-1">
                      {config.examples.map((example, idx) => (
                        <li key={idx} className="text-xs text-[var(--text-soft)]">• {example}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          {!isTracking ? (
            <>
              <button
                onClick={handleSaveRoutine}
                disabled={saving || formData.steps.length === 0}
                className="btn btn-secondary disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Routine
                  </>
                )}
              </button>
              
              <button
                onClick={handleStartTracking}
                disabled={formData.steps.length === 0}
                className="btn btn-primary disabled:opacity-50"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Today's Routine
              </button>
            </>
          ) : (
            <button
              onClick={handleCompleteRoutine}
              disabled={completedSteps !== totalSteps}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Complete Routine ({completedSteps}/{totalSteps})
            </button>
          )}
        </div>

        {/* Pro Tips */}
        <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-[var(--text-main)] mb-3">💡 Pro Tips for Success</h3>
          <ul className="space-y-2 text-sm text-[var(--text-soft)]">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Start small with 3-5 steps and gradually add more</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Aim for consistency over perfection - missing a day is okay!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Prepare the night before to reduce morning friction</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Track your routine for 30 days to build a lasting habit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}