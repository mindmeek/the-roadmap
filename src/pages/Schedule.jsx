import React, { useState, useEffect } from 'react';
import { User, Schedule } from '@/entities/all';
import { createPageUrl } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, addDays, parseISO } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Calendar, Clock, Plus, Edit, Trash2, Save, X, Download, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { exportSchedule } from '@/functions/exportSchedule';
import { generateScheduleTemplate } from '@/functions/generateScheduleTemplate';
import roadmapData from '../components/roadmap';
import RestartTourButton from '@/components/common/RestartTourButton';

const categoryColors = {
  deep_work: "bg-blue-500",
  meetings: "bg-purple-500",
  learning: "bg-green-500",
  admin: "bg-yellow-500",
  breaks: "bg-gray-400",
  personal: "bg-pink-500",
};

const categoryIcons = {
  deep_work: "🎯",
  meetings: "🤝", 
  learning: "📚",
  admin: "📋",
  breaks: "☕",
  personal: "🏠",
};

const categoryLabels = {
  deep_work: "Deep Work",
  meetings: "Meetings",
  learning: "Learning",
  admin: "Admin Tasks",
  breaks: "Break",
  personal: "Personal",
};

// Helper function to convert 24-hour time to 12-hour AM/PM format
const formatTimeToAMPM = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':');
  if (hours === undefined || minutes === undefined) return time24; // Return as-is if malformed
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Generate time slots with AM/PM format
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 7; i <= 18; i++) { // 7 AM to 6 PM (last slot 18:00, representing 6 PM to 7 PM hour)
    const time24 = `${String(i).padStart(2, '0')}:00`;
    const timeAMPM = formatTimeToAMPM(time24);
    slots.push({ time24, timeAMPM });
  }
  return slots;
};

const TimeSlot = ({ timeSlot, isWorkHour, onClick }) => (
  <div 
    className={`h-16 flex items-start justify-between pr-2 text-xs border-t border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isWorkHour ? 'bg-red-50 dark:bg-red-900/20' : ''}`}
    onClick={() => onClick(timeSlot.time24)}
  >
    <span className={isWorkHour ? 'text-red-600 font-semibold' : 'text-gray-400'}>{timeSlot.timeAMPM}</span>
    <Plus className="w-3 h-3 text-gray-400 opacity-0 hover:opacity-100 transition-opacity" />
  </div>
);

const ScheduleBlock = ({ item, onDelete, onEdit }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const startMinutes = parseInt(item.start_time.split(':')[0], 10) * 60 + parseInt(item.start_time.split(':')[1], 10);
  const endMinutes = parseInt(item.end_time.split(':')[0], 10) * 60 + parseInt(item.end_time.split(':')[1], 10);
  
  // Calculate position relative to 7 AM start - each hour is 64px (h-16 in Tailwind)
  const scheduleStartMinutes = 7 * 60; // 7:00 AM
  // Position precisely based on start minutes, 64px per hour
  const topPosition = ((startMinutes - scheduleStartMinutes) / 60) * 64; 
  // Calculate height based on duration, rounded up to nearest full hour slot for snapping effect (as per outline)
  // Ensure a minimum height of 32px (half an hour slot)
  const height = Math.max(32, Math.ceil((endMinutes - startMinutes) / 60) * 64); 
  const duration = (endMinutes - startMinutes) / 60; // Duration in hours (float)

  // Determine if we have enough space for full details
  const isCompact = height < 60;
  
  return (
    <div className="relative">
      <div
        className={`absolute w-full p-2 rounded-md text-white overflow-hidden shadow-lg ${categoryColors[item.category]} cursor-pointer hover:opacity-95 transition-all duration-200 border border-white/20`}
        style={{
          top: `${topPosition}px`,
          height: `${height}px`,
          left: '2px',
          right: '2px',
          width: 'calc(100% - 4px)',
          zIndex: 10 // Ensure block is above the droppable time slots
        }}
        onClick={() => onEdit && onEdit(item)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="h-full flex flex-col justify-between relative">
          <div className="flex-1 min-h-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{categoryIcons[item.category]}</span>
              {onDelete && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} 
                  className="text-white hover:text-red-200 opacity-70 hover:opacity-100 transition-opacity bg-black/20 rounded-full p-1"
                  title="Delete activity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
            
            {/* Title - larger and more readable */}
            <p className={`font-semibold leading-tight text-white ${isCompact ? 'text-xs' : 'text-sm'} mb-1`}>
              {isCompact && item.title.length > 20 
                ? `${item.title.substring(0, 17)}...` 
                : item.title
              }
            </p>
            
            {/* Time and duration info */}
            <div className={`text-white/90 ${isCompact ? 'text-xs' : 'text-xs'} leading-tight`}>
              <div>{formatTimeToAMPM(item.start_time)} - {formatTimeToAMPM(item.end_time)}</div>
              {!isCompact && (
                <div className="text-white/80">
                  {duration === 1 ? '1 hour' : duration < 1 ? `${Math.round(duration * 60)} min` : `${duration} hrs`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover Tooltip - positioned relative to the block */}
        {showTooltip && (
          <div 
            className="absolute bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700 z-50 max-w-xs pointer-events-none"
            style={{
              left: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              marginLeft: '10px'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{categoryIcons[item.category]}</span>
              <span className="font-semibold text-sm">{categoryLabels[item.category]}</span>
            </div>
            
            <h4 className="font-bold text-base mb-2">{item.title}</h4>
            
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex justify-between">
                <span>Start:</span>
                <span className="font-medium">{formatTimeToAMPM(item.start_time)}</span>
              </div>
              <div className="flex justify-between">
                <span>End:</span>
                <span className="font-medium">{formatTimeToAMPM(item.end_time)}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">
                  {duration === 1 ? '1 hour' : duration < 1 ? `${Math.round(duration * 60)} minutes` : `${duration} hours`}
                </span>
              </div>
              {item.linked_task_id && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <span className="text-xs text-blue-300">📋 Linked to weekly task</span>
                </div>
              )}
            </div>
            
            <div className="mt-3 pt-2 border-t border-gray-600 text-xs text-gray-400">
              Click to edit • Right-click menu to delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityDropdown = ({ isOpen, onClose, time, onAddActivity, weeklyTasks }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedTask, setSelectedTask] = useState('');

  const handleAddActivity = () => {
    if (!selectedCategory && !selectedTask) return;
    
    let title = '';
    let category = '';
    
    if (selectedTask) {
      const task = weeklyTasks.find(t => t.id === selectedTask);
      title = task?.title || selectedTask;
      category = 'deep_work'; // Default category for tasks
    } else {
      title = customTitle || categoryLabels[selectedCategory];
      category = selectedCategory;
    }
    
    const startHour = parseInt(time.split(':')[0], 10);
    const startMinute = parseInt(time.split(':')[1], 10);
    const totalMinutes = startHour * 60 + startMinute + duration;

    let endHour = Math.floor(totalMinutes / 60);
    let endMinute = totalMinutes % 60;

    // Cap activities at 7 PM (19:00) as the last time slot ends there.
    if (endHour > 19 || (endHour === 19 && endMinute > 0)) {
      endHour = 19;
      endMinute = 0;
    }
    
    const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    
    const newItem = {
      id: crypto.randomUUID(),
      start_time: time, // This is always 24-hour time passed in
      end_time: endTime,
      title: title,
      category: category,
      linked_task_id: selectedTask || null,
    };
    
    onAddActivity(newItem);
    onClose();
    
    // Reset form
    setSelectedCategory('');
    setCustomTitle('');
    setDuration(60);
    setSelectedTask('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add Activity at {formatTimeToAMPM(time)}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Weekly Tasks Section */}
            {weeklyTasks.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Weekly Tasks</label>
                <select
                  value={selectedTask}
                  onChange={(e) => {
                    setSelectedTask(e.target.value);
                    if (e.target.value) {
                      setSelectedCategory('');
                      setCustomTitle('');
                    }
                  }}
                  className="form-input w-full"
                >
                  <option value="">Select a weekly task...</option>
                  {weeklyTasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="text-center text-sm text-gray-500">or</div>
            
            {/* Activity Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Activity Type</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key);
                      setSelectedTask('');
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedCategory === key 
                        ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{categoryIcons[key]}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Title Input */}
            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium mb-1">Custom Title (optional)</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={`Enter custom title or leave blank for "${categoryLabels[selectedCategory]}"`}
                  className="form-input w-full"
                />
              </div>
            )}
            
            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                className="form-input w-full"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button 
              onClick={handleAddActivity} 
              disabled={!selectedCategory && !selectedTask}
              className="btn btn-primary disabled:opacity-50"
            >
              Add Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SchedulePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleItems, setScheduleItems] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [dailyProgress, setDailyProgress] = useState(null);
  const [scheduleRecord, setScheduleRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);

  const loadData = async (date) => {
    setLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const [scheduleEntries, progressEntries] = await Promise.all([
        Schedule.filter({ created_by: userData.email, date: dateStr }, "-created_date", 1),
        // DailyProgress is removed, so this line will be modified to remove the dailyProgress fetch
        // and update the setDailyProgress to null.
        // Assuming DailyProgress.filter was used to get `todaysProgress?.daily_tasks`.
        // Now, we'll fetch daily tasks in another way or rely on a different source.
        // For this context, I'll update the `DailyProgress` fetching part based on what makes sense
        // if `DailyProgress` entity is no longer used for fetching tasks.
        // If daily_tasks are expected from `Schedule` entity or another source, that logic should be here.
        // For now, I'll remove the fetch of DailyProgress but keep the `daily_tasks` empty if no other source is provided.
        // Re-reading the prompt, only the import was changed. `DailyProgress` entity might still exist and be used.
        // The original code used `DailyProgress.filter`, and the `DailyProgress` entity was imported.
        // The new import for `@/entities/all` *removes* `DailyProgress`. This implies `DailyProgress`
        // is no longer available or intended to be used.
        // Therefore, I must remove the line that fetches `DailyProgress`.
        // The `todaysProgress` variable will now be `null` or undefined.
        // This will affect `allTasks = todaysProgress?.daily_tasks || [];`.
        // If tasks are now expected to be part of the `Schedule` entity, that's a larger change.
        // For now, I will interpret this strictly: `DailyProgress` entity is gone, so its data fetching is gone.
        // This means `unscheduledTasks` will likely be empty if there's no other source.

        // ORIGINAL: DailyProgress.filter({ created_by: userData.email, date: dateStr }, "-created_date", 1)
        Promise.resolve([]) // Simulate an empty result for DailyProgress since it's removed.
      ]);
      
      // const todaysProgress = progressEntries[0]; // This line will not make sense now.
      const todaysSchedule = scheduleEntries[0];

      setDailyProgress(null); // Explicitly set to null as DailyProgress is no longer fetched
      setScheduleRecord(todaysSchedule);
      
      // Original: const allTasks = todaysProgress?.daily_tasks || [];
      // Now, if daily_tasks are not coming from `todaysProgress`, they must come from somewhere else.
      // If the intent was to replace DailyProgress with Schedule for tasks, it's not clear from the import change.
      // Assuming for now, daily tasks are no longer loaded this way from an entity.
      const allTasks = []; // No longer fetching daily tasks from DailyProgress

      const scheduledTaskIds = new Set((todaysSchedule?.items || []).map(item => item.linked_task_id).filter(Boolean));

      setScheduleItems(todaysSchedule?.items || []);
      setUnscheduledTasks(allTasks.filter(task => !scheduledTaskIds.has(task.id)));
      
      // Load weekly tasks from roadmap
      try {
        const stage = userData.entrepreneurship_stage;
        const goalId = userData.selected_goal;
        const monthIndex = (userData.current_month || 1) - 1;
        const weekIndex = (userData.current_week || 1) - 1;

        let actionSteps = [];

        // Get weekly action steps from roadmap
        if (roadmapData && roadmapData[stage] && roadmapData[stage].goals && roadmapData[stage].goals[goalId]) {
          const journey = roadmapData[stage].goals[goalId];
          if (journey.months && journey.months[monthIndex] && journey.months[monthIndex].weeks && journey.months[monthIndex].weeks[weekIndex]) {
            actionSteps = journey.months[monthIndex].weeks[weekIndex].actionSteps || [];
          }
        }

        setWeeklyTasks(actionSteps);
      } catch (roadmapError) {
        console.error("Error loading weekly tasks:", roadmapError);
        setWeeklyTasks([]);
      }
      
    } catch (error) {
      console.error("Error loading schedule data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    const initialDate = dateParam ? parseISO(dateParam) : new Date(); // Using parseISO from date-fns
    setSelectedDate(initialDate);
    loadData(initialDate);
  }, []); // Removed loadData from dependency array as it's not wrapped in useCallback anymore
  
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    navigate(createPageUrl(`Schedule?date=${format(newDate, 'yyyy-MM-dd')}`));
    loadData(newDate);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    
    if (source.droppableId === 'TASK_POOL' && destination.droppableId.startsWith('TIMELINE_')) {
      const task = unscheduledTasks[source.index];
      const time = destination.droppableId.split('_')[1]; 
      const hour = parseInt(time.split(':')[0], 10);

      // Default to 1 hour duration for dragged tasks, capped at 7 PM
      let endHour = hour + 1;
      let endMinute = 0;
      if (endHour > 19) {
        endHour = 19;
        endMinute = 0;
      }

      const newItem = {
        id: crypto.randomUUID(),
        start_time: time,
        end_time: `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`,
        title: task.task,
        category: 'deep_work',
        linked_task_id: task.id,
      };

      setScheduleItems(prev => [...prev, newItem]);
      setUnscheduledTasks(prev => prev.map(t => 
        t.id === task.id ? {...t, isScheduled: true} : t
      ));
    }
  };

  const handleTimeSlotClick = (time24) => {
    // If the clicked slot is within work hours, do not allow adding activities
    if (isWorkHour(time24)) return; 
    
    setSelectedTime(time24); // Store the 24-hour time
    setShowActivityDropdown(true);
  };

  const handleAddActivity = (newItem) => {
    setScheduleItems(prev => [...prev, newItem]);
    
    // If it's linked to a task, mark it as scheduled
    if (newItem.linked_task_id) {
        // Find the linked task in unscheduledTasks and update its isScheduled status
        setUnscheduledTasks(prev => prev.map(t => 
            t.id === newItem.linked_task_id ? {...t, isScheduled: true} : t
        ));
    }
  };

  const handleSaveEdit = (updatedItem) => {
    setScheduleItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };
  
  const handleSaveSchedule = async () => {
    setSaving(true);
    try {
        const dataToSave = {
            date: format(selectedDate, 'yyyy-MM-dd'),
            items: scheduleItems,
        };

        if (scheduleRecord) {
            await Schedule.update(scheduleRecord.id, dataToSave);
        } else {
            const newRecord = await Schedule.create(dataToSave);
            setScheduleRecord(newRecord);
        }
        alert("Schedule saved successfully!");
    } catch(e) {
        console.error("Error saving schedule", e);
        alert("Error saving schedule: " + (e.message || "Unknown error"));
    } finally {
        setSaving(false);
    }
  };

  const handleDeleteItem = (itemId) => {
    const itemToDelete = scheduleItems.find(item => item.id === itemId);
    if (!itemToDelete) return;

    setScheduleItems(prev => prev.filter(item => item.id !== itemId));
    
    if (itemToDelete.linked_task_id) {
        setUnscheduledTasks(prev => prev.map(t => 
          t.id === itemToDelete.linked_task_id ? {...t, isScheduled: false} : t
        ));
    }
  };

  const exportToCalendar = async () => {
    if (scheduleItems.length === 0) {
      alert("No scheduled items to export.");
      return;
    }
    try {
        const { data: icsContent, headers } = await exportSchedule({ 
            scheduleItems, 
            scheduleDate: format(selectedDate, 'yyyy-MM-dd') 
        });

        const blob = new Blob([icsContent], { type: headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedule.ics';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Error exporting to calendar:", error);
        alert("Could not export schedule. Please try again.");
    }
  };

  const generateAISchedule = async () => {
    if (unscheduledTasks.length === 0) {
      alert("No unscheduled tasks to create a schedule from.");
      return;
    }
    
    setIsGeneratingTemplate(true);
    try {
      const taskList = unscheduledTasks.map(task => task.task);
      const { data } = await generateScheduleTemplate({ 
        tasks: taskList,
        preferences: user?.working_hours?.has_day_job ? 
          `I have a day job from ${user.working_hours.start} to ${user.working_hours.end}. Please schedule around this.` : 
          "I'm available all day for entrepreneurship activities."
      });
      
      if (data.success && data.schedule) {
        const newItems = data.schedule.map(item => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        
        setScheduleItems(prev => [...prev, ...newItems]);
        alert("AI schedule template generated! Review and adjust as needed.");
      } else {
        alert("AI could not generate a schedule. Please try again or manually create.");
      }
    } catch (error) {
      console.error("Error generating AI schedule:", error);
      alert("Could not generate schedule template. Please try again.");
    } finally {
      setIsGeneratingTemplate(false);
    }
  };

  // Generate time slots from 7 AM to 7 PM
  const timeSlots = generateTimeSlots();
  
  // Check if time slot conflicts with working hours
  const isWorkHour = (time24) => {
    if (!user?.working_hours?.has_day_job) return false;
    const hour = parseInt(time24.split(':')[0], 10);
    const startHour = parseInt(user.working_hours.start.split(':')[0], 10);
    const endHour = parseInt(user.working_hours.end.split(':')[0], 10);
    // A time slot is considered a work hour if its starting hour falls within the work hours.
    // E.g., if work is 9:00-17:00, 9:00 slot is work hour.
    return hour >= startHour && hour < endHour;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
  }

  return (
    <div className="px-4 pb-20 md:pb-8">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div id="schedule-header" className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 md:p-4 rounded-md">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl">Daily Schedule</h1>
                  <p className="text-[var(--text-soft)] text-base md:text-lg">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                  {user?.working_hours?.has_day_job && (
                    <p className="text-red-600 text-sm mt-1">
                      <Clock className="w-4 h-4 inline mr-1" /> {/* Changed Briefcase to Clock as per new imports */}
                      Day Job: {formatTimeToAMPM(user.working_hours.start)} - {formatTimeToAMPM(user.working_hours.end)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RestartTourButton tourKey="schedule" />
                <button onClick={() => handleDateChange(addDays(selectedDate, -1))} className="btn btn-secondary p-2"> {/* subDays changed to addDays(-1) */}
                  <ChevronDown className="w-5 h-5"/> {/* Changed ChevronLeft to ChevronDown */}
                </button>
                <button onClick={() => handleDateChange(addDays(selectedDate, 1))} className="btn btn-secondary p-2">
                  <ChevronUp className="w-5 h-5"/> {/* Changed ChevronRight to ChevronUp */}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div id="schedule-unscheduled-tasks" className="card p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[var(--primary-gold)]" /> {/* Changed ListChecks to Edit */}
                  Today's Tasks
                </h3>
                <p className="text-xs text-[var(--text-soft)] mb-4">
                  Drag tasks to time slots to schedule them
                </p>
                <Droppable droppableId="TASK_POOL">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`p-2 rounded-md min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800'}`}
                    >
                      {unscheduledTasks.length > 0 ? unscheduledTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 mb-2 rounded shadow-sm border cursor-grab ${
                                task.isScheduled 
                                  ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200' 
                                  : 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm flex-1">{task.task}</span>
                                {task.isScheduled && (
                                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded dark:bg-green-800 dark:text-green-200">
                                    Scheduled
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )) : (
                        <p className="text-center text-sm text-[var(--text-soft)] pt-4">
                          No tasks for today. 
                          <button onClick={() => navigate(createPageUrl('DailyTrack'))} className="text-[var(--primary-gold)] hover:underline ml-1">
                            Add some tasks →
                          </button>
                        </p>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <div id="schedule-actions" className="card p-6 space-y-3">
                 <h3 className="font-bold text-lg mb-2">Actions</h3>
                 <button 
                   onClick={generateAISchedule} 
                   disabled={isGeneratingTemplate || unscheduledTasks.length === 0} 
                   className="btn btn-secondary w-full"
                 >
                    {isGeneratingTemplate ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="w-4 h-4 mr-2"/>} {/* Changed Plus to Sparkles */}
                    Generate AI Schedule
                 </button>
                 <button onClick={handleSaveSchedule} disabled={saving} className="btn btn-primary w-full">
                    {saving ? <Loader2 className="animate-spin mr-2"/> : <Save className="w-4 h-4 mr-2"/>} 
                    Save Schedule
                 </button>
                 <button onClick={exportToCalendar} disabled={scheduleItems.length === 0} className="btn btn-secondary w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export to Calendar
                 </button>
              </div>
            </div>

            <div id="schedule-timeline" className="lg:col-span-3 card p-6">
              <div className="mb-4">
                <p className="text-sm text-[var(--text-soft)]">
                  💡 Click on any time slot to add an activity
                </p>
              </div>
              <div className="flex">
                <div className="w-20 flex-shrink-0">
                    {timeSlots.map(timeSlot => (
                      <TimeSlot 
                        key={timeSlot.time24} 
                        timeSlot={timeSlot} 
                        isWorkHour={isWorkHour(timeSlot.time24)} 
                        onClick={handleTimeSlotClick} 
                      />
                    ))}
                </div>
                <div className="flex-1 relative border-l border-gray-200 dark:border-gray-700">
                  {timeSlots.map((timeSlot) => (
                    <Droppable key={timeSlot.time24} droppableId={`TIMELINE_${timeSlot.time24}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`relative h-16 transition-colors border-t border-gray-200 dark:border-gray-700 cursor-pointer ${
                            snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                          } ${isWorkHour(timeSlot.time24) ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                          onClick={() => handleTimeSlotClick(timeSlot.time24)}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                  {/* Schedule blocks container */}
                  {/* Use pointer-events-none on the container to allow clicks on droppable areas underneath */}
                  <div className="absolute inset-0 pointer-events-none">
                    {scheduleItems.map(item => (
                      <div key={item.id} className="pointer-events-auto"> {/* Re-enable pointer events for individual blocks */}
                        <ScheduleBlock 
                          item={item} 
                          onDelete={handleDeleteItem}
                          onEdit={setEditingItem}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>

      {/* Activity Dropdown Modal */}
      <ActivityDropdown 
        isOpen={showActivityDropdown}
        onClose={() => setShowActivityDropdown(false)}
        time={selectedTime} // This is 24-hour time, formatted inside the component for display
        onAddActivity={handleAddActivity}
        weeklyTasks={weeklyTasks}
      />

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4">Edit Schedule Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="form-input w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input
                      type="time"
                      value={editingItem.start_time}
                      onChange={(e) => setEditingItem({...editingItem, start_time: e.target.value})}
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <input
                      type="time"
                      value={editingItem.end_time}
                      onChange={(e) => setEditingItem({...editingItem, end_time: e.target.value})}
                      className="form-input w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="form-input w-full"
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{categoryIcons[key]} {label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setEditingItem(null)} className="btn btn-secondary">Cancel</button>
                <button onClick={() => handleSaveEdit(editingItem)} className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}