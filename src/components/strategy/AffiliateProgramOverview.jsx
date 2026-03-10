import React from 'react';
import { Percent, DollarSign, Users, Gift } from 'lucide-react';

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

export default function AffiliateProgramOverview({ formData }) {
    const hasData = formData.program_goals || formData.commission_structure;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Percent className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Affiliate Program Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your affiliate program here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Percent className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Affiliate Program</h2>
                    {formData.tracking_platform && <p className="text-sm text-[var(--primary-gold)] font-medium">Platform: {formData.tracking_platform}</p>}
                    {formData.program_goals && <p className="text-sm text-[var(--text-soft)] mt-1">{formData.program_goals}</p>}
                </div>
            </div>

            {/* Commission Highlights */}
            {(formData.commission_structure || formData.cookie_duration || formData.payment_terms) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Commission Structure
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.commission_structure && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-700">
                                <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Commission Rates</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.commission_structure}</p>
                            </div>
                        )}
                        {formData.cookie_duration && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Cookie Duration</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.cookie_duration}</p>
                            </div>
                        )}
                        {formData.payment_terms && (
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                                <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-1">Payment Terms</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.payment_terms}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Products & Affiliates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Products to Promote" value={formData.products_to_promote} />
                <Section title="Ideal Affiliate Profile" value={formData.ideal_affiliates} />
                <Section title="Recruitment Strategy" value={formData.recruitment_strategy} />
                <Section title="Affiliate Benefits" value={formData.affiliate_benefits} />
            </div>

            {/* Support */}
            {(formData.promotional_materials || formData.support_resources || formData.performance_incentives) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Gift className="w-4 h-4" /> Affiliate Support
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {formData.promotional_materials && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Promotional Materials</p>
                                <p className="text-[var(--text-main)]">{formData.promotional_materials}</p>
                            </div>
                        )}
                        {formData.support_resources && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Support & Training</p>
                                <p className="text-[var(--text-main)]">{formData.support_resources}</p>
                            </div>
                        )}
                        {formData.performance_incentives && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Performance Incentives</p>
                                <p className="text-[var(--text-main)]">{formData.performance_incentives}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Section title="Approval Process" value={formData.approval_process} />
            <Section title="Success Metrics" value={formData.success_metrics} />
        </div>
    );
}