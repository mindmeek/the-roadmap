import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { CalendarDays, Video, Users, Sparkles, Clock, CheckCircle, Bell, Target, Zap, TrendingUp } from 'lucide-react';

export default function LiveWebinarPage() {
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

    // Calculate next live session (Tuesday or Thursday)
    const getNextSessionDate = () => {
        const date = new Date();
        // If today is Tuesday (2) or Thursday (4) and it's before 12 PM, show today
        if ((date.getDay() === 2 || date.getDay() === 4) && date.getHours() < 12) {
            return date;
        }
        
        // Otherwise find the next Tuesday or Thursday
        date.setDate(date.getDate() + 1);
        while (date.getDay() !== 2 && date.getDay() !== 4) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    };

    const nextWebinar = getNextSessionDate();
    const formattedDate = nextWebinar.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-gold)]"></div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Hero Section */}
                <div className="card p-6 md:p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20" style={{ borderRadius: '2px' }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full">
                            <CalendarDays className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3">
                        Join Our Live Community Sessions!
                    </h1>
                    <p className="text-lg text-[var(--text-soft)] max-w-2xl mx-auto mb-6">
                        Every session is designed to help you get at least 1% closer to building your vision of a successful business.
                    </p>
                    
                    {/* Next Session Info */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 shadow-lg mb-6" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Bell className="w-5 h-5 text-indigo-600 animate-pulse" />
                            <h2 className="text-lg font-bold text-indigo-600">Next Live Session:</h2>
                        </div>
                        <p className="text-2xl font-bold text-[var(--text-main)] mb-2">{formattedDate}</p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-[var(--text-soft)]" />
                            <p className="text-xl font-semibold text-[var(--text-main)]">12:00 PM - 1:00 PM</p>
                        </div>
                        
                        <a 
                            href="https://meet.google.com/fbs-gzea-wji" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary inline-flex items-center text-lg px-8 py-4 mb-3"
                        >
                            <Video className="w-5 h-5 mr-2" />
                            Join Live Session
                        </a>
                        
                        <p className="text-sm text-[var(--text-soft)]">
                            📅 <strong>Every Tuesday & Thursday</strong> at <strong>12:00 PM - 1:00 PM</strong><br/>
                            Join us live within the Community! Link opens 5 minutes before start time.
                        </p>
                    </div>
                </div>

                {/* What We'll Cover Section */}
                <div className="card p-6 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 text-center">What We'll Cover</h2>
                    <p className="text-center text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
                        We cover essential aspects of entrepreneurship, The HQ platform, and The Roadmap strategies to keep you moving forward.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mx-auto mb-4">
                                <Target className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2 text-center">Entrepreneurship</h3>
                            <p className="text-sm text-[var(--text-soft)] text-center">
                                Deep dives into the mindset, strategies, and skills needed to build and sustain a successful business.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-fit mx-auto mb-4">
                                <Zap className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2 text-center">The HQ</h3>
                            <p className="text-sm text-[var(--text-soft)] text-center">
                                Master our all-in-one platform with tutorials on automation, marketing, and system building.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                            <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full w-fit mx-auto mb-4">
                                <Users className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2 text-center">The Roadmap</h3>
                            <p className="text-sm text-[var(--text-soft)] text-center">
                                Guidance on navigating your 90-day journey, staying accountable, and hitting your milestones.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-[var(--primary-gold)]">
                        <p className="text-center text-[var(--text-main)] font-semibold">
                            🎯 <strong>Our Goal:</strong> To help you get at least 1% closer to building your vision of a successful business in every single session.
                        </p>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">What You'll Gain:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg flex-shrink-0">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Clear System Overview</h3>
                                <p className="text-sm text-[var(--text-soft)]">Understand exactly how to use our tools to transform your business vision into reality.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Actionable Strategies</h3>
                                <p className="text-sm text-[var(--text-soft)]">Walk away with specific tactics you can implement immediately to streamline and automate.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg flex-shrink-0">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Live Q&A Sessions</h3>
                                <p className="text-sm text-[var(--text-soft)]">Get your specific questions answered in real-time and learn from others' challenges.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg flex-shrink-0">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-[var(--text-main)] mb-2">Community Connection</h3>
                                <p className="text-sm text-[var(--text-soft)]">Network with fellow entrepreneurs who are on the same journey and build valuable relationships.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Section */}
                <div className="card p-6 md:p-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 text-center">Regular Schedule</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex-1 w-full max-w-xs">
                            <CalendarDays className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-2" />
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-1">Every Tuesday</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-2">12:00 PM - 1:00 PM</p>
                            <p className="text-xs text-[var(--text-soft)]">Live Community Session</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex-1 w-full max-w-xs">
                            <CalendarDays className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-2" />
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-1">Every Thursday</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-2">12:00 PM - 1:00 PM</p>
                            <p className="text-xs text-[var(--text-soft)]">Live Community Session</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center space-y-3">
                        <p className="text-sm text-[var(--text-soft)]">
                            💡 <strong>Note:</strong> Sessions are held every week within the Community (barring major holidays).
                        </p>
                        <div className="inline-block bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                                ⚡ <strong>Session Etiquette:</strong> Please have your questions ready and keep them under 5 minutes so we can ensure everyone gets supported!
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="card p-6 md:p-8 text-center" style={{ borderRadius: '2px' }}>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Ready to Join?</h2>
                    <p className="text-[var(--text-soft)] mb-6">
                        Mark your calendar and be part of our next live session at <strong>12:00 PM</strong>!
                    </p>
                    <a 
                        href="https://meet.google.com/fbs-gzea-wji" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary inline-flex items-center text-lg px-8 py-4"
                    >
                        <Video className="w-5 h-5 mr-2" />
                        Save the Webinar Link
                    </a>
                </div>
            </div>
        </div>
    );
}