import { Target, Users, Magnet, TrendingUp, Filter, Zap, Mail, Globe, Search, BarChart, Rocket, Award } from 'lucide-react';

export const increaseLeadsRoadmap = {
    courseTitle: "Increase Qualified Leads: 90-Day Lead Generation System",
    courseDescription: "Create predictable growth by attracting the right people at the right time. Build a robust system for generating high-quality leads consistently.",
    totalWeeks: 12,
    category: "Lead Generation",
    difficulty: "Advanced",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Lead Generation Foundation",
            weekDescription: "Define your ideal lead and current lead sources.",
            icon: Target,
            tasks: [
                {
                    title: "Define Your Ideal Lead Profile",
                    description: "Get crystal clear on who you want to attract.",
                    action: "Define demographics, firmographics, pain points, buying triggers, budget level, decision-making authority, timeline to purchase.",
                    deliverable: "Ideal lead profile document"
                },
                {
                    title: "Audit Current Lead Sources",
                    description: "Understand where your leads currently come from.",
                    action: "Track all lead sources, measure conversion rates by source, calculate cost per lead, identify top performers, note gaps.",
                    deliverable: "Lead source audit report"
                },
                {
                    title: "Calculate Lead Generation Metrics",
                    description: "Establish baseline metrics to measure improvement.",
                    action: "Calculate current lead volume, measure lead-to-customer rate, determine customer acquisition cost, set lead quality score.",
                    deliverable: "Lead generation metrics dashboard"
                },
                {
                    title: "Research Competitor Lead Generation",
                    description: "Learn from what's working in your industry.",
                    action: "Analyze competitor lead magnets, review their opt-in forms, study their content offers, identify gaps you can fill.",
                    deliverable: "Competitive lead gen analysis"
                },
                {
                    title: "Set Lead Generation Goals",
                    description: "Define specific targets for the next 90 days.",
                    action: "Set monthly lead volume goals, define lead quality targets, establish conversion rate objectives, plan revenue impact.",
                    deliverable: "90-day lead generation goals"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Irresistible Lead Magnets",
            weekDescription: "Create compelling offers that attract your ideal leads.",
            icon: Magnet,
            tasks: [
                {
                    title: "Brainstorm Lead Magnet Ideas",
                    description: "Generate multiple valuable content offers.",
                    action: "List problems you can solve, create checklists/templates/guides, design assessments/quizzes, plan mini-courses, consider toolkits.",
                    deliverable: "List of 10+ lead magnet ideas"
                },
                {
                    title: "Create Your Primary Lead Magnet",
                    description: "Develop high-value content offer for opt-ins.",
                    action: "Choose best idea, create the asset (PDF, video, template), design professionally, ensure immediate value, make it actionable.",
                    deliverable: "Primary lead magnet created"
                },
                {
                    title: "Develop Segment-Specific Lead Magnets",
                    description: "Create offers for different audience segments.",
                    action: "Design beginner vs. advanced offers, create industry-specific content, develop role-based resources, tailor to buyer journey stage.",
                    deliverable: "3-5 segmented lead magnets"
                },
                {
                    title: "Design Lead Magnet Landing Pages",
                    description: "Create high-converting pages for each offer.",
                    action: "Write compelling headlines, highlight key benefits, use social proof, create clear CTA, optimize for mobile, A/B test.",
                    deliverable: "Landing pages for all lead magnets"
                },
                {
                    title: "Set Up Delivery System",
                    description: "Automate lead magnet delivery process.",
                    action: "Configure email automation, create immediate delivery email, design follow-up sequence, track download/engagement.",
                    deliverable: "Automated lead magnet delivery"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Website Conversion Optimization",
            weekDescription: "Turn your website into a lead generation machine.",
            icon: Globe,
            tasks: [
                {
                    title: "Add Strategic Opt-In Forms",
                    description: "Place lead capture forms throughout your site.",
                    action: "Add homepage popup (exit-intent), embed forms in blog posts, create footer opt-in, add sidebar forms, test placement.",
                    deliverable: "Opt-in forms on all key pages"
                },
                {
                    title: "Optimize Form Design",
                    description: "Make forms easy and compelling to complete.",
                    action: "Minimize required fields (name + email usually enough), use clear value proposition, add social proof, test button copy.",
                    deliverable: "Optimized form templates"
                },
                {
                    title: "Create Content Upgrades",
                    description: "Offer bonus content within blog posts.",
                    action: "Create downloadable resources for top posts, offer templates/checklists related to content, use content-specific CTAs.",
                    deliverable: "Content upgrades for top 5 posts"
                },
                {
                    title: "Implement Exit-Intent Popups",
                    description: "Capture leaving visitors with last-chance offer.",
                    action: "Design popup with strong offer, use exit-intent trigger, personalize by page, test different offers, measure conversion.",
                    deliverable: "Exit-intent popup campaign"
                },
                {
                    title: "Add Live Chat Lead Capture",
                    description: "Use chat to qualify and capture leads.",
                    action: "Implement chat widget, create qualification questions, route qualified leads to CRM, offer chat-exclusive content.",
                    deliverable: "Live chat lead generation system"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Content Marketing for Leads",
            weekDescription: "Create content that attracts and converts prospects.",
            icon: Search,
            tasks: [
                {
                    title: "Develop SEO Content Strategy",
                    description: "Create content that ranks and converts.",
                    action: "Research high-intent keywords, map keywords to buyer journey, create content calendar, write for both search and humans.",
                    deliverable: "SEO content calendar"
                },
                {
                    title: "Create Ultimate Guides",
                    description: "Write comprehensive resources that generate links and leads.",
                    action: "Choose pillar topics, write 3000+ word guides, include visuals, optimize for featured snippets, add lead magnets.",
                    deliverable: "2-3 ultimate guides published"
                },
                {
                    title: "Produce Video Content",
                    description: "Use video to attract and engage leads.",
                    action: "Create educational YouTube videos, optimize for search, include lead magnet CTAs, build email list from viewers.",
                    deliverable: "Video content series with lead capture"
                },
                {
                    title: "Launch Podcast for Lead Gen",
                    description: "Build audience and authority through audio content.",
                    action: "Plan podcast format, record first episodes, include lead magnet mentions, create show notes with opt-ins.",
                    deliverable: "Podcast launched with lead capture"
                },
                {
                    title: "Repurpose Content Across Channels",
                    description: "Maximize reach of every piece of content.",
                    action: "Turn blogs into videos, convert videos to podcasts, create social posts from long content, drive all to lead magnets.",
                    deliverable: "Content repurposing system"
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Social Media Lead Generation",
            weekDescription: "Convert social followers into email leads.",
            icon: Users,
            tasks: [
                {
                    title: "Optimize Social Profiles for Leads",
                    description: "Make your profiles lead generation assets.",
                    action: "Add lead magnet link to bio, create link-in-bio page, pin lead generation posts, optimize profile descriptions.",
                    deliverable: "Social profiles optimized for conversions"
                },
                {
                    title: "Create Lead Generation Content",
                    description: "Design social content that drives opt-ins.",
                    action: "Share valuable tips that lead to full guides, tease lead magnet content, create swipe files, promote webinars.",
                    deliverable: "30-day social lead gen content calendar"
                },
                {
                    title: "Run Lead Generation Ads",
                    description: "Use paid social to scale lead acquisition.",
                    action: "Design ad creative, write compelling copy, set up lead form ads, target ideal audience, test and optimize.",
                    deliverable: "Social ad campaigns running"
                },
                {
                    title: "Host Social Media Challenges",
                    description: "Build engagement and collect emails through challenges.",
                    action: "Design 5-7 day challenge, require email to join, deliver value daily, promote on social, convert to customers.",
                    deliverable: "Social challenge launched"
                },
                {
                    title: "Use LinkedIn for B2B Leads",
                    description: "Leverage LinkedIn for high-quality business leads.",
                    action: "Optimize LinkedIn profile, publish thought leadership articles, engage in groups, use InMail strategically, offer valuable content.",
                    deliverable: "LinkedIn lead generation system"
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Email List Building Tactics",
            weekDescription: "Accelerate email list growth through multiple channels.",
            icon: Mail,
            tasks: [
                {
                    title: "Create Welcome Email Series",
                    description: "Nurture new leads immediately after opt-in.",
                    action: "Write 5-7 welcome emails, deliver lead magnet, share best content, build relationship, make soft offer.",
                    deliverable: "Automated welcome series"
                },
                {
                    title: "Implement Referral Program",
                    description: "Turn subscribers into list-building partners.",
                    action: "Offer incentive for referrals, make sharing easy, track referral sources, reward top referrers.",
                    deliverable: "Email referral program"
                },
                {
                    title: "Run Giveaway Campaign",
                    description: "Rapidly grow list through prize promotion.",
                    action: "Choose valuable prize, require email to enter, promote across channels, partner with others, deliver value to all entrants.",
                    deliverable: "Giveaway campaign executed"
                },
                {
                    title: "Guest Blog for List Building",
                    description: "Leverage other audiences to build your list.",
                    action: "Identify target publications, pitch relevant topics, include lead magnet CTA in content, track conversions.",
                    deliverable: "2-3 guest posts published with lead capture"
                },
                {
                    title: "Add Email Signature Opt-In",
                    description: "Use every email as lead generation opportunity.",
                    action: "Add lead magnet link to signature, create compelling CTA, track clicks, promote best offers.",
                    deliverable: "Email signature with lead capture"
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Webinars & Live Events",
            weekDescription: "Use live sessions to generate and qualify leads.",
            icon: Rocket,
            tasks: [
                {
                    title: "Plan High-Value Webinar",
                    description: "Design educational session that attracts ideal leads.",
                    action: "Choose compelling topic, create presentation, plan interactive elements, design conversion offer, practice delivery.",
                    deliverable: "Webinar content and slides"
                },
                {
                    title: "Create Webinar Registration Funnel",
                    description: "Build system to maximize webinar signups.",
                    action: "Design landing page, write email sequence, set up reminder automation, track registrations.",
                    deliverable: "Webinar registration system"
                },
                {
                    title: "Promote Webinar Extensively",
                    description: "Drive maximum registrations across all channels.",
                    action: "Email list multiple times, promote on social media, run ads if budget allows, partner for co-promotion, leverage affiliates.",
                    deliverable: "Webinar promoted (goal: 100+ registrations)"
                },
                {
                    title: "Deliver and Convert Webinar",
                    description: "Provide value and make compelling offer.",
                    action: "Show up prepared, deliver promised value, engage attendees, make limited-time offer, follow up with all registrants.",
                    deliverable: "Webinar successfully delivered"
                },
                {
                    title: "Create Evergreen Webinar",
                    description: "Automate your best webinar for ongoing leads.",
                    action: "Record live webinar, edit for evergreen version, set up automated funnel, promote continuously.",
                    deliverable: "Evergreen webinar funnel"
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Strategic Partnerships for Leads",
            weekDescription: "Leverage other audiences through partnerships.",
            icon: Users,
            tasks: [
                {
                    title: "Identify Partnership Opportunities",
                    description: "Find complementary businesses with your audience.",
                    action: "List potential partners, analyze audience overlap, ensure value alignment, prioritize outreach list.",
                    deliverable: "Partnership prospect list"
                },
                {
                    title: "Create Co-Marketing Assets",
                    description: "Develop joint content and offers.",
                    action: "Plan co-branded webinar, create joint lead magnet, design bundle offer, develop cross-promotion campaign.",
                    deliverable: "Co-marketing campaign with partner"
                },
                {
                    title: "Set Up Affiliate Program",
                    description: "Enable others to promote your lead magnets.",
                    action: "Choose affiliate platform, create commission structure, develop promotional assets, recruit affiliates.",
                    deliverable: "Affiliate program launched"
                },
                {
                    title: "Guest Speak on Podcasts",
                    description: "Reach new audiences through podcast interviews.",
                    action: "Pitch relevant podcasts, prepare talking points, mention lead magnet naturally, track conversions.",
                    deliverable: "2-3 podcast guest appearances"
                },
                {
                    title: "Cross-Promote Email Lists",
                    description: "Swap promotions with complementary businesses.",
                    action: "Negotiate list swap, create compelling promotion for their list, track results, build ongoing relationships.",
                    deliverable: "Email list cross-promotion executed"
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Paid Advertising for Leads",
            weekDescription: "Scale lead generation through strategic ad spend.",
            icon: TrendingUp,
            tasks: [
                {
                    title: "Set Up Facebook/Instagram Lead Ads",
                    description: "Use native lead forms for easy conversions.",
                    action: "Design ad creative, write compelling copy, set up lead form, target ideal audience, set budget, test variations.",
                    deliverable: "Facebook lead ad campaigns"
                },
                {
                    title: "Launch Google Search Ads",
                    description: "Capture high-intent search traffic.",
                    action: "Research relevant keywords, write search ads, create dedicated landing pages, set up conversion tracking, optimize continuously.",
                    deliverable: "Google Ads campaign running"
                },
                {
                    title: "Test LinkedIn Sponsored Content",
                    description: "Reach B2B decision-makers through LinkedIn ads.",
                    action: "Create sponsored content, use lead gen forms, target by job title/company, track cost per lead.",
                    deliverable: "LinkedIn ad campaign"
                },
                {
                    title: "Retarget Website Visitors",
                    description: "Convert lost traffic through retargeting.",
                    action: "Install retargeting pixels, create retargeting audiences, design compelling retargeting ads, focus on lead magnets.",
                    deliverable: "Retargeting campaigns active"
                },
                {
                    title: "Optimize Ad Performance",
                    description: "Continuously improve ad results.",
                    action: "A/B test ad creative, test different audiences, optimize landing pages, reduce cost per lead, scale winners.",
                    deliverable: "Ad optimization report"
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Lead Qualification & Scoring",
            weekDescription: "Identify and prioritize your best leads.",
            icon: Filter,
            tasks: [
                {
                    title: "Develop Lead Scoring Model",
                    description: "Create system to rank lead quality.",
                    action: "Define scoring criteria, assign point values, consider demographic and behavioral factors, set MQL threshold.",
                    deliverable: "Lead scoring model"
                },
                {
                    title: "Implement Progressive Profiling",
                    description: "Gather more information over time.",
                    action: "Ask basic info initially, request additional details in later interactions, don't overwhelm with long forms initially.",
                    deliverable: "Progressive profiling system"
                },
                {
                    title: "Create Lead Segmentation",
                    description: "Group leads by characteristics and behavior.",
                    action: "Segment by industry, company size, behavior, interest level, buyer journey stage, create targeted campaigns.",
                    deliverable: "Lead segmentation strategy"
                },
                {
                    title: "Set Up Lead Nurturing Workflows",
                    description: "Automate personalized follow-up based on lead score.",
                    action: "Create email workflows for each segment, tailor content to interest level, gradually increase engagement, warm up cold leads.",
                    deliverable: "Automated nurture campaigns"
                },
                {
                    title: "Establish Sales Handoff Process",
                    description: "Define when and how leads go to sales.",
                    action: "Set MQL to SQL criteria, create handoff workflow, brief sales team, establish feedback loop.",
                    deliverable: "Sales handoff process documented"
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Advanced Lead Generation Tactics",
            webDescription: "Implement sophisticated strategies for quality leads.",
            icon: Award,
            tasks: [
                {
                    title: "Launch Quiz Funnel",
                    description: "Use interactive quizzes to generate engaged leads.",
                    action: "Create relevant quiz, segment by results, offer personalized lead magnets, follow up based on quiz results.",
                    deliverable: "Quiz funnel launched"
                },
                {
                    title: "Create Interactive Tools",
                    description: "Build calculators or assessments that capture leads.",
                    action: "Develop useful calculator/tool, require email for results, provide value immediately, follow up with related content.",
                    deliverable: "Interactive lead generation tool"
                },
                {
                    title: "Host Virtual Summit",
                    description: "Organize multi-speaker event for massive lead gen.",
                    action: "Recruit speakers, promote event, collect registrations, deliver value, convert attendees to customers.",
                    deliverable: "Virtual summit executed"
                },
                {
                    title: "Implement Chatbot Lead Capture",
                    description: "Use AI chatbots to qualify and capture leads 24/7.",
                    action: "Set up chatbot, create conversation flows, qualify leads automatically, integrate with CRM.",
                    deliverable: "Chatbot lead generation"
                },
                {
                    title: "Create Free Tool or Resource",
                    description: "Build something valuable that requires signup.",
                    action: "Develop useful free tool, require account creation, provide ongoing value, convert to paid.",
                    deliverable: "Free tool launched"
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Optimization & Scaling",
            weekDescription: "Measure results and scale what works.",
            icon: BarChart,
            tasks: [
                {
                    title: "Analyze Lead Generation Performance",
                    description: "Review all channels and tactics comprehensively.",
                    action: "Calculate ROI by channel, measure lead quality by source, assess conversion rates, identify top performers.",
                    deliverable: "Comprehensive lead gen analytics report"
                },
                {
                    title: "Optimize Conversion Rates",
                    description: "Improve performance of existing tactics.",
                    action: "A/B test landing pages, improve email copy, refine targeting, enhance lead magnets, reduce friction.",
                    deliverable: "Conversion optimization plan"
                },
                {
                    title: "Scale Top Performers",
                    description: "Invest more in what's working best.",
                    action: "Increase ad spend on profitable campaigns, create more content in top categories, double down on best channels.",
                    deliverable: "Scaling strategy document"
                },
                {
                    title: "Create Lead Generation Playbook",
                    description: "Document all processes for repeatability.",
                    action: "Document every tactic, create templates and checklists, build SOPs, enable team to execute.",
                    deliverable: "Lead generation playbook"
                },
                {
                    title: "Plan Next Quarter Strategy",
                    description: "Set goals and tactics for continued growth.",
                    action: "Set new lead volume targets, identify new channels to test, plan content calendar, allocate budget.",
                    deliverable: "Q2 lead generation strategy"
                }
            ]
        }
    ]
};