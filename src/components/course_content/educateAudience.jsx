import { BookOpen, Video, Podcast, FileText, Users, TrendingUp, Lightbulb, Share2, Award, MessageSquare, Calendar, Target } from 'lucide-react';

export const educateAudienceRoadmap = {
    courseTitle: "Educate Your Audience: 90-Day Authority Building",
    courseDescription: "Position yourself as the go-to expert by providing consistent value. Build authority through educational content and thought leadership.",
    totalWeeks: 12,
    category: "Content & Authority",
    difficulty: "Intermediate",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Content Strategy Foundation",
            weekDescription: "Define your expertise and content approach.",
            icon: Target,
            tasks: [
                {
                    title: "Identify Your Expertise Areas",
                    description: "Define the specific topics where you can provide unique value.",
                    action: "List all areas of expertise, identify top 3-5 core topics, research audience interest in each, validate with surveys/questions, choose primary focus.",
                    deliverable: "3-5 core expertise areas defined"
                },
                {
                    title: "Audit Current Content",
                    description: "Evaluate what content you already have and its performance.",
                    action: "List all existing content (blogs, videos, social posts), analyze performance metrics, identify top performers, note gaps in coverage.",
                    deliverable: "Content audit with performance analysis"
                },
                {
                    title: "Research Competitor Content",
                    description: "See what educational content competitors are creating.",
                    action: "Identify 5 key competitors, analyze their content types, note their most engaging content, find gaps you can fill, document insights.",
                    deliverable: "Competitive content analysis"
                },
                {
                    title: "Define Your Unique Angle",
                    description: "Determine what makes your educational content different.",
                    action: "Identify your unique perspective, pinpoint your signature frameworks, define your teaching style, clarify what makes you different.",
                    deliverable: "Unique content positioning statement"
                },
                {
                    title: "Create Content Pillars",
                    description: "Establish 3-5 main themes for your educational content.",
                    action: "Choose 3-5 content pillars aligned with expertise, create topic clusters under each pillar, ensure audience relevance, plan content ratio.",
                    deliverable: "Content pillar framework with topic clusters"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Content Creation Systems",
            weekDescription: "Set up sustainable systems for consistent content production.",
            icon: FileText,
            tasks: [
                {
                    title: "Choose Your Primary Content Format",
                    description: "Decide whether to focus on written, video, or audio content.",
                    action: "Evaluate your strengths (writing, speaking, video), consider audience preferences, assess resource requirements, choose 1-2 primary formats.",
                    deliverable: "Primary content format(s) selected"
                },
                {
                    title: "Create Content Production Workflow",
                    description: "Establish repeatable process for creating content.",
                    action: "Map ideation to publication process, assign time blocks for creation, set up templates, create quality checklist, document workflow.",
                    deliverable: "Content production workflow documented"
                },
                {
                    title: "Batch Create Content",
                    description: "Produce multiple pieces of content in single sessions.",
                    action: "Schedule content creation day, prepare topics in advance, create 4-6 pieces at once, use templates for efficiency, edit later.",
                    deliverable: "First batch of 4-6 content pieces created"
                },
                {
                    title: "Set Up Content Calendar",
                    description: "Plan and schedule content in advance.",
                    action: "Use tool (Trello, Notion, Google Calendar), plan 30 days ahead, include content pillar, format, topic, publish date.",
                    deliverable: "30-day content calendar created"
                },
                {
                    title: "Create Content Templates",
                    description: "Develop reusable templates for faster creation.",
                    action: "Create blog post template, video script outline, social post formats, email newsletter structure, save for repeated use.",
                    deliverable: "Content template library"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Written Content Mastery",
            weekDescription: "Create valuable blog posts and articles.",
            icon: BookOpen,
            tasks: [
                {
                    title: "Launch or Optimize Blog",
                    description: "Establish your blog as educational resource hub.",
                    action: "Set up blog on website, optimize design for readability, create categories matching content pillars, add email signup, enable comments.",
                    deliverable: "Blog launched and optimized"
                },
                {
                    title: "Write Ultimate Guide",
                    description: "Create comprehensive guide on key topic.",
                    action: "Choose high-value topic, research thoroughly, write 2000+ word guide, include visuals/examples, optimize for SEO, make it downloadable.",
                    deliverable: "Ultimate guide published"
                },
                {
                    title: "Develop How-To Content Series",
                    description: "Create actionable tutorials that solve problems.",
                    action: "Identify common problems in your niche, write step-by-step solutions, include screenshots/examples, make it beginner-friendly, create 4-6 posts.",
                    deliverable: "How-to content series published"
                },
                {
                    title: "Write Weekly Tips/Insights",
                    description: "Establish consistent rhythm of valuable content.",
                    action: "Commit to weekly publishing, create editorial calendar, write 4 posts in advance, develop consistent format, schedule publication.",
                    deliverable: "4 weeks of blog content scheduled"
                },
                {
                    title: "Optimize for SEO",
                    description: "Make your content discoverable in search.",
                    action: "Research keywords for each post, optimize titles and headings, write meta descriptions, add internal links, optimize images.",
                    deliverable: "All content SEO optimized"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Video Content Creation",
            weekDescription: "Build authority through educational videos.",
            icon: Video,
            tasks: [
                {
                    title: "Set Up Simple Video Studio",
                    description: "Create space for recording quality videos.",
                    action: "Choose recording location, set up lighting (natural or ring light), test audio quality, arrange background, test camera setup.",
                    deliverable: "Video recording setup ready"
                },
                {
                    title: "Create Video Content Plan",
                    description: "Plan video topics and series.",
                    action: "Develop video series concept, plan 10 video topics, write outlines for each, decide video length (5-15 min ideal), create publishing schedule.",
                    deliverable: "Video content plan for 10 videos"
                },
                {
                    title: "Record First Video Series",
                    description: "Create your first set of educational videos.",
                    action: "Script or outline first 3-4 videos, record in one session, be authentic and conversational, include clear takeaways.",
                    deliverable: "3-4 educational videos recorded"
                },
                {
                    title: "Edit and Optimize Videos",
                    description: "Polish videos and prepare for distribution.",
                    action: "Edit for clarity and pacing, add intro/outro, include captions, create custom thumbnails, write engaging descriptions.",
                    deliverable: "Videos edited and optimized"
                },
                {
                    title: "Launch YouTube Channel",
                    description: "Establish presence on YouTube.",
                    action: "Create YouTube channel, optimize channel page, upload first videos, create playlists, add channel trailer, promote to email list.",
                    deliverable: "YouTube channel launched with content"
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Podcast or Audio Content",
            weekDescription: "Reach audience through audio content.",
            icon: Podcast,
            tasks: [
                {
                    title: "Plan Podcast Concept",
                    description: "Design your podcast format and structure.",
                    action: "Choose format (solo, interview, co-hosted), define episode structure, plan episode length, create podcast name/description, design cover art.",
                    deliverable: "Podcast concept fully planned"
                },
                {
                    title: "Set Up Podcast Equipment",
                    description: "Get basic equipment for quality audio.",
                    action: "Get decent microphone ($50-150), download recording software (Audacity/GarageBand), find quiet recording space, test audio quality.",
                    deliverable: "Podcast recording setup ready"
                },
                {
                    title: "Record First Episodes",
                    description: "Create your first batch of podcast episodes.",
                    action: "Record 3-5 episodes in advance, keep episodes focused on providing value, edit for clarity, add intro/outro music.",
                    deliverable: "First 3-5 episodes recorded"
                },
                {
                    title: "Launch Podcast",
                    description: "Publish podcast on major platforms.",
                    action: "Choose podcast host (Buzzsprout, Anchor, Libsyn), submit to Apple Podcasts, Spotify, Google Podcasts, create show notes page on website.",
                    deliverable: "Podcast live on all major platforms"
                },
                {
                    title: "Promote Podcast Launch",
                    description: "Get initial listeners for your podcast.",
                    action: "Email your list about podcast, share on social media, ask guests to share (if interview format), create audiograms for promotion.",
                    deliverable: "Podcast launch campaign executed"
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Social Media Education",
            weekDescription: "Use social platforms to teach and engage.",
            icon: Share2,
            tasks: [
                {
                    title: "Develop Social Education Strategy",
                    description: "Plan how to deliver value on social platforms.",
                    action: "Choose 1-2 primary platforms, define content types for each, plan posting frequency, create content mix (tips, stories, questions).",
                    deliverable: "Social education strategy documented"
                },
                {
                    title: "Create Carousel/Thread Series",
                    description: "Develop multi-slide educational content.",
                    action: "Design carousel template, create 5-7 educational carousels/threads, focus on actionable tips, use visuals effectively, include CTA.",
                    deliverable: "Educational carousel/thread series"
                },
                {
                    title: "Host Live Training Sessions",
                    description: "Teach in real-time through live video.",
                    action: "Schedule weekly live session, choose valuable topic, promote in advance, go live and teach, engage with comments, save replay.",
                    deliverable: "First live training session hosted"
                },
                {
                    title: "Share Daily Tips/Insights",
                    description: "Provide consistent micro-content.",
                    action: "Create 30 quick tips related to your expertise, schedule daily, use Stories feature, create templates for consistency.",
                    deliverable: "30 days of tips created and scheduled"
                },
                {
                    title: "Engage Through Q&A",
                    description: "Answer audience questions publicly.",
                    action: "Ask audience for questions, create Q&A content series, use Instagram Stories Q&A, LinkedIn articles, or Twitter threads, answer comprehensively.",
                    deliverable: "Q&A content series launched"
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Email Newsletter Excellence",
            weekDescription: "Build authority through valuable email content.",
            icon: MessageSquare,
            tasks: [
                {
                    title: "Design Newsletter Structure",
                    description: "Create format for your educational newsletter.",
                    action: "Define newsletter sections (tip, story, resources), create email template, decide frequency (weekly recommended), write sample issue.",
                    deliverable: "Newsletter format and template created"
                },
                {
                    title: "Write Welcome Series",
                    description: "Create automated onboarding for new subscribers.",
                    action: "Write 5-7 email welcome sequence, introduce yourself and expertise, share best content, deliver value immediately, build relationship.",
                    deliverable: "Welcome email series automated"
                },
                {
                    title: "Launch Newsletter",
                    description: "Officially start your email publication.",
                    action: "Announce newsletter to audience, add signup forms to website, create compelling lead magnet, write first 4 issues, commit to schedule.",
                    deliverable: "Newsletter launched with consistent schedule"
                },
                {
                    title: "Create Educational Email Course",
                    description: "Develop automated course delivered via email.",
                    action: "Choose valuable topic, break into 5-7 lessons, write each lesson email, set up automation, offer as opt-in incentive.",
                    deliverable: "Email course created and automated"
                },
                {
                    title: "Grow Subscriber List",
                    description: "Build audience for your educational content.",
                    action: "Create multiple opt-in points, promote newsletter on social, add popup to website, mention in all content, reach 100+ subscribers.",
                    deliverable: "Growing email list (goal: 100+ subscribers)"
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Frameworks & Methodologies",
            weekDescription: "Develop signature systems that showcase expertise.",
            icon: Lightbulb,
            tasks: [
                {
                    title: "Create Your Signature Framework",
                    description: "Develop proprietary methodology or system.",
                    action: "Identify your unique approach, create step-by-step framework, name it memorably, visualize it (diagram/infographic), document thoroughly.",
                    deliverable: "Signature framework created and documented"
                },
                {
                    title: "Develop Case Studies",
                    description: "Showcase your framework in action.",
                    action: "Document 2-3 successful implementations, include before/after, highlight results, tell compelling story, get client permission.",
                    deliverable: "2-3 detailed case studies"
                },
                {
                    title: "Create Framework Resources",
                    description: "Build materials around your methodology.",
                    action: "Design workbook/worksheet, create video explanation, write blog post about framework, develop assessment tool.",
                    deliverable: "Framework resource package"
                },
                {
                    title: "Teach Your Framework",
                    description: "Use framework as core of educational content.",
                    action: "Create content series explaining each step, demonstrate with examples, share success stories, make it actionable.",
                    deliverable: "Framework-based content series"
                },
                {
                    title: "Position Framework as Unique",
                    description: "Market your methodology as distinctive.",
                    action: "Add to website prominently, mention in all bios, create branded graphics, reference consistently, trademark if appropriate.",
                    deliverable: "Framework integrated into all marketing"
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Workshops & Webinars",
            weekDescription: "Deliver live educational experiences.",
            icon: Users,
            tasks: [
                {
                    title: "Plan Workshop Topic",
                    description: "Design valuable live training session.",
                    action: "Choose high-demand topic, create learning objectives, design 60-90 minute curriculum, plan interactive elements, create presentation.",
                    deliverable: "Workshop curriculum and slides"
                },
                {
                    title: "Set Up Webinar Platform",
                    description: "Choose and configure technology for delivery.",
                    action: "Select platform (Zoom, WebinarJam, etc.), test all features, create registration page, set up email reminders, test thoroughly.",
                    deliverable: "Webinar platform ready"
                },
                {
                    title: "Promote Workshop",
                    description: "Get attendees for your live session.",
                    action: "Email list 2-3 times, promote on social media, create promotional graphics, consider small ad spend, set registration goal (50+).",
                    deliverable: "Workshop promoted (goal: 50+ registrations)"
                },
                {
                    title: "Deliver Live Workshop",
                    description: "Teach your workshop with excellence.",
                    action: "Show up early to test tech, engage with attendees, deliver valuable content, interact with questions, record session.",
                    deliverable: "Live workshop successfully delivered"
                },
                {
                    title: "Repurpose Workshop Content",
                    description: "Extract maximum value from live session.",
                    action: "Edit recording for replay, create highlights for social media, transcribe for blog post, extract key quotes, offer replay to registrants.",
                    deliverable: "Workshop content repurposed across channels"
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Thought Leadership",
            weekDescription: "Establish yourself as industry thought leader.",
            icon: Award,
            tasks: [
                {
                    title: "Develop Unique Perspectives",
                    description: "Identify controversial or contrarian viewpoints you hold.",
                    action: "List assumptions in your industry, identify where you disagree, develop evidence for your view, articulate clearly, prepare for pushback.",
                    deliverable: "3-5 unique perspectives documented"
                },
                {
                    title: "Write Thought Leadership Articles",
                    description: "Publish opinion pieces that showcase your expertise.",
                    action: "Write in-depth articles on industry trends, share predictions, challenge conventional wisdom, back with data/experience, publish on LinkedIn/Medium.",
                    deliverable: "2-3 thought leadership articles published"
                },
                {
                    title: "Comment on Industry News",
                    description: "Provide expert analysis on current events.",
                    action: "Follow industry news sources, share quick takes on LinkedIn/Twitter, offer unique analysis, be timely (within 24 hours), position as expert.",
                    deliverable: "Active commentary on industry trends"
                },
                {
                    title: "Get Featured in Publications",
                    description: "Contribute to industry publications and media.",
                    action: "Identify target publications, pitch article ideas, respond to journalist queries (HARO), offer expert quotes, build media relationships.",
                    deliverable: "1+ byline or feature secured"
                },
                {
                    title: "Speak at Virtual Events",
                    description: "Share expertise on stages and panels.",
                    action: "Apply to speak at online conferences, pitch webinar topics to partners, join expert panels, deliver keynotes if possible.",
                    deliverable: "Speaking engagement(s) secured or delivered"
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Community Education",
            weekDescription: "Create space for ongoing learning and discussion.",
            icon: Users,
            tasks: [
                {
                    title: "Launch Educational Community",
                    description: "Create space for audience to learn together.",
                    action: "Choose platform (Facebook Group, Slack, Discord), set up structure, create welcome message, establish rules, invite initial members.",
                    deliverable: "Educational community launched"
                },
                {
                    title: "Host Regular Office Hours",
                    description: "Make yourself available for Q&A sessions.",
                    action: "Schedule weekly office hours, promote in advance, go live to answer questions, provide value freely, record for those who can't attend.",
                    deliverable: "Weekly office hours established"
                },
                {
                    title: "Create Community Challenges",
                    description: "Design action-oriented learning experiences.",
                    action: "Develop 7-30 day challenge, provide daily prompts/tasks, create accountability system, celebrate wins, document transformations.",
                    deliverable: "Community challenge launched"
                },
                {
                    title: "Feature Community Wins",
                    description: "Showcase member successes and learning.",
                    action: "Interview community members about results, share success stories, create case studies from members, celebrate publicly.",
                    deliverable: "Member success stories shared"
                },
                {
                    title: "Facilitate Peer Learning",
                    description: "Enable members to learn from each other.",
                    action: "Create discussion prompts, host peer coaching sessions, facilitate skill shares, connect members with complementary needs.",
                    deliverable: "Peer learning system established"
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Scale & Systematize Education",
            weekDescription: "Create sustainable system for ongoing authority building.",
            icon: TrendingUp,
            tasks: [
                {
                    title: "Audit Educational Impact",
                    description: "Measure the results of your educational content.",
                    action: "Review content performance metrics, gather testimonials, calculate audience growth, assess engagement rates, measure conversions.",
                    deliverable: "Educational impact report"
                },
                {
                    title: "Create Content Repurposing System",
                    description: "Extract maximum value from each piece of content.",
                    action: "Turn blog posts into videos, convert videos to podcasts, create social posts from longer content, design infographics, build library.",
                    deliverable: "Content repurposing workflow"
                },
                {
                    title: "Automate Content Distribution",
                    description: "Use tools to maintain consistency without burnout.",
                    action: "Use scheduling tools, set up RSS feeds, automate social posting, create email sequences, implement efficiently.",
                    deliverable: "Automated content distribution system"
                },
                {
                    title: "Plan Next Quarter",
                    description: "Design educational content roadmap.",
                    action: "Analyze what worked best, plan new content series, schedule workshops/webinars, identify growth opportunities, set measurable goals.",
                    deliverable: "90-day educational content plan"
                },
                {
                    title: "Monetize Your Education",
                    description: "Convert authority into revenue opportunities.",
                    action: "Create paid course or program, offer consulting services, develop premium content tier, launch paid community, or sponsored content.",
                    deliverable: "Monetization strategy for educational platform"
                }
            ]
        }
    ]
};