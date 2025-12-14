import React, { useState, useEffect } from "react";
import { AnnualPlan, User } from "@/entities/all";
import { base44 } from "@/api/base44Client";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Target, Calendar, Sparkles, Plus, Trash2, Save, 
    ChevronDown, ChevronUp, CheckCircle2, Circle, Loader2, 
    ArrowLeft, BarChart2, PiggyBank, TrendingUp, DollarSign
} from "lucide-react";
import VisionBoard from "@/components/dashboard/VisionBoard";
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
            
            if (userPlans.length > 0) {
                // Ensure key_results are objects for tracking
                const plan = userPlans[0];
                const migratedObjectives = plan.quarterly_objectives.map(obj => ({
                    ...obj,
                    key_results: Array.isArray(obj.key_results) 
                        ? obj.key_results.map(kr => typeof kr === 'string' ? { text: kr, is_completed: false } : kr)
                        : []
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

    const handleGeneratePlan = async () => {
        setIsGenerating(true);
        try {
            const { data } = await base44.functions.invoke('generateAnnualPlanDraft', {
                year: currentPlan.year,
                vision: currentPlan.vision_description,
                entrepreneurship_stage: user?.entrepreneurship_stage
            });

            if (data?.plan) {
                const newObjectives = data.plan.quarterly_objectives.map(obj => ({
                    ...obj,
                    status: "not_started",
                    key_results: obj.key_results.map(kr => ({ text: kr, is_completed: false }))
                }));

                setCurrentPlan(prev => ({
                    ...prev,
                    title: data.plan.title,
                    vision_description: data.plan.vision_description,
                    quarterly_objectives: newObjectives
                }));
            }
        } catch (error) {
            console.error("Error generating plan:", error);
        } finally {
            setIsGenerating(false);
        }
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

    const updateKeyResult = (quarterIndex, krIndex, value) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex].key_results[krIndex] = { 
            ...newObjectives[quarterIndex].key_results[krIndex], 
            text: value 
        };
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const toggleKeyResult = (quarterIndex, krIndex) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        const kr = newObjectives[quarterIndex].key_results[krIndex];
        newObjectives[quarterIndex].key_results[krIndex] = {
            ...kr,
            is_completed: !kr.is_completed
        };
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const removeKeyResult = (quarterIndex, krIndex) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex].key_results = newObjectives[quarterIndex].key_results.filter((_, i) => i !== krIndex);
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    const financialGoal = user?.financial_projections?.freedomNumber || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
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
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary text-sm flex items-center gap-2">
                                <Target className="w-4 h-4" /> Edit Plan
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {/* Top Section: Vision & Financials */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Vision Board */}
                    <div className="lg:col-span-2">
                        {isEditing ? (
                             <div className="card p-6 bg-white dark:bg-gray-800 border-l-4 border-[var(--primary-gold)] shadow-md h-full">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                        <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Annual Theme</label>
                                            <input 
                                                type="text" 
                                                value={currentPlan.title}
                                                onChange={(e) => setCurrentPlan(prev => ({ ...prev, title: e.target.value }))}
                                                className="form-input text-xl font-bold border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0 focus:border-[var(--primary-gold)] bg-transparent"
                                                placeholder="e.g., The Year of Expansion"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Strategic Vision</label>
                                            <textarea 
                                                value={currentPlan.vision_description}
                                                onChange={(e) => setCurrentPlan(prev => ({ ...prev, vision_description: e.target.value }))}
                                                className="form-input h-24 w-full resize-none bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                                                placeholder="What does success look like by December 31st?"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <VisionBoard 
                                user={user} 
                                annualPlan={currentPlan} 
                                onUpdateUser={(updatedUser) => setUser(updatedUser)} 
                            />
                        )}
                    </div>

                    {/* Financial Goal Snapshot */}
                    <div className="card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 shadow-md flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                                    <PiggyBank className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <button 
                                    onClick={() => navigate(createPageUrl('FreedomCalculator'))}
                                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                                >
                                    Update
                                </button>
                            </div>
                            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wider mb-1">Financial Target</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">
                                    ${(parseInt(financialGoal) * 12).toLocaleString()}
                                </span>
                                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">/ year</span>
                            </div>
                            <p className="text-xs text-emerald-600/80 mt-1">Based on your Freedom Number</p>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-emerald-100 dark:border-emerald-800/50">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-emerald-700 dark:text-emerald-300">Monthly Goal</span>
                                <span className="font-bold text-emerald-800 dark:text-emerald-100">${parseInt(financialGoal).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quarterly Roadmap */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-[var(--primary-gold)]" />
                            Execution Roadmap
                        </h3>
                    </div>

                    {/* Quarter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(q => {
                            const isActive = activeQuarter === q;
                            const obj = currentPlan.quarterly_objectives[q-1];
                            const completedCount = obj?.key_results?.filter(k => k.is_completed).length || 0;
                            const totalCount = obj?.key_results?.length || 0;
                            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                            return (
                                <button
                                    key={q}
                                    onClick={() => setActiveQuarter(q)}
                                    className={`flex-1 min-w-[140px] p-4 rounded-xl border transition-all text-left relative overflow-hidden group ${
                                        isActive 
                                            ? 'bg-white dark:bg-gray-800 border-[var(--primary-gold)] shadow-md ring-1 ring-[var(--primary-gold)]/20' 
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[var(--primary-gold)]' : 'text-gray-500'}`}>Q{q}</span>
                                        {isActive && <div className="w-2 h-2 rounded-full bg-[var(--primary-gold)]"></div>}
                                    </div>
                                    <div className="text-sm font-semibold text-[var(--text-main)] truncate mb-2">
                                        {obj?.objective || "Set Objective"}
                                    </div>
                                    
                                    {/* Mini Progress Bar */}
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-green-500 h-full transition-all duration-500" 
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Quarter Detail */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeQuarter}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="card p-6 bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Objective Column */}
                                <div className="md:w-1/3 space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Main Objective for Q{activeQuarter}</label>
                                        {isEditing ? (
                                            <textarea 
                                                value={currentPlan.quarterly_objectives[activeQuarter-1].objective}
                                                onChange={(e) => updateQuarterlyObjective(activeQuarter-1, 'objective', e.target.value)}
                                                className="form-input text-lg font-medium w-full h-24 resize-none mb-4"
                                                placeholder={`What is the one big thing you need to achieve in Q${activeQuarter}?`}
                                            />
                                        ) : (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 mb-4">
                                                <p className="text-lg font-medium text-[var(--text-main)]">
                                                    {currentPlan.quarterly_objectives[activeQuarter-1].objective || "No objective set."}
                                                </p>
                                            </div>
                                        )}

                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Strategy & Tactics</label>
                                        {isEditing ? (
                                            <textarea 
                                                value={currentPlan.quarterly_objectives[activeQuarter-1].tactics || ""}
                                                onChange={(e) => updateQuarterlyObjective(activeQuarter-1, 'tactics', e.target.value)}
                                                className="form-input text-sm w-full h-32 resize-none"
                                                placeholder="How will you achieve this? List your key strategies and tactics..."
                                            />
                                        ) : (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 min-h-[100px]">
                                                <p className="text-sm text-[var(--text-main)] whitespace-pre-wrap">
                                                    {currentPlan.quarterly_objectives[activeQuarter-1].tactics || "No tactics defined."}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key Results Column */}
                                <div className="md:w-2/3 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Key Results (Success Metrics)</label>
                                        <span className="text-xs text-gray-400">
                                            {currentPlan.quarterly_objectives[activeQuarter-1].key_results?.filter(k => k.is_completed).length || 0} / {currentPlan.quarterly_objectives[activeQuarter-1].key_results?.length || 0} Completed
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {currentPlan.quarterly_objectives[activeQuarter-1].key_results?.map((kr, idx) => (
                                            <div key={idx} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                                <button 
                                                    onClick={() => !isEditing && toggleKeyResult(activeQuarter-1, idx)}
                                                    className={`mt-1 flex-shrink-0 transition-colors ${isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                                                    disabled={isEditing}
                                                >
                                                    {kr.is_completed ? (
                                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                                    )}
                                                </button>
                                                
                                                <div className="flex-1">
                                                    {isEditing ? (
                                                        <input 
                                                            type="text"
                                                            value={kr.text || ""}
                                                            onChange={(e) => updateKeyResult(activeQuarter-1, idx, e.target.value)}
                                                            className="form-input w-full text-sm py-1"
                                                            placeholder="e.g., Reach $50k in revenue"
                                                        />
                                                    ) : (
                                                        <span className={`text-sm ${kr.is_completed ? 'line-through text-gray-400' : 'text-[var(--text-main)]'}`}>
                                                            {kr.text}
                                                        </span>
                                                    )}
                                                </div>

                                                {isEditing && (
                                                    <button 
                                                        onClick={() => removeKeyResult(activeQuarter-1, idx)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        
                                        {currentPlan.quarterly_objectives[activeQuarter-1].key_results?.length === 0 && !isEditing && (
                                            <div className="text-center py-8 text-gray-400 text-sm">
                                                No key results defined for this quarter.
                                            </div>
                                        )}

                                        {isEditing && (
                                            <button 
                                                onClick={() => addKeyResult(activeQuarter-1)}
                                                className="w-full py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-400 hover:text-[var(--primary-gold)] hover:border-[var(--primary-gold)] transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Add Key Result
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Success Tips Section */}
                <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                        Tips for a Successful Year
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg h-fit shadow-sm">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-[var(--text-main)] mb-1">Focus on Fewer Goals</h4>
                                <p className="text-xs text-[var(--text-soft)]">Don't try to do everything. Pick 1-2 major objectives per quarter and execute them relentlessly.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg h-fit shadow-sm">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-[var(--text-main)] mb-1">Review Weekly</h4>
                                <p className="text-xs text-[var(--text-soft)]">Set aside time every Sunday to review your progress and plan the week ahead based on these goals.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg h-fit shadow-sm">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-[var(--text-main)] mb-1">Track Leading Indicators</h4>
                                <p className="text-xs text-[var(--text-soft)]">Focus on the actions you can control (calls made, content posted) rather than just the lagging results.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}