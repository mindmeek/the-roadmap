
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, Clock, Target, TrendingUp, Zap, Focus, Timer, BarChart3, Lightbulb, CheckCircle, ArrowRight, Star, Filter, Lock, Crown } from "lucide-react";
import { User } from '@/entities/User'; 

const mindsetHacks = [
  {
    id: "growth-mindset",
    title: "Growth vs Fixed Mindset",
    description: "Transform your relationship with challenges and failure. Learn how developing a growth mindset unlocks your potential, helps you embrace difficult situations as opportunities, and builds the mental resilience needed for entrepreneurial success. Discover the neuroscience behind mindset shifts.",
    readTime: "6 min",
    icon: TrendingUp,
    category: "Mindset",
    difficulty: "Beginner",
    impact: "High",
    keyBenefits: [
      "Reframe failures as valuable learning experiences",
      "Build resilience through challenge acceptance",
      "Develop continuous improvement mindset"
    ]
  },
  {
    id: "decision-fatigue",
    title: "Overcoming Decision Fatigue",
    description: "Preserve your mental energy for critical decisions by eliminating trivial choices. Learn why Steve Jobs wore the same outfit daily, how to structure your day to protect decision-making capacity, and proven strategies to optimize your cognitive resources for high-impact business choices.",
    readTime: "5 min",
    icon: Brain,
    category: "Mental Performance",
    difficulty: "Intermediate",
    impact: "Medium",
    keyBenefits: [
      "Save mental energy for important decisions",
      "Create decision-making frameworks",
      "Reduce cognitive load through automation"
    ]
  },
  {
    id: "power-of-no",
    title: "The Power of Saying No",
    description: "Master the art of strategic refusal to protect your time and energy. Learn boundary-setting techniques that preserve relationships while prioritizing your goals. Discover how saying no to good opportunities creates space for great ones, and develop scripts for declining requests gracefully.",
    readTime: "4 min",
    icon: Target,
    category: "Boundaries",
    difficulty: "Intermediate",
    impact: "Medium",
    keyBenefits: [
      "Protect time for high-priority projects",
      "Maintain healthy professional boundaries",
      "Focus energy on aligned opportunities"
    ]
  },
  {
    id: "three-ps",
    title: "The Three P's of Time Management",
    description: "Implement a systematic approach to time mastery through Prioritize, Plan, and Perform. Learn the Eisenhower Matrix for task prioritization, advanced time-blocking techniques, and execution strategies that ensure your most important work gets done consistently.",
    readTime: "4 min",
    icon: Timer,
    category: "Productivity",
    difficulty: "Beginner",
    impact: "High",
    keyBenefits: [
      "Master priority-based task management",
      "Implement effective time-blocking systems",
      "Reduce overwhelm through structure"
    ]
  },
  {
    id: "mental-models",
    title: "Essential Mental Models for Entrepreneurs",
    description: "Upgrade your cognitive toolkit with powerful thinking frameworks used by successful entrepreneurs. Master first principles thinking, second-order consequences, inversion, and other models that transform how you approach problems. Learn to think like Charlie Munger and make better strategic decisions.",
    readTime: "10 min",
    icon: Brain,
    category: "Decision Making",
    difficulty: "Advanced",
    impact: "High",
    keyBenefits: [
      "Apply first principles thinking to complex problems",
      "Use inversion to avoid failure modes",
      "Think in second-order consequences"
    ]
  },
  {
    id: "8020-rule",
    title: "The 80/20 Rule (Pareto Principle)",
    description: "Discover how 20% of your activities drive 80% of your results. Learn to identify your high-leverage tasks, eliminate time-wasters, and focus your energy where it creates maximum impact. Master the art of ruthless prioritization using data-driven analysis and strategic thinking.",
    readTime: "5 min",
    icon: Target,
    category: "Productivity",
    difficulty: "Intermediate",
    impact: "High",
    keyBenefits: [
      "Identify your highest-impact activities",
      "Eliminate or delegate low-value tasks",
      "Multiply results through strategic focus"
    ]
  },
  {
    id: "flow-state",
    title: "Achieving Flow State",
    description: "Enter the zone of peak performance where time disappears and your best work emerges effortlessly. Learn the neuroscience of flow, how to trigger it consistently, and environmental factors that enhance or inhibit this optimal state. Become 500% more productive during flow sessions.",
    readTime: "7 min",
    icon: Focus,
    category: "Performance",
    difficulty: "Intermediate",
    impact: "High",
    keyBenefits: [
      "Trigger flow states consistently",
      "Optimize environment for deep focus",
      "Achieve 5x productivity during sessions"
    ]
  },
  {
    id: "fear-setting",
    title: "Fear Setting Exercise",
    description: "Transform paralyzing fear into actionable clarity using Tim Ferriss's proven framework. Learn to define worst-case scenarios realistically, develop prevention strategies, and create recovery plans. Discover how fear-setting reveals that risks are often more manageable than you imagine.",
    readTime: "8 min",
    icon: Target,
    category: "Risk Management",
    difficulty: "Advanced",
    impact: "High",
    keyBenefits: [
      "Quantify and rationalize your fears",
      "Create prevention and recovery plans",
      "Take calculated risks with confidence"
    ]
  },
  {
    id: "systems-thinking",
    title: "Systems Thinking for Business",
    description: "Build a business that runs without you. Learn to identify systemizable processes, create standard operating procedures, and leverage automation to scale efficiently. Discover how to document knowledge, build repeatable workflows, and transition from operator to CEO.",
    readTime: "9 min",
    icon: BarChart3,
    category: "Business Strategy",
    difficulty: "Advanced",
    impact: "High",
    keyBenefits: [
      "Create systems that enable scaling",
      "Free yourself from day-to-day operations",
      "Build a valuable, sellable business asset"
    ]
  },
  {
    id: "minimum-viable-progress",
    title: "Minimum Viable Progress",
    description: "Never have a zero-progress day again. Learn to overcome resistance and procrastination by committing to impossibly small actions that build unstoppable momentum. Discover why 2 minutes of work is infinitely better than zero, and how tiny consistent actions compound into massive results.",
    readTime: "5 min",
    icon: Zap,
    category: "Consistency",
    difficulty: "Beginner",
    impact: "Medium",
    keyBenefits: [
      "Overcome procrastination with tiny commitments",
      "Build momentum from minimal actions",
      "Maintain consistency even on tough days"
    ]
  },
  {
    id: "compound-effect",
    title: "The Compound Effect in Business",
    description: "Harness the power of small, consistent actions that compound into extraordinary results. Understand the mathematics of exponential growth, learn to identify compounding activities in your business, and develop the patience and discipline to trust the process when results aren't immediately visible.",
    readTime: "6 min",
    icon: BarChart3,
    category: "Growth",
    difficulty: "Beginner",
    impact: "High",
    keyBenefits: [
      "Leverage exponential growth in business",
      "Build consistency that creates momentum",
      "Trust long-term processes over quick wins"
    ]
  },
  {
    id: "two-minute-rule",
    title: "The Two-Minute Rule",
    description: "Eliminate task pile-up and reduce mental clutter with this simple productivity principle. Learn to identify quick-win tasks, execute them immediately, and prevent the psychological weight of accumulating small to-dos. Master the art of decisive action for minor tasks.",
    readTime: "3 min",
    icon: Zap,
    category: "Productivity",
    difficulty: "Beginner",
    impact: "Medium",
    keyBenefits: [
      "Clear mental clutter from small tasks",
      "Build action-taking momentum",
      "Prevent task accumulation"
    ]
  }
];

export default function MindsetHacksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (e) {
        console.error("User not found or error fetching user:", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const hasAccessToHack = (originalHackIndex) => {
    if (!user) return false;

    // Full access for Admins, Thought Leaders, and specific paid subscription levels
    if (user.role === 'admin' || 
        user.role === 'thought_leader' || 
        user.subscription_level === 'launchpad' || 
        user.subscription_level === 'command_center' || 
        user.subscription_level === 'business_hq') {
      return true;
    }
    
    // Free users only get access to the first 6 hacks during an active trial
    if (user.subscription_level === 'free') {
      const today = new Date();
      const trialExpiry = user.free_trial_expires_on ? new Date(user.free_trial_expires_on) : null;
      
      if (trialExpiry && !isNaN(trialExpiry.getTime()) && today <= trialExpiry) {
        return originalHackIndex < 6; // Free access to the first 6 items during trial
      }
    }
    
    return false; // Default: no access
  };

  // Dynamically generate categories to include all existing ones from mindsetHacks
  const allCategories = ['All', ...new Set(mindsetHacks.map(hack => hack.category))].sort();
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredHacks = mindsetHacks.filter(hack => {
    const categoryMatch = selectedCategory === "All" || hack.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "All" || hack.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-purple-600 bg-purple-100';
      case 'Medium': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
          <div className="text-center md:text-left md:flex md:items-center md:space-x-4 mb-6 w-full">
            <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-3 md:p-4 rounded-lg mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[var(--text-main)]">Mindset</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg mt-2">12 powerful mental frameworks to transform your business thinking</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-lg">
            <div className="flex items-start space-x-4">
              <Star className="w-6 h-6 text-[var(--primary-gold)] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--text-main)] mb-2">Master Your Mental Game</h3>
                <p className="text-[var(--text-main)] leading-relaxed mb-3">
                  These mindset frameworks focus on the mental aspects of entrepreneurship. Learn to think differently, 
                  overcome mental barriers, and develop the psychological resilience needed for business success.
                </p>
                <p className="text-[var(--text-main)] leading-relaxed">
                  Your mindset is your competitive advantage. These frameworks teach you to <strong>think like successful entrepreneurs</strong>, 
                  make better decisions under pressure, and maintain peak mental performance. Each hack includes proven techniques from 
                  psychology, neuroscience, and real-world business experience to <strong>rewire how you approach challenges, risks, and opportunities</strong>.
                </p>
                {user && user.subscription_level === 'free' && (
                  <p className="text-[var(--primary-gold)] font-semibold mt-3">
                    ✨ Free Trial Access included for select frameworks!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-[var(--primary-gold)] mb-2">12</div>
            <div className="text-sm text-[var(--text-soft)]">Total Frameworks</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Beginner Level</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Intermediate</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Advanced</div>
          </div>
        </div>

        {/* Compact Filters */}
        {filteredHacks.length > 0 && (
            <div className="card p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-[var(--text-soft)]" />
                        <span className="text-sm font-medium text-[var(--text-main)]">Filters</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-[var(--text-main)]"
                        >
                            {allCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-[var(--text-main)]"
                        >
                            {difficulties.map(difficulty => (
                                <option key={difficulty} value={difficulty}>{difficulty}</option>
                            ))}
                        </select>
                        <span className="text-xs text-[var(--text-soft)]">
                            {filteredHacks.length} frameworks
                        </span>
                    </div>
                </div>
            </div>
        )}

        {/* Mindset Frameworks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredHacks.map((hack) => {
            const IconComponent = hack.icon;
            // Find the original index of the hack in the full mindsetHacks array
            const originalIndex = mindsetHacks.findIndex(h => h.id === hack.id);
            const hasAccess = user ? hasAccessToHack(originalIndex) : false;
            
            return (
              <div key={hack.id} className="card hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                {!hasAccess && (
                  <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">Upgrade to Unlock</p>
                      <p className="text-sm opacity-90">All Mindset Frameworks</p>
                    </div>
                  </div>
                )}
                
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(hack.difficulty)}`}>
                        {hack.difficulty}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(hack.impact)}`}>
                        {hack.impact} Impact
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-gold)] transition-colors line-clamp-2">
                    {hack.title}
                  </h3>
                  
                  <span className="text-xs text-[var(--primary-gold)] font-medium px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                    {hack.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <p className="text-[var(--text-soft)] text-sm leading-relaxed mb-4 line-clamp-3">
                    {hack.description}
                  </p>
                  
                  {/* Key Benefits */}
                  {hack.keyBenefits && (
                    <div className="mb-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                      <p className="text-xs font-semibold text-[var(--text-main)] mb-2">Key Benefits:</p>
                      <ul className="space-y-1">
                        {hack.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="text-xs text-[var(--text-soft)] flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-600 mr-1 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-[var(--text-soft)]">
                      <Clock className="w-4 h-4" />
                      <span>{hack.readTime} read</span>
                    </div>
                    {hasAccess ? (
                      <Link
                        to={createPageUrl("MindsetHack") + `?hack=${hack.id}`}
                        className="btn btn-secondary text-sm group-hover:bg-[var(--primary-gold)] group-hover:text-white group-hover:border-[var(--primary-gold)] transition-all"
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="text-xs text-gray-400 flex items-center">
                        <span>Requires Upgrade</span>
                        <Lock className="w-3 h-3 ml-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA for Free Users */}
        {user && user.subscription_level === 'free' && (
          <div className="card p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700">
            <div className="text-center">
              <Crown className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                Unlock All Mindset Frameworks
              </h3>
              <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
                Master every essential mindset framework for business success. From decision-making to mental resilience, 
                get the complete mental toolkit that top entrepreneurs use to stay ahead.
              </p>
              <Link to={createPageUrl('Upgrade')} className="btn btn-primary text-lg px-8 py-4">
                Upgrade to Launchpad - $47.99/month
              </Link>
              <p className="text-sm text-[var(--text-soft)] mt-3">
                ✨ Use coupon <strong className="text-[var(--primary-gold)]">LAUNCH30</strong> for $29.99/month
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="card p-8 text-center bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-900 dark:to-yellow-900/20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
              Ready to Transform Your Business Mindset?
            </h2>
            <p className="text-[var(--text-soft)] mb-6 leading-relaxed">
              These mindset frameworks are the mental tools used by successful entrepreneurs worldwide. 
              Start with the beginner-level frameworks and work your way up. Each concept builds mental strength 
              and resilience for long-term business success.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--text-soft)]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Mental frameworks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Quick implementation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-[var(--primary-gold)]" />
                <span>Lasting impact</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>Mental resilience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
