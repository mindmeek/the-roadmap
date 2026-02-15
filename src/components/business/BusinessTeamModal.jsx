import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { 
    X, Users, UserPlus, Trash2, Crown, Shield, User, 
    Loader2, Mail, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileBottomSheet from '@/components/common/MobileBottomSheet';

export default function BusinessTeamModal({ isOpen, onClose, business, currentUser }) {
    const [activeTab, setActiveTab] = useState('members'); // 'members' or 'invite'
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [inviting, setInviting] = useState(false);
    const [inviteStatus, setInviteStatus] = useState(null); // { type: 'success' | 'error', message: '' }
    const [removingId, setRemovingId] = useState(null);
    const [showRoleSheet, setShowRoleSheet] = useState(false);

    useEffect(() => {
        if (isOpen && business) {
            loadMembers();
            setActiveTab('members');
            setInviteStatus(null);
            setInviteEmail('');
        }
    }, [isOpen, business]);

    const loadMembers = async () => {
        setLoadingMembers(true);
        try {
            const { data } = await base44.functions.invoke('getBusinessMembers', { business_id: business.id });
            if (data.members) {
                setMembers(data.members);
            }
        } catch (error) {
            console.error("Error loading members:", error);
        } finally {
            setLoadingMembers(false);
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        setInviting(true);
        setInviteStatus(null);

        try {
            const { data, error } = await base44.functions.invoke('inviteBusinessMember', {
                business_id: business.id,
                recipient_email: inviteEmail,
                role_to_assign: inviteRole,
                message: `Join me in ${business.name} on Business Minds!`
            });

            if (error) throw new Error(error.message || "Failed to invite");
            
            if (data.error) {
                throw new Error(data.error);
            }

            setInviteStatus({ type: 'success', message: `Invitation sent to ${inviteEmail}` });
            setInviteEmail('');
        } catch (error) {
            setInviteStatus({ type: 'error', message: error.message });
        } finally {
            setInviting(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        
        setRemovingId(memberId);
        try {
            const { data, error } = await base44.functions.invoke('removeBusinessMember', {
                business_member_id: memberId
            });

            if (error) throw new Error(error.message);
            if (data.error) throw new Error(data.error);

            // Remove from local list
            setMembers(prev => prev.filter(m => m.id !== memberId));
        } catch (error) {
            alert("Failed to remove member: " + error.message);
        } finally {
            setRemovingId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                            <Users className="w-5 h-5 text-[var(--primary-gold)]" />
                            Team Management
                        </h2>
                        <p className="text-sm text-[var(--text-soft)]">{business?.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X className="w-5 h-5 text-[var(--text-soft)]" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'members' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)] bg-white dark:bg-gray-900' : 'text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                        Current Members
                    </button>
                    <button
                        onClick={() => setActiveTab('invite')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'invite' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)] bg-white dark:bg-gray-900' : 'text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                        Invite New Member
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'members' ? (
                        loadingMembers ? (
                            <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>
                        ) : (
                            <div className="space-y-4">
                                {members.length === 0 ? (
                                    <p className="text-center text-[var(--text-soft)] py-4">No members found.</p>
                                ) : (
                                    members.map(member => (
                                        <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={member.profile_picture_url || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa6078871_LargeAppIcon.png"} 
                                                    alt={member.full_name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium text-[var(--text-main)]">{member.full_name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-[var(--text-soft)]">{member.user_email}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                                                            member.role === 'owner' ? 'bg-purple-100 text-purple-700' :
                                                            member.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-200 text-gray-700'
                                                        }`}>
                                                            {member.role}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            {/* Only Owners/Admins can remove. Owner cannot be removed. */}
                                            {member.role !== 'owner' && member.user_email !== currentUser?.email && (
                                                <button 
                                                    onClick={() => handleRemoveMember(member.id)}
                                                    disabled={removingId === member.id}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                                    title="Remove Member"
                                                >
                                                    {removingId === member.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )
                    ) : (
                        <div className="max-w-md mx-auto">
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="email" 
                                            required
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                            className="form-input pl-10 w-full"
                                            placeholder="colleague@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Role</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setInviteRole('member')}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${inviteRole === 'member' ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <User className="w-4 h-4" />
                                                <span className="font-semibold">Member</span>
                                            </div>
                                            <p className="text-xs text-[var(--text-soft)]">Can view and edit assigned tasks.</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setInviteRole('admin')}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${inviteRole === 'admin' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <Shield className="w-4 h-4" />
                                                <span className="font-semibold">Admin</span>
                                            </div>
                                            <p className="text-xs text-[var(--text-soft)]">Can manage members and settings.</p>
                                        </button>
                                    </div>
                                    <MobileBottomSheet
                                        isOpen={showRoleSheet}
                                        onClose={() => setShowRoleSheet(false)}
                                        options={[
                                            { value: 'member', label: 'Member - Can view and edit assigned tasks' },
                                            { value: 'admin', label: 'Admin - Can manage members and settings' }
                                        ]}
                                        value={inviteRole}
                                        onChange={setInviteRole}
                                        label="Select Role"
                                    />
                                </div>

                                {inviteStatus && (
                                    <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${inviteStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {inviteStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                        {inviteStatus.message}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={inviting || !inviteEmail}
                                    className="btn btn-primary w-full flex justify-center items-center gap-2 py-3"
                                >
                                    {inviting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
                                    Send Invitation
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}