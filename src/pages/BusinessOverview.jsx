import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Building, Target, Sparkles, ArrowRight, Loader2, Plus, Edit,
    Lightbulb, TrendingUp, Calendar, FileText, DollarSign
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BusinessOverviewPage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [strategyDocs, setStrategyDocs] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            // Fetch user's business
            const businesses = await base44.entities.Business.filter({ owner_user_id: userData.id });
            if (businesses.length > 0) {
                setBusiness(businesses[0]);
            }

            // Fetch key strategy documents for business plan summary
            const docs = await base44.entities.StrategyDocument.filter({});
            const docsMap = {};
            docs.forEach(doc => {
                docsMap[doc.document_type] = doc;
            });
            setStrategyDocs(docsMap);
        } catch (error) {
            console.error("Error loading business overview:", error);
            toast.error("Failed to load business data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    const hasBusinessModel = !!strategyDocs.business_model_canvas;
    const hasValueProp = !!strategyDocs.value_proposition_canvas;
    const hasIdealClient = !!strategyDocs.ideal_client;
    const hasFinancials = false; // Placeholder for future financial data

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)] flex items-center gap-3">
                            <Building className="w-8 h-8 text-[var(--primary-gold)]" />
                            Complete Business Overview
                        </h1>
                        <p className="text-[var(--text-soft)] mt-1">
                            Your centralized business strategy and marketing command center
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={createPageUrl('ElyzetAIAssistants')}>
                            <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90">
                                <Sparkles className="w-4 h-4 mr-2" />
                                AI Assistance
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Core Business Identity */}
                <div className="card p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border-2 border-[var(--primary-gold)]/20">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">Business Identity</h2>
                        {business && (
                            <Link to={createPageUrl('EditBusiness') + `?id=${business.id}`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                    </div>

                    {business ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-[var(--text-soft)] mb-1">Business Name</div>
                                    <div className="text-xl font-bold text-[var(--text-main)]">{business.name}</div>
                                </div>
                                {business.tagline && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Tagline</div>
                                        <div className="text-lg text-[var(--text-main)] italic">"{business.tagline}"</div>
                                    </div>
                                )}
                                {business.description && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Elevator Pitch</div>
                                        <div className="text-[var(--text-main)]">{business.description}</div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {business.industry && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-1">Industry</div>
                                        <div className="text-[var(--text-main)]">{business.industry}</div>
                                    </div>
                                )}
                                {business.services && business.services.length > 0 && (
                                    <div>
                                        <div className="text-sm text-[var(--text-soft)] mb-2">Services Offered</div>
                                        <div className="space-y-2">
                                            {business.services.slice(0, 3).map((service, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-[var(--primary-gold)] mt-0.5" />
                                                    <div>
                                                        <div className="font-medium text-[var(--text-main)]">{service.name}</div>
                                                        {service.description && (
                                                            <div className="text-sm text-[var(--text-soft)]">{service.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-[var(--text-main)] mb-2">No Business Profile Yet</h3>
                            <p className="text-[var(--text-soft)] mb-4">Create your business profile to get started</p>
                            <Link to={createPageUrl('EditBusiness')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Business Profile
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Business Plan Components */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Model */}
                    <Link to={createPageUrl('StrategyFormBusinessModelCanvas')} className="card p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)]">Business Model</h3>
                                    <p className="text-xs text-[var(--text-soft)]">How your business works</p>
                                </div>
                            </div>
                            {hasBusinessModel ? (
                                <Target className="w-5 h-5 text-green-500" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                            )}
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            {hasBusinessModel ? 'Review and refine your business model canvas' : 'Define your value proposition, customers, and revenue streams'}
                        </p>
                        <div className="mt-4 flex items-center text-sm text-[var(--primary-gold)] group-hover:gap-2 transition-all">
                            {hasBusinessModel ? 'View Details' : 'Get Started'}
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Marketing Strategy */}
                    <Link to={createPageUrl('MarketingOverview')} className="card p-6 hover:shadow-lg transition-all border-2 border-[var(--primary-gold)] hover:shadow-[var(--primary-gold)]/20 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-[var(--primary-gold)]/20 p-3 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-[var(--primary-gold)]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)]">Marketing Hub</h3>
                                    <p className="text-xs text-[var(--text-soft)]">Complete marketing strategy</p>
                                </div>
                            </div>
                            <Sparkles className="w-5 h-5 text-[var(--primary-gold)] animate-pulse" />
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            View your 90-day marketing plan, strategy, and messaging templates
                        </p>
                        <div className="mt-4 flex items-center text-sm text-[var(--primary-gold)] font-medium group-hover:gap-2 transition-all">
                            Open Marketing Hub
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Target Market */}
                    <Link to={createPageUrl('StrategyFormIdealClient')} className="card p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                                    <Target className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)]">Target Market</h3>
                                    <p className="text-xs text-[var(--text-soft)]">Who you serve</p>
                                </div>
                            </div>
                            {hasIdealClient ? (
                                <Target className="w-5 h-5 text-green-500" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                            )}
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            {hasIdealClient ? 'Review your ideal client profile' : 'Define your ideal customer demographics and pain points'}
                        </p>
                        <div className="mt-4 flex items-center text-sm text-[var(--primary-gold)] group-hover:gap-2 transition-all">
                            {hasIdealClient ? 'View Profile' : 'Define Target'}
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Financial Projections */}
                    <Link to={createPageUrl('FreedomCalculator')} className="card p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)]">Financial Goals</h3>
                                    <p className="text-xs text-[var(--text-soft)]">Revenue targets</p>
                                </div>
                            </div>
                            {hasFinancials ? (
                                <Target className="w-5 h-5 text-green-500" />
                            ) : (
                                <Plus className="w-5 h-5 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                            )}
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            {hasFinancials ? 'Review your financial projections' : 'Calculate your freedom number and revenue goals'}
                        </p>
                        <div className="mt-4 flex items-center text-sm text-[var(--primary-gold)] group-hover:gap-2 transition-all">
                            {hasFinancials ? 'View Projections' : 'Calculate Goals'}
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Strategy Tools</h4>
                                <p className="text-xs text-[var(--text-soft)]">Complete your foundation</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>

                    <Link to={createPageUrl('SocialMediaPlanner')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Social Planner</h4>
                                <p className="text-xs text-[var(--text-soft)]">Manage your content</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>

                    <Link to={createPageUrl('AnnualPlanning')} className="card p-4 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-[var(--primary-gold)] group-hover:animate-pulse" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Annual Planning</h4>
                                <p className="text-xs text-[var(--text-soft)]">Set your goals</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--primary-gold)]" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}