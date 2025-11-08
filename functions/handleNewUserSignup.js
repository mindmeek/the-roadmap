import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { userId, email, fullName } = await req.json();

        if (!userId || !email) {
            return Response.json(
                { success: false, error: 'Missing required fields: userId and email' },
                { status: 400 }
            );
        }

        // Calculate trial dates
        const today = new Date();
        const trialExpiresOn = new Date(today);
        trialExpiresOn.setDate(trialExpiresOn.getDate() + 14);

        const trialStartDate = today.toISOString().split('T')[0];
        const trialExpiryDate = trialExpiresOn.toISOString().split('T')[0];

        // Update user with trial information using service role
        await base44.asServiceRole.entities.User.update(userId, {
            is_premium_trial_user: true,
            trial_status: 'active',
            trial_start_date: trialStartDate,
            trial_expires_on: trialExpiryDate,
            trial_emails_sent: ['welcome'],
            onboarding_completed: false,
            subscription_level: 'free'
        });

        // Send welcome email
        const emailData = {
            from: Deno.env.get('RESEND_FROM_EMAIL') || 'The Business Minds <noreply@thebminds.com>',
            to: email,
            subject: '🎉 Welcome to The Business Minds! Your 14-Day Premium Trial Has Begun!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #8B6F4E 0%, #D4AF37 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
                        .feature-box { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #8B6F4E; }
                        .cta-button { display: inline-block; background: #8B6F4E; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                        ul { padding-left: 20px; }
                        li { margin: 8px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to The Business Minds!</h1>
                            <p style="margin: 10px 0 0 0; font-size: 18px;">Your 14-Day Premium Trial Starts Now</p>
                        </div>
                        
                        <div class="content">
                            <h2 style="color: #8B6F4E;">Hi ${fullName || 'there'}! 👋</h2>
                            
                            <p>We're <strong>thrilled</strong> to have you as part of The Business Minds community! You now have <strong>full access</strong> to all premium features for the next <strong>14 days</strong>.</p>
                            
                            <div class="feature-box">
                                <h3 style="margin-top: 0; color: #8B6F4E;">🚀 What You Have Access To:</h3>
                                <ul>
                                    <li><strong>Full Foundation Roadmap</strong> - 15+ strategic business tools</li>
                                    <li><strong>Complete 90-Day Journey</strong> - Your personalized roadmap to success</li>
                                    <li><strong>Quick Wins</strong> - Get your domain, email, and essentials setup fast</li>
                                    <li><strong>AI Business Assistants</strong> - Unlimited access to expert guidance</li>
                                    <li><strong>Daily 1% Tracker</strong> - Track your progress and build momentum</li>
                                    <li><strong>Private Community</strong> - Network with fellow entrepreneurs</li>
                                    <li><strong>Live Weekly Coaching</strong> - Join our group sessions (Tues & Thurs, 1:15 PM PST)</li>
                                </ul>
                            </div>
                            
                            <h3 style="color: #8B6F4E;">✨ Your Next Steps:</h3>
                            <ol>
                                <li><strong>Complete Onboarding</strong> - Set up your profile and select your journey</li>
                                <li><strong>Start with Quick Wins</strong> - Get your essentials in place today</li>
                                <li><strong>Join the Community</strong> - Introduce yourself to fellow entrepreneurs</li>
                                <li><strong>Begin Your 90-Day Journey</strong> - Follow your personalized roadmap</li>
                            </ol>
                            
                            <div style="text-align: center;">
                                <a href="https://app.base44.com" class="cta-button">Get Started Now →</a>
                            </div>
                            
                            <div class="feature-box" style="background: #fff9e6; border-left-color: #D4AF37;">
                                <p style="margin: 0;"><strong>⏰ Trial Expires:</strong> ${new Date(trialExpiryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p style="margin: 10px 0 0 0; font-size: 14px;">Make the most of your premium access!</p>
                            </div>
                            
                            <p style="margin-top: 30px;">Need help? Reply to this email or reach out to our support team.</p>
                            
                            <p style="margin-top: 20px;">Here's to your success! 🚀</p>
                            
                            <p><strong>The Business Minds Team</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} The Business Minds. All rights reserved.</p>
                            <p>You're receiving this email because you signed up for The Business Minds platform.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await resend.emails.send(emailData);

        return Response.json({
            success: true,
            message: 'User trial activated and welcome email sent',
            trial_expires_on: trialExpiryDate
        });

    } catch (error) {
        console.error('Error in handleNewUserSignup:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
});