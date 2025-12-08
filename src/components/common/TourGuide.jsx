import React, { useState, useEffect } from 'react';
import ReactJoyride, { STATUS, EVENTS } from 'react-joyride';
import { base44 } from '@/api/base44Client';
import { useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TourGuide({ user }) {
    const [run, setRun] = useState(false);
    const [tourSteps, setTourSteps] = useState([]);
    const [tourKey, setTourKey] = useState(null);
    const location = useLocation();

    // Mapping of paths to tour keys and steps
    const tours = {
        'Dashboard': {
            key: 'dashboard',
            steps: [
                {
                    target: 'body',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Welcome to Business Minds! 🚀</h3>
                            <p>Let's take a quick tour to show you the key features that will help you build your empire.</p>
                        </div>
                    ),
                    placement: 'center',
                    disableBeacon: true,
                },
                {
                    target: '#dashboard-hero',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Your Command Center</h3>
                            <p>This is your main dashboard. Access your 90-Day Journey, track progress, and get AI assistance from here.</p>
                        </div>
                    ),
                    placement: 'bottom',
                },
                {
                    target: '#dashboard-daily-progress',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Track Daily Wins</h3>
                            <p>Consistency is key. Use the Daily 1% Tracker to log your tasks and build momentum every single day.</p>
                        </div>
                    ),
                    placement: 'top',
                },
                {
                    target: '#nav-item-MyBusinesses',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Manage Your Team</h3>
                            <p>Head over to "My Businesses" to manage your business profile and invite team members to collaborate.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
                {
                    target: '#nav-item-TheCommunity',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Join the Community</h3>
                            <p>Connect with fellow entrepreneurs, ask questions, and share your wins in our thriving community.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
                {
                    target: '#nav-item-FreedomCalculator',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Financial Goal</h3>
                            <p>Define your financial independence number and track your progress towards it.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
                {
                    target: '#nav-item-StrategySession',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Strategy Sessions</h3>
                            <p>Book your 1-on-1 strategy sessions to get personalized guidance for your business.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
                {
                    target: '#nav-item-MindsetHacks',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Mindset</h3>
                            <p>Access powerful mental frameworks to overcome blocks and stay focused on your goals.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
                {
                    target: '#nav-item-LiveWebinar',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Live Webinars</h3>
                            <p>Join our weekly live webinars for deep dives into business topics and Q&A.</p>
                        </div>
                    ),
                    placement: 'right',
                    spotlightPadding: 0,
                },
            ]
        },
        'DailyTrack': {
            key: 'daily_track',
            steps: [
                {
                    target: '#daily-track-header',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Daily 1% Tracker</h3>
                            <p>Track your daily tasks and measure your consistency with the 30-day streak view.</p>
                        </div>
                    ),
                    placement: 'bottom',
                    disableBeacon: true,
                },
                {
                    target: '#daily-track-tasks',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Today's Tasks</h3>
                            <p>Add tasks manually or use our AI to generate tasks based on your weekly goals.</p>
                        </div>
                    ),
                    placement: 'top',
                },
                {
                    target: '#daily-track-reflection',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Daily Reflection</h3>
                            <p>Take a moment to reflect on what went well and what can be improved.</p>
                        </div>
                    ),
                    placement: 'top',
                },
                {
                    target: '#daily-track-next-day',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Plan for Tomorrow</h3>
                            <p>Set your top 3 priorities for tomorrow to hit the ground running.</p>
                        </div>
                    ),
                    placement: 'top',
                }
            ]
        },
        'MyBusinesses': {
            key: 'my_businesses',
            steps: [
                {
                    target: '#my-businesses-header',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">My Businesses</h3>
                            <p>Here you can manage your business profiles and add new ones.</p>
                        </div>
                    ),
                    placement: 'bottom',
                    disableBeacon: true,
                },
                {
                    target: '#my-businesses-list',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Your Business Profiles</h3>
                            <p>Edit your business details and manage your team members here.</p>
                        </div>
                    ),
                    placement: 'top',
                },
                {
                    target: '#my-businesses-index',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Get Listed</h3>
                            <p>Qualify to get your business listed on The Index public directory for more exposure.</p>
                        </div>
                    ),
                    placement: 'top',
                }
            ]
        },
        'TheCommunity': {
            key: 'community',
            steps: [
                {
                    target: '#community-intro',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Community Hub</h3>
                            <p>Connect with other entrepreneurs, join live events, and get support.</p>
                        </div>
                    ),
                    placement: 'bottom',
                    disableBeacon: true,
                },
                {
                    target: '#community-embed',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Discussion Forum</h3>
                            <p>Engage in discussions right here within the platform.</p>
                        </div>
                    ),
                    placement: 'top',
                },
                {
                    target: '#community-app-download',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Go Mobile</h3>
                            <p>Download the mobile app to stay connected on the go.</p>
                        </div>
                    ),
                    placement: 'top',
                }
            ]
        },
        'Schedule': {
            key: 'schedule',
            steps: [
                {
                    target: '#schedule-header',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Daily Scheduler</h3>
                            <p>Plan your day effectively with time blocking.</p>
                        </div>
                    ),
                    placement: 'bottom',
                    disableBeacon: true,
                },
                {
                    target: '#schedule-unscheduled-tasks',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Task Pool</h3>
                            <p>Drag and drop tasks from here onto your timeline.</p>
                        </div>
                    ),
                    placement: 'right',
                },
                {
                    target: '#schedule-timeline',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Your Timeline</h3>
                            <p>Visualize your day. Click on a slot to add an activity or drag tasks here.</p>
                        </div>
                    ),
                    placement: 'left',
                },
                {
                    target: '#schedule-actions',
                    content: (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Smart Tools</h3>
                            <p>Use AI to generate a schedule or export to your calendar.</p>
                        </div>
                    ),
                    placement: 'left',
                }
            ]
        }
    };

    useEffect(() => {
        if (!user || !user.onboarding_completed) return;

        // Normalize path to match keys
        const path = location.pathname.replace('/', '') || 'Dashboard';
        const currentTour = tours[path];

        if (currentTour) {
            const completedTours = user.completed_tours || [];
            
            // Check if this specific tour has been completed
            if (!completedTours.includes(currentTour.key)) {
                setTourKey(currentTour.key);
                setTourSteps(currentTour.steps);
                
                // Slight delay to ensure DOM elements are rendered
                const timer = setTimeout(() => {
                    setRun(true);
                }, 1000);
                
                return () => clearTimeout(timer);
            }
        }
        
        // Reset if no tour for this page or already completed
        setRun(false);
        setTourSteps([]);
        setTourKey(null);

    }, [user, location.pathname]);

    const handleJoyrideCallback = async (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
            
            if (tourKey) {
                try {
                    const currentCompleted = user.completed_tours || [];
                    if (!currentCompleted.includes(tourKey)) {
                        const newCompleted = [...currentCompleted, tourKey];
                        // We update the user in the backend
                        await base44.auth.updateMe({ completed_tours: newCompleted });
                        
                        // Optimistically update the local user object if needed by parent, 
                        // but usually the layout fetches user again or we rely on the effect to not run again
                        // because the key is now in the list (although 'user' prop needs to update).
                        // Note: The parent Layout fetches user on mount. Ideally we should have a context or refetch.
                        // For now, the local state 'run' set to false prevents immediate rerun.
                        // Navigation away and back might re-trigger if user prop isn't updated.
                        // React Query or similar would be better, but for now we rely on this.
                        
                        // Also update legacy tour_completed for backward compatibility if dashboard is done
                        if (tourKey === 'dashboard') {
                             await base44.auth.updateMe({ tour_completed: true });
                        }
                    }
                } catch (error) {
                    console.error("Failed to update tour status", error);
                }
            }
        }
    };

    if (!run || tourSteps.length === 0) return null;

    return (
        <ReactJoyride
            steps={tourSteps}
            run={run}
            continuous
            showSkipButton
            showProgress
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#8B6F4E',
                    textColor: '#333',
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                },
                buttonNext: {
                    backgroundColor: '#8B6F4E',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
                buttonBack: {
                    color: '#8B6F4E',
                }
            }}
            locale={{
                last: 'Finish',
                skip: 'Skip Tour'
            }}
        />
    );
}