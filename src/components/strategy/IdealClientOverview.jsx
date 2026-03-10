import React from 'react';
import { Users, MapPin, DollarSign, Briefcase, Brain, AlertCircle, Target, Heart, TrendingUp, Sun, BookOpen, Smile } from 'lucide-react';

function Tag({ label, color = 'gold' }) {
    const colors = {
        gold: 'bg-[var(--primary-gold)] text-white',
        red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
        indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    };
    return (
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
            {label}
        </span>
    );
}

function Section({ icon: Icon, title, color, children }) {
    return (
        <div className="card p-5">
            <h4 className={`font-bold text-sm uppercase tracking-wide mb-3 flex items-center gap-2 ${color}`}>
                <Icon className="w-4 h-4" />
                {title}
            </h4>
            {children}
        </div>
    );
}

function InfoRow({ label, value }) {
    if (!value) return null;
    return (
        <div className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span className="text-xs text-[var(--text-soft)]">{label}</span>
            <span className="text-sm font-medium text-[var(--text-main)]">{value}</span>
        </div>
    );
}

function toArray(val) {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (typeof val === 'string' && val.trim()) return val.split(', ').filter(Boolean);
    return [];
}

export default function IdealClientOverview({ formData }) {
    const hasAnyData = formData.client_avatar_name || formData.age_range || formData.occupation ||
        toArray(formData.pain_points).length > 0 || toArray(formData.goals).length > 0;

    if (!hasAnyData) {
        return (
            <div className="text-center py-16 text-[var(--text-soft)]">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No Client Profile Yet</p>
                <p className="text-sm">Fill out the form and save to see your client profile here.</p>
            </div>
        );
    }

    const painPoints = toArray(formData.pain_points);
    const goals = toArray(formData.goals);
    const coreValues = toArray(formData.core_values);
    const values = toArray(formData.values);
    const interests = toArray(formData.interests);
    const personalityTraits = toArray(formData.personality_traits);

    return (
        <div className="space-y-6">
            {/* Profile Hero Card */}
            <div className="card overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />
                <div className="px-6 pb-6">
                    <div className="flex items-end gap-4 -mt-10 mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">👤</span>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-2xl font-bold text-[var(--text-main)]">
                                {formData.client_avatar_name || 'Your Ideal Client'}
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {formData.occupation && <Tag label={formData.occupation} />}
                                {formData.age_range && <Tag label={formData.age_range} color="blue" />}
                                {formData.lifestyle && <Tag label={formData.lifestyle} color="purple" />}
                            </div>
                        </div>
                    </div>

                    {formData.how_they_describe_themselves && (
                        <blockquote className="border-l-4 border-[var(--primary-gold)] pl-4 italic text-[var(--text-soft)] text-sm">
                            "{formData.how_they_describe_themselves}"
                        </blockquote>
                    )}
                </div>
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Demographics */}
                <Section icon={Users} title="Demographics" color="text-blue-600">
                    <div className="space-y-0">
                        <InfoRow label="Age Range" value={formData.age_range} />
                        <InfoRow label="Gender" value={formData.gender} />
                        <InfoRow label="Location" value={formData.location} />
                        <InfoRow label="Income Level" value={formData.income_level} />
                        <InfoRow label="Education" value={formData.education} />
                        <InfoRow label="Occupation" value={formData.occupation} />
                    </div>
                </Section>

                {/* Buying Behaviors */}
                <Section icon={TrendingUp} title="Buying Behaviors" color="text-orange-600">
                    <div className="space-y-0">
                        <InfoRow label="Researches via" value={formData.research_method} />
                        <InfoRow label="Decision Speed" value={formData.decision_speed} />
                        <InfoRow label="Price Sensitivity" value={formData.price_sensitivity} />
                        <InfoRow label="Preferred Contact" value={formData.preferred_contact} />
                    </div>
                </Section>

                {/* Pain Points */}
                {painPoints.length > 0 && (
                    <Section icon={AlertCircle} title="Pain Points" color="text-red-600">
                        <div className="flex flex-wrap gap-2">
                            {painPoints.map((p, i) => <Tag key={i} label={p} color="red" />)}
                        </div>
                    </Section>
                )}

                {/* Goals */}
                {goals.length > 0 && (
                    <Section icon={Target} title="Goals & Aspirations" color="text-green-600">
                        <div className="flex flex-wrap gap-2">
                            {goals.map((g, i) => <Tag key={i} label={g} color="green" />)}
                        </div>
                    </Section>
                )}

                {/* Core Values */}
                {(coreValues.length > 0 || values.length > 0) && (
                    <Section icon={Heart} title="Core Values" color="text-indigo-600">
                        <div className="flex flex-wrap gap-2">
                            {[...coreValues, ...values].map((v, i) => <Tag key={i} label={v} color="indigo" />)}
                        </div>
                    </Section>
                )}

                {/* Psychographics */}
                {(interests.length > 0 || personalityTraits.length > 0 || formData.lifestyle) && (
                    <Section icon={Brain} title="Psychographics" color="text-purple-600">
                        {interests.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs text-[var(--text-soft)] mb-1.5">Interests</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {interests.map((i, idx) => <Tag key={idx} label={i} color="purple" />)}
                                </div>
                            </div>
                        )}
                        {personalityTraits.length > 0 && (
                            <div>
                                <p className="text-xs text-[var(--text-soft)] mb-1.5">Personality</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {personalityTraits.map((t, i) => <Tag key={i} label={t} color="blue" />)}
                                </div>
                            </div>
                        )}
                    </Section>
                )}
            </div>

            {/* Day in the Life & Aspirations */}
            {(formData.day_in_the_life || formData.aspirations) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {formData.day_in_the_life && (
                        <Section icon={Sun} title="A Day in Their Life" color="text-yellow-600">
                            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{formData.day_in_the_life}</p>
                        </Section>
                    )}
                    {formData.aspirations && (
                        <Section icon={Smile} title="Their Aspirations" color="text-teal-600">
                            <p className="text-sm text-[var(--text-soft)] leading-relaxed">{formData.aspirations}</p>
                        </Section>
                    )}
                </div>
            )}
        </div>
    );
}