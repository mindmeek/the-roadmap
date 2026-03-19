import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Loader2, Building, CheckCircle2, ArrowRight, Crown, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SwitchBusiness() {
    const [loading, setLoading] = useState(true);
    const [userBusinesses, setUserBusinesses] = useState([]);
    const [activeBusinessId, setActiveBusinessId] = useState(() => localStorage.getItem('selectedBusinessId'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            try {
                const currentUser = await base44.auth.me();

                const [ownedBusinesses, teamMemberships] = await Promise.all([
                    base44.entities.Business.filter({ owner_user_id: currentUser.id }),
                    base44.entities.TeamMember.filter({ email: currentUser.email, status: 'active' }),
                ]);

                const memberBusinessIds = teamMemberships
                    .map(m => m.business_id)
                    .filter(id => !ownedBusinesses.find(b => b.id === id));

                const memberBusinesses = await Promise.all(
                    memberBusinessIds.map(async (bizId) => {
                        try {
                            const biz = await base44.entities.Business.get(bizId);
                            const membership = teamMemberships.find(m => m.business_id === bizId);
                            return { ...biz, memberRole: membership?.role || 'member' };
                        } catch {
                            return null;
                        }
                    })
                );

                const combined = [
                    ...ownedBusinesses.map(b => ({ ...b, memberRole: 'owner' })),
                    ...memberBusinesses.filter(Boolean),
                ];

                setUserBusinesses(combined);
            } catch (error) {
                console.error("Error fetching businesses:", error);
                toast.error("Failed to load your businesses.");
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleSwitch = (businessId) => {
        localStorage.setItem('selectedBusinessId', businessId);
        setActiveBusinessId(businessId);
        toast.success("Business switched!");
        navigate('/BusinessOverview');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2">Switch Business</h1>
            <p className="text-[var(--text-soft)] mb-8">Select which business you want to manage.</p>

            {userBusinesses.length === 0 ? (
                <div className="card p-12 text-center">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">No businesses found</h2>
                    <p className="text-[var(--text-soft)] mb-6">Create a business or get invited to one.</p>
                    <Button onClick={() => navigate('/MyBusinesses')}>Go to My Businesses</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {userBusinesses.map((business) => {
                        const isActive = activeBusinessId === business.id;
                        return (
                            <div
                                key={business.id}
                                className={`card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-all ${isActive ? 'border-2 border-[var(--primary-gold)]' : ''}`}
                            >
                                {business.logo_url ? (
                                    <img src={business.logo_url} alt={business.name} className="w-14 h-14 object-contain rounded-md border border-gray-200 dark:border-gray-700 flex-shrink-0" />
                                ) : (
                                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                                        <Building className="w-7 h-7 text-gray-400" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-[var(--text-main)]">{business.name}</h3>
                                        <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                            business.memberRole === 'owner'
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                            {business.memberRole === 'owner' ? <Crown className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                                            {business.memberRole}
                                        </span>
                                        {isActive && (
                                            <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                                                <CheckCircle2 className="w-3 h-3" /> Active
                                            </span>
                                        )}
                                    </div>
                                    {business.industry && <p className="text-sm text-[var(--text-soft)] mt-0.5">{business.industry}</p>}
                                    {business.tagline && <p className="text-xs text-[var(--primary-gold)] mt-0.5">{business.tagline}</p>}
                                </div>

                                <Button
                                    onClick={() => handleSwitch(business.id)}
                                    disabled={isActive}
                                    variant={isActive ? "outline" : "default"}
                                    className="flex-shrink-0 w-full sm:w-auto"
                                >
                                    {isActive ? 'Current' : (
                                        <>Switch <ArrowRight className="w-4 h-4 ml-1" /></>
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}