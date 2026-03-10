import React, { useState, useEffect } from 'react';
import { User, StrategyDocument } from '@/entities/all';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Zap, Save, Loader2, CheckCircle, ArrowLeft, 
    Sparkles, HelpCircle, Settings, Target, FileText, Users
} from 'lucide-react';
import AITeamModal from '@/components/ai/AITeamModal';
import AutomationOverview from '@/components/strategy/AutomationOverview';

export default function StrategyFormAutomation() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const [viewMode, setViewMode] = useState('edit');

    const [formData, setFormData] = useState({
        automation_goals: '',
        time_consuming_tasks: '',
        processes_to_automate: {
            lead_generation: { enabled: false, description: '', tools: '' },
            email_marketing: { enabled: false, description: '', tools: '' },
            social_media: { enabled: false, description: '', tools: '' },
            sales_process: { enabled: false, description: '', tools: '' },
            customer_onboarding: { enabled: false, description: '', tools: '' },
            billing_invoicing: { enabled: false, description: '', tools: '' },
            customer_support: { enabled: false, description: '', tools: '' }
        },
        sop_documentation: '',
        team_delegation: '',
        automation_tools: '',
        implementation_timeline: '',
        success_metrics: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            const docs = await StrategyDocument.filter({ 
                created_by: userData.email,
                document_type: 'automation_systematization'
            });

            if (docs && docs.length > 0) {
                setFormData(docs[0].content);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docs = await StrategyDocument.filter({ 
                created_by: user.email,
                document_type: 'automation_systematization'
            });

            const docData = {
                document_type: 'automation_systematization',
                title: 'Automate & Systematize Your Business',
                content: formData,
                is_completed: true,
                last_updated: new Date().toISOString()
            };

            if (docs && docs.length > 0) {
                await StrategyDocument.update(docs[0].id, docData);
            } else {
                await StrategyDocument.create(docData);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save. Please try again.');
        } finally {
            setSaving(false);
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
            <div className="max-w-5xl mx-auto">
                {/* View Toggle */}
                <div className="flex justify-end mb-4">
                    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <button onClick={() => setViewMode('edit')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'edit' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Edit</button>
                        <button onClick={() => setViewMode('overview')} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'overview' ? 'bg-[var(--primary-gold)] text-white' : 'bg-white dark:bg-gray-800 text-[var(--text-soft)] hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Overview</button>
                    </div>
                </div>

                {viewMode === 'overview' ? (
                    <AutomationOverview formData={formData} />
                ) : (<>

                {/* Header */}
                <div className="mb-6">
                    <Link to={createPageUrl('MyFoundationRoadmap')} className="inline-flex items-center text-sm text-[var(--text-soft)] hover:text-[var(--primary-gold)] mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Foundation Roadmap
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-lg">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-main)]">Automate & Systematize Your Business</h1>
                            <p className="text-[var(--text-soft)]">Work smarter, not harder—build systems that scale</p>
                        </div>
                    </div>
                </div>

                {/* Guide Section */}
                <div className="card p-6 mb-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700">
                    <div className="flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">Why Automation & Systems Matter</h3>
                            <p className="text-sm text-[var(--text-soft)] mb-3">
                                Automation frees you from repetitive tasks so you can focus on strategy and growth. Systematization ensures 
                                consistency, reduces errors, and makes your business sellable. The goal: your business runs smoothly without you.
                            </p>
                            <p className="text-sm text-[var(--text-soft)]">
                                <strong>Key benefits:</strong> Save time, reduce costs, eliminate human error, increase consistency, 
                                enable delegation, scale faster, and create a valuable asset.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How This Streamlines Your Business */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            Streamlines Your Business
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>The HQ</strong>'s Workflows handle repetitive tasks 24/7. Lead capture, email follow-ups, invoice generation, 
                            appointment booking, and customer onboarding happen automatically in one system. This frees 20+ hours per week for strategic work 
                            and eliminates the need for "digital duct tape" like Zapier. Plus, for detailed installation instructions and implementation guidance, **The HQ's built-in AI chatbot** is always available to assist you step-by-step.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-600" />
                            Connects With Ideal Clients
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            Automation ensures every prospect gets a perfect, timely experience. Welcome sequences deliver value immediately. 
                            Follow-ups never fall through cracks. Personalized touches happen at scale. Your ideal clients feel cared for because 
                            systems handle the details while you focus on meaningful interactions. Not sure what to automate first? Ask the experts in the **Business Minds Community**.
                        </p>
                    </div>

                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <h4 className="font-bold text-[var(--text-main)] mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Real World Example
                        </h4>
                        <p className="text-sm text-[var(--text-soft)]">
                            <strong>David, Marketing Agency Owner:</strong> Implemented CRM automation for client onboarding, project management 
                            workflows, and automated reporting. Reduced onboarding time from 3 days to 3 hours. Grew from handling 5 clients 
                            to 25 clients without hiring more staff. Sold the agency for 3x revenue because systems proved business runs without him.
                        </p>
                    </div>
                </div>

                {/* Automation Strategy */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Target className="w-6 h-6 text-orange-600" />
                        Automation Strategy
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Automation Goals</label>
                            <textarea
                                value={formData.automation_goals}
                                onChange={(e) => setFormData({ ...formData, automation_goals: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="What do you want to achieve? (e.g., Save 20 hours per week, Eliminate manual data entry, Streamline customer onboarding)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Most Time-Consuming Tasks</label>
                            <textarea
                                value={formData.time_consuming_tasks}
                                onChange={(e) => setFormData({ ...formData, time_consuming_tasks: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="List tasks that eat up your time (e.g., Responding to customer inquiries, Scheduling social posts, Sending invoices, Data entry)"
                            />
                        </div>
                    </div>
                </div>

                {/* Processes to Automate */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <Settings className="w-6 h-6 text-red-600" />
                        Processes to Automate
                    </h3>
                    <p className="text-sm text-[var(--text-soft)] mb-4">Select areas where you'll implement automation</p>
                    
                    <div className="space-y-6">
                        {Object.keys(formData.processes_to_automate).map((processKey) => {
                            const process = formData.processes_to_automate[processKey];
                            const processNames = {
                                lead_generation: 'Lead Generation & Capture',
                                email_marketing: 'Email Marketing',
                                social_media: 'Social Media Management',
                                sales_process: 'Sales Process',
                                customer_onboarding: 'Customer Onboarding',
                                billing_invoicing: 'Billing & Invoicing',
                                customer_support: 'Customer Support'
                            };

                            return (
                                <div key={processKey} className="border-l-4 border-orange-500 pl-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={process.enabled}
                                            onChange={(e) => setFormData({ 
                                                ...formData, 
                                                processes_to_automate: { 
                                                    ...formData.processes_to_automate, 
                                                    [processKey]: { ...process, enabled: e.target.checked }
                                                }
                                            })}
                                            className="w-4 h-4"
                                        />
                                        <h4 className="font-semibold text-[var(--text-main)]">{processNames[processKey]}</h4>
                                    </div>
                                    {process.enabled && (
                                        <div className="space-y-2 mt-2">
                                            <textarea
                                                value={process.description}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    processes_to_automate: { 
                                                        ...formData.processes_to_automate, 
                                                        [processKey]: { ...process, description: e.target.value }
                                                    }
                                                })}
                                                className="form-input"
                                                rows="2"
                                                placeholder="What will you automate in this area?"
                                            />
                                            <input
                                                type="text"
                                                value={process.tools}
                                                onChange={(e) => setFormData({ 
                                                    ...formData, 
                                                    processes_to_automate: { 
                                                        ...formData.processes_to_automate, 
                                                        [processKey]: { ...process, tools: e.target.value }
                                                    }
                                                })}
                                                className="form-input"
                                                placeholder="Tools to use (e.g., Zapier, Make, ClickFunnels, Calendly)"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Systems & Documentation */}
                <div className="card p-6 mb-6">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-purple-600" />
                        Systems & Documentation
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Standard Operating Procedures (SOPs)</label>
                            <textarea
                                value={formData.sop_documentation}
                                onChange={(e) => setFormData({ ...formData, sop_documentation: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="What processes need documented step-by-step instructions? (e.g., Client onboarding process, Content creation workflow, Monthly reporting)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Team Delegation Plan</label>
                            <textarea
                                value={formData.team_delegation}
                                onChange={(e) => setFormData({ ...formData, team_delegation: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="What tasks can you delegate to team members or VAs? Who will handle what?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Automation Tools & Tech Stack</label>
                            <textarea
                                value={formData.automation_tools}
                                onChange={(e) => setFormData({ ...formData, automation_tools: e.target.value })}
                                className="form-input"
                                rows="5"
                                placeholder="List tools you'll use for automation (The HQ (Recommended), Zapier, Make, Asana, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Implementation Timeline</label>
                            <textarea
                                value={formData.implementation_timeline}
                                onChange={(e) => setFormData({ ...formData, implementation_timeline: e.target.value })}
                                className="form-input"
                                rows="4"
                                placeholder="When will you implement each automation? (Month 1: Email automation, Month 2: CRM setup, etc.)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Success Metrics</label>
                            <textarea
                                value={formData.success_metrics}
                                onChange={(e) => setFormData({ ...formData, success_metrics: e.target.value })}
                                className="form-input"
                                rows="3"
                                placeholder="Hours saved per week, error reduction, faster response times, increased capacity"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sticky bottom-20 md:bottom-6 z-10">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary flex-1"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : saved ? (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Save Automation Plan
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowAIAssistant(true)}
                        className="btn btn-secondary"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get AI Help
                    </button>
                </div>
            </div>

            <AITeamModal
                isOpen={showAIAssistant}
                onClose={() => setShowAIAssistant(false)}
                assistantType="olivia"
                sectionTitle="Business Automation & Systematization"
            />
        </>)}
        </div>
    </div>
    );
}