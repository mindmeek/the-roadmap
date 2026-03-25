import React, { useState, useEffect, useMemo } from 'react';
import { User as UserIcon, Building, Target, Rocket, CheckCircle, ChevronRight, Sparkles, TrendingUp, Lightbulb, Award, Loader2, CalendarDays, DollarSign, Heart, Users, ExternalLink, Building2, MapPin } from 'lucide-react';
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import roadmapData from '@/components/roadmap';
import Step4Content from '@/components/onboarding/Step4Content';

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        entrepreneurship_stage: '',
        selected_goal: '',
        business_name: '',
        industry: '',
        website: '',
        company_size: '',
        legal_structure: '',
        years_in_business: 0,
        ideal_client_description: '',
        value_proposition_statement: '',
        current_challenges: '',
        primary_revenue_streams: '',
        marketing_channels_focus: '',
        business_type: '',
        step4_focus: '',
        step4_challenge: '',
        step4_win: ''
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            
            setFormData(prev => ({
                ...prev,
                first_name: currentUser.first_name || '',
                last_name: currentUser.last_name || '',
                entrepreneurship_stage: currentUser.entrepreneurship_stage || '',
                selected_goal: currentUser.selected_goal || '',
                business_name: currentUser.business_name || '',
                industry: currentUser.industry || '',
                website: currentUser.website || '',
                company_size: currentUser.company_size || '',
                legal_structure: currentUser.legal_structure || '',
                years_in_business: currentUser.years_in_business || 0,
                ideal_client_description: currentUser.ideal_client_description || '',
                value_proposition_statement: currentUser.value_proposition_statement || '',
                current_challenges: currentUser.current_challenges || '',
                primary_revenue_streams: currentUser.primary_revenue_streams || '',
                marketing_channels_focus: currentUser.marketing_channels_focus || '',
                business_type: currentUser.business_type || ''
            }));
            
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => {
            const updated = { ...prev, [field]: value };
            // Auto-select the dedicated roadmap goal when a mission-driven business type is chosen
            if (field === 'business_type') {
                if (value === 'non_profit') {
                    updated.selected_goal = 'social_enterprises';
                } else if (value === 'social_business') {
                    updated.selected_goal = 'social_business_growth';
                } else {
                    // Clear auto-selected goal if switching back to for_profit
                    if (prev.selected_goal === 'social_enterprises' || prev.selected_goal === 'social_business_growth') {
                        updated.selected_goal = '';
                    }
                }
            }
            return updated;
        });
    };

    const availableGoals = useMemo(() => {
        if (!formData.entrepreneurship_stage || !formData.business_type) return [];
        
        const stageData = roadmapData.default?.[formData.entrepreneurship_stage] || roadmapData[formData.entrepreneurship_stage];
        if (!stageData || !stageData.goals) return [];
        
        const baseGoals = Object.entries(stageData.goals).map(([id, goal]) => ({
            id,
            title: goal.title,
            description: goal.description,
            isNiche: false
        }));

        const nicheGoals = Object.entries(roadmapData.nicheRoadmaps || {})
            .map(([id, roadmap]) => ({
                id,
                title: roadmap.courseTitle,
                description: roadmap.courseDescription,
                icon: roadmap.icon || "✨",
                stage: roadmap.stage,
                businessType: roadmap.businessType || "for_profit",
                isNiche: true
            }))
            .filter(niche => {
                const stageMatch = niche.stage === formData.entrepreneurship_stage;
                const businessTypeMatch = !niche.businessType || niche.businessType === formData.business_type;
                return stageMatch && businessTypeMatch;
            });
        
        return [...baseGoals, ...nicheGoals];
    }, [formData.entrepreneurship_stage, formData.business_type]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        try {
            setLoading(true);
            
            const updateData = {
                ...formData,
                onboarding_completed: true,
                journey_start_date: new Date().toISOString().split('T')[0],
                current_week: 1,
                current_month: 1,
                completed_weeks: [],
                has_seen_welcome_popup: false
            };

            await User.updateMyUserData(updateData);
            
            localStorage.removeItem('welcomePopupShown');
            
            setTimeout(() => {
                window.location.href = createPageUrl('Dashboard');
            }, 500);
        } catch (error) {
            console.error('Error completing onboarding:', error);
            alert('There was an error saving your information. Please try again.');
            setLoading(false);
        }
    };

    const steps = [
        {
            title: "Welcome to The Roadmap! 🎉",
            description: "Let's get you set up with your personalized 90-day journey to business success.",
            content: (
                <div className="space-y-6 text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--text-main)]">Welcome to The Roadmap</h2>
                    <p className="text-lg text-[var(--text-soft)] max-w-2xl mx-auto">
                        You're about to embark on a transformative 90-day journey designed specifically for your stage and type of business. 
                        We'll guide you step-by-step with daily actions, proven strategies, and AI-powered support.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Target className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-3" />
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">Clear Direction</h3>
                            <p className="text-sm text-[var(--text-soft)]">Know exactly what to work on each week</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Rocket className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-3" />
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">Time Proven System</h3>
                            <p className="text-sm text-[var(--text-soft)]">Follow strategies that work for real businesses</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <TrendingUp className="w-8 h-8 text-[var(--primary-gold)] mx-auto mb-3" />
                            <h3 className="font-semibold text-[var(--text-main)] mb-2">Maintain Momentum</h3>
                            <p className="text-sm text-[var(--text-soft)]">Stay on track and keep moving forward</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Tell us about yourself",
            description: "Help us personalize your experience",
            content: (
                <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                value={formData.first_name}
                                onChange={(e) => handleInputChange('first_name', e.target.value)}
                                className="form-input w-full"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                value={formData.last_name}
                                onChange={(e) => handleInputChange('last_name', e.target.value)}
                                className="form-input w-full"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => handleInputChange('business_name', e.target.value)}
                            className="form-input w-full"
                            placeholder="My Awesome Business"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Industry
                        </label>
                        <select
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            className="form-input w-full"
                        >
                            <option value="">Select your industry</option>
                            <option value="Technology & Software">Technology & Software</option>
                            <option value="Consulting & Professional Services">Consulting & Professional Services</option>
                            <option value="E-commerce & Retail">E-commerce & Retail</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="Education & Training">Education & Training</option>
                            <option value="Creative & Design">Creative & Design</option>
                            <option value="Marketing & Advertising">Marketing & Advertising</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Financial Services">Financial Services</option>
                            <option value="Non-Profit & Social Impact">Non-Profit & Social Impact</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Company Size *
                        </label>
                        <select
                            value={formData.company_size}
                            onChange={(e) => handleInputChange('company_size', e.target.value)}
                            className="form-input w-full"
                            required
                        >
                            <option value="">Select company size</option>
                            <option value="1">1 (Solo)</option>
                            <option value="2-10">2-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="200+">200+ employees</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Legal Structure *
                        </label>
                        <select
                            value={formData.legal_structure}
                            onChange={(e) => handleInputChange('legal_structure', e.target.value)}
                            className="form-input w-full"
                            required
                        >
                            <option value="">Select legal structure</option>
                            <option value="Not yet formed">Not Yet Formed</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="LLC">LLC (Limited Liability Company)</option>
                            <option value="S-Corp">S-Corp</option>
                            <option value="C-Corp">C-Corp</option>
                            <option value="Partnership">Partnership</option>
                            <option value="501(c)(3) Non-Profit">501(c)(3) Non-Profit</option>
                            <option value="B-Corp">B-Corp</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Years in Business
                        </label>
                        <select
                            value={formData.years_in_business}
                            onChange={(e) => handleInputChange('years_in_business', parseInt(e.target.value))}
                            className="form-input w-full"
                        >
                            <option value={0}>Just starting / Idea stage</option>
                            <option value={1}>Less than 1 year</option>
                            <option value={2}>1-2 years</option>
                            <option value={3}>3-5 years</option>
                            <option value={5}>5+ years</option>
                        </select>
                    </div>
                </div>
            )
        },
        {
            title: "What type of business is it?",
            description: "Choose the type that best describes your business model",
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <button
                            onClick={() => handleInputChange('business_type', 'for_profit')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.business_type === 'for_profit'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.business_type === 'for_profit'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <DollarSign className={`w-6 h-6 ${
                                        formData.business_type === 'for_profit' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.business_type === 'for_profit' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                For-Profit Business
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Your primary goal is financial gain through selling products or services.
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on revenue generation, market share, and growth</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Typical business structure with commercial objectives</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Strategies geared towards profit maximization and scale</span>
                                </li>
                            </ul>
                        </button>

                        <button
                            onClick={() => handleInputChange('business_type', 'non_profit')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.business_type === 'non_profit'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.business_type === 'non_profit'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <Heart className={`w-6 h-6 ${
                                        formData.business_type === 'non_profit' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.business_type === 'non_profit' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Non-Profit Organization
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Focus on mission-driven growth, fundraising, and community impact.
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>You lead a charitable organization, foundation, or cause</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on donor acquisition, grants, and volunteer engagement</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Measuring and communicating social impact is key</span>
                                </li>
                            </ul>
                        </button>

                        <button
                            onClick={() => handleInputChange('business_type', 'social_business')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.business_type === 'social_business'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.business_type === 'social_business'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <Users className={`w-6 h-6 ${
                                        formData.business_type === 'social_business' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.business_type === 'social_business' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Social Business / B-Corp
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Achieve financial sustainability while driving positive social impact.
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>For-profit model with a core social or environmental mission</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on ethical practices and measurable impact</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Balancing profit with purpose is central to your strategy</span>
                                </li>
                            </ul>
                        </button>
                    </div>

                    {formData.business_type === 'non_profit' && (
                        <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border-2 border-red-200 dark:border-red-700">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full flex-shrink-0">
                                    <Building2 className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">📋 Need to Form Your Non-Profit?</h4>
                                    <p className="text-sm text-[var(--text-soft)] mb-3">
                                        Our trusted partner can help you establish your 501(c)(3) for just <strong>$39 + state filing fees</strong>. 
                                        They handle all the paperwork and guide you through the process.
                                    </p>
                                    <a 
                                        href="https://www.northwestregisteredagent.com/northwest-39-package-landing-page?utm_source=awin&utm_medium=referral&utm_campaign=default&sv1=affiliate&sv_campaign_id=2456757&sscid=66946_1771137297_4b47feca373412da26101a11c73d057e&awc=66946_1771137297_4b47feca373412da26101a11c73d057e&sscid=66946_1771137297_4b47feca373412da26101a11c73d057e"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary inline-flex items-center text-sm mb-3"
                                    >
                                        <Building2 className="w-4 h-4 mr-2" />
                                        Form Your Non-Profit Now
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-3">
                                        <p className="text-sm text-[var(--text-main)] font-semibold mb-2">💡 Important Reminder:</p>
                                        <p className="text-sm text-[var(--text-soft)]">
                                            Even as a non-profit, you must <strong>run it like a business</strong>. Consider establishing a 
                                            separate foundation if you plan to raise significant funds or provide grants. Your mission deserves 
                                            the same strategic planning and operational excellence as any for-profit venture.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        },
        {
            title: "What's your current stage?",
            description: "Choose the stage that best describes where you are in your entrepreneurial journey",
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <button
                            onClick={() => handleInputChange('entrepreneurship_stage', 'vision')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.entrepreneurship_stage === 'vision'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.entrepreneurship_stage === 'vision'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <Lightbulb className={`w-6 h-6 ${
                                        formData.entrepreneurship_stage === 'vision' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.entrepreneurship_stage === 'vision' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Vision Stage
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Clarify your business idea and create a strategic foundation
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>You're in the idea phase, clarifying your purpose and unique value</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on market research, validating concepts, and strategic planning</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Laying essential groundwork before building or launching</span>
                                </li>
                            </ul>
                        </button>

                        <button
                            onClick={() => handleInputChange('entrepreneurship_stage', 'startup')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.entrepreneurship_stage === 'startup'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.entrepreneurship_stage === 'startup'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <Rocket className={`w-6 h-6 ${
                                        formData.entrepreneurship_stage === 'startup' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.entrepreneurship_stage === 'startup' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Startup Stage
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Launch your MVP and craft a unique customer journey to acquire your first customers
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Actively building your product/service, developing systems, and preparing to launch</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on customer acquisition, initial sales, and establishing operations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Aiming to gain traction and prove your business model</span>
                                </li>
                            </ul>
                        </button>

                        <button
                            onClick={() => handleInputChange('entrepreneurship_stage', 'growth')}
                            className={`p-6 rounded-lg border-2 text-left transition-all ${
                                formData.entrepreneurship_stage === 'growth'
                                    ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-3 rounded-lg ${
                                    formData.entrepreneurship_stage === 'growth'
                                        ? 'bg-[var(--primary-gold)]' 
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}>
                                    <TrendingUp className={`w-6 h-6 ${
                                        formData.entrepreneurship_stage === 'growth' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                    }`} />
                                </div>
                                {formData.entrepreneurship_stage === 'growth' && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">
                                Growth Stage
                            </h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Build systems, optimize your current ones and customer journey, and automate to scale your proven business model
                            </p>
                            <ul className="space-y-2 text-xs text-[var(--text-soft)]">
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>You have consistent revenue and customers, ready to expand</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Focus on optimizing processes, scaling operations, and building a team</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[var(--primary-gold)] mr-2">•</span>
                                    <span>Looking to solidify market position and explore new opportunities</span>
                                </li>
                            </ul>
                        </button>
                    </div>
                </div>
            )
        },
        {
            title: "Let's personalize your path 🎯",
            description: "Answer a few quick questions so we can recommend the best 90-day goal for you",
            content: <Step4Content formData={formData} handleInputChange={handleInputChange} availableGoals={availableGoals} />
        },
        {
            title: "Choose your 90-day goal",
            description: "Select the specific outcome you want to achieve in the next 90 days",
            content: (
                <div className="space-y-6">
                    {(formData.business_type === 'non_profit' || formData.business_type === 'social_business') && formData.selected_goal && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-700 rounded-lg flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-[var(--text-main)] text-sm">
                                    {formData.business_type === 'non_profit' ? '❤️ Non-Profit Roadmap Auto-Selected' : '🌍 Social Business Roadmap Auto-Selected'}
                                </p>
                                <p className="text-xs text-[var(--text-soft)] mt-1">
                                    We've automatically selected the best 90-day roadmap for your {formData.business_type === 'non_profit' ? 'non-profit organization' : 'social business'}. You can still choose a different goal below.
                                </p>
                            </div>
                        </div>
                    )}
                    {!formData.entrepreneurship_stage || !formData.business_type ? (
                        <div className="text-center py-12">
                            <p className="text-[var(--text-soft)]">Please select your business type and entrepreneurship stage first</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {availableGoals.map((goal) => {
                                const isSelected = formData.selected_goal === goal.id;
                                
                                return (
                                    <button
                                       key={goal.id}
                                       onClick={() => handleInputChange('selected_goal', goal.id)}
                                       className={`p-6 rounded-lg border-2 text-left transition-all ${
                                           isSelected
                                               ? 'border-[var(--primary-gold)] bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                                               : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[var(--primary-gold)] hover:shadow-md'
                                       }`}
                                    >
                                       <div className="flex items-center justify-between mb-4">
                                           <div className="flex items-center space-x-3">
                                               <div className={`p-3 rounded-lg ${
                                                   isSelected 
                                                       ? 'bg-[var(--primary-gold)]' 
                                                       : 'bg-gray-100 dark:bg-gray-700'
                                               }`}>
                                                   {goal.isNiche ? (
                                                       <span className="text-2xl">{goal.icon}</span>
                                                   ) : (
                                                       <Target className={`w-6 h-6 ${
                                                           isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                                       }`} />
                                                   )}
                                               </div>
                                               {isSelected && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
                                           </div>
                                           {goal.isNiche && (
                                               <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full font-semibold">
                                                   Niche Focus
                                               </span>
                                           )}
                                       </div>
                                       <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                                           {goal.title}
                                       </h3>
                                       <p className="text-sm text-[var(--text-soft)]">
                                           {goal.description}
                                       </p>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )
        },
        {
            title: "You're all set! 🎉",
            description: "Let's start your 90-day journey to success",
            content: (
                <div className="space-y-6 text-center max-w-3xl mx-auto">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--text-main)]">Ready to Transform Your Business!</h2>
                    <p className="text-lg text-[var(--text-soft)]">
                        You've chosen the <strong>{formData.entrepreneurship_stage} stage</strong> for your{' '}
                        <strong>{formData.business_type === 'for_profit' ? 'For-Profit Business' : formData.business_type === 'non_profit' ? 'Non-Profit Organization' : 'Social Business'}</strong> and your goal is to{' '}
                        <strong>{availableGoals.find(g => g.id === formData.selected_goal)?.title}</strong>.
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">What happens next?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[var(--primary-gold)] flex items-center justify-center text-white font-bold">
                                        1
                                    </div>
                                    <h4 className="font-semibold text-[var(--text-main)]">Your Dashboard</h4>
                                </div>
                                <p className="text-sm text-[var(--text-soft)]">
                                    See your personalized 90-day roadmap with weekly goals
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[var(--primary-gold)] flex items-center justify-center text-white font-bold">
                                        2
                                    </div>
                                    <h4 className="font-semibold text-[var(--text-main)]">Daily Tracking</h4>
                                </div>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Log your progress and complete daily tasks
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[var(--primary-gold)] flex items-center justify-center text-white font-bold">
                                        3
                                    </div>
                                    <h4 className="font-semibold text-[var(--text-main)]">AI Support</h4>
                                </div>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Get help from your team of AI business experts
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-[var(--primary-gold)] flex items-center justify-center text-white font-bold">
                                        4
                                    </div>
                                    <h4 className="font-semibold text-[var(--text-main)]">Live Strategy Sessions</h4>
                                </div>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Join our bi-weekly live sessions every Tuesday & Thursday
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-700">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full flex-shrink-0">
                                <CalendarDays className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-left flex-1">
                                <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">🎉 Don't Miss Our Live Strategy Sessions!</h4>
                                <p className="text-sm text-[var(--text-soft)] mb-3">
                                    Join us every <strong>Tuesday & Thursday</strong> for live training, Q&A, and community connection. 
                                    Get expert guidance and network with fellow entrepreneurs!
                                </p>
                                <Link 
                                    to={createPageUrl('LiveWebinar')} 
                                    className="btn btn-primary inline-flex items-center text-sm"
                                >
                                    <CalendarDays className="w-4 h-4 mr-2" />
                                    View Session Schedule
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                        <p className="text-sm text-[var(--text-main)]">
                            💡 <strong>Pro Tip:</strong> Set aside 30-60 minutes each day to work on your roadmap tasks. Consistency is key to success!
                        </p>
                    </div>
                </div>
            )
        }
    ];

    const isStepValid = () => {
        switch (currentStep) {
            case 0: return true;
            case 1: return formData.first_name && formData.last_name && formData.business_name && formData.company_size && formData.legal_structure;
            case 2: return formData.business_type !== '';
            case 3: return formData.entrepreneurship_stage !== '';
            case 4: return formData.step4_focus !== '' && formData.step4_challenge !== '';
            case 5: return formData.selected_goal !== '';
            case 6: return true;
            default: return false;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <Loader2 className="w-12 h-12 text-[var(--primary-gold)] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[var(--text-soft)]">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <span className="text-sm font-medium text-[var(--primary-gold)]">
                            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="card p-8 mb-6">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-2">
                            {steps[currentStep].title}
                        </h1>
                        <p className="text-[var(--text-soft)]">
                            {steps[currentStep].description}
                        </p>
                    </div>

                    {steps[currentStep].content}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>

                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            Continue
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={!isStepValid() || loading}
                            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Start My Journey
                                    <Rocket className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}