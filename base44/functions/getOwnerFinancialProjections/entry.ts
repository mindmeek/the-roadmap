import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id } = await req.json();

        if (!business_id) {
            return Response.json({ error: 'Missing business_id' }, { status: 400 });
        }

        // Verify user is a member of this business
        const business = await base44.asServiceRole.entities.Business.get(business_id);
        if (!business) {
            return Response.json({ error: 'Business not found' }, { status: 404 });
        }

        const isOwner = business.owner_user_id === user.id;
        let myRole = isOwner ? 'owner' : null;

        if (!isOwner) {
            const teamMembers = await base44.asServiceRole.entities.TeamMember.filter({
                business_id,
                user_id: user.id,
                status: 'active'
            });
            if (teamMembers.length === 0 && user.role !== 'admin') {
                return Response.json({ error: 'Access denied' }, { status: 403 });
            }
            myRole = teamMembers[0]?.role || 'viewer';
        }

        // Get the owner's user data including financial_projections
        const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
        if (ownerUsers.length === 0) {
            return Response.json({ error: 'Owner not found' }, { status: 404 });
        }

        const ownerUser = ownerUsers[0];

        return Response.json({
            success: true,
            financial_projections: ownerUser.financial_projections || null,
            ownerUserId: business.owner_user_id,
            myRole
        });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});