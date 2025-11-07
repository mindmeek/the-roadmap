
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/entities/User';
import { Lightbulb, Zap, Clock, Target, Users, CheckCircle, Briefcase, Globe, DollarSign, Mail, Handshake, Star, Lock, Crown, ArrowRight } from 'lucide-react';

const lessons = [
  {
    id: "domain-name",
    title: "How to Choose the Right Domain Name",
    description: "A step-by-step process to find a domain that aligns with your brand and long-term goals.",
    category: "Branding",
    icon: Globe
  },
  {
    id: "morning-routine",
    title: "The Entrepreneur's Morning Routine",
    description: "Supercharge your day with a proven routine for peak performance and mental clarity.",
    category: "Productivity",
    icon: Zap
  },
  {
    id: "customer-research",
    title: "5-Minute Customer Research",
    description: "Get deep customer insights fast without expensive surveys or focus groups.",
    category: "Market Research",
    icon: Users
  },
  {
    id: "pricing-psychology",
    title: "Pricing Psychology Essentials",
    description: "Master the principles that make customers say 'yes' to higher prices.",
    category: "Sales",
    icon: DollarSign
  },
  {
    id: "social-proof",
    title: "Building Social Proof Fast",
    description: "Create credibility and trust with potential customers, even when you're starting from zero.",
    category: "Marketing",
    icon: Star
  },
  {
    id: "email-sequences",
    title: "High-Converting Email Sequences",
    description: "Automate your sales process and nurture leads into paying customers.",
    category: "Email Marketing",
    icon: Mail
  },
  {
    id: "productivity-hacks",
    title: "10 Productivity Hacks for Entrepreneurs",
    description: "Get more done in less time while reducing stress and overwhelm.",
    category: "Productivity",
    icon: Clock
  },
  {
    id: "sales-conversations",
    title: "Mastering Sales Conversations",
    description: "Turn prospects into customers with conversation frameworks that feel natural and authentic.",
    category: "Sales",
    icon: Handshake
  },
  {
    id: "business-structures",
    title: "Choosing Your Business Structure",
    description: "Understand the legal and financial implications of LLCs, S-Corps, and more.",
    category: "Legal & Finance",
    icon: Briefcase
  },
  {
    id: "networking-strategy",
    title: "Strategic Networking for Entrepreneurs",
    description: "Build meaningful business relationships that drive growth and opportunities.",
    category: "Networking",
    icon: Users
  },
  {
    id: "cash-flow-management",
    title: "Cash Flow Management Basics",
    description: "Keep your business financially healthy with smart cash flow strategies.",
    category: "Finance",
    icon: DollarSign
  }
];

export default function QuickLessons() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredLessons, setFilteredLessons] = useState(lessons); // Added for consistency

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (e) {
        // Not logged in or error fetching user, keep user null
        console.error("Failed to fetch user:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  const hasAccessToLesson = (lessonIndex) => {
    if (!user) return false;

    // Full access roles/subscription levels
    if (user.role === 'admin' || user.role === 'thought_leader' || user.subscription_level === 'launchpad' || user.subscription_level === 'business_hq') {
      return true;
    }
    
    // Free trial access logic
    if (user.subscription_level === 'free') {
      const today = new Date();
      const trialExpiry = user.free_trial_expires_on ? new Date(user.free_trial_expires_on) : null;
      if (trialExpiry && today <= trialExpiry) {
        return lessonIndex < 6; // First 6 lessons accessible during active trial (about half)
      }
    }
    
    return false; // Default: no access
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
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl">Quick Lessons</h1>
              <p className="text-[var(--text-soft)] text-base md:text-lg">11 practical business skills for immediate action and results.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6">
            <div className="flex items-start space-x-4">
              <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-[var(--text-main)] mb-2">Learn & Apply Immediately</h3>
                <p className="text-[var(--text-main)] leading-relaxed">
                  These quick lessons focus on practical business skills you can implement right away. 
                  Each lesson is designed to give you actionable knowledge that directly impacts your business operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => {
            const hasAccess = hasAccessToLesson(index);
            return (
              <div
                key={lesson.id}
                className="card p-6 flex flex-col group hover:border-[var(--primary-gold)] hover:shadow-lg transition-all relative overflow-hidden"
              >
                {!hasAccess && (
                  <div className="absolute inset-0 bg-gray-900/60 rounded-lg flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <Lock className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">Upgrade to Unlock</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-md group-hover:bg-[var(--primary-gold)] group-hover:text-white transition-colors">
                    <lesson.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold uppercase text-[var(--text-soft)] tracking-wider">{lesson.category}</div>
                </div>
                <h3 className={`text-lg font-bold text-[var(--text-main)] mb-2 flex-grow ${hasAccess ? 'group-hover:text-[var(--primary-gold)]' : ''} transition-colors`}>
                  {lesson.title}
                </h3>
                <p className="text-sm text-[var(--text-soft)] line-clamp-2 mb-4">{lesson.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-xs text-[var(--text-soft)] flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Quick read</span>
                  </div>
                  {hasAccess ? (
                    <Link
                      to={createPageUrl(`QuickLesson?lesson=${lesson.id}`)}
                      className="text-[var(--primary-gold)] text-sm font-medium group-hover:underline flex items-center"
                    >
                      Start Learning <ArrowRight className="w-4 h-4 ml-1" />
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
          <div className="card p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 mt-8">
            <div className="text-center">
              <Crown className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                Unlock All Quick Lessons
              </h3>
              <p className="text-[var(--text-soft)] text-lg mb-6 max-w-2xl mx-auto">
                Get instant access to our full library of practical lessons. Master essential business skills in minutes.
              </p>
              <Link to={createPageUrl('Upgrade')} className="btn btn-primary text-lg px-8 py-4">
                Upgrade to The Launchpad
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
