import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

/**
 * Allows a team member (editor/admin/owner) to save/update a strategy document
 * for a business they are a member of. Uses service role to bypass RLS.
 */
Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { doc_id, document_type, content, business_id } = await req.json();

        if (!document_type || !content || !business_id) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify user is an active team member of this business with edit rights
        const [business, teamMembers] = await Promise.all([
            base44.asServiceRole.entities.Business.get(business_id),
            base44.asServiceRole.entities.TeamMember.filter({ business_id })
        ]);

        if (!business) {
            return Response.json({ error: 'Business not found' }, { status: 404 });
        }

        const isOwner = business.owner_user_id === user.id;
        const myMember = teamMembers.find(m => (m.user_id === user.id || m.email === user.email) && m.status === 'active');
        const canEdit = isOwner || ['admin', 'editor', 'owner'].includes(myMember?.role) || user.role === 'admin';

        if (!canEdit) {
            return Response.json({ error: 'Insufficient permissions to edit this document' }, { status: 403 });
        }

        const docData = {
            document_type,
            content,
            is_completed: true,
            last_updated: new Date().toISOString(),
            business_id
        };

        let savedDoc;
        if (doc_id) {
            // Update the existing doc (using service role)
            savedDoc = await base44.asServiceRole.entities.StrategyDocument.update(doc_id, docData);
        } else {
            // Check if a doc already exists for this business + document_type
            // Get the owner email first
            const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
            const ownerEmail = ownerUsers[0]?.email;

            if (ownerEmail) {
                const existingDocs = await base44.asServiceRole.entities.StrategyDocument.filter({
                    created_by: ownerEmail,
                    document_type
                });
                if (existingDocs.length > 0) {
                    savedDoc = await base44.asServiceRole.entities.StrategyDocument.update(existingDocs[0].id, docData);
                } else {
                    // Create under owner's email using service role
                    savedDoc = await base44.asServiceRole.entities.StrategyDocument.create({
                        ...docData,
                        created_by: ownerEmail
                    });
                }
            } else {
                savedDoc = await base44.asServiceRole.entities.StrategyDocument.create(docData);
            }
        }

        return Response.json({ success: true, doc: savedDoc });

    } catch (error) {
        console.error('Error saving strategy doc:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});