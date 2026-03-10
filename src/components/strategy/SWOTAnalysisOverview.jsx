import React from 'react';
import { TrendingUp, AlertTriangle, Zap, Shield } from 'lucide-react';

const quadrantConfig = [
    { id: 'strengths', title: 'Strengths', icon: TrendingUp, bg: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800', badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300', header: 'text-green-700 dark:text-green-400' },
    { id: 'weaknesses', title: 'Weaknesses', icon: AlertTriangle, bg: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800', badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300', header: 'text-red-700 dark:text-red-400' },
    { id: 'opportunities', title: 'Opportunities', icon: Zap, bg: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', header: 'text-blue-700 dark:text-blue-400' },
    { id: 'threats', title: 'Threats', icon: Shield, bg: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300', header: 'text-orange-700 dark:text-orange-400' },
];

export default function SWOTAnalysisOverview({ formData }) {
    const hasData = quadrantConfig.some(q => (formData[q.id] || []).some(i => i && i.trim()));

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No SWOT Data Yet</p>
                <p className="text-sm">Fill out the form and save to see your SWOT analysis here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="card overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500" />
                <div className="px-6 pb-6 pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-main)]">SWOT Analysis</h2>
                        <p className="text-sm text-[var(--text-soft)]">Your 360° strategic positioning overview</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quadrantConfig.map(({ id, title, icon: Icon, bg, badge, header }) => {
                    const items = (formData[id] || []).filter(i => i && i.trim());
                    return (
                        <div key={id} className={`card p-5 border ${bg}`}>
                            <h4 className={`font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 ${header}`}>
                                <Icon className="w-4 h-4" />
                                {title}
                            </h4>
                            {items.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item, i) => (
                                        <span key={i} className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badge}`}>{item}</span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-[var(--text-soft)] italic">No items added yet.</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}