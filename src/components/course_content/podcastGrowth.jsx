import { Mic, Users, Megaphone, DollarSign, Target, Award, MonitorPlay, Zap, BarChart, Radio } from 'lucide-react';

export const podcastGrowthRoadmap = {
  courseTitle: "Podcast Growth Plan",
  courseDescription: "Launch, grow, and monetize a professional podcast in 90 days. Leverage our partners Riverside.fm for AI-powered recording/distribution and EqualizerRadio.com for exposure.",
  
  successMetrics: {
    downloads: "1,000+ monthly streams",
    episodes: "12+ episodes published",
    reviews: "50+ 5-star reviews",
    revenue: "First sponsorship or monetized offer"
  },

  kpiChecklist: [
    { metric: "Weekly Streams", target: "250+ per week" },
    { metric: "Listener Retention", target: "75%+ completion rate" },
    { metric: "Social Shares", target: "10+ per episode" },
    { metric: "Email Subscribers", target: "100+ from podcast" }
  ],

  weeks: [
    // PHASE 1: CONCEPT & LAUNCH PREP
    {
      weekNumber: 1,
      weekTitle: "Concept & Brand Identity",
      weekDescription: "Define your show's unique value proposition and visual identity.",
      icon: Target,
      dailyTime: "1 hour",
      weeklyGoal: "Finalize podcast name, format, and cover art.",
      tasks: [
        {
          title: "Define Your Niche & Avatar",
          description: "Clearly identify who your podcast is for and what problem it solves.",
          action: "Complete the 'Ideal Client Avatar' strategy document in HQ.",
          hqTools: ["Strategy Documents", "AI Assistant (Ava)"],
          deliverable: "Listener Persona Profile"
        },
        {
          title: "Name & Format Selection",
          description: "Choose a catchy name and decide on format (solo, interview, co-hosted).",
          action: "Brainstorm 10 names with Elyzet AI and check availability.",
          hqTools: ["Elyzet AI"],
          deliverable: "Podcast Name & Format Decision"
        },
        {
          title: "Design Cover Art",
          description: "Create professional cover art that stands out in directories.",
          action: "Use the Brand Kit to define colors/fonts and create artwork (3000x3000px).",
          hqTools: ["Brand Kit"],
          deliverable: "Podcast Cover Art File"
        }
      ]
    },
    {
      weekNumber: 2,
      weekTitle: "Equipment & Partner Setup",
      weekDescription: "Get the right gear and set up your Riverside.fm account.",
      icon: Mic,
      dailyTime: "1 hour",
      weeklyGoal: "Set up Riverside.fm and record a test.",
      tasks: [
        {
          title: "Equipment or Studio Access",
          description: "Purchase essential gear OR book a pro studio.",
          action: "Local to Dallas, TX? Book a session at our partner **The Beacon LLC** (thebeacon.llc). Otherwise, review the 'Podcast Gear Guide' in Quick Lessons.",
          hqTools: ["Quick Lessons"],
          deliverable: "Recording Setup Ready"
        },
        {
          title: "Sign Up with Riverside.fm",
          description: "Join our partner **Riverside.fm** for studio-quality recording, AI editing, and instant distribution.",
          action: "Create your Riverside.fm account. This will be your hub for recording video/audio and automatically distributing to Spotify & Apple Podcasts.",
          deliverable: "Riverside Account Created"
        },
        {
          title: "Record Intro/Outro & Trailer",
          description: "Record a professional intro/outro and a 1-minute trailer episode.",
          action: "Script with Elyzet AI and record using Riverside's high-quality studio.",
          hqTools: ["Elyzet AI"],
          deliverable: "Audio Files (Intro, Outro, Trailer)"
        }
      ]
    },
    {
      weekNumber: 3,
      weekTitle: "Content Strategy & Recording",
      weekDescription: "Plan your first season and start banking episodes.",
      icon: Zap,
      dailyTime: "2 hours",
      weeklyGoal: "Record and edit first 3 full episodes.",
      tasks: [
        {
          title: "Plan First 10 Episodes",
          description: "Outline topics and potential guests for your launch season.",
          action: "Create a content calendar in HQ.",
          hqTools: ["Daily Schedule", "Elyzet AI"],
          deliverable: "Episode Content Calendar"
        },
        {
          title: "Record Launch Episodes",
          description: "Record 3 full episodes to have ready for launch day.",
          action: "Batch record episodes 1-3 on Riverside.fm.",
          deliverable: "3 Raw Episode Recordings"
        },
        {
          title: "Guest Outreach (If applicable)",
          description: "Invite guests for future episodes.",
          action: "Use the 'Podcast Guest Invite' template from HQ.",
          hqTools: ["Email Templates"],
          deliverable: "Guest Bookings"
        }
      ]
    },
    {
      weekNumber: 4,
      weekTitle: "AI Editing & Distribution",
      weekDescription: "Polish your content using Riverside's AI tools and prepare for launch.",
      icon: MonitorPlay,
      dailyTime: "2 hours",
      weeklyGoal: "Finalize episodes and set up distribution.",
      tasks: [
        {
          title: "AI Editing with Riverside",
          description: "Use Riverside's text-based editor and AI Magic Clips to polish your video and audio.",
          action: "Edit your 3 launch episodes using Riverside's AI features to remove silence/filler words instantly.",
          deliverable: "3 Final Episodes"
        },
        {
          title: "Instant Distribution Setup",
          description: "Connect your Riverside account to Spotify and Apple Podcasts.",
          action: "Complete the one-click distribution setup in your Riverside dashboard.",
          deliverable: "Distribution Channels Connected"
        },
        {
          title: "Create Launch Assets",
          description: "Create social media graphics and AI clips for launch.",
          action: "Use Riverside's 'Magic Clips' to generate viral social media shorts from your episodes.",
          hqTools: ["Elyzet AI"],
          deliverable: "Launch Marketing Asset Pack"
        }
      ]
    },

    // PHASE 2: LAUNCH & GROWTH
    {
      weekNumber: 5,
      weekTitle: "Launch Week!",
      weekDescription: "Execute your launch plan and drive initial streams.",
      icon: Megaphone,
      dailyTime: "2 hours",
      weeklyGoal: "Get into 'New & Noteworthy' consideration.",
      tasks: [
        {
          title: "Publish Launch Batch",
          description: "Release the trailer and first 3 episodes simultaneously.",
          action: "Publish via Riverside/Hosting provider.",
          deliverable: "Live Podcast!"
        },
        {
          title: "Launch Team Activation",
          description: "Ask friends, family, and email list to subscribe, rate, and review.",
          action: "Send 'Podcast Launch' email blast using HQ template.",
          hqTools: ["Email Marketing"],
          deliverable: "Initial 50+ Streams"
        },
        {
          title: "Social Media Blitz",
          description: "Post daily about the launch across all channels.",
          action: "Share your Riverside Magic Clips and behind-the-scenes content.",
          deliverable: "Social Buzz"
        }
      ]
    },
    {
      weekNumber: 6,
      weekTitle: "Partners & Promotion",
      weekDescription: "Leverage partners like Equalizer Radio to grow.",
      icon: Radio,
      dailyTime: "1 hour",
      weeklyGoal: "Secure promotion on Equalizer Radio.",
      tasks: [
        {
          title: "Get Featured on Equalizer Radio",
          description: "Submit your show to our partner **EqualizerRadio.com**, the 24/7 uplifting entrepreneur station.",
          action: "Submit your RSS feed and best episode to Equalizer Radio for rotation consideration.",
          deliverable: "Submission Confirmation"
        },
        {
          title: "Podcast Swapping",
          description: "Identify 5 podcasts in your niche to do promo swaps or guest interviews.",
          action: "Research and pitch hosts.",
          deliverable: "Promo Swap Agreements"
        }
      ]
    },
    {
      weekNumber: 7,
      weekTitle: "Community Engagement",
      weekDescription: "Turn listeners into a loyal community.",
      icon: Users,
      dailyTime: "1 hour",
      weeklyGoal: "Get 10 listeners to join your HQ Community group.",
      tasks: [
        {
          title: "Call-to-Action Optimization",
          description: "Ensure every episode has a clear CTA to join the community.",
          action: "Record a dynamic ad insert for your community.",
          hqTools: ["The Community"],
          deliverable: "Community CTA recorded"
        },
        {
          title: "Listener Q&A",
          description: "Solicit questions from listeners for a Q&A segment.",
          action: "Post in community and social media asking for questions.",
          hqTools: ["The Community"],
          deliverable: "Q&A Content"
        }
      ]
    },
    {
      weekNumber: 8,
      weekTitle: "SEO & Discoverability",
      weekDescription: "Optimize your show to be found by strangers.",
      icon: BarChart,
      dailyTime: "1 hour",
      weeklyGoal: "Rank for 3 target keywords in podcast apps.",
      tasks: [
        {
          title: "Show Notes Optimization",
          description: "Rewrite episode descriptions with SEO keywords.",
          action: "Use Elyzet AI to rewrite past show notes.",
          hqTools: ["Elyzet AI"],
          deliverable: "SEO-Optimized Show Notes"
        },
        {
          title: "Website Integration",
          description: "Embed episodes on your website with full transcripts (via Riverside).",
          action: "Create blog posts for each episode using Riverside transcripts.",
          deliverable: "Podcast Blog Section"
        }
      ]
    },

    // PHASE 3: MONETIZATION & SCALE
    {
      weekNumber: 9,
      weekTitle: "Email List Building",
      weekDescription: "Move listeners from the app to your owned email list.",
      icon: Users,
      dailyTime: "1 hour",
      weeklyGoal: "Add 50 new subscribers from the podcast.",
      tasks: [
        {
          title: "Create a Lead Magnet",
          description: "Offer a free resource (checklist, guide) mentioned in the show.",
          action: "Create PDF resource and landing page.",
          hqTools: ["Strategy Documents"],
          deliverable: "Podcast Lead Magnet"
        },
        {
          title: "Lead Magnet Mention",
          description: "Mention the freebie in the intro and outro.",
          action: "Update dynamic ad slots or record new intro.",
          deliverable: "Updated Audio CTA"
        }
      ]
    },
    {
      weekNumber: 10,
      weekTitle: "Monetization Strategy",
      weekDescription: "Turn your streams into dollars.",
      icon: DollarSign,
      dailyTime: "1 hour",
      weeklyGoal: "Define your monetization model.",
      tasks: [
        {
          title: "Choose Revenue Model",
          description: "Decide between sponsorships, affiliate marketing, or own products.",
          action: "Evaluate options based on current audience size.",
          deliverable: "Monetization Plan"
        },
        {
          title: "Create Sponsor Media Kit",
          description: "One-sheet PDF with show stats and demographics for sponsors.",
          action: "Design using Brand Kit assets.",
          hqTools: ["Brand Kit"],
          deliverable: "Podcast Media Kit"
        }
      ]
    },
    {
      weekNumber: 11,
      weekTitle: "Advanced Marketing",
      weekDescription: "Paid and organic strategies to scale.",
      icon: Megaphone,
      dailyTime: "1 hour",
      weeklyGoal: "Test one paid growth channel.",
      tasks: [
        {
          title: "Podcast App Advertising",
          description: "Run small ads on apps like Overcast or Spotify Ad Studio.",
          action: "Set up a $50-100 test campaign.",
          deliverable: "Ad Campaign Live"
        },
        {
          title: "Repurposing Workflow",
          description: "Turn 1 episode into 10 pieces of content (TikToks, Reels, Tweets).",
          action: "Create a standard operating procedure (SOP) for repurposing using Riverside clips.",
          hqTools: ["SOP Library"],
          deliverable: "Repurposing SOP"
        }
      ]
    },
    {
      weekNumber: 12,
      weekTitle: "Review & Next Season",
      weekDescription: "Analyze results and plan the future.",
      icon: Award,
      dailyTime: "2 hours",
      weeklyGoal: "Plan Season 2 and celebrate 90 days.",
      tasks: [
        {
          title: "Analyze Metrics",
          description: "Review streams, retention, and growth trends on Riverside/Spotify.",
          action: "Fill out the '90-Day Review' document.",
          deliverable: "Performance Report"
        },
        {
          title: "Plan Season 2",
          description: "Decide on improvements and new guests for the next 90 days.",
          action: "Draft Season 2 outline.",
          deliverable: "Season 2 Plan"
        },
        {
          title: "Celebrate!",
          description: "Share your 90-day milestone with your community.",
          action: "Post in HQ Community.",
          hqTools: ["The Community"],
          deliverable: "Celebration Post"
        }
      ]
    }
  ],

  templates: {
    communityWelcome: "Hey everyone! I just launched my new podcast, [Podcast Name]. It's about [Topic] for [Audience]. I'd love your feedback on the first episode! Here's the link: [Link]",
    emailSubjects: [
      "It's finally here! 🎙️",
      "My new project (and why I made it for you)",
      "3 things I learned about [Topic] (Ep 1)",
      "You need to hear this interview...",
      "Q&A: Answering your top questions"
    ],
    affiliateInvite: "Hi [Name], I'm a huge fan of your product. I just launched a podcast for [Audience] and I'd love to promote you as an affiliate partner. Do you have a program available?"
  }
};