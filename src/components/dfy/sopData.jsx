import { 
    Users, Layout, Rocket, Crown, Settings, BarChart
} from "lucide-react";

export const SOCIAL_MEDIA_PACKAGES = [
    {
        id: 'trial_social',
        title: 'Trial Social Media Package',
        price: '$199/month',
        icon: 'Share2',
        description: 'Best for testing consistency & brand presence',
        platforms: ['Facebook', 'Instagram'],
        duration: '90 days',
        steps: [
            {
                id: 'trial_onboarding',
                title: 'Client Onboarding & Setup',
                description: 'Complete onboarding form and provide brand assets',
                responsible_party: 'Client',
                status: 'pending',
                checklist: [
                    { id: 'logo', text: 'Provide logo (PNG or SVG)', is_checked: false },
                    { id: 'colors', text: 'Share brand colors & fonts', is_checked: false },
                    { id: 'description', text: 'Submit business description (1-2 paragraphs)', is_checked: false },
                    { id: 'audience', text: 'Define target audience', is_checked: false },
                    { id: 'access', text: 'Grant access to Facebook & Instagram', is_checked: false }
                ]
            },
            {
                id: 'trial_month1',
                title: 'Month 1 - Foundation',
                description: 'Establish consistency and brand clarity',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm1_strategy', text: 'Initial campaign strategy created', is_checked: false },
                    { id: 'm1_voice', text: 'Brand voice & hashtag research completed', is_checked: false },
                    { id: 'm1_calendar', text: 'Content calendar setup', is_checked: false },
                    { id: 'm1_posts', text: '12 branded image posts published', is_checked: false },
                    { id: 'm1_tracking', text: 'Engagement tracking baseline established', is_checked: false }
                ]
            },
            {
                id: 'trial_month2',
                title: 'Month 2 - Engagement',
                description: 'Improve reach and post engagement',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm2_captions', text: 'Optimized captions & hashtag refinement', is_checked: false },
                    { id: 'm2_posting', text: 'Continued posting cadence', is_checked: false },
                    { id: 'm2_review', text: 'Engagement review completed', is_checked: false },
                    { id: 'm2_visuals', text: 'Visual branding consistency improved', is_checked: false }
                ]
            },
            {
                id: 'trial_month3',
                title: 'Month 3 - Optimization',
                description: 'Prepare brand for upgrade or scale',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm3_performance', text: 'Performance review completed', is_checked: false },
                    { id: 'm3_adjustments', text: 'Content adjusted based on best posts', is_checked: false },
                    { id: 'm3_recommendations', text: 'Growth recommendations provided', is_checked: false }
                ]
            }
        ]
    },
    {
        id: 'standard_social',
        title: 'Standard Social Media Package',
        price: '$399/month',
        icon: 'TrendingUp',
        description: 'Perfect for most businesses',
        platforms: ['Facebook', 'Instagram', 'LinkedIn'],
        duration: '90 days',
        steps: [
            {
                id: 'std_onboarding',
                title: 'Client Onboarding & Setup',
                description: 'Complete onboarding and provide all necessary assets',
                responsible_party: 'Client',
                status: 'pending',
                checklist: [
                    { id: 'logo', text: 'Provide logo + brand assets', is_checked: false },
                    { id: 'website', text: 'Share website URL', is_checked: false },
                    { id: 'audience', text: 'Define target audience & service list', is_checked: false },
                    { id: 'competitors', text: 'Provide competitor examples (optional)', is_checked: false },
                    { id: 'access', text: 'Grant platform access (FB, IG, LinkedIn)', is_checked: false },
                    { id: 'blog', text: 'Share blog topics or keyword focus', is_checked: false }
                ]
            },
            {
                id: 'std_month1',
                title: 'Month 1 - Strategy & Visibility',
                description: 'Look professional and active across platforms',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm1_strategy', text: 'Initial campaign strategy created', is_checked: false },
                    { id: 'm1_research', text: 'Audience & competitor research completed', is_checked: false },
                    { id: 'm1_calendar', text: 'Monthly content calendar created', is_checked: false },
                    { id: 'm1_posts', text: '12 branded image posts published', is_checked: false },
                    { id: 'm1_reels', text: '2 reels/videos created and posted', is_checked: false },
                    { id: 'm1_blog', text: '1 SEO blog written and published', is_checked: false },
                    { id: 'm1_report', text: 'Engagement baseline report delivered', is_checked: false }
                ]
            },
            {
                id: 'std_month2',
                title: 'Month 2 - Authority & Growth',
                description: 'Increase reach and brand authority',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm2_optimization', text: 'Caption & hashtag optimization completed', is_checked: false },
                    { id: 'm2_publishing', text: 'Continued content publishing', is_checked: false },
                    { id: 'm2_blog', text: 'SEO blog focused on discoverability published', is_checked: false },
                    { id: 'm2_analysis', text: 'Engagement trend analysis completed', is_checked: false }
                ]
            },
            {
                id: 'std_month3',
                title: 'Month 3 - Optimization',
                description: 'Consistent growth and message clarity',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm3_refinement', text: 'Performance-based content refinement', is_checked: false },
                    { id: 'm3_topics', text: 'Blog and video topic optimization', is_checked: false },
                    { id: 'm3_roadmap', text: 'Growth roadmap recommendations delivered', is_checked: false }
                ]
            }
        ]
    },
    {
        id: 'advanced_social',
        title: 'Advanced Social Media Package',
        price: '$549/month',
        icon: 'Rocket',
        description: 'For aggressive content marketing',
        platforms: ['Facebook', 'Instagram', 'LinkedIn', 'Google Business', 'YouTube'],
        duration: '90 days',
        steps: [
            {
                id: 'adv_onboarding',
                title: 'Client Onboarding & Setup',
                description: 'Complete comprehensive onboarding',
                responsible_party: 'Client',
                status: 'pending',
                checklist: [
                    { id: 'brandkit', text: 'Provide full brand kit', is_checked: false },
                    { id: 'website', text: 'Share website & email platform access', is_checked: false },
                    { id: 'google_youtube', text: 'Grant Google Business & YouTube access', is_checked: false },
                    { id: 'cta', text: 'Provide lead offer or CTA', is_checked: false },
                    { id: 'faqs', text: 'Share customer FAQs or objections', is_checked: false },
                    { id: 'reviews', text: 'Grant review access (Google, Facebook)', is_checked: false }
                ]
            },
            {
                id: 'adv_month1',
                title: 'Month 1 - Authority Build',
                description: 'Establish authority and omnipresence',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm1_strategy', text: 'Initial campaign strategy created', is_checked: false },
                    { id: 'm1_pillars', text: 'Content pillars & video strategy defined', is_checked: false },
                    { id: 'm1_posts', text: '20 branded image posts published', is_checked: false },
                    { id: 'm1_reels', text: '4 reels/videos created and posted', is_checked: false },
                    { id: 'm1_blog', text: '1 SEO blog published', is_checked: false },
                    { id: 'm1_newsletter', text: '1 email newsletter sent', is_checked: false },
                    { id: 'm1_calendar', text: 'Monthly content calendar delivered', is_checked: false }
                ]
            },
            {
                id: 'adv_month2',
                title: 'Month 2 - Engagement & Trust',
                description: 'Build trust and deepen engagement',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm2_consultation', text: 'Monthly strategy consultation completed', is_checked: false },
                    { id: 'm2_analytics', text: 'Analytics review delivered', is_checked: false },
                    { id: 'm2_email', text: 'Email engagement optimization completed', is_checked: false },
                    { id: 'm2_video', text: 'Video performance refinement completed', is_checked: false }
                ]
            },
            {
                id: 'adv_month3',
                title: 'Month 3 - Conversion Focus',
                description: 'Turn attention into leads',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm3_conversion', text: 'Conversion-focused content themes implemented', is_checked: false },
                    { id: 'm3_optimization', text: 'Content & messaging optimization completed', is_checked: false },
                    { id: 'm3_analytics', text: 'Monthly analytics report delivered', is_checked: false },
                    { id: 'm3_strategy', text: 'Growth and scaling strategy provided', is_checked: false }
                ]
            }
        ]
    },
    {
        id: 'growth_social',
        title: 'Growth Social Media Package',
        price: '$800/month',
        icon: 'Zap',
        description: 'Full marketing execution & paid growth',
        platforms: ['Facebook', 'Instagram', 'LinkedIn', 'X', 'Google Business', 'TikTok', 'Pinterest', 'YouTube'],
        duration: '90 days',
        steps: [
            {
                id: 'growth_onboarding',
                title: 'Client Onboarding & Setup',
                description: 'Complete comprehensive onboarding for full service',
                responsible_party: 'Client',
                status: 'pending',
                checklist: [
                    { id: 'brandkit', text: 'Provide full brand kit', is_checked: false },
                    { id: 'access', text: 'Grant website, email, ad account access', is_checked: false },
                    { id: 'pixel', text: 'Provide pixel/tracking access', is_checked: false },
                    { id: 'demographics', text: 'Share target locations & demographics', is_checked: false },
                    { id: 'offers', text: 'Provide offer or promotion details', is_checked: false },
                    { id: 'reviews', text: 'Grant review platform access', is_checked: false },
                    { id: 'workflow', text: 'Assign approval workflow contact', is_checked: false }
                ]
            },
            {
                id: 'growth_month1',
                title: 'Month 1 - System Setup',
                description: 'Build a complete marketing system',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm1_strategy', text: 'Full campaign strategy created', is_checked: false },
                    { id: 'm1_funnel', text: 'Content + funnel alignment completed', is_checked: false },
                    { id: 'm1_posts', text: '30 posts published', is_checked: false },
                    { id: 'm1_reels', text: '4 reels/videos created', is_checked: false },
                    { id: 'm1_blog', text: '1 SEO blog published', is_checked: false },
                    { id: 'm1_newsletter', text: '1 email newsletter sent', is_checked: false },
                    { id: 'm1_ads', text: 'Paid ad campaign setup completed', is_checked: false },
                    { id: 'm1_spend', text: '$100 ad spend managed', is_checked: false },
                    { id: 'm1_community', text: 'Community management activated', is_checked: false }
                ]
            },
            {
                id: 'growth_month2',
                title: 'Month 2 - Scale & Optimize',
                description: 'Scale what works',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm2_consultation', text: 'Monthly strategy consultation completed', is_checked: false },
                    { id: 'm2_ads', text: 'Ad optimization & audience testing completed', is_checked: false },
                    { id: 'm2_engagement', text: 'Engagement + review responses handled', is_checked: false },
                    { id: 'm2_analytics', text: 'Analytics review delivered', is_checked: false }
                ]
            },
            {
                id: 'growth_month3',
                title: 'Month 3 - Conversion & Retargeting',
                description: 'Consistent traffic, leads, and momentum',
                responsible_party: 'Service Provider',
                status: 'pending',
                checklist: [
                    { id: 'm3_retargeting', text: 'Retargeting ad campaigns launched', is_checked: false },
                    { id: 'm3_conversion', text: 'Conversion-focused content published', is_checked: false },
                    { id: 'm3_analytics', text: 'Full analytics report delivered', is_checked: false },
                    { id: 'm3_plan', text: 'Next-phase growth plan provided', is_checked: false }
                ]
            }
        ]
    }
];

export const DFY_PACKAGES = [
    {
        id: "community",
        title: "The Community",
        stage: "Vision",
        price: "Free",
        icon: Users,
        description: "Clarity, connection, and a 90-day roadmap.",
        steps: [
            {
                id: "comm_1",
                title: "Join Community Platform",
                description: "Client Action: Create your account and access the Business Minds Community platform (Slack/Discord/Portal). This is where you'll connect with other entrepreneurs.",
                responsible_party: "Client",
                status: "pending",
                checklist: [
                    { id: "c1", text: "Join Business Minds Community", is_checked: false },
                    { id: "c2", text: "Complete basic profile and business info", is_checked: false },
                    { id: "c3", text: "Engage with at least one community post", is_checked: false }
                ]
            },
            {
                id: "comm_2",
                title: "Access 90-Day Roadmap",
                description: "Client Action: Log in to The HQ and navigate to 'My 90-Day Journey'. This interactive roadmap guides your vision and strategy.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "Journey",
                checklist: [
                    { id: "c4", text: "Access 90-Day Roadmap in The HQ", is_checked: false },
                    { id: "c5", text: "Identify first 1–3 roadmap actions", is_checked: false }
                ]
            },
            {
                id: "comm_3",
                title: "Welcome Email & Intro",
                description: "Team Action: We will send you a welcome packet with suggested first actions and community guidelines. Check your email inbox.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "c6", text: "Verify client signup", is_checked: false },
                    { id: "c7", text: "Send welcome email with links", is_checked: false },
                    { id: "c8", text: "QA: Confirm client joined community", is_checked: false }
                ]
            }
        ]
    },
    {
        id: "foundation",
        title: "The Foundation Build",
        stage: "Startup",
        price: "$1,500",
        icon: Layout,
        description: "Professional 5-page website to establish credibility.",
        steps: [
            {
                id: "found_1",
                title: "Submit Brand Assets",
                description: "Client Action: Log in to The HQ (app.thebminds.com) and navigate to your Media Library. Upload your high-resolution Logo, Brand Colors, Fonts, and Images. Provide written content for pages.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "f1", text: "Upload high-res Logo (PNG/SVG)", is_checked: false },
                    { id: "f2", text: "Provide Brand Colors (Hex codes)", is_checked: false },
                    { id: "f3", text: "Provide Fonts (or selection)", is_checked: false },
                    { id: "f4", text: "Upload Images for website", is_checked: false },
                    { id: "f5", text: "Provide written content for Home, About, Services", is_checked: false },
                    { id: "f6", text: "Email team@thebminds.com when assets are ready", is_checked: false }
                ]
            },
            {
                id: "found_2",
                title: "Review 90-Day Roadmap",
                description: "Joint Action: Review your 'My 90-Day Journey' roadmap to align your website's Unique Value Proposition (UVP) and messaging.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "Journey",
                checklist: [
                    { id: "f7", text: "Review UVP and Value Ladder", is_checked: false },
                    { id: "f8", text: "Confirm messaging alignment", is_checked: false }
                ]
            },
            {
                id: "found_3",
                title: "Build 5 Pages",
                description: "Team Action: Design and build Home, About, Services, Contact, and CTA pages using The HQ Sites builder.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "f9", text: "Create project in The HQ", is_checked: false },
                    { id: "f10", text: "Build Home, About, Services, Contact, CTA pages", is_checked: false },
                    { id: "f11", text: "Add SEO basics (titles, meta, alt tags)", is_checked: false },
                    { id: "f12", text: "Test on mobile, desktop, tablet", is_checked: false }
                ]
            },
            {
                id: "found_4",
                title: "Integrate Forms & CRM",
                description: "Team Action: Create lead capture forms and connect them to The HQ CRM and Automation.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "f13", text: "Create lead capture forms", is_checked: false },
                    { id: "f14", text: "Connect forms to CRM pipelines", is_checked: false },
                    { id: "f15", text: "QA: Forms submit correctly", is_checked: false }
                ]
            },
            {
                id: "found_5",
                title: "Review Staging Site",
                description: "Client Action: Review the draft website link. Check design, spelling, and functionality.",
                responsible_party: "Client",
                status: "pending",
                checklist: [
                    { id: "f16", text: "Review site design and copy", is_checked: false },
                    { id: "f17", text: "Test all links and forms", is_checked: false },
                    { id: "f18", text: "Submit feedback to team@thebminds.com", is_checked: false }
                ]
            },
            {
                id: "found_6",
                title: "Launch Live Site",
                description: "Team Action: Connect domain, configure SSL, and publish the website live.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "f19", text: "Implement client feedback", is_checked: false },
                    { id: "f20", text: "Connect domain and SSL", is_checked: false },
                    { id: "f21", text: "Publish live site", is_checked: false },
                    { id: "f22", text: "Send handoff email with login info", is_checked: false }
                ]
            }
        ]
    },
    {
        id: "growth",
        title: "The Growth Engine",
        stage: "Startup → Early Growth",
        price: "$3,500",
        icon: Rocket,
        description: "Automated lead-generation funnel and follow-up system.",
        steps: [
            {
                id: "growth_1",
                title: "Define Lead Magnet",
                description: "Joint Action: Finalize strategy for lead magnet. Client provides content/file.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "g1", text: "Finalize offer details and strategy", is_checked: false },
                    { id: "g2", text: "Client: Provide lead magnet content/file", is_checked: false },
                    { id: "g3", text: "Approve 'hook' and title", is_checked: false }
                ]
            },
            {
                id: "growth_2",
                title: "Build Funnel Pages",
                description: "Team Action: Build Landing, Opt-in, Thank You, and Booking/Sales pages in The HQ Funnels.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "g4", text: "Build Landing Page", is_checked: false },
                    { id: "g5", text: "Build Opt-in Page", is_checked: false },
                    { id: "g6", text: "Build Thank You Page", is_checked: false },
                    { id: "g7", text: "Build Booking/Offer Page", is_checked: false }
                ]
            },
            {
                id: "growth_3",
                title: "Setup Email Automation",
                description: "Team Action: Configure 5-email nurture sequence in The HQ Automation.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "g8", text: "Write/Configure 5 follow-up emails", is_checked: false },
                    { id: "g9", text: "Set up automation triggers", is_checked: false }
                ]
            },
            {
                id: "growth_4",
                title: "CRM & Tagging Setup",
                description: "Team Action: Configure CRM pipeline stages and automation triggers (tags, alerts).",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "g10", text: "Configure CRM pipeline stages", is_checked: false },
                    { id: "g11", text: "Set up lead tagging and alerts", is_checked: false }
                ]
            },
            {
                id: "growth_5",
                title: "Test & Review",
                description: "Joint Action: Run test leads through funnel. Client verifies emails and notifications.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "g12", text: "Team: Submit test leads & verify flows", is_checked: false },
                    { id: "g13", text: "Client: Review page design & copy", is_checked: false },
                    { id: "g14", text: "Client: Review email sequence", is_checked: false },
                    { id: "g15", text: "Approve funnel for launch", is_checked: false }
                ]
            },
            {
                id: "growth_6",
                title: "Go Live & Training",
                description: "Team Action: Publish funnel and provide training on lead management.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "g16", text: "Implement feedback & publish live", is_checked: false },
                    { id: "g17", text: "Provide client training/documentation", is_checked: false }
                ]
            }
        ]
    },
    {
        id: "authority",
        title: "The Authority Platform",
        stage: "Growth",
        price: "$5,000",
        icon: Crown,
        description: "Custom WordPress site for long-term brand authority.",
        steps: [
            {
                id: "auth_1",
                title: "Brand & Content Strategy",
                description: "Joint Action: Define site map and content strategy. Client uploads assets.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "a1", text: "Plan site architecture (up to 10 pages)", is_checked: false },
                    { id: "a2", text: "Client: Submit Brand Guide and copy", is_checked: false }
                ]
            },
            {
                id: "auth_2",
                title: "WordPress Environment Setup",
                description: "Team Action: Initialize managed WordPress hosting in The HQ. Configure security.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "a3", text: "Initialize WordPress hosting", is_checked: false },
                    { id: "a4", text: "Configure security & SSL", is_checked: false }
                ]
            },
            {
                id: "auth_3",
                title: "Build Custom Pages",
                description: "Team Action: Develop custom pages with premium design.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "a5", text: "Build Home, About, Services pages", is_checked: false },
                    { id: "a6", text: "Build Blog & Landing pages", is_checked: false },
                    { id: "a7", text: "Integrate Brand Kit assets", is_checked: false }
                ]
            },
            {
                id: "auth_4",
                title: "Blog & Content Framework",
                description: "Team Action: Set up blog structure and publish first 3 posts.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "a8", text: "Setup blog categories & layout", is_checked: false },
                    { id: "a9", text: "Publish first 3 posts", is_checked: false }
                ]
            },
            {
                id: "auth_5",
                title: "CRM Integration",
                description: "Team Action: Connect WordPress forms to The HQ CRM.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "a10", text: "Connect forms to CRM", is_checked: false }
                ]
            },
            {
                id: "auth_6",
                title: "Staging Review",
                description: "Client Action: Review staging site design, copy, and functionality.",
                responsible_party: "Client",
                status: "pending",
                checklist: [
                    { id: "a11", text: "Review layout & copy", is_checked: false },
                    { id: "a12", text: "Test forms & links", is_checked: false },
                    { id: "a13", text: "Approve site", is_checked: false }
                ]
            },
            {
                id: "auth_7",
                title: "Launch & Handoff",
                description: "Team Action: Go live, handle DNS, final QA, and training.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "a14", text: "Implement revisions & go live", is_checked: false },
                    { id: "a15", text: "Configure backups", is_checked: false },
                    { id: "a16", text: "Provide update training", is_checked: false }
                ]
            }
        ]
    },
    {
        id: "operating_system",
        title: "The Operating System",
        stage: "Growth",
        price: "$7,500",
        icon: Settings,
        description: "Full HQ configuration: CRM, sales, and automation backbone.",
        steps: [
            {
                id: "ops_1",
                title: "Process & KPI Review",
                description: "Joint Action: Audit current processes and define KPIs.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "o1", text: "Audit sales & ops processes", is_checked: false },
                    { id: "o2", text: "Define KPIs for HQ Dashboard", is_checked: false }
                ]
            },
            {
                id: "ops_2",
                title: "CRM Pipeline Setup",
                description: "Team Action: Configure custom CRM pipelines, stages, and deal tracks.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "o3", text: "Configure pipelines & stages", is_checked: false },
                    { id: "o4", text: "Set up deal probabilities", is_checked: false }
                ]
            },
            {
                id: "ops_3",
                title: "Automation Workflows",
                description: "Team Action: Build Email/SMS automations, reminders, and reputation management.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "o5", text: "Build email/SMS automations", is_checked: false },
                    { id: "o6", text: "Build appointment reminders", is_checked: false },
                    { id: "o7", text: "Build reputation management", is_checked: false }
                ]
            },
            {
                id: "ops_4",
                title: "Tool Configuration",
                description: "Team Action: Setup Calendars, Surveys, Affiliate Manager, Phone, and Payments.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "o8", text: "Setup Calendars & Surveys", is_checked: false },
                    { id: "o9", text: "Setup Affiliate & Phone systems", is_checked: false },
                    { id: "o10", text: "Integrate Payment Gateways", is_checked: false }
                ]
            },
            {
                id: "ops_5",
                title: "System Testing",
                description: "Team Action: Verify data flow from Forms -> CRM -> Automation -> Reporting.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "o11", text: "Verify all workflow triggers", is_checked: false },
                    { id: "o12", text: "Verify CRM data capture", is_checked: false }
                ]
            },
            {
                id: "ops_6",
                title: "Team Training",
                description: "Team Action: Conduct live training session and provide SOP guides.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "o13", text: "Conduct training session", is_checked: false },
                    { id: "o14", text: "Provide SOP guides", is_checked: false }
                ]
            },
            {
                id: "ops_7",
                title: "30-Day Optimization",
                description: "Team Action: Review analytics and tweak workflows after 30 days.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "o15", text: "Review performance analytics", is_checked: false },
                    { id: "o16", text: "Tweak workflows for efficiency", is_checked: false }
                ]
            }
        ]
    },
    {
        id: "90_day_build",
        title: "The 90-Day Business Build",
        stage: "Startup → Growth",
        price: "$12,500",
        icon: BarChart,
        description: "Hands-on execution of strategy, systems, and structure over 90 days. Includes Voice AI & Chat Bots.",
        steps: [
            {
                id: "build_1",
                title: "Kickoff & Strategy",
                description: "Joint Action: Kickoff call to assign milestones, gather assets, and set 12-week plan.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b1", text: "Schedule and attend 90-minute Kickoff Deep Dive", is_checked: false },
                    { id: "b2", text: "Client: Complete onboarding questionnaire", is_checked: false },
                    { id: "b3", text: "Client: Provide access to existing domains, hosting, and social accounts", is_checked: false },
                    { id: "b4", text: "Client: Upload brand assets (Logo, Fonts, Colors, Headshots)", is_checked: false },
                    { id: "b5", text: "Team: Create project timeline and shared folder", is_checked: false },
                    { id: "b6", text: "Approve 90-Day Roadmap & Key Milestones", is_checked: false }
                ]
            },
            {
                id: "build_2",
                title: "Weeks 1-2: Systems Foundation",
                description: "Team Action: Setup CRM, Calendars, Automation, Phone Systems, and Reputation Management.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b7", text: "Configure CRM Pipeline stages (Leads, Appointments, Sales)", is_checked: false },
                    { id: "b8", text: "Integrate Google/Outlook Calendars for booking", is_checked: false },
                    { id: "b9", text: "Procure and configure Business Phone Number (A2P registration)", is_checked: false },
                    { id: "b10", text: "Setup 'Missed Call Text Back' automation", is_checked: false },
                    { id: "b11", text: "Integrate Stripe/Payment Gateways", is_checked: false },
                    { id: "b12", text: "Client: Verify phone number registration info", is_checked: false }
                ]
            },
            {
                id: "build_3",
                title: "Weeks 3-4: Web & Funnel Build",
                description: "Team Action: Design, write, and build the core high-converting Website or Sales Funnel.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b13", text: "Create wireframe and site map", is_checked: false },
                    { id: "b14", text: "Write conversion-focused copy for Home, About, Services, Contact", is_checked: false },
                    { id: "b15", text: "Design and build pages in The HQ Builder", is_checked: false },
                    { id: "b16", text: "Optimize for Mobile Responsiveness", is_checked: false },
                    { id: "b17", text: "Client: Review First Draft", is_checked: false },
                    { id: "b18", text: "Implement revisions and finalize design", is_checked: false },
                    { id: "b19", text: "Setup SEO metadata (Titles, Descriptions, Alt Text)", is_checked: false }
                ]
            },
            {
                id: "build_ai_voice",
                title: "Voice AI Agent Setup",
                description: "Team Action: Configure an AI Voice Agent to handle after-hours calls, answer FAQs, and book appointments.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "v1", text: "Define Voice Agent persona and tone", is_checked: false },
                    { id: "v2", text: "Draft call scripts for FAQs and appointment booking", is_checked: false },
                    { id: "v3", text: "Configure knowledge base for the Voice Agent", is_checked: false },
                    { id: "v4", text: "Train and test Voice Agent responses", is_checked: false },
                    { id: "v5", text: "Set up call forwarding for after-hours handling", is_checked: false },
                    { id: "v6", text: "Client: Test call the agent and provide feedback", is_checked: false }
                ]
            },
            {
                id: "build_ai_chat",
                title: "AI Chat Bot Implementation",
                description: "Team Action: Deploy a smart AI Chat Bot on the website to capture leads and answer questions 24/7.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "c1", text: "Design Chat Widget appearance (colors, avatar)", is_checked: false },
                    { id: "c2", text: "Upload business knowledge base (services, pricing, policies)", is_checked: false },
                    { id: "c3", text: "Configure lead capture behavior (Name, Email, Phone)", is_checked: false },
                    { id: "c4", text: "Test chat conversations for accuracy", is_checked: false },
                    { id: "c5", text: "Embed Chat Widget on Website/Funnel", is_checked: false }
                ]
            },
            {
                id: "build_workflows",
                title: "Marketing Automation Workflows",
                description: "Team Action: Build and activate 3 core automation workflows to nurture leads and save time.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "w1", text: "Workflow 1: Lead Nurture Sequence (5-email drip)", is_checked: false },
                    { id: "w2", text: "Workflow 2: Appointment Confirmation & Reminders (Email/SMS)", is_checked: false },
                    { id: "w3", text: "Workflow 3: Post-Service Review Request", is_checked: false },
                    { id: "w4", text: "Test all workflows end-to-end", is_checked: false },
                    { id: "w5", text: "Client: Review email/SMS copy", is_checked: false }
                ]
            },
            {
                id: "build_4",
                title: "Weeks 5-8: Content & Social",
                description: "Team Action: Setup Social Planner, design templates, and load the first month of content.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b20", text: "Connect Social Media Accounts (FB, IG, LinkedIn, etc.)", is_checked: false },
                    { id: "b21", text: "Design branded social media templates (Canva/HQ)", is_checked: false },
                    { id: "b22", text: "Create content calendar for Month 1", is_checked: false },
                    { id: "b23", text: "Draft posts (Copy + Creative)", is_checked: false },
                    { id: "b24", text: "Client: Approve content calendar", is_checked: false },
                    { id: "b25", text: "Schedule all posts in Social Planner", is_checked: false },
                    { id: "b26", text: "Setup Email Marketing Newsletter template", is_checked: false }
                ]
            },
            {
                id: "build_5",
                title: "Weeks 9-12: Launch & Optimization",
                description: "Team Action: Go live, monitor traffic, and tweak systems based on real data.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "b27", text: "Go Live: Publish Website/Funnel to custom domain", is_checked: false },
                    { id: "b28", text: "Launch email announcement campaign", is_checked: false },
                    { id: "b29", text: "Monitor traffic and form submissions", is_checked: false },
                    { id: "b30", text: "Review Voice Agent and Chat Bot logs", is_checked: false },
                    { id: "b31", text: "Optimize A/B tests (headlines, buttons)", is_checked: false },
                    { id: "b32", text: "Review initial KPI report with Client", is_checked: false }
                ]
            },
            {
                id: "build_6",
                title: "Weekly Progress Calls",
                description: "Joint Action: Consistent weekly syncs to review progress, approve assets, and clear blockers.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b33", text: "Schedule recurring weekly 30-min sync", is_checked: false },
                    { id: "b34", text: "Week 1-4: Foundation & Systems review", is_checked: false },
                    { id: "b35", text: "Week 5-8: Content & Design review", is_checked: false },
                    { id: "b36", text: "Week 9-12: Performance & Launch review", is_checked: false }
                ]
            },
            {
                id: "build_7",
                title: "Final Handoff & Graduation",
                description: "Joint Action: Complete asset transfer, final training, and discuss maintenance plan.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b37", text: "Provide 'Owner's Manual' with all logins and SOPs", is_checked: false },
                    { id: "b38", text: "Conduct Final Training Session (Recorded)", is_checked: false },
                    { id: "b39", text: "Verify client full ownership of all assets", is_checked: false },
                    { id: "b40", text: "Client: Sign off on project completion", is_checked: false },
                    { id: "b41", text: "Discuss ongoing maintenance or support options", is_checked: false }
                ]
            }
        ]
    }
];