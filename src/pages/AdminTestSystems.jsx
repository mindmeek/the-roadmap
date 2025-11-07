
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Mail, Bell, Zap, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { testEmailNotifications } from '@/functions/testEmailNotifications';
import { testGHLConnection as testGHLConnectionApi } from '@/functions/testGHLConnection'; // Renamed to avoid conflict with local function

export default function AdminTestSystems() {
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState({});
    const [ghlTesting, setGhlTesting] = useState(false);
    const [ghlResults, setGhlResults] = useState('');
    const [upgradeTestEmail, setUpgradeTestEmail] = useState('');
    const [upgradeTesting, setUpgradeTesting] = useState(false);
    const [upgradeResults, setUpgradeResults] = useState('');

    const runTest = async (testType) => {
        setLoading(prev => ({ ...prev, [testType]: true }));
        setResults(prev => ({ ...prev, [testType]: null }));

        try {
            const response = await testEmailNotifications({ testType });
            setResults(prev => ({ 
                ...prev, 
                [testType]: { 
                    success: response.data.success, 
                    message: response.data.message,
                    details: response.data.result
                }
            }));
        } catch (error) {
            setResults(prev => ({ 
                ...prev, 
                [testType]: { 
                    success: false, 
                    message: error.message || 'Test failed'
                }
            }));
        } finally {
            setLoading(prev => ({ ...prev, [testType]: false }));
        }
    };

    const testGHLConnection = async () => {
        setGhlTesting(true);
        setGhlResults('');
        try {
            const { data } = await testGHLConnectionApi(); // Use the imported API function
            if (data.success) {
                setGhlResults(`✅ SUCCESS: ${data.message}\n\nContact created: ${JSON.stringify(data.contact, null, 2)}`);
            } else {
                setGhlResults(`❌ FAILED: ${data.error}\n\nDetails: ${JSON.stringify(data.details || {}, null, 2)}`);
            }
        } catch (error) {
            console.error('GHL test error:', error);
            setGhlResults(`❌ ERROR: ${error.message}`);
        } finally {
            setGhlTesting(false);
        }
    };

    const testUpgradeFlow = async () => {
        if (!upgradeTestEmail.trim()) {
            alert('Please enter a test email address');
            return;
        }

        setUpgradeTesting(true);
        setUpgradeResults('');
        try {
            const { testGHLUpgrade } = await import('@/functions/testGHLUpgrade');
            const { data } = await testGHLUpgrade({ testEmail: upgradeTestEmail.trim() });
            
            if (data.success) {
                setUpgradeResults(`✅ SUCCESS: ${data.message}\n\nUser Before:\n- Email: ${data.user_before.email}\n- Subscription: ${data.user_before.subscription_level}\n- AI Uses: ${data.user_before.total_ai_uses_remaining}\n\nUser After:\n- Email: ${data.user_after.email}\n- Subscription: ${data.user_after.subscription_level}\n- AI Uses: ${data.user_after.total_ai_uses_remaining}\n\nUpgrade Successful: ${data.upgrade_successful ? 'YES' : 'NO'}`);
            } else {
                setUpgradeResults(`❌ FAILED: ${data.error}`);
            }
        } catch (error) {
            console.error('Upgrade test error:', error);
            setUpgradeResults(`❌ ERROR: ${error.message}`);
        } finally {
            setUpgradeTesting(false);
        }
    };

    const TestCard = ({ testType, icon: Icon, title, description, buttonText }) => {
        const isLoading = loading[testType];
        const result = results[testType];

        return (
            <div className="card p-6">
                <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                        <Icon className="w-6 h-6 text-[var(--primary-gold)]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">{title}</h3>
                        <p className="text-[var(--text-soft)] mb-4">{description}</p>
                        
                        <button
                            onClick={() => runTest(testType)}
                            disabled={isLoading}
                            className="btn btn-primary mb-4"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Running Test...
                                </>
                            ) : (
                                buttonText
                            )}
                        </button>

                        {result && (
                            <div className={`p-4 rounded-md text-sm ${
                                result.success 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                <div className="flex items-center space-x-2 mb-2">
                                    {result.success ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : (
                                        <AlertTriangle className="w-4 h-4" />
                                    )}
                                    <span className="font-medium">
                                        {result.success ? 'Test Passed' : 'Test Failed'}
                                    </span>
                                </div>
                                <p>{result.message}</p>
                                {result.details && (
                                    <pre className="mt-2 text-xs opacity-75">
                                        {JSON.stringify(result.details, null, 2)}
                                    </pre>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="px-4 pb-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="card p-6">
                    <div className="flex items-center space-x-4">
                        <Link to={createPageUrl('Admin')} className="btn btn-ghost p-2">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">System Tests</h1>
                            <p className="text-[var(--text-soft)]">Test email and notification systems</p>
                        </div>
                    </div>
                </div>

                {/* GoHighLevel Test */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">GoHighLevel Integration Test</h2>
                    <p className="text-[var(--text-soft)] mb-4">
                        This will attempt to create a brand new test contact in your GoHighLevel account to verify the connection and API keys are working correctly.
                    </p>
                    
                    <button 
                        onClick={testGHLConnection}
                        disabled={ghlTesting}
                        className="btn btn-primary mb-4"
                    >
                        {ghlTesting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Testing GHL Connection...
                            </>
                        ) : (
                            'Run GHL Connection Test'
                        )}
                    </button>

                    {ghlResults && (
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <h4 className="font-semibold mb-2">Test Results:</h4>
                            <pre className="text-sm whitespace-pre-wrap">{ghlResults}</pre>
                        </div>
                    )}
                </div>

                {/* GoHighLevel Upgrade Flow Test */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">GoHighLevel Upgrade Flow Test</h2>
                    <p className="text-[var(--text-soft)] mb-4">
                        Test the complete upgrade flow by simulating a GoHighLevel webhook that would be sent when a user gets the "launchunlimited" tag.
                    </p>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Test User Email:</label>
                        <input
                            type="email"
                            value={upgradeTestEmail}
                            onChange={(e) => setUpgradeTestEmail(e.target.value)}
                            placeholder="Enter email of existing user to test upgrade"
                            className="form-input w-full mb-3"
                        />
                        <p className="text-xs text-[var(--text-soft)]">
                            Enter the email of an existing user in your system. The test will simulate them getting the "launchunlimited" tag in GoHighLevel.
                        </p>
                    </div>
                    
                    <button 
                        onClick={testUpgradeFlow}
                        disabled={upgradeTesting || !upgradeTestEmail.trim()}
                        className="btn btn-primary mb-4"
                    >
                        {upgradeTesting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Testing Upgrade Flow...
                            </>
                        ) : (
                            'Test Upgrade Flow'
                        )}
                    </button>

                    {upgradeResults && (
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <h4 className="font-semibold mb-2">Test Results:</h4>
                            <pre className="text-sm whitespace-pre-wrap">{upgradeResults}</pre>
                        </div>
                    )}
                </div>

                <TestCard
                    testType="basic_email"
                    icon={Mail}
                    title="Email System Test"
                    description="Test basic email sending via Resend integration. You'll receive a test email at your admin email address."
                    buttonText="Test Email System"
                />

                <TestCard
                    testType="push_notification"
                    icon={Bell}
                    title="Push Notification Test"
                    description="Test push notifications to all subscribed users. This will send a test notification to everyone."
                    buttonText="Test Push Notifications"
                />

                <TestCard
                    testType="both"
                    icon={Zap}
                    title="Combined System Test"
                    description="Test both email and push notification systems simultaneously to verify full communication stack."
                    buttonText="Test Both Systems"
                />
            </div>
        </div>
    );
}
