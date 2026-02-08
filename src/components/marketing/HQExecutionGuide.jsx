import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Share2, Mail, BarChart, FileText, Sparkles, Phone, MessageSquare, 
    Globe, Palette, Video, Instagram, Facebook, Linkedin, ArrowRight,
    CheckCircle, Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HQExecutionGuide({ user, hasStrategy = false }) {
    const executionAreas = [
        {
            category: 'Social Media Management',
            icon: Share2,
            color: 'from-pink-500 to-rose-600',
            strategyLink: 'SocialMediaPlanner',
            strategyLabel: 'Plan Your Content',
            features: [
                {
                    title: 'Multi-Platform Publishing',
                    description: 'Post to 9+ platforms simultaneously: Instagram, Facebook, TikTok, LinkedIn, YouTube, Pinterest, Google My Business, Bluesky, Threads, and your private community',
                    icon: Globe
                },
                {
                    title: 'Custom Per-Platform Messaging',
                    description: 'Select which platforms to post to and customize the message for each one to match platform best practices',
                    icon: MessageSquare
                },
                {
                    title: 'Content Calendar & Scheduling',
                    description: 'Schedule posts in advance, manage your content calendar, and maintain consistency across all channels',
                    icon: Calendar
                }
            ]
        },
        {
            category: 'Email Marketing & Automation',
            icon: Mail,
            color: 'from-blue-500 to-indigo-600',
            strategyLink: 'MyFoundationRoadmap',
            strategyLabel: 'Build Email Strategy',
            features: [
                {
                    title: 'Complete Email Platform',
                    description: 'Send campaigns, build sequences, manage subscribers, and track opens/clicks all in one place',
                    icon: Mail
                },
                {
                    title: 'AI Email Copywriter',
                    description: 'Generate high-converting email copy, subject lines, and CTAs using AI trained on your brand voice',
                    icon: Sparkles
                },
                {
                    title: 'Marketing Automation',
                    description: 'Set up automated email sequences, triggers, and workflows to nurture leads on autopilot',
                    icon: Zap
                }
            ]
        },
        {
            category: 'Websites & Landing Pages',
            icon: FileText,
            color: 'from-purple-500 to-violet-600',
            strategyLink: 'MyFoundationRoadmap',
            strategyLabel: 'Plan Your Content',
            features: [
                {
                    title: 'Unlimited Landing Pages',
                    description: 'Create high-converting landing pages for every campaign using thousands of professional templates or AI generation',
                    icon: FileText
                },
                {
                    title: 'AI Website Builder',
                    description: 'Build complete websites with AI assistance—from homepage to contact page, all optimized for conversions',
                    icon: Sparkles
                },
                {
                    title: 'Integrated Blogging Platform',
                    description: 'Publish blog posts, optimize for SEO, and drive organic traffic directly from The HQ',
                    icon: FileText
                }
            ]
        },
        {
            category: 'Paid Advertising',
            icon: BarChart,
            color: 'from-green-500 to-emerald-600',
            strategyLink: 'AdvertisingServices',
            strategyLabel: 'Plan Ad Strategy',
            features: [
                {
                    title: 'Multi-Platform Ad Management',
                    description: 'Run and manage ads on Google, Facebook, and LinkedIn all from one dashboard',
                    icon: BarChart
                },
                {
                    title: 'Campaign Tracking & Analytics',
                    description: 'Monitor ad performance, ROI, and conversions across all platforms in real-time',
                    icon: TrendingUp
                },
                {
                    title: 'Budget Optimization',
                    description: 'Automatically optimize ad spend across platforms to maximize returns',
                    icon: DollarSign
                }
            ]
        },
        {
            category: 'Communication & Engagement',
            icon: MessageSquare,
            color: 'from-yellow-500 to-orange-600',
            strategyLink: 'MyFoundationRoadmap',
            strategyLabel: 'Build Strategy',
            features: [
                {
                    title: 'AI Web Chat',
                    description: 'Add intelligent chatbots to your website that answer questions, qualify leads, and book appointments 24/7',
                    icon: MessageSquare
                },
                {
                    title: 'Business Phone Numbers',
                    description: 'Get local or toll-free phone numbers with AI voice assistants you can train to handle calls professionally',
                    icon: Phone
                },
                {
                    title: 'Unified Inbox',
                    description: 'Manage all customer communications from social media, email, chat, and phone in one place',
                    icon: Mail
                }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[var(--text-main)] mb-3 flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 text-[var(--primary-gold)]" />
                        Strategy Here → Execute in The HQ
                    </h2>
                    <p className="text-[var(--text-soft)] max-w-3xl mx-auto">
                        This platform helps you <strong>plan your marketing strategy</strong>. The Business Minds HQ is where you 
                        <strong> execute everything</strong>—social media posting, email campaigns, ads management, landing pages, 
                        and all your marketing automation. Two platforms working together for your success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-[var(--primary-gold)]">
                        <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[var(--primary-gold)]" />
                            This Platform (Strategy & Planning)
                        </h3>
                        <ul className="text-sm text-[var(--text-soft)] space-y-1">
                            <li>✓ Define your ideal client & value proposition</li>
                            <li>✓ Set financial goals & revenue targets</li>
                            <li>✓ Create 90-day social media plans</li>
                            <li>✓ Plan email sequences & messaging</li>
                            <li>✓ Design customer journeys</li>
                            <li>✓ Get AI-powered strategic guidance</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-blue-600" />
                            The HQ (Execution & Automation)
                        </h3>
                        <ul className="text-sm text-[var(--text-soft)] space-y-1">
                            <li>✓ Post to 9+ social platforms at once</li>
                            <li>✓ Send email campaigns & automations</li>
                            <li>✓ Run Google, Facebook, LinkedIn ads</li>
                            <li>✓ Build unlimited landing pages & websites</li>
                            <li>✓ Blog platform with SEO tools</li>
                            <li>✓ AI chat, voice AI, phone systems</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <a 
                        href="https://app.thebminds.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                    >
                        <Sparkles className="w-5 h-5" />
                        Launch The HQ Platform
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    {user?.subscription_level === 'free' && (
                        <div className="mt-3">
                            <Link to={createPageUrl('Upgrade')} className="text-sm text-[var(--primary-gold)] hover:underline">
                                Not a member yet? Upgrade to access The HQ →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Features Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
                {executionAreas.map((area, idx) => {
                    const CategoryIcon = area.icon;
                    
                    return (
                        <AccordionItem 
                            key={idx} 
                            value={`area-${idx}`}
                            className="card overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                        >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800">
                                <div className="flex items-center gap-3 w-full">
                                    <div className={`bg-gradient-to-br ${area.color} p-3 rounded-lg`}>
                                        <CategoryIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-bold text-lg text-[var(--text-main)]">{area.category}</h3>
                                        <p className="text-xs text-[var(--text-soft)]">
                                            Plan strategy • Execute in The HQ
                                        </p>
                                    </div>
                                    <Link 
                                        to={createPageUrl(area.strategyLink)} 
                                        onClick={(e) => e.stopPropagation()}
                                        className="mr-4"
                                    >
                                        <Button variant="outline" size="sm">
                                            {area.strategyLabel}
                                        </Button>
                                    </Link>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {area.features.map((feature, featureIdx) => {
                                        const FeatureIcon = feature.icon;
                                        
                                        return (
                                            <div 
                                                key={featureIdx}
                                                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="bg-white dark:bg-gray-700 p-2 rounded-lg inline-block mb-3">
                                                    <FeatureIcon className="w-5 h-5 text-[var(--primary-gold)]" />
                                                </div>
                                                <h4 className="font-semibold text-[var(--text-main)] text-sm mb-2">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-xs text-[var(--text-soft)]">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="text-sm text-[var(--text-soft)] flex items-start gap-2">
                                        <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong className="text-[var(--text-main)]">How it works:</strong> Plan your {area.category.toLowerCase()} strategy here, 
                                            then log into The HQ to execute with all these powerful tools at your fingertips.
                                        </span>
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            {/* Platform Comparison Table */}
            <div className="card p-6 bg-white dark:bg-gray-900">
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 text-center">
                    Why Use Both Platforms Together?
                </h3>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-[var(--primary-gold)]">
                                <th className="text-left py-3 px-4 font-bold text-[var(--text-main)]">Marketing Task</th>
                                <th className="text-center py-3 px-4 font-bold text-[var(--primary-gold)]">Strategy Here</th>
                                <th className="text-center py-3 px-4 font-bold text-blue-600">Execute in The HQ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4 text-[var(--text-main)]">Social Media Planning</td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">90-day plan</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Post & schedule</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4 text-[var(--text-main)]">Email Marketing</td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Sequence design</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Send & automate</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4 text-[var(--text-main)]">Landing Pages</td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Content strategy</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Build & publish</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4 text-[var(--text-main)]">Paid Ads</td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Campaign plan</span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Run & optimize</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-3 px-4 text-[var(--text-main)]">Ideal Client Research</td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Define profile</span>
                                </td>
                                <td className="py-3 px-4 text-center text-[var(--text-soft)]">
                                    —
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-[var(--text-main)]">Customer Communications</td>
                                <td className="py-3 px-4 text-center text-[var(--text-soft)]">
                                    —
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                                    <span className="text-xs text-[var(--text-soft)] block">Chat, phone, email</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-[var(--primary-gold)]">
                    <p className="text-sm text-[var(--text-main)]">
                        <strong>💡 The Power of Both:</strong> Strategy without execution is just a plan. Execution without strategy is chaos. 
                        Use this platform to build your marketing foundation, then let The HQ handle all the technical execution seamlessly.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="card p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">
                    Ready to Execute Your Marketing Strategy?
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {hasStrategy 
                        ? "Your marketing strategy is in place. Now take it to The HQ to publish content, run campaigns, and automate your marketing."
                        : "Complete your marketing strategy here first, then The HQ becomes your execution powerhouse."
                    }
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {user?.subscription_level === 'business_hq' ? (
                        <a 
                            href="https://app.thebminds.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Launch The HQ Now
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    ) : (
                        <>
                            <Link to={createPageUrl('Upgrade')}>
                                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Upgrade to The HQ
                                </Button>
                            </Link>
                            <a 
                                href="https://app.thebminds.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary border-white text-white hover:bg-white/10 px-8 py-4"
                            >
                                Preview The HQ Platform
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}