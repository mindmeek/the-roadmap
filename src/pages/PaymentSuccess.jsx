import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/entities/User';

export default function PaymentSuccess() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                // Wait a moment for webhook to process
                setTimeout(async () => {
                    const userData = await User.me();
                    setUser(userData);
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };
        checkUserStatus();
    }, []);

    if (loading) {
        return (
            <div className="px-4 pb-8">
                <div className="max-w-2xl mx-auto">
                    <div className="card p-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-[var(--primary-gold)] border-t-transparent rounded-full mx-auto mb-4"></div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                            Processing Your Payment...
                        </h1>
                        <p className="text-[var(--text-soft)]">Please wait while we activate your account.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-8">
            <div className="max-w-2xl mx-auto">
                <div className="card p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold text-[var(--text-main)] mb-4">
                        Welcome to The Launchpad! 🎉
                    </h1>
                    <p className="text-[var(--text-soft)] text-lg mb-6">
                        Your payment was successful and your account has been upgraded.
                    </p>
                    
                    {user && (
                        <div className="bg-[var(--primary-gold)]/10 border border-[var(--primary-gold)]/20 rounded-lg p-4 mb-6">
                            <Crown className="w-6 h-6 text-[var(--primary-gold)] mx-auto mb-2" />
                            <p className="font-semibold text-[var(--text-main)]">
                                Your subscription level: {user.subscription_level === 'launchpad' ? 'The Launchpad' : 'Business HQ'}
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Link to={createPageUrl('Dashboard')} className="btn btn-primary w-full text-lg py-3">
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link to={createPageUrl('AIAssistants')} className="btn btn-secondary w-full">
                            Explore AI Assistants
                        </Link>
                    </div>

                    <p className="text-sm text-[var(--text-soft)] mt-6">
                        You now have access to all premium features. Start building your business today!
                    </p>
                </div>
            </div>
        </div>
    );
}