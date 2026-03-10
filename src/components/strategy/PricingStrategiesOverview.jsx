import React from 'react';
import { DollarSign, CheckCircle } from 'lucide-react';

const STRATEGY_LABELS = {
    cost_plus: 'Cost-Plus Pricing',
    value_based: 'Value-Based Pricing',
    competitive: 'Competitive Pricing',
    dynamic: 'Dynamic Pricing',
    freemium_subscription: 'Freemium/Subscription',
    penetration: 'Penetration Pricing',
    skimming: 'Price Skimming',
    tiered: 'Tiered Pricing',
};

function Section({ title, value }) {
    if (!value || !value.trim()) return null;
    return (
        <div className="card p-4">
            <h4 className="font-bold text-xs uppercase tracking-wide text-[var(--primary-gold)] mb-2">{title}</h4>
            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{value}</p>
        </div>
    );
}

export default function PricingStrategiesOverview({ selectedStrategies = [], strategyDetails = {}, currentPricing = '', pricingChallenges = '', targetCustomerWillingness = '' }) {
    const hasData = selectedStrategies.length > 0 || currentPricing;

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Pricing Strategy Defined Yet</p>
                <p className="text-sm">Select strategies and save to see your pricing overview here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="card overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />
                <div className="px-6 pb-5">
                    <div className="flex items-end gap-4 -mt-7 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <DollarSign className="w-7 h-7 text-white" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Pricing Strategy</h2>
                    {selectedStrategies.length > 0 && (
                        <p className="text-sm text-[var(--primary-gold)] font-medium mt-1">{selectedStrategies.length} strateg{selectedStrategies.length > 1 ? 'ies' : 'y'} selected</p>
                    )}
                </div>
            </div>

            {/* Selected Strategies */}
            {selectedStrategies.length > 0 && (
                <div className="card p-5">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-[var(--primary-gold)] mb-4">Selected Pricing Strategies</h4>
                    <div className="space-y-4">
                        {selectedStrategies.map((id) => {
                            const details = strategyDetails[id] || {};
                            const product = details.product === '__custom__' ? details.customProduct : details.product;
                            return (
                                <div key={id} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-amber-600" />
                                        <h5 className="font-semibold text-[var(--text-main)]">{STRATEGY_LABELS[id] || id}</h5>
                                        {details.price && <span className="ml-auto text-sm font-bold text-amber-700 dark:text-amber-400">{details.price}</span>}
                                    </div>
                                    {product && <p className="text-xs text-[var(--text-soft)] mb-1"><strong>Product:</strong> {product}</p>}
                                    {details.reasoning && <p className="text-xs text-[var(--text-soft)]">{details.reasoning}</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Context */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentPricing && <Section title="Current Pricing Model" value={currentPricing} />}
                {pricingChallenges && <Section title="Pricing Challenges" value={pricingChallenges} />}
                {targetCustomerWillingness && <Section title="Customer Willingness to Pay" value={targetCustomerWillingness} />}
            </div>
        </div>
    );
}