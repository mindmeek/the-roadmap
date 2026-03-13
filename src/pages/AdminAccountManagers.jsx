import React, { useState, useEffect } from 'react';
import { AccountManagerAssignment } from '@/entities/all';
import { User } from '@/entities/all';
import {
    UserCheck, Users, Search, Loader2, CheckCircle, Clock,
    PauseCircle, XCircle, MessageSquare, Plus, Calendar, ChevronDown
} from 'lucide-react';

const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: Clock },
    active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: CheckCircle },
    paused: { label: 'Paused', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', icon: PauseCircle },
    ended: { label: 'Ended', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', icon: XCircle },
};

export default function AdminAccountManagers() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [adminUser, setAdminUser] = useState(null);
    const [savingStatus, setSavingStatus] = useState(null);
    const [addingNote, setAddingNote] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [data, user] = await Promise.all([
                AccountManagerAssignment.list('-created_date'),
                User.me()
            ]);
            setAssignments(data);
            setAdminUser(user);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (assignmentId, newStatus) => {
        setSavingStatus(assignmentId);
        try {
            await AccountManagerAssignment.update(assignmentId, { status: newStatus });
            setAssignments(prev => prev.map(a => a.id === assignmentId ? { ...a, status: newStatus } : a));
            if (selectedAssignment?.id === assignmentId) {
                setSelectedAssignment(prev => ({ ...prev, status: newStatus }));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSavingStatus(null);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.trim() || !selectedAssignment) return;
        setAddingNote(true);
        try {
            const note = {
                id: crypto.randomUUID(),
                date: new Date().toISOString().split('T')[0],
                content: newNote,
                author_name: adminUser?.full_name || 'Admin',
                author_email: adminUser?.email || ''
            };
            const updated = [...(selectedAssignment.session_notes || []), note];
            await AccountManagerAssignment.update(selectedAssignment.id, { session_notes: updated });
            const updatedAssignment = { ...selectedAssignment, session_notes: updated };
            setSelectedAssignment(updatedAssignment);
            setAssignments(prev => prev.map(a => a.id === selectedAssignment.id ? updatedAssignment : a));
            setNewNote('');
        } catch (e) {
            console.error(e);
        } finally {
            setAddingNote(false);
        }
    };

    const filtered = assignments.filter(a => {
        const q = search.toLowerCase();
        return (
            (a.member_name || '').toLowerCase().includes(q) ||
            (a.member_email || '').toLowerCase().includes(q) ||
            (a.manager_name || '').toLowerCase().includes(q)
        );
    });

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">Account Manager Assignments</h1>
                    <p className="text-[var(--text-soft)] mt-1">Manage member-to-account-manager relationships</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
                        const count = assignments.filter(a => a.status === status).length;
                        const Icon = cfg.icon;
                        return (
                            <div key={status} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon className="w-4 h-4 text-[var(--text-soft)]" />
                                    <span className="text-xs text-[var(--text-soft)] font-medium">{cfg.label}</span>
                                </div>
                                <p className="text-2xl font-bold text-[var(--text-main)]">{count}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search members or managers..."
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-gold)]"
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                                {filtered.length === 0 ? (
                                    <div className="p-6 text-center">
                                        <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-[var(--text-soft)]">No assignments yet.</p>
                                    </div>
                                ) : filtered.map(a => {
                                    const cfg = STATUS_CONFIG[a.status] || STATUS_CONFIG.pending;
                                    const Icon = cfg.icon;
                                    return (
                                        <button
                                            key={a.id}
                                            onClick={() => setSelectedAssignment(a)}
                                            className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedAssignment?.id === a.id ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-[var(--text-main)] text-sm truncate">{a.member_name}</p>
                                                    <p className="text-xs text-[var(--text-soft)] truncate">{a.member_email}</p>
                                                    <p className="text-xs text-[var(--primary-gold)] mt-0.5">→ {a.manager_name || 'Unassigned'}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 flex-shrink-0 ${cfg.color}`}>
                                                    <Icon className="w-3 h-3" /> {cfg.label}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Detail */}
                    <div className="lg:col-span-3">
                        {!selectedAssignment ? (
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center h-full flex flex-col items-center justify-center">
                                <UserCheck className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-[var(--text-soft)]">Select an assignment to view details</p>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-[var(--text-main)] text-lg">{selectedAssignment.member_name}</h3>
                                            <p className="text-sm text-[var(--text-soft)]">{selectedAssignment.member_email}</p>
                                            <p className="text-sm text-[var(--primary-gold)] mt-1">Manager: {selectedAssignment.manager_name} · {selectedAssignment.manager_title}</p>
                                            {selectedAssignment.next_session_date && (
                                                <p className="text-xs text-[var(--text-soft)] mt-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> Next session: {new Date(selectedAssignment.next_session_date).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                        {/* Status changer */}
                                        <div className="relative">
                                            <select
                                                value={selectedAssignment.status}
                                                onChange={e => handleStatusChange(selectedAssignment.id, e.target.value)}
                                                disabled={!!savingStatus}
                                                className="form-input text-sm pr-8"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="paused">Paused</option>
                                                <option value="ended">Ended</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Goals */}
                                {selectedAssignment.member_goals && (
                                    <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                                        <h4 className="font-semibold text-[var(--text-main)] mb-2 text-sm">Member Goals</h4>
                                        <p className="text-sm text-[var(--text-soft)] leading-relaxed">{selectedAssignment.member_goals}</p>
                                    </div>
                                )}

                                {/* Session Notes */}
                                <div className="p-5">
                                    <h4 className="font-semibold text-[var(--text-main)] mb-3 text-sm flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-purple-500" /> Session Notes
                                    </h4>

                                    <div className="space-y-2 mb-4">
                                        <textarea
                                            value={newNote}
                                            onChange={e => setNewNote(e.target.value)}
                                            placeholder="Add a session note..."
                                            rows={3}
                                            className="form-input w-full text-sm resize-none"
                                        />
                                        <button
                                            onClick={handleAddNote}
                                            disabled={!newNote.trim() || addingNote}
                                            className="btn btn-primary text-sm disabled:opacity-50"
                                        >
                                            {addingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                            Add Note
                                        </button>
                                    </div>

                                    <div className="space-y-2 max-h-72 overflow-y-auto">
                                        {(selectedAssignment.session_notes || []).length === 0 ? (
                                            <p className="text-sm text-[var(--text-soft)] text-center py-3">No notes yet.</p>
                                        ) : [...(selectedAssignment.session_notes || [])].reverse().map(note => (
                                            <div key={note.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs font-semibold text-[var(--primary-gold)]">{note.author_name}</span>
                                                    <span className="text-xs text-[var(--text-soft)]">{note.date}</span>
                                                </div>
                                                <p className="text-sm text-[var(--text-main)]">{note.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}