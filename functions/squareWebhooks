
import { createClient } from 'npm:@base44/sdk@0.1.0';
import { createHmac } from 'node:crypto';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

// Use admin token for webhook operations since webhooks don't have user auth
const ADMIN_TOKEN = Deno.env.get('ADMIN_TOKEN');
if (ADMIN_TOKEN) {
    base44.auth.setToken(ADMIN_TOKEN);
}

Deno.serve(async (req) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Square-Signature');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers
        });
    }

    try {
        const body = await req.text();
        const signature = req.headers.get('X-Square-Signature');
        
        // Verify webhook signature
        const webhookSignatureKey = Deno.env.get('SQUARE_WEBHOOK_SIGNATURE_KEY');
        if (!webhookSignatureKey || !signature) {
            console.error('Missing webhook signature or key');
            return new Response(JSON.stringify({ error: 'Invalid signature' }), {
                status: 401,
                headers
            });
        }

        // Verify the webhook signature
        const expectedSignature = createHmac('sha256', webhookSignatureKey)
            .update(body)
            .digest('base64');

        if (signature !== expectedSignature) {
            console.error('Signature verification failed');
            return new Response(JSON.stringify({ error: 'Invalid signature' }), {
                status: 401,
                headers
            });
        }

        const event = JSON.parse(body);
        console.log('Square webhook event received:', event.type);

        // Handle different Square webhook events
        switch (event.type) {
            case 'subscription.created':
            case 'subscription.updated':
                await handleSubscriptionChange(event.data.object.subscription);
                break;
            case 'subscription.canceled':
                await handleSubscriptionCancellation(event.data.object.subscription);
                break;
            case 'invoice.payment_made':
                await handlePaymentSuccess(event.data.object.invoice);
                break;
            case 'invoice.payment_failed':
                await handlePaymentFailure(event.data.object.invoice);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers
        });

    } catch (error) {
        console.error('Square webhook error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers
        });
    }
});

async function handleSubscriptionChange(subscription) {
    try {
        const customerId = subscription.buyer_id;
        const status = subscription.status;
        const planVariationId = subscription.plan_variation_id;

        // Find user by Square customer ID
        const users = await base44.entities.User.filter({ square_customer_id: customerId });
        
        if (users.length === 0) {
            console.error(`No user found with Square customer ID: ${customerId}`);
            return;
        }

        const user = users[0];
        
        // Determine subscription level based on plan variation ID
        let subscriptionLevel = 'free';
        if (status === 'ACTIVE') {
            // The Launchpad Plans (Monthly and Yearly)
            if (planVariationId === 'ZSXG4UNOXUSOTXYTMTDJM62T' || planVariationId === 'CIWGWTXPRDYLBAPOZMQ3CJRH') {
                subscriptionLevel = 'launchpad';
            } else if (planVariationId === 'YOUR_BUSINESS_HQ_PLAN_VARIATION_ID') {
                subscriptionLevel = 'business_hq';
            }
        }

        // Update user's subscription level and redirect them back to the platform
        await base44.entities.User.update(user.id, {
            subscription_level: subscriptionLevel,
            square_customer_id: customerId,
            free_trial_expires_on: null // Remove trial expiry for paid users
        });

        console.log(`Updated user ${user.email} to subscription level: ${subscriptionLevel}`);

        // Note: Square will handle the redirect back to your success page automatically
        // Make sure your Square checkout is configured with the correct redirect URLs

    } catch (error) {
        console.error('Error handling subscription change:', error);
    }
}

async function handleSubscriptionCancellation(subscription) {
    try {
        const customerId = subscription.buyer_id;

        // Find user by Square customer ID
        const users = await base44.entities.User.filter({ square_customer_id: customerId });
        
        if (users.length === 0) {
            console.error(`No user found with Square customer ID: ${customerId}`);
            return;
        }

        const user = users[0];

        // Downgrade user to free tier
        await base44.entities.User.update(user.id, {
            subscription_level: 'free'
        });

        console.log(`Downgraded user ${user.email} to free tier due to cancellation`);

    } catch (error) {
        console.error('Error handling subscription cancellation:', error);
    }
}

async function handlePaymentSuccess(invoice) {
    try {
        const customerId = invoice.primary_recipient?.customer_id;
        
        if (!customerId) {
            console.log('No customer ID found in payment success event');
            return;
        }

        // Find user by Square customer ID
        const users = await base44.entities.User.filter({ square_customer_id: customerId });
        
        if (users.length === 0) {
            console.error(`No user found with Square customer ID: ${customerId}`);
            return;
        }

        const user = users[0];
        console.log(`Payment successful for user: ${user.email}`);

        // You could send a thank you email or update payment history here
        
    } catch (error) {
        console.error('Error handling payment success:', error);
    }
}

async function handlePaymentFailure(invoice) {
    try {
        const customerId = invoice.primary_recipient?.customer_id;
        
        if (!customerId) {
            console.log('No customer ID found in payment failure event');
            return;
        }

        // Find user by Square customer ID
        const users = await base44.entities.User.filter({ square_customer_id: customerId });
        
        if (users.length === 0) {
            console.error(`No user found with Square customer ID: ${customerId}`);
            return;
        }

        const user = users[0];
        console.log(`Payment failed for user: ${user.email}`);

        // You could send a payment failure notification email here
        
    } catch (error) {
        console.error('Error handling payment failure:', error);
    }
}
