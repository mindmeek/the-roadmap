import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized - Please log in first' }, { status: 401 });
        }

        const { token } = await req.json();

        if (!token) {
            return Response.json({ error: 'Missing invitation token' }, { status: 400 });
        }

        // Find the team member by token
        const teamMembers = await base44.asServiceRole.entities.TeamMember.filter({
            invitation_token: token,
            status: 'pending_invitation'
        });

        if (teamMembers.length === 0) {
            return Response.json({ error: 'Invalid or expired invitation' }, { status: 404 });
        }

        const teamMember = teamMembers[0];

        // Verify the email matches (case-insensitive)
        if (teamMember.email.toLowerCase() !== user.email.toLowerCase()) {
            return Response.json({ 
                error: 'This invitation is for a different email address. Please log in with the invited email or contact the team owner.' 
            }, { status: 403 });
        }

        // Update team member status
        await base44.asServiceRole.entities.TeamMember.update(teamMember.id, {
            status: 'active',
            user_id: user.id,
            full_name: user.full_name,
            invitation_token: ''
        });

        // Get business details (use service role so it works regardless of RLS)
        const business = await base44.asServiceRole.entities.Business.get(teamMember.business_id);

        // Notify the business owner that someone accepted the invite
        try {
            const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
            if (ownerUsers.length > 0) {
                const ownerEmail = ownerUsers[0].email;
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: ownerEmail,
                    subject: `${user.full_name || user.email} joined your team on Business Minds`,
                    body: `<h2>New Team Member!</h2><p><strong>${user.full_name || user.email}</strong> has accepted your invitation and joined <strong>${business.name}</strong> as a <strong>${teamMember.role}</strong>.</p><p><a href="${req.headers.get('origin')}/TeamCollaboration" style="display:inline-block;padding:12px 24px;background-color:#8B6F4E;color:white;text-decoration:none;border-radius:5px;">View Team</a></p>`
                });
                await base44.asServiceRole.entities.Notification.create({
                    recipient_email: ownerEmail,
                    type: 'team_invite_accepted',
                    title: '🎉 New Team Member Joined',
                    message: `${user.full_name || user.email} accepted your invitation and joined ${business.name} as ${teamMember.role}.`,
                    is_read: false,
                    related_user_email: user.email,
                    link: '/TeamCollaboration'
                });
            }
        } catch (notifyErr) {
            console.error('Failed to notify owner:', notifyErr);
        }

        return Response.json({ 
            success: true,
            business,
            role: teamMember.role,
            message: 'Successfully joined the team!'
        });

    } catch (error) {
        console.error('Error accepting invitation:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});