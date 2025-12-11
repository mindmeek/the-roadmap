import React from 'react';
import { CheckCircle, ArrowRight, User, Eye, Search, ShoppingCart, HeartHandshake, Trophy } from 'lucide-react';

const icons = {
    persona: User,
    awareness: Eye,
    consideration: Search,
    decision: ShoppingCart,
    service: HeartHandshake,
    loyalty: Trophy
};

const colors = {
    persona: 'bg-blue-500',
    awareness: 'bg-purple-500',
    consideration: 'bg-green-500',
    decision: 'bg-yellow-500',
    service: 'bg-orange-500',
    loyalty: 'bg-red-500'
};

const textColors = {
    persona: 'text-blue-600',
    awareness: 'text-purple-600',
    consideration: 'text-green-600',
    decision: 'text-yellow-600',
    service: 'text-orange-600',
    loyalty: 'text-red-600'
};

export default function CustomerJourneyMap({ formData, stages }) {
    // Filter out stages that have a selected pathway (plus persona)
    const activeStages = stages.filter(stage => 
        stage.id === 'persona' || (formData[stage.id] && formData[stage.id].selected_pathway)
    );

    return (
        <div className="w-full overflow-x-auto py-8 px-4">
            <div className="min-w-[800px] max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[var(--text-main)]">Your Customer Journey Map</h2>
                    <p className="text-[var(--text-soft)] mt-2">The complete path from stranger to raving fan.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0 hidden md:block"></div>

                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-8 relative z-10">
                        {activeStages.map((stage, index) => {
                            const Icon = icons[stage.id] || User;
                            const isPersona = stage.id === 'persona';
                            const pathwayId = !isPersona ? formData[stage.id]?.selected_pathway : null;
                            const pathway = !isPersona ? stage.pathways.find(p => p.id === pathwayId) : null;
                            const data = isPersona ? formData.persona : formData[stage.id]?.pathway_data;

                            return (
                                <div key={stage.id} className="flex-1 min-w-[200px] flex flex-col group">
                                    {/* Icon Bubble */}
                                    <div className={`w-16 h-16 rounded-full ${colors[stage.id]} text-white flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform group-hover:scale-110 border-4 border-white dark:border-gray-900 relative`}>
                                        <Icon className="w-8 h-8" />
                                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm text-xs font-bold text-gray-400 border border-gray-200 dark:border-gray-700">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-5 flex-1 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1">
                                        <div className="text-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                                            <h3 className={`uppercase tracking-wider text-xs font-bold ${textColors[stage.id]} mb-1`}>{stage.title}</h3>
                                            <p className="font-bold text-[var(--text-main)] text-lg leading-tight">
                                                {isPersona ? (data.name || 'Ideal Client') : (pathway?.title || 'Strategy Selected')}
                                            </p>
                                        </div>

                                        <div className="space-y-3 flex-1">
                                            {isPersona ? (
                                                <div className="text-sm text-[var(--text-soft)] space-y-2">
                                                    <p><span className="font-semibold text-[var(--text-main)]">Age:</span> {data.age_range || '-'}</p>
                                                    <p><span className="font-semibold text-[var(--text-main)]">Occupation:</span> {data.occupation || '-'}</p>
                                                    <p><span className="font-semibold text-[var(--text-main)]">Main Goal:</span> {data.goals?.[0] || '-'}</p>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-[var(--text-soft)]">
                                                    {pathway?.formFields?.slice(0, 2).map(field => (
                                                        <div key={field.id} className="mb-2">
                                                            <p className="font-semibold text-[var(--text-main)] text-xs mb-0.5">{field.label.split('?')[0]}?</p>
                                                            <p className="line-clamp-2 italic opacity-90">{data?.[field.id] || 'Pending...'}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {!isPersona && data?.implementation_plan && (
                                            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                                                <p className="text-xs font-bold text-[var(--text-main)] mb-2 flex items-center">
                                                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                                                    Key Action
                                                </p>
                                                <p className="text-xs text-[var(--text-soft)] line-clamp-2">
                                                    {data.implementation_plan[0]}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Arrow for mobile flow */}
                                    <div className="md:hidden text-center py-4 text-gray-300">
                                        <ArrowRight className="w-6 h-6 mx-auto transform rotate-90" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}