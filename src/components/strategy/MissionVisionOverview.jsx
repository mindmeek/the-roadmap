import React from 'react';
import { Compass, Target, Eye, Star } from 'lucide-react';

function Section({ title, value, color = 'text-[var(--primary-gold)]' }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-5">
            <h4 className={`font-bold text-sm uppercase tracking-wide mb-2 ${color}`}>{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

export default function MissionVisionOverview({ formData }) {
    const hasData = formData.mission_statement || formData.vision_statement ||
        (formData.core_values || []).some(v => v && v.trim());

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Compass className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Mission & Vision Yet</p>
                <p className="text-sm">Fill out the form and save to see your statements here.</p>
            </div>
        );
    }

    const coreValues = (formData.core_values || []).filter(v => v && v.trim());

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="card overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
                <div className="px-6 pb-6 pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
                        <Compass className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">Mission & Vision</h2>
                        <p className="text-sm text-[var(--text-soft)]">Your purpose and future direction</p>
                    </div>
                </div>
            </div>

            {/* Mission */}
            {formData.mission_statement && (
                <div className="card p-6 border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-blue-500" />
                        <h3 className="font-bold text-lg text-blue-600">Mission Statement</h3>
                    </div>
                    <blockquote className="text-[var(--text-main)] text-base leading-relaxed italic">"{formData.mission_statement}"</blockquote>
                </div>
            )}

            {/* Vision */}
            {formData.vision_statement && (
                <div className="card p-6 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-2 mb-3">
                        <Eye className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-bold text-lg text-indigo-600">Vision Statement</h3>
                    </div>
                    <blockquote className="text-[var(--text-main)] text-base leading-relaxed italic">"{formData.vision_statement}"</blockquote>
                </div>
            )}

            {/* Core Values */}
            {coreValues.length > 0 && (
                <div className="card p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-[var(--primary-gold)]" />
                        <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)]">Core Values</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {coreValues.map((v, i) => (
                            <span key={i} className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{v}</span>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Future State" value={formData.vision_future_state} color="text-indigo-600" />
                <Section title="Milestones" value={formData.vision_timeline} color="text-indigo-600" />
                <Section title="Impact" value={formData.vision_impact} color="text-indigo-600" />
                <Section title="Guiding Principles" value={formData.guiding_principles} color="text-purple-600" />
            </div>
        </div>
    );
}