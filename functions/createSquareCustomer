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

        // Create Square customer if they don't have one
        if (user.square_customer_id) {
            return new Response(JSON.stringify({ 
                success: true, 
                customer_id: user.square_customer_id 
            }), {
                status: 200,
                headers
            });
        }

        const squareAccessToken = Deno.env.get('SQUARE_ACCESS_TOKEN');
        const squareLocationId = Deno.env.get('SQUARE_LOCATION_ID');

        // Create customer in Square
        const createCustomerResponse = await fetch('https://connect.squareup.com/v2/customers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${squareAccessToken}`,
                'Content-Type': 'application/json',
                'Square-Version': '2023-10-18'
            },
            body: JSON.stringify({
                given_name: user.full_name?.split(' ')[0] || 'User',
                family_name: user.full_name?.split(' ').slice(1).join(' ') || '',
                email_address: user.email
            })
        });

        const customerData = await createCustomerResponse.json();

        if (customerData.errors) {
            console.error('Square customer creation error:', customerData.errors);
            return new Response(JSON.stringify({ 
                error: 'Failed to create customer', 
                details: customerData.errors 
            }), {
                status: 400,
                headers
            });
        }

        const customerId = customerData.customer.id;

        // Update user with Square customer ID
        await base44.entities.User.update(user.id, {
            square_customer_id: customerId
        });

        return new Response(JSON.stringify({ 
            success: true, 
            customer_id: customerId 
        }), {
            status: 200,
            headers
        });

    } catch (error) {
        console.error('Create Square customer error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers
        });
    }
});