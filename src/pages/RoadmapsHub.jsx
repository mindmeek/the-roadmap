import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Award, Target, ArrowRight, Map, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RoadmapsHub() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 md:p-6 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Hero Section */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white border-2 border-purple-400" style={{ borderRadius: '2px' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <Map className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Specialized Roadmaps</h1>
                    <p className="text-white/90 max-w-2xl mx-auto text-lg">
                        Structured 90-day programs designed for specific goals and industries. 
                        Choose a focused path to achieve your most important business objectives.
                    </p>
                </div>

                {/* Main Roadmap Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Focused Programs */}
                    <Link to={createPageUrl('FocusedPrograms')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                                        <Award className="h-7 w-7 text-white" />
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold">90-Day Focused Programs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Goal-based roadmaps tailored to your entrepreneurship stage. Choose a specific outcome you want to achieve in the next 90 days.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                                        <span>Build Authority & Thought Leadership</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                                        <span>Form Strategic Partnerships</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                                        <span>Grow Your Community</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-indigo-600" />
                                        <span>And many more focused goals...</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                                        <Award className="w-4 h-4 mr-2" />
                                        Browse Programs
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Niche Roadmaps */}
                    <Link to={createPageUrl('NicheRoadmaps')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)] bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                                        <Target className="h-7 w-7 text-white" />
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Niche Growth Roadmaps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Industry-specific 90-day growth strategies. Tailored roadmaps for coaches, creators, e-commerce, podcasters, and more.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                        <span>Life Coaches & Wellness Experts</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                        <span>E-commerce Store Owners</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                        <span>Podcast & Content Creators</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-red-600" />
                                        <span>Community Builders & more...</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white">
                                        <Target className="w-4 h-4 mr-2" />
                                        Explore Niches
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Info Section */}
                <div className="card p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700" style={{ borderRadius: '2px' }}>
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[var(--primary-gold)]" />
                        What Makes These Different?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">90-Day Focused Programs</h3>
                            <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                                Choose these when you have a <strong>specific goal</strong> in mind (like building authority, forming partnerships, or growing a community). 
                                They work for any industry and are organized by what you want to achieve.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">Niche Growth Roadmaps</h3>
                            <p className="text-sm text-[var(--text-soft)] leading-relaxed">
                                Choose these when you want an <strong>industry-specific</strong> approach (like launching an e-commerce store, growing a podcast, or scaling a coaching business). 
                                They're tailored to your unique business model.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-gradient-to-r from-[var(--primary-gold)]/10 to-yellow-50 dark:to-yellow-900/20 border-2 border-[var(--primary-gold)]/30" style={{ borderRadius: '2px' }}>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="bg-[var(--primary-gold)] p-3 rounded-lg flex-shrink-0">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Already on a Journey?
                            </h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Your main 90-Day Journey is on your Dashboard. These specialized roadmaps are here when you want to switch focus or tackle a specific challenge.
                            </p>
                        </div>
                        <Link to={createPageUrl('Dashboard')}>
                            <Button className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 flex-shrink-0">
                                <Map className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CheckCircle = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);