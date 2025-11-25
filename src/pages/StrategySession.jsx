import React, { useEffect, useState } from 'react';
import { User } from '@/entities/User';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Award, CalendarCheck, Target, ArrowRight, Users, TrendingUp, Rocket } from 'lucide-react';


export default function StrategySession() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                // User not logged in
            } finally {
                setLoading(false);
            }
        };
        fetchUser();

        const scriptId = 'hubspot-script';
        if (document.getElementById(scriptId)) return;

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://link.thebusinessminds.com/js/form_embed.js";
        script.type = "text/javascript";
        script.async = true;
        
        document.body.appendChild(script);

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    const getStageSpecificSessions = () => {
        if (!user?.entrepreneurship_stage) return [];

        const sessions = {
            vision: {
                title: "Vision Stage Strategy Session",
                description: "Build a solid foundation for your business idea",
                icon: Target,
                color: "bg-blue-100 text-blue-600",
                sessions: [
                    {
                        title: "Clarify Your Vision & Mission",
                        description: "Define your 'why' and long-term business goals",
                        link: createPageUrl('VisionStrategySession')
                    }
                ]
            },
            startup: {
                title: "Startup Stage Strategy Session", 
                description: "Launch and validate your business effectively",
                icon: Rocket,
                color: "bg-purple-100 text-purple-600",
                sessions: [
                    {
                        title: "Launch & Validation Strategy",
                        description: "Build your brand, validate your offer, and create your first funnel",
                        link: createPageUrl('StartupStrategySession')
                    },
                    {
                        title: "SOP & Systems Planning",
                        description: "Set up basic operating procedures and quality systems for consistency",
                        link: createPageUrl('SOPPoliciesAI')
                    }
                ]
            },
            growth: {
                title: "Growth Stage Strategy Session",
                description: "Scale and optimize your established business", 
                icon: TrendingUp,
                color: "bg-green-100 text-green-600",
                sessions: [
                    {
                        title: "Scale & Optimize Strategy",
                        description: "Optimize operations, build your team, and expand your reach",
                        link: createPageUrl('GrowthStrategySession')
                    },
                    {
                        title: "Advanced SOP & Policy Development",
                        description: "Create comprehensive procedures, employee handbooks, and compliance systems",
                        link: createPageUrl('SOPPoliciesAI')
                    }
                ]
            }
        };

        return sessions[user.entrepreneurship_stage] || sessions.vision;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-gold)]"></div>
            </div>
        );
    }

    const stageInfo = getStageSpecificSessions();

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                    <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                        <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full">
                            <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                                <Award className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl">Your 1-on-1 Strategy Session</h1>
                                <p className="text-[var(--text-soft)] text-base md:text-lg">Exclusive benefit for HQ members - One complimentary session every 3 months.</p>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700" style={{ borderRadius: '2px' }}>
                        <div className="flex items-start gap-3">
                            <CalendarCheck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">HQ Member Benefit</h3>
                                <p className="text-sm text-[var(--text-soft)]">
                                    As a Business Minds HQ member, you receive <strong>one complimentary 1-on-1 strategy session every 3 months</strong>. 
                                    These personalized sessions provide deep-dive guidance tailored specifically to your business challenges and goals.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-8" style={{ borderRadius: '2px' }}>
                        <div className="grid md:grid-cols-2 gap-6 text-[var(--text-main)]">
                            <div>
                                <h2 className="text-xl font-bold mb-3">What You'll Get:</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-3">
                                        <Target className="w-5 h-5 text-[var(--primary-gold)] mt-1 flex-shrink-0" />
                                        <span><strong>Personalized Roadmap Review:</strong> A deep dive into your current business stage and 90-day goals to ensure they're ambitious yet achievable.</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <CalendarCheck className="w-5 h-5 text-[var(--primary-gold)] mt-1 flex-shrink-0" />
                                        <span><strong>Actionable Next Steps:</strong> Walk away with 3-5 clear, actionable steps you can take immediately to gain momentum.</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <Award className="w-5 h-5 text-[var(--primary-gold)] mt-1 flex-shrink-0" />
                                        <span><strong>Expert Guidance:</strong> Get your most pressing questions answered by an experienced business strategist who has been in your shoes.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-md">
                                <h3 className="font-bold text-yellow-800">This is for you if:</h3>
                                <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
                                    <li>You're feeling stuck or overwhelmed.</li>
                                    <li>You want to validate your business strategy.</li>
                                    <li>You need clarity on your next priorities.</li>
                                    <li>You want to accelerate your progress.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Stage-Specific Interactive Sessions */}
                    {user && stageInfo.sessions && (
                        <div className="card p-8" style={{ borderRadius: '2px' }}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className={`p-3 rounded-md ${stageInfo.color}`}>
                                    <stageInfo.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--text-main)]">{stageInfo.title}</h2>
                                    <p className="text-[var(--text-soft)]">{stageInfo.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {stageInfo.sessions.map((session, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-[var(--primary-gold)] transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{session.title}</h3>
                                                <p className="text-[var(--text-soft)] mb-3">{session.description}</p>
                                            </div>
                                            <Link to={session.link} className="btn btn-primary">
                                                Start Session
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card p-6 md:p-8" style={{ borderRadius: '2px' }}>
                        <h2 className="text-2xl font-bold text-center mb-6">Book Your 1-on-1 Strategy Session</h2>
                        <div style={{ height: '1000px', overflow: 'auto' }} className="rounded-md border border-gray-200">
                            <iframe
                                src="https://link.thebusinessminds.com/widget/booking/hNMeB0q9hHejksqFMmMS"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                scrolling="yes"
                                title="Strategy Session Booking"
                            ></iframe>
                        </div>
                    </div>
                </div>
                </div>
                );
                }