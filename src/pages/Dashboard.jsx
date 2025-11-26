import React, { useState, useEffect } from 'react';
import { User, DailyProgress, CommunityHighlight, Event, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Loader2,
    TrendingUp,
    Users,
    Calendar,
    ChevronRight,
    Bell,
    CheckCircle,
    Sparkles,
    HelpCircle,
    Target,
    Gift,
    Zap,
    ArrowRight,
    BookOpen,
    Award,
    Rocket
} from 'lucide-react';
import moment from 'moment';

// Component imports
import FoundationRoadmapVisual from '../components/dashboard/FoundationRoadmapVisual';
import JourneyTimeline from '../components/dashboard/JourneyTimeline';
import FinancialSnapshot from '../components/dashboard/FinancialSnapshot';
import GamificationDisplay from '../components/dashboard/GamificationDisplay';
import QuoteOfTheDayCard from '../components/dashboard/QuoteOfTheDayCard';
import ActionCard from '../components/dashboard/ActionCard';
import Tooltip from '../components/common/Tooltip';
import AITeamModal from '../components/ai/AITeamModal';

import UpcomingTasksPreview from '../components/dashboard/UpcomingTasksPreview';
import DailyInsightTabs from '../components/dashboard/DailyInsightTabs';
import MemberActionChecklist from '../components/dashboard/MemberActionChecklist';

// AI Team Info for avatars and names
const AI_TEAM_INFO = {
    elyzet: {
        name: "Elyzet",
        role: "Chief Strategist",
        avatar: "👔",
        color: "from-indigo-500 to-purple-600"
    },
    ava: {
        name: "Ava",
        role: "Marketing Strategist", 
        avatar: "🎯",
        color: "from-pink-500 to-rose-600"
    },
    sam: {
        name: "Sam",
        role: "Social Media Guru",
        avatar: "📱",
        color: "from-blue-500 to-cyan-600"
    },
    charlie: {
        name: "Charlie",
        role: "Content Copywriter",
        avatar: "✍️",
        color: "from-yellow-500 to-orange-600"
    },
    finley: {
        name: "Finley",
        role: "Financial Forecaster",
        avatar: "💰",
        color: "from-green-500 to-emerald-600"
    },
    olivia: {
        name: "Olivia",
        role: "Operations Optimizer",
        avatar: "⚙️",
        color: "from-orange-500 to-amber-600"
    }
};

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [todayProgress, setTodayProgress] = useState(null);
    const [communityHighlights, setCommunityHighlights] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [customerJourneyProgress, setCustomerJourneyProgress] = useState({ completed: 0, total: 5 });
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiAssistantType, setAiAssistantType] = useState('elyzet');
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [hasJourney, setHasJourney] = useState(false);
    

    useEffect(() => {
        loadDashboardData();
        generateAISuggestion();
    }, []);

    const loadDashboardData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            const userHasJourney = !!(currentUser.journey_start_date && currentUser.selected_goal);
            setHasJourney(userHasJourney);



            const today = moment().format('YYYY-MM-DD');
            const progressRecords = await DailyProgress.filter({ 
                created_by: currentUser.email, 
                date: today 
            });
            if (progressRecords.length > 0) {
                setTodayProgress(progressRecords[0]);
            }

            const highlights = await CommunityHighlight.filter({ is_active: true });
            setCommunityHighlights(highlights);

            const now = moment().format('YYYY-MM-DDTHH:mm');
            const events = await Event.filter({ is_published: true });
            const upcoming = events.filter(e => e.event_date >= now).slice(0, 3);
            setUpcomingEvents(upcoming);

            if (currentUser.subscription_level === 'free' && !currentUser.customer_journey_completed_date) {
                const customerJourneyDoc = await StrategyDocument.filter({
                    created_by: currentUser.email,
                    document_type: 'customer_journey'
                });

                if (customerJourneyDoc.length > 0) {
                    const content = customerJourneyDoc[0].content || {};
                    const stages = content.stages || [];
                    const completedCount = stages.filter(stage => stage.isComplete).length;
                    setCustomerJourneyProgress({ completed: completedCount, total: stages.length || 5 });
                } else {
                    setCustomerJourneyProgress({ completed: 0, total: 5 });
                }
            }

        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateAISuggestion = async () => {
        try {
            const currentUser = await User.me();
            
            const suggestions = {
                vision: {
                    assistant: 'elyzet',
                    message: "Ready to clarify your business vision? Elyzet can help you craft a compelling mission statement and strategic foundation.",
                    cta: "Talk to Elyzet"
                },
                startup: {
                    assistant: 'ava',
                    message: "Need help defining your ideal client? Ava can guide you through creating a powerful customer avatar and marketing strategy.",
                    cta: "Talk to Ava"
                },
                growth: {
                    assistant: 'finley',
                    message: "Looking to optimize your pricing? Finley can help you develop a value ladder that maximizes revenue and profitability.",
                    cta: "Talk to Finley"
                }
            };

            const suggestion = suggestions[currentUser.entrepreneurship_stage] || suggestions.vision;
            setAiSuggestion(suggestion);
        } catch (error) {
            console.error('Error generating AI suggestion:', error);
        }
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
            <div className="px-3 sm:px-4 pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="card p-4 sm:p-6" style={{ borderRadius: '2px' }}>
                        <div className="text-center py-6 sm:py-8">
                            <div className="flex justify-center mb-4">
                                <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-3 sm:p-4 rounded-full">
                                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-3">
                                Choose Your 90-Day Journey
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--text-soft)] mb-2 max-w-md mx-auto">
                                Start your personalized roadmap to success. Choose from our focused programs or complete your journey setup.
                            </p>
                            {user.subscription_level === 'free' && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 rounded-lg mb-4 max-w-md mx-auto">
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        <strong>Free Member:</strong> You get ONE 90-day journey that you can restart unlimited times. 
                                        All your notes and progress are saved forever. Upgrade for unlimited goal changes.
                                    </p>
                                </div>
                            )}
                            
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                <Link to={createPageUrl('FocusedPrograms')} className="btn btn-primary flex items-center justify-center">
                                    <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Browse Focused Programs
                                </Link>
                                <Link to={createPageUrl('Onboarding')} className="btn btn-secondary flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Set Up My Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const completedTasksToday = todayProgress?.daily_tasks?.filter(t => t.completed).length || 0;
    const totalTasksToday = todayProgress?.daily_tasks?.length || 0;
    const journeyProgressPercentage = customerJourneyProgress.total > 0 
        ? Math.round((customerJourneyProgress.completed / customerJourneyProgress.total) * 100) 
        : 0;

    const recommendedAgent = aiSuggestion ? AI_TEAM_INFO[aiSuggestion.assistant] : null;

    return (
        <div className="px-3 sm:px-4 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                
                {/* Welcome Hero Section */}
                <div 
                    className="relative overflow-hidden shadow-xl"
                    style={{ 
                        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '2px'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                    
                    <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
                        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-6 text-[var(--primary-gold)] animate-pulse" />
                            <span className="text-[var(--primary-gold)] font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                Your Journey Hub
                            </span>
                            <Tooltip content="This is your central command center where you can track your progress, access your roadmap, and take action on your business goals.">
                                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--primary-gold)] opacity-70 hover:opacity-100" />
                            </Tooltip>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                            Welcome back, {user.first_name || user.full_name}! 👋
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mb-3 sm:mb-4 md:mb-6">
                            Let's make today count - one step closer to your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                            <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Track Today's Progress
                            </Link>
                            <Link to={createPageUrl('MyFoundationRoadmap')} className="btn btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                View Foundation
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Member Action Checklist */}
                <MemberActionChecklist />

                {/* Journey Timeline & Financial Snapshot & Daily Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="lg:col-span-2 h-full">
                        <JourneyTimeline user={user} />
                    </div>
                    <div className="space-y-4 sm:space-y-6 h-full flex flex-col">
                        <FinancialSnapshot user={user} />
                        <DailyInsightTabs />
                    </div>
                </div>

                {/* Today's Progress & Upcoming Tasks - SIDE BY SIDE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Today's Progress */}
                    <div className="card p-4 sm:p-6" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] flex items-center flex-wrap gap-2">
                                <TrendingUp className="w-5 h-5 text-[var(--primary-gold)]" />
                                <span>Today's Progress</span>
                                <Tooltip content="Track your daily 1% improvements. Small, consistent actions compound into massive results over time.">
                                    <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </Tooltip>
                            </h3>
                            <Link to={createPageUrl('DailyTrack')} className="text-[var(--primary-gold)] hover:underline flex items-center text-xs sm:text-sm font-medium">
                                Track More <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        {totalTasksToday > 0 ? (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm text-[var(--text-soft)]">
                                        {completedTasksToday} of {totalTasksToday} tasks completed
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[var(--primary-gold)]">
                                        {Math.round((completedTasksToday / totalTasksToday) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3" style={{ borderRadius: '2px' }}>
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 transition-all"
                                        style={{ width: `${(completedTasksToday / totalTasksToday) * 100}%`, borderRadius: '2px' }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-[var(--text-soft)] mb-4 text-sm">No tasks tracked today yet.</p>
                                <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-sm">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Start Tracking
                                </Link>
                            </div>
                        )}
                    </div>

                    <UpcomingTasksPreview />
                </div>

                {/* Meet Your AI Team */}
                {aiSuggestion && recommendedAgent && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {/* Left: Recommended AI Agent */}
                        <div className={`card p-4 sm:p-6 bg-gradient-to-br ${recommendedAgent.color} text-white shadow-xl hover:shadow-2xl transition-all`} style={{ borderRadius: '2px' }}>
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0 animate-bounce mx-auto sm:mx-0">
                                    {recommendedAgent.avatar}
                                </div>
                                <div className="flex-1 text-center sm:text-left w-full">
                                    <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start flex-wrap">
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide opacity-90">
                                            AI Support for Your Journey
                                        </span>
                                    </div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                                        Meet {recommendedAgent.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3">
                                        {recommendedAgent.role} • Based on your {user.entrepreneurship_stage} stage
                                    </p>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                                        {aiSuggestion.message}
                                    </p>
                                    <button
                                        onClick={() => openAIAssistant(aiSuggestion.assistant)}
                                        className="btn bg-white text-gray-900 hover:bg-gray-100 font-semibold w-full sm:w-auto text-sm sm:text-base"
                                    >
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        {aiSuggestion.cta}
                                    </button>
                                    <p className="text-xs mt-2 sm:mt-3 opacity-75">
                                        💡 {recommendedAgent.name} will guide you to the right Foundation tools
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Meet the Full AI Team */}
                        <div className="card p-4 sm:p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)]" />
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-main)]">
                                    Your AI Business Team
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-2 sm:mb-3">
                                Six expert AI assistants designed to support your entrepreneurial journey. They'll help you work through your Foundation Roadmap, 90-Day Journey, and daily challenges.
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                                <p className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
                                    <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                                    <span><strong>How it works:</strong> Ask questions about your current task, and the AI will provide guidance and direct you to the right tools in your Foundation Roadmap or Journey to implement.</span>
                                </p>
                            </div>
                            
                            {/* Mini AI Team Grid */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                                {Object.entries(AI_TEAM_INFO).map(([key, agent]) => (
                                    <button
                                        key={key}
                                        onClick={() => openAIAssistant(key)}
                                        className="p-2 sm:p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)] hover:shadow-md transition-all text-left bg-white dark:bg-gray-800"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl sm:text-2xl">{agent.avatar}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-xs sm:text-sm text-[var(--text-main)] truncate">
                                                    {agent.name}
                                                </p>
                                                <p className="text-[10px] sm:text-xs text-[var(--text-soft)] truncate">
                                                    {agent.role}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Link 
                                to={createPageUrl('ElyzetAIAssistants')}
                                className="btn btn-secondary w-full justify-center text-xs sm:text-sm"
                            >
                                Learn More About Your AI Team
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Customer Journey Completion Incentive */}
                {user.subscription_level === 'free' && !user.customer_journey_completed_date && (
                    <div className="card p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                        <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="bg-purple-100 dark:bg-purple-800 p-2 sm:p-3 mx-auto sm:mx-0 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                <Gift className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[var(--text-main)] mb-2 flex items-center flex-wrap gap-2 justify-center sm:justify-start">
                                    <span>🎁 Unlock Your Exclusive Discount!</span>
                                    <Tooltip content="Complete your Customer Journey Map to unlock a special 3-month discount on The Business Minds HQ subscription ($49.99/month instead of $99/month).">
                                        <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                                    </Tooltip>
                                </h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-3 sm:mb-4">
                                    Complete your <strong>Customer Journey Map</strong> and unlock <span className="text-purple-600 dark:text-purple-400 font-bold">$49.99/month for 3 months</span> (regular $99/month)!
                                </p>
                                
                                <div className="mb-3 sm:mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs sm:text-sm font-medium text-[var(--text-soft)]">
                                            {customerJourneyProgress.completed} of {customerJourneyProgress.total} stages complete
                                        </span>
                                        <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">
                                            {journeyProgressPercentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 sm:h-3" style={{ borderRadius: '2px' }}>
                                        <div 
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 sm:h-3 transition-all duration-500"
                                            style={{ width: `${journeyProgressPercentage}%`, borderRadius: '2px' }}
                                        ></div>
                                    </div>
                                </div>

                                <Link to={createPageUrl('StrategyFormCustomerJourney')} className="btn btn-primary w-full justify-center text-xs sm:text-sm">
                                    <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                    Continue My Customer Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Community + SOP + Upgrade CTAs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Community CTA */}
                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-3 rounded-xl flex-shrink-0">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                                    You're Part of The Business Minds Community! 🎉
                                </h3>
                                <p className="text-sm text-[var(--text-soft)] mb-4">
                                    Login to ask questions about your current journey, get feedback on your progress, and connect with fellow entrepreneurs.
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-2 text-sm text-[var(--text-soft)] mb-4">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>Ask Questions:</strong> Get answers about your 90-day journey and foundation roadmap</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>Weekly Live Coaching:</strong> Join group sessions every Tuesday & Thursday</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>Share Your Wins:</strong> Celebrate milestones and inspire others</span>
                            </li>
                        </ul>

                        <Link 
                            to={createPageUrl('TheCommunity')}
                            className="btn btn-primary w-full justify-center"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Login to Community
                        </Link>
                    </div>

                    {/* SOP Library CTA */}
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700" style={{ borderRadius: '2px' }}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl flex-shrink-0">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                                    Standard Operating Procedures
                                </h3>
                                <p className="text-sm text-[var(--text-soft)] mb-4">
                                    Document, organize, and scale your business processes with AI-powered SOP creation.
                                </p>
                            </div>
                        </div>
                        
                        <ul className="space-y-2 text-sm text-[var(--text-soft)] mb-4">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>AI Generation:</strong> Create SOPs instantly from simple descriptions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>Organize by Category:</strong> Sales, operations, marketing, and more</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 font-bold flex-shrink-0">✓</span>
                                <span><strong>Scale Your Business:</strong> Build systems that work without you</span>
                            </li>
                        </ul>

                        <Link 
                            to={createPageUrl('SOPs')}
                            className="btn btn-primary w-full justify-center"
                        >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Manage SOPs
                        </Link>
                    </div>

                    {/* Upgrade CTA */}
                    {user?.subscription_level === 'free' && (
                        <div className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)] rounded-xl lg:col-span-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-3 rounded-xl flex-shrink-0">
                                    <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                                        Unlock The Full HQ Experience
                                    </h3>
                                    <p className="text-sm text-[var(--text-soft)] mb-4">
                                        Get unlimited access to every tool, training, and resource you need to scale your business faster than ever.
                                    </p>
                                </div>
                            </div>
                            
                            <ul className="space-y-2 text-sm text-[var(--text-soft)] mb-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                    <span><strong>Unlimited Journeys:</strong> Switch goals anytime and access every roadmap</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                    <span><strong>All Strategy Tools:</strong> Full Foundation Roadmap access and premium templates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold flex-shrink-0">✓</span>
                                    <span><strong>Unlimited AI Access:</strong> Use all AI assistants with no restrictions</span>
                                </li>
                            </ul>

                            <Link 
                                to={createPageUrl('Upgrade')}
                                className="btn w-full justify-center bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white hover:shadow-lg"
                            >
                                <Rocket className="w-4 h-4 mr-2" />
                                Upgrade to The HQ - $99/mo
                            </Link>
                        </div>
                    )}
                </div>

                {/* Foundation Roadmap Visual */}
                <FoundationRoadmapVisual user={user} />

                {/* How It All Connects - SIMPLIFIED */}
                <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700" style={{ borderRadius: '2px' }}>
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg flex-shrink-0">
                            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                How It All Connects
                                <Tooltip content="Every tool in The Roadmap works together. Your Foundation provides clarity, your 90-Day Journey creates momentum, and daily tracking ensures progress.">
                                    <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </Tooltip>
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                Each tool in The Roadmap is designed to work together. Your <strong>Foundation Roadmap</strong> provides strategic clarity, your <strong>90-Day Journey</strong> creates execution momentum, and <strong>Daily Tracking</strong> ensures consistent progress toward your goals.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-flex items-center text-xs px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-blue-200 dark:border-blue-700 text-[var(--text-main)]">
                                    <BookOpen className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
                                    Foundation → Strategy
                                </span>
                                <span className="inline-flex items-center text-xs px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-blue-200 dark:border-blue-700 text-[var(--text-main)]">
                                    <Target className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
                                    90-Day Journey → Execution
                                </span>
                                <span className="inline-flex items-center text-xs px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-blue-200 dark:border-blue-700 text-[var(--text-main)]">
                                    <TrendingUp className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
                                    Daily Tracker → Progress
                                </span>
                            </div>
                            <Link 
                                to={createPageUrl('Guides')}
                                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Learn more about the complete system
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <ActionCard
                        title="Daily 1% Tracker"
                        description="Log today's progress and wins"
                        icon={TrendingUp}
                        link="DailyTrack"
                        color="from-blue-500 to-blue-600"
                    />
                    <ActionCard
                        title="Community"
                        description="Connect with entrepreneurs"
                        icon={Users}
                        link="TheCommunity"
                        color="from-purple-500 to-purple-600"
                    />
                    <ActionCard
                        title="Daily Scheduler"
                        description="Plan your productive day"
                        icon={Calendar}
                        link="Schedule"
                        color="from-green-500 to-green-600"
                    />
                </div>

                {/* Community Highlights */}
                {communityHighlights.length > 0 && (
                    <div className="card p-4 sm:p-6" style={{ borderRadius: '2px' }}>
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">🔥 Community Spotlight</h3>
                        <div className="space-y-3">
                            {communityHighlights.slice(0, 2).map(highlight => (
                                <Link
                                    key={highlight.id}
                                    to={highlight.link}
                                    className="block p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all"
                                    style={{ borderRadius: '2px' }}
                                >
                                    <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">{highlight.title}</h4>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-2">{highlight.description}</p>
                                    <span className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 font-medium flex items-center">
                                        {highlight.cta_text || 'Join the Conversation →'}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                    <div className="card p-4 sm:p-6" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Upcoming Events</h3>
                            <Bell className="w-5 h-5 text-[var(--text-soft)]" />
                        </div>
                        <div className="space-y-3">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                    <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">{event.title}</h4>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-2">{moment(event.event_date).format('MMM D, YYYY [at] h:mm A')}</p>
                                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" style={{ borderRadius: '2px' }}>
                                        {event.event_type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quote of the Day */}
                <QuoteOfTheDayCard />

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