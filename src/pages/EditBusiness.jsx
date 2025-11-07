import React, { useState, useEffect, useCallback } from 'react';
import { User, Business, BusinessMember } from '@/entities/all';
import { UploadFile } from '@/integrations/Core';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, Save, Camera, Plus, Trash2, Image as ImageIcon, Send, UserPlus } from 'lucide-react';

export default function EditBusinessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [businessId, setBusinessId] = useState(null);
    const [business, setBusiness] = useState(null);
    const [formData, setFormData] = useState({
        name: '', tagline: '', industry: '', description: '',
        logo_url: '', cover_photo_url: '', services: [], photo_gallery: [],
        video_url: '', website_url: '', public_email: '', public_phone: '',
        city: '', social_links: {}, is_publicly_listed: false
    });
    const [members, setMembers] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [inviteEmail, setInviteEmail] = useState('');
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(location.search).get('id');
        setBusinessId(id);
    }, [location.search]);

    const loadData = useCallback(async () => {
        if (!businessId) {
            setLoading(false);
            return;
        }

        try {
            const bizData = await Business.get(businessId);
            setBusiness(bizData);
            setFormData({
                name: bizData.name || '',
                tagline: bizData.tagline || '',
                industry: bizData.industry || '',
                description: bizData.description || '',
                logo_url: bizData.logo_url || '',
                cover_photo_url: bizData.cover_photo_url || '',
                services: bizData.services || [],
                photo_gallery: bizData.photo_gallery || [],
                video_url: bizData.video_url || '',
                website_url: bizData.website_url || '',
                public_email: bizData.public_email || '',
                public_phone: bizData.public_phone || '',
                city: bizData.city || '',
                social_links: bizData.social_links || { linkedin: '', twitter: '', instagram: '', facebook: '', youtube: '' },
                is_publicly_listed: bizData.is_publicly_listed || false,
            });

            const memberData = await BusinessMember.filter({ business_id: businessId });
            setMembers(memberData);
        } catch (error) {
            console.error("Error loading business data for editing:", error);
            alert("Could not load business data. You may not have permission to edit this business.");
            navigate(createPageUrl('MyBusinesses'));
        } finally {
            setLoading(false);
        }
    }, [businessId, navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await User.me();
                setCurrentUser(user);
                if (businessId) {
                    await loadData();
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("User not found:", error);
                navigate(createPageUrl('Dashboard'));
            }
        };
        fetchUser();
    }, [businessId, loadData, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            social_links: { ...prev.social_links, [platform]: value }
        }));
    };
    
    const handleFileChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(type);
        try {
            const { file_url } = await UploadFile({ file });
            setFormData(prev => ({ ...prev, [`${type}_url`]: file_url }));
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(null);
        }
    };
    
    const handleGalleryFileChange = async (e) => {
        const files = e.target.files;
        if (!files.length) return;
        setIsUploading('gallery');
        try {
            const uploadPromises = Array.from(files).map(file => UploadFile({ file }));
            const results = await Promise.all(uploadPromises);
            const newImageUrls = results.map(res => res.file_url);
            setFormData(prev => ({ ...prev, photo_gallery: [...(prev.photo_gallery || []), ...newImageUrls] }));
        } catch (error) {
            console.error("Error uploading gallery files:", error);
        } finally {
            setIsUploading(null);
        }
    };

    const handleRemoveGalleryImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            photo_gallery: prev.photo_gallery.filter((_, index) => index !== indexToRemove)
        }));
    };
    
    const handleAddService = () => {
        setFormData(prev => ({ ...prev, services: [...(prev.services || []), { name: '', description: '', price: '' }] }));
    };
    
    const handleRemoveService = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, index) => index !== indexToRemove)
        }));
    };
    
    const handleServiceChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.map((service, i) => i === index ? { ...service, [field]: value } : service)
        }));
    };

    const handleInviteMember = async (e) => {
        e.preventDefault();
        if (!inviteEmail.trim() || !businessId) return;
        
        // Check if user exists
        const userToInvite = await User.filter({ email: inviteEmail.trim() });
        if (userToInvite.length === 0) {
            alert("No user found with this email address.");
            return;
        }

        // Check if member already exists
        if (members.some(m => m.user_email === inviteEmail.trim())) {
            alert("This user is already a member of the business.");
            return;
        }
        
        setIsInviting(true);
        try {
            const newMember = await BusinessMember.create({
                business_id: businessId,
                user_email: userToInvite[0].email,
                full_name: userToInvite[0].full_name,
                profile_picture_url: userToInvite[0].profile_picture_url,
                role: 'member',
            });
            setMembers(prev => [...prev, newMember]);
            setInviteEmail('');
        } catch(error) {
            console.error("Error inviting member:", error);
            alert("Failed to invite member.");
        } finally {
            setIsInviting(false);
        }
    };

    const handleRemoveMember = async (memberId, memberEmail) => {
        if (memberEmail === currentUser.email) {
            alert("You cannot remove yourself.");
            return;
        }
        if (window.confirm("Are you sure you want to remove this member?")) {
            try {
                await BusinessMember.delete(memberId);
                setMembers(prev => prev.filter(m => m.id !== memberId));
            } catch (error) {
                console.error("Error removing member:", error);
                alert("Failed to remove member.");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Business Name is required.");
            return;
        }

        setIsSaving(true);
        try {
            if (businessId) { // Editing existing business
                await Business.update(businessId, formData);
            } else { // Creating new business
                const newBusiness = await Business.create({
                    ...formData,
                    owner_user_id: currentUser.id,
                });
                await BusinessMember.create({
                    business_id: newBusiness.id,
                    user_email: currentUser.email,
                    full_name: currentUser.full_name,
                    profile_picture_url: currentUser.profile_picture_url,
                    role: 'owner',
                });
                setBusinessId(newBusiness.id); // Update state to reflect creation
            }
            alert("Business saved successfully!");
            navigate(createPageUrl('MyBusinesses'));
        } catch (error) {
            console.error("Error saving business:", error);
            alert("Failed to save business.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !currentUser) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }
    
    // Authorization check
    const currentUserMembership = members.find(m => m.user_email === currentUser.email);
    const canEdit = businessId ? (currentUserMembership?.role === 'owner' || currentUserMembership?.role === 'admin') : true;

    if (businessId && !canEdit && !loading) {
         return <div className="text-center py-20">You do not have permission to edit this business.</div>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto">
            <form onSubmit={handleSave} className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">{businessId ? `Edit ${business?.name || 'Business'}` : 'Create a New Business'}</h1>
                    <div className="flex gap-2">
                        <Link to={createPageUrl('MyBusinesses')} className="btn btn-ghost">Cancel</Link>
                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            <span className="ml-2">{isSaving ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                </div>

                {/* Main Business Details */}
                <div className="card p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Business Details</h2>
                    <div className="space-y-4 sm:space-y-6">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Business Name" required />
                        <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="form-input" placeholder="Business Tagline (e.g., Quality Service Since 1999)" />
                        <input type="text" name="industry" value={formData.industry} onChange={handleInputChange} className="form-input" placeholder="Industry (e.g., Real Estate, Digital Marketing)" />
                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-input h-32 resize-none" placeholder="Detailed business description..." />
                    </div>
                </div>
                
                {/* Branding & Media */}
                <div className="card p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Branding & Media</h2>
                    <div className="space-y-6">
                        {/* Business Logo */}
                        <div>
                            <label className="font-medium text-[var(--text-main)] block mb-2">Business Logo</label>
                            <div className="flex items-center space-x-4">
                                <img src={formData.logo_url || 'https://via.placeholder.com/100'} alt="Logo" className="w-24 h-24 object-cover rounded-md bg-gray-200" />
                                <label htmlFor="logo_url-upload" className="btn btn-secondary cursor-pointer">
                                    <Camera className="w-4 h-4 mr-2" /> {isUploading === 'logo' ? 'Uploading...' : 'Upload Logo'}
                                </label>
                                <input id="logo_url-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                            </div>
                        </div>
                        {/* Cover Photo */}
                        <div>
                            <label className="font-medium text-[var(--text-main)] block mb-2">Cover Photo</label>
                             <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center relative overflow-hidden">
                                {isUploading === 'cover_photo' ? <Loader2 className="w-8 h-8 animate-spin text-gray-400" /> : <img src={formData.cover_photo_url || ''} alt="Cover Preview" className={`w-full h-full object-cover ${!formData.cover_photo_url && 'hidden'}`} />}
                                <label htmlFor="cover_photo_url-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="w-6 h-6" />
                                </label>
                                <input id="cover_photo_url-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'cover_photo')} accept="image/*" />
                            </div>
                        </div>
                         {/* Photo Gallery */}
                        <div>
                            <label className="font-medium text-[var(--text-main)] block mb-2">Photo Gallery</label>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                                {formData.photo_gallery.map((url, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover rounded-md" />
                                        <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs">&times;</button>
                                    </div>
                                ))}
                                <label htmlFor="gallery-upload" className="aspect-square flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                </label>
                                <input id="gallery-upload" type="file" multiple className="hidden" onChange={handleGalleryFileChange} accept="image/*" />
                            </div>
                        </div>
                        {/* Video URL */}
                        <div>
                             <label className="font-medium text-[var(--text-main)] block mb-2">Video URL (YouTube/Vimeo)</label>
                             <input type="url" name="video_url" value={formData.video_url} onChange={handleInputChange} className="form-input" placeholder="https://youtube.com/watch?v=..." />
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="card p-6 sm:p-8">
                     <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Services</h2>
                     <div className="space-y-4">
                        {formData.services.map((service, index) => (
                            <div key={index} className="border p-4 rounded-md relative">
                                <button type="button" onClick={() => handleRemoveService(index)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4"/></button>
                                <input type="text" placeholder="Service Name" value={service.name} onChange={(e) => handleServiceChange(index, 'name', e.target.value)} className="form-input mb-2 font-semibold" />
                                <textarea placeholder="Service Description" value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} className="form-input h-20 resize-none mb-2" />
                                <input type="text" placeholder="Price (e.g., $99 or 'Contact for Quote')" value={service.price} onChange={(e) => handleServiceChange(index, 'price', e.target.value)} className="form-input" />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddService} className="btn btn-secondary w-full"><Plus className="w-4 h-4 mr-2"/>Add Service</button>
                    </div>
                </div>

                {/* Contact & Location */}
                 <div className="card p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Contact & Links</h2>
                     <div className="space-y-4">
                        <input type="email" name="public_email" value={formData.public_email} onChange={handleInputChange} className="form-input" placeholder="Public Contact Email" />
                        <input type="tel" name="public_phone" value={formData.public_phone} onChange={handleInputChange} className="form-input" placeholder="Public Phone Number" />
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" placeholder="City" />
                        <input type="url" name="website_url" value={formData.website_url} onChange={handleInputChange} className="form-input" placeholder="https://yourbusiness.com" />
                         <div>
                            <label className="font-medium text-[var(--text-main)] block mb-2">Social Media</label>
                            {Object.keys(formData.social_links).map(platform => (
                                <div key={platform} className="flex items-center gap-2 mb-2">
                                    <span className="w-24 capitalize">{platform}</span>
                                    <input type="url" value={formData.social_links[platform]} onChange={(e) => handleSocialLinkChange(platform, e.target.value)} className="form-input flex-grow" placeholder={`https://...`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Members */}
                {businessId && (
                    <div className="card p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Team Members</h2>
                        <div className="space-y-3 mb-6">
                            {members.map(member => (
                                <div key={member.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img src={member.profile_picture_url || 'https://via.placeholder.com/40'} alt={member.full_name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold">{member.full_name}</p>
                                            <p className="text-sm text-[var(--text-soft)]">{member.user_email} ({member.role})</p>
                                        </div>
                                    </div>
                                    {member.role !== 'owner' && (
                                        <button type="button" onClick={() => handleRemoveMember(member.id, member.user_email)} className="text-red-500"><Trash2 className="w-4 h-4"/></button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleInviteMember} className="flex gap-2">
                            <input 
                                type="email" 
                                value={inviteEmail} 
                                onChange={(e) => setInviteEmail(e.target.value)} 
                                className="form-input flex-grow" 
                                placeholder="Invite user by email..."
                            />
                            <button type="submit" className="btn btn-secondary" disabled={isInviting}>
                                {isInviting ? <Loader2 className="w-5 h-5 animate-spin"/> : <UserPlus className="w-5 h-5"/>}
                                <span className="ml-2 hidden sm:inline">Invite</span>
                            </button>
                        </form>
                    </div>
                )}
                 
                 {/* Public Listing */}
                 <div className="card p-6 sm:p-8">
                     <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Directory Settings</h2>
                     <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                        <div>
                            <label htmlFor="is_publicly_listed" className="font-medium text-[var(--text-main)]">List in Public Directory</label>
                            <p className="text-sm text-[var(--text-soft)]">Allow non-members to see this business listing.</p>
                        </div>
                        <input id="is_publicly_listed" name="is_publicly_listed" type="checkbox" checked={formData.is_publicly_listed} onChange={handleInputChange} className="toggle toggle-primary" />
                    </div>
                </div>

            </form>
        </div>
    );
}