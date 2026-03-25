import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { brandData } = await req.json();

    const productsText = brandData.products && brandData.products.length > 0
        ? brandData.products.filter(p => p.name).map((p, i) =>
            `  Product ${i + 1}: ${p.name}${p.description ? ` - ${p.description}` : ''}${p.price ? ` (Price: $${p.price})` : ''}`
          ).join('\n')
        : 'Not specified';

    const prompt = `You are an expert brand strategist and copywriter. Based on the brand details below, generate compelling, professional marketing copy for each section. Be specific, engaging, and deeply on-brand.

BRAND DETAILS:
- Brand Name: ${brandData.brand_name || 'Not specified'}
- Mission: ${brandData.mission || 'Not specified'}
- Vision: ${brandData.vision || 'Not specified'}
- Core Values: ${(brandData.values || []).filter(Boolean).join(', ') || 'Not specified'}
- Target Audience: ${brandData.target_audience || 'Not specified'}
- Tone of Voice: ${brandData.tone_of_voice || 'Not specified'}
- Unique Value Proposition: ${brandData.unique_value_proposition || 'Not specified'}
- Brand Personality: ${brandData.brand_personality || 'Not specified'}
- Brand Colors: ${brandData.brand_colors || 'Not specified'}
- Brand Fonts: ${brandData.brand_fonts || 'Not specified'}
- Visual Style: ${brandData.brand_visual_style || 'Not specified'}
- Products/Services:
${productsText}

Generate ALL of the following sections. Use the brand voice, personality, and visual feel to inform the writing style throughout.

1. WEBSITE_HERO_COPY: A compelling above-the-fold headline + subheadline (2-3 sentences). Customer-focused and benefit-driven.

2. SOCIAL_MEDIA_CAPTIONS: 3 different social media post captions (Instagram/Facebook/LinkedIn). Natural, engaging, with a call to action. Label them Post 1, Post 2, Post 3.

3. ADVERTISING_TAGLINES: Exactly 3 short, punchy taglines. Each memorable and under 10 words. Label them Tagline 1, Tagline 2, Tagline 3.

4. EMAIL_SUBJECT_LINES: 5 email subject lines for nurturing prospects. Curiosity-driven and high open-rate.

5. ELEVATOR_PITCH_LONG: A detailed 60-second elevator pitch (5-6 sentences) covering what the brand does, who it serves, the problem it solves, and why it's different.

6. ELEVATOR_PITCH_SHORT: A crisp 1-2 sentence elevator pitch for quick introductions.

7. WELCOME_EMAIL_SERIES: A complete 3-part welcome email series. For each email include:
   - EMAIL 1 - SUBJECT: [subject line]
   - EMAIL 1 - BODY: [full email body, 150-200 words]
   - EMAIL 2 - SUBJECT: [subject line]  
   - EMAIL 2 - BODY: [full email body, 150-200 words]
   - EMAIL 3 - SUBJECT: [subject line]
   - EMAIL 3 - BODY: [full email body, 150-200 words]
   Email 1 should welcome and deliver on the promise. Email 2 should educate and build trust. Email 3 should convert with a clear CTA.

8. ABOUT_US_COPY: A full About Us page (3-4 paragraphs). Cover the origin story, mission, team values, and why the brand exists. Warm, authentic tone.

9. SERVICES_INTRO_COPY: An engaging services page introduction (2-3 paragraphs). Highlight what you offer, the transformation clients experience, and build excitement.

10. WHY_CHOOSE_US_COPY: A "Why Choose Us" section with 4 compelling differentiators. For each: a bold headline + 2-sentence explanation.

11. PRODUCT_DESCRIPTIONS: For each product/service listed, write a compelling description (3-4 sentences each) covering what it is, who it's for, the key benefit, and a CTA. If no products are listed, write a placeholder.

Format your response EXACTLY with these labels (no markdown, just the labels and content):
WEBSITE_HERO_COPY: [copy here]
SOCIAL_MEDIA_CAPTIONS: [captions here]
ADVERTISING_TAGLINES: [taglines here]
EMAIL_SUBJECT_LINES: [subject lines here]
ELEVATOR_PITCH_LONG: [long pitch here]
ELEVATOR_PITCH_SHORT: [short pitch here]
WELCOME_EMAIL_SERIES: [full email series here]
ABOUT_US_COPY: [about us here]
SERVICES_INTRO_COPY: [services intro here]
WHY_CHOOSE_US_COPY: [why choose us here]
PRODUCT_DESCRIPTIONS: [product descriptions here]`;

    const result = await base44.integrations.Core.InvokeLLM({ prompt, model: 'claude_sonnet_4_6' });

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
        elevator_pitch_long: parse('ELEVATOR_PITCH_LONG', result),
        elevator_pitch_short: parse('ELEVATOR_PITCH_SHORT', result),
        welcome_email_series: parse('WELCOME_EMAIL_SERIES', result),
        about_us_copy: parse('ABOUT_US_COPY', result),
        services_intro_copy: parse('SERVICES_INTRO_COPY', result),
        why_choose_us_copy: parse('WHY_CHOOSE_US_COPY', result),
        product_descriptions: parse('PRODUCT_DESCRIPTIONS', result),
    });
});