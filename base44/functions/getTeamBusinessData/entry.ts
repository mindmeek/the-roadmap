import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

// Returns the business + strategy docs + team members for a business the user owns or is a member of
Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id } = await req.json();

        // Find all businesses this user is either owner of OR active team member of
        let targetBusinessId = business_id;

        if (!targetBusinessId) {
            // Try owner first
            const ownedBusinesses = await base44.asServiceRole.entities.Business.filter({ owner_user_id: user.id }, '-updated_date', 1);
            if (ownedBusinesses.length > 0) {
                targetBusinessId = ownedBusinesses[0].id;
            } else {
                // Try team membership
                const memberships = await base44.asServiceRole.entities.TeamMember.filter({
                    user_id: user.id,
                    status: 'active'
                });
                if (memberships.length > 0) {
                    targetBusinessId = memberships[0].business_id;
                }
            }
        }

        if (!targetBusinessId) {
            return Response.json({ business: null, teamMembers: [], strategyDocs: [], myRole: null });
        }

        // Verify user has access to this business
        const business = await base44.asServiceRole.entities.Business.get(targetBusinessId);
        
        const isOwner = business.owner_user_id === user.id;
        let myRole = isOwner ? 'owner' : null;

        if (!isOwner) {
            const membership = await base44.asServiceRole.entities.TeamMember.filter({
                business_id: targetBusinessId,
                user_id: user.id,
                status: 'active'
            });
            if (membership.length === 0 && user.role !== 'admin') {
                return Response.json({ error: 'Access denied' }, { status: 403 });
            }
            myRole = membership[0]?.role || (user.role === 'admin' ? 'admin' : null);
        }

        // Fetch team members and strategy docs for this business
        const [teamMembers, strategyDocs] = await Promise.all([
            base44.asServiceRole.entities.TeamMember.filter({ business_id: targetBusinessId }),
            base44.asServiceRole.entities.StrategyDocument.filter({ business_id: targetBusinessId }, '-updated_date', 50)
        ]);

        // If no docs with business_id, fall back to owner's docs (migration)
        let docsToReturn = strategyDocs;
        if (strategyDocs.length === 0) {
            try {
                const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
                if (ownerUsers.length > 0) {
                    const ownerEmail = ownerUsers[0].email;
                    const ownerDocs = await base44.asServiceRole.entities.StrategyDocument.filter(
                        { created_by: ownerEmail }, '-updated_date', 50
                    );
                    docsToReturn = ownerDocs;
                }
            } catch (migrationErr) {
                console.error('Migration fallback failed:', migrationErr);
            }
        }

        // Also get the business owner's financial data (user profile) to share with team
        const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
        const ownerProfile = ownerUsers.length > 0 ? {
            financial_projections: ownerUsers[0].financial_projections,
            business_name: ownerUsers[0].business_name,
            industry: ownerUsers[0].industry,
            entrepreneurship_stage: ownerUsers[0].entrepreneurship_stage,
        } : null;

        return Response.json({
            business,
            teamMembers,
            strategyDocs: docsToReturn,
            myRole,
            ownerProfile
        });

    } catch (error) {
        console.error('Error fetching team business data:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});