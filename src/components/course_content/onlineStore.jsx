import { Package, ShoppingCart, TrendingUp, CreditCard, Truck, Target, Users, Search, BarChart, Zap, DollarSign, Mail, Camera, Megaphone, Rocket } from 'lucide-react';

export const onlineStoreRoadmap = {
    courseTitle: "Launch Your Online Store in 30 Days",
    courseDescription: "A comprehensive 30-day blueprint to take your product from idea to live online store with your first customers.",
    totalWeeks: 4,
    category: "E-commerce",
    difficulty: "Intermediate",
    
    weeks: [
        {
            weekNumber: 1,
            weekTitle: "Foundation & Product Validation",
            weekDescription: "Validate your product idea, identify your target market, and set up the essentials for your online store.",
            icon: Target,
            
            days: [
                {
                    day: 1,
                    title: "Define Your Product & Niche",
                    description: "Clearly define what you're selling and who you're selling to.",
                    tasks: [
                        "Write a detailed product description (features, benefits, specifications)",
                        "Identify your top 3 competitor products and analyze their positioning",
                        "Define your unique selling proposition (USP) - what makes you different?",
                        "Research your target customer demographics and pain points"
                    ],
                    deliverable: "Product Positioning Document with USP and target customer profile",
                    resources: ["Competitor Analysis Template", "USP Worksheet"]
                },
                {
                    day: 2,
                    title: "Validate Market Demand",
                    description: "Ensure there's real demand for your product before investing heavily.",
                    tasks: [
                        "Use Google Trends to check search volume for your product category",
                        "Join 3-5 Facebook groups or forums where your target customers hang out",
                        "Survey 10-20 potential customers about their needs and willingness to buy",
                        "Research keyword search volumes using free tools (Ubersuggest, Google Keyword Planner)"
                    ],
                    deliverable: "Market Validation Report with survey results and demand data",
                    resources: ["Survey Template", "Market Research Checklist"]
                },
                {
                    day: 3,
                    title: "Choose Your E-commerce Platform",
                    description: "Select the right platform for your store based on your needs and budget. The HQ lets you host WordPress websites and connect to Shopify stores seamlessly.",
                    tasks: [
                        "Compare platforms: Shopify, WooCommerce, The HQ Website Builder",
                        "Evaluate based on: pricing, ease of use, features, scalability",
                        "Sign up for a free trial of your chosen platform",
                        "Explore the dashboard and familiarize yourself with basic features"
                    ],
                    deliverable: "Platform selected and account created",
                    resources: ["Platform Comparison Chart", "Setup Checklist"]
                },
                {
                    day: 4,
                    title: "Set Up Business Essentials",
                    description: "Handle the legal and financial foundations of your business.",
                    tasks: [
                        "Register your business name (LLC, sole proprietorship, etc.)",
                        "Obtain an EIN (Employer Identification Number) from the IRS",
                        "Open a dedicated business bank account",
                        "Research sales tax requirements for your state/country"
                    ],
                    deliverable: "Business legally registered with bank account set up",
                    resources: ["Business Registration Guide", "Tax Requirements Checklist"]
                },
                {
                    day: 5,
                    title: "Source or Create Your Product",
                    description: "Determine how you'll fulfill orders and secure your inventory.",
                    tasks: [
                        "If dropshipping: Research and vet 3-5 reliable suppliers (AliExpress, Spocket, etc.)",
                        "If manufacturing: Get quotes from 3+ manufacturers, order samples",
                        "If handmade: Calculate material costs and production time per unit",
                        "Determine initial inventory quantity and place first order"
                    ],
                    deliverable: "Supplier/manufacturer selected with first inventory ordered or sourced",
                    resources: ["Supplier Vetting Checklist", "Cost Calculator"]
                },
                {
                    day: 6,
                    title: "Set Your Pricing Strategy",
                    description: "Price your products profitably while remaining competitive.",
                    tasks: [
                        "Calculate all costs: product cost, shipping, platform fees, payment processing",
                        "Research competitor pricing for similar products",
                        "Determine your desired profit margin (aim for 30-50% minimum)",
                        "Set prices for each product variation",
                        "Plan promotional pricing strategy (discounts, bundles, etc.)"
                    ],
                    deliverable: "Complete pricing sheet with profit margins calculated",
                    resources: ["Pricing Calculator Template", "Competitive Pricing Analysis"]
                },
                {
                    day: 7,
                    title: "Week 1 Review & Planning",
                    description: "Review progress and prepare for store design week.",
                    tasks: [
                        "Review all deliverables from Days 1-6",
                        "Ensure all business registrations are complete",
                        "Confirm supplier agreements and inventory timeline",
                        "Create a checklist for Week 2 tasks"
                    ],
                    deliverable: "Week 1 completion checklist and Week 2 action plan",
                    resources: ["Weekly Review Template"]
                }
            ]
        },
        {
            weekNumber: 2,
            weekTitle: "Store Design & Product Setup",
            weekDescription: "Build your online store, add products, and create compelling product pages that convert.",
            icon: ShoppingCart,
            
            days: [
                {
                    day: 8,
                    title: "Choose and Customize Your Theme",
                    description: "Select a professional theme and customize it to match your brand.",
                    tasks: [
                        "Browse and select a theme that fits your product type and industry",
                        "Customize colors to match your brand (choose 2-3 primary colors)",
                        "Upload your logo or create one using Canva if needed",
                        "Set up your homepage layout and main navigation menu"
                    ],
                    deliverable: "Store theme fully customized with brand colors and logo",
                    resources: ["Theme Selection Guide", "Brand Color Psychology"]
                },
                {
                    day: 9,
                    title: "Create Professional Product Photos",
                    description: "Take or source high-quality images that showcase your products.",
                    tasks: [
                        "Set up a simple photo studio (white background, natural lighting)",
                        "Take 5-7 photos per product from different angles",
                        "Edit photos for consistency (brightness, cropping, background removal)",
                        "Optimize image file sizes for fast website loading"
                    ],
                    deliverable: "Complete product photo library ready for upload",
                    resources: ["Product Photography Guide", "Free Image Editing Tools List"]
                },
                {
                    day: 10,
                    title: "Write Compelling Product Descriptions",
                    description: "Create descriptions that highlight benefits and address customer concerns.",
                    tasks: [
                        "Write benefit-focused descriptions (focus on outcomes, not just features)",
                        "Include key specifications and dimensions",
                        "Address common questions and concerns",
                        "Add SEO keywords naturally throughout descriptions",
                        "Include care instructions or usage tips"
                    ],
                    deliverable: "Complete product descriptions for all initial products",
                    resources: ["Product Description Template", "SEO Keyword Research Tools"]
                },
                {
                    day: 11,
                    title: "Upload Products to Your Store",
                    description: "Add all products with photos, descriptions, and pricing.",
                    tasks: [
                        "Create product categories and collections",
                        "Upload each product with all photos and descriptions",
                        "Set inventory quantities and SKU numbers",
                        "Configure product variants (sizes, colors, etc.)",
                        "Set up related products and upsells"
                    ],
                    deliverable: "All products live on store with complete information",
                    resources: ["Product Upload Checklist", "Inventory Management Guide"]
                },
                {
                    day: 12,
                    title: "Set Up Payment Processing",
                    description: "Configure payment gateways so you can accept customer payments.",
                    tasks: [
                        "Set up primary payment gateway (Stripe, PayPal, Square)",
                        "Configure alternative payment methods (Apple Pay, Google Pay)",
                        "Test checkout process with small transaction",
                        "Set up sales tax collection if required",
                        "Verify payment notification emails are working"
                    ],
                    deliverable: "Payment processing fully functional and tested",
                    resources: ["Payment Gateway Comparison", "Checkout Optimization Tips"]
                },
                {
                    day: 13,
                    title: "Configure Shipping Settings",
                    description: "Set up shipping rates and options for your customers.",
                    tasks: [
                        "Research shipping carrier options (USPS, UPS, FedEx)",
                        "Calculate shipping costs for different zones",
                        "Set up shipping rates in your store (flat rate, calculated, free shipping thresholds)",
                        "Create shipping policies and delivery timeframes",
                        "Consider offering free shipping (build cost into product price)"
                    ],
                    deliverable: "Shipping rates configured with clear policies",
                    resources: ["Shipping Strategy Guide", "Carrier Comparison Chart"]
                },
                {
                    day: 14,
                    title: "Create Essential Store Pages",
                    description: "Build trust with professional policy pages and an about page.",
                    tasks: [
                        "Write About Us page telling your brand story",
                        "Create Shipping Policy page with delivery times",
                        "Write Return/Refund Policy (be clear and customer-friendly)",
                        "Create Privacy Policy and Terms of Service (use generators if needed)",
                        "Add Contact page with email and contact form"
                    ],
                    deliverable: "All essential pages published and linked in footer",
                    resources: ["Policy Page Templates", "About Page Examples"]
                }
            ]
        },
        {
            weekNumber: 3,
            weekTitle: "Marketing Setup & Pre-Launch",
            weekDescription: "Set up marketing channels, build an email list, and create pre-launch buzz.",
            icon: Megaphone,
            
            days: [
                {
                    day: 15,
                    title: "Set Up Email Marketing",
                    description: "Create your email list and welcome sequence.",
                    tasks: [
                        "Sign up for email marketing platform (Mailchimp, Klaviyo, ConvertKit)",
                        "Create lead magnet offer (discount code, free guide, etc.)",
                        "Design email signup popup for website",
                        "Write 3-email welcome series for new subscribers",
                        "Set up automated welcome email workflow"
                    ],
                    deliverable: "Email marketing system with welcome series active",
                    resources: ["Email Marketing Platform Comparison", "Welcome Email Templates"]
                },
                {
                    day: 16,
                    title: "Create Social Media Presence",
                    description: "Set up business profiles on key social platforms.",
                    tasks: [
                        "Create Instagram business account with bio and profile photo",
                        "Set up Facebook business page",
                        "Create TikTok account if relevant to your audience",
                        "Design branded social media graphics using Canva",
                        "Plan first week of social content (5-7 posts)"
                    ],
                    deliverable: "Business profiles on 2-3 platforms with first posts scheduled",
                    resources: ["Social Media Starter Guide", "Content Calendar Template"]
                },
                {
                    day: 17,
                    title: "Set Up Google Analytics & Tracking",
                    description: "Install analytics to track your store's performance.",
                    tasks: [
                        "Create Google Analytics account and install tracking code",
                        "Set up conversion tracking for purchases",
                        "Install Facebook Pixel on your store",
                        "Set up Google Search Console for SEO tracking",
                        "Create dashboard to monitor key metrics"
                    ],
                    deliverable: "All tracking and analytics properly installed",
                    resources: ["Analytics Setup Guide", "Key Metrics Cheat Sheet"]
                },
                {
                    day: 18,
                    title: "Plan Your Launch Strategy",
                    description: "Create a coordinated launch plan to maximize initial sales.",
                    tasks: [
                        "Set your official launch date (give yourself 5-7 days)",
                        "Plan launch promotion (limited-time discount, free shipping, bonus gifts)",
                        "Create launch email campaign (teaser, launch, reminder emails)",
                        "Plan social media countdown content",
                        "Reach out to friends/family to spread the word"
                    ],
                    deliverable: "Complete launch plan with timeline and promotional materials",
                    resources: ["Launch Timeline Template", "Launch Promotion Ideas"]
                },
                {
                    day: 19,
                    title: "Build Pre-Launch Buzz",
                    description: "Start generating excitement before your official launch.",
                    tasks: [
                        "Post 'coming soon' teasers on social media",
                        "Send email to your list announcing launch date",
                        "Create launch landing page with email signup",
                        "Reach out to potential influencers or partners",
                        "Join relevant online communities and mention your launch"
                    ],
                    deliverable: "Pre-launch content posted with early subscriber list growing",
                    resources: ["Pre-Launch Social Templates", "Influencer Outreach Script"]
                },
                {
                    day: 20,
                    title: "Test Everything Thoroughly",
                    description: "Ensure your store works perfectly before launch.",
                    tasks: [
                        "Complete test purchases on desktop and mobile",
                        "Test all payment methods and verify emails arrive",
                        "Check all links work correctly (navigation, footer, product links)",
                        "Review product pages for typos and formatting",
                        "Test mobile responsiveness of entire site",
                        "Verify shipping calculations are correct"
                    ],
                    deliverable: "Store fully tested with issues documented and fixed",
                    resources: ["Pre-Launch Testing Checklist"]
                },
                {
                    day: 21,
                    title: "Final Launch Preparation",
                    description: "Make final touches and prepare for launch day.",
                    tasks: [
                        "Create launch day content (graphics, captions, emails)",
                        "Schedule launch announcement across all channels",
                        "Prepare customer service responses for common questions",
                        "Stock up on packaging materials for shipping",
                        "Double-check inventory is updated and accurate",
                        "Set launch promotion to activate on launch day"
                    ],
                    deliverable: "Everything ready for launch the following week",
                    resources: ["Launch Day Checklist", "First Week Operations Guide"]
                }
            ]
        },
        {
            weekNumber: 4,
            weekTitle: "Launch Week & First Sales",
            weekDescription: "Execute your launch, get your first customers, and optimize for growth.",
            icon: Rocket,
            
            days: [
                {
                    day: 22,
                    title: "LAUNCH DAY!",
                    description: "Your store officially goes live to the world.",
                    tasks: [
                        "Publish launch announcement on all social channels",
                        "Send launch email to your full subscriber list",
                        "Post in relevant communities and groups (don't spam!)",
                        "Share personal stories about why you started this business",
                        "Monitor store traffic and be ready to answer questions",
                        "Celebrate your first sale!"
                    ],
                    deliverable: "Store officially live with launch announcement distributed",
                    resources: ["Launch Day Timeline", "Customer Service Response Templates"]
                },
                {
                    day: 23,
                    title: "Drive Traffic & Make First Sales",
                    description: "Focus on getting visitors to your store and converting them.",
                    tasks: [
                        "Run launch promotion ads on Facebook/Instagram (even small budget helps)",
                        "Post user-generated content or behind-the-scenes content",
                        "Engage with everyone who comments or messages",
                        "Send follow-up email highlighting best sellers",
                        "Reach out personally to warm contacts asking for support"
                    ],
                    deliverable: "Consistent traffic and hopefully first few sales!",
                    resources: ["Quick Traffic Generation Ideas", "First Week Ad Strategy"]
                },
                {
                    day: 24,
                    title: "Fulfill Your First Orders",
                    description: "Process orders quickly and delight your first customers.",
                    tasks: [
                        "Process all orders within 24 hours",
                        "Pack products carefully with branded materials if possible",
                        "Include thank you note or small surprise gift",
                        "Send shipping confirmation emails with tracking",
                        "Follow up 1-2 days after delivery to request feedback"
                    ],
                    deliverable: "All orders fulfilled and shipped professionally",
                    resources: ["Order Fulfillment Checklist", "Thank You Note Templates"]
                },
                {
                    day: 25,
                    title: "Gather Customer Feedback",
                    description: "Learn from your first customers to improve.",
                    tasks: [
                        "Send feedback request email to customers who received orders",
                        "Ask specific questions about product quality, shipping, website experience",
                        "Request product reviews and photos",
                        "Note any common questions or issues",
                        "Make list of improvements based on feedback"
                    ],
                    deliverable: "Customer feedback collected and improvement list created",
                    resources: ["Feedback Request Email Template", "Review Generation Guide"]
                },
                {
                    day: 26,
                    title: "Analyze Week 1 Performance",
                    description: "Review your first week's data to identify what's working.",
                    tasks: [
                        "Check Google Analytics for traffic sources and behavior",
                        "Review sales data: which products sold best?",
                        "Calculate conversion rate (orders / visitors)",
                        "Review social media engagement and follower growth",
                        "Identify your most effective marketing channel"
                    ],
                    deliverable: "Week 1 performance report with key insights",
                    resources: ["Analytics Dashboard Template", "Key Metrics Definitions"]
                },
                {
                    day: 27,
                    title: "Optimize Based on Data",
                    description: "Make improvements based on your first week's learnings.",
                    tasks: [
                        "Update product pages based on customer questions",
                        "Improve or replace underperforming product photos",
                        "Adjust pricing if needed based on feedback",
                        "Double down on marketing channels that drove sales",
                        "Fix any technical issues customers reported"
                    ],
                    deliverable: "Store improvements implemented",
                    resources: ["Conversion Optimization Checklist"]
                },
                {
                    day: 28,
                    title: "Plan Your Next 30 Days",
                    description: "Create your growth strategy for month 2.",
                    tasks: [
                        "Set revenue goal for month 2",
                        "Plan product launches or new variations",
                        "Schedule content calendar for next month",
                        "Budget for paid advertising if appropriate",
                        "Identify partnership or collaboration opportunities",
                        "Set up systems for ongoing operations"
                    ],
                    deliverable: "Month 2 growth plan with clear goals and tactics",
                    resources: ["30-60-90 Day Growth Plan Template", "Scaling Strategies Guide"]
                },
                {
                    day: 29,
                    title: "Build Long-Term Systems",
                    description: "Set up processes for sustainable growth.",
                    tasks: [
                        "Create standard operating procedures for order fulfillment",
                        "Set up automated email sequences (abandoned cart, post-purchase)",
                        "Organize bookkeeping system for tracking expenses and revenue",
                        "Schedule regular content creation time",
                        "Set up customer service system (response templates, FAQ page)"
                    ],
                    deliverable: "Core business systems documented and implemented",
                    resources: ["SOP Templates", "Automation Ideas Checklist"]
                },
                {
                    day: 30,
                    title: "Celebrate & Reflect",
                    description: "Acknowledge your achievement and plan for continued success.",
                    tasks: [
                        "Review your journey from Day 1 to today",
                        "Celebrate wins, no matter how small",
                        "Share your story with your audience",
                        "Thank everyone who supported you",
                        "Set bigger goals for next quarter",
                        "Commit to consistent effort for next 90 days"
                    ],
                    deliverable: "You now have a LIVE, REVENUE-GENERATING online store! 🎉",
                    resources: ["Success Story Template", "Quarterly Planning Worksheet"]
                }
            ]
        }
    ]
};