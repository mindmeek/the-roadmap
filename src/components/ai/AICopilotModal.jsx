import React, { useState } from 'react';
import { Sparkles, X, Send, Loader2, Copy, Check } from 'lucide-react';
import { aiCopilot } from '@/functions/aiCopilot';

const AICopilotModal = ({ 
    isOpen, 
    onClose, 
    copilotQuestions = [], 
    actionStepTitle = '', 
    assistantType = null,
    context = ''
}) => {
    const [userInput, setUserInput] = useState('');
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        try {
            const result = await aiCopilot({
                prompt,
                context,
                assistantType,
                copilotQuestions,
                userInput
            });

            if (result.data.success) {
                setResponse(result.data.response);
            } else {
                setResponse('Sorry, there was an error getting your AI response. Please try again.');
            }
        } catch (error) {
            console.error('Error calling AI copilot:', error);
            setResponse('Sorry, there was an error getting your AI response. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(response);
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const handleClose = () => {
        setUserInput('');
        setPrompt('');
        setResponse('');
        setHasCopied(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
                        <div>
                            <h3 className="text-lg font-semibold text-white">Ask Elyzet AI</h3>
                            {actionStepTitle && (
                                <p className="text-white/80 text-sm">{actionStepTitle}</p>
                            )}
                            {assistantType && (
                                <p className="text-white/80 text-sm">
                                    {assistantType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Assistant
                                </p>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col h-full max-h-[calc(90vh-80px)]">
                    {/* Guiding Questions (if available) */}
                    {copilotQuestions.length > 0 && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-[var(--text-main)] mb-2">Consider these questions:</h4>
                            <ul className="list-disc list-inside text-sm text-[var(--text-soft)] space-y-1">
                                {copilotQuestions.map((question, index) => (
                                    <li key={index}>{question}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Context Input (for copilot questions) */}
                    {copilotQuestions.length > 0 && (
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Your thoughts/context (optional):
                            </label>
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Share any initial thoughts, ideas, or context that might help..."
                                className="form-input h-20 w-full text-sm resize-none"
                            />
                        </div>
                    )}

                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* AI Response Area */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {response ? (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-[var(--primary-gold)]" />
                                            <span className="font-medium text-[var(--text-main)]">Elyzet's Response</span>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="btn btn-ghost btn-sm p-2"
                                            title="Copy to clipboard"
                                        >
                                            {hasCopied ? (
                                                <Check className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="prose prose-sm max-w-none text-[var(--text-main)]">
                                        {response.split('\n').map((paragraph, index) => (
                                            <p key={index} className="mb-2 last:mb-0">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-[var(--text-soft)] py-8">
                                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-[var(--primary-gold)] opacity-50" />
                                    <p>Ask Elyzet anything about this step or topic!</p>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Ask Elyzet for help with this step..."
                                    className="form-input flex-1"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!prompt.trim() || isLoading}
                                    className="btn btn-primary px-4"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICopilotModal;