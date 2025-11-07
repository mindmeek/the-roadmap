import React, { useState, useEffect } from 'react';
import { RoadmapContent } from '@/entities/User';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, Loader2, Save, X, HelpCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';

// Available Foundation Tool Pages that can be linked
const FOUNDATION_PAGES = [
    { value: 'StrategyFormDefineYourWhy', label: 'Define Your WHY' },
    { value: 'StrategyFormMissionVision', label: 'Mission & Vision' },
    { value: 'StrategyFormBrandIdentity', label: 'Brand Identity' },
    { value: 'StrategyFormIdealClient', label: 'Ideal Client Profile' },
    { value: 'StrategyFormValueProposition', label: 'Value Proposition' },
    { value: 'StrategyFormCustomerJourney', label: 'Customer Journey' },
    { value: 'StrategyFormValueLadder', label: 'Value Ladder' },
    { value: 'StrategyFormSWOTAnalysis', label: 'SWOT Analysis' },
    { value: 'StrategyFormBusinessModelCanvas', label: 'Business Model Canvas' },
    { value: 'FreedomCalculator', label: 'Financial Freedom Goal' },
    { value: 'StrategyFormContentStrategy', label: 'Content Strategy' },
    { value: 'StrategyFormWebsiteLaunch', label: 'Website Launch' },
    { value: 'StrategyFormEmailMarketing', label: 'Email Marketing' },
    { value: 'StrategyFormSocialMedia', label: 'Social Media Strategy' },
    { value: 'StrategyFormPricingStrategies', label: 'Pricing Strategies' },
    { value: 'StrategyFormCommunityBuilding', label: 'Community Building' },
    { value: 'StrategyFormAffiliateProgram', label: 'Affiliate Program' },
    { value: 'StrategyFormStrategicPartnerships', label: 'Strategic Partnerships' },
    { value: 'StrategyFormAutomation', label: 'Automation & Systems' },
    { value: 'MyFoundationRoadmap', label: 'Foundation Roadmap (Overview)' },
    { value: 'QuickStartFoundation', label: 'Quick Wins' },
    { value: 'DailyTrack', label: 'Daily Tracker' },
    { value: 'Schedule', label: 'Daily Scheduler' },
    { value: 'TheCommunity', label: 'Community' },
];

export default function AdminRoadmapContentPage() {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ stage: 'all', goal: 'all', month: 'all' });
    const [searchTerm, setSearchTerm] = useState('');
    const [editingContent, setEditingContent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const allContent = await RoadmapContent.filter({}, '-display_order');
            setContent(allContent);
        } catch (error) {
            console.error('Error loading content:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredContent = content.filter(item => {
        const matchesStage = filter.stage === 'all' || item.stage === filter.stage;
        const matchesGoal = filter.goal === 'all' || item.goal_id === filter.goal;
        const matchesMonth = filter.month === 'all' || item.month_number === parseInt(filter.month);
        const matchesSearch = !searchTerm || 
            item.week_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.week_description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStage && matchesGoal && matchesMonth && matchesSearch;
    });

    const handleTogglePublish = async (item) => {
        try {
            await RoadmapContent.update(item.id, { is_published: !item.is_published });
            await loadContent();
        } catch (error) {
            console.error('Error toggling publish:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this content? This cannot be undone.')) return;
        
        try {
            await RoadmapContent.delete(id);
            await loadContent();
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    const handleSave = async (formData) => {
        try {
            if (editingContent) {
                await RoadmapContent.update(editingContent.id, formData);
            } else {
                await RoadmapContent.create(formData);
            }
            await loadContent();
            setShowForm(false);
            setEditingContent(null);
        } catch (error) {
            console.error('Error saving content:', error);
            alert('Error saving content. Check console for details.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">Roadmap Content Management</h1>
                    <p className="text-[var(--text-soft)] mt-2">Manage detailed weekly content for all roadmap stages and goals</p>
                </div>
                <button
                    onClick={() => {
                        setEditingContent(null);
                        setShowForm(true);
                    }}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add New Week
                </button>
            </div>

            {/* Info Banner */}
            <div className="card p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)] mb-1">Important: Link Configuration</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            When setting up action steps, make sure to use the <strong>link_to</strong> field with the exact page name (e.g., "StrategyFormBrandIdentity"). 
                            This ensures users go directly to the specific tool, not the Foundation Roadmap overview page. 
                            Links like "MyFoundationRoadmap" should only be used when you want users to see the entire foundation overview.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search titles..."
                                className="form-input pl-10 w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Stage</label>
                        <select
                            value={filter.stage}
                            onChange={(e) => setFilter({ ...filter, stage: e.target.value })}
                            className="form-input w-full"
                        >
                            <option value="all">All Stages</option>
                            <option value="vision">Vision</option>
                            <option value="startup">Startup</option>
                            <option value="growth">Growth</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Goal</label>
                        <select
                            value={filter.goal}
                            onChange={(e) => setFilter({ ...filter, goal: e.target.value })}
                            className="form-input w-full"
                        >
                            <option value="all">All Goals</option>
                            <option value="vision_foundation_combo">Vision Foundation</option>
                            <option value="business_plan">Business Plan</option>
                            <option value="marketing_plan">Marketing Plan</option>
                            <option value="customer_journey">Customer Journey</option>
                            <option value="business_optimization">Business Optimization</option>
                            <option value="partnerships">Partnerships</option>
                            <option value="community">Community</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Month</label>
                        <select
                            value={filter.month}
                            onChange={(e) => setFilter({ ...filter, month: e.target.value })}
                            className="form-input w-full"
                        >
                            <option value="all">All Months</option>
                            <option value="1">Month 1</option>
                            <option value="2">Month 2</option>
                            <option value="3">Month 3</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {filteredContent.length === 0 ? (
                    <div className="card p-12 text-center">
                        <p className="text-[var(--text-soft)]">No content found. Add your first week of content to get started!</p>
                    </div>
                ) : (
                    filteredContent.map((item) => (
                        <div key={item.id} className="card p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold">
                                            {item.stage.toUpperCase()}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-semibold">
                                            Month {item.month_number}, Week {item.week_number}
                                        </span>
                                        {!item.is_published && (
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold">
                                                DRAFT
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">{item.week_title}</h3>
                                    <p className="text-[var(--text-soft)] mb-3">{item.week_description}</p>
                                    <p className="text-sm text-[var(--text-soft)]">
                                        <strong>{item.action_steps?.length || 0}</strong> action steps
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleTogglePublish(item)}
                                        className="btn btn-ghost btn-sm"
                                        title={item.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        {item.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingContent(item);
                                            setShowForm(true);
                                        }}
                                        className="btn btn-ghost btn-sm"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <ContentFormModal
                    content={editingContent}
                    onSave={handleSave}
                    onClose={() => {
                        setShowForm(false);
                        setEditingContent(null);
                    }}
                    foundationPages={FOUNDATION_PAGES}
                />
            )}
        </div>
    );
}

function ContentFormModal({ content, onSave, onClose, foundationPages }) {
    const [formData, setFormData] = useState(
        content || {
            stage: 'vision',
            goal_id: 'vision_foundation_combo',
            month_number: 1,
            week_number: 1,
            week_title: '',
            week_description: '',
            why_it_matters: '',
            how_it_streamlines: '',
            how_it_builds_relationships: '',
            action_steps: [],
            tools: [],
            resources: [],
            is_published: false,
            display_order: 1
        }
    );

    const [showLinkHelp, setShowLinkHelp] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[var(--text-main)]">
                        {content ? 'Edit Week Content' : 'Add New Week Content'}
                    </h2>
                    <button onClick={onClose} className="btn btn-ghost btn-sm">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Stage *</label>
                            <select
                                value={formData.stage}
                                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                                className="form-input w-full"
                            >
                                <option value="vision">Vision</option>
                                <option value="startup">Startup</option>
                                <option value="growth">Growth</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Goal ID *</label>
                            <input
                                type="text"
                                value={formData.goal_id}
                                onChange={(e) => setFormData({ ...formData, goal_id: e.target.value })}
                                className="form-input w-full"
                                placeholder="e.g., vision_foundation_combo"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Month Number *</label>
                            <input
                                type="number"
                                min="1"
                                max="3"
                                value={formData.month_number}
                                onChange={(e) => setFormData({ ...formData, month_number: parseInt(e.target.value) })}
                                className="form-input w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Week Number *</label>
                            <input
                                type="number"
                                min="1"
                                max="4"
                                value={formData.week_number}
                                onChange={(e) => setFormData({ ...formData, week_number: parseInt(e.target.value) })}
                                className="form-input w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Week Title *</label>
                        <input
                            type="text"
                            value={formData.week_title}
                            onChange={(e) => setFormData({ ...formData, week_title: e.target.value })}
                            className="form-input w-full"
                            placeholder="e.g., Define Your Why & Mission"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Week Description *</label>
                        <textarea
                            value={formData.week_description}
                            onChange={(e) => setFormData({ ...formData, week_description: e.target.value })}
                            className="form-input w-full h-24"
                            placeholder="Brief overview of what happens this week"
                        />
                    </div>

                    {/* Link Help Section */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-[var(--text-main)] mb-1">Setting Up Action Step Links</h4>
                                <p className="text-sm text-[var(--text-soft)] mb-2">
                                    When adding action steps to this week's content, use the <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-xs">link_to</code> field 
                                    with the exact page name to send users directly to specific tools.
                                </p>
                                <button
                                    onClick={() => setShowLinkHelp(!showLinkHelp)}
                                    className="text-sm text-[var(--primary-gold)] hover:underline"
                                >
                                    {showLinkHelp ? 'Hide' : 'Show'} available page names
                                </button>
                            </div>
                        </div>
                        
                        {showLinkHelp && (
                            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-amber-200 dark:border-amber-700 max-h-48 overflow-y-auto">
                                <p className="text-xs font-semibold text-[var(--text-main)] mb-2">Copy these exact page names:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                    {foundationPages.map(page => (
                                        <div key={page.value} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                            <span className="text-[var(--text-soft)]">{page.label}</span>
                                            <code className="text-[var(--primary-gold)] font-mono">{page.value}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-[var(--text-main)]">
                            <strong>Note:</strong> For detailed action steps configuration with links, tools, and resources, 
                            edit the JSON structure directly in your database or contact tech support. 
                            This form covers the basic week information.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.is_published}
                                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                            />
                            <span className="text-sm text-[var(--text-main)]">Publish immediately</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                    <button onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Content
                    </button>
                </div>
            </div>
        </div>
    );
}