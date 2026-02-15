import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Podcast, Mic, Radio, Video, ArrowRight, CheckCircle, Calendar, DollarSign, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MediaHub() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 md:p-6 pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Hero Section */}
                <div 
                    className="relative overflow-hidden shadow-xl p-8 md:p-12 text-center"
                    style={{ 
                        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '2px'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
                    <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                            <div className="bg-[var(--primary-gold)] p-4 rounded-full">
                                <Podcast className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">Audio & Media Hub</h1>
                        <p className="text-white/90 max-w-2xl mx-auto text-lg">
                            Your complete audio content platform—from professional podcast recording to hosting your own online radio show.
                        </p>
                    </div>
                </div>

                {/* Main Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* The Beacon Studio */}
                    <Link to={createPageUrl('TheBeacon')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)] bg-gradient-to-br from-[var(--primary-gold)]/10 to-yellow-50 dark:from-yellow-900/20 dark:to-orange-900/20" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                                        <Podcast className="h-7 w-7 text-white" />
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold">The Beacon Studio</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Professional podcast recording studio in Mesquite, TX with 4K video, professional mics, and optional engineering support.
                                </p>
                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Sound-treated studio space</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Professional equipment included</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Production & editing services</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Distribution guidance</span>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                                    <div className="text-xs text-[var(--text-soft)] mb-1">Starting at</div>
                                    <div className="text-2xl font-bold text-[var(--primary-gold)]">$50/hour</div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Be a Podcast Guest */}
                    <Link to={createPageUrl('BusinessMindsPodcastBooking')}>
                        <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all group h-full border-2 border-transparent hover:border-[var(--primary-gold)] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" style={{ borderRadius: '2px' }}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                                        <Mic className="h-7 w-7 text-white" />
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-[var(--primary-gold)] group-hover:translate-x-1 transition-all" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Be a Podcast Guest</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[var(--text-soft)] mb-4 leading-relaxed">
                                    Share your entrepreneurial journey on The Business Minds Podcast. Connect with thousands of listeners and build your authority.
                                </p>
                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Share your expertise</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Reach new audiences</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Build credibility & authority</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[var(--text-soft)]">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span>Network with fellow entrepreneurs</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg text-center">
                                    <div className="text-lg font-bold">Free Opportunity</div>
                                    <div className="text-xs">Share your story with our community</div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Featured Packages */}
                <div className="card p-6" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">Featured Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Equalizer Radio */}
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-6 rounded-lg border-2 border-red-200 dark:border-red-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-500 p-3 rounded-lg">
                                    <Radio className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Equalizer Radio</h3>
                                    <p className="text-sm text-red-600 dark:text-red-400 font-semibold">$99/month</p>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                Host your own online radio show. Reach global audiences, keep 100% of ad revenue, and broadcast from anywhere.
                            </p>
                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>4+ hours airtime per month</span>
                                </li>
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Live or pre-recorded options</span>
                                </li>
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>100% of ad revenue is yours</span>
                                </li>
                            </ul>
                            <Link to={createPageUrl('TheBeacon')}>
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                    <Radio className="w-4 h-4 mr-2" />
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        {/* Ultimate Creator */}
                        <div className="bg-gradient-to-br from-[var(--primary-gold)]/10 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-6 rounded-lg border-2 border-[var(--primary-gold)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[var(--primary-gold)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                BEST VALUE
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Ultimate Creator</h3>
                                    <p className="text-sm text-[var(--primary-gold)] font-semibold">$199/month</p>
                                </div>
                            </div>
                            <p className="text-sm text-[var(--text-soft)] mb-4">
                                Complete package: Studio time + Engineer + Equalizer Radio subscription. Everything you need to create professional content.
                            </p>
                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>2 hours studio time per month</span>
                                </li>
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Professional engineer included</span>
                                </li>
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>4K video recording</span>
                                </li>
                                <li className="flex items-center gap-2 text-[var(--text-soft)]">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Radio show subscription ($99 value)</span>
                                </li>
                            </ul>
                            <Link to={createPageUrl('TheBeacon')}>
                                <Button className="w-full bg-[var(--primary-gold)] hover:bg-yellow-600 text-white">
                                    <Podcast className="w-4 h-4 mr-2" />
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* What We Offer */}
                <div className="card p-6" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
                                <Mic className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Podcast Studio Rental</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Record in a professional, sound-treated space with high-quality microphones, cameras, and gear.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-shrink-0">
                                <Video className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Production Support</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Audio engineering, video recording, editing, branded intros/outros, and social media clips.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg flex-shrink-0">
                                <Radio className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Online Radio Shows</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Host recurring radio shows online with Equalizer Radio. Record from anywhere, reach listeners globally.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg flex-shrink-0">
                                <Podcast className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Content Distribution</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Get guidance on publishing to Spotify, Apple Podcasts, YouTube, and beyond.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to={createPageUrl('TheBeacon')}>
                        <Button className="w-full h-full py-6 bg-[var(--primary-gold)] hover:bg-yellow-600 text-white text-lg" style={{ borderRadius: '2px' }}>
                            <Podcast className="w-5 h-5 mr-2" />
                            Explore The Beacon Studio
                        </Button>
                    </Link>

                    <Link to={createPageUrl('BusinessMindsPodcastBooking')}>
                        <Button className="w-full h-full py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg" style={{ borderRadius: '2px' }}>
                            <Mic className="w-5 h-5 mr-2" />
                            Apply to Be a Guest
                        </Button>
                    </Link>
                </div>

                {/* Contact */}
                <div className="card p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-center" style={{ borderRadius: '2px' }}>
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Have Questions?</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">
                        Visit The Beacon website or contact us directly for more information.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a href="https://thebeacon.llc" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">
                                Visit Website
                            </Button>
                        </a>
                        <a href="mailto:team@thebminds.com">
                            <Button variant="outline">
                                Email Us
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}