import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Award, Clock, Target, CheckCircle, ArrowRight, Users, Sparkles, TrendingUp, Building, BookOpen, Lock, Loader2, Star, ChevronDown, ChevronUp, ArrowDown, MoveRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Tooltip from '../components/common/Tooltip';

const Badge = ({ children, className }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const focusedPrograms = [
  {
    id: "quick-wins",
    title: "Quick Business Wins",
    description: "Fast-track your revenue with proven strategies that deliver immediate results.",
    duration: "30 Days",
    level: "All Levels",
    category: "Revenue",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    icon: TrendingUp,
    color: "bg-green-100 text-green-800",
    goal: "Generate immediate income & improve cash flow",
    stage: "All Business Stages",
    bgColor: "bg-green-500",
    badgeColor: "bg-green-600 text-white",
    nextProgram: "foundation",
    connectionReason: "With cash flow established, you're ready to build proper business infrastructure",
    order: 1,
    contentKey: "quick_business_wins"
  },
  {
    id: "foundation",
    title: "Build Your Foundation",
    description: "Establish the essential groundwork your business needs to thrive.",
    duration: "90 days",
    icon: Building,
    color: "bg-blue-100 text-blue-800",
    difficulty: "Beginner",
    category: "Business Fundamentals",
    imageUrl: null,
    goal: "Create a stable, compliant, and scalable business base",
    stage: "Beginner",
    bgColor: "bg-blue-500",
    badgeColor: "bg-blue-600 text-white",
    nextProgram: "brand_identity",
    connectionReason: "With a solid foundation, you can now create a memorable brand identity",
    order: 2,
    contentKey: "build_foundation"
  },
  {
    id: "brand_identity",
    title: "Brand Identity & Presence",
    description: "Craft a recognizable brand that builds trust and attracts customers.",
    duration: "90 days",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-800",
    difficulty: "Intermediate",
    category: "Branding & Marketing",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    goal: "Develop a compelling and consistent brand identity",
    stage: "Intermediate",
    bgColor: "bg-purple-500",
    badgeColor: "bg-purple-600 text-white",
    nextProgram: "educate_audience",
    connectionReason: "Your brand is ready - now use it to educate and build authority",
    order: 3,
    contentKey: "brand_identity"
  },
  {
    id: "educate_audience",
    title: "Educate Your Audience",
    description: "Position yourself as the go-to expert by providing consistent value.",
    duration: "90 days",
    icon: BookOpen,
    color: "bg-green-100 text-green-800",
    difficulty: "Intermediate",
    category: "Content & Authority",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
    goal: "Become an industry authority through valuable content",
    stage: "Intermediate",
    bgColor: "bg-green-700",
    badgeColor: "bg-green-800 text-white",
    nextProgram: "nurture_relationships",
    connectionReason: "As an authority, deepen connections with your engaged audience",
    order: 4,
    contentKey: "educate_audience"
  },
  {
    id: "nurture_relationships",
    title: "Nurture Relationships",
    description: "Strengthen trust, increase retention, and build a loyal customer community.",
    duration: "90 days",
    icon: Users,
    color: "bg-pink-100 text-pink-800",
    difficulty: "Intermediate",
    category: "Customer Relations",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd293026?w=600&h=400&fit=crop",
    goal: "Cultivate strong customer loyalty and advocacy",
    stage: "Intermediate",
    bgColor: "bg-pink-500",
    badgeColor: "bg-pink-600 text-white",
    nextProgram: "increase_leads",
    connectionReason: "Strong relationships create referrals - now systematize lead generation",
    order: 5,
    contentKey: "nurture_relationships"
  },
  {
    id: "increase_leads",
    title: "Increase Qualified Leads",
    description: "Create predictable growth by attracting the right people at the right time.",
    duration: "90 days",
    icon: Target,
    color: "bg-yellow-100 text-yellow-800",
    difficulty: "Advanced",
    category: "Lead Generation",
    imageUrl: "https://images.unsplash.com/photo-1520607162513-77705d0b81c6?w=600&h=400&fit=crop",
    goal: "Implement a robust system for attracting high-quality leads",
    stage: "Advanced",
    bgColor: "bg-yellow-500",
    badgeColor: "bg-yellow-600 text-white",
    nextProgram: "form_partnerships",
    connectionReason: "More leads create leverage for strategic partnerships",
    order: 6,
    contentKey: "increase_leads"
  },
  {
    id: "form_partnerships",
    title: "Form Partnerships",
    description: "Multiply your reach and credibility by aligning with the right brands.",
    duration: "90 days",
    icon: Users,
    color: "bg-indigo-100 text-indigo-800",
    difficulty: "Advanced",
    category: "Strategic Partnerships",
    imageUrl: "https://images.unsplash.com/photo-1579389083046-c387f7535719?w=600&h=400&fit=crop",
    goal: "Establish mutually beneficial collaborations for growth",
    stage: "Advanced",
    bgColor: "bg-indigo-500",
    badgeColor: "bg-indigo-600 text-white",
    nextProgram: "grow_community",
    connectionReason: "Partnerships expand your reach - now build your own community",
    order: 7,
    contentKey: "form_partnerships"
  },
  {
    id: "grow_community",
    title: "Grow Your Community",
    description: "Build a movement by turning your audience into a tribe of loyal fans.",
    duration: "90 days",
    icon: Users,
    color: "bg-orange-100 text-orange-800",
    difficulty: "Advanced",
    category: "Community Building",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-ee1fd2220477?w=600&h=400&fit=crop",
    goal: "Cultivate an engaged and passionate community around your brand",
    stage: "Advanced",
    bgColor: "bg-orange-500",
    badgeColor: "bg-orange-600 text-white",
    nextProgram: "systematize_scale",
    connectionReason: "A thriving community needs systems to scale sustainably",
    order: 8,
    contentKey: "grow_community"
  },
  {
    id: "systematize_scale",
    title: "Systematize & Scale",
    description: "Automate what works and prepare to grow without burning out.",
    duration: "90 days",
    icon: TrendingUp,
    color: "bg-cyan-100 text-cyan-800",
    difficulty: "Advanced",
    category: "Operations & Systems",
    imageUrl: "https://images.unsplash.com/photo-1582213797676-e0dfc37f4749?w=600&h=400&fit=crop",
    goal: "Implement systems for efficient and sustainable business expansion",
    stage: "Advanced",
    bgColor: "bg-cyan-500",
    badgeColor: "bg-cyan-600 text-white",
    nextProgram: "build_authority",
    connectionReason: "Scalable systems free you to focus on thought leadership",
    order: 9,
    contentKey: "systematize_scale"
  },
  {
    id: "build_authority",
    title: "Build Brand Authority",
    description: "Stand out in your industry and establish your brand as the expert.",
    duration: "90 days",
    icon: Award,
    color: "bg-red-100 text-red-800",
    difficulty: "Advanced",
    category: "Authority Building",
    imageUrl: "https://images.unsplash.com/photo-1454165205744-3b78555e5529?w=600&h=400&fit=crop",
    goal: "Position your brand as a leading expert in your niche",
    stage: "Advanced",
    bgColor: "bg-red-500",
    badgeColor: "bg-red-600 text-white",
    nextProgram: "multiply_impact",
    connectionReason: "Authority gives you the platform to multiply your impact",
    order: 10,
    contentKey: "build_authority"
  },
  {
    id: "multiply_impact",
    title: "Multiply Your Impact",
    description: "Empower others to spread your message and create new revenue streams.",
    duration: "90 days",
    icon: Sparkles,
    color: "bg-emerald-100 text-emerald-800",
    difficulty: "Expert",
    category: "Impact & Legacy",
    imageUrl: "https://images.unsplash.com/photo-1549241521-e377f0c13ee0?w=600&h=400&fit=crop",
    goal: "Expand your influence and create lasting legacy",
    stage: "Expert",
    bgColor: "bg-emerald-500",
    badgeColor: "bg-emerald-600 text-white",
    nextProgram: "step_into_leadership",
    connectionReason: "Multiplied impact positions you as an industry leader",
    order: 11,
    contentKey: "multiply_impact"
  },
  {
    id: "step_into_leadership",
    title: "Step Into Leadership",
    description: "Become a community leader and trusted authority in your industry.",
    duration: "90 days",
    icon: Award,
    color: "bg-gray-100 text-gray-800",
    difficulty: "Expert",
    category: "Leadership",
    imageUrl: "https://images.unsplash.com/photo-1534723445776-a49688536f97?w=600&h=400&fit=crop",
    goal: "Command respect and guide your industry forward",
    stage: "Expert",
    bgColor: "bg-gray-500",
    badgeColor: "bg-gray-600 text-white",
    nextProgram: null,
    connectionReason: null,
    order: 12,
    contentKey: "step_into_leadership"
  }
];

const ProgramCard = ({ program, hasAccess, isCompleted, isCurrent, isFreeProgram }) => {
  const Icon = program.icon;
  
  return (
    <div className={`card overflow-hidden transition-all duration-300 relative h-full ${
      hasAccess 
        ? 'hover:shadow-xl cursor-pointer' 
        : 'opacity-75'
    } ${isCurrent ? 'ring-2 ring-[var(--primary-gold)]' : ''}`}>
      {/* Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        {!hasAccess && (
          <div className="bg-black/80 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
            <Lock className="w-3 h-3" />
            Upgrade Required
          </div>
        )}
        {isFreeProgram && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
            <Star className="w-3 h-3" />
            Free
          </div>
        )}
        {isCurrent && (
          <div className="bg-[var(--primary-gold)] text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold animate-pulse">
            Current
          </div>
        )}
        {isCompleted && (
          <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Completed
          </div>
        )}
      </div>

      {/* Order Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white ${
          isCompleted ? 'bg-green-500' : 
          isCurrent ? 'bg-[var(--primary-gold)]' : 
          'bg-gray-400'
        }`}>
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : program.order}
        </div>
      </div>

      {/* Image/Icon Section */}
      <div 
        className={`h-32 flex items-center justify-center ${program.bgColor}`}
        style={{
          backgroundImage: program.imageUrl ? `url(${program.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!program.imageUrl && (
          <Icon className="w-12 h-12 text-white" />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={program.badgeColor}>
                {program.duration}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-main)]">{program.title}</h3>
          </div>
        </div>

        <p className="text-[var(--text-soft)] mb-4 text-sm">
          {program.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-sm text-[var(--text-soft)]">
            <Target className="w-4 h-4 mr-2 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
            <span><strong>Goal:</strong> {program.goal}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {hasAccess ? (
            <Link
              to={createPageUrl(`FocusedProgram?program=${program.contentKey}`)}
              className="flex-1 btn btn-primary justify-center text-sm"
            >
              {isCurrent ? 'Continue' : isCompleted ? 'Review' : 'Start'} Program
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Link
              to={createPageUrl('Upgrade')}
              className="flex-1 btn btn-secondary justify-center text-sm"
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectionArrow = ({ program, isLeft }) => {
  if (!program.nextProgram) return null;
  
  const nextProgram = focusedPrograms.find(p => p.id === program.nextProgram);
  
  return (
    <div className={`flex items-center justify-center py-4 ${isLeft ? '' : 'flex-row-reverse'}`}>
      <Tooltip content={program.connectionReason}>
        <div className="flex items-center gap-2 text-[var(--primary-gold)] hover:text-[var(--primary-gold)]/80 transition-colors cursor-help">
          <div className="h-0.5 w-12 bg-[var(--primary-gold)]"></div>
          <MoveRight className="w-6 h-6" />
          <div className="h-0.5 w-12 bg-[var(--primary-gold)]"></div>
        </div>
      </Tooltip>
    </div>
  );
};

export default function Focused90DayProgramsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        console.error("User not found:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const hasAccessToProgram = (program) => {
    if (!user) return false;

    if (user.role === 'admin' || user.role === 'thought_leader' || user.subscription_level === 'business_hq') {
        return true;
    }

    const freeProgramTitles = ["Quick Business Wins", "Build Your Foundation"];
    if (freeProgramTitles.includes(program.title)) {
        return true;
    }

    return false;
  };

  const isProgramCompleted = (programId) => {
    return false;
  };

  const getCurrentProgram = () => {
    if (!user || !user.selected_goal) return null;
    return focusedPrograms.find(p => p.id === user.selected_goal);
  };

  const getNextRecommendedProgram = () => {
    const current = getCurrentProgram();
    if (!current || !current.nextProgram) return focusedPrograms[0];
    return focusedPrograms.find(p => p.id === current.nextProgram) || focusedPrograms[0];
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
          </div>
      );
  }

  const currentProgram = getCurrentProgram();
  const nextRecommended = getNextRecommendedProgram();

  // Split programs into left and right columns for roadmap view
  const leftColumn = focusedPrograms.filter((_, index) => index % 2 === 0);
  const rightColumn = focusedPrograms.filter((_, index) => index % 2 === 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header - Enhanced Introduction */}
      <div className="mb-8">
        <div className="card p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[var(--text-main)] mb-3">Your 90-Day Program Roadmap</h1>
              <p className="text-lg text-[var(--text-main)] mb-4">
                A Strategic, Step-by-Step Journey from Startup to Industry Leadership
              </p>
            </div>
          </div>
          
          <div className="space-y-4 text-[var(--text-soft)]">
            <p className="text-base leading-relaxed">
              <strong className="text-[var(--text-main)]">Stop feeling overwhelmed.</strong> This roadmap eliminates the guesswork by giving you a clear, proven path forward. Each 90-day program builds strategically on the last, ensuring every action you take compounds into lasting business success.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-main)] mb-1">Focused Execution</h3>
                  <p className="text-sm">90 days of concentrated effort on ONE critical business area at a time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-main)] mb-1">Strategic Sequencing</h3>
                  <p className="text-sm">Each program unlocks capabilities needed for the next level of growth</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-main)] mb-1">Proven Framework</h3>
                  <p className="text-sm">Follow the same path successful entrepreneurs take to scale sustainably</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-[var(--primary-gold)] p-4 mt-6">
              <p className="text-sm text-[var(--text-main)]">
                <strong>💡 Pro Tip:</strong> While you can start with any program, following the sequence ensures you have the foundation each stage requires. Hover over the arrows between programs to see how they connect strategically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Progress Banner */}
      {currentProgram && (
        <div className="card p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4">
            <div>
              <p className="text-sm text-[var(--primary-gold)] font-semibold mb-2">YOUR CURRENT PROGRAM</p>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">{currentProgram.title}</h3>
              <p className="text-[var(--text-soft)] mb-4">{currentProgram.description}</p>
              <Link
                to={createPageUrl(`FocusedProgram?program=${currentProgram.contentKey}`)}
                className="btn btn-primary inline-flex items-center"
              >
                Continue Program <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            {nextRecommended && (
              <div className="text-left md:text-right">
                <p className="text-xs text-[var(--text-soft)] mb-2">UP NEXT:</p>
                <p className="font-semibold text-[var(--text-main)]">{nextRecommended.title}</p>
                <p className="text-xs text-[var(--text-soft)] mt-1">{currentProgram.connectionReason}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Roadmap View - Two Column (Desktop) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8 relative">
          {/* Left Column */}
          <div className="space-y-6">
            {leftColumn.map((program, index) => {
              const hasAccess = hasAccessToProgram(program);
              const isCompleted = isProgramCompleted(program.id);
              const isCurrent = currentProgram?.id === program.id;
              const isFreeProgram = ["Quick Business Wins", "Build Your Foundation"].includes(program.title);
              const isLeft = true;

              return (
                <div key={program.id}>
                  <ProgramCard 
                    program={program}
                    hasAccess={hasAccess}
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    isFreeProgram={isFreeProgram}
                  />
                  {program.nextProgram && (
                    <ConnectionArrow program={program} isLeft={isLeft} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-6 mt-32">
            {rightColumn.map((program, index) => {
              const hasAccess = hasAccessToProgram(program);
              const isCompleted = isProgramCompleted(program.id);
              const isCurrent = currentProgram?.id === program.id;
              const isFreeProgram = ["Quick Business Wins", "Build Your Foundation"].includes(program.title);
              const isLeft = false;

              return (
                <div key={program.id}>
                  <ProgramCard 
                    program={program}
                    hasAccess={hasAccess}
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    isFreeProgram={isFreeProgram}
                  />
                  {program.nextProgram && (
                    <ConnectionArrow program={program} isLeft={isLeft} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Roadmap View - Vertical */}
      <div className="md:hidden space-y-6">
        {focusedPrograms.map((program, index) => {
          const hasAccess = hasAccessToProgram(program);
          const isCompleted = isProgramCompleted(program.id);
          const isCurrent = currentProgram?.id === program.id;
          const isFreeProgram = ["Quick Business Wins", "Build Your Foundation"].includes(program.title);

          return (
            <div key={program.id}>
              <ProgramCard 
                program={program}
                hasAccess={hasAccess}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isFreeProgram={isFreeProgram}
              />
              {program.nextProgram && (
                <div className="flex items-center justify-center py-4">
                  <Tooltip content={program.connectionReason}>
                    <div className="flex flex-col items-center gap-2 text-[var(--primary-gold)] cursor-help">
                      <ArrowDown className="w-6 h-6" />
                      <div className="h-12 w-0.5 bg-[var(--primary-gold)]"></div>
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}