import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
    Briefcase, Calendar, CheckCircle, Clock, 
    ArrowRight, Loader2, Plus, Filter, User 
} from 'lucide-react';
import { DFY_PACKAGES } from '@/components/dfy/sopData';
import { Button } from "@/components/ui/button";

export default function DfyServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await base44.auth.me();
                setUser(userData);
                setIsAdmin(userData.role === 'admin');

                // Filter logic handled by RLS, but admins might want to see all
                // Regular users only see what they own
                const data = await base44.entities.DfyService.filter({}, '-start_date');
                setServices(data);
            } catch (error) {
                console.error("Error loading services:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getPackageIcon = (packageName) => {
        const pkg = DFY_PACKAGES.find(p => p.title === packageName);
        return pkg ? pkg.icon : Briefcase;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'onboarding': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
            case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };

    const createNewService = async (pkg) => {
        if (!isAdmin) return;
        
        // This would typically be a modal or separate create page
        // For now, we'll just simulate creating one for the current user for demo purposes
        // In reality, an admin would select a client
        
        const confirmCreate = window.confirm(`Start a new ${pkg.title} project for yourself (Demo)?`);
        if (!confirmCreate) return;

        try {
            await base44.entities.DfyService.create({
                package_name: pkg.title,
                client_email: user.email,
                service_provider_email: user.email, // Assigning self as provider for demo
                status: 'onboarding',
                start_date: new Date().toISOString(),
                steps: pkg.steps
            });
            window.location.reload();
        } catch (error) {
            alert("Failed to create service: " + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-gold)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">My Services</h1>
                        <p className="text-[var(--text-soft)] mt-1">
                            Track the progress of your Done-For-You projects.
                        </p>
                    </div>
                    {/* Admin Tools - Hidden for regular users usually, but keeping simple for now */}
                    {isAdmin && (
                        <div className="flex gap-2">
                            {/* In a real app, this would open a modal to select user & package */}
                            <Button variant="outline" disabled>
                                <Plus className="w-4 h-4 mr-2" /> New Project (Admin)
                            </Button>
                        </div>
                    )}
                </div>

                {/* Active Services List */}
                <div className="grid grid-cols-1 gap-6">
                    {services.length > 0 ? (
                        services.map(service => {
                            const Icon = getPackageIcon(service.package_name);
                            const completedSteps = service.steps.filter(s => s.status === 'completed').length;
                            const totalSteps = service.steps.length;
                            const progress = Math.round((completedSteps / totalSteps) * 100) || 0;

                            return (
                                <Link 
                                    key={service.id} 
                                    to={createPageUrl('DfyServiceDetail') + `?id=${service.id}`}
                                    className="card p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800 hover:border-[var(--primary-gold)] group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-xl bg-[var(--primary-gold)]/10 flex items-center justify-center text-[var(--primary-gold)]">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                                                <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--primary-gold)] transition-colors">
                                                    {service.package_name}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusColor(service.status)}`}>
                                                    {service.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-[var(--text-soft)]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    Started: {service.start_date ? new Date(service.start_date).toLocaleDateString() : 'Pending'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    Client: {service.client_email}
                                                </div>
                                                {service.target_completion_date && (
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        Target: {new Date(service.target_completion_date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span>Progress</span>
                                                    <span>{progress}% ({completedSteps}/{totalSteps} steps)</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[var(--primary-gold)] transition-all duration-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center pl-4 border-l border-gray-100 dark:border-gray-800">
                                            <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-[var(--primary-gold)]" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-[var(--text-main)]">No Active Services</h3>
                            <p className="text-[var(--text-soft)]">You don't have any active Done-For-You projects yet.</p>
                            {isAdmin && (
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
                                    {DFY_PACKAGES.map(pkg => (
                                        <button 
                                            key={pkg.id}
                                            onClick={() => createNewService(pkg)}
                                            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                                        >
                                            <div className="font-bold text-sm mb-1">{pkg.title}</div>
                                            <div className="text-xs text-[var(--text-soft)]">{pkg.price}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-[var(--text-soft)]">
                        Need help with your services? Contact us at <a href="mailto:team@thebminds.com" className="text-[var(--primary-gold)] hover:underline font-medium">team@thebminds.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}