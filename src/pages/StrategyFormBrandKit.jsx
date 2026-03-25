import React, { useState, useEffect, useRef } from 'react';
import { User, BrandKit } from '@/entities/all';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Save, Palette, Loader2, CheckCircle, Upload, X, Plus } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function BrandKitPage() {
    const navigate = useNavigate();
    const [existingBrandKit, setExistingBrandKit] = useState(null); // Renamed from 'document'
    const [formData, setFormData] = useState({
        brand_name: '',
        logos: [],
        color_palette: [{ name: '', hex: '#000000' }],
        fonts: { primary_font_name: '', secondary_font_name: '' },
        mission_statement: '',
        vision_statement: '',
        tagline: '',
        voice_and_tone: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const user = await User.me();
            const docs = await BrandKit.filter({ created_by: user.email }, '-updated_date', 1);

            if (docs.length > 0) {
                const doc = docs[0];
                setExistingBrandKit(doc); // Updated state variable
                // Ensure all fields have default values if not present in saved data
                setFormData({
                    brand_name: doc.brand_name || '',
                    logos: doc.logos || [],
                    color_palette: doc.color_palette?.length > 0 ? doc.color_palette : [{ name: '', hex: '#000000' }],
                    fonts: doc.fonts || { primary_font_name: '', secondary_font_name: '' },
                    mission_statement: doc.mission_statement || '',
                    vision_statement: doc.vision_statement || '',
                    tagline: doc.tagline || '',
                    voice_and_tone: doc.voice_and_tone || ''
                });
            }
        } catch (error) {
            console.error("Error loading brand kit data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFontChange = (field, value) => {
        setFormData(prev => ({ ...prev, fonts: { ...prev.fonts, [field]: value } }));
    };

    const handleColorChange = (index, field, value) => {
        const newPalette = [...formData.color_palette];
        newPalette[index][field] = value;
        setFormData(prev => ({ ...prev, color_palette: newPalette }));
    };

    const addColor = () => {
        setFormData(prev => ({ ...prev, color_palette: [...prev.color_palette, { name: '', hex: '#000000' }] }));
    };

    const removeColor = (index) => {
        setFormData(prev => ({ ...prev, color_palette: prev.color_palette.filter((_, i) => i !== index) }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingLogo(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData(prev => ({ ...prev, logos: [...prev.logos, file_url] }));
        } catch (err) {
            console.error("Error uploading logo:", err);
            alert('Logo upload failed. Please try again.');
        } finally {
            setUploadingLogo(false);
        }
    };

    const removeLogo = (url) => {
        setFormData(prev => ({ ...prev, logos: prev.logos.filter(logoUrl => logoUrl !== url) }));
    };

    const saveDocument = async (markComplete = false) => {
        setSaving(true);
        try {
            const brandKitData = {
                brand_name: formData.brand_name,
                logos: formData.logos,
                color_palette: formData.color_palette,
                fonts: formData.fonts,
                mission_statement: formData.mission_statement,
                vision_statement: formData.vision_statement,
                tagline: formData.tagline,
                voice_and_tone: formData.voice_and_tone
            };

            if (existingBrandKit) {
                await BrandKit.update(existingBrandKit.id, brandKitData);
            } else {
                const newDoc = await BrandKit.create(brandKitData);
                setExistingBrandKit(newDoc); // Update state if a new document is created
            }

            alert('Brand Kit saved successfully!'); // Added success alert

            if (markComplete) {
                navigate(createPageUrl('MyFoundationRoadmap')); // Changed redirect target
            }
        } catch (error) {
            console.error("Error saving Brand Kit:", error); // Updated error message
            alert('Failed to save Brand Kit. Please try again.'); // Updated alert message
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="card p-4 md:p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate(createPageUrl('MyStrategy'))} className="btn btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></button>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md"><Palette className="w-5 h-5 text-[var(--primary-gold)]" /></div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold">Brand Kit</h1>
                                    <p className="text-sm text-[var(--text-soft)]">Define your brand's identity.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => saveDocument(false)} disabled={saving} className="btn btn-secondary"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Draft'}</button>
                            <button onClick={() => saveDocument(true)} disabled={saving} className="btn btn-primary"><CheckCircle className="w-4 h-4" />Complete & Save</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4">Brand Name & Vibe</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Brand Name</label>
                                    <input type="text" value={formData.brand_name} onChange={e => handleInputChange('brand_name', e.target.value)} placeholder="Your Company Name" className="form-input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tagline / Slogan</label>
                                    <input type="text" value={formData.tagline} onChange={e => handleInputChange('tagline', e.target.value)} placeholder="A catchy phrase for your brand" className="form-input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Voice & Tone</label>
                                    <textarea value={formData.voice_and_tone} onChange={e => handleInputChange('voice_and_tone', e.target.value)} placeholder="e.g., Professional yet friendly, witty, inspiring..." className="form-input h-24" />
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4">Brand Mission</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Mission Statement</label>
                                    <textarea value={formData.mission_statement} onChange={e => handleInputChange('mission_statement', e.target.value)} placeholder="What is your company's purpose? What do you do?" className="form-input h-24" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Vision Statement</label>
                                    <textarea value={formData.vision_statement} onChange={e => handleInputChange('vision_statement', e.target.value)} placeholder="What future do you want to help create? What are your long-term goals?" className="form-input h-24" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4">Logos</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {formData.logos.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <img src={url} alt={`Logo ${index + 1}`} className="w-full h-24 object-contain bg-gray-100 dark:bg-gray-700 rounded-md p-2"/>
                                        <button onClick={() => removeLogo(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                                    </div>
                                ))}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                            <button onClick={() => fileInputRef.current.click()} disabled={uploadingLogo} className="btn btn-secondary w-full justify-center">
                                {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
                                Upload Logo
                            </button>
                        </div>
                        
                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4">Color Palette</h3>
                            <div className="space-y-3">
                                {formData.color_palette.map((color, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input type="color" value={color.hex} onChange={e => handleColorChange(index, 'hex', e.target.value)} className="w-10 h-10 rounded-md" />
                                        <input type="text" value={color.name} onChange={e => handleColorChange(index, 'name', e.target.value)} placeholder="Color Name (e.g., Primary)" className="form-input flex-grow" />
                                        {formData.color_palette.length > 1 && <button onClick={() => removeColor(index)} className="btn btn-ghost p-2 text-red-500"><X className="w-4 h-4"/></button>}
                                    </div>
                                ))}
                            </div>
                            <button onClick={addColor} className="btn btn-secondary w-full justify-center mt-4"><Plus className="w-4 h-4" />Add Color</button>
                        </div>

                        <div className="card p-6">
                            <h3 className="font-bold text-lg mb-4">Fonts</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Primary Font</label>
                                    <input type="text" value={formData.fonts.primary_font_name} onChange={e => handleFontChange('primary_font_name', e.target.value)} placeholder="e.g., Poppins" className="form-input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Secondary Font</label>
                                    <input type="text" value={formData.fonts.secondary_font_name} onChange={e => handleFontChange('secondary_font_name', e.target.value)} placeholder="e.g., Inter" className="form-input" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}