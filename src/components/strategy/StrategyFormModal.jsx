import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { User, StrategyDocument } from '@/entities/all';
import AITeamModal from '@/components/ai/AITeamModal';

export default function StrategyFormModal({ isOpen, onClose, formType, programKey }) {
    const [user, setUser] = useState(null);
    const [existingDoc, setExistingDoc] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [formData, setFormData] = useState({});
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAiContext] = useState({});

    useEffect(() => {
        if (isOpen && formType) {
            loadData();
        }
    }, [isOpen, formType]);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({ 
                created_by: userData.email,
                document_type: formType
            });

            if (docs.length > 0) {
                setExistingDoc(docs[0]);
                setFormData(docs[0].content || getInitialFormData(formType));
            } else {
                setFormData(getInitialFormData(formType));
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const getInitialFormData = (type) => {
        switch(type) {
            case 'ideal_client':
                return { demographics: '', psychographics: '', painPoints: '', goals: '' };
            case 'value_proposition':
                return { customerJobs: '', pains: '', gains: '', products: '', painRelievers: '', gainCreators: '' };
            case 'business_model':
                return { keyPartners: '', keyActivities: '', keyResources: '', valuePropositions: '', customerRelationships: '', channels: '', customerSegments: '', costStructure: '', revenueStreams: '' };
            case 'customer_journey':
                return { awareness: '', consideration: '', decision: '', retention: '', advocacy: '' };
            case 'content_strategy':
                return { contentPillars: '', contentTypes: '', publishingFrequency: '', contentGoals: '' };
            case 'social_media':
                return { platforms: '', postingSchedule: '', contentThemes: '', engagementStrategy: '' };
            case 'email_marketing':
                return { listSegments: '', emailSequences: '', newsletterStrategy: '', automationRules: '' };
            case 'pricing_strategy':
                return { pricingModel: '', pricePoints: '', packages: '', discountStrategy: '' };
            default:
                return {};
        }
    };

    const getFormTitle = (type) => {
        const titles = {
            ideal_client: 'Ideal Client Profile',
            value_proposition: 'Value Proposition Canvas',
            business_model: 'One Page Business Plan',
            customer_journey: 'Customer Journey Map',
            content_strategy: 'Content Strategy',
            social_media: 'Social Media Strategy',
            email_marketing: 'Email Marketing Plan',
            pricing_strategy: 'Pricing Strategy'
        };
        return titles[type] || 'Strategy Form';
    };

    const handleSave = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            const docData = {
                document_type: formType,
                title: getFormTitle(formType),
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: true,
                last_updated: new Date().toISOString(),
                program_key: programKey
            };

            if (existingDoc) {
                await StrategyDocument.update(existingDoc.id, docData);
            } else {
                const newDoc = await StrategyDocument.create(docData);
                setExistingDoc(newDoc);
            }

            setSaveMessage('✓ Saved successfully!');
            setTimeout(() => {
                setSaveMessage('');
                onClose();
            }, 2000);
        } catch (error) {
            console.error("Error saving:", error);
            setSaveMessage('Error saving. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const openAIHelp = (sectionKey) => {
        setAiContext({
            sectionTitle: `${getFormTitle(formType)} - ${sectionKey}`,
            userNotes: formData[sectionKey] ? [{ content: formData[sectionKey] }] : []
        });
        setShowAIAssistant(true);
    };

    const renderFormFields = () => {
        switch(formType) {
            case 'ideal_client':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Demographics</label>
                            <textarea
                                value={formData.demographics || ''}
                                onChange={(e) => setFormData({...formData, demographics: e.target.value})}
                                placeholder="Age, location, income, education, occupation..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Psychographics</label>
                            <textarea
                                value={formData.psychographics || ''}
                                onChange={(e) => setFormData({...formData, psychographics: e.target.value})}
                                placeholder="Values, interests, lifestyle, personality traits..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Pain Points & Challenges</label>
                            <textarea
                                value={formData.painPoints || ''}
                                onChange={(e) => setFormData({...formData, painPoints: e.target.value})}
                                placeholder="What problems are they facing? What frustrates them?"
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Goals & Aspirations</label>
                            <textarea
                                value={formData.goals || ''}
                                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                                placeholder="What are they trying to achieve? What's their ideal outcome?"
                                className="form-input h-24"
                            />
                        </div>
                    </div>
                );
            
            case 'content_strategy':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Content Pillars</label>
                            <textarea
                                value={formData.contentPillars || ''}
                                onChange={(e) => setFormData({...formData, contentPillars: e.target.value})}
                                placeholder="3-5 main topics you'll consistently create content about..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Content Types</label>
                            <textarea
                                value={formData.contentTypes || ''}
                                onChange={(e) => setFormData({...formData, contentTypes: e.target.value})}
                                placeholder="Blog posts, videos, podcasts, infographics, case studies..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Publishing Frequency</label>
                            <textarea
                                value={formData.publishingFrequency || ''}
                                onChange={(e) => setFormData({...formData, publishingFrequency: e.target.value})}
                                placeholder="How often will you publish each content type?"
                                className="form-input h-20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Content Goals</label>
                            <textarea
                                value={formData.contentGoals || ''}
                                onChange={(e) => setFormData({...formData, contentGoals: e.target.value})}
                                placeholder="What do you want to achieve with your content?"
                                className="form-input h-20"
                            />
                        </div>
                    </div>
                );

            case 'social_media':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Primary Platforms</label>
                            <textarea
                                value={formData.platforms || ''}
                                onChange={(e) => setFormData({...formData, platforms: e.target.value})}
                                placeholder="Which social media platforms will you focus on?"
                                className="form-input h-20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Posting Schedule</label>
                            <textarea
                                value={formData.postingSchedule || ''}
                                onChange={(e) => setFormData({...formData, postingSchedule: e.target.value})}
                                placeholder="How often will you post on each platform?"
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Content Themes</label>
                            <textarea
                                value={formData.contentThemes || ''}
                                onChange={(e) => setFormData({...formData, contentThemes: e.target.value})}
                                placeholder="What types of content will you share? Educational, behind-the-scenes, testimonials..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Engagement Strategy</label>
                            <textarea
                                value={formData.engagementStrategy || ''}
                                onChange={(e) => setFormData({...formData, engagementStrategy: e.target.value})}
                                placeholder="How will you engage with your audience? Response times, interaction tactics..."
                                className="form-input h-24"
                            />
                        </div>
                    </div>
                );

            case 'email_marketing':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">List Segments</label>
                            <textarea
                                value={formData.listSegments || ''}
                                onChange={(e) => setFormData({...formData, listSegments: e.target.value})}
                                placeholder="How will you segment your email list?"
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Email Sequences</label>
                            <textarea
                                value={formData.emailSequences || ''}
                                onChange={(e) => setFormData({...formData, emailSequences: e.target.value})}
                                placeholder="Welcome sequence, nurture sequence, sales sequence..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Newsletter Strategy</label>
                            <textarea
                                value={formData.newsletterStrategy || ''}
                                onChange={(e) => setFormData({...formData, newsletterStrategy: e.target.value})}
                                placeholder="Newsletter frequency, content themes, value proposition..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Automation Rules</label>
                            <textarea
                                value={formData.automationRules || ''}
                                onChange={(e) => setFormData({...formData, automationRules: e.target.value})}
                                placeholder="Trigger-based emails, behavior-based sequences..."
                                className="form-input h-24"
                            />
                        </div>
                    </div>
                );

            case 'pricing_strategy':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Pricing Model</label>
                            <textarea
                                value={formData.pricingModel || ''}
                                onChange={(e) => setFormData({...formData, pricingModel: e.target.value})}
                                placeholder="Subscription, one-time, freemium, tiered pricing..."
                                className="form-input h-20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Price Points</label>
                            <textarea
                                value={formData.pricePoints || ''}
                                onChange={(e) => setFormData({...formData, pricePoints: e.target.value})}
                                placeholder="List your specific price points and what they include..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Packages/Tiers</label>
                            <textarea
                                value={formData.packages || ''}
                                onChange={(e) => setFormData({...formData, packages: e.target.value})}
                                placeholder="Describe your different packages or pricing tiers..."
                                className="form-input h-24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Discount Strategy</label>
                            <textarea
                                value={formData.discountStrategy || ''}
                                onChange={(e) => setFormData({...formData, discountStrategy: e.target.value})}
                                placeholder="Early bird, bulk discounts, seasonal promotions..."
                                className="form-input h-24"
                            />
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-8 text-[var(--text-soft)]">
                        <p>Form type not yet configured. Please use the full strategy form pages.</p>
                    </div>
                );
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">{getFormTitle(formType)}</h2>
                            <p className="text-sm text-[var(--text-soft)] mt-1">Fill out this strategy form for your roadmap</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* AI Help Banner */}
                    <div className="px-6 pt-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                            <div className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-[var(--text-main)] font-semibold">
                                        Need Help? Click the AI button below to get expert guidance!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Message */}
                    {saveMessage && (
                        <div className="mx-6 mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {saveMessage}
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {renderFormFields()}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <button
                            onClick={() => openAIHelp('form')}
                            className="btn btn-secondary"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Get AI Help
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="btn btn-primary"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save & Continue
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="elyzet"
                sectionTitle={aiContext.sectionTitle}
                userNotes={aiContext.userNotes || []}
            />
        </>
    );
}