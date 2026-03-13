import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const User = base44.entities.User;
const AccountManagerAssignment = base44.entities.AccountManagerAssignment;
import {
    UserCheck, Users, Briefcase, MessageSquare, Plus, Check,
    Clock, Calendar, ChevronRight, Star, Loader2, X, Edit3, Save
} from 'lucide-react';

// Our team members that can be account managers
const TEAM_MEMBERS = [
    {
        name: "Elyzet",
        title: "Lead Business Strategist",
        email: "elyzet@thebminds.com",
        bio: "Specializes in brand identity, vision clarity, and startup growth strategies.",
        avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png",
        specialties: ["Brand Strategy", "Vision & Mission", "Content Strategy"]
    },
    {
        name: "Strategy Coach",
        title: "Growth & Marketing Advisor",
        email: "strategy@thebminds.com",
        bio: "Expert in scaling businesses, affiliate programs, and digital marketing systems.",
        avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png",
        specialties: ["Growth Strategy", "Marketing Systems", "Affiliate Programs"]
    },
    {
        name: "Operations Advisor",
        title: "Business Systems Specialist",
        email: "ops@thebminds.com",
        bio: "Helps entrepreneurs build automated systems, SOPs, and scalable operations.",
        avatar: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png",
        specialties: ["Automation", "SOPs", "Partnerships"]
    }
];

export default function AccountManager() {
    const [user, setUser] = useState(null);
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const [memberGoals, setMemberGoals] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [addingNote, setAddingNote] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [editingNextSession, setEditingNextSession] = useState(false);
    const [nextSessionDate, setNextSessionDate] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await base44.auth.me();
            setUser(userData);
            const assignments = await AccountManagerAssignment.filter({ member_email: userData.email });
            const active = assignments.find(a => a.status !== 'ended');
            if (active) {
                setAssignment(active);
                setNextSessionDate(active.next_session_date || '');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestManager = async () => {
        if (!selectedManager || !memberGoals.trim()) return;
        setSubmitting(true);
        try {
            const created = await AccountManagerAssignment.create({
                member_email: user.email,
                member_name: user.full_name,
                manager_email: selectedManager.email,
                manager_name: selectedManager.name,
                manager_title: selectedManager.title,
                manager_profile_picture_url: selectedManager.avatar,
                status: 'pending',
                member_goals: memberGoals,
                session_notes: []
            });
            setAssignment(created);
            setShowRequestForm(false);
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddSessionNote = async () => {
        if (!newNote.trim()) return;
        setAddingNote(true);
        try {
            const note = {
                id: crypto.randomUUID(),
                date: new Date().toISOString().split('T')[0],
                content: newNote,
                author_name: user.full_name,
                author_email: user.email
            };
            const updatedNotes = [...(assignment.session_notes || []), note];
            await AccountManagerAssignment.update(assignment.id, { session_notes: updatedNotes });
            setAssignment({ ...assignment, session_notes: updatedNotes });
            setNewNote('');
        } catch (e) {
            console.error(e);
        } finally {
            setAddingNote(false);
        }
    };

    const handleSaveNextSession = async () => {
        await AccountManagerAssignment.update(assignment.id, { next_session_date: nextSessionDate });
        setAssignment({ ...assignment, next_session_date: nextSessionDate });
        setEditingNextSession(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    // Active assignment view
    if (assignment) {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            paused: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        };

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">My Account Manager</h1>
                        <p className="text-[var(--text-soft)] mt-1">Your dedicated business growth partner</p>
                    </div>

                    {/* Manager Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 mb-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <img
                                src={assignment.manager_profile_picture_url}
                                alt={assignment.manager_name}
                                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h2 className="text-xl font-bold text-[var(--text-main)]">{assignment.manager_name}</h2>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[assignment.status] || statusColors.pending}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                                <p className="text-[var(--primary-gold)] font-medium text-sm mb-1">{assignment.manager_title}</p>
                                <p className="text-sm text-[var(--text-soft)]">{assignment.manager_email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Your Goals */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 mb-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Star className="w-4 h-4 text-[var(--primary-gold)]" /> My Session Goals
                        </h3>
                        <p className="text-sm text-[var(--text-soft)] leading-relaxed">{assignment.member_goals || 'No goals specified.'}</p>
                    </div>

                    {/* Next Session */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-500" /> Next Strategy Session
                            </h3>
                            <button
                                onClick={() => setEditingNextSession(!editingNextSession)}
                                className="text-xs text-[var(--primary-gold)] hover:underline flex items-center gap-1"
                            >
                                <Edit3 className="w-3 h-3" /> Edit
                            </button>
                        </div>
                        {editingNextSession ? (
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={nextSessionDate}
                                    onChange={(e) => setNextSessionDate(e.target.value)}
                                    className="form-input flex-1 text-sm"
                                />
                                <button
                                    onClick={handleSaveNextSession}
                                    className="btn btn-primary text-sm px-3 py-2"
                                >
                                    <Save className="w-4 h-4" />
                                </button>
                            </div>
                        ) : assignment.next_session_date ? (
                            <p className="text-sm font-semibold text-[var(--text-main)]">
                                {new Date(assignment.next_session_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        ) : (
                            <p className="text-sm text-[var(--text-soft)]">No session scheduled yet. Click Edit to add one.</p>
                        )}
                    </div>

                    {/* Session Notes */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
                        <h3 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-purple-500" /> Session Notes
                        </h3>

                        {/* Add note */}
                        <div className="mb-4 space-y-2">
                            <textarea
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add a note from your strategy session..."
                                rows={3}
                                className="form-input w-full text-sm resize-none"
                            />
                            <button
                                onClick={handleAddSessionNote}
                                disabled={!newNote.trim() || addingNote}
                                className="btn btn-primary text-sm disabled:opacity-50"
                            >
                                {addingNote ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Add Note
                            </button>
                        </div>

                        {/* Notes list */}
                        {(assignment.session_notes || []).length === 0 ? (
                            <p className="text-sm text-[var(--text-soft)] text-center py-4">No session notes yet. Add notes during or after your strategy sessions.</p>
                        ) : (
                            <div className="space-y-3">
                                {[...(assignment.session_notes || [])].reverse().map(note => (
                                    <div key={note.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-[var(--primary-gold)]">{note.author_name}</span>
                                            <span className="text-xs text-[var(--text-soft)]">{note.date}</span>
                                        </div>
                                        <p className="text-sm text-[var(--text-main)] leading-relaxed">{note.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Request form
    if (showRequestForm) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                    <button onClick={() => setShowRequestForm(false)} className="flex items-center gap-2 text-sm text-[var(--text-soft)] mb-6 hover:text-[var(--text-main)]">
                        <X className="w-4 h-4" /> Cancel
                    </button>
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Choose Your Account Manager</h2>
                    <p className="text-[var(--text-soft)] mb-6">Select a team member to guide you through your strategy sessions.</p>

                    {/* Team member selection */}
                    <div className="space-y-3 mb-6">
                        {TEAM_MEMBERS.map(member => (
                            <button
                                key={member.email}
                                onClick={() => setSelectedManager(member)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                    selectedManager?.email === member.email
                                        ? 'border-[var(--primary-gold)] bg-[var(--primary-gold)]/5'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-[var(--text-main)]">{member.name}</h3>
                                            {selectedManager?.email === member.email && (
                                                <Check className="w-4 h-4 text-[var(--primary-gold)]" />
                                            )}
                                        </div>
                                        <p className="text-xs text-[var(--primary-gold)] font-medium mb-1">{member.title}</p>
                                        <p className="text-xs text-[var(--text-soft)]">{member.bio}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {member.specialties.map(s => (
                                                <span key={s} className="text-xs bg-gray-100 dark:bg-gray-700 text-[var(--text-soft)] px-2 py-0.5 rounded-full">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Goals input */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-6">
                        <label className="block font-semibold text-[var(--text-main)] mb-2">What do you want to achieve in your strategy sessions?</label>
                        <textarea
                            value={memberGoals}
                            onChange={(e) => setMemberGoals(e.target.value)}
                            placeholder="e.g. I want to build my brand identity, grow my email list, and develop a 90-day marketing plan..."
                            rows={4}
                            className="form-input w-full resize-none text-sm"
                        />
                    </div>

                    <button
                        onClick={handleRequestManager}
                        disabled={!selectedManager || !memberGoals.trim() || submitting}
                        className="w-full btn btn-primary py-3 font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserCheck className="w-5 h-5" />}
                        Request Account Manager
                    </button>
                </div>
            </div>
        );
    }

    // Landing / no assignment
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
                {/* Hero */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="h-2 bg-[var(--primary-gold)]"></div>
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-[var(--primary-gold)]/10 rounded-xl">
                                <UserCheck className="w-8 h-8 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">Account Manager</h1>
                                <p className="text-[var(--text-soft)] text-sm">Your personal business growth partner</p>
                            </div>
                        </div>
                        <p className="text-[var(--text-soft)] leading-relaxed mb-6">
                            Get a dedicated team member assigned to your account who will work with you one-on-one during strategy sessions. 
                            They'll have access to your business profile, strategy documents, and progress to provide personalized guidance.
                        </p>

                        <div className="grid sm:grid-cols-3 gap-4 mb-8">
                            {[
                                { icon: Users, title: "Dedicated Support", desc: "A real team member focused on your growth" },
                                { icon: Briefcase, title: "Strategy Sessions", desc: "Regular 1-on-1 sessions to work through your goals" },
                                { icon: ChevronRight, title: "Account Access", desc: "They can review your strategy docs and progress" },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <Icon className="w-5 h-5 text-[var(--primary-gold)] mb-2" />
                                    <h4 className="font-semibold text-[var(--text-main)] text-sm mb-1">{title}</h4>
                                    <p className="text-xs text-[var(--text-soft)]">{desc}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowRequestForm(true)}
                            className="w-full btn btn-primary py-3 font-bold text-base"
                        >
                            <UserCheck className="w-5 h-5" />
                            Request an Account Manager
                        </button>
                    </div>
                </div>

                {/* Team preview */}
                <h2 className="text-lg font-bold text-[var(--text-main)] mb-3">Meet The Team</h2>
                <div className="space-y-3">
                    {TEAM_MEMBERS.map(member => (
                        <div key={member.email} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
                            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-[var(--text-main)] text-sm">{member.name}</h3>
                                <p className="text-xs text-[var(--primary-gold)]">{member.title}</p>
                                <p className="text-xs text-[var(--text-soft)] mt-0.5 truncate">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}