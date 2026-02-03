import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen, Award, Heart, ArrowRight, Lock, Loader2, Target, Sparkles, TrendingUp, ShoppingCart, Users, Mic } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const nichePrograms = [
  {
    id: "book-author",
    title: "Book Author Growth Plan",
    subtitle: "90-Day Audience & Sales System",
    description: "Build an audience, form a community, and grow book sales using The Business Minds HQ. Transform readers into a thriving community while scaling your author business.",
    icon: BookOpen,
    color: "from-blue-600 to-indigo-600",
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=400&fit=crop",
    metrics: [
      { label: "Email List", value: "+1,000 subscribers" },
      { label: "Community", value: "300+ active members" },
      { label: "Sales", value: "Consistent daily revenue" },
      { label: "Add-ons", value: "3 revenue streams" }
    ],
    highlights: [
      "Build automated book sales funnel",
      "Launch reader community with daily engagement",
      "Create multiple income streams (workbook, course, coaching)",
      "Master paid advertising for authors",
      "Develop affiliate/street team program"
    ],
    contentKey: "book_author_growth"
  },
  {
    id: "life-coach",
    title: "Life Coach Business Plan",
    subtitle: "90-Day Client Acquisition System",
    description: "Build a thriving coaching practice with consistent client flow, premium pricing, and impactful transformations using The Business Minds HQ.",
    icon: Award,
    color: "from-purple-600 to-pink-600",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
    metrics: [
      { label: "Clients", value: "15-20 active" },
      { label: "Revenue", value: "$10K+ MRR" },
      { label: "Programs", value: "3 offer tiers" },
      { label: "Automation", value: "Passive client flow" }
    ],
    highlights: [
      "Define coaching niche and signature method",
      "Build high-converting coaching funnel",
      "Launch group coaching program",
      "Create certification or course",
      "Establish thought leadership platform"
    ],
    contentKey: "life_coach_growth",
    comingSoon: false
  },
  {
    id: "non-profit",
    title: "Non-Profit Growth Plan",
    subtitle: "90-Day Fundraising & Impact System",
    description: "Scale your mission with donor acquisition, volunteer management, and measurable community impact using The Business Minds HQ.",
    icon: Heart,
    color: "from-green-600 to-emerald-600",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
    metrics: [
      { label: "Donors", value: "500+ monthly" },
      { label: "Funding", value: "$25K+ raised" },
      { label: "Volunteers", value: "50+ active" },
      { label: "Impact", value: "Measurable growth" }
    ],
    highlights: [
      "Build donor acquisition funnel",
      "Launch monthly giving program",
      "Create volunteer management system",
      "Develop corporate partnership strategy",
      "Implement impact measurement dashboard"
    ],
    contentKey: "non_profit_growth",
    comingSoon: false
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store Growth Plan",
    subtitle: "90-Day Revenue & Scale System",
    description: "Launch and scale your online store to consistent profitability using The Business Minds HQ. Build automated systems for traffic, conversions, and customer retention.",
    icon: ShoppingCart,
    color: "from-orange-600 to-red-600",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    metrics: [
      { label: "Revenue", value: "$10K-30K in 90 days" },
      { label: "Customers", value: "200-500 acquired" },
      { label: "Traffic", value: "5K-10K monthly" },
      { label: "Conversion", value: "2-4% rate" }
    ],
    highlights: [
      "Build professional store on The Business Minds HQ",
      "Launch profitable Facebook & Google Shopping ads",
      "Create email automation for cart recovery and upsells",
      "Implement loyalty and referral programs",
      "Optimize for conversions and repeat purchases"
    ],
    contentKey: "ecommerce_growth",
    comingSoon: false
  },
  {
    id: "private-community",
    title: "Private Community Growth Plan",
    subtitle: "90-Day Membership System",
    description: "Launch and scale a thriving paid membership community using The Business Minds HQ. Create recurring revenue while building a loyal tribe around your expertise.",
    icon: Users,
    color: "from-indigo-600 to-purple-600",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e8d9d1085a48?w=800&h=400&fit=crop",
    metrics: [
      { label: "Members", value: "100-300 paying" },
      { label: "Revenue", value: "$5K-15K MRR" },
      { label: "Engagement", value: "60%+ weekly active" },
      { label: "Retention", value: "85%+ monthly" }
    ],
    highlights: [
      "Build community on The Business Minds HQ platform",
      "Design tiered membership with premium add-ons",
      "Create automated member acquisition funnel",
      "Implement engagement and retention systems",
      "Scale to 500+ members profitably"
    ],
    contentKey: "private_community_growth",
    comingSoon: false
  },
  {
    id: "podcast-host",
    title: "Podcast Growth Plan",
    subtitle: "90-Day Launch & Scale System",
    description: "Launch a chart-topping podcast, build a loyal listener base, and monetize your show using The Business Minds HQ.",
    icon: Mic,
    color: "from-yellow-600 to-orange-600",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=400&fit=crop",
    metrics: [
      { label: "Streams", value: "1,000+ monthly" },
      { label: "Episodes", value: "12+ published" },
      { label: "Revenue", value: "First sponsors" },
      { label: "Growth", value: "Organic reach" }
    ],
    highlights: [
      "Launch professional podcast from scratch",
      "Get into 'New & Noteworthy' on Apple",
      "Build automated guest booking system",
      "Monetize with sponsors and affiliates",
      "Repurpose content for social growth"
    ],
    contentKey: "podcast_growth",
    comingSoon: false
  },
  {
    id: "musical-artist",
    title: "Musical Artist Growth Plan",
    subtitle: "90-Day Fanbase & Revenue System",
    description: "Launch your music career, build a superfan community, and monetize your art using The Business Minds HQ. Transform listeners into a thriving army of supporters.",
    icon: Mic,
    color: "from-pink-600 to-rose-600",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=400&fit=crop",
    metrics: [
      { label: "Fanbase", value: "1,000+ Superfans" },
      { label: "Revenue", value: "Recurring Support" },
      { label: "Streams", value: "Monthly Growth" },
      { label: "Merch", value: "Store Live" }
    ],
    highlights: [
      "Build automated fan onboarding funnel",
      "Launch exclusive fan community",
      "Monetize with merch and memberships",
      "Master social content for artists",
      "Execute professional release strategy"
    ],
    contentKey: "musical_artist_growth",
    comingSoon: false
  }
];

export default function NicheRoadmapsPage() {
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

  const hasAccess = user && (user.role === 'admin' || user.subscription_level === 'business_hq');

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 pb-24 lg:pb-8">
      {/* Hero Section */}
      <div className="card p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700">
        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-4 text-center sm:text-left">
            <div className="bg-[var(--primary-gold)] p-2 sm:p-3 rounded-lg">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[var(--primary-gold)] uppercase tracking-wide">Niche-Specific</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-main)]">90-Day Growth Roadmaps</h1>
            </div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-main)] leading-relaxed mb-4 sm:mb-6">
            <strong>Your industry has unique challenges and opportunities.</strong> These niche-specific roadmaps give you a step-by-step plan tailored exactly to your business type, with every task mapped to the specific HQ tools that will help you execute.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1 text-sm sm:text-base">Hyper-Focused</h3>
                <p className="text-xs sm:text-sm text-[var(--text-soft)]">Every task designed for your specific niche</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1">Tool-Integrated</h3>
                <p className="text-sm text-[var(--text-soft)]">Each step shows exactly which HQ tool to use</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-1">Results-Driven</h3>
                <p className="text-sm text-[var(--text-soft)]">Clear KPIs and success metrics at every stage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Notice for Free Users */}
      {!hasAccess && (
        <div className="card p-6 mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)]">
          <div className="flex items-start gap-4">
            <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Upgrade to Access Niche Roadmaps</h3>
              <p className="text-[var(--text-soft)] mb-4">
                These industry-specific growth plans are available exclusively to Business HQ members. Get unlimited access to all niche roadmaps, HQ tools, and AI assistance.
              </p>
              <Link
                to={createPageUrl('Upgrade')}
                className="btn btn-primary inline-flex items-center"
              >
                Upgrade to The HQ
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nichePrograms.map((program) => {
          const Icon = program.icon;
          const isLocked = !hasAccess && !program.comingSoon;
          const isComingSoon = program.comingSoon;

          return (
            <div
              key={program.id}
              className={`card overflow-hidden h-full flex flex-col ${
                isComingSoon ? 'opacity-75' : ''
              } ${isLocked ? 'opacity-90' : ''}`}
            >
              {/* Image/Header */}
              <div className="relative h-48 overflow-hidden">
                {program.imageUrl && (
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-90 flex items-center justify-center`}>
                  <Icon className="w-16 h-16 text-white" />
                </div>
                
                {/* Badge */}
                {isComingSoon ? (
                  <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </div>
                ) : isLocked ? (
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
                    <Lock className="w-3 h-3" />
                    HQ Only
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Active
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-1">{program.title}</h3>
                <p className="text-sm text-[var(--primary-gold)] font-semibold mb-3">{program.subtitle}</p>
                <p className="text-[var(--text-soft)] mb-4 text-sm flex-1">
                  {program.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {program.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-xs text-[var(--text-soft)] mb-1">{metric.label}</p>
                      <p className="text-sm font-bold text-[var(--text-main)]">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[var(--text-soft)] uppercase mb-2">What You'll Build:</p>
                  <ul className="space-y-1">
                    {program.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="text-sm text-[var(--text-main)] flex items-start gap-2">
                        <span className="text-[var(--primary-gold)] mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                {isComingSoon ? (
                  <button
                    disabled
                    className="btn btn-secondary w-full opacity-50 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : isLocked ? (
                  <Link
                    to={createPageUrl('Upgrade')}
                    className="btn btn-secondary w-full justify-center"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock with HQ
                  </Link>
                ) : (
                  <Link
                    to={createPageUrl(`NicheRoadmap?program=${program.contentKey}`)}
                    className="btn btn-primary w-full justify-center"
                  >
                    Start Roadmap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Niche Roadmaps Section */}
      <div className="mt-12 card p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Why Niche-Specific Roadmaps?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-[var(--text-main)] mb-2">Generic advice doesn't work</h3>
            <p className="text-[var(--text-soft)] text-sm">
              A life coach needs different strategies than a book author. A non-profit has unique funding challenges. These roadmaps are built specifically for YOUR industry with proven tactics that work in your space.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-main)] mb-2">Every step connected to HQ tools</h3>
            <p className="text-[var(--text-soft)] text-sm">
              No guessing which tool to use. Each task explicitly tells you: "Use HQ Email Automation" or "Set up in HQ Community." You'll know exactly what to do and where to do it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-main)] mb-2">Real metrics and benchmarks</h3>
            <p className="text-[var(--text-soft)] text-sm">
              Every week includes specific KPIs based on what's realistic and achievable in your niche. You'll know if you're on track and where to focus your energy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-main)] mb-2">Templates and examples included</h3>
            <p className="text-[var(--text-soft)] text-sm">
              Don't start from scratch. Get copy-paste email templates, ad scripts, community posts, and proven frameworks you can customize and use immediately.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!hasAccess && (
        <div className="mt-8 card p-8 text-center bg-gradient-to-br from-[var(--primary-gold)] via-yellow-600 to-yellow-500 text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Access Your Industry's Roadmap?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join The Business Minds HQ to unlock all niche-specific roadmaps, access every HQ tool, and get unlimited AI assistance to accelerate your growth.
          </p>
          <Link
            to={createPageUrl('Upgrade')}
            className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100 inline-flex items-center text-lg px-8 py-3 font-bold"
          >
            Upgrade to The HQ
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
}