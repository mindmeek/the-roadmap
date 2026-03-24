import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { brandData } = await req.json();

    const prompt = `You are an expert brand strategist and copywriter. Based on the brand details below, generate compelling, professional marketing copy in each category. Be specific, engaging, and on-brand.

BRAND DETAILS:
- Brand Name: ${brandData.brand_name || 'Not specified'}
- Mission: ${brandData.mission || 'Not specified'}
- Vision: ${brandData.vision || 'Not specified'}
- Core Values: ${(brandData.values || []).filter(Boolean).join(', ') || 'Not specified'}
- Target Audience: ${brandData.target_audience || 'Not specified'}
- Tone of Voice: ${brandData.tone_of_voice || 'Not specified'}
- Unique Value Proposition: ${brandData.unique_value_proposition || 'Not specified'}
- Brand Personality: ${brandData.brand_personality || 'Not specified'}

Generate the following. Be concise, punchy, and on-brand for each:

1. WEBSITE_HERO_COPY: A compelling above-the-fold headline + subheadline for the homepage (2-3 sentences max). Make it customer-focused and benefit-driven.

2. SOCIAL_MEDIA_CAPTIONS: 3 different social media post captions (Instagram/Facebook/LinkedIn style). Each should feel natural, engaging, and include a call to action. Label them Post 1, Post 2, Post 3.

3. ADVERTISING_TAGLINES: 5 short, punchy taglines/headlines for ads. Each should be memorable and capture the brand essence in under 10 words.

4. EMAIL_SUBJECT_LINES: 5 email subject lines for nurturing prospects. Make them curiosity-driven and high open-rate worthy.

5. ELEVATOR_PITCH: A crisp 30-second elevator pitch (3-4 sentences) that clearly explains what the brand does, who it serves, and why it's different.

Format your response EXACTLY like this with these labels:
WEBSITE_HERO_COPY: [copy here]
SOCIAL_MEDIA_CAPTIONS: [captions here]
ADVERTISING_TAGLINES: [taglines here]
EMAIL_SUBJECT_LINES: [subject lines here]
ELEVATOR_PITCH: [pitch here]`;

    const result = await base44.integrations.Core.InvokeLLM({ prompt, model: 'claude_sonnet_4_6' });

    // Parse the result
    const parse = (label, text) => {
        const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
    };

    return Response.json({
        website_hero_copy: parse('WEBSITE_HERO_COPY', result),
        social_media_captions: parse('SOCIAL_MEDIA_CAPTIONS', result),
        advertising_taglines: parse('ADVERTISING_TAGLINES', result),
        email_subject_lines: parse('EMAIL_SUBJECT_LINES', result),
        elevator_pitch: parse('ELEVATOR_PITCH', result),
    });
});