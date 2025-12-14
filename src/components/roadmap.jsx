import { createPageUrl } from "@/utils";

// Base roadmap structure - detailed content loaded from database
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
              description: "This week is fundamentally about digging deep to uncover the profound 'Why' that drives your business forward. A strong, articulated vision acts as your unwavering north star, guiding every single strategic decision you will make in the future. By defining your mission, vision, and core values now, you are setting a solid, unshakeable foundation for all your future growth. This process prevents you from drifting off course when challenges arise and ensures that your brand communicates a consistent message to the world. Ultimately, gaining this clarity will energize you and attract the right customers who believe in what you believe.",
              whyItMatters: "Without a clear vision, you're often just busy, not truly productive or effective. Your vision aligns your daily actions with your long-term goals, ensuring that every step you take moves you in the right direction.",
              howItStreamlines: "Knowing your 'Why' dramatically speeds up decision-making by providing a clear filter for your choices. You'll know exactly what opportunities to say 'yes' to and, more importantly, which distractions to ignore.",
              howItBuildsRelationships: "Customers don't just buy what you do; they buy 'why' you do it. A clear, authentic purpose resonates emotionally with people, attracting your ideal audience and building lasting loyalty.",
              actionSteps: [
                {
                  title: "Draft Your Mission Statement",
                  description: "Create a concise, powerful statement that clearly defines exactly what you do, who you do it for, and the primary benefit they receive. This statement will serve as your daily operational guide, keeping you focused on your core deliverables. It is not just a slogan but a functional tool that clarifies your business's immediate purpose to yourself and your team. By the end of this task, you will have a sentence that instantly communicates your value proposition to anyone who asks.",
                  timeEstimate: "1 Hour",
                  deliverable: "A clear, 1-2 sentence mission statement.",
                  linkTo: "StrategyFormMissionVision",
                  foundationStepId: "mission_vision",
                  detailedSteps: [
                    "Start by deeply reflecting on the specific problem or pain point you solve for your customers. Write down all the ways your product or service alleviates this issue and improves their lives. Be specific about the tangible outcomes they experience after working with you.",
                    "Next, clearly identify and describe your primary target audience. Who are the specific people or businesses that benefit most from what you offer? Understanding exactly who you serve allows you to tailor your language to resonate deeply with them.",
                    "Now, articulate the specific value or transformation you provide to this audience. What is the 'before and after' state of your customer? Focus on the unique mechanism or approach you use that makes your solution different and better than alternatives.",
                    "Finally, combine these elements—the problem, the audience, and the transformation—into a single, powerful, and grammatical sentence. Edit this sentence ruthlessly to remove jargon and fluff until it is sharp and memorable. Read it aloud to ensure it flows well and sounds confident."
                  ],
                  tips: [
                    "Keep it simple and jargon-free; a 5th grader should understand it.",
                    "Focus strictly on the benefit to the customer, not just your features."
                  ],
                  commonChallenges: [
                    "Trying to include too much detail or cover every edge case.",
                    "Being too vague, generic, or using corporate buzzwords."
                  ],
                  successCriteria: [
                    "You can recite it easily from memory without stumbling.",
                    "It clearly and instantly explains your business to a stranger."
                  ]
                },
                {
                  title: "Define Your Core Values",
                  description: "Identify 3-5 guiding principles that will fundamentally shape your company culture, hiring decisions, and customer interactions. These values are the non-negotiable rules of the road for how you conduct business and treat people. They act as a behavioral compass, helping you navigate difficult ethical dilemmas and trade-offs. When your values are clear, you attract employees and customers who share those beliefs, creating a stronger community.",
                  timeEstimate: "45 Minutes",
                  deliverable: "List of 3-5 core values with brief descriptions.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Begin by brainstorming a long list of values and attributes that are personally important to you. Think about times when you felt proud of a decision, or conversely, times when you felt a decision was 'wrong'. Write down every word that comes to mind without filtering.",
                    "Look for patterns in your list and group similar values together under a common theme. For example, 'honesty', 'transparency', and 'candor' might all fit under 'Integrity'. This helps you narrow down your list from twenty concepts to a manageable few.",
                    "Select the top 3-5 themes that resonate most deeply and feel essential to your mission. These should be values you would be willing to lose money to uphold, not just nice-to-haves. If everything is a priority, nothing is, so be selective.",
                    "Write a brief, action-oriented definition for each value that explains what it looks like in practice. Instead of just saying 'Integrity', define it as 'We do the right thing, even when no one is watching.' This makes the value actionable and measurable for your team."
                  ],
                  tips: [
                    "Choose values that are authentic to you, not just what sounds 'corporate'.",
                    "Consider how these values will impact your daily operations and difficult choices."
                  ],
                  commonChallenges: [
                    "Choosing aspirational values that sound good but aren't actually practiced.",
                    "Ignoring values when making tough financial or personnel decisions."
                  ],
                  successCriteria: [
                    "You can explain exactly why each value matters to the business success.",
                    "They help you make difficult choices by providing a clear framework."
                  ]
                }
              ],
              tools: [
                { name: "Mission & Vision Template", icon: "FileText" },
                { name: "Core Values Worksheet", icon: "ListChecks" }
              ],
              resources: ["Quick Lesson: The Power of Why", "Guide: Crafting a Compelling Vision"]
            }
            // Add more detailed weeks here for Month 1 if desired
          ]
        },
        {
          title: "Month 2: Business Structure & Brand", 
          focus: "Establish legal foundation, develop brand identity, create operational systems",
          weeks: []
        },
        {
          title: "Month 3: Launch & Growth",
          focus: "Launch first offer, get customers, set up systems, plan next 90 days",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Operations & Financial Planning",
          focus: "Define operations model, create financial projections, plan team structure",
          weeks: []
        },
        {
          title: "Month 3: Launch Strategy & Execution",
          focus: "Finalize plan, create launch timeline, prepare for market entry",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Content & Campaign Strategy",
          focus: "Create content strategy, plan campaigns, build marketing calendar",
          weeks: []
        },
        {
          title: "Month 3: Launch & Optimization",
          focus: "Execute marketing plan, measure results, optimize based on data",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Experience Optimization",
          focus: "Optimize touchpoints, remove friction, create wow moments",
          weeks: []
        },
        {
          title: "Month 3: Retention & Advocacy",
          focus: "Build loyalty programs, referral systems, customer success processes",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Systems & Automation",
          focus: "Implement automation, build scalable systems, optimize resource allocation",
          weeks: []
        },
        {
          title: "Month 3: Team & Revenue Scaling",
          focus: "Build team, scale revenue streams, prepare for next growth phase",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Partnership Development",
          focus: "Reach out, negotiate terms, establish partnerships",
          weeks: []
        },
        {
          title: "Month 3: Partnership Activation",
          focus: "Launch partnerships, track results, optimize collaboration",
          weeks: []
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
          weeks: []
        },
        {
          title: "Month 2: Community Growth",
          focus: "Recruit members, create valuable content, build engagement",
          weeks: []
        },
        {
          title: "Month 3: Community Monetization",
          focus: "Leverage community for business growth, create member success stories",
          weeks: []
        }
      ]
    }
  }
};

const roadmapData = { vision, startup, growth };
export default roadmapData;