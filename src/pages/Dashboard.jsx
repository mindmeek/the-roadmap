import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
    Rocket,
    MessageSquare,
    ChevronDown,
    Map,
    Briefcase
} from 'lucide-react';
import moment from 'moment';

// Component imports
import FoundationRoadmapVisual from '../components/dashboard/FoundationRoadmapVisual';
import JourneyTimeline from '../components/dashboard/JourneyTimeline';
import FinancialSnapshot from '../components/dashboard/FinancialSnapshot';
import GamificationDisplay from '../components/dashboard/GamificationDisplay';

import ActionCard from '../components/dashboard/ActionCard';
import Tooltip from '../components/common/Tooltip';
import AITeamModal from '../components/ai/AITeamModal';

import UpcomingTasksPreview from '../components/dashboard/UpcomingTasksPreview';
import DashboardDailyProgressCard from '../components/dashboard/DashboardDailyProgressCard';
import DailyInsightTabs from '../components/dashboard/DailyInsightTabs';
import MemberActionChecklist from '../components/dashboard/MemberActionChecklist';
import FoundationProgress from '../components/dashboard/VisionStageProgress';
import RestartTourButton from '../components/common/RestartTourButton';
import StreakCounter from '../components/dashboard/StreakCounter';

import { AI_TEAM_MEMBERS } from '../components/ai/aiTeamInfo';

const AI_TEAM_INFO = AI_TEAM_MEMBERS.reduce((acc, member) => {
    acc[member.id] = {
        name: member.name,
        role: member.role,
        avatar: member.avatar,
        color: member.color,
    };
    return acc;
}, {});

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
    const [isFoundationOpen, setIsFoundationOpen] = useState(false);
    const [yesterdayProgress, setYesterdayProgress] = useState(null);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [daysTracked, setDaysTracked] = useState(0);
    

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
            const now = moment().format('YYYY-MM-DDTHH:mm');

            // Fetch all data in parallel with limits
            const [progressRecords, highlights, events, customerJourneyDoc, last30Days] = await Promise.all([
                DailyProgress.filter({ created_by: currentUser.email, date: today }, '-created_date', 1),
                CommunityHighlight.filter({ is_active: true }, '-created_date', 5),
                Event.filter({ is_published: true, event_date: { $gte: now } }, 'event_date', 10),
                currentUser.subscription_level === 'free' && !currentUser.customer_journey_completed_date
                    ? StrategyDocument.filter({ created_by: currentUser.email, document_type: 'customer_journey' }, '-updated_date', 1)
                    : Promise.resolve([]),
                DailyProgress.filter({ created_by: currentUser.email }, '-date', 30)
            ]);

            if (progressRecords.length > 0) {
                setTodayProgress(progressRecords[0]);
            }

            // Calculate streak
            let streak = 0;
            const todayDate = moment().format('YYYY-MM-DD');
            for (let i = 0; i < 30; i++) {
                const checkDate = moment().subtract(i, 'days').format('YYYY-MM-DD');
                const entry = last30Days.find(p => p.date === checkDate);
                const hasCompleted = entry?.daily_tasks?.some(t => t.completed);
                if (hasCompleted) { streak++; } else { break; }
            }
            setCurrentStreak(streak);
            setDaysTracked(last30Days.length);

            setCommunityHighlights(highlights);
            setUpcomingEvents(events.slice(0, 3));

            if (currentUser.subscription_level === 'free' && !currentUser.customer_journey_completed_date) {
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

    const generateAISuggestion = useCallback(async () => {
        try {
            const currentUser = await User.me();
            
            // Build personalized message using step4 onboarding answers
            const focusLabels = {
                clarify_idea: 'clarify your business idea and validate it',
                define_brand: 'define your brand identity and positioning',
                understand_customer: 'deeply understand your ideal customer',
                create_plan: 'create a clear business plan and strategy',
                find_why: 'clarify your mission, vision and purpose',
                first_customers: 'get your first paying customers',
                launch_offer: 'launch your product or service offer',
                build_audience: 'build an engaged audience',
                marketing_system: 'set up a consistent marketing system',
                online_presence: 'establish your online presence',
                scale_revenue: 'scale your revenue to the next level',
                automate: 'automate and systematize your operations',
                build_team: 'build and manage a high-performing team',
                marketing_engine: 'build a marketing engine that runs without you',
                partnerships: 'form strategic partnerships to grow faster',
            };
            const focus = currentUser.step4_focus ? focusLabels[currentUser.step4_focus] : null;

            const suggestions = {
                vision: {
                    assistant: 'elyzet',
                    message: focus
                        ? `You said your top priority is to ${focus}. Elyzet can help you build the strategic foundation to do exactly that — step by step, with no guesswork.`
                        : "Ready to clarify your business idea and create a strategic foundation? Elyzet can help you craft a compelling mission statement and validate your concept.",
                    cta: "Talk to Elyzet",
                    stageDescription: "Clarify your business idea and create a strategic foundation"
                },
                startup: {
                    assistant: 'ava',
                    message: focus
                        ? `You said your top priority is to ${focus}. Ava specializes in exactly this — she'll help you build a marketing system that gets real results for your stage.`
                        : "Ready to launch your MVP and craft a unique customer journey? Ava can guide you through acquiring your first customers with proven marketing strategies.",
                    cta: "Talk to Ava",
                    stageDescription: "Launch your MVP and craft a unique customer journey to acquire your first customers"
                },
                growth: {
                    assistant: 'finley',
                    message: focus
                        ? `You said your top priority is to ${focus}. Finley can help you build the financial systems and growth levers to make that happen at scale.`
                        : "Ready to build systems and automate to scale? Finley can help you optimize operations and grow your proven business model.",
                    cta: "Talk to Finley",
                    stageDescription: "Build systems, optimize your current ones and customer journey, and automate to scale your proven business model"
                }
            };

            const suggestion = suggestions[currentUser.entrepreneurship_stage] || suggestions.vision;
            setAiSuggestion(suggestion);
        } catch (error) {
            console.error('Error generating AI suggestion:', error);
        }
    }, []);

    const openAIAssistant = useCallback((assistantType) => {
        setAiAssistantType(assistantType);
        setShowAIAssistant(true);
    }, []);

    const completedTasksToday = useMemo(() => 
        todayProgress?.daily_tasks?.filter(t => t.completed).length || 0, 
        [todayProgress]
    );
    
    const totalTasksToday = useMemo(() => 
        todayProgress?.daily_tasks?.length || 0, 
        [todayProgress]
    );
    
    const journeyProgressPercentage = useMemo(() => 
        customerJourneyProgress.total > 0 
            ? Math.round((customerJourneyProgress.completed / customerJourneyProgress.total) * 100) 
            : 0,
        [customerJourneyProgress]
    );

    const recommendedAgent = useMemo(() => 
        aiSuggestion ? AI_TEAM_INFO[aiSuggestion.assistant] : null,
        [aiSuggestion]
    );

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

    return (
        <div className="px-3 sm:px-4 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                
                {/* Welcome Hero Section */}
                <div 
                    id="dashboard-hero"
                    className="relative overflow-hidden shadow-xl"
                    style={{ 
                        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '2px'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

                    <div className="absolute top-4 right-4 z-20">
                        <RestartTourButton tourKey="dashboard" className="text-white hover:text-[var(--primary-gold)] bg-black/20 hover:bg-black/40 border border-white/10" />
                    </div>

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
                        <div className="inline-block bg-black/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4" style={{ borderRadius: '2px' }}>
                            <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                                Welcome back, {user.first_name || user.full_name}! 👋
                            </p>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                            {user.business_name || 'Your Business Journey'}
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mb-3 sm:mb-4 md:mb-6">
                            {user.business_name ? "Let's keep building - one step closer to your goals." : "Let's make today count - one step closer to your goals."}
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                            <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Track Today's Progress
                            </Link>
                            <Link to={createPageUrl('Journey')} className="btn btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center">
                                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Continue Your 90-Day Journey
                            </Link>
                        </div>
                    </div>
                </div>

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
                    <div id="dashboard-daily-progress" className="card relative overflow-hidden p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-all" style={{ borderRadius: '2px' }}>
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-green-200/30 dark:bg-green-600/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-600/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex items-center justify-between mb-4 flex-wrap gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] flex items-center flex-wrap gap-2">
                                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <span>Today's Progress</span>
                                <Tooltip content="Track your daily 1% improvements. Small, consistent actions compound into massive results over time.">
                                    <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </Tooltip>
                            </h3>
                            <Link to={createPageUrl('DailyTrack')} className="text-[var(--primary-gold)] hover:text-[#6B5838] flex items-center text-xs sm:text-sm font-medium group">
                                Track More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        {totalTasksToday > 0 ? (
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm text-[var(--text-soft)]">
                                        {completedTasksToday} of {totalTasksToday} tasks completed
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[var(--primary-gold)] bg-[var(--primary-gold)]/10 px-2 py-1 rounded">
                                        {Math.round((completedTasksToday / totalTasksToday) * 100)}%
                                    </span>
                                </div>
                                <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-3 overflow-hidden" style={{ borderRadius: '2px' }}>
                                    <div 
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 transition-all relative"
                                        style={{ width: `${(completedTasksToday / totalTasksToday) * 100}%`, borderRadius: '2px' }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 text-center py-6">
                                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-[var(--text-soft)] mb-4 text-sm">No tasks tracked today yet.</p>
                                <Link to={createPageUrl('DailyTrack')} className="btn btn-primary text-sm shadow-lg hover:shadow-xl transition-all">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Start Tracking
                                </Link>
                            </div>
                        )}
                    </div>

                    <UpcomingTasksPreview />
                </div>

                {/* Three Hub Tiles - Business Overview, Marketing Hub, Annual Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Business Overview - Black & White with Background Image */}
                    <Link 
                        to={createPageUrl('BusinessOverview')}
                        className="card relative overflow-hidden p-6 text-white hover:shadow-2xl hover:scale-[1.02] transition-all group border-2 border-gray-800"
                        style={{ 
                            borderRadius: '2px',
                            backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/50 transition-all"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 group-hover:scale-110 transition-all backdrop-blur-sm shadow-lg">
                                    <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-white/95 transition-all">Business Overview</h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                                Build your business profile, manage your team members, track milestones, and organize your brand identity in one centralized hub.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 text-xs text-white/70">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    Active workspace
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Marketing Hub - Brand Colors */}
                    <Link 
                        to={createPageUrl('MarketingOverview')}
                        className="card relative overflow-hidden p-6 bg-gradient-to-br from-[#8B6F4E] via-[#A88A6B] to-[#C4A882] text-white hover:shadow-2xl hover:scale-[1.02] transition-all group border-2 border-[#8B6F4E]"
                        style={{ borderRadius: '2px' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                        <div className="absolute top-1/2 right-0 w-1 h-12 bg-white/30 group-hover:h-16 transition-all"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 group-hover:scale-110 transition-all backdrop-blur-sm shadow-lg">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Marketing Hub</h3>
                            <p className="text-white/95 text-sm leading-relaxed">
                                Execute your marketing strategies with AI-powered content generation, social media management, email campaigns, and performance analytics.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 text-xs text-white/80">
                                    <Sparkles className="w-3 h-3" />
                                    AI-powered content tools
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Annual Strategy - Brand Colors Variant */}
                    <Link 
                        to={createPageUrl('AnnualPlanning')}
                        className="card relative overflow-hidden p-6 bg-gradient-to-br from-[#6B5838] via-[#8B6F4E] to-[#A88A6B] text-white hover:shadow-2xl hover:scale-[1.02] transition-all group border-2 border-[#6B5838]"
                        style={{ borderRadius: '2px' }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 group-hover:scale-110 transition-all backdrop-blur-sm shadow-lg">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Annual Strategy</h3>
                            <p className="text-white/95 text-sm leading-relaxed">
                                Set your vision for the year ahead with strategic goals, quarterly objectives, key milestones, and actionable plans to achieve sustainable growth.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <div className="flex items-center gap-2 text-xs text-white/80">
                                    <Target className="w-3 h-3" />
                                    Long-term planning
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Meet Your AI Team */}
                {aiSuggestion && recommendedAgent && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Recommended Agent */}
                        <div className={`card p-8 sm:p-10 bg-gradient-to-br ${recommendedAgent.color} text-white shadow-xl hover:shadow-2xl transition-all h-full`} style={{ borderRadius: '2px' }}>
                            <div className="flex flex-col items-center justify-center text-center gap-6 h-full">
                                {/* Header with Icon */}
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                                    <span className="text-sm sm:text-base font-semibold uppercase tracking-widest opacity-90 border-b border-white/30 pb-1">
                                        AI Support for Your Journey
                                    </span>
                                </div>

                                {/* Avatar */}
                                <div className="relative">
                                    <div className="text-7xl sm:text-8xl animate-bounce drop-shadow-2xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                                        {recommendedAgent.avatar}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        Online
                                    </div>
                                </div>

                                {/* Name & Role */}
                                <div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                                        Meet {recommendedAgent.name}
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-lg opacity-90 font-medium bg-white/10 px-4 py-1 rounded-full inline-block backdrop-blur-sm">
                                        {recommendedAgent.role}
                                    </p>
                                    <p className="text-xs sm:text-sm opacity-75 mt-2 max-w-md">
                                        {aiSuggestion.stageDescription}
                                    </p>
                                </div>

                                {/* Message */}
                                <div className="max-w-2xl bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                                    <p className="text-base sm:text-lg md:text-xl leading-relaxed font-light italic">
                                        "{aiSuggestion.message}"
                                    </p>
                                </div>

                                {/* CTA Button - Main */}
                                <div className="w-full">
                                    <button
                                        onClick={() => openAIAssistant(aiSuggestion.assistant)}
                                        className="btn bg-white text-gray-900 hover:bg-gray-100 font-bold text-base sm:text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center w-full"
                                    >
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        {aiSuggestion.cta}
                                    </button>
                                    <p className="text-xs sm:text-sm mt-3 opacity-75 font-medium">
                                        💡 {recommendedAgent.name} is ready to guide you through your Foundation Roadmap tasks
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Other Team Members */}
                        <div className="card p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700 h-full flex flex-col" style={{ borderRadius: '2px' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Meet the Rest of the Team</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Specialized experts for every business need</p>
                                </div>
                                <Link 
                                    to={createPageUrl('ElyzetAIAssistants')}
                                    className="text-sm font-medium text-[var(--primary-gold)] hover:underline flex items-center"
                                >
                                    View All <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1 pr-1">
                                {AI_TEAM_MEMBERS.filter(m => m.id !== recommendedAgent.id).map(member => (
                                    <button
                                        key={member.id}
                                        onClick={() => openAIAssistant(member.id)}
                                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-center flex flex-col items-center gap-2 border border-gray-100 dark:border-gray-600 group h-full"
                                    >
                                        <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">{member.avatar}</span>
                                        <div className="w-full">
                                            <div className="font-bold text-base sm:text-lg text-[var(--text-main)] mb-1">{member.name}</div>
                                            <div className="text-xs uppercase tracking-wider text-[var(--primary-gold)] font-bold mb-2">{member.role}</div>
                                            <p className="text-sm text-[var(--text-soft)] line-clamp-3 leading-relaxed">{member.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Member Action Checklist */}
                <MemberActionChecklist />

                {/* Streak Counter */}
                <StreakCounter streak={currentStreak} daysTracked={daysTracked} />

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

                        <div className="flex flex-wrap gap-2">
                            <a 
                                href="https://thebminds.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary flex-1"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Desktop
                            </a>
                            <a 
                                href="https://apps.apple.com/us/app/the-business-minds/id6742644847" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary flex-1"
                            >
                                iOS App
                            </a>
                            <a 
                                href="https://play.google.com/store/apps/details?id=com.thebusinessminds.wl&hl=en_IN" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary flex-1"
                            >
                                Android
                            </a>
                        </div>

                        <Link 
                            to={createPageUrl('BusinessOverview')}
                            className="btn btn-ghost w-full justify-center mt-2 text-purple-600 dark:text-purple-400"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            View Your Business Overview
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