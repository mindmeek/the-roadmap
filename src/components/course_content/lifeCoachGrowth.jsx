import { Award, Users, TrendingUp, DollarSign, Sparkles, Target, MessageSquare, Heart, Zap, Globe, Star, Rocket } from 'lucide-react';

export const lifeCoachGrowthRoadmap = {
    courseTitle: "Life Coach Business Plan: 90-Day Client Acquisition System",
    courseDescription: "Build a thriving coaching practice with consistent client flow, premium pricing, and impactful transformations. Use The Business Minds HQ to automate your coaching business.",
    totalWeeks: 12,
    category: "Niche: Life Coaches",
    difficulty: "All Levels",
    
    successMetrics: {
        clients: "15-20 active paying clients",
        revenue: "$10K+ monthly recurring revenue",
        programs: "3 offer tiers (1-on-1, group, course)",
        automation: "Passive client acquisition funnel"
    },

    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Niche Definition & Coaching Framework",
            weekDescription: "Get crystal clear on who you serve and your signature coaching method.",
            icon: Target,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Niche defined, signature framework created, positioning clear",
            tasks: [
                {
                    title: "Define Your Coaching Niche & Ideal Client",
                    description: "Stop trying to coach everyone. Get specific on who you serve best.",
                    action: "Identify your zone of genius (intersection of passion, expertise, and market demand). Define your ideal client's demographics, psychographics, pain points, and goals. Create detailed client avatar. Be specific: not 'women' but 'female entrepreneurs 35-45 struggling with work-life balance'.",
                    deliverable: "Detailed ideal client avatar document",
                    hqTools: ["HQ AI Tools", "HQ Strategy Tool: Ideal Client Profile", "HQ Files"],
                    kpi: "One-sentence niche statement completed",
                    detailedSteps: [
                        "Go to HQ Strategy Tools → Open 'Ideal Client Profile' template",
                        "Fill out: Age, gender, income, location, career stage, family situation",
                        "Deep dive psychographics: Values, fears, desires, frustrations, aspirations",
                        "Identify pain points: What keeps them up at night? What have they tried that failed?",
                        "Define transformation: Where are they now vs. where they want to be?",
                        "Use HQ AI: 'Based on this profile, help me write a one-sentence niche statement'",
                        "Example result: 'I help female entrepreneurs in their 30s-40s create work-life harmony without sacrificing business growth'",
                        "Save to HQ Files under 'Coaching Business Foundation'"
                    ]
                },
                {
                    title: "Create Your Signature Coaching Framework",
                    description: "Develop a unique, named methodology that differentiates you.",
                    action: "Design your proprietary coaching framework (3-7 steps/pillars). Name it something memorable. Create visual representation. Document core principles and transformation journey. Make it teachable and repeatable.",
                    deliverable: "Signature framework documented with visual",
                    hqTools: ["HQ AI Tools", "HQ Design Tools", "HQ Files"],
                    kpi: "Framework named and visualized",
                    detailedSteps: [
                        "Reflect on your coaching process: What steps do clients go through with you?",
                        "Identify 3-7 key pillars or phases of transformation",
                        "Example: 'The CLARITY Method™' - C: Clarify vision, L: Let go of limiting beliefs, A: Align actions, R: Resilience building, I: Implement systems, T: Track progress, Y: You 2.0",
                        "Use HQ AI: 'Help me name a coaching framework for [your niche] that covers [list pillars]'",
                        "Create visual in Canva or PowerPoint: Circle/pyramid/journey map showing framework",
                        "Write 2-3 sentences explaining each pillar",
                        "Upload visual and document to HQ Files",
                        "This becomes your signature offering and differentiator"
                    ]
                },
                {
                    title: "Craft Your Coaching Positioning Statement",
                    description: "Articulate exactly what makes you different and valuable.",
                    action: "Write your positioning statement: Who you help + What transformation you provide + How you're different + Proof/credibility. Create 3 versions: elevator pitch (15s), detailed positioning (60s), and one-liner for social bios.",
                    deliverable: "3 positioning statement versions",
                    hqTools: ["HQ AI Tools", "HQ Templates"],
                    kpi: "All bios updated across platforms with new positioning",
                    detailedSteps: [
                        "Use formula: I help [ideal client] achieve [specific outcome] through [unique method] so they can [ultimate benefit]",
                        "Example: 'I help burned-out executives reclaim 15+ hours/week through my CLARITY Method™ so they can lead with energy and be present for what matters'",
                        "Create 3 lengths: One-liner (Twitter bio), Elevator (LinkedIn summary), Full (website about page)",
                        "Use HQ AI to refine and test variations",
                        "Test with 5 people in your network: Is it clear? Compelling? Different?",
                        "Update: LinkedIn headline, Instagram bio, email signature, HQ author bio",
                        "Save all versions in HQ Templates for easy access"
                    ]
                },
                {
                    title: "Define Your Coaching Offer Suite",
                    description: "Create tiered offerings that serve clients at different levels.",
                    action: "Design 3-tier coaching model: Premium 1-on-1 ($2K-5K), Group coaching program ($500-1K), Self-paced course/membership ($97-297/mo). Define deliverables, duration, and pricing for each. Create transformation promise for each tier.",
                    deliverable: "Complete offer suite with pricing",
                    hqTools: ["HQ Strategy Tool: Value Ladder", "HQ Pricing Calculator", "HQ Files"],
                    kpi: "3 offers clearly defined and priced",
                    detailedSteps: [
                        "Go to HQ Strategy Tools → Open 'Value Ladder' template",
                        "Tier 1 (Premium): 3-6 month 1-on-1 coaching, bi-weekly calls, unlimited messaging, custom plan. Price: $3,000-5,000",
                        "Tier 2 (Group): 12-week group program, weekly calls, community access, curriculum. Price: $997-1,497",
                        "Tier 3 (Self-Serve): Monthly membership with course modules, resources, monthly Q&A. Price: $97-197/month",
                        "For each tier: Define exact deliverables, time commitment, results promised",
                        "Use HQ Pricing Calculator to ensure profitability",
                        "Create comparison chart showing tier differences",
                        "Save offer suite document to HQ Files"
                    ]
                },
                {
                    title: "Set Up HQ Coaching Business Hub",
                    description: "Build your professional coaching website inside HQ.",
                    action: "Use HQ Website Builder to create: Homepage (transformation promise + social proof), About (your story + credibility), Services (3-tier offer suite), Free Resources (lead magnets), Book a Call (calendar). Use coach-specific templates in HQ.",
                    deliverable: "5-page coaching website live",
                    hqTools: ["HQ Website & Funnel Builder", "HQ Templates", "HQ Forms"],
                    kpi: "Website published and mobile-optimized",
                    detailedSteps: [
                        "Go to HQ Website Builder → Select 'Coach/Consultant' template",
                        "Homepage: Compelling headline addressing main pain point, your signature framework visual, client testimonials, CTA to free discovery call",
                        "About page: Your transformation story (why you coach), credentials/certifications, your coaching philosophy",
                        "Services page: Display all 3 tiers with clear benefits and pricing, 'Book Free Consultation' buttons",
                        "Resources page: Free guide/checklist opt-in, link to free workshop/webinar",
                        "Contact/Book Call page: Embed HQ booking calendar",
                        "Add professional headshot and brand colors throughout",
                        "Test all forms and booking calendar on mobile"
                    ]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Lead Generation System Setup",
            weekDescription: "Build automated funnel to attract and qualify coaching prospects.",
            icon: Zap,
            dailyTime: "45-90 minutes",
            weeklyGoal: "Lead magnet funnel live, first 50 leads captured",
            tasks: [
                {
                    title: "Create High-Value Lead Magnet",
                    description: "Develop irresistible free offer that attracts ideal clients.",
                    action: "Create lead magnet aligned with Tier 1 of your framework. Options: '5-Day Transformation Challenge', Assessment/Quiz, Ultimate Guide PDF, Video Training Series, Live Workshop. Make it solve one specific pain point quickly. Use HQ to deliver automatically.",
                    deliverable: "Lead magnet created and delivery automated",
                    hqTools: ["HQ AI Tools for content", "HQ Files for hosting", "HQ Email Automation"],
                    kpi: "Lead magnet converts at 40%+ on landing page",
                    detailedSteps: [
                        "Choose format based on your strength: Written (guide/workbook), Video (training series), Interactive (quiz/assessment)",
                        "Popular options: '7-Day [Transformation] Challenge', '[Topic] Mastery Checklist', 'Discover Your [X] Score' quiz",
                        "Create content: If PDF, design 8-15 pages with actionable value. If video, record 3-5 short lessons (5-10 min each)",
                        "Use HQ AI: 'Create outline for a lead magnet helping [ideal client] with [specific problem]'",
                        "Upload to HQ Files (PDF) or HQ Video Hosting",
                        "Set up HQ Email Automation: Trigger = Form submission → Immediately send welcome email with lead magnet access",
                        "Test complete flow yourself"
                    ]
                },
                {
                    title: "Build High-Converting Landing Page",
                    description: "Create dedicated opt-in page that converts visitors to leads.",
                    action: "Use HQ Funnel Builder to create landing page specifically for lead magnet. Include: Attention-grabbing headline, bullet points of what they'll get, social proof, simple form (name + email only), strong CTA. Remove all navigation/distractions.",
                    deliverable: "Lead magnet landing page live",
                    hqTools: ["HQ Funnel Builder", "HQ Landing Page Templates", "HQ Forms"],
                    kpi: "Landing page converting at 35-50%",
                    detailedSteps: [
                        "Go to HQ Funnel Builder → Create new funnel → Select 'Lead Magnet' template",
                        "Headline formula: 'Discover How to [Achieve Desire] Without [Common Obstacle]'",
                        "Subheadline: Explain exactly what they'll receive",
                        "Add 5-7 bullet points: Specific outcomes/learnings from lead magnet",
                        "Include 1-2 short testimonials if available (or skip for now)",
                        "Create form: Just First Name + Email (more fields = lower conversion)",
                        "CTA button text: 'Send Me [Lead Magnet Name]' (not just 'Submit')",
                        "Remove header navigation, footer links - make focused",
                        "Add trust badge: 'We respect your privacy. Unsubscribe anytime.'",
                        "Test on mobile - 60%+ of traffic will be mobile"
                    ]
                },
                {
                    title: "Create 7-Email Welcome & Nurture Sequence",
                    description: "Build automated sequence that builds trust and books calls.",
                    action: "Use HQ Email Automation to create nurture sequence: (1) Deliver lead magnet + set expectations, (2) Share your story + build credibility, (3) Provide quick win/tip, (4) Share client success story, (5) Explain your framework, (6) Address common objections, (7) Invite to free discovery call. Space over 14 days.",
                    deliverable: "7-email nurture sequence active",
                    hqTools: ["HQ Email Automations", "HQ Templates", "HQ AI"],
                    kpi: "30%+ open rate, 5%+ click rate, 10%+ book discovery call",
                    detailedSteps: [
                        "Go to HQ Email Automations → Create 'Coaching Lead Nurture'",
                        "Email 1 (Day 0): 'Welcome! Here's Your [Lead Magnet]' - Deliver promise, brief intro, set expectations for what's coming",
                        "Email 2 (Day 2): 'My Story: Why I Became a Coach' - Share transformation journey, build relatability, hint at your method",
                        "Email 3 (Day 4): 'Try This Exercise Today' - Give one actionable tip from your framework, show you provide value",
                        "Email 4 (Day 7): 'How [Client Name] Achieved [Result]' - Share detailed client success story with before/after",
                        "Email 5 (Day 9): 'Introducing The [Framework Name]' - Explain your signature method, what makes it different",
                        "Email 6 (Day 11): 'Why Most People Struggle With [Problem]' - Address objections, explain why coaching works",
                        "Email 7 (Day 14): 'Let's Talk: Book Your Free Discovery Call' - Clear CTA with link to HQ booking calendar",
                        "Use HQ AI to draft each email, then personalize",
                        "Add merge tags: {{first_name}}, test all emails"
                    ]
                },
                {
                    title: "Set Up Discovery Call Booking System",
                    description: "Make it frictionless for prospects to book strategy calls.",
                    action: "Use HQ Booking to create 'Free 30-Minute Discovery Call' appointment type. Include pre-call questionnaire (HQ Forms) to qualify leads. Set up automated reminders via email + SMS. Create post-booking thank you sequence.",
                    deliverable: "Automated booking system operational",
                    hqTools: ["HQ Booking/Appointments", "HQ Forms", "HQ Email + SMS Automation"],
                    kpi: "20%+ of email nurture subscribers book discovery call",
                    detailedSteps: [
                        "Go to HQ Booking → Create appointment type 'Free Discovery Call'",
                        "Duration: 30 minutes",
                        "Set availability: 3-4 slots per day, buffer time between calls",
                        "Create pre-call form in HQ Forms asking: Biggest challenge right now, What they've tried, Goals for next 90 days, Budget awareness",
                        "Set up automation: Upon booking → Send confirmation email + calendar invite + Zoom link",
                        "Set reminders: 24 hours before + 1 hour before (email + SMS via HQ)",
                        "Create post-booking email: 'Excited for our call! In the meantime, watch this 5-min video' (share free value)",
                        "Add booking link to email signature, social bios, website"
                    ]
                },
                {
                    title: "Design Discovery Call Framework & Sales Process",
                    description: "Create repeatable system for converting calls to clients.",
                    action: "Develop discovery call structure: Build rapport (5 min), Deep dive into challenges (10 min), Present vision of transformation (10 min), Introduce coaching solution (5 min). Create follow-up process. Use HQ CRM to track all calls and outcomes.",
                    deliverable: "Discovery call script and tracking system",
                    hqTools: ["HQ CRM", "HQ Templates", "HQ Files"],
                    kpi: "40-60% discovery call to client conversion rate",
                    detailedSteps: [
                        "Create discovery call outline in HQ Files",
                        "Phase 1 (5 min): Welcome, build rapport, set agenda, get permission to ask questions",
                        "Phase 2 (10 min): Deep questions - What's not working? What's the cost of not solving this? What have you tried? What would transformation look like?",
                        "Phase 3 (10 min): Paint vision of possibility, introduce your framework, share similar client success",
                        "Phase 4 (5 min): 'Based on what you shared, I believe I can help. Here's how...' Present appropriate tier",
                        "Handle objections: Create list of common objections + responses",
                        "Close: If yes, enroll immediately. If unsure, send proposal via HQ within 24 hours",
                        "Set up HQ CRM pipeline: Lead → Discovery Booked → Call Completed → Proposal Sent → Closed Won/Lost",
                        "Track conversion rate weekly"
                    ]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Content & Visibility Strategy",
            weekDescription: "Start showing up daily as the go-to expert in your niche.",
            icon: Sparkles,
            dailyTime: "60-120 minutes",
            weeklyGoal: "Daily content published, 500+ new followers, thought leadership established",
            tasks: [
                {
                    title: "Define Your Content Pillars & Calendar",
                    description: "Plan strategic content that attracts ideal clients.",
                    action: "Choose 3-4 content pillars aligned with your framework and client pain points. Create 30-day content calendar with daily topics. Mix of: Educational (60%), Inspirational (20%), Promotional (10%), Personal (10%). Use HQ AI to generate ideas and HQ Calendar to organize.",
                    deliverable: "30-day content calendar completed",
                    hqTools: ["HQ AI Tools", "HQ Content Calendar", "HQ Templates"],
                    kpi: "30 content ideas planned and categorized",
                    detailedSteps: [
                        "Define content pillars based on framework. Example: Pillar 1: Mindset, Pillar 2: Productivity, Pillar 3: Relationships, Pillar 4: Self-Care",
                        "Use HQ AI: 'Generate 30 social media content ideas for a life coach helping [niche] with [topics]'",
                        "Create calendar in HQ or Google Sheets: Date, Platform, Pillar, Topic, Format, CTA, Status",
                        "Content mix: Monday - Mindset quote, Tuesday - Tip/How-to, Wednesday - Client win, Thursday - Challenge/Exercise, Friday - Weekend inspiration",
                        "Each post includes CTA: Download lead magnet, book discovery call, join community",
                        "Batch-create 7 days at a time (more efficient)",
                        "Use content bank approach: Write captions in HQ Files, repurpose across platforms"
                    ]
                },
                {
                    title: "Batch-Create 30 Days of Social Content",
                    description: "Create one month of content in one focused session.",
                    action: "Dedicate 3-4 hours to batch-create: 15 carousel posts, 8 Reels/TikToks, 7 quote graphics. Use HQ AI for scripts and captions. Save all to HQ Files. Focus on solving specific problems your ideal client faces.",
                    deliverable: "30-piece content library ready",
                    hqTools: ["HQ AI Tools", "HQ Files", "HQ Design Templates"],
                    kpi: "30 pieces of content created and organized",
                    detailedSteps: [
                        "Block 3-4 hour creation session on calendar",
                        "Use HQ AI to generate: 15 carousel topics, 8 video script outlines, 7 powerful quotes",
                        "Carousels: '5 Signs You Need [Transformation]', 'My Framework Explained', 'Common Mistakes in [Area]'",
                        "Video scripts: Hook (3s), Problem (5s), Solution/Tip (20s), CTA (7s)",
                        "Design graphics in Canva using brand colors",
                        "Record all videos in one session (batch filming saves time)",
                        "Save to HQ Files: Organize by week and platform",
                        "Create caption document with hashtags and CTAs for each piece"
                    ]
                },
                {
                    title: "Launch Daily Posting & Engagement Routine",
                    description: "Show up consistently where your ideal clients are.",
                    action: "Post daily on primary platform (Instagram, LinkedIn, or TikTok - choose one). Engage 30-45 minutes daily: comment on 10 posts from ideal clients, respond to all comments on your content, DM people who engage. Use HQ to schedule and track.",
                    deliverable: "7 consecutive days of posting + engagement",
                    hqTools: ["HQ Social Scheduler", "HQ Analytics", "HQ CRM for DM tracking"],
                    kpi: "Daily posting for 7 days; 50+ meaningful engagements",
                    detailedSteps: [
                        "Choose primary platform where your ideal clients spend time (usually Instagram or LinkedIn for coaches)",
                        "Schedule posts in HQ or Later/Buffer: Post at optimal times (check HQ Analytics for when audience is active)",
                        "Daily routine: 9am - Post content, 12pm - Engage with others' content, 6pm - Respond to comments/DMs",
                        "Engagement strategy: Find ideal clients via hashtags, comment genuinely (not spammy), build relationships",
                        "Reply to every comment on your posts within 2 hours",
                        "DM strategy: When someone engages 3+ times, send personal 'thank you' DM (not salesy)",
                        "Track in HQ CRM: Who you're building relationships with, conversation notes",
                        "Measure: Follower growth, engagement rate, profile visits, website clicks"
                    ]
                },
                {
                    title: "Create Signature Weekly Live Event",
                    description: "Host recurring live training to demonstrate expertise and generate leads.",
                    action: "Launch 'Free Friday Coaching' or weekly masterclass on specific topic from your framework. Use HQ Events to manage registration and reminders. Deliver 30-40 minutes of value, soft pitch discovery call at end. Record and repurpose.",
                    deliverable: "First 2 weekly live events hosted",
                    hqTools: ["HQ Events", "HQ Email Reminders", "HQ Video Recording", "HQ Community"],
                    kpi: "30+ registrants; 15+ live attendees; 3+ discovery calls booked",
                    detailedSteps: [
                        "Choose recurring day/time: Friday 12pm works well for many coaches",
                        "Create event in HQ Events: '[Topic] Free Masterclass'",
                        "Topic ideas: 'The #1 Mistake Keeping You [Stuck]', '3 Steps to [Quick Win]', '[Framework] Explained'",
                        "Set up registration page in HQ with simple form",
                        "Promote: Email list, social media daily for 5 days before, community post",
                        "Set up HQ automated reminders: 24 hours before, 1 hour before, 'Starting now'",
                        "Structure: 5 min welcome, 25 min teaching (actionable value), 5 min Q&A, 5 min soft pitch for discovery call",
                        "Record via Zoom or HQ, upload replay to HQ Files",
                        "Post-event: Send replay + 'Book your free call' email within 2 hours",
                        "Repurpose: Create 3-5 short clips for social media"
                    ]
                },
                {
                    title: "Set Up Automated Text-Back for Lead Engagement",
                    description: "Instantly engage new leads with personal touch via SMS.",
                    action: "Enable HQ Automated Text-Back for new opt-ins. Send friendly, conversational text within 60 seconds of signup. Start conversation, ask qualifying question, offer discovery call link. Use SMS to increase show-up rate for booked calls.",
                    deliverable: "SMS automation active for all opt-ins",
                    hqTools: ["HQ Automated Text-Back", "HQ SMS Campaigns"],
                    kpi: "50%+ text reply rate; 15%+ book call from SMS conversation",
                    detailedSteps: [
                        "Go to HQ SMS Settings → Enable Automated Text-Back",
                        "Create initial text: 'Hey [First Name]! I just sent your [Lead Magnet] to your email 📧 Quick question - what's your biggest challenge with [topic] right now?'",
                        "When they reply: Engage conversationally, empathize with challenge, offer discovery call",
                        "Template reply: 'I hear you on [their challenge]. I've helped clients overcome exactly that. Want to jump on a quick 15-min call? I can share what's worked: [booking link]'",
                        "Set up appointment reminder texts: Day before + 1 hour before",
                        "Post-call follow-up text: 'Great talking today! Here's the proposal I mentioned: [link]'",
                        "Track conversations in HQ CRM",
                        "Keep texts conversational and personal, not robotic"
                    ]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Client Enrollment & Onboarding",
            weekDescription: "Close first paying clients and deliver exceptional onboarding.",
            icon: Award,
            dailyTime: "45-60 minutes + client delivery time",
            weeklyGoal: "3-5 paying clients enrolled; seamless onboarding experience",
            tasks: [
                {
                    title: "Create Coaching Proposal & Contract Templates",
                    description: "Develop professional agreements for each coaching tier.",
                    action: "Design branded proposal template including: Client goals, your framework approach, deliverables, timeline, investment/pricing, payment terms, testimonials. Create coaching agreement covering: Scope, duration, cancellation policy, confidentiality, results disclaimer. Store in HQ Templates.",
                    deliverable: "Proposal and contract templates ready",
                    hqTools: ["HQ Templates", "HQ Files", "HQ eSignature"],
                    kpi: "Proposals sent within 24 hours of discovery calls",
                    detailedSteps: [
                        "Create proposal template in Google Docs or HQ Templates",
                        "Structure: Cover page with their name, Problem summary (from discovery call), Solution (your framework), Deliverables (what's included), Investment, Next steps",
                        "Make it visual: Include framework graphic, client testimonials, your photo",
                        "Pricing section: Show full price and payment plan option (3-6 months)",
                        "Create contract covering: Services provided, Duration (3-6 months), Session frequency, Communication access, Payment terms, Cancellation (30-day notice), Confidentiality, No-guarantee disclaimer",
                        "Have attorney review contract template (one-time investment)",
                        "Upload to HQ Templates for easy customization",
                        "Use HQ eSignature for digital signing"
                    ]
                },
                {
                    title: "Set Up Payment Processing & Plans",
                    description: "Enable easy payment options including payment plans.",
                    action: "Configure HQ Payment Processing for coaching packages. Offer payment plans: Pay-in-full (10% discount) or 3-6 month installments. Set up recurring billing in HQ for payment plan clients. Automate payment receipts and failed payment follow-ups.",
                    deliverable: "Payment system configured for all tiers",
                    hqTools: ["HQ Payment Processing", "HQ Recurring Billing", "HQ Invoicing"],
                    kpi: "60%+ of clients choose payment plan option",
                    detailedSteps: [
                        "Connect Stripe or PayPal to HQ Payment Processing",
                        "Create payment options in HQ for each tier:",
                        "Premium 1-on-1: $4,500 paid in full OR $1,650/month x 3 months",
                        "Group Program: $1,497 paid in full OR $549/month x 3 months",
                        "Membership: $197/month recurring (cancel anytime)",
                        "Set up HQ Recurring Billing for payment plans (auto-charge monthly)",
                        "Create payment page for each tier with clear terms",
                        "Set up failed payment automation: Email + SMS if card declines",
                        "Send automated receipt via HQ Email after each payment",
                        "Test complete payment flow for all options"
                    ]
                },
                {
                    title: "Build Client Onboarding System",
                    description: "Create magical first experience that sets clients up for success.",
                    action: "Design onboarding sequence in HQ: Welcome packet (PDF with framework, expectations, prep work), onboarding call agenda, access to private community channel, first assignment. Automate delivery via HQ Email Automation triggered by payment. Make first 7 days extraordinary.",
                    deliverable: "Complete onboarding system automated",
                    hqTools: ["HQ Email Automation", "HQ Files", "HQ Community", "HQ Booking"],
                    kpi: "100% of clients complete onboarding; 5-star feedback",
                    detailedSteps: [
                        "Create 'Client Welcome Packet' PDF: Letter from you, What to expect, Your framework overview, First assignment, FAQs",
                        "Upload to HQ Files",
                        "Set up HQ automation: Trigger = Payment received → Send welcome email immediately",
                        "Welcome email: Excitement + expectations + welcome packet + schedule onboarding call",
                        "Day 1: Welcome packet + onboarding call booking link",
                        "Day 2: Reminder to book onboarding call + access to private HQ Community channel",
                        "Day 3: 'Complete your pre-work' email with first assessment",
                        "Create onboarding call agenda: Review goals, explain framework, set expectations, schedule first 3 sessions, answer questions (30 min)",
                        "Post-onboarding: Send summary email with action steps",
                        "Add all clients to private channel in HQ Community"
                    ]
                },
                {
                    title: "Create Private Client Community in HQ",
                    description: "Build exclusive space for paying clients to connect and get support.",
                    action: "Set up private HQ Community channel for coaching clients only. Create channels: Wins, Questions, Resources, Accountability. Post weekly prompts and facilitate peer support. This increases retention and adds value beyond 1-on-1 time.",
                    deliverable: "Private client community active",
                    hqTools: ["HQ Community", "HQ Member Management"],
                    kpi: "80%+ of clients active in community weekly",
                    detailedSteps: [
                        "Go to HQ Community → Create private group '[Your Name] Coaching Clients'",
                        "Set privacy: Invite-only, payment verification required",
                        "Create channels: #welcome, #wins (celebrate progress), #questions (peer + coach support), #resources (templates/tools), #accountability",
                        "Post welcome video explaining how to use community",
                        "Weekly ritual: Monday - Set weekly intentions, Wednesday - Mid-week check-in, Friday - Wins sharing",
                        "Encourage peer coaching: 'Answer each other's questions - you all have wisdom to share'",
                        "Post daily prompts: 'What's one win from today?', 'What are you working on this week?'",
                        "Monitor daily, respond to questions within 12 hours",
                        "Monthly: Host bonus group call for all clients (builds community)"
                    ]
                },
                {
                    title: "Launch Quick-Win Challenge to Generate Leads",
                    description: "Run free 5-7 day challenge to attract and pre-qualify prospects.",
                    action: "Create '[Specific Outcome] Challenge' - 5 days with daily email + action step. Use HQ to manage registrations, deliver daily content via email, and host in free community channel. Pitch discovery calls on final day. Make challenge valuable but show depth of full coaching.",
                    deliverable: "Challenge launched with 50+ participants",
                    hqTools: ["HQ Email Campaigns", "HQ Community", "HQ Events", "HQ Forms"],
                    kpi: "50+ challenge participants; 20%+ book discovery call",
                    detailedSteps: [
                        "Choose challenge topic: Solve one specific pain point in 5 days",
                        "Example: '5-Day Clarity Challenge', '7 Days to Better Boundaries', 'Confidence Reset Challenge'",
                        "Create registration page in HQ with form",
                        "Set up HQ Email sequence: 5 daily emails with action steps",
                        "Day 1: Introduction + Day 1 exercise, Day 2-4: Progressive exercises, Day 5: Celebration + 'Go deeper with coaching' pitch",
                        "Create free #challenge channel in HQ Community for participants",
                        "Promote challenge: Social media (2 weeks before), email list, paid ads (optional)",
                        "During challenge: Post daily in community, respond to submissions, build relationships",
                        "Final day: Invite to discovery call, offer challenge-only bonus",
                        "Track: Registrants, completion rate, calls booked, conversions"
                    ]
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Paid Advertising & Lead Scaling",
            weekDescription: "Test and optimize paid ads to scale client acquisition.",
            icon: TrendingUp,
            dailyTime: "30-60 minutes monitoring",
            weeklyGoal: "Profitable ad campaigns running; predictable lead flow established",
            tasks: [
                {
                    title: "Create Ad Creative Library",
                    description: "Develop high-converting ad assets for multiple campaigns.",
                    action: "Create 5 ad variations: (1) Video of you explaining transformation, (2) Client testimonial video, (3) Before/after transformation story, (4) Lead magnet value proposition, (5) Challenge invitation. Use HQ AI for ad copy. Save all to HQ Files.",
                    deliverable: "5 ad creatives ready to launch",
                    hqTools: ["HQ Ad Manager", "HQ Files", "HQ AI for copywriting"],
                    kpi: "Ad creative library with 5+ variations",
                    detailedSteps: [
                        "Video Ad 1 (You): Record 30-45s talking head - 'If you're struggling with [pain point], I can help. I've worked with [X] clients to [transformation]. Download my free guide: [link]'",
                        "Video Ad 2 (Testimonial): Ask a client to record 30s video sharing result",
                        "Image Ad 1: Your photo + text overlay with lead magnet offer",
                        "Image Ad 2: Before/after graphic showing transformation",
                        "Carousel Ad: 5 slides explaining your framework",
                        "Write ad copy using HQ AI: Hook (stop scroll), Problem (agitate), Solution (your offer), CTA (download/register)",
                        "Copy formula: 'Are you [pain point]? Most people try [common failed solution]. Here's what actually works: [your method]. Get the free guide: [link]'",
                        "Upload all assets to HQ Files organized by ad type"
                    ]
                },
                {
                    title: "Launch Lead Generation Ad Campaign",
                    description: "Drive qualified leads to your lead magnet via paid ads.",
                    action: "Use HQ Ad Manager to create Facebook/Instagram campaign. Start with $15/day budget. Target: Age, interests, behaviors matching ideal client. Objective: Lead generation to lead magnet page. Install HQ tracking pixel. Run for 7 days and measure CPL.",
                    deliverable: "Ad campaign live and tracked",
                    hqTools: ["HQ Ad Manager", "HQ Tracking Pixels", "HQ Analytics"],
                    kpi: "Cost per lead under $5; 10%+ opt-in to discovery call",
                    detailedSteps: [
                        "Go to HQ Ad Manager → Create new campaign 'Lead Magnet - [Month]'",
                        "Objective: Lead Generation or Traffic (to landing page)",
                        "Budget: $15/day ($105 for 7 days initial test)",
                        "Audience 1: Interest targeting - people interested in [coaching topic, self-help, personal development]",
                        "Demographics: Match your ideal client (age, gender, location)",
                        "Upload ad creative and copy from previous task",
                        "Link to HQ lead magnet landing page",
                        "Install HQ tracking pixel on landing page and thank-you page",
                        "Monitor daily: CPL (cost per lead), CTR (click rate), Landing page conversion",
                        "After 7 days: If CPL < $5 and leads are qualified, increase budget to $25-30/day"
                    ]
                },
                {
                    title: "Create Discovery Call Ad Campaign",
                    description: "Run ads directly to discovery call booking for qualified leads.",
                    action: "Launch separate campaign targeting warmer audience: Website visitors, video viewers, email list lookalikes. Objective: Conversions - Book Call. Higher budget per lead but better quality. Use testimonial and transformation-focused creative.",
                    deliverable: "Discovery call ad campaign active",
                    hqTools: ["HQ Ad Manager", "HQ Retargeting Pixels", "HQ Booking"],
                    kpi: "Cost per booked call under $25; 50%+ call show-up rate",
                    detailedSteps: [
                        "Create retargeting audiences in HQ: (1) Watched 50%+ of your video ads, (2) Visited website, (3) Downloaded lead magnet but didn't book call",
                        "Create Lookalike audience: Upload email list to HQ Ad Manager → Create 1% lookalike",
                        "Ad creative: Use client testimonial or transformation story",
                        "Ad copy: 'Ready to [achieve transformation]? Book a free 30-min strategy call and I'll show you exactly how to [outcome]. Limited spots available.'",
                        "Link directly to HQ Booking calendar (not landing page)",
                        "Budget: $20/day for retargeting",
                        "Track: Cost per booking, show-up rate, close rate",
                        "Send confirmation email + SMS immediately via HQ",
                        "If cost per booking < $25 and calls are qualified, scale budget"
                    ]
                },
                {
                    title: "Implement Retargeting & Nurture Ads",
                    description: "Stay visible to people who engaged but didn't convert.",
                    action: "Create retargeting campaign showing different content to: (1) Landing page visitors who didn't opt-in - show social proof, (2) Lead magnet downloaders - show client results and discovery call offer, (3) Discovery call no-shows - offer to reschedule. Use HQ to manage all audiences and tracking.",
                    deliverable: "3 retargeting campaigns active",
                    hqTools: ["HQ Ad Manager", "HQ Audience Builder", "HQ Analytics"],
                    kpi: "Retargeting converts 3-5x better than cold traffic",
                    detailedSteps: [
                        "Create custom audiences in HQ Ad Manager:",
                        "Audience 1: Visited lead magnet page but didn't submit form (past 14 days)",
                        "Audience 2: Downloaded lead magnet but didn't book call (past 30 days)",
                        "Audience 3: Booked discovery call but didn't show up (past 7 days)",
                        "Ad for Audience 1: Show testimonials + '100+ clients transformed'",
                        "Ad for Audience 2: 'You downloaded [lead magnet]. Ready for personalized help? Book free call.'",
                        "Ad for Audience 3: 'Missed our call? No problem - reschedule here: [link]'",
                        "Budget: $5/day per audience ($15/day total)",
                        "Track separately in HQ Analytics",
                        "Winning formula: Retargeting usually converts at 5-10% vs. 1-2% cold traffic"
                    ]
                },
                {
                    title: "Build Lookalike Audiences for Scaling",
                    description: "Find more people similar to your best clients.",
                    action: "In HQ Ad Manager, create lookalike audiences based on: (1) Email list, (2) Website purchasers, (3) Discovery call bookers. Start with 1% lookalike. Test these audiences against interest-based targeting. Scale what performs better.",
                    deliverable: "3 lookalike audiences created and tested",
                    hqTools: ["HQ Ad Manager", "HQ Audience Builder"],
                    kpi: "Lookalikes outperform interest targeting by 20%+",
                    detailedSteps: [
                        "Go to HQ Ad Manager → Audiences → Create Lookalike",
                        "Source 1: Upload email list (minimum 100 emails for Facebook)",
                        "Source 2: Website visitors who booked call (install HQ pixel first)",
                        "Source 3: Past clients (if you have any)",
                        "Create 1% lookalike for each source (most similar)",
                        "Launch test campaign: $10/day to each lookalike audience",
                        "Compare performance: CPL, lead quality, conversion to call",
                        "After 7 days: Identify best performer and increase budget",
                        "Later: Create 2% and 5% lookalikes to expand reach"
                    ]
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Group Coaching Program Launch",
            weekDescription: "Scale your impact and income with group program.",
            icon: Users,
            dailyTime: "60-90 minutes + program delivery",
            weeklyGoal: "Group program sold with 8-12 participants; $8K-15K revenue",
            tasks: [
                {
                    title: "Design 12-Week Group Coaching Curriculum",
                    description: "Create structured program based on your signature framework.",
                    action: "Map 12-week program to your framework pillars. Each week: Pre-work assignment, 60-min group call (teach + hot seats), implementation worksheet, community support. Create curriculum outline, session agendas, and participant workbook. Price at $997-1,497.",
                    deliverable: "Complete 12-week curriculum designed",
                    hqTools: ["HQ Course Builder", "HQ Files", "HQ Templates"],
                    kpi: "12 session agendas completed; workbook drafted",
                    detailedSteps: [
                        "Map your framework to 12 weeks: Week 1-2: Pillar 1, Week 3-4: Pillar 2, etc.",
                        "For each week: Define learning outcome, pre-work (worksheet or video), group call topic, action step",
                        "Week 1 example: 'Clarity on Current State' - Pre-work: Complete assessment, Call: Share insights + teach framework overview, Hot seats: 2-3 members, Action: Set 90-day goal",
                        "Create participant workbook: 12 weekly worksheets with exercises, space for notes, action plans",
                        "Design in Google Docs or Canva, upload to HQ Files",
                        "Create session outline template: Welcome (5min), Teaching (20min), Hot seats (25min), Q&A (10min)",
                        "Decide on pricing: $1,197 or $447/month x 3",
                        "Save all curriculum documents to HQ Course Builder or Files"
                    ]
                },
                {
                    title: "Create Group Program Sales Page in HQ",
                    description: "Build compelling page that enrolls participants.",
                    action: "Use HQ Website Builder to create detailed sales page: Headline addressing transformation, your story/credibility, program overview (12 weeks), what's included, client results, FAQ, pricing options, enrollment deadline, guarantee. Include video of you explaining program.",
                    deliverable: "Professional group program sales page",
                    hqTools: ["HQ Website Builder", "HQ Video Hosting", "HQ Payment Integration"],
                    kpi: "Sales page converting at 15-25% of visitors",
                    detailedSteps: [
                        "Go to HQ Website Builder → Create page 'Group Coaching Program'",
                        "Section 1: Bold headline - 'Transform [Specific Outcome] in 12 Weeks'",
                        "Section 2: 'Is This You?' - List 5-7 pain points/frustrations ideal clients face",
                        "Section 3: 'Introducing [Program Name]' - Overview of transformation journey",
                        "Section 4: What's included - 12 group calls, workbook, community access, bonus resources",
                        "Section 5: Curriculum - Week-by-week breakdown showing progression",
                        "Section 6: Results - Client testimonials and before/after stories",
                        "Section 7: About you - Credentials and why you created this",
                        "Section 8: FAQ - Address common questions and objections",
                        "Section 9: Pricing - Show full price and payment plan, enrollment deadline",
                        "Section 10: Guarantee - 30-day money-back if not satisfied",
                        "Record 3-5 min video explaining program and embed at top",
                        "Add payment buttons throughout page linking to HQ checkout"
                    ]
                },
                {
                    title: "Execute Group Program Launch Campaign",
                    description: "Promote program to email list and audience over 2 weeks.",
                    action: "Run 14-day launch: 7 days content/value, 7 days enrollment open. Daily emails via HQ, social posts, live events. Use HQ to manage: Early-bird pricing, countdown timers, waitlist, payment processing. Create urgency with limited spots (cap at 12-15 for intimacy).",
                    deliverable: "Launch campaign executed with 8-12 enrollments",
                    hqTools: ["HQ Email Campaigns", "HQ Countdown Timers", "HQ Payment", "HQ Waitlist"],
                    kpi: "8-12 participants enrolled; $8K-18K revenue",
                    detailedSteps: [
                        "Pre-launch (7 days): Send value emails building to launch - testimonials, teach mini-lessons, tease program",
                        "Day 1: Launch announcement email + social - 'Doors open! Early bird $997 (first 5)'",
                        "Day 2-3: Share curriculum details, what's included, who it's for",
                        "Day 4: Host live Q&A about program via HQ Events",
                        "Day 5: Share more client results, address objections",
                        "Day 6: 'Last 48 hours for early bird pricing' - urgency",
                        "Day 7: 'Final day - regular pricing $1,197 starts tomorrow'",
                        "Set up in HQ: Limit enrollment to 12 spots, show 'X spots remaining'",
                        "Use HQ countdown timer on sales page",
                        "Create waitlist in HQ for people who miss enrollment",
                        "Process payments immediately via HQ, send welcome sequence"
                    ]
                },
                {
                    title: "Set Up Group Program Delivery Infrastructure",
                    description: "Organize systems for smooth program delivery.",
                    action: "Create private HQ Community channel for cohort. Set up weekly call schedule in HQ Booking (same day/time for 12 weeks). Upload all resources to HQ Files (organized by week). Create participant tracker in HQ to monitor attendance, progress, and engagement.",
                    deliverable: "Complete delivery system ready",
                    hqTools: ["HQ Community", "HQ Booking", "HQ Files", "HQ Member Tracking"],
                    kpi: "All 12 calls scheduled; resources uploaded and organized",
                    detailedSteps: [
                        "Create private HQ Community group '[Program Name] - [Month/Year] Cohort'",
                        "Set up channels: #announcements, #weekly-wins, #questions, #resources, #accountability-partners",
                        "Schedule all 12 calls in HQ Booking: Same day/time weekly (e.g., Tuesdays 7pm EST)",
                        "Send calendar invites with Zoom links to all participants",
                        "Set up automated reminders via HQ: 24 hours + 1 hour before each call",
                        "Upload to HQ Files: Welcome packet, all 12 weekly workbooks, bonus resources",
                        "Create tracker: Participant name, email, payment status, call attendance, progress notes",
                        "Automate: Post-call survey via HQ Forms to gather feedback weekly"
                    ]
                },
                {
                    title: "Create Upsell Path to 1-on-1 Coaching",
                    description: "Convert high-performing group members to premium clients.",
                    action: "Identify top performers and highly engaged group members. Offer exclusive invitation to continue with 1-on-1 coaching at special 'graduate rate'. Use HQ to track engagement and automate outreach to qualified members at week 8-10.",
                    deliverable: "Upsell system converting 20-30% of group",
                    hqTools: ["HQ CRM", "HQ Email Automation", "HQ Booking"],
                    kpi: "2-4 group members upgrade to 1-on-1 coaching",
                    detailedSteps: [
                        "Track in HQ: Call attendance, community activity, worksheet completion, breakthroughs shared",
                        "Identify top 30% of participants (most engaged, best results)",
                        "Week 8: Send personal email to top performers: 'I've loved watching your progress. Want to go even deeper? I have 3 spots for 1-on-1 coaching.'",
                        "Offer graduate rate: $3,500 for 3 months (vs. normal $4,500)",
                        "Book 20-min enrollment calls via HQ Booking",
                        "On call: Review their progress, vision-cast next level, present 1-on-1 offer",
                        "Use HQ CRM to track: Who you invited, response, enrollment status",
                        "Goal: 25-30% of group (3-4 people) enroll in premium coaching"
                    ]
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Content Marketing & Authority Building",
            weekDescription: "Establish thought leadership through valuable content.",
            icon: Sparkles,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Published on external platforms; authority positioning advanced",
            tasks: [
                {
                    title: "Start Weekly Blog/Article on HQ Website",
                    description: "Create SEO-optimized content that attracts organic leads.",
                    action: "Publish weekly 800-1200 word article on your HQ blog. Topics based on client FAQs, framework pillars, transformation stories. Optimize for SEO using HQ tools. Each article ends with lead magnet CTA. Repurpose into social content, newsletter, and video.",
                    deliverable: "4 blog articles published",
                    hqTools: ["HQ Website Blog", "HQ SEO Tools", "HQ AI for drafting"],
                    kpi: "Blog driving 50+ organic visitors/month; 10%+ opt-in rate",
                    detailedSteps: [
                        "Brainstorm topics: Common client questions, framework breakdowns, 'How to [solve problem]'",
                        "Article 1: 'The #1 Reason [Ideal Client] Struggles with [Problem] (and how to fix it)'",
                        "Use HQ AI: 'Write outline for blog post about [topic] for [ideal client]'",
                        "Write article: Hook intro, explain problem, share solution/framework, include story/example, clear CTA",
                        "Optimize with HQ SEO Tools: Target keyword, meta description, alt text on images",
                        "Include lead magnet CTA mid-article and at end",
                        "Add internal links to your services pages",
                        "Publish on HQ blog, share on social media",
                        "Repurpose: Turn into 5 social posts, 1 newsletter, 1 video",
                        "Track in HQ Analytics: Page views, time on page, opt-ins from article"
                    ]
                },
                {
                    title: "Pitch & Publish Guest Articles on External Platforms",
                    description: "Reach new audiences through established platforms.",
                    action: "Write 2-3 guest articles for Medium, LinkedIn, Thrive Global, or industry blogs your ideal clients read. Include bio with link to lead magnet. Use HQ Analytics to track traffic from each publication. Build backlinks to HQ website.",
                    deliverable: "2 guest articles published",
                    hqTools: ["HQ AI for drafting", "HQ Analytics with UTM tracking"],
                    kpi: "Each guest post drives 30-50 opt-ins",
                    detailedSteps: [
                        "Research where ideal clients consume content: Medium publications, LinkedIn, niche blogs",
                        "Check guest post guidelines for each platform",
                        "Pitch topics that provide unique value: Controversial take, research-backed insight, transformation story",
                        "Write article addressing specific pain point with actionable advice",
                        "Include subtle mentions of your framework or approach",
                        "Bio: '[Your Name] is a [niche] coach who helps [ideal client] achieve [transformation]. Download the free [lead magnet]: [link]'",
                        "Use HQ UTM Builder: Create tracked link (source=Medium, medium=guest-post, campaign=article-title)",
                        "Publish on LinkedIn (owns platform), submit to Medium publications",
                        "Promote: Share to your social, email list",
                        "Track referral traffic in HQ Analytics"
                    ]
                },
                {
                    title: "Launch Weekly LinkedIn Thought Leadership",
                    description: "Build authority on LinkedIn where decision-makers and clients are.",
                    action: "Post 3-5 times per week on LinkedIn: Long-form posts (1000+ chars) sharing insights, client stories, hot takes on coaching. Engage with others' content daily. Connect with 10 ideal clients daily. Use HQ AI to draft, personalize heavily. Mention lead magnet in comments.",
                    deliverable: "Consistent LinkedIn presence for 7 days",
                    hqTools: ["HQ AI for content ideas", "HQ CRM to track connections"],
                    kpi: "500+ new LinkedIn followers; 20+ discovery calls booked from LinkedIn",
                    detailedSteps: [
                        "Optimize LinkedIn profile: Professional headshot, headline with niche + transformation, featured section with lead magnet",
                        "Post schedule: Monday - Motivation/Mindset, Wednesday - How-to/Tip, Friday - Story/Result",
                        "Long-form post structure: Hook first line (stop scroll), Story or stat, Key insight, Actionable advice, Engage with question",
                        "Use HQ AI: 'Generate 5 LinkedIn post ideas for life coach helping [niche] with [topics]'",
                        "Personalize heavily - add your voice, stories, unique perspective",
                        "Engage daily: Comment on 10 posts from ideal clients (genuine, thoughtful comments)",
                        "Connection strategy: Send 10 personalized connection requests daily to ideal clients",
                        "When post gets engagement: Comment back, DM most engaged people, offer discovery call",
                        "Track in HQ CRM: New connections, conversations, calls booked"
                    ]
                },
                {
                    title: "Pitch Yourself to Podcasts as Guest Expert",
                    description: "Leverage other audiences by being interviewed.",
                    action: "Research 30 podcasts where your ideal client listens. Craft personalized pitches offering 3 valuable topic ideas. Use HQ CRM to track outreach. Prepare talking points and bio. Goal: Book 3-5 podcast interviews. Always include lead magnet link in show notes.",
                    deliverable: "3 podcast interviews booked",
                    hqTools: ["HQ CRM", "HQ Email Templates", "HQ Files for media kit"],
                    kpi: "Each podcast appearance drives 20-50 new leads",
                    detailedSteps: [
                        "Search: Apple Podcasts for '[your niche] podcast', Google '[topic] podcast'",
                        "Target shows with 500-10K downloads (better response than huge shows)",
                        "Create spreadsheet: Podcast name, host, email, audience size, pitch angle",
                        "Build media kit in HQ Files: Headshot, bio (3 lengths), topic ideas, past interviews",
                        "Craft pitch email: Personalize (reference specific episode), offer value, suggest 3 topics, make it easy",
                        "Example topics: 'The #1 Mistake [Audience] Makes with [Problem]', 'My Framework for [Transformation]', '[Controversial Take] on [Topic]'",
                        "Send 5 pitches per day, track in HQ CRM",
                        "For acceptances: Prepare thoroughly, deliver massive value, ask for lead magnet mention in show notes",
                        "Post-interview: Thank host, share episode, track traffic from show in HQ Analytics"
                    ]
                },
                {
                    title: "Host Monthly Free Masterclass Series",
                    description: "Create recurring event that demonstrates expertise and generates leads.",
                    action: "Launch 'Monthly [Topic] Masterclass' - 60-minute free training on specific aspect of your framework. Use HQ Events for registration and reminders. Deliver exceptional value (60-40 rule: 60% teaching, 40% pitch). Offer special pricing to attendees who enroll immediately.",
                    deliverable: "First masterclass with 50+ registrants",
                    hqTools: ["HQ Events", "HQ Email Campaigns", "HQ Landing Pages", "HQ Video"],
                    kpi: "50+ registrants; 25+ live attendees; 3-5 enrollments",
                    detailedSteps: [
                        "Choose masterclass topic: Solve one specific problem using part of your framework",
                        "Create event page in HQ Events: Compelling title, what they'll learn (5 bullets), who it's for, CTA to register",
                        "Set up registration form: Name, email, #1 challenge",
                        "Promotion timeline: 14 days out - announce to email list, 10 days - social posts, 7 days - email reminder, 3 days - final push, Day of - last chance",
                        "Send HQ automated reminders: 3 days before, 1 day before, 1 hour before, 'starting now'",
                        "Masterclass structure: Welcome (5min), Teach framework concept (35min), Q&A (15min), Pitch coaching program (5min)",
                        "Special offer: 'Enroll today and save $200 + get bonus 1-on-1 call with me'",
                        "Follow-up sequence in HQ: Send replay + offer to registrants, special email to attendees, personal outreach to most engaged",
                        "Make it monthly recurring event"
                    ]
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Client Results & Social Proof System",
            weekDescription: "Document transformations and leverage for marketing.",
            icon: Star,
            dailyTime: "30-60 minutes",
            weeklyGoal: "10+ testimonials collected; case studies created; results visible everywhere",
            tasks: [
                {
                    title: "Implement Client Success Tracking System",
                    description: "Measure and document client transformations systematically.",
                    action: "Create intake and progress tracking in HQ. Measure: Before state (quantify pain points), After state (quantify results), Timeline to results. Capture metrics, testimonials, photos if applicable. Use HQ Forms for regular check-ins. Build case study library.",
                    deliverable: "Client tracking system with first 3-5 case studies",
                    hqTools: ["HQ Forms", "HQ CRM", "HQ Files", "HQ Analytics"],
                    kpi: "Track 100% of clients; 80%+ measurable results",
                    detailedSteps: [
                        "Create 'Client Intake Form' in HQ Forms: Current challenges (rate 1-10), goals, where they are now vs. where they want to be",
                        "Create 'Progress Check-In Form': Monthly or every 3 sessions - rate progress, wins achieved, challenges remaining",
                        "Set up HQ automation: Send check-in form automatically every 30 days",
                        "Track metrics in HQ CRM: Energy level, confidence, specific KPIs (hours worked, income, relationships, etc.)",
                        "Mid-program: Ask for preliminary testimonial",
                        "End of program: Full testimonial + permission to create case study",
                        "Case study template: Client background, starting state, framework applied, results achieved, testimonial",
                        "Aim for quantifiable results: 'Reduced work hours from 70 to 45/week while increasing revenue 30%'",
                        "Save all case studies to HQ Files, upload best to website"
                    ]
                },
                {
                    title: "Create Video Testimonial Library",
                    description: "Collect powerful video social proof from happy clients.",
                    action: "Reach out to clients with best results. Offer free bonus session in exchange for 2-minute video testimonial. Provide question prompts. Record via Zoom or have them self-record. Edit into 30-60s clips. Upload to HQ Video Hosting. Use across all marketing.",
                    deliverable: "5+ video testimonials collected",
                    hqTools: ["HQ Video Hosting", "HQ Files", "HQ Booking for recording sessions"],
                    kpi: "5 video testimonials; each 45-90 seconds",
                    detailedSteps: [
                        "Identify 10 clients with great results",
                        "Send invitation: 'Your transformation has been incredible! Would you be willing to share your story on video? I'll give you a free bonus session as a thank-you'",
                        "Provide prompts: Where were you before coaching? What changed? What specific results did you achieve? Who should work with me?",
                        "Option 1: Book via HQ Booking to record together on Zoom",
                        "Option 2: Send recording instructions for self-recording on phone",
                        "Edit videos: Cut to best 45-90s, add captions, include your logo/branding",
                        "Upload to HQ Video Hosting",
                        "Use in: Sales pages, social media ads, email campaigns, website homepage",
                        "Create testimonial carousel for Instagram with video clips"
                    ]
                },
                {
                    title: "Build Results Portfolio on HQ Website",
                    description: "Showcase client transformations prominently on all pages.",
                    action: "Create 'Results' or 'Success Stories' page in HQ Website Builder featuring all case studies and testimonials. Add testimonial sections to homepage, services pages, and sales pages. Include before/after metrics, photos (with permission), and video testimonials. Update constantly as you get new results.",
                    deliverable: "Results page live with 5+ transformations",
                    hqTools: ["HQ Website Builder", "HQ Video Hosting", "HQ Image Gallery"],
                    kpi: "Testimonial sections on 5+ pages; conversion rate increase",
                    detailedSteps: [
                        "Create new page in HQ: 'Client Transformations' or 'Success Stories'",
                        "For each case study: Client photo (optional), name (or initials), before/after quote, specific metrics, full testimonial, video if available",
                        "Design testimonial card template: Client quote, result achieved, star rating, photo",
                        "Add to homepage: Carousel of 5-7 best testimonials rotating",
                        "Add to services pages: Relevant testimonials for each tier",
                        "Add to sales pages: Video testimonials embedded",
                        "Create social proof notification: 'Sarah just enrolled in coaching!' (if HQ supports)",
                        "Measure impact: Compare conversion rates before/after adding testimonials"
                    ]
                },
                {
                    title: "Launch Client Referral Program",
                    description: "Turn happy clients into your best salespeople.",
                    action: "Create referral program: Current clients who refer someone get $200 credit or free bonus month. Set up HQ Affiliate tracking for clients (or manual tracking in CRM). Provide shareable assets: Personal link, social graphics, email template. Make it easy and rewarding.",
                    deliverable: "Referral program active with clients",
                    hqTools: ["HQ Affiliate Program", "HQ CRM", "HQ Templates"],
                    kpi: "30%+ of clients make at least one referral",
                    detailedSteps: [
                        "Design program: Refer new client → Get $200 credit toward next month OR free bonus 1-on-1 session",
                        "If HQ has Affiliate Program: Set up tracking links for each client",
                        "If not: Use HQ CRM to manually track referrals (who referred whom)",
                        "Create referral toolkit in HQ Files: Personal referral link, email template clients can send, social media caption, 'Why I love [Your Name]' graphic",
                        "Announce to clients: Email + mention on group calls",
                        "Make it personal: 'The best compliment is a referral. Know someone who needs support? Send them my way and you'll get [reward]'",
                        "Track in HQ: Client name, who they referred, referral status, reward issued",
                        "Thank and reward immediately when referral enrolls"
                    ]
                },
                {
                    title: "Create Content Hub of Free Resources",
                    description: "Build library of valuable content that positions you as expert.",
                    action: "Develop resource center in HQ: Free guides, worksheets, templates, video trainings, podcast episodes. Gate some resources (email required), make others freely shareable. Organize by topic/framework pillar. Update monthly. This becomes your content moat.",
                    deliverable: "Resource hub with 10+ free resources",
                    hqTools: ["HQ Website Builder", "HQ Files", "HQ Forms for gated content"],
                    kpi: "Resource hub drives 100+ opt-ins/month",
                    detailedSteps: [
                        "Create 'Free Resources' page in HQ Website Builder",
                        "Organize by framework pillar or topic",
                        "Create 10 resources: 3 worksheets, 3 short guides (PDF), 2 video trainings, 2 templates/checklists",
                        "Use HQ AI to generate outlines, then customize with your approach",
                        "Some gated (require email): Main lead magnet, comprehensive guides",
                        "Some open (freely shareable): Simple checklists, quote graphics, short tips",
                        "Upload all to HQ Files",
                        "Create opt-in forms in HQ for gated resources",
                        "Each resource links to discovery call booking",
                        "Promote one resource weekly on social: 'New free resource: [link]'",
                        "Track downloads and opt-ins in HQ Analytics"
                    ]
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Self-Paced Course & Membership Launch",
            weekDescription: "Create scalable offer that serves clients 24/7.",
            icon: Rocket,
            dailyTime: "90-120 minutes (creation week)",
            weeklyGoal: "Course/membership launched with 20-30 members at $97-197/month",
            tasks: [
                {
                    title: "Create Self-Paced Coaching Course",
                    description: "Transform your framework into structured online course.",
                    action: "Build 8-12 module course in HQ Course Platform. Each module: 10-15 min video lesson, PDF workbook, action step, quiz/reflection. Structure mirrors your framework. Include lifetime access or deliver weekly. Price at $297-497 one-time or $97/month membership with all courses.",
                    deliverable: "Complete course curriculum ready",
                    hqTools: ["HQ Course Builder", "HQ Video Hosting", "HQ Files"],
                    kpi: "Course created with 8-12 modules; 10+ students enrolled",
                    detailedSteps: [
                        "Outline course: 8-12 modules matching framework pillars",
                        "Module structure: Welcome video (2min), Teaching video (10-15min), Worksheet (PDF), Action step, Reflection questions",
                        "Record all videos in 1-2 batch sessions: Script outline (don't over-script), good lighting and audio, simple background",
                        "Create workbooks: One per module with exercises, space for notes, action planning",
                        "Upload to HQ Course Builder: Add videos, attach PDFs, create module descriptions",
                        "Set up drip schedule: Release 1 module per week OR give all access immediately",
                        "Create course sales page in HQ: What they'll learn, transformation promise, curriculum overview, testimonials, pricing",
                        "Pricing: $397 one-time OR $97/month membership with course included",
                        "Connect HQ payment processing",
                        "Test: Go through course yourself, fix any issues"
                    ]
                },
                {
                    title: "Build Monthly Membership Community",
                    description: "Create recurring revenue with ongoing support and resources.",
                    action: "Launch membership in HQ Community: Monthly Q&A call, access to all courses, resource library, peer support, monthly themes. Price at $97-197/month. Offer founding member rate. Use HQ Recurring Billing. Provide immediate value to prevent cancellations.",
                    deliverable: "Membership launched with 15-25 founding members",
                    hqTools: ["HQ Community", "HQ Subscription/Recurring Billing", "HQ Video Hosting"],
                    kpi: "20+ members; 90%+ retention month-over-month",
                    detailedSteps: [
                        "Create membership structure: What members get monthly",
                        "Included: Access to self-paced course, Monthly live Q&A (60min), Monthly new training video, Resource library, Private community, Monthly coaching prompts/exercises",
                        "Set up in HQ: Create subscription product at $147/month",
                        "Founding member offer: First 25 members pay $97/month forever",
                        "Create members-only HQ Community group",
                        "Channels: #intros, #wins, #questions, #monthly-theme, #resources",
                        "Schedule first monthly Q&A via HQ Events",
                        "Launch promotion: Email sequence (5 emails over 7 days), social posts, webinar pitch",
                        "Onboarding: Welcome video, community orientation, first month calendar",
                        "Retention strategy: Deliver consistent value, engage daily, monthly themes keep it fresh"
                    ]
                },
                {
                    title: "Create Certification or Train-the-Coach Program",
                    description: "Scale your methodology by certifying other coaches.",
                    action: "Design certification program teaching others your framework. 8-12 week program with training, practice, assessment, certification. Price at $2,000-5,000. Use HQ to manage enrollment, deliver content, track progress, issue certificates. Creates additional revenue and multiplies impact.",
                    deliverable: "Certification program outlined (launch next quarter)",
                    hqTools: ["HQ Course Builder", "HQ Community", "HQ Certification System"],
                    kpi: "Program outlined; launch plan created for Q2",
                    detailedSteps: [
                        "Define who you'd certify: Other coaches, practitioners, leaders wanting to use your method",
                        "Curriculum: 10 weeks teaching framework + 2 weeks practice/assessment",
                        "Week-by-week: Deep dive into each framework pillar, how to coach using it, practice sessions, feedback",
                        "Certification requirements: Complete all modules, submit 3 practice session recordings, pass assessment, practice hours logged",
                        "Pricing: $3,997 or $1,497/month x 3",
                        "Benefits: Licensed to use framework, marketing materials, ongoing support community, listed on your website as certified",
                        "Build in HQ Course Platform: Video lessons, downloadable resources, practice templates",
                        "Create private HQ Community for certified coaches",
                        "Plan launch for next quarter: For now, outline and validate with pilot group"
                    ]
                },
                {
                    title: "Develop Coaching Resources & Templates",
                    description: "Create sellable resources and tools for your niche.",
                    action: "Build toolkit of templates, worksheets, guides that clients and non-clients can purchase. Examples: Goal-setting workbook, habit tracker, journaling prompts, session prep templates. Price at $27-97 each or bundle. Sell via HQ eCommerce. Creates passive income stream.",
                    deliverable: "3 digital products created and for sale",
                    hqTools: ["HQ eCommerce", "HQ Files", "HQ Payment"],
                    kpi: "3 products listed; 10+ sales in first week",
                    detailedSteps: [
                        "Brainstorm digital products from your framework and client needs",
                        "Product 1: '[Framework] Workbook' - 20-page PDF with exercises for each pillar ($37)",
                        "Product 2: '90-Day [Transformation] Planner' - Daily planning + tracking pages ($27)",
                        "Product 3: '[Niche] Template Bundle' - 10 templates for common scenarios ($47)",
                        "Create products in Canva or Google Docs - professional design",
                        "Set up in HQ eCommerce: Upload files, write product descriptions, set pricing",
                        "Create mini sales page for each product highlighting benefits",
                        "Bundle offer: All 3 products for $97 (vs $111 separate)",
                        "Promote: Email announcement, social posts, upsell to course/membership buyers",
                        "Deliver instantly via HQ automation after purchase"
                    ]
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Strategic Partnerships & Collaborations",
            weekDescription: "Leverage partnerships to expand reach and credibility.",
            icon: Users,
            dailyTime: "60-90 minutes",
            weeklyGoal: "3+ active partnerships driving referrals and collaborative offers",
            tasks: [
                {
                    title: "Identify & Reach Out to Complementary Professionals",
                    description: "Build referral network with therapists, consultants, other coaches.",
                    action: "Create list of 20 professionals who serve same audience but different service (therapists, nutritionists, business consultants, etc.). Propose reciprocal referral relationship. Use HQ CRM to manage partnerships. Set up system to refer clients back and forth.",
                    deliverable: "5 referral partners secured",
                    hqTools: ["HQ CRM", "HQ Email", "HQ Tracking for referrals"],
                    kpi: "5 partnerships; 10+ referrals received in first month",
                    detailedSteps: [
                        "Identify complementary services: If you're life coach, partner with therapist, nutritionist, financial advisor, career coach",
                        "Find professionals: LinkedIn search, local networking groups, online communities",
                        "Craft partnership email: Introduce yourself, explain mutual benefit, propose coffee chat",
                        "Coffee chat agenda: Learn about each other, discuss ideal clients, agree on referral process",
                        "Formalize: Create simple referral agreement - when/how to refer, compensation (if any), communication",
                        "Create referral process in HQ: When client needs [service], send to partner with intro email",
                        "Track in HQ CRM: Partner name, contact, clients referred out, clients referred in, status",
                        "Stay in touch: Monthly check-in, share updates, express gratitude for referrals"
                    ]
                },
                {
                    title: "Co-Create Group Program with Partner",
                    description: "Combine expertise for unique collaborative offering.",
                    action: "Partner with complementary expert to create joint program. Example: Life coach + nutritionist = 'Holistic Wellness Program', Life coach + business consultant = 'Entrepreneur Breakthrough Program'. Split revenue 50/50. Use HQ to manage joint enrollment and delivery.",
                    deliverable: "Joint program designed and marketed",
                    hqTools: ["HQ Course Builder", "HQ Community", "HQ Payment splitting"],
                    kpi: "Joint program with 10+ enrollments; $5K+ revenue each",
                    detailedSteps: [
                        "Choose partner with aligned values and complementary expertise",
                        "Design program: 8-12 weeks, alternate weeks teaching (you teach week 1, partner teaches week 2, etc.)",
                        "Example: 10-Week 'Mind + Body Transformation' - Weeks 1,3,5,7,9: Life coaching, Weeks 2,4,6,8,10: Nutrition coaching",
                        "Price: $1,497-1,997 (split 50/50 after expenses)",
                        "Create joint sales page in HQ: Both bios, complementary approach, full curriculum",
                        "Set up payment in HQ with revenue split",
                        "Launch together: Email both lists, co-host webinar, split marketing effort",
                        "Deliver in shared HQ Community group",
                        "Creates value: Clients get 2 experts for less than cost of hiring separately"
                    ]
                },
                {
                    title: "Host Joint Webinar with Influencer/Expert",
                    description: "Tap into someone else's established audience.",
                    action: "Partner with someone with larger audience (but complementary, not competing). Co-host free webinar or IG Live. They bring audience, you provide content. Capture registrants in HQ, pitch your coaching at end, share revenue if partner wants. Aim for 200+ registrants from partner promotion.",
                    deliverable: "Joint webinar with 100+ attendees",
                    hqTools: ["HQ Events", "HQ Email Campaigns", "HQ Analytics"],
                    kpi: "100+ attendees; 50+ new leads; 3-5 discovery calls booked",
                    detailedSteps: [
                        "Identify potential partners: Authors, podcasters, influencers, established coaches in adjacent niche",
                        "Pitch: 'I'd love to co-host a free training for your audience on [topic]. You bring the audience, I deliver the value. Thoughts?'",
                        "Agree on: Topic, format (webinar/IG Live), date, promotion responsibilities, any revenue split",
                        "Create event in HQ Events with registration form (capture all attendees)",
                        "Both promote: Partner emails their list + social, you do same",
                        "Webinar structure: Partner introduces you (5min), You teach (40min), Joint Q&A (10min), Your CTA (5min)",
                        "During event: Provide massive value, build credibility",
                        "CTA: Offer discovery call + special bonus for webinar attendees only",
                        "Follow-up: HQ email sequence to all registrants, personal outreach to attendees",
                        "Track: New leads, calls booked, revenue generated from partnership"
                    ]
                },
                {
                    title: "Join and Contribute to Professional Directories",
                    description: "Get listed where potential clients search for coaches.",
                    action: "Create profiles on: Psychology Today (if licensed), Noomii, Coach.me, BetterUp, LinkedIn ProFinder, local directories. Optimize each profile with keywords, testimonials, clear niche. Link to HQ website and booking calendar. Respond to inquiries within 2 hours.",
                    deliverable: "Listed on 5+ coach directories",
                    hqTools: ["HQ CRM to track directory leads"],
                    kpi: "Directories generate 3-5 qualified leads/month",
                    detailedSteps: [
                        "Research directories relevant to your niche: General coaching directories, industry-specific, local listings",
                        "Create comprehensive profiles: Professional photo, compelling bio, niche statement, services offered, pricing range, testimonials",
                        "Optimize with keywords: Search how clients find coaches, use those terms",
                        "Link to HQ booking calendar for easy scheduling",
                        "Add to profiles: Free lead magnet, upcoming webinars",
                        "Set up notification: Get alerted immediately when inquiry comes in",
                        "Track in HQ CRM: Which directories send quality leads, conversion rate by source",
                        "Respond fast: Within 2 hours increases booking rate significantly",
                        "Update profiles quarterly with new testimonials and offerings"
                    ]
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Client Retention & Ascension",
            weekDescription: "Keep clients longer and upgrade them to higher tiers.",
            icon: Heart,
            dailyTime: "30-45 minutes",
            weeklyGoal: "Client retention system built; 3+ clients extended or upgraded",
            tasks: [
                {
                    title: "Implement Client Check-In & Feedback System",
                    description: "Proactively monitor client satisfaction and progress.",
                    action: "Use HQ Forms to create monthly client satisfaction survey: Progress rating, what's working, challenges, suggestions. Set up HQ automation to send. Review responses and take action. Schedule quarterly 'State of Coaching' calls to discuss progress and continuation.",
                    deliverable: "Feedback system collecting monthly data",
                    hqTools: ["HQ Forms/Surveys", "HQ Automation", "HQ CRM"],
                    kpi: "80%+ response rate; 9+ satisfaction score (out of 10)",
                    detailedSteps: [
                        "Create survey in HQ Forms: Rate overall experience 1-10, What's been most valuable?, Any challenges or frustrations?, What additional support would help?, Likelihood to refer (NPS), Open feedback",
                        "Set up HQ automation: Send survey every 30 days to active clients",
                        "Offer incentive: 'Complete survey, get entered to win free bonus session'",
                        "Review responses within 24 hours",
                        "If low score: Reach out personally, understand issue, resolve immediately",
                        "If high score: Ask for testimonial, request referral",
                        "Track trends: Common challenges = new resource opportunity",
                        "Schedule quarterly 'progress review' calls with each client via HQ Booking",
                        "Use data to improve coaching delivery and client results"
                    ]
                },
                {
                    title: "Create Contract Renewal & Extension System",
                    description: "Proactively extend client engagements before they end.",
                    action: "Set up HQ automation to alert 30 days before client contract ends. Reach out with 'continuation offer': Extend for 3-6 more months at preferred rate, upgrade to higher tier, or transition to membership. Make it seamless to continue. Track renewals in HQ CRM.",
                    deliverable: "Renewal system with 70%+ retention rate",
                    hqTools: ["HQ CRM", "HQ Automation", "HQ Email"],
                    kpi: "70%+ of clients renew or upgrade",
                    detailedSteps: [
                        "Set up HQ CRM alert: 30 days before contract end date",
                        "Send 'continuation email': 'We're approaching the end of our coaching agreement. Let's talk about next steps for your continued growth.'",
                        "Book 'renewal conversation' via HQ Booking (15-20 min)",
                        "On call: Review progress, celebrate wins, discuss remaining goals, present options",
                        "Options: (1) Continue 1-on-1 for 3 more months, (2) Upgrade to more intensive support, (3) Step down to group/membership, (4) Graduate (stay in touch)",
                        "Offer loyalty discount: 10% off if they renew before current contract ends",
                        "Make it easy: Send contract extension via HQ eSignature, process payment immediately",
                        "If client isn't renewing: Understand why, offer alternative, ask for referral and testimonial",
                        "Track renewal rate in HQ - target 70%+"
                    ]
                },
                {
                    title: "Build Client Ascension Ladder",
                    description: "Create clear path for clients to upgrade through tiers.",
                    action: "Map client journey: Free lead magnet → Challenge → Group program → 1-on-1 coaching → VIP intensive → Certification. Identify natural upgrade points. Use HQ to automate upgrade offers at right times. Make each tier lead logically to next.",
                    deliverable: "Ascension strategy documented",
                    hqTools: ["HQ Customer Journey Mapper", "HQ Email Automation", "HQ CRM"],
                    kpi: "30%+ of clients ascend to higher tier within 6 months",
                    detailedSteps: [
                        "Map value ladder in HQ Strategy Tool",
                        "Entry: Free lead magnet ($0) → Entry offer: Challenge ($47) → Core: Group program ($1,497) → Premium: 1-on-1 ($4,500) → Elite: VIP day ($2,500) or Certification ($4,997)",
                        "Identify trigger points for upgrade offers:",
                        "Challenge completers → Invite to group program",
                        "Group program top performers (week 8) → Invite to 1-on-1",
                        "1-on-1 clients achieving goals → Offer VIP intensive for specific breakthrough",
                        "Successful clients wanting to coach others → Invite to certification",
                        "Automate offers in HQ: Set triggers based on program completion, engagement level, results achieved",
                        "Track ascension rate: How many move from tier 1 → 2 → 3",
                        "Make upgrades feel like natural next step, not pushy sales"
                    ]
                },
                {
                    title: "Launch Alumni Community & Continued Engagement",
                    description: "Keep graduated clients connected for referrals and re-enrollment.",
                    action: "Create HQ Community channel for past clients. Offer continued value: Monthly alumni Q&A, resource updates, networking. Stay top-of-mind for re-enrollment and referrals. Make it special: Alumni get priority booking, special rates, first access to new programs.",
                    deliverable: "Alumni community active",
                    hqTools: ["HQ Community", "HQ Email Campaigns"],
                    kpi: "50%+ of past clients active in alumni group",
                    detailedSteps: [
                        "Create 'Alumni Network' in HQ Community (free to join for past clients)",
                        "Benefits: Monthly alumni-only Q&A call, first access to new programs, special alumni rates, networking with other successful alumni",
                        "Invite all past clients: Personal email + community invite link",
                        "Monthly touchpoint: Send alumni newsletter with updates, resources, success stories",
                        "Host quarterly alumni networking event",
                        "When launching new program: Alumni get early enrollment + discount",
                        "Ask for: Referrals, testimonials, success story updates",
                        "Track in HQ: Alumni who re-enroll, refer others, upgrade to new offers",
                        "Keep relationships warm - they become your best advocates"
                    ]
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Evergreen Systems & Scaling",
            weekDescription: "Automate client acquisition to run profitably on autopilot.",
            icon: Zap,
            dailyTime: "30-60 minutes maintenance",
            weeklyGoal: "Evergreen funnel profitable; sustainable $10K+ MRR; next quarter planned",
            tasks: [
                {
                    title: "Build Complete Evergreen Client Acquisition Funnel",
                    description: "Create automated system that runs 24/7 without you.",
                    action: "Use HQ Funnel Builder for complete system: Ads → Lead magnet → Email nurture (14 days) → Automated webinar or VSL → Discovery call booking → Sales automation → Onboarding. Every step tracked and optimized in HQ. Goal: Profitable funnel that requires minimal daily management.",
                    deliverable: "Evergreen funnel generating 3-5 clients/month on autopilot",
                    hqTools: ["HQ Funnel Builder", "HQ Automation", "HQ Analytics", "HQ Ad Manager"],
                    kpi: "Funnel ROI positive; 1:3 minimum (spend $1, make $3)",
                    detailedSteps: [
                        "Map complete funnel in HQ Funnel Builder:",
                        "Step 1: Evergreen ads (winning creatives from testing) running continuously at $30-50/day",
                        "Step 2: Lead magnet landing page (optimized version)",
                        "Step 3: 7-14 day email nurture sequence (already created)",
                        "Step 4: Automated webinar (record your best live masterclass) OR video sales letter",
                        "Step 5: Automated booking for discovery calls from email series",
                        "Step 6: Discovery call → Proposal sent via HQ → Follow-up sequence",
                        "Step 7: Upon enrollment → Automated onboarding",
                        "Set and forget: Monitor weekly, optimize monthly",
                        "Track in HQ: Ad spend, leads, calls booked, clients enrolled, revenue, ROI",
                        "Target: Spend $1000/month on ads, enroll 5 clients at $1500 avg = $7500 revenue = 7.5:1 ROI"
                    ]
                },
                {
                    title: "Create Comprehensive Analytics Dashboard",
                    description: "Monitor all business metrics in one place.",
                    action: "Build HQ Analytics Dashboard tracking: Monthly recurring revenue, active clients by tier, lead flow, conversion rates at each funnel stage, customer acquisition cost, lifetime value, email metrics, ad performance, community engagement. Review weekly; optimize monthly.",
                    deliverable: "Complete business metrics dashboard",
                    hqTools: ["HQ Analytics Dashboard", "HQ Reporting"],
                    kpi: "All key metrics tracked and visible at a glance",
                    detailedSteps: [
                        "Go to HQ Analytics → Create custom dashboard 'Coaching Business Health'",
                        "Revenue metrics: MRR (monthly recurring), New revenue this month, YTD revenue, Average client value",
                        "Client metrics: Active clients (total + by tier), New clients this month, Client retention rate, Avg client lifespan",
                        "Marketing metrics: New leads, Cost per lead, Discovery calls booked, Call-to-client %, Email list size/growth",
                        "Funnel metrics: Landing page conversion, Email opt-in to call %, Call to enrollment %",
                        "Content metrics: Social followers, Engagement rate, Website traffic, Blog readers",
                        "Set up automatic reports: Weekly summary email, monthly deep-dive",
                        "Review weekly: What's working? What needs attention? Where to focus effort?",
                        "Use data to make decisions: More ads? Different content? New offer?"
                    ]
                },
                {
                    title: "Document Complete Coaching Business Playbook",
                    description: "Create operations manual for sustainable scaling.",
                    action: "Compile everything that works into comprehensive playbook in HQ Files: Client acquisition process, sales scripts, onboarding system, delivery framework, best content formulas, ad templates, email sequences, partnership agreements. This becomes your scaling blueprint.",
                    deliverable: "Complete business playbook documented",
                    hqTools: ["HQ Files", "HQ Templates", "HQ Knowledge Base"],
                    kpi: "Playbook complete and organized",
                    detailedSteps: [
                        "Create folder structure in HQ Files: 'Coaching Business Playbook'",
                        "Section 1: Business Foundation - Niche statement, framework, offers, pricing",
                        "Section 2: Marketing - Best ad creatives, top social posts, email sequences that convert, content calendar template",
                        "Section 3: Sales - Discovery call script, objection handlers, proposal templates, close rate by approach",
                        "Section 4: Delivery - Onboarding checklist, session agendas, client resources, program curriculums",
                        "Section 5: Systems - HQ tools setup guide, automation workflows, tracking systems",
                        "Section 6: Partnerships - Partner list, referral process, collaboration templates",
                        "Section 7: Metrics - KPI targets, dashboard setup, reporting templates",
                        "Make accessible for future team members or virtual assistants",
                        "Update quarterly as you learn and improve"
                    ]
                },
                {
                    title: "Plan Next 90-Day Growth Cycle",
                    description: "Set strategy for scaling to $20K+ MRR.",
                    action: "Based on learnings from Days 1-90, plan next quarter: Scale ads to $3K-5K/month budget, hire virtual assistant for admin (HQ management, calendar, client support), launch second group cohort, increase content output, explore speaking opportunities, plan next tier (mastermind, retreat, certification). Use HQ to manage all planning.",
                    deliverable: "Q2 strategic plan with revenue targets",
                    hqTools: ["HQ Calendar", "HQ Project Management", "HQ Goals Tracking"],
                    kpi: "Complete quarterly plan with monthly milestones",
                    detailedSteps: [
                        "Review Days 1-90 results: What drove most clients? Best ROI activities? What to stop doing?",
                        "Set Q2 goals: Revenue ($20K+ MRR), Clients (25-30 active), Email list (3,000), Community (500 members)",
                        "Plan scaling: If ads are profitable, increase budget 50-100%",
                        "Hiring plan: Virtual assistant for HQ management, client onboarding, calendar management ($800-1200/month)",
                        "Content plan: Continue daily social, weekly blog, monthly masterclass, launch podcast (optional)",
                        "New offers: Launch second group cohort, pilot mastermind ($5K), plan live retreat",
                        "Partnership expansion: Add 5 more referral partners, 2 joint ventures",
                        "Speaking: Apply to 5 conferences, pitch 10 podcasts",
                        "Document in HQ Calendar with monthly themes and major initiatives",
                        "Set monthly review dates in HQ to track progress"
                    ]
                },
                {
                    title: "Celebrate & Optimize",
                    description: "Acknowledge progress and refine what's working.",
                    action: "Reflect on 90-day journey: Revenue generated, clients served, lives impacted. Identify wins and lessons. Survey clients for testimonials and feedback. Optimize evergreen funnel based on data. Set up systems to maintain without constant hustle. Plan celebration or reward for yourself.",
                    deliverable: "90-day reflection and optimization complete",
                    hqTools: ["HQ Analytics", "HQ Forms for client survey"],
                    kpi: "Goals reviewed; key learnings documented; celebration planned",
                    detailedSteps: [
                        "Pull complete 90-day report from HQ Analytics: Total revenue, clients enrolled, email list growth, ad ROI, content performance",
                        "Wins to celebrate: Lives transformed, income earned, systems built, skills developed",
                        "Send survey to all clients: 'How has coaching impacted you? What results have you achieved?'",
                        "Collect testimonials and success metrics",
                        "Analyze: Best lead source, highest converting offer, most profitable tier, content that resonated most",
                        "Optimize evergreen funnel: Better ad creative, improved email subject lines, streamlined booking process",
                        "Document learnings: What worked, what didn't, what to do more of",
                        "Celebrate: Treat yourself, share milestone with community, express gratitude",
                        "Plan next level: Where do you want to be in 12 months? What needs to happen?"
                    ]
                }
            ]
        }
    ],
    
    kpiChecklist: [
        { metric: "New leads (weekly)", target: "30-50" },
        { metric: "Discovery calls booked (weekly)", target: "5-10" },
        { metric: "Discovery call show rate", target: "70%+" },
        { metric: "Call-to-client conversion", target: "40-60%" },
        { metric: "Active 1-on-1 clients", target: "10-15" },
        { metric: "Group program participants", target: "10-15 per cohort" },
        { metric: "Membership subscribers", target: "20-30" },
        { metric: "Monthly recurring revenue", target: "$10K-15K" },
        { metric: "Cost per lead (CPL)", target: "$3-5" },
        { metric: "Cost per booked call", target: "$15-25" },
        { metric: "Customer acquisition cost (CAC)", target: "$200-400" },
        { metric: "Client lifetime value (LTV)", target: "$4K-8K" },
        { metric: "LTV:CAC ratio", target: "10:1+" },
        { metric: "Email list growth (monthly)", target: "+200-300" },
        { metric: "Email open rate", target: "35-45%" },
        { metric: "Community members", target: "300-500" },
        { metric: "Client retention rate", target: "70-80%" }
    ],

    templates: {
        discoveryCallScript: "Phase 1 - Rapport (5min): Welcome, small talk, set agenda, get permission. Phase 2 - Deep Dive (10min): What's not working? What's the cost of staying stuck? What have you tried? What would success look like? Phase 3 - Vision (10min): Paint picture of transformation, introduce framework, share similar success story. Phase 4 - Offer (5min): 'Based on what you shared, I believe I can help. Here's how we'd work together...' Present appropriate tier, handle objections, close or send proposal.",
        
        emailSubjects: [
            "Welcome! Here's Your [Lead Magnet]",
            "Why I Became a [Niche] Coach",
            "Try This Exercise Today (5 Minutes)",
            "How [Client Name] Achieved [Specific Result]",
            "The [Framework Name]: My Signature Method",
            "Why Most People Struggle With [Problem] (And What to Do Instead)",
            "Let's Talk: Book Your Free 30-Minute Discovery Call"
        ],
        
        socialBioFormula: "[Your Name] | [Niche] Life Coach 🎯 Helping [ideal client] achieve [transformation] through [framework/method] 📥 Free guide: [link] 📞 Book free call: [link]",
        
        referralRequest: "Hey [Client Name]! I'm so grateful for the progress we've made together. The best compliment you can give me is referring someone who needs support. Know anyone struggling with [problem]? Send them my way and you'll get [reward]. Just have them mention your name when they book! Thank you! 💛"
    }
};