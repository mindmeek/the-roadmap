import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { User, Notification } from "@/entities/User";
import {
    Bell,
    Home,
    Users,
    Briefcase,
    Map,
    BookOpen,
    Target,
    BarChart2,
    Settings,
    HelpCircle,
    LogOut,
    ChevronDown,
    ChevronsLeft,
    ChevronsRight,
    Menu,
    X,
    Plus,
    Rocket,
    Calendar,
    Sparkles,
    Award,
    Brain, Lightbulb, UserCircle, Newspaper, Handshake, Loader2, Sun, Moon, CalendarDays, Clock, Globe, Podcast, ShieldCheck, Building, KeyRound, Palette, Video, ListChecks, TrendingUp, PiggyBank, Zap, Search, MessageSquare, ChevronRight, GripVertical, Layers, Share2, Mic, ChevronLeft, Trash2
} from "lucide-react";

// Lazy load heavy components
const WelcomePopup = lazy(() => import("@/components/common/WelcomePopup"));
const WelcomeVideoPopup = lazy(() => import("@/components/common/WelcomeVideoPopup"));
const PWAInstallPrompt = lazy(() => import("@/components/common/PWAInstallPrompt"));
const TourGuide = lazy(() => import("@/components/common/TourGuide"));
import XPToastProvider from "@/components/common/XPToast";

// Updated navigation structure with simplified grouping
const myJourneyHubItems = [
    { href: "Dashboard", icon: Home, label: "Dashboard", mobileLabel: "Dashboard" },
    { href: "Journey", icon: Target, label: "My 90-Day Journey", mobileLabel: "My Journey" },
    { href: "MyBusinessHub", icon: Briefcase, label: "Business & Marketing Hub", mobileLabel: "Business Hub" },
    { href: "MyFoundationRoadmap", icon: Layers, label: "My Foundation Roadmap", mobileLabel: "Foundation" },
    { href: "QuickStartFoundation", icon: Zap, label: "Quick Wins", mobileLabel: "Quick Wins" },
    { href: "DailyTrack", icon: BarChart2, label: "Daily 1% Tracker", mobileLabel: "Daily 1%" },
    { href: "Schedule", icon: Calendar, label: "Daily Scheduler", mobileLabel: "Schedule" },
    { href: "LiveWebinar", icon: Video, label: "The Strategy Session", mobileLabel: "Strategy" },
    { href: "ElyzetAIAssistants", icon: Sparkles, label: "Your Business Employee", mobileLabel: "AI Assistant" },
];

const learningGrowthItems = [
    { href: "LearningHub", icon: BookOpen, label: "Learning Hub", mobileLabel: "Learning" },
    { href: "RoadmapsHub", icon: Map, label: "Specialized Roadmaps", mobileLabel: "Roadmaps" },
];

const connectBuildItems = [
    { href: "TheCommunity", icon: Users, label: "Community", mobileLabel: "Community" },
    { href: "MemberOfTheMonthSubmission", icon: Award, label: "Member of the Month", mobileLabel: "MOTM" },
    { href: "ServicesHub", icon: Briefcase, label: "Done-For-You Services", mobileLabel: "Services" },
    { href: "MediaHub", icon: Podcast, label: "Audio & Media", mobileLabel: "Media" },
    { href: "Partners", icon: Handshake, label: "Partners", mobileLabel: "Partners" },
];

const myAccountItems = [
    { href: "Profile", icon: UserCircle, label: "My Profile", mobileLabel: "Profile" },
    { href: "BrandKit", icon: Palette, label: "Brand Kit", mobileLabel: "Brand Kit", requiredLevel: 'business_hq' },
    { href: "ScheduledPosts", icon: Clock, label: "Scheduled Posts", mobileLabel: "Scheduled Posts", requiredLevel: 'business_hq' },
    { href: "AIConversationHistory", icon: MessageSquare, label: "AI Conversation History", mobileLabel: "AI History" },
    { href: "DeleteAccount", icon: Trash2, label: "Delete Account", mobileLabel: "Delete Account", isAction: true },
];

const adminNavItems = [
    { href: "Admin", icon: ShieldCheck, label: "Admin Dashboard", mobileLabel: "Admin" },
    { href: "UserManagement", icon: Users, label: "User Management", mobileLabel: "Users" },
    { href: "AdminTestSystems", icon: Zap, label: "System Tests", mobileLabel: "Tests" }
];

// Searchable pages - static constant
const SEARCHABLE_PAGES = [
    { name: 'Dashboard', url: 'Dashboard', category: 'Pages', description: 'Your main dashboard and progress overview' },
    { name: 'Daily 1% Tracker', url: 'DailyTrack', category: 'Pages', description: 'Track your daily progress and tasks' },
    { name: 'Schedule', url: 'Schedule', category: 'Pages', description: 'Plan and manage your daily schedule' },
    { name: 'My Foundation Roadmap', url: 'MyFoundationRoadmap', category: 'Pages', description: 'Access strategy tools and business foundation' },
    { name: 'Quick Wins', url: 'QuickStartFoundation', category: 'Pages', description: 'Access quick business strategies and wins' },
    { name: 'Community', url: 'TheCommunity', category: 'Pages', description: 'Connect with other entrepreneurs' },
    { name: 'Learning Hub', url: 'LearningHub', category: 'Pages', description: 'Access all learning resources and courses' },
    { name: 'Specialized Roadmaps', url: 'RoadmapsHub', category: 'Pages', description: 'Focused programs and niche-specific growth roadmaps' },
    { name: 'Quick Lessons', url: 'QuickLessons', category: 'Pages', description: 'Short, actionable business lessons' },
    { name: 'Interactive Courses', url: 'InteractiveCourses', category: 'Pages', description: 'Engage with in-depth learning modules' },
    { name: 'Mindset Hacks', url: 'MindsetHacks', category: 'Pages', description: 'Mental frameworks for success' },
    { name: 'Guides', url: 'Guides', category: 'Pages', description: 'Comprehensive business guides' },
    { name: 'Focused Programs', url: 'FocusedPrograms', category: 'Pages', description: '90-day specialized programs' },
    { name: 'Niche Roadmaps', url: 'NicheRoadmaps', category: 'Pages', description: 'Industry-specific growth strategies' },
    { name: 'Magazine', url: 'Magazine', category: 'Pages', description: 'Monthly digital magazine' },
    { name: 'Member Directory', url: 'MemberDirectory', category: 'Pages', description: 'Find and connect with other members' },
    { name: 'My Businesses', url: 'MyBusinesses', category: 'Pages', description: 'Manage your business listings' },
    { name: 'Business & Marketing Hub', url: 'MyBusinessHub', category: 'Pages', description: 'Central hub for business and marketing strategies' },
    { name: 'Business Overview', url: 'BusinessOverview', category: 'Pages', description: 'Your main business information and strategic documents' },
    { name: 'Marketing Hub', url: 'MarketingOverview', category: 'Pages', description: 'Your complete marketing strategy and social plan' },
    { name: 'AI Assistants', url: 'ElyzetAIAssistants', category: 'Pages', description: 'Access AI-powered business tools' },
    { name: 'Freedom Calculator', url: 'FreedomCalculator', category: 'Pages', description: 'Calculate your financial freedom number' },
    { name: 'Strategy Session', url: 'StrategySession', category: 'Pages', description: 'Book your free strategy consultation' },
    { name: 'Journey', url: 'Journey', category: 'Pages', description: 'View your 90-day roadmap' },
    { name: 'Profile', url: 'Profile', category: 'Pages', description: 'Manage your profile and settings' },
    { name: 'The Beacon Studio', url: 'TheBeacon', category: 'Pages', description: 'Listen to exclusive entrepreneur podcasts' },
    { name: 'Be a Podcast Guest', url: 'BusinessMindsPodcastBooking', category: 'Pages', description: 'Apply to be a guest on The Business Minds Podcast' },
    { name: 'Social Media Planner', url: 'SocialMediaPlanner', category: 'Pages', description: 'Generate AI-powered 90-day social media plans' },
    { name: 'Done-For-You Services', url: 'ServicesHub', category: 'Pages', description: 'Professional marketing services and packages' },
    { name: 'Audio & Media Hub', url: 'MediaHub', category: 'Pages', description: 'Podcast studio and radio show hosting' },
];

const ElyzetChatBox = React.memo(({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-4 lg:bottom-20 lg:right-6 z-[110] w-80 h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-3 bg-black rounded-t-lg">
                <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[var(--primary-gold)] animate-pulse" />
                    <h3 className="text-sm font-semibold text-white">Ask Elyzet AI</h3>
                </div>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
            <div className="flex-1 w-full h-full overflow-hidden rounded-b-lg">
                <iframe
                    src="https://app.formwise.ai/chat/1755283560416x768948670638063600"
                    style={{
                        border: '0px #ffffff none',
                        width: '100%',
                        height: '100%',
                        borderRadius: '0 0 0.5rem 0.5rem'
                    }}
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
    );
});

const GlobalSearchModal = React.memo(({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const performSearch = useCallback(async (term) => {
        if (!term || typeof term !== 'string' || !term.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const results = [];
            const searchLower = (term || '').toLowerCase();

            const pageResults = SEARCHABLE_PAGES.filter(page => {
                const pageName = page?.name || '';
                const pageDesc = page?.description || '';
                return (
                    (typeof pageName === 'string' && pageName.toLowerCase().includes(searchLower)) ||
                    (typeof pageDesc === 'string' && pageDesc.toLowerCase().includes(searchLower))
                );
            }).map(page => ({ ...page, type: 'page' }));

            results.push(...pageResults);

            if (term && typeof term === 'string' && (searchLower.includes('track') || searchLower.includes('progress') || searchLower.includes('daily'))) {
                results.unshift({
                    name: 'Track Today\'s Progress',
                    url: 'DailyTrack',
                    category: 'Quick Action',
                    description: 'Log your daily 1% improvements',
                    type: 'action',
                    icon: Target
                });
            }

            if (term && (searchLower.includes('schedule') || searchLower.includes('plan') || searchLower.includes('calendar'))) {
                results.unshift({
                    name: 'Plan Your Day',
                    url: 'Schedule',
                    category: 'Quick Action',
                    description: 'Create your daily schedule',
                    type: 'action',
                    icon: Calendar
                });
            }

            if (term && (searchLower.includes('community') || searchLower.includes('connect') || searchLower.includes('post'))) {
                results.unshift({
                    name: 'Visit Community',
                    url: 'TheCommunity',
                    category: 'Quick Action',
                    description: 'Share updates and connect with entrepreneurs',
                    type: 'action',
                    icon: Users
                });
            }

            setSearchResults(results.slice(0, 8));
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            performSearch(searchTerm || '');
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm, performSearch]);

    const handleResultClick = (result) => {
        navigate(createPageUrl(result.url));
        onClose();
        setSearchTerm('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[120] pt-20">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl mx-4">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search pages, features, and tools..."
                            className="w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-gold)] bg-white dark:bg-gray-700 text-[var(--text-main)]"
                            autoFocus
                        />
                        <button
                            onClick={onClose}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-[var(--primary-gold)]" />
                            <span className="ml-2 text-[var(--text-soft)]">Searching...</span>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="py-2">
                            {searchResults.map((result, index) => {
                                const Icon = result.icon || (result.type === 'action' ? Zap : result.category === 'Pages' ? BookOpen : MessageSquare);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleResultClick(result)}
                                        className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                                    >
                                        <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-md mr-3">
                                            <Icon className="w-4 h-4 text-[var(--primary-gold)]" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-[var(--text-main)]">{result.name}</h4>
                                                <span className="text-xs px-2 py-1 bg-[var(--primary-gold)] text-white rounded-full">
                                                    {result.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[var(--text-soft)] mt-1">{result.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                );
                            })}
                        </div>
                    ) : searchTerm.trim() ? (
                        <div className="py-8 text-center text-[var(--text-soft)]">
                            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No results found for "{searchTerm}"</p>
                            <p className="text-sm mt-2">Try searching for pages, features, or tools</p>
                        </div>
                    ) : (
                        <div className="py-6">
                            <p className="text-center text-[var(--text-soft)] mb-4">Popular searches:</p>
                            <div className="flex flex-wrap gap-2 justify-center px-4">
                                {['Daily Tracker', 'Community', 'Strategy Tools', 'AI Assistants', 'Schedule', 'Profile'].map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => setSearchTerm(term)}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-[var(--text-main)] rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const ListenDropdown = React.memo(({ isOpen, onClose, onSelectRadio, onSelectPodcast }) => {
    const [activePlayer, setActivePlayer] = useState(null);

    if (!isOpen) return null;

    if (activePlayer === 'radio') {
        return (
            <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[120] w-96 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-sm font-semibold text-white">Equalizer Radio</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setActivePlayer(null)}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition-colors"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="h-32 overflow-hidden rounded-b-lg">
                    <iframe
                        src="//equalizer-radio6d5rde2fmrcwv.radiojar.com"
                        className="w-full h-full border-0"
                        allow="autoplay"
                        scrolling="no"
                    ></iframe>
                </div>
            </div>
        );
    }

    if (activePlayer === 'podcast') {
        return (
            <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[120] w-96 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-600 to-emerald-700 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                        <Podcast className="w-5 h-5 text-white" />
                        <h3 className="text-sm font-semibold text-white">The BM Podcast</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setActivePlayer(null)}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition-colors"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="h-[279px] overflow-hidden rounded-b-lg">
                    <iframe
                        src="https://open.spotify.com/embed/show/7JbugwNkCIO8vsTDhK1n1b/video?utm_source=generator"
                        className="w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[120] w-80 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-semibold text-white">Choose Audio Content</h3>
                </div>
                <button
                    onClick={onClose}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-1 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="p-4 space-y-3">
                <button
                    onClick={() => setActivePlayer('radio')}
                    className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                >
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-medium text-[var(--text-main)]">Equalizer Radio</h4>
                        <p className="text-xs text-[var(--text-soft)]">edifying the airwaves</p>
                    </div>
                </button>
                
                <button
                    onClick={() => setActivePlayer('podcast')}
                    className="w-full flex items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                >
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                        <Podcast className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-medium text-[var(--text-main)]">The BM Podcast</h4>
                        <p className="text-xs text-[var(--text-soft)]">Exclusive entrepreneur episodes</p>
                    </div>
                </button>
            </div>
        </div>
    );
});

const NotificationDropdown = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen]);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const user = await User.me();
            if (user && user.email) {
                const userNotifications = await Notification.filter(
                    { recipient_email: user.email },
                    '-created_date',
                    10
                );
                setNotifications(userNotifications);
            }
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleNotificationClick = async (notification) => {
        try {
            await Notification.update(notification.id, { is_read: true });

            if (notification.type === 'connection_request') {
                window.location.href = createPageUrl('Profile');
            } else if (notification.type === 'partnership_request') {
                window.location.href = createPageUrl('Accountability');
            } else if (notification.link) {
                window.location.href = notification.link;
            }

            setIsOpen(false);
            loadNotifications();
        } catch (error) {
            console.error('Error handling notification click:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={handleToggle} className="btn btn-ghost btn-circle relative text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 &&
                    <span className="absolute top-0 right-0 h-4 w-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                }
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-200 dark:border-gray-700">
                    <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-[var(--text-main)]">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center">
                                <Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400" />
                                <p className="text-sm text-[var(--text-soft)] mt-2">Loading notifications...</p>
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                >
                                    <p className="text-sm font-medium text-[var(--text-main)]">{notification.title}</p>
                                    <p className="text-sm text-[var(--text-soft)] mt-1">{notification.message}</p>
                                    <p className="text-xs text-[var(--text-soft)] mt-1">{new Date(notification.created_date).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-center text-sm text-[var(--text-soft)]">No notifications yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});

const ThemeProvider = React.memo(() => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-gray-400 hover:text-white">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
    );
});

const UserProfileSidebar = React.memo(() => {
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
        return (
            <div className="p-3 flex items-center space-x-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-700 rounded-md"></div>
                <div className="flex-1">
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2 mt-2"></div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="p-3">
            <Link to={createPageUrl('Profile')} className="flex items-center space-x-3 hover:bg-gray-800/50 p-2 rounded-md transition-colors">
                <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-md object-cover"
                    loading="lazy"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{user.full_name}</p>
                    <p className="text-xs text-gray-400">View Profile</p>
                </div>
            </Link>
        </div>
    );
});

const MobileBottomNav = React.memo(({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const mobileNavItems = [
        myJourneyHubItems.find(item => item.href === "Dashboard"),
        myJourneyHubItems.find(item => item.href === "Journey"),
        myJourneyHubItems.find(item => item.href === "Schedule"),
        connectBuildItems.find(item => item.href === "TheCommunity"),
        myAccountItems.find(item => item.href === "Profile"),
    ].filter(Boolean);

    const handleTabClick = (e, item) => {
        const isActive = location.pathname === createPageUrl(item.href);
        if (isActive) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(createPageUrl(item.href), { replace: true });
        }
    };

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 safe-bottom">
            <div className="flex justify-around items-center py-2 px-1">
                {mobileNavItems.map((item) => {
                    const isActive = location.pathname === createPageUrl(item.href);
                    const isProfile = item.href === "Profile";

                    return (
                        <Link
                            key={item.href}
                            to={createPageUrl(item.href)}
                            onClick={(e) => handleTabClick(e, item)}
                            className={`flex flex-col items-center py-2 px-2 min-w-0 flex-1 ${
                                isActive ? 'text-[var(--primary-gold)]' : 'text-gray-400'
                            }`}
                        >
                            {isProfile ? (
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                                    alt="Profile"
                                    className={`w-6 h-6 rounded-md object-cover ${isActive ? 'ring-2 ring-[var(--primary-gold)]' : ''}`}
                                    loading="lazy"
                                />
                            ) : (
                                <item.icon className="w-6 h-6" />
                            )}
                            <span className="text-xs mt-1 truncate text-center">{item.mobileLabel}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
});

const NavItem = React.memo(({ item, isExpanded, isActive, onClick, onDeleteAccount }) => {
    const IconComponent = item.icon;

    if (item.isAction && item.href === 'DeleteAccount') {
        return (
            <button
                onClick={() => onDeleteAccount && onDeleteAccount()}
                className={`group flex items-center px-2 py-2.5 text-sm font-medium rounded-md transition-all whitespace-nowrap text-red-400 hover:bg-red-900/20 hover:text-red-300 w-full ${!isExpanded ? 'justify-center' : ''}`}
                title={!isExpanded ? item.label : ''}
            >
                {IconComponent && <IconComponent className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />}
                {isExpanded && <span className="truncate">{item.label}</span>}
            </button>
        );
    }

    return (
        <Link
            to={createPageUrl(item.href)}
            onClick={onClick}
            className={`group flex items-center px-2 py-2.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                isActive
                    ? 'bg-[var(--primary-gold)] text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            } ${!isExpanded ? 'justify-center' : ''}`}
            id={`nav-item-${item.href}`}
            title={!isExpanded ? item.label : ''}
        >
            {IconComponent && <IconComponent className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'} ${isExpanded ? 'mr-3' : ''}`} />}
            {isExpanded && <span className="truncate">{item.label}</span>}
        </Link>
    );
});

const CollapsibleSection = React.memo(({ title, items, isExpanded, isOpen, onToggle, location, onItemClick, user, onDeleteAccount }) => {
    const filteredItems = items.filter(item => {
        if (item.requiredLevel) {
            return user && user.subscription_level === item.requiredLevel;
        }
        return true;
    });

    if (filteredItems.length === 0) return null;

    return (
        <div className="mb-3">
            {isExpanded && (
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider bg-gray-800/50 hover:bg-gray-800 rounded-md transition-colors"
                >
                    <span>{title}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>
            )}
            {!isExpanded && (
                <div className="h-px bg-gray-800 mx-2 mb-2"></div>
            )}
            {(!isExpanded || isOpen) && (
                <div className={`space-y-1 ${isExpanded ? 'mt-1' : ''}`}>
                    {filteredItems.map((item) => (
                        <NavItem
                            key={item.href}
                            item={item}
                            isExpanded={isExpanded}
                            isActive={location.pathname === createPageUrl(item.href)}
                            onClick={onItemClick}
                            onDeleteAccount={onDeleteAccount}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

const SidebarContent = React.memo(({ user, isExpanded, onCloseMobileMenu, setIsListenDropdownOpen, onDeleteAccount }) => {
    const location = useLocation();
    const [openSections, setOpenSections] = useState({
        myJourney: isExpanded,
        learning: false,
        connect: false,
        account: false,
        admin: false,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="flex-1 flex flex-col pt-3 pb-4 overflow-y-auto overflow-x-hidden">
            <div className="flex-1 px-2 space-y-2">
                <CollapsibleSection
                    title="My Journey Hub"
                    items={myJourneyHubItems}
                    isExpanded={isExpanded}
                    isOpen={openSections.myJourney}
                    onToggle={() => toggleSection('myJourney')}
                    location={location}
                    onItemClick={onCloseMobileMenu}
                    user={user}
                />

                <CollapsibleSection
                    title="Learning & Growth"
                    items={learningGrowthItems}
                    isExpanded={isExpanded}
                    isOpen={openSections.learning}
                    onToggle={() => toggleSection('learning')}
                    location={location}
                    onItemClick={onCloseMobileMenu}
                    user={user}
                />

                <CollapsibleSection
                    title="Connect & Build"
                    items={connectBuildItems}
                    isExpanded={isExpanded}
                    isOpen={openSections.connect}
                    onToggle={() => toggleSection('connect')}
                    location={location}
                    onItemClick={onCloseMobileMenu}
                    user={user}
                />

                {user && user.role === 'admin' && (
                    <CollapsibleSection
                        title="Admin"
                        items={adminNavItems}
                        isExpanded={isExpanded}
                        isOpen={openSections.admin}
                        onToggle={() => toggleSection('admin')}
                        location={location}
                        onItemClick={onCloseMobileMenu}
                        user={user}
                    />
                )}

                <CollapsibleSection
                    title="My Account"
                    items={myAccountItems}
                    isExpanded={isExpanded}
                    isOpen={openSections.account}
                    onToggle={() => toggleSection('account')}
                    location={location}
                    onItemClick={onCloseMobileMenu}
                    user={user}
                    onDeleteAccount={onDeleteAccount}
                />

                {/* Upgrade CTA - Only for free users - MORE PROMINENT */}
                {user && user.subscription_level === 'free' && (
                    <div className="pt-2 border-t border-gray-800">
                        <Link
                            to={createPageUrl('Upgrade')}
                            onClick={onCloseMobileMenu}
                            className={`group flex items-center justify-center px-2 py-2.5 text-sm font-bold rounded-md text-white bg-gradient-to-br from-[var(--primary-gold)] via-yellow-600 to-yellow-500 hover:shadow-lg transition-all duration-300`}
                            title={!isExpanded ? 'Upgrade to The HQ' : ''}
                        >
                            <Rocket className={`h-5 w-5 ${isExpanded ? 'mr-2' : ''}`} />
                            {isExpanded && <span className="truncate">Upgrade to The HQ</span>}
                        </Link>
                    </div>
                )}

                {/* HQ Login Button */}
                <div className="pt-1">
                    <a
                        href="https://app.thebminds.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors ${isExpanded ? '' : 'justify-center'}`}
                        title={!isExpanded ? 'The HQ Login' : ''}
                    >
                        <Globe className={`h-5 w-5 ${isExpanded ? 'mr-2' : ''}`} />
                        {isExpanded && <span className="truncate">The HQ Login</span>}
                    </a>
                </div>

                {/* Podcast & Radio Button */}
                <div className="pt-1">
                    <button
                        onClick={() => {
                            setIsListenDropdownOpen(true);
                            onCloseMobileMenu();
                        }}
                        className={`group flex items-center px-2 py-2.5 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-[var(--primary-gold)] w-full transition-colors ${isExpanded ? '' : 'justify-center'}`}
                        title={!isExpanded ? 'Podcast & Radio' : ''}
                    >
                        <svg className={`h-5 w-5 ${isExpanded ? 'mr-2' : ''} group-hover:text-[var(--primary-gold)]`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                        </svg>
                        {isExpanded && <span className="truncate">Podcast & Radio</span>}
                    </button>
                </div>
            </div>
        </div>
    );
});

const MobileMenu = React.memo(({ onClose, user, setIsListenDropdownOpen, onDeleteAccount }) => {
    const location = useLocation();

    const filterNavItems = (items) => {
        return items.filter(item => {
            if (item.requiredLevel) {
                return user && user.subscription_level === item.requiredLevel;
            }
            return true;
        });
    };

    return (
        <>
            <div className="lg:hidden fixed inset-0 flex z-50 safe-top safe-bottom">
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black">
                    <div className="absolute top-0 right-0 -mr-12 pt-2 safe-top">
                        <button
                            onClick={onClose}
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Close sidebar</span>
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto bg-black">
                        <div className="flex-shrink-0 flex items-center justify-center px-4 pb-4">
                            <Link to={createPageUrl("Dashboard")} onClick={onClose}>
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688e3deef052dd144c001643/ebdea9911_THEHQLOGO1200x330pxfdf.png"
                                    alt="The Roadmap"
                                    className="h-12 w-auto max-w-[200px] object-contain"
                                    loading="lazy"
                                />
                            </Link>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-6">
                            <div>
                                <h3 className="px-3 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider mb-2">My Journey Hub</h3>
                                <div className="space-y-1">
                                    {filterNavItems(myJourneyHubItems).map((item) => (
                                        <Link
                                            key={item.href}
                                            to={createPageUrl(item.href)}
                                            onClick={onClose}
                                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)]"
                                        >
                                            <item.icon className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                            {item.mobileLabel}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="px-3 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider mb-2">Learning & Growth</h3>
                                <div className="space-y-1">
                                    {filterNavItems(learningGrowthItems).map((item) => (
                                        <Link
                                            key={item.href}
                                            to={createPageUrl(item.href)}
                                            onClick={onClose}
                                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)]"
                                        >
                                            <item.icon className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                            {item.mobileLabel}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="px-3 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider mb-2">Connect & Build</h3>
                                <div className="space-y-1">
                                    {filterNavItems(connectBuildItems).map((item) => (
                                        <Link
                                            key={item.href}
                                            to={createPageUrl(item.href)}
                                            onClick={onClose}
                                            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)]"
                                        >
                                            <item.icon className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                            {item.mobileLabel}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {user && user.role === 'admin' && (
                                <div>
                                    <h3 className="px-3 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider mb-2">Admin</h3>
                                    <div className="space-y-1">
                                        {filterNavItems(adminNavItems).map((item) => (
                                            <Link
                                                key={item.href}
                                                to={createPageUrl(item.href)}
                                                onClick={onClose}
                                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)]"
                                            >
                                                <item.icon className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                                {item.mobileLabel}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="px-3 text-xs font-semibold text-[var(--primary-gold)] uppercase tracking-wider mb-2">My Account</h3>
                                <div className="space-y-1">
                                    {filterNavItems(myAccountItems).map((item) => (
                                        item.isAction && item.href === 'DeleteAccount' ? (
                                            <button
                                                key={item.href}
                                                onClick={() => {
                                                    onDeleteAccount();
                                                    onClose();
                                                }}
                                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-400 hover:bg-red-900/20 hover:text-red-300 w-full"
                                            >
                                                <item.icon className="mr-3 h-4 w-4" />
                                                {item.mobileLabel}
                                            </button>
                                        ) : (
                                            <Link
                                                key={item.href}
                                                to={createPageUrl(item.href)}
                                                onClick={onClose}
                                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)]"
                                            >
                                                <item.icon className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                                {item.mobileLabel}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 space-y-1 border-t border-gray-800">
                                <button
                                    onClick={() => {
                                        setIsListenDropdownOpen(true);
                                        onClose();
                                    }}
                                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-800 hover:text-[var(--primary-gold)] w-full"
                                >
                                    <svg className="mr-3 h-4 w-4 text-gray-300 group-hover:text-[var(--primary-gold)]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                                    </svg>
                                    Podcast & Radio
                                </button>
                                {user && user.subscription_level === 'free' && (
                                    <Link
                                        to={createPageUrl("Upgrade")}
                                        onClick={onClose}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 w-full"
                                    >
                                        <Rocket className="mr-3 h-4 w-4 text-white" />
                                        Upgrade to The HQ
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
});

const PullToRefresh = React.memo(({ onRefresh }) => {
    const [pullStart, setPullStart] = useState(0);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartY = 0;

        const handleTouchStart = (e) => {
            if (window.scrollY === 0) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (window.scrollY > 0 || isRefreshing) return;

            const touchY = e.touches[0].clientY;
            const distance = touchY - touchStartY;

            if (distance > 0) {
                e.preventDefault();
                setPullDistance(Math.min(distance, 100));
            }
        };

        const handleTouchEnd = async () => {
            if (pullDistance > 60 && !isRefreshing) {
                setIsRefreshing(true);
                setPullDistance(0);
                await onRefresh();
                setIsRefreshing(false);
            } else {
                setPullDistance(0);
            }
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [pullDistance, isRefreshing, onRefresh]);

    return (
        <>
            <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50">
                {(pullDistance > 0 || isRefreshing) && (
                    <div 
                        className="flex items-center justify-center bg-[var(--primary-gold)] text-white transition-all"
                        style={{ 
                            height: isRefreshing ? '50px' : `${pullDistance}px`,
                            opacity: Math.min(pullDistance / 60, 1)
                        }}
                    >
                        <Loader2 className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </div>
                )}
            </div>
        </>
    );
});

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);
    const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
    const [isListenDropdownOpen, setIsListenDropdownOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Memoize filter function
    const filterNavItems = useCallback((items) => {
        return items.filter(item => {
            if (item.requiredLevel) {
                return user && user.subscription_level === item.requiredLevel;
            }
            return true;
        });
    }, [user]);

    useEffect(() => {
        const fetchUserAndCheckOnboarding = async () => {
            try {
                const userData = await User.me();
                setUser(userData);

                if (userData && userData.onboarding_completed && !userData.welcome_popup_seen) {
                    setTimeout(() => setShowWelcomePopup(true), 500);
                }
                if (userData && userData.onboarding_completed && !userData.welcome_video_seen) {
                    setTimeout(() => setShowWelcomeVideo(true), 1500);
                }
            } catch (e) {
                // Not logged in
            }
            };
            fetchUserAndCheckOnboarding();
            }, []);

            const handleCloseWelcomePopup = async () => {
                setShowWelcomePopup(false);
                try {
                    await base44.auth.updateMe({ welcome_popup_seen: true });
                } catch (error) {
                    console.error("Failed to update welcome popup status", error);
                }
            };

            const handleDeleteAccount = () => {
                setShowDeleteModal(true);
                setIsMobileMenuOpen(false);
            };

            const confirmDeleteAccount = async () => {
                if (confirm('This action cannot be undone. All your data will be permanently deleted. Are you absolutely sure?')) {
                    try {
                        // Delete user account
                        await base44.auth.updateMe({ account_status: 'deleted' });
                        await base44.auth.logout();
                        window.location.href = '/';
                    } catch (error) {
                        console.error('Error deleting account:', error);
                        alert('Failed to delete account. Please contact support.');
                    }
                }
            };

            const handleRefresh = async () => {
                window.location.reload();
            };

    // Enhanced PWA Setup
    useEffect(() => {
        // Link to external manifest file for better performance
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = '/manifest.json';
        document.head.appendChild(manifestLink);

        // Add PWA meta tags
        const addedMetaTags = [];
        const metaTags = [
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            { name: 'apple-mobile-web-app-title', content: 'Business Minds' },
            { name: 'theme-color', content: '#8B6F4E' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'application-name', content: 'Business Minds' },
            { name: 'msapplication-TileColor', content: '#8B6F4E' },
            { name: 'msapplication-tap-highlight', content: 'no' }
        ];

        metaTags.forEach(tag => {
            const existingTag = document.querySelector(`meta[name="${tag.name}"]`);
            if (!existingTag) {
                const meta = document.createElement('meta');
                meta.name = tag.name;
                meta.content = tag.content;
                document.head.appendChild(meta);
                addedMetaTags.push(meta);
            }
        });

        // Add apple touch icons
        const appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        appleTouchIcon.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png';
        document.head.appendChild(appleTouchIcon);

        // Add favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        favicon.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png';
        document.head.appendChild(favicon);

        // Service Worker Registration for offline capability
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration);
                    })
                    .catch(err => {
                        console.log('SW registration failed:', err);
                    });
            });
        }

        return () => {
            if (manifestLink && manifestLink.parentNode) {
                manifestLink.remove();
            }
            addedMetaTags.forEach(meta => {
                if (meta && meta.parentNode) {
                    meta.remove();
                }
            });
            if (appleTouchIcon && appleTouchIcon.parentNode) {
                appleTouchIcon.remove();
            }
            if (favicon && favicon.parentNode) {
                favicon.remove();
            }
        };
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsGlobalSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setIsGlobalSearchOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen bg-white dark:bg-black overflow-hidden">
            <GlobalSearchModal isOpen={isGlobalSearchOpen} onClose={() => setIsGlobalSearchOpen(false)} />
            <XPToastProvider />
            <Suspense fallback={null}>
                <WelcomePopup isOpen={showWelcomePopup} onClose={handleCloseWelcomePopup} user={user} />
                <TourGuide user={user} />
                <PWAInstallPrompt />
            </Suspense>

            <div 
                className="hidden lg:block fixed left-0 top-0 h-screen z-40 group"
                onMouseEnter={() => setIsSidebarExpanded(true)}
                onMouseLeave={() => setIsSidebarExpanded(false)}
            >
                <div className={`flex flex-col h-full bg-black/95 backdrop-blur-sm border-r border-gray-800 shadow-2xl transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'}`}>
                    <div className="flex-shrink-0 flex items-center justify-center border-b border-gray-800 py-4">
                        <Link to={createPageUrl("Dashboard")} className="flex items-center justify-center">
                            {isSidebarExpanded ? (
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688e3deef052dd144c001643/ebdea9911_THEHQLOGO1200x330pxfdf.png"
                                    alt="The Roadmap"
                                    className="h-14 w-auto max-w-[240px] transition-all duration-300"
                                    loading="lazy"
                                />
                            ) : (
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/bb3a4dba9_SmallAppIcon.png"
                                    alt="BM"
                                    className="h-10 w-10 rounded-md transition-all duration-300"
                                    loading="lazy"
                                />
                            )}
                        </Link>
                    </div>

                    <SidebarContent
                        user={user}
                        isExpanded={isSidebarExpanded}
                        onCloseMobileMenu={() => { }}
                        setIsListenDropdownOpen={setIsListenDropdownOpen}
                        onDeleteAccount={handleDeleteAccount}
                    />

                    {isSidebarExpanded && (
                        <div className="border-t border-gray-800">
                            <UserProfileSidebar />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="bg-black sticky top-0 z-10 shadow-md safe-top">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-3">
                            <div className="flex items-center space-x-4 lg:hidden">
                                {location.pathname !== createPageUrl('Dashboard') ? (
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-800 text-white transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                ) : (
                                    <Link to={createPageUrl("Dashboard")}>
                                        <img
                                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e1535f93c_gfg8788.png"
                                            alt="Business Minds Logo"
                                            className="h-10 w-auto max-w-[150px] object-contain"
                                            loading="lazy"
                                        />
                                    </Link>
                                )}
                            </div>

                            <div className="hidden lg:flex flex-1 items-center justify-start max-w-lg mr-6">
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setIsGlobalSearchOpen(true)}
                                        className="w-full flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors"
                                        style={{ borderRadius: '3px' }}
                                    >
                                        <Search className="w-4 h-4 mr-3" />
                                        <span className="flex-1">Search platform...</span>
                                        <div className="flex items-center space-x-1 text-xs bg-gray-800 px-2 py-1" style={{ borderRadius: '3px' }}>
                                            <span>⌘</span>
                                            <span>K</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="hidden lg:flex items-center space-x-4">
                                    <Link to={createPageUrl('DailyTrack')} className="flex items-center text-sm text-white px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-colors" style={{ borderRadius: '3px' }}>
                                        <ListChecks className="h-4 w-4 mr-2" />
                                        Daily 1%
                                    </Link>
                                    <Link to={createPageUrl('Schedule')} className="flex items-center text-sm text-white px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-colors" style={{ borderRadius: '3px' }}>
                                        <Clock className="h-4 w-4 mr-2" />
                                        Schedule
                                    </Link>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsListenDropdownOpen(!isListenDropdownOpen)}
                                            className="flex items-center text-sm text-white px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-colors"
                                            style={{ borderRadius: '3px' }}
                                            title="Listen to Podcast & Radio"
                                        >
                                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.775L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.775zm2.658 4.163a3 3 0 010 5.522l-.707-.707a2 2 0 000-4.108l.707-.707zm3.292-1.292a6 6 0 010 10.106l-.707-.707a5 5 0 000-8.692l.707-.707z" clipRule="evenodd" />
                                            </svg>
                                            Podcast & Radio
                                        </button>
                                        <ListenDropdown
                                            isOpen={isListenDropdownOpen}
                                            onClose={() => setIsListenDropdownOpen(false)}
                                        />
                                    </div>
                                    <NotificationDropdown />
                                    <ThemeProvider />
                                </div>
                                <div className="lg:hidden flex items-center space-x-1">
                                    <button
                                        onClick={() => setIsGlobalSearchOpen(true)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                    >
                                        <Search className="h-5 w-5" />
                                    </button>
                                    <NotificationDropdown />
                                    <ThemeProvider />
                                    <button
                                        onClick={() => setIsMobileMenuOpen(true)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Menu className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} user={user} setIsListenDropdownOpen={setIsListenDropdownOpen} onDeleteAccount={handleDeleteAccount} />}
                </header>

                {/* Delete Account Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[130] p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                                    <Trash2 className="w-6 h-6 text-red-600" />
                                </div>
                                <h2 className="text-xl font-bold text-[var(--text-main)]">Delete Account</h2>
                            </div>
                            <p className="text-[var(--text-soft)] mb-6">
                                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-[var(--text-main)] rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteAccount}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                                >
                                    Delete Forever
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none py-6 pb-24 lg:pb-6">
                    <PullToRefresh onRefresh={handleRefresh} />
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

                        * {
                          -webkit-tap-highlight-color: transparent;
                          -webkit-touch-callout: none;
                          user-select: none;
                          -webkit-user-select: none;
                        }

                        p, span, div, h1, h2, h3, h4, h5, h6, input, textarea {
                          user-select: text;
                          -webkit-user-select: text;
                        }

                        body {
                          background-color: var(--background-main);
                          color: var(--text-main);
                          transition: background-color 0.3s ease, color 0.3s ease;
                          overscroll-behavior: none;
                          -webkit-overflow-scrolling: touch;
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

                        /* Mobile tap targets */
                        @media (max-width: 768px) {
                          button, a, .btn {
                            min-height: 44px;
                            min-width: 44px;
                          }
                        }

                        img {
                          content-visibility: auto;
                          loading: lazy;
                        }

                        /* Performance optimizations */
                        .page-transition {
                          will-change: transform;
                        }

                        /* Reduce paint areas */
                        .card {
                          contain: layout style paint;
                        }

                        @media (max-width: 768px) {
                          .dark .card {
                            background-color: var(--background-card);
                            color: var(--text-main);
                          }

                          .dark .btn-ghost {
                            color: var(--text-soft);
                          }

                          .dark .form-input {
                            background-color: var(--background-card);
                            color: var(--text-main);
                            border-color: var(--border-color);
                          }
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

                <MobileBottomNav user={user} />
            </div>
        </div>
    );
}