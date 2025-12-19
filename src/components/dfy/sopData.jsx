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
                description: "Access the Business Minds Community platform (Slack/Discord/Portal).",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "comm_2",
                title: "Access 90-Day Roadmap",
                description: "Log in and view your interactive 90-Day Roadmap.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "Journey"
            },
            {
                id: "comm_3",
                title: "Welcome Email & Intro",
                description: "Receive welcome packet and suggested first actions.",
                responsible_party: "Service Provider",
                status: "pending"
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
                description: "Upload logo, colors, fonts, and images to your Media Library in The HQ.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_2",
                title: "Review 90-Day Roadmap",
                description: "Align UVP, value ladder, and messaging with the roadmap.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "Journey"
            },
            {
                id: "found_3",
                title: "Build 5 Pages",
                description: "Create Home, About, Services, Contact, and CTA pages in The HQ Sites builder.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_4",
                title: "Integrate Forms & CRM",
                description: "Connect lead capture forms to The HQ CRM and Automation.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_5",
                title: "Review Staging Site",
                description: "Review the draft website and provide feedback.",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "found_6",
                title: "Launch Live Site",
                description: "Publish the website and transfer credentials.",
                responsible_party: "Service Provider",
                status: "pending"
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
                description: "Finalize the offer/lead magnet details and strategy.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "growth_2",
                title: "Build Funnel Pages",
                description: "Create Landing, Opt-in, Thank You, Offer, and Booking pages in The HQ Funnels.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_3",
                title: "Setup Email Automation",
                description: "Configure 5-email follow-up sequence in The HQ Automation.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_4",
                title: "CRM & Tagging Setup",
                description: "Configure pipeline stages and automation triggers in The HQ CRM.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_5",
                title: "Test & Review",
                description: "Submit test leads and verify automation flow. Client approval required.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "growth_6",
                title: "Go Live & Training",
                description: "Publish funnel and provide client training on managing leads.",
                responsible_party: "Service Provider",
                status: "pending"
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
                description: "Submit brand guide and plan site architecture (up to 10 pages). Upload assets to The HQ.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_2",
                title: "WordPress Environment Setup",
                description: "Initialize managed WordPress hosting inside The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_3",
                title: "Build Custom Pages",
                description: "Develop Home, About, Services, Blog, and key landing pages.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "auth_4",
                title: "Blog & Content Framework",
                description: "Setup blog structure for content growth.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "auth_5",
                title: "CRM Integration",
                description: "Connect WordPress forms to The HQ CRM.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_6",
                title: "Staging Review",
                description: "Client reviews site for design, copy, and functionality.",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "auth_7",
                title: "Launch & Handoff",
                description: "Go live, configure security/backups, and provide training.",
                responsible_party: "Service Provider",
                status: "pending"
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
                description: "Audit current processes and define key performance indicators.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "ops_2",
                title: "CRM Pipeline Setup",
                description: "Configure sales pipelines, stages, and deal tracks in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_3",
                title: "Automation Workflows",
                description: "Build email/SMS automations, appointment reminders, and reputation management in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_4",
                title: "Tool Configuration",
                description: "Setup calendars, forms, surveys, and affiliate systems in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_5",
                title: "System Testing",
                description: "Verify all workflows trigger correctly and data flows to CRM.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "ops_6",
                title: "Team Training",
                description: "Train client team on using The Operating System.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "ops_7",
                title: "30-Day Optimization",
                description: "Review performance after 30 days and tweak as needed.",
                responsible_party: "Service Provider",
                status: "pending"
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
                description: "Review roadmap, assign milestones, and set 12-week plan.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "build_2",
                title: "Weeks 1-2: Systems",
                description: "Setup automation, CRM, and core operational tools in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_3",
                title: "Weeks 3-4: Web/Funnel",
                description: "Design and build main website or sales funnel in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_4",
                title: "Weeks 5-8: Content & Social",
                description: "Implement content strategy, email sequences, and social planning in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_5",
                title: "Weeks 9-12: Optimization",
                description: "KPI tracking, analytics review, and final system tuning.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "build_6",
                title: "Weekly Progress Calls",
                description: "Ongoing syncs to review progress and blockers.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "build_7",
                title: "Final Handoff",
                description: "Full transfer of assets, documentation, and graduation.",
                responsible_party: "Both",
                status: "pending"
            }
        ]
    }
];