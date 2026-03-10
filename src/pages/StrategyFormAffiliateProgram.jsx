import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Percent, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, DollarSign, Users, Target, Gift
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import AffiliateProgramOverview from '@/components/strategy/AffiliateProgramOverview';

export default function StrategyFormAffiliateProgram() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        program_goals: '',
        products_to_promote: '',
        commission_structure: '',
        cookie_duration: '',
        ideal_affiliates: '',
        affiliate_benefits: '',
        recruitment_strategy: '',
        promotional_materials: '',
        tracking_platform: '',
        approval_process: '',
        payment_terms: '',
        performance_incentives: '',
        support_resources: '',
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
                document_type: 'affiliate_program'
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
                document_type: 'affiliate_program'
            });

            const docData = {
                document_type: 'affiliate_program',
                title: 'Launch Your Affiliate Program',
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
                    <AffiliateProgramOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-lg">
                            <Percent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Launch Your Affiliate Program</h1>
                            <p className="text-[var(--text-soft)]">Scale your business through strategic partnerships</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Launch an Affiliate Program?</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                An affiliate program turns customers, fans, and influencers into your sales force. You only pay for results, 
                                making it one of the most cost-effective marketing channels with unlimited scaling potential.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Performance-based marketing, exponential reach, trusted recommendations, 
                                reduced marketing costs, and a network of brand advocates.
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
                            Affiliates do the marketing while you focus on product and delivery. Tracking software handles commission calculations 
                            automatically. Instead of managing a traditional sales team, you have hundreds of independent marketers promoting you. 
                            Your marketing budget scales only when you make sales—zero risk.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Affiliates bring you warm, pre-qualified leads from their own audiences. When a trusted influencer or satisfied customer 
                            recommends you, conversion rates skyrocket. You access audiences you couldn't reach on your own, and the recommendation 
                            comes from someone ideal clients already trust.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>ConvertKit (Email Software):</strong> Launched an affiliate program offering 30% recurring commissions. 
                            Now 40% of their $28M annual revenue comes from affiliates. Top affiliates earn $50K+ per year passively, 
                            and ConvertKit only pays when they make sales—perfect scaling model.
                        </p>
                    </div>
                </div>

                {/* Program Basics */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-green-600" />
                        Program Foundation
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Program Goals</label>
                            <textarea
                                value={formData.program_goals}
                                onChange={(e) => setFormData({ ...formData, program_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want to achieve? (e.g., Generate 50% of sales through affiliates, Recruit 100 active affiliates, Expand into new markets)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Products/Services to Promote</label>
                            <textarea
                                value={formData.products_to_promote}
                                onChange={(e) => setFormData({ ...formData, products_to_promote: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Which products or services will affiliates promote? List with pricing."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Tracking Platform</label>
                            <input
                                type="text"
                                value={formData.tracking_platform}
                                onChange={(e) => setFormData({ ...formData, tracking_platform: e.target.value })}
                                className="form-input"
                                placeholder="e.g., Rewardful, PartnerStack, Impact, Tapfiliate, Custom Solution"
                            />
                        </div>
                    </div>
                </div>

                {/* Commission Structure */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                        Commission Structure
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Commission Rates</label>
                            <textarea
                                value={formData.commission_structure}
                                onChange={(e) => setFormData({ ...formData, commission_structure: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="What percentage or flat rate will affiliates earn? (e.g., 20% on all sales, $50 per lead, Tiered: 10% for 0-10 sales, 15% for 11-50 sales, 20% for 51+ sales)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Cookie Duration</label>
                            <input
                                type="text"
                                value={formData.cookie_duration}
                                onChange={(e) => setFormData({ ...formData, cookie_duration: e.target.value })}
                                className="form-input"
                                placeholder="e.g., 30 days, 60 days, 90 days (how long affiliate gets credit for a referral)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Payment Terms</label>
                            <textarea
                                value={formData.payment_terms}
                                onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="When and how do affiliates get paid? (e.g., Monthly payments, $100 minimum payout, PayPal or bank transfer)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Performance Incentives</label>
                            <textarea
                                value={formData.performance_incentives}
                                onChange={(e) => setFormData({ ...formData, performance_incentives: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Bonuses for top performers? (e.g., $500 bonus for first 50 sales, Quarterly prizes, Exclusive perks for top 10 affiliates)"
                            />
                        </div>
                    </div>
                </div>

                {/* Affiliate Recruitment */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Affiliate Recruitment
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Ideal Affiliate Profile</label>
                            <textarea
                                value={formData.ideal_affiliates}
                                onChange={(e) => setFormData({ ...formData, ideal_affiliates: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Who are your ideal affiliates? (bloggers, influencers, customers, industry experts, email list owners)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Recruitment Strategy</label>
                            <textarea
                                value={formData.recruitment_strategy}
                                onChange={(e) => setFormData({ ...formData, recruitment_strategy: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="How will you find and recruit affiliates? (reach out to existing customers, partner with influencers, affiliate networks, social media outreach)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Affiliate Benefits Pitch</label>
                            <textarea
                                value={formData.affiliate_benefits}
                                onChange={(e) => setFormData({ ...formData, affiliate_benefits: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Why should someone become your affiliate? What's in it for them beyond commissions?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Approval Process</label>
                            <textarea
                                value={formData.approval_process}
                                onChange={(e) => setFormData({ ...formData, approval_process: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Will you auto-approve all affiliates or manually review? What are your criteria?"
                            />
                        </div>
                    </div>
                </div>

                {/* Support & Resources */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Gift className="w-6 h-6 text-purple-600" />
                        Affiliate Support & Resources
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Promotional Materials</label>
                            <textarea
                                value={formData.promotional_materials}
                                onChange={(e) => setFormData({ ...formData, promotional_materials: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="What resources will you provide? (banners, email templates, social media graphics, product images, testimonials, case studies)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Support & Training</label>
                            <textarea
                                value={formData.support_resources}
                                onChange={(e) => setFormData({ ...formData, support_resources: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="How will you help affiliates succeed? (onboarding guide, training videos, email support, affiliate portal, best practices)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Number of active affiliates, revenue generated, conversion rate, average order value from affiliates"
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
                                Save Affiliate Program
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
                    assistantType="ava"
                    sectionTitle="Affiliate Program Strategy"
                />
            </>)}
            </div>
        </div>
    );
}