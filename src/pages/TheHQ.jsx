import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Rocket, Star, Zap, Target, TrendingUp, Users, CheckCircle, Globe, Calendar, MessageSquare, BarChart2, Mail, Phone, DollarSign, FileText, ShoppingCart, Settings, Smartphone, Wrench, Clock, Palette } from 'lucide-react';

export default function TheHQPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                // Not logged in
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-gold)]"></div>
            </div>
        );
    }

    // Show upgrade CTA for free users
    if (user?.subscription_level === 'free') {
        return (
            <div className="px-4 pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="card p-8 md:p-12 bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 text-white text-center" style={{ borderRadius: '2px' }}>
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <Rocket className="w-16 h-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Business Minds HQ</h1>
                        <p className="text-xl md:text-2xl mb-6 opacity-90">Your Complete Business Operating System</p>
                        <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
                            Everything you need to run, grow, and scale your business—all in one platform. From CRM to marketing automation, websites to workflows, The HQ handles it all so you can focus on what matters most.
                        </p>
                        <a
                            href="https://thebusinessminds.com/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100 text-lg px-8 py-4 inline-flex items-center shadow-xl"
                        >
                            <Rocket className="w-5 h-5 mr-2" />
                            Upgrade to The HQ Now - $99/month
                        </a>
                    </div>

                    {/* Problems & Solutions */}
                    <div className="card p-8" style={{ borderRadius: '2px' }}>
                        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-2 text-center">Stop Juggling Multiple Tools</h2>
                        <p className="text-center text-[var(--text-soft)] mb-8 text-lg">The HQ replaces 10+ expensive tools with one seamless platform</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-2 border-red-200 dark:border-red-800">
                                <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4 flex items-center">
                                    ❌ Without The HQ
                                </h3>
                                <ul className="space-y-3 text-sm text-[var(--text-soft)]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>Paying for 5+ separate tools (CRM, email, website, scheduler, invoicing) = $300+/month</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>Manually copying data between platforms—wasting hours every week</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>Leads falling through cracks because nothing talks to each other</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>Learning curves for every new tool—never becoming truly efficient</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span>Looking unprofessional with mismatched branding across platforms</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
                                <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-4 flex items-center">
                                    ✅ With The HQ
                                </h3>
                                <ul className="space-y-3 text-sm text-[var(--text-soft)]">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>One platform, one login, one price ($99/month replaces $300+)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Automatic data sync—contacts, deals, conversations all connected</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>No lead left behind with unified pipeline tracking and follow-ups</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Master one powerful system instead of 10 mediocre ones</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>Consistent, professional brand experience everywhere</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Complete Feature List */}
                    <div className="card p-8" style={{ borderRadius: '2px' }}>
                        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-8 text-center">Everything You Get with The HQ</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Full CRM & Pipeline</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Track every contact, deal, and conversation. Never lose a lead again.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Mail className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Email & SMS Marketing</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Automated campaigns, drip sequences, and broadcast messaging.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Globe className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Website & Funnel Builder</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Drag-and-drop editor for stunning sites and high-converting funnels.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Calendar className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Appointment Scheduling</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Automated booking, reminders, and calendar sync.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Phone className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Two-Way Texting</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Text your clients directly from the platform with your business number.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg flex-shrink-0">
                                    <MessageSquare className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Unified Inbox</h3>
                                    <p className="text-sm text-[var(--text-soft)]">All messages (email, SMS, FB, IG) in one place.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                                <div className="bg-pink-100 dark:bg-pink-900/50 p-3 rounded-lg flex-shrink-0">
                                    <DollarSign className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Invoicing & Payments</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Send invoices, collect payments, track revenue.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-lg flex-shrink-0">
                                    <BarChart2 className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Analytics & Reporting</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Track performance, ROI, and growth metrics in real-time.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Zap className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Workflow Automation</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Build automated processes that run your business on autopilot.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                                <div className="bg-cyan-100 dark:bg-cyan-900/50 p-3 rounded-lg flex-shrink-0">
                                    <FileText className="w-6 h-6 text-cyan-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Forms & Surveys</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Capture leads and feedback with custom forms.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                                <div className="bg-violet-100 dark:bg-violet-900/50 p-3 rounded-lg flex-shrink-0">
                                    <ShoppingCart className="w-6 h-6 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">E-commerce & Products</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Sell products, courses, and services with built-in checkout.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                                <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Users className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Client Portal</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Give clients a branded space to access files, invoices, and updates.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                                <div className="bg-lime-100 dark:bg-lime-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Settings className="w-6 h-6 text-lime-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">White-Label Options</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Customize the platform with your branding (available on higher tiers).</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                                <div className="bg-rose-100 dark:bg-rose-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Smartphone className="w-6 h-6 text-rose-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Mobile App</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Run your business from anywhere with iOS and Android apps.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                                <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Star className="w-6 h-6 text-sky-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Reputation Management</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Request and manage reviews to build social proof.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Clock className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Task & Project Management</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Organize your work and collaborate with your team.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                                <div className="bg-fuchsia-100 dark:bg-fuchsia-900/50 p-3 rounded-lg flex-shrink-0">
                                    <Palette className="w-6 h-6 text-fuchsia-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Custom Branding</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Match every page and email to your brand colors and logo.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex-shrink-0">
                                    <Wrench className="w-6 h-6 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--text-main)] mb-1">Integrations</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Connect with Zapier, Stripe, Google, and 1000+ tools.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROI Section */}
                    <div className="card p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800" style={{ borderRadius: '2px' }}>
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">The ROI is Obvious</h2>
                        
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[var(--primary-gold)] mb-2">$300+</div>
                                <p className="text-sm text-[var(--text-soft)]">Typical monthly cost for separate tools</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">$99</div>
                                <p className="text-sm text-[var(--text-soft)]">The HQ monthly cost</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">$200+</div>
                                <p className="text-sm text-[var(--text-soft)]">You save every month</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-green-200 dark:border-green-800">
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-4">What You Get at $99/month:</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Unlimited contacts & leads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Unlimited emails & texts</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Unlimited websites & funnels</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Unlimited pipelines & deals</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Mobile app access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-[var(--text-soft)]">Full support & training</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="card p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black text-white text-center" style={{ borderRadius: '2px' }}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
                        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Join thousands of entrepreneurs who are building, scaling, and running their businesses with The Business Minds HQ.
                        </p>
                        <a
                            href="https://thebusinessminds.com/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 text-white text-lg px-10 py-5 inline-flex items-center shadow-2xl text-xl font-bold"
                        >
                            <Rocket className="w-6 h-6 mr-3" />
                            Get Started with The HQ - $99/month
                        </a>
                        <p className="mt-6 text-sm opacity-75">No contracts. Cancel anytime. 14-day money-back guarantee.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show embedded HQ for HQ members
    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                    <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
                        <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                            <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-main)]">The Business Minds HQ</h1>
                            <p className="text-[var(--text-soft)] text-base md:text-lg">Your all-in-one business growth platform</p>
                        </div>
                    </div>
                </div>

                {/* Embedded HQ */}
                <div className="card p-4" style={{ borderRadius: '2px' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">Access The HQ Platform</h2>
                        <a 
                            href="https://app.thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary text-sm"
                        >
                            Open in New Tab
                        </a>
                    </div>
                    <div style={{ height: '800px', width: '100%' }} className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <iframe
                            src="https://app.thebminds.com"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="The Business Minds HQ"
                            allow="fullscreen"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}