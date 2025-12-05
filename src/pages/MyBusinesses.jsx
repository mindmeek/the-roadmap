import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plus, Building, Briefcase, ExternalLink, Crown, Star, Globe, CheckCircle, ArrowRight, Clock, Edit3, Users, MapPin, Mail, Phone, Eye, UserPlus, Check, X } from 'lucide-react';
import BusinessTeamModal from '@/components/business/BusinessTeamModal';

export default function MyBusinessesPage() {
    const [user, setUser] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [businessMembers, setBusinessMembers] = useState({});
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            // 1. Get Pending Invitations
            const myInvites = await base44.entities.BusinessInvitation.filter({
                recipient_email: userData.email,
                status: 'pending'
            });
            
            // Enhance invitations with business names
            const invitesWithDetails = await Promise.all(myInvites.map(async (invite) => {
                const biz = await base44.entities.Business.get(invite.business_id);
                return { ...invite, businessName: biz?.name || 'Unknown Business' };
            }));
            setInvitations(invitesWithDetails);

            // 2. Get all businesses where user is a member
            const userMemberships = await base44.entities.BusinessMember.filter({
                user_email: userData.email
            });

            if (userMemberships.length > 0) {
                // Fetch full business details for each membership
                const businessPromises = userMemberships.map(async (membership) => {
                    try {
                        const bizData = await base44.entities.Business.get(membership.business_id);
                        return { ...bizData, userRole: membership.role };
                    } catch (e) {
                        console.error("Error loading business:", e);
                        return null;
                    }
                });

                const businessData = await Promise.all(businessPromises);
                const validBusinesses = businessData.filter(b => b !== null);
                setBusinesses(validBusinesses);

                // Fetch preview members for each business (limit 5 for efficiency)
                // We use the backend function if we want full list, but for preview standard RLS might only show self.
                // However, if we updated RLS or rely on the fact that previously it was showing members...
                // Actually, the previous code used BusinessMember.filter({ business_id: biz.id }). 
                // If RLS restricts this to only 'me', then the preview list will only show 'me'.
                // To fix this for the dashboard view, we should use the getBusinessMembers function if possible, 
                // or just accept that preview might be limited without service role.
                // Let's stick to the previous pattern but maybe use the function if needed. 
                // For now, let's keep the standard filter, if it fails to show others, that's a known RLS limitation we solved with the Modal.
                
                const membersPromises = validBusinesses.map(async (biz) => {
                    // Try fetching via function to see all members
                    try {
                         const { data } = await base44.functions.invoke('getBusinessMembers', { business_id: biz.id });
                         return { businessId: biz.id, members: data.members || [] };
                    } catch (e) {
                        return { businessId: biz.id, members: [] };
                    }
                });

                const membersData = await Promise.all(membersPromises);
                const membersMap = {};
                membersData.forEach(({ businessId, members }) => {
                    membersMap[businessId] = members;
                });
                setBusinessMembers(membersMap);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRespondToInvite = async (inviteId, accept) => {
        try {
            const { data, error } = await base44.functions.invoke('acceptBusinessInvitation', {
                invitation_id: inviteId,
                accept: accept
            });
            
            if (error || data.error) {
                alert("Error: " + (error?.message || data?.error));
                return;
            }

            // Remove from list and reload data
            setInvitations(prev => prev.filter(i => i.id !== inviteId));
            if (accept) loadData(); // Reload to show new business
        } catch (error) {
            console.error("Error responding to invite:", error);
        }
    };

    const openTeamModal = (business) => {
        setSelectedBusiness(business);
        setIsTeamModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-pulse text-[var(--text-soft)]">Loading...</div>
            </div>
        );
    }

    const isPaidMember = user?.subscription_level === 'business_hq';
    const isStartupOrGrowth = user?.entrepreneurship_stage === 'startup' || user?.entrepreneurship_stage === 'growth';
    const canAccessDirectory = isPaidMember && isStartupOrGrowth;
    const defaultLogo = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa6078871_LargeAppIcon.png";

    const getRoleBadge = (role) => {
        const badges = {
            owner: { text: "Owner", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
            admin: { text: "Admin", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
            member: { text: "Member", className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200" }
        };
        return badges[role] || badges.member;
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto pb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">My Businesses</h1>
                    <p className="text-[var(--text-soft)] mt-2">Manage your business profiles and team members</p>
                </div>
                <Link to={createPageUrl('EditBusiness')} className="btn btn-primary">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Business
                </Link>
            </div>

            {/* Invitations Section */}
            {invitations.length > 0 && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[var(--primary-gold)]" />
                        Pending Invitations
                    </h2>
                    <div className="space-y-3">
                        {invitations.map(invite => (
                            <div key={invite.id} className="card p-4 border-l-4 border-[var(--primary-gold)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="font-medium text-[var(--text-main)]">
                                        You have been invited to join <span className="font-bold">{invite.businessName}</span> as a <span className="capitalize">{invite.role_to_assign}</span>.
                                    </p>
                                    {invite.message && <p className="text-sm text-[var(--text-soft)] mt-1">"{invite.message}"</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleRespondToInvite(invite.id, true)}
                                        className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 px-3 py-1.5 text-sm"
                                    >
                                        <Check className="w-4 h-4" /> Accept
                                    </button>
                                    <button 
                                        onClick={() => handleRespondToInvite(invite.id, false)}
                                        className="btn bg-red-100 hover:bg-red-200 text-red-700 flex items-center gap-1 px-3 py-1.5 text-sm"
                                    >
                                        <X className="w-4 h-4" /> Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Business Cards Section */}
            {businesses.length > 0 ? (
                <div className="space-y-6 mb-8">
                    {businesses.map((business) => {
                        const members = businessMembers[business.id] || [];
                        const roleBadge = getRoleBadge(business.userRole);
                        const canManageTeam = business.userRole === 'owner' || business.userRole === 'admin';

                        return (
                            <div key={business.id} className="card p-6 hover:shadow-md transition-shadow">
                                {/* Business Header */}
                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={business.logo_url || defaultLogo} 
                                            alt={`${business.name} logo`}
                                            className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-700"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">{business.name}</h2>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadge.className}`}>
                                                        {roleBadge.text}
                                                    </span>
                                                </div>
                                                {business.tagline && (
                                                    <p className="text-[var(--text-soft)] text-lg mb-2">{business.tagline}</p>
                                                )}
                                                {business.industry && (
                                                    <p className="text-[var(--primary-gold)] font-medium">{business.industry}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                <Link 
                                                    to={createPageUrl('BusinessProfile') + '?id=' + business.id}
                                                    className="btn btn-secondary text-sm"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </Link>
                                                {canManageTeam && (
                                                    <>
                                                        <Link 
                                                            to={createPageUrl('EditBusiness') + '?id=' + business.id}
                                                            className="btn btn-secondary text-sm"
                                                        >
                                                            <Edit3 className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </Link>
                                                        <button 
                                                            onClick={() => openTeamModal(business)}
                                                            className="btn btn-primary text-sm"
                                                        >
                                                            <Users className="w-4 h-4 mr-2" />
                                                            Team
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Business Details Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                            {business.city && (
                                                <div className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{business.city}</span>
                                                </div>
                                            )}
                                            {business.website_url && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Globe className="w-4 h-4 text-[var(--text-soft)]" />
                                                    <a 
                                                        href={business.website_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-[var(--primary-gold)] hover:underline"
                                                    >
                                                        Visit Website
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Team Members Preview */}
                                {members.length > 0 && (
                                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-sm font-semibold text-[var(--text-main)] flex items-center gap-2">
                                                <Users className="w-4 h-4 text-[var(--text-soft)]" />
                                                Team ({members.length})
                                            </h3>
                                            {canManageTeam && (
                                                <button 
                                                    onClick={() => openTeamModal(business)}
                                                    className="text-xs text-[var(--primary-gold)] hover:underline font-medium"
                                                >
                                                    Manage Team
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {members.slice(0, 6).map((member) => (
                                                <div 
                                                    key={member.id}
                                                    className="relative group"
                                                    title={`${member.full_name} (${member.role})`}
                                                >
                                                    <img 
                                                        src={member.profile_picture_url || defaultLogo}
                                                        alt={member.full_name}
                                                        className={`w-8 h-8 rounded-full object-cover border-2 ${
                                                            member.role === 'owner' ? 'border-purple-400' : 
                                                            member.role === 'admin' ? 'border-blue-400' : 
                                                            'border-transparent'
                                                        }`}
                                                    />
                                                </div>
                                            ))}
                                            {members.length > 6 && (
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-[var(--text-soft)] font-medium">
                                                    +{members.length - 6}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Directory Status (Simplified) */}
                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-4 flex items-center gap-2">
                                    {business.is_publicly_listed ? (
                                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                            <CheckCircle className="w-3 h-3" /> Listed on The Index
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-[var(--text-soft)] text-xs">
                                            <Clock className="w-3 h-3" /> Not listed publicly
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="card p-12 text-center mb-8">
                    <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">No Businesses Yet</h2>
                    <p className="text-[var(--text-soft)] mb-6">
                        Create your first business profile to showcase your services and connect with potential clients.
                    </p>
                    <Link to={createPageUrl('EditBusiness')} className="btn btn-primary inline-flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Create Your First Business
                    </Link>
                </div>
            )}

            {/* Team Management Modal */}
            <BusinessTeamModal 
                isOpen={isTeamModalOpen}
                onClose={() => setIsTeamModalOpen(false)}
                business={selectedBusiness}
                currentUser={user}
            />

            {/* The Index Section */}
            {canAccessDirectory && (
                <div className="card p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-600 mt-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/29ba9d749_Indexlogo.png" alt="The Index Logo" className="h-12 w-auto bg-black p-2 rounded-md" />
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-[var(--text-main)] mb-1">Get Listed on The Index</h2>
                            <p className="text-[var(--text-soft)] text-sm">
                                List your business on our public directory at <span className="font-semibold text-red-600">TheIndex.cc</span>.
                            </p>
                        </div>
                        <a 
                            href="https://theindex.cc" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary flex items-center gap-2"
                        >
                            <Globe className="w-4 h-4" />
                            Visit TheIndex.cc
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}