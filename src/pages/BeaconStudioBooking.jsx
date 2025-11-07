import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Podcast, DollarSign, Clock, Video, Users } from 'lucide-react';

export default function BeaconStudioBookingPage() {
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
                        <div className="bg-[var(--primary-gold)]/20 p-3 rounded-lg">
                            <Podcast className="w-6 h-6 text-[var(--primary-gold)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Book Podcast Studio Time</h1>
                            <p className="text-sm text-[var(--text-soft)]">Professional recording in Mesquite, TX</p>
                        </div>
                    </div>
                </div>

                {/* Studio Details */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Studio Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                                <Podcast className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Professional Audio</h4>
                                <p className="text-sm text-[var(--text-soft)]">Sound-treated room with high-quality microphones</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                                <Video className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Video Recording</h4>
                                <p className="text-sm text-[var(--text-soft)]">Professional cameras for video podcasts</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                                <Users className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Optional Engineer</h4>
                                <p className="text-sm text-[var(--text-soft)]">Expert support available for your session</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                                <Clock className="w-5 h-5 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)]">Flexible Booking</h4>
                                <p className="text-sm text-[var(--text-soft)]">Book by the hour to fit your schedule</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Reminder */}
                <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-[var(--primary-gold)]">
                    <h3 className="font-bold text-[var(--text-main)] mb-3 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                        Studio Rates
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-[var(--text-soft)]">DIY Studio (you run the show) + Video</span>
                            <span className="font-bold text-lg text-[var(--text-main)]">$50/hour</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[var(--text-soft)]">With Professional Engineer + Video</span>
                            <span className="font-bold text-lg text-[var(--text-main)]">$75/hour</span>
                        </div>
                    </div>
                    <p className="text-xs text-[var(--text-soft)] mt-4">
                        * Video recording included in both packages. Add-ons for editing and social media clips available.
                    </p>
                </div>

                {/* Calendly Embed */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Select Your Date & Time</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <iframe 
                            src="https://calendly.com/YOUR_CALENDLY_PAID_BOOKING_LINK_HERE" 
                            width="100%" 
                            height="700" 
                            frameBorder="0"
                            title="Paid Studio Booking"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}