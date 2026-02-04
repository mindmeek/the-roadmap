import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Loader2, CheckCircle, XCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AcceptTeamInvitation() {
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('processing'); // processing, success, error
    const [message, setMessage] = useState('');
    const [business, setBusiness] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        acceptInvitation();
    }, []);

    const acceptInvitation = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Invalid invitation link. No token provided.');
                setLoading(false);
                return;
            }

            const response = await base44.functions.invoke('acceptTeamInvitation', { token });

            if (response.data.success) {
                setStatus('success');
                setMessage(response.data.message);
                setBusiness(response.data.business);
            } else {
                setStatus('error');
                setMessage(response.data.error || 'Failed to accept invitation');
            }
        } catch (error) {
            console.error('Error accepting invitation:', error);
            setStatus('error');
            
            if (error.response?.status === 401) {
                setMessage('Please log in to accept this invitation.');
            } else if (error.response?.status === 403) {
                setMessage(error.response?.data?.error || 'This invitation is for a different email address.');
            } else {
                setMessage(error.response?.data?.error || 'An error occurred while accepting the invitation.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[var(--primary-gold)] mx-auto mb-4" />
                    <p className="text-lg text-[var(--text-soft)]">Processing your invitation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full">
                <div className="card p-8 text-center">
                    {status === 'success' ? (
                        <>
                            <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">Welcome to the Team!</h1>
                            <p className="text-[var(--text-soft)] mb-6">{message}</p>
                            {business && (
                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <Users className="w-6 h-6 text-[var(--primary-gold)]" />
                                        <div>
                                            <p className="font-semibold text-[var(--text-main)]">{business.name}</p>
                                            {business.industry && (
                                                <p className="text-sm text-[var(--text-soft)]">{business.industry}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Button
                                onClick={() => navigate(createPageUrl('BusinessOverview'))}
                                className="btn-primary w-full"
                            >
                                Go to Business Dashboard
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className="bg-red-100 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--text-main)] mb-2">Invitation Error</h1>
                            <p className="text-[var(--text-soft)] mb-6">{message}</p>
                            <div className="space-y-3">
                                {message.includes('log in') && (
                                    <Button
                                        onClick={() => base44.auth.redirectToLogin(window.location.href)}
                                        className="btn-primary w-full"
                                    >
                                        Log In
                                    </Button>
                                )}
                                <Button
                                    onClick={() => navigate(createPageUrl('Dashboard'))}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}