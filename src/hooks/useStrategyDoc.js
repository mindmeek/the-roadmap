import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook for loading and saving a strategy document, with team member support.
 * 
 * When the current user is a team member (not owner), it loads the owner's doc
 * via the service function, and saves as themselves but linked to the business.
 * 
 * @param {string} documentType - e.g. 'mission_vision', 'ideal_client', etc.
 * @param {object} defaultContent - default empty form state
 * 
 * Returns: { loading, saving, saved, formData, setFormData, saveDoc, user, ownerEmail, canEdit, business }
 */
export function useStrategyDoc(documentType, defaultContent) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState(defaultContent);
    const [user, setUser] = useState(null);
    const [ownerEmail, setOwnerEmail] = useState(null);
    const [docId, setDocId] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        loadDoc();
    }, [documentType]);

    const loadDoc = async () => {
        setLoading(true);
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            const selectedBusinessId = localStorage.getItem('selectedBusinessId');

            // Check if user owns a business matching selectedBusinessId
            let isOwner = false;
            let bizData = null;

            if (selectedBusinessId) {
                const ownedBizList = await base44.entities.Business.filter({ owner_user_id: userData.id });
                bizData = ownedBizList.find(b => b.id === selectedBusinessId) || null;
                isOwner = !!bizData;
            }

            if (!isOwner && !bizData) {
                // May be a team member — try fetching from service
                if (selectedBusinessId) {
                    try {
                        const result = await base44.functions.invoke('getBusinessTeamData', { business_id: selectedBusinessId });
                        const data = result.data;
                        if (data.success) {
                            bizData = data.business;
                            setBusiness(data.business);
                            setOwnerEmail(data.ownerEmail);
                            const editable = ['owner', 'admin', 'editor'].includes(data.myRole);
                            setCanEdit(editable);

                            // Find the doc in owner's strategy docs
                            const doc = data.strategyDocs.find(d => d.document_type === documentType);
                            if (doc) {
                                setFormData(doc.content || defaultContent);
                                setDocId(doc.id);
                            }
                            setLoading(false);
                            return;
                        }
                    } catch (e) {
                        console.error('Team member doc load error:', e);
                    }
                }

                // Fallback: load own docs
                setOwnerEmail(userData.email);
                setCanEdit(true);
                const docs = await base44.entities.StrategyDocument.filter({ created_by: userData.email, document_type: documentType });
                if (docs.length > 0) {
                    setFormData(docs[0].content || defaultContent);
                    setDocId(docs[0].id);
                }
                setLoading(false);
                return;
            }

            // Owner path
            setBusiness(bizData);
            setOwnerEmail(userData.email);
            setCanEdit(true);
            const docs = await base44.entities.StrategyDocument.filter({ created_by: userData.email, document_type: documentType });
            if (docs.length > 0) {
                setFormData(docs[0].content || defaultContent);
                setDocId(docs[0].id);
            }
        } catch (err) {
            console.error('useStrategyDoc load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const saveDoc = async (dataOverride) => {
        const contentToSave = dataOverride || formData;
        setSaving(true);
        try {
            const selectedBusinessId = localStorage.getItem('selectedBusinessId');
            const docData = {
                document_type: documentType,
                content: contentToSave,
                is_completed: true,
                last_updated: new Date().toISOString(),
                ...(selectedBusinessId ? { business_id: selectedBusinessId } : {})
            };

            if (docId) {
                // Try to update via service role function so team members can save
                if (ownerEmail && ownerEmail !== user?.email) {
                    // Team member saving — use the updateBusinessAsTeamAdmin approach
                    // Save as a new doc under the team member's own account but same business_id
                    // so the owner can see it
                    await base44.functions.invoke('saveStrategyDocAsTeamMember', {
                        doc_id: docId,
                        document_type: documentType,
                        content: contentToSave,
                        business_id: selectedBusinessId
                    });
                } else {
                    await base44.entities.StrategyDocument.update(docId, docData);
                }
            } else {
                if (ownerEmail && ownerEmail !== user?.email) {
                    await base44.functions.invoke('saveStrategyDocAsTeamMember', {
                        doc_id: null,
                        document_type: documentType,
                        content: contentToSave,
                        business_id: selectedBusinessId
                    });
                } else {
                    const newDoc = await base44.entities.StrategyDocument.create(docData);
                    setDocId(newDoc.id);
                }
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('saveDoc error:', err);
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return { loading, saving, saved, formData, setFormData, saveDoc, user, ownerEmail, canEdit, business };
}