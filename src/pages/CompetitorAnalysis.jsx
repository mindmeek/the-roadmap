
import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Loader2, Save, Plus, Trash2, Users, Search, Edit3, Lightbulb } from 'lucide-react'; // Added Lightbulb
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const CompetitorCard = ({ competitor, index, onUpdate, onRemove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(competitor);

    const handleSave = () => {
        onUpdate(index, editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData(competitor);
        setIsEditing(false);
    };

    // Keep the editing state in sync with the parent competitor prop
    useEffect(() => {
        setEditData(competitor);
    }, [competitor]);

    return (
        <Draggable draggableId={competitor.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`card p-4 space-y-3 ${snapshot.isDragging ? 'opacity-75 shadow-lg' : ''}`}
                >
                    <div className="flex justify-between items-center">
                        {isEditing ? (
                            <input
                                type="text"
                                placeholder="Competitor Name"
                                value={editData.name}
                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                                className="form-input text-lg font-bold flex-1 mr-2"
                            />
                        ) : (
                            <h3 className="text-lg font-bold text-[var(--text-main)] flex-1">
                                {competitor.name || 'Competitor Name'}
                            </h3>
                        )}
                        <div className="flex space-x-2">
                            {isEditing ? (
                                <>
                                    <button onClick={handleSave} className="btn btn-primary btn-sm">
                                        <Save className="w-4 h-4" />
                                    </button>
                                    <button onClick={handleCancel} className="btn btn-secondary btn-sm">
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)} className="btn btn-ghost btn-sm">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            )}
                            <button onClick={() => onRemove(index)} className="btn btn-ghost btn-sm text-red-500">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {isEditing ? (
                        <>
                            <input 
                                type="url" 
                                placeholder="https://website.com" 
                                value={editData.website} 
                                onChange={(e) => setEditData({...editData, website: e.target.value})} 
                                className="form-input" 
                            />
                            <textarea 
                                placeholder="Products/Services offered..." 
                                value={editData.products} 
                                onChange={(e) => setEditData({...editData, products: e.target.value})} 
                                className="form-input h-20" 
                            />
                            <textarea 
                                placeholder="Strengths" 
                                value={editData.strengths} 
                                onChange={(e) => setEditData({...editData, strengths: e.target.value})} 
                                className="form-input h-20" 
                            />
                            <textarea 
                                placeholder="Weaknesses" 
                                value={editData.weaknesses} 
                                onChange={(e) => setEditData({...editData, weaknesses: e.target.value})} 
                                className="form-input h-20" 
                            />
                            <textarea 
                                placeholder="General notes..." 
                                value={editData.notes} 
                                onChange={(e) => setEditData({...editData, notes: e.target.value})} 
                                className="form-input h-20" 
                            />
                        </>
                    ) : (
                        <>
                            {competitor.website && (
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-soft)]">Website:</label>
                                    <a href={competitor.website} target="_blank" rel="noopener noreferrer" 
                                       className="text-blue-600 hover:underline block">
                                        {competitor.website}
                                    </a>
                                </div>
                            )}
                            {competitor.products && (
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-soft)]">Products/Services:</label>
                                    <p className="text-[var(--text-main)] mt-1">{competitor.products}</p>
                                </div>
                            )}
                            {competitor.strengths && (
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-soft)]">Strengths:</label>
                                    <p className="text-[var(--text-main)] mt-1">{competitor.strengths}</p>
                                </div>
                            )}
                            {competitor.weaknesses && (
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-soft)]">Weaknesses:</label>
                                    <p className="text-[var(--text-main)] mt-1">{competitor.weaknesses}</p>
                                </div>
                            )}
                            {competitor.notes && (
                                <div>
                                    <label className="text-sm font-medium text-[var(--text-soft)]">Notes:</label>
                                    <p className="text-[var(--text-main)] mt-1">{competitor.notes}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default function CompetitorAnalysisPage() { // Renamed from CompetitorAnalysis to CompetitorAnalysisPage
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = await User.me();
                setCompetitors(user.competitor_analysis?.competitors || []);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleAddCompetitor = () => {
        const newCompetitor = {
            id: crypto.randomUUID(),
            name: '',
            website: '',
            products: '',
            strengths: '',
            weaknesses: '',
            notes: ''
        };
        setCompetitors([...competitors, newCompetitor]);
    };

    const handleRemoveCompetitor = (index) => {
        setCompetitors(competitors.filter((_, i) => i !== index));
    };

    const handleUpdateCompetitor = (index, updatedCompetitor) => {
        const newCompetitors = [...competitors];
        newCompetitors[index] = updatedCompetitor;
        setCompetitors(newCompetitors);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(competitors);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCompetitors(items);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData({ 
                competitor_analysis: { competitors } 
            });
            alert("Analysis saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save analysis.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="px-4 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Detailed Introduction Section */}
                <div className="card p-6 md:p-8">
                    <div className="text-center md:text-left md:flex md:items-center md:space-x-4 w-full mb-6">
                        <div className="bg-gray-100 p-3 md:p-4 rounded-md mb-3 md:mb-0 mx-auto md:mx-0 w-fit">
                            <Users className="w-6 h-6 md:w-8 md:h-8 text-[var(--primary-gold)]" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl mb-2">Competitor Analysis</h1>
                            <p className="text-[var(--primary-gold)] font-semibold">Foundation Tool #3</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">Know Your Competition to Dominat Your Market</h3>
                        <p className="text-[var(--text-main)] leading-relaxed mb-4">
                            Your Competitor Analysis isn't about copying what others do—it's about finding the gaps they've left wide open for you to fill. By understanding your competitive landscape, you discover untapped opportunities, avoid costly mistakes others have made, and position yourself as the superior choice. This strategic intelligence transforms you from a market follower into a market leader who anticipates trends and captures opportunities before others even see them.
                        </p>
                        <p className="text-[var(--text-main)] leading-relaxed mb-4">
                            Smart entrepreneurs don't fear competition—they study it, learn from it, and then outmaneuver it. This analysis reveals what customers are already paying for, where current solutions fall short, and exactly how to position yourself as the obvious upgrade. You'll identify pricing strategies that work, marketing messages that resonate, and service gaps that represent pure gold for your business. Knowledge is power, and competitive intelligence is the ultimate business weapon.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-purple-200 dark:border-purple-600">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">How This Streamlines Your Vision:</h4>
                                <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                    <li>• Identifies proven market demand and pricing</li>
                                    <li>• Reveals gaps in competitor offerings</li>
                                    <li>• Provides ready-made marketing insights</li>
                                    <li>• Validates your unique positioning strategy</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-purple-200 dark:border-purple-600">
                                <h4 className="font-semibold text-[var(--text-main)] mb-2">Business Impact:</h4>
                                <ul className="text-sm text-[var(--text-soft)] space-y-1">
                                    <li>• Faster market entry with proven strategies</li>
                                    <li>• Higher conversion rates through differentiation</li>
                                    <li>• Reduced marketing costs by targeting gaps</li>
                                    <li>• Premium positioning based on unique value</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pro Tip: Focus on Customer Complaints</h4>
                                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                    The goldmine is in competitor reviews and customer complaints. These reveal exactly what the market wants but isn't getting. Build your solution around solving these unmet needs, and you'll have customers lining up to switch to you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button (repositioned here) */}
                <div className="flex justify-end mb-6">
                    <button 
                        onClick={handleSave} 
                        className="btn btn-primary w-full sm:w-auto" 
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5 mr-2" />
                        )}
                        Save Analysis
                    </button>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="competitors">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                            >
                                {competitors.map((competitor, index) => (
                                    <CompetitorCard
                                        key={competitor.id}
                                        competitor={competitor}
                                        index={index}
                                        onUpdate={handleUpdateCompetitor}
                                        onRemove={handleRemoveCompetitor}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <button 
                    onClick={handleAddCompetitor} 
                    className="btn btn-secondary w-full sm:w-auto"
                >
                    <Plus className="w-5 h-5 mr-2" /> 
                    Add Competitor
                </button>
            </div>
        </div>
    );
}
