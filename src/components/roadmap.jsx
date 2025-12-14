import { createPageUrl } from "@/utils";

// Helper for consistency
const tools = {
  mission: { name: "Mission & Vision Template", icon: "FileText" },
  values: { name: "Core Values Worksheet", icon: "ListChecks" },
  persona: { name: "Ideal Client Persona", icon: "Users" },
  competitor: { name: "Competitor Analysis Grid", icon: "BarChart3" },
  financial: { name: "Financial Projections", icon: "DollarSign" },
  brand: { name: "Brand Identity Kit", icon: "Palette" },
  content: { name: "Content Calendar", icon: "Calendar" },
  funnel: { name: "Sales Funnel Builder", icon: "Filter" },
  process: { name: "Process Map Template", icon: "GitBranch" },
  sop: { name: "SOP Template", icon: "FileText" },
  audit: { name: "Audit Checklist", icon: "ClipboardCheck" }
};

const vision = {
  title: "Vision Stage", 
  description: "Clarify business vision and build foundation through strategic planning, validation, and essential setup.",
  goals: {
    vision_foundation_combo: {
      title: "Clarify Your Vision & Build Your Foundation",
      description: "90-day journey integrating strategic foundation-building with Quick Wins to define purpose, validate ideas, achieve early victories.",
      months: [
        {
          title: "Month 1: Vision & Validation",
          focus: "Define purpose, validate idea, complete strategic foundation",
          weeks: [
            {
              title: "Define Your Core Vision & Purpose",
              description: "This week is fundamentally about digging deep to uncover the profound 'Why' that drives your business forward. A strong, articulated vision acts as your unwavering north star, guiding every single strategic decision you will make in the future. By defining your mission, vision, and core values now, you are setting a solid, unshakeable foundation for all your future growth. This process prevents you from drifting off course when challenges arise and ensures that your brand communicates a consistent message to the world.",
              whyItMatters: "Without a clear vision, you're often just busy, not truly productive or effective. Your vision aligns your daily actions with your long-term goals, ensuring that every step you take moves you in the right direction.",
              howItStreamlines: "Knowing your 'Why' dramatically speeds up decision-making by providing a clear filter for your choices. You'll know exactly what opportunities to say 'yes' to and, more importantly, which distractions to ignore.",
              howItBuildsRelationships: "Customers don't just buy what you do; they buy 'why' you do it. A clear, authentic purpose resonates emotionally with people, attracting your ideal audience and building lasting loyalty.",
              actionSteps: [
                {
                  title: "Draft Your Mission Statement",
                  description: "Create a concise, powerful statement that clearly defines exactly what you do, who you do it for, and the primary benefit they receive. This statement will serve as your daily operational guide, keeping you focused on your core deliverables.",
                  timeEstimate: "1 Hour",
                  deliverable: "A clear, 1-2 sentence mission statement.",
                  linkTo: "StrategyFormMissionVision",
                  foundationStepId: "mission_vision",
                  detailedSteps: [
                    "Start by deeply reflecting on the specific problem or pain point you solve for your customers.",
                    "Next, clearly identify and describe your primary target audience and who benefits most.",
                    "Articulate the specific value or transformation you provide to this audience.",
                    "Combine these elements into a single, powerful, and grammatical sentence."
                  ],
                  tips: ["Keep it simple and jargon-free.", "Focus strictly on the benefit to the customer."],
                  commonChallenges: ["Trying to include too much detail.", "Being too vague or generic."],
                  successCriteria: ["You can recite it easily from memory.", "It clearly explains your business to a stranger."]
                },
                {
                  title: "Define Your Core Values",
                  description: "Identify 3-5 guiding principles that will fundamentally shape your company culture, hiring decisions, and customer interactions. These values are the non-negotiable rules of the road for how you conduct business.",
                  timeEstimate: "45 Minutes",
                  deliverable: "List of 3-5 core values with brief descriptions.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Brainstorm a long list of values and attributes that are personally important to you.",
                    "Look for patterns in your list and group similar values together under a common theme.",
                    "Select the top 3-5 themes that resonate most deeply and feel essential.",
                    "Write a brief, action-oriented definition for each value."
                  ],
                  tips: ["Choose values that are authentic to you.", "Consider how these values impact daily operations."],
                  commonChallenges: ["Choosing aspirational values that aren't practiced.", "Ignoring values in tough decisions."],
                  successCriteria: ["You can explain why each value matters.", "They help you make difficult choices."]
                }
              ],
              tools: [tools.mission, tools.values],
              resources: ["Quick Lesson: The Power of Why", "Guide: Crafting a Compelling Vision"]
            },
            {
              title: "Identify Your Ideal Client",
              description: "This week you will create a detailed profile of the perfect customer for your business. Understanding exactly who you are serving allows you to tailor your marketing messages so they land with impact. You will dig into their demographics, psychographics, pain points, and deepest desires.",
              whyItMatters: "If you try to market to everyone, you end up appealing to no one. Specificity is the key to conversion and building a loyal tribe.",
              howItStreamlines: "Marketing becomes efficient because you know exactly where your clients hang out and what language they use. You stop wasting money on broad, ineffective advertising.",
              howItBuildsRelationships: "When clients feel understood, they trust you. Speaking directly to their specific pains creates an immediate emotional bond.",
              actionSteps: [
                {
                  title: "Create Your Avatar",
                  description: "Develop a comprehensive persona for your ideal client, giving them a name, age, and backstory.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Completed Ideal Client Profile document.",
                  linkTo: "StrategyFormIdealClient",
                  foundationStepId: "ideal_client",
                  detailedSteps: [
                    "Research your market to understand common traits of potential buyers.",
                    "Fill out the demographic details: Age, location, job title, income.",
                    "Dive into psychographics: What keeps them up at night? What are their dreams?",
                    "Identify the specific trigger events that would cause them to seek your solution."
                  ],
                  tips: ["Be as specific as possible; visualize a real person.", "Focus on their problems, not just your solution."],
                  commonChallenges: ["Making the audience too broad.", "Guessing instead of researching."],
                  successCriteria: ["You can describe a 'day in the life' of your avatar.", "You know their top 3 burning pains."]
                }
              ],
              tools: [tools.persona],
              resources: ["Guide: Finding Your Niche"]
            },
            {
              title: "Analyze Your Competition",
              description: "This week involves a strategic review of the market landscape to understand who else is serving your audience. You aren't copying them; you are learning from their strengths and weaknesses to carve out your unique position. This insight is crucial for differentiation.",
              whyItMatters: "You cannot differentiate if you don't know what you are different from. Market awareness prevents you from launching a 'me-too' product.",
              howItStreamlines: "It prevents you from reinventing the wheel. You can see what pricing models and offers are already working in the market.",
              howItBuildsRelationships: "By filling gaps competitors miss, you become the hero for underserved customers. You solve problems others ignore.",
              actionSteps: [
                {
                  title: "Conduct SWOT Analysis",
                  description: "Perform a Strengths, Weaknesses, Opportunities, and Threats analysis for your business relative to competitors.",
                  timeEstimate: "2 Hours",
                  deliverable: "Completed SWOT Analysis Matrix.",
                  linkTo: "StrategyFormSWOTAnalysis",
                  foundationStepId: "swot",
                  detailedSteps: [
                    "Identify your top 3-5 direct competitors.",
                    "Analyze their websites, reviews, and offers to find their strengths and weaknesses.",
                    "List your own internal strengths and weaknesses objectively.",
                    "Identify external opportunities in the market and potential threats."
                  ],
                  tips: ["Be honest about your weaknesses.", "Look for patterns in negative competitor reviews."],
                  commonChallenges: ["Underestimating competitors.", "Being too biased about your own strengths."],
                  successCriteria: ["You have identified at least 3 opportunities to differentiate.", "You know your unique advantage."]
                }
              ],
              tools: [tools.competitor],
              resources: ["Quick Lesson: Competitive Advantage"]
            },
            {
              title: "Define Your Value Proposition",
              description: "This week brings everything together to articulate exactly why someone should buy from you. You will craft a unique value proposition (UVP) that highlights your specific solution to your avatar's specific problem. This is the core of all your future marketing.",
              whyItMatters: "Your UVP is the hook that grabs attention. Without it, you are just another commodity in a crowded marketplace.",
              howItStreamlines: "It clarifies your messaging across all channels. You won't struggle with what to write on your website or ads.",
              howItBuildsRelationships: "Clear promises build trust. When customers understand exactly what value they get, they feel confident buying.",
              actionSteps: [
                {
                  title: "Draft Your UVP",
                  description: "Create a clear statement that explains your offer, your target market, and your unique benefit.",
                  timeEstimate: "1 Hour",
                  deliverable: "A polished Unique Value Proposition statement.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Review your Mission, Ideal Client, and Competitor analysis.",
                    "Identify the #1 biggest benefit you provide.",
                    "Combine 'Who it's for', 'What it does', and 'Why it's different'.",
                    "Refine into a punchy headline and sub-headline."
                  ],
                  tips: ["Focus on the result, not the process.", "Use customer language, not industry jargon."],
                  commonChallenges: ["Being too clever instead of clear.", "Listing features instead of benefits."],
                  successCriteria: ["A 10-year-old can understand what you sell.", "It instantly differentiates you."]
                }
              ],
              tools: [tools.mission, tools.persona],
              resources: ["Guide: Writing Killer Headlines"]
            }
          ]
        },
        {
          title: "Month 2: Business Structure & Brand", 
          focus: "Establish legal foundation, develop brand identity, create operational systems",
          weeks: [
            {
              title: "Legal & Financial Setup",
              description: "This week is about legitimizing your business. You will choose a business structure, register your name, and set up separate business banking. This separation is critical for liability protection and clean financial tracking.",
              whyItMatters: "Building on shaky legal ground is dangerous. Proper setup protects your personal assets and prepares you for taxes.",
              howItStreamlines: "Separate finances make bookkeeping and tax season infinitely easier. It automates the separation of personal and business funds.",
              howItBuildsRelationships: "Clients trust legitimate businesses. Professional invoicing and contracts signal that you are serious and reliable.",
              actionSteps: [
                {
                  title: "Set Up Business Banking",
                  description: "Open a dedicated business checking account and credit card to separate finances.",
                  timeEstimate: "2 Hours",
                  deliverable: "Active business bank account.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Gather your registration documents (LLC/DBA) and EIN.",
                    "Research banks with low fees and good digital tools.",
                    "Apply for a business checking account.",
                    "Move initial startup capital into the account."
                  ],
                  tips: ["Don't mix personal expenses.", "Look for banks that integrate with accounting software."],
                  commonChallenges: ["Procrastinating due to paperwork.", "Using a personal account 'just for now'."],
                  successCriteria: ["You have a debit card for the business.", "All business expenses now come from this account."]
                }
              ],
              tools: [tools.financial],
              resources: []
            },
            {
              title: "Establish Your Brand Identity",
              description: "This week you define the visual and verbal soul of your business. You will choose your colors, fonts, logo, and brand voice. A cohesive brand makes you look professional and memorable.",
              whyItMatters: "First impressions happen in milliseconds. A messy brand signals a messy business.",
              howItStreamlines: "Decisions on graphics become automatic. You have a style guide to follow for everything.",
              howItBuildsRelationships: "Consistent branding builds familiarity. Familiarity builds trust.",
              actionSteps: [
                {
                  title: "Create Brand Style Guide",
                  description: "Assemble your logo, color palette, and typography rules.",
                  timeEstimate: "3 Hours",
                  deliverable: "Brand Kit PDF.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Choose 3 primary brand colors.",
                    "Select a header font and a body font.",
                    "Design or commission a simple logo.",
                    "Define your brand voice adjectives (e.g., 'Friendly', 'Authoritative')."
                  ],
                  tips: ["Keep it simple.", "Ensure colors have high contrast."],
                  commonChallenges: ["Overthinking the logo.", "Changing colors every week."],
                  successCriteria: ["You have a one-page reference sheet.", "Your social profiles all match."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Set Up Operational Systems",
              description: "This week you build the engine room. You will select your project management tool, file storage, and communication channels. Setting these 'rules of the road' prevents digital clutter and lost files.",
              whyItMatters: "Disorganization costs time and money. Systems scale; chaos does not.",
              howItStreamlines: "You stop looking for lost files. Everyone knows exactly where to work.",
              howItBuildsRelationships: "Fast retrieval of info impresses clients. You never lose their data.",
              actionSteps: [
                {
                  title: "Configure Digital Workspace",
                  description: "Set up your G-Suite/Office 365 and Project Management tool.",
                  timeEstimate: "2 Hours",
                  deliverable: "Organized Digital HQ.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Create a standardized folder structure.",
                    "Set up a dedicated business email address.",
                    "Choose a task manager (Trello, Asana, etc.).",
                    "Create templates for recurring tasks."
                  ],
                  tips: ["Name files consistently.", "Keep the structure shallow."],
                  commonChallenges: ["Creating too many folders.", "Not using the system daily."],
                  successCriteria: ["You can find any file in 30 seconds.", "Your inbox is organized."]
                }
              ],
              tools: [tools.process],
              resources: []
            },
            {
              title: "Define Your Offer Suite",
              description: "This week you clarify exactly what you sell. You will package your expertise into a clear offer with a specific price and deliverable. This moves you from 'hourly work' to 'productized services'.",
              whyItMatters: "Clients need to know what to buy. Packages are easier to sell than vague hourly consulting.",
              howItStreamlines: "Proposal writing vanishes. You sell the same defined scope repeatedly.",
              howItBuildsRelationships: "Clear boundaries prevent scope creep. Clients know exactly what they get.",
              actionSteps: [
                {
                  title: "Structure Your Core Offer",
                  description: "Define the features, benefits, and price of your flagship product.",
                  timeEstimate: "2 Hours",
                  deliverable: "Offer Sheet.",
                  linkTo: "StrategyFormValueLadder",
                  foundationStepId: "value_ladder",
                  detailedSteps: [
                    "List all deliverables included.",
                    "Determine the pricing model (flat fee vs. retainer).",
                    "Write the sales description.",
                    "Create a simple contract or agreement."
                  ],
                  tips: ["Focus on the outcome, not the hours.", "Offer a guarantee if possible."],
                  commonChallenges: ["Underpricing.", "Adding too many custom options."],
                  successCriteria: ["You can state the price confidently.", "The scope is crystal clear."]
                }
              ],
              tools: [tools.content],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Launch & Growth",
          focus: "Launch first offer, get customers, set up systems, plan next 90 days",
          weeks: [
            {
              title: "Build Your Digital Home",
              description: "This week you build your landing page or website. This is your 24/7 salesperson. It needs to clearly communicate your UVP and collect leads.",
              whyItMatters: "You need a place to send traffic. Social media is rented land; a website is yours.",
              howItStreamlines: "It answers FAQs automatically. It filters out unqualified leads.",
              howItBuildsRelationships: "It establishes credibility. A professional site signals you are open for business.",
              actionSteps: [
                {
                  title: "Launch Minimum Viable Website",
                  description: "Publish a simple, high-converting one-page site.",
                  timeEstimate: "4 Hours",
                  deliverable: "Live Website.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Write copy using your UVP and Mission.",
                    "Choose a clean, mobile-responsive template.",
                    "Add professional photos of yourself/product.",
                    "Ensure the contact form works."
                  ],
                  tips: ["Done is better than perfect.", "Check it on your phone."],
                  commonChallenges: ["Writing too much text.", "Broken links."],
                  successCriteria: ["The site is live.", "A stranger can understand what you do in 5 seconds."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Pre-Launch Marketing",
              description: "This week you start building anticipation. You aren't selling yet; you are teasing the solution and building a waitlist. This ensures that when you open the doors, there are people ready to buy.",
              whyItMatters: "Launching to crickets is demoralizing and expensive. Building hype validates demand before you fully commit.",
              howItStreamlines: "It focuses your marketing efforts on a single event. You create a burst of momentum rather than a slow trickle.",
              howItBuildsRelationships: "It makes early followers feel like insiders. They get to be part of the 'founding' group.",
              actionSteps: [
                {
                  title: "Build a Waitlist Landing Page",
                  description: "Create a simple page capturing emails of interested prospects.",
                  timeEstimate: "3 Hours",
                  deliverable: "Live landing page with email signup.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Write a compelling headline promising your main benefit.",
                    "Add a brief description of what is coming.",
                    "Embed an email signup form.",
                    "Share the link on your social channels."
                  ],
                  tips: ["Keep it extremely simple.", "Offer a small incentive for signing up."],
                  commonChallenges: ["Over-designing the page.", "Forgetting to test the signup form."],
                  successCriteria: ["The form collects emails correctly.", "You have your first 10 signups."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Execute Your Launch",
              description: "This is it. The week you open the doors and ask for the sale. You will execute your communication plan to drive traffic and convert leads into paying customers.",
              whyItMatters: "Revenue is the lifeblood of business. A launch focuses energy to generate that initial cash flow.",
              howItStreamlines: "It creates a focused sales period. You aren't always 'kind of' selling.",
              howItBuildsRelationships: "It delivers the solution they've been waiting for. You are fulfilling your promise.",
              actionSteps: [
                {
                  title: "Run Launch Campaign",
                  description: "Send your sales emails and social posts.",
                  timeEstimate: "Daily Effort",
                  deliverable: "New Customers.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Send 'Doors Open' email.",
                    "Post daily social proof/testimonials.",
                    "Send 'Doors Closing' urgency email.",
                    "Personally reach out to warm leads."
                  ],
                  tips: ["Follow up more than you think is polite.", "Celebrate every sale publicly."],
                  commonChallenges: ["Giving up if day 1 is slow.", "Taking rejection personally."],
                  successCriteria: ["You get your first paying customer.", "You learn what messaging works."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Review & Plan Next Quarter",
              description: "This week you pause to reflect. You look at what worked, what didn't, and plan the next 90 days. This cycle of execution and reflection is the secret to long-term growth.",
              whyItMatters: "Experience without reflection is wasted. You must learn from your actions to improve.",
              howItStreamlines: "It sets the roadmap for the future. You stop guessing what to do next.",
              howItBuildsRelationships: "You can ask customers for feedback. It shows you value their experience.",
              actionSteps: [
                {
                  title: "Conduct Quarterly Review",
                  description: "Analyze your metrics and qualitative wins.",
                  timeEstimate: "2 Hours",
                  deliverable: "90-Day Plan for Next Quarter.",
                  linkTo: "AnnualPlanning",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Review revenue vs. goals.",
                    "Review lessons learned.",
                    "Identify top 3 priorities for next quarter.",
                    "Schedule your next 90-day sprint."
                  ],
                  tips: ["Be kind to yourself.", "Focus on progress, not perfection."],
                  commonChallenges: ["Ignoring the data.", "Setting unrealistic goals again."],
                  successCriteria: ["You have a clear plan for the next 3 months.", "You feel re-energized."]
                }
              ],
              tools: [tools.audit],
              resources: []
            }
          ]
        }
      ]
    }
  }
};

const startup = {
  title: "Startup Stage",
  description: "Build and launch business foundation with comprehensive planning, marketing, customer journey optimization",
  goals: {
    business_plan: {
      title: "Develop Your Business Plan",
      description: "Create comprehensive plan: market research, competitive analysis, operations, financials, launch strategy.",
      months: [
        {
          title: "Month 1: Market Research & Strategy",
          focus: "Deep market analysis, competitive positioning, strategic foundation",
          weeks: [
            {
              title: "Deep Dive Market Research",
              description: "This week is about moving beyond assumptions. You will gather hard data on your industry, trends, and customer behaviors. This validation minimizes risk and highlights gaps in the market you can exploit.",
              whyItMatters: "Data beats opinion. Understanding the real market landscape prevents costly mistakes and reveals hidden opportunities.",
              howItStreamlines: "It narrows your focus to viable markets only. You stop wasting time on ideas that have no demand.",
              howItBuildsRelationships: "You can speak to current market frustrations. Customers appreciate a solution that fits the current reality.",
              actionSteps: [
                {
                  title: "Analyze Industry Trends",
                  description: "Research the macro trends affecting your sector.",
                  timeEstimate: "2 Hours",
                  deliverable: "Market Trends Report.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Use Google Trends and industry reports.",
                    "Identify growing and shrinking segments.",
                    "Look for regulatory or technological shifts.",
                    "Summarize top 3 opportunities and threats."
                  ],
                  tips: ["Look for data less than 2 years old.", "Check competitor annual reports."],
                  commonChallenges: ["Getting lost in data paralysis.", "Ignoring negative trends."],
                  successCriteria: ["You can identify the direction of the market.", "You know where the money is flowing."]
                }
              ],
              tools: [tools.competitor],
              resources: []
            },
            {
              title: "Competitive Analysis",
              description: "This week you study your rivals. You identify who the key players are, what they offer, and where they are failing. This allows you to position yourself uniquely.",
              whyItMatters: "You need to know who you're fighting against. Differentiation is impossible without comparison.",
              howItStreamlines: "You can adopt best practices they've already proven. You avoid their obvious mistakes.",
              howItBuildsRelationships: "You can serve the customers they ignore. You become the alternative they've been waiting for.",
              actionSteps: [
                {
                  title: "Build Competitor Matrix",
                  description: "Document features, pricing, and reviews of top 3 competitors.",
                  timeEstimate: "2 Hours",
                  deliverable: "Competitor Matrix.",
                  linkTo: "StrategyFormSWOTAnalysis",
                  foundationStepId: "swot",
                  detailedSteps: [
                    "List top 3 competitors.",
                    "Record their pricing and key features.",
                    "Read their 1-star reviews to find pain points.",
                    "Identify your unique advantage over each."
                  ],
                  tips: ["Be objective.", "Don't ignore indirect competitors."],
                  commonChallenges: ["Underestimating them.", "Copying them too closely."],
                  successCriteria: ["You know exactly why a customer would choose you over them.", "You have found a gap in the market."]
                }
              ],
              tools: [tools.competitor],
              resources: []
            },
            {
              title: "Define Business Model",
              description: "This week you decide how you make money. You map out your value proposition, revenue streams, and cost structure. This ensures your idea is actually a viable business.",
              whyItMatters: "A great product without a business model is a hobby. You need a clear path to profitability.",
              howItStreamlines: "It clarifies your priorities. You focus on activities that drive revenue.",
              howItBuildsRelationships: "It clarifies the value exchange. Customers know what to pay for.",
              actionSteps: [
                {
                  title: "Complete Business Model Canvas",
                  description: "Fill out the one-page business plan framework.",
                  timeEstimate: "2 Hours",
                  deliverable: "Business Model Canvas.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Identify Key Partners and Activities.",
                    "Define Value Propositions and Customer Relationships.",
                    "List Customer Segments and Channels.",
                    "Map Cost Structure and Revenue Streams."
                  ],
                  tips: ["Keep it concise.", "Focus on the relationships between boxes."],
                  commonChallenges: ["Leaving boxes blank.", "Being unrealistic about costs."],
                  successCriteria: ["You can explain your entire business logic on one page.", "It makes financial sense."]
                }
              ],
              tools: [tools.mission],
              resources: []
            },
            {
              title: "Strategic Positioning",
              description: "This week you define where you sit in the customer's mind. Are you the premium option? The fast option? The friendly option? Positioning determines your pricing and marketing.",
              whyItMatters: "You can't be everything to everyone. Clear positioning attracts your specific ideal client.",
              howItStreamlines: "Marketing decisions become obvious. You know your voice and style.",
              howItBuildsRelationships: "It creates tribe mentality. Customers identify with your brand values.",
              actionSteps: [
                {
                  title: "Draft Positioning Statement",
                  description: "Write the internal statement that guides your brand.",
                  timeEstimate: "1 Hour",
                  deliverable: "Positioning Statement.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Define the target segment.",
                    "Define the brand name.",
                    "Define the product category.",
                    "Define the key point of difference."
                  ],
                  tips: ["Use the template: For [Target], [Brand] is the [Category] that [Benefit].", "Be specific."],
                  commonChallenges: ["Being too generic.", "Claiming to be the 'best' without proof."],
                  successCriteria: ["It clearly separates you from competitors.", "It guides your marketing copy."]
                }
              ],
              tools: [tools.brand],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Operations & Financial Planning",
          focus: "Define operations model, create financial projections, plan team structure",
          weeks: [
             {
              title: "Operational Workflow Design",
              description: "This week you design the engine of your business. You will map out exactly how value is delivered, from the first customer touchpoint to the final delivery. Efficient operations are the key to profitability.",
              whyItMatters: "Chaos kills scale. Defined workflows ensure consistency and allow you to delegate effectively.",
              howItStreamlines: "It removes bottlenecks. You identify steps that can be automated or eliminated.",
              howItBuildsRelationships: "Consistent delivery builds trust. Customers know they will get the same great experience every time.",
              actionSteps: [
                {
                  title: "Map Your Core Process",
                  description: "Create a flowchart of your primary service or product delivery.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Process Flowchart.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Start with the customer order.",
                    "List every step required to fulfill it.",
                    "Identify who does each step.",
                    "Mark decision points and potential failure points."
                  ],
                  tips: ["Keep it high-level first.", "Use sticky notes for flexibility."],
                  commonChallenges: ["Making it too complex.", "Forgetting administrative steps."],
                  successCriteria: ["A stranger could understand how you deliver value.", "You see obvious areas to improve."]
                }
              ],
              tools: [tools.process],
              resources: []
            },
            {
              title: "Financial Projections",
              description: "This week you crunch the numbers. You estimate your startup costs, monthly burn rate, and revenue targets. This reality check ensures you have enough runway to succeed.",
              whyItMatters: "Running out of cash kills businesses. You need to know your numbers to survive.",
              howItStreamlines: "It sets clear targets. You know exactly how many sales you need to break even.",
              howItBuildsRelationships: "It allows for sustainable pricing. You don't have to desperate-sell to survive.",
              actionSteps: [
                {
                  title: "Create 12-Month Budget",
                  description: "Forecast income and expenses for the next year.",
                  timeEstimate: "2 Hours",
                  deliverable: "Financial Spreadsheet.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "List all fixed costs (rent, software).",
                    "Estimate variable costs (COGS, marketing).",
                    "Project conservative revenue.",
                    "Calculate monthly cash flow."
                  ],
                  tips: ["Overestimate expenses by 10%.", "Underestimate revenue by 20%."],
                  commonChallenges: ["Being too optimistic.", "Forgetting taxes."],
                  successCriteria: ["You know your break-even point.", "You know how much cash you need to launch."]
                }
              ],
              tools: [tools.financial],
              resources: []
            },
            {
              title: "Team & Resource Planning",
              description: "This week you decide who does what. Even if you are a solo founder, you need to identify the hats you wear and when you will need to hire help.",
              whyItMatters: "You can't do everything forever. Planning for help prevents burnout.",
              howItStreamlines: "It clarifies roles. You know what skills you need to hire for.",
              howItBuildsRelationships: "Better service. Specialists do better work than tired generalists.",
              actionSteps: [
                {
                  title: "Draft Org Chart",
                  description: "Map out the roles needed now and in the future.",
                  timeEstimate: "1 Hour",
                  deliverable: "Org Chart.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "List all functions (Sales, Ops, Marketing).",
                    "Put your name in the boxes you currently fill.",
                    "Identify the first role to hire.",
                    "Write a job description for that role."
                  ],
                  tips: ["Hire for your weaknesses.", "Consider contractors first."],
                  commonChallenges: ["Thinking you have to hire employees immediately.", "Ignoring admin work."],
                  successCriteria: ["You have a hiring roadmap.", "You know what tasks to delegate first."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Tech Stack Selection",
              description: "This week you choose your tools. You select the software that runs your business, from CRM to Accounting. The right stack saves hours of manual work.",
              whyItMatters: "Bad tools cause friction. Good tools automate work and provide data.",
              howItStreamlines: "Data flows automatically between systems. You avoid double-entry.",
              howItBuildsRelationships: "Better data management means you remember customer details. It feels personal.",
              actionSteps: [
                {
                  title: "Select Core Software",
                  description: "Choose your CRM, Email, and Accounting tools.",
                  timeEstimate: "2 Hours",
                  deliverable: "Tech Stack Diagram.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "List your requirements for each tool.",
                    "Compare top 3 options for pricing and features.",
                    "Check for integrations (Zapier etc.).",
                    "Sign up for trials."
                  ],
                  tips: ["Simple is better than complex.", "Avoid 'all-in-one' tools that do nothing well."],
                  commonChallenges: ["Signing up for too many subscriptions.", "Not testing integrations."],
                  successCriteria: ["You have a list of tools that talk to each other.", "You know the monthly cost."]
                }
              ],
              tools: [tools.process],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Launch Strategy & Execution",
          focus: "Finalize plan, create launch timeline, prepare for market entry",
          weeks: [
             {
              title: "Finalize Launch Timeline",
              description: "This week you turn strategy into a schedule. You will map out every task needed to go live, assigning dates and owners. This accountability ensures you actually launch instead of planning forever.",
              whyItMatters: "A goal without a date is just a dream. A timeline creates urgency and coordinates all moving parts.",
              howItStreamlines: "It prioritizes tasks. You know exactly what must be done today to hit the launch date.",
              howItBuildsRelationships: "It allows you to coordinate marketing with operations. You won't sell something you can't deliver.",
              actionSteps: [
                {
                  title: "Create Launch Gantt Chart",
                  description: "Build a visual timeline of all launch activities.",
                  timeEstimate: "2 Hours",
                  deliverable: "Launch Calendar.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Set your Go-Live date.",
                    "Work backward to identify dependencies.",
                    "Schedule marketing blasts.",
                    "Schedule final QA tests."
                  ],
                  tips: ["Add buffer time for delays.", "Share it with your team/partners."],
                  commonChallenges: ["Being overly optimistic about time.", "Ignoring dependencies."],
                  successCriteria: ["Every task has a due date.", "You feel confident in the schedule."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "QA & Testing",
              description: "This week you break your own business. You test every link, every payment form, and every process to ensure it works. You want to find the bugs before your customers do.",
              whyItMatters: "Broken tech kills conversions. First impressions are hard to fix.",
              howItStreamlines: "It prevents support tickets. You fix issues at the source.",
              howItBuildsRelationships: "A flawless experience builds confidence. It shows you are professional.",
              actionSteps: [
                {
                  title: "Run Full System Test",
                  description: "Simulate a customer purchase from start to finish.",
                  timeEstimate: "2 Hours",
                  deliverable: "Bug Report/Fix List.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Make a real purchase (refund yourself later).",
                    "Check receipt emails.",
                    "Verify access to the product.",
                    "Test on mobile and desktop."
                  ],
                  tips: ["Ask a friend to do it too.", "Test different browsers."],
                  commonChallenges: ["Assuming it works because it worked yesterday.", "Ignoring mobile layout."],
                  successCriteria: ["The purchase flow is smooth.", "All automated emails arrive correctly."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "Go Live!",
              description: "This is the moment. You flip the switch and announce your business to the world. It is time to celebrate and start serving.",
              whyItMatters: "You are finally in business. Real feedback starts now.",
              howItStreamlines: "You shift from 'building' mode to 'operating' mode.",
              howItBuildsRelationships: "You can finally solve real problems for real people.",
              actionSteps: [
                {
                  title: "Execute Launch Day Checklist",
                  description: "Perform the final steps to go public.",
                  timeEstimate: "All Day",
                  deliverable: "Live Business.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Publish website.",
                    "Announce on all social channels.",
                    "Email your personal network.",
                    "Monitor for immediate feedback."
                  ],
                  tips: ["Have support ready.", "Celebrate the milestone!"],
                  commonChallenges: ["Fear of pushing the button.", "Getting distracted."],
                  successCriteria: ["You are live.", "You have told the world."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Post-Launch Review",
              description: "This week you breathe and analyze. You look at the initial data from your launch. What went well? What broke? This feedback loop informs your strategy for the next month.",
              whyItMatters: "Launch is just the starting line. Continuous improvement wins the race.",
              howItStreamlines: "You quickly fix what isn't working. You double down on what is.",
              howItBuildsRelationships: "You thank your early supporters. You ask for their feedback to improve.",
              actionSteps: [
                {
                  title: "Analyze Launch Metrics",
                  description: "Review traffic, conversion, and feedback data.",
                  timeEstimate: "2 Hours",
                  deliverable: "Launch Retro Report.",
                  linkTo: "AnnualPlanning",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Check Google Analytics/Sales Dashboard.",
                    "Read all customer emails/comments.",
                    "Identify top 3 fixes needed.",
                    "Plan the next marketing push."
                  ],
                  tips: ["Look for patterns.", "Don't panic over small sample sizes."],
                  commonChallenges: ["Ignoring negative feedback.", "Focusing only on vanity metrics."],
                  successCriteria: ["You know what to improve next week.", "You have thanked your team/supporters."]
                }
              ],
              tools: [tools.audit],
              resources: []
            }
          ]
        }
      ]
    },
    marketing_plan: {
      title: "Develop Your Marketing Plan",
      description: "Build comprehensive marketing strategy with Brand Kit, Customer Journey, AI marketing guidance.",
      months: [
        {
          title: "Month 1: Marketing Foundation",
          focus: "Strategy, positioning, core messaging framework",
          weeks: [
             {
              title: "Core Messaging Framework",
              description: "This week you define the language of your brand. You will create the key messages, taglines, and elevator pitches that will be used across all your marketing. Consistency in messaging is key to being remembered.",
              whyItMatters: "Confused customers don't buy. Clear, consistent messaging cuts through the noise and drives conversions.",
              howItStreamlines: "You write copy faster. You have a bank of approved phrases and angles to pull from.",
              howItBuildsRelationships: "It resonates with the right people. Your message acts as a beacon for your ideal tribe.",
              actionSteps: [
                {
                  title: "Draft Key Brand Messages",
                  description: "Write your elevator pitch, tagline, and 3 key value pillars.",
                  timeEstimate: "2 Hours",
                  deliverable: "Messaging Guide.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Write a 1-sentence elevator pitch.",
                    "Create a catchy tagline.",
                    "Define your 3 main selling points.",
                    "Write a paragraph description of your company."
                  ],
                  tips: ["Read them aloud.", "Test them on friends."],
                  commonChallenges: ["Being too wordy.", "Using passive voice."],
                  successCriteria: ["You can explain what you do in 10 seconds.", "It sounds exciting."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Audience Segmentation",
              description: "This week you slice your market. You identify different subgroups within your audience who have specific needs. This allows for hyper-targeted marketing.",
              whyItMatters: "Personalization converts. Treating everyone the same ignores their unique context.",
              howItStreamlines: "It clarifies campaign targets. You know exactly who each email is for.",
              howItBuildsRelationships: "Customers feel seen. You speak to their specific situation, not a generic crowd.",
              actionSteps: [
                {
                  title: "Create Audience Segments",
                  description: "Define 2-3 distinct customer groups.",
                  timeEstimate: "1 Hour",
                  deliverable: "Segmentation Map.",
                  linkTo: "StrategyFormIdealClient",
                  foundationStepId: "ideal_client",
                  detailedSteps: [
                    "Group by demographics (age, location).",
                    "Group by behavior (new vs. returning).",
                    "Group by problem (price vs. quality conscious).",
                    "Name each segment."
                  ],
                  tips: ["Keep it simple initially.", "Focus on the biggest differences."],
                  commonChallenges: ["Creating too many segments.", "Segments with no clear difference."],
                  successCriteria: ["You have unique messages for each group.", "You can tag them in your CRM."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Channel Selection",
              description: "This week you decide where to play. You identify the 1-2 marketing channels where your audience hangs out and where you can win. Focus is better than being everywhere.",
              whyItMatters: "Spreading yourself thin leads to mediocrity. dominating one channel builds momentum.",
              howItStreamlines: "It reduces content fatigue. You only create for the platforms that matter.",
              howItBuildsRelationships: "You meet them where they are. You become a familiar face in their favorite space.",
              actionSteps: [
                {
                  title: "Select Primary Channels",
                  description: "Choose 1 primary and 1 secondary marketing channel.",
                  timeEstimate: "1 Hour",
                  deliverable: "Channel Plan.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Research where your avatar spends time.",
                    "Assess your own strengths (writing vs. video).",
                    "Look at competitor presence.",
                    "Commit to a posting frequency."
                  ],
                  tips: ["Go deep, not wide.", "Don't pick a channel you hate."],
                  commonChallenges: ["FOMO on other platforms.", "Quitting too early."],
                  successCriteria: ["You have a clear focus.", "You have created accounts/profiles."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "SEO Foundation",
              description: "This week you plant seeds for the future. You identify the keywords your customers are searching for. This ensures your content gets found organically over time.",
              whyItMatters: "Organic traffic is free and high-intent. People searching have a problem to solve.",
              howItStreamlines: "It guides content creation. You write what people are already looking for.",
              howItBuildsRelationships: "You answer their questions. You become the helpful expert they find.",
              actionSteps: [
                {
                  title: "Keyword Research",
                  description: "Build a list of 20 target keywords.",
                  timeEstimate: "2 Hours",
                  deliverable: "Keyword Strategy.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Use a keyword tool (Google Planner/Ubersuggest).",
                    "Find high volume, low competition terms.",
                    "Look for questions (Who, What, How).",
                    "Map keywords to page topics."
                  ],
                  tips: ["Focus on 'long-tail' keywords.", "Check search intent."],
                  commonChallenges: ["Targeting impossible keywords.", "Ignoring search volume."],
                  successCriteria: ["You have a list of topics to write about.", "You know what your audience asks."]
                }
              ],
              tools: [tools.content],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Content & Campaign Strategy",
          focus: "Create content strategy, plan campaigns, build marketing calendar",
          weeks: [
            {
              title: "Content Strategy Design",
              description: "This week you plan how you will educate and entertain your audience. You will decide on content pillars, formats (video, text, audio), and channels. This ensures you aren't just posting noise, but value.",
              whyItMatters: "Content builds trust and authority. A strategy ensures your content actually leads to sales.",
              howItStreamlines: "Batching becomes possible. You stop waking up wondering 'what should I post today?'.",
              howItBuildsRelationships: "Valuable content gives before it asks. It positions you as a helpful expert, not just a salesperson.",
              actionSteps: [
                {
                  title: "Define Content Pillars",
                  description: "Select 3-5 core topics you will consistently cover.",
                  timeEstimate: "1 Hour",
                  deliverable: "Content Pillar List.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Review your customer's pain points.",
                    "Choose topics that solve those pains.",
                    "Ensure you have expertise in these areas.",
                    "Brainstorm 5 ideas for each pillar."
                  ],
                  tips: ["Choose topics you enjoy discussing.", "Make sure they relate to your offer."],
                  commonChallenges: ["Choosing too many topics.", "Picking trending topics that aren't relevant."],
                  successCriteria: ["You have 20+ content ideas generated.", "They all align with your brand."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Lead Magnet Creation",
              description: "This week you create a value exchange. You build a free resource to give away in exchange for email addresses. This moves people from 'rented' social media to your 'owned' email list.",
              whyItMatters: "Email is the highest ROI channel. You need a reason for people to subscribe.",
              howItStreamlines: "It automates lead gen. The asset works for you 24/7.",
              howItBuildsRelationships: "It delivers immediate value. You solve a small problem for free, earning trust.",
              actionSteps: [
                {
                  title: "Build Your Lead Magnet",
                  description: "Create a PDF, Checklist, or Mini-Course.",
                  timeEstimate: "3 Hours",
                  deliverable: "Ready-to-download Asset.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Identify a specific, small problem.",
                    "Create a quick-win solution.",
                    "Design it simply (Canva).",
                    "Set up the delivery mechanism."
                  ],
                  tips: ["Focus on 'quick win'.", "Make it consumable in 5 minutes."],
                  commonChallenges: ["Writing a whole book.", "Making it too complex."],
                  successCriteria: ["You have a file ready to share.", "It solves a real problem."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Email Sequence Design",
              description: "This week you automate the relationship. You write the emails that send automatically when someone downloads your lead magnet. This nurtures them from stranger to customer.",
              whyItMatters: "You can't manually email every lead. Automation ensures consistent follow-up.",
              howItStreamlines: "It saves massive time. You write it once, it sells forever.",
              howItBuildsRelationships: "It tells your story over time. You build familiarity and trust drip by drip.",
              actionSteps: [
                {
                  title: "Write Welcome Sequence",
                  description: "Draft a 3-5 email series.",
                  timeEstimate: "2 Hours",
                  deliverable: "Welcome Sequence.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Email 1: Deliver the asset + Welcome.",
                    "Email 2: Provide extra value/tips.",
                    "Email 3: Share your backstory/why.",
                    "Email 4: Soft offer/invitation."
                  ],
                  tips: ["Write like you talk to a friend.", "Focus on value, not just selling."],
                  commonChallenges: ["Being too formal.", "Selling too hard too soon."],
                  successCriteria: ["You have 3-5 emails written.", "They flow logically."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Social Media Calendar",
              description: "This week you get organized. You plan a month of social content in advance. This ensures consistency and reduces daily stress.",
              whyItMatters: "Consistency is the secret to social growth. Random posting gets random results.",
              howItStreamlines: "You can batch create content. You spend less time on social media overall.",
              howItBuildsRelationships: "Regular presence keeps you top of mind. You become part of their daily feed.",
              actionSteps: [
                {
                  title: "Fill Content Calendar",
                  description: "Schedule posts for the next 30 days.",
                  timeEstimate: "2 Hours",
                  deliverable: "30-Day Social Plan.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Map out key dates/promotions.",
                    "Slot in your content pillars.",
                    "Draft the captions.",
                    "Create/find the visuals."
                  ],
                  tips: ["Repurpose content.", "Leave room for trending topics."],
                  commonChallenges: ["Running out of ideas.", "Not scheduling it."],
                  successCriteria: ["You know exactly what is posting next Tuesday.", "You feel organized."]
                }
              ],
              tools: [tools.content],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Launch & Optimization",
          focus: "Execute marketing plan, measure results, optimize based on data",
          weeks: [
             {
              title: "Launch Campaign Execution",
              description: "This week is about visibility. You will execute your planned marketing push, distributing content and ads to drive traffic. This is where the rubber meets the road.",
              whyItMatters: "Even the best product fails if no one knows about it. Execution is the bridge between value and revenue.",
              howItStreamlines: "Following a plan reduces stress. You are executing a checklist, not reacting to chaos.",
              howItBuildsRelationships: "It invites people in. You are actively starting conversations and welcoming new customers.",
              actionSteps: [
                {
                  title: "Activate Distribution Channels",
                  description: "Post content, send emails, and turn on ads according to your schedule.",
                  timeEstimate: "Ongoing",
                  deliverable: "Live Campaigns.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Schedule all social posts.",
                    "Send the launch email blast.",
                    "Engage with comments immediately.",
                    "Monitor ad spend daily."
                  ],
                  tips: ["Be present to answer questions.", "Check for broken links."],
                  commonChallenges: ["Getting discouraged by slow starts.", "Forgetting to engage."],
                  successCriteria: ["Traffic is flowing to your site.", "You are getting inquiries."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Data Analysis & Tracking",
              description: "This week you put on your scientist hat. You look at the data coming in from your campaigns. You verify that your tracking is working and start collecting insights.",
              whyItMatters: "Flying blind is dangerous. You need to know what is working to spend money wisely.",
              howItStreamlines: "It identifies waste. You stop spending on ads/posts that don't convert.",
              howItBuildsRelationships: "It reveals what audiences like. You can give them more of what they engage with.",
              actionSteps: [
                {
                  title: "Audit Analytics",
                  description: "Check Google Analytics and Platform Insights.",
                  timeEstimate: "1 Hour",
                  deliverable: "Data Dashboard.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Verify traffic sources.",
                    "Check bounce rates on landing pages.",
                    "See which social posts got engagement.",
                    "Track email open rates."
                  ],
                  tips: ["Focus on trends, not daily blips.", "Compare against industry benchmarks."],
                  commonChallenges: ["Ignoring data.", "Misinterpreting correlation as causation."],
                  successCriteria: ["You know your best traffic source.", "You know your conversion rate."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "Optimization & Iteration",
              description: "This week you tweak the machine. Based on your data, you improve your headlines, images, or targeting. Small tweaks can lead to massive improvements in ROI.",
              whyItMatters: "The first version is rarely the best. Success comes from iteration.",
              howItStreamlines: "It makes marketing more efficient. You get more results for the same effort.",
              howItBuildsRelationships: "It improves the user experience. You fix confusing pages or boring emails.",
              actionSteps: [
                {
                  title: "Run A/B Tests",
                  description: "Test one variable to improve performance.",
                  timeEstimate: "1 Hour",
                  deliverable: "Test Results.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Pick one element (Headline, Image, Button Color).",
                    "Create a variation.",
                    "Split traffic/audience.",
                    "Measure the winner."
                  ],
                  tips: ["Test big changes first.", "Wait for statistical significance."],
                  commonChallenges: ["Testing too many things at once.", "Ending tests too early."],
                  successCriteria: ["You found a winner.", "You improved conversion rate."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Retargeting & Follow-up",
              description: "This week you capture the 'almost' customers. You set up systems to reach people who visited but didn't buy. Most sales happen in the follow-up.",
              whyItMatters: "Most people aren't ready to buy immediately. Retargeting keeps you top of mind until they are.",
              howItStreamlines: "It converts warm traffic. It's cheaper than finding new cold people.",
              howItBuildsRelationships: "It shows persistence. You remind them of the value they looked at.",
              actionSteps: [
                {
                  title: "Setup Retargeting/Drip",
                  description: "Create ads or emails for non-buyers.",
                  timeEstimate: "2 Hours",
                  deliverable: "Active Retargeting Campaign.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Install tracking pixels.",
                    "Create an 'Abandon Cart' email.",
                    "Create a 'Did you forget?' ad.",
                    "Offer a limited-time bonus."
                  ],
                  tips: ["Don't be annoying.", "Cap the frequency."],
                  commonChallenges: ["Creepy ads.", "Not segmenting buyers out."],
                  successCriteria: ["You recover lost sales.", "Your ROI increases."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            }
          ]
        }
      ]
    },
    customer_journey: {
      title: "Develop Your Customer Journey",
      description: "Master every touchpoint from discovery to advocate using Journey Mapper and retention strategies.",
      months: [
        {
          title: "Month 1: Journey Mapping",
          focus: "Map complete journey, optimize touchpoints for conversion and satisfaction",
          weeks: [
            {
              title: "Map the Current State",
              description: "This week you audit your current customer experience. You will walk in your customer's shoes from first click to final purchase. This reveals friction points that are costing you sales.",
              whyItMatters: "You can't fix what you can't see. Identifying friction is the fastest way to increase conversion rates.",
              howItStreamlines: "It highlights redundant steps. You can remove unnecessary forms or clicks.",
              howItBuildsRelationships: "A smooth experience feels respectful. You value their time and make it easy to do business.",
              actionSteps: [
                {
                  title: "Audit Your Touchpoints",
                  description: "List every interaction a customer has with your brand.",
                  timeEstimate: "2 Hours",
                  deliverable: "Touchpoint Audit List.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Visit your own website as a stranger.",
                    "Sign up for your own newsletter.",
                    "Try to buy your product.",
                    "Note every frustration or confusion."
                  ],
                  tips: ["Use a fresh browser/incognito mode.", "Ask a friend to do it while you watch."],
                  commonChallenges: ["Being blind to your own flaws.", "Skipping mobile testing."],
                  successCriteria: ["You have a list of 5+ things to fix.", "You understand the user flow."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Analyze Drop-off Points",
              description: "This week you find the leaks. You look at where people leave your funnel. Is it the pricing page? The checkout? The email signup? Fixing these leaks multiplies your results.",
              whyItMatters: "Pouring water into a leaky bucket is wasteful. Fixing leaks creates permanent growth.",
              howItStreamlines: "You focus on high-impact fixes. You stop optimizing pages no one sees.",
              howItBuildsRelationships: "It removes frustration. People leave when they are confused or annoyed.",
              actionSteps: [
                {
                  title: "Funnel Leak Analysis",
                  description: "Identify top 3 exit pages.",
                  timeEstimate: "1 Hour",
                  deliverable: "Optimization Priority List.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Check analytics for high exit rates.",
                    "Look for 'rage clicks' or rapid exits.",
                    "Hypothesize why they are leaving.",
                    "Plan a fix (better copy, faster load, clearer button)."
                  ],
                  tips: ["Look for technical errors first.", " Simplify the page."],
                  commonChallenges: ["Blaming the customer.", "Ignoring mobile users."],
                  successCriteria: ["You know your biggest bottleneck.", "You have a plan to fix it."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "Define Ideal Future State",
              description: "This week you dream. You map out the perfect, frictionless experience you *want* to provide. This sets the vision for your optimization efforts.",
              whyItMatters: "Vision drives innovation. You can't build a 5-star experience if you aim for 3-star.",
              howItStreamlines: "It sets a standard. Every new process must meet this ideal.",
              howItBuildsRelationships: "It anticipates needs. You solve problems before the customer asks.",
              actionSteps: [
                {
                  title: "Blueprint the Dream Journey",
                  description: "Draw the ideal flow from stranger to advocate.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Ideal Journey Map.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Imagine the perfect emotional state at each step.",
                    "Design the perfect transition between steps.",
                    "Add 'delight' moments that don't exist yet.",
                    "Ensure value is delivered early and often."
                  ],
                  tips: ["Think like Disney (magical experience).", "Ignore current tech limitations for now."],
                  commonChallenges: ["Thinking 'we can't do that'.", "Being too practical."],
                  successCriteria: ["You have an inspiring vision.", "The team is excited to build it."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Implementation Plan",
              description: "This week you bridge the gap. You create a plan to move from your current state to your ideal state. You prioritize the changes that will have the biggest impact.",
              whyItMatters: "Vision without action is hallucination. You need a concrete plan to improve.",
              howItStreamlines: "It creates a roadmap. You tackle one improvement at a time.",
              howItBuildsRelationships: "Customers see continuous improvement. They appreciate the upgrades.",
              actionSteps: [
                {
                  title: "Create CX Roadmap",
                  description: "Prioritize fixes and upgrades.",
                  timeEstimate: "1 Hour",
                  deliverable: "Action Plan.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Score potential fixes by Impact vs. Effort.",
                    "Pick top 3 Quick Wins.",
                    "Schedule major projects.",
                    "Assign owners to each task."
                  ],
                  tips: ["Fix broken things before adding new things.", "Start near the purchase point."],
                  commonChallenges: ["Trying to fix everything at once.", "Analysis paralysis."],
                  successCriteria: ["You have a prioritized to-do list.", "Work has started."]
                }
              ],
              tools: [tools.process],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Experience Optimization",
          focus: "Optimize touchpoints, remove friction, create wow moments",
          weeks: [
            {
              title: "Design 'Wow' Moments",
              description: "This week you engineer delight. You will identify key moments in the journey to exceed expectations. These surprises turn customers into raving fans.",
              whyItMatters: "Satisfaction is the baseline; delight creates loyalty. People share 'wow' moments.",
              howItStreamlines: "Happy customers complain less. It reduces support burden and refunds.",
              howItBuildsRelationships: "It shows you care. Going the extra mile creates deep emotional reciprocity.",
              actionSteps: [
                {
                  title: "Create an Unboxing Experience",
                  description: "Enhance the moment they receive your product or service.",
                  timeEstimate: "2 Hours",
                  deliverable: "Enhanced Onboarding/Delivery Plan.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Add a personal thank you note.",
                    "Improve the packaging or digital welcome.",
                    "Include a surprise bonus or guide.",
                    "Make the first step incredibly easy."
                  ],
                  tips: ["Personalization wins.", "It doesn't have to be expensive."],
                  commonChallenges: ["Overcomplicating it.", "Forgetting digital products need 'unboxing' too."],
                  successCriteria: ["The delivery feels like a gift.", "Customers are compelled to share it."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Optimize Support & Service",
              description: "This week you fix the safety net. You ensure that when things go wrong, your response is fast, helpful, and empathetic. Great recovery can actually increase loyalty.",
              whyItMatters: "Service failures happen. How you handle them defines your brand.",
              howItStreamlines: "It reduces resolution time. Standard responses prevent reinventing the wheel.",
              howItBuildsRelationships: "It proves you are reliable. You have their back when it counts.",
              actionSteps: [
                {
                  title: "Create Support SOPs",
                  description: "Write templates for common questions.",
                  timeEstimate: "2 Hours",
                  deliverable: "Support Library.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Identify top 5 recurring questions.",
                    "Write clear, friendly answers.",
                    "Create a policy for refunds/issues.",
                    "Set response time goals."
                  ],
                  tips: ["Use 'Yes, and...' language.", "Apologize without being defensive."],
                  commonChallenges: ["Being robotic.", "Making the customer jump through hoops."],
                  successCriteria: ["You can answer emails in half the time.", "Customers thank you for the help."]
                }
              ],
              tools: [tools.sop],
              resources: []
            },
            {
              title: "Personalization at Scale",
              description: "This week you use data to be relevant. You use names, purchase history, and preferences to tailor the experience. It makes every customer feel like your only customer.",
              whyItMatters: "Generic marketing is ignored. Personalization grabs attention.",
              howItStreamlines: "It automates relevance. Systems do the remembering for you.",
              howItBuildsRelationships: "It shows you listen. You remember what they like.",
              actionSteps: [
                {
                  title: "Implement Personalization Tags",
                  description: "Add dynamic fields to emails/site.",
                  timeEstimate: "1 Hour",
                  deliverable: "Personalized touchpoints.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Add 'First Name' to email headers.",
                    "Segment offers based on past purchases.",
                    "Send birthday/anniversary messages.",
                    "Recommend relevant products."
                  ],
                  tips: ["Test fallback text (e.g., 'Friend').", "Don't get creepy."],
                  commonChallenges: ["Bad data (e.g., name is 'EMAIL').", "Over-personalizing."],
                  successCriteria: ["Emails feel 1:1.", "Engagement rates go up."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Feedback Loops",
              description: "This week you learn to listen. You build systems to collect feedback automatically. You use this fuel to improve the product and the journey.",
              whyItMatters: "Guessing is expensive. Asking is free. Feedback is the roadmap to perfection.",
              howItStreamlines: "It prioritizes your roadmap. You build what they actually want.",
              howItBuildsRelationships: "It validates their opinion. People love to be heard.",
              actionSteps: [
                {
                  title: "Setup Auto-Survey",
                  description: "Create a post-purchase/NPS survey.",
                  timeEstimate: "1 Hour",
                  deliverable: "Live Survey.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Create a 3-question survey.",
                    "Trigger it after delivery.",
                    "Ask 'What almost stopped you?'.",
                    "Ask 'What is one thing we could improve?'."
                  ],
                  tips: ["Keep it short.", "Read every response."],
                  commonChallenges: ["Asking too many questions.", "Never looking at the data."],
                  successCriteria: ["You get a steady stream of insights.", "You catch unhappy customers early."]
                }
              ],
              tools: [tools.audit],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Retention & Advocacy",
          focus: "Build loyalty programs, referral systems, customer success processes",
          weeks: [
             {
              title: "Build a Referral Engine",
              description: "This week you turn customers into marketers. You will create a system that incentivizes and makes it easy for happy clients to refer others. This is the cheapest and highest-converting growth channel.",
              whyItMatters: "Referrals trust you immediately. They close faster and stay longer.",
              howItStreamlines: "It reduces marketing effort. Your customers do the prospecting for you.",
              howItBuildsRelationships: "It rewards loyalty. You are partnering with your best clients.",
              actionSteps: [
                {
                  title: "Design Referral Program",
                  description: "Create the offer and mechanism for referrals.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Referral Program Outline.",
                  linkTo: "StrategyFormAffiliateProgram",
                  foundationStepId: "affiliate_program",
                  detailedSteps: [
                    "Decide on the reward (cash, credit, gift).",
                    "Create a simple way to track it.",
                    "Write the email asking for the referral.",
                    "Make it double-sided (reward for them and the friend)."
                  ],
                  tips: ["Make the reward desirable.", "Ask at the moment of highest happiness."],
                  commonChallenges: ["Making the process too hard.", "Offering a reward they don't want."],
                  successCriteria: ["You have a live referral link/process.", "You have asked your top 5 clients."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Loyalty & VIP Programs",
              description: "This week you lock in your best customers. You create reasons for them to stay and spend more. A VIP program acknowledges their status and rewards their tenure.",
              whyItMatters: "Retention is cheaper than acquisition. Increasing LTV (Lifetime Value) is pure profit.",
              howItStreamlines: "It stabilizes revenue. Recurring/repeat customers provide predictable income.",
              howItBuildsRelationships: "It creates status. People love to feel like insiders.",
              actionSteps: [
                {
                  title: "Design VIP Tier",
                  description: "Create a special status for top spenders.",
                  timeEstimate: "1 Hour",
                  deliverable: "VIP Offer.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Define criteria (spend amount or tenure).",
                    "Define perks (exclusive access, discounts, service).",
                    "Name the tier.",
                    "Notify qualifying members."
                  ],
                  tips: ["Make the perks exclusive, not just expensive.", "Recognize them publicly if appropriate."],
                  commonChallenges: ["Making it too complicated.", "Offering perks that cost too much margin."],
                  successCriteria: ["Top clients feel special.", "They buy more often to keep status."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Case Studies & Testimonials",
              description: "This week you prove your worth. You capture the success stories of your clients to use in marketing. Social proof is the most powerful persuasion tool.",
              whyItMatters: "People trust peers more than brands. Stories overcome skepticism.",
              howItStreamlines: "It simplifies sales. You just show the proof instead of arguing.",
              howItBuildsRelationships: "It celebrates them. You make your client the hero of the story.",
              actionSteps: [
                {
                  title: "Gather Case Studies",
                  description: "Interview a happy client and document their win.",
                  timeEstimate: "2 Hours",
                  deliverable: "Published Case Study.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Reach out to a successful client.",
                    "Ask about their 'Before' and 'After'.",
                    "Get specific numbers/results.",
                    "Write it up or record a video."
                  ],
                  tips: ["Focus on the transformation.", "Use their exact words."],
                  commonChallenges: ["Forgetting to ask.", "Making it sound like a generic ad."],
                  successCriteria: ["You have a compelling story asset.", "The client shares it too."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Community Integration",
              description: "This week you connect your customers to each other. You facilitate peer-to-peer connection. This turns a customer base into a defensible tribe.",
              whyItMatters: "Community creates lock-in. People stay for the friends they made.",
              howItStreamlines: "Members help each other. It reduces support load.",
              howItBuildsRelationships: "It creates belonging. You provide a home, not just a product.",
              actionSteps: [
                {
                  title: "Facilitate Connections",
                  description: "Introduce customers to each other.",
                  timeEstimate: "1 Hour",
                  deliverable: "Connected Community.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Create a space (Group, Slack, Event).",
                    "Introduce people with similar goals.",
                    "Highlight member wins.",
                    "Encourage peer support."
                  ],
                  tips: ["Be the host, not the hero.", "Set clear guidelines."],
                  commonChallenges: ["Empty room syndrome.", "Toxic behavior (moderate fast)."],
                  successCriteria: ["Members are talking to each other.", "The group feels alive."]
                }
              ],
              tools: [tools.mission],
              resources: []
            }
          ]
        }
      ]
    }
  }
};

const growth = {
  title: "Growth Stage",
  description: "Scale and expand established business through optimization, partnerships, community",
  goals: {
    business_optimization: {
      title: "Business Growth & Optimization",
      description: "Optimize operations, increase efficiency, scale revenue using automation and team building.",
      months: [
        {
          title: "Month 1: Operations Analysis",
          focus: "Audit operations, identify bottlenecks, implement systems for scalable growth",
          weeks: [
             {
              title: "Operational Audit",
              description: "This week is about finding the leaks. You will analyze your time and your team's time to see where effort is being wasted. This diagnostic is crucial before you try to scale.",
              whyItMatters: "Scaling chaos just creates more chaos. You must streamline before you amplify.",
              howItStreamlines: "It identifies waste immediately. You stop doing low-value tasks.",
              howItBuildsRelationships: "It frees up time for clients. You spend less time fighting fires and more time serving.",
              actionSteps: [
                {
                  title: "Conduct Time Study",
                  description: "Track where every hour goes for one week.",
                  timeEstimate: "Ongoing",
                  deliverable: "Time Usage Report.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Use a timer or app.",
                    "Categorize tasks as High Value vs. Low Value.",
                    "Identify interruptions.",
                    "Highlight tasks that can be delegated."
                  ],
                  tips: ["Be honest, don't edit your log.", "Track breaks too."],
                  commonChallenges: ["Forgetting to log.", "Justifying wasted time."],
                  successCriteria: ["You know your hourly rate.", "You have a list of tasks to kill."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "Cost & Expense Audit",
              description: "This week you clean up the finances. You review every subscription, vendor, and expense to cut fat. Lean operations are more profitable and resilient.",
              whyItMatters: "Profit margin matters more than top-line revenue. Wasted cash drags you down.",
              howItStreamlines: "It simplifies bookkeeping. Fewer transactions to manage.",
              howItBuildsRelationships: "You can reinvest savings into better customer experience.",
              actionSteps: [
                {
                  title: "Review P&L",
                  description: "Analyze bank statements for the last 3 months.",
                  timeEstimate: "2 Hours",
                  deliverable: "Expense Reduction Plan.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "List all recurring charges.",
                    "Cancel unused software.",
                    "Negotiate vendor contracts.",
                    "Identify high-cost low-return areas."
                  ],
                  tips: ["Be ruthless.", "Ask 'does this directly help the customer?'."],
                  commonChallenges: ["Holding onto 'might need it someday' tools.", "Ignoring small charges."],
                  successCriteria: ["You saved 10-20% on monthly burn.", "You feel financially lighter."]
                }
              ],
              tools: [tools.financial],
              resources: []
            },
            {
              title: "Identify Bottlenecks",
              description: "This week you find the constraint. You identify the one part of your business that slows everything else down. Fixing this one thing yields the biggest result.",
              whyItMatters: "A chain is only as strong as its weakest link. Improving non-bottlenecks is a waste of time.",
              howItStreamlines: "It unblocks flow. Work moves faster through the system.",
              howItBuildsRelationships: "It speeds up delivery. Customers get their result faster.",
              actionSteps: [
                {
                  title: "Constraint Analysis",
                  description: "Find the choke point in your delivery.",
                  timeEstimate: "1 Hour",
                  deliverable: "Bottleneck Report.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Map the flow of work.",
                    "Look for piles of work waiting.",
                    "Look for stressed team members.",
                    "Identify the limiting factor (Sales? Delivery? Admin?)."
                  ],
                  tips: ["It's usually a person or a policy.", "Ask 'what prevents us from doubling?'."],
                  commonChallenges: ["Blaming the market.", "Ignoring internal issues."],
                  successCriteria: ["You know exactly what to fix first.", "You have a plan to widen the pipe."]
                }
              ],
              tools: [tools.process],
              resources: []
            },
            {
              title: "Standardization",
              description: "This week you create the 'One Best Way'. You ensure that tasks are done the same way every time, regardless of who does them. This is the prerequisite for automation.",
              whyItMatters: "Consistency is quality. You can't improve a process that changes every time.",
              howItStreamlines: "It reduces decision fatigue. You just follow the recipe.",
              howItBuildsRelationships: "Reliability builds trust. Customers know what to expect.",
              actionSteps: [
                {
                  title: "Standardize Core Deliverable",
                  description: "Create a checklist for your main product/service.",
                  timeEstimate: "2 Hours",
                  deliverable: "Master Checklist.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Walk through the process.",
                    "Write down every required step.",
                    "Create a template/form.",
                    "Test it on the next order."
                  ],
                  tips: ["Include screenshots.", "Keep it simple enough to skim."],
                  commonChallenges: ["Making it too rigid.", "Not updating it."],
                  successCriteria: ["Errors decrease.", "Speed increases."]
                }
              ],
              tools: [tools.sop],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Systems & Automation",
          focus: "Implement automation, build scalable systems, optimize resource allocation",
          weeks: [
             {
              title: "Automate Repetitive Tasks",
              description: "This week you replace manual work with machines. You will use software to handle the repetitive, low-value tasks you identified. This buys back your time forever.",
              whyItMatters: "Automation scales infinitely; you do not. It is the only way to grow without working 24/7.",
              howItStreamlines: "It removes human error. Robots don't get tired or forget steps.",
              howItBuildsRelationships: "It speeds up response times. Customers get instant confirmations and updates.",
              actionSteps: [
                {
                  title: "Implement One Zap/Automation",
                  description: "Automate a single workflow using a tool like Zapier.",
                  timeEstimate: "1 Hour",
                  deliverable: "Live Automation.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Pick a simple task (e.g., save email attachment to Drive).",
                    "Map the trigger and action.",
                    "Build it in your automation tool.",
                    "Test it to ensure reliability."
                  ],
                  tips: ["Start simple.", "Document what the automation does."],
                  commonChallenges: ["Over-engineering.", "Breaking existing processes."],
                  successCriteria: ["The task happens without you touching it.", "You feel a sense of relief."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Document Core SOPs",
              description: "This week you build your knowledge base. You document the complex tasks that require human judgment. This allows you to train others and protect against brain drain.",
              whyItMatters: "If it's only in your head, you don't own a business; you have a job. Documentation is equity.",
              howItStreamlines: "Training becomes faster. New hires just read the manual.",
              howItBuildsRelationships: "Consistency. Your team delivers your standard of excellence.",
              actionSteps: [
                {
                  title: "Write 3 Critical SOPs",
                  description: "Document the most important daily tasks.",
                  timeEstimate: "3 Hours",
                  deliverable: "SOP Docs.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Choose high-risk/high-frequency tasks.",
                    "Record a Loom video doing it.",
                    "Bullet point the steps.",
                    "Add 'Why this matters' context."
                  ],
                  tips: ["Use video, it's faster.", "Update them regularly."],
                  commonChallenges: ["Writing novels nobody reads.", "Being perfectionist."],
                  successCriteria: ["Someone else can do the task using only the doc.", "You have started your operations manual."]
                }
              ],
              tools: [tools.sop],
              resources: []
            },
            {
              title: "Centralize Data",
              description: "This week you break down silos. You ensure all your data lives in one source of truth (CRM/Project Management). No more hunting through sticky notes and spreadsheets.",
              whyItMatters: "Fragmented data leads to mistakes and lost opportunities. You need a complete picture.",
              howItStreamlines: "Reporting becomes instant. You can see the health of the business in one glance.",
              howItBuildsRelationships: "You know the full history of every client. You treat them like individuals.",
              actionSteps: [
                {
                  title: "CRM Cleanup",
                  description: "Consolidate contacts and deals.",
                  timeEstimate: "2 Hours",
                  deliverable: "Clean CRM.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Import contacts from email/phone.",
                    "Merge duplicates.",
                    "Tag active clients vs leads.",
                    "Set up a pipeline view."
                  ],
                  tips: ["Garbage in, garbage out.", "Make it a weekly habit."],
                  commonChallenges: ["Keeping data updated.", "Not using the tool."],
                  successCriteria: ["You trust your dashboard.", "You can find any client info instantly."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Optimize Tech Stack",
              description: "This week you connect your tools. You ensure your CRM talks to your Email, and your Email talks to your Billing. Integrated systems create a seamless flow.",
              whyItMatters: "Manual data entry is a waste of life. Integration reduces error and lag.",
              howItStreamlines: "Data moves instantly. Actions trigger reactions automatically.",
              howItBuildsRelationships: "It enables triggers (e.g., email sent when payment fails). It's proactive.",
              actionSteps: [
                {
                  title: "Build Integrations",
                  description: "Connect your core platforms.",
                  timeEstimate: "2 Hours",
                  deliverable: "Integrated Stack.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Map the data flow.",
                    "Use native integrations or Zapier.",
                    "Test the data transfer.",
                    "Document the connection."
                  ],
                  tips: ["Check for sync errors.", "Keep a log."],
                  commonChallenges: ["Data conflicts.", "Infinite loops."],
                  successCriteria: ["You enter data once, and it updates everywhere.", "Systems work in harmony."]
                }
              ],
              tools: [tools.process],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Team & Revenue Scaling",
          focus: "Build team, scale revenue streams, prepare for next growth phase",
          weeks: [
             {
              title: "Delegate to Elevate",
              description: "This week you hand off ownership. You will assign a major responsibility to a team member or contractor. This transition from 'doing' to 'leading' is the hallmark of growth.",
              whyItMatters: "You are the bottleneck. Removing yourself from the critical path allows the business to flow faster.",
              howItStreamlines: "It creates parallel processing. Multiple things happen at once.",
              howItBuildsRelationships: "It empowers your team. They feel trusted and valued.",
              actionSteps: [
                {
                  title: "Create Delegation SOP",
                  description: "Write the Standard Operating Procedure for the task you are handing off.",
                  timeEstimate: "1 Hour",
                  deliverable: "Completed SOP.",
                  linkTo: "SOPs", // Assuming SOP page exists
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Record yourself doing the task.",
                    "Write step-by-step instructions.",
                    "Define what 'done' looks like.",
                    "Set a review schedule."
                  ],
                  tips: ["Use video and text.", "Assume zero prior knowledge."],
                  commonChallenges: ["Micromanaging.", "Being vague about expectations."],
                  successCriteria: ["Someone else does the task correctly.", "You don't have to fix it."]
                }
              ],
              tools: [tools.mission],
              resources: []
            },
            {
              title: "Hire/Outsource",
              description: "This week you expand capacity. You recruit the talent needed to execute the SOPs you created. Whether a freelancer or employee, you are buying back time.",
              whyItMatters: "Revenue is limited by your time. Hiring decouples growth from your personal hours.",
              howItStreamlines: "Specialists do it faster. You stop struggling with tasks you hate.",
              howItBuildsRelationships: "Better service. A dedicated support person responds faster than a busy founder.",
              actionSteps: [
                {
                  title: "Post Job/Gig",
                  description: "Attract the right talent.",
                  timeEstimate: "1 Hour",
                  deliverable: "Job Post & Candidates.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Write a clear job description.",
                    "Define success metrics.",
                    "Post on relevant boards (Upwork, LinkedIn).",
                    "Screen applicants."
                  ],
                  tips: ["Hire for attitude, train for skill.", "Give a small test project."],
                  commonChallenges: ["Hiring in a panic.", "Hiring yourself (clones)."],
                  successCriteria: ["You have 3 qualified candidates.", "You are excited to hand off work."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Onboarding & Training",
              description: "This week you invest in success. You spend time training your new help so they can fly solo. Upfront investment here prevents months of frustration later.",
              whyItMatters: "Throwing people into the deep end leads to drowning. Good onboarding creates loyal, effective team members.",
              howItStreamlines: "It prevents rework. They get it right the first time.",
              howItBuildsRelationships: "Team culture improves. They feel supported and set up to win.",
              actionSteps: [
                {
                  title: "Conduct Onboarding",
                  description: "Walk them through the systems and SOPs.",
                  timeEstimate: "Ongoing",
                  deliverable: "Trained Team Member.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Share the vision and values.",
                    "Walk through the tools.",
                    "Assign the first SOP.",
                    "Review their output and give feedback."
                  ],
                  tips: ["Be patient.", "Encourage questions."],
                  commonChallenges: ["Expecting perfection immediately.", "Being unavailable."],
                  successCriteria: ["They execute the task independently.", "You trust them."]
                }
              ],
              tools: [tools.process],
              resources: []
            },
            {
              title: "Scale Revenue",
              description: "This week you turn up the volume. With systems and team in place, you can handle more business. You focus entirely on sales and marketing to fill the new capacity.",
              whyItMatters: "Capacity without demand is waste. Now that you can deliver, you must sell.",
              howItStreamlines: "Sales becomes your focus. You aren't distracted by delivery.",
              howItBuildsRelationships: "You can serve more people. Your impact grows.",
              actionSteps: [
                {
                  title: "Launch Growth Campaign",
                  description: "Drive traffic to your optimized machine.",
                  timeEstimate: "Ongoing",
                  deliverable: "Increased Revenue.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Increase ad spend.",
                    "Send more emails.",
                    "Ask for more referrals.",
                    "Partner with larger affiliates."
                  ],
                  tips: ["Monitor quality control.", "Don't break the new team."],
                  commonChallenges: ["Scaling too fast.", "Breaking systems."],
                  successCriteria: ["Revenue hits a new high.", "Delivery remains smooth."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            }
          ]
        }
      ]
    },
    partnerships: {
      title: "Expand Through Partnerships",
      description: "Build strategic alliances using partnership frameworks and community connections to accelerate growth.",
      months: [
        {
          title: "Month 1: Partnership Strategy",
          focus: "Define criteria, identify partners, create outreach framework",
          weeks: [
             {
              title: "Define Ideal Partner Profile",
              description: "This week you decide who you want to align with. Just like your ideal client, your ideal partner must share your values and serve your audience. Strategic fit is more important than just audience size.",
              whyItMatters: "Bad partnerships damage your reputation. Good ones double your reach overnight.",
              howItStreamlines: "It filters opportunities. You quickly spot good matches.",
              howItBuildsRelationships: "It serves your audience. You introduce them to other trusted experts they need.",
              actionSteps: [
                {
                  title: "Create Partner Avatar",
                  description: "List the traits of your perfect strategic partner.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partner Profile.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Identify complementary industries.",
                    "Check for audience overlap.",
                    "Verify value alignment.",
                    "Look for similar business maturity."
                  ],
                  tips: ["Think 'upstream' and 'downstream' of your service.", "Look for non-competitors."],
                  commonChallenges: ["Chasing big names with no alignment.", "Ignoring smaller, high-quality partners."],
                  successCriteria: ["You have a list of 10 potential partners.", "You know exactly why they fit."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Build Prospect List",
              description: "This week you hunt. You find real businesses that match your profile and find the right contact person. A targeted list is the fuel for your outreach campaign.",
              whyItMatters: "You can't partner with an abstract concept. You need names and emails.",
              howItStreamlines: "It batches the research. You don't switch context between researching and emailing.",
              howItBuildsRelationships: "You learn about them before you ask. You can personalize your approach.",
              actionSteps: [
                {
                  title: "Research Potential Partners",
                  description: "Build a spreadsheet of 20 targets.",
                  timeEstimate: "2 Hours",
                  deliverable: "Target List.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Search LinkedIn/Social Media.",
                    "Ask your network for intros.",
                    "Find specific contact names (not info@).",
                    "Note a specific reason to connect."
                  ],
                  tips: ["Quality over quantity.", "Look for people already doing partnerships."],
                  commonChallenges: ["Not finding direct emails.", "Adding bad fits just to fill the list."],
                  successCriteria: ["You have 20 verified leads.", "You have a 'hook' for each."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Define Partnership Value",
              description: "This week you clarify what YOU bring to the table. Why should they partner with you? You define your assets, audience, and offer to make it a no-brainer for them.",
              whyItMatters: "Partnerships are reciprocal. If you don't offer value, you are just begging.",
              howItStreamlines: "It makes pitching easy. You know your selling points.",
              howItBuildsRelationships: "It shows respect. You are approaching as a peer, not a leech.",
              actionSteps: [
                {
                  title: "Create Partnership One-Pager",
                  description: "A summary of your audience stats and offer.",
                  timeEstimate: "1 Hour",
                  deliverable: "Media Kit/One-Pager.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "List your audience size/demographics.",
                    "Highlight engagement rates.",
                    " propose specific collaboration ideas.",
                    "Include testimonials."
                  ],
                  tips: ["Make it visually professional.", "Focus on WIIFM (What's in it for them)."],
                  commonChallenges: ["Being shy about your numbers.", "Overselling."],
                  successCriteria: ["You look professional.", "The value proposition is obvious."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Outreach Strategy",
              description: "This week you plan the attack. You decide how you will contact them (Email, DM, Phone) and what you will say. A systematic approach ensures you follow up and don't drop the ball.",
              whyItMatters: "The money is in the follow-up. A system ensures you are persistent without being annoying.",
              howItStreamlines: "You track status. You know who replied and who needs a nudge.",
              howItBuildsRelationships: "You build rapport over time. You don't just pitch and run.",
              actionSteps: [
                {
                  title: "Setup Outreach Tracker",
                  description: "Create a system to manage the pipeline.",
                  timeEstimate: "1 Hour",
                  deliverable: "CRM/Sheet Tracker.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Create columns for Status, Last Contact, Next Step.",
                    "Draft your initial outreach scripts.",
                    "Draft follow-up scripts.",
                    "Schedule time for daily outreach."
                  ],
                  tips: ["Use a tool like Hunter.io for emails.", "Personalize every script."],
                  commonChallenges: ["Using generic templates.", "Not scheduling follow-up."],
                  successCriteria: ["You are ready to hit send.", "You have a plan for 'no'."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Partnership Development",
          focus: "Reach out, negotiate terms, establish partnerships",
          weeks: [
            {
              title: "Craft the Win-Win Pitch",
              description: "This week you create your outreach strategy. You will design a proposal that emphasizes value for the partner first. The best pitches make it impossible to say no because the benefit is so clear.",
              whyItMatters: "Cold outreach fails if it's selfish. Generosity opens doors.",
              howItStreamlines: "It speeds up negotiation. The terms are clear and attractive from the start.",
              howItBuildsRelationships: "It starts the relationship on the right foot. You are a giver, not a taker.",
              actionSteps: [
                {
                  title: "Draft Partnership Proposal",
                  description: "Write a template email/pitch deck for potential partners.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Outreach Template.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Research the partner deeply.",
                    "Identify a gap you can fill for them.",
                    "Propose a specific, low-risk first step.",
                    "Highlight the benefit to *their* audience."
                  ],
                  tips: ["Keep it short.", "Focus on 'giving' first."],
                  commonChallenges: ["Making the proposal all about you.", "Being vague about the next step."],
                  successCriteria: ["The email is personalized.", "It has a clear Call to Action."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Execute Outreach",
              description: "This week you make contact. You send the emails, make the calls, and start the conversations. You focus on building a connection, not just closing a deal.",
              whyItMatters: "Nothing happens until you speak. Activity drives results.",
              howItStreamlines: "Batching emails saves energy. You get into a flow.",
              howItBuildsRelationships: "You are human. You ask questions and listen.",
              actionSteps: [
                {
                  title: "Send 10 Pitches",
                  description: "Contact your top tier prospects.",
                  timeEstimate: "2 Hours",
                  deliverable: "Sent Emails/DMs.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Customize your template for each person.",
                    "Comment on their recent work to show you pay attention.",
                    "Send the message.",
                    "Log it in your tracker."
                  ],
                  tips: ["Send early in the week.", "Follow up on a different channel if needed."],
                  commonChallenges: ["Fear of rejection.", "Typos in names."],
                  successCriteria: ["You have started conversations.", "You have overcome the fear of asking."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Negotiate & Structure",
              description: "This week you define the deal. You discuss specifics: commission rates, dates, deliverables. Clarity here prevents conflict later.",
              whyItMatters: "Vague agreements lead to resentment. Contracts protect the relationship.",
              howItStreamlines: "It removes ambiguity. Both sides know exactly what to do.",
              howItBuildsRelationships: "Professionalism builds trust. They know you take it seriously.",
              actionSteps: [
                {
                  title: "Finalize Agreement",
                  description: "Agree on terms and sign.",
                  timeEstimate: "1 Hour",
                  deliverable: "Signed Partnership Agreement.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Discuss revenue share/fees.",
                    "Set deadlines for deliverables.",
                    "Agree on promotion methods.",
                    "Put it in writing (email or contract)."
                  ],
                  tips: ["Use a simple MOU (Memorandum of Understanding).", "Be fair."],
                  commonChallenges: ["Being afraid to talk money.", "Assuming they know what you mean."],
                  successCriteria: ["You have a launch date.", "Money terms are clear."]
                }
              ],
              tools: [tools.financial],
              resources: []
            },
            {
              title: "Asset Co-Creation",
              description: "This week you build the materials. You create the graphics, emails, and landing pages for the partnership. You make it easy for the partner to promote you.",
              whyItMatters: "Partners are busy. If you do the work for them, they are more likely to promote.",
              howItStreamlines: "You control the brand message. You ensure quality.",
              howItBuildsRelationships: "You serve them. You make them look good to their audience.",
              actionSteps: [
                {
                  title: "Create Swipe File",
                  description: "Build a folder of assets for your partner.",
                  timeEstimate: "2 Hours",
                  deliverable: "Partner Asset Pack.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Write email copy for them to send.",
                    "Design social graphics with their logo.",
                    "Create a custom landing page.",
                    "Send the package with instructions."
                  ],
                  tips: ["Make it 'copy-paste' ready.", "Provide multiple options."],
                  commonChallenges: ["Sending incomplete files.", "Not testing links."],
                  successCriteria: ["The partner has everything they need.", "They are impressed by your organization."]
                }
              ],
              tools: [tools.brand],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Partnership Activation",
          focus: "Launch partnerships, track results, optimize collaboration",
          weeks: [
             {
              title: "Execute Joint Promotion",
              description: "This week you go live. You and your partner will co-market to your audiences. This is the moment of truth where trust is transferred and audiences are shared.",
              whyItMatters: "Execution determines ROI. A great plan means nothing without a coordinated launch.",
              howItStreamlines: "It leverages existing assets. You use their list, they use yours.",
              howItBuildsRelationships: "It delivers value to both audiences. Everyone wins.",
              actionSteps: [
                {
                  title: "Run the Co-Marketing Campaign",
                  description: "Host the webinar, send the emails, or publish the guest post.",
                  timeEstimate: "Ongoing",
                  deliverable: "Completed Event/Campaign.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Coordinate launch times.",
                    "Cross-promote on social.",
                    "Ensure tracking links work.",
                    "Thank the partner publicly."
                  ],
                  tips: ["Over-communicate with your partner.", "Have a backup plan for tech issues."],
                  commonChallenges: ["Misaligned timing.", "One side not promoting."],
                  successCriteria: ["You gained new leads.", "The partner is happy and wants to do it again."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Track & Debrief",
              description: "This week you measure success. You look at the leads and sales generated. You discuss with the partner what went well and what could be improved.",
              whyItMatters: "You need to know the ROI. It informs future partnerships.",
              howItStreamlines: "You learn what works. You repeat success.",
              howItBuildsRelationships: "Honest feedback strengthens the bond. You show you care about their results too.",
              actionSteps: [
                {
                  title: "Conduct Partner Debrief",
                  description: "Review metrics and share feedback.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partnership Report.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Share your data (leads/sales).",
                    "Ask for their data.",
                    "Discuss audience feedback.",
                    "Pay any commissions due immediately."
                  ],
                  tips: ["Pay fast to build trust.", "Send a thank you gift."],
                  commonChallenges: ["Ghosting after the promo.", "Hiding bad results."],
                  successCriteria: ["Commission is paid.", "You have agreed to a next step."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "Nurture New Leads",
              description: "This week you welcome the new people. The partnership brought them in, now you must keep them. You deliver on the promises made during the promotion.",
              whyItMatters: "Acquisition is just step one. Retention is where the value lies.",
              howItStreamlines: "You use your existing nurture sequences. The system works.",
              howItBuildsRelationships: "You prove the partner was right to recommend you. You build trust with new faces.",
              actionSteps: [
                {
                  title: "Welcome Sequence Review",
                  description: "Ensure new leads are being onboarded.",
                  timeEstimate: "1 Hour",
                  deliverable: "Engaged New Audience.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Check email open rates for the partner segment.",
                    "Send a special welcome acknowledging the partner.",
                    "Offer additional value.",
                    "Monitor unsubscribe rates."
                  ],
                  tips: ["Reference the partner in the first email.", "Over-deliver."],
                  commonChallenges: ["Treating them like cold leads.", "Spamming them."],
                  successCriteria: ["They are engaging with your content.", "They are converting to customers."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Scale Partnership Program",
              description: "This week you double down. You take the lessons learned and apply them to new partners. You build a system to manage multiple relationships simultaneously.",
              whyItMatters: "One partnership is a project; a system is a channel. Scalability drives growth.",
              howItStreamlines: "You templatize the process. It becomes a repeatable machine.",
              howItBuildsRelationships: "You become known as a great partner. Deal flow comes to you.",
              actionSteps: [
                {
                  title: "Update Partnership SOP",
                  description: "Refine your process based on the pilot.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partnership System.",
                  linkTo: "SOPs",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Update templates with better copy.",
                    "Fix broken process steps.",
                    "Reach out to the next 5 partners.",
                    "Automate the reporting."
                  ],
                  tips: ["Always be improving.", "Ask for referrals from partners."],
                  commonChallenges: ["Stopping after one win.", "Getting complacent."],
                  successCriteria: ["You have a pipeline of partners.", "It takes less effort to launch."]
                }
              ],
              tools: [tools.process],
              resources: []
            }
          ]
        }
      ]
    },
    community: {
      title: "Build & Scale Community",
      description: "Foster engaged audience and leverage community for growth using Community platform and engagement strategies.",
      months: [
        {
          title: "Month 1: Community Foundation",
          focus: "Define vision, establish guidelines, create engagement framework",
          weeks: [
             {
              title: "Define Community Purpose",
              description: "This week you clarify why your community exists. It is not just a group chat; it is a space with a shared mission. A clear purpose attracts the right members and repels the wrong ones.",
              whyItMatters: "Aimless communities die. A strong purpose creates magnetism and retention.",
              howItStreamlines: "It makes moderation easier. You know what behavior fits the mission.",
              howItBuildsRelationships: "It connects members to each other, not just to you. That is the definition of community.",
              actionSteps: [
                {
                  title: "Draft Community Manifesto",
                  description: "Write the 'rules of engagement' and mission for the group.",
                  timeEstimate: "1 Hour",
                  deliverable: "Community Guidelines.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Define who it is for.",
                    "Define who it is NOT for.",
                    "Set the tone (supportive, critical, professional?).",
                    "Create 3 golden rules."
                  ],
                  tips: ["Make it aspirational.", "Focus on culture, not just policing."],
                  commonChallenges: ["Being too strict.", "Being too vague."],
                  successCriteria: ["Members feel safe.", "The purpose is pinned to the top."]
                }
              ],
              tools: [tools.mission],
              resources: []
            },
            {
              title: "Choose & Setup Platform",
              description: "This week you build the house. You select the technology that will host your tribe. You set up the channels, permissions, and branding to welcome your first guests.",
              whyItMatters: "The container shapes the culture. The right tool reduces friction for members.",
              howItStreamlines: "Good tech automates onboarding. It organizes conversations.",
              howItBuildsRelationships: "A user-friendly space encourages posting. Members feel comfortable.",
              actionSteps: [
                {
                  title: "Configure Community Space",
                  description: "Set up the technical infrastructure.",
                  timeEstimate: "2 Hours",
                  deliverable: "Live Community URL.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Choose platform (Skool, Circle, Facebook, Slack).",
                    "Create topic channels/categories.",
                    "Add branding (Logo, Banner).",
                    "Test the signup flow."
                  ],
                  tips: ["Start with fewer channels.", "Ensure mobile access is good."],
                  commonChallenges: ["Over-engineering the structure.", "Choosing a 'dead' platform."],
                  successCriteria: ["You can invite someone and they can join.", "It looks professional."]
                }
              ],
              tools: [tools.brand],
              resources: []
            },
            {
              title: "Seed Content Strategy",
              description: "This week you prevent the 'empty room' problem. You populate the community with valuable content before opening the doors. New members should see activity and value immediately.",
              whyItMatters: "People leave empty parties. Content signals what the space is for.",
              howItStreamlines: "It sets the standard. Members model their posts after yours.",
              howItBuildsRelationships: "It gives value immediately. Members feel smart for joining.",
              actionSteps: [
                {
                  title: "Post First 5 Threads",
                  description: "Create value posts to welcome members.",
                  timeEstimate: "1 Hour",
                  deliverable: "Active Feed.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Write a 'Welcome & Start Here' post.",
                    "Write an 'Introduce Yourself' thread.",
                    "Post a valuable resource/guide.",
                    "Ask a provocative question."
                  ],
                  tips: ["Tag people if you have early testers.", "Reply to your own posts if needed to add info."],
                  commonChallenges: ["Waiting for others to post.", "Posting boring updates."],
                  successCriteria: ["The feed looks alive.", "There are places to comment."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Founding Member Launch",
              description: "This week you open the velvet rope. You invite a small, hand-picked group of 'Founding Members' to set the culture. These are your most trusted people.",
              whyItMatters: "Culture is set by the first 50 people. Curate them carefully.",
              howItStreamlines: "They generate content for you. They help welcome future members.",
              howItBuildsRelationships: "It honors them. They feel special and invested in the success.",
              actionSteps: [
                {
                  title: "Invite First 20 Members",
                  description: "Personally reach out to seed the group.",
                  timeEstimate: "2 Hours",
                  deliverable: "20 Active Members.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Identify your biggest fans/clients.",
                    "Send a personal invite explaining the vision.",
                    "Give them 'Founding Member' status.",
                    "Ask them to introduce themselves."
                  ],
                  tips: ["Make it exclusive.", "Ask for their help to build it."],
                  commonChallenges: ["Mass emailing invites.", "Ignoring them once they join."],
                  successCriteria: ["You have 20 people in the group.", "Introductions are flowing."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            }
          ]
        },
        {
          title: "Month 2: Community Growth",
          focus: "Recruit members, create valuable content, build engagement",
          weeks: [
             {
              title: "Seed Engagement",
              description: "This week you spark the fire. You cannot wait for members to talk; you must lead the conversation. You will create rituals and prompts that make it easy for members to participate.",
              whyItMatters: "Empty rooms stay empty. Activity breeds activity.",
              howItStreamlines: "Rituals reduce your content load. 'Win Wednesdays' happen automatically.",
              howItBuildsRelationships: "It highlights members. You make them the stars of the show.",
              actionSteps: [
                {
                  title: "Create Weekly Rituals",
                  description: "Design recurring posts to drive engagement.",
                  timeEstimate: "1 Hour",
                  deliverable: "Engagement Calendar.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Pick a theme for each day (e.g., Motivation Monday).",
                    "Schedule the posts in advance.",
                    "Tag specific members to start the conversation.",
                    "Reply to every single comment."
                  ],
                  tips: ["Ask open-ended questions.", "Use polls for easy engagement."],
                  commonChallenges: ["Giving up too soon.", "Posting and ghosting."],
                  successCriteria: ["Members start posting without you.", "Discussions are happening."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Event Strategy",
              description: "This week you bring people together live. You plan and host a virtual event (webinar, Q&A, hangout). Live interaction accelerates trust and connection faster than text.",
              whyItMatters: "Seeing faces humanizes the group. It creates shared memories.",
              howItStreamlines: "It creates content. You can record it and post it later.",
              howItBuildsRelationships: "It breaks down barriers. Members see you as a real person.",
              actionSteps: [
                {
                  title: "Host Community Call",
                  description: "Run a live Zoom/Stream for members.",
                  timeEstimate: "2 Hours",
                  deliverable: "Recorded Event.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Pick a topic or format (Q&A is easiest).",
                    "Schedule it and send reminders.",
                    "Host the session.",
                    "Post the replay."
                  ],
                  tips: ["Keep it under an hour.", "Call people by name."],
                  commonChallenges: ["Fear of no one showing up.", "Tech failures."],
                  successCriteria: ["People attended.", "They asked questions."]
                }
              ],
              tools: [tools.content],
              resources: []
            },
            {
              title: "Growth Loops",
              description: "This week you open the gates wider. You create mechanisms for members to invite others or for outsiders to find the group. You shift from curation to growth.",
              whyItMatters: "Communities need fresh blood to stay alive. Growth brings new energy.",
              howItStreamlines: "Members recruit for you. Viral loops reduce marketing cost.",
              howItBuildsRelationships: "Members feel ownership. They want their friends to join.",
              actionSteps: [
                {
                  title: "Launch Public Invite",
                  description: "Promote the community to your email list/social.",
                  timeEstimate: "1 Hour",
                  deliverable: "New Member Influx.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Write an email selling the benefits of joining.",
                    "Create a social post showcasing the discussions.",
                    "Create a simple join link.",
                    "Welcome the new wave."
                  ],
                  tips: ["Show, don't just tell.", "Highlight member wins."],
                  commonChallenges: ["Diluting the culture.", "Overwhelming the feed."],
                  successCriteria: ["Membership grows by 20%.", "Culture remains strong."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Moderation & Culture",
              description: "This week you protect the garden. You establish moderation practices to keep the space safe and high-quality. You learn to handle conflict and enforce boundaries gracefully.",
              whyItMatters: "One toxic member can kill a community. Safety is a prerequisite for vulnerability.",
              howItStreamlines: "Rules prevent arguments. You spend less time mediating.",
              howItBuildsRelationships: "Members respect you for protecting them. It deepens trust.",
              actionSteps: [
                {
                  title: "Refine Moderation",
                  description: "Review and enforce guidelines.",
                  timeEstimate: "1 Hour",
                  deliverable: "Safe Space.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Delete spam immediately.",
                    "Reach out privately to rule-breakers.",
                    "Praise good behavior publicly.",
                    "Update guidelines if needed."
                  ],
                  tips: ["Be firm but kind.", "Don't let things fester."],
                  commonChallenges: ["Being afraid to kick people out.", "Letting spam slide."],
                  successCriteria: ["The feed is high quality.", "Members report spam for you."]
                }
              ],
              tools: [tools.audit],
              resources: []
            }
          ]
        },
        {
          title: "Month 3: Community Monetization",
          focus: "Leverage community for business growth, create member success stories",
          weeks: [
             {
              title: "Identify Power Users",
              description: "This week you find your champions. You will identify the most active and helpful members and elevate them. These people will become your moderators, advocates, and best customers.",
              whyItMatters: "You cannot manage a large community alone. You need lieutenants.",
              howItStreamlines: "It decentralizes leadership. The community becomes self-healing.",
              howItBuildsRelationships: "It rewards contribution. Status is a powerful motivator.",
              actionSteps: [
                {
                  title: "Launch Ambassador Program",
                  description: "Invite top members to a special role.",
                  timeEstimate: "2 Hours",
                  deliverable: "Ambassador Group.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Review engagement stats.",
                    "Reach out personally to top 5 members.",
                    "Offer them a special badge or access.",
                    "Ask for their feedback on the community."
                  ],
                  tips: ["Make them feel special.", "Listen to their advice."],
                  commonChallenges: ["Picking the wrong people.", "Expecting them to work for free (give perks!)."],
                  successCriteria: ["You have a trusted inner circle.", "They defend the culture."]
                }
              ],
              tools: [tools.persona],
              resources: []
            },
            {
              title: "Monetization Strategy",
              description: "This week you harvest the value. You introduce paid offers to the community in a way that feels natural and helpful. You turn engagement into revenue.",
              whyItMatters: "Communities take work; they need to pay for themselves. Revenue allows you to invest more in the group.",
              howItStreamlines: "You have a warm audience. Sales are faster and easier.",
              howItBuildsRelationships: "You solve bigger problems for them. Paid products offer deeper solutions.",
              actionSteps: [
                {
                  title: "Make an Offer",
                  description: "Present a product/service to the group.",
                  timeEstimate: "1 Hour",
                  deliverable: "Sales.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Identify a problem the community is discussing.",
                    "Position your product as the solution.",
                    "Offer a 'Member Exclusive' discount.",
                    "Share success stories."
                  ],
                  tips: ["Don't be pushy.", "Focus on value."],
                  commonChallenges: ["Fear of 'ruining' the community.", "Selling irrelevant stuff."],
                  successCriteria: ["Members buy.", "They thank you for the offer."]
                }
              ],
              tools: [tools.funnel],
              resources: []
            },
            {
              title: "Community Feedback Loop",
              description: "This week you ask 'How are we doing?'. You survey the members to see what they value and what they want changed. This ensures the community remains relevant.",
              whyItMatters: "Communities evolve. You need to stay aligned with member needs.",
              howItStreamlines: "It prevents churn. You fix issues before people leave.",
              howItBuildsRelationships: "It shows humility. You value their input.",
              actionSteps: [
                {
                  title: "Run Member Survey",
                  description: "Collect qualitative feedback.",
                  timeEstimate: "1 Hour",
                  deliverable: "Community Health Report.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Create a simple form.",
                    "Ask 'What is your favorite part?'.",
                    "Ask 'What would you change?'.",
                    "Share the results and your plan."
                  ],
                  tips: ["Act on the feedback.", "Be transparent."],
                  commonChallenges: ["Ignoring the results.", "Getting defensive."],
                  successCriteria: ["You know what to build next.", "Members feel heard."]
                }
              ],
              tools: [tools.audit],
              resources: []
            },
            {
              title: "The Self-Sustaining Flywheel",
              description: "This week you step back. You ensure the systems, content, and leaders are in place for the community to thrive without your constant presence. You move from 'Manager' to 'Leader'.",
              whyItMatters: "You need a break. A healthy community survives when the founder sleeps.",
              howItStreamlines: "It frees your time. The community generates its own value.",
              howItBuildsRelationships: "Peer-to-peer value is infinite. You are no longer the bottleneck.",
              actionSteps: [
                {
                  title: "Operations Review",
                  description: "Ensure SOPs and Ambassadors are working.",
                  timeEstimate: "2 Hours",
                  deliverable: "Automated Community.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Check if moderation is happening automatically.",
                    "Check if content is scheduled.",
                    "Check if new members are welcomed.",
                    "Take a day off and see what happens."
                  ],
                  tips: ["Trust your team.", "Celebrate independence."],
                  commonChallenges: ["Micromanaging.", "Fear of irrelevance."],
                  successCriteria: ["The community thrives while you rest.", "It is a true asset."]
                }
              ],
              tools: [tools.process],
              resources: []
            }
          ]
        }
      ]
    }
  }
};

const roadmapData = { vision, startup, growth };
export default roadmapData;