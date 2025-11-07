import { createClient } from 'npm:@base44/sdk@0.1.0';
import { Resend } from 'npm:resend@2.0.0';

const base44 = createClient({ appId: Deno.env.get('BASE44_APP_ID') });
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const sendPartnershipRequestEmail = async (payload) => {
    const fromAddress = `The Business Minds <${Deno.env.get('RESEND_FROM_EMAIL')}>`;
    return resend.emails.send({
        from: fromAddress,
        to: payload.to,
        subject: `Accountability Partnership Request from ${payload.requesterName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #8B6F4E;">New Partnership Request</h2>
                <p>Hi ${payload.recipientName},</p>
                <p><strong>${payload.requesterName}</strong> has invited you to become an accountability partner on The Business Minds platform.</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0;">Message from ${payload.requesterName}:</h4>
                    <p style="white-space: pre-wrap;"><em>"${payload.message}"</em></p>
                </div>
                <p>You can accept or decline this request by visiting your Accountability Hub.</p>
                <a href="${payload.partnershipUrl}" style="display: inline-block; background-color: #8B6F4E; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                    Manage Requests
                </a>
            </div>
        `,
    });
};

const sendPartnershipAcceptedEmail = async (payload) => {
     const fromAddress = `The Business Minds <${Deno.env.get('RESEND_FROM_EMAIL')}>`;
    return resend.emails.send({
        from: fromAddress,
        to: payload.to,
        subject: `Your Accountability Partnership with ${payload.partnerName} is Active!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                <h2 style="color: #8B6F4E;">Partnership Accepted!</h2>
                <p>Hi ${payload.requesterName},</p>
                <p>Great news! <strong>${payload.partnerName}</strong> has accepted your request. You are now accountability partners.</p>
                <p>It's time to connect and start supporting each other on your entrepreneurial journeys. You can view your active partnerships in your Accountability Hub.</p>
                <a href="${payload.partnershipUrl}" style="display: inline-block; background-color: #8B6F4E; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                    View My Partners
                </a>
            </div>
        `,
    });
};


Deno.serve(async (req) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return new Response('Unauthorized', { status: 401 });
        const token = authHeader.split(' ')[1];
        base44.auth.setToken(token);
        
        const user = await base44.auth.me();
        if (!user) return new Response('Unauthorized', { status: 401 });

        const { action, payload } = await req.json();

        if (action === 'request') {
            const { recipientEmail, recipientName, recipientProfilePictureUrl, message } = payload;
            
            // Check for existing pending/active request
            const existing = await base44.entities.AccountabilityPartner.filter({
                $or: [
                    { requester_email: user.email, recipient_email: recipientEmail },
                    { requester_email: recipientEmail, recipient_email: user.email }
                ],
                status: { $in: ['pending', 'active'] }
            });

            if (existing.length > 0) {
                return new Response(JSON.stringify({ error: 'A pending or active partnership already exists with this member.' }), { status: 409 });
            }

            // Create partnership record
            const newPartnership = await base44.entities.AccountabilityPartner.create({
                requester_email: user.email,
                requester_name: user.full_name,
                requester_profile_picture_url: user.profile_picture_url,
                recipient_email: recipientEmail,
                recipient_name: recipientName,
                recipient_profile_picture_url: recipientProfilePictureUrl,
                status: 'pending',
                request_message: message,
            });

            const partnershipUrl = `${new URL(req.url).origin}/Accountability`;

            // Create notification
            await base44.entities.Notification.create({
                recipient_email: recipientEmail,
                type: 'partnership_request',
                title: 'New Accountability Partner Request',
                message: `${user.full_name} has sent you a partnership request.`,
                link: partnershipUrl,
            });

            // Send email
            await sendPartnershipRequestEmail({ 
                to: recipientEmail, 
                recipientName: recipientName,
                requesterName: user.full_name,
                message: message,
                partnershipUrl: partnershipUrl
            });
            
            return new Response(JSON.stringify(newPartnership), { status: 201 });
        }
        
        // This function will be expanded later to handle 'accept', 'decline', 'end'
        
        return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });

    } catch (error) {
        console.error('Error in handlePartnership function:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});