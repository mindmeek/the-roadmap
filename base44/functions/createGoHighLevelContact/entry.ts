import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { email, fullName } = await req.json();

        if (!email) {
            return Response.json(
                { success: false, error: 'Missing required field: email' },
                { status: 400 }
            );
        }

        const GOHIGHLEVEL_API_KEY = Deno.env.get("GOHIGHLEVEL_API_KEY");
        const GOHIGHLEVEL_LOCATION_ID = Deno.env.get("GOHIGHLEVEL_LOCATION_ID");

        if (!GOHIGHLEVEL_API_KEY || !GOHIGHLEVEL_LOCATION_ID) {
            console.error('GoHighLevel credentials not configured');
            return Response.json(
                { success: false, error: 'GoHighLevel API key or Location ID not set' },
                { status: 500 }
            );
        }

        const [firstName, ...lastNameParts] = fullName ? fullName.split(' ') : ['', ''];
        const lastName = lastNameParts.join(' ') || '';

        const contactData = {
            firstName: firstName,
            lastName: lastName,
            name: fullName || firstName,
            email: email,
            locationId: GOHIGHLEVEL_LOCATION_ID,
            tags: ['The Business Minds Member'],
            source: 'The Business Minds Platform'
        };

        const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GOHIGHLEVEL_API_KEY}`,
                'Version': '2021-07-28',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        if (!response.ok) {
            if (response.status === 400 && result.message?.includes("already exists")) {
                console.log(`GoHighLevel: Contact ${email} already exists`);
                return Response.json({ success: true, message: 'Contact already exists in GoHighLevel' });
            }
            console.error('GoHighLevel API Error:', result);
            return Response.json(
                { success: false, error: result.message || 'Failed to create contact in GoHighLevel' },
                { status: response.status }
            );
        }

        console.log('GoHighLevel contact created:', email);
        return Response.json({ success: true, message: 'Contact created in GoHighLevel' });

    } catch (error) {
        console.error('Error in createGoHighLevelContact:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
});