
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, ArrowLeft, CheckCircle, Clock, Target, Save, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";

const guideContent = {
  "starting-first-business": {
    title: "Starting Your First Business",
    readTime: "15 min read",
    category: "Foundation",
    overview: "Starting your first business is both exciting and overwhelming. This comprehensive guide walks you through every critical step—from validating your idea to choosing the right legal structure and launching successfully. You'll learn how to avoid common pitfalls, make informed decisions, and build a solid foundation for long-term success. Whether you're transitioning from employment or launching a side hustle, this guide gives you the roadmap to start strong.",
    whyItHelps: "A structured approach to starting your business saves you time, money, and stress. It helps you avoid costly mistakes like choosing the wrong business structure, skipping market validation, or underestimating startup costs. Following a proven process increases your chances of success dramatically—businesses with proper planning are 70% more likely to survive their first five years.",
    deepDive: "Most first-time entrepreneurs make the same mistakes: falling in love with their idea without validating it, spending months perfecting a product nobody wants, or rushing into expensive commitments before understanding their market. The key is to start lean, test assumptions quickly, and iterate based on real feedback. This guide combines the Lean Startup methodology with traditional business planning wisdom, giving you the best of both worlds: speed and structure.",
    actionSteps: [
      "**Validate Your Business Idea:** Before investing time and money, ensure there's real demand. Talk to 20-30 potential customers. Ask: 'What's your biggest challenge with [problem you solve]?' and 'Would you pay for a solution?' Look for patterns in their responses. Use tools like Google Trends to see if search interest is growing. Check competitors—competition validates demand.",
      "**Define Your Target Customer:** Get specific about who you're serving. Create a customer avatar: demographics (age, income, location), psychographics (values, fears, desires), and behaviors (where they hang out online, what they read). The more specific you are, the easier marketing becomes. Example: Instead of 'small business owners,' target 'solo female coaches making $50-100K who struggle with tech.'",
      "**Choose Your Business Model:** Decide how you'll make money: Service-based (consulting, freelancing), Product-based (physical goods, digital products), Subscription (recurring revenue), Marketplace (connecting buyers and sellers). Each model has different startup costs, time requirements, and scalability potential. Choose based on your skills, resources, and goals.",
      "**Calculate Startup Costs:** List every expense you'll need to launch: Business registration ($50-500), Website and hosting ($20-100/month), Initial inventory or equipment, Marketing budget, Software tools, Professional fees (lawyer, accountant). Add 20% buffer for unexpected costs. Knowing your numbers prevents surprises and helps you decide if you need funding.",
      "**Select Your Legal Structure:** Choose between Sole Proprietorship (simplest, no liability protection), LLC (protects personal assets, flexible taxes), S-Corp (tax benefits if profitable), or C-Corp (for raising venture capital). For most first businesses, start with an LLC for liability protection. File in your home state unless you have specific reasons to incorporate elsewhere. Cost: $50-500 depending on state.",
      "**Register Your Business:** File the necessary paperwork with your state. Steps: Choose and register a business name (check availability at your Secretary of State website), File formation documents (Articles of Organization for LLC), Get an EIN from the IRS (free, takes 5 minutes online), Open a business bank account (keep finances separate), Apply for any necessary licenses or permits for your industry.",
      "**Set Up Basic Systems:** Implement essential tools before launch: Accounting software (QuickBooks, Wave, or FreshBooks) to track income/expenses, Invoice and payment system (Stripe, PayPal, or Square), Basic website (even a simple landing page), Email marketing tool (Mailchimp, ConvertKit), Project management system (Trello, Asana). These foundational systems save headaches later.",
      "**Create Your MVP (Minimum Viable Product):** Don't aim for perfection—launch with the simplest version of your offer that solves the core problem. For services: Define your basic package and pricing. For products: Create a prototype or first batch. For digital products: Build version 1.0 with core features only. Get it in customers' hands quickly to learn and improve.",
      "**Develop Your Launch Plan:** Map out your go-to-market strategy: Who are your first 10 customers? (Think warm contacts, referrals, niche communities), How will you reach them? (Email, social media, networking, partnerships), What's your launch offer? (Consider a special launch price or bonus), When will you launch? (Set a firm date and work backward). Don't wait for perfect conditions—launch and learn.",
      "**Launch and Learn:** Go live and track everything: Which marketing channels bring customers? What objections do people raise? What features do they love vs. ignore? What's your actual cost to acquire a customer? Use this data to iterate quickly. Your first version won't be your best version—that's okay. The goal is to start the learning cycle."
    ],
    practicalTips: [
      "Start part-time if possible—validate your business while keeping income stability",
      "Join entrepreneur communities for support and advice (online forums, local meetups)",
      "Keep a 'lessons learned' document to capture insights as you go",
      "Set up a simple bookkeeping system from day one—mixing personal and business finances is a nightmare",
      "Consider a business coach or mentor who's been through the startup journey"
    ],
    commonMistakes: [
      "Spending months planning without talking to potential customers",
      "Overbuilding your first version instead of launching an MVP",
      "Underestimating how long it takes to get your first customers",
      "Not setting aside money for taxes (plan for 25-30% of profit)",
      "Trying to do everything yourself instead of delegating or outsourcing strategically"
    ]
  },

  "marketing-sales-funnel": {
    title: "Building a Marketing & Sales Funnel",
    readTime: "12 min read",
    category: "Marketing",
    overview: "A marketing and sales funnel is the systematic process that turns strangers into customers. It guides prospects through awareness, consideration, and decision stages with strategic touchpoints at each phase. Instead of hoping people randomly buy from you, a funnel creates a predictable path from discovery to purchase. Businesses with documented funnels grow 3x faster than those without because they can optimize each step based on data.",
    whyItHelps: "Funnels automate customer acquisition, allowing you to consistently generate leads and sales even while you sleep. They help you understand where prospects drop off (so you can fix it), identify your most effective marketing channels, and scale what works. A well-built funnel can convert 15-30% of leads into paying customers compared to 1-3% without a structured approach.",
    deepDive: "The traditional sales funnel has four stages: Awareness (they discover you exist), Interest (they learn more about you), Decision (they evaluate options), and Action (they buy). Modern funnels add a fifth stage: Retention (turning customers into repeat buyers and advocates). Each stage requires different marketing strategies and content. The mistake most businesses make is only focusing on the top of the funnel (traffic) without nurturing leads through the entire journey. This leads to high traffic but low conversions.",
    actionSteps: [
      "**Map Your Customer Journey:** Document every touchpoint from discovery to purchase. Start by interviewing 5-10 existing customers: How did they first hear about you? What convinced them to buy? How long did they research before deciding? What almost made them choose a competitor? This reveals your current funnel and where to improve.",
      "**Define Your Funnel Stages:** Customize the funnel to your business. Example for B2B services: Awareness (blog post, social media), Interest (free guide download), Consideration (email nurture sequence), Decision (consultation call), Purchase (sign contract). B2C e-commerce: Awareness (social ad), Interest (visit product page), Consideration (add to cart), Decision (checkout), Purchase (complete order).",
      "**Create Top-of-Funnel Content (Awareness):** Attract your ideal customers with valuable content: Blog posts answering their questions, YouTube videos teaching relevant skills, Social media posts sharing tips and insights, Podcast appearances or guest posts, SEO-optimized content ranking for their search terms. Goal: Get discovered by the right people.",
      "**Develop a Lead Magnet (Interest):** Offer something valuable in exchange for their email: Downloadable guide, checklist, or template, Free mini-course or video training, Quiz or assessment with personalized results, Exclusive discount or early access, Resource library or toolkit. Make it highly relevant to your paid offer—this qualifies leads.",
      "**Build an Email Nurture Sequence (Consideration):** After they download your lead magnet, send a series of 5-7 emails over 2 weeks: Email 1: Deliver the lead magnet immediately, Email 2: Share your story and build connection, Email 3: Teach something valuable related to your offer, Email 4: Address common objections with social proof, Email 5: Make a soft offer with case study, Email 6-7: Create urgency with time-limited bonuses.",
      "**Create a Strong Offer (Decision):** Make it easy to say yes: Clear value proposition (what they get and why it matters), Transparent pricing (no hidden fees), Risk reversal (guarantee, free trial, or money-back), Social proof (testimonials, case studies, number of customers), Clear call-to-action (one button, one next step). Remove friction from the buying process.",
      "**Implement Retargeting Ads:** Bring back people who visited but didn't buy: Install Facebook Pixel and Google Ads tracking on your site, Create retargeting campaigns showing ads to website visitors, Segment audiences by behavior (viewed pricing vs. just homepage), Offer special incentives to bring them back (limited-time discount, free consultation). People typically need 7-12 touchpoints before buying.",
      "**Set Up Abandoned Cart Recovery:** For e-commerce, recover 20-30% of abandoned purchases: Send automated email 1 hour after cart abandonment, Remind them what they left behind with product images, Address common objections (free shipping, easy returns, payment plans), Offer a small incentive if needed (5-10% discount, free shipping), Create urgency (limited stock, expiring discount).",
      "**Optimize with Analytics:** Track these key funnel metrics: Traffic sources (where visitors come from), Conversion rates at each stage (% moving to next step), Cost per lead and cost per customer, Time from lead to customer, Drop-off points (where people leave the funnel). Use Google Analytics, your CRM, or funnel software like ClickFunnels or Kartra to monitor performance.",
      "**Test and Improve Continuously:** Run A/B tests on: Email subject lines, Landing page headlines and copy, Call-to-action button text and color, Lead magnet titles and formats, Pricing presentation, Offer bonuses and guarantees. Small improvements compound—a 10% improvement at each funnel stage can double your revenue."
    ],
    practicalTips: [
      "Start simple with one main funnel, then add complexity as you master it",
      "Use funnel builder software (ClickFunnels, Kartra, or Leadpages) to save time",
      "Study successful funnels in your industry—sign up for competitors' lists to see their process",
      "Segment your email list based on behavior (opened vs. didn't open, clicked vs. didn't click)",
      "Don't neglect the post-purchase experience—turn customers into repeat buyers and referrers"
    ],
    commonMistakes: [
      "Sending traffic to your homepage instead of dedicated landing pages",
      "Not having a clear next step at each funnel stage",
      "Asking for too much information too soon (keep forms short)",
      "Neglecting email follow-up after someone shows interest",
      "Not tracking funnel performance—you can't improve what you don't measure"
    ]
  },

  "financial-planning": {
    title: "Essential Financial Planning for Entrepreneurs",
    readTime: "14 min read",
    category: "Finance",
    overview: "Financial planning is the backbone of a sustainable business. It's not just about tracking income and expenses—it's about understanding your numbers deeply enough to make strategic decisions. Proper financial planning helps you price profitably, manage cash flow, plan for growth, and avoid the cash crunches that kill businesses. This guide covers budgeting, forecasting, pricing strategy, funding options, and the financial metrics every entrepreneur must track.",
    whyItHelps: "Entrepreneurs with strong financial literacy make better decisions, negotiate better deals, and sleep better at night. You'll know if you can afford to hire, when to invest in marketing, and how much profit you're actually keeping. Financial clarity removes anxiety and replaces it with confidence. Plus, if you ever seek funding or want to sell your business, solid financials are non-negotiable.",
    deepDive: "Most entrepreneurs avoid finances because they seem complicated or boring. But financial planning doesn't have to be complex—it's about understanding a few key numbers and checking them regularly. The businesses that fail aren't necessarily bad businesses; they're often businesses that ran out of cash because they didn't manage their finances proactively. Whether you love numbers or hate them, mastering these basics gives you control over your business's destiny.",
    actionSteps: [
      "**Create a Comprehensive Budget:** List all fixed costs (rent, software, insurance, loans) and variable costs (materials, shipping, ads, contractors). Estimate monthly totals. Add your desired salary. This is your 'break-even' point—the minimum revenue needed to cover everything. Review monthly and adjust as reality changes. Use a simple spreadsheet or tools like QuickBooks or Wave.",
      "**Implement Profit First System:** Instead of Sales - Expenses = Profit, use Sales - Profit = Expenses. When money comes in, immediately allocate percentages to: Profit (5-10%), Owner's Pay (30-50%), Taxes (15-20%), Operating Expenses (30-45%). Use separate bank accounts for each category. This ensures you pay yourself and save for taxes before spending on expenses.",
      "**Master Your Pricing Strategy:** Calculate your true costs: Time spent (value your hours), Materials or cost of goods sold, Overhead (proportional share of fixed costs), Taxes (25-30% of profit), Desired profit margin (20-40% minimum). Then add markup. Don't compete on price—compete on value. If customers say you're expensive, they're not your customers. Raise prices 10-20% annually.",
      "**Build a 90-Day Cash Flow Forecast:** Create a spreadsheet with columns for each week. List expected money in (invoices, sales) and money out (bills, payroll, expenses). This reveals when you'll have surplus or shortage. Update weekly. If you see a cash crunch coming, you can: Delay non-urgent purchases, Accelerate customer payments, Secure a line of credit before you need it, Cut non-essential expenses.",
      "**Track Key Financial Metrics Weekly:** Monitor these numbers religiously: Revenue (total sales), Gross Profit Margin ((Revenue - COGS) / Revenue), Net Profit Margin (Net Income / Revenue), Cash Balance (available cash today), Accounts Receivable Aging (who owes you and for how long), Burn Rate (if spending more than earning, how fast are you losing cash?). These tell you the health of your business at a glance.",
      "**Separate Personal and Business Finances:** Open a business bank account and credit card immediately. Never mix personal and business transactions—this makes accounting nightmarish and can pierce your LLC protection. Pay yourself a consistent 'salary' from the business account to your personal account. This creates clean books and makes taxes much simpler.",
      "**Plan for Taxes Proactively:** Set aside 25-30% of every dollar that comes in for taxes. Put it in a separate savings account and don't touch it. Pay estimated taxes quarterly to avoid penalties. Work with a CPA or use software like QuickBooks Self-Employed to track deductible expenses: Home office, Vehicle mileage, Software and tools, Business meals and travel, Professional development. Good tax planning saves thousands.",
      "**Understand Your Funding Options:** If you need capital to start or grow: Bootstrapping (use personal savings, start lean, grow on revenue), Friends & Family (informal loans or investments), Small Business Loans (SBA loans, bank loans—requires good credit and collateral), Lines of Credit (flexible borrowing for cash flow gaps), Angel Investors or Venture Capital (for high-growth startups), Crowdfunding (Kickstarter, Indiegogo for product businesses). Choose based on your business model and growth goals.",
      "**Build an Emergency Fund:** Aim for 3-6 months of operating expenses in a separate savings account. This protects you from: Seasonal downturns, Lost major client, Unexpected expense (equipment failure, legal issue), Economic recession. Start by saving 5-10% of monthly revenue until you hit this target. It takes time but buys invaluable peace of mind.",
      "**Review Finances Monthly:** Block 1-2 hours monthly to review your financials: Compare actual vs. budgeted numbers, Identify trends (revenue up or down? Expenses creeping up?), Celebrate wins (profitable months, hitting targets), Address problems (unpaid invoices, overspending categories), Adjust next month's plan based on learnings. Consistent review keeps you in control and catches issues early."
    ],
    practicalTips: [
      "Use accounting software from day one—manual spreadsheets get messy fast",
      "Hire a bookkeeper or CPA even if part-time—their expertise pays for itself",
      "Benchmark your numbers against industry standards to know if you're on track",
      "Automate bill payments and invoicing to reduce mental load and late fees",
      "Keep digital copies of all receipts and financial documents (apps like Expensify help)"
    ],
    commonMistakes: [
      "Not paying yourself consistently—you're not a charity, build salary into your budget",
      "Underpricing services or products—charge what you're worth, not what you think people will pay",
      "Ignoring taxes until year-end—quarterly planning prevents nasty surprises",
      "Growing too fast without cash to support it (more revenue often means more expenses)",
      "Not knowing your real profit margin—revenue isn't profit"
    ]
  },

  "brand-identity": {
    title: "Creating a Powerful Brand Identity",
    readTime: "10 min read",
    category: "Branding",
    overview: "Your brand identity is more than just a logo—it's the complete personality and visual representation of your business. A strong brand identity makes you memorable, builds trust, differentiates you from competitors, and creates emotional connections with customers. This guide covers defining your brand values, voice, visual elements, and messaging frameworks that resonate with your target audience and position you for premium pricing.",
    whyItHelps: "Businesses with strong brand identities command higher prices, attract better customers, and build loyal followings. People don't just buy products—they buy brands they connect with emotionally. A consistent brand identity increases revenue by up to 23% and makes all your marketing more effective because everything reinforces the same message and feeling.",
    deepDive: "Brand identity isn't about being the loudest—it's about being clear, consistent, and authentic. Think of brands like Apple (innovation, simplicity), Nike (empowerment, achievement), or Patagonia (sustainability, adventure). Their brand isn't just what they say—it's woven into every customer interaction, from packaging to customer service. Small businesses can create equally powerful brands by being intentional about who they are and consistently expressing it.",
    actionSteps: [
      "**Define Your Brand Foundation:** Answer these core questions: What problem do we solve? (Your purpose), What do we believe? (Your values—list 3-5 core principles), Who are we for? (Your ideal customer), What makes us different? (Your unique positioning). Write these down—they guide every branding decision. Example values: Transparency, Excellence, Innovation, Community, Sustainability.",
      "**Develop Your Brand Voice:** Decide how your brand speaks. Is your voice: Professional or Casual? Serious or Playful? Formal or Conversational? Authoritative or Approachable? Choose 3-5 adjectives that describe your brand personality (e.g., 'bold, transparent, empowering'). Write sample social posts and website copy in this voice to test it. Consistency across all channels builds recognition.",
      "**Create Your Visual Identity System:** Design your core visual elements: Logo (primary and simplified versions), Color Palette (2-3 primary colors, 2-3 accent colors—research color psychology), Typography (1-2 fonts for headlines, 1 for body text), Visual Style (photography style, illustration approach, graphic elements). Use tools like Canva, Figma, or hire a designer on Fiverr/99designs. Consistency is more important than perfection.",
      "**Write Your Brand Story:** Craft a compelling narrative: The problem you saw in the world, Your personal journey or 'origin story', The moment you decided to solve this problem, How you're different from existing solutions, The transformation you provide customers, Where you're headed (vision for the future). This story humanizes your brand and gives people something to connect with emotionally.",
      "**Define Your Brand Messaging Framework:** Create templates for consistency: Tagline (7 words or less capturing your essence), Value Proposition (one sentence: we help [audience] achieve [outcome] through [unique approach]), Elevator Pitch (30 seconds explaining what you do and why it matters), Key Messages (3-5 main points you want people to remember). Use these frameworks in all marketing materials.",
      "**Design Brand Touchpoints:** Apply your brand identity everywhere customers interact with you: Website (colors, fonts, imagery, tone), Social Media (profile images, post templates, captions), Email (signature, templates, newsletters), Packaging (if physical products—unboxing experience matters), Business Cards and Marketing Materials, Customer Service (scripts, tone, problem-solving approach). Every touchpoint reinforces (or weakens) your brand.",
      "**Create a Brand Style Guide:** Document your brand standards in a simple guide: Logo usage rules (minimum sizes, spacing, what NOT to do), Color codes (hex, RGB, CMYK values), Font specifications (sizes, weights, when to use each), Image style examples, Voice and tone guidelines, Sample copy in your brand voice. This ensures consistency as you grow and bring on team members.",
      "**Audit Competitor Brands:** Study 5-10 competitors: What colors do they use? (Choose different ones to stand out), What voice/tone? (Identify gaps you can fill), What do they emphasize? (Find different angles), What do customers complain about? (Position against their weaknesses). Differentiation is key—don't blend in, stand out strategically.",
      "**Test Your Brand with Real Customers:** Show your brand identity to 10-20 people in your target audience: Does this brand feel trustworthy? What emotions does it evoke? What type of business do you think this is? Would you expect premium or budget pricing? Collect honest feedback and refine based on patterns. Your brand should attract your ideal customers and repel wrong-fit customers.",
      "**Launch and Stay Consistent:** Roll out your new brand across all channels simultaneously. Commit to consistency for at least 6-12 months before changing anything—brands need time to build recognition. Track brand awareness by asking new customers how they heard about you and what attracted them. Refine messaging based on what resonates, but keep core identity stable."
    ],
    practicalTips: [
      "Study brands you admire outside your industry—inspiration comes from unexpected places",
      "Use mood boards (Pinterest, Milanote) to visualize your brand before designing",
      "Invest in professional photography or high-quality stock photos that match your brand",
      "Create social media templates in Canva to maintain visual consistency effortlessly",
      "Your brand should reflect who your customers want to become, not just who you are"
    ],
    commonMistakes: [
      "Copying competitors instead of finding your unique positioning",
      "Changing brand elements frequently—consistency builds recognition",
      "Creating a brand you love instead of one your target customers love",
      "Focusing only on visuals without defining voice, values, and messaging",
      "Making your brand too complex—simple, clear brands win"
    ]
  },

  "productivity-masterclass": {
    title: "Productivity Masterclass for Business Owners",
    readTime: "13 min read",
    category: "Productivity",
    overview: "Productivity isn't about working more hours—it's about maximizing the value of the hours you work. This masterclass covers advanced time management techniques, energy optimization strategies, and proven productivity systems used by top-performing entrepreneurs. You'll learn to eliminate distractions, focus on high-leverage activities, and build systems that multiply your output without burning out.",
    whyItHelps: "Highly productive entrepreneurs accomplish in 4 hours what average entrepreneurs struggle to do in 40. Mastering productivity means you can grow your business faster, maintain work-life balance, and avoid the burnout that kills so many ventures. The most successful business owners aren't the hardest workers—they're the smartest about where they invest their time and energy.",
    deepDive: "Traditional productivity advice (work harder, hustle more, sleep less) leads to burnout and diminishing returns. Modern productivity science shows that energy management beats time management, strategic focus beats busy work, and systems beat willpower. The goal isn't to fill every minute with work—it's to identify the 20% of activities that generate 80% of results and ruthlessly protect time for those activities.",
    actionSteps: [
      "**Master the 80/20 Rule (Pareto Principle):** Identify which 20% of your activities generate 80% of your results. Track your time for one week—note every task and its outcome. Analyze: Which tasks directly generated revenue? Which built long-term assets? Which were just busy work? Double down on the high-impact 20% and eliminate, automate, or delegate the rest. This single principle can double your results.",
      "**Implement Time Blocking:** Divide your day into dedicated blocks for specific work types: Deep Work Blocks (2-4 hours for strategic, creative work—no meetings, no distractions), Admin Blocks (email, scheduling, small tasks—batched together), Meeting Blocks (all calls/meetings in one or two chunks), Strategic Thinking (weekly block for planning and reflection). Protect deep work time like your most important meeting—because it is.",
      "**Use the Eisenhower Matrix Daily:** Categorize every task: Urgent + Important (do immediately—true emergencies), Not Urgent + Important (schedule these—they're your growth activities), Urgent + Not Important (delegate or minimize—other people's priorities), Not Urgent + Not Important (eliminate—time wasters). Most people spend too much time on urgent but not important tasks. Shift to not urgent but important activities.",
      "**Optimize Your Peak Performance Times:** Track your energy levels hourly for two weeks. Identify: When are you most creative? (morning, afternoon, evening?), When do you hit energy slumps?, When are you best at analytical work vs. creative work? Schedule your hardest, most important work during peak energy times. Save routine tasks (email, admin) for low-energy periods. Working with your natural rhythms 10x's productivity.",
      "**Eliminate Decision Fatigue:** Reduce daily decisions through automation and routines: Morning routine (same activities, same order), Work 'uniform' (reduce clothing decisions), Meal planning (batch cook, same healthy meals), Default calendar (same time blocks every week), Templated responses (email, messages). Every decision costs mental energy—save it for what matters.",
      "**Master Single-Tasking (Deep Work):** Multitasking is a myth—context switching costs 20-40 minutes of productivity each time. Practice focused single-tasking: Turn off all notifications (phone, computer, everything), Use website blockers during deep work (Freedom, Cold Turkey), Work in 90-minute sprints with 15-minute breaks, Tell people when you're unavailable (set boundaries), Put phone in another room. One hour of deep work beats four hours of distracted work.",
      "**Implement Getting Things Done (GTD) System:** Capture everything out of your head: Inbox (collect all tasks, ideas, requests in one place), Clarify (decide: is it actionable? If yes, what's the next action?), Organize (put in appropriate list: next actions, waiting for, someday/maybe), Review (weekly review of all lists and projects), Engage (work from next actions list based on context and energy). This system frees mental RAM for creative work.",
      "**Use the Two-Minute Rule:** If a task takes less than two minutes, do it immediately instead of adding it to your list. This prevents small tasks from piling up and becoming overwhelming. For tasks over two minutes, use the rule in reverse: before starting, ask 'Is this the best use of my time right now?' If no, defer or delegate.",
      "**Build a 'Stop Doing' List:** Identify activities that waste time without producing results: Pointless meetings (could be an email), Social media scrolling (unless strategic), Perfectionism on low-stakes tasks, Saying yes to requests that don't align with goals, Constantly checking email (batch instead). Say no to the good so you can say yes to the great. Subtraction is often more powerful than addition.",
      "**Conduct Weekly Reviews:** Every Friday or Sunday, spend 60-90 minutes reviewing: What worked well this week?, What didn't work?, Did I make progress on my top 3 goals?, What are my top 3 priorities for next week?, What can I eliminate, automate, or delegate?, How do I feel about my work-life balance? This reflection prevents you from being busy without being productive and keeps you aligned with long-term goals."
    ],
    practicalTips: [
      "Use the Pomodoro Technique (25 min work, 5 min break) when struggling to focus",
      "Track your time with apps like Toggl or RescueTime to see where hours actually go",
      "Create 'office hours' for calls and questions instead of allowing constant interruptions",
      "Use tools like Calendly to eliminate back-and-forth scheduling",
      "Take real breaks—walking, stretching, or meditating—screens don't count as breaks"
    ],
    commonMistakes: [
      "Trying to be productive 12+ hours a day—unsustainable and ineffective",
      "Not protecting deep work time—allowing meetings and interruptions to fragment your day",
      "Working on urgent tasks all day while neglecting important strategic work",
      "Using busyness as a badge of honor instead of focusing on results",
      "Not building systems—relying on willpower and motivation which are finite resources"
    ]
  },

  "hiring-first-team": {
    title: "Hiring Your First Team Member",
    readTime: "11 min read",
    category: "Team Building",
    overview: "Hiring your first employee or contractor is a major milestone and a significant risk. Getting it right accelerates your business; getting it wrong costs time, money, and stress. This guide walks you through identifying what to hire for, writing job descriptions, interviewing effectively, onboarding properly, and managing successfully. You'll learn to avoid common hiring mistakes and build a strong foundation for team growth.",
    whyItHelps: "The right first hire can free you to focus on high-value activities, bring skills you lack, and allow your business to scale beyond what you alone can accomplish. However, a bad hire can cost 2-3x their salary in lost time, fixing mistakes, and opportunity cost. Learning to hire well is one of the most valuable skills for business growth.",
    deepDive: "Most entrepreneurs wait too long to hire because they think 'I can't afford it' when they should be thinking 'I can't afford NOT to.' If you're spending time on $20/hour tasks while neglecting $200/hour tasks, you're losing money. The key is hiring for your weaknesses or time-consuming tasks first, starting with contractors before full-time employees, and building a hiring system that attracts A-players even as a small business.",
    actionSteps: [
      "**Identify What to Hire For First:** Don't hire randomly—hire strategically. Audit your time for two weeks and categorize every task: Strategic (only you can do—strategy, sales, vision), Important but Delegable (someone else could do with training), Draining Your Energy (tasks you hate that sap your motivation), Low-Skill Repetitive (admin, data entry, scheduling). Your first hire should handle the largest bucket of Important but Delegable or Draining work. Common first hires: Virtual Assistant, Customer Service, Bookkeeper, Content Creator, Marketing Assistant.",
      "**Choose Between Employee vs. Contractor:** Understand the differences: Contractors (1099): Flexible, no benefits required, project-based, you control outcomes not how work is done, less expensive to test. Employees (W2): More control, consistent availability, benefits required, higher commitment both ways, better for core roles. Start with contractors to test fit before committing to full-time employment. Use platforms like Upwork, Fiverr, or Onlinejobs.ph.",
      "**Write a Clear Job Description:** Define the role precisely: Job Title (be specific: 'Social Media Manager' not 'Marketing Helper'), Key Responsibilities (5-7 main tasks they'll own), Required Skills vs. Nice-to-Have Skills (be realistic—you're not hiring VP-level talent for entry-level pay), Time Commitment (hours per week, schedule expectations), Compensation Range (be transparent to attract serious candidates). Good job descriptions attract quality candidates and repel wrong fits.",
      "**Create a Skills Assessment:** Don't just interview—test their actual skills. Examples: Writer: Give a sample topic and deadline, Designer: Request a mock project, VA: Give a sample task like 'research 10 vendors for X', Developer: Code challenge or review their GitHub. Paid test projects (2-4 hours) weed out those who talk well but can't deliver. This is the #1 way to avoid hiring mistakes.",
      "**Interview with Behavioral Questions:** Past behavior predicts future behavior. Ask questions like: 'Tell me about a time you had to learn something completely new for work. How did you approach it?' (tests adaptability), 'Describe a situation where you missed a deadline. What happened and what did you learn?' (tests accountability), 'Give an example of how you handled a difficult client or situation' (tests problem-solving), 'What's the most challenging project you've completed? Walk me through your process' (tests capability). Listen for specific examples, not generalities.",
      "**Check References Thoroughly:** Don't skip this step. Call 2-3 past clients or employers and ask: How did they perform compared to expectations?, What were their strengths and weaknesses?, Would you hire them again? Why or why not?, How did they handle feedback or criticism?, Any advice for managing them effectively? Reference checks reveal red flags you won't see in interviews. If someone can't provide references, that's a red flag.",
      "**Create an Onboarding System:** Set your hire up for success from day one: Welcome Package (company info, team intro, tools access, expectations), Training Materials (SOPs, video tutorials, example work), 30-60-90 Day Goals (clear expectations for first three months), Weekly Check-ins (scheduled time for questions and feedback), Communication Norms (how/when to communicate, what tools to use). Poor onboarding is the #1 reason new hires fail. Invest time upfront to save problems later.",
      "**Start with a Trial Period:** Hire for 30-90 days before committing long-term. Clearly communicate: This is a trial period to ensure mutual fit, Here are the specific goals to hit in this period, We'll evaluate at 30/60/90 days, Either party can end the relationship if it's not working. This reduces risk and pressure for both parties. High performers appreciate the clarity and accountability.",
      "**Implement Clear Communication Systems:** Set expectations early: Communication Tools (Slack, email, project management software), Response Time Expectations (within 24 hours for email, etc.), Meeting Cadence (weekly 1-on-1s, monthly reviews), How to Report Issues (don't let problems fester), Feedback Loop (both ways—you give feedback, but also ask for their input). Remote teams especially need overcommunication and clear systems.",
      "**Give Feedback Early and Often:** Don't wait for quarterly reviews—give feedback continuously: Positive Feedback (catch them doing things right, be specific), Constructive Feedback (address issues immediately while they're small), Ask for Their Feedback (how can you be a better manager?), Focus on Behavior and Outcomes (not personality), Frame as Growth Opportunities (we're all learning). Great team members want feedback to improve—if someone gets defensive, that's a warning sign."
    ],
    practicalTips: [
      "Start with part-time or project-based before full-time to reduce risk",
      "Hire slow, fire fast—a bad fit drains everyone, including the person",
      "Document everything in SOPs (Standard Operating Procedures) as you go—makes training easier",
      "Pay fairly but not top-of-market for your first hire—you're offering growth opportunity",
      "Join entrepreneur communities to get referrals—referred candidates are often better fits"
    ],
    commonMistakes: [
      "Hiring someone just like you instead of for your weaknesses",
      "Skipping the skills test and hiring based on interview performance alone",
      "Not being clear about expectations—leads to frustration on both sides",
      "Micromanaging instead of focusing on outcomes",
      "Keeping a bad hire too long out of guilt or hope they'll improve"
    ]
  },

  "scaling-strategies": {
    title: "Scaling Strategies for Growth",
    readTime: "16 min read",
    category: "Growth",
    overview: "Scaling isn't just about working harder or doing more of what you're already doing—it's about systematically growing revenue while maintaining or improving profit margins. This advanced guide covers strategies for expanding operations, entering new markets, building scalable systems, and growing your team without losing quality or culture. You'll learn when to scale, how to scale sustainably, and how to avoid the common traps that cause rapid growth to destroy businesses.",
    whyItHelps: "Businesses that scale strategically can 10x revenue while maintaining healthy margins and work-life balance. However, businesses that scale too quickly or without proper systems often implode—cash flow problems, quality issues, team burnout, and culture breakdown are common. Understanding the right growth strategies and timing is what separates businesses that plateau at $100K from those that reach $1M, $10M, and beyond.",
    deepDive: "There's a crucial difference between growth and scale. Growth is adding revenue linearly (hire one person = 20% more revenue). Scale is adding revenue exponentially (build a system once = 200% more revenue without proportional cost increase). Scalable businesses leverage technology, systems, processes, and people to multiply output without multiplying effort. This requires shifting from 'doer' to 'architect'—building the machine instead of being in the machine.",
    actionSteps: [
      "**Audit Your Scalability Readiness:** Before scaling, ensure your foundation is solid. Assess: Profit Margins (are you profitable? Scaling losses just creates bigger losses), Systems and Processes (are key operations documented and repeatable?), Cash Flow (do you have 6-12 months runway?), Team Capability (can your team handle 2x the work?), Product-Market Fit (do customers love what you sell?). If any of these is weak, fix it before scaling. Scaling too early is one of the top reasons businesses fail.",
      "**Identify Your Growth Levers:** Not all growth strategies are equal. Identify which levers have the highest ROI: Increase Average Transaction Value (upsells, bundles, premium tiers), Increase Purchase Frequency (subscriptions, repeat purchases, loyalty programs), Increase Number of Customers (marketing, sales, partnerships), Expand into New Markets (geographic, demographic, or product expansion), Strategic Partnerships (distribution deals, co-marketing). Focus on 1-2 levers at a time—trying everything dilutes impact.",
      "**Systematize Core Operations:** Document and systematize before scaling: Create SOPs (Standard Operating Procedures) for every repeating task, Build checklists and templates for consistency, Implement project management systems (Asana, ClickUp, Monday.com), Use automation tools (Zapier, Make) to eliminate manual work, Record video training for common processes. Systems allow you to scale without quality suffering. If you can't explain how to do something in writing, you can't scale it.",
      "**Build a Scalable Sales System:** Move from founder-led sales to a repeatable process: Document your sales process (lead gen → qualification → demo → close), Create sales collateral (decks, case studies, pricing sheets), Build a CRM to track and manage leads (HubSpot, Pipedrive, Salesforce), Develop sales scripts and email sequences, Hire and train sales reps using your documented process. The goal: generate revenue predictably without you personally making every sale.",
      "**Implement Performance Marketing:** Scale customer acquisition with data-driven marketing: Set up tracking (Google Analytics, Facebook Pixel, call tracking), Calculate Customer Lifetime Value (LTV) and Cost to Acquire (CAC), Target a 3:1 LTV:CAC ratio minimum, Test paid channels (Google Ads, Facebook/Instagram, LinkedIn), Double down on channels with best ROI, Build retargeting campaigns for warm traffic. Performance marketing is the fastest way to scale predictably—but only when your funnel converts profitably.",
      "**Expand Your Product/Service Offerings:** Create a value ladder with multiple price points: Entry Offer (low-priced, high-value—builds trust and generates leads), Core Offer (main revenue driver—solves the core problem), Premium Offer (high-ticket, more comprehensive—serves best customers), Continuity Offer (subscription or recurring revenue). This allows you to serve customers at different budgets and maximize lifetime value. Example: Coaching business might offer: ebook ($27), group program ($997), 1-on-1 coaching ($5K), done-for-you service ($25K).",
      "**Build Strategic Partnerships:** Leverage others' audiences and resources: Identify Complementary Businesses (serve same audience, different solution), Create Win-Win Partnerships (affiliate deals, co-marketing, bundled offerings), Joint Ventures (combine resources for a shared project/launch), Distribution Partnerships (get your product into their channels), Speaking and Podcast Appearances (access their audience). One strong partnership can deliver more growth than months of solo marketing.",
      "**Hire Strategically for Scale:** Build a team that multiplies you: Hire for Roles, Not People (document the role before hiring), Start with A-Players in Key Positions (marketing, sales, operations), Use the 70% Rule (hire when at 70% capacity, not 120%—prevents burnout), Implement Strong Onboarding (first 90 days make or break retention), Create Performance Metrics (everyone knows what success looks like). Your team should expand your capacity without expanding your workload proportionally.",
      "**Secure Funding if Needed:** Understand your funding options for rapid growth: Organic Growth (reinvest profits—slower but maintains control), Business Line of Credit (flexible capital for cash flow gaps), Term Loan (larger amounts for specific investments), Angel Investment ($25K-500K—give up 10-25% equity), Venture Capital ($500K+—for rapid growth businesses). Only raise capital if you have a proven model and know exactly how you'll use the money to grow faster. Don't raise money to 'figure it out'—that's a recipe for failure.",
      "**Monitor Key Growth Metrics:** Track these numbers weekly/monthly: Revenue Growth Rate (month-over-month, year-over-year), Gross Profit Margin (revenue minus cost of goods/services), Net Profit Margin (actual profit after all expenses), Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), Cash Runway (months until out of cash), Team Productivity (revenue per employee). These metrics tell you if you're scaling healthily or building a house of cards."
    ],
    practicalTips: [
      "Scale in stages—aim for next revenue milestone, stabilize, then scale again",
      "Maintain cash reserves of 6-12 months operating expenses during growth phases",
      "Don't sacrifice culture for growth—culture breakdown kills businesses",
      "Delegate operational management while you focus on strategy and vision",
      "Study businesses that successfully scaled in your industry—learn from their playbook"
    ],
    commonMistakes: [
      "Scaling before achieving product-market fit—you're just growing problems",
      "Growing revenue without watching profit margins—more revenue doesn't always mean more profit",
      "Hiring too many people too fast—overhead destroys cash flow",
      "Neglecting systems and processes—leads to chaos and quality issues",
      "Losing focus by chasing too many growth opportunities at once"
    ]
  },

  "energy-management": {
    title: "Energy Management Over Time Management",
    readTime: "7 min read",
    category: "Performance",
    overview: "Time management is overrated—energy management is what truly matters. You can have all the time in the world, but if you lack energy, you won't accomplish anything meaningful. This guide teaches you to work with your natural energy rhythms, protect your peak performance windows, and sustainably maximize output without burnout.",
    whyItHelps: "Energy management allows you to accomplish more in 4 focused hours than most people do in 12 distracted hours. It prevents burnout, improves decision-making quality, and creates sustainable high performance. Top performers don't work more hours—they work during their best hours.",
    deepDive: "Your energy fluctuates throughout the day in predictable patterns called ultradian rhythms (90-120 minute cycles). Most people fight their natural rhythms, forcing themselves to work when energy is low and wasting peak hours on low-value tasks. Smart entrepreneurs align their most important work with peak energy times and rest during natural dips.",
    actionSteps: [
      "**Track Your Energy Patterns:** For one week, rate your energy level every hour (1-10 scale). Note when you feel most alert, creative, and focused vs. when you're sluggish and distracted. Look for patterns: Are you sharpest in the morning? Do you hit a slump after lunch? Identify your peak 2-3 hour window.",
      "**Schedule Deep Work During Peak Energy:** Block your highest-energy hours for your most important, cognitively demanding work: strategic thinking, creative projects, complex problem-solving, important writing or content creation. Protect this time fiercely—no meetings, no email, no distractions.",
      "**Handle Admin During Low Energy:** Save routine tasks for when your energy naturally dips: answering emails, scheduling appointments, data entry, filing expenses, social media posting. These tasks don't require peak brain power and keep you productive during low-energy periods.",
      "**Take Strategic Breaks:** Don't power through energy dips—they're natural. Take a 10-15 minute break every 90 minutes: Walk outside (daylight helps reset energy), Do light stretching or movement, Have a healthy snack, Practice 2-minute breathing exercises. Brief breaks restore focus better than pushing through fatigue.",
      "**Optimize Your Sleep:** Energy management starts with quality sleep. Prioritize 7-9 hours nightly: Go to bed and wake up at consistent times (even weekends), Avoid screens 1 hour before bed (blue light disrupts sleep), Keep bedroom cool (65-68°F optimal), Avoid caffeine after 2 PM. Better sleep = better energy = better results.",
      "**Manage Physical Energy:** Your body fuels your brain—treat it accordingly: Eat protein and healthy fats (sustained energy) vs. sugar (energy crashes), Stay hydrated (even mild dehydration reduces cognitive function), Exercise 20-30 minutes daily (boosts energy all day), Limit alcohol (disrupts sleep quality). Physical health directly impacts mental performance.",
      "**Say No to Energy Vampires:** Identify and eliminate activities that drain disproportionate energy: Toxic relationships or negative people, Pointless meetings that could be emails, Decision-heavy tasks done when tired, Multitasking (context switching drains energy fast). Protect your energy like you protect your time.",
      "**Use the 90-Minute Rule:** Work in focused 90-minute blocks aligned with natural ultradian rhythms. After 90 minutes, take a real break (not checking email—that's still work). This rhythm maximizes productivity while preventing burnout. Two 90-minute focused blocks beat eight hours of distracted work."
    ],
    practicalTips: [
      "Use morning hours for your most important work—willpower and focus peak early",
      "Schedule meetings in the afternoon when your energy naturally dips",
      "Track energy patterns for 2 weeks to find your unique optimal times",
      "Coffee strategically—use it to boost already-decent energy, not to fight exhaustion",
      "Stand up or move every 30-45 minutes to maintain blood flow and alertness"
    ],
    commonMistakes: [
      "Filling your best hours with meetings instead of important work",
      "Trying to be equally productive at all hours of the day",
      "Ignoring physical health's impact on mental energy",
      "Pushing through exhaustion instead of taking strategic breaks"
    ]
  },

  "deep-work": {
    title: "Deep Work Principles",
    readTime: "8 min read",
    category: "Productivity",
    overview: "Deep work—focused, uninterrupted time on cognitively demanding tasks—is the superpower of the knowledge economy. Most people are so distracted by shallow work (email, meetings, notifications) that they never enter a state of deep work. This guide teaches you to cultivate deep work as your competitive advantage.",
    whyItHelps: "Deep work allows you to produce higher quality output in less time, learn complex skills faster, and create work that stands out. One hour of deep work can accomplish what would take 4-6 hours of distracted work. Mastering deep work is how top performers dramatically outpace their peers.",
    deepDive: "Cal Newport's research shows deep work is increasingly rare and increasingly valuable. Most professionals spend 60%+ of their day on shallow work—tasks that don't require full cognitive engagement. The ability to quickly master complex information and produce elite-level output is becoming the defining skill of successful knowledge workers. Deep work isn't just about productivity—it's about creating meaningful, excellent work.",
    actionSteps: [
      "**Eliminate All Distractions:** Deep work requires zero interruptions. Before starting: Turn off all notifications (phone, computer, smartwatch), Put phone in another room or drawer (out of sight, out of mind), Close all browser tabs except what you need, Use website blockers (Freedom, Cold Turkey, StayFocusd), Put 'Do Not Disturb' sign if working around others. Your environment must support complete focus.",
      "**Create Deep Work Rituals:** Develop a consistent routine that signals 'deep work time' to your brain: Same location (dedicate a spot for deep work), Same time (your peak energy hours), Same starter ritual (specific tea/coffee, 2-minute meditation, reviewing goals), Same music or silence (whatever helps you focus). Rituals reduce friction and help you enter flow faster.",
      "**Use Time Blocking:** Schedule deep work sessions in advance—don't wait for free time to magically appear: Block 2-4 hour chunks on your calendar, Treat them as non-negotiable appointments, Schedule at least 3-4 deep work sessions per week, Cluster deep work on certain days if possible (full 'deep work days'). What gets scheduled gets done.",
      "**Work in 90-120 Minute Sprints:** Deep work is intense—you can't sustain it all day: Set a timer for 90-120 minutes, Work with complete focus until timer ends, Take a real 15-20 minute break (walk, stretch, snack), Resume for another sprint if energy allows. Most people can handle 2-3 deep work sessions per day maximum.",
      "**Have a Clear Goal:** Deep work requires knowing exactly what you're working on: Define specific output before starting ('Write 1,500 words of proposal' not 'work on proposal'), Break big projects into deep-work-sized chunks, Keep a running list of deep work tasks ready to go, Review your goal briefly before each session. Clarity prevents wasted focus figuring out what to do.",
      "**Build Your Focus Stamina:** Deep work is like a muscle—it strengthens with practice: Start with 30-60 minute sessions if you're new, Gradually increase duration as focus improves, Don't multitask or check phone during sessions (this trains distraction), Meditate 5-10 minutes daily (builds attention control). Expect it to feel uncomfortable at first—that's growth.",
      "**Schedule Shallow Work Separately:** Batch shallow tasks (email, admin, meetings) into dedicated blocks: Check email only 2-3 times per day (specific times), Batch all meetings on certain days or afternoons, Handle admin tasks in low-energy periods, Use templates and automation where possible. Protect deep work time from shallow work encroachment.",
      "**Track and Measure:** Monitor your deep work practice: Log hours spent in deep work weekly, Track what you accomplished in each session, Notice correlation between deep work hours and results, Aim for 15-20 hours of deep work per week. Measurement creates accountability and shows progress."
    ],
    practicalTips: [
      "Use the '20-second rule'—make distractions 20 seconds harder to access (phone in bag, browser blocked)",
      "Tell colleagues/family when you're in deep work mode so they don't interrupt",
      "Use white noise or focus music (Brain.fm, Noisli) to maintain concentration",
      "Start with ONE deep work session per day before scaling up",
      "End each session by noting what to work on next (reduces startup friction next time)"
    ],
    commonMistakes: [
      "Trying to do deep work with notifications still on",
      "Not scheduling deep work—hoping you'll find time later",
      "Attempting deep work during your low-energy hours",
      "Working too long without breaks (leads to diminishing returns)"
    ]
  },

  "habit-stacking": {
    title: "Habit Stacking for Success",
    readTime: "6 min read",
    category: "Habits",
    overview: "Habit stacking is a simple but powerful technique: you build new habits by linking them to existing habits. Instead of relying on motivation, you leverage your brain's automatic behaviors to create new routines. This guide shows you how to stack habits for personal and business success.",
    whyItHelps: "Habit stacking makes new behaviors stick because you're working with your brain's natural wiring, not against it. It eliminates the 'when should I do this?' problem by creating automatic triggers. Small habit stacks compound into major lifestyle and business improvements.",
    deepDive: "Your brain loves patterns and automatically executes established habits without conscious thought. When you link a new desired behavior to an existing habit, the old habit becomes a trigger for the new one. This leverages existing neural pathways instead of trying to build new ones from scratch. James Clear's research shows habit stacking is one of the most effective behavior change strategies.",
    actionSteps: [
      "**Identify Your Existing Habits:** List habits you already do consistently every day: Morning coffee, brushing teeth, checking email, lunch break, commute home, dinner, bedtime routine. These are your anchors—reliable behaviors you can stack onto.",
      "**Choose One New Habit:** Start with ONE new habit to stack (don't try to change everything at once): Make it small (2 minutes or less to start), Make it specific (not 'exercise'—'do 10 push-ups'), Make it valuable (aligned with your goals), Make it achievable (don't stack 'run 5 miles' if you don't run). Success breeds success—start tiny.",
      "**Create Your Habit Stack Formula:** Use this format: 'After [EXISTING HABIT], I will [NEW HABIT].' Examples: After I pour my morning coffee, I will write one page in my gratitude journal. After I sit down at my desk, I will review my top 3 priorities for the day. After I close my laptop for the day, I will do 10 minutes of stretching. The existing habit triggers the new one automatically.",
      "**Make It Obvious:** Reduce friction and create environmental cues: Place items you need for the new habit next to your trigger habit (journal next to coffee maker, yoga mat by desk), Use visual reminders (sticky notes, phone wallpaper), Tell someone your habit stack (accountability), Set a phone reminder for the first week (until automatic). Make the new behavior impossible to forget.",
      "**Start Small, Then Build:** Master the tiny version before expanding: Week 1-2: Do the minimal viable version (1 push-up, 1 page written), Week 3-4: Increase slightly if it feels easy (5 push-ups, 2 pages), Week 5+: Continue gradually increasing. Small wins build confidence and cement the habit. Most people fail by starting too big.",
      "**Track Your Streak:** Use a simple tracking system: Paper calendar with X's for each completed day, Habit tracking app (Streaks, Habitica, Done), Spreadsheet or journal. Seeing your streak motivates you to keep going—breaking a 20-day streak hurts, so you'll push through resistance to maintain it.",
      "**Create Multiple Stacks:** Once one habit stack is automatic (4-6 weeks), add another: Stack different habits onto different triggers throughout your day, Build morning stack, midday stack, evening stack, Keep each stack small (2-3 habits max per trigger). Multiple small stacks compound into massive behavior change.",
      "**Adjust Based on Reality:** If a stack isn't working after 2 weeks: Is the trigger consistent? (If not, choose a more reliable anchor), Is the new habit too hard? (Make it smaller), Is the timing wrong? (Try different trigger), Is it actually valuable? (Abandon it and try something else). Adapt rather than quit entirely."
    ],
    practicalTips: [
      "Write your habit stack formula on a sticky note where you'll see it daily",
      "Use 'temptation bundling'—pair a habit you need with one you enjoy",
      "Start with 1-2 stacks maximum—master before adding more",
      "Stack new business habits onto work routines (after opening laptop, after first client call)",
      "Review and adjust monthly—habits should serve your goals"
    ],
    commonMistakes: [
      "Trying to stack too many habits at once (leads to overwhelm and failure)",
      "Making the new habit too big (start embarrassingly small)",
      "Choosing an inconsistent trigger (it must happen every single day)",
      "Not tracking progress (you lose momentum without visible wins)"
    ]
  },

  "feedback-loops": {
    title: "Creating Effective Feedback Loops",
    readTime: "5 min read",
    category: "Improvement",
    overview: "Feedback loops are systems that show you the results of your actions, allowing you to adjust and improve continuously. Businesses and individuals with tight feedback loops iterate faster, avoid costly mistakes longer, and outperform competitors. This guide teaches you to build feedback mechanisms that drive constant improvement.",
    whyItHelps: "Fast feedback prevents you from spending months going in the wrong direction. It allows rapid learning, quick pivots, and continuous optimization. Companies that measure and respond to feedback grow faster and more sustainably than those flying blind.",
    deepDive: "The faster you get feedback on your decisions, the faster you can course-correct. Amazon's Jeff Bezos famously said their biggest advantage is how quickly they can test, learn, and iterate. Most businesses wait too long to get feedback (quarterly reviews, annual planning) and miss opportunities to adapt. The best entrepreneurs create daily or weekly feedback loops on key metrics.",
    actionSteps: [
      "**Identify Your Key Metrics:** Choose 3-5 numbers that truly indicate success: Revenue/sales (overall business health), Customer acquisition cost vs. lifetime value (marketing efficiency), Customer satisfaction score (product-market fit), Conversion rates (funnel performance), Time to completion (operational efficiency). Focus on metrics you can actually influence and that predict future success.",
      "**Create a Measurement System:** Set up ways to track your metrics consistently: Dashboard (Google Sheets, Data Studio, or software like Geckoboard), Weekly check-ins (Friday afternoon review), Automated reports (email yourself weekly summaries), Visual tracking (graphs on wall, numbers on whiteboard). Make data visible and easy to access—out of sight is out of mind.",
      "**Set Review Cadences:** Schedule regular feedback reviews: Daily: Quick check on critical metrics (5 minutes), Weekly: Deep dive on key numbers and trends (30 minutes), Monthly: Big picture progress toward goals (1 hour), Quarterly: Strategic adjustments and goal setting (2-3 hours). Consistent review rhythms catch problems early and capitalize on opportunities.",
      "**Ask for Customer Feedback Early and Often:** Don't wait for customers to volunteer feedback—actively seek it: Post-purchase survey (how was your experience? What could be better?), Net Promoter Score (would you recommend us? Why or why not?), User testing (watch someone use your product/service), Direct conversations (call your best customers quarterly), Social media listening (what are people saying?). Customers tell you what to fix and what to double down on.",
      "**Implement Small Experiments:** Test changes before fully committing: A/B test one variable at a time (headline, pricing, offer), Run tests for 1-2 weeks minimum (enough data to be significant), Measure results objectively (not what you hope, what actually happened), Scale what works, kill what doesn't. Small experiments with fast feedback prevent expensive failures.",
      "**Create Leading Indicators:** Don't just track lagging indicators (what already happened): Lagging: Revenue (result of past actions), Leading: Number of sales calls made, proposals sent (predicts future revenue). Lagging: Customer churn (lost customers), Leading: Customer satisfaction scores, support ticket volume (predicts churn). Leading indicators give you time to adjust before problems become crises.",
      "**Build Accountability Systems:** External feedback accelerates improvement: Weekly mastermind check-ins (share numbers and get input), Business coach or mentor (objective perspective), Accountability partner (exchange progress updates), Public commitments (announce goals to create social pressure). When someone else sees your results, you're more likely to act on feedback.",
      "**Close the Loop:** Feedback is useless without action: After each review, identify 1-3 action items, Assign ownership and deadlines, Implement changes, Measure if changes improved results, Repeat. The loop only works if you actually respond to what you learn. Awareness without action is wasted feedback."
    ],
    practicalTips: [
      "Start with just one key metric if you're overwhelmed—better to track one well than track many poorly",
      "Use tools that automate data collection (Google Analytics, Stripe, CRM analytics)",
      "Set 'tripwires'—alerts when numbers hit certain thresholds (revenue drops 20%, etc.)",
      "Share metrics with your team—transparency improves performance",
      "Celebrate wins when feedback is positive—positive reinforcement matters"
    ],
    commonMistakes: [
      "Tracking vanity metrics that don't indicate real success (social media followers vs. actual sales)",
      "Collecting feedback but never acting on it",
      "Waiting too long between reviews (monthly isn't frequent enough for fast-moving businesses)",
      "Not segmenting data (overall conversion rate hides what's working and what isn't)"
    ]
  },

  "batch-processing": {
    title: "Batch Processing for Efficiency",
    readTime: "4 min read",
    category: "Productivity",
    overview: "Batch processing means grouping similar tasks together and completing them in one focused session. Instead of bouncing between different types of work, you do all of one kind of task at once. This dramatically reduces context switching, increases focus, and multiplies your productivity.",
    whyItHelps: "Context switching—jumping between different types of tasks—costs 20-40 minutes of productivity each time. By batching similar tasks, you eliminate this waste. You also build momentum on each type of work, allowing you to work faster and with higher quality.",
    deepDive: "Every time you switch tasks, your brain needs time to context switch—to stop thinking about the old task and ramp up on the new one. Research shows this 'switching cost' is significant even for small tasks. Batch processing keeps your brain in one 'mode' (creative, analytical, administrative) for extended periods, maximizing flow and minimizing wasted mental energy.",
    actionSteps: [
      "**Identify Batchable Tasks:** Look for tasks you do repeatedly: Email (reading and responding), Social media posting, Content creation (blog posts, videos), Client calls or meetings, Invoicing and bookkeeping, Meal prep, Errands. Anything you do more than once per week is batchable.",
      "**Create Batching Schedules:** Assign specific time blocks for batches: Email: 10 AM and 3 PM only (30 min each), Content creation: Monday and Thursday mornings (2 hours), Calls: Tuesday and Friday afternoons (3 hours), Admin: Friday afternoon (1 hour). Outside these blocks, those tasks don't exist—you resist the urge to do them.",
      "**Batch Email and Communication:** The biggest time waster for most people: Turn off email notifications, Check email only 2-3 scheduled times per day, Process entire inbox in one session (read, respond, file, delete), Use templates for common responses, Set expectations with others ('I check email at 10 AM and 3 PM'). Constant email checking fragments your day and destroys productivity.",
      "**Batch Content Creation:** Create multiple pieces at once: Write 4-6 social posts in one sitting, Record 4-5 videos in one session, Batch edit photos or graphics, Schedule everything using a content scheduler. Creating in batches is faster because you stay in 'creative mode' and reuse setups (lighting, equipment, research).",
      "**Batch Meetings and Calls:** Cluster all calls on certain days or time blocks: Set 'office hours' for client calls (e.g., Tuesday 1-4 PM), Schedule all team meetings on same day, Batch networking calls together, Leave other days meeting-free for deep work. This protects your deep work time and reduces daily context switching.",
      "**Use Batch Templates:** Create templates to speed up batched work: Email response templates, Social media post templates, Meeting agenda templates, Invoice templates, Proposal templates. Templates let you batch faster because you're filling in blanks, not creating from scratch each time.",
      "**Set Up Triggers:** Make batching automatic: 'When I open my laptop Monday morning, I batch create content', 'When I finish lunch, I batch process email', 'When it's 3 PM Friday, I batch admin tasks'. These if-then rules reduce decision fatigue and ensure batching happens consistently.",
      "**Batch Weekly Reviews:** Do all planning and review in one session: Every Friday or Sunday, batch review the past week and plan the next: What worked? What didn't?, What are priorities for next week?, What can I eliminate or delegate?, Block time for batches on calendar. One planning session prevents constant reactivity all week."
    ],
    practicalTips: [
      "Start by batching just ONE task type to prove the concept",
      "Use timers to maintain focus during batches (Pomodoro technique)",
      "Close unnecessary tabs/apps before batching to avoid distractions",
      "Batch errands too—one trip to multiple stores beats multiple trips",
      "Communicate your batching schedule to team/clients so they know when you're available"
    ],
    commonMistakes: [
      "Checking email constantly instead of in scheduled batches",
      "Saying yes to meetings outside your batched meeting times",
      "Trying to batch tasks that genuinely need immediate attention (true emergencies)",
      "Not blocking batching time on your calendar (it won't happen without dedicated time)"
    ]
  }
};

export default function GuidePage() {
  const navigate = useNavigate();
  const [currentGuide, setCurrentGuide] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [notes, setNotes] = useState('');
  const [guideId, setGuideId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id && guideContent[id]) {
      setCurrentGuide(guideContent[id]);
      setGuideId(id);
    } else {
      navigate(createPageUrl("Guides"));
    }

    const savedSteps = localStorage.getItem(`guide_${id}_steps`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    const savedNotes = localStorage.getItem(`guide_${id}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [navigate]);

  const handleStepToggle = (stepIndex) => {
    const newCompletedSteps = {
      ...completedSteps,
      [stepIndex]: !completedSteps[stepIndex]
    };
    setCompletedSteps(newCompletedSteps);
    if (guideId) {
      localStorage.setItem(`guide_${guideId}_steps`, JSON.stringify(newCompletedSteps));
    }
  };

  const handleSaveNotes = () => {
    if (guideId) {
      localStorage.setItem(`guide_${guideId}_notes`, notes);
      const button = document.getElementById('save-notes-btn');
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Saved!</span>';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    }
  };

  if (!currentGuide) {
    return (
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 text-center">
            <div className="animate-pulse text-[var(--text-soft)]">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = currentGuide.actionSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <button
              onClick={() => navigate(createPageUrl("Guides"))}
              className="btn btn-ghost mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Guides</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[var(--text-soft)]" />
              <span className="text-sm text-[var(--text-soft)]">{currentGuide.readTime}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-1">
              <BookOpen className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">{currentGuide.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-soft)]">
                <span>{currentGuide.category}</span>
                <span>•</span>
                <span>{completedStepsCount}/{totalSteps} steps completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--text-main)]">Your Progress</h3>
            <span className="text-sm text-[var(--text-soft)]">{progressPercentage}% complete</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 bg-[var(--primary-gold)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Overview */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Overview</h2>
          <p className="text-[var(--text-main)] text-lg leading-relaxed mb-6">
            {currentGuide.overview}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentGuide.whyItHelps}</p>
          </div>
        </div>

        {/* Deep Dive */}
        {currentGuide.deepDive && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-[var(--primary-gold)]" />
              Deep Dive: Understanding the Details
            </h2>
            <p className="text-[var(--text-main)] leading-relaxed text-base">
              {currentGuide.deepDive}
            </p>
          </div>
        )}

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Step-by-Step Implementation Guide</h2>
          <div className="space-y-4">
            {currentGuide.actionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-black rounded-md text-white">
                <div className="flex-1">
                  <p className="leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}></p>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={!!completedSteps[index]}
                    onChange={() => handleStepToggle(index)}
                    className="h-5 w-5 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Tips */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Practical Tips for Success</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-md">
            <ul className="space-y-3">
              {currentGuide.practicalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--text-main)] text-base">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Mistakes */}
        {currentGuide.commonMistakes && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-6 rounded-md">
              <ul className="space-y-3">
                {currentGuide.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-600 font-bold text-lg">×</span>
                    <span className="text-[var(--text-main)] text-base">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Notes & Implementation Plan</h2>
            <button
              id="save-notes-btn"
              onClick={handleSaveNotes}
              className="btn btn-secondary"
            >
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </button>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Document your implementation plan, key insights, and action items from this guide..."
            className="form-input h-32 resize-none mb-4"
          />
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-md">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📝 Implementation Checklist</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• What are my immediate next steps from this guide?</li>
              <li>• What deadlines will I set for each action item?</li>
              <li>• What resources or tools do I need to implement this?</li>
              <li>• Who can I ask for help or accountability?</li>
            </ul>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="card p-8 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 inline-block rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Guide Complete!</h3>
            <p className="text-[var(--text-soft)] mb-4">
              Excellent work completing this guide. Now it's time to implement what you've learned and see results.
            </p>
            <button
              onClick={() => navigate(createPageUrl("Guides"))}
              className="btn btn-primary"
            >
              Explore More Guides
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
