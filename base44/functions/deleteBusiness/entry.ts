import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        const { business_id } = await req.json();
        if (!business_id) return Response.json({ error: 'business_id required' }, { status: 400 });

        // Verify user owns this business
        const business = await base44.entities.Business.get(business_id);
        if (!business || business.owner_user_id !== user.id) {
            return Response.json({ error: 'You do not own this business' }, { status: 403 });
        }

        // Check all owned businesses to prevent deleting the primary one
        const ownedBusinesses = await base44.asServiceRole.entities.Business.filter(
            { owner_user_id: user.id }, 'created_date', 50
        );

        if (ownedBusinesses.length <= 1) {
            return Response.json({ error: 'Cannot delete your only business. You must have at least one business.' }, { status: 400 });
        }

        // Main business = oldest owned business
        const sorted = [...ownedBusinesses].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        if (sorted[0].id === business_id) {
            return Response.json({ error: 'Cannot delete your primary (main) business. It is your oldest business.' }, { status: 400 });
        }

        // Delete all related data
        const [teamMembers, milestones] = await Promise.all([
            base44.asServiceRole.entities.TeamMember.filter({ business_id }),
            base44.asServiceRole.entities.BusinessMilestone.filter({ business_id })
        ]);

        await Promise.all([
            ...teamMembers.map(m => base44.asServiceRole.entities.TeamMember.delete(m.id)),
            ...milestones.map(m => base44.asServiceRole.entities.BusinessMilestone.delete(m.id))
        ]);

        await base44.asServiceRole.entities.Business.delete(business_id);

        return Response.json({ success: true });
    } catch (error) {
        console.error('deleteBusiness error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});