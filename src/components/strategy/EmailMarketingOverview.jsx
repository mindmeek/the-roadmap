import React from 'react';
import { Mail, Users, Send, CheckCircle } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

const EMAIL_TYPE_CONFIG = {
    welcome_series: { label: 'Welcome Email Series', color: 'indigo', border: 'border-indigo-500' },
    newsletter: { label: 'Regular Newsletter', color: 'purple', border: 'border-purple-500' },
    promotional: { label: 'Promotional Emails', color: 'green', border: 'border-green-500' },
    educational: { label: 'Educational Content', color: 'yellow', border: 'border-yellow-500' },
};

export default function EmailMarketingOverview({ formData }) {
    const hasData = formData.email_goals || formData.list_building_strategy;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Email Strategy Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your email strategy here.</p>
            </div>
        );
    }

    const leadMagnets = formData.lead_magnets?.filter(m => m?.trim()) || [];
    const enabledEmailTypes = Object.entries(formData.email_types || {}).filter(([_, val]) => val?.enabled);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Mail className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Email Marketing Strategy</h2>
                    {formData.email_platform && (
                        <p className="text-sm text-[var(--primary-gold)] font-medium mt-1">Platform: {formData.email_platform}</p>
                    )}
                    {formData.email_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.email_goals}</p>}
                </div>
            </div>

            {/* Strategy Foundation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Target Audience" value={formData.target_audience} />
                <Section title="List Building Strategy" value={formData.list_building_strategy} />
            </div>

            {/* Lead Magnets */}
            {leadMagnets.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Lead Magnets
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {leadMagnets.map((m, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm border border-indigo-200 dark:border-indigo-700">
                                <CheckCircle className="w-3.5 h-3.5" /> {m}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Email Types */}
            {enabledEmailTypes.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4 flex items-center gap-2">
                        <Send className="w-4 h-4" /> Email Types in Use
                    </h4>
                    <div className="space-y-4">
                        {enabledEmailTypes.map(([key, val]) => {
                            const config = EMAIL_TYPE_CONFIG[key];
                            if (!config) return null;
                            return (
                                <div key={key} className={`pl-4 border-l-4 ${config.border}`}>
                                    <h5 className="font-semibold text-sm text-[var(--text-main)] mb-1">{config.label}</h5>
                                    <div className="text-xs text-[var(--text-soft)] space-y-0.5">
                                        {val.frequency && <p><strong>Frequency:</strong> {val.frequency}</p>}
                                        {val.topics && <p><strong>Topics:</strong> {val.topics}</p>}
                                        {val.description && <p>{val.description}</p>}
                                        {val.strategy && <p>{val.strategy}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Advanced Strategy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Segmentation Strategy" value={formData.segmentation_strategy} />
                <Section title="Automation Sequences" value={formData.automation_sequences} />
                <Section title="Success Metrics" value={formData.success_metrics} />
            </div>
        </div>
    );
}