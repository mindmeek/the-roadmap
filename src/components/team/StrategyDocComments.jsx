import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { MessageSquare, Send, CheckCircle2, Loader2, Trash2, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const REACTIONS = ['👍', '💡', '✅', '🔥', '❓'];

export default function StrategyDocComments({ documentId, documentType, businessId }) {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [section, setSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [filterResolved, setFilterResolved] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        loadData();
    }, [documentId]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [userData, commentsData] = await Promise.all([
                base44.auth.me(),
                base44.entities.StrategyDocumentComment.filter({ document_id: documentId }, 'created_date', 50)
            ]);
            setUser(userData);
            setComments(commentsData);

            // Load team members if businessId is provided
            if (businessId) {
                const members = await base44.entities.TeamMember.filter({ business_id: businessId });
                setTeamMembers(members);
            }
        } catch (err) {
            console.error('Error loading comments:', err);
        } finally {
            setLoading(false);
        }
    };

    const getAuthorColor = (email) => {
        const member = teamMembers.find(m => m.email === email);
        if (member?.assigned_color) return member.assigned_color;
        // Generate consistent color from email
        let hash = 0;
        for (let i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];
        return colors[Math.abs(hash) % colors.length];
    };

    const handlePost = async () => {
        if (!newComment.trim()) return;
        setPosting(true);
        try {
            const trimmedComment = newComment.trim();
            const trimmedSection = section.trim() || null;
            const comment = await base44.entities.StrategyDocumentComment.create({
                document_id: documentId,
                document_type: documentType,
                business_id: businessId || '',
                author_email: user.email,
                author_name: user.full_name || user.email,
                author_color: getAuthorColor(user.email),
                content: trimmedComment,
                section: trimmedSection,
                is_resolved: false,
                reactions: []
            });
            setComments(prev => [...prev, comment]);
            setNewComment('');
            setSection('');
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

            // Notify team members (fire and forget)
            if (businessId) {
                base44.functions.invoke('notifyTeamComment', {
                    document_id: documentId,
                    document_type: documentType,
                    business_id: businessId,
                    comment_content: trimmedComment,
                    section: trimmedSection,
                    author_name: user.full_name || user.email
                }).catch(err => console.error('Notification failed:', err));
            }
        } catch (err) {
            console.error('Error posting comment:', err);
        } finally {
            setPosting(false);
        }
    };

    const handleResolve = async (comment) => {
        try {
            const updated = await base44.entities.StrategyDocumentComment.update(comment.id, { is_resolved: !comment.is_resolved });
            setComments(prev => prev.map(c => c.id === comment.id ? { ...c, is_resolved: updated.is_resolved } : c));
        } catch (err) {
            console.error('Error resolving comment:', err);
        }
    };

    const handleReact = async (comment, emoji) => {
        const reactions = comment.reactions || [];
        const existing = reactions.find(r => r.emoji === emoji && r.user_email === user.email);
        const updatedReactions = existing
            ? reactions.filter(r => !(r.emoji === emoji && r.user_email === user.email))
            : [...reactions, { emoji, user_email: user.email }];
        try {
            await base44.entities.StrategyDocumentComment.update(comment.id, { reactions: updatedReactions });
            setComments(prev => prev.map(c => c.id === comment.id ? { ...c, reactions: updatedReactions } : c));
        } catch (err) {
            console.error('Error reacting:', err);
        }
    };

    const handleDelete = async (commentId) => {
        if (!confirm('Delete this comment?')) return;
        try {
            await base44.entities.StrategyDocumentComment.delete(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    const getReactionCounts = (reactions = []) => {
        const counts = {};
        reactions.forEach(r => {
            counts[r.emoji] = (counts[r.emoji] || 0) + 1;
        });
        return counts;
    };

    const filtered = filterResolved ? comments.filter(c => !c.is_resolved) : comments;
    const unresolvedCount = comments.filter(c => !c.is_resolved).length;

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[var(--primary-gold)]" />
                    <h3 className="font-bold text-[var(--text-main)]">Team Feedback</h3>
                    {unresolvedCount > 0 && (
                        <span className="bg-[var(--primary-gold)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {unresolvedCount}
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setFilterResolved(!filterResolved)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                        filterResolved
                            ? 'bg-[var(--primary-gold)] text-white border-[var(--primary-gold)]'
                            : 'border-gray-300 dark:border-gray-600 text-[var(--text-soft)] hover:border-[var(--primary-gold)]'
                    }`}
                >
                    {filterResolved ? 'Showing Open' : 'Show Open Only'}
                </button>
            </div>

            {/* Comments List */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900">
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <p className="text-[var(--text-soft)] text-sm">
                            {filterResolved ? 'All comments are resolved!' : 'No comments yet. Be the first to leave feedback!'}
                        </p>
                    </div>
                ) : (
                    filtered.map(comment => {
                        const isOwn = comment.author_email === user?.email;
                        const reactionCounts = getReactionCounts(comment.reactions);
                        return (
                            <div
                                key={comment.id}
                                className={`rounded-lg p-3 border transition-all ${
                                    comment.is_resolved
                                        ? 'opacity-60 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        {/* Avatar */}
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                                            style={{ backgroundColor: comment.author_color || getAuthorColor(comment.author_email) }}
                                        >
                                            {(comment.author_name || comment.author_email).charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-sm text-[var(--text-main)]">
                                                    {comment.author_name || comment.author_email}
                                                </span>
                                                {comment.section && (
                                                    <span className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                                        <Tag className="w-2.5 h-2.5" />{comment.section}
                                                    </span>
                                                )}
                                                {comment.is_resolved && (
                                                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Resolved
                                                    </span>
                                                )}
                                                <span className="text-xs text-[var(--text-soft)]">
                                                    {formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[var(--text-main)] mt-1 leading-relaxed break-words">
                                                {comment.content}
                                            </p>

                                            {/* Reactions */}
                                            <div className="flex items-center gap-1 mt-2 flex-wrap">
                                                {REACTIONS.map(emoji => {
                                                    const count = reactionCounts[emoji] || 0;
                                                    const userReacted = (comment.reactions || []).some(
                                                        r => r.emoji === emoji && r.user_email === user?.email
                                                    );
                                                    return (
                                                        <button
                                                            key={emoji}
                                                            onClick={() => handleReact(comment, emoji)}
                                                            className={`text-sm px-1.5 py-0.5 rounded-full border transition-colors ${
                                                                userReacted
                                                                    ? 'bg-[var(--primary-gold)]/10 border-[var(--primary-gold)]'
                                                                    : 'border-gray-200 dark:border-gray-600 hover:border-[var(--primary-gold)]'
                                                            }`}
                                                        >
                                                            {emoji}{count > 0 && <span className="ml-0.5 text-xs text-[var(--text-soft)]">{count}</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button
                                            onClick={() => handleResolve(comment)}
                                            title={comment.is_resolved ? 'Reopen' : 'Mark resolved'}
                                            className={`p-1.5 rounded-md transition-colors ${
                                                comment.is_resolved
                                                    ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                                                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                                            }`}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        {isOwn && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* New Comment Input */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <input
                    type="text"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    placeholder="Section (optional, e.g. 'Strengths', 'Goals')"
                    className="w-full text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)]"
                />
                <div className="flex gap-2">
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handlePost(); }}
                        placeholder="Leave feedback for your team... (Ctrl+Enter to post)"
                        rows={2}
                        className="flex-1 text-sm px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] resize-none"
                    />
                    <button
                        onClick={handlePost}
                        disabled={!newComment.trim() || posting}
                        className="btn btn-primary px-4 self-end disabled:opacity-50"
                    >
                        {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}