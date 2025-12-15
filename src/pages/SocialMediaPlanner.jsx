import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { staticSocialMediaPlans, toolMapping } from '../components/social_media/staticPlans';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Target, Layout, CheckCircle, ArrowRight, Loader2, Save, RefreshCw, ChevronDown, ChevronRight, Share2, BarChart2, MessageSquare, Video, Image as ImageIcon, Copy, Play, Palette } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Helper to get available niche roadmaps (simplified list based on NicheRoadmaps page)
const NICHE_ROADMAPS = [
    { id: 'book_author_growth', title: 'Book Author Growth Plan' },
    { id: 'musical_artist_growth', title: 'Musical Artist Growth Plan' },
    { id: 'podcast_growth', title: 'Podcast Growth Roadmap' },
    { id: 'life_coach_growth', title: 'Life Coach Growth Roadmap' },
    { id: 'ecommerce_growth', title: 'E-commerce Growth Roadmap' },
    { id: 'non_profit_growth', title: 'Non-Profit Growth Roadmap' },
    { id: 'private_community_growth', title: 'Private Community Growth' }
];

const FOCUSED_PROGRAMS = [
    { id: 'audience_growth', title: '90-Day Audience Growth Sprint' },
    { id: 'monetization_mastery', title: 'Monetization Mastery' },
    { id: 'brand_authority', title: 'Brand Authority Builder' }
];

export default function SocialMediaPlanner() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [selectedSource, setSelectedSource] = useState('goal'); // goal, niche, program
    const [selectedSpecific, setSelectedSpecific] = useState('');
    const [currentPlan, setCurrentPlan] = useState(null);
    const [activeMonth, setActiveMonth] = useState(0);
    const [activeWeek, setActiveWeek] = useState(0);
    const [savedPlans, setSavedPlans] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await base44.auth.me();
                setUser(userData);
                
                // Load existing plans
                const plans = await base44.entities.SocialMediaPlan.filter({ created_by: userData.email }, '-created_date');
                setSavedPlans(plans);
                if (plans.length > 0) {
                    setCurrentPlan(plans[0]);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleGeneratePlan = async () => {
        if (selectedSource !== 'goal' && !selectedSpecific) {
            toast.error("Please select a specific roadmap or program");
            return;
        }

        setGenerating(true);
        try {
            let planData = null;
            let sourceName = "";

            // Determine Source Name
            if (selectedSource === 'goal') {
                sourceName = "My Current 90-Day Goal";
            } else if (selectedSource === 'niche') {
                const roadmap = NICHE_ROADMAPS.find(r => r.id === selectedSpecific);
                sourceName = roadmap?.title || "Niche Roadmap";
            } else if (selectedSource === 'program') {
                const program = FOCUSED_PROGRAMS.find(p => p.id === selectedSpecific);
                sourceName = program?.title || "Focused Program";
            }

            // 1. Check for Static Plan (Credit Saving)
            // Logic: Check staticSocialMediaPlans[source_type][specific_selection_id]
            // For 'goal', we might need to match the specific goal string if possible, or just use a generic 'goal' template if specific match fails
            // simplified for now to check direct match
            const staticKey = selectedSource === 'goal' ? 'General Business Growth' : selectedSpecific; 
            // Note: In staticPlans.js we used 'Brand Awareness' etc. 
            // Let's check against what we have or default to a generic one if available.
            
            let staticMatch = null;
            if (staticSocialMediaPlans[selectedSource]) {
                 // Try to find a match or use first available key for that source type as fallback/demo
                 const keys = Object.keys(staticSocialMediaPlans[selectedSource]);
                 if (keys.includes(selectedSpecific)) {
                     staticMatch = staticSocialMediaPlans[selectedSource][selectedSpecific];
                 } else if (selectedSource === 'goal') {
                     // For goals, users might have custom strings, so maybe pick a default like 'Brand Awareness' for now
                     staticMatch = staticSocialMediaPlans[selectedSource]['Brand Awareness']; 
                 }
            }

            if (staticMatch) {
                console.log("Using static plan template to save credits");
                planData = {
                    overview: "A 90-day strategic plan optimized for your goals using proven frameworks.",
                    ...staticMatch
                };
            } else {
                // 2. Fallback to AI Generation
                let context = "";
                if (selectedSource === 'goal') {
                    context = `User's current 90-day goal: ${user.selected_goal || "General Business Growth"}. Entrepreneurship Stage: ${user.entrepreneurship_stage || "Startup"}. Industry: ${user.business_industry || "General"}.`;
                } else if (selectedSource === 'niche') {
                    context = `Niche Roadmap: ${sourceName}. Focus on specific growth strategies for this industry.`;
                } else if (selectedSource === 'program') {
                    context = `Focused Program: ${sourceName}.`;
                }

                const prompt = `
                    Create a comprehensive 90-Day Social Media Marketing Plan based on: ${context}
                    
                    CRITICAL: The plan must utilize "The HQ" platform features, specifically:
                    - **The HQ Social Media Manager** (for scheduling and management)
                    - HQ AI Content Writer (for drafting posts)
                    - HQ Analytics (for tracking performance)
                    - HQ Community (for engagement)
                    - HQ Graphic Design Tools (for visuals)
                    
                    Structure the output as a valid JSON object with this exact schema:
                    {
                        "overview": "Brief 2-3 sentence strategy summary",
                        "months": [
                            {
                                "month": 1,
                                "theme": "Theme for the month",
                                "focus": "Main objective",
                                "weeks": [
                                    {
                                        "week": 1,
                                        "focus": "Weekly focus",
                                        "days": [
                                            {
                                                "day": 1,
                                                "platform": "Primary platform (IG, LinkedIn, TikTok, etc.)",
                                                "content_type": "Video/Image/Text/Carousel",
                                                "topic": "Content topic/hook",
                                                "hq_feature": "Which HQ feature to use (e.g., HQ Social Scheduler)",
                                                "action": "Specific action to take"
                                            },
                                            ... (7 days)
                                        ]
                                    },
                                    ... (4 weeks)
                                ]
                            },
                            ... (3 months)
                        ]
                    }
                `;

                const response = await base44.integrations.Core.InvokeLLM({
                    prompt: prompt,
                    response_json_schema: {
                        type: "object",
                        properties: {
                            overview: { type: "string" },
                            months: { 
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        month: { type: "number" },
                                        theme: { type: "string" },
                                        focus: { type: "string" },
                                        weeks: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    week: { type: "number" },
                                                    focus: { type: "string" },
                                                    days: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                day: { type: "number" },
                                                                platform: { type: "string" },
                                                                content_type: { type: "string" },
                                                                topic: { type: "string" },
                                                                hq_feature: { type: "string" },
                                                                action: { type: "string" }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                planData = response;
            }
            
            // Save to DB
            const newPlan = await base44.entities.SocialMediaPlan.create({
                source_type: selectedSource,
                source_name: sourceName,
                plan_data: planData,
                created_by: user.email
            });

            setCurrentPlan(newPlan);
            setSavedPlans([newPlan, ...savedPlans]);
            toast.success("Social Media Plan Generated Successfully!");

        } catch (error) {
            console.error("Error generating plan:", error);
            toast.error("Failed to generate plan. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--text-main)] flex items-center gap-3">
                        <Share2 className="w-8 h-8 text-[var(--primary-gold)]" />
                        Social Media Marketing Planner
                    </h1>
                    <p className="text-[var(--text-soft)] mt-2 text-lg">
                        Generate a customized 90-day content strategy powered by AI and The HQ tools.
                    </p>
                </div>

                {/* Generator Section */}
                {!currentPlan && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                            <h2 className="text-xl font-bold text-[var(--text-main)]">Create Your New Plan</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-soft)] mb-2">Base Plan On:</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <button 
                                            onClick={() => setSelectedSource('goal')}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${selectedSource === 'goal' ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            <Target className="w-5 h-5 mb-2 text-[var(--primary-gold)]" />
                                            <div className="font-semibold text-[var(--text-main)]">Current Goal</div>
                                            <div className="text-xs text-[var(--text-soft)] mt-1">Based on your 90-day focus</div>
                                        </button>
                                        <button 
                                            onClick={() => setSelectedSource('niche')}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${selectedSource === 'niche' ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            <Layout className="w-5 h-5 mb-2 text-[var(--primary-gold)]" />
                                            <div className="font-semibold text-[var(--text-main)]">Niche Roadmap</div>
                                            <div className="text-xs text-[var(--text-soft)] mt-1">Industry specific plan</div>
                                        </button>
                                        <button 
                                            onClick={() => setSelectedSource('program')}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${selectedSource === 'program' ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            <Calendar className="w-5 h-5 mb-2 text-[var(--primary-gold)]" />
                                            <div className="font-semibold text-[var(--text-main)]">Focused Program</div>
                                            <div className="text-xs text-[var(--text-soft)] mt-1">Sprint based strategy</div>
                                        </button>
                                    </div>
                                </div>

                                {selectedSource === 'niche' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-soft)] mb-2">Select Roadmap:</label>
                                        <select 
                                            className="form-input"
                                            value={selectedSpecific}
                                            onChange={(e) => setSelectedSpecific(e.target.value)}
                                        >
                                            <option value="">-- Choose a Roadmap --</option>
                                            {NICHE_ROADMAPS.map(r => (
                                                <option key={r.id} value={r.id}>{r.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {selectedSource === 'program' && (
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-soft)] mb-2">Select Program:</label>
                                        <select 
                                            className="form-input"
                                            value={selectedSpecific}
                                            onChange={(e) => setSelectedSpecific(e.target.value)}
                                        >
                                            <option value="">-- Choose a Program --</option>
                                            {FOCUSED_PROGRAMS.map(p => (
                                                <option key={p.id} value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 flex flex-col justify-center items-center text-center">
                                <div className="bg-[var(--primary-gold)]/10 p-4 rounded-full mb-4">
                                    <Sparkles className="w-8 h-8 text-[var(--primary-gold)]" />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">AI-Powered Strategy</h3>
                                <p className="text-[var(--text-soft)] text-sm mb-6 max-w-xs">
                                    Our AI will analyze your selection and create a day-by-day plan using The HQ's best tools and strategies.
                                </p>
                                <button 
                                    onClick={handleGeneratePlan}
                                    disabled={generating}
                                    className="btn btn-primary w-full max-w-xs py-3 text-base shadow-lg hover:shadow-xl transition-all"
                                >
                                    {generating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Generating Plan...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 mr-2" />
                                            Generate My 90-Day Plan
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plan Display Section */}
                {currentPlan && (
                    <div className="space-y-6">
                        {/* Plan Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold bg-[var(--primary-gold)] text-white px-2 py-0.5 rounded uppercase tracking-wider">Active Plan</span>
                                    <span className="text-xs text-[var(--text-soft)]">Created {new Date(currentPlan.created_date).toLocaleDateString()}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-[var(--text-main)]">{currentPlan.source_name}</h2>
                                <p className="text-[var(--text-soft)] max-w-2xl mt-2">{currentPlan.plan_data.overview}</p>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button 
                                    onClick={() => setCurrentPlan(null)}
                                    className="btn btn-secondary text-sm"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> New Plan
                                </button>
                                <button className="btn btn-primary text-sm">
                                    <Save className="w-4 h-4 mr-2" /> Export PDF
                                </button>
                            </div>
                        </div>

                        {/* Month Tabs */}
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {(currentPlan.plan_data?.months || []).map((month, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveMonth(idx); setActiveWeek(0); }}
                                    className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-colors ${
                                        activeMonth === idx 
                                        ? 'bg-[var(--primary-gold)] text-white shadow-md' 
                                        : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Month {month?.month || idx + 1}
                                    <div className={`text-xs mt-1 ${activeMonth === idx ? 'text-white/80' : 'text-[var(--text-soft)]'}`}>{month?.theme || 'Theme'}</div>
                                </button>
                            ))}
                        </div>

                        {/* Canva Promo Banner */}
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white mb-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                    <Palette className="w-6 h-6" /> Need Visuals for Your Posts?
                                </h3>
                                <p className="text-purple-100 text-sm opacity-90">
                                    Learn how to design stunning graphics for free. Access our exclusive Canva Masterclass in the Community.
                                </p>
                            </div>
                            <Link 
                                to={createPageUrl('TheCommunity')} 
                                className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
                            >
                                Take Free Canva Course
                            </Link>
                        </div>

                        {/* Weekly Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {currentPlan.plan_data?.months?.[activeMonth] && (
                                <>
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                        <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center">
                                            <Target className="w-5 h-5 text-[var(--primary-gold)] mr-2" />
                                            Month {currentPlan.plan_data.months[activeMonth].month} Focus: {currentPlan.plan_data.months[activeMonth].focus}
                                        </h3>
                                    </div>

                                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                                        {(currentPlan.plan_data.months[activeMonth].weeks || []).map((week, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveWeek(idx)}
                                                className={`flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors ${
                                                    activeWeek === idx 
                                                    ? 'border-[var(--primary-gold)] text-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/10' 
                                                    : 'border-transparent text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                Week {week?.week || idx + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="p-6">
                                        {currentPlan.plan_data.months[activeMonth].weeks?.[activeWeek] ? (
                                            <>
                                                <div className="mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                                                    <span className="font-bold text-blue-800 dark:text-blue-300 uppercase text-xs tracking-wide">Weekly Focus</span>
                                                    <p className="text-blue-900 dark:text-blue-100 font-medium mt-1">
                                                        {currentPlan.plan_data.months[activeMonth].weeks[activeWeek].focus}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                    {(currentPlan.plan_data.months[activeMonth].weeks[activeWeek].days || []).map((day, dIdx) => (
                                                        <div key={dIdx} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <span className="bg-gray-200 dark:bg-gray-700 text-[var(--text-main)] text-xs font-bold px-2 py-1 rounded">Day {day?.day || dIdx + 1}</span>
                                                                <span className="text-xs text-[var(--text-soft)] font-medium">{day?.platform || 'Social'}</span>
                                                            </div>
                                                            
                                                            <h4 className="font-bold text-[var(--text-main)] text-sm mb-2">{day?.topic || 'Topic'}</h4>
                                                            
                                                            <div className="space-y-2 mb-4 flex-1">
                                                                <div className="flex items-center text-xs text-[var(--text-soft)]">
                                                                    {day?.content_type?.includes('Video') ? <Video className="w-3 h-3 mr-1.5" /> : <ImageIcon className="w-3 h-3 mr-1.5" />}
                                                                    {day?.content_type}
                                                                </div>
                                                                <div className="flex items-center text-xs text-[var(--primary-gold)] font-medium">
                                                                    <Sparkles className="w-3 h-3 mr-1.5" />
                                                                    Use: {day?.hq_feature}
                                                                </div>
                                                            </div>

                                                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                                                <p className="text-xs text-[var(--text-main)] line-clamp-3">{day?.action}</p>
                                                                
                                                                {/* Tool Button */}
                                                                {day?.hq_feature && (
                                                                    <Link 
                                                                        to={createPageUrl(toolMapping[day.hq_feature] || 'Dashboard')}
                                                                        className="w-full btn btn-secondary btn-sm text-xs justify-center flex items-center"
                                                                    >
                                                                        Open {day.hq_feature}
                                                                    </Link>
                                                                )}

                                                                {/* AI Helper Suggestion */}
                                                                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded text-center">
                                                                    <p className="text-[10px] text-indigo-800 dark:text-indigo-200 mb-1">Writer's Block?</p>
                                                                    <Link to={createPageUrl('ElyzetAIAssistants')} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1">
                                                                        <Sparkles className="w-3 h-3" /> Use HQ AI to Write This
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-10 text-[var(--text-soft)]">No weekly data available.</div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Saved Plans List */}
                {savedPlans.length > 0 && !currentPlan && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-6">Saved Plans</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedPlans.map((plan) => (
                                <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)] transition-colors cursor-pointer" onClick={() => setCurrentPlan(plan)}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-[var(--primary-gold)]/10 p-2 rounded-lg">
                                            <Share2 className="w-5 h-5 text-[var(--primary-gold)]" />
                                        </div>
                                        <span className="text-xs text-[var(--text-soft)]">{new Date(plan.created_date).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="font-bold text-[var(--text-main)] mb-2">{plan.source_name}</h4>
                                    <p className="text-sm text-[var(--text-soft)] line-clamp-2">{plan.plan_data.overview}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center text-sm font-medium text-[var(--primary-gold)]">
                                        View Plan <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}