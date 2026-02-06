import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Lightbulb, Mail, Share2, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { base44 } from '@/api/base44Client';

export default function AIMarketingGenerator({ user, idealClient, valueProposition, brandVoice }) {
    const [activeTab, setActiveTab] = useState('campaigns');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [customPrompt, setCustomPrompt] = useState('');

    const generateContent = async (contentType, customInput = '') => {
        setIsGenerating(true);
        setGeneratedContent(null);

        try {
            // Build context from user's business data
            const context = {
                business_name: user.business_name || 'your business',
                niche: user.selected_goal || user.entrepreneurship_stage || 'general business',
                ideal_client: idealClient ? {
                    demographics: idealClient.age_range || '',
                    occupation: idealClient.occupation || '',
                    pain_points: idealClient.pain_points || [],
                    goals: idealClient.goals || []
                } : null,
                value_proposition: valueProposition || '',
                brand_voice: brandVoice || 'professional and approachable'
            };

            let prompt = '';

            switch (contentType) {
                case 'campaigns':
                    prompt = `You are a marketing strategist. Based on the following business profile, generate 5 creative marketing campaign ideas:

Business: ${context.business_name}
Niche: ${context.niche}
${context.ideal_client ? `Target Audience: ${context.ideal_client.demographics}, ${context.ideal_client.occupation}
Pain Points: ${context.ideal_client.pain_points.join(', ')}
Goals: ${context.ideal_client.goals.join(', ')}` : ''}
Value Proposition: ${context.value_proposition}

For each campaign idea, provide:
1. Campaign Name
2. Core Concept (2-3 sentences)
3. Key Channels (social media, email, ads, etc.)
4. Expected Outcome

Format as a JSON array of campaigns.`;
                    break;

                case 'social':
                    prompt = `You are a social media expert. Create 10 engaging social media post ideas for:

Business: ${context.business_name}
Niche: ${context.niche}
${context.ideal_client ? `Target Audience: ${context.ideal_client.demographics}
Pain Points: ${context.ideal_client.pain_points.join(', ')}` : ''}
Brand Voice: ${context.brand_voice}

${customInput ? `Additional context: ${customInput}` : ''}

For each post, provide:
1. Hook (attention-grabbing first line)
2. Body (main content, 2-3 sentences)
3. Call-to-Action
4. Suggested Hashtags (3-5)
5. Best Platform (Instagram, LinkedIn, Facebook, etc.)

Format as a JSON array of posts.`;
                    break;

                case 'email':
                    prompt = `You are an email marketing expert. Create 5 high-converting email templates for:

Business: ${context.business_name}
Niche: ${context.niche}
${context.ideal_client ? `Target Audience: ${context.ideal_client.demographics}
Goals: ${context.ideal_client.goals.join(', ')}` : ''}
Brand Voice: ${context.brand_voice}

${customInput ? `Email purpose: ${customInput}` : ''}

For each email, provide:
1. Subject Line (A/B test variations)
2. Preview Text
3. Email Body
4. Call-to-Action

Format as a JSON array of emails.`;
                    break;

                case 'ab_testing':
                    prompt = `You are a conversion optimization expert. Generate A/B testing variations for:

Business: ${context.business_name}
${context.value_proposition ? `Value Proposition: ${context.value_proposition}` : ''}

${customInput ? `Element to test: ${customInput}` : 'Create variations for key marketing elements'}

Provide 3 A/B test ideas with:
1. Element to Test (headline, CTA, image, etc.)
2. Version A (Control)
3. Version B (Variation)
4. Hypothesis (Why B might perform better)
5. Metric to Measure

Format as a JSON array of tests.`;
                    break;
            }

            const response = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                add_context_from_internet: false,
                response_json_schema: {
                    type: "object",
                    properties: {
                        content: {
                            type: "array",
                            items: { type: "object" }
                        }
                    }
                }
            });

            setGeneratedContent(response.content || []);
            toast.success('Content generated successfully!');
        } catch (error) {
            console.error('Error generating content:', error);
            toast.error('Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    const tabs = [
        { id: 'campaigns', label: 'Campaign Ideas', icon: Lightbulb },
        { id: 'social', label: 'Social Posts', icon: Share2 },
        { id: 'email', label: 'Email Content', icon: Mail },
        { id: 'ab_testing', label: 'A/B Testing', icon: BarChart }
    ];

    return (
        <div className="card p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                        AI Marketing Content Generator
                    </h2>
                    <p className="text-sm text-[var(--text-soft)] mt-1">
                        Generate personalized marketing content based on your business profile
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setGeneratedContent(null);
                                setCustomPrompt('');
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-[var(--primary-gold)] text-white'
                                    : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Custom Input for Some Content Types */}
            {(activeTab === 'social' || activeTab === 'email' || activeTab === 'ab_testing') && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        {activeTab === 'social' && 'Additional topic or focus (optional)'}
                        {activeTab === 'email' && 'Email purpose (optional, e.g., "product launch", "newsletter")'}
                        {activeTab === 'ab_testing' && 'Element to test (optional, e.g., "CTA button", "headline")'}
                    </label>
                    <input
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Enter additional context..."
                        className="form-input w-full"
                    />
                </div>
            )}

            {/* Generate Button */}
            <Button
                onClick={() => generateContent(activeTab, customPrompt)}
                disabled={isGenerating}
                className="bg-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/90 w-full mb-6"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate {tabs.find(t => t.id === activeTab)?.label}
                    </>
                )}
            </Button>

            {/* Generated Content Display */}
            {generatedContent && generatedContent.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent"></div>
                        <span className="text-sm font-semibold text-[var(--primary-gold)]">Generated Content</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--primary-gold)] to-transparent"></div>
                    </div>

                    {activeTab === 'campaigns' && generatedContent.map((campaign, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold text-lg text-[var(--text-main)]">{campaign.campaign_name || campaign.name}</h4>
                                <button
                                    onClick={() => handleCopy(JSON.stringify(campaign, null, 2), idx)}
                                    className="text-gray-400 hover:text-[var(--primary-gold)]"
                                >
                                    {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <p className="text-sm text-[var(--text-soft)] mb-3">{campaign.concept || campaign.core_concept}</p>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Channels:</span>
                                    <p className="text-[var(--text-soft)]">{campaign.channels || campaign.key_channels}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Expected Outcome:</span>
                                    <p className="text-[var(--text-soft)]">{campaign.outcome || campaign.expected_outcome}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'social' && generatedContent.map((post, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-[var(--primary-gold)]">Post {idx + 1}</span>
                                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                        {post.platform || post.best_platform}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleCopy(`${post.hook}\n\n${post.body}\n\n${post.cta || post.call_to_action}\n\n${post.hashtags || post.suggested_hashtags}`, idx)}
                                    className="text-gray-400 hover:text-[var(--primary-gold)]"
                                >
                                    {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Hook:</span>
                                    <p className="text-[var(--text-soft)] italic">"{post.hook}"</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Body:</span>
                                    <p className="text-[var(--text-soft)]">{post.body}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">CTA:</span>
                                    <p className="text-[var(--text-soft)]">{post.cta || post.call_to_action}</p>
                                </div>
                                {(post.hashtags || post.suggested_hashtags) && (
                                    <div>
                                        <span className="font-semibold text-[var(--text-main)]">Hashtags:</span>
                                        <p className="text-[var(--primary-gold)]">{post.hashtags || post.suggested_hashtags}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {activeTab === 'email' && generatedContent.map((email, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold text-lg text-[var(--text-main)]">Email Template {idx + 1}</h4>
                                <button
                                    onClick={() => handleCopy(`Subject: ${email.subject_line}\n\nPreview: ${email.preview_text}\n\n${email.body || email.email_body}\n\n${email.cta || email.call_to_action}`, idx)}
                                    className="text-gray-400 hover:text-[var(--primary-gold)]"
                                >
                                    {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                    <span className="font-semibold text-blue-700 dark:text-blue-400 block mb-1">Subject Lines (A/B Test):</span>
                                    {Array.isArray(email.subject_line) ? (
                                        email.subject_line.map((subject, i) => (
                                            <p key={i} className="text-[var(--text-soft)]">• {subject}</p>
                                        ))
                                    ) : (
                                        <p className="text-[var(--text-soft)]">{email.subject_line}</p>
                                    )}
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Preview Text:</span>
                                    <p className="text-[var(--text-soft)]">{email.preview_text}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Body:</span>
                                    <p className="text-[var(--text-soft)] whitespace-pre-wrap">{email.body || email.email_body}</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                    <span className="font-semibold text-green-700 dark:text-green-400">CTA:</span>
                                    <p className="text-[var(--text-soft)]">{email.cta || email.call_to_action}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'ab_testing' && generatedContent.map((test, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold text-lg text-[var(--text-main)]">
                                    Test {idx + 1}: {test.element || test.element_to_test}
                                </h4>
                                <button
                                    onClick={() => handleCopy(JSON.stringify(test, null, 2), idx)}
                                    className="text-gray-400 hover:text-[var(--primary-gold)]"
                                >
                                    {copiedIndex === idx ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                                        <span className="font-semibold text-[var(--text-main)] block mb-2">Version A (Control):</span>
                                        <p className="text-[var(--text-soft)]">{test.version_a || test.control}</p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                        <span className="font-semibold text-blue-700 dark:text-blue-400 block mb-2">Version B (Variation):</span>
                                        <p className="text-[var(--text-soft)]">{test.version_b || test.variation}</p>
                                    </div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                    <span className="font-semibold text-green-700 dark:text-green-400">Hypothesis:</span>
                                    <p className="text-[var(--text-soft)]">{test.hypothesis}</p>
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--text-main)]">Metric to Measure:</span>
                                    <p className="text-[var(--text-soft)]">{test.metric || test.metric_to_measure}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Info Box */}
            {!generatedContent && !isGenerating && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="text-sm text-[var(--text-soft)]">
                        💡 <span className="font-semibold text-[var(--text-main)]">How it works:</span> 
                        {activeTab === 'campaigns' && ' AI analyzes your business profile and generates complete campaign strategies tailored to your niche and audience.'}
                        {activeTab === 'social' && ' AI creates ready-to-post content that matches your brand voice and resonates with your ideal clients.'}
                        {activeTab === 'email' && ' AI generates full email templates with subject lines, body copy, and CTAs optimized for your audience.'}
                        {activeTab === 'ab_testing' && ' AI suggests specific elements to test and provides variations to improve your conversion rates.'}
                    </p>
                </div>
            )}
        </div>
    );
}