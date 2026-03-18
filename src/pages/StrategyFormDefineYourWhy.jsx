import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { User, StrategyDocument } from '@/entities/all';
import { Sparkles, Heart, Save, Loader2, ArrowLeft } from 'lucide-react';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';
import FloatingSaveButton from '@/components/common/FloatingSaveButton';
import AITeamModal from '@/components/ai/AITeamModal';
import DefineYourWhyOverview from '@/components/strategy/DefineYourWhyOverview';

export default function StrategyFormDefineYourWhy() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);
    const [viewMode, setViewMode] = useState('edit');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        personal_story: '',
        what_drives_you: '',
        problem_to_solve: '',
        change_in_world: '',
        impact_on_others: '',
        core_values: '',
        legacy: '',
        why_statement: ''
    });

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            // Load existing data
            const docs = await StrategyDocument.filter({
                document_type: 'define_your_why',
                created_by: currentUser.email
            });

            if (docs && docs.length > 0) {
                setFormData(docs[0].content || formData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docs = await StrategyDocument.filter({
                document_type: 'define_your_why',
                created_by: user.email
            });

            const docData = {
                document_type: 'define_your_why',
                title: 'Define Your WHY',
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: !!formData.why_statement,
                last_updated: new Date().toISOString()
            };

            if (docs && docs.length > 0) {
                await StrategyDocument.update(docs[0].id, docData);
            } else {
                await StrategyDocument.create(docData);
            }

            alert('Your WHY has been saved successfully!');
        } catch (error) {
            console.error('Error saving WHY:', error);
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
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
            ) : (<div>
                {/* Header */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate(createPageUrl('QuickStartFoundation'))}
                        className="btn btn-ghost mb-4 p-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Quick Start Foundation
                    </button>
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
                    {/* Personal Story */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Personal Story</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            What experiences in your life led you to start this business? What moment made you say "I need to do something about this"?
                        </p>
                        <textarea
                            value={formData.personal_story}
                            onChange={(e) => handleInputChange('personal_story', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="Share your story..."
                        />
                    </div>

                    {/* What Drives You */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">What Drives You?</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            What makes you jump out of bed excited to work on your business? What would you do even if money wasn't a concern?
                        </p>
                        <textarea
                            value={formData.what_drives_you}
                            onChange={(e) => handleInputChange('what_drives_you', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="What motivates you..."
                        />
                    </div>

                    {/* Problem to Solve */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">The Problem You Want to Solve</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            What injustice or problem in the world bothers you deeply? What frustrates you about how things are currently done in your industry?
                        </p>
                        <textarea
                            value={formData.problem_to_solve}
                            onChange={(e) => handleInputChange('problem_to_solve', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="The problem that bothers you..."
                        />
                    </div>

                    {/* Change in World */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">The Change You Want to Create</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            If your business was wildly successful, what would be different in the world? What change do you want to see?
                        </p>
                        <textarea
                            value={formData.change_in_world}
                            onChange={(e) => handleInputChange('change_in_world', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="The change you envision..."
                        />
                    </div>

                    {/* Impact on Others */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Impact on Others</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            How do you want to impact your customers' lives? What transformation do you want to create for them?
                        </p>
                        <textarea
                            value={formData.impact_on_others}
                            onChange={(e) => handleInputChange('impact_on_others', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="The impact you want to have..."
                        />
                    </div>

                    {/* Core Values */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Core Values</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            What do you believe to be true that others might not? What values are non-negotiable for you in business?
                        </p>
                        <textarea
                            value={formData.core_values}
                            onChange={(e) => handleInputChange('core_values', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="Your core values..."
                        />
                    </div>

                    {/* Legacy */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">Your Legacy</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            What do you want people to say about your business? What legacy do you want to leave in your industry or community?
                        </p>
                        <textarea
                            value={formData.legacy}
                            onChange={(e) => handleInputChange('legacy', e.target.value)}
                            className="form-input w-full h-32 resize-none"
                            placeholder="The legacy you want to leave..."
                        />
                    </div>

                    {/* Final WHY Statement */}
                    <div className="card p-6 border-2 border-[var(--primary-gold)]">
                        <h3 className="font-bold text-xl text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Heart className="w-6 h-6 text-[var(--primary-gold)]" />
                            Your WHY Statement
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            Based on your reflections above, write your WHY statement in one powerful sentence (under 25 words).
                        </p>
                        <p className="text-xs text-[var(--text-soft)] mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            <strong>Formula:</strong> "I believe that [who you serve] deserves [what they deserve] because [why it matters]."
                        </p>
                        <textarea
                            value={formData.why_statement}
                            onChange={(e) => handleInputChange('why_statement', e.target.value)}
                            className="form-input w-full h-24 resize-none font-medium text-lg"
                            placeholder="I believe that..."
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex-1"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Your WHY
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowAIModal(true)}
                        className="btn btn-secondary"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get AI Help
                    </button>
                </div>

                <FoundationFormNav currentFormId="define_your_why" />

                {/* AI Modal */}
                <AITeamModal
                    isOpen={showAIModal}
                    onClose={() => setShowAIModal(false)}
                    assistantType="strategy_form_agent"
                    sectionTitle="Define Your WHY"
                    additionalContext={`Document Type: define_your_why\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Data: ${JSON.stringify(formData, null, 2)}`}
                    currentBusinessId={user?.current_business_id}
                />
            </div>)}
        </div>
    );
}