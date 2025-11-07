import React, { useState, useEffect } from 'react';
import { X, Lightbulb } from 'lucide-react';

const ProTip = ({ 
    tip, 
    storageKey, 
    showByDefault = true,
    className = "" 
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (storageKey) {
            const hasSeenTip = localStorage.getItem(`protip_${storageKey}`);
            if (!hasSeenTip && showByDefault) {
                setIsVisible(true);
            }
        } else if (showByDefault) {
            setIsVisible(true);
        }
    }, [storageKey, showByDefault]);

    const handleDismiss = () => {
        setIsVisible(false);
        if (storageKey) {
            localStorage.setItem(`protip_${storageKey}`, 'seen');
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6 ${className}`}>
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-md flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>💡 Pro Tip:</strong> {tip}
                    </p>
                </div>
                {storageKey && (
                    <button 
                        onClick={handleDismiss}
                        className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 flex-shrink-0"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProTip;