
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    User as UserIcon, Mail, Calendar, Award, Briefcase, 
    Edit, MapPin, Linkedin, Globe, Phone, Building2,
    Loader2, ArrowLeft, Crown, Zap, LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GamificationSection from "@/components/profile/GamificationSection";
import SubscriptionSection from "@/components/profile/SubscriptionSection";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            const urlParams = new URLSearchParams(window.location.search);
            const viewUserId = urlParams.get('userId');

            let profileToView = currentUser;
            let ownProfile = true;

            if (viewUserId && viewUserId !== currentUser.id) {
                const users = await base44.entities.User.filter({ id: viewUserId });
                if (users && users.length > 0) {
                    profileToView = users[0];
                    ownProfile = false;
                }
            }

            setViewingUser(profileToView);
            setIsOwnProfile(ownProfile);

            const userBusinesses = await base44.entities.BusinessMember.filter({
                user_email: profileToView.email
            });
            
            if (userBusinesses && userBusinesses.length > 0) {
                const businessIds = userBusinesses.map(bm => bm.business_id);
                const businessData = await Promise.all(
                    businessIds.map(id => 
                        base44.entities.Business.filter({ id }).then(b => b[0]).catch(() => null)
                    )
                );
                setBusinesses(businessData.filter(Boolean));
            }

        } catch (err) {
            console.error("Failed to load profile:", err);
            setError("Failed to load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <p className="text-red-800">{error}</p>
                        <Button onClick={loadProfile} className="mt-4">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!viewingUser) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Card>
                    <CardContent className="pt-6">
                        <p>User not found.</p>
                        <Link to={createPageUrl('Dashboard')}>
                            <Button className="mt-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getSubscriptionBadge = () => {
        const level = viewingUser.subscription_level;
        if (level === 'business_hq') {
            return <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"><Crown className="w-3 h-3 mr-1" />The HQ Member</Badge>;
        } else if (level === 'free') {
            const today = new Date();
            const trialExpiry = viewingUser.free_trial_expires_on ? new Date(viewingUser.free_trial_expires_on) : null;
            if (trialExpiry && today <= trialExpiry) {
                return <Badge variant="outline" className="border-green-500 text-green-700">Free Trial Active</Badge>;
            }
            return <Badge variant="outline">Free Member</Badge>;
        }
        return null;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {!isOwnProfile && (
                <div className="mb-6">
                    <Link to={createPageUrl('MemberDirectory')}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Directory
                        </Button>
                    </Link>
                </div>
            )}

            <Card className="mb-6">
                <CardHeader className="flex flex-col sm:flex-row items-start justify-between sm:items-center">
                    <div className="flex items-start gap-4 mb-4 sm:mb-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary-gold)] to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                            {viewingUser.full_name?.charAt(0)?.toUpperCase() || viewingUser.email?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{viewingUser.full_name || 'Anonymous User'}</h1>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {getSubscriptionBadge()}
                                {viewingUser.role === 'admin' && (
                                    <Badge className="bg-red-600 text-white">Admin</Badge>
                                )}
                                {viewingUser.role === 'thought_leader' && (
                                    <Badge className="bg-blue-600 text-white">Thought Leader</Badge>
                                )}
                            </div>
                            <p className="text-[var(--text-soft)] flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {viewingUser.email}
                            </p>
                        </div>
                    </div>
                    {isOwnProfile && (
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <Link to={createPageUrl('Onboarding')}>
                                <Button className="w-full">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </Link>
                            <Button 
                                variant="outline"
                                onClick={() => base44.auth.logout()}
                                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {viewingUser.bio && (
                            <div className="md:col-span-2">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    About
                                </h3>
                                <p className="text-[var(--text-soft)] whitespace-pre-wrap">{viewingUser.bio}</p>
                            </div>
                        )}
                        
                        {viewingUser.entrepreneurship_stage && (
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    Business Stage
                                </h3>
                                <p className="text-[var(--text-soft)] capitalize">{viewingUser.entrepreneurship_stage.replace(/_/g, ' ')}</p>
                            </div>
                        )}

                        {viewingUser.city && (
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </h3>
                                <p className="text-[var(--text-soft)]">{viewingUser.city}</p>
                            </div>
                        )}

                        {viewingUser.phone_number && (
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone
                                </h3>
                                <p className="text-[var(--text-soft)]">{viewingUser.phone_number}</p>
                            </div>
                        )}

                        {viewingUser.social_links?.linkedin && (
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </h3>
                                <a 
                                    href={viewingUser.social_links.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    View Profile
                                </a>
                            </div>
                        )}

                        {viewingUser.social_links?.website && (
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Website
                                </h3>
                                <a 
                                    href={viewingUser.social_links.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Visit Website
                                </a>
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Member Since
                            </h3>
                            <p className="text-[var(--text-soft)]">
                                {new Date(viewingUser.created_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isOwnProfile && user && <GamificationSection user={user} />}

            {isOwnProfile && user && <SubscriptionSection user={user} />}

            {businesses.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" />
                            {isOwnProfile ? 'My Businesses' : 'Businesses'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {businesses.map((business) => (
                                <Link 
                                    key={business.id} 
                                    to={createPageUrl('BusinessProfile') + '?id=' + business.id}
                                    className="block"
                                >
                                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-2">{business.name}</h3>
                                            {business.tagline && (
                                                <p className="text-sm text-[var(--text-soft)] mb-2">{business.tagline}</p>
                                            )}
                                            {business.industry && (
                                                <Badge variant="outline">{business.industry}</Badge>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
