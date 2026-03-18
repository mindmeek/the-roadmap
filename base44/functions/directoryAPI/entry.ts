import { createClient } from 'npm:@base44/sdk@0.1.0';

// Initialize the client with the Admin Token for secure server-side access
const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
    secret: Deno.env.get('ADMIN_TOKEN'), // Using the reliable admin token
});

Deno.serve(async (req) => {
    // Standard headers to allow the request from any website
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle pre-flight requests for CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    try {
        // Fetch all publicly listed businesses, sorted by most recent
        const allBusinesses = await base44.entities.Business.filter({ is_publicly_listed: true }, '-created_date', 500);
        
        // Fetch all members to calculate member counts for each business
        const allMembers = await base44.entities.BusinessMember.list('-created_date', 1000);

        // Process the data into a clean format
        const businessesWithData = allBusinesses.map(business => {
            const memberCount = allMembers.filter(member => member.business_id === business.id).length;
            return {
                id: business.id,
                name: business.name || 'Unnamed Business',
                logo_url: business.logo_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa6078871_LargeAppIcon.png',
                tagline: business.tagline || '',
                industry: business.industry || '',
                description: business.description || '',
                city: business.city || '',
                website_url: business.website_url || '',
                public_email: business.public_email || '',
                public_phone: business.public_phone || '',
                member_count: memberCount,
                services: business.services || [],
            };
        });

        // Send the successful JSON response
        return new Response(JSON.stringify({
            success: true,
            count: businessesWithData.length,
            businesses: businessesWithData,
        }), { status: 200, headers });

    } catch (error) {
        console.error('Error in directory API:', error);
        // Send a detailed error response if something goes wrong
        return new Response(JSON.stringify({ 
            success: false,
            error: 'Failed to retrieve business directory data.',
            details: error.message,
        }), { status: 500, headers });
    }
});