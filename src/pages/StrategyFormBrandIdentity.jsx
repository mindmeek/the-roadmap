import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Palette, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Plus, Trash2, Image, Type, MessageSquare
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import BrandIdentityOverview from '@/components/strategy/BrandIdentityOverview';

export default function StrategyFormBrandIdentity() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        brand_name: '',
        tagline: '',
        mission_statement: '',
        vision_statement: '',
        core_values: ['', '', ''],
        brand_personality: {
            traits: '',
            tone_of_voice: '',
            communication_style: ''
        },
        visual_identity: {
            primary_colors: ['', '', ''],
            secondary_colors: ['', ''],
            fonts: {
                primary_font: '',
                secondary_font: ''
            },
            logo_concept: '',
            imagery_style: ''
        },
        brand_story: '',
        unique_value_proposition: '',
        key_messaging_pillars: ['', '', '']
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
                document_type: 'brand_identity'
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
                document_type: 'brand_identity'
            });

            const docData = {
                document_type: 'brand_identity',
                title: 'Brand Identity & Messaging',
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
                {/* View Toggle */}
                <div className="flex justify-end mb-4">
                    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                        <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                    </div>
                </div>

                {viewMode === 'overview' ? (
                    <BrandIdentityOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                            <Palette className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Brand Identity & Messaging</h1>
                            <p className="text-[var(--text-soft)]">Define your brand's personality and visual identity</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Brand Identity Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Your brand identity is how your business presents itself to the world. It's the visual, emotional, and 
                                psychological connection people have with your company. A strong brand identity builds trust, recognition, 
                                and loyalty.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key components:</strong> Brand personality, visual elements (colors, fonts, logo), messaging framework, 
                                and how you communicate with your audience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Basic Brand Info */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Basic Brand Information</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Brand Name</label>
                            <input
                                type="text"
                                value={formData.brand_name}
                                onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                                className="form-input"
                                placeholder="Your business or product name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Tagline/Slogan</label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="form-input"
                                placeholder="A memorable phrase that captures your essence (e.g., 'Just Do It')"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Mission Statement</label>
                            <textarea
                                value={formData.mission_statement}
                                onChange={(e) => setFormData({ ...formData, mission_statement: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What you do and why you do it (present-focused)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Vision Statement</label>
                            <textarea
                                value={formData.vision_statement}
                                onChange={(e) => setFormData({ ...formData, vision_statement: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Where you're headed and what you aspire to achieve (future-focused)"
                            />
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Core Values</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">The 3-5 principles that guide your business decisions and culture</p>
                    
                    <div className="space-y-3">
                        {formData.core_values.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => updateArrayField('core_values', index, e.target.value)}
                                className="form-input"
                                placeholder={`Core Value ${index + 1} (e.g., Integrity, Innovation, Customer-First)`}
                            />
                        ))}
                    </div>
                </div>

                {/* Brand Personality */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                        Brand Personality
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Personality Traits</label>
                            <textarea
                                value={formData.brand_personality.traits}
                                onChange={(e) => setFormData({ ...formData, brand_personality: { ...formData.brand_personality, traits: e.target.value }})}
                                className="form-input"
                                rows="3"
                                placeholder="If your brand was a person, how would you describe them? (e.g., professional, friendly, innovative, trustworthy)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Tone of Voice</label>
                            <input
                                type="text"
                                value={formData.brand_personality.tone_of_voice}
                                onChange={(e) => setFormData({ ...formData, brand_personality: { ...formData.brand_personality, tone_of_voice: e.target.value }})}
                                className="form-input"
                                placeholder="e.g., Professional yet approachable, Bold and confident, Warm and conversational"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Communication Style</label>
                            <textarea
                                value={formData.brand_personality.communication_style}
                                onChange={(e) => setFormData({ ...formData, brand_personality: { ...formData.brand_personality, communication_style: e.target.value }})}
                                className="form-input"
                                rows="3"
                                placeholder="How do you communicate? (Formal vs casual, technical vs simple, etc.)"
                            />
                        </div>
                    </div>
                </div>

                {/* Visual Identity */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Palette className="w-6 h-6 text-purple-600" />
                        Visual Identity
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Primary Brand Colors</label>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.visual_identity.primary_colors.map((color, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={color}
                                        onChange={(e) => {
                                            const newColors = [...formData.visual_identity.primary_colors];
                                            newColors[index] = e.target.value;
                                            setFormData({ ...formData, visual_identity: { ...formData.visual_identity, primary_colors: newColors }});
                                        }}
                                        className="form-input"
                                        placeholder={`Color ${index + 1} (#hex)`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Secondary Colors</label>
                            <div className="grid grid-cols-2 gap-3">
                                {formData.visual_identity.secondary_colors.map((color, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={color}
                                        onChange={(e) => {
                                            const newColors = [...formData.visual_identity.secondary_colors];
                                            newColors[index] = e.target.value;
                                            setFormData({ ...formData, visual_identity: { ...formData.visual_identity, secondary_colors: newColors }});
                                        }}
                                        className="form-input"
                                        placeholder={`Accent Color ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    <Type className="w-4 h-4 inline mr-1" />
                                    Primary Font
                                </label>
                                <input
                                    type="text"
                                    value={formData.visual_identity.fonts.primary_font}
                                    onChange={(e) => setFormData({ ...formData, visual_identity: { ...formData.visual_identity, fonts: { ...formData.visual_identity.fonts, primary_font: e.target.value }}})}
                                    className="form-input"
                                    placeholder="e.g., Helvetica, Arial, Roboto"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    <Type className="w-4 h-4 inline mr-1" />
                                    Secondary Font
                                </label>
                                <input
                                    type="text"
                                    value={formData.visual_identity.fonts.secondary_font}
                                    onChange={(e) => setFormData({ ...formData, visual_identity: { ...formData.visual_identity, fonts: { ...formData.visual_identity.fonts, secondary_font: e.target.value }}})}
                                    className="form-input"
                                    placeholder="e.g., Georgia, Times New Roman"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                <Image className="w-4 h-4 inline mr-1" />
                                Logo Concept
                            </label>
                            <textarea
                                value={formData.visual_identity.logo_concept}
                                onChange={(e) => setFormData({ ...formData, visual_identity: { ...formData.visual_identity, logo_concept: e.target.value }})}
                                className="form-input"
                                rows="3"
                                placeholder="Describe your logo concept or what you envision for your logo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Imagery Style</label>
                            <textarea
                                value={formData.visual_identity.imagery_style}
                                onChange={(e) => setFormData({ ...formData, visual_identity: { ...formData.visual_identity, imagery_style: e.target.value }})}
                                className="form-input"
                                rows="3"
                                placeholder="What type of images represent your brand? (e.g., minimalist, vibrant, professional photography, illustrations)"
                            />
                        </div>
                    </div>
                </div>

                {/* Brand Story & Messaging */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Brand Story & Messaging</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Brand Story</label>
                            <textarea
                                value={formData.brand_story}
                                onChange={(e) => setFormData({ ...formData, brand_story: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="Tell your brand's story. Why did you start? What problem are you solving? What makes you different?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Unique Value Proposition</label>
                            <textarea
                                value={formData.unique_value_proposition}
                                onChange={(e) => setFormData({ ...formData, unique_value_proposition: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="In one clear statement, what unique value do you offer that competitors don't?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Key Messaging Pillars</label>
                            <p className="text-xs text-[var(--text-soft)] mb-3">The 3-5 core messages you consistently communicate</p>
                            <div className="space-y-3">
                                {formData.key_messaging_pillars.map((pillar, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={pillar}
                                        onChange={(e) => updateArrayField('key_messaging_pillars', index, e.target.value)}
                                        className="form-input"
                                        placeholder={`Message Pillar ${index + 1} (e.g., Quality First, Expert Support, Innovation)`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
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
                                Save Brand Identity
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
                assistantType="sam"
                sectionTitle="Brand Identity & Messaging"
            />
        </>)}
        </div>
    </div>
    );
}