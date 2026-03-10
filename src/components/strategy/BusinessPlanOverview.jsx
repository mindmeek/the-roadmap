import React from 'react';
import { Briefcase } from 'lucide-react';

function Block({ title, content, color, highlight }) {
    if (!content) return (
        <div className={`border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 h-full min-h-[100px] flex items-center justify-center`}>
            <p className="text-xs text-gray-300 dark:text-gray-600 italic">Not filled yet</p>
        </div>
    );
    return (
        <div className={`border-2 ${highlight ? 'border-[var(--primary-gold)]' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-4 h-full`}>
            <h4 className={`font-bold text-xs uppercase tracking-wide mb-2 ${highlight ? 'text-[var(--primary-gold)]' : color}`}>{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed whitespace-pre-line">{content}</p>
        </div>
    );
}

export default function BusinessPlanOverview({ formData }) {
    const hasData = Object.values(formData).some(v => v && v.trim());

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Business Plan Data Yet</p>
                <p className="text-sm">Fill out the form and save to see your visual overview here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">One Page Business Plan</h2>
                <p className="text-[var(--text-soft)]">Your complete business model at a glance</p>
            </div>

            {/* Top Row: Partners | Activities | Resources | Value Props | Relationships | Channels | Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left: Infrastructure */}
                <div className="space-y-4">
                    <Block title="Key Partners" content={formData.keyPartners} color="text-blue-600" />
                    <Block title="Key Activities" content={formData.keyActivities} color="text-green-600" />
                    <Block title="Key Resources" content={formData.keyResources} color="text-orange-600" />
                </div>

                {/* Middle: Offering */}
                <div className="space-y-4">
                    <Block title="Value Propositions" content={formData.valuePropositions} color="text-yellow-600" highlight />
                    <Block title="Customer Relationships" content={formData.customerRelationships} color="text-pink-600" />
                    <Block title="Channels" content={formData.channels} color="text-teal-600" />
                </div>

                {/* Right: Customers */}
                <div className="space-y-4">
                    <Block title="Customer Segments" content={formData.customerSegments} color="text-purple-600" highlight />
                    <Block title="Revenue Streams" content={formData.revenueStreams} color="text-green-600" />
                </div>
            </div>

            {/* Bottom: Cost Structure */}
            <Block title="Cost Structure" content={formData.costStructure} color="text-red-600" />
        </div>
    );
}