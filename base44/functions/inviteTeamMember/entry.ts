import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, email, role, full_name } = await req.json();

        if (!business_id || !email || !role) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify the inviter has permission (owner or admin)
        const inviterTeamMember = await base44.entities.TeamMember.filter({
            business_id,
            user_id: user.id,
            status: 'active'
        });

        const business = await base44.entities.Business.get(business_id);
        
        const hasPermission = business.owner_user_id === user.id || 
                            inviterTeamMember.some(tm => ['owner', 'admin'].includes(tm.role)) ||
                            user.role === 'admin';

        if (!hasPermission) {
            return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        // Check if team member already exists
        const existingMember = await base44.entities.TeamMember.filter({
            business_id,
            email
        });

        if (existingMember.length > 0) {
            return Response.json({ error: 'Team member already invited or exists' }, { status: 400 });
        }

        // Generate invitation token
        const invitationToken = crypto.randomUUID();

        // Assign a random color
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];
        const assignedColor = colors[Math.floor(Math.random() * colors.length)];

        // Create team member record
        const teamMember = await base44.asServiceRole.entities.TeamMember.create({
            business_id,
            email,
            full_name: full_name || email,
            role,
            status: 'pending_invitation',
            assigned_color: assignedColor,
            invitation_token: invitationToken,
            user_id: ''
        });

        // Send invitation email
        const invitationUrl = `${req.headers.get('origin')}/AcceptTeamInvitation?token=${invitationToken}`;
        
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: email,
            subject: `You've been invited to join ${business.name} on The HQ Roadmap`,
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #8B6F4E; margin: 0;">The HQ Roadmap</h1>
                        <p style="color: #6B7280; margin: 4px 0 0;">Business Growth Platform</p>
                    </div>
                    <h2 style="color: #1F2937;">You're Invited!</h2>
                    <p>Hi${full_name ? ' ' + full_name : ''},</p>
                    <p><strong>${user.full_name || user.email}</strong> has invited you to collaborate on <strong>${business.name}</strong> as a <strong>${role}</strong> on The HQ Roadmap.</p>
                    <p>Click the button below to accept your invitation and get started:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${invitationUrl}" style="display: inline-block; padding: 14px 32px; background-color: #8B6F4E; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Accept Invitation</a>
                    </div>
                    <p style="color: #6B7280; font-size: 13px;">Or copy and paste this link into your browser:<br><a href="${invitationUrl}" style="color: #8B6F4E;">${invitationUrl}</a></p>
                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
                    <p style="color: #6B7280; font-size: 13px;">Best regards,<br>The Business Minds HQ Team</p>
                </div>
            `
        });

        // Also create an in-app notification for the invited user (they may already be a platform member)
        try {
            await base44.asServiceRole.entities.Notification.create({
                recipient_email: email,
                type: 'team_invite',
                title: `📩 Team Invitation from ${business.name}`,
                message: `${user.full_name || user.email} has invited you to join ${business.name} as a ${role}. Check your email to accept.`,
                is_read: false,
                related_user_email: user.email,
                link: `/AcceptTeamInvitation?token=${invitationToken}`
            });
        } catch (notifyErr) {
            console.error('Failed to create in-app notification:', notifyErr);
        }

        return Response.json({ 
            success: true, 
            teamMember,
            message: 'Invitation sent successfully'
        });

    } catch (error) {
        console.error('Error inviting team member:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});