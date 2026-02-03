import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { notifyMemberSelection } from '@/functions/notifyMemberSelection';
import { inviteMemberOfTheMonth } from '@/functions/inviteMemberOfTheMonth';
import { Award, Loader2, Eye, CheckCircle2, XCircle, Sparkles, Calendar, Send, UserPlus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminMemberOfTheMonth() {
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [showSelectMember, setShowSelectMember] = useState(false);
    const [eligibleMembers, setEligibleMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inviting, setInviting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            if (currentUser.role !== 'admin') {
                alert('Admin access required');
                return;
            }

            const highlights = await base44.entities.CommunityHighlight.list('-created_date', 50);
            setSubmissions(highlights);

            // Load eligible members
            await loadEligibleMembers();
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadEligibleMembers = async () => {
        try {
            const allUsers = await base44.entities.User.list('-created_date', 200);
            const eligible = [];

            for (const u of allUsers) {
                // Skip if already has submission
                const hasSubmission = submissions.some(s => s.member_email === u.email);
                if (hasSubmission) continue;

                // Check basic eligibility
                if (u.entrepreneurship_stage !== 'startup' && u.entrepreneurship_stage !== 'growth') continue;

                eligible.push({
                    id: u.id,
                    name: u.full_name || 'Unknown',
                    email: u.email,
                    stage: u.entrepreneurship_stage
                });
            }

            setEligibleMembers(eligible);
        } catch (error) {
            console.error('Error loading eligible members:', error);
        }
    };

    const handleInviteMember = async (member) => {
        if (!confirm(`Invite ${member.name} to be Member of the Month?`)) return;

        setInviting(true);
        try {
            await inviteMemberOfTheMonth({
                member_email: member.email,
                member_name: member.name,
                member_user_id: member.id
            });

            alert(`${member.name} has been invited! They'll receive an email with instructions.`);
            setShowSelectMember(false);
            loadData();
        } catch (error) {
            console.error('Error inviting member:', error);
            alert('Failed to invite member. Please try again.');
        } finally {
            setInviting(false);
        }
    };

    const generateContent = async (submission) => {
        setGenerating(true);
        try {
            // This would call an AI function to generate blog post and social content
            // For now, we'll create a placeholder structure
            const blogIntro = `Meet ${submission.member_name}, this month's featured entrepreneur! ${submission.submission_answers.business_name} is making waves in the ${submission.submission_answers.industry} industry...`;
            
            const qna = [
                { question: "What was your biggest challenge?", answer: submission.submission_answers.biggest_challenge },
                { question: "How did you overcome it?", answer: submission.submission_answers.how_overcame },
                { question: "What's your proudest moment?", answer: submission.submission_answers.proudest_moment },
                { question: "What advice would you give?", answer: submission.submission_answers.advice_to_others },
                { question: "Where do you see your business in 5 years?", answer: submission.submission_answers.future_vision }
            ];

            const proTip = `Pro Tip from ${submission.member_name}: ${submission.submission_answers.advice_to_others.substring(0, 150)}...`;
            
            const cta = `Want to connect with ${submission.member_name}? Check out their business profile on TheIndex.cc and support fellow entrepreneurs in our community!`;

            const socialPosts = [
                {
                    post_number: 1,
                    title: "Announcement Post",
                    linkedin_content: `🎉 Meet Our Member of the Month: ${submission.member_name}! ${submission.submission_answers.business_name} is transforming ${submission.submission_answers.industry}. Read their inspiring journey! [Link]`,
                    instagram_content: `🌟 MEMBER SPOTLIGHT 🌟\n\n${submission.member_name}\n${submission.submission_answers.business_name}\n\n${submission.submission_answers.business_description.substring(0, 100)}...\n\nFull story on our blog! Link in bio 👆`,
                    facebook_content: `Excited to spotlight ${submission.member_name} as our Member of the Month! Their journey in ${submission.submission_answers.industry} is truly inspiring. Click to read more!`,
                    hashtags: "#MemberOfTheMonth #BusinessMinds #Entrepreneur #SmallBusiness",
                    visual_suggestion: "Professional headshot with business logo overlay"
                },
                {
                    post_number: 2,
                    title: "Business Deep-Dive",
                    linkedin_content: `${submission.member_name}'s biggest challenge: ${submission.submission_answers.biggest_challenge.substring(0, 150)}...\n\nHow they overcame it: ${submission.submission_answers.how_overcame.substring(0, 150)}...\n\nRead the full story! [Link]`,
                    instagram_content: `💪 OVERCOMING CHALLENGES 💪\n\n"${submission.submission_answers.biggest_challenge.substring(0, 120)}..."\n\n- ${submission.member_name}\n\nSwipe to see how they conquered it! ➡️`,
                    facebook_content: `What's the biggest challenge in business? ${submission.member_name} shares their story of overcoming obstacles in ${submission.submission_answers.industry}.`,
                    hashtags: "#BusinessChallenges #Entrepreneurship #Success #Inspiration",
                    visual_suggestion: "Before/after imagery or challenge-to-success visual"
                },
                {
                    post_number: 3,
                    title: "Wisdom & Advice",
                    linkedin_content: `Advice from ${submission.member_name} for aspiring entrepreneurs:\n\n"${submission.submission_answers.advice_to_others.substring(0, 200)}..."\n\nWhat resonates with you? Comment below! 👇`,
                    instagram_content: `💡 WISDOM WEDNESDAY 💡\n\n"${submission.submission_answers.advice_to_others.substring(0, 150)}..."\n\n- ${submission.member_name}, ${submission.submission_answers.business_name}\n\nSave this! 📌`,
                    facebook_content: `Looking for business advice? ${submission.member_name} shares their top tips for success in ${submission.submission_answers.industry}.`,
                    hashtags: "#BusinessAdvice #EntrepreneurTips #BusinessWisdom #SmallBusinessOwner",
                    visual_suggestion: "Quote graphic with member's photo"
                },
                {
                    post_number: 4,
                    title: "Future Vision & CTA",
                    linkedin_content: `Where is ${submission.submission_answers.business_name} headed?\n\n${submission.submission_answers.future_vision.substring(0, 200)}...\n\n🔗 Connect with ${submission.member_name} on TheIndex.cc\n💬 Join our community of entrepreneurs\n\n#BusinessMinds`,
                    instagram_content: `🚀 THE FUTURE IS BRIGHT 🚀\n\n${submission.member_name} is building something amazing.\n\nWant to be part of this community?\n\nLink in bio to join! 👆\n\n@businessmindsmagazine`,
                    facebook_content: `${submission.member_name}'s vision for ${submission.submission_answers.business_name} is inspiring! Check out their profile and support fellow entrepreneurs in our community. Link: ${submission.theindex_profile_url}`,
                    hashtags: "#FutureOfBusiness #EntrepreneurCommunity #SupportSmallBusiness #BusinessMinds",
                    visual_suggestion: "Aspirational future-focused image"
                }
            ];

            await base44.entities.CommunityHighlight.update(submission.id, {
                blog_post_intro: blogIntro,
                blog_post_qna: qna,
                blog_post_pro_tip: proTip,
                blog_post_cta: cta,
                social_media_posts: socialPosts,
                status: 'pending_review'
            });

            alert('Content generated successfully! Review and publish when ready.');
            loadData();
        } catch (error) {
            console.error('Error generating content:', error);
            alert('Failed to generate content. Please try again.');
        } finally {
            setGenerating(false);
            setSelectedSubmission(null);
        }
    };

    const updateStatus = async (submissionId, newStatus) => {
        try {
            await base44.entities.CommunityHighlight.update(submissionId, { status: newStatus });
            
            // Send email notification when approved
            if (newStatus === 'approved') {
                try {
                    await notifyMemberSelection({ submission_id: submissionId });
                } catch (emailError) {
                    console.error('Error sending notification email:', emailError);
                    alert('Status updated but failed to send notification email.');
                }
            }
            
            loadData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center text-[var(--text-soft)]">Admin access required</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const filteredMembers = eligibleMembers.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="w-8 h-8 text-[var(--primary-gold)]" />
                            <h1 className="text-3xl font-bold">Member of the Month - Admin</h1>
                        </div>
                        <p className="text-[var(--text-soft)]">Manage submissions and generate content</p>
                    </div>
                    <Button onClick={() => setShowSelectMember(true)} className="btn-primary">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Select New Member
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {submissions.map((submission) => (
                    <Card key={submission.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="mb-2">{submission.member_name}</CardTitle>
                                    <p className="text-sm text-[var(--text-soft)]">{submission.submission_answers?.business_name}</p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">Submitted: {new Date(submission.created_date).toLocaleDateString()}</p>
                                </div>
                                <Badge className={
                                    submission.status === 'published' ? 'bg-green-600' :
                                    submission.status === 'approved' ? 'bg-blue-600' :
                                    submission.status === 'pending_review' ? 'bg-yellow-600' :
                                    'bg-gray-600'
                                }>
                                    {submission.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Eligibility Status */}
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-2">Eligibility Check:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(submission.eligibility_checklist || {}).map(([key, value]) => (
                                        <Badge key={key} variant={value ? "default" : "outline"} className={value ? "bg-green-600" : ""}>
                                            {value ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                                            {key.replace(/_/g, ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* TheIndex Profile */}
                            {submission.theindex_profile_url && (
                                <div className="mb-4">
                                    <a 
                                        href={submission.theindex_profile_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        View TheIndex.cc Profile →
                                    </a>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedSubmission(submission)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </Button>

                                {!submission.blog_post_intro && (
                                    <Button
                                        size="sm"
                                        onClick={() => generateContent(submission)}
                                        disabled={generating}
                                    >
                                        {generating ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Sparkles className="w-4 h-4 mr-2" />
                                        )}
                                        Generate Content
                                    </Button>
                                )}

                                {submission.status === 'pending_review' && (
                                    <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => updateStatus(submission.id, 'approved')}
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Approve
                                    </Button>
                                )}

                                {submission.status === 'approved' && (
                                    <Button
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700"
                                        onClick={() => updateStatus(submission.id, 'published')}
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Publish
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {submissions.length === 0 && (
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-[var(--text-soft)]">No submissions yet</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">{selectedSubmission.member_name}</h2>
                                <Button variant="ghost" onClick={() => setSelectedSubmission(null)}>Close</Button>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(selectedSubmission.submission_answers || {}).map(([key, value]) => (
                                    <div key={key}>
                                        <h3 className="font-semibold text-sm text-[var(--text-soft)] mb-2">
                                            {key.replace(/_/g, ' ').toUpperCase()}
                                        </h3>
                                        <p className="text-[var(--text-main)] whitespace-pre-wrap">{value}</p>
                                    </div>
                                ))}

                                {selectedSubmission.blog_post_intro && (
                                    <div className="border-t pt-6">
                                        <h3 className="font-bold text-lg mb-4">Generated Content</h3>
                                        
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Blog Intro:</h4>
                                            <p>{selectedSubmission.blog_post_intro}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Q&A:</h4>
                                            {selectedSubmission.blog_post_qna?.map((qa, idx) => (
                                                <div key={idx} className="mb-3">
                                                    <p className="font-medium">{qa.question}</p>
                                                    <p className="text-[var(--text-soft)]">{qa.answer}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Pro Tip:</h4>
                                            <p>{selectedSubmission.blog_post_pro_tip}</p>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">Social Media Posts:</h4>
                                            {selectedSubmission.social_media_posts?.map((post, idx) => (
                                                <Card key={idx} className="mb-3">
                                                    <CardHeader>
                                                        <CardTitle className="text-sm">Post {post.post_number}: {post.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="text-sm space-y-2">
                                                        <div>
                                                            <strong>LinkedIn:</strong> {post.linkedin_content}
                                                        </div>
                                                        <div>
                                                            <strong>Instagram:</strong> {post.instagram_content}
                                                        </div>
                                                        <div>
                                                            <strong>Hashtags:</strong> {post.hashtags}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Select Member Modal */}
            {showSelectMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Select Member of the Month</h2>
                                <Button variant="ghost" onClick={() => setShowSelectMember(false)}>Close</Button>
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search members..."
                                        className="form-input w-full pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                {filteredMembers.length === 0 ? (
                                    <p className="text-center text-[var(--text-soft)] py-8">No eligible members found</p>
                                ) : (
                                    filteredMembers.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-semibold">{member.name}</p>
                                                <p className="text-sm text-[var(--text-soft)]">{member.email}</p>
                                                <Badge variant="outline" className="mt-1 text-xs">{member.stage}</Badge>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleInviteMember(member)}
                                                disabled={inviting}
                                            >
                                                {inviting ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Invite
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}