import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Briefcase, TrendingUp, Sparkles, LayoutDashboard, Target, Users, ArrowRight, CheckCircle, Building, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function MyBusinessHub() {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        strategyToolsCompleted: 0,
        totalStrategyTools: 6,
        hasFinancialGoal: false,
        hasSocialMediaPlan: false
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            const [businesses, docs, socialPlans] = await Promise.all([
                base44.entities.Business.filter({ owner_user_id: userData.id }, '-updated_date', 1),
                base44.entities.StrategyDocument.filter({}, '-updated_date', 20),
                base44.entities.SocialMediaPlan.filter({ is_active: true }, '-created_date', 1)
            ]);

            if (businesses.length > 0) setBusiness(businesses[0]);

            const completedTools = docs.filter(d => d.is_completed).length;
            setStats({
                strategyToolsCompleted: completedTools,
                totalStrategyTools: 6,
                hasFinancialGoal: !!(userData.financial_projections?.freedomNumber),
                hasSocialMediaPlan: socialPlans.length > 0
            });
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 md:p-6 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Hero Section */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-br from-black via-gray-900 to-black text-white border-2 border-[var(--primary-gold)]" style={{ borderRadius: '2px' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-[var(--primary-gold)] p-4 rounded-full">
                            <Briefcase className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Business & Marketing Hub</h1>
                    <p className="text-white/80 max-w-2xl mx-auto mb-6">
                        Your command center for business strategy, marketing execution, and growth tracking. 
                        Everything you need to build, market, and scale your business is organized here.
                    </p>
                    
                    {!loading && (
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-sm text-white/70">Strategy Tools:</span>
                                <span className="text-lg font-bold text-[var(--primary-gold)] ml-2">
                                    {stats.strategyToolsCompleted}/{stats.totalStrategyTools}
                                </span>
                            </div>
                            {stats.hasFinancialGoal && (
                                <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-green-300">Financial Goal Set</span>
                                </div>
                            )}
                            {stats.hasSocialMediaPlan && (
                                <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-blue-300">Social Plan Active</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Hub Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Overview Hub */}
                    <Link to={createPageUrl('BusinessOverview')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)]" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="bg-gradient-to-br from-gray-800 to-black p-3 rounded-lg group-hover:scale-110 transition-transform">
                                        <Briefcase className="h-6 w-6 text-[var(--primary-gold)]" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold mt-4">Business Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Your complete business command center—financial goals, strategic framework, team management, and core business identity.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Freedom Number & Revenue Targets</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Ideal Client & Value Proposition</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Customer Journey Map</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Team Collaboration & Milestones</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Foundation Roadmap Progress</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Marketing Hub */}
                    <Link to={createPageUrl('MarketingOverview')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)]" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="bg-gradient-to-br from-[#8B6F4E] to-[#A88A6B] p-3 rounded-lg group-hover:scale-110 transition-transform">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold mt-4">Marketing Hub</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Your complete marketing roadmap—from strategy planning to content creation, social media, email campaigns, and paid advertising.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-pink-600" />
                                        <span>90-Day Social Media Plan</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-pink-600" />
                                        <span>Website & Email Messaging</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-pink-600" />
                                        <span>AI Content Generation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-pink-600" />
                                        <span>Paid Advertising Strategy</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-pink-600" />
                                        <span>Campaign Performance Tracking</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Quick Actions Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to={createPageUrl('ElyzetAIAssistants')}>
                        <Card className="hover:shadow-lg transition-all group cursor-pointer h-full bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <Sparkles className="h-5 w-5 text-purple-600" />
                                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">AI Assistants</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Get instant strategy help and content generation
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to={createPageUrl('AnnualPlanning')}>
                        <Card className="hover:shadow-lg transition-all group cursor-pointer h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Annual Strategy</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Set yearly vision and quarterly objectives
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <a href="https://app.thebminds.com" target="_blank" rel="noopener noreferrer">
                        <Card className="hover:shadow-lg transition-all group cursor-pointer h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <Building className="h-5 w-5 text-green-600" />
                                    <ArrowRight className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">The Business Minds HQ</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Execute your strategies with automation tools
                                </p>
                            </CardContent>
                        </Card>
                    </a>
                </div>

                {/* What You'll Find Section */}
                <div className="card p-6" style={{ borderRadius: '2px' }}>
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-6 text-center">What You'll Find Here</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-[var(--primary-gold)]" />
                                In Business Overview
                            </h3>
                            <ul className="space-y-2 text-sm text-[var(--text-soft)]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Freedom Number & revenue targets</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Core business identity & brand kit</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Customer journey mapping</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Team collaboration & milestones</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Foundation roadmap progress</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-[var(--text-main)] flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-[var(--primary-gold)]" />
                                In Marketing Hub
                            </h3>
                            <ul className="space-y-2 text-sm text-[var(--text-soft)]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>90-day social media strategy</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Website & email messaging templates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Content calendar & post ideas</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>Paid advertising roadmap</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-gold)] font-bold">•</span>
                                    <span>AI-powered content generation</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to={createPageUrl('BusinessOverview')}>
                        <Button className="w-full h-full py-6 bg-black hover:bg-gray-900 text-white text-lg" style={{ borderRadius: '2px' }}>
                            <Briefcase className="w-5 h-5 mr-2" />
                            Go to Business Overview
                        </Button>
                    </Link>

                    <Link to={createPageUrl('MarketingOverview')}>
                        <Button className="w-full h-full py-6 bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 text-white text-lg" style={{ borderRadius: '2px' }}>
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Go to Marketing Hub
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}