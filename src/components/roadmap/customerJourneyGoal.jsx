export const customerJourneyGoal = {
    title: "Develop Your Customer Journey",
    description: "Design and optimize complete customer experience from first touch to loyal advocate, leveraging all HQ features",
    months: [
        {
            title: "Month 1: Foundation & Awareness Stage",
            weeks: [
                {
                    weekNumber: 1,
                    title: "Understand Your Customer & Journey Framework",
                    description: "Deepen understanding of ideal client and introduce holistic customer journey",
                    whyItMatters: "Without deep understanding, marketing and sales become guesswork.",
                    howItStreamlines: "Creates single source of truth aligning entire team.",
                    howItBuildsRelationships: "Demonstrates genuine understanding fostering trust.",
                    realWorldExample: "Airbnb constantly refines journey using data and feedback.",
                    foundationLinks: [
                        {
                            docType: 'ideal_client',
                            link: 'StrategyFormIdealClient',
                            title: 'Ideal Client Profile',
                            description: 'Review your ideal client',
                            icon: 'UserCheck'
                        },
                        {
                            docType: 'customer_journey',
                            link: 'StrategyFormCustomerJourney',
                            title: 'Customer Journey Map',
                            description: 'Start mapping journey',
                            icon: 'Route'
                        }
                    ],
                    hqFeatures: [
                        {
                            name: "Elyzet AI",
                            icon: "Sparkles",
                            description: "Get guided reflection on customer insights"
                        },
                        {
                            name: "Customer Journey Guide",
                            icon: "Route",
                            description: "Access comprehensive mapping tool"
                        }
                    ],
                    tools: [
                        { name: "Ideal Client Persona", icon: "UserCheck" },
                        { name: "Empathy Maps", icon: "Heart" },
                        { name: "Customer Interview Guide", icon: "MessageCircle" }
                    ],
                    actionSteps: [
                        {
                            title: "Review and Refine Ideal Client Profiles",
                            description: "Enhance personas with emotional depth",
                            deliverable: "Updated Ideal Client Profile",
                            timeEstimate: "3-4 hours",
                            foundationStepId: 'ideal_client',
                            linkTo: 'StrategyFormIdealClient',
                            detailedSteps: [
                                "Access StrategyFormIdealClient in Foundation Roadmap",
                                "Add emotional depth: What does success feel like?",
                                "Interview 3-5 customers to validate insights",
                                "Document fears, frustrations, desires",
                                "Update profile with new insights"
                            ],
                            tips: [
                                "Focus on why they feel certain ways",
                                "Look for patterns in language",
                                "Base on real conversations"
                            ],
                            successCriteria: [
                                "Profile feels like a real person",
                                "Includes emotional drivers",
                                "Validated by 3+ conversations"
                            ]
                        },
                        {
                            title: "Define Core Problem & Desired Outcome",
                            description: "Articulate specific problem and transformation",
                            deliverable: "Problem and outcome statement",
                            timeEstimate: "2 hours",
                            detailedSteps: [
                                "Identify most pressing problem you solve",
                                "Describe negative consequences",
                                "Articulate ideal future state",
                                "Test with 2-3 customers"
                            ],
                            successCriteria: [
                                "Problem is crystal clear",
                                "Emotionally resonant",
                                "Linked to your solution"
                            ]
                        },
                        {
                            title: "Introduce Customer Journey Framework",
                            description: "Understand 5 stages: Awareness, Consideration, Decision, Service, Loyalty",
                            deliverable: "Basic outline of each stage",
                            timeEstimate: "1-2 hours",
                            foundationStepId: 'customer_journey',
                            linkTo: 'StrategyFormCustomerJourney',
                            detailedSteps: [
                                "Review 5 core stages",
                                "Brainstorm what customer does at each stage",
                                "Access HQCustomerJourneyGuide for framework"
                            ],
                            successCriteria: [
                                "Can describe all 5 stages",
                                "Framework documented in tool"
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};