import React, { useState, useEffect } from 'react';
import { User, BrandKit as BrandKitEntity } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Palette, Save, Loader2, ArrowLeft } from 'lucide-react';

export default function BrandKitPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [brandKit, setBrandKit] = useState(null);
    const [formData, setFormData] = useState({
        primary_color: '#8B6F4E',
        secondary_color: '#000000',
        accent_color: '#FFFFFF',
        logo_url: '',
        font_heading: 'Poppins',
        font_body: 'Inter',
        brand_voice: '',
        tagline: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            const kits = await BrandKitEntity.filter({ created_by: currentUser.email });
            if (kits.length > 0) {
                setBrandKit(kits[0]);
                setFormData({
                    primary_color: kits[0].primary_color || '#8B6F4E',
                    secondary_color: kits[0].secondary_color || '#000000',
                    accent_color: kits[0].accent_color || '#FFFFFF',
                    logo_url: kits[0].logo_url || '',
                    font_heading: kits[0].font_heading || 'Poppins',
                    font_body: kits[0].font_body || 'Inter',
                    brand_voice: kits[0].brand_voice || '',
                    tagline: kits[0].tagline || '',
                });
            }
        } catch (error) {
            console.error('Error loading brand kit:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (brandKit) {
                await BrandKitEntity.update(brandKit.id, formData);
            } else {
                await BrandKitEntity.create(formData);
            }
            await loadData();
        } catch (error) {
            console.error('Error saving brand kit:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    <Link to={createPageUrl('Profile')} className="btn btn-ghost">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Brand Kit</h1>
                        <p className="text-[var(--text-soft)]">Define your brand identity</p>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Logo URL
                            </label>
                            <input
                                type="text"
                                value={formData.logo_url}
                                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                className="form-input"
                                placeholder="https://example.com/logo.png"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                className="form-input"
                                placeholder="Your brand tagline"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    Primary Color
                                </label>
                                <input
                                    type="color"
                                    value={formData.primary_color}
                                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                                    className="w-full h-12 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    Secondary Color
                                </label>
                                <input
                                    type="color"
                                    value={formData.secondary_color}
                                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                                    className="w-full h-12 rounded cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    Accent Color
                                </label>
                                <input
                                    type="color"
                                    value={formData.accent_color}
                                    onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                                    className="w-full h-12 rounded cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    Heading Font
                                </label>
                                <input
                                    type="text"
                                    value={formData.font_heading}
                                    onChange={(e) => setFormData({ ...formData, font_heading: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                    Body Font
                                </label>
                                <input
                                    type="text"
                                    value={formData.font_body}
                                    onChange={(e) => setFormData({ ...formData, font_body: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                Brand Voice
                            </label>
                            <textarea
                                value={formData.brand_voice}
                                onChange={(e) => setFormData({ ...formData, brand_voice: e.target.value })}
                                className="form-input h-32"
                                placeholder="Describe your brand's tone and personality..."
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn btn-primary w-full"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Brand Kit
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}