
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, Clock, Target, TrendingUp, Zap, Focus, Timer, BarChart3, Lightbulb, CheckCircle, ArrowRight, Star, Filter, Lock, Crown, ChevronDown } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    // No longer need to check user access
    setLoading(false);
  }, []);

  const availableCategories = ['all', ...new Set(mindsetHacks.map(hack => hack.category))].sort();
  const availableDifficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredHacks = mindsetHacks.filter(hack => {
    const categoryMatch = selectedCategory === "all" || hack.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all" || hack.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Medium': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
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
          <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-main)]">Mindset Hacks for Entrepreneurs</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg mt-2">Powerful mental frameworks to overcome challenges and unlock peak performance</p>
            </div>
          </div>
          
          {/* Expandable Description */}
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="mt-4 text-[var(--primary-gold)] text-sm font-medium hover:underline flex items-center mx-auto md:mx-0"
          >
            {showDescription ? 'Hide Details' : 'Learn More About Mindset Hacks'}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showDescription ? 'rotate-180' : ''}`} />
          </button>

          {showDescription && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-lg mt-4">
              <p className="text-[var(--text-main)] leading-relaxed mb-3">
                Success in business isn't just about strategy and tactics—it's about <strong>how you think, decide, and respond</strong> to 
                challenges. These mindset frameworks represent the mental operating systems used by the world's most successful entrepreneurs. 
                They're not motivational fluff; they're <strong>cognitive tools backed by psychology, neuroscience, and decades of business research</strong>.
              </p>
              
              <p className="text-[var(--text-main)] leading-relaxed mb-3">
                Each framework teaches you to <strong>think differently about fundamental business challenges</strong>—from handling fear and making 
                difficult decisions under pressure, to building mental resilience that keeps you moving forward when others quit. You'll learn 
                to reframe failures as data, turn anxiety into action, and develop the psychological endurance needed for long-term success.
              </p>
              
              <p className="text-[var(--text-main)] leading-relaxed">
                These aren't abstract concepts—they're <strong>practical mental models you can apply immediately</strong> to improve decision-making, 
                boost productivity, overcome procrastination, and maintain peak performance. From beginner-friendly principles like the Two-Minute 
                Rule to advanced frameworks like Systems Thinking, each hack is designed to <strong>rewire your approach to entrepreneurship</strong> 
                and give you the mental edge that separates successful founders from those who struggle.
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-[var(--primary-gold)] mb-2">12</div>
            <div className="text-sm text-[var(--text-soft)]">Total Frameworks</div>
          </div>
          <div className="card p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-green-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Beginner Level</div>
          </div>
          <div className="card p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Intermediate</div>
          </div>
          <div className="card p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-red-600 mb-2">4</div>
            <div className="text-sm text-[var(--text-soft)]">Advanced</div>
          </div>
        </div>

        {/* Compact Filters */}
        <div className="card p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-[var(--text-main)]">Filter by:</span>
            
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--text-soft)]">Category:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-input text-sm py-1 px-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-[var(--text-main)]"
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--text-soft)]">Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="form-input text-sm py-1 px-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-[var(--text-main)]"
              >
                {availableDifficulties.map(diff => (
                  <option key={diff} value={diff}>{diff === 'all' ? 'All' : diff}</option>
                ))}
              </select>
            </div>
            <span className="text-xs text-[var(--text-soft)] ml-auto">
              {filteredHacks.length} frameworks
            </span>
          </div>
        </div>

        {/* Mindset Frameworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHacks.map((hack) => {
            const IconComponent = hack.icon;
            
            return (
              <Link
                key={hack.id}
                to={createPageUrl("MindsetHack") + `?id=${hack.id}`}
                className="card p-6 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden"
              >
                {/* Header */}
                <div className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-all duration-300">
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
                <div className="flex flex-col flex-grow">
                  <p className="text-[var(--text-soft)] text-sm leading-relaxed mb-4 line-clamp-3">
                    {hack.description}
                  </p>
                  
                  {/* Key Benefits */}
                  {hack.keyBenefits && (
                    <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-100 dark:border-yellow-800">
                      <p className="text-xs font-semibold text-[var(--text-main)] mb-2">Key Benefits:</p>
                      <ul className="space-y-1">
                        {hack.keyBenefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx} className="text-xs text-[var(--text-soft)] flex items-start">
                            <Zap className="w-3 h-3 text-[var(--primary-gold)] mr-1 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2 text-xs text-[var(--text-soft)]">
                      <Clock className="w-4 h-4" />
                      <span>{hack.readTime} read</span>
                    </div>
                    <span
                      className="btn btn-secondary text-sm group-hover:bg-[var(--primary-gold)] group-hover:text-white group-hover:border-[var(--primary-gold)] transition-all flex items-center"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* General CTA */}
        <div className="card p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
          <Target className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">Master Your Entrepreneurial Mindset</h3>
          <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
            Transform your thinking, overcome challenges, and achieve your business goals with The Business Minds HQ.
          </p>
          <Link to={createPageUrl('Upgrade')} className="btn btn-primary text-lg px-8 py-4">
            Learn About The HQ
          </Link>
        </div>
      </div>
    </div>
  );
}
