import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Share2, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Calendar, Target, Users
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import SocialMediaOverview from '@/components/strategy/SocialMediaOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';

export default function StrategyFormSocialMedia() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        social_media_goals: '',
        target_platforms: {
            instagram: { enabled: false, strategy: '', frequency: '' },
            facebook: { enabled: false, strategy: '', frequency: '' },
            linkedin: { enabled: false, strategy: '', frequency: '' },
            twitter: { enabled: false, strategy: '', frequency: '' },
            tiktok: { enabled: false, strategy: '', frequency: '' },
            youtube: { enabled: false, strategy: '', frequency: '' }
        },
        content_pillars: ['', '', '', ''],
        content_mix: '',
        posting_schedule: '',
        engagement_strategy: '',
        hashtag_strategy: '',
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
                document_type: 'social_media_strategy'
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
                document_type: 'social_media_strategy'
            });

            const docData = {
                document_type: 'social_media_strategy',
                title: 'Social Media Strategy',
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
                    <SocialMediaOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-pink-500 to-red-600 p-3 rounded-lg">
                            <Share2 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Create Your Social Media Strategy</h1>
                            <p className="text-[var(--text-soft)]">Build your presence and engage your audience</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 border-2 border-pink-200 dark:border-pink-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Social Media Strategy Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Social media is where your ideal clients hang out, discover brands, and make buying decisions. A strategic 
                                approach turns social platforms into powerful lead generation and relationship-building engines. Without strategy, 
                                you're just posting into the void.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Amplified reach, community building, brand awareness, direct customer feedback, 
                                and cost-effective marketing.
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
                            Using <strong>The HQ</strong>'s Social Planner, you can schedule 30 days of content in one sitting. It posts automatically 
                            to all your accounts (Facebook, Instagram, LinkedIn, etc.) while you focus on revenue. Content pillars eliminate "what should I post?" 
                            paralysis, and the centralized inbox lets you reply to all comments in one place. Plus, for detailed installation instructions and implementation guidance, **The HQ's built-in AI chatbot** is always available to assist you step-by-step.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Social media humanizes your brand. Behind-the-scenes content, personal stories, and authentic interactions 
                            build trust faster than any ad. Your ideal clients discover you through hashtags, shares, and recommendations. 
                            Consistent valuable content positions you as the go-to expert in your niche. Share your wins and get content ideas in the **Business Minds Community**.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Marcus, Fitness Coach:</strong> Posted 3x per week on Instagram with workout tips, transformation stories, 
                            and motivational content. In 6 months, grew from 200 to 15,000 followers. Now books 20+ clients monthly directly 
                            from Instagram DMs without paid ads—all from consistent, strategic content.
                        </p>
                    </div>
                </div>

                {/* Social Media Goals */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-pink-600" />
                        Social Media Goals
                    </h3>
                    
                    <textarea
                        value={formData.social_media_goals}
                        onChange={(e) => setFormData({ ...formData, social_media_goals: e.target.value })}
                        className="form-input"
                        rows="4"
                        placeholder="What do you want to achieve? (e.g., Grow to 10k followers, Drive traffic to website, Build community, Generate leads)"
                    />
                </div>

                {/* Platform Selection */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Choose Your Platforms</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Select 1-3 platforms where your ideal clients spend time</p>
                    
                    <div className="space-y-6">
                        {Object.keys(formData.target_platforms).map((platform) => (
                            <div key={platform} className="border-l-4 border-pink-500 pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.target_platforms[platform].enabled}
                                        onChange={(e) => setFormData({ ...formData, target_platforms: { ...formData.target_platforms, [platform]: { ...formData.target_platforms[platform], enabled: e.target.checked }}})}
                                        className="w-4 h-4"
                                    />
                                    <h4 className="font-semibold text-[var(--text-main)] capitalize">{platform}</h4>
                                </div>
                                {formData.target_platforms[platform].enabled && (
                                    <div className="space-y-2 mt-2">
                                        <input
                                            type="text"
                                            value={formData.target_platforms[platform].frequency}
                                            onChange={(e) => setFormData({ ...formData, target_platforms: { ...formData.target_platforms, [platform]: { ...formData.target_platforms[platform], frequency: e.target.value }}})}
                                            className="form-input"
                                            placeholder="Posting frequency (e.g., Daily, 3x per week)"
                                        />
                                        <textarea
                                            value={formData.target_platforms[platform].strategy}
                                            onChange={(e) => setFormData({ ...formData, target_platforms: { ...formData.target_platforms, [platform]: { ...formData.target_platforms[platform], strategy: e.target.value }}})}
                                            className="form-input"
                                            rows="2"
                                            placeholder={`Your strategy for ${platform}...`}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Strategy */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Content Strategy</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Pillars</label>
                            <p className="text-xs text-[var(--text-soft)] mb-2">3-5 themes you'll consistently post about</p>
                            <div className="space-y-3">
                                {formData.content_pillars.map((pillar, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={pillar}
                                        onChange={(e) => updateArrayField('content_pillars', index, e.target.value)}
                                        className="form-input"
                                        placeholder={`Pillar ${index + 1} (e.g., Industry Tips, Behind-the-Scenes, Client Wins)`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Mix</label>
                            <textarea
                                value={formData.content_mix}
                                onChange={(e) => setFormData({ ...formData, content_mix: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="e.g., 50% educational, 30% inspirational, 15% promotional, 5% personal"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Hashtag Strategy</label>
                            <textarea
                                value={formData.hashtag_strategy}
                                onChange={(e) => setFormData({ ...formData, hashtag_strategy: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="List 15-30 relevant hashtags for your niche"
                            />
                        </div>
                    </div>
                </div>

                {/* Posting & Engagement */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-red-600" />
                        Posting & Engagement
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Posting Schedule</label>
                            <textarea
                                value={formData.posting_schedule}
                                onChange={(e) => setFormData({ ...formData, posting_schedule: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="When will you post on each platform? (e.g., Instagram: Daily at 10am, LinkedIn: Mon/Wed/Fri at 9am)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Engagement Strategy</label>
                            <textarea
                                value={formData.engagement_strategy}
                                onChange={(e) => setFormData({ ...formData, engagement_strategy: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you engage with your audience? (respond to comments, DMs, engage with others' content, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Follower growth, engagement rate, website clicks, leads generated, etc."
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
                                Save Social Strategy
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
                assistantType="strategy_form_agent"
                sectionTitle="Social Media Strategy"
                additionalContext={`Document Type: social_media\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nSelected Channels: ${selectedChannels.join(', ')}\nForm Fields: ${Object.keys(formData).join(', ')}`}
                currentBusinessId={user?.current_business_id}
                selectedChannels={selectedChannels}
            />
        </>)}
        </div>
    </div>
    );
}