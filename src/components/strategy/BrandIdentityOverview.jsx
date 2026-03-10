import React from 'react';
import { Palette, MessageSquare, Image } from 'lucide-react';

function Section({ title, value }) {
    if (!value || (typeof value === 'string' && !value.trim())) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

function ColorSwatch({ color }) {
    if (!color || !color.trim()) return null;
    const isHex = color.startsWith('#');
    return (
        <div className="flex items-center gap-2">
            {isHex && (
                <div className="w-6 h-6 rounded border border-gray-200" style={{ backgroundColor: color }} />
            )}
            <span className="text-sm text-[var(--text-soft)]">{color}</span>
        </div>
    );
}

export default function BrandIdentityOverview({ formData }) {
    const hasData = formData.brand_name || formData.tagline || formData.brand_story;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Palette className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Brand Identity Defined Yet</p>
                <p className="text-sm">Fill out the form and save to see your brand overview here.</p>
            </div>
        );
    }

    const primaryColors = formData.visual_identity?.primary_colors?.filter(c => c?.trim()) || [];
    const secondaryColors = formData.visual_identity?.secondary_colors?.filter(c => c?.trim()) || [];
    const coreValues = formData.core_values?.filter(v => v?.trim()) || [];
    const messagingPillars = formData.key_messaging_pillars?.filter(p => p?.trim()) || [];

    return (
        <div className="space-y-6">
            {/* Brand Hero */}
            <div className="card overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
                <div className="px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-8 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <Palette className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    {formData.brand_name && (
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-1">{formData.brand_name}</h2>
                    )}
                    {formData.tagline && (
                        <p className="text-[var(--primary-gold)] font-medium italic">"{formData.tagline}"</p>
                    )}
                </div>
            </div>

            {/* Core Statements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Section title="Mission Statement" value={formData.mission_statement} />
                <Section title="Vision Statement" value={formData.vision_statement} />
                <Section title="Unique Value Proposition" value={formData.unique_value_proposition} />
                <Section title="Brand Story" value={formData.brand_story} />
            </div>

            {/* Core Values */}
            {coreValues.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3">Core Values</h4>
                    <div className="flex flex-wrap gap-2">
                        {coreValues.map((v, i) => (
                            <span key={i} className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">{v}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Brand Personality */}
            {(formData.brand_personality?.traits || formData.brand_personality?.tone_of_voice || formData.brand_personality?.communication_style) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Brand Personality
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.brand_personality?.traits && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Personality Traits</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.brand_personality.traits}</p>
                            </div>
                        )}
                        {formData.brand_personality?.tone_of_voice && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Tone of Voice</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.brand_personality.tone_of_voice}</p>
                            </div>
                        )}
                        {formData.brand_personality?.communication_style && (
                            <div>
                                <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Communication Style</p>
                                <p className="text-sm text-[var(--text-main)]">{formData.brand_personality.communication_style}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Visual Identity */}
            {(primaryColors.length > 0 || secondaryColors.length > 0 || formData.visual_identity?.logo_concept) && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3 flex items-center gap-2">
                        <Image className="w-4 h-4" /> Visual Identity
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(primaryColors.length > 0 || secondaryColors.length > 0) && (
                            <div>
                                {primaryColors.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-xs font-semibold text-[var(--text-soft)] mb-2">Primary Colors</p>
                                        <div className="space-y-1">
                                            {primaryColors.map((c, i) => <ColorSwatch key={i} color={c} />)}
                                        </div>
                                    </div>
                                )}
                                {secondaryColors.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-[var(--text-soft)] mb-2">Secondary Colors</p>
                                        <div className="space-y-1">
                                            {secondaryColors.map((c, i) => <ColorSwatch key={i} color={c} />)}
                                        </div>
                                    </div>
                                )}
                                {(formData.visual_identity?.fonts?.primary_font || formData.visual_identity?.fonts?.secondary_font) && (
                                    <div className="mt-3">
                                        <p className="text-xs font-semibold text-[var(--text-soft)] mb-2">Fonts</p>
                                        {formData.visual_identity.fonts.primary_font && <p className="text-sm text-[var(--text-main)]">Primary: {formData.visual_identity.fonts.primary_font}</p>}
                                        {formData.visual_identity.fonts.secondary_font && <p className="text-sm text-[var(--text-main)]">Secondary: {formData.visual_identity.fonts.secondary_font}</p>}
                                    </div>
                                )}
                            </div>
                        )}
                        <div>
                            {formData.visual_identity?.logo_concept && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Logo Concept</p>
                                    <p className="text-sm text-[var(--text-main)]">{formData.visual_identity.logo_concept}</p>
                                </div>
                            )}
                            {formData.visual_identity?.imagery_style && (
                                <div>
                                    <p className="text-xs font-semibold text-[var(--text-soft)] mb-1">Imagery Style</p>
                                    <p className="text-sm text-[var(--text-main)]">{formData.visual_identity.imagery_style}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Key Messaging Pillars */}
            {messagingPillars.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-3">Key Messaging Pillars</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {messagingPillars.map((p, i) => (
                            <div key={i} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center border border-purple-200 dark:border-purple-700">
                                <span className="text-2xl font-bold text-purple-300 dark:text-purple-600 block mb-1">{i + 1}</span>
                                <p className="text-sm font-medium text-[var(--text-main)]">{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}