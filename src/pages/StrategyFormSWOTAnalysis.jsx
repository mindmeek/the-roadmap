import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    ArrowLeft, Save, TrendingUp, Loader2, CheckCircle, Lightbulb, Plus, Minus,
    Sparkles, AlertTriangle, Zap, Shield 
} from 'lucide-react';
import { handleGamification } from '@/functions/handleGamification';
import AITeamModal from '@/components/ai/AITeamModal';
import SWOTAnalysisOverview from '@/components/strategy/SWOTAnalysisOverview';

const swotQuadrants = [
    {
        id: 'strengths',
        title: 'Strengths',
        subtitle: 'Internal positive factors',
        color: 'border-green-300 bg-green-50 dark:bg-green-900/20',
        headerColor: 'text-green-800 dark:text-green-200',
        placeholder: 'What advantages do you have? What do you do better than others?',
        icon: TrendingUp, // Added icon
        gradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' // Added gradient
    },
    {
        id: 'weaknesses', 
        title: 'Weaknesses',
        subtitle: 'Internal negative factors',
        color: 'border-red-300 bg-red-50 dark:bg-red-900/20',
        headerColor: 'text-red-800 dark:text-red-200',
        placeholder: 'What could you improve? What do others do better than you?',
        icon: AlertTriangle, // Added icon
        gradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20' // Added gradient
    },
    {
        id: 'opportunities',
        title: 'Opportunities', 
        subtitle: 'External positive factors',
        color: 'border-blue-300 bg-blue-50 dark:bg-blue-900/20',
        headerColor: 'text-blue-800 dark:text-blue-200',
        placeholder: 'What trends could you take advantage of? How can you turn strengths into opportunities?',
        icon: Zap, // Added icon
        gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' // Added gradient
    },
    {
        id: 'threats',
        title: 'Threats',
        subtitle: 'External negative factors', 
        color: 'border-orange-300 bg-orange-50 dark:bg-orange-900/20',
        headerColor: 'text-orange-800 dark:text-orange-200',
        placeholder: 'What trends could harm you? What threats do your weaknesses expose you to?',
        icon: Shield, // Added icon
        gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20' // Added gradient
    }
];

export default function StrategyFormSWOTAnalysis() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [document, setDocument] = useState(null); // Corresponds to existingDoc in the outline
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAiContext] = useState({});
    const [viewMode, setViewMode] = useState('edit');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            // Try to load existing document
            const docs = await StrategyDocument.filter({
                created_by: userData.email,
                document_type: 'swot_analysis'
            }, '-updated_date', 1);

            if (docs.length > 0) {
                const doc = docs[0];
                setDocument(doc);
                setFormData(doc.content || {});
            } else {
                // Initialize empty form
                const emptyForm = {};
                swotQuadrants.forEach(quad => {
                    emptyForm[quad.id] = [''];
                });
                setFormData(emptyForm);
            }
        } catch (error) {
            console.error("Error loading SWOT data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemChange = (quadrantId, index, value) => {
        setFormData(prev => ({
            ...prev,
            [quadrantId]: prev[quadrantId].map((item, i) => 
                i === index ? value : item
            )
        }));
    };

    const addItem = (quadrantId) => {
        setFormData(prev => ({
            ...prev,
            [quadrantId]: [...(prev[quadrantId] || ['']), '']
        }));
    };

    const removeItem = (quadrantId, index) => {
        setFormData(prev => ({
            ...prev,
            [quadrantId]: prev[quadrantId].filter((_, i) => i !== index)
        }));
    };

    const getStageGuidance = (quadrantId, stage) => {
        const guidance = {
            vision: {
                strengths: "Consider your skills, knowledge, network, and unique insights about the market.",
                weaknesses: "Think about gaps in skills, resources, market knowledge, or experience you currently have.",
                opportunities: "Look for market gaps, trends, technological changes, or unmet customer needs.",
                threats: "Consider competition, market risks, economic factors, or regulatory changes."
            },
            startup: {
                strengths: "Focus on your validated advantages, early traction, team capabilities, and market position.",
                weaknesses: "Identify operational challenges, resource constraints, or areas where competitors excel.",
                opportunities: "Explore market expansion, partnerships, product development, or funding opportunities.", 
                threats: "Consider competitive pressure, market changes, funding challenges, or scaling obstacles."
            },
            growth: {
                strengths: "Leverage your market position, brand recognition, operational efficiency, and team expertise.",
                weaknesses: "Address scaling challenges, process inefficiencies, or competitive disadvantages.",
                opportunities: "Look at new markets, acquisitions, strategic partnerships, or product line extensions.",
                threats: "Watch for market disruption, competitive moves, regulatory changes, or economic shifts."
            }
        };
        
        return guidance[stage]?.[quadrantId] || "Consider factors relevant to your current business stage.";
    };

    const openAIHelp = (sectionName) => {
        const sectionLabels = {
            strengths: 'Strengths',
            weaknesses: 'Weaknesses',
            opportunities: 'Opportunities',
            threats: 'Threats'
        };
        
        setAiContext({
            sectionTitle: `SWOT Analysis - ${sectionLabels[sectionName]}`,
            userNotes: formData[sectionName]?.map(item => ({ content: item })) || []
        });
        setShowAIAssistant(true);
    };

    const saveDocument = async (markComplete = false) => {
        setSaving(true);
        try {
            const documentData = {
                document_type: 'swot_analysis',
                title: 'My SWOT Analysis', // Updated title as per outline
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: markComplete,
                last_updated: new Date().toISOString()
            };

            if (document) { // `document` state corresponds to `existingDoc` in outline
                await StrategyDocument.update(document.id, documentData);
            } else {
                const newDoc = await StrategyDocument.create(documentData);
                setDocument(newDoc);
            }

            if (markComplete) {
                // Award XP for completing the document for the first time
                if (!document?.is_completed) {
                    await handleGamification({ action: 'COMPLETE_STRATEGY_DOC' });
                }
                alert('SWOT Analysis saved successfully!'); // Added success alert as per outline
                navigate(createPageUrl('MyFoundationRoadmap')); // Changed redirect as per outline
            }
        } catch (error) {
            console.error("Error saving document:", error);
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
                <p className="ml-4 text-[var(--text-soft)]">Loading SWOT Analysis...</p>
            </div>
        );
    }

    // This is no longer used in the header subtitle as per the outline, but kept for potential other uses if any.
    // const getTotalItems = () => {
    //     return swotQuadrants.reduce((total, quad) => {
    //         const items = formData[quad.id] || [''];
    //         return total + items.filter(item => item.trim()).length;
    //     }, 0);
    // };
    // const totalItems = getTotalItems(); 

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
                <SWOTAnalysisOverview formData={formData} />
            ) : (<>

            {/* Header (main fixed header) */}
            <div className="card p-4 md:p-6 mb-6">
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
                                <Lightbulb className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">SWOT Analysis</h1>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Foundation Tool #4
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => saveDocument(false)}
                            disabled={saving}
                            className="btn btn-secondary"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button 
                            onClick={() => saveDocument(true)}
                            disabled={saving}
                            className="btn btn-primary"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Complete & Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Detailed Introduction Section + AI Help Banner */}
            <div className="card p-6 mb-6">
                <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full mb-6">
                    <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl mb-2">SWOT Analysis</h1>
                        <p className="text-[var(--primary-gold)] font-semibold">Foundation Tool #4</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Your Strategic Command Center for Business Success</h3>
                    <p className="text-[var(--text-main)] leading-relaxed mb-4">
                        Your SWOT Analysis is your strategic GPS, providing a 360-degree view of where you stand and where you can go. By honestly assessing your Strengths, Weaknesses, Opportunities, and Threats, you create a tactical advantage that most entrepreneurs never develop. This isn't just an academic exercise—it's your battle plan for dominating your market by maximizing what you do best while protecting against what could derail you.
                    </p>
                    <p className="text-[var(--text-main)] leading-relaxed mb-4">
                        Smart business owners don't just hope for success—they engineer it by understanding their competitive advantages and market realities. Your SWOT analysis reveals which opportunities to pursue first, which weaknesses to shore up immediately, and how to turn potential threats into competitive advantages. It transforms scattered insights into focused strategy, ensuring every business decision moves you closer to your vision while protecting your flanks from potential disasters.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-orange-200 dark:border-orange-600">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">How This Streamlines Your Vision:</h4>
                            <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                <li>• Prioritizes opportunities with highest ROI</li>
                                <li>• Identifies critical weaknesses to address first</li>
                                <li>• Leverages unique strengths for competitive advantage</li>
                                <li>• Prepares defenses against potential threats</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-orange-200 dark:border-orange-600">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">Business Impact:</h4>
                            <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                <li>• Strategic clarity reduces decision paralysis</li>
                                <li>• Faster goal achievement through focused effort</li>
                                <li>• Risk mitigation prevents costly mistakes</li>
                                <li>• Competitive positioning based on real advantages</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pro Tip: Turn Weaknesses into Opportunities</h4>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                Your biggest weaknesses often hide your greatest opportunities. If you lack technical skills, partner with a tech expert. If you're short on capital, focus on high-margin, low-investment services. Every weakness is a door to innovation and strategic partnerships.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* AI Help Banner */}
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                    <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-1">
                                Need Help? Ask Elyzet or Olivia!
                            </p>
                            <p className="text-xs text-[var(--text-soft)]">
                                Click the ✨ icon next to any section to get strategic guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SWOT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {swotQuadrants.map((quadrant) => {
                    const IconComponent = quadrant.icon; // Get the icon component
                    return (
                        <div key={quadrant.id} className={`card p-6 bg-gradient-to-br ${quadrant.gradient}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-xl font-bold ${quadrant.headerColor} flex items-center gap-2`}>
                                    <IconComponent className="w-6 h-6" />
                                    {quadrant.title}
                                </h3>
                                <button
                                    onClick={() => openAIHelp(quadrant.id)}
                                    className="text-purple-600 hover:text-purple-700 transition-colors"
                                    title="Get AI Help"
                                >
                                    <Sparkles className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3 mb-4">
                                {(formData[quadrant.id] || ['']).map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleItemChange(quadrant.id, index, e.target.value)}
                                            placeholder={`${quadrant.title.slice(0, -1)} ${index + 1}`}
                                            className="form-input flex-1 text-sm"
                                        />
                                        {(formData[quadrant.id] || []).length > 1 && (
                                            <button
                                                onClick={() => removeItem(quadrant.id, index)}
                                                className="btn btn-ghost p-2 text-red-500 hover:text-red-700"
                                                title="Remove item"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => addItem(quadrant.id)}
                                    className="btn btn-secondary btn-sm w-full mt-2"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Add {quadrant.title.slice(0, -1)}
                                </button>
                            </div>

                            {/* Stage-specific guidance */}
                            <div className="bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-600 rounded-md p-3">
                                <div className="flex items-start gap-2">
                                    <Lightbulb className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-gray-700 dark:text-gray-300">
                                        {getStageGuidance(quadrant.id, user?.entrepreneurship_stage || 'vision')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Save Actions (Mobile) */}
            <div className="md:hidden fixed bottom-20 left-0 right-0 p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 max-w-sm mx-auto">
                    <button 
                        onClick={() => saveDocument(false)}
                        disabled={saving}
                        className="btn btn-secondary flex-1"
                    >
                        Save Draft
                    </button>
                    <button 
                        onClick={() => saveDocument(true)}
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
                assistantType="elyzet"
                sectionTitle={aiContext.sectionTitle}
                userNotes={aiContext.userNotes || []}
            />
        </>)}
        </div>
    );
}