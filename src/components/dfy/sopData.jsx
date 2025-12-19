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
                description: "Client Action: Create your account and access the Business Minds Community platform. If you have any login issues, email team@thebminds.com.",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "comm_2",
                title: "Access 90-Day Roadmap",
                description: "Client Action: Log in to The HQ and navigate to 'My 90-Day Journey' to view your interactive roadmap. This roadmap guides your vision and strategy.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "Journey"
            },
            {
                id: "comm_3",
                title: "Welcome Email & Intro",
                description: "Team Action: We will send you a welcome packet with suggested first actions and community guidelines. Check your email inbox.",
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
                description: "Client Action: Log in to The HQ (app.thebminds.com) and navigate to your Media Library. Upload your high-resolution Logo (PNG/SVG), Brand Colors (Hex codes), Fonts, and Images. Then, upload your written content for the Home, About, and Services pages. Email team@thebminds.com once all assets are uploaded so we can verify them.",
                responsible_party: "Client",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_2",
                title: "Review 90-Day Roadmap",
                description: "Joint Action: We will review your 'My 90-Day Journey' roadmap together to align your website's Unique Value Proposition (UVP) and messaging with your long-term vision.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "Journey"
            },
            {
                id: "found_3",
                title: "Build 5 Pages",
                description: "Team Action: We will design and build your Home, About, Services, Contact, and CTA pages using The HQ Sites builder. We will ensure mobile responsiveness and SEO basics.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_4",
                title: "Integrate Forms & CRM",
                description: "Team Action: We will create lead capture forms (e.g., Contact Us, Newsletter) and connect them to The HQ CRM and Automation workflows to ensure no lead is lost.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "found_5",
                title: "Review Staging Site",
                description: "Client Action: Review the draft website link we provide. Check for design accuracy, spelling, and functionality. Send a consolidated list of edits to team@thebminds.com.",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "found_6",
                title: "Launch Live Site",
                description: "Team Action: Upon approval, we will connect your domain, configure SSL, and publish the website live. We will provide you with a final handoff email.",
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
                description: "Joint Action: Finalize the strategy for your lead magnet (e.g., ebook, webinar, discount). Client must provide the core content/file. Team will advise on the 'hook' and title. Email final content to team@thebminds.com.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "growth_2",
                title: "Build Funnel Pages",
                description: "Team Action: We will build your high-converting Landing Page, Opt-in Form, Thank You Page, and Booking/Sales Page inside The HQ Funnels builder.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_3",
                title: "Setup Email Automation",
                description: "Team Action: We will write and configure a 5-email nurture sequence in The HQ Automation to welcome new leads and drive them to the next step (e.g., booking a call).",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_4",
                title: "CRM & Tagging Setup",
                description: "Team Action: We will configure your HQ CRM pipeline stages and set up automation triggers (tags, alerts) so you are notified instantly when a lead enters the funnel.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "growth_5",
                title: "Test & Review",
                description: "Joint Action: We will run test leads through the entire funnel. Client Action: Verify you received the emails and the notification. Approve the funnel for launch via email to team@thebminds.com.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "growth_6",
                title: "Go Live & Training",
                description: "Team Action: We will publish the funnel and provide a training video on how to manage your new leads in The HQ. We'll also link this to your social media scheduler if applicable.",
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
                description: "Joint Action: Define the site map (up to 10 pages) and content strategy. Client Action: Upload Brand Guide and all page copy to The HQ Media Library. Email team@thebminds.com when ready.",
                responsible_party: "Both",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_2",
                title: "WordPress Environment Setup",
                description: "Team Action: Initialize managed WordPress hosting inside The HQ. We will configure security plugins, SSL, and core settings.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_3",
                title: "Build Custom Pages",
                description: "Team Action: Develop custom Home, About, Services, Blog, and Landing pages. This includes integrating your Brand Kit assets and ensuring a premium design.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "auth_4",
                title: "Blog & Content Framework",
                description: "Team Action: Set up the blog structure (categories, tags, layout) to support your content marketing. We'll publish your first 3 posts (provided by you).",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "auth_5",
                title: "CRM Integration",
                description: "Team Action: Connect all WordPress forms (Contact, Newsletter, Lead Magnets) directly to The HQ CRM to centralize your leads.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "auth_6",
                title: "Staging Review",
                description: "Client Action: Thoroughly review the staging site. Test all links and forms. Send a detailed feedback document to team@thebminds.com.",
                responsible_party: "Client",
                status: "pending"
            },
            {
                id: "auth_7",
                title: "Launch & Handoff",
                description: "Team Action: Go live! We'll handle the DNS changes and final QA. You will receive a guide on how to update your WordPress content.",
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
                description: "Joint Action: We will audit your current sales and operational processes. We'll define the KPIs you need to track in The HQ Dashboard.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "ops_2",
                title: "CRM Pipeline Setup",
                description: "Team Action: Configure custom CRM pipelines (e.g., 'New Leads', 'Discovery Calls', 'Closed Won'). We'll set up deal stages and probabilities.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_3",
                title: "Automation Workflows",
                description: "Team Action: Build comprehensive automations: Appointment Reminders (Email/SMS), Missed Call Text Back, and Review Requests in The HQ.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_4",
                title: "Tool Configuration",
                description: "Team Action: Set up your Calendars, Surveys, Affiliate Manager, and Phone Numbers (SMS/Voice) within The HQ. We'll also integrate your Payment Gateways.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "ops_5",
                title: "System Testing",
                description: "Team Action: We will simulate customer journeys to verify that data flows correctly from Forms -> CRM -> Automation -> Reporting.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "ops_6",
                title: "Team Training",
                description: "Team Action: We will conduct a live training session (recorded) for your team on how to use 'The Operating System' daily. Email questions to team@thebminds.com.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "ops_7",
                title: "30-Day Optimization",
                description: "Team Action: 30 days after launch, we will review your analytics and tweak workflows to improve conversion rates and efficiency.",
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
                description: "Joint Action: We will have a kickoff call to review your 90-Day Roadmap, assign specific milestones, and set the 12-week execution calendar. Email team@thebminds.com to schedule.",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "build_2",
                title: "Weeks 1-2: Systems",
                description: "Team Action: We will set up your 'Operating System'—CRM, Calendars, Automation, and Phone Systems in The HQ. Client: Provide access to domain and payments.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_3",
                title: "Weeks 3-4: Web/Funnel",
                description: "Team Action: We will design and build your core Website or Sales Funnel in The HQ. Client: Review designs and provide feedback via email.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_4",
                title: "Weeks 5-8: Content & Social",
                description: "Team Action: We will set up your Social Planner and Email Marketing templates. We'll help you load your first month of content into The HQ Scheduler.",
                responsible_party: "Service Provider",
                status: "pending",
                tool_link: "https://app.thebminds.com"
            },
            {
                id: "build_5",
                title: "Weeks 9-12: Optimization",
                description: "Team Action: We launch your campaigns and monitor KPIs. We'll tweak the funnels and automations based on real-time data.",
                responsible_party: "Service Provider",
                status: "pending"
            },
            {
                id: "build_6",
                title: "Weekly Progress Calls",
                description: "Joint Action: We will have a weekly sync to review progress, remove blockers, and keep the project on track. (Recurring meeting).",
                responsible_party: "Both",
                status: "pending"
            },
            {
                id: "build_7",
                title: "Final Handoff",
                description: "Joint Action: Graduation! We'll hand over all assets, ensure you are comfortable running the systems, and discuss your next growth phase.",
                responsible_party: "Both",
                status: "pending"
            }
        ]
    }
];