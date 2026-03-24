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
            subject: `You're invited to join ${business.name} on Business Minds`,
            body: `
                <h2>Team Invitation</h2>
                <p>Hi${full_name ? ' ' + full_name : ''},</p>
                <p>You've been invited to join <strong>${business.name}</strong> as a <strong>${role}</strong>.</p>
                <p>Click the link below to accept the invitation:</p>
                <a href="${invitationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #8B6F4E; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Accept Invitation</a>
                <p>Or copy this link: ${invitationUrl}</p>
                <p>This invitation was sent by ${user.full_name} (${user.email}).</p>
                <br>
                <p>Best regards,<br>The Business Minds Team</p>
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