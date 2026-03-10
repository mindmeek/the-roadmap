import React from 'react';
import { Handshake, CheckCircle } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

const PARTNERSHIP_TYPE_CONFIG = {
    referral: { label: 'Referral Partnerships', color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' },
    co_marketing: { label: 'Co-Marketing', color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' },
    joint_ventures: { label: 'Joint Ventures', color: 'border-green-500 bg-green-50 dark:bg-green-900/20' },
    reseller: { label: 'Reseller/White Label', color: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
    technology: { label: 'Technology/Integration', color: 'border-red-500 bg-red-50 dark:bg-red-900/20' },
};

export default function StrategicPartnershipsOverview({ formData }) {
    const hasData = formData.partnership_goals || formData.ideal_partners;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Handshake className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Partnership Strategy Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your partnership strategy here.</p>
            </div>
        );
    }

    const enabledTypes = Object.entries(formData.partnership_types || {}).filter(([_, val]) => val?.enabled);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Handshake className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Strategic Partnerships</h2>
                    {formData.partnership_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.partnership_goals}</p>}
                </div>
            </div>

            {/* Active Partnership Types */}
            {enabledTypes.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4">Partnership Types</h4>
                    <div className="space-y-3">
                        {enabledTypes.map(([key, val]) => {
                            const config = PARTNERSHIP_TYPE_CONFIG[key];
                            if (!config) return null;
                            return (
                                <div key={key} className={`pl-4 border-l-4 p-3 rounded-r-lg ${config.color}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle className="w-4 h-4 text-[var(--primary-gold)]" />
                                        <h5 className="font-semibold text-sm text-[var(--text-main)]">{config.label}</h5>
                                    </div>
                                    {val.description && <p className="text-xs text-[var(--text-soft)]">{val.description}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Strategy Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Ideal Partner Profile" value={formData.ideal_partners} />
                <Section title="Partnership Criteria" value={formData.partnership_criteria} />
                <Section title="Value Proposition to Partners" value={formData.value_proposition} />
                <Section title="Outreach Strategy" value={formData.outreach_strategy} />
                <Section title="Partnership Agreement" value={formData.partnership_agreement} />
                <Section title="Partnership Management" value={formData.partnership_management} />
            </div>

            <Section title="Success Metrics" value={formData.success_metrics} />
        </div>
    );
}