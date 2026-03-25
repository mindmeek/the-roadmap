import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { business_id, document_type, title, content, is_completed, doc_id } = body;

    if (!business_id || !document_type || content === undefined) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const business = await base44.asServiceRole.entities.Business.get(business_id);
    if (!business) {
        return Response.json({ error: 'Business not found' }, { status: 404 });
    }

    const isOwner = business.owner_user_id === user.id;
    if (!isOwner) {
        const memberships = await base44.asServiceRole.entities.TeamMember.filter({
            business_id,
            user_id: user.id,
            status: 'active'
        });
        const canEdit = memberships.some(m => ['editor', 'admin', 'owner'].includes(m.role));
        if (!canEdit && user.role !== 'admin') {
            return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
        }
    }

    const docData = {
        document_type,
        title: title || document_type,
        content,
        is_completed: is_completed !== undefined ? is_completed : true,
        last_updated: new Date().toISOString(),
        business_id
    };

    let savedDoc;
    if (doc_id) {
        savedDoc = await base44.asServiceRole.entities.StrategyDocument.update(doc_id, docData);
    } else {
        const existing = await base44.asServiceRole.entities.StrategyDocument.filter({
            business_id,
            document_type
        });
        if (existing.length > 0) {
            savedDoc = await base44.asServiceRole.entities.StrategyDocument.update(existing[0].id, docData);
        } else {
            savedDoc = await base44.asServiceRole.entities.StrategyDocument.create(docData);
        }
    }

    return Response.json({ success: true, doc: savedDoc });
});