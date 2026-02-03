import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Users, Save, Loader2, CheckCircle, ArrowLeft, 
    Target, Heart, TrendingUp, AlertCircle, Sparkles, HelpCircle, Brain, DollarSign
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';

export default function StrategyFormIdealClient() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);

    const [formData, setFormData] = useState({
        // Demographics
        age_range: '',
        gender: '',
        location: '',
        income_level: '',
        education: '',
        occupation: '',
        
        // Psychographics
        values: '',
        interests: '',
        lifestyle: '',
        personality_traits: '',
        
        // Pain Points & Goals
        biggest_challenge: '',
        frustrations: '',
        fears: '',
        desired_outcome: '',
        goals: '',
        
        // Behavior
        buying_behavior: '',
        decision_making_process: '',
        objections: '',
        preferred_communication: '',
        
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
                    <p className="text-sm text-[var(--text-soft)] mb-4">Basic factual information about your ideal client</p>

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
                                <option value="Non-binary">Non-binary</option>
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
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Core Values (Select all that apply)</label>
                            <select
                                multiple
                                value={formData.values ? formData.values.split(', ') : []}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setFormData({ ...formData, values: selected.join(', ') });
                                }}
                                className="form-input"
                                size="6"
                            >
                                <option value="Family">Family</option>
                                <option value="Freedom">Freedom</option>
                                <option value="Innovation">Innovation</option>
                                <option value="Quality">Quality</option>
                                <option value="Success">Success</option>
                                <option value="Growth">Growth</option>
                                <option value="Community">Community</option>
                                <option value="Health">Health</option>
                                <option value="Security">Security</option>
                                <option value="Adventure">Adventure</option>
                            </select>
                            <p className="text-xs text-[var(--text-soft)] mt-1">Hold Ctrl/Cmd to select multiple</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Interests & Hobbies (Select all that apply)</label>
                            <select
                                multiple
                                value={formData.interests ? formData.interests.split(', ') : []}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setFormData({ ...formData, interests: selected.join(', ') });
                                }}
                                className="form-input"
                                size="6"
                            >
                                <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                                <option value="Technology">Technology</option>
                                <option value="Health & Fitness">Health & Fitness</option>
                                <option value="Travel">Travel</option>
                                <option value="Reading">Reading</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts & Creativity">Arts & Creativity</option>
                                <option value="Personal Development">Personal Development</option>
                                <option value="Networking">Networking</option>
                                <option value="Investing">Investing</option>
                            </select>
                            <p className="text-xs text-[var(--text-soft)] mt-1">Hold Ctrl/Cmd to select multiple</p>
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
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Personality Traits (Select all that apply)</label>
                            <select
                                multiple
                                value={formData.personality_traits ? formData.personality_traits.split(', ') : []}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setFormData({ ...formData, personality_traits: selected.join(', ') });
                                }}
                                className="form-input"
                                size="6"
                            >
                                <option value="Ambitious">Ambitious</option>
                                <option value="Analytical">Analytical</option>
                                <option value="Creative">Creative</option>
                                <option value="Detail-oriented">Detail-oriented</option>
                                <option value="Decisive">Decisive</option>
                                <option value="Risk-taker">Risk-taker</option>
                                <option value="Cautious">Cautious</option>
                                <option value="Introverted">Introverted</option>
                                <option value="Extroverted">Extroverted</option>
                                <option value="Optimistic">Optimistic</option>
                            </select>
                            <p className="text-xs text-[var(--text-soft)] mt-1">Hold Ctrl/Cmd to select multiple</p>
                        </div>
                    </div>
                </div>

                {/* Pain Points & Goals Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-orange-600" />
                        Pain Points & Goals
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">What keeps them up at night and what they're trying to achieve</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                <AlertCircle className="w-4 h-4 inline mr-1 text-red-500" />
                                Biggest Challenge (Most Important!)
                            </label>
                            <textarea
                                value={formData.biggest_challenge}
                                onChange={(e) => setFormData({ ...formData, biggest_challenge: e.target.value })}
                                className="form-input border-red-200 dark:border-red-700"
                                rows="3"
                                placeholder="What is THE problem they're desperate to solve?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Daily Frustrations</label>
                            <textarea
                                value={formData.frustrations}
                                onChange={(e) => setFormData({ ...formData, frustrations: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What frustrates them on a daily basis?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Fears & Concerns</label>
                            <textarea
                                value={formData.fears}
                                onChange={(e) => setFormData({ ...formData, fears: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What are they afraid of? What keeps them from taking action?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                <Heart className="w-4 h-4 inline mr-1 text-green-500" />
                                Desired Outcome
                            </label>
                            <textarea
                                value={formData.desired_outcome}
                                onChange={(e) => setFormData({ ...formData, desired_outcome: e.target.value })}
                                className="form-input border-green-200 dark:border-green-700"
                                rows="3"
                                placeholder="What does success look like for them? What transformation do they want?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Goals & Aspirations</label>
                            <textarea
                                value={formData.goals}
                                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What are they working towards?"
                            />
                        </div>
                    </div>
                </div>

                {/* Behavior Section */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        Buying Behavior
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">How they make purchase decisions</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Typical Buying Behavior</label>
                            <textarea
                                value={formData.buying_behavior}
                                onChange={(e) => setFormData({ ...formData, buying_behavior: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Do they research extensively? Impulse buy? Look for deals?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Decision-Making Process</label>
                            <textarea
                                value={formData.decision_making_process}
                                onChange={(e) => setFormData({ ...formData, decision_making_process: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What influences their decision? Testimonials? Data? Recommendations?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Common Objections</label>
                            <textarea
                                value={formData.objections}
                                onChange={(e) => setFormData({ ...formData, objections: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="What objections do they typically have? (price, time, skepticism, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Preferred Communication Channels</label>
                            <textarea
                                value={formData.preferred_communication}
                                onChange={(e) => setFormData({ ...formData, preferred_communication: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Email? Social media? Phone? In-person?"
                            />
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