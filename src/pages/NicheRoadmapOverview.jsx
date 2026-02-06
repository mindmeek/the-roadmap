import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Calendar, Target, TrendingUp, Award, CheckCircle, Sparkles, ExternalLink, ChevronRight, Loader2, Users, Brain, AlertCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { bookAuthorGrowthRoadmap } from '@/components/course_content/bookAuthorGrowth';
import { lifeCoachGrowthRoadmap } from '@/components/course_content/lifeCoachGrowth';
import { nonProfitGrowthRoadmap } from '@/components/course_content/nonProfitGrowth';
import { ecommerceGrowthRoadmap } from '@/components/course_content/ecommerceGrowth';
import { privateCommunityGrowthRoadmap } from '@/components/course_content/privateCommunityGrowth';
import { podcastGrowthRoadmap } from '@/components/course_content/podcastGrowth';
import { musicalArtistGrowthRoadmap } from '@/components/course_content/musicalArtistGrowth';
import { StrategyDocument } from '@/entities/all';

const programContentMap = {
  'book_author_growth': bookAuthorGrowthRoadmap,
  'life_coach_growth': lifeCoachGrowthRoadmap,
  'non_profit_growth': nonProfitGrowthRoadmap,
  'ecommerce_growth': ecommerceGrowthRoadmap,
  'private_community_growth': privateCommunityGrowthRoadmap,
  'podcast_growth': podcastGrowthRoadmap,
  'musical_artist_growth': musicalArtistGrowthRoadmap,
};

export default function NicheRoadmapOverview() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [programContent, setProgramContent] = useState(null);
    const [idealClientData, setIdealClientData] = useState(null);
    const [completedTasks, setCompletedTasks] = useState({});
    const [strategyDocs, setStrategyDocs] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await base44.auth.me();
                setUser(userData);

                const urlParams = new URLSearchParams(window.location.search);
                const programKey = urlParams.get('program');
                
                if (programKey && programContentMap[programKey]) {
                    setProgramContent(programContentMap[programKey]);
                    
                    // Load saved progress
                    const savedCompleted = localStorage.getItem(`niche_${programKey}_completed`);
                    if (savedCompleted) {
                        setCompletedTasks(JSON.parse(savedCompleted));
                    }

                    // Load all relevant strategy documents
                    const allDocs = await StrategyDocument.filter({
                        created_by: userData.email
                    });

                    const docsByType = {};
                    allDocs.forEach(doc => {
                        docsByType[doc.document_type] = doc.content;
                    });

                    setStrategyDocs(docsByType);

                    // Set ideal client data
                    if (docsByType['ideal_client']) {
                        setIdealClientData(docsByType['ideal_client']);
                    }
                } else {
                    navigate(createPageUrl('NicheRoadmaps'));
                }
            } catch (e) {
                console.error('Error loading program:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);
            } catch (e) {
                console.error('Error loading program:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!programContent) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="card p-8 text-center">
                    <p className="text-[var(--text-soft)]">Program not found</p>
                </div>
            </div>
        );
    }

    const totalTasks = programContent.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    // Group weeks by month (every 4 weeks = 1 month)
    const months = [
        { number: 1, title: 'Month 1', weeks: programContent.weeks.slice(0, 4) },
        { number: 2, title: 'Month 2', weeks: programContent.weeks.slice(4, 8) },
        { number: 3, title: 'Month 3', weeks: programContent.weeks.slice(8, 12) }
    ];

    return (
        <div className="px-3 sm:px-4 pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <button
                            onClick={() => navigate(createPageUrl('NicheRoadmaps'))}
                            className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-3"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Niche Roadmaps
                        </button>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">{programContent.courseTitle}</h1>
                        <p className="text-[var(--text-soft)] mt-2">{programContent.courseDescription}</p>
                    </div>
                    <Link
                        to={createPageUrl('NicheRoadmap') + `?program=${new URLSearchParams(window.location.search).get('program')}`}
                        className="btn btn-primary"
                    >
                        Start Working
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                {/* Strategic Foundation Overview */}
                <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <h3 className="font-bold text-2xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-7 h-7 text-blue-600" />
                        Your Strategic Foundation
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-6">
                        Here's a snapshot of your business foundation that guides this entire roadmap.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Value Proposition Card */}
                        {strategyDocs['value_proposition_canvas'] && (
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-600" />
                                        Value Proposition
                                    </h4>
                                    <Link to={createPageUrl('StrategyFormValueProposition')} className="text-xs text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {strategyDocs['value_proposition_canvas'].products_services?.[0] && (
                                        <p className="text-[var(--text-main)]">
                                            <span className="font-semibold">Core Offer:</span> {strategyDocs['value_proposition_canvas'].products_services[0]}
                                        </p>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].pain_relievers?.[0] && (
                                        <p className="text-[var(--text-soft)] text-xs">
                                            ✓ {strategyDocs['value_proposition_canvas'].pain_relievers[0]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Business Model Card */}
                        {strategyDocs['business_model_canvas'] && (
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-indigo-600" />
                                        Business Model
                                    </h4>
                                    <Link to={createPageUrl('StrategyFormBusinessModelCanvas')} className="text-xs text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {strategyDocs['business_model_canvas'].revenueStreams && (
                                        <p className="text-[var(--text-main)]">
                                            <span className="font-semibold">Revenue:</span> {strategyDocs['business_model_canvas'].revenueStreams.substring(0, 60)}...
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* SWOT Highlights Card */}
                        {strategyDocs['swot_analysis'] && (
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        SWOT Analysis
                                    </h4>
                                    <Link to={createPageUrl('StrategyFormSWOTAnalysis')} className="text-xs text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {strategyDocs['swot_analysis'].strengths?.[0] && (
                                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                            <p className="font-semibold text-green-700 dark:text-green-400">Strength</p>
                                            <p className="text-[var(--text-soft)]">{strategyDocs['swot_analysis'].strengths[0].substring(0, 40)}...</p>
                                        </div>
                                    )}
                                    {strategyDocs['swot_analysis'].opportunities?.[0] && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                            <p className="font-semibold text-blue-700 dark:text-blue-400">Opportunity</p>
                                            <p className="text-[var(--text-soft)]">{strategyDocs['swot_analysis'].opportunities[0].substring(0, 40)}...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Value Ladder Card */}
                        {strategyDocs['value_ladder'] && (
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-red-600" />
                                        Value Ladder
                                    </h4>
                                    <Link to={createPageUrl('StrategyFormValueLadder')} className="text-xs text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                </div>
                                <div className="space-y-1 text-xs">
                                    {strategyDocs['value_ladder'].ladder_levels?.slice(0, 3).map((level, idx) => (
                                        level.offer_name && (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="text-[var(--primary-gold)]">•</span>
                                                <span className="text-[var(--text-main)] font-medium">{level.offer_name}</span>
                                                <span className="text-[var(--text-soft)]">({level.price})</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Marketing & Growth Strategies */}
                <div className="card p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                        Your Marketing & Growth Strategies
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Content Strategy */}
                        {strategyDocs['content_strategy'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Content Strategy</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    {strategyDocs['content_strategy'].content_pillars?.filter(p => p).length || 0} content pillars defined
                                </p>
                                <Link to={createPageUrl('StrategyFormContentStrategy')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}

                        {/* Social Media Strategy */}
                        {strategyDocs['social_media_strategy'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Social Media</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    {Object.values(strategyDocs['social_media_strategy'].target_platforms || {}).filter(p => p.enabled).length} platforms active
                                </p>
                                <Link to={createPageUrl('StrategyFormSocialMedia')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}

                        {/* Email Marketing */}
                        {strategyDocs['email_marketing'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Email Marketing</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    Platform: {strategyDocs['email_marketing'].email_platform || 'Not set'}
                                </p>
                                <Link to={createPageUrl('StrategyFormEmailMarketing')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}

                        {/* Pricing Strategy */}
                        {strategyDocs['pricing_strategies'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Pricing Strategy</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    {strategyDocs['pricing_strategies'].selected_strategies?.length || 0} models selected
                                </p>
                                <Link to={createPageUrl('StrategyFormPricingStrategies')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}

                        {/* Community Building */}
                        {strategyDocs['community_building'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Community Building</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    Platform: {strategyDocs['community_building'].community_platform || 'Not set'}
                                </p>
                                <Link to={createPageUrl('StrategyFormCommunityBuilding')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}

                        {/* Partnerships */}
                        {strategyDocs['strategic_partnerships'] && (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-sm text-[var(--text-main)]">Partnerships</h4>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <p className="text-xs text-[var(--text-soft)] mb-2">
                                    {Object.values(strategyDocs['strategic_partnerships'].partnership_types || {}).filter(p => p.enabled).length} types planned
                                </p>
                                <Link to={createPageUrl('StrategyFormStrategicPartnerships')} className="text-xs text-orange-600 hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ideal Client Summary */}
                {idealClientData && (
                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                                <Users className="w-6 h-6 text-purple-600" />
                                Your Ideal Client Profile
                            </h3>
                            <Link
                                to={createPageUrl('StrategyFormIdealClient')}
                                className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                            >
                                Edit <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Avatar Name */}
                            {idealClientData.client_avatar_name && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                                    <p className="text-xs text-[var(--text-soft)] mb-2 uppercase tracking-wide">Client Avatar</p>
                                    <p className="text-2xl font-bold text-[var(--text-main)]">👤 {idealClientData.client_avatar_name}</p>
                                </div>
                            )}

                            {/* Demographics */}
                            <div className="grid sm:grid-cols-2 gap-3">
                                {idealClientData.age_range && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Age Range</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.age_range}</p>
                                    </div>
                                )}
                                {idealClientData.gender && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Gender</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.gender}</p>
                                    </div>
                                )}
                                {idealClientData.location && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Location</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.location}</p>
                                    </div>
                                )}
                                {idealClientData.income_level && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Income Level</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.income_level}</p>
                                    </div>
                                )}
                                {idealClientData.occupation && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Occupation</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.occupation}</p>
                                    </div>
                                )}
                                {idealClientData.education && (
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Education</p>
                                        <p className="font-semibold text-[var(--text-main)]">{idealClientData.education}</p>
                                    </div>
                                )}
                            </div>

                            {/* Pain Points */}
                            {idealClientData.pain_points && idealClientData.pain_points.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-soft)] mb-2 uppercase tracking-wide">Top Pain Points</p>
                                    <div className="flex flex-wrap gap-2">
                                        {idealClientData.pain_points.map((pain, idx) => (
                                            <span key={idx} className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">
                                                {pain}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Goals */}
                            {idealClientData.goals && idealClientData.goals.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-soft)] mb-2 uppercase tracking-wide">Goals & Aspirations</p>
                                    <div className="flex flex-wrap gap-2">
                                        {idealClientData.goals.map((goal, idx) => (
                                            <span key={idx} className="text-sm px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                                                {goal}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Core Values */}
                            {idealClientData.core_values && idealClientData.core_values.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-xs text-[var(--text-soft)] mb-2 uppercase tracking-wide">Core Values</p>
                                    <div className="flex flex-wrap gap-2">
                                        {idealClientData.core_values.map((value, idx) => (
                                            <span key={idx} className="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full">
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Customer Journey Overview */}
                {strategyDocs['customer_journey'] && (
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                                <Map className="w-6 h-6 text-green-600" />
                                Your Customer Journey Map
                            </h3>
                            <Link
                                to={createPageUrl('StrategyFormCustomerJourney')}
                                className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center"
                            >
                                View Full Map <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        {/* Journey Stages Flow */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                            {[
                                { id: 'awareness', label: 'Awareness', icon: Eye, color: 'purple' },
                                { id: 'consideration', label: 'Consideration', icon: Search, color: 'green' },
                                { id: 'decision', label: 'Decision', icon: ShoppingCart, color: 'yellow' },
                                { id: 'service', label: 'Service', icon: HeartHandshake, color: 'orange' },
                                { id: 'loyalty', label: 'Loyalty', icon: Trophy, color: 'red' }
                            ].map((stage, idx) => {
                                const StageIcon = stage.icon;
                                const stageData = strategyDocs['customer_journey']?.[stage.id];
                                const hasPathway = stageData?.selected_pathway;
                                
                                return (
                                    <div key={stage.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700 text-center">
                                        <div className={`mx-auto w-10 h-10 rounded-full bg-${stage.color}-100 dark:bg-${stage.color}-900/30 flex items-center justify-center mb-2`}>
                                            <StageIcon className={`w-5 h-5 text-${stage.color}-600`} />
                                        </div>
                                        <p className="text-xs font-semibold text-[var(--text-main)] mb-1">{stage.label}</p>
                                        {hasPathway ? (
                                            <div className="flex items-center justify-center gap-1">
                                                <CheckCircle className="w-3 h-3 text-green-600" />
                                                <span className="text-xs text-green-600">Mapped</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-[var(--text-soft)]">-</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Selected Pathways Summary */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                            <p className="text-xs font-semibold text-[var(--text-soft)] uppercase mb-3">Your Selected Strategies</p>
                            <div className="space-y-2">
                                {strategyDocs['customer_journey']?.awareness?.selected_pathway && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 font-bold text-xs">Awareness:</span>
                                        <span className="text-xs text-[var(--text-main)]">
                                            {strategyDocs['customer_journey'].awareness.selected_pathway.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </span>
                                    </div>
                                )}
                                {strategyDocs['customer_journey']?.consideration?.selected_pathway && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold text-xs">Consideration:</span>
                                        <span className="text-xs text-[var(--text-main)]">
                                            {strategyDocs['customer_journey'].consideration.selected_pathway.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </span>
                                    </div>
                                )}
                                {strategyDocs['customer_journey']?.decision?.selected_pathway && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-yellow-600 font-bold text-xs">Decision:</span>
                                        <span className="text-xs text-[var(--text-main)]">
                                            {strategyDocs['customer_journey'].decision.selected_pathway.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Overview */}
                <div className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
                            <Target className="w-6 h-6 text-blue-600" />
                            Your 90-Day Progress
                        </h3>
                        <span className="text-sm text-[var(--text-soft)]">{completedCount}/{totalTasks} tasks ({progressPercentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                        <div
                            className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    {/* Success Metrics */}
                    {programContent.successMetrics && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                            <p className="font-semibold text-[var(--text-main)] mb-3 text-sm">🎯 Success After 90 Days:</p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {Object.entries(programContent.successMetrics).map(([key, value]) => (
                                    <div key={key} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-[var(--text-main)]">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 90-Day Roadmap Overview */}
                <div className="card p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-3">
                            <Calendar className="w-7 h-7 text-[var(--primary-gold)]" />
                            90-Day Roadmap at a Glance
                        </h2>
                        <Link
                            to={createPageUrl('NicheRoadmap') + `?program=${new URLSearchParams(window.location.search).get('program')}`}
                            className="btn btn-primary hidden md:flex items-center"
                        >
                            Start Working
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {months.map(month => {
                            const monthTasksTotal = month.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
                            const monthTasksCompleted = month.weeks.reduce((sum, week) => {
                                return sum + week.tasks.filter((task, idx) => 
                                    completedTasks[`${week.weekNumber}-${idx}`]
                                ).length;
                            }, 0);
                            const monthProgress = monthTasksTotal > 0 ? Math.round((monthTasksCompleted / monthTasksTotal) * 100) : 0;

                            return (
                                <div key={month.number} className="border-l-4 border-[var(--primary-gold)] pl-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">{month.title}</h3>
                                        <span className="text-sm text-[var(--text-soft)]">{monthTasksCompleted}/{monthTasksTotal} tasks</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                                        <div
                                            className="bg-[var(--primary-gold)] h-2 rounded-full transition-all"
                                            style={{ width: `${monthProgress}%` }}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        {month.weeks.map(week => {
                                            const Icon = week.icon;
                                            const weekTasksCompleted = week.tasks.filter((task, idx) => 
                                                completedTasks[`${week.weekNumber}-${idx}`]
                                            ).length;
                                            const weekProgress = Math.round((weekTasksCompleted / week.tasks.length) * 100);

                                            return (
                                                <div key={week.weekNumber} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-[var(--primary-gold)] p-2 rounded-lg flex-shrink-0">
                                                            <Icon className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-semibold text-[var(--primary-gold)]">Week {week.weekNumber}</span>
                                                                <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-[var(--text-soft)]">
                                                                    {weekTasksCompleted}/{week.tasks.length} tasks
                                                                </span>
                                                            </div>
                                                            <h4 className="font-bold text-[var(--text-main)] mb-1">{week.weekTitle}</h4>
                                                            <p className="text-sm text-[var(--text-soft)] mb-2">{week.weekDescription}</p>
                                                            {week.weeklyGoal && (
                                                                <p className="text-xs text-[var(--primary-gold)] font-medium mb-2">
                                                                    🎯 {week.weeklyGoal}
                                                                </p>
                                                            )}
                                                            
                                                            {/* Key Tasks Preview */}
                                                            <div className="mt-3 space-y-1">
                                                                {week.tasks.slice(0, 3).map((task, idx) => {
                                                                    const taskKey = `${week.weekNumber}-${idx}`;
                                                                    const isCompleted = completedTasks[taskKey];
                                                                    return (
                                                                        <div key={idx} className="flex items-start gap-2 text-sm">
                                                                            {isCompleted ? (
                                                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                                            ) : (
                                                                                <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5" />
                                                                            )}
                                                                            <span className={`${isCompleted ? 'line-through text-[var(--text-soft)]' : 'text-[var(--text-main)]'}`}>
                                                                                {task.title}
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                })}
                                                                {week.tasks.length > 3 && (
                                                                    <p className="text-xs text-[var(--text-soft)] ml-6">+{week.tasks.length - 3} more tasks</p>
                                                                )}
                                                            </div>

                                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                                                                <div
                                                                    className="bg-green-500 h-1.5 rounded-full transition-all"
                                                                    style={{ width: `${weekProgress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Key Milestones */}
                <div className="card p-6">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-3">
                        <Award className="w-7 h-7 text-[var(--primary-gold)]" />
                        Key Milestones
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {programContent.weeks
                            .filter(week => week.weeklyGoal)
                            .map(week => (
                                <div key={week.weekNumber} className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-[var(--primary-gold)]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-semibold text-[var(--primary-gold)]">Week {week.weekNumber}</span>
                                    </div>
                                    <p className="font-bold text-[var(--text-main)] mb-1">{week.weekTitle}</p>
                                    <p className="text-sm text-[var(--primary-gold)]">🎯 {week.weeklyGoal}</p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* KPI Checklist */}
                {programContent.kpiChecklist && (
                    <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                        <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                            Track These KPIs Weekly
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {programContent.kpiChecklist.map((kpi, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-[var(--text-main)]">{kpi.metric}</p>
                                    <p className="text-xs text-[var(--primary-gold)] font-semibold mt-1">Target: {kpi.target}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="card p-8 text-center bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white">
                    <h3 className="text-2xl font-bold mb-3">Ready to Execute This Roadmap?</h3>
                    <p className="mb-6 max-w-2xl mx-auto opacity-90">
                        Access the full weekly breakdown with detailed action steps, HQ tool integrations, and copy-paste templates.
                    </p>
                    <Link
                        to={createPageUrl('NicheRoadmap') + `?program=${new URLSearchParams(window.location.search).get('program')}`}
                        className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100 inline-flex items-center text-lg px-8 py-3"
                    >
                        Start Week 1
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}