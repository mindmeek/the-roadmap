import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

        const { business_id } = await req.json();
        if (!business_id) return Response.json({ error: 'business_id required' }, { status: 400 });

        // Verify user is NOT the owner
        const business = await base44.entities.Business.get(business_id);
        if (business && business.owner_user_id === user.id) {
            return Response.json({ error: 'Business owners cannot leave. Delete the business instead.' }, { status: 400 });
        }

        // Find the membership record
        const memberships = await base44.entities.TeamMember.filter({
            business_id,
            email: user.email
        });

        if (memberships.length === 0) {
            return Response.json({ error: 'You are not a member of this business' }, { status: 404 });
        }

        await base44.entities.TeamMember.delete(memberships[0].id);

        return Response.json({ success: true });
    } catch (error) {
        console.error('leaveBusinessTeam error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});