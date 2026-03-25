import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useStrategyDoc } from '@/hooks/useStrategyDoc';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { DollarSign, Save, Loader2, CheckCircle, TrendingUp, Target, Users, Zap, Award, ArrowRight, HelpCircle, Sparkles, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../components/common/Tooltip';
import AITeamModal from '@/components/ai/AITeamModal';
import PricingStrategiesOverview from '@/components/strategy/PricingStrategiesOverview';
import FoundationFormNav from '@/components/foundation/FoundationFormNav';

const pricingStrategies = [
    {
        id: 'cost_plus',
        name: 'Cost-Plus Pricing',
        icon: DollarSign,
        description: 'Add a standard markup to your costs to determine your selling price.',
        pros: [
            'Simple and straightforward to calculate',
            'Ensures you cover all costs and achieve desired profit margin',
            'Easy to justify pricing to customers',
            'Works well for physical products with clear cost structures'
        ],
        cons: [
            'Ignores customer perceived value',
            'May not be competitive if costs are high',
            'Doesn\'t account for market conditions or demand',
            'Can leave money on the table if customers would pay more'
        ],
        realWorldExample: 'Retail stores often use cost-plus pricing. For example, a clothing boutique might buy a shirt for $20 and apply a 100% markup to sell it for $40.',
        bestFor: 'Physical products, manufacturing, retail businesses with predictable costs',
        formula: 'Selling Price = Total Cost + (Total Cost × Markup %)'
    },
    {
        id: 'value_based',
        name: 'Value-Based Pricing',
        icon: Award,
        description: 'Price based on the perceived value to the customer rather than your costs.',
        pros: [
            'Maximizes profit margins',
            'Aligns pricing with customer willingness to pay',
            'Differentiates you from competitors',
            'Encourages focus on delivering high value'
        ],
        cons: [
            'Difficult to determine exact customer perceived value',
            'Requires deep understanding of your target market',
            'May need ongoing market research',
            'Can be challenging to communicate and justify'
        ],
        realWorldExample: 'Apple uses value-based pricing for iPhones. While production costs are relatively low, customers pay a premium for the brand, ecosystem, and perceived quality.',
        bestFor: 'Premium services, consulting, unique products, SaaS with clear ROI',
        formula: 'Price = Perceived Value to Customer (not tied to costs)'
    },
    {
        id: 'competitive',
        name: 'Competitive Pricing',
        icon: TrendingUp,
        description: 'Set prices based on what competitors charge for similar offerings.',
        pros: [
            'Simple to implement - just research competitors',
            'Reduces risk of pricing too high or too low',
            'Keeps you competitive in the market',
            'Good for entering established markets'
        ],
        cons: [
            'Creates a race to the bottom if only competing on price',
            'Ignores your unique value proposition',
            'Assumes competitors have good pricing strategies',
            'Difficult to differentiate your brand'
        ],
        realWorldExample: 'Gas stations use competitive pricing, adjusting their prices daily based on nearby stations to stay competitive.',
        bestFor: 'Commoditized products, highly competitive markets, similar service offerings',
        formula: 'Your Price ≈ Average Competitor Price (adjusted for positioning)'
    },
    {
        id: 'dynamic',
        name: 'Dynamic Pricing',
        icon: Zap,
        description: 'Adjust prices in real-time based on demand, supply, and market conditions.',
        pros: [
            'Maximizes revenue during high-demand periods',
            'Optimizes inventory and capacity utilization',
            'Responds quickly to market changes',
            'Can increase overall profitability'
        ],
        cons: [
            'Can frustrate customers who see price changes',
            'Requires sophisticated pricing software',
            'Complex to implement and manage',
            'May damage brand if not transparent'
        ],
        realWorldExample: 'Uber and Lyft use surge pricing during peak hours or high-demand events. Airlines also dynamically adjust ticket prices based on demand and booking time.',
        bestFor: 'Online businesses, services with variable demand, travel/hospitality, e-commerce',
        formula: 'Price = Base Price × Demand Multiplier × Time/Season Factor'
    },
    {
        id: 'freemium_subscription',
        name: 'Freemium/Subscription Pricing',
        icon: Users,
        description: 'Offer a free basic version with paid premium features or charge recurring fees.',
        pros: [
            'Low barrier to entry attracts more users',
            'Predictable recurring revenue',
            'Creates opportunity to upsell premium features',
            'Builds long-term customer relationships'
        ],
        cons: [
            'May cannibalize paid conversions if free tier is too good',
            'Requires infrastructure to support free users',
            'Conversion rates from free to paid can be low (typically 2-5%)',
            'Customer acquisition costs can be high'
        ],
        realWorldExample: 'Spotify offers a free tier with ads and a Premium subscription ($9.99/month) for ad-free listening and offline downloads. Dropbox offers 2GB free storage with paid plans for more space.',
        bestFor: 'SaaS products, digital services, content platforms, online tools',
        formula: 'Revenue = (Free Users × Conversion Rate × Subscription Price) × Average Customer Lifetime'
    },
    {
        id: 'penetration',
        name: 'Penetration Pricing',
        icon: Target,
        description: 'Set a low initial price to quickly gain market share, then raise prices later.',
        pros: [
            'Rapidly builds customer base',
            'Creates barriers for new competitors',
            'Generates word-of-mouth and buzz',
            'Good for entering crowded markets'
        ],
        cons: [
            'Low initial profitability or losses',
            'Customers may resist future price increases',
            'Can devalue your brand perception',
            'Requires volume to be sustainable'
        ],
        realWorldExample: 'Netflix initially offered very low subscription prices to gain market share against Blockbuster. Once dominant, they gradually increased prices.',
        bestFor: 'New market entrants, scalable digital products, building network effects',
        formula: 'Initial Price < Market Average → Gradual Price Increases Over Time'
    },
    {
        id: 'skimming',
        name: 'Price Skimming',
        icon: TrendingUp,
        description: 'Start with a high price for early adopters, then gradually lower it over time.',
        pros: [
            'Maximizes profit from early adopters willing to pay premium',
            'Recovers R&D and launch costs quickly',
            'Creates perception of exclusivity and innovation',
            'Allows flexibility to lower prices later'
        ],
        cons: [
            'Limits initial market size to affluent customers',
            'May attract competitors quickly',
            'Early adopters may feel cheated when prices drop',
            'Requires truly innovative or unique offering'
        ],
        realWorldExample: 'PlayStation 5 and new iPhone models launch at premium prices for early adopters, then gradually reduce prices or offer older models at lower prices as newer versions release.',
        bestFor: 'Innovative products, tech gadgets, luxury items, products with high R&D costs',
        formula: 'Launch Price (High) → Gradual Price Reduction → Stabilize at Market Price'
    },
    {
        id: 'tiered',
        name: 'Tiered Pricing',
        icon: Award,
        description: 'Offer multiple service levels or packages at different price points.',
        pros: [
            'Appeals to different customer segments',
            'Encourages upselling to higher tiers',
            'Clear value differentiation between options',
            'Maximizes revenue across different budgets'
        ],
        cons: [
            'Can confuse customers with too many options',
            'Requires careful tier design to avoid cannibalization',
            'More complex to market and explain',
            'May require different fulfillment processes'
        ],
        realWorldExample: 'SaaS companies like Mailchimp offer Free, Essentials ($13/mo), Standard ($20/mo), and Premium ($350/mo) tiers based on features and email volume.',
        bestFor: 'SaaS products, consulting services, membership programs, online courses',
        formula: 'Basic Tier (Core Features) < Mid Tier (Enhanced) < Premium Tier (Full Features + Support)'
    }
];

const DEFAULT_PRICING = {
    selected_strategies: [],
    strategy_details: {},
    current_pricing: '',
    pricing_challenges: '',
    target_customer_willingness: ''
};

export default function StrategyFormPricingStrategies() {
    const navigate = useNavigate();
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');
    const [freedomProducts, setFreedomProducts] = useState([]);

    const { loading, saving, formData, setFormData, saveDoc, user } = useStrategyDoc('pricing_strategies', DEFAULT_PRICING);

    const selectedStrategies = formData.selected_strategies || [];
    const strategyDetails = formData.strategy_details || {};
    const currentPricing = formData.current_pricing || '';
    const pricingChallenges = formData.pricing_challenges || '';
    const targetCustomerWillingness = formData.target_customer_willingness || '';

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (currentUser.financial_projections?.products) {
                    setFreedomProducts(currentUser.financial_projections.products.filter(p => p.name && p.name.trim() !== ''));
                }
            } catch (e) {}
        };
        loadProducts();
    }, []);

    const handleStrategyToggle = (strategyId) => {
        if (selectedStrategies.includes(strategyId)) {
            setSelectedStrategies(selectedStrategies.filter(id => id !== strategyId));
            const newDetails = { ...strategyDetails };
            delete newDetails[strategyId];
            setStrategyDetails(newDetails);
        } else {
            setSelectedStrategies([...selectedStrategies, strategyId]);
        }
    };

    const handleStrategyDetailChange = (strategyId, field, value) => {
        setStrategyDetails({
            ...strategyDetails,
            [strategyId]: {
                ...strategyDetails[strategyId],
                [field]: value
            }
        });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = {
                selected_strategies: selectedStrategies,
                strategy_details: strategyDetails,
                current_pricing: currentPricing,
                pricing_challenges: pricingChallenges,
                target_customer_willingness: targetCustomerWillingness
            };

            const existingDocs = await base44.entities.StrategyDocument.filter({
                created_by: user.email,
                document_type: 'pricing_strategies'
            });

            if (existingDocs.length > 0) {
                await base44.entities.StrategyDocument.update(existingDocs[0].id, {
                    content,
                    is_completed: true,
                    last_updated: new Date().toISOString()
                });
            } else {
                await base44.entities.StrategyDocument.create({
                    document_type: 'pricing_strategies',
                    title: 'My Pricing Strategies',
                    content,
                    is_completed: true,
                    entrepreneurship_stage: user.entrepreneurship_stage,
                    last_updated: new Date().toISOString()
                });
            }

            alert('Pricing strategies saved successfully!');
            navigate(createPageUrl('MyFoundationRoadmap'));
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save pricing strategies.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    const pricingData = {
        "Current Pricing Model": currentPricing,
        "Pricing Challenges": pricingChallenges,
        "Target Customer Willingness to Pay": targetCustomerWillingness,
        "Selected Strategies": selectedStrategies.length > 0
            ? selectedStrategies.map(id => {
                const strategy = pricingStrategies.find(s => s.id === id);
                return strategy ? `${strategy.name}: ${strategy.description}` : id;
            }).join('; ')
            : "No strategies selected.",
        "Strategy Implementations": Object.entries(strategyDetails).length > 0
            ? Object.entries(strategyDetails).map(([strategyId, details]) => {
                const strategy = pricingStrategies.find(s => s.id === strategyId);
                const strategyName = strategy ? strategy.name : strategyId;
                return `--- ${strategyName} ---\nProduct/Service: ${details.product || 'N/A'}\nPrice: ${details.price || 'N/A'}\nReasoning: ${details.reasoning || 'N/A'}`;
            }).join('\n\n')
            : "No detailed implementations provided for selected strategies."
    };

    const aiNotes = Object.entries(pricingData).map(([key, value]) => ({
        content: `${key}:\n${value}`
    }));

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* View Toggle */}
            <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                    <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                </div>
            </div>

            {viewMode === 'overview' ? (
                <PricingStrategiesOverview
                    selectedStrategies={selectedStrategies}
                    strategyDetails={strategyDetails}
                    currentPricing={currentPricing}
                    pricingChallenges={pricingChallenges}
                    targetCustomerWillingness={targetCustomerWillingness}
                />
            ) : (<>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[var(--primary-gold)] p-4 rounded-lg">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Pricing Strategies</h1>
                        <p className="text-[var(--text-soft)] mt-1">
                            Choose the right pricing model(s) for your business and maximize your profitability
                        </p>
                    </div>
                </div>
            </div>

            {/* Freedom Calculator Link */}
            {freedomProducts.length === 0 && (
                <div className="card p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-[var(--text-main)] mb-1">No Products Found</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Set up your products in the Freedom Calculator first to auto-populate your pricing strategies.
                            </p>
                            <Link to={createPageUrl('FreedomCalculator')} className="btn btn-sm btn-primary">
                                <Calculator className="w-4 h-4 mr-2" />
                                Go to Freedom Calculator
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Situation */}
            <div className="card p-6 mb-6">
                <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Your Current Pricing Situation</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What is your current pricing model? (If you have one)
                        </label>
                        <textarea
                            value={currentPricing}
                            onChange={(e) => setCurrentPricing(e.target.value)}
                            placeholder="Describe how you currently price your products/services..."
                            className="form-input w-full h-24"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What challenges do you face with pricing?
                        </label>
                        <textarea
                            value={pricingChallenges}
                            onChange={(e) => setPricingChallenges(e.target.value)}
                            placeholder="Are you pricing too low? Too high? Facing price objections? Not sure how to price?"
                            className="form-input w-full h-24"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            What are your target customers willing to pay? (If you know)
                        </label>
                        <textarea
                            value={targetCustomerWillingness}
                            onChange={(e) => setTargetCustomerWillingness(e.target.value)}
                            placeholder="Based on market research, customer feedback, or competitor analysis..."
                            className="form-input w-full h-24"
                        />
                    </div>
                </div>

                {/* AI Help Banner */}
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded">
                    <div className="flex items-start gap-2">
                        <span className="text-2xl">💰</span>
                        <div className="flex-1">
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-1">
                                Get Pricing Help from Finley!
                            </p>
                            <p className="text-xs text-[var(--text-soft)] mb-2">
                                Finley, your Financial Forecaster, can help you develop profitable pricing strategies that maximize your revenue.
                            </p>
                            <button
                                onClick={() => setShowAIAssistant(true)}
                                className="btn btn-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                            >
                                <Sparkles className="w-3 h-3 mr-2" />
                                Ask Finley for Help
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Strategies */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                    Select Your Pricing Strategy/Strategies
                </h2>
                <p className="text-[var(--text-soft)] mb-6">
                    You can choose multiple strategies if applicable to different products/services or market segments.
                </p>

                <div className="space-y-6">
                    {pricingStrategies.map((strategy) => {
                        const Icon = strategy.icon;
                        const isSelected = selectedStrategies.includes(strategy.id);

                        return (
                            <div key={strategy.id} className={`card p-6 transition-all ${isSelected ? 'border-2 border-[var(--primary-gold)]' : ''}`}>
                                {/* Strategy Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-[var(--primary-gold)]' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                            <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[var(--primary-gold)]'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{strategy.name}</h3>
                                            <p className="text-[var(--text-soft)] mb-3">{strategy.description}</p>
                                            <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                                                Best For: {strategy.bestFor}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleStrategyToggle(strategy.id)}
                                        className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                                    >
                                        {isSelected ? <CheckCircle className="w-5 h-5 mr-2" /> : <></>}
                                        {isSelected ? 'Selected' : 'Select'}
                                    </button>
                                </div>

                                {/* Formula */}
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                    <p className="text-sm font-semibold text-[var(--text-main)] mb-1">Formula:</p>
                                    <p className="text-sm text-[var(--text-soft)] font-mono">{strategy.formula}</p>
                                </div>

                                {/* Pros and Cons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Pros
                                        </h4>
                                        <ul className="space-y-1">
                                            {strategy.pros.map((pro, index) => (
                                                <li key={index} className="text-sm text-[var(--text-soft)] flex items-start">
                                                    <span className="text-green-500 mr-2">•</span>
                                                    <span>{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                                            <HelpCircle className="w-4 h-4 mr-2" />
                                            Cons
                                        </h4>
                                        <ul className="space-y-1">
                                            {strategy.cons.map((con, index) => (
                                                <li key={index} className="text-sm text-[var(--text-soft)] flex items-start">
                                                    <span className="text-red-500 mr-2">•</span>
                                                    <span>{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Real World Example */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-2 flex items-center">
                                        <Award className="w-4 h-4 mr-2 text-blue-600" />
                                        Real-World Example
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)]">{strategy.realWorldExample}</p>
                                </div>

                                {/* Application to User's Business (only if selected) */}
                                {isSelected && (
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                        <h4 className="font-semibold text-[var(--text-main)] mb-3">
                                            How will you apply this strategy?
                                        </h4>
                                        
                                        <div className="space-y-4">
                                           <div>
                                               <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                                   Which product/service will use this pricing?
                                               </label>
                                               {freedomProducts.length > 0 ? (
                                                   <select
                                                       value={strategyDetails[strategy.id]?.product || ''}
                                                       onChange={(e) => {
                                                           const selectedProduct = freedomProducts.find(p => p.name === e.target.value);
                                                           handleStrategyDetailChange(strategy.id, 'product', e.target.value);
                                                           if (selectedProduct && selectedProduct.price) {
                                                               handleStrategyDetailChange(strategy.id, 'price', `$${selectedProduct.price}`);
                                                           }
                                                       }}
                                                       className="form-input w-full"
                                                   >
                                                       <option value="">Select a product from Freedom Calculator...</option>
                                                       {freedomProducts.map((product, idx) => (
                                                           <option key={idx} value={product.name}>
                                                               {product.name} {product.price ? `($${product.price})` : ''}
                                                           </option>
                                                       ))}
                                                       <option value="__custom__">➕ Enter custom product/service</option>
                                                   </select>
                                               ) : (
                                                   <input
                                                       type="text"
                                                       value={strategyDetails[strategy.id]?.product || ''}
                                                       onChange={(e) => handleStrategyDetailChange(strategy.id, 'product', e.target.value)}
                                                       placeholder="e.g., Premium Consulting Package, Basic Software Plan"
                                                       className="form-input w-full"
                                                   />
                                               )}
                                               {strategyDetails[strategy.id]?.product === '__custom__' && (
                                                   <input
                                                       type="text"
                                                       value={strategyDetails[strategy.id]?.customProduct || ''}
                                                       onChange={(e) => handleStrategyDetailChange(strategy.id, 'customProduct', e.target.value)}
                                                       placeholder="Enter custom product/service name..."
                                                       className="form-input w-full mt-2"
                                                   />
                                               )}
                                           </div>

                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                                    What will your pricing be?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={strategyDetails[strategy.id]?.price || ''}
                                                    onChange={(e) => handleStrategyDetailChange(strategy.id, 'price', e.target.value)}
                                                    placeholder="e.g., $99/month, $2,500 one-time"
                                                    className="form-input w-full"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                                    Why is this strategy right for this product/service?
                                                </label>
                                                <textarea
                                                    value={strategyDetails[strategy.id]?.reasoning || ''}
                                                    onChange={(e) => handleStrategyDetailChange(strategy.id, 'reasoning', e.target.value)}
                                                    placeholder="Explain how this strategy aligns with your market, customers, and business goals..."
                                                    className="form-input w-full h-24"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate(createPageUrl('MyFoundationRoadmap'))}
                    className="btn btn-secondary"
                >
                    Back to Foundation
                </button>
                <button
                    onClick={handleSave}
                    disabled={saving || selectedStrategies.length === 0}
                    className="btn btn-primary"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-2" />
                            Save Pricing Strategies
                        </>
                    )}
                </button>
            </div>

            <FoundationFormNav currentFormId="pricing_strategies" />

            {/* AI Team Modal */}
            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="strategy_form_agent"
                sectionTitle="Pricing Strategies"
                additionalContext={`Document Type: pricing_strategies\nCurrent Stage: ${user?.entrepreneurship_stage || 'unknown'}\nForm Fields: ${Object.keys(formData).join(', ')}`}
                currentBusinessId={user?.current_business_id}
                userNotes={aiNotes}
            />
        </>)}
        </div>
    );
}