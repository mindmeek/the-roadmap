import { Heart, Users, Mail, Gift, Star, MessageCircle, Calendar, Award, TrendingUp, Phone, Smile, Target } from 'lucide-react';

export const nurtureRelationshipsRoadmap = {
    courseTitle: "Nurture Relationships: 90-Day Customer Loyalty Program",
    courseDescription: "Strengthen trust, increase retention, and build a loyal customer community. Transform customers into raving fans and advocates.",
    totalWeeks: 12,
    category: "Customer Relations",
    difficulty: "Intermediate",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Relationship Foundation",
            weekDescription: "Understand your customers and current relationship health.",
            icon: Heart,
            tasks: [
                {
                    title: "Segment Your Customer Base",
                    description: "Group customers by behavior, value, and needs.",
                    action: "Analyze purchase history, identify high-value customers, group by engagement level, note lifecycle stage, create segments in CRM.",
                    deliverable: "Customer segmentation complete"
                },
                {
                    title: "Map Current Customer Experience",
                    description: "Understand every touchpoint in customer journey.",
                    action: "Document all customer interactions, identify pain points, note moments of delight, find gaps in communication, prioritize improvements.",
                    deliverable: "Customer journey map with pain points identified"
                },
                {
                    title: "Survey Customer Satisfaction",
                    description: "Get direct feedback on customer experience.",
                    action: "Create NPS or satisfaction survey, email to all customers, incentivize responses, analyze feedback, identify trends.",
                    deliverable: "Customer satisfaction survey results"
                },
                {
                    title: "Identify Relationship Gaps",
                    description: "Find where you're failing to connect with customers.",
                    action: "Review customer service tickets, analyze churn reasons, identify communication gaps, note missed opportunities for engagement.",
                    deliverable: "Relationship gap analysis"
                },
                {
                    title: "Set Relationship Goals",
                    description: "Define what successful customer relationships look like.",
                    action: "Set retention rate goal, define engagement KPIs, establish NPS target, plan referral benchmarks, document goals.",
                    deliverable: "Customer relationship goals and metrics"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Personal Touch & Communication",
            weekDescription: "Add human connection to every interaction.",
            icon: MessageCircle,
            tasks: [
                {
                    title: "Personalize All Communications",
                    description: "Make every message feel individually crafted.",
                    action: "Use customer names, reference past purchases, acknowledge preferences, customize recommendations, avoid generic templates.",
                    deliverable: "Personalized email templates created"
                },
                {
                    title: "Implement Thank You System",
                    description: "Express genuine gratitude for every customer.",
                    action: "Send thank you email after purchase, handwrite notes for high-value customers, create video thank you messages, make it authentic.",
                    deliverable: "Thank you system established"
                },
                {
                    title: "Remember Important Dates",
                    description: "Celebrate milestones and special occasions.",
                    action: "Track customer birthdays, celebrate anniversary of first purchase, acknowledge business milestones, send personalized messages.",
                    deliverable: "Customer milestone tracking system"
                },
                {
                    title: "Create Personal Video Messages",
                    description: "Use video to deepen personal connection.",
                    action: "Record welcome videos for new customers, create birthday messages, send thank you videos, make quick check-in videos.",
                    deliverable: "Video message library"
                },
                {
                    title: "Pick Up the Phone",
                    description: "Have real conversations with key customers.",
                    action: "Call top 10 customers to say thank you, check in on satisfaction, ask for feedback, build genuine relationship.",
                    deliverable: "Personal calls made to top customers"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Value-Add Communication",
            weekDescription: "Provide ongoing value beyond the initial sale.",
            icon: Gift,
            tasks: [
                {
                    title: "Create Customer-Only Content",
                    description: "Develop exclusive content for existing customers.",
                    action: "Write advanced guides, create insider tips, share behind-the-scenes content, offer exclusive access, make customers feel special.",
                    deliverable: "Customer-only content library"
                },
                {
                    title: "Send Helpful Resources",
                    description: "Share valuable content relevant to their needs.",
                    action: "Curate helpful articles, recommend complementary tools, share industry news, provide actionable tips, add personal commentary.",
                    deliverable: "Monthly value-add resource email"
                },
                {
                    title: "Offer Tips & Best Practices",
                    description: "Help customers get more from their purchase.",
                    action: "Create how-to guides, share usage tips, provide optimization suggestions, offer troubleshooting help, maximize product value.",
                    deliverable: "Customer success content series"
                },
                {
                    title: "Host Customer-Only Webinars",
                    description: "Provide exclusive training and Q&A sessions.",
                    action: "Schedule monthly webinars, teach advanced strategies, answer questions live, record for replay, build community.",
                    deliverable: "First customer webinar delivered"
                },
                {
                    title: "Create Insider Newsletter",
                    description: "Regular communication with exclusive updates.",
                    action: "Design customer newsletter, share company news, preview new products, offer special deals, maintain consistent schedule.",
                    deliverable: "Monthly customer newsletter launched"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Surprise & Delight",
            weekDescription: "Create unexpected moments of joy.",
            icon: Smile,
            tasks: [
                {
                    title: "Random Acts of Appreciation",
                    description: "Surprise customers with unexpected gestures.",
                    action: "Send unexpected thank you gifts, upgrade service levels, offer surprise discounts, include bonus items, be spontaneous.",
                    deliverable: "Surprise and delight program launched"
                },
                {
                    title: "Celebrate Customer Wins",
                    description: "Acknowledge and honor customer success.",
                    action: "Monitor customer achievements, send congratulations, feature their wins publicly (with permission), create success badges/certificates.",
                    deliverable: "Customer win celebration system"
                },
                {
                    title: "Send Unexpected Gifts",
                    description: "Mail physical surprises to show appreciation.",
                    action: "Send branded swag, include handwritten notes, mail small thoughtful gifts, consider customer preferences, make it personal.",
                    deliverable: "Gift program for top customers"
                },
                {
                    title: "Upgrade Experiences",
                    description: "Randomly elevate customer experience.",
                    action: "Upgrade shipping to overnight, unlock premium features temporarily, provide VIP access to events, offer complimentary add-ons.",
                    deliverable: "Random upgrade program implemented"
                },
                {
                    title: "Create 'WOW' Moments",
                    description: "Go above and beyond expectations.",
                    action: "Identify opportunities to exceed expectations, empower team to surprise customers, document wow stories, celebrate internally.",
                    deliverable: "WOW moment stories documented"
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Exceptional Support Experience",
            weekDescription: "Turn customer service into relationship building.",
            icon: Phone,
            tasks: [
                {
                    title: "Optimize Response Times",
                    description: "Reply to customer inquiries quickly.",
                    action: "Set up automated acknowledgment, prioritize response speed, set team response SLAs, measure and improve times.",
                    deliverable: "Response time improved (goal: under 2 hours)"
                },
                {
                    title: "Train Team on Empathy",
                    description: "Ensure every interaction feels caring.",
                    action: "Teach active listening, practice empathetic responses, avoid scripted replies, encourage genuine care, role-play scenarios.",
                    deliverable: "Customer service empathy training completed"
                },
                {
                    title: "Empower Team to Solve",
                    description: "Give team authority to make things right.",
                    action: "Set refund/discount authority levels, create guidelines for resolutions, encourage ownership, celebrate great service examples.",
                    deliverable: "Team empowerment guidelines established"
                },
                {
                    title: "Follow Up After Resolution",
                    description: "Check in to ensure customer satisfaction.",
                    action: "Send follow-up email 24-48 hours after issue resolved, ask if everything is working well, offer additional help.",
                    deliverable: "Post-resolution follow-up system"
                },
                {
                    title: "Turn Complaints into Opportunities",
                    description: "Transform negative experiences into loyalty.",
                    action: "Respond quickly to complaints, over-deliver on resolutions, follow up personally, track complaint-to-advocate conversions.",
                    deliverable: "Service recovery process documented"
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Community Building",
            weekDescription: "Create space for customers to connect.",
            icon: Users,
            tasks: [
                {
                    title: "Launch Customer Community",
                    description: "Create forum for customers to interact.",
                    action: "Set up Facebook Group or forum, invite customers, establish community guidelines, seed initial conversations, moderate actively.",
                    deliverable: "Customer community launched"
                },
                {
                    title: "Facilitate Customer Connections",
                    description: "Help customers network with each other.",
                    action: "Introduce complementary customers, host virtual meetups, create collaboration opportunities, facilitate partnerships.",
                    deliverable: "Customer networking facilitated"
                },
                {
                    title: "Feature Customer Stories",
                    description: "Spotlight customers and their successes.",
                    action: "Interview customers, create case studies, share on social media and website, celebrate their achievements publicly.",
                    deliverable: "Customer spotlight series launched"
                },
                {
                    title: "Host Customer Events",
                    description: "Bring customers together virtually or in-person.",
                    action: "Plan customer appreciation event, host virtual happy hours, organize in-person meetups if possible, create networking opportunities.",
                    deliverable: "Customer event hosted"
                },
                {
                    title: "Encourage User-Generated Content",
                    description: "Invite customers to share their experiences.",
                    action: "Create branded hashtag, run photo/video contests, feature customer content, reward participation, build social proof.",
                    deliverable: "UGC campaign launched"
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Loyalty Program Design",
            weekDescription: "Reward and incentivize ongoing engagement.",
            icon: Award,
            tasks: [
                {
                    title: "Design Loyalty Program Structure",
                    description: "Create tiered rewards system.",
                    action: "Define tier levels (bronze, silver, gold), set requirements for each tier, determine rewards at each level, make it achievable.",
                    deliverable: "Loyalty program structure designed"
                },
                {
                    title: "Determine Loyalty Benefits",
                    description: "Decide what rewards to offer loyal customers.",
                    action: "Offer early access to products, provide exclusive discounts, give VIP support access, create special perks, ensure value.",
                    deliverable: "Loyalty benefits package defined"
                },
                {
                    title: "Implement Points System",
                    description: "Set up mechanism for tracking and rewarding loyalty.",
                    action: "Choose loyalty platform, define point values, determine redemption options, integrate with checkout, launch program.",
                    deliverable: "Loyalty points system operational"
                },
                {
                    title: "Launch Loyalty Program",
                    description: "Roll out program to existing customers.",
                    action: "Email announcement, explain benefits, grandfather existing customers into appropriate tiers, make signup easy, promote regularly.",
                    deliverable: "Loyalty program launched"
                },
                {
                    title: "Recognize Top Customers",
                    description: "Publicly acknowledge and reward best customers.",
                    action: "Create VIP tier for top customers, offer special recognition, provide exclusive benefits, make them feel valued.",
                    deliverable: "VIP customer recognition program"
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Feedback & Co-Creation",
            weekDescription: "Involve customers in your business decisions.",
            icon: MessageCircle,
            tasks: [
                {
                    title: "Seek Regular Feedback",
                    description: "Consistently ask for customer input.",
                    action: "Send quarterly surveys, conduct one-on-one interviews, monitor social mentions, create feedback channels, act on insights.",
                    deliverable: "Customer feedback system established"
                },
                {
                    title: "Involve Customers in Product Development",
                    description: "Let customers help shape your offerings.",
                    action: "Create customer advisory board, run feature polls, test beta products with customers, credit their contributions publicly.",
                    deliverable: "Customer co-creation process"
                },
                {
                    title: "Implement Suggestions Publicly",
                    description: "Show you act on customer feedback.",
                    action: "Track suggestions, implement feasible ideas, announce updates crediting customer input, close feedback loop.",
                    deliverable: "Customer-driven improvements implemented"
                },
                {
                    title: "Create Feedback Incentives",
                    description: "Reward customers who provide input.",
                    action: "Offer discounts for survey completion, enter feedback providers in drawings, provide early access to those who help.",
                    deliverable: "Feedback reward program"
                },
                {
                    title: "Share Product Roadmap",
                    description: "Give customers visibility into future plans.",
                    action: "Share upcoming features, explain decision-making, invite input on priorities, maintain transparency.",
                    deliverable: "Public product roadmap shared"
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Proactive Relationship Management",
            weekDescription: "Anticipate and address needs before customers ask.",
            icon: Target,
            tasks: [
                {
                    title: "Monitor Customer Health Scores",
                    description: "Track engagement and satisfaction metrics.",
                    action: "Define health score criteria, set up tracking system, identify at-risk customers, create intervention process.",
                    deliverable: "Customer health scoring system"
                },
                {
                    title: "Identify At-Risk Customers",
                    description: "Catch problems before customers churn.",
                    action: "Monitor usage patterns, track support tickets, note decreased engagement, reach out proactively, offer solutions.",
                    deliverable: "Churn prevention protocol"
                },
                {
                    title: "Conduct Success Check-Ins",
                    description: "Regularly verify customer satisfaction.",
                    action: "Schedule quarterly check-ins with key accounts, ask about challenges, offer additional help, strengthen relationships.",
                    deliverable: "Quarterly customer check-ins scheduled"
                },
                {
                    title: "Anticipate Needs",
                    description: "Offer help before customers realize they need it.",
                    action: "Analyze usage patterns, predict next needs, proactively reach out with solutions, provide timely resources.",
                    deliverable: "Proactive outreach program"
                },
                {
                    title: "Prevent Common Issues",
                    description: "Address problems before they occur.",
                    action: "Identify frequently asked questions, create preventive resources, improve onboarding, reduce support burden.",
                    deliverable: "Preventive customer success content"
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Referral & Advocacy Program",
            weekDescription: "Turn happy customers into active promoters.",
            icon: Users,
            tasks: [
                {
                    title: "Create Referral Program",
                    description: "Incentivize customers to refer others.",
                    action: "Design two-sided rewards, make referral process simple, provide shareable links, track referrals, reward promptly.",
                    deliverable: "Referral program launched"
                },
                {
                    title: "Make Sharing Easy",
                    description: "Remove friction from referral process.",
                    action: "Create one-click share options, provide social media templates, design email referral templates, offer multiple channels.",
                    deliverable: "Referral sharing tools created"
                },
                {
                    title: "Request Testimonials",
                    description: "Gather social proof from happy customers.",
                    action: "Ask satisfied customers for reviews, make it easy with templates, provide multiple platforms, incentivize participation.",
                    deliverable: "Testimonial collection system"
                },
                {
                    title: "Create Ambassador Program",
                    description: "Recruit super-fans as brand advocates.",
                    action: "Identify most enthusiastic customers, offer exclusive benefits, provide affiliate opportunities, empower to represent brand.",
                    deliverable: "Brand ambassador program"
                },
                {
                    title: "Feature Customer Success Stories",
                    description: "Amplify customer voices in marketing.",
                    action: "Create video testimonials, write case studies, share reviews prominently, tag customers in social posts.",
                    deliverable: "Customer success marketing campaign"
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Retention Optimization",
            weekDescription: "Systematically improve customer lifetime value.",
            icon: TrendingUp,
            tasks: [
                {
                    title: "Analyze Retention Metrics",
                    description: "Understand your current retention performance.",
                    action: "Calculate retention rate, measure churn, analyze customer lifetime value, identify retention drivers, set improvement goals.",
                    deliverable: "Retention metrics dashboard"
                },
                {
                    title: "Implement Win-Back Campaign",
                    description: "Re-engage customers who've gone dormant.",
                    action: "Identify inactive customers, create re-engagement email series, offer come-back incentive, personalize outreach.",
                    deliverable: "Win-back campaign launched"
                },
                {
                    title: "Optimize Onboarding",
                    description: "Ensure new customers succeed immediately.",
                    action: "Map first 30-90 days, create milestone-based communication, provide success resources, reduce time-to-value.",
                    deliverable: "Improved onboarding sequence"
                },
                {
                    title: "Reduce Cancellation Friction",
                    description: "Make it easy to pause instead of cancel.",
                    action: "Offer pause option, provide downgrades, conduct exit interviews, create save offers, learn from cancellations.",
                    deliverable: "Retention-focused cancellation flow"
                },
                {
                    title: "Implement Expansion Revenue Strategies",
                    description: "Grow revenue from existing customers.",
                    action: "Identify upsell opportunities, create cross-sell sequences, offer account expansions, increase average order value.",
                    deliverable: "Revenue expansion playbook"
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Relationship ROI & Scaling",
            weekDescription: "Measure impact and create sustainable systems.",
            icon: Star,
            tasks: [
                {
                    title: "Calculate Relationship ROI",
                    description: "Measure the business impact of relationship efforts.",
                    action: "Track retention rate improvements, measure referral revenue, calculate NPS increases, analyze customer lifetime value growth.",
                    deliverable: "Relationship program ROI report"
                },
                {
                    title: "Document Relationship Playbook",
                    description: "Create repeatable system for customer relationships.",
                    action: "Document all processes, create templates and scripts, build automation where appropriate, enable team to execute.",
                    deliverable: "Customer relationship playbook"
                },
                {
                    title: "Scale Personalization",
                    description: "Maintain personal touch as you grow.",
                    action: "Use automation thoughtfully, segment for relevance, personalize at scale, maintain authenticity, leverage technology.",
                    deliverable: "Scaled personalization system"
                },
                {
                    title: "Train Team on Relationship Building",
                    description: "Ensure everyone embodies relationship-first approach.",
                    action: "Conduct relationship training, share best practices, celebrate relationship wins, align incentives with retention.",
                    deliverable: "Team relationship training program"
                },
                {
                    title: "Plan Next Quarter",
                    description: "Continue evolving relationship strategy.",
                    action: "Review what worked, identify new opportunities, set retention goals, plan new initiatives, commit to continuous improvement.",
                    deliverable: "Q2 relationship strategy roadmap"
                }
            ]
        }
    ]
};