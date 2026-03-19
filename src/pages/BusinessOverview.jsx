import React, { useState, useEffect, useMemo } from 'react';
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
    Smartphone,
    Map,
    DollarSign,
    Save,
    X,
    Sparkles,
    ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TeamManagementPanel from '@/components/business/TeamManagementPanel';
import TeamTaskBoard from '@/components/business/TeamTaskBoard';
import FoundationRoadmapVisual from '@/components/dashboard/FoundationRoadmapVisual';
import FoundationProgress from '@/components/dashboard/VisionStageProgress';
import ActionCard from '@/components/dashboard/ActionCard';
import BusinessInfoEditor from '@/components/business/BusinessInfoEditor';

export default function BusinessOverview() {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [strategyDocs, setStrategyDocs] = useState({});
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [currentJourney, setCurrentJourney] = useState(null);
    const [annualPlan, setAnnualPlan] = useState(null);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [aboutText, setAboutText] = useState('');
    const [savingAbout, setSavingAbout] = useState(false);
    const [isFoundationOpen, setIsFoundationOpen] = useState(false);
    const [showBusinessEditor, setShowBusinessEditor] = useState(false);

    useEffect(() => {
        loadBusinessOverview();
    }, []);

    const calculateUnitsNeeded = useMemo(() => (product, freedomNumber) => {
        const price = parseFloat(product.price) || 0;
        const cost = parseFloat(product.cost) || 0;
        
        if (!price || price <= 0) return 0;
        
        const costPerUnit = product.costType === 'per_unit' ? cost : 0;
        const fixedMonthlyCost = product.costType === 'monthly_subscription' ? cost : 0;
        const profitPerUnit = price - costPerUnit;
        
        if (profitPerUnit <= 0) return 0;
        
        const targetProfit = freedomNumber + fixedMonthlyCost;
        return Math.ceil(targetProfit / profitPerUnit);
    }, []);

    const loadBusinessOverview = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            // Fetch all data in parallel with proper limits
            // Check if user has a selected business from SwitchBusiness
            const selectedBusinessId = localStorage.getItem('selectedBusinessId');

            const [ownedBusinesses, teamMemberships, allDocs, progress, journeys, plans] = await Promise.all([
                base44.entities.Business.filter({ owner_user_id: currentUser.id }, '-updated_date', 5),
                base44.entities.TeamMember.filter({ email: currentUser.email, status: 'active' }),
                base44.entities.StrategyDocument.filter({ created_by: currentUser.email }, '-updated_date', 20),
                base44.entities.FoundationProgress.filter({ created_by: currentUser.email }, '-updated_date', 1),
                base44.entities.SocialMediaPlan.filter({ created_by: currentUser.email, is_active: true }, '-created_date', 1),
                base44.entities.AnnualPlan.filter({ created_by: currentUser.email }, '-created_date', 5)
            ]);

            // Fetch member businesses
            const memberBusinessIds = teamMemberships
                .map(tm => tm.business_id)
                .filter(id => !ownedBusinesses.find(b => b.id === id));
            const memberBusinesses = await Promise.all(
                memberBusinessIds.map(id => base44.entities.Business.get(id).catch(() => null))
            );
            const allBusinesses = [
                ...ownedBusinesses.map(b => ({ ...b, _userRole: 'owner' })),
                ...memberBusinesses.filter(Boolean).map(b => {
                    const tm = teamMemberships.find(t => t.business_id === b.id);
                    return { ...b, _userRole: tm?.role || 'member' };
                })
            ];

            // Process Business — prefer selected, then first owned, then first member business
            let activeBusiness = null;
            if (selectedBusinessId) {
                activeBusiness = allBusinesses.find(b => b.id === selectedBusinessId) || allBusinesses[0];
            } else {
                activeBusiness = allBusinesses[0];
            }
            if (activeBusiness) {
                setBusiness(activeBusiness);
                setAboutText(activeBusiness.description || '');
            }

            // Process Strategy Documents
            const docsMap = {};
            allDocs.forEach(doc => {
                docsMap[doc.document_type] = doc;
            });
            setStrategyDocs(docsMap);

            // Process Foundation Progress
            if (progress.length > 0) {
                setFoundationProgress(progress[0]);
            }

            // Process Current Journey
            if (journeys.length > 0) {
                setCurrentJourney(journeys[0]);
            }

            // Process Annual Plan
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

    const handleSaveAbout = async () => {
        if (!business) return;
        setSavingAbout(true);
        try {
            await base44.entities.Business.update(business.id, { description: aboutText });
            setBusiness({ ...business, description: aboutText });
            setIsEditingAbout(false);
        } catch (error) {
            console.error('Error saving about section:', error);
        } finally {
            setSavingAbout(false);
        }
    };

    const generateAboutFromStrategy = () => {
        const whyDoc = strategyDocs['define_your_why'];
        const idealClientDoc = strategyDocs['ideal_client'];
        
        let generatedText = '';
        
        if (whyDoc?.content?.why_statement) {
            generatedText += whyDoc.content.why_statement + '\n\n';
        }
        
        if (whyDoc?.content?.core_values && Array.isArray(whyDoc.content.core_values)) {
            generatedText += 'Our Core Values: ' + whyDoc.content.core_values.join(', ') + '.\n\n';
        }
        
        if (idealClientDoc?.content?.problem) {
            generatedText += `We help ${idealClientDoc.content.name || 'our clients'} solve ${idealClientDoc.content.problem}`;
        }
        
        setAboutText(generatedText.trim());
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
        <div className="pb-24 md:pb-8">
            {/* Hero Section with Modern Background */}
            <div 
                className="relative mb-6 md:mb-8 -mx-4 lg:-mx-6"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=500&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '300px'
                }}
            >
                <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-6 md:mb-8">
                        {business?.logo_url && (
                            <img 
                                src={business.logo_url} 
                                alt="Business Logo" 
                                className="w-24 h-24 md:w-32 md:h-32 object-contain bg-white p-[3px] shadow-2xl"
                                style={{ borderRadius: '1px' }}
                            />
                        )}
                        <div className="flex-1 text-white text-center md:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 text-white">
                                {business?.name || user?.business_name || 'Your Business'}
                            </h1>
                            {business?.tagline && (
                                <p className="text-base sm:text-lg md:text-xl text-[var(--primary-gold)] mb-2 md:mb-4">
                                    {business.tagline}
                                </p>
                            )}
                            {business?.industry && (
                                <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6">
                                    <strong>Industry:</strong> {business.industry}
                                </p>
                            )}
                            <Button 
                                onClick={() => setShowBusinessEditor(true)}
                                variant="outline"
                                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                                style={{ borderRadius: '1px' }}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Business Info
                            </Button>
                        </div>
                    </div>

                    {/* Hero Intro */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 max-w-5xl" style={{ borderRadius: '1px' }}>
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3 justify-center md:justify-start">
                            <Briefcase className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[var(--primary-gold)]" />
                            Your Complete Business Command Center
                        </h2>
                        <p className="text-gray-100 text-sm md:text-base leading-relaxed mb-4 md:mb-6 text-center md:text-left">
                            This is your all-in-one business dashboard where strategy meets execution. Everything you need to build, grow, and scale your business is organized here—from your financial goals and strategic framework to team collaboration and daily operations.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                            <div className="flex items-start gap-2 md:gap-3">
                                <div className="bg-[var(--primary-gold)] p-1.5 md:p-2 flex-shrink-0" style={{ borderRadius: '1px' }}>
                                    <Target className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Strategic Clarity</h3>
                                    <p className="text-[10px] md:text-xs text-gray-200">See your complete business strategy</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 md:gap-3">
                                <div className="bg-blue-500 p-1.5 md:p-2 flex-shrink-0" style={{ borderRadius: '1px' }}>
                                    <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Team Alignment</h3>
                                    <p className="text-[10px] md:text-xs text-gray-200">Collaborate with your team</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 md:gap-3">
                                <div className="bg-green-500 p-1.5 md:p-2 flex-shrink-0" style={{ borderRadius: '1px' }}>
                                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1 text-sm md:text-base">Growth Tracking</h3>
                                    <p className="text-[10px] md:text-xs text-gray-200">Monitor your progress</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4">

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <ActionCard
                    title="Annual Strategy"
                    description="Plan your year and quarterly goals"
                    icon={Calendar}
                    link="AnnualPlanning"
                    color="from-indigo-500 to-purple-600"
                />
                <ActionCard
                    title="Marketing Hub"
                    description="Your complete marketing strategy and social plan"
                    icon={TrendingUp}
                    link="MarketingOverview"
                    color="from-yellow-500 to-orange-600"
                />
                <ActionCard
                    title="Business Overview"
                    description="Financial goals, products, and strategy"
                    icon={Briefcase}
                    link="BusinessOverview"
                    color="from-gray-500 to-slate-600"
                />
            </div>

            {/* About Our Business - Editable */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[var(--primary-gold)] flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        About Our Business
                    </h2>
                    {!isEditingAbout && (
                        <Button 
                            onClick={() => setIsEditingAbout(true)} 
                            variant="outline" 
                            size="sm"
                            style={{ borderRadius: '1px' }}
                        >
                            <Edit className="w-3 h-3 mr-2" />
                            Edit
                        </Button>
                    )}
                </div>

                {isEditingAbout ? (
                    <div className="space-y-4">
                        {(strategyDocs['define_your_why'] || strategyDocs['ideal_client']) && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 p-3" style={{ borderRadius: '1px' }}>
                                <p className="text-sm text-[var(--text-soft)] mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                    Want to auto-generate from your Why and Core Values?
                                </p>
                                <Button 
                                    onClick={generateAboutFromStrategy}
                                    size="sm"
                                    variant="outline"
                                    style={{ borderRadius: '1px' }}
                                >
                                    <Sparkles className="w-3 h-3 mr-2" />
                                    Generate from Strategy
                                </Button>
                            </div>
                        )}
                        <textarea
                            value={aboutText}
                            onChange={(e) => setAboutText(e.target.value)}
                            placeholder="Describe your business, what you do, who you serve, and what makes you unique..."
                            className="w-full h-40 form-input resize-none"
                            style={{ borderRadius: '1px' }}
                        />
                        <div className="flex gap-2 justify-end">
                            <Button 
                                onClick={() => {
                                    setIsEditingAbout(false);
                                    setAboutText(business?.description || '');
                                }}
                                variant="outline"
                                size="sm"
                                style={{ borderRadius: '1px' }}
                            >
                                <X className="w-3 h-3 mr-2" />
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSaveAbout}
                                disabled={savingAbout}
                                size="sm"
                                style={{ borderRadius: '1px' }}
                            >
                                {savingAbout ? (
                                    <>
                                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-3 h-3 mr-2" />
                                        Save
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {aboutText ? (
                            <p className="text-[var(--text-soft)] leading-relaxed mb-4 whitespace-pre-wrap">{aboutText}</p>
                        ) : (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600" style={{ borderRadius: '1px' }}>
                                <p className="text-sm text-[var(--text-soft)] mb-3">Tell visitors about your business</p>
                                <Button 
                                    onClick={() => setIsEditingAbout(true)}
                                    size="sm"
                                    style={{ borderRadius: '1px' }}
                                >
                                    <Edit className="w-3 h-3 mr-2" />
                                    Add About Section
                                </Button>
                            </div>
                        )}
                        {business && (
                            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-soft)] pt-4 border-t border-gray-200 dark:border-gray-700">
                                {business.public_email && (
                                    <span><strong>Email:</strong> {business.public_email}</span>
                                )}
                                {business.public_phone && (
                                    <span><strong>Phone:</strong> {business.public_phone}</span>
                                )}
                                {business.city && (
                                    <span><strong>Location:</strong> {business.city}</span>
                                )}
                                {business.website_url && (
                                    <a href={business.website_url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-gold)] hover:underline">
                                        <strong>Website</strong>
                                    </a>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Freedom Number & Products - Dedicated Section */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <div className="mb-6 pb-4 border-b-2 border-[var(--primary-gold)]">
                    <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                        <DollarSign className="w-7 h-7 text-green-600" />
                        Freedom Number & Revenue Strategy
                    </h2>
                    <p className="text-[var(--text-soft)] leading-relaxed mb-3">
                        Your Freedom Number is the exact monthly revenue you need to achieve financial independence. It's calculated from your personal expenses, desired salary, business costs, and a safety buffer. Below, you'll see how many units or subscriptions of each product/service you need to sell monthly to reach your Freedom Number—turning your financial goal into a clear, actionable sales target.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4" style={{ borderRadius: '1px' }}>
                        <p className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-600" />
                            Real-World Example
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            A fitness coach calculated her Freedom Number at $8,000/month. She offers 1-on-1 coaching ($500/session) and a group program ($97/month). To hit her target, she needs either 16 private clients OR 83 group members OR a mix—like 8 private clients + 42 group members. This clarity helps her focus marketing efforts and set realistic monthly sales goals.
                        </p>
                    </div>
                </div>

                {/* Financial Overview */}
                {user?.financial_projections ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {/* Monthly Freedom Number */}
                            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 p-4 text-center" style={{ borderRadius: '1px' }}>
                                <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-2">Monthly Freedom Number</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                                    ${parseInt(user.financial_projections.freedomNumber || 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-green-600/70 mt-1">Your revenue target</p>
                            </div>

                            {/* Personal & Lifestyle */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 p-4" style={{ borderRadius: '1px' }}>
                                <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-2">Personal & Lifestyle</p>
                                <div className="space-y-1">
                                    {user.financial_projections.monthlyExpenses && (
                                        <div className="text-xs text-[var(--text-soft)]">
                                            Expenses: ${parseInt(user.financial_projections.monthlyExpenses).toLocaleString()}
                                        </div>
                                    )}
                                    {user.financial_projections.desiredSalary && (
                                        <div className="text-xs text-[var(--text-soft)]">
                                            Desired Salary: ${parseInt(user.financial_projections.desiredSalary).toLocaleString()}
                                        </div>
                                    )}
                                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-500 pt-1 border-t border-blue-200 dark:border-blue-800">
                                        Subtotal: ${parseInt((user.financial_projections.monthlyExpenses || 0) + (user.financial_projections.desiredSalary || 0)).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Business Operations */}
                            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 p-4" style={{ borderRadius: '1px' }}>
                                <p className="text-xs text-purple-700 dark:text-purple-400 font-semibold mb-2">Business Operations</p>
                                <div className="space-y-1">
                                    {user.financial_projections.businessExpenses && (
                                        <div className="text-xs text-[var(--text-soft)]">
                                            Monthly Expenses: ${parseInt(user.financial_projections.businessExpenses).toLocaleString()}
                                        </div>
                                    )}
                                    {user.financial_projections.emergencyBuffer && (
                                        <div className="text-xs text-[var(--text-soft)]">
                                            Buffer: {user.financial_projections.emergencyBuffer}%
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Products & Sales Targets */}
                        {user.financial_projections.products && user.financial_projections.products.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Your Products & Monthly Sales Targets</h3>
                                    <Link to={createPageUrl('FreedomCalculator')}>
                                        <Button variant="outline" size="sm" style={{ borderRadius: '1px' }}>
                                            <Edit className="w-3 h-3 mr-2" />
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {user.financial_projections.products.map((product, idx) => {
                                        const unitsNeeded = calculateUnitsNeeded(product, user.financial_projections.freedomNumber || 0);
                                        return (
                                            <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all" style={{ borderRadius: '1px' }}>
                                                <h4 className="font-bold mb-2 text-[var(--text-main)]">{product.name}</h4>
                                                {product.description && (
                                                    <p className="text-xs text-[var(--text-soft)] mb-3 leading-relaxed">
                                                        {product.description}
                                                    </p>
                                                )}
                                                <div className="bg-white dark:bg-gray-900 p-3 mb-3" style={{ borderRadius: '1px' }}>
                                                    <p className="text-xs text-[var(--text-soft)] mb-1">Current Price</p>
                                                    <p className="text-2xl font-bold text-[var(--primary-gold)]">${product.price}</p>
                                                </div>
                                                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-3" style={{ borderRadius: '1px' }}>
                                                    <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-1">Monthly Sales Target</p>
                                                    <p className="text-xl font-bold text-blue-600 dark:text-blue-500">
                                                        {unitsNeeded.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-blue-600/70 mt-1">
                                                        {product.pricingType === 'monthly_subscription' ? 'subscribers needed' : 'units to sell'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-[var(--text-soft)] mb-4">Set up your Freedom Number and products to see your revenue strategy</p>
                        <Link to={createPageUrl('FreedomCalculator')}>
                            <Button className="btn-primary" style={{ borderRadius: '1px' }}>
                                <DollarSign className="w-4 h-4 mr-2" />
                                Calculate Freedom Number
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Core Business Identity */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <div className="mb-6 pb-4 border-b-2 border-[var(--primary-gold)]">
                    <h2 className="text-2xl font-bold mb-3">
                        Core Business Identity
                    </h2>
                    <p className="text-[var(--text-soft)] leading-relaxed mb-3">
                        Your business identity is the foundation of everything you do. It defines who you are, what you stand for, and how customers perceive you. This section contains your brand essence, ideal client profile, and value proposition—the core elements that differentiate you from competitors and attract your perfect customers.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4" style={{ borderRadius: '1px' }}>
                        <p className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600" />
                            Real-World Example
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            Nike's core identity isn't just selling shoes—it's about inspiring athletes. Their "Just Do It" tagline, swoosh logo, and focus on high-performing individuals create a clear identity that attracts their ideal customers. Similarly, your brand identity and ideal client profile work together to attract the right people to your business.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="mb-6 pb-4 border-b-2 border-[var(--primary-gold)]">
                    <h2 className="text-2xl font-bold mb-3">
                        Strategic Framework
                    </h2>
                    <p className="text-[var(--text-soft)] leading-relaxed mb-3">
                        Your strategic framework is the blueprint for how your business operates and competes. It includes your business model, SWOT analysis, value ladder, and competitive positioning. This framework helps you understand your market position, identify opportunities, and create multiple revenue streams.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4" style={{ borderRadius: '1px' }}>
                        <p className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-600" />
                            Real-World Example
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            Amazon started by selling books but used a strategic framework to expand into a marketplace, cloud computing (AWS), and streaming services. Their business model canvas showed multiple revenue streams, while their value ladder moved customers from low-cost products to high-value Prime memberships. Your strategic framework creates this same clarity for growth opportunities.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="mb-6 pb-4 border-b-2 border-[var(--primary-gold)]">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold">Customer Journey Map</h2>
                        {strategyDocs['customer_journey']?.is_completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-[var(--text-soft)] leading-relaxed mb-3">
                        Your customer journey map shows every touchpoint from awareness to purchase and beyond. Understanding this journey helps you create better marketing, improve conversions, and deliver exceptional experiences at each stage. It's your roadmap for turning strangers into loyal advocates.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4" style={{ borderRadius: '1px' }}>
                        <p className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-green-600" />
                            Real-World Example
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            Starbucks mastered the customer journey: Awareness (store on every corner), Consideration (enticing aromas and displays), Purchase (mobile ordering for convenience), Experience (personalized drinks and cozy atmosphere), and Loyalty (rewards program). Each stage is optimized to move customers forward. Your journey map creates this same intentional experience.
                        </p>
                    </div>
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
                <div className="mb-6 pb-4 border-b-2 border-[var(--primary-gold)]">
                    <h2 className="text-2xl font-bold mb-3">
                        Active Journeys & Plans
                    </h2>
                    <p className="text-[var(--text-soft)] leading-relaxed mb-3">
                        Your active journeys and plans are where strategy becomes action. This section tracks your 90-day business journey, foundation roadmap progress, and annual strategic plans. It's the bridge between your long-term vision and daily execution, keeping you focused on what matters most.
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4" style={{ borderRadius: '1px' }}>
                        <p className="text-sm font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            Real-World Example
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            Elon Musk famously breaks down SpaceX's ambitious goals into quarterly milestones and weekly sprints. Their "90-day plans" focus on specific rocket launches or manufacturing targets, while their annual vision guides the company toward Mars. Your journeys work the same way—breaking your big vision into achievable 90-day sprints with weekly actions.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                        <p className="font-semibold text-sm uppercase">{user.selected_goal || currentJourney.source_name}</p>
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
                                    {user?.financial_projections?.freedomNumber && (
                                        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 p-3" style={{ borderRadius: '1px' }}>
                                            <p className="text-xs text-green-700 dark:text-green-400 mb-1 font-semibold">Financial Target</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-bold text-lg text-green-600 dark:text-green-500">
                                                    ${(parseInt(user.financial_projections.freedomNumber) * 12).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-green-600 dark:text-green-400">/ year</span>
                                            </div>
                                            <p className="text-xs text-green-600/80 mt-1">Based on your Freedom Number</p>
                                        </div>
                                    )}
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
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

            {/* Business Milestones */}
            {business && (
                <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[var(--primary-gold)]">
                        Business Milestones & Strategic Goals
                    </h2>
                    <TeamTaskBoard business={business} currentUser={user} />
                </div>
            )}

            {/* Team Management Section */}
            {business && (
                <TeamManagementPanel business={business} />
            )}

            {/* Foundation Roadmap Accordion */}
            <div className="card p-6 mb-6" style={{ borderRadius: '1px' }}>
                <button 
                    onClick={() => setIsFoundationOpen(!isFoundationOpen)}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3" style={{ borderRadius: '1px' }}>
                            <Map className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">My Foundation Roadmap</h2>
                            <p className="text-sm text-[var(--text-soft)]">Essential strategy tools for building a strong business foundation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to={createPageUrl('MyFoundationRoadmap')} onClick={(e) => e.stopPropagation()}>
                            <Button variant="outline" size="sm" style={{ borderRadius: '1px' }}>
                                View All
                            </Button>
                        </Link>
                        <ChevronDown className={`w-5 h-5 text-[var(--text-soft)] transition-transform ${isFoundationOpen ? 'rotate-180' : ''}`} />
                    </div>
                </button>
                {isFoundationOpen && (
                    <div className="mt-6">
                        <FoundationRoadmapVisual user={user} />
                    </div>
                )}
            </div>

            {/* Foundation Progress */}
            <FoundationProgress user={user} />

            {/* Business Info Editor Modal */}
            {showBusinessEditor && (
                <BusinessInfoEditor
                    business={business}
                    onSave={() => {
                        setShowBusinessEditor(false);
                        loadBusinessOverview();
                    }}
                    onCancel={() => setShowBusinessEditor(false)}
                />
            )}
        </div>
        </div>
    );
}