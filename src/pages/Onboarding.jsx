import React, { useState, useEffect, useMemo } from 'react';
import { User as UserIcon, Building, Target, Rocket, CheckCircle, ChevronRight, Sparkles, TrendingUp, Lightbulb, Award, Loader2, CalendarDays } from 'lucide-react';
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import roadmapData from '@/components/roadmap';

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
        interested_in_media_production: false
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            
            // Pre-fill form with existing user data if available
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
                interested_in_media_production: currentUser.interested_in_media_production || false
            }));
            
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getStageIcon = (stage) => {
        switch (stage) {
            case 'vision': return Lightbulb;
            case 'startup': return Rocket;
            case 'growth': return TrendingUp;
            default: return Target;
        }
    };

    const getGoalIcon = (goalId) => {
        if (goalId && goalId.includes('authority')) return Award;
        if (goalId && goalId.includes('community')) return UserIcon;
        return Target;
    };

    const availableGoals = useMemo(() => {
        if (!formData.entrepreneurship_stage) return [];
        
        const stageData = roadmapData.default?.[formData.entrepreneurship_stage] || roadmapData[formData.entrepreneurship_stage];
        if (!stageData || !stageData.goals) return [];
        
        return Object.entries(stageData.goals).map(([id, goal]) => ({
            id,
            title: goal.title,
            description: goal.description
        }));
    }, [formData.entrepreneurship_stage]);

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
                        You're about to embark on a transformative 90-day journey designed specifically for your stage of business. 
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
                        <input
                            type="text"
                            value={formData.industry}
                            onChange={(e) => handleInputChange('industry', e.target.value)}
                            className="form-input w-full"
                            placeholder="e.g., Tech, Consulting, E-commerce"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Website (Optional)
                        </label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="form-input w-full"
                            placeholder="https://www.mybusiness.com"
                        />
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
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="LLC">LLC (Limited Liability Company)</option>
                            <option value="S-Corp">S-Corp</option>
                            <option value="C-Corp">C-Corp</option>
                            <option value="Partnership">Partnership</option>
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

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.interested_in_media_production}
                                onChange={(e) => handleInputChange('interested_in_media_production', e.target.checked)}
                                className="mt-1"
                            />
                            <div>
                                <p className="font-medium text-[var(--text-main)]">
                                    I'm interested in media production services
                                </p>
                                <p className="text-sm text-[var(--text-soft)] mt-1">
                                    Get information about podcast production, radio shows, and content creation services from The Beacon and Equalizer Radio.
                                </p>
                            </div>
                        </label>
                    </div>
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
            title: "Choose your 90-day goal",
            description: "Select the specific outcome you want to achieve in the next 90 days",
            content: (
                <div className="space-y-6">
                    {!formData.entrepreneurship_stage ? (
                        <div className="text-center py-12">
                            <p className="text-[var(--text-soft)]">Please select your entrepreneurship stage first</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {availableGoals.map((goal) => {
                                const GoalIcon = getGoalIcon(goal.id);
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
                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className={`p-3 rounded-lg ${
                                                isSelected 
                                                    ? 'bg-[var(--primary-gold)]' 
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            }`}>
                                                <GoalIcon className={`w-6 h-6 ${
                                                    isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                                }`} />
                                            </div>
                                            {isSelected && <CheckCircle className="w-6 h-6 text-[var(--primary-gold)]" />}
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
                        You've chosen the <strong>{formData.entrepreneurship_stage} stage</strong> and your goal is to{' '}
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
                                    <h4 className="font-semibold text-[var(--text-main)]">Live Webinars</h4>
                                </div>
                                <p className="text-sm text-[var(--text-soft)]">
                                    Join our bi-weekly live sessions every 1st & 3rd Thursday
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
                                <h4 className="font-bold text-lg text-[var(--text-main)] mb-2">🎉 Don't Miss Our Live Webinars!</h4>
                                <p className="text-sm text-[var(--text-soft)] mb-3">
                                    Join us every <strong>1st & 3rd Thursday</strong> for live training, Q&A, and community connection. 
                                    Get expert guidance and network with fellow entrepreneurs!
                                </p>
                                <Link 
                                    to={createPageUrl('LiveWebinar')} 
                                    className="btn btn-primary inline-flex items-center text-sm"
                                >
                                    <CalendarDays className="w-4 h-4 mr-2" />
                                    View Webinar Schedule
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
            case 2: return formData.entrepreneurship_stage !== '';
            case 3: return formData.selected_goal !== '';
            case 4: return true;
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