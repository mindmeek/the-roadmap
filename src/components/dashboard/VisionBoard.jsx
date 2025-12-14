import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Target, Rocket, Award, Lightbulb, Edit2, Check, X } from 'lucide-react';
import { User } from '@/entities/User';
import { toast } from 'sonner';

export default function VisionBoard({ user, annualPlan, onUpdateUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        five_year_vision: user?.five_year_vision || '',
        one_year_goal: user?.one_year_goal || ''
    });

    if (!user) return null;

    const handleSave = async () => {
        try {
            await User.updateMyUserData({
                five_year_vision: editForm.five_year_vision,
                one_year_goal: editForm.one_year_goal
            });
            setIsEditing(false);
            if (onUpdateUser) {
                onUpdateUser({
                    ...user,
                    five_year_vision: editForm.five_year_vision,
                    one_year_goal: editForm.one_year_goal
                });
            }
            toast.success("Vision updated successfully!");
        } catch (error) {
            console.error("Error updating vision:", error);
            toast.error("Failed to update vision");
        }
    };

    const fiveYearVision = user.five_year_vision || "Define your long-term vision...";
    const oneYearGoal = user.one_year_goal || "Set your primary goal for the next 12 months...";
    const ninetyDayGoal = user.selected_goal || "Choose your current 90-day focus...";
    const annualPlanTitle = annualPlan?.title || "No Annual Plan set...";
    const annualPlanVision = annualPlan?.vision_description || "Describe your annual vision...";

    return (
        <div className="card p-6 border-l-4 border-[var(--primary-gold)] h-full" style={{ borderRadius: '2px' }}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-[var(--primary-gold)]" /> Your Entrepreneurial Vision
                </h3>
                <button 
                    onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                    {isEditing ? <X className="w-4 h-4 text-gray-500" /> : <Edit2 className="w-4 h-4 text-gray-400 hover:text-[var(--primary-gold)]" />}
                </button>
            </div>
            
            <p className="text-sm text-[var(--text-soft)] mb-6">
                A concise overview of your aspirations, from long-term dreams to immediate actions.
            </p>

            <div className="space-y-6">
                {/* 5 Year Vision */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Rocket className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-lg text-[var(--text-main)]">5-Year Vision</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={editForm.five_year_vision}
                            onChange={(e) => setEditForm({...editForm, five_year_vision: e.target.value})}
                            className="form-input text-sm w-full h-24 resize-none"
                            placeholder="Where do you see yourself and your business in 5 years?"
                        />
                    ) : (
                        <p className="text-sm text-[var(--text-soft)] italic whitespace-pre-wrap">{fiveYearVision}</p>
                    )}
                </div>

                {/* Annual Plan / Vision */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-lg text-[var(--text-main)]">Annual Focus: {annualPlanTitle}</h4>
                    </div>
                    <p className="text-sm text-[var(--text-soft)] italic line-clamp-3">{annualPlanVision}</p>
                    <Link to={createPageUrl('AnnualPlanning')} className="text-xs text-[var(--primary-gold)] hover:underline mt-2 inline-block">
                        View Full Annual Plan
                    </Link>
                </div>
                
                {/* 1 Year Goal */}
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-lg text-[var(--text-main)]">1-Year Goal</h4>
                    </div>
                    {isEditing ? (
                        <textarea
                            value={editForm.one_year_goal}
                            onChange={(e) => setEditForm({...editForm, one_year_goal: e.target.value})}
                            className="form-input text-sm w-full h-20 resize-none"
                            placeholder="What is your #1 goal to achieve within the next 12 months?"
                        />
                    ) : (
                        <p className="text-sm text-[var(--text-soft)] italic whitespace-pre-wrap">{oneYearGoal}</p>
                    )}
                </div>

                {/* 90-Day Goal */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-lg text-[var(--text-main)]">Current 90-Day Goal</h4>
                    </div>
                    <p className="text-sm text-[var(--text-soft)] italic">{ninetyDayGoal}</p>
                    <Link to={createPageUrl('Journey')} className="text-xs text-[var(--primary-gold)] hover:underline mt-2 inline-block">
                        Continue Your Journey
                    </Link>
                </div>

                {isEditing && (
                    <button 
                        onClick={handleSave}
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Save Vision
                    </button>
                )}
            </div>
        </div>
    );
}