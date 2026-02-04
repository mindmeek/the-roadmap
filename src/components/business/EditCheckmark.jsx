import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function EditCheckmark({ business, sectionKey }) {
    if (!business?.last_edited_sections?.[sectionKey]) {
        return null;
    }

    const editInfo = business.last_edited_sections[sectionKey];

    return (
        <div className="inline-flex items-center gap-1 ml-2">
            <CheckCircle
                className="w-4 h-4"
                style={{ color: editInfo.team_member_color }}
                title={`Last edited by ${editInfo.team_member_name || 'Team Member'} on ${new Date(editInfo.timestamp).toLocaleDateString()}`}
            />
        </div>
    );
}