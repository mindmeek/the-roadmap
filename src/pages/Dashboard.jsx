import React, { useState, useEffect } from 'react';
import { User, DailyProgress, FoundationProgress as FoundationProgressEntity } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import {
    Loader2,
    Target,
    Calendar,
    Briefcase,
    CheckCircle,
    Circle,
    Plus,
    ArrowRight,
    Zap,
    Lightbulb,
    Users,
    TrendingUp,
    Palette,
    Clock,
    ListChecks,
    Map
} from 'lucide-react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import AITeamModal from '../components/ai/AITeamModal';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [todayProgress, setTodayProgress] = useState(null);
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [hasJourney, setHasJourney] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiAssistantType, setAiAssistantType] = useState('elyzet');

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            const userHasJourney = !!(currentUser.journey_start_date && currentUser.selected_goal);
            setHasJourney(userHasJourney);

            const today = moment().format('YYYY-MM-DD');
            const progressRecords = await base44.entities.DailyProgress.filter({ 
                created_by: currentUser.email, 
                date: today 
            });
            if (progressRecords.length > 0) {
                setTodayProgress(progressRecords[0]);
            }

            const progressData = await base44.entities.FoundationProgress.filter({ created_by: currentUser.email });
            if (progressData.length > 0) {
                setFoundationProgress(progressData[0]);
            }

        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
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
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="card p-8 text-center" style={{ borderRadius: '1px' }}>
                    <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-4 inline-block mb-4" style={{ borderRadius: '1px' }}>
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Choose Your 90-Day Journey</h3>
                    <p className="text-[var(--text-soft)] mb-6 max-w-md mx-auto">
                        Start your personalized roadmap to success.
                    </p>
                    <Link to={createPageUrl('Onboarding')}>
                        <Button className="btn-primary" style={{ borderRadius: '1px' }}>
                            Set Up My Journey
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const completedTasksToday = todayProgress?.daily_tasks?.filter(t => t.completed).length || 0;
    const totalTasksToday = todayProgress?.daily_tasks?.length || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
            {/* Hero - Journey Overview */}
            <div className="card p-6 mb-6 border-2 border-[var(--primary-gold)]" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">
                            {user.business_name || user.full_name?.split(' ')[0] + "'s Business Journey"}
                        </h1>
                        <p className="text-[var(--text-soft)]">Your roadmap to business success</p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={createPageUrl('DailyTrack')}>
                            <Button size="sm" className="btn-primary" style={{ borderRadius: '1px' }}>
                                <ListChecks className="w-4 h-4 mr-2" />
                                Daily 1%
                            </Button>
                        </Link>
                        <Link to={createPageUrl('Schedule')}>
                            <Button size="sm" variant="outline" style={{ borderRadius: '1px' }}>
                                <Clock className="w-4 h-4 mr-2" />
                                Schedule
                            </Button>
                        </Link>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border border-blue-200 dark:border-blue-700" style={{ borderRadius: '1px' }}>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Current Stage</p>
                        <p className="text-xl font-bold capitalize">{user.entrepreneurship_stage || 'Vision'}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 border border-purple-200 dark:border-purple-700" style={{ borderRadius: '1px' }}>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">90-Day Journey</p>
                        <p className="text-lg font-bold">{user.selected_goal || 'Not Set'}</p>
                        <p className="text-xs text-[var(--text-soft)] mt-1">Week {user.journey_current_week || 1} of 12</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 border border-green-200 dark:border-green-700" style={{ borderRadius: '1px' }}>
                        <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Freedom Number</p>
                        <p className="text-xl font-bold">
                            ${user.financial_projections?.freedomNumber ? parseInt(user.financial_projections.freedomNumber).toLocaleString() : '0'}
                        </p>
                        <p className="text-xs text-[var(--text-soft)] mt-1">Monthly Target</p>
                    </div>
                </div>
            </div>

            {/* Next Actionable Steps */}
            <div className="card p-6 mb-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-200 dark:border-orange-700" style={{ borderRadius: '1px' }}>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <h2 className="text-xl font-bold">Your Next Step</h2>
                </div>
                {todayProgress && todayProgress.daily_tasks?.length > 0 ? (
                    <div className="space-y-3">
                        {todayProgress.daily_tasks.filter(t => !t.completed).slice(0, 2).map((task) => (
                            <div key={task.id} className="bg-white dark:bg-gray-800 p-4 border-l-4 border-orange-500" style={{ borderRadius: '1px' }}>
                                <div className="flex items-start gap-3">
                                    <Circle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-[var(--text-main)] font-medium">{task.task}</span>
                                </div>
                            </div>
                        ))}
                        <Link to={createPageUrl('DailyTrack')} className="block">
                            <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                <ArrowRight className="w-4 h-4 mr-2" />
                                View All Today's Tasks ({totalTasksToday})
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-[var(--text-soft)] mb-4">Start your day with focused action</p>
                        <Link to={createPageUrl('DailyTrack')}>
                            <Button size="sm" className="btn-primary" style={{ borderRadius: '1px' }}>
                                <Plus className="w-4 h-4 mr-2" />
                                Plan Today's Tasks
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Foundational Strategy Tools */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[var(--primary-gold)]" />
                        <h2 className="text-xl font-bold">Business Foundation</h2>
                    </div>
                    <Link to={createPageUrl('MyFoundationRoadmap')}>
                        <Button variant="outline" size="sm" style={{ borderRadius: '1px' }}>
                            <Map className="w-4 h-4 mr-2" />
                            View All Tools
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <FoundationToolCard
                        title="Your Why"
                        icon={Lightbulb}
                        linkTo="StrategyFormDefineYourWhy"
                        isComplete={foundationProgress?.completed_steps?.includes('define_your_why')}
                    />
                    <FoundationToolCard
                        title="Ideal Client"
                        icon={Users}
                        linkTo="StrategyFormIdealClient"
                        isComplete={foundationProgress?.completed_steps?.includes('ideal_client_persona')}
                    />
                    <FoundationToolCard
                        title="Brand Kit"
                        icon={Palette}
                        linkTo="StrategyFormBrandKit"
                        isComplete={foundationProgress?.completed_steps?.includes('brand_kit')}
                    />
                    <FoundationToolCard
                        title="Value Prop"
                        icon={TrendingUp}
                        linkTo="StrategyFormValueProposition"
                        isComplete={foundationProgress?.completed_steps?.includes('value_proposition')}
                    />
                </div>
            </div>

            {/* Journey & Strategic Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Link to={createPageUrl('Journey')}>
                    <div className="card p-6 hover:shadow-lg transition-all cursor-pointer h-full" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2" style={{ borderRadius: '1px' }}>
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold">90-Day Journey</h3>
                        </div>
                        {user.selected_goal ? (
                            <div>
                                <p className="text-sm text-[var(--text-soft)] mb-2">Current Goal:</p>
                                <p className="font-semibold mb-3">{user.selected_goal}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--text-soft)]">Week {user.journey_current_week || 1} of 12</span>
                                    <ArrowRight className="w-4 h-4 text-[var(--primary-gold)]" />
                                </div>
                            </div>
                        ) : (
                            <p className="text-[var(--text-soft)] text-sm">Start your 90-day strategic journey</p>
                        )}
                    </div>
                </Link>
                
                <Link to={createPageUrl('AnnualPlanning')}>
                    <div className="card p-6 hover:shadow-lg transition-all cursor-pointer h-full" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2" style={{ borderRadius: '1px' }}>
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold">Annual Strategy</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-2">2026 Strategic Plan</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--text-soft)]">View quarterly objectives</span>
                            <ArrowRight className="w-4 h-4 text-[var(--primary-gold)]" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Quick Access Resources */}
            <div className="card p-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-xl font-bold mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Link to={createPageUrl('MarketingOverview')}>
                        <div className="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700 hover:shadow-md transition-all cursor-pointer" style={{ borderRadius: '1px' }}>
                            <TrendingUp className="w-5 h-5 text-orange-600 mb-2" />
                            <h3 className="font-semibold text-xs">Marketing Hub</h3>
                        </div>
                    </Link>
                    
                    <button onClick={() => { setAiAssistantType('elyzet'); setShowAIAssistant(true); }}>
                        <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all cursor-pointer" style={{ borderRadius: '1px' }}>
                            <Zap className="w-5 h-5 text-purple-600 mb-2" />
                            <h3 className="font-semibold text-xs">AI Assistants</h3>
                        </div>
                    </button>
                    
                    <a href="https://thebminds.com" target="_blank" rel="noopener noreferrer">
                        <div className="p-3 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-700 hover:shadow-md transition-all cursor-pointer" style={{ borderRadius: '1px' }}>
                            <Users className="w-5 h-5 text-green-600 mb-2" />
                            <h3 className="font-semibold text-xs">Community</h3>
                        </div>
                    </a>
                    
                    <Link to={createPageUrl('BusinessOverview')}>
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 hover:shadow-md transition-all cursor-pointer" style={{ borderRadius: '1px' }}>
                            <Briefcase className="w-5 h-5 text-blue-600 mb-2" />
                            <h3 className="font-semibold text-xs">Business Hub</h3>
                        </div>
                    </Link>
                </div>
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

const FoundationToolCard = ({ title, icon: Icon, linkTo, isComplete }) => (
    <Link to={createPageUrl(linkTo)}>
        <div className={`p-3 border hover:shadow-md transition-all cursor-pointer ${isComplete ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`} style={{ borderRadius: '1px' }}>
            <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isComplete ? 'text-green-600' : 'text-gray-400'}`} />
                {isComplete && <CheckCircle className="w-4 h-4 text-green-600" />}
            </div>
            <h3 className="font-semibold text-xs">{title}</h3>
        </div>
    </Link>
);