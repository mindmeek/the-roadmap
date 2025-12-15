export const staticSocialMediaPlans = {
    "goal": {
        "Brand Awareness": {
            months: [
                {
                    month: 1,
                    theme: "Introduction & Value",
                    focus: "Establishing Authority",
                    weeks: [
                        {
                            week: 1,
                            focus: "Who We Are",
                            days: [
                                { day: 1, platform: "Instagram/LinkedIn", topic: "The Origin Story", content_type: "Video/Image", hq_feature: "HQ AI Assistant", action: "Share why you started your business. Be authentic." },
                                { day: 2, platform: "All Channels", topic: "Problem vs. Solution", content_type: "Carousel", hq_feature: "HQ Community", action: "Break down a common industry myth." },
                                { day: 3, platform: "Stories", topic: "Behind the Scenes", content_type: "Video", hq_feature: "The Beacon Studio", action: "Show your workspace or daily routine." }
                            ]
                        },
                        {
                            week: 2,
                            focus: "Educational Content",
                            days: [
                                { day: 1, platform: "LinkedIn/Blog", topic: "Top 3 Tips", content_type: "Article", hq_feature: "HQ AI Assistant", action: "Share actionable advice for your niche." },
                                { day: 2, platform: "Instagram", topic: "Did You Know?", content_type: "Graphic", hq_feature: "HQ Files", action: "Share a surprising statistic." },
                                { day: 3, platform: "Facebook", topic: "Community Question", content_type: "Text", hq_feature: "HQ Community", action: "Ask your audience about their biggest challenge." }
                            ]
                        }
                    ]
                },
                {
                    month: 2,
                    theme: "Engagement & Community",
                    focus: "Building Relationships",
                    weeks: [
                        {
                            week: 1,
                            focus: "User Generated Content",
                            days: [
                                { day: 1, platform: "Instagram", topic: "Customer Spotlight", content_type: "Image", hq_feature: "HQ CRM", action: "Highlight a happy client or customer." },
                                { day: 2, platform: "Stories", topic: "Q&A Session", content_type: "Video", hq_feature: "HQ Community", action: "Answer questions from your followers." }
                            ]
                        }
                    ]
                }
            ]
        },
        "Lead Generation": {
            months: [
                {
                    month: 1,
                    theme: "Problem Awareness",
                    focus: "Identifying Pain Points",
                    weeks: [
                        {
                            week: 1,
                            focus: "Agitating the Problem",
                            days: [
                                { day: 1, platform: "LinkedIn", topic: "The Cost of Inaction", content_type: "Text", hq_feature: "HQ AI Assistant", action: "Explain what happens if they don't solve their problem." },
                                { day: 2, platform: "Instagram", topic: "Common Mistakes", content_type: "Reel", hq_feature: "HQ Video", action: "Point out 3 mistakes people make." }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "niche_roadmap": {
        "book_author_growth": {
            months: [
                {
                    month: 1,
                    theme: "Book Launch Prep",
                    focus: "Building Anticipation",
                    weeks: [
                        {
                            week: 1,
                            focus: "Teasing the Content",
                            days: [
                                { day: 1, platform: "Instagram", topic: "Cover Reveal Tease", content_type: "Image", hq_feature: "HQ Files", action: "Show a sneak peek of your cover." },
                                { day: 2, platform: "TikTok", topic: "Writing Process", content_type: "Video", hq_feature: "The Beacon Studio", action: "Read a snippet from your draft." }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};

export const toolMapping = {
    "HQ AI Assistant": "ElyzetAIAssistants",
    "HQ Community": "TheCommunity",
    "The Beacon Studio": "TheBeacon",
    "HQ CRM": "Dashboard", // Placeholder if no specific CRM page
    "HQ Files": "Dashboard", // Placeholder
    "HQ Video": "TheBeacon",
    "HQ Calendar": "Schedule",
    "HQ Analytics": "AdminAnalytics"
};