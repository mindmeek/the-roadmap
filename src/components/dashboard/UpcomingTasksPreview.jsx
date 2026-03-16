import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Target, ChevronRight, Plus, ArrowRight } from 'lucide-react';
import moment from 'moment';

export default function UpcomingTasksPreview({ todayProgress }) {
  const nextDayTasks = todayProgress?.next_day_focus_tasks || [];
  const unfinishedToday = (todayProgress?.daily_tasks || []).filter(t => !t.completed);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          Tomorrow's Focus
        </h3>
        <Link
          to={createPageUrl('DailyTrack')}
          className="text-sm text-[var(--primary-gold)] hover:underline flex items-center"
        >
          Plan <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Unfinished tasks from today */}
      {unfinishedToday.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-2">⚠️ Still pending today ({unfinishedToday.length})</p>
          <div className="space-y-1">
            {unfinishedToday.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="text-xs text-[var(--text-main)] truncate">{task.task}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tomorrow's planned focus */}
      {nextDayTasks.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-soft)] mb-2">Planned for tomorrow</p>
          {nextDayTasks.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-500">{index + 1}</span>
              </div>
              <p className="text-sm text-[var(--text-main)]">{item.task}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Target className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-[var(--text-soft)] text-sm mb-4">
            {unfinishedToday.length === 0 ? "No tasks planned for tomorrow yet" : "Set your focus for tomorrow"}
          </p>
          <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Plan Tomorrow
          </Link>
        </div>
      )}
    </div>
  );
}