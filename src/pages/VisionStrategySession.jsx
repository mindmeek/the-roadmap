import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Target, Lightbulb, CheckCircle, Save, ArrowRight } from 'lucide-react';

const visionQuestions = [
    {
        id: 'why_start_business',
        title: 'Why Do You Want to Start This Business?',
        description: 'Your "why" is the foundation of everything. It will drive you through challenges and attract the right customers.',
        placeholder: 'Think about your personal motivations, the impact you want to make, and what success means to you...'
    },
    {
        id: 'problem_solving',
        title: 'What Problem Are You Solving?',
        description: 'Great businesses solve real problems. Be specific about the pain points your target audience faces.',
        placeholder: 'Describe the specific problem, who experiences it, and how it currently affects them...'
    },
    {
        id: 'target_audience',
        title: 'Who Is Your Ideal Customer?',
        description: 'Getting specific about your target audience helps you create better products and more effective marketing.',
        placeholder: 'Describe their demographics, challenges, goals, and current solutions they use...'
    },
    {
        id: 'unique_solution',
        title: 'What Makes Your Solution Different?',
        description: 'Your unique value proposition sets you apart from competitors and gives customers a reason to choose you.',
        placeholder: 'Explain what makes your approach, product, or service unique and better...'
    },
    {
        id: 'success_vision',
        title: 'What Does Success Look Like in 1 Year?',
        description: 'Having a clear vision helps you set goals and make decisions that move you toward your desired outcome.',
        placeholder: 'Paint a picture of your business in 12 months - revenue, customers, impact, lifestyle...'
    },
    {
        id: 'first_steps',
        title: 'What Are Your Immediate Next Steps?',
        description: 'Breaking down your vision into actionable steps makes it achievable and helps build momentum.',
        placeholder: 'List 3-5 specific actions you need to take in the next 30 days...'
    }
];

export default function VisionStrategySession() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                if (userData.entrepreneurship_stage !== 'vision') {
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
            [visionQuestions[currentQuestion].id]: value
        }));
    };

    const saveProgress = () => {
        localStorage.setItem('vision_strategy_session', JSON.stringify(answers));
    };

    const nextQuestion = () => {
        if (currentQuestion < visionQuestions.length - 1) {
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
        alert('Great work! Your vision session responses have been saved. Consider booking a 1-on-1 session below to dive deeper.');
        navigate(createPageUrl('StrategySession'));
    };

    if (loading) {
        return <div className="px-4 py-8 text-center">Loading strategy session...</div>;
    }

    const progress = ((currentQuestion + 1) / visionQuestions.length) * 100;
    const currentQ = visionQuestions[currentQuestion];

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
                            <div className="bg-blue-100 p-2 rounded-md">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">Vision Strategy Session</h1>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Question {currentQuestion + 1} of {visionQuestions.length}
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
                                className="h-full bg-blue-600 transition-all duration-300"
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
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-4">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-blue-700 dark:text-blue-300">{currentQ.description}</p>
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

                                {currentQuestion === visionQuestions.length - 1 ? (
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
                <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-3">Vision Stage Focus Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Clarify Your Why</h4>
                            <p className="text-blue-700 dark:text-blue-300">Define your mission and core motivations</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Validate Your Idea</h4>
                            <p className="text-blue-700 dark:text-blue-300">Ensure there's market demand for your solution</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Plan Your Foundation</h4>
                            <p className="text-blue-700 dark:text-blue-300">Set up the groundwork for your business</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}