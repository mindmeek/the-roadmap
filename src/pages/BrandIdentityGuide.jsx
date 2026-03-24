import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { generateBrandCopy } from '@/functions/generateBrandCopy';
import {
    Palette, Sparkles, Loader2, CheckCircle, ArrowLeft, ArrowRight,
    Save, ChevronRight, Target, Users, MessageSquare,
    Zap, Copy, RefreshCw, Info, Star, Megaphone, Mail, Mic
} from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Brand Foundation', icon: Target, desc: 'Mission, vision & values' },
    { id: 2, title: 'Your Audience', icon: Users, desc: 'Who you serve' },
    { id: 3, title: 'Brand Voice', icon: MessageSquare, desc: 'Tone & personality' },
    { id: 4, title: 'Generate Copy', icon: Sparkles, desc: 'AI creates your messaging' },
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
    const navigate = useNavigate();
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
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const user = await base44.auth.me();

            const [brandDocs, missionDocs, idealClientDocs, kits] = await Promise.all([
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'brand_identity' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'mission_vision' }),
                base44.entities.StrategyDocument.filter({ created_by: user.email, document_type: 'ideal_client' }),
                base44.entities.BrandKit.filter({ created_by: user.email }),
            ]);

            const merged = {
                brand_name: '',
                mission: '',
                vision: '',
                values: ['', '', ''],
                target_audience: '',
                tone_of_voice: '',
                unique_value_proposition: '',
                brand_personality: '',
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

            if (brandDocs.length > 0) {
                const bd = brandDocs[0].content || {};
                if (bd.brand_name) merged.brand_name = bd.brand_name;
                if (bd.mission_statement) merged.mission = bd.mission_statement;
                if (bd.vision_statement) merged.vision = bd.vision_statement;
                if (bd.core_values?.some(Boolean)) merged.values = bd.core_values;
                if (bd.unique_value_proposition) merged.unique_value_proposition = bd.unique_value_proposition;
                if (bd.brand_personality?.tone_of_voice) merged.tone_of_voice = bd.brand_personality.tone_of_voice;
                if (bd.brand_personality?.traits) merged.brand_personality = bd.brand_personality.traits;
            }

            setFormData(merged);

            if (kits.length > 0) {
                const kit = kits[0];
                setBrandKitId(kit.id);
                if (kit.website_hero_copy) {
                    setGeneratedCopy({
                        website_hero_copy: kit.website_hero_copy,
                        social_media_captions: kit.social_media_captions,
                        advertising_taglines: kit.advertising_taglines,
                        email_subject_lines: kit.email_subject_lines,
                        elevator_pitch: kit.elevator_pitch,
                    });
                    setStep(4);
                }
            }
        } catch (e) {
            console.error('Error loading brand data:', e);
        } finally {
            setLoading(false);
        }
    };

    const updateValue = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

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
            setStep(4);
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
                        <p className="text-[var(--text-soft)]">AI walks you through your brand & generates your messaging</p>
                    </div>
                </div>
            </div>

            {/* Pre-fill notice */}
            <div className="card p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Auto-filled from your Foundation Roadmap</p>
                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
                        We pulled your mission, vision, values and audience from your existing strategy documents. Review and refine below.{' '}
                        <Link to={createPageUrl('StrategyFormBrandIdentity')} className="underline font-medium">Edit in Brand Identity Form →</Link>
                    </p>
                </div>
            </div>

            {/* Step Progress */}
            <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
                {STEPS.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                        <button
                            onClick={() => s.id <= step && setStep(s.id)}
                            className={`flex flex-col items-center min-w-[80px] px-2 py-2 rounded-lg transition-all ${
                                step === s.id ? 'bg-[var(--primary-gold)] text-white' :
                                s.id < step ? 'text-green-600 dark:text-green-400' : 'text-[var(--text-soft)]'
                            }`}
                        >
                            {s.id < step ? (
                                <CheckCircle className="w-5 h-5 mb-1" />
                            ) : (
                                <s.icon className="w-5 h-5 mb-1" />
                            )}
                            <span className="text-xs font-semibold text-center leading-tight">{s.title}</span>
                        </button>
                        {i < STEPS.length - 1 && (
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${s.id < step ? 'text-green-500' : 'text-gray-300'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* STEP 1: Brand Foundation */}
            {step === 1 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 1: Your Brand Foundation</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            These are pulled from your Foundation Roadmap forms. Review and update them here — they're the core of your brand.
                        </p>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">Brand / Business Name</label>
                            <input className="form-input" value={formData.brand_name} onChange={e => updateValue('brand_name', e.target.value)} placeholder="e.g., The Business Minds" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Mission Statement
                                {formData.mission && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported from your forms</span>}
                            </label>
                            <textarea className="form-input" rows={3} value={formData.mission} onChange={e => updateValue('mission', e.target.value)} placeholder="What you do and why you do it..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Vision Statement
                                {formData.vision && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported from your forms</span>}
                            </label>
                            <textarea className="form-input" rows={3} value={formData.vision} onChange={e => updateValue('vision', e.target.value)} placeholder="Where you're heading and what you aspire to achieve..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Core Values</label>
                            <div className="space-y-2">
                                {formData.values.map((val, i) => (
                                    <input key={i} className="form-input" value={val} onChange={e => {
                                        const arr = [...formData.values];
                                        arr[i] = e.target.value;
                                        updateValue('values', arr);
                                    }} placeholder={`Core Value ${i + 1} (e.g., Integrity, Excellence)`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={handleSaveProgress} className="btn btn-secondary">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />}
                            <span className="ml-2">{saved ? 'Saved!' : 'Save Progress'}</span>
                        </button>
                        <button onClick={() => setStep(2)} className="btn btn-primary">
                            Next: Your Audience <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: Target Audience */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 2: Your Target Audience</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            The AI needs to know exactly who you're speaking to in order to craft the right message. Be as specific as possible.
                        </p>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">
                                Target Audience Description
                                {formData.target_audience && <span className="ml-2 text-xs text-green-600 font-normal">✓ Imported from Ideal Client</span>}
                            </label>
                            <textarea className="form-input" rows={5} value={formData.target_audience} onChange={e => updateValue('target_audience', e.target.value)}
                                placeholder="Describe who you serve in detail: age, profession, challenges, goals, lifestyle." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">Unique Value Proposition</label>
                            <textarea className="form-input" rows={3} value={formData.unique_value_proposition} onChange={e => updateValue('unique_value_proposition', e.target.value)}
                                placeholder="In one clear statement, what unique value do you offer that competitors don't?" />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(1)} className="btn btn-secondary"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                        <button onClick={() => setStep(3)} className="btn btn-primary">Next: Brand Voice <ArrowRight className="w-4 h-4 ml-2" /></button>
                    </div>
                </div>
            )}

            {/* STEP 3: Brand Voice */}
            {step === 3 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                            <h3 className="font-bold text-lg text-[var(--text-main)]">Step 3: Brand Voice & Personality</h3>
                        </div>
                        <p className="text-sm text-[var(--text-soft)]">
                            This is how your brand sounds and feels. The AI will use this to write copy that matches your exact communication style.
                        </p>
                    </div>

                    <div className="card p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-2">Tone of Voice</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                                {['Professional', 'Conversational', 'Bold & Confident', 'Warm & Empathetic', 'Inspirational', 'Educational'].map(tone => (
                                    <button key={tone} onClick={() => updateValue('tone_of_voice', tone)}
                                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${formData.tone_of_voice === tone ? 'bg-[var(--primary-gold)] text-white border-[var(--primary-gold)]' : 'border-gray-200 dark:border-gray-700 text-[var(--text-main)] hover:border-[var(--primary-gold)]'}`}>
                                        {tone}
                                    </button>
                                ))}
                            </div>
                            <input className="form-input" value={formData.tone_of_voice} onChange={e => updateValue('tone_of_voice', e.target.value)} placeholder="Or type your own tone description..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-main)] mb-1">Brand Personality Traits</label>
                            <textarea className="form-input" rows={3} value={formData.brand_personality} onChange={e => updateValue('brand_personality', e.target.value)}
                                placeholder="If your brand was a person, how would you describe them?" />
                        </div>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/10 border-2 border-[var(--primary-gold)]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-[var(--primary-gold)] p-2 rounded-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)]">Ready to generate your brand copy!</h3>
                                <p className="text-sm text-[var(--text-soft)]">The AI will create website copy, social posts, ad taglines, email subject lines & your elevator pitch.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[var(--text-soft)] mb-4">
                            {['Website Hero Copy', 'Social Media Captions', 'Ad Taglines', 'Email Subject Lines', 'Elevator Pitch'].map(item => (
                                <div key={item} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> {item}</div>
                            ))}
                        </div>
                        <p className="text-xs text-[var(--text-soft)] italic">Uses Claude AI — may take 15–20 seconds</p>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(2)} className="btn btn-secondary"><ArrowLeft className="w-4 h-4 mr-2" /> Back</button>
                        <button onClick={handleGenerate} disabled={generating} className="btn btn-primary text-base px-6">
                            {generating ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Copy...</>
                            ) : (
                                <><Sparkles className="w-5 h-5 mr-2" /> Generate My Brand Copy</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 4: Generated Copy */}
            {step === 4 && generatedCopy && (
                <div className="space-y-5">
                    <div className="card p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-300 dark:border-green-700 flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-[var(--text-main)]">Your Brand Messaging is Ready! 🎉</h3>
                            <p className="text-sm text-[var(--text-soft)]">All copy is saved to your Brand Kit. Click any section to copy it.</p>
                        </div>
                        <button onClick={() => { setGeneratedCopy(null); setStep(3); }} className="btn btn-ghost text-xs ml-auto flex-shrink-0">
                            <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                        </button>
                    </div>

                    {generatedCopy.website_hero_copy && (
                        <CopyBlock label="Website Hero Copy" icon={Star} content={generatedCopy.website_hero_copy} color="border-purple-400" />
                    )}
                    {generatedCopy.elevator_pitch && (
                        <CopyBlock label="Elevator Pitch" icon={Mic} content={generatedCopy.elevator_pitch} color="border-blue-400" />
                    )}
                    {generatedCopy.social_media_captions && (
                        <CopyBlock label="Social Media Captions" icon={Megaphone} content={generatedCopy.social_media_captions} color="border-pink-400" />
                    )}
                    {generatedCopy.advertising_taglines && (
                        <CopyBlock label="Advertising Taglines" icon={Zap} content={generatedCopy.advertising_taglines} color="border-yellow-400" />
                    )}
                    {generatedCopy.email_subject_lines && (
                        <CopyBlock label="Email Subject Lines" icon={Mail} content={generatedCopy.email_subject_lines} color="border-green-400" />
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button onClick={() => setStep(3)} className="btn btn-secondary flex-1">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Refine & Regenerate
                        </button>
                        <Link to={createPageUrl('StrategyFormBrandIdentity')} className="btn btn-primary flex-1 justify-center">
                            <Palette className="w-4 h-4 mr-2" /> Full Brand Identity Form
                        </Link>
                    </div>
                </div>
            )}

            {step === 4 && !generatedCopy && (
                <div className="text-center py-10">
                    <Sparkles className="w-10 h-10 text-[var(--primary-gold)] mx-auto mb-3" />
                    <p className="text-[var(--text-soft)]">No copy generated yet. Go back and complete your brand details.</p>
                    <button onClick={() => setStep(3)} className="btn btn-primary mt-4">Back to Generate</button>
                </div>
            )}
        </div>
    );
}