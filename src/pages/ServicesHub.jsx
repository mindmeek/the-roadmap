import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Share2, Target, Briefcase, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ServicesHub() {
    const services = [
        {
            title: "Social Media Management",
            description: "All-inclusive social media management with dedicated account managers, 90-day growth plans, and monthly strategy calls.",
            icon: Share2,
            link: "SocialMediaServices",
            color: "from-pink-500 to-rose-600",
            bgColor: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
            borderColor: "border-pink-200 dark:border-pink-700",
            features: [
                "Quick onboarding process",
                "No long-term contracts",
                "Community management included",
                "Monthly analytics & reporting"
            ]
        },
        {
            title: "Paid Advertising Packages",
            description: "Drive traffic, generate leads, and maximize conversions with expert-managed Meta and Google ad campaigns.",
            icon: Target,
            link: "AdvertisingServices",
            color: "from-purple-500 to-indigo-600",
            bgColor: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
            borderColor: "border-purple-200 dark:border-purple-700",
            features: [
                "Dedicated ad specialist",
                "Weekly optimization",
                "No hidden costs or commissions",
                "3-5x average ROAS"
            ]
        },
        {
            title: "My Active Services",
            description: "Track and manage your active Done-For-You projects. View progress, communicate with your team, and access deliverables.",
            icon: Briefcase,
            link: "DfyServices",
            color: "from-gray-700 to-gray-900",
            bgColor: "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
            borderColor: "border-gray-200 dark:border-gray-700",
            features: [
                "Real-time project tracking",
                "Direct team communication",
                "Milestone notifications",
                "All deliverables in one place"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 md:p-6 pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Hero Section */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-br from-[var(--primary-gold)] via-yellow-600 to-orange-600 text-white border-2 border-yellow-400" style={{ borderRadius: '2px' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <Briefcase className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Done-For-You Services</h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg">
                        Professional marketing services to help you grow faster. 
                        From social media management to paid advertising—we handle it, you focus on your business.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link key={idx} to={createPageUrl(service.link)}>
                                <Card className={`hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 bg-gradient-to-br ${service.bgColor} ${service.borderColor}`} style={{ borderRadius: '2px' }}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`bg-gradient-to-br ${service.color} p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-[var(--text-soft)] leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <div className="space-y-2">
                                            {service.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-soft)]">
                                                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Why Choose Us Section */}
                <div className="card p-6" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">Why Our Services Stand Out</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-fit mx-auto mb-3">
                                <CheckCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-[var(--text-main)] mb-2">Results-Focused</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                We don't just execute—we optimize for growth, conversions, and ROI.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-fit mx-auto mb-3">
                                <Sparkles className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-[var(--text-main)] mb-2">Expert Team</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                9+ years of experience managing successful social media and ad campaigns.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit mx-auto mb-3">
                                <Target className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-[var(--text-main)] mb-2">No Contracts</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Cancel anytime. We earn your business every single month.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700" style={{ borderRadius: '2px' }}>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                            Ready to Accelerate Your Growth?
                        </h3>
                        <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                            Let our expert team handle your marketing while you focus on what you do best—running your business.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link to={createPageUrl('SocialMediaServices')}>
                                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    View Social Media Packages
                                </Button>
                            </Link>
                            <Link to={createPageUrl('AdvertisingServices')}>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    <Target className="w-4 h-4 mr-2" />
                                    View Advertising Packages
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="text-center text-sm text-[var(--text-soft)]">
                    Questions? Email us at{' '}
                    <a href="mailto:team@thebminds.com" className="text-[var(--primary-gold)] hover:underline font-medium">
                        team@thebminds.com
                    </a>
                </div>
            </div>
        </div>
    );
}