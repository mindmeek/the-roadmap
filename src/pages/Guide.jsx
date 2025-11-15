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