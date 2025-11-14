
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // No longer need to check user access
    setLoading(false);
  }, []);

  // Dynamically generate categories based on guides data
  const availableCategories = [...new Set(guides.map(guide => guide.category))];
  const availableStages = ['Vision', 'Startup', 'Growth']; // Explicitly defined stages

  const filteredGuides = guides.filter(guide => {
    const categoryMatch = selectedCategory === "all" || guide.category === selectedCategory;
    const stageMatch = selectedStage === "all" || guide.stage === selectedStage;
    return categoryMatch && stageMatch;
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
        <div className="card p-6 md:p-8">
          <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl">Essential Business Guides</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg">Comprehensive guides for building and growing your business</p>
            </div>
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
                className="form-input text-sm py-1 px-2"
              >
                <option value="all">All</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--text-soft)]">Stage:</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="form-input text-sm py-1 px-2"
              >
                <option value="all">All</option>
                {availableStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.id}
              to={createPageUrl(`Guide?id=${guide.id}`)}
              className="card p-6 flex flex-col hover:shadow-lg transition-all hover:border-[var(--primary-gold)] group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-colors">
                  <guide.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-[var(--text-soft)] tracking-wider">{guide.category}</div>
                  <div className="text-xs text-[var(--text-soft)] mt-1">{guide.stage}</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-gold)] transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-[var(--text-soft)] mb-4 line-clamp-3 flex-grow">{guide.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div className="text-xs text-[var(--text-soft)] flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{guide.readTime}</span>
                </div>
                <span className="text-[var(--primary-gold)] text-sm font-medium flex items-center">
                  Read Guide
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* General CTA */}
        <div className="card p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
          <Target className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">Ready to Accelerate Your Success?</h3>
          <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
            Join The Business Minds HQ for unlimited access to all guides, courses, and premium resources.
          </p>
          <Link to={createPageUrl('Upgrade')} className="btn btn-primary text-lg px-8 py-4">
            Learn About The HQ
          </Link>
        </div>
      </div>
    </div>
  );
}
