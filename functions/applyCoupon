import { createClient } from 'npm:@base44/sdk@0.1.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

Deno.serve(async (req) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    try {
        // Authenticate the user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Authorization required' }), {
                status: 401,
                headers
            });
        }

        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);

        const user = await base44.auth.me();
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), {
                status: 401,
                headers
            });
        }

        const { couponCode } = await req.json();

        if (!couponCode) {
            return new Response(JSON.stringify({ error: 'Coupon code is required' }), {
                status: 400,
                headers
            });
        }

        // Check if coupon code is valid
        if (couponCode.toUpperCase() === 'FREELAUNCH') {
            // Upgrade user to Launchpad level
            await base44.entities.User.update(user.id, {
                subscription_level: 'launchpad',
                free_trial_expires_on: null, // Remove trial expiry
                coupon_used: 'FREELAUNCH',
                coupon_applied_date: new Date().toISOString()
            });

            return new Response(JSON.stringify({ 
                success: true, 
                message: 'Coupon applied successfully! You now have full Launchpad access.',
                subscription_level: 'launchpad'
            }), {
                status: 200,
                headers
            });
        } else {
            return new Response(JSON.stringify({ 
                error: 'Invalid coupon code' 
            }), {
                status: 400,
                headers
            });
        }

    } catch (error) {
        console.error('Apply coupon error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers
        });
    }
});