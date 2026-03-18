import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { team_member_id, new_role } = await req.json();

        if (!team_member_id || !new_role) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const validRoles = ['owner', 'admin', 'editor', 'viewer'];
        if (!validRoles.includes(new_role)) {
            return Response.json({ error: 'Invalid role' }, { status: 400 });
        }

        // Get the team member to update
        const teamMemberToUpdate = await base44.asServiceRole.entities.TeamMember.get(team_member_id);

        // Verify the requester has permission
        const business = await base44.entities.Business.get(teamMemberToUpdate.business_id);
        const requesterTeamMember = await base44.entities.TeamMember.filter({
            business_id: teamMemberToUpdate.business_id,
            user_id: user.id,
            status: 'active'
        });

        const hasPermission = business.owner_user_id === user.id || 
                            requesterTeamMember.some(tm => tm.role === 'owner') ||
                            user.role === 'admin';

        if (!hasPermission) {
            return Response.json({ error: 'Only owners can change roles' }, { status: 403 });
        }

        // Update the role
        await base44.asServiceRole.entities.TeamMember.update(team_member_id, {
            role: new_role
        });

        return Response.json({ 
            success: true,
            message: 'Role updated successfully'
        });

    } catch (error) {
        console.error('Error updating team member role:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});