import { createClient } from 'npm:@base44/sdk@0.1.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

Deno.serve(async (req) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    try {
        // Use the user's authentication token from the request
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Unauthorized - Missing authentication',
                details: 'Authentication token is required',
                data: []
            }), {
                status: 401,
                headers: headers
            });
        }

        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);

        // Verify the user is authenticated
        const currentUser = await base44.auth.me();
        if (!currentUser) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Unauthorized - Invalid token',
                details: 'Invalid authentication token',
                data: []
            }), {
                status: 401,
                headers: headers
            });
        }

        // Get all users who have completed onboarding
        const allUsers = await base44.entities.User.filter(
            { onboarding_completed: true },
            '-created_date',
            500
        );

        // Filter for users who have some community activity indicators
        // Include users who have:
        // - A bio (indicating they've filled out their profile)
        // This ensures only "active" members appear in the directory
        
        const activeMembers = allUsers.filter(user => {
            return user.bio && user.bio.trim().length > 0;
        });

        // Format the data to match what the Member Directory expects
        const formattedMembers = activeMembers.map(user => ({
            id: user.id,
            full_name: user.full_name || 'Unknown',
            email: user.email,
            bio: user.bio || '',
            business_name: user.business_name || '',
            city: user.city || '',
            profile_picture_url: user.profile_picture_url || '',
            cover_picture_url: user.cover_picture_url || '',
            entrepreneurship_stage: user.entrepreneurship_stage || 'vision',
            created_date: user.created_date
        }));

        return new Response(JSON.stringify({
            success: true,
            data: formattedMembers,
            count: formattedMembers.length
        }), {
            status: 200,
            headers: headers
        });

    } catch (error) {
        console.error('Error in getMembers function:', error);
        return new Response(JSON.stringify({
            success: false,
            error: 'Failed to load member directory',
            details: error.message,
            data: [] // Always return an empty array as fallback
        }), {
            status: 500,
            headers: headers
        });
    }
});