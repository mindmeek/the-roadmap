import React, { useState, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, History, Save, Share2, FileText, Copy, Check, Plus, Edit2, Trash2, Star, MessageSquare, StickyNote } from 'lucide-react';
import { aiTeamAssistant } from '@/functions/aiTeamAssistant';
import { AIConversation, AIAssistantNote, User } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ReactMarkdown from 'react-markdown';

// AI Team Member Details (matching backend)
const AI_TEAM_INFO = {
    elyzet: {
        name: "Elyzet",
        role: "Chief Strategist",
        avatar: "👔",
        color: "from-indigo-500 to-purple-600",
        description: "Strategic guidance for your business vision and planning"
    },
    ava: {
        name: "Ava",
        role: "Marketing Strategist", 
        avatar: "🎯",
        color: "from-pink-500 to-rose-600",
        description: "Marketing strategy and customer acquisition expertise"
    },
    sam: {
        name: "Sam",
        role: "Social Media Guru",
        avatar: "📱",
        color: "from-blue-500 to-cyan-600",
        description: "Social media strategy and content creation"
    },
    charlie: {
        name: "Charlie",
        role: "Content Copywriter",
        avatar: "✍️",
        color: "from-yellow-500 to-orange-600",
        description: "Expert copywriting for all your business content needs"
    },
    finley: {
        name: "Finley",
        role: "Financial Forecaster",
        avatar: "💰",
        color: "from-green-500 to-emerald-600",
        description: "Financial planning and pricing strategy"
    },
    olivia: {
        name: "Olivia",
        role: "Operations Optimizer",
        avatar: "⚙️",
        color: "from-orange-500 to-amber-600",
        description: "Business operations and systems optimization"
    }
};

export default function AITeamModal({ 
    isOpen, 
    onClose, 
    assistantType = 'elyzet',
    sectionTitle = '',
    userNotes = [],
    additionalContext = '',
    conversationId = null,
    currentBusinessId = null,
    selectedChannels = []
}) {
    const [userPrompt, setUserPrompt] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState(conversationId);
    const [isSaving, setIsSaving] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [conversationSummary, setConversationSummary] = useState('');
    const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);
    
    // Notes state
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'notes'
    const [notes, setNotes] = useState([]);
    const [isCreatingNote, setIsCreatingNote] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [noteFormData, setNoteFormData] = useState({ title: '', content: '' });
    const [savingNoteId, setSavingNoteId] = useState(null);

    const navigate = useNavigate();
    const assistant = AI_TEAM_INFO[assistantType];

    // Load existing conversation if conversationId is provided
    useEffect(() => {
        if (conversationId) {
            loadConversation(conversationId);
        }
    }, [conversationId]);

    // Load notes when conversation changes
    useEffect(() => {
        if (currentConversationId) {
            loadNotes();
        }
    }, [currentConversationId]);

    const loadConversation = async (id) => {
        try {
            const conv = await AIConversation.filter({ id });
            if (conv.length > 0) {
                setConversation(conv[0].messages);
                setCurrentConversationId(id);
                setConversationSummary(conv[0].summary || '');
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    const loadNotes = async () => {
        try {
            const fetchedNotes = await AIAssistantNote.filter(
                { 
                    conversation_id: currentConversationId,
                    assistant_type: assistantType 
                },
                '-created_date'
            );
            setNotes(fetchedNotes);
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    };

    const saveConversation = async (messages) => {
        setIsSaving(true);
        try {
            const conversationData = {
                assistant_type: assistantType,
                title: messages[0]?.content?.substring(0, 50) || 'Conversation',
                messages: messages,
                context: {
                    section_title: sectionTitle,
                    additional_context: additionalContext,
                    notes_count: userNotes.length
                },
                last_message_at: new Date().toISOString()
            };

            if (currentConversationId) {
                await AIConversation.update(currentConversationId, conversationData);
            } else {
                const newConv = await AIConversation.create(conversationData);
                setCurrentConversationId(newConv.id);
                
                // Update user AI usage stats
                await updateAIUsageStats(assistantType);
            }
        } catch (error) {
            console.error('Error saving conversation:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const updateAIUsageStats = async (assistantType) => {
        try {
            const user = await User.me();
            const stats = user.ai_usage_stats || {
                total_conversations: 0,
                conversations_by_assistant: {},
                total_messages_sent: 0,
                most_used_assistant: '',
                last_used_at: null
            };

            stats.total_conversations = (stats.total_conversations || 0) + 1;
            stats.conversations_by_assistant = stats.conversations_by_assistant || {};
            stats.conversations_by_assistant[assistantType] = (stats.conversations_by_assistant[assistantType] || 0) + 1;
            stats.last_used_at = new Date().toISOString();

            // Find most used assistant
            const assistantCounts = stats.conversations_by_assistant;
            const mostUsed = Object.keys(assistantCounts).reduce((a, b) => 
                assistantCounts[a] > assistantCounts[b] ? a : b
            );
            stats.most_used_assistant = mostUsed;

            await User.updateMyUserData({ ai_usage_stats: stats });
        } catch (error) {
            console.error('Error updating AI usage stats:', error);
        }
    };

    const generateSummary = async () => {
        if (conversation.length < 2) return;

        try {
            const conversationText = conversation.map(m => 
                `${m.role === 'user' ? 'User' : assistant.name}: ${m.content}`
            ).join('\n\n');

            const summaryPrompt = `Please provide a brief 2-3 sentence summary of this business conversation:

${conversationText}

Summary:`;

            const response = await aiTeamAssistant({
                assistant_type: 'elyzet',
                user_prompt: summaryPrompt,
                context: {},
                user_notes: [],
                current_business_id: currentBusinessId
            });

            if (response.data.success) {
                const summary = response.data.response;
                setConversationSummary(summary);
                
                // Save summary to database
                if (currentConversationId) {
                    await AIConversation.update(currentConversationId, { summary });
                }
            }
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };

    const handleCopyMessage = async (content, index) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedMessageIndex(index);
            setTimeout(() => setCopiedMessageIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userPrompt.trim() || isLoading) return;

        // Add user message to conversation
        const userMessage = { 
            role: 'user', 
            content: userPrompt,
            timestamp: new Date().toISOString()
        };
        const updatedConversation = [...conversation, userMessage];
        setConversation(updatedConversation);
        setUserPrompt('');
        setIsLoading(true);

        // Update message count in stats
        try {
            const user = await User.me();
            const stats = user.ai_usage_stats || {};
            stats.total_messages_sent = (stats.total_messages_sent || 0) + 1;
            await User.updateMyUserData({ ai_usage_stats: stats });
        } catch (error) {
            console.error('Error updating message stats:', error);
        }

        try {
            // Build enhanced context for Ava if channels are selected
            let enhancedContext = additionalContext;
            if (selectedChannels.length > 0 && assistantType === 'ava') {
                enhancedContext += `\n\nSelected Marketing Channels: ${selectedChannels.join(', ')}`;
                enhancedContext += `\n\nPLEASE CREATE A COMPREHENSIVE MARKETING PLAN that includes:
For EACH selected channel (${selectedChannels.join(', ')}), provide:
1. Channel-Specific Strategy (how to use this channel for this business)
2. Content Calendar Ideas (what to post/send and when)
3. Ad Copy Examples (where relevant - headlines, body copy, CTAs)
4. Key Performance Indicators (KPIs to track success)

Make the plan actionable, specific to this business, and organized by channel.`;
            }

            const result = await aiTeamAssistant({
                assistant_type: assistantType,
                user_prompt: userPrompt,
                context: {
                    section_title: sectionTitle,
                    additional_context: enhancedContext
                },
                user_notes: userNotes,
                current_business_id: currentBusinessId
            });

            if (result.data.success && result.data.response) {
                const assistantMessage = {
                    role: 'assistant',
                    content: result.data.response,
                    timestamp: new Date().toISOString(),
                    assistant: result.data.assistant
                };
                const finalConversation = [...updatedConversation, assistantMessage];
                setConversation(finalConversation);
                
                // Auto-save conversation
                await saveConversation(finalConversation);
            } else {
                // Handle case where response is missing or success is false
                const errorMessage = {
                    role: 'error',
                    content: result.data.error || 'Sorry, I encountered an error. Please try again.',
                    timestamp: new Date().toISOString()
                };
                setConversation([...updatedConversation, errorMessage]);
            }
        } catch (error) {
            console.error('Error calling AI assistant:', error);
            const errorMessage = {
                role: 'error',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toISOString()
            };
            setConversation([...updatedConversation, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Notes functions
    const handleCreateNote = () => {
        setIsCreatingNote(true);
        setEditingNoteId(null);
        setNoteFormData({ title: '', content: '' });
    };

    const handleEditNote = (note) => {
        setEditingNoteId(note.id);
        setIsCreatingNote(false);
        setNoteFormData({ title: note.title, content: note.content });
    };

    const handleSaveNote = async () => {
        if (!noteFormData.title.trim() || !noteFormData.content.trim()) return;
        
        setSavingNoteId(editingNoteId || 'new');
        try {
            if (editingNoteId) {
                // Update existing note
                await AIAssistantNote.update(editingNoteId, noteFormData);
            } else {
                // Create new note
                await AIAssistantNote.create({
                    conversation_id: currentConversationId,
                    assistant_type: assistantType,
                    title: noteFormData.title,
                    content: noteFormData.content
                });
            }
            
            // Reload notes
            await loadNotes();
            
            // Reset form
            setIsCreatingNote(false);
            setEditingNoteId(null);
            setNoteFormData({ title: '', content: '' });
        } catch (error) {
            console.error('Error saving note:', error);
        } finally {
            setSavingNoteId(null);
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (!confirm('Are you sure you want to delete this note?')) return;
        
        try {
            await AIAssistantNote.delete(noteId);
            await loadNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleToggleFavorite = async (note) => {
        try {
            await AIAssistantNote.update(note.id, { is_favorite: !note.is_favorite });
            await loadNotes();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleCancelNoteEdit = () => {
        setIsCreatingNote(false);
        setEditingNoteId(null);
        setNoteFormData({ title: '', content: '' });
    };

    // Handle platform navigation links
    const handlePlatformLink = (href) => {
        if (href && href.startsWith('/')) {
            onClose(); // Close the modal
            navigate(createPageUrl(href.substring(1))); // Navigate to the page
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${assistant.color} text-white`}>
                    <div className="flex items-center gap-3">
                        <div className="text-4xl">{assistant.avatar}</div>
                        <div>
                            <h3 className="text-xl font-bold">{assistant.name}</h3>
                            <p className="text-sm opacity-90">{assistant.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {conversation.length >= 4 && !conversationSummary && (
                            <button
                                onClick={generateSummary}
                                className="text-white hover:bg-white/20 px-3 py-1 rounded text-sm flex items-center gap-1"
                                title="Generate Summary"
                            >
                                <FileText className="w-4 h-4" />
                                <span className="hidden sm:inline">Summary</span>
                            </button>
                        )}
                        {currentConversationId && (
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="text-white hover:bg-white/20 px-3 py-1 rounded text-sm flex items-center gap-1"
                                title="Share Conversation"
                            >
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                        )}
                        {isSaving && (
                            <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span className="hidden sm:inline">Saving...</span>
                            </div>
                        )}
                        <button 
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'chat'
                                ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)] bg-white dark:bg-gray-800'
                                : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'
                        }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                            activeTab === 'notes'
                                ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)] bg-white dark:bg-gray-800'
                                : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'
                        }`}
                    >
                        <StickyNote className="w-4 h-4" />
                        Notes {notes.length > 0 && `(${notes.length})`}
                    </button>
                </div>

                {/* Context Info */}
                {sectionTitle && activeTab === 'chat' && (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-[var(--text-soft)]">
                            <span className="font-semibold">Working on:</span> {sectionTitle}
                        </p>
                        {userNotes.length > 0 && (
                            <p className="text-xs text-[var(--text-soft)] mt-1">
                                {assistant.name} can see your {userNotes.length} note{userNotes.length !== 1 ? 's' : ''} for context
                            </p>
                        )}
                    </div>
                )}

                {/* Conversation Summary */}
                {conversationSummary && activeTab === 'chat' && (
                    <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700">
                        <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">
                                    Conversation Summary:
                                </p>
                                <p className="text-xs text-blue-800 dark:text-blue-200">
                                    {conversationSummary}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat Tab Content */}
                {activeTab === 'chat' && (
                    <>
                        {/* Conversation Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {conversation.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">{assistant.avatar}</div>
                                    <h4 className="text-lg font-semibold text-[var(--text-main)] mb-2">
                                        Hi! I'm {assistant.name}
                                    </h4>
                                    <p className="text-sm text-[var(--text-soft)] max-w-md mx-auto">
                                        {assistant.description}
                                    </p>
                                    <p className="text-xs text-[var(--text-soft)] mt-4">
                                        Ask me anything about {sectionTitle || 'your business'}!
                                    </p>
                                </div>
                            ) : (
                                conversation.map((message, index) => (
                                    <div 
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="flex items-start gap-2 max-w-[80%] group">
                                                <div className="text-2xl flex-shrink-0">{assistant.avatar}</div>
                                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 relative">
                                                    <ReactMarkdown
                                                        className="text-sm text-[var(--text-main)] prose prose-sm dark:prose-invert max-w-none"
                                                        components={{
                                                            a: ({ node, href, children, ...props }) => {
                                                                // Check if it's a platform link
                                                                if (href && href.startsWith('/')) {
                                                                    return (
                                                                        <button
                                                                            onClick={() => handlePlatformLink(href)}
                                                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium inline-flex items-center gap-1"
                                                                            {...props}
                                                                        >
                                                                            {children}
                                                                            <span className="text-xs">→</span>
                                                                        </button>
                                                                    );
                                                                }
                                                                // External links
                                                                return (
                                                                    <a 
                                                                        href={href} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                                                                        {...props}
                                                                    >
                                                                        {children}
                                                                    </a>
                                                                );
                                                            },
                                                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                            ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
                                                            ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
                                                            li: ({ children }) => <li className="mb-1">{children}</li>,
                                                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                            code: ({ inline, children }) => 
                                                                inline ? (
                                                                    <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs">
                                                                        {children}
                                                                    </code>
                                                                ) : (
                                                                    <code className="block bg-gray-200 dark:bg-gray-600 p-2 rounded my-2 text-xs">
                                                                        {children}
                                                                    </code>
                                                                )
                                                        }}
                                                    >
                                                        {message.content}
                                                    </ReactMarkdown>
                                                    <button
                                                        onClick={() => handleCopyMessage(message.content, index)}
                                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-600 p-1 rounded shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500"
                                                        title="Copy message"
                                                    >
                                                        {copiedMessageIndex === index ? (
                                                            <Check className="w-3 h-3 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        {message.role === 'user' && (
                                            <div className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white rounded-lg p-3 max-w-[80%] group relative">
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                <button
                                                    onClick={() => handleCopyMessage(message.content, index)}
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 p-1 rounded hover:bg-white/30"
                                                    title="Copy message"
                                                >
                                                    {copiedMessageIndex === index ? (
                                                        <Check className="w-3 h-3 text-white" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 text-white" />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                        {message.role === 'error' && (
                                            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg p-3 max-w-[80%]">
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                                        <div className="text-2xl">{assistant.avatar}</div>
                                        <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-gold)]" />
                                        <span className="text-sm text-[var(--text-soft)]">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e.target.value)}
                                    placeholder={`Ask ${assistant.name} for help...`}
                                    className="form-input flex-1"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!userPrompt.trim() || isLoading}
                                    className="btn btn-primary px-6"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </button>
                            </form>
                            <p className="text-xs text-[var(--text-soft)] mt-2 text-center">
                                {assistant.name} uses AI • Conversations auto-saved • Switch to Notes tab to capture insights
                            </p>
                        </div>
                    </>
                )}

                {/* Notes Tab Content */}
                {activeTab === 'notes' && (
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Header with Add Button */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-main)]">Your Notes</h3>
                                <p className="text-xs text-[var(--text-soft)]">
                                    Capture key insights, action items, and important takeaways from your conversation
                                </p>
                            </div>
                            {!isCreatingNote && !editingNoteId && (
                                <button
                                    onClick={handleCreateNote}
                                    className="btn btn-primary btn-sm"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    New Note
                                </button>
                            )}
                        </div>

                        {/* Create/Edit Note Form */}
                        {(isCreatingNote || editingNoteId) && (
                            <div className="card p-4 mb-4 border-2 border-[var(--primary-gold)]">
                                <input
                                    type="text"
                                    value={noteFormData.title}
                                    onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
                                    placeholder="Note title..."
                                    className="form-input mb-2 font-semibold"
                                />
                                <textarea
                                    value={noteFormData.content}
                                    onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
                                    placeholder="Write your note here... (Tip: Use the copy button in chat to paste AI responses)"
                                    className="form-input h-32 mb-3 resize-none"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleCancelNoteEdit}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveNote}
                                        disabled={!noteFormData.title.trim() || !noteFormData.content.trim() || savingNoteId}
                                        className="btn btn-primary btn-sm"
                                    >
                                        {savingNoteId ? (
                                            <>
                                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-3 h-3 mr-1" />
                                                {editingNoteId ? 'Update' : 'Save'} Note
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notes List */}
                        {notes.length === 0 ? (
                            <div className="text-center py-12">
                                <StickyNote className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p className="text-[var(--text-soft)] mb-2">No notes yet</p>
                                <p className="text-xs text-[var(--text-soft)] mb-4">
                                    Create notes to capture important insights from your conversation with {assistant.name}
                                </p>
                                {!isCreatingNote && (
                                    <button onClick={handleCreateNote} className="btn btn-primary btn-sm">
                                        <Plus className="w-4 h-4 mr-1" />
                                        Create Your First Note
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {notes.map((note) => (
                                    <div 
                                        key={note.id}
                                        className="card p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2 flex-1">
                                                <button
                                                    onClick={() => handleToggleFavorite(note)}
                                                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                                                >
                                                    <Star 
                                                        className={`w-4 h-4 ${note.is_favorite ? 'fill-yellow-500 text-yellow-500' : ''}`} 
                                                    />
                                                </button>
                                                <h4 className="font-semibold text-[var(--text-main)] text-sm">
                                                    {note.title}
                                                </h4>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleEditNote(note)}
                                                    className="text-gray-400 hover:text-blue-600 p-1"
                                                    title="Edit note"
                                                >
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteNote(note.id)}
                                                    className="text-gray-400 hover:text-red-600 p-1"
                                                    title="Delete note"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[var(--text-soft)] whitespace-pre-wrap">
                                            {note.content}
                                        </p>
                                        <p className="text-xs text-[var(--text-soft)] mt-2">
                                            {new Date(note.created_date).toLocaleDateString()} at {new Date(note.created_date).toLocaleTimeString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {showShareModal && <ShareConversationModal conversationId={currentConversationId} onClose={() => setShowShareModal(false)} />}
        </div>
    );
}

// Share Conversation Modal Component
function ShareConversationModal({ conversationId, onClose }) {
    const [email, setEmail] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [message, setMessage] = useState('');

    const handleShare = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSharing(true);
        try {
            const conv = await AIConversation.filter({ id: conversationId });
            if (conv.length > 0) {
                const sharedWith = conv[0].shared_with || [];
                if (!sharedWith.includes(email)) {
                    sharedWith.push(email);
                    await AIConversation.update(conversationId, { shared_with: sharedWith });
                    setMessage('Conversation shared successfully!');
                    setTimeout(() => {
                        onClose();
                    }, 2000);
                } else {
                    setMessage('Already shared with this user.');
                }
            }
        } catch (error) {
            console.error('Error sharing conversation:', error);
            setMessage('Error sharing conversation. Please try again.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[var(--text-main)]">Share Conversation</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-sm text-[var(--text-soft)] mb-4">
                    Share this conversation with your accountability partner or business advisor.
                </p>
                <form onSubmit={handleShare}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="form-input w-full mb-4"
                        disabled={isSharing}
                    />
                    {message && (
                        <p className={`text-sm mb-4 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                    <div className="flex gap-2">
                        <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSharing || !email.trim()} className="btn btn-primary flex-1">
                            {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Share'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}