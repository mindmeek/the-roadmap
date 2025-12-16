import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Podcast, DollarSign, Clock, Video, Users, CheckCircle, Lock, Calendar } from 'lucide-react';

export default function BeaconStudioBookingPage() {
    const navigate = useNavigate();
    const [bookingStep, setBookingStep] = useState(1);
    const [preInterviewConfirmed, setPreInterviewConfirmed] = useState(false);

    // Inject GHL script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://link.thebusinessminds.com/js/form_embed.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if(document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const handlePreInterviewComplete = () => {
        setPreInterviewConfirmed(true);
        setBookingStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

                {/* Step Progress */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className={`flex items-center space-x-2 ${bookingStep === 1 ? 'text-[var(--primary-gold)]' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${bookingStep >= 1 ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)] text-white' : 'border-gray-300'}`}>
                            {bookingStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                        </div>
                        <span className="font-semibold">Pre-Interview</span>
                    </div>
                    <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className={`h-full bg-[var(--primary-gold)] transition-all duration-300 ${bookingStep === 2 ? 'w-full' : 'w-0'}`}></div>
                    </div>
                    <div className={`flex items-center space-x-2 ${bookingStep === 2 ? 'text-[var(--primary-gold)]' : 'text-gray-400'}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${bookingStep === 2 ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)] text-white' : 'border-gray-300'}`}>
                            2
                        </div>
                        <span className="font-semibold">Session Booking</span>
                    </div>
                </div>

                {/* Studio Details - Always visible or only on step 2? Keep visible for context */}
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

                {/* Step 1: Pre-Interview Call */}
                {bookingStep === 1 && (
                    <div className="card p-6 border-2 border-blue-100 dark:border-blue-900">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Step 1: Book Your Pre-Interview</h2>
                                <p className="text-sm text-[var(--text-soft)]">Required before booking your recording session</p>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                                <strong>Why do I need a pre-interview?</strong> This short 20-minute meeting helps us understand your topics, ensure you're a good fit, and prepare the studio for your best recording experience.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden min-h-[600px] mb-6">
                            <iframe 
                                src="https://link.thebusinessminds.com/widget/booking/I9vBUFPNbYkEOMNVFYdQ" 
                                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }} 
                                scrolling="no" 
                                id="I9vBUFPNbYkEOMNVFYdQ_1765914224957"
                                title="Pre-Interview Booking"
                            ></iframe>
                        </div>

                        <div className="flex flex-col items-center justify-center border-t border-gray-200 dark:border-gray-700 pt-6">
                            <p className="mb-4 text-sm font-medium">Once you've booked your time above, click below to proceed.</p>
                            <button 
                                onClick={handlePreInterviewComplete}
                                className="btn btn-primary w-full md:w-auto px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                I have booked my Pre-Interview <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Full Booking */}
                {bookingStep === 2 && (
                    <div className="card p-6 border-2 border-[var(--primary-gold)]">
                         <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-[var(--primary-gold)]/20 p-3 rounded-full">
                                    <Video className="w-6 h-6 text-[var(--primary-gold)]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Step 2: Book Your Recording Session</h2>
                                    <p className="text-sm text-[var(--text-soft)]">Select your studio time below</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setBookingStep(1)}
                                className="text-sm text-[var(--text-soft)] hover:underline"
                            >
                                Back to Step 1
                            </button>
                        </div>

                        {/* Pricing Reminder */}
                        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-[var(--primary-gold)] rounded-lg p-4">
                            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
                                <DollarSign className="w-4 h-4 mr-1 text-[var(--primary-gold)]" />
                                Reminder: Studio Rates
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between items-center bg-white dark:bg-black/20 p-2 rounded">
                                    <span className="text-[var(--text-soft)]">DIY Studio + Video</span>
                                    <span className="font-bold text-[var(--text-main)]">$50/hour</span>
                                </div>
                                <div className="flex justify-between items-center bg-white dark:bg-black/20 p-2 rounded">
                                    <span className="text-[var(--text-soft)]">With Engineer + Video</span>
                                    <span className="font-bold text-[var(--text-main)]">$75/hour</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden min-h-[700px]">
                            <iframe 
                                src="https://link.thebusinessminds.com/widget/booking/ZEgueKsErjqJyixfORgN" 
                                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px' }} 
                                scrolling="no" 
                                id="ZEgueKsErjqJyixfORgN_1765914260325"
                                title="Full Recording Booking"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}