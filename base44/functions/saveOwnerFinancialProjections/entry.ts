import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, financial_projections } = await req.json();

        if (!business_id || !financial_projections) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify user has access to this business
        const business = await base44.asServiceRole.entities.Business.get(business_id);
        if (!business) {
            return Response.json({ error: 'Business not found' }, { status: 404 });
        }

        const isOwner = business.owner_user_id === user.id;

        if (!isOwner) {
            // Check team membership - all roles can now edit
            const teamMembers = await base44.asServiceRole.entities.TeamMember.filter({
                business_id,
                user_id: user.id,
                status: 'active'
            });
            if (teamMembers.length === 0 && user.role !== 'admin') {
                return Response.json({ error: 'Access denied' }, { status: 403 });
            }
        }

        // Update the owner's financial projections using service role
        const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
        if (ownerUsers.length === 0) {
            return Response.json({ error: 'Owner not found' }, { status: 404 });
        }

        await base44.asServiceRole.entities.User.update(ownerUsers[0].id, {
            financial_projections
        });

        return Response.json({ success: true });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});