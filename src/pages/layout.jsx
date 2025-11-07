
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Notification } from '@/entities/all';
import { createPageUrl } from '@/utils';
import {
    Menu, X, Bell, Users, Video, Shield, Calendar, Home, Compass, BarChart, BookOpen,
    Newspaper, Mic, LifeBuoy, Zap, Briefcase, FileText, Settings, LogOut, Sun, Moon,
    Grid, MessageSquare, Sparkles, ChevronDown
} from 'lucide-react';

// NavItem Component - Helper for rendering individual navigation items
const NavItem = ({ item, isActive, onClick }) => {
    const navigate = useNavigate();
    const commonClasses = `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-gray-900' : 'hover:bg-gray-700'}`;

    const handleClick = (e) => {
        if (item.action) {
            e.preventDefault();
            item.action();
        }
        if (onClick) onClick();
    };

    const content = (
        <>
            <item.icon className="mr-3 h-6 w-6" />
            <span>{item.title}</span>
        </>
    );

    if (item.url && !item.action) {
        return (
            <Link to={item.url} className={commonClasses} onClick={onClick}>
                {content}
            </Link>
        );
    } else {
        return (
            <button onClick={handleClick} className={`w-full text-left ${commonClasses}`}>
                {content}
            </button>
        );
    }
};

// CollapsibleSection Component
const CollapsibleSection = ({ title, items, isOpen, onToggle, location, user }) => {
    const filteredItems = items.filter(item => {
        if (item.requiredLevel) {
            return user && user.subscription_level && user.subscription_level === item.requiredLevel;
        }
        return true;
    });

    if (filteredItems.length === 0) return null;

    return (
        <div className="mb-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-white uppercase tracking-wider bg-gray-800 hover:bg-gray-700 rounded-md transition-colors mb-2"
            >
                <span>{title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="space-y-1 mt-2">
                    {filteredItems.map((item) => (
                        <NavItem
                            key={item.url || item.title}
                            item={item}
                            isActive={location.pathname === item.url}
                            onClick={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const PodcastModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100]">
            <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full text-center relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
                <Mic className="w-12 h-12 text-[var(--primary-gold)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">The Business Minds Podcast</h3>
                <p className="text-gray-300 mb-4">New episodes weekly. Listen on your favorite platform.</p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">Spotify</a>
                    <a href="#" className="text-gray-300 hover:text-white">Apple</a>
                    <a href="#" className="text-gray-300 hover:text-white">Google</a>
                </div>
            </div>
        </div>
    );
};

const ElyzetChatModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                        <h3 className="text-lg font-semibold text-[var(--text-main)]">Ask Elyzet AI</h3>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 w-full h-full">
                   <iframe 
                        src="https://app.formwise.ai/chat/1755283560416x768948670638063600" 
                        style={{border: '0px #ffffff none', width: '100%', height: '100%'}}
                        name="FormWise.ai" 
                        scrolling="yes"
                        allow="clipboard-write" 
                        frameBorder="0" 
                        marginHeight="0px" 
                        marginWidth="0px" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        const fetchNotifications = async () => {
            const user = await User.me();
            const userNotifications = await Notification.filter({ recipient_email: user.email }, '-created_date', 10);
            setNotifications(userNotifications);
        };
        fetchNotifications();
    }, []);

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
            <div className="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Notifications</div>
            <div className="py-1">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div key={n.id} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {n.message}
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No new notifications.</div>
                )}
            </div>
        </div>
    );
};

const ThemeProvider = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    return (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-800" />}
        </button>
    );
};

const UserProfileSidebar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
            } catch (e) {
                // Not logged in
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div className="p-4"><div className="w-full h-[50px] bg-gray-700 rounded-md animate-pulse"></div></div>;
    }

    if (!user) return null;

    return (
        <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                    alt="Profile"
                    className="w-[50px] h-[50px] rounded-md object-cover bg-gray-800"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{user.full_name}</p>
                    <Link to={createPageUrl('Profile')} className="text-xs text-gray-300 hover:text-[var(--primary-gold)]">View Profile</Link>
                </div>
            </div>
        </div>
    );
};

const MobileBottomNav = ({ user }) => {
    const location = useLocation();
    const navigationItems = [
        { title: "Dashboard", icon: Home, url: createPageUrl("Dashboard") },
        { title: "Community", icon: Users, url: createPageUrl("TheCommunity") },
        { title: "Journey", icon: Compass, url: createPageUrl("Journey") },
        { title: "My Strategy", icon: Zap, url: createPageUrl("MyStrategy") },
        { title: "Profile", icon: Settings, url: createPageUrl("Profile") },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
            <div className="flex justify-around items-center py-2">
                {navigationItems.map((item, index) => {
                    const isActive = location.pathname === item.url;
                    const isProfile = item.title === "Profile";

                    return (
                        <Link
                            key={item.title}
                            to={item.url}
                            className={`flex flex-col items-center py-2 px-3 min-w-0 ${
                                isActive ? 'text-[var(--primary-gold)]' : 'text-gray-400'
                            }`}
                        >
                            {isProfile ? (
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                                    alt="Profile"
                                    className={`w-6 h-6 rounded-md object-cover bg-gray-800 ${isActive ? 'ring-2 ring-[var(--primary-gold)]' : ''}`}
                                />
                            ) : (
                                <item.icon className="w-6 h-6" />
                            )}
                            <span className="text-xs mt-1 truncate">{item.title}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

const FirstMemberNotification = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const checkFirstMember = async () => {
            const user = await User.me();
            if (user?.is_first_member && !localStorage.getItem('dismissedFirstMember')) {
                setShow(true);
            }
        };
        checkFirstMember();
    }, []);
    if (!show) return null;
    return (
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 text-center text-sm">
            You're the first member! Invite others to get started.
            <button onClick={() => { setShow(false); localStorage.setItem('dismissedFirstMember', 'true'); }} className="ml-4 font-bold">X</button>
        </div>
    );
};

const MobileMenu = ({ onClose, user }) => {
    const navigate = useNavigate();
    const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
    const mainNavItems = [
        { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
        { title: "My Journey", url: createPageUrl("Journey"), icon: Compass },
        { title: "Daily Progress", url: createPageUrl("Progress"), icon: BarChart },
        { title: "My Schedule", url: createPageUrl("Schedule"), icon: Calendar },
        { title: "My Strategy", url: createPageUrl("MyStrategy"), icon: Zap },
    ];
    const resourcesNavItems = [
        { title: "Courses", url: createPageUrl("Courses"), icon: BookOpen },
        { title: "Guides", url: createPageUrl("Guides"), icon: Newspaper },
        { title: "Partners", url: createPageUrl("Partners"), icon: Briefcase },
        { title: "Podcast", action: () => setIsPodcastModalOpen(true), icon: Mic },
    ];
    const communityNavItems = [
        { title: "The Community", url: createPageUrl("TheCommunity"), icon: Users },
    ];
    const adminNavItems = user?.role === 'admin' ? [
        { title: "Admin Panel", url: createPageUrl("Admin"), icon: Grid }
    ] : [];

    const handleLogout = async () => {
        await User.logout();
        navigate(createPageUrl('Login'));
    };

    return (
        <>
            <div className="lg:hidden fixed inset-0 flex z-50">
                <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
                <div className="relative w-72 bg-[#111827] text-white flex flex-col">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={onClose}><X className="w-6 h-6" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <UserProfileSidebar />
                        <nav className="p-4">
                            {[
                                { title: 'Main Menu', items: mainNavItems },
                                { title: 'Community', items: communityNavItems },
                                { title: 'Resources', items: resourcesNavItems },
                                { title: 'Admin', items: adminNavItems },
                            ].map(section => (
                                section.items.length > 0 && (
                                    <div key={section.title} className="mb-4">
                                        <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">{section.title}</h3>
                                        {section.items.map(item => (
                                            <Link key={item.title} to={item.url || '#'} onClick={item.action} className="flex items-center space-x-3 text-sm py-2 px-3 rounded-md hover:bg-gray-700">
                                                <item.icon className="w-5 h-5 text-gray-400" />
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )
                            ))}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-gray-800">
                        <button onClick={handleLogout} className="flex items-center space-x-3 text-sm w-full py-2 px-3 rounded-md hover:bg-gray-700">
                            <LogOut className="w-5 h-5 text-gray-400" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            <PodcastModal isOpen={isPodcastModalOpen} onClose={() => setIsPodcastModalOpen(false)} />
        </>
    );
};

export default function Layout({ children, currentPageName }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPodcastModalOpen, setIsPodcastModalOpen] = useState(false);
    const [isElyzetModalOpen, setIsElyzetModalOpen] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const notificationRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [openSections, setOpenSections] = useState({
        main: true,
        community: true,
        resources: true,
        admin: true,
    });

    const handleSectionToggle = (sectionName) => {
        setOpenSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
                if (!userData.onboarding_completed && location.pathname !== '/Onboarding') {
                    navigate(createPageUrl('Onboarding'));
                }
            } catch (e) {
                if (location.pathname !== '/Login') {
                   // navigate(createPageUrl('Login'));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [location.pathname, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotificationDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await User.logout();
        navigate(createPageUrl('Login'));
    };
    
    const mainNavItems = [
        { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
        { title: "My Journey", url: createPageUrl("Journey"), icon: Compass },
        { title: "Daily Progress", url: createPageUrl("Progress"), icon: BarChart },
    ];
    
    const resourcesNavItems = [
        { title: "Courses", url: createPageUrl("Courses"), icon: BookOpen },
        { title: "Guides", url: createPageUrl("Guides"), icon: Newspaper },
        { title: "Partners", url: createPageUrl("Partners"), icon: Briefcase },
        { title: "Podcast", action: () => setIsPodcastModalOpen(true), icon: Mic },
    ];
    
    const communityNavItems = [
        { title: "The Community", url: createPageUrl("TheCommunity"), icon: Users },
    ];
    
    const adminNavItems = user?.role === 'admin' ? [
        { title: "Admin Panel", url: createPageUrl("Admin"), icon: Grid }
    ] : [];

    if (loading) {
        return <div className="bg-white dark:bg-black h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if(location.pathname === '/Onboarding' || location.pathname === '/Login') {
      return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-white dark:bg-black overflow-hidden">
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 bg-[#111827] text-white">
                    <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-gray-800">
                        The Launchpad
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <UserProfileSidebar />
                        <nav className="flex-1 px-2 py-4">
                             <CollapsibleSection
                                 title="Main"
                                 items={mainNavItems}
                                 isOpen={openSections.main}
                                 onToggle={() => handleSectionToggle('main')}
                                 location={location}
                                 user={user}
                             />

                             <CollapsibleSection
                                 title="Community"
                                 items={communityNavItems}
                                 isOpen={openSections.community}
                                 onToggle={() => handleSectionToggle('community')}
                                 location={location}
                                 user={user}
                             />

                             <CollapsibleSection
                                 title="Resources"
                                 items={resourcesNavItems}
                                 isOpen={openSections.resources}
                                 onToggle={() => handleSectionToggle('resources')}
                                 location={location}
                                 user={user}
                             />

                             {adminNavItems.length > 0 && (
                                <CollapsibleSection
                                    title="Admin"
                                    items={adminNavItems}
                                    isOpen={openSections.admin}
                                    onToggle={() => handleSectionToggle('admin')}
                                    location={location}
                                    user={user}
                                />
                             )}
                        </nav>
                    </div>
                    <div className="p-4 border-t border-gray-800">
                        <button onClick={handleLogout} className="flex items-center space-x-3 text-sm w-full py-2 px-3 rounded-md hover:bg-gray-700">
                            <LogOut className="w-5 h-5 text-gray-400" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="lg:hidden h-16 bg-black text-white flex justify-between items-center px-4 border-b border-gray-800">
                    <span className="font-bold">The Launchpad</span>
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 relative overflow-y-auto">
                    <FirstMemberNotification/>
                    <div className="hidden lg:flex justify-end items-center p-4 space-x-4 absolute top-0 right-0">
                        <ThemeProvider />
                        <div ref={notificationRef} className="relative">
                            <button onClick={() => setShowNotificationDropdown(!showNotificationDropdown)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Bell className="w-5 h-5 text-gray-900 dark:text-white" />
                            </button>
                            {showNotificationDropdown && <NotificationDropdown />}
                        </div>
                    </div>
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none py-6 pb-24 lg:pb-6">
                        <div style={{
                            backgroundColor: 'var(--background-main)',
                            minHeight: '100%',
                            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            <style>{`
                            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&family=Inter:wght@400;500;600;700&display=swap');

                            :root {
                              --primary-gold: #8B6F4E;
                              --background-main: #FFFFFF;
                              --background-card: #FFFFFF;
                              --text-main: #1F2937;
                              --text-soft: #6B7280;
                              --border-color: #E5E7EB;
                              --radius: 5px;
                            }

                            .dark {
                              --background-main: #000000;
                              --background-card: #1E293B;
                              --text-main: #F8FAFC;
                              --text-soft: #94A3B8;
                              --border-color: #334155;
                            }

                            body {
                              background-color: var(--background-main);
                              color: var(--text-main);
                              transition: background-color 0.3s ease, color 0.3s ease;
                            }

                            h1 {
                              font-family: 'Poppins', sans-serif;
                              font-weight: 900;
                              color: var(--text-main);
                            }

                            header h1 {
                               font-family: 'Poppins', sans-serif;
                               font-weight: 900;
                               color: #FFFFFF;
                            }

                            .card {
                              background-color: var(--background-card);
                              border-radius: var(--radius);
                              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                              border: 1px solid var(--border-color);
                              transition: background-color 0.3s ease, border-color 0.3s ease;
                            }

                            .dark .card {
                              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                            }

                            .btn {
                              border-radius: var(--radius);
                              transition: all 0.2s ease;
                              cursor: pointer;
                              font-weight: 500;
                              padding: 0.5rem 1rem;
                              display: inline-flex;
                              align-items: center;
                              gap: 0.5rem;
                              border: 1px solid transparent;
                            }

                            .btn-primary {
                              background-color: var(--primary-gold);
                              color: white;
                            }
                            .btn-primary:hover {
                              opacity: 0.9;
                            }

                            .btn-secondary {
                              background-color: var(--background-card);
                              color: var(--primary-gold);
                              border-color: var(--primary-gold);
                            }
                            .btn-secondary:hover {
                              background-color: var(--primary-gold);
                              color: white;
                            }

                            .btn-ghost {
                              background-color: transparent;
                              color: var(--text-soft);
                            }
                            .btn-ghost:hover {
                              background-color: rgba(243, 244, 246, 0.5);
                              color: var(--text-main);
                            }

                            .dark .btn-ghost:hover {
                              background-color: rgba(55, 65, 81, 0.5);
                            }

                            .form-input {
                              background-color: var(--background-card);
                              border-radius: var(--radius);
                              border: 1px solid var(--border-color);
                              padding: 0.75rem 1rem;
                              width: 100%;
                              color: var(--text-main);
                              transition: border-color 0.2s ease, background-color 0.2s ease;
                            }
                            .form-input:focus {
                              outline: none;
                              border-color: var(--primary-gold);
                              box-shadow: 0 0 0 2px rgba(139, 111, 78, 0.2);
                            }

                            .dark h1,
                            .dark h2,
                            .dark h3,
                            .dark h4,
                            .dark h5,
                            .dark h6 {
                              color: var(--text-main) !important;
                            }

                            .dark p,
                            .dark span,
                            .dark div {
                              color: var(--text-main);
                            }

                            /* Dark mode utility classes */
                            .dark .bg-white {
                              background-color: var(--background-card) !important;
                            }

                            .dark .bg-gray-50 {
                              background-color: #1E293B !important;
                            }

                            .dark .bg-gray-100 {
                              background-color: #334155 !important;
                            }

                            .dark .bg-blue-50 {
                              background-color: rgba(59, 130, 246, 0.1) !important;
                            }

                            .dark .bg-green-50 {
                              background-color: rgba(34, 197, 94, 0.1) !important;
                            }

                            .dark .bg-yellow-50 {
                              background-color: rgba(234, 179, 8, 0.1) !important;
                            }

                            .dark .bg-red-50 {
                              background-color: rgba(239, 68, 68, 0.1) !important;
                            }

                            .dark .bg-indigo-50 {
                              background-color: rgba(99, 102, 241, 0.1) !important;
                            }

                            .dark .bg-purple-50 {
                              background-color: rgba(168, 85, 247, 0.1) !important;
                            }

                            .dark .bg-pink-50 {
                              background-color: rgba(236, 72, 153, 0.1) !important;
                            }

                            .dark .text-gray-500 {
                              color: var(--text-soft) !important;
                            }

                            .dark .text-gray-600 {
                              color: var(--text-soft) !important;
                            }

                            .dark .text-gray-700 {
                              color: var(--text-main) !important;
                            }

                            .dark .text-gray-800 {
                              color: var(--text-main) !important;
                            }

                            .dark .text-gray-900 {
                              color: var(--text-main) !important;
                            }

                            .dark .border-gray-200 {
                              border-color: var(--border-color) !important;
                            }

                            .dark .border-gray-300 {
                              border-color: var(--border-color) !important;
                            }

                            /* PWA Safe Areas */
                            @supports(padding: max(0px)) {
                              .safe-top {
                                padding-top: max(env(safe-area-inset-top), 0px);
                              }
                              .safe-bottom {
                                padding-bottom: max(env(safe-area-inset-bottom), 0px);
                              }
                              .safe-left {
                                padding-left: max(env(safe-area-inset-left), 0px);
                              }
                              .safe-right {
                                padding-right: max(env(safe-area-inset-right), 0px);
                              }
                            }

                            /* Performance optimizations */
                            * {
                              -webkit-tap-highlight-color: transparent;
                            }

                            img {
                              content-visibility: auto;
                            }

                            .page-transition {
                              animation: pageSlide 0.3s ease-out;
                            }
                          `}</style>

                            <div className="page-transition">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            
                <MobileBottomNav user={user} />
            </div>

            {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} user={user} />}
            <PodcastModal isOpen={isPodcastModalOpen} onClose={() => setIsPodcastModalOpen(false)} />
            <ElyzetChatModal isOpen={isElyzetModalOpen} onClose={() => setIsElyzetModalOpen(false)} />
            
            <button
                onClick={() => setIsElyzetModalOpen(true)}
                className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 bg-[var(--primary-gold)] text-white p-3 rounded-full shadow-lg z-[60] flex items-center space-x-2 hover:bg-opacity-90 hover:scale-105 transition-all duration-200"
                title="Ask Elyzet AI"
            >
                <Sparkles className="w-6 h-6" />
                <span className="hidden lg:inline text-sm font-semibold pr-2">Ask Elyzet</span>
            </button>
        </div>
    );
}
