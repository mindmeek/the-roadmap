
import React, { useState, useEffect } from 'react';
import { User, DailyProgress } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, subDays, eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-lg">
        <p className="label font-semibold">{`${format(new Date(label), 'MMM d')}`}</p>
        <p className="intro text-[var(--primary-gold)]">{`Progress: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const CalendarHeatmap = ({ data }) => {
    const today = new Date();
    const days = eachDayOfInterval({ start: subDays(today, 89), end: today });
    const dayMap = new Map(data.map(d => [d.date, d.progress_percentage]));

    const getDayColor = (progress) => {
        if (progress === undefined) return 'bg-gray-100';
        if (progress === 0) return 'bg-gray-200';
        if (progress < 25) return 'bg-yellow-200';
        if (progress < 50) return 'bg-yellow-300';
        if (progress < 75) return 'bg-[var(--primary-gold)] opacity-70';
        return 'bg-[var(--primary-gold)]';
    }

    return (
        <div className="grid grid-cols-13 gap-1.5">
            {days.map(day => {
                const dateString = format(day, 'yyyy-MM-dd');
                const progress = dayMap.get(dateString);
                return (
                    <div key={dateString} className="aspect-square rounded-sm tooltip" data-tip={`${dateString}: ${progress || 0}%`}>
                        <div className={`w-full h-full ${getDayColor(progress)} rounded-sm`}></div>
                    </div>
                )
            })}
        </div>
    )
}


export default function ProgressPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      if (!userData.onboarding_completed) {
        navigate(createPageUrl("Onboarding"));
        return;
      }
      setUser(userData);

      const allProgress = await DailyProgress.filter({ created_by: userData.email }, "-date", 365);
      setProgressData(allProgress.sort((a, b) => new Date(a.date) - new Date(b.date)));
      
    } catch (e) {
      console.error("Failed to load progress data", e);
      navigate(createPageUrl("Onboarding"));
    }
    setLoading(false);
  };
  
  const getStats = () => {
      if (progressData.length === 0) return { avg: 0, total: 0, streak: 0 };
      
      const total = progressData.reduce((sum, p) => sum + p.progress_percentage, 0);
      const avg = Math.round(total / progressData.length);
      
      let streak = 0;
      if (progressData.length > 0) {
          const today = new Date();
          const dates = new Set(progressData.map(p => p.date));
          for (let i = 0; i < 365; i++) {
              const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
              if (dates.has(checkDate)) {
                  streak++;
              } else {
                  break;
              }
          }
      }

      return { avg, total, streak };
  }
  
  const chartData = progressData.slice(-30).map(p => ({
      date: p.date,
      progress: p.progress_percentage
  }));

  const stats = getStats();


  if (loading) {
    return <div className="px-4 text-center">Loading your progress...</div>;
  }

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="card p-6 md:p-8">
          <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
            <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl">Your Progress</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg">Visualizing your journey, one day at a time.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
                <h3 className="font-semibold text-[var(--text-main)] mb-2">Days Tracked</h3>
                <p className="text-4xl font-bold text-[var(--primary-gold)]">{progressData.length}</p>
                <p className="text-sm text-[var(--text-soft)]">Total entries logged</p>
            </div>
            <div className="card p-6">
                <h3 className="font-semibold text-[var(--text-main)] mb-2">Average Daily Progress</h3>
                <p className="text-4xl font-bold text-[var(--primary-gold)]">{stats.avg}%</p>
                <p className="text-sm text-[var(--text-soft)]">Across all tracked days</p>
            </div>
            <div className="card p-6">
                <h3 className="font-semibold text-[var(--text-main)] mb-2">Current Streak</h3>
                <p className="text-4xl font-bold text-[var(--primary-gold)]">{stats.streak}</p>
                <p className="text-sm text-[var(--text-soft)]">Consecutive days tracked</p>
            </div>
        </div>

        <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--text-main)] mb-1">Last 30 Days Progress</h2>
            <p className="text-sm text-[var(--text-soft)] mb-4">Track your daily progress percentage over the last month to see trends and maintain momentum.</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'd MMM')} stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="progress" stroke="var(--primary-gold)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--text-main)] mb-1">90-Day Activity Heatmap</h2>
            <p className="text-sm text-[var(--text-soft)] mb-4">Visualize your consistency over the last 90 days. Each square represents a day, with darker colors indicating higher progress.</p>
             <style>{`.grid-cols-13 { grid-template-columns: repeat(13, minmax(0, 1fr)); }`}</style>
             <CalendarHeatmap data={progressData} />
             <div className="flex items-center justify-end space-x-4 text-xs text-[var(--text-soft)] mt-2">
                 <span>Less</span>
                 <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                 <div className="w-3 h-3 bg-yellow-200 rounded-sm"></div>
                 <div className="w-3 h-3 bg-yellow-300 rounded-sm"></div>
                 <div className="w-3 h-3 bg-[var(--primary-gold)] opacity-70 rounded-sm"></div>
                 <div className="w-3 h-3 bg-[var(--primary-gold)] rounded-sm"></div>
                 <span>More</span>
             </div>
        </div>

      </div>
    </div>
  );
}
