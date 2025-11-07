import React, { useState, useEffect, useRef } from 'react';
import { User, Partner } from '@/entities/all';
import { UploadFile } from '@/integrations/Core';
import { Handshake, Plus, Loader2, X, Trash2 } from 'lucide-react';

const PartnerFormModal = ({ isOpen, onClose, onSubmit, partner, setPartner }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const { file_url } = await UploadFile({ file });
            setPartner(prev => ({ ...prev, logo_url: file_url }));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(partner);
            onClose();
        } catch (error) {
            console.error('Error creating/updating partner:', error);
        }
        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                    <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">{partner.id ? 'Edit Partner' : 'Add New Partner'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Partner Name" value={partner.name || ''} onChange={e => setPartner({...partner, name: e.target.value})} className="form-input" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="url" placeholder="Website URL" value={partner.website_url || ''} onChange={e => setPartner({...partner, website_url: e.target.value})} className="form-input" required />
                        <input type="text" placeholder="Category" value={partner.category || ''} onChange={e => setPartner({...partner, category: e.target.value})} className="form-input" required />
                    </div>
                    <textarea placeholder="Description" value={partner.description || ''} onChange={e => setPartner({...partner, description: e.target.value})} className="form-input h-24" required />
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Logo</label>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="form-input" accept="image/*" />
                        {partner.logo_url && (
                            <div className="mt-2">
                                <img src={partner.logo_url} alt="Preview" className="h-16 w-32 object-contain" />
                            </div>
                        )}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : partner.id ? 'Update Partner' : 'Add Partner'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default function PartnersPage() {
    const [user, setUser] = useState(null);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPartnerForm, setShowPartnerForm] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);
    
    const newPartnerTemplate = { name: "", logo_url: "", website_url: "", description: "", category: "" };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [userData, partnerData] = await Promise.all([ User.me(), Partner.list('-created_date') ]);
            setUser(userData);
            setPartners(partnerData);
        } catch (error) {
            console.error("Error loading partner data:", error);
        }
        setLoading(false);
    };

    const handleSavePartner = async (partnerData) => {
        if (partnerData.id) {
            await Partner.update(partnerData.id, partnerData);
        } else {
            await Partner.create(partnerData);
        }
        await loadData();
    };

    const handleDeletePartner = async (partnerId) => {
        if (window.confirm("Are you sure you want to delete this partner?")) {
            await Partner.delete(partnerId);
            await loadData();
        }
    };

    const openForm = (partner = null) => {
        setEditingPartner(partner ? {...partner} : {...newPartnerTemplate});
        setShowPartnerForm(true);
    };

    const closeForm = () => {
        setEditingPartner(null);
        setShowPartnerForm(false);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            {showPartnerForm && (
                <PartnerFormModal isOpen={showPartnerForm} onClose={closeForm} onSubmit={handleSavePartner} partner={editingPartner} setPartner={setEditingPartner} />
            )}
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="card p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full md:w-auto mb-4 md:mb-0">
                            <div className="bg-gray-100 dark:bg-gray-700 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                                <Handshake className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl">Our Partners</h1>
                                <p className="text-[var(--text-soft)] text-base md:text-lg">Exclusive deals on tools we trust.</p>
                            </div>
                        </div>
                         {user && user.role === 'admin' && (
                            <button onClick={() => openForm()} className="btn btn-primary w-full md:w-auto">
                                <Plus className="w-4 h-4" /> Add New Partner
                            </button>
                        )}
                    </div>
                </div>

                {partners.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partners.map(partner => (
                            <div key={partner.id} className="card p-6 text-center flex flex-col items-center relative group">
                                {user && user.role === 'admin' && (
                                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => openForm(partner)} className="p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white"><Plus className="w-4 h-4" /></button>
                                        <button onClick={() => handleDeletePartner(partner.id)} className="p-2 bg-white/50 backdrop-blur-sm rounded-full text-red-500 hover:bg-white"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                )}
                                <div className="h-20 flex items-center justify-center mb-4">
                                    <img src={partner.logo_url} alt={`${partner.name} logo`} className="max-h-16 max-w-full" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{partner.name}</h3>
                                <p className="text-sm text-[var(--text-soft)] flex-grow mb-4">{partner.description}</p>
                                <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full mt-auto">
                                    Visit Website
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center card p-12">
                         <Handshake className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                         <h3 className="text-xl font-bold text-[var(--text-main)]">No Partners Yet</h3>
                         <p className="text-[var(--text-soft)] mt-2">Check back soon for exclusive deals and recommended tools.</p>
                         {user && user.role === 'admin' && (
                            <button onClick={() => openForm()} className="btn btn-primary mt-6">
                                <Plus className="w-4 h-4" /> Add First Partner
                            </button>
                         )}
                    </div>
                )}
            </div>
        </div>
    );
}