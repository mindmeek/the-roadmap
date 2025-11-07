import React, { useState } from 'react';
import { X, Share2, ExternalLink } from 'lucide-react';

const ShareWinModal = ({ 
    isOpen, 
    onClose, 
    achievement, 
    customMessage 
}) => {
    const [isSharing, setIsSharing] = useState(false);

    if (!isOpen) return null;

    const defaultMessage = customMessage || `🎉 Just achieved a milestone in my entrepreneurial journey with The Business Minds! ${achievement || 'Moving forward step by step.'} #Entrepreneurship #BusinessGrowth #TheBusinessMinds`;

    const shareUrls = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://app.thebusinessminds.com')}&summary=${encodeURIComponent(defaultMessage)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://app.thebusinessminds.com')}&quote=${encodeURIComponent(defaultMessage)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(defaultMessage)}&url=${encodeURIComponent('https://app.thebusinessminds.com')}`
    };

    const handleShare = (platform) => {
        setIsSharing(true);
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        
        // Close modal after a delay
        setTimeout(() => {
            setIsSharing(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                            <Share2 className="w-5 h-5 text-green-600 dark:text-green-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-main)]">Share Your Win!</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-[var(--text-soft)] mb-6">
                        Congratulations on your progress! Share your achievement with your network to inspire others and celebrate your success.
                    </p>

                    {/* Preview */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <p className="text-sm text-[var(--text-main)]">{defaultMessage}</p>
                    </div>

                    {/* Share Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => handleShare('linkedin')}
                            disabled={isSharing}
                            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Share on LinkedIn
                        </button>
                        
                        <button
                            onClick={() => handleShare('facebook')}
                            disabled={isSharing}
                            className="w-full flex items-center justify-center gap-3 bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Share on Facebook
                        </button>
                        
                        <button
                            onClick={() => handleShare('twitter')}
                            disabled={isSharing}
                            className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Share on X (Twitter)
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                    <button 
                        onClick={onClose}
                        className="w-full text-center text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareWinModal;