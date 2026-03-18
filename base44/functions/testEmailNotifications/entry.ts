import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

Deno.serve(async (req) => {
    const base44 = createClientFromRequest(req);
    
    try {
        // Check if user is admin
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Admin access required' 
            }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { testType } = await req.json();

        let result = {};

        switch (testType) {
            case 'basic_email':
                // Test basic email sending
                try {
                    const emailResponse = await base44.integrations.Core.SendEmail({
                        to: user.email,
                        subject: 'Test Email from The Business Minds',
                        body: `
                            <h2 style="color: #8B6F4E;">Email System Test</h2>
                            <p>Hello ${user.full_name || user.first_name || 'there'},</p>
                            <p>This is a test email to verify that our email system is working correctly.</p>
                            <p style="color: #10b981; font-weight: bold;">✅ If you're reading this, emails are being sent successfully!</p>
                            <hr style="margin: 20px 0;">
                            <p style="font-size: 12px; color: #6b7280;">Sent at: ${new Date().toLocaleString()}</p>
                            <p style="font-size: 12px; color: #6b7280;">From: The Business Minds Platform</p>
                        `
                    });
                    result = { success: true, emailSent: true };
                } catch (emailError) {
                    result = { success: false, error: emailError.message };
                }
                break;

            case 'push_notification':
                // Test push notifications by calling the sendBulkNotifications function
                try {
                    const notificationResult = await base44.asServiceRole.functions.invoke('sendBulkNotifications', {
                        title: 'Test Notification',
                        body: 'This is a test push notification to verify the system is working.',
                        url: 'https://app.thebminds.com/Dashboard',
                        targetStage: 'all'
                    });
                    
                    // Extract only the data we need to avoid circular references
                    const cleanResult = {
                        success: notificationResult?.success || true,
                        sent: notificationResult?.sent || 0,
                        failed: notificationResult?.failed || 0,
                        total: notificationResult?.total || 0
                    };
                    
                    result = { success: true, notificationSent: true, details: cleanResult };
                } catch (notificationError) {
                    result = { success: false, error: notificationError.message };
                }
                break;

            case 'both':
                // Test both email and notifications
                try {
                    // Send email first
                    let emailSuccess = false;
                    let emailError = null;
                    
                    try {
                        await base44.integrations.Core.SendEmail({
                            to: user.email,
                            subject: 'Combined Test - Email Working ✅',
                            body: `
                                <h2 style="color: #8B6F4E;">Combined System Test</h2>
                                <p>Hello ${user.full_name || user.first_name || 'there'},</p>
                                <p>This email confirms that our email system is working.</p>
                                <p>You should also receive a push notification if you're subscribed.</p>
                                <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                    <p style="margin: 0; color: #0ea5e9; font-weight: bold;">📧 Email System: Working</p>
                                    <p style="margin: 0; color: #0ea5e9;">🔔 Push Notifications: Check your notifications</p>
                                </div>
                                <hr style="margin: 20px 0;">
                                <p style="font-size: 12px; color: #6b7280;">Combined test sent at: ${new Date().toLocaleString()}</p>
                            `
                        });
                        emailSuccess = true;
                    } catch (e) {
                        emailError = e.message;
                    }

                    // Send notification
                    let notificationSuccess = false;
                    let notificationError = null;
                    let notificationDetails = null;

                    try {
                        const notificationResult = await base44.asServiceRole.functions.invoke('sendBulkNotifications', {
                            title: 'Combined Test - Push Working ✅',
                            body: 'If you received an email AND this notification, both systems are working!',
                            url: 'https://app.thebminds.com/Dashboard',
                            targetStage: 'all'
                        });
                        
                        notificationSuccess = true;
                        notificationDetails = {
                            sent: notificationResult?.sent || 0,
                            failed: notificationResult?.failed || 0,
                            total: notificationResult?.total || 0
                        };
                    } catch (e) {
                        notificationError = e.message;
                    }
                    
                    result = { 
                        success: true,
                        email: emailSuccess ? { success: true } : { success: false, error: emailError },
                        notifications: notificationSuccess ? { success: true, details: notificationDetails } : { success: false, error: notificationError }
                    };
                } catch (combinedError) {
                    result = { success: false, error: combinedError.message };
                }
                break;

            default:
                return new Response(JSON.stringify({
                    success: false,
                    error: 'Invalid test type. Use: basic_email, push_notification, or both'
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
        }

        return new Response(JSON.stringify({
            success: true,
            testType,
            result,
            message: `${testType} test completed successfully`,
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Test error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});