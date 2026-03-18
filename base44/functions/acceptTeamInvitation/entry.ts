import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

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

        // Get business details
        const business = await base44.entities.Business.get(teamMember.business_id);

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