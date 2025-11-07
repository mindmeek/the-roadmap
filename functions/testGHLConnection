import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

const GHL_API_KEY = Deno.env.get("GOHIGHLEVEL_API_KEY");
const GHL_LOCATION_ID = Deno.env.get("GOHIGHLEVEL_LOCATION_ID");

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

        console.log('Testing GHL Connection...');
        console.log('GHL_API_KEY exists:', !!GHL_API_KEY);
        console.log('GHL_LOCATION_ID exists:', !!GHL_LOCATION_ID);

        if (!GHL_API_KEY || !GHL_LOCATION_ID) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: 'Missing GHL credentials',
                details: {
                    hasApiKey: !!GHL_API_KEY,
                    hasLocationId: !!GHL_LOCATION_ID
                }
            }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        // Test contact creation using the newer API format
        const testContact = {
            firstName: 'Test',
            lastName: 'User', 
            name: 'Test User',
            email: `test-${Date.now()}@example.com`,
            locationId: GHL_LOCATION_ID,
            tags: ['The Business Minds Member'],
            source: 'The Business Minds Platform - Test'
        };

        console.log('Attempting with new API format...');
        
        // Try the newer v1 API endpoint first
        let response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(testContact)
        });

        console.log(`GHL API Response Status (v1): ${response.status}`);
        let responseText = await response.text();
        console.log(`GHL API Response Body (v1): ${responseText}`);

        // If the first attempt fails, try the legacy endpoint
        if (!response.ok) {
            console.log('First attempt failed, trying legacy endpoint...');
            
            response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testContact)
            });

            console.log(`GHL API Response Status (legacy): ${response.status}`);
            responseText = await response.text();
            console.log(`GHL API Response Body (legacy): ${responseText}`);
        }
        
        if (!response.ok) {
            let errorDetails = responseText;
            try {
                const errorJson = JSON.parse(responseText);
                errorDetails = errorJson;
            } catch (e) {
                // Response is not JSON
            }

            return new Response(JSON.stringify({ 
                success: false,
                error: `GHL API Error: ${response.status} ${response.statusText}`,
                details: errorDetails,
                suggestion: "Your API key may be expired (issued Jan 2024). Please generate a new one from GoHighLevel Settings → Integrations → API."
            }), {
                headers: { "Content-Type": "application/json" }
            });
        }

        const ghlContact = JSON.parse(responseText);
        console.log(`Successfully created GHL test contact:`, ghlContact);

        return new Response(JSON.stringify({ 
            success: true,
            message: "Test contact created successfully in GoHighLevel",
            contact: ghlContact
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Error testing GHL connection:", error);
        return new Response(JSON.stringify({ 
            success: false,
            error: error.message,
            suggestion: "Please generate a fresh API key from GoHighLevel and update your environment variables."
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
});