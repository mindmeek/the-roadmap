import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, recipient_email, role_to_assign, message } = await req.json();

        if (!business_id || !recipient_email) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify inviter has permission (owner or admin of the business)
        const membership = await base44.entities.BusinessMember.filter({
            business_id: business_id,
            user_email: user.email,
            role: { $in: ['owner', 'admin'] }
        });

        if (!membership || membership.length === 0) {
            return Response.json({ error: 'You do not have permission to invite members to this business' }, { status: 403 });
        }

        // Check if recipient is already a member
        const existingMember = await base44.entities.BusinessMember.filter({
            business_id: business_id,
            user_email: recipient_email
        });

        if (existingMember.length > 0) {
            return Response.json({ error: 'User is already a member of this business' }, { status: 400 });
        }

        // Check for existing pending invitation
        const existingInvite = await base44.entities.BusinessInvitation.filter({
            business_id: business_id,
            recipient_email: recipient_email,
            status: 'pending'
        });

        if (existingInvite.length > 0) {
            return Response.json({ error: 'A pending invitation already exists for this user' }, { status: 400 });
        }

        // Create Invitation
        const invitation = await base44.entities.BusinessInvitation.create({
            business_id,
            inviter_user_id: user.id,
            recipient_email,
            role_to_assign: role_to_assign || 'member',
            status: 'pending',
            message
        });

        // Create notification for recipient
        // Note: If recipient doesn't exist in User entity yet, they won't see this until they sign up.
        // Ideally we'd send an email here too using an email integration.
        await base44.asServiceRole.entities.Notification.create({
            recipient_email: recipient_email,
            type: 'general', // or specific type if added to enum
            title: 'New Business Invitation',
            message: `You have been invited to join a business.`,
            link: '/MyBusinesses' // Assumes we'll update MyBusinesses to handle invites
        });

        return Response.json({ success: true, invitation });

    } catch (error) {
        console.error("Invite Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});