import React, { useState, useEffect } from 'react';
import { User, Business, BusinessReview, BusinessMember } from '@/entities/all';
import { useLocation, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Loader2, Mail, Phone, Globe, MessageSquare, Star, Send, MapPin, ExternalLink, Play, Edit3 } from 'lucide-react';
import { sendBusinessContactEmail } from '@/functions/sendBusinessContactEmail';

const SocialLinkIcon = ({ platform }) => {
    // ... same as before
};

const ReviewStars = ({ rating, totalReviews }) => {
    // ... same as before
};

const ContactForm = ({ business }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        setIsSubmitting(true);
        try {
            await sendBusinessContactEmail({
                recipientEmail: business.public_email,
                fromName: formData.name,
                fromEmail: formData.email,
                message: formData.message,
                businessName: business.name
            });
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending contact form:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
                <p className="text-green-700 mt-2">Your message has been sent to {business.name}.</p>
                <button onClick={() => setSubmitSuccess(false)} className="btn btn-secondary mt-4">Send Another Message</button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center"><MessageSquare className="w-5 h-5 mr-2" />Contact {business.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Your Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Your Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[var(--text-main)] mb-1">Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="form-input h-24 resize-none" placeholder={`Hi! I'm interested in learning more about ${business.name}...`} required />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                </button>
            </form>
        </div>
    );
};

export default function BusinessProfilePage() {
    const location = useLocation();
    const [business, setBusiness] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [members, setMembers] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const getBusinessId = () => new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const businessId = getBusinessId();
        if (!businessId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const user = await User.me();
                setCurrentUser(user);

                const bizResult = await Business.get(businessId);
                setBusiness(bizResult);

                const reviewResult = await BusinessReview.filter({ business_id: businessId });
                setReviews(reviewResult);

                if (reviewResult.length > 0) {
                    const total = reviewResult.reduce((acc, rev) => acc + rev.rating, 0);
                    setAvgRating(total / reviewResult.length);
                }
                
                const memberResult = await BusinessMember.filter({ business_id: businessId });
                setMembers(memberResult);

            } catch (err) {
                console.error("Error loading business profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" /></div>;
    }

    if (!business) {
        return <div className="text-center py-20"><h2 className="text-2xl font-bold">Business not found</h2></div>;
    }
    
    const currentUserMembership = members.find(m => m.user_email === currentUser?.email);
    const canEdit = currentUserMembership?.role === 'owner' || currentUserMembership?.role === 'admin';

    const defaultLogo = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa6078871_LargeAppIcon.png";
    const defaultCover = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c14f3ed5b_TBM-.jpg";

    return (
        <div className="bg-[var(--background-main)] min-h-screen">
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <header className="h-48 md:h-64 bg-gray-200 relative">
                    <img src={business.cover_photo_url || defaultCover} alt={`${business.name} cover`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </header>
                <div className="px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="relative -mt-16 sm:-mt-20 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border dark:border-gray-700">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="flex-shrink-0 -mt-24">
                                    <img className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg bg-white" src={business.logo_url || defaultLogo} alt={`${business.name} logo`} />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-main)]">{business.name}</h1>
                                    {business.tagline && <p className="text-lg text-[var(--text-soft)] mt-1">{business.tagline}</p>}
                                    {business.industry && <p className="text-md text-[var(--primary-gold)] font-medium mt-1">{business.industry}</p>}
                                    <div className="mt-3 flex items-center justify-center md:justify-start">
                                        <ReviewStars rating={avgRating} totalReviews={reviews.length} />
                                    </div>
                                </div>
                                {canEdit && (
                                    <div className="md:ml-auto flex-shrink-0">
                                        <Link to={createPageUrl('EditBusiness', { id: business.id })} className="btn btn-primary">
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Manage Business
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {business.description && <div className="card p-6"><h2 className="text-2xl font-bold mb-4">About {business.name}</h2><p className="whitespace-pre-wrap">{business.description}</p></div>}
                            {business.services?.length > 0 && <div className="card p-6"><h2 className="text-2xl font-bold mb-6">Our Services</h2><div className="space-y-6">{business.services.map((s, i) => (<div key={i} className="border-b pb-6 last:border-0 last:pb-0"><div className="flex justify-between items-start mb-2"><h3 className="text-lg font-semibold">{s.name}</h3>{s.price && <span className="text-lg font-bold text-[var(--primary-gold)]">{s.price}</span>}</div><p>{s.description}</p></div>))}</div></div>}
                            {members?.length > 0 && <div className="card p-6"><h2 className="text-2xl font-bold mb-6">Our Team</h2><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{members.map(m => (<div key={m.id} className="text-center"><img src={m.profile_picture_url || defaultLogo} className="w-20 h-20 rounded-full mx-auto object-cover shadow-md" /><p className="mt-2 font-semibold text-sm truncate">{m.full_name}</p><p className="text-xs text-gray-500 capitalize">{m.role}</p></div>))}</div></div>}
                            {business.photo_gallery?.length > 0 && <div className="card p-6"><h2 className="text-2xl font-bold mb-6">Gallery</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{business.photo_gallery.map((url, i) => (<img key={i} src={url} className="aspect-square rounded-lg object-cover shadow-md" />))}</div></div>}
                            {business.video_url && <div className="card p-6"><h2 className="text-2xl font-bold mb-6">Featured Video</h2><div className="aspect-video bg-gray-100 rounded-lg"><iframe src={business.video_url.replace('watch?v=', 'embed/')} width="100%" height="100%" frameBorder="0" allowFullScreen title="Business Video"/></div></div>}
                        </div>
                        <div className="space-y-6">
                            <div className="card p-6">
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    {business.website_url && <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-gray-500" /><a href={business.website_url} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-gold)] hover:underline">Visit Website</a></div>}
                                    {business.public_email && <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-500" /><a href={`mailto:${business.public_email}`} className="text-[var(--primary-gold)] hover:underline">{business.public_email}</a></div>}
                                    {business.public_phone && <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-500" /><a href={`tel:${business.public_phone}`} className="text-[var(--primary-gold)] hover:underline">{business.public_phone}</a></div>}
                                    {business.city && <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-gray-500" /><span>{business.city}</span></div>}
                                </div>
                                {business.social_links && Object.values(business.social_links).some(link => link) && <div className="mt-6 pt-6 border-t"><h4 className="font-semibold mb-3">Follow Us</h4><div className="flex flex-wrap gap-3">{Object.entries(business.social_links).map(([p, u]) => u && <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-gray-100 hover:bg-[var(--primary-gold)] hover:text-white"><SocialLinkIcon platform={p} /></a>)}</div></div>}
                            </div>
                            {business.public_email && <ContactForm business={business} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}