import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { invitation_id, accept } = await req.json();

        if (!invitation_id) {
            return Response.json({ error: 'Missing invitation ID' }, { status: 400 });
        }

        // Fetch invitation
        // Using asServiceRole because RLS might restrict reading if not carefully set, 
        // though standard RLS allows recipient to read. 
        // Safe to use standard access first, but logic requires updating status which might need write access.
        // Recipient usually can't write to invitation status if created_by is inviter.
        // So we use service role for the update.
        
        const invitations = await base44.asServiceRole.entities.BusinessInvitation.filter({
            id: invitation_id
        });

        if (!invitations || invitations.length === 0) {
            return Response.json({ error: 'Invitation not found' }, { status: 404 });
        }

        const invitation = invitations[0];

        if (invitation.recipient_email !== user.email) {
            return Response.json({ error: 'This invitation is not for you' }, { status: 403 });
        }

        if (invitation.status !== 'pending') {
            return Response.json({ error: `Invitation is already ${invitation.status}` }, { status: 400 });
        }

        if (accept) {
            // Create Member Record
            // Using service role to ensure creation even if RLS restricts
            await base44.asServiceRole.entities.BusinessMember.create({
                business_id: invitation.business_id,
                user_email: user.email,
                full_name: user.full_name,
                role: invitation.role_to_assign || 'member',
                profile_picture_url: user.profile_picture_url // assuming user has this
            });

            // Update Invitation Status
            await base44.asServiceRole.entities.BusinessInvitation.update(invitation.id, {
                status: 'accepted'
            });
            
            return Response.json({ success: true, status: 'accepted' });
        } else {
            // Decline
            await base44.asServiceRole.entities.BusinessInvitation.update(invitation.id, {
                status: 'declined'
            });
            return Response.json({ success: true, status: 'declined' });
        }

    } catch (error) {
        console.error("Accept Invitation Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});