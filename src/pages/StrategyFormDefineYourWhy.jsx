
import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Heart, Save, Loader2, CheckCircle, ArrowLeft,
    Sparkles, HelpCircle, Target, Users, Lightbulb, Zap
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import { base44 } from '@/api/base44Client';

export default function StrategyFormDefineYourWhy() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        personal_story: '',
        core_motivation: '',
        what_drives_you: '',
        impact_you_want: '',
        legacy_vision: '',
        personal_values: ['', '', '', ''],
        why_this_business: '',
        who_you_serve: '',
        transformation_you_provide: '',
        deeper_purpose: '',
        your_why_statement: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({
                created_by: userData.email,
                document_type: 'define_your_why'
            });

            if (docs && docs.length > 0) {
                setFormData(docs[0].content);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docs = await StrategyDocument.filter({
                created_by: user.email,
                document_type: 'define_your_why'
            });

            const docData = {
                document_type: 'define_your_why',
                title: 'Define Your WHY',
                content: formData,
                is_completed: true,
                last_updated: new Date().toISOString()
            };

            if (docs && docs.length > 0) {
                await StrategyDocument.update(docs[0].id, docData);
            } else {
                await StrategyDocument.create(docData);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const updateArrayField = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
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
                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-lg">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Define Your WHY</h1>
                            <p className="text-[var(--text-soft)]">Discover your deeper purpose and motivation</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-2 border-pink-200 dark:border-pink-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Your WHY Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Your WHY is your purpose, cause, or belief. It's the reason you get out of bed every morning and the reason your business exists.
                                People don't buy what you do; they buy WHY you do it.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Benefits:</strong> Clarity in decision-making, authentic marketing, attracting ideal clients who share your values,
                                sustained motivation during challenges, and building a business with meaning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How This Streamlines Your Business */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-600" />
                            Streamlines Your Business
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Your WHY becomes your filter for every decision. Should you launch this product? Partner with that company?
                            If it aligns with your WHY, yes. If not, it's a distraction. This clarity saves countless hours of second-guessing
                            and keeps you focused on what truly matters.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            When you lead with your WHY, you attract people who believe what you believe. They become loyal customers
                            because they're not just buying your product—they're buying into your mission. Your WHY becomes the emotional
                            bridge that turns strangers into raving fans.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Sarah, Life Coach:</strong> Her WHY was "I empower women to reclaim their confidence after divorce."
                            This clarity helped her turn down lucrative corporate consulting gigs that didn't align with her mission,
                            and instead build a 6-figure coaching practice serving divorced women who resonated deeply with her story.
                        </p>
                    </div>
                </div>

                {/* Personal Story & Motivation */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-pink-600" />
                        Your Personal Story
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Journey</label>
                            <textarea
                                value={formData.personal_story}
                                onChange={(e) => setFormData({ ...formData, personal_story: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="What's your story? What experiences led you to start this business? What challenges have you overcome?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Core Motivation</label>
                            <textarea
                                value={formData.core_motivation}
                                onChange={(e) => setFormData({ ...formData, core_motivation: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What truly motivates you? Beyond money, what drives you to do this work?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">What Gets You Excited?</label>
                            <textarea
                                value={formData.what_drives_you}
                                onChange={(e) => setFormData({ ...formData, what_drives_you: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What aspects of your work make you lose track of time? What energizes you?"
                            />
                        </div>
                    </div>
                </div>

                {/* Impact & Legacy */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-purple-600" />
                        Impact & Legacy
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">The Impact You Want to Make</label>
                            <textarea
                                value={formData.impact_you_want}
                                onChange={(e) => setFormData({ ...formData, impact_you_want: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What change do you want to create in the world? How do you want to impact people's lives?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Legacy Vision</label>
                            <textarea
                                value={formData.legacy_vision}
                                onChange={(e) => setFormData({ ...formData, legacy_vision: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="When you look back in 20 years, what do you want to have accomplished? What do you want to be remembered for?"
                            />
                        </div>
                    </div>
                </div>

                {/* Personal Values */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Your Core Personal Values</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">What principles guide your life and work?</p>

                    <div className="space-y-3">
                        {formData.personal_values.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => updateArrayField('personal_values', index, e.target.value)}
                                className="form-input"
                                placeholder={`Core Value ${index + 1} (e.g., Authenticity, Growth, Service, Freedom)`}
                            />
                        ))}
                    </div>
                </div>

                {/* Business Purpose */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-yellow-600" />
                        Your Business Purpose
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Why THIS Business?</label>
                            <textarea
                                value={formData.why_this_business}
                                onChange={(e) => setFormData({ ...formData, why_this_business: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Why did you choose THIS specific business or industry? What makes it meaningful to you?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Who You're Called to Serve</label>
                            <textarea
                                value={formData.who_you_serve}
                                onChange={(e) => setFormData({ ...formData, who_you_serve: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Who are you passionate about helping? Why does serving them matter to you?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">The Transformation You Provide</label>
                            <textarea
                                value={formData.transformation_you_provide}
                                onChange={(e) => setFormData({ ...formData, transformation_you_provide: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What transformation do you help people achieve? How do you change their lives?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Deeper Purpose</label>
                            <textarea
                                value={formData.deeper_purpose}
                                onChange={(e) => setFormData({ ...formData, deeper_purpose: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Beyond profit, what's the deeper purpose of your business? What cause or belief drives you?"
                            />
                        </div>
                    </div>
                </div>

                {/* Your WHY Statement */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-300 dark:border-yellow-700">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-yellow-600" />
                        Your WHY Statement
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">
                        Synthesize everything above into a clear, compelling WHY statement. Use this format:
                        "I [what you do] so that [the impact you want to create]."
                    </p>

                    <textarea
                        value={formData.your_why_statement}
                        onChange={(e) => setFormData({ ...formData, your_why_statement: e.target.value })}
                        className="form-input border-2 border-yellow-300 dark:border-yellow-700"
                        rows="5"
                        placeholder="Example: 'I empower entrepreneurs to build sustainable businesses so that they can create freedom, impact, and wealth while doing work they love.'"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sticky bottom-20 md:bottom-6 z-10">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex-1"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Save Your WHY
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowAIAssistant(true)}
                        className="btn btn-secondary"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get AI Help
                    </button>
                </div>
            </div>

            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="olivia"
                sectionTitle="Define Your WHY"
            />
        </div>
    );
}
