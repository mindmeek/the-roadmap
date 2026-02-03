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
        { key: 'meaningful_connections', label: 'Connected with 3+ members or have accountability partner', action: 'Find Members', link: 'MemberDirectory' },
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
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--primary-gold)] to-yellow-600 rounded-full mb-4">
                    <Award className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Member of the Month</h1>
                <p className="text-[var(--text-soft)] text-lg">Get featured and inspire the community!</p>
            </div>

            {/* Eligibility Check */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {isEligible ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-orange-500" />
                        )}
                        Eligibility Requirements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 mb-4">
                        {eligibilityCriteria.map(criteria => (
                            <div key={criteria.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {eligibility[criteria.key] ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                    <span className={eligibility[criteria.key] ? 'text-[var(--text-main)]' : 'text-[var(--text-soft)]'}>
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
                    {!isEligible && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
                            <p className="text-sm text-orange-800 dark:text-orange-200">
                                Complete all requirements above to be eligible for Member of the Month. Each requirement helps you engage more deeply with the community and build your business!
                            </p>
                        </div>
                    )}
                    {isEligible && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                            <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                You meet all requirements! Fill out the form below to submit your story.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Submission Form */}
            {isEligible && (
                <form onSubmit={handleSubmit}>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Tell Us Your Story</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Submit My Story
                            </>
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
}