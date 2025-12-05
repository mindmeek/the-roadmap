import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

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

        // Check if user is a member of the business
        // We use service role to ensure we can find all members regardless of standard RLS
        // (Standard RLS might only show "me")
        const requesterMembership = await base44.asServiceRole.entities.BusinessMember.filter({
            business_id: business_id,
            user_email: user.email
        });

        if (requesterMembership.length === 0) {
            return Response.json({ error: 'You are not a member of this business' }, { status: 403 });
        }

        // If member, fetch all members of that business
        const members = await base44.asServiceRole.entities.BusinessMember.filter({
            business_id: business_id
        });

        return Response.json({ members });

    } catch (error) {
        console.error("Get Members Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});