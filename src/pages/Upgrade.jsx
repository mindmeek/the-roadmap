
import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Crown, Check, Zap, Users, Brain, BarChart, Calendar, Shield, Sparkles, Rocket, Globe, TrendingUp, Search, Smartphone, Code, Lock } from 'lucide-react';

export default function UpgradePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const isHQMember = user?.subscription_level === 'business_hq';

    const handleUpgradeClick = () => {
        window.location.href = 'https://thebusinessminds.com/signup-form';
    };

    const hqFeatures = [
        { icon: Brain, text: "Unlimited AI Assistant Access" },
        { icon: Users, text: "Private Business Minds Community" },
        { icon: BarChart, text: "Complete Strategy Toolkit (9+ Tools)" },
        { icon: Calendar, text: "Advanced Journey & Roadmap System" },
        { icon: Shield, text: "Priority Support" },
        { icon: Sparkles, text: "Weekly Live Group Coaching" },
        { icon: Rocket, text: "All-in-One CRM & Marketing Automation" },
        { icon: TrendingUp, text: "Advanced Analytics & Reporting" },
        { icon: Globe, text: "Website & Funnel Builder" },
        { icon: Users, text: "Client Management System" },
        { icon: Calendar, text: "Appointment Scheduling" },
        { icon: Check, text: "Email & SMS Marketing Tools" }
    ];

    const addons = [
        {
            id: 'wordpress_hosting',
            name: 'WordPress Hosting',
            price: '$20/month',
            description: 'Professional WordPress hosting with automatic updates, security, and backups',
            icon: Globe,
            benefits: ['99.9% uptime guarantee', 'Automatic WordPress updates', 'Daily backups', 'Free SSL certificate', '24/7 security monitoring']
        },
        {
            id: 'seo_tools',
            name: 'SEO Tools Suite',
            price: '$97/month',
            description: 'Comprehensive SEO toolkit to boost your search rankings and drive organic traffic',
            icon: Search,
            benefits: ['Keyword research & tracking', 'Competitor analysis', 'Site audits & recommendations', 'Backlink monitoring', 'Rank tracking', 'Content optimization']
        },
        {
            id: 'mobile_app',
            name: 'Private Community Mobile App',
            price: '$99/month',
            description: 'Create your own branded mobile app for your private community members',
            icon: Smartphone,
            benefits: ['iOS & Android apps', 'Custom branding', 'Push notifications', 'Member engagement tools', 'Analytics dashboard']
        }
    ];

    const services = [
        {
            id: 'platform_setup',
            name: 'Platform Setup & 5-Page Website',
            price: '$799 one-time',
            description: 'We build your complete platform and professional 5-page website using our drag-and-drop builder',
            icon: Zap,
            benefits: ['Complete HQ platform configuration', 'Professional 5-page website', 'Mobile-responsive design', 'SEO-optimized', 'Contact forms & integrations', '2 rounds of revisions', 'Done in 7-10 business days']
        },
        {
            id: 'custom_website',
            name: 'Custom Website + Full Setup',
            price: '$2,500 one-time',
            description: 'Premium custom website design with complete platform setup and branding',
            icon: Code,
            benefits: ['Custom-designed website (unlimited pages)', 'Complete brand identity integration', 'Advanced functionality & features', 'Full HQ platform setup', 'E-commerce integration (if needed)', 'Premium support & training', 'Ongoing consultation', 'Done in 14-21 business days']
        }
    ];

    if (loading) {
        return (
            <div className="px-4 pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="card p-8 text-center">
                        <div className="animate-pulse text-[var(--text-soft)]">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-main)]">
                        {isHQMember ? 'Supercharge Your HQ' : 'Upgrade to The Business Minds HQ'}
                    </h1>
                    <p className="text-xl text-[var(--text-soft)] max-w-3xl mx-auto">
                        {isHQMember 
                            ? 'Add powerful tools and expert services to accelerate your growth even further'
                            : 'Get everything you need to build, launch, and scale your business—all in one powerful platform'
                        }
                    </p>
                </div>

                {/* Main HQ Plan (if not already a member) */}
                {!isHQMember && (
                    <div className="card p-8 md:p-12 bg-gradient-to-br from-black to-gray-900 text-white border-4 border-[var(--primary-gold)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[var(--primary-gold)] text-black px-6 py-2 font-bold transform rotate-12 translate-x-8 -translate-y-2">
                            BEST VALUE
                        </div>
                        
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--primary-gold)] rounded-full mb-4">
                                <Crown className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">The Business Minds HQ</h2>
                            <p className="text-gray-300 text-lg mb-6">Your All-in-One Business Growth Platform</p>
                            
                            <div className="flex items-baseline justify-center mb-4">
                                <span className="text-6xl font-bold">$99</span>
                                <span className="text-2xl text-gray-400 ml-2">/month</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-8">Everything you need to succeed, one simple price</p>

                            <button 
                                onClick={handleUpgradeClick}
                                className="btn btn-primary text-lg px-12 py-4 inline-flex items-center"
                            >
                                <Rocket className="w-5 h-5 mr-2" />
                                Upgrade to The HQ Now
                            </button>
                            <p className="text-sm text-gray-400 mt-4">⚡ Use code <strong className="text-[var(--primary-gold)]">LAUNCH30</strong> for 30% off your first month</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            {hqFeatures.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-start space-x-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                                        <Icon className="w-5 h-5 text-[var(--primary-gold)] flex-shrink-0 mt-1" />
                                        <span className="text-sm">{feature.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                            <p className="text-gray-300 text-lg font-semibold mb-4">Plus, you get instant access to:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <Users className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-2" />
                                    <p className="font-semibold">Private Community</p>
                                    <p className="text-gray-400">Network with 1,000+ entrepreneurs</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <Calendar className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-2" />
                                    <p className="font-semibold">Weekly Live Coaching</p>
                                    <p className="text-gray-400">Get expert guidance every week</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <Shield className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-2" />
                                    <p className="font-semibold">Priority Support</p>
                                    <p className="text-gray-400">Fast response times when you need help</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add-ons Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2 text-[var(--text-main)]">
                            {isHQMember ? 'Available Add-ons' : 'Powerful Add-ons'}
                        </h2>
                        <p className="text-[var(--text-soft)]">
                            {isHQMember 
                                ? 'Enhance your HQ with specialized tools and services'
                                : 'Unlock pricing and availability by upgrading to The HQ first'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {addons.map((addon) => {
                            const Icon = addon.icon;
                            return (
                                <div key={addon.id} className="card p-6 hover:shadow-xl transition-shadow relative">
                                    {!isHQMember && (
                                        <div className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center text-xs font-semibold text-[var(--text-soft)]">
                                            <Lock className="w-3 h-3 mr-1" />
                                            HQ Only
                                        </div>
                                    )}
                                    <div className="bg-gray-100 dark:bg-gray-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-7 h-7 text-[var(--primary-gold)]" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-[var(--text-main)]">{addon.name}</h3>
                                    {isHQMember ? (
                                        <p className="text-2xl font-bold text-[var(--primary-gold)] mb-3">{addon.price}</p>
                                    ) : (
                                        <div className="mb-3">
                                            <p className="text-lg font-bold text-gray-400 flex items-center">
                                                <Lock className="w-4 h-4 mr-2" />
                                                Pricing Available After Upgrade
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-[var(--text-soft)] mb-4">{addon.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {addon.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start text-sm text-[var(--text-soft)]">
                                                <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        className="btn btn-secondary w-full"
                                        disabled={!isHQMember}
                                        onClick={!isHQMember ? handleUpgradeClick : undefined} // Keep existing functionality or redirect if not HQ member
                                    >
                                        {isHQMember ? 'Add to My HQ' : 'Upgrade to HQ First'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Expert Services Section */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2 text-[var(--text-main)]">
                            {isHQMember ? 'Expert Done-For-You Services' : 'Done-For-You Services'}
                        </h2>
                        <p className="text-[var(--text-soft)]">
                            {isHQMember
                                ? 'Let our experts build it for you—save time and launch faster'
                                : 'Unlock service pricing by upgrading to The HQ first'
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <div key={service.id} className="card p-8 hover:shadow-xl transition-shadow relative">
                                    {!isHQMember && (
                                        <div className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center text-xs font-semibold text-[var(--text-soft)]">
                                            <Lock className="w-3 h-3 mr-1" />
                                            HQ Only
                                        </div>
                                    )}
                                    <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-[var(--text-main)]">{service.name}</h3>
                                    {isHQMember ? (
                                        <p className="text-3xl font-bold text-[var(--primary-gold)] mb-3">{service.price}</p>
                                    ) : (
                                        <div className="mb-3">
                                            <p className="text-xl font-bold text-gray-400 flex items-center">
                                                <Lock className="w-5 h-5 mr-2" />
                                                Pricing Available After Upgrade
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-[var(--text-soft)] mb-6">{service.description}</p>
                                    <ul className="space-y-2 mb-6">
                                        {service.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start text-[var(--text-soft)]">
                                                <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        className="btn btn-primary w-full text-lg"
                                        disabled={!isHQMember}
                                        onClick={!isHQMember ? handleUpgradeClick : undefined} // Keep existing functionality or redirect if not HQ member
                                    >
                                        {isHQMember ? 'Get Started' : 'Upgrade to HQ First'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ or Guarantee Section */}
                <div className="card p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <h3 className="text-2xl font-bold mb-4 text-center text-[var(--text-main)]">30-Day Money-Back Guarantee</h3>
                    <p className="text-center text-[var(--text-soft)] max-w-2xl mx-auto">
                        Try The Business Minds HQ risk-free for 30 days. If you're not completely satisfied with the platform, 
                        we'll refund your money—no questions asked. We're confident you'll love the results.
                    </p>
                </div>

                {/* CTA Footer */}
                {!isHQMember && (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold mb-4 text-[var(--text-main)]">Ready to Transform Your Business?</h3>
                        <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                            Join thousands of entrepreneurs who are building, scaling, and succeeding with The Business Minds HQ.
                        </p>
                        <button 
                            onClick={handleUpgradeClick}
                            className="btn btn-primary text-lg px-12 py-4 inline-flex items-center"
                        >
                            <Crown className="w-5 h-5 mr-2" />
                            Start Your HQ Membership Today
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
