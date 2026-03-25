import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, ChevronDown, ChevronUp, Wand2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * AIFormFiller - A reusable AI assistant that fills out any strategy form.
 * 
 * Props:
 *   formType: string - e.g. 'mission_vision', 'ideal_client', 'value_proposition_canvas'
 *   currentFormData: object - the current state of the form
 *   onFillForm: function(filledData) - called with the AI-generated form values to merge into state
 *   contextHint: string - optional extra context passed to AI (e.g. "Focus on B2B SaaS")
 */
export default function AIFormFiller({ formType, currentFormData, onFillForm, contextHint = '' }) {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleGenerate = async () => {
        setLoading(true);
        setPreview(null);
        try {
            const user = await base44.auth.me();

            // Gather all existing context from the platform
            const [missionDocs, idealClientDocs, brandDocs, vpDocs] = await Promise.all([
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'mission_vision' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'ideal_client' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'brand_identity' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'value_proposition_canvas' }),
            ]);

            const userContext = `
USER PROFILE:
- Name: ${user.first_name || ''} ${user.last_name || ''}
- Business: ${user.business_name || 'Not specified'}
- Industry: ${user.industry || 'Not specified'}
- Stage: ${user.entrepreneurship_stage || 'Not specified'}
- Business Type: ${user.business_type || 'for_profit'}
- Company Size: ${user.company_size || 'Not specified'}
- Years in Business: ${user.years_in_business || 0}
- Value Proposition (onboarding): ${user.value_proposition_statement || 'Not specified'}
- Ideal Client (onboarding): ${user.ideal_client_description || 'Not specified'}
- Primary Revenue Streams: ${user.primary_revenue_streams || 'Not specified'}
- Marketing Channels: ${user.marketing_channels_focus || 'Not specified'}
- Current Challenges: ${user.current_challenges || 'Not specified'}
- Products/Services: ${JSON.stringify((user.financial_projections?.products || []).filter(p => p.name).map(p => ({ name: p.name, description: p.description, price: p.price })))}

EXISTING STRATEGY DOCUMENTS:
Mission & Vision: ${missionDocs[0] ? JSON.stringify(missionDocs[0].content) : 'Not yet completed'}
Ideal Client: ${idealClientDocs[0] ? JSON.stringify(idealClientDocs[0].content) : 'Not yet completed'}
Brand Identity: ${brandDocs[0] ? JSON.stringify(brandDocs[0].content) : 'Not yet completed'}
Value Proposition: ${vpDocs[0] ? JSON.stringify(vpDocs[0].content) : 'Not yet completed'}

CURRENT FORM DATA (partially filled by user):
${JSON.stringify(currentFormData, null, 2)}

${contextHint ? `ADDITIONAL CONTEXT: ${contextHint}` : ''}`;

            const prompts = {
                mission_vision: `${userContext}

You are an expert business strategist. Based on ALL the context above, fill out this Mission & Vision form for ${user.business_name || 'this business'}.

Return a JSON object with these EXACT keys filled with specific, professional content:
{
  "mission_what": "What they do (1 sentence)",
  "mission_who": "Who they serve (1 sentence)",
  "mission_how": "How they do it (1 sentence)",
  "mission_why": "Why it matters (1 sentence)",
  "mission_statement": "A complete, polished 2-sentence mission statement combining the above",
  "vision_future_state": "Where the business will be in 5-10 years (2-3 sentences)",
  "vision_timeline": "Key milestones for the next 1, 3, and 5 years",
  "vision_impact": "The broader impact on industry/community (2 sentences)",
  "vision_statement": "A complete, inspiring 2-sentence vision statement",
  "core_values": ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
  "guiding_principles": "3-4 guiding principles that translate values into daily operations"
}

Return ONLY valid JSON, no other text.`,

                ideal_client: `${userContext}

You are an expert marketing strategist. Based on ALL the context above, define the ideal client profile for ${user.business_name || 'this business'}.

Return a JSON object with these EXACT keys:
{
  "age_range": "Most likely age range from: 18-24, 25-34, 35-44, 45-54, 55-64, 65+",
  "gender": "All, Female, or Male",
  "location": "One of: Urban, Suburban, Rural, North America, Europe, Asia, Global/Online",
  "income_level": "One of: Under $30k, $30k-$50k, $50k-$75k, $75k-$100k, $100k-$150k, $150k-$250k, $250k+",
  "education": "One of: High School, Some College, Bachelor's Degree, Master's Degree, Doctorate, Self-Taught/Trade School",
  "occupation": "One of: Business Owner, Entrepreneur, Executive/Manager, Professional/Specialist, Freelancer/Consultant, Creative/Artist, Healthcare, Education, Technology, Other",
  "pain_points": ["pain 1", "pain 2", "pain 3"],
  "goals": ["goal 1", "goal 2", "goal 3"],
  "core_values": ["value 1", "value 2", "value 3"],
  "research_method": "One of: Google search, Social media, Recommendations, Reviews/testimonials, YouTube videos, Podcasts, Industry publications",
  "decision_speed": "One of: Impulsive (same day), Quick (within a week), Moderate (1-2 weeks), Careful (several weeks), Very deliberate (months)",
  "price_sensitivity": "One of: Budget-conscious, Value-focused, Quality over price, Premium buyer",
  "preferred_contact": "One of: Email, Phone, Text/SMS, In-person, Video call, Live chat, Social media DM",
  "client_avatar_name": "A descriptive name like 'Entrepreneurial Emily' or 'Ambitious Alex'",
  "how_they_describe_themselves": "A first-person description in their voice (2-3 sentences)",
  "day_in_the_life": "A vivid narrative of a typical day showing when/how they encounter the problem (3-4 sentences)",
  "aspirations": "Their 1-year, 3-year, and 5-year aspirations (2-3 sentences)"
}

Return ONLY valid JSON, no other text.`,

                value_proposition_canvas: `${userContext}

You are an expert business strategist. Based on ALL the context above, fill out the Value Proposition Canvas for ${user.business_name || 'this business'}.

Return a JSON object with these EXACT array keys:
{
  "customer_jobs": ["job 1", "job 2", "job 3"],
  "pains": ["pain 1", "pain 2", "pain 3"],
  "gains": ["gain 1", "gain 2", "gain 3"],
  "products_services": ["product/service 1", "product/service 2", "product/service 3"],
  "pain_relievers": ["how you relieve pain 1", "how you relieve pain 2", "how you relieve pain 3"],
  "gain_creators": ["how you create gain 1", "how you create gain 2", "how you create gain 3"]
}

Return ONLY valid JSON, no other text.`,
            };

            const prompt = prompts[formType];
            if (!prompt) return;

            const result = await base44.integrations.Core.InvokeLLM({ prompt, model: 'claude_sonnet_4_6' });

            // Parse JSON from result
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const filled = JSON.parse(jsonMatch[0]);
                setPreview(filled);
                setExpanded(true);
            }
        } catch (e) {
            console.error('AI fill error:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        if (preview) {
            onFillForm(preview);
            setDone(true);
            setPreview(null);
            setTimeout(() => setDone(false), 4000);
        }
    };

    return (
        <div className="card p-4 mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                        <Wand2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-[var(--text-main)] text-sm">AI Form Assistant</p>
                        <p className="text-xs text-[var(--text-soft)]">Let AI fill this form using your business data from across the platform</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {done && (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <CheckCircle className="w-4 h-4" /> Applied!
                        </span>
                    )}
                    {preview && (
                        <button onClick={() => setExpanded(!expanded)} className="btn btn-ghost text-xs p-1">
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    )}
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="btn btn-primary text-sm px-4 py-2"
                    >
                        {loading ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                        ) : (
                            <><Sparkles className="w-4 h-4 mr-2" /> {preview ? 'Regenerate' : 'Fill with AI'}</>
                        )}
                    </button>
                </div>
            </div>

            {preview && expanded && (
                <div className="mt-4 border-t border-purple-200 dark:border-purple-700 pt-4">
                    <p className="text-xs font-semibold text-[var(--text-soft)] mb-3 uppercase tracking-wider">Preview — AI Suggested Content:</p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto text-xs space-y-2 border border-purple-100 dark:border-purple-800">
                        {Object.entries(preview).map(([key, value]) => (
                            <div key={key}>
                                <span className="font-semibold text-[var(--primary-gold)] capitalize">{key.replace(/_/g, ' ')}: </span>
                                <span className="text-[var(--text-main)]">
                                    {Array.isArray(value) ? value.join(' • ') : String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleApply} className="btn btn-primary text-sm flex-1">
                            <CheckCircle className="w-4 h-4 mr-2" /> Apply to Form
                        </button>
                        <button onClick={() => setPreview(null)} className="btn btn-secondary text-sm">
                            Discard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}