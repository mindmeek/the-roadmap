import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Rocket, Star, Zap, Target, TrendingUp, Users } from 'lucide-react';
import SubscriptionGate from '../components/subscription/SubscriptionGate';

export default function TheHQPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                // Not logged in
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-gold)]"></div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <SubscriptionGate 
                user={user} 
                requiredLevel="business_hq"
                customMessage="The Business Minds HQ is your complete business growth platform with advanced tools, CRM, marketing automation, and more. Upgrade to unlock the full HQ experience."
                customUpgradeText="Unlock The Business Minds HQ"
            >
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                        <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
                            <div className="bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-main)]">The Business Minds HQ</h1>
                                <p className="text-[var(--text-soft)] text-base md:text-lg">Your all-in-one business growth platform</p>
                            </div>
                        </div>
                    </div>

                    {/* What's Inside */}
                    <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">What's Inside The HQ:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">CRM & Pipeline</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Manage contacts and deals</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">
                                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">Marketing Automation</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Email & SMS campaigns</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">Funnel Builder</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Create high-converting funnels</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md">
                                    <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">Website Builder</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Build beautiful websites</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                                    <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">Client Portal</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Manage client relationships</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                                    <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-main)]">And Much More</h3>
                                    <p className="text-sm text-[var(--text-soft)]">Everything you need to scale</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Embedded HQ */}
                    <div className="card p-4" style={{ borderRadius: '2px' }}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">Access The HQ Platform</h2>
                            <a 
                                href="https://app.thebminds.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-secondary text-sm"
                            >
                                Open in New Tab
                            </a>
                        </div>
                        <div style={{ height: '800px', width: '100%' }} className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <iframe
                                src="https://app.thebminds.com"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="The Business Minds HQ"
                                allow="fullscreen"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </SubscriptionGate>
        </div>
    );
}