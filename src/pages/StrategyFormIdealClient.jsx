import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Users, Save, Loader2, CheckCircle, ArrowLeft, 
    Target, Heart, TrendingUp, AlertCircle, Sparkles, HelpCircle, Brain, DollarSign, Plus, X
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import IdealClientOverview from '@/components/strategy/IdealClientOverview';

// Dropdown options matching Customer Journey form
const DEMOGRAPHICS_OPTIONS = {
    age_range: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    gender: ['All', 'Female', 'Male'],
    location: ['Urban', 'Suburban', 'Rural', 'North America', 'Europe', 'Asia', 'Global/Online'],
    income_level: ['Under $30k', '$30k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k-$250k', '$250k+'],
    education: ['High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate', 'Self-Taught/Trade School'],
    occupation: ['Business Owner', 'Entrepreneur', 'Executive/Manager', 'Professional/Specialist', 'Freelancer/Consultant', 'Creative/Artist', 'Healthcare', 'Education', 'Technology', 'Other']
};

const BUYING_BEHAVIORS_OPTIONS = {
    research_method: ['Google search', 'Social media', 'Recommendations', 'Reviews/testimonials', 'YouTube videos', 'Podcasts', 'Industry publications'],
    decision_speed: ['Impulsive (same day)', 'Quick (within a week)', 'Moderate (1-2 weeks)', 'Careful (several weeks)', 'Very deliberate (months)'],
    price_sensitivity: ['Budget-conscious', 'Value-focused', 'Quality over price', 'Premium buyer'],
    preferred_contact: ['Email', 'Phone', 'Text/SMS', 'In-person', 'Video call', 'Live chat', 'Social media DM']
};

const PSYCHOGRAPHICS_SUGGESTIONS = ['Innovation', 'Tradition', 'Family', 'Success', 'Freedom', 'Security', 'Community', 'Sustainability', 'Efficiency', 'Quality', 'Technology', 'Business', 'Health & Fitness', 'Travel', 'Arts & Culture', 'Sports', 'Education', 'Finance', 'Entertainment', 'Food & Dining', 'Fast-paced', 'Balanced', 'Minimalist', 'Luxury-oriented', 'Family-focused', 'Career-driven', 'Health-conscious', 'Adventure-seeking', 'Analytical', 'Creative', 'Pragmatic', 'Innovative', 'Traditional', 'Risk-taker', 'Cautious', 'Social', 'Independent'];

const PAIN_POINTS_SUGGESTIONS = ['Lack of time', 'Limited budget', 'Information overload', 'Fear of failure', 'Unclear direction', 'Poor work-life balance', 'Difficulty scaling', 'Technology challenges', 'Marketing struggles', 'Cash flow issues', 'Finding reliable help', 'Competition pressure'];

const GOALS_SUGGESTIONS = ['Start a business', 'Grow existing business', 'Achieve financial freedom', 'Better work-life balance', 'Build passive income', 'Become an expert', 'Help others', 'Create legacy', 'Increase revenue', 'Reduce stress', 'Gain more customers', 'Improve efficiency'];

const VALUES_SUGGESTIONS = ['Integrity', 'Excellence', 'Innovation', 'Family', 'Community', 'Growth', 'Transparency', 'Sustainability', 'Empowerment', 'Reliability', 'Creativity', 'Service'];

// Multi-value input component
const MultiValueInput = ({ values = [], onChange, suggestions = [], placeholder = "Type and press Enter" }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const safeValues = Array.isArray(values) ? values : [];

    const addValue = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue && !safeValues.includes(trimmedValue)) {
            onChange([...safeValues, trimmedValue]);
            setInputValue('');
            setShowSuggestions(false);
        }
    };

    const removeValue = (index) => {
        onChange(safeValues.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addValue(inputValue);
        } else if (e.key === 'Tab' && inputValue && showSuggestions && filteredSuggestions.length > 0) {
            e.preventDefault();
            addValue(filteredSuggestions[0]);
        }
    };

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase()) && !safeValues.includes(s)
    );

    return (
        <div className="space-y-2">
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(inputValue.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    placeholder={placeholder}
                    className="form-input pr-12"
                />
                <button
                    type="button"
                    onClick={() => addValue(inputValue)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary text-xs py-1 px-3"
                    disabled={!inputValue.trim()}
                >
                    <Plus className="w-4 h-4" />
                </button>

                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => addValue(suggestion)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-[var(--text-main)]"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {safeValues.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {safeValues.map((value, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--primary-gold)] text-white rounded-full text-sm"
                        >
                            {value}
                            <button
                                type="button"
                                onClick={() => removeValue(index)}
                                className="hover:bg-white/20 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function StrategyFormIdealClient() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [activeTab, setActiveTab] = useState('form');

    const [formData, setFormData] = useState({
        // Demographics
        age_range: '',
        gender: '',
        location: '',
        income_level: '',
        education: '',
        occupation: '',
        
        // Psychographics - now arrays
        psychographics: [],
        pain_points: [],
        goals: [],
        core_values: [],
        
        // Buying Behaviors - now single dropdowns
        research_method: '',
        decision_speed: '',
        price_sensitivity: '',
        preferred_contact: '',
        
        // Identity
        how_they_describe_themselves: '',
        aspirations: '',
        
        // Summary
        client_avatar_name: '',
        day_in_the_life: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({ 
                created_by: userData.email,
                document_type: 'ideal_client'
            });

            if (docs && docs.length > 0) {
                const doc = docs[0];
                setFormData(doc.content);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docs = await StrategyDocument.filter({ 
                created_by: user.email,
                document_type: 'ideal_client'
            });

            const docData = {
                document_type: 'ideal_client',
                title: 'My Ideal Client Profile',
                content: formData,
                is_completed: true,
                last_updated: new Date().toISOString()
            };

            if (docs && docs.length > 0) {
                await StrategyDocument.update(docs[0].id, docData);
            } else {
                await StrategyDocument.create(docData);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Define Your Ideal Client</h1>
                            <p className="text-[var(--text-soft)]">Understand who you serve at a deep level</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                    <button
                        onClick={() => setActiveTab('form')}
                        className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'form' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)]' : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'}`}
                    >
                        Edit Form
                    </button>
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'border-b-2 border-[var(--primary-gold)] text-[var(--primary-gold)]' : 'text-[var(--text-soft)] hover:text-[var(--text-main)]'}`}
                    >
                        View Client Profile
                    </button>
                </div>

                {activeTab === 'overview' && <IdealClientOverview formData={formData} />}

                {activeTab === 'form' && <>
                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Define Your Ideal Client?</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                When you try to serve everyone, you end up serving no one effectively. Defining your ideal client helps you:
                            </p>
                            <ul className="text-sm text-[var(--text-soft)] space-y-1 list-disc list-inside">
                                <li>Create marketing messages that resonate deeply</li>
                                <li>Build products/services that solve real problems</li>
                                <li>Attract the right customers who value what you offer</li>
                                <li>Avoid wasting time on poor-fit prospects</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Demographics Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Demographics
                    </h3>
                    
                    <div className="mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 text-sm">
                        <p className="mb-2"><strong className="text-blue-700 dark:text-blue-400">Why it matters:</strong> Demographics define the "skeleton" of your customer—who they are on paper. This is essential for targeting ads (e.g., Facebook audiences) and pricing correctly.</p>
                        <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A luxury watch brand targets "Men, 40-60, Income $150k+" because they have the buying power. Targeting "Teenagers" would waste ad budget.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Age Range</label>
                            <select
                                value={formData.age_range}
                                onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select age range</option>
                                <option value="18-24">18-24 years old</option>
                                <option value="25-34">25-34 years old</option>
                                <option value="35-44">35-44 years old</option>
                                <option value="45-54">45-54 years old</option>
                                <option value="55-64">55-64 years old</option>
                                <option value="65+">65+ years old</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select gender</option>
                                <option value="All">All genders</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Location</label>
                            <select
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select location</option>
                                <option value="Urban">Urban areas</option>
                                <option value="Suburban">Suburban areas</option>
                                <option value="Rural">Rural areas</option>
                                <option value="North America">North America</option>
                                <option value="Europe">Europe</option>
                                <option value="Asia">Asia</option>
                                <option value="Global">Global/Online</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                <DollarSign className="w-4 h-4 inline mr-1" />
                                Income Level
                            </label>
                            <select
                                value={formData.income_level}
                                onChange={(e) => setFormData({ ...formData, income_level: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select income level</option>
                                <option value="Under $30k">Under $30k</option>
                                <option value="$30k-$50k">$30k-$50k</option>
                                <option value="$50k-$75k">$50k-$75k</option>
                                <option value="$75k-$100k">$75k-$100k</option>
                                <option value="$100k-$150k">$100k-$150k</option>
                                <option value="$150k-$250k">$150k-$250k</option>
                                <option value="$250k+">$250k+</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Education</label>
                            <select
                                value={formData.education}
                                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select education level</option>
                                <option value="High School">High School</option>
                                <option value="Some College">Some College</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="Doctorate">Doctorate</option>
                                <option value="Self-Taught/Trade School">Self-Taught/Trade School</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Occupation</label>
                            <select
                                value={formData.occupation}
                                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select occupation</option>
                                <option value="Business Owner">Business Owner</option>
                                <option value="Entrepreneur">Entrepreneur</option>
                                <option value="Executive/Manager">Executive/Manager</option>
                                <option value="Professional/Specialist">Professional/Specialist</option>
                                <option value="Freelancer/Consultant">Freelancer/Consultant</option>
                                <option value="Creative/Artist">Creative/Artist</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Technology">Technology</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Psychographics Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-purple-600" />
                        Psychographics
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Their mindset, values, and personality</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-3">Core Values (Select all that apply)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Family', 'Freedom', 'Innovation', 'Quality', 'Success', 'Growth', 'Community', 'Health', 'Security', 'Adventure'].map(value => {
                                    const isSelected = formData.values && formData.values.split(', ').includes(value);
                                    return (
                                        <label key={value} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    const current = formData.values ? formData.values.split(', ').filter(v => v) : [];
                                                    const updated = e.target.checked
                                                        ? [...current, value]
                                                        : current.filter(v => v !== value);
                                                    setFormData({ ...formData, values: updated.join(', ') });
                                                }}
                                                className="w-4 h-4 text-[var(--primary-gold)] border-gray-300 rounded focus:ring-[var(--primary-gold)]"
                                            />
                                            <span className="text-sm text-[var(--text-main)]">{value}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-3">Interests & Hobbies (Select all that apply)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {['Business & Entrepreneurship', 'Technology', 'Health & Fitness', 'Travel', 'Reading', 'Sports', 'Arts & Creativity', 'Personal Development', 'Networking', 'Investing'].map(interest => {
                                    const isSelected = formData.interests && formData.interests.split(', ').includes(interest);
                                    return (
                                        <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    const current = formData.interests ? formData.interests.split(', ').filter(v => v) : [];
                                                    const updated = e.target.checked
                                                        ? [...current, interest]
                                                        : current.filter(v => v !== interest);
                                                    setFormData({ ...formData, interests: updated.join(', ') });
                                                }}
                                                className="w-4 h-4 text-[var(--primary-gold)] border-gray-300 rounded focus:ring-[var(--primary-gold)]"
                                            />
                                            <span className="text-sm text-[var(--text-main)]">{interest}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Lifestyle</label>
                            <select
                                value={formData.lifestyle}
                                onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select lifestyle</option>
                                <option value="Fast-paced & Busy">Fast-paced & Busy</option>
                                <option value="Balanced & Structured">Balanced & Structured</option>
                                <option value="Flexible & Spontaneous">Flexible & Spontaneous</option>
                                <option value="Work-focused">Work-focused</option>
                                <option value="Family-focused">Family-focused</option>
                                <option value="Health-conscious">Health-conscious</option>
                                <option value="Social & Active">Social & Active</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-3">Personality Traits (Select all that apply)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Ambitious', 'Analytical', 'Creative', 'Detail-oriented', 'Decisive', 'Risk-taker', 'Cautious', 'Introverted', 'Extroverted', 'Optimistic'].map(trait => {
                                    const isSelected = formData.personality_traits && formData.personality_traits.split(', ').includes(trait);
                                    return (
                                        <label key={trait} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    const current = formData.personality_traits ? formData.personality_traits.split(', ').filter(v => v) : [];
                                                    const updated = e.target.checked
                                                        ? [...current, trait]
                                                        : current.filter(v => v !== trait);
                                                    setFormData({ ...formData, personality_traits: updated.join(', ') });
                                                }}
                                                className="w-4 h-4 text-[var(--primary-gold)] border-gray-300 rounded focus:ring-[var(--primary-gold)]"
                                            />
                                            <span className="text-sm text-[var(--text-main)]">{trait}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pain Points Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        Pain Points
                    </h3>
                    
                    <div className="mb-6 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-800/30 text-sm">
                        <p className="mb-2"><strong className="text-red-700 dark:text-red-400">Why it matters:</strong> People don't buy products; they buy solutions to problems. Identifying deep pain points allows you to position your offer as the cure.</p>
                        <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A busy mom doesn't just want a "meal kit." Her pain point is "guilt over feeding her kids fast food." The solution is "peace of mind."</p>
                    </div>

                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        What problems or frustrations do they face?
                    </label>
                    <MultiValueInput
                        values={formData.pain_points}
                        onChange={(values) => setFormData({ ...formData, pain_points: values })}
                        suggestions={PAIN_POINTS_SUGGESTIONS}
                        placeholder="Add pain points (e.g., Lack of time, Limited budget)"
                    />
                    <p className="text-xs text-[var(--text-soft)] mt-2">Understanding their pain points helps you create targeted solutions.</p>
                </div>

                {/* Goals & Aspirations Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-green-600" />
                        Goals & Aspirations
                    </h3>
                    
                    <div className="mb-6 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800/30 text-sm">
                        <p className="mb-2"><strong className="text-green-700 dark:text-green-400">Why it matters:</strong> This is where your customer <em>wants</em> to be. Your product is the bridge between their current pain and their future goal.</p>
                        <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> A freelance writer buys a course not just to "learn SEO," but to achieve the goal of "Working from Bali." Sell the destination.</p>
                    </div>

                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        What are they trying to achieve?
                    </label>
                    <MultiValueInput
                        values={formData.goals}
                        onChange={(values) => setFormData({ ...formData, goals: values })}
                        suggestions={GOALS_SUGGESTIONS}
                        placeholder="Add goals (e.g., Start a business, Achieve financial freedom)"
                    />
                    <p className="text-xs text-[var(--text-soft)] mt-2">Their goals drive their decisions and actions.</p>
                </div>

                {/* Core Values Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-indigo-600" />
                        Core Values
                    </h3>
                    
                    <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30 text-sm">
                        <p className="mb-2"><strong className="text-indigo-700 dark:text-indigo-400">Why it matters:</strong> Shared values build trust and long-term loyalty. Customers buy from brands that believe what they believe.</p>
                        <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> Patagonia customers pay 2x more for a jacket because they share the value of "Environmental Protection." They are buying identity.</p>
                    </div>

                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        What principles guide their decisions?
                    </label>
                    <MultiValueInput
                        values={formData.core_values}
                        onChange={(values) => setFormData({ ...formData, core_values: values })}
                        suggestions={VALUES_SUGGESTIONS}
                        placeholder="Add core values (e.g., Integrity, Innovation, Family)"
                    />
                    <p className="text-xs text-[var(--text-soft)] mt-2">Core values help you align your messaging with what matters most to them.</p>
                </div>

                {/* Buying Behaviors Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                        Buying Behaviors
                    </h3>
                    
                    <div className="mb-6 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-100 dark:border-orange-800/30 text-sm">
                        <p className="mb-2"><strong className="text-orange-700 dark:text-orange-400">Why it matters:</strong> Knowing <em>how</em> they buy removes friction. Mismatching your sales process with their buying style kills sales.</p>
                        <p className="italic text-[var(--text-soft)]"><strong className="not-italic text-[var(--text-main)]">Example:</strong> An impulse buyer (fashion) needs a "1-Click Checkout." A careful buyer (software) needs a "Free Trial" and case studies.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Research Method</label>
                            <select
                                value={formData.research_method}
                                onChange={(e) => setFormData({ ...formData, research_method: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select research method</option>
                                {BUYING_BEHAVIORS_OPTIONS.research_method.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Decision Speed</label>
                            <select
                                value={formData.decision_speed}
                                onChange={(e) => setFormData({ ...formData, decision_speed: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select decision speed</option>
                                {BUYING_BEHAVIORS_OPTIONS.decision_speed.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Price Sensitivity</label>
                            <select
                                value={formData.price_sensitivity}
                                onChange={(e) => setFormData({ ...formData, price_sensitivity: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select price sensitivity</option>
                                {BUYING_BEHAVIORS_OPTIONS.price_sensitivity.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Preferred Contact Method</label>
                            <select
                                value={formData.preferred_contact}
                                onChange={(e) => setFormData({ ...formData, preferred_contact: e.target.value })}
                                className="form-input"
                            >
                                <option value="">Select contact method</option>
                                {BUYING_BEHAVIORS_OPTIONS.preferred_contact.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Identity & Summary Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">Create Your Client Avatar</h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Bring your ideal client to life</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Give Them a Name</label>
                            <input
                                type="text"
                                value={formData.client_avatar_name}
                                onChange={(e) => setFormData({ ...formData, client_avatar_name: e.target.value })}
                                className="form-input"
                                placeholder="e.g., Sarah the Startup Founder"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">How They Describe Themselves</label>
                            <textarea
                                value={formData.how_they_describe_themselves}
                                onChange={(e) => setFormData({ ...formData, how_they_describe_themselves: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="If they had to describe themselves in a few sentences, what would they say?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">A Day in Their Life</label>
                            <textarea
                                value={formData.day_in_the_life}
                                onChange={(e) => setFormData({ ...formData, day_in_the_life: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="Walk through a typical day from their perspective..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Their Aspirations</label>
                            <textarea
                                value={formData.aspirations}
                                onChange={(e) => setFormData({ ...formData, aspirations: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Where do they see themselves in 1, 5, 10 years?"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sticky bottom-20 md:bottom-6 z-10">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex-1"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Save Ideal Client Profile
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowAIAssistant(true)}
                        className="btn btn-secondary"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get AI Help
                    </button>
                </div>
                </>}
            </div>

            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="ava"
                sectionTitle="Ideal Client Profile"
            />
        </div>
    );
}