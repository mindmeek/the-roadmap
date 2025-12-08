import React, { useState, useEffect } from 'react';
import { Users, Download, Zap, Calendar, MessageSquare, Brain, ArrowRight } from 'lucide-react';
import { User } from '@/entities/User';

const AppleLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.39,14.86c.05-.37.07-.74.07-1.11,0-.4-.03-.8-.08-1.2a4.4,4.4,0,0,0-1.46-2.61,4.2,4.2,0,0,0-2.88-1.15,4.88,4.88,0,0,0-3.32,1.21,4.53,4.53,0,0,0-1.46,3.3,5.1,5.1,0,0,0,1.4,3.48,4.52,4.52,0,0,0,3,1.26,2.23,2.23,0,0,0,1.42-.45,4.72,4.72,0,0,0,1.27-1.49A2.9,2.9,0,0,1,19.39,14.86Zm-5.83-4.22a2.53,2.53,0,0,1,1-2.22,2.6,2.6,0,0,1,2.06-.82,1,1,0,0,0,.7-.28,1,1,0,0,0,.3-.73,1,1,0,0,0-1-1,4.42,4.42,0,0,0-4,2.56,2.56,2.56,0,0,1-1,2.21,2.55,2.55,0,0,1-2.06.82,1,1,0,0,0-.7.28,1,1,0,0,0-.3.72,1,1,0,0,0,1,1,4.36,4.36,0,0,0,4-2.54Z"></path>
    </svg>
);

const GooglePlayLogo = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.63,2.32a2.3,2.3,0,0,0-.33,3.9L8.71,12,3.3,17.78a2.3,2.3,0,0,0,.33,3.9,2.31,2.31,0,0,0,1.38.43,2.17,2.17,0,0,0,1.13-.34l8.32-4.8,2.33,2.33a2.3,2.3,0,0,0,3.25,0,2.3,2.3,0,0,0,0-3.25L14.36,12l4.3-4.3a2.3,2.3,0,0,0-3.25-3.25l-2.33,2.33Z"></path>
    </svg>
);

const CommunityIntro = () => (
    <div id="community-intro" className="card p-6 md:p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="flex-shrink-0 mb-6 lg:mb-0 text-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full inline-block">
                    <Users className="w-16 h-16 text-[var(--primary-gold)]" />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-[var(--text-main)] mb-3">Welcome to The Business Minds Community!</h1>
                <p className="text-lg text-[var(--text-soft)] mb-6">
                    This is your private space to connect with fellow entrepreneurs, share your journey, and grow together. While the Launch Pad provides your roadmap, the community provides the support and network to fuel your success. The same login you used for the Launch Pad gives you access here.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Benefits Section */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-lg mb-4 text-[var(--text-main)]">Your Community Benefits:</h3>
                        <ul className="space-y-3 text-[var(--text-soft)]">
                            <li className="flex items-start"><Zap className="w-5 h-5 text-[var(--primary-gold)] mr-3 mt-1 flex-shrink-0" /><span>Connect with peers, find collaborators, and seek accountability partners.</span></li>
                            <li className="flex items-start"><MessageSquare className="w-5 h-5 text-[var(--primary-gold)] mr-3 mt-1 flex-shrink-0" /><span>Ask questions, get feedback, and share your wins in a supportive environment.</span></li>
                            <li className="flex items-start"><Brain className="w-5 h-5 text-[var(--primary-gold)] mr-3 mt-1 flex-shrink-0" /><span>Participate in strategy discussions and learn from the experiences of others.</span></li>
                        </ul>
                    </div>
                    {/* Live Events Section */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200 flex items-center"><Calendar className="w-5 h-5 mr-2" /> Weekly Live Group Events</h3>
                        <p className="text-blue-700 dark:text-blue-300 mb-2">Hosted by founder Christopher Shaw, these sessions are your chance to dive deep and get answers.</p>
                        <ul className="space-y-1 font-medium text-blue-800 dark:text-blue-200">
                            <li><strong>When:</strong> Tuesdays & Thursdays</li>
                            <li><strong>Time:</strong> 1:15 PM - 2:00 PM (PST)</li>
                            <li><strong>Topic:</strong> Launch Pad features, The HQ strategy, and live Q&A.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AppDownloadSection = () => (
    <div id="community-app-download" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mobile App Download */}
        <div 
            className="card p-6 md:p-8 relative overflow-hidden text-white"
            style={{ 
                backgroundImage: `url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
            <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                    <Download className="w-8 h-8 text-[var(--primary-gold)]" />
                    <h2 className="text-2xl font-bold text-white">Get the Mobile Experience</h2>
                </div>
                <p className="text-gray-200 text-lg mb-6">
                   Stay connected on the go. Download the official community app to join discussions and live events from anywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                        href="https://apps.apple.com/us/app/the-business-minds/id6742644847" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn bg-gray-800 hover:bg-gray-700 text-white flex-1 justify-center py-3 text-base"
                    >
                        <AppleLogo />
                        <span>Download on the App Store</span>
                    </a>
                    <a 
                        href="https://play.google.com/store/apps/details?id=com.thebusinessminds.wl&hl=en_US" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn bg-gray-800 hover:bg-gray-700 text-white flex-1 justify-center py-3 text-base"
                    >
                        <GooglePlayLogo />
                        <span>Get it on Google Play</span>
                    </a>
                </div>
            </div>
        </div>

        {/* Community Features */}
        <div className="card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Why Join the Community?</h2>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="bg-[var(--primary-gold)] p-2 rounded-full">
                        <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)]">Network with Like-Minded Entrepreneurs</h4>
                        <p className="text-[var(--text-soft)] text-sm">Connect with peers at every stage of business growth.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="bg-[var(--primary-gold)] p-2 rounded-full">
                        <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)]">Live Weekly Events</h4>
                        <p className="text-[var(--text-soft)] text-sm">Join Christopher Shaw for strategy sessions and Q&A.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="bg-[var(--primary-gold)] p-2 rounded-full">
                        <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)]">Get Real-Time Support</h4>
                        <p className="text-[var(--text-soft)] text-sm">Ask questions, share wins, and get feedback from the community.</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-[var(--text-soft)] mb-4">Ready to connect? Use your Launch Pad login to access the community.</p>
                <div className="flex justify-center">
                    <button className="btn btn-primary">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Access Community Now
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default function TheCommunityPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                // Not logged in
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-gold)]"></div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <CommunityIntro />
                
                {/* Embedded Community */}
                <div id="community-embed" className="card p-4" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Access The Community</h2>
                    <div style={{ height: '800px', width: '100%' }} className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <iframe
                            src="https://thebminds.com"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="The Business Minds Community"
                            allow="fullscreen"
                        ></iframe>
                    </div>
                </div>

                <AppDownloadSection />
            </div>
        </div>
    );
}