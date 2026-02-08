import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, X, Save, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BusinessInfoEditor({ business, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: business?.name || '',
        tagline: business?.tagline || '',
        industry: business?.industry || '',
        description: business?.description || '',
        website_url: business?.website_url || '',
        public_email: business?.public_email || '',
        public_phone: business?.public_phone || '',
        city: business?.city || '',
        social_links: {
            linkedin: business?.social_links?.linkedin || '',
            twitter: business?.social_links?.twitter || '',
            instagram: business?.social_links?.instagram || '',
            facebook: business?.social_links?.facebook || '',
            youtube: business?.social_links?.youtube || ''
        }
    });
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(business?.logo_url || '');
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSocialChange = (platform, value) => {
        setFormData(prev => ({
            ...prev,
            social_links: {
                ...prev.social_links,
                [platform]: value
            }
        }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingLogo(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setLogoPreview(file_url);
            setLogoFile(file_url);
            toast.success('Logo uploaded successfully');
        } catch (error) {
            console.error('Error uploading logo:', error);
            toast.error('Failed to upload logo');
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setLogoPreview('');
    };

    const handleSave = async () => {
        if (!formData.name?.trim()) {
            toast.error('Business name is required');
            return;
        }

        setSaving(true);
        try {
            const updateData = {
                ...formData,
                ...(logoFile && { logo_url: logoFile })
            };

            if (business?.id) {
                await base44.entities.Business.update(business.id, updateData);
            } else {
                await base44.entities.Business.create(updateData);
            }

            toast.success('Business information saved successfully');
            onSave();
        } catch (error) {
            console.error('Error saving business:', error);
            toast.error('Failed to save business information');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full my-8" style={{ borderRadius: '1px' }}>
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-[var(--text-main)]">Edit Business Information</h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Business Logo</label>
                        <div className="flex items-center gap-4">
                            {logoPreview ? (
                                <div className="relative">
                                    <img src={logoPreview} alt="Logo" className="w-24 h-24 object-contain bg-gray-100 dark:bg-gray-800 p-2" style={{ borderRadius: '1px' }} />
                                    <button
                                        onClick={handleRemoveLogo}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center" style={{ borderRadius: '1px' }}>
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                    id="logo-upload"
                                    disabled={uploadingLogo}
                                />
                                <label htmlFor="logo-upload">
                                    <Button
                                        as="span"
                                        variant="outline"
                                        size="sm"
                                        disabled={uploadingLogo}
                                        style={{ borderRadius: '1px' }}
                                    >
                                        {uploadingLogo ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Upload Logo
                                            </>
                                        )}
                                    </Button>
                                </label>
                                <p className="text-xs text-[var(--text-soft)] mt-1">Recommended: Square image, PNG or JPG</p>
                            </div>
                        </div>
                    </div>

                    {/* Business Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                            Business Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Your Business Name"
                            style={{ borderRadius: '1px' }}
                        />
                    </div>

                    {/* Tagline */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Tagline</label>
                        <Input
                            value={formData.tagline}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            placeholder="A catchy tagline that captures your business essence"
                            style={{ borderRadius: '1px' }}
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Industry</label>
                        <Input
                            value={formData.industry}
                            onChange={(e) => handleChange('industry', e.target.value)}
                            placeholder="e.g., Marketing, Health & Wellness, Technology"
                            style={{ borderRadius: '1px' }}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Description</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Tell visitors about your business, what you do, and what makes you unique..."
                            rows={4}
                            style={{ borderRadius: '1px' }}
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Email</label>
                            <Input
                                type="email"
                                value={formData.public_email}
                                onChange={(e) => handleChange('public_email', e.target.value)}
                                placeholder="contact@business.com"
                                style={{ borderRadius: '1px' }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Phone</label>
                            <Input
                                type="tel"
                                value={formData.public_phone}
                                onChange={(e) => handleChange('public_phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                style={{ borderRadius: '1px' }}
                            />
                        </div>
                    </div>

                    {/* Location & Website */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">City/Location</label>
                            <Input
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder="Los Angeles, CA"
                                style={{ borderRadius: '1px' }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Website</label>
                            <Input
                                type="url"
                                value={formData.website_url}
                                onChange={(e) => handleChange('website_url', e.target.value)}
                                placeholder="https://yourbusiness.com"
                                style={{ borderRadius: '1px' }}
                            />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-3">Social Media Links</label>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs text-[var(--text-soft)] mb-1">LinkedIn</label>
                                <Input
                                    value={formData.social_links.linkedin}
                                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                                    placeholder="https://linkedin.com/company/..."
                                    style={{ borderRadius: '1px' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-soft)] mb-1">Instagram</label>
                                <Input
                                    value={formData.social_links.instagram}
                                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    style={{ borderRadius: '1px' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-soft)] mb-1">Facebook</label>
                                <Input
                                    value={formData.social_links.facebook}
                                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                                    placeholder="https://facebook.com/..."
                                    style={{ borderRadius: '1px' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-soft)] mb-1">Twitter/X</label>
                                <Input
                                    value={formData.social_links.twitter}
                                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                                    placeholder="https://twitter.com/..."
                                    style={{ borderRadius: '1px' }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-[var(--text-soft)] mb-1">YouTube</label>
                                <Input
                                    value={formData.social_links.youtube}
                                    onChange={(e) => handleSocialChange('youtube', e.target.value)}
                                    placeholder="https://youtube.com/@..."
                                    style={{ borderRadius: '1px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={onCancel} variant="outline" style={{ borderRadius: '1px' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={saving} style={{ borderRadius: '1px' }}>
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}