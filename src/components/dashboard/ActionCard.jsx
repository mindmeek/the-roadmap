import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const ActionCard = ({ icon, title, description, link, color }) => {
    const Icon = icon;

    return (
        <Link
            to={createPageUrl(link)}
            className="card p-4 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden min-h-[160px] sm:min-h-[180px] hover:shadow-lg transition-all group"
            style={{ borderRadius: '2px' }}
        >
            {/* Background overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
            
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-md bg-gradient-to-r ${color}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg text-[var(--text-main)]">{title}</h3>
                </div>
                <p className="text-[var(--text-soft)] mb-4 text-sm">{description}</p>
            </div>
            <div className="relative z-10 flex items-center text-[var(--primary-gold)] text-sm font-medium group-hover:gap-2 transition-all">
                Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
};

export default ActionCard;