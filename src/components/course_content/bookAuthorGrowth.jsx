import { BookOpen, Users, TrendingUp, DollarSign, Sparkles, Target, MessageSquare, Award, Zap, Globe, Star, Rocket } from 'lucide-react';

export const bookAuthorGrowthRoadmap = {
    courseTitle: "Book Author Growth Plan: 90-Day Audience & Sales System",
    courseDescription: "Build an audience, form a community, and grow book sales using The Business Minds HQ. Transform readers into a thriving community while scaling your author business.",
    totalWeeks: 12,
    category: "Niche: Book Authors",
    difficulty: "All Levels",
    
    successMetrics: {
        emailList: "+1,000 targeted subscribers",
        community: "300+ active members with daily engagement",
        bookSales: "Consistent daily sales with 3 revenue add-ons launched",
        automation: "Repeatable funnel & evergreen system that keeps converting"
    },

    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Brand + HQ Account Setup",
            weekDescription: "Clear author positioning, HQ account completed, basic web presence live.",
            icon: Target,
            dailyTime: "45-90 minutes",
            weeklyGoal: "Author identity defined, HQ pages live, lead magnet funnel operational",
            tasks: [
                {
                    title: "Clarify Your Author Positioning & Offers",
                    description: "Get crystal clear on your unique author identity and book positioning.",
                    action: "Write your Author Identity Statement (1 sentence explaining who you help and how). Create 3 book pitch versions: 10-second, 30-second, and 60-second elevator pitches. Draft a compelling short bio for HQ.",
                    deliverable: "Author Identity Statement saved to HQ Notes/Files",
                    hqTools: ["HQ AI Tools for drafting", "HQ Files for storage"],
                    kpi: "One polished Author Identity Statement completed",
                    detailedSteps: [
                        "Open HQ AI Assistant and prompt: 'Help me write an author identity statement for my book about [topic] that helps [audience]'",
                        "Create 3 pitch versions: 10s (one hook line), 30s (hook + value), 60s (story + transformation)",
                        "Write your bio (150 words) highlighting credentials, book topic, and reader transformation",
                        "Save all documents in HQ Files under 'Author Brand Assets'"
                    ]
                },
                {
                    title: "Create HQ Author Home & Book Landing Pages",
                    description: "Build your professional author website inside HQ.",
                    action: "Use HQ Website & Funnel Builder to create 'Author Home' page and 'Book' landing page. Include hero with book cover, 1-line hook, CTA to lead magnet, About section, and buy links. Use HQ templates to speed up design.",
                    deliverable: "Live author website with book landing page",
                    hqTools: ["HQ Website & Funnel Builder", "HQ Forms", "HQ eCommerce"],
                    kpi: "2 pages published and mobile-optimized",
                    detailedSteps: [
                        "Go to HQ Website Builder and select 'Author/Creator' template",
                        "Customize homepage: Add book cover image, compelling headline, 3-bullet benefits, email opt-in form",
                        "Create Book page: Detailed description, sample chapters, testimonials, multiple buy buttons",
                        "Add About page: Your story, credentials, why you wrote the book",
                        "Use HQ Forms to create email capture (popup + inline) and embed on book page",
                        "Test all forms on mobile and desktop"
                    ]
                },
                {
                    title: "Create Lead Magnet & Automation",
                    description: "Develop a valuable free offer to build your email list.",
                    action: "Create a simple but valuable lead magnet (3 sample chapters, cheat sheet, or '5 Key Lessons' PDF). Upload to HQ Files and connect as automated deliverable in email automation. Set up instant delivery.",
                    deliverable: "Lead magnet live with automated delivery system",
                    hqTools: ["HQ Files", "HQ Email Automations", "HQ Forms"],
                    kpi: "Landing page + lead magnet opt-in tested and working",
                    detailedSteps: [
                        "Design lead magnet PDF with Canva or use HQ AI to generate outline",
                        "Upload PDF to HQ Files and get shareable link",
                        "Go to HQ Email Automations → Create 'Lead Magnet Delivery' automation",
                        "Trigger: Form submission on 'Book Lead Magnet Form'",
                        "Action: Send email with download link immediately",
                        "Test: Submit form yourself and confirm instant delivery"
                    ]
                },
                {
                    title: "Set Up Automated Text-Back & Booking",
                    description: "Engage new leads immediately with automated SMS and offer strategy calls.",
                    action: "Enable HQ Automated Text-Back with friendly auto-reply for new leads. Set up HQ Appointment/Booking for 15-minute 'Reader Strategy Call' for VIPs and street team invites.",
                    deliverable: "SMS automation + booking calendar live",
                    hqTools: ["HQ Automated Text-Back", "HQ Appointment/Booking"],
                    kpi: "Text automation responding within 60 seconds of opt-in",
                    detailedSteps: [
                        "Go to HQ SMS Settings → Enable Automated Text-Back",
                        "Create welcome message: 'Thanks for grabbing [lead magnet]! Check your email for the download. Reply if you need anything! - [Your Name]'",
                        "Set up HQ Booking Calendar: Create '15-min Reader Strategy Call' appointment type",
                        "Add booking link to welcome email and text message",
                        "Configure calendar availability (2-3 slots per week to start)"
                    ]
                },
                {
                    title: "Launch Initial Content & Social Presence",
                    description: "Start building daily visibility on social platforms.",
                    action: "Create and schedule your first week of social content. Post daily short-form content (Reels/TikToks/Stories) sharing book excerpts, writing journey, and reader benefits. Link all posts to lead magnet page.",
                    deliverable: "7 days of social content scheduled",
                    hqTools: ["HQ AI Tools", "HQ Social Scheduler", "HQ Analytics"],
                    kpi: "Daily posting for 7 days; track clicks to landing page",
                    detailedSteps: [
                        "Use HQ AI to generate 7 social post ideas based on book themes",
                        "Create content: 3 book quote graphics, 2 short videos (30-60s), 2 personal story posts",
                        "Schedule via HQ or use Buffer/Later",
                        "Each post includes: Hook + Value + CTA to lead magnet",
                        "Set up HQ Analytics tracking links for each post"
                    ]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Email & Community Foundation",
            weekDescription: "Email welcome funnel active; community group launched and seeded.",
            icon: MessageSquare,
            dailyTime: "30-60 minutes",
            weeklyGoal: "Automated email nurture live, 50+ community members",
            tasks: [
                {
                    title: "Build 5-Email Welcome Sequence",
                    description: "Create automated nurture sequence that builds relationship and drives book sales.",
                    action: "Use HQ Email Automations to build welcome series: (1) Deliver lead magnet, (2) Share author story + why book matters, (3) Provide actionable tip from book, (4) Share social proof + ask for review, (5) Invite to community + upcoming live event. Add personalization merges.",
                    deliverable: "5-email welcome automation active",
                    hqTools: ["HQ Email Automations", "HQ Templates"],
                    kpi: "Automation tested; emails delivering on correct schedule",
                    detailedSteps: [
                        "Go to HQ Email Automations → Create new sequence 'Author Welcome Series'",
                        "Email 1 (Day 0): Subject: 'Welcome! Here's your [Lead Magnet]' - Deliver PDF, introduce yourself briefly",
                        "Email 2 (Day 2): Subject: 'Why I wrote [Book Title]' - Share personal story and book mission",
                        "Email 3 (Day 5): Subject: 'One exercise you can try today' - Excerpt with actionable tip",
                        "Email 4 (Day 9): Subject: 'What readers are saying...' - 3-4 testimonials + Amazon review ask",
                        "Email 5 (Day 14): Subject: 'Join our community of readers' - Community invite + live event announcement",
                        "Add merge tags: {{first_name}}, {{book_title}}",
                        "Test by adding yourself to the sequence"
                    ]
                },
                {
                    title: "Launch Your Reader Community Hub",
                    description: "Create a dedicated space for readers to connect and engage.",
                    action: "Use HQ Community to create members' group with sections for Welcome/Rules, Introductions, Weekly Themes, Fan Art/Photos, and Events. Post pinned welcome video and onboarding guide. Invite your initial list of friends, family, and newsletter subscribers.",
                    deliverable: "Community launched with 50+ initial members",
                    hqTools: ["HQ Community Hub", "HQ Video Hosting"],
                    kpi: "50 join requests/invites sent; 10+ intro posts",
                    detailedSteps: [
                        "Navigate to HQ Community → Create New Group '[Book Title] Readers Community'",
                        "Set up channels: #welcome, #introductions, #weekly-discussion, #book-club, #events",
                        "Record 2-minute welcome video (phone is fine): Introduce yourself, explain community purpose, encourage participation",
                        "Upload to HQ and pin in #welcome channel",
                        "Create welcome post template for new members",
                        "Manually invite first 50 people from email list (use HQ email + community invite link)",
                        "Post first discussion prompt: 'What chapter are you most excited to read?'"
                    ]
                },
                {
                    title: "Set Up Book Sales & eCommerce",
                    description: "Enable direct book sales through HQ platform.",
                    action: "Set up HQ eCommerce with buy page for your book (paperback + eBook options). Configure payment processing, add shipping options for physical copies. Create optional 1-click upsell for workbook or signed bookplate.",
                    deliverable: "Complete purchase flow tested",
                    hqTools: ["HQ eCommerce", "HQ Payment Processing", "HQ Checkout"],
                    kpi: "End-to-end purchase tested successfully",
                    detailedSteps: [
                        "Go to HQ eCommerce → Create Product 'Book Title'",
                        "Add variants: eBook ($X), Paperback ($Y), Bundle ($Z)",
                        "Upload book cover as product image",
                        "Write compelling product description (benefits-focused)",
                        "Configure shipping: flat rate, calculated, or free digital delivery",
                        "Set up HQ Payment Processing (Stripe integration)",
                        "Create upsell: 'Add Companion Workbook for $10 more'",
                        "Test complete purchase flow with test credit card"
                    ]
                },
                {
                    title: "Create Initial Community Engagement Calendar",
                    description: "Plan first month of community activity to build habits.",
                    action: "Design 30-day community calendar with weekly themes, discussion prompts, polls, and engagement activities. Schedule at least one live event per week using HQ Events feature.",
                    deliverable: "30-day community content calendar",
                    hqTools: ["HQ Community", "HQ Events/Booking", "HQ Calendar"],
                    kpi: "Calendar created with 4 events scheduled",
                    detailedSteps: [
                        "Create Google Sheet or HQ Calendar with daily/weekly themes",
                        "Week 1 Theme: 'Why This Book?', Week 2: 'Chapter 1 Deep Dive', etc.",
                        "Schedule daily prompts: Monday motivation quotes, Wednesday wins, Friday reflections",
                        "Plan weekly events: Chapter discussions, live Q&A, author readings",
                        "Use HQ Events to create event pages and RSVP tracking",
                        "Pre-write 2 weeks of discussion prompts to stay ahead"
                    ]
                },
                {
                    title: "Implement First Analytics Tracking",
                    description: "Set up measurement system to track all key metrics.",
                    action: "Connect HQ Analytics to track landing page visits, email opt-ins, book sales conversions, and community signups. Create basic dashboard to monitor daily.",
                    deliverable: "Analytics dashboard tracking core metrics",
                    hqTools: ["HQ Analytics", "HQ Dashboard"],
                    kpi: "All conversion points tracked; first 7 days of data captured",
                    detailedSteps: [
                        "Go to HQ Analytics → Connect tracking pixels to all landing pages",
                        "Set up conversion events: Lead Magnet Download, Book Purchase, Community Join",
                        "Create dashboard view with: Daily visitors, Opt-in rate, Purchase conversion, Community growth",
                        "Set up Google Analytics integration (optional)",
                        "Review metrics daily for first week to ensure tracking works"
                    ]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Content Foundation & Calendar",
            weekDescription: "60-day content calendar created; 30 pieces of repurposable content ready.",
            icon: Sparkles,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Content machine established; cornerstone content published",
            tasks: [
                {
                    title: "Batch-Create Content Bank with HQ AI",
                    description: "Create 30 pieces of content you can repurpose across all channels.",
                    action: "Use HQ AI + templates to batch-create: 10 short social posts (quotes, micro-stories), 5 video scripts (60-90s) for Reels/TikTok/Shorts, 5 newsletter pieces, 5 community discussion prompts. Upload all media to HQ Files.",
                    deliverable: "30-piece content library organized in HQ",
                    hqTools: ["HQ AI Tools", "HQ Files", "HQ Content Templates"],
                    kpi: "30 content pieces created and categorized",
                    detailedSteps: [
                        "Use HQ AI: 'Generate 10 engaging social media posts based on my book about [topic] that provide value and encourage readers to buy'",
                        "Generate 5 video script outlines: Opening hook, main value point, CTA",
                        "Create 5 newsletter topics with HQ AI assistance",
                        "Design 5 community discussion prompts that encourage engagement",
                        "Save everything in HQ Files with clear naming: Social_Week3_Post1.txt",
                        "Create content spreadsheet to track what's published where"
                    ]
                },
                {
                    title: "Publish Cornerstone 'Why I Wrote This Book' Content",
                    description: "Create your flagship long-form content piece.",
                    action: "Publish comprehensive blog post on your author site: 'Why I Wrote [Book Title]' with personal story, book mission, and lead magnet CTA. Use HQ page builder and optimize for SEO. Convert into 3 short social posts + 1 newsletter.",
                    deliverable: "Cornerstone blog post published and repurposed",
                    hqTools: ["HQ Website Builder", "HQ SEO Tools", "HQ AI for repurposing"],
                    kpi: "Blog post live; 3 social variants created; newsletter sent",
                    detailedSteps: [
                        "Draft 800-1200 word blog post covering: Your 'why', Book journey, Who it helps, Key takeaways, CTA",
                        "Use HQ AI to optimize for SEO: Meta title, description, keywords",
                        "Add images: Book cover, personal photo, relevant stock images",
                        "Publish on HQ-built blog section",
                        "Repurpose into 3 social posts highlighting different angles",
                        "Send as feature newsletter to email list",
                        "Track page views and opt-ins from blog in HQ Analytics"
                    ]
                },
                {
                    title: "Set Up Content Scheduling System",
                    description: "Organize and schedule 60 days of content in advance.",
                    action: "Create 60-day content calendar. Schedule posts across social platforms using HQ scheduler or integrate with external tools. Plan content themes weekly: Week 1 - Book benefits, Week 2 - Reader stories, Week 3 - Behind the scenes, etc.",
                    deliverable: "60-day content calendar with scheduled posts",
                    hqTools: ["HQ Social Scheduler", "HQ Calendar", "HQ Content Planner"],
                    kpi: "30+ posts scheduled in advance",
                    detailedSteps: [
                        "Create spreadsheet with columns: Date, Platform, Content Type, Topic, Status, Link",
                        "Assign weekly themes aligned with book chapters or key messages",
                        "Use content bank from Task 1 to fill calendar",
                        "Schedule in HQ Social Scheduler (if available) or Buffer/Later",
                        "Plan 2 posts/day: 1 educational, 1 promotional",
                        "Leave 30% flexibility for real-time/trending content"
                    ]
                },
                {
                    title: "Connect Analytics for Content Performance",
                    description: "Track which content drives the most engagement and conversions.",
                    action: "Set up HQ Analytics to track content performance. Use UTM parameters for each content piece to identify top performers. Monitor engagement rates, click-through rates, and conversions by content type.",
                    deliverable: "Content analytics dashboard configured",
                    hqTools: ["HQ Analytics", "UTM Builder"],
                    kpi: "All content links tracked; first 7 days of performance data",
                    detailedSteps: [
                        "Create UTM naming convention: Source_Medium_Campaign (e.g., Instagram_Post_Chapter1Quote)",
                        "Use HQ UTM Builder to create tracked links for all scheduled content",
                        "Set up HQ Analytics dashboard view: Top Content by Traffic, Opt-ins by Source, Sales by Content",
                        "Review daily for first 2 weeks, then weekly",
                        "Identify top 3 content types and double down"
                    ]
                },
                {
                    title: "Establish Daily Content & Engagement Routine",
                    description: "Create sustainable daily habits for author platform growth.",
                    action: "Block 45-60 minutes daily for content creation and engagement. Morning: Create 1 piece of content. Afternoon: Engage with community, respond to comments, interact with readers. Evening: Review analytics and adjust tomorrow's plan.",
                    deliverable: "Daily routine documented and followed for 7 days",
                    hqTools: ["HQ Dashboard", "HQ Community", "HQ Analytics"],
                    kpi: "7 consecutive days of routine completed",
                    detailedSteps: [
                        "Set calendar blocks: 8-9am Content Creation, 2-2:30pm Engagement, 8-8:15pm Analytics Review",
                        "Create checklist: Post created, Community comments replied, New connections made, Metrics reviewed",
                        "Use HQ Dashboard to see daily tasks at a glance",
                        "Track daily in simple spreadsheet or HQ task manager",
                        "Adjust timing based on when your audience is most active (check HQ Analytics)"
                    ]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Soft Launch & Early Engagement",
            weekDescription: "100+ email signups, 100 community members, first live event completed.",
            icon: Rocket,
            dailyTime: "30-60 minutes",
            weeklyGoal: "First community event, early sales, social proof collected",
            tasks: [
                {
                    title: "Execute Soft Launch to Warm Audience",
                    description: "Announce your book to friends, family, and existing followers.",
                    action: "Send 'soft launch' email to personal contacts + early followers with special incentive (signed copy raffle, early-bird pricing). Use HQ Forms to collect mailing addresses for physical copies. Create urgency with limited-time offer.",
                    deliverable: "Soft launch campaign executed",
                    hqTools: ["HQ Email Campaigns", "HQ Forms", "HQ eCommerce"],
                    kpi: "100+ emails sent; 20+ book sales from warm audience",
                    detailedSteps: [
                        "Segment warm audience in HQ: Friends/family, Past clients, Social followers who engaged",
                        "Draft personal launch email: Share excitement, explain book's value, offer special incentive",
                        "Create special offer: First 50 buyers get signed bookplate + bonus chapter",
                        "Use HQ Form to collect shipping addresses for signed items",
                        "Send via HQ Email with personal subject line: 'I need your help with my book launch'",
                        "Follow up 3 days later with gentle reminder",
                        "Track purchases in HQ Analytics by source"
                    ]
                },
                {
                    title: "Host First 'Meet the Author' Community Event",
                    description: "Create meaningful connection with early readers.",
                    action: "Plan and host 45-minute live 'Meet the Author' event in community using HQ Events/Booking. Do a reading from your favorite chapter, share writing journey, answer questions, and tease upcoming community events. Promote via email and social.",
                    deliverable: "First live event with 15+ attendees",
                    hqTools: ["HQ Events", "HQ Community", "HQ Video Streaming"],
                    kpi: "30+ RSVPs; 15+ live attendees; event recording posted",
                    detailedSteps: [
                        "Choose date/time when audience is available (check time zones)",
                        "Create event in HQ Events: Title, description, Zoom/streaming link",
                        "Promote 7 days in advance: Email announcement, social posts, community pinned post",
                        "Prepare: Select chapter to read (5-7 min), 3-5 FAQs to answer, promo for next event",
                        "During event: Welcome everyone, share screen with book cover, do reading, open Q&A",
                        "Record via HQ or Zoom; upload recording to HQ Files",
                        "Post recording in community + send to those who registered but couldn't attend",
                        "Send thank-you email with replay link and special offer"
                    ]
                },
                {
                    title: "Launch Early Review Collection Campaign",
                    description: "Gather social proof from first readers.",
                    action: "Use email automation and community to ask early readers for reviews on major retail sites (Amazon, Goodreads, etc.). Create HQ template email with step-by-step instructions. Offer incentive: entry to signed book raffle or exclusive Zoom Q&A. Collect testimonials in HQ Files.",
                    deliverable: "25+ reviews requested; 10+ collected",
                    hqTools: ["HQ Email Templates", "HQ Files", "HQ Community"],
                    kpi: "10+ verified reviews posted on Amazon/Goodreads",
                    detailedSteps: [
                        "Segment buyers in HQ (anyone who purchased 7+ days ago)",
                        "Create 'Request Review' email template: Thank you, value reminder, simple ask, direct links to review pages",
                        "Make it EASY: Include screenshot instructions for leaving review",
                        "Offer incentive: 'Leave honest review and get entered to win signed copy + exclusive Q&A access'",
                        "Send via HQ Email Automation 10 days after purchase",
                        "Post in community: 'If the book has helped you, a review means the world!'",
                        "Save all testimonial text to HQ Files for marketing use",
                        "Follow up personally with detailed reviewers to thank them"
                    ]
                },
                {
                    title: "Create & Promote Weekly Community Ritual",
                    description: "Establish predictable engagement pattern in community.",
                    action: "Launch 'Weekly Chapter Discussion' every Friday in HQ Community. Pick one chapter, create discussion questions, moderate conversation, highlight best insights. Make it a ritual readers anticipate.",
                    deliverable: "First 2 weekly discussions completed",
                    hqTools: ["HQ Community", "HQ Events", "HQ Notifications"],
                    kpi: "20+ comments per discussion; consistent Friday participation",
                    detailedSteps: [
                        "Choose discussion day/time (Friday 12pm suggested)",
                        "Create post template: Chapter summary (50 words), 3-5 discussion questions, personal insight",
                        "Week 1: Discuss Chapter 1 or Introduction",
                        "Post discussion at scheduled time in #weekly-discussion channel",
                        "Engage actively: Respond to every comment within 2 hours",
                        "Highlight best comments and insights",
                        "Pin discussion for the week",
                        "Send HQ notification reminder 1 hour before discussion",
                        "Repurpose insights into social content next week"
                    ]
                },
                {
                    title: "Build Founding Street Team",
                    description: "Recruit superfans to help spread the word.",
                    action: "Identify 10-20 most engaged community members and email subscribers. Send personal invitation to join 'Founding Street Team' with exclusive perks: advance content, signed books, direct author access. Use HQ to track and manage.",
                    deliverable: "Street team of 15+ members activated",
                    hqTools: ["HQ CRM/Contacts", "HQ Email", "HQ Community"],
                    kpi: "15+ street team members confirmed and engaged",
                    detailedSteps: [
                        "In HQ Community, identify members who: Posted intro, commented on multiple threads, shared book",
                        "Create 'Street Team' tag in HQ Contacts",
                        "Draft personal invitation email: Explain exclusivity, list perks, invite to private group",
                        "Perks: Monthly private Zoom, advance chapters, signed books, affiliate commission",
                        "Create private Street Team channel in HQ Community",
                        "Send invites and follow up personally with each accept",
                        "First group call: Share vision, answer questions, give them marketing assets to share"
                    ]
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Content Ramp & Daily Presence",
            weekDescription: "Daily posting routine established, 300+ new followers, steady lead inflow.",
            icon: TrendingUp,
            dailyTime: "60-120 minutes",
            weeklyGoal: "Consistent content machine producing 20-30 new leads daily",
            tasks: [
                {
                    title: "Implement Daily Multi-Platform Content Strategy",
                    description: "Show up consistently where your readers are.",
                    action: "Post daily across platforms: 1 short video, 3 stories, 2 community posts/week, 1 newsletter/week. Each piece links to HQ landing page with tailored opt-in. Use HQ AI to generate variations and hashtags.",
                    deliverable: "Daily content for 7 consecutive days",
                    hqTools: ["HQ AI Tools", "HQ Social Scheduler", "HQ Landing Pages"],
                    kpi: "7 days consistent posting; 20-30 new leads/day",
                    detailedSteps: [
                        "Monday-Friday: Post 1 short-form video (Instagram Reel, TikTok, YouTube Short)",
                        "Daily: 3 Instagram/Facebook stories with swipe-up to lead magnet",
                        "Tuesday & Thursday: Post in HQ Community (discussion prompt or value post)",
                        "Wednesday: Send newsletter to email list",
                        "Use HQ AI each morning: 'Create 3 social post ideas for book about [topic]'",
                        "Create specific landing pages for different content themes",
                        "Track which content converts best in HQ Analytics"
                    ]
                },
                {
                    title: "Launch Strategic Content Funnels",
                    description: "Create targeted funnels for different book themes.",
                    action: "Build 3 specific funnels in HQ, each targeting a different reader pain point or book chapter theme. Each funnel: Social content → Topic-specific landing page → Tailored lead magnet → Email nurture → Book offer.",
                    deliverable: "3 themed content funnels active",
                    hqTools: ["HQ Funnel Builder", "HQ Landing Pages", "HQ Email Automations"],
                    kpi: "Each funnel generating 5+ leads/day",
                    detailedSteps: [
                        "Identify 3 main themes/chapters from your book",
                        "Funnel 1 Example: 'Struggling with [Problem]?' → Landing page addressing problem → Lead magnet with solution → Email series → Book as comprehensive guide",
                        "Use HQ Funnel Builder to create visual funnel map",
                        "Build landing pages for each theme using templates",
                        "Create custom email sequences for each funnel (3-5 emails)",
                        "Test complete journey for all 3 funnels",
                        "Assign different content to each funnel in your content calendar"
                    ]
                },
                {
                    title: "Engage With Reader Communities & Forums",
                    description: "Build presence in spaces where your readers already gather.",
                    action: "Join 5 Facebook groups, Reddit communities, or forums where your target readers hang out. Provide genuine value by answering questions and sharing insights (not promoting). Build relationships and authority. Mention book only when directly relevant.",
                    deliverable: "Active in 5 reader communities",
                    hqTools: ["HQ CRM to track interactions", "HQ Content Bank for valuable answers"],
                    kpi: "10+ valuable contributions per week; 50+ new connections",
                    detailedSteps: [
                        "Research and join 5 communities related to your book topic",
                        "Read group rules and introduce yourself genuinely",
                        "Spend 20 min/day: Answer 2-3 questions, provide value",
                        "Share insights from your book WITHOUT directly selling",
                        "When asked 'where can I learn more?' share lead magnet link",
                        "Track in HQ CRM: Community name, engagement level, referral traffic",
                        "Build relationships with moderators and active members"
                    ]
                },
                {
                    title: "Optimize Opt-In Rate on Landing Pages",
                    description: "Improve conversion from visitor to subscriber.",
                    action: "Use HQ Analytics to identify underperforming pages. Test different headlines, CTAs, form placements. A/B test 2 versions of main landing page. Goal: increase opt-in rate from X% to Y%.",
                    deliverable: "Landing pages optimized; conversion rate improved by 20%+",
                    hqTools: ["HQ A/B Testing", "HQ Analytics", "HQ Landing Page Builder"],
                    kpi: "Opt-in rate increase measurable in HQ Analytics",
                    detailedSteps: [
                        "Check current conversion rate in HQ Analytics (baseline)",
                        "Create A/B test: Version A (current) vs Version B (new headline + simplified form)",
                        "Test elements: Headline, hero image, CTA button text/color, form length",
                        "Run test for minimum 100 visitors per variant",
                        "Use HQ heatmaps (if available) to see where people drop off",
                        "Implement winning version across all landing pages",
                        "Document what worked in HQ Files for future reference"
                    ]
                },
                {
                    title: "Launch Weekly Value Email Series",
                    description: "Keep subscribers engaged with regular valuable content.",
                    action: "Beyond welcome sequence, create weekly 'Author Insights' newsletter sent every Wednesday. Share exclusive content, behind-the-scenes, reader stories, and book-related value. Always include community and book CTAs. Use HQ Email Templates.",
                    deliverable: "4 weekly newsletters sent",
                    hqTools: ["HQ Email Campaigns", "HQ Templates", "HQ AI"],
                    kpi: "25%+ open rate; 5%+ click rate; 0-2% unsubscribe rate",
                    detailedSteps: [
                        "Create 'Weekly Author Insights' template in HQ Email",
                        "Newsletter structure: Personal note, 1 key insight, reader spotlight/story, community update, book CTA",
                        "Write 4 newsletters at start of week and schedule for Wednesdays",
                        "Use HQ AI to draft, then add personal touch",
                        "Include 2-3 links: Community discussion, Book page, Upcoming event",
                        "Track performance in HQ Analytics",
                        "Segment high-engagers for future VIP offers"
                    ]
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Paid Ads & Testing",
            weekDescription: "Validate paid channels, establish CPL and conversion benchmarks.",
            icon: DollarSign,
            dailyTime: "30-60 minutes monitoring",
            weeklyGoal: "Ad campaigns live, cost-per-lead identified, positive ROI pathway",
            tasks: [
                {
                    title: "Create Ad Creative & Set Up Tracking",
                    description: "Design compelling ads and implement proper tracking.",
                    action: "Use HQ Ad Manager to create campaigns driving to lead magnet landing page. Create ad creatives: video snippet of you discussing book, book cover with powerful quote, author testimonial clip. Install tracking pixels via HQ settings for conversions and retargeting.",
                    deliverable: "3 ad creatives; tracking pixels installed",
                    hqTools: ["HQ Ad Manager", "HQ Tracking Pixels", "HQ Files for creative assets"],
                    kpi: "Tracking confirmed working; 3 ads ready to launch",
                    detailedSteps: [
                        "Create 3 ad variations: Video (30-60s you talking about book), Image (book cover + testimonial), Carousel (5 key lessons)",
                        "Write ad copy using proven formula: Hook + Problem + Solution + CTA",
                        "Go to HQ Ad Manager → Create campaign 'Book Lead Gen'",
                        "Set objective: Lead Generation or Traffic (to landing page)",
                        "Install Facebook/Instagram Pixel and Google Tag via HQ Tracking Settings",
                        "Create custom conversions: Lead Magnet Download, Book Purchase",
                        "Set up retargeting audience: Landing page visitors (past 30 days)"
                    ]
                },
                {
                    title: "Launch Micro-Budget Test Campaign",
                    description: "Test ads with small budget to validate channels.",
                    action: "Start with $5-$15/day per ad set. Test 3 creatives x 2 audiences (interest-based + lookalike). Run for 7 days minimum. Target CPL < $1-$5 depending on niche. Aim for 1:10 email-to-sale conversion (10% of opt-ins buy book).",
                    deliverable: "Test campaign data collected",
                    hqTools: ["HQ Ad Manager", "HQ Analytics Dashboard"],
                    kpi: "CPL benchmark established; winning ad identified",
                    detailedSteps: [
                        "Set daily budget: $10/day ($70 total for week)",
                        "Create 2 audiences: Interest-based (people interested in [book topic]) + Lookalike (1% of your email list)",
                        "Launch 3 ad variations to each audience (6 ad sets total)",
                        "Monitor daily in HQ Ad Dashboard",
                        "After 3 days: Pause worst performing 50%",
                        "After 7 days: Analyze which creative + audience combo has lowest CPL",
                        "Calculate: If CPL = $3 and 10% buy $15 book, profit = $1.50 - $3 = need better conversion or lower CPL",
                        "Document results in HQ Analytics notes"
                    ]
                },
                {
                    title: "Build Retargeting Funnel",
                    description: "Convert warm traffic that didn't take action first time.",
                    action: "Create retargeting campaigns in HQ showing ads to: (1) Landing page visitors who didn't opt-in, (2) Lead magnet downloaders who didn't buy. Use urgency and social proof in retargeting creative.",
                    deliverable: "Retargeting campaigns active",
                    hqTools: ["HQ Ad Manager", "HQ Retargeting Pixels"],
                    kpi: "Retargeting converting at 2-5x better rate than cold traffic",
                    detailedSteps: [
                        "Create Custom Audience 1: Visited landing page but didn't opt-in (past 14 days)",
                        "Create Custom Audience 2: Downloaded lead magnet but didn't purchase (past 30 days)",
                        "Design retargeting ads with urgency: 'Still thinking about [Book]? Limited time bonus inside...'",
                        "Set budget: $5/day for each retargeting audience",
                        "Show testimonials and reviews in retargeting ads (social proof)",
                        "Track conversion rates separately in HQ Analytics",
                        "Optimize: Increase spend on audience that converts better"
                    ]
                },
                {
                    title: "Analyze Ad Performance & Scale Winners",
                    description: "Double down on what works; cut what doesn't.",
                    action: "Review all ad data in HQ Analytics. Identify winning creative + audience combination. Kill losing ads. Increase budget on winners by 20-50%. Document learnings: what hooks worked, which audience responded, optimal budget.",
                    deliverable: "Winning ad formula documented; budget reallocated",
                    hqTools: ["HQ Analytics", "HQ Ad Manager"],
                    kpi: "Positive ROI on best performing campaign",
                    detailedSteps: [
                        "Export ad performance data from HQ Ad Manager",
                        "Calculate metrics: CPL, CTR (click-through rate), Opt-in rate, Purchase conversion rate, ROI",
                        "Identify best performer: Lowest CPL + highest purchase conversion",
                        "Pause all ads with CPL >$5 or <1% CTR",
                        "Increase winning ad budget from $10/day to $15-20/day",
                        "Create 2 variations of winning ad to test further",
                        "Set calendar reminder to review weekly",
                        "Document in HQ Files: 'Ad Playbook - What Works'"
                    ]
                },
                {
                    title: "Set Up Abandoned Cart Recovery",
                    description: "Recover lost book sales with automated follow-up.",
                    action: "If selling through HQ eCommerce, enable abandoned cart automation. Send email + SMS within 1 hour if someone adds book to cart but doesn't complete purchase. Include urgency, social proof, and easy checkout link.",
                    deliverable: "Cart recovery automation live",
                    hqTools: ["HQ eCommerce", "HQ Email Automation", "HQ SMS"],
                    kpi: "10-20% cart recovery rate",
                    detailedSteps: [
                        "Go to HQ eCommerce → Enable abandoned cart tracking",
                        "Create automation: Trigger = Cart abandoned for 1 hour",
                        "Action 1: Send email 'You left something behind...' with cart link",
                        "Action 2: Send SMS 3 hours later if still no purchase",
                        "Email content: Empathy + remind of value + social proof + easy checkout button",
                        "Offer: 'Complete purchase in next 24 hours and get [bonus]'",
                        "Track recovery rate in HQ Analytics",
                        "A/B test: Email only vs Email+SMS"
                    ]
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Partnerships & Collaboration",
            weekDescription: "10 podcast/guest appearances lined up, high-visibility collaborations.",
            icon: Users,
            dailyTime: "45-90 minutes outreach",
            weeklyGoal: "5+ collaborations confirmed; +500 new reach from partners",
            tasks: [
                {
                    title: "Build Podcast & Media Prospect List",
                    description: "Identify where your ideal readers listen and consume content.",
                    action: "Research 50 podcasts, blogs, and YouTube channels your target readers follow. Use HQ CRM to organize prospects with contact info, audience size, and pitch angle. Prioritize shows with engaged audiences over large follower counts.",
                    deliverable: "50 podcast/media prospects in HQ CRM",
                    hqTools: ["HQ CRM/Contacts", "HQ Spreadsheet/Lists"],
                    kpi: "50 prospects researched and categorized by priority",
                    detailedSteps: [
                        "Search Apple Podcasts, Spotify, YouTube for [your book topic] + podcast",
                        "Look for 1K-50K follower range (higher response rate)",
                        "For each: Save host name, contact email, show format, recent episode topics",
                        "Add to HQ CRM with tags: High Priority, Medium, Low",
                        "Note mutual connections or angles for personalization",
                        "Create spreadsheet columns: Show Name, Host, Email, Audience Size, Pitch Angle, Status, Notes"
                    ]
                },
                {
                    title: "Craft & Send Personalized Podcast Pitches",
                    description: "Pitch yourself as valuable guest to target shows.",
                    action: "Write personalized pitch emails for top 20 podcasts. Reference specific episode, explain your unique angle, offer 3 topic ideas, make it easy for them to say yes. Send via HQ Email and track responses in CRM.",
                    deliverable: "20 podcast pitches sent",
                    hqTools: ["HQ Email", "HQ CRM", "HQ Templates"],
                    kpi: "20 pitches sent; 5+ positive responses",
                    detailedSteps: [
                        "Create pitch template in HQ: Subject line, personalized intro, credibility, topic ideas, CTA",
                        "Personalize each pitch: Reference specific episode you enjoyed, explain why you'd add value to their audience",
                        "Offer 3 topic ideas relevant to their show",
                        "Include: One-liner bio, book cover image, previous media links",
                        "Send from professional email (author@domain.com via HQ)",
                        "Track in HQ CRM: Mark 'Pitched', set follow-up reminder for 7 days",
                        "Follow up once if no response in 1 week",
                        "For acceptances: Prepare using their interview format"
                    ]
                },
                {
                    title: "Host Cross-Promotional Event with Complementary Author",
                    description: "Partner with another author to expand reach.",
                    action: "Identify 3-5 authors in complementary (not competing) niches. Propose co-hosting IG Live, webinar, or joint community event. Use HQ Events to organize, promote to both lists, capture attendees for follow-up.",
                    deliverable: "Joint event hosted with 50+ attendees",
                    hqTools: ["HQ Events", "HQ Email Campaigns", "HQ Community"],
                    kpi: "50+ attendees; 100+ new email subscribers from partner promotion",
                    detailedSteps: [
                        "Research authors with similar audience size but different topic (complementary)",
                        "Draft partnership proposal: Joint webinar or IG Live, value to both audiences, split promotion",
                        "Suggest topic: 'Two Paths to [Shared Goal]' or panel discussion",
                        "Create event in HQ Events with registration form",
                        "Both promote: Your email list + their email list + social",
                        "During event: Each share story, teach value, answer questions, promote each other's books",
                        "Follow-up: Send recording + special offer for partner's book to your list (and vice versa)",
                        "Track new subscribers from partner in HQ CRM with tag"
                    ]
                },
                {
                    title: "Create Guest Content for High-Traffic Blogs",
                    description: "Write for established platforms to reach new readers.",
                    action: "Pitch and write 2-3 guest blog posts for websites your readers visit. Include author bio with book mention and link to lead magnet. Use HQ to track referral traffic from each guest post.",
                    deliverable: "2+ guest posts published",
                    hqTools: ["HQ Analytics for tracking", "HQ AI for content drafting"],
                    kpi: "Each guest post drives 50+ new opt-ins",
                    detailedSteps: [
                        "Identify 10 blogs/websites with your target audience",
                        "Review their guest post guidelines",
                        "Pitch 3 article ideas per blog (reference their content style)",
                        "Once accepted, write 800-1200 word article with actionable value",
                        "Include bio: '[Your Name] is the author of [Book] which helps [audience]. Get free chapter at [link]'",
                        "Create custom landing page in HQ specifically for each blog's traffic",
                        "Use UTM parameters to track: source=BlogName, medium=guest-post",
                        "Promote published guest post on your social channels"
                    ]
                },
                {
                    title: "Activate Street Team for Partner Promotion",
                    description: "Leverage your street team to amplify partnerships.",
                    action: "Brief street team on partnership events and guest content. Provide share assets (graphics, captions, links) in HQ. Ask them to promote across their networks. Track referrals via HQ Affiliate tracking.",
                    deliverable: "Street team promoting partnership content",
                    hqTools: ["HQ Community", "HQ Affiliate Program", "HQ Files"],
                    kpi: "Street team drives 100+ clicks to partnership content",
                    detailedSteps: [
                        "Post in private Street Team channel: Announce upcoming collaborations",
                        "Provide shareable assets in HQ Files: Graphics, caption templates, links",
                        "Create special affiliate links for street team to track their referrals",
                        "Incentivize: 'Top promoter this month gets exclusive 1-on-1 with author'",
                        "Make it easy: Copy-paste captions, pre-sized images, talking points",
                        "Track shares and referrals in HQ Affiliate Dashboard",
                        "Thank and recognize top promoters publicly in community"
                    ]
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Social Proof & Review Amplification",
            weekDescription: "Gather 25+ new reviews, showcase testimonials, increase trust.",
            icon: Star,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Social proof visible everywhere, review velocity increasing",
            tasks: [
                {
                    title: "Systematic Review Request Campaign",
                    description: "Proactively ask every reader for reviews.",
                    action: "Use HQ Email Automation to segment buyers and send step-by-step review request 10 days after purchase. Include screenshots showing exactly how to leave review. Offer incentive: exclusive Zoom Q&A for reviewers.",
                    deliverable: "Automated review request system",
                    hqTools: ["HQ Email Automations", "HQ Segmentation", "HQ Events"],
                    kpi: "25+ new verified reviews on Amazon/Goodreads",
                    detailedSteps: [
                        "Create segment in HQ: Purchased book 10-14 days ago",
                        "Draft email: Thank you, hope you're enjoying, ask for honest review",
                        "Make it stupid-easy: Include direct Amazon review link + screenshot instructions",
                        "Offer: 'Leave review this week → Get invited to exclusive author Q&A'",
                        "Set up automation trigger: 10 days post-purchase → Send review request",
                        "Follow-up: 5 days later send reminder to non-reviewers",
                        "Create HQ Event for exclusive Q&A (15 spots for reviewers only)",
                        "Thank each reviewer personally via email or DM"
                    ]
                },
                {
                    title: "Create Testimonial Showcase on All Properties",
                    description: "Display social proof prominently across platforms.",
                    action: "Collect best reviews and testimonials. Use HQ Website Builder to add testimonial sections to all landing pages. Create social media graphics featuring testimonials. Update email signature with '⭐⭐⭐⭐⭐ Rated 5 stars by readers'.",
                    deliverable: "Testimonials prominently displayed everywhere",
                    hqTools: ["HQ Website Builder", "HQ Files", "HQ Design Tools"],
                    kpi: "Testimonials on 5+ pages; conversion rate increase measured",
                    detailedSteps: [
                        "Compile 10-15 best testimonials in HQ Files",
                        "Create testimonial images using Canva (quote + star rating + name)",
                        "Add testimonial carousel to homepage in HQ Website Builder",
                        "Update book landing page with 5-star review section",
                        "Add testimonials to email templates (above CTA)",
                        "Create IG Story highlight reel of testimonials",
                        "Update author bio to include: 'As seen in...' or 'Rated 5 stars...'",
                        "Test if adding testimonials increases opt-in rate (A/B test)"
                    ]
                },
                {
                    title: "Launch Reader Success Story Campaign",
                    description: "Turn readers into case studies and advocates.",
                    action: "Identify 5-10 readers who've had transformations from your book. Interview them (15 min via HQ Booking calls). Create written case studies and video testimonials. Feature in community, email, and social. Use HQ to manage interview scheduling and recording.",
                    deliverable: "5 reader success stories documented",
                    hqTools: ["HQ Booking", "HQ Video Recording", "HQ Files", "HQ Community"],
                    kpi: "5 video testimonials + written case studies completed",
                    detailedSteps: [
                        "Post in HQ Community: 'Has this book helped you? I'd love to share your story!'",
                        "Email engaged subscribers with same ask",
                        "Use HQ Booking to schedule 15-min interviews",
                        "Prepare 5 questions: Before/after, specific result, favorite chapter, who should read this, rating",
                        "Record via Zoom or HQ video feature",
                        "Get written permission to use testimonial",
                        "Edit into 60-90s clips + write 200-word case study",
                        "Post weekly in community + email newsletter + social media"
                    ]
                },
                {
                    title: "Create Social Proof Ad Campaign",
                    description: "Use testimonials in paid advertising.",
                    action: "Create new ad set in HQ Ad Manager featuring real reader testimonials. Use video testimonials or quote graphics. Target warm audiences (landing page visitors, email list lookalikes). Test testimonial ads vs. author-direct ads.",
                    deliverable: "Testimonial-based ad campaign live",
                    hqTools: ["HQ Ad Manager", "HQ Video Editor"],
                    kpi: "Testimonial ads convert 20%+ better than regular ads",
                    detailedSteps: [
                        "Select 3 best video testimonials (30-45s clips)",
                        "Create ad copy: '[Name] used [Book] to [achieve result]. You can too.'",
                        "Design image ads with powerful testimonial quotes",
                        "Launch in HQ Ad Manager: Target lookalike of purchasers",
                        "Budget: $10-15/day",
                        "Track separately in HQ Analytics",
                        "Compare conversion rate to non-testimonial ads",
                        "Scale winning format"
                    ]
                },
                {
                    title: "Establish Book Club Partnerships",
                    description: "Get your book selected by book clubs for group reads.",
                    action: "Research 10-20 book clubs (Facebook groups, Goodreads groups, local clubs). Offer to provide author Q&A session if they select your book. Create book club discussion guide. Track outreach in HQ CRM.",
                    deliverable: "3+ book clubs reading your book",
                    hqTools: ["HQ CRM", "HQ Events", "HQ Files"],
                    kpi: "3 book club partnerships; 50+ books sold via clubs",
                    detailedSteps: [
                        "Search Facebook: '[Book topic] book club'",
                        "Search Goodreads: Active book clubs in your genre",
                        "Join clubs as member first; engage genuinely",
                        "Create Book Club Discussion Guide (PDF): 10-15 questions per chapter",
                        "Reach out to organizers: Offer free author Q&A if they select your book",
                        "Track in HQ CRM: Club name, contact, status, scheduled Q&A date",
                        "Promote to clubs: Discount codes for bulk purchases",
                        "After Q&A: Thank club, ask for reviews, invite to your community"
                    ]
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Launch Week - Big Promotional Push",
            weekDescription: "7-day intensive campaign to spike sales and momentum.",
            icon: Rocket,
            dailyTime: "60-180 minutes (heavy week)",
            weeklyGoal: "Significant sales increase, maximum visibility, energy and momentum",
            tasks: [
                {
                    title: "Plan 7-Day Launch Campaign",
                    description: "Create detailed daily promotional calendar.",
                    action: "Design launch week with daily themes: Day 1 - Why Now, Day 2 - Exclusive Excerpt, Day 3 - Limited Bonus, Day 4 - Reader Results, Day 5 - Live Reading, Day 6 - Last Chance, Day 7 - Celebration. Use HQ Calendar to organize all activities.",
                    deliverable: "Complete 7-day launch plan",
                    hqTools: ["HQ Calendar", "HQ Email Campaigns", "HQ Events"],
                    kpi: "All 7 days planned with specific content and CTAs",
                    detailedSteps: [
                        "Create launch calendar in HQ with daily breakdown",
                        "Day 1: Email blast 'It's here - why this book matters' + social announcement",
                        "Day 2: Share exclusive chapter excerpt + lead magnet offer",
                        "Day 3: Limited offer email: 'First 100 buyers get signed bookplate + bonus chapter'",
                        "Day 4: Email/social: 'Readers are saying...' (showcase testimonials)",
                        "Day 5: Host live community reading event (HQ Events)",
                        "Day 6: 'Last 24 hours for launch bonus' urgency campaign",
                        "Day 7: 'Thank you + celebration' post; winner announcement",
                        "Prepare all emails, social posts, graphics in advance"
                    ]
                },
                {
                    title: "Execute Daily Email Launch Sequence",
                    description: "Send strategic emails every day of launch week.",
                    action: "Use HQ Email to send daily value emails with clear CTA to buy. Each email provides unique value while building urgency. Track open rates, click rates, and purchases from each email in HQ Analytics.",
                    deliverable: "7 launch emails sent and tracked",
                    hqTools: ["HQ Email Campaigns", "HQ Analytics", "HQ Templates"],
                    kpi: "30%+ open rate; 10%+ click rate; X% purchase conversion",
                    detailedSteps: [
                        "Pre-write all 7 emails in HQ Templates",
                        "Schedule in HQ Email for specific send times (morning 9am works well)",
                        "Email 1: Launch announcement + personal note + buy link",
                        "Email 2: 'How Chapter 4 changed my life' + excerpt + buy CTA",
                        "Email 3: 'Limited bonus for next 50 buyers' + countdown + buy link",
                        "Email 4: Feature 3-4 reader testimonials + social proof + buy link",
                        "Email 5: Behind-the-scenes of writing process + buy link",
                        "Email 6: 'Final hours for launch bonus' + urgency + buy link",
                        "Email 7: 'Thank you!' + celebrate together + community invite",
                        "Track each email's revenue in HQ Analytics"
                    ]
                },
                {
                    title: "Increase Ad Budget on Top Performers",
                    description: "Scale winning ads during launch week.",
                    action: "Use HQ Ad Manager to increase budget 2-3x on best performing creatives. Run 'buy now' campaigns directly to book purchase page (not lead magnet). Focus on conversion objective. Monitor hourly for first 48 hours.",
                    deliverable: "Scaled ad campaigns generating direct sales",
                    hqTools: ["HQ Ad Manager", "HQ Analytics Dashboard"],
                    kpi: "Positive ROAS (return on ad spend); target 2:1 minimum",
                    detailedSteps: [
                        "Identify best ad from previous testing (lowest cost per purchase)",
                        "Increase daily budget: If was $15/day, increase to $40-50/day for launch week",
                        "Change objective: From 'Lead Generation' to 'Conversions - Purchase'",
                        "Create new ad variation highlighting launch bonus: 'Limited time: Buy now and get [bonus]'",
                        "Set up purchase tracking pixel on HQ thank-you page",
                        "Monitor HQ Ad Dashboard every 6-8 hours",
                        "If ROAS < 1.5:1 after 48 hours, reduce budget",
                        "If ROAS > 2:1, consider increasing budget further"
                    ]
                },
                {
                    title: "Host 2 Live Community Events During Launch",
                    description: "Create energy and connection during launch week.",
                    action: "Schedule 2 live events in HQ Community: Day 2 - Author Q&A (45 min), Day 5 - Live Reading + Book Discussion (60 min). Promote heavily via email and social. Record and post replays in community.",
                    deliverable: "2 live events with 30+ attendees each",
                    hqTools: ["HQ Events", "HQ Video Streaming", "HQ Community"],
                    kpi: "30+ live attendees per event; 100+ replay views",
                    detailedSteps: [
                        "Create events in HQ Events: Set date/time, create registration",
                        "Event 1 (Day 2): 'Ask Me Anything' - Open Q&A about book, writing journey, content",
                        "Event 2 (Day 5): 'Live Reading & Discussion' - Read favorite chapter, discuss themes",
                        "Promote: Email announcement 5 days before, daily social reminders, pinned community post",
                        "Prep: List of potential questions, key talking points, special announcement",
                        "During: Engage warmly, answer thoroughly, mention launch bonus, invite book purchases",
                        "Record via HQ or Zoom",
                        "Post replay in community + send to registrants who missed it",
                        "Follow up with attendees: Personal thank you + exclusive discount"
                    ]
                },
                {
                    title: "Track Launch Week Performance & Adjust",
                    description: "Monitor all metrics and optimize in real-time.",
                    action: "Review HQ Analytics Dashboard multiple times daily. Track: Daily sales, email performance, ad ROAS, website traffic, community engagement. Adjust strategy mid-week based on data: double down on what works, pause what doesn't.",
                    deliverable: "Launch week performance report",
                    hqTools: ["HQ Analytics", "HQ Dashboard", "HQ Reporting"],
                    kpi: "X% sales increase vs. baseline; launch goals met/exceeded",
                    detailedSteps: [
                        "Create HQ Dashboard with launch metrics: Daily sales, Email clicks, Ad spend/revenue, Community activity",
                        "Check metrics morning and evening",
                        "If email underperforming: Adjust subject lines for remaining days",
                        "If ads not profitable: Pause and reallocate budget to organic promotion",
                        "If event attendance low: Send additional SMS reminders",
                        "Document what's working in real-time",
                        "End of week: Compile full report with all numbers",
                        "Calculate total launch week revenue, ROI, new subscribers, community growth"
                    ]
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Product Diversification",
            weekDescription: "Launch companion products; create multiple revenue streams.",
            icon: DollarSign,
            dailyTime: "45-90 minutes",
            weeklyGoal: "At least 1 additional product launched; 10%+ bundle attach rate",
            tasks: [
                {
                    title: "Create & Launch Companion Workbook",
                    description: "Develop practical workbook to accompany book.",
                    action: "Design digital workbook with exercises, templates, and fillable worksheets for each chapter. Use HQ eCommerce to create separate product. Offer bundle: Book + Workbook at discount. Create upsell at checkout.",
                    deliverable: "Workbook product live in HQ",
                    hqTools: ["HQ eCommerce", "HQ Checkout Upsells", "HQ Files"],
                    kpi: "10% of book buyers purchase workbook",
                    detailedSteps: [
                        "Create workbook outline: 1 exercise per chapter + planning templates",
                        "Design PDF in Canva or Google Docs (20-30 pages)",
                        "Make fillable version (users can type in PDF) or provide editable doc",
                        "Upload to HQ eCommerce as new product: '[Book Title] Companion Workbook'",
                        "Price: $17-27 standalone, $10 add-on with book",
                        "Set up checkout upsell in HQ: 'Add workbook to your order for just $10 more'",
                        "Create landing page explaining workbook benefits",
                        "Promote: Email to book buyers, community post, social announcement",
                        "Track bundle attach rate in HQ Analytics"
                    ]
                },
                {
                    title: "Develop Audiobook or Audio Bonus Content",
                    description: "Expand format options for different learner types.",
                    action: "If full audiobook isn't ready, create 'author read bonus': Record yourself reading 2-3 key chapters or create exclusive audio commentary. Deliver via HQ for buyers. Tease sample chapters via email to drive book sales.",
                    deliverable: "Audio content created and distributed",
                    hqTools: ["HQ Files", "HQ Email Automation", "Audio hosting"],
                    kpi: "Audio content delivered to 100% of buyers",
                    detailedSteps: [
                        "Record 2-3 chapters using phone or basic mic (15-20 min each)",
                        "Edit for quality (remove background noise, normalize volume)",
                        "Upload MP3 files to HQ Files or host on Dropbox/Google Drive",
                        "Create 'bonus delivery' automation in HQ: Trigger = Book purchase → Send email with audio links",
                        "Tease on social: 'Hear me read Chapter 3 - link in bio' → Lead to lead magnet",
                        "If creating full audiobook: Use ACX/Findaway Voices, set up distribution",
                        "Promote audio option in all marketing materials"
                    ]
                },
                {
                    title: "Launch Group Coaching Tied to Book",
                    description: "Create premium offer for implementation support.",
                    action: "Design 4-week group coaching program: 'Apply [Book Title] to Your Life/Business'. Limit to 12 people. Use HQ Booking for payment + registration. Price at $297-497. Market to book buyers first (special discount). Use HQ Community for group interaction.",
                    deliverable: "Group coaching program launched",
                    hqTools: ["HQ Booking + Payment", "HQ Community", "HQ Email Campaigns"],
                    kpi: "10-15 participants enrolled",
                    detailedSteps: [
                        "Create program outline: 4 weekly group calls (60 min each) + implementation worksheets",
                        "Each week covers 2-3 book chapters with application exercises",
                        "Set up in HQ Booking: Create 'Group Coaching' product with payment",
                        "Price: $397 (or $297 for book buyers with code)",
                        "Create sales page in HQ: Program benefits, curriculum, testimonials, FAQs",
                        "Set limit: Maximum 12 participants for intimate group",
                        "Promote: Email sequence to book buyers, community announcement, social posts",
                        "Create private HQ Community channel for cohort",
                        "Deliver via weekly Zoom calls + HQ community support between calls"
                    ]
                },
                {
                    title: "Create Premium VIP Offer",
                    description: "Develop high-ticket 1-on-1 offering.",
                    action: "Design 'VIP Author Intensive': 90-min 1-on-1 strategy session where you personally help reader apply book concepts to their situation. Price at $497-997. Offer to 5 clients this month. Use HQ Booking for scheduling and payment.",
                    deliverable: "VIP intensive offered and booked",
                    hqTools: ["HQ Booking", "HQ Payment Processing", "HQ CRM"],
                    kpi: "3-5 VIP sessions booked",
                    detailedSteps: [
                        "Create 'VIP Intensive' offering: 90-minute Zoom session with pre-work and follow-up",
                        "Include: Pre-session questionnaire, personalized strategy, 30-day email support",
                        "Set up in HQ Booking with payment integration",
                        "Price: $497 (test pricing)",
                        "Limit availability: 5 spots this month only",
                        "Create simple sales page in HQ explaining transformation",
                        "Promote to: Most engaged email subscribers, community leaders, past coaching clients",
                        "Send personalized invitations to 20 ideal candidates",
                        "Deliver exceptional value to create case studies"
                    ]
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Events & Paid Programs",
            weekDescription: "Convert readers into paid experiences; build subscription revenue.",
            icon: Award,
            dailyTime: "45-120 minutes",
            weeklyGoal: "Workshop launched; membership tier active; recurring revenue initiated",
            tasks: [
                {
                    title: "Host Paid 4-Week Workshop",
                    description: "Create structured program for deeper transformation.",
                    action: "Launch 'Apply Chapter [X]: 4-Week Accountability Group' limited to 12 people. Use HQ Booking + paid checkout. Weekly group calls + daily community support + implementation tracking. Special price for book purchasers.",
                    deliverable: "Workshop sold and started",
                    hqTools: ["HQ Booking", "HQ Community", "HQ Email"],
                    kpi: "10-12 participants enrolled at $197-297 each",
                    detailedSteps: [
                        "Choose most actionable book chapter/concept for workshop focus",
                        "Create curriculum: Week 1 - Foundation, Week 2 - Implementation, Week 3 - Obstacles, Week 4 - Results",
                        "Set up HQ Booking: '4-Week [Topic] Workshop' with $247 payment",
                        "Create workshop sales page with clear outcomes",
                        "Promotion strategy: Email to book buyers (48 hours early access), Community announcement, Social media campaign",
                        "Offer early-bird discount: First 5 pay $197",
                        "Create private HQ Community channel for workshop cohort",
                        "Deliver: Weekly live call via Zoom + daily accountability in HQ Community + personal feedback",
                        "Track attendance and engagement; get testimonials at end"
                    ]
                },
                {
                    title: "Launch Paid Membership Tier in Community",
                    description: "Convert engaged community members into monthly recurring revenue.",
                    action: "Create paid VIP tier inside HQ Community: Monthly access to exclusive workshops, monthly author Q&A, early book content, private mastermind. Price at $27-47/month. Grandfather existing top contributors at discount.",
                    deliverable: "Membership tier launched",
                    hqTools: ["HQ Community", "HQ Subscription/Recurring Billing", "HQ Member Management"],
                    kpi: "20-30 paid members in first month",
                    detailedSteps: [
                        "Define VIP benefits: Monthly live Q&A, weekly implementation workshop, private VIP channel, early access to new content, monthly book recommendations",
                        "Set up in HQ: Create 'VIP Membership' subscription product at $37/month",
                        "Create sales page explaining VIP benefits vs free tier",
                        "Offer founding member rate: First 25 members get $27/month forever",
                        "Announce in community: Pin post explaining VIP tier",
                        "Email entire list: Segment most engaged subscribers for personal invite",
                        "Create private #vip channel in HQ Community",
                        "First VIP event: Welcome call, set expectations, get feedback on what they want",
                        "Deliver monthly value consistently to maintain retention"
                    ]
                },
                {
                    title: "Create Book-Based Online Course",
                    description: "Transform book into structured learning experience.",
                    action: "Develop mini-course based on book chapters. Record 8-12 video lessons (10-15 min each) teaching book concepts. Include worksheets, quizzes, community discussion access. Use HQ to host and sell course.",
                    deliverable: "Mini-course available for purchase",
                    hqTools: ["HQ Course Platform", "HQ Video Hosting", "HQ eCommerce"],
                    kpi: "Course created; 10+ students enrolled first week",
                    detailedSteps: [
                        "Outline course: 8-12 modules matching book structure",
                        "Each module: 10-15 min video lesson + PDF worksheet + action step",
                        "Record videos: Simple setup with good lighting and audio",
                        "Edit videos (basic cuts, add intro/outro)",
                        "Upload to HQ Course Platform or embed in HQ pages",
                        "Create accompanying workbook (can repurpose from earlier workbook)",
                        "Set up in HQ eCommerce: Price at $97-197",
                        "Offer bundle: Book + Course for $147 (vs $197 separate)",
                        "Promote: Email to engaged subscribers, community VIP offer",
                        "Provide course completion certificate via HQ"
                    ]
                },
                {
                    title: "Implement Upsell & Cross-Sell System",
                    description: "Maximize customer value with strategic offers.",
                    action: "Set up HQ checkout upsells: Book buyers see workbook offer → Workbook buyers see course offer → Course buyers see VIP membership. Create email sequences offering complementary products to existing customers.",
                    deliverable: "Complete upsell funnel active",
                    hqTools: ["HQ eCommerce Upsells", "HQ Email Automation", "HQ Analytics"],
                    kpi: "30%+ take at least one upsell; AOV increases 40%",
                    detailedSteps: [
                        "Map customer journey: Free lead magnet → Book → Workbook → Course → VIP/Coaching",
                        "Configure HQ Checkout upsells on confirmation page",
                        "Create post-purchase email sequence in HQ Automation",
                        "Book buyers (Day 3): 'Complete your transformation with the Workbook'",
                        "Workbook buyers (Day 7): 'Ready to go deeper? Join the course'",
                        "Course completers (Day 30): 'Continue momentum with VIP membership'",
                        "Track in HQ Analytics: Upsell conversion rate, AOV by segment",
                        "A/B test upsell offers and timing"
                    ]
                },
                {
                    title: "Survey Customers for Product Ideas",
                    description: "Let readers tell you what they want next.",
                    action: "Send survey via HQ Forms to all customers asking: What additional resources would help you? What format do you prefer? What topics interest you? Use data to inform next product decisions.",
                    deliverable: "Survey completed by 50+ customers",
                    hqTools: ["HQ Forms/Surveys", "HQ Email", "HQ Analytics"],
                    kpi: "50+ survey responses; 3 clear product ideas identified",
                    detailedSteps: [
                        "Create survey in HQ Forms: 8-10 questions about needs and preferences",
                        "Questions: Biggest challenge applying book, preferred format (video/audio/text), topics for deep dive, willingness to pay",
                        "Offer incentive: Entry to win free VIP session for completing survey",
                        "Email all customers: 'Help me create what you need'",
                        "Promote in community and social",
                        "Analyze responses in HQ Survey Results",
                        "Identify top 3 requested products/topics",
                        "Create roadmap: Which product to build next quarter"
                    ]
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Evergreen Automation & Scaling",
            weekDescription: "Build self-sustaining funnel; plan next 90 days.",
            icon: Zap,
            dailyTime: "30-60 minutes maintenance",
            weeklyGoal: "Evergreen funnel converting automatically; next quarter planned",
            tasks: [
                {
                    title: "Build Complete Evergreen Funnel in HQ",
                    description: "Create automated system that runs 24/7.",
                    action: "Use HQ Funnel Builder to create: Ad → Lead Magnet Landing Page → Email Nurture (7-14 days) → Tripwire (low-cost workbook $17) → Main Offer (book bundle $47) → Upsell (course/membership). Use data from tests to choose best creative and audience.",
                    deliverable: "Fully automated evergreen funnel operational",
                    hqTools: ["HQ Funnel Builder", "HQ Email Automations", "HQ eCommerce", "HQ Ad Manager"],
                    kpi: "Funnel converting at predictable rate daily",
                    detailedSteps: [
                        "Map complete funnel in HQ Funnel Builder (visual map)",
                        "Step 1: Run evergreen ads (winning creative from testing) to lead magnet page",
                        "Step 2: Automated email sequence (Days 0, 2, 5, 9, 14) nurturing to purchase",
                        "Step 3: On Day 7 email, offer tripwire: Workbook for $17 (low barrier)",
                        "Step 4: Workbook buyers get upgraded nurture sequence toward book bundle",
                        "Step 5: Book buyers see upsells: Course, VIP membership",
                        "Set ad budget: $20-50/day depending on ROI",
                        "Monitor weekly; optimize monthly",
                        "Goal: Funnel runs profitably without daily management"
                    ]
                },
                {
                    title: "Analyze 90-Day Analytics & Set KPI Targets",
                    description: "Review complete data from all initiatives.",
                    action: "Deep dive into HQ Analytics: CPL by source, conversion rate funnel (opt-in → buyer), average order value, community engagement metrics, affiliate conversions, email performance, content ROI. Define KPI targets for next 90 days.",
                    deliverable: "Comprehensive 90-day analytics report",
                    hqTools: ["HQ Analytics", "HQ Reporting", "HQ Dashboard"],
                    kpi: "All key metrics documented; improvement targets set",
                    detailedSteps: [
                        "Export data from HQ Analytics for Days 1-90",
                        "Calculate: Total revenue, Total ad spend, Total opt-ins, Email list growth, Community members added",
                        "Conversion metrics: Landing page → Opt-in %, Opt-in → Purchase %, Upsell take rate, Email open/click rates",
                        "Cost metrics: CPL by channel, Cost per sale, Customer acquisition cost (CAC), Lifetime value (LTV)",
                        "Engagement metrics: Community posts/week, Event attendance rate, Email engagement",
                        "Identify: Best traffic source, Best converting funnel, Best product/offer, Highest ROI activity",
                        "Set next 90-day targets: Increase conversion 20%, Reduce CPL 15%, Double email list, etc.",
                        "Create one-page dashboard in HQ to monitor these KPIs weekly"
                    ]
                },
                {
                    title: "Document Author Growth Playbook",
                    description: "Capture what works for repeatable success.",
                    action: "Compile everything that worked into 'Author Growth Playbook' in HQ Files: Best ad creatives, top email subject lines, highest-converting landing pages, most engaged content topics, successful partnership templates, community engagement tactics.",
                    deliverable: "Comprehensive playbook documented",
                    hqTools: ["HQ Files", "HQ Templates", "HQ Knowledge Base"],
                    kpi: "Complete playbook saved and organized",
                    detailedSteps: [
                        "Create folder in HQ Files: 'Author Growth Playbook'",
                        "Section 1: Content - Save top-performing posts, video scripts, email subject lines",
                        "Section 2: Ads - Screenshot winning ads, note targeting, save ad copy",
                        "Section 3: Funnels - Document conversion rates of each funnel",
                        "Section 4: Community - Best discussion prompts, event formats that worked",
                        "Section 5: Partnerships - Pitch templates that got yeses",
                        "Section 6: Lessons Learned - What didn't work and why",
                        "Make accessible to future team members",
                        "Use as template for next book launch or scaling current book"
                    ]
                },
                {
                    title: "Plan Next 90-Day Cycle",
                    description: "Set strategy for continued growth.",
                    action: "Based on data and learnings, plan next quarter: Monthly content themes, quarterly book promotions, next product launch (course expansion, book 2 outline, speaking tour). Schedule continuous events, set growth targets, plan community expansion.",
                    deliverable: "Next 90-day strategic plan",
                    hqTools: ["HQ Calendar", "HQ Project Management"],
                    kpi: "Complete quarterly plan with monthly milestones",
                    detailedSteps: [
                        "Review what worked best in Days 1-90",
                        "Set next quarter goals: Revenue target, Email list size, Community members, Product launches",
                        "Plan content: 12 weeks of themes tied to book or new content",
                        "Schedule events: Monthly webinar, weekly community discussions, quarterly book promotion",
                        "Product roadmap: Q2 - Launch full course, Q3 - Plan book 2, Q4 - Speaking tour",
                        "Budget planning: Ad spend, tools, team/contractors",
                        "Block calendar in HQ for key activities",
                        "Set monthly review dates to track progress against plan"
                    ]
                },
                {
                    title: "Activate Affiliate Program for Sustainable Promotion",
                    description: "Create passive promotional army.",
                    action: "Fully launch HQ Affiliate Program for street team and new affiliates. Provide marketing materials, tracking links, commission structure (20-30% per sale). Use HQ Affiliate Dashboard for management, payouts, and leaderboards.",
                    deliverable: "Affiliate program with 25+ active promoters",
                    hqTools: ["HQ Affiliate Program", "HQ Affiliate Dashboard", "HQ Payment/Payouts"],
                    kpi: "25+ affiliates; 15%+ of sales from affiliate traffic",
                    detailedSteps: [
                        "Set up HQ Affiliate Program with commission rate: 25% per book sale",
                        "Create affiliate welcome packet: Links, graphics, email templates, social captions",
                        "Build affiliate landing page in HQ: Explain program, benefits, how to join",
                        "Recruit: Email street team + engaged community members + past clients",
                        "Provide in HQ Affiliate Dashboard: Tracking links, real-time stats, earnings",
                        "Create tiered bonuses: Sell 10 books = $50 bonus, Top affiliate = signed books + 1-on-1 call",
                        "Send monthly affiliate newsletter with tips and top performer recognition",
                        "Process payouts through HQ on 1st of each month",
                        "Scale: Recruit 5-10 new affiliates monthly"
                    ]
                },
                {
                    title: "Optimize and Automate Customer Journey",
                    description: "Refine entire experience from discovery to repeat purchase.",
                    action: "Map complete customer journey in HQ. Identify friction points and opportunities. Automate: Welcome, nurture, upsells, re-engagement, review requests. Ensure every touchpoint is optimized and branded. Test and improve conversion at each stage.",
                    deliverable: "Fully automated customer journey",
                    hqTools: ["HQ Automation Builder", "HQ Customer Journey Map", "HQ Analytics"],
                    kpi: "20%+ improvement in customer lifetime value",
                    detailedSteps: [
                        "Use HQ Journey Mapper to visual customer path",
                        "Stages: Awareness → Lead → Customer → Repeat Buyer → Advocate",
                        "For each stage: List touchpoints, current conversion rate, improvement opportunities",
                        "Automate everything possible in HQ: Lead nurture, post-purchase, review requests, upsells, re-engagement",
                        "Remove friction: Simplify checkout, reduce form fields, one-click upsells",
                        "Add delight: Unexpected thank you video, personalized notes, surprise bonuses",
                        "Test: Different timing, messaging, offers at each stage",
                        "Measure in HQ Analytics: Progression rate through each stage, drop-off points, LTV"
                    ]
                }
            ]
        }
    ],
    
    kpiChecklist: [
        { metric: "New opt-ins (weekly)", target: "150-200" },
        { metric: "Community new members (weekly)", target: "30-50" },
        { metric: "Community active posts (weekly)", target: "50-100" },
        { metric: "Book sales (weekly)", target: "20-50" },
        { metric: "Average order value (AOV)", target: "$45-65" },
        { metric: "Cost per lead (CPL)", target: "$2-4" },
        { metric: "Affiliate signups", target: "25+" },
        { metric: "Affiliate sales (weekly)", target: "10-20" },
        { metric: "Email open rate", target: "30-40%" },
        { metric: "Email click rate", target: "5-10%" },
        { metric: "Purchase conversion rate", target: "8-12%" },
        { metric: "Customer lifetime value (LTV)", target: "$150-300" }
    ],

    templates: {
        communityWelcome: "Welcome! I'm [Author Name] — author of *[Book Title]*. This group is your place to discuss chapters, share how the book is helping you, and join live events. Start here: introduce yourself and tell us what chapter you're most excited about! (Pinned: group rules + upcoming event link.)",
        
        emailSubjects: [
            "Welcome — Here's your [Lead Magnet]",
            "Why I wrote [Book Title]",
            "A short excerpt you can use today",
            "Readers are getting results — would you share yours?",
            "Join us: live reading + community invite"
        ],
        
        affiliateInvite: "Hey [Name] — I'd love for you to be part of our Street Team! Share your personal link and earn [25%] commission per sale plus exclusive perks (signed copies & VIP calls). Sign up here: [affiliate link]"
    }
};