import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { RoadmapContent } from '@/entities/RoadmapContent'; // Assuming RoadmapContent entity is here
import roadmapData from '../components/roadmap';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Target, CheckCircle, ChevronDown, Rocket, BookOpen, AlertTriangle, ArrowRight, Settings, Crown, X, Loader2, RefreshCw, RotateCcw, AlertCircle } from 'lucide-react';
import Confetti from '../components/common/Confetti';

// This is the GoalChangeModal from the original file, modified to be purely for selection.
// It no longer handles internal confirmation logic or free user limits.
const GoalChangeModal = ({ isOpen, onClose, user, onGoalChange, isLoading }) => {
    const [selectedStage, setSelectedStage] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const stages = [
        {
            id: "vision",
            title: "Vision Stage",
            description: "Clarify your business vision and lay the foundation",
            goals: [
                {
                    id: "vision_foundation_combo",
                    title: "Clarify Your Vision & Build Your Foundation",
                    description: "A comprehensive 90-day journey to define your purpose, validate your idea, and establish essential legal, financial, and operational groundwork."
                }
            ]
        },
        {
            id: "startup",
            title: "Startup Stage",
            description: "Build and launch your business foundation",
            goals: [
                {
                    id: "business_plan",
                    title: "Develop Your Business Plan",
                    description: "Create a comprehensive business plan with strategy, operations, and financial viability."
                },
                {
                    id: "marketing_plan",
                    title: "Develop Your Marketing Plan",
                    description: "Build a comprehensive marketing strategy to attract and convert customers."
                },
                {
                    id: "customer_journey",
                    title: "Develop Your Customer Journey",
                    description: "Master every touchpoint from discovery to loyal advocate."
                }
            ]
        },
        {
            id: "growth", 
            title: "Growth Stage", 
            description: "Scale and optimize your established business",
            goals: [
                {
                    id: "business_optimization",
                    title: "Business Growth & Optimization",
                    description: "Optimize operations, increase efficiency, and scale revenue streams."
                },
                {
                    id: "partnerships",
                    title: "Expand Through Partnerships",
                    description: "Build strategic alliances and collaborations to accelerate growth."
                },
                {
                    id: "community",
                    title: "Build & Scale Community",
                    description: "Foster an engaged audience and leverage community for growth."
                }
            ]
        }
    ];

    useEffect(() => {
        // Reset state when modal opens
        if (isOpen) {
            setSelectedStage(null);
            setSelectedGoal(null);
        }
    }, [isOpen]);

    const handleStageSelect = (stage) => {
        setSelectedStage(stage);
        setSelectedGoal(null);
    };

    const handleGoalSelect = (goal) => {
        setSelectedGoal(goal);
        // Call the onGoalChange prop, which in JourneyPage will set pending state and show warning modal
        if (selectedStage && goal) {
            onGoalChange(selectedStage.id, goal.id);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-semibold text-[var(--text-main)]">Change Your 90-Day Goal</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Stage Selection */}
                    {!selectedStage && (
                        <div className="space-y-4">
                            <h4 className="font-semibold text-[var(--text-main)]">1. Select Your Entrepreneurship Stage:</h4>
                            {stages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => handleStageSelect(stage)}
                                    className="w-full card p-4 text-left hover:border-[var(--primary-gold)] transition-colors"
                                    disabled={isLoading}
                                >
                                    <h5 className="font-semibold text-[var(--text-main)]">{stage.title}</h5>
                                    <p className="text-[var(--text-soft)] text-sm mt-1">{stage.description}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Goal Selection */}
                    {selectedStage && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <button 
                                    onClick={() => { setSelectedStage(null); setSelectedGoal(null); }}
                                    className="text-[var(--primary-gold)] hover:underline text-sm"
                                    disabled={isLoading}
                                >
                                    ← Back to Stages
                                </button>
                            </div>
                            <h4 className="font-semibold text-[var(--text-main)]">
                                2. Select Your Goal for {selectedStage.title}:
                            </h4>
                            {selectedStage.goals.map((goal) => (
                                <button
                                    key={goal.id}
                                    onClick={() => handleGoalSelect(goal)}
                                    className={`w-full card p-4 text-left transition-all duration-200 border-2 ${
                                        selectedGoal?.id === goal.id
                                            ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20' 
                                            : 'border-transparent hover:border-[var(--primary-gold)]'
                                    }`}
                                    disabled={isLoading}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h5 className="font-bold text-[var(--text-main)]">{goal.title}</h5>
                                            <p className="text-sm text-[var(--text-soft)] mt-1">{goal.description}</p>
                                        </div>
                                        {selectedGoal?.id === goal.id && (
                                            <CheckCircle className="w-6 h-6 text-[var(--primary-gold)] flex-shrink-0 ml-4" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Goal Change Warning Modal Component (NEW)
const GoalChangeWarningModal = ({ isOpen, onClose, onConfirm, isPremium, isLoadingConfirm }) => {
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setConfirmed(false); // Reset confirmed state when modal opens
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                            {isPremium ? 'Change Your Goal?' : 'Important: One-Time Goal Change'}
                        </h3>
                        {!isPremium && (
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                As a free member, you get <strong>ONE goal change</strong> for your 90-day journey. 
                                This will reset your current progress and start a new journey focus.
                            </p>
                        )}
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            Changing your goal will:
                        </p>
                        <ul className="text-sm text-[var(--text-soft)] space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Keep all your notes and previous progress saved</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span>Reset your current week and journey timeline</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span>Start fresh with your new goal's roadmap</span>
                            </li>
                        </ul>
                        {!isPremium && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 rounded-lg mb-4">
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    <strong>💡 Note:</strong> You can restart your journey anytime and repeat it as many times as you want. 
                                    Upgrade to Business Minds HQ for unlimited goal changes.
                                </p>
                            </div>
                        )}
                        {!isPremium && (
                            <label className="flex items-start gap-3 mb-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                    className="mt-1 w-4 h-4 text-[var(--primary-gold)] border-gray-300 rounded focus:ring-[var(--primary-gold)]"
                                />
                                <span className="text-sm text-[var(--text-main)]">
                                    I understand this is my only goal change as a free member, and I want to proceed.
                                </span>
                            </label>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="btn btn-ghost" disabled={isLoadingConfirm}>
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={(!isPremium && !confirmed) || isLoadingConfirm}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoadingConfirm ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Changing...
                            </>
                        ) : (
                            isPremium ? 'Change Goal' : 'Yes, Change My Goal'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function JourneyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedMonth, setExpandedMonth] = useState(null); // Renamed from activeMonth
    const [showGoalChangeModal, setShowGoalChangeModal] = useState(false);
    const [debugInfo, setDebugInfo] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const [showGoalWarning, setShowGoalWarning] = useState(false);
    const [pendingStage, setPendingStage] = useState(null);
    const [pendingGoal, setPendingGoal] = useState(null);
    const [isChangingGoal, setIsChangingGoal] = useState(false);

    // New states from outline
    const [selectedGoal, setSelectedGoal] = useState(null); // Appears unused in current flow, kept as per outline
    const [roadmapContent, setRoadmapContent] = useState({});

    useEffect(() => {
        loadUserAndRoadmap();
    }, []);

    const loadUserAndRoadmap = async () => {
        try {
            const userData = await User.me();
            
            console.log('User Data:', {
                stage: userData.entrepreneurship_stage,
                goal: userData.selected_goal,
                onboarding: userData.onboarding_completed
            });
            
            if (!userData.onboarding_completed) {
                navigate(createPageUrl("Onboarding"));
                return;
            }
            
            setUser(userData);

            // Load detailed content from database
            const content = await RoadmapContent.filter({ is_published: true });
            
            // Organize content by stage/goal/month/week
            const organized = {};
            content.forEach(week => {
                if (!organized[week.stage]) organized[week.stage] = {};
                if (!organized[week.stage][week.goal_id]) organized[week.stage][week.goal_id] = {};
                if (!organized[week.stage][week.goal_id][week.month_number]) {
                    organized[week.stage][week.goal_id][week.month_number] = [];
                }
                organized[week.stage][week.goal_id][week.month_number].push(week);
            });

            // Sort weeks by week_number
            Object.keys(organized).forEach(stage => {
                Object.keys(organized[stage]).forEach(goal => {
                    Object.keys(organized[stage][goal]).forEach(month => {
                        organized[stage][goal][month].sort((a, b) => a.week_number - b.week_number);
                    });
                });
            });

            setRoadmapContent(organized);

            // Auto-select user's current goal if they have one
            if (userData?.entrepreneurship_stage && userData?.selected_goal) {
                setSelectedGoal({
                    stage: userData.entrepreneurship_stage,
                    goalId: userData.selected_goal
                });
            }

            // Set initial expanded month based on user's current_month
            setExpandedMonth(userData.current_month - 1);

        } catch (e) {
            console.error("Failed to load journey or roadmap content", e);
            // Optionally navigate to onboarding if critical data is missing or error occurs
            navigate(createPageUrl("Onboarding"));
        }
        setLoading(false);
    };

    // Merge database content with static structure
    const getMergedRoadmapData = () => {
        const merged = JSON.parse(JSON.stringify(roadmapData)); // Deep clone the static data

        Object.keys(roadmapContent).forEach(stage => {
            Object.keys(roadmapContent[stage]).forEach(goalId => {
                // Ensure the static roadmap has this stage and goal
                if (merged.default?.[stage]?.goals?.[goalId] || merged[stage]?.goals?.[goalId]) {
                    const currentGoalInMerged = (merged.default || merged)[stage].goals[goalId];
                    // Ensure the goal has a 'months' array, create if not
                    if (!currentGoalInMerged.months) {
                        currentGoalInMerged.months = [];
                    }

                    Object.keys(roadmapContent[stage][goalId]).forEach(monthNum => {
                        const monthIndex = parseInt(monthNum) - 1; // Months are 1-indexed in DB, 0-indexed in array

                        // Ensure month exists in merged structure, create a placeholder if it doesn't
                        if (!currentGoalInMerged.months[monthIndex]) {
                            currentGoalInMerged.months[monthIndex] = {
                                title: `Month ${monthNum}`, // Default title, can be overridden if static data has it
                                weeks: []
                            };
                        }

                        // Add database weeks to this month
                        currentGoalInMerged.months[monthIndex].weeks = 
                            roadmapContent[stage][goalId][monthNum].map(week => ({
                                title: week.week_title,
                                description: week.week_description,
                                whyItMatters: week.why_it_matters,
                                howItStreamlines: week.how_it_streamlines,
                                howItBuildsRelationships: week.how_it_builds_relationships,
                                actionSteps: week.action_steps.map(step => ({
                                    ...step, // Keep any other properties from DB
                                    linkTo: step.link_to,
                                    foundationStepId: step.foundation_step_id,
                                    timeEstimate: step.time_estimate,
                                    detailedSteps: step.detailed_steps,
                                    successCriteria: step.success_criteria,
                                    commonChallenges: step.common_challenges
                                })),
                                tools: week.tools || [],
                                resources: week.resources || [],
                                // If roadmap_content has bullet points, add them here
                                // bulletPoints: week.bullet_points || []
                            }));
                    });
                }
            });
        });

        return merged.default || merged; // Ensure we return the correct roadmap object
    };

    const handleToggleMonth = (monthIndex) => {
        setExpandedMonth(expandedMonth === monthIndex ? null : monthIndex);
    }

    const markWeekComplete = async (weekNumber) => {
        if (!user || user.completed_weeks?.includes(weekNumber)) return;
        
        const updatedWeeks = [...(user.completed_weeks || []), weekNumber];
        try {
            await User.updateMyUserData({ completed_weeks: updatedWeeks });
            await loadUserAndRoadmap(); // Reload to reflect changes
        } catch (error) {
            console.error("Error completing week:", error);
        }
    };

    const handleChangeGoal = () => {
        const isPremium = user?.subscription_level === 'launchpad' || user?.subscription_level === 'business_hq' || user?.role === 'admin';
        const changesCount = user?.goal_changes_count || 0;

        // The GoalChangeModal no longer performs this check internally, it's done before opening.
        // This check was for free users exceeding one change. Now it opens the warning modal instead.
        // The check here for already used free changes is if we want to prevent opening the selection modal itself.
        // For now, let's open the selection modal always, and the warning modal handles the free user limit logic.
        setShowGoalChangeModal(true);
    };

    const handleGoalSelectedInModal = (stageId, goalId) => {
        setPendingStage(stageId);
        setPendingGoal(goalId);
        setShowGoalChangeModal(false);
        setShowGoalWarning(true);
    };

    const confirmGoalChange = async () => {
        if (!pendingStage || !pendingGoal) return;

        setIsChangingGoal(true);
        try {
            const changesCount = user?.goal_changes_count || 0; 
            
            await User.updateMyUserData({
                entrepreneurship_stage: pendingStage,
                selected_goal: pendingGoal,
                goal_changes_count: changesCount + 1,
                current_week: 1,
                current_month: 1,
                completed_weeks: [],
                journey_start_date: new Date().toISOString().split('T')[0]
            });

            await loadUserAndRoadmap(); // Reload to get the new roadmap and user data
            setShowGoalWarning(false);
            setPendingStage(null);
            setPendingGoal(null);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
            
        } catch (error) {
            console.error("Error changing goal:", error);
            alert("Failed to change goal. Please try again.");
        } finally {
            setIsChangingGoal(false);
        }
    };

    const handleRestartJourney = async () => {
        if (!confirm('Are you sure you want to restart your journey? This will reset your progress but keep all your notes.')) {
            return;
        }

        try {
            await User.updateMyUserData({
                current_week: 1,
                current_month: 1,
                completed_weeks: [],
                journey_start_date: new Date().toISOString().split('T')[0]
            });
            await loadUserAndRoadmap(); // Reload to reflect changes
        } catch (error) {
            console.error("Error restarting journey:", error);
            alert("Failed to restart journey. Please try again.");
        }
    };

    const navigateToWeek = (weekNumber) => {
        navigate(createPageUrl("Week") + `?week=${weekNumber}`);
    };

    const getWeekBulletPoints = (week) => {
        // Prefer explicit bullet points if they exist from the DB or static data
        if (week.bulletPoints && week.bulletPoints.length > 0) {
            return week.bulletPoints.slice(0, 3);
        }
        
        const points = [];
        if (week.actionSteps && week.actionSteps.length > 0) {
            points.push(`Complete ${week.actionSteps.length} action step${week.actionSteps.length > 1 ? 's' : ''} to build your foundation`);
        }
        if (week.whyItMatters) {
            if (typeof week.whyItMatters === 'string' && week.whyItMatters.length > 50) {
                points.push("Understand key strategic importance");
            } else if (typeof week.whyItMatters === 'string' && week.whyItMatters.length > 0) {
                // Truncate if too long to fit as a bullet point snippet
                points.push(`Understand why it matters: ${week.whyItMatters.substring(0, 40)}${week.whyItMatters.length > 40 ? '...' : ''}`);
            }
        }
        if (week.tools && week.tools.length > 0) {
            points.push(`Utilize ${week.tools.length} strategic tool${week.tools.length > 1 ? 's' : ''} to streamline your work`);
        }
        
        while (points.length < 3) {
            if (points.length === 0) points.push("Build a strong foundation for your business");
            else if (points.length === 1) points.push("Engage with practical exercises and resources");
            else if (points.length === 2) points.push("Advance confidently towards your entrepreneurial vision");
            else break; 
        }
        
        return points.slice(0, 3);
    };

    if (loading) {
        return <div className="px-4 text-center py-12">
            <Loader2 className="w-12 h-12 text-[var(--primary-gold)] animate-spin mx-auto" />
        </div>;
    }

    // Derive journey and stageInfo from merged data and user state
    const mergedRoadmap = getMergedRoadmapData();
    const journey = user?.entrepreneurship_stage && user?.selected_goal 
        ? mergedRoadmap?.[user.entrepreneurship_stage]?.goals?.[user.selected_goal] 
        : null;
    const stageInfo = user?.entrepreneurship_stage 
        ? mergedRoadmap?.[user.entrepreneurship_stage] 
        : null;
    
    if (!journey) {
        return (
            <div className="px-4 pb-20 md:pb-8 max-w-4xl mx-auto">
                <div className="card p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-2xl mb-2">Journey Not Found</h1>
                    <p className="text-[var(--text-soft)] mb-4">We couldn't load your roadmap. It seems there might be an issue with your onboarding selection or the roadmap content.</p>
                    
                    {debugInfo && (
                        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded text-left text-sm">
                            <h3 className="font-bold mb-2 text-[var(--text-main)]">Debug Info:</h3>
                            <p className="text-[var(--text-soft)]">Stage: {debugInfo.stage || 'NOT SET'}</p>
                            <p className="text-[var(--text-soft)]">Goal: {debugInfo.goal || 'NOT SET'}</p>
                            <p className="text-[var(--text-soft)]">Stage Exists in Roadmap: {debugInfo.stageExists ? 'YES' : 'NO'}</p>
                            <p className="text-[var(--text-soft)]">Goal Exists in Roadmap: {debugInfo.goalExists ? 'YES' : 'NO'}</p>
                            <p className="text-[var(--text-soft)]">Journey Has Months: {debugInfo.hasMonths}</p>
                        </div>
                    )}
                    
                    <button onClick={() => navigate(createPageUrl("Onboarding"))} className="btn btn-primary mt-4">
                        Restart Onboarding
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Mobile-Responsive Header Card */}
                <div className="card p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    {/* Mobile: Stack Everything Vertically, Desktop: Side by Side */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
                        {/* Left Content - Icon and Text */}
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="bg-[var(--primary-gold)] p-2 sm:p-3 rounded-lg flex-shrink-0">
                                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">My 90-Day Journey</h1>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 truncate">{stageInfo?.title || 'Your Journey'}</p>
                                <p className="text-xs sm:text-sm font-semibold text-[var(--primary-gold)] dark:text-[var(--primary-gold)] mt-1 line-clamp-2">{journey?.title}</p>
                            </div>
                        </div>
                        
                        {/* Right Buttons - Full Width on Mobile, Auto Width on Desktop */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:flex-shrink-0">
                            <button 
                                onClick={handleChangeGoal}
                                disabled={isChangingGoal}
                                className="btn btn-secondary text-sm w-full sm:w-auto whitespace-nowrap"
                            >
                                {isChangingGoal ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        <span>Changing...</span>
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        <span>Change Goal</span>
                                    </>
                                )}
                            </button>
                            <button 
                                onClick={handleRestartJourney}
                                className="btn btn-ghost text-sm w-full sm:w-auto whitespace-nowrap"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                <span>Restart</span>
                            </button>
                        </div>
                    </div>

                    {/* Free User Benefits Message */}
                    {user?.subscription_level === 'free' && (
                        <div className="mt-3 sm:mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
                            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                                <strong>Free Member Benefits:</strong> You have {user.goal_changes_count >= 1 ? 'used your one goal change' : 'one goal change remaining'} • 
                                Unlimited journey restarts • Lifetime access to your notes and progress
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="space-y-4">
                    {journey.months && journey.months.map((month, monthIndex) => {
                        const totalWeeksInMonth = month.weeks?.length || 0;
                        const completedWeeksInMonth = month.weeks?.filter((week, weekIndex) => user.completed_weeks?.includes(monthIndex * 4 + weekIndex + 1)).length || 0;
                        const isCurrentMonth = user.current_month === monthIndex + 1;

                        return (
                            <div key={monthIndex} className="card overflow-hidden">
                                <button onClick={() => handleToggleMonth(monthIndex)} className="w-full p-3 sm:p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1 min-w-0 pr-2">
                                            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 flex-wrap">
                                                <span className="truncate">{month.title}</span>
                                                {isCurrentMonth && <span className="text-xs bg-[var(--primary-gold)] text-white px-2 py-1 rounded-full whitespace-nowrap">Current</span>}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {completedWeeksInMonth}/{totalWeeksInMonth} weeks completed
                                            </p>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${expandedMonth === monthIndex ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>

                               {expandedMonth === monthIndex && month.weeks && (
                                    <div className="p-3 sm:p-4 space-y-3">
                                        {month.weeks.map((week, weekIndex) => {
                                            const globalWeekNumber = monthIndex * 4 + weekIndex + 1;
                                            const isCompleted = user.completed_weeks?.includes(globalWeekNumber);
                                            const isCurrentWeek = user.current_week === globalWeekNumber;
                                            const bulletPoints = getWeekBulletPoints(week);
                                            
                                            return (
                                                <div key={weekIndex} className={`border rounded-md p-3 sm:p-4 ${isCurrentWeek ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                                Week {globalWeekNumber}: {week.title}
                                                            </h3>
                                                            
                                                            <ul className="space-y-1 mb-3">
                                                                {bulletPoints.map((point, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                                                        <span className="text-[var(--primary-gold)] mt-1 flex-shrink-0">•</span>
                                                                        <span className="break-words">{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            
                                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                                <button
                                                                    onClick={() => navigateToWeek(globalWeekNumber)}
                                                                    className="btn btn-secondary text-xs sm:text-sm flex-1 sm:flex-initial"
                                                                >
                                                                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                    <span className="hidden xs:inline">View Details</span>
                                                                    <span className="xs:hidden">Details</span>
                                                                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => markWeekComplete(globalWeekNumber)} disabled={isCompleted} className="btn btn-ghost text-sm p-2 disabled:cursor-not-allowed self-end sm:self-start">
                                                            {isCompleted ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>}
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                               )}
                            </div>
                        )
                    })}
                </div>

                <GoalChangeModal 
                    isOpen={showGoalChangeModal}
                    onClose={() => setShowGoalChangeModal(false)}
                    user={user}
                    onGoalChange={handleGoalSelectedInModal}
                    isLoading={isChangingGoal}
                />

                <GoalChangeWarningModal
                    isOpen={showGoalWarning}
                    onClose={() => {
                        setShowGoalWarning(false);
                        setPendingStage(null);
                        setPendingGoal(null);
                    }}
                    onConfirm={confirmGoalChange}
                    isPremium={user?.subscription_level === 'launchpad' || user?.subscription_level === 'business_hq' || user?.role === 'admin'}
                    isLoadingConfirm={isChangingGoal}
                />
                <Confetti active={showConfetti} />
            </div>
        </div>
    );
}