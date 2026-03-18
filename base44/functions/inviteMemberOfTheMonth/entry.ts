import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { member_email, member_name, member_user_id } = await req.json();

        if (!member_email || !member_name || !member_user_id) {
            return Response.json({ error: 'member_email, member_name, and member_user_id are required' }, { status: 400 });
        }

        // Check if already has a submission
        const existing = await base44.asServiceRole.entities.CommunityHighlight.filter({ 
            member_email 
        });

        if (existing && existing.length > 0) {
            return Response.json({ error: 'This member already has a submission' }, { status: 400 });
        }

        // Create draft entry
        await base44.asServiceRole.entities.CommunityHighlight.create({
            member_user_id,
            member_name,
            member_email,
            submission_answers: {},
            eligibility_checklist: {},
            status: 'draft',
            month_featured: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        });

        // Send invitation email
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: member_email,
            subject: '🌟 You\'ve Been Selected for Member of the Month!',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #8B6F4E;">Congratulations, ${member_name}!</h1>
                    
                    <p>Great news! You've been selected as a potential <strong>Business Minds Member of the Month</strong>!</p>
                    
                    <p>We've been following your journey and engagement in our community, and we'd love to feature your story to inspire fellow entrepreneurs.</p>
                    
                    <h2 style="color: #8B6F4E;">Next Steps</h2>
                    
                    <p>To be featured, please log in to your Business Minds account and complete the Member of the Month submission form. This is your chance to share:</p>
                    
                    <ul>
                        <li>Your entrepreneurial journey and story</li>
                        <li>Challenges you've overcome</li>
                        <li>Advice for other entrepreneurs</li>
                        <li>Your vision for the future</li>
                    </ul>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://app.thebminds.com/MemberOfTheMonthSubmission" 
                           style="background-color: #8B6F4E; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                            Fill Out Your Story
                        </a>
                    </div>
                    
                    <h3 style="color: #8B6F4E;">What You'll Get</h3>
                    <ul>
                        <li>Featured blog post on Business Minds Magazine</li>
                        <li>Social media spotlight across our platforms</li>
                        <li>Increased visibility for your business</li>
                        <li>Recognition in our community</li>
                        <li>Boost to your business profile on TheIndex.cc</li>
                    </ul>
                    
                    <p>We can't wait to share your story with our community!</p>
                    
                    <p style="margin-top: 30px; color: #666;">
                        <strong>The Business Minds Team</strong><br>
                        <em>"Empowering Entrepreneurs to Build, Grow, and Thrive"</em>
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999;">
                        Questions? Reply to this email or reach out to us in the community.
                    </p>
                </div>
            `
        });

        // Create notification
        await base44.asServiceRole.entities.Notification.create({
            recipient_email: member_email,
            type: 'general',
            title: '🌟 You\'ve Been Selected for Member of the Month!',
            message: 'Complete your submission form to be featured in our community spotlight.',
            is_read: false,
            link: '/MemberOfTheMonthSubmission'
        });

        return Response.json({ success: true });

    } catch (error) {
        console.error('Error inviting member:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});