import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function PaymentFailed() {
    return (
        <div className="px-4 py-8 flex items-center justify-center min-h-[60vh]">
            <div className="card max-w-lg w-full p-8 text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-600 mb-3">
                    Payment Failed
                </h1>
                <p className="text-[var(--text-soft)] mb-6 text-lg">
                    Unfortunately, we were unable to process your payment. Please check your payment details and try again.
                </p>
                <div className="flex justify-center">
                    <Link 
                        to={createPageUrl('Upgrade')} 
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Upgrade Page
                    </Link>
                </div>
                 <p className="text-xs text-[var(--text-soft)] mt-6">
                    If you continue to experience issues, please contact our support team.
                </p>
            </div>
        </div>
    );
}