import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, AccountabilityPartner, DailyProgress, PartnershipCheckIn } from '@/entities/all';
import { createPageUrl } from '@/utils';
import { 
    Loader2, ShieldCheck, ArrowLeft, CheckCircle, Target, TrendingUp, 
    Calendar, Clock, MessageSquare, Star, AlertCircle, Users
} from 'lucide-react';
import { format, subDays, isToday } from 'date-fns';

const ProgressCard = ({ user, progress, streak, avgProgress }) => {
    const todaysProgress = progress.find(p => isToday(new Date(p.date)));
    const yesterdaysProgress = progress.find(p => {
        const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
        return p.date === yesterday;
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <img 
                    src={user.profile_picture_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}`} 
                    alt={user.full_name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-bold text-[var(--text-main)]">{user.full_name}</h3>
                    <p className="text-sm text-[var(--text-soft)]">{user.entrepreneurship_stage || 'Entrepreneur'}</p>
                </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--primary-gold)]">{streak}</div>
                    <div className="text-xs text-[var(--text-soft)]">Day Streak</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{avgProgress}%</div>
                    <div className="text-xs text-[var(--text-soft)]">Avg Progress</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{progress.length}</div>
                    <div className="text-xs text-[var(--text-soft)]">Days Tracked</div>
                </div>
            </div>

            {/* Today's Progress */}
            {todaysProgress ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-200">Today: {todaysProgress.progress_percentage}% Progress</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">{todaysProgress.reflection}</p>
                    {todaysProgress.key_actions && todaysProgress.key_actions.length > 0 && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                            <strong>Key Actions:</strong> {todaysProgress.key_actions.join(', ')}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4 text-center">
                    <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-[var(--text-soft)]">No progress tracked today yet</p>
                </div>
            )}

            {/* Tomorrow's Focus from Yesterday */}
            {yesterdaysProgress?.tomorrow_focus_tasks && yesterdaysProgress.tomorrow_focus_tasks.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-800 dark:text-blue-200">Today's Planned Priorities:</span>
                    </div>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {yesterdaysProgress.tomorrow_focus_tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">{i + 1}.</span>
                                <span>{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const CheckInSection = ({ partnership, currentUser, todayCheckins, onCheckIn, checkingIn }) => {
    const [checkInNotes, setCheckInNotes] = useState('');
    
    const currentUserCheckedIn = todayCheckins.some(c => c.checker_user_email === currentUser.email);
    const partnerCheckedIn = todayCheckins.some(c => c.checker_user_email !== currentUser.email);
    
    const handleCheckIn = async () => {
        await onCheckIn(checkInNotes);
        setCheckInNotes('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-[var(--primary-gold)]" />
                <h3 className="text-xl font-bold text-[var(--text-main)]">Daily Check-In</h3>
                <span className="text-sm text-[var(--text-soft)]">{format(new Date(), 'MMM d, yyyy')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`text-center p-4 rounded-lg border ${currentUserCheckedIn ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'}`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${currentUserCheckedIn ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {currentUserCheckedIn ? <CheckCircle className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-white" />}
                    </div>
                    <p className="font-semibold text-[var(--text-main)]">You</p>
                    <p className={`text-sm ${currentUserCheckedIn ? 'text-green-600' : 'text-[var(--text-soft)]'}`}>
                        {currentUserCheckedIn ? 'Checked In!' : 'Pending'}
                    </p>
                </div>
                
                <div className={`text-center p-4 rounded-lg border ${partnerCheckedIn ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'}`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${partnerCheckedIn ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {partnerCheckedIn ? <CheckCircle className="w-5 h-5 text-white" /> : <Clock className="w-5 h-5 text-white" />}
                    </div>
                    <p className="font-semibold text-[var(--text-main)]">Partner</p>
                    <p className={`text-sm ${partnerCheckedIn ? 'text-green-600' : 'text-[var(--text-soft)]'}`}>
                        {partnerCheckedIn ? 'Checked In!' : 'Pending'}
                    </p>
                </div>
            </div>

            {!currentUserCheckedIn && (
                <div className="space-y-3">
                    <textarea
                        value={checkInNotes}
                        onChange={(e) => setCheckInNotes(e.target.value)}
                        placeholder="Optional: Add a note about your progress today..."
                        className="form-input w-full h-20 resize-none"
                    />
                    <button
                        onClick={handleCheckIn}
                        disabled={checkingIn}
                        className="btn btn-primary w-full"
                    >
                        {checkingIn ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                        {checkingIn ? 'Checking In...' : 'Check In for Today'}
                    </button>
                </div>
            )}

            {currentUserCheckedIn && partnerCheckedIn && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="font-semibold text-green-800 dark:text-green-200">Great job! Both partners checked in today! 🎉</p>
                </div>
            )}
        </div>
    );
};

export default function PartnershipDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [checkingIn, setCheckingIn] = useState(false);
    const [error, setError] = useState(null);
    const [partnership, setPartnership] = useState(null);
    const [partner, setPartner] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userProgress, setUserProgress] = useState([]);
    const [partnerProgress, setPartnerProgress] = useState([]);
    const [todayCheckins, setTodayCheckins] = useState([]);

    const calculateStreak = (progressData) => {
        if (!progressData.length) return 0;
        
        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < 30; i++) {
            const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
            const hasProgress = progressData.some(p => p.date === checkDate);
            
            if (hasProgress) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };

    const loadPartnershipData = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams(location.search);
            const partnershipId = params.get('id');

            if (!partnershipId) {
                setError("No partnership ID provided.");
                setLoading(false);
                return;
            }

            const me = await User.me();
            setCurrentUser(me);

            const fetchedPartnership = await AccountabilityPartner.get(partnershipId);

            if (!fetchedPartnership || (fetchedPartnership.requester_email !== me.email && fetchedPartnership.recipient_email !== me.email)) {
                setError("Partnership not found or you do not have access.");
                setLoading(false);
                return;
            }
            setPartnership(fetchedPartnership);
            
            const partnerEmail = fetchedPartnership.requester_email === me.email
                ? fetchedPartnership.recipient_email
                : fetchedPartnership.requester_email;

            const partnerData = await User.filter({ email: partnerEmail });
            if (partnerData.length > 0) {
                setPartner(partnerData[0]);
            } else {
                setError("Could not load partner details.");
                setLoading(false);
                return;
            }

            // Load progress data for both users
            const [myProgress, theirProgress] = await Promise.all([
                DailyProgress.filter({ created_by: me.email }, '-date', 30),
                DailyProgress.filter({ created_by: partnerEmail }, '-date', 30)
            ]);

            setUserProgress(myProgress);
            setPartnerProgress(theirProgress);

            // Load today's check-ins
            const today = format(new Date(), 'yyyy-MM-dd');
            const todaysCheckins = await PartnershipCheckIn.filter({
                partnership_id: partnershipId,
                check_in_date: today
            });
            setTodayCheckins(todaysCheckins);

        } catch (err) {
            console.error("Error loading partnership details:", err);
            setError("Failed to load partnership details.");
        } finally {
            setLoading(false);
        }
    }, [location.search]);

    useEffect(() => {
        loadPartnershipData();
    }, [loadPartnershipData]);

    const handleCheckIn = async (notes) => {
        setCheckingIn(true);
        try {
            const today = format(new Date(), 'yyyy-MM-dd');
            await PartnershipCheckIn.create({
                partnership_id: partnership.id,
                checker_user_email: currentUser.email,
                check_in_date: today,
                notes: notes || ''
            });
            
            // Reload today's check-ins
            const todaysCheckins = await PartnershipCheckIn.filter({
                partnership_id: partnership.id,
                check_in_date: today
            });
            setTodayCheckins(todaysCheckins);
        } catch (error) {
            console.error("Error checking in:", error);
            alert("Failed to check in. Please try again.");
        } finally {
            setCheckingIn(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
                <p className="ml-4 text-[var(--text-soft)]">Loading Partnership Dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Error</h2>
                <p className="text-[var(--text-soft)] mb-6">{error}</p>
                <button onClick={() => navigate(createPageUrl('Accountability'))} className="btn btn-primary">
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back to Accountability Hub
                </button>
            </div>
        );
    }
    
    if (!partnership || !partner) {
         return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Partnership Not Found</h2>
                 <button onClick={() => navigate(createPageUrl('Accountability'))} className="btn btn-primary">
                     <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back to Accountability Hub
                </button>
            </div>
        );
    }

    const userStreak = calculateStreak(userProgress);
    const partnerStreak = calculateStreak(partnerProgress);
    const userAvgProgress = userProgress.length > 0 ? Math.round(userProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / userProgress.length) : 0;
    const partnerAvgProgress = partnerProgress.length > 0 ? Math.round(partnerProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / partnerProgress.length) : 0;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20 md:pb-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button 
                    onClick={() => navigate(createPageUrl('Accountability'))}
                    className="btn btn-ghost"
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back
                </button>
                <ShieldCheck className="w-8 h-8 text-[var(--primary-gold)]"/>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Partnership Dashboard</h1>
                    <p className="text-[var(--text-soft)]">
                        Your shared progress with <span className="font-semibold text-[var(--text-main)]">{partner.full_name}</span>
                    </p>
                </div>
            </div>

            {/* Check-In Section */}
            <div className="mb-8">
                <CheckInSection 
                    partnership={partnership}
                    currentUser={currentUser}
                    todayCheckins={todayCheckins}
                    onCheckIn={handleCheckIn}
                    checkingIn={checkingIn}
                />
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProgressCard 
                    user={currentUser} 
                    progress={userProgress} 
                    streak={userStreak} 
                    avgProgress={userAvgProgress}
                />
                <ProgressCard 
                    user={partner} 
                    progress={partnerProgress} 
                    streak={partnerStreak} 
                    avgProgress={partnerAvgProgress}
                />
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-[var(--primary-gold)]" />
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {userProgress.slice(0, 5).map((progress, i) => (
                            <div key={progress.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--primary-gold)]">{progress.progress_percentage}%</div>
                                    <div className="text-xs text-[var(--text-soft)]">{format(new Date(progress.date), 'MMM d')}</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-[var(--text-main)] mb-1">{progress.reflection}</p>
                                    {progress.key_actions && progress.key_actions.length > 0 && (
                                        <p className="text-xs text-[var(--text-soft)]">
                                            <strong>Actions:</strong> {progress.key_actions.join(', ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {userProgress.length === 0 && (
                            <p className="text-center text-[var(--text-soft)] py-8">No recent activity to show.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}