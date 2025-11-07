
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from '@/entities/User';
import { BookOpen, Clock, Target, TrendingUp, Zap, Focus, Timer, BarChart3, Lightbulb, CheckCircle, Filter, Lock, Crown, ArrowRight } from "lucide-react";

const guides = [
  {
    id: "energy-management",
    title: "Energy Management Over Time Management",
    description: "Manage your energy levels for peak performance. Work with your natural rhythms for better results.",
    readTime: "7 min",
    icon: BarChart3,
    category: "Performance",
    stage: "Startup" 
  },
  {
    id: "deep-work",
    title: "Deep Work Principles",
    description: "Create focused work sessions for maximum productivity and quality output. Master the art of concentration.",
    readTime: "8 min",
    icon: Focus,
    category: "Productivity",
    stage: "Startup" 
  },
  {
    id: "habit-stacking",
    title: "Habit Stacking for Success",
    description: "Build powerful habits by linking new behaviors to existing routines. Create lasting behavioral change.",
    readTime: "6 min",
    icon: CheckCircle,
    category: "Habits",
    stage: "Startup" 
  },
  {
    id: "feedback-loops",
    title: "Creating Effective Feedback Loops",
    description: "Use feedback systems to continuously improve and stay on track. Build self-correcting systems.",
    readTime: "5 min",
    icon: TrendingUp,
    category: "Improvement",
    stage: "Growth" 
  },
  {
    id: "batch-processing",
    title: "Batch Processing for Efficiency",
    description: "Group similar tasks together to maximize efficiency and minimize context switching. Optimize your workflow.",
    readTime: "4 min",
    icon: Timer,
    category: "Productivity",
    stage: "Startup" 
  }
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (e) {
        // Not logged in, user remains null
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  const hasAccessToGuide = (guideIndex) => {
    if (!user) return false;

    // Full access roles/subscription levels
    if (user.role === 'admin' || user.role === 'thought_leader' || user.subscription_level === 'launchpad' || user.subscription_level === 'business_hq') {
      return true;
    }

    // Free trial access logic - now 2 guides
    if (user.subscription_level === 'free') {
      const today = new Date();
      const trialExpiry = user.free_trial_expires_on ? new Date(user.free_trial_expires_on) : null;
      if (trialExpiry && today <= trialExpiry) {
        return guideIndex < 2; // First 2 guides accessible during active trial
      }
    }

    return false; // Default: no access
  };

  // Dynamically generate categories based on guides data
  const categories = ['All', ...new Set(guides.map(guide => guide.category))];
  const stages = ['All', 'Vision', 'Startup', 'Growth'];

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesStage = selectedStage === 'All' || guide.stage === selectedStage;
    return matchesCategory && matchesStage;
  });
  
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
        <div className="card p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <BookOpen className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-3xl">Guides</h1>
              <p className="text-[var(--text-soft)] text-lg">5 comprehensive step-by-step guides for building business systems and productivity</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <div className="flex items-start space-x-4">
              <Target className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--text-main)] mb-2">Comprehensive Implementation Guides</h3>
                <p className="text-[var(--text-main)] leading-relaxed">
                  These detailed guides provide step-by-step processes for implementing key business systems and productivity methods. 
                  Each guide includes practical examples and actionable steps you can follow to get results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Filters */}
        {guides.length > 0 && (
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
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category} ({guides.filter(h => category === 'All' ? true : h.category === category).length})
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-800 text-[var(--text-main)]"
                        >
                            {stages.map(stage => (
                                <option key={stage} value={stage}>
                                    {stage} ({guides.filter(h => stage === 'All' ? true : h.stage === stage).length})
                                </option>
                            ))}
                        </select>
                        <span className="text-xs text-[var(--text-soft)]">
                            {filteredGuides.length} guides
                        </span>
                    </div>
                </div>
            </div>
        )}

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const IconComponent = guide.icon;
            // Find the index of the current guide in the ORIGINAL `guides` array
            const originalGuideIndex = guides.findIndex(g => g.id === guide.id);
            const hasAccess = hasAccessToGuide(originalGuideIndex);

            return (
              <div
                key={guide.id}
                className="card p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                {!hasAccess && (
                   <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">Upgrade to Unlock</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-md group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-[var(--primary-gold)] font-medium px-2 py-1 bg-yellow-50 rounded-full">
                      {guide.category}
                    </span>
                    {guide.stage && (
                      <span className="ml-2 text-xs text-[var(--text-soft)] font-medium px-2 py-1 bg-gray-100 rounded-full">
                        {guide.stage}
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-gold)] transition-colors">
                  {guide.title}
                </h3>
                <p className="text-[var(--text-soft)] text-sm mb-4 leading-relaxed">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2 text-xs text-[var(--text-soft)]">
                    <Clock className="w-4 h-4" />
                    <span>{guide.readTime} read</span>
                  </div>
                  {hasAccess ? (
                    <Link 
                      to={createPageUrl("MindsetHack") + `?hack=${guide.id}`}
                      className="text-[var(--primary-gold)] text-sm font-medium group-hover:underline flex items-center"
                    >
                      Start Guide <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  ) : (
                    <div className="text-xs text-gray-400 flex items-center">
                      <span>Requires Upgrade</span>
                      <Lock className="w-3 h-3 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA for Free Users */}
        {user && user.subscription_level === 'free' && (
          <div className="card p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 mt-8">
            <div className="text-center">
              <Crown className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                Unlock All Implementation Guides
              </h3>
              <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
                Get full access to every step-by-step guide to build robust systems for productivity and growth in your business.
              </p>
              <Link to={createPageUrl('Upgrade')} className="btn btn-primary text-lg px-8 py-4">
                Upgrade to The Launchpad
              </Link>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
            Master These Systems for Business Success
          </h2>
          <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
            Each guide provides a complete system you can implement in your business. Follow these step-by-step 
            processes to build efficient operations and sustainable growth.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-[var(--text-soft)]">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Step-by-step processes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Detailed implementation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-[var(--primary-gold)]" />
              <span>Proven systems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
