import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Lightbulb, Book, Calendar, LayoutTemplate, Users, Share2, KanbanSquare, Loader2,
  AlertTriangle, ChevronLeft, ArrowLeft, ArrowRight, Target, CheckCircle, Rocket,
  Globe, ExternalLink, Brain, Sparkles, ListChecks, BookOpen, Clock, Wrench,
  FileText, BarChart3, CheckSquare, FolderOpen, DollarSign, Palette, Shield, MessageCircle,
  Zap, Lock, ClipboardCheck, Send, Tags, Library, Workflow, Megaphone, CreditCard, Activity,
  Route, UserSquare, UserCheck, Mail, PieChart, ClipboardList, Star, GitBranch, TestTube,
  Database, Shuffle, HelpCircle, Headphones, Bot, Users2, UserPlus, Camera, Calculator,
  ShoppingCart, LineChart, Crown, Repeat, RotateCcw, LayoutDashboard, UserCog, Phone,
  LayoutGrid, Plug, Kanban, Eye, FileSpreadsheet, PhoneCall, Handshake, PackagePlus,
  Layers, ShoppingBag, Heart, Radio, Crosshair, Filter, Gift, GitMerge, GraduationCap, TrendingUp,
  Info, Save, ChevronRight, Package, UserCircle, Building, RefreshCw, Search, Settings,
  BarChart
} from 'lucide-react';
import AICopilotModal from '../components/ai/AICopilotModal';

const iconComponents = {
    Sparkles, Book, Calendar, LayoutTemplate, Users, Share2, KanbanSquare, Lightbulb, Loader2,
    AlertTriangle, ChevronLeft, ArrowLeft, ArrowRight, Target, CheckCircle, Rocket, Globe,
    ExternalLink, Brain, ListChecks, BookOpen, Clock, Wrench, FileText, BarChart3,
    CheckSquare, FolderOpen, DollarSign, Palette, Shield, MessageCircle, Zap, Lock,
    ClipboardCheck, Send, Tags, Library, Workflow, Megaphone, CreditCard, Activity, Route,
    UserSquare, UserCheck, Mail, PieChart, ClipboardList, Star, GitBranch, TestTube, Database,
    Shuffle, HelpCircle, Headphones, Bot, Users2, UserPlus, Camera, Calculator, ShoppingCart,
    LineChart, Crown, Repeat, RotateCcw, LayoutDashboard, UserCog, Phone, LayoutGrid, Plug,
    Kanban, Eye, FileSpreadsheet, PhoneCall, Handshake, PackagePlus, Layers, ShoppingBag, Heart, 
    Radio, Crosshair, Filter, Gift, GitMerge, GraduationCap, TrendingUp, Info, Save, ChevronRight,
    Package, UserCircle, Building, RefreshCw, Search, Settings, BarChart
};

const ToolIcon = ({ name }) => {
    const IconComponent = iconComponents[name] || Lightbulb;
    return <IconComponent className="w-5 h-5 text-[var(--primary-gold)]" />;
};

export default function WeekPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [weekData, setWeekData] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [weekNumber, setWeekNumber] = useState(1);
    const [completedSteps, setCompletedSteps] = useState({});
    const [expandedSteps, setExpandedSteps] = useState({});
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [stepAnswers, setStepAnswers] = useState({});
    const [isSavingAnswers, setIsSavingAnswers] = useState({});

    const [copilotModal, setCopilotModal] = useState({
        isOpen: false,
        copilotQuestions: [],
        actionStepTitle: ''
    });

    const loadWeekData = useCallback(async () => {
        setLoading(true);
        try {
            const userData = await base44.auth.me();
            if (!userData.onboarding_completed) {
                navigate(createPageUrl("Onboarding"));
                return;
            }
            setUser(userData);

            // Load Strategy Documents for pre-population
            try {
                const docs = await base44.entities.StrategyDocument.filter({ created_by: userData.email });
                const docsMap = {};
                docs.forEach(doc => {
                    docsMap[doc.document_type] = doc;
                });
                setStrategyDocs(docsMap);
            } catch (error) {
                console.error("Error loading strategy documents:", error);
            }

            try {
                const progressRecords = await base44.entities.FoundationProgress.filter({ created_by: userData.email });
                if (progressRecords.length > 0) {
                    setFoundationProgress(progressRecords[0]);
                    // Initialize local answers state from DB
                    const answers = progressRecords[0].weekly_step_answers || {};
                    setStepAnswers(answers);
                } else {
                    const newProgress = await base44.entities.FoundationProgress.create({
                        created_by: userData.email,
                        completed_steps: [],
                        step_completion_dates: {},
                        notes: {},
                        weekly_step_answers: {}
                    });
                    setFoundationProgress(newProgress);
                    setStepAnswers({});
                }
            } catch (progressError) {
                console.error("Error loading foundation progress:", progressError);
                setFoundationProgress(null);
            }

            const urlParams = new URLSearchParams(location.search);
            const urlWeek = urlParams.get('week');
            const currentWeek = urlWeek ? parseInt(urlWeek) : userData.current_week || 1;
            setWeekNumber(currentWeek);

            // Load week content from database
            const weekContent = await base44.entities.RoadmapContent.filter({
                stage: userData.entrepreneurship_stage,
                goal_id: userData.selected_goal,
                week_number: currentWeek
            });

            if (!weekContent || weekContent.length === 0) {
                console.error(`Week ${currentWeek} not found in database`);
                setWeekData(null);
                setLoading(false);
                return;
            }

            const foundWeek = weekContent[0];
            setWeekData(foundWeek);

            const savedNotes = localStorage.getItem(`week_${currentWeek}_notes`);
            setNotes(savedNotes || '');

            const savedSteps = localStorage.getItem(`week_${currentWeek}_steps`);
            setCompletedSteps(savedSteps ? JSON.parse(savedSteps) : {});

        } catch (error) {
            console.error("Error loading week data:", error);
            setWeekData(null);
        }
        setLoading(false);
    }, [navigate, location.search]);

    useEffect(() => {
        loadWeekData();
    }, [loadWeekData]);

    const handleStepToggle = async (stepIndex) => {
        const newCompletedSteps = {
            ...completedSteps,
            [stepIndex]: !completedSteps[stepIndex]
        };
        setCompletedSteps(newCompletedSteps);
        localStorage.setItem(`week_${weekNumber}_steps`, JSON.stringify(newCompletedSteps));

        const currentStep = weekData.action_steps[stepIndex];
        if (currentStep.foundation_step_id && foundationProgress) {
            const isCurrentlyCompleted = !!newCompletedSteps[stepIndex];

            const updatedCompletedSteps = isCurrentlyCompleted
                ? [...(foundationProgress.completed_steps || []), currentStep.foundation_step_id]
                : (foundationProgress.completed_steps || []).filter(id => id !== currentStep.foundation_step_id);

            const currentCompletionDates = foundationProgress.step_completion_dates || {};
            const updatedCompletionDates = {
                ...currentCompletionDates,
                [currentStep.foundation_step_id]: isCurrentlyCompleted ? new Date().toISOString() : null
            };

            base44.entities.FoundationProgress.update(foundationProgress.id, {
                completed_steps: updatedCompletedSteps,
                step_completion_dates: updatedCompletionDates
            }).then(() => {
                setFoundationProgress(prev => ({
                    ...prev,
                    completed_steps: updatedCompletedSteps,
                    step_completion_dates: updatedCompletionDates
                }));
            }).catch(err => console.error("Error updating foundation progress:", err));
        }
    };

    const handleExpandStep = (stepIndex) => {
        setExpandedSteps(prev => ({
            ...prev,
            [stepIndex]: !prev[stepIndex]
        }));
    };

    const handleAnswerChange = (weekNum, stepIndex, value) => {
        setStepAnswers(prev => ({
            ...prev,
            [weekNum]: {
                ...(prev[weekNum] || {}),
                [stepIndex]: {
                    ...(prev[weekNum]?.[stepIndex] || {}),
                    answer: value,
                    last_updated: new Date().toISOString()
                }
            }
        }));
    };

    const handleSaveAnswer = async (weekNum, stepIndex) => {
        if (!foundationProgress) return;
        
        const savingKey = `${weekNum}-${stepIndex}`;
        setIsSavingAnswers(prev => ({ ...prev, [savingKey]: true }));

        try {
            const updatedAnswers = { ...stepAnswers };
            // Ensure we have the latest state in case of race conditions, 
            // though strictly we should use functional update in setFoundationProgress, 
            // but for DB update we use the state 'stepAnswers'.
            
            await base44.entities.FoundationProgress.update(foundationProgress.id, {
                weekly_step_answers: updatedAnswers
            });
            
            // Show success briefly
            setTimeout(() => {
                setIsSavingAnswers(prev => ({ ...prev, [savingKey]: false }));
            }, 500);
        } catch (error) {
            console.error("Error saving answer:", error);
            setIsSavingAnswers(prev => ({ ...prev, [savingKey]: false }));
        }
    };

    // Helper to infer strategy document type from link_to
    const getStrategyTypeFromLink = (linkTo) => {
        if (!linkTo) return null;
        if (linkTo.includes('StrategyFormIdealClient')) return 'ideal_client';
        if (linkTo.includes('StrategyFormValueProposition')) return 'value_proposition_canvas'; // Check entity enum
        if (linkTo.includes('StrategyFormValueLadder')) return 'value_ladder';
        if (linkTo.includes('StrategyFormBusinessModel')) return 'business_model_canvas';
        if (linkTo.includes('StrategyFormSWOT')) return 'swot_analysis';
        if (linkTo.includes('StrategyFormCustomerJourney')) return 'customer_journey';
        if (linkTo.includes('StrategyFormBrand')) return 'brand_identity'; // Assuming mapping
        if (linkTo.includes('StrategyFormContent')) return 'content_strategy'; // Assuming mapping
        if (linkTo.includes('StrategyFormPricing')) return 'pricing_strategies';
        // Add more mappings as needed
        return null;
    };

    const handleCopilotClick = (step, stepIndex) => {
        const defaultQuestions = [
            `How can I break down "${step.title}" into manageable steps?`,
            `What resources or tools might I need for this task?`,
            `What potential challenges should I prepare for?`,
            `How does this step contribute to my overall business goals?`,
            `Can you provide specific examples for this step?`
        ];

        setCopilotModal({
            isOpen: true,
            copilotQuestions: step.copilotQuestions || defaultQuestions,
            actionStepTitle: step.title
        });
    };

    const markWeekComplete = async () => {
        if (!user || user.completed_weeks?.includes(weekNumber)) return;

        const updatedWeeks = [...(user.completed_weeks || []), weekNumber];
        try {
            await base44.auth.updateMe({ completed_weeks: updatedWeeks });
            setUser(prev => ({ ...prev, completed_weeks: updatedWeeks }));
        } catch (error) {
            console.error("Error completing week:", error);
        }
    };

    const navigateToWeek = (newWeek) => {
        navigate(createPageUrl("Week") + `?week=${newWeek}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    if (!weekData) {
        return (
            <div className="px-4 pb-20 md:pb-8 max-w-4xl mx-auto">
                <div className="card p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-2xl mb-2">Week Not Found</h1>
                    <p className="text-[var(--text-soft)] mb-4">We couldn't load this week's content. It may not be published yet.</p>
                    <button onClick={() => navigate(createPageUrl('Journey'))} className="btn btn-primary">
                        Back to Journey
                    </button>
                </div>
            </div>
        );
    }

    const isCompleted = user?.completed_weeks?.includes(weekNumber);
    const totalWeeks = 10; // Each journey is 10 weeks (can make dynamic later)

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="card p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                        <button
                            onClick={() => navigate(createPageUrl("Journey"))}
                            className="btn btn-ghost w-full sm:w-auto"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Back to Journey</span>
                        </button>

                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                            {weekNumber > 1 && (
                                <button
                                    onClick={() => navigateToWeek(weekNumber - 1)}
                                    className="btn btn-secondary flex-1 sm:flex-none"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">Prev Week</span>
                                </button>
                            )}
                            {weekNumber < totalWeeks && (
                                <button
                                    onClick={() => navigateToWeek(weekNumber + 1)}
                                    className="btn btn-secondary flex-1 sm:flex-none"
                                >
                                    <span className="hidden sm:inline">Next Week</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="text-center sm:text-left sm:flex sm:items-start sm:space-x-4">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4 sm:mb-0 mx-auto sm:mx-0 w-fit">
                            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary-gold)]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-3 mb-2">
                                <span className="text-sm font-medium text-[var(--primary-gold)] bg-yellow-50 px-3 py-1 rounded-full mb-2 sm:mb-0">
                                    Week {weekNumber}
                                </span>
                                <span className="text-sm text-[var(--text-soft)]">{weekData.stage}</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl mb-2">{weekData.week_title}</h1>
                            <p className="text-[var(--text-soft)] text-sm sm:text-base">Month {weekData.month_number}</p>
                        </div>
                        <button
                            onClick={markWeekComplete}
                            disabled={isCompleted}
                            className="btn btn-ghost p-3 mt-4 sm:mt-0"
                        >
                            {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Week Overview */}
                <div className="card p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4">Week Overview</h2>
                    <p className="text-[var(--text-main)] text-sm sm:text-base leading-relaxed mb-6">
                        {weekData.week_description}
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-md">
                            <h3 className="font-bold text-[var(--text-main)] mb-2 text-sm sm:text-base">Why This Week Matters</h3>
                            <p className="text-[var(--text-main)] leading-relaxed text-xs sm:text-sm">
                                {weekData.why_it_matters}
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-md">
                            <h3 className="font-bold text-[var(--text-main)] mb-2 text-sm sm:text-base">How This Streamlines Your Business</h3>
                            <p className="text-[var(--text-main)] leading-relaxed text-xs sm:text-sm">
                                {weekData.how_it_streamlines}
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-md">
                            <h3 className="font-bold text-[var(--text-main)] mb-2 text-sm sm:text-base">How This Builds Client Relationships</h3>
                            <p className="text-[var(--text-main)] leading-relaxed text-xs sm:text-sm">
                                {weekData.how_it_builds_relationships}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Steps */}
                <div className="card p-3 sm:p-4 md:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-main)] mb-4 sm:mb-6">This Week's Action Steps</h3>
                    <div className="space-y-3 sm:space-y-4">
                        {(weekData.action_steps || []).map((step, index) => {
                            const isFoundationLinked = step.foundation_step_id && step.link_to && foundationProgress;
                            const isFoundationComplete = isFoundationLinked && foundationProgress?.completed_steps?.includes(step.foundation_step_id);

                            return (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800">
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <span className="bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-1 rounded">
                                                Step {index + 1}
                                            </span>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    onClick={() => handleCopilotClick(step, index)}
                                                    className="btn btn-ghost p-2 text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-white transition-colors"
                                                    title="Get AI help with this step"
                                                >
                                                    <Sparkles className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleExpandStep(index)}
                                                    className="btn btn-secondary text-xs py-2 px-3 whitespace-nowrap"
                                                >
                                                    <span className="hidden sm:inline">{expandedSteps[index] ? 'Hide Details' : 'Show Instructions'}</span>
                                                    <span className="sm:hidden">{expandedSteps[index] ? 'Hide' : 'Show'}</span>
                                                    <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${expandedSteps[index] ? 'rotate-90' : ''}`} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <h4 className="font-semibold text-[var(--text-main)] text-sm sm:text-base break-words">
                                                {step.title}
                                            </h4>
                                            <p className="text-[var(--text-soft)] mt-1 text-xs sm:text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            {step.deliverable && (
                                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 rounded-md">
                                                    <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                                                        <strong>🎯 Deliverable:</strong> {step.deliverable}
                                                    </p>
                                                </div>
                                            )}

                                            {step.time_estimate && (
                                                <div className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
                                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span>Estimated time: {step.time_estimate}</span>
                                                </div>
                                            )}

                                            {isFoundationLinked && (
                                                <button
                                                    onClick={() => navigate(createPageUrl(step.link_to))}
                                                    className="btn btn-primary w-full text-sm"
                                                >
                                                    <Wrench className="w-4 h-4 mr-2" />
                                                    {isFoundationComplete ? `Review ${step.title}` : `Go to ${step.title}`}
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </button>
                                            )}

                                            {/* Work Area / Answer Section */}
                                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
                                                        <FileText className="w-3 h-3 text-[var(--primary-gold)]" />
                                                        Your Answer / Notes
                                                    </label>
                                                    {isSavingAnswers[`${weekNumber}-${index}`] && (
                                                        <span className="text-xs text-green-500 flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" /> Saved
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {(() => {
                                                    const strategyType = getStrategyTypeFromLink(step.link_to);
                                                    const linkedDoc = strategyType ? strategyDocs[strategyType] : null;
                                                    const currentAnswer = stepAnswers[weekNumber]?.[index]?.answer || "";
                                                    
                                                    if (linkedDoc && !currentAnswer) {
                                                        // Pre-population logic or prompt
                                                        return (
                                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-md p-4">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-md">
                                                                        <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h5 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                                                                            Use data from your {linkedDoc.title || strategyType.replace('_', ' ')}?
                                                                        </h5>
                                                                        <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1 mb-3">
                                                                            You have a completed strategy document that matches this step.
                                                                        </p>
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => {
                                                                                    // Simple dump of content for now, ideally we'd pick specific fields
                                                                                    const content = JSON.stringify(linkedDoc.content, null, 2); 
                                                                                    handleAnswerChange(weekNumber, index, content);
                                                                                }}
                                                                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded transition-colors"
                                                                            >
                                                                                Import Data
                                                                            </button>
                                                                            <button
                                                                                onClick={() => navigate(createPageUrl(step.link_to))}
                                                                                className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                                            >
                                                                                View Document
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <div>
                                                                <textarea 
                                                                    value={currentAnswer}
                                                                    onChange={(e) => handleAnswerChange(weekNumber, index, e.target.value)}
                                                                    placeholder="Write your response, plan, or notes for this step here..."
                                                                    className="w-full min-h-[100px] p-3 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-[var(--primary-gold)] focus:border-[var(--primary-gold)]"
                                                                />
                                                                <div className="flex justify-end mt-2">
                                                                    <button
                                                                        onClick={() => handleSaveAnswer(weekNumber, index)}
                                                                        className="text-xs text-[var(--primary-gold)] hover:text-[var(--text-main)] font-medium flex items-center gap-1 transition-colors"
                                                                    >
                                                                        <Save className="w-3 h-3" /> Save Answer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })()}
                                            </div>

                                            {/* Related Resources - Static Injection for now as proof of concept */}
                                            {index === 0 && weekNumber === 1 && ( // Just an example condition, you can expand this logic
                                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    <h5 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-3 flex items-center gap-2">
                                                        <BookOpen className="w-3 h-3 text-[var(--primary-gold)]" />
                                                        Recommended Resources
                                                    </h5>
                                                    <div className="grid gap-2">
                                                        <button onClick={() => navigate(createPageUrl('QuickLessons'))} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-left group">
                                                            <div className="bg-white dark:bg-gray-700 p-1.5 rounded border border-gray-200 dark:border-gray-600 group-hover:border-[var(--primary-gold)] transition-colors">
                                                                <Lightbulb className="w-4 h-4 text-[var(--primary-gold)]" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-[var(--text-main)] group-hover:text-[var(--primary-gold)]">Quick Lesson: Foundation Basics</p>
                                                                <p className="text-xs text-[var(--text-soft)]">5 min read • Strategy</p>
                                                            </div>
                                                        </button>
                                                        <button onClick={() => navigate(createPageUrl('MindsetHacks'))} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-left group">
                                                            <div className="bg-white dark:bg-gray-700 p-1.5 rounded border border-gray-200 dark:border-gray-600 group-hover:border-[var(--primary-gold)] transition-colors">
                                                                <Brain className="w-4 h-4 text-purple-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-[var(--text-main)] group-hover:text-purple-500">Mindset: The Entrepreneur's Shift</p>
                                                                <p className="text-xs text-[var(--text-soft)]">Audio • Mental Performance</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <label className="flex items-center space-x-2 cursor-pointer mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                                            <input
                                                type="checkbox"
                                                checked={isFoundationLinked ? isFoundationComplete : !!completedSteps[index]}
                                                onChange={() => handleStepToggle(index)}
                                                className="h-4 w-4 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                                            />
                                            <span className="text-[var(--text-main)] text-xs sm:text-sm font-medium">
                                                {(isFoundationLinked ? isFoundationComplete : completedSteps[index]) ? '✅ Completed' : 'Mark as Complete'}
                                            </span>
                                        </label>
                                    </div>

                                    {expandedSteps[index] && (
                                        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                                            <div className="mb-6">
                                                <h5 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
                                                    <ListChecks className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)]" />
                                                    Step-by-Step Instructions
                                                </h5>
                                                <div className="space-y-3">
                                                    {(step.detailed_steps || []).map((detailStep, stepIdx) => (
                                                        <div key={stepIdx} className="flex items-start gap-3 p-3 bg-gray-800 rounded-md">
                                                            <span className="bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0">
                                                                {stepIdx + 1}
                                                            </span>
                                                            <p className="text-white text-xs sm:text-sm leading-relaxed">{detailStep}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {step.resources && step.resources.length > 0 && (
                                                <div className="mb-6">
                                                    <h5 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)]" />
                                                        Required Resources
                                                    </h5>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {step.resources.map((resource, resourceIdx) => (
                                                            <div key={resourceIdx} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                                                                <span className="text-[var(--primary-gold)]">📋</span>
                                                                <span className="text-[var(--text-main)] text-xs sm:text-sm">{resource}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mb-6">
                                                <h5 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary-gold)]" />
                                                    Tips & Best Practices
                                                </h5>
                                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-4">
                                                    <ul className="space-y-2">
                                                        {(step.tips || []).map((tip, tipIdx) => (
                                                            <li key={tipIdx} className="flex items-start gap-2 text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                                                                <span className="text-yellow-600 mt-1 flex-shrink-0">💡</span>
                                                                <span>{tip}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {step.common_challenges && step.common_challenges.length > 0 && (
                                                <div className="mb-6">
                                                    <h5 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                                        Watch Out For
                                                    </h5>
                                                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-md p-4">
                                                        <ul className="space-y-2">
                                                            {step.common_challenges.map((challenge, challengeIdx) => (
                                                                <li key={challengeIdx} className="flex items-start gap-2 text-xs sm:text-sm text-orange-800 dark:text-orange-200">
                                                                    <span className="text-orange-600 mt-1 flex-shrink-0">⚠️</span>
                                                                    <span>{challenge}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <h5 className="text-base sm:text-lg font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                                                    How You'll Know You're Done
                                                </h5>
                                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-4">
                                                    <ul className="space-y-2">
                                                        {(step.success_criteria || []).map((criteria, criteriaIdx) => (
                                                            <li key={criteriaIdx} className="flex items-start gap-2 text-xs sm:text-sm text-green-800 dark:text-green-200">
                                                                <span className="text-green-600 mt-1 flex-shrink-0">✅</span>
                                                                <span>{criteria}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tools & Resources */}
                {weekData.tools && weekData.tools.length > 0 && (
                    <div className="card p-4 sm:p-6">
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Tools & Resources</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {weekData.tools.map((tool, index) => (
                                <div key={index} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-md">
                                    <ToolIcon name={tool.icon} />
                                    <span className="text-[var(--text-main)] font-medium text-sm sm:text-base">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Notes Section */}
                <div className="card p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Your Notes & Reflections</h2>
                            <p className="text-[var(--text-soft)] text-sm sm:text-base">Save your insights and personal notes for this week.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <button
                                id="save-notes-btn"
                                onClick={() => {
                                    localStorage.setItem(`week_${weekNumber}_notes`, notes);
                                    const button = document.getElementById('save-notes-btn');
                                    const originalText = button.innerHTML;
                                    button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Saved!</span>';
                                    setTimeout(() => {
                                        button.innerHTML = originalText;
                                    }, 2000);
                                }}
                                className="btn btn-primary w-full sm:w-auto"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save Notes</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Personal Notes & Reflections
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add your personal thoughts, insights, and reflections for this week..."
                                className="form-input h-32 sm:h-48 resize-none text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 text-sm sm:text-base">💡 Pro Tips for Your Notes</h4>
                        <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 space-y-1">
                            <li>• Use this space to document your progress and key takeaways.</li>
                            <li>• Save important action items and deadlines from this week's work.</li>
                            <li>• Your notes are automatically saved locally and persist between sessions.</li>
                        </ul>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                    {weekNumber > 1 && (
                        <button onClick={() => navigateToWeek(weekNumber - 1)} className="btn btn-secondary">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous Week
                        </button>
                    )}
                    {weekNumber < totalWeeks && (
                        <button onClick={() => navigateToWeek(weekNumber + 1)} className="btn btn-primary ml-auto">
                            Next Week
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                </div>
            </div>

            <AICopilotModal
                isOpen={copilotModal.isOpen}
                onClose={() => setCopilotModal({ isOpen: false, copilotQuestions: [], actionStepTitle: '' })}
                copilotQuestions={copilotModal.copilotQuestions}
                actionStepTitle={copilotModal.actionStepTitle}
            />
        </div>
    );
}