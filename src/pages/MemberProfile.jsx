
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Connection, Notification, Business, AccountabilityPartner } from '@/entities/all';
import { handlePartnership } from '@/functions/handlePartnership';
import { Mail, Briefcase, MapPin, Linkedin, Link as LinkIcon, Users, UserPlus, Check, Clock, ShieldCheck, Loader2, X, Send, Award, Target } from 'lucide-react';
import { createPageUrl } from '@/utils';

const RequestPartnershipModal = ({ isOpen, onClose, onSend, targetUser }) => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        setIsSending(true);
        await onSend(message);
        setIsSending(false);
        onClose();
        setMessage('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">Request Partnership</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <p className="text-[var(--text-soft)] mb-4">Send a personalized message to <span className="font-semibold">{targetUser?.full_name}</span> with your request.</p>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi, I'd like to be accountability partners because..."
                    className="form-input h-32 w-full resize-none"
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                    <button onClick={handleSend} disabled={isSending || !message.trim()} className="btn btn-primary">
                        {isSending ? <Loader2 className="animate-spin w-5 h-5 mr-2"/> : <Send className="w-5 h-5 mr-2"/>}
                        {isSending ? 'Sending...' : 'Send Request'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function MemberProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('idle');
    const [partnershipStatus, setPartnershipStatus] = useState('idle');
    const [loading, setLoading] = useState(true);
    const [isPartnershipModalOpen, setIsPartnershipModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams(location.search);
                const email = params.get('email');
                const id = params.get('id');
                
                const currentUser = await User.me();
                setCurrentUser(currentUser);
                
                // If no email or id provided, redirect to own profile
                if (!email && !id) {
                    navigate(createPageUrl('Profile'));
                    return;
                }

                let profileUser;
                if (email) {
                    const users = await User.filter({ email: email }, '', 1);
                    profileUser = users[0];
                } else if (id) {
                    const users = await User.filter({ id: id }, '', 1);
                    profileUser = users[0];
                }
                
                if (!profileUser) {
                    setError('User not found');
                    setLoading(false);
                    return;
                }
                
                setProfileUser(profileUser);
                
                // Fetch businesses, connections, and partnerships
                const [userBusinesses, connections, partnerships] = await Promise.all([
                    Business.filter({ owner_user_id: profileUser.id }),
                    Connection.filter({
                        $or: [
                            { requester_email: currentUser.email, recipient_email: profileUser.email },
                            { requester_email: profileUser.email, recipient_email: currentUser.email }
                        ]
                    }),
                    AccountabilityPartner.filter({
                        $or: [
                            { requester_email: currentUser.email, recipient_email: profileUser.email },
                            { requester_email: profileUser.email, recipient_email: currentUser.email }
                        ]
                    })
                ]);
                
                setBusinesses(userBusinesses);

                if (connections.length > 0) {
                    const conn = connections[0];
                    if (conn.status === 'accepted') setConnectionStatus('connected');
                    else if (conn.status === 'pending') setConnectionStatus('pending');
                }

                if (partnerships.length > 0) {
                    const partner = partnerships.find(p => p.status === 'active' || p.status === 'pending');
                    if(partner) {
                        setPartnershipStatus(partner.status);
                    }
                }

            } catch (error) {
                console.error("Error fetching profile:", error);
                setError('Failed to load profile');
            }
            setLoading(false);
        };

        fetchProfile();
    }, [location.search, navigate]);

    const isOwnProfile = useMemo(() => currentUser?.email === profileUser?.email, [currentUser, profileUser]);
    
    const sendPartnershipRequest = async (message) => {
        try {
            await handlePartnership({
                action: 'request',
                payload: {
                    recipientEmail: profileUser.email,
                    recipientName: profileUser.full_name,
                    recipientProfilePictureUrl: profileUser.profile_picture_url,
                    message: message
                }
            });
            setPartnershipStatus('pending');
            alert('Partnership request sent successfully!');
        } catch (error) {
            console.error("Failed to send partnership request:", error);
            alert(error.response?.data?.error || 'Failed to send request. An active or pending request may already exist.');
        }
    };
    
    const renderPartnershipButton = () => {
        if (isOwnProfile) return null;
        switch (partnershipStatus) {
            case 'active':
                return (
                    <button disabled className="btn btn-secondary">
                        <ShieldCheck className="w-5 h-5 mr-2"/> 
                        Accountability Partners
                    </button>
                );
            case 'pending':
                return (
                    <button disabled className="btn btn-secondary">
                        <Clock className="w-5 h-5 mr-2"/> 
                        Request Sent
                    </button>
                );
            default:
                return (
                    <button onClick={() => setIsPartnershipModalOpen(true)} className="btn btn-primary">
                        <ShieldCheck className="w-5 h-5 mr-2"/> 
                        Request Partnership
                    </button>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (error || !profileUser) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Profile Not Found</h2>
                <p className="text-[var(--text-soft)] mb-6">The member profile you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate(createPageUrl('MemberDirectory'))} className="btn btn-primary">
                    Back to Member Directory
                </button>
            </div>
        );
    }

    const defaultCoverPic = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c14f3ed5b_TBM-.jpg";

    return (
        <div className="max-w-5xl mx-auto px-4 pb-12">
            {/* Cover Photo */}
            <div className="relative h-48 bg-gray-200 rounded-lg shadow-md">
                <img 
                    src={profileUser.cover_picture_url || defaultCoverPic} 
                    alt="Cover" 
                    className="w-full h-full object-cover rounded-lg" 
                />
            </div>

            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg -mt-24 p-4 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="relative -mt-16 bg-gray-800 rounded-lg p-2">
                        <img 
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                            alt={profileUser.full_name}
                            className="w-32 h-32 rounded-lg object-contain border-4 border-white dark:border-gray-900"
                        />
                    </div>
                    <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                           <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">{profileUser.full_name}</h1>
                           {profileUser.level && (
                               <div className="badge bg-[var(--primary-gold)] text-white border-none py-3">
                                   <Award className="w-3 h-3 mr-1" /> Level {profileUser.level}
                               </div>
                           )}
                        </div>
                        {profileUser.entrepreneurship_stage && (
                           <div className="inline-flex items-center gap-2 text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                               <Target className="w-4 h-4" />
                               <span className="capitalize">{profileUser.entrepreneurship_stage} Stage</span>
                           </div>
                        )}
                        {profileUser.business_name && (
                            <p className="text-md text-[var(--text-soft)] mt-2">{profileUser.business_name}</p>
                        )}
                        {profileUser.city && (
                            <p className="text-sm text-[var(--text-soft)] flex items-center justify-center sm:justify-start mt-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                {profileUser.city}
                            </p>
                        )}
                    </div>
                    <div className="mt-4 sm:mt-0 flex gap-2">
                        {/* Partnership button logic removed as page is hidden */}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* About Section */}
                    <div className="card p-6 mb-6">
                        <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">About {profileUser.full_name?.split(' ')[0]}</h2>
                        <p className="text-[var(--text-soft)] whitespace-pre-wrap">
                            {profileUser.bio || `${profileUser.full_name} is a member of The Business Minds community.`}
                        </p>
                    </div>

                    {/* Connection Goals */}
                    {profileUser.connection_goals && (
                        <div className="card p-6 mb-6">
                            <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Connection Goals</h2>
                            <p className="text-[var(--text-soft)]">{profileUser.connection_goals}</p>
                        </div>
                    )}

                    {/* Businesses */}
                    {businesses.length > 0 && (
                        <div className="card p-6">
                            <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Businesses</h2>
                            <div className="space-y-4">
                                {businesses.map((business) => (
                                    <div key={business.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <img 
                                            src={business.logo_url || 'https://via.placeholder.com/60'} 
                                            alt={business.name} 
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-[var(--text-main)]">{business.name}</h3>
                                            <p className="text-sm text-[var(--text-soft)]">{business.tagline || business.industry}</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate(createPageUrl('BusinessProfile', { id: business.id }))}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            View Business
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="card p-6">
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-[var(--text-soft)]">
                                <Mail className="w-4 h-4 mr-3" />
                                <span className="text-sm">{profileUser.email}</span>
                            </div>
                            {profileUser.phone_number && (
                                <div className="flex items-center text-[var(--text-soft)]">
                                    <span className="w-4 h-4 mr-3">📞</span>
                                    <span className="text-sm">{profileUser.phone_number}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Social Links */}
                    {profileUser.social_links && Object.keys(profileUser.social_links).length > 0 && (
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">Social Links</h3>
                            <div className="space-y-2">
                                {Object.entries(profileUser.social_links).map(([platform, url]) => {
                                    if (!url) return null;
                                    return (
                                        <a 
                                            key={platform}
                                            href={url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center text-[var(--text-soft)] hover:text-[var(--primary-gold)] text-sm"
                                        >
                                            <LinkIcon className="w-4 h-4 mr-3" />
                                            <span className="capitalize">{platform}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <RequestPartnershipModal 
                isOpen={isPartnershipModalOpen}
                onClose={() => setIsPartnershipModalOpen(false)}
                onSend={sendPartnershipRequest}
                targetUser={profileUser}
            />
        </div>
    );
}
