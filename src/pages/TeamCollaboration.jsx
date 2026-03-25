import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Users, Plus, Mail, Trash2, CheckCircle, Clock, Loader2, Shield, Eye,
    Pencil, ChevronRight, MessageSquare, FileText, Crown, AlertTriangle,
    UserPlus, RefreshCw, Copy, Check
} from 'lucide-react';
import StrategyDocComments from '@/components/team/StrategyDocComments';

const ROLE_CONFIG = {
    owner:  { label: 'Owner',  icon: Crown,   color: 'text-yellow-600',  bg: 'bg-yellow-50 dark:bg-yellow-900/20',  border: 'border-yellow-200 dark:border-yellow-800', desc: 'Full control of the business' },
    admin:  { label: 'Admin',  icon: Shield,  color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20',      border: 'border-blue-200 dark:border-blue-800',     desc: 'Can manage team & edit everything' },
    editor: { label: 'Editor', icon: Pencil,  color: 'text-green-600',   bg: 'bg-green-50 dark:bg-green-900/20',    border: 'border-green-200 dark:border-green-800',   desc: 'Can edit business info & leave comments' },
    viewer: { label: 'Viewer', icon: Eye,     color: 'text-gray-600',    bg: 'bg-gray-50 dark:bg-gray-800',         border: 'border-gray-200 dark:border-gray-700',     desc: 'Can view and leave comments only' },
};

const DOC_TYPE_LABELS = {
    business_model_canvas: 'Business Plan',
    swot_analysis: 'SWOT Analysis',
    ideal_client: 'Ideal Client',
    value_proposition_canvas: 'Value Proposition',
    value_ladder: 'Value Ladder',
    customer_journey: 'Customer Journey',
    define_your_why: 'Define Your Why',
    pricing_strategies: 'Pricing Strategies',
};

export default function TeamCollaboration() {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [strategyDocs, setStrategyDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('team');
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [inviteData, setInviteData] = useState({ email: '', full_name: '', role: 'editor' });
    const [inviting, setInviting] = useState(false);
    const [inviteSuccess, setInviteSuccess] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [copiedToken, setCopiedToken] = useState(null);

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        setLoading(true);
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            const selectedBusinessId = localStorage.getItem('selectedBusinessId');

            // Use the backend function which handles both owners and team members
            const result = await base44.functions.invoke('getTeamBusinessData', {
                business_id: selectedBusinessId || null
            });

            const { business: biz, teamMembers: members, strategyDocs: docs, myRole } = result.data;

            setBusiness(biz || null);
            setTeamMembers(members || []);
            setStrategyDocs(docs || []);
            setCurrentUserRole(myRole || (biz?.owner_user_id === userData.id ? 'owner' : null));

        } catch (err) {
            console.error('Error loading team data:', err);
        } finally {
            setLoading(false);
        }
    };

    const canManage = ['owner', 'admin'].includes(currentUserRole) || user?.role === 'admin';

    const handleInvite = async () => {
        if (!business) return;
        setInviting(true);
        try {
            await base44.functions.invoke('inviteTeamMember', {
                business_id: business.id,
                email: inviteData.email,
                role: inviteData.role,
                full_name: inviteData.full_name
            });
            setInviteSuccess(true);
            setInviteData({ email: '', full_name: '', role: 'editor' });
            await loadAll();
            setTimeout(() => { setInviteSuccess(false); setShowInviteForm(false); }, 2000);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to send invitation');
        } finally {
            setInviting(false);
        }
    };

    const handleRemove = async (memberId) => {
        if (!confirm('Remove this team member?')) return;
        try {
            await base44.functions.invoke('removeTeamMember', { team_member_id: memberId });
            setTeamMembers(prev => prev.filter(m => m.id !== memberId));
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to remove member');
        }
    };

    const handleRoleChange = async (memberId, newRole) => {
        try {
            await base44.functions.invoke('updateTeamMemberRole', { team_member_id: memberId, new_role: newRole });
            setTeamMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update role');
        }
    };

    const copyInviteLink = async (token) => {
        const link = `${window.location.origin}/AcceptTeamInvitation?token=${token}`;
        await navigator.clipboard.writeText(link);
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
            {/* Header */}
            <div className="card p-6 bg-gradient-to-r from-black to-gray-900 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-[var(--primary-gold)] p-3 rounded-lg">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Team Collaboration</h1>
                            <p className="text-white/70 text-sm mt-1">
                                {business ? `${business.name}` : 'Manage your team and collaborate on strategy'}
                            </p>
                        </div>
                    </div>
                    {canManage && business && (
                        <button
                            onClick={() => setShowInviteForm(!showInviteForm)}
                            className="flex items-center gap-2 bg-[var(--primary-gold)] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-all"
                        >
                            <UserPlus className="w-4 h-4" />
                            Invite Member
                        </button>
                    )}
                </div>

                {/* Stats */}
                <div className="flex gap-4 mt-4 flex-wrap">
                    <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                        <span className="text-white/70">Team Members: </span>
                        <span className="font-bold text-white">{teamMembers.length + 1}</span>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                        <span className="text-white/70">Active: </span>
                        <span className="font-bold text-green-400">{teamMembers.filter(m => m.status === 'active').length + 1}</span>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                        <span className="text-white/70">Pending: </span>
                        <span className="font-bold text-yellow-400">{teamMembers.filter(m => m.status === 'pending_invitation').length}</span>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-lg text-sm">
                        <span className="text-white/70">Strategy Docs: </span>
                        <span className="font-bold text-white">{strategyDocs.length}</span>
                    </div>
                </div>
            </div>

            {/* No Business Warning */}
            {!business && (
                <div className="card p-6 border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-[var(--text-main)] mb-1">No Business Profile Found</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                You need a business profile to invite team members. Create one first via My Businesses.
                            </p>
                            <Link to={createPageUrl('MyBusinesses')} className="btn btn-primary text-sm">
                                Go to My Businesses
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Invite Form */}
            {showInviteForm && business && (
                <div className="card p-6 border-2 border-[var(--primary-gold)]">
                    <h3 className="font-bold text-lg text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-[var(--primary-gold)]" />
                        Invite a Team Member
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Email *</label>
                            <input
                                type="email"
                                value={inviteData.email}
                                onChange={e => setInviteData({ ...inviteData, email: e.target.value })}
                                className="form-input w-full"
                                placeholder="collaborator@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Full Name (optional)</label>
                            <input
                                type="text"
                                value={inviteData.full_name}
                                onChange={e => setInviteData({ ...inviteData, full_name: e.target.value })}
                                className="form-input w-full"
                                placeholder="Jane Smith"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Role</label>
                            <select
                                value={inviteData.role}
                                onChange={e => setInviteData({ ...inviteData, role: e.target.value })}
                                className="form-input w-full"
                            >
                                <option value="viewer">Viewer — View only</option>
                                <option value="editor">Editor — Can edit & comment</option>
                                <option value="admin">Admin — Manage team</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleInvite}
                            disabled={!inviteData.email || inviting || inviteSuccess}
                            className="btn btn-primary disabled:opacity-50 flex items-center gap-2"
                        >
                            {inviteSuccess ? (
                                <><Check className="w-4 h-4" /> Invitation Sent!</>
                            ) : inviting ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                            ) : (
                                <><Mail className="w-4 h-4" /> Send Invitation</>
                            )}
                        </button>
                        <button onClick={() => setShowInviteForm(false)} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                    { id: 'team', label: 'Team Members', icon: Users },
                    { id: 'docs', label: 'Strategy Feedback', icon: MessageSquare },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                            activeTab === tab.id
                                ? 'border-[var(--primary-gold)] text-[var(--primary-gold)]'
                                : 'border-transparent text-[var(--text-soft)] hover:text-[var(--text-main)]'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Team Members Tab */}
            {activeTab === 'team' && (
                <div className="space-y-4">
                    {/* Role Legend */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(ROLE_CONFIG).map(([role, cfg]) => {
                            const Icon = cfg.icon;
                            return (
                                <div key={role} className={`p-3 rounded-lg border ${cfg.bg} ${cfg.border}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon className={`w-4 h-4 ${cfg.color}`} />
                                        <span className={`text-sm font-bold ${cfg.color}`}>{cfg.label}</span>
                                    </div>
                                    <p className="text-xs text-[var(--text-soft)]">{cfg.desc}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Owner Row */}
                    <div className="card p-4 border-l-4 border-yellow-400">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#8B6F4E' }}
                                >
                                    {(user?.full_name || user?.email || 'Y').charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-[var(--text-main)]">{user?.full_name || 'You'}</p>
                                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <Crown className="w-3 h-3" /> Owner
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--text-soft)]">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Invitations Section */}
                    {teamMembers.filter(m => m.status === 'pending_invitation').length > 0 && (
                        <div className="card p-4 border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/10">
                            <h3 className="font-bold text-sm text-yellow-700 dark:text-yellow-400 mb-3 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Pending Invitations
                            </h3>
                            <div className="space-y-2">
                                {teamMembers.filter(m => m.status === 'pending_invitation').map(member => (
                                    <div key={member.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                                style={{ backgroundColor: member.assigned_color || '#F59E0B' }}>
                                                {(member.full_name || member.email).charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-[var(--text-main)]">{member.full_name || '—'}</p>
                                                <p className="text-xs text-[var(--text-soft)]">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> Invite Sent
                                            </span>
                                            {member.invitation_token && canManage && (
                                                <button
                                                    onClick={() => copyInviteLink(member.invitation_token)}
                                                    title="Copy invite link"
                                                    className="p-1.5 rounded-lg text-gray-500 hover:text-[var(--primary-gold)] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {copiedToken === member.invitation_token ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                                                </button>
                                            )}
                                            {canManage && (
                                                <button onClick={() => handleRemove(member.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Team Member Rows */}
                    {teamMembers.filter(m => m.status !== 'pending_invitation').length === 0 && teamMembers.length === 0 ? (
                        <div className="card p-8 text-center">
                            <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-[var(--text-soft)]">No team members yet.</p>
                            {canManage && business && (
                                <button
                                    onClick={() => setShowInviteForm(true)}
                                    className="btn btn-primary mt-4"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Invite Your First Member
                                </button>
                            )}
                        </div>
                    ) : (
                        teamMembers.filter(m => m.status !== 'pending_invitation').map(member => {
                            const cfg = ROLE_CONFIG[member.role] || ROLE_CONFIG.viewer;
                            const Icon = cfg.icon;
                            return (
                                <div key={member.id} className="card p-4">
                                    <div className="flex items-center justify-between gap-3 flex-wrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                                style={{ backgroundColor: member.assigned_color || '#6B7280' }}
                                            >
                                                {(member.full_name || member.email).charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-semibold text-[var(--text-main)]">
                                                        {member.full_name || member.email}
                                                    </p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                                                        <Icon className="w-3 h-3" />{cfg.label}
                                                    </span>
                                                    <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" /> Active
                                                    </span>
                                                </div>
                                                <p className="text-sm text-[var(--text-soft)]">{member.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {canManage && member.role !== 'owner' && (
                                                <>
                                                    {(currentUserRole === 'owner' || user?.role === 'admin') && (
                                                        <select
                                                            value={member.role}
                                                            onChange={e => handleRoleChange(member.id, e.target.value)}
                                                            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-[var(--text-main)]"
                                                        >
                                                            <option value="viewer">Viewer</option>
                                                            <option value="editor">Editor</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    )}
                                                    <button
                                                        onClick={() => handleRemove(member.id)}
                                                        className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* Strategy Docs Feedback Tab */}
            {activeTab === 'docs' && (
                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-soft)]">
                        Select a strategy document to view or leave team feedback.
                    </p>

                    {strategyDocs.length === 0 ? (
                        <div className="card p-8 text-center">
                            <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                            <p className="text-[var(--text-soft)]">No strategy documents yet.</p>
                            <Link to={createPageUrl('MyFoundationRoadmap')} className="btn btn-primary mt-4 inline-flex">
                                Go to Foundation Roadmap
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {strategyDocs.map(doc => (
                                <button
                                    key={doc.id}
                                    onClick={() => setSelectedDoc(selectedDoc?.id === doc.id ? null : doc)}
                                    className={`card p-4 text-left transition-all hover:border-[var(--primary-gold)] ${
                                        selectedDoc?.id === doc.id ? 'border-2 border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/10' : 'border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${doc.is_completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                                <FileText className={`w-4 h-4 ${doc.is_completed ? 'text-green-600' : 'text-gray-500'}`} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm text-[var(--text-main)]">
                                                    {DOC_TYPE_LABELS[doc.document_type] || doc.title || doc.document_type}
                                                </p>
                                                <p className="text-xs text-[var(--text-soft)] flex items-center gap-1 mt-0.5">
                                                    {doc.is_completed ? (
                                                        <><CheckCircle className="w-3 h-3 text-green-600" /> Completed</>
                                                    ) : (
                                                        'In Progress'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 text-[var(--text-soft)] transition-transform ${selectedDoc?.id === doc.id ? 'rotate-90' : ''}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Comment Panel */}
                    {selectedDoc && (
                        <div className="space-y-2">
                            <h3 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-[var(--primary-gold)]" />
                                Comments on: {DOC_TYPE_LABELS[selectedDoc.document_type] || selectedDoc.title}
                            </h3>
                            <StrategyDocComments
                                documentId={selectedDoc.id}
                                documentType={selectedDoc.document_type}
                                businessId={business?.id}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}