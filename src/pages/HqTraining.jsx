
import { useState, useEffect } from 'react';
import SubscriptionGate from '../components/subscription/SubscriptionGate';
import { User } from '@/entities/User';
import { Loader2, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HqTrainingPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const userData = await User.me();
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* New Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-main)] mb-4">The HQ Training</h1>
                <p className="text-lg text-[var(--text-soft)] max-w-3xl">
                    Master advanced business strategies and systems with our comprehensive training modules designed for serious entrepreneurs ready to scale.
                </p>
            </div>

            {/* SubscriptionGate and its content */}
            <SubscriptionGate
                user={user}
                requiredLevel="command_center" // Kept original requiredLevel as per existing code
                feature="HQ Training"
            >
                {/* Content within SubscriptionGate - removed the old header card */}
                <div className="px-4 pb-8 h-full flex flex-col">
                    {/* Adjusted max-w-7xl to max-w-full to respect the parent's max-w-6xl */}
                    <div className="max-w-full mx-auto space-y-6 w-full flex-grow flex flex-col">
                        <div className="card flex-grow w-full h-[80vh]">
                            <iframe
                                src="https://kb.mycrmsupport.com/thebminds"
                                title="HQ Training Portal"
                                className="w-full h-full border-0 rounded-lg"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </SubscriptionGate>

            {/* New Footer Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center mt-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Access The HQ?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Get unlimited access to all training modules, advanced business tools, and our complete resource library.
                </p>
                <Link to={createPageUrl('Upgrade')} className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors inline-flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to The HQ
                </Link>
            </div>
        </div>
    );
}
