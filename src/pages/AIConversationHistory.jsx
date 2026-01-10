import React, { useState, useEffect } from 'react';
import { AIConversation } from '@/entities/all';
import { User } from '@/entities/User';
import AITeamModal from '@/components/ai/AITeamModal';
import { 
    History, 
    MessageSquare, 
    Trash2, 
    Loader2,
    Clock,
    ChevronRight,
    Send // Added Send icon
} from 'lucide-react';
import moment from 'moment';

const AI_TEAM_INFO = {
    elyzet: { name: "Elyzet", avatar: "👔", color: "from-indigo-500 to-purple-600" },
    ava: { name: "Ava", avatar: "🎯", color: "from-pink-500 to-rose-600" },
    sam: { name: "Sam", avatar: "📱", color: "from-blue-500 to-cyan-600" },
    charlie: { name: "Charlie", avatar: "✍️", color: "from-yellow-500 to-orange-600" }, // Added Charlie
    finley: { name: "Finley", avatar: "💰", color: "from-green-500 to-emerald-600" },
    olivia: { name: "Olivia", avatar: "⚙️", color: "from-orange-500 to-amber-600" }
};

export default function AIConversationHistory() {
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [showAIModal, setShowAIModal] = useState(false);
    const [filterAssistant, setFilterAssistant] = useState('all');
    const [usageStats, setUsageStats] = useState(null); // Added usageStats state

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            setUsageStats(currentUser.ai_usage_stats); // Set usageStats from currentUser

            const convs = await AIConversation.filter(
                { created_by: currentUser.email },
                '-last_message_at',
                50
            );
            setConversations(convs);
        } catch (error) {
            console.error('Error loading conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (conversationId) => {
        if (!confirm('Are you sure you want to delete this conversation?')) return;

        try {
            await AIConversation.delete(conversationId);
            setConversations(conversations.filter(c => c.id !== conversationId));
        } catch (error) {
            console.error('Error deleting conversation:', error);
        }
    };

    const openConversation = (conversation) => {
        setSelectedConversation(conversation);
        setShowAIModal(true);
    };

    const filteredConversations = filterAssistant === 'all' 
        ? conversations 
        : conversations.filter(c => c.assistant_type === filterAssistant);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-lg">
                        <History className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">AI Conversation History</h1>
                        <p className="text-[var(--text-soft)]">Review and continue your past conversations with your AI team</p>
                    </div>
                </div>
            </div>

            {/* Usage Stats */}
            {usageStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-[var(--primary-gold)]" />
                            <div>
                                <p className="text-2xl font-bold text-[var(--text-main)]">
                                    {usageStats.total_conversations || 0}
                                </p>
                                <p className="text-xs text-[var(--text-soft)]">Total Conversations</p>
                            </div>
                        </div>
                    </div>
                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <Send className="w-8 h-8 text-blue-600" />
                            <div>
                                <p className="text-2xl font-bold text-[var(--text-main)]">
                                    {usageStats.total_messages_sent || 0}
                                </p>
                                <p className="text-xs text-[var(--text-soft)]">Messages Sent</p>
                            </div>
                        </div>
                    </div>
                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">
                                {AI_TEAM_INFO[usageStats.most_used_assistant]?.avatar || '👔'}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-[var(--text-main)]">
                                    {AI_TEAM_INFO[usageStats.most_used_assistant]?.name || 'None yet'}
                                </p>
                                <p className="text-xs text-[var(--text-soft)]">Most Used Assistant</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="card p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterAssistant('all')}
                        className={`btn btn-sm ${filterAssistant === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                    >
                        All Conversations
                    </button>
                    {Object.entries(AI_TEAM_INFO).map(([key, info]) => (
                        <button
                            key={key}
                            onClick={() => setFilterAssistant(key)}
                            className={`btn btn-sm ${filterAssistant === key ? 'btn-primary' : 'btn-ghost'}`}
                        >
                            <span className="mr-2">{info.avatar}</span>
                            {info.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conversations List */}
            {filteredConversations.length === 0 ? (
                <div className="card p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[var(--text-main)] mb-2">
                        No conversations yet
                    </h3>
                    <p className="text-[var(--text-soft)] mb-6">
                        Start chatting with your AI Business Team to see your conversation history here.
                    </p>
                    <a href="/ElyzetAIAssistants" className="btn btn-primary">
                        Meet Your AI Team
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredConversations.map((conversation) => {
                        const assistant = AI_TEAM_INFO[conversation.assistant_type] || { name: 'AI Assistant', avatar: '🤖' };
                        const messageCount = conversation.messages?.length || 0;
                        const lastMessage = conversation.messages?.[conversation.messages.length - 1];

                        return (
                            <div
                                key={conversation.id}
                                className="card p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <div className="text-4xl flex-shrink-0">
                                            {assistant.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-[var(--text-main)] text-lg">
                                                    {conversation.title}
                                                </h3>
                                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-[var(--text-soft)] rounded">
                                                    {assistant.name}
                                                </span>
                                            </div>
                                            {conversation.context?.section_title && (
                                                <p className="text-sm text-[var(--text-soft)] mb-2">
                                                    📍 {conversation.context.section_title}
                                                </p>
                                            )}
                                            {lastMessage && lastMessage.content && (
                                                <p className="text-sm text-[var(--text-soft)] truncate mb-2">
                                                    {lastMessage.role === 'user' ? 'You: ' : `${assistant?.name || 'AI'}: `}
                                                    {lastMessage.content}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-4 text-xs text-[var(--text-soft)]">
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    <span>{messageCount} messages</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{moment(conversation.last_message_at).fromNow()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openConversation(conversation)}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                            Open
                                        </button>
                                        <button
                                            onClick={() => handleDelete(conversation.id)}
                                            className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* AI Team Modal */}
            {selectedConversation && (
                <AITeamModal
                    isOpen={showAIModal}
                    onClose={() => {
                        setShowAIModal(false);
                        setSelectedConversation(null);
                        loadData(); // Reload to get updated conversation
                    }}
                    assistantType={selectedConversation.assistant_type}
                    sectionTitle={selectedConversation.context?.section_title || 'Conversation'}
                    conversationId={selectedConversation.id}
                />
            )}
        </div>
    );
}