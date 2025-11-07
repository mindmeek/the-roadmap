import { Building, FileText, Shield, Calculator, Users, Briefcase, CheckSquare, Globe, Scale, Lock, BadgeCheck, Landmark } from 'lucide-react';

export const buildFoundationRoadmap = {
    courseTitle: "Build Your Business Foundation: 90-Day Setup",
    courseDescription: "Establish the essential legal, financial, and operational groundwork your business needs to thrive. Create a stable, compliant, and scalable business base.",
    totalWeeks: 12,
    category: "Business Fundamentals",
    difficulty: "Beginner",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Business Structure & Legal Entity",
            weekDescription: "Choose and register the right legal structure for your business.",
            icon: Building,
            tasks: [
                {
                    title: "Understand Business Structure Options",
                    description: "Learn about sole proprietorship, LLC, S-Corp, C-Corp options.",
                    action: "Research each business structure type, understand tax implications, liability protection, and complexity. Consider your revenue goals and growth plans.",
                    deliverable: "Business structure decision made with reasoning documented"
                },
                {
                    title: "Register Your Business",
                    description: "Officially register your chosen business entity with the state.",
                    action: "File Articles of Organization/Incorporation with your state, pay registration fees, receive official documentation, obtain certified copies.",
                    deliverable: "Business officially registered with state confirmation"
                },
                {
                    title: "Obtain Federal EIN",
                    description: "Get your Employer Identification Number from the IRS.",
                    action: "Apply for EIN through IRS website (free), receive EIN immediately, save confirmation letter, add to business documents folder.",
                    deliverable: "EIN obtained and documented"
                },
                {
                    title: "Open Business Bank Account",
                    description: "Separate personal and business finances with dedicated account.",
                    action: "Research business-friendly banks, gather required documents (EIN, business registration), open checking account, order business debit card, set up online banking.",
                    deliverable: "Business bank account opened and active"
                },
                {
                    title: "Get Business Insurance",
                    description: "Protect your business with appropriate insurance coverage.",
                    action: "Research general liability insurance requirements, get quotes from 3+ providers, select policy that covers your needs, set up automatic payments.",
                    deliverable: "Business insurance policy in place"
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Business Name & Branding Basics",
            weekDescription: "Secure your business name and establish brand foundation.",
            icon: BadgeCheck,
            tasks: [
                {
                    title: "Register Your Business Name (DBA)",
                    description: "File for 'Doing Business As' if using name different from legal entity.",
                    action: "Check name availability in your county, file DBA registration, pay filing fee, publish if required by state, update bank with DBA.",
                    deliverable: "DBA registered if applicable"
                },
                {
                    title: "Secure Domain Name",
                    description: "Purchase and register your business website domain.",
                    action: "Check domain availability (.com preferred), purchase through reputable registrar, set up domain privacy protection, forward to temporary site.",
                    deliverable: "Domain name secured and registered"
                },
                {
                    title: "Create Business Email",
                    description: "Set up professional email with your domain name.",
                    action: "Set up Google Workspace or professional email hosting, create primary business email (hello@, info@), set up email signature, test delivery.",
                    deliverable: "Professional business email operational"
                },
                {
                    title: "Register Social Media Handles",
                    description: "Claim your business name on key social platforms.",
                    action: "Check username availability on Instagram, Facebook, LinkedIn, Twitter/X, secure handles even if not using immediately, maintain brand consistency.",
                    deliverable: "Social media handles secured"
                },
                {
                    title: "Design Basic Logo",
                    description: "Create simple, professional logo for your business.",
                    action: "Use Canva or hire designer on Fiverr, keep it simple and scalable, create versions for different uses (color, black/white), save in multiple file formats.",
                    deliverable: "Basic logo created and saved in multiple formats"
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Financial Systems & Bookkeeping",
            weekDescription: "Set up systems to track income, expenses, and profitability.",
            icon: Calculator,
            tasks: [
                {
                    title: "Choose Accounting Software",
                    description: "Select and set up bookkeeping system for your business.",
                    action: "Compare QuickBooks, Wave (free), FreshBooks, Xero. Sign up for chosen platform, connect business bank account, set up chart of accounts.",
                    deliverable: "Accounting software set up and bank connected"
                },
                {
                    title: "Create Financial Tracking System",
                    description: "Establish process for recording all financial transactions.",
                    action: "Set up income categories, expense categories, create weekly bookkeeping routine, enable receipt scanning, categorize first month of transactions.",
                    deliverable: "Financial tracking system established"
                },
                {
                    title: "Set Up Invoicing System",
                    description: "Create professional invoices and payment collection.",
                    action: "Design invoice template with logo and details, set up online payment acceptance (Stripe, PayPal), create payment terms, establish follow-up process.",
                    deliverable: "Invoicing system ready to use"
                },
                {
                    title: "Understand Tax Obligations",
                    description: "Learn about quarterly taxes, sales tax, and filing requirements.",
                    action: "Research federal and state tax requirements, determine if quarterly estimated taxes needed, understand sales tax obligations, set reminders for deadlines.",
                    deliverable: "Tax obligations documented with calendar reminders"
                },
                {
                    title: "Create Simple Budget",
                    description: "Plan your business income and expenses for next quarter.",
                    action: "List all monthly expenses (fixed and variable), set revenue goals, calculate breakeven point, plan for taxes (30% of profit), identify cost reduction opportunities.",
                    deliverable: "90-day budget created"
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Business Licenses & Permits",
            weekDescription: "Obtain all required licenses and permits for legal operation.",
            icon: Shield,
            tasks: [
                {
                    title: "Research Required Licenses",
                    description: "Identify federal, state, and local licensing requirements.",
                    action: "Check SBA.gov for requirements by industry, contact local city/county clerk, research professional licenses if applicable, create checklist.",
                    deliverable: "Complete list of required licenses and permits"
                },
                {
                    title: "Obtain Business License",
                    description: "Apply for general business operating license in your area.",
                    action: "Complete business license application, pay fees, submit required documentation, wait for approval, display license when received.",
                    deliverable: "Business license obtained or in process"
                },
                {
                    title: "Get Professional Licenses",
                    description: "Obtain industry-specific professional licenses if required.",
                    action: "Complete required training/certification, submit applications, pass any necessary exams, pay licensing fees, maintain renewal calendar.",
                    deliverable: "Professional licenses obtained if applicable"
                },
                {
                    title: "Register for Sales Tax Permit",
                    description: "Get permit to collect and remit sales tax if selling products.",
                    action: "Apply through state's Department of Revenue, receive sales tax permit number, understand collection requirements, set up in accounting software.",
                    deliverable: "Sales tax permit obtained if applicable"
                },
                {
                    title: "Create Compliance Calendar",
                    description: "Set up reminders for all renewal dates and deadlines.",
                    action: "Add all license renewal dates to calendar, set reminders 30 days in advance, document renewal processes, budget for renewal fees.",
                    deliverable: "Compliance calendar established"
                }
            ]
        },
        {
            weekNumber: 5,
            weekTitle: "Contracts & Legal Documents",
            weekDescription: "Create essential legal documents to protect your business.",
            icon: FileText,
            tasks: [
                {
                    title: "Create Client Service Agreement",
                    description: "Develop standard contract template for client work.",
                    action: "Include scope of work, payment terms, timeline, revision policy, termination clause, liability limitations. Have attorney review if possible.",
                    deliverable: "Client service agreement template created"
                },
                {
                    title: "Draft Terms & Conditions",
                    description: "Create T&Cs for your website and services.",
                    action: "Use template generators as starting point, customize for your business, include payment terms, refund policy, liability disclaimers, dispute resolution.",
                    deliverable: "Terms and Conditions document completed"
                },
                {
                    title: "Create Privacy Policy",
                    description: "Required document explaining how you handle customer data.",
                    action: "Use privacy policy generator, disclose data collection practices, explain use of cookies, include contact information, comply with GDPR/CCPA if applicable.",
                    deliverable: "Privacy Policy published on website"
                },
                {
                    title: "Develop Independent Contractor Agreement",
                    description: "Template for hiring freelancers and contractors.",
                    action: "Define work relationship, include IP ownership clause, payment terms, confidentiality agreement, termination conditions.",
                    deliverable: "Contractor agreement template ready"
                },
                {
                    title: "Set Up Document Organization System",
                    description: "Create digital filing system for all business documents.",
                    action: "Use Google Drive or Dropbox, create folder structure (Legal, Financial, Contracts, etc.), scan physical documents, back up regularly.",
                    deliverable: "Digital document system organized"
                }
            ]
        },
        {
            weekNumber: 6,
            weekTitle: "Website & Online Presence",
            weekDescription: "Establish your professional online headquarters.",
            icon: Globe,
            tasks: [
                {
                    title: "Choose Website Platform",
                    description: "Select platform that fits your technical skill and needs.",
                    action: "Compare WordPress, Squarespace, Wix, Shopify (for e-commerce). Consider ease of use, features, cost, scalability. Set up account.",
                    deliverable: "Website platform selected and account created"
                },
                {
                    title: "Build Essential Pages",
                    description: "Create core website pages for professional presence.",
                    action: "Create Home, About, Services/Products, Contact pages. Write clear copy, add professional photos, include clear call-to-action on each page.",
                    deliverable: "4-5 core pages published"
                },
                {
                    title: "Set Up Contact Forms",
                    description: "Make it easy for customers to reach you.",
                    action: "Install contact form plugin, test submissions, set up auto-response email, ensure notifications come to business email, add to Contact page.",
                    deliverable: "Contact form functional and tested"
                },
                {
                    title: "Add Payment Processing",
                    description: "Enable online payments through your website.",
                    action: "Set up Stripe or PayPal business account, integrate payment gateway to website, test transactions, enable invoicing, document process.",
                    deliverable: "Online payment system operational"
                },
                {
                    title: "Optimize for SEO Basics",
                    description: "Set up basic search engine optimization.",
                    action: "Install SEO plugin (Yoast, Rank Math), add meta descriptions to pages, create sitemap, submit to Google Search Console, optimize page titles.",
                    deliverable: "Basic SEO setup completed"
                }
            ]
        },
        {
            weekNumber: 7,
            weekTitle: "Operations & Workflows",
            weekDescription: "Create repeatable processes for core business activities.",
            icon: CheckSquare,
            tasks: [
                {
                    title: "Document Client Onboarding Process",
                    description: "Create step-by-step process for new clients.",
                    action: "Map out steps from inquiry to project start, create welcome email template, design client questionnaire, set up file sharing, create onboarding checklist.",
                    deliverable: "Client onboarding workflow documented"
                },
                {
                    title: "Create Service Delivery Checklist",
                    description: "Standardize how you deliver your core offerings.",
                    action: "Break down service into steps, create quality checklist, set up project templates, document best practices, establish timelines.",
                    deliverable: "Service delivery process documented"
                },
                {
                    title: "Set Up Project Management System",
                    description: "Organize tasks and client work in one place.",
                    action: "Choose tool (Trello, Asana, ClickUp, Monday), set up project templates, create task workflows, invite team members if applicable.",
                    deliverable: "Project management system in use"
                },
                {
                    title: "Design Communication Templates",
                    description: "Create reusable templates for common communications.",
                    action: "Draft inquiry response, quote/proposal template, project update email, completion/thank you message, request for testimonial.",
                    deliverable: "Email template library created"
                },
                {
                    title: "Establish File Naming Convention",
                    description: "Create consistent system for organizing digital files.",
                    action: "Design file naming format (Date_ClientName_ProjectType), create folder structure, document conventions, migrate existing files to new system.",
                    deliverable: "File organization system implemented"
                }
            ]
        },
        {
            weekNumber: 8,
            weekTitle: "Business Tools & Software Stack",
            weekDescription: "Select and set up essential business software tools.",
            icon: Briefcase,
            tasks: [
                {
                    title: "Set Up Email Marketing Platform",
                    description: "Choose tool for building and nurturing email list.",
                    action: "Compare Mailchimp, ConvertKit, Flodesk. Create account, design email templates, set up basic welcome sequence, add signup form to website.",
                    deliverable: "Email marketing platform operational"
                },
                {
                    title: "Choose CRM System",
                    description: "Set up customer relationship management for tracking leads and clients.",
                    action: "Select CRM (HubSpot free, Pipedrive, Zoho). Set up contact fields, create deal pipeline, import existing contacts, set up integrations.",
                    deliverable: "CRM system configured"
                },
                {
                    title: "Implement Scheduling Tool",
                    description: "Let clients book appointments without back-and-forth emails.",
                    action: "Set up Calendly or Acuity Scheduling, connect to calendar, create booking types, set availability, add to website, test booking process.",
                    deliverable: "Online scheduling system live"
                },
                {
                    title: "Set Up Time Tracking",
                    description: "Track how you spend time to improve efficiency and billing.",
                    action: "Choose tool (Toggl, Harvest, Clockify), create project categories, start tracking all work time, review weekly reports, identify time drains.",
                    deliverable: "Time tracking habit established"
                },
                {
                    title: "Create Business Dashboard",
                    description: "Centralize key metrics in one view.",
                    action: "Set up simple spreadsheet or use tool like Notion, track revenue, expenses, profit margin, client count, website traffic. Update weekly.",
                    deliverable: "Business metrics dashboard created"
                }
            ]
        },
        {
            weekNumber: 9,
            weekTitle: "Intellectual Property Protection",
            weekDescription: "Protect your brand, content, and creative work.",
            icon: Lock,
            tasks: [
                {
                    title: "Understand Copyright Basics",
                    description: "Learn how your created work is automatically protected.",
                    action: "Research copyright law basics, understand what you can/can't protect, add copyright notice to website footer, consider registration for key works.",
                    deliverable: "Copyright protection understanding and notices added"
                },
                {
                    title: "Consider Trademark Registration",
                    description: "Decide if you should trademark your business name/logo.",
                    action: "Search USPTO database for conflicts, understand trademark classes, consult with attorney if budget allows, file application if appropriate.",
                    deliverable: "Trademark decision made and action taken"
                },
                {
                    title: "Protect Trade Secrets",
                    description: "Identify and safeguard proprietary business information.",
                    action: "List proprietary processes, methods, client lists. Create confidentiality agreements, limit access to sensitive info, document security measures.",
                    deliverable: "Trade secrets identified and protection plan created"
                },
                {
                    title: "Create Content Licensing Terms",
                    description: "Define how others can use your content and creations.",
                    action: "Decide on licensing approach (all rights reserved, Creative Commons, custom license), add terms to website, include in contracts.",
                    deliverable: "Content licensing terms documented"
                },
                {
                    title: "Document Your Intellectual Property",
                    description: "Keep records of everything you create.",
                    action: "Create IP inventory list, save dated versions of key documents, document creation dates, store in secure location, update quarterly.",
                    deliverable: "IP documentation system established"
                }
            ]
        },
        {
            weekNumber: 10,
            weekTitle: "Professional Relationships & Support",
            weekDescription: "Build your team of professional advisors.",
            icon: Users,
            tasks: [
                {
                    title: "Find a Business Attorney",
                    description: "Establish relationship with lawyer for legal questions.",
                    action: "Get referrals from other business owners, schedule consultations with 2-3 attorneys, choose one who understands your industry, keep contact info handy.",
                    deliverable: "Business attorney relationship established"
                },
                {
                    title: "Connect with an Accountant/CPA",
                    description: "Get professional help with taxes and financial planning.",
                    action: "Interview 2-3 accountants with small business experience, discuss services and fees, select best fit, provide business financial access.",
                    deliverable: "Accountant/CPA hired"
                },
                {
                    title: "Build Your Virtual Team",
                    description: "Identify contractors you might need as you grow.",
                    action: "Research virtual assistants, graphic designers, copywriters, web developers. Save contacts, check portfolios, note rates for future reference.",
                    deliverable: "Virtual team resource list created"
                },
                {
                    title: "Join Business Owner Groups",
                    description: "Find peer support and mastermind communities.",
                    action: "Join Facebook groups for entrepreneurs, local chamber of commerce, industry associations, attend networking events, engage regularly.",
                    deliverable: "Active in 2-3 business communities"
                },
                {
                    title: "Find a Business Mentor or Coach",
                    description: "Get guidance from someone who's been there.",
                    action: "Reach out to potential mentors in your network, join entrepreneur mentorship programs, consider hiring business coach if budget allows.",
                    deliverable: "Mentorship connection made"
                }
            ]
        },
        {
            weekNumber: 11,
            weekTitle: "Risk Management & Protection",
            weekDescription: "Identify and mitigate business risks.",
            icon: Scale,
            tasks: [
                {
                    title: "Conduct Risk Assessment",
                    description: "Identify potential risks to your business.",
                    action: "List possible risks (liability, data breach, lost income, etc.), rate likelihood and impact, prioritize top 5 risks, create mitigation plan for each.",
                    deliverable: "Business risk assessment completed"
                },
                {
                    title: "Review Insurance Coverage",
                    description: "Ensure adequate protection for all identified risks.",
                    action: "Review general liability coverage, consider professional liability (E&O), evaluate business property insurance, assess need for cyber insurance.",
                    deliverable: "Insurance coverage reviewed and gaps addressed"
                },
                {
                    title: "Create Backup Systems",
                    description: "Protect your digital assets and data.",
                    action: "Set up automatic cloud backup, implement local backup solution, test restoration process, document backup procedures, backup schedule.",
                    deliverable: "Automated backup system operational"
                },
                {
                    title: "Develop Business Continuity Plan",
                    description: "Plan for how to continue operations during disruptions.",
                    action: "Identify critical business functions, create contingency plans, document emergency contacts, establish work-from-anywhere capability.",
                    deliverable: "Basic business continuity plan documented"
                },
                {
                    title: "Set Up Emergency Fund",
                    description: "Start building cash reserves for unexpected expenses.",
                    action: "Open separate savings account, set goal for 3-6 months operating expenses, set up automatic monthly transfers, don't touch except emergencies.",
                    deliverable: "Emergency fund started with automatic contributions"
                }
            ]
        },
        {
            weekNumber: 12,
            weekTitle: "Foundation Review & Maintenance",
            weekDescription: "Review everything, create maintenance schedule, plan ahead.",
            icon: Landmark,
            tasks: [
                {
                    title: "Complete Foundation Checklist",
                    description: "Review all foundation elements to ensure nothing is missed.",
                    action: "Go through complete checklist of all 11 weeks, identify any gaps, complete outstanding items, document completion dates.",
                    deliverable: "Foundation checklist 100% complete"
                },
                {
                    title: "Create Quarterly Review Schedule",
                    description: "Set up recurring reviews of foundation elements.",
                    action: "Schedule quarterly financial review, annual license/insurance renewals, semi-annual legal document updates, monthly accounting reviews.",
                    deliverable: "Maintenance calendar set up with reminders"
                },
                {
                    title: "Document Your Business Operations",
                    description: "Create operations manual for your business.",
                    action: "Compile all processes, workflows, contacts, login credentials into one master document. Store securely. Update as things change.",
                    deliverable: "Business operations manual completed"
                },
                {
                    title: "Set Growth Goals",
                    description: "Now that foundation is solid, plan for growth.",
                    action: "Set 90-day revenue goals, identify next hires/contractors, plan service expansion, outline marketing initiatives, schedule quarterly planning session.",
                    deliverable: "Next 90-day growth plan created"
                },
                {
                    title: "Celebrate Your Foundation",
                    description: "Acknowledge the important work you've completed.",
                    action: "Reflect on progress, share accomplishment with mentor/network, treat yourself, update LinkedIn and business profiles, confidently pursue growth.",
                    deliverable: "Foundation completion celebrated!"
                }
            ]
        }
    ]
};