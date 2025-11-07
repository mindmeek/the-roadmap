import React from 'react';
import { Target, Building, UserPlus, Eye, Loader2, Clock, Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const MemberCard = ({ member, onConnect, connectionStatus, isAdmin, currentUser, onDelete }) => {
    const stageInfo = (() => {
        if (!member.entrepreneurship_stage) return { title: "Not Set", color: "bg-gray-100 text-gray-800" };
        const stages = {
            vision: { title: "Vision Stage", color: "bg-blue-100 text-blue-800" },
            startup: { title: "Startup Stage", color: "bg-purple-100 text-purple-800" },
            growth: { title: "Growth Stage", color: "bg-green-100 text-green-800" }
        };
        return stages[member.entrepreneurship_stage] || { title: "Not Set", color: "bg-gray-100 text-gray-800" };
    })();

    const defaultProfilePic = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa6078871_LargeAppIcon.png";
    const defaultCoverPic = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c14f3ed5b_TBM-.jpg";
    
    const connectButton = () => {
        // Don't show connect button if viewing own profile
        if (currentUser && member.email === currentUser.email) {
            return null;
        }
        
        switch (connectionStatus) {
            case 'sending':
                return (
                    <button className="btn btn-primary text-sm flex-1 justify-center" disabled>
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Sending...
                    </button>
                );
            case 'pending':
                return (
                    <button className="btn btn-secondary text-sm flex-1 justify-center" disabled>
                        <Clock className="w-4 h-4 mr-1" /> Pending
                    </button>
                );
            case 'accepted':
                return (
                    <button className="btn btn-secondary text-sm flex-1 justify-center" disabled>
                        <Check className="w-4 h-4 mr-1" /> Connected
                    </button>
                );
            default: // 'not_connected' or undefined
                return (
                    <button
                        onClick={() => onConnect(member)}
                        className="btn btn-primary text-sm flex-1 justify-center"
                    >
                        <UserPlus className="w-4 h-4 mr-1" /> Connect
                    </button>
                );
        }
    };

    const isOwnProfile = currentUser && member.email === currentUser.email;

    return (
        <div className="card h-full flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Admin Delete Button */}
            {isAdmin && !isOwnProfile && (
                <div className="absolute top-2 right-2 z-20">
                    <button
                        onClick={() => onDelete(member)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete User (Admin Only)"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="relative h-32 bg-gray-200">
                <img src={member.cover_picture_url || defaultCoverPic} alt="Cover" className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow p-4 flex flex-col">
                <div className="flex items-start space-x-4 -mt-16 relative">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0 w-24 h-24 bg-white p-1 rounded-md shadow-md z-10 relative">
                        <img src={member.profile_picture_url || defaultProfilePic} alt={member.full_name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    {/* Name and Business */}
                    <div className="flex-grow min-w-0 pt-12">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[var(--text-main)] truncate">{member.full_name}</h3>
                            {isOwnProfile && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">You</span>
                            )}
                        </div>
                        {member.business_name && (
                            <p className="text-sm text-[var(--text-soft)] flex items-center">
                                <Building className="w-3 h-3 mr-2 flex-shrink-0" />
                                <span className="truncate">{member.business_name}</span>
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="flex-grow">
                    <p className="text-sm text-[var(--text-soft)] line-clamp-2 my-4 min-h-[40px]">
                        {member.bio || `Connect with ${member.full_name} to learn more.`}
                    </p>
                </div>
                
                <div className="mt-auto pt-3 space-y-3">
                    <div className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${stageInfo.color}`}>
                        <Target className="w-3 h-3 mr-1.5" />
                        {stageInfo.title}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Link 
                            to={isOwnProfile ? createPageUrl("Profile") : createPageUrl("MemberProfile") + `?id=${member.id}`}
                            className="btn btn-secondary text-sm flex-1 justify-center"
                        >
                            <Eye className="w-4 h-4 mr-1" />
                            {isOwnProfile ? "Edit Profile" : "View Profile"}
                        </Link>
                        {connectButton()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;