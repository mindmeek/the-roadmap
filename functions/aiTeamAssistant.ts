import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// Platform Navigation Map
const PLATFORM_PAGES = {
    'Dashboard': '/Dashboard',
    'Daily 1% Tracker': '/DailyTrack',
    'Schedule': '/Schedule',
    'My Foundation Roadmap': '/MyFoundationRoadmap',
    'Quick Wins': '/QuickStartFoundation',
    'Freedom Calculator': '/FreedomCalculator',
    'My Journey': '/Journey',
    '90-Day Journey': '/Journey',
    'Strategy Session': '/StrategySession',
    'Community': '/TheCommunity',
    'Quick Lessons': '/QuickLessons',
    'Courses': '/Courses',
    'Mindset Hacks': '/MindsetHacks',
    'Guides': '/Guides',
    'Profile': '/Profile',
    'AI Assistants': '/ElyzetAIAssistants',
    'Brand Kit': '/StrategyFormBrandKit',
    'Business Model Canvas': '/StrategyFormBusinessModelCanvas',
    'SWOT Analysis': '/StrategyFormSWOTAnalysis',
    'Ideal Client': '/StrategyFormIdealClient',
    'Value Proposition': '/StrategyFormValueProposition',
    'Value Ladder': '/StrategyFormValueLadder',
    'Customer Journey': '/StrategyFormCustomerJourney',
    'Pricing Strategies': '/StrategyFormPricingStrategies',
    'Competitor Analysis': '/CompetitorAnalysis',
    'Financial Projections': '/FinancialProjections',
    'AI Strategy Hub': '/AIStrategyHub'
};

const AI_TEAM = {
    elyzet: {
        name: "Elyzet",
        role: "Chief Strategist",
        avatar: "👔",
        systemPrompt: (contextualData) => `You are Elyzet, the Chief Strategist of the AI Business Team. You help entrepreneurs with business strategy, planning, and decision-making.

${contextualData}

**Platform Navigation**: Include direct links using [Page Name](PAGE_URL) format.
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Keep responses concise (2-3 paragraphs) and actionable.`
    },
    ava: {
        name: "Ava",
        role: "Marketing Strategist",
        avatar: "🎯",
        systemPrompt: (contextualData) => `You are Ava, the Marketing Strategist. You help with marketing, branding, and customer acquisition.

${contextualData}

**Platform Navigation**: Include links using [Page Name](PAGE_URL).
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Be practical and results-focused. Keep responses 2-3 paragraphs.`
    },
    sam: {
        name: "Sam",
        role: "Social Media Guru",
        avatar: "📱",
        systemPrompt: (contextualData) => `You are Sam, the Social Media Guru. You help with social media strategy and community building.

${contextualData}

**Platform Navigation**: Include links using [Page Name](PAGE_URL).
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Be conversational and trendy. Keep responses 2-3 paragraphs.`
    },
    charlie: {
        name: "Charlie",
        role: "Content Copywriter",
        avatar: "✍️",
        systemPrompt: (contextualData) => `You are Charlie, the Content Copywriter. You craft compelling copy and content.

${contextualData}

**Platform Navigation**: Include links using [Page Name](PAGE_URL).
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Be creative and provide examples. Keep responses 2-3 paragraphs.`
    },
    finley: {
        name: "Finley",
        role: "Financial Forecaster",
        avatar: "💰",
        systemPrompt: (contextualData) => `You are Finley, the Financial Forecaster. You help with pricing, projections, and financial planning.

${contextualData}

**Platform Navigation**: Include links using [Page Name](PAGE_URL).
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Be analytical but accessible. Keep responses 2-3 paragraphs.`
    },
    olivia: {
        name: "Olivia",
        role: "Operations Optimizer",
        avatar: "⚙️",
        systemPrompt: (contextualData) => `You are Olivia, the Operations Optimizer. You help with systems, processes, and operations.

${contextualData}

**Platform Navigation**: Include links using [Page Name](PAGE_URL).
Available pages: ${Object.entries(PLATFORM_PAGES).map(([name, url]) => `[${name}](${url})`).join(', ')}

Be systematic and practical. Keep responses 2-3 paragraphs.`
    }
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { assistant_type, user_prompt, context = {}, user_notes = [], current_business_id } = await req.json();

        if (!AI_TEAM[assistant_type]) {
            return Response.json({ success: false, error: 'Invalid assistant type' }, { status: 400 });
        }

        const assistant = AI_TEAM[assistant_type];

        // Fetch additional context
        let allBusinessMilestones = [];
        let allAIGeneratedPlans = [];

        if (current_business_id) {
            allBusinessMilestones = await base44.entities.BusinessMilestone.filter({ business_id: current_business_id });
            allAIGeneratedPlans = await base44.entities.AIGeneratedPlan.filter({ created_by: user.email });
        }

        // Build context
        let contextualData = `Business Context:
- Stage: ${user.entrepreneurship_stage || 'Not specified'}
- Business: ${user.business_name || 'Not specified'}`;

        if (context.section_title) {
            contextualData += `\n- Working on: ${context.section_title}`;
        }
        if (user_notes?.length > 0) {
            contextualData += `\n- Notes: ${user_notes.map(n => n.content).join('; ')}`;
        }
        if (allAIGeneratedPlans?.length > 0) {
            contextualData += `\n- AI Plans: ${allAIGeneratedPlans.map(p => `${p.title} (${p.status})`).join(', ')}`;
        }
        if (allBusinessMilestones?.length > 0) {
            contextualData += `\n- Milestones: ${allBusinessMilestones.map(m => `${m.title} (${m.status})`).join(', ')}`;
        }

        const fullPrompt = `${assistant.systemPrompt(contextualData)}

User's Question: ${user_prompt}`;

        const response = await base44.integrations.Core.InvokeLLM({ prompt: fullPrompt });

        return Response.json({
            success: true,
            response: response,
            assistant: {
                name: assistant.name,
                role: assistant.role,
                avatar: assistant.avatar
            }
        });

    } catch (error) {
        console.error('Error in aiTeamAssistant:', error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
});