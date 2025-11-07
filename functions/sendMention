
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

        const { to, memberName, posterName, postTitle, postUrl } = await req.json();
        const fromEmail = `The Business Minds <${Deno.env.get('RESEND_FROM_EMAIL')}>`;

        await resend.emails.send({
            from: fromEmail,
            to: [to],
            subject: `${posterName} mentioned you in a post`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #8B6F4E;">You were mentioned!</h2>
                    <p>Hi ${memberName},</p>
                    <p><strong>${posterName}</strong> mentioned you in the community post: <strong>"${postTitle}"</strong></p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${postUrl}" style="background-color: #8B6F4E; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Post</a>
                    </div>
                </div>
            `
        });

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in sendMention function:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
});
