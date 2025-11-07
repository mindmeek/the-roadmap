
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { createPageUrl } from '@/utils';
import { BookOpen, Lightbulb, Newspaper, Briefcase, Handshake, Video, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

const ContentTypeCard = ({ title, description, icon: Icon, onClick }) => (
    <div 
        onClick={onClick}
        className="card p-6 hover:shadow-lg hover:border-[var(--primary-gold)] transition-all duration-200 cursor-pointer"
    >
        <div className="flex items-start justify-between">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
                <Icon className="w-6 h-6 text-[var(--primary-gold)]" />
            </div>
        </div>
        <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{title}</h3>
        <p className="text-[var(--text-soft)] text-sm">{description}</p>
    </div>
);

export default function AdminContentManagement() {
    const navigate = useNavigate();

    const contentTypes = [
        { title: "Courses", description: "Manage full-length courses and lessons.", icon: Briefcase, onClick: () => alert('Course management coming soon!') },
        { title: "Guides", description: "Create and edit step-by-step guides.", icon: BookOpen, onClick: () => navigate(createPageUrl('Guides')) },
        { title: "Quick Lessons", description: "Manage short, actionable quick lessons.", icon: Lightbulb, onClick: () => navigate(createPageUrl('QuickLessons')) },
        { title: "Mindset", description: "Manage mindset and framework articles.", icon: Newspaper, onClick: () => navigate(createPageUrl('MindsetHacks')) },
        { title: "Events", description: "Manage community events.", icon: Video, onClick: () => navigate(createPageUrl('Events')) },
        { title: "Partners", description: "Manage partner directory listings.", icon: Handshake, onClick: () => navigate(createPageUrl('Partners')) },
    ];

    return (
        <div className="px-4 pb-8">
            <div className="max-w-4xl mx-auto">
                <div className="card p-6 md:p-8 mb-6">
                    <div className="flex items-start gap-4"> {/* Added flex container */}
                         <Link to={createPageUrl('Admin')} className="btn btn-ghost p-2 -ml-2 -mt-2 hidden md:inline-flex">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div> {/* Wrapped h1 and p in a div */}
                            <h1 className="text-2xl md:text-3xl">Content Management</h1> {/* Updated title text */}
                            <p className="text-[var(--text-soft)] mt-2">Manage all platform content from a single hub.</p> {/* Updated description text */}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contentTypes.map(type => (
                        <ContentTypeCard key={type.title} {...type} />
                    ))}
                </div>
            </div>
        </div>
    );
}
