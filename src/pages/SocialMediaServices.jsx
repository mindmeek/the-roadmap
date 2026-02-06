import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Check, Share2, TrendingUp, Rocket, Zap, ArrowRight,
    CheckCircle, Calendar, Users, MessageSquare, BarChart
} from 'lucide-react';
import { SOCIAL_MEDIA_PACKAGES } from '@/components/dfy/sopData';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SocialMediaServicesPage() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const navigate = useNavigate();

    const getIcon = (iconName) => {
        const icons = { Share2, TrendingUp, Rocket, Zap };
        return icons[iconName] || Share2;
    };

    const handleGetStarted = (pkg) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handlePurchase = async () => {
        setIsPurchasing(true);
        try {
            const user = await base44.auth.me();
            
            await base44.entities.DfyService.create({
                package_name: selectedPackage.title,
                client_email: user.email,
                status: 'onboarding',
                start_date: new Date().toISOString(),
                steps: selectedPackage.steps
            });

            toast.success('Service activated! Redirecting to your dashboard...');
            setTimeout(() => {
                navigate(createPageUrl('DfyServices'));
            }, 1500);
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error('Failed to activate service. Please try again or contact support.');
            setIsPurchasing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 pb-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        All-Inclusive Social Media Management
                    </h1>
                    <p className="text-xl md:text-2xl mb-6 text-white/90">
                        Quick onboarding • No contracts • Dedicated account manager • Guaranteed growth
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>90-Day Growth Plans</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>Monthly Strategy Calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            <span>Community Management</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BarChart className="w-5 h-5" />
                            <span>Analytics & Reporting</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SOCIAL_MEDIA_PACKAGES.map((pkg) => {
                        const Icon = getIcon(pkg.icon);
                        return (
                            <div
                                key={pkg.id}
                                className="card p-6 hover:shadow-xl transition-all border-2 border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] flex flex-col"
                            >
                                <div className="bg-[var(--primary-gold)]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-8 h-8 text-[var(--primary-gold)]" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                    {pkg.title.replace(' Package', '')}
                                </h3>
                                <div className="text-3xl font-bold text-[var(--primary-gold)] mb-3">
                                    {pkg.price}
                                </div>
                                <p className="text-[var(--text-soft)] text-sm mb-4">
                                    {pkg.description}
                                </p>
                                
                                {/* Platforms */}
                                <div className="mb-4">
                                    <div className="text-xs font-semibold text-[var(--text-main)] mb-2">
                                        Platforms Included:
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                                            >
                                                {platform}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="flex-1 mb-4">
                                    <div className="text-xs font-semibold text-[var(--text-main)] mb-2">
                                        What's Included:
                                    </div>
                                    <ul className="space-y-2">
                                        {pkg.steps.slice(1).map((step, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs">
                                                <Check className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-[var(--text-soft)]">{step.title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    onClick={() => handleGetStarted(pkg)}
                                    className="w-full bg-[var(--primary-gold)] hover:bg-yellow-600"
                                >
                                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-[var(--text-main)]">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-[var(--primary-gold)] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Choose Package</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Select the plan that fits your needs
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[var(--primary-gold)] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Complete Onboarding</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Fill out intake form & provide access
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[var(--primary-gold)] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">Strategy Created</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                We build your 90-day content plan
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[var(--primary-gold)] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="font-semibold mb-2 text-[var(--text-main)]">We Launch</h3>
                            <p className="text-sm text-[var(--text-soft)]">
                                Posting begins within 7 days
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--text-main)]">
                        Ready to Grow Your Brand?
                    </h2>
                    <p className="text-[var(--text-soft)] mb-8">
                        Join hundreds of businesses that trust us with their social media presence.
                        No contracts, cancel anytime.
                    </p>
                    <Link to={createPageUrl('DfyServices')}>
                        <Button size="lg" className="bg-[var(--primary-gold)] hover:bg-yellow-600">
                            View My Active Services
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Purchase Modal */}
            {isModalOpen && selectedPackage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4 text-[var(--text-main)]">
                                Start Your {selectedPackage.title}
                            </h2>
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-[var(--primary-gold)] mb-2">
                                    {selectedPackage.price}
                                </div>
                                <p className="text-[var(--text-soft)]">{selectedPackage.description}</p>
                            </div>

                            {/* What Happens Next */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                                <h3 className="font-semibold mb-3 text-[var(--text-main)]">
                                    What Happens Next:
                                </h3>
                                <ol className="space-y-2 text-sm text-[var(--text-soft)]">
                                    <li className="flex gap-2">
                                        <span className="font-semibold">1.</span>
                                        <span>Click "Activate Service" to add this to your account</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold">2.</span>
                                        <span>Complete the onboarding checklist in your dashboard</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold">3.</span>
                                        <span>Our team will review and create your strategy (3-5 days)</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="font-semibold">4.</span>
                                        <span>Approve your content calendar and we begin posting!</span>
                                    </li>
                                </ol>
                            </div>

                            {/* Onboarding Preview */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-[var(--text-main)]">
                                    You'll Need to Provide:
                                </h3>
                                <ul className="space-y-2">
                                    {selectedPackage.steps[0]?.checklist?.map((item) => (
                                        <li key={item.id} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-[var(--text-soft)]">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isPurchasing}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-[var(--primary-gold)] hover:bg-yellow-600"
                                    onClick={handlePurchase}
                                    disabled={isPurchasing}
                                >
                                    {isPurchasing ? 'Activating...' : 'Activate Service'}
                                </Button>
                            </div>

                            <p className="text-xs text-center text-[var(--text-soft)] mt-4">
                                For payment and billing, contact us at{' '}
                                <a href="mailto:team@thebminds.com" className="text-[var(--primary-gold)] hover:underline">
                                    team@thebminds.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}