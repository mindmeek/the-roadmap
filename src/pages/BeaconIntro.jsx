import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';

export default function BeaconIntroPage() {
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Free 15-Minute Intro Session</h1>
                            <p className="text-sm text-[var(--text-soft)]">Meet our team and plan your vision</p>
                        </div>
                    </div>
                </div>

                {/* What to Expect */}
                <div className="card p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">What to Expect</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[var(--text-soft)]">
                                Quick tour of our podcast studio and equipment (for local visitors) or virtual walkthrough
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[var(--text-soft)]">
                                Discussion of your show concept, audience, and goals
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[var(--text-soft)]">
                                Recommendations on equipment, format, and production needs
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[var(--text-soft)]">
                                Overview of pricing and packages that fit your budget
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-[var(--text-soft)]">
                                Q&A time to answer all your questions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Prerequisite */}
                <div className="card p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] mb-2">⚠️ Before You Book</h3>
                    <p className="text-sm text-[var(--text-soft)]">
                        We recommend completing the <strong>"Plan Your Show"</strong> interactive form on The Beacon page. 
                        This helps us understand your vision and provide better recommendations during your intro session.
                    </p>
                </div>

                {/* Calendly Embed */}
                <div className="card p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Schedule Your Free Intro Session</h2>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-4">
                        <iframe 
                            src="https://calendly.com/YOUR_CALENDLY_LINK_HERE" 
                            width="100%" 
                            height="700" 
                            frameBorder="0"
                            title="Free Intro Session Booking"
                            className="min-h-[600px] sm:min-h-[700px]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}