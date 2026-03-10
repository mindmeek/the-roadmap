import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Save, Target, Loader2, CheckCircle, Lightbulb, Plus, Minus, Sparkles } from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import ValuePropositionOverview from '@/components/strategy/ValuePropositionOverview';

const canvasSides = [
    {
        id: 'customer_profile',
        title: 'Customer Profile',
        color: 'border-blue-300 bg-blue-50 dark:bg-blue-900/20',
        sections: [
            {
                id: 'customer_jobs',
                title: 'Customer Jobs',
                subtitle: 'What jobs is your customer trying to get done?',
                placeholder: 'Functional, emotional, and social jobs',
                items: ['']
            },
            {
                id: 'pains',
                title: 'Pains',
                subtitle: 'What pains does your customer experience?',
                placeholder: 'Obstacles, challenges, and frustrations',
                items: ['']
            },
            {
                id: 'gains',
                title: 'Gains',
                subtitle: 'What gains does your customer expect?',
                placeholder: 'Benefits, outcomes, and desires',
                items: ['']
            }
        ]
    },
    {
        id: 'value_map',
        title: 'Value Map',
        color: 'border-orange-300 bg-orange-50 dark:bg-orange-900/20',
        sections: [
            {
                id: 'products_services',
                title: 'Products & Services',
                subtitle: 'What products and services do you offer?',
                placeholder: 'Your solution offerings',
                items: ['']
            },
            {
                id: 'pain_relievers',
                title: 'Pain Relievers',
                subtitle: 'How do you relieve customer pains?',
                placeholder: 'How your solution addresses pains',
                items: ['']
            },
            {
                id: 'gain_creators',
                title: 'Gain Creators',
                subtitle: 'How do you create customer gains?',
                placeholder: 'How your solution creates benefits',
                items: ['']
            }
        ]
    }
];

export default function ValuePropositionCanvasPage() { // Renamed from StrategyFormValueProposition to keep original name
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [document, setDocument] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit'); // 'edit' | 'overview'

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({
                created_by: userData.email,
                document_type: 'value_proposition_canvas'
            }, '-updated_date', 1);

            if (docs.length > 0) {
                const doc = docs[0];
                setDocument(doc);
                setFormData(doc.content || {});
            } else {
                const emptyForm = {};
                canvasSides.forEach(side => {
                    side.sections.forEach(section => {
                        emptyForm[section.id] = [''];
                    });
                });
                setFormData(emptyForm);
            }
        } catch (error) {
            console.error("Error loading value proposition data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemChange = (sectionId, index, value) => {
        setFormData(prev => ({
            ...prev,
            [sectionId]: prev[sectionId].map((item, i) => 
                i === index ? value : item
            )
        }));
    };

    const addItem = (sectionId) => {
        setFormData(prev => ({
            ...prev,
            [sectionId]: [...(prev[sectionId] || ['']), '']
        }));
    };

    const removeItem = (sectionId, index) => {
        setFormData(prev => ({
            ...prev,
            [sectionId]: prev[sectionId].filter((_, i) => i !== index)
        }));
    };

    const getStageGuidance = (sectionId, stage) => {
        const guidance = {
            vision: {
                customer_jobs: "Focus on the core jobs your target customers are trying to accomplish.",
                pains: "Identify the main frustrations and obstacles your customers currently face.",
                gains: "Define the outcomes and benefits customers hope to achieve.",
                products_services: "List your proposed solution and key features.",
                pain_relievers: "Explain how your solution will eliminate or reduce customer pains.",
                gain_creators: "Describe how your solution will deliver the gains customers want."
            },
            startup: {
                customer_jobs: "Refine based on actual customer feedback and observed behaviors.",
                pains: "Prioritize the pains that customers mention most frequently.",
                gains: "Focus on the gains that drive customers to choose your solution.",
                products_services: "Optimize your core offerings based on what customers actually use.",
                pain_relievers: "Validate which pain relievers resonate most with customers.",
                gain_creators: "Double down on the gain creators that provide the most value."
            },
            growth: {
                customer_jobs: "Expand to address additional jobs for existing customers or new segments.",
                pains: "Identify pains in adjacent markets or advanced customer needs.",
                gains: "Explore premium gains for power users or enterprise customers.",
                products_services: "Develop additional products/services to serve the full customer journey.",
                pain_relievers: "Create advanced solutions for complex customer challenges.",
                gain_creators: "Build gain creators that provide competitive differentiation."
            }
        };
        
        return guidance[stage]?.[sectionId] || "Consider how this applies to your value proposition at your current stage.";
    };

    const saveDraft = async () => {
        setSaving(true);
        try {
            const documentData = {
                document_type: 'value_proposition_canvas',
                title: 'Value Proposition Canvas', // Keep original title for draft
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: false, // Always false for draft
                last_updated: new Date().toISOString()
            };

            if (document) {
                await StrategyDocument.update(document.id, documentData);
            } else {
                const newDoc = await StrategyDocument.create(documentData);
                setDocument(newDoc);
            }
            // No navigation on draft save
        } catch (error) {
            console.error("Error saving draft:", error);
            alert('Failed to save draft. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const saveAndComplete = async () => {
        setSaving(true);
        try {
            const docData = {
                document_type: 'value_proposition_canvas',
                title: 'My Unique Value Proposition Canvas', // Updated title as per outline
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: true, // Mark as complete
                last_updated: new Date().toISOString()
            };

            if (document) { // 'document' state acts as 'existingDoc'
                await StrategyDocument.update(document.id, docData);
            } else {
                const newDoc = await StrategyDocument.create(docData);
                setDocument(newDoc);
            }

            alert('Unique Value Proposition Canvas saved successfully!'); // New alert as per outline
            navigate(createPageUrl('MyFoundationRoadmap')); // Updated navigation target as per outline
        } catch (error) {
            console.error('Error saving and completing:', error);
            alert('Failed to save and complete. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
                <p className="ml-4 text-[var(--text-soft)]">Loading Value Proposition Canvas...</p>
            </div>
        );
    }

    const getTotalItems = () => {
        return canvasSides.reduce((total, side) => {
            return total + side.sections.reduce((sideTotal, section) => {
                const items = formData[section.id] || [''];
                return sideTotal + items.filter(item => item.trim()).length;
            }, 0);
        }, 0);
    };

    const totalItems = getTotalItems();

    const userNotesForAI = Object.entries(formData).flatMap(([sectionId, items]) => {
        const sectionTitle = canvasSides.flatMap(side => side.sections).find(s => s.id === sectionId)?.title || sectionId.replace(/_/g, ' ');
        const validItems = Array.isArray(items) ? items.filter(item => item.trim() !== '') : [];
        if (validItems.length === 0) {
            return [];
        }
        return validItems.map(item => ({
            content: `${sectionTitle}: ${item}`
        }));
    });

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* View Toggle */}
            <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                    <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                </div>
            </div>

            {viewMode === 'overview' ? (
                <ValuePropositionOverview formData={formData} />
            ) : (<>

            {/* Detailed Introduction Section */}
            <div className="card p-6 md:p-8">
                <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full mb-6">
                    <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                        <Target className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl mb-2">Value Proposition Canvas</h1>
                        <p className="text-[var(--primary-gold)] font-semibold">Foundation Tool #2</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Your Value Proposition: The Bridge Between Problems and Solutions</h3>
                    <p className="text-[var(--text-main)] leading-relaxed mb-4">
                        Your Value Proposition Canvas is where the magic happens—it's the precise moment where your ideal client's deepest needs meet your unique solution. This isn't just about what you offer; it's about creating an irresistible match between what your clients desperately want and what you're uniquely positioned to deliver. When done correctly, your value proposition becomes so compelling that clients feel like you're reading their minds.
                    </p>
                    <p className="text-[var(--text-main)] leading-relaxed mb-4">
                        This tool transforms your business from a "nice-to-have" into a "must-have" by ensuring perfect alignment between customer jobs, pains, and gains with your products, pain relievers, and gain creators. It's the difference between struggling to explain why someone should choose you and having clients say "This is exactly what I've been looking for!" The Value Proposition Canvas eliminates the guesswork and creates magnetic attraction between you and your ideal clients.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-green-200 dark:border-green-600">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">How This Streamlines Your Vision:</h4>
                            <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                <li>• Creates product-market fit from day one</li>
                                <li>• Generates compelling sales messages that resonate</li>
                                <li>• Identifies the most valuable features to develop</li>
                                <li>• Positions you as the obvious choice in your market</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-green-200 dark:border-green-600">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">Business Impact:</h4>
                            <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                <li>• Higher conversion rates from aligned messaging</li>
                                <li>• Reduced time-to-market with focused development</li>
                                <li>• Premium pricing justified by clear value delivery</li>
                                <li>• Stronger customer relationships built on understanding</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pro Tip: Focus on Outcomes, Not Features</h4>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                Your clients don't buy features—they buy better versions of themselves. Instead of listing what your product does, focus on the transformation it creates. How will their life or business be different after using your solution? That's your true value proposition.
                            </p>
                        </div>
                    </div>
                </div>

                {/* AI Help Banner */}
                <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-l-4 border-pink-500 rounded">
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">🎯</span>
                        <div className="flex-1">
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-1">
                                Get Help from Ava & Charlie!
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                Ava can help you define your value proposition strategy, and Charlie can help you write compelling copy for each section.
                            </p>
                            <button
                                onClick={() => setShowAIAssistant(true)}
                                className="btn btn-sm bg-gradient-to-r from-pink-500 to-rose-600 text-white"
                            >
                                <Sparkles className="w-3 h-3 mr-2" />
                                Ask for AI Help
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="card p-4 md:p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(createPageUrl('MyFoundationRoadmap'))}
                            className="btn btn-ghost p-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                                <Target className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">Value Proposition Canvas</h1>
                                <p className="text-sm text-[var(--text-soft)]">
                                    {totalItems} elements mapped
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={saveDraft} // Call the new saveDraft function
                            disabled={saving}
                            className="btn btn-secondary"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button 
                            onClick={saveAndComplete} // Call the new saveAndComplete function
                            disabled={saving}
                            className="btn btn-primary"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Complete & Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Canvas Grid - Mobile: Stack, Desktop: Side by Side */}
            <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {canvasSides.map((side) => (
                    <div key={side.id} className={`border-2 rounded-lg p-6 ${side.color}`}>
                        <h2 className="text-xl font-bold text-center mb-6 text-[var(--text-main)]">
                            {side.title}
                        </h2>
                        
                        <div className="space-y-6">
                            {side.sections.map((section) => (
                                <div key={section.id} className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="font-bold text-[var(--text-main)]">{section.title}</h3>
                                            <p className="text-xs text-[var(--text-soft)]">{section.subtitle}</p>
                                        </div>
                                        <button
                                            onClick={() => addItem(section.id)}
                                            className="btn btn-ghost p-2 text-gray-600 hover:text-gray-800"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {(formData[section.id] || ['']).map((item, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handleItemChange(section.id, index, e.target.value)}
                                                    placeholder={section.placeholder}
                                                    className="form-input flex-1 text-sm"
                                                />
                                                {(formData[section.id] || []).length > 1 && (
                                                    <button
                                                        onClick={() => removeItem(section.id, index)}
                                                        className="btn btn-ghost p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stage-specific guidance */}
                                    <div className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-600 rounded-md p-2 mt-3">
                                        <div className="flex items-start gap-2">
                                            <Lightbulb className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-gray-700 dark:text-gray-300">
                                                {getStageGuidance(section.id, user?.entrepreneurship_stage || 'vision')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fit Analysis */}
            <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-3">Value Proposition Fit Analysis</h3>
                <p className="text-sm text-[var(--text-soft)] mb-4">
                    Once you've filled out both sides, analyze the fit between your customer profile and value map:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Jobs Fit</h4>
                        <p className="text-green-700 dark:text-green-300">Do your products/services address the customer jobs?</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Pain Fit</h4>
                        <p className="text-green-700 dark:text-green-300">Do your pain relievers address the most important pains?</p>
                    </div>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Gain Fit</h4>
                        <p className="text-green-700 dark:text-green-300">Do your gain creators deliver the gains customers want?</p>
                    </div>
                </div>
            </div>

            {/* Save Actions (Mobile) */}
            <div className="md:hidden fixed bottom-20 left-0 right-0 p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 max-w-sm mx-auto">
                    <button 
                        onClick={saveDraft} // Call the new saveDraft function
                        disabled={saving}
                        className="btn btn-secondary flex-1"
                    >
                        Save Draft
                    </button>
                    <button 
                        onClick={saveAndComplete} // Call the new saveAndComplete function
                        disabled={saving}
                        className="btn btn-primary flex-1"
                    >
                        Complete
                    </button>
                </div>
            </div>

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="strategy_form_agent"
                sectionTitle="Value Proposition Canvas"
                additionalContext={`Document Type: value_proposition_canvas\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Fields: customer_jobs, customer_pains, customer_gains, offerings, pain_relievers, gain_creators`}
                currentBusinessId={user?.current_business_id}
                userNotes={userNotesForAI}
            />
        </>)}
        </div>
    );
}