import React from 'react';
import { Target, User, Briefcase, AlertCircle, Star, Zap } from 'lucide-react';

function Tag({ label, color = 'gold' }) {
    const colors = {
        gold: 'bg-[var(--primary-gold)] text-white',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    };
    return <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>{label}</span>;
}

function ListSection({ icon: Icon, title, items, color, tagColor }) {
    const filtered = (items || []).filter(i => i && i.trim());
    if (!filtered.length) return null;
    return (
        <div className="card p-5">
            <h4 className={`font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 ${color}`}>
                <Icon className="w-4 h-4" />
                {title}
            </h4>
            <div className="flex flex-wrap gap-2">
                {filtered.map((item, i) => <Tag key={i} label={item} color={tagColor} />)}
            </div>
        </div>
    );
}

export default function ValuePropositionOverview({ formData }) {
    const hasData = Object.values(formData).some(v => Array.isArray(v) && v.some(i => i && i.trim()));

    if (!hasData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Canvas Data Yet</p>
                <p className="text-sm">Fill out the form and save to see your Value Proposition Canvas here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="card overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />
                <div className="px-6 pb-6 pt-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">Value Proposition Canvas</h2>
                            <p className="text-sm text-[var(--text-soft)]">Where your solution meets your customer's needs</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Profile */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <User className="w-5 h-5 text-blue-500" />
                        <h3 className="font-bold text-blue-600 text-lg">Customer Profile</h3>
                    </div>
                    <ListSection icon={Briefcase} title="Customer Jobs" items={formData.customer_jobs} color="text-blue-600" tagColor="blue" />
                    <ListSection icon={AlertCircle} title="Pains" items={formData.pains} color="text-red-600" tagColor="red" />
                    <ListSection icon={Star} title="Gains" items={formData.gains} color="text-green-600" tagColor="green" />
                </div>

                {/* Value Map */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <h3 className="font-bold text-orange-600 text-lg">Value Map</h3>
                    </div>
                    <ListSection icon={Briefcase} title="Products & Services" items={formData.products_services} color="text-orange-600" tagColor="orange" />
                    <ListSection icon={AlertCircle} title="Pain Relievers" items={formData.pain_relievers} color="text-red-600" tagColor="red" />
                    <ListSection icon={Star} title="Gain Creators" items={formData.gain_creators} color="text-green-600" tagColor="green" />
                </div>
            </div>
        </div>
    );
}