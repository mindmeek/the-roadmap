import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStrategyDoc } from '@/hooks/useStrategyDoc';
import { createPageUrl } from '@/utils';
import { Loader2, Save, ChevronRight, CheckCircle, UserCircle, Eye, Search, ShoppingCart, HeartHandshake, Trophy, Share2, MessageSquare, Palette, Globe, DollarSign, Smartphone, FolderKanban, Star, Users, Zap, Lightbulb, Sparkles, Plus, X, Wrench, Rocket, Wand2, Map } from 'lucide-react';
import SubscriptionGate from '../components/subscription/SubscriptionGate';
import AITeamModal from '@/components/ai/AITeamModal';
import { base44 } from '@/api/base44Client';
import CustomerJourneyMap from '@/components/strategy/CustomerJourneyMap';

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
        id: 'ideal_client',
        title: 'Ideal Client Profile',
        description: 'Define and name your ideal client',
        icon: UserCircle,
        color: 'from-blue-500 to-blue-600',
        instructions: 'Give your ideal client a name and bring their profile to life. This is the foundation of your entire customer journey. By deeply understanding WHO your ideal client is, you can tailor every subsequent stage to speak directly to them. This profile will guide your messaging, channel selection, content creation, and service delivery throughout the entire journey.',
        emotions: 'Understanding, Empathy, Connection',
        connectionTip: 'By naming your ideal client and deeply understanding them, you create authentic connections that resonate throughout your entire business strategy. This isn\'t just data - this is a real person with real dreams, fears, and needs. Every marketing message, every product feature, and every customer interaction should be designed with this specific person in mind.',
        howStagesConnect: 'Your ideal client profile is the north star for all 5 stages. Once you know WHO they are, you can determine WHERE to find them (Awareness), HOW to educate them (Consideration), WHAT will convince them to buy (Decision), HOW to serve them best (Service), and WHAT will make them loyal advocates (Loyalty).'
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
                description: 'Attract customers by solving their problems with valuable content. This long-term strategy builds authority and organic traffic.',
                example: 'A fitness coach writing blog posts about "How to lose weight after 40" that rank on Google.',
                realWorldExample: 'A specialized law firm writes detailed guides on "Startup IP Protection" that rank #1 on Google. Founders searching for answers find the guide, trust the firm\'s expertise, and eventually book a consultation.',
                pros: ['Sustainable long-term traffic (asset building)', 'Builds deep trust and authority', 'Lower cost per lead over time'],
                cons: ['Slow results (6-12 months)', 'Requires consistent, high-quality writing', 'High competition for popular keywords'],
                steps: [
                    'Research keywords your ideal client is actually searching for (not just what you want to teach).',
                    'Create a content calendar to ensure consistency (e.g., 1 high-quality post per week).',
                    'Write comprehensive, helpful content that answers their specific questions better than competitors.',
                    'Optimize content for on-page SEO (titles, headings, meta descriptions).',
                    'Repurpose content into micro-content for social media to drive initial traffic.'
                ],
                formFields: [
                    { id: 'content_pillars', label: 'What are your 3-5 main content topics?', placeholder: 'e.g., Nutrition, Workouts, Mindset' },
                    { id: 'keyword_strategy', label: 'What keywords are your customers searching for?', placeholder: 'e.g., "best home workout equipment"' }
                ]
            },
            {
                id: 'social_media',
                title: 'Social Media Growth',
                description: 'Build an audience by engaging on platforms where your customers hang out. Great for brand personality and community.',
                example: 'A fashion brand posting daily outfits on Instagram and using TikTok trends.',
                realWorldExample: 'A real estate agent uses Instagram Reels to show "Day in the Life" and home tour videos. Local buyers feel like they know her personality before they even reach out, creating a warm lead pipeline.',
                pros: ['Fast feedback loop from audience', 'Builds community and brand loyalty', 'Visual and personality-driven'],
                cons: ['Algorithm changes can hurt reach', 'Requires daily/consistent engagement', 'Hard to measure ROI initially'],
                steps: [
                    'Choose 1-2 primary platforms where your audience is most active (don\'t try to be everywhere).',
                    'Define your "Content Pillars" (3-5 topics you stick to).',
                    'Batch create content once a week to avoid burnout.',
                    'Engage daily for 15 minutes (comment on potential customers\' posts).',
                    'Use Stories/Stories to show behind-the-scenes and build connection.'
                ],
                formFields: [
                    { id: 'primary_platforms', label: 'Which platforms will you focus on?', placeholder: 'e.g., Instagram, LinkedIn' },
                    { id: 'content_mix', label: 'What type of content will you post?', placeholder: 'e.g., Educational reels, Behind the scenes, User content' }
                ]
            },
            {
                id: 'paid_ads',
                title: 'Paid Advertising',
                description: 'Pay to put your message directly in front of your ideal customer. The fastest way to get data and traffic.',
                example: 'A SaaS company running LinkedIn ads targeting CTOs of mid-sized companies.',
                realWorldExample: 'An e-commerce brand launches Facebook Ads targeting "Dog Owners" with a video showing their indestructible toy. They spend $500 to test, find a winning ad, and scale to $10k/month in profitable spend.',
                pros: ['Immediate traffic and results', 'Precise targeting of ideal demographics', 'Easily scalable once working'],
                cons: ['Direct cost (pay to play)', 'Ad fatigue requires constant creative updates', 'Learning curve (easy to lose money if unskilled)'],
                steps: [
                    'Define a clear, irresistible offer (lead magnet or low-ticket product).',
                    'Create 3-5 variations of ad creative (images/videos) and copy.',
                    'Set up tracking pixels (Meta Pixel, Google Tag) on your website.',
                    'Launch campaign with a testing budget (e.g., $20/day).',
                    'Analyze data after 3-7 days, kill losing ads, and scale winners.'
                ],
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
                description: 'A single page focused on one specific offer with one clear call to action. Ideal for ads or specific campaigns.',
                example: 'A webinar registration page with no navigation menu, just a signup form.',
                realWorldExample: 'A business coach runs ads to a "Free Productivity Guide" landing page. The page has a catchy headline, 3 bullet points of benefits, and a form. It converts at 40% because there are no other distractions.',
                pros: ['Higher conversion rates for specific offers', 'No distractions/leaks', 'Easier to A/B test'],
                cons: ['Doesn\'t tell the "full story" of the brand', 'Not good for general organic traffic', 'Can feel transactional'],
                steps: [
                    'Define the ONE goal of the page (e.g., get email address).',
                    'Write a headline that promises a specific result/benefit.',
                    'Create a lead magnet (free value) to exchange for contact info.',
                    'Remove all navigation menus to keep focus on the form.',
                    'Connect form to your email marketing tool for auto-delivery.'
                ],
                formFields: [
                    { id: 'headline', label: 'What is your main headline?', placeholder: 'The promise of your offer' },
                    { id: 'lead_magnet', label: 'What free value are you offering?', placeholder: 'e.g., Free Checklist, Video Training' }
                ]
            },
            {
                id: 'full_website',
                title: 'Full Brand Website',
                description: 'A multi-page site that builds credibility, tells your full story, and serves as a central hub.',
                example: 'A consulting firm website with About, Services, Case Studies, and Blog pages.',
                realWorldExample: 'A boutique design agency has a beautiful 5-page site. Clients visit, read the "About Us" story, browse the "Portfolio," and feel confident that this is a legitimate, premium business before inquiring.',
                pros: ['Builds long-term brand equity and SEO', 'Serves multiple audiences/goals', 'Central hub for all marketing'],
                cons: ['Time-consuming to build and maintain', 'Lower direct conversion rate than funnels', 'Can be overwhelming to visitors'],
                steps: [
                    'Map out your site structure (Home, About, Services, Contact, Blog).',
                    'Write copy for each page focusing on the customer ("You") not just the business ("We").',
                    'Gather high-quality visuals (photos, branding).',
                    'Build using a template or drag-and-drop builder.',
                    'Ensure all forms/links work and mobile view is perfect.'
                ],
                formFields: [
                    { id: 'sitemap', label: 'What main pages will you include?', placeholder: 'Home, About, Services, Contact' },
                    { id: 'brand_story', label: 'What is the core story on your About page?', placeholder: 'Why you started this business' }
                ]
            },
            {
                id: 'webinar_funnel',
                title: 'Webinar/Masterclass Funnel',
                description: 'Educate prospects via video (live or recorded) before making an offer. Best for high-ticket or complex products.',
                example: 'A 45-minute masterclass on "How to Scale Your Business" ending with a pitch.',
                realWorldExample: 'A software company hosts a weekly "Demo & Strategy" webinar. Prospects register, learn about the methodology for 30 mins, see the tool in action for 15 mins, and are offered a special deal to sign up live.',
                pros: ['Builds massive trust and authority quickly', 'Qualifies leads (time investment)', 'High conversion for high-ticket'],
                cons: ['Low attendance rates (need reminders)', 'Tech complexity', 'Requires presentation skills'],
                steps: [
                    'Choose a topic that solves a specific, burning problem.',
                    'Create a registration page and "Thank You" page.',
                    'Design a slide deck that teaches value before pitching.',
                    'Set up automated email reminders (24h, 1h, 15m before).',
                    'Host live to perfect the pitch, then automate the recording.'
                ],
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
                description: 'Direct purchase via a shopping cart or checkout page. Best for lower-ticket (<$500) or simple products.',
                example: 'A customer adds a $49 course to cart and pays instantly via Stripe.',
                realWorldExample: 'A supplement brand allows customers to select their bottle size, subscribe for a discount, and checkout in 2 minutes. The process is frictionless, requiring no human interaction.',
                pros: ['Scalable (sales happen while you sleep)', 'Low overhead cost', 'Convenient for the customer'],
                cons: ['Lower price ceiling', 'Cart abandonment is common', 'Less chance to build personal relationship'],
                steps: [
                    'Select a payment processor (Stripe/PayPal) and checkout tool.',
                    'Create a checkout page with "Trust Badges" (secure, money-back guarantee).',
                    'Simplify the form (ask only for essential info).',
                    'Set up an "Abandoned Cart" email sequence to recover lost sales.',
                    'Test the flow on mobile to ensure it\'s seamless.'
                ],
                formFields: [
                    { id: 'checkout_flow', label: 'Describe the checkout steps:', placeholder: 'e.g., Cart -> Account Creation -> Payment' },
                    { id: 'guarantee', label: 'What is your guarantee?', placeholder: 'e.g., 30-Day Money Back' }
                ]
            },
            {
                id: 'consultative_sales',
                title: 'Consultative Sales (Calls)',
                description: 'High-touch sales process involving a discovery call or demo. Essential for high-ticket services ($2k+).',
                example: 'A prospect books a 30-min strategy session to discuss a $5k consulting package.',
                realWorldExample: 'A marketing agency drives leads to a "Free Strategy Call." On the call, they diagnose the client\'s issues and pitch a custom $3,000/month retainer. The personal connection closes the deal.',
                pros: ['High conversion rate (20-50%)', 'Supports premium pricing', 'Builds deep relationship'],
                cons: ['Time-intensive (unscalable without hiring)', 'Requires sales skills', 'Calendar management'],
                steps: [
                    'Set up a booking calendar (e.g., Calendly) synced to your schedule.',
                    'Create a pre-call questionnaire to qualify leads (budget, timeline).',
                    'Prepare a sales script: Diagnose -> Agitate -> Prescribe.',
                    'Host the call on Zoom/video for better connection.',
                    'Follow up immediately with a payment link or agreement.'
                ],
                formFields: [
                    { id: 'booking_process', label: 'How do they book a call?', placeholder: 'e.g., Calendly link on website' },
                    { id: 'sales_script', label: 'Key points for your sales script:', placeholder: 'e.g., Diagnose problem, Prescribe solution' }
                ]
            },
            {
                id: 'proposal_contract',
                title: 'Proposal & Contract',
                description: 'Custom solutions requiring a formal proposal and signed agreement. Standard for B2B and custom projects.',
                example: 'Sending a detailed PDF proposal for a custom website design project.',
                realWorldExample: 'An architect meets a client, discusses the vision, then sends a 10-page proposal outlining scope, phases, and fees. The client digitally signs and pays a deposit to start.',
                pros: ['Clarity on custom scope', 'Legal protection for both parties', 'Professional perception'],
                cons: ['Slower sales cycle', 'Administrative work to create proposals', 'Risk of "scope creep" if not defined'],
                steps: [
                    'Host a discovery meeting to gather all requirements.',
                    'Draft a Scope of Work (SOW) detailing exactly what is/isn\'t included.',
                    'Calculate pricing based on value or estimated hours.',
                    'Use proposal software to send for digital signature.',
                    'Require a deposit (e.g., 50%) upon signing to commit.'
                ],
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
                description: 'Digital delivery of product/service with automated guidance. Perfect for courses, software, or digital downloads.',
                example: 'A welcome email series delivering login details and a "Getting Started" video course.',
                realWorldExample: 'A user buys a photo editing preset pack. They instantly get an email with the download link and a 2-minute video tutorial on how to install it. They achieve their "first win" (a better photo) within 10 minutes of buying.',
                pros: ['Zero time cost per new customer', 'Consistent experience for everyone', 'Instant gratification'],
                cons: ['Less personal connection', 'Tech errors can block access', 'Generic (one size fits all)'],
                steps: [
                    'Map out the ideal "first hour" experience for a new user.',
                    'Record a short, friendly "Start Here" video.',
                    'Set up an automated email that triggers immediately upon purchase.',
                    'Create a simple PDF or web page with setup instructions.',
                    'Test the flow yourself to ensure links work.'
                ],
                formFields: [
                    { id: 'welcome_email', label: 'What does the first email say?', placeholder: 'Welcome + Login Info' },
                    { id: 'first_win', label: 'How do they get a "quick win" in the first 24h?', placeholder: 'e.g., Complete profile setup' }
                ]
            },
            {
                id: 'high_touch_service',
                title: 'White-Glove Service',
                description: 'Personalized, 1-on-1 onboarding and service delivery. Expected for expensive retainers or consulting.',
                example: 'A kick-off call with an account manager to set up the client\'s software manually.',
                realWorldExample: 'A new wealth management client receives a welcome gift box. They have a 90-minute "Vision Call" with their advisor to set goals. The advisor handles all the paperwork transfer manually. The client feels taken care of.',
                pros: ['Premium experience justifies high fees', 'High retention rates', 'Deep client relationship'],
                cons: ['Expensive to deliver', 'Hard to scale (people dependent)', 'Relies on staff quality'],
                steps: [
                    'Send a personalized welcome email/video from the founder.',
                    'Schedule a "Kick-Off Call" to align on goals and timelines.',
                    'Assign a dedicated Account Manager.',
                    'Create a shared project folder or Client Portal.',
                    'Schedule recurring manual check-ins (e.g., monthly reviews).'
                ],
                formFields: [
                    { id: 'kickoff_agenda', label: 'Agenda for the kick-off call:', placeholder: 'e.g., Introductions, Goal Setting, Timeline' },
                    { id: 'checkin_schedule', label: 'When are your milestone check-ins?', placeholder: 'e.g., Weekly on Fridays' }
                ]
            },
            {
                id: 'hybrid_model',
                title: 'Hybrid / Group Program',
                description: 'A mix of self-paced content and group support calls. Scales better than 1-on-1 but keeps personal touch.',
                example: 'Access to a video library plus weekly group Q&A calls on Zoom.',
                realWorldExample: 'A business accelerator offers a 12-week online course. Members watch videos on their own but join a Slack community and a weekly "Hot Seat" call with the mentor to get specific feedback.',
                pros: ['Scalable but still personal', 'Community support adds value', 'Efficient use of expert time'],
                cons: ['Balancing act (too much/little support)', 'Group dynamics management', 'Moderate tech needs'],
                steps: [
                    'Build a content portal for the "static" knowledge.',
                    'Establish a community channel (Slack/Circle/FB Group).',
                    'Schedule recurring "Office Hours" or Q&A calls.',
                    'Hire a community manager or moderator as you grow.',
                    'Create "paths" for members to help each other.'
                ],
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
        instructions: 'Happy customers become repeat buyers and advocates. Deepen the relationship and encourage referrals. This is where profit margins maximize.',
        recommendedTools: ['Review Management', 'Affiliate Software', 'Community Platform', 'Loyalty Program'],
        pathways: [
            {
                id: 'referral_program',
                title: 'Referral / Affiliate Program',
                description: 'Incentivize customers to refer friends in exchange for rewards or cash. Turns customers into a sales force.',
                example: 'Giving customers a unique link that earns them 20% commission on referrals.',
                realWorldExample: 'Dropbox gave extra free storage space to both the referrer and the invited friend. This "double-sided reward" fueled their massive viral growth with almost zero ad spend.',
                pros: ['Low CAC (Cost Acquisition Cost)', 'High trust leads (warm intros)', 'Rewards loyal behavior'],
                cons: ['Tracking complexity (needs software)', 'Margin reduction (payouts)', 'Needs promotion to work'],
                steps: [
                    'Decide on an incentive (Cash? Credit? Free product?).',
                    'Choose a "double-sided" reward if possible (reward both parties).',
                    'Set up tracking software to generate unique links.',
                    'Promote the program in your footer, receipts, and user dashboard.',
                    'Pay out rewards promptly to build trust.'
                ],
                formFields: [
                    { id: 'incentive', label: 'What is the reward?', placeholder: 'e.g., $50 credit or 10% cash' },
                    { id: 'promotion_plan', label: 'How will you promote this program?', placeholder: 'e.g., Email after positive feedback' }
                ]
            },
            {
                id: 'vip_community',
                title: 'VIP Community',
                description: 'Create an exclusive space for customers to connect, network, and get extra value.',
                example: 'A private Facebook group or Circle community for customers only.',
                realWorldExample: 'A software company creates a "Power Users" Slack channel. Members help each other solve problems, reducing support tickets for the company while building deep loyalty among users who feel like insiders.',
                pros: ['Increases LTV (Lifetime Value)', 'Reduces churn (sticky)', 'User-generated content/support'],
                cons: ['High moderation effort', 'Risk of "ghost town" if inactive', 'Platform fatigue'],
                steps: [
                    'Choose a platform your users already use (e.g., Facebook, Slack).',
                    'Define the community purpose (Support? Networking? Exclusive news?).',
                    'Seed initial content and discussions.',
                    'Invite your top 10% customers first to set the tone.',
                    'Schedule regular engagement events (AMAs, challenges).'
                ],
                formFields: [
                    { id: 'community_purpose', label: 'What is the main value of the community?', placeholder: 'e.g., Networking, Exclusive Content' },
                    { id: 'engagement_plan', label: 'How will you keep it active?', placeholder: 'e.g., Weekly challenges, Expert AMAs' }
                ]
            },
            {
                id: 'recurring_revenue',
                title: 'Recurring / Subscription',
                description: 'Offer ongoing value to turn one-time buyers into subscribers. The holy grail of business models.',
                example: 'Offering a monthly maintenance package after building a website.',
                realWorldExample: 'A coffee roaster sells bags of beans but pushes a "Coffee Club" subscription. Subscribers save 10% and never run out. The roaster gets predictable monthly revenue instead of sporadic sales.',
                pros: ['Predictable income', 'Increases business valuation', 'Habit-forming product usage'],
                cons: ['Churn management becomes critical', 'Constant value delivery needed', 'Subscription fatigue'],
                steps: [
                    'Identify a recurring need your customer has (maintenance, refills, access).',
                    'Create a subscription offer with a clear incentive (discount, exclusive access).',
                    'Set up recurring billing in your payment processor.',
                    'Create an onboarding flow for subscribers.',
                    'Plan retention content to remind them of the value monthly.'
                ],
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

const DEFAULT_JOURNEY = {
    ideal_client: { name: '', age_range: '', gender: '', location: '', income_level: '', education: '', occupation: '', psychographics: [], pain_points: [], goals: [], core_values: [], research_method: '', decision_speed: '', price_sensitivity: '', preferred_contact: '' },
    awareness: { discovery_channels: '', pain_points: '', messaging: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
    consideration: { evaluation_criteria: '', common_questions: '', information_needs: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
    decision: { purchase_factors: '', obstacles: '', preferred_methods: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
    service: { onboarding_process: '', support_needs: '', communication_preferences: '', tools_checklist: [], selected_pathway: '', pathway_data: {} },
    loyalty: { retention_strategies: '', advocacy_opportunities: '', feedback_mechanisms: '', tools_checklist: [], selected_pathway: '', pathway_data: {} }
};

export default function StrategyFormCustomerJourneyPage() {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [isImporting, setIsImporting] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [aiContext, setAiContext] = useState({});
    const [viewMode, setViewMode] = useState('input');

    const { loading, formData, setFormData, saveDoc, user } = useStrategyDoc('customer_journey', DEFAULT_JOURNEY);

    const handleImportFromIdealClient = async () => {
        setIsImporting(true);
        try {
            const idealClientDocs = await base44.entities.StrategyDocument.filter({
                created_by: user.email,
                document_type: 'ideal_client'
            });

            if (idealClientDocs.length > 0) {
                const idealClient = idealClientDocs[0].content;

                const getArrayValue = (field) => {
                    const value = Array.isArray(idealClient[field]) ? idealClient[field][0] : idealClient[field];
                    return value ? [value] : [];
                };

                const getMultiArrayValue = (...fields) => {
                    const values = fields.flatMap(field => {
                        const val = Array.isArray(idealClient[field]) ? idealClient[field] : (idealClient[field] ? [idealClient[field]] : []);
                        return val.filter(v => v);
                    });
                    return [...new Set(values)];
                };

                setFormData(prev => ({
                    ...prev,
                    ideal_client: {
                        ...prev.ideal_client,
                        name: prev.ideal_client.name || idealClient.client_avatar_name || idealClient.name || '',
                        age_range: Array.isArray(idealClient.age_range) ? idealClient.age_range[0] || '' : idealClient.age_range || '',
                        gender: Array.isArray(idealClient.gender) ? idealClient.gender[0] || '' : idealClient.gender || '',
                        location: Array.isArray(idealClient.location) ? idealClient.location[0] || '' : idealClient.location || '',
                        income_level: Array.isArray(idealClient.income_level) ? idealClient.income_level[0] || '' : idealClient.income_level || '',
                        education: Array.isArray(idealClient.education) ? idealClient.education[0] || '' : idealClient.education || '',
                        occupation: Array.isArray(idealClient.occupation) ? idealClient.occupation[0] || '' : idealClient.occupation || '',
                        psychographics: getMultiArrayValue('values', 'interests', 'lifestyle', 'personality_traits'),
                        pain_points: Array.isArray(idealClient.pain_points) ? idealClient.pain_points : (idealClient.pain_points ? [idealClient.pain_points] : []),
                        goals: Array.isArray(idealClient.goals) ? idealClient.goals : (idealClient.goals ? [idealClient.goals] : []),
                        core_values: Array.isArray(idealClient.core_values) ? idealClient.core_values : (idealClient.core_values ? [idealClient.core_values] : []),
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
            ideal_client: {
                ...prev.ideal_client,
                [field]: value
            }
        }));
    };

    const handleArrayChange = (field, values) => {
        setFormData(prev => ({
            ...prev,
            ideal_client: {
                ...prev.ideal_client,
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

    const handlePathwaySelect = (stage, pathwayId) => {
        setFormData(prev => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                selected_pathway: pathwayId
            }
        }));
    };

    const handlePathwayInputChange = (stage, fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            [stage]: {
                ...prev[stage],
                pathway_data: {
                    ...prev[stage].pathway_data,
                    [fieldId]: value
                }
            }
        }));
    };

    const handleGenerateStrategy = async (stageId, pathwayId, userContext) => {
        const stage = STAGES.find(s => s.id === stageId);
        const pathway = stage.pathways.find(p => p.id === pathwayId);
        
        if (!userContext) {
            alert("Please describe your business context first.");
            return;
        }

        setIsSaving(true); // Reusing saving state for loading indicator
        try {
            const response = await base44.functions.invoke('generateStageStrategy', {
                stage,
                pathway,
                userContext,
                ideal_client: formData.ideal_client
            });

            if (response.data) {
                // Merge generated data into pathway_data
                setFormData(prev => ({
                    ...prev,
                    [stageId]: {
                        ...prev[stageId],
                        pathway_data: {
                            ...prev[stageId].pathway_data,
                            ...response.data
                        }
                    }
                }));
                alert('Strategy generated successfully! Review the details below.');
            }
        } catch (error) {
            console.error("Error generating strategy:", error);
            alert("Failed to generate strategy. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveDoc();
            alert('Customer Journey Map saved successfully!');
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

        if (stageId === 'ideal_client') {
            notes.push({ content: `Current Ideal Client Name: ${currentStageData.name || 'Not yet defined'}` });
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

            notes.push({ content: "Charlie, help me refine this ideal client profile. What additional details or insights could make this profile more vivid and actionable for marketing purposes?" });

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
    }, [formData]);

// Memoized Stage Content to prevent re-renders and focus loss
const StageContent = React.memo(({ stage, openAIHelp, formData, handleInputChange, handleSelectChange, handleArrayChange, handleImportFromIdealClient, isImporting, handleToolsChecklistChange, handlePathwaySelect, handlePathwayInputChange, handleGenerateStrategy, isGenerating }) => {
    const Icon = stage.icon;
    const isIdealClient = stage.id === 'ideal_client';
    const [generationContext, setGenerationContext] = useState('');

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

                {!isIdealClient && (
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

                {isIdealClient && stage.connectionTip && (
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

            {isIdealClient ? (
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

                    {/* Client Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Give Your Ideal Client a Name *
                        </label>
                        <input
                            type="text"
                            value={formData.ideal_client.name}
                            onChange={(e) => handleInputChange('ideal_client', 'name', e.target.value)}
                            placeholder="e.g., 'Startup Sarah' or 'Corporate Chris'"
                            className="form-input"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-1">Naming your ideal client makes them real and helps you connect emotionally.</p>
                    </div>

                    {/* Demographics Section */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Demographics</h3>
                        
                        <div className="mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 text-sm">
                            <p className="mb-2"><strong className="text-blue-700 dark:text-blue-400">Why it matters:</strong> Demographics define the "skeleton" of your customer—who they are on paper. This is essential for targeting ads (e.g., Facebook audiences) and pricing correctly.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A luxury watch brand targets "Men, 40-60, Income $150k+" because they have the buying power. Targeting "Teenagers" would waste ad budget.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Age Range</label>
                                <select
                                    value={formData.ideal_client.age_range || ''}
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
                                    value={formData.ideal_client.gender || ''}
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
                                    value={formData.ideal_client.location || ''}
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
                                    value={formData.ideal_client.income_level || ''}
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
                                    value={formData.ideal_client.education || ''}
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
                                    value={formData.ideal_client.occupation || ''}
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
                        
                        <div className="mb-6 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30 text-sm">
                            <p className="mb-2"><strong className="text-purple-700 dark:text-purple-400">Why it matters:</strong> Psychographics are the "soul" of your customer. They explain <em>why</em> they buy. Two people with the same demographics can make totally different choices based on their values.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> Two moms, both 35 in NY. One values "Sustainability" and buys organic cotton (Brand A). The other values "Status" and buys designer labels (Brand B).</p>
                        </div>

                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Values, Interests, Lifestyle & Personality Traits
                        </label>
                        <MultiValueInput
                            values={formData.ideal_client.psychographics}
                            onChange={(values) => handleArrayChange('psychographics', values)}
                            suggestions={PSYCHOGRAPHICS_SUGGESTIONS}
                            placeholder="Add psychographic traits (e.g., Innovation, Creative, Fast-paced)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Add as many as apply. These help you understand their mindset and lifestyle.</p>
                    </div>

                    {/* Pain Points - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Pain Points</h3>
                        
                        <div className="mb-6 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-800/30 text-sm">
                            <p className="mb-2"><strong className="text-red-700 dark:text-red-400">Why it matters:</strong> People don't buy products; they buy solutions to problems. Identifying deep pain points allows you to position your offer as the cure.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A busy mom doesn't just want a "meal kit." Her pain point is "guilt over feeding her kids fast food." The solution is "peace of mind."</p>
                        </div>

                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What problems or frustrations do they face?
                        </label>
                        <MultiValueInput
                            values={formData.ideal_client.pain_points}
                            onChange={(values) => handleArrayChange('pain_points', values)}
                            suggestions={PAIN_POINTS_SUGGESTIONS}
                            placeholder="Add pain points (e.g., Lack of time, Limited budget)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Understanding their pain points helps you create targeted solutions.</p>
                    </div>

                    {/* Goals & Aspirations - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Goals & Aspirations</h3>
                        
                        <div className="mb-6 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/30 text-sm">
                            <p className="mb-2"><strong className="text-green-700 dark:text-green-400">Why it matters:</strong> This is where your customer <em>wants</em> to be. Your product is the bridge between their current pain and their future goal.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A freelance writer buys a course not just to "learn SEO," but to achieve the goal of "Working from Bali." Sell the destination.</p>
                        </div>

                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What are they trying to achieve?
                        </label>
                        <MultiValueInput
                            values={formData.ideal_client.goals}
                            onChange={(values) => handleArrayChange('goals', values)}
                            suggestions={GOALS_SUGGESTIONS}
                            placeholder="Add goals (e.g., Start a business, Achieve financial freedom)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Their goals drive their decisions and actions.</p>
                    </div>

                    {/* Core Values - INTERACTIVE */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Core Values</h3>
                        
                        <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-sm">
                            <p className="mb-2"><strong className="text-indigo-700 dark:text-indigo-400">Why it matters:</strong> Shared values build trust and long-term loyalty. Customers buy from brands that believe what they believe.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> Patagonia customers pay 2x more for a jacket because they share the value of "Environmental Protection." They are buying identity.</p>
                        </div>

                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What principles guide their decisions?
                        </label>
                        <MultiValueInput
                            values={formData.ideal_client.core_values}
                            onChange={(values) => handleArrayChange('core_values', values)}
                            suggestions={VALUES_SUGGESTIONS}
                            placeholder="Add core values (e.g., Integrity, Innovation, Family)"
                        />
                        <p className="text-xs text-[var(--text-soft)] mt-2">Core values help you align your messaging with what matters most to them.</p>
                    </div>

                    {/* Buying Behaviors */}
                    <div className="card p-6">
                        <h3 className="font-bold text-lg mb-4 text-[var(--text-main)]">Buying Behaviors</h3>
                        
                        <div className="mb-6 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-800/30 text-sm">
                            <p className="mb-2"><strong className="text-orange-700 dark:text-orange-400">Why it matters:</strong> Knowing <em>how</em> they buy removes friction. Mismatching your sales process with their buying style kills sales.</p>
                            <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> An impulse buyer (fashion) needs a "1-Click Checkout." A careful buyer (software) needs a "Free Trial" and case studies.</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Research Method</label>
                                <select
                                    value={formData.ideal_client.research_method || ''}
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
                                    value={formData.ideal_client.decision_speed || ''}
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
                                    value={formData.ideal_client.price_sensitivity || ''}
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
                                    value={formData.ideal_client.preferred_contact || ''}
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
                    {/* Pathway Selection - NEW */}
                    {stage.pathways && (
                        <div className="mb-8">
                            {!formData[stage.id]?.selected_pathway ? (
                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-[var(--text-main)] flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                                        Choose Your Strategy
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {stage.pathways.map(pathway => (
                                            <div 
                                                key={pathway.id}
                                                onClick={() => handlePathwaySelect(stage.id, pathway.id)}
                                                className="cursor-pointer border-2 border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)] rounded-lg p-4 transition-all hover:shadow-lg bg-white dark:bg-gray-800"
                                            >
                                                <h4 className="font-bold text-[var(--text-main)] mb-2">{pathway.title}</h4>
                                                <p className="text-sm text-[var(--text-soft)] mb-3 min-h-[40px]">{pathway.description}</p>
                                                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs text-[var(--text-soft)] italic">
                                                    Example: {pathway.example}
                                                </div>
                                                <button className="mt-4 w-full btn btn-secondary text-xs">
                                                    Select Strategy
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 border-2 border-[var(--primary-gold)]/30 rounded-lg p-6 mb-6">
                                    <div className="flex justify-between items-start mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                        <div>
                                            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--primary-gold)]">Selected Strategy</span>
                                            <h3 className="text-xl font-bold text-[var(--text-main)] mt-1">
                                                {stage.pathways.find(p => p.id === formData[stage.id].selected_pathway)?.title}
                                            </h3>
                                            <p className="text-sm text-[var(--text-soft)] mt-1">
                                                {stage.pathways.find(p => p.id === formData[stage.id].selected_pathway)?.description}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => handlePathwaySelect(stage.id, '')}
                                            className="text-sm text-[var(--text-soft)] hover:text-red-500 underline"
                                        >
                                            Change Strategy
                                        </button>
                                    </div>

                                    {/* Detailed Strategy Info */}
                                    {(() => {
                                        const pathway = stage.pathways.find(p => p.id === formData[stage.id].selected_pathway);
                                        if (!pathway) return null;
                                        return (
                                            <div className="mb-8 space-y-5">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                                                        <h5 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center text-sm uppercase tracking-wide">
                                                            <CheckCircle className="w-4 h-4 mr-2"/> Pros
                                                        </h5>
                                                        <ul className="space-y-1">
                                                            {pathway.pros?.map((pro, i) => (
                                                                <li key={i} className="text-sm text-[var(--text-soft)] flex items-start">
                                                                    <span className="mr-2 text-green-500">•</span>
                                                                    {pro}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800/30">
                                                        <h5 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center text-sm uppercase tracking-wide">
                                                            <X className="w-4 h-4 mr-2"/> Cons
                                                        </h5>
                                                        <ul className="space-y-1">
                                                            {pathway.cons?.map((con, i) => (
                                                                <li key={i} className="text-sm text-[var(--text-soft)] flex items-start">
                                                                    <span className="mr-2 text-red-500">•</span>
                                                                    {con}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                                    <h5 className="font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center">
                                                        <Rocket className="w-4 h-4 mr-2"/> Implementation Steps
                                                    </h5>
                                                    <ol className="space-y-2">
                                                        {pathway.steps?.map((step, i) => (
                                                            <li key={i} className="text-sm text-[var(--text-main)] flex items-start">
                                                                <span className="font-bold text-blue-500 mr-2 min-w-[1.25rem]">{i + 1}.</span>
                                                                <span>{step}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                                                    <h5 className="font-semibold text-purple-800 dark:text-purple-400 mb-1 flex items-center text-sm">
                                                        <Lightbulb className="w-4 h-4 mr-2"/> Real-World Example
                                                    </h5>
                                                    <p className="text-sm text-[var(--text-main)] italic leading-relaxed">
                                                        "{pathway.realWorldExample || pathway.example}"
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* AI Generation Section */}
                                    <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg shadow-sm">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                                                <Wand2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <h4 className="font-bold text-[var(--text-main)]">
                                                Fast-Track with Charlie AI
                                            </h4>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                                    What is your offer and who is it for?
                                                </label>
                                                <textarea 
                                                    value={generationContext}
                                                    onChange={(e) => setGenerationContext(e.target.value)}
                                                    placeholder="e.g., I'm selling a 12-week yoga course for stressed corporate executives."
                                                    className="w-full p-3 rounded border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 text-sm bg-white dark:bg-gray-800 resize-none"
                                                    rows="2"
                                                />
                                            </div>
                                            
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleGenerateStrategy(stage.id, formData[stage.id].selected_pathway, generationContext)}
                                                    disabled={isGenerating || !generationContext.trim()}
                                                    className="btn btn-primary bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2 px-4"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Drafting Strategy...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Sparkles className="w-4 h-4 mr-2" />
                                                            Generate Draft
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Generated Implementation Plan */}
                                    {formData[stage.id]?.pathway_data?.implementation_plan && (
                                        <div className="mb-6 bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-purple-100 dark:border-purple-900/30 shadow-sm">
                                            <h5 className="font-bold text-purple-800 dark:text-purple-400 mb-3 flex items-center">
                                                <Rocket className="w-4 h-4 mr-2"/> Customized Action Plan
                                            </h5>
                                            <ul className="space-y-2">
                                                {formData[stage.id].pathway_data.implementation_plan.map((step, i) => (
                                                    <li key={i} className="text-sm text-[var(--text-main)] flex items-start">
                                                        <span className="mr-2 text-purple-500 mt-1">•</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Pathway Specific Form */}
                                    <div className="space-y-4">
                                        {stage.pathways.find(p => p.id === formData[stage.id].selected_pathway)?.formFields.map(field => (
                                            <div key={field.id}>
                                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                                    {field.label}
                                                </label>
                                                <textarea
                                                    value={formData[stage.id]?.pathway_data?.[field.id] || ''}
                                                    onChange={(e) => handlePathwayInputChange(stage.id, field.id, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    className="form-input h-24"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tools Checklist Section */}
                    {stage.recommendedTools && (
                        <div className="card p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 flex items-center text-[var(--text-main)]">
                                <Wrench className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                                Recommended Tools Checklist
                            </h3>
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

                    {/* Additional Strategy Details */}
                    <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-[var(--text-main)]">Additional Strategy Details</h3>
                        {stage.id === 'awareness' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Discovery Channels</label>
                                    <textarea value={formData.awareness.discovery_channels} onChange={(e) => handleInputChange('awareness', 'discovery_channels', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Initial Pain Points</label>
                                    <textarea value={formData.awareness.pain_points} onChange={(e) => handleInputChange('awareness', 'pain_points', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Key Messaging</label>
                                    <textarea value={formData.awareness.messaging} onChange={(e) => handleInputChange('awareness', 'messaging', e.target.value)} className="form-input h-24" />
                                </div>
                            </>
                        )}

                        {stage.id === 'consideration' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Evaluation Criteria</label>
                                    <textarea value={formData.consideration.evaluation_criteria} onChange={(e) => handleInputChange('consideration', 'evaluation_criteria', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Common Questions</label>
                                    <textarea value={formData.consideration.common_questions} onChange={(e) => handleInputChange('consideration', 'common_questions', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Information Needs</label>
                                    <textarea value={formData.consideration.information_needs} onChange={(e) => handleInputChange('consideration', 'information_needs', e.target.value)} className="form-input h-24" />
                                </div>
                            </>
                        )}

                        {stage.id === 'decision' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Purchase Decision Factors</label>
                                    <textarea value={formData.decision.purchase_factors} onChange={(e) => handleInputChange('decision', 'purchase_factors', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Potential Obstacles</label>
                                    <textarea value={formData.decision.obstacles} onChange={(e) => handleInputChange('decision', 'obstacles', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Preferred Payment Methods</label>
                                    <textarea value={formData.decision.preferred_methods} onChange={(e) => handleInputChange('decision', 'preferred_methods', e.target.value)} className="form-input h-24" />
                                </div>
                            </>
                        )}

                        {stage.id === 'service' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Onboarding Process</label>
                                    <textarea value={formData.service.onboarding_process} onChange={(e) => handleInputChange('service', 'onboarding_process', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Support Needs</label>
                                    <textarea value={formData.service.support_needs} onChange={(e) => handleInputChange('service', 'support_needs', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Communication Preferences</label>
                                    <textarea value={formData.service.communication_preferences} onChange={(e) => handleInputChange('service', 'communication_preferences', e.target.value)} className="form-input h-24" />
                                </div>
                            </>
                        )}

                        {stage.id === 'loyalty' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Retention Strategies</label>
                                    <textarea value={formData.loyalty.retention_strategies} onChange={(e) => handleInputChange('loyalty', 'retention_strategies', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Advocacy Opportunities</label>
                                    <textarea value={formData.loyalty.advocacy_opportunities} onChange={(e) => handleInputChange('loyalty', 'advocacy_opportunities', e.target.value)} className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Feedback Mechanisms</label>
                                    <textarea value={formData.loyalty.feedback_mechanisms} onChange={(e) => handleInputChange('loyalty', 'feedback_mechanisms', e.target.value)} className="form-input h-24" />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}, (prevProps, nextProps) => {
    const stageId = prevProps.stage.id;
    const prevData = prevProps.formData[stageId];
    const nextData = nextProps.formData[stageId];
    
    const dataChanged = JSON.stringify(prevData) !== JSON.stringify(nextData);
    
    return !dataChanged && prevProps.stage === nextProps.stage && prevProps.isImporting === nextProps.isImporting && prevProps.isGenerating === nextProps.isGenerating;
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
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Map Your Customer Journey</h1>
                                <p className="text-[var(--text-soft)]">
                                    Understand your customer's experience at every stage and discover how The Business Minds HQ streamlines each touchpoint.
                                </p>
                            </div>
                            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('input')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                        viewMode === 'input'
                                            ? 'bg-white dark:bg-gray-600 shadow text-[var(--text-main)]'
                                            : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'
                                    }`}
                                >
                                    Build Journey
                                </button>
                                <button
                                    onClick={() => setViewMode('overview')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                        viewMode === 'overview'
                                            ? 'bg-white dark:bg-gray-600 shadow text-[var(--text-main)]'
                                            : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'
                                    }`}
                                >
                                    <Map className="w-4 h-4 inline mr-2" />
                                    View Map
                                </button>
                            </div>
                        </div>

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

                    {viewMode === 'input' ? (
                        <>
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
                                    handlePathwaySelect={handlePathwaySelect}
                                    handlePathwayInputChange={handlePathwayInputChange}
                                    handleGenerateStrategy={handleGenerateStrategy}
                                    isGenerating={isSaving}
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
                        </>
                    ) : null}
                </div>

                {/* Overview Mode - Full Width */}
                {viewMode === 'overview' && (
                    <CustomerJourneyMap formData={formData} stages={STAGES} />
                )}
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