import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    CheckCircle, Circle, Clock, AlertCircle, FileText, 
    MessageSquare, ChevronDown, ChevronUp, Loader2, 
    ArrowLeft, ExternalLink, User, Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DfyServiceDetailPage() {
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get('id');
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [expandedStep, setExpandedStep] = useState(null);
    const [updatingStep, setUpdatingStep] = useState(null);

    useEffect(() => {
        if (!serviceId) {
            navigate(createPageUrl('DfyServices'));
            return;
        }
        loadData();
    }, [serviceId]);

    const loadData = async () => {
        try {
            const [userData, serviceData] = await Promise.all([
                base44.auth.me(),
                base44.entities.DfyService.filter({ id: serviceId }).then(res => res[0])
            ]);

            setCurrentUser(userData);
            setService(serviceData);
            
            // Auto-expand first non-completed step
            if (serviceData?.steps) {
                const firstPending = serviceData.steps.find(s => s.status !== 'completed');
                if (firstPending) setExpandedStep(firstPending.id);
            }
        } catch (error) {
            console.error("Error loading service:", error);
            toast.error("Failed to load service details");
        } finally {
            setLoading(false);
        }
    };

    const updateStepStatus = async (stepId, newStatus) => {
        setUpdatingStep(stepId);
        try {
            const updatedSteps = service.steps.map(step => {
                if (step.id === stepId) {
                    return {
                        ...step,
                        status: newStatus,
                        completed_date: newStatus === 'completed' ? new Date().toISOString() : null
                    };
                }
                return step;
            });

            // Calculate overall status if all steps complete
            let newServiceStatus = service.status;
            if (updatedSteps.every(s => s.status === 'completed' || s.status === 'skipped')) {
                newServiceStatus = 'completed';
            } else if (service.status === 'not_started' && newStatus !== 'pending') {
                newServiceStatus = 'in_progress';
            }

            await base44.entities.DfyService.update(service.id, {
                steps: updatedSteps,
                status: newServiceStatus
            });

            setService(prev => ({
                ...prev,
                steps: updatedSteps,
                status: newServiceStatus
            }));
            
            toast.success("Step updated successfully");
        } catch (error) {
            console.error("Error updating step:", error);
            toast.error("Failed to update step");
        } finally {
            setUpdatingStep(null);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-6 h-6 text-green-500" />;
            case 'in_progress': return <Loader2 className="w-6 h-6 text-blue-500 animate-spin-slow" />;
            case 'ready_for_review': return <AlertCircle className="w-6 h-6 text-yellow-500" />;
            case 'skipped': return <Circle className="w-6 h-6 text-gray-300" />;
            default: return <Circle className="w-6 h-6 text-gray-300" />;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    if (!service) return <div>Service not found</div>;

    const completedSteps = service.steps.filter(s => s.status === 'completed' || s.status === 'skipped').length;
    const progress = Math.round((completedSteps / service.steps.length) * 100);
    const isProvider = currentUser?.email === service.service_provider_email || currentUser?.role === 'admin';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link to={createPageUrl('DfyServices')} className="btn btn-ghost btn-sm">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-main)]">{service.package_name}</h1>
                        <p className="text-[var(--text-soft)] text-sm">Project ID: {service.id.slice(0, 8)}</p>
                    </div>
                </div>

                {/* Overview Card */}
                <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div className="space-y-1">
                            <div className="text-sm text-[var(--text-soft)]">Client</div>
                            <div className="font-medium flex items-center gap-2">
                                <User className="w-4 h-4" /> {service.client_email}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-[var(--text-soft)]">Status</div>
                            <div className="font-medium capitalize px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                                {service.status.replace('_', ' ')}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-[var(--text-soft)]">Start Date</div>
                            <div className="font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 
                                {service.start_date ? new Date(service.start_date).toLocaleDateString() : 'N/A'}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Project Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[var(--primary-gold)] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Steps Timeline */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Project Roadmap</h2>
                    
                    <div className="space-y-3">
                        {service.steps.map((step, index) => {
                            const isExpanded = expandedStep === step.id;
                            const isCompleted = step.status === 'completed';
                            const isCurrent = !isCompleted && (index === 0 || service.steps[index - 1].status === 'completed');

                            return (
                                <div 
                                    key={step.id}
                                    className={`card transition-all border ${
                                        isCurrent 
                                            ? 'border-[var(--primary-gold)] shadow-md ring-1 ring-[var(--primary-gold)]/20' 
                                            : 'border-gray-200 dark:border-gray-800'
                                    }`}
                                >
                                    <div 
                                        className="p-4 flex items-start gap-4 cursor-pointer"
                                        onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                                    >
                                        <div className="pt-1">
                                            {getStatusIcon(step.status)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className={`font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-[var(--text-main)]'}`}>
                                                    {step.title}
                                                </h3>
                                                {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                            </div>
                                            <p className="text-sm text-[var(--text-soft)] mb-2">{step.description}</p>
                                            
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className={`px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-medium ${
                                                    step.responsible_party === 'Client' ? 'text-blue-600' : 'text-purple-600'
                                                }`}>
                                                    {step.responsible_party === 'Both' ? 'Collab' : step.responsible_party}
                                                </span>
                                                {step.completed_date && (
                                                    <span className="text-green-600 flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" /> 
                                                        {new Date(step.completed_date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-4 pb-4 pl-14 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                                            
                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-3">
                                                {/* Tool Link */}
                                                {step.tool_link && (
                                                    step.tool_link.startsWith('http') ? (
                                                        <a href={step.tool_link} target="_blank" rel="noopener noreferrer">
                                                            <Button variant="outline" size="sm" className="gap-2">
                                                                <ExternalLink className="w-3 h-3" />
                                                                {step.tool_link.includes('thebminds') ? 'Open The HQ' : 'Open Link'}
                                                            </Button>
                                                        </a>
                                                    ) : (
                                                        <Link to={createPageUrl(step.tool_link)}>
                                                            <Button variant="outline" size="sm" className="gap-2">
                                                                <ExternalLink className="w-3 h-3" />
                                                                Open {step.tool_link}
                                                            </Button>
                                                        </Link>
                                                    )
                                                )}

                                                {/* Status Actions */}
                                                {(isProvider || (step.responsible_party === 'Client' && !isCompleted)) && (
                                                    <div className="flex gap-2 ml-auto">
                                                        {step.status !== 'completed' && (
                                                            <Button 
                                                                size="sm" 
                                                                onClick={() => updateStepStatus(step.id, 'completed')}
                                                                disabled={updatingStep === step.id}
                                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                            >
                                                                {updatingStep === step.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3 mr-2" />}
                                                                Mark Complete
                                                            </Button>
                                                        )}
                                                        {step.status === 'completed' && isProvider && (
                                                            <Button 
                                                                size="sm" 
                                                                variant="ghost"
                                                                onClick={() => updateStepStatus(step.id, 'pending')}
                                                                className="text-gray-500 hover:text-red-500"
                                                            >
                                                                Reopen
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Checklist */}
                                            {step.checklist && step.checklist.length > 0 && (
                                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-3">
                                                    <div className="font-medium text-sm flex items-center gap-2">
                                                        <FileText className="w-4 h-4" /> Step Checklist
                                                    </div>
                                                    <div className="space-y-2">
                                                        {step.checklist.map((item) => (
                                                            <div 
                                                                key={item.id} 
                                                                className="flex items-start gap-3 cursor-pointer group"
                                                                onClick={async () => {
                                                                    // Toggle checklist item
                                                                    const updatedChecklist = step.checklist.map(i => 
                                                                        i.id === item.id ? { ...i, is_checked: !i.is_checked } : i
                                                                    );
                                                                    
                                                                    const updatedSteps = service.steps.map(s => 
                                                                        s.id === step.id ? { ...s, checklist: updatedChecklist } : s
                                                                    );

                                                                    // Optimistic update
                                                                    setService(prev => ({ ...prev, steps: updatedSteps }));

                                                                    // DB update
                                                                    try {
                                                                        await base44.entities.DfyService.update(service.id, { steps: updatedSteps });
                                                                    } catch (err) {
                                                                        console.error("Failed to update checklist", err);
                                                                        toast.error("Failed to save checklist");
                                                                        // Revert on error would go here
                                                                    }
                                                                }}
                                                            >
                                                                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                                    item.is_checked 
                                                                        ? 'bg-[var(--primary-gold)] border-[var(--primary-gold)] text-white' 
                                                                        : 'border-gray-400 group-hover:border-[var(--primary-gold)]'
                                                                }`}>
                                                                    {item.is_checked && <CheckCircle className="w-3 h-3" />}
                                                                </div>
                                                                <span className={`text-sm ${item.is_checked ? 'text-gray-400 line-through' : 'text-[var(--text-main)]'}`}>
                                                                    {item.text}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Notes / Updates */}
                                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded text-sm text-[var(--text-soft)]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2 font-medium">
                                                        <MessageSquare className="w-4 h-4" /> Notes & Updates
                                                    </div>
                                                    <a href="mailto:team@thebminds.com" className="text-xs text-[var(--primary-gold)] hover:underline flex items-center gap-1">
                                                        Email team@thebminds.com <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                                <textarea
                                                    className="w-full p-2 border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-[var(--text-main)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary-gold)]"
                                                    placeholder="Add notes about this step..."
                                                    rows={3}
                                                    value={step.notes || ''}
                                                    onChange={async (e) => {
                                                        const newNotes = e.target.value;
                                                        
                                                        // Optimistic update
                                                        const updatedSteps = service.steps.map(s => 
                                                            s.id === step.id ? { ...s, notes: newNotes } : s
                                                        );
                                                        setService(prev => ({ ...prev, steps: updatedSteps }));

                                                        // Debounced DB update (simplified here)
                                                        try {
                                                            await base44.entities.DfyService.update(service.id, { steps: updatedSteps });
                                                        } catch (err) {
                                                            console.error("Failed to update notes", err);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Support / Help Section */}
                <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Questions about your project?</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Contact our support team directly at <a href="mailto:team@thebminds.com" className="underline hover:text-blue-800 font-medium">team@thebminds.com</a>
                            </p>
                        </div>
                    </div>
                    <a href="mailto:team@thebminds.com">
                        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-800">
                            Email Support
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}