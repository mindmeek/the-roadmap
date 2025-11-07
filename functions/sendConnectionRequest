
import { createClient } from 'npm:@base44/sdk@0.1.0';
import { Resend } from 'npm:resend@2.0.0';

const base44 = createClient({ appId: Deno.env.get('BASE44_APP_ID') });
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return new Response('Unauthorized', { status: 401 });
        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);
        const user = await base44.auth.me();
        if (!user) return new Response('Unauthorized', { status: 401 });

        const { to, fromName, message } = await req.json();

        // Validate inputs
        if (!to || !fromName) {
            return new Response(JSON.stringify({ error: 'Missing required fields: to, fromName' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Ensure we have a valid from email
        // Get the raw email from environment variable first
        const resendFromEmailRaw = Deno.env.get('RESEND_FROM_EMAIL');
        if (!resendFromEmailRaw) {
            return new Response(JSON.stringify({ error: 'RESEND_FROM_EMAIL not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const baseUrl = Deno.env.get('BASE_URL') || 'https://go.thebminds.com';
        // Construct the 'from' email in the desired format "Name <email@example.com>"
        const fromEmail = `The Business Minds <${resendFromEmailRaw}>`;

        const emailResult = await resend.emails.send({
            from: fromEmail,
            to: [to],
            subject: `${fromName} wants to connect with you on The Business Minds`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Connection Request</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background-color: white; border-radius: 8px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e1535f93c_gfg8788.png" alt="The Business Minds" style="height: 60px;">
                            </div>
                            
                            <h2 style="color: #8B6F4E; text-align: center; margin-bottom: 20px;">New Connection Request</h2>
                            
                            <p style="color: #374151; font-size: 16px; line-height: 1.6;"><strong>${fromName}</strong> wants to connect with you on The Business Minds!</p>
                            
                            ${message ? `
                            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #8B6F4E;">
                                <p style="color: #374151; font-style: italic; margin: 0;">"${message}"</p>
                            </div>
                            ` : ''}
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${baseUrl}/Profile" 
                                   style="background-color: #8B6F4E; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                    View Request
                                </a>
                            </div>
                            
                            <p style="color: #6B7280; font-size: 14px; text-align: center;">
                                This connection request was sent via The Business Minds platform.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `${fromName} wants to connect with you on The Business Minds! ${message ? `Message: "${message}"` : ''} Visit ${baseUrl}/Profile to respond.`
        });

        return new Response(JSON.stringify({ 
            success: true,
            messageId: emailResult.data?.id 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in sendConnectionRequest function:', error);
        return new Response(JSON.stringify({ 
            error: error.message,
            details: error.response?.data || error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});
