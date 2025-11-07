
import React from 'react';
import { Rocket, CheckCircle, ArrowRight, Zap, Users, BarChart3, Mail, Calendar, Phone, Globe, Star, Shield } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: "Email & SMS Marketing",
    description: "Create automated campaigns that nurture leads and convert them into customers"
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Let clients book appointments automatically with calendar integration"
  },
  {
    icon: Phone,
    title: "CRM & Pipeline Management",
    description: "Track leads, manage customer relationships, and never miss a follow-up"
  },
  {
    icon: Globe,
    title: "Website & Funnel Builder",
    description: "Create high-converting websites and sales funnels with drag-and-drop simplicity"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Get detailed insights on your marketing performance and ROI"
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description: "Automate repetitive tasks and focus on growing your business"
  }
];

const benefits = [
  "Save 10+ hours per week on manual tasks",
  "Increase lead conversion by up to 300%", 
  "Centralize all your business tools in one platform",
  "Scale your business without hiring additional staff",
  "Professional tools used by 6 and 7-figure businesses",
  "White-label solution you can rebrand as your own"
];

export default function GoHighLevelUpgrade() {
  const handleUpgrade = () => {
    window.open('https://thebusinessminds.com/signup-form', '_blank');
  };

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div 
          className="card p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          }}
        >
          <div className="relative z-10 text-white">
            <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-6">
              <Rocket className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Upgrade Your Business with The Business Engine
            </h1>
            <p className="text-xl mb-6 max-w-3xl mx-auto opacity-90">
              The all-in-one business automation platform that helps entrepreneurs streamline operations, 
              increase conversions, and scale faster than ever before.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 mr-2" />
                <span>Used by 100k+ businesses</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 text-center">
            Stop Juggling Multiple Tools
          </h2>
          <p className="text-[var(--text-soft)] text-center mb-6 max-w-3xl mx-auto">
            As your business grows, managing separate tools for email marketing, CRM, scheduling, 
            websites, and automation becomes overwhelming and expensive. The Business Engine consolidates 
            everything into one powerful platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-red-50 border border-red-200 p-6 rounded-md">
              <h3 className="font-bold text-red-800 mb-3">❌ Without The Business Engine</h3>
              <ul className="space-y-2 text-red-700">
                <li>• Pay for 5-10 different software subscriptions</li>
                <li>• Spend hours transferring data between systems</li>
                <li>• Miss leads due to poor integration</li>
                <li>• Struggle with complex automation setups</li>
                <li>• Limited customer support across platforms</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 p-6 rounded-md">
              <h3 className="font-bold text-green-800 mb-3">✅ With The Business Engine</h3>
              <ul className="space-y-2 text-green-700">
                <li>• One affordable monthly subscription</li>
                <li>• All data synced automatically</li>
                <li>• Never miss a lead with smart automation</li>
                <li>• Simple drag-and-drop workflow builder</li>
                <li>• Dedicated support team and training</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-[var(--text-soft)] max-w-2xl mx-auto">
              The Business Engine replaces dozens of expensive tools with one comprehensive platform 
              designed specifically for growing businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-all">
                <div className="bg-blue-100 p-3 rounded-md w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-soft)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="card p-8 bg-gray-50">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">
            Why Business Minds Members Love The Business Engine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-[var(--text-main)]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">
            Simple, Transparent Pricing
          </h2>
          <div className="bg-[var(--primary-gold)] text-white p-8 rounded-lg max-w-md mx-auto mb-6">
            <div className="text-4xl font-bold mb-2">$97<span className="text-lg">/month</span></div>
            <div className="text-lg mb-4">Everything Included</div>
            <div className="text-sm opacity-90">
              Replace $500+ worth of separate tools
            </div>
          </div>
          
          <p className="text-[var(--text-soft)] mb-6 max-w-2xl mx-auto">
            <strong>Special for Business Minds Members:</strong> Start with a 14-day free trial 
            and get exclusive onboarding support to set up your first automation workflows.
          </p>
        </div>

        {/* CTA Section */}
        <div 
          className="card p-8 md:p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: '#000000' }}
        >
          <div className="relative z-10 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Automate Your Business?
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who've transformed their businesses with The Business Engine. 
              Start your free trial today and see the difference automation can make.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleUpgrade}
                className="btn bg-[var(--primary-gold)] text-white text-lg px-8 py-3 hover:bg-opacity-90"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="text-sm opacity-75">
                ✅ No credit card required • ✅ Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold text-[var(--text-main)] mb-2">
                Do I need technical skills to use The Business Engine?
              </h3>
              <p className="text-[var(--text-soft)]">
                Not at all! The Business Engine is designed for entrepreneurs, not developers. 
                Everything uses drag-and-drop builders and pre-built templates.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-main)] mb-2">
                Can I import my existing contacts and data?
              </h3>
              <p className="text-[var(--text-soft)]">
                Yes, The Business Engine makes it easy to import contacts from any CRM, 
                email platform, or spreadsheet with their migration tools.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-main)] mb-2">
                Is there training and support available?
              </h3>
              <p className="text-[var(--text-soft)]">
                Absolutely! The Business Engine provides extensive training resources, 
                live support, and as a Business Minds member, you'll get our exclusive setup guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
