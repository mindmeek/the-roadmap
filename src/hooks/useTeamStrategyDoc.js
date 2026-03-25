/**
 * useTeamStrategyDoc
 * 
 * A hook that loads and saves a strategy document for the current business,
 * supporting both owners and team members via backend functions.
 * 
 * Usage:
 *   const { formData, setFormData, loading, saving, saved, saveDoc, docId, canEdit } = useTeamStrategyDoc('mission_vision');
 */
import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function useTeamStrategyDoc(documentType) {
    const [formData, setFormData] = useState(null);
    const [docId, setDocId] = useState(null);
    const [businessId, setBusinessId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadDoc();
    }, [documentType]);

    const loadDoc = async () => {
        setLoading(true);
        try {
            const userData = await base44.auth.me();
            setUser(userData);

            const selectedBusinessId = localStorage.getItem('selectedBusinessId');

            // Use the team business data function to get business + docs
            const result = await base44.functions.invoke('getTeamBusinessData', {
                business_id: selectedBusinessId || null
            });

            const { business, strategyDocs, myRole } = result.data;

            if (business) {
                setBusinessId(business.id);
                // Only viewers cannot edit
                const editableRoles = ['owner', 'admin', 'editor'];
                setCanEdit(editableRoles.includes(myRole) || userData.role === 'admin');
            } else {
                // No team business found — fall back to user's own docs (owner creating first doc)
                setCanEdit(true);
            }

            // Find the doc for this document type
            const doc = strategyDocs?.find(d => d.document_type === documentType);
            if (doc) {
                setFormData(doc.content);
                setDocId(doc.id);
            }
        } catch (error) {
            console.error('Error loading strategy doc:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveDoc = async (dataOverride, titleOverride) => {
        const dataToSave = dataOverride ?? formData;
        if (!dataToSave) return;

        setSaving(true);
        try {
            if (businessId) {
                // Save via backend function (supports team members)
                const result = await base44.functions.invoke('saveStrategyDocument', {
                    business_id: businessId,
                    document_type: documentType,
                    title: titleOverride,
                    content: dataToSave,
                    is_completed: true,
                    doc_id: docId || null
                });
                if (result.data?.doc?.id) {
                    setDocId(result.data.doc.id);
                }
            } else {
                // Fallback: direct save for owner without a Business entity yet
                const existing = await base44.entities.StrategyDocument.filter({
                    created_by: user.email,
                    document_type: documentType
                });
                const docData = {
                    document_type: documentType,
                    title: titleOverride || documentType,
                    content: dataToSave,
                    is_completed: true,
                    last_updated: new Date().toISOString()
                };
                if (existing.length > 0) {
                    await base44.entities.StrategyDocument.update(existing[0].id, docData);
                    setDocId(existing[0].id);
                } else {
                    const created = await base44.entities.StrategyDocument.create(docData);
                    setDocId(created.id);
                }
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving strategy doc:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    return { formData, setFormData, loading, saving, saved, saveDoc, docId, businessId, canEdit, user };
}