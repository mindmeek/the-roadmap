import React from 'react';
import { FileText, Target, Calendar } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

const CONTENT_TYPE_LABELS = {
    blog_posts: { label: 'Blog Posts', color: 'green', border: 'border-green-500' },
    social_media: { label: 'Social Media', color: 'blue', border: 'border-blue-500' },
    email_marketing: { label: 'Email Marketing', color: 'purple', border: 'border-purple-500' },
    video_content: { label: 'Video Content', color: 'red', border: 'border-red-500' },
    podcasts: { label: 'Podcasts', color: 'orange', border: 'border-orange-500' },
};

export default function ContentStrategyOverview({ formData }) {
    const hasData = formData.content_goals || formData.content_pillars?.some(p => p?.trim());

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Content Strategy Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your content strategy here.</p>
            </div>
        );
    }

    const contentPillars = formData.content_pillars?.filter(p => p?.trim()) || [];
    const activeContentTypes = Object.entries(formData.content_types || {}).filter(([key, val]) => {
        if (key === 'other') return val?.type?.trim();
        return val?.frequency?.trim() || val?.topics?.trim() || val?.platforms?.trim() || val?.content_mix?.trim() || val?.types?.trim();
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <FileText className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Content Strategy</h2>
                    {formData.content_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.content_goals}</p>}
                </div>
            </div>

            {/* Content Pillars */}
            {contentPillars.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" /> Content Pillars
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {contentPillars.map((p, i) => (
                            <div key={i} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-700">
                                <span className="text-xl font-bold text-green-200 dark:text-green-700 block mb-1">{i + 1}</span>
                                <p className="text-sm font-medium text-[var(--text-main)]">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Content Types */}
            {activeContentTypes.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4">Content Mix</h4>
                    <div className="space-y-4">
                        {activeContentTypes.map(([key, val]) => {
                            const config = CONTENT_TYPE_LABELS[key];
                            if (!config) return null;
                            return (
                                <div key={key} className={`pl-4 border-l-4 ${config.border}`}>
                                    <h5 className="font-semibold text-sm text-[var(--text-main)] mb-1">{config.label}</h5>
                                    <div className="flex flex-wrap gap-4 text-xs text-[var(--text-soft)]">
                                        {val.frequency && <span><strong>Frequency:</strong> {val.frequency}</span>}
                                        {val.platforms && <span><strong>Platforms:</strong> {val.platforms}</span>}
                                        {val.topics && <span><strong>Topics:</strong> {val.topics}</span>}
                                        {val.types && <span><strong>Types:</strong> {val.types}</span>}
                                        {val.content_mix && <span><strong>Mix:</strong> {val.content_mix}</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Distribution & Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Target Audience" value={formData.target_audience_content} />
                <Section title="SEO Keywords" value={formData.seo_keywords} />
                <Section title="Distribution Channels" value={formData.distribution_channels} />
                <Section title="Content Repurposing Plan" value={formData.content_repurposing_plan} />
            </div>

            {/* Calendar & Metrics */}
            {(formData.content_calendar || formData.metrics_to_track) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Calendar & Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.content_calendar && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Calendar Approach</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.content_calendar}</p>
                            </div>
                        )}
                        {formData.metrics_to_track && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Metrics to Track</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.metrics_to_track}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}