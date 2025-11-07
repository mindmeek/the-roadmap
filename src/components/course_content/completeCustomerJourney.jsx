import { Users, Map, Target, Lightbulb, TrendingUp, Heart, MessageSquare, Award, ShoppingCart, RefreshCw, Star, Zap } from 'lucide-react';

export const completeCustomerJourneyRoadmap = {
    courseTitle: "The Complete Customer Journey: From Stranger to Advocate",
    courseDescription: "Master the art of guiding customers through every stage of their journey with your brand. Learn to map, optimize, and enhance each touchpoint to create loyal, raving fans who refer others to your business.",
    totalWeeks: 4,
    category: "Customer Experience",
    difficulty: "Intermediate",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Understanding the Customer Journey",
            weekDescription: "Build a foundation by understanding the stages customers go through and why journey mapping matters.",
            icon: Map,
            days: [
                {
                    day: 1,
                    title: "Introduction to Customer Journey Mapping",
                    description: "Learn what a customer journey is and why it's critical for business success.",
                    tasks: [
                        "Watch introductory videos on customer journey mapping",
                        "Read case studies of successful customer journey transformations",
                        "Understand the difference between customer journey and sales funnel",
                        "Identify why mapping the journey improves customer experience and revenue",
                        "List 3 businesses (competitors or others) whose customer experience you admire"
                    ],
                    deliverable: "Understanding of customer journey fundamentals and real-world examples",
                    resources: ["Customer Journey 101 Video", "Case Study Library", "Journey vs. Funnel Guide"]
                },
                {
                    day: 2,
                    title: "The 5 Stages of the Customer Journey",
                    description: "Deep dive into awareness, consideration, purchase, retention, and advocacy stages.",
                    tasks: [
                        "Study each of the 5 stages in detail: Awareness, Consideration, Purchase, Retention, Advocacy",
                        "For each stage, identify customer goals, emotions, and pain points",
                        "Understand what success looks like at each stage",
                        "Review examples of how different businesses approach each stage",
                        "Create a simple diagram showing the 5 stages"
                    ],
                    deliverable: "Comprehensive understanding of the 5 customer journey stages",
                    resources: ["5 Stages Deep Dive Guide", "Stage Examples Library", "Journey Diagram Template"]
                },
                {
                    day: 3,
                    title: "Define Your Customer Personas",
                    description: "Create detailed personas for the customers who will go through your journey.",
                    tasks: [
                        "Review your ideal customer profiles from previous strategy work",
                        "Create 1-3 detailed customer personas with demographics, psychographics, goals, and challenges",
                        "For each persona, identify their primary motivations and fears",
                        "Research where each persona spends time online and offline",
                        "Validate your personas by interviewing 2-3 real customers or prospects"
                    ],
                    deliverable: "1-3 detailed customer personas validated by real feedback",
                    resources: ["Persona Creation Template", "Interview Question Guide", "Persona Validation Checklist"]
                },
                {
                    day: 4,
                    title: "Map Current Touchpoints",
                    description: "Identify every interaction a customer has with your brand today.",
                    tasks: [
                        "Brainstorm all current touchpoints (website, social media, email, ads, in-store, customer service, etc.)",
                        "Organize touchpoints by customer journey stage",
                        "Rate each touchpoint on effectiveness (1-10 scale)",
                        "Identify gaps where customers might get lost or frustrated",
                        "Create a visual map of your current touchpoints"
                    ],
                    deliverable: "Complete touchpoint inventory mapped to journey stages",
                    resources: ["Touchpoint Brainstorming Worksheet", "Visual Mapping Tool", "Effectiveness Rating Guide"]
                },
                {
                    day: 5,
                    title: "Identify Customer Emotions at Each Stage",
                    description: "Understand the emotional journey customers experience.",
                    tasks: [
                        "For each journey stage, identify common customer emotions (excitement, confusion, frustration, delight, etc.)",
                        "Map these emotions on a simple emotional journey curve (high to low)",
                        "Identify pain points where emotions dip",
                        "Identify moments of delight where emotions peak",
                        "Interview or survey 5-10 customers about their emotional experience with your brand"
                    ],
                    deliverable: "Emotional journey map with identified pain points and moments of delight",
                    resources: ["Emotional Journey Template", "Customer Survey Questions", "Empathy Mapping Guide"]
                },
                {
                    day: 6,
                    title: "Create Your First Journey Map",
                    description: "Combine everything into a visual customer journey map.",
                    tasks: [
                        "Choose one primary customer persona to focus on",
                        "Create a journey map showing: stages, touchpoints, emotions, pain points, and opportunities",
                        "Use a template or tool to make it visual and easy to understand",
                        "Get feedback from team members or customers on accuracy",
                        "Make initial revisions based on feedback"
                    ],
                    deliverable: "Complete customer journey map for your primary persona",
                    resources: ["Journey Map Template", "Visual Design Tools", "Feedback Form"]
                },
                {
                    day: 7,
                    title: "Week 1 Review and Reflection",
                    description: "Consolidate your learning and prepare for optimization.",
                    tasks: [
                        "Review your journey map and look for inconsistencies",
                        "Share your journey map with at least 2 trusted advisors for feedback",
                        "Reflect on the biggest 'aha moments' from this week",
                        "List the top 3 areas where your customer journey needs the most improvement",
                        "Prepare questions or areas you want to explore more deeply next week"
                    ],
                    deliverable: "Refined journey map with top 3 improvement opportunities identified",
                    resources: ["Weekly Review Checklist", "Improvement Prioritization Matrix"]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Optimizing the Awareness & Consideration Stages",
            weekDescription: "Focus on attracting the right customers and helping them evaluate your solution.",
            icon: Lightbulb,
            days: [
                {
                    day: 8,
                    title: "Awareness Stage: Getting Found",
                    description: "Optimize how potential customers discover your brand.",
                    tasks: [
                        "Identify the top 3 channels where your ideal customers look for solutions",
                        "Audit your current presence on those channels (SEO, social media, ads, partnerships)",
                        "Create a content plan to increase visibility (blog posts, videos, podcasts, etc.)",
                        "Set up or optimize Google My Business, social profiles, and directories",
                        "Plan 2-3 'awareness campaigns' to test over the next 30 days"
                    ],
                    deliverable: "Awareness strategy with content plan and campaign outlines",
                    resources: ["Awareness Channel Guide", "Content Calendar Template", "SEO Basics Checklist"]
                },
                {
                    day: 9,
                    title: "First Impressions Matter",
                    description: "Ensure your brand makes a strong, positive first impression.",
                    tasks: [
                        "Review your website homepage with fresh eyes - does it clearly communicate your value?",
                        "Check your social media bios and profile images for consistency",
                        "Audit your brand messaging for clarity and appeal",
                        "Test your website loading speed and mobile responsiveness",
                        "Get feedback from 3-5 people who've never seen your brand before"
                    ],
                    deliverable: "First impression audit with improvement action items",
                    resources: ["Homepage Checklist", "Brand Messaging Guide", "Website Speed Test Tool"]
                },
                {
                    day: 10,
                    title: "Consideration Stage: Building Trust",
                    description: "Help customers evaluate whether you're the right solution for them.",
                    tasks: [
                        "Create comparison content (how you're different from competitors)",
                        "Develop trust signals (testimonials, case studies, certifications, guarantees)",
                        "Plan educational content that addresses common objections or questions",
                        "Optimize your product/service pages with benefits, features, and social proof",
                        "Set up retargeting campaigns for visitors who don't convert immediately"
                    ],
                    deliverable: "Consideration stage content and trust-building assets",
                    resources: ["Comparison Content Template", "Testimonial Collection Guide", "Objection Handling Worksheet"]
                },
                {
                    day: 11,
                    title: "Create Lead Magnets",
                    description: "Capture contact information by offering valuable resources.",
                    tasks: [
                        "Brainstorm 3-5 lead magnet ideas (guides, checklists, templates, webinars, free trials)",
                        "Choose the most compelling offer for your target audience",
                        "Create your lead magnet (or outline it if it's complex)",
                        "Design a landing page for your lead magnet with a clear value proposition",
                        "Set up an email sequence to nurture leads who download it"
                    ],
                    deliverable: "Lead magnet with landing page and nurture sequence",
                    resources: ["Lead Magnet Ideas List", "Landing Page Template", "Email Sequence Examples"]
                },
                {
                    day: 12,
                    title: "Optimize Your Sales Process",
                    description: "Make it easy for prospects to learn more and connect with you.",
                    tasks: [
                        "Map out your current sales process step-by-step",
                        "Identify friction points (complicated forms, too many steps, lack of information)",
                        "Streamline the process - remove unnecessary steps",
                        "Add clear next steps and calls-to-action at every stage",
                        "Consider adding live chat, booking calendar, or instant demos to reduce barriers"
                    ],
                    deliverable: "Optimized sales process with reduced friction",
                    resources: ["Sales Process Mapping Template", "Friction Audit Checklist", "CTA Best Practices"]
                },
                {
                    day: 13,
                    title: "Educate Don't Just Sell",
                    description: "Build authority by educating your prospects.",
                    tasks: [
                        "Create a list of the top 10 questions prospects ask before buying",
                        "Develop educational content addressing each question (blog posts, videos, FAQs)",
                        "Share industry insights, trends, or tips that position you as an expert",
                        "Host a webinar, workshop, or Q&A session for prospects",
                        "Build an email nurture campaign that educates over 5-7 touches"
                    ],
                    deliverable: "Educational content library and nurture campaign",
                    resources: ["FAQ Development Guide", "Webinar Planning Template", "Nurture Email Examples"]
                },
                {
                    day: 14,
                    title: "Week 2 Review: Awareness & Consideration",
                    description: "Assess your improvements and plan next steps.",
                    tasks: [
                        "Review all changes made to awareness and consideration stages",
                        "Test the customer experience yourself - go through your own funnel",
                        "Measure baseline metrics (traffic, leads, conversion rates)",
                        "Get feedback from customers on the new experience",
                        "Document what's working and what still needs improvement"
                    ],
                    deliverable: "Performance baseline and improvement plan",
                    resources: ["Metrics Tracking Dashboard", "Customer Feedback Form"]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Perfecting the Purchase & Retention Stages",
            weekDescription: "Make buying easy and keep customers coming back for more.",
            icon: ShoppingCart,
            days: [
                {
                    day: 15,
                    title: "Purchase Stage: Remove All Friction",
                    description: "Optimize the buying process to maximize conversions.",
                    tasks: [
                        "Audit your checkout or sales process for friction points",
                        "Simplify forms - only ask for essential information",
                        "Offer multiple payment options",
                        "Add trust signals at checkout (security badges, guarantees, testimonials)",
                        "Test the entire purchase process on mobile and desktop",
                        "Set up cart abandonment emails for e-commerce"
                    ],
                    deliverable: "Optimized, frictionless purchase experience",
                    resources: ["Checkout Optimization Checklist", "Cart Abandonment Email Template"]
                },
                {
                    day: 16,
                    title: "Onboarding: The First 48 Hours",
                    description: "Create a memorable onboarding experience for new customers.",
                    tasks: [
                        "Map out the first 48 hours after purchase from the customer's perspective",
                        "Create a welcome email sequence (immediate confirmation, next steps, resources)",
                        "Provide clear instructions on how to get started or use your product/service",
                        "Reach out personally (if possible) to welcome the customer",
                        "Set expectations for what happens next and when",
                        "Include quick wins or early value moments"
                    ],
                    deliverable: "Complete onboarding experience for the first 48 hours",
                    resources: ["Onboarding Email Templates", "Welcome Sequence Best Practices"]
                },
                {
                    day: 17,
                    title: "Retention Stage: Keep Them Engaged",
                    description: "Build strategies to keep customers active and satisfied.",
                    tasks: [
                        "Identify why customers typically leave or stop using your product/service",
                        "Create a retention strategy addressing those reasons",
                        "Develop ongoing communication (newsletters, tips, updates, exclusive content)",
                        "Build a loyalty or rewards program if applicable",
                        "Set up automated check-ins at key milestones (30 days, 90 days, 6 months)",
                        "Monitor usage or engagement metrics to identify at-risk customers"
                    ],
                    deliverable: "Retention strategy with engagement plan",
                    resources: ["Retention Playbook", "Loyalty Program Examples", "Churn Prediction Guide"]
                },
                {
                    day: 18,
                    title: "Provide Outstanding Customer Support",
                    description: "Turn support interactions into retention opportunities.",
                    tasks: [
                        "Audit your current customer support channels and response times",
                        "Create or update your help center, FAQs, and knowledge base",
                        "Train your team on empathetic, solution-focused communication",
                        "Set up systems for tracking and resolving customer issues quickly",
                        "Follow up after support interactions to ensure satisfaction",
                        "Turn common support questions into proactive content"
                    ],
                    deliverable: "Enhanced customer support system and resources",
                    resources: ["Support Response Templates", "Help Center Setup Guide", "Customer Service Best Practices"]
                },
                {
                    day: 19,
                    title: "Create Moments of Delight",
                    description: "Go beyond expectations to surprise and delight customers.",
                    tasks: [
                        "Brainstorm unexpected ways to delight customers (handwritten notes, surprise upgrades, birthday messages)",
                        "Identify key moments where a 'wow factor' would have the biggest impact",
                        "Plan 2-3 delightful experiences you can implement immediately",
                        "Personalize communication whenever possible",
                        "Share customer success stories and celebrate their wins",
                        "Send unexpected value (bonus content, early access, exclusive offers)"
                    ],
                    deliverable: "Delight moments plan with 2-3 implemented examples",
                    resources: ["Delight Ideas Brainstorming List", "Personalization Guide", "Customer Celebration Templates"]
                },
                {
                    day: 20,
                    title: "Upsell and Cross-Sell Thoughtfully",
                    description: "Offer additional value without being pushy.",
                    tasks: [
                        "Map your product/service ecosystem - what are natural next steps for customers?",
                        "Identify upsell and cross-sell opportunities based on customer behavior",
                        "Create offers that genuinely help customers achieve better results",
                        "Time your offers appropriately (after they've experienced initial value)",
                        "Use educational content to introduce advanced features or complementary products",
                        "Make offers easy to accept with one-click upgrades or bundle discounts"
                    ],
                    deliverable: "Upsell/cross-sell strategy aligned with customer success",
                    resources: ["Product Ladder Template", "Upsell Timing Guide", "Offer Creation Worksheet"]
                },
                {
                    day: 21,
                    title: "Week 3 Review: Purchase & Retention",
                    description: "Evaluate your purchase and retention improvements.",
                    tasks: [
                        "Test the purchase and onboarding experience as if you're a new customer",
                        "Review retention metrics (repeat purchase rate, engagement, churn)",
                        "Collect feedback from recent customers on their experience",
                        "Identify what's working well and what needs more attention",
                        "Document your retention wins and share with your team"
                    ],
                    deliverable: "Purchase and retention performance review",
                    resources: ["Experience Testing Checklist", "Retention Metrics Dashboard"]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Turning Customers Into Advocates",
            weekDescription: "Create raving fans who refer others and spread the word about your business.",
            icon: Award,
            days: [
                {
                    day: 22,
                    title: "Advocacy Stage: The Ultimate Goal",
                    description: "Understand what turns customers into enthusiastic promoters.",
                    tasks: [
                        "Study your happiest customers - what do they have in common?",
                        "Identify what motivates people to refer others (satisfaction, incentives, social proof)",
                        "Research successful referral programs in your industry",
                        "Understand the psychology of word-of-mouth marketing",
                        "Set a goal for how many customer advocates you want to create this quarter"
                    ],
                    deliverable: "Understanding of advocacy drivers and quarterly goal",
                    resources: ["Advocacy Psychology Guide", "Referral Program Case Studies"]
                },
                {
                    day: 23,
                    title: "Build a Referral Program",
                    description: "Create a system that rewards customers for spreading the word.",
                    tasks: [
                        "Design your referral incentive structure (discounts, cash, free months, etc.)",
                        "Make it easy to refer - provide shareable links, templates, and graphics",
                        "Create a dedicated referral program landing page",
                        "Set up tracking for referral sources and conversions",
                        "Promote your referral program to existing customers",
                        "Test the referral flow from start to finish"
                    ],
                    deliverable: "Live referral program with tracking",
                    resources: ["Referral Program Template", "Incentive Structure Examples", "Referral Tracking Setup"]
                },
                {
                    day: 24,
                    title: "Ask for Testimonials and Reviews",
                    description: "Collect social proof from satisfied customers.",
                    tasks: [
                        "Identify your 10-20 happiest customers",
                        "Reach out with a personalized request for a testimonial or review",
                        "Make it easy - provide questions or a simple form",
                        "Ask for permission to use their feedback in marketing",
                        "Collect video testimonials from willing customers",
                        "Display testimonials prominently on your website and marketing materials"
                    ],
                    deliverable: "10+ testimonials collected and displayed",
                    resources: ["Testimonial Request Templates", "Review Generation Guide", "Video Testimonial Tips"]
                },
                {
                    day: 25,
                    title: "Create a Customer Community",
                    description: "Build a space where customers can connect with each other and your brand.",
                    tasks: [
                        "Choose a platform for your community (Facebook Group, Slack, Discord, forum)",
                        "Define the purpose and rules of your community",
                        "Invite your best customers to join",
                        "Seed the community with valuable content and discussions",
                        "Actively engage and moderate to keep the community healthy",
                        "Recognize and reward active community members"
                    ],
                    deliverable: "Launched customer community with initial members",
                    resources: ["Community Platform Comparison", "Community Guidelines Template", "Engagement Strategies"]
                },
                {
                    day: 26,
                    title: "Leverage User-Generated Content",
                    description: "Turn customer content into powerful marketing assets.",
                    tasks: [
                        "Encourage customers to share their experiences on social media",
                        "Create a branded hashtag for customer posts",
                        "Feature customer stories on your website and social channels",
                        "Run a contest or campaign encouraging user-generated content",
                        "Always ask permission and give credit when sharing customer content",
                        "Build a library of customer success stories and case studies"
                    ],
                    deliverable: "User-generated content strategy and initial content library",
                    resources: ["UGC Campaign Ideas", "Content Permission Template", "Case Study Interview Guide"]
                },
                {
                    day: 27,
                    title: "Create a VIP or Ambassador Program",
                    description: "Reward your most loyal customers with exclusive benefits.",
                    tasks: [
                        "Identify criteria for VIP or ambassador status",
                        "Design exclusive perks (early access, special discounts, insider updates, recognition)",
                        "Invite your top customers to join the program",
                        "Give ambassadors tools and content to share about your brand",
                        "Host exclusive events or experiences for VIPs",
                        "Recognize ambassadors publicly and privately"
                    ],
                    deliverable: "VIP/Ambassador program launched with first members",
                    resources: ["Ambassador Program Template", "VIP Perks Ideas", "Ambassador Toolkit"]
                },
                {
                    day: 28,
                    title: "Complete Your Customer Journey Map",
                    description: "Finalize your comprehensive journey map with all optimizations.",
                    tasks: [
                        "Update your journey map to reflect all the changes you've made over 4 weeks",
                        "Ensure all 5 stages are fully optimized",
                        "Document your key metrics and success measures for each stage",
                        "Create a plan to continually monitor and improve the journey",
                        "Share your completed journey map with your team",
                        "Celebrate your accomplishment and the improved customer experience you've built!"
                    ],
                    deliverable: "Complete, optimized customer journey map with ongoing improvement plan",
                    resources: ["Final Journey Map Template", "Metrics Dashboard", "Continuous Improvement Guide"]
                }
            ]
        }
    ]
};