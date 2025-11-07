import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Radio, DollarSign, Globe, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

export default function BeaconRadioSetupPage() {
    const navigate = useNavigate();

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="card p-6">
                    <button 
                        onClick={() => navigate(createPageUrl('TheBeacon'))}
                        className="btn btn-ghost p-2 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to The Beacon
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                            <Radio className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Equalizer Radio Setup</h1>
                            <p className="text-sm text-[var(--text-soft)]">Host your online radio show from anywhere</p>
                        </div>
                    </div>
                </div>

                {/* What's Included */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">What's Included</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">4+ Hours of Monthly Air Time</h4>
                                <p className="text-sm text-[var(--text-soft)]">Guaranteed minimum broadcast time for your show</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Global Reach</h4>
                                <p className="text-sm text-[var(--text-soft)]">Broadcast to listeners worldwide via online streaming</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">100% Ad Revenue</h4>
                                <p className="text-sm text-[var(--text-soft)]">Keep all income from ads you sell - zero profit sharing</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Setup & Training</h4>
                                <p className="text-sm text-[var(--text-soft)]">We help you get started with equipment recommendations and technical support</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Flexible Recording</h4>
                                <p className="text-sm text-[var(--text-soft)]">Record live or pre-record episodes from anywhere in the world</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="card p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700">
                    <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-red-600 mb-2">$99<span className="text-2xl">/month</span></div>
                        <p className="text-sm text-[var(--text-soft)]">Simple, flat-rate pricing with no hidden fees</p>
                    </div>

                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-2">
                            <TrendingUp className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Monetize Your Show:</strong> Sell advertising spots at your own rates and keep 100% of the revenue. 
                                We don't take any percentage of your ad sales - all income is yours!
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 text-center">
                        <p className="text-xs text-[var(--text-soft)]">
                            <Globe className="w-4 h-4 inline mr-1" />
                            Broadcast from anywhere in the world
                        </p>
                        <p className="text-xs text-[var(--text-soft)]">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Month-to-month subscription, cancel anytime
                        </p>
                    </div>
                </div>

                {/* How It Works */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">How It Works</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-[var(--primary-gold)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Schedule Your Setup Meeting</h4>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Book a meeting to discuss your show concept, target audience, and technical requirements
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-[var(--primary-gold)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Get Equipment Recommendations</h4>
                                <p className="text-sm text-[var(--text-soft)]">
                                    We'll guide you on the best microphones, software, and setup for your show
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-[var(--primary-gold)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Launch Your Show</h4>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Start broadcasting with guaranteed air time and build your audience
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-[var(--primary-gold)] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                4
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Monetize & Grow</h4>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Sell advertising spots and keep 100% of the revenue as your audience grows
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendly Embed */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Schedule Your Setup Meeting</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <iframe 
                            src="https://calendly.com/YOUR_CALENDLY_EQUALIZER_LINK_HERE" 
                            width="100%" 
                            height="700" 
                            frameBorder="0"
                            title="Equalizer Radio Setup"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}