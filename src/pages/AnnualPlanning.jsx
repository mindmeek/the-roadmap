import React, { useState, useEffect } from "react";
import { AnnualPlan, User } from "@/entities/all";
import { base44 } from "@/api/base44Client";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Target, Calendar, Sparkles, Plus, Trash2, Save, 
    ChevronDown, ChevronUp, CheckCircle2, Circle, Loader2, 
    ArrowLeft, BarChart2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnualPlanningPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeQuarter, setActiveQuarter] = useState(1);
    const [showQuestionnaire, setShowQuestionnaire] = useState(false);
    const [questionnaireStep, setQuestionnaireStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [financialGoal, setFinancialGoal] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const userData = await User.me();
            setUser(userData);
            
            const userPlans = await AnnualPlan.filter({ created_by: userData.email }, "-year");
            setPlans(userPlans);
            
            if (userData.financial_projections?.freedom_number) {
                setFinancialGoal(userData.financial_projections.freedom_number);
            }

            if (userPlans.length > 0) {
                // Migrate old string key_results to objects if necessary
                const plan = userPlans[0];
                const migratedObjectives = plan.quarterly_objectives.map(obj => ({
                    ...obj,
                    key_results: obj.key_results.map(kr => 
                        typeof kr === 'string' ? { text: kr, is_completed: false, added_to_daily: false } : kr
                    )
                }));
                setCurrentPlan({ ...plan, quarterly_objectives: migratedObjectives });
            } else {
                // Initialize empty state for new plan creation
                setCurrentPlan({
                    year: new Date().getFullYear() + 1,
                    title: "",
                    vision_description: "",
                    quarterly_objectives: [1, 2, 3, 4].map(q => ({
                        quarter: q,
                        objective: "",
                        key_results: [],
                        linked_resources: [],
                        status: "not_started"
                    })),
                    status: "draft"
                });
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Error loading plans:", error);
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Questions Configuration
    const getQuestions = () => {
        const stage = user?.entrepreneurship_stage || 'vision';
        
        const commonQuestions = [
            {
                id: 'main_goal',
                label: "What is your #1 goal for the upcoming year?",
                type: 'text',
                placeholder: "e.g., Launch my product, Hit $100k revenue..."
            },
            {
                id: 'resources',
                label: "How much time can you dedicate weekly?",
                type: 'select',
                options: ["0-5 hours", "5-10 hours", "10-20 hours", "20-40 hours", "Full time (40+)"]
            }
        ];

        const stageSpecific = {
            vision: [
                {
                    id: 'challenges',
                    label: "What's stopping you from starting?",
                    type: 'multi-select',
                    options: ["I don't have a clear idea", "I have too many ideas", "Fear of failure", "Lack of capital", "No business knowledge"]
                },
                {
                    id: 'skills',
                    label: "What are your core strengths?",
                    type: 'text',
                    placeholder: "e.g., Marketing, Coding, Writing..."
                }
            ],
            startup: [
                {
                    id: 'challenges',
                    label: "Biggest startup challenge right now?",
                    type: 'multi-select',
                    options: ["Finding product-market fit", "Getting first customers", "Building the MVP", "Pricing strategy", "Legal/Admin setup"]
                },
                {
                    id: 'revenue_status',
                    label: "Current Revenue Status",
                    type: 'select',
                    options: ["Pre-revenue", "Sporadic sales", "Consistent but low", "Growing steadily"]
                }
            ],
            growth: [
                {
                    id: 'challenges',
                    label: "What is the bottleneck to scaling?",
                    type: 'multi-select',
                    options: ["Hiring/Team management", "Operational chaos", "Marketing costs", "Customer retention", "Automation"]
                },
                {
                    id: 'focus_area',
                    label: "Primary Focus Area",
                    type: 'select',
                    options: ["Team Expansion", "New Market Entry", "Product Line Extension", "Process Optimization"]
                }
            ]
        };

        return [...commonQuestions, ...(stageSpecific[stage] || stageSpecific.vision)];
    };

    const handleAnswer = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const toggleMultiSelect = (id, option) => {
        setAnswers(prev => {
            const current = prev[id] || [];
            if (current.includes(option)) {
                return { ...prev, [id]: current.filter(i => i !== option) };
            } else {
                return { ...prev, [id]: [...current, option] };
            }
        });
    };

    const submitQuestionnaire = async () => {
        setShowQuestionnaire(false);
        setIsGenerating(true);
        try {
            const { data } = await base44.functions.invoke('generateAnnualPlan', {
                questionnaire_responses: answers,
                entrepreneurship_stage: user?.entrepreneurship_stage,
                selected_goal: user?.selected_goal
            });

            if (data?.plan) {
                const newObjectives = data.plan.quarterly_objectives.map(obj => ({
                    ...obj,
                    status: "not_started",
                    // Ensure key results are objects
                    key_results: obj.key_results.map(kr => 
                        typeof kr === 'string' ? { text: kr, is_completed: false } : kr
                    )
                }));

                setCurrentPlan(prev => ({
                    ...prev,
                    title: data.plan.title,
                    vision_description: data.plan.vision_description,
                    financial_goal_snapshot: data.plan.financial_goal_snapshot,
                    quarterly_objectives: newObjectives
                }));
                setIsEditing(true); // Put into edit mode to review
            }
        } catch (error) {
            console.error("Error generating plan:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const renderQuestionnaire = () => {
        if (!showQuestionnaire) return null;
        
        const questions = getQuestions();
        const currentQ = questions[questionnaireStep];
        const isLast = questionnaireStep === questions.length - 1;

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-700"
                >
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-[var(--text-main)]">Let's Build Your Plan</h3>
                            <span className="text-xs text-[var(--text-soft)]">Step {questionnaireStep + 1} of {questions.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div 
                                className="bg-[var(--primary-gold)] h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${((questionnaireStep + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="min-h-[200px]">
                        <h4 className="text-lg font-medium mb-4 text-[var(--text-main)]">{currentQ.label}</h4>
                        
                        {currentQ.type === 'text' && (
                            <input 
                                type="text" 
                                className="form-input w-full" 
                                placeholder={currentQ.placeholder}
                                value={answers[currentQ.id] || ''}
                                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                                autoFocus
                            />
                        )}

                        {currentQ.type === 'select' && (
                            <div className="space-y-2">
                                {currentQ.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleAnswer(currentQ.id, opt)}
                                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                                            answers[currentQ.id] === opt 
                                                ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]' 
                                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.type === 'multi-select' && (
                            <div className="space-y-2">
                                {currentQ.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => toggleMultiSelect(currentQ.id, opt)}
                                        className={`w-full p-3 text-left rounded-lg border transition-all flex justify-between items-center ${
                                            (answers[currentQ.id] || []).includes(opt)
                                                ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/10 text-[var(--primary-gold)]' 
                                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <span>{opt}</span>
                                        {(answers[currentQ.id] || []).includes(opt) && <CheckCircle2 className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button 
                            onClick={() => {
                                if (questionnaireStep > 0) setQuestionnaireStep(p => p - 1);
                                else setShowQuestionnaire(false);
                            }}
                            className="btn btn-ghost"
                        >
                            Back
                        </button>
                        <button 
                            onClick={() => {
                                if (isLast) submitQuestionnaire();
                                else setQuestionnaireStep(p => p + 1);
                            }}
                            disabled={!answers[currentQ.id] || (Array.isArray(answers[currentQ.id]) && answers[currentQ.id].length === 0)}
                            className="btn btn-primary"
                        >
                            {isLast ? 'Generate Plan' : 'Next'}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    };

    const handleGeneratePlan = () => {
        setQuestionnaireStep(0);
        setAnswers({});
        setShowQuestionnaire(true);
    };

    const handleSavePlan = async () => {
        try {
            if (currentPlan.id) {
                await AnnualPlan.update(currentPlan.id, currentPlan);
            } else {
                const newPlan = await AnnualPlan.create(currentPlan);
                setCurrentPlan(newPlan);
                setPlans(prev => [newPlan, ...prev]);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving plan:", error);
        }
    };

    const updateQuarterlyObjective = (quarterIndex, field, value) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex] = {
            ...newObjectives[quarterIndex],
            [field]: value
        };
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const addKeyResult = (quarterIndex) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        if (!newObjectives[quarterIndex].key_results) {
            newObjectives[quarterIndex].key_results = [];
        }
        newObjectives[quarterIndex].key_results.push({ text: "", is_completed: false });
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const updateKeyResultText = (quarterIndex, krIndex, value) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex].key_results[krIndex] = {
            ...newObjectives[quarterIndex].key_results[krIndex],
            text: value
        };
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const toggleKeyResult = async (quarterIndex, krIndex) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        const kr = newObjectives[quarterIndex].key_results[krIndex];
        newObjectives[quarterIndex].key_results[krIndex] = {
            ...kr,
            is_completed: !kr.is_completed
        };
        
        // Optimistic update
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));

        // Save to DB if plan exists
        if (currentPlan.id) {
            try {
                await AnnualPlan.update(currentPlan.id, { quarterly_objectives: newObjectives });
            } catch (error) {
                console.error("Failed to save progress", error);
            }
        }
    };

    const removeKeyResult = (quarterIndex, krIndex) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex].key_results = newObjectives[quarterIndex].key_results.filter((_, i) => i !== krIndex);
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {renderQuestionnaire()}
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[var(--primary-gold)]" />
                                Annual Strategy {currentPlan?.year}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={handleGeneratePlan} 
                                    disabled={isGenerating}
                                    className="btn btn-secondary text-sm flex items-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    <span className="hidden sm:inline">AI Draft</span>
                                </button>
                                <button onClick={handleSavePlan} className="btn btn-primary text-sm flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    <span className="hidden sm:inline">Save Plan</span>
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary text-sm">
                                Edit Plan
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                {/* Vision & Financial Goal Section */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
                        <div className="flex items-start gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                                <Target className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-1">Annual Theme / Title</label>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            value={currentPlan.title}
                                            onChange={(e) => setCurrentPlan(prev => ({ ...prev, title: e.target.value }))}
                                            className="form-input text-lg font-bold"
                                            placeholder="e.g., The Year of Expansion"
                                        />
                                    ) : (
                                        <h2 className="text-2xl font-bold text-[var(--text-main)]">{currentPlan.title || "Untitled Plan"}</h2>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-indigo-900 dark:text-indigo-200 mb-1">Strategic Vision</label>
                                    {isEditing ? (
                                        <textarea 
                                            value={currentPlan.vision_description}
                                            onChange={(e) => setCurrentPlan(prev => ({ ...prev, vision_description: e.target.value }))}
                                            className="form-input h-24"
                                            placeholder="What does success look like by December 31st?"
                                        />
                                    ) : (
                                        <p className="text-[var(--text-main)] whitespace-pre-wrap">{currentPlan.vision_description || "No vision defined yet."}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Financial Goal Card */}
                    <div className="card h-full min-h-[140px] relative overflow-hidden border-0 shadow-lg group">
                        {/* Background Image & Overlays */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                                alt="Financial Success" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-emerald-900/90 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/60 to-transparent opacity-95"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                                        Financial Freedom Goal
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                                            {financialGoal 
                                                ? `$${(parseInt(financialGoal) * 12).toLocaleString()}` 
                                                : currentPlan.financial_goal_snapshot 
                                                    ? currentPlan.financial_goal_snapshot 
                                                    : "$0"
                                            }
                                        </p>
                                        <span className="text-sm text-emerald-200/80 font-medium">/ year</span>
                                    </div>
                                    <p className="text-xs text-emerald-200/60 mt-1 font-medium">
                                        Target: ${financialGoal ? parseInt(financialGoal).toLocaleString() : '0'} / month
                                    </p>
                                </div>
                                {!financialGoal && (
                                    <button 
                                        onClick={() => navigate(createPageUrl('FreedomCalculator'))} 
                                        className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all backdrop-blur-md border border-white/10 font-medium shadow-sm hover:shadow-md"
                                    >
                                        Set Goal
                                    </button>
                                )}
                            </div>
                            
                            {/* Breakdown Stats - Clean Grid */}
                            {user?.financial_projections && (
                                <div className="mt-2 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-emerald-200/60 mb-0.5">Personal</span>
                                        <span className="text-sm font-bold text-white">${parseInt(user.financial_projections.monthlyExpenses || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-emerald-200/60 mb-0.5">Desired Salary</span>
                                        <span className="text-sm font-bold text-white">${parseInt(user.financial_projections.desiredSalary || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-emerald-200/60 mb-0.5">Business Costs</span>
                                        <span className="text-sm font-bold text-white">${parseInt(user.financial_projections.businessExpenses || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-wider text-emerald-200/60 mb-0.5">Safety Buffer</span>
                                        <span className="text-sm font-bold text-white">{user.financial_projections.emergencyBuffer || 20}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quarterly Objectives */}
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {[1, 2, 3, 4].map(q => (
                        <button
                            key={q}
                            onClick={() => setActiveQuarter(q)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                activeQuarter === q 
                                    ? 'border-[var(--primary-gold)] bg-white dark:bg-gray-800 shadow-md' 
                                    : 'border-transparent bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            <div className="text-xs font-bold uppercase text-[var(--text-soft)] mb-1">Quarter {q}</div>
                            <div className="font-semibold text-[var(--text-main)] truncate">
                                {currentPlan.quarterly_objectives[q-1]?.objective || "Set Objective"}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="card p-6 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeQuarter}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-[var(--primary-gold)]" />
                                    Q{activeQuarter} Objectives
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    currentPlan.quarterly_objectives[activeQuarter-1].status === 'completed' ? 'bg-green-100 text-green-700' :
                                    currentPlan.quarterly_objectives[activeQuarter-1].status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {currentPlan.quarterly_objectives[activeQuarter-1].status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-soft)] mb-2">Main Objective</label>
                                    {isEditing ? (
                                        <input 
                                            type="text"
                                            value={currentPlan.quarterly_objectives[activeQuarter-1].objective}
                                            onChange={(e) => updateQuarterlyObjective(activeQuarter-1, 'objective', e.target.value)}
                                            className="form-input text-lg"
                                            placeholder={`What is the main goal for Q${activeQuarter}?`}
                                        />
                                    ) : (
                                        <p className="text-lg font-medium text-[var(--text-main)]">
                                            {currentPlan.quarterly_objectives[activeQuarter-1].objective || "No objective set."}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-soft)] mb-2">Key Results (Measurable Outcomes)</label>
                                    <div className="space-y-3">
                                        {currentPlan.quarterly_objectives[activeQuarter-1].key_results?.map((kr, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                {isEditing ? (
                                                    <div className="mt-3">
                                                        <Target className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => toggleKeyResult(activeQuarter-1, idx)}
                                                        className="mt-3 flex-shrink-0"
                                                    >
                                                        {kr.is_completed ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <Circle className="w-5 h-5 text-gray-300 hover:text-[var(--primary-gold)]" />
                                                        )}
                                                    </button>
                                                )}
                                                
                                                {isEditing ? (
                                                    <>
                                                        <input 
                                                            type="text"
                                                            value={kr.text || kr}
                                                            onChange={(e) => updateKeyResultText(activeQuarter-1, idx, e.target.value)}
                                                            className="form-input flex-1"
                                                            placeholder="e.g., Reach $50k in revenue"
                                                        />
                                                        <button 
                                                            onClick={() => removeKeyResult(activeQuarter-1, idx)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full mt-1"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className={`flex-1 p-3 rounded border transition-all ${
                                                        kr.is_completed 
                                                            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                                                            : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                                                    }`}>
                                                        <p className={`${kr.is_completed ? 'line-through text-gray-500' : 'text-[var(--text-main)]'}`}>
                                                            {kr.text || kr}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        
                                        {isEditing && (
                                            <button 
                                                onClick={() => addKeyResult(activeQuarter-1)}
                                                className="flex items-center gap-2 text-sm text-[var(--primary-gold)] font-medium mt-2 hover:underline px-2"
                                            >
                                                <Plus className="w-4 h-4" /> Add Key Result
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Linked Resources */}
                                {!isEditing && currentPlan.quarterly_objectives[activeQuarter-1].linked_resources?.length > 0 && (
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <h4 className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[var(--primary-gold)]" />
                                            Recommended Resources
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {currentPlan.quarterly_objectives[activeQuarter-1].linked_resources.map((resource, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => navigate(createPageUrl(resource.url))}
                                                    className="flex items-center gap-3 p-3 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors group"
                                                >
                                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-semibold text-[var(--text-main)] block">{resource.title}</span>
                                                        <span className="text-xs text-[var(--text-soft)]">Open Tool</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}