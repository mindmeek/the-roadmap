import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, TrendingUp, Lightbulb, CheckCircle, Save, ArrowRight } from 'lucide-react';

const growthQuestions = [
    {
        id: 'operations_optimization',
        title: 'How Will You Optimize Your Operations?',
        description: 'Streamline processes, reduce bottlenecks, and create systems that can scale without you.',
        placeholder: 'Identify current inefficiencies, automation opportunities, and systemization priorities...'
    },
    {
        id: 'customer_experience',
        title: 'How Will You Enhance Customer Experience?',
        description: 'Focus on retention, referrals, and increasing customer lifetime value through exceptional service.',
        placeholder: 'Describe improvements to onboarding, support, communication, and value delivery...'
    },
    {
        id: 'team_building',
        title: 'What\'s Your Team Building Strategy?',
        description: 'Identify key roles, hiring priorities, and how you\'ll develop leadership capabilities.',
        placeholder: 'List essential roles to fill, leadership development plans, and team culture goals...'
    },
    {
        id: 'leadership_development',
        title: 'How Will You Develop as a Leader?',
        description: 'Growing a business requires evolving your leadership skills and building systems for others to succeed.',
        placeholder: 'Outline your leadership development plan, delegation strategies, and vision communication...'
    },
    {
        id: 'market_expansion',
        title: 'What\'s Your Market Expansion Plan?',
        description: 'Explore new customer segments, geographic markets, or distribution channels.',
        placeholder: 'Detail potential new markets, expansion strategies, and required resources...'
    },
    {
        id: 'revenue_diversification',
        title: 'How Will You Diversify Revenue Streams?',
        description: 'Reduce risk and increase growth potential by developing complementary offerings.',
        placeholder: 'List potential new products/services, partnerships, or business models...'
    },
    {
        id: 'competitive_advantage',
        title: 'How Will You Maintain Competitive Advantage?',
        description: 'Stay ahead through innovation, superior execution, or unique positioning.',
        placeholder: 'Describe your differentiation strategy, innovation plans, and competitive moats...'
    },
    {
        id: 'scale_metrics',
        title: 'What Metrics Will Guide Your Scaling?',
        description: 'Track the right KPIs to ensure healthy, sustainable growth rather than growth at any cost.',
        placeholder: 'List key metrics for operations, finance, customer satisfaction, and team performance...'
    }
];

export default function GrowthStrategySession() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                if (userData.entrepreneurship_stage !== 'growth') {
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
            [growthQuestions[currentQuestion].id]: value
        }));
    };

    const saveProgress = () => {
        localStorage.setItem('growth_strategy_session', JSON.stringify(answers));
    };

    const nextQuestion = () => {
        if (currentQuestion < growthQuestions.length - 1) {
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
        alert('Outstanding work! Your growth strategy session responses have been saved. Consider booking a 1-on-1 session to develop your scaling roadmap.');
        navigate(createPageUrl('StrategySession'));
    };

    if (loading) {
        return <div className="px-4 py-8 text-center">Loading strategy session...</div>;
    }

    const progress = ((currentQuestion + 1) / growthQuestions.length) * 100;
    const currentQ = growthQuestions[currentQuestion];

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
                            <div className="bg-green-100 p-2 rounded-md">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold">Growth Strategy Session</h1>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Question {currentQuestion + 1} of {growthQuestions.length}
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
                                className="h-full bg-green-600 transition-all duration-300"
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
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md p-4">
                            <div className="flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-green-700 dark:text-green-300">{currentQ.description}</p>
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

                                {currentQuestion === growthQuestions.length - 1 ? (
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
                <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-3">Growth Stage Focus Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Optimize Operations</h4>
                            <p className="text-green-700 dark:text-green-300">Streamline processes and improve efficiency</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Build Your Team</h4>
                            <p className="text-green-700 dark:text-green-300">Develop leadership and scale your workforce</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 p-3 rounded-md">
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Expand Your Reach</h4>
                            <p className="text-green-700 dark:text-green-300">Explore new markets and revenue streams</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}