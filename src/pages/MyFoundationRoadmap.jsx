import React, { useState, useEffect } from 'react';
import { User, FoundationProgress } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    CheckCircle, ChevronRight, Plus, StickyNote, X, Loader2,
    Heart, Compass, Palette, Users, Target, Map, TrendingUp, 
    FileText, Globe, Mail, Share2, Shield, Briefcase, DollarSign, 
    Percent, Handshake, Zap, Sparkles, Lightbulb, Rocket, Award
} from 'lucide-react';

export default function MyFoundationRoadmap() {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState({
        completed_steps: [],
        step_completion_dates: {},
        notes: {}
    });
    const [loading, setLoading] = useState(true);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [newNote, setNewNote] = useState('');
    const navigate = useNavigate();

    // Organized by entrepreneurial stage
    const stageData = {
        vision: {
            title: 'Vision Stage',
            icon: Lightbulb,
            color: '#F59E0B',
            bgColor: 'bg-amber-50 dark:bg-amber-900/10',
            description: 'Clarify your vision and build your foundation',
            sections: [
                {
                    id: 'define_your_why',
                    icon: Heart,
                    title: 'Define Your WHY',
                    description: 'Discover your deeper purpose and core motivation',
                    color: '#EC4899',
                    link: 'StrategyFormDefineYourWhy',
                    type: 'interactive'
                },
                {
                    id: 'mission_vision',
                    icon: Compass,
                    title: 'Mission & Vision',
                    description: 'Define your purpose and future direction',
                    color: '#3B82F6',
                    link: 'StrategyFormMissionVision',
                    type: 'interactive'
                },
                {
                    id: 'brand_identity',
                    icon: Palette,
                    title: 'Brand Identity',
                    description: 'Define your brand personality and visual identity',
                    color: '#8B5CF6',
                    link: 'StrategyFormBrandIdentity',
                    type: 'interactive'
                },
                {
                    id: 'ideal_client',
                    icon: Users,
                    title: 'Ideal Client Profile',
                    description: 'Define who you serve at a deep level',
                    color: '#3B82F6',
                    link: 'StrategyFormIdealClient',
                    type: 'interactive'
                },
                {
                    id: 'value_proposition',
                    icon: Target,
                    title: 'Value Proposition',
                    description: 'Articulate the unique value you provide',
                    color: '#10B981',
                    link: 'StrategyFormValueProposition',
                    type: 'interactive'
                },
                {
                    id: 'customer_journey',
                    icon: Map,
                    title: 'Customer Journey',
                    description: 'Map every touchpoint from awareness to advocacy',
                    color: '#F97316',
                    link: 'StrategyFormCustomerJourney',
                    type: 'interactive'
                },
                {
                    id: 'value_ladder',
                    icon: TrendingUp,
                    title: 'Value Ladder',
                    description: 'Structure your offerings from entry to premium',
                    color: '#EF4444',
                    link: 'StrategyFormValueLadder',
                    type: 'interactive'
                },
                {
                    id: 'swot',
                    icon: Shield,
                    title: 'SWOT Analysis',
                    description: 'Analyze strengths, weaknesses, opportunities, threats',
                    color: '#F59E0B',
                    link: 'StrategyFormSWOTAnalysis',
                    type: 'interactive'
                },
                {
                    id: 'business_model',
                    icon: Briefcase,
                    title: 'Business Model Canvas',
                    description: 'Map out your complete business model',
                    color: '#6366F1',
                    link: 'StrategyFormBusinessModelCanvas',
                    type: 'interactive'
                },
                {
                    id: 'financial_goal',
                    icon: DollarSign,
                    title: 'Financial Freedom Goal',
                    description: 'Calculate your freedom number and revenue targets',
                    color: '#10B981',
                    link: 'FreedomCalculator',
                    type: 'interactive'
                }
            ]
        },
        startup: {
            title: 'Startup Stage',
            icon: Rocket,
            color: '#3B82F6',
            bgColor: 'bg-blue-50 dark:bg-blue-900/10',
            description: 'Launch and build your business foundation',
            sections: [
                {
                    id: 'content_strategy',
                    icon: FileText,
                    title: 'Content Strategy',
                    description: 'Plan your content creation and distribution',
                    color: '#10B981',
                    link: 'StrategyFormContentStrategy',
                    type: 'interactive'
                },
                {
                    id: 'website_launch',
                    icon: Globe,
                    title: 'Website Launch',
                    description: 'Plan and build your online presence',
                    color: '#06B6D4',
                    link: 'StrategyFormWebsiteLaunch',
                    type: 'interactive'
                },
                {
                    id: 'email_marketing',
                    icon: Mail,
                    title: 'Email Marketing',
                    description: 'Build your email list and nurture relationships',
                    color: '#8B5CF6',
                    link: 'StrategyFormEmailMarketing',
                    type: 'interactive'
                },
                {
                    id: 'social_media_strategy',
                    icon: Share2,
                    title: 'Social Media Strategy',
                    description: 'Build your presence and engage your audience',
                    color: '#EC4899',
                    link: 'StrategyFormSocialMedia',
                    type: 'interactive'
                },
                {
                    id: 'pricing_strategies',
                    icon: DollarSign,
                    title: 'Pricing Strategies',
                    description: 'Set strategic prices that reflect your value',
                    color: '#10B981',
                    link: 'StrategyFormPricingStrategies',
                    type: 'interactive'
                }
            ]
        },
        growth: {
            title: 'Growth Stage',
            icon: TrendingUp,
            color: '#10B981',
            bgColor: 'bg-green-50 dark:bg-green-900/10',
            description: 'Scale and expand your established business',
            sections: [
                {
                    id: 'community_building',
                    icon: Users,
                    title: 'Community Building',
                    description: 'Create an engaged space where your audience connects',
                    color: '#A855F7',
                    link: 'StrategyFormCommunityBuilding',
                    type: 'interactive'
                },
                {
                    id: 'affiliate_program',
                    icon: Percent,
                    title: 'Affiliate Program',
                    description: 'Scale your business through partnerships',
                    color: '#10B981',
                    link: 'StrategyFormAffiliateProgram',
                    type: 'interactive'
                },
                {
                    id: 'strategic_partnerships',
                    icon: Handshake,
                    title: 'Strategic Partnerships',
                    description: 'Accelerate growth through collaboration',
                    color: '#3B82F6',
                    link: 'StrategyFormStrategicPartnerships',
                    type: 'interactive'
                },
                {
                    id: 'automation_systematization',
                    icon: Zap,
                    title: 'Automation & Systems',
                    description: 'Work smarter, not harder—build systems that scale',
                    color: '#F97316',
                    link: 'StrategyFormAutomation',
                    type: 'interactive'
                }
            ]
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const progressData = await FoundationProgress.filter({ created_by: userData.email });
            if (progressData && progressData.length > 0) {
                setProgress(progressData[0]);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim()) return;

        try {
            const sectionNotes = progress.notes[activeSection] || [];
            const updatedNotes = [
                ...sectionNotes,
                {
                    id: Date.now().toString(),
                    content: newNote,
                    created_at: new Date().toISOString()
                }
            ];

            const updatedProgress = {
                ...progress,
                notes: {
                    ...progress.notes,
                    [activeSection]: updatedNotes
                }
            };

            const progressData = await FoundationProgress.filter({ created_by: user.email });
            if (progressData && progressData.length > 0) {
                await FoundationProgress.update(progressData[0].id, updatedProgress);
            } else {
                // If no progress exists, create a new entry.
                // Assuming `user.email` is available and user is logged in.
                await FoundationProgress.create({ ...updatedProgress, created_by: user.email });
            }

            setProgress(updatedProgress);
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const sectionNotes = progress.notes[activeSection] || [];
            const updatedNotes = sectionNotes.filter(note => note.id !== noteId);

            const updatedProgress = {
                ...progress,
                notes: {
                    ...progress.notes,
                    [activeSection]: updatedNotes
                }
            };

            const progressData = await FoundationProgress.filter({ created_by: user.email });
            if (progressData && progressData.length > 0) {
                await FoundationProgress.update(progressData[0].id, updatedProgress);
            }

            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const renderSectionCard = (section) => {
        const isCompleted = progress.completed_steps.includes(section.id);
        const hasNotes = progress.notes[section.id] && progress.notes[section.id].length > 0;
        const Icon = section.icon;

        return (
            <div
                key={section.id}
                className="group bg-white dark:bg-gray-800 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                onClick={() => navigate(createPageUrl(section.link))}
                style={{ borderRadius: '2px' }}
            >
                {/* Top Bar - Thicker and more prominent */}
                <div className="h-1.5" style={{ backgroundColor: section.color }}></div>
                
                {/* Card Content */}
                <div className="p-6">
                    {/* Header with Icon and Status */}
                    <div className="flex items-start justify-between mb-5">
                        <div 
                            className="p-4 transition-transform duration-300 group-hover:scale-110" 
                            style={{ 
                                backgroundColor: section.color + '10',
                                borderRadius: '2px',
                                border: `1px solid ${section.color}20`
                            }}
                        >
                            <Icon className="w-7 h-7" style={{ color: section.color }} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {isCompleted && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" style={{ borderRadius: '2px' }}>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-xs font-semibold text-green-700 dark:text-green-400">Done</span>
                                </div>
                            )}
                            {hasNotes && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveSection(section.id);
                                        setShowNotesModal(true);
                                    }}
                                    className="relative p-2.5 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors border border-transparent hover:border-amber-200"
                                    title="View notes"
                                    style={{ borderRadius: '2px' }}
                                >
                                    <StickyNote className="w-4 h-4 text-amber-600" />
                                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center shadow-sm" style={{ borderRadius: '2px', fontSize: '10px' }}>
                                        {progress.notes[section.id].length}
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-3 leading-tight group-hover:text-[var(--primary-gold)] transition-colors">
                        {section.title}
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-6 leading-relaxed min-h-[40px]">
                        {section.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-gray-700">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(createPageUrl(section.link));
                            }}
                            className="flex-1 px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 text-white"
                            style={{ 
                                backgroundColor: section.color,
                                borderRadius: '2px'
                            }}
                        >
                            {isCompleted ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Review
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Start
                                </>
                            )}
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {!hasNotes && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveSection(section.id);
                                    setShowNotesModal(true);
                                }}
                                className="p-2.5 text-[var(--text-soft)] hover:text-[var(--text-main)] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                                title="Add note"
                                style={{ borderRadius: '2px' }}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    // Calculate total sections across all stages
    const allSections = [
        ...stageData.vision.sections,
        ...stageData.startup.sections,
        ...stageData.growth.sections
    ];
    const totalSections = allSections.length;
    const completionPercentage = Math.round((progress.completed_steps.length / totalSections) * 100);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-3 sm:px-4 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Introduction */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 overflow-hidden" style={{ borderRadius: '2px' }}>
                    {/* Top Accent Bar */}
                    <div className="h-1 bg-[var(--primary-gold)]"></div>
                    
                    <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="p-3 sm:p-4 bg-[var(--primary-gold)]/10 mx-auto sm:mx-0" style={{ borderRadius: '2px' }}>
                                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--primary-gold)]" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-2 sm:mb-3">
                                    My Foundation Roadmap
                                </h1>
                                <p className="text-sm sm:text-base md:text-lg text-[var(--text-soft)] leading-relaxed max-w-4xl">
                                    Your Foundation is the strategic backbone of your entire business. These tools help you clarify your vision, 
                                    define your market position, and create the strategic documents that guide every decision you make. 
                                    Complete these frameworks before diving into your 90-Day Journey for maximum impact.
                                </p>
                            </div>
                        </div>

                        {/* Three Key Benefits */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700" style={{ borderRadius: '2px' }}>
                                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1 text-sm sm:text-base">Strategic Clarity</h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                        Define your WHY, ideal client, and unique value so every business decision becomes clear and aligned.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700" style={{ borderRadius: '2px' }}>
                                <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1 text-sm sm:text-base">Faster Execution</h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                        With your foundation documented, you'll move faster in your 90-Day Journey—no more guessing or second-guessing.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                                <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1 text-sm sm:text-base">Scalable Systems</h3>
                                    <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                        Build a business that can grow without you being a bottleneck. Your foundation becomes your operating manual.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 p-4 sm:p-6" style={{ borderRadius: '2px' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 flex-shrink-0" style={{ borderRadius: '2px' }}>
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-1">Your Progress</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                    {progress.completed_steps.length} of {totalSections} tools completed
                                </p>
                            </div>
                        </div>
                        <div className="text-center sm:text-right">
                            <div className="text-3xl sm:text-4xl font-bold text-[var(--primary-gold)]">
                                {completionPercentage}%
                            </div>
                            <p className="text-xs text-[var(--text-soft)] mt-1 font-medium uppercase tracking-wide">Complete</p>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden" style={{ borderRadius: '2px' }}>
                        <div 
                            className="h-full bg-[var(--primary-gold)] transition-all duration-500"
                            style={{ width: `${completionPercentage}%`, borderRadius: '2px' }}
                        ></div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700 mb-6 sm:mb-8 p-3 sm:p-4" style={{ borderRadius: '2px' }}>
                    <div className="flex items-start gap-2 sm:gap-3">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">All Tools Are Fully Interactive</h4>
                            <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                Click any card to open the dedicated form, fill it out, save your progress, and get AI assistance. 
                                Your data is saved automatically and can be reviewed anytime.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vision Stage */}
                <div className="mb-8 sm:mb-10">
                    <div className={`${stageData.vision.bgColor} border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4`} style={{ borderRadius: '2px' }}>
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
                            <div className="p-2 sm:p-3 mx-auto sm:mx-0" style={{ backgroundColor: stageData.vision.color + '20', borderRadius: '2px' }}>
                                <stageData.vision.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: stageData.vision.color }} />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">{stageData.vision.title}</h2>
                                    <div className="flex md:hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                        <span className="text-lg font-bold text-[var(--text-main)]">
                                            {stageData.vision.sections.filter(s => progress.completed_steps.includes(s.id)).length}
                                        </span>
                                        <span className="text-sm text-[var(--text-soft)]">/ {stageData.vision.sections.length}</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)] mb-3">{stageData.vision.description}</p>
                                <div className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-700 p-3 sm:p-4" style={{ borderRadius: '2px' }}>
                                    <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                                        <strong className="text-[var(--primary-gold)]">Why This Stage Matters:</strong> Before you can build, market, or scale, 
                                        you need clarity. This stage helps you define WHO you are, WHO you serve, and WHAT makes you different. 
                                        These foundational decisions inform everything—from your messaging to your pricing to your product roadmap. 
                                        Skip this, and you'll waste months building the wrong thing for the wrong people.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {stageData.vision.sections.map(section => renderSectionCard(section))}
                    </div>
                </div>

                {/* Startup Stage */}
                <div className="mb-8 sm:mb-10">
                    <div className={`${stageData.startup.bgColor} border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4`} style={{ borderRadius: '2px' }}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3" style={{ backgroundColor: stageData.startup.color + '20', borderRadius: '2px' }}>
                                <stageData.startup.icon className="w-8 h-8" style={{ color: stageData.startup.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">{stageData.startup.title}</h2>
                                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                        <span className="text-lg font-bold text-[var(--text-main)]">
                                            {stageData.startup.sections.filter(s => progress.completed_steps.includes(s.id)).length}
                                        </span>
                                        <span className="text-sm text-[var(--text-soft)]">/ {stageData.startup.sections.length}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--text-soft)] mb-3">{stageData.startup.description}</p>
                                <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 p-4" style={{ borderRadius: '2px' }}>
                                    <p className="text-sm text-[var(--text-main)] leading-relaxed">
                                        <strong className="text-blue-600">Why This Stage Matters:</strong> Now that you know your foundation, it's time to BUILD. 
                                        This stage focuses on creating the marketing infrastructure that attracts and converts customers. Your website becomes your 
                                        24/7 salesperson, your email list becomes your owned audience, and your content strategy positions you as the expert. 
                                        These tools turn your vision into a customer-generating machine.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stageData.startup.sections.map(section => renderSectionCard(section))}
                    </div>
                </div>

                {/* Growth Stage */}
                <div className="mb-8 sm:mb-10">
                    <div className={`${stageData.growth.bgColor} border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4`} style={{ borderRadius: '2px' }}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3" style={{ backgroundColor: stageData.growth.color + '20', borderRadius: '2px' }}>
                                <stageData.growth.icon className="w-8 h-8" style={{ color: stageData.growth.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">{stageData.growth.title}</h2>
                                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                                        <span className="text-lg font-bold text-[var(--text-main)]">
                                            {stageData.growth.sections.filter(s => progress.completed_steps.includes(s.id)).length}
                                        </span>
                                        <span className="text-sm text-[var(--text-soft)]">/ {stageData.growth.sections.length}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[var(--text-soft)] mb-3">{stageData.growth.description}</p>
                                <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 p-4" style={{ borderRadius: '2px' }}>
                                    <p className="text-sm text-[var(--text-main)] leading-relaxed">
                                        <strong className="text-green-600">Why This Stage Matters:</strong> You've built the foundation and launched your business. 
                                        Now it's time to SCALE without burning out. This stage introduces leverage—community for organic reach, affiliates for exponential 
                                        growth, partnerships for instant credibility, and automation to free your time. These tools help you multiply your impact 
                                        while working less, not more. This is how you build a business that runs without you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stageData.growth.sections.map(section => renderSectionCard(section))}
                    </div>
                </div>
            </div>

            {/* Notes Modal */}
            {showNotesModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <StickyNote className="w-5 h-5 text-[var(--primary-gold)]" />
                                <h3 className="text-lg font-bold text-[var(--text-main)]">My Notes</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setShowNotesModal(false);
                                    setActiveSection(null);
                                    setNewNote('');
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                style={{ borderRadius: '2px' }}
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 max-h-[calc(85vh-80px)] overflow-y-auto">
                            {progress.notes[activeSection] && progress.notes[activeSection].length > 0 ? (
                                <div className="space-y-3 mb-6">
                                    {progress.notes[activeSection].map((note) => (
                                        <div key={note.id} className="bg-amber-50 dark:bg-amber-900/10 p-4 border border-amber-200 dark:border-amber-800 flex justify-between items-start gap-3" style={{ borderRadius: '2px' }}>
                                            <p className="text-sm text-[var(--text-main)] flex-1">{note.content}</p>
                                            <button
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 transition-colors flex-shrink-0"
                                                style={{ borderRadius: '2px' }}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 mb-6">
                                    <StickyNote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm text-[var(--text-soft)]">No notes yet. Add your first note below.</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Write your note here..."
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-[var(--primary-gold)] bg-white dark:bg-gray-700 text-[var(--text-main)] placeholder-gray-400 resize-none"
                                    rows="4"
                                    style={{ borderRadius: '2px' }}
                                />
                                <button
                                    onClick={handleAddNote}
                                    disabled={!newNote.trim()}
                                    className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3"
                                    style={{ borderRadius: '2px' }}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}