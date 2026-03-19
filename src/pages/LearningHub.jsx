import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BookOpen, Lightbulb, Brain, Map, Award, Target, Newspaper, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LearningHub() {
    const resources = [
        {
            title: "Quick Lessons",
            description: "Bite-sized business lessons you can apply immediately. Perfect for busy entrepreneurs who need actionable advice fast.",
            icon: Lightbulb,
            link: "QuickLessons",
            color: "from-yellow-500 to-orange-600",
            bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
            borderColor: "border-yellow-200 dark:border-yellow-700"
        },
        {
            title: "Interactive Courses",
            description: "In-depth training programs with step-by-step guidance. Master essential business skills at your own pace.",
            icon: BookOpen,
            link: "Courses",
            color: "from-blue-500 to-indigo-600",
            bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
            borderColor: "border-blue-200 dark:border-blue-700"
        },
        {
            title: "Mindset Hacks",
            description: "Mental frameworks and mindset shifts to overcome obstacles and build entrepreneurial resilience.",
            icon: Brain,
            link: "MindsetHacks",
            color: "from-purple-500 to-pink-600",
            bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
            borderColor: "border-purple-200 dark:border-purple-700"
        },
        {
            title: "Business Guides",
            description: "Comprehensive guides covering specific business topics in detail. Your reference library for growth.",
            icon: Map,
            link: "Guides",
            color: "from-green-500 to-emerald-600",
            bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
            borderColor: "border-green-200 dark:border-green-700"
        },

        {
            title: "The Magazine",
            description: "Monthly digital magazine with expert interviews, case studies, and entrepreneurial insights.",
            icon: Newspaper,
            link: "Magazine",
            color: "from-gray-700 to-gray-900",
            bgColor: "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
            borderColor: "border-gray-200 dark:border-gray-700"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 md:p-6 pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Hero Section */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-2 border-indigo-400" style={{ borderRadius: '2px' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <GraduationCap className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Learning & Growth Hub</h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg">
                        Your complete learning library for building, growing, and scaling your business. 
                        From quick lessons to deep-dive courses—everything you need is here.
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, idx) => {
                        const Icon = resource.icon;
                        return (
                            <Link key={idx} to={createPageUrl(resource.link)}>
                                <Card className={`hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 bg-gradient-to-br ${resource.bgColor} ${resource.borderColor}`} style={{ borderRadius: '2px' }}>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`bg-gradient-to-br ${resource.color} p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{resource.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                                            {resource.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="card p-6 bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 border-2 border-[var(--primary-gold)]/30" style={{ borderRadius: '2px' }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Not Sure Where to Start?
                            </h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Your 90-Day Journey already includes the best resources for your current stage. 
                                Start there, then explore these additional learning materials as needed.
                            </p>
                        </div>
                        <Link to={createPageUrl('Journey')} className="w-full sm:w-auto">
                            <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 w-full sm:w-auto">
                                <Target className="w-4 h-4 mr-2" />
                                View My Journey
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}