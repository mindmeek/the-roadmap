
import React, { useState, useEffect, useMemo } from 'react';
import { getMembers } from '@/functions/getMembers';
import { User, Connection, Notification } from '@/entities/all';
import { sendConnectionRequest } from '@/functions/sendConnectionRequest';
import { Users, Search, Loader2, UserCheck, AlertCircle, Shield, KeyRound, ServerCog } from 'lucide-react';
import MemberCard from '../components/members/MemberCard';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SubscriptionGate from '../components/subscription/SubscriptionGate';


export default function MemberDirectory() {
    const [allMembers, setAllMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStage, setSelectedStage] = useState('all');
    const [displayedCount, setDisplayedCount] = useState(15);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [connectionStatuses, setConnectionStatuses] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    // Effect to fetch the current user on component mount.
    // This ensures currentUser is available for SubscriptionGate early.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setCurrentUser(userData);
                setIsAdmin(userData.role === 'admin'); // Set isAdmin as soon as user is known
            } catch (e) {
                console.error("User not found or error fetching user:", e);
                // If user fetch fails (e.g., not logged in), set currentUser to null
                setCurrentUser(null);
                // No specific error message here, SubscriptionGate will handle null currentUser.
                // setLoading(false) is handled by the next useEffect or by SubscriptionGate's logic.
            }
        };
        fetchUser();
    }, []); // Runs only once on component mount

    // Effect to load members and connection data once currentUser is determined.
    useEffect(() => {
        const loadMembersData = async () => {
            setLoading(true);
            setError(null); // Clear any previous errors

            try {
                // Call getMembers function
                const response = await getMembers();
                
                let members = [];
                if (response && response.data) {
                    if (response.data.success === false) {
                        // Handle error response from function
                        throw new Error(response.data.details || response.data.error || 'Failed to load members');
                    } else if (response.data.data) {
                        // Handle success response with data property
                        members = response.data.data;
                    } else if (Array.isArray(response.data)) {
                        // Handle direct array response
                        members = response.data;
                    }
                }
                
                // Ensure members is always an array
                if (!Array.isArray(members)) {
                    console.warn('Members data is not an array:', members);
                    members = [];
                }

                setAllMembers(members);

                // Only try to load connections if currentUser is available and there are members
                if (currentUser && members.length > 0) {
                    try {
                        const memberEmails = members.map(m => m.email).filter(Boolean);
                        if (memberEmails.length > 0) {
                            const sentConnections = await Connection.filter({ requester_email: currentUser.email });
                            const receivedConnections = await Connection.filter({ recipient_email: currentUser.email });
                            const allConnections = [...sentConnections, ...receivedConnections];
                            const statuses = {};
                            allConnections.forEach(conn => {
                                const otherUserEmail = conn.requester_email === currentUser.email ? conn.recipient_email : conn.requester_email;
                                const member = members.find(m => m.email === otherUserEmail);
                                if (member) {
                                    statuses[member.id] = conn.status;
                                }
                            });
                            setConnectionStatuses(statuses);
                        }
                    } catch (connectionError) {
                        console.warn('Error loading connections:', connectionError);
                        // Don't fail the whole page if connections fail to load
                    }
                }
                
            } catch (err) {
                console.error("Error loading member directory:", err);
                let errorMessage = 'Unable to load members. Please try again.';
                
                if (err.response?.status === 401) {
                    errorMessage = 'You need to be logged in to view the member directory.';
                } else if (err.response?.data?.details) {
                    errorMessage = err.response.data.details;
                } else if (err.message) {
                    errorMessage = err.message;
                }
                
                setError(errorMessage);
                setAllMembers([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        // Only load data if currentUser has been set (either to a user object or explicitly null)
        // This avoids trying to fetch members while user status is unknown.
        if (currentUser !== undefined) { // Check for undefined, meaning the first useEffect hasn't finished yet
            loadMembersData();
        }
    }, [currentUser]); // Dependency array: runs when currentUser state changes (from null to user data, or vice versa)


    const handleConnect = async (memberToConnect) => {
        if (!currentUser || !memberToConnect) return;
        setConnectionStatuses(prev => ({ ...prev, [memberToConnect.id]: 'sending' }));
        try {
            const newConnection = await Connection.create({
                requester_email: currentUser.email,
                recipient_email: memberToConnect.email,
            });
            await Notification.create({
                recipient_email: memberToConnect.email,
                type: 'connection_request',
                title: 'New Connection Request',
                message: `${currentUser.full_name} wants to connect with you.`,
                related_user_email: currentUser.email,
                connection_id: newConnection.id
            });
            await sendConnectionRequest({
                to: memberToConnect.email,
                fromName: currentUser.full_name,
                message: "" 
            });
            setConnectionStatuses(prev => ({ ...prev, [memberToConnect.id]: 'pending' }));
        } catch (err) {
            console.error("Error sending connection request:", err);
            alert("Could not send connection request. Please try again.");
            setConnectionStatuses(prev => ({ ...prev, [memberToConnect.id]: 'not_connected' }));
        }
    };

    const handleDeleteUser = async (memberToDelete) => {
        if (!isAdmin || !memberToDelete) return;
        if (!window.confirm(`Are you sure you want to delete ${memberToDelete.full_name}? This is permanent.`)) return;
        try {
            await User.delete(memberToDelete.id);
            setAllMembers(prev => prev.filter(m => m.id !== memberToDelete.id));
            alert(`${memberToDelete.full_name} has been deleted.`);
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Failed to delete user.");
        }
    };


    const filteredAndSearchedMembers = useMemo(() => {
        return allMembers
            .filter(member => {
                if (selectedStage !== 'all' && member.entrepreneurship_stage !== selectedStage) return false;
                if (searchTerm) {
                    const searchLower = searchTerm.toLowerCase();
                    return (
                        member.full_name?.toLowerCase().includes(searchLower) ||
                        member.business_name?.toLowerCase().includes(searchLower) ||
                        member.bio?.toLowerCase().includes(searchLower) ||
                        member.city?.toLowerCase().includes(searchLower)
                    );
                }
                return true;
            })
            .slice(0, displayedCount);
    }, [allMembers, searchTerm, selectedStage, displayedCount]);

    const loadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setDisplayedCount(prev => prev + 15);
            setLoadingMore(false);
        }, 500);
    };

    const handleStageFilter = (stage) => {
        setSelectedStage(stage);
        setDisplayedCount(15);
    };

    if (loading) {
        return (
            <div className="px-4 pb-20 md:pb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="card p-8 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)] mx-auto mb-4" />
                        <p className="text-[var(--text-soft)]">Loading member directory...</p>
                    </div>
                </div>
            </div>
        );
    }
    
    // Generic error for all other issues / non-admins
    if (error) {
        return (
            <div className="px-4 pb-20 md:pb-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="card p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-[var(--text-main)]">
                            Unable to Load Directory
                        </h3>
                        <p className="text-[var(--text-soft)] mb-6">{error}</p>
                        <button onClick={() => { /* Re-attempt load, perhaps by resetting currentUser or a trigger state */ }} className="btn btn-primary">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto">
                <SubscriptionGate 
                    user={currentUser} 
                    requiredLevel="launchpad" 
                    feature="the Member Directory"
                    customTitle="Connect With Fellow Entrepreneurs"
                    customDescription="Access our exclusive directory of verified entrepreneurs, find potential partners, mentors, and collaborators in your industry."
                    benefits={[
                        "Browse 1000+ verified entrepreneur profiles",
                        "Filter by industry, stage, and location", 
                        "Send direct connection requests",
                        "Find potential business partners and collaborators",
                        "Discover mentors in your field",
                        "Build your professional network strategically"
                    ]}
                >
                    <div className="space-y-6">
                        <div className="card p-6 md:p-8">
                            <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
                                <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                                    <Users className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                        <h1 className="text-2xl md:text-3xl">Member Directory</h1>
                                        {isAdmin && (
                                            <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                                                <Shield className="w-3 h-3 mr-1" />
                                                Admin View
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[var(--text-soft)] text-base md:text-lg">
                                        Connect with {allMembers.length} active entrepreneurs on their business journey.
                                    </p>
                                    
                                    {/* Active Members Info */}
                                    {!isAdmin && (
                                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mt-3 text-sm">
                                            <p className="text-blue-800">
                                                <strong>🎯 Quality Over Quantity:</strong> This directory shows entrepreneurs who are actively engaged in the community - posting updates, tracking progress, and participating in events. This ensures you connect with motivated members who are committed to their journey.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* How to Appear in Directory Card */}
                        {!isAdmin && allMembers.length < 5 && (
                            <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-yellow-100 p-3 rounded-md flex-shrink-0">
                                        <Users className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-yellow-800 mb-2">Want to see more members?</h3>
                                        <p className="text-yellow-700 text-sm mb-3">
                                            The directory grows as members become active in the community. Here's how to discover more entrepreneurs:
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-white/60 p-3 rounded border border-yellow-300">
                                                <strong className="text-yellow-800">📝 Post in Community:</strong>
                                                <p className="text-yellow-700">Share your wins, challenges, or questions</p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded border border-yellow-300">
                                                <strong className="text-yellow-800">📊 Track Daily Progress:</strong>
                                                <p className="text-yellow-700">Log your daily 1% improvements</p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded border border-yellow-300">
                                                <strong className="text-yellow-800">🎯 Join Events:</strong>
                                                <p className="text-yellow-700">Attend workshops and networking sessions</p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded border border-yellow-300">
                                                <strong className="text-yellow-800">🤝 Make Connections:</strong>
                                                <p className="text-yellow-700">Send connection requests to members you meet</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Link to={createPageUrl("Community")} className="btn btn-secondary text-xs">
                                                Go to Community
                                            </Link>
                                            <Link to={createPageUrl("DailyTrack")} className="btn btn-secondary text-xs">
                                                Track Today's Progress
                                            </Link>
                                            <Link to={createPageUrl("Events")} className="btn btn-secondary text-xs">
                                                Browse Events
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Search and Filters */}
                        <div className="card p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-soft)] w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search active members..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="form-input pl-10"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'vision', 'startup', 'growth'].map(stage => (
                                        <button
                                            key={stage}
                                            onClick={() => handleStageFilter(stage)}
                                            className={`btn text-sm ${selectedStage === stage ? 'btn-primary' : 'btn-secondary'}`}
                                        >
                                            {stage === 'all' ? 'All Stages' : `${stage.charAt(0).toUpperCase() + stage.slice(1)} Stage`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {filteredAndSearchedMembers.length === 0 ? (
                                <div className="card p-8 text-center">
                                    <UserCheck className="w-12 h-12 text-[var(--text-soft)] mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                        {searchTerm || selectedStage !== 'all' ? 'No Members Found' : 'No Active Members Yet'}
                                    </h3>
                                    <p className="text-[var(--text-soft)] mb-4">
                                        {searchTerm || selectedStage !== 'all' 
                                            ? 'Try adjusting your search or filters.' 
                                            : 'Be among the first to get active! Members appear here as they engage with the community.'}
                                    </p>
                                    {!searchTerm && selectedStage === 'all' && (
                                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                                            <Link to={createPageUrl("Community")} className="btn btn-primary text-sm">
                                                Post in Community
                                            </Link>
                                            <Link to={createPageUrl("DailyTrack")} className="btn btn-secondary text-sm">
                                                Track Progress
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredAndSearchedMembers.map((member) => (
                                            <MemberCard
                                                key={member.id}
                                                member={member}
                                                onConnect={handleConnect}
                                                connectionStatus={connectionStatuses[member.id] || 'not_connected'}
                                                isAdmin={isAdmin}
                                                currentUser={currentUser}
                                                onDelete={handleDeleteUser}
                                            />
                                        ))}
                                    </div>
                                    
                                    {displayedCount < allMembers.filter(member => {
                                        if (selectedStage !== 'all' && member.entrepreneurship_stage !== selectedStage) return false;
                                        if (searchTerm) {
                                            const searchLower = searchTerm.toLowerCase();
                                            return member.full_name?.toLowerCase().includes(searchLower) ||
                                                   member.business_name?.toLowerCase().includes(searchLower) ||
                                                   member.bio?.toLowerCase().includes(searchLower) ||
                                                   member.city?.toLowerCase().includes(searchLower);
                                        }
                                        return true;
                                    }).length && (
                                        <div className="text-center">
                                            <button 
                                                onClick={loadMore} 
                                                disabled={loadingMore}
                                                className="btn btn-secondary"
                                            >
                                                {loadingMore ? (
                                                    <><Loader2 className="w-4 h-4 animate-spin mr-2" />Loading...</>
                                                ) : ( 'Load More Members' )}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </SubscriptionGate>
            </div>
        </div>
    );
}
