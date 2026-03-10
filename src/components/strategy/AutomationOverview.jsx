import React from 'react';
import { Zap, Settings, CheckCircle } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

const PROCESS_NAMES = {
    lead_generation: 'Lead Generation & Capture',
    email_marketing: 'Email Marketing',
    social_media: 'Social Media Management',
    sales_process: 'Sales Process',
    customer_onboarding: 'Customer Onboarding',
    billing_invoicing: 'Billing & Invoicing',
    customer_support: 'Customer Support',
};

export default function AutomationOverview({ formData }) {
    const hasData = formData.automation_goals || formData.time_consuming_tasks;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Automation Plan Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your automation plan here.</p>
            </div>
        );
    }

    const enabledProcesses = Object.entries(formData.processes_to_automate || {}).filter(([_, val]) => val?.enabled);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Automation & Systems Plan</h2>
                    {formData.automation_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.automation_goals}</p>}
                </div>
            </div>

            {/* Automated Processes */}
            {enabledProcesses.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Processes Being Automated
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {enabledProcesses.map(([key, val]) => (
                            <div key={key} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle className="w-4 h-4 text-orange-600" />
                                    <h5 className="font-semibold text-sm text-[var(--text-main)]">{PROCESS_NAMES[key] || key}</h5>
                                </div>
                                {val.description && <p className="text-xs text-[var(--text-soft)] mb-1">{val.description}</p>}
                                {val.tools && <p className="text-xs text-orange-700 dark:text-orange-400 font-medium">Tools: {val.tools}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Strategy Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Most Time-Consuming Tasks" value={formData.time_consuming_tasks} />
                <Section title="Automation Tools & Tech Stack" value={formData.automation_tools} />
                <Section title="SOPs & Documentation" value={formData.sop_documentation} />
                <Section title="Team Delegation Plan" value={formData.team_delegation} />
                <Section title="Implementation Timeline" value={formData.implementation_timeline} />
                <Section title="Success Metrics" value={formData.success_metrics} />
            </div>
        </div>
    );
}