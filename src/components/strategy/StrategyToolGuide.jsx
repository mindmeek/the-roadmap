import React from 'react';
import { Lightbulb, CheckSquare, Target, PenSquare, ArrowRight } from 'lucide-react';

const guideContent = {
  business_model_canvas: {
    title: 'How to Use the Business Model Canvas',
    steps: [
      { title: 'Customer Segments', description: 'Start here. Who are you creating value for? Be specific. Think about your early adopters first.' },
      { title: 'Value Propositions', description: 'What core value do you deliver? How do you solve your customers\' problems or satisfy their needs?' },
      { title: 'Channels', description: 'How do you reach your customers to deliver the value proposition? Think about marketing, sales, and distribution.' },
      { title: 'Customer Relationships', description: 'What kind of relationship will you have with your customers? (e.g., personal assistance, self-service)' },
      { title: 'Revenue Streams', description: 'How will you make money? What are customers truly willing to pay for? (e.g., subscriptions, one-time sales)' },
      { title: 'Key Activities', description: 'What are the most important things you must do to make your business model work? (e.g., production, marketing)' },
      { title: 'Key Resources', description: 'What assets are essential to your business? (e.g., physical, intellectual, human, financial)' },
      { title: 'Key Partnerships', description: 'Who are the key partners and suppliers you need to work with to make the business model successful?' },
      { title: 'Cost Structure', description: 'What are the most important costs in your business? Are you cost-driven or value-driven?' },
    ]
  },
  swot_analysis: {
    title: 'How to Conduct a SWOT Analysis',
    steps: [
      { title: 'Gather Information', description: 'Collect data about your business and the market. Talk to your team, customers, and partners.' },
      { title: 'Brainstorm Strengths', description: 'List your internal advantages. What do you do well? What unique resources do you have?' },
      { title: 'Identify Weaknesses', description: 'Be honest about your internal disadvantages. Where do you lack resources? What could you improve?' },
      { title: 'Explore Opportunities', description: 'List external factors you can capitalize on. Look at market trends, competitor gaps, and new technologies.' },
      { title: 'Recognize Threats', description: 'List external factors that could harm your business. Consider competition, market shifts, and economic conditions.' },
      { title: 'Develop Strategies', description: 'Connect your quadrants. How can you use strengths to leverage opportunities (SO)? How can you use strengths to mitigate threats (ST)? How can you improve weaknesses using opportunities (WO)? How can you minimize weaknesses and avoid threats (WT)?' },
    ]
  },
  ideal_client: {
    title: 'How to Define Your Ideal Client Profile',
    steps: [
      { title: 'Analyze Your Best Current Clients', description: 'If you have existing customers, who are your favorites? What do they have in common?' },
      { title: 'Define Demographics', description: 'Start with the basics: age, gender, location, income, occupation. This creates a basic sketch.' },
      { title: 'Detail Psychographics', description: 'Go deeper. What are their values, interests, lifestyles, and personality traits? What motivates them?' },
      { title: 'Identify Goals & Challenges', description: 'What are they trying to achieve (related to your offer)? What obstacles are in their way?' },
      { title: 'Uncover Pain Points', description: 'What are their specific frustrations and problems? Use their own words if possible.' },
      { title: 'Create a "Day in the Life"', description: 'Describe their daily routine to build empathy and understand their context.' },
      { title: 'Write a Summary', description: 'Create a short paragraph that brings your ideal client to life. Give them a name!' }
    ]
  },
  value_proposition_canvas: {
    title: 'How to Use the Value Proposition Canvas',
    steps: [
      { title: 'Start with the Customer Profile (Right Side)', description: 'Always begin by understanding your customer deeply. This prevents you from building something nobody wants.' },
      { title: 'Identify Customer Jobs', description: 'What tasks, problems, or needs is your customer trying to accomplish? Think functional, social, and emotional jobs.' },
      { title: 'Uncover Pains', description: 'What annoys your customer before, during, and after getting a job done? What are their risks and obstacles?' },
      { title: 'Define Gains', description: 'What outcomes and benefits does your customer want? This includes required, expected, desired, and unexpected gains.' },
      { title: 'Switch to the Value Map (Left Side)', description: 'Now, design how you will create value for that customer profile.' },
      { title: 'List Products & Services', description: 'What are the specific offerings you provide that help customers with their jobs?' },
      { title: 'Map Pain Relievers', description: 'How do your products and services specifically alleviate customer pains?' },
      { title: 'Map Gain Creators', description: 'How do your products and services produce the outcomes and benefits your customer desires?' },
      { title: 'Check for Fit', description: 'Continuously check if your value map aligns with your customer profile. Iterate until you have a strong connection.' }
    ]
  },
  value_ladder: {
    title: 'How to Build Your Value Ladder',
    steps: [
      { title: 'Start with Your Core Offer', description: 'What is the main, high-value product or service you want to sell? This is the central piece of your ladder.' },
      { title: 'Develop an Entry-Level Offer', description: 'Create a lower-priced, low-risk offer that solves a small part of the customer\'s problem. This builds trust and gets them to make their first purchase.' },
      { title: 'Create a Lead Magnet', description: 'What can you offer for free in exchange for an email address? This should be highly valuable and solve a specific, small problem. (e.g., checklist, template, free guide).' },
      { title: 'Design a Premium Offer', description: 'What is the next logical step after your core offer? This is for customers who want more access, support, or a bigger result. (e.g., VIP program, coaching).' },
      { title: 'Plan an Ultra-Premium Offer', description: 'What is the ultimate, exclusive offer for your best customers? (e.g., mastermind, done-for-you service).' },
      { title: 'Map the Customer Journey', description: 'Outline how customers will move from one level to the next. What is the trigger or marketing message for each upsell?' }
    ]
  },
  brand_kit: {
    title: 'How to Create Your Brand Kit',
    steps: [
        { title: 'Define Your Brand Name', description: 'Choose a name that is memorable, easy to pronounce, and reflects your brand’s essence.' },
        { title: 'Develop Your Mission & Vision', description: 'Your mission is your purpose (what you do), your vision is your future aspiration (why you do it).' },
        { title: 'Craft Your Tagline', description: 'Create a short, catchy slogan that encapsulates your brand’s promise.' },
        { title: 'Establish Voice & Tone', description: 'How does your brand sound? (e.g., professional, friendly, witty, authoritative). Be consistent.' },
        { title: 'Design Your Logos', description: 'Create a primary logo and variations for different uses (e.g., social media, website favicon). Upload them here.' },
        { title: 'Choose Your Color Palette', description: 'Select a primary, secondary, and accent color. Define what each color represents for your brand.' },
        { title: 'Select Your Fonts', description: 'Choose a primary font for headings and a secondary font for body text that are legible and match your brand’s personality.' },
    ]
  }
};

const StrategyToolGuide = ({ tool }) => {
    const guide = guideContent[tool];

    if (!guide) {
        return null;
    }

    return (
        <div className="card p-6 mt-8 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-3 text-[var(--primary-gold)]" />
                {guide.title}
            </h3>
            <div className="space-y-4">
                {guide.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 flex flex-col items-center mr-4">
                            <div className="bg-[var(--primary-gold)] text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                                {index + 1}
                            </div>
                            {index < guide.steps.length - 1 && (
                                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm text-[var(--text-main)]">{step.title}</h4>
                            <p className="text-sm text-[var(--text-soft)]">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StrategyToolGuide;