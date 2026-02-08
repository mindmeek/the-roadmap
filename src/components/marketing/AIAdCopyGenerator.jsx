import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Target, Share2, Zap, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { base44 } from '@/api/base44Client';

export default function AIAdCopyGenerator({ user, business, strategyDocs, campaignTheme }) {
    const [platform, setPlatform] = useState('google');
    const [objective, setObjective] = useState('awareness');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAds, setGeneratedAds] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [customContext, setCustomContext] = useState('');

    const platforms = [
        { id: 'google', name: 'Google Ads', color: 'blue' },
        { id: 'facebook', name: 'Facebook/Instagram', color: 'pink' },
        { id: 'linkedin', name: 'LinkedIn', color: 'indigo' }
    ];

    const objectives = [
        { id: 'awareness', name: 'Brand Awareness', desc: 'Reach new people' },
        { id: 'consideration', name: 'Consideration', desc: 'Drive engagement' },
        { id: 'conversion', name: 'Conversion', desc: 'Generate sales/leads' },
        { id: 'retargeting', name: 'Retargeting', desc: 'Re-engage visitors' }
    ];

    const generateAdCopy = async () => {
        setIsGenerating(true);
        try {
            const idealClient = strategyDocs.ideal_client?.content || {};
            const valueProposition = strategyDocs.value_proposition_canvas?.content || {};
            const brandVoice = strategyDocs.brand_kit?.content?.brand_voice || 'professional and approachable';

            const selectedPlatform = platforms.find(p => p.id === platform);
            const selectedObjective = objectives.find(o => o.id === objective);

            const prompt = `You are an expert paid advertising copywriter. Generate 5 high-converting ad variations for ${selectedPlatform.name}.

Campaign Context:
- 90-Day Theme: ${campaignTheme || 'General Growth Campaign'}
- Platform: ${selectedPlatform.name}
- Campaign Objective: ${selectedObjective.name} - ${selectedObjective.desc}
${customContext ? `- Additional Context: ${customContext}` : ''}

Business Profile:
- Business: ${business?.name || user?.business_name || 'Business'}
- Industry: ${business?.industry || 'General'}
- Target Audience: ${idealClient.demographics || 'General audience'}
- Pain Points: ${idealClient.pain_points || 'General business challenges'}
- Goals: ${idealClient.goals || 'Business growth'}
- Value Proposition: ${valueProposition.value_proposition || 'Unique business value'}
- Brand Voice: ${brandVoice}
- Products/Services: ${user?.financial_projections?.products?.map(p => p.name).join(', ') || 'Not specified'}

Platform-Specific Requirements:
${platform === 'google' ? `
- Headline 1: Max 30 characters (primary message)
- Headline 2: Max 30 characters (value prop)
- Headline 3: Max 30 characters (CTA/urgency)
- Description: Max 90 characters
- Include keywords related to the business
` : platform === 'facebook' ? `
- Primary Text: 125 characters for optimal mobile display
- Headline: 40 characters max
- Description: 30 characters
- Focus on emotional connection and visual storytelling
- Include emoji where appropriate
` : `
- Headline: 200 characters max (professional, direct)
- Intro Text: 150 characters (compelling value)
- Description: Clear professional benefit
- B2B focused, authority-building tone
`}

For each ad variation, provide:
1. All required headlines (follow character limits)
2. Description/Body text
3. Call-to-Action
4. Target Audience Suggestion
5. Budget Recommendation (daily)
6. A/B Test Idea (what to test next)

Format as a JSON array of ad objects.`;

            const result = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                add_context_from_internet: false,
                response_json_schema: {
                    type: "object",
                    properties: {
                        ads: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    headline_1: { type: "string" },
                                    headline_2: { type: "string" },
                                    headline_3: { type: "string" },
                                    description: { type: "string" },
                                    cta: { type: "string" },
                                    target_audience: { type: "string" },
                                    daily_budget: { type: "string" },
                                    ab_test_idea: { type: "string" }
                                }
                            }
                        }
                    }
                }
            });

            setGeneratedAds(result.ads || []);
            toast.success(`Generated ${result.ads?.length || 0} ad variations!`);
        } catch (error) {
            console.error('Error generating ads:', error);
            toast.error('Failed to generate ad copy');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            toast.success('Ad copy copied!');
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    const formatAdForCopy = (ad) => {
        let formatted = '';
        if (ad.headline_1) formatted += `Headline 1: ${ad.headline_1}\n`;
        if (ad.headline_2) formatted += `Headline 2: ${ad.headline_2}\n`;
        if (ad.headline_3) formatted += `Headline 3: ${ad.headline_3}\n`;
        if (ad.description) formatted += `\nDescription: ${ad.description}\n`;
        if (ad.cta) formatted += `CTA: ${ad.cta}\n`;
        if (ad.target_audience) formatted += `\nTarget: ${ad.target_audience}\n`;
        if (ad.daily_budget) formatted += `Budget: ${ad.daily_budget}`;
        return formatted;
    };

    return (
        <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-green-600" />
                    AI Ad Copy Generator
                </h2>
                <p className="text-sm text-[var(--text-soft)]">
                    Generate platform-specific ad copy aligned with your 90-day campaign theme
                </p>
            </div>

            {campaignTheme && (
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-600 mb-6">
                    <p className="text-sm font-semibold text-[var(--text-main)] mb-1">
                        🎯 90-Day Campaign Theme:
                    </p>
                    <p className="text-sm text-[var(--text-soft)]">{campaignTheme}</p>
                </div>
            )}

            <div className="space-y-4 mb-6">
                {/* Platform Selection */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Select Ad Platform:
                    </label>
                    <div className="flex gap-2">
                        {platforms.map(plat => (
                            <button
                                key={plat.id}
                                onClick={() => setPlatform(plat.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    platform === plat.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                {plat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Objective Selection */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Campaign Objective:
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {objectives.map(obj => (
                            <button
                                key={obj.id}
                                onClick={() => setObjective(obj.id)}
                                className={`p-3 rounded-lg transition-all text-left ${
                                    objective === obj.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                <div className="font-semibold text-sm">{obj.name}</div>
                                <div className="text-xs opacity-80">{obj.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Context */}
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Additional Context (optional):
                    </label>
                    <input
                        type="text"
                        value={customContext}
                        onChange={(e) => setCustomContext(e.target.value)}
                        placeholder="e.g., 'Black Friday sale', 'New service launch', 'Local targeting only'"
                        className="form-input w-full"
                    />
                </div>
            </div>

            {/* Generate Button */}
            <Button
                onClick={generateAdCopy}
                disabled={isGenerating}
                className="bg-green-600 hover:bg-green-700 w-full mb-6"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Ad Copy...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate {platforms.find(p => p.id === platform)?.name} Ads
                    </>
                )}
            </Button>

            {/* Generated Ads */}
            {generatedAds.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-600 to-transparent"></div>
                        <span className="text-sm font-semibold text-green-600">Generated Ad Variations</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-600 to-transparent"></div>
                    </div>

                    {generatedAds.map((ad, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-lg border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                                        <span className="text-sm font-bold text-green-700 dark:text-green-400">Ad {idx + 1}</span>
                                    </div>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                        {platforms.find(p => p.id === platform)?.name}
                                    </span>
                                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                                        {objectives.find(o => o.id === objective)?.name}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleCopy(formatAdForCopy(ad), idx)}
                                    className="text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {copiedIndex === idx ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="space-y-3">
                                {/* Headlines */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                                    <h5 className="font-bold text-[var(--text-main)] text-sm mb-3 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-green-600" />
                                        Headlines
                                    </h5>
                                    {ad.headline_1 && (
                                        <div className="mb-2">
                                            <span className="text-xs text-green-600 font-semibold">Primary:</span>
                                            <p className="text-[var(--text-main)] font-medium">{ad.headline_1}</p>
                                        </div>
                                    )}
                                    {ad.headline_2 && (
                                        <div className="mb-2">
                                            <span className="text-xs text-green-600 font-semibold">Secondary:</span>
                                            <p className="text-[var(--text-main)]">{ad.headline_2}</p>
                                        </div>
                                    )}
                                    {ad.headline_3 && (
                                        <div>
                                            <span className="text-xs text-green-600 font-semibold">Tertiary:</span>
                                            <p className="text-[var(--text-main)]">{ad.headline_3}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Description/Body */}
                                {ad.description && (
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        <span className="text-xs text-[var(--text-soft)] font-semibold block mb-2">Description/Body:</span>
                                        <p className="text-sm text-[var(--text-main)]">{ad.description}</p>
                                    </div>
                                )}

                                {/* CTA */}
                                {ad.cta && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                        <span className="text-xs text-blue-600 font-semibold block mb-1">Call-to-Action:</span>
                                        <p className="text-sm font-bold text-blue-700 dark:text-blue-400">{ad.cta}</p>
                                    </div>
                                )}

                                {/* Meta Info */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    {ad.target_audience && (
                                        <div>
                                            <span className="text-xs text-[var(--text-soft)] font-semibold block mb-1">Target:</span>
                                            <p className="text-xs text-[var(--text-main)]">{ad.target_audience}</p>
                                        </div>
                                    )}
                                    {ad.daily_budget && (
                                        <div>
                                            <span className="text-xs text-[var(--text-soft)] font-semibold block mb-1">Budget:</span>
                                            <p className="text-xs text-green-600 font-bold">{ad.daily_budget}</p>
                                        </div>
                                    )}
                                </div>

                                {/* A/B Test Suggestion */}
                                {ad.ab_test_idea && (
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500">
                                        <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold block mb-1">💡 A/B Test Idea:</span>
                                        <p className="text-xs text-[var(--text-soft)]">{ad.ab_test_idea}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info Box */}
            {generatedAds.length === 0 && !isGenerating && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <p className="text-sm text-[var(--text-soft)]">
                        💡 <span className="font-semibold text-[var(--text-main)]">How it works:</span> 
                        {' '}Select your platform and objective, then AI generates 5 ad variations optimized for that platform's 
                        character limits and best practices. Each ad includes headlines, body text, CTAs, targeting suggestions, 
                        and A/B test ideas based on your business context and 90-day campaign theme.
                    </p>
                </div>
            )}
        </div>
    );
}