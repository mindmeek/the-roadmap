import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { team_member_id } = await req.json();

        if (!team_member_id) {
            return Response.json({ error: 'Missing team member ID' }, { status: 400 });
        }

        // Get the team member to remove
        const teamMemberToRemove = await base44.asServiceRole.entities.TeamMember.get(team_member_id);

        // Verify the requester has permission
        const business = await base44.entities.Business.get(teamMemberToRemove.business_id);
        const requesterTeamMember = await base44.entities.TeamMember.filter({
            business_id: teamMemberToRemove.business_id,
            user_id: user.id,
            status: 'active'
        });

        const hasPermission = business.owner_user_id === user.id || 
                            requesterTeamMember.some(tm => ['owner', 'admin'].includes(tm.role)) ||
                            user.role === 'admin';

        if (!hasPermission) {
            return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        // Cannot remove the owner
        if (teamMemberToRemove.role === 'owner') {
            return Response.json({ error: 'Cannot remove the business owner' }, { status: 400 });
        }

        // Notify the removed member via email before deleting
        try {
            await base44.asServiceRole.integrations.Core.SendEmail({
                to: teamMemberToRemove.email,
                subject: `You have been removed from ${business.name}`,
                body: `<p>Hi${teamMemberToRemove.full_name ? ' ' + teamMemberToRemove.full_name : ''},</p><p>You have been removed from the team at <strong>${business.name}</strong> on Business Minds.</p><p>If you believe this was a mistake, please contact the business owner.</p>`
            });
        } catch (notifyErr) {
            console.error('Failed to send removal email:', notifyErr);
        }

        // Delete the team member
        await base44.asServiceRole.entities.TeamMember.delete(team_member_id);

        return Response.json({ 
            success: true,
            message: 'Team member removed successfully'
        });

    } catch (error) {
        console.error('Error removing team member:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});