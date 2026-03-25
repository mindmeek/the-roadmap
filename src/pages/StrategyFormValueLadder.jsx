import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStrategyDoc } from '@/hooks/useStrategyDoc';
import { createPageUrl } from '@/utils';
import { 
    TrendingUp, Save, Loader2, CheckCircle, ArrowLeft, 
    DollarSign, Users, Target, Sparkles, HelpCircle, Plus, Trash2
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import ValueLadderOverview from '@/components/strategy/ValueLadderOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';

export default function StrategyFormValueLadder() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [activeTab, setActiveTab] = useState('form');

    const [formData, setFormData] = useState({
        ladder_levels: [
            { 
                level: 'Free/Entry',
                offer_name: '',
                description: '',
                price: '$0',
                target_audience: '',
                purpose: 'Attract and build trust',
                example: ''
            },
            { 
                level: 'Low-Ticket',
                offer_name: '',
                description: '',
                price: '',
                target_audience: '',
                purpose: 'Convert interest into customers',
                example: ''
            },
            { 
                level: 'Mid-Ticket',
                offer_name: '',
                description: '',
                price: '',
                target_audience: '',
                purpose: 'Deliver significant value and ROI',
                example: ''
            },
            { 
                level: 'High-Ticket',
                offer_name: '',
                description: '',
                price: '',
                target_audience: '',
                purpose: 'Premium transformation and results',
                example: ''
            },
            { 
                level: 'Continuity/Recurring',
                offer_name: '',
                description: '',
                price: '',
                target_audience: '',
                purpose: 'Ongoing value and retention',
                example: ''
            }
        ],
        upsell_strategy: '',
        cross_sell_opportunities: '',
        retention_plan: ''
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
                document_type: 'value_ladder'
            });

            if (docs && docs.length > 0) {
                const doc = docs[0];
                setFormData(doc.content);
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
                document_type: 'value_ladder'
            });

            const docData = {
                document_type: 'value_ladder',
                title: 'My Value Ladder',
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

    const updateLevel = (index, field, value) => {
        const newLevels = [...formData.ladder_levels];
        newLevels[index] = { ...newLevels[index], [field]: value };
        setFormData({ ...formData, ladder_levels: newLevels });
    };

    const addCustomLevel = () => {
        const newLevels = [...formData.ladder_levels, {
            level: 'Custom Level',
            offer_name: '',
            description: '',
            price: '',
            target_audience: '',
            purpose: '',
            example: ''
        }];
        setFormData({ ...formData, ladder_levels: newLevels });
    };

    const removeLevel = (index) => {
        const newLevels = formData.ladder_levels.filter((_, i) => i !== index);
        setFormData({ ...formData, ladder_levels: newLevels });
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
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Value Ladder</h1>
                            <p className="text-[var(--text-soft)]">Structure your offerings from entry to premium</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                    <button
                        onClick={() => setActiveTab('form')}
                        className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'form' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)]' : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'}`}
                    >
                        Edit Form
                    </button>
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)]' : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'}`}
                    >
                        View Ladder
                    </button>
                </div>

                {activeTab === 'overview' && <ValueLadderOverview formData={formData} />}

                {activeTab === 'form' && <>
                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">What is a Value Ladder?</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                A value ladder is a strategic framework that maps out different product/service offerings at increasing price points. 
                                It helps you maximize customer lifetime value by providing a clear path for customers to invest more as they receive more value.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Why it matters:</strong> Most businesses lose money acquiring customers. A well-designed value ladder ensures 
                                you can profitably acquire customers at the entry level and increase revenue as you deliver more value over time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Value Ladder Levels */}
                <div className="space-y-6">
                    {formData.ladder_levels.map((level, index) => (
                        <div key={index} className="card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={level.level}
                                            onChange={(e) => updateLevel(index, 'level', e.target.value)}
                                            className="form-input font-bold text-lg"
                                            placeholder="Level Name"
                                        />
                                        <p className="text-xs text-[var(--text-soft)] mt-1">{level.purpose}</p>
                                    </div>
                                </div>
                                {formData.ladder_levels.length > 1 && (
                                    <button
                                        onClick={() => removeLevel(index)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        <Target className="w-4 h-4 inline mr-2" />
                                        Offer Name
                                    </label>
                                    <input
                                        type="text"
                                        value={level.offer_name}
                                        onChange={(e) => updateLevel(index, 'offer_name', e.target.value)}
                                        className="form-input"
                                        placeholder="e.g., Free Guide, Online Course, VIP Coaching"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-2" />
                                        Price Point
                                    </label>
                                    <input
                                        type="text"
                                        value={level.price}
                                        onChange={(e) => updateLevel(index, 'price', e.target.value)}
                                        className="form-input"
                                        placeholder="e.g., $0, $97, $997, $5,000+"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={level.description}
                                        onChange={(e) => updateLevel(index, 'description', e.target.value)}
                                        className="form-input"
                                        rows="3"
                                        placeholder="What does this offer include? What transformation or result does it deliver?"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        <Users className="w-4 h-4 inline mr-2" />
                                        Target Audience
                                    </label>
                                    <input
                                        type="text"
                                        value={level.target_audience}
                                        onChange={(e) => updateLevel(index, 'target_audience', e.target.value)}
                                        className="form-input"
                                        placeholder="Who is this level designed for?"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Example
                                    </label>
                                    <input
                                        type="text"
                                        value={level.example}
                                        onChange={(e) => updateLevel(index, 'example', e.target.value)}
                                        className="form-input"
                                        placeholder="Real-world example (optional)"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addCustomLevel}
                        className="w-full card p-4 hover:shadow-md transition-all border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 text-[var(--text-soft)] hover:text-[var(--primary-gold)]"
                    >
                        <Plus className="w-5 h-5" />
                        Add Custom Level
                    </button>
                </div>

                {/* Strategy Sections */}
                <div className="space-y-6 mt-6">
                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">
                            Upsell Strategy
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] mb-3">
                            How will you move customers from one level to the next? What triggers or opportunities will you create?
                        </p>
                        <textarea
                            value={formData.upsell_strategy}
                            onChange={(e) => setFormData({ ...formData, upsell_strategy: e.target.value })}
                            className="form-input"
                            rows="4"
                            placeholder="Example: After completing the free course, students receive an email with a limited-time discount on the full program..."
                        />
                    </div>

                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">
                            Cross-Sell Opportunities
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] mb-3">
                            What complementary products or services can you offer at each level?
                        </p>
                        <textarea
                            value={formData.cross_sell_opportunities}
                            onChange={(e) => setFormData({ ...formData, cross_sell_opportunities: e.target.value })}
                            className="form-input"
                            rows="4"
                            placeholder="Example: At the mid-ticket level, offer a templates bundle or implementation toolkit..."
                        />
                    </div>

                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">
                            Retention Plan
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] mb-3">
                            How will you keep customers engaged and prevent them from churning?
                        </p>
                        <textarea
                            value={formData.retention_plan}
                            onChange={(e) => setFormData({ ...formData, retention_plan: e.target.value })}
                            className="form-input"
                            rows="4"
                            placeholder="Example: Monthly check-ins, exclusive community access, ongoing training updates..."
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 sticky bottom-20 md:bottom-6 z-10">
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
                                Save Value Ladder
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
                </>}
            </div>

            <FoundationFormNav currentFormId="value_ladder" />

            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="finley"
                sectionTitle="Value Ladder Strategy"
            />
        </div>
    );
}