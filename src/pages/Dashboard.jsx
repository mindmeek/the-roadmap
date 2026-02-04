import React, { useState, useEffect } from 'react';
import { User, DailyProgress, StrategyDocument, Business, AnnualPlan, RoadmapContent, BusinessMilestone } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import {
    Loader2,
    TrendingUp,
    Users,
    Calendar,
    ChevronRight,
    CheckCircle,
    Sparkles,
    Target,
    Zap,
    ArrowRight,
    Rocket,
    MessageSquare,
    Map,
    Briefcase,
    DollarSign,
    Eye,
    Brain,
    BarChart3,
    Clock,
    CheckCircle2,
    Circle,
    AlertCircle,
    PlayCircle
} from 'lucide-react';
import moment from 'moment';

import AITeamModal from '../components/ai/AITeamModal';
import { AI_TEAM_MEMBERS } from '../components/ai/aiTeamInfo';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [todayProgress, setTodayProgress] = useState(null);
    const [business, setBusiness] = useState(null);
    const [annualPlan, setAnnualPlan] = useState(null);
    const [roadmapContent, setRoadmapContent] = useState(null);
    const [milestones, setMilestones] = useState([]);
    const [strategyDocs, setStrategyDocs] = useState([]);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiAssistantType, setAiAssistantType] = useState('elyzet');
    const [hasJourney, setHasJourney] = useState(false);
    

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            const userHasJourney = !!(currentUser.journey_start_date && currentUser.selected_goal);
            setHasJourney(userHasJourney);

            // Load today's progress
            const today = new Date().toISOString().split('T')[0];
            const progressRecords = await base44.entities.DailyProgress.filter({ 
                created_by: currentUser.email, 
                date: today 
            });
            if (progressRecords.length > 0) {
                setTodayProgress(progressRecords[0]);
            }

            // Load business data
            const businesses = await base44.entities.Business.filter({ owner_user_id: currentUser.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
                
                // Load milestones for this business
                const businessMilestones = await base44.entities.BusinessMilestone.filter({ 
                    business_id: businesses[0].id 
                }, '-created_date', 5);
                setMilestones(businessMilestones);
            }

            // Load annual plan
            const plans = await base44.entities.AnnualPlan.filter({ created_by: currentUser.email }, '-created_date', 1);
            if (plans.length > 0) {
                setAnnualPlan(plans[0]);
            }

            // Load roadmap content for journey
            if (currentUser.selected_goal) {
                const roadmaps = await base44.entities.RoadmapContent.filter({ content_key: currentUser.selected_goal });
                if (roadmaps.length > 0) {
                    setRoadmapContent(roadmaps[0]);
                }
            }

            // Load key strategy documents
            const docs = await base44.entities.StrategyDocument.filter({ created_by: currentUser.email });
            setStrategyDocs(docs);

        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getNextAction = () => {
        if (!todayProgress || todayProgress.daily_tasks?.length === 0) {
            return { text: "Track your first daily task", link: "DailyTrack", icon: TrendingUp };
        }
        
        const completedTasks = todayProgress.daily_tasks?.filter(t => t.completed).length || 0;
        const totalTasks = todayProgress.daily_tasks?.length || 0;
        
        if (completedTasks < totalTasks) {
            return { text: "Complete today's tasks", link: "DailyTrack", icon: CheckCircle };
        }
        
        if (milestones.some(m => m.status === 'in_progress')) {
            return { text: "Update milestone progress", link: "BusinessOverview", icon: Target };
        }
        
        if (!business) {
            return { text: "Set up your business profile", link: "BusinessOverview", icon: Briefcase };
        }
        
        return { text: "Plan tomorrow's tasks", link: "DailyTrack", icon: Calendar };
    };

    const openAIAssistant = (assistantType) => {
        setAiAssistantType(assistantType);
        setShowAIAssistant(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-10">
                <p className="text-[var(--text-soft)]">Please log in to access your dashboard.</p>
            </div>
        );
    }

    if (!hasJourney) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 opacity-90"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2
                }}></div>
                
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-2xl"
                        >
                            <Rocket className="w-12 h-12 text-purple-600" />
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Ready to Build Your Business?
                        </h1>
                        <p className="text-xl text-white/90 mb-8">
                            Choose your 90-day journey and get a personalized roadmap to success
                        </p>
                        
                        {user?.subscription_level === 'free' && (
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 text-white">
                                <p className="text-sm">
                                    <strong>Free Member:</strong> You get ONE 90-day journey that you can restart unlimited times. 
                                    All progress is saved forever.
                                </p>
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to={createPageUrl('FocusedPrograms')} className="btn bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl">
                                <Sparkles className="w-5 h-5 mr-2" />
                                Start My Journey
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const completedTasksToday = todayProgress?.daily_tasks?.filter(t => t.completed).length || 0;
    const totalTasksToday = todayProgress?.daily_tasks?.length || 0;
    const tasksProgress = totalTasksToday > 0 ? Math.round((completedTasksToday / totalTasksToday) * 100) : 0;
    
    const strategyToolsCompleted = strategyDocs.length;
    const totalStrategyTools = 8; // Define Your Why, Ideal Client, BMC, Value Prop, Customer Journey, Brand, SWOT, Pricing
    const strategyProgress = Math.round((strategyToolsCompleted / totalStrategyTools) * 100);
    
    const nextAction = getNextAction();
    
    // Get current week/month from journey
    const getJourneyProgress = () => {
        if (!user?.journey_start_date || !roadmapContent) return null;
        const startDate = new Date(user.journey_start_date);
        const today = new Date();
        const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const currentWeek = Math.min(Math.floor(daysPassed / 7) + 1, 12);
        const currentMonth = Math.min(Math.floor(daysPassed / 30) + 1, 3);
        return { currentWeek, currentMonth, daysPassed, totalDays: 90 };
    };
    
    const journeyProgress = getJourneyProgress();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
                
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl mb-8"
                    style={{ 
                        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/95 via-purple-900/90 to-pink-900/85"></div>
                    
                    <div className="relative z-10 p-8 md:p-12">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                            <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">
                                {user?.entrepreneurship_stage ? `${user.entrepreneurship_stage} Stage` : 'Your Journey'}
                            </span>
                        </motion.div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
                            Welcome Back, {user?.first_name || 'Entrepreneur'}! 👋
                        </h1>
                        <p className="text-xl text-white/90 mb-6 max-w-2xl">
                            {business?.name ? `Building ${business.name}` : 'Building your vision'} - one strategic step at a time
                        </p>
                        
                        {/* Journey Progress Bar */}
                        {journeyProgress && (
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-semibold">90-Day Journey Progress</span>
                                    <span className="text-yellow-400 font-bold">{journeyProgress.daysPassed} / 90 days</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(journeyProgress.daysPassed / 90) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full"
                                    />
                                </div>
                                <div className="mt-3 text-sm text-white/80">
                                    Week {journeyProgress.currentWeek} of 12 • Month {journeyProgress.currentMonth} of 3
                                </div>
                            </div>
                        )}
                        
                        <div className="flex flex-wrap gap-3">
                            <Link to={createPageUrl(nextAction.link)} className="btn bg-white text-purple-900 hover:bg-gray-100 font-bold shadow-xl">
                                <nextAction.icon className="w-5 h-5 mr-2" />
                                {nextAction.text}
                            </Link>
                            <Link to={createPageUrl('Journey')} className="btn bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 font-semibold">
                                <Map className="w-5 h-5 mr-2" />
                                View Full Roadmap
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-3xl font-black text-green-600">{tasksProgress}%</span>
                        </div>
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-1">Daily Progress</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            {completedTasksToday} of {totalTasksToday || 0} tasks completed today
                        </p>
                        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${tasksProgress}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-3xl font-black text-blue-600">{strategyProgress}%</span>
                        </div>
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-1">Foundation Built</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            {strategyToolsCompleted} of {totalStrategyTools} strategy tools completed
                        </p>
                        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${strategyProgress}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-3xl font-black text-purple-600">{milestones.filter(m => m.status !== 'not_started').length}</span>
                        </div>
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-1">Active Goals</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            {milestones.filter(m => m.status === 'achieved').length} achieved • {milestones.filter(m => m.status === 'in_progress').length} in progress
                        </p>
                        <Link to={createPageUrl('BusinessOverview')} className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center">
                            View all <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Strategic Milestones */}
                {milestones.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-xl">
                                    <Target className="w-6 h-6 text-yellow-600" />
                                </div>
                                Strategic Milestones & Goals
                            </h2>
                            <Link to={createPageUrl('BusinessOverview')} className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1">
                                View All <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {milestones.slice(0, 6).map((milestone, index) => (
                                <motion.div
                                    key={milestone.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            {milestone.status === 'achieved' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                            {milestone.status === 'in_progress' && <Clock className="w-5 h-5 text-blue-500" />}
                                            {milestone.status === 'blocked' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                            {milestone.status === 'not_started' && <Circle className="w-5 h-5 text-gray-400" />}
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                            milestone.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                            milestone.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                            milestone.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                            {milestone.priority}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-2">{milestone.title}</h3>
                                    {milestone.target_metric && (
                                        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                                            🎯 {milestone.target_metric}
                                        </p>
                                    )}
                                    {milestone.due_date && (
                                        <p className="text-xs text-[var(--text-soft)]">
                                            Due: {new Date(milestone.due_date).toLocaleDateString()}
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Foundation Strategy Tools */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
                                <Map className="w-6 h-6 text-indigo-600" />
                            </div>
                            Foundation Strategy Tools
                        </h2>
                        <Link to={createPageUrl('MyFoundationRoadmap')} className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
                            View All <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Define Your WHY', type: 'define_your_why', icon: Target, color: 'from-red-500 to-pink-500' },
                            { name: 'Ideal Client', type: 'ideal_client', icon: Users, color: 'from-blue-500 to-cyan-500' },
                            { name: 'Business Model Canvas', type: 'business_model_canvas', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
                            { name: 'Value Proposition', type: 'value_proposition', icon: Zap, color: 'from-yellow-500 to-orange-500' },
                        ].map((tool) => {
                            const completed = strategyDocs.some(doc => doc.document_type === tool.type);
                            return (
                                <Link
                                    key={tool.type}
                                    to={createPageUrl('MyFoundationRoadmap')}
                                    className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br hover:scale-105 transition-all duration-300 group"
                                    style={{ 
                                        backgroundImage: `linear-gradient(135deg, ${completed ? '#10b981' : '#6b7280'}, ${completed ? '#059669' : '#4b5563'})`
                                    }}
                                >
                                    <div className="relative z-10">
                                        <tool.icon className="w-8 h-8 text-white mb-3" />
                                        <h3 className="text-white font-bold mb-1">{tool.name}</h3>
                                        <div className="flex items-center gap-1">
                                            {completed ? (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                    <span className="text-xs text-white/90">Complete</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Circle className="w-4 h-4 text-white/70" />
                                                    <span className="text-xs text-white/70">Not Started</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Financial Snapshot */}
                {business && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg border-2 border-green-200 dark:border-green-700 mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-500 p-3 rounded-xl">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-[var(--text-main)]">Financial Snapshot</h2>
                                <p className="text-sm text-[var(--text-soft)]">Your path to financial freedom</p>
                            </div>
                        </div>
                        
                        {user?.freedom_number && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-1">Freedom Number</p>
                                    <p className="text-3xl font-black text-green-600">${user.freedom_number?.toLocaleString()}</p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">Monthly revenue goal</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-1">Products/Services</p>
                                    <p className="text-3xl font-black text-blue-600">{user?.products?.length || 0}</p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">Active offerings</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-1">Monthly Expenses</p>
                                    <p className="text-3xl font-black text-orange-600">${user?.monthly_expenses?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">Baseline to cover</p>
                                </div>
                            </div>
                        )}
                        
                        <Link to={createPageUrl('FreedomCalculator')} className="btn w-full mt-4 bg-green-600 hover:bg-green-700 text-white justify-center">
                            <BarChart3 className="w-5 h-5 mr-2" />
                            Update Financial Goals
                        </Link>
                    </motion.div>
                )}

                {/* AI Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-700 mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-[var(--text-main)]">Your AI Business Team</h2>
                            <p className="text-sm text-[var(--text-soft)]">Get expert guidance 24/7</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                        {AI_TEAM_MEMBERS.slice(0, 6).map((member, index) => (
                            <motion.button
                                key={member.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                                onClick={() => openAIAssistant(member.id)}
                                className="bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all group text-center"
                            >
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{member.avatar}</div>
                                <div className="font-bold text-sm text-[var(--text-main)]">{member.name}</div>
                                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">{member.role}</div>
                            </motion.button>
                        ))}
                    </div>
                    
                    <Link to={createPageUrl('ElyzetAIAssistants')} className="btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 justify-center">
                        <Users className="w-5 h-5 mr-2" />
                        Meet the Full AI Team
                    </Link>
                </motion.div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link to={createPageUrl('Schedule')} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)]">Daily Scheduler</h3>
                                <p className="text-sm text-[var(--text-soft)]">Plan your day</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={createPageUrl('DailyTrack')} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)]">Daily 1% Tracker</h3>
                                <p className="text-sm text-[var(--text-soft)]">Track progress</p>
                            </div>
                        </div>
                    </Link>

                    <Link to={createPageUrl('MarketingOverview')} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)]">Marketing Hub</h3>
                                <p className="text-sm text-[var(--text-soft)]">Grow your reach</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Upgrade CTA for Free Users */}
                {user?.subscription_level === 'free' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl mb-8 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-white p-3 rounded-xl">
                                    <Rocket className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        Ready to Accelerate Your Growth?
                                    </h3>
                                    <p className="text-white/90 mb-4">
                                        Unlock unlimited journeys, premium strategy tools, and 24/7 AI support
                                    </p>
                                    <ul className="space-y-2 text-white/90 text-sm mb-6">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            Switch between unlimited 90-day journeys
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            Access all foundation strategy tools
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            Unlimited AI assistant conversations
                                        </li>
                                    </ul>
                                    <Link to={createPageUrl('Upgrade')} className="btn bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-xl">
                                        <Rocket className="w-5 h-5 mr-2" />
                                        Upgrade to The HQ - $99/mo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}



            </div>

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType={aiAssistantType}
                sectionTitle="Dashboard Assistance"
            />
        </div>
    );
}