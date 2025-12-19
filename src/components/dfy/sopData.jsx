import { 
    Users, Layout, Rocket, Crown, Settings, BarChart
} from "lucide-react";

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
        description: "Hands-on execution of strategy, systems, and structure over 90 days.",
        steps: [
            {
                id: "build_1",
                title: "Kickoff & Strategy",
                description: "Joint Action: Kickoff call to assign milestones and set 12-week plan.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b1", text: "Client: Attend kickoff & provide assets", is_checked: false },
                    { id: "b2", text: "Approve roadmap & milestone plan", is_checked: false }
                ]
            },
            {
                id: "build_2",
                title: "Weeks 1-2: Systems",
                description: "Team Action: Setup CRM, Calendars, Automation, and Phone Systems.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b3", text: "Setup CRM & Calendars", is_checked: false },
                    { id: "b4", text: "Setup Automation & Phone", is_checked: false },
                    { id: "b5", text: "Client: Provide domain/payment access", is_checked: false }
                ]
            },
            {
                id: "build_3",
                title: "Weeks 3-4: Web/Funnel",
                description: "Team Action: Design and build core Website or Sales Funnel.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b6", text: "Design & Build Website/Funnel", is_checked: false },
                    { id: "b7", text: "Client: Review designs", is_checked: false }
                ]
            },
            {
                id: "build_4",
                title: "Weeks 5-8: Content & Social",
                description: "Team Action: Setup Social Planner, Email templates, load content.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com",
                checklist: [
                    { id: "b8", text: "Setup Social Planner", is_checked: false },
                    { id: "b9", text: "Setup Email Marketing templates", is_checked: false },
                    { id: "b10", text: "Load first month of content", is_checked: false }
                ]
            },
            {
                id: "build_5",
                title: "Weeks 9-12: Optimization",
                description: "Team Action: Launch campaigns, monitor KPIs, tweak systems.",
                responsible_party: "Service Provider",
                status: "pending",
                checklist: [
                    { id: "b11", text: "Launch campaigns", is_checked: false },
                    { id: "b12", text: "Monitor KPIs & tweak", is_checked: false }
                ]
            },
            {
                id: "build_6",
                title: "Weekly Progress Calls",
                description: "Joint Action: Weekly sync to review progress and blockers.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b13", text: "Conduct weekly syncs", is_checked: false },
                    { id: "b14", text: "Client: Participate in calls", is_checked: false }
                ]
            },
            {
                id: "build_7",
                title: "Final Handoff",
                description: "Joint Action: Graduation! Hand over assets and discuss next steps.",
                responsible_party: "Both",
                status: "pending",
                checklist: [
                    { id: "b15", text: "Hand over all assets & access", is_checked: false },
                    { id: "b16", text: "Confirm completion of goals", is_checked: false }
                ]
            }
        ]
    }
];