import { createPageUrl } from "@/utils";
import { nonProfitGrowthRoadmap } from './course_content/nonProfitGrowth';
import { ecommerceGrowthRoadmap } from './course_content/ecommerceGrowth';
import { privateCommunityGrowthRoadmap } from './course_content/privateCommunityGrowth';
import { socialBusinessGrowthRoadmap } from './course_content/socialBusinessGrowth';
nonProfitGrowthRoadmap.businessType = "non_profit";
nonProfitGrowthRoadmap.stage = "startup";
nonProfitGrowthRoadmap.icon = "❤️";

ecommerceGrowthRoadmap.businessType = "for_profit";
ecommerceGrowthRoadmap.stage = "startup";
ecommerceGrowthRoadmap.icon = "🛒";

privateCommunityGrowthRoadmap.businessType = "for_profit";
privateCommunityGrowthRoadmap.stage = "growth";
privateCommunityGrowthRoadmap.icon = "👥";

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
              description: "This week is fundamentally about digging deep to uncover the profound 'Why' that drives your business forward. A strong, articulated vision acts as your unwavering north star, guiding every single strategic decision you will make in the future. By defining your mission, vision, and core values now, you are setting a solid, unshakeable foundation for all your future growth. This process prevents you from drifting off course when challenges arise and ensures that your brand communicates a consistent message to the world. You are not just starting a business; you are planting the seed of a legacy.",
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
                    "Start by deeply reflecting on the specific problem or pain point you solve for your customers. Don't just identify the functional issue; dig down to the emotional root of their struggle and write down exactly how it makes them feel (e.g., frustrated, overwhelmed, fearful).",
                    "Next, clearly identify and describe your primary target audience and who benefits most from your work. Be specific about their demographics and situation so you know exactly who you are speaking to—generalities like 'everyone' kill marketing.",
                    "Articulate the specific value or transformation you provide to this audience. Focus on the 'after' state—how is their life better, easier, or different after they have used your product or service? This is the promise you are making.",
                    "Combine these elements into a single, powerful, and grammatical sentence that is easy to memorize. Read it aloud to ensure it flows well and doesn't sound like corporate jargon; it should sound like something you'd say to a friend."
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
                    "Brainstorm a long list of values and attributes that are personally important to you. Think about times when you felt proud of your work or times when you felt compromised, and what values were at play in those moments.",
                    "Look for patterns in your list and group similar values together under a common theme. Try to distill these groups into single, powerful words that capture the essence of the cluster (e.g., 'Transparency' instead of just 'Honesty').",
                    "Select the top 3-5 themes that resonate most deeply and feel essential to your vision. These should be values you would be willing to lose money to uphold, not just nice-to-haves that sound good on a poster.",
                    "Write a brief, action-oriented definition for each value. Instead of just 'Integrity', write 'We always tell the truth, even when it costs us', to make it actionable and clear for everyone in the organization."
                  ],
                  tips: ["Choose values that are authentic to you.", "Consider how these values impact daily operations."],
                  commonChallenges: ["Choosing aspirational values that aren't practiced.", "Ignoring values in tough decisions."],
                  successCriteria: ["You can explain why each value matters.", "They help you make difficult choices."]
                }
              ],
              resources: [
                { title: "Mission & Vision Template", type: "Tool", icon: "FileText", link: "StrategyFormMissionVision" },
                { title: "Guide: Crafting a Compelling Vision", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Power of Why", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Overcoming Imposter Syndrome", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Personal Brand", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 7-Day Business Launch", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Need Help? Ask the Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Identify Your Ideal Client",
              description: "This week you will create a detailed profile of the perfect customer for your business. Understanding exactly who you are serving allows you to tailor your marketing messages so they land with impact. You will dig into their demographics, psychographics, pain points, and deepest desires. The better you know them, the easier it is to serve them.",
              whyItMatters: "If you try to market to everyone, you end up appealing to no one. Specificity is the key to conversion and building a loyal tribe.",
              howItStreamlines: "Marketing becomes efficient because you know exactly where your clients hang out and what language they use. You stop wasting money on broad, ineffective advertising.",
              howItBuildsRelationships: "When clients feel understood, they trust you. Speaking directly to their specific pains creates an immediate emotional bond.",
              actionSteps: [
                {
                  title: "Create Your Avatar",
                  description: "Develop a comprehensive persona for your ideal client, giving them a name, age, and backstory. This isn't just data; it's a character study of the human being you are destined to serve.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Completed Ideal Client Profile document.",
                  linkTo: "StrategyFormIdealClient",
                  foundationStepId: "ideal_client",
                  detailedSteps: [
                    "Research your market to understand common traits of potential buyers. Look at forums, social media groups, and reviews to see who is already asking for solutions like yours and what language they use.",
                    "Fill out the demographic details: Age, location, job title, income. Give this person a name and a photo so they feel like a real human being you can relate to, rather than a statistic.",
                    "Dive into psychographics: What keeps them up at night? What are their secret dreams they don't tell anyone? Capture the emotional landscape of their daily life and the pressures they face.",
                    "Identify the specific trigger events that would cause them to seek your solution right now. Is it a life change, a crisis, or a specific frustration that reached a boiling point? Knowing this helps you time your marketing."
                  ],
                  tips: ["Be as specific as possible; visualize a real person.", "Focus on their problems, not just your solution."],
                  commonChallenges: ["Making the audience too broad.", "Guessing instead of researching."],
                  successCriteria: ["You can describe a 'day in the life' of your avatar.", "You know their top 3 burning pains."]
                }
              ],
              resources: [
                { title: "Ideal Client Persona Builder", type: "Tool", icon: "Users", link: "StrategyFormIdealClient" },
                { title: "Guide: Finding Your Niche", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Customer Empathy", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Fear of Niching Down", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Service Business", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Audience Discovery Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Feedback in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Analyze Your Competition",
              description: "This week involves a strategic review of the market landscape to understand who else is serving your audience. You aren't copying them; you are learning from their strengths and weaknesses to carve out your unique position. This insight is crucial for differentiation and ensuring you offer something truly valuable.",
              whyItMatters: "You cannot differentiate if you don't know what you are different from. Market awareness prevents you from launching a 'me-too' product.",
              howItStreamlines: "It prevents you from reinventing the wheel. You can see what pricing models and offers are already working in the market.",
              howItBuildsRelationships: "By filling gaps competitors miss, you become the hero for underserved customers. You solve problems others ignore.",
              actionSteps: [
                {
                  title: "Conduct SWOT Analysis",
                  description: "Perform a Strengths, Weaknesses, Opportunities, and Threats analysis for your business relative to competitors. This matrix will reveal exactly where your strategic advantage lies.",
                  timeEstimate: "2 Hours",
                  deliverable: "Completed SWOT Analysis Matrix.",
                  linkTo: "StrategyFormSWOTAnalysis",
                  foundationStepId: "swot",
                  detailedSteps: [
                    "Identify your top 3-5 direct competitors who are targeting the same audience with a similar solution. Don't ignore indirect competitors who solve the same problem in a different way (e.g., DIY vs. Done-for-you).",
                    "Analyze their websites, reviews, and offers to find their strengths and weaknesses. Look specifically for what customers complain about in 1-star reviews—these are your opportunities.",
                    "List your own internal strengths and weaknesses objectively. Be honest about what you do better than anyone else and where you currently lack resources or skills compared to the market leaders.",
                    "Identify external opportunities in the market, such as new trends or underserved niches, and potential threats like changing regulations or economic shifts that could impact your viability."
                  ],
                  tips: ["Be honest about your weaknesses.", "Look for patterns in negative competitor reviews."],
                  commonChallenges: ["Underestimating competitors.", "Being too biased about your own strengths."],
                  successCriteria: ["You have identified at least 3 opportunities to differentiate.", "You know your unique advantage."]
                }
              ],
              resources: [
                { title: "Competitor Analysis Grid", type: "Tool", icon: "BarChart3", link: "StrategyFormSWOTAnalysis" },
                { title: "Guide: Competitive Intelligence", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Blue Ocean Strategy", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Scarcity vs Abundance", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: E-commerce", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Market Validation", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Competitors in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Define Your Value Proposition",
              description: "This week brings everything together to articulate exactly why someone should buy from you. You will craft a unique value proposition (UVP) that highlights your specific solution to your avatar's specific problem. This is the core of all your future marketing and sales conversations.",
              whyItMatters: "Your UVP is the hook that grabs attention. Without it, you are just another commodity in a crowded marketplace.",
              howItStreamlines: "It clarifies your messaging across all channels. You won't struggle with what to write on your website or ads.",
              howItBuildsRelationships: "Clear promises build trust. When customers understand exactly what value they get, they feel confident buying.",
              actionSteps: [
                {
                  title: "Draft Your UVP",
                  description: "Create a clear statement that explains your offer, your target market, and your unique benefit. This statement will become the headline of your website and the core of your elevator pitch.",
                  timeEstimate: "1 Hour",
                  deliverable: "A polished Unique Value Proposition statement.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Review your Mission, Ideal Client, and Competitor analysis to find the 'white space'. Look for the specific benefit that your competitors are failing to provide effectively.",
                    "Identify the #1 biggest benefit you provide to your client. This isn't a feature; it's the ultimate result or feeling they get after using your product (e.g., 'Peace of mind', not '24/7 monitoring').",
                    "Combine 'Who it's for', 'What it does', and 'Why it's different' into a rough draft. Don't worry about making it catchy yet; just focus on making it accurate and comprehensive.",
                    "Refine into a punchy headline and sub-headline that grabs attention immediately. Test it by seeing if a stranger can understand exactly what you sell within 5 seconds of reading it."
                  ],
                  tips: ["Focus on the result, not the process.", "Use customer language, not industry jargon."],
                  commonChallenges: ["Being too clever instead of clear.", "Listing features instead of benefits."],
                  successCriteria: ["A 10-year-old can understand what you sell.", "It instantly differentiates you."]
                }
              ],
              resources: [
                { title: "Value Proposition Builder", type: "Tool", icon: "Filter", link: "StrategyFormValueProposition" },
                { title: "Guide: Writing Killer Headlines", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Irresistible Offer", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Owning Your Value", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Coaching", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Offer Creation Masterclass", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Review Your Pitch in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            }
          ]
        },
        {
          title: "Month 2: Business Structure & Brand", 
          focus: "Establish legal foundation, develop brand identity, create operational systems",
          weeks: [
            {
              title: "Legal & Financial Setup",
              description: "This week is about legitimizing your business. You will choose a business structure, register your name, and set up separate business banking. This separation is critical for liability protection and clean financial tracking. It's the difference between a hobby and a business.",
              whyItMatters: "Building on shaky legal ground is dangerous. Proper setup protects your personal assets and prepares you for taxes.",
              howItStreamlines: "Separate finances make bookkeeping and tax season infinitely easier. It automates the separation of personal and business funds.",
              howItBuildsRelationships: "Clients trust legitimate businesses. Professional invoicing and contracts signal that you are serious and reliable.",
              actionSteps: [
                {
                  title: "Set Up Business Banking",
                  description: "Open a dedicated business checking account and credit card to separate finances. This is the single most important step for protecting your personal assets and simplifying your taxes.",
                  timeEstimate: "2 Hours",
                  deliverable: "Active business bank account.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Gather your registration documents (LLC/DBA) and EIN (Employer Identification Number). You will need these official documents to prove your business exists to the bank, so have them ready in PDF form.",
                    "Research banks with low fees and good digital tools. Look for banks that integrate seamlessly with accounting software like Xero or QuickBooks to save you massive amounts of data entry time later.",
                    "Apply for a business checking account, either online or in-person. Ensure you have your personal ID and all business documents ready to expedite the process and avoid multiple trips.",
                    "Move initial startup capital into the account immediately. From this moment on, treat this account as the sole source of funds for all business expenses, never mixing it with your personal cash."
                  ],
                  tips: ["Don't mix personal expenses.", "Look for banks that integrate with accounting software."],
                  commonChallenges: ["Procrastinating due to paperwork.", "Using a personal account 'just for now'."],
                  successCriteria: ["You have a debit card for the business.", "All business expenses now come from this account."]
                }
              ],
              resources: [
                { title: "Financial Projections Tool", type: "Tool", icon: "DollarSign", link: "FreedomCalculator" },
                { title: "Guide: Startup Legal Checklist", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Financial Literacy 101", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Money Blocks", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Freelancing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Business Basics Bootcamp", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask Financial Questions in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Establish Your Brand Identity",
              description: "This week you define the visual and verbal soul of your business. You will choose your colors, fonts, logo, and brand voice. A cohesive brand makes you look professional and memorable, instilling confidence in your potential buyers before they even speak to you.",
              whyItMatters: "First impressions happen in milliseconds. A messy brand signals a messy business, while a polished brand commands higher prices.",
              howItStreamlines: "Decisions on graphics become automatic. You have a style guide to follow for everything, saving hours of design time.",
              howItBuildsRelationships: "Consistent branding builds familiarity. Familiarity builds trust, which is the currency of sales.",
              actionSteps: [
                {
                  title: "Create Brand Style Guide",
                  description: "Assemble your logo, color palette, and typography rules into a single document. This 'Brand Kit' will serve as the rulebook for all your visual communications going forward.",
                  timeEstimate: "3 Hours",
                  deliverable: "Brand Kit PDF.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Choose 3 primary brand colors that reflect the emotion of your brand. Use color psychology to pick shades that evoke the right feelings (e.g., Blue for trust, Red for energy) and ensure they look good together.",
                    "Select a header font and a body font that are easy to read and work well together. Stick to standard web fonts or Google Fonts to ensure consistency across all devices and browsers.",
                    "Design or commission a simple logo that works in both large and small sizes. Avoid overly complex designs that become unreadable when shrunk down for social media avatars or mobile screens.",
                    "Define your brand voice adjectives (e.g., 'Friendly', 'Authoritative', 'Quirky'). Write a few example sentences to demonstrate how your brand sounds in emails versus social media to keep your tone consistent."
                  ],
                  tips: ["Keep it simple.", "Ensure colors have high contrast."],
                  commonChallenges: ["Overthinking the logo.", "Changing colors every week."],
                  successCriteria: ["You have a one-page reference sheet.", "Your social profiles all match."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: DIY Branding", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Color Psychology", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Showing Up Authentically", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Creative Arts", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Brand You", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Logo Feedback in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Set Up Operational Systems",
              description: "This week you build the engine room. You will select your project management tool, file storage, and communication channels. Setting these 'rules of the road' prevents digital clutter and lost files, which are the hidden killers of productivity.",
              whyItMatters: "Disorganization costs time and money. Systems scale; chaos does not. You need a foundation that can handle growth.",
              howItStreamlines: "You stop looking for lost files. Everyone knows exactly where to work, reducing admin time by up to 30%.",
              howItBuildsRelationships: "Fast retrieval of info impresses clients. You never lose their data or forget a detail.",
              actionSteps: [
                {
                  title: "Configure Digital Workspace",
                  description: "Set up your G-Suite/Office 365 and Project Management tool. Establish the folder structures and communication channels that will keep your business organized as it grows.",
                  timeEstimate: "2 Hours",
                  deliverable: "Organized Digital HQ.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Create a standardized folder structure in your cloud storage (e.g., Marketing, Admin, Client Work). This ensures that you and future team members can always find documents instantly without searching.",
                    "Set up a dedicated business email address (yourname@yourdomain.com). This looks far more professional than a generic gmail address and builds immediate credibility with prospects.",
                    "Choose a task manager (Trello, Asana, ClickUp, etc.) that fits your working style. Create a 'Master Task List' project to dump all your to-dos out of your brain and into a trusted system.",
                    "Create templates for recurring tasks that you do often. This saves mental energy and ensures you never miss a step in your standard processes, no matter how tired you are."
                  ],
                  tips: ["Name files consistently.", "Keep the structure shallow."],
                  commonChallenges: ["Creating too many folders.", "Not using the system daily."],
                  successCriteria: ["You can find any file in 30 seconds.", "Your inbox is organized."]
                }
              ],
              resources: [
                { title: "Process Map Template", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: The Productivity Stack", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Time Management", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: From Busy to Productive", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Virtual Assistant", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Systems for Success", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Tool Recommendations", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Define Your Offer Suite",
              description: "This week you clarify exactly what you sell. You will package your expertise into a clear offer with a specific price and deliverable. This moves you from 'hourly work' to 'productized services', which are easier to sell and scale.",
              whyItMatters: "Clients need to know what to buy. Packages are easier to sell than vague hourly consulting because the outcome is defined.",
              howItStreamlines: "Proposal writing vanishes. You sell the same defined scope repeatedly, allowing you to optimize delivery.",
              howItBuildsRelationships: "Clear boundaries prevent scope creep. Clients know exactly what they get, preventing disappointment.",
              actionSteps: [
                {
                  title: "Structure Your Core Offer",
                  description: "Define the features, benefits, and price of your flagship product. This document will become the foundation for your sales pages and contracts.",
                  timeEstimate: "2 Hours",
                  deliverable: "Offer Sheet.",
                  linkTo: "StrategyFormValueLadder",
                  foundationStepId: "value_ladder",
                  detailedSteps: [
                    "List all deliverables included in your service. Be extremely specific about what the client gets (e.g., '4 one-hour calls', '1 comprehensive report', 'email access') to avoid ambiguity.",
                    "Determine the pricing model (flat fee vs. retainer) based on your value and market rates. Calculate your desired profit margin to ensure the price is sustainable for your business.",
                    "Write the sales description that highlights the outcome, not just the features. Explain how their life or business will improve after buying this specific offer—sell the destination, not the plane.",
                    "Create a simple contract or agreement template for this offer. Having this ready means you can close a deal immediately when a client says yes, striking while the iron is hot."
                  ],
                  tips: ["Focus on the outcome, not the hours.", "Offer a guarantee if possible."],
                  commonChallenges: ["Underpricing.", "Adding too many custom options."],
                  successCriteria: ["You can state the price confidently.", "The scope is crystal clear."]
                }
              ],
              resources: [
                { title: "Value Ladder Tool", type: "Tool", icon: "BarChart3", link: "StrategyFormValueLadder" },
                { title: "Guide: Pricing Your Services", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Packaging Your Expertise", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Charging Your Worth", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Consulting", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: High Ticket Offer Design", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Pricing Feedback in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            }
          ]
        },
        {
          title: "Month 3: Launch & Growth",
          focus: "Launch first offer, get customers, set up systems, plan next 90 days",
          weeks: [
            {
              title: "Build Your Digital Home",
              description: "This week you build your landing page or website. This is your 24/7 salesperson. It needs to clearly communicate your UVP and collect leads. Don't aim for perfection; aim for a functional, high-converting asset.",
              whyItMatters: "You need a place to send traffic. Social media is rented land; a website is your owned real estate where you control the message.",
              howItStreamlines: "It answers FAQs automatically. It filters out unqualified leads so you only talk to serious prospects.",
              howItBuildsRelationships: "It establishes credibility. A professional site signals you are open for business and trustworthy.",
              actionSteps: [
                {
                  title: "Launch Minimum Viable Website",
                  description: "Publish a simple, high-converting one-page site. Focus on clarity and speed over complex design to get your message out to the world quickly.",
                  timeEstimate: "4 Hours",
                  deliverable: "Live Website.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Write copy using your UVP and Mission statement. Focus on speaking directly to your avatar's pain points and offering your clear solution, avoiding generic 'Welcome to my site' text.",
                    "Choose a clean, mobile-responsive template on a platform like Squarespace, Wix, or WordPress. Avoid custom coding for now; speed is more important than unique design tricks.",
                    "Add professional photos of yourself or your product. People buy from people, so seeing a human face builds trust much faster than generic stock photos.",
                    "Ensure the contact form or 'Buy Now' button works perfectly. Test it yourself to make sure you receive the notification email, as a broken form is a lost sale."
                  ],
                  tips: ["Done is better than perfect.", "Check it on your phone."],
                  commonChallenges: ["Writing too much text.", "Broken links."],
                  successCriteria: ["The site is live.", "A stranger can understand what you do in 5 seconds."]
                }
              ],
              resources: [
                { title: "Website Launch Planner", type: "Tool", icon: "LayoutTemplate", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Website Copywriting", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Landing Page Conversions", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Perfectionism Trap", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Tech Startup", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Weekend Website Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Your Site for Review", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Pre-Launch Marketing",
              description: "This week you start building anticipation. You aren't selling yet; you are teasing the solution and building a waitlist. This ensures that when you open the doors, there are people ready to buy, creating momentum.",
              whyItMatters: "Launching to crickets is demoralizing and expensive. Building hype validates demand before you fully commit to the build.",
              howItStreamlines: "It focuses your marketing efforts on a single event. You create a burst of momentum rather than a slow trickle of interest.",
              howItBuildsRelationships: "It makes early followers feel like insiders. They get to be part of the 'founding' group, deepening their loyalty.",
              actionSteps: [
                {
                  title: "Build a Waitlist Landing Page",
                  description: "Create a simple page capturing emails of interested prospects. This allows you to gather a list of warm leads before your product is even finished.",
                  timeEstimate: "3 Hours",
                  deliverable: "Live landing page with email signup.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Write a compelling headline promising your main benefit. It should be mysterious enough to build curiosity but specific enough to attract the right people who have the problem.",
                    "Add a brief description of what is coming and why it matters. Use bullet points to highlight the key problems you will be solving and the transformation they can expect.",
                    "Embed an email signup form that connects to your email marketing tool. Keep the form simple—just ask for a first name and email address to maximize conversions.",
                    "Share the link on your social channels with a 'Coming Soon' message. Encourage your friends and network to sign up for early access to build your initial seed list."
                  ],
                  tips: ["Keep it extremely simple.", "Offer a small incentive for signing up."],
                  commonChallenges: ["Over-designing the page.", "Forgetting to test the signup form."],
                  successCriteria: ["The form collects emails correctly.", "You have your first 10 signups."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: The Launch Strategy", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Building Hype", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Fear of Visibility", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Digital Products", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 30-Day Launchpad", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Hype Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Execute Your Launch",
              description: "This is it. The week you open the doors and ask for the sale. You will execute your communication plan to drive traffic and convert leads into paying customers. Be bold, be loud, and be helpful.",
              whyItMatters: "Revenue is the lifeblood of business. A launch focuses energy to generate that initial cash flow and validate your business model.",
              howItStreamlines: "It creates a focused sales period. You aren't always 'kind of' selling; you are in a dedicated sprint.",
              howItBuildsRelationships: "It delivers the solution they've been waiting for. You are fulfilling your promise and starting the customer journey.",
              actionSteps: [
                {
                  title: "Run Launch Campaign",
                  description: "Send your sales emails and social posts. Execute the plan you created to maximize visibility and drive conversions during the launch window.",
                  timeEstimate: "Daily Effort",
                  deliverable: "New Customers.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Send the 'Doors Open' email to your waitlist immediately. Make the subject line exciting and the call to action very clear so they know exactly how to buy.",
                    "Post daily social proof and testimonials throughout the week. Show real people getting real results to overcome skepticism and build trust with fence-sitters.",
                    "Send a 'Doors Closing' urgency email 24 hours before the offer expires or changes. Scarcity drives action for people who are procrastinating.",
                    "Personally reach out to warm leads who replied or clicked but didn't buy. Ask them if they have any final questions before the launch ends—this personal touch closes deals."
                  ],
                  tips: ["Follow up more than you think is polite.", "Celebrate every sale publicly."],
                  commonChallenges: ["Giving up if day 1 is slow.", "Taking rejection personally."],
                  successCriteria: ["You get your first paying customer.", "You learn what messaging works."]
                }
              ],
              resources: [
                { title: "Content Calendar", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Sales Psychology", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Closing the Sale", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Sales Confidence", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Agency", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: First 10 Customers", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Celebrate Wins in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Review & Plan Next Quarter",
              description: "This week you pause to reflect. You look at what worked, what didn't, and plan the next 90 days. This cycle of execution and reflection is the secret to long-term growth and preventing burnout.",
              whyItMatters: "Experience without reflection is wasted. You must learn from your actions to improve and stop making the same mistakes.",
              howItStreamlines: "It sets the roadmap for the future. You stop guessing what to do next and start executing a plan based on data.",
              howItBuildsRelationships: "You can ask customers for feedback. It shows you value their experience and are committed to improvement.",
              actionSteps: [
                {
                  title: "Conduct Quarterly Review",
                  description: "Analyze your metrics and qualitative wins. Use this data to set smarter goals for the next 90 days so you stop repeating the same mistakes.",
                  timeEstimate: "2 Hours",
                  deliverable: "90-Day Plan for Next Quarter.",
                  linkTo: "AnnualPlanning",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Review revenue vs. goals. Look at the hard numbers—did you hit your target? If not, dig into the data to understand exactly why without judging yourself.",
                    "Review lessons learned. What surprised you? What was harder than expected? Write down the top 3 insights you gained this quarter to carry forward.",
                    "Identify top 3 priorities for the next quarter based on this data. Don't pick 10 things; pick the 3 that will move the needle most for your specific stage.",
                    "Schedule your next 90-day sprint in your calendar. Block out time for the deep work needed to achieve your new goals so you don't get lost in busy work."
                  ],
                  tips: ["Be kind to yourself.", "Focus on progress, not perfection."],
                  commonChallenges: ["Ignoring the data.", "Setting unrealistic goals again."],
                  successCriteria: ["You have a clear plan for the next 3 months.", "You feel re-energized."]
                }
              ],
              resources: [
                { title: "Annual Planning Tool", type: "Tool", icon: "Calendar", link: "AnnualPlanning" },
                { title: "Guide: Quarterly Reviews", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Strategic Planning", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: The Long Game", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Real Estate", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Scaling Up", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Your Plan in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
              description: "This week is about moving beyond assumptions. You will gather hard data on your industry, trends, and customer behaviors. This validation minimizes risk and highlights gaps in the market you can exploit. Don't guess; know.",
              whyItMatters: "Data beats opinion. Understanding the real market landscape prevents costly mistakes and reveals hidden opportunities that others miss.",
              howItStreamlines: "It narrows your focus to viable markets only. You stop wasting time on ideas that have no demand or are already saturated.",
              howItBuildsRelationships: "You can speak to current market frustrations. Customers appreciate a solution that fits the current reality and solves real problems.",
              actionSteps: [
                {
                  title: "Analyze Industry Trends",
                  description: "Research the macro trends affecting your sector. Use verifiable data to confirm that the market is growing and identify where the opportunities lie.",
                  timeEstimate: "2 Hours",
                  deliverable: "Market Trends Report.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Use Google Trends, industry reports, and news sites to find data. Look for growth patterns over the last 5 years to verify market stability and future potential.",
                    "Identify growing and shrinking segments within the market. Find out which specific niches are hot right now and which are fading away so you position yourself correctly.",
                    "Look for regulatory or technological shifts that could impact your business. Ask yourself if AI or new laws will help or hurt your idea in the next 3 years.",
                    "Summarize top 3 opportunities and threats into a simple report. This will help you make strategic decisions about where to enter the market and how to protect yourself."
                  ],
                  tips: ["Look for data less than 2 years old.", "Check competitor annual reports."],
                  commonChallenges: ["Getting lost in data paralysis.", "Ignoring negative trends."],
                  successCriteria: ["You can identify the direction of the market.", "You know where the money is flowing."]
                }
              ],
              resources: [
                { title: "Business Model Canvas", type: "Tool", icon: "LayoutTemplate", link: "StrategyFormBusinessModelCanvas" },
                { title: "Guide: Market Research 101", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Spotting Trends", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Facing Reality", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: SaaS", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Idea to Launch", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Industry Insights", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Competitive Analysis",
              description: "This week you study your rivals. You identify who the key players are, what they offer, and where they are failing. This allows you to position yourself uniquely and offer something better.",
              whyItMatters: "You need to know who you're fighting against. Differentiation is impossible without comparison; you need to know the baseline to beat it.",
              howItStreamlines: "You can adopt best practices they've already proven. You avoid their obvious mistakes, saving you time and money.",
              howItBuildsRelationships: "You can serve the customers they ignore. You become the alternative they've been waiting for, building instant loyalty.",
              actionSteps: [
                {
                  title: "Build Competitor Matrix",
                  description: "Document features, pricing, and reviews of top 3 competitors. Create a clear comparison that highlights exactly where you can win.",
                  timeEstimate: "2 Hours",
                  deliverable: "Competitor Matrix.",
                  linkTo: "StrategyFormSWOTAnalysis",
                  foundationStepId: "swot",
                  detailedSteps: [
                    "List your top 3 direct competitors. Include both the big market leaders and the smaller, niche players who are doing interesting things in your space.",
                    "Record their pricing, key features, and marketing promises. Look for gaps in their offerings or places where their pricing seems too high or too low for the value.",
                    "Read their 1-star reviews to find pain points. These angry comments are gold mines for you because they tell you exactly what customers hate about the current options.",
                    "Identify your unique advantage over each competitor. Write down one reason why a customer would choose you instead of them (e.g., better service, faster speed)."
                  ],
                  tips: ["Be objective.", "Don't ignore indirect competitors."],
                  commonChallenges: ["Underestimating them.", "Copying them too closely."],
                  successCriteria: ["You know exactly why a customer would choose you over them.", "You have found a gap in the market."]
                }
              ],
              resources: [
                { title: "SWOT Analysis Tool", type: "Tool", icon: "BarChart3", link: "StrategyFormSWOTAnalysis" },
                { title: "Guide: Competitive Strategy", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Niche Down", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Healthy Competition", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Restaurant", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Differentiation Masterclass", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Compare Competitors in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Define Business Model",
              description: "This week you decide how you make money. You map out your value proposition, revenue streams, and cost structure. This ensures your idea is actually a viable business, not just a good idea.",
              whyItMatters: "A great product without a business model is a hobby. You need a clear path to profitability to sustain the business.",
              howItStreamlines: "It clarifies your priorities. You focus on activities that drive revenue and cut activities that are just busy work.",
              howItBuildsRelationships: "It clarifies the value exchange. Customers know what to pay for and understand the relationship.",
              actionSteps: [
                {
                  title: "Complete Business Model Canvas",
                  description: "Fill out the one-page business plan framework. This single sheet will force you to validate every assumption about how your business operates.",
                  timeEstimate: "2 Hours",
                  deliverable: "Business Model Canvas.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Identify Key Partners and Activities. Who do you need to help you, and what are the most critical things you must do every day to keep the lights on?",
                    "Define Value Propositions and Customer Relationships. What value do you deliver, and how do you interact with clients (e.g., personal support vs. automated)?",
                    "List Customer Segments and Channels. Who are you selling to, and how will you reach them (e.g., social media, SEO, sales team)?",
                    "Map Cost Structure and Revenue Streams. What are your major expenses, and exactly how do you charge money (e.g., subscription, one-time fee)?"
                  ],
                  tips: ["Keep it concise.", "Focus on the relationships between boxes."],
                  commonChallenges: ["Leaving boxes blank.", "Being unrealistic about costs."],
                  successCriteria: ["You can explain your entire business logic on one page.", "It makes financial sense."]
                }
              ],
              resources: [
                { title: "Business Model Canvas", type: "Tool", icon: "LayoutTemplate", link: "StrategyFormBusinessModelCanvas" },
                { title: "Guide: Startup Finance", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Revenue Streams", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Profit First", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Fashion", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Startup Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Validate Business Model in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Strategic Positioning",
              description: "This week you define where you sit in the customer's mind. Are you the premium option? The fast option? The friendly option? Positioning determines your pricing, marketing, and competitive advantage.",
              whyItMatters: "You can't be everything to everyone. Clear positioning attracts your specific ideal client and allows you to charge what you are worth.",
              howItStreamlines: "Marketing decisions become obvious. You know your voice and style, making content creation faster.",
              howItBuildsRelationships: "It creates tribe mentality. Customers identify with your brand values and feel like they belong.",
              actionSteps: [
                {
                  title: "Draft Positioning Statement",
                  description: "Write the internal statement that guides your brand. This ensures that every piece of marketing you create is aligned with your core identity.",
                  timeEstimate: "1 Hour",
                  deliverable: "Positioning Statement.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Define the specific target segment you serve. Be as narrow as possible (e.g., 'Busy working moms' is better than just 'women').",
                    "Define the brand name and the product category you play in. Are you a consultant, a software tool, or a community? Be clear.",
                    "Define the key point of difference that separates you from the rest. This is your 'secret sauce' or unique mechanism that justifies your price.",
                    "Combine these into a statement: 'For [Target], [Brand] is the [Category] that [Benefit] because [Reason].' Use this to check all future marketing copy."
                  ],
                  tips: ["Use the template: For [Target], [Brand] is the [Category] that [Benefit].", "Be specific."],
                  commonChallenges: ["Being too generic.", "Claiming to be the 'best' without proof."],
                  successCriteria: ["It clearly separates you from competitors.", "It guides your marketing copy."]
                }
              ],
              resources: [
                { title: "Value Proposition Tool", type: "Tool", icon: "Filter", link: "StrategyFormValueProposition" },
                { title: "Guide: Brand Positioning", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Elevator Pitch", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Confidence in Value", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Health & Wellness", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Positioning Power", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Pitch Your Position in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            }
          ]
        },
        {
          title: "Month 2: Operations & Financial Planning",
          focus: "Define operations model, create financial projections, plan team structure",
          weeks: [
             {
              title: "Operational Workflow Design",
              description: "This week you design the engine of your business. You will map out exactly how value is delivered, from the first customer touchpoint to the final delivery. Efficient operations are the key to profitability and sanity.",
              whyItMatters: "Chaos kills scale. Defined workflows ensure consistency and allow you to delegate effectively without quality dropping.",
              howItStreamlines: "It removes bottlenecks. You identify steps that can be automated or eliminated, speeding up the entire system.",
              howItBuildsRelationships: "Consistent delivery builds trust. Customers know they will get the same great experience every time they buy.",
              actionSteps: [
                {
                  title: "Map Your Core Process",
                  description: "Create a flowchart of your primary service or product delivery. Visualizing the process allows you to spot inefficiencies before they cost you money.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Process Flowchart.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Start with the customer order. What is the very first thing that happens when someone clicks 'buy' or signs a contract?",
                    "List every single step required to fulfill the order. Include administrative tasks, communication, and the actual work itself. Don't skip the small stuff.",
                    "Identify who does each step. Is it you, a tool, or a team member? Mark this clearly on the chart to see workload distribution.",
                    "Mark decision points ('if this, then that') and potential failure points where things often go wrong. Plan safeguards for these risks now."
                  ],
                  tips: ["Keep it high-level first.", "Use sticky notes for flexibility."],
                  commonChallenges: ["Making it too complex.", "Forgetting administrative steps."],
                  successCriteria: ["A stranger could understand how you deliver value.", "You see obvious areas to improve."]
                }
              ],
              resources: [
                { title: "Automation Strategy Tool", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Systems & Processes", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Mapping Workflows", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Systems Thinking", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Manufacturing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Operations Optimization", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask About Tools in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Financial Projections",
              description: "This week you crunch the numbers. You estimate your startup costs, monthly burn rate, and revenue targets. This reality check ensures you have enough runway to succeed and aren't flying blind.",
              whyItMatters: "Running out of cash kills businesses. You need to know your numbers to survive and make informed decisions.",
              howItStreamlines: "It sets clear targets. You know exactly how many sales you need to break even, focusing your sales efforts.",
              howItBuildsRelationships: "It allows for sustainable pricing. You don't have to desperate-sell to survive, which builds trust.",
              actionSteps: [
                {
                  title: "Create 12-Month Budget",
                  description: "Forecast income and expenses for the next year. Knowing your cash flow needs allows you to make smarter spending decisions.",
                  timeEstimate: "2 Hours",
                  deliverable: "Financial Spreadsheet.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "List all fixed costs (rent, software, insurance). These are bills you must pay regardless of how much you sell, so get them accurate.",
                    "Estimate variable costs (COGS, transaction fees, marketing spend). These go up as your sales go up, so use percentages where possible.",
                    "Project conservative revenue based on realistic sales targets. Don't assume viral growth; assume slow, steady progress to be safe.",
                    "Calculate monthly cash flow to see if you run out of money in any month. Adjust your spending or sales goals until the numbers work."
                  ],
                  tips: ["Overestimate expenses by 10%.", "Underestimate revenue by 20%."],
                  commonChallenges: ["Being too optimistic.", "Forgetting taxes."],
                  successCriteria: ["You know your break-even point.", "You know how much cash you need to launch."]
                }
              ],
              resources: [
                { title: "Freedom Calculator", type: "Tool", icon: "DollarSign", link: "FreedomCalculator" },
                { title: "Guide: Managing Cash Flow", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Reading a P&L", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Financial Abundance", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Service Agency", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Profit First Implementation", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Pricing in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Team & Resource Planning",
              description: "This week you decide who does what. Even if you are a solo founder, you need to identify the hats you wear and when you will need to hire help. Planning for growth prevents burnout.",
              whyItMatters: "You can't do everything forever. Planning for help prevents burnout and allows you to focus on high-value tasks.",
              howItStreamlines: "It clarifies roles. You know what skills you need to hire for, making recruitment faster and more accurate.",
              howItBuildsRelationships: "Better service. Specialists do better work than tired generalists, leading to happier clients.",
              actionSteps: [
                {
                  title: "Draft Org Chart",
                  description: "Map out the roles needed now and in the future. This helps you identify which hats you need to take off first as you grow.",
                  timeEstimate: "1 Hour",
                  deliverable: "Org Chart.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "List all business functions (Sales, Ops, Marketing, Finance). Don't leave anything out, even small tasks like email management.",
                    "Put your name in every box you currently fill. This visualizes your workload and highlights why you might be feeling overwhelmed.",
                    "Identify the first role you need to hire to get the most time back. Usually, this is an administrative or delivery role.",
                    "Write a rough job description for that future role so you know exactly what to look for when you have the budget."
                  ],
                  tips: ["Hire for your weaknesses.", "Consider contractors first."],
                  commonChallenges: ["Thinking you have to hire employees immediately.", "Ignoring admin work."],
                  successCriteria: ["You have a hiring roadmap.", "You know what tasks to delegate first."]
                }
              ],
              resources: [
                { title: "Automation & SOPs", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Hiring Your First VA", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Delegation 101", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Letting Go of Control", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Solopreneur", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Team Building", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask About Hiring in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Tech Stack Selection",
              description: "This week you choose your tools. You select the software that runs your business, from CRM to Accounting. The right stack saves hours of manual work and scales with you.",
              whyItMatters: "Bad tools cause friction and data loss. Good tools automate work and provide data you can trust.",
              howItStreamlines: "Data flows automatically between systems. You avoid double-entry and reduce administrative overhead.",
              howItBuildsRelationships: "Better data management means you remember customer details. It feels personal and organized.",
              actionSteps: [
                {
                  title: "Select Core Software",
                  description: "Choose your CRM, Email, and Accounting tools. Selecting the right platform now saves you the pain of migrating data later.",
                  timeEstimate: "2 Hours",
                  deliverable: "Tech Stack Diagram.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "List your requirements for each tool (e.g., 'must send automated invoices', 'must integrate with Gmail'). Be specific about your needs.",
                    "Compare top 3 options for each category based on pricing and features. Read recent reviews to avoid buggy software that will waste your time.",
                    "Check for integrations (Zapier, native connections). Ensure your tools can talk to each other so data flows automatically.",
                    "Sign up for trials and test the user interface. If it feels clunky or confusing during the trial, don't buy it—it won't get better."
                  ],
                  tips: ["Simple is better than complex.", "Avoid 'all-in-one' tools that do nothing well."],
                  commonChallenges: ["Signing up for too many subscriptions.", "Not testing integrations."],
                  successCriteria: ["You have a list of tools that talk to each other.", "You know the monthly cost."]
                }
              ],
              resources: [
                { title: "Automation & Systems Tool", type: "Tool", icon: "Settings", link: "StrategyFormAutomation" },
                { title: "Guide: The Perfect Tech Stack", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Software Selection", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Investing in Tools", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Digital Agency", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Digital HQ Setup", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Tech Recs in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
              whyItMatters: "A goal without a date is just a dream. A timeline creates urgency and coordinates all moving parts effectively.",
              howItStreamlines: "It prioritizes tasks. You know exactly what must be done today to hit the launch date, reducing daily decision fatigue.",
              howItBuildsRelationships: "It allows you to coordinate marketing with operations. You won't sell something you can't deliver.",
              actionSteps: [
                {
                  title: "Create Launch Gantt Chart",
                  description: "Build a visual timeline of all launch activities. Seeing the sequence of events helps you identify dependencies and avoid last-minute panic.",
                  timeEstimate: "2 Hours",
                  deliverable: "Launch Calendar.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Set your Go-Live date. Pick a specific day on the calendar and treat it as a hard deadline that cannot be moved.",
                    "Work backward from that date to identify all dependencies. What must be finished 1 week before? 2 weeks before? Mark these milestones.",
                    "Schedule marketing blasts, emails, and social posts on specific days. Create a content calendar for the launch window.",
                    "Schedule final QA tests and dry runs to ensure everything works before the public sees it. Don't leave testing for the last day."
                  ],
                  tips: ["Add buffer time for delays.", "Share it with your team/partners."],
                  commonChallenges: ["Being overly optimistic about time.", "Ignoring dependencies."],
                  successCriteria: ["Every task has a due date.", "You feel confident in the schedule."]
                }
              ],
              resources: [
                { title: "Content Calendar Tool", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: The Ultimate Launch Checklist", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Project Management 101", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Handling Launch Stress", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Events", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 30-Day Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Find Accountability in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "QA & Testing",
              description: "This week you break your own business. You test every link, every payment form, and every process to ensure it works. You want to find the bugs before your customers do.",
              whyItMatters: "Broken tech kills conversions. First impressions are hard to fix, and a broken cart means lost trust.",
              howItStreamlines: "It prevents support tickets. You fix issues at the source rather than handling complaints later.",
              howItBuildsRelationships: "A flawless experience builds confidence. It shows you are professional and respect their time.",
              actionSteps: [
                {
                  title: "Run Full System Test",
                  description: "Simulate a customer purchase from start to finish. Walking in the customer's shoes reveals friction points you would otherwise miss.",
                  timeEstimate: "2 Hours",
                  deliverable: "Bug Report/Fix List.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Make a real purchase using your own credit card (you can refund yourself later). This tests the gateway and the bank connection for real.",
                    "Check that all receipt emails and welcome messages arrive in your inbox. Verify the formatting and links inside them work.",
                    "Verify access to the product or course area. Make sure the login works and the permissions are correct for a new user.",
                    "Test on mobile and desktop browsers. What looks good on a laptop might be broken on an iPhone, losing you mobile sales."
                  ],
                  tips: ["Ask a friend to do it too.", "Test different browsers."],
                  commonChallenges: ["Assuming it works because it worked yesterday.", "Ignoring mobile layout."],
                  successCriteria: ["The purchase flow is smooth.", "All automated emails arrive correctly."]
                }
              ],
              resources: [
                { title: "Website Launch Tool", type: "Tool", icon: "LayoutTemplate", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Quality Assurance Basics", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: User Experience Testing", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Detail Oriented", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Software", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Product Polish", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Testers in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Go Live!",
              description: "This is the moment. You flip the switch and announce your business to the world. It is time to celebrate and start serving. Don't be shy; launch with confidence.",
              whyItMatters: "You are finally in business. Real feedback starts now, and you can begin to generate revenue.",
              howItStreamlines: "You shift from 'building' mode to 'operating' mode. The planning phase is over; execution begins.",
              howItBuildsRelationships: "You can finally solve real problems for real people. This is the fulfillment of your mission.",
              actionSteps: [
                {
                  title: "Execute Launch Day Checklist",
                  description: "Perform the final steps to go public. Follow your plan step-by-step to ensure a smooth and successful launch day.",
                  timeEstimate: "All Day",
                  deliverable: "Live Business.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Publish your website and make sure it is visible to search engines. Remove any 'under construction' pages or password locks.",
                    "Announce the launch on all your social channels. Use high-energy graphics and a clear call to action to drive immediate traffic.",
                    "Email your personal network and waitlist. Ask them to share the news with their friends to amplify your reach.",
                    "Monitor your inbox and social feeds for immediate feedback. Be ready to answer questions or fix small bugs quickly to keep momentum."
                  ],
                  tips: ["Have support ready.", "Celebrate the milestone!"],
                  commonChallenges: ["Fear of pushing the button.", "Getting distracted."],
                  successCriteria: ["You are live.", "You have told the world."]
                }
              ],
              resources: [
                { title: "Social Media Strategy Tool", type: "Tool", icon: "Share2", link: "StrategyFormSocialMedia" },
                { title: "Guide: Go-Live Day Protocol", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Managing Launch Day", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Launch Anxiety", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Ecommerce", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Launch Success", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Announce Your Launch in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Post-Launch Review",
              description: "This week you breathe and analyze. You look at the initial data from your launch. What went well? What broke? This feedback loop informs your strategy for the next month.",
              whyItMatters: "Launch is just the starting line. Continuous improvement wins the race, and data is your guide.",
              howItStreamlines: "You quickly fix what isn't working. You double down on what is, optimizing your efforts.",
              howItBuildsRelationships: "You thank your early supporters. You ask for their feedback to improve, showing you value them.",
              actionSteps: [
                {
                  title: "Analyze Launch Metrics",
                  description: "Review traffic, conversion, and feedback data. Honest analysis of what happened gives you the roadmap for what to do next.",
                  timeEstimate: "2 Hours",
                  deliverable: "Launch Retro Report.",
                  linkTo: "AnnualPlanning",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "Check Google Analytics and your sales dashboard. Compare your actual traffic and sales numbers against your goals.",
                    "Read all customer emails, comments, and DMs. Look for common questions or confusion points that need addressing immediately.",
                    "Identify the top 3 critical fixes needed immediately. Prioritize bugs or friction points that are costing you sales.",
                    "Plan the next marketing push based on what you learned. If one channel worked best, focus your energy there next week."
                  ],
                  tips: ["Look for patterns.", "Don't panic over small sample sizes."],
                  commonChallenges: ["Ignoring the data.", "Focusing only on vanity metrics."],
                  successCriteria: ["You know what to improve next week.", "You have thanked your team/supporters."]
                }
              ],
              resources: [
                { title: "Annual Planning Tool", type: "Tool", icon: "Calendar", link: "AnnualPlanning" },
                { title: "Guide: Data Analysis for Beginners", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Key Performance Indicators", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Feedback is Fuel", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Online Courses", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Growth Hacking", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Results in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
              howItStreamlines: "You write copy faster. You have a bank of approved phrases and angles to pull from, reducing writer's block.",
              howItBuildsRelationships: "It resonates with the right people. Your message acts as a beacon for your ideal tribe.",
              actionSteps: [
                {
                  title: "Draft Key Brand Messages",
                  description: "Write your elevator pitch, tagline, and 3 key value pillars. These assets will be used repeatedly on your website, social media, and in person.",
                  timeEstimate: "2 Hours",
                  deliverable: "Messaging Guide.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Write a 1-sentence elevator pitch that explains who you help and what problem you solve. Test it on a friend to see if they understand it immediately.",
                    "Create a catchy tagline or slogan that captures the essence of your brand promise. Keep it short, memorable, and aligned with your values.",
                    "Define your 3 main selling points or 'value pillars'. These are the core arguments you will be using repeatedly to persuade people to buy.",
                    "Write a one-paragraph description of your company that can be used on your 'About' page and social media profiles, ensuring consistency."
                  ],
                  tips: ["Read them aloud.", "Test them on friends."],
                  commonChallenges: ["Being too wordy.", "Using passive voice."],
                  successCriteria: ["You can explain what you do in 10 seconds.", "It sounds exciting."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: Copywriting 101", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Brand Voice", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Clarity over Cleverness", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Personal Branding", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Message Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Copy Feedback in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Audience Segmentation",
              description: "This week you slice your market. You identify different subgroups within your audience who have specific needs. This allows for hyper-targeted marketing that feels personal.",
              whyItMatters: "Personalization converts. Treating everyone the same ignores their unique context and lowers engagement.",
              howItStreamlines: "It clarifies campaign targets. You know exactly who each email is for, making writing easier.",
              howItBuildsRelationships: "Customers feel seen. You speak to their specific situation, not a generic crowd.",
              actionSteps: [
                {
                  title: "Create Audience Segments",
                  description: "Define 2-3 distinct customer groups. Understanding their unique needs allows you to tailor your messaging for maximum impact.",
                  timeEstimate: "1 Hour",
                  deliverable: "Segmentation Map.",
                  linkTo: "StrategyFormIdealClient",
                  foundationStepId: "ideal_client",
                  detailedSteps: [
                    "Group your audience by demographics (age, location, job). Are there distinct groups like 'Students' vs 'Professionals' that need different offers?",
                    "Group by behavior (new vs. returning customers). A stranger needs a different message than a loyal fan who trusts you.",
                    "Group by problem or pain point (price conscious vs. quality conscious). Tailor your offers to what matters most to each group.",
                    "Name each segment so you can refer to them easily (e.g., 'The Bargain Hunter', 'The Power User') in your planning."
                  ],
                  tips: ["Keep it simple initially.", "Focus on the biggest differences."],
                  commonChallenges: ["Creating too many segments.", "Segments with no clear difference."],
                  successCriteria: ["You have unique messages for each group.", "You can tag them in your CRM."]
                }
              ],
              resources: [
                { title: "Ideal Client Persona", type: "Tool", icon: "Users", link: "StrategyFormIdealClient" },
                { title: "Guide: Advanced Segmentation", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Email Segmentation", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Serving the Few", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Email Marketing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Audience Growth", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Segments in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Channel Selection",
              description: "This week you decide where to play. You identify the 1-2 marketing channels where your audience hangs out and where you can win. Focus is better than being everywhere poorly.",
              whyItMatters: "Spreading yourself thin leads to mediocrity. Dominating one channel builds momentum and brand authority.",
              howItStreamlines: "It reduces content fatigue. You only create for the platforms that matter, saving massive amounts of time.",
              howItBuildsRelationships: "You meet them where they are. You become a familiar face in their favorite space.",
              actionSteps: [
                {
                  title: "Select Primary Channels",
                  description: "Choose 1 primary and 1 secondary marketing channel. Mastering one platform is far more effective than being average on five.",
                  timeEstimate: "1 Hour",
                  deliverable: "Channel Plan.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Research where your avatar actually spends time. Don't assume they are on TikTok just because it's popular; they might be on LinkedIn.",
                    "Assess your own strengths. If you hate video, don't pick YouTube. Choose a channel that plays to your writing or speaking skills.",
                    "Look at competitor presence. Where are they getting engagement? Is there an underserved channel they are ignoring?",
                    "Commit to a specific posting frequency for your chosen channel. Consistency is more important than volume."
                  ],
                  tips: ["Go deep, not wide.", "Don't pick a channel you hate."],
                  commonChallenges: ["FOMO on other platforms.", "Quitting too early."],
                  successCriteria: ["You have a clear focus.", "You have created accounts/profiles."]
                }
              ],
              resources: [
                { title: "Content Strategy Tool", type: "Tool", icon: "Share2", link: "StrategyFormContentStrategy" },
                { title: "Guide: Social Media Channels", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Platform Selection", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Focus vs Distraction", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Influencer", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Social Media Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask Where to Post in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "SEO Foundation",
              description: "This week you plant seeds for the future. You identify the keywords your customers are searching for. This ensures your content gets found organically over time.",
              whyItMatters: "Organic traffic is free and high-intent. People searching have a problem to solve and are ready to buy.",
              howItStreamlines: "It guides content creation. You write what people are already looking for, so you don't have to guess topics.",
              howItBuildsRelationships: "You answer their questions. You become the helpful expert they find when they are stuck.",
              actionSteps: [
                {
                  title: "Keyword Research",
                  description: "Build a list of 20 target keywords. These are the terms your ideal customer is typing into Google right now.",
                  timeEstimate: "2 Hours",
                  deliverable: "Keyword Strategy.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Use a keyword tool like Google Planner, Ubersuggest, or AnswerThePublic to find data. Look for terms with decent volume but lower competition.",
                    "Find high volume, low competition terms that are relevant to your offer. These are your 'low hanging fruit' opportunities.",
                    "Look for question-based keywords (Who, What, How). These are great for blog posts and FAQ pages that build trust.",
                    "Map specific keywords to pages on your website. Ensure each page has a primary keyword target."
                  ],
                  tips: ["Focus on 'long-tail' keywords.", "Check search intent."],
                  commonChallenges: ["Targeting impossible keywords.", "Ignoring search volume."],
                  successCriteria: ["You have a list of topics to write about.", "You know what your audience asks."]
                }
              ],
              resources: [
                { title: "Website Launch Tool", type: "Tool", icon: "LayoutTemplate", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: SEO for Beginners", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Keyword Research", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Long Term Growth", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Content Marketing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Traffic Generator", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get SEO Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
              whyItMatters: "Content builds trust and authority. A strategy ensures your content actually leads to sales rather than just likes.",
              howItStreamlines: "Batching becomes possible. You stop waking up wondering 'what should I post today?', removing daily stress.",
              howItBuildsRelationships: "Valuable content gives before it asks. It positions you as a helpful expert, not just a salesperson.",
              actionSteps: [
                {
                  title: "Define Content Pillars",
                  description: "Select 3-5 core topics you will consistently cover. These themes will keep your content focused and relevant to your audience's needs.",
                  timeEstimate: "1 Hour",
                  deliverable: "Content Pillar List.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Review your customer's pain points and your own expertise. Where do they overlap? That is your content sweet spot.",
                    "Choose 3-5 broad topics that solve those pains. These will be your recurring themes or 'pillars' for all content.",
                    "Ensure you have deep expertise and interest in these areas. You will be talking about them a lot, so you need to enjoy them.",
                    "Brainstorm 5 specific content ideas for each pillar. This gives you your first month of content immediately."
                  ],
                  tips: ["Choose topics you enjoy discussing.", "Make sure they relate to your offer."],
                  commonChallenges: ["Choosing too many topics.", "Picking trending topics that aren't relevant."],
                  successCriteria: ["You have 20+ content ideas generated.", "They all align with your brand."]
                }
              ],
              resources: [
                { title: "Content Strategy Tool", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Content Marketing Plan", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Content Pillars", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Creator vs Consumer", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Blogger", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 30 Days of Content", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Pillars in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Lead Magnet Creation",
              description: "This week you create a value exchange. You build a free resource to give away in exchange for email addresses. This moves people from 'rented' social media to your 'owned' email list.",
              whyItMatters: "Email is the highest ROI channel. You need a reason for people to subscribe beyond just 'newsletter updates'.",
              howItStreamlines: "It automates lead gen. The asset works for you 24/7, collecting leads while you sleep.",
              howItBuildsRelationships: "It delivers immediate value. You solve a small problem for free, earning trust and gratitude.",
              actionSteps: [
                {
                  title: "Build Your Lead Magnet",
                  description: "Create a PDF, Checklist, or Mini-Course. This free gift should provide a 'quick win' and demonstrate your expertise immediately.",
                  timeEstimate: "3 Hours",
                  deliverable: "Ready-to-download Asset.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Identify a specific, small problem your avatar has that you can solve quickly. It should be a 'migraine' problem they want gone now.",
                    "Create a quick-win solution like a checklist, template, or short video. Don't write a whole book; keep it actionable.",
                    "Design it simply using tools like Canva. It needs to look professional and trustworthy, but it doesn't need to be a masterpiece.",
                    "Set up the delivery mechanism. Upload the file to your website or email provider so it sends automatically upon signup."
                  ],
                  tips: ["Focus on 'quick win'.", "Make it consumable in 5 minutes."],
                  commonChallenges: ["Writing a whole book.", "Making it too complex."],
                  successCriteria: ["You have a file ready to share.", "It solves a real problem."]
                }
              ],
              resources: [
                { title: "Email Marketing Tool", type: "Tool", icon: "Mail", link: "StrategyFormEmailMarketing" },
                { title: "Guide: High Converting Lead Magnets", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: List Building", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Generosity", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Coaching", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Lead Gen Engine", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Lead Magnet Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Email Sequence Design",
              description: "This week you automate the relationship. You write the emails that send automatically when someone downloads your lead magnet. This nurtures them from stranger to customer without you typing.",
              whyItMatters: "You can't manually email every lead. Automation ensures consistent follow-up and maximizes conversion.",
              howItStreamlines: "It saves massive time. You write it once, it sells forever.",
              howItBuildsRelationships: "It tells your story over time. You build familiarity and trust drip by drip, respecting their time.",
              actionSteps: [
                {
                  title: "Write Welcome Sequence",
                  description: "Draft a 3-5 email series. This automated conversation introduces you, delivers value, and eventually makes an offer.",
                  timeEstimate: "2 Hours",
                  deliverable: "Welcome Sequence.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Email 1: Deliver the asset immediately and welcome them to your world. Set expectations for what you will send in the future.",
                    "Email 2: Provide extra value or a 'pro tip' related to the lead magnet. Show them you have more expertise to share.",
                    "Email 3: Share your backstory or 'Why'. Connect on a human level and explain why you do what you do.",
                    "Email 4: Make a soft offer or invitation. Invite them to take the next step, like booking a call or buying a small product."
                  ],
                  tips: ["Write like you talk to a friend.", "Focus on value, not just selling."],
                  commonChallenges: ["Being too formal.", "Selling too hard too soon."],
                  successCriteria: ["You have 3-5 emails written.", "They flow logically."]
                }
              ],
              resources: [
                { title: "Email Marketing Tool", type: "Tool", icon: "Mail", link: "StrategyFormEmailMarketing" },
                { title: "Guide: Writing Email Sequences", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Email Automation", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Selling via Email", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Service Business", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Email Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Subject Lines in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Social Media Calendar",
              description: "This week you get organized. You plan a month of social content in advance. This ensures consistency and reduces daily stress of finding something to post.",
              whyItMatters: "Consistency is the secret to social growth. Random posting gets random results; a plan gets momentum.",
              howItStreamlines: "You can batch create content. You spend less time on social media overall by doing it in chunks.",
              howItBuildsRelationships: "Regular presence keeps you top of mind. You become part of their daily feed and life.",
              actionSteps: [
                {
                  title: "Fill Content Calendar",
                  description: "Schedule posts for the next 30 days. Knowing exactly what to post eliminates writer's block and ensures you cover all your content pillars.",
                  timeEstimate: "2 Hours",
                  deliverable: "30-Day Social Plan.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Map out key dates, holidays, and your own promotional periods on a calendar. Ensure you aren't missing big opportunities.",
                    "Slot in your content pillars into the calendar. Rotate through them to keep the content varied and interesting.",
                    "Draft the captions for your posts. Batching this writing task helps you stay in the creative flow.",
                    "Create or find the visuals to match the captions. Having everything ready to go means you won't skip posting when you get busy."
                  ],
                  tips: ["Repurpose content.", "Leave room for trending topics."],
                  commonChallenges: ["Running out of ideas.", "Not scheduling it."],
                  successCriteria: ["You know exactly what is posting next Tuesday.", "You feel organized."]
                }
              ],
              resources: [
                { title: "Social Media Strategy Tool", type: "Tool", icon: "Share2", link: "StrategyFormSocialMedia" },
                { title: "Guide: Social Media Planning", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Batching Content", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Discipline & Consistency", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Personal Brand", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Social Media Bootcamp", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Find Accountability Partner in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Post content, send emails, and turn on ads according to your schedule. Consistent action across all channels creates a 'surround sound' effect for your audience.",
                  timeEstimate: "Ongoing",
                  deliverable: "Live Campaigns.",
                  linkTo: "StrategyFormSocialMedia",
                  foundationStepId: "social_media_strategy",
                  detailedSteps: [
                    "Schedule all social posts in your management tool. Double check the times and dates to ensure they go out when your audience is awake.",
                    "Send the launch email blast to your list. Monitor the delivery rates to ensure it didn't land in spam.",
                    "Engage with comments immediately. The first hour after posting is critical for algorithm boosting, so be present.",
                    "Monitor ad spend daily if you are running paid traffic. Turn off losing ads quickly to save budget."
                  ],
                  tips: ["Be present to answer questions.", "Check for broken links."],
                  commonChallenges: ["Getting discouraged by slow starts.", "Forgetting to engage."],
                  successCriteria: ["Traffic is flowing to your site.", "You are getting inquiries."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Launch Execution", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Traffic Sources", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Action Taking", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Ecommerce", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Traffic Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Report Progress in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Check Google Analytics and Platform Insights. Understanding your data tells you the truth about your marketing performance, regardless of how you 'feel' it went.",
                  timeEstimate: "1 Hour",
                  deliverable: "Data Dashboard.",
                  linkTo: "StrategyFormWebsiteLaunch",
                  foundationStepId: "website_launch",
                  detailedSteps: [
                    "Verify traffic sources in Google Analytics. Are people coming from where you expected (e.g., Instagram vs. Email)?",
                    "Check bounce rates on your landing pages. If everyone is leaving immediately, your page might be broken or confusing.",
                    "See which social posts got the most engagement. Look for patterns in topic or format (e.g., video vs. text).",
                    "Track email open and click-through rates. Identify which subject lines worked best."
                  ],
                  tips: ["Focus on trends, not daily blips.", "Compare against industry benchmarks."],
                  commonChallenges: ["Ignoring data.", "Misinterpreting correlation as causation."],
                  successCriteria: ["You know your best traffic source.", "You know your conversion rate."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Marketing Analytics", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Measuring ROI", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Data Driven Decisions", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: SaaS", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Analytics for Growth", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Analytics Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Test one variable to improve performance. Scientific testing removes the guesswork and helps you incrementally improve your conversion rates.",
                  timeEstimate: "1 Hour",
                  deliverable: "Test Results.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Pick one single element to test (e.g., Headline, Hero Image, Button Color). Testing multiple things at once confuses the data.",
                    "Create a variation of that element. Try to make it significantly different from the original to see a real impact.",
                    "Split your traffic or audience so half see version A and half see version B. Use software or manual splitting for emails.",
                    "Measure the winner after a few days or significant traffic. Implement the winning version permanently."
                  ],
                  tips: ["Test big changes first.", "Wait for statistical significance."],
                  commonChallenges: ["Testing too many things at once.", "Ending tests too early."],
                  successCriteria: ["You found a winner.", "You improved conversion rate."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Conversion Optimization", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: A/B Testing", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Failing Forward", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Digital Marketing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Optimization Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Test Results in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create ads or emails for non-buyers. This safety net catches the people who were interested but got distracted, giving you a second chance to close the sale.",
                  timeEstimate: "2 Hours",
                  deliverable: "Active Retargeting Campaign.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Install tracking pixels (Facebook Pixel, Google Tag) on your site if you haven't already. This allows you to 'find' your visitors again.",
                    "Create an 'Abandon Cart' email sequence. Remind them of what they left behind and offer to answer any questions.",
                    "Create a 'Did you forget?' ad for social media. Show them the product again and perhaps offer a small incentive.",
                    "Offer a limited-time bonus to nudge them off the fence. Sometimes people just need a reason to act *now*."
                  ],
                  tips: ["Don't be annoying.", "Cap the frequency."],
                  commonChallenges: ["Creepy ads.", "Not segmenting buyers out."],
                  successCriteria: ["You recover lost sales.", "Your ROI increases."]
                }
              ],
              resources: [
                { title: "Email Marketing Tool", type: "Tool", icon: "Mail", link: "StrategyFormEmailMarketing" },
                { title: "Guide: Retargeting Strategy", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Power of Follow Up", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Persistence", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Advertising", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Ads Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Ad Reviews in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "List every interaction a customer has with your brand. Seeing the entire journey laid out allows you to spot gaps and inconsistencies in your customer experience.",
                  timeEstimate: "2 Hours",
                  deliverable: "Touchpoint Audit List.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Visit your own website as a stranger in a new browser window. Try to look at it with fresh eyes—is it clear what you should do next?",
                    "Sign up for your own newsletter using a testing email address. See what the welcome experience feels like and if the emails arrive on time.",
                    "Try to buy your product or book a call. Note any forms that are too long, buttons that don't work, or confusing instructions.",
                    "Note every single frustration or moment of confusion you experienced. These are the exact points where you are losing real customers."
                  ],
                  tips: ["Use a fresh browser/incognito mode.", "Ask a friend to do it while you watch."],
                  commonChallenges: ["Being blind to your own flaws.", "Skipping mobile testing."],
                  successCriteria: ["You have a list of 5+ things to fix.", "You understand the user flow."]
                }
              ],
              resources: [
                { title: "Customer Journey Map Tool", type: "Tool", icon: "Map", link: "StrategyFormCustomerJourney" },
                { title: "Guide: User Experience Audit", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Customer Touchpoints", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Customer Centricity", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Service Design", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: CX Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Audit Findings in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Identify top 3 exit pages. Pinpointing exactly where you lose people allows you to focus your optimization efforts for maximum return.",
                  timeEstimate: "1 Hour",
                  deliverable: "Optimization Priority List.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Check your analytics software to find pages with high exit rates. Identify where the majority of your traffic is dropping off.",
                    "Look for 'rage clicks' or rapid exits on specific pages. This usually indicates broken elements or confusing design.",
                    "Hypothesize *why* they are leaving. Is the price too high? Is the copy unclear? Is the form broken?",
                    "Plan a specific fix for the top leak (e.g., rewrite the headline, speed up the load time, clarify the button text). Prioritize the fix that will save the most sales."
                  ],
                  tips: ["Look for technical errors first.", " Simplify the page."],
                  commonChallenges: ["Blaming the customer.", "Ignoring mobile users."],
                  successCriteria: ["You know your biggest bottleneck.", "You have a plan to fix it."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Funnel Optimization", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Reducing Friction", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Problem Solving", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Sales Funnels", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Funnel Fixer", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Help with Leaks in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Draw the ideal flow from stranger to advocate. Designing the 'perfect' experience gives you a target to aim for and inspires your team to raise their standards.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Ideal Journey Map.",
                  linkTo: "StrategyFormCustomerJourney",
                  foundationStepId: "customer_journey",
                  detailedSteps: [
                    "Imagine the perfect emotional state of the customer at each step. How do you want them to feel? Excited? relieved? Confident?",
                    "Design the perfect transition between steps. How can you make moving from 'lead' to 'customer' feel seamless and effortless?",
                    "Add 'delight' moments that don't exist yet. Where can you add a surprise bonus or a personal touch that they aren't expecting?",
                    "Ensure value is delivered early and often. Don't make them wait until the very end to get a win; give them small wins along the way."
                  ],
                  tips: ["Think like Disney (magical experience).", "Ignore current tech limitations for now."],
                  commonChallenges: ["Thinking 'we can't do that'.", "Being too practical."],
                  successCriteria: ["You have an inspiring vision.", "The team is excited to build it."]
                }
              ],
              resources: [
                { title: "Customer Journey Tool", type: "Tool", icon: "Map", link: "StrategyFormCustomerJourney" },
                { title: "Guide: Service Design Principles", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Creating Delight", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Dreaming Big", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Hospitality", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 5-Star Service", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Brainstorm Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Prioritize fixes and upgrades. A clear implementation plan prevents overwhelm and ensures the most critical improvements get done first.",
                  timeEstimate: "1 Hour",
                  deliverable: "Action Plan.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Score your potential fixes by Impact vs. Effort. Which changes will give the biggest result for the least work?",
                    "Pick top 3 Quick Wins to implement immediately. Momentum is key, so start with the easy stuff.",
                    "Schedule major projects for later in the quarter. Don't try to rebuild your entire website overnight.",
                    "Assign owners to each task if you have a team. If it's just you, block out time in your calendar to do the work."
                  ],
                  tips: ["Fix broken things before adding new things.", "Start near the purchase point."],
                  commonChallenges: ["Trying to fix everything at once.", "Analysis paralysis."],
                  successCriteria: ["You have a prioritized to-do list.", "Work has started."]
                }
              ],
              resources: [
                { title: "Automation Strategy Tool", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Agile Implementation", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Prioritization", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Iterative Improvement", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Project Management", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Execution Sprint", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Find Accountability in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Enhance the moment they receive your product or service. This first impression sets the tone for the entire relationship and can turn buyer's remorse into excitement.",
                  timeEstimate: "2 Hours",
                  deliverable: "Enhanced Onboarding/Delivery Plan.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Add a personal thank you note or video. Even a pre-recorded video feels more personal than a text receipt.",
                    "Improve the packaging or digital welcome page. The first thing they see after buying should validate their decision.",
                    "Include a surprise bonus or guide that they weren't expecting. This 'over-delivery' creates instant goodwill.",
                    "Make the first step incredibly easy to do. Give them a quick win immediately so they feel successful right away."
                  ],
                  tips: ["Personalization wins.", "It doesn't have to be expensive."],
                  commonChallenges: ["Overcomplicating it.", "Forgetting digital products need 'unboxing' too."],
                  successCriteria: ["The delivery feels like a gift.", "Customers are compelled to share it."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: Customer Experience Design", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Power of Surprise", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Generosity", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Luxury Brand", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Raving Fans", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Wow Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Write templates for common questions. Having standard answers for recurring issues saves time and ensures every customer gets a high-quality response.",
                  timeEstimate: "2 Hours",
                  deliverable: "Support Library.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Identify top 5 recurring questions or issues your customers have. Look at past emails to find these.",
                    "Write clear, friendly answers for each one. Save these as templates or snippets to reuse later.",
                    "Create a clear policy for refunds and issues. Decide ahead of time what you will do so you don't have to stress in the moment.",
                    "Set response time goals for yourself. For example, 'We answer all emails within 24 hours'."
                  ],
                  tips: ["Use 'Yes, and...' language.", "Apologize without being defensive."],
                  commonChallenges: ["Being robotic.", "Making the customer jump through hoops."],
                  successCriteria: ["You can answer emails in half the time.", "Customers thank you for the help."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Customer Support Playbook", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Handling Complaints", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Service is Sales", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: SaaS Support", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Support Systems", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Template Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Add dynamic fields to emails/site. Using technology to treat people like individuals at scale increases engagement and conversion rates.",
                  timeEstimate: "1 Hour",
                  deliverable: "Personalized touchpoints.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Add 'First Name' tags to your email headers and subject lines. A person's name is the sweetest sound to them.",
                    "Segment your offers based on past purchases. Don't sell them something they already bought.",
                    "Send automated birthday or anniversary messages. These small gestures show you care about the relationship.",
                    "Recommend relevant products based on their history. 'If you liked X, you'll love Y' is helpful, not salesy."
                  ],
                  tips: ["Test fallback text (e.g., 'Friend').", "Don't get creepy."],
                  commonChallenges: ["Bad data (e.g., name is 'EMAIL').", "Over-personalizing."],
                  successCriteria: ["Emails feel 1:1.", "Engagement rates go up."]
                }
              ],
              resources: [
                { title: "Email Marketing Tool", type: "Tool", icon: "Mail", link: "StrategyFormEmailMarketing" },
                { title: "Guide: Personalization Strategy", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Data Driven Marketing", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Relationship Building", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: E-commerce", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: CRM Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Tech Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create a post-purchase/NPS survey. Automated feedback collection provides a constant stream of insights without you having to ask manually every time.",
                  timeEstimate: "1 Hour",
                  deliverable: "Live Survey.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Create a simple 3-question survey using a tool like Typeform or Google Forms.",
                    "Trigger it automatically a few days after delivery. Catch them while the experience is fresh.",
                    "Ask 'What almost stopped you from buying?'. This reveals your biggest friction points.",
                    "Ask 'What is one thing we could improve?'. This gives you your product roadmap."
                  ],
                  tips: ["Keep it short.", "Read every response."],
                  commonChallenges: ["Asking too many questions.", "Never looking at the data."],
                  successCriteria: ["You get a steady stream of insights.", "You catch unhappy customers early."]
                }
              ],
              resources: [
                { title: "Automation Tool", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Survey Design", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Net Promoter Score", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Receiving Feedback", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Product Management", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Feedback Loop Setup", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Results in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create the offer and mechanism for referrals. A formal program encourages your best customers to share your business by making it worth their while.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Referral Program Outline.",
                  linkTo: "StrategyFormAffiliateProgram",
                  foundationStepId: "affiliate_program",
                  detailedSteps: [
                    "Decide on the reward (cash, credit, gift). It must be something they actually want.",
                    "Create a simple way to track referrals, whether it's a software link or a manual spreadsheet.",
                    "Write the email asking for the referral. Make it easy for them by providing copy they can just forward to a friend.",
                    "Make it double-sided (reward for them AND the friend). This makes them feel like they are giving a gift, not just getting paid."
                  ],
                  tips: ["Make the reward desirable.", "Ask at the moment of highest happiness."],
                  commonChallenges: ["Making the process too hard.", "Offering a reward they don't want."],
                  successCriteria: ["You have a live referral link/process.", "You have asked your top 5 clients."]
                }
              ],
              resources: [
                { title: "Referral Strategy Tool", type: "Tool", icon: "Users", link: "StrategyFormAffiliateProgram" },
                { title: "Guide: Viral Growth", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Word of Mouth Marketing", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Asking for Help", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Subscription Box", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Referral Engine", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Referral Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create a special status for top spenders. Giving your best customers exclusive perks makes them feel valued and less likely to leave for a competitor.",
                  timeEstimate: "1 Hour",
                  deliverable: "VIP Offer.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Define criteria for VIP status (e.g., spent $500, or member for 1 year). Make it an aspirational goal.",
                    "Define perks (exclusive access, discounts, priority service). It should feel like a genuine upgrade.",
                    "Name the tier something special that aligns with your brand (e.g., 'Inner Circle').",
                    "Notify qualifying members and welcome them to the new status. Make them feel celebrated."
                  ],
                  tips: ["Make the perks exclusive, not just expensive.", "Recognize them publicly if appropriate."],
                  commonChallenges: ["Making it too complicated.", "Offering perks that cost too much margin."],
                  successCriteria: ["Top clients feel special.", "They buy more often to keep status."]
                }
              ],
              resources: [
                { title: "Community Building Tool", type: "Tool", icon: "Users", link: "StrategyFormCommunityBuilding" },
                { title: "Guide: Customer Loyalty", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Increasing LTV", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Abundance Mindset", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Membership Site", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Loyalty Loop", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share VIP Ideas in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Interview a happy client and document their win. A detailed case study is a versatile asset that can be used in ads, emails, and sales calls to prove your results.",
                  timeEstimate: "2 Hours",
                  deliverable: "Published Case Study.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Reach out to a successful client and ask for a 15-minute chat. Frame it as wanting to hear their story.",
                    "Ask specific questions about their 'Before' and 'After' state. Dig for specific metrics or emotional changes.",
                    "Get specific numbers if possible (e.g., 'saved 10 hours', 'made $5k'). Specificity builds credibility.",
                    "Write it up as a story or record a video snippet. Send it to them for approval before publishing."
                  ],
                  tips: ["Focus on the transformation.", "Use their exact words."],
                  commonChallenges: ["Forgetting to ask.", "Making it sound like a generic ad."],
                  successCriteria: ["You have a compelling story asset.", "The client shares it too."]
                }
              ],
              resources: [
                { title: "Content Strategy Tool", type: "Tool", icon: "FileText", link: "StrategyFormContentStrategy" },
                { title: "Guide: How to Interview Clients", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Social Proof", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Confidence", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Consulting", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Storytelling for Sales", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Case Studies in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Introduce customers to each other. Building a network among your users increases the value of your product and creates a barrier to exit.",
                  timeEstimate: "1 Hour",
                  deliverable: "Connected Community.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Create a space for them to connect, whether it's a Facebook Group, Slack channel, or a live event.",
                    "Introduce people with similar goals or challenges. Be the super-connector who adds value by knowing people.",
                    "Highlight member wins publicly. Give them a stage to shine and be recognized by their peers.",
                    "Encourage peer support. When someone asks a question, wait a bit to see if another member answers first."
                  ],
                  tips: ["Be the host, not the hero.", "Set clear guidelines."],
                  commonChallenges: ["Empty room syndrome.", "Toxic behavior (moderate fast)."],
                  successCriteria: ["Members are talking to each other.", "The group feels alive."]
                }
              ],
              resources: [
                { title: "Community Building Tool", type: "Tool", icon: "Users", link: "StrategyFormCommunityBuilding" },
                { title: "Guide: Community Management", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Building a Tribe", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Leadership", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Influencer", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Community Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Engage in The HQ Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
              description: "This week is about finding the leaks. You will analyze your time and your team's time to see where effort is being wasted. This diagnostic is crucial before you try to scale. You cannot scale chaos.",
              whyItMatters: "Scaling chaos just creates more chaos. You must streamline before you amplify to avoid breaking the business.",
              howItStreamlines: "It identifies waste immediately. You stop doing low-value tasks and focus on growth.",
              howItBuildsRelationships: "It frees up time for clients. You spend less time fighting fires and more time serving.",
              actionSteps: [
                {
                  title: "Conduct Time Study",
                  description: "Track where every hour goes for one week. This reveals the brutal truth about where your attention is actually going versus where it should be going.",
                  timeEstimate: "Ongoing",
                  deliverable: "Time Usage Report.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Use a timer or app (like Toggl or Harvest) to log every task for 5 days. Don't guess; get real data about your habits.",
                    "Categorize tasks as High Value ($$$) vs. Low Value ($). Be honest about which tasks actually move the needle.",
                    "Identify interruptions and context switching. How often do you lose focus? These are productivity killers.",
                    "Highlight tasks that can be delegated or automated. If a machine or a cheaper resource can do it, you shouldn't be doing it."
                  ],
                  tips: ["Be honest, don't edit your log.", "Track breaks too."],
                  commonChallenges: ["Forgetting to log.", "Justifying wasted time."],
                  successCriteria: ["You know your hourly rate.", "You have a list of tasks to kill."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Operational Excellence", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The 80/20 Rule", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Essentialism", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Operations Manager", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Productivity Masterclass", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Time Hacks in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Cost & Expense Audit",
              description: "This week you clean up the finances. You review every subscription, vendor, and expense to cut fat. Lean operations are more profitable and resilient, giving you more cash to invest in growth.",
              whyItMatters: "Profit margin matters more than top-line revenue. Wasted cash drags you down and limits your options.",
              howItStreamlines: "It simplifies bookkeeping. Fewer transactions to manage means less admin time.",
              howItBuildsRelationships: "You can reinvest savings into better customer experience, directly benefiting your clients.",
              actionSteps: [
                {
                  title: "Review P&L",
                  description: "Analyze bank statements for the last 3 months. Cutting unnecessary costs is the fastest way to increase profitability without selling more.",
                  timeEstimate: "2 Hours",
                  deliverable: "Expense Reduction Plan.",
                  linkTo: "FreedomCalculator",
                  foundationStepId: "financial_goal",
                  detailedSteps: [
                    "List all recurring charges from your bank and credit card statements. Look for subscriptions you forgot about.",
                    "Cancel unused software immediately. If you haven't used it in 30 days, pause or cancel it.",
                    "Negotiate vendor contracts for larger expenses. Ask for a loyalty discount or annual payment break.",
                    "Identify high-cost areas that bring low returns. Cut specific marketing channels or perks that aren't working."
                  ],
                  tips: ["Be ruthless.", "Ask 'does this directly help the customer?'."],
                  commonChallenges: ["Holding onto 'might need it someday' tools.", "Ignoring small charges."],
                  successCriteria: ["You saved 10-20% on monthly burn.", "You feel financially lighter."]
                }
              ],
              resources: [
                { title: "Financial Projections Tool", type: "Tool", icon: "DollarSign", link: "FreedomCalculator" },
                { title: "Guide: Lean Business Model", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Improving Margins", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Frugality vs Cheapness", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Bootstrapping", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Financial Freedom", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask About Costs in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Identify Bottlenecks",
              description: "This week you find the constraint. You identify the one part of your business that slows everything else down. Fixing this one thing yields the biggest result for the least effort.",
              whyItMatters: "A chain is only as strong as its weakest link. Improving non-bottlenecks is a waste of time and resources.",
              howItStreamlines: "It unblocks flow. Work moves faster through the system, increasing capacity.",
              howItBuildsRelationships: "It speeds up delivery. Customers get their result faster, which makes them happier.",
              actionSteps: [
                {
                  title: "Constraint Analysis",
                  description: "Find the choke point in your delivery. Identifying where work piles up allows you to deploy resources exactly where they are needed most.",
                  timeEstimate: "1 Hour",
                  deliverable: "Bottleneck Report.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Map the flow of work from lead to delivery. Visualize it like a factory line.",
                    "Look for piles of work waiting to be done. Where does the work stack up? That is your bottleneck.",
                    "Look for stressed team members (or yourself). Who is always working late? They are likely the constraint.",
                    "Identify the limiting factor. Is it Sales volume? Delivery capacity? Administrative delay? Focus all energy there."
                  ],
                  tips: ["It's usually a person or a policy.", "Ask 'what prevents us from doubling?'."],
                  commonChallenges: ["Blaming the market.", "Ignoring internal issues."],
                  successCriteria: ["You know exactly what to fix first.", "You have a plan to widen the pipe."]
                }
              ],
              resources: [
                { title: "Process Map Template", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Theory of Constraints", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Bottleneck Analysis", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Focus", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Logistics", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Scale Up", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Bottlenecks in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Standardization",
              description: "This week you create the 'One Best Way'. You ensure that tasks are done the same way every time, regardless of who does them. This is the prerequisite for automation and delegation.",
              whyItMatters: "Consistency is quality. You can't improve a process that changes every time, and you can't scale a mess.",
              howItStreamlines: "It reduces decision fatigue. You just follow the recipe, making work faster and easier.",
              howItBuildsRelationships: "Reliability builds trust. Customers know what to expect and feel secure.",
              actionSteps: [
                {
                  title: "Standardize Core Deliverable",
                  description: "Create a checklist for your main product/service. Standardizing your delivery ensures every customer gets the same high-quality result, regardless of who does the work.",
                  timeEstimate: "2 Hours",
                  deliverable: "Master Checklist.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Walk through the process yourself and write down every action. Don't skip the 'obvious' steps that are only obvious to you.",
                    "Write down every required step in order. Use checkboxes so nothing can be missed.",
                    "Create a template or form that can be duplicated for every new client. This ensures uniformity.",
                    "Test it on the next order. Did following the checklist produce the perfect result? If not, update it."
                  ],
                  tips: ["Include screenshots.", "Keep it simple enough to skim."],
                  commonChallenges: ["Making it too rigid.", "Not updating it."],
                  successCriteria: ["Errors decrease.", "Speed increases."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Creating SOPs", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: The Checklist Manifesto", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Discipline", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Franchise", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Systems Building", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share SOPs in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Automate a single workflow using a tool like Zapier. Even saving 5 minutes a day adds up to 30 hours a year of found time.",
                  timeEstimate: "1 Hour",
                  deliverable: "Live Automation.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Pick a simple task to start with (e.g., save email attachment to Google Drive automatically).",
                    "Map the trigger (what starts it) and the action (what happens). Draw it out if needed.",
                    "Build it in your automation tool (Zapier, Make). Follow the prompts to connect your accounts.",
                    "Test it thoroughly to ensure reliability. Trigger it manually and watch it work."
                  ],
                  tips: ["Start simple.", "Document what the automation does."],
                  commonChallenges: ["Over-engineering.", "Breaking existing processes."],
                  successCriteria: ["The task happens without you touching it.", "You feel a sense of relief."]
                }
              ],
              resources: [
                { title: "Automation Tool", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Automation for Beginners", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Zapier 101", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Work Smart", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Tech Stack", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Automate Everything", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Automation Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Document the most important daily tasks. Getting these processes out of your head and onto paper is the first step toward true delegation.",
                  timeEstimate: "3 Hours",
                  deliverable: "SOP Docs.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Choose high-risk/high-frequency tasks. What happens every day, or what would be a disaster if messed up?",
                    "Record a Loom video doing the task. Talk through your thought process as you do it.",
                    "Bullet point the steps below the video. Make it easy to scan for someone who has done it before.",
                    "Add 'Why this matters' context. People follow rules better when they understand the purpose."
                  ],
                  tips: ["Use video, it's faster.", "Update them regularly."],
                  commonChallenges: ["Writing novels nobody reads.", "Being perfectionist."],
                  successCriteria: ["Someone else can do the task using only the doc.", "You have started your operations manual."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Writing Effective SOPs", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Knowledge Management", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Teacher Mindset", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Operations", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Systemization", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share SOPs in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Consolidate contacts and deals. Having a single, clean database allows you to market effectively and manage relationships without things falling through the cracks.",
                  timeEstimate: "2 Hours",
                  deliverable: "Clean CRM.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Import contacts from email, phone, and spreadsheets. Get everyone into one database.",
                    "Merge duplicate records so you don't annoy clients with double communications.",
                    "Tag contacts as 'active clients', 'leads', or 'past clients'. Segmentation allows for better marketing.",
                    "Set up a pipeline view to visualize your sales process. Know exactly where every deal stands."
                  ],
                  tips: ["Garbage in, garbage out.", "Make it a weekly habit."],
                  commonChallenges: ["Keeping data updated.", "Not using the tool."],
                  successCriteria: ["You trust your dashboard.", "You can find any client info instantly."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: CRM Best Practices", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Data Hygiene", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Organization", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Sales Ops", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Sales Pipeline", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask CRM Questions in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Connect your core platforms. Integrating your software stack eliminates manual data transfer and ensures your business runs on real-time information.",
                  timeEstimate: "2 Hours",
                  deliverable: "Integrated Stack.",
                  linkTo: "StrategyFormAutomation",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Map the data flow. Where does data start, and where does it need to end up?",
                    "Use native integrations or Zapier to bridge the gaps. Connect your CRM to your email tool, etc.",
                    "Test the data transfer. Create a fake record and watch it move through the system.",
                    "Document the connection so you know how to fix it if it breaks later."
                  ],
                  tips: ["Check for sync errors.", "Keep a log."],
                  commonChallenges: ["Data conflicts.", "Infinite loops."],
                  successCriteria: ["You enter data once, and it updates everywhere.", "Systems work in harmony."]
                }
              ],
              resources: [
                { title: "Automation Tool", type: "Tool", icon: "GitBranch", link: "StrategyFormAutomation" },
                { title: "Guide: Integration Patterns", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: API Basics", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Efficiency", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Tech Stack", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Tech Stack Audit", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Tech Support in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Write the Standard Operating Procedure for the task you are handing off. Clear instructions are the best insurance against poor performance when you delegate.",
                  timeEstimate: "1 Hour",
                  deliverable: "Completed SOP.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Record yourself doing the task one last time. Explain the 'why' and the nuances.",
                    "Write step-by-step instructions that are foolproof. Assume the person has zero prior knowledge.",
                    "Define what 'done' looks like. Show examples of good vs. bad work.",
                    "Set a review schedule. When will you check their work to ensure quality?"
                  ],
                  tips: ["Use video and text.", "Assume zero prior knowledge."],
                  commonChallenges: ["Micromanaging.", "Being vague about expectations."],
                  successCriteria: ["Someone else does the task correctly.", "You don't have to fix it."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: The Art of Delegation", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Effective Management", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Trusting Others", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: HR", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Leadership Lab", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Delegation in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Attract the right talent. A well-crafted job post attracts high-performers who can take your business to the next level, rather than just filling a seat.",
                  timeEstimate: "1 Hour",
                  deliverable: "Job Post & Candidates.",
                  linkTo: "StrategyFormBusinessModelCanvas",
                  foundationStepId: "business_model",
                  detailedSteps: [
                    "Write a clear job description based on your SOPs. Be honest about the requirements.",
                    "Define success metrics. How will you know if they are doing a good job?",
                    "Post on relevant boards (Upwork, LinkedIn, specialized sites). Go where the talent is.",
                    "Screen applicants by giving them a small test project. Don't just rely on interviews."
                  ],
                  tips: ["Hire for attitude, train for skill.", "Give a small test project."],
                  commonChallenges: ["Hiring in a panic.", "Hiring yourself (clones)."],
                  successCriteria: ["You have 3 qualified candidates.", "You are excited to hand off work."]
                }
              ],
              resources: [
                { title: "Ideal Client Persona", type: "Tool", icon: "Users", link: "StrategyFormIdealClient" },
                { title: "Guide: Hiring Best Practices", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Interview Skills", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Investing in People", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Recruitment", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Hiring Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Find Talent in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Walk them through the systems and SOPs. A structured onboarding process ensures your new hire feels confident and competent from day one.",
                  timeEstimate: "Ongoing",
                  deliverable: "Trained Team Member.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Share the vision and values of the company. Help them understand the bigger picture.",
                    "Walk through the tools and systems. Give them access and show them around.",
                    "Assign the first SOP and watch them do it. Correct gently as needed.",
                    "Review their output and give feedback immediately. Establish a high standard early."
                  ],
                  tips: ["Be patient.", "Encourage questions."],
                  commonChallenges: ["Expecting perfection immediately.", "Being unavailable."],
                  successCriteria: ["They execute the task independently.", "You trust them."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Employee Onboarding", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Training Techniques", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Patience", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: HR", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Team Culture", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Onboarding Tips in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Drive traffic to your optimized machine. With your backend ready, you can confidently turn up the marketing spend without fear of breaking your fulfillment process.",
                  timeEstimate: "Ongoing",
                  deliverable: "Increased Revenue.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Increase ad spend on your winning campaigns. Scale what works.",
                    "Send more emails to your list. Offer them new reasons to buy.",
                    "Ask for more referrals from happy clients. Leverage your recent success stories.",
                    "Partner with larger affiliates now that you can handle the volume."
                  ],
                  tips: ["Monitor quality control.", "Don't break the new team."],
                  commonChallenges: ["Scaling too fast.", "Breaking systems."],
                  successCriteria: ["Revenue hits a new high.", "Delivery remains smooth."]
                }
              ],
              resources: [
                { title: "Content Strategy Tool", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Scaling Strategies", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Growth Levers", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Thinking Big", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Scaleup", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: 10x Growth", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Celebrate Growth in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "List the traits of your perfect strategic partner. Creating a profile helps you recognize the right partners immediately and avoid wasting time on bad fits.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partner Profile.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Identify complementary industries. Who serves your customer before or after you do?",
                    "Check for audience overlap. Do they talk to the same people you want to reach?",
                    "Verify value alignment. Do they treat their customers well? Do they share your ethics?",
                    "Look for similar business maturity. Partnerships work best between peers of similar size."
                  ],
                  tips: ["Think 'upstream' and 'downstream' of your service.", "Look for non-competitors."],
                  commonChallenges: ["Chasing big names with no alignment.", "Ignoring smaller, high-quality partners."],
                  successCriteria: ["You have a list of 10 potential partners.", "You know exactly why they fit."]
                }
              ],
              resources: [
                { title: "Partnership Strategy Tool", type: "Tool", icon: "Users", link: "StrategyFormStrategicPartnerships" },
                { title: "Guide: Partnership Basics", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Finding Partners", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Win-Win Thinking", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Networking", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Strategic Alliances", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Find Partners in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Build a spreadsheet of 20 targets. A curated list of high-quality prospects is more valuable than a generic list of thousands of unrelated businesses.",
                  timeEstimate: "2 Hours",
                  deliverable: "Target List.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Search LinkedIn, Instagram, and Google. Look for businesses that fit your profile.",
                    "Ask your network for intros. Warm introductions are always better than cold outreach.",
                    "Find specific contact names. Do not send to 'info@'; find the owner or marketing lead.",
                    "Note a specific reason to connect. 'I love your article on X' is a better opener than 'Hi'."
                  ],
                  tips: ["Quality over quantity.", "Look for people already doing partnerships."],
                  commonChallenges: ["Not finding direct emails.", "Adding bad fits just to fill the list."],
                  successCriteria: ["You have 20 verified leads.", "You have a 'hook' for each."]
                }
              ],
              resources: [
                { title: "Partnership Strategy Tool", type: "Tool", icon: "Users", link: "StrategyFormStrategicPartnerships" },
                { title: "Guide: LinkedIn Networking", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Cold Outreach", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Networking Confidence", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: B2B Sales", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Prospecting Pro", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Intros in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "A summary of your audience stats and offer. This 'media kit' instantly communicates your value and makes you look like a serious professional.",
                  timeEstimate: "1 Hour",
                  deliverable: "Media Kit/One-Pager.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "List your audience size, email list count, and demographics. Show them you have reach.",
                    "Highlight engagement rates. Even a small engaged audience is valuable.",
                    "Propose specific collaboration ideas (e.g., Guest Post, Webinar, Bundle). Don't make them guess.",
                    "Include testimonials or logos of past partners to build social proof."
                  ],
                  tips: ["Make it visually professional.", "Focus on WIIFM (What's in it for them)."],
                  commonChallenges: ["Being shy about your numbers.", "Overselling."],
                  successCriteria: ["You look professional.", "The value proposition is obvious."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: Creating a Media Kit", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Value Propositions", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Self Worth", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Public Relations", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: PR Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Review Media Kit in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create a system to manage the pipeline. Whether it's a spreadsheet or a CRM, tracking your interactions ensures you never forget to follow up on a potential deal.",
                  timeEstimate: "1 Hour",
                  deliverable: "CRM/Sheet Tracker.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Create columns for Status, Last Contact, Next Step, and Notes. Keep it organized.",
                    "Draft your initial outreach scripts. Create a template but leave room for personalization.",
                    "Draft follow-up scripts. 'Just bumping this up' is a valid follow-up.",
                    "Schedule time for daily outreach. Consistency wins here."
                  ],
                  tips: ["Use a tool like Hunter.io for emails.", "Personalize every script."],
                  commonChallenges: ["Using generic templates.", "Not scheduling follow-up."],
                  successCriteria: ["You are ready to hit send.", "You have a plan for 'no'."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Follow-Up Strategy", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: CRM Management", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Rejection Proof", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Sales", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Pipeline Builder", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Outreach Tips in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Write a template email/pitch deck for potential partners. A well-structured proposal shows you've done your homework and respect their time.",
                  timeEstimate: "1.5 Hours",
                  deliverable: "Outreach Template.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Research the partner deeply. Read their latest blog posts or listen to their podcast.",
                    "Identify a gap you can fill for them. What problem can you solve for their audience?",
                    "Propose a specific, low-risk first step. Don't ask for marriage on the first date.",
                    "Highlight the benefit to *their* audience. Why will their people thank them for introducing you?"
                  ],
                  tips: ["Keep it short.", "Focus on 'giving' first."],
                  commonChallenges: ["Making the proposal all about you.", "Being vague about the next step."],
                  successCriteria: ["The email is personalized.", "It has a clear Call to Action."]
                }
              ],
              resources: [
                { title: "Partnership Strategy Tool", type: "Tool", icon: "Users", link: "StrategyFormStrategicPartnerships" },
                { title: "Guide: Writing Pitches", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Persuasion", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Empathy", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Deal Making", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Pitch Perfect", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Review Pitch in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Contact your top tier prospects. Taking action is the only way to get results; personalized outreach beats mass emailing every time.",
                  timeEstimate: "2 Hours",
                  deliverable: "Sent Emails/DMs.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Customize your template for each person. Mention something specific about them.",
                    "Comment on their recent work to show you pay attention. Flattery (if sincere) works.",
                    "Send the message via their preferred channel. Email is best for business, DMs for initial contact.",
                    "Log it in your tracker. Set a reminder to follow up in 3 days."
                  ],
                  tips: ["Send early in the week.", "Follow up on a different channel if needed."],
                  commonChallenges: ["Fear of rejection.", "Typos in names."],
                  successCriteria: ["You have started conversations.", "You have overcome the fear of asking."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Outreach Scripts", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Following Up", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Courage", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: B2B Marketing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Outreach Academy", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Outreach Wins in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Agree on terms and sign. Solidifying the details in writing ensures both parties are accountable and clears the way for a successful partnership.",
                  timeEstimate: "1 Hour",
                  deliverable: "Signed Partnership Agreement.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Discuss revenue share or referral fees. Be transparent about money.",
                    "Set deadlines for deliverables. Who does what by when?",
                    "Agree on promotion methods. How will they share your link? Email? Social?",
                    "Put it in writing. A simple email confirmation or a basic contract prevents amnesia."
                  ],
                  tips: ["Use a simple MOU (Memorandum of Understanding).", "Be fair."],
                  commonChallenges: ["Being afraid to talk money.", "Assuming they know what you mean."],
                  successCriteria: ["You have a launch date.", "Money terms are clear."]
                }
              ],
              resources: [
                { title: "Partnership Strategy Tool", type: "Tool", icon: "Users", link: "StrategyFormStrategicPartnerships" },
                { title: "Guide: Contract Basics", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Negotiation 101", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Fairness", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Legal", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Deal Structuring", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask Legal Questions in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Build a folder of assets for your partner. Providing ready-to-use materials removes the friction of creation and ensures your brand is represented correctly.",
                  timeEstimate: "2 Hours",
                  deliverable: "Partner Asset Pack.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Write email copy for them to send to their list. Make it sound like it comes from them.",
                    "Design social graphics with their logo and yours. Make them look professional.",
                    "Create a custom landing page for their audience. 'Welcome [Partner] Fans!' increases conversion.",
                    "Send the package with clear instructions. Make it 'copy-paste' easy."
                  ],
                  tips: ["Make it 'copy-paste' ready.", "Provide multiple options."],
                  commonChallenges: ["Sending incomplete files.", "Not testing links."],
                  successCriteria: ["The partner has everything they need.", "They are impressed by your organization."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: Creating Marketing Assets", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Graphic Design Basics", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Service Orientation", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Design", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Asset Creation", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Design Feedback in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Host the webinar, send the emails, or publish the guest post. Execute the launch plan flawlessly to maximize the impact of your combined reach.",
                  timeEstimate: "Ongoing",
                  deliverable: "Completed Event/Campaign.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Coordinate launch times. Ensure you both hit send at the agreed moment.",
                    "Cross-promote on social media. Tag each other and share stories.",
                    "Ensure tracking links work. You need to know exactly who sent which lead.",
                    "Thank the partner publicly. Show appreciation for their collaboration."
                  ],
                  tips: ["Over-communicate with your partner.", "Have a backup plan for tech issues."],
                  commonChallenges: ["Misaligned timing.", "One side not promoting."],
                  successCriteria: ["You gained new leads.", "The partner is happy and wants to do it again."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Webinar Hosting", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Joint Ventures", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Partnership", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Events", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Launch Day Live", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Announce Event in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Review metrics and share feedback. Honest analysis strengthens the relationship and sets the stage for future, even more successful collaborations.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partnership Report.",
                  linkTo: "StrategyFormStrategicPartnerships",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Share your data (leads/sales generated). Transparency builds trust.",
                    "Ask for their data. Did they get what they wanted out of it?",
                    "Discuss audience feedback. Did people love it or hate it?",
                    "Pay any commissions due immediately. Speed of payment is a huge trust signal."
                  ],
                  tips: ["Pay fast to build trust.", "Send a thank you gift."],
                  commonChallenges: ["Ghosting after the promo.", "Hiding bad results."],
                  successCriteria: ["Commission is paid.", "You have agreed to a next step."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Post-Mortem Analysis", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Analytics for Partnerships", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Continuous Improvement", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Analytics", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Data Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss ROI in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Ensure new leads are being onboarded. A tailored welcome series for partner leads validates their decision to follow you and deepens the new relationship.",
                  timeEstimate: "1 Hour",
                  deliverable: "Engaged New Audience.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Check email open rates for the specific partner segment. Are they engaging?",
                    "Send a special welcome email acknowledging the partner. 'Friends of [Partner]' deserve a warm hello.",
                    "Offer additional value related to what they just consumed. Keep the momentum going.",
                    "Monitor unsubscribe rates. If they are leaving, your message might be off."
                  ],
                  tips: ["Reference the partner in the first email.", "Over-deliver."],
                  commonChallenges: ["Treating them like cold leads.", "Spamming them."],
                  successCriteria: ["They are engaging with your content.", "They are converting to customers."]
                }
              ],
              resources: [
                { title: "Email Marketing Tool", type: "Tool", icon: "Mail", link: "StrategyFormEmailMarketing" },
                { title: "Guide: Lead Nurturing", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Welcome Series", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Hospitality", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Email", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Nurture Architect", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Email Tips in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Refine your process based on the pilot. Turning your experience into a documented system allows you to run multiple partnerships without burning out.",
                  timeEstimate: "1 Hour",
                  deliverable: "Partnership System.",
                  linkTo: "SOPs",
                  foundationStepId: "strategic_partnerships",
                  detailedSteps: [
                    "Update your email templates with better copy based on what worked.",
                    "Fix any broken process steps you discovered during the launch.",
                    "Reach out to the next 5 partners on your list with confidence.",
                    "Automate the reporting or payout process to save time."
                  ],
                  tips: ["Always be improving.", "Ask for referrals from partners."],
                  commonChallenges: ["Stopping after one win.", "Getting complacent."],
                  successCriteria: ["You have a pipeline of partners.", "It takes less effort to launch."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Scaling Partnerships", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Systematization", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Scaling Up", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Business Development", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Growth Systems", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Scaling in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Write the 'rules of engagement' and mission for the group. A manifesto acts as a magnet for the right people and a filter for the wrong ones, ensuring your community culture starts strong.",
                  timeEstimate: "1 Hour",
                  deliverable: "Community Guidelines.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Define who this space is for. Is it for beginners, experts, or a specific niche?",
                    "Define who it is NOT for. Be clear about behaviors or types of people who won't fit in.",
                    "Set the tone of the culture. Is it supportive, critical, professional, or casual?",
                    "Create 3 golden rules that summarize expectations (e.g., 'Be Kind', 'No Self-Promo', 'Give First')."
                  ],
                  tips: ["Make it aspirational.", "Focus on culture, not just policing."],
                  commonChallenges: ["Being too strict.", "Being too vague."],
                  successCriteria: ["Members feel safe.", "The purpose is pinned to the top."]
                }
              ],
              resources: [
                { title: "Mission & Vision Template", type: "Tool", icon: "FileText", link: "StrategyFormMissionVision" },
                { title: "Guide: Community Guidelines", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Community Strategy", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Leadership", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Membership", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Community Architect", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Manifesto in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            },
            {
              title: "Configure Your HQ Community",
              description: "This week you leverage The HQ's built-in community features to build your tribe. Instead of relying on distracted platforms like Facebook, you will set up a dedicated, professional space right here in your Business Minds HQ account.",
              whyItMatters: "Ownership matters. Building on rented land puts you at risk of algorithm changes. The HQ gives you a dedicated, ad-free space to foster deep connections.",
              howItStreamlines: "It keeps everything in one place. Your content, courses, and community live together.",
              howItBuildsRelationships: "It feels premium. Members appreciate a focused environment away from social media noise.",
              actionSteps: [
                {
                  title: "Setup HQ Community Profile",
                  description: "Initialize your community space within The HQ. Configuring your dedicated space ensures your members have a seamless, branded experience from day one.",
                  timeEstimate: "2 Hours",
                  deliverable: "Live HQ Community Space.",
                  linkTo: "TheCommunity", // Linking to the community page
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Navigate to the 'Community' tab in your HQ dashboard and click 'Create Space'.",
                    "Upload your community logo and cover image to match your brand identity.",
                    "Set up your initial 'Channels' or 'Topics' (e.g., Introductions, General Chat, Wins). Keep it simple to start.",
                    "Customize your welcome message that members see immediately upon joining."
                  ],
                  tips: ["Use high-quality images.", "Write a warm welcome message."],
                  commonChallenges: ["Creating too many empty channels.", "Forgetting to test the mobile view."],
                  successCriteria: ["Your community is live and branded.", "You can post your first welcome message."]
                }
              ],
              resources: [
                { title: "Brand Identity Kit", type: "Tool", icon: "Palette", link: "StrategyFormBrandIdentity" },
                { title: "Guide: Community Setup", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Community Platforms", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Hosting", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Online Communities", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Community Launch", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Get Setup Help in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Create value posts to welcome members. Pre-loading the feed ensures that early adopters have something to engage with, preventing the awkward silence of a new group.",
                  timeEstimate: "1 Hour",
                  deliverable: "Active Feed.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Write a 'Welcome & Start Here' post. Tell them exactly what to do first.",
                    "Write an 'Introduce Yourself' thread. Ask specific questions to make it easy to answer.",
                    "Post a valuable resource or guide that is exclusive to the group. Give them a quick win.",
                    "Ask a provocative question related to your niche. Spark a debate or discussion."
                  ],
                  tips: ["Tag people if you have early testers.", "Reply to your own posts if needed to add info."],
                  commonChallenges: ["Waiting for others to post.", "Posting boring updates."],
                  successCriteria: ["The feed looks alive.", "There are places to comment."]
                }
              ],
              resources: [
                { title: "Content Calendar", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Community Content", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Engagement Starters", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Contribution", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Social Media", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Content Engine", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Test Posts in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Personally reach out to seed the group. These initial members are your culture carriers; selecting them personally ensures the tone is set correctly.",
                  timeEstimate: "2 Hours",
                  deliverable: "20 Active Members.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Identify your biggest fans, best clients, or friends in the industry.",
                    "Send a personal invite explaining the vision. Tell them you want them to shape the culture.",
                    "Give them 'Founding Member' status or a special badge. Recognize their early support.",
                    "Ask them to introduce themselves immediately. Get the ball rolling."
                  ],
                  tips: ["Make it exclusive.", "Ask for their help to build it."],
                  commonChallenges: ["Mass emailing invites.", "Ignoring them once they join."],
                  successCriteria: ["You have 20 people in the group.", "Introductions are flowing."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Launching a Community", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Beta Launching", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Rejection", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Coaching", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Founding Members", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Celebrate New Members in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Design recurring posts to drive engagement. Establishing consistent touchpoints gives members a reason to return and a predictable way to participate.",
                  timeEstimate: "1 Hour",
                  deliverable: "Engagement Calendar.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Pick a theme for each day (e.g., Motivation Monday, Win Wednesday). Consistency creates habit.",
                    "Schedule the posts in advance using your community tool. Don't rely on remembering to post.",
                    "Tag specific members to start the conversation. 'Hey @Name, I know you did this recently...'",
                    "Reply to every single comment. Reward behavior you want to see repeated."
                  ],
                  tips: ["Ask open-ended questions.", "Use polls for easy engagement."],
                  commonChallenges: ["Giving up too soon.", "Posting and ghosting."],
                  successCriteria: ["Members start posting without you.", "Discussions are happening."]
                }
              ],
              resources: [
                { title: "Content Calendar", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Community Engagement", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Creating Rituals", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Consistency", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Community Manager", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Engagement Boost", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Share Rituals in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Run a live Zoom/Stream for members. A live event serves as a heartbeat for the community, synchronizing everyone's attention and creating real-time value.",
                  timeEstimate: "2 Hours",
                  deliverable: "Recorded Event.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Pick a topic or format (Q&A is easiest). You don't need a huge presentation.",
                    "Schedule it and send reminders. People forget, so remind them 1 hour before.",
                    "Host the session with energy. Facilitate connection between members, don't just lecture.",
                    "Post the replay for those who missed it. Keep the value living in the feed."
                  ],
                  tips: ["Keep it under an hour.", "Call people by name."],
                  commonChallenges: ["Fear of no one showing up.", "Tech failures."],
                  successCriteria: ["People attended.", "They asked questions."]
                }
              ],
              resources: [
                { title: "Content Calendar", type: "Tool", icon: "Calendar", link: "StrategyFormContentStrategy" },
                { title: "Guide: Hosting Live Events", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Facilitation Skills", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Presence", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Events", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Live Event Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Announce Event in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Promote the community to your email list/social. Now that the fire is burning, invite the world to warm their hands. Position the community as the 'place to be'.",
                  timeEstimate: "1 Hour",
                  deliverable: "New Member Influx.",
                  linkTo: "StrategyFormEmailMarketing",
                  foundationStepId: "email_marketing",
                  detailedSteps: [
                    "Write an email selling the benefits of joining. Focus on the community, not just the content.",
                    "Create a social post showcasing the discussions happening inside. FOMO (Fear Of Missing Out) works.",
                    "Create a simple join link. Make it frictionless to get in.",
                    "Welcome the new wave warmly. Ensure the culture stays strong as new people enter."
                  ],
                  tips: ["Show, don't just tell.", "Highlight member wins."],
                  commonChallenges: ["Diluting the culture.", "Overwhelming the feed."],
                  successCriteria: ["Membership grows by 20%.", "Culture remains strong."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Community Growth", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Viral Loops", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Scarcity vs Abundance", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Marketing", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Growth Hacking", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Ask for Referrals in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Review and enforce guidelines. Great communities are defined as much by what they disallow as what they allow. Enforcing standards protects the value for everyone.",
                  timeEstimate: "1 Hour",
                  deliverable: "Safe Space.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Delete spam immediately. It signals that the space is cared for.",
                    "Reach out privately to rule-breakers. Assume positive intent first, but be firm.",
                    "Praise good behavior publicly. Reinforce what you want to see more of.",
                    "Update guidelines if new issues arise. Culture is a living thing."
                  ],
                  tips: ["Be firm but kind.", "Don't let things fester."],
                  commonChallenges: ["Being afraid to kick people out.", "Letting spam slide."],
                  successCriteria: ["The feed is high quality.", "Members report spam for you."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Community Moderation", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Conflict Resolution", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Boundaries", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: HR", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Leadership", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Discuss Rules in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Invite top members to a special role. Formalizing the status of your best members gives them permission to lead and creates a powerful inner circle.",
                  timeEstimate: "2 Hours",
                  deliverable: "Ambassador Group.",
                  linkTo: "StrategyFormCommunityBuilding",
                  foundationStepId: "community_building",
                  detailedSteps: [
                    "Review engagement stats to see who is posting and commenting most.",
                    "Reach out personally to top 5 members. Thank them for their contributions.",
                    "Offer them a special badge, title, or access. Recognition costs nothing but means everything.",
                    "Ask for their feedback on the community. Treat them like insiders."
                  ],
                  tips: ["Make them feel special.", "Listen to their advice."],
                  commonChallenges: ["Picking the wrong people.", "Expecting them to work for free (give perks!)."],
                  successCriteria: ["You have a trusted inner circle.", "They defend the culture."]
                }
              ],
              resources: [
                { title: "Ideal Client Persona", type: "Tool", icon: "Users", link: "StrategyFormIdealClient" },
                { title: "Guide: Ambassador Programs", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Influencer Marketing", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Empowerment", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Influencer", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Champion Building", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Recognize Leaders in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Present a product/service to the group. When you solve problems for free, people will happily pay you to solve bigger problems. Make an offer that feels like a natural next step.",
                  timeEstimate: "1 Hour",
                  deliverable: "Sales.",
                  linkTo: "StrategyFormValueProposition",
                  foundationStepId: "value_proposition",
                  detailedSteps: [
                    "Identify a problem the community is discussing. Use their own words.",
                    "Position your product as the solution to that exact problem. It's service, not sales.",
                    "Offer a 'Member Exclusive' discount or bonus. Reward them for being in the group.",
                    "Share success stories from other members who have used the product."
                  ],
                  tips: ["Don't be pushy.", "Focus on value."],
                  commonChallenges: ["Fear of 'ruining' the community.", "Selling irrelevant stuff."],
                  successCriteria: ["Members buy.", "They thank you for the offer."]
                }
              ],
              resources: [
                { title: "Sales Funnel Builder", type: "Tool", icon: "Filter", link: "StrategyFormWebsiteLaunch" },
                { title: "Guide: Community Monetization", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Social Selling", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Selling is Serving", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: E-commerce", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Launch Mastery", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Make Offer in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Collect qualitative feedback. Understanding what your members truly value allows you to double down on what works and cut what doesn't.",
                  timeEstimate: "1 Hour",
                  deliverable: "Community Health Report.",
                  linkTo: "StrategyFormContentStrategy",
                  foundationStepId: "content_strategy",
                  detailedSteps: [
                    "Create a simple form. Don't make it a homework assignment.",
                    "Ask 'What is your favorite part of this group?'. Do more of that.",
                    "Ask 'What would you change?'. Fix that.",
                    "Share the results and your plan with the group. Close the feedback loop."
                  ],
                  tips: ["Act on the feedback.", "Be transparent."],
                  commonChallenges: ["Ignoring the results.", "Getting defensive."],
                  successCriteria: ["You know what to build next.", "Members feel heard."]
                }
              ],
              resources: [
                { title: "Audit Checklist", type: "Tool", icon: "ClipboardCheck", link: "AnnualPlanning" },
                { title: "Guide: Analyzing Feedback", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Customer Listening", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Growth Mindset", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Product Manager", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Feedback Systems", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Post Survey in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
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
                  description: "Ensure SOPs and Ambassadors are working. A truly scalable community is one that can run itself for short periods. Test your systems to ensure freedom.",
                  timeEstimate: "2 Hours",
                  deliverable: "Automated Community.",
                  linkTo: "SOPs",
                  foundationStepId: "automation_systematization",
                  detailedSteps: [
                    "Check if moderation is happening automatically or by ambassadors.",
                    "Check if content is scheduled or if members are generating enough on their own.",
                    "Check if new members are welcomed without your direct intervention.",
                    "Take a day off and see what happens. If it breaks, fix the system."
                  ],
                  tips: ["Trust your team.", "Celebrate independence."],
                  commonChallenges: ["Micromanaging.", "Fear of irrelevance."],
                  successCriteria: ["The community thrives while you rest.", "It is a true asset."]
                }
              ],
              resources: [
                { title: "SOP Template", type: "Tool", icon: "FileText", link: "SOPs" },
                { title: "Guide: Scaling Communities", type: "Guide", icon: "BookOpen", link: "Guides" },
                { title: "Lesson: Automation", type: "Lesson", icon: "Lightbulb", link: "QuickLessons" },
                { title: "Mindset: Letting Go", type: "Mindset", icon: "Brain", link: "MindsetHacks" },
                { title: "Niche Roadmap: Operations", type: "Niche", icon: "Map", link: "NicheRoadmaps" },
                { title: "Program: Freedom Founder", type: "Program", icon: "Target", link: "FocusedPrograms" },
                { title: "Celebrate Freedom in Community", type: "Community", icon: "Users", link: "TheCommunity" }
              ]
            }
          ]
        }
      ]
    }
  }
};

// Define all niche roadmaps with businessType and stage
const nicheRoadmaps = {
  non_profit_growth: nonProfitGrowthRoadmap,
  ecommerce_growth: ecommerceGrowthRoadmap,
  private_community_growth: privateCommunityGrowthRoadmap,
  book_author_growth: {
    stage: "startup",
    businessType: "for_profit",
    icon: "📚",
    courseTitle: "Book Author Growth Plan",
    courseDescription: "Build an audience, form a community, and grow book sales"
  },
  life_coach_growth: {
    stage: "startup",
    businessType: "for_profit",
    icon: "🎯",
    courseTitle: "Life Coach Business Plan",
    courseDescription: "Build a thriving coaching practice with consistent client flow"
  },
  podcast_growth: {
    stage: "growth",
    businessType: "for_profit",
    icon: "🎙️",
    courseTitle: "Podcast Growth Plan",
    courseDescription: "Launch a chart-topping podcast and build a loyal listener base"
  },
  musical_artist_growth: {
    stage: "growth",
    businessType: "for_profit",
    icon: "🎵",
    courseTitle: "Musical Artist Growth Plan",
    courseDescription: "Launch your music career and build a superfan community"
  },
  social_enterprise_growth: { stage: "startup", businessType: "social_business", icon: "🌱", courseTitle: "Social Enterprise Growth Plan", courseDescription: "Build a profitable business model that creates measurable social impact" },
  sustainable_business_growth: { stage: "growth", businessType: "social_business", icon: "♻️", courseTitle: "Sustainable Business Scaling Plan", courseDescription: "Scale your eco-friendly business while maintaining environmental mission" },
  social_business_growth: { stage: "startup", businessType: "social_business", icon: "🌍", courseTitle: "Social Business Growth Plan: 90-Day Dual-Impact System", courseDescription: "Scale your revenue while deepening your social mission through impact investment, customer acquisition, and dual-bottom-line metrics." }
};

const roadmapData = { vision, startup, growth, nicheRoadmaps };
export default roadmapData;