import React, { useState } from 'react';
import { Sparkles, Heart, Save, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';
import AITeamModal from '@/components/ai/AITeamModal';
import DefineYourWhyOverview from '@/components/strategy/DefineYourWhyOverview';
import { useStrategyDoc } from '@/hooks/useStrategyDoc';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const DEFAULT_FORM = {
    personal_story: '',
    what_drives_you: '',
    problem_to_solve: '',
    change_in_world: '',
    impact_on_others: '',
    core_values: '',
    legacy: '',
    why_statement: ''
};

export default function StrategyFormDefineYourWhy() {
    const [showAIModal, setShowAIModal] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const { loading, saving, saved, formData, setFormData, saveDoc, user, canEdit } = useStrategyDoc('define_your_why', DEFAULT_FORM);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            await saveDoc();
        } catch (error) {
            alert('Failed to save. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* View Toggle */}
            <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                    <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                </div>
            </div>

            {viewMode === 'overview' ? (
                <DefineYourWhyOverview formData={formData} />
            ) : (
                <div>
                    {/* Header */}
                    <div className="mb-8">
                        <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Foundation Roadmap
                        </Link>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-lg">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[var(--text-main)]">Define Your WHY</h1>
                                <p className="text-[var(--text-soft)]">Discover your deeper purpose</p>
                            </div>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800">
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-3">Why Your WHY Matters</h2>
                        <p className="text-[var(--text-soft)] mb-4">
                            Your WHY is your deeper purpose - the reason you show up every day beyond making money.
                            It's what fuels you through challenges, attracts raving fans, and builds a business with soul.
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            Take your time with each question. Your authentic answers will guide you to discover your true WHY.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Personal Story</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">What experiences in your life led you to start this business?</p>
                            <textarea value={formData.personal_story} onChange={(e) => handleInputChange('personal_story', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="Share your story..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">What Drives You?</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">What makes you jump out of bed excited to work on your business?</p>
                            <textarea value={formData.what_drives_you} onChange={(e) => handleInputChange('what_drives_you', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="What motivates you..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">The Problem You Want to Solve</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">What injustice or problem in the world bothers you deeply?</p>
                            <textarea value={formData.problem_to_solve} onChange={(e) => handleInputChange('problem_to_solve', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="The problem that bothers you..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">The Change You Want to Create</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">If your business was wildly successful, what would be different in the world?</p>
                            <textarea value={formData.change_in_world} onChange={(e) => handleInputChange('change_in_world', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="The change you envision..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Impact on Others</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">How do you want to impact your customers' lives?</p>
                            <textarea value={formData.impact_on_others} onChange={(e) => handleInputChange('impact_on_others', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="The impact you want to have..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Core Values</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">What values are non-negotiable for you in business?</p>
                            <textarea value={formData.core_values} onChange={(e) => handleInputChange('core_values', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="Your core values..." />
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Legacy</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">What do you want people to say about your business?</p>
                            <textarea value={formData.legacy} onChange={(e) => handleInputChange('legacy', e.target.value)} className="form-input w-full h-32 resize-none" placeholder="The legacy you want to leave..." />
                        </div>

                        <div className="card p-6 border-2 border-[var(--primary-gold)]">
                            <h3 className="font-bold text-xl text-[var(--text-main)] mb-3 flex items-center gap-2">
                                <Heart className="w-6 h-6 text-[var(--primary-gold)]" />
                                Your WHY Statement
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">Based on your reflections above, write your WHY statement in one powerful sentence (under 25 words).</p>
                            <p className="text-xs text-[var(--text-soft)] mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                <strong>Formula:</strong> "I believe that [who you serve] deserves [what they deserve] because [why it matters]."
                            </p>
                            <textarea value={formData.why_statement} onChange={(e) => handleInputChange('why_statement', e.target.value)} className="form-input w-full h-24 resize-none font-medium text-lg" placeholder="I believe that..." />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button onClick={handleSave} disabled={saving} className="btn btn-primary flex-1">
                            {saving ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
                            ) : saved ? (
                                <><CheckCircle className="w-4 h-4 mr-2" />Saved!</>
                            ) : (
                                <><Save className="w-4 h-4 mr-2" />Save Your WHY</>
                            )}
                        </button>
                        <button onClick={() => setShowAIModal(true)} className="btn btn-secondary">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Get AI Help
                        </button>
                    </div>

                    <FoundationFormNav currentFormId="define_your_why" />

                    <AITeamModal
                        isOpen={showAIModal}
                        onClose={() => setShowAIModal(false)}
                        assistantType="strategy_form_agent"
                        sectionTitle="Define Your WHY"
                        additionalContext={`Document Type: define_your_why\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Data: ${JSON.stringify(formData, null, 2)}`}
                        currentBusinessId={user?.current_business_id}
                    />
                </div>
            )}
        </div>
    );
}