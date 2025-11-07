
import React, { useState, useEffect, useCallback } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, Save, ChevronRight, CheckCircle, UserCircle, Eye, Search, ShoppingCart, HeartHandshake, Trophy, Share2, MessageSquare, Palette, Globe, DollarSign, Smartphone, FolderKanban, Star, Users, Zap, Lightbulb, Sparkles } from 'lucide-react';
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

const PSYCHOGRAPHICS_OPTIONS = {
    values: ['Innovation', 'Tradition', 'Family', 'Success', 'Freedom', 'Security', 'Community', 'Sustainability', 'Efficiency', 'Quality'],
    interests: ['Technology', 'Business', 'Health & Fitness', 'Travel', 'Arts & Culture', 'Sports', 'Education', 'Finance', 'Entertainment', 'Food & Dining'],
    lifestyle: ['Fast-paced', 'Balanced', 'Minimalist', 'Luxury-oriented', 'Family-focused', 'Career-driven', 'Health-conscious', 'Adventure-seeking'],
    personality: ['Analytical', 'Creative', 'Pragmatic', 'Innovative', 'Traditional', 'Risk-taker', 'Cautious', 'Social', 'Independent']
};

const PAIN_POINTS_OPTIONS = [
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

const GOALS_OPTIONS = [
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

const VALUES_OPTIONS = [
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
        instructions: 'At this stage, your customer is experiencing a problem or need but may not fully understand it yet. They\'re searching for information, asking questions, or noticing symptoms of their pain point. Your goal is to be visible where they\'re looking and speak to their initial concerns. This is your first impression - make it count by addressing their pain points with empathy and offering valuable information, not a sales pitch.',
        streamlinesBusiness: 'The HQ\'s Social Media Manager allows you to schedule posts across Facebook, Instagram, LinkedIn, Twitter, and TikTok from one dashboard - ensuring consistent visibility without the time drain. The Ads Management feature lets you create, launch, and track Facebook, Instagram, and Google Ads campaigns directly in The HQ, with built-in analytics to see what\'s working. Marketing Automation captures leads the moment they engage with your content, automatically adding them to nurture sequences that build trust over time.',
        realWorldExample: 'Example: A startup founder is frustrated with juggling multiple tools (CRM, email, website, calendar). They start Googling "all-in-one business platform" or see your social media post about "Stop paying for 10 different tools." You\'ve just entered their awareness. Your content speaks directly to their frustration, offering a free guide on "The True Cost of Tool Overload." They download it, and The HQ automatically adds them to a nurture sequence.',
        emotions: 'Frustration, Curiosity, Confusion, Hope, Relief (that someone understands)',
        connectionTip: 'Speak to their pain points with empathy. Use language like "We know how overwhelming it feels when..." or "You\'re not alone in struggling with..." Show you understand their frustration before offering solutions. The key is to be helpful first, salesy never. Position yourself as a guide, not a vendor.',
        howStagesConnect: 'Awareness leads naturally into Consideration. Once your customer knows you exist and sees that you understand their problem, they\'ll want to learn more. The content you create in the Awareness stage (blog posts, social media, ads) should seamlessly guide them to educational resources in the Consideration stage (webinars, case studies, free trials).',
        hqFeatures: [
            { 
                name: 'Social Media Manager', 
                description: 'Schedule and publish posts across all major platforms (Facebook, Instagram, LinkedIn, Twitter, TikTok) from one unified calendar. Create content once, distribute everywhere. Track engagement metrics to see which messages resonate most with your ideal customer. Set up automated posting schedules so you\'re always visible, even when you\'re sleeping.', 
                icon: Share2 
            },
            { 
                name: 'Ads Management', 
                description: 'Create, launch, and manage Facebook, Instagram, and Google Ads campaigns without leaving The HQ. Built-in targeting tools help you reach your exact ideal customer. Real-time analytics show which ads are driving traffic and conversions. A/B test different ad creatives and copy to optimize performance. Note: This is a $20/month add-on, and we never take a cut of your ad spend - every dollar goes directly to your campaigns.', 
                icon: Zap 
            },
            { 
                name: 'Marketing Automation', 
                description: 'Capture leads automatically from your website, social media, and ads. Set up "if/then" workflows that trigger based on customer behavior (e.g., "If someone downloads the free guide, add them to the 7-day email sequence"). Tag and segment leads based on interests, actions, and demographics. Send personalized follow-up messages that nurture trust before you ever ask for a sale.', 
                icon: Zap 
            }
        ]
    },
    {
        id: 'consideration',
        title: 'Consideration Stage',
        description: 'How customers evaluate solutions',
        icon: Search,
        color: 'from-green-500 to-green-600',
        instructions: 'Now your customer knows they have a problem and they\'re actively researching solutions. They\'re comparing options, reading reviews, watching demos, and evaluating whether your solution fits their needs. They need education, proof, and clarity. This is where you become a trusted advisor by providing transparent information, showcasing results, and removing doubts. The goal isn\'t to "convince" them - it\'s to help them make an informed decision.',
        streamlinesBusiness: 'The HQ\'s Website & Funnel Builder lets you create high-converting landing pages and sales funnels in minutes using drag-and-drop templates. No coding required. Host Webinars directly in The HQ to educate prospects at scale, with built-in registration pages and automated reminder emails. Marketing Automation delivers targeted content based on what prospects are interested in - if they clicked on a pricing email, send them a comparison guide; if they watched a demo video, invite them to a Q&A session.',
        realWorldExample: 'Example: The startup founder visits your website (built with The HQ\'s Website Builder), downloads a free guide on "Choosing the Right Business Platform," watches your webinar on streamlining operations (hosted via The HQ\'s Webinar feature), and receives a series of educational emails showcasing case studies (sent via Marketing Automation). They\'re evaluating you against 2-3 competitors. Your transparent pricing, real customer testimonials, and helpful content build trust and position you as the obvious choice.',
        emotions: 'Skepticism, Analysis, Overwhelm, Cautious Optimism, Hope',
        connectionTip: 'Provide value without pressure. Offer educational content, transparent comparisons, and social proof (testimonials, case studies). Use language like "See how it works for yourself" or "Here\'s what others in your situation discovered..." Build trust through education. Never hide your pricing or make false promises. The more transparent and helpful you are, the more they\'ll trust you when it\'s time to buy.',
        howStagesConnect: 'Consideration naturally flows into Decision. As your customer becomes educated about their options and confident in your solution, they move closer to purchase. The educational content and trust you build in Consideration removes objections and friction in the Decision stage. By the time they\'re ready to buy, it should feel like an easy, natural next step.',
        hqFeatures: [
            { 
                name: 'Drag-and-Drop Website Builder', 
                description: 'Build stunning, mobile-responsive websites and landing pages without any coding. Choose from hundreds of professionally-designed templates or start from scratch. Customize every element with drag-and-drop simplicity. Built-in SEO tools ensure Google can find your site. A/B test different page versions to optimize conversions. Integrate forms that automatically add leads to your CRM.', 
                icon: Globe 
            },
            { 
                name: 'Funnel Builder', 
                description: 'Create multi-step sales funnels that guide prospects from interest to purchase. Build opt-in pages, sales pages, upsell pages, and thank you pages - all connected in a seamless flow. Pre-built funnel templates for common business models (coaches, consultants, e-commerce, courses, etc.). Track conversion rates at every step to identify and fix drop-off points. Integrate payment processing for instant sales.', 
                icon: FolderKanban 
            },
            { 
                name: 'Webinar Feature', 
                description: 'Host live or automated webinars to educate and convert your audience at scale. Built-in registration pages with customizable fields. Automated reminder emails to reduce no-shows. Live chat during webinars for real-time Q&A. Replay options for those who couldn\'t attend live. Analytics show watch time, engagement, and conversion rates. Integrate with your CRM to track which attendees become customers.', 
                icon: Users 
            },
            { 
                name: 'Marketing Automation (Consideration)', 
                description: 'Deliver the right educational content at the right time based on prospect behavior. Create "drip campaigns" that nurture leads over days or weeks. Segment prospects based on interests (e.g., "pricing interested" vs "feature interested") and send tailored content. Track email opens, clicks, and engagement to see what resonates. Automatically score leads based on engagement so you know who\'s hot and ready for a sales call.', 
                icon: Zap 
            }
        ]
    },
    {
        id: 'decision',
        title: 'Decision Stage',
        description: 'How customers make a purchase',
        icon: ShoppingCart,
        color: 'from-yellow-500 to-yellow-600',
        instructions: 'Your customer is ready to buy but needs final reassurance. They\'re looking at pricing, guarantees, ease of getting started, and payment options. Any friction here can cause them to abandon the purchase. Make it easy, clear, and low-risk. This is where all your hard work pays off - but only if you make the buying process seamless. Remove every possible obstacle. Offer guarantees. Celebrate their decision and make them feel smart for choosing you.',
        streamlinesBusiness: 'The HQ\'s CRM tracks exactly where each lead is in the buying process with visual pipelines, automated follow-ups, and task reminders so no deal falls through the cracks. Unlimited Estimates & Invoices let you send professional quotes and invoices instantly, with online payment links included. Mobile App Payments mean you can close deals anywhere - at a coffee shop, at an event, even on a plane. Marketing Automation sends timely "nudge" emails (e.g., "Your quote expires in 24 hours") and celebrates purchases with welcome sequences.',
        realWorldExample: 'Example: The startup founder is ready to commit. They see your clear pricing on your website (no hidden fees), a 14-day free trial (low risk), and can sign up in under 2 minutes via a simple form (built with The HQ\'s Funnel Builder). They enter their payment info, and The HQ processes it instantly via Mobile App Payments. Your automated welcome email arrives within seconds via Marketing Automation, outlining the next steps and making them feel confident they made the right choice. They\'re now in your CRM, tagged as a "New Customer," triggering your onboarding workflow.',
        emotions: 'Excitement, Anxiety, Decisiveness, Fear of Making Wrong Choice, Anticipation',
        connectionTip: 'Remove all friction and risk. Use language like "Start your free trial - no credit card required," "Cancel anytime," or "30-day money-back guarantee." Celebrate their decision: "You\'re about to transform your business." Make them feel smart and confident. Follow up immediately (automated email within minutes) to reinforce they made the right choice and outline clear next steps. The faster they see value, the less buyer\'s remorse they\'ll feel.',
        howStagesConnect: 'Decision leads directly into Service. The moment your customer completes the purchase, the Service stage begins. The welcome email they receive, the onboarding process you deliver, and the support you provide in the first 30 days will determine whether they stay a customer or churn. Make the transition from "buyer" to "happy customer" seamless and celebratory.',
        hqFeatures: [
            { 
                name: 'Unlimited Estimates & Invoices', 
                description: 'Generate and send professional, branded estimates and invoices with one click. Customizable templates match your brand. Include payment links so customers can pay instantly online (credit card, ACH, Apple Pay, Google Pay). Track invoice status in real-time (sent, viewed, paid). Set up automatic payment reminders for overdue invoices. Accept deposits or payment plans. Sync with your accounting software (QuickBooks, Xero) for seamless bookkeeping.', 
                icon: DollarSign 
            },
            { 
                name: 'Mobile App Payments', 
                description: 'Accept payments anywhere using The HQ mobile app. Perfect for in-person sales, events, or consultations. Supports credit/debit cards, Apple Pay, Google Pay, and ACH transfers. Generate payment links on-the-fly and text or email them to customers. Instant payment confirmation with digital receipts. All transactions automatically sync with your CRM and accounting, so your books are always up-to-date.', 
                icon: Smartphone 
            },
            { 
                name: 'CRM (Customer Relationship Management)', 
                description: 'Visualize your sales pipeline with drag-and-drop deal stages (e.g., "Prospect," "Qualified," "Proposal Sent," "Negotiation," "Closed Won"). Track every interaction with each lead (emails sent, calls made, meetings scheduled). Set automated follow-up reminders so you never forget to check in. Assign deals to team members and track their performance. Built-in reporting shows conversion rates, average deal size, and sales velocity. Integrates with email, calendar, and phone for seamless communication.', 
                icon: FolderKanban 
            },
            { 
                name: 'Marketing Automation (Decision)', 
                description: 'Send timely "decision nudges" automatically - abandoned cart reminders, expiring offer alerts, limited-time discount notifications. Trigger purchase confirmation emails instantly upon payment. Deliver digital products or access credentials automatically. Send personalized "welcome to the family" sequences that celebrate the customer\'s decision and outline next steps. Tag customers in your CRM based on what they purchased so you can upsell or cross-sell later.', 
                icon: Zap 
            }
        ]
    },
    {
        id: 'service',
        title: 'Service Stage',
        description: 'Post-purchase experience',
        icon: HeartHandshake,
        color: 'from-orange-500 to-orange-600',
        instructions: 'The sale is just the beginning. This stage is where you deliver on your promises. Your customer needs to feel supported, confident they made the right choice, and see quick wins. Poor onboarding or service delivery is where churn happens. This is your chance to turn a one-time buyer into a lifelong customer. Exceed expectations. Proactively check in. Celebrate their progress. Make them feel like VIPs, not just transaction numbers.',
        streamlinesBusiness: 'The HQ\'s Client Portal gives your customers a branded, secure hub where they can access downloads, view invoices, track project progress, and communicate with your team - all in one place. No more scattered emails or lost files. Automated Onboarding Workflows deliver welcome videos, setup guides, and milestone check-ins automatically, ensuring every customer gets a consistent, high-quality experience. Customer Support Management consolidates all support requests (email, chat, social media) into one inbox, with ticket tracking and automated responses for common questions.',
        realWorldExample: 'Example: After signing up, the startup founder receives an automated welcome series via Marketing Automation with video tutorials, setup checklists, and quick-win guides. They access their personalized Client Portal (built with The HQ) with all setup guides, training videos, and access credentials organized beautifully. They can track their onboarding progress and see what\'s next. When they have a question, they message your support team via the Client Portal, and The HQ\'s Support Management routes it to the right person. They get a response within an hour. They feel supported and start seeing results quickly - reducing the likelihood of churn.',
        emotions: 'Relief, Validation, Eagerness, Slight Overwhelm, Gratitude',
        connectionTip: 'Make them feel like a VIP. Use language like "Welcome to the family!" or "We\'re here to ensure your success." Check in proactively: "How\'s your first week going?" Celebrate small wins: "You\'ve completed your setup - great job!" Show you care about their success, not just their money. The better your onboarding and service experience, the less likely they are to churn and the more likely they are to refer others.',
        howStagesConnect: 'Service leads into Loyalty. The quality of service you provide in the first 30-90 days determines whether customers stay, leave, or become raving fans. Happy, well-served customers naturally become advocates. They leave reviews, refer friends, and buy more. Poor service experiences lead to churn and negative reviews. The Service stage is where you earn the right to ask for loyalty.',
        hqFeatures: [
            { 
                name: 'Client Portal', 
                description: 'Provide each customer with a secure, branded portal where they can access everything they need. Upload files, documents, and digital products for instant download. Display invoices, payment history, and account status. Show project progress with visual timelines. Enable two-way messaging between clients and your team. Customers log in once and have everything at their fingertips - no more digging through emails. Fully white-labled with your logo and brand colors.', 
                icon: FolderKanban 
            },
            { 
                name: 'Automated Onboarding Workflows', 
                description: 'Create step-by-step onboarding sequences that deliver the right content at the right time. Day 1: Welcome video and setup guide. Day 3: Quick-win tutorial. Day 7: Check-in email. Day 30: Success milestone celebration. Trigger workflows based on customer actions (e.g., "If they complete setup, send the advanced training"). Include videos, PDFs, checklists, and calendar links. Track completion rates to see where customers get stuck and improve your onboarding.', 
                icon: Zap 
            },
            { 
                name: 'Customer Support Management', 
                description: 'Consolidate all support requests from email, live chat, social media, and your Client Portal into one unified inbox. Assign tickets to team members and track response times. Set up automated responses for common questions (e.g., "How do I reset my password?"). Create a knowledge base of FAQs that customers can search before contacting support. Track customer satisfaction with post-resolution surveys. Identify trends in support requests to improve your product or documentation.', 
                icon: MessageSquare 
            }
        ]
    },
    {
        id: 'loyalty',
        title: 'Loyalty Stage',
        description: 'Retaining and delighting customers',
        icon: Trophy,
        color: 'from-red-500 to-red-600',
        instructions: 'Happy customers become repeat buyers and advocates. At this stage, you\'re deepening the relationship, encouraging renewals or additional purchases, and turning customers into raving fans who refer others. This is the most profitable stage. A loyal customer will spend 10x more over their lifetime than a one-time buyer. They\'ll refer friends, leave glowing reviews, and defend your brand online. Your goal is to make them feel appreciated, celebrated, and part of something bigger than a transaction.',
        streamlinesBusiness: 'The HQ\'s Review Management automates review requests at the perfect moment (after a win or milestone), making it easy for happy customers to leave testimonials on Google, Facebook, Yelp, and more. The Full Affiliate Program turns customers into commission-earning promoters - they get a unique link, access their affiliate dashboard via the Client Portal, and earn recurring commissions for every referral. Private/Public Social Community lets you build a branded community (like Facebook Groups, but fully owned by you) where customers connect, share wins, and support each other - creating a sense of belonging that keeps them engaged long-term.',
        realWorldExample: 'Example: After 3 months, the startup founder receives an automated review request via Review Management (triggered after they hit a milestone like "10 clients onboarded"). They happily leave a 5-star review because they\'re seeing real results. They join your Private Community (built with The HQ) where they network with other founders, share wins, and get advice. They sign up as an Affiliate, earning 20% recurring commissions, and refer 3 friends using their unique link (tracked via the Client Portal). They upgrade to a higher tier because they love the platform and want more features. This customer is now a brand advocate for life.',
        emotions: 'Satisfaction, Pride, Loyalty, Enthusiasm, Belonging, Empowerment',
        connectionTip: 'Celebrate their success and make them part of your story. Use language like "Look how far you\'ve come!" or "You\'re a rockstar!" Invite them to exclusive events (VIP webinars, early access to new features). Feature their testimonials and case studies (with permission). Give them opportunities to contribute and lead (affiliate program, community moderators, guest blog posts). Make them feel valued and special. The more you celebrate them, the more they\'ll celebrate you.',
        howStagesConnect: 'Loyalty completes the customer journey, but it also feeds back into Awareness. Loyal customers become your most effective marketing channel. Their reviews boost your credibility in the Awareness stage. Their referrals bring pre-sold prospects who trust you before they even meet you. Their testimonials remove objections in the Consideration and Decision stages. A strong Loyalty program turns customers into a self-sustaining growth engine.',
        hqFeatures: [
            { 
                name: 'Review Management', 
                description: 'Automate review requests at the perfect moment - after a customer achieves a win, completes a milestone, or expresses satisfaction. Send review requests via email or SMS with direct links to Google, Facebook, Yelp, Trustpilot, and more. Track review response rates and see which customers leave reviews. Respond to reviews (both positive and negative) directly from The HQ. Showcase top reviews on your website and marketing materials. Monitor your online reputation with review alerts.', 
                icon: Star 
            },
            { 
                name: 'Marketing Automation (Loyalty)', 
                description: 'Implement loyalty programs with automated reward emails ("You\'ve earned 500 points!"), milestone celebrations ("Happy 1-year anniversary!"), and re-engagement campaigns ("We miss you - here\'s 20% off to come back"). Send personalized upsell and cross-sell offers based on purchase history. Trigger win-back campaigns for churned customers. Create VIP tiers with exclusive perks and automated communications. Track customer lifetime value and engagement scores to identify your most valuable customers.', 
                icon: Zap 
            },
            { 
                name: 'Full Affiliate Program', 
                description: 'Launch a comprehensive affiliate program in minutes. Affiliates get unique tracking links, a dedicated dashboard (via the Client Portal), and real-time commission tracking. Set custom commission structures (flat fee, percentage, recurring, or tiered). Automate commission payouts monthly. Provide affiliates with pre-made marketing materials (email templates, social media graphics, ad copy). Track affiliate performance and identify top promoters. Affiliates can see their referrals, earnings, and payout history all within their Client Portal.', 
                icon: Users 
            },
            { 
                name: 'Private/Public Social Community', 
                description: 'Build a branded social community (like Facebook Groups, but fully owned by you) where customers can connect, share wins, ask questions, and support each other. Moderate content, pin important announcements, and create discussion topics. Gamify engagement with badges, leaderboards, and challenges. Host exclusive community-only events (live Q&As, workshops, masterminds). Communities create a sense of belonging that dramatically reduces churn. Members can network, collaborate, and refer each other - turning your customer base into a thriving ecosystem.', 
                icon: Users 
            },
            { 
                name: 'Surveys & Forms', 
                description: 'Gather continuous feedback with automated surveys sent at key touchpoints (after purchase, after support interaction, quarterly check-ins). Create custom forms for testimonial collection, feature requests, or satisfaction ratings. Analyze survey results with built-in reporting to identify trends and improvement areas. Trigger follow-up workflows based on survey responses (e.g., "If NPS score is low, alert support team"). Show customers you\'re listening by implementing their feedback and communicating changes.', 
                icon: MessageSquare 
            }
        ]
    }
];

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
            values: '',
            interests: '',
            lifestyle: '',
            personality: '',
            pain_points: '',
            goals: '',
            core_values: '',
            research_method: '',
            decision_speed: '',
            price_sensitivity: '',
            preferred_contact: ''
        },
        awareness: { discovery_channels: '', pain_points: '', messaging: '' },
        consideration: { evaluation_criteria: '', common_questions: '', information_needs: '' },
        decision: { purchase_factors: '', obstacles: '', preferred_methods: '' },
        service: { onboarding_process: '', support_needs: '', communication_preferences: '' },
        loyalty: { retention_strategies: '', advocacy_opportunities: '', feedback_mechanisms: '' }
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
                // Ensure all keys from formData are present in the loaded content,
                // filling with defaults if not to prevent uncontrolled component warnings.
                setFormData(prev => ({
                    ...prev,
                    ...journeyDocs[0].content,
                    persona: { ...prev.persona, ...journeyDocs[0].content.persona },
                    awareness: { ...prev.awareness, ...journeyDocs[0].content.awareness },
                    consideration: { ...prev.consideration, ...journeyDocs[0].content.consideration },
                    decision: { ...prev.decision, ...journeyDocs[0].content.decision },
                    service: { ...prev.service, ...journeyDocs[0].content.service },
                    loyalty: { ...prev.loyalty, ...journeyDocs[0].content.loyalty },
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
                        values: Array.isArray(idealClient.values) ? idealClient.values[0] || '' : idealClient.values || '',
                        interests: Array.isArray(idealClient.interests) ? idealClient.interests[0] || '' : idealClient.interests || '',
                        lifestyle: Array.isArray(idealClient.lifestyle) ? idealClient.lifestyle[0] || '' : idealClient.lifestyle || '',
                        personality: Array.isArray(idealClient.personality) ? idealClient.personality[0] || '' : idealClient.personality || '',
                        pain_points: Array.isArray(idealClient.pain_points) ? idealClient.pain_points[0] || '' : idealClient.pain_points || '',
                        goals: Array.isArray(idealClient.goals) ? idealClient.goals[0] || '' : idealClient.goals || '',
                        core_values: Array.isArray(idealClient.core_values) ? idealClient.core_values[0] || '' : idealClient.core_values || '',
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

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Determine if all stages are complete based on key fields in formData
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

            // Check if this completion qualifies for the HQ discount
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

        // General stage instructions
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

            notes.push({ content: "Psychographics:" });
            if (currentStageData.values) notes.push({ content: `- Values: ${currentStageData.values}` });
            if (currentStageData.interests) notes.push({ content: `- Interests: ${currentStageData.interests}` });
            if (currentStageData.lifestyle) notes.push({ content: `- Lifestyle: ${currentStageData.lifestyle}` });
            if (currentStageData.personality) notes.push({ content: `- Personality: ${currentStageData.personality}` });

            if (currentStageData.pain_points) notes.push({ content: `Primary Pain Point: ${currentStageData.pain_points}` });
            if (currentStageData.goals) notes.push({ content: `Primary Goal: ${currentStageData.goals}` });
            if (currentStageData.core_values) notes.push({ content: `Core Values: ${currentStageData.core_values}` });

            notes.push({ content: "Buying Behaviors:" });
            if (currentStageData.research_method) notes.push({ content: `- Research Method: ${currentStageData.research_method}` });
            if (currentStageData.decision_speed) notes.push({ content: `- Decision Speed: ${currentStageData.decision_speed}` });
            if (currentStageData.price_sensitivity) notes.push({ content: `- Price Sensitivity: ${currentStageData.price_sensitivity}` });
            if (currentStageData.preferred_contact) notes.push({ content: `- Preferred Contact: ${currentStageData.preferred_contact}` });

            // Add a prompt for Charlie
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

        } else if (stageId === 'service') { // Corresponds to outline's 'retention' in spirit of post-purchase
            if (currentStageData.onboarding_process) notes.push({ content: `Current onboarding process: ${currentStageData.onboarding_process}` });
            if (currentStageData.support_needs) notes.push({ content: `Known customer support needs: ${currentStageData.support_needs}` });
            if (currentStageData.communication_preferences) notes.push({ content: `Customer communication preferences: ${currentStageData.communication_preferences}` });
            notes.push({ content: "Charlie, provide ideas for an exceptional post-purchase experience and customer support strategy to ensure customer satisfaction and reduce churn." });

        } else if (stageId === 'loyalty') { // Corresponds to outline's 'advocacy'
            if (currentStageData.retention_strategies) notes.push({ content: `Existing retention strategies: ${currentStageData.retention_strategies}` });
            if (currentStageData.advocacy_opportunities) notes.push({ content: `Known advocacy opportunities: ${currentStageData.advocacy_opportunities}` });
            if (currentStageData.feedback_mechanisms) notes.push({ content: `Current feedback mechanisms: ${currentStageData.feedback_mechanisms}` });
            notes.push({ content: "Charlie, how can I foster customer loyalty and turn satisfied customers into enthusiastic advocates? Suggest strategies for referrals, testimonials, and community building." });
        }

        setAiContext({
            sectionTitle: sectionTitle,
            userNotes: notes.filter(note => note.content.trim() !== '') // Remove empty notes
        });
        setShowAIAssistant(true);
    }, [formData, STAGES]);

    const StageContent = ({ stage, openAIHelp }) => {
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

                        {/* Psychographics Section */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Psychographics</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Values</label>
                                    <select
                                        value={formData.persona.values || ''}
                                        onChange={(e) => handleSelectChange('values', e.target.value)}
                                        className="form-input"
                                    >
                                        <option value="">Select primary value</option>
                                        {PSYCHOGRAPHICS_OPTIONS.values.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Interests</label>
                                    <select
                                        value={formData.persona.interests || ''}
                                        onChange={(e) => handleSelectChange('interests', e.target.value)}
                                        className="form-input"
                                    >
                                        <option value="">Select primary interest</option>
                                        {PSYCHOGRAPHICS_OPTIONS.interests.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Lifestyle</label>
                                    <select
                                        value={formData.persona.lifestyle || ''}
                                        onChange={(e) => handleSelectChange('lifestyle', e.target.value)}
                                        className="form-input"
                                    >
                                        <option value="">Select lifestyle</option>
                                        {PSYCHOGRAPHICS_OPTIONS.lifestyle.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Personality</label>
                                    <select
                                        value={formData.persona.personality || ''}
                                        onChange={(e) => handleSelectChange('personality', e.target.value)}
                                        className="form-input"
                                    >
                                        <option value="">Select personality type</option>
                                        {PSYCHOGRAPHICS_OPTIONS.personality.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Pain Points */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Pain Points</h3>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Primary Pain Point</label>
                            <select
                                value={formData.persona.pain_points || ''}
                                onChange={(e) => handleSelectChange('pain_points', e.target.value)}
                                className="form-input"
                            >
                                <option value="">Select pain point</option>
                                {PAIN_POINTS_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Goals & Aspirations */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Goals & Aspirations</h3>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Primary Goal</label>
                            <select
                                value={formData.persona.goals || ''}
                                onChange={(e) => handleSelectChange('goals', e.target.value)}
                                className="form-input"
                            >
                                <option value="">Select goal</option>
                                {GOALS_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Core Values */}
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Core Values</h3>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Primary Value</label>
                            <select
                                value={formData.persona.core_values || ''}
                                onChange={(e) => handleSelectChange('core_values', e.target.value)}
                                className="form-input"
                            >
                                <option value="">Select core value</option>
                                {VALUES_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
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
    };

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
                        <StageContent stage={STAGES[currentStage]} openAIHelp={openAIHelp} />
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
