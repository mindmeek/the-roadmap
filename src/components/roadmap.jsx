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
  funnel: { name: "Sales Funnel Builder", icon: "Filter" }
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
            }
            // Additional weeks for Month 2 would go here
          ]
        },
        {
          title: "Month 3: Launch & Growth",
          focus: "Launch first offer, get customers, set up systems, plan next 90 days",
          weeks: [
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
            }
            // Additional weeks for Month 3 would go here
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
              tools: [tools.content],
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
              tools: [tools.content],
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
            }
          ]
        }
      ]
    }
  }
};

const roadmapData = { vision, startup, growth };
export default roadmapData;