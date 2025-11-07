import { Building, Layers, DollarSign, Users, Sparkles, Target, Zap, TrendingUp, Handshake, Globe, PackagePlus, Briefcase } from 'lucide-react';

export const onePageBusinessPlanRoadmap = {
    courseTitle: "Build Your One Page Business Plan: The Business Model Canvas",
    courseDescription: "A practical guide to mapping out your entire business model on a single page using the Business Model Canvas. Define your value, customers, resources, and revenue streams in a structured way.",
    totalWeeks: 3,
    category: "Business Strategy",
    difficulty: "Beginner",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Core Value & Customers",
            weekDescription: "Focus on the heart of your business: what value you deliver and to whom.",
            icon: Target,
            days: [
                {
                    day: 1,
                    title: "Understand the Business Model Canvas (BMC)",
                    description: "Get familiar with the 9 building blocks of the Business Model Canvas.",
                    tasks: [
                        "Research and watch introductory videos on the Business Model Canvas",
                        "Download or print a blank Business Model Canvas template",
                        "Read through all 9 sections to understand how they interconnect",
                        "Review 2-3 examples of completed Business Model Canvases from different industries"
                    ],
                    deliverable: "Understanding of the BMC framework and its 9 building blocks",
                    resources: ["BMC Template Download", "Video: BMC Explained", "Example Business Models"]
                },
                {
                    day: 2,
                    title: "Value Propositions: What Problem Do You Solve?",
                    description: "Define the specific value you offer to customers and what pain points you alleviate.",
                    tasks: [
                        "List your product/service's top 5 features",
                        "For each feature, identify the benefit it provides to customers",
                        "Brainstorm the 'jobs-to-be-done' your product helps customers complete",
                        "List 3-5 customer pains your solution addresses",
                        "List 3-5 gains customers experience by using your solution",
                        "Draft your unique value proposition in one clear sentence"
                    ],
                    deliverable: "Completed Value Proposition section with clear benefits and pain relievers",
                    resources: ["Value Proposition Canvas Worksheet", "Pain Points Checklist"]
                },
                {
                    day: 3,
                    title: "Customer Segments: Who Are You Helping?",
                    description: "Clearly identify your ideal customer groups.",
                    tasks: [
                        "Brainstorm all possible customer types who could benefit from your offer",
                        "Narrow down to your top 1-3 primary customer segments",
                        "Create a basic persona for each segment (age, income, location, behavior)",
                        "Identify who your 'early adopters' are likely to be",
                        "Research the estimated size of each market segment"
                    ],
                    deliverable: "1-3 clearly defined customer segments with basic personas",
                    resources: ["Customer Persona Template", "Market Sizing Guide"]
                },
                {
                    day: 4,
                    title: "Channels: How Do You Reach Them?",
                    description: "Determine how your value propositions reach your customer segments.",
                    tasks: [
                        "List all possible channels to reach customers (online ads, social media, email, retail, etc.)",
                        "For each customer segment, identify the best 2-3 channels",
                        "Map out the customer journey from awareness to purchase for each channel",
                        "Consider both owned channels (website, email list) and partner channels (retailers, affiliates)",
                        "Prioritize your top 3-5 channels to focus on initially"
                    ],
                    deliverable: "Channel strategy mapped to customer segments",
                    resources: ["Channels Brainstorming Worksheet", "Customer Journey Template"]
                },
                {
                    day: 5,
                    title: "Customer Relationships: How Do You Interact?",
                    description: "Define how you acquire, retain, and grow customer relationships.",
                    tasks: [
                        "Determine your customer acquisition strategy (ads, referrals, content marketing, etc.)",
                        "Plan your onboarding process for new customers",
                        "Define your customer retention tactics (email, loyalty programs, customer service)",
                        "Identify upsell and cross-sell opportunities",
                        "Decide on the level of personal vs. automated interaction"
                    ],
                    deliverable: "Customer relationship strategy covering acquisition, retention, and growth",
                    resources: ["Relationship Strategy Template", "Customer Lifecycle Map"]
                },
                {
                    day: 6,
                    title: "Week 1 Review: The Front of the Canvas",
                    description: "Review and refine the customer-facing side of your business model.",
                    tasks: [
                        "Review all sections completed: Value Propositions, Customer Segments, Channels, Customer Relationships",
                        "Ensure consistency across all four sections",
                        "Get feedback from 2-3 trusted advisors or potential customers",
                        "Make adjustments based on feedback",
                        "Create a visual draft of these four sections on your canvas"
                    ],
                    deliverable: "Polished, coherent customer-facing business model sections",
                    resources: ["Feedback Form Template", "Canvas Review Checklist"]
                },
                {
                    day: 7,
                    title: "Rest Day: Reflect on Your Value Creation",
                    description: "Take a break and let your ideas settle. Reflect on what makes your business unique.",
                    tasks: [
                        "Review your work from the week casually",
                        "Journal about what excites you most about your business model",
                        "Share your draft canvas with a friend or mentor",
                        "Think about any 'aha moments' you've had"
                    ],
                    deliverable: "Mental clarity and renewed focus for Week 2",
                    resources: []
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Resources & Operations",
            weekDescription: "Identify what you need to deliver your value proposition: resources, activities, and partnerships.",
            icon: Briefcase,
            days: [
                {
                    day: 8,
                    title: "Key Resources: What Do You Need?",
                    description: "List the most important assets required to make your business work.",
                    tasks: [
                        "Identify physical resources (equipment, inventory, facilities)",
                        "Identify intellectual resources (patents, data, brand, proprietary knowledge)",
                        "Identify human resources (key team members, skills, expertise)",
                        "Identify financial resources (capital, credit lines, investments)",
                        "Prioritize which resources are absolutely critical vs. nice-to-have"
                    ],
                    deliverable: "Complete inventory of key resources needed",
                    resources: ["Key Resources Checklist", "Resource Planning Worksheet"]
                },
                {
                    day: 9,
                    title: "Key Activities: What Do You Do?",
                    description: "Define the most important actions your business must take to succeed.",
                    tasks: [
                        "List activities related to production/service delivery",
                        "List activities related to problem-solving and innovation",
                        "List activities related to platform/network management (if applicable)",
                        "For each activity, identify who performs it and how often",
                        "Prioritize the top 5-7 activities that directly create value"
                    ],
                    deliverable: "List of prioritized key activities",
                    resources: ["Activities Mapping Template", "Process Flow Guide"]
                },
                {
                    day: 10,
                    title: "Key Partners: Who Helps You?",
                    description: "Identify strategic partnerships and supplier relationships.",
                    tasks: [
                        "List potential strategic partners (alliances, joint ventures)",
                        "Identify key suppliers and vendors",
                        "Brainstorm partnership opportunities that could reduce risk or costs",
                        "Consider partnerships for acquiring resources or performing activities",
                        "Evaluate the importance of each partnership (critical vs. optional)",
                        "Reach out to 2-3 potential partners for exploratory conversations"
                    ],
                    deliverable: "Partnership strategy with priority contacts",
                    resources: ["Partner Evaluation Matrix", "Partnership Outreach Template"]
                },
                {
                    day: 11,
                    title: "Connect Resources, Activities, and Partners",
                    description: "Ensure your operations side is aligned and efficient.",
                    tasks: [
                        "Map how key resources enable key activities",
                        "Identify which key activities can be performed by partners",
                        "Look for inefficiencies or gaps in your operational model",
                        "Determine if you're building, buying, or partnering for each critical need",
                        "Draft a simple operations flowchart showing how everything connects"
                    ],
                    deliverable: "Operational model showing interconnections between resources, activities, and partners",
                    resources: ["Operations Flowchart Template", "Make vs. Buy Decision Guide"]
                },
                {
                    day: 12,
                    title: "Validate Your Operations",
                    description: "Stress-test your operational model with real-world scenarios.",
                    tasks: [
                        "Walk through a typical customer order from start to finish",
                        "Identify potential bottlenecks or failure points",
                        "Estimate time and cost for key activities",
                        "Determine what happens if a key partner or resource becomes unavailable",
                        "Create a contingency plan for your top 2-3 operational risks"
                    ],
                    deliverable: "Validated operational model with contingency plans",
                    resources: ["Operations Stress Test Worksheet", "Risk Mitigation Checklist"]
                },
                {
                    day: 13,
                    title: "Week 2 Review: The Operations Side",
                    description: "Review and refine your resources, activities, and partnerships.",
                    tasks: [
                        "Review all operational sections completed this week",
                        "Ensure they align with your value propositions and customer segments",
                        "Look for opportunities to optimize or simplify",
                        "Get feedback from someone with operational experience",
                        "Add these three sections to your visual Business Model Canvas"
                    ],
                    deliverable: "Completed operations side of your Business Model Canvas",
                    resources: ["Operations Review Checklist"]
                },
                {
                    day: 14,
                    title: "Rest Day: Strategic Thinking",
                    description: "Reflect on how your operations support your value creation.",
                    tasks: [
                        "Think about whether your operations give you a competitive advantage",
                        "Consider if there are any ways to make your operations more sustainable or scalable",
                        "Reflect on your partnerships - are there any critical ones you haven't secured yet?",
                        "Prepare mentally for completing the financial side next week"
                    ],
                    deliverable: "Strategic insights and mental preparation",
                    resources: []
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Financial Viability",
            weekDescription: "Complete your business model by defining your revenue streams and cost structure.",
            icon: DollarSign,
            days: [
                {
                    day: 15,
                    title: "Revenue Streams: How Do You Make Money?",
                    description: "Identify all the ways your business generates revenue.",
                    tasks: [
                        "List all potential revenue streams (product sales, subscriptions, licensing, advertising, etc.)",
                        "For each stream, determine the pricing model (fixed, dynamic, freemium, etc.)",
                        "Estimate the revenue potential of each stream",
                        "Identify which streams are one-time vs. recurring",
                        "Prioritize your top 2-3 revenue streams to focus on initially",
                        "Research what competitors charge for similar offerings"
                    ],
                    deliverable: "Complete revenue model with pricing strategy",
                    resources: ["Revenue Streams Worksheet", "Pricing Strategy Guide", "Competitor Pricing Research"]
                },
                {
                    day: 16,
                    title: "Cost Structure: What Does It Cost to Operate?",
                    description: "Calculate all the costs required to run your business model.",
                    tasks: [
                        "List all fixed costs (rent, salaries, insurance, software subscriptions)",
                        "List all variable costs (materials, shipping, commissions, transaction fees)",
                        "Categorize costs by key activity and key resource",
                        "Identify which costs are driven by economies of scale vs. economies of scope",
                        "Calculate your estimated monthly operating costs",
                        "Determine which costs are critical vs. deferrable"
                    ],
                    deliverable: "Complete cost structure with monthly budget",
                    resources: ["Cost Structure Template", "Monthly Budget Calculator"]
                },
                {
                    day: 17,
                    title: "Calculate Your Break-Even Point",
                    description: "Determine when your business becomes profitable.",
                    tasks: [
                        "Calculate your break-even point (total costs / average revenue per customer)",
                        "Estimate how many customers/sales you need per month to break even",
                        "Project when you expect to reach break-even based on your growth assumptions",
                        "Identify ways to reduce your break-even point (lower costs, increase prices, improve efficiency)",
                        "Create a simple 12-month financial projection"
                    ],
                    deliverable: "Break-even analysis and 12-month financial projection",
                    resources: ["Break-Even Calculator", "Financial Projection Template"]
                },
                {
                    day: 18,
                    title: "Assess Financial Viability",
                    description: "Determine if your business model is financially sustainable.",
                    tasks: [
                        "Compare your projected revenue to your projected costs for the first year",
                        "Calculate your gross margin and net profit margin",
                        "Identify the biggest financial risks (high costs, low revenue, long sales cycle)",
                        "Determine how much startup capital you need",
                        "Create a plan to secure funding if needed (bootstrapping, loans, investors)",
                        "Adjust your business model if the numbers don't work"
                    ],
                    deliverable: "Financial viability assessment with funding plan",
                    resources: ["Financial Health Checklist", "Funding Options Guide"]
                },
                {
                    day: 19,
                    title: "Complete Your Business Model Canvas",
                    description: "Finalize all 9 sections and create a polished, cohesive canvas.",
                    tasks: [
                        "Add revenue streams and cost structure to your visual canvas",
                        "Review the entire canvas for consistency and alignment",
                        "Ensure each section logically supports the others",
                        "Make any final adjustments based on your overall view",
                        "Create a clean, professional version (digital or printed)",
                        "Add notes explaining your key assumptions"
                    ],
                    deliverable: "Complete, polished Business Model Canvas",
                    resources: ["Final Canvas Template", "Canvas Presentation Guide"]
                },
                {
                    day: 20,
                    title: "Test Your Assumptions",
                    description: "Validate your business model with real-world feedback.",
                    tasks: [
                        "Present your Business Model Canvas to 3-5 trusted advisors or potential customers",
                        "Ask specific questions about each section (Is this value proposition compelling? Are these the right channels?)",
                        "Document all feedback and questions raised",
                        "Identify your riskiest assumptions that need validation",
                        "Create a plan to test your top 3 riskiest assumptions in the next 30 days"
                    ],
                    deliverable: "Feedback report with validation plan",
                    resources: ["Feedback Collection Template", "Assumption Testing Guide"]
                },
                {
                    day: 21,
                    title: "Finalize and Implement Your Business Model",
                    description: "Turn your canvas into an action plan.",
                    tasks: [
                        "Make final revisions to your Business Model Canvas based on feedback",
                        "Create a 90-day action plan with specific milestones for implementing your model",
                        "Identify the first 5 actions you need to take to launch or improve your business",
                        "Set up a system to review and update your canvas quarterly",
                        "Celebrate completing your One Page Business Plan!",
                        "Share your canvas with your team or partners"
                    ],
                    deliverable: "Finalized Business Model Canvas with 90-day implementation plan",
                    resources: ["90-Day Action Plan Template", "Quarterly Review Checklist", "Canvas Sharing Tips"]
                }
            ]
        }
    ]
};