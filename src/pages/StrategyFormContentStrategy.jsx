import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    FileText, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Plus, Trash2, Target, Calendar
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import ContentStrategyOverview from '@/components/strategy/ContentStrategyOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';

export default function StrategyFormContentStrategy() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        content_goals: '',
        target_audience_content: '',
        content_pillars: ['', '', '', ''],
        content_types: {
            blog_posts: { frequency: '', topics: '' },
            social_media: { platforms: '', frequency: '', content_mix: '' },
            email_marketing: { frequency: '', types: '' },
            video_content: { frequency: '', topics: '' },
            podcasts: { frequency: '', topics: '' },
            other: { type: '', frequency: '', description: '' }
        },
        content_calendar: '',
        seo_keywords: '',
        distribution_channels: '',
        content_repurposing_plan: '',
        metrics_to_track: ''
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
                document_type: 'content_strategy'
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
                document_type: 'content_strategy'
            });

            const docData = {
                document_type: 'content_strategy',
                title: 'Content Strategy & Planning',
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
                    <ContentStrategyOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Content Strategy & Planning</h1>
                            <p className="text-[var(--text-soft)]">Plan your content creation and distribution strategy</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Content Strategy Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Content is how you attract, educate, and nurture your audience. A strategic content plan ensures you're 
                                consistently creating valuable content that serves your business goals and resonates with your ideal clients.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Build authority, improve SEO, generate leads, nurture relationships, and 
                                establish thought leadership in your industry.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Goals & Audience */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-green-600" />
                        Content Goals & Audience
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Goals</label>
                            <textarea
                                value={formData.content_goals}
                                onChange={(e) => setFormData({ ...formData, content_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want to achieve with your content? (e.g., Generate 50 leads per month, Build email list to 5,000 subscribers, Establish thought leadership)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Target Audience for Content</label>
                            <textarea
                                value={formData.target_audience_content}
                                onChange={(e) => setFormData({ ...formData, target_audience_content: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Who are you creating content for? What are their interests and pain points?"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Pillars */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Content Pillars</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">
                        3-5 main themes or topics you'll consistently create content around
                    </p>
                    
                    <div className="space-y-3">
                        {formData.content_pillars.map((pillar, index) => (
                            <input
                                key={index}
                                type="text"
                                value={pillar}
                                onChange={(e) => updateArrayField('content_pillars', index, e.target.value)}
                                className="form-input"
                                placeholder={`Content Pillar ${index + 1} (e.g., Industry Tips, Case Studies, Behind-the-Scenes)`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Types */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Content Types & Frequency</h3>
                    
                    <div className="space-y-6">
                        {/* Blog Posts */}
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-[var(--text-main)] mb-3">Blog Posts/Articles</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Publishing Frequency</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.blog_posts.frequency}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, blog_posts: { ...formData.content_types.blog_posts, frequency: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., 2x per week, Weekly"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Topic Areas</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.blog_posts.topics}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, blog_posts: { ...formData.content_types.blog_posts, topics: e.target.value }}})}
                                        className="form-input"
                                        placeholder="What topics will you cover?"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-[var(--text-main)] mb-3">Social Media</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Platforms</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.social_media.platforms}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, social_media: { ...formData.content_types.social_media, platforms: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., Instagram, LinkedIn, Facebook, Twitter"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Posting Frequency</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.social_media.frequency}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, social_media: { ...formData.content_types.social_media, frequency: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., Daily, 3x per week per platform"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Content Mix</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.social_media.content_mix}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, social_media: { ...formData.content_types.social_media, content_mix: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., 40% educational, 30% promotional, 20% personal, 10% entertaining"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Marketing */}
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-semibold text-[var(--text-main)] mb-3">Email Marketing</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Email Frequency</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.email_marketing.frequency}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, email_marketing: { ...formData.content_types.email_marketing, frequency: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., Weekly newsletter, Bi-weekly"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Email Types</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.email_marketing.types}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, email_marketing: { ...formData.content_types.email_marketing, types: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., Newsletter, Product updates, Tips"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Video Content */}
                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-[var(--text-main)] mb-3">Video Content</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Publishing Frequency</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.video_content.frequency}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, video_content: { ...formData.content_types.video_content, frequency: e.target.value }}})}
                                        className="form-input"
                                        placeholder="e.g., Weekly, Monthly, None"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[var(--text-soft)] mb-2">Video Topics</label>
                                    <input
                                        type="text"
                                        value={formData.content_types.video_content.topics}
                                        onChange={(e) => setFormData({ ...formData, content_types: { ...formData.content_types, video_content: { ...formData.content_types.video_content, topics: e.target.value }}})}
                                        className="form-input"
                                        placeholder="What will you create videos about?"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Distribution & SEO */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Distribution & SEO</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">SEO Keywords to Target</label>
                            <textarea
                                value={formData.seo_keywords}
                                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="List 10-20 keywords your ideal clients are searching for"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Distribution Channels</label>
                            <textarea
                                value={formData.distribution_channels}
                                onChange={(e) => setFormData({ ...formData, distribution_channels: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Where will you share your content? (Website, social media, email, guest posts, partnerships, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Repurposing Plan</label>
                            <textarea
                                value={formData.content_repurposing_plan}
                                onChange={(e) => setFormData({ ...formData, content_repurposing_plan: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you repurpose content? (e.g., Turn blog posts into social posts, create infographics from articles, make video clips from long-form content)"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Calendar & Metrics */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-green-600" />
                        Content Calendar & Metrics
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Calendar Approach</label>
                            <textarea
                                value={formData.content_calendar}
                                onChange={(e) => setFormData({ ...formData, content_calendar: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you plan your content? (e.g., Monthly themes, quarterly planning, batch content creation, use of scheduling tools)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Metrics to Track</label>
                            <textarea
                                value={formData.metrics_to_track}
                                onChange={(e) => setFormData({ ...formData, metrics_to_track: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What will you measure? (e.g., Website traffic, engagement rate, email open rates, lead generation, conversion rates)"
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
                                Save Content Strategy
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

            <FoundationFormNav currentFormId="content_strategy" />

            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="strategy_form_agent"
                sectionTitle="Content Strategy & Planning"
                additionalContext={`Document Type: content_strategy\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Fields: ${Object.keys(formData).join(', ')}`}
                currentBusinessId={user?.current_business_id}
            />
        </>)}
        </div>
    </div>
    );
}