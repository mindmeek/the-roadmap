import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Sparkles, Loader2, Target, TrendingUp, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileBottomSheet from '@/components/common/MobileBottomSheet';

export default function StrategyGeneratorModal({ isOpen, onClose, planType }) {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showStageSheet, setShowStageSheet] = useState(false);
    const [formData, setFormData] = useState({
        business_name: '',
        industry: '',
        stage: '',
        goals: '',
        target_audience: '',
        current_challenges: ''
    });

    useEffect(() => {
        if (isOpen) {
            loadUserData();
        }
    }, [isOpen]);

    const loadUserData = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            const businesses = await base44.entities.Business.filter({ owner_user_id: currentUser.id });
            const userBusiness = businesses[0];
            setBusiness(userBusiness);

            setFormData({
                business_name: userBusiness?.name || currentUser.business_name || '',
                industry: userBusiness?.industry || '',
                stage: currentUser.entrepreneurship_stage || '',
                goals: '',
                target_audience: '',
                current_challenges: ''
            });
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await base44.functions.invoke('generateBusinessStrategy', {
                planType,
                businessContext: formData
            });

            if (response.data.success) {
                onClose(response.data.plan);
            }
        } catch (error) {
            console.error('Error generating strategy:', error);
            alert('Failed to generate strategy. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const planConfig = {
        '90_day_strategic': {
            icon: Target,
            title: 'Generate 90-Day Strategic Plan',
            color: 'from-blue-500 to-indigo-600',
            description: 'Get a comprehensive 90-day roadmap with monthly themes, weekly action steps, and measurable KPIs.'
        },
        'marketing': {
            icon: TrendingUp,
            title: 'Generate Marketing Strategy',
            color: 'from-green-500 to-emerald-600',
            description: 'Receive a complete marketing plan with channel strategies, content calendar, and lead generation tactics.'
        },
        'product_roadmap': {
            icon: Package,
            title: 'Generate Product Roadmap',
            color: 'from-purple-500 to-pink-600',
            description: 'Get product enhancement recommendations, new opportunities, and a prioritized development timeline.'
        }
    };

    const config = planConfig[planType];
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Icon className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">{config.title}</h2>
                        </div>
                        <button onClick={() => onClose()} className="text-white hover:bg-white/20 rounded-full p-2">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-white/90">{config.description}</p>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Business Name
                        </label>
                        <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                            className="form-input"
                            placeholder="Your business name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Industry
                        </label>
                        <input
                            type="text"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="form-input"
                            placeholder="e.g., E-commerce, Consulting, SaaS"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Current Stage
                        </label>
                        <div className="lg:hidden">
                            <button
                                type="button"
                                onClick={() => setShowStageSheet(true)}
                                className="form-input text-left w-full"
                            >
                                {formData.stage ? 
                                    formData.stage === 'vision' ? 'Vision Stage' :
                                    formData.stage === 'startup' ? 'Startup Stage' :
                                    formData.stage === 'growth' ? 'Growth Stage' : 'Select stage'
                                : 'Select stage'}
                            </button>
                            <MobileBottomSheet
                                isOpen={showStageSheet}
                                onClose={() => setShowStageSheet(false)}
                                options={[
                                    { value: 'vision', label: 'Vision Stage' },
                                    { value: 'startup', label: 'Startup Stage' },
                                    { value: 'growth', label: 'Growth Stage' }
                                ]}
                                value={formData.stage}
                                onChange={(value) => setFormData({ ...formData, stage: value })}
                                label="Select Current Stage"
                            />
                        </div>
                        <select
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="form-input hidden lg:block"
                        >
                            <option value="">Select stage</option>
                            <option value="vision">Vision Stage</option>
                            <option value="startup">Startup Stage</option>
                            <option value="growth">Growth Stage</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Primary Goals (What do you want to achieve?)
                        </label>
                        <textarea
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            className="form-input h-24"
                            placeholder="e.g., Increase revenue by 50%, Launch new product line, Build email list to 10,000 subscribers"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Target Audience
                        </label>
                        <input
                            type="text"
                            value={formData.target_audience}
                            onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                            className="form-input"
                            placeholder="Who are your ideal customers?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Current Challenges
                        </label>
                        <textarea
                            value={formData.current_challenges}
                            onChange={(e) => setFormData({ ...formData, current_challenges: e.target.value })}
                            className="form-input h-24"
                            placeholder="What obstacles are you currently facing?"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            onClick={() => onClose()}
                            variant="outline"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleGenerate}
                            disabled={loading || !formData.goals}
                            className={`flex-1 bg-gradient-to-r ${config.color} text-white`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Generate Strategy
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}