import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Helper function to calculate days between dates
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date2 - date1) / oneDay);
}

// Email templates
const getEmailTemplate = (type, user, daysRemaining) => {
    const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'The Business Minds <noreply@thebminds.com>';
    
    const templates = {
        'mid-trial': {
            subject: '🚀 Make the Most of Your Business Minds Trial – Check Out These Features!',
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
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">🚀 You're Halfway Through Your Trial!</h1>
                        </div>
                        
                        <div class="content">
                            <h2 style="color: #8B6F4E;">Hi ${user.first_name}! 👋</h2>
                            
                            <p>You're 7 days into your <strong>14-day premium trial</strong>, and we want to make sure you're getting the most out of The Business Minds!</p>
                            
                            <div class="feature-box" style="background: #fff9e6; border-left-color: #D4AF37;">
                                <h3 style="margin-top: 0; color: #8B6F4E;">💡 Have You Explored These Features?</h3>
                                <ul>
                                    <li><strong>Foundation Roadmap</strong> - Complete strategic tools like SWOT, Business Model Canvas, and Value Proposition</li>
                                    <li><strong>Quick Wins</strong> - Get your domain, email, and brand essentials set up fast</li>
                                    <li><strong>AI Assistants</strong> - Chat with Ava for strategy or Charlie for copywriting</li>
                                    <li><strong>Daily 1% Tracker</strong> - Build consistency and track your progress</li>
                                    <li><strong>Live Coaching</strong> - Join our Tuesday & Thursday sessions (1:15 PM PST)</li>
                                </ul>
                            </div>
                            
                            <h3 style="color: #8B6F4E;">🎯 Pro Tips for Success:</h3>
                            <ol>
                                <li>Complete at least 1-2 Foundation tools this week</li>
                                <li>Use the Daily Tracker to build momentum</li>
                                <li>Introduce yourself in the Community</li>
                                <li>Join a live coaching session this week</li>
                            </ol>
                            
                            <div style="text-align: center;">
                                <a href="https://app.base44.com" class="cta-button">Continue Your Journey →</a>
                            </div>
                            
                            <div class="feature-box">
                                <p style="margin: 0;"><strong>⏰ ${daysRemaining} Days Remaining</strong> in your premium trial</p>
                                <p style="margin: 10px 0 0 0; font-size: 14px;">Make every day count!</p>
                            </div>
                            
                            <p style="margin-top: 30px;">Questions? Reply to this email - we're here to help!</p>
                            
                            <p><strong>The Business Minds Team</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} The Business Minds. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        },
        'final-reminder': {
            subject: '⚠️ Action Required: Your Business Minds Trial Ends Tomorrow! Save 50%!',
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
                        .urgent-box { background: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #ffc107; }
                        .cta-button { display: inline-block; background: #8B6F4E; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .coupon-code { background: #8B6F4E; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">⚠️ Your Trial Ends Tomorrow!</h1>
                            <p style="margin: 10px 0 0 0; font-size: 18px;">Don't lose access to these powerful tools</p>
                        </div>
                        
                        <div class="content">
                            <h2 style="color: #8B6F4E;">Hi ${user.first_name}! 👋</h2>
                            
                            <div class="urgent-box">
                                <h3 style="margin-top: 0; color: #856404;">⏰ Your premium trial expires tomorrow!</h3>
                                <p style="margin: 0;">After tomorrow, you'll lose access to:</p>
                                <ul style="margin: 10px 0;">
                                    <li>All premium strategy tools</li>
                                    <li>Unlimited AI assistant access</li>
                                    <li>Advanced training content</li>
                                    <li>Priority support</li>
                                </ul>
                            </div>
                            
                            <h3 style="color: #8B6F4E; text-align: center;">🎉 Special Offer: Save 50% for 3 Months!</h3>
                            
                            <p style="text-align: center;">We want to help you keep building your business. Use this exclusive coupon code:</p>
                            
                            <div class="coupon-code">
                                NEXT90
                            </div>
                            
                            <p style="text-align: center; font-size: 18px;"><strong>Save 50% on Business Minds HQ for your first 3 months!</strong></p>
                            
                            <div class="feature-box" style="background: #e8f5e9; border-left-color: #4caf50;">
                                <h3 style="margin-top: 0; color: #2e7d32;">✨ Business Minds HQ Includes:</h3>
                                <ul>
                                    <li>Unlimited 90-Day Journeys</li>
                                    <li>All 15+ Foundation Strategy Tools</li>
                                    <li>Unlimited AI Assistant Access</li>
                                    <li>Exclusive HQ Training Content</li>
                                    <li>1-on-1 Strategy Session</li>
                                    <li>Priority Support</li>
                                    <li>Advanced Analytics & Insights</li>
                                </ul>
                            </div>
                            
                            <div style="text-align: center;">
                                <a href="https://TheBusinessMinds.com" class="cta-button">Upgrade to The HQ Now →</a>
                            </div>
                            
                            <p style="text-align: center; font-size: 14px; color: #666; margin-top: 20px;">
                                Visit <strong>TheBusinessMinds.com</strong> and use coupon code <strong>NEXT90</strong> at checkout
                            </p>
                            
                            <div class="feature-box">
                                <p style="margin: 0;"><strong>❓ Questions?</strong> Reply to this email or reach out to our support team.</p>
                            </div>
                            
                            <p style="margin-top: 30px;">We're here to support your entrepreneurial journey! 🚀</p>
                            
                            <p><strong>The Business Minds Team</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} The Business Minds. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        },
        'expired': {
            subject: 'Sad to See You Go? Your Business Minds Trial Has Ended',
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
                        .coupon-code { background: #8B6F4E; color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">Your Trial Has Ended</h1>
                            <p style="margin: 10px 0 0 0; font-size: 18px;">But your entrepreneurial journey doesn't have to!</p>
                        </div>
                        
                        <div class="content">
                            <h2 style="color: #8B6F4E;">Hi ${user.first_name}! 👋</h2>
                            
                            <p>Your 14-day premium trial has come to an end. We hope you found value in The Business Minds platform!</p>
                            
                            <div class="feature-box" style="background: #fff9e6; border-left-color: #D4AF37;">
                                <h3 style="margin-top: 0; color: #8B6F4E;">📉 What You'll Miss:</h3>
                                <ul>
                                    <li>Access to 10+ advanced strategy tools</li>
                                    <li>Unlimited AI assistant conversations</li>
                                    <li>Exclusive HQ training content</li>
                                    <li>Advanced journey features</li>
                                    <li>Priority support</li>
                                </ul>
                            </div>
                            
                            <h3 style="color: #8B6F4E; text-align: center;">🎁 Last Chance: 50% Off for 3 Months!</h3>
                            
                            <p style="text-align: center;">We'd love to have you continue your journey with us. Use this exclusive offer:</p>
                            
                            <div class="coupon-code">
                                NEXT90
                            </div>
                            
                            <p style="text-align: center; font-size: 18px;"><strong>Get Business Minds HQ at 50% off for 3 months!</strong></p>
                            
                            <div style="text-align: center;">
                                <a href="https://TheBusinessMinds.com" class="cta-button">Upgrade to The HQ →</a>
                            </div>
                            
                            <p style="text-align: center; font-size: 14px; color: #666; margin-top: 20px;">
                                Visit <strong>TheBusinessMinds.com</strong> and use coupon code <strong>NEXT90</strong> at checkout
                            </p>
                            
                            <div class="feature-box" style="background: #e8f5e9; border-left-color: #4caf50;">
                                <h3 style="margin-top: 0; color: #2e7d32;">✅ What You Still Have:</h3>
                                <ul>
                                    <li>5 essential Foundation tools</li>
                                    <li>Your saved progress and notes</li>
                                    <li>ONE 90-Day Journey (+ 1 goal change)</li>
                                    <li>Community access</li>
                                    <li>Unlimited journey restarts</li>
                                </ul>
                            </div>
                            
                            <p style="margin-top: 30px;">Thank you for trying The Business Minds. We're here if you decide to upgrade! 🚀</p>
                            
                            <p><strong>The Business Minds Team</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} The Business Minds. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        }
    };
    
    return {
        from: fromEmail,
        to: user.email,
        subject: templates[type].subject,
        html: templates[type].html
    };
};

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Step 1: Send reminder emails
        const activeTrialUsers = await base44.asServiceRole.entities.User.filter({
            trial_status: 'active'
        });

        for (const user of activeTrialUsers) {
            if (!user.trial_start_date || !user.trial_expires_on) continue;

            const startDate = new Date(user.trial_start_date);
            const expiryDate = new Date(user.trial_expires_on);
            
            const daysSinceStart = daysBetween(startDate, today);
            const daysUntilExpiry = daysBetween(today, expiryDate);

            const emailsSent = user.trial_emails_sent || [];

            // Mid-trial email (Day 7)
            if (daysSinceStart >= 7 && !emailsSent.includes('mid-trial')) {
                const emailData = getEmailTemplate('mid-trial', user, daysUntilExpiry);
                await resend.emails.send(emailData);
                
                await base44.asServiceRole.entities.User.update(user.id, {
                    trial_emails_sent: [...emailsSent, 'mid-trial']
                });
            }

            // Final reminder (1 day before expiry)
            if (daysUntilExpiry === 1 && !emailsSent.includes('final-reminder')) {
                const emailData = getEmailTemplate('final-reminder', user, daysUntilExpiry);
                await resend.emails.send(emailData);
                
                await base44.asServiceRole.entities.User.update(user.id, {
                    trial_emails_sent: [...emailsSent, 'final-reminder']
                });
            }
        }

        // Step 2: Handle expired trials
        const expiredUsers = await base44.asServiceRole.entities.User.filter({
            trial_status: 'active'
        });

        let expiredCount = 0;
        for (const user of expiredUsers) {
            if (!user.trial_expires_on) continue;

            const expiryDate = new Date(user.trial_expires_on);
            expiryDate.setHours(0, 0, 0, 0);

            if (expiryDate <= today) {
                // Send expiry email
                const emailData = getEmailTemplate('expired', user);
                await resend.emails.send(emailData);

                // Update user to expired trial status
                await base44.asServiceRole.entities.User.update(user.id, {
                    is_premium_trial_user: false,
                    trial_status: 'expired'
                });

                expiredCount++;
            }
        }

        return Response.json({
            success: true,
            message: 'Trial lifecycle processed successfully',
            processed: {
                active_trials: activeTrialUsers.length,
                expired_today: expiredCount
            }
        });

    } catch (error) {
        console.error('Error in handleTrialLifecycle:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
});