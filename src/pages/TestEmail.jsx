import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Loader2 } from "lucide-react";
import { testEmail } from '@/functions/testEmail';

export default function TestEmailPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [result, setResult] = useState(null);
    const [testConfig, setTestConfig] = useState({
        testType: 'welcome',
        email: '',
        name: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await User.me();
                setUser(userData);
                if (userData.role !== 'admin') {
                   // Non-admin handling can be added here
                }
            } catch (e) {
                // Not logged in or error
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        setTestConfig({ ...testConfig, [e.target.name]: e.target.value });
    };

    const handleSendTest = async () => {
        setIsSending(true);
        setResult(null);
        try {
            const payload = {
                testType: testConfig.testType,
                email: testConfig.email || user.email,
                name: testConfig.name || user.full_name,
            };
            
            const response = await testEmail(payload);
            const resData = response.data;

            if (resData && resData.success === false) {
                setResult({
                    success: false,
                    message: resData.error || 'The backend reported an error.',
                    details: resData.details || { info: 'No further details.' }
                });
            } else if (resData && resData.success === true) {
                setResult({
                    success: true,
                    message: `Email successfully handed off to Resend!`,
                    details: { 
                        resendId: resData.data.id,
                        sentTo: resData.data.to,
                        info: "Check the Resend logs and your inbox."
                    }
                });
            } else {
                setResult({
                    success: false,
                    message: 'Received an unexpected response from the server.',
                    details: resData
                });
            }
        } catch (e) {
            setResult({
                success: false,
                message: 'A network error occurred while calling the function.',
                details: { message: e.message }
            });
        } finally {
            setIsSending(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
    }

    if (!user || user.role !== 'admin') {
        return <div className="p-8 text-center text-red-500">Access Denied. You must be an admin to use this page.</div>;
    }

    return (
        <div className="px-4 pb-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="card p-8">
                    <h1 className="text-2xl font-bold text-[var(--text-main)]">Email Sending Test</h1>
                    <p className="text-[var(--text-soft)] mt-2">Use this page to test email functionality and debug issues.</p>
                </div>

                <div className="card p-8 space-y-4">
                    <div>
                        <label className="font-medium text-[var(--text-main)]">Test Type</label>
                        <select name="testType" value={testConfig.testType} onChange={handleInputChange} className="form-input mt-1">
                            <option value="welcome">Welcome Email</option>
                            <option value="connection">Connection Request</option>
                            <option value="reminder">Daily Reminder</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-[var(--text-main)]">Recipient Email (optional)</label>
                        <input type="email" name="email" value={testConfig.email} onChange={handleInputChange} className="form-input mt-1" placeholder={user.email} />
                    </div>
                    <div>
                        <label className="font-medium text-[var(--text-main)]">Recipient Name (optional)</label>
                        <input type="text" name="name" value={testConfig.name} onChange={handleInputChange} className="form-input mt-1" placeholder={user.full_name} />
                    </div>
                    <button onClick={handleSendTest} disabled={isSending} className="btn btn-primary w-full disabled:opacity-50">
                        {isSending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Test Email'}
                    </button>
                </div>

                {result && (
                    <div className={`card p-6 border-l-4 ${result.success ? 'border-green-500' : 'border-red-500'}`}>
                        <h3 className={`text-lg font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                            {result.success ? 'Success' : 'Error Occurred'}
                        </h3>
                        <p className="text-[var(--text-main)] mt-2">{result.message}</p>
                        {result.details && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-[var(--text-main)]">Details:</h4>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm text-[var(--text-soft)] overflow-x-auto">
                                    {JSON.stringify(result.details, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}