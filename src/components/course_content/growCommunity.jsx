
import { Users, Heart, MessageSquare, Sparkles, Award, Target, TrendingUp, Calendar, Globe, Zap, Star, Rocket, DollarSign } from 'lucide-react';

export const growCommunityRoadmap = {
    courseTitle: "Grow Your Community: 90-Day Tribe Building",
    courseDescription: "Build a movement by turning your audience into a tribe of loyal fans. Create an engaged, passionate community around your brand.",
    totalWeeks: 12,
    category: "Community Building",
    difficulty: "Advanced",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Community Vision & Foundation",
            weekDescription: "Define your community purpose and core values.",
            icon: Target,
            tasks: [
                {
                    title: "Define Your Community Purpose",
                    description: "Clarify why your community exists beyond business.",
                    action: "Identify shared mission/cause, define transformation you facilitate, articulate values that unite members, create compelling vision statement.",
                    deliverable: "Community purpose and mission document"
                },
                {
                    title: "Identify Your Tribe's DNA",
                    description: "Understand what makes your community unique.",
                    action: "Define common beliefs and values, identify shared challenges, articulate aspirations, create inside language/culture, document tribal identity.",
                    deliverable: "Community identity profile"
                },
                {
                    title: "Research Successful Communities",
                    description: "Learn from thriving communities in various niches.",
                    action: "Study 5 successful communities, analyze engagement strategies, note culture-building tactics, identify what makes them sticky, document insights.",
                    deliverable: "Community research report"
                },
                {
                    title: "Choose Your Community Platform",
                    description: "Select the best platform for your community.",
                    action: "Evaluate options (Facebook Group, Slack, Discord, Circle, Mighty Networks), consider member preferences, assess features needed, test platforms.",
                    deliverable: "Community platform selected and set up"
                },
                {
                    title: "Create Community Guidelines",
                    description: "Establish rules and culture from day one.",
                    action: "Write community guidelines, define acceptable behavior, create onboarding process, establish moderation policies, communicate expectations.",
                    deliverable: "Community guidelines document"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Launch Your Community",
            weekDescription: "Get your first members and create initial momentum.",
            icon: Rocket,
            tasks: [
                {
                    title: "Create Compelling Community Name & Branding",
                    description: "Develop identity that attracts your tribe.",
                    action: "Brainstorm community names, create visual identity, design cover graphics, craft welcome message, develop brand voice.",
                    deliverable: "Community branding package"
                },
                {
                    title: "Invite Founding Members",
                    description: "Personally invite your most engaged followers.",
                    action: "Identify 20-50 ideal founding members, send personal invitations, explain exclusive opportunity, welcome them warmly, make them feel special.",
                    deliverable: "50+ founding members invited"
                },
                {
                    title: "Create Initial Content & Discussions",
                    description: "Seed the community with valuable content.",
                    action: "Post welcome message, start 3-5 discussion threads, share valuable resources, ask engaging questions, encourage introductions.",
                    deliverable: "Community seeded with initial content"
                },
                {
                    title: "Host Launch Event",
                    description: "Create excitement with a live kickoff event.",
                    action: "Schedule live video or webinar, preview community benefits, facilitate introductions, answer questions, create launch energy.",
                    deliverable: "Community launch event hosted"
                },
                {
                    title: "Implement Onboarding Sequence",
                    description: "Create smooth experience for new members.",
                    action: "Design welcome message, create intro prompts, assign welcome buddy/mentor, provide quick wins, explain how to engage.",
                    deliverable: "Member onboarding system"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Drive Daily Engagement",
            weekDescription: "Build habits of consistent participation.",
            icon: MessageSquare,
            tasks: [
                {
                    title: "Create Daily Engagement Rituals",
                    description: "Establish predictable touchpoints members expect.",
                    action: "Start daily discussion prompts, create themed days (Monday Wins, Friday Favorites), post morning motivation, share daily tips, ask daily questions.",
                    deliverable: "Daily engagement calendar"
                },
                {
                    title: "Encourage Member Introductions",
                    description: "Help members connect with each other.",
                    action: "Create intro template, highlight new members, facilitate connections, create 'introduce yourself' threads, spotlight members weekly.",
                    deliverable: "Member connection system"
                },
                {
                    title: "Respond to Every Comment",
                    description: "Show members their voice matters.",
                    action: "Reply to all posts within 24 hours, ask follow-up questions, thank contributors, amplify great content, make everyone feel heard.",
                    deliverable: "Active moderation and response system"
                },
                {
                    title: "Create Quick Win Challenges",
                    description: "Give members immediate actionable tasks.",
                    action: "Design 24-48 hour challenges, make them simple and achievable, celebrate completions, create accountability, build momentum.",
                    deliverable: "Weekly quick-win challenges launched"
                },
                {
                    title: "Implement Gamification",
                    description: "Make engagement fun and rewarding.",
                    action: "Create member levels/badges, recognize top contributors, celebrate milestones, offer perks for active members, leaderboard (optional).",
                    deliverable: "Gamification system implemented"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Foster Peer Connections",
            weekDescription: "Help members build relationships with each other.",
            icon: Users,
            tasks: [
                {
                    title: "Facilitate Peer Introductions",
                    description: "Connect members with common interests.",
                    action: "Match members with similar goals, create small accountability groups, facilitate skill shares, connect complementary businesses.",
                    deliverable: "Peer connection program"
                },
                {
                    title: "Create Mastermind Groups",
                    description: "Form small groups for deeper support.",
                    action: "Organize 3-5 person mastermind pods, provide structure/agenda, schedule regular meetings, facilitate peer coaching.",
                    deliverable: "Mastermind groups formed"
                },
                {
                    title: "Host Member Spotlights",
                    description: "Celebrate and elevate community members.",
                    action: "Interview members weekly, share their stories, highlight wins and lessons, create spotlight template, rotate regularly.",
                    deliverable: "Weekly member spotlight series"
                },
                {
                    title: "Enable Member-Led Content",
                    description: "Empower members to teach and share.",
                    action: "Invite members to host sessions, facilitate skill shares, create expert spotlights, encourage member contributions.",
                    deliverable: "Member-led content program"
                },
                {
                    title: "Create Sub-Groups or Channels",
                    description: "Organize around specific interests or topics.",
                    action: "Create topic-specific channels, organize by experience level, form location-based groups, enable focused discussions.",
                    deliverable: "Community sub-groups established"
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Deliver Exclusive Value",
            weekDescription: "Give members content they can't get anywhere else.",
            icon: Award,
            tasks: [
                {
                    title: "Host Weekly Live Sessions",
                    description: "Create consistent exclusive events.",
                    action: "Schedule weekly video calls, teach valuable content, facilitate Q&A, record for replay, create attendance habit.",
                    deliverable: "Weekly live session schedule"
                },
                {
                    title: "Share Behind-the-Scenes Content",
                    description: "Give members insider access to your journey.",
                    action: "Share your process, show work in progress, discuss challenges honestly, reveal lessons learned, be vulnerable.",
                    deliverable: "BTS content series"
                },
                {
                    title: "Provide Exclusive Resources",
                    description: "Create value available only to members.",
                    action: "Develop templates and tools, create resource library, share industry insights, offer early access to products, provide member discounts.",
                    deliverable: "Exclusive resource library"
                },
                {
                    title: "Bring in Guest Experts",
                    description: "Expand value through strategic partnerships.",
                    action: "Invite industry experts for AMAs, host guest training sessions, facilitate expert Q&As, create interview series.",
                    deliverable: "Monthly guest expert sessions"
                },
                {
                    title: "Create Member-Only Challenges",
                    description: "Design transformative group experiences.",
                    action: "Develop 7-30 day challenges, provide daily prompts, create accountability, celebrate wins, document transformations.",
                    deliverable: "Exclusive community challenge"
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Build Community Culture",
            weekDescription: "Establish traditions and shared language.",
            icon: Heart,
            tasks: [
                {
                    title: "Create Community Traditions",
                    description: "Establish rituals that define your tribe.",
                    action: "Start weekly/monthly traditions, celebrate milestones together, create signature events, establish community holidays.",
                    deliverable: "Community traditions calendar"
                },
                {
                    title: "Develop Inside Language",
                    description: "Create terms and phrases unique to your community.",
                    action: "Coin phrases for common situations, create community-specific terminology, use inside jokes appropriately, document community lexicon.",
                    deliverable: "Community language guide"
                },
                {
                    title: "Celebrate Wins Together",
                    description: "Make success a shared experience.",
                    action: "Create weekly win threads, celebrate big and small victories, recognize progress, create celebration rituals, amplify member successes.",
                    deliverable: "Win celebration system"
                },
                {
                    title: "Support Through Challenges",
                    description: "Be there when members struggle.",
                    action: "Create support threads, offer encouragement, share resources for common challenges, facilitate peer support, normalize setbacks.",
                    deliverable: "Community support system"
                },
                {
                    title: "Document Community Stories",
                    description: "Capture and share transformation journeys.",
                    action: "Collect member testimonials, document before/after stories, create case studies, share success stories, build social proof.",
                    deliverable: "Community story library"
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Scale Member Acquisition",
            weekDescription: "Grow your community strategically.",
            icon: TrendingUp,
            tasks: [
                {
                    title: "Create Member Referral Program",
                    description: "Turn members into community advocates.",
                    action: "Design referral incentives, make sharing easy, create referral assets, track referrals, reward top referrers.",
                    deliverable: "Referral program launched"
                },
                {
                    title: "Launch Public Content Strategy",
                    description: "Use content to attract new members.",
                    action: "Share community highlights publicly, create teaser content, post member success stories, showcase community value.",
                    deliverable: "Public content promotion plan"
                },
                {
                    title: "Host Open House Events",
                    description: "Give prospects a taste of community.",
                    action: "Schedule monthly open events, invite non-members, showcase community value, make joining easy, create FOMO.",
                    deliverable: "Monthly open house events"
                },
                {
                    title: "Partner with Complementary Communities",
                    description: "Cross-promote with aligned communities.",
                    action: "Identify partner communities, propose collaboration, host joint events, cross-promote respectfully, create win-win.",
                    deliverable: "Community partnerships established"
                },
                {
                    title: "Optimize Join Process",
                    description: "Remove friction from membership.",
                    action: "Simplify application/join flow, communicate value clearly, reduce steps, set expectations, automate where possible.",
                    deliverable: "Streamlined join process"
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Empower Community Leaders",
            weekDescription: "Develop ambassadors and moderators.",
            icon: Star,
            tasks: [
                {
                    title: "Identify Potential Leaders",
                    description: "Spot your most engaged and aligned members.",
                    action: "Track active contributors, note helpful members, identify natural leaders, observe who embodies community values.",
                    deliverable: "List of potential community leaders"
                },
                {
                    title: "Create Ambassador Program",
                    description: "Formalize leadership roles.",
                    action: "Define ambassador responsibilities, create application process, provide special perks, recognize publicly, empower with authority.",
                    deliverable: "Community ambassador program"
                },
                {
                    title: "Train Moderators",
                    description: "Equip leaders to maintain community health.",
                    action: "Teach moderation best practices, share guidelines, empower decision-making, create support system for moderators.",
                    deliverable: "Trained moderation team"
                },
                {
                    title: "Delegate Community Tasks",
                    description: "Distribute ownership across leaders.",
                    action: "Assign specific responsibilities, create leader schedules, enable autonomous decisions, provide resources, trust leaders.",
                    deliverable: "Distributed leadership structure"
                },
                {
                    title: "Recognize and Reward Leaders",
                    description: "Show appreciation for community builders.",
                    action: "Highlight leaders publicly, provide exclusive perks, create special access, offer compensation if appropriate, celebrate contributions.",
                    deliverable: "Leader recognition program"
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Create Premium Experiences",
            weekDescription: "Offer tiered value for deeper commitment.",
            icon: Sparkles,
            tasks: [
                {
                    title: "Design VIP Tier",
                    description: "Create exclusive inner circle opportunity.",
                    action: "Define VIP benefits, set pricing, limit spots, create application, provide exceptional value, make it aspirational.",
                    deliverable: "VIP tier launched"
                },
                {
                    title: "Host In-Person Meetups",
                    description: "Bring online connections into real world.",
                    action: "Organize local meetups, plan virtual events for remote members, facilitate member-organized gatherings, create meetup playbook.",
                    deliverable: "Meetup program established"
                },
                {
                    title: "Create Annual Summit or Retreat",
                    description: "Plan signature community event.",
                    action: "Design multi-day event, secure venue, plan agenda, price appropriately, promote early, create unforgettable experience.",
                    deliverable: "Annual event planned"
                },
                {
                    title: "Offer 1-on-1 Access",
                    description: "Provide personal attention to committed members.",
                    action: "Create office hours, offer strategy sessions, provide hot seats, schedule member calls, give personalized support.",
                    deliverable: "1-on-1 access program"
                },
                {
                    title: "Develop Certification Program",
                    description: "Create achievement-based progression.",
                    action: "Design certification levels, create learning path, establish requirements, issue credentials, recognize graduates.",
                    deliverable: "Certification program launched"
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Measure Community Health",
            weekDescription: "Track metrics that matter for community vitality.",
            icon: TrendingUp,
            tasks: [
                {
                    title: "Define Community KPIs",
                    description: "Identify metrics that indicate thriving community.",
                    action: "Track active members percentage, measure engagement rate, monitor new vs. returning members, assess member satisfaction, calculate retention rate.",
                    deliverable: "Community metrics dashboard"
                },
                {
                    title: "Survey Member Satisfaction",
                    description: "Gather feedback on community experience.",
                    action: "Create satisfaction survey, ask about value received, identify improvement areas, measure NPS, gather testimonials.",
                    deliverable: "Member satisfaction report"
                },
                {
                    title: "Analyze Engagement Patterns",
                    description: "Understand what drives participation.",
                    action: "Review which content gets most engagement, identify peak activity times, note discussion topics that resonate, analyze member behavior.",
                    deliverable: "Engagement analysis report"
                },
                {
                    title: "Monitor Churn and Retention",
                    description: "Understand why members leave or stay.",
                    action: "Track member lifespan, conduct exit interviews, identify retention factors, improve onboarding, address friction points.",
                    deliverable: "Retention improvement plan"
                },
                {
                    title: "Measure Business Impact",
                    description: "Quantify community's effect on business goals.",
                    action: "Calculate customer lifetime value of members, track conversions from community, measure referral impact, assess brand loyalty.",
                    deliverable: "Community ROI report"
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Monetize Your Community",
            weekDescription: "Create sustainable revenue from community value.",
            icon: DollarSign,
            tasks: [
                {
                    title: "Introduce Paid Membership Tiers",
                    description: "Create tiered value with paid options.",
                    action: "Design free vs. paid tiers, clearly differentiate value, communicate benefits, grandfather existing members appropriately, launch paid tier.",
                    deliverable: "Paid membership tier launched"
                },
                {
                    title: "Sell Community-Exclusive Products",
                    description: "Create offers available only to members.",
                    action: "Develop member-only products, offer exclusive discounts, create community-designed merchandise, provide early access.",
                    deliverable: "Exclusive product line"
                },
                {
                    title: "Enable Sponsorships",
                    description: "Partner with brands that serve your community.",
                    action: "Identify potential sponsors, create sponsorship packages, ensure value alignment, negotiate deals, maintain authenticity.",
                    deliverable: "Sponsorship program"
                },
                {
                    title: "Create Marketplace for Members",
                    description: "Help members do business with each other.",
                    action: "Enable member promotions, facilitate member-to-member transactions, create marketplace channel, take small commission if appropriate.",
                    deliverable: "Member marketplace"
                },
                {
                    title: "Offer Premium Services",
                    description: "Provide high-touch paid experiences.",
                    action: "Create done-for-you services, offer implementation support, provide coaching programs, facilitate paid masterminds.",
                    deliverable: "Premium service offerings"
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Sustain Long-Term Growth",
            weekDescription: "Build systems for ongoing community vitality.",
            icon: Rocket,
            tasks: [
                {
                    title: "Create Community Operations Manual",
                    description: "Document all processes and systems.",
                    action: "Write moderation guidelines, document content calendar, create onboarding checklist, outline event planning, systematize everything.",
                    deliverable: "Community operations manual"
                },
                {
                    title: "Build Content Bank",
                    description: "Create library of reusable content.",
                    action: "Save best discussion prompts, create template library, organize resources, document successful formats, build swipe file.",
                    deliverable: "Community content bank"
                },
                {
                    title: "Plan Next Quarter",
                    description: "Design roadmap for continued growth.",
                    action: "Set growth targets, plan major initiatives, schedule key events, identify improvement areas, allocate resources.",
                    deliverable: "90-day community roadmap"
                },
                {
                    title: "Celebrate Community Milestones",
                    description: "Honor what you've built together.",
                    action: "Acknowledge member count milestones, celebrate community birthday, recognize founding members, share year in review, express gratitude.",
                    deliverable: "Milestone celebration event"
                },
                {
                    title: "Evolve Your Community Vision",
                    description: "Plan for community's next chapter.",
                    action: "Gather member input on future, identify new opportunities, refine community purpose, plan evolution, communicate vision.",
                    deliverable: "Community evolution plan"
                }
            ]
        }
    ]
};
