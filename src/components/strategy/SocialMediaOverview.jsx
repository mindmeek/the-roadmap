import React from 'react';
import { Share2, Target, Calendar } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

const PLATFORM_COLORS = {
    instagram: 'border-pink-500 bg-pink-50 dark:bg-pink-900/20',
    facebook: 'border-blue-600 bg-blue-50 dark:bg-blue-900/20',
    linkedin: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    twitter: 'border-sky-400 bg-sky-50 dark:bg-sky-900/20',
    tiktok: 'border-gray-800 bg-gray-50 dark:bg-gray-800/50',
    youtube: 'border-red-500 bg-red-50 dark:bg-red-900/20',
};

export default function SocialMediaOverview({ formData }) {
    const hasData = formData.social_media_goals || formData.content_pillars?.some(p => p?.trim());

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Share2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Social Media Strategy Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your strategy here.</p>
            </div>
        );
    }

    const contentPillars = formData.content_pillars?.filter(p => p?.trim()) || [];
    const enabledPlatforms = Object.entries(formData.target_platforms || {}).filter(([_, val]) => val?.enabled);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-pink-400 via-red-500 to-orange-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Share2 className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Social Media Strategy</h2>
                    {formData.social_media_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.social_media_goals}</p>}
                </div>
            </div>

            {/* Active Platforms */}
            {enabledPlatforms.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4">Active Platforms</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {enabledPlatforms.map(([platform, val]) => (
                            <div key={platform} className={`p-4 rounded-lg border-l-4 ${PLATFORM_COLORS[platform] || 'border-gray-400 bg-gray-50'}`}>
                                <h5 className="font-bold capitalize text-[var(--text-main)] mb-2">{platform}</h5>
                                {val.frequency && <p className="text-xs text-[var(--text-soft)] mb-1"><strong>Frequency:</strong> {val.frequency}</p>}
                                {val.strategy && <p className="text-xs text-[var(--text-soft)]">{val.strategy}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Content Pillars */}
            {contentPillars.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Content Pillars
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {contentPillars.map((p, i) => (
                            <div key={i} className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-3 text-center border border-pink-200 dark:border-pink-700">
                                <span className="text-xl font-bold text-pink-200 dark:text-pink-700 block mb-1">{i + 1}</span>
                                <p className="text-sm font-medium text-[var(--text-main)]">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Content & Engagement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Content Mix" value={formData.content_mix} />
                <Section title="Hashtag Strategy" value={formData.hashtag_strategy} />
            </div>

            {/* Posting & Metrics */}
            {(formData.posting_schedule || formData.engagement_strategy || formData.success_metrics) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Execution Plan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.posting_schedule && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Posting Schedule</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.posting_schedule}</p>
                            </div>
                        )}
                        {formData.engagement_strategy && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Engagement Strategy</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.engagement_strategy}</p>
                            </div>
                        )}
                        {formData.success_metrics && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Success Metrics</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.success_metrics}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}