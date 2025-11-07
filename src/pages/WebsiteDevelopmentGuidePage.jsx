import React from 'react';
import WebsiteDevelopmentGuide from '../components/strategy/WebsiteDevelopmentGuide';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function WebsiteDevelopmentGuidePage() {
    const navigate = useNavigate();

    return (
        <div className="px-4 pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(createPageUrl('MyStrategy'))}
                                className="btn btn-ghost p-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                 <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                                    <BookOpen className="w-6 h-6 text-[var(--primary-gold)]" />
                                </div>
                                <h1 className="text-xl md:text-2xl">Website Development Guide</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <WebsiteDevelopmentGuide />
            </div>
        </div>
    );
}