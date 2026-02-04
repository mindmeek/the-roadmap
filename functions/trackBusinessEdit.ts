import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { business_id, section_key } = await req.json();

        if (!business_id || !section_key) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get business and verify permission
        const business = await base44.entities.Business.get(business_id);
        
        // Check if user is a team member
        const teamMembers = await base44.entities.TeamMember.filter({
            business_id,
            user_id: user.id,
            status: 'active'
        });

        const teamMember = teamMembers[0];
        const isOwner = business.owner_user_id === user.id;

        if (!isOwner && !teamMember) {
            return Response.json({ error: 'Not a team member' }, { status: 403 });
        }

        // Update the last_edited_sections
        const lastEditedSections = business.last_edited_sections || {};
        lastEditedSections[section_key] = {
            team_member_id: teamMember?.id || user.id,
            team_member_color: teamMember?.assigned_color || '#8B6F4E',
            team_member_name: user.full_name,
            timestamp: new Date().toISOString()
        };

        await base44.asServiceRole.entities.Business.update(business_id, {
            last_edited_sections: lastEditedSections
        });

        return Response.json({ 
            success: true,
            message: 'Edit tracked successfully'
        });

    } catch (error) {
        console.error('Error tracking edit:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});