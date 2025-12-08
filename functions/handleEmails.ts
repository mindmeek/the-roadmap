import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resendFrom = Deno.env.get('RESEND_FROM_EMAIL');
const FROM_EMAIL = resendFrom ? `The Business Minds <${resendFrom}>` : 'Business Minds <onboarding@thebminds.com>';

const MINDSET_QUOTES = [
  "Success isn't about being the best. It's about being better than you were yesterday.",
  "Your comfort zone is a beautiful place, but nothing grows there.",
  "The difference between who you are and who you want to be is what you do.",
  "Don't wait for opportunity. Create it.",
  "Every master was once a disaster. Keep going.",
  "Consistency beats intensity. Small daily actions compound into massive results.",
  "Your business is a reflection of your standards. Raise them."
];

function getRandomMindsetQuote() {
  return MINDSET_QUOTES[Math.floor(Math.random() * MINDSET_QUOTES.length)];
}

async function sendEmail(to, subject, htmlContent) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: htmlContent
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
}

function getEmailTemplate(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8B6F4E 0%, #6B5438 100%); padding: 30px 20px; text-align: center; }
        .logo { max-width: 180px; height: auto; }
        .content { padding: 30px 20px; }
        .quote { background: #FFF8E1; border-left: 4px solid #8B6F4E; padding: 15px; margin: 20px 0; font-style: italic; color: #555; }
        .cta { display: inline-block; background: #8B6F4E; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .cta:hover { background: #6B5438; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; }
        h2 { color: #1f2937; margin-top: 0; }
        p { margin: 15px 0; }
        @media only screen and (max-width: 600px) {
          .container { margin: 10px; }
          .content { padding: 20px 15px; }
          .cta { display: block; text-align: center; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/e1535f93c_gfg8788.png" alt="Business Minds" class="logo">
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© 2025 Business Minds. Building businesses, one day at a time.</p>
          <p><a href="https://app.thebminds.com" style="color: #8B6F4E;">Login to Dashboard</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const emailTemplates = {
  welcome1: (name) => ({
    subject: "🚀 Welcome to Your 90-Day Journey, " + name + "!",
    html: getEmailTemplate(`
      <div class="quote">"${getRandomMindsetQuote()}"</div>
      
      <h2>Welcome to Business Minds, ${name}!</h2>
      
      <p>You've just taken the most important step: <strong>you started</strong>.</p>
      
      <p>Your personalized 90-day roadmap is ready. It's not about perfection—it's about progress. Small, consistent actions compound into massive results.</p>
      
      <p><strong>Your next step:</strong> Log into your dashboard and track your first daily win. Even 1% progress today beats zero yesterday.</p>
      
      <a href="https://app.thebminds.com" class="cta">Go to My Dashboard →</a>
      
      <p>Let's build something great together.</p>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  welcome2: (name) => ({
    subject: "Day 2: The Power of Your Foundation 🏗️",
    html: getEmailTemplate(`
      <div class="quote">"${getRandomMindsetQuote()}"</div>
      
      <h2>Hey ${name},</h2>
      
      <p>Most businesses fail because they skip the foundation. You're different.</p>
      
      <p>Your <strong>Foundation Roadmap</strong> contains the same strategic tools used by million-dollar businesses: Business Model Canvas, Value Proposition, Customer Journey Map, and more.</p>
      
      <p><strong>Action for today:</strong> Complete ONE foundation tool. Start with the Ideal Client Profile—it's the cornerstone of everything else.</p>
      
      <a href="https://app.thebminds.com" class="cta">Build My Foundation →</a>
      
      <p>Clarity creates confidence. Let's get clear.</p>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  welcome3: (name) => ({
    subject: "Day 3: Join the Community 🤝",
    html: getEmailTemplate(`
      <div class="quote">"${getRandomMindsetQuote()}"</div>
      
      <h2>Hey ${name},</h2>
      
      <p>Entrepreneurship can feel lonely. It doesn't have to be.</p>
      
      <p>Inside the Business Minds Community, you'll find entrepreneurs at every stage—sharing wins, asking questions, and supporting each other's growth.</p>
      
      <p><strong>Your challenge:</strong> Introduce yourself in the community today. Share where you are and where you're headed.</p>
      
      <a href="https://app.thebminds.com" class="cta">Join the Community →</a>
      
      <p>You're not alone in this. We're building together.</p>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  dailyReminder: (name, week, stage) => ({
    subject: `✅ ${name}, Log Today's Progress (Week ${week})`,
    html: getEmailTemplate(`
      <div class="quote">"${getRandomMindsetQuote()}"</div>
      
      <h2>Hey ${name},</h2>
      
      <p>It's Week ${week} of your journey. Have you logged today's progress yet?</p>
      
      <p>Remember: <strong>Consistency beats intensity.</strong> Even 15 focused minutes today is better than zero.</p>
      
      <p>What's your 1% win for today?</p>
      
      <a href="https://app.thebminds.com" class="cta">Track My Progress →</a>
      
      <p>Keep showing up. That's how you win.</p>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  connectionRequest: (recipientName, requesterName) => ({
    subject: `${requesterName} wants to connect with you`,
    html: getEmailTemplate(`
      <h2>New Connection Request</h2>
      
      <p>Hi ${recipientName},</p>
      
      <p><strong>${requesterName}</strong> wants to connect with you on Business Minds.</p>
      
      <p>Great connections lead to great opportunities. Check out their profile and respond today.</p>
      
      <a href="https://app.thebminds.com" class="cta">View Request →</a>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  partnershipRequest: (recipientName, requesterName, message) => ({
    subject: `${requesterName} wants to partner with you 🤝`,
    html: getEmailTemplate(`
      <h2>New Partnership Request</h2>
      
      <p>Hi ${recipientName},</p>
      
      <p><strong>${requesterName}</strong> has sent you an accountability partnership request.</p>
      
      ${message ? `<p><em>"${message}"</em></p>` : ''}
      
      <p>Accountability partnerships help you stay consistent and achieve your goals faster.</p>
      
      <a href="https://app.thebminds.com" class="cta">Respond to Request →</a>
      
      <p>— The Business Minds Team</p>
    `)
  }),

  businessContact: (recipientName, senderName, senderEmail, message) => ({
    subject: `New message from ${senderName}`,
    html: getEmailTemplate(`
      <h2>Someone reached out about your business</h2>
      
      <p>Hi ${recipientName},</p>
      
      <p><strong>${senderName}</strong> (${senderEmail}) sent you a message:</p>
      
      <div class="quote">${message}</div>
      
      <p>Respond promptly—opportunities don't wait.</p>
      
      <a href="mailto:${senderEmail}" class="cta">Reply to ${senderName} →</a>
      
      <p>— The Business Minds Team</p>
    `)
  })
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, payload } = await req.json();

    let emailData;
    switch (action) {
      case 'sendWelcome1':
        emailData = emailTemplates.welcome1(payload.name);
        break;
      case 'sendWelcome2':
        emailData = emailTemplates.welcome2(payload.name);
        break;
      case 'sendWelcome3':
        emailData = emailTemplates.welcome3(payload.name);
        break;
      case 'sendDailyReminder':
        emailData = emailTemplates.dailyReminder(payload.name, payload.week, payload.stage);
        break;
      case 'sendConnectionRequest':
        emailData = emailTemplates.connectionRequest(payload.recipientName, payload.requesterName);
        break;
      case 'sendPartnershipRequest':
        emailData = emailTemplates.partnershipRequest(payload.recipientName, payload.requesterName, payload.message);
        break;
      case 'sendBusinessContact':
        emailData = emailTemplates.businessContact(payload.recipientName, payload.senderName, payload.senderEmail, payload.message);
        break;
      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 });
    }

    const result = await sendEmail(payload.to, emailData.subject, emailData.html);

    return Response.json({ success: true, result });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});