import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

const enrichedWeekData = {
    1: {
        week_description: "Foundation is everything. Before inviting a single member, successful communities like *Morning Brew* or *The Hustle* started with a crystal-clear understanding of WHO they were for and WHY they existed. This week is about defining your 'North Star'—the shared purpose that will act as a magnet for your ideal members.",
        action_steps_updates: {
            "Define Your Community Purpose": {
                detailed_steps: [
                    "Draft a 'Big Purpose' statement: 'We bring together [who] to [do what] so that we can [result]'.",
                    "List 3-5 core values that will define your community culture (e.g., 'Radical Candor', 'Give First').",
                    "Identify the specific transformation or result your community helps members achieve."
                ],
                tips: [
                    "Keep your purpose statement under 50 words.",
                    "Focus on the *members' success*, not your business goals.",
                    "Your values should repel the wrong people as much as they attract the right ones."
                ]
            },
            "Identify Your Tribe's DNA": {
                detailed_steps: [
                    "Create an avatar of your 'Founding Member'—demographics, psychographics, and biggest pain points.",
                    "List the 'enemies' your tribe shares (e.g., 'Isolation', 'Bad advice', 'Burnout').",
                    "Brainstorm 5-10 words or phrases that only your tribe understands (shared language)."
                ],
                tips: [
                    "The more specific your niche, the stronger the initial bond.",
                    "Think about what your members represent *against* just as much as what they stand *for*."
                ]
            }
        }
    },
    2: {
        week_description: "The 'Soft Launch' strategy is how tech giants like *Gmail* started—by creating exclusivity and FOMO. Instead of opening the floodgates, we're going to hand-pick your founding members. This ensures your culture is set by your best advocates before the masses arrive.",
        action_steps_updates: {
            "Invite Founding Members": {
                detailed_steps: [
                    "Identify your top 20 most engaged customers or followers.",
                    "Send a personalized video or audio message (not just text) inviting them.",
                    "Frame it as an exclusive 'Founding Member' role with special status.",
                    "Ask them to commit to posting once a week in exchange for lifetime access or perks."
                ],
                tips: [
                    "Personal invitations have a 10x higher conversion rate than blast emails.",
                    "Founding members want influence, not just content. Let them shape the community."
                ]
            },
            "Host Launch Event": {
                detailed_steps: [
                    "Schedule a 45-minute Zoom kickoff party.",
                    "Structure the agenda: Vision casting (10m), Introductions (20m), Q&A (15m).",
                    "Take a group screenshot to post on social media to build FOMO.",
                    "Give attendees a specific 'mission' to complete immediately after the call."
                ],
                tips: [
                    "Energy is everything. Bring 110% energy to this call.",
                    "Make sure every single person speaks at least once during the call."
                ]
            }
        }
    },
    3: {
        week_description: "Engagement doesn't happen by accident. Look at *Peloton*—they use leaderboards, high-fives, and shoutouts to make fitness addictive. We're applying those same psychological triggers (Gamification, Recognition, Consistency) to your community to turn passive observers into active participants.",
        action_steps_updates: {
            "Create Daily Engagement Rituals": {
                detailed_steps: [
                    "Set up an automated 'Monday Motivation' post to start the week.",
                    "Create a 'Wednesday Wins' thread for members to brag humble or loud.",
                    "Establish a 'Friday Reflection' or 'Weekend Plans' ritual.",
                    "Commit to commenting on every single member post for the first 30 days."
                ],
                tips: [
                    "Consistency builds trust. Never miss a scheduled ritual post.",
                    "Questions that are easy to answer (e.g., 'What's one thing...') get more engagement than open-ended ones."
                ]
            },
            "Implement Gamification": {
                detailed_steps: [
                    "Define 3 simple badges (e.g., 'Founding Member', 'Conversation Starter', 'Helpful Hero').",
                    "Announce a 'Member of the Month' program with a tangible prize (book, merch, coaching call).",
                    "Set up a leaderboard if your platform supports it, or track top contributors manually."
                ],
                tips: [
                    "Reward behaviors you want to see more of (e.g., helping others vs. just posting).",
                    "Recognition is often more powerful than financial rewards."
                ]
            }
        }
    },
    4: {
        week_description: "The shift from 'Audience' to 'Community' happens when members start talking to *each other*, not just you. Think about how *CrossFit* gyms work—people come for the workout but stay for the friends they make. Your job this week is to be the ultimate host and connector.",
        action_steps_updates: {
            "Facilitate Peer Introductions": {
                detailed_steps: [
                    "Look for two members struggling with the same problem and tag them in a post together.",
                    "Start a 'Who helps with X?' thread to connect service providers with seekers.",
                    "Send DM introductions: 'Hey [Name], you really should meet [Name], you both love [Topic].'"
                ],
                tips: [
                    "Be the 'super-connector'. Your value increases when you help others expand their network.",
                    "Always ask permission before making a direct DM intro."
                ]
            }
        }
    },
    5: {
        week_description: "Netflix keeps subscribers because of 'Originals'—content they can't get anywhere else. Your community needs its own 'Originals'. This week is about establishing high-value, exclusive events or content that makes leaving the community feel like a loss.",
        action_steps_updates: {
            "Host Weekly Live Sessions": {
                detailed_steps: [
                    "Pick a consistent time slot (e.g., Tuesdays at 2 PM EST) and stick to it.",
                    "Format: 15 mins teaching, 30 mins 'Hot Seats' or Q&A.",
                    "Record every session and build a 'Vault' of past calls for new members.",
                    "Create a calendar event and invite all members so it's on their actual calendar."
                ],
                tips: [
                    "Hot Seats (coaching one person live) are often more valuable to the group than prepared presentations.",
                    "Don't cancel if only 2 people show up. Serve them incredibly well."
                ]
            }
        }
    },
    6: {
        week_description: "Great cultures like *Zappos* or *Southwest Airlines* are built on stories, rituals, and inside language. This week, we solidify 'how we do things here' to create a sense of belonging that is hard to replicate.",
        action_steps_updates: {
            "Create Community Traditions": {
                detailed_steps: [
                    "Invent a unique name for your members (e.g., 'Makers', 'Hustlers', 'Gladiators').",
                    "Start a monthly 'Town Hall' where you share community updates and future plans.",
                    "Create a specific emoji or gif reaction that signifies 'great job' in your tribe."
                ],
                tips: [
                    "Traditions create psychological safety and predictability.",
                    "Let traditions evolve naturally from inside jokes if possible."
                ]
            }
        }
    },
    7: {
        week_description: "Now that the fire is burning, it's time to add fuel. We'll use the 'Dropbox' strategy—incentivizing users to bring in other users. Viral growth happens when your current members become your best marketing channel.",
        action_steps_updates: {
            "Create Member Referral Program": {
                detailed_steps: [
                    "Create a simple reward: 'Invite 3 friends, get a free 1-on-1 call' or 'Get a free month'.",
                    "Draft swipe copy for members to use when inviting others.",
                    "Create a public scoreboard for top referrers."
                ],
                tips: [
                    "The reward must be highly desirable to YOUR specific audience.",
                    "Make it frictionless—give them a unique link or code."
                ]
            }
        }
    },
    8: {
        week_description: "To scale without burning out, you need lieutenants. *Reddit* relies entirely on volunteer moderators. You don't need thousands, but you do need a few trusted 'Deputies' who guard the culture as fiercely as you do.",
        action_steps_updates: {
            "Identify Potential Leaders": {
                detailed_steps: [
                    "Look for 'The Welcomer': The person who always comments on new member intros.",
                    "Look for 'The Helper': The person answering technical questions before you do.",
                    "Reach out personally to 2-3 of these people to gauge interest in a 'Community Guide' role."
                ],
                tips: [
                    "Don't just look for the loudest members; look for the most helpful ones.",
                    "Start with small responsibilities before giving full moderator keys."
                ]
            }
        }
    },
    9: {
        week_description: "Airline loyalty programs exemplify this week's focus: Status. By creating a VIP tier or 'Inner Circle', you give ambitious members something to aspire to and increase the lifetime value of your super-users.",
        action_steps_updates: {
            "Design VIP Tier": {
                detailed_steps: [
                    "Map out benefits: Private channel? Monthly group call? Direct DM access?",
                    "Determine criteria: Is it paid (e.g., $99/mo) or earned (e.g., 'Top Contributor' status)?",
                    "Launch it as a 'Beta' to a small group first to test the value proposition."
                ],
                tips: [
                    "Access to YOU is usually the biggest driver for a VIP tier.",
                    "Keep the VIP group small (intimacy is the value)."
                ]
            }
        }
    },
    10: {
        week_description: "You can't improve what you don't measure. Successful SaaS companies live by metrics like 'Daily Active Users' (DAU). We're going to apply a light version of that rigor to ensure your community isn't just active, but healthy.",
        action_steps_updates: {
            "Define Community KPIs": {
                detailed_steps: [
                    "Set up a simple spreadsheet tracking: New Members, Active Members (posted/commented), Churn (left).",
                    "Track 'Time to First Response'—how long does a new post sit before getting a comment?",
                    "Measure 'Member ROI'—are they getting the result they came for?"
                ],
                tips: [
                    "Don't obsess over vanity metrics (total members). Active members > Total members.",
                    "Check these numbers weekly, not daily, to spot trends."
                ]
            }
        }
    },
    11: {
        week_description: "Now we turn the community into a sustainable business asset. Whether it's the *Patreon* model (direct support) or the *Apple App Store* model (marketplace), there are multiple ways to monetize trust without breaking it.",
        action_steps_updates: {
            "Introduce Paid Membership Tiers": {
                detailed_steps: [
                    "Draft the sales page for the 'Pro' tier highlighting 3 distinct features not in the free tier.",
                    "Create a 'Lock-in' offer for current members (e.g., 'Get Pro at the old price forever').",
                    "Set up the billing automation (Stripe/Paypal) and test it yourself first."
                ],
                tips: [
                    "Never take away features folks already have. Add NEW value for the paid tier.",
                    "Be transparent about why you are charging (e.g., 'To invest back into better content/events')."
                ]
            }
        }
    },
    12: {
        week_description: "The goal is a 'Self-Healing' community—one that can survive without your constant daily intervention. This week is about building the SOPs and systems that allow you to step back from 'Chief Activity Officer' to 'Visionary Leader'.",
        action_steps_updates: {
            "Create Community Operations Manual": {
                detailed_steps: [
                    "Record Loom videos of how you moderate posts, approve members, and schedule events.",
                    "Write scripts for common difficult situations (e.g., handling a spammer, mediating a conflict).",
                    "Create a checklist for your Community Manager (or future hire)."
                ],
                tips: [
                    "Documentation is boring but essential for scaling.",
                    "Your 'voice' needs to be documented so others can speak for the brand."
                ]
            }
        }
    }
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Ensure user is authorized (admin check skipped for this utility, assume admin context or dev)
        // const user = await base44.auth.me();

        // 1. Fetch all roadmap content for this specific goal
        const existingContent = await base44.asServiceRole.entities.RoadmapContent.filter({
            stage: 'growth',
            goal_id: 'community'
        });

        const updates = [];

        // 2. Iterate and update
        for (const week of existingContent) {
            const enrichment = enrichedWeekData[week.week_number];
            
            if (enrichment) {
                // Update Description
                const updatedDescription = enrichment.week_description;

                // Update Action Steps
                // We map over existing action steps and check if we have specific updates for them
                const updatedActionSteps = week.action_steps.map(step => {
                    const stepUpdate = enrichment.action_steps_updates ? enrichment.action_steps_updates[step.title] : null;
                    
                    if (stepUpdate) {
                        return {
                            ...step,
                            detailed_steps: stepUpdate.detailed_steps || step.detailed_steps,
                            tips: stepUpdate.tips || step.tips,
                            // Ensure other fields are preserved
                        };
                    }
                    
                    // Fallback for steps that don't have specific new detailed updates but need to maintain structure
                    // We can add generic tips if missing
                    return {
                        ...step,
                        tips: step.tips && step.tips.length > 0 ? step.tips : ["Break this down into small tasks.", "Focus on quality over quantity."]
                    };
                });

                // Perform the update
                const p = base44.asServiceRole.entities.RoadmapContent.update(week.id, {
                    week_description: updatedDescription,
                    action_steps: updatedActionSteps
                });
                updates.push(p);
            }
        }

        await Promise.all(updates);

        return Response.json({ success: true, updated: updates.length });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});