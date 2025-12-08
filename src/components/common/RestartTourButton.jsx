import React, { useState } from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { User } from '@/entities/User';

export default function RestartTourButton({ tourKey, className = "", variant = "ghost" }) {
    const [loading, setLoading] = useState(false);

    const handleRestart = async () => {
        if (!tourKey) return;
        setLoading(true);
        try {
            const user = await User.me();
            const currentTours = user.completed_tours || [];
            
            // Remove the key if it exists
            if (currentTours.includes(tourKey)) {
                const newTours = currentTours.filter(t => t !== tourKey);
                await base44.auth.updateMe({ completed_tours: newTours });
                
                // Also handle legacy 'tour_completed' flag for dashboard to ensure compatibility
                if (tourKey === 'dashboard') {
                    await base44.auth.updateMe({ tour_completed: false });
                }
            }
            
            // Reload to trigger the tour in Layout
            window.location.reload();
        } catch (error) {
            console.error("Failed to restart tour", error);
            setLoading(false);
        }
    };

    const btnClass = variant === "ghost" 
        ? `btn btn-ghost btn-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] ${className}`
        : `btn btn-secondary btn-sm ${className}`;

    return (
        <button 
            onClick={handleRestart}
            disabled={loading}
            className={btnClass}
            title="Start Guided Tour"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <HelpCircle className="w-4 h-4 mr-2" />}
            <span className="hidden sm:inline">Tour</span>
        </button>
    );
}