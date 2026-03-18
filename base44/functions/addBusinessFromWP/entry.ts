import { createClient } from 'npm:@base44/sdk@0.1.0';

// Initialize with the ADMIN_TOKEN for secure server-to-server communication
const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
    secret: Deno.env.get('ADMIN_TOKEN'),
});

Deno.serve(async (req) => {
    // Check for a secret header to ensure the request is from your WordPress site
    const wpSecret = req.headers.get('X-WordPress-Secret');
    if (wpSecret !== 'YOUR_SECRET_KEY_HERE') { // Replace with a real secret
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const businessData = await req.json();

        // Basic validation
        if (!businessData.name || !businessData.owner_user_id) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        const newBusiness = await base44.entities.Business.create({
            name: businessData.name,
            tagline: businessData.tagline,
            industry: businessData.industry,
            description: businessData.description,
            logo_url: businessData.logo_url,
            website_url: businessData.website_url,
            city: businessData.city,
            public_email: businessData.public_email,
            public_phone: businessData.public_phone,
            owner_user_id: businessData.owner_user_id, // This should be the Base44 user ID
            is_publicly_listed: true,
        });

        // Also create the initial BusinessMember record for the owner
        await base44.entities.BusinessMember.create({
            business_id: newBusiness.id,
            user_email: businessData.public_email, // Assuming owner email is the public email
            role: 'owner',
        });

        return new Response(JSON.stringify({ success: true, businessId: newBusiness.id }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});