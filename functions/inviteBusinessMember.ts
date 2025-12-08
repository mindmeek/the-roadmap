import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, recipient_email, role_to_assign, message } = await req.json();

        if (!business_id || !recipient_email) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify inviter has permission (owner or admin of the business)
        const membership = await base44.entities.BusinessMember.filter({
            business_id: business_id,
            user_email: user.email,
            role: { $in: ['owner', 'admin'] }
        });

        if (!membership || membership.length === 0) {
            return Response.json({ error: 'You do not have permission to invite members to this business' }, { status: 403 });
        }

        // Check if recipient is already a member
        const existingMember = await base44.entities.BusinessMember.filter({
            business_id: business_id,
            user_email: recipient_email
        });

        if (existingMember.length > 0) {
            return Response.json({ error: 'User is already a member of this business' }, { status: 400 });
        }

        // Check for existing pending invitation
        const existingInvite = await base44.entities.BusinessInvitation.filter({
            business_id: business_id,
            recipient_email: recipient_email,
            status: 'pending'
        });

        if (existingInvite.length > 0) {
            return Response.json({ error: 'A pending invitation already exists for this user' }, { status: 400 });
        }

        // Create Invitation
        const invitation = await base44.entities.BusinessInvitation.create({
            business_id,
            inviter_user_id: user.id,
            recipient_email,
            role_to_assign: role_to_assign || 'member',
            status: 'pending',
            message
        });

        // Create notification for recipient (in-app)
        await base44.asServiceRole.entities.Notification.create({
            recipient_email: recipient_email,
            type: 'general',
            title: 'New Business Invitation',
            message: `You have been invited to join a business.`,
            link: '/MyBusinesses'
        });

        // Fetch Business Name for the email
        const business = await base44.entities.Business.get(business_id);
        const businessName = business ? business.name : "a business";

        // Check if user exists to tailor the email
        const existingUsers = await base44.asServiceRole.entities.User.filter({ email: recipient_email });
        const isExistingUser = existingUsers.length > 0;
        const appUrl = "https://app.base44.com"; // Or retrieve from env if available, defaulting to base URL

        let emailSubject, emailBody;

        if (isExistingUser) {
            emailSubject = `Invitation to join ${businessName} on Business Minds`;
            emailBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>You've been invited!</h2>
                    <p>Hello,</p>
                    <p><strong>${user.full_name || 'A user'}</strong> has invited you to join the team at <strong>${businessName}</strong> on the Business Minds platform.</p>
                    <p>Please log in to your account to accept the invitation.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${appUrl}/MyBusinesses" style="background-color: #8B6F4E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Accept Invitation</a>
                    </div>
                    <p>Or visit: ${appUrl}/MyBusinesses</p>
                </div>
            `;
        } else {
            emailSubject = `Invitation to join ${businessName} on Business Minds`;
            emailBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>You've been invited!</h2>
                    <p>Hello,</p>
                    <p><strong>${user.full_name || 'A user'}</strong> has invited you to join the team at <strong>${businessName}</strong> on the Business Minds platform.</p>
                    <p>To accept this invitation, please create an account first.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${appUrl}" style="background-color: #8B6F4E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Create Account</a>
                    </div>
                    <p>After signing up, you will find your invitation in the "My Businesses" section.</p>
                </div>
            `;
        }

        // Send Email
        try {
            await base44.integrations.Core.SendEmail({
                to: recipient_email,
                subject: emailSubject,
                body: emailBody
            });
        } catch (emailError) {
            console.error("Failed to send invitation email:", emailError);
            // We don't fail the whole request if email fails, but we log it.
        }

        return Response.json({ success: true, invitation });

    } catch (error) {
        console.error("Invite Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});