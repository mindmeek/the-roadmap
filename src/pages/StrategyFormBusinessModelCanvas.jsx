import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Save, ArrowLeft, CheckCircle, Lightbulb, HelpCircle, Sparkles, Users, Activity, Star, Heart, Target, Box, Send, DollarSign, TrendingUp, Plus, Trash2 } from 'lucide-react';
import StrategyToolGuide from '../components/strategy/StrategyToolGuide';
import AITeamModal from '@/components/ai/AITeamModal';
import BusinessPlanOverview from '@/components/strategy/BusinessPlanOverview';

// Helper: normalize a field value to array (handles old string data)
function toArray(val) {
    if (Array.isArray(val)) return val.length > 0 ? val : [''];
    if (typeof val === 'string' && val.trim()) return val.split('\n').filter(Boolean);
    return [''];
}

// Reusable list field component
function ListField({ values, onChange, placeholder }) {
    const update = (idx, val) => {
        const next = [...values];
        next[idx] = val;
        onChange(next);
    };
    const add = () => onChange([...values, '']);
    const remove = (idx) => {
        const next = values.filter((_, i) => i !== idx);
        onChange(next.length > 0 ? next : ['']);
    };
    return (
        <div className="space-y-2">
            {values.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={val}
                        onChange={(e) => update(idx, e.target.value)}
                        placeholder={placeholder}
                        className="form-input flex-1"
                    />
                    {values.length > 1 && (
                        <button onClick={() => remove(idx)} className="text-red-400 hover:text-red-600 p-1 flex-shrink-0">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            ))}
            <button
                onClick={add}
                className="flex items-center gap-1 text-sm text-[var(--primary-gold)] hover:opacity-80 transition-opacity mt-1"
            >
                <Plus className="w-4 h-4" />
                Add another
            </button>
        </div>
    );
}

export default function StrategyFormBusinessModelCanvas() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [existingDoc, setExistingDoc] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    // Form state - each field is an array of strings
    const [formData, setFormData] = useState({
        keyPartners: [''],
        keyActivities: [''],
        keyResources: [''],
        valuePropositions: [''],
        customerRelationships: [''],
        channels: [''],
        customerSegments: [''],
        costStructure: [''],
        revenueStreams: ['']
    });

    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAiContext] = useState({});
    const [activeTab, setActiveTab] = useState('form');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({ 
                created_by: userData.email,
                document_type: 'business_model_canvas'
            });

            if (docs.length > 0) {
                setExistingDoc(docs[0]);
                const saved = docs[0].content || {};
                // Normalize all fields to arrays (handles old string-based data)
                setFormData({
                    keyPartners: toArray(saved.keyPartners),
                    keyActivities: toArray(saved.keyActivities),
                    keyResources: toArray(saved.keyResources),
                    valuePropositions: toArray(saved.valuePropositions),
                    customerRelationships: toArray(saved.customerRelationships),
                    channels: toArray(saved.channels),
                    customerSegments: toArray(saved.customerSegments),
                    costStructure: toArray(saved.costStructure),
                    revenueStreams: toArray(saved.revenueStreams),
                });
            }
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            const docData = {
                document_type: 'business_model_canvas',
                title: 'One Page Business Plan',
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: true,
                last_updated: new Date().toISOString()
            };

            if (existingDoc) {
                await StrategyDocument.update(existingDoc.id, docData);
            } else {
                const newDoc = await StrategyDocument.create(docData);
                setExistingDoc(newDoc);
            }

            setSaveMessage('✓ One Page Business Plan saved successfully!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            console.error("Error saving:", error);
            setSaveMessage('Error saving. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const openAIHelp = (sectionKey) => {
        // Map sectionKey to a more readable title for the AI assistant
        const sectionTitles = {
            keyPartners: "Key Partners",
            keyActivities: "Key Activities",
            keyResources: "Key Resources",
            valuePropositions: "Value Propositions",
            customerRelationships: "Customer Relationships",
            channels: "Channels",
            customerSegments: "Customer Segments",
            costStructure: "Cost Structure",
            revenueStreams: "Revenue Streams"
        };

        setAiContext({
            sectionTitle: `Business Model Canvas - ${sectionTitles[sectionKey] || sectionKey}`,
            userNotes: formData[sectionKey]?.filter(Boolean).length ? [{ content: formData[sectionKey].filter(Boolean).join('\n') }] : []
        });
        setShowAIAssistant(true);
    };

    const guideContent = {
        title: "One Page Business Plan Guide",
        description: "Map out all the essential components of your business on a single page. This visual tool helps you see how different aspects of your business work together.",
        sections: [
            {
                title: "What is the One Page Business Plan?",
                content: "The One Page Business Plan (based on the Business Model Canvas framework) is a strategic management tool that allows you to describe, design, challenge, and pivot your business model. It's a single-page visual chart with nine essential building blocks that, together, describe how your business creates, delivers, and captures value."
            },
            {
                title: "The 9 Building Blocks",
                subsections: [
                    {
                        subtitle: "1. Customer Segments",
                        content: "Who are you creating value for? Define your target customers and their characteristics. Be specific about demographics, behaviors, and needs."
                    },
                    {
                        subtitle: "2. Value Propositions",
                        content: "What value do you deliver to customers? What problems are you solving? What needs are you satisfying? This is your unique selling proposition."
                    },
                    {
                        subtitle: "3. Channels",
                        content: "How do you reach your customers? Through what channels do they want to be reached? Include awareness, evaluation, purchase, delivery, and after-sales channels."
                    },
                    {
                        subtitle: "4. Customer Relationships",
                        content: "What type of relationship does each customer segment expect? How do you acquire, retain, and grow customers? Personal assistance, self-service, automated, communities?"
                    },
                    {
                        subtitle: "5. Revenue Streams",
                        content: "For what value are customers willing to pay? How are they paying now? How would they prefer to pay? What does each revenue stream contribute to overall revenues?"
                    },
                    {
                        subtitle: "6. Key Resources",
                        content: "What key resources do your value propositions require? Consider physical, intellectual, human, and financial resources essential to your business model."
                    },
                    {
                        subtitle: "7. Key Activities",
                        content: "What key activities do your value propositions require? What are the most important things your company must do to make the business model work?"
                    },
                    {
                        subtitle: "8. Key Partnerships",
                        content: "Who are your key partners and suppliers? What key resources are you acquiring from them? What key activities do partners perform? Why partner instead of doing it yourself?"
                    },
                    {
                        subtitle: "9. Cost Structure",
                        content: "What are the most important costs in your business model? Which key resources and activities are most expensive? Is your business cost-driven or value-driven?"
                    }
                ]
            },
            {
                title: "How to Use This Tool",
                content: "Start by filling out each section, but don't worry about perfection. The power of this tool is in iterating and refining. As you learn more about your customers and test your assumptions, you'll update sections. Many successful businesses go through dozens of iterations before finding the right model."
            },
            {
                title: "Pro Tips",
                bullets: [
                    "Use sticky notes or a whiteboard first - it's easier to move things around",
                    "Start with Customer Segments and Value Propositions - these are the heart of your business",
                    "Be specific and concrete - avoid vague statements",
                    "Test your assumptions with real customers before committing resources",
                    "Review and update your plan quarterly as you learn and grow",
                    "Share it with advisors and mentors for feedback"
                ]
            }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="card p-6 mb-6">
                <button
                    onClick={() => navigate(createPageUrl('MyFoundationRoadmap'))}
                    className="btn btn-ghost mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Foundation Roadmap
                </button>
                
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">One Page Business Plan</h1>
                        <p className="text-[var(--text-soft)]">
                            Map out the nine essential building blocks of your business model on a single, strategic page.
                        </p>
                    </div>
                    <StrategyToolGuide content={guideContent} />
                </div>

                {saveMessage && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {saveMessage}
                    </div>
                )}
                
                {/* AI Help Banner */}
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                    <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-1">
                                Need Help? Ask Elyzet!
                            </p>
                            <p className="text-xs text-[var(--text-soft)]">
                                Click the ✨ icon next to any section to get AI-powered guidance from your Chief Strategist.
                            </p>
                        </div>
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
                    View Plan
                </button>
            </div>

            {activeTab === 'overview' && <BusinessPlanOverview formData={formData} />}

            {activeTab === 'form' && <>
            {/* Instructions Card */}
            <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 mb-6">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-[var(--primary-gold)] flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">How to Complete Your One Page Business Plan</h3>
                        <p className="text-sm text-[var(--text-soft)] mb-3">
                            Fill out each of the 9 building blocks below. Don't overthink it - start with what you know and refine as you learn. This is a living document that will evolve with your business.
                        </p>
                        <ul className="text-sm text-[var(--text-soft)] space-y-1 ml-4">
                            <li className="flex items-start">
                                <span className="text-[var(--primary-gold)] mr-2">•</span>
                                <span>Be specific and concrete - avoid vague statements</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[var(--primary-gold)] mr-2">•</span>
                                <span>Start with Customer Segments and Value Propositions first</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-[var(--primary-gold)] mr-2">•</span>
                                <span>Save frequently as you work through each section</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* The 9 Building Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Key Partners */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                Key Partners
                            </h3>
                            <button
                                onClick={() => openAIHelp('keyPartners')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                Who are your key partners and suppliers? What key resources are you acquiring from them?
                            </div>
                        </div>
                        <ListField
                            values={formData.keyPartners}
                            onChange={(val) => setFormData({...formData, keyPartners: val})}
                            placeholder="e.g., Strategic supplier, partner, alliance..."
                        />
                    </div>

                    {/* Key Activities */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-600" />
                                Key Activities
                            </h3>
                            <button
                                onClick={() => openAIHelp('keyActivities')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                What are the most important things your company must do to make the business model work?
                            </div>
                        </div>
                        <ListField
                            values={formData.keyActivities}
                            onChange={(val) => setFormData({...formData, keyActivities: val})}
                            placeholder="e.g., Production, problem solving, platform..."
                        />
                    </div>

                    {/* Key Resources */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Box className="w-5 h-5 text-orange-600" />
                                Key Resources
                            </h3>
                            <button
                                onClick={() => openAIHelp('keyResources')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                What key resources do your value propositions require? Physical, intellectual, human, or financial assets.
                            </div>
                        </div>
                        <ListField
                            values={formData.keyResources}
                            onChange={(val) => setFormData({...formData, keyResources: val})}
                            placeholder="e.g., Physical asset, IP, human resource..."
                        />
                    </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-6">
                    {/* Value Propositions */}
                    <div className="card p-6 border-2 border-[var(--primary-gold)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-600" />
                                Value Propositions
                            </h3>
                            <button
                                onClick={() => openAIHelp('valuePropositions')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-[var(--primary-gold)] mb-3">Core of your business</p>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                What value do you deliver to customers? What problems are you solving?
                            </div>
                        </div>
                        <ListField
                            values={formData.valuePropositions}
                            onChange={(val) => setFormData({...formData, valuePropositions: val})}
                            placeholder="e.g., Cost reduction, convenience, performance..."
                        />
                    </div>

                    {/* Customer Relationships */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-600" />
                                Customer Relationships
                            </h3>
                            <button
                                onClick={() => openAIHelp('customerRelationships')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                What type of relationship does each customer segment expect? How do you acquire, retain, and grow customers?
                            </div>
                        </div>
                        <ListField
                            values={formData.customerRelationships}
                            onChange={(val) => setFormData({...formData, customerRelationships: val})}
                            placeholder="e.g., Personal assistance, self-service, community..."
                        />
                    </div>

                    {/* Channels */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Send className="w-5 h-5 text-teal-600" />
                                Channels
                            </h3>
                            <button
                                onClick={() => openAIHelp('channels')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                How do you reach your customers? Through what channels do they want to be reached?
                            </div>
                        </div>
                        <ListField
                            values={formData.channels}
                            onChange={(val) => setFormData({...formData, channels: val})}
                            placeholder="e.g., Website, social media, direct sales..."
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Customer Segments */}
                    <div className="card p-6 border-2 border-[var(--primary-gold)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Target className="w-5 h-5 text-purple-600" />
                                Customer Segments
                            </h3>
                            <button
                                onClick={() => openAIHelp('customerSegments')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-[var(--primary-gold)] mb-3">Core of your business</p>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                Who are you creating value for? Define your target customers and their characteristics.
                            </div>
                        </div>
                        <ListField
                            values={formData.customerSegments}
                            onChange={(val) => setFormData({...formData, customerSegments: val})}
                            placeholder="e.g., Small business owners, freelancers..."
                        />
                    </div>

                    {/* Revenue Streams */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                Revenue Streams
                            </h3>
                            <button
                                onClick={() => openAIHelp('revenueStreams')}
                                className="text-purple-600 hover:text-purple-700 transition-colors"
                                title="Get AI Help"
                            >
                                <Sparkles className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                            <div className="text-sm text-[var(--text-soft)]">
                                For what value are customers willing to pay? How are they paying? One-time, subscription, usage-based?
                            </div>
                        </div>
                        <ListField
                            values={formData.revenueStreams}
                            onChange={(val) => setFormData({...formData, revenueStreams: val})}
                            placeholder="e.g., Subscription fee, one-time sale, licensing..."
                        />
                    </div>
                </div>
            </div>

            {/* Cost Structure - Full Width at Bottom */}
            <div className="card p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-red-600" />
                        Cost Structure
                    </h3>
                    <button
                        onClick={() => openAIHelp('costStructure')}
                        className="text-purple-600 hover:text-purple-700 transition-colors"
                        title="Get AI Help"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="text-sm text-[var(--text-soft)]">
                        What are the most important costs in your business model? Which key resources and activities are most expensive?
                    </div>
                </div>
                <ListField
                    values={formData.costStructure}
                    onChange={(val) => setFormData({...formData, costStructure: val})}
                    placeholder="e.g., Salaries, hosting, marketing, office rent..."
                />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={() => navigate(createPageUrl('MyFoundationRoadmap'))}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn btn-primary"
                >
                    {isSaving ? (
                        <>Saving...</>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save One Page Business Plan
                        </>
                    )}
                </button>
            </div>

            </>}

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="elyzet"
                sectionTitle={aiContext.sectionTitle}
                userNotes={aiContext.userNotes || []}
            />
        </div>
    );
}