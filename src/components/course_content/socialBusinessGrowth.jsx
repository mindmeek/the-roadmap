import { TrendingUp, Target, Users, DollarSign, Heart, Handshake, BarChart, Globe, Sparkles, Award, Calendar, MessageSquare } from 'lucide-react';

export const socialBusinessGrowthRoadmap = {
    courseTitle: "Social Business Growth Plan: 90-Day Dual-Impact System",
    courseDescription: "Scale your revenue while deepening your social mission. Use impact investment, customer acquisition, and dual-bottom-line metrics to build a thriving social enterprise.",
    totalWeeks: 12,
    category: "Niche: Social Business / B-Corp",
    difficulty: "All Levels",

    successMetrics: {
        revenue: "$50K+ revenue in 90 days",
        impact: "500+ lives positively impacted",
        customers: "200+ mission-aligned customers",
        investors: "3+ impact investors engaged"
    },

    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Dual-Bottom-Line Foundation",
            weekDescription: "Define your social mission and commercial model as one integrated strategy.",
            icon: Target,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Dual-bottom-line strategy documented, impact thesis defined, revenue model validated",
            tasks: [
                {
                    title: "Craft Your Integrated Mission-Revenue Statement",
                    description: "Articulate how your profit engine directly funds your social mission.",
                    action: "Create a single integrated statement that shows how revenue and impact are inseparable. Define your Theory of Change: every $X earned = Y social outcome. This becomes your pitch to customers, investors, and partners.",
                    deliverable: "Integrated mission-revenue statement and Theory of Change",
                    hqTools: ["HQ Strategy Tools", "HQ AI for refinement"],
                    kpi: "Statement that resonates with both profit-motivated and mission-motivated stakeholders",
                    detailedSteps: [
                        "Go to HQ Strategy Tools → Open 'Mission & Vision' template",
                        "Write your commercial value proposition: What product/service do you sell? Who is the paying customer? What problem do you solve for them?",
                        "Write your social value proposition: Who benefits from your social mission? What measurable change do you create?",
                        "Connect the two: 'Every time a customer buys X, we are able to Y (social outcome).' Make this specific and measurable.",
                        "Example: 'We sell premium handmade goods crafted by formerly incarcerated artisans, providing living-wage employment and skill development that reduces recidivism by 60%.'",
                        "Use HQ AI: 'Help me articulate how my revenue model and social mission are mutually reinforcing.'",
                        "Create your Theory of Change: Input (funding) → Activities → Outputs → Outcomes → Impact",
                        "Save to HQ Files under 'Strategic Foundation'"
                    ]
                },
                {
                    title: "Map Your Dual Customer Personas",
                    description: "Identify both paying customers and mission beneficiaries as distinct personas.",
                    action: "Create 3 personas: Commercial Customer (who pays), Impact Beneficiary (who benefits from mission), and Mission-Aligned Investor/Partner (who funds the gap). For each: motivations, decision criteria, communication preferences.",
                    deliverable: "3 distinct personas with dual-bottom-line messaging for each",
                    hqTools: ["HQ Strategy Tool: Ideal Client Profile", "HQ Files"],
                    kpi: "Messaging that converts mission-aligned buyers at premium prices",
                    detailedSteps: [
                        "Persona 1 - Commercial Customer: Who pays full price for your product/service? What is their primary motivation (quality, price, mission alignment)? How much does the social mission influence their purchase decision? What story do they tell friends when they buy from you?",
                        "Persona 2 - Impact Beneficiary: Who receives the social benefit? What is their situation before your intervention? What measurable change do they experience? How can their story be ethically shared to attract customers and funders?",
                        "Persona 3 - Mission-Aligned Buyer: Customer who prioritizes social impact in purchasing decisions. Demographics: often urban, 25-45, educated, values-driven. Willing to pay 10-30% premium for mission-aligned products. Responds to impact metrics and storytelling.",
                        "For each commercial customer segment, determine: What % buys primarily for product quality? What % buys primarily for the mission? How to speak to both motivations simultaneously?",
                        "Create messaging matrix: Same product, different angles based on customer motivation",
                        "Save personas to HQ Files - reference for all marketing"
                    ]
                },
                {
                    title: "Define Your Impact Metrics Framework",
                    description: "Establish the social KPIs you'll measure alongside financial KPIs.",
                    action: "Define 3-5 core impact metrics for your business. Use established frameworks (IRIS+, B Impact Assessment, UN SDGs) where applicable. These metrics are your 'social currency' with investors, customers, and media. Set baseline and 90-day targets.",
                    deliverable: "Impact measurement framework with 90-day targets",
                    hqTools: ["HQ Strategy Tools", "HQ Analytics", "HQ Files"],
                    kpi: "Measurable social outcomes tracked alongside revenue",
                    detailedSteps: [
                        "Choose relevant impact metric categories: People: Jobs created, wages paid above minimum, training hours, People served, lives improved, Communities: Local procurement %, community investment, Environment: Carbon offset, waste diverted, emissions reduced, Governance: Diversity metrics, ethical supply chain %",
                        "For each metric, define: Baseline (current state), 90-day target, How you'll measure it, Data source",
                        "Example metrics: '50 living-wage jobs created', '80% local suppliers', '500 families with improved food security', '$100K invested back into community programs'",
                        "Align with UN SDGs most relevant to your mission (SDG 1-17)",
                        "Consider B Impact Assessment as your framework if pursuing B-Corp certification",
                        "Set up basic tracking in HQ Analytics or spreadsheet",
                        "Document in HQ Files for sharing with stakeholders"
                    ]
                },
                {
                    title: "Conduct Competitive Landscape Analysis",
                    description: "Map both commercial competitors and mission-aligned peers.",
                    action: "Analyze 3 direct commercial competitors AND 3 social enterprise peers. For commercial: price, quality, market share. For social enterprises: impact model, funding mix, certification status. Identify your white space where commercial value meets social impact. Define your positioning.",
                    deliverable: "Competitive map with clear dual-bottom-line positioning",
                    hqTools: ["HQ Strategy Tool: SWOT Analysis", "HQ Files"],
                    kpi: "Clear differentiation from both pure commercial and pure nonprofit competitors",
                    detailedSteps: [
                        "Map commercial competitors: Price point, Product quality, Marketing positioning, Customer base",
                        "Map social enterprise peers: Impact model (how they create social value), Revenue mix (% commercial vs grants), B-Corp/certification status, Media presence and thought leadership",
                        "Identify competitive advantages: Can you compete on quality AND mission? Are there underserved impact areas? Is there a pricing gap (premium mission-aligned market not served)?",
                        "Define your white space: 'We are the only [product/service] in [market] that [specific impact] while [competitive advantage]'",
                        "Complete SWOT in HQ Strategy Tools with dual lens: Commercial SWOT + Impact SWOT",
                        "Note: Be wary of 'impact washing' competitors - authentic mission is your moat"
                    ]
                },
                {
                    title: "Build Your Revenue-Impact Model",
                    description: "Create the financial model that shows how revenue generates impact.",
                    action: "Build a simple model showing: Revenue needed to cover operations + impact programs. Revenue per unit/customer. Impact per unit/customer. At what revenue level does the model become self-sustaining? Use HQ to project 90-day financials alongside impact metrics.",
                    deliverable: "Revenue-impact projection model",
                    hqTools: ["HQ Financial Tools", "HQ Analytics"],
                    kpi: "Clear unit economics showing commercial and impact viability",
                    detailedSteps: [
                        "Map all revenue streams: Primary commercial product/service, Mission-aligned premium tier (if applicable), Impact investment or grants (if applicable), Earned income from impact programs (e.g., social enterprise training fees)",
                        "Calculate unit economics: Revenue per customer, Cost to serve per customer, Social impact cost per unit (what does it cost to create the social outcome?), Margin available for mission after operations",
                        "Model the impact: Every $X revenue = Y impact outcomes, Revenue needed for 1 job created / 1 beneficiary served / 1 ton CO2 offset",
                        "Identify funding gap: If impact costs exceed commercial margin, what's the gap? (This is what grants/impact investment covers)",
                        "Set 90-day targets: Revenue goal, Impact goal, Number of customers needed, Funding gap to close",
                        "Document in HQ and use for investor/partner conversations"
                    ]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Brand Building for Dual Impact",
            weekDescription: "Build a brand that commands premium pricing while inspiring mission-driven loyalty.",
            icon: MessageSquare,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Brand identity complete, impact story documented, website live",
            tasks: [
                {
                    title: "Create Your Impact Brand Identity",
                    description: "Design brand that communicates both quality and social mission.",
                    action: "Develop visual brand and messaging that signals: Premium commercial quality (for quality-first buyers) + Authentic social mission (for mission-first buyers) + Credibility and transparency (for both). Create Brand Kit in HQ. Your brand should work for both pitching to retailers AND presenting to impact investors.",
                    deliverable: "Complete brand kit with dual-bottom-line messaging framework",
                    hqTools: ["HQ Brand Kit", "HQ Design Templates", "HQ Files"],
                    kpi: "Brand that commands 15-30% premium over conventional alternatives",
                    detailedSteps: [
                        "Go to HQ Brand Kit → Create your brand identity",
                        "Color psychology for social enterprises: Earth tones signal sustainability, Deep colors signal quality/premium, Bright accents signal optimism and energy",
                        "Tagline that captures both dimensions: 'Quality you love. Impact you can see.' or 'Better business for a better world.'",
                        "Photography guidelines: Show both product quality AND human impact. Feature the faces behind the mission with dignity and permission.",
                        "Messaging hierarchy: Lead with quality/product value (earn the sale), Reinforce with impact story (deepen loyalty), Prove with data (build trust)",
                        "Create 3 brand voice tones: Professional (for B2B), Warm (for mission-aligned consumers), Data-driven (for investors/partners)",
                        "Ensure brand works on: Product packaging, Social media, Website, Investor deck, Media coverage"
                    ]
                },
                {
                    title: "Document Your Impact Story",
                    description: "Craft narratives that make the social mission tangible and compelling.",
                    action: "Create a library of 5 impact stories: Origin story of the mission, Beneficiary transformation story (with permission), Moment the commercial and social mission intersected, Data story (impact by the numbers), Future vision story. Use ethical storytelling guidelines.",
                    deliverable: "5 impact stories in multiple formats (video, written, infographic)",
                    hqTools: ["HQ Content Tools", "HQ Files", "HQ Video Hosting"],
                    kpi: "Stories that increase purchase intent and investor interest",
                    detailedSteps: [
                        "Origin story: Why did you start this? What problem did you witness that others ignored? What was the 'inciting incident'?",
                        "Beneficiary story: Identify one person whose life has changed. Get their permission. Tell their story with dignity: Before, The change, After, Their own words about the impact.",
                        "Ethical guidelines: Never exploit poverty/suffering for marketing, Ensure informed consent, Share impact and transformation, not tragedy, Let beneficiaries tell their own stories when possible",
                        "Data story: Turn your impact metrics into visual narrative: 'In the last year, [X people] [specific change] because of our work', Use HQ to create infographic",
                        "Mission-revenue intersection story: How does buying your product directly create impact? Make this connection explicit and concrete.",
                        "Future vision: Where is this mission going? What world are you working to create? How does commercial success accelerate the mission?",
                        "Format all stories for: 60-second verbal pitch, 1-page PDF, Social media post, Full website page"
                    ]
                },
                {
                    title: "Launch Impact-First Website",
                    description: "Build website that converts commercial buyers and tells the mission story.",
                    action: "Use HQ Website Builder to create a site that leads with product value, deepens with impact story, proves credibility with data and certifications. Include: Impact counter (live metrics), Mission page, Product pages with impact per purchase, About page featuring beneficiaries and team.",
                    deliverable: "Professional website live with impact integration",
                    hqTools: ["HQ Website Builder", "HQ Forms", "HQ Analytics"],
                    kpi: "Website driving 30+ new customers/leads per month",
                    detailedSteps: [
                        "Homepage: Hero = product value, Sub-hero = mission snapshot, Impact counter (people served, jobs created, etc.), Products/services CTA, Social proof (testimonials + certifications)",
                        "Products/Services page: Lead with quality and features, Include 'Impact of this purchase' section for each product, Clear pricing (transparency builds trust for mission-aligned buyers)",
                        "Impact page: Full impact story, Beneficiary testimonials (with consent), Impact metrics updated quarterly, Methodology and transparency, Certifications (B-Corp, Fair Trade, etc.)",
                        "About page: Founding story (why the mission), Team (include social enterprise background), Board/advisors with credibility, Partners and certifications",
                        "Transparency page: Financials (% revenue to mission, % to operations), Supply chain information, Impact methodology, Annual impact report",
                        "Add live impact counter using HQ Analytics: Auto-updates as sales occur",
                        "Mobile-optimize everything - 70%+ of traffic is mobile"
                    ]
                },
                {
                    title: "Develop Impact Marketing Content Calendar",
                    description: "Plan 90 days of content that serves both commercial and mission audiences.",
                    action: "Create content calendar that rotates through: Product/quality content (30%), Impact stories (30%), Mission education/thought leadership (20%), Social proof/customer stories (20%). Use HQ Social Scheduler to plan and batch. Your content must work for Instagram, LinkedIn, and email simultaneously.",
                    deliverable: "90-day content calendar with batched content",
                    hqTools: ["HQ Social Scheduler", "HQ Content Calendar", "HQ Templates"],
                    kpi: "Consistent posting with 5%+ engagement rate",
                    detailedSteps: [
                        "Content pillars: Pillar 1 (Mon): Product showcase - quality, craftsmanship, features, Pillar 2 (Tue): Impact story - beneficiary spotlight, mission moment, data point, Pillar 3 (Wed): Education - why social business matters, industry insight, thought leadership, Pillar 4 (Thu): Social proof - customer testimonials, media coverage, certifications, Pillar 5 (Fri): Behind-the-scenes - mission in action, team, process",
                        "Instagram: Beautiful imagery with impact captions, Stories for day-in-the-life mission content, Reels for impact metrics and product features",
                        "LinkedIn: Thought leadership on social enterprise, B2B partnerships, Investor and partner attraction, Impact metrics and milestones",
                        "Email: Monthly impact report to customers, Product launches with impact angle, Community updates and mission milestones",
                        "Batch-create 30 posts monthly, Schedule in HQ Social Scheduler",
                        "Track: Engagement rate, follower growth, email open rate, website traffic from social",
                        "Use HQ AI to generate initial drafts, then personalize with authentic voice"
                    ]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Mission-Aligned Customer Acquisition",
            weekDescription: "Build sales channels that attract customers who pay premium for purpose.",
            icon: Users,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Sales funnel live; 30+ mission-aligned customers acquired; $10K+ revenue",
            tasks: [
                {
                    title: "Launch Mission-Aligned Sales Campaign",
                    description: "Attract customers who value both quality and social impact.",
                    action: "Create launch campaign that speaks to your mission-aligned customer. Lead with impact story, prove with product quality, drive to purchase. Use 3-channel approach: Email to existing contacts, Social media campaign, Partnership with aligned organizations. Goal: 50 customers, $10K revenue in 30 days.",
                    deliverable: "Multi-channel campaign generating mission-aligned customers",
                    hqTools: ["HQ Email Campaigns", "HQ Social Scheduler", "HQ Analytics"],
                    kpi: "50+ customers; $10K+ revenue; 40%+ repeat purchase rate",
                    detailedSteps: [
                        "Launch email to personal/business network: Subject: 'We're building business differently — here's why', Tell the founding story briefly, Show the product and the impact in same breath, Clear CTA with specific impact: 'Your $X purchase creates Y impact'",
                        "Social media launch: Instagram: 5-day impact countdown (5 days, 5 impact stories), Reel showing the mission in action, Clear link to purchase",
                        "Partner outreach: Identify 5 organizations whose community overlaps with yours (aligned nonprofits, CSR programs, B-Corp peers), Offer to be featured in their newsletter/social, Provide affiliate link or unique code",
                        "Corporate outreach: Pitch 3 local companies for employee gift programs or CSR procurement, Social enterprise products often qualify for corporate social responsibility budgets",
                        "Track in HQ CRM: Source of each customer, Average order value, Repeat purchase behavior",
                        "A/B test messaging: Mission-led vs Product-led to see what converts better for your audience"
                    ]
                },
                {
                    title: "Build B2B Impact Procurement Channel",
                    description: "Sell to companies seeking mission-aligned suppliers for CSR goals.",
                    action: "Develop corporate sales pitch for B2B procurement. Many companies have supplier diversity, local procurement, or ESG goals you can fulfill. Create pitch deck focused on: Business quality and reliability, Social/environmental impact, Certifications and credibility. Target: 3 corporate accounts in 90 days.",
                    deliverable: "B2B sales pitch and 3 corporate prospects in pipeline",
                    hqTools: ["HQ CRM", "HQ Proposal Templates", "HQ Files"],
                    kpi: "3 corporate accounts; $25K+ in B2B revenue",
                    detailedSteps: [
                        "Research corporate buyers: Which companies have supplier diversity programs? Which have ESG reporting requirements? Which talk publicly about community investment or ethical sourcing?",
                        "Identify decision makers: Procurement officer, CSR/sustainability manager, HR (for employee benefits/gifts), Marketing (for co-branding opportunities)",
                        "Create B2B pitch deck: Executive summary (quality + impact credentials), Product/service overview (reliability, scalability), Impact credentials (certifications, metrics, stories), Social proof (other corporate clients), Pricing and terms",
                        "Outreach: LinkedIn to sustainability/procurement managers, Warm introductions through your network, Business association events and supplier fairs",
                        "Value propositions for corporate buyers: Helps them meet ESG/diversity supplier goals, Employee engagement through impact purchasing, Brand alignment and co-marketing opportunities, Tax benefits in some jurisdictions for social enterprise procurement",
                        "Track pipeline in HQ CRM: Prospect → Conversation → Proposal → Contract"
                    ]
                },
                {
                    title: "Create Impact Subscription or Membership Program",
                    description: "Build recurring revenue tied directly to ongoing impact.",
                    action: "Design a subscription or membership that creates predictable revenue AND ongoing impact. Each subscription = specific ongoing impact (monthly giving, regular employment, consistent product delivery). Emphasize the compounding nature of sustained commitment. Launch to first 50 subscribers.",
                    deliverable: "Subscription program with 50+ subscribers",
                    hqTools: ["HQ Subscription Program", "HQ Email Automation"],
                    kpi: "50 subscribers; $2K-5K monthly recurring revenue",
                    detailedSteps: [
                        "Design subscription tiers: Tier 1 - Supporter ($25/month): Monthly product + impact update, Tier 2 - Champion ($50/month): Premium product + behind-the-scenes content + named impact report, Tier 3 - Partner ($100/month): Full product suite + direct connection to mission + co-branding opportunities",
                        "Impact per subscription: Be specific about what recurring revenue enables. '$25/month = 2 hours of job training wages. $50/month = 1 week of fair wages for an artisan.'",
                        "Create compelling subscription page: Lead with impact accumulation over time, Show what 6 months of subscription achieves vs one-time purchase, Include visual of ongoing impact",
                        "Set up in HQ Subscription Program with automatic billing",
                        "Welcome sequence: Month 1 - Welcome + immediate impact report, Month 3 - Cumulative impact milestone, Month 6 - 6-month impact anniversary, Annual - Year in review impact letter",
                        "Launch: Email to existing customers first, Social media campaign, Corporate gifting program (companies can gift subscriptions to clients or employees)"
                    ]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Impact Investment & Funding Strategy",
            weekDescription: "Access capital from investors who seek both financial return and social impact.",
            icon: DollarSign,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Investment pitch ready; 5+ investor conversations; funding pipeline established",
            tasks: [
                {
                    title: "Map the Impact Investment Landscape",
                    description: "Identify and prioritize impact investors aligned with your mission.",
                    action: "Research 30 potential impact investors: CDFIs (Community Development Financial Institutions), Impact funds (RSF Social Finance, Calvert Impact, etc.), Angel investors with social enterprise focus, Foundations with PRIs (Program Related Investments), Revenue-based financing for social enterprises. Build prospect list in HQ CRM.",
                    deliverable: "Database of 30 impact investment prospects",
                    hqTools: ["HQ CRM", "HQ Research Templates"],
                    kpi: "30 prospects with clear investment thesis alignment",
                    detailedSteps: [
                        "Types of impact capital: Grants: Non-dilutive, for specific programs or capacity building, Impact loans: CDFI loans at below-market rates, PRIs from foundations, Revenue-based financing: Repay as % of revenue (great for growing social enterprises), Equity: Impact angel investors, venture philanthropy funds, Convertible notes: Hybrid instruments common in early-stage social enterprise",
                        "Research sources: ImpactBase.net (impact fund database), GIIN (Global Impact Investing Network) investor directory, CDFI Fund (government CDFI directory), Social Venture Circle, Local CDFI or community development bank",
                        "For each investor, document: Investment thesis (what sectors/issues do they fund?), Geographic focus, Investment size range, Stage preference (seed, growth), Expected return profile (some accept below-market), Application process",
                        "Prioritize: Tier 1 = Perfect mission + geography + stage alignment, Tier 2 = Good fit, need more research, Tier 3 = Long-term cultivation",
                        "Track all in HQ CRM with notes on each"
                    ]
                },
                {
                    title: "Create Your Impact Investment Pitch Deck",
                    description: "Build investor pitch that proves both commercial viability and social impact.",
                    action: "Develop impact investor pitch deck: Theory of Change, Market opportunity, Revenue model and traction, Impact metrics and measurement, Management team, Use of funds, Social and financial return projections. Impact investors evaluate BOTH impact credibility and business viability. You must nail both.",
                    deliverable: "Professional impact investment pitch deck",
                    hqTools: ["HQ Presentation Tools", "HQ Files"],
                    kpi: "Pitch that converts 20%+ of qualified investor conversations to due diligence",
                    detailedSteps: [
                        "Deck structure (10-12 slides): 1. Cover: Company name, tagline, dual-bottom-line promise, 2. Problem: Commercial problem you solve + social problem you address, 3. Solution: Product/service and how it creates impact, 4. Theory of Change: How your business model generates social outcomes, 5. Market: Size of commercial opportunity + scale of social need, 6. Traction: Revenue, customers, impact metrics to date, 7. Business Model: Revenue streams, unit economics, sustainability path, 8. Impact Metrics: How you measure social return, current baseline, targets, 9. Team: Relevant commercial AND mission experience, 10. Financials: 3-year projections (revenue + impact), 11. Funding Ask: How much, type of capital, use of funds, 12. Expected Returns: Financial return + social return",
                        "Common impact investor questions to address: How do you prevent mission drift as you scale? What happens to impact if you need to cut costs? How do you measure and verify impact? What's your exit strategy (and does it protect the mission)?",
                        "Include SROI (Social Return on Investment) calculation if possible: For every $1 invested, $X of social value created",
                        "Certifications add credibility: B-Corp certification, Fair Trade, Living Wage certified, CDFI borrower history",
                        "Save deck to HQ Files, have multiple versions: Full deck (15-20 min), 5-slide teaser, 1-pager executive summary"
                    ]
                },
                {
                    title: "Pursue CDFIs and Mission-Aligned Loans",
                    description: "Access below-market rate financing designed for social enterprises.",
                    action: "Apply to 2-3 CDFIs or mission-aligned lenders in your area. CDFIs offer business loans at favorable rates to underserved communities and social enterprises. Requirements typically include: 6+ months in operation, Some revenue history, Clear social mission, Community benefit demonstration. Use HQ to organize application materials.",
                    deliverable: "CDFI applications submitted",
                    hqTools: ["HQ Files for document organization", "HQ Calendar for deadlines"],
                    kpi: "1 CDFI loan or line of credit secured",
                    detailedSteps: [
                        "Find your local CDFI: CDFI Fund locator (cdfifund.gov), Community development banks, Credit unions with social mission, State-specific revolving loan funds",
                        "Common CDFI programs: Microloan program: $5K-50K for small social enterprises, Business loans: $50K-500K with below-market rates, Technical assistance: Often paired with funding, Guarantee programs: CDFI guarantees conventional bank loan",
                        "Application requirements: Business plan (your HQ strategic documents), Financial projections, Tax returns and financial statements, Personal financial statement of owners, Description of social mission and community benefit, References from community organizations",
                        "Strengthen application: Letters of support from community partners, Evidence of community benefit (impact metrics), Contracts or committed revenue",
                        "Timeline: Most CDFI applications take 30-90 days, Apply to multiple simultaneously",
                        "Technical assistance: Many CDFIs offer free business coaching alongside funding, Take advantage of this resource",
                        "Track applications in HQ: Organization, amount, deadline, status, next steps"
                    ]
                },
                {
                    title: "Launch Community Investment Campaign",
                    description: "Raise mission-aligned capital directly from your community.",
                    action: "Consider community investment through: Regulation Crowdfunding (Reg CF) on Wefunder or Republic, Revenue sharing notes with community investors, Cooperative investment model. These engage your customer base as investors, deepening mission alignment. Create investment offering and campaign page.",
                    deliverable: "Community investment campaign launched or planned",
                    hqTools: ["HQ Landing Pages", "HQ Email Campaigns", "HQ CRM"],
                    kpi: "Community investment round raising $25K-250K from mission-aligned investors",
                    detailedSteps: [
                        "Regulation Crowdfunding (Reg CF): Allows raising up to $5M from anyone (not just accredited investors), Use platforms: Wefunder, Republic, Honeycomb Credit, Best for: Consumer brands with engaged mission community, Timeline: 3-6 months to prepare and run, Cost: Platform fees (typically 5-7%) + legal setup ($5-15K)",
                        "Revenue-based financing from community: Offer notes to supporters that repay as % of revenue, Legal structure: Work with attorney, Great for: Cash flow positive social enterprises needing growth capital",
                        "Cooperative model: Customers or workers become co-owners, Aligns interests perfectly, Complex legal structure but powerful for mission alignment",
                        "Pre-campaign preparation: Build email list of interested investors (your mission-aligned customers are perfect candidates), Warm up with impact content and milestones, Create investment narrative: 'You can now own a piece of the mission'",
                        "Campaign execution: Email to mission-aligned customers and supporters, Social media campaign, Existing investor networks and social enterprise communities, Media outreach (social enterprise funding is newsworthy)",
                        "During campaign: Regular updates on funding progress, Impact milestones, Investor Q&A sessions",
                        "Work with attorney before launching any investment campaign"
                    ]
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Supply Chain & Operations for Impact",
            weekDescription: "Build an operations model that embeds impact into every stage of the business.",
            icon: Handshake,
            dailyTime: "45-90 minutes",
            weeklyGoal: "Impact supply chain documented; 2+ mission-aligned partnerships secured",
            tasks: [
                {
                    title: "Audit and Design Your Impact Supply Chain",
                    description: "Ensure your supply chain creates, not undermines, your social mission.",
                    action: "Map your entire supply chain. For each supplier and partner, assess: Labor practices (living wage? safe conditions?), Environmental impact, Community benefit, Alignment with your mission. Set targets: X% local suppliers, X% from social enterprises or underserved businesses. This becomes a key selling point and differentiator.",
                    deliverable: "Supply chain impact audit with improvement targets",
                    hqTools: ["HQ Files", "HQ Strategy Tools"],
                    kpi: "50%+ of suppliers meeting impact criteria",
                    detailedSteps: [
                        "Map all inputs: Raw materials, Components, Services (marketing, legal, accounting, etc.), Distribution and logistics",
                        "For each supplier, assess: Do they pay living wages? Are working conditions safe and dignified? What is their environmental footprint? Are they locally owned or from underserved communities? Do they share your values?",
                        "Prioritize local procurement: Local suppliers reduce carbon footprint, Support local economy, Stronger relationships and reliability, Great marketing story for mission-aligned buyers",
                        "Social enterprise suppliers: Source from other social enterprises when possible, Creates ecosystem of impact, Often can be highlighted in marketing ('Our packaging is made by X social enterprise')",
                        "Set improvement targets: Year 1: Audit all suppliers, replace worst actors, Year 2: 50% local, Year 3: 75% mission-aligned suppliers",
                        "Create supplier code of conduct aligned with your mission",
                        "Document supply chain story for marketing: 'Every ingredient in our product was sourced from...'",
                        "Consider supply chain certification: Fair Trade, B-Corp supply chain assessment, Local Living Economy Network"
                    ]
                },
                {
                    title: "Build Mission-Aligned Partnership Ecosystem",
                    description: "Create partnerships that amplify both commercial reach and social impact.",
                    action: "Identify and approach 10 strategic partners: Community organizations (provide access to beneficiaries), Corporate partners (CSR alignment and revenue), Mission-aligned media (earned coverage), Peer social enterprises (referrals and collaboration), Impact investors and advisors. Each partnership should serve both commercial and mission goals.",
                    deliverable: "5+ signed partnership agreements",
                    hqTools: ["HQ CRM", "HQ Email Templates", "HQ Proposals"],
                    kpi: "5 partnerships generating both revenue and impact",
                    detailedSteps: [
                        "Partnership types: Referral partners: Organizations whose community needs your product, Revenue-share for referrals, Distribution partners: Retailers, platforms, or marketplaces that sell your product, Impact partners: Nonprofits or community organizations you work with to deliver social outcomes, Media partners: Publications or platforms covering social enterprise (earned or paid content), Corporate partners: Companies that buy your product for CSR goals or co-brand with you",
                        "Approach strategy: Research alignment first (mission + audience match?), Personal introduction or warm referral when possible, Lead with what's in it for them (commercial and mission benefit), Propose pilot before long-term commitment",
                        "Partnership agreement elements: Roles and responsibilities, Revenue or impact sharing terms, Marketing commitments (how you'll promote each other), Data sharing (for impact measurement), Exit terms",
                        "Track pipeline in HQ CRM: Partner prospect → Outreach → Conversation → Proposal → Signed → Active",
                        "Monthly partnership reviews: Is it generating expected revenue AND impact? Adjust or end partnerships not meeting both criteria"
                    ]
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Impact Measurement & Reporting System",
            weekDescription: "Build the data infrastructure that proves your impact to customers, investors, and media.",
            icon: BarChart,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Impact measurement system operational; first impact report drafted",
            tasks: [
                {
                    title: "Build Real-Time Impact Dashboard",
                    description: "Create a live dashboard showing financial and social performance.",
                    action: "Use HQ to create a dashboard tracking: Revenue (commercial performance), Impact metrics (social performance), Cost per impact unit (efficiency), Geographic reach, Story count (qualitative). Make key metrics public on your website (impact counter). Internal dashboard shows full detail. This is your accountability system.",
                    deliverable: "Internal impact dashboard + public impact counter on website",
                    hqTools: ["HQ Analytics", "HQ Reporting", "HQ Website Builder"],
                    kpi: "Real-time tracking of financial and social KPIs",
                    detailedSteps: [
                        "Internal dashboard metrics: Revenue and profit margin, Number of customers (and retention rate), Impact metrics (people served, jobs created, etc.), Impact per dollar spent, Geographic distribution of impact, Supplier impact metrics",
                        "Public-facing impact counter: Select 2-3 headline metrics (most compelling and verifiable), Auto-update as sales occur: 'X cups of clean water provided', 'X living-wage hours paid', 'X meals provided', Show running total and current year total",
                        "Quarterly Impact Report: Executive summary (key numbers), Financial performance, Social performance, Stories from beneficiaries (with consent), Challenges and what you learned, Goals for next quarter",
                        "Annual Impact Report: Full year review, Audited financials (if available), Third-party impact verification, B-Corp assessment results (if applicable), Letter from CEO on mission progress",
                        "Set up HQ automations: When sale occurs → update impact counter, When impact milestone hit → trigger social media celebration post",
                        "Data collection: Ensure you have processes to collect impact data at every program touchpoint"
                    ]
                },
                {
                    title: "Implement Ethical Storytelling System",
                    description: "Systematically collect and share impact stories with dignity.",
                    action: "Build process for collecting beneficiary stories with proper consent. Create story bank in HQ. Establish story review process (check dignity, consent, accuracy). Train team on ethical storytelling principles. Release 2 impact stories per month across channels. Stories are your most powerful marketing AND accountability tool.",
                    deliverable: "Story collection system with library of 10+ impact stories",
                    hqTools: ["HQ Forms for consent and story intake", "HQ Files", "HQ Content Scheduler"],
                    kpi: "20 impact stories collected quarterly; consistent 2/month publishing",
                    detailedSteps: [
                        "Consent process: Written release form explaining how story will be used, Option for anonymity or name change, Right to retract story at any time, Benefit to storyteller (no exploitation), Compensation if appropriate",
                        "Story collection interview questions: What was your situation before working with us / before accessing the program? What changed and how? What does this mean for your future? Is there anything you want people to know about your experience?",
                        "Ethical storytelling guidelines: Never show suffering or poverty for marketing effect, Center the storyteller's dignity and agency, Avoid 'savior' narrative (they are the hero, you are the enabler), Show complexity, not just success stories, Get multiple reviews before publishing",
                        "Story formats: Written narrative (500-1000 words), Video testimonial (2-3 minutes), Pull quotes for social media, Infographic of key metrics from their story",
                        "Story bank in HQ Files: Organized by program, outcome type, demographic, Update quarterly with new stories"
                    ]
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "B-Corp Certification & Credentials",
            weekDescription: "Pursue certifications that build credibility and open new markets.",
            icon: Award,
            dailyTime: "45-60 minutes",
            weeklyGoal: "B-Corp assessment started; 2+ certifications identified and applied for",
            tasks: [
                {
                    title: "Pursue B-Corp Certification",
                    description: "Pursue B-Corp or equivalent certification to validate social mission.",
                    action: "Complete the B Impact Assessment (free online tool). Score 80+ points to qualify for B-Corp certification. The assessment covers: Workers, Community, Environment, Customers, Governance. Even if you don't pursue certification immediately, the assessment reveals gaps in your impact practices. B-Corp status unlocks premium markets and investor credibility.",
                    deliverable: "B Impact Assessment completed; certification plan created",
                    hqTools: ["HQ Files", "HQ Project Management"],
                    kpi: "B Impact Assessment score 80+ (qualifying for B-Corp)",
                    detailedSteps: [
                        "Take free B Impact Assessment at bcorporation.net/b-impact-assessment",
                        "Assessment categories: Workers (25 pts): Employee compensation, benefits, job quality, Community (25 pts): Local economic impact, diversity, charitable giving, Environment (25 pts): Carbon footprint, resource use, environmental management, Customers (25 pts): Product impact, customer privacy, Governance (10 pts): Mission lock, transparency, accountability",
                        "Score analysis: 80+ = Eligible for B-Corp certification, 60-79 = Good foundation, needs work in specific areas, Below 60 = Significant gaps in impact practices",
                        "Improvement roadmap: For each low-scoring area, create 90-day improvement plan, Prioritize changes with biggest impact on score AND your mission",
                        "B-Corp certification process: Apply after scoring 80+, Pay certification fee (based on revenue), Provide documentation supporting your score, Third-party verification visit, Certification (valid 3 years, then reassess)",
                        "Benefits of B-Corp: Premium market access (retailers, corporate buyers require it), Media credibility and coverage, Investor signal, Employee recruitment (mission-driven talent seeks B-Corps), Peer network and resources",
                        "Alternative certifications if B-Corp not yet feasible: Fair Trade (if applicable to your products), Living Wage certified, 1% for the Planet (donate 1% of revenue to environmental causes), LEED certification (if you have a facility)"
                    ]
                },
                {
                    title: "Apply for Social Enterprise Recognition Programs",
                    description: "Build credibility through awards, grants, and recognition programs.",
                    action: "Research and apply for: Social enterprise grants, Business awards programs, Media recognition (Forbes Social Entrepreneurs, Fast Company Innovation), Regional social enterprise networks. Recognition creates earned media, validates impact, and opens partnership opportunities. Create an application pipeline in HQ.",
                    deliverable: "5 grant/award applications submitted",
                    hqTools: ["HQ CRM for tracking", "HQ Calendar", "HQ Files"],
                    kpi: "3+ recognitions, grants, or awards in Year 1",
                    detailedSteps: [
                        "Grant sources: Small Business Administration (SBA) programs for social enterprises, USDA rural business grants (if applicable), State and local government social enterprise grants, Foundation grants for capacity building, Corporate foundation grants aligned with your mission",
                        "Award programs: Ashoka Fellow, Social Venture Network, Inc. Social 500, Fast Company Innovation by Design, B The Change magazine, Your local business journal's social impact awards",
                        "Media recognition: Reach out to journalists covering social enterprise (Fast Company, Forbes, Inc.), Local business media loves social enterprise stories, Submit to industry publications in your sector",
                        "Networks to join: Social Enterprise Alliance, Social Venture Circle, Local B-Corp community, 1% for the Planet (if you join), Mission-aligned industry associations",
                        "Track in HQ: Grant/award name, Organization, Deadline, Requirements, Status, Amount (if applicable)",
                        "Content library for applications: Pull from your existing impact report and stories, Standardize organizational description, mission, impact metrics, Team bios"
                    ]
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Digital Marketing for Social Enterprise",
            weekDescription: "Scale your reach through digital channels that attract mission-aligned customers.",
            icon: Globe,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Digital marketing system live; online sales growing 20%+ month-over-month",
            tasks: [
                {
                    title: "Launch Mission-Led Email Marketing System",
                    description: "Build email list and sequences that nurture mission-aligned buyers.",
                    action: "Create 3 email sequences: Welcome series (brand story + impact), Impact update series (monthly impact report format), Conversion series (product offers with impact angle). Use HQ Email Automation. Your email list is your most direct channel to mission-aligned customers who want to stay connected to the impact.",
                    deliverable: "Automated email sequences live with 1,000+ subscribers",
                    hqTools: ["HQ Email Automation", "HQ Landing Pages", "HQ CRM"],
                    kpi: "35%+ open rate; 3%+ click rate; 5%+ conversion to purchase",
                    detailedSteps: [
                        "Welcome series (5 emails over 2 weeks): Email 1 (Day 1): Welcome + founding story + immediate impact of their purchase/subscription, Email 2 (Day 3): Behind-the-scenes look at your mission in action, Email 3 (Day 7): Beneficiary story (with permission), Email 4 (Day 10): Your product/service deepdive with impact per unit, Email 5 (Day 14): Community invitation + next step CTA",
                        "Monthly impact update: Start with 1 headline impact metric (X people served this month), Feature one beneficiary story, Show progress toward annual impact goals, Include a product offer tied to creating more impact",
                        "Conversion series: For subscribers who haven't purchased: Email 1: 'What your purchase enables' (impact story), Email 2: Social proof (customer testimonials + impact), Email 3: Offer with specific impact: 'Your purchase today will [specific outcome]'",
                        "Lead magnet for list building: Impact report PDF, 'How to choose a social enterprise' guide, Exclusive behind-the-scenes video",
                        "Track in HQ: Open rates by sequence, Click rates, Purchase conversion, Revenue per email sent"
                    ]
                },
                {
                    title: "Run Impact-First Paid Advertising",
                    description: "Use paid ads to attract mission-aligned customers at scale.",
                    action: "Launch 3 paid ad campaigns: Awareness (impact story video - cold audience), Conversion (product + impact for warm audience), Retargeting (for website visitors who didn't purchase). Mission-aligned messaging often outperforms pure product messaging for your audience. Start with $20-30/day, scale winners.",
                    deliverable: "Profitable paid ad campaigns running",
                    hqTools: ["HQ Ad Analytics", "HQ Pixel Tracking"],
                    kpi: "3:1 ROAS minimum; acquire 100+ new mission-aligned customers",
                    detailedSteps: [
                        "Ad strategy: Campaign 1 - Awareness: Impact story video (60-90 sec), Show the social problem and your solution, Don't ask for sale yet, CTA: 'Learn more', Target: Broad audience with interest in social impact, sustainability, causes related to your mission",
                        "Campaign 2 - Conversion: Product + impact dual message: '[Product benefit] + [Impact created]', Direct CTA to purchase, Target: Lookalike of existing mission-aligned customers, Retarget video viewers from Campaign 1",
                        "Campaign 3 - Retargeting: 'You showed interest, here's what your purchase enables', Dynamic product ads with impact overlay, CTA: 'Complete your purchase and create impact', Target: Website visitors who didn't purchase",
                        "Creative best practices for social enterprise: Authentic imagery (not stock photos), Real beneficiary faces (with consent), Impact statistics in ad copy, Mission-aligned language, Avoid 'poverty porn' or exploitation",
                        "Channels: Facebook/Instagram (best for consumer mission-aligned buyers), LinkedIn (best for B2B and corporate CSR buyers), Google (for people searching impact-related keywords)",
                        "Track in HQ: Cost per acquisition, ROAS by campaign, Customer lifetime value from paid vs organic, Impact per customer acquired through ads"
                    ]
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Scaling Impact Through Earned Revenue",
            weekDescription: "Develop earned income streams that fund both growth and mission.",
            icon: TrendingUp,
            dailyTime: "45-90 minutes",
            weeklyGoal: "New revenue stream launched; consulting or training generating $5K+",
            tasks: [
                {
                    title: "Launch Social Enterprise Consulting or Training",
                    description: "Monetize your expertise by training others to create impact.",
                    action: "Create a consulting or training offer for: Other social enterprises wanting to scale, Companies wanting to develop social enterprise programs, Governments or foundations wanting to support social enterprise ecosystem. Your lived experience building a social enterprise is valuable expertise. Charge premium for this knowledge.",
                    deliverable: "Consulting/training service launched with 3+ paying clients",
                    hqTools: ["HQ Course Builder", "HQ Booking", "HQ Payment Processing"],
                    kpi: "3 consulting clients; $5K-15K/month consulting revenue",
                    detailedSteps: [
                        "Identify your expertise: What have you mastered in building your social enterprise? Where do others struggle? What would you teach a new social entrepreneur?",
                        "Service options: Consulting: 1:1 advising for social enterprises ($150-500/hour), Group program: Cohort of 5-10 social enterprises, 8-12 week program ($2K-5K/participant), Workshop: Half or full day training ($500-2000/person), Speaking: Conferences and corporate events ($1K-10K/talk), Online course: Scale your knowledge without time constraint ($200-1000)",
                        "Positioning: 'Learn from a practitioner, not a theorist', Your B-Corp score, impact metrics, and certifications prove credibility, Case studies from your own business",
                        "Target markets: Social Enterprise Support Organizations (SESOs), Business schools with social enterprise programs, Corporate CSR teams wanting to start social enterprise, Government economic development agencies, Foundations supporting social enterprise",
                        "Set up in HQ: Booking calendar for discovery calls, Payment processing for services, Course materials if creating digital product",
                        "Launch: Speak at one local event (position as expert), Write one thought leadership article, Offer free discovery session to first 5 potential clients"
                    ]
                },
                {
                    title: "Develop Corporate Social Enterprise Partnership Program",
                    description: "Create a premium corporate partnership that embeds your impact into their operations.",
                    action: "Design a high-value corporate partnership package: Companies pay premium to embed your social enterprise into their supply chain, HR benefits, or CSR programs. Package includes: Product procurement, Employee engagement, Impact reporting, Co-branding rights. Price: $10K-50K+ annual agreements. Target 3 corporate partners.",
                    deliverable: "Corporate partnership package; 1+ signed corporate agreement",
                    hqTools: ["HQ CRM", "HQ Proposal Generator", "HQ Contracts"],
                    kpi: "1 corporate partner; $25K+ annual contract",
                    detailedSteps: [
                        "Package elements: Preferred supplier status: Company commits to procuring X from you annually, Employee engagement program: Facility tours, volunteer days with mission, product gifts for employees, Impact reporting: Quarterly report on what their procurement achieved, Co-branding: 'Proud partner of [Your Social Enterprise]' in their marketing, Thought leadership: Their CSR team can speak at your events",
                        "Pricing model: Base annual commitment ($10K-50K depending on company size), Procurement guarantee (they buy X in products), Optional add-ons: Employee engagement events, speaking engagements",
                        "Target companies: Mid-size companies (100-2000 employees) with clear CSR mandate, Companies whose mission aligns with yours, Companies wanting diverse supplier credentials, Companies with employee engagement programs",
                        "Pitch strategy: Lead with impact they can claim (great for ESG reporting), Show employee engagement ROI (engaged employees = less turnover), Highlight brand differentiation vs competitors, Provide reference from other corporate partners (if you have them)",
                        "Contract essentials: Minimum annual commitment, What you'll deliver, Impact reporting obligations, Co-branding usage rights, Renewal terms",
                        "Track in HQ CRM: All corporate prospect conversations and proposal status"
                    ]
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Team Building for Dual Mission",
            weekDescription: "Build a team that is competent in both commercial delivery and mission execution.",
            icon: Users,
            dailyTime: "30-45 minutes",
            weeklyGoal: "Hiring plan complete; 1+ mission-aligned hire made",
            tasks: [
                {
                    title: "Define Mission-Aligned Roles and Culture",
                    description: "Build team structure that delivers commercial excellence AND social impact.",
                    action: "Define roles needed for both commercial and mission execution. Create job descriptions that require both commercial competence AND genuine mission alignment. Develop interview process that tests both. Build culture that prevents mission drift without sacrificing business performance. Document your dual culture code.",
                    deliverable: "Team structure plan, culture code, and hiring process",
                    hqTools: ["HQ HR Tools", "HQ Files", "HQ Onboarding"],
                    kpi: "Team of mission-aligned, commercially capable people",
                    detailedSteps: [
                        "Org chart for social enterprise: Need roles that span both missions: CEO/Founder: Holds dual mission, raises investment, external spokesperson, Operations: Must understand both product delivery AND impact program delivery, Sales/Marketing: Commercial mindset WITH authentic mission storytelling ability, Impact Measurement: Data collection, reporting, storytelling, Finance: Managing both commercial P&L AND impact program budgets",
                        "Culture code principles: Mission comes first - commercial decisions serve the mission, Authenticity - no impact washing, we mean everything we say, Transparency - honest reporting on both successes and failures, Both/And thinking - quality AND impact are not trade-offs",
                        "Hiring process: Screen for: Commercial skills (can they do the job?), Mission authenticity (do they genuinely care?), Values alignment (do their personal values match ours?), Red flags: Views mission as marketing tactic, Burnout from previous mission-driven work (needs sustainability)",
                        "Interview questions for mission alignment: Why does our specific mission matter to you? Tell me about a time you made a decision that prioritized ethics over profit. What do you think we could do better to serve our mission? How would you handle pressure to cut corners on impact?",
                        "Onboarding: Day 1: Mission immersion (meet beneficiaries, understand the impact), Week 1: Commercial systems training, Month 1: Independent contribution to both commercial and mission work",
                        "Compensation: Pay fairly (living wage minimum), Align incentives with both commercial and impact goals, Be transparent about compensation across team"
                    ]
                },
                {
                    title: "Build Your Impact Advisory Board",
                    description: "Recruit advisors with expertise in both social impact and commercial growth.",
                    action: "Create an advisory board with: 1 impact investment expert, 1 commercial growth/scaling expert, 1 domain expert in your mission area (e.g., education, environment), 1 community representative who understands beneficiary needs, 1 corporate partnerships expert. Advisors provide credibility, open doors, and prevent mission drift.",
                    deliverable: "Advisory board of 4-6 experts recruited",
                    hqTools: ["HQ CRM for tracking", "HQ Files for agreements"],
                    kpi: "Advisory board active with quarterly meetings",
                    detailedSteps: [
                        "Advisor profiles needed: Impact investor: Can help you raise mission-aligned capital, knows the ecosystem, Social enterprise operator: Has scaled a social enterprise, Commercial growth expert: Has scaled a commercial business, knows marketing/sales, Mission domain expert: Deep knowledge of the social issue you're addressing, Community representative: Ensures you stay accountable to the people you serve",
                        "Recruitment: Identify through: Impact investing community, B-Corp network, Social Enterprise Alliance, Local business schools with social enterprise programs, Your existing investor or mentor network",
                        "Advisor agreement: Time commitment (typically 2-5 hours/month), Compensation: Equity (0.1-0.5%), cash ($500-1000/quarter), or pro bono if truly mission-aligned, What you offer: Access to your network, impact story, learning experience, Confidentiality and conflict of interest provisions",
                        "Effective advisory relationships: Come to each meeting with specific asks, Share both wins and challenges honestly, Make it easy to help you (prep materials, clear questions), Respect their time, act on their advice, Report back on outcomes",
                        "Use advisors for: Opening doors to investors and partners, Pressure-testing your impact claims, Navigating complex mission/revenue trade-offs, Media and thought leadership opportunities"
                    ]
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Media, PR & Thought Leadership",
            weekDescription: "Build public profile that positions you as a leader in social enterprise.",
            icon: MessageSquare,
            dailyTime: "45-60 minutes",
            weeklyGoal: "3 media placements; thought leadership piece published; speaking gig booked",
            tasks: [
                {
                    title: "Execute Social Enterprise PR Campaign",
                    description: "Generate earned media that attracts customers, investors, and partners.",
                    action: "Pitch your story to: Social enterprise media (SSIR, Stanford Social Innovation Review, B The Change), Business media (Inc., Fast Company, Forbes), Local business media, Industry publications for your mission area. Your story hook: Proof that doing good and doing well are not trade-offs. Use your impact data and business growth as proof.",
                    deliverable: "3+ media placements in 90 days",
                    hqTools: ["HQ Files for media kit", "HQ Email for pitching"],
                    kpi: "3 media placements driving 500+ website visitors each",
                    detailedSteps: [
                        "Create media kit in HQ Files: Executive bio and headshot, Company overview (1 page), Impact metrics and milestones, High-res product photos, Beneficiary photos (with consent), B-Corp logo and other certification badges, Press releases for key milestones",
                        "Story angles that work for social enterprise: 'How I built a profitable business with social impact baked in' (founder story), '[X metric] impact achieved alongside [Y revenue milestone]' (data story), 'The business case for paying living wages / sourcing locally' (thought leadership), Beneficiary transformation story (with consent), 'Lessons from my B-Corp certification process' (credibility)",
                        "Target publications: National: Fast Company Impact, Inc. Business Owners, Forbes Impact Investing, Stanford Social Innovation Review, Local: Business journal, local news, community publications, Industry: Publications covering your mission area",
                        "Pitch structure: Subject: '[Your story hook]', Paragraph 1: The story and why it matters now, Paragraph 2: What you can offer (exclusive interview, data, beneficiary access), Paragraph 3: Your credentials (B-Corp, impact metrics, revenue), Brief bio, Link to media kit",
                        "Follow up once after 1 week, then move on",
                        "Track: Pitches sent, responses, placements, traffic and conversions from each placement"
                    ]
                },
                {
                    title: "Build Thought Leadership Platform",
                    description: "Establish yourself as an expert voice on social enterprise.",
                    action: "Create consistent thought leadership through: LinkedIn articles (2/month) on social enterprise insights, Speaking applications to social enterprise conferences, Guest posts on aligned platforms, Podcast appearances on social enterprise/social impact shows. Your expertise in running a dual-bottom-line business is valuable and rare.",
                    deliverable: "Consistent thought leadership presence; 2 speaking invitations",
                    hqTools: ["HQ Content Scheduler", "HQ Social Scheduler"],
                    kpi: "2,000+ LinkedIn followers; 2 conference speaking invitations",
                    detailedSteps: [
                        "LinkedIn thought leadership strategy: Post 3x per week (personal insights, not just company updates), Article 2x per month: Deeper takes on social enterprise topics, Engage with: B-Corp community, impact investing community, social enterprise professionals, Topics that work: Lessons from building dual-bottom-line, Behind-the-scenes of B-Corp certification, Impact measurement challenges and solutions, Why your company chose mission over short-term profit (specific example)",
                        "Speaking strategy: Target: Social Enterprise Alliance events, B-Corp community events, Business school social enterprise programs, Impact investing conferences, Local business events, Regional TEDx events",
                        "Talk topics: 'The Business Case for Social Enterprise' (data-driven), 'How We Measure What Matters (Not Just Money)', 'The Truth About B-Corp: What It's Really Like', 'Building a Supply Chain That Creates Impact'",
                        "Podcast appearances: Research: Social enterprise, impact investing, sustainable business podcasts, Pitch: Your story + what listeners will learn + your credentials, Prepare: 3 key messages you want to communicate",
                        "Book/report: If you have enough insights, consider self-publishing an impact report or short book on your social enterprise model"
                    ]
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Scale Planning & Next 90 Days",
            weekDescription: "Review 90-day results, strengthen the model, and plan for sustainable growth.",
            icon: Sparkles,
            dailyTime: "60-90 minutes",
            weeklyGoal: "90-day review complete; Year 2 plan finalized; scaling strategy documented",
            tasks: [
                {
                    title: "Conduct Dual-Bottom-Line 90-Day Review",
                    description: "Evaluate both commercial and social performance over the quarter.",
                    action: "Comprehensive review of Days 1-90: Commercial metrics (revenue, customers, margins), Social impact metrics (impact units delivered, beneficiaries served, mission advancement), Investment activity (capital raised, investor relationships), Partnership development, Thought leadership and media. Score yourself on both dimensions. Identify trade-offs you made and whether they were justified.",
                    deliverable: "90-day dual-bottom-line impact report",
                    hqTools: ["HQ Analytics", "HQ Reporting"],
                    kpi: "Clear view of both commercial and social ROI",
                    detailedSteps: [
                        "Commercial review: Revenue vs target, Customer acquisition cost, Customer lifetime value, Gross margin, Monthly recurring revenue (if applicable), Cash position and runway",
                        "Social impact review: Impact metrics vs 90-day targets, Number of beneficiaries served, Mission advancement (qualitative assessment), Supply chain impact improvements, Community investment %, Partner and stakeholder satisfaction",
                        "Investment review: Capital raised, Investor relationships developed, CDFI applications and outcomes, Grant applications and awards, Community investment progress",
                        "Key learnings: Where did commercial and mission align perfectly? (Double down here), Where did they create tension? (How did you navigate it? What would you do differently?), What surprised you about the dual-bottom-line model?",
                        "Team and culture: Is your team living the mission? Is culture healthy? Are you preventing burnout (common in mission-driven orgs)?",
                        "Mission drift assessment: Are you compromising impact for profit in any area? Be honest - course correct now if so"
                    ]
                },
                {
                    title: "Design Year 2 Scale Strategy",
                    description: "Plan your next phase of growth with clear commercial and impact goals.",
                    action: "Set Year 2 targets: Revenue (2-5x Year 1), Impact (proportional scale), Geographic expansion, New revenue streams, Investment targets. Create quarterly milestones. Identify key risks to both commercial and mission goals. Plan for scale without mission drift. Decide: What can you scale? What must stay artisanal/local to preserve impact?",
                    deliverable: "Year 2 dual-bottom-line strategic plan",
                    hqTools: ["HQ Project Management", "HQ Goal Tracking", "HQ Files"],
                    kpi: "Clear roadmap with quarterly commercial and impact milestones",
                    detailedSteps: [
                        "Set Year 2 commercial targets: Revenue target, Number of customers, New markets or geographies, New products or services, Team size needed",
                        "Set Year 2 impact targets: Beneficiaries served (scale proportionally with revenue), Impact metrics targets (each one), New impact programs if applicable, B-Corp recertification or score improvement",
                        "Identify key growth strategies: Option 1: Geographic expansion (bring model to new market), Option 2: New product lines (expand impact surface area), Option 3: B2B scale (corporate partnerships and procurement), Option 4: Licensing or franchising the model, Option 5: Impact investment to fund faster scaling",
                        "Mission drift prevention plan: As you scale, document: Which parts of the model cannot change (non-negotiables), Which parts can adapt for efficiency, How you'll verify impact at scale, Board/advisory oversight of mission integrity",
                        "Funding strategy for Year 2: How much capital do you need to hit Year 2 goals?, Mix of: Commercial revenue, Impact investment, Grants for innovation/new programs, Revenue-based financing",
                        "Celebrate and acknowledge: Share 90-day impact report with all stakeholders, Thank team, customers, investors, beneficiaries, Celebrate that you are proving business can do both"
                    ]
                }
            ]
        }
    ],

    kpiChecklist: [
        { metric: "Total revenue (90 days)", target: "$50K-100K" },
        { metric: "Number of customers", target: "200-500" },
        { metric: "Monthly recurring revenue", target: "$5K-15K/month" },
        { metric: "Customer retention rate", target: "70-80%" },
        { metric: "B2B corporate clients", target: "3-5" },
        { metric: "Impact investment raised", target: "$25K-250K" },
        { metric: "Social impact units", target: "500+ (varies by mission)" },
        { metric: "B-Corp score", target: "80+" },
        { metric: "Mission-aligned suppliers", target: "50%+" },
        { metric: "Media placements", target: "5-10" },
        { metric: "Speaking engagements", target: "3-5" },
        { metric: "Partnership agreements", target: "5+" },
        { metric: "Email list size", target: "2,000+" },
        { metric: "LinkedIn followers", target: "2,000+" },
        { metric: "SROI ratio", target: "$3+ social value per $1 invested" }
    ],

    templates: {
        impactInvestorPitch: "We are [Company], a [B-Corp/social enterprise] that [commercial value proposition] while [specific social mission]. Our dual-bottom-line model generates [revenue metric] in commercial revenue, which enables us to [specific impact outcome - X people/units/change]. We have achieved [impact milestone] and [commercial milestone]. We are raising $[amount] in [type of capital] to [use of funds] which will scale our impact to [target]. Our investors receive [financial return] alongside [social/environmental return]. Will you join us?",

        corporatePartnershipPitch: "Dear [Name], [Company] is a [B-Corp/social enterprise] that provides [product/service] while [social mission]. As a [company with CSR/ESG goals], this partnership would enable you to [specific value: diverse supplier qualification, employee engagement, impact reporting, brand differentiation]. Our corporate partnership includes: [List 3-4 specific benefits]. Your annual investment of $[amount] would create [specific social impact] alongside [commercial value]. I'd love to share how [peer company] has benefited from this partnership. Available for a 15-minute call this week?",

        communityInvestmentCampaign: "We're building [mission] through [business model]. We've proven the model: [commercial metric] in revenue while [impact metric] achieved. Now we're inviting our community to own a piece of the mission. For [investment amount], you'll receive [financial return terms] plus the satisfaction of knowing your investment directly creates [impact]. This is your chance to put your money where your values are. [Link to investment page]"
    }
};