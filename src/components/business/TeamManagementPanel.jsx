import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { 
    Users, 
    Plus, 
    Mail, 
    Trash2, 
    Edit2, 
    CheckCircle, 
    Clock, 
    Loader2,
    Shield,
    Eye,
    Pencil
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeamManagementPanel({ business }) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteData, setInviteData] = useState({ email: '', role: 'editor', full_name: '' });
    const [inviting, setInviting] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);

    useEffect(() => {
        if (business) {
            loadTeamMembers();
        }
    }, [business]);

    const loadTeamMembers = async () => {
        try {
            const user = await base44.auth.me();
            
            // Get all team members for this business
            const members = await base44.entities.TeamMember.filter({ business_id: business.id });
            setTeamMembers(members);

            // Determine current user's role
            const userMember = members.find(m => m.user_id === user.id);
            if (userMember) {
                setCurrentUserRole(userMember.role);
            } else if (business.owner_user_id === user.id) {
                setCurrentUserRole('owner');
            }
        } catch (error) {
            console.error('Error loading team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async () => {
        setInviting(true);
        try {
            await base44.functions.invoke('inviteTeamMember', {
                business_id: business.id,
                email: inviteData.email,
                role: inviteData.role,
                full_name: inviteData.full_name
            });

            setShowInviteForm(false);
            setInviteData({ email: '', role: 'editor', full_name: '' });
            await loadTeamMembers();
            alert('Invitation sent successfully!');
        } catch (error) {
            console.error('Error inviting team member:', error);
            alert(error.response?.data?.error || 'Failed to send invitation');
        } finally {
            setInviting(false);
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!confirm('Are you sure you want to remove this team member?')) return;

        try {
            await base44.functions.invoke('removeTeamMember', { team_member_id: memberId });
            await loadTeamMembers();
            alert('Team member removed successfully');
        } catch (error) {
            console.error('Error removing team member:', error);
            alert(error.response?.data?.error || 'Failed to remove team member');
        }
    };

    const handleUpdateRole = async (memberId, newRole) => {
        try {
            await base44.functions.invoke('updateTeamMemberRole', {
                team_member_id: memberId,
                new_role: newRole
            });
            await loadTeamMembers();
            alert('Role updated successfully');
        } catch (error) {
            console.error('Error updating role:', error);
            alert(error.response?.data?.error || 'Failed to update role');
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'owner':
                return <Shield className="w-4 h-4 text-purple-600" />;
            case 'admin':
                return <Shield className="w-4 h-4 text-blue-600" />;
            case 'editor':
                return <Pencil className="w-4 h-4 text-green-600" />;
            case 'viewer':
                return <Eye className="w-4 h-4 text-gray-600" />;
            default:
                return null;
        }
    };

    const canManageTeam = currentUserRole && ['owner', 'admin'].includes(currentUserRole);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-[var(--primary-gold)]" />
                    <h2 className="text-2xl font-bold text-[var(--text-main)]">Team Members</h2>
                </div>
                {canManageTeam && (
                    <Button
                        onClick={() => setShowInviteForm(!showInviteForm)}
                        className="btn-primary"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Invite Member
                    </Button>
                )}
            </div>

            {showInviteForm && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-[var(--text-main)] mb-4">Invite Team Member</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={inviteData.email}
                                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                                className="form-input"
                                placeholder="member@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                Full Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={inviteData.full_name}
                                onChange={(e) => setInviteData({ ...inviteData, full_name: e.target.value })}
                                className="form-input"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">
                                Role
                            </label>
                            <select
                                value={inviteData.role}
                                onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                                className="form-input"
                            >
                                <option value="viewer">Viewer - Can view business info</option>
                                <option value="editor">Editor - Can edit business info</option>
                                <option value="admin">Admin - Can manage team members</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleInvite}
                                disabled={!inviteData.email || inviting}
                                className="btn-primary flex-1"
                            >
                                {inviting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Invitation
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={() => setShowInviteForm(false)}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {teamMembers.length === 0 ? (
                    <p className="text-center text-[var(--text-soft)] py-8">
                        No team members yet. Invite your first team member!
                    </p>
                ) : (
                    teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: member.assigned_color }}
                                    title={`Team color: ${member.assigned_color}`}
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-[var(--text-main)]">
                                            {member.full_name || member.email}
                                        </p>
                                        {member.status === 'pending_invitation' && (
                                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Pending
                                            </span>
                                        )}
                                        {member.status === 'active' && (
                                            <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--text-soft)]">{member.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {getRoleIcon(member.role)}
                                        <span className="text-sm font-medium text-[var(--text-main)] capitalize">
                                            {member.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {canManageTeam && member.role !== 'owner' && (
                                <div className="flex items-center gap-2">
                                    {currentUserRole === 'owner' && (
                                        <select
                                            value={member.role}
                                            onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                                            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
                                        >
                                            <option value="viewer">Viewer</option>
                                            <option value="editor">Editor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    )}
                                    <Button
                                        onClick={() => handleRemoveMember(member.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-sm text-[var(--text-main)] mb-2">Role Permissions:</h4>
                <ul className="text-xs text-[var(--text-soft)] space-y-1">
                    <li><strong>Owner:</strong> Full control, cannot be removed</li>
                    <li><strong>Admin:</strong> Can manage team members and edit business info</li>
                    <li><strong>Editor:</strong> Can edit business information</li>
                    <li><strong>Viewer:</strong> Can only view business information</li>
                </ul>
            </div>
        </div>
    );
}