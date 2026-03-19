import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Building, Plus, Loader2, ArrowRight, Globe, Mail, MapPin, Users, Crown, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteBusiness } from '@/functions/deleteBusiness';
import { leaveBusinessTeam } from '@/functions/leaveBusinessTeam';

export default function MyBusinesses() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadBusinesses();
    }, []);

    const loadBusinesses = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            // Get businesses where user is the owner
            const owned = await base44.entities.Business.filter({ owner_user_id: currentUser.id }, '-updated_date', 20);
            const ownedIds = new Set(owned.map(b => b.id));

            // Get businesses where user is an active team member
            const teamMemberships = await base44.entities.TeamMember.filter({
                email: currentUser.email,
                status: 'active'
            });

            // Fetch those businesses (excluding ones already owned)
            const memberBusinessIds = teamMemberships
                .map(tm => tm.business_id)
                .filter(id => !ownedIds.has(id));

            const memberBusinesses = await Promise.all(
                memberBusinessIds.map(id => base44.entities.Business.get(id).catch(() => null))
            );

            const allBusinesses = [
                ...owned.map(b => ({ ...b, _userRole: 'owner' })),
                ...memberBusinesses
                    .filter(Boolean)
                    .map(b => {
                        const membership = teamMemberships.find(tm => tm.business_id === b.id);
                        return { ...b, _userRole: membership?.role || 'member' };
                    })
            ];

            setBusinesses(allBusinesses);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBusiness = async (business) => {
        if (!confirm(`Are you sure you want to permanently delete "${business.name}"? This cannot be undone and will remove all team members and milestones.`)) return;
        try {
            await deleteBusiness({ business_id: business.id });
            await loadBusinesses();
        } catch (e) {
            alert(e.response?.data?.error || e.message || 'Failed to delete business');
        }
    };

    const handleLeaveBusiness = async (business) => {
        if (!confirm(`Are you sure you want to leave "${business.name}"?`)) return;
        try {
            await leaveBusinessTeam({ business_id: business.id });
            await loadBusinesses();
        } catch (e) {
            alert(e.response?.data?.error || e.message || 'Failed to leave business');
        }
    };

    const handleCreate = async () => {
        try {
            await base44.entities.Business.create({
                name: 'My New Business',
                owner_user_id: user.id,
            });
            navigate(createPageUrl('BusinessOverview'));
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">My Businesses</h1>
                    <p className="text-[var(--text-soft)] mt-1">Manage your business profiles and team memberships</p>
                </div>
                <Button onClick={handleCreate} className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    New Business
                </Button>
            </div>

            {businesses.length === 0 ? (
                <div className="card p-12 text-center">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-2">No businesses yet</h2>
                    <p className="text-[var(--text-soft)] mb-6">Create your first business profile to get started.</p>
                    <Button onClick={handleCreate} className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Business
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {businesses.map(business => (
                        <div key={business.id} className="card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {business.logo_url ? (
                                <img src={business.logo_url} alt={business.name} className="w-16 h-16 object-contain rounded-md border border-gray-200 dark:border-gray-700 flex-shrink-0" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                                    <Building className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-[var(--text-main)]">{business.name}</h3>
                                    {business._userRole === 'owner' ? (
                                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[var(--primary-gold)] text-white rounded-full">
                                            <Crown className="w-3 h-3" /> Owner
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full capitalize">
                                            <Users className="w-3 h-3" /> {business._userRole}
                                        </span>
                                    )}
                                </div>
                                {business.tagline && <p className="text-sm text-[var(--primary-gold)]">{business.tagline}</p>}
                                {business.industry && <p className="text-sm text-[var(--text-soft)]">{business.industry}</p>}
                                <div className="flex flex-wrap gap-3 mt-2 text-xs text-[var(--text-soft)]">
                                    {business.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{business.city}</span>}
                                    {business.public_email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{business.public_email}</span>}
                                    {business.website_url && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{business.website_url}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                                <Link to={createPageUrl('BusinessOverview')}>
                                    <Button variant="outline" size="sm">
                                        <ArrowRight className="w-4 h-4 mr-2" />
                                        Manage
                                    </Button>
                                </Link>
                                {business._userRole === 'owner' ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => handleDeleteBusiness(business)}
                                        title="Delete business"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-orange-500 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                        onClick={() => handleLeaveBusiness(business)}
                                        title="Leave business"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}