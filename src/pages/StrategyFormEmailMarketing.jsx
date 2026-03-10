import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Mail, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Send, Users, Target
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import EmailMarketingOverview from '@/components/strategy/EmailMarketingOverview';

export default function StrategyFormEmailMarketing() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        email_goals: '',
        target_audience: '',
        list_building_strategy: '',
        lead_magnets: ['', '', ''],
        email_platform: '',
        email_types: {
            welcome_series: { enabled: false, description: '' },
            newsletter: { enabled: false, frequency: '', topics: '' },
            promotional: { enabled: false, strategy: '' },
            educational: { enabled: false, topics: '' }
        },
        segmentation_strategy: '',
        automation_sequences: '',
        success_metrics: ''
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
                document_type: 'email_marketing'
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
                document_type: 'email_marketing'
            });

            const docData = {
                document_type: 'email_marketing',
                title: 'Email Marketing Strategy',
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
                    <EmailMarketingOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-lg">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Setup Email Marketing</h1>
                            <p className="text-[var(--text-soft)]">Build your email list and nurture relationships</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Email Marketing Works</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Email is the only marketing channel you OWN. Social media platforms can change algorithms or shut down, 
                                but your email list is yours forever. Email marketing consistently delivers the highest ROI of any marketing 
                                channel—$42 for every $1 spent on average.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Direct communication, high ROI, relationship building, automation capabilities, 
                                and complete ownership of your audience.
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
                            <strong>The HQ</strong>'s built-in email marketing and automation handle the nurturing for you. A new subscriber gets your welcome series, 
                            abandoned cart emails trigger automatically, and educational sequences build trust on autopilot. You write once, profit forever, 
                            eliminating the need for expensive external email tools. Plus, for detailed installation instructions and implementation guidance, **The HQ's built-in AI chatbot** is always available to assist you step-by-step.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Email allows intimate, one-to-one communication at scale. You land directly in their inbox—their most personal 
                            digital space. Through storytelling, value-packed content, and addressing specific pain points, you build 
                            relationships that convert strangers into buyers and buyers into advocates. Stuck on your copy? Get feedback and support from fellow entrepreneurs in the **Business Minds Community**.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Jessica, Online Course Creator:</strong> Built a 5,000-person email list with a free mini-course. 
                            Her 5-email welcome sequence has a 47% open rate and generates $12,000/month in course sales on autopilot. 
                            Every new subscriber goes through the same proven nurture sequence without any manual work.
                        </p>
                    </div>
                </div>

                {/* Email Strategy Foundation */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-indigo-600" />
                        Email Strategy Foundation
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Email Marketing Goals</label>
                            <textarea
                                value={formData.email_goals}
                                onChange={(e) => setFormData({ ...formData, email_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want to achieve with email? (e.g., Build list to 5,000, Increase sales by 30%, Nurture leads)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Target Audience</label>
                            <textarea
                                value={formData.target_audience}
                                onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Who are you emailing? What are their interests and pain points?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Email Platform</label>
                            <input
                                type="text"
                                value={formData.email_platform}
                                onChange={(e) => setFormData({ ...formData, email_platform: e.target.value })}
                                className="form-input"
                                placeholder="e.g., The HQ (Recommended), Mailchimp, ActiveCampaign"
                            />
                        </div>
                    </div>
                </div>

                {/* List Building */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        List Building Strategy
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">How Will You Build Your List?</label>
                            <textarea
                                value={formData.list_building_strategy}
                                onChange={(e) => setFormData({ ...formData, list_building_strategy: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Website opt-ins, social media, lead magnets, webinars, partnerships, content upgrades, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Lead Magnets (Free Offers)</label>
                            <p className="text-xs text-[var(--text-soft)] mb-2">What will you offer in exchange for email addresses?</p>
                            <div className="space-y-3">
                                {formData.lead_magnets.map((magnet, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={magnet}
                                        onChange={(e) => updateArrayField('lead_magnets', index, e.target.value)}
                                        className="form-input"
                                        placeholder={`Lead Magnet ${index + 1} (e.g., Free Guide, Checklist, Video Training, Discount Code)`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Types */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Send className="w-6 h-6 text-green-600" />
                        Types of Emails
                    </h3>
                    
                    <div className="space-y-6">
                        {/* Welcome Series */}
                        <div className="border-l-4 border-indigo-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.email_types.welcome_series.enabled}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, welcome_series: { ...formData.email_types.welcome_series, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Welcome Email Series</h4>
                            </div>
                            {formData.email_types.welcome_series.enabled && (
                                <textarea
                                    value={formData.email_types.welcome_series.description}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, welcome_series: { ...formData.email_types.welcome_series, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="What will you send new subscribers? (e.g., Email 1: Welcome + deliver lead magnet, Email 2: Your story, Email 3: Best resources)"
                                />
                            )}
                        </div>

                        {/* Newsletter */}
                        <div className="border-l-4 border-purple-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.email_types.newsletter.enabled}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, newsletter: { ...formData.email_types.newsletter, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Regular Newsletter</h4>
                            </div>
                            {formData.email_types.newsletter.enabled && (
                                <div className="space-y-2 mt-2">
                                    <input
                                        type="text"
                                        value={formData.email_types.newsletter.frequency}
                                        onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, newsletter: { ...formData.email_types.newsletter, frequency: e.target.value }}})}
                                        className="form-input"
                                        placeholder="Frequency (e.g., Weekly, Bi-weekly, Monthly)"
                                    />
                                    <textarea
                                        value={formData.email_types.newsletter.topics}
                                        onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, newsletter: { ...formData.email_types.newsletter, topics: e.target.value }}})}
                                        className="form-input"
                                        rows="2"
                                        placeholder="What topics will you cover?"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Promotional */}
                        <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.email_types.promotional.enabled}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, promotional: { ...formData.email_types.promotional, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Promotional Emails</h4>
                            </div>
                            {formData.email_types.promotional.enabled && (
                                <textarea
                                    value={formData.email_types.promotional.strategy}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, promotional: { ...formData.email_types.promotional, strategy: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="When will you send sales/promotional emails? (launches, special offers, cart abandonment)"
                                />
                            )}
                        </div>

                        {/* Educational */}
                        <div className="border-l-4 border-yellow-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.email_types.educational.enabled}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, educational: { ...formData.email_types.educational, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Educational Content</h4>
                            </div>
                            {formData.email_types.educational.enabled && (
                                <textarea
                                    value={formData.email_types.educational.topics}
                                    onChange={(e) => setFormData({ ...formData, email_types: { ...formData.email_types, educational: { ...formData.email_types.educational, topics: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="Tips, tutorials, case studies, how-to guides"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Advanced Strategy */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Advanced Strategy</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Segmentation Strategy</label>
                            <textarea
                                value={formData.segmentation_strategy}
                                onChange={(e) => setFormData({ ...formData, segmentation_strategy: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you segment your list? (by interest, behavior, purchase history, engagement level)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Automation Sequences</label>
                            <textarea
                                value={formData.automation_sequences}
                                onChange={(e) => setFormData({ ...formData, automation_sequences: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What automated email sequences will you create? (welcome, onboarding, abandoned cart, re-engagement)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Open rate, click rate, conversion rate, list growth rate, revenue per subscriber"
                            />
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
                                Save Email Strategy
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
                assistantType="charlie"
                sectionTitle="Email Marketing Strategy"
            />
        </>)}
        </div>
    </div>
    );
}