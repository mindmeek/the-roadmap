import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Globe, Save, Loader2, CheckCircle, ArrowLeft,
    Sparkles, HelpCircle, Layout, Image, FileText, Users, Target
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import WebsiteLaunchOverview from '@/components/strategy/WebsiteLaunchOverview';

export default function StrategyFormWebsiteLaunch() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        domain_name: '',
        website_goals: '',
        target_pages: ['Home', 'About', 'Services', 'Contact', ''],
        homepage_headline: '',
        homepage_subheadline: '',
        call_to_action: '',
        about_page_content: '',
        services_description: '',
        contact_information: '',
        brand_colors: ['', '', ''],
        logo_concept: '',
        images_needed: '',
        seo_keywords: '',
        hosting_platform: '',
        launch_timeline: '',
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
                document_type: 'website_launch'
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
                document_type: 'website_launch'
            });

            const docData = {
                document_type: 'website_launch',
                title: 'Website Launch Plan',
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
                    <WebsiteLaunchOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-lg">
                            <Globe className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Launch Your Professional Website</h1>
                            <p className="text-[var(--text-soft)]">Plan and build your online presence</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Your Website Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Your website is your 24/7 salesperson, brand showcase, and trust-builder. It's often the first impression
                                prospects have of your business. A professional website establishes credibility and makes it easy for people
                                to understand what you offer and take action.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Instant credibility, 24/7 accessibility, lead generation automation,
                                showcase your expertise, and control your brand narrative.
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
                            <strong>The HQ</strong>'s drag-and-drop builder creates websites and funnels that automate your sales process. 
                            Integrated directly with your CRM and calendar, your site pre-qualifies leads and frees up your time for high-value conversations
                            without needing technical skills or expensive hosting. Plus, for detailed installation instructions and implementation guidance, **The HQ's built-in AI chatbot** is always available to assist you step-by-step.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Your website speaks directly to your ideal client's pain points, desires, and questions. Through compelling copy
                            and strategic design, it builds trust and demonstrates you understand their world. Testimonials, case studies,
                            and your story create emotional connection before the first conversation. Need design feedback? Share your site and get support in the **Business Minds Community**.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Mike, Business Consultant:</strong> After launching a professional website with clear service pages,
                            pricing guides, and client testimonials, his discovery calls went from 45 minutes of explaining basics to
                            15 minutes of strategy discussion. Conversion rate jumped from 20% to 65% because leads were pre-qualified.
                        </p>
                    </div>
                </div>

                {/* Website Basics */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Website Basics</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Domain Name</label>
                            <input
                                type="text"
                                value={formData.domain_name}
                                onChange={(e) => setFormData({ ...formData, domain_name: e.target.value })}
                                className="form-input"
                                placeholder="e.g., yourbusiness.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Website Goals</label>
                            <textarea
                                value={formData.website_goals}
                                onChange={(e) => setFormData({ ...formData, website_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want your website to achieve? (e.g., Generate leads, Sell products, Build authority, Provide information)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Hosting Platform</label>
                            <input
                                type="text"
                                value={formData.hosting_platform}
                                onChange={(e) => setFormData({ ...formData, hosting_platform: e.target.value })}
                                className="form-input"
                                placeholder="e.g., The HQ (Recommended), WordPress, Squarespace"
                            />
                        </div>
                    </div>
                </div>

                {/* Website Structure */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Layout className="w-6 h-6 text-blue-600" />
                        Website Structure & Pages
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">
                        List the pages you need for your website
                    </p>

                    <div className="space-y-3">
                        {formData.target_pages.map((page, index) => (
                            <input
                                key={index}
                                type="text"
                                value={page}
                                onChange={(e) => updateArrayField('target_pages', index, e.target.value)}
                                className="form-input"
                                placeholder={`Page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Homepage Content */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-cyan-600" />
                        Homepage Content
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Main Headline</label>
                            <input
                                type="text"
                                value={formData.homepage_headline}
                                onChange={(e) => setFormData({ ...formData, homepage_headline: e.target.value })}
                                className="form-input"
                                placeholder="Your clear, compelling headline (what you do + who you serve)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Subheadline</label>
                            <input
                                type="text"
                                value={formData.homepage_subheadline}
                                onChange={(e) => setFormData({ ...formData, homepage_subheadline: e.target.value })}
                                className="form-input"
                                placeholder="Supporting text that expands on your headline"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Primary Call-to-Action</label>
                            <input
                                type="text"
                                value={formData.call_to_action}
                                onChange={(e) => setFormData({ ...formData, call_to_action: e.target.value })}
                                className="form-input"
                                placeholder="e.g., 'Get Your Free Consultation', 'Start Your Trial', 'Contact Us Today'"
                            />
                        </div>
                    </div>
                </div>

                {/* Key Page Content */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Key Page Content</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">About Page</label>
                            <textarea
                                value={formData.about_page_content}
                                onChange={(e) => setFormData({ ...formData, about_page_content: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Your story, mission, and what makes you different"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Services/Products Description</label>
                            <textarea
                                value={formData.services_description}
                                onChange={(e) => setFormData({ ...formData, services_description: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What you offer and the benefits/results"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Contact Information</label>
                            <textarea
                                value={formData.contact_information}
                                onChange={(e) => setFormData({ ...formData, contact_information: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Email, phone, address, social media links"
                            />
                        </div>
                    </div>
                </div>

                {/* Design & Branding */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Image className="w-6 h-6 text-purple-600" />
                        Design & Branding
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Brand Colors</label>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.brand_colors.map((color, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={color}
                                        onChange={(e) => updateArrayField('brand_colors', index, e.target.value)}
                                        className="form-input"
                                        placeholder={`Color ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Logo Concept</label>
                            <textarea
                                value={formData.logo_concept}
                                onChange={(e) => setFormData({ ...formData, logo_concept: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Describe your logo or upload location"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Images Needed</label>
                            <textarea
                                value={formData.images_needed}
                                onChange={(e) => setFormData({ ...formData, images_needed: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What photos or graphics do you need? (hero image, team photos, product images, etc.)"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO & Launch */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">SEO & Launch Plan</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">SEO Keywords</label>
                            <textarea
                                value={formData.seo_keywords}
                                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="10-15 keywords your customers search for"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Launch Timeline</label>
                            <textarea
                                value={formData.launch_timeline}
                                onChange={(e) => setFormData({ ...formData, launch_timeline: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Milestones and deadlines for launching your website"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="How will you measure success? (visitors, leads, conversions, etc.)"
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
                                Save Website Plan
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

                <AITeamModal
                    isOpen={showAIAssistant}
                    onClose={() => setShowAIAssistant(false)}
                    assistantType="sam"
                    sectionTitle="Website Launch Plan"
                />
            </>)}
            </div>
        </div>
    );
}