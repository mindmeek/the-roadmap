import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

/**
 * Called after a new StrategyDocumentComment is posted.
 * Notifies all active team members on the business (except the commenter).
 */
Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { document_id, document_type, business_id, comment_content, section, author_name } = await req.json();

        if (!document_id || !business_id) {
            return Response.json({ error: 'Missing document_id or business_id' }, { status: 400 });
        }

        const DOC_LABELS = {
            business_model_canvas: 'Business Plan',
            swot_analysis: 'SWOT Analysis',
            ideal_client: 'Ideal Client',
            value_proposition_canvas: 'Value Proposition',
            value_ladder: 'Value Ladder',
            customer_journey: 'Customer Journey',
            define_your_why: 'Define Your Why',
            pricing_strategies: 'Pricing Strategies',
        };
        const docLabel = DOC_LABELS[document_type] || document_type || 'Strategy Document';
        const sectionText = section ? ` (section: ${section})` : '';
        const preview = comment_content?.length > 80 ? comment_content.substring(0, 80) + '...' : comment_content;

        // Get all active team members for this business
        const teamMembers = await base44.asServiceRole.entities.TeamMember.filter({
            business_id,
            status: 'active'
        });

        // Also get the business owner
        const business = await base44.asServiceRole.entities.Business.get(business_id);
        const ownerUsers = await base44.asServiceRole.entities.User.filter({ id: business.owner_user_id });
        const ownerEmail = ownerUsers.length > 0 ? ownerUsers[0].email : null;

        // Collect all emails to notify (excluding the commenter)
        const recipientEmails = new Set();
        teamMembers.forEach(m => {
            if (m.email && m.email !== user.email) recipientEmails.add(m.email);
        });
        if (ownerEmail && ownerEmail !== user.email) recipientEmails.add(ownerEmail);

        // Send notifications
        const notifyPromises = [...recipientEmails].map(email =>
            base44.asServiceRole.entities.Notification.create({
                recipient_email: email,
                type: 'team_comment',
                title: `💬 New comment on ${docLabel}`,
                message: `${author_name || user.full_name || user.email} commented${sectionText}: "${preview}"`,
                is_read: false,
                related_user_email: user.email,
                link: '/TeamCollaboration'
            }).catch(err => console.error('Failed to notify:', email, err))
        );

        await Promise.all(notifyPromises);

        return Response.json({ success: true, notified: recipientEmails.size });

    } catch (error) {
        console.error('Error sending team comment notifications:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});