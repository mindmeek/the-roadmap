import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mic, CheckCircle, Video, Users, Target, Calendar as CalendarIcon } from 'lucide-react';

export default function BusinessMindsPodcastBookingPage() {
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState({
        community_intro: false,
        roadmap: false,
        strategy_session: false
    });

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

    const toggleChecklistItem = (item) => {
        setChecklist(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const allStepsComplete = checklist.community_intro && checklist.roadmap && checklist.strategy_session;

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="card p-6 border-l-4 border-[var(--primary-gold)]">
                    <button 
                        onClick={() => navigate(createPageUrl('TheBeacon'))}
                        className="btn btn-ghost p-2 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to The Beacon
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="bg-[var(--primary-gold)]/20 p-4 rounded-full">
                            <Mic className="w-8 h-8 text-[var(--primary-gold)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">The Business Minds Podcast</h1>
                            <p className="text-base text-[var(--text-soft)] mt-1">Guest Booking Portal</p>
                        </div>
                    </div>
                </div>

                {/* Requirements Checklist */}
                <div className="card p-6 border-2 border-blue-100 dark:border-blue-900 shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">Before You Book Your Podcast Interview</h2>
                        <p className="text-[var(--text-soft)]">Complete these three steps to qualify for your podcast recording session:</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        {/* Step 1: Community Introduction */}
                        <div 
                            onClick={() => toggleChecklistItem('community_intro')}
                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                checklist.community_intro 
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    checklist.community_intro 
                                        ? 'bg-green-500 text-white' 
                                        : 'border-2 border-gray-300 dark:border-gray-600'
                                }`}>
                                    {checklist.community_intro && <CheckCircle className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-bold text-[var(--text-main)]">Step 1: Introduce Yourself in The Community</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                        Join our community and share who you are, what your business does, and why you want to be on the podcast. This helps us and our members get to know you!
                                    </p>
                                    <a 
                                        href={createPageUrl('TheCommunity')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Go to Community →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Get Roadmap */}
                        <div 
                            onClick={() => toggleChecklistItem('roadmap')}
                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                checklist.roadmap 
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    checklist.roadmap 
                                        ? 'bg-green-500 text-white' 
                                        : 'border-2 border-gray-300 dark:border-gray-600'
                                }`}>
                                    {checklist.roadmap && <CheckCircle className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-5 h-5 text-purple-600" />
                                        <h3 className="font-bold text-[var(--text-main)]">Step 2: Get Your Free 90-Day Business Roadmap</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                        Set up your personalized 90-day journey. This gives us insight into your business goals and helps us prepare relevant podcast topics for your interview.
                                    </p>
                                    <a 
                                        href={createPageUrl('Journey')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Start My Journey →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Strategy Session */}
                        <div 
                            onClick={() => toggleChecklistItem('strategy_session')}
                            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                checklist.strategy_session 
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    checklist.strategy_session 
                                        ? 'bg-green-500 text-white' 
                                        : 'border-2 border-gray-300 dark:border-gray-600'
                                }`}>
                                    {checklist.strategy_session && <CheckCircle className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CalendarIcon className="w-5 h-5 text-orange-600" />
                                        <h3 className="font-bold text-[var(--text-main)]">Step 3: Book Your Free Strategy Session</h3>
                                    </div>
                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                        Schedule a free strategy call where we'll get to know you, your company, discuss your goals, and plan out your podcast interview topics.
                                    </p>
                                    <a 
                                        href={createPageUrl('StrategySession')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline font-medium"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Book Strategy Session →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[var(--text-soft)]">
                                {Object.values(checklist).filter(Boolean).length} of 3 steps completed
                            </span>
                            <span className="text-sm font-bold text-[var(--primary-gold)]">
                                {Math.round((Object.values(checklist).filter(Boolean).length / 3) * 100)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                                style={{ width: `${(Object.values(checklist).filter(Boolean).length / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Book Interview Button */}
                    {allStepsComplete ? (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-500">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                                <div>
                                    <h3 className="font-bold text-lg text-[var(--text-main)]">You're Ready! 🎉</h3>
                                    <p className="text-sm text-[var(--text-soft)]">All steps completed - now book your podcast recording session</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden min-h-[700px] shadow-inner">
                                <iframe 
                                    src="https://link.thebusinessminds.com/widget/booking/ZEgueKsErjqJyixfORgN" 
                                    style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px' }} 
                                    scrolling="no" 
                                    id="ZEgueKsErjqJyixfORgN_1765914260325"
                                    title="Podcast Recording Booking"
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                            <Video className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-[var(--text-soft)] font-medium">
                                Complete all 3 steps above to unlock podcast interview booking
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}