import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Lightbulb, ArrowLeft, CheckCircle, Clock, Target, Save, Zap, Sparkles, AlertCircle, BookOpen, TrendingUp } from "lucide-react";

const quickLessons = {
  "domain-name": {
    title: "How to Choose the Right Domain Name",
    readTime: "8 min read",
    category: "Branding",
    overview: "Your domain name is your digital real estate address. It's often the first impression potential customers have of your business online. A well-chosen domain can boost credibility, improve SEO rankings, and make your brand memorable. Think of it as the digital equivalent of choosing a physical location for your store—you want something that's easy to find, easy to remember, and represents your brand well.",
    whyItHelps: "A strong domain name builds instant trust with visitors, improves brand recall by up to 70%, and makes it easier for customers to find and remember your business. It also impacts your search engine rankings significantly. According to research, businesses with clear, memorable domains get 25% more direct traffic than those with complex or confusing names.",
    deepDive: "Your domain isn't just a web address—it's a critical branding and marketing asset. Companies like Amazon, Google, and Apple succeeded partly because their domain names are short, memorable, and easy to spell. A good domain name should be: easy to say over the phone, easy to type on a keyboard, free of hyphens and numbers, and immediately give people an idea of what you do. The psychology behind memorable domains involves simplicity, clarity, and emotional resonance. Research shows people remember 'chunked' information better—shorter domain names with fewer syllables stick in memory more effectively.",
    actionSteps: [
      "**Brainstorm Keywords:** List 10-15 words that describe your business, products, or services. Include industry terms and the benefits you provide. For example, if you're a virtual assistant, keywords might include: 'virtual,' 'assist,' 'remote,' 'help,' 'support,' 'admin,' 'executive,' etc.",
      "**Keep It Short and Simple:** Aim for 6-14 characters total. Shorter domains are easier to type, remember, and less prone to typos. Test this: if you can't say it clearly over the phone without spelling it out, it's probably too complex. Think 'Google' not 'SearchEngineCompany.'",
      "**Choose the Right Extension:** .com is still king for businesses—it's what people instinctively type. Only consider .net, .org, or industry-specific extensions like .tech or .shop if .com isn't available. .co can work but prepare for people accidentally typing .com instead.",
      "**Avoid Hyphens and Numbers:** These make domains harder to remember and communicate verbally. When you tell someone 'go to my-awesome-business-2024.com,' they'll forget the hyphens or get the number wrong. Keep it clean: 'myawesomebusiness.com' or better yet, 'awesomebiz.com.'",
      "**Check Availability Across Platforms:** Use tools like Namecheap, GoDaddy, or Google Domains to check if your preferred names are available. But also check social media handles—you want consistency across Instagram, Facebook, Twitter/X, LinkedIn, etc.",
      "**Test It Out Loud:** Say your domain name to 5 different people. Can they spell it correctly? Do they understand what you do? If they hesitate or guess wrong, reconsider. The 'Radio Test' is simple: if you can't say it on the radio and have listeners find you, it's too complicated."
    ],
    practicalTips: [
      "Use domain generators like NameMesh, Lean Domain Search, or Bust a Name for creative ideas when you're stuck",
      "Check trademark databases before committing to avoid legal issues—use USPTO.gov for U.S. trademarks",
      "Consider buying multiple extensions (.com, .net, .org) and plural/singular versions to protect your brand from competitors",
      "Test pronunciation with people from different backgrounds—some words sound different in various accents",
      "Look at competitor domains in your industry for naming patterns and differentiation opportunities"
    ],
    commonMistakes: [
      "Choosing a name that's too similar to competitors—you'll lose traffic to them",
      "Not checking if the social media handles match your domain name",
      "Using trademarked terms without permission (can result in losing your domain)",
      "Picking a name that's too specific to your current offering (limits future growth)"
    ],
    tools: [
      { name: "The Command Hub Website Builder", description: "Choose from professional templates and customize with drag & drop editor" },
      { name: "Namecheap", description: "Domain registration and availability checking" },
      { name: "Google Domains", description: "Google's domain registration service" }
    ]
  },
  "morning-routine": {
    title: "The Entrepreneur's Morning Routine",
    readTime: "10 min read",
    category: "Productivity",
    overview: "How you start your morning sets the tone for your entire day as an entrepreneur. A structured morning routine helps you maintain peak performance, reduce stress, and consistently work on your most important goals before distractions take over. Research from the American Psychological Association shows that people who follow a morning routine report 31% higher productivity and 40% lower stress levels throughout the day. This isn't about waking up at 4 AM—it's about creating a consistent start that energizes you and prepares your mind for success.",
    whyItHelps: "A powerful morning routine gives you control over your day instead of reacting to whatever comes at you. It reduces decision fatigue (saving mental energy for important business decisions), boosts energy levels naturally, and ensures you tackle high-priority tasks when your willpower is strongest. Successful entrepreneurs like Tim Ferriss, Arianna Huffington, and Mark Zuckerberg all credit structured morning routines as a key to their success.",
    deepDive: "Your body runs on a circadian rhythm—a 24-hour internal clock that affects energy, focus, and hormone levels. The first 60-90 minutes after waking are critical because cortisol (alertness hormone) is naturally highest then. If you immediately check emails or dive into reactive tasks, you're using your peak mental state on low-value activities. Instead, successful entrepreneurs use this time for: physical movement (increases blood flow and oxygen to the brain), mental clarity practices (meditation or journaling), and strategic planning (setting daily priorities). The key is consistency—your brain thrives on routine and begins to anticipate and prepare for activities it knows are coming.",
    actionSteps: [
      "**Wake Up Consistently:** Choose a wake-up time and stick to it 7 days a week, even weekends. Your body's circadian rhythm needs consistency to regulate properly. If you vary your wake time by 2+ hours, you're essentially giving yourself jet lag. Start with a realistic time—if you currently wake at 8 AM, don't jump to 5 AM. Try 7:30 AM first and adjust gradually.",
      "**Hydrate First:** Keep a large glass of water (16-24 oz) by your bed. Drink it immediately upon waking. Add lemon if you want extra benefits (vitamin C, aids digestion). Your body is dehydrated after 7-8 hours without water—hydration improves alertness and cognitive function faster than coffee.",
      "**Move Your Body:** Spend 10-20 minutes on physical activity. This doesn't mean an intense workout. Try: gentle stretching, yoga, a walk around the block, or 10 push-ups. Movement increases blood flow to your brain, releases endorphins (natural mood boosters), and signals to your body that it's time to be alert and active.",
      "**Practice Mindfulness:** Dedicate 5-15 minutes to meditation, deep breathing, or journaling. If you're new to meditation, try guided apps like Calm or Headspace. If meditation isn't your thing, try journaling: write 3 things you're grateful for and your top 3 priorities for the day. This centers your mind and reduces anxiety.",
      "**Review Your Goals:** Spend 5 minutes reviewing your top 3 priorities for the day. Ask yourself: 'If I only accomplish 3 things today, what would have the biggest impact on my business?' Write them down. This ensures you start with intention instead of reacting to urgent-but-not-important tasks.",
      "**Eat a Healthy Breakfast:** Fuel your body with protein (eggs, Greek yogurt, nuts), healthy fats (avocado, olive oil), and complex carbs (oatmeal, whole grain). Avoid sugar-heavy breakfasts—they cause energy crashes around 10-11 AM that kill productivity."
    ],
    practicalTips: [
      "Prepare everything the night before: lay out clothes, prep breakfast ingredients, charge devices by the door",
      "Start small: begin with just 2-3 elements (hydrate, move, review goals) and gradually add more over weeks",
      "Track your routine for 30 days using a habit tracker app or simple calendar X's—building the habit is more important than perfection",
      "Adjust timing based on your chronotype (natural energy patterns): 'night owls' might need a later start time",
      "Protect your morning routine fiercely: don't schedule early meetings or calls during this sacred time"
    ],
    commonMistakes: [
      "Trying to implement too many changes at once and burning out after 3 days",
      "Immediately checking email or social media upon waking (puts you in reactive mode)",
      "Skipping the routine on weekends (consistency is key for habit formation)",
      "Making your routine too rigid—allow flexibility for life's unexpected events"
    ],
    tools: [
      { name: "The Command Hub Mobile App", description: "Set daily reminders and track your routine on the go" },
      { name: "The Command Hub Calendar", description: "Schedule your morning routine blocks and set reminders" },
      { name: "Headspace or Calm", description: "Guided meditation and mindfulness exercises for beginners and advanced practitioners" }
    ]
  },
  "customer-research": {
    title: "5-Minute Customer Research",
    readTime: "7 min read",
    category: "Market Research",
    overview: "Understanding your customers doesn't require expensive market research firms or lengthy surveys. You can gather powerful customer insights in just 5 minutes using strategic questions and readily available data. The key is knowing where to look and what to ask. Most entrepreneurs skip customer research entirely or make it so complicated they never start. This quick approach removes those barriers, giving you actionable insights fast.",
    whyItHelps: "Quick customer research helps you avoid building products nobody wants, create marketing messages that resonate, and identify opportunities your competitors miss. Companies that regularly conduct customer research grow 2.5x faster than those that don't, according to Harvard Business Review. The best part? You can do it in minutes, not months.",
    deepDive: "Traditional market research can take weeks or months and cost thousands of dollars. But in today's digital world, your customers are constantly leaving clues about what they want, need, and struggle with. Social media comments, product reviews, customer support tickets, and online communities are goldmines of customer intelligence. The trick is systematically extracting this information and turning it into actionable insights. Jeff Bezos famously said Amazon's success came from being 'customer-obsessed, not competitor-obsessed.' Small businesses can adopt this same mindset without Amazon's budget by leveraging free or low-cost research methods.",
    actionSteps: [
      "**Mine Reviews and Comments:** Spend 5 minutes reading reviews of your competitors' products on Amazon, Google, or industry-specific sites. Look for patterns in complaints and praise. What do customers wish existed? What problems keep coming up? Screenshot or note the exact language customers use—this becomes your marketing copy.",
      "**Ask One Powerful Question:** If you have existing customers, email or message them with one specific question: 'What was the biggest challenge you were facing before you found us?' Their answers reveal the pain points your solution addresses. Use this language in your marketing.",
      "**Check Online Communities:** Visit Reddit, Facebook Groups, or niche forums where your target audience hangs out. Search for questions like 'best [your product category]' or 'struggling with [problem you solve].' Read through threads to see what people are asking for, complaining about, and recommending.",
      "**Use Google Autocomplete:** Type your industry + common question words into Google. For example: 'how to [your industry]' or '[your industry] problems.' Google's autocomplete suggestions show you the most common searches—these are real customer pain points and questions you can address.",
      "**Analyze Your Own Data:** If you have a website, check Google Analytics to see what pages get the most traffic and where visitors drop off. If you have an email list, check which subject lines get opened most. Your existing data tells you what your audience cares about."
    ],
    practicalTips: [
      "Set a recurring 5-minute calendar reminder weekly to do customer research—consistency beats depth",
      "Create a simple spreadsheet or note to track patterns you discover across multiple sources",
      "Pay attention to emotional language—words like 'frustrated,' 'confused,' 'wish,' 'need' signal strong pain points",
      "Look for the same problem mentioned in different places—that's validation it's worth solving",
      "Turn customer language into marketing copy—if they say 'I was overwhelmed by all the options,' your headline could be 'Overwhelmed by choices? We make it simple.'"
    ],
    commonMistakes: [
      "Only researching once and assuming customer needs never change",
      "Asking customers what they want instead of what problems they have (people are bad at predicting what they want)",
      "Ignoring negative feedback because it's uncomfortable—complaints are valuable insights",
      "Focusing only on demographics (age, location) instead of psychographics (fears, desires, frustrations)"
    ]
  },
  "pricing-psychology": {
    title: "Pricing Psychology Essentials",
    readTime: "9 min read",
    category: "Sales",
    overview: "Pricing isn't just about covering costs and adding a profit margin. How you present your prices psychologically influences whether customers perceive your product as valuable or expensive. Small changes in pricing presentation can increase conversions by 20-30% without changing the actual price. Understanding pricing psychology means you can charge what you're worth while making customers feel they're getting incredible value.",
    whyItHelps: "Strategic pricing psychology can increase your revenue by 30-50% without acquiring more customers or creating new products. It helps you position your offering as premium rather than commodity, justify higher prices, and guide customers toward your most profitable offerings. Companies like Apple, Starbucks, and luxury brands have mastered these principles to build billion-dollar businesses.",
    deepDive: "Your brain processes prices emotionally before rationally. When you see a price, your brain instantly decides if it 'feels' expensive or affordable based on context, presentation, and comparison. This happens in milliseconds, before logical thinking kicks in. Smart pricing leverages cognitive biases like anchoring (the first price you see becomes the reference point), charm pricing (prices ending in .99 seem significantly cheaper), and value framing (how you describe what they get for the price). Understanding these psychological triggers means you can present the same price in ways that dramatically affect purchase behavior.",
    actionSteps: [
      "**Use Charm Pricing Strategically:** For products under $1,000, use prices ending in .99 or .97 (e.g., $49.99 instead of $50). Studies show this increases conversions by up to 24% because our brains focus on the leftmost digit. For luxury or premium offerings over $1,000, use round numbers ($5,000 instead of $4,999) to convey quality and sophistication.",
      "**Implement Price Anchoring:** Always show your highest-priced option first. When customers see a $500 option before a $200 option, the $200 seems reasonable. Without the anchor, $200 might seem expensive. This is why restaurant menus list expensive wines first—it makes everything else look more affordable.",
      "**Create Three Tiers:** Offer three pricing options: Basic, Standard, and Premium. Most people choose the middle option (called the Goldilocks effect). Make your preferred option the middle tier. The low tier makes you accessible; the high tier makes the middle look like a great deal.",
      "**Bundle for Perceived Value:** Instead of charging $50 + $30 + $20 = $100 separately, bundle them for $79. Customers perceive bundles as better value even when the math says otherwise. Clearly list what's included so they see the full value they're getting.",
      "**Frame Price as Daily or Monthly Cost:** Instead of '$1,200/year,' say '$100/month' or '$3.29/day (less than a coffee!).' Breaking down prices into smaller units makes them feel more affordable and relatable. This is especially effective for subscriptions.",
      "**Show the Cost of Not Buying:** Highlight what it costs customers to NOT solve their problem. If your tool saves 5 hours per week, calculate that at their hourly rate over a year. Example: 'Without this tool, you're losing $15,000/year in wasted time.'"
    ],
    practicalTips: [
      "Remove dollar signs from prices in your copy—studies show this reduces price pain by up to 8%",
      "Use smaller fonts for prices but larger fonts for the value description",
      "Display annual savings when offering subscriptions: 'Save $200/year with annual billing'",
      "Test different price points—sometimes raising prices actually increases conversions by improving perceived value",
      "Use social proof near pricing: 'Join 10,000+ customers who chose this plan'"
    ],
    commonMistakes: [
      "Racing to the bottom with the lowest price—you attract price-sensitive customers who never become loyal",
      "Offering too many pricing options (more than 3-4 creates decision paralysis)",
      "Not clearly explaining what differentiates each tier",
      "Changing prices too frequently—this erodes trust and trains customers to wait for sales"
    ]
  },
  "social-proof": {
    title: "Building Social Proof Fast",
    readTime: "8 min read",
    category: "Marketing",
    overview: "Social proof is the psychological phenomenon where people look to others' actions to determine their own. When potential customers see that others trust and benefit from your product, they're dramatically more likely to buy. In fact, 92% of consumers read online reviews before making a purchase, and displaying reviews can increase conversions by up to 270%. Even if you're just starting out, you can build powerful social proof quickly using strategic methods.",
    whyItHelps: "Social proof reduces risk perception and overcomes buyer skepticism faster than any sales pitch. It's the difference between 'this company says they're great' and 'thousands of customers say they're great.' Businesses that effectively showcase social proof see 15-30% higher conversion rates, lower customer acquisition costs, and faster sales cycles because trust is pre-built.",
    deepDive: "Humans are social creatures hardwired to follow the crowd—it's an evolutionary survival mechanism. When we're uncertain about a decision, we look for signals that others have made the choice successfully. This is why restaurants with lines outside seem more desirable, why bestseller badges increase book sales, and why 'as seen on TV' actually works. The challenge for new businesses is the 'cold start problem'—you need customers to get testimonials, but you need testimonials to get customers. The solution is to strategically generate social proof through beta users, strategic partnerships, and creative methods that build credibility before you have thousands of customers.",
    actionSteps: [
      "**Offer Free Beta Access:** Identify 10-20 ideal customers and offer your product/service free in exchange for detailed feedback and a testimonial if they like it. Make it clear upfront: 'We're looking for beta users to test this. If you love it, we'd appreciate a testimonial. If not, no worries—your feedback helps us improve.'",
      "**Record Video Testimonials:** Video testimonials are 5x more powerful than text. After successful customer interactions, ask: 'Would you be willing to record a 60-second video sharing your experience?' Make it easy—they can record on their phone and send it via text or email. Offer a small incentive if needed (discount on next purchase, free month of service).",
      "**Showcase Impressive Numbers:** Even small numbers create credibility. '143 customers served' beats 'newly launched.' Track everything: projects completed, hours saved for clients, problems solved, emails sent. Display these metrics prominently on your website and marketing materials.",
      "**Leverage Association:** Get featured in media, partner with recognized brands, or earn certifications. Apply to be a guest on podcasts, write guest posts for industry blogs, or get listed in directories like Product Hunt or Capterra. One credible mention is worth dozens of self-promotions.",
      "**Create Detailed Case Studies:** Choose 2-3 successful customers and write comprehensive case studies: Background (their problem), Solution (how you helped), Results (specific metrics and outcomes). Use real names and photos if possible. Structure: Challenge → Process → Results → Testimonial.",
      "**Use Real-Time Social Proof:** Install widgets showing real-time activity: 'John from Texas just purchased,' 'Sarah from California is viewing this page.' Tools like Proof or Fomo create urgency and show your product is actively being chosen by others right now."
    ],
    practicalTips: [
      "Make giving testimonials easy—send a template with specific questions they can answer",
      "Ask for testimonials immediately after a win or positive interaction (strike while the iron is hot)",
      "Incentivize reviews with small rewards: entry into a monthly gift card drawing, discount on next purchase",
      "Feature different types of social proof for different stages: logos for awareness, testimonials for consideration, case studies for decision",
      "Update your social proof regularly—fresh testimonials signal active, growing business"
    ],
    commonMistakes: [
      "Using fake testimonials or stock photos (customers can tell and it destroys trust)",
      "Only asking your happiest customers for testimonials—diverse voices create authenticity",
      "Hiding social proof on a separate testimonials page instead of sprinkling it throughout your site",
      "Not including specific results in testimonials (vague praise is less convincing than specific outcomes)"
    ]
  },
  "email-sequences": {
    title: "High-Converting Email Sequences",
    readTime: "10 min read",
    category: "Email Marketing",
    overview: "Email sequences are pre-written series of emails sent automatically to subscribers based on their actions or over time. They work 24/7 to nurture leads, build relationships, and drive sales without you manually sending each email. A well-designed email sequence can convert 10-30% of subscribers into customers over 30-60 days. Email marketing has an average ROI of $42 for every $1 spent—higher than any other digital marketing channel—making it one of the most powerful tools for business growth.",
    whyItHelps: "Email sequences automate your sales process, allowing you to consistently follow up with every lead without dropping the ball. They build trust systematically through storytelling and value delivery, warm up cold leads over time, and convert subscribers into customers while you sleep. Businesses using email automation generate 320% more revenue than those who don't, according to Campaign Monitor.",
    deepDive: "Most businesses fail at email marketing by either sending too many promotional emails (leading to unsubscribes) or too few value-driven emails (leading to being forgotten). The secret is a strategic sequence that follows a proven formula: Hook (capture attention), Story (build connection), Value (solve problems), Offer (present solution), Urgency (drive action). Each email should have ONE clear purpose and naturally lead to the next. The most effective sequences use storytelling, teach valuable concepts, overcome objections progressively, and make the sale feel like a natural next step rather than a pushy pitch.",
    actionSteps: [
      "**Email 1 - Welcome & Set Expectations (Sent immediately):** Thank them for subscribing, tell them what to expect (how often you'll email and what value you'll provide), and deliver on your lead magnet promise immediately. End with one call-to-action: reply to this email or click to learn more about your main offering.",
      "**Email 2 - Your Story & Connection (Day 2):** Share your origin story—why you started this business and what problem you experienced that you now solve for others. Make it personal and relatable. People buy from people they connect with emotionally. End by asking them about their story or biggest challenge.",
      "**Email 3 - Provide Massive Value (Day 4):** Teach something actionable and useful for free. This could be a how-to guide, case study, or resource list. Prove your expertise without asking for anything. When you give value freely, people trust you with their money later. This is your credibility-building email.",
      "**Email 4 - Address Common Objections (Day 6):** Identify the main reasons people DON'T buy your product (too expensive, not sure if it works, worried about time commitment, etc.). Address these concerns with social proof, FAQs, or success stories. Frame it as 'You might be wondering...' to feel conversational.",
      "**Email 5 - Soft Offer with Incentive (Day 8):** Introduce your product/service as the solution to the problem you've been discussing. Use the language they used when they signed up (mention their pain points). Offer a time-limited discount or bonus to create urgency: 'For subscribers only: 20% off if you purchase in the next 48 hours.'",
      "**Email 6 - Final Reminder & Scarcity (Day 10):** This is your last-chance email. Remind them the offer expires soon. Use FOMO (fear of missing out) strategically: 'Only 3 hours left' or 'Just 5 spots remaining.' Include a clear button or link to purchase. Make it easy to say yes."
    ],
    practicalTips: [
      "Write subject lines that spark curiosity without being clickbait: 'I made this mistake so you don't have to' beats 'Newsletter #4'",
      "Keep emails short and scannable: use short paragraphs (2-3 sentences), bullet points, and one clear CTA per email",
      "Write like you're emailing a friend—conversational tone converts better than corporate-speak",
      "Test sending times: for B2B, Tuesday-Thursday 10 AM-2 PM performs best; for B2C, evening and weekends often win",
      "Track metrics: open rates (aim for 20-30%), click rates (aim for 2-5%), and conversion rates to optimize over time"
    ],
    commonMistakes: [
      "Selling too early—build trust and provide value first before asking for money",
      "Making emails too long—most people skim emails, so respect their time",
      "Using the same sequence for everyone—segment by interest or behavior for higher conversions",
      "Not testing subject lines, CTAs, or sending times—small tweaks can double your results"
    ]
  },
  "productivity-hacks": {
    title: "10 Productivity Hacks for Entrepreneurs",
    readTime: "12 min read",
    category: "Productivity",
    overview: "Productivity isn't about working more hours—it's about making every hour count. Entrepreneurs wear multiple hats and face constant demands on their time and attention. These 10 battle-tested hacks help you accomplish more in less time by eliminating waste, optimizing energy, and focusing on high-impact activities. Studies show that implementing just 3-4 productivity systems can increase output by 40-60% without working longer hours.",
    whyItHelps: "These hacks help you work smarter, not harder. They reduce stress, eliminate overwhelm, and create space for strategic thinking instead of constant firefighting. Most importantly, they help you achieve your business goals without sacrificing personal life or health—the key to sustainable entrepreneurship.",
    deepDive: "Traditional productivity advice often backfires for entrepreneurs because it assumes you have a predictable 9-5 schedule and a single role. Entrepreneurs need flexible systems that work when dealing with constant interruptions, shifting priorities, and the need to switch between strategic thinking and execution. The hacks below are specifically designed for entrepreneurial chaos, focusing on energy management, decision-making, and leveraging technology to multiply your efforts.",
    actionSteps: [
      "**1. Time Block Your Calendar:** Divide your day into dedicated blocks for specific types of work: Deep Work (creative/strategic tasks), Admin (email, scheduling), Meetings, and Breaks. Treat these blocks as non-negotiable appointments. Example schedule: 8-11 AM Deep Work, 11 AM-12 PM Admin, 12-1 PM Lunch, 1-3 PM Meetings, 3-4 PM Deep Work, 4-5 PM Planning tomorrow.",
      "**2. Use the Pomodoro Technique:** Work in focused 25-minute sprints followed by 5-minute breaks. After 4 sprints, take a longer 15-30 minute break. This maintains peak focus and prevents burnout. Use a timer app or website like Pomofocus.io. The short intervals make starting easier and keep your brain fresh.",
      "**3. Implement the 2-Minute Rule:** If a task takes less than 2 minutes, do it immediately instead of adding it to your to-do list. This prevents task pile-up and maintains momentum. Quick wins create psychological momentum that carries you through harder tasks.",
      "**4. Batch Similar Tasks:** Group similar activities together to minimize context switching. Example: Check and respond to all emails twice daily (10 AM and 3 PM) instead of constantly throughout the day. Record all your video content in one session. Make all your phone calls in one block. Context switching costs you 20-40 minutes of productivity each time.",
      "**5. Use Templates and SOPs:** Create templates for recurring tasks: email responses, contracts, proposals, social media posts. Document Standard Operating Procedures for anything you do more than once. This turns a 30-minute task into a 5-minute task and makes delegation easier later.",
      "**6. Automate Repetitive Tasks:** Use tools like Zapier, IFTTT, or Make to automate workflows. Examples: Auto-save email attachments to cloud storage, auto-post blog articles to social media, auto-send welcome emails to new subscribers. If you do it more than once a week, automate it.",
      "**7. Schedule Your Hardest Task First:** Tackle your most challenging, important task first thing in the morning (this is called 'eating the frog'). Your willpower and focus are strongest in the morning. Everything else feels easier after you've conquered the hard thing.",
      "**8. Use the Eisenhower Matrix:** Categorize every task as Urgent/Important, Not Urgent/Important, Urgent/Not Important, or Not Urgent/Not Important. Do Urgent/Important tasks immediately, schedule Not Urgent/Important tasks, delegate Urgent/Not Important tasks, and eliminate Not Urgent/Not Important tasks. Most people spend too much time in Urgent/Not Important (other people's priorities).",
      "**9. Implement Weekly Reviews:** Every Friday or Sunday, spend 30 minutes reviewing the past week and planning the next. What worked? What didn't? What are your top 3 priorities next week? This bird's-eye view prevents you from getting lost in daily chaos and ensures you're moving toward long-term goals.",
      "**10. Protect Your Energy, Not Just Your Time:** Schedule tasks based on your energy levels, not just available time slots. Do creative work when you have high energy, admin work when you're lower energy. Track your energy patterns for a week—you'll discover your natural rhythms and can schedule accordingly."
    ],
    practicalTips: [
      "Use app blockers like Freedom or Cold Turkey during deep work sessions to block distracting websites",
      "Create a 'Stop Doing' list alongside your to-do list—eliminating low-value activities is as important as adding high-value ones",
      "Use tools like Trello, Asana, or ClickUp to visualize your tasks and projects",
      "Set up 'If-Then' rules: 'If someone requests a meeting, then send them my calendar link' (automation reduces decision fatigue)",
      "Take real breaks away from screens—walk outside, stretch, or chat with someone in person"
    ],
    commonMistakes: [
      "Trying to implement all 10 hacks at once (pick 2-3 to start)",
      "Being too rigid with your schedule—build in buffer time for unexpected issues",
      "Not saying no to low-value tasks or meetings that don't align with your goals",
      "Forgetting to schedule breaks and rest—burnout destroys productivity"
    ]
  },
  "sales-conversations": {
    title: "Mastering Sales Conversations",
    readTime: "11 min read",
    category: "Sales",
    overview: "Sales conversations don't have to feel pushy or manipulative. When done right, they're consultative discussions where you help people solve problems and make informed decisions. The most successful salespeople listen more than they talk, focus on understanding customer needs deeply, and guide prospects to realize your solution is the right fit. Research shows that top-performing sales reps spend 43% of calls listening and asking questions, while low performers spend 72% of calls talking about their product.",
    whyItHelps: "Mastering sales conversations increases your close rate, shortens sales cycles, and builds long-term customer relationships. When customers feel heard and understood rather than sold to, they become loyal advocates who refer others. This skill directly impacts your revenue and is worth developing whether you're selling high-ticket services or low-cost products.",
    deepDive: "Traditional 'ABC' (Always Be Closing) sales tactics feel gross because they prioritize the sale over the customer's actual needs. Modern sales is about partnership—you're helping someone make the best decision for their situation, which sometimes means recommending they NOT buy from you if it's not the right fit. Paradoxically, this honesty builds trust that leads to more sales long-term. The framework that works: Ask questions to understand their situation, listen actively to their concerns, educate them on options, and help them decide based on their goals—not your quota.",
    actionSteps: [
      "**Open with Rapport-Building:** Start with genuine connection, not a sales pitch. Ask about something personal: their background, how they heard about you, what's happening in their business. People buy from people they like and trust. Spend the first 5 minutes building rapport—it's not wasted time, it's foundational.",
      "**Use the 80/20 Listening Rule:** Listen 80% of the time, talk 20%. Ask open-ended questions and let them do the talking. Questions like: 'Tell me about your current situation,' 'What's been most frustrating?' 'What have you tried so far?' The more they talk, the more you learn, and the more valued they feel.",
      "**Identify Their Pain Points:** Dig deep into their problems and the impact of those problems. Ask: 'How is this affecting your business/life?' 'What happens if this problem isn't solved?' 'What would change if this problem disappeared?' When prospects articulate the pain clearly themselves, they sell themselves on needing a solution.",
      "**Present Your Solution as a Bridge:** Frame your product/service as the bridge from their current state (frustrating, expensive, time-consuming) to their desired state (efficient, profitable, stress-free). Use their language and focus on outcomes they care about, not features you're proud of. Example: Instead of 'Our software has 50 features,' say 'This saves you 10 hours per week, which means you can finally focus on growing the business instead of admin.'",
      "**Handle Objections with Feel-Felt-Found:** When they raise concerns, use this formula: 'I understand how you feel. Many clients felt the same way. Here's what they found after trying it...' This validates their concern, shows they're not alone, and provides social proof of the solution. Never argue with objections—acknowledge and address them.",
      "**Close with a Question:** Instead of 'Are you ready to buy?' ask 'Based on everything we've discussed, what do you feel makes the most sense for your situation?' or 'What questions do you still have before moving forward?' This keeps the conversation collaborative and helps surface any remaining concerns."
    ],
    practicalTips: [
      "Take notes during the conversation and use their exact words back when presenting your solution",
      "Pause after asking important questions—silence gives them space to think and share more deeply",
      "If they're not ready to buy, ask 'What would need to happen for this to be a yes?' to understand barriers",
      "Follow up promptly with what you promised (proposal, information, etc.)—reliability builds trust",
      "After a sale, ask 'What made you decide to move forward?' to understand what resonated for future calls"
    ],
    commonMistakes: [
      "Talking too much about your product instead of their problems",
      "Not asking enough questions or diving deep into their real concerns",
      "Getting defensive when they raise objections instead of listening and addressing them",
      "Pushing for a close before building sufficient value and trust"
    ]
  },
  "business-structures": {
    title: "Choosing Your Business Structure",
    readTime: "10 min read",
    category: "Legal & Finance",
    overview: "Your business structure (sole proprietorship, LLC, S-Corp, C-Corp) determines your legal liability, tax obligations, and how you can raise money and pay yourself. Choosing the right structure protects your personal assets, optimizes your taxes, and positions your business for growth. Many entrepreneurs default to sole proprietorship because it's simple, but that leaves them personally liable for business debts and lawsuits. Understanding your options helps you make informed decisions that protect you and your family.",
    whyItHelps: "The right business structure can save you thousands in taxes annually, protect your personal assets from business lawsuits, and make it easier to attract investors or sell your business later. It also impacts how you pay yourself, hire employees, and scale. While you can change structures later, it's more complex and expensive than starting with the right one.",
    deepDive: "Most entrepreneurs know they 'should' set up an LLC but don't fully understand why or when they might need something different. Each structure has trade-offs: sole proprietorships are simple but risky, LLCs provide liability protection with tax flexibility, S-Corps can save on self-employment taxes but have strict rules, and C-Corps are best for raising investor capital but face double taxation. The optimal choice depends on your revenue, growth plans, industry, and risk tolerance. Additionally, state laws vary, so what works in Delaware might not be ideal in California. This isn't legal advice—consult a lawyer and accountant for your specific situation—but understanding the basics helps you ask the right questions.",
    actionSteps: [
      "**Understand Sole Proprietorship (Default):** If you haven't filed anything, you're automatically a sole proprietor. Pros: Simple, no filing fees, complete control. Cons: No liability protection (your personal assets can be seized for business debts), harder to raise money, and you pay self-employment tax on all profits. Best for: Very small, low-risk side businesses or testing an idea.",
      "**Consider an LLC (Limited Liability Company):** An LLC separates your personal assets from business liabilities. If your business gets sued or goes into debt, creditors can't come after your house or savings (in most cases). You still file taxes as a pass-through entity (business income shows on your personal tax return). Best for: Most small to medium businesses, especially those with liability risk (consulting, contracting, e-commerce). Cost: $50-$500 to file depending on state, plus annual fees.",
      "**Evaluate S-Corp Election:** An S-Corp isn't a separate entity—it's a tax election you make for your LLC or corporation. As an S-Corp, you can pay yourself a 'reasonable salary' and take remaining profits as distributions, which aren't subject to self-employment tax (15.3%). This can save significant money if you're profitable. Best for: LLCs making $60K+ in profit annually. Cons: More paperwork, must run payroll, and stricter IRS requirements. Requires filing IRS Form 2553.",
      "**Understand C-Corp (Traditional Corporation):** C-Corps are separate legal entities that pay their own taxes. They face 'double taxation' (the company pays corporate tax, then shareholders pay personal tax on dividends). Why would anyone choose this? C-Corps can raise money from investors more easily, offer stock options to employees, and can have unlimited shareholders. Best for: High-growth startups planning to raise venture capital or go public. Not for: Most small businesses or solopreneurs.",
      "**Factor in Your State:** Registering in your home state is usually cheapest and simplest. Delaware is famous for business-friendly laws and is worth considering if you plan to raise significant investment or go public. Don't register in Delaware just because you heard it's 'the best'—it adds complexity and cost for most small businesses.",
      "**Consult Professionals:** Talk to a business attorney (for liability and compliance advice) and a CPA (for tax strategy). A 1-hour consultation costs $200-500 but can save you thousands in taxes and legal fees later. Ask them: Given my revenue, growth plans, and industry, what structure makes most sense?"
    ],
    practicalTips: [
      "Start with an LLC if you're uncertain—it's flexible and protective while you figure out your business",
      "If forming an LLC, use services like LegalZoom, Incfile, or ZenBusiness for $99-300 including filing fees (faster and cheaper than hiring a lawyer for basic setup)",
      "Get an EIN (Employer Identification Number) from the IRS for free—you'll need it for banking and hiring",
      "Keep business and personal finances completely separate (separate bank accounts, credit cards) to maintain liability protection",
      "Review your business structure annually with your CPA—what made sense at $50K revenue might need to change at $250K"
    ],
    commonMistakes: [
      "Staying a sole proprietor too long because 'it's working fine'—until you get sued and lose everything",
      "Electing S-Corp status too early (when profits are low) or too late (after missing tax savings for years)",
      "Registering in Delaware without understanding the benefits or additional costs involved",
      "Not maintaining proper separation between personal and business (courts can 'pierce the corporate veil' if you don't)"
    ]
  },
  "networking-strategy": {
    title: "Strategic Networking for Entrepreneurs",
    readTime: "9 min read",
    category: "Networking",
    overview: "Networking isn't about collecting as many business cards as possible—it's about building genuine relationships with people who can help you grow and whom you can help in return. Strategic networking focuses quality over quantity: connecting with the right people, providing value first, and cultivating relationships that create opportunities. Research shows that 85% of jobs are filled through networking, and for entrepreneurs, many of the best business deals, partnerships, and clients come through referrals and relationships.",
    whyItHelps: "A strong network opens doors that are closed to cold outreach: investor introductions, strategic partnerships, high-quality clients, mentorship, and visibility. When someone in your network refers you, trust transfers instantly—you skip the 'proving yourself' phase that can take months otherwise. Effective networking can 10x your opportunities while making business less lonely and more enjoyable.",
    deepDive: "Most people network wrong: they show up to events, hand out cards, and wonder why nothing happens. The secret to powerful networking is the 'give-first' mentality: provide value before asking for anything. When you genuinely help others succeed, they naturally want to reciprocate. This isn't manipulation—it's building social capital through authentic relationships. The best networkers are 'super-connectors' who introduce people to each other, share resources freely, and ask 'How can I help?' before 'What can you do for me?' This approach builds a reputation as someone valuable to know, which attracts opportunities magnetically.",
    actionSteps: [
      "**Identify Your Target Connections:** Make a list of 20-30 people you'd ideally want in your network: potential clients, industry leaders, complementary business owners, potential partners, mentors. Be specific—not 'successful entrepreneurs' but 'founders of 7-figure e-commerce brands in the health space.' Focus beats spray-and-pray.",
      "**Find Where They Gather:** Research where your target connections spend time: industry conferences, online communities (Facebook groups, Slack channels, LinkedIn groups), local meetups, masterminds, or specific podcasts/Twitter spaces. Join 2-3 of these communities and become an active, helpful participant. Quality engagement in focused communities beats attending dozens of generic networking events.",
      "**Lead with Value:** Before asking for anything, provide value first. In online communities: answer questions, share helpful resources, congratulate wins. In person: make introductions between people you know, share relevant articles or tools, offer your expertise freely. When you're known as someone who gives, people want to know you and help you back.",
      "**Use the '3-Touch Rule':** After an initial meeting or connection: 1) Follow up within 24 hours with a personalized message referencing your conversation, 2) Connect again within a week sharing something valuable (article, intro, resource) with no ask, 3) Propose a specific next step (coffee, call, collaboration) within 2-3 weeks. Most people never follow up; doing it strategically sets you apart.",
      "**Master the Art of Asking:** When you need something (introduction, advice, partnership), ask clearly and specifically. Make it easy to say yes: 'I'm trying to connect with marketing agencies in Austin. Do you know any you'd recommend?' is better than 'Can you help me?' Also frame it around value: 'I'd love to interview you for my podcast about your expertise in X' gives them exposure while helping you learn.",
      "**Nurture Long-Term:** Networking isn't transactional—stay in touch over time. Set reminders to check in every 2-3 months: share wins, ask how they're doing, congratulate them on milestones you see. Use a simple CRM or spreadsheet to track relationships and touchpoints. The best opportunities often come from relationships nurtured over years, not weeks."
    ],
    practicalTips: [
      "Attend events with a specific goal: 'Meet 3 people and have meaningful conversations' beats aimlessly mingling",
      "Prepare a compelling answer to 'What do you do?' that focuses on the problem you solve, not your title",
      "Use LinkedIn strategically: send personalized connection requests, engage with people's content before asking for meetings",
      "Host your own events or masterminds—positioning yourself as the connector builds your network faster",
      "Keep notes on people: their goals, challenges, interests—use this to personalize future interactions"
    ],
    commonMistakes: [
      "Only networking when you need something (people can sense opportunism)",
      "Not following up after meeting someone interesting",
      "Asking for favors before building any relationship or providing value",
      "Networking only with people in your industry—diverse connections create unexpected opportunities"
    ]
  },
  "cash-flow-management": {
    title: "Cash Flow Management Basics",
    readTime: "11 min read",
    category: "Finance",
    overview: "Cash flow is the lifeblood of your business. You can be profitable on paper but still go bankrupt if you run out of cash to pay bills. Cash flow management is about ensuring you always have enough money coming in to cover what's going out, plus a buffer for emergencies. According to U.S. Bank, 82% of small businesses fail due to poor cash flow management—not lack of profitability. Mastering this skill is non-negotiable for sustainable business growth.",
    whyItHelps: "Effective cash flow management reduces stress, enables you to take advantage of opportunities (bulk discounts, strategic investments), and prevents the crisis of scrambling to make payroll or pay suppliers. It gives you control and predictability, allowing you to make informed decisions rather than reactive moves. Good cash flow management also makes you more attractive to lenders and investors if you need capital.",
    deepDive: "Many entrepreneurs confuse profit with cash flow. Profit is revenue minus expenses on your income statement. Cash flow is the actual money moving in and out of your bank account. You can be profitable but cash-poor if customers pay slowly, you invest heavily in inventory, or you have large upfront expenses. The cash conversion cycle matters: the faster you collect from customers and the slower you pay suppliers (ethically and contractually), the better your cash position. Understanding timing—when money arrives vs. when bills are due—is crucial for avoiding cash crunches.",
    actionSteps: [
      "**Create a 90-Day Cash Flow Forecast:** Use a simple spreadsheet with three columns: Date, Money In (expected), Money Out (expected). List every expected income source and every known expense for the next 90 days. Update this weekly. You'll quickly see if you're heading toward a cash shortage and can act proactively (delay purchases, accelerate collections, secure a line of credit).",
      "**Implement Net-30 Payment Terms:** Bill clients with payment due in 30 days or less. For new clients or large invoices, consider requiring a deposit (30-50%) upfront to reduce risk. The faster you get paid, the healthier your cash flow. Offer small discounts for immediate payment (e.g., '2% discount if paid within 10 days') to incentivize faster payment.",
      "**Extend Your Payables (Strategically):** Negotiate longer payment terms with suppliers where possible (Net 60 or 90 instead of Net 30). Pay on the due date, not earlier—keeping cash in your account longer improves your position. However, maintain good relationships; don't be 'that client' who always pays late without arrangement. Consider using business credit cards for purchases to extend payment by 30-60 days (and earn rewards).",
      "**Build a Cash Reserve:** Aim for 3-6 months of operating expenses in a separate savings account. Start small if needed: save 5-10% of revenue monthly until you hit this target. This reserve protects against emergencies (lost client, slow season, equipment failure) and prevents panic-driven decisions. Peace of mind is worth the 'opportunity cost' of having cash sitting in savings.",
      "**Track Accounts Receivable Religiously:** Know who owes you money and when payment is due. Send invoices immediately (don't wait until month-end). Follow up promptly on overdue invoices: friendly reminder at 7 days past due, phone call at 14 days, escalation at 30 days. Consider using invoicing software that sends automatic reminders (FreshBooks, QuickBooks Online, Wave).",
      "**Reduce Unnecessary Expenses:** Audit your expenses monthly. Cancel subscriptions you don't use. Renegotiate contracts (insurance, software, rent). Cut costs that don't directly contribute to revenue or critical operations. Ask: 'If I cut this, what's the worst that happens?' Often the answer is 'not much,' revealing the expense is discretionary, not essential."
    ],
    practicalTips: [
      "Use accounting software (QuickBooks, Xero, FreshBooks) to automate tracking and generate cash flow reports",
      "Set up separate bank accounts for different purposes: operating, taxes, profit, emergency fund—prevents accidental overspending",
      "Review your cash flow forecast weekly (Friday afternoons work well) to stay ahead of problems",
      "Offer multiple payment methods (credit card, ACH, PayPal) to make it easy for customers to pay you quickly",
      "Consider a line of credit before you need it—banks lend more easily when you don't desperately need money"
    ],
    commonMistakes: [
      "Confusing profit with cash flow—you can be profitable while running out of money",
      "Not planning for taxes (set aside 25-30% of profit quarterly to avoid year-end panic)",
      "Growing too fast without ensuring cash can support increased inventory, payroll, or expenses",
      "Not having a backup plan for cash shortages (line of credit, savings, or ability to cut costs quickly)"
    ]
  }
};

export default function QuickLessonPage() {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [notes, setNotes] = useState('');
  const [lessonId, setLessonId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lesson = urlParams.get('lesson');
    
    if (lesson && quickLessons[lesson]) {
      setCurrentLesson(quickLessons[lesson]);
      setLessonId(lesson);
    } else {
      navigate(createPageUrl("QuickLessons"));
    }

    const savedSteps = localStorage.getItem(`quick_lesson_${lesson}_steps`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    const savedNotes = localStorage.getItem(`quick_lesson_${lesson}_notes`);
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
    if (lessonId) {
      localStorage.setItem(`quick_lesson_${lessonId}_steps`, JSON.stringify(newCompletedSteps));
    }
  };

  const handleSaveNotes = () => {
    if (lessonId) {
      localStorage.setItem(`quick_lesson_${lessonId}_notes`, notes);
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

  if (!currentLesson) {
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
  const totalSteps = currentLesson.actionSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;
  const isMorningRoutineLesson = lessonId === 'morning-routine';

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <button
              onClick={() => navigate(createPageUrl("QuickLessons"))}
              className="btn btn-ghost mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quick Lessons</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[var(--text-soft)]" />
              <span className="text-sm text-[var(--text-soft)]">{currentLesson.readTime}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-1">
              <Lightbulb className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">{currentLesson.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-soft)]">
                <span>{currentLesson.category}</span>
                <span>•</span>
                <span>{completedStepsCount}/{totalSteps} steps completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Morning Routine Interactive CTA */}
        {isMorningRoutineLesson && (
          <div className="card p-6 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">🎯 Build Your Custom Morning Routine!</h3>
                <p className="text-white/90 mb-4">
                  Don't just read about it - create your personalized morning routine with our interactive builder. 
                  Design your perfect morning step-by-step and track your progress daily.
                </p>
                <button
                  onClick={() => navigate(createPageUrl('MorningRoutineBuilder'))}
                  className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Build My Morning Routine →
                </button>
              </div>
            </div>
          </div>
        )}

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
            {currentLesson.overview}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentLesson.whyItHelps}</p>
          </div>
        </div>

        {/* Deep Dive Section */}
        {currentLesson.deepDive && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[var(--primary-gold)]" />
              Deep Dive: Understanding the Details
            </h2>
            <p className="text-[var(--text-main)] leading-relaxed text-base">
              {currentLesson.deepDive}
            </p>
          </div>
        )}

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Step-by-Step Action Plan</h2>
          <div className="space-y-4">
            {currentLesson.actionSteps.map((step, index) => (
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
              {currentLesson.practicalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--text-main)] text-base">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Mistakes */}
        {currentLesson.commonMistakes && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-6 rounded-md">
              <ul className="space-y-3">
                {currentLesson.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-600 font-bold text-lg">×</span>
                    <span className="text-[var(--text-main)] text-base">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tools & Resources */}
        {currentLesson.tools && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Recommended Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h4 className="font-semibold text-[var(--text-main)] mb-2">{tool.name}</h4>
                  <p className="text-sm text-[var(--text-soft)]">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Notes & Action Items</h2>
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
            placeholder="Add your personal notes, insights, and action items from this lesson..."
            className="form-input h-32 resize-none mb-4"
          />
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-md">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Make the Most of This Lesson</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Write down specific action items you'll implement this week</li>
              <li>• Set deadlines for completing each action step</li>
              <li>• Note any tools or resources you want to explore further</li>
              <li>• Track results and iterate based on what you learn</li>
            </ul>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="card p-8 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 inline-block rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Lesson Complete!</h3>
            <p className="text-[var(--text-soft)] mb-4">
              Great job completing this lesson. Now it's time to implement what you've learned!
            </p>
            <button
              onClick={() => navigate(createPageUrl("QuickLessons"))}
              className="btn btn-primary"
            >
              Explore More Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
}