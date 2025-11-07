import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Sparkles, Send, Loader2, Copy, Check, Save, Heart, BookOpen } from 'lucide-react';
import { aiCopilot } from '@/functions/aiCopilot';
import { AIAssistantNote } from '@/entities/AIAssistantNote';

const assistantGuides = {
  website_homepage: {
    title: 'Website Homepage Assistant',
    description: 'Create a compelling homepage that converts visitors into customers',
    sections: [
      {
        title: 'Key Elements of a High-Converting Homepage',
        content: `Your homepage is your digital storefront and often the first impression potential customers have of your business. Here's what makes a homepage convert:

• **Clear Value Proposition**: Within 5 seconds, visitors should understand what you do and why it matters to them
• **Compelling Headline**: A benefit-focused headline that speaks directly to your target audience's main pain point
• **Supporting Subheadline**: Expand on your main headline with additional context and benefits
• **Social Proof**: Testimonials, logos, reviews, or statistics that build credibility
• **Clear Call-to-Action**: One primary action you want visitors to take
• **Visual Hierarchy**: Guide the eye through your content in a logical flow`
      },
      {
        title: 'Homepage Structure Template',
        content: `**Above the Fold:**
• Logo and navigation
• Compelling headline
• Supporting subheadline
• Primary call-to-action button
• Hero image or video

**Middle Section:**
• Brief explanation of your services/products
• Key benefits (not features)
• Social proof elements
• Secondary call-to-action

**Lower Section:**
• About us summary
• Additional testimonials
• Contact information
• Footer with links and legal pages`
      },
      {
        title: 'Writing Tips for Homepage Copy',
        content: `• **Focus on Benefits**: Instead of "We offer accounting services," try "Get your weekends back with hassle-free bookkeeping"
• **Use Active Voice**: "We help businesses grow" vs "Businesses are helped by us"
• **Include Keywords**: Naturally incorporate terms your customers search for
• **Create Urgency**: "Limited time offer" or "Join 1,000+ businesses already growing"
• **Address Objections**: Anticipate and address common concerns upfront
• **Keep It Scannable**: Use bullet points, short paragraphs, and whitespace`
      }
    ],
    prompts: [
      "Help me write a compelling headline for my [business type] that addresses [target audience's main problem]",
      "Create a value proposition for my business that explains what we do and why customers should choose us",
      "Write homepage copy that converts visitors into leads for my [industry] business",
      "Suggest social proof elements I could include on my homepage to build credibility"
    ]
  },

  product_descriptions: {
    title: 'Product Descriptions Assistant',
    description: 'Write persuasive product copy that highlights benefits and drives sales',
    sections: [
      {
        title: 'Psychology of Product Descriptions',
        content: `Effective product descriptions don't just list features—they paint a picture of how the customer's life improves with your product:

• **Emotional Connection**: Connect with feelings and aspirations, not just logic
• **Benefit-Focused**: Transform features into meaningful benefits
• **Sensory Language**: Help customers imagine using the product
• **Social Proof Integration**: Include reviews, ratings, and testimonials
• **Urgency and Scarcity**: Create reasons to buy now, not later
• **Address Objections**: Anticipate and overcome common concerns`
      },
      {
        title: 'Product Description Formula',
        content: `**Opening Hook** (1-2 sentences)
Start with the main benefit or transformation

**Problem/Solution** (2-3 sentences)
Identify the customer's pain point and position your product as the solution

**Key Benefits** (3-5 bullet points)
Focus on outcomes, not features

**Features That Matter** (2-3 bullet points)
Include technical details that support the benefits

**Social Proof** (1-2 sentences)
Include testimonials, reviews, or usage statistics

**Call-to-Action**
Clear, action-oriented closing statement`
      },
      {
        title: 'Advanced Copywriting Techniques',
        content: `• **Power Words**: Use words like "exclusive," "proven," "guaranteed," "instant"
• **Specificity**: Instead of "fast," use "in 24 hours" or "3x faster"
• **Storytelling**: Share customer success stories or use scenarios
• **Comparison**: Show how your product compares to alternatives
• **Risk Reversal**: Offer guarantees or trial periods
• **Future Pacing**: Help customers imagine their improved future state`
      }
    ],
    prompts: [
      "Write a compelling product description for my [product] that focuses on benefits for [target customer]",
      "Help me transform these product features into customer benefits: [list features]",
      "Create urgency in my product descriptions without sounding pushy",
      "Write product copy that addresses common objections for [product type]"
    ]
  },

  about_us_page: {
    title: 'About Us Page Assistant',
    description: 'Tell your unique story and build a strong connection with your audience',
    sections: [
      {
        title: 'Why Your About Page Matters',
        content: `Your About page is often the second-most visited page on your website. People want to know who they're doing business with:

• **Trust Building**: Personal stories create emotional connections
• **Differentiation**: Your story is uniquely yours—use it as a competitive advantage
• **Relatability**: Share struggles and challenges your audience faces
• **Credibility**: Highlight expertise, experience, and achievements
• **Mission Alignment**: Show customers you share their values
• **Personality**: Let your brand personality shine through`
      },
      {
        title: 'About Page Structure',
        content: `**Opening Statement** (1-2 sentences)
What you do and who you serve

**Origin Story** (2-3 paragraphs)
Why you started, the problem you noticed, your "aha" moment

**Mission & Values** (1-2 paragraphs)
What drives you and what you believe in

**Credentials & Expertise** (1 paragraph)
Relevant experience, education, achievements

**Personal Touch** (1 paragraph)
Hobbies, family, fun facts that humanize you

**Call-to-Action**
How people can work with you or get in touch`
      },
      {
        title: 'Storytelling Best Practices',
        content: `• **Start With Why**: Begin with your motivation, not your history
• **Include Struggle**: Share challenges you've overcome—it builds relatability
• **Focus on Transformation**: Show how you've grown and what you've learned
• **Customer-Centric**: Weave in how your story benefits your customers
• **Authentic Voice**: Write like you speak—avoid corporate jargon
• **Visual Elements**: Include photos of yourself, your team, or your workspace`
      }
    ],
    prompts: [
      "Help me write my origin story that connects with [target audience] and explains why I started my business",
      "Create an About Us page that builds trust and shows my expertise in [industry]",
      "Write about my mission and values in a way that resonates with [ideal customer]",
      "Help me add personality to my About page while maintaining professionalism"
    ]
  },

  professional_bio: {
    title: 'Professional Bio Assistant',
    description: 'Create a powerful professional bio that builds credibility and opens doors',
    sections: [
      {
        title: 'Types of Professional Bios',
        content: `Different platforms and situations require different bio lengths and styles:

**Short Bio (50-100 words)**
• Social media profiles
• Speaker introductions
• Conference listings
• Email signatures

**Medium Bio (150-300 words)**
• Website About pages
• Professional directories
• Proposal submissions
• LinkedIn profiles

**Long Bio (300-500 words)**
• Detailed speaker bios
• Author profiles
• Board member introductions
• Comprehensive company profiles`
      },
      {
        title: 'Bio Writing Formula',
        content: `**Opening Statement**
Your current role and primary expertise

**Achievements & Credentials**
Most impressive accomplishments, education, certifications

**Experience & Expertise**
Key areas where you excel and years of experience

**Personal Mission/Why**
What drives you and your passion for your work

**Notable Clients/Projects**
Recognizable names or impressive results

**Personal Touch**
One interesting fact about you outside of work

**Call-to-Action**
How people can connect with you`
      },
      {
        title: 'Bio Writing Tips',
        content: `• **Third Person**: Professional bios are typically written in third person
• **Active Voice**: Use strong, active language that shows impact
• **Quantify Results**: Include specific numbers, percentages, or outcomes
• **Keywords**: Include industry terms people might search for
• **Personality**: Balance professionalism with approachability
• **Update Regularly**: Keep your bio current with recent achievements
• **Proofread**: Ensure perfect grammar and spelling—this represents you`
      }
    ],
    prompts: [
      "Write a professional bio for my [industry] expertise that highlights my [key achievement]",
      "Create a LinkedIn bio that positions me as a [role] and attracts [target audience]",
      "Help me write a speaker bio that builds credibility and shows my expertise in [topic]",
      "Transform my resume into a compelling narrative bio that tells my professional story"
    ]
  },

  email_sequences: {
    title: 'Email Sequences Assistant',
    description: 'Develop automated email campaigns that nurture leads and engage subscribers',
    sections: [
      {
        title: 'Types of Email Sequences',
        content: `**Welcome Series** (3-5 emails)
• Introduce yourself and your brand
• Set expectations for future emails
• Provide immediate value
• Guide new subscribers to key content

**Nurture Sequence** (5-10 emails)
• Build trust and authority
• Share valuable content
• Address common objections
• Gradually introduce offers

**Sales Sequence** (3-7 emails)
• Present your offer
• Build urgency and scarcity
• Share testimonials and social proof
• Handle objections and close the sale

**Onboarding Sequence** (3-6 emails)
• Help customers get started
• Ensure successful product adoption
• Provide tips and best practices
• Encourage engagement and feedback`
      },
      {
        title: 'Email Sequence Best Practices',
        content: `**Subject Lines That Get Opened:**
• Create curiosity without clickbait
• Use personalization when appropriate
• Keep under 50 characters for mobile
• Test different approaches

**Content That Converts:**
• One main idea per email
• Clear, scannable formatting
• Strong call-to-action
• Mobile-friendly design

**Timing and Frequency:**
• Welcome email: Immediately
• Follow-up emails: 24-48 hours apart
• Adjust based on engagement rates
• Include unsubscribe options`
      },
      {
        title: 'Sequence Planning Worksheet',
        content: `**Email 1: Welcome & Deliver Lead Magnet**
• Thank them for subscribing
• Deliver promised content
• Set expectations
• Introduce yourself briefly

**Email 2: Value-First Content**
• Share helpful tip or insight
• No sales pitch
• Build trust and authority
• Encourage engagement

**Email 3: Social Proof & Story**
• Share customer success story
• Include testimonials
• Show results you've achieved
• Continue building trust

**Email 4: Address Common Problem**
• Identify pain point
• Provide solution or insight
• Position your expertise
• Soft introduction of your offer

**Email 5: Present Your Solution**
• Introduce your product/service
• Focus on benefits and transformation
• Include clear call-to-action
• Address initial objections`
      }
    ],
    prompts: [
      "Create a 5-email welcome sequence for new subscribers to my [business type] email list",
      "Write email subject lines that get high open rates for [industry] audiences",
      "Help me plan a nurture sequence that builds trust before presenting my [product/service]",
      "Create compelling email copy that converts subscribers into customers for [specific offer]"
    ]
  },

  social_media_posts: {
    title: 'Social Media Posts Assistant',
    description: 'Create engaging social media content that builds your brand and community',
    sections: [
      {
        title: 'Platform-Specific Best Practices',
        content: `**LinkedIn:**
• Professional tone with personality
• Industry insights and thought leadership
• 1,300-character limit for posts
• Use relevant hashtags (3-5)
• Share articles and professional updates

**Facebook:**
• Conversational and community-focused
• Mix of personal and business content
• Visual content performs well
• Encourage comments and engagement
• Use Facebook Groups for networking

**Instagram:**
• Visual storytelling is key
• Behind-the-scenes content
• Use relevant hashtags (5-10)
• Stories for daily updates
• Reels for increased reach

**Twitter:**
• Concise, timely content
• Join trending conversations
• Use relevant hashtags (1-2)
• Retweet and engage with others
• Share quick tips and insights`
      },
      {
        title: 'Content Types That Engage',
        content: `**Educational Posts:**
• How-to guides and tutorials
• Industry tips and best practices
• Myth-busting content
• Tool recommendations

**Behind-the-Scenes:**
• Workspace photos
• Team introductions
• Process walkthroughs
• Day-in-the-life content

**Social Proof:**
• Customer testimonials
• Case studies and results
• Awards and recognition
• Media mentions

**Interactive Content:**
• Questions and polls
• Fill-in-the-blank posts
• This or that comparisons
• Caption contests

**Inspirational/Motivational:**
• Success stories
• Overcoming challenges
• Industry predictions
• Personal insights`
      },
      {
        title: 'Content Calendar Planning',
        content: `**Weekly Content Mix:**
• Monday: Motivational/Inspirational
• Tuesday: Educational/How-to
• Wednesday: Behind-the-scenes
• Thursday: Industry news/trends
• Friday: Fun/personal content

**Monthly Themes:**
• Week 1: Problem awareness
• Week 2: Solution education
• Week 3: Social proof/testimonials
• Week 4: Direct promotion

**Engagement Strategies:**
• Ask questions in every post
• Respond to all comments quickly
• Share user-generated content
• Create community hashtags
• Host live Q&As regularly`
      }
    ],
    prompts: [
      "Create a week's worth of LinkedIn posts for my [industry] business that build thought leadership",
      "Write engaging Instagram captions for my [business type] that encourage interaction",
      "Help me create social media content that educates my audience about [topic]",
      "Generate social proof posts that showcase customer success stories for [product/service]"
    ]
  },

  landing_pages: {
    title: 'Landing Pages Assistant',
    description: 'Design high-converting landing pages for your marketing campaigns',
    sections: [
      {
        title: 'Landing Page Fundamentals',
        content: `A landing page has one job: to convert visitors into leads or customers. Here's what makes them work:

**Single Focus:**
• One goal per page
• Remove navigation distractions
• Clear path to conversion

**Above the Fold Elements:**
• Compelling headline
• Supporting subheadline
• Hero image or video
• Primary call-to-action
• Trust indicators

**Social Proof:**
• Customer testimonials
• Reviews and ratings
• Client logos
• Usage statistics
• Security badges`
      },
      {
        title: 'High-Converting Landing Page Structure',
        content: `**Hero Section:**
• Benefit-driven headline
• Supporting subheadline
• Hero image/video
• Primary CTA button

**Benefits Section:**
• 3-5 key benefits (not features)
• Icons or images for each
• Brief explanations

**Social Proof Section:**
• 2-3 customer testimonials
• Client logos or statistics
• Trust badges

**Features Section:**
• How it works (3-step process)
• Key features that support benefits
• Additional images or screenshots

**FAQ Section:**
• Address common objections
• 3-5 frequently asked questions
• Build confidence in your offer

**Final CTA Section:**
• Repeat your main call-to-action
• Add urgency or scarcity
• Guarantee or risk reversal`
      },
      {
        title: 'Optimization Tips',
        content: `**Headlines That Convert:**
• Focus on the main benefit
• Use specific numbers when possible
• Create curiosity or urgency
• Test different variations

**Call-to-Action Best Practices:**
• Use action-oriented language
• Create contrast with color
• Make buttons large and clickable
• Test button copy variations

**Mobile Optimization:**
• Fast loading times
• Thumb-friendly buttons
• Readable font sizes
• Simplified forms
• Vertical layout optimization`
      }
    ],
    prompts: [
      "Write a high-converting landing page for my [product/service] that targets [audience]",
      "Create compelling headlines for a landing page promoting [specific offer]",
      "Help me write copy that addresses objections for [product] and builds trust",
      "Generate social proof elements and testimonials for my [industry] landing page"
    ]
  },

  blog_articles: {
    title: 'Blog Articles Assistant',
    description: 'Write valuable, SEO-optimized blog posts to attract and educate your audience',
    sections: [
      {
        title: 'Blog Article Types That Drive Traffic',
        content: `**How-To Guides:**
• Step-by-step instructions
• Problem-solving content
• Tutorial-style posts
• Process explanations

**List Posts:**
• "X Ways to..." format
• Tool recommendations
• Tips and strategies
• Resource roundups

**Case Studies:**
• Customer success stories
• Behind-the-scenes processes
• Results and outcomes
• Lessons learned

**Industry Insights:**
• Trend analysis
• Opinion pieces
• Predictions and forecasts
• Commentary on news

**Comparison Posts:**
• Product/service comparisons
• Pros and cons analysis
• "X vs Y" format
• Buyer's guides`
      },
      {
        title: 'SEO-Optimized Article Structure',
        content: `**Title Optimization:**
• Include target keyword naturally
• 60 characters or less for Google
• Create curiosity or promise value
• Use power words when appropriate

**Article Structure:**
• Compelling introduction (hook + preview)
• H2 and H3 subheadings throughout
• Short paragraphs (2-3 sentences)
• Bullet points and numbered lists
• Internal and external links

**SEO Elements:**
• Meta description (155 characters)
• Alt text for images
• URL slug with keywords
• Related keyword variations
• Schema markup when relevant`
      },
      {
        title: 'Content Planning Strategy',
        content: `**Keyword Research:**
• Use tools like Google Keyword Planner
• Target long-tail keywords
• Analyze competitor content
• Consider search intent

**Content Pillars:**
• Identify 3-4 main topics
• Create supporting subtopics
• Plan interconnected content
• Build topical authority

**Publishing Schedule:**
• Consistency is key
• Quality over quantity
• Plan seasonal content
• Create evergreen resources
• Update and refresh old posts`
      }
    ],
    prompts: [
      "Write a comprehensive blog post about [topic] that targets the keyword '[keyword]'",
      "Create an engaging introduction for a blog article about [subject] that hooks readers",
      "Help me outline a how-to guide for [process] that provides real value to [audience]",
      "Generate blog post ideas for my [industry] business that will attract [target customer]"
    ]
  },

  sales_pages: {
    title: 'Sales Pages Assistant',
    description: 'Construct powerful sales pages that effectively sell your products or services',
    sections: [
      {
        title: 'Psychology of High-Converting Sales Pages',
        content: `Effective sales pages tap into fundamental psychological principles:

**Problem Amplification:**
• Identify the pain point clearly
• Agitate the problem's consequences
• Create urgency around solving it
• Position your solution as the answer

**Social Proof & Authority:**
• Customer testimonials and reviews
• Expert endorsements
• Media mentions and features
• Usage statistics and case studies

**Risk Reversal:**
• Money-back guarantees
• Free trial periods
• "Try before you buy" offers
• Detailed FAQ sections

**Scarcity & Urgency:**
• Limited-time offers
• Quantity limitations
• Exclusive bonuses
• Deadline-driven promotions`
      },
      {
        title: 'Long-Form Sales Page Structure',
        content: `**Attention-Grabbing Headline**
• Promise the main benefit
• Create curiosity or urgency
• Use specific numbers when possible

**Problem/Pain Point Section**
• Identify what your audience struggles with
• Amplify the consequences of inaction
• Connect emotionally with their frustration

**Solution Introduction**
• Present your product/service as the answer
• Focus on transformation, not features
• Show the "after" state they desire

**Benefits & Features**
• Lead with benefits (what they get)
• Support with features (how it works)
• Use bullet points for easy scanning

**Social Proof Section**
• Customer testimonials with photos
• Before/after case studies
• Usage statistics or client logos
• Expert endorsements

**Objection Handling**
• Address common concerns
• Provide detailed FAQ section
• Offer guarantees or risk reversal
• Compare to alternatives

**Price & Offer**
• Present your offer clearly
• Show value comparison
• Include bonuses or extras
• Create urgency with limited time

**Strong Call-to-Action**
• Clear, action-oriented language
• Repeat throughout the page
• Make buttons stand out visually
• Remove friction from purchase process`
      },
      {
        title: 'Sales Copy Techniques',
        content: `**Power Words That Sell:**
• Exclusive, Limited, Guaranteed
• Proven, Secret, Revolutionary
• Instant, Easy, Simple
• Free, Save, Bonus

**Emotional Triggers:**
• Fear of missing out (FOMO)
• Desire for transformation
• Need for security/safety
• Want for status/recognition

**Credibility Builders:**
• Specific numbers and statistics
• Third-party validations
• Detailed explanations
• Professional design and copy

**Urgency Creators:**
• Limited-time pricing
• Countdown timers
• Stock quantity limitations
• Exclusive access periods`
      }
    ],
    prompts: [
      "Write a compelling sales page for my [product/service] that converts [target audience]",
      "Create powerful headlines for a sales page promoting [specific offer]",
      "Help me write copy that overcomes objections for [product] and drives sales",
      "Generate testimonials and social proof sections for my [industry] sales page"
    ]
  },

  sop: {
    title: 'Standard Operating Procedures Assistant',
    description: 'Document your processes to ensure consistency and scalability in your business',
    sections: [
      {
        title: 'Why SOPs Are Critical for Business Success',
        content: `Standard Operating Procedures are the backbone of scalable businesses:

**Consistency:** Ensure every task is completed the same way every time
**Training:** New team members can learn faster with clear procedures
**Quality Control:** Maintain standards even as you grow
**Efficiency:** Eliminate guesswork and reduce decision fatigue
**Delegation:** Confidently hand off tasks knowing they'll be done right
**Scaling:** Document processes before you need to hire
**Compliance:** Meet industry standards and regulatory requirements
**Knowledge Preservation:** Don't lose institutional knowledge when people leave`
      },
      {
        title: 'SOP Template Structure',
        content: `**Document Header:**
• SOP Title
• Version number and date
• Owner/responsible party
• Review/approval signatures

**Purpose & Scope:**
• Why this SOP exists
• What processes it covers
• Who should use it
• When it applies

**Definitions & Terminology:**
• Key terms used in the document
• Acronyms and abbreviations
• Role definitions

**Step-by-Step Procedures:**
• Numbered sequential steps
• Clear, actionable language
• Decision points and alternatives
• Required tools and resources

**Quality Checkpoints:**
• Verification steps
• Quality standards
• Common mistakes to avoid
• Success metrics

**Documentation & Records:**
• What to document
• Where to store records
• Retention requirements
• Reporting procedures

**Appendices:**
• Forms and templates
• Reference materials
• Contact information
• Related SOPs`
      },
      {
        title: 'Writing Effective SOPs',
        content: `**Clarity Principles:**
• Use simple, direct language
• Write in active voice
• One action per step
• Avoid ambiguous terms

**Structure Guidelines:**
• Use consistent formatting
• Number steps sequentially
• Include visual aids when helpful
• Group related steps together

**Testing & Validation:**
• Have someone else follow the SOP
• Test with new team members
• Update based on feedback
• Regular review and revision

**Common SOP Categories:**
• Customer service procedures
• Sales processes
• Marketing campaigns
• Financial procedures
• HR processes
• Quality control
• Safety protocols
• IT procedures`
      }
    ],
    prompts: [
      "Help me create an SOP for [specific business process] that ensures consistency",
      "Write step-by-step procedures for [task] that a new employee could easily follow",
      "Create a quality control checklist for [product/service] delivery",
      "Document our [department] procedures to maintain standards as we scale"
    ]
  },

  terms_and_conditions: {
    title: 'Terms & Conditions Assistant',
    description: 'Generate the legal terms of service for your website and business',
    sections: [
      {
        title: 'Understanding Terms & Conditions',
        content: `Terms & Conditions (T&C) are legal agreements between your business and users:

**Legal Protection:** Shield your business from liability and misuse
**User Expectations:** Clearly define what users can and cannot do
**Service Limitations:** Explain service boundaries and limitations
**Intellectual Property:** Protect your content, trademarks, and copyrights
**Dispute Resolution:** Establish how conflicts will be handled
**Compliance:** Meet legal requirements for your industry and jurisdiction

**When You Need T&C:**
• Any website or app
• E-commerce businesses
• SaaS platforms
• Service-based businesses
• Membership sites
• Content platforms`
      },
      {
        title: 'Essential T&C Sections',
        content: `**1. Acceptance of Terms**
• How users agree to the terms
• When terms apply
• Updates to terms

**2. Description of Service**
• What your business provides
• Service limitations
• Availability and uptime

**3. User Responsibilities**
• Account creation requirements
• Proper use guidelines
• Prohibited activities

**4. Intellectual Property**
• Your ownership rights
• User content rights
• License grants

**5. Payment Terms** (if applicable)
• Pricing and billing
• Refund policies
• Payment processing

**6. Privacy & Data**
• Data collection practices
• User privacy rights
• Cookie usage

**7. Disclaimers & Liability**
• Service limitations
• Warranty disclaimers
• Liability limitations

**8. Termination**
• How accounts can be terminated
• Effect of termination
• Survival of terms

**9. Dispute Resolution**
• Governing law
• Dispute procedures
• Jurisdiction clauses

**10. Contact Information**
• How to reach you
• Legal notices
• Customer support`
      },
      {
        title: 'T&C Best Practices',
        content: `**Legal Compliance:**
• Consult with a qualified attorney
• Comply with applicable laws (GDPR, CCPA, etc.)
• Industry-specific regulations
• Regular legal review and updates

**User Experience:**
• Write in plain language when possible
• Use clear headings and sections
• Make easily accessible on your site
• Provide summaries for complex sections

**Business Protection:**
• Be specific about prohibited uses
• Include comprehensive disclaimers
• Address intellectual property clearly
• Establish dispute resolution procedures

**Regular Maintenance:**
• Review and update regularly
• Notify users of significant changes
• Keep archived versions
• Document change history

**Important Note:** This assistant provides general guidance only. Always consult with a qualified attorney to ensure your Terms & Conditions meet your specific business needs and comply with applicable laws.`
      }
    ],
    prompts: [
      "Help me draft Terms & Conditions for my [business type] website that protects my business",
      "Create user responsibility clauses for my [platform type] that prevent misuse",
      "Write intellectual property sections that protect my [content/product type]",
      "Generate payment and refund terms for my [e-commerce/service] business"
    ]
  },

  privacy_policy: {
    title: 'Privacy Policy Assistant',
    description: 'Create a legally required privacy policy to protect your users and your business',
    sections: [
      {
        title: 'Why Privacy Policies Are Essential',
        content: `Privacy policies are legally required in most jurisdictions and build user trust:

**Legal Compliance:** Required by laws like GDPR, CCPA, PIPEDA
**User Trust:** Shows transparency about data practices
**Platform Requirements:** Required by Google, Facebook, Apple App Store
**Business Protection:** Reduces liability for data handling
**Regulatory Compliance:** Meets industry-specific requirements

**When You Need a Privacy Policy:**
• Any website that collects data
• Mobile applications
• E-commerce sites
• Email marketing
• Analytics tools (Google Analytics)
• Social media integration
• Contact forms
• Newsletter signups`
      },
      {
        title: 'Core Privacy Policy Components',
        content: `**1. Information Collection**
• Personal data collected
• How data is collected
• Automatic data collection (cookies, analytics)
• Third-party data collection

**2. Use of Information**
• Why you collect data
• How data is used
• Legal basis for processing (GDPR)
• Data sharing practices

**3. Information Sharing**
• Who has access to data
• Third-party service providers
• Legal disclosure requirements
• International transfers

**4. Data Storage & Security**
• Where data is stored
• Security measures implemented
• Data retention periods
• Breach notification procedures

**5. User Rights**
• Access to personal data
• Correction and deletion rights
• Data portability
• Opt-out procedures

**6. Cookies & Tracking**
• Types of cookies used
• Third-party cookies
• Analytics tools
• Opt-out options

**7. Children's Privacy**
• Age restrictions
• Parental consent requirements
• Special protections for minors
• COPPA compliance (if applicable)

**8. Contact Information**
• Data protection officer
• Privacy inquiries
• Complaint procedures
• Regulatory contact info

**9. Policy Updates**
• How changes are communicated
• Effective dates
• User notification methods
• Historical versions`
      },
      {
        title: 'Privacy Law Compliance',
        content: `**GDPR (EU) Requirements:**
• Legal basis for processing
• Data subject rights
• Consent mechanisms
• Data protection officer contact
• International transfer safeguards

**CCPA (California) Requirements:**
• Categories of personal information
• Business purposes for collection
• Third-party sharing disclosure
• Consumer rights and request process
• Non-discrimination policy

**Common Data Collection:**
• Name, email, phone number
• IP addresses and device info
• Website usage data (analytics)
• Cookies and tracking pixels
• Payment information
• Customer service interactions

**Best Practices:**
• Use clear, plain language
• Organize with clear headings
• Make easily accessible
• Update when practices change
• Provide multiple contact methods
• Regular legal review

**Important Note:** Privacy laws vary by jurisdiction and are frequently updated. This assistant provides general guidance only. Always consult with a qualified attorney to ensure your Privacy Policy meets your specific business needs and complies with applicable laws.`
      }
    ],
    prompts: [
      "Help me create a privacy policy for my [business type] that complies with GDPR and CCPA",
      "Draft data collection sections for my website that uses [specific tools/services]",
      "Create user rights sections that comply with [specific jurisdiction] privacy laws",
      "Write cookie policy sections for my website that uses [analytics/marketing tools]"
    ]
  },

  partnership_agreement: {
    title: 'Partnership Agreement Assistant',
    description: 'Draft a clear, comprehensive agreement for business partnerships',
    sections: [
      {
        title: 'Types of Business Partnerships',
        content: `Understanding different partnership structures helps you choose the right agreement:

**General Partnership:**
• All partners share equal responsibility
• Shared profits, losses, and liability
• Each partner can bind the business
• Simpler structure, fewer formalities

**Limited Partnership:**
• General partners manage the business
• Limited partners are investors only
• Limited liability for limited partners
• More complex structure and compliance

**Limited Liability Partnership (LLP):**
• Professional service businesses
• Limited personal liability
• Flexible management structure
• Often used by lawyers, accountants

**Joint Venture:**
• Specific project or time period
• Separate legal entity
• Shared resources and expertise
• Clear exit strategy

**Strategic Alliance:**
• Collaboration without ownership
• Shared resources or market access
• Maintains separate businesses
• Formal cooperation agreement`
      },
      {
        title: 'Essential Partnership Agreement Elements',
        content: `**1. Partner Information**
• Full names and addresses
• Roles and responsibilities
• Initial contributions (money, assets, time)
• Ownership percentages

**2. Business Structure**
• Partnership name and purpose
• Principal place of business
• Partnership duration
• Legal structure chosen

**3. Financial Arrangements**
• Initial capital contributions
• Ongoing funding requirements
• Profit and loss distribution
• Draw/salary arrangements

**4. Management & Decision Making**
• Who makes what decisions
• Voting procedures
• Management responsibilities
• Authority limitations

**5. Partner Rights & Obligations**
• Work commitments
• Compensation arrangements
• Expense reimbursements
• Confidentiality requirements

**6. Books & Records**
• Accounting methods
• Record keeping responsibilities
• Financial reporting requirements
• Audit rights

**7. Dispute Resolution**
• Mediation procedures
• Arbitration clauses
• Governing law
• Jurisdiction specifications

**8. Partnership Changes**
• Adding new partners
• Transferring partnership interests
• Partner withdrawal procedures
• Death or disability provisions

**9. Dissolution**
• Reasons for dissolution
• Asset distribution
• Debt responsibility
• Wind-up procedures

**10. Miscellaneous Provisions**
• Non-compete agreements
• Insurance requirements
• Amendment procedures
• Entire agreement clause`
      },
      {
        title: 'Partnership Agreement Best Practices',
        content: `**Planning Phase:**
• Define partnership goals clearly
• Discuss expectations openly
• Consider worst-case scenarios
• Plan exit strategies upfront

**Documentation:**
• Put everything in writing
• Be specific about terms
• Avoid ambiguous language
• Include all relevant details

**Financial Clarity:**
• Document all contributions
• Define profit/loss sharing
• Establish draw/salary policies
• Plan for future funding needs

**Communication Systems:**
• Regular partner meetings
• Reporting requirements
• Decision-making processes
• Conflict resolution procedures

**Legal Considerations:**
• Consult qualified attorneys
• Consider tax implications
• Review insurance needs
• Comply with state requirements

**Regular Reviews:**
• Annual agreement reviews
• Update as business grows
• Modify terms as needed
• Document all changes

**Common Pitfalls to Avoid:**
• Vague role definitions
• Unequal contribution documentation
• No exit strategy planning
• Inadequate dispute resolution
• Missing tax considerations

**Important Note:** Partnership agreements have significant legal and tax implications. This assistant provides general guidance only. Always consult with qualified attorneys and tax professionals to ensure your agreement meets your specific needs and complies with applicable laws.`
      }
    ],
    prompts: [
      "Help me draft a partnership agreement for a [business type] with [number] partners",
      "Create profit-sharing and decision-making clauses for our [industry] partnership",
      "Write exit strategy and dissolution procedures for our business partnership",
      "Generate partner roles and responsibilities sections for our [specific business] venture"
    ]
  },

  initial_product_suite: {
    title: 'Initial Product Suite Assistant',
    description: 'Strategize the perfect mix of 3-7 initial products or services to launch',
    sections: [
      {
        title: 'Why Product Suite Strategy Matters',
        content: `A well-planned initial product suite sets the foundation for sustainable business growth:

**Revenue Diversification:** Multiple income streams reduce risk
**Customer Lifecycle Management:** Products for different customer stages
**Market Testing:** Learn what resonates with your audience
**Scalability:** Build systems that support growth
**Competitive Advantage:** Comprehensive solutions vs. single products
**Resource Optimization:** Leverage skills and assets across products

**The Sweet Spot: 3-7 Products**
• 3 minimum for diversification
• 7 maximum to avoid spreading too thin
• Focus on quality over quantity
• Build momentum with early wins`
      },
      {
        title: 'Product Suite Framework',
        content: `**1. Entry-Level Product (Lead Magnet)**
Price: Free to $99
Purpose: Attract and qualify prospects
Examples: E-books, mini-courses, templates, consultations

**2. Core Product (Primary Offering)**
Price: $99-$997
Purpose: Main revenue generator and value delivery
Examples: Online courses, software, done-for-you services

**3. Premium Product (High-Value Solution)**
Price: $997-$9,997
Purpose: Serve committed customers with comprehensive solutions
Examples: Coaching programs, masterminds, enterprise software

**4. Continuity Product (Recurring Revenue)**
Price: $29-$297/month
Purpose: Ongoing relationship and predictable income
Examples: Memberships, SaaS, retainer services

**5. Complementary Products (Cross-sells)**
Price: Varies
Purpose: Enhance main offering and increase customer value
Examples: Add-ons, upgrades, related tools

**Product Progression Path:**
Free Lead Magnet → Entry Product → Core Product → Premium Product + Continuity`
      },
      {
        title: 'Product Selection Criteria',
        content: `**Market Demand Validation:**
• Existing customer requests
• Competitor analysis
• Search volume data
• Social media discussions
• Survey feedback

**Resource Requirements:**
• Time to create and deliver
• Skills and expertise needed
• Technology requirements
• Support and maintenance
• Marketing complexity

**Profit Potential:**
• Pricing possibilities
• Cost to deliver
• Market size
• Competition level
• Scalability factor

**Strategic Fit:**
• Brand alignment
• Skill set utilization
• Asset leveraging
• Growth pathway
• Customer journey support

**Recommended Starting Combinations:**

**Service Business:**
1. Free consultation (lead magnet)
2. Done-for-you service (core)
3. VIP/premium service (premium)
4. Monthly retainer (continuity)
5. Training/course (complementary)

**Digital Products:**
1. Free guide/template (lead magnet)
2. Online course (core)
3. Coaching program (premium)
4. Membership community (continuity)
5. Done-for-you templates (complementary)

**E-commerce:**
1. Free shipping on first order (lead magnet)
2. Signature product line (core)
3. Premium/luxury version (premium)
4. Subscription box (continuity)
5. Accessories/add-ons (complementary)

**SaaS/Software:**
1. Free trial/freemium (lead magnet)
2. Basic plan (core)
3. Enterprise plan (premium)
4. All plans are continuity
5. Add-on features (complementary)`
      }
    ],
    prompts: [
      "Help me design a product suite for my [business type] that serves [target audience]",
      "Create a progression path of 3-7 products for [industry] customers",
      "Suggest complementary products that enhance my main offering of [product/service]",
      "Design a product pricing strategy that maximizes revenue for [business model]"
    ]
  }
};

export default function AssistantGuide() {
  const navigate = useNavigate();
  const [assistantType, setAssistantType] = useState(null);
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type && assistantGuides[type]) {
      setAssistantType(type);
      loadSavedNotes(type);
    } else {
      navigate(createPageUrl('ElyzetAIAssistants'));
    }
  }, [navigate]);

  const loadSavedNotes = async (type) => {
    try {
      const notes = await AIAssistantNote.filter({ assistant_type: type }, '-created_date');
      setSavedNotes(notes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const result = await aiCopilot({
        prompt,
        assistantType,
        context: `User is working with the ${assistantGuides[assistantType].title}`
      });

      if (result.data.success) {
        setResponse(result.data.response);
      } else {
        setResponse('Sorry, there was an error getting your AI response. Please try again.');
      }
    } catch (error) {
      console.error('Error calling AI copilot:', error);
      setResponse('Sorry, there was an error getting your AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleQuickPrompt = (promptText) => {
    setPrompt(promptText);
  };

  const saveNote = async () => {
    if (!noteTitle.trim() || !noteContent.trim()) return;
    
    try {
      await AIAssistantNote.create({
        assistant_type: assistantType,
        title: noteTitle,
        content: noteContent
      });
      
      setNoteTitle('');
      setNoteContent('');
      setShowNoteForm(false);
      await loadSavedNotes(assistantType);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const toggleFavorite = async (noteId, currentStatus) => {
    try {
      await AIAssistantNote.update(noteId, { is_favorite: !currentStatus });
      await loadSavedNotes(assistantType);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  if (!assistantType || !assistantGuides[assistantType]) {
    return <div>Loading...</div>;
  }

  const guide = assistantGuides[assistantType];

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button and Header */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(createPageUrl('ElyzetAIAssistants'))}
                className="btn btn-ghost p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl">{guide.title}</h1>
                  <p className="text-sm text-[var(--text-soft)]">{guide.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Interface */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[var(--primary-gold)]" />
            <h2 className="text-xl font-bold">Ask Elyzet for Help</h2>
          </div>
          
          {/* Quick Prompt Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {guide.prompts.map((promptText, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(promptText)}
                className="text-left p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:border-[var(--primary-gold)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* AI Response */}
          {response && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--primary-gold)]" />
                  <span className="font-medium text-[var(--text-main)]">Elyzet's Response</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="btn btn-ghost btn-sm p-2"
                  title="Copy to clipboard"
                >
                  {hasCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-[var(--text-main)]">
                {response.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Elyzet for specific help with this topic..."
              className="form-input flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="btn btn-primary px-4"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>

        {/* Guide Content */}
        {guide.sections.map((section, index) => (
          <div key={index} className="card p-6">
            <h2 className="text-xl font-bold text-[var(--text-main)] mb-4">{section.title}</h2>
            <div className="prose prose-sm max-w-none text-[var(--text-main)]">
              {section.content.split('\n').map((paragraph, pIndex) => {
                if (paragraph.trim() === '') return null;
                
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={pIndex} className="text-lg font-semibold mt-4 mb-2 text-[var(--text-main)]">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                
                if (paragraph.startsWith('•')) {
                  return (
                    <li key={pIndex} className="ml-4 mb-1 text-[var(--text-main)]">
                      {paragraph.slice(1).trim()}
                    </li>
                  );
                }
                
                return (
                  <p key={pIndex} className="mb-3 text-[var(--text-main)] leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        ))}

        {/* Notes Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--text-main)]">My Notes</h2>
            <button
              onClick={() => setShowNoteForm(!showNoteForm)}
              className="btn btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Note
            </button>
          </div>

          {/* Note Form */}
          {showNoteForm && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title..."
                className="form-input mb-3"
              />
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note here..."
                className="form-input h-24 mb-3 resize-none"
              />
              <div className="flex gap-2">
                <button onClick={saveNote} className="btn btn-primary btn-sm">
                  Save Note
                </button>
                <button 
                  onClick={() => setShowNoteForm(false)} 
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Saved Notes */}
          <div className="space-y-3">
            {savedNotes.map((note) => (
              <div key={note.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[var(--text-main)]">{note.title}</h3>
                  <button
                    onClick={() => toggleFavorite(note.id, note.is_favorite)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Heart className={`w-4 h-4 ${note.is_favorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <p className="text-[var(--text-soft)] text-sm">{note.content}</p>
              </div>
            ))}
            {savedNotes.length === 0 && (
              <p className="text-center text-[var(--text-soft)] py-8">
                No notes saved yet. Add your first note to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}