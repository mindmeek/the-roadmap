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
        <div className="w-full py-8">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[var(--text-main)]">Your Customer Journey Map</h2>
                    <p className="text-[var(--text-soft)] mt-2">The complete path from stranger to raving fan.</p>
                </div>

                <div className="space-y-6">
                    {activeStages.map((stage, index) => {
                        const Icon = icons[stage.id] || User;
                        const isPersona = stage.id === 'persona';
                        const pathwayId = !isPersona ? formData[stage.id]?.selected_pathway : null;
                        const pathway = !isPersona ? stage.pathways.find(p => p.id === pathwayId) : null;
                        const data = isPersona ? formData.persona : formData[stage.id]?.pathway_data;

                        return (
                            <div key={stage.id} className="relative">
                                {/* Stage Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all">
                                    <div className="flex items-start gap-6">
                                        {/* Icon Bubble */}
                                        <div className={`w-20 h-20 rounded-full ${colors[stage.id]} text-white flex items-center justify-center shadow-lg flex-shrink-0 relative`}>
                                            <Icon className="w-10 h-10" />
                                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm text-sm font-bold text-gray-400 border-2 border-gray-200 dark:border-gray-700">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-h-[160px] flex flex-col">
                                            <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
                                                <h3 className={`uppercase tracking-wider text-xs font-bold ${textColors[stage.id]} mb-2`}>{stage.title}</h3>
                                                <p className="font-bold text-[var(--text-main)] text-2xl">
                                                    {isPersona ? (data.name || 'Ideal Client') : (pathway?.title || 'Strategy Selected')}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                                {isPersona ? (
                                                    <div className="text-sm text-[var(--text-soft)] space-y-2 col-span-2">
                                                        <p><span className="font-semibold text-[var(--text-main)]">Age:</span> {data.age_range || '-'}</p>
                                                        <p><span className="font-semibold text-[var(--text-main)]">Occupation:</span> {data.occupation || '-'}</p>
                                                        <p><span className="font-semibold text-[var(--text-main)]">Main Goal:</span> {data.goals?.[0] || '-'}</p>
                                                        <p><span className="font-semibold text-[var(--text-main)]">Income:</span> {data.income_level || '-'}</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {pathway?.formFields?.map(field => (
                                                            <div key={field.id}>
                                                                <p className="font-semibold text-[var(--text-main)] text-sm mb-1">{field.label}</p>
                                                                <p className="text-sm text-[var(--text-soft)]">{data?.[field.id] || 'Pending...'}</p>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>

                                            {!isPersona && data?.implementation_plan && (
                                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                    <p className="text-sm font-bold text-[var(--text-main)] mb-2 flex items-center">
                                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                        Key Actions
                                                    </p>
                                                    <ul className="space-y-1">
                                                        {data.implementation_plan.slice(0, 3).map((action, i) => (
                                                            <li key={i} className="text-sm text-[var(--text-soft)] flex items-start">
                                                                <span className="mr-2 text-green-500">•</span>
                                                                {action}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Connecting Arrow */}
                                {index < activeStages.length - 1 && (
                                    <div className="flex justify-center py-4">
                                        <ArrowRight className="w-8 h-8 text-gray-300 transform rotate-90" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}