import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Search, 
    FileSearch, 
    ShoppingCart, 
    Heart, 
    MessageCircle, 
    ArrowRight,
    Share2,
    Zap,
    Globe,
    Users,
    FolderKanban,
    DollarSign,
    Mail,
    Phone,
    FileText,
    TrendingUp,
    Award,
    Sparkles,
    CheckCircle
} from 'lucide-react';

const journeyStages = [
    {
        id: 'awareness',
        title: 'Awareness Stage',
        subtitle: 'Customer realizes they have a problem or need',
        icon: Search,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-700',
        customerFeeling: 'Confused, frustrated, or curious about a problem they\'re experiencing',
        businessGoal: 'Be discovered when they\'re searching for solutions',
        hqFeatures: [
            {
                name: 'Social Media Manager',
                icon: Share2,
                description: 'Schedule and publish posts across all major platforms (Facebook, Instagram, LinkedIn, Twitter, TikTok) from one unified calendar. Create content once, distribute everywhere. Track engagement metrics to see which messages resonate most.'
            },
            {
                name: 'Marketing Automation',
                icon: Zap,
                description: 'Capture leads automatically from your website, social media, and ads. Set up "if/then" workflows that trigger based on customer behavior. Tag and segment leads based on interests and actions.'
            },
            {
                name: 'Website & SEO Tools',
                icon: Globe,
                description: 'Build SEO-optimized websites with built-in tools that help Google find your site. Create blog posts and landing pages that rank for keywords your ideal customers are searching for.'
            }
        ]
    },
    {
        id: 'consideration',
        title: 'Consideration Stage',
        subtitle: 'Customer researches and compares different solutions',
        icon: FileSearch,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-700',
        customerFeeling: 'Overwhelmed by options, skeptical, seeking proof and trust signals',
        businessGoal: 'Stand out from competitors and build trust',
        hqFeatures: [
            {
                name: 'Drag-and-Drop Website Builder',
                icon: Globe,
                description: 'Build stunning, mobile-responsive websites and landing pages without any coding. Choose from hundreds of professionally-designed templates. Built-in SEO tools and A/B testing to optimize conversions.'
            },
            {
                name: 'Funnel Builder',
                icon: FolderKanban,
                description: 'Create multi-step sales funnels that guide prospects from interest to purchase. Pre-built funnel templates for common business models. Track conversion rates at every step to identify and fix drop-off points.'
            },
            {
                name: 'Email Marketing & Automation',
                icon: Mail,
                description: 'Deliver the right educational content at the right time based on prospect behavior. Create "drip campaigns" that nurture leads over days or weeks. Track email opens, clicks, and engagement.'
            },
            {
                name: 'Webinar Platform',
                icon: Users,
                description: 'Host live or automated webinars to educate and convert your audience at scale. Built-in registration pages, automated reminder emails, live chat, and replay options. Track watch time and conversion rates.'
            }
        ]
    },
    {
        id: 'decision',
        title: 'Decision/Purchase Stage',
        subtitle: 'Customer is ready to buy and makes a purchase decision',
        icon: ShoppingCart,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-700',
        customerFeeling: 'Anxious about making the wrong choice, looking for reassurance and easy process',
        businessGoal: 'Remove friction and close the sale confidently',
        hqFeatures: [
            {
                name: 'Payment Processing',
                icon: DollarSign,
                description: 'Accept credit cards, debit cards, and digital wallets with integrated Stripe or Square. Create one-time purchases, subscriptions, payment plans, and upsells. Automated invoicing and receipt generation.'
            },
            {
                name: 'Checkout & Order Forms',
                icon: FileText,
                description: 'Beautiful, mobile-optimized checkout pages that reduce cart abandonment. One-click upsells and order bumps to increase average order value. Abandoned cart recovery sequences to win back lost sales.'
            },
            {
                name: 'CRM & Deal Pipeline',
                icon: TrendingUp,
                description: 'Visual pipeline to track every deal from proposal to closed-won. See exactly where each prospect is in the buying process. Automated task reminders so you never miss a follow-up.'
            },
            {
                name: 'Proposal & Contract Tools',
                icon: FileText,
                description: 'Create professional proposals and contracts with e-signature capabilities. Track when prospects view, sign, and return documents. Automated reminders for pending signatures.'
            }
        ]
    },
    {
        id: 'service',
        title: 'Service Stage',
        subtitle: 'Customer uses your product/service and gets results',
        icon: Heart,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-700',
        customerFeeling: 'Hopeful but needing support, wanting to see quick wins and feel valued',
        businessGoal: 'Deliver on promises, reduce churn, create raving fans',
        hqFeatures: [
            {
                name: 'Client Portal',
                icon: Users,
                description: 'Give clients a dedicated portal where they can access resources, track progress, submit requests, and communicate with your team. White-labeled to match your brand.'
            },
            {
                name: 'Email & SMS Automation',
                icon: Mail,
                description: 'Automated onboarding sequences that guide new customers through their first 30 days. Milestone celebrations and progress check-ins. Re-engagement campaigns for inactive users.'
            },
            {
                name: 'Course & Membership Platform',
                icon: Award,
                description: 'Deliver online courses, training programs, and membership content. Drip-release lessons on a schedule. Track completion rates and engagement. Quizzes and certificates.'
            },
            {
                name: 'SMS & Phone System',
                icon: Phone,
                description: 'Built-in business phone number for calls and texts. Two-way SMS conversations with clients. Automated appointment reminders and follow-ups. Call tracking and recording.'
            }
        ]
    },
    {
        id: 'loyalty',
        title: 'Loyalty Stage',
        subtitle: 'Customer becomes a promoter and refers others',
        icon: MessageCircle,
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-pink-50 dark:bg-pink-900/20',
        borderColor: 'border-pink-200 dark:border-pink-700',
        customerFeeling: 'Excited about results, wanting to share their success, feeling appreciated',
        businessGoal: 'Turn customers into brand ambassadors who bring referrals',
        hqFeatures: [
            {
                name: 'Referral Program Builder',
                icon: Award,
                description: 'Create automated referral programs with custom rewards (discounts, cash, free months, etc.). Give customers unique referral links they can share. Track referrals and automatically issue rewards.'
            },
            {
                name: 'Review & Testimonial Automation',
                icon: MessageCircle,
                description: 'Automatically request reviews from happy customers at the perfect time. Create beautiful testimonial pages that showcase social proof. Share testimonials across your website and marketing.'
            },
            {
                name: 'Community Platform',
                icon: Users,
                description: 'Build a private community where customers can connect, share wins, and support each other. Members-only content and events. Gamification with badges and leaderboards.'
            },
            {
                name: 'Email Marketing',
                icon: Mail,
                description: 'Keep customers engaged with regular newsletters, exclusive offers, and VIP perks. Segment your best customers and give them special treatment. Win-back campaigns for churned customers.'
            }
        ]
    }
];

export default function HQCustomerJourneyGuide() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-8 h-8 text-[var(--primary-gold)]" />
                </div>
                <h1 className="text-4xl font-bold text-[var(--text-main)] mb-4">
                    How The HQ Streamlines Your Entire Customer Journey
                </h1>
                <p className="text-lg text-[var(--text-soft)] max-w-3xl mx-auto">
                    Instead of juggling 10+ different tools, The Business Minds HQ gives you everything you need to attract, convert, serve, and retain customers - all in one platform.
                </p>
            </div>

            {/* Journey Visual */}
            <div className="hidden lg:flex items-center justify-between gap-2 mb-12 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg">
                {journeyStages.map((stage, idx) => (
                    <React.Fragment key={stage.id}>
                        <div className="flex flex-col items-center gap-2 p-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${stage.color}`}>
                                <stage.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-[var(--text-main)] text-center">
                                {stage.title}
                            </span>
                        </div>
                        {idx < journeyStages.length - 1 && (
                            <ArrowRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Stage Details */}
            <div className="space-y-12">
                {journeyStages.map((stage) => {
                    const Icon = stage.icon;
                    return (
                        <div key={stage.id} className={`card p-8 border-2 ${stage.borderColor}`}>
                            {/* Stage Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-4 rounded-lg bg-gradient-to-br ${stage.color} flex-shrink-0`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                                        {stage.title}
                                    </h2>
                                    <p className="text-[var(--text-soft)] mb-4">{stage.subtitle}</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className={`p-4 ${stage.bgColor} rounded-lg`}>
                                            <h4 className="font-semibold text-sm text-[var(--text-main)] mb-2">
                                                Customer is Feeling:
                                            </h4>
                                            <p className="text-sm text-[var(--text-soft)]">
                                                {stage.customerFeeling}
                                            </p>
                                        </div>
                                        <div className={`p-4 ${stage.bgColor} rounded-lg`}>
                                            <h4 className="font-semibold text-sm text-[var(--text-main)] mb-2">
                                                Your Business Goal:
                                            </h4>
                                            <p className="text-sm text-[var(--text-soft)]">
                                                {stage.businessGoal}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* HQ Features */}
                            <div>
                                <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
                                    HQ Features That Streamline This Stage
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {stage.hqFeatures.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <div className={`p-2 rounded-md flex-shrink-0 ${stage.bgColor}`}>
                                                <feature.icon className="w-5 h-5 text-[var(--primary-gold)]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-[var(--text-main)] mb-1">
                                                    {feature.name}
                                                </h4>
                                                <p className="text-xs text-[var(--text-soft)]">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 text-center">
                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                    Ready to Streamline Your Customer Journey?
                </h3>
                <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                    Get access to all these features in one platform. Stop paying for 10+ different tools and simplify your business operations today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={createPageUrl('Upgrade')} className="btn btn-primary">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Upgrade to The HQ
                    </Link>
                    <Link to={createPageUrl('StrategyFormCustomerJourney')} className="btn btn-secondary">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Map Your Journey First
                    </Link>
                </div>
            </div>
        </div>
    );
}