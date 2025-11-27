import React, { useState, useCallback } from 'react';
import { User } from '@/entities/User';
import AITeamModal from '@/components/ai/AITeamModal';
import { 
    Sparkles, 
    Users, 
    ArrowRight,
    MessageSquare,
    Zap,
    TrendingUp,
    Target,
    BookOpen
} from 'lucide-react';

import { AI_TEAM_MEMBERS } from '../components/ai/aiTeamInfo';

export default function ElyzetAIAssistants() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAssistant, setSelectedAssistant] = useState(null);
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState({});

    const toggleDetails = useCallback((id) => {
        setShowDetails(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }, []);

    React.useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const openAssistant = (assistant) => {
        setSelectedAssistant(assistant);
        setAiModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Sparkles className="w-8 h-8 animate-pulse text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="card p-8 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-700">
                <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg">
                        <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-[var(--text-main)] mb-3">
                            Meet Your AI Business Team
                        </h1>
                        <p className="text-lg text-[var(--text-soft)] mb-4">
                            Six specialized AI experts designed to support your entrepreneurial journey. They work alongside your Foundation Roadmap and 90-Day Journey, providing personalized guidance and directing you to the right tools for implementation.
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--text-soft)]">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[var(--primary-gold)]" />
                                <span>Instant Responses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-[var(--primary-gold)]" />
                                <span>Contextual to Your Journey</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-[var(--primary-gold)]" />
                                <span>Directs to Implementation Tools</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg">
                <h2 className="text-xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    How Your AI Team Supports Your Journey
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="bg-blue-100 dark:bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-blue-600 dark:text-blue-200 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">Ask Questions</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            Working on your Foundation Roadmap or Journey? Ask the AI expert in that area for specific guidance on your current challenge.
                        </p>
                    </div>
                    <div>
                        <div className="bg-blue-100 dark:bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-blue-600 dark:text-blue-200 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">Get Contextual Guidance</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            The AI understands your business stage, selected goal, and the Foundation tool you're working on. Guidance is personalized to your situation.
                        </p>
                    </div>
                    <div>
                        <div className="bg-blue-100 dark:bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                            <span className="text-blue-600 dark:text-blue-200 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">Implement with Tools</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            The AI directs you to the right Foundation Roadmap section, Journey week, or platform tool to implement the advice—so you take action, not just talk.
                        </p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-300 dark:border-blue-600">
                    <p className="text-sm text-[var(--text-main)] flex items-start gap-3">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>
                            <strong>The Goal:</strong> Your AI Team does not replace your Foundation Roadmap or 90-Day Journey—they enhance it. Think of them as expert consultants who help you move through your structured path faster and with more clarity.
                        </span>
                    </p>
                </div>
            </div>

            {/* Team Members */}
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Your Team Members</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {AI_TEAM_MEMBERS.map((member) => (
                    <div 
                        key={member.id}
                        className="card p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-5xl">
                                {member.avatar}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[var(--text-main)]">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-[var(--primary-gold)] font-semibold">
                                    {member.role}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            {member.description}
                        </p>

                        <div className="mb-4">
                            <h4 className="text-xs font-semibold text-[var(--text-main)] mb-2 uppercase">
                                Expertise
                            </h4>
                            <ul className="space-y-1">
                                {member.expertise.slice(0, 3).map((skill, index) => (
                                    <li key={index} className="text-xs text-[var(--text-soft)] flex items-center gap-2">
                                        <div className="w-1 h-1 bg-[var(--primary-gold)] rounded-full" />
                                        {skill}
                                    </li>
                                ))}
                                {member.expertise.length > 3 && (
                                    <li className="text-xs text-[var(--text-soft)] italic">
                                        + {member.expertise.length - 3} more areas
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="text-xs font-semibold text-[var(--text-main)] mb-1">
                                Best For:
                            </h4>
                            <p className="text-xs text-[var(--text-soft)]">
                                {member.bestFor}
                            </p>
                        </div>

                        <button
                            onClick={() => openAssistant(member)}
                            className={`btn btn-primary w-full bg-gradient-to-r ${member.color}`}
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Talk to {member.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Tips Section */}
            <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-700">
                <h2 className="text-xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                    Pro Tips for Working with Your AI Team
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">💡 Be Specific About Where You Are</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            Mention which Foundation tool you are working on or which Journey week. The AI will provide more targeted guidance and direct you to the right implementation steps.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">🔄 Ask for Platform Tools</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            Ask "Which Foundation tool should I use?" or "Where do I implement this?" The AI will link directly to the right page in your Foundation Roadmap or Journey.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">📝 Use Your Notes</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            When working on a Foundation tool, your notes are shared with the AI for context. This makes responses more personalized to your actual business.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-2">🎯 Follow the Links</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            When the AI recommends a tool or page, click the link! That is where you will implement the advice and make real progress on your journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* AI Team Modal */}
            {selectedAssistant && (
                <AITeamModal
                    isOpen={aiModalOpen}
                    onClose={() => {
                        setAiModalOpen(false);
                        setSelectedAssistant(null);
                    }}
                    assistantType={selectedAssistant.id}
                    sectionTitle={`${selectedAssistant.name} - Journey Support`}
                    userNotes={[]}
                />
            )}
        </div>
    );
}