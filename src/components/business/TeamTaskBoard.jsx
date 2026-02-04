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
    User
} from 'lucide-react';

export default function TeamTaskBoard({ business, currentUser }) {
    const [tasks, setTasks] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'my_tasks', 'assigned_by_me'

    useEffect(() => {
        loadData();
    }, [business.id]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [tasksData, membersData] = await Promise.all([
                base44.entities.TeamTask.filter({ business_id: business.id }, '-created_date'),
                base44.entities.TeamMember.filter({ business_id: business.id, status: 'active' })
            ]);
            setTasks(tasksData);
            setTeamMembers(membersData);
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowTaskModal(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowTaskModal(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) return;
        try {
            await base44.entities.TeamTask.delete(taskId);
            await loadData();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        try {
            const updates = { status: newStatus };
            if (newStatus === 'completed') {
                updates.completed_date = new Date().toISOString();
            }
            await base44.entities.TeamTask.update(task.id, updates);
            await loadData();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const getFilteredTasks = () => {
        if (filter === 'my_tasks') {
            return tasks.filter(t => t.assigned_to_email === currentUser.email);
        }
        if (filter === 'assigned_by_me') {
            return tasks.filter(t => t.created_by === currentUser.email);
        }
        return tasks;
    };

    const groupTasksByStatus = (taskList) => {
        return {
            todo: taskList.filter(t => t.status === 'todo'),
            in_progress: taskList.filter(t => t.status === 'in_progress'),
            blocked: taskList.filter(t => t.status === 'blocked'),
            completed: taskList.filter(t => t.status === 'completed')
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
            todo: <Circle className="w-4 h-4 text-gray-400" />,
            in_progress: <Clock className="w-4 h-4 text-blue-500" />,
            blocked: <AlertCircle className="w-4 h-4 text-red-500" />,
            completed: <CheckCircle2 className="w-4 h-4 text-green-500" />
        };
        return icons[status] || icons.todo;
    };

    const filteredTasks = getFilteredTasks();
    const groupedTasks = groupTasksByStatus(filteredTasks);

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
                        All Tasks ({tasks.length})
                    </Button>
                    <Button
                        variant={filter === 'my_tasks' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('my_tasks')}
                        style={{ borderRadius: '1px' }}
                    >
                        My Tasks ({tasks.filter(t => t.assigned_to_email === currentUser.email).length})
                    </Button>
                    <Button
                        variant={filter === 'assigned_by_me' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('assigned_by_me')}
                        style={{ borderRadius: '1px' }}
                    >
                        Assigned by Me ({tasks.filter(t => t.created_by === currentUser.email).length})
                    </Button>
                </div>
                <Button onClick={handleCreateTask} className="btn-primary" size="sm" style={{ borderRadius: '1px' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                </Button>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['todo', 'in_progress', 'blocked', 'completed'].map(status => (
                    <div key={status} className="bg-gray-50 dark:bg-gray-800 p-3" style={{ borderRadius: '1px' }}>
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                            {getStatusIcon(status)}
                            <h3 className="font-bold text-sm capitalize">
                                {status.replace('_', ' ')} ({groupedTasks[status].length})
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {groupedTasks[status].map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    currentUser={currentUser}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                    onStatusChange={handleStatusChange}
                                    getPriorityColor={getPriorityColor}
                                />
                            ))}
                            {groupedTasks[status].length === 0 && (
                                <p className="text-xs text-[var(--text-soft)] text-center py-4">
                                    No tasks
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Task Modal */}
            {showTaskModal && (
                <TaskFormModal
                    business={business}
                    teamMembers={teamMembers}
                    currentUser={currentUser}
                    editingTask={editingTask}
                    onClose={() => {
                        setShowTaskModal(false);
                        setEditingTask(null);
                    }}
                    onSave={loadData}
                />
            )}
        </div>
    );
}

function TaskCard({ task, currentUser, onEdit, onDelete, onStatusChange, getPriorityColor }) {
    const [showComments, setShowComments] = useState(false);
    const canEdit = task.created_by === currentUser.email || task.assigned_to_email === currentUser.email;

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-3 hover:shadow-md transition-shadow" style={{ borderRadius: '1px' }}>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm flex-1">{task.title}</h4>
                {canEdit && (
                    <div className="flex gap-1">
                        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-blue-600">
                            <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>

            {task.description && (
                <p className="text-xs text-[var(--text-soft)] mb-2 line-clamp-2">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-1 mb-2">
                <span className={`text-xs px-2 py-0.5 ${getPriorityColor(task.priority)}`} style={{ borderRadius: '1px' }}>
                    {task.priority}
                </span>
            </div>

            {task.assigned_to_name && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-soft)] mb-1">
                    <User className="w-3 h-3" />
                    <span>{task.assigned_to_name}</span>
                </div>
            )}

            {task.due_date && (
                <div className="flex items-center gap-1 text-xs text-[var(--text-soft)] mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(task.due_date).toLocaleDateString()}</span>
                </div>
            )}

            {/* Status Actions */}
            {task.assigned_to_email === currentUser.email && task.status !== 'completed' && (
                <div className="flex gap-1 mt-2">
                    {task.status === 'todo' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStatusChange(task, 'in_progress')}
                            className="text-xs h-6"
                            style={{ borderRadius: '1px' }}
                        >
                            Start
                        </Button>
                    )}
                    {task.status === 'in_progress' && (
                        <>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStatusChange(task, 'completed')}
                                className="text-xs h-6"
                                style={{ borderRadius: '1px' }}
                            >
                                Complete
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStatusChange(task, 'blocked')}
                                className="text-xs h-6"
                                style={{ borderRadius: '1px' }}
                            >
                                Block
                            </Button>
                        </>
                    )}
                    {task.status === 'blocked' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onStatusChange(task, 'in_progress')}
                            className="text-xs h-6"
                            style={{ borderRadius: '1px' }}
                        >
                            Unblock
                        </Button>
                    )}
                </div>
            )}

            {task.comments && task.comments.length > 0 && (
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-2"
                >
                    <MessageSquare className="w-3 h-3" />
                    <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
                </button>
            )}
        </div>
    );
}

function TaskFormModal({ business, teamMembers, currentUser, editingTask, onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: editingTask?.title || '',
        description: editingTask?.description || '',
        assigned_to_team_member_id: editingTask?.assigned_to_team_member_id || '',
        priority: editingTask?.priority || 'medium',
        due_date: editingTask?.due_date || '',
        section: editingTask?.section || ''
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const assignedMember = teamMembers.find(m => m.id === formData.assigned_to_team_member_id);
            const assignerMember = teamMembers.find(m => m.email === currentUser.email);

            const taskData = {
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
                section: formData.section
            };

            if (editingTask) {
                await base44.entities.TeamTask.update(editingTask.id, taskData);
            } else {
                await base44.entities.TeamTask.create(taskData);
            }

            await onSave();
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Failed to save task. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 max-w-lg w-full p-6" style={{ borderRadius: '1px' }}>
                <h2 className="text-xl font-bold mb-4">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Task Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="form-input"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="form-input"
                            rows={3}
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
                            <label className="block text-sm font-medium mb-1">Due Date</label>
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
                            placeholder="e.g., Brand Identity, Marketing"
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
                                editingTask ? 'Update Task' : 'Create Task'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}