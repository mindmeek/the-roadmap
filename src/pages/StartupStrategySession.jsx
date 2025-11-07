import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Rocket, Lightbulb, CheckCircle, Save, ArrowRight } from 'lucide-react';

const startupQuestions = [
    {
        id: 'brand_foundation',
        title: 'How Will You Build Your Brand Foundation?',
        description: 'Your brand is more than a logo - it\'s the complete experience customers have with your business.',
        placeholder: 'Describe your brand personality, visual identity, messaging, and the impression you want to create...'
    },
    {
        id: 'offer_validation',
        title: 'How Will You Validate Your First Offer?',
        description: 'Before investing heavily, test your offer with real customers to ensure product-market fit.',
        placeholder: 'Outline your validation strategy - surveys, prototypes, pre-sales, beta testing...'
    },
    {
        id: 'target_customer_refinement',
        title: 'Who Exactly Is Your Target Customer?',
        description: 'Get specific about demographics, psychographics, and behaviors to focus your marketing efforts.',
        placeholder: 'Detail your ideal customer avatar - age, income, challenges, goals, where they spend time...'
    },
    {
        id: 'marketing_channels',
        title: 'Which Marketing Channels Will You Focus On?',
        description: 'Choose 2-3 channels where your customers are most active rather than trying to be everywhere.',
        placeholder: 'List your chosen channels and explain why they\'re right for your audience...'
    },
    {
        id: 'sales_funnel',
        title: 'How Will Your Sales Funnel Work?',
        description: 'Map out the customer journey from awareness to purchase and beyond.',
        placeholder: 'Describe each step: awareness → interest → consideration → purchase → retention...'
    },
    {
        id: 'launch_strategy',
        title: 'What\'s Your Launch Strategy?',
        description: 'Plan a coordinated launch that builds momentum and maximizes your initial impact.',
        placeholder: 'Outline your pre-launch, launch day, and post-launch activities...'
    },
    {
        id: 'success_metrics',
        title: 'How Will You Measure Success?',
        description: 'Define key metrics that matter for your startup stage - not just vanity metrics.',
        placeholder: 'List 3-5 key performance indicators you\'ll track monthly...'
    }
];

export default function StartupStrategySession() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                if (userData.entrepreneurship_stage !== 'startup') {
                    navigate(createPageUrl('StrategySession'));
                    return;
                }
                setUser(userData);
            } catch (e) {
                navigate(createPageUrl('StrategySession'));
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleAnswerChange = (value) => {
        setAnswers(prev => ({
            ...prev,
            [startupQuestions[currentQuestion].id]: value
        }));
    };

    const saveProgress = () => {
        localStorage.setItem('startup_strategy_session', JSON.stringify(answers));
    };

    const nextQuestion = () => {
        if (currentQuestion < startupQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            saveProgress();
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const completeSession = () => {
        saveProgress();
        alert('Excellent work! Your startup strategy session responses have been saved. Consider booking a 1-on-1 session to create your action plan.');
        navigate(createPageUrl('StrategySession'));
    };

    if (loading) {
        return <div className="px-4 py-8 text-center">Loading strategy session...</div>;
    }

    const progress = ((currentQuestion + 1) / startupQuestions.length) * 100;
    const currentQ = startupQuestions[currentQuestion];

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="card p-4 md:p-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(createPageUrl('StrategySession'))}
                            className="btn btn-ghost p-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-md">
                                <Rocket className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">Startup Strategy Session</h1>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Question {currentQuestion + 1} of {startupQuestions.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="card p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Progress:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-purple-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Current Question */}
                <div className="card p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                            {currentQ.title}
                        </h2>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-md p-4">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <p className="text-purple-700 dark:text-purple-300">{currentQ.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <textarea
                            value={answers[currentQ.id] || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder={currentQ.placeholder}
                            className="form-input h-40 resize-none text-base"
                            style={{ lineHeight: '1.6' }}
                        />

                        <div className="flex justify-between items-center pt-4">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestion === 0}
                                className="btn btn-ghost disabled:opacity-50"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Previous
                            </button>

                            <div className="flex gap-2">
                                <button
                                    onClick={saveProgress}
                                    className="btn btn-secondary"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Progress
                                </button>

                                {currentQuestion === startupQuestions.length - 1 ? (
                                    <button
                                        onClick={completeSession}
                                        className="btn btn-primary"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Complete Session
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="btn btn-primary"
                                    >
                                        Next Question
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Session Overview */}
                <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-3">Startup Stage Focus Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Build Your Brand</h4>
                            <p className="text-purple-700 dark:text-purple-300">Create a strong brand identity and online presence</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Validate Your Offer</h4>
                            <p className="text-purple-700 dark:text-purple-300">Test and refine your product-market fit</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Launch Your Funnel</h4>
                            <p className="text-purple-700 dark:text-purple-300">Build systems to attract and convert customers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}