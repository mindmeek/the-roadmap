import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Award, CheckCircle2, XCircle, Loader2, AlertCircle, Save, Sparkles, FileText, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function MemberOfTheMonthSubmission() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [generatedArticle, setGeneratedArticle] = useState('');
    const [generatingArticle, setGeneratingArticle] = useState(false);
    const [showArticlePreview, setShowArticlePreview] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [eligibility, setEligibility] = useState({
        introduced_in_community: false,
        has_90_day_plan: false,
        startup_or_growth_stage: false,
        foundation_roadmap_progress: false,
        active_engagement: false,
        has_business_profile: false,
        meaningful_connections: false,
        shared_win_or_milestone: false
    });
    const [isEligible, setIsEligible] = useState(false);
    const [formData, setFormData] = useState({
        business_name: '',
        business_description: '',
        industry: '',
        years_in_business: '',
        biggest_challenge: '',
        how_overcame: '',
        proudest_moment: '',
        advice_to_others: '',
        future_vision: '',
        why_started: '',
        daily_routine: '',
        tools_resources: '',
        community_impact: '',
        theindex_profile_url: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        checkEligibility();
    }, []);

    const checkEligibility = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            // Check for existing submission first
            const existingHighlights = await base44.entities.CommunityHighlight.filter({ 
                member_email: currentUser.email 
            });

            if (existingHighlights.length > 0) {
                const existing = existingHighlights[0];
                setExistingSubmission(existing);
                
                // Use saved eligibility checklist if it exists
                if (existing.eligibility_checklist) {
                    setEligibility(existing.eligibility_checklist);
                    setIsEligible(Object.values(existing.eligibility_checklist).every(v => v === true));
                }
                
                if (existing.submission_answers) {
                    setFormData(existing.submission_answers);
                }
            }

            // Pre-fill business info if available
            const businesses = await base44.entities.Business.filter({ owner_user_id: currentUser.id });
            if (businesses.length > 0) {
                const biz = businesses[0];
                setFormData(prev => ({
                    ...prev,
                    business_name: prev.business_name || biz.name || '',
                    business_description: prev.business_description || biz.description || '',
                    industry: prev.industry || biz.industry || '',
                    theindex_profile_url: prev.theindex_profile_url || `https://theindex.cc/business/${biz.id}`
                }));
            }

        } catch (error) {
            console.error('Error checking eligibility:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRequirement = (key) => {
        setEligibility(prev => {
            const updated = { ...prev, [key]: !prev[key] };
            setIsEligible(Object.values(updated).every(v => v === true));
            return updated;
        });
    };

    const generateArticle = async () => {
        setGeneratingArticle(true);
        try {
            const result = await base44.integrations.Core.InvokeLLM({
                prompt: `Write a professional, inspiring article featuring ${formData.business_name} for The Business Minds Magazine's "Member of the Month" feature. 

Use this information:
- Business: ${formData.business_name}
- Industry: ${formData.industry}
- Years in Business: ${formData.years_in_business}
- Description: ${formData.business_description}
- Why They Started: ${formData.why_started}
- Biggest Challenge: ${formData.biggest_challenge}
- How They Overcame It: ${formData.how_overcame}
- Proudest Moment: ${formData.proudest_moment}
- Daily Routine: ${formData.daily_routine}
- Tools/Resources: ${formData.tools_resources}
- Advice to Others: ${formData.advice_to_others}
- Community Impact: ${formData.community_impact}
- Future Vision: ${formData.future_vision}

Write an engaging 800-1000 word article with:
1. Compelling introduction
2. Their entrepreneurial journey
3. Challenges and how they overcame them
4. Key insights and advice
5. Future vision
6. Call to action encouraging readers to connect with them

Use a professional yet conversational tone. Make it inspiring and actionable.`,
            });
            
            setGeneratedArticle(result);
            setShowArticlePreview(true);
        } catch (error) {
            console.error('Error generating article:', error);
            alert('Failed to generate article. Please try again.');
        } finally {
            setGeneratingArticle(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEligible && !existingSubmission) {
            alert('Please mark all requirements as complete before submitting.');
            return;
        }

        setSubmitting(true);
        try {
            const submissionData = {
                theindex_profile_url: formData.theindex_profile_url,
                submission_answers: formData,
                eligibility_checklist: eligibility,
                blog_post_intro: generatedArticle
            };

            if (existingSubmission) {
                await base44.entities.CommunityHighlight.update(existingSubmission.id, submissionData);
                alert('Your submission has been updated successfully!');
            } else {
                await base44.entities.CommunityHighlight.create({
                    member_user_id: user.id,
                    member_name: user.full_name,
                    member_email: user.email,
                    ...submissionData,
                    status: 'pending_review',
                    month_featured: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                });
                alert('Your submission has been received! Our team will verify your requirements and be in touch soon.');
            }
            navigate(createPageUrl('Dashboard'));
        } catch (error) {
            console.error('Error submitting:', error);
            alert('Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const eligibilityCriteria = [
        { key: 'introduced_in_community', label: 'Introduced yourself in the community (at least 1 post)', action: 'Go to Community', link: 'TheCommunity' },
        { key: 'has_90_day_plan', label: 'Have an active 90-day journey plan', action: 'Start Your Journey', link: 'Journey' },
        { key: 'startup_or_growth_stage', label: 'In Startup or Growth stage', action: 'Update Profile', link: 'Onboarding' },
        { key: 'foundation_roadmap_progress', label: 'Completed at least 50% of Foundation Roadmap', action: 'View Roadmap', link: 'MyFoundationRoadmap' },
        { key: 'active_engagement', label: 'Posted 3+ times or engaged in past 30 days', action: 'Go to Community', link: 'TheCommunity' },
        { key: 'has_business_profile', label: 'Have a business profile on TheIndex.cc', action: 'Create Profile', link: 'MyBusinesses' },
        { 
            key: 'meaningful_connections', 
            label: 'Follow 3+ members in our community (Members tab on thebminds.com)', 
            action: 'Go to Community', 
            link: 'TheCommunity'
        },
        { key: 'shared_win_or_milestone', label: 'Shared a win or milestone in community', action: 'Share a Win', link: 'TheCommunity' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 pb-24 md:pb-8">
            <div className="mb-6 sm:mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 rounded-full mb-3 sm:mb-4">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-2">Member of the Month</h1>
                <p className="text-[var(--text-soft)] text-base sm:text-lg px-4 mb-3">Get featured and inspire the community!</p>
                <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="text-left">
                            <p className="text-sm text-[var(--text-main)] font-semibold mb-1">Your Story in The Business Minds Magazine</p>
                            <p className="text-xs text-[var(--text-soft)]">
                                We'll use your answers to write a professional article about your journey, showcase it in our magazine, share it across our blog and social media, and feature you on TheIndex.cc to help grow your business visibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why It Matters Section */}
            <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[var(--text-main)] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        Why This Matters for Your Business
                    </h2>
                    
                    <div className="space-y-3 sm:space-y-4 text-[var(--text-main)]">
                        <p className="leading-relaxed text-sm sm:text-base">
                            Being featured as Member of the Month isn't just recognition—it's a powerful growth opportunity for your business. Here's how active community engagement helps you succeed:
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                                <h3 className="font-semibold mb-1 sm:mb-2 text-blue-600 text-sm sm:text-base">🎯 Increased Visibility</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                    Your story reaches thousands of entrepreneurs, potential clients, and partners across our blog, social media, and TheIndex.cc
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                                <h3 className="font-semibold mb-1 sm:mb-2 text-blue-600 text-sm sm:text-base">🤝 Strategic Connections</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                    Active community members form partnerships, find clients, and create collaboration opportunities that lead to real revenue
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                                <h3 className="font-semibold mb-1 sm:mb-2 text-blue-600 text-sm sm:text-base">💡 Social Proof & Credibility</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                    Being featured builds trust and authority in your industry—making it easier to attract clients and raise prices
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                                <h3 className="font-semibold mb-1 sm:mb-2 text-blue-600 text-sm sm:text-base">📈 Accountability & Growth</h3>
                                <p className="text-xs sm:text-sm text-[var(--text-soft)]">
                                    Community engagement keeps you motivated, accountable, and learning from others who've overcome similar challenges
                                </p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                            <p className="text-xs sm:text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                💼 <strong>Real Impact:</strong> Past Members of the Month have reported gaining new clients, forming strategic partnerships, and growing their businesses directly from the exposure and connections made through this feature.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Eligibility Check */}
            <Card className="mb-6 sm:mb-8">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        {isEligible ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-orange-500" />
                        )}
                        Eligibility Requirements
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                    <div className="space-y-2 sm:space-y-3 mb-4">
                        {eligibilityCriteria.map(criteria => (
                            <div key={criteria.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-start gap-3 flex-1">
                                    <button
                                        type="button"
                                        onClick={() => toggleRequirement(criteria.key)}
                                        className="flex-shrink-0 mt-0.5 cursor-pointer hover:scale-110 transition-transform"
                                    >
                                        {eligibility[criteria.key] ? (
                                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                    <span className={`text-sm sm:text-base ${eligibility[criteria.key] ? 'text-[var(--text-main)] font-medium' : 'text-[var(--text-soft)]'}`}>
                                        {criteria.label}
                                    </span>
                                </div>
                                {!eligibility[criteria.key] && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(createPageUrl(criteria.link))}
                                    >
                                        {criteria.action}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4 mb-4">
                        <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                            ✅ <strong>Click the checkboxes</strong> to mark off each requirement as you complete it. Our admin team will verify them when reviewing your submission.
                        </p>
                    </div>
                    {!isEligible && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200">
                                Mark all requirements as complete to submit. Our team will verify each one during the review process.
                            </p>
                        </div>
                    )}
                    {isEligible && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                All requirements marked! Fill out the form below and our team will verify during review.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Admin Invitation Notice - Shows when invited by admin but not eligible */}
            {existingSubmission && !isEligible && (
                <Card className="mb-6 border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-purple-900 dark:text-purple-300">You've Been Selected by Our Team! 🎉</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-2">
                            Our admin team has selected you to be featured as Member of the Month. While you may not meet all the typical requirements yet, we believe your story will inspire our community!
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                            Please fill out the form below to share your story.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Existing Submission Notice - Shows when already submitted and eligible */}
            {existingSubmission && isEligible && (
                <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold">You've Already Submitted!</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            You can edit your submission below anytime before it's approved.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Submission Form - Show if eligible OR if admin invited them */}
            {(isEligible || existingSubmission) && (
                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader className="px-4 sm:px-6">
                            <CardTitle className="text-lg sm:text-xl">Tell Us Your Story</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Business Name *</label>
                                <input
                                    type="text"
                                    value={formData.business_name}
                                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                    className="form-input w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Brief Business Description *</label>
                                <textarea
                                    value={formData.business_description}
                                    onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
                                    className="form-input w-full h-24 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Industry *</label>
                                <select
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    className="form-input w-full"
                                    required
                                >
                                    <option value="">Select your industry...</option>
                                    <option value="Coaching & Consulting">Coaching & Consulting</option>
                                    <option value="E-commerce & Retail">E-commerce & Retail</option>
                                    <option value="Health & Wellness">Health & Wellness</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Marketing & Advertising">Marketing & Advertising</option>
                                    <option value="Technology & Software">Technology & Software</option>
                                    <option value="Food & Beverage">Food & Beverage</option>
                                    <option value="Creative & Design">Creative & Design</option>
                                    <option value="Education & Training">Education & Training</option>
                                    <option value="Professional Services">Professional Services</option>
                                    <option value="Non-Profit">Non-Profit</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">How long have you been in business? *</label>
                                <select
                                    value={formData.years_in_business}
                                    onChange={(e) => setFormData({ ...formData, years_in_business: e.target.value })}
                                    className="form-input w-full"
                                    required
                                >
                                    <option value="">Select duration...</option>
                                    <option value="Less than 6 months">Less than 6 months</option>
                                    <option value="6 months - 1 year">6 months - 1 year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="2-3 years">2-3 years</option>
                                    <option value="3-5 years">3-5 years</option>
                                    <option value="5-10 years">5-10 years</option>
                                    <option value="10+ years">10+ years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">What was your biggest challenge in starting/growing your business? *</label>
                                <textarea
                                    value={formData.biggest_challenge}
                                    onChange={(e) => setFormData({ ...formData, biggest_challenge: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">How did you overcome it? *</label>
                                <textarea
                                    value={formData.how_overcame}
                                    onChange={(e) => setFormData({ ...formData, how_overcame: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">What's your proudest business moment so far? *</label>
                                <textarea
                                    value={formData.proudest_moment}
                                    onChange={(e) => setFormData({ ...formData, proudest_moment: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">What advice would you give someone just starting out? *</label>
                                <textarea
                                    value={formData.advice_to_others}
                                    onChange={(e) => setFormData({ ...formData, advice_to_others: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Where do you see your business in 5 years? *</label>
                                <textarea
                                    value={formData.future_vision}
                                    onChange={(e) => setFormData({ ...formData, future_vision: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Why did you start this business? *</label>
                                <textarea
                                    value={formData.why_started}
                                    onChange={(e) => setFormData({ ...formData, why_started: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Describe a typical day in your business *</label>
                                <textarea
                                    value={formData.daily_routine}
                                    onChange={(e) => setFormData({ ...formData, daily_routine: e.target.value })}
                                    className="form-input w-full h-32 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">What tools or resources have been most helpful? *</label>
                                <textarea
                                    value={formData.tools_resources}
                                    onChange={(e) => setFormData({ ...formData, tools_resources: e.target.value })}
                                    className="form-input w-full h-24 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">How do you give back or impact your community? *</label>
                                <textarea
                                    value={formData.community_impact}
                                    onChange={(e) => setFormData({ ...formData, community_impact: e.target.value })}
                                    className="form-input w-full h-24 resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Your Business Profile URL on TheIndex.cc *</label>
                                <input
                                    type="url"
                                    value={formData.theindex_profile_url}
                                    onChange={(e) => setFormData({ ...formData, theindex_profile_url: e.target.value })}
                                    className="form-input w-full"
                                    placeholder="https://theindex.cc/..."
                                    required
                                />
                                <p className="text-xs text-[var(--text-soft)] mt-1">
                                    Don't have one? <a href="https://theindex.cc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Create your free profile</a>
                                </p>
                            </div>

                            {/* Generate Article Button */}
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    type="button"
                                    onClick={generateArticle}
                                    disabled={generatingArticle || !formData.business_name || !formData.biggest_challenge}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    {generatingArticle ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Writing Your Article...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Generate Magazine Article Preview
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-[var(--text-soft)] text-center mt-2">
                                    Fill out the form above, then click to preview your article
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Article Preview */}
                    {generatedArticle && (
                        <Card className="mb-6 border-2 border-purple-200 dark:border-purple-700">
                            <CardHeader className="px-4 sm:px-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Eye className="w-5 h-5 text-purple-600" />
                                    Your Magazine Article Preview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 sm:px-6 pt-6">
                                <div className="prose prose-sm max-w-none dark:prose-invert mb-4">
                                    <div className="whitespace-pre-wrap text-[var(--text-main)] leading-relaxed">
                                        {generatedArticle}
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                                    <p className="text-xs text-blue-800 dark:text-blue-200">
                                        ℹ️ This is a preview of how your story will appear in The Business Minds Magazine and on our blog. Our team may make minor edits for clarity and consistency.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Terms and Conditions */}
                    <Card className="mb-6 border-2 border-gray-200 dark:border-gray-700">
                        <CardContent className="px-4 sm:px-6 pt-6">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id="terms"
                                    checked={agreedToTerms}
                                    onCheckedChange={setAgreedToTerms}
                                    className="mt-1"
                                />
                                <label htmlFor="terms" className="text-sm text-[var(--text-soft)] cursor-pointer">
                                    I agree to allow The Business Minds to feature my story in the magazine, blog, and social media. I understand that the article will be written based on my submission answers and may be edited for clarity. I consent to having my business information and story shared publicly to inspire and educate other entrepreneurs. *
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={submitting || !agreedToTerms} className="w-full btn-primary text-lg py-6">
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {existingSubmission ? 'Updating...' : 'Submitting...'}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {existingSubmission ? 'Update My Story' : 'Submit My Story'}
                            </>
                        )}
                    </Button>
                    {!agreedToTerms && (
                        <p className="text-xs text-center text-orange-600 dark:text-orange-400 mt-2">
                            Please agree to the terms and conditions to submit
                        </p>
                    )}
                </form>
            )}
        </div>
    );
}