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
  BarChart, Plus, Trash2 // Added Plus and Trash2
} from 'lucide-react';
import AICopilotModal from '../components/ai/AICopilotModal';
import roadmapData from '../components/roadmap';
import { showXPToast } from '@/components/common/XPToast';
import { handleGamification } from '@/functions/handleGamification';

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
    const [notes, setNotes] = useState([]); // Changed to array for multiple sections
    const [loading, setLoading] = useState(true);
    const [weekNumber, setWeekNumber] = useState(1);
    const [completedSteps, setCompletedSteps] = useState({});
    const [expandedSteps, setExpandedSteps] = useState({});
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [stepAnswers, setStepAnswers] = useState({});
    const [isSavingAnswers, setIsSavingAnswers] = useState({});
    const [activeNoteSection, setActiveNoteSection] = useState(null);
    const [weeklyReflection, setWeeklyReflection] = useState(null);
    const [reflectionData, setReflectionData] = useState({
        main_reflection: '',
        key_takeaways: '',
        challenges_faced: '',
        next_week_focus: ''
    });
    const [isSavingReflection, setIsSavingReflection] = useState(false);
    const [reflectionSaved, setReflectionSaved] = useState(false);

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
                } else {
                    const newProgress = await base44.entities.FoundationProgress.create({
                        created_by: userData.email,
                        completed_steps: [],
                        step_completion_dates: {},
                        notes: {}
                    });
                    setFoundationProgress(newProgress);
                }
            } catch (progressError) {
                console.error("Error loading foundation progress:", progressError);
                setFoundationProgress(null);
            }

            const urlParams = new URLSearchParams(location.search);
            const urlWeek = urlParams.get('week');
            const currentWeek = urlWeek ? parseInt(urlWeek) : userData.current_week || 1;
            setWeekNumber(currentWeek);

            // --- LOAD WEEK CONTENT STRATEGY ---
            // 1. Try to find content in static roadmapData (Source of Truth for Dev changes)
            // 2. Try to fetch from DB (CMS override)
            // 3. Merge or fallback

            let foundWeekData = null;

            // 1. Static Data Lookup
            const stageKey = userData.entrepreneurship_stage;
            const goalKey = userData.selected_goal;
            
            // Handle both structure types if roadmapData has a default export or named export
            const staticDataRoot = roadmapData.default || roadmapData;
            
            // Check niche roadmaps if not found in standard stage goals
            const standardGoalData = staticDataRoot?.[stageKey]?.goals?.[goalKey];
            const nicheGoalData = staticDataRoot?.nicheRoadmaps?.[goalKey];
            const goalDataSource = standardGoalData || nicheGoalData;
            
            if (goalDataSource && goalDataSource.months) {
                const goalData = goalDataSource;
                let weekCount = 0;
                
                // Find the correct week across months
                for (let m = 0; m < goalData.months.length; m++) {
                    const month = goalData.months[m];
                    if (currentWeek <= weekCount + month.weeks.length) {
                        const weekIndex = currentWeek - weekCount - 1;
                        const staticWeek = month.weeks[weekIndex];
                        
                        if (staticWeek) {
                            // Map static structure to component expectation
                            foundWeekData = {
                                stage: staticDataRoot?.[stageKey]?.title || goalDataSource?.title || 'Your Journey',
                                week_title: staticWeek.title,
                                week_description: staticWeek.description,
                                month_number: m + 1,
                                why_it_matters: staticWeek.whyItMatters,
                                how_it_streamlines: staticWeek.howItStreamlines,
                                how_it_builds_relationships: staticWeek.howItBuildsRelationships,
                                action_steps: staticWeek.actionSteps.map(step => ({
                                    ...step,
                                    link_to: step.linkTo,
                                    foundation_step_id: step.foundationStepId,
                                    time_estimate: step.timeEstimate,
                                    detailed_steps: step.detailedSteps,
                                    success_criteria: step.successCriteria,
                                    common_challenges: step.commonChallenges
                                })),
                                tools: staticWeek.tools || [],
                                resources: staticWeek.resources || []
                            };
                        }
                        break;
                    }
                    weekCount += month.weeks.length;
                }
            }

            // 2. DB Lookup (Optional: Could overwrite specific fields if needed, but we prioritize code updates for now)
            try {
                const dbContent = await base44.entities.RoadmapContent.filter({
                    stage: stageKey,
                    goal_id: goalKey,
                    week_number: currentWeek
                });
                
                if (dbContent && dbContent.length > 0) {
                    const dbWeek = dbContent[0];
                    // If we found static data, maybe just use DB for published status or dynamic overrides?
                    // For now, if we have static data, use it to ensure "changes show up".
                    // If NO static data found, fallback to DB.
                    if (!foundWeekData) {
                        foundWeekData = dbWeek;
                    } else {
                        // Optional: Merge DB props if they are strictly newer/better? 
                        // Right now user wants "file changes" to show up, so we stick with foundWeekData from file.
                        // console.log("Using static data over DB data for this week");
                    }
                }
            } catch (err) {
                console.warn("DB Content fetch failed, relying on static data", err);
            }

            if (!foundWeekData) {
                console.error(`Week ${currentWeek} not found in static or DB`);
                setWeekData(null);
                setLoading(false);
                return;
            }

            setWeekData(foundWeekData);

            // Load WeeklyReflection for this week
            try {
                const reflections = await base44.entities.WeeklyReflection.filter({
                    created_by: userData.email,
                    week_number: currentWeek
                });
                if (reflections.length > 0) {
                    setWeeklyReflection(reflections[0]);
                    setReflectionData({
                        main_reflection: reflections[0].main_reflection || '',
                        key_takeaways: (reflections[0].key_takeaways || []).join('\n'),
                        challenges_faced: reflections[0].challenges_faced || '',
                        next_week_focus: reflections[0].next_week_focus || ''
                    });
                    setStepAnswers(reflections[0].action_step_responses || []);
                }
            } catch (err) {
                console.warn("Could not load weekly reflection", err);
            }

            // Migrate old string notes to new array format if necessary
            const savedNotesRaw = localStorage.getItem(`week_${currentWeek}_notes`);
            let parsedNotes = [];
            try {
                parsedNotes = JSON.parse(savedNotesRaw);
                if (!Array.isArray(parsedNotes)) throw new Error("Not an array");
            } catch (e) {
                // Handle legacy string format or empty
                if (savedNotesRaw && typeof savedNotesRaw === 'string' && !savedNotesRaw.startsWith('[')) {
                    parsedNotes = [{ id: Date.now(), title: 'General Notes', content: savedNotesRaw }];
                } else {
                    parsedNotes = [{ id: Date.now(), title: 'General Notes', content: '' }];
                }
            }
            setNotes(parsedNotes);

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

    const handleAnswerChange = (stepIndex, detailIndex, value) => {
        setStepAnswers(prev => {
            const updated = Array.isArray(prev) ? [...prev] : [];
            const currentStep = updated[stepIndex] ? { ...updated[stepIndex] } : {};
            const currentResponses = Array.isArray(currentStep.step_responses) ? [...currentStep.step_responses] : [];
            currentResponses[detailIndex] = value;
            updated[stepIndex] = {
                ...currentStep,
                step_title: weekData?.action_steps?.[stepIndex]?.title || '',
                step_responses: currentResponses
            };
            return updated;
        });
    };

    const handleSaveAnswer = async (stepIndex) => {
        const savingKey = `step-${stepIndex}`;
        setIsSavingAnswers(prev => ({ ...prev, [savingKey]: true }));
        try {
            const updatedResponses = Array.isArray(stepAnswers) ? stepAnswers : [];
            if (weeklyReflection) {
                await base44.entities.WeeklyReflection.update(weeklyReflection.id, { action_step_responses: updatedResponses });
            } else {
                const created = await base44.entities.WeeklyReflection.create({
                    user_id: user?.id,
                    week_number: weekNumber,
                    month_number: weekData?.month_number || 1,
                    stage: user?.entrepreneurship_stage,
                    goal_id: user?.selected_goal,
                    action_step_responses: updatedResponses
                });
                setWeeklyReflection(created);
            }
            setTimeout(() => setIsSavingAnswers(prev => ({ ...prev, [savingKey]: false })), 800);
        } catch (error) {
            console.error("Error saving answer:", error);
            setIsSavingAnswers(prev => ({ ...prev, [savingKey]: false }));
        }
    };

    const handleSaveReflection = async () => {
        setIsSavingReflection(true);
        try {
            const payload = {
                user_id: user?.id,
                week_number: weekNumber,
                month_number: weekData?.month_number || 1,
                stage: user?.entrepreneurship_stage,
                goal_id: user?.selected_goal,
                main_reflection: reflectionData.main_reflection,
                key_takeaways: reflectionData.key_takeaways.split('\n').map(s => s.trim()).filter(Boolean),
                challenges_faced: reflectionData.challenges_faced,
                next_week_focus: reflectionData.next_week_focus,
                is_completed: true,
                completion_date: new Date().toISOString()
            };
            if (weeklyReflection) {
                await base44.entities.WeeklyReflection.update(weeklyReflection.id, payload);
            } else {
                const created = await base44.entities.WeeklyReflection.create(payload);
                setWeeklyReflection(created);
            }
            setReflectionSaved(true);
            setTimeout(() => setReflectionSaved(false), 3000);
        } catch (error) {
            console.error("Error saving reflection:", error);
        } finally {
            setIsSavingReflection(false);
        }
    };

    // Note Section Handlers
    const addNoteSection = () => {
        setNotes(prev => [...prev, { id: Date.now(), title: 'New Section', content: '' }]);
    };

    const updateNoteSection = (id, field, value) => {
        setNotes(prev => prev.map(note => note.id === id ? { ...note, [field]: value } : note));
    };

    const deleteNoteSection = (id) => {
        if (confirm('Delete this note section?')) {
            setNotes(prev => prev.filter(note => note.id !== id));
        }
    };

    const saveAllNotes = () => {
        localStorage.setItem(`week_${weekNumber}_notes`, JSON.stringify(notes));
        const button = document.getElementById('save-notes-btn');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Saved!</span>';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
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
            showXPToast({ xp: 30, message: `Week ${weekNumber} Complete! 🎉` });
            handleGamification({ action: 'COMPLETE_JOURNEY_WEEK' });
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
                <div className="card p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-[var(--primary-gold)]/10 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-[var(--primary-gold)]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">Week Overview</h2>
                    </div>
                    
                    <p className="text-[var(--text-main)] text-base sm:text-lg leading-relaxed mb-8 border-l-4 border-[var(--primary-gold)] pl-4 italic">
                        {weekData.week_description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <Star className="w-5 h-5 text-yellow-600" />
                                <h3 className="font-bold text-[var(--text-main)] text-sm uppercase tracking-wide">Why This Matters</h3>
                            </div>
                            <p className="text-[var(--text-main)] leading-relaxed text-sm">
                                {weekData.why_it_matters}
                            </p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-[var(--text-main)] text-sm uppercase tracking-wide">Streamlining Impact</h3>
                            </div>
                            <p className="text-[var(--text-main)] leading-relaxed text-sm">
                                {weekData.how_it_streamlines}
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <Heart className="w-5 h-5 text-green-600" />
                                <h3 className="font-bold text-[var(--text-main)] text-sm uppercase tracking-wide">Client Relationships</h3>
                            </div>
                            <p className="text-[var(--text-main)] leading-relaxed text-sm">
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

                            const savingKey = `step-${index}`;
                            const stepResponses = Array.isArray(stepAnswers) ? (stepAnswers[index]?.step_responses || []) : [];

                            return (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    {/* Step Header */}
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <span className="bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-1 rounded">
                                                Action Step {index + 1}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {isSavingAnswers[savingKey] && (
                                                    <span className="text-xs text-green-600 flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" /> Saved
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => handleCopilotClick(step, index)}
                                                    className="btn btn-ghost p-2 text-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-white transition-colors"
                                                    title="Get AI help with this step"
                                                >
                                                    <Sparkles className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-[var(--text-main)] text-base mb-1">{step.title}</h4>
                                        <p className="text-[var(--text-soft)] text-sm leading-relaxed">{step.description}</p>

                                        <div className="flex flex-wrap gap-3 mt-3">
                                            {step.deliverable && (
                                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 px-3 py-1.5 rounded-md">
                                                    <p className="text-xs text-blue-800 dark:text-blue-200"><strong>🎯 Deliverable:</strong> {step.deliverable}</p>
                                                </div>
                                            )}
                                            {step.time_estimate && (
                                                <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{step.time_estimate}</span>
                                                </div>
                                            )}
                                        </div>

                                        {isFoundationLinked && (
                                            <button
                                                onClick={() => navigate(createPageUrl(step.link_to))}
                                                className="btn btn-primary w-full text-sm mt-3"
                                            >
                                                <Wrench className="w-4 h-4 mr-2" />
                                                {isFoundationComplete ? `Review ${step.title}` : `Open ${step.title} Tool`}
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Instructions + Forms (always visible) */}
                                    <div className="p-4 bg-white dark:bg-gray-900 space-y-5">

                                        {/* Tips */}
                                        {step.tips && step.tips.length > 0 && (
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md p-3">
                                                <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300 mb-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Pro Tips</p>
                                                <ul className="space-y-1">
                                                    {step.tips.map((tip, tIdx) => (
                                                        <li key={tIdx} className="text-xs text-yellow-800 dark:text-yellow-200 flex items-start gap-1.5">
                                                            <span className="flex-shrink-0">💡</span><span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Each detailed step gets its own form */}
                                        {(step.detailed_steps || []).length > 0 ? (
                                            <div className="space-y-4">
                                                <h5 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                                                    <ListChecks className="w-4 h-4 text-[var(--primary-gold)]" /> Do The Work
                                                </h5>
                                                {(step.detailed_steps || []).map((detailStep, dIdx) => (
                                                    <div key={dIdx} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                                                        <div className="flex items-start gap-3 p-3 bg-gray-800">
                                                            <span className="bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0">
                                                                {dIdx + 1}
                                                            </span>
                                                            <p className="text-white text-sm leading-relaxed">{detailStep}</p>
                                                        </div>
                                                        <div className="p-3 bg-white dark:bg-gray-900">
                                                            <textarea
                                                                value={stepResponses[dIdx] || ''}
                                                                onChange={(e) => handleAnswerChange(index, dIdx, e.target.value)}
                                                                onBlur={() => handleSaveAnswer(index)}
                                                                placeholder="Your response for this step..."
                                                                rows={3}
                                                                className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="flex justify-end">
                                                    <button onClick={() => handleSaveAnswer(index)} className="btn btn-secondary btn-sm">
                                                        <Save className="w-3 h-3 mr-1" /> Save Responses
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Fallback: single textarea if no detailed steps
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-[var(--text-main)]">✍️ Your Work</label>
                                                <textarea
                                                    value={stepResponses[0] || ''}
                                                    onChange={(e) => handleAnswerChange(index, 0, e.target.value)}
                                                    onBlur={() => handleSaveAnswer(index)}
                                                    placeholder={`Write your work, ideas, and notes for "${step.title}" here...`}
                                                    rows={4}
                                                    className="w-full p-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                                                />
                                                <div className="flex justify-end">
                                                    <button onClick={() => handleSaveAnswer(index)} className="btn btn-secondary btn-sm">
                                                        <Save className="w-3 h-3 mr-1" /> Save
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Common Challenges */}
                                        {step.common_challenges && step.common_challenges.length > 0 && (
                                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-md p-3">
                                                <p className="text-xs font-bold text-orange-800 dark:text-orange-300 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Watch Out For</p>
                                                <ul className="space-y-1">
                                                    {step.common_challenges.map((c, cIdx) => (
                                                        <li key={cIdx} className="text-xs text-orange-800 dark:text-orange-200 flex items-start gap-1.5">
                                                            <span className="flex-shrink-0">⚠️</span><span>{c}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Success Criteria */}
                                        {step.success_criteria && step.success_criteria.length > 0 && (
                                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-3">
                                                <p className="text-xs font-bold text-green-800 dark:text-green-300 mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> You're Done When...</p>
                                                <ul className="space-y-1">
                                                    {step.success_criteria.map((sc, scIdx) => (
                                                        <li key={scIdx} className="text-xs text-green-800 dark:text-green-200 flex items-start gap-1.5">
                                                            <span className="flex-shrink-0">✅</span><span>{sc}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Mark Complete */}
                                        <label className="flex items-center space-x-2 cursor-pointer pt-2 border-t border-gray-200 dark:border-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={isFoundationLinked ? isFoundationComplete : !!completedSteps[index]}
                                                onChange={() => handleStepToggle(index)}
                                                className="h-4 w-4 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                                            />
                                            <span className="text-[var(--text-main)] text-sm font-medium">
                                                {(isFoundationLinked ? isFoundationComplete : completedSteps[index]) ? '✅ Completed' : 'Mark as Complete'}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommended Resources */}
                {weekData.resources && weekData.resources.length > 0 && (
                    <div className="card p-4 sm:p-6">
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary-gold)]" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-main)]">Recommended Resources</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {weekData.resources.map((resource, index) => {
                                const isString = typeof resource === 'string';
                                const title = isString ? resource : resource.title;
                                const type = isString ? 'Resource' : resource.type;
                                const iconName = isString ? 'BookOpen' : (resource.icon || 'BookOpen');
                                const link = isString ? null : resource.link;
                                
                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => link && navigate(createPageUrl(link))}
                                        className={`flex items-start space-x-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors ${link ? 'cursor-pointer hover:border-[var(--primary-gold)] group' : ''}`}
                                    >
                                        <div className="bg-white dark:bg-gray-700 p-2 rounded-md shadow-sm">
                                            <ToolIcon name={iconName} />
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold text-[var(--text-main)] ${link ? 'group-hover:text-[var(--primary-gold)]' : ''}`}>{title}</h4>
                                            <p className="text-xs text-[var(--text-soft)] mt-1">{type}</p>
                                        </div>
                                        {link && <ChevronRight className="w-4 h-4 text-gray-400 ml-auto self-center group-hover:text-[var(--primary-gold)]" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Weekly Reflection Form */}
                <div className="card p-6 sm:p-8 border-2 border-[var(--primary-gold)]/30">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[var(--primary-gold)]/10 p-2 rounded-lg">
                            <ClipboardCheck className="w-6 h-6 text-[var(--primary-gold)]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">Weekly Reflection</h2>
                            <p className="text-sm text-[var(--text-soft)]">Complete this at the end of the week to lock in your learning and plan ahead.</p>
                        </div>
                        {weeklyReflection?.is_completed && (
                            <span className="ml-auto flex items-center gap-1 text-xs text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full font-semibold">
                                <CheckCircle className="w-3 h-3" /> Reflection Saved
                            </span>
                        )}
                    </div>

                    <div className="mt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-main)] mb-2">
                                1. What was your biggest win or progress this week?
                            </label>
                            <textarea
                                value={reflectionData.main_reflection}
                                onChange={(e) => setReflectionData(prev => ({ ...prev, main_reflection: e.target.value }))}
                                placeholder="Describe what you accomplished, how you showed up, and what moved the needle for your business..."
                                rows={4}
                                className="w-full p-4 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[var(--text-main)] mb-1">
                                2. What were your top 3 key takeaways or lessons learned?
                            </label>
                            <p className="text-xs text-[var(--text-soft)] mb-2">One takeaway per line.</p>
                            <textarea
                                value={reflectionData.key_takeaways}
                                onChange={(e) => setReflectionData(prev => ({ ...prev, key_takeaways: e.target.value }))}
                                placeholder={"1. I learned that...\n2. I discovered...\n3. The most important insight was..."}
                                rows={4}
                                className="w-full p-4 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[var(--text-main)] mb-2">
                                3. What challenges did you face, and how did you handle them?
                            </label>
                            <textarea
                                value={reflectionData.challenges_faced}
                                onChange={(e) => setReflectionData(prev => ({ ...prev, challenges_faced: e.target.value }))}
                                placeholder="Be honest. Identifying obstacles is the first step to overcoming them..."
                                rows={3}
                                className="w-full p-4 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[var(--text-main)] mb-2">
                                4. What is your #1 focus for next week?
                            </label>
                            <textarea
                                value={reflectionData.next_week_focus}
                                onChange={(e) => setReflectionData(prev => ({ ...prev, next_week_focus: e.target.value }))}
                                placeholder="Be specific. What ONE thing, if done, would make next week a success?"
                                rows={3}
                                className="w-full p-4 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                            />
                        </div>

                        <div className="flex justify-end items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                            {reflectionSaved && (
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" /> Reflection saved!
                                </span>
                            )}
                            <button
                                onClick={handleSaveReflection}
                                disabled={isSavingReflection || !reflectionData.main_reflection.trim()}
                                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSavingReflection ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Save className="w-4 h-4 mr-2" /> Save Reflection</>
                                )}
                            </button>
                        </div>
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