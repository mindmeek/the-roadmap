import React, { useState, useEffect } from 'react';
import ReactJoyride, { STATUS } from 'react-joyride';
import { base44 } from '@/api/base44Client';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TourGuide({ user }) {
    const [run, setRun] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Only run if user is logged in, onboarding is done, and tour is NOT completed
        // And we are on the dashboard
        if (user && user.onboarding_completed && !user.tour_completed && location.pathname === createPageUrl('Dashboard')) {
            // Add a small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                setRun(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [user, location]);

    const steps = [
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
    ];

    const handleJoyrideCallback = async (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRun(false);
            try {
                await base44.auth.updateMe({ tour_completed: true });
            } catch (error) {
                console.error("Failed to update tour status", error);
            }
        }
    };

    if (!run) return null;

    return (
        <ReactJoyride
            steps={steps}
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
        />
    );
}