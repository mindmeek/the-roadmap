import React from 'react';
import { Users, Target, Heart, MessageCircle, TrendingUp, BarChart2 } from 'lucide-react';

export default function CommunityBuildingOverview({ formData }) {
    const hasData = formData.community_vision || formData.value_proposition || formData.growth_strategy;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Community Plan Data Yet</p>
                <p className="text-sm">Fill out the form and save to see your visual overview here.</p>
            </div>
        );
    }

    const filledPillars = (formData.content_pillars || []).filter(p => p && p.trim());

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Community Building Plan</h2>
                <p className="text-[var(--text-soft)]">Your roadmap to a thriving community</p>
            </div>

            {/* Top Hero Card */}
            {formData.community_vision && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-6 text-center">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Community Vision</h3>
                    <p className="text-[var(--text-soft)]">{formData.community_vision}</p>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {formData.community_type && (
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                {formData.community_type}
                            </span>
                        )}
                        {formData.community_platform && (
                            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">
                                📍 {formData.community_platform}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Key Info Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {formData.target_members && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" /> Target Members
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.target_members}</p>
                    </div>
                )}
                {formData.value_proposition && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-pink-600" /> Why Members Join
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.value_proposition}</p>
                    </div>
                )}
                {formData.member_benefits && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-600" /> Member Benefits
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.member_benefits}</p>
                    </div>
                )}
                {formData.engagement_activities && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-blue-600" /> Engagement Activities
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.engagement_activities}</p>
                    </div>
                )}
                {formData.growth_strategy && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-600" /> Growth Strategy
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.growth_strategy}</p>
                    </div>
                )}
                {formData.success_metrics && (
                    <div className="card p-5">
                        <h4 className="font-bold text-[var(--text-main)] mb-2 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-purple-600" /> Success Metrics
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">{formData.success_metrics}</p>
                    </div>
                )}
            </div>

            {/* Content Pillars */}
            {filledPillars.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-[var(--text-main)] mb-3">Content Pillars</h4>
                    <div className="flex flex-wrap gap-2">
                        {filledPillars.map((pillar, i) => (
                            <span key={i} className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                {pillar}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {formData.moderation_guidelines && (
                <div className="card p-5 border-l-4 border-gray-400">
                    <h4 className="font-bold text-[var(--text-main)] mb-2">Moderation Guidelines</h4>
                    <p className="text-sm text-[var(--text-soft)]">{formData.moderation_guidelines}</p>
                </div>
            )}
        </div>
    );
}