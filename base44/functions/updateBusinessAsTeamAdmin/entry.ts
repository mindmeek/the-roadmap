import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

/**
 * Allows team members with 'admin' (or 'owner') role to update a business entity.
 * Uses service role to bypass RLS since the Business entity only allows owner writes.
 */
Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, update_data } = await req.json();

        if (!business_id || !update_data) {
            return Response.json({ error: 'Missing business_id or update_data' }, { status: 400 });
        }

        // Fetch the business
        const business = await base44.asServiceRole.entities.Business.get(business_id);
        if (!business) {
            return Response.json({ error: 'Business not found' }, { status: 404 });
        }

        // Check if user is the owner
        const isOwner = business.owner_user_id === user.id;

        // Check if user is an active admin team member
        let isTeamAdmin = false;
        if (!isOwner) {
            const teamMembers = await base44.asServiceRole.entities.TeamMember.filter({
                business_id,
                user_id: user.id,
                status: 'active'
            });
            isTeamAdmin = teamMembers.some(tm => ['admin', 'owner'].includes(tm.role));
        }

        // Platform admins also have access
        const isPlatformAdmin = user.role === 'admin';

        if (!isOwner && !isTeamAdmin && !isPlatformAdmin) {
            return Response.json({ error: 'Insufficient permissions. Only owners and admin team members can update business info.' }, { status: 403 });
        }

        // Perform the update with service role to bypass RLS
        const updated = await base44.asServiceRole.entities.Business.update(business_id, update_data);

        return Response.json({ success: true, business: updated });

    } catch (error) {
        console.error('Error updating business:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});