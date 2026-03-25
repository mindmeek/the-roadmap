import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook that resolves the "active business context" for the current user.
 * - If the user owns the selectedBusinessId, returns their own data.
 * - If they are a team member of it, fetches the owner's data via service function.
 * 
 * Returns:
 *   { 
 *     loading, 
 *     business,          // Business entity
 *     teamMembers,       // All team members
 *     strategyDocs,      // Owner's strategy documents
 *     ownerEmail,        // Owner's email (for doc filtering)
 *     ownerUser,         // Owner's user record
 *     myRole,            // Current user's role: 'owner'|'admin'|'editor'|'viewer'
 *     isOwner,           // boolean
 *     currentUser,       // Authenticated user
 *     canEdit,           // boolean - can edit forms
 *     reload             // function to reload
 *   }
 */
export function useBusinessContext() {
    const [state, setState] = useState({
        loading: true,
        business: null,
        teamMembers: [],
        strategyDocs: [],
        ownerEmail: null,
        ownerUser: null,
        myRole: null,
        isOwner: false,
        currentUser: null,
        canEdit: false,
    });

    const load = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const user = await base44.auth.me();
            const selectedBusinessId = localStorage.getItem('selectedBusinessId');

            if (!selectedBusinessId) {
                // No business selected — try to find one they own
                const ownedBusinesses = await base44.entities.Business.filter({ owner_user_id: user.id }, '-updated_date', 1);
                if (ownedBusinesses.length > 0) {
                    const biz = ownedBusinesses[0];
                    localStorage.setItem('selectedBusinessId', biz.id);
                    const [teamMembers, strategyDocs] = await Promise.all([
                        base44.entities.TeamMember.filter({ business_id: biz.id }),
                        base44.entities.StrategyDocument.filter({ created_by: user.email })
                    ]);
                    setState({
                        loading: false,
                        business: biz,
                        teamMembers,
                        strategyDocs,
                        ownerEmail: user.email,
                        ownerUser: user,
                        myRole: 'owner',
                        isOwner: true,
                        currentUser: user,
                        canEdit: true,
                    });
                } else {
                    // Check if they are a member of any business
                    const memberRecords = await base44.entities.TeamMember.filter({ email: user.email, status: 'active' });
                    if (memberRecords.length > 0) {
                        const firstMember = memberRecords[0];
                        localStorage.setItem('selectedBusinessId', firstMember.business_id);
                        await loadAsTeamMember(user, firstMember.business_id);
                    } else {
                        setState({ loading: false, business: null, teamMembers: [], strategyDocs: [], ownerEmail: null, ownerUser: null, myRole: null, isOwner: false, currentUser: user, canEdit: false });
                    }
                }
                return;
            }

            // Check if user owns this business
            const ownedBusinesses = await base44.entities.Business.filter({ owner_user_id: user.id }, '-updated_date', 20);
            const ownedBiz = ownedBusinesses.find(b => b.id === selectedBusinessId);

            if (ownedBiz) {
                // Owner path
                const [teamMembers, strategyDocs] = await Promise.all([
                    base44.entities.TeamMember.filter({ business_id: ownedBiz.id }),
                    base44.entities.StrategyDocument.filter({ created_by: user.email })
                ]);
                setState({
                    loading: false,
                    business: ownedBiz,
                    teamMembers,
                    strategyDocs,
                    ownerEmail: user.email,
                    ownerUser: user,
                    myRole: 'owner',
                    isOwner: true,
                    currentUser: user,
                    canEdit: true,
                });
            } else {
                // Team member path — use service function
                await loadAsTeamMember(user, selectedBusinessId);
            }
        } catch (err) {
            console.error('useBusinessContext error:', err);
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const loadAsTeamMember = async (user, businessId) => {
        try {
            const result = await base44.functions.invoke('getBusinessTeamData', { business_id: businessId });
            const data = result.data;
            if (data.success) {
                const canEdit = ['owner', 'admin', 'editor'].includes(data.myRole);
                setState({
                    loading: false,
                    business: data.business,
                    teamMembers: data.teamMembers,
                    strategyDocs: data.strategyDocs,
                    ownerEmail: data.ownerEmail,
                    ownerUser: data.ownerUser,
                    myRole: data.myRole,
                    isOwner: data.isOwner,
                    currentUser: user,
                    canEdit,
                });
            } else {
                setState(prev => ({ ...prev, loading: false, currentUser: user }));
            }
        } catch (err) {
            console.error('loadAsTeamMember error:', err);
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        load();
    }, []);

    return { ...state, reload: load };
}