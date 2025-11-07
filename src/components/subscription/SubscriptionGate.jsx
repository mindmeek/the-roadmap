
import React from 'react';
import { Link } from 'react-router-dom'; // useNavigate is no longer used directly in this simplified version
import { createPageUrl } from '@/utils';
import { Lock, Rocket } from 'lucide-react'; // Only Lock and Rocket are needed now

const SubscriptionGate = ({ user, children, requiredLevel = 'business_hq', customMessage, customUpgradeText }) => {
    // Check if the user's subscription level matches the required level
    // or if the user is an admin.
    const hasAccess = user?.subscription_level === requiredLevel || user?.role === 'admin';

    if (hasAccess) {
        return <>{children}</>;
    }

    const defaultMessage = `This feature is part of The Business Minds HQ subscription. Upgrade to unlock powerful tools for scaling your business.`;

    return (
        <div className="card p-8 text-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-full">
                    <Lock className="w-8 h-8 text-white" />
                </div>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                {customUpgradeText || 'Upgrade to The Business Minds HQ'}
            </h3>
            <p className="text-[var(--text-soft)] mb-6 max-w-md mx-auto">
                {customMessage || defaultMessage}
            </p>
            <Link to={createPageUrl('Upgrade')} className="btn btn-primary inline-flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Upgrade Now
            </Link>
        </div>
    );
};

export default SubscriptionGate;
