
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Lightbulb, ArrowLeft, CheckCircle, Clock, Target, Save, Copy, Zap } from "lucide-react";

const quickLessons = {
  "domain-name": {
    title: "How to Choose the Right Domain Name",
    readTime: "8 min read",
    category: "Branding",
    overview: "Your domain name is your digital real estate address. It's often the first impression potential customers have of your business. A well-chosen domain can boost credibility, improve SEO, and make your brand memorable.",
    whyItHelps: "A strong domain name builds trust, improves brand recall, and makes it easier for customers to find and remember your business. It also impacts your search engine rankings and professional credibility.",
    actionSteps: [
      "**Brainstorm Keywords:** List 10-15 words that describe your business, products, or services. Include industry terms and benefits you provide.",
      "**Keep It Short and Simple:** Aim for 6-14 characters. Shorter domains are easier to type, remember, and less prone to typos.",
      "**Choose the Right Extension:** .com is still king for businesses. Only consider .net, .org, or industry-specific extensions if .com isn't available.",
      "**Avoid Hyphens and Numbers:** These make domains harder to remember and communicate verbally. They also look less professional.",
      "**Check Availability:** Use tools like Namecheap, GoDaddy, or Google Domains to check if your preferred names are available.",
      "**Test It Out Loud:** Say your domain name to friends. Is it easy to spell and remember? Does it sound professional?"
    ],
    practicalTips: [
      "Use tools like NameMesh, Lean Domain Search, or Bust a Name for domain ideas",
      "Check social media availability for your domain name across platforms",
      "Consider buying multiple extensions (.com, .net, .org) to protect your brand",
      "Avoid trademark issues by researching existing business names"
    ],
    tools: [
      { name: "The Command Hub Website Builder", description: "Choose from professional templates and customize with drag & drop editor" },
      { name: "Namecheap", description: "Domain registration and availability checking" },
      { name: "Google Domains", description: "Google's domain registration service" }
    ]
  },
  "swot-analysis": {
    title: "SWOT Analysis for Business Success",
    readTime: "12 min read",
    category: "Strategy",
    overview: "SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats) is a strategic planning framework that helps you understand your business's current position and develop actionable strategies for growth.",
    whyItHelps: "SWOT analysis provides clarity on where your business stands, reveals untapped opportunities, identifies potential risks, and helps you make informed strategic decisions based on honest self-assessment.",
    actionSteps: [
      "**Identify Your Strengths:** List what your business does well. Consider unique skills, resources, competitive advantages, strong relationships, or superior processes.",
      "**Acknowledge Your Weaknesses:** Honestly assess areas needing improvement. This might include skill gaps, resource limitations, or operational inefficiencies.",
      "**Spot Opportunities:** Look for external factors you can leverage. Market trends, competitor gaps, technology advances, or regulatory changes.",
      "**Recognize Threats:** Identify external challenges that could harm your business. Competition, economic downturns, changing customer preferences, or new regulations.",
      "**Create Action Plans:** For each quadrant, develop 2-3 specific strategies to leverage strengths, address weaknesses, capitalize on opportunities, and mitigate threats.",
      "**Review Quarterly:** SWOT analysis isn't a one-time exercise. Update it every 3 months as your business and market evolve."
    ],
    practicalTips: [
      "Get input from employees, customers, and advisors for objective perspectives",
      "Use data and metrics to support your assessments, not just gut feelings",
      "Prioritize items in each quadrant by impact and feasibility",
      "Turn your SWOT into a strategic action plan with deadlines and owners"
    ],
    tools: [
      { name: "The Command Hub Form Builder", description: "Create surveys to gather SWOT input from team and customers" },
      { name: "The Command Hub CRM", description: "Track customer feedback and market data for analysis" },
      { name: "Google Sheets", description: "Free SWOT analysis templates for organization" }
    ]
  },
  "morning-routine": {
    title: "The Entrepreneur's Morning Routine",
    readTime: "10 min read",
    category: "Productivity",
    overview: "How you start your morning sets the tone for your entire day. A structured morning routine helps entrepreneurs maintain peak performance, reduce stress, and consistently work on their most important goals.",
    whyItHelps: "A powerful morning routine gives you control over your day, reduces decision fatigue, boosts energy levels, and ensures you tackle high-priority tasks when your willpower is strongest.",
    actionSteps: [
      "**Wake Up Consistently:** Choose a wake-up time and stick to it 7 days a week. Consistency regulates your circadian rhythm and improves sleep quality.",
      "**Hydrate First:** Drink 16-24 oz of water immediately upon waking. Add lemon for extra benefits. Your body is dehydrated after 7-8 hours without water.",
      "**Move Your Body:** Spend 10-20 minutes on physical activity. This could be stretching, yoga, a walk, or a full workout. Movement increases alertness and energy.",
      "**Practice Mindfulness:** Dedicate 5-15 minutes to meditation, deep breathing, or journaling. This centers your mind and reduces anxiety about the day ahead.",
      "**Review Your Goals:** Spend 5 minutes reviewing your top 3 priorities for the day. This ensures you start with intention and focus.",
      "**Eat a Healthy Breakfast:** Fuel your body with protein, healthy fats, and complex carbs. Avoid sugar crashes that hurt afternoon productivity."
    ],
    practicalTips: [
      "Prepare the night before: lay out clothes, prep breakfast, charge devices",
      "Start small: begin with just 2-3 elements and gradually add more",
      "Track your routine for 30 days to build the habit",
      "Adjust timing based on your natural energy patterns"
    ],
    tools: [
      { name: "The Command Hub Mobile App", description: "Set daily reminders and track your routine on the go" },
      { name: "The Command Hub Calendar", description: "Schedule your morning routine blocks and set reminders" },
      { name: "Headspace", description: "Guided meditation and mindfulness exercises" }
    ]
  },
  "customer-research": {
    title: "5-Minute Customer Research",
    readTime: "7 min read",
    category: "Market Research",
    overview: "Understanding your customers doesn't require expensive market research. With the right approach, you can gather valuable customer insights quickly and inexpensively to improve your products and marketing.",
    whyItHelps: "Quick customer research helps you make data-driven decisions, identify pain points, validate ideas, and create products and messages that truly resonate with your target audience.",
    actionSteps: [
      "**Use Your CRM Data:** Check your customer demographics, purchase history, and interaction patterns in The Command Hub's CRM for valuable insights.",
      "**Social Media Listening:** Search your brand name, product keywords, and competitor names on social platforms using The Command Hub's Social Media Planner.",
      "**Survey Existing Customers:** Create a 3-question survey using The Command Hub's Form Builder: What brought you to us? What's your biggest challenge? What would make you recommend us?",
      "**Check Review Sites:** Read reviews of your business and competitors on Google, Yelp, Facebook using The Command Hub's Review Management feature.",
      "**Analyze Customer Communications:** Review SMS and email interactions through The Command Hub to identify common questions and concerns.",
      "**Interview One Customer Weekly:** Schedule brief 15-minute calls with customers. Ask about their challenges, goals, and experience with your product."
    ],
    practicalTips: [
      "Create customer personas based on your CRM data and research findings",
      "Keep a customer feedback spreadsheet to track common themes",
      "Use The Command Hub's automation to send follow-up research surveys",
      "Join Facebook groups and online communities where your customers hang out"
    ],
    tools: [
      { name: "The Command Hub CRM", description: "Track customer demographics, behavior, and interaction history" },
      { name: "The Command Hub Form Builder", description: "Create quick customer research surveys" },
      { name: "The Command Hub Review Management", description: "Monitor and analyze customer reviews across platforms" }
    ]
  },
  "pricing-psychology": {
    title: "Pricing Psychology Essentials",
    readTime: "9 min read",
    category: "Sales",
    overview: "Pricing isn't just about covering costs and making profit. How you present and structure your prices dramatically affects customer perception, purchase decisions, and your overall revenue.",
    whyItHelps: "Understanding pricing psychology helps you maximize revenue, improve conversion rates, and position your products appropriately in the market without competing solely on price.",
    actionSteps: [
      "**Use Charm Pricing Strategically:** Prices ending in 9 (like $19.99) can increase sales by up to 30% compared to round numbers, especially for lower-priced items.",
      "**Create Price Anchoring:** Show a higher-priced option first to make your main offering seem more reasonable. This is why menus list expensive items at the top.",
      "**Bundle Products Effectively:** Group products together at a discount using The Command Hub's payment features. Customers perceive bundles as better value.",
      "**Offer Three Tiers:** Present three pricing options with your preferred choice in the middle using The Command Hub's sales funnels. Most people choose the middle option.",
      "**Show Value Before Price:** Always communicate benefits and value before revealing the price in your sales funnels and proposals.",
      "**Use Social Proof:** Display customer testimonials and success stories near pricing using The Command Hub's review management system."
    ],
    practicalTips: [
      "Test different price points using The Command Hub's sales funnel A/B testing",
      "Use The Command Hub's payment system to offer payment plans for higher prices",
      "Remove dollar signs in digital materials - they can create 'payment pain'",
      "Regularly review and adjust prices based on The Command Hub's sales data"
    ],
    tools: [
      { name: "The Command Hub Sales Funnels", description: "Create and test different pricing presentations" },
      { name: "The Command Hub Payment System", description: "Set up payment plans and process transactions" },
      { name: "The Command Hub Review Management", description: "Gather and display social proof near pricing" }
    ]
  },
  "social-proof": {
    title: "Building Social Proof Fast",
    readTime: "6 min read",
    category: "Marketing",
    overview: "Social proof is the psychological phenomenon where people look to others' actions to guide their own behavior. For new businesses, creating social proof quickly is essential for building trust and credibility.",
    whyItHelps: "Social proof reduces the perceived risk of buying from you, increases conversion rates, builds brand credibility, and helps overcome the natural skepticism people have toward new businesses.",
    actionSteps: [
      "**Collect Testimonials Immediately:** Use The Command Hub's review management system to automatically request testimonials after every successful transaction or interaction.",
      "**Create Case Studies:** Document customer success stories using The Command Hub's CRM data to show before/after scenarios with specific results.",
      "**Display Customer Count:** Show how many customers you've served using data from The Command Hub's CRM and payment systems.",
      "**Leverage Personal Networks:** Use The Command Hub's SMS marketing to ask friends, family, and colleagues to leave honest reviews on Google and Facebook.",
      "**Partner with Influencers:** Connect with micro-influencers using The Command Hub's CRM to track partnerships and collaborations.",
      "**Show Media Mentions:** Create a press section on your website in The Command Hub to display any media coverage or industry recognition."
    ],
    practicalTips: [
      "Use The Command Hub's automation to send review requests 24 hours after purchase",
      "Include photos and specific results in testimonials when possible",
      "Create a simple email template in The Command Hub for review requests",
      "Respond to all reviews professionally through The Command Hub's review management"
    ],
    tools: [
      { name: "The Command Hub Review Management", description: "Collect, manage, and display customer reviews" },
      { name: "The Command Hub CRM", description: "Track customer success stories and case study data" },
      { name: "The Command Hub Website Builder", description: "Create testimonial pages and social proof sections" }
    ]
  },
  "email-sequences": {
    title: "High-Converting Email Sequences",
    readTime: "10 min read",
    category: "Email Marketing",
    overview: "Email sequences are automated series of emails sent to nurture leads, onboard new customers, or recover abandoned carts. They work 24/7 to build relationships and drive sales for your business.",
    whyItHelps: "Automated email sequences save you time, ensure consistent communication with your audience, build trust on autopilot, and guide potential customers through the sales process without manual intervention.",
    actionSteps: [
      "**Define Your Goal:** What do you want this sequence to achieve? Use The Command Hub's marketing automation to set up different sequences for different goals.",
      "**Segment Your Audience:** Use The Command Hub's CRM to create targeted lists based on customer behavior, interests, and purchase history.",
      "**Map Out the Sequence:** Plan your emails using The Command Hub's automation workflow builder with proper timing between each message.",
      "**Write Compelling Subject Lines:** Test different subject lines using The Command Hub's A/B testing features to optimize open rates.",
      "**Provide Value in Every Email:** Each email should offer tips, resources, or insights. Use The Command Hub's content library to store valuable resources.",
      "**Include Clear Call to Actions:** Direct readers to your landing pages in The Command Hub, booking calendar, or payment system.",
      "**Track and Optimize:** Monitor performance using The Command Hub's detailed analytics and adjust your sequences accordingly."
    ],
    practicalTips: [
      "Use The Command Hub's personalization features to include subscriber names and relevant details",
      "Keep emails focused on single topics using The Command Hub's email templates",
      "Set up automatic sequences in The Command Hub for welcome series, nurture campaigns, and follow-ups",
      "Use The Command Hub's mobile app to monitor email performance on the go"
    ],
    tools: [
      { name: "The Command Hub Marketing Automation", description: "Create sophisticated email sequences and workflows" },
      { name: "The Command Hub CRM", description: "Segment audiences and track email engagement" },
      { name: "The Command Hub Analytics", description: "Monitor email performance and optimize campaigns" }
    ]
  },
  "productivity-hacks": {
    title: "10 Productivity Hacks for Entrepreneurs",
    readTime: "12 min read",
    category: "Productivity",
    overview: "Entrepreneurs wear many hats, making productivity essential for success. These hacks are simple yet powerful techniques to help you get more done in less time, reduce stress, and focus on what truly matters.",
    whyItHelps: "By implementing these hacks, you can reclaim your time, reduce overwhelm, improve your focus, and make consistent progress on your most important business goals.",
    actionSteps: [
      "**Eat The Frog:** Tackle your most difficult task first thing in the morning. Use The Command Hub's calendar to block time for your hardest tasks.",
      "**Time Blocking:** Schedule your entire day using The Command Hub's appointment calendar system to eliminate decision-making and ensure focus.",
      "**The Pomodoro Technique:** Work in focused 25-minute intervals. Use The Command Hub's mobile app to set timers and track productivity.",
      "**The Two-Minute Rule:** If a task takes less than two minutes, do it immediately. Use The Command Hub's CRM to quickly update contacts and notes.",
      "**Batch Similar Tasks:** Group activities together using The Command Hub's calendar. Answer all emails, make calls, and update CRM in dedicated blocks.",
      "**Set Daily Priorities:** Use The Command Hub's dashboard to identify your top 3 daily priorities and track completion.",
      "**Turn Off Notifications:** Use The Command Hub's mobile app notification settings to control when you receive alerts during focus time.",
      "**Use The Command Hub's Automation:** Set up automated workflows to handle repetitive tasks like follow-ups, appointment reminders, and lead nurturing.",
      "**Plan Your Day:** Use The Command Hub's calendar the night before to plan your priorities and schedule for the next day.",
      "**Delegate Through Automation:** Use The Command Hub's marketing automation to handle tasks that don't require personal attention."
    ],
    practicalTips: [
      "Use The Command Hub's mobile app to stay productive on the go",
      "Set up automated reminders in The Command Hub for important tasks",
      "Use The Command Hub's social media planner to batch content creation",
      "Review weekly performance using The Command Hub's analytics dashboard"
    ],
    tools: [
      { name: "The Command Hub Calendar", description: "Advanced scheduling and time blocking features" },
      { name: "The Command Hub Mobile App", description: "Manage your business productivity on the go" },
      { name: "The Command Hub Marketing Automation", description: "Automate repetitive business tasks" }
    ]
  },
  "sales-conversations": {
    title: "Mastering Sales Conversations",
    readTime: "11 min read",
    category: "Sales",
    overview: "Effective sales conversations are not about pushy tactics; they're about understanding a customer's needs and showing how your product or service is the best solution. Mastering this skill is crucial for any entrepreneur.",
    whyItHelps: "By improving your sales conversations, you can increase your conversion rates, build stronger customer relationships, and gain valuable insights into your customers' needs and challenges.",
    actionSteps: [
      "**Start with Research:** Use The Command Hub's CRM to research prospects before calls. Review their interaction history and previous touchpoints.",
      "**Listen More Than You Talk:** Aim for an 80/20 balance. Use The Command Hub's call recording features (where legal) to review your conversations.",
      "**Ask Open-Ended Questions:** Prepare questions in The Command Hub's CRM that start with 'What,' 'How,' and 'Why' to encourage detailed responses.",
      "**Focus on Pain Points:** Use The Command Hub's CRM to document customer challenges and pain points for future reference.",
      "**Connect Features to Benefits:** Create benefit-focused scripts in The Command Hub that connect your features to specific customer pain points.",
      "**Handle Objections:** Develop objection-handling scripts in The Command Hub using the 'Feel, Felt, Found' method for common concerns.",
      "**Establish Clear Next Steps:** Use The Command Hub's calendar to schedule follow-ups immediately after sales calls and send calendar invites."
    ],
    practicalTips: [
      "Use The Command Hub's business phone number for professional calling presence",
      "Create objection-handling templates in The Command Hub for quick reference",
      "Set up automated follow-up sequences in The Command Hub after sales calls",
      "Track sales conversation outcomes in The Command Hub's CRM for continuous improvement"
    ],
    tools: [
      { name: "The Command Hub CRM", description: "Track sales conversations, prospects, and deal progress" },
      { name: "The Command Hub Business Phone", description: "Professional calling with recording capabilities" },
      { name: "The Command Hub Calendar", description: "Schedule and manage sales calls and follow-ups" }
    ]
  },
  "mindset-resilience": {
    title: "Building Entrepreneurial Resilience",
    readTime: "9 min read",
    category: "Mindset",
    overview: "Entrepreneurship is a marathon of challenges and setbacks. Resilience is the mental toughness that allows you to bounce back from failure, adapt to change, and maintain your motivation through difficult times.",
    whyItHelps: "Resilience prevents burnout, improves decision-making under pressure, and is the single most important trait for long-term entrepreneurial success. It turns challenges into growth opportunities.",
    actionSteps: [
      "**Reframe Failure as Feedback:** Use The Command Hub's CRM to document lessons learned from setbacks and failed initiatives for future reference.",
      "**Practice Gratitude:** Use The Command Hub's mobile app to set daily reminders for gratitude practice and track your mindset progress.",
      "**Build a Strong Support Network:** Use The Command Hub's community builder to create a support network of fellow entrepreneurs and mentors.",
      "**Focus on What You Can Control:** Use The Command Hub's analytics to focus on metrics you can influence rather than external factors.",
      "**Celebrate Small Wins:** Track and celebrate milestones using The Command Hub's CRM and automated milestone emails to your team.",
      "**Prioritize Self-Care:** Use The Command Hub's calendar to schedule self-care activities and protect your mental health time.",
      "**Develop a Growth Mindset:** Document your learning journey using The Command Hub's courses feature to track personal development."
    ],
    practicalTips: [
      "Use The Command Hub's community feature to connect with other resilient entrepreneurs",
      "Set up automated encouraging messages to yourself using The Command Hub's SMS marketing",
      "Track your resilience journey using The Command Hub's analytics and reporting features",
      "Create a 'lessons learned' database in The Command Hub's CRM for future reference"
    ],
    tools: [
      { name: "The Command Hub Community Builder", description: "Connect with supportive entrepreneurs and mentors" },
      { name: "The Command Hub Mobile App", description: "Access mindset resources and reminders on the go" },
      { name: "The Command Hub Courses", description: "Access personal development and resilience training" }
    ]
  },
  "business-structures": {
    title: "Choosing Your Business Structure",
    readTime: "12 min read",
    category: "Legal & Finance",
    overview: "Choosing the right legal structure for your business (e.g., Sole Proprietorship, LLC, S-Corp) is a foundational decision that impacts your liability, taxes, and ability to raise money.",
    whyItHelps: "The right structure can protect your personal assets from business debts, save you thousands in taxes, and make your business more attractive to investors and partners.",
    actionSteps: [
      "**Understand Sole Proprietorship:** This is the default for a one-person business. Set up basic business processes in The Command Hub even as a sole proprietor.",
      "**Learn about LLC:** Most popular for small businesses. Use The Command Hub's payment system to keep business finances separate from personal.",
      "**Explore S-Corporation:** Can offer tax savings for profitable businesses. Use The Command Hub's financial tracking to determine when S-Corp election makes sense.",
      "**Consider C-Corporation:** Best for raising venture capital. The Command Hub's CRM can help track investor relationships and communications.",
      "**Consult a Professional:** Use The Command Hub's CRM to find and track relationships with lawyers and accountants in your area.",
      "**Register Your Business:** Use The Command Hub's form builder to organize required documents and track registration deadlines."
    ],
    practicalTips: [
      "Use The Command Hub's payment system to maintain separate business banking from day one",
      "Track business formation expenses and deadlines using The Command Hub's CRM",
      "Set up proper business processes in The Command Hub regardless of your chosen structure",
      "Use The Command Hub's document storage to keep formation documents organized"
    ],
    tools: [
      { name: "The Command Hub Payment System", description: "Separate business finances and track business income" },
      { name: "The Command Hub CRM", description: "Track relationships with legal and financial professionals" },
      { name: "LegalZoom", description: "Online business formation services" }
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

    // Load saved progress
    const savedSteps = localStorage.getItem(`quick_lesson_${lesson}_steps`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    const savedNotes = localStorage.getItem(`quick_lesson_${lesson}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [window.location.search, navigate]); // Added navigate to dependency array

  const handleStepToggle = (stepIndex) => {
    const newCompletedSteps = {
      ...completedSteps,
      [stepIndex]: !completedSteps[stepIndex]
    };
    setCompletedSteps(newCompletedSteps);
    if (lessonId) { // Ensure lessonId exists before saving
      localStorage.setItem(`quick_lesson_${lessonId}_steps`, JSON.stringify(newCompletedSteps));
    }
  };

  const handleSaveNotes = () => {
    if (lessonId) { // Ensure lessonId exists before saving
      localStorage.setItem(`quick_lesson_${lessonId}_notes`, notes);
      const button = document.getElementById('save-notes-btn');
      if (button) { // Check if button exists
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
            <div className="bg-gray-100 p-4 rounded-md mt-1">
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

        {/* Progress Tracker */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--text-main)]">Your Progress</h3>
            <span className="text-sm text-[var(--text-soft)]">{progressPercentage}% complete</span>
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
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

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentLesson.whyItHelps}</p>
          </div>
        </div>

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Action Steps</h2>
          <div className="space-y-4">
            {currentLesson.actionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-black rounded-md text-white">
                <div className="flex-1">
                  <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}></p>
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
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Practical Tips</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-md">
            <ul className="space-y-3">
              {currentLesson.practicalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--text-main)]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tools & Resources */}
        {currentLesson.tools && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Recommended Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-md">
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
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Make the Most of This Lesson</h4>
            <ul className="text-sm text-blue-800 space-y-1">
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
            <div className="bg-green-100 p-4 inline-block rounded-full mb-4">
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
