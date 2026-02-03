import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { 
    Loader2, 
    Briefcase, 
    Target, 
    Users, 
    Lightbulb, 
    Edit, 
    CheckCircle, 
    Calendar,
    TrendingUp,
    Heart,
    Palette,
    FileText,
    ArrowRight,
    Apple,
    Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BusinessOverview() {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [currentJourney, setCurrentJourney] = useState(null);
    const [annualPlan, setAnnualPlan] = useState(null);

    useEffect(() => {
        loadBusinessOverview();
    }, []);

    const loadBusinessOverview = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            // Fetch Business
            const businesses = await base44.entities.Business.filter({ owner_user_id: currentUser.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
            }

            // Fetch all Strategy Documents
            const allDocs = await base44.entities.StrategyDocument.filter({ created_by: currentUser.email });
            const docsMap = {};
            allDocs.forEach(doc => {
                docsMap[doc.document_type] = doc;
            });
            setStrategyDocs(docsMap);

            // Fetch Foundation Progress
            const progress = await base44.entities.FoundationProgress.filter({ created_by: currentUser.email });
            if (progress.length > 0) {
                setFoundationProgress(progress[0]);
            }

            // Fetch Current Journey
            const journeys = await base44.entities.SocialMediaPlan.filter({ 
                created_by: currentUser.email, 
                is_active: true 
            });
            if (journeys.length > 0) {
                setCurrentJourney(journeys[0]);
            }

            // Fetch Annual Plan
            const plans = await base44.entities.AnnualPlan.filter({ created_by: currentUser.email });
            if (plans.length > 0) {
                const activePlan = plans.find(p => p.status === 'active') || plans[0];
                setAnnualPlan(activePlan);
            }

        } catch (error) {
            console.error('Error loading business overview:', error);
        } finally {
            setLoading(false);
        }
    };

    const StrategyCard = ({ title, icon: Icon, document, formPage, color }) => {
        const isComplete = !!document && document.is_completed;
        const hasContent = !!document;

        return (
            <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`bg-gradient-to-br ${color} p-2`} style={{ borderRadius: '1px' }}>
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-sm">{title}</span>
                    </div>
                    {isComplete && <CheckCircle className="w-4 h-4 text-green-600" />}
                </div>
                {hasContent ? (
                    <div className="space-y-3">
                        <div className="text-sm text-[var(--text-soft)] bg-gray-50 dark:bg-gray-800 p-3 max-h-32 overflow-y-auto leading-relaxed" style={{ borderRadius: '1px' }}>
                            {renderStrategyContent(document)}
                        </div>
                        <Link to={createPageUrl(formPage)}>
                            <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                <Edit className="w-3 h-3 mr-2" />
                                Edit
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-sm text-[var(--text-soft)] mb-3">Not completed yet</p>
                        <Link to={createPageUrl(formPage)}>
                            <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                <FileText className="w-3 h-3 mr-2" />
                                Complete Now
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    const renderStrategyContent = (doc) => {
        if (!doc || !doc.content) return 'No content available';

        const content = doc.content;
        const type = doc.document_type;

        switch (type) {
            case 'ideal_client':
                return (
                    <div>
                        <p><strong>Name:</strong> {content.name || 'N/A'}</p>
                        <p><strong>Age:</strong> {content.age || 'N/A'}</p>
                        <p><strong>Problem:</strong> {content.problem?.slice(0, 100) || 'N/A'}...</p>
                    </div>
                );
            case 'business_model_canvas':
                return (
                    <div>
                        <p><strong>Value Proposition:</strong> {content.value_propositions || 'N/A'}</p>
                        <p><strong>Customer Segments:</strong> {content.customer_segments || 'N/A'}</p>
                    </div>
                );
            case 'value_proposition_canvas':
                return (
                    <div>
                        <p><strong>Products/Services:</strong> {content.products_services || 'N/A'}</p>
                        <p><strong>Gain Creators:</strong> {content.gain_creators || 'N/A'}</p>
                    </div>
                );
            default:
                return JSON.stringify(content).slice(0, 150) + '...';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8">
            {/* Header - Business Card Style */}
            <div className="card p-8 mb-6 border-2 border-[var(--primary-gold)]" style={{ borderRadius: '1px' }}>
                <div className="text-center mb-8">
                    {business?.logo_url && (
                        <img 
                            src={business.logo_url} 
                            alt="Business Logo" 
                            className="w-24 h-24 mx-auto mb-4 object-contain"
                            style={{ borderRadius: '1px' }}
                        />
                    )}
                    <h1 className="text-4xl font-bold mb-3">
                        {business?.name || user?.business_name || 'Your Business'}
                    </h1>
                    {business?.tagline && (
                        <p className="text-xl text-[var(--primary-gold)] font-semibold mb-4">
                            {business.tagline}
                        </p>
                    )}
                    {business?.industry && (
                        <p className="text-[var(--text-soft)] mb-4">
                            <strong>Industry:</strong> {business.industry}
                        </p>
                    )}
                </div>

                {/* Business Description */}
                {business?.description && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800" style={{ borderRadius: '1px' }}>
                        <h2 className="text-lg font-bold mb-2 text-[var(--primary-gold)]">About Our Business</h2>
                        <p className="text-[var(--text-soft)] leading-relaxed">{business.description}</p>
                    </div>
                )}

                {/* Services */}
                {business?.services && business.services.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-[var(--primary-gold)]">Services & Products</h2>
                            <Link to={createPageUrl('EditBusiness')}>
                                <Button variant="outline" size="sm" style={{ borderRadius: '1px' }}>
                                    <Edit className="w-3 h-3 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {business.services.map((service, idx) => (
                                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" style={{ borderRadius: '1px' }}>
                                    <h3 className="font-semibold mb-2 text-sm">{service.name}</h3>
                                    {service.description && (
                                        <p className="text-xs text-[var(--text-soft)] mb-2">
                                            {service.description.slice(0, 40)}{service.description.length > 40 ? '...' : ''}
                                        </p>
                                    )}
                                    {service.price && (
                                        <p className="text-lg font-bold text-[var(--primary-gold)]">{service.price}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {(!business?.services || business.services.length === 0) && (
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-3 text-[var(--primary-gold)]">Services & Products</h2>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center" style={{ borderRadius: '1px' }}>
                            <p className="text-sm text-[var(--text-soft)] mb-3">No services or products added yet</p>
                            <Link to={createPageUrl('EditBusiness')}>
                                <Button size="sm" className="btn-primary" style={{ borderRadius: '1px' }}>
                                    <FileText className="w-3 h-3 mr-2" />
                                    Add Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Contact Information */}
                <div className="flex flex-wrap gap-4 justify-center text-sm text-[var(--text-soft)]">
                    {business?.public_email && (
                        <span><strong>Email:</strong> {business.public_email}</span>
                    )}
                    {business?.public_phone && (
                        <span><strong>Phone:</strong> {business.public_phone}</span>
                    )}
                    {business?.city && (
                        <span><strong>Location:</strong> {business.city}</span>
                    )}
                    {business?.website_url && (
                        <a href={business.website_url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-gold)] hover:underline">
                            <strong>Website</strong>
                        </a>
                    )}
                </div>
            </div>

            {/* Core Business Identity */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                    Core Business Identity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Your Why */}
                    <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2" style={{ borderRadius: '1px' }}>
                                    <Lightbulb className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-sm">Your Why</span>
                            </div>
                            {strategyDocs['ideal_client']?.is_completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        {strategyDocs['ideal_client'] && strategyDocs['ideal_client'].content?.why ? (
                            <div className="space-y-3">
                                <div className="text-sm text-[var(--text-soft)] bg-gray-50 dark:bg-gray-800 p-3 leading-relaxed" style={{ borderRadius: '1px' }}>
                                    {strategyDocs['ideal_client'].content.why}
                                </div>
                                <Link to={createPageUrl('StrategyFormDefineYourWhy')}>
                                    <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                        <Edit className="w-3 h-3 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-[var(--text-soft)] mb-3">Not completed yet</p>
                                <Link to={createPageUrl('StrategyFormDefineYourWhy')}>
                                    <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                        <FileText className="w-3 h-3 mr-2" />
                                        Complete Now
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Ideal Client */}
                    <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2" style={{ borderRadius: '1px' }}>
                                    <Users className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-sm">Ideal Client</span>
                            </div>
                            {strategyDocs['ideal_client']?.is_completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        {strategyDocs['ideal_client'] && strategyDocs['ideal_client'].content?.name ? (
                            <div className="space-y-3">
                                <div className="text-sm bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                    <p className="text-xs text-[var(--text-soft)] mb-1">Client Name</p>
                                    <p className="font-bold text-lg text-[var(--primary-gold)] mb-3">{strategyDocs['ideal_client'].content.name}</p>
                                    {strategyDocs['ideal_client'].content.age && (
                                        <p className="text-sm text-[var(--text-soft)] mb-1"><strong>Age:</strong> {strategyDocs['ideal_client'].content.age}</p>
                                    )}
                                    {strategyDocs['ideal_client'].content.problem && (
                                        <p className="text-sm text-[var(--text-soft)] leading-relaxed"><strong>Problem:</strong> {strategyDocs['ideal_client'].content.problem.slice(0, 100)}...</p>
                                    )}
                                </div>
                                <Link to={createPageUrl('StrategyFormIdealClient')}>
                                    <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                        <Edit className="w-3 h-3 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-[var(--text-soft)] mb-3">Not completed yet</p>
                                <Link to={createPageUrl('StrategyFormIdealClient')}>
                                    <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                        <FileText className="w-3 h-3 mr-2" />
                                        Complete Now
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    <StrategyCard
                        title="Brand Identity"
                        icon={Palette}
                        document={strategyDocs['brand_kit']}
                        formPage="StrategyFormBrandKit"
                        color="from-purple-500 to-pink-600"
                    />
                </div>
            </div>

            {/* Strategic Framework */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                    Strategic Framework
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StrategyCard
                        title="Business Model Canvas"
                        icon={Briefcase}
                        document={strategyDocs['business_model_canvas']}
                        formPage="StrategyFormBusinessModelCanvas"
                        color="from-green-500 to-emerald-600"
                    />
                    
                    {/* Value Proposition - Full View */}
                    <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2" style={{ borderRadius: '1px' }}>
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-bold text-sm">Value Proposition</span>
                            </div>
                            {strategyDocs['value_proposition_canvas']?.is_completed && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        {strategyDocs['value_proposition_canvas'] && strategyDocs['value_proposition_canvas'].content ? (
                            <div className="space-y-3">
                                <div className="text-sm text-[var(--text-soft)] bg-gray-50 dark:bg-gray-800 p-3 max-h-48 overflow-y-auto leading-relaxed space-y-2" style={{ borderRadius: '1px' }}>
                                    {strategyDocs['value_proposition_canvas'].content.customer_jobs && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Customer Jobs:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.customer_jobs}</p>
                                        </div>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].content.pains && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Pains:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.pains}</p>
                                        </div>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].content.gains && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Gains:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.gains}</p>
                                        </div>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].content.products_services && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Products & Services:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.products_services}</p>
                                        </div>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].content.pain_relievers && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Pain Relievers:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.pain_relievers}</p>
                                        </div>
                                    )}
                                    {strategyDocs['value_proposition_canvas'].content.gain_creators && (
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-1">Gain Creators:</p>
                                            <p className="text-xs">{strategyDocs['value_proposition_canvas'].content.gain_creators}</p>
                                        </div>
                                    )}
                                </div>
                                <Link to={createPageUrl('StrategyFormValueProposition')}>
                                    <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                        <Edit className="w-3 h-3 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm text-[var(--text-soft)] mb-3">Not completed yet</p>
                                <Link to={createPageUrl('StrategyFormValueProposition')}>
                                    <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                        <FileText className="w-3 h-3 mr-2" />
                                        Complete Now
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Customer Journey Map */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                    <h2 className="text-2xl font-bold">Customer Journey Map</h2>
                    {strategyDocs['customer_journey']?.is_completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                {strategyDocs['customer_journey'] && strategyDocs['customer_journey'].content?.stages ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            {strategyDocs['customer_journey'].content.stages.map((stage, idx) => (
                                <div key={idx} className="border border-gray-200 dark:border-gray-700 p-3" style={{ borderRadius: '1px' }}>
                                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-2 text-center mb-2" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs font-bold">{stage.name || `Stage ${idx + 1}`}</p>
                                    </div>
                                    {stage.touchpoints && stage.touchpoints.length > 0 && (
                                        <div className="text-xs text-[var(--text-soft)]">
                                            <p className="font-semibold mb-1">Touchpoints:</p>
                                            <ul className="list-disc list-inside">
                                                {stage.touchpoints.slice(0, 2).map((tp, i) => (
                                                    <li key={i} className="truncate">{tp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Link to={createPageUrl('StrategyFormCustomerJourney')}>
                            <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                <Edit className="w-3 h-3 mr-2" />
                                Edit Customer Journey
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-sm text-[var(--text-soft)] mb-4">Map out your customer's journey from awareness to advocacy</p>
                        <Link to={createPageUrl('StrategyFormCustomerJourney')}>
                            <Button size="sm" className="btn-primary" style={{ borderRadius: '1px' }}>
                                <FileText className="w-3 h-3 mr-2" />
                                Create Customer Journey
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Active Journeys & Plans */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                    Active Journeys & Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current 90-Day Journey */}
                    <div className="border border-gray-200 dark:border-gray-700 p-4" style={{ borderRadius: '1px' }}>
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-[var(--primary-gold)]" />
                            Current 90-Day Journey
                        </h3>
                        <div>
                            {currentJourney && user ? (
                                <div className="space-y-3">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Current Goal</p>
                                        <p className="font-semibold text-sm">{currentJourney.source_name}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Stage</p>
                                        <p className="font-semibold text-sm capitalize">{user.entrepreneurship_stage}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Current Week</p>
                                        <p className="font-semibold text-sm">
                                            Week {user.journey_current_week || 1} of 12
                                        </p>
                                    </div>
                                    <Link to={createPageUrl('Journey')}>
                                        <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                            <ArrowRight className="w-3 h-3 mr-2" />
                                            View Journey
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-3">No active journey</p>
                                    <Link to={createPageUrl('Journey')}>
                                        <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                            <Target className="w-3 h-3 mr-2" />
                                            Start Journey
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Annual Plan */}
                    <div className="border border-gray-200 dark:border-gray-700 p-4" style={{ borderRadius: '1px' }}>
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[var(--primary-gold)]" />
                            Annual Strategy
                        </h3>
                        <div>
                            {annualPlan ? (
                                <div className="space-y-3">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Year</p>
                                        <p className="font-semibold text-sm">{annualPlan.year}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                                        <p className="text-xs text-[var(--text-soft)] mb-1">Theme</p>
                                        <p className="font-semibold text-sm">{annualPlan.title}</p>
                                    </div>
                                    <Link to={createPageUrl('AnnualPlanning')}>
                                        <Button variant="outline" size="sm" className="w-full" style={{ borderRadius: '1px' }}>
                                            <ArrowRight className="w-3 h-3 mr-2" />
                                            View Plan
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-3">No annual plan created</p>
                                    <Link to={createPageUrl('AnnualPlanning')}>
                                        <Button size="sm" className="btn-primary w-full" style={{ borderRadius: '1px' }}>
                                            <Calendar className="w-3 h-3 mr-2" />
                                            Create Plan
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Growth Hubs */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                    Growth Hubs & Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to={createPageUrl('MyFoundationRoadmap')}>
                        <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all cursor-pointer h-full text-center" style={{ borderRadius: '1px' }}>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 inline-block mb-3" style={{ borderRadius: '1px' }}>
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold mb-2 text-sm">Foundation Roadmap</h3>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                {foundationProgress?.completed_steps?.length || 0} tools completed
                            </p>
                            <Button variant="outline" size="sm" className="w-full text-xs" style={{ borderRadius: '1px' }}>
                                View Roadmap
                            </Button>
                        </div>
                    </Link>

                    <Link to={createPageUrl('MarketingOverview')}>
                        <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all cursor-pointer h-full text-center" style={{ borderRadius: '1px' }}>
                            <div className="bg-orange-100 dark:bg-orange-900 p-3 inline-block mb-3" style={{ borderRadius: '1px' }}>
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                            </div>
                            <h3 className="font-bold mb-2 text-sm">Marketing Hub</h3>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                Your complete marketing strategy
                            </p>
                            <Button variant="outline" size="sm" className="w-full text-xs" style={{ borderRadius: '1px' }}>
                                View Hub
                            </Button>
                        </div>
                    </Link>

                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                        <div className="border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all cursor-pointer h-full text-center" style={{ borderRadius: '1px' }}>
                            <div className="bg-purple-100 dark:bg-purple-900 p-3 inline-block mb-3" style={{ borderRadius: '1px' }}>
                                <Briefcase className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-bold mb-2 text-sm">AI Assistants</h3>
                            <p className="text-xs text-[var(--text-soft)] mb-3">
                                Your business support team
                            </p>
                            <Button variant="outline" size="sm" className="w-full text-xs" style={{ borderRadius: '1px' }}>
                                View Team
                            </Button>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Community Integration */}
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700 p-6" style={{ borderRadius: '1px' }}>
                <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 inline-block mb-4" style={{ borderRadius: '1px' }}>
                        <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You're Part of The Business Minds Community!</h3>
                    <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                        Connect with fellow entrepreneurs, share your journey, get feedback, and grow together.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a 
                            href="https://thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ borderRadius: '1px' }}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Desktop Community
                        </a>
                        <a 
                            href="https://apps.apple.com/us/app/the-business-minds/id6742644847" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ borderRadius: '1px' }}
                        >
                            <Apple className="w-4 h-4 mr-2" />
                            iOS App
                        </a>
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.thebusinessminds.wl&hl=en_IN" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ borderRadius: '1px' }}
                        >
                            <Smartphone className="w-4 h-4 mr-2" />
                            Android App
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}