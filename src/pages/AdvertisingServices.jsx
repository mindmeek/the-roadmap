import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Check, Target, TrendingUp, Zap, ArrowRight,
    CheckCircle, Calendar, Users, MessageSquare, BarChart,
    ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ADVERTISING_PACKAGES = [
    {
        id: 'traffic_ads',
        title: 'Traffic Package',
        subtitle: 'Drive traffic to your landing pages',
        price: '$500',
        originalPrice: '$250',
        adSpend: 'Up to $1000 ad spend per month',
        popular: false,
        features: [
            'Meta & Google ads included',
            'Initial campaign strategy',
            'Ads account / Business Manager setup support',
            'Up to 2 independent traffic ad campaigns',
            'Up to 4 independent ad sets with unique offers/angles',
            'Image + video ads based on client\'s content',
            'Up to 2 custom audiences for retargeting',
            'Advanced demographic & behavioral targeting',
            'Weekly campaign monitoring & optimization',
            'Dedicated ad specialist',
            'Monthly reporting & strategy consultation',
            'Detailed monthly campaign audits'
        ]
    },
    {
        id: 'leads_ads',
        title: 'Leads Package',
        subtitle: 'Generate qualified leads',
        price: '$1,000',
        originalPrice: '$450',
        adSpend: 'Up to $2500 ad spend per month',
        popular: true,
        features: [
            'Meta & Google ads included',
            'Initial campaign strategy',
            'Ads account / Business Manager setup support',
            'Facebook Pixel installation support',
            'Up to 3 independent traffic & lead generation ad campaigns',
            'Up to 8 independent ad sets with unique offers/angles',
            'Image + video ads based on client\'s content',
            'Up to 5 custom & lookalike audiences for retargeting',
            'Advanced demographic & behavioral targeting',
            'Weekly campaign monitoring & optimization',
            'Dedicated ad specialist',
            'Monthly staff sales coaching to help maximize sales',
            'Automated CRM followup sequences to maximize lead conversions',
            'Bi-weekly reporting & strategy consultation'
        ]
    },
    {
        id: 'conversions_ads',
        title: 'Conversions Package',
        subtitle: 'Maximize conversions on your website',
        price: '$2,000',
        originalPrice: '$750',
        adSpend: 'Up to $5000 ad spend per month',
        popular: false,
        features: [
            'Meta & Google ads included',
            'Initial campaign strategy',
            'Ads account / Business Manager setup support',
            'Facebook Pixel & Conversions API installation support',
            'Up to 10 custom conversions setup',
            'Up to 5 independent traffic, lead generation & conversions ad campaigns',
            'Up to 15 independent ad sets with unique offers/angles',
            'Image + video ads based on client\'s content',
            'Up to 8 custom & lookalike audiences for retargeting',
            'Advanced demographic & behavioral targeting',
            'Weekly campaign monitoring & optimization',
            'Dedicated ad specialist',
            'Monthly staff sales coaching to help maximize sales',
            'Automated CRM followup sequences to maximize lead conversions',
            'Weekly reporting & strategy consultation'
        ]
    }
];

const FAQ_ITEMS = [
    {
        question: 'How do you think you can help me?',
        answer: 'Like all things in life, social media advertising needs study and practice to master. And most business owners aren\'t skilled in marketing to begin with. That\'s where social media advertising experts like us can help. Our team can help you identify and solve real problems to grow your business.'
    },
    {
        question: 'Who will be working on my ads?',
        answer: 'A dedicated ad specialist will be assigned to your account. They have years of experience running successful campaigns and will work closely with you to understand your business goals and target audience.'
    },
    {
        question: 'What social media platforms do your packages cover?',
        answer: 'Our packages primarily cover Meta (Facebook & Instagram) and Google Ads. These platforms offer the most comprehensive targeting options and reach for most businesses.'
    },
    {
        question: 'How much ROAS should I expect?',
        answer: 'Return on Ad Spend varies by industry, offer, and target audience. While we can\'t guarantee specific numbers, our goal is always to maximize your ROI. We typically see 3-5x ROAS for established businesses with proven offers.'
    },
    {
        question: 'What are the advantages of using social media advertising for my business?',
        answer: 'Social media advertising allows you to reach highly targeted audiences, scale your reach quickly, track results in real-time, and adjust campaigns based on performance data. It\'s one of the most cost-effective ways to grow your business.'
    },
    {
        question: 'How do I track the performance of my social media ads?',
        answer: 'We provide regular performance reports as a part of our service. These reports include key metrics such as click-through rates, conversions, engagement, and ROI to help you assess the effectiveness of your ad campaigns.'
    },
    {
        question: 'How will you know about my business?',
        answer: 'During onboarding, we\'ll conduct a comprehensive intake process where you\'ll share your business details, target audience, offers, and goals. We\'ll also analyze your existing marketing materials and competitors.'
    },
    {
        question: 'Are there any hidden costs?',
        answer: 'Absolutely not. The package price is for our management services. Your ad spend goes directly through your own ad account, giving you complete transparency and control over your advertising budget.'
    }
];

export default function AdvertisingServicesPage() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const navigate = useNavigate();

    const handleGetStarted = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleContactUs = () => {
        window.location.href = 'mailto:team@thebminds.com?subject=Advertising Services Inquiry';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Advertising Packages
                    </h1>
                    <p className="text-xl md:text-2xl mb-6 text-white/90">
                        Generate more traffic, leads & purchases with targeted ads!
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Quick Onboarding</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>No Contracts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Guaranteed Growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Dedicated Account Manager</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ADVERTISING_PACKAGES.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`card p-8 hover:shadow-2xl transition-all flex flex-col relative ${
                                pkg.popular 
                                    ? 'border-4 border-purple-500 dark:border-purple-400' 
                                    : 'border-2 border-gray-200 dark:border-gray-800'
                            }`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Popular
                                    </span>
                                </div>
                            )}
                            
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                                    {pkg.title}
                                </h3>
                                <p className="text-[var(--text-soft)] text-sm mb-4">
                                    {pkg.subtitle}
                                </p>
                                <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                    {pkg.price}
                                </div>
                                <div className="text-sm text-[var(--text-soft)]">
                                    Per month, no contract
                                </div>
                            </div>

                            {/* Ad Spend */}
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg mb-6 text-center">
                                <div className="font-semibold text-purple-900 dark:text-purple-200">
                                    {pkg.adSpend}
                                </div>
                                <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                                    (directly via your ad account)
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-[var(--text-soft)]">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => handleGetStarted(pkg)}
                                className={`w-full ${
                                    pkg.popular 
                                        ? 'bg-purple-600 hover:bg-purple-700' 
                                        : 'bg-[var(--primary-gold)] hover:bg-yellow-600'
                                }`}
                            >
                                Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            <p className="text-xs text-center text-[var(--text-soft)] mt-4">
                                No hidden costs or commissions
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Talk to a Social Media Advertising Expert Today
                    </h2>
                    <Button
                        onClick={handleContactUs}
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-gray-100"
                    >
                        Contact Us
                    </Button>
                </div>
            </div>

            {/* Problems Section */}
            <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4 text-[var(--text-main)]">
                        90% of Social Media Ads Fail
                    </h2>
                    <p className="text-center text-[var(--text-soft)] mb-12">
                        Doing it yourself or hiring a freelancer can cost more than you think.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card p-6">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                                Are you not clear about your target audience?
                            </h3>
                            <p className="text-[var(--text-soft)]">
                                If you don't know who you should target, no amount of ad spend can help. We can help identify and target the most suitable audience for your business through advanced research & audience matching strategies.
                            </p>
                        </div>
                        
                        <div className="card p-6">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                                Do you know how Facebook's ad technology works?
                            </h3>
                            <p className="text-[var(--text-soft)]">
                                The platforms are changing rapidly and it's challenging for most people to keep up with the changes. We live and breathe social media and can help you understand and utilize Facebook's ad tech to the fullest!
                            </p>
                        </div>
                        
                        <div className="card p-6">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                                Getting lots of clicks, but no sales?
                            </h3>
                            <p className="text-[var(--text-soft)]">
                                Not all traffic is created equal. If you truly want to make your paid social media campaigns successful, you have to think about the entire funnel. Our consultants can provide that perspective to you!
                            </p>
                        </div>
                        
                        <div className="card p-6">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                                Tried multiple agencies yet no results?
                            </h3>
                            <p className="text-[var(--text-soft)]">
                                Creating an ad campaign is pretty simple. Making it profitable is what takes skill. Most freelancers and agencies don't have that. With our proven track of running campaigns for more than 9 years, we can bring you success!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 text-[var(--text-main)]">
                        Consult our young, dynamic social experts!
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Always updated with trends</h3>
                        </div>
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Ask us anything social</h3>
                        </div>
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Very responsive support</h3>
                        </div>
                        <div className="text-center">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">100% personalized approach</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Common Struggles */}
            <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">
                        Common Marketing Struggles We Hear from Business Owners...
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                struggle: 'Social media doesn\'t work for my business...',
                                solution: 'With over 3 billion social media users worldwide, it\'s nearly impossible that your customers aren\'t on social. It\'s all about smartly targeting them. That\'s what our packages help you achieve!'
                            },
                            {
                                struggle: 'Word-of-mouth marketing works just fine for me...',
                                solution: 'That\'s great! But do you think word-of-mouth marketing can aggressively grow your business? Probably not. You need to invest in advertising and content to bring in new customers consistently. Our services help you do just that.'
                            },
                            {
                                struggle: 'Social media marketing is too expensive...',
                                solution: 'Our pricing is direct proof that social media marketing doesn\'t have to be expensive. With just a few hundred dollars a month, we can achieve multiple marketing goals for your business!'
                            },
                            {
                                struggle: 'I don\'t have the time to look into this every day...',
                                solution: 'We understand that running your business requires your full attention. That\'s why we\'ve designed our end-to-end services which require little effort from your side!'
                            },
                            {
                                struggle: 'I hired an agency earlier and they generated no results for me...',
                                solution: 'We understand how frustrating this can be. We\'ve been there ourselves. That\'s why our services completely focus on results-oriented activities. There are no contracts, so we work very hard to earn your business every single month.'
                            },
                            {
                                struggle: 'I do my own marketing...',
                                solution: 'That\'s impressive! But how long can you do this yourself? How much time do you have to invest in this? Don\'t you think that time could rather be invested in growing your business?'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="card p-6">
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">
                                    {item.struggle}
                                </h3>
                                <p className="text-[var(--text-soft)]">{item.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">
                        Our results speak for themselves!
                    </h2>
                    <p className="text-center text-[var(--text-soft)] mb-12">
                        These numbers are just a small chunk of our success stories. Let's start with your chapter!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                6,500+
                            </div>
                            <div className="text-[var(--text-main)] font-semibold mb-2">
                                Social media posts done each month
                            </div>
                            <p className="text-sm text-[var(--text-soft)]">
                                Our exposure to different clients and industries helps us create engaging content throughout the year!
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                75,580+
                            </div>
                            <div className="text-[var(--text-main)] font-semibold mb-2">
                                Leads generated
                            </div>
                            <p className="text-sm text-[var(--text-soft)]">
                                We help to build an efficient lead generation process through our content marketing strategies.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                425,000+
                            </div>
                            <div className="text-[var(--text-main)] font-semibold mb-2">
                                Hours of expertise
                            </div>
                            <p className="text-sm text-[var(--text-soft)]">
                                Our expertise helps our clients get stellar results from social media!
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                25-50%
                            </div>
                            <div className="text-[var(--text-main)] font-semibold mb-2">
                                Average website traffic growth
                            </div>
                            <p className="text-sm text-[var(--text-soft)]">
                                Our regular content posting has been proven to increase website traffic for most clients!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">
                        Social Media Advertising Packages FAQ
                    </h2>
                    <div className="space-y-4">
                        {FAQ_ITEMS.map((item, idx) => (
                            <div key={idx} className="card">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <h3 className="font-semibold text-[var(--text-main)] pr-4">
                                        {item.question}
                                    </h3>
                                    {expandedFaq === idx ? (
                                        <ChevronUp className="w-5 h-5 text-[var(--text-soft)] flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-[var(--text-soft)] flex-shrink-0" />
                                    )}
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 pb-6">
                                        <p className="text-[var(--text-soft)]">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">
                        Kickstart Your Social Media Growth in 3 Simple Steps
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Select a Package</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Affordable plans designed for growing businesses.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Fill the Onboarding Form</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Quick details about your business and audience.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Go Live</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                We roll out consistent, engaging content while you focus on business.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            {isModalOpen && selectedPackage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-[var(--text-main)]">
                                Get Started with {selectedPackage.title}
                            </h2>
                            <div className="mb-6">
                                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                    {selectedPackage.price}/month
                                </div>
                                <p className="text-[var(--text-soft)] mb-2">{selectedPackage.subtitle}</p>
                                <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                                    {selectedPackage.adSpend}
                                </p>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg mb-6">
                                <p className="text-sm text-[var(--text-main)]">
                                    To get started with this package, please contact our team directly. We'll set up a consultation to discuss your goals and get you onboarded.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                                    onClick={handleContactUs}
                                >
                                    Contact Us
                                </Button>
                            </div>

                            <p className="text-xs text-center text-[var(--text-soft)] mt-4">
                                Email us at{' '}
                                <a href="mailto:team@thebminds.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                                    team@thebminds.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}