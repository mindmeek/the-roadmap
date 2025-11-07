import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Authenticate the request
        const currentUser = await base44.auth.me();
        if (!currentUser || currentUser.role !== 'admin') {
            return new Response(JSON.stringify({
                success: false,
                error: 'Forbidden - Admin access required'
            }), { 
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Parse request body
        const { userId, subscriptionLevel } = await req.json();
        
        if (!userId || !subscriptionLevel) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Missing required fields: userId and subscriptionLevel are required'
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate subscription level
        const validLevels = ['free', 'business_hq'];
        if (!validLevels.includes(subscriptionLevel)) {
            return new Response(JSON.stringify({
                success: false,
                error: `Invalid subscription level. Must be one of: ${validLevels.join(', ')}`
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Update user subscription using service role for admin privileges
        const updatedUser = await base44.asServiceRole.entities.User.update(userId, {
            subscription_level: subscriptionLevel,
            free_trial_expires_on: subscriptionLevel !== 'free' ? null : undefined,
            total_ai_uses_remaining: subscriptionLevel === 'business_hq' ? -1 : undefined
        });

        console.log(`Admin ${currentUser.email} upgraded user ${userId} to ${subscriptionLevel}`);

        return new Response(JSON.stringify({
            success: true,
            user: updatedUser,
            message: `User successfully upgraded to ${subscriptionLevel}`
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Admin upgrade user error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message || 'An unexpected error occurred'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});