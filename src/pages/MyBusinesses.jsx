import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Plus, Building, Briefcase, ExternalLink, Crown, Star, Globe, CheckCircle, ArrowRight, Clock, Edit3, Users, MapPin, Mail, Phone, Eye } from 'lucide-react';

export default function MyBusinessesPage() {
    const [user, setUser] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [businessMembers, setBusinessMembers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await base44.auth.me();
                setUser(userData);

                // Get all businesses where user is a member
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

                    // Fetch all members for each business
                    const membersPromises = validBusinesses.map(async (biz) => {
                        const members = await base44.entities.BusinessMember.filter({
                            business_id: biz.id
                        });
                        return { businessId: biz.id, members };
                    });

                    const membersData = await Promise.all(membersPromises);
                    const membersMap = {};
                    membersData.forEach(({ businessId, members }) => {
                        membersMap[businessId] = members;
                    });
                    setBusinessMembers(membersMap);
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

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
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
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

            {/* Business Cards Section */}
            {businesses.length > 0 ? (
                <div className="space-y-6 mb-8">
                    {businesses.map((business) => {
                        const members = businessMembers[business.id] || [];
                        const roleBadge = getRoleBadge(business.userRole);
                        const canEdit = business.userRole === 'owner' || business.userRole === 'admin';

                        return (
                            <div key={business.id} className="card p-6">
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
                                        <div className="flex items-start justify-between gap-4">
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
                                            <div className="flex gap-2">
                                                <Link 
                                                    to={createPageUrl('BusinessProfile') + '?id=' + business.id}
                                                    className="btn btn-secondary"
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Profile
                                                </Link>
                                                {canEdit && (
                                                    <Link 
                                                        to={createPageUrl('EditBusiness') + '?id=' + business.id}
                                                        className="btn btn-primary"
                                                    >
                                                        <Edit3 className="w-4 h-4 mr-2" />
                                                        Manage
                                                    </Link>
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
                                            {business.public_email && (
                                                <div className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{business.public_email}</span>
                                                </div>
                                            )}
                                            {business.public_phone && (
                                                <div className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{business.public_phone}</span>
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

                                        {/* Description */}
                                        {business.description && (
                                            <p className="text-[var(--text-soft)] mt-4 line-clamp-2">
                                                {business.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Team Members Section */}
                                {members.length > 0 && (
                                    <div className="border-t pt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-[var(--text-main)] flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Team Members ({members.length})
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {members.slice(0, 8).map((member) => (
                                                <div 
                                                    key={member.id}
                                                    className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                                                >
                                                    <img 
                                                        src={member.profile_picture_url || defaultLogo}
                                                        alt={member.full_name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-[var(--text-main)] truncate">
                                                            {member.full_name}
                                                        </p>
                                                        <p className="text-xs text-[var(--text-soft)] capitalize">
                                                            {member.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {members.length > 8 && (
                                                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
                                                    <span className="text-sm text-[var(--text-soft)]">
                                                        +{members.length - 8} more
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Directory Status */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {business.is_publicly_listed ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                                                        Listed on The Index
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-[var(--text-soft)]">
                                                        Not listed publicly
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        {canEdit && (
                                            <Link 
                                                to={createPageUrl('EditBusiness') + '?id=' + business.id}
                                                className="text-sm text-[var(--primary-gold)] hover:underline"
                                            >
                                                Update Settings
                                            </Link>
                                        )}
                                    </div>
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

            {/* The Index Section */}
            {canAccessDirectory ? (
                <div className="space-y-6">
                    <div className="card p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-600">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="flex-shrink-0">
                               <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/29ba9d749_Indexlogo.png" alt="The Index Logo" className="h-12 w-auto bg-black p-2 rounded-md" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">Get Listed on The Index</h2>
                                    <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        <Crown className="w-4 h-4" />
                                        Paid Member Benefit
                                    </div>
                                </div>
                                <p className="text-[var(--text-soft)] mb-4 text-lg leading-relaxed">
                                    List your business on our public directory at <span className="font-semibold text-red-600">TheIndex.cc</span> and get discovered by potential clients and partners.
                                </p>
                                
                                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md my-4 flex items-center gap-3">
                                    <Clock className="w-5 h-5"/>
                                    <div>
                                        <p className="font-bold">Launching Soon!</p>
                                        <p>The Index directory will be live in approximately 3 weeks. We'll notify you when you can add your listing!</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-[var(--text-main)]">Professional business listing</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-[var(--text-main)]">SEO-optimized profile</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-[var(--text-main)]">Direct client inquiries</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-[var(--text-main)]">Enhanced visibility</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <button 
                                        disabled
                                        className="btn btn-primary flex items-center gap-2 bg-gray-400 cursor-not-allowed"
                                    >
                                        <Building className="w-5 h-5" />
                                        Access Directory Portal (Coming Soon)
                                    </button>
                                    <a 
                                        href="https://theindex.cc" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary flex items-center gap-2"
                                    >
                                        <Globe className="w-5 h-5" />
                                        Visit TheIndex.cc
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="card p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        <div className="flex justify-center mb-6">
                           <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/29ba9d749_Indexlogo.png" alt="The Index Logo" className="h-16 w-auto" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
                           Get Listed on The Index
                        </h2>
                        <p className="text-[var(--text-soft)] text-lg mb-8 max-w-2xl mx-auto">
                            Get your business discovered by potential clients and partners on our exclusive member directory at <span className="font-semibold text-[var(--primary-gold)]">TheIndex.cc</span>. 
                            This premium feature is available to paid members who have reached the Startup or Growth stage.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg w-fit mx-auto mb-3">
                                    <Globe className="w-6 h-6 text-green-600 dark:text-green-300" />
                                </div>
                                <h3 className="font-semibold text-[var(--text-main)] mb-2">Public Visibility</h3>
                                <p className="text-sm text-[var(--text-soft)]">Get found by potential clients searching our directory</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg w-fit mx-auto mb-3">
                                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                                </div>
                                <h3 className="font-semibold text-[var(--text-main)] mb-2">Professional Profile</h3>
                                <p className="text-sm text-[var(--text-soft)]">Showcase your services, gallery, and testimonials</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-orange-100 dark:bg-orange-800 p-3 rounded-lg w-fit mx-auto mb-3">
                                    <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                                </div>
                                <h3 className="font-semibold text-[var(--text-main)] mb-2">Direct Inquiries</h3>
                                <p className="text-sm text-[var(--text-soft)]">Receive leads directly through your listing</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                            <h3 className="font-semibold text-[var(--text-main)] mb-4">Requirements for Directory Access:</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 justify-center">
                                    {isPaidMember ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                    )}
                                    <span className={isPaidMember ? "text-green-600" : "text-[var(--text-soft)]"}>
                                        Paid Membership (Business HQ)
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 justify-center">
                                    {isStartupOrGrowth ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                    )}
                                    <span className={isStartupOrGrowth ? "text-green-600" : "text-[var(--text-soft)]"}>
                                        Startup or Growth Stage (Currently: {user?.entrepreneurship_stage || 'Vision'} Stage)
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {!isPaidMember && (
                                <Link to={createPageUrl("Upgrade")} className="btn btn-primary">
                                    <Crown className="w-5 h-5 mr-2" />
                                    Upgrade to Unlock Access
                                </Link>
                            )}
                            {!isStartupOrGrowth && (
                                <Link to={createPageUrl("Journey")} className="btn btn-secondary">
                                    <ArrowRight className="w-5 h-5 mr-2" />
                                    Continue Your Journey
                                </Link>
                            )}
                            <a 
                                href="https://theindex.cc" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn btn-ghost"
                            >
                                <Globe className="w-5 h-5 mr-2" />
                                Visit TheIndex.cc
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}