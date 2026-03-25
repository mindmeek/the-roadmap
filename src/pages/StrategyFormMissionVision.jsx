import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Compass, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Target, Eye, Users, Lock
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import AIFormFiller from '@/components/ai/AIFormFiller';
import MissionVisionOverview from '@/components/strategy/MissionVisionOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';
import useTeamStrategyDoc from '@/hooks/useTeamStrategyDoc';

const DEFAULT_FORM = {
    mission_statement: '',
    mission_what: '',
    mission_who: '',
    mission_how: '',
    mission_why: '',
    vision_statement: '',
    vision_future_state: '',
    vision_timeline: '',
    vision_impact: '',
    core_values: ['', '', '', '', ''],
    guiding_principles: ''
};

export default function StrategyFormMissionVision() {
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const { formData: savedData, setFormData, loading, saving, saved, saveDoc, canEdit, user } = useTeamStrategyDoc('mission_vision');

    const [form, setForm] = useState(DEFAULT_FORM);

    useEffect(() => {
        if (savedData) setForm(savedData);
    }, [savedData]);

    const handleSave = async () => {
        await saveDoc(form, 'Mission & Vision Statements');
    };

    const updateArrayField = (field, index, value) => {
        const newArray = [...form[field]];
        newArray[index] = value;
        setForm({ ...form, [field]: newArray });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto">
                {/* View Toggle */}
                <div className="flex justify-between items-center mb-4">
                    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                        <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                    </div>
                    {!canEdit && (
                        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                            <Lock className="w-3 h-3" /> View only
                        </span>
                    )}
                </div>

                {viewMode === 'overview' ? (
                    <MissionVisionOverview formData={form} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg">
                            <Compass className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Mission & Vision Statements</h1>
                            <p className="text-[var(--text-soft)]">Define your purpose and future direction</p>
                        </div>
                    </div>
                </div>

                {canEdit && (
                    <AIFormFiller
                        formType="mission_vision"
                        currentFormData={form}
                        onFillForm={(filled) => setForm(prev => ({ ...prev, ...filled }))}
                        contextHint={`Business: ${user?.business_name}, Industry: ${user?.industry}, Stage: ${user?.entrepreneurship_stage}`}
                    />
                )}

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Mission vs Vision</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                <strong>Mission:</strong> What you do TODAY. Your current purpose and how you serve your customers right now.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Vision:</strong> Where you're GOING. Your aspirational future state and the impact you want to create long-term.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How This Streamlines Your Business */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            Streamlines Your Business
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Your mission guides daily operations while your vision guides long-term strategy. When your team knows both, 
                            they can make decisions independently without constant approval.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Clear mission and vision statements tell prospects exactly who you are and where you're going. 
                            Ideal clients see themselves in your vision and understand how your mission serves them today.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Tesla:</strong> Mission: "Accelerate the world's transition to sustainable energy." 
                            Vision: "Create the most compelling car company of the 21st century."
                        </p>
                    </div>
                </div>

                {/* Mission Statement Builder */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        Build Your Mission Statement
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Answer these questions to craft your mission statement</p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">What do you do?</label>
                            <input type="text" value={form.mission_what} onChange={(e) => setForm({ ...form, mission_what: e.target.value })} className="form-input" placeholder="e.g., We provide business coaching" disabled={!canEdit} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Who do you serve?</label>
                            <input type="text" value={form.mission_who} onChange={(e) => setForm({ ...form, mission_who: e.target.value })} className="form-input" placeholder="e.g., for aspiring entrepreneurs" disabled={!canEdit} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">How do you do it?</label>
                            <input type="text" value={form.mission_how} onChange={(e) => setForm({ ...form, mission_how: e.target.value })} className="form-input" placeholder="e.g., through personalized 1-on-1 coaching and proven frameworks" disabled={!canEdit} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Why does it matter?</label>
                            <input type="text" value={form.mission_why} onChange={(e) => setForm({ ...form, mission_why: e.target.value })} className="form-input" placeholder="e.g., so they can build profitable businesses with confidence" disabled={!canEdit} />
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Complete Mission Statement</label>
                            <textarea value={form.mission_statement} onChange={(e) => setForm({ ...form, mission_statement: e.target.value })} className="form-input border-2 border-blue-300 dark:border-blue-700" rows="4" placeholder="Combine the answers above into a clear, compelling mission statement (1-2 sentences)" disabled={!canEdit} />
                        </div>
                    </div>
                </div>

                {/* Vision Statement Builder */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Eye className="w-6 h-6 text-indigo-600" />
                        Build Your Vision Statement
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Future State</label>
                            <textarea value={form.vision_future_state} onChange={(e) => setForm({ ...form, vision_future_state: e.target.value })} className="form-input" rows="4" placeholder="Where do you see your business in 5-10 years?" disabled={!canEdit} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Timeline & Milestones</label>
                            <textarea value={form.vision_timeline} onChange={(e) => setForm({ ...form, vision_timeline: e.target.value })} className="form-input" rows="3" placeholder="What key milestones will you achieve along the way?" disabled={!canEdit} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">The Impact You'll Create</label>
                            <textarea value={form.vision_impact} onChange={(e) => setForm({ ...form, vision_impact: e.target.value })} className="form-input" rows="4" placeholder="What larger impact will your business have?" disabled={!canEdit} />
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Complete Vision Statement</label>
                            <textarea value={form.vision_statement} onChange={(e) => setForm({ ...form, vision_statement: e.target.value })} className="form-input border-2 border-indigo-300 dark:border-indigo-700" rows="4" placeholder="Craft an inspiring vision statement that captures your aspirational future" disabled={!canEdit} />
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Core Values</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">The 3-5 principles that guide how you operate and make decisions</p>
                    <div className="space-y-3">
                        {form.core_values.map((value, index) => (
                            <input key={index} type="text" value={value} onChange={(e) => updateArrayField('core_values', index, e.target.value)} className="form-input" placeholder={`Core Value ${index + 1}`} disabled={!canEdit} />
                        ))}
                    </div>
                </div>

                {/* Guiding Principles */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Guiding Principles</h3>
                    <textarea value={form.guiding_principles} onChange={(e) => setForm({ ...form, guiding_principles: e.target.value })} className="form-input" rows="5" placeholder="How do your values translate into day-to-day operations?" disabled={!canEdit} />
                </div>

                {/* Action Buttons */}
                {canEdit && (
                    <div className="flex flex-col sm:flex-row gap-3 sticky bottom-20 md:bottom-6 z-10">
                        <button onClick={handleSave} disabled={saving} className="btn btn-primary flex-1">
                            {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Saving...</>
                            : saved ? <><CheckCircle className="w-5 h-5 mr-2" />Saved!</>
                            : <><Save className="w-5 h-5 mr-2" />Save Mission & Vision</>}
                        </button>
                        <button onClick={() => setShowAIAssistant(true)} className="btn btn-secondary">
                            <Sparkles className="w-5 h-5 mr-2" />Get AI Help
                        </button>
                    </div>
                )}

                <FoundationFormNav currentFormId="mission_vision" />

                <AITeamModal
                    isOpen={showAIAssistant}
                    onClose={() => setShowAIAssistant(false)}
                    assistantType="strategy_form_agent"
                    sectionTitle="Mission & Vision Statements"
                    additionalContext={`Document Type: mission_vision\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}`}
                />
            </>)}
        </div>
    </div>
    );
}