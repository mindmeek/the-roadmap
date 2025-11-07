import { BarChart3, Target, TrendingUp, Zap, Award, Sparkles, Search, DollarSign } from 'lucide-react';

export const dataDrivenMarketingRoadmap = {
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Marketing Analytics Foundation",
            weekDescription: "Set up tracking and establish baseline marketing metrics",
            icon: BarChart3,
            days: [
                {
                    day: 1,
                    title: "Audit Current Marketing Tracking",
                    description: "Review what marketing data you're currently collecting",
                    tasks: [
                        "List all marketing channels and campaigns",
                        "Check what tracking is currently in place",
                        "Identify gaps in data collection",
                        "Review accuracy of existing tracking",
                        "Document current marketing tech stack"
                    ],
                    deliverable: "Marketing tracking audit report",
                    resources: [
                        "Tracking audit checklist",
                        "Marketing tech stack template",
                        "Gap analysis framework"
                    ]
                },
                {
                    day: 2,
                    title: "Define Marketing KPIs & Goals",
                    description: "Establish metrics that matter for your business",
                    tasks: [
                        "Align marketing metrics with business goals",
                        "Define primary KPIs (CAC, LTV, ROI, etc.)",
                        "Set secondary metrics for each channel",
                        "Establish baseline for all metrics",
                        "Set 30-day improvement targets"
                    ],
                    deliverable: "Marketing KPI framework with targets",
                    resources: [
                        "KPI selection guide",
                        "Metrics dictionary",
                        "Goal-setting templates"
                    ]
                },
                {
                    day: 3,
                    title: "Set Up Google Analytics 4",
                    description: "Implement comprehensive website analytics",
                    tasks: [
                        "Install or upgrade to GA4",
                        "Configure key events and conversions",
                        "Set up enhanced measurement",
                        "Create custom dimensions if needed",
                        "Verify tracking is working correctly"
                    ],
                    deliverable: "GA4 properly configured and tracking",
                    resources: [
                        "GA4 setup guide",
                        "Event tracking checklist",
                        "Configuration templates"
                    ]
                },
                {
                    day: 4,
                    title: "Implement Conversion Tracking",
                    description: "Track all important conversions across platforms",
                    tasks: [
                        "Set up conversion tracking on website",
                        "Install Facebook Pixel and LinkedIn Insight Tag",
                        "Configure Google Ads conversion tracking",
                        "Set up email marketing tracking",
                        "Test all conversion tracking"
                    ],
                    deliverable: "All conversion tracking implemented",
                    resources: [
                        "Pixel installation guides",
                        "Conversion tracking checklist",
                        "Testing procedures"
                    ]
                },
                {
                    day: 5,
                    title: "Build Marketing Attribution Model",
                    description: "Understand which touchpoints drive conversions",
                    tasks: [
                        "Choose attribution model (first-touch, last-touch, multi-touch)",
                        "Set up UTM parameter standards",
                        "Create UTM naming conventions",
                        "Train team on UTM usage",
                        "Document attribution methodology"
                    ],
                    deliverable: "Attribution model implemented",
                    resources: [
                        "Attribution model guide",
                        "UTM builder tools",
                        "Naming convention templates"
                    ]
                },
                {
                    day: 6,
                    title: "Create Marketing Dashboard",
                    description: "Build central view of all marketing metrics",
                    tasks: [
                        "Choose dashboard platform (Google Data Studio, Tableau, etc.)",
                        "Connect all data sources",
                        "Design dashboard layout with key metrics",
                        "Set up automated data refresh",
                        "Share dashboard with stakeholders"
                    ],
                    deliverable: "Live marketing dashboard",
                    resources: [
                        "Dashboard templates",
                        "Data visualization best practices",
                        "Platform tutorials"
                    ]
                },
                {
                    day: 7,
                    title: "Week 1 Review & Baseline Documentation",
                    description: "Review setup and establish current state",
                    tasks: [
                        "Verify all tracking is working properly",
                        "Document baseline metrics for all KPIs",
                        "Identify any remaining gaps",
                        "Create Week 2 optimization focus areas",
                        "Present dashboard to team"
                    ],
                    deliverable: "Week 1 summary with baseline metrics"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Data Collection & Analysis",
            weekDescription: "Gather insights and identify optimization opportunities",
            icon: Search,
            days: [
                {
                    day: 8,
                    title: "Analyze Channel Performance",
                    description: "Review which marketing channels drive best results",
                    tasks: [
                        "Pull data for all marketing channels",
                        "Calculate ROI for each channel",
                        "Compare cost per acquisition across channels",
                        "Identify highest-converting channels",
                        "Document channel performance insights"
                    ],
                    deliverable: "Channel performance analysis report",
                    resources: [
                        "ROI calculation templates",
                        "Channel comparison tools",
                        "My Foundation: Marketing Strategy"
                    ]
                },
                {
                    day: 9,
                    title: "Conduct Funnel Analysis",
                    description: "Identify where prospects drop off in conversion process",
                    tasks: [
                        "Map complete conversion funnel",
                        "Calculate conversion rates at each stage",
                        "Identify biggest drop-off points",
                        "Benchmark against industry standards",
                        "Prioritize funnel improvements"
                    ],
                    deliverable: "Funnel analysis with improvement priorities",
                    resources: [
                        "Funnel analysis templates",
                        "Conversion rate benchmarks",
                        "Optimization frameworks"
                    ]
                },
                {
                    day: 10,
                    title: "Analyze Customer Behavior Data",
                    description: "Understand how customers interact with your marketing",
                    tasks: [
                        "Review website user behavior (heat maps, recordings)",
                        "Analyze email engagement patterns",
                        "Study social media engagement data",
                        "Identify content that resonates most",
                        "Document customer behavior insights"
                    ],
                    deliverable: "Customer behavior insights report",
                    resources: [
                        "Behavior analysis tools (Hotjar, etc.)",
                        "Engagement metrics guide",
                        "Insight documentation templates"
                    ]
                },
                {
                    day: 11,
                    title: "Customer Acquisition Cost Analysis",
                    description: "Calculate true cost to acquire customers",
                    tasks: [
                        "Calculate CAC by channel",
                        "Factor in all marketing costs (ads, tools, team)",
                        "Compare CAC to customer lifetime value",
                        "Identify which channels are profitable",
                        "Set CAC targets for each channel"
                    ],
                    deliverable: "Comprehensive CAC analysis",
                    resources: [
                        "CAC calculation templates",
                        "LTV:CAC ratio guide",
                        "Finley AI (Financial Forecaster)"
                    ]
                },
                {
                    day: 12,
                    title: "Competitor Analysis",
                    description: "Benchmark your marketing against competitors",
                    tasks: [
                        "Identify top 5 competitors",
                        "Analyze their marketing channels and tactics",
                        "Review their messaging and positioning",
                        "Identify gaps you can exploit",
                        "Document competitive insights"
                    ],
                    deliverable: "Competitive marketing analysis",
                    resources: [
                        "Competitor analysis tools",
                        "My Foundation: Competitive Analysis",
                        "Benchmarking frameworks"
                    ]
                },
                {
                    day: 13,
                    title: "Content Performance Analysis",
                    description: "Identify which content drives best results",
                    tasks: [
                        "Analyze engagement for all content",
                        "Identify top-performing topics and formats",
                        "Review SEO performance of content",
                        "Determine which content drives conversions",
                        "Create content performance report"
                    ],
                    deliverable: "Content performance insights",
                    resources: [
                        "Content analytics tools",
                        "Performance scoring framework",
                        "Charlie AI (Copywriter)"
                    ]
                },
                {
                    day: 14,
                    title: "Week 2 Insights & Recommendations",
                    description: "Compile findings and create optimization roadmap",
                    tasks: [
                        "Synthesize all analysis from Week 2",
                        "Prioritize optimization opportunities by impact",
                        "Create detailed recommendations for each",
                        "Build Week 3 testing plan",
                        "Present insights to team"
                    ],
                    deliverable: "Marketing optimization roadmap"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Testing & Optimization",
            weekDescription: "Run experiments to improve marketing performance",
            icon: Zap,
            days: [
                {
                    day: 15,
                    title: "Set Up A/B Testing Framework",
                    description: "Establish process for running marketing experiments",
                    tasks: [
                        "Choose A/B testing tools",
                        "Define testing methodology and standards",
                        "Create hypothesis template",
                        "Set minimum sample size requirements",
                        "Document testing process"
                    ],
                    deliverable: "A/B testing framework and tools",
                    resources: [
                        "Testing tools (Google Optimize, VWO, etc.)",
                        "Statistical significance calculators",
                        "Testing best practices guide"
                    ]
                },
                {
                    day: 16,
                    title: "Launch Landing Page Tests",
                    description: "Test variations to improve conversion rates",
                    tasks: [
                        "Identify 3 landing pages to test",
                        "Create hypotheses for improvements",
                        "Design test variations",
                        "Launch A/B tests",
                        "Monitor test progress"
                    ],
                    deliverable: "3 landing page A/B tests running",
                    resources: [
                        "Landing page best practices",
                        "Test variation ideas",
                        "Design templates"
                    ]
                },
                {
                    day: 17,
                    title: "Test Email Marketing Elements",
                    description: "Optimize email campaigns through testing",
                    tasks: [
                        "Test subject lines for open rates",
                        "Test CTAs for click-through rates",
                        "Test send times and frequency",
                        "Test personalization elements",
                        "Compile email testing results"
                    ],
                    deliverable: "Email optimization test results",
                    resources: [
                        "Email testing guide",
                        "Subject line formulas",
                        "CTA best practices"
                    ]
                },
                {
                    day: 18,
                    title: "Optimize Paid Advertising",
                    description: "Test ad variations to improve ROI",
                    tasks: [
                        "Test different ad creatives",
                        "Test audience targeting variations",
                        "Test ad copy and headlines",
                        "Analyze which combinations perform best",
                        "Scale winning ad variations"
                    ],
                    deliverable: "Improved ad campaigns based on tests",
                    resources: [
                        "Ad testing frameworks",
                        "Creative best practices",
                        "Targeting guides"
                    ]
                },
                {
                    day: 19,
                    title: "Optimize Website User Experience",
                    description: "Improve site elements that impact conversion",
                    tasks: [
                        "Simplify navigation based on behavior data",
                        "Optimize page load speed",
                        "Improve mobile experience",
                        "Enhance calls-to-action",
                        "Test checkout or signup flow improvements"
                    ],
                    deliverable: "UX improvements implemented",
                    resources: [
                        "UX optimization checklist",
                        "Speed testing tools",
                        "Mobile optimization guide"
                    ]
                },
                {
                    day: 20,
                    title: "Test Pricing and Offer Strategies",
                    description: "Optimize pricing presentation and offers",
                    tasks: [
                        "Test different price points or packages",
                        "Test various promotional offers",
                        "Test urgency and scarcity tactics",
                        "Analyze impact on conversion and revenue",
                        "Implement winning pricing strategies"
                    ],
                    deliverable: "Optimized pricing and offers",
                    resources: [
                        "Pricing psychology guide",
                        "Offer testing frameworks",
                        "My Foundation: Value Ladder"
                    ]
                },
                {
                    day: 21,
                    title: "Week 3 Testing Results Review",
                    description: "Analyze all test results and implement winners",
                    tasks: [
                        "Compile results from all tests",
                        "Calculate impact of improvements",
                        "Implement winning variations",
                        "Document learnings",
                        "Plan Week 4 scaling strategy"
                    ],
                    deliverable: "Week 3 testing results report"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Scale & Automate Data-Driven Marketing",
            weekDescription: "Systematize insights and scale what works",
            icon: TrendingUp,
            days: [
                {
                    day: 22,
                    title: "Build Marketing Automation Workflows",
                    description: "Automate data-driven marketing processes",
                    tasks: [
                        "Identify repetitive marketing tasks to automate",
                        "Set up lead scoring based on behavior",
                        "Create automated nurture sequences",
                        "Implement dynamic content personalization",
                        "Test and refine automations"
                    ],
                    deliverable: "5+ marketing automation workflows live",
                    resources: [
                        "Marketing automation platforms",
                        "Workflow templates",
                        "Lead scoring frameworks"
                    ]
                },
                {
                    day: 23,
                    title: "Implement Predictive Analytics",
                    description: "Use data to predict and optimize outcomes",
                    tasks: [
                        "Identify patterns in successful conversions",
                        "Build models to predict customer behavior",
                        "Create lookalike audiences based on best customers",
                        "Forecast marketing performance",
                        "Use predictions to guide budget allocation"
                    ],
                    deliverable: "Predictive analytics models operational",
                    resources: [
                        "Predictive analytics tools",
                        "Machine learning platforms",
                        "Forecasting templates"
                    ]
                },
                {
                    day: 24,
                    title: "Scale Winning Campaigns",
                    description: "Invest more in what's proven to work",
                    tasks: [
                        "Identify highest-ROI campaigns",
                        "Increase budget for top performers",
                        "Expand to similar audiences",
                        "Replicate winning strategies across channels",
                        "Monitor performance as you scale"
                    ],
                    deliverable: "Top campaigns scaled profitably",
                    resources: [
                        "Scaling frameworks",
                        "Budget allocation tools",
                        "Performance monitoring"
                    ]
                },
                {
                    day: 25,
                    title: "Create Real-Time Marketing Alerts",
                    description: "Set up notifications for important changes",
                    tasks: [
                        "Configure alerts for significant metric changes",
                        "Set up notifications for conversion anomalies",
                        "Create alerts for campaign performance issues",
                        "Establish alert response protocols",
                        "Test alert system"
                    ],
                    deliverable: "Real-time alert system active",
                    resources: [
                        "Alert configuration guides",
                        "Monitoring tools",
                        "Response protocols"
                    ]
                },
                {
                    day: 26,
                    title: "Build Marketing Performance Reports",
                    description: "Create automated reporting for stakeholders",
                    tasks: [
                        "Design executive marketing report",
                        "Create channel-specific reports",
                        "Set up automated report generation",
                        "Schedule regular report distribution",
                        "Develop insights presentation format"
                    ],
                    deliverable: "Automated marketing reporting system",
                    resources: [
                        "Report templates",
                        "Data visualization tools",
                        "Presentation formats"
                    ]
                },
                {
                    day: 27,
                    title: "Establish Continuous Improvement Process",
                    description: "Create system for ongoing optimization",
                    tasks: [
                        "Schedule weekly data review meetings",
                        "Create testing roadmap for next 90 days",
                        "Assign data analysis responsibilities",
                        "Document decision-making framework",
                        "Build culture of experimentation"
                    ],
                    deliverable: "Continuous improvement system established",
                    resources: [
                        "Meeting agenda templates",
                        "Testing calendars",
                        "Decision frameworks"
                    ]
                },
                {
                    day: 28,
                    title: "30-Day Program Review & ROI Calculation",
                    description: "Measure program impact and plan next phase",
                    tasks: [
                        "Calculate improvement in all KPIs",
                        "Measure ROI of data-driven approach",
                        "Document key insights and learnings",
                        "Create next 90-day data marketing roadmap",
                        "Celebrate wins with team"
                    ],
                    deliverable: "30-day program ROI report and Q2 plan",
                    resources: [
                        "ROI calculation templates",
                        "Success story formats",
                        "Strategic planning tools"
                    ]
                }
            ]
        }
    ]
};