import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { pushNotifications } from '@/functions/pushNotifications';
import { Bell, BellOff, CheckCircle, AlertCircle } from 'lucide-react';

const PushNotificationSetup = () => {
    const [permission, setPermission] = useState('default');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        initializeNotifications();
    }, []);

    const initializeNotifications = async () => {
        try {
            const userData = await User.me();
            setUser(userData);

            // Check if browser supports notifications
            if (!('Notification' in window)) {
                console.log('This browser does not support notifications');
                return;
            }

            // Check current permission status
            setPermission(Notification.permission);

            // Check if user is already subscribed
            if ('serviceWorker' in navigator && Notification.permission === 'granted') {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                setSubscribed(!!subscription);
            }
        } catch (error) {
            console.error('Error initializing notifications:', error);
        }
    };

    const requestPermission = async () => {
        setLoading(true);
        
        try {
            // Request notification permission
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                await subscribeToNotifications();
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
        
        setLoading(false);
    };

    const subscribeToNotifications = async () => {
        try {
            if (!('serviceWorker' in navigator)) {
                throw new Error('Service workers not supported');
            }

            const registration = await navigator.serviceWorker.ready;
            
            // Check if already subscribed
            let subscription = await registration.pushManager.getSubscription();
            
            if (!subscription) {
                // Subscribe to push notifications
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(await getVapidPublicKey())
                });
            }

            // Send subscription to server
            await pushNotifications({
                action: 'subscribe',
                payload: {
                    subscription: subscription.toJSON(),
                    userAgent: navigator.userAgent
                }
            });

            setSubscribed(true);
            
            // Send a test notification
            new Notification('Welcome to Business Minds!', {
                body: 'You\'ll now receive important updates and reminders.',
                icon: '/favicon.ico'
            });

        } catch (error) {
            console.error('Error subscribing to notifications:', error);
        }
    };

    const unsubscribeFromNotifications = async () => {
        setLoading(true);
        
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await subscription.unsubscribe();
                
                // Notify server
                await pushNotifications({
                    action: 'unsubscribe',
                    payload: {
                        endpoint: subscription.endpoint
                    }
                });
            }
            
            setSubscribed(false);
        } catch (error) {
            console.error('Error unsubscribing:', error);
        }
        
        setLoading(false);
    };

    const getVapidPublicKey = async () => {
        // Return the actual VAPID public key you generated
        // This needs to match the public key you set in the secrets
        return import.meta.env.VITE_VAPID_PUBLIC_KEY || '';
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    if (!('Notification' in window)) {
        return (
            <div className="card p-4 bg-yellow-50 border-yellow-200">
                <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                        Your browser doesn't support push notifications.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-md ${subscribed ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {subscribed ? 
                            <Bell className="w-5 h-5 text-green-600" /> : 
                            <BellOff className="w-5 h-5 text-gray-600" />
                        }
                    </div>
                    <div>
                        <h3 className="font-semibold text-[var(--text-main)]">Browser Notifications</h3>
                        <p className="text-sm text-[var(--text-soft)]">
                            {subscribed ? 
                                'You\'ll receive important updates and reminders' : 
                                'Get notified about important updates and reminders'
                            }
                        </p>
                    </div>
                </div>
                
                <div>
                    {permission === 'granted' ? (
                        subscribed ? (
                            <button
                                onClick={unsubscribeFromNotifications}
                                disabled={loading}
                                className="btn btn-secondary"
                            >
                                {loading ? 'Processing...' : 'Turn Off'}
                            </button>
                        ) : (
                            <button
                                onClick={subscribeToNotifications}
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Processing...' : 'Turn On'}
                            </button>
                        )
                    ) : permission === 'denied' ? (
                        <p className="text-sm text-red-600">Notifications blocked</p>
                    ) : (
                        <button
                            onClick={requestPermission}
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            {loading ? 'Requesting...' : 'Enable Notifications'}
                        </button>
                    )}
                </div>
            </div>
            
            {permission === 'granted' && subscribed && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <p className="text-sm text-green-800">
                            Notifications are enabled! You'll receive updates about new community posts, event reminders, and important announcements.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PushNotificationSetup;