import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_member_id } = await req.json();

        if (!business_member_id) {
            return Response.json({ error: 'Missing business_member_id' }, { status: 400 });
        }

        // Fetch the member record to be removed
        const targetMemberRecords = await base44.asServiceRole.entities.BusinessMember.filter({
            id: business_member_id
        });

        if (!targetMemberRecords || targetMemberRecords.length === 0) {
            return Response.json({ error: 'Member not found' }, { status: 404 });
        }

        const targetMember = targetMemberRecords[0];

        // Verify requester permission
        // Requester must be 'owner' or 'admin' of the business
        const requesterMembership = await base44.asServiceRole.entities.BusinessMember.filter({
            business_id: targetMember.business_id,
            user_email: user.email,
            role: { $in: ['owner', 'admin'] }
        });

        if (requesterMembership.length === 0) {
            return Response.json({ error: 'You do not have permission to remove members from this business' }, { status: 403 });
        }

        // Prevent removing the last owner (or specific owner logic)
        if (targetMember.role === 'owner') {
             // Check if there are other owners
             const otherOwners = await base44.asServiceRole.entities.BusinessMember.filter({
                 business_id: targetMember.business_id,
                 role: 'owner'
             });
             
             // If target is the only owner, prevent removal (must delete business or transfer ownership)
             // Actually, allow removing if there's at least 1 other owner.
             // If this is the *only* owner, prevent.
             if (otherOwners.length <= 1) {
                 return Response.json({ error: 'Cannot remove the last owner. Please transfer ownership or delete the business.' }, { status: 400 });
             }
        }

        // Delete the member
        await base44.asServiceRole.entities.BusinessMember.delete(business_member_id);

        return Response.json({ success: true });

    } catch (error) {
        console.error("Remove Member Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});