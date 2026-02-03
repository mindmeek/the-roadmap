import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Award, CheckCircle2, XCircle, Loader2, AlertCircle, Save, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MemberOfTheMonthSubmission() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [existingSubmission, setExistingSubmission] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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

            // Check community posts
            const userPosts = await base44.entities.CommunityPost.filter({ created_by: currentUser.email });
            const introduced_in_community = userPosts.length >= 1;

            // Check 90-day plan
            const plans = await base44.entities.SocialMediaPlan.filter({ created_by: currentUser.email, is_active: true });
            const has_90_day_plan = plans.length > 0;

            // Check stage
            const startup_or_growth_stage = currentUser.entrepreneurship_stage === 'startup' || currentUser.entrepreneurship_stage === 'growth';

            // Check foundation progress
            const progress = await base44.entities.FoundationProgress.filter({ created_by: currentUser.email });
            let foundation_roadmap_progress = false;
            if (progress.length > 0) {
                const completedSteps = progress[0].completed_steps || [];
                foundation_roadmap_progress = completedSteps.length >= 10; // At least 10 steps completed
            }

            // Check engagement
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
            const recentPosts = userPosts.filter(p => new Date(p.created_date) > new Date(thirtyDaysAgo));
            const active_engagement = recentPosts.length >= 3;

            // Check business profile on TheIndex
            const businesses = await base44.entities.Business.filter({ owner_user_id: currentUser.id });
            const has_business_profile = businesses.length > 0;

            // Check connections
            const connections = await base44.entities.Connection.filter({
                $or: [
                    { requester_email: currentUser.email, status: 'accepted' },
                    { recipient_email: currentUser.email, status: 'accepted' }
                ]
            });
            const partners = await base44.entities.AccountabilityPartner.filter({
                $or: [
                    { user_email: currentUser.email, status: 'active' },
                    { partner_email: currentUser.email, status: 'active' }
                ]
            });
            const meaningful_connections = connections.length >= 3 || partners.length > 0;

            // Check wins/milestones
            const winPosts = userPosts.filter(p => 
                p.post_type === 'milestone' || 
                p.post_type === 'celebration' ||
                (p.content && p.content.toLowerCase().includes('win'))
            );
            const shared_win_or_milestone = winPosts.length > 0;

            const eligibilityStatus = {
                introduced_in_community,
                has_90_day_plan,
                startup_or_growth_stage,
                foundation_roadmap_progress,
                active_engagement,
                has_business_profile,
                meaningful_connections,
                shared_win_or_milestone
            };

            setEligibility(eligibilityStatus);
            setIsEligible(Object.values(eligibilityStatus).every(v => v === true));

            // Check for existing submission
            const existingHighlights = await base44.entities.CommunityHighlight.filter({ 
                member_email: currentUser.email 
            });
            if (existingHighlights.length > 0) {
                const existing = existingHighlights[0];
                setExistingSubmission(existing);
                if (existing.submission_answers) {
                    setFormData(existing.submission_answers);
                }
            }

            // Pre-fill business info if available
            if (businesses.length > 0) {
                const biz = businesses[0];
                setFormData(prev => ({
                    ...prev,
                    business_name: biz.name || '',
                    business_description: biz.description || '',
                    industry: biz.industry || '',
                    theindex_profile_url: `https://theindex.cc/business/${biz.id}` // Adjust URL structure as needed
                }));
            }

        } catch (error) {
            console.error('Error checking eligibility:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEligible) {
            alert('Please meet all eligibility criteria before submitting.');
            return;
        }

        setSubmitting(true);
        try {
            if (existingSubmission) {
                await base44.entities.CommunityHighlight.update(existingSubmission.id, {
                    theindex_profile_url: formData.theindex_profile_url,
                    submission_answers: formData,
                    eligibility_checklist: eligibility
                });
                alert('Your submission has been updated successfully!');
            } else {
                await base44.entities.CommunityHighlight.create({
                    member_user_id: user.id,
                    member_name: user.full_name,
                    member_email: user.email,
                    theindex_profile_url: formData.theindex_profile_url,
                    submission_answers: formData,
                    eligibility_checklist: eligibility,
                    status: 'draft',
                    month_featured: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                });
                alert('Your submission has been received! We\'ll review it and be in touch soon.');
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
            label: 'Follow 3+ members in our community app (thebminds.com - Members tab)', 
            action: 'Visit Community App', 
            link: 'https://thebminds.com',
            isExternal: true 
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
                <p className="text-[var(--text-soft)] text-base sm:text-lg px-4">Get featured and inspire the community!</p>
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
                                    {eligibility[criteria.key] ? (
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span className={`text-sm sm:text-base ${eligibility[criteria.key] ? 'text-[var(--text-main)]' : 'text-[var(--text-soft)]'}`}>
                                        {criteria.label}
                                    </span>
                                </div>
                                {!eligibility[criteria.key] && (
                                    criteria.isExternal ? (
                                        <a 
                                            href={criteria.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline btn-sm"
                                        >
                                            {criteria.action}
                                        </a>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(createPageUrl(criteria.link))}
                                        >
                                            {criteria.action}
                                        </Button>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    {!isEligible && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200">
                                Complete all requirements above to be eligible for Member of the Month. Each requirement helps you engage more deeply with the community and build your business!
                            </p>
                        </div>
                    )}
                    {isEligible && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                You meet all requirements! Fill out the form below to submit your story.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Existing Submission Notice */}
            {existingSubmission && (
                <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold">You've Already Submitted!</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-2">
                            Status: <Badge>{existingSubmission.status}</Badge>
                        </p>
                        <p className="text-sm text-[var(--text-soft)]">
                            You can edit your submission below anytime before it's approved.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Submission Form */}
            {isEligible && (
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
                                <input
                                    type="text"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    className="form-input w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">How long have you been in business? *</label>
                                <input
                                    type="text"
                                    value={formData.years_in_business}
                                    onChange={(e) => setFormData({ ...formData, years_in_business: e.target.value })}
                                    className="form-input w-full"
                                    placeholder="e.g., 2 years"
                                    required
                                />
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
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={submitting} className="w-full btn-primary">
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
                </form>
            )}
        </div>
    );
}