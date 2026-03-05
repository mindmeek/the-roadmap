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
    const [activeNoteSection, setActiveNoteSection] = useState(null); // For editing note section titles

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
            
            if (staticDataRoot && staticDataRoot[stageKey] && staticDataRoot[stageKey].goals && staticDataRoot[stageKey].goals[goalKey]) {
                const goalData = staticDataRoot[stageKey].goals[goalKey];
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
                                stage: staticDataRoot[stageKey].title,
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

    const handleAddStepNote = (weekNum, stepIndex) => {
        setStepAnswers(prev => {
            const currentStepData = prev[weekNum]?.[stepIndex] || {};
            const currentNotes = currentStepData.additional_notes || [];
            return {
                ...prev,
                [weekNum]: {
                    ...(prev[weekNum] || {}),
                    [stepIndex]: {
                        ...currentStepData,
                        additional_notes: [
                            ...currentNotes,
                            { id: Date.now().toString(), title: `Note Section ${currentNotes.length + 1}`, content: '' }
                        ],
                        last_updated: new Date().toISOString()
                    }
                }
            };
        });
    };

    const handleUpdateStepNote = (weekNum, stepIndex, noteId, field, value) => {
        setStepAnswers(prev => {
            const currentStepData = prev[weekNum]?.[stepIndex] || {};
            const currentNotes = currentStepData.additional_notes || [];
            return {
                ...prev,
                [weekNum]: {
                    ...(prev[weekNum] || {}),
                    [stepIndex]: {
                        ...currentStepData,
                        additional_notes: currentNotes.map(n => n.id === noteId ? { ...n, [field]: value } : n),
                        last_updated: new Date().toISOString()
                    }
                }
            };
        });
    };

    const handleDeleteStepNote = (weekNum, stepIndex, noteId) => {
        if (!confirm('Are you sure you want to delete this note section?')) return;
        setStepAnswers(prev => {
            const currentStepData = prev[weekNum]?.[stepIndex] || {};
            const currentNotes = currentStepData.additional_notes || [];
            return {
                ...prev,
                [weekNum]: {
                    ...(prev[weekNum] || {}),
                    [stepIndex]: {
                        ...currentStepData,
                        additional_notes: currentNotes.filter(n => n.id !== noteId),
                        last_updated: new Date().toISOString()
                    }
                }
            };
        });
    };

    const handleSaveAnswer = async (weekNum, stepIndex) => {
        if (!foundationProgress) return;
        
        const savingKey = `${weekNum}-${stepIndex}`;
        setIsSavingAnswers(prev => ({ ...prev, [savingKey]: true }));

        try {
            const updatedAnswers = { ...stepAnswers };
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
                                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-[var(--primary-gold)]/10 p-1.5 rounded-md">
                                                            <FileText className="w-4 h-4 text-[var(--primary-gold)]" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-bold text-[var(--text-main)] block">
                                                                ✍️ This Week's Work: Your Answer & Notes
                                                            </label>
                                                            <span className="text-xs text-[var(--text-soft)]">
                                                                Do the work here. Your progress is saved automatically.
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {isSavingAnswers[`${weekNumber}-${index}`] && (
                                                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
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
                                                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-5">
                                                                <div className="flex items-start gap-4">
                                                                    <div className="p-3 bg-indigo-100 dark:bg-indigo-800 rounded-full">
                                                                        <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h5 className="text-base font-bold text-indigo-900 dark:text-indigo-100 mb-1">
                                                                            Foundational Data Available
                                                                        </h5>
                                                                        <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-4">
                                                                            You've already completed the <strong>{linkedDoc.title || strategyType.replace('_', ' ')}</strong> strategy. 
                                                                            Would you like to import that data to use as a starting point for this step?
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-3">
                                                                            <button
                                                                                onClick={() => {
                                                                                    // Simple dump of content for now
                                                                                    const content = JSON.stringify(linkedDoc.content, null, 2); 
                                                                                    handleAnswerChange(weekNumber, index, content);
                                                                                }}
                                                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
                                                                            >
                                                                                Yes, Import My Data
                                                                            </button>
                                                                            <button
                                                                                onClick={() => navigate(createPageUrl(step.link_to))}
                                                                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                                            >
                                                                                Review Original Document
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    } else {
                                                        const additionalNotes = stepAnswers[weekNumber]?.[index]?.additional_notes || [];
                                                        
                                                        return (
                                                            <div className="space-y-4">
                                                                {/* Main Answer Section */}
                                                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                                                    <h6 className="text-xs font-bold text-[var(--text-soft)] uppercase tracking-wide mb-2">Main Notes</h6>
                                                                    <textarea 
                                                                        value={currentAnswer}
                                                                        onChange={(e) => handleAnswerChange(weekNumber, index, e.target.value)}
                                                                        placeholder="Type your work, answers, and ideas for this step here..."
                                                                        className="w-full min-h-[150px] p-4 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                                                                    />
                                                                </div>

                                                                {/* Additional Note Sections */}
                                                                {additionalNotes.map((note) => (
                                                                    <div key={note.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700 relative group">
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <input
                                                                                type="text"
                                                                                value={note.title}
                                                                                onChange={(e) => handleUpdateStepNote(weekNumber, index, note.id, 'title', e.target.value)}
                                                                                className="bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[var(--primary-gold)] text-xs font-bold text-[var(--text-soft)] uppercase tracking-wide focus:outline-none w-full max-w-xs"
                                                                                placeholder="SECTION TITLE"
                                                                            />
                                                                            <button 
                                                                                onClick={() => handleDeleteStepNote(weekNumber, index, note.id)}
                                                                                className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                                title="Delete this section"
                                                                            >
                                                                                <Trash2 className="w-3 h-3" />
                                                                            </button>
                                                                        </div>
                                                                        <textarea 
                                                                            value={note.content}
                                                                            onChange={(e) => handleUpdateStepNote(weekNumber, index, note.id, 'content', e.target.value)}
                                                                            placeholder="Add notes for this specific part..."
                                                                            className="w-full min-h-[100px] p-4 text-sm sm:text-base bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-[var(--primary-gold)] focus:border-transparent transition-all leading-relaxed"
                                                                        />
                                                                    </div>
                                                                ))}

                                                                {/* Actions Footer */}
                                                                <div className="flex justify-between items-center pt-2">
                                                                    <button
                                                                        onClick={() => handleAddStepNote(weekNumber, index)}
                                                                        className="text-sm text-[var(--primary-gold)] hover:underline flex items-center gap-1 font-medium"
                                                                    >
                                                                        <Plus className="w-4 h-4" /> Add Note Section
                                                                    </button>
                                                                    
                                                                    <div className="flex items-center gap-3">
                                                                        <p className="text-xs text-[var(--text-soft)] italic hidden sm:block">
                                                                            * Changes save automatically
                                                                        </p>
                                                                        <button
                                                                            onClick={() => handleSaveAnswer(weekNumber, index)}
                                                                            className="btn btn-secondary btn-sm"
                                                                        >
                                                                            <Save className="w-3 h-3 mr-1" /> Force Save
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                })()}
                                            </div>


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

                {/* Notes Section */}
                <div className="card p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                <FileText className="w-6 h-6 text-[var(--primary-gold)]" />
                                Week Journal & Additional Notes
                            </h2>
                            <p className="text-[var(--text-soft)] text-sm mt-1">Capture extra thoughts, brainstorming, or specific details for this week.</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={addNoteSection} className="btn btn-secondary text-sm">
                                <Plus className="w-4 h-4 mr-1" /> Add Section
                            </button>
                            <button
                                id="save-notes-btn"
                                onClick={saveAllNotes}
                                className="btn btn-primary text-sm"
                            >
                                <Save className="w-4 h-4 mr-1" /> Save All
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {notes.map((note) => (
                            <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                    {activeNoteSection === note.id ? (
                                        <input
                                            type="text"
                                            value={note.title}
                                            onChange={(e) => updateNoteSection(note.id, 'title', e.target.value)}
                                            onBlur={() => setActiveNoteSection(null)}
                                            onKeyDown={(e) => e.key === 'Enter' && setActiveNoteSection(null)}
                                            className="bg-white dark:bg-gray-700 border border-[var(--primary-gold)] rounded px-2 py-1 text-sm font-bold w-full max-w-xs focus:outline-none"
                                            autoFocus
                                        />
                                    ) : (
                                        <h3 
                                            onClick={() => setActiveNoteSection(note.id)}
                                            className="font-bold text-[var(--text-main)] cursor-pointer hover:text-[var(--primary-gold)] flex items-center gap-2"
                                            title="Click to rename"
                                        >
                                            {note.title}
                                            <span className="text-xs text-[var(--text-soft)] font-normal opacity-0 hover:opacity-100 transition-opacity">(Edit Title)</span>
                                        </h3>
                                    )}
                                    <button 
                                        onClick={() => deleteNoteSection(note.id)}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                        title="Delete Section"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-0">
                                    <textarea
                                        value={note.content}
                                        onChange={(e) => updateNoteSection(note.id, 'content', e.target.value)}
                                        placeholder={`Add your ${note.title.toLowerCase()} here...`}
                                        className="w-full h-40 p-4 bg-transparent border-0 resize-y focus:ring-0 text-[var(--text-main)] text-sm leading-relaxed"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button onClick={addNoteSection} className="text-sm text-[var(--primary-gold)] hover:underline flex items-center gap-1 font-medium">
                            <Plus className="w-4 h-4" /> Add another note section
                        </button>
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