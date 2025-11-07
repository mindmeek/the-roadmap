
import React, { useState, useEffect, useCallback } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mic, Video, Edit, Tv, Podcast, CheckCircle, Users, Radio, MapPin, Calendar, Loader2, Save, Lightbulb, ArrowRight, DollarSign, Clock, Star } from 'lucide-react';

const ServiceCard = ({ icon, title, description }) => {
    const Icon = icon;
    return (
        <div className="card p-6">
            <div className="bg-[var(--primary-gold)]/10 text-[var(--primary-gold)] p-3 rounded-md w-fit mb-4">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-[var(--text-soft)]">{description}</p>
        </div>
    );
};

const PricingTier = ({ title, items }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="text-xl font-semibold text-[var(--primary-gold)] mb-4">{title}</h4>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                    <span className="text-[var(--text-soft)]">{item.name}</span>
                    <span className="font-bold text-lg">{item.price}</span>
                </li>
            ))}
        </ul>
    </div>
);

const BenefitItem = ({ icon, title, description }) => {
    const Icon = icon;
    return (
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div>
                <h4 className="text-lg font-bold">{title}</h4>
                <p className="text-[var(--text-soft)] mt-1">{description}</p>
            </div>
        </div>
    );
};

// Interactive Podcast/Show Planning Guide Component
const ShowPlanningGuide = ({ user }) => {
    const [showForm, setShowForm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [existingDoc, setExistingDoc] = useState(null);
    const [formData, setFormData] = useState({
        show_type: '',
        show_name: '',
        target_audience: '',
        show_purpose: '',
        episode_format: '',
        topics: '',
        potential_guests: '',
        equipment_needs: '',
        distribution_plans: ''
    });

    const loadExistingPlan = useCallback(async () => {
        if (!user) return;
        try {
            const docs = await StrategyDocument.filter({ 
                created_by: user.email, 
                document_type: 'podcast_plan' 
            });
            if (docs.length > 0) {
                setExistingDoc(docs[0]);
                setFormData(docs[0].content);
            }
        } catch (error) {
            console.error("Error loading existing plan:", error);
        }
    }, [user]);

    useEffect(() => {
        if (user && showForm) {
            loadExistingPlan();
        }
    }, [user, showForm, loadExistingPlan]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const documentData = {
                document_type: 'podcast_plan',
                title: formData.show_name || 'My Show Plan',
                content: formData,
                is_completed: true,
                last_updated: new Date().toISOString()
            };

            if (existingDoc) {
                await StrategyDocument.update(existingDoc.id, documentData);
            } else {
                await StrategyDocument.create(documentData);
            }

            alert('Show plan saved successfully!');
            setShowForm(false);
        } catch (error) {
            console.error("Error saving plan:", error);
            alert('Failed to save. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!showForm) {
        return (
            <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
                <div className="flex items-start gap-4">
                    <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">🎙️ Plan Your Podcast or Radio Show</h3>
                        <p className="text-[var(--text-soft)] mb-4">
                            Before booking a session, use our interactive guide to map out your show concept, audience, format, and goals. This will help us provide you with the best possible experience and recommendations.
                        </p>
                        <button onClick={() => setShowForm(true)} className="btn btn-primary">
                            <Podcast className="w-4 h-4 mr-2" />
                            Start Planning My Show
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Plan Your Show</h3>
                <button onClick={() => setShowForm(false)} className="btn btn-ghost text-sm">
                    Close
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Show Type *
                    </label>
                    <select
                        value={formData.show_type}
                        onChange={(e) => handleInputChange('show_type', e.target.value)}
                        className="form-input"
                    >
                        <option value="">Select a type...</option>
                        <option value="podcast">Podcast (In-studio recording)</option>
                        <option value="radio">Radio Show (Equalizer Radio)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Show Name *
                    </label>
                    <input
                        type="text"
                        value={formData.show_name}
                        onChange={(e) => handleInputChange('show_name', e.target.value)}
                        placeholder="What will you call your show?"
                        className="form-input"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Target Audience *
                    </label>
                    <textarea
                        value={formData.target_audience}
                        onChange={(e) => handleInputChange('target_audience', e.target.value)}
                        placeholder="Who is your show for? (demographics, interests, pain points)"
                        className="form-input h-24"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Show Purpose & Goals
                    </label>
                    <textarea
                        value={formData.show_purpose}
                        onChange={(e) => handleInputChange('show_purpose', e.target.value)}
                        placeholder="What do you hope to achieve with this show?"
                        className="form-input h-24"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Episode Format
                    </label>
                    <textarea
                        value={formData.episode_format}
                        onChange={(e) => handleInputChange('episode_format', e.target.value)}
                        placeholder="Solo, interview, panel discussion, narrative? How long will episodes be?"
                        className="form-input h-20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Topics & Themes
                    </label>
                    <textarea
                        value={formData.topics}
                        onChange={(e) => handleInputChange('topics', e.target.value)}
                        placeholder="What subjects will you cover?"
                        className="form-input h-20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Potential Guests or Co-Hosts
                    </label>
                    <textarea
                        value={formData.potential_guests}
                        onChange={(e) => handleInputChange('potential_guests', e.target.value)}
                        placeholder="Any specific people or types of guests you'd like to feature?"
                        className="form-input h-20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Equipment & Production Needs
                    </label>
                    <textarea
                        value={formData.equipment_needs}
                        onChange={(e) => handleInputChange('equipment_needs', e.target.value)}
                        placeholder="Video, multiple mics, remote guests, special effects?"
                        className="form-input h-20"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                        Distribution & Promotion Plans
                    </label>
                    <textarea
                        value={formData.distribution_plans}
                        onChange={(e) => handleInputChange('distribution_plans', e.target.value)}
                        placeholder="Where will you publish? How will you promote?"
                        className="form-input h-20"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button onClick={() => setShowForm(false)} className="btn btn-ghost">
                    Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving} className="btn btn-primary">
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Show Plan
                </button>
            </div>
        </div>
    );
};

export default function TheBeaconPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                console.error("Failed to load user:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const services = [
        { icon: Mic, title: "Podcast Studio Rental", description: "Record in a professional, sound-treated space with high-quality microphones, cameras, and gear." },
        { icon: Edit, title: "Production Support", description: "Audio engineering, video recording, editing, branded intros/outros, and social media clip creation." },
        { icon: Tv, title: "Content Distribution", description: "Guidance on publishing to Spotify, Apple Podcasts, YouTube, and beyond." },
        { icon: Podcast, title: "Creative Packages", description: "Bundled services for podcasts, businesses, and ministries ready to expand their reach." },
    ];

    const studioPricing = {
        rental: [
            { name: "DIY Studio (you run the show) + Video", price: "$50/hr" },
            { name: "With professional engineer + Video", price: "$75/hr" },
        ],
        addOns: [
            { name: "Editing/Post-Production", price: "$100–$200" },
            { name: "Social Media Clips", price: "$30 each" },
            { name: "3 Social Media Clips", price: "$75" },
        ],
    };

    const equalizerPricing = [
        { name: "Monthly Subscription", price: "$99/mo" },
        { name: "Minimum Air Time", price: "4+ hours/month (2 hours live + 2 hours pre-recorded OR all 4 hours live)" },
        { name: "Ad Revenue", price: "100% yours - no profit sharing" },
        { name: "Setup & Training", price: "Included" },
    ];
    
    const benefits = [
        { icon: CheckCircle, title: "Professional-Grade Equipment", description: "Access top-tier podcast and video equipment without the upfront cost." },
        { icon: CheckCircle, title: "Support for All Levels", description: "Whether you're a beginner or a pro, our team is here to help you succeed." },
        { icon: CheckCircle, title: "Collaborative Environment", description: "A welcoming, creative space to connect with other creators and entrepreneurs." },
        { icon: CheckCircle, title: "Built to Grow With You", description: "From your first recording to a full online radio show, we're here for your journey." },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 py-8 max-w-6xl mx-auto">
            {/* Hero Section */}
            <div 
                className="relative overflow-hidden shadow-2xl mb-12"
                style={{ 
                    backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/87939415f_lycs-architecture-U2BI3GMnSSE-unsplash.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '2px'
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 py-12 px-6 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-gold)] mb-4">
                        Welcome to The Beacon
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-2xl">
                        Where Ideas Find Clarity. Where Voices Shine.
                    </p>
                    <p className="max-w-3xl text-gray-400 mb-8">
                        At The Beacon, we believe every voice deserves to be heard. Built in partnership with the community, The Beacon is a professional podcast studio designed to give creators, entrepreneurs, ministries, and storytellers a space where their message shines with clarity and impact.
                    </p>
                    
                    <div className="bg-black/50 rounded-sm p-4 max-w-2xl backdrop-blur-sm">
                        <div className="flex items-start mb-3">
                            <MapPin className="w-5 h-5 mr-2 text-[var(--primary-gold)] flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white">Studio Location:</strong>
                                <p className="text-gray-300">Mesquite, Texas (Serving Dallas Metroplex: Mesquite, Garland, East Dallas, Balch Springs)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Radio className="w-5 h-5 mr-2 text-[var(--primary-gold)] flex-shrink-0 mt-0.5" />
                            <div>
                                <strong className="text-white">Online Radio Shows:</strong>
                                <p className="text-gray-300">Host live or prerecorded shows from anywhere in the world</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Show Planning Guide */}
            {user && <ShowPlanningGuide user={user} />}

            {/* Booking Options Section */}
            <div className="mb-12 space-y-6" style={{ marginTop: '60px' }}>
                <h2 className="text-3xl font-bold text-center mb-8">Choose Your Path</h2>
                <p className="text-center text-[var(--text-soft)] mb-8 max-w-2xl mx-auto">
                    Whether you want to record a podcast in our studio or host an online radio show, we've got you covered. Select the option that fits your vision.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Free Intro Session */}
                    <Link
                        to={createPageUrl('BeaconIntro')}
                        className="card p-6 hover:shadow-xl transition-all border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 group"
                        style={{ borderRadius: '2px' }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-3" style={{ borderRadius: '2px' }}>
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Free 15-Min Intro</h3>
                                <p className="text-xs text-[var(--text-soft)]">Get started with a consultation</p>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            Meet our team and map out your podcast or radio show vision. Perfect for first-timers.
                        </p>
                        <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:underline">
                            Book Free Session <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </Link>

                    {/* Podcast Studio Booking */}
                    <Link
                        to={createPageUrl('BeaconStudioBooking')}
                        className="card p-6 hover:shadow-xl transition-all border-2 border-[var(--primary-gold)] hover:border-yellow-600 group"
                        style={{ borderRadius: '2px' }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[var(--primary-gold)]/20 p-3" style={{ borderRadius: '2px' }}>
                                <Podcast className="w-6 h-6 text-[var(--primary-gold)]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Podcast Studio</h3>
                                <p className="text-xs text-[var(--text-soft)]">Professional in-studio recording</p>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            Book time in our Mesquite, TX studio with professional equipment and optional engineering support.
                        </p>
                        <div className="flex items-center text-[var(--primary-gold)] font-semibold text-sm group-hover:underline">
                            Book Studio Time <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </Link>

                    {/* Equalizer Radio Setup */}
                    <Link
                        to={createPageUrl('BeaconRadioSetup')}
                        className="card p-6 hover:shadow-xl transition-all border-2 border-red-200 dark:border-red-700 hover:border-red-500 group"
                        style={{ borderRadius: '2px' }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 dark:bg-red-900 p-3" style={{ borderRadius: '2px' }}>
                                <Radio className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Equalizer Radio</h3>
                                <p className="text-xs text-[var(--text-soft)]">Online radio show hosting</p>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--text-soft)] mb-4">
                            Host your own recurring radio show online. Record from anywhere, reach listeners globally.
                        </p>
                        <div className="flex items-center text-red-600 font-semibold text-sm group-hover:underline">
                            Setup My Radio Show <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* What We Offer Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map(service => <ServiceCard key={service.title} {...service} />)}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-12 space-y-8">
                <h2 className="text-3xl font-bold text-center mb-8">Pricing & Packages</h2>
                
                {/* The Beacon Studio Pricing */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                        <Podcast className="w-6 h-6 mr-2 text-[var(--primary-gold)]" />
                        The Beacon Studio (In-Person)
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PricingTier title="Studio Rental" items={studioPricing.rental} />
                        <PricingTier title="Add-Ons" items={studioPricing.addOns} />
                    </div>
                </div>

                {/* Equalizer Radio Pricing */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                        <Radio className="w-6 h-6 mr-2 text-red-600" />
                        Equalizer Radio (Online)
                    </h3>
                    <div className="max-w-2xl mx-auto">
                        <div className="card p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700" style={{ borderRadius: '2px' }}>
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold text-red-600 mb-2">$99<span className="text-2xl">/month</span></div>
                                <a 
                                    href="https://equalizerradio.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium inline-flex items-center gap-1"
                                >
                                    Visit Equalizer Radio <ArrowRight className="w-3 h-3" />
                                </a>
                                <p className="text-sm text-[var(--text-soft)] mt-2">Everything you need to host your online radio show</p>
                            </div>
                            <ul className="space-y-3">
                                {equalizerPricing.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-[var(--text-main)]">{item.name}:</span>
                                            <span className="text-[var(--text-soft)] ml-2">{item.price}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30" style={{ borderRadius: '2px' }}>
                                <div className="flex items-start gap-2">
                                    <DollarSign className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        <strong>Keep 100% of Your Ad Revenue!</strong> Sell ads at your cost with zero profit sharing from us. Your show, your income.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Get Started Button */}
                            <div className="mt-6">
                                <Link
                                    to={createPageUrl('BeaconRadioSetup')}
                                    className="btn bg-red-600 hover:bg-red-700 text-white w-full py-3 text-lg font-semibold flex items-center justify-center gap-2"
                                    style={{ borderRadius: '2px' }}
                                >
                                    <Radio className="w-5 h-5" />
                                    Get Started with Equalizer Radio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why The Beacon Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose The Beacon?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   {benefits.map(benefit => <BenefitItem key={benefit.title} {...benefit} />)}
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12 px-6 bg-[var(--primary-gold)] text-white shadow-xl" style={{ borderRadius: '2px' }}>
                 <h2 className="text-3xl font-bold mb-4">🚀 Shine Your Light</h2>
                 <p className="text-lg mb-6 max-w-2xl mx-auto">
                    Your message matters. Whether you're sharing a story, building a brand, or growing a ministry, The Beacon is here to amplify your voice.
                 </p>
                 <a href="https://thebeacon.llc" target="_blank" rel="noopener noreferrer" className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100 text-lg px-8 py-3">
                    Visit The Beacon Website
                 </a>
            </div>
        </div>
    );
}
