import { Mic, Users, TrendingUp, DollarSign, Sparkles, Target, MessageSquare, Award, Zap, Music, Star, Rocket } from 'lucide-react';

export const musicalArtistGrowthRoadmap = {
    courseTitle: "Musical Artist Growth Plan: 90-Day Fanbase & Revenue System",
    courseDescription: "Launch your music career, build a superfan community, and monetize your art using The Business Minds HQ. Transform listeners into a thriving army of supporters while scaling your music business.",
    totalWeeks: 12,
    category: "Niche: Musicians & Artists",
    difficulty: "All Levels",
    
    successMetrics: {
        emailList: "+1,000 superfan subscribers",
        community: "300+ active members in your fan club",
        musicSales: "Consistent monthly revenue from merch/support",
        automation: "Automated fan onboarding & sales funnel"
    },

    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Artist Brand & HQ Setup",
            weekDescription: "Define your artist identity, EPK, and launch your HQ digital home.",
            icon: Target,
            dailyTime: "45-90 minutes",
            weeklyGoal: "Artist brand defined, HQ site live, fan magnet ready",
            tasks: [
                {
                    title: "Define Your Artist Identity & Sonic Brand",
                    description: "Clarify who you are, your sound, and your story.",
                    action: "Write your Artist Statement (who you are, your sound, who it's for). Define your visual aesthetic (colors, vibe). Create a compelling bio for your HQ profile.",
                    deliverable: "Artist Brand Guide saved to HQ Files",
                    hqTools: ["HQ AI Tools", "HQ Files"],
                    kpi: "Polished bio and brand guide completed",
                    detailedSteps: [
                        "Use HQ AI: 'Help me write an artist bio for a [genre] musician influenced by [artists]'",
                        "Define your 'Why': What is the message behind your music?",
                        "Create a mood board for your visual brand",
                        "Save assets in HQ Files under 'Artist Brand'"
                    ]
                },
                {
                    title: "Build Your HQ Artist Website",
                    description: "Create a professional hub for your music and fans.",
                    action: "Use HQ Website Builder to create an 'Artist Home' page. Include: Hero image, latest release, bio, tour dates (or livestream schedule), and email signup.",
                    deliverable: "Live artist website",
                    hqTools: ["HQ Website Builder", "HQ Forms"],
                    kpi: "Website published and mobile-optimized",
                    detailedSteps: [
                        "Select 'Musician/Artist' template in HQ Website Builder",
                        "Add your latest track (Spotify embed or audio player)",
                        "Create an 'Email Signup' section for exclusive updates",
                        "Add a simple 'Shop' or 'Support' section placeholder"
                    ]
                },
                {
                    title: "Create a Fan Magnet (Exclusive Content)",
                    description: "Give fans a reason to join your email list.",
                    action: "Create an exclusive download (unreleased demo, acoustic version, behind-the-scenes video). Set up an HQ Form to deliver this automatically when they sign up.",
                    deliverable: "Fan magnet live with automated delivery",
                    hqTools: ["HQ Files", "HQ Email Automations", "HQ Forms"],
                    kpi: "Funnel tested: Signup delivers content instantly",
                    detailedSteps: [
                        "Choose an exclusive track or video",
                        "Upload to HQ Files",
                        "Create an 'Exclusive Access' automation in HQ Email",
                        "Trigger: Form submission -> Send email with download link",
                        "Test the flow yourself"
                    ]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Fan Community Foundation",
            weekDescription: "Launch your inner circle fan community and email nurture.",
            icon: Users,
            dailyTime: "30-60 minutes",
            weeklyGoal: "50+ fans in community, welcome sequence active",
            tasks: [
                {
                    title: "Build 5-Email Fan Welcome Sequence",
                    description: "Nurture new subscribers into superfans.",
                    action: "Create an automated email series: (1) Deliver exclusive content, (2) Your origin story, (3) The meaning behind a song, (4) Ask for a Spotify follow, (5) Invite to community.",
                    deliverable: "5-email automation active",
                    hqTools: ["HQ Email Automations"],
                    kpi: "Sequence active and sending to new leads",
                    detailedSteps: [
                        "Draft emails in HQ Templates (be personal, like writing to a friend)",
                        "Email 1: 'Welcome to the inner circle + your download'",
                        "Email 2: 'How I started music...'",
                        "Email 3: 'The story behind [Song Name]'",
                        "Email 4: 'Where to listen'",
                        "Email 5: 'Join the fam in our community'"
                    ]
                },
                {
                    title: "Launch Your Fan Community Hub",
                    description: "A dedicated space for your superfans.",
                    action: "Set up a Group in HQ Community. Create channels for #general, #music-talk, #exclusive-content. Invite your most loyal fans first.",
                    deliverable: "Community live with 20+ members",
                    hqTools: ["HQ Community Hub"],
                    kpi: "First 20 fans joined and introduced themselves",
                    detailedSteps: [
                        "Create 'Superfans' group in HQ Community",
                        "Post a welcome video",
                        "Invite friends, family, and existing newsletter subs",
                        "Post a discussion prompt: 'What's your favorite concert memory?'"
                    ]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Content & Social Strategy",
            weekDescription: "Establish a consistent content rhythm to attract new listeners.",
            icon: Sparkles,
            dailyTime: "60-90 minutes",
            weeklyGoal: "30 days of content planned, daily posting habit",
            tasks: [
                {
                    title: "Batch Create Social Content",
                    description: "Film and schedule content to promote your music.",
                    action: "Create 15 short-form videos (performance clips, studio vibes, talking head stories). Use HQ AI to generate caption ideas.",
                    deliverable: "15 videos ready to post",
                    hqTools: ["HQ AI Tools", "HQ Social Scheduler"],
                    kpi: "2 weeks of content scheduled",
                    detailedSteps: [
                        "Film 5 performance clips (hooks of your songs)",
                        "Film 5 'storytime' videos about your lyrics",
                        "Film 5 behind-the-scenes/lifestyle clips",
                        "Schedule them in HQ or your preferred tool"
                    ]
                },
                {
                    title: "Engage & Grow",
                    description: "Don't just post; interact.",
                    action: "Spend 20 mins/day commenting on similar artists' posts and replying to your own comments. Direct DM conversations to your email signup link.",
                    deliverable: "Daily engagement routine",
                    hqTools: ["HQ CRM"],
                    kpi: "10 new DM conversations started per week",
                    detailedSteps: [
                        "Find 5 artists with a similar vibe",
                        "Comment genuinely on their fans' comments",
                        "Reply to every comment on your posts with a question",
                        "Track potential superfans in HQ CRM"
                    ]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Single Release / Soft Launch",
            weekDescription: "Release a single or project to your warm audience.",
            icon: Music,
            dailyTime: "60-120 minutes",
            weeklyGoal: "Successful release day, high engagement",
            tasks: [
                {
                    title: "Pre-Save Campaign",
                    description: "Drive pre-saves for your upcoming release.",
                    action: "Send email and social posts asking fans to pre-save. Offer a shoutout or small bonus for proof of pre-save.",
                    deliverable: "Pre-save campaign executed",
                    hqTools: ["HQ Email Campaigns"],
                    kpi: "50+ pre-saves (or signups if using own store)",
                    detailedSteps: [
                        "Create a 'Pre-Save' landing page or use your distributor link",
                        "Email list: 'New music coming Friday - pre-save now'",
                        "Socials: Tease the audio, link in bio",
                        "Community: Exclusive preview clip"
                    ]
                },
                {
                    title: "Release Day Blitz",
                    description: "Maximize noise on release day.",
                    action: "Email blast, multiple social posts, live stream in HQ Community. Ask fans to share.",
                    deliverable: "Release day executed",
                    hqTools: ["HQ Email", "HQ Community", "HQ Events"],
                    kpi: "Peak daily streams/downloads",
                    detailedSteps: [
                        "Email: 'It's live! Listen now'",
                        "Go live on IG/TikTok/HQ Community",
                        "Share fan reactions on stories",
                        "Personally DM 20 supporters asking them to share"
                    ]
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Merchandise Setup",
            weekDescription: "Create and launch your first merch items.",
            icon: DollarSign,
            dailyTime: "45-60 minutes",
            weeklyGoal: "Merch store live, first sales",
            tasks: [
                {
                    title: "Design Simple Merch",
                    description: "Create merchandise your fans actually want.",
                    action: "Design a T-shirt, sticker, or digital product (lyric book). Use Print-on-Demand to avoid inventory costs if physical.",
                    deliverable: "Merch designs ready",
                    hqTools: ["HQ Files"],
                    kpi: "2-3 items designed",
                    detailedSteps: [
                        "Poll community: 'What merch design do you like?'",
                        "Create designs (logo, lyrics, art)",
                        "Set up mockup images"
                    ]
                },
                {
                    title: "Launch HQ Store",
                    description: "Sell directly to your fans.",
                    action: "Set up HQ eCommerce products. Add your merch items. Connect payment gateway.",
                    deliverable: "Live merch store",
                    hqTools: ["HQ eCommerce", "HQ Payment Processing"],
                    kpi: "Store functional and tested",
                    detailedSteps: [
                        "Create Product: 'Limited Edition Tee'",
                        "Add images and description",
                        "Set price (ensure profit margin)",
                        "Test checkout process"
                    ]
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Paid Promotion & Ads",
            weekDescription: "Amplify your reach with targeted ads.",
            icon: TrendingUp,
            dailyTime: "30-60 minutes",
            weeklyGoal: "Ads live, driving traffic to Spotify or Lead Magnet",
            tasks: [
                {
                    title: "Create Ad Creatives",
                    description: "Video ads that stop the scroll.",
                    action: "Create 3 ad variations using your music video or performance clips. Hook viewer in 3 seconds.",
                    deliverable: "3 ad creatives",
                    hqTools: ["HQ Files"],
                    kpi: "Ads ready for upload",
                    detailedSteps: [
                        "Clip: 'This song is for anyone who...'",
                        "Clip: High energy performance",
                        "Clip: Studio session snippet"
                    ]
                },
                {
                    title: "Launch Traffic Campaign",
                    description: "Drive listeners to your music or funnel.",
                    action: "Set up FB/IG ads via HQ Ad Manager. Target fans of similar artists. Budget $5-10/day.",
                    deliverable: "Campaign active",
                    hqTools: ["HQ Ad Manager"],
                    kpi: "Ads running, monitoring CTR",
                    detailedSteps: [
                        "Objective: Traffic (to Spotify) or Conversions (to HQ Lead Magnet)",
                        "Audience: Interests = [Similar Artists]",
                        "Launch and monitor for 3 days"
                    ]
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Collaborations & PR",
            weekDescription: "Network with other artists and curators.",
            icon: Users,
            dailyTime: "60 minutes",
            weeklyGoal: "3 collab opportunities secured",
            tasks: [
                {
                    title: "Playlist Pitching",
                    description: "Get your music on independent playlists.",
                    action: "Research 20 independent curators. Send personalized pitches via HQ Email. Be professional and concise.",
                    deliverable: "20 pitches sent",
                    hqTools: ["HQ CRM", "HQ Email"],
                    kpi: "Added to 1-3 playlists",
                    detailedSteps: [
                        "Search Spotify/IG for curators",
                        "Find contact info",
                        "Email template: 'Hi [Name], loved your [Playlist Name]. Think my new track fits the vibe...'",
                        "Track responses in HQ CRM"
                    ]
                },
                {
                    title: "Artist Collab Outreach",
                    description: "Plan a feature or co-release.",
                    action: "DM/Email 5 artists for potential collaboration (remix, feature, or joint IG live).",
                    deliverable: "5 outreach messages sent",
                    hqTools: ["HQ CRM"],
                    kpi: "1 collab agreed",
                    detailedSteps: [
                        "Identify artists with similar size/vibe",
                        "Propose a win-win idea",
                        "Set a date for the activity"
                    ]
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Monetization: Memberships",
            weekDescription: "Launch a recurring revenue stream (Fan Club).",
            icon: DollarSign,
            dailyTime: "60 minutes",
            weeklyGoal: "Membership tier launched, first subscribers",
            tasks: [
                {
                    title: "Design VIP Membership",
                    description: "Create a paid tier in your HQ Community.",
                    action: "Create a subscription product in HQ. Offer perks: Early access, exclusive demos, monthly livestream, discount on merch.",
                    deliverable: "Membership offer live",
                    hqTools: ["HQ eCommerce", "HQ Community"],
                    kpi: "Offer ready to sell",
                    detailedSteps: [
                        "Price: $5-10/month",
                        "Perks: 'Backstage Pass'",
                        "Set up recurring billing product",
                        "Create private 'VIP' channel in Community"
                    ]
                },
                {
                    title: "Launch to Superfans",
                    description: "Convert your most engaged followers.",
                    action: "Email your list and post in community about the VIP club. emphasize the exclusive connection.",
                    deliverable: "Launch campaign executed",
                    hqTools: ["HQ Email", "HQ Community"],
                    kpi: "5-10 founding members",
                    detailedSteps: [
                        "Email: 'Join my inner circle'",
                        "Community Post: 'Want deeper access?'",
                        "Welcome new VIPs personally"
                    ]
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Virtual Tour / Live Event",
            weekDescription: "Host a major digital event to engage and monetize.",
            icon: Award,
            dailyTime: "60-90 minutes",
            weeklyGoal: "Succesful ticketed or donation-based livestream",
            tasks: [
                {
                    title: "Plan the Event",
                    description: "Schedule a high-production livestream.",
                    action: "Set up a ticketed event in HQ Events (or free with donation/merch plugs). Plan the setlist.",
                    deliverable: "Event scheduled and promoted",
                    hqTools: ["HQ Events"],
                    kpi: "Registrations flowing in",
                    detailedSteps: [
                        "Date: Friday night",
                        "Tech check: Camera, audio",
                        "Promote heavily to list and social"
                    ]
                },
                {
                    title: "The Show",
                    description: "Perform and connect.",
                    action: "Go live. Perform your best songs. Shout out fans by name. Push merch and membership.",
                    deliverable: "Live performance completed",
                    hqTools: ["HQ Video"],
                    kpi: "Attendees entertained, revenue generated",
                    detailedSteps: [
                        "Start on time",
                        "Engage with chat between songs",
                        "Clear CTA: 'Grab the limited tee below'"
                    ]
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Diversification: Sync & Licensing",
            weekDescription: "Explore passive income avenues.",
            icon: Music,
            dailyTime: "60 minutes",
            weeklyGoal: "Metadata organized, submitted to libraries",
            tasks: [
                {
                    title: "Organize Metadata",
                    description: "Get your files ready for licensing.",
                    action: "Ensure all songs have instrumentals, accurate metadata, and registration with PRO (ASCAP/BMI).",
                    deliverable: "Catalog organized",
                    hqTools: ["HQ Files"],
                    kpi: "Assets ready for pitching",
                    detailedSteps: [
                        "Create folder: WAVs, Instrumentals, Lyrics",
                        "Spreadsheet with BPM, Key, Mood for each song"
                    ]
                },
                {
                    title: "Submit to Libraries",
                    description: "Pitch your music for TV/Film.",
                    action: "Research music libraries (e.g., Artlist, MusicBed, Epidemic). Submit your best tracks.",
                    deliverable: "Submissions made",
                    hqTools: ["HQ CRM"],
                    kpi: "3-5 library submissions",
                    detailedSteps: [
                        "Follow submission guidelines strictly",
                        "Track status in CRM"
                    ]
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Automated Evergreen Funnel",
            weekDescription: "Turn your manual efforts into an automated machine.",
            icon: Zap,
            dailyTime: "60 minutes",
            weeklyGoal: "Evergreen funnel built",
            tasks: [
                {
                    title: "Build the Funnel",
                    description: "Automate the fan journey.",
                    action: "Use HQ Funnel Builder. Ad -> Fan Magnet -> Welcome Email -> Merch Offer -> Membership Upsell.",
                    deliverable: "Automated funnel live",
                    hqTools: ["HQ Funnel Builder", "HQ Automation"],
                    kpi: "Funnel active and tested",
                    detailedSteps: [
                        "Connect all pieces (Page, Form, Email, Product)",
                        "Set up triggers (e.g., if buys Merch, tag 'Customer')",
                        "Turn on evergreen ads to feed the top"
                    ]
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Review & Scale",
            weekDescription: "Analyze the quarter and plan the next phase.",
            icon: Award,
            dailyTime: "60-90 minutes",
            weeklyGoal: "90-day review completed, next roadmap set",
            tasks: [
                {
                    title: "Analyze Metrics",
                    description: "What worked? What didn't?",
                    action: "Review HQ Analytics. Which emails opened? Which ads converted? Which songs streamed?",
                    deliverable: "Quarterly Report",
                    hqTools: ["HQ Analytics"],
                    kpi: "Clear understanding of ROI",
                    detailedSteps: [
                        "Check Fan Growth (Email/Community)",
                        "Check Revenue (Merch/Members)",
                        "Identify top traffic sources"
                    ]
                },
                {
                    title: "Plan Next 90 Days",
                    description: "Set new goals.",
                    action: "Decide on next release, tour, or product. Update your roadmap.",
                    deliverable: "New 90-day plan",
                    hqTools: ["HQ Calendar"],
                    kpi: "Strategy set for next quarter",
                    detailedSteps: [
                        "Set revenue goal",
                        "Plan content schedule",
                        "Schedule next big event"
                    ]
                }
            ]
        }
    ],

    kpiChecklist: [
        { metric: "Email Subscribers", target: "1,000+" },
        { metric: "Community Members", target: "300+" },
        { metric: "Monthly Listeners", target: "Growing" },
        { metric: "Recurring Revenue", target: "$500-1k/mo" }
    ],

    templates: {
        communityWelcome: "Hey everyone! I'm [Artist Name]. This is the backstage area where I share demos, ask for your feedback, and hang out. Introduce yourself below and tell me your favorite band!",
        
        emailSubjects: [
            "Welcome to the inner circle (Download inside)",
            "The story behind the song...",
            "Can I ask you a favor?",
            "New merch drop! Limited time",
            "You're invited: VIP Access"
        ],
        
        affiliateInvite: "Hey [Name], you've been such a huge supporter. I'm starting a street team and would love for you to join. You get perks for helping spread the word! Link: [Link]"
    }
};