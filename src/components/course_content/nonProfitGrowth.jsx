import { Heart, Users, DollarSign, TrendingUp, Target, Award, Handshake, BarChart, Globe, MessageSquare, Calendar, Sparkles } from 'lucide-react';

export const nonProfitGrowthRoadmap = {
    courseTitle: "Non-Profit Growth Plan: 90-Day Fundraising & Impact System",
    courseDescription: "Scale your mission with donor acquisition, volunteer management, and measurable community impact. Use The Business Minds HQ to automate and grow your non-profit.",
    totalWeeks: 12,
    category: "Niche: Non-Profits",
    difficulty: "All Levels",
    
    successMetrics: {
        donors: "500+ monthly donors",
        funding: "$25K+ raised in 90 days",
        volunteers: "50+ active volunteers",
        impact: "Measurable community impact metrics"
    },

    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Mission Clarity & Strategic Foundation",
            weekDescription: "Crystallize your mission and build strategic foundation for growth.",
            icon: Target,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Clear mission statement, donor personas defined, strategic plan outlined",
            tasks: [
                {
                    title: "Refine Mission Statement & Impact Goals",
                    description: "Create compelling mission statement that inspires action and donations.",
                    action: "Workshop your mission statement to be clear, compelling, and action-oriented. Define 2025 impact goals with specific metrics (people served, lives changed, problems solved). Use HQ Strategy Tools to document. Make it emotionally resonant and measurable.",
                    deliverable: "Refined mission statement and 2025 impact goals",
                    hqTools: ["HQ Strategy Tools", "HQ AI for refinement", "HQ Files"],
                    kpi: "Mission statement that moves people to action",
                    detailedSteps: [
                        "Go to HQ Strategy Tools → Open 'Mission & Vision' template",
                        "Current mission audit: Is it clear who you serve? What problem you solve? How you solve it?",
                        "Refine using formula: We [action verb] [target population] by [unique approach] to [ultimate impact]",
                        "Example: 'We empower homeless youth through job training and mentorship to achieve economic independence and break cycles of poverty'",
                        "Use HQ AI: 'Help me refine this mission statement to be more compelling and clear'",
                        "Define 2025 impact goals: Number of people served, Lives transformed, Programs delivered, Geographic reach",
                        "Make goals SMART: 'Serve 500 families with food security, Provide job training to 100 youth, Place 75% of graduates in jobs'",
                        "Create visual mission statement graphic for website and materials",
                        "Save to HQ Files under 'Strategic Foundation'"
                    ]
                },
                {
                    title: "Define Donor Personas & Giving Journey",
                    description: "Understand who gives and why they support your mission.",
                    action: "Create 3 donor personas: Individual donor (monthly giver), Major donor (large one-time gifts), Corporate sponsor. For each: Demographics, motivations, giving capacity, preferred communication, engagement preferences. Map donor journey from awareness to advocate. Use HQ Templates.",
                    deliverable: "3 detailed donor personas and journey map",
                    hqTools: ["HQ Strategy Tool: Ideal Client Profile", "HQ Customer Journey Map", "HQ Files"],
                    kpi: "Donor personas guide all fundraising strategy",
                    detailedSteps: [
                        "Go to HQ Strategy Tools → 'Ideal Client Profile' (adapt for donors)",
                        "Persona 1 - Monthly Donor: Age 35-55, middle income, values social impact, gives $25-100/month, prefers email updates and stories",
                        "Persona 2 - Major Donor: Age 50-70, high net worth, business owner/exec, gives $5K-50K/year, wants personal relationship and impact reports",
                        "Persona 3 - Corporate Sponsor: Local/regional companies, CSR budget, gives $10K-100K, wants brand visibility and employee engagement",
                        "For each: Pain points (wants to make difference but overwhelmed by choices), Motivations (legacy, community, values alignment), Objections (trust, impact proof)",
                        "Map donor journey: Awareness → Interest → First gift → Repeat donor → Monthly supporter → Advocate",
                        "Identify touchpoints at each stage and what messaging moves them forward",
                        "Save personas to HQ Files - reference for all communications"
                    ]
                },
                {
                    title: "Audit Current Donor & Volunteer Base",
                    description: "Understand your existing community and identify growth opportunities.",
                    action: "Use HQ CRM to organize all donors and volunteers. Categorize donors by: One-time vs recurring, Gift size, Engagement level, Last contact date. Identify: Your best donors (top 20%), Lapsed donors (gave before, not recently), Engaged non-donors (volunteers, followers). Calculate donor retention rate.",
                    deliverable: "Complete donor/volunteer database in HQ CRM",
                    hqTools: ["HQ CRM", "HQ Analytics", "HQ Spreadsheet Import"],
                    kpi: "100% of contacts organized and segmented",
                    detailedSteps: [
                        "Import existing contacts to HQ CRM (from spreadsheets, email lists, donor management software)",
                        "Create custom fields: Donor status (monthly, one-time, lapsed, prospect), Total lifetime giving, Last gift date, Engagement score, Volunteer status, Interests/causes",
                        "Segment donors: Tier 1 ($5K+ lifetime), Tier 2 ($1K-5K), Tier 3 ($100-1K), Tier 4 (<$100)",
                        "Tag volunteers: Active, inactive, leadership roles",
                        "Identify opportunities: Lapsed donors to re-engage, One-time donors to convert to monthly, High-engaged non-donors to ask",
                        "Calculate metrics: Total donors, Active monthly donors, Donor retention rate (% who gave last year AND this year), Average gift size",
                        "Create dashboard in HQ tracking these metrics",
                        "Set up HQ automation: Tag 'Re-engagement needed' if no donation in 12+ months"
                    ]
                },
                {
                    title: "Build Non-Profit HQ Website Hub",
                    description: "Create professional online presence that converts visitors to supporters.",
                    action: "Use HQ Website Builder to create: Homepage (compelling story + impact), About (mission, team, history), Programs (what you do, who you serve), Impact (metrics, stories, testimonials), Donate (multiple giving options), Get Involved (volunteer, partner). Optimize for donations and volunteer signups.",
                    deliverable: "Professional non-profit website live",
                    hqTools: ["HQ Website & Funnel Builder", "HQ Templates", "HQ Forms", "HQ Payment"],
                    kpi: "Website driving 20+ new donors/volunteers per month",
                    detailedSteps: [
                        "Go to HQ Website Builder → Select 'Non-Profit' template",
                        "Homepage: Hero section with emotional story/image, '3 Ways to Help Today' (donate, volunteer, share), Impact counter (people served, lives changed), Latest news/stories",
                        "About page: Origin story (why organization exists), Mission statement, Team photos/bios, Financials/transparency (where money goes), Certifications (501c3, charity ratings)",
                        "Programs page: Each program with description, who benefits, impact metrics, 'Support This Program' CTA",
                        "Impact page: Annual report summary, Success stories with photos, Testimonials from beneficiaries and partners, Data visualizations",
                        "Donate page: Multiple giving options (one-time, monthly, tribute, corporate), Suggested amounts ($25, $50, $100, custom), Impact description for each amount ('$50 feeds a family for a week')",
                        "Get Involved page: Volunteer opportunities, Corporate partnerships, Event calendar, Email newsletter signup",
                        "Add HQ donation form with payment processing",
                        "Ensure mobile-optimized - 70% of traffic is mobile"
                    ]
                },
                {
                    title: "Set Up Donation Processing & Recurring Giving",
                    description: "Enable seamless online donations with monthly giving options.",
                    action: "Configure HQ Payment Processing for donations. Set up one-time and recurring giving options. Create suggested donation amounts with impact descriptions. Enable tribute/memorial giving. Set up automated donation receipts (tax-deductible). Create donor thank-you automation.",
                    deliverable: "Donation system processing gifts seamlessly",
                    hqTools: ["HQ Payment Processing", "HQ Recurring Billing", "HQ Email Automation"],
                    kpi: "20%+ of donors choose monthly recurring option",
                    detailedSteps: [
                        "Connect Stripe or PayPal to HQ Payment Processing (both support non-profit rates)",
                        "Create donation form in HQ with options:",
                        "One-time gifts: $25, $50, $100, $250, $500, Custom",
                        "Monthly recurring: $15/month, $25/month, $50/month, $100/month, Custom",
                        "For each amount, add impact: '$25/month provides school supplies for 2 children'",
                        "Add options: Tribute gift (in honor/memory of someone), Workplace matching (check if employer matches)",
                        "Set up HQ Recurring Billing for monthly donations (auto-charge)",
                        "Create automated thank-you sequence: Immediate email receipt (tax-deductible), Personal thank-you email from ED/founder within 24 hours, 30-day impact update, Quarterly donor newsletter",
                        "For donations $500+: Personal phone call from director",
                        "Track in HQ: Total donations, Monthly recurring revenue, Average gift size, Donor acquisition source"
                    ]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Donor Acquisition Campaign Launch",
            weekDescription: "Launch strategic campaign to attract first-time donors.",
            icon: Users,
            dailyTime: "60-120 minutes",
            weeklyGoal: "Campaign live; 50+ new donors; $5K+ raised",
            tasks: [
                {
                    title: "Create Compelling Fundraising Campaign",
                    description: "Design campaign around specific project or need.",
                    action: "Choose focused campaign (not general operating): Specific program, Capital project, Emergency relief, Seasonal need. Set goal ($10K-25K for 30 days). Create campaign story with emotional hook, specific impact, urgent need. Use HQ to build campaign page with progress tracker and donor wall.",
                    deliverable: "Campaign page live with clear goal",
                    hqTools: ["HQ Funnel Builder", "HQ Progress Tracker", "HQ Donor Wall"],
                    kpi: "$10K+ raised; 100+ donors",
                    detailedSteps: [
                        "Choose campaign focus: Tangible, urgent, emotionally compelling",
                        "Examples: 'Feed 500 Families This Thanksgiving', 'Send 30 Kids to Summer Camp', 'Build New Community Center Kitchen', 'Emergency Winter Shelter Fund'",
                        "Set SMART goal: $15,000 in 30 days (50 donors at $300 avg)",
                        "Create campaign page in HQ Funnel Builder: Headline addressing urgent need, Story of one person who will benefit (use real story, photo with permission), Specific impact breakdown ($50 = X, $100 = Y), Visual progress bar showing funding status, Donor wall showing recent supporters",
                        "Write campaign story: Hook (emotional opening), Problem (who's affected, how urgent), Solution (what you'll do with funds), Impact (specific outcomes), Call to action (donate now)",
                        "Create campaign assets: Social media graphics, Email banners, Printable flyers, Volunteer ask script",
                        "Set up HQ progress tracker: Auto-updates as donations come in",
                        "Launch campaign: Email to existing list, Social media blitz, Partner outreach"
                    ]
                },
                {
                    title: "Launch Email Fundraising Campaign",
                    description: "Activate existing list with compelling email series.",
                    action: "Create 7-email campaign series via HQ Email Automation: (1) Campaign launch + story, (2) Impact breakdown + urgency, (3) Testimonial from beneficiary, (4) Matching gift opportunity, (5) Social proof (donors so far), (6) 50% to goal update, (7) Final 48 hours push. Send to entire list, segment by engagement.",
                    deliverable: "Email campaign generating 40%+ of goal",
                    hqTools: ["HQ Email Campaigns", "HQ AI for copywriting", "HQ Analytics"],
                    kpi: "30%+ open rate; 5%+ click rate; $5K+ raised from email",
                    detailedSteps: [
                        "Segment email list in HQ: Active donors, Lapsed donors, Engaged non-donors (volunteers, followers), Cold list",
                        "Email 1 (Day 1): Launch - 'We Need Your Help: [Campaign Name]' - Share urgent need, personal story, clear ask",
                        "Email 2 (Day 4): Impact - 'Your $50 Could Change Everything' - Break down exactly what different amounts accomplish",
                        "Email 3 (Day 7): Story - 'Meet Maria: Why This Matters' - Deep-dive beneficiary story with photo",
                        "Email 4 (Day 10): Matching - 'DOUBLE Your Impact Today' - Announce matching gift donor (if you have one, or create challenge grant)",
                        "Email 5 (Day 14): Social proof - 'Join 127 Donors Who've Already Given' - Show momentum, share donor quotes",
                        "Email 6 (Day 21): Milestone - 'We're Halfway There! Help Us Finish Strong' - Progress update, renewed urgency",
                        "Email 7 (Day 28-29): Final push - 'Last 48 Hours: We're So Close' - Final emotional appeal, countdown",
                        "Use HQ AI to draft emails, personalize with your voice",
                        "Track in HQ: Open rates by segment, Click rates, Donations per email, Total raised via email"
                    ]
                },
                {
                    title: "Execute Social Media Fundraising Blitz",
                    description: "Leverage social channels to amplify campaign reach.",
                    action: "Post daily on Facebook, Instagram, LinkedIn: Impact stories, Donor spotlights, Progress updates, Urgency reminders, Behind-the-scenes. Use HQ to schedule content. Go live weekly to share updates and answer questions. Create sharable graphics. Run peer-to-peer fundraising challenge.",
                    deliverable: "30 days of consistent social fundraising content",
                    hqTools: ["HQ Social Scheduler", "HQ Templates", "HQ Analytics"],
                    kpi: "Social media drives 20%+ of donations; 100+ shares",
                    detailedSteps: [
                        "Create content calendar in HQ: 30 days of daily posts",
                        "Content types: Monday - Impact metric + campaign progress, Tuesday - Beneficiary story/photo, Wednesday - 'Ways to Give' education, Thursday - Donor thank-you/spotlight, Friday - Urgency reminder + weekend giving, Saturday - Behind-the-scenes, Sunday - Mission moment",
                        "Batch-create 30 graphics in Canva: Progress updates, Impact quotes, Donor thank-yous, Giving levels",
                        "Schedule in HQ Social Scheduler or Buffer",
                        "Go live weekly on Facebook: Campaign update, Q&A, Tour facility, Interview beneficiary",
                        "Create 'Challenge': Ask followers to give $25 and challenge 3 friends to do the same",
                        "Peer-to-peer: Provide toolkit for supporters to fundraise on your behalf (birthday fundraisers on Facebook, personal pages)",
                        "Pin donation link to top of all social profiles",
                        "Use HQ to track: Social referral traffic, Donations from social, Most engaging content"
                    ]
                },
                {
                    title: "Create Donor Cultivation Video Content",
                    description: "Show impact through powerful video storytelling.",
                    action: "Produce 3 videos: (1) Campaign overview from Executive Director (2 min), (2) Beneficiary testimonial (90 sec), (3) Behind-the-scenes/day in the life (3 min). Use smartphone or HQ video tools. Share across all channels. Use in emails and on donation page. Video dramatically increases conversion.",
                    deliverable: "3 videos produced and deployed",
                    hqTools: ["HQ Video Hosting", "HQ Video Editor", "HQ Templates"],
                    kpi: "Video content viewed 500+ times; increases donation page conversion 50%",
                    detailedSteps: [
                        "Video 1 - ED/Founder message: Record 2-min direct-to-camera explaining campaign, why urgent, what impact will be",
                        "Script: 'Hi, I'm [Name], [Title]. I need your help. [Describe need]. With your support, we can [specific impact]. Will you join us? Donate at [link]'",
                        "Video 2 - Beneficiary story: Interview someone your org has helped (with permission), share their transformation",
                        "Focus on: Where they were, How you helped, Where they are now, Why they're grateful",
                        "Video 3 - Behind-the-scenes: Show your team in action, programs in motion, real impact happening",
                        "Record on smartphone - good lighting and audio are key",
                        "Add captions (most social video watched without sound)",
                        "Upload to HQ Video Hosting",
                        "Embed: Video 1 on donation page, Video 2 in email campaign, Video 3 on social media",
                        "Track views and impact on donation conversion"
                    ]
                },
                {
                    title: "Implement Matching Gift Challenge",
                    description: "Secure matching donor to double impact and urgency.",
                    action: "Approach major donor or board member to provide $5K-10K matching gift for campaign. Promote heavily: 'Every dollar you give is DOUBLED.' Creates urgency and increases average gift size. Use HQ to track matching progress. Extend deadline if needed to reach match. Announce when match is secured.",
                    deliverable: "Matching gift secured and promoted",
                    hqTools: ["HQ CRM for major donor outreach", "HQ Email Campaigns", "HQ Progress Tracker"],
                    kpi: "Matching challenge increases donations 2-3x",
                    detailedSteps: [
                        "Identify potential matching donors: Board members, Major past donors, Local business owners, Grant opportunities",
                        "Craft matching gift pitch: 'Would you consider providing a $10K matching gift? It will inspire others to give and double your impact'",
                        "Secure commitment in writing",
                        "Announce via: Dedicated email - 'Incredible News: Every Gift DOUBLED', Social media blitz, Website banner, All campaign materials",
                        "Promote matching mechanics: 'For next 14 days, every dollar you give is MATCHED dollar-for-dollar up to $10,000. Double your impact today!'",
                        "Create matching tracker in HQ: Show progress toward matching goal",
                        "Update regularly: '$4,832 of $10,000 match remaining - donate now to double your gift!'",
                        "Final push: '24 hours left to double your impact! $2,150 match remaining'",
                        "Thank matching donor publicly (with permission)",
                        "Track: Total raised during match period vs. before, Average gift increase"
                    ]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Monthly Giving Program Setup",
            weekDescription: "Build sustainable recurring revenue through monthly donors.",
            icon: Heart,
            dailyTime: "45-90 minutes",
            weeklyGoal: "Monthly giving program launched; 30+ monthly donors secured",
            tasks: [
                {
                    title: "Design Monthly Giving Program with Tiers",
                    description: "Create compelling recurring giving program with benefits.",
                    action: "Create tiered monthly giving program: Friend ($15/month), Supporter ($25/month), Champion ($50/month), Hero ($100+/month). For each tier: Clear impact statement, Recognition/benefits, Exclusive perks. Name your program meaningfully (e.g., 'Circle of Hope', 'Impact Partners'). Use HQ to manage and track.",
                    deliverable: "Monthly giving program launched",
                    hqTools: ["HQ Subscription Program", "HQ Membership Management", "HQ Templates"],
                    kpi: "30+ monthly donors enrolled; $1,500+/month recurring",
                    detailedSteps: [
                        "Name your program: '[Organization] Impact Circle' or 'Sustainer Society'",
                        "Create tiers with meaningful names and impact:",
                        "Tier 1 - Friend ($15/month): 'Provides school supplies for 1 child monthly', Benefits: Monthly email updates, Annual impact report",
                        "Tier 2 - Supporter ($25/month): 'Feeds 2 families weekly', Benefits: Above + Quarterly thank-you video, Name on website donor wall",
                        "Tier 3 - Champion ($50/month): 'Provides job training for 1 person monthly', Benefits: Above + Exclusive behind-the-scenes tours, Invitation to annual donor appreciation event",
                        "Tier 4 - Hero ($100+/month): 'Changes a life every month', Benefits: Above + Personal quarterly calls with ED, Advisory input opportunities, VIP event access",
                        "Set up in HQ Subscription Program: Create each tier with recurring billing",
                        "Create monthly giving page on website explaining program and benefits",
                        "Design monthly donor welcome packet (PDF) with program info and thank-you gift"
                    ]
                },
                {
                    title: "Create Monthly Donor Conversion Campaign",
                    description: "Convert one-time donors to monthly sustainers.",
                    action: "Launch 'Join Our [Program Name]' campaign targeting: One-time donors (upgrade to monthly), High-engaged non-donors (volunteers, followers), Lapsed donors (reactivate as monthly). Use HQ Email Automation for multi-touch campaign. Offer incentive: First month free, Welcome gift, Founder's rate (locked-in pricing).",
                    deliverable: "Conversion campaign running; 25+ converted to monthly",
                    hqTools: ["HQ Email Automation", "HQ CRM Segmentation", "HQ Landing Pages"],
                    kpi: "15-20% of one-time donors convert to monthly",
                    detailedSteps: [
                        "Segment audiences in HQ CRM: Recent one-time donors (last 6 months), Multi-time donors, Active volunteers, Highly engaged email subscribers",
                        "Create conversion landing page: Headline 'Become a Sustainer: Change Lives Every Month', Benefits of monthly giving (predictable support, convenient, bigger cumulative impact), Tier comparison chart, Simple signup form",
                        "Email sequence to one-time donors: Email 1: 'Thank you! Want to multiply your impact?' - Introduce monthly program, Email 2: 'Your $25/month = [specific impact]' - Show cumulative annual impact, Email 3: 'Join [#] Monthly Heroes' - Social proof, donor stories, Email 4: 'Special Offer: First Month Free' - Limited time incentive",
                        "Create special offer: First month free OR welcome gift (branded item, handwritten thank-you card)",
                        "Set up HQ automation: When someone converts to monthly, trigger welcome sequence",
                        "Track conversion funnel in HQ: Email opens → Landing page visits → Signups",
                        "Target: Convert 20% of one-time donors = sustainable $1K+ MRR"
                    ]
                },
                {
                    title: "Build Monthly Donor Retention System",
                    description: "Keep monthly donors engaged and prevent cancellations.",
                    action: "Create monthly touchpoint calendar: Impact updates (what their money accomplished), Beneficiary stories, Behind-the-scenes content, Exclusive previews. Use HQ Email Automation for monthly newsletters. Personal thank-you from ED. Annual in-person appreciation event. Track retention rate and re-engage if card declines.",
                    deliverable: "Retention system preventing churn",
                    hqTools: ["HQ Email Automation", "HQ Events", "HQ Reporting"],
                    kpi: "90%+ monthly donor retention rate",
                    detailedSteps: [
                        "Create monthly communication calendar: 5th of month: Impact report email (what last month's donations accomplished), 15th: Beneficiary spotlight (story + photo), 25th: Behind-the-scenes update or volunteer highlight",
                        "Quarterly: Personal video message from Executive Director, Invitation to exclusive donor event or virtual tour",
                        "Annual: In-person donor appreciation event, Impact report with data and stories, Personalized thank-you card from someone served",
                        "Set up HQ automation: Monthly newsletter to all sustainers, Anniversary emails ('You've been a monthly donor for 6 months! Here's the impact you've made'), Milestone emails ('Your 12 donations have fed 48 families!')",
                        "Failed payment handling: HQ sends automatic retry + email notification, Personal phone call if card fails twice, Offer to update payment method",
                        "Create special HQ Community channel for monthly donors (exclusive content, direct access to team)",
                        "Track in HQ: Monthly donor count, Churn rate (target <10% monthly), Average donor lifespan, Lifetime value"
                    ]
                },
                {
                    title: "Launch Tribute & Memorial Giving Program",
                    description: "Create meaningful giving option for honoring loved ones.",
                    action: "Set up tribute giving (in honor of birthdays, anniversaries, memories). Add option to donation form. Create digital tribute cards (HQ templates). Send acknowledgment to honoree's family. Promote for holidays, special occasions. This converts non-donors (friends/family making gifts in someone's name).",
                    deliverable: "Tribute program active and promoted",
                    hqTools: ["HQ Donation Forms", "HQ Email Automation", "HQ Design Templates"],
                    kpi: "Tribute gifts represent 10-15% of donations",
                    detailedSteps: [
                        "Add to HQ donation form: Checkbox 'This gift is in honor/memory of someone', Fields for: Honoree name, Occasion (birthday, memorial, holiday, etc.), Notification recipient name + address",
                        "Create tribute card templates in HQ: Professional design with your branding, Text: '[Donor name] has made a gift to [Organization] in [honor/memory] of [Honoree name]. Their generous donation will [impact].'",
                        "Set up HQ automation: When tribute gift made → Generate card → Email to notification recipient (+ option to mail physical card)",
                        "Send acknowledgment: To donor immediately (tax receipt), To honoree's family within 48 hours (tribute card)",
                        "Promote tribute giving: 'Honor someone special with a gift that makes a difference', Email campaigns before: Mother's Day, Father's Day, Holidays, Giving Tuesday",
                        "Create 'Memorial Giving' page: For families to request donations in lieu of flowers, Provide simple link they can share",
                        "Track in HQ: Number of tribute gifts, Average tribute gift (often higher than regular), Occasions that drive most tributes"
                    ]
                },
                {
                    title: "Create Workplace Giving Integration",
                    description: "Tap into corporate matching and workplace campaigns.",
                    action: "Register with workplace giving platforms (Benevity, YourCause, etc.). Add employer matching option to donation form. Create toolkit for donors to request matching from employers. Partner with local companies for workplace campaigns. Use HQ to track corporate matching opportunities.",
                    deliverable: "Workplace giving enabled; 5+ companies participating",
                    hqTools: ["HQ Donation Forms", "HQ CRM", "HQ Templates"],
                    kpi: "10-20% donation increase through matching",
                    detailedSteps: [
                        "Register non-profit on major matching platforms: Benevity, YourCause, America's Charities, United Way",
                        "Add to donation form: 'Does your employer match donations?' checkbox, Search field for company name, Auto-populate matching eligibility",
                        "Create donor guide: 'How to Request Matching from Your Employer' - Step-by-step instructions for common platforms",
                        "Send to HQ Files, link from confirmation email",
                        "Identify major employers in your area: Research which companies have giving programs, Compile list of HR/CSR contacts",
                        "Pitch workplace campaigns: Email/call HR directors, Offer: Lunch-and-learn presentation, Payroll deduction program, Employee volunteer days, Donation matching partnership",
                        "Create employer toolkit: One-page overview of your mission, Impact metrics, Volunteer opportunities, Matching info",
                        "Track in HQ CRM: Companies with matching programs, Employees who've donated from each company, Potential matching value not yet claimed",
                        "Follow-up: Thank donors who trigger matches, Send impact report to matching companies"
                    ]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Volunteer Recruitment & Management",
            weekDescription: "Build army of engaged volunteers to expand capacity.",
            icon: Users,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Volunteer program structured; 30+ active volunteers recruited",
            tasks: [
                {
                    title: "Define Volunteer Roles & Opportunities",
                    description: "Create clear, meaningful volunteer positions.",
                    action: "Identify 5-7 volunteer roles needed: Event volunteers, Program assistants, Administrative support, Fundraising committee, Board members, Ambassadors. For each: Detailed role description, Time commitment, Skills needed, Impact they'll make. Create volunteer handbook. Use HQ to manage applications and scheduling.",
                    deliverable: "Volunteer program structure defined",
                    hqTools: ["HQ Files", "HQ Forms", "HQ Booking"],
                    kpi: "7 volunteer roles clearly defined",
                    detailedSteps: [
                        "Audit organizational needs: What tasks take staff time that volunteers could do? What programs need people power? What skills gaps do you have?",
                        "Define volunteer roles: Role 1: Event Volunteers - Help at fundraisers, community events (4-8 hours/event, flexible), Role 2: Program Assistants - Support program delivery, mentor beneficiaries (4 hours/week, 6 month commitment), Role 3: Administrative - Data entry, mailings, social media (2-3 hours/week, remote), Role 4: Fundraising Team - Event planning, donor outreach, grant research (5 hours/month, 1 year), Role 5: Board Members - Governance, strategic guidance (5-10 hours/month, 3 year term), Role 6: Skills-Based - Marketing, legal, accounting pro bono (varies, project-based), Role 7: Ambassadors - Spread the word, recruit, represent org (flexible, ongoing)",
                        "For each role create: Full description (what they'll do), Time commitment and schedule, Skills/background needed, Training provided, Impact statement ('Your 4 hours/week helps us serve 10 additional families')",
                        "Create volunteer handbook in HQ Files: Welcome from ED, Mission and programs overview, Volunteer policies, Role descriptions, Contact info",
                        "Set up volunteer application form in HQ Forms"
                    ]
                },
                {
                    title: "Launch Volunteer Recruitment Campaign",
                    description: "Attract passionate people to join your mission.",
                    action: "Create 'Join Our Team' volunteer recruitment campaign: Landing page with volunteer opportunities, Application form, Interview scheduling. Promote via: Email to supporters, Social media call-out, Community partnerships, Corporate volunteer programs, College service learning. Use HQ to manage applicants.",
                    deliverable: "50+ volunteer applications received",
                    hqTools: ["HQ Landing Pages", "HQ Forms", "HQ CRM", "HQ Email Campaigns"],
                    kpi: "50+ applicants; 30+ onboarded",
                    detailedSteps: [
                        "Create 'Volunteer With Us' page in HQ Website Builder: Compelling headline: 'Change Lives. Join Our Team.', Impact statement, Benefits of volunteering (make a difference, gain skills, meet people, flexible schedules), Role cards showing opportunities, Application form",
                        "Build application in HQ Forms: Contact info, Interests/skills, Preferred roles (select multiple), Availability (days/times), Background (why interested, relevant experience), References (for roles working directly with beneficiaries)",
                        "Set up HQ CRM pipeline: Applicant → Interview scheduled → Training completed → Active volunteer",
                        "Launch recruitment campaign: Email to existing supporters: 'Can you spare 2 hours/month?', Social media series highlighting different volunteer roles and current volunteers, Partner with local colleges (service learning programs), Reach out to corporate CSR programs (employee volunteer days), Post on volunteer platforms (VolunteerMatch, Idealist, local sites)",
                        "Create recruitment toolkit: Social graphics, Email signature banner, Printed flyers, Volunteer ambassador script",
                        "Host virtual info session via HQ Events: Overview of opportunities, Q&A, Easy application link"
                    ]
                },
                {
                    title: "Create Volunteer Onboarding System",
                    description: "Welcome and train volunteers for success and retention.",
                    action: "Design onboarding process: Application review → Interview (HQ Booking) → Background check if needed → Orientation training (HQ Course or video) → Role-specific training → First assignment with mentor. Create welcome packet. Set up HQ Automation to guide volunteers through process. Make first experience excellent.",
                    deliverable: "Onboarding system with 100% completion rate",
                    hqTools: ["HQ Course Builder for training", "HQ Booking", "HQ Email Automation", "HQ Files"],
                    kpi: "90%+ onboarding completion; volunteers feel prepared",
                    detailedSteps: [
                        "Step 1 - Application review: Screen applications in HQ CRM, Flag top candidates for interviews",
                        "Step 2 - Interview: Set up HQ Booking for 15-20 min volunteer interviews, Ask about: Motivation, Experience, Expectations, Availability, Match to roles",
                        "Step 3 - Background check: For roles with vulnerable populations (use Checkr or similar), Process through HQ workflow",
                        "Step 4 - General orientation: Create 30-min orientation video in HQ Course Builder, Cover: Mission and impact, Programs overview, Volunteer policies, Expectations and commitments, How to get help",
                        "Step 5 - Role training: Create module for each role (program procedures, safety, best practices), Include: Training videos, Manuals/guides, Quizzes to test understanding",
                        "Step 6 - First assignment: Pair with experienced volunteer mentor, Shadow first shift/project, Debrief afterward",
                        "Create volunteer welcome packet: Welcome letter, Org t-shirt/badge, Volunteer handbook, Emergency contacts, Volunteer hours tracking sheet",
                        "Automate in HQ: Application received → Interview invitation, Interview completed → Orientation link, Training completed → First assignment scheduled, Each step tracked in HQ CRM"
                    ]
                },
                {
                    title: "Implement Volunteer Management System",
                    description: "Track hours, schedules, and engagement efficiently.",
                    action: "Use HQ to manage volunteers: Scheduling system for shifts/events, Hours tracking (for volunteer impact reporting), Communication hub, Recognition/milestones. Create private volunteer community channel in HQ. Monthly volunteer newsletter. Track engagement and retention. Make it easy for volunteers to feel connected.",
                    deliverable: "Central volunteer management hub in HQ",
                    hqTools: ["HQ Booking/Scheduling", "HQ Community", "HQ CRM", "HQ Email Automation"],
                    kpi: "80%+ volunteer retention month-to-month",
                    detailedSteps: [
                        "Set up volunteer scheduling in HQ Booking: Create recurring shifts (food pantry Tuesdays 9am-12pm, after-school program Mon/Wed 3-5pm), One-time events (fundraiser volunteer slots), Allow volunteers to self-schedule available shifts",
                        "Track hours: Create simple form in HQ for volunteers to log hours, Supervisor verification, Export for reporting (grant requirements, tax deduction letters)",
                        "Create 'Volunteer Hub' in HQ Community: Announcements channel, Volunteer stories and photos, Q&A and support, Upcoming opportunities, Social/connection",
                        "Monthly volunteer newsletter via HQ Email: Impact update (how volunteer hours contributed), Volunteer spotlights, Upcoming opportunities and events, Training and resources, Thank you and appreciation",
                        "Set up engagement tracking in HQ CRM: Last volunteer date, Total hours, Participation frequency, Engagement score, Milestones (25 hours, 50 hours, 100 hours)",
                        "Automated re-engagement: If volunteer hasn't signed up in 30 days, HQ sends 'We miss you!' email with new opportunities",
                        "Track retention rate: Active this month who were active last month (target 80%+)"
                    ]
                },
                {
                    title: "Launch Volunteer Recognition & Retention Program",
                    description: "Appreciate volunteers to keep them engaged and committed.",
                    action: "Create recognition system: Milestone badges (25/50/100/500 hours), Monthly spotlight in newsletter/social, Handwritten thank-you notes, Quarterly appreciation events, Annual volunteer awards. Use HQ to track milestones and automate recognition. Make volunteers feel valued and essential. Recognition prevents burnout and turnover.",
                    deliverable: "Recognition program delighting volunteers",
                    hqTools: ["HQ CRM for milestone tracking", "HQ Email Automation", "HQ Events"],
                    kpi: "100% of volunteers feel appreciated; 85%+ retention",
                    detailedSteps: [
                        "Create milestone system in HQ: Track volunteer hours in CRM, Set up automated triggers: 25 hours → Certificate + thank-you email, 50 hours → Phone call from ED + social media shout-out, 100 hours → Recognition at event + org swag, 500 hours → Plaque + featured blog post",
                        "Monthly recognition: Select 'Volunteer of the Month', Feature in newsletter with photo and story, Post on social media, Small gift card or org merchandise",
                        "Birthday recognition: HQ automation sends birthday email with appreciation",
                        "Personal touches: Handwritten thank-you note after first volunteer shift (from ED or volunteer coordinator), Personalized email after each shift thanking for specific contribution",
                        "Events: Quarterly volunteer appreciation social (pizza party, picnic, virtual gathering), Annual volunteer awards ceremony (Rookie of the Year, Most Hours, Most Impactful, Leadership Award)",
                        "Public recognition: Volunteer appreciation page on website with photos, Social media #VolunteerSpotlight weekly, Annual report highlighting volunteer contributions (total hours, $ value, impact)",
                        "Ask for feedback: Annual volunteer survey (what's working, what could improve), Act on feedback and communicate changes"
                    ]
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Corporate Partnership Development",
            weekDescription: "Secure major funding through corporate sponsorships.",
            icon: Handshake,
            dailyTime: "60-90 minutes",
            weeklyGoal: "3+ corporate partnerships in pipeline; 1+ secured",
            tasks: [
                {
                    title: "Research & Identify Target Corporate Partners",
                    description: "Find companies aligned with your mission and community.",
                    action: "Create list of 30 potential corporate partners: Local businesses (connection to community), Corporations with CSR budgets, Companies whose values align with mission, Industries related to cause. Research each: CSR priorities, Giving history, Decision makers. Build prospect list in HQ CRM with priority tiers.",
                    deliverable: "30 corporate prospects identified and prioritized",
                    hqTools: ["HQ CRM", "HQ Research Templates", "HQ Spreadsheets"],
                    kpi: "30 prospects tiered by likelihood and gift size potential",
                    detailedSteps: [
                        "Identify target sectors: Industries connected to your cause (health non-profit → healthcare companies, education → ed-tech), Local companies (banks, utilities, retailers with community presence), National corporations with local presence (Target, Walmart, etc.)",
                        "Research companies: Check website for CSR/sustainability/community pages, Review past giving (press releases, annual reports), Identify focus areas (does your mission align?), Find local contacts (store managers, regional directors)",
                        "Create prospect list in HQ CRM: Company name, Industry, Estimated giving capacity ($5K, $10K, $25K+), CSR focus areas, Contact information (CSR director, marketing, local manager), Connection (do you know anyone there?), Priority tier (Tier 1: Best fit + capacity, Tier 2: Good potential, Tier 3: Long-term cultivation)",
                        "For each prospect, note: Why they should partner with you, What benefit they'd get, Potential sponsorship amount, Specific program to fund",
                        "Start with Tier 1: Warmest connections, best alignment, biggest potential"
                    ]
                },
                {
                    title: "Create Corporate Partnership Packages",
                    description: "Design tiered sponsorship offerings with clear benefits.",
                    action: "Develop 3-4 sponsorship tiers: Presenting Sponsor ($25K+), Champion Sponsor ($10K-25K), Supporting Sponsor ($5K-10K), Community Partner ($1K-5K). For each tier: Recognition benefits, Employee engagement opportunities, Marketing exposure, Impact reporting. Create professional sponsorship deck (HQ templates). Focus on ROI for corporate partner.",
                    deliverable: "Corporate partnership deck and packages",
                    hqTools: ["HQ Templates", "HQ Files", "HQ Presentation Builder"],
                    kpi: "Professional package that closes 30%+ of pitches",
                    detailedSteps: [
                        "Design sponsorship tiers with escalating benefits:",
                        "Tier 1 - Presenting Sponsor ($25K): Logo on all materials, Exclusive social media series, Speaking opportunity at signature event, Employee volunteer day, Executive tour and impact briefing, Feature in annual report, PR announcement",
                        "Tier 2 - Champion ($10K-25K): Logo on event materials and website, Social media mentions (4x), Booth at event, Employee matching program, Quarterly impact report",
                        "Tier 3 - Supporting ($5K-10K): Logo on website and select materials, Social media thank-you, Newsletter feature, Employee volunteer opportunity",
                        "Tier 4 - Community Partner ($1K-5K): Website listing, Event recognition, Impact report, Volunteer opportunity",
                        "Create sponsorship deck: Cover with compelling image, Mission and impact (one page), Problem you're solving (data + story), Your solution and programs, Sponsorship opportunities (tier comparison chart), Benefits summary (what's in it for them), Impact they'll make, Next steps and contact",
                        "Design professionally in Canva or PowerPoint",
                        "Save to HQ Files as customizable template",
                        "Create one-pager quick reference version"
                    ]
                },
                {
                    title: "Launch Corporate Outreach Campaign",
                    description: "Systematically approach target companies with proposals.",
                    action: "Execute personalized outreach to Tier 1 prospects: Research connection/warm intro if possible, Send personalized email with micro-proposal, Follow up with phone call, Request meeting to discuss partnership. Use HQ CRM to track outreach. Goal: 10 conversations, 3 proposals, 1 signed partnership. Not all will convert - it's a pipeline game.",
                    deliverable: "10 partnership conversations; 3 proposals sent",
                    hqTools: ["HQ CRM", "HQ Email Templates", "HQ Proposal Generator"],
                    kpi: "30% proposal-to-partnership close rate",
                    detailedSteps: [
                        "Week 1 - Research and personalize: For each Tier 1 prospect, find: Warm connection (board member, donor, volunteer who works there?), Recent company news (expansion, award, new CSR initiative), Specific program alignment",
                        "Week 2 - Email outreach: Use HQ email templates but highly personalize, Subject: '[Company Name] + [Your Org]: Partnership Opportunity', Body: Brief (3-4 sentences), Personal connection or reference, Why this partnership makes sense, Specific ask (15-min call to explore), Attach one-pager (not full deck yet)",
                        "Week 3 - Follow-up: Call 3 days after email if no response, Voicemail: Name, organization, sent email about partnership, 30-second value proposition, 'I'll follow up via email with good times to connect'",
                        "Week 4 - Meetings: For interested parties, schedule via HQ Booking, Meeting prep: Tailor sponsorship deck to their priorities, Bring: Deck, budget/proposal, impact stories, Meeting flow: Listen first (what are their CSR goals?), Present alignment, Show sponsorship tiers, Discuss customization, Ask for the partnership",
                        "Track in HQ CRM: Each touchpoint (email sent, call made, meeting held), Responses and next steps, Proposal status (drafting, sent, pending, closed)",
                        "Send proposals within 48 hours of meeting"
                    ]
                },
                {
                    title: "Design Employee Engagement Programs",
                    description: "Create meaningful ways for corporate employees to get involved.",
                    action: "Develop corporate volunteer day program: Half-day or full-day structured volunteer experience for employee teams. Create toolkit: Agenda, Activities matched to # of volunteers, Impact metrics, Team-building elements. Also offer: Payroll giving campaigns, Skills-based volunteering, Board service. Make it easy and impactful for companies.",
                    deliverable: "Corporate engagement program packages ready",
                    hqTools: ["HQ Templates", "HQ Files", "HQ Events"],
                    kpi: "Corporate volunteer program for 5+ companies",
                    detailedSteps: [
                        "Corporate volunteer day design: Options based on team size: Small group (5-10): Mentoring, tutoring, specialized project, Medium group (10-25): Event support, program assistance, community service, Large group (25+): Build/renovation project, large-scale sorting/packing, community event",
                        "Create structured agenda: Welcome and mission overview (15 min), Hands-on volunteer activity (2-3 hours), Break/lunch (provided or team provides), Reflection and impact sharing (15 min), Group photo and thank-yous",
                        "Build corporate volunteer toolkit: Planning guide for company HR/CSR, Activity options menu, Logistics checklist, Waiver forms, Post-event impact report template",
                        "Additional engagement options: Payroll giving campaign: Help company set up deductions + matching, Lunch-and-learn: Present to employees about cause and impact, Skills-based volunteering: Marketing, finance, IT pros donate expertise, Board recruitment: Invite executives to serve on board, Product/service donations: In-kind contributions",
                        "Create corporate engagement page on HQ website: Benefits of partnership, Ways to engage, Testimonials from partner companies, Contact form",
                        "After each corporate volunteer day: Send thank-you email with impact report, Photos from the day, Next engagement opportunity"
                    ]
                },
                {
                    title: "Cultivate and Steward Corporate Partnerships",
                    description: "Keep corporate partners engaged for multi-year relationships.",
                    action: "Create corporate stewardship plan: Quarterly impact reports (show exactly what their investment accomplished), Annual in-person meeting, Exclusive updates and previews, Invitation to special events, Recognition across channels. Use HQ to manage deliverables and communications. Goal: Multi-year renewals and increased giving. Retention is easier than acquisition.",
                    deliverable: "Stewardship calendar for each corporate partner",
                    hqTools: ["HQ CRM", "HQ Calendar", "HQ Email Automation", "HQ Reporting"],
                    kpi: "80%+ corporate partner renewal rate",
                    detailedSteps: [
                        "Create stewardship calendar template: Month 1: Thank-you package (agreement signed, logo usage, benefits confirmation), Month 3: First quarterly impact report, Month 6: Mid-year check-in call, invitation to site visit, Month 9: Second quarterly report + renewal conversation preview, Month 12: Annual impact report + renewal proposal, Ongoing: Monthly newsletter mentions, Social media tags (minimum quarterly), Event invitations",
                        "Quarterly impact report structure: Executive summary (impact highlights), Financial transparency (how their dollars were used), Beneficiary stories (who was helped because of them), Metrics and outcomes, Recognition thank-you, Looking ahead (upcoming programs/needs)",
                        "Build templates in HQ Files for: Impact report (branded design), Social media thank-you graphics, Email updates, Recognition certificate",
                        "Set up HQ automations: Anniversary reminder (celebrate partnership milestones), Quarterly report deadline alerts, Renewal timeline triggers (start renewal conversations 90 days before end)",
                        "Host annual corporate donor appreciation event: In-person when possible (facility tour, beneficiary meet-and-greet, networking), Virtual if needed (impact presentation, Q&A, recognition)",
                        "Track in HQ CRM: All touchpoints and deliverables, Partner satisfaction, Renewal likelihood, Opportunities for increased support",
                        "Pro tip: Over-communicate impact - you can't thank them too much"
                    ]
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Grant Research & Writing",
            weekDescription: "Secure foundation and government funding through grants.",
            icon: Award,
            dailyTime: "90-120 minutes",
            weeklyGoal: "3 grant applications submitted; pipeline of 10+ opportunities",
            tasks: [
                {
                    title: "Build Grant Prospecting Database",
                    description: "Identify foundation and government funding opportunities.",
                    action: "Research grants aligned with your mission: Foundation grants (local, regional, national), Government grants (federal, state, local), Corporate foundation grants. Use grant databases. For each: Funding priorities, Average grant size, Eligibility requirements, Deadlines, Application process. Build pipeline in HQ CRM with application calendar.",
                    deliverable: "Database of 30+ grant opportunities",
                    hqTools: ["HQ CRM", "HQ Calendar", "HQ Research Templates"],
                    kpi: "30 grant prospects; 10 in active pipeline",
                    detailedSteps: [
                        "Use grant research databases: GrantWatch.com, Foundation Directory Online, Grants.gov (federal), State/city grant portals, Corporate foundation websites",
                        "Search criteria: Geographic focus (your service area), Cause area (your mission), Grant size ($5K-100K+ depending on capacity), Eligibility (501c3 status, years operating, budget size)",
                        "For each opportunity, document in HQ CRM: Foundation/agency name, Grant program name, Funding amount range, Deadline(s), Focus areas and priorities, Eligibility requirements, Application requirements (LOI, full proposal, etc.), Website and contact info, Past grantees (research who they fund), Likelihood score (high, medium, low)",
                        "Prioritize: Tier 1: Perfect mission alignment + eligible + capacity to apply, Tier 2: Good fit + need more info, Tier 3: Long-term cultivation",
                        "Create grant calendar in HQ: Plot all deadlines, Work backward (if deadline is June 1, start April 1), Block time for writing each application",
                        "Track in HQ pipeline: Research → LOI submitted → Full application → Pending decision → Awarded/Denied"
                    ]
                },
                {
                    title: "Create Master Grant Content Library",
                    description: "Build reusable content bank for efficient grant writing.",
                    action: "Compile frequently needed grant content: Organization overview (history, mission, programs), Need statement (problem you're addressing), Program descriptions (each major program), Budget templates, Evaluation plans, Board list and bios, Financial statements, IRS determination letter. Store everything in HQ Files. Most grants ask similar questions - create once, customize for each.",
                    deliverable: "Complete grant content library organized",
                    hqTools: ["HQ Files", "HQ Templates", "HQ Document Management"],
                    kpi: "Content library reduces application time by 50%",
                    detailedSteps: [
                        "Create 'Grant Content Library' folder in HQ Files with subfolders:",
                        "1. Organization Info: Mission statement (3 versions: 25 words, 100 words, 250 words), History and background (founding story, growth, milestones), Geographic area served, Population served (demographics, numbers), Leadership bios (ED, board chair, key staff), Organizational structure chart",
                        "2. Program Descriptions: Each program: Overview, Goals and objectives, Activities and services, Target population, Outcomes and impact, Success stories, Program budget",
                        "3. Need Statements: Research and data proving need in community, Statistics (poverty, education, health gaps), Testimonials and stories illustrating need",
                        "4. Evaluation and Impact: Logic models for each program, Evaluation methodology, Data collection process, Past results and outcomes, Impact metrics",
                        "5. Financials: Current year budget, Past 2 years audited financials (if available), 990 tax forms, Budget narrative, Funding sources pie chart",
                        "6. Organizational Documents: IRS 501c3 determination letter, Board list with affiliations, Letters of support from partners, Past grant awards and press",
                        "7. Templates: Budget template, Logic model template, Timeline/workplan template, Letter of support request template",
                        "Update quarterly to keep information current"
                    ]
                },
                {
                    title: "Write and Submit First Round of Grant Applications",
                    description: "Apply to 3-5 foundation grants strategically.",
                    action: "Select 3-5 grants from Tier 1 pipeline. Follow each application exactly. Customize using content library. Common sections: Organizational background, Need statement, Program description, Goals and objectives, Evaluation plan, Budget, Sustainability. Use HQ AI to help draft and refine. Submit by deadline. Track in HQ CRM.",
                    deliverable: "3-5 grant applications submitted",
                    hqTools: ["HQ AI for drafting support", "HQ Files for content", "HQ CRM tracking"],
                    kpi: "3 applications submitted; 1+ awarded (30% success rate)",
                    detailedSteps: [
                        "Select grants to apply for: Mix of sizes ($5K, $10K, $25K+), Stagger deadlines to manage workload, Prioritize best alignment",
                        "Read guidelines thoroughly: Highlight all requirements, Note page limits, word counts, Required attachments, Submission method (portal, email, mail)",
                        "Create application outline: Map required sections to content library, Identify gaps needing new writing, Assign word counts to each section",
                        "Write/compile proposal: Pull relevant content from library, Customize for funder's priorities, Use HQ AI: 'Help me write a compelling need statement for [program] emphasizing [funder priority]', Connect your work to funder's mission, Write clear, specific objectives (SMART goals), Show evaluation plan (how you'll measure success), Tell compelling stories alongside data",
                        "Budget: Create program budget (revenues and expenses), Match to grant request amount, Include budget narrative explaining line items, Show sustainability (other funding sources)",
                        "Review and edit: Check against rubric/criteria, Have colleague read for clarity, Proofread (typos = death), Ensure all required elements included",
                        "Submit: Follow instructions exactly, Submit early (not last minute), Save confirmation, Track in HQ CRM: Date submitted, Amount requested, Expected decision timeline",
                        "Follow up: Thank-you note to program officer, Respond promptly to any questions"
                    ]
                },
                {
                    title: "Develop Government Grant Strategy",
                    description: "Tap into federal, state, and local government funding.",
                    action: "Research government grants from: Federal (Grants.gov - HHS, DOE, DOJ, etc.), State agencies (health, education, social services), Local government (city/county). Government grants are larger but more complex. Start with smaller local grants to build capacity. Create compliance checklist. Use HQ to manage requirements and reporting.",
                    deliverable: "2 government grant applications in progress",
                    hqTools: ["HQ Project Management", "HQ Files", "HQ Calendar"],
                    kpi: "Government funding pipeline established",
                    detailedSteps: [
                        "Identify government funding sources: Grants.gov: Search by CFDA category matching your mission, Set up saved searches and email alerts, State agencies: Department of Health, Education, Social Services, etc., Check websites for RFPs and NOFOs, Local government: City and county grant programs, Community development block grants (CDBG), Parks, health, housing departments",
                        "Understand government grant process: Much longer timeline (3-6 months), More documentation required, Stricter compliance and reporting, But larger amounts ($50K-$500K+)",
                        "Start small: Begin with $10K-25K local grants to learn process, Build grant management capacity, Establish track record before pursuing federal",
                        "Create government grant checklist: SAM.gov registration (required for federal grants), DUNS number, Indirect cost rate agreement, Federal certifications (lobbying, debarment, etc.), Audit requirements (single audit if >$750K federal funds), Compliance policies (conflict of interest, procurement, etc.)",
                        "Build coalition if needed: Some government grants prefer or require partnerships, Identify complementary organizations, Draft MOU/partnership agreements",
                        "Use HQ to manage: Store all compliance documents, Track reporting deadlines, Manage budgets and expenses by grant, Document matching funds and in-kind",
                        "Consider grant consultant: For first large federal grant, consultant can increase success odds"
                    ]
                },
                {
                    title: "Create Grant Reporting and Stewardship System",
                    description: "Build reputation as excellent grantee to increase renewals.",
                    action: "When grants are awarded, create stewardship plan for each: Thank-you call/meeting with program officer, Kickoff report, Mid-point check-in, Interim reports (as required), Final report, Impact sharing. Use HQ Calendar for all deadlines. Submit reports early and exceed expectations. Track outcomes rigorously. Great reporting = more grants and renewals.",
                    deliverable: "Grant management and reporting system",
                    hqTools: ["HQ Calendar", "HQ Reporting", "HQ CRM"],
                    kpi: "100% on-time reporting; 70%+ renewal rate",
                    detailedSteps: [
                        "Set up grant tracking in HQ: For each awarded grant: Grant name and funder, Award amount and period, Reporting requirements (frequency, due dates, format), Key contact (program officer), Program goals and metrics, Budget tracking",
                        "Calendar all deadlines: Add to HQ Calendar with reminders: 30 days before report due, 14 days before, 3 days before, Set internal deadlines 1 week before actual due date",
                        "Track program metrics: Set up data collection for grant-funded program, Document outputs (activities, people served), Measure outcomes (changes, results), Collect stories and testimonials, Take photos (with permissions)",
                        "Report writing: Use funder's template if provided, Summarize activities and accomplishments, Present data and metrics, Include compelling stories, Attach budget vs. actual, Acknowledge challenges and how you addressed them, End with thank-you and next steps",
                        "Go above and beyond: Submit early (even by a few days shows professionalism), Include more success stories than required, Send informal updates between formal reports, Invite program officer to events or site visits, Tag them in social media wins related to their funding",
                        "Track in HQ CRM: Report submission dates, Funder feedback, Renewal eligibility and timing, Relationship strength",
                        "Pro tip: Turn every grant into a relationship - program officers remember great grantees and will fund you again"
                    ]
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Event Fundraising Strategy",
            weekDescription: "Generate revenue and engagement through signature events.",
            icon: Calendar,
            dailyTime: "60-120 minutes (event prep)",
            weeklyGoal: "Signature event planned; 100+ RSVPs; $15K+ raised",
            tasks: [
                {
                    title: "Design Signature Annual Fundraising Event",
                    description: "Create compelling event that becomes annual tradition.",
                    action: "Choose event type aligned with mission and audience: Gala/dinner, Walk/run, Auction (live, silent, online), Community festival, Golf tournament, Virtual event. Define: Goal ($25K-50K+), Audience (major donors, community, both), Date and venue, Budget and sponsorships needed. Create event planning timeline. Use HQ Events to manage.",
                    deliverable: "Event concept and plan finalized",
                    hqTools: ["HQ Events", "HQ Project Management", "HQ Budget Templates"],
                    kpi: "Event plan with budget and timeline",
                    detailedSteps: [
                        "Select event type based on: Your audience preferences (formal gala vs. casual 5K), Mission connection (youth org → fun run, animal rescue → adoption event), Resource capacity (gala requires more planning than virtual event), Fundraising potential (galas raise more but cost more)",
                        "Popular options: Gala dinner: Formal, highest revenue potential, Benefit concert/show: Entertainment-focused, fun, 5K/walk: Community participation, sponsorship opportunities, Online auction: Low overhead, broad reach, Golf tournament: Targets corporate/major donors, Virtual experience: Accessible, can be annual or recurring",
                        "Set event goals: Revenue: $30,000 net (after expenses), Attendance: 200 people, Sponsors: 10 sponsors at $2K-10K, New donors: 50 first-time supporters, Awareness: 1,000+ social media impressions",
                        "Create event budget: Revenue: Ticket sales, Sponsorships, Auction proceeds, Expenses: Venue, Catering, AV/tech, Marketing, Misc, Target: 30-40% expenses, 60-70% net revenue",
                        "Build timeline: 6 months out: Lock venue, recruit committee, 4 months: Secure sponsors, begin promotion, 2 months: Ticket sales push, finalize logistics, 1 month: Final details, auction procurement, Week of: Confirmations, day-of plan, Day after: Thank-yous, impact report",
                        "Set up in HQ Events: Event page with registration, Ticket tiers, Sponsorship levels, Volunteer signups"
                    ]
                },
                {
                    title: "Secure Event Sponsors and In-Kind Donations",
                    description: "Offset event costs and increase net revenue through sponsors.",
                    action: "Create event sponsorship package: Presenting Sponsor ($10K), Gold ($5K), Silver ($2.5K), Bronze ($1K). Benefits: Logo placement, Recognition, Tickets, Table/booth. Approach corporate prospects from previous work. Also secure in-kind: Venue, catering, AV, printing, auction items. Use HQ CRM to track asks and commitments.",
                    deliverable: "10+ sponsors secured; 50% of expenses covered",
                    hqTools: ["HQ CRM", "HQ Sponsorship Templates", "HQ Proposals"],
                    kpi: "Sponsorships cover 50%+ of event costs",
                    detailedSteps: [
                        "Design sponsorship tiers: Presenting Sponsor ($10K): Logo on all materials, Speaking opportunity, VIP table for 10, Social media series, Gold ($5K): Logo prominent, Table for 8, Recognition in program, Silver ($2.5K): Logo on select materials, 4 tickets, Name in program, Bronze ($1K): Logo on website, 2 tickets, Program listing",
                        "Create sponsor benefits matrix (comparison chart)",
                        "Identify sponsor prospects: Event sponsors (companies wanting brand visibility), Cause sponsors (aligned with mission), Board member companies, Past corporate donors",
                        "Outreach strategy: Personal asks first (board, major donors), Email campaign to corporate list, Phone follow-up, Proposal within 48 hours of interest",
                        "Sponsor benefits fulfillment: Track in HQ what each sponsor gets, Assign responsible party for each deliverable, Send logo requests, event details, Follow up to ensure satisfaction",
                        "In-kind donation asks: Venue: Approach hotels, event spaces for donated/discounted space, Catering: Local restaurants for food donation or cost price, Beverages: Wine shop, brewery for donation, AV: Tech company for sound/lighting, Printing: Print shop for programs, signage, Auction items: Ask businesses, donors for experiences, products",
                        "Create standard in-kind request letter: Explain event and mission, Specific ask, Recognition they'll receive, Tax deduction information (if applicable)",
                        "Track all sponsors and in-kind in HQ CRM: Contact, amount/value, Benefits owed, Delivered status, Thank-you sent"
                    ]
                },
                {
                    title: "Execute Multi-Channel Event Promotion Campaign",
                    description: "Fill the room and maximize ticket sales and awareness.",
                    action: "Launch comprehensive promo campaign: Email series to full list (save-the-date, ticket sales, early bird, reminders), Social media daily posts (event details, sponsors, auction previews, countdowns), Partner and sponsor promotion (ask to share), Media outreach (community calendar, press release), Direct mail to major donors. Use HQ to manage all touchpoints.",
                    deliverable: "200+ event registrations/ticket sales",
                    hqTools: ["HQ Email Campaigns", "HQ Social Scheduler", "HQ Event Management"],
                    kpi: "200 attendees; 300+ engaged via livestream/online",
                    detailedSteps: [
                        "Email campaign timeline: 8 weeks out: Save-the-date to entire list + sponsor/speaker announcements, 6 weeks: Early bird ticket offer ($5-10 discount), 4 weeks: Regular ticket sales + event details, auction preview, 2 weeks: 'Half sold out!' urgency message, 1 week: Last chance + day-of logistics, Day before: Final reminders, Zoom link if virtual component",
                        "Social media strategy: Create event page on Facebook with registration link, Daily posts 30 days before event: Monday - Sponsor spotlight, Tuesday - Auction item preview, Wednesday - Mission moment, Thursday - Event details/FAQ, Friday - Countdown + ticket link, Stories daily: Behind-the-scenes prep, team introductions, Instagram: Same content optimized for platform, LinkedIn: Professional angle, corporate sponsorships",
                        "Leverage sponsors and partners: Provide social media toolkit (graphics, captions, hashtags), Ask to promote to their networks, Email their customer lists (with permission), Cross-promote at their locations",
                        "Community outreach: Submit to local event calendars (newspapers, radio, online), Press release: 'Local Nonprofit Hosts Annual [Event] to Support [Cause]', Community partnerships: Libraries, coffee shops, gyms to display flyers, Neighborhood groups, HOAs, civic orgs announcements",
                        "Create buzz: Ambassador program: Recruit 10 people to each sell 10 tickets (100 tickets!), Contests: 'Share this post for a chance to win 2 free tickets', Livestream teasers: Behind-scenes setup, interviews",
                        "Track in HQ: Registration source (email, social, word-of-mouth), Ticket types and revenue, Daily/weekly sales trends"
                    ]
                },
                {
                    title: "Plan and Execute Auction Strategy",
                    description: "Maximize fundraising through strategic auction design.",
                    action: "Procure auction items: Experiences (dinners, trips, events), Services (photography, home repair, lessons), Products (electronics, jewelry, artwork), Packages (create unique bundles). Aim for items 2-3x attendee count. Use HQ or online auction platform. Price items with starting bids. Promote high-value items pre-event. Train volunteers or use professional auctioneer.",
                    deliverable: "Auction generating $10K+ in event revenue",
                    hqTools: ["HQ Auction Platform", "HQ Forms for donation intake"],
                    kpi: "Auction revenue = 30-50% of total event fundraising",
                    detailedSteps: [
                        "Procurement strategy: Ask board and major donors first, Approach local businesses (restaurants, spas, retailers), Experiences often perform best: Wine tasting at vineyard, Private chef dinner, Sports tickets, Concert tickets, Weekend getaway, Service packages: Photography session, House cleaning, Landscaping, Personal training, Products: Art, jewelry, electronics, gift baskets, Create exclusive packages: '6-month wine club + private sommelier dinner', 'Spa day + personal wellness coaching'",
                        "Item intake process: Use HQ Forms to collect: Donor name/contact, Item description, Retail value, Any restrictions, Photo, Track in HQ: Item list with IDs, Donor info, Thank-you status",
                        "Pricing: Silent auction: Start bid at 40-50% of retail value, Increase increments by $10-25, Live auction: Professional auctioneer can drive prices up, Save best items for live, Online auction: Opens before event, closes during or after",
                        "Promotion: Showcase top items in emails and social, Create anticipation: 'Exclusive Hawaii getaway up for bid!', Item catalog: Digital flipbook or printed program",
                        "Event night setup: Display items attractively with descriptions and bid sheets, Clear instructions for bidding, Staff monitors to answer questions and encourage bidding, Mobile bidding app (if using tech platform) makes it easy",
                        "Checkout: Streamlined process using HQ Payment or auction platform, Accept credit cards, Payment confirmation and receipts (tax-deductible portion)",
                        "Post-event: Thank auction item donors with impact report, Request items again for next year"
                    ]
                },
                {
                    title: "Execute Event Day Flawlessly and Follow-Up",
                    description: "Deliver excellent experience and convert attendees to ongoing supporters.",
                    action: "Event day: Check-in system (HQ or apps), Program with mission moment and impact stories, Live ask/paddle raise during event, Volunteer coordination, Capture photos/video for marketing. Post-event: Thank-you to everyone within 48 hours, Impact report (amount raised, lives changed), Survey for feedback, Convert attendees to monthly donors.",
                    deliverable: "Successful event; $25K+ raised; attendees become donors",
                    hqTools: ["HQ Check-In App", "HQ Email Automation", "HQ Surveys", "HQ CRM"],
                    kpi: "Net revenue $25K+; 90% satisfaction; 25% convert to ongoing donors",
                    detailedSteps: [
                        "Day-of operations: Check-in: HQ app or printed list with name tags, Welcome area: Auction display, info table, signage, Program flow: Welcome (5 min), Dinner/entertainment (45 min), Mission moment with beneficiary story (10 min), Live auction or paddle raise (20 min), Thank sponsors and close (5 min), Volunteer roles: Greeters, auction monitors, check-in, tech support, runner, Capture content: Photographer, videographer, Social media live updates",
                        "Mission moment (most important): Tell compelling story (video or live speaker), Share specific impact stats, Emotional connection to cause, Introduce 'paddle raise' or direct ask: '$500 provides [impact]', '$250 provides [impact]', '$100 provides [impact]', 'Any amount makes a difference - raise your paddle!', Staff and volunteers participate to model giving",
                        "Post-event follow-up (within 48 hours): Email 1: Thank attendees, celebrate total raised, share highlight photos, Email 2: Thank sponsors publicly, tag on social media, Email 3: Thank volunteers, Survey: Sent 3 days later via HQ Forms (what they loved, suggestions, will they attend next year?)",
                        "Impact report (within 2 weeks): Total funds raised, Net revenue after expenses, What the funds will accomplish, Thank-yous by tier (sponsors, attendees, volunteers, donors), Photo gallery, 'Save the date' for next year",
                        "Conversion strategy: Within 1 month, invite event attendees to become monthly donors, Offer: 'You saw the impact firsthand. Join our monthly giving circle to continue making a difference all year.'",
                        "Track outcomes in HQ: Total revenue, Net revenue after expenses, Attendee conversion rate to donors, Next-year commitment (who's already said yes)"
                    ]
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Impact Measurement & Storytelling",
            weekDescription: "Prove and communicate your impact to attract more support.",
            icon: BarChart,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Impact measurement system built; compelling stories collected",
            tasks: [
                {
                    title: "Define Impact Metrics and KPIs for Programs",
                    description: "Establish clear, measurable outcomes to track success.",
                    action: "For each program, define: Outputs (activities, people served), Outcomes (changes achieved), Indicators (how you'll measure). Create logic models. Set targets. Examples: 'Served 500 families' (output), '80% report improved food security' (outcome). Use HQ to track. Donors fund impact, not activities - prove your effectiveness.",
                    deliverable: "Impact measurement framework for all programs",
                    hqTools: ["HQ Strategy Tools", "HQ Surveys", "HQ Reporting"],
                    kpi: "Measurable outcomes defined for every program",
                    detailedSteps: [
                        "Create logic model for each program in HQ Strategy Tools: Inputs: Resources (staff, funds, space), Activities: What you do (workshops, food distribution, tutoring), Outputs: Direct results (# participants, # sessions held), Outcomes: Changes achieved (knowledge gained, behavior changed, situations improved), Impact: Long-term change (poverty reduced, graduation rates increased)",
                        "Define specific indicators: Quantitative: Numbers, percentages, averages (# served, % achieving goal, average improvement), Qualitative: Stories, testimonials, observations (quality of life improvements, confidence gained)",
                        "Examples by program type: Food pantry: Output: 500 families served monthly, Outcome: 75% report improved food security (survey), Indicator: Pre/post surveys, pantry usage frequency, Job training: Output: 100 participants complete program, Outcome: 80% employed within 3 months, Indicator: Graduation rate, employment verification, wage data, Youth mentoring: Output: 50 youth matched with mentors, Outcome: 90% improve in school performance, Indicator: GPA tracking, attendance records, surveys",
                        "Set SMART targets: Specific, Measurable, Achievable, Relevant, Time-bound, Example: 'Increase program graduation rate from 65% to 80% by December 2025'",
                        "Document in HQ Files: Impact measurement plan for each program"
                    ]
                },
                {
                    title: "Implement Data Collection Systems",
                    description: "Build infrastructure to consistently gather impact data.",
                    action: "Create data collection tools: Intake forms (baseline data), Attendance tracking, Pre/post surveys (measure change), Program completion records, Follow-up surveys (long-term outcomes). Use HQ Forms and CRM. Train staff to collect consistently. Make it routine, not optional. Good data = powerful storytelling and grant success.",
                    deliverable: "Data collection system operational",
                    hqTools: ["HQ Forms", "HQ CRM", "HQ Surveys", "HQ Spreadsheets"],
                    kpi: "90%+ data completion rate; consistent tracking",
                    detailedSteps: [
                        "Build data collection forms in HQ: Intake form: Participant demographics, Situation/need assessment, Baseline measurements (knowledge, situation, goals), Attendance tracking: Simple check-in system (HQ app or paper), Session-by-session participation, Progress tracking forms: Mid-program check-ins, Skill assessments, Milestone achievements, Exit surveys: Program completion data, Post-participation measurements (compare to baseline), Satisfaction and feedback, Follow-up surveys: 3-month, 6-month, 1-year outcomes, Employment, education, life situation updates",
                        "Integrate with program delivery: Make data collection part of routine (not extra work), First session: Intake and baseline, Each session: Attendance and brief notes, Mid-point: Progress survey, Final session: Exit survey and outcomes, Post-program: Scheduled follow-ups",
                        "Train staff: Why data matters (proves impact, improves programs, attracts funding), How to collect (forms, timing, systems), Where to store (HQ CRM), Consistency is key",
                        "Protect privacy: Informed consent for data collection, Secure storage in HQ, Anonymize data for reporting, Permission for stories and photos",
                        "Create dashboards in HQ: Track participation rates, Monitor outcome indicators, Flag participants needing extra support",
                        "Regular review: Monthly: Staff reviews data for program adjustments, Quarterly: Analyze trends and outcomes, Annual: Comprehensive impact report"
                    ]
                },
                {
                    title: "Build Library of Impact Stories and Testimonials",
                    description: "Collect powerful personal stories that bring data to life.",
                    action: "Systematically gather stories from beneficiaries: Success stories (transformation journeys), Testimonials (quotes and videos), Photo documentation (before/after when appropriate). Get written permission. Create story bank in HQ Files. Stories humanize data. Use in: Fundraising appeals, Grant proposals, Social media, Annual reports, Events. Aim for 20+ compelling stories.",
                    deliverable: "Library of 20+ impactful beneficiary stories",
                    hqTools: ["HQ Files", "HQ Forms for story intake", "HQ Video Hosting"],
                    kpi: "20 stories with diversity of voices and outcomes",
                    detailedSteps: [
                        "Identify story candidates: Program graduates with strong outcomes, Participants at different stages (before, during, after), Diverse representation (age, background, experience), Willing to share publicly (with proper anonymity if needed)",
                        "Story collection process: Request permission: Explain how story will be used, Written release form (HQ Forms), Option for anonymity or first name only, Interview questions: What was life like before the program?, What made you seek help?, How did the program help you?, What's different now?, What would you tell someone considering the program?, What does this mean for your future?, Document stories: Written narrative (1-2 paragraphs), Pull quotes, Video testimonial (2-3 min), Photos (with permission)",
                        "Story structure: Hook: Compelling opening, Challenge: The problem they faced, Journey: How program helped, Transformation: Where they are now, Impact: Broader meaning",
                        "Organize in HQ Files: By program, By outcome type (employment, housing, health, etc.), By story format (written, video, photo), Tagged for easy search (youth, single parent, veteran, etc.)",
                        "Ethical considerations: Beneficiaries own their stories, Obtain consent for each use, Compensate if appropriate (gift cards), Protect dignity and privacy, Avoid 'poverty porn' or exploitation",
                        "Usage: Use across all channels consistently, Update regularly with new stories, Thank storytellers and show them the impact of sharing"
                    ]
                },
                {
                    title: "Create Visual Impact Reports and Infographics",
                    description: "Design compelling data visualizations that showcase outcomes.",
                    action: "Transform impact data into visual assets: Annual impact report (PDF), One-page infographic (snapshot of year), Social media graphics (individual stats), Donor-facing dashboards. Use HQ design tools or Canva. Focus on: Big numbers, Comparisons (before/after), Trends over time, Individual impact (cost per person served). Make data beautiful and shareable.",
                    deliverable: "Visual impact report and 10+ infographics",
                    hqTools: ["HQ Reporting", "HQ Design Tools", "HQ Files"],
                    kpi: "Impact report shared 500+ times; used in all fundraising",
                    detailedSteps: [
                        "Annual impact report design: Cover with powerful image and headline: 'Together We Served 5,000 Families in 2024', Executive summary: Total people served, Key outcomes, Financial overview, Programs section: Each program with outputs and outcomes, Stories and photos, Financials: Where money came from (pie chart), How money was spent (bar chart), Cost per person served, Thank you section: Donors, sponsors, volunteers, partners, Looking ahead: Goals for next year, 8-12 pages, professionally designed",
                        "One-page snapshot infographic: Top-level numbers (people served, programs delivered, volunteers engaged), Key outcomes (% who achieved goals), Visual elements (icons, charts, graphs), Quotes from beneficiaries, Thank you to supporters, Use for: Email attachments, Social media, Donor meetings, Grant applications",
                        "Social media graphics: Individual stats with compelling visuals: '2,450 Families Didn't Go Hungry Thanks to You', '89% of Youth Mentees Graduated High School', Before/after comparisons, Progress toward annual goals",
                        "Create in Canva with brand colors, Upload all to HQ Files",
                        "Distribute widely: Email to entire list, Social media series, Include in every fundraising appeal, Send to media, Post on website, Share in donor meetings and proposals",
                        "Update quarterly: Keep data fresh, Share progress toward annual goals"
                    ]
                },
                {
                    title: "Develop Donor Impact Communication Strategy",
                    description: "Show donors exactly how their support made a difference.",
                    action: "Create personalized impact communication: Immediate: Thank-you with specific impact of their gift amount, Quarterly: Update on program progress their donation supports, Annual: Full impact report. Use HQ Email Automation. Examples: '$50 fed 3 families this week', '$500 sent 2 kids to summer camp'. Make donors feel essential. Impact updates increase retention and upgrades.",
                    deliverable: "Automated impact communication system",
                    hqTools: ["HQ Email Automation", "HQ CRM Segmentation", "HQ Templates"],
                    kpi: "Donor retention increases 20%; upgrade rate improves",
                    detailedSteps: [
                        "Segment donors in HQ CRM by: Gift size, Giving frequency (one-time, monthly), Program interest (which program they support), Engagement level",
                        "Create impact messaging by tier: $25-50: 'Your $50 provided school supplies for 2 children this month', $51-100: 'Your $100 fed 6 families this week', $101-250: 'Your $250 sent a youth to job training', $251-500: 'Your $500 provided tutoring for 10 students', $501+: 'Your generous gift of $[amount] changed [X] lives'",
                        "Automated impact updates in HQ: Immediate (upon donation): Thank-you email with specific impact, Story or photo related to their gift, 30 days: 'Here's what your donation accomplished this month', 90 days (quarterly): Program update with outcomes data, Beneficiary story, New needs and opportunities, 365 days (annual): Full impact report, Thank you for year of support, Renewal/upgrade invitation",
                        "Monthly donor updates: Monthly email: This month's impact numbers, Featured story, Upcoming needs, Quarterly video message from ED, Annual in-person appreciation event",
                        "Major donor stewardship: Personal thank-you call within 48 hours, Handwritten note from ED, Quarterly phone check-ins, Invitation to visit programs, Named giving opportunities ('The Smith Family Scholarship')",
                        "Make it personal: Use donor's name and reference their specific gift, Connect them to real people helped, Show both immediate and cumulative impact",
                        "Track in HQ: Open rates on impact updates, Donor retention by communication frequency, Donor feedback and satisfaction"
                    ]
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Digital Marketing & Online Fundraising",
            weekDescription: "Scale reach and revenue through digital channels.",
            icon: Globe,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Paid ads launched; online donations increase 50%",
            tasks: [
                {
                    title: "Launch Google Ad Grants Program",
                    description: "Secure $10K/month in free Google Ads for non-profits.",
                    action: "Apply for Google Ad Grants (Google gives $10K/month free ads to eligible non-profits). Once approved: Set up Google Ads account, Create campaigns targeting keywords related to your cause (people searching 'donate to [cause]', '[your city] food bank', 'volunteer opportunities'), Drive traffic to donation page and volunteer signups. Use HQ to track conversions.",
                    deliverable: "Google Ad Grants approved and campaigns running",
                    hqTools: ["HQ Analytics", "HQ Conversion Tracking"],
                    kpi: "$10K/month in free ads; 100+ donation page visits; 20+ conversions",
                    detailedSteps: [
                        "Check eligibility: 501(c)(3) status, Acknowledge Google's non-discrimination policy, Have a live website with substantial content, Enroll in Google for Nonprofits",
                        "Apply for Google Ad Grants: Go to Google for Nonprofits, Complete application (takes 2-4 weeks approval), Receive Ad Grants account ($10K monthly credit)",
                        "Set up Google Ads campaigns: Campaign 1: Brand terms (your organization name), Campaign 2: Cause terms ('hunger relief [city]', 'donate to [cause]'), Campaign 3: Volunteer keywords ('volunteer opportunities near me'), Campaign 4: Program-specific (job training programs, youth services, etc.)",
                        "Ad copy structure: Headline: Problem/solution (e.g., 'End Hunger in [City]'), Description: Call-to-action ('Donate Today' or 'Sign Up to Volunteer'), Display URL: yourorg.org/donate",
                        "Landing pages: Donation page optimized for conversion, Volunteer signup form, Program information pages",
                        "Ad Grants compliance: Maintain 5% CTR (click-through rate) monthly, Submit survey annually, Keep account active (log in monthly)",
                        "Use HQ Analytics: Track visitors from Google Ads, Monitor conversions (donations, signups), Calculate ROI: How much donated per ad click",
                        "Optimize monthly: Pause low-performing keywords, Increase bids on high converters, Test new ad copy"
                    ]
                },
                {
                    title: "Run Facebook/Instagram Fundraising Campaigns",
                    description: "Leverage social media ads to acquire new donors.",
                    action: "Launch Facebook/Instagram ad campaigns: Awareness (introduce cause to cold audience), Conversion (drive donations from warm audience), Retargeting (re-engage website visitors who didn't donate). Use compelling visuals and stories. A/B test creative. Target: Lookalike audiences from donor list, Interest-based targeting. Track via HQ. Start with $15-30/day budget.",
                    deliverable: "Profitable Facebook ad campaigns running",
                    hqTools: ["HQ Ad Manager", "HQ Pixel Tracking", "HQ Analytics"],
                    kpi: "ROI positive (1:3 minimum); acquire 50+ new donors",
                    detailedSteps: [
                        "Set up Facebook Business Manager and Ads account: Connect your Facebook Page, Install HQ tracking pixel on website (donation page, thank you page), Upload donor list to create lookalike audiences",
                        "Create campaigns: Campaign 1: Awareness - Video storytelling: Beneficiary story (60-90 sec), Emotional hook + mission explanation, CTA: Learn more (drive to website), Target: Broad local audience + interests (philanthropy, social causes, related topics), Budget: $10/day, Campaign 2: Conversion - Direct donation ask: Image of person you're helping + '$50 changes a life', Link to donation page, Target: Lookalike audience (people similar to your donors) + website visitors, Budget: $15/day, Campaign 3: Retargeting - Remind website visitors who didn't donate: 'You visited. Will you help today?', Show impact stats, Donation link, Target: People who visited donation page but didn't complete, Budget: $5/day",
                        "Create ad creative: Use authentic photos (with permission), not stock, Write short, compelling copy (2-3 sentences), Clear CTA button ('Donate Now'), Video performs best (30-90 seconds)",
                        "A/B test: Test different images, headlines, CTAs, Run 2-3 ad variations per campaign, Pause low performers after 3 days",
                        "Track in HQ: Cost per donor acquisition, Average donation from ads, Return on ad spend (ROAS): Target 3:1 minimum ($1 ad spend = $3 donations), Donor lifetime value from ads",
                        "Scale winners: If ROI is positive, increase budget 20-30%, Keep testing new creative",
                        "Facebook also has fundraising tools: Enable 'Donate' button on Page, Birthday fundraisers (supporters can fundraise for you), Nonprofit tools (donation stickers in Stories)"
                    ]
                },
                {
                    title: "Optimize Website for Conversions",
                    description: "Turn website visitors into donors and volunteers.",
                    action: "Audit and improve HQ website for donations: Clear 'Donate' button in navigation and hero, Compelling homepage story, Trust signals (impact stats, testimonials, charity ratings), Mobile optimization (60%+ mobile traffic), Fast load time, Thank-you page with social share buttons. Run A/B tests. Goal: Increase conversion rate from 1% to 3%+.",
                    deliverable: "Website conversion rate doubled",
                    hqTools: ["HQ Website Builder", "HQ A/B Testing", "HQ Analytics"],
                    kpi: "3%+ visitor-to-donor conversion rate",
                    detailedSteps: [
                        "Homepage optimization: Hero section: Powerful image + headline addressing problem/solution, Single clear CTA above fold: 'Donate Now' or 'Make a Difference', Impact stats prominently displayed (lives served, years operating, success rate), Recent success story or testimonial, Secondary CTAs: 'Volunteer', 'Learn More'",
                        "Donation page best practices: Remove navigation (no distractions), Suggested donation amounts with impact descriptions ('$50 feeds a family for a week'), Multiple payment options (card, PayPal, Apple Pay), Monthly giving option prominent (but not forced), Quick, simple form (name, email, payment - that's it), Trust badges (SSL secure, privacy policy, 501c3 status), Progress indicator if multi-step, Mobile-optimized",
                        "Thank-you page: Heartfelt thank-you message, Immediate impact statement, Share buttons: 'Help us spread the word', Next steps: Join newsletter, follow social media, volunteer, Tax receipt email confirmation",
                        "Trust building elements throughout: Display charity ratings (GuideStar, Charity Navigator if available), Testimonials and success stories on every page, Financials transparency (pie chart of spending), Staff and board photos with bios, Contact information easy to find, Press mentions and awards",
                        "Mobile optimization: Test entire site on mobile (this is how most people browse), Large, tappable buttons, Minimal form fields, Fast loading (compress images, minimize code)",
                        "A/B testing in HQ: Test donation button colors (orange vs green), Headline variations, Suggested donation amounts, CTA copy ('Donate' vs 'Give' vs 'Help Now')",
                        "Use HQ Analytics: Track conversion funnel: Homepage → Donation page → Completed donation, Identify drop-off points and fix them"
                    ]
                },
                {
                    title: "Launch Email Drip Campaign for Lapsed Donors",
                    description: "Re-engage past donors who haven't given recently.",
                    action: "Create automated re-engagement sequence targeting lapsed donors (gave last year but not this year): Email 1: 'We miss you', Email 2: Impact update (what you've accomplished since their last gift), Email 3: Specific need/urgency, Email 4: Personal note from ED, Email 5: Final ask with incentive. Use HQ Email Automation. Track opens, clicks, donations. Goal: Reactivate 20% of lapsed donors.",
                    deliverable: "Lapsed donor campaign reactivating 20%+",
                    hqTools: ["HQ Email Automation", "HQ CRM Segmentation", "HQ Analytics"],
                    kpi: "20% of lapsed donors give again",
                    detailedSteps: [
                        "Segment lapsed donors in HQ CRM: Gave within past 2 years but not in last 12 months, Note: Last gift date, Last gift amount, Programs they supported",
                        "Email sequence (send over 3 weeks): Email 1 (Day 1): 'We Miss You, [First Name]', 'You were an important part of our mission. We'd love to have you back.', Brief recap of recent accomplishments, Soft ask: 'Will you consider giving again?', Email 2 (Day 7): 'Here's What You Helped Us Accomplish', Show impact since their last gift (data + story), 'Because of donors like you...', 'We need your support again to continue this work', Email 3 (Day 14): 'Urgent: Help Us Reach [Specific Goal]', Specific campaign or need, Deadline approaching, 'Your past support made you part of our family - we need you now', Email 4 (Day 21): Personal video or written note from Executive Director, 'I'm personally reaching out...', Thank them for past support, Personal invitation to rejoin, Email 5 (Day 28 - final): 'Last Chance: Special Welcome-Back Rate', Incentive: Match their last gift amount, First-month free if they become monthly donor, Small thank-you gift, 'We won't keep bothering you, but wanted to give one more chance to reconnect'",
                        "Personalization: Reference their last donation: 'Your $100 last December...', Mention specific program if they supported one, Warm, friendly tone (not guilt-tripping)",
                        "Track in HQ: Email opens by sequence step, Click rates, Donations made, ROI: Cost vs. revenue from reactivated donors",
                        "For those who don't respond: Move to low-touch list (only major announcements), Try again in 6 months with different approach",
                        "For those who do give: Thank profusely, Move to active donor stewardship track, Note in CRM: Reactivated donor (may need extra attention)"
                    ]
                },
                {
                    title: "Implement Peer-to-Peer Fundraising Platform",
                    description: "Empower supporters to fundraise on your behalf.",
                    action: "Enable peer-to-peer fundraising via HQ or platform like Facebook Fundraisers, Classy, Givebutter. Allow supporters to: Create personal fundraising pages, Set goals, Share with networks, Track progress. Provide toolkit: Templates, graphics, tips, talking points. Popular for: Birthday fundraisers, Memorial funds, Challenge campaigns, Events. Expands reach exponentially.",
                    deliverable: "P2P program with 20+ active fundraisers",
                    hqTools: ["HQ P2P Fundraising Platform", "HQ Toolkit Templates"],
                    kpi: "20 active fundraisers; $10K+ raised",
                    detailedSteps: [
                        "Set up P2P platform: Option 1: Facebook Fundraisers (easiest, free, built-in audience), Option 2: HQ P2P module (if available), Option 3: Third-party platform (Classy, Givebutter, Mightycause) integrated with HQ, Ensure: Easy page creation, Mobile-friendly, Sharable, Progress tracking, Donation processing",
                        "Recruit fundraisers: Email existing supporters: 'Start a fundraiser for us!', Target: Passionate volunteers, Board members, Past beneficiaries (if appropriate), Social media followers, Messaging: 'Your network cares what you care about. Be our champion.'",
                        "Create fundraiser toolkit in HQ Files: Step-by-step guide: How to create page, Set compelling goal, Write personal story, Templates: Sample page description, Email to friends, Social media posts, Graphics: Branded images to share, Progress milestones, Tips for success: Start with personal donation, Ask 10 close friends directly, Share updates regularly, Thank donors publicly, Make it fun (add humor, videos)",
                        "Campaign ideas: Birthday fundraisers: 'This year, donate to [Org] instead of gifts', Running events: 'I'm running a 5K and fundraising', Memorial/tribute: 'In honor of [person]', Challenges: '30-day fitness challenge - sponsor my progress', Giving Tuesday: 'Join me in supporting [Org]'",
                        "Support fundraisers: Personal thank-you when they launch, Weekly check-in and encouragement, Provide content to share (stories, impact updates), Recognize top fundraisers publicly, Celebrate when they reach goals",
                        "Track in HQ: Number of active fundraisers, Total raised via P2P, Average amount per fundraiser, Donor acquisition (new donors via P2P)",
                        "Thank fundraisers: Personal thank-you note, Impact report (how their fundraiser helped), Invitation to special recognition event, First access to future campaigns"
                    ]
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Board Development & Governance",
            weekDescription: "Build strong board for fundraising and strategic guidance.",
            icon: Users,
            dailyTime: "30-45 minutes",
            weeklyGoal: "Board recruitment strategy; 2+ new members in pipeline",
            tasks: [
                {
                    title: "Define Ideal Board Composition and Roles",
                    description: "Create strategic board structure aligned with organizational needs.",
                    action: "Audit current board: Skills, diversity, giving capacity, engagement. Define ideal board: Size (9-15 members), Skill sets needed (fundraising, finance, legal, marketing, program expertise), Diversity (demographics, experiences, networks), Term limits (3 years, renewable once). Create board matrix showing gaps. Use HQ to manage board recruitment.",
                    deliverable: "Board composition plan and recruitment matrix",
                    hqTools: ["HQ Strategy Tools", "HQ CRM", "HQ Files"],
                    kpi: "Board recruitment plan targeting 3 specific profiles",
                    detailedSteps: [
                        "Current board assessment: List all board members with: Skills/expertise, Professional network/connections, Giving capacity (personal + can unlock), Time availability, Committee interests, Tenure, Identify strengths and gaps",
                        "Define ideal board composition: Size: 9-15 members (enough diversity, small enough to be effective), Required skills: Fundraising/development (2-3 members), Financial/accounting (1-2), Legal (1), Marketing/PR (1), HR/operations (1), Program/cause expertise (2-3), Community connections (all), Diversity goals: Reflect community you serve, Range of ages, Professional backgrounds, Economic diversity, Include lived experience (someone who benefited from services)",
                        "Board member expectations: Give: Personal donation (amount based on capacity), Get: Raise funds from network (amount or activity), Govern: Attend meetings (10/year), serve on committee, Strategic guidance and oversight, Ambassador: Represent org, attend events, advocacy",
                        "Create board matrix in HQ: Rows: Current members + open seats, Columns: Skills, diversity categories, giving, tenure, Highlight gaps to fill in recruitment",
                        "Term structure: 3-year terms, Renewable once (max 6 years), Allows refresh while keeping institutional knowledge, Create pipeline: Always recruiting 1-2 years ahead",
                        "Document in board manual: Role description, Expectations and commitments, Meeting schedule, Committee structure, Conflict of interest policy"
                    ]
                },
                {
                    title: "Recruit Strategic Board Members",
                    description: "Identify and cultivate prospects who fill gaps.",
                    action: "Create prospect list targeting gaps: Who do current board members know? Research community leaders. Approach systematically: Cultivate through involvement first (volunteer, event, tour), Board member makes introduction, One-on-one coffee with ED, Formal invitation with clear expectations. Use HQ CRM to track. Focus on fundraising capacity and networks.",
                    deliverable: "3-5 prospects in cultivation; 1+ commitment",
                    hqTools: ["HQ CRM", "HQ Recruitment Pipeline"],
                    kpi: "2 new board members recruited",
                    detailedSteps: [
                        "Identify prospects: Referrals: Ask each current board member: 'Who in your network would be a great board member?', Donors: Review major donors - who's deeply engaged?, Volunteers: Who shows leadership and commitment?, Professional networks: Attend chamber, professional association events, Advisory committee: Create committee as pipeline to board",
                        "Qualify prospects: Do they have required skill/network we need?, Capacity and willingness to give/get?, Time availability (busy but not too busy), Passion for mission?, Cultural fit with organization values?",
                        "Cultivation process: Step 1: Invite to smaller involvement (volunteer day, event attendance, facility tour), Step 2: Board member hosts 1-on-1 coffee (explore interest, share experience), Step 3: ED/board chair meets formally (discuss organization needs, board role, expectations), Step 4: Attend board meeting as observer, Step 5: Formal invitation via board chair (send: Board manual, Annual report, Financial statements, Role description, Commitment form)",
                        "Timing: Takes 3-6 months from first touch to joining board, Don't rush - ensure fit on both sides",
                        "Track in HQ CRM: Prospect name and contact, How they were referred, Skills/networks they bring, Cultivation activities and dates, Status (prospects, cultivation, invited, committed, declined), Notes from each interaction",
                        "Formal onboarding when they join: Board orientation (mission, programs, finances, governance), Facility tour if not done, Introduce to staff and other board members, Committee assignment, Welcome packet"
                    ]
                },
                {
                    title: "Implement Board Fundraising Expectations",
                    description: "Activate board as fundraising ambassadors and door-openers.",
                    action: "Establish clear 'Give or Get' policy: Every board member gives personally, Every member opens doors to X prospects/year, Provide training and support. Create board fundraising toolkit: Prospect list templates, Talking points, Event hosting guide, Introduction scripts. Use HQ to track board member actions and results. Hold accountable lovingly but firmly.",
                    deliverable: "Board fundraising plan with individual goals",
                    hqTools: ["HQ CRM", "HQ Templates", "HQ Tracking Dashboard"],
                    kpi: "100% board giving participation; each member makes 5+ introductions",
                    detailedSteps: [
                        "Establish giving expectations: Personal giving: Every board member gives to best of ability, Aim for 100% participation (amount matters less), Suggested: $1K-5K annually or board members' top 3 charitable gifts, Get/introduce: Each member introduces org to 5-10 prospects annually (personal network, professional connections), Host or attend fundraising events, Open doors to corporate partnerships",
                        "Create individual fundraising plans: At annual board retreat or one-on-one: Each member identifies: Personal giving capacity, 5-10 people they could introduce, 1-2 events they could host or sponsor, 1-2 corporate connections, Skills they can contribute (grant writing, marketing, event planning), Document in HQ CRM, Check in quarterly on progress",
                        "Provide support and training: Board fundraising workshop: How to make the ask, Talking points about impact, Handling objections, Tools in HQ: Prospect list template, Email introduction scripts, Event hosting guide, One-pagers and impact reports to share, Thank-you note templates, Staff support: Development director helps with follow-through, ED available for prospect meetings, Administrative support for events",
                        "Track board fundraising in HQ: Dashboard showing each member: Personal gift this year, Prospects introduced, Doors opened, Events hosted, Fundraising attributed to their network",
                        "Accountability (with love): Quarterly reports on board fundraising progress, Public recognition for top performers, Private conversations if not meeting expectations, Annual self-assessment: Reflect on contributions",
                        "Culture shift: Frame as 'you're not asking for you, you're offering opportunity to make impact', Celebrate wins together, Share testimonials from people they helped fund"
                    ]
                },
                {
                    title: "Strengthen Board Meetings and Engagement",
                    description: "Run effective meetings that energize and utilize board talent.",
                    action: "Improve board meetings: Send materials 1 week in advance, Start with impact story (never skip this), Focus on strategy, not minutiae, Use committees for detailed work, 90 minutes max, Action items and follow-up. Use HQ for: Meeting scheduling, Document sharing, Task tracking. Keep board engaged between meetings: Monthly impact email, Committee work, Event invitations.",
                    deliverable: "Revitalized board meeting structure",
                    hqTools: ["HQ Meeting Scheduler", "HQ Document Sharing", "HQ Task Management"],
                    kpi: "90%+ meeting attendance; high engagement scores",
                    detailedSteps: [
                        "Meeting structure (90 min): 0-10 min: Welcome, approve minutes, ED highlights, 10-25 min: Impact story (video, beneficiary visit, staff presentation), 25-40 min: Financial report (brief unless issues), 40-60 min: Strategic discussion (major decision, opportunity, challenge), 60-80 min: Committee reports (5 min each), 80-90 min: Fundraising check-in, upcoming events, action items",
                        "Meeting best practices: Send packet 7 days before (financials, reports, decision docs), No surprises - surface issues before meeting, Start and end on time, No rubber-stamping - real governance, Engage quiet members, capture expertise, Document decisions and actions in HQ",
                        "Committee structure: Executive: Chair, vice chair, treasurer, ED - handles urgent issues, Finance: Oversees budget, audit, financial health, Development/Fundraising: Supports fundraising strategy, donor cultivation, Events, Governance: Board recruitment, evaluation, policies, Program: Program oversight, impact measurement, Create meeting calendar for each",
                        "Keep board engaged year-round: Monthly impact email from ED, Invitations to programs and events, Quick wins: Ask for specific help (introduction, expertise, resource), Personal check-ins: Board chair or ED calls each member quarterly, Annual board retreat: Strategic planning, team building, celebration",
                        "Use HQ for board management: Store all board documents (minutes, financials, policies), Meeting scheduler with RSVP, Task assignment and tracking, Communication hub, Calendar of all board activities",
                        "Annual board evaluation: Self-assessment: Each member rates own contribution, Board assessment: Effectiveness of board as whole, Individual feedback sessions: Board chair meets with each member, Organizational assessment: How well does board govern?"
                    ]
                },
                {
                    title: "Launch Board Advisory Council or Young Professionals Board",
                    description: "Create pipeline and expand network through auxiliary board.",
                    action: "Consider creating auxiliary group: Advisory Council: Professionals who advise but aren't full board (less commitment, can be paid role for experts), Young Professionals Board: Next-gen leaders (20s-30s) who plan events, recruit peers, smaller giving requirement, Board Alumni: Former board members staying engaged. Expands reach without growing main board. Use HQ to manage.",
                    deliverable: "Advisory or Young Professional board launched with 5-10 members",
                    hqTools: ["HQ Community for group management", "HQ Event Planning", "HQ CRM"],
                    kpi: "Auxiliary board raises $10K+ and brings new energy",
                    detailedSteps: [
                        "Choose structure based on needs: Advisory Council: Purpose: Provide specialized expertise, open doors, expand network, Not fiduciary role, Commitment: Attend quarterly meetings, advise on strategy, make introductions, Profile: Seasoned professionals, niche expertise, high-level connections, OR Young Professionals Board (YPB): Purpose: Engage next generation, peer fundraising, volunteer recruitment, Not fiduciary but active, Commitment: Monthly meetings, plan 2-3 events/year, give $250-500, 'get' $1K-2K, Profile: Ages 25-40, rising professionals, passion for cause",
                        "YPB structure (most common): Size: 10-15 members, Term: 2 years, Activities: Host young professional networking events, Social media ambassadors, Volunteer recruitment at companies, Peer-to-peer fundraising, Liaison to main board (1-2 YPB members attend board meetings)",
                        "Recruitment: Personal invitations from current board/staff, Referrals from young donors/volunteers, Professional association outreach, Social media call-out",
                        "Use HQ Community to manage: Private group for YPB members, Event planning tools, Task management, Communication hub",
                        "Support structure: Staff liaison assigned, Budget for events and activities, Access to organizational resources, Recognition and appreciation",
                        "Path to main board: YPB serves as farm team, After 2 years, top members invited to full board, Maintains pipeline of engaged leaders",
                        "Track impact: Events hosted, Funds raised, Volunteers recruited, New donors acquired, Members elevated to board"
                    ]
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Sustainability & Diversification Strategy",
            weekDescription: "Build sustainable funding mix for long-term stability.",
            icon: TrendingUp,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Diversified revenue plan; earned income stream identified",
            tasks: [
                {
                    title: "Analyze Current Revenue Streams and Dependencies",
                    description: "Assess funding health and identify concentration risks.",
                    action: "Create revenue analysis in HQ: Break down by source (individual donors, corporate, grants, events, government, earned income), Percentage of each, Trends over 3 years, Concentration risk (is >50% from one source?), Restricted vs. unrestricted. Identify: What's working, What's declining, Gaps. Goal: Diversified funding (no source >40% of budget).",
                    deliverable: "Comprehensive revenue analysis report",
                    hqTools: ["HQ Reporting", "HQ Financial Analysis", "HQ Spreadsheets"],
                    kpi: "Clear picture of funding health and diversification needs",
                    detailedSteps: [
                        "Gather 3 years of financial data: Pull from HQ Financial Reports or accounting system, Categorize all revenue by source: Individual donations (one-time), Monthly/recurring donations, Major gifts ($1K+), Corporate sponsorships, Foundation grants, Government contracts/grants, Events (net revenue), Earned income (fees, products, services)",
                        "Calculate for each source: Total amount each year, Percentage of total budget, 3-year trend (growing, stable, declining), Restricted vs. unrestricted (can you use for anything or only specific program?)",
                        "Analyze concentration risk: Ideal: No single source >30-40% of budget, Red flag: One source >50% (vulnerable if it ends), Diversification score: 5+ sources each at 10-20%",
                        "Assess stability: Recurring/predictable: Monthly donors, government contracts, Lower risk, Volatile: One-time donors, special events, Higher risk, need buffer, Restricted: Grant for specific program, can't shift if priorities change",
                        "Create visual dashboards in HQ: Revenue pie chart by source (current year), Trend lines over 3 years, Concentration metric, Restricted vs unrestricted split",
                        "Identify priorities: Which sources to grow?, Which to stabilize?, What's missing? (e.g., no major gifts program), Where to invest resources for best ROI?",
                        "Document findings and recommendations in strategic plan"
                    ]
                },
                {
                    title: "Develop 3-Year Revenue Diversification Plan",
                    description: "Create roadmap to balanced, sustainable funding mix.",
                    action: "Build strategic revenue plan: Set goal by source for Years 1, 2, 3. Example: Grow monthly giving from 10% to 25%, Increase major gifts from 5% to 15%, Maintain grants at 30%, Add earned income at 10%. Create action plans for each. Include: Strategies, Resource needs (staff, budget), Milestones, Owner. Use HQ Project Management to track progress.",
                    deliverable: "3-year revenue diversification strategic plan",
                    hqTools: ["HQ Strategic Planning", "HQ Project Management", "HQ Goal Tracking"],
                    kpi: "Clear targets and action plans for each revenue stream",
                    detailedSteps: [
                        "Set 3-year vision: Year 3 ideal revenue mix (percentages), Total budget goal, Key assumptions (economy, growth capacity)",
                        "Work backward to Year 1 and 2: What needs to happen each year to reach Year 3?, Be realistic about capacity and market",
                        "For each revenue source, define: Current state, Year 1 goal, Year 2 goal, Year 3 goal, Strategies to get there, Resource requirements, Key milestones, Owner/responsible party",
                        "Example - Monthly Giving: Current: $5K/month (10% of budget), Year 1 goal: $10K/month (15%), Year 2 goal: $15K/month (20%), Year 3 goal: $25K/month (25%), Strategies: Conversion campaign, Monthly donor retention program, Upgrade path, Board member monthly gifts, Resources: Development coordinator, Email platform, Marketing budget, Milestones: Q1 - Launch conversion campaign, Q2 - 100 monthly donors, Q3 - Retention 85%, Q4 - 150 monthly donors, Owner: Development Director",
                        "Repeat for all sources: Individual giving, Corporate partnerships, Foundation grants, Government grants, Events, Earned income, Major gifts",
                        "Prioritize based on: ROI potential, Alignment with capacity, Market opportunity, Strategic importance",
                        "Build implementation plan in HQ Project Management: Quarterly milestones, Action items, Progress tracking, Accountability check-ins",
                        "Review and adjust quarterly: What's working?, What's not?, Where to double down?, What to stop?"
                    ]
                },
                {
                    title: "Explore and Launch Earned Income Ventures",
                    description: "Create revenue stream that isn't donation-dependent.",
                    action: "Identify earned income opportunities: Fee-for-service (training, consulting, workshops), Product sales (mission-aligned), Facility rental (space monetization), Licensing (IP, curriculum). Start small with pilot. Example: Job training non-profit charges companies for corporate training workshops. Use HQ to manage sales and operations. Diversifies funding and increases impact.",
                    deliverable: "1 earned income pilot launched",
                    hqTools: ["HQ eCommerce", "HQ Booking", "HQ Financial Tracking"],
                    kpi: "Earned income pilot generating $1K-5K/month",
                    detailedSteps: [
                        "Brainstorm earned income ideas based on your assets: Expertise: What do you do that others would pay to learn? (Training programs, consulting, workshops, curriculum licensing), Space: Do you have facility that could be rented? (Event space, meeting rooms, commercial kitchen), Products: Mission-aligned items you could sell? (Cause-related merchandise, products made by beneficiaries, Books, guides, toolkits), Services: Can you provide services to paying clients while fulfilling mission? (Youth program charges sliding scale, Job training offers corporate workshops)",
                        "Evaluate opportunities: Mission alignment: Does it advance your cause?, Market demand: Will people pay?, Profitability: Can you price to make profit?, Capacity: Do you have resources?, Scalability: Can it grow?, Risk: What could go wrong?",
                        "Common models: Social enterprise: Products made by people you serve (bakery employing formerly homeless, gift shop selling items crafted by clients), Fee for service: Training or consulting leveraging your expertise, Facility rental: Rent space for events, meetings, Licensing: Sell curriculum or program model to others",
                        "Pilot example: Earned income idea: Corporate team-building volunteer days, Offer: Companies pay $2K for 4-hour experience (employees volunteer + team building), Includes: Structured volunteer activity, Facilitated reflection, Lunch, Impact report, Launch: Start with 1 per month, Test pricing and demand, Scale if successful, Use HQ Booking to manage scheduling, HQ Payment for processing",
                        "Legal/financial considerations: Consult attorney about UBIT (unrelated business income tax), Set up separate tracking in HQ for earned income, Price to cover costs + margin for sustainability, Reinvest profits into mission",
                        "Market and sell: Create service page on HQ website, Pitch to corporate prospects, Leverage board connections, Track in HQ CRM: Sales pipeline, Conversions, Revenue",
                        "Measure success: Revenue generated, Profit margin, Mission impact (did it advance cause?), Resource drain (is it worth the effort?)"
                    ]
                },
                {
                    title: "Build 6-Month Operating Reserve Fund",
                    description: "Create financial cushion for organizational stability.",
                    action: "Calculate reserve target: 6 months of operating expenses (payroll + rent + essential costs). Current reserve status? Set goal to reach target over 2-3 years. Strategies: Designate percentage of unrestricted gifts to reserve, Surplus from events, Board gives, Save windfall gifts. Track in HQ. Having reserve increases donor confidence and organizational resilience.",
                    deliverable: "Operating reserve fund established",
                    hqTools: ["HQ Financial Management", "HQ Goal Tracking"],
                    kpi: "Operating reserve equals 3-6 months expenses",
                    detailedSteps: [
                        "Calculate reserve target: Monthly operating expenses: Average payroll, Rent/occupancy, Utilities, Insurance, Essential operating costs (not program costs), Target: 6 months of monthly operating expenses, Example: If monthly operating = $20K, target reserve = $120K",
                        "Assess current status: Do you have any reserve/savings now?, If yes, how many months does it cover?, Gap to target?",
                        "Create reserve building plan: Set 3-year goal to reach target reserve, Year 1: 2 months reserve, Year 2: 4 months, Year 3: 6 months, Annual savings needed: Gap ÷ years",
                        "Funding strategies: Policy: Designate 10-20% of all unrestricted donations to reserve (automate in HQ), Event surpluses: 50% of net event revenue to reserve, Board campaign: Board gives specifically for reserve fund, Windfall policy: Unexpected large gifts → 25% to reserve, Year-end surplus: If annual budget has surplus, add to reserve",
                        "Financial policies: Board adopts reserve policy, Reserve is unrestricted and liquid (savings account), Only used for: Emergency cash flow, Unexpected crisis, Bridge during transition (not regular operations), Board must approve any use",
                        "Track in HQ Financial Management: Separate account for reserve fund, Monthly balance tracking, Progress toward goal visualization, Include in financial reports to board",
                        "Communicate to stakeholders: Show reserve on financial statements, Donors appreciate financial health, Demonstrates sustainability and good governance, Include in grant applications (financial stability)",
                        "Celebrate milestones: First month of reserve saved, 3 months, 6 months achieved"
                    ]
                },
                {
                    title: "Create Planned Giving and Legacy Program",
                    description: "Secure future funding through bequests and estate gifts.",
                    action: "Launch planned giving program: Create 'Legacy Circle' for donors who've included you in their will/estate plan. Educate supporters about: Will bequests (easiest), Beneficiary designations (life insurance, retirement accounts), Charitable gift annuities, Donor-advised funds. Promote in: Newsletter, Website, Email campaigns, Direct mail to 55+ donors. Use HQ to track legacy commitments. Long-term but transformational.",
                    deliverable: "Legacy giving program launched; 5+ legacy intentions",
                    hqTools: ["HQ CRM", "HQ Email Campaigns", "HQ Website for legacy page"],
                    kpi: "5 legacy gift commitments in Year 1; 25+ by Year 3",
                    detailedSteps: [
                        "Create 'Legacy Circle' program: Name: '[Organization Name] Legacy Circle' or 'Heritage Society', Members: Anyone who's included you in estate plan, Benefits: Recognition (with permission), Exclusive updates, Special events, Lasting legacy",
                        "Build legacy giving page on HQ website: Headline: 'Leave a Lasting Legacy', Explanation: What planned gifts are, why they matter (future sustainability), Options: Will bequests (most common): 'Include [Org] in your will', Beneficiary designations: Name org as beneficiary of life insurance/IRA, Charitable gift annuities: Receive income for life, then remainder to org, Donor-advised fund grants, Sample language: 'I give [% or $X] to [Legal Name], Tax ID [#]'",
                        "Promotion and education: Newsletter article: 'How to Leave a Legacy Gift', Email campaign to donors 55+: 'Your legacy can change lives forever', Simple, Estate planning reminders (no pressure), Direct mail piece to loyal donors 65+, Include reply card: 'Yes, I've included you in my will', Webinar: 'Estate Planning 101' with local attorney",
                        "Track in HQ CRM: Tag donors who've notified you of bequest, Document: Type of gift (will, IRA, etc.), Estimated value (if they share), Recognition permission, Create stewardship plan for legacy donors",
                        "Stewardship: Personal thank-you from ED or board chair, Certificate of membership in Legacy Circle, Annual legacy donor appreciation event, Exclusive updates on impact and future plans, No pressure or frequent asks (they've already given!)",
                        "Legal/technical: Ensure correct legal name and tax ID on website, Work with attorney on gift agreements if needed, Partner with local estate planning attorneys for referrals",
                        "Long game: Takes years to see bequests actualized, But largest individual gifts often come from estates, One bequest can transform budget"
                    ]
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Optimization & Next 90 Days",
            weekDescription: "Analyze results, refine systems, plan for continued growth.",
            icon: Sparkles,
            dailyTime: "60-90 minutes",
            weeklyGoal: "90-day review complete; Q2 plan finalized",
            tasks: [
                {
                    title: "Conduct Comprehensive 90-Day Review",
                    description: "Analyze what worked, what didn't, and key learnings.",
                    action: "Review Days 1-90: Total funds raised vs. goal, Donors acquired (new + retained), Volunteers recruited and engaged, Grant applications and awards, Programs delivered, Website and online performance. Use HQ Analytics to pull reports. Identify wins and opportunities. Gather feedback from: Staff, Board, Donors, Volunteers. Document learnings.",
                    deliverable: "Complete 90-day impact report",
                    hqTools: ["HQ Analytics", "HQ Reporting", "HQ Survey"],
                    kpi: "Comprehensive data on all 90-day activities and outcomes",
                    detailedSteps: [
                        "Pull metrics from HQ Analytics: Fundraising: Total donations, Number of donors, Average gift, Donor retention rate, Monthly recurring revenue, Grant funding secured, Event revenue (net), Revenue by source breakdown, Growth: New donors acquired, Email list growth, Social media followers, Website traffic, Volunteers: Active volunteers, Total volunteer hours, Programs: People served, Programs delivered, Outcomes achieved, Costs: Cost per donor acquisition, ROI on paid ads, Event ROI",
                        "Compare to goals: What targets did you hit or exceed?, Where did you fall short?, Why?, What surprised you (positive or negative)?",
                        "Qualitative feedback: Survey staff: 'What worked? What could improve? What support do you need?', Survey board: 'How effectively are we fundraising? What should we prioritize?', Survey donors: 'Why do you support us? How's your experience?', Survey volunteers: 'What motivates you? How can we improve?', Send via HQ Forms, analyze themes",
                        "Document wins: Total raised this quarter: $X, New donors: X, Lives impacted: X, Systems built (website, CRM, campaigns, programs), Relationships formed (corporate partners, board members), Skills developed (team capacity)",
                        "Document challenges: What didn't work as hoped?, What took more time/resources than expected?, What barriers did you face?, What do you wish you'd known?",
                        "Key learnings: Top 3 effective strategies, Top 3 areas needing improvement, Top 3 priorities for next quarter",
                        "Create 90-day impact report: For board, staff, major donors, Visuals of data, Success stories, Financials, Next steps"
                    ]
                },
                {
                    title: "Optimize High-Performing Channels and Campaigns",
                    description: "Double down on what's working; improve or eliminate what's not.",
                    action: "Analyze ROI by channel: Which sources brought most donors at lowest cost?, Which had highest retention?, Best events? Best emails? Use HQ data. Optimize winners: Increase budget, Refine messaging, Scale frequency. Fix or cut underperformers. Examples: If Facebook ads profitable, increase budget 50%. If direct mail didn't work, pause and reinvest elsewhere.",
                    deliverable: "Optimization plan by channel",
                    hqTools: ["HQ Analytics", "HQ A/B Testing", "HQ Budget Allocation"],
                    kpi: "20%+ improvement in key metrics through optimization",
                    detailedSteps: [
                        "Channel performance analysis: For each channel (email, social media, ads, events, direct mail, website), calculate: Total donations, Cost (time + money), ROI: Donations ÷ Cost, Donor acquisition cost, Donor retention from that channel, Lifetime value of donors from channel",
                        "Identify winners: Top 3 channels by: Highest revenue, Best ROI, Most new donors, Highest retention, Example: Email has best ROI, Facebook ads acquire most new donors, Events have highest retention",
                        "Optimization strategies for winners: Email: A/B test subject lines, Increase frequency slightly if engagement stays strong, Segment for personalization, Test new CTAs, Facebook ads: Increase budget 30-50% for profitable campaigns, Test new creative variations, Expand to lookalike audiences, Monthly giving: Test upgrade offers to one-time donors, Add 'round-up' option, Create exclusive perks",
                        "Fix underperformers: Diagnose: Why didn't it work? (bad timing, wrong audience, poor execution?), Options: Optimize and retest: Change one variable, try again, Pause for now: Revisit when you have more resources, Cut: Eliminate and reallocate budget to winners, Example: If direct mail lost money, either improve list targeting + messaging OR cut and reinvest in email",
                        "Budget reallocation: Calculate budget shifts: Cut $X from underperforming, Add $X to high-ROI channels, Project impact: 'If we shift $5K from events to Facebook ads with 4:1 ROI, we gain $15K'",
                        "Test new tactics: Based on learnings, identify 2-3 new things to try next quarter, Small tests first, scale if successful",
                        "Document optimization plan in HQ: By channel, specific changes, expected outcomes, Timeline for implementation"
                    ]
                },
                {
                    title: "Refine HQ Systems and Automations",
                    description: "Streamline operations for efficiency and scalability.",
                    action: "Audit HQ setup: Which automations are working?, Which workflows need improvement?, What manual tasks can be automated?, Gaps in data or tracking? Optimize: Email sequences (improve copy, timing), Donation forms (test layouts, suggested amounts), CRM processes (tags, pipelines, reporting), Website (load speed, mobile, conversions). Goal: Reduce manual work, increase conversion rates, better data.",
                    deliverable: "HQ optimized for maximum efficiency",
                    hqTools: ["HQ Automation Builder", "HQ Analytics", "HQ A/B Testing"],
                    kpi: "Manual tasks reduced by 30%; conversion rates up 20%",
                    detailedSteps: [
                        "System audit - what's working: Which HQ features are you using effectively?, What automations are firing correctly?, Where is data captured well?, What donor communications are performing?",
                        "System audit - what needs improvement: What processes are still manual that could be automated?, Where is data missing or inconsistent?, What's confusing or clunky for users?, Which forms have low completion rates?",
                        "Email automation optimization: Review all email sequences: Donor thank-yous, Welcome series, Lapsed donor reactivation, Monthly donor nurture, Metrics: Open rates, Click rates, Conversions, Optimization: A/B test subject lines, Shorten emails that are too long, Add more storytelling where it's dry, Adjust timing/frequency, Stronger CTAs",
                        "Donation form optimization: HQ donation page tests: Suggested amounts (test $25-50-100 vs $50-100-250), Monthly vs one-time emphasis, Form fields (reduce if too many), Button copy ('Donate' vs 'Give Hope' vs 'Make Impact'), Urgency elements (countdown, match deadline), Mobile experience, Goal: Increase conversion rate 1% → 1.5% = 50% more donations",
                        "CRM cleanup and processes: Standardize tagging and segmentation, Create smart lists for common segments (lapsed donors, monthly givers, volunteers, etc.), Build dashboards for key metrics, Automate reports for staff/board, Document processes in HQ Files (so anyone can follow)",
                        "Website optimization: Speed: Compress images, optimize code (use HQ tools), Mobile: Test all pages and forms on phone, Navigation: Can visitors find donation and volunteer pages easily?, Content: Update old content, add new success stories, SEO: Optimize for keywords people search",
                        "New automations to add: Birthday emails to donors, Volunteer anniversary recognition, Board member task reminders, Social media post scheduling, Report generation",
                        "Train team: Update training docs in HQ, Walk team through improvements, Get feedback"
                    ]
                },
                {
                    title: "Plan Q2 Growth Initiatives",
                    description: "Set strategy and goals for next 90 days.",
                    action: "Based on Q1 learnings, plan Q2: Revenue goal (increase 15-20%?), Key initiatives (2-3 big pushes), New programs or expansions, Staff/board development, Systems improvements. Create Q2 calendar with: Campaign launches, Events, Grant deadlines, Board meetings. Use HQ Project Management to assign and track. Build on momentum from Days 1-90.",
                    deliverable: "Q2 strategic plan with monthly milestones",
                    hqTools: ["HQ Project Management", "HQ Calendar", "HQ Goal Tracking"],
                    kpi: "Clear roadmap for next 90 days",
                    detailedSteps: [
                        "Set Q2 goals: Revenue: If Q1 raised $50K, Q2 goal $60K (20% increase), Donors: Grow list by 20%, Increase monthly donors by 50, Retain 85% of Q1 donors, Programs: Serve 20% more people, Launch 1 new program element, Volunteers: Recruit 20 new active volunteers, Systems: Complete HQ optimization, Launch earned income pilot",
                        "Prioritize Q2 initiatives: Choose 2-3 major pushes (can't do everything): Option 1: Major donor campaign (focus on upgrading existing donors), Option 2: Corporate partnership expansion (5 new sponsors), Option 3: Event series (quarterly fundraising events), Option 4: Grant sprint (10 applications), Base on: What worked in Q1, Where biggest opportunity, Available capacity",
                        "Build Q2 calendar in HQ: Month 4: Major donor campaign launch, Board retreat, Spring event planning, Month 5: Grant submissions (fiscal year renewals), Volunteer appreciation week, Spring fundraising event, Month 6: Q2 end push (meet goals), Mid-year impact report, Q3 planning",
                        "Create project plans for each initiative: Major donor campaign: Identify top 50 prospects, Personal outreach and meetings, Proposals and closes, Track in HQ CRM, Corporate partnerships: Research and outreach (10 targets), Proposals and pitches, 5 secured partnerships, Event series: Quarterly themed fundraisers, Volunteer committees, Sponsor recruitment",
                        "Assign ownership: Development director: Donor campaigns, events, ED: Corporate partnerships, major gifts, board cultivation, Program director: Impact data, beneficiary stories, volunteer coordination, Board chair: Board engagement, major donor asks, Use HQ to assign tasks and deadlines",
                        "Resources and budget: What investment needed for Q2 initiatives?, Staff time allocation, Marketing/materials budget, Event costs, Do you need to hire? (part-time coordinator, consultant)",
                        "Monthly check-ins: Track progress in HQ, Adjust as needed, Celebrate wins, Support struggling areas"
                    ]
                },
                {
                    title: "Celebrate Wins and Recognize Team",
                    description: "Acknowledge progress and energize for next phase.",
                    action: "Host celebration: Staff and board gathering (virtual or in-person), Share 90-day wins and impact stories, Thank everyone who contributed, Publicly recognize: Top performing board members, Staff achievements, Volunteer heroes, Major donors. Create highlight reel video. Send impact report to all stakeholders. Recharge and prepare for next 90 days of growth.",
                    deliverable: "Team celebration and stakeholder impact report",
                    hqTools: ["HQ Events", "HQ Video Creation", "HQ Email Campaigns"],
                    kpi: "Team energized and appreciated; stakeholders informed",
                    detailedSteps: [
                        "Plan celebration event: Format: Staff lunch, board dinner, virtual toast, or all-hands meeting, Agenda: Welcome and thank you, 90-day wins presentation (data + stories), Recognition awards, Looking ahead to Q2, Q&A and discussion, Celebration (food, drinks, fun), Invite: All staff, Board members, Key volunteers, Major donors",
                        "Create 90-day highlight video: 2-3 minutes showcasing: Numbers (donations raised, people served), Success stories (beneficiary testimonials), Behind-the-scenes (team in action), Thank yous, Upload to HQ Video Hosting, Share: Email to stakeholders, Social media, Website",
                        "Recognition awards: Board Member of the Quarter: Most active in fundraising, Volunteer of the Quarter: Most hours and impact, Staff MVP: Outstanding contribution, Donor of the Quarter: Highest impact or engagement, Create certificates or small gifts",
                        "Impact report to stakeholders: Send via HQ Email to all: Donors, Volunteers, Board, Partners, Community, Content: Total raised, How funds were used, Lives impacted (data + stories), Thank yous, Q2 goals, Design visually in Canva, PDF and web version",
                        "Personal thank yous: ED writes handwritten notes to: Top 10 donors, Board chair, Key volunteers, Major partners, Board chair calls major donors",
                        "Social media celebration: Post series highlighting wins: 'We raised $X!', 'We served X people', '90% program success rate', 'Thank you to amazing community', Encourage shares and engagement",
                        "Reflect personally: What are you most proud of?, What did you learn?, What energizes you for Q2?, Share with team"
                    ]
                }
            ]
        }
    ],
    
    kpiChecklist: [
        { metric: "Total donations (90 days)", target: "$25K-50K" },
        { metric: "Number of donors", target: "500-750" },
        { metric: "Monthly recurring donors", target: "50-100" },
        { metric: "Monthly recurring revenue", target: "$2K-5K/month" },
        { metric: "Donor retention rate", target: "60-70%" },
        { metric: "Average gift size", target: "$75-150" },
        { metric: "Corporate sponsors", target: "5-10" },
        { metric: "Foundation grants awarded", target: "3-5" },
        { metric: "Active volunteers", target: "50-100" },
        { metric: "Volunteer hours (90 days)", target: "1,000-2,000" },
        { metric: "Email list size", target: "2,000-3,000" },
        { metric: "Email open rate", target: "25-35%" },
        { metric: "Website visitors (monthly)", target: "1,000-2,000" },
        { metric: "Donation page conversion", target: "2-5%" },
        { metric: "Social media followers", target: "1,500-3,000" },
        { metric: "Cost per donor acquisition", target: "$20-50" },
        { metric: "Fundraising ROI", target: "1:4 minimum" }
    ],

    templates: {
        donorThankYou: "Dear [Donor Name], Thank you for your generous gift of $[Amount] to [Organization]. Your support will [specific impact - feed 5 families, send 2 kids to camp, etc.]. Because of donors like you, we're able to [mission accomplishment]. We'll keep you updated on the impact you're making. With gratitude, [Name, Title]",
        
        eventSponsorshipAsk: "Dear [Contact Name], I'm reaching out because [Organization] is hosting our annual [Event Name] on [Date], and we'd be honored to have [Company] as a sponsor. This event raises critical funds to [purpose and impact]. As a [Tier] Sponsor at $[Amount], you would receive: [list 3-4 key benefits]. Your partnership would help us [specific impact]. I'd love to discuss how this aligns with [Company]'s community commitment. Are you available for a brief call this week? Best, [Your Name]",
        
        volunteerRecruitement: "🙋 Want to Make a Difference? We're looking for passionate people to volunteer with [Organization]! Whether you have 2 hours a month or 2 hours a week, we have opportunities that fit your schedule. What we need: [list 2-3 roles]. No experience necessary - just a heart for [cause]. Join our team: [link to sign up]. Questions? Email [contact]. Together, we're changing lives. 💙",
        
        grantProposalOpening: "Executive Summary: [Organization Name] respectfully requests $[Amount] from [Foundation Name] to support [specific program/initiative]. This funding will enable us to [specific outcomes - serve X more families, launch new initiative, expand program]. Our [program] addresses the critical need for [problem] in [community]. In the past year, we have served [#] people with [success rate]% achieving [outcome]. With your support, we will expand our impact to reach [target] by [timeframe]. This proposal outlines our approach, expected outcomes, budget, and evaluation plan."
    }
};