import { createClient } from 'npm:@base44/sdk@0.1.0';
import { Resend } from 'npm:resend@2.0.0';

const base44 = createClient({
    appId: Deno.env.get('BASE44_APP_ID'),
});

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
    try {
        // Authenticate the request
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response('Unauthorized', { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);

        const { recipientEmail, fromName, fromEmail, message, businessName } = await req.json();

        if (!recipientEmail || !fromName || !fromEmail || !message || !businessName) {
            return new Response(JSON.stringify({ error: 'Missing required fields.' }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const fromAddress = `The Business Minds <${Deno.env.get('RESEND_FROM_EMAIL')}>`;

        await resend.emails.send({
            from: fromAddress,
            to: recipientEmail,
            reply_to: fromEmail,
            subject: `New Inquiry for ${businessName} via The Business Minds Directory`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8B6F4E;">New Business Inquiry</h2>
                    <p>You have a new inquiry for your business listing, <strong>${businessName}</strong>, through The Business Minds directory.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${fromName}</p>
                        <p><strong>Email:</strong> ${fromEmail}</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <hr style="margin: 30px 0; border: 1px solid #eee;">
                    <p style="font-size: 12px; color: #666;">
                        This email was sent from the contact form on your Business Minds directory page. 
                        You can reply directly to this email to respond to ${fromName}.
                    </p>
                </div>
            `,
        });

        return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error sending business contact email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email. Please try again.' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});