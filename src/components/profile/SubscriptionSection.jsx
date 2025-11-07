import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Crown, Star, ArrowRight, Rocket } from 'lucide-react';

const SubscriptionSection = ({ user }) => {
    const subscriptionLevel = user?.subscription_level || 'free';

    const planDetails = {
        free: {
            name: "Free Roadmap Access",
            icon: Star,
            color: "text-gray-500",
            description: "Full access to the 90-Day Roadmap, community, and essential resources."
        },
        launchpad: {
            name: "The Launchpad",
            icon: Rocket,
            color: "text-blue-600",
            description: "Unlimited access to all premium features including unlimited AI assistance and community."
        },
        business_hq: {
            name: "The Business Minds HQ",
            icon: Crown,
            color: "text-[var(--primary-gold)]",
            description: "Complete all-in-one platform with CRM, marketing automation, and advanced tools."
        }
    };

    const currentPlan = planDetails[subscriptionLevel] || planDetails.free;
    const Icon = currentPlan.icon;

    return (
        <div className="card p-6">
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Subscription & Billing</h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <Icon className={`w-8 h-8 ${currentPlan.color}`} />
                        <div>
                            <p className="font-bold text-lg text-[var(--text-main)]">{currentPlan.name}</p>
                            <p className="text-sm text-[var(--text-soft)]">{currentPlan.description}</p>
                        </div>
                    </div>
                    
                    <div className="w-full sm:w-auto">
                        {subscriptionLevel === 'free' ? (
                            <Link to={createPageUrl('Upgrade')} className="btn btn-primary w-full justify-center">
                                Upgrade to The HQ
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        ) : subscriptionLevel === 'launchpad' ? (
                            <>
                                <Link to={createPageUrl('Upgrade')} className="btn btn-primary w-full justify-center mb-2">
                                    Upgrade to The HQ
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                                <a 
                                    href="https://squareup.com/dashboard/customers/subscriptions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary w-full justify-center text-sm"
                                >
                                    Manage Subscription
                                </a>
                            </>
                        ) : (
                            <a 
                                href="https://squareup.com/dashboard/customers/subscriptions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary w-full justify-center"
                            >
                                Manage Subscription
                            </a>
                        )}
                    </div>
                </div>
                {subscriptionLevel !== 'free' && (
                    <p className="text-xs text-[var(--text-soft)] mt-4 text-center sm:text-right">
                        You will be redirected to Square to manage your billing details and subscription.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SubscriptionSection;