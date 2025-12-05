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
                setCurrentPlan(userPlans[0]);
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
                    status: "not_started" // Ensure status field exists
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
        newObjectives[quarterIndex].key_results.push("");
        setCurrentPlan(prev => ({ ...prev, quarterly_objectives: newObjectives }));
    };

    const updateKeyResult = (quarterIndex, krIndex, value) => {
        const newObjectives = [...currentPlan.quarterly_objectives];
        newObjectives[quarterIndex].key_results[krIndex] = value;
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
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
                {/* Vision Section */}
                <div className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800">
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
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="mt-1">
                                                    <Target className="w-4 h-4 text-gray-400" />
                                                </div>
                                                {isEditing ? (
                                                    <>
                                                        <input 
                                                            type="text"
                                                            value={kr}
                                                            onChange={(e) => updateKeyResult(activeQuarter-1, idx, e.target.value)}
                                                            className="form-input flex-1"
                                                            placeholder="e.g., Reach $50k in revenue"
                                                        />
                                                        <button 
                                                            onClick={() => removeKeyResult(activeQuarter-1, idx)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                                                        {kr}
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
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}