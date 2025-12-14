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
              description: "This week is about digging deep to uncover the 'Why' behind your business. A strong vision acts as your north star, guiding every decision you make. You will define your mission, vision, and core values to set a solid foundation.",
              whyItMatters: "Without a clear vision, you're just busy, not productive. Your vision aligns your actions with your long-term goals.",
              howItStreamlines: "Knowing your 'Why' makes decision-making faster and easier. You'll know exactly what to say 'yes' to and what to ignore.",
              howItBuildsRelationships: "Customers buy 'why' you do it, not just 'what' you do. A clear purpose attracts your ideal audience.",
              actionSteps: [
                {
                  title: "Draft Your Mission Statement",
                  description: "Create a concise statement defining what you do, who you do it for, and the benefit.",
                  timeEstimate: "1 Hour",
                  deliverable: "A clear, 1-2 sentence mission statement.",
                  linkTo: "StrategyFormMissionVision",
                  foundationStepId: "mission_vision",
                  detailedSteps: [
                    "Reflect on the problem you solve for your customers.",
                    "Identify your primary target audience.",
                    "Articulate the specific value or transformation you provide.",
                    "Combine these elements into a single, powerful sentence."
                  ],
                  tips: [
                    "Keep it simple and jargon-free.",
                    "Focus on the benefit to the customer, not just your features."
                  ],
                  commonChallenges: [
                    "Trying to include too much detail.",
                    "Being too vague or generic."
                  ],
                  successCriteria: [
                    "You can recite it from memory.",
                    "It clearly explains your business to a stranger."
                  ]
                },
                {
                  title: "Define Your Core Values",
                  description: "Identify 3-5 guiding principles that will shape your company culture and decisions.",
                  timeEstimate: "45 Minutes",
                  deliverable: "List of 3-5 core values with brief descriptions.",
                  linkTo: "StrategyFormBrandIdentity",
                  foundationStepId: "brand_identity",
                  detailedSteps: [
                    "Brainstorm a list of values that are important to you.",
                    "Group similar values together.",
                    "Select the top 3-5 that resonate most.",
                    "Write a brief definition for each value."
                  ],
                  tips: [
                    "Choose values that are authentic to you.",
                    "Consider how these values will impact your daily operations."
                  ],
                  commonChallenges: [
                    "Choosing values that sound good but aren't real.",
                    "Ignoring values when making tough decisions."
                  ],
                  successCriteria: [
                    "You can explain why each value matters.",
                    "They help you make difficult choices."
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