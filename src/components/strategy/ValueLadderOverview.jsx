import React from 'react';
import { TrendingUp, DollarSign, Users, ArrowUp } from 'lucide-react';

const LEVEL_COLORS = [
    { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
    { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
    { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' },
    { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
    { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
    { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-300', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
];

export default function ValueLadderOverview({ formData }) {
    const filledLevels = (formData.ladder_levels || []).filter(l => l.offer_name || l.description);

    if (filledLevels.length === 0) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Value Ladder Data Yet</p>
                <p className="text-sm">Fill out the form and save to see your visual overview here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Your Value Ladder</h2>
                <p className="text-[var(--text-soft)]">From entry-level to premium — your complete offering structure</p>
            </div>

            {/* Ladder Visual */}
            <div className="space-y-3">
                {[...(formData.ladder_levels || [])].reverse().map((level, idx) => {
                    const colorIdx = (formData.ladder_levels.length - 1 - idx) % LEVEL_COLORS.length;
                    const colors = LEVEL_COLORS[colorIdx];
                    const widthClass = ['w-full', 'w-11/12', 'w-10/12', 'w-9/12', 'w-8/12', 'w-7/12'][idx] || 'w-full';
                    if (!level.offer_name && !level.description) return null;
                    return (
                        <div key={idx} className={`mx-auto ${widthClass} transition-all duration-300`}>
                            <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4`}>
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors.badge}`}>
                                            {level.level}
                                        </span>
                                        <h3 className={`font-bold text-base ${colors.text}`}>{level.offer_name}</h3>
                                    </div>
                                    {level.price && (
                                        <span className="flex items-center gap-1 font-bold text-[var(--text-main)] text-sm">
                                            <DollarSign className="w-4 h-4" />
                                            {level.price}
                                        </span>
                                    )}
                                </div>
                                {level.description && (
                                    <p className="text-sm text-[var(--text-soft)] mt-2">{level.description}</p>
                                )}
                                {level.target_audience && (
                                    <p className="text-xs text-[var(--text-soft)] mt-1 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {level.target_audience}
                                    </p>
                                )}
                                {level.example && (
                                    <p className="text-xs text-[var(--text-soft)] mt-1 italic">
                                        Example: {level.example}
                                    </p>
                                )}
                            </div>
                            {idx < (formData.ladder_levels || []).length - 1 && (
                                <div className="flex justify-center my-1">
                                    <ArrowUp className="w-5 h-5 text-gray-400" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Strategy Summary */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
                {formData.upsell_strategy && (
                    <div className="card p-4">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm uppercase tracking-wide">Upsell Strategy</h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.upsell_strategy}</p>
                    </div>
                )}
                {formData.cross_sell_opportunities && (
                    <div className="card p-4">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm uppercase tracking-wide">Cross-Sell Opportunities</h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.cross_sell_opportunities}</p>
                    </div>
                )}
                {formData.retention_plan && (
                    <div className="card p-4">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 text-sm uppercase tracking-wide">Retention Plan</h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.retention_plan}</p>
                    </div>
                )}
            </div>
        </div>
    );
}