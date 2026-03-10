import React, { useEffect } from 'react';
import { CheckCircle, Lightbulb, Rocket, TrendingUp, Target, Sparkles } from 'lucide-react';

// Stage-specific configuration
const STAGE_CONFIG = {
    vision: {
        icon: Lightbulb,
        color: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
        borderColor: 'border-blue-300 dark:border-blue-700',
        focusQuestion: "What's the most important thing you want to accomplish right now?",
        focusOptions: [
            { value: 'clarify_idea', label: '💡 Clarify my business idea & validate it', goalHint: 'build_foundation' },
            { value: 'define_brand', label: '🎨 Define my brand identity & positioning', goalHint: 'brand_identity' },
            { value: 'understand_customer', label: '👥 Deeply understand my ideal customer', goalHint: 'build_foundation' },
            { value: 'create_plan', label: '📋 Create a clear business plan & strategy', goalHint: 'build_foundation' },
            { value: 'find_why', label: '❤️ Clarify my mission, vision & "why"', goalHint: 'build_foundation' },
        ],
        challengeQuestion: "What's your biggest challenge right now?",
        challengeOptions: [
            { value: 'no_clarity', label: "I don't know if my idea will work" },
            { value: 'no_niche', label: "I haven't narrowed down my niche" },
            { value: 'overwhelmed', label: "I feel overwhelmed and don't know where to start" },
            { value: 'no_time', label: "I struggle to make time to work on my business" },
            { value: 'no_confidence', label: "I'm not confident enough to move forward" },
        ],
        winQuestion: "What would make this 90-day journey a win for you?",
        winOptions: [
            { value: 'validated_idea', label: '✅ A validated business concept I believe in' },
            { value: 'clear_direction', label: '🧭 A clear roadmap with weekly action steps' },
            { value: 'brand_ready', label: '🎯 A defined brand and customer avatar' },
            { value: 'business_plan', label: '📄 A solid one-page business plan' },
        ],
    },
    startup: {
        icon: Rocket,
        color: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-300 dark:border-green-700',
        focusQuestion: "What's the most important thing you need to focus on right now?",
        focusOptions: [
            { value: 'first_customers', label: '💰 Getting my first paying customers', goalHint: 'complete_customer_journey' },
            { value: 'launch_offer', label: '🚀 Launching my product or service offer', goalHint: 'complete_customer_journey' },
            { value: 'build_audience', label: '📱 Building an audience on social media', goalHint: 'grow_community' },
            { value: 'marketing_system', label: '📣 Setting up my marketing system', goalHint: 'increase_leads' },
            { value: 'online_presence', label: '🌐 Establishing my online presence & website', goalHint: 'complete_customer_journey' },
        ],
        challengeQuestion: "What's holding you back from growing faster?",
        challengeOptions: [
            { value: 'no_leads', label: "I'm not generating enough leads" },
            { value: 'no_sales', label: "I struggle to close sales" },
            { value: 'no_visibility', label: "Nobody knows my business exists" },
            { value: 'no_system', label: "I don't have a consistent marketing system" },
            { value: 'pricing', label: "I'm unsure how to price my offers" },
        ],
        winQuestion: "What would make this 90 days a breakthrough for you?",
        winOptions: [
            { value: 'first_10_customers', label: '🎉 My first 10 paying customers' },
            { value: 'consistent_leads', label: '📈 A consistent flow of leads every week' },
            { value: 'launched', label: '🚀 My offer officially launched and selling' },
            { value: 'known_online', label: '🌟 Recognition and visibility in my niche' },
        ],
    },
    growth: {
        icon: TrendingUp,
        color: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
        borderColor: 'border-purple-300 dark:border-purple-700',
        focusQuestion: "Where do you most need to level up right now?",
        focusOptions: [
            { value: 'scale_revenue', label: '💹 Scale my revenue to the next level', goalHint: 'increase_leads' },
            { value: 'automate', label: '⚙️ Automate & systematize my operations', goalHint: 'systematize_scale' },
            { value: 'build_team', label: '👥 Build and manage a high-performing team', goalHint: 'systematize_scale' },
            { value: 'marketing_engine', label: '📣 Build a marketing engine that runs without me', goalHint: 'increase_leads' },
            { value: 'partnerships', label: '🤝 Form strategic partnerships to grow faster', goalHint: 'form_partnerships' },
        ],
        challengeQuestion: "What's your biggest growth bottleneck?",
        challengeOptions: [
            { value: 'too_dependent', label: "The business depends too much on me personally" },
            { value: 'inconsistent_revenue', label: "Revenue is inconsistent or has plateaued" },
            { value: 'no_systems', label: "I lack systems and SOPs to scale" },
            { value: 'wrong_team', label: "I don't have the right people or team in place" },
            { value: 'no_marketing_scale', label: "My marketing doesn't scale with the business" },
        ],
        winQuestion: "What would a successful 90-day sprint look like for you?",
        winOptions: [
            { value: 'revenue_milestone', label: '💰 Hit a specific revenue milestone' },
            { value: 'business_runs', label: '🏃 The business runs smoothly without my daily input' },
            { value: 'team_built', label: '👥 A strong team executing at a high level' },
            { value: 'marketing_automated', label: '🤖 Automated marketing bringing in consistent leads' },
        ],
    },
};

// Map focus answers to goal recommendations
const GOAL_RECOMMENDATION_MAP = {
    clarify_idea: 'build_foundation',
    define_brand: 'brand_identity',
    understand_customer: 'build_foundation',
    create_plan: 'build_foundation',
    find_why: 'build_foundation',
    first_customers: 'complete_customer_journey',
    launch_offer: 'complete_customer_journey',
    build_audience: 'grow_community',
    marketing_system: 'increase_leads',
    online_presence: 'complete_customer_journey',
    scale_revenue: 'increase_leads',
    automate: 'systematize_scale',
    build_team: 'systematize_scale',
    marketing_engine: 'increase_leads',
    partnerships: 'form_partnerships',
};

export default function Step4Content({ formData, handleInputChange, availableGoals }) {
    const stage = formData.entrepreneurship_stage;
    const config = STAGE_CONFIG[stage];

    // Auto-recommend goal when focus is selected
    useEffect(() => {
        if (formData.step4_focus) {
            const recommendedGoalId = GOAL_RECOMMENDATION_MAP[formData.step4_focus];
            if (recommendedGoalId) {
                // Find matching goal in available goals
                const match = availableGoals.find(g => g.id === recommendedGoalId);
                if (match && !formData.selected_goal) {
                    handleInputChange('selected_goal', match.id);
                }
            }
        }
    }, [formData.step4_focus]);

    if (!stage || !config) {
        return (
            <div className="text-center py-12">
                <p className="text-[var(--text-soft)]">Please select your entrepreneurship stage first (step 4).</p>
            </div>
        );
    }

    const Icon = config.icon;
    const recommendedGoalId = GOAL_RECOMMENDATION_MAP[formData.step4_focus];
    const recommendedGoal = availableGoals.find(g => g.id === recommendedGoalId);

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            {/* Stage badge */}
            <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${config.borderColor} bg-gradient-to-br ${config.color}`}>
                <div className="bg-[var(--primary-gold)] p-2 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">You selected</p>
                    <p className="font-bold text-[var(--text-main)] capitalize">{stage} Stage</p>
                </div>
                <CheckCircle className="w-5 h-5 text-[var(--primary-gold)] ml-auto" />
            </div>

            {/* Q1: Focus */}
            <div>
                <h3 className="text-base font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[var(--primary-gold)] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">1</span>
                    {config.focusQuestion}
                </h3>
                <div className="space-y-2">
                    {config.focusOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => handleInputChange('step4_focus', opt.value)}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium flex items-center justify-between ${
                                formData.step4_focus === opt.value
                                    ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20 text-[var(--text-main)]'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[var(--text-main)] hover:border-[var(--primary-gold)]'
                            }`}
                        >
                            <span>{opt.label}</span>
                            {formData.step4_focus === opt.value && <CheckCircle className="w-4 h-4 text-[var(--primary-gold)] flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Q2: Challenge — shown after Q1 is answered */}
            {formData.step4_focus && (
                <div>
                    <h3 className="text-base font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[var(--primary-gold)] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">2</span>
                        {config.challengeQuestion}
                    </h3>
                    <div className="space-y-2">
                        {config.challengeOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => handleInputChange('step4_challenge', opt.value)}
                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium flex items-center justify-between ${
                                    formData.step4_challenge === opt.value
                                        ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20 text-[var(--text-main)]'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[var(--text-main)] hover:border-[var(--primary-gold)]'
                                }`}
                            >
                                <span>{opt.label}</span>
                                {formData.step4_challenge === opt.value && <CheckCircle className="w-4 h-4 text-[var(--primary-gold)] flex-shrink-0" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Q3: Win — shown after Q2 is answered */}
            {formData.step4_challenge && (
                <div>
                    <h3 className="text-base font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[var(--primary-gold)] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">3</span>
                        {config.winQuestion}
                    </h3>
                    <div className="space-y-2">
                        {config.winOptions.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => handleInputChange('step4_win', opt.value)}
                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium flex items-center justify-between ${
                                    formData.step4_win === opt.value
                                        ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20 text-[var(--text-main)]'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[var(--text-main)] hover:border-[var(--primary-gold)]'
                                }`}
                            >
                                <span>{opt.label}</span>
                                {formData.step4_win === opt.value && <CheckCircle className="w-4 h-4 text-[var(--primary-gold)] flex-shrink-0" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Goal Recommendation Banner */}
            {formData.step4_focus && recommendedGoal && (
                <div className="p-5 rounded-xl border-2 border-green-300 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex items-start gap-3">
                        <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">Recommended 90-Day Goal for You</p>
                            <p className="font-bold text-[var(--text-main)] text-base mb-1">{recommendedGoal.title}</p>
                            <p className="text-sm text-[var(--text-soft)]">{recommendedGoal.description}</p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                                ✅ We've pre-selected this goal for you on the next step — you can always change it.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}