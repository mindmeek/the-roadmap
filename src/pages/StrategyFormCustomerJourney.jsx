import React, { useState, useEffect, useCallback } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, Save, ChevronRight, CheckCircle, UserCircle, Eye, Search, ShoppingCart, HeartHandshake, Trophy, Share2, MessageSquare, Palette, Globe, DollarSign, Smartphone, FolderKanban, Star, Users, Zap, Lightbulb, Sparkles, Plus, X } from 'lucide-react';
import SubscriptionGate from '../components/subscription/SubscriptionGate';
import AITeamModal from '@/components/ai/AITeamModal';

// Dropdown options matching the Ideal Client form
const DEMOGRAPHICS_OPTIONS = {
    age_range: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    gender: ['Male', 'Female'],
    location: ['Urban', 'Suburban', 'Rural', 'Global/Remote'],
    income_level: ['Under $30K', '$30K-$50K', '$50K-$75K', '$75K-$100K', '$100K-$150K', '$150K+'],
    education: ['High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Trade/Vocational'],
    occupation: ['Corporate Professional', 'Entrepreneur', 'Freelancer', 'Student', 'Retired', 'Homemaker', 'Other']
};

// Consolidated suggestions for multi-value inputs
const PSYCHOGRAPHICS_SUGGESTIONS = ['Innovation', 'Tradition', 'Family', 'Success', 'Freedom', 'Security', 'Community', 'Sustainability', 'Efficiency', 'Quality', 'Technology', 'Business', 'Health & Fitness', 'Travel', 'Arts & Culture', 'Sports', 'Education', 'Finance', 'Entertainment', 'Food & Dining', 'Fast-paced', 'Balanced', 'Minimalist', 'Luxury-oriented', 'Family-focused', 'Career-driven', 'Health-conscious', 'Adventure-seeking', 'Analytical', 'Creative', 'Pragmatic', 'Innovative', 'Traditional', 'Risk-taker', 'Cautious', 'Social', 'Independent'];

const PAIN_POINTS_SUGGESTIONS = [
    'Lack of time',
    'Limited budget',
    'Information overload',
    'Fear of failure',
    'Unclear direction',
    'Poor work-life balance',
    'Difficulty scaling',
    'Technology challenges',
    'Marketing struggles',
    'Cash flow issues',
    'Finding reliable help',
    'Competition pressure'
];

const GOALS_SUGGESTIONS = [
    'Start a business',
    'Grow existing business',
    'Achieve financial freedom',
    'Better work-life balance',
    'Build passive income',
    'Become an expert',
    'Help others',
    'Create legacy',
    'Increase revenue',
    'Reduce stress',
    'Gain more customers',
    'Improve efficiency'
];

const VALUES_SUGGESTIONS = [
    'Integrity',
    'Excellence',
    'Innovation',
    'Family',
    'Community',
    'Growth',
    'Transparency',
    'Sustainability',
    'Empowerment',
    'Reliability',
    'Creativity',
    'Service'
];

const BUYING_BEHAVIORS_OPTIONS = {
    research_method: ['Google search', 'Social media', 'Recommendations', 'Reviews/testimonials', 'YouTube videos', 'Podcasts', 'Industry publications'],
    decision_speed: ['Impulsive (same day)', 'Quick (within a week)', 'Moderate (1-2 weeks)', 'Careful (several weeks)', 'Very deliberate (months)'],
    price_sensitivity: ['Budget-conscious', 'Value-focused', 'Quality over price', 'Premium buyer'],
    preferred_contact: ['Email', 'Phone', 'Text/SMS', 'In-person', 'Video call', 'Live chat', 'Social media DM']
};

const STAGES = [
    {
        id: 'persona',
        title: 'Customer Persona',
        description: 'Define and name your ideal customer',
        icon: UserCircle,
        color: 'from-blue-500 to-blue-600',
        instructions: 'Give your ideal customer a name and bring their profile to life. This is the foundation of your entire customer journey. By deeply understanding WHO your customer is, you can tailor every subsequent stage to speak directly to them. This persona will guide your messaging, channel selection, content creation, and service delivery throughout the entire journey.',
        emotions: 'Understanding, Empathy, Connection',
        connectionTip: 'By naming your customer and deeply understanding them, you create authentic connections that resonate throughout your entire business strategy. This isn\'t just data - this is a real person with real dreams, fears, and needs. Every marketing message, every product feature, and every customer interaction should be designed with this specific person in mind.',
        howStagesConnect: 'Your customer persona is the north star for all 5 stages. Once you know WHO they are, you can determine WHERE to find them (Awareness), HOW to educate them (Consideration), WHAT will convince them to buy (Decision), HOW to serve them best (Service), and WHAT will make them loyal advocates (Loyalty).'
    },
    {
        id: 'awareness',
        title: 'Awareness Stage',
        description: 'How customers discover you',
        icon: Eye,
        color: 'from-purple-500 to-purple-600',
        instructions: 'At this stage, your customer is experiencing a problem or need but may not fully understand it yet. They\'re searching for information, asking questions, or noticing symptoms of their pain point. Your goal is to be visible where they\'re looking and speak to their initial concerns.',
        recommendedTools: ['Social Media Scheduler', 'SEO Keyword Tool', 'Google Ads/Facebook Ads Manager', 'Content Calendar', 'Blog/CMS', 'Video Creation Tools', 'Canva/Design Software'],
        pathways: [
            {
                id: 'content_marketing',
                title: 'Content Marketing (SEO & Blog)',
                description: 'Attract customers by solving their problems with valuable content.',
                example: 'A fitness coach writing blog posts about "How to lose weight after 40" that rank on Google.',
                formFields: [
                    { id: 'content_pillars', label: 'What are your 3-5 main content topics?', placeholder: 'e.g., Nutrition, Workouts, Mindset' },
                    { id: 'keyword_strategy', label: 'What keywords are your customers searching for?', placeholder: 'e.g., "best home workout equipment"' }
                ]
            },
            {
                id: 'social_media',
                title: 'Social Media Growth',
                description: 'Build an audience by engaging on platforms where your customers hang out.',
                example: 'A fashion brand posting daily outfits on Instagram and using TikTok trends.',
                formFields: [
                    { id: 'primary_platforms', label: 'Which platforms will you focus on?', placeholder: 'e.g., Instagram, LinkedIn' },
                    { id: 'content_mix', label: 'What type of content will you post?', placeholder: 'e.g., Educational reels, Behind the scenes, User content' }
                ]
            },
            {
                id: 'paid_ads',
                title: 'Paid Advertising',
                description: 'Pay to put your message directly in front of your ideal customer.',
                example: 'A SaaS company running LinkedIn ads targeting CTOs of mid-sized companies.',
                formFields: [
                    { id: 'budget', label: 'What is your monthly ad budget?', placeholder: 'e.g., $1000' },
                    { id: 'target_audience', label: 'Who exactly are you targeting?', placeholder: 'e.g., Women aged 25-34 in New York' }
                ]
            }
        ],
        hqFeatures: [
            { name: 'Social Media Manager', description: 'Schedule and publish posts across all major platforms from one dashboard.', icon: Share2 },
            { name: 'Ads Management', description: 'Create and track Facebook, Instagram, and Google Ads campaigns directly in The HQ.', icon: Zap },
            { name: 'Marketing Automation', description: 'Capture leads automatically from your website, social media, and ads.', icon: Zap }
        ]
    },
    {
        id: 'consideration',
        title: 'Consideration Stage',
        description: 'How customers evaluate solutions',
        icon: Search,
        color: 'from-green-500 to-green-600',
        instructions: 'Now your customer knows they have a problem and they\'re actively researching solutions. They need education, proof, and clarity. This is where you become a trusted advisor by providing transparent information, showcasing results, and removing doubts.',
        recommendedTools: ['Website/Landing Page Builder', 'Email Marketing Software', 'Webinar Platform', 'CRM', 'Lead Magnet Creation Tool'],
        pathways: [
            {
                id: 'landing_page',
                title: 'High-Converting Landing Page',
                description: 'A single page focused on one offer with one call to action.',
                example: 'A webinar registration page with no navigation menu, just a signup form.',
                formFields: [
                    { id: 'headline', label: 'What is your main headline?', placeholder: 'The promise of your offer' },
                    { id: 'lead_magnet', label: 'What free value are you offering?', placeholder: 'e.g., Free Checklist, Video Training' }
                ]
            },
            {
                id: 'full_website',
                title: 'Full Brand Website',
                description: 'A multi-page site that builds credibility and tells your full story.',
                example: 'A consulting firm website with About, Services, Case Studies, and Blog pages.',
                formFields: [
                    { id: 'sitemap', label: 'What main pages will you include?', placeholder: 'Home, About, Services, Contact' },
                    { id: 'brand_story', label: 'What is the core story on your About page?', placeholder: 'Why you started this business' }
                ]
            },
            {
                id: 'webinar_funnel',
                title: 'Webinar/Masterclass Funnel',
                description: 'Educate prospects via video before making an offer.',
                example: 'A 45-minute masterclass on "How to Scale Your Business" ending with a pitch.',
                formFields: [
                    { id: 'webinar_topic', label: 'What will you teach?', placeholder: 'e.g., 3 Steps to Financial Freedom' },
                    { id: 'offer_pitch', label: 'What is your offer at the end?', placeholder: 'e.g., Join my coaching program' }
                ]
            }
        ],
        hqFeatures: [
            { name: 'Website Builder', description: 'Build stunning websites and landing pages without coding.', icon: Globe },
            { name: 'Funnel Builder', description: 'Create multi-step sales funnels that guide prospects to purchase.', icon: FolderKanban },
            { name: 'Webinar Feature', description: 'Host live or automated webinars to educate and convert your audience.', icon: Users }
        ]
    },
    {
        id: 'decision',
        title: 'Decision Stage',
        description: 'How customers make a purchase',
        icon: ShoppingCart,
        color: 'from-yellow-500 to-yellow-600',
        instructions: 'Your customer is ready to buy but needs final reassurance. Make it easy, clear, and low-risk. Remove every possible obstacle.',
        recommendedTools: ['Payment Processor', 'Digital Signature Software', 'Invoicing Software', 'Checkout Page/Cart', 'Calendar/Booking Tool'],
        pathways: [
            {
                id: 'self_service',
                title: 'Self-Service Checkout',
                description: 'Direct purchase via a shopping cart or checkout page. Best for lower-ticket or simple products.',
                example: 'A customer adds a $49 course to cart and pays instantly via Stripe.',
                formFields: [
                    { id: 'checkout_flow', label: 'Describe the checkout steps:', placeholder: 'e.g., Cart -> Account Creation -> Payment' },
                    { id: 'guarantee', label: 'What is your guarantee?', placeholder: 'e.g., 30-Day Money Back' }
                ]
            },
            {
                id: 'consultative_sales',
                title: 'Consultative Sales (Calls)',
                description: 'High-touch sales process involving a discovery call or demo. Best for high-ticket services.',
                example: 'A prospect books a 30-min strategy session to discuss a $5k consulting package.',
                formFields: [
                    { id: 'booking_process', label: 'How do they book a call?', placeholder: 'e.g., Calendly link on website' },
                    { id: 'sales_script', label: 'Key points for your sales script:', placeholder: 'e.g., Diagnose problem, Prescribe solution' }
                ]
            },
            {
                id: 'proposal_contract',
                title: 'Proposal & Contract',
                description: 'Custom solutions requiring a formal proposal and signed agreement.',
                example: 'Sending a detailed PDF proposal for a custom website design project.',
                formFields: [
                    { id: 'proposal_elements', label: 'What goes into your proposal?', placeholder: 'e.g., Scope, Timeline, Pricing, Terms' },
                    { id: 'signing_tool', label: 'How will they sign?', placeholder: 'e.g., DocuSign, HelloSign' }
                ]
            }
        ],
        hqFeatures: [
            { name: 'Unlimited Estimates & Invoices', description: 'Send professional quotes and invoices instantly.', icon: DollarSign },
            { name: 'Mobile App Payments', description: 'Accept payments anywhere using The HQ mobile app.', icon: Smartphone },
            { name: 'CRM', description: 'Track every deal stage and follow up automatically.', icon: FolderKanban }
        ]
    },
    {
        id: 'service',
        title: 'Service Stage',
        description: 'Post-purchase experience',
        icon: HeartHandshake,
        color: 'from-orange-500 to-orange-600',
        instructions: 'The sale is just the beginning. This stage is where you deliver on your promises and turn buyers into happy customers.',
        recommendedTools: ['Client Portal', 'Helpdesk', 'Knowledge Base', 'Project Management Tool', 'Automated Email Onboarding'],
        pathways: [
            {
                id: 'automated_onboarding',
                title: 'Automated Onboarding',
                description: 'Digital delivery of product/service with automated guidance.',
                example: 'A welcome email series delivering login details and a "Getting Started" video course.',
                formFields: [
                    { id: 'welcome_email', label: 'What does the first email say?', placeholder: 'Welcome + Login Info' },
                    { id: 'first_win', label: 'How do they get a "quick win" in the first 24h?', placeholder: 'e.g., Complete profile setup' }
                ]
            },
            {
                id: 'high_touch_service',
                title: 'White-Glove Service',
                description: 'Personalized, 1-on-1 onboarding and service delivery.',
                example: 'A kick-off call with an account manager to set up the client\'s software manually.',
                formFields: [
                    { id: 'kickoff_agenda', label: 'Agenda for the kick-off call:', placeholder: 'e.g., Introductions, Goal Setting, Timeline' },
                    { id: 'checkin_schedule', label: 'When are your milestone check-ins?', placeholder: 'e.g., Weekly on Fridays' }
                ]
            },
            {
                id: 'hybrid_model',
                title: 'Hybrid / Group Program',
                description: 'A mix of self-paced content and group support calls.',
                example: 'Access to a video library plus weekly group Q&A calls on Zoom.',
                formFields: [
                    { id: 'content_access', label: 'How do they access materials?', placeholder: 'e.g., Member Portal' },
                    { id: 'community_support', label: 'How is group support delivered?', placeholder: 'e.g., Slack Channel + Weekly Zoom' }
                ]
            }
        ],
        hqFeatures: [
            { name: 'Client Portal', description: 'Secure hub for clients to access downloads, invoices, and updates.', icon: FolderKanban },
            { name: 'Automated Workflows', description: 'Deliver welcome emails and onboarding steps automatically.', icon: Zap },
            { name: 'Support Management', description: 'Consolidate support tickets from all channels.', icon: MessageSquare }
        ]
    },
    {
        id: 'loyalty',
        title: 'Loyalty Stage',
        description: 'Retaining and delighting customers',
        icon: Trophy,
        color: 'from-red-500 to-red-600',
        instructions: 'Happy customers become repeat buyers and advocates. Deepen the relationship and encourage referrals.',
        recommendedTools: ['Review Management', 'Affiliate Software', 'Community Platform', 'Loyalty Program'],
        pathways: [
            {
                id: 'referral_program',
                title: 'Referral / Affiliate Program',
                description: 'Incentivize customers to refer friends in exchange for rewards or cash.',
                example: 'Giving customers a unique link that earns them 20% commission on referrals.',
                formFields: [
                    { id: 'incentive', label: 'What is the reward?', placeholder: 'e.g., $50 credit or 10% cash' },
                    { id: 'promotion_plan', label: 'How will you promote this program?', placeholder: 'e.g., Email after positive feedback' }
                ]
            },
            {
                id: 'vip_community',
                title: 'VIP Community',
                description: 'Create an exclusive space for customers to connect and get extra value.',
                example: 'A private Facebook group or Circle community for customers only.',
                formFields: [
                    { id: 'community_purpose', label: 'What is the main value of the community?', placeholder: 'e.g., Networking, Exclusive Content' },
                    { id: 'engagement_plan', label: 'How will you keep it active?', placeholder: 'e.g., Weekly challenges, Expert AMAs' }
                ]
            },
            {
                id: 'recurring_revenue',
                title: 'Recurring / Subscription',
                description: 'Offer ongoing value to turn one-time buyers into subscribers.',
                example: 'Offering a monthly maintenance package after building a website.',
                formFields: [
                    { id: 'subscription_offer', label: 'What is the recurring offer?', placeholder: 'e.g., Monthly support, content updates' },
                    { id: 'retention_tactic', label: 'How will you reduce churn?', placeholder: 'e.g., Quarterly reviews, loyalty bonuses' }
                ]
            }
        ],
        hqFeatures: [
            { name: 'Review Management', description: 'Automate review requests to boost your reputation.', icon: Star },
            { name: 'Affiliate Program', description: 'Launch a tracking and payout system for referrals.', icon: Users },
            { name: 'Social Community', description: 'Build a branded community to engage customers long-term.', icon: Users }
        ]
    }
];

// Multi-value input component
const MultiValueInput = ({ values = [], onChange, suggestions = [], placeholder = "Type and press Enter" }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Safety check for values to ensure it's always an array
    const safeValues = Array.isArray(values) ? values : [];

    const addValue = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !safeValues.includes(trimmedValue)) {
            onChange([...safeValues, trimmedValue]);
            setInputValue('');
            setShowSuggestions(false);
        }
    };

    const removeValue = (index) => {
        onChange(safeValues.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addValue(inputValue);
        } else if (e.key === 'Tab' && inputValue && showSuggestions && filteredSuggestions.length > 0) {
            e.preventDefault(); // Prevent tab from moving focus
            addValue(filteredSuggestions[0]); // Autocomplete with the first suggestion
        }
    };

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase()) && !safeValues.includes(s)
    );

    return (
        <div className="space-y-2">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(inputValue.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click on suggestions
                    placeholder={placeholder}
                    className="form-input pr-12" // Adjusted padding for button
                />
                <button
                    type="button"
                    onClick={() => addValue(inputValue)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary text-xs py-1 px-3"
                    disabled={!inputValue.trim()}
                >
                    <Plus className="w-4 h-4" />
                </button>

                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => addValue(suggestion)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-[var(--text-main)]"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {safeValues.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {safeValues.map((value, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary-gold)] text-white rounded-full text-sm"
                        >
                            {value}
                            <button
                                type="button"
                                onClick={() => removeValue(index)}
                                className="hover:bg-white/20 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function StrategyFormCustomerJourneyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [existingDocument, setExistingDocument] = useState(null);
    const [isImporting, setIsImporting] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAiContext] = useState({});

    const [formData, setFormData] = useState({
        persona: {
            name: '',
            age_range: '',
            gender: '',
            location: '',
            income_level: '',
            education: '',
            occupation: '',
            psychographics: [],
            pain_points: [],
            goals: [],
            core_values: [],
            research_method: '',
            decision_speed: '',
            price_sensitivity: '',
            preferred_contact: ''
        },
        awareness: { discovery_channels: '', pain_points: '', messaging: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
        consideration: { evaluation_criteria: '', common_questions: '', information_needs: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
        decision: { purchase_factors: '', obstacles: '', preferred_methods: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
        service: { onboarding_process: '', support_needs: '', communication_preferences: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
        loyalty: { retention_strategies: '', advocacy_opportunities: '', feedback_mechanisms: '', tools_checklist: [], selected_pathway: '', pathway_data: {} }
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            const journeyDocs = await StrategyDocument.filter({
                created_by: currentUser.email,
                document_type: 'customer_journey'
            });

            if (journeyDocs.length > 0) {
                setExistingDocument(journeyDocs[0]);
                const loadedContent = journeyDocs[0].content || {};

                // Helper to ensure an object is returned, not null
                const safeObj = (obj) => (obj && typeof obj === 'object' && !Array.isArray(obj)) ? obj : {};

                setFormData(prev => ({
                    ...prev,
                    ...loadedContent,
                    persona: {
                        ...prev.persona,
                        ...safeObj(loadedContent.persona),
                        // Ensure array fields exist and are arrays
                        psychographics: Array.isArray(loadedContent.persona?.psychographics) ? loadedContent.persona.psychographics : [],
                        pain_points: Array.isArray(loadedContent.persona?.pain_points) ? loadedContent.persona.pain_points : [],
                        goals: Array.isArray(loadedContent.persona?.goals) ? loadedContent.persona.goals : [],
                        core_values: Array.isArray(loadedContent.persona?.core_values) ? loadedContent.persona.core_values : []
                    },
                    awareness: { ...prev.awareness, ...safeObj(loadedContent.awareness), tools_checklist: Array.isArray(loadedContent.awareness?.tools_checklist) ? loadedContent.awareness.tools_checklist : [] },
                    consideration: { ...prev.consideration, ...safeObj(loadedContent.consideration), tools_checklist: Array.isArray(loadedContent.consideration?.tools_checklist) ? loadedContent.consideration.tools_checklist : [] },
                    decision: { ...prev.decision, ...safeObj(loadedContent.decision), tools_checklist: Array.isArray(loadedContent.decision?.tools_checklist) ? loadedContent.decision.tools_checklist : [] },
                    service: { ...prev.service, ...safeObj(loadedContent.service), tools_checklist: Array.isArray(loadedContent.service?.tools_checklist) ? loadedContent.service.tools_checklist : [] },
                    loyalty: { ...prev.loyalty, ...safeObj(loadedContent.loyalty), tools_checklist: Array.isArray(loadedContent.loyalty?.tools_checklist) ? loadedContent.loyalty.tools_checklist : [] },
                }));
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImportFromIdealClient = async () => {
        setIsImporting(true);
        try {
            const idealClientDocs = await StrategyDocument.filter({
                created_by: user.email,
                document_type: 'ideal_client'
            });

            if (idealClientDocs.length > 0) {
                const idealClient = idealClientDocs[0].content;

                // Helper to safely get a single value from idealClient and wrap in array
                const getArrayValue = (field) => {
                    const value = Array.isArray(idealClient[field]) ? idealClient[field][0] : idealClient[field];
                    return value ? [value] : [];
                };

                // Helper to get array of values from idealClient and flatten/filter
                const getMultiArrayValue = (...fields) => {
                    const values = fields.flatMap(field => {
                        const val = Array.isArray(idealClient[field]) ? idealClient[field] : (idealClient[field] ? [idealClient[field]] : []);
                        return val.filter(v => v); // Filter out any empty strings or nulls
                    });
                    return [...new Set(values)]; // Ensure uniqueness
                };


                setFormData(prev => ({
                    ...prev,
                    persona: {
                        ...prev.persona,
                        name: prev.persona.name || idealClient.name || '',
                        age_range: Array.isArray(idealClient.age_range) ? idealClient.age_range[0] || '' : idealClient.age_range || '',
                        gender: Array.isArray(idealClient.gender) ? idealClient.gender[0] || '' : idealClient.gender || '',
                        location: Array.isArray(idealClient.location) ? idealClient.location[0] || '' : idealClient.location || '',
                        income_level: Array.isArray(idealClient.income_level) ? idealClient.income_level[0] || '' : idealClient.income_level || '',
                        education: Array.isArray(idealClient.education) ? idealClient.education[0] || '' : idealClient.education || '',
                        occupation: Array.isArray(idealClient.occupation) ? idealClient.occupation[0] || '' : idealClient.occupation || '',

                        // Map old single values to new array types, combining psychographics
                        psychographics: getMultiArrayValue(
                            'values', 'interests', 'lifestyle', 'personality'
                        ),
                        pain_points: getArrayValue('pain_points'),
                        goals: getArrayValue('goals'),
                        core_values: getArrayValue('core_values'),

                        research_method: Array.isArray(idealClient.research_method) ? idealClient.research_method[0] || '' : idealClient.research_method || '',
                        decision_speed: Array.isArray(idealClient.decision_speed) ? idealClient.decision_speed[0] || '' : idealClient.decision_speed || '',
                        price_sensitivity: Array.isArray(idealClient.price_sensitivity) ? idealClient.price_sensitivity[0] || '' : idealClient.price_sensitivity || '',
                        preferred_contact: Array.isArray(idealClient.preferred_contact) ? idealClient.preferred_contact[0] || '' : idealClient.preferred_contact || ''
                    }
                }));
                alert('Successfully imported your Ideal Client data!');
            } else {
                alert('No Ideal Client profile found. Please complete the "Define Your Ideal Client" step first.');
            }
        } catch (error) {
            console.error("Error importing ideal client:", error);
            alert('Failed to import data. Please try again.');
        } finally {
            setIsImporting(false);
        }
    };

    const handleInputChange = (stage, field, value) => {
        setFormData(prev => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                [field]: value
            }
        }));
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            persona: {
                ...prev.persona,
                [field]: value
            }
        }));
    };

    const handleArrayChange = (field, values) => {
        setFormData(prev => ({
            ...prev,
            persona: {
                ...prev.persona,
                [field]: values
            }
        }));
    };

    const handleToolsChecklistChange = (stage, tool) => {
        setFormData(prev => {
            const currentChecklist = prev[stage]?.tools_checklist || [];
            const newChecklist = currentChecklist.includes(tool)
                ? currentChecklist.filter(t => t !== tool)
                : [...currentChecklist, tool];
            
            return {
                ...prev,
                [stage]: {
                    ...prev[stage],
                    tools_checklist: newChecklist
                }
            };
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const allStagesComplete =
                !!formData.persona.name &&
                !!formData.awareness.discovery_channels &&
                !!formData.consideration.evaluation_criteria &&
                !!formData.decision.purchase_factors &&
                !!formData.service.onboarding_process &&
                !!formData.loyalty.retention_strategies;

            const documentData = {
                document_type: 'customer_journey',
                title: 'My Customer Journey Map',
                content: formData,
                entrepreneurship_stage: user.entrepreneurship_stage,
                is_completed: allStagesComplete,
                last_updated: new Date().toISOString()
            };

            if (existingDocument) {
                await StrategyDocument.update(existingDocument.id, documentData);
            } else {
                await StrategyDocument.create(documentData);
            }

            if (allStagesComplete && user.subscription_level === 'free' && !user.customer_journey_completed_date) {
                await User.updateMyUserData({
                    customer_journey_completed_date: new Date().toISOString().split('T')[0]
                });
                alert('🎉 Congratulations! You\'ve completed your Customer Journey Map and unlocked a special discount for The Business Minds HQ!');
            } else {
                alert('Customer Journey Map saved successfully!');
            }

            navigate(createPageUrl('MyFoundationRoadmap'));
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const openAIHelp = useCallback((stageId) => {
        const stageInfo = STAGES.find(s => s.id === stageId);
        if (!stageInfo) return;

        const sectionTitle = `Customer Journey - ${stageInfo.title}`;
        let notes = [];

        if (stageInfo.instructions) {
            notes.push({ content: `General instructions for this stage: ${stageInfo.instructions}` });
        }
        if (stageInfo.connectionTip) {
            notes.push({ content: `Connection Tip: ${stageInfo.connectionTip}` });
        }
        if (stageInfo.howStagesConnect) {
            notes.push({ content: `How this stage connects to others: ${stageInfo.howStagesConnect}` });
        }

        const currentStageData = formData[stageId];

        if (stageId === 'persona') {
            notes.push({ content: `Current Persona Name: ${currentStageData.name || 'Not yet defined'}` });

            notes.push({ content: "Demographics:" });
            if (currentStageData.age_range) notes.push({ content: `- Age Range: ${currentStageData.age_range}` });
            if (currentStageData.gender) notes.push({ content: `- Gender: ${currentStageData.gender}` });
            if (currentStageData.location) notes.push({ content: `- Location: ${currentStageData.location}` });
            if (currentStageData.income_level) notes.push({ content: `- Income Level: ${currentStageData.income_level}` });
            if (currentStageData.education) notes.push({ content: `- Education: ${currentStageData.education}` });
            if (currentStageData.occupation) notes.push({ content: `- Occupation: ${currentStageData.occupation}` });

            if (currentStageData.psychographics?.length > 0) notes.push({ content: `Psychographics: ${currentStageData.psychographics.join(', ')}` });
            if (currentStageData.pain_points?.length > 0) notes.push({ content: `Pain Points: ${currentStageData.pain_points.join(', ')}` });
            if (currentStageData.goals?.length > 0) notes.push({ content: `Goals: ${currentStageData.goals.join(', ')}` });
            if (currentStageData.core_values?.length > 0) notes.push({ content: `Core Values: ${currentStageData.core_values.join(', ')}` });

            notes.push({ content: "Buying Behaviors:" });
            if (currentStageData.research_method) notes.push({ content: `- Research Method: ${currentStageData.research_method}` });
            if (currentStageData.decision_speed) notes.push({ content: `- Decision Speed: ${currentStageData.decision_speed}` });
            if (currentStageData.price_sensitivity) notes.push({ content: `- Price Sensitivity: ${currentStageData.price_sensitivity}` });
            if (currentStageData.preferred_contact) notes.push({ content: `- Preferred Contact: ${currentStageData.preferred_contact}` });

            notes.push({ content: "Charlie, help me refine this persona description. What additional details or insights could make this persona more vivid and actionable for marketing purposes?" });

        } else if (stageId === 'awareness') {
            if (currentStageData.discovery_channels) notes.push({ content: `Currently known discovery channels: ${currentStageData.discovery_channels}` });
            if (currentStageData.pain_points) notes.push({ content: `Customer's initial pain points: ${currentStageData.pain_points}` });
            if (currentStageData.messaging) notes.push({ content: `Existing messaging for this stage: ${currentStageData.messaging}` });
            notes.push({ content: "Charlie, suggest creative ways to increase visibility for my ideal client at this stage. Provide ideas for channels and initial messaging that resonates with their pain points." });

        } else if (stageId === 'consideration') {
            if (currentStageData.evaluation_criteria) notes.push({ content: `Known evaluation criteria: ${currentStageData.evaluation_criteria}` });
            if (currentStageData.common_questions) notes.push({ content: `Common customer questions: ${currentStageData.common_questions}` });
            if (currentStageData.information_needs) notes.push({ content: `Customer's information needs: ${currentStageData.information_needs}` });
            notes.push({ content: "Charlie, what content pieces (e.g., blog posts, webinars, case studies) should I create to address these evaluation criteria, questions, and information needs effectively?" });

        } else if (stageId === 'decision') {
            if (currentStageData.purchase_factors) notes.push({ content: `Key purchase decision factors: ${currentStageData.purchase_factors}` });
            if (currentStageData.obstacles) notes.push({ content: `Potential obstacles to purchase: ${currentStageData.obstacles}` });
            if (currentStageData.preferred_methods) notes.push({ content: `Preferred payment/engagement methods: ${currentStageData.preferred_methods}` });
            notes.push({ content: "Charlie, how can I optimize my sales process to reduce friction and address potential obstacles for my ideal client at the decision stage? Suggest guarantees or incentives." });

        } else if (stageId === 'service') {
            if (currentStageData.onboarding_process) notes.push({ content: `Current onboarding process: ${currentStageData.onboarding_process}` });
            if (currentStageData.support_needs) notes.push({ content: `Known customer support needs: ${currentStageData.support_needs}` });
            if (currentStageData.communication_preferences) notes.push({ content: `Customer communication preferences: ${currentStageData.communication_preferences}` });
            notes.push({ content: "Charlie, provide ideas for an exceptional post-purchase experience and customer support strategy to ensure customer satisfaction and reduce churn." });

        } else if (stageId === 'loyalty') {
            if (currentStageData.retention_strategies) notes.push({ content: `Existing retention strategies: ${currentStageData.retention_strategies}` });
            if (currentStageData.advocacy_opportunities) notes.push({ content: `Known advocacy opportunities: ${currentStageData.advocacy_opportunities}` });
            if (currentStageData.feedback_mechanisms) notes.push({ content: `Current feedback mechanisms: ${currentStageData.feedback_mechanisms}` });
            notes.push({ content: "Charlie, how can I foster customer loyalty and turn satisfied customers into enthusiastic advocates? Suggest strategies for referrals, testimonials, and community building." });
        }

        setAiContext({
            sectionTitle: sectionTitle,
            userNotes: notes.filter(note => note.content.trim() !== '')
        });
        setShowAIAssistant(true);
    }, [formData, STAGES]);

// Memoized Stage Content to prevent re-renders and focus loss
const StageContent = React.memo(({ stage, openAIHelp, formData, handleInputChange, handleSelectChange, handleArrayChange, handleImportFromIdealClient, isImporting, handleToolsChecklistChange }) => {
    const Icon = stage.icon;
    const isPersona = stage.id === 'persona';

    return (
        <div className="space-y-6">
            {/* Stage Header */}
            <div className={`bg-gradient-to-r ${stage.color} text-white p-6 rounded-lg`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-lg">
                            <Icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{stage.title}</h2>
                            <p className="text-white/90 mt-1">{stage.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => openAIHelp(stage.id)}
                        className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                        title="Get AI Help for this stage"
                    >
                        <Sparkles className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Stage Instructions */}
            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                    Understanding This Stage
                </h3>
                <p className="text-[var(--text-soft)] mb-4">{stage.instructions}</p>

                {!isPersona && (
                    <>
                        {stage.streamlinesBusiness && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">💡 How The HQ Streamlines This:</h4>
                                <p className="text-[var(--text-soft)]">{stage.streamlinesBusiness}</p>
                            </div>
                        )}

                        {stage.realWorldExample && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">🌍 Real-World Example:</h4>
                                <p className="text-[var(--text-soft)] italic">{stage.realWorldExample}</p>
                            </div>
                        )}

                        {stage.emotions && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">❤️ Customer Emotions:</h4>
                                <p className="text-[var(--text-soft)]">{stage.emotions}</p>
                            </div>
                        )}

                        {stage.connectionTip && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">🤝 Connection Tip:</h4>
                                <p className="text-[var(--text-soft)]">{stage.connectionTip}</p>
                            </div>
                        )}
                    </>
                )}

                {isPersona && stage.connectionTip && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
                        <h4 className="font-semibold text-[var(--text-main)] mb-2">🤝 Why This Matters:</h4>
                        <p className="text-[var(--text-soft)]">{stage.connectionTip}</p>
                    </div>
                )}

                {stage.howStagesConnect && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500 mt-4">
                        <h4 className="font-semibold text-[var(--text-main)] mb-2">🔄 How This Stage Connects:</h4>
                        <p className="text-[var(--text-soft)]">{stage.howStagesConnect}</p>
                    </div>
                )}
            </div>

            {isPersona ? (
                <div className="space-y-6">
                    {/* Import Button */}
                    <div className="card p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="font-semibold text-[var(--text-main)] mb-1">Already Defined Your Ideal Client?</h4>
                                <p className="text-sm text-[var(--text-soft)]">Import your existing Ideal Client data to save time.</p>
                            </div>
                            <button
                                onClick={handleImportFromIdealClient}
                                disabled={isImporting}
                                className="btn btn-primary ml-0 sm:ml-4 flex-shrink-0 w-full sm:w-auto"
                            >
                                {isImporting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Importing...
                                    </>
                                ) : (
                                    <>
                                        <ChevronRight className="w-4 h-4 mr-2" />
                                        Import Data
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Give Your Ideal Customer a Name *
                        </label>
                        <input
                            type="text"
                            value={formData.persona.name}
                            onChange={(e) => handleInputChange('persona', 'name', e.target.value)}
                            placeholder="e.g., 'Startup Sarah' or 'Corporate Chris'"
                            className="form-input"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-1">Naming your customer makes them real and helps you connect emotionally.</p>
                    </div>

                    {/* Demographics Section */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Demographics</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Age Range</label>
                                <select
                                    value={formData.persona.age_range || ''}
                                    onChange={(e) => handleSelectChange('age_range', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select age range</option>
                                    {DEMOGRAPHICS_OPTIONS.age_range.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Gender</label>
                                <select
                                    value={formData.persona.gender || ''}
                                    onChange={(e) => handleSelectChange('gender', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select gender</option>
                                    {DEMOGRAPHICS_OPTIONS.gender.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Location</label>
                                <select
                                    value={formData.persona.location || ''}
                                    onChange={(e) => handleSelectChange('location', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select location</option>
                                    {DEMOGRAPHICS_OPTIONS.location.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Income Level</label>
                                <select
                                    value={formData.persona.income_level || ''}
                                    onChange={(e) => handleSelectChange('income_level', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select income level</option>
                                    {DEMOGRAPHICS_OPTIONS.income_level.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Education</label>
                                <select
                                    value={formData.persona.education || ''}
                                    onChange={(e) => handleSelectChange('education', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select education level</option>
                                    {DEMOGRAPHICS_OPTIONS.education.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Occupation</label>
                                <select
                                    value={formData.persona.occupation || ''}
                                    onChange={(e) => handleSelectChange('occupation', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select occupation</option>
                                    {DEMOGRAPHICS_OPTIONS.occupation.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Psychographics Section - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Psychographics</h3>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Values, Interests, Lifestyle & Personality Traits
                        </label>
                        <MultiValueInput
                            values={formData.persona.psychographics}
                            onChange={(values) => handleArrayChange('psychographics', values)}
                            suggestions={PSYCHOGRAPHICS_SUGGESTIONS}
                            placeholder="Add psychographic traits (e.g., Innovation, Creative, Fast-paced)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Add as many as apply. These help you understand their mindset and lifestyle.</p>
                    </div>

                    {/* Pain Points - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Pain Points</h3>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What problems or frustrations do they face?
                        </label>
                        <MultiValueInput
                            values={formData.persona.pain_points}
                            onChange={(values) => handleArrayChange('pain_points', values)}
                            suggestions={PAIN_POINTS_SUGGESTIONS}
                            placeholder="Add pain points (e.g., Lack of time, Limited budget)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Understanding their pain points helps you create targeted solutions.</p>
                    </div>

                    {/* Goals & Aspirations - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Goals & Aspirations</h3>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What are they trying to achieve?
                        </label>
                        <MultiValueInput
                            values={formData.persona.goals}
                            onChange={(values) => handleArrayChange('goals', values)}
                            suggestions={GOALS_SUGGESTIONS}
                            placeholder="Add goals (e.g., Start a business, Achieve financial freedom)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Their goals drive their decisions and actions.</p>
                    </div>

                    {/* Core Values - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Core Values</h3>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What principles guide their decisions?
                        </label>
                        <MultiValueInput
                            values={formData.persona.core_values}
                            onChange={(values) => handleArrayChange('core_values', values)}
                            suggestions={VALUES_SUGGESTIONS}
                            placeholder="Add core values (e.g., Integrity, Innovation, Family)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Core values help you align your messaging with what matters most to them.</p>
                    </div>

                    {/* Buying Behaviors */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Buying Behaviors</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Research Method</label>
                                <select
                                    value={formData.persona.research_method || ''}
                                    onChange={(e) => handleSelectChange('research_method', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select research method</option>
                                    {BUYING_BEHAVIORS_OPTIONS.research_method.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Decision Speed</label>
                                <select
                                    value={formData.persona.decision_speed || ''}
                                    onChange={(e) => handleSelectChange('decision_speed', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select decision speed</option>
                                    {BUYING_BEHAVIORS_OPTIONS.decision_speed.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Price Sensitivity</label>
                                <select
                                    value={formData.persona.price_sensitivity || ''}
                                    onChange={(e) => handleSelectChange('price_sensitivity', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select price sensitivity</option>
                                    {BUYING_BEHAVIORS_OPTIONS.price_sensitivity.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Preferred Contact Method</label>
                                <select
                                    value={formData.persona.preferred_contact || ''}
                                    onChange={(e) => handleSelectChange('preferred_contact', e.target.value)}
                                    className="form-input"
                                >
                                    <option value="">Select contact method</option>
                                    {BUYING_BEHAVIORS_OPTIONS.preferred_contact.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Tools Checklist Section - NEW */}
                    {stage.recommendedTools && (
                        <div className="card p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 flex items-center text-[var(--text-main)]">
                                <Wrench className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                                Recommended Tools Checklist
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                Select the tools you plan to use or already use for this stage.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {stage.recommendedTools.map((tool, index) => (
                                    <label key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            checked={formData[stage.id]?.tools_checklist?.includes(tool) || false}
                                            onChange={() => handleToolsChecklistChange(stage.id, tool)}
                                            className="h-5 w-5 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                                        />
                                        <span className="text-sm text-[var(--text-main)] font-medium">{tool}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* HQ Features Section */}
                    {stage.hqFeatures && (
                        <div className="card p-6 bg-gradient-to-br from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/10 border-2 border-[var(--primary-gold)]/30">
                            <h3 className="font-bold text-lg mb-4 flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                                The HQ Features for {stage.title}
                            </h3>
                            <div className="space-y-3">
                                {stage.hqFeatures.map((feature, index) => {
                                    const FeatureIcon = feature.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                                            <div className="bg-[var(--primary-gold)]/10 p-2 rounded-md flex-shrink-0">
                                                <FeatureIcon className="w-4 h-4 text-[var(--primary-gold)]" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-[var(--text-main)]">{feature.name}</h4>
                                                <p className="text-xs text-[var(--text-soft)] mt-1">{feature.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Stage-Specific Questions */}
                    <div className="space-y-4">
                        {stage.id === 'awareness' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Discovery Channels
                                    </label>
                                    <textarea
                                        value={formData.awareness.discovery_channels}
                                        onChange={(e) => handleInputChange('awareness', 'discovery_channels', e.target.value)}
                                        placeholder="How do potential customers currently find out about your business? (e.g., social media, Google search, referrals)"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Initial Pain Points
                                    </label>
                                    <textarea
                                        value={formData.awareness.pain_points}
                                        onChange={(e) => handleInputChange('awareness', 'pain_points', e.target.value)}
                                        placeholder="What problems are they aware of at this stage?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Key Messaging
                                    </label>
                                    <textarea
                                        value={formData.awareness.messaging}
                                        onChange={(e) => handleInputChange('awareness', 'messaging', e.target.value)}
                                        placeholder="What message will grab their attention? How will you speak to their frustration and curiosity?"
                                        className="form-input h-24"
                                    />
                                </div>
                            </>
                        )}

                        {stage.id === 'consideration' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Evaluation Criteria
                                    </label>
                                    <textarea
                                        value={formData.consideration.evaluation_criteria}
                                        onChange={(e) => handleInputChange('consideration', 'evaluation_criteria', e.target.value)}
                                        placeholder="What factors do customers use to compare you to competitors?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Common Questions
                                    </label>
                                    <textarea
                                        value={formData.consideration.common_questions}
                                        onChange={(e) => handleInputChange('consideration', 'common_questions', e.target.value)}
                                        placeholder="What questions do they typically ask during this stage?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Information Needs
                                    </label>
                                    <textarea
                                        value={formData.consideration.information_needs}
                                        onChange={(e) => handleInputChange('consideration', 'information_needs', e.target.value)}
                                        placeholder="What information or resources do they need to move forward? How can you build trust through education?"
                                        className="form-input h-24"
                                    />
                                </div>
                            </>
                        )}

                        {stage.id === 'decision' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Purchase Decision Factors
                                    </label>
                                    <textarea
                                        value={formData.decision.purchase_factors}
                                        onChange={(e) => handleInputChange('decision', 'purchase_factors', e.target.value)}
                                        placeholder="What factors influence their final purchase decision? (e.g., price, trust, urgency, guarantees)"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Potential Obstacles
                                    </label>
                                    <textarea
                                        value={formData.decision.obstacles}
                                        onChange={(e) => handleInputChange('decision', 'obstacles', e.target.value)}
                                        placeholder="What might prevent them from buying? How can you address these obstacles and reduce friction?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Preferred Payment Methods
                                    </label>
                                    <textarea
                                        value={formData.decision.preferred_methods}
                                        onChange={(e) => handleInputChange('decision', 'preferred_methods', e.target.value)}
                                        placeholder="How do they prefer to pay or engage with your offer?"
                                        className="form-input h-24"
                                    />
                                </div>
                            </>
                        )}

                        {stage.id === 'service' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Onboarding Process
                                    </label>
                                    <textarea
                                        value={formData.service.onboarding_process}
                                        onChange={(e) => handleInputChange('service', 'onboarding_process', e.target.value)}
                                        placeholder="What happens immediately after purchase? How do you onboard new clients and help them feel welcomed?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Support Needs
                                    </label>
                                    <textarea
                                        value={formData.service.support_needs}
                                        onChange={(e) => handleInputChange('service', 'support_needs', e.target.value)}
                                        placeholder="What support or assistance do clients need during service delivery? How can you proactively address their concerns?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Communication Preferences
                                    </label>
                                    <textarea
                                        value={formData.service.communication_preferences}
                                        onChange={(e) => handleInputChange('service', 'communication_preferences', e.target.value)}
                                        placeholder="How do clients prefer to communicate and receive updates?"
                                        className="form-input h-24"
                                    />
                                </div>
                            </>
                        )}

                        {stage.id === 'loyalty' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Retention Strategies
                                    </label>
                                    <textarea
                                        value={formData.loyalty.retention_strategies}
                                        onChange={(e) => handleInputChange('loyalty', 'retention_strategies', e.target.value)}
                                        placeholder="How do you encourage repeat business and long-term relationships? How will you celebrate their success?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Advocacy Opportunities
                                    </label>
                                    <textarea
                                        value={formData.loyalty.advocacy_opportunities}
                                        onChange={(e) => handleInputChange('loyalty', 'advocacy_opportunities', e.target.value)}
                                        placeholder="How can satisfied customers become advocates (referrals, testimonials, affiliates)? How will you make them feel special?"
                                        className="form-input h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                        Feedback Mechanisms
                                    </label>
                                    <textarea
                                        value={formData.loyalty.feedback_mechanisms}
                                        onChange={(e) => handleInputChange('loyalty', 'feedback_mechanisms', e.target.value)}
                                        placeholder="How do you gather and act on customer feedback to continuously improve?"
                                        className="form-input h-24"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
});

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!user) {
        return <div className="text-center py-10">Please log in to access this tool.</div>;
    }

    return (
        <SubscriptionGate user={user} requiredLevel="business_hq" feature="the Customer Journey mapping tool">
            <div className="px-4 pb-20 md:pb-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="card p-6">
                        <h1 className="text-3xl font-bold mb-2">Map Your Customer Journey</h1>
                        <p className="text-[var(--text-soft)]">
                            Understand your customer's experience at every stage and discover how The Business Minds HQ streamlines each touchpoint.
                        </p>

                        {/* AI Help Banner */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-500 rounded">
                            <div className="flex items-start gap-2">
                                <span className="text-2xl">✍️</span>
                                <div className="flex-1">
                                    <p className="text-sm text-[var(--text-main)] font-semibold mb-1">
                                        Charlie Can Help You Map Your Customer Journey!
                                    </p>
                                    <p className="text-xs text-[var(--text-soft)]">
                                        Click the ✨ icon next to any stage to get help writing touchpoints, content ideas, and messaging for that stage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="card p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[var(--text-soft)]">
                                Stage {currentStage + 1} of {STAGES.length}
                            </span>
                            <span className="text-sm font-medium text-[var(--primary-gold)]">
                                {Math.round(((currentStage + 1) / STAGES.length) * 100)}% Complete
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            {STAGES.map((stage, index) => (
                                <div
                                    key={stage.id}
                                    className={`flex-1 h-2 rounded-full transition-all ${
                                        index <= currentStage ? 'bg-[var(--primary-gold)]' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stage Content */}
                    <div className="card p-6">
                        <StageContent 
                            stage={STAGES[currentStage]} 
                            openAIHelp={openAIHelp} 
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSelectChange={handleSelectChange}
                            handleArrayChange={handleArrayChange}
                            handleImportFromIdealClient={handleImportFromIdealClient}
                            isImporting={isImporting}
                            handleToolsChecklistChange={handleToolsChecklistChange}
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
                            disabled={currentStage === 0}
                            className="btn btn-ghost"
                        >
                            ← Previous
                        </button>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="btn btn-secondary"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Progress
                            </button>

                            {currentStage < STAGES.length - 1 ? (
                                <button
                                    onClick={() => setCurrentStage(Math.min(STAGES.length - 1, currentStage + 1))}
                                    className="btn btn-primary"
                                >
                                    Next Stage →
                                </button>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="btn btn-primary"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                    Complete & Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="charlie"
                sectionTitle={aiContext.sectionTitle}
                userNotes={aiContext.userNotes || []}
            />
        </SubscriptionGate>
    );
}