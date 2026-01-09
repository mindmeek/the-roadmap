import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { User } from '@/entities/User';
import { BrandKit } from '@/entities/BrandKit';
import { FoundationProgress } from '@/entities/FoundationProgress';
import {
    Globe,
    Mail,
    Hash,
    Building,
    Lightbulb,
    Target,
    Heart,
    CheckCircle2,
    Circle,
    Loader2,
    Sparkles,
    ArrowRight,
    Plus,
    Trash2,
    Edit2,
    Save,
    X,
    Handshake,
    MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AITeamModal from '@/components/ai/AITeamModal';

const quickWinsSections = [
    {
        id: 'define_your_why',
        title: 'Define Your WHY - Your Deeper Purpose',
        icon: Heart,
        intro: `Your "WHY" is your deeper purpose - the reason you show up every day beyond making money. It's what fuels you through challenges, attracts raving fans, and builds a business with soul. When your audience knows your WHY, they don't just buy from you - they believe in you.`,
        realWorldExample: `Priya's graphic design business struggled to stand out in a sea of freelancers until she defined her WHY: "I believe every small business deserves to look as professional as they are passionate - because great design shouldn't be a luxury." This WHY, documented in The HQ's Brand Kit, shaped her pricing model (affordable packages for startups), her marketing (empowering stories), and attracted clients who valued her mission. She wasn't just a designer - she was a champion for the underdog entrepreneur.`,
        linkedToJourney: {
            stage: 'vision',
            goalId: 'vision_foundation_combo',
            weekNumber: 1,
            weekTitle: 'Define Your Why & Mission - Foundation Block #1',
            description: 'This Quick Start guide complements Week 1 of your Vision Stage journey, where you will dive deeper into your purpose using structured exercises.'
        },
        actionSteps: [
            { id: 'reflect_on_why', text: 'Reflect deeply: Why did you start this business? What experiences shaped your desire? What problem bothers you most that you want to solve? What change do you want to see in the world?' },
            { id: 'write_why', text: 'Write your WHY statement in one powerful sentence (under 25 words) that captures your core motivation and the impact you want to make' },
            { id: 'integrate_why', text: 'Integrate your WHY into The HQ Brand Kit and let it guide your brand voice, messaging, and all business decisions' }
        ],
        progressField: 'why_completed',
        hasNotes: true,
        notesPlaceholder: 'Draft your WHY statement... (Example: I believe every entrepreneur deserves access to expert guidance because success should not depend on who you know)',
        notesLabel: 'WHY Statement Drafts',
        detailedGuide: {
            title: 'How to Define Your WHY: The Complete Guide',
            sections: [
                {
                    heading: '🎯 What is Your WHY?',
                    content: `Your WHY is not what you do or how you do it - it's WHY you do it. It's your purpose, cause, or belief that drives everything you do in your business.

**The Golden Circle (Simon Sinek):**
• WHY = Your purpose, cause, belief (the core)
• HOW = Your process, values, differentiators  
• WHAT = Your products, services, results

Most businesses start with WHAT. Inspiring businesses start with WHY. When people know your WHY, they connect emotionally and become loyal advocates.`
                },
                {
                    heading: '💡 Why Your WHY Matters',
                    content: `**For You (The Founder):**
• Clarity in difficult decisions ("Does this align with our WHY?")
• Motivation during challenges (remembering the deeper purpose)
• Authenticity in everything you do (operating from core beliefs)
• Fulfillment beyond money (building something meaningful)

**For Your Customers:**
• Emotional connection (they buy into your belief, not just your product)
• Loyalty and advocacy (customers who share your WHY spread your message)
• Trust and credibility (authenticity shines through)
• Community feeling (united by shared purpose)

**For Your Business:**
• Differentiation (your WHY is uniquely yours)
• Decision filter (strategies either align with WHY or don't)
• Team alignment (attract people who believe what you believe)
• Marketing clarity (messaging flows from purpose)`
                },
                {
                    heading: '📝 Step-by-Step: Discover Your WHY',
                    content: `**Step 1: Reflection Questions (spend 30-60 minutes journaling)**

Block uninterrupted time in a quiet, inspiring space. Answer these questions honestly:

1. **Origin Story:**
   • What experiences in your life led you to start this business?
   • What moment made you say "I need to do something about this"?
   • What pattern do you see in your career/life that pointed you here?

2. **Pain Points:**
   • What injustice or problem in the world bothers you deeply?
   • What do you wish was different about your industry?
   • What frustrates you about how things are currently done?

3. **Impact & Legacy:**
   • If your business was wildly successful, what would be different in the world?
   • What do you want people to say about your business?
   • What legacy do you want to leave in your industry or community?

4. **Values & Beliefs:**
   • What do you believe to be true that others might not?
   • What values are non-negotiable for you in business?
   • What do you stand for? What do you stand against?

5. **Your Unique Perspective:**
   • What do you see that others miss?
   • What's obvious to you that isn't obvious to others?
   • What would you fight for even if it cost you business?`
                },
                {
                    heading: '✍️ Step 2: Write Your WHY Statement',
                    content: `**Formula Options:**

**Option 1 - Belief Statement:**
"I believe that [who you serve] deserves [what they deserve] because [why it matters]."

Example: "I believe that every small business owner deserves access to expert marketing guidance because success should not depend on who you know or how much money you have."

**Option 2 - Purpose Statement:**
"My purpose is to [action/change you want to create] so that [impact on world/people]."

Example: "My purpose is to democratize financial education so that everyone, regardless of background, can build wealth and financial freedom."

**Option 3 - Impact Statement:**
"I exist to [solve what problem] for [who] because [deeper reason/belief]."

Example: "I exist to eliminate the tech overwhelm for solo entrepreneurs because technology should empower, not frustrate."

**Characteristics of a Strong WHY Statement:**
✓ Short (under 25 words)
✓ Clear and simple (anyone can understand)
✓ Emotionally resonant (you feel it when you read it)
✓ Authentic to you (not what sounds impressive)
✓ Actionable (guides decisions)
✓ Bigger than profit (about impact/change)
✓ Timeless (won't change as products evolve)`
                },
                {
                    heading: '🎨 Step 3: Test & Refine Your WHY',
                    content: `**Test Your WHY Statement:**

1. **The Gut Check:** When you read it, do you feel it? Does it give you energy? If not, keep refining.

2. **The Mom Test:** Can you explain it to someone not in your industry and they "get it"? If it's too jargon-heavy, simplify.

3. **The Decision Filter:** Does it help you make decisions? Example: "Should I do this partnership?" → "Does it align with my WHY?" If answer isn't clear, refine WHY.

4. **The Customer Test:** Share with 3-5 ideal customers. Do they resonate? Do they say "Yes! That's exactly why I need this!" If not, adjust language.

5. **The Longevity Test:** Will this WHY still be true 5 years from now if your products/services change? If no, it's too specific to current offerings.

**Common Mistakes to Avoid:**
❌ Making it about YOU (your success, your freedom) instead of IMPACT
❌ Being too vague ("make a difference") - specificity creates connection
❌ Confusing your WHY with WHAT you do (products/services)
❌ Trying to appeal to everyone (a clear WHY attracts some, repels others - that's good!)
❌ Overthinking it (trust your gut on first authentic draft)`
                },
                {
                    heading: '🚀 Step 4: Integrate Your WHY Everywhere',
                    content: `**Once You've Defined Your WHY, Use It To Guide:**

**Brand Voice & Messaging:**
• Website copy should reflect your WHY
• Social media posts should tie back to purpose
• Email communications should reinforce belief
• Marketing should lead with WHY, not just WHAT

**Business Decisions:**
• Pricing strategy (who can you serve given your WHY?)
• Partnerships (do they share your beliefs?)
• Product development (does new offer align with purpose?)
• Customer selection (are they aligned with your mission?)

**Team & Culture:**
• Hire people who believe what you believe
• Onboarding includes sharing the WHY
• Team decisions evaluated through WHY lens
• Change management: Vision and mission should be updated.
• Culture: Mission/vision define "how we do things here"

**Customer Experience:**
• Every touchpoint reinforces the purpose
• Customer success metrics tied to impact, not just satisfaction
• Testimonials highlight transformation aligned with WHY
• Community built around shared belief

**THE HQ INTEGRATION:**
Document your WHY in Brand Kit → Reference in Value Proposition → Use in messaging everywhere → Track impact in Foundation Roadmap`
                }
            ],
            examples: [
                {
                    business: 'Life Coach for Women',
                    why: 'I believe every woman deserves to prioritize herself without guilt because self-care is not selfish - it\'s essential.',
                    impact: 'Messaging focuses on permission and empowerment, not just tactics. Attracts women tired of putting everyone else first.'
                },
                {
                    business: 'Web Developer for Nonprofits',
                    why: 'I exist to amplify the voices of organizations doing good because technology should serve humanity, not just commerce.',
                    impact: 'Pricing model offers nonprofit discount. Marketing emphasizes impact stories. Attracts mission-driven organizations.'
                },
                {
                    business: 'Business Coach',
                    why: 'My purpose is to prove that ethical, authentic business can be wildly profitable because success should not require compromise.',
                    impact: 'Teaching style focuses on aligned success. Repels "hustle at all costs" crowd. Attracts values-driven entrepreneurs.'
                }
            ],
            journeyConnection: {
                text: '📍 **This is Week 1 of Your Vision Stage Journey**',
                description: 'After completing this Quick Start guide, continue to Week 1 of your Vision Stage roadmap where you\'ll use structured exercises and AI guidance to dive even deeper into your WHY and begin crafting your mission statement.',
                linkText: 'Go to Vision Stage Week 1: Define Your Why & Mission →',
                linkPage: 'Journey'
            }
        }
    },
    {
        id: 'business_name',
        title: 'Getting Your Business Name & Making It Mean Something',
        icon: Lightbulb,
        intro: `Your business name is more than a label - it's your first impression, your brand story, and a marketing tool. A meaningful, memorable name communicates your values, attracts your ideal clients, and differentiates you in a crowded market.`,
        realWorldExample: `When Tanya launched her business coaching practice, she initially called it "TK Business Solutions" - generic and forgettable. After brainstorming with The HQ's Brand Kit tool, she renamed it "Catalyst Growth Coaching" - immediately conveying transformation and forward momentum. The new name resonated deeply with her target clients (entrepreneurs ready to scale), and her website traffic doubled within weeks of the rebrand. Every touchpoint in The HQ now reflected this powerful, intentional name.`,
        actionSteps: [
            { id: 'brainstorm_names', text: 'Brainstorm 10-15 business name ideas that reflect your mission, values, and what makes you unique' },
            { id: 'test_names', text: 'Test your top 3 names with potential customers and get feedback on memorability and meaning' },
            { id: 'finalize_name', text: 'Choose your final business name, check trademark availability, and add it to your HQ Brand Kit' }
        ],
        progressField: 'name_completed',
        hasNotes: true,
        notesPlaceholder: 'Enter a business name idea...',
        notesLabel: 'Business Name Ideas'
    },
    {
        id: 'domain_name',
        title: 'Getting Your Domain Name',
        icon: Globe,
        intro: `Your domain name is your digital address - the foundation of your online presence. It's how customers will find you, remember you, and share your business. Securing the right domain early ensures brand consistency and builds credibility from day one.`,
        realWorldExample: `Sarah, launching her wellness coaching business "Mindful Path Coaching," secured mindfulpathcoaching.com immediately. When clients Googled her business name, they found her professional website right away. Her consistent domain across all marketing materials built instant trust. Using The HQ's Brand Kit tool, she documented this domain alongside her mission, ensuring every future piece of content reinforced her brand identity.`,
        actionSteps: [
            { id: 'research_domain', text: 'Research and check availability of 3-5 domain name options (use Namecheap, GoDaddy, or Google Domains)' },
            { id: 'purchase_domain', text: 'Purchase your chosen .com domain (aim for simple, memorable, and reflective of your brand)' },
            { id: 'document_domain', text: 'Document your domain in The HQ Brand Kit for future reference' }
        ],
        progressField: 'domain_completed',
        hasNotes: true,
        notesPlaceholder: 'Enter a domain name idea (e.g., mybusiness.com)...',
        notesLabel: 'Domain Name Options'
    },
    {
        id: 'social_handles',
        title: 'Getting All Social Handles',
        icon: Hash,
        intro: `Claiming your business name across all major social platforms protects your brand identity and ensures customers can find you anywhere they look. Even if you're not actively posting on every platform yet, securing these handles prevents competitors or imposters from taking them.`,
        realWorldExample: `Lisa launched "GreenLeaf Gardens" and secured @greenleafgardens on Instagram, Facebook, LinkedIn, Twitter, TikTok, and YouTube - even though she only planned to use Instagram initially. Six months later, when a competitor tried to use a similar name on TikTok, it was already taken. Her consistent handles across platforms (documented in The HQ) made it easy for press features and partnerships to tag her correctly, amplifying her reach.`,
        actionSteps: [
            { id: 'check_handle_availability', text: 'Check handle availability across Instagram, Facebook, LinkedIn, Twitter/X, TikTok, and YouTube using Namechk.com' },
            { id: 'claim_handles', text: 'Claim your business name on all major platforms (use same handle for consistency)' },
            { id: 'document_handles', text: 'Document all social handles in The HQ Brand Kit and set up basic profiles' }
        ],
        progressField: 'social_completed',
        hasNotes: true,
        notesPlaceholder: 'Enter a social media handle idea (e.g., @mybusiness)...',
        notesLabel: 'Social Handle Ideas'
    },
    {
        id: 'professional_email',
        title: 'Getting Professional Email Address',
        icon: Mail,
        intro: `A professional email address (e.g., hello@yourbusiness.com) instantly elevates your credibility and separates you from hobbyists. It shows you're serious, established, and trustworthy - critical for winning client confidence and closing deals.`,
        realWorldExample: `Marcus was pitching his consulting services using marcus.freelance@gmail.com. Prospects hesitated, unsure if he was legitimate. After setting up marcus@marcusconsulting.com through Google Workspace (guided by The HQ's foundational tools), his response rates improved by 40%. The professional email, combined with his completed Brand Kit in The HQ, signaled he was a credible, established business owner.`,
        actionSteps: [
            { id: 'choose_email_provider', text: 'Choose an email hosting provider (Google Workspace or Microsoft 365 recommended)' },
            { id: 'setup_primary_email', text: 'Set up your primary business email (e.g., hello@, info@, or yourname@yourdomain.com)' },
            { id: 'configure_signature', text: 'Configure a professional email signature with your logo, website, and contact info' }
        ],
        progressField: 'email_completed',
        hasPartnerLink: true,
        partnerLinkText: '🤝 Need help setting up a professional email? Our partners can assist with email setup and configuration.',
        hasNotes: true,
        notesPlaceholder: 'Enter email address ideas or setup notes...',
        notesLabel: 'Professional Email Notes'
    },
    {
        id: 'mission_vision',
        title: 'Your Mission and Vision Statements',
        icon: Target,
        intro: `Your mission defines what you do and who you serve today. Your vision paints the future you're building toward. Together, they guide every business decision, inspire your team, and connect emotionally with customers who share your values.`,
        realWorldExample: `Andre's landscaping business felt directionless until he used The HQ's Brand Kit to craft his mission: "We transform outdoor spaces into sustainable sanctuaries where families thrive." His vision: "To be the leading eco-conscious landscaping company in the region, known for beauty and environmental stewardship." These statements clarified his marketing message, attracted eco-minded clients, and helped him confidently turn down projects that didn't align. They became the compass for every strategy tool in The HQ.`,
        linkedToJourney: {
            stage: 'vision',
            goalId: 'vision_foundation_combo',
            weekNumber: 1,
            weekTitle: 'Define Your Why & Mission - Foundation Block #1',
            description: 'This Quick Start guide builds on Week 1 of your Vision Stage journey. After defining your WHY, you\'ll craft mission and vision statements that operationalize your purpose.'
        },
        actionSteps: [
            { id: 'define_mission', text: 'Write your mission statement (what you do, who you serve, and the impact you make today)' },
            { id: 'craft_vision', text: 'Craft your vision statement (the aspirational future you are working toward in 3-5 years)' },
            { id: 'document_statements', text: 'Add both statements to The HQ Brand Kit and use them to guide all future decisions' }
        ],
        progressField: 'mission_vision_completed',
        hasNotes: true,
        notesPlaceholder: 'Draft your mission or vision statement...',
        notesLabel: 'Mission & Vision Drafts',
        hasAIAssistance: true,
        detailedGuide: {
            title: 'Mission & Vision Statements: The Complete Guide',
            sections: [
                {
                    heading: '🎯 What Are Mission & Vision Statements?',
                    content: `**Mission Statement = Your Purpose TODAY**
Your mission statement defines what you do, who you serve, and the value you create right now. It's operational and present-focused.

**Vision Statement = Your Aspiration for TOMORROW**
Your vision statement paints the future you're building toward in 3-5 years. It's inspirational and future-focused.

**The Relationship:**
WHY → Mission → Vision
• Your WHY (from previous section) is your core belief/purpose
• Your Mission operationalizes that WHY (how you act on it today)
• Your Vision shows where that WHY is leading you (future impact)`
                },
                {
                    heading: '📋 Mission Statement Deep Dive',
                    content: `**What a Mission Statement Should Answer:**
1. What do we do? (Your core activity/service)
2. Who do we serve? (Your target customers)
3. How do we do it? (Your approach/differentiator)
4. Why does it matter? (The impact/transformation)

**Formula for Strong Mission Statements:**

**Option 1 - Action-Based:**
"We [action verb] [who you serve] by [how you do it] so they can [outcome/transformation]."

Example: "We empower small business owners through expert marketing guidance so they can attract ideal customers and grow with confidence."

**Option 2 - Service-Based:**
"We provide [service/product] to [target audience] through [unique approach/values]."

Example: "We provide affordable, eco-friendly landscaping to residential homeowners through sustainable practices that beautify spaces and protect the environment."

**Option 3 - Impact-Based:**
"Our mission is to [change you want to create] by [how you create it] for [who benefits]."

Example: "Our mission is to eliminate financial stress for families by providing personalized wealth planning strategies that build long-term security."

**Characteristics of Strong Mission Statements:**
✓ Clear and concise (1-2 sentences, under 30 words)
✓ Present tense (what you do NOW)
✓ Specific about WHO you serve
✓ Defines WHAT you provide
✓ Explains the VALUE/IMPACT
✓ Actionable (guides daily decisions)
✓ Authentic (reflects your actual business)
✓ Memorable (stakeholders can recall it)`
                },
                {
                    heading: '🌟 Vision Statement Deep Dive',
                    content: `**What a Vision Statement Should Answer:**
1. Where are we going? (Future aspiration)
2. What will be different? (Impact at scale)
3. What will we be known for? (Reputation/legacy)
4. What does success look like? (End state)

**Formula for Strong Vision Statements:**

**Option 1 - Aspirational Future:**
"To be [position/reputation] [geographic scope] known for [what you're known for]."

Example: "To be the most trusted financial advisory firm in the Southeast, known for helping families achieve multigenerational wealth."

**Option 2 - World-Impact:**
"A world where [the change you want to see] because of [what you've built/created]."

Example: "A world where every entrepreneur has access to expert guidance, leveling the playing field for business success."

**Option 3 - Achievement-Focused:**
"Within [timeframe], we will [achievement] by [how you'll do it], becoming [what you'll be known as]."

Example: "Within 5 years, we will serve 10,000 sustainable gardens across the region, becoming the leading voice for eco-conscious landscaping."

**Characteristics of Strong Vision Statements:**
✓ Aspirational and inspiring (big dream)
✓ Future-focused (3-5 years out)
✓ Ambitious but achievable (stretch goal)
✓ Clear and vivid (can picture it)
✓ Aligned with mission (logical progression)
✓ Emotionally compelling (rallies team)
✓ Measurable (know when you've achieved it)
✓ Differentiating (unique to your business)`
                },
                {
                    heading: '✍️ Step-by-Step: Craft Your Statements',
                    content: `**STEP 1: Start with Your WHY (from previous section)**
Your WHY is the foundation. Mission and vision flow from it.

Example WHY: "I believe every small business deserves expert marketing guidance because success shouldn't depend on who you know."

**STEP 2: Write Your Mission Statement**

Answer these questions:
• What do we do TODAY? (Core service/product)
• Who do we serve? (Specific target market)
• How do we do it differently? (Unique approach)
• What transformation do we create? (Immediate impact)

Draft 3-5 mission statements using different formulas. Read them out loud. Which feels most authentic?

Example Mission: "We provide affordable, results-driven marketing strategies to small businesses, helping them attract ideal customers and grow sustainably."

**STEP 3: Write Your Vision Statement**

Answer these questions:
• Where will we be in 5 years? (Scale, reach, reputation)
• What will be different in the world? (Impact)
• What will we be THE leader in? (Positioning)
• What legacy are we building? (Long-term)

Draft 3-5 vision statements. Which one inspires you? Which feels like a worthy challenge?

Example Vision: "To be the go-to marketing partner for 1,000+ thriving small businesses nationwide, known for democratizing expert strategy for entrepreneurs at every stage."

**STEP 4: Test for Alignment**

Check:
✓ Does mission operationalize your WHY?
✓ Does vision extend mission into future?
✓ Are they consistent with each other?
✓ Do they guide decisions clearly?
✓ Can team members understand and remember them?

**STEP 5: Get Feedback**

Share with:
• Co-founder/business partner
• Trusted mentor or advisor
• 3-5 ideal customers
• Team members (if you have them)

Ask: "Is this clear? Inspiring? Authentic? What's missing?"

**STEP 6: Finalize and Document**

Once refined:
• Add to Brand Kit in The HQ
• Share with all stakeholders
• Reference in marketing materials
• Use to guide strategic decisions
• Review/update annually`
                },
                {
                    heading: '🚀 Using Mission & Vision in Your Business',
                    content: `**Daily Operations (Mission-Guided):**
• Decision making: "Does this align with our mission?"
• Customer service: Mission defines service standards
• Product development: New offers must support mission
• Hiring: Look for mission alignment in candidates

**Strategic Planning (Vision-Guided):**
• Goal setting: Goals should move you toward vision
• Resource allocation: Invest in vision-aligned initiatives
• Partnership decisions: Partner with vision-aligned companies
• Marketing message: Communicate journey toward vision

**Brand Communication:**
• Website: Mission on homepage, vision on About page
• Proposals: Reference mission when explaining value
• Marketing: Stories showing mission in action
• Social media: Content reflects mission and vision
• Investor pitch: Vision shows where you're headed

**Team Alignment:**
• Onboarding: Share mission and vision first day
• Performance reviews: Evaluate against mission fulfillment
• Team meetings: Start with mission/vision reminder
• Recognition: Celebrate wins that advance vision
• Culture: Mission/vision define "how we do things here"

**THE HQ INTEGRATION:**
Document in Brand Kit → Reference in Value Proposition → Guide Strategy Tools → Measure progress in Foundation Roadmap → Share in Community`
                },
                {
                    heading: '⚠️ Common Mistakes to Avoid',
                    content: `**Mission Statement Mistakes:**
❌ Too vague ("provide great service") - be specific!
❌ Too long (paragraph) - keep to 1-2 sentences
❌ Only about profit ("maximize shareholder value")
❌ Confusing mission with vision (mixing present and future)
❌ Using jargon customers don't understand
❌ Not mentioning WHO you serve
❌ Copying competitors' missions

**Vision Statement Mistakes:**
❌ Not ambitious enough (incremental, not transformational)
❌ Too generic (could apply to any business)
❌ Unrealistic/unbelievable (Mars colony in 2 years)
❌ No timeframe (when will this happen?)
❌ Focused on internal metrics vs. external impact
❌ Boring/uninspiring (doesn't rally team)
❌ Not aligned with mission and WHY

**Fix by:**
✓ Getting specific about who/what/how
✓ Simplifying language (8th grade reading level)
✓ Focusing on impact, not just activity
✓ Making it memorable and repeatable
✓ Testing with real customers and team
✓ Being authentic to YOUR business
✓ Reviewing and refining over time`
                }
            ],
            examples: [
                {
                    business: 'Business Coach',
                    why: 'I believe ethical businesses can be wildly profitable',
                    mission: 'We help purpose-driven entrepreneurs build 6-figure businesses through aligned strategies that honor their values and serve their communities.',
                    vision: 'To prove that 1,000 ethical businesses can achieve massive success, becoming the leading voice for conscious capitalism in coaching.'
                },
                {
                    business: 'Graphic Designer',
                    why: 'I believe small businesses deserve professional branding',
                    mission: 'We provide affordable, custom brand design to small businesses and solopreneurs, helping them look as professional as they are passionate.',
                    vision: 'To rebrand 500 small businesses by 2028, becoming known as the go-to design partner for entrepreneurs who can\'t afford agencies.'
                },
                {
                    business: 'Wellness Coach',
                    why: 'I believe self-care is not selfish',
                    mission: 'We empower overwhelmed professionals to prioritize their wellbeing through sustainable self-care practices that fit their real lives.',
                    vision: 'A world where 10,000 professionals have reclaimed their health and happiness, making self-care as routine as checking email.'
                }
            ],
            journeyConnection: {
                text: '📍 **This Builds on Week 1 of Your Vision Stage Journey**',
                description: 'After completing this Quick Start guide, return to Week 1 of your Vision Stage roadmap to use AI guidance and structured exercises to refine your mission and vision even further.',
                linkText: 'Continue in Vision Stage Week 1: Define Your Why & Mission →',
                linkPage: 'Journey'
            }
        }
    },
    {
        id: 'legal_structure',
        title: 'Understanding Your Legal Structure',
        icon: Building,
        intro: `Choosing the right legal structure (Sole Proprietorship, LLC, S-Corp, C-Corp) protects your personal assets, optimizes your taxes, and positions your business for growth. This decision impacts everything from liability to funding opportunities, so understanding your options is crucial.`,
        realWorldExample: `James started his tech consulting as a sole proprietor for simplicity. After landing a major contract, his attorney advised forming an LLC to protect his personal assets from business liabilities. Using The HQ's interactive legal structure guide, James understood the differences, filed his LLC paperwork, and updated his business operations accordingly. The clarity from The HQ's tools gave him confidence he'd made the right choice and avoided costly mistakes.`,
        actionSteps: [
            { id: 'learn_structures', text: 'Review the legal structure options below and understand the pros/cons of each' },
            { id: 'consult_professional', text: 'Consult with a business attorney or accountant to determine the best fit for your situation' },
            { id: 'register_structure', text: 'Register your chosen legal structure with your state (LLC filing, DBA, etc.)' }
        ],
        progressField: 'legal_completed',
        hasPartnerLink: true,
        partnerLinkText: '🤝 Need help incorporating? Check out our trusted partners who can assist with legal structure and registration.',
        expandedContent: {
            title: 'Legal Structure Options Explained',
            structures: [
                {
                    name: 'Sole Proprietorship',
                    description: 'The simplest structure where you and your business are legally the same entity.',
                    pros: ['Easy and inexpensive to set up', 'Complete control', 'Simple tax filing (Schedule C)'],
                    cons: ['Unlimited personal liability', 'Difficult to raise capital', 'Business ends if you do'],
                    bestFor: 'Solo freelancers, consultants, and very small businesses testing an idea'
                },
                {
                    name: 'LLC (Limited Liability Company)',
                    description: 'A flexible structure that separates personal and business liability while offering tax flexibility.',
                    pros: ['Personal asset protection', 'Flexible tax options', 'Less paperwork than corporations', 'Credibility boost'],
                    cons: ['State filing fees', 'Some ongoing compliance', 'May need operating agreement'],
                    bestFor: 'Most small to medium businesses, especially those with any liability risk'
                },
                {
                    name: 'S-Corporation',
                    description: 'A tax election that allows you to avoid double taxation while enjoying corporate benefits.',
                    pros: ['Pass-through taxation', 'Personal asset protection', 'Potential self-employment tax savings', 'Attractive to investors'],
                    cons: ['More complex paperwork', 'Strict operational requirements', 'IRS scrutiny on salary vs. distributions'],
                    bestFor: 'Profitable businesses with significant income where tax savings outweigh complexity'
                },
                {
                    name: 'C-Corporation',
                    description: 'A separate legal entity that can raise capital and go public, but faces double taxation.',
                    pros: ['Unlimited growth potential', 'Easy to raise capital', 'Can go public', 'Attractive to VCs'],
                    cons: ['Double taxation', 'Complex compliance', 'Expensive to maintain', 'Less control'],
                    bestFor: 'High-growth startups seeking venture capital or planning to go public'
                }
            ]
        }
    },
    {
        id: 'professional_mailing_address',
        title: 'Getting a Professional Mailing Address',
        icon: MapPin,
        intro: `A professional mailing address (virtual mailbox or business address) separates your home address from your business, protects your privacy, and enhances credibility. It's essential for LLC filings, official correspondence, and presenting a professional image to clients and partners.`,
        realWorldExample: `When Rachel filed her LLC, she didn't want to use her home address for public records. She set up a virtual mailbox through a professional service, giving her a business address in a prestigious area. This address appeared on her website, business cards, and all official filings—instantly boosting credibility. Clients perceived her as more established, and she never worried about privacy or security issues from publicly listing her home address.`,
        actionSteps: [
            { id: 'research_address_services', text: 'Research virtual mailbox services or coworking spaces that offer professional business addresses' },
            { id: 'setup_mailing_address', text: 'Set up your professional mailing address and ensure it can receive legal and official mail' },
            { id: 'update_business_docs', text: 'Update your business documents, LLC filings, and marketing materials with your new professional address' }
        ],
        progressField: 'mailing_address_completed',
        hasNotes: true,
        notesPlaceholder: 'Enter notes about your professional mailing address setup...',
        notesLabel: 'Professional Mailing Address Notes',
        hasPartnerLink: true,
        partnerLinkText: '🤝 Need help getting a professional mailing address? Our partners can assist with virtual mailbox services and business address solutions.'
    }
];

const NotesSection = ({ sectionId, notes, onAddNote, onDeleteNote, onEditNote, placeholder, label }) => {
    const [newNote, setNewNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [isAdding, setIsAdding] = useState(false); // This state isn't used in the provided outline, but was in original code. Retained.

    const sectionNotes = notes[sectionId] || [];

    const handleAdd = () => {
        if (newNote.trim()) {
            onAddNote(sectionId, newNote.trim());
            setNewNote('');
        }
    };

    const handleStartEdit = (noteId, content) => {
        setEditingNoteId(noteId);
        setEditContent(content);
    };

    const handleSaveEdit = (noteId) => {
        if (editContent.trim()) {
            onEditNote(sectionId, noteId, editContent.trim());
            setEditingNoteId(null);
            setEditContent('');
        }
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditContent('');
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <h5 className="font-semibold text-[var(--text-main)] text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[var(--primary-gold)]" />
                {label}
            </h5>

            {/* Existing Notes */}
            {sectionNotes.length > 0 && (
                <div className="space-y-2">
                    {sectionNotes.map((note) => (
                        <div key={note.id} className="bg-white dark:bg-gray-900 rounded border border-[var(--border-color)] p-3">
                            {editingNoteId === note.id ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="form-input w-full text-sm h-20 resize-none"
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveEdit(note.id)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <Save className="w-3 h-3 mr-1" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            <X className="w-3 h-3 mr-1" />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm text-[var(--text-main)] flex-1">{note.content}</p>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <button
                                            onClick={() => handleStartEdit(note.id, note.content)}
                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                        >
                                            <Edit2 className="w-3 h-3 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => onDeleteNote(sectionId, note.id)}
                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                        >
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add New Note */}
            <div className="space-y-2">
                <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={placeholder}
                    className="form-input w-full text-sm h-20 resize-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            handleAdd();
                        }
                    }}
                />
                <button
                    onClick={handleAdd}
                    disabled={!newNote.trim()}
                    className="btn btn-primary btn-sm disabled:opacity-50"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Note
                </button>
            </div>
        </div>
    );
};

export default function QuickStartFoundation() {
    const [user, setUser] = useState(null);
    const [brandKit, setBrandKit] = useState(null);
    const [foundationProgress, setFoundationProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedSteps, setCompletedSteps] = useState({});
    const [expandedSection, setExpandedSection] = useState(null);
    const [saving, setSaving] = useState(false);
    const [sectionNotes, setSectionNotes] = useState({});
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiAssistantType, setAiAssistantType] = useState('elyzet');
    const [aiContext, setAiContext] = useState({});

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            const kits = await BrandKit.filter({ created_by: currentUser.email });
            if (kits.length > 0) {
                setBrandKit(kits[0]);
            }

            const progress = await FoundationProgress.filter({ created_by: currentUser.email });
            if (progress.length > 0) {
                setFoundationProgress(progress[0]);

                const completed = {};
                quickWinsSections.forEach(section => {
                    section.actionSteps.forEach(step => {
                        const stepKey = `${section.id}_${step.id}`;
                        completed[stepKey] = progress[0].completed_steps?.includes(stepKey) || false;
                    });
                });
                setCompletedSteps(completed);
                setSectionNotes(progress[0].notes || {});
            } else {
                const newProgress = await FoundationProgress.create({
                    completed_steps: [],
                    notes: {}
                });
                setFoundationProgress(newProgress);
                setSectionNotes({});
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStepToggle = async (sectionId, stepId) => {
        const stepKey = `${sectionId}_${stepId}`;
        const newCompleted = {
            ...completedSteps,
            [stepKey]: !completedSteps[stepKey]
        };
        setCompletedSteps(newCompleted);

        setSaving(true);
        try {
            const completedArray = Object.keys(newCompleted).filter(key => newCompleted[key]);
            await FoundationProgress.update(foundationProgress.id, {
                completed_steps: completedArray,
                step_completion_dates: {
                    ...foundationProgress.step_completion_dates,
                    [stepKey]: new Date().toISOString()
                }
            });
        } catch (error) {
            console.error('Error saving progress:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleAddNote = async (sectionId, content) => {
        const newNote = {
            id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            content: content,
            created_at: new Date().toISOString()
        };

        const updatedNotes = {
            ...sectionNotes,
            [sectionId]: [...(sectionNotes[sectionId] || []), newNote]
        };

        setSectionNotes(updatedNotes);
        setSaving(true);

        try {
            await FoundationProgress.update(foundationProgress.id, {
                notes: updatedNotes
            });
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteNote = async (sectionId, noteId) => {
        const updatedNotes = {
            ...sectionNotes,
            [sectionId]: (sectionNotes[sectionId] || []).filter(note => note.id !== noteId)
        };

        setSectionNotes(updatedNotes);
        setSaving(true);

        try {
            await FoundationProgress.update(foundationProgress.id, {
                notes: updatedNotes
            });
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleEditNote = async (sectionId, noteId, newContent) => {
        const updatedNotes = {
            ...sectionNotes,
            [sectionId]: (sectionNotes[sectionId] || []).map(note =>
                note.id === noteId ? { ...note, content: newContent } : note
            )
        };

        setSectionNotes(updatedNotes);
        setSaving(true);

        try {
            await FoundationProgress.update(foundationProgress.id, {
                notes: updatedNotes
            });
        } catch (error) {
            console.error('Error editing note:', error);
        } finally {
            setSaving(false);
        }
    };

    const getSectionProgress = (section) => {
        const totalSteps = section.actionSteps.length;
        const completed = section.actionSteps.filter(step =>
            completedSteps[`${section.id}_${step.id}`]
        ).length;
        return { completed, total: totalSteps, percentage: (completed / totalSteps) * 100 };
    };

    const overallProgress = () => {
        const totalSteps = quickWinsSections.reduce((sum, section) => sum + section.actionSteps.length, 0);
        const completedCount = Object.values(completedSteps).filter(Boolean).length;
        return { completed: completedCount, total: totalSteps, percentage: (completedCount / totalSteps) * 100 };
    };

    const openAIAssistant = (assistantType, section) => {
        setAiAssistantType(assistantType);
        setAiContext({
            sectionTitle: section.title,
            sectionId: section.id,
            userNotes: sectionNotes[section.id] || []
        });
        setAiModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    const progress = overallProgress();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 p-3 rounded-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Quick Start Foundation</h1>
                        <p className="text-[var(--text-soft)]">Essential steps every entrepreneur needs to complete</p>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-[var(--text-main)]">Your Progress</span>
                        <span className="text-sm text-[var(--text-soft)]">
                            {progress.completed} of {progress.total} steps completed
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                        />
                    </div>
                    {progress.percentage === 100 && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Congratulations! You have completed all Quick Start Foundation steps. Ready to dive into your 90-Day Journey?
                                </p>
                            </div>
                            <Link to={createPageUrl('Journey')} className="btn btn-primary mt-3">
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Start My 90-Day Journey
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {quickWinsSections.map((section) => {
                    const Icon = section.icon;
                    const sectionProgress = getSectionProgress(section);
                    const isExpanded = expandedSection === section.id;

                    return (
                        <div key={section.id} className="card overflow-hidden">
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${sectionProgress.percentage === 100 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                        <Icon className={`w-6 h-6 ${sectionProgress.percentage === 100 ? 'text-green-600' : 'text-[var(--primary-gold)]'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-[var(--text-main)]">{section.title}</h3>
                                            {sectionProgress.percentage === 100 && (
                                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-[var(--primary-gold)] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${sectionProgress.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-[var(--text-soft)] whitespace-nowrap">
                                                {sectionProgress.completed}/{sectionProgress.total}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[var(--text-soft)]">{section.intro}</p>
                                    </div>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="border-t border-[var(--border-color)] p-6 space-y-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
                                        <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                            <Lightbulb className="w-5 h-5 text-blue-600" />
                                            Real-World Example
                                        </h4>
                                        <p className="text-sm text-[var(--text-soft)]">{section.realWorldExample}</p>
                                    </div>

                                    {section.linkedToJourney && (
                                        <Link
                                            to={createPageUrl(section.linkedToJourney.linkPage, {
                                                stage: section.linkedToJourney.stage,
                                                week: section.linkedToJourney.weekNumber,
                                                goalId: section.linkedToJourney.goalId
                                            })}
                                            className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors"
                                        >
                                            <p className="text-xs font-semibold uppercase mb-1">{section.linkedToJourney.text}</p>
                                            <p className="text-sm">{section.linkedToJourney.description}</p>
                                            <p className="text-sm font-semibold mt-2 flex items-center gap-1">
                                                {section.linkedToJourney.linkText} <ArrowRight className="w-4 h-4" />
                                            </p>
                                        </Link>
                                    )}

                                    {section.detailedGuide && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h4 className="font-bold text-lg text-[var(--text-main)] mb-4">
                                                {section.detailedGuide.title}
                                            </h4>
                                            {section.detailedGuide.sections.map((subSection, subIdx) => (
                                                <div key={subIdx} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-[var(--border-color)]">
                                                    <h5 className="font-semibold text-[var(--text-main)] mb-2">{subSection.heading}</h5>
                                                    <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--text-soft)]" dangerouslySetInnerHTML={{ __html: subSection.content.replace(/\n/g, '<br>') }} />
                                                </div>
                                            ))}
                                            {section.detailedGuide.examples && section.detailedGuide.examples.length > 0 && (
                                                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                                                    <h5 className="font-semibold text-[var(--text-main)] mb-2 flex items-center gap-2">
                                                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                                                        Examples:
                                                    </h5>
                                                    <div className="space-y-3">
                                                        {section.detailedGuide.examples.map((example, exIdx) => (
                                                            <div key={exIdx} className="text-sm text-[var(--text-soft)]">
                                                                <p className="font-semibold text-[var(--text-main)]">{example.business}:</p>
                                                                <p><span className="font-medium text-[var(--primary-gold)]">WHY:</span> {example.why}</p>
                                                                {example.mission && <p><span className="font-medium text-[var(--primary-gold)]">MISSION:</span> {example.mission}</p>}
                                                                {example.vision && <p><span className="font-medium text-[var(--primary-gold)]">VISION:</span> {example.vision}</p>}
                                                                {example.impact && <p><span className="font-medium text-[var(--primary-gold)]">IMPACT:</span> {example.impact}</p>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {section.detailedGuide.journeyConnection && (
                                                <Link
                                                    to={createPageUrl(section.detailedGuide.journeyConnection.linkPage, {
                                                        stage: section.linkedToJourney.stage,
                                                        week: section.linkedToJourney.weekNumber,
                                                        goalId: section.linkedToJourney.goalId
                                                    })}
                                                    className="block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors"
                                                >
                                                    <p className="text-xs font-semibold uppercase mb-1">{section.detailedGuide.journeyConnection.text}</p>
                                                    <p className="text-sm">{section.detailedGuide.journeyConnection.description}</p>
                                                    <p className="text-sm font-semibold mt-2 flex items-center gap-1">
                                                        {section.detailedGuide.journeyConnection.linkText} <ArrowRight className="w-4 h-4" />
                                                    </p>
                                                </Link>
                                            )}
                                        </div>
                                    )}

                                    {/* Notes Section */}
                                    {section.hasNotes && (
                                        <NotesSection
                                            sectionId={section.id}
                                            notes={sectionNotes}
                                            onAddNote={handleAddNote}
                                            onDeleteNote={handleDeleteNote}
                                            onEditNote={handleEditNote}
                                            placeholder={section.notesPlaceholder}
                                            label={section.notesLabel}
                                        />
                                    )}

                                    {/* AI Assistance for Mission/Vision */}
                                    {section.hasAIAssistance && (
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                                                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="font-semibold text-[var(--text-main)] mb-2">
                                                        Need Help Crafting Your Mission & Vision?
                                                    </h5>
                                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                                        Get personalized guidance from our AI Business Team experts.
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        <button
                                                            onClick={() => openAIAssistant('elyzet', section)}
                                                            className="btn btn-secondary btn-sm"
                                                        >
                                                            <span className="mr-2">👔</span>
                                                            Ask Elyzet (Chief Strategist)
                                                        </button>
                                                        <button
                                                            onClick={() => openAIAssistant('ava', section)}
                                                            className="btn btn-secondary btn-sm"
                                                        >
                                                            <span className="mr-2">🎯</span>
                                                            Ask Ava (Marketing)
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold text-[var(--text-main)] mb-4">Action Steps:</h4>
                                        <div className="space-y-3">
                                            {section.actionSteps.map((step, index) => {
                                                const stepKey = `${section.id}_${step.id}`;
                                                const isCompleted = completedSteps[stepKey];

                                                return (
                                                    <div
                                                        key={step.id}
                                                        className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                                                            isCompleted
                                                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                                                : 'bg-white dark:bg-gray-800 border-[var(--border-color)]'
                                                        }`}
                                                    >
                                                        <button
                                                            onClick={() => handleStepToggle(section.id, step.id)}
                                                            className="mt-1 flex-shrink-0"
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                                            ) : (
                                                                <Circle className="w-6 h-6 text-gray-400" />
                                                            )}
                                                        </button>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-xs font-semibold text-[var(--primary-gold)]">
                                                                    STEP {index + 1}
                                                                </span>
                                                            </div>
                                                            <p className={`text-sm ${isCompleted ? 'line-through text-[var(--text-soft)]' : 'text-[var(--text-main)]'}`}>
                                                                {step.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {section.id === 'legal_structure' && section.expandedContent && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h4 className="font-bold text-lg text-[var(--text-main)] mb-4">
                                                {section.expandedContent.title}
                                            </h4>
                                            {section.expandedContent.structures.map((structure, idx) => (
                                                <div key={idx} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-[var(--border-color)]">
                                                    <h5 className="font-semibold text-[var(--text-main)] mb-2">{structure.name}</h5>
                                                    <p className="text-sm text-[var(--text-soft)] mb-3">{structure.description}</p>
                                                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                                                        <div>
                                                            <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">PROS:</p>
                                                            <ul className="text-xs text-[var(--text-soft)] space-y-1">
                                                                {structure.pros.map((pro, i) => (
                                                                    <li key={i} className="flex items-start gap-2">
                                                                        <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                                        <span>{pro}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">CONS:</p>
                                                            <ul className="text-xs text-[var(--text-soft)] space-y-1">
                                                                {structure.cons.map((con, i) => (
                                                                    <li key={i} className="flex items-start gap-2">
                                                                        <Circle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
                                                                        <span>{con}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                                                        <p className="text-xs font-semibold text-blue-800 dark:text-blue-200">
                                                            Best For: <span className="font-normal">{structure.bestFor}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Partner Link */}
                                    {section.hasPartnerLink && (
                                        <Link
                                            to={createPageUrl('Partners')}
                                            className="block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <Handshake className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-[var(--text-main)] font-medium mb-1">{section.partnerLinkText}</p>
                                                    <p className="text-xs text-green-700 dark:text-green-300 font-semibold flex items-center gap-1">
                                                        View Our Partners <ArrowRight className="w-3 h-3" />
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="card p-6 mt-8 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white">
                <h3 className="text-xl font-bold mb-2">Ready for Your 90-Day Journey?</h3>
                <p className="mb-4 opacity-90">
                    Once you have completed these foundational steps, you will be fully prepared to dive into your personalized 90-day roadmap.
                </p>
                <Link to={createPageUrl('Journey')} className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View My 90-Day Journey
                </Link>
            </div>

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={aiModalOpen}
                onClose={() => setAiModalOpen(false)}
                assistantType={aiAssistantType}
                sectionTitle={aiContext.sectionTitle}
                userNotes={aiContext.userNotes || []}
            />

            {saving && (
                <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-gold)]" />
                    <span className="text-sm text-[var(--text-main)]">Saving...</span>
                </div>
            )}
        </div>
    );
}