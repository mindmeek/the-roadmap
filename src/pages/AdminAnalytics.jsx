import React, { useState, useEffect } from 'react';
import { BarChart, Users, Eye, TrendingUp, ArrowLeft, Calendar, MessageSquare, Target, Award, Clock, UserCheck, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User, DailyProgress, CommunityPost, Comment, Event, Connection, AccountabilityPartner } from '@/entities/all';
import { format, subDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

const MetricCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        purple: "bg-purple-100 text-purple-600",
        orange: "bg-orange-100 text-orange-600",
        red: "bg-red-100 text-red-600"
    };

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--text-soft)]">{title}</p>
                    <p className="text-2xl font-bold text-[var(--text-main)]">{value}</p>
                    {change !== undefined && (
                        <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change >= 0 ? '+' : ''}{change}% from last period
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

const ChartCard = ({ title, children }) => (
    <div className="card p-6">
        <h3 className="text-lg font-semibold text-[var(--text-main)] mb-4">{title}</h3>
        {children}
    </div>
);

export default function AdminAnalytics() {
    const [loading, setLoading] = useState(true);
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        newUsersThisWeek: 0,
        activeUsers: 0,
        totalPosts: 0,
        postsThisWeek: 0,
        totalComments: 0,
        avgDailyProgress: 0,
        completionRate: 0,
        upcomingEvents: 0,
        activePartnerships: 0
    });
    const [userGrowth, setUserGrowth] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [subscriptionBreakdown, setSubscriptionBreakdown] = useState([]);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const now = new Date();
            const weekAgo = subDays(now, 7);
            const monthAgo = subDays(now, 30);

            // Fetch all data in parallel
            const [
                allUsers,
                recentUsers,
                allProgress,
                allPosts,
                recentPosts,
                allComments,
                allEvents,
                allConnections,
                allPartnerships
            ] = await Promise.all([
                User.list('-created_date', 1000),
                User.filter({ created_date: { $gte: weekAgo.toISOString() } }, '-created_date'),
                DailyProgress.list('-created_date', 500),
                CommunityPost.list('-created_date', 500),
                CommunityPost.filter({ created_date: { $gte: weekAgo.toISOString() } }, '-created_date'),
                Comment.list('-created_date', 1000),
                Event.list('-created_date', 100),
                Connection.list('-created_date', 200),
                AccountabilityPartner.filter({ status: 'active' }, '-created_date')
            ]);

            // Calculate metrics
            const activeUsers = allUsers.filter(user => {
                const lastActive = user.updated_date ? new Date(user.updated_date) : new Date(user.created_date);
                return lastActive >= monthAgo;
            }).length;

            const avgProgress = allProgress.length > 0 
                ? allProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / allProgress.length 
                : 0;

            const usersWithProgress = new Set(allProgress.map(p => p.created_by)).size;
            const completionRate = allUsers.length > 0 ? (usersWithProgress / allUsers.length) * 100 : 0;

            const upcomingEvents = allEvents.filter(event => {
                const eventDate = new Date(event.event_date);
                return eventDate > now && event.is_published;
            }).length;

            setMetrics({
                totalUsers: allUsers.length,
                newUsersThisWeek: recentUsers.length,
                activeUsers,
                totalPosts: allPosts.length,
                postsThisWeek: recentPosts.length,
                totalComments: allComments.length,
                avgDailyProgress: Math.round(avgProgress),
                completionRate: Math.round(completionRate),
                upcomingEvents,
                activePartnerships: allPartnerships.length
            });

            // Generate user growth chart data (last 30 days)
            const growthData = [];
            for (let i = 29; i >= 0; i--) {
                const date = subDays(now, i);
                const dateStr = format(date, 'yyyy-MM-dd');
                const usersOnDate = allUsers.filter(user => {
                    const userDate = format(new Date(user.created_date), 'yyyy-MM-dd');
                    return userDate <= dateStr;
                }).length;
                
                growthData.push({
                    date: format(date, 'MMM dd'),
                    users: usersOnDate
                });
            }
            setUserGrowth(growthData.slice(-7)); // Show last 7 days

            // Generate activity data (posts and comments per day)
            const activityChart = [];
            for (let i = 6; i >= 0; i--) {
                const date = subDays(now, i);
                const dateStr = format(date, 'yyyy-MM-dd');
                
                const postsOnDate = allPosts.filter(post => 
                    format(new Date(post.created_date), 'yyyy-MM-dd') === dateStr
                ).length;
                
                const commentsOnDate = allComments.filter(comment => 
                    format(new Date(comment.created_date), 'yyyy-MM-dd') === dateStr
                ).length;
                
                activityChart.push({
                    date: format(date, 'MMM dd'),
                    posts: postsOnDate,
                    comments: commentsOnDate
                });
            }
            setActivityData(activityChart);

            // Subscription breakdown
            const subscriptionCounts = allUsers.reduce((acc, user) => {
                const level = user.subscription_level || 'free';
                acc[level] = (acc[level] || 0) + 1;
                return acc;
            }, {});

            setSubscriptionBreakdown(Object.entries(subscriptionCounts).map(([level, count]) => ({
                level: level.charAt(0).toUpperCase() + level.slice(1),
                count,
                percentage: Math.round((count / allUsers.length) * 100)
            })));

        } catch (error) {
            console.error('Error loading analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="card p-8 text-center">
                        <div className="animate-pulse text-[var(--text-soft)]">Loading analytics...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <Link to={createPageUrl('Admin')} className="btn btn-ghost p-2 -ml-2 hidden md:inline-flex">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--text-main)]">Analytics Dashboard</h1>
                            <p className="text-[var(--text-soft)] mt-1">Platform insights and key metrics</p>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Users"
                        value={metrics.totalUsers}
                        change={((metrics.newUsersThisWeek / Math.max(metrics.totalUsers - metrics.newUsersThisWeek, 1)) * 100).toFixed(1)}
                        icon={Users}
                        color="blue"
                    />
                    <MetricCard
                        title="Active Users (30d)"
                        value={metrics.activeUsers}
                        change={((metrics.activeUsers / metrics.totalUsers) * 100 - 70).toFixed(1)}
                        icon={UserCheck}
                        color="green"
                    />
                    <MetricCard
                        title="Community Posts"
                        value={metrics.totalPosts}
                        change={((metrics.postsThisWeek / Math.max(metrics.totalPosts - metrics.postsThisWeek, 1)) * 100).toFixed(1)}
                        icon={MessageSquare}
                        color="purple"
                    />
                    <MetricCard
                        title="Avg Progress"
                        value={`${metrics.avgDailyProgress}%`}
                        icon={Target}
                        color="orange"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Comments"
                        value={metrics.totalComments}
                        icon={MessageSquare}
                        color="blue"
                    />
                    <MetricCard
                        title="Completion Rate"
                        value={`${metrics.completionRate}%`}
                        icon={Award}
                        color="green"
                    />
                    <MetricCard
                        title="Upcoming Events"
                        value={metrics.upcomingEvents}
                        icon={Calendar}
                        color="purple"
                    />
                    <MetricCard
                        title="Active Partnerships"
                        value={metrics.activePartnerships}
                        icon={Users}
                        color="orange"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <ChartCard title="User Growth (Last 7 Days)">
                        <div className="h-64 flex items-end justify-between space-x-2">
                            {userGrowth.map((day, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div 
                                        className="bg-blue-500 w-full rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                                        style={{ 
                                            height: `${(day.users / Math.max(...userGrowth.map(d => d.users))) * 200}px`,
                                            minHeight: '4px'
                                        }}
                                        title={`${day.users} users`}
                                    />
                                    <span className="text-xs text-[var(--text-soft)] mt-2">{day.date}</span>
                                </div>
                            ))}
                        </div>
                    </ChartCard>

                    {/* Activity Chart */}
                    <ChartCard title="Daily Activity (Posts & Comments)">
                        <div className="h-64 flex items-end justify-between space-x-2">
                            {activityData.map((day, index) => {
                                const maxActivity = Math.max(...activityData.map(d => d.posts + d.comments));
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div className="w-full flex flex-col">
                                            <div 
                                                className="bg-purple-500 w-full transition-all duration-300 hover:bg-purple-600"
                                                style={{ 
                                                    height: `${(day.posts / Math.max(maxActivity, 1)) * 150}px`,
                                                    minHeight: day.posts > 0 ? '2px' : '0px'
                                                }}
                                                title={`${day.posts} posts`}
                                            />
                                            <div 
                                                className="bg-green-500 w-full transition-all duration-300 hover:bg-green-600"
                                                style={{ 
                                                    height: `${(day.comments / Math.max(maxActivity, 1)) * 150}px`,
                                                    minHeight: day.comments > 0 ? '2px' : '0px'
                                                }}
                                                title={`${day.comments} comments`}
                                            />
                                        </div>
                                        <span className="text-xs text-[var(--text-soft)] mt-2">{day.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                <span className="text-xs text-[var(--text-soft)]">Posts</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                <span className="text-xs text-[var(--text-soft)]">Comments</span>
                            </div>
                        </div>
                    </ChartCard>
                </div>

                {/* Subscription Breakdown */}
                <ChartCard title="Subscription Breakdown">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {subscriptionBreakdown.map((sub, index) => (
                            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-2xl font-bold text-[var(--text-main)]">{sub.count}</div>
                                <div className="text-sm font-medium text-[var(--text-main)]">{sub.level}</div>
                                <div className="text-xs text-[var(--text-soft)]">{sub.percentage}%</div>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}