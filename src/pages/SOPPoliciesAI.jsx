import React, { useState, useEffect } from 'react';
import { User, AIAssistantNote } from '@/entities/all';
import { InvokeLLM } from '@/integrations/Core';
import { Loader2, FileText, Download, Save, Sparkles, BookOpen, Shield, Users, TrendingUp, AlertCircle, Copy, CheckCircle } from 'lucide-react';
import SubscriptionGate from '@/components/subscription/SubscriptionGate';

const sopTemplates = [
    { id: 'customer_service', name: 'Customer Service SOP', icon: Users, description: 'Create procedures for handling customer inquiries and complaints' },
    { id: 'onboarding', name: 'Employee Onboarding', icon: Users, description: 'Document your process for bringing new team members on board' },
    { id: 'quality_control', name: 'Quality Control', icon: Shield, description: 'Set standards for product/service quality assurance' },
    { id: 'sales_process', name: 'Sales Process', icon: TrendingUp, description: 'Outline your step-by-step sales methodology' },
    { id: 'content_creation', name: 'Content Creation', icon: FileText, description: 'Standardize your content production workflow' },
    { id: 'privacy_policy', name: 'Privacy Policy', icon: Shield, description: 'Generate a privacy policy for your business' },
    { id: 'refund_policy', name: 'Refund Policy', icon: FileText, description: 'Create clear refund and cancellation terms' },
    { id: 'custom', name: 'Custom SOP/Policy', icon: Sparkles, description: 'Create any custom procedure or policy' },
];

export default function SOPPoliciesAIPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        specificRequirements: '',
        customTitle: ''
    });
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [savedNotes, setSavedNotes] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await User.me();
                setUser(currentUser);
                
                // Pre-fill business name if available
                if (currentUser.business_name) {
                    setFormData(prev => ({ ...prev, businessName: currentUser.business_name }));
                }

                // Load saved notes
                const notes = await AIAssistantNote.filter({ assistant_type: 'sop_policies' }, '-created_date', 50);
                setSavedNotes(notes);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleGenerate = async () => {
        if (!selectedTemplate) {
            alert('Please select a template first');
            return;
        }

        setIsGenerating(true);
        try {
            const templateName = sopTemplates.find(t => t.id === selectedTemplate)?.name || 'Policy';
            
            let prompt = '';
            if (selectedTemplate === 'custom') {
                prompt = `Create a detailed Standard Operating Procedure (SOP) or policy document for the following:

Title: ${formData.customTitle || 'Custom Policy'}
Business: ${formData.businessName || 'A business'}
Industry: ${formData.industry || 'General'}

Specific Requirements:
${formData.specificRequirements}

Please provide a comprehensive, professional document that includes:
1. Purpose/Overview
2. Scope
3. Detailed step-by-step procedures or policy details
4. Responsibilities (if applicable)
5. Key metrics or success criteria (if applicable)
6. Review and update schedule

Format the output in clear sections with headers.`;
            } else {
                prompt = `Create a detailed ${templateName} for the following business:

Business Name: ${formData.businessName || 'A business'}
Industry: ${formData.industry || 'General'}

Specific Requirements/Context:
${formData.specificRequirements || 'Standard requirements for this industry'}

Please provide a comprehensive, professional ${templateName} document that includes:
1. Purpose/Overview
2. Scope
3. Detailed step-by-step procedures or policy details
4. Responsibilities (if applicable)
5. Key metrics or success criteria (if applicable)
6. Review and update schedule
7. Any legal or compliance considerations

Format the output in clear sections with headers. Make it actionable and ready to implement.`;
            }

            const response = await InvokeLLM({ prompt });
            setGeneratedContent(response);
        } catch (error) {
            console.error("Error generating SOP:", error);
            alert('Failed to generate content. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!generatedContent) {
            alert('No content to save');
            return;
        }

        setIsSaving(true);
        try {
            const templateName = sopTemplates.find(t => t.id === selectedTemplate)?.name || 'Custom Policy';
            const title = selectedTemplate === 'custom' && formData.customTitle 
                ? formData.customTitle 
                : `${templateName} - ${formData.businessName || 'Business'}`;

            await AIAssistantNote.create({
                assistant_type: 'sop_policies',
                title,
                content: generatedContent
            });

            // Reload saved notes
            const notes = await AIAssistantNote.filter({ assistant_type: 'sop_policies' }, '-created_date', 50);
            setSavedNotes(notes);

            alert('Saved successfully!');
        } catch (error) {
            console.error("Error saving note:", error);
            alert('Failed to save. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([generatedContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const templateName = sopTemplates.find(t => t.id === selectedTemplate)?.name || 'Document';
        a.download = `${templateName.replace(/\s+/g, '_')}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <SubscriptionGate 
            user={user} 
            requiredLevel="launchpad" 
            feature="SOP & Policy AI Generator"
            customTitle="Streamline Your Operations with AI-Generated SOPs & Policies"
            customDescription="Create professional Standard Operating Procedures and company policies in minutes with our AI assistant. Save hours of work and ensure consistency across your organization."
            benefits={[
                "Generate comprehensive SOPs in minutes",
                "Create legal and compliance-ready policies",
                "Customize for your specific industry and business",
                "Save and manage all your documents in one place",
                "Download and share with your team instantly",
                "Regular updates with industry best practices",
                "Professional formatting ready for implementation",
                "Unlimited SOP and policy generation"
            ]}
        >
            <div className="px-4 pb-20 md:pb-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="card p-6 md:p-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-md">
                                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[var(--text-main)]">SOP & Policy AI Generator</h1>
                                <p className="text-[var(--text-soft)] text-lg">Create professional procedures and policies for your business</p>
                            </div>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        <strong>Pro Tip:</strong> The more specific details you provide about your business and requirements, 
                                        the more tailored and actionable your SOP or policy will be.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Panel: Template Selection */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Select Template</h2>
                                <div className="space-y-3">
                                    {sopTemplates.map((template) => {
                                        const IconComponent = template.icon;
                                        return (
                                            <button
                                                key={template.id}
                                                onClick={() => setSelectedTemplate(template.id)}
                                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                                    selectedTemplate === template.id
                                                        ? 'border-[var(--primary-gold)] bg-yellow-50 dark:bg-yellow-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-[var(--primary-gold)]'
                                                }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <IconComponent className={`w-5 h-5 mt-0.5 ${selectedTemplate === template.id ? 'text-[var(--primary-gold)]' : 'text-gray-400'}`} />
                                                    <div className="flex-grow">
                                                        <h3 className="font-semibold text-sm text-[var(--text-main)]">{template.name}</h3>
                                                        <p className="text-xs text-[var(--text-soft)] mt-1">{template.description}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Saved Documents */}
                            {savedNotes.length > 0 && (
                                <div className="card p-6">
                                    <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Saved Documents</h2>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {savedNotes.map((note) => (
                                            <div
                                                key={note.id}
                                                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                                onClick={() => setGeneratedContent(note.content)}
                                            >
                                                <p className="text-sm font-medium text-[var(--text-main)] truncate">{note.title}</p>
                                                <p className="text-xs text-[var(--text-soft)] mt-1">
                                                    {new Date(note.created_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Panel: Form and Generated Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Input Form */}
                            <div className="card p-6">
                                <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">Business Details</h2>
                                <div className="space-y-4">
                                    {selectedTemplate === 'custom' && (
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                                Document Title *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.customTitle}
                                                onChange={(e) => setFormData({ ...formData, customTitle: e.target.value })}
                                                className="form-input"
                                                placeholder="e.g., Remote Work Policy, Equipment Handling SOP"
                                            />
                                        </div>
                                    )}
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="form-input"
                                            placeholder="Your business name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                            Industry
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.industry}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            className="form-input"
                                            placeholder="e.g., E-commerce, Consulting, SaaS"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                                            Specific Requirements or Context
                                        </label>
                                        <textarea
                                            value={formData.specificRequirements}
                                            onChange={(e) => setFormData({ ...formData, specificRequirements: e.target.value })}
                                            className="form-input h-32 resize-none"
                                            placeholder="Provide any specific details, requirements, or context for your SOP/policy..."
                                        ></textarea>
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={!selectedTemplate || isGenerating}
                                        className="btn btn-primary w-full"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5 mr-2" />
                                                Generate {selectedTemplate === 'custom' ? 'Document' : sopTemplates.find(t => t.id === selectedTemplate)?.name}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Generated Content */}
                            {generatedContent && (
                                <div className="card p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-[var(--text-main)]">Generated Document</h2>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleCopy}
                                                className="btn btn-secondary text-sm py-2 px-3"
                                                title="Copy to clipboard"
                                            >
                                                {copySuccess ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4 mr-1" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={handleDownload}
                                                className="btn btn-secondary text-sm py-2 px-3"
                                            >
                                                <Download className="w-4 h-4 mr-1" />
                                                Download
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={isSaving}
                                                className="btn btn-primary text-sm py-2 px-3"
                                            >
                                                {isSaving ? (
                                                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                                ) : (
                                                    <Save className="w-4 h-4 mr-1" />
                                                )}
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg max-h-[600px] overflow-y-auto">
                                        <pre className="whitespace-pre-wrap text-sm text-[var(--text-main)] font-mono">
                                            {generatedContent}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-[var(--primary-gold)]" />
                            How to Use This Tool
                        </h3>
                        <ol className="space-y-3 text-sm text-[var(--text-main)]">
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-gold)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                                <span><strong>Select a template</strong> from the left panel that matches your needs (or choose "Custom" for unique requirements)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-gold)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                                <span><strong>Fill in your business details</strong> – the more context you provide, the better the AI can tailor the document</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-gold)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                                <span><strong>Click "Generate"</strong> and let the AI create a comprehensive, professional document for you</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-gold)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                                <span><strong>Review and customize</strong> the generated content to perfectly fit your business</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-[var(--primary-gold)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                                <span><strong>Save, download, or copy</strong> to share with your team and implement immediately</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </SubscriptionGate>
    );
}