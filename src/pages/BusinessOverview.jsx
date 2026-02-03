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
            <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                            <div className={`bg-gradient-to-br ${color} p-2 rounded-lg`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span>{title}</span>
                        </div>
                        {isComplete && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {hasContent ? (
                        <div className="space-y-3">
                            <div className="text-sm text-[var(--text-soft)] bg-gray-50 dark:bg-gray-800 p-3 rounded-lg max-h-32 overflow-y-auto">
                                {renderStrategyContent(document)}
                            </div>
                            <Link to={createPageUrl(formPage)}>
                                <Button variant="outline" size="sm" className="w-full">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-sm text-[var(--text-soft)] mb-3">Not completed yet</p>
                            <Link to={createPageUrl(formPage)}>
                                <Button size="sm" className="btn-primary">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Complete Now
                                </Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
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
        <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 rounded-full mb-4">
                    <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-2">
                    {business?.name || user?.business_name || 'Your Business'} Overview
                </h1>
                <p className="text-[var(--text-soft)] text-lg">
                    A complete snapshot of your strategic business foundation
                </p>
            </div>

            {/* Core Business Identity */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Core Business Identity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StrategyCard
                        title="Your Why"
                        icon={Lightbulb}
                        document={strategyDocs['ideal_client']}
                        formPage="StrategyFormDefineYourWhy"
                        color="from-yellow-500 to-orange-600"
                    />
                    <StrategyCard
                        title="Brand Identity"
                        icon={Palette}
                        document={strategyDocs['brand_kit']}
                        formPage="StrategyFormBrandKit"
                        color="from-purple-500 to-pink-600"
                    />
                    <StrategyCard
                        title="Ideal Client"
                        icon={Users}
                        document={strategyDocs['ideal_client']}
                        formPage="StrategyFormIdealClient"
                        color="from-blue-500 to-indigo-600"
                    />
                </div>
            </div>

            {/* Strategic Framework */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-[var(--primary-gold)]" />
                    Strategic Framework
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StrategyCard
                        title="Business Model Canvas"
                        icon={Briefcase}
                        document={strategyDocs['business_model_canvas']}
                        formPage="StrategyFormBusinessModelCanvas"
                        color="from-green-500 to-emerald-600"
                    />
                    <StrategyCard
                        title="Value Proposition"
                        icon={TrendingUp}
                        document={strategyDocs['value_proposition_canvas']}
                        formPage="StrategyFormValueProposition"
                        color="from-indigo-500 to-purple-600"
                    />
                    <StrategyCard
                        title="Customer Journey"
                        icon={ArrowRight}
                        document={strategyDocs['customer_journey']}
                        formPage="StrategyFormCustomerJourney"
                        color="from-pink-500 to-rose-600"
                    />
                </div>
            </div>

            {/* Active Journeys & Plans */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Active Journeys & Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current 90-Day Journey */}
                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-[var(--primary-gold)]" />
                                Current 90-Day Journey
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {currentJourney ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-[var(--text-soft)]">Goal</p>
                                        <p className="font-semibold">{currentJourney.source_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--text-soft)]">Type</p>
                                        <p className="font-semibold capitalize">{currentJourney.source_type}</p>
                                    </div>
                                    <Link to={createPageUrl('Journey')}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <ArrowRight className="w-4 h-4 mr-2" />
                                            View Journey
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-3">No active journey</p>
                                    <Link to={createPageUrl('Journey')}>
                                        <Button size="sm" className="btn-primary">
                                            <Target className="w-4 h-4 mr-2" />
                                            Start Journey
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Annual Plan */}
                    <Card className="hover:shadow-lg transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Annual Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {annualPlan ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-[var(--text-soft)]">Year</p>
                                        <p className="font-semibold">{annualPlan.year}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--text-soft)]">Theme</p>
                                        <p className="font-semibold">{annualPlan.title}</p>
                                    </div>
                                    <Link to={createPageUrl('AnnualPlanning')}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <ArrowRight className="w-4 h-4 mr-2" />
                                            View Plan
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-[var(--text-soft)] mb-3">No annual plan created</p>
                                    <Link to={createPageUrl('AnnualPlanning')}>
                                        <Button size="sm" className="btn-primary">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Create Plan
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Growth Hubs */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    Growth Hubs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                            <CardContent className="pt-6 text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full inline-block mb-3">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold mb-2">Foundation Roadmap</h3>
                                <p className="text-sm text-[var(--text-soft)] mb-3">
                                    {foundationProgress?.completed_steps?.length || 0} tools completed
                                </p>
                                <Button variant="outline" size="sm" className="w-full">
                                    View Roadmap
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to={createPageUrl('MarketingOverview')}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                            <CardContent className="pt-6 text-center">
                                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full inline-block mb-3">
                                    <TrendingUp className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="font-bold mb-2">Marketing Hub</h3>
                                <p className="text-sm text-[var(--text-soft)] mb-3">
                                    Your complete marketing strategy
                                </p>
                                <Button variant="outline" size="sm" className="w-full">
                                    View Hub
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                            <CardContent className="pt-6 text-center">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full inline-block mb-3">
                                    <Briefcase className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-bold mb-2">AI Assistants</h3>
                                <p className="text-sm text-[var(--text-soft)] mb-3">
                                    Your business support team
                                </p>
                                <Button variant="outline" size="sm" className="w-full">
                                    View Team
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Community Integration */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full inline-block mb-4">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">You're Part of The Business Minds Community!</h3>
                        <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                            Connect with fellow entrepreneurs, share your journey, get feedback, and grow together.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a 
                                href="https://thebminds.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Desktop Community
                            </a>
                            <a 
                                href="https://apps.apple.com/us/app/the-business-minds/id6742644847" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <Apple className="w-4 h-4 mr-2" />
                                iOS App
                            </a>
                            <a 
                                href="https://play.google.com/store/apps/details?id=com.thebusinessminds.wl&hl=en_IN" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <Smartphone className="w-4 h-4 mr-2" />
                                Android App
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}