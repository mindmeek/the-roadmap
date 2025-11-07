
import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Users, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, MessageCircle, Heart, Target
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';

export default function StrategyFormCommunityBuilding() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);

    const [formData, setFormData] = useState({
        community_vision: '',
        target_members: '',
        community_platform: '',
        community_type: '',
        value_proposition: '',
        content_pillars: ['', '', '', ''],
        engagement_activities: '',
        moderation_guidelines: '',
        growth_strategy: '',
        member_benefits: '',
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
                document_type: 'community_building'
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
                document_type: 'community_building'
            });

            const docData = {
                document_type: 'community_building',
                title: 'Build Your Thriving Community',
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
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Build Your Thriving Community</h1>
                            <p className="text-[var(--text-soft)]">Create a engaged space where your audience connects</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Community Matters</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                A thriving community creates loyal customers, brand advocates, and a powerful referral network. 
                                It's where relationships deepen, trust builds, and your business becomes part of people's lives—not just a transaction.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Customer retention, word-of-mouth marketing, feedback loop, co-creation opportunities, 
                                and a defensible competitive moat.
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
                            Communities provide customer support at scale—members help each other instead of always contacting you. 
                            Product feedback happens organically in discussions. Launch announcements reach your most engaged audience instantly. 
                            Your community becomes your focus group, support team, and marketing department all in one.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            In your community, prospects see real customers getting results and building friendships. This social proof 
                            is more powerful than any marketing copy. New members join because they want to be part of something bigger. 
                            The community becomes the product itself—people stay for the connections.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Lisa, Business Strategist:</strong> Created a free Facebook group with weekly training and member spotlights. 
                            Grew to 8,000 members in 18 months. 70% of her $400K annual course sales come directly from the group. 
                            Members answer each other's questions, reducing her support time by 15 hours per week.
                        </p>
                    </div>
                </div>

                {/* Community Vision */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-purple-600" />
                        Community Vision & Purpose
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Community Vision</label>
                            <textarea
                                value={formData.community_vision}
                                onChange={(e) => setFormData({ ...formData, community_vision: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What kind of community do you want to build? What will members achieve together?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Who Are Your Target Members?</label>
                            <textarea
                                value={formData.target_members}
                                onChange={(e) => setFormData({ ...formData, target_members: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Who is this community for? What do they have in common?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Community Type</label>
                            <input
                                type="text"
                                value={formData.community_type}
                                onChange={(e) => setFormData({ ...formData, community_type: e.target.value })}
                                className="form-input"
                                placeholder="e.g., Free Facebook Group, Paid Membership, Slack Channel, Forum, Mobile App"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Platform</label>
                            <input
                                type="text"
                                value={formData.community_platform}
                                onChange={(e) => setFormData({ ...formData, community_platform: e.target.value })}
                                className="form-input"
                                placeholder="e.g., Facebook Groups, Discord, Circle, Mighty Networks, Custom Website"
                            />
                        </div>
                    </div>
                </div>

                {/* Value Proposition */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-pink-600" />
                        Community Value Proposition
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Why Should Someone Join?</label>
                            <textarea
                                value={formData.value_proposition}
                                onChange={(e) => setFormData({ ...formData, value_proposition: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What unique value does your community offer? What transformation or benefits will members experience?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Member Benefits</label>
                            <textarea
                                value={formData.member_benefits}
                                onChange={(e) => setFormData({ ...formData, member_benefits: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="List specific benefits: access to resources, networking opportunities, exclusive content, support, accountability, etc."
                            />
                        </div>
                    </div>
                </div>

                {/* Content & Engagement */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                        Content & Engagement Strategy
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Content Pillars</label>
                            <p className="text-xs text-[var(--text-soft)] mb-2">What types of content will you share in the community?</p>
                            <div className="space-y-3">
                                {formData.content_pillars.map((pillar, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={pillar}
                                        onChange={(e) => updateArrayField('content_pillars', index, e.target.value)}
                                        className="form-input"
                                        placeholder={`Content Pillar ${index + 1} (e.g., Weekly Tips, Member Spotlights, Q&A Sessions)`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Engagement Activities</label>
                            <textarea
                                value={formData.engagement_activities}
                                onChange={(e) => setFormData({ ...formData, engagement_activities: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="How will you keep members engaged? (weekly challenges, live events, member spotlights, polls, discussions, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Moderation Guidelines</label>
                            <textarea
                                value={formData.moderation_guidelines}
                                onChange={(e) => setFormData({ ...formData, moderation_guidelines: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Community rules, code of conduct, and how you'll maintain a positive environment"
                            />
                        </div>
                    </div>
                </div>

                {/* Growth Strategy */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Growth & Success</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Growth Strategy</label>
                            <textarea
                                value={formData.growth_strategy}
                                onChange={(e) => setFormData({ ...formData, growth_strategy: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="How will you attract new members? (invitations, referral incentives, partnerships, content marketing, social media)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you measure success? (member count, engagement rate, retention, testimonials, member satisfaction)"
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
                                Save Community Plan
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
                sectionTitle="Community Building Strategy"
            />
        </div>
    );
}
