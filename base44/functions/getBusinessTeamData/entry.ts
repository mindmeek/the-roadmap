import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

/**
 * Returns all data a team member needs for a business:
 * - business info
 * - all team members
 * - all strategy documents
 * - business owner user info (for loading their financial projections)
 */
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

        // Verify this user is a member of this business (or the owner, or platform admin)
        const [business, teamMembers] = await Promise.all([
            base44.asServiceRole.entities.Business.get(business_id),
            base44.asServiceRole.entities.TeamMember.filter({ business_id })
        ]);

        if (!business) {
            return Response.json({ error: 'Business not found' }, { status: 404 });
        }

        const isOwner = business.owner_user_id === user.id;
        const isMember = teamMembers.some(m => 
            (m.user_id === user.id || m.email === user.email) && m.status === 'active'
        );
        const isPlatformAdmin = user.role === 'admin';

        if (!isOwner && !isMember && !isPlatformAdmin) {
            return Response.json({ error: 'Access denied' }, { status: 403 });
        }

        // Get owner user record to find their email (for loading strategy docs)
        const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
        const ownerUser = ownerUsers[0] || null;
        const ownerEmail = ownerUser?.email;

        // Load all strategy docs created by the owner for this business
        let strategyDocs = [];
        if (ownerEmail) {
            strategyDocs = await base44.asServiceRole.entities.StrategyDocument.filter({ 
                created_by: ownerEmail 
            });
        }

        // Determine current user's role
        const myMemberRecord = teamMembers.find(m => m.user_id === user.id || m.email === user.email);
        const myRole = isOwner ? 'owner' : (myMemberRecord?.role || null);

        return Response.json({
            success: true,
            business,
            teamMembers,
            strategyDocs,
            ownerEmail,
            ownerUser: ownerUser ? { id: ownerUser.id, email: ownerUser.email, full_name: ownerUser.full_name, financial_projections: ownerUser.financial_projections } : null,
            myRole,
            isOwner
        });

    } catch (error) {
        console.error('Error getting business team data:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});