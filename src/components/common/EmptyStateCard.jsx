import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const EmptyStateCard = ({
    icon: Icon,
    title,
    description,
    actionText,
    actionUrl,
    actionIcon: ActionIcon = ArrowRight,
    tip,
    className = ""
}) => {
    return (
        <div className={`text-center py-12 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg ${className}`}>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full w-fit mx-auto mb-6">
                <Icon className="w-12 h-12 text-gray-400" />
            </div>
            
            <h3 className="text-xl font-semibold text-[var(--text-main)] mb-3">{title}</h3>
            <p className="text-[var(--text-soft)] mb-6 max-w-md mx-auto">{description}</p>
            
            {actionUrl && (
                <Link to={createPageUrl(actionUrl)} className="btn btn-primary mb-4">
                    {ActionIcon && <ActionIcon className="w-5 h-5 mr-2" />}
                    {actionText}
                </Link>
            )}
            
            {tip && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-4 mt-6 max-w-md mx-auto">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>💡 Pro Tip:</strong> {tip}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EmptyStateCard;