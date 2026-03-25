import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { generateBrandCopy } from '@/functions/generateBrandCopy';
import {
    Palette, Sparkles, Loader2, CheckCircle, ArrowLeft, ArrowRight,
    Save, ChevronRight, Target, Users, MessageSquare,
    Zap, Copy, RefreshCw, Info, Star, Megaphone, Mail, Mic,
    Package, Eye, Globe, HelpCircle, Heart, ShoppingBag
} from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Brand Foundation', icon: Target, desc: 'Mission, vision & values' },
    { id: 2, title: 'Audience & UVP', icon: Users, desc: 'Who you serve' },
    { id: 3, title: 'Voice & Look', icon: Eye, desc: 'Tone, personality & visuals' },
    { id: 4, title: 'Products', icon: Package, desc: 'Your offerings' },
    { id: 5, title: 'Generate Copy', icon: Sparkles, desc: 'AI creates your messaging' },
];

const CopyBlock = ({ label, icon: IconComp, content, color }) => {
    const Icon = IconComp;
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className={`card p-5 border-l-4 ${color}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[var(--primary-gold)]" />
                    <h4 className="font-bold text-[var(--text-main)]">{label}</h4>
                </div>
                <button onClick={handleCopy} className="btn btn-ghost text-xs flex items-center gap-1 py-1 px-2">
                    {copied ? <><CheckCircle className="w-3 h-3 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
            </div>
            <p className="text-sm text-[var(--text-main)] whitespace-pre-line leading-relaxed">{content}</p>
        </div>
    );
};

export default function BrandIdentityGuide() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [saved, setSaved] = useState(false);
    const [brandKitId, setBrandKitId] = useState(null);
    const [generatedCopy, setGeneratedCopy] = useState(null);

    const [formData, setFormData] = useState({
        brand_name: '',
        mission: '',
        vision: '',
        values: ['', '', ''],
        target_audience: '',
        tone_of_voice: '',
        unique_value_proposition: '',
        brand_personality: '',
        brand_colors: '',
        brand_fonts: '',
        brand_visual_style: '',
        products: [],
    });

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const user = await base44.auth.me();

            const [brandDocs, missionDocs, idealClientDocs, vpDocs, kits] = await Promise.all([
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'brand_identity' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'mission_vision' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'ideal_client' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'value_proposition_canvas' }),
                base44.entities.BrandKit.filter({ created_by: user.email }),
            ]);

            // Pull products from financial projections
            const financialProducts = (user.financial_projections?.products || [])
                .filter(p => p.name)
                .map(p => ({ id: p.id, name: p.name, description: p.description || '', price: p.price || '' }));

            const merged = {
                brand_name: '',
                mission: '',
                vision: '',
                values: ['', '', ''],
                target_audience: '',
                tone_of_voice: '',
                unique_value_proposition: '',
                brand_personality: '',
                brand_colors: '',
                brand_fonts: '',
                brand_visual_style: '',
                products: financialProducts,
            };

            if (missionDocs.length > 0) {
                const mv = missionDocs[0].content || {};
                if (mv.mission_statement) merged.mission = mv.mission_statement;
                if (mv.vision_statement) merged.vision = mv.vision_statement;
            }

            if (idealClientDocs.length > 0) {
                const ic = idealClientDocs[0].content || {};
                const audience = [ic.demographics, ic.psychographics, ic.pain_points].filter(Boolean).join('. ');
                if (audience) merged.target_audience = audience;
            }

            if (vpDocs.length > 0) {
                const vp = vpDocs[0].content || {};
                if (!merged.unique_value_proposition && vp.unique_value_proposition) {
                    merged.unique_value_proposition = vp.unique_value_proposition;
                }
            }

            if (brandDocs.length > 0) {
                const bd = brandDocs[0].content || {};
                if (bd.brand_name) merged.brand_name = bd.brand_name;
                if (bd.mission_statement) merged.mission = bd.mission_statement;
                if (bd.vision_statement) merged.vision = bd.vision_statement;
                if (bd.core_values?.some(Boolean)) merged.values = bd.core_values;
                if (bd.unique_value_proposition) merged.unique_value_proposition = bd.unique_value_proposition;
                if (bd.tone_of_voice) merged.tone_of_voice = bd.tone_of_voice;
                if (bd.brand_personality) merged.brand_personality = bd.brand_personality;
                if (bd.brand_colors) merged.brand_colors = bd.brand_colors;
                if (bd.brand_fonts) merged.brand_fonts = bd.brand_fonts;
                if (bd.brand_visual_style) merged.brand_visual_style = bd.brand_visual_style;
            }

            if (kits.length > 0) {
                const kit = kits[0];
                setBrandKitId(kit.id);
                if (kit.brand_colors) merged.brand_colors = kit.brand_colors;
                if (kit.brand_fonts) merged.brand_fonts = kit.brand_fonts;
                if (kit.brand_visual_style) merged.brand_visual_style = kit.brand_visual_style;
                // Prefer saved products in kit if they exist, else use financial products
                if (kit.products && kit.products.length > 0) merged.products = kit.products;

                if (kit.website_hero_copy) {
                    setGeneratedCopy({
                        website_hero_copy: kit.website_hero_copy,
                        social_media_captions: kit.social_media_captions,
                        advertising_taglines: kit.advertising_taglines,
                        email_subject_lines: kit.email_subject_lines,
                        elevator_pitch_long: kit.elevator_pitch_long,
                        elevator_pitch_short: kit.elevator_pitch_short,
                        welcome_email_series: kit.welcome_email_series,
                        about_us_copy: kit.about_us_copy,
                        services_intro_copy: kit.services_intro_copy,
                        why_choose_us_copy: kit.why_choose_us_copy,
                        product_descriptions: kit.product_descriptions,
                    });
                    setStep(5);
                }
            }

            setFormData(merged);
        } catch (e) {
            console.error('Error loading brand data:', e);
        } finally {
            setLoading(false);
        }
    };

    const updateValue = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

    const updateProduct = (id, field, val) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.map(p => p.id === id ? { ...p, [field]: val } : p)
        }));
    };

    const addProduct = () => {
        setFormData(prev => ({
            ...prev,
            products: [...prev.products, { id: crypto.randomUUID(), name: '', description: '', price: '' }]
        }));
    };

    const removeProduct = (id) => {
        setFormData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const res = await generateBrandCopy({ brandData: formData });
            const copy = res.data;
            setGeneratedCopy(copy);

            const payload = { ...formData, ...copy, last_generated_date: new Date().toISOString() };
            if (brandKitId) {
                await base44.entities.BrandKit.update(brandKitId, payload);
            } else {
                const created = await base44.entities.BrandKit.create(payload);
                setBrandKitId(created.id);
            }
            setStep(5);
        } catch (e) {
            console.error('Generation error:', e);
        } finally {
            setGenerating(false);
        }
    };

    const handleSaveProgress = async () => {
        setSaving(true);
        try {
            const payload = { ...formData };
            if (brandKitId) {
                await base44.entities.BrandKit.update(brandKitId, payload);
            } else {
                const created = await base44.entities.BrandKit.create(payload);
                setBrandKitId(created.id);
            }
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            console.error('Save error:', e);
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

    const SaveBtn = () => (
        <button onClick={handleSaveProgress} className="btn btn-secondary">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />}
            <span className="ml-2">{saved ? 'Saved!' : 'Save Progress'}</span>
        </button>
    );

    return (
        <div className="px-4 pb-24 md:pb-10 max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-6 mt-2">
                <Link to={createPageUrl('StrategyFormBrandIdentity')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Brand Identity Form
                </Link>
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
                        <Palette className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Brand Identity Guide</h1>
                        <p className="text-[var(--text-soft)]">AI-powered brand messaging, copy & content generation</p>
                    </div>
                </div>
            </div>

            {/* Pre-fill notice */}
            <div className="card p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Auto-filled from your Foundation Roadmap & Financial Calculator</p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                        Products are pulled from your <Link to={createPageUrl('FreedomCalculator')} className="underline font-medium">Financial Calculator</Link>. Mission, vision & audience from your strategy documents. Review and refine below.
                    </p>
                </div>
            </div>

            {/* Step Progress */}
            <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
                {STEPS.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                        <button
                            onClick={() => s.id <= step && setStep(s.id)}
                            className={`flex flex-col items-center min-w-[72px] px-2 py-2 rounded-lg transition-all ${
                                step === s.id ? 'bg-[var(--primary-gold)] text-white' :
                                s.id < step ? 'text-green-600 dark:text-green-400' : 'text-[var(--text-soft)]'
                            }`}
                        >
                            {s.id < step ? <CheckCircle className="w-5 h-5 mb-1" /> : <s.icon className="w-5 h-5 mb-1" />}
                            <span className="text-xs font-semibold text-center leading-tight">{s.title}</span>
                        </button>
                        {i < STEPS.length - 1 && (
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${s.id < step ? 'text-green-500' : 'text-gray-300'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* ===== STEP 1: Brand Foundation ===== */}
            {step === 1 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 1: Brand Foundation</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">These core elements define your brand's purpose. They inform every piece of copy the AI will write.</p>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">Brand / Business Name</label>
                            <input className="form-input" value={formData.brand_name} onChange={e => updateValue('brand_name', e.target.value)} placeholder="e.g., The Business Minds" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Mission Statement {formData.mission && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                            </label>
                            <textarea className="form-input" rows={3} value={formData.mission} onChange={e => updateValue('mission', e.target.value)} placeholder="What you do and why you do it..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Vision Statement {formData.vision && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                            </label>
                            <textarea className="form-input" rows={3} value={formData.vision} onChange={e => updateValue('vision', e.target.value)} placeholder="Where you're heading..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Core Values</label>
                            <div className="space-y-2">
                                {formData.values.map((val, i) => (
                                    <input key={i} className="form-input" value={val} onChange={e => {
                                        const arr = [...formData.values]; arr[i] = e.target.value; updateValue('values', arr);
                                    }} placeholder={`Core Value ${i + 1} (e.g., Integrity)`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <SaveBtn />
                        <button onClick={() => setStep(2)} className="btn btn-primary">Next: Audience <ArrowRight className="w-4 h-4 ml-2" /></button>
                    </div>
                </div>
            )}

            {/* ===== STEP 2: Audience & UVP ===== */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 2: Target Audience & UVP</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">The AI needs to know exactly who you're speaking to in order to craft the right message.</p>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Target Audience {formData.target_audience && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported from Ideal Client</span>}
                            </label>
                            <textarea className="form-input" rows={5} value={formData.target_audience} onChange={e => updateValue('target_audience', e.target.value)}
                                placeholder="Describe who you serve: age, profession, challenges, goals, lifestyle." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Unique Value Proposition {formData.unique_value_proposition && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                            </label>
                            <textarea className="form-input" rows={3} value={formData.unique_value_proposition} onChange={e => updateValue('unique_value_proposition', e.target.value)}
                                placeholder="What unique value do you offer that competitors don't?" />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(1)} className="btn btn-secondary"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                        <button onClick={() => setStep(3)} className="btn btn-primary">Next: Voice & Look <ArrowRight className="w-4 h-4 ml-2" /></button>
                    </div>
                </div>
            )}

            {/* ===== STEP 3: Voice & Look ===== */}
            {step === 3 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-5 h-5 text-green-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 3: Brand Voice & Visual Identity</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">How your brand sounds AND looks. The AI uses this to ensure all copy matches your style and aesthetic.</p>
                    </div>

                    <div className="card p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">
                                Tone of Voice {formData.tone_of_voice && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                                {['Professional', 'Conversational', 'Bold & Confident', 'Warm & Empathetic', 'Inspirational', 'Educational'].map(tone => (
                                    <button key={tone} onClick={() => updateValue('tone_of_voice', tone)}
                                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${formData.tone_of_voice === tone ? 'bg-[var(--primary-gold)] text-white border-[var(--primary-gold)]' : 'border-gray-200 dark:border-gray-700 text-[var(--text-main)] hover:border-[var(--primary-gold)]'}`}>
                                        {tone}
                                    </button>
                                ))}
                            </div>
                            <input className="form-input" value={formData.tone_of_voice} onChange={e => updateValue('tone_of_voice', e.target.value)} placeholder="Or describe your own tone..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Brand Personality {formData.brand_personality && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                            </label>
                            <textarea className="form-input" rows={2} value={formData.brand_personality} onChange={e => updateValue('brand_personality', e.target.value)}
                                placeholder="If your brand was a person, how would you describe them?" />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-sm font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                                <Palette className="w-4 h-4 text-[var(--primary-gold)]" /> Visual Brand Identity
                            </p>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                        Brand Colors {formData.brand_colors && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                                    </label>
                                    <input className="form-input" value={formData.brand_colors} onChange={e => updateValue('brand_colors', e.target.value)}
                                        placeholder="e.g., Primary: Deep Navy #1A2B4C, Accent: Gold #C9A84C, White" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                        Brand Fonts / Typography {formData.brand_fonts && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                                    </label>
                                    <input className="form-input" value={formData.brand_fonts} onChange={e => updateValue('brand_fonts', e.target.value)}
                                        placeholder="e.g., Headlines: Poppins Bold, Body: Inter Regular" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                        Visual Style & Aesthetic {formData.brand_visual_style && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported</span>}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                                        {['Clean & Minimal', 'Bold & Modern', 'Luxury & Premium', 'Playful & Fun', 'Earthy & Natural', 'Corporate & Classic'].map(style => (
                                            <button key={style} onClick={() => updateValue('brand_visual_style', style)}
                                                className={`px-3 py-2 text-sm rounded-lg border transition-all ${formData.brand_visual_style === style ? 'bg-[var(--primary-gold)] text-white border-[var(--primary-gold)]' : 'border-gray-200 dark:border-gray-700 text-[var(--text-main)] hover:border-[var(--primary-gold)]'}`}>
                                                {style}
                                            </button>
                                        ))}
                                    </div>
                                    <input className="form-input" value={formData.brand_visual_style} onChange={e => updateValue('brand_visual_style', e.target.value)}
                                        placeholder="Or describe your visual style..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(2)} className="btn btn-secondary"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                        <button onClick={() => setStep(4)} className="btn btn-primary">Next: Products <ArrowRight className="w-4 h-4 ml-2" /></button>
                    </div>
                </div>
            )}

            {/* ===== STEP 4: Products ===== */}
            {step === 4 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-orange-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 4: Your Products & Services</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            Products are auto-imported from your <Link to={createPageUrl('FreedomCalculator')} className="underline text-orange-600 font-medium">Financial Calculator</Link>. 
                            Add descriptions so the AI can write compelling product copy.
                        </p>
                    </div>

                    <div className="card p-6">
                        {formData.products.length === 0 ? (
                            <div className="text-center py-8">
                                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-[var(--text-soft)] mb-4">No products found. Add them in your Financial Calculator or create one here.</p>
                                <Link to={createPageUrl('FreedomCalculator')} className="btn btn-secondary text-sm mr-3">
                                    Go to Financial Calculator
                                </Link>
                                <button onClick={addProduct} className="btn btn-primary text-sm">Add Product Manually</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {formData.products.map((product, i) => (
                                    <div key={product.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold text-sm text-[var(--text-main)]">Product / Service {i + 1}</span>
                                            <button onClick={() => removeProduct(product.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                                        </div>
                                        <div className="space-y-2">
                                            <input className="form-input" value={product.name} onChange={e => updateProduct(product.id, 'name', e.target.value)} placeholder="Product/Service name" />
                                            <textarea className="form-input" rows={2} value={product.description} onChange={e => updateProduct(product.id, 'description', e.target.value)}
                                                placeholder="Describe this product/service — what it is, who it's for, the key benefit..." />
                                            <input className="form-input" value={product.price} onChange={e => updateProduct(product.id, 'price', e.target.value)} placeholder="Price (e.g., $99, $499/mo)" />
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addProduct} className="btn btn-secondary w-full text-sm">+ Add Another Product</button>
                            </div>
                        )}
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/10 border-2 border-[var(--primary-gold)]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-[var(--primary-gold)] p-2 rounded-lg"><Sparkles className="w-6 h-6 text-white" /></div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)]">Ready to generate your full brand kit!</h3>
                                <p className="text-sm text-[var(--text-soft)]">The AI will create all of the following in one shot:</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[var(--text-soft)] mb-3">
                            {['Website Hero Copy', 'Social Media Captions (3)', '3 Ad Taglines', 'Email Subject Lines', 'Long Elevator Pitch', 'Short Elevator Pitch', '3-Part Welcome Email Series', 'About Us Page', 'Services Page Intro', 'Why Choose Us', 'Product Descriptions'].map(item => (
                                <div key={item} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" /> {item}</div>
                            ))}
                        </div>
                        <p className="text-xs text-[var(--text-soft)] italic">Uses Claude AI — may take 20–30 seconds to generate everything</p>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(3)} className="btn btn-secondary"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                        <button onClick={handleGenerate} disabled={generating} className="btn btn-primary text-base px-6">
                            {generating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5 mr-2" /> Generate Full Brand Kit</>}
                        </button>
                    </div>
                </div>
            )}

            {/* ===== STEP 5: Generated Copy ===== */}
            {step === 5 && generatedCopy && (
                <div className="space-y-5">
                    <div className="card p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300 dark:border-green-700 flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-[var(--text-main)]">Your Full Brand Kit is Ready! 🎉</h3>
                            <p className="text-sm text-[var(--text-soft)]">All copy saved to your Brand Kit. Click any section to copy it.</p>
                        </div>
                        <button onClick={() => { setGeneratedCopy(null); setStep(4); }} className="btn btn-ghost text-xs ml-auto flex-shrink-0">
                            <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                        </button>
                    </div>

                    {/* Website & Pitches */}
                    <h3 className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-wider pt-2">Website & Pitches</h3>
                    {generatedCopy.website_hero_copy && <CopyBlock label="Website Hero Copy" icon={Star} content={generatedCopy.website_hero_copy} color="border-purple-400" />}
                    {generatedCopy.elevator_pitch_long && <CopyBlock label="Elevator Pitch (Long)" icon={Mic} content={generatedCopy.elevator_pitch_long} color="border-blue-400" />}
                    {generatedCopy.elevator_pitch_short && <CopyBlock label="Elevator Pitch (Short)" icon={Mic} content={generatedCopy.elevator_pitch_short} color="border-indigo-400" />}

                    {/* Brand Copy */}
                    <h3 className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-wider pt-2">Brand Pages</h3>
                    {generatedCopy.about_us_copy && <CopyBlock label="About Us Page" icon={Heart} content={generatedCopy.about_us_copy} color="border-rose-400" />}
                    {generatedCopy.services_intro_copy && <CopyBlock label="Services Page Intro" icon={ShoppingBag} content={generatedCopy.services_intro_copy} color="border-teal-400" />}
                    {generatedCopy.why_choose_us_copy && <CopyBlock label="Why Choose Us" icon={CheckCircle} content={generatedCopy.why_choose_us_copy} color="border-emerald-400" />}

                    {/* Products */}
                    {generatedCopy.product_descriptions && (
                        <>
                            <h3 className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-wider pt-2">Product Descriptions</h3>
                            <CopyBlock label="Product / Service Descriptions" icon={Package} content={generatedCopy.product_descriptions} color="border-orange-400" />
                        </>
                    )}

                    {/* Marketing */}
                    <h3 className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-wider pt-2">Marketing & Social</h3>
                    {generatedCopy.advertising_taglines && <CopyBlock label="Ad Taglines (3)" icon={Zap} content={generatedCopy.advertising_taglines} color="border-yellow-400" />}
                    {generatedCopy.social_media_captions && <CopyBlock label="Social Media Captions" icon={Megaphone} content={generatedCopy.social_media_captions} color="border-pink-400" />}

                    {/* Email */}
                    <h3 className="text-sm font-bold text-[var(--text-soft)] uppercase tracking-wider pt-2">Email Marketing</h3>
                    {generatedCopy.email_subject_lines && <CopyBlock label="Email Subject Lines" icon={Mail} content={generatedCopy.email_subject_lines} color="border-cyan-400" />}
                    {generatedCopy.welcome_email_series && <CopyBlock label="3-Part Welcome Email Series" icon={Mail} content={generatedCopy.welcome_email_series} color="border-green-400" />}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button onClick={() => setStep(4)} className="btn btn-secondary flex-1">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Refine & Regenerate
                        </button>
                        <Link to={createPageUrl('StrategyFormBrandIdentity')} className="btn btn-primary flex-1 justify-center">
                            <Palette className="w-4 h-4 mr-2" /> Full Brand Identity Form
                        </Link>
                    </div>
                </div>
            )}

            {step === 5 && !generatedCopy && (
                <div className="text-center py-10">
                    <Sparkles className="w-10 h-10 text-[var(--primary-gold)] mx-auto mb-3" />
                    <p className="text-[var(--text-soft)]">No copy generated yet. Go back and complete your brand details.</p>
                    <button onClick={() => setStep(4)} className="btn btn-primary mt-4">Back to Generate</button>
                </div>
            )}
        </div>
    );
}