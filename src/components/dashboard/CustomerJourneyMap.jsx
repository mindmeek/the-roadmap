
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Search, 
    FileSearch, 
    ShoppingCart, 
    Heart, 
    MessageCircle, 
    ArrowRight, 
    HelpCircle,
    CheckCircle,
    Lightbulb,
    Target,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Share2, // New icon for Social Media Manager
    Zap, // New icon for Marketing Automation
    Globe, // New icon for Website & Funnel Builder
    Users // New icon for CRM & Pipeline Management
} from 'lucide-react';
import Tooltip from '../common/Tooltip';

const journeyStages = [
    {
        id: 'awareness',
        title: 'Awareness',
        icon: Search,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-700',
        description: 'Customer realizes they have a problem or need',
        customerFeeling: 'Confused, frustrated, or curious about a problem they\'re experiencing',
        businessGoal: 'Be discovered when they\'re searching for solutions',
        yourSolution: 'Create content that answers their questions and positions you as an expert',
        examples: [
            '"I need to lose weight but don\'t know where to start"',
            '"My website traffic is declining"',
            '"I\'m tired of doing bookkeeping manually"'
        ],
        howItStreamlines: 'Instead of waiting for referrals, you attract customers actively searching for solutions through SEO, social media, and content marketing.',
        actionItems: [
            'Blog posts addressing common pain points',
            'Social media content showcasing expertise',
            'SEO-optimized website with clear problem statements',
            'Free resources (guides, checklists) that provide value'
        ]
    },
    {
        id: 'consideration',
        title: 'Consideration',
        icon: FileSearch,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-700',
        description: 'Customer researches and compares different solutions',
        customerFeeling: 'Overwhelmed by options, skeptical, seeking proof and trust signals',
        businessGoal: 'Stand out from competitors and build trust',
        yourSolution: 'Provide clear value differentiation and social proof',
        examples: [
            '"Which fitness program is best for busy moms?"',
            '"Should I hire an agency or use DIY tools?"',
            '"What makes this accounting software better than QuickBooks?"'
        ],
        howItStreamlines: 'Automated nurture sequences, case studies, and comparison guides educate prospects without manual follow-ups, allowing you to focus on high-intent leads.',
        actionItems: [
            'Case studies and testimonials',
            'Comparison guides (You vs Competitors)',
            'Free consultations or demos',
            'Email nurture sequences with educational content',
            'Webinars or video demonstrations'
        ]
    },
    {
        id: 'decision',
        title: 'Decision/Purchase',
        icon: ShoppingCart,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-700',
        description: 'Customer is ready to buy and makes a purchase decision',
        customerFeeling: 'Anxious about making the wrong choice, looking for reassurance and easy process',
        businessGoal: 'Remove friction and close the sale confidently',
        yourSolution: 'Make buying easy, offer guarantees, and provide clear next steps',
        examples: [
            '"What if I sign up and it doesn\'t work for me?"',
            '"Is this the right package for my needs?"',
            '"I\'m ready to start, what happens next?"'
        ],
        howItStreamlines: 'Clear pricing, simple checkout, money-back guarantees, and automated onboarding reduce decision paralysis and manual sales calls.',
        actionItems: [
            'Clear, transparent pricing',
            'Money-back guarantee or free trial',
            'Simplified checkout process',
            'Immediate confirmation and next steps',
            'Limited-time offers to create urgency'
        ]
    },
    {
        id: 'service',
        title: 'Service',
        icon: Heart,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-700',
        description: 'Customer uses your product/service and gets results',
        customerFeeling: 'Hopeful but needing support, wanting to see quick wins and feel valued',
        businessGoal: 'Deliver on promises, reduce churn, create raving fans',
        yourSolution: 'Provide exceptional experience, support, and consistent value delivery',
        examples: [
            '"Am I using this correctly?"',
            '"I need help with X feature"',
            '"I\'m not seeing results yet, should I be worried?"'
        ],
        howItStreamlines: 'Automated onboarding, proactive check-ins, self-service support resources, and usage tracking help you deliver value at scale without manual intervention.',
        actionItems: [
            'Structured onboarding process',
            'Regular check-ins and progress tracking',
            'Help documentation and FAQs',
            'Proactive support based on usage patterns',
            'Exclusive member benefits and community access'
        ]
    },
    {
        id: 'loyalty',
        title: 'Loyalty',
        icon: MessageCircle,
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-pink-50 dark:bg-pink-900/20',
        borderColor: 'border-pink-200 dark:border-pink-700',
        description: 'Customer becomes a promoter and refers others',
        customerFeeling: 'Excited about results, wanting to share their success, feeling appreciated',
        businessGoal: 'Turn customers into brand ambassadors who bring referrals',
        yourSolution: 'Make it easy and rewarding to refer others',
        examples: [
            '"This program changed my life, my friends need to know!"',
            '"Can I get a discount for referring my business partner?"',
            '"I want to write a review, where should I post it?"'
        ],
        howItStreamlines: 'Referral programs, automated testimonial requests, and shareable success stories create a self-sustaining marketing engine that grows without constant ad spend.',
        actionItems: [
            'Referral program with incentives',
            'Easy sharing tools (social, email)',
            'Request testimonials and case studies',
            'Feature customer success stories',
            'Create a community where advocates connect'
        ]
    }
];

const StageCard = ({ stage, isExpanded, onToggle }) => {
    const Icon = stage.icon;
    
    return (
        <div className={`card border-2 ${stage.borderColor} transition-all duration-300 ${isExpanded ? 'shadow-xl' : ''}`}>
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${stage.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">
                                {stage.title}
                            </h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                {stage.description}
                            </p>
                        </div>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[var(--text-soft)]" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--text-soft)]" />
                    )}
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t pt-6">
                    {/* Customer Feeling & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 ${stage.bgColor} rounded-lg`}>
                            <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4" />
                                Customer is Feeling:
                            </h4>
                            <p className="text-sm text-[var(--text-soft)]">
                                {stage.customerFeeling}
                            </p>
                        </div>
                        <div className={`p-4 ${stage.bgColor} rounded-lg`}>
                            <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Your Solution:
                            </h4>
                            <p className="text-sm text-[var(--text-soft)]">
                                {stage.yourSolution}
                            </p>
                        </div>
                    </div>

                    {/* Examples */}
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            What Customers Are Saying:
                        </h4>
                        <div className="space-y-2">
                            {stage.examples.map((example, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm">
                                    <span className="text-[var(--primary-gold)] mt-1">💭</span>
                                    <span className="text-[var(--text-soft)] italic">"{example}"</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How It Streamlines */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-[var(--primary-gold)]">
                        <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-[var(--primary-gold)]" />
                            How This Streamlines Your Business:
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            {stage.howItStreamlines}
                        </p>
                    </div>

                    {/* Action Items */}
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Action Items to Implement:
                        </h4>
                        <ul className="space-y-2">
                            {stage.actionItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-[var(--text-soft)]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function CustomerJourneyMap() {
    const [expandedStage, setExpandedStage] = useState('awareness');

    const handleToggle = (stageId) => {
        setExpandedStage(expandedStage === stageId ? null : stageId);
    };

    return (
        <div className="card p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                        The Customer Journey Map
                        <Tooltip content="Understanding the customer journey helps you create targeted strategies for each stage, streamline operations, and turn prospects into loyal advocates automatically.">
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                        </Tooltip>
                    </h3>
                </div>
                <p className="text-[var(--text-soft)] mb-4">
                    Every customer goes through 5 predictable stages. Understanding this journey helps you attract, convert, and retain customers more effectively.
                </p>
                
                {/* Visual Journey Flow */}
                <div className="hidden lg:flex items-center justify-between gap-2 mb-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    {journeyStages.map((stage, idx) => (
                        <React.Fragment key={stage.id}>
                            <button
                                onClick={() => handleToggle(stage.id)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                                    expandedStage === stage.id 
                                        ? 'bg-white dark:bg-gray-800 shadow-lg scale-105' 
                                        : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${stage.color}`}>
                                    <stage.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-[var(--text-main)]">
                                    {stage.title}
                                </span>
                            </button>
                            {idx < journeyStages.length - 1 && (
                                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Stage Cards */}
            <div className="space-y-4">
                {journeyStages.map((stage) => (
                    <StageCard
                        key={stage.id}
                        stage={stage}
                        isExpanded={expandedStage === stage.id}
                        onToggle={() => handleToggle(stage.id)}
                    />
                ))}
            </div>

            {/* HQ Tools Preview Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
                    The HQ Powers Your Entire Customer Journey
                </h4>
                <p className="text-sm text-[var(--text-soft)] mb-4">
                    Instead of juggling 10+ different tools, The Business Minds HQ provides everything you need in one platform:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md flex-shrink-0">
                            <Share2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm text-[var(--text-main)]">Social Media Manager</h5>
                            <p className="text-xs text-[var(--text-soft)]">Schedule & publish across all platforms from one calendar</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md flex-shrink-0">
                            <Zap className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm text-[var(--text-main)]">Marketing Automation</h5>
                            <p className="text-xs text-[var(--text-soft)]">Nurture leads automatically with smart workflows</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md flex-shrink-0">
                            <Globe className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm text-[var(--text-main)]">Website & Funnel Builder</h5>
                            <p className="text-xs text-[var(--text-soft)]">Build high-converting pages with drag-and-drop</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-md flex-shrink-0">
                            <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm text-[var(--text-main)]">CRM & Pipeline Management</h5>
                            <p className="text-xs text-[var(--text-soft)]">Track every customer interaction in one place</p>
                        </div>
                    </div>
                </div>
                
                {/* New Button to Complete Guide */}
                <Link 
                    to={createPageUrl('HQCustomerJourneyGuide')}
                    className="btn btn-secondary w-full justify-center mt-4"
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    See How The HQ Streamlines Each Stage
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>

            {/* CTA */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[var(--primary-gold)]" />
                    Ready to Map Your Customer Journey?
                </h4>
                <p className="text-sm text-[var(--text-soft)] mb-4">
                    Use our interactive Customer Journey tool to map out your specific customer touchpoints and see exactly which HQ features support each stage.
                </p>
                <Link 
                    to={createPageUrl('StrategyFormCustomerJourney')}
                    className="btn btn-primary inline-flex items-center gap-2"
                >
                    Map Your Customer Journey
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
