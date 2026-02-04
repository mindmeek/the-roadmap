import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    Plus, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Circle,
    Loader2,
    Edit2,
    Trash2,
    MessageSquare,
    Calendar,
    User,
    Target
} from 'lucide-react';

export default function TeamTaskBoard({ business, currentUser }) {
    const [milestones, setMilestones] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMilestoneModal, setShowMilestoneModal] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'my_milestones', 'assigned_by_me'

    useEffect(() => {
        loadData();
    }, [business.id]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [milestonesData, membersData] = await Promise.all([
                base44.entities.BusinessMilestone.filter({ business_id: business.id }, '-created_date'),
                base44.entities.TeamMember.filter({ business_id: business.id, status: 'active' })
            ]);
            setMilestones(milestonesData);
            setTeamMembers(membersData);
        } catch (error) {
            console.error('Error loading milestones:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateMilestone = () => {
        setEditingMilestone(null);
        setShowMilestoneModal(true);
    };

    const handleEditMilestone = (milestone) => {
        setEditingMilestone(milestone);
        setShowMilestoneModal(true);
    };

    const handleDeleteMilestone = async (milestoneId) => {
        if (!confirm('Are you sure you want to delete this milestone?')) return;
        try {
            await base44.entities.BusinessMilestone.delete(milestoneId);
            await loadData();
        } catch (error) {
            console.error('Error deleting milestone:', error);
        }
    };

    const handleStatusChange = async (milestone, newStatus) => {
        try {
            const updates = { status: newStatus };
            if (newStatus === 'achieved') {
                updates.achieved_date = new Date().toISOString();
            }
            await base44.entities.BusinessMilestone.update(milestone.id, updates);
            await loadData();
        } catch (error) {
            console.error('Error updating milestone status:', error);
        }
    };

    const getFilteredMilestones = () => {
        if (filter === 'my_milestones') {
            return milestones.filter(m => m.assigned_to_email === currentUser.email);
        }
        if (filter === 'assigned_by_me') {
            return milestones.filter(m => m.created_by === currentUser.email);
        }
        return milestones;
    };

    const groupMilestonesByStatus = (milestoneList) => {
        return {
            not_started: milestoneList.filter(m => m.status === 'not_started'),
            in_progress: milestoneList.filter(m => m.status === 'in_progress'),
            blocked: milestoneList.filter(m => m.status === 'blocked'),
            achieved: milestoneList.filter(m => m.status === 'achieved')
        };
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
            urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        };
        return colors[priority] || colors.medium;
    };

    const getStatusIcon = (status) => {
        const icons = {
            not_started: <Circle className="w-4 h-4 text-gray-400" />,
            in_progress: <Clock className="w-4 h-4 text-blue-500" />,
            blocked: <AlertCircle className="w-4 h-4 text-red-500" />,
            achieved: <CheckCircle2 className="w-4 h-4 text-green-500" />
        };
        return icons[status] || icons.not_started;
    };

    const filteredMilestones = getFilteredMilestones();
    const groupedMilestones = groupMilestonesByStatus(filteredMilestones);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                        style={{ borderRadius: '1px' }}
                    >
                        All Milestones ({milestones.length})
                    </Button>
                    <Button
                        variant={filter === 'my_milestones' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('my_milestones')}
                        style={{ borderRadius: '1px' }}
                    >
                        My Milestones ({milestones.filter(m => m.assigned_to_email === currentUser.email).length})
                    </Button>
                    <Button
                        variant={filter === 'assigned_by_me' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('assigned_by_me')}
                        style={{ borderRadius: '1px' }}
                    >
                        Assigned by Me ({milestones.filter(m => m.created_by === currentUser.email).length})
                    </Button>
                </div>
                <Button onClick={handleCreateMilestone} className="btn-primary" size="sm" style={{ borderRadius: '1px' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Milestone
                </Button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['not_started', 'in_progress', 'blocked', 'achieved'].map(status => (
                    <div key={status} className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                            {getStatusIcon(status)}
                            <h3 className="font-bold text-sm capitalize">
                                {status.replace('_', ' ')} ({groupedMilestones[status].length})
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {groupedMilestones[status].map(milestone => (
                                <MilestoneCard
                                    key={milestone.id}
                                    milestone={milestone}
                                    currentUser={currentUser}
                                    onEdit={handleEditMilestone}
                                    onDelete={handleDeleteMilestone}
                                    onStatusChange={handleStatusChange}
                                    getPriorityColor={getPriorityColor}
                                />
                            ))}
                            {groupedMilestones[status].length === 0 && (
                                <p className="text-xs text-[var(--text-soft)] text-center py-4">
                                    No milestones
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Milestone Modal */}
            {showMilestoneModal && (
                <MilestoneFormModal
                    business={business}
                    teamMembers={teamMembers}
                    currentUser={currentUser}
                    editingMilestone={editingMilestone}
                    onClose={() => {
                        setShowMilestoneModal(false);
                        setEditingMilestone(null);
                    }}
                    onSave={loadData}
                />
            )}
        </div>
    );
}

function MilestoneCard({ milestone, currentUser, onEdit, onDelete, onStatusChange, getPriorityColor }) {
    const [showComments, setShowComments] = useState(false);
    const canEdit = milestone.created_by === currentUser.email || milestone.assigned_to_email === currentUser.email;

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 hover:shadow-md transition-shadow" style={{ borderRadius: '1px' }}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm flex-1">{milestone.title}</h4>
                {canEdit && (
                    <div className="flex gap-1">
                        <button onClick={() => onEdit(milestone)} className="text-gray-400 hover:text-blue-600">
                            <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => onDelete(milestone.id)} className="text-gray-400 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {milestone.description && (
                <p className="text-xs text-[var(--text-soft)] mb-2 line-clamp-2">{milestone.description}</p>
            )}

            <div className="flex flex-wrap gap-1 mb-2">
                <span className={`text-xs px-2 py-0.5 ${getPriorityColor(milestone.priority)}`} style={{ borderRadius: '1px' }}>
                    {milestone.priority}
                </span>
            </div>

            {milestone.target_metric && (
                <div className="flex items-center gap-1 text-xs text-[var(--primary-gold)] mb-1 font-semibold">
                    <Target className="w-3 h-3" />
                    <span>{milestone.target_metric}</span>
                </div>
            )}

            {milestone.assigned_to_name && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-soft)] mb-1">
                    <User className="w-3 h-3" />
                    <span>{milestone.assigned_to_name}</span>
                </div>
            )}

            {milestone.due_date && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-soft)] mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(milestone.due_date).toLocaleDateString()}</span>
                </div>
            )}

            {/* Status Actions */}
            {milestone.assigned_to_email === currentUser.email && milestone.status !== 'achieved' && (
                <div className="flex gap-1 mt-2">
                    {milestone.status === 'not_started' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStatusChange(milestone, 'in_progress')}
                            className="text-xs h-6"
                            style={{ borderRadius: '1px' }}
                        >
                            Start
                        </Button>
                    )}
                    {milestone.status === 'in_progress' && (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStatusChange(milestone, 'achieved')}
                                className="text-xs h-6"
                                style={{ borderRadius: '1px' }}
                            >
                                Mark Achieved
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStatusChange(milestone, 'blocked')}
                                className="text-xs h-6"
                                style={{ borderRadius: '1px' }}
                            >
                                Block
                            </Button>
                        </>
                    )}
                    {milestone.status === 'blocked' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStatusChange(milestone, 'in_progress')}
                            className="text-xs h-6"
                            style={{ borderRadius: '1px' }}
                        >
                            Unblock
                        </Button>
                    )}
                </div>
            )}

            {milestone.comments && milestone.comments.length > 0 && (
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-2"
                >
                    <MessageSquare className="w-3 h-3" />
                    <span>{milestone.comments.length} comment{milestone.comments.length !== 1 ? 's' : ''}</span>
                </button>
            )}
        </div>
    );
}

function MilestoneFormModal({ business, teamMembers, currentUser, editingMilestone, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: editingMilestone?.title || '',
        description: editingMilestone?.description || '',
        assigned_to_team_member_id: editingMilestone?.assigned_to_team_member_id || '',
        priority: editingMilestone?.priority || 'medium',
        due_date: editingMilestone?.due_date || '',
        section: editingMilestone?.section || '',
        target_metric: editingMilestone?.target_metric || ''
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const assignedMember = teamMembers.find(m => m.id === formData.assigned_to_team_member_id);
            const assignerMember = teamMembers.find(m => m.email === currentUser.email);

            const milestoneData = {
                business_id: business.id,
                title: formData.title,
                description: formData.description,
                assigned_to_team_member_id: formData.assigned_to_team_member_id,
                assigned_to_email: assignedMember?.email || '',
                assigned_to_name: assignedMember?.full_name || '',
                assigned_by_team_member_id: assignerMember?.id || '',
                assigned_by_name: currentUser.full_name,
                priority: formData.priority,
                due_date: formData.due_date,
                section: formData.section,
                target_metric: formData.target_metric
            };

            if (editingMilestone) {
                await base44.entities.BusinessMilestone.update(editingMilestone.id, milestoneData);
            } else {
                await base44.entities.BusinessMilestone.create(milestoneData);
            }

            await onSave();
            onClose();
        } catch (error) {
            console.error('Error saving milestone:', error);
            alert('Failed to save milestone. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 max-w-lg w-full p-6 my-8" style={{ borderRadius: '1px' }}>
                <h2 className="text-xl font-bold mb-4">
                    {editingMilestone ? 'Edit Milestone' : 'Create New Milestone'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Milestone Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Complete Brand Identity, Launch Website, Reach $5K MRR"
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What does achieving this milestone look like?"
                            className="form-input"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Target Metric (Optional)</label>
                        <input
                            type="text"
                            value={formData.target_metric}
                            onChange={(e) => setFormData({ ...formData, target_metric: e.target.value })}
                            placeholder="e.g., $5K MRR, 100 customers, 1000 followers"
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Assign To</label>
                        <select
                            value={formData.assigned_to_team_member_id}
                            onChange={(e) => setFormData({ ...formData, assigned_to_team_member_id: e.target.value })}
                            className="form-input"
                        >
                            <option value="">Unassigned</option>
                            {teamMembers.map(member => (
                                <option key={member.id} value={member.id}>
                                    {member.full_name} ({member.role})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="form-input"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Target Date</label>
                            <input
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Related Section</label>
                        <input
                            type="text"
                            value={formData.section}
                            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                            placeholder="e.g., Brand Identity, Marketing, Operations"
                            className="form-input"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={saving}
                            style={{ borderRadius: '1px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="btn-primary"
                            disabled={saving}
                            style={{ borderRadius: '1px' }}
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                editingMilestone ? 'Update Milestone' : 'Create Milestone'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}