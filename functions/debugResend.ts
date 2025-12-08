import { Resend } from 'npm:resend@2.0.0';

Deno.serve(async (req) => {
    try {
        const apiKey = Deno.env.get('RESEND_API_KEY');
        let fromEmail = Deno.env.get('RESEND_FROM_EMAIL');

        if (!apiKey) {
            return Response.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
        }
        if (!fromEmail) {
            return Response.json({ error: 'Missing RESEND_FROM_EMAIL' }, { status: 500 });
        }

        // Simple heuristic to check if fromEmail likely contains a name "Name <email>"
        // If it doesn't have <>, assume it's just an email and wrap it, otherwise use as is.
        // This mirrors how different parts of the app might be interpreting it.
        let finalFrom = fromEmail;
        if (!fromEmail.includes('<')) {
             finalFrom = `Test Sender <${fromEmail}>`;
        }

        const resend = new Resend(apiKey);

        const { data, error } = await resend.emails.send({
            from: finalFrom,
            to: ['onboarding@thebminds.com'], // Sending to a safe internal address to test
            subject: 'Resend Configuration Test',
            html: '<p>If you received this, your Resend credentials are working correctly.</p>'
        });

        if (error) {
            return Response.json({ 
                status: 'error', 
                message: 'Resend API failed', 
                details: error,
                debugConfig: {
                    hasApiKey: !!apiKey,
                    fromEmailRaw: fromEmail,
                    finalFromUsed: finalFrom
                }
            }, { status: 200 }); // Return 200 so we can see the body in test tool
        }

        return Response.json({ 
            status: 'success', 
            data,
            debugConfig: {
                fromEmailRaw: fromEmail,
                finalFromUsed: finalFrom
            }
        });

    } catch (e) {
        return Response.json({ status: 'exception', message: e.message, stack: e.stack }, { status: 500 });
    }
});