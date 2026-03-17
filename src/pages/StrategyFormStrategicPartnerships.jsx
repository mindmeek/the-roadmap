import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Handshake, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Target, Users, TrendingUp
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import StrategicPartnershipsOverview from '@/components/strategy/StrategicPartnershipsOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';

export default function StrategyFormStrategicPartnerships() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        partnership_goals: '',
        ideal_partners: '',
        partnership_types: {
            referral: { enabled: false, description: '' },
            co_marketing: { enabled: false, description: '' },
            joint_ventures: { enabled: false, description: '' },
            reseller: { enabled: false, description: '' },
            technology: { enabled: false, description: '' }
        },
        value_proposition: '',
        partnership_criteria: '',
        outreach_strategy: '',
        partnership_agreement: '',
        success_metrics: '',
        partnership_management: ''
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
                document_type: 'strategic_partnerships'
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
                document_type: 'strategic_partnerships'
            });

            const docData = {
                document_type: 'strategic_partnerships',
                title: 'Build Strategic Partnerships',
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
                    <StrategicPartnershipsOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                            <Handshake className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Build Strategic Partnerships</h1>
                            <p className="text-[var(--text-soft)]">Accelerate growth through collaboration</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Strategic Partnerships Matter</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Strategic partnerships allow you to leverage other businesses' audiences, expertise, and resources. 
                                The right partnerships can 10x your growth by giving you instant access to customers who already trust your partner.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Shared resources, expanded reach, credibility boost, complementary strengths, 
                                reduced costs, faster market entry, and mutual growth opportunities.
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
                            Partnerships eliminate the need to build everything yourself. Need distribution? Partner with someone who has it. 
                            Need technology? Integrate with an existing platform. Need expertise? Collaborate with a specialist. 
                            Strategic partnerships shortcut years of building and let you focus on your core strengths.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            When you partner with a brand your ideal clients already trust, you inherit that trust. A joint webinar, 
                            co-created product, or referral partnership gives you instant credibility. Your partner's endorsement is worth 
                            more than years of advertising because it comes from someone they already know and respect.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>Shopify + Mailchimp:</strong> By integrating email marketing with e-commerce, both companies grew exponentially. 
                            Shopify stores got easy email tools, Mailchimp accessed millions of online stores. The partnership added millions 
                            in revenue for both—neither had to build what the other already perfected.
                        </p>
                    </div>
                </div>

                {/* Partnership Vision */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        Partnership Strategy
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Partnership Goals</label>
                            <textarea
                                value={formData.partnership_goals}
                                onChange={(e) => setFormData({ ...formData, partnership_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want to achieve through partnerships? (e.g., Reach 10,000 new customers, Enter new markets, Add complementary services)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Ideal Partner Profile</label>
                            <textarea
                                value={formData.ideal_partners}
                                onChange={(e) => setFormData({ ...formData, ideal_partners: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Who would be perfect partners? (complementary businesses, shared audience, similar values, different but aligned offerings)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Partnership Criteria</label>
                            <textarea
                                value={formData.partnership_criteria}
                                onChange={(e) => setFormData({ ...formData, partnership_criteria: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What criteria must partners meet? (audience size, brand reputation, values alignment, business maturity)"
                            />
                        </div>
                    </div>
                </div>

                {/* Partnership Types */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        Types of Partnerships
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Select the partnership types you want to pursue</p>
                    
                    <div className="space-y-6">
                        {/* Referral */}
                        <div className="border-l-4 border-blue-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.partnership_types.referral.enabled}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, referral: { ...formData.partnership_types.referral, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Referral Partnerships</h4>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">Exchange customer referrals with complementary businesses</p>
                            {formData.partnership_types.referral.enabled && (
                                <textarea
                                    value={formData.partnership_types.referral.description}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, referral: { ...formData.partnership_types.referral, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="How will referrals work? What incentives will you offer?"
                                />
                            )}
                        </div>

                        {/* Co-Marketing */}
                        <div className="border-l-4 border-purple-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.partnership_types.co_marketing.enabled}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, co_marketing: { ...formData.partnership_types.co_marketing, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Co-Marketing Partnerships</h4>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">Joint webinars, content, events, or campaigns</p>
                            {formData.partnership_types.co_marketing.enabled && (
                                <textarea
                                    value={formData.partnership_types.co_marketing.description}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, co_marketing: { ...formData.partnership_types.co_marketing, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="What co-marketing activities will you pursue? (webinars, co-created content, joint promotions)"
                                />
                            )}
                        </div>

                        {/* Joint Ventures */}
                        <div className="border-l-4 border-green-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.partnership_types.joint_ventures.enabled}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, joint_ventures: { ...formData.partnership_types.joint_ventures, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Joint Ventures</h4>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">Collaborate on new products or shared projects</p>
                            {formData.partnership_types.joint_ventures.enabled && (
                                <textarea
                                    value={formData.partnership_types.joint_ventures.description}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, joint_ventures: { ...formData.partnership_types.joint_ventures, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="What joint projects or products could you create together?"
                                />
                            )}
                        </div>

                        {/* Reseller/White Label */}
                        <div className="border-l-4 border-yellow-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.partnership_types.reseller.enabled}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, reseller: { ...formData.partnership_types.reseller, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Reseller/White Label Partnerships</h4>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">Others sell your product/service under their brand</p>
                            {formData.partnership_types.reseller.enabled && (
                                <textarea
                                    value={formData.partnership_types.reseller.description}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, reseller: { ...formData.partnership_types.reseller, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="Terms, margins, and support for resellers?"
                                />
                            )}
                        </div>

                        {/* Technology */}
                        <div className="border-l-4 border-red-500 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    checked={formData.partnership_types.technology.enabled}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, technology: { ...formData.partnership_types.technology, enabled: e.target.checked }}})}
                                    className="w-4 h-4"
                                />
                                <h4 className="font-semibold text-[var(--text-main)]">Technology/Integration Partnerships</h4>
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mb-2">Integrate with other platforms or services</p>
                            {formData.partnership_types.technology.enabled && (
                                <textarea
                                    value={formData.partnership_types.technology.description}
                                    onChange={(e) => setFormData({ ...formData, partnership_types: { ...formData.partnership_types, technology: { ...formData.partnership_types.technology, description: e.target.value }}})}
                                    className="form-input mt-2"
                                    rows="3"
                                    placeholder="What integrations or tech partnerships make sense?"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Value Proposition & Outreach */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        Partnership Execution
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Your Value Proposition to Partners</label>
                            <textarea
                                value={formData.value_proposition}
                                onChange={(e) => setFormData({ ...formData, value_proposition: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Why should someone partner with you? What value do you bring? (audience size, expertise, resources, revenue potential)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Outreach Strategy</label>
                            <textarea
                                value={formData.outreach_strategy}
                                onChange={(e) => setFormData({ ...formData, outreach_strategy: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="How will you find and approach potential partners? (networking events, cold outreach, LinkedIn, mutual connections, industry groups)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Partnership Agreement Essentials</label>
                            <textarea
                                value={formData.partnership_agreement}
                                onChange={(e) => setFormData({ ...formData, partnership_agreement: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="Key terms to include in partnership agreements (responsibilities, revenue split, exclusivity, term length, termination clause)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Partnership Management</label>
                            <textarea
                                value={formData.partnership_management}
                                onChange={(e) => setFormData({ ...formData, partnership_management: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="How will you maintain and nurture partnerships? (regular check-ins, joint planning sessions, performance reviews)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Number of partnerships, revenue generated, leads generated, shared customers, ROI"
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
                                Save Partnership Strategy
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
                    sectionTitle="Strategic Partnerships"
                    additionalContext={`Document Type: strategic_partnerships\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Fields: ${Object.keys(formData).join(', ')}`}
                    currentBusinessId={user?.current_business_id}
                />
            </>)}
            </div>
        </div>
    );
}