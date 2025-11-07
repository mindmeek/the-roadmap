
import React, { useState } from 'react';
import { Bell, Send, Loader2, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { sendBulkNotifications } from '@/functions/sendBulkNotifications';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AdminNotifications() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('');
    const [targetStage, setTargetStage] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body) {
            alert('Title and Body are required.');
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await sendBulkNotifications({
                title,
                body,
                url: url || 'https://app.thebminds.com/Dashboard',
                targetStage
            });

            if (response.data.success) {
                setResult({ status: 'success', message: `Notifications sent successfully to ${response.data.sent}/${response.data.total} subscribers.` });
                setTitle('');
                setBody('');
                setUrl('');
            } else {
                throw new Error(response.data.error || 'Failed to send notifications.');
            }
        } catch (error) {
            console.error('Error sending notifications:', error);
            setResult({ status: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-4 pb-8">
            <div className="max-w-2xl mx-auto">
                <div className="card p-6 md:p-8 mb-6">
                    <div className="flex items-start gap-4">
                        <Link to={createPageUrl('Admin')} className="btn btn-ghost p-2 -ml-2 -mt-2 hidden md:inline-flex">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl md:text-3xl">Send Broadcast Notifications</h1>
                            <p className="text-[var(--text-soft)] mt-2">
                                Send push notifications to all subscribed users or a specific segment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-[var(--text-main)] mb-1">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-input"
                                placeholder="New Feature Alert!"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-[var(--text-main)] mb-1">Message Body</label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="form-input h-24"
                                placeholder="Check out the new Brand Kit tool in the My Strategy hub..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-[var(--text-main)] mb-1">Link URL (Optional)</label>
                            <input
                                id="url"
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="form-input"
                                placeholder="https://app.thebminds.com/BrandKit"
                            />
                             <p className="text-xs text-[var(--text-soft)] mt-1">When the user clicks the notification, they will be taken to this URL.</p>
                        </div>
                        <div>
                            <label htmlFor="targetStage" className="block text-sm font-medium text-[var(--text-main)] mb-1">Target Audience</label>
                            <select
                                id="targetStage"
                                value={targetStage}
                                onChange={(e) => setTargetStage(e.target.value)}
                                className="form-input"
                            >
                                <option value="all">All Users</option>
                                <option value="vision">Vision Stage</option>
                                <option value="startup">Startup Stage</option>
                                <option value="growth">Growth Stage</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Notification
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {result && (
                        <div className={`mt-6 p-4 rounded-md text-sm flex items-start space-x-3 ${result.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {result.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                            <p>{result.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
