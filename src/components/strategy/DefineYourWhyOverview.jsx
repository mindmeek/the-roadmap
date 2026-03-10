import React from 'react';
import { Heart, Star } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-5">
            <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

export default function DefineYourWhyOverview({ formData }) {
    const hasData = Object.values(formData).some(v => v && v.trim());

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No WHY Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your WHY here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* WHY Statement Hero */}
            {formData.why_statement && (
                <div className="card overflow-hidden">
                    <div className="h-20 bg-gradient-to-r from-pink-400 via-rose-500 to-red-500" />
                    <div className="px-6 pb-6">
                        <div className="flex items-end gap-4 -mt-8 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="border-l-4 border-[var(--primary-gold)] pl-4">
                            <p className="text-xs text-[var(--text-soft)] uppercase tracking-wide mb-1 font-semibold">My WHY Statement</p>
                            <blockquote className="text-lg font-medium text-[var(--text-main)] italic">"{formData.why_statement}"</blockquote>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Personal Story" value={formData.personal_story} />
                <Section title="What Drives Me" value={formData.what_drives_you} />
                <Section title="Problem I'm Solving" value={formData.problem_to_solve} />
                <Section title="Change I Want to Create" value={formData.change_in_world} />
                <Section title="Impact on Others" value={formData.impact_on_others} />
                <Section title="Core Values" value={formData.core_values} />
                <Section title="My Legacy" value={formData.legacy} />
            </div>
        </div>
    );
}