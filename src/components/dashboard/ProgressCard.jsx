import React from 'react';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';

const ProgressCard = ({ icon, title, subtitle, value, label, progress, footerText }) => {
    const Icon = icon;
    
    return (
        <div className="card p-4 sm:p-6 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                        <Icon className="w-6 h-6 text-[var(--primary-gold)]" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-base text-[var(--text-main)]">{title}</h3>
                        <p className="text-sm text-[var(--text-soft)]">{subtitle}</p>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-[var(--primary-gold)]">{value}</span>
                        {label && <span className="text-sm text-[var(--text-soft)]">{label}</span>}
                    </div>
                    {progress !== undefined && (
                        <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full transition-all duration-500"
                                style={{ width: `${progress}%`, backgroundColor: 'var(--primary-gold)' }}
                            />
                        </div>
                    )}
                    {progress === undefined && (
                        <div className="flex items-center space-x-2 text-sm text-[var(--text-soft)]">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{footerText || 'Keep it going!'}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;