import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { submission_id } = await req.json();

        if (!submission_id) {
            return Response.json({ error: 'submission_id is required' }, { status: 400 });
        }

        // Get the submission
        const submissions = await base44.asServiceRole.entities.CommunityHighlight.filter({ id: submission_id });
        if (!submissions || submissions.length === 0) {
            return Response.json({ error: 'Submission not found' }, { status: 404 });
        }

        const submission = submissions[0];

        // Send email notification
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: submission.member_email,
            subject: '🎉 You\'re Our Member of the Month!',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #8B6F4E;">Congratulations, ${submission.member_name}!</h1>
                    
                    <p>We're thrilled to announce that you've been selected as <strong>Business Minds' Member of the Month</strong>!</p>
                    
                    <p>Your journey, dedication to the community, and the incredible work you're doing with <strong>${submission.submission_answers?.business_name}</strong> truly inspire us and your fellow entrepreneurs.</p>
                    
                    <h2 style="color: #8B6F4E;">What Happens Next?</h2>
                    
                    <ul>
                        <li><strong>Blog Feature:</strong> Your story will be featured on our Business Minds blog</li>
                        <li><strong>Social Media Spotlight:</strong> We'll share your journey across LinkedIn, Instagram, and Facebook over the next week</li>
                        <li><strong>Community Recognition:</strong> You'll be highlighted in our community hub</li>
                        <li><strong>TheIndex.cc Boost:</strong> Your business profile will receive extra visibility</li>
                    </ul>
                    
                    <p>We'll be in touch with the exact publication schedule soon. In the meantime, feel free to share the exciting news with your network!</p>
                    
                    <p style="margin-top: 30px;">Here's to your continued success!</p>
                    
                    <p style="color: #666;">
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

        // Create a notification in the system
        await base44.asServiceRole.entities.Notification.create({
            recipient_email: submission.member_email,
            type: 'general',
            title: '🎉 You\'re Member of the Month!',
            message: `Congratulations! You've been selected as our Member of the Month. Check your email for details.`,
            is_read: false
        });

        return Response.json({ success: true });

    } catch (error) {
        console.error('Error notifying member:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});