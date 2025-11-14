import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/entities/User';
import { Lightbulb, Zap, Clock, Target, Users, CheckCircle, Briefcase, Globe, DollarSign, Mail, Handshake, Star, ArrowRight } from 'lucide-react';

const lessons = [
  {
    id: "domain-name",
    title: "How to Choose the Right Domain Name",
    description: "Your domain is your digital foundation. Learn the psychology behind memorable domain names, common pitfalls to avoid, and a step-by-step process to find a domain that aligns with your brand identity and long-term business vision.",
    category: "Branding",
    icon: Globe,
    keyTakeaways: [
      "Understand the psychology of memorable domain names",
      "Master the art of balancing brevity with clarity",
      "Learn how domain extensions impact credibility and SEO"
    ]
  },
  {
    id: "morning-routine",
    title: "The Entrepreneur's Morning Routine",
    description: "Design and build your personalized morning routine step-by-step. Discover how successful entrepreneurs structure their mornings to maximize energy, focus, and productivity. Create a sustainable routine that sets you up for peak performance throughout the day.",
    category: "Productivity",
    icon: Zap,
    keyTakeaways: [
      "Build your custom morning routine with our interactive tool",
      "Learn the science behind peak morning productivity",
      "Implement habits used by top-performing entrepreneurs"
    ]
  },
  {
    id: "customer-research",
    title: "5-Minute Customer Research",
    description: "Master rapid customer research techniques that deliver deep insights without expensive surveys. Learn to extract valuable customer intelligence from existing data, social listening, and strategic questions that reveal what customers truly want.",
    category: "Market Research",
    icon: Users,
    keyTakeaways: [
      "Leverage existing data for customer insights",
      "Master social listening techniques for real-time feedback",
      "Ask the right questions that reveal true customer needs"
    ]
  },
  {
    id: "pricing-psychology",
    title: "Pricing Psychology Essentials",
    description: "Discover the cognitive biases and psychological principles that influence purchasing decisions. Learn advanced pricing strategies including anchoring, charm pricing, and value framing that can increase conversions and maximize revenue without competing on price alone.",
    category: "Sales",
    icon: DollarSign,
    keyTakeaways: [
      "Apply proven pricing psychology principles",
      "Use anchoring and framing to influence perception",
      "Design pricing tiers that maximize revenue"
    ]
  },
  {
    id: "social-proof",
    title: "Building Social Proof Fast",
    description: "Create powerful credibility signals even when starting from zero. Learn systematic approaches to generating testimonials, case studies, and social validation that overcome buyer skepticism and accelerate trust-building with potential customers.",
    category: "Marketing",
    icon: Star,
    keyTakeaways: [
      "Generate authentic testimonials quickly",
      "Create compelling case studies that sell",
      "Leverage micro-influencers for instant credibility"
    ]
  },
  {
    id: "email-sequences",
    title: "High-Converting Email Sequences",
    description: "Design automated email workflows that nurture leads into paying customers. Master the art of storytelling in email, strategic timing, and psychological triggers that drive action. Learn to build sequences that work 24/7 to grow your business.",
    category: "Email Marketing",
    icon: Mail,
    keyTakeaways: [
      "Craft compelling email subject lines that get opens",
      "Structure sequences for maximum conversion",
      "Use storytelling and psychology to drive action"
    ]
  },
  {
    id: "productivity-hacks",
    title: "10 Productivity Hacks for Entrepreneurs",
    description: "Implement battle-tested productivity systems used by successful entrepreneurs. Learn to eliminate decision fatigue, optimize your energy levels, and create systems that multiply your output. Transform from busy to truly productive with these proven techniques.",
    category: "Productivity",
    icon: Clock,
    keyTakeaways: [
      "Master time-blocking and energy management",
      "Eliminate decision fatigue with smart systems",
      "Implement the Pomodoro Technique effectively"
    ]
  },
  {
    id: "sales-conversations",
    title: "Mastering Sales Conversations",
    description: "Transform your sales approach with frameworks that feel natural and authentic. Learn active listening techniques, objection handling, and how to guide prospects to yes without being pushy. Discover the psychology of persuasion that works.",
    category: "Sales",
    icon: Handshake,
    keyTakeaways: [
      "Master the 80/20 listening rule in sales",
      "Handle objections using the Feel-Felt-Found method",
      "Close deals without pressure tactics"
    ]
  },
  {
    id: "business-structures",
    title: "Choosing Your Business Structure",
    description: "Navigate the complex world of business entities with clarity. Understand the legal, tax, and liability implications of LLCs, S-Corps, and C-Corps. Make informed decisions that protect your assets and optimize your tax position for long-term success.",
    category: "Legal & Finance",
    icon: Briefcase,
    keyTakeaways: [
      "Understand liability protection across entity types",
      "Compare tax implications of different structures",
      "Know when to transition from sole proprietor to LLC"
    ]
  },
  {
    id: "networking-strategy",
    title: "Strategic Networking for Entrepreneurs",
    description: "Build a powerful network that drives real business opportunities. Learn to identify high-value connections, cultivate meaningful relationships, and provide value that creates reciprocity. Transform networking from awkward to authentic.",
    category: "Networking",
    icon: Users,
    keyTakeaways: [
      "Identify and connect with high-value contacts",
      "Build relationships that create opportunities",
      "Give value first to receive value later"
    ]
  },
  {
    id: "cash-flow-management",
    title: "Cash Flow Management Basics",
    description: "Master the lifeblood of your business with proven cash flow strategies. Learn to forecast accurately, manage receivables, and create cash reserves. Understand the metrics that matter and avoid the cash flow mistakes that kill businesses.",
    category: "Finance",
    icon: DollarSign,
    keyTakeaways: [
      "Create accurate 90-day cash flow forecasts",
      "Implement systems for managing receivables",
      "Build emergency cash reserves systematically"
    ]
  }
];

export default function QuickLessons() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No longer need to fetch user or check access
    setLoading(false);
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-gold)]"></div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="card p-6 md:p-8">
          <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl">Quick Lessons</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg">11 practical business skills for immediate action and results.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-lg mt-6">
            <div className="flex items-start space-x-4">
              <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--text-main)] mb-3 text-lg">Why Quick Lessons Are Different</h3>
                
                <p className="text-[var(--text-main)] leading-relaxed mb-3">
                  These aren't your typical business tutorials. Quick Lessons are <strong>laser-focused, battle-tested frameworks</strong> 
                  distilled from years of real-world entrepreneurial experience. Each lesson cuts through the noise to give you exactly 
                  what you need to know—nothing more, nothing less.
                </p>
                
                <p className="text-[var(--text-main)] leading-relaxed mb-3">
                  Unlike theoretical courses that leave you wondering "now what?", every Quick Lesson is designed for <strong>immediate implementation</strong>. 
                  You'll get specific action steps, practical tips drawn from successful businesses, and recommended tools that integrate 
                  seamlessly into your workflow. This is actionable knowledge you can apply today and see results from this week.
                </p>
                
                <p className="text-[var(--text-main)] leading-relaxed">
                  Whether you're choosing a domain name, mastering sales conversations, or building social proof from zero, these lessons 
                  provide the <strong>strategic frameworks and tactical execution plans</strong> that successful entrepreneurs use daily. 
                  Each one is crafted to save you hours of research and costly trial-and-error by giving you proven processes that work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="card p-6 flex flex-col group hover:border-[var(--primary-gold)] hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-colors">
                  <lesson.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold uppercase text-[var(--text-soft)] tracking-wider">{lesson.category}</div>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 flex-grow group-hover:text-[var(--primary-gold)] transition-colors">
                {lesson.title}
              </h3>
              <p className="text-sm text-[var(--text-soft)] line-clamp-3 mb-4">{lesson.description}</p>
              
              {/* Key Takeaways */}
              {lesson.keyTakeaways && (
                <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-100 dark:border-yellow-800">
                  <p className="text-xs font-semibold text-[var(--text-main)] mb-2">Key Takeaways:</p>
                  <ul className="space-y-1">
                    {lesson.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="text-xs text-[var(--text-soft)] flex items-start">
                        <CheckCircle className="w-3 h-3 text-[var(--primary-gold)] mr-1 flex-shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-auto">
                <div className="text-xs text-[var(--text-soft)] flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Quick read</span>
                </div>
                <Link
                  to={createPageUrl(`QuickLesson?lesson=${lesson.id}`)}
                  className="text-[var(--primary-gold)] text-sm font-medium group-hover:underline flex items-center"
                >
                  Start Learning <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}