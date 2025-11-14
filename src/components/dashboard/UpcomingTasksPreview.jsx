import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Schedule, User } from '@/entities/all';
import { Calendar, Clock, Zap, ChevronRight, Plus } from 'lucide-react';
import moment from 'moment';

export default function UpcomingTasksPreview() {
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUpcomingTasks();
  }, []);

  const loadUpcomingTasks = async () => {
    try {
      const user = await User.me();
      const today = moment().format('YYYY-MM-DD');
      
      const schedules = await Schedule.filter(
        { created_by: user.email, date: today },
        '-updated_date',
        1
      );

      if (schedules.length > 0 && schedules[0].items) {
        const now = moment();
        const upcoming = schedules[0].items
          .filter(item => {
            const itemTime = moment(item.start_time, 'HH:mm');
            return itemTime.isAfter(now);
          })
          .sort((a, b) => moment(a.start_time, 'HH:mm').diff(moment(b.start_time, 'HH:mm')))
          .slice(0, 3);
        
        setUpcomingTasks(upcoming);
      }
    } catch (error) {
      console.error('Error loading upcoming tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      deep_work: 'bg-purple-500',
      meetings: 'bg-blue-500',
      learning: 'bg-green-500',
      admin: 'bg-gray-500',
      breaks: 'bg-orange-500',
      personal: 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
          Upcoming Today
        </h3>
        <Link 
          to={createPageUrl('Schedule')} 
          className="text-sm text-[var(--primary-gold)] hover:underline flex items-center"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {upcomingTasks.length > 0 ? (
        <div className="space-y-3">
          {upcomingTasks.map((task, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className={`${getCategoryColor(task.category)} w-1 rounded-full flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[var(--text-main)] truncate">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[var(--text-soft)]" />
                  <span className="text-xs text-[var(--text-soft)]">
                    {task.start_time} - {task.end_time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-[var(--text-soft)] text-sm mb-4">No scheduled tasks for today</p>
          <Link to={createPageUrl('Schedule')} className="btn btn-primary text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Your Schedule
          </Link>
        </div>
      )}
    </div>
  );
}