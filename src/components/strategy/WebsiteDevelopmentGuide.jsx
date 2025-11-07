
import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Circle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const developmentSteps = [
    {
        id: 'step1',
        title: 'Step 1 — Onboarding & Access',
        content: () => (
            <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-3">What We Need From You:</h3>
                <ul className="list-disc list-inside space-y-3 text-[var(--text-soft)]">
                    <li>
                        <strong>Domain Name Access:</strong> We’ll need login details for your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
                        <ul className="list-circle list-inside ml-6 mt-2 text-sm space-y-1">
                            <li>If you’re using **The Business HQ Drag-and-Drop Builder** — we only need access to your domain name.</li>
                            <li>If you’re using **Our WordPress Hosting within Business HQ** — we also just need access to your domain name.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Logo, Colors & Fonts:</strong> Add these to your Brand Kit.
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-3 mt-2 text-sm">
                            <p>1. Log in to your **The Launchpad** account.</p>
                            <p>2. Go to <Link to={createPageUrl('MyStrategy')} className="text-[var(--primary-gold)] font-medium hover:underline">My Strategy</Link> &rarr; <strong>Brand Kit</strong>.</p>
                            <p>3. Upload your logo, add brand colors, and fonts (leave blank if you don’t have fonts).</p>
                        </div>
                    </li>
                    <li>
                        <strong>Submitting Your Information:</strong>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-3 mt-2 text-sm">
                           <p>Please email your domain username/password and website content to <strong className="text-[var(--primary-gold)]">team@thebminds.com</strong>.</p>
                           <p className="mt-2">For content, you can also create a document (e.g. Google Docs) and share it with us at the same email address.</p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    },
    {
        id: 'step2',
        title: 'Step 2 — Design Inspiration',
        content: () => (
             <div>
                <h3 className="font-semibold text-[var(--text-main)] mb-3">To help us match your vision, please provide:</h3>
                <ul className="list-disc list-inside space-y-3 text-[var(--text-soft)]">
                    <li><strong>Three examples</strong> of websites you like (from anywhere on the web). You can send these to us via email.</li>
                    <li>
                        <strong>Your target audience:</strong> Complete your Ideal Client Profile.
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-3 mt-2 text-sm">
                           <p>Go to <Link to={createPageUrl('MyStrategy')} className="text-[var(--primary-gold)] font-medium hover:underline">My Strategy</Link> &rarr; <strong>Ideal Client Profile</strong>.</p>
                        </div>
                    </li>
                </ul>
                <p className="text-sm text-[var(--text-soft)] mt-3">This ensures we design a site that fits your brand, style, and business goals.</p>
            </div>
        )
    },
    {
        id: 'step3',
        title: 'Step 3 — Content Preparation',
        content: () => (
             <div>
                <ul className="list-disc list-inside space-y-3 text-[var(--text-soft)]">
                    <li>Once the design is approved, you have **two weeks** to provide all website content.</li>
                    <li>
                        You can use our AI to write your web copy quickly and professionally.
                         <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md p-3 mt-2 text-sm">
                           <p>Go to <Link to={createPageUrl('ContentCopilot')} className="text-[var(--primary-gold)] font-medium hover:underline">Elyzet AI &rarr; Content Copilot</Link>.</p>
                        </div>
                    </li>
                     <li>Elyzet can also help you create content for marketing, sales, and other areas of your business.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'step4',
        title: 'Step 4 — Payment Schedule',
        content: () => (
             <div>
                <ul className="list-disc list-inside space-y-2 text-[var(--text-soft)]">
                    <li><strong>50% Upfront</strong> — to begin your project.</li>
                    <li><strong>25%</strong> — when the design is complete.</li>
                    <li><strong>25% Final Payment</strong> — when your content is added and the site is finalized.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'step5',
        title: 'Step 5 — Timeline & Special Features',
        content: () => (
             <div>
                <ul className="list-disc list-inside space-y-2 text-[var(--text-soft)]">
                    <li>Standard websites take **no longer than 2 months** from start to finish (assuming we receive content and approvals on time).</li>
                    <li>If your site includes **special features** or a **community platform**, the timeline may extend slightly — we’ll discuss this before starting.</li>
                </ul>
            </div>
        )
    },
    {
        id: 'step6',
        title: 'Step 6 — Final Launch',
        content: () => (
            <div>
                <ul className="list-disc list-inside space-y-2 text-[var(--text-soft)]">
                    <li>Once content is added and you’ve approved the final version, we’ll launch your site.</li>
                    <li>You’ll receive training or documentation (depending on your plan) so you can update and manage your site moving forward.</li>
                </ul>
            </div>
        )
    }
];

const WebsiteDevelopmentGuide = () => {
    const [openStep, setOpenStep] = useState(developmentSteps[0].id);
    const [completedSteps, setCompletedSteps] = useState({});

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('websiteDevProgress');
            if (savedProgress) {
                setCompletedSteps(JSON.parse(savedProgress));
            }
        } catch (e) {
            console.error("Failed to parse website dev progress from localStorage", e);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('websiteDevProgress', JSON.stringify(completedSteps));
        } catch (e) {
            console.error("Failed to save website dev progress to localStorage", e);
        }
    }, [completedSteps]);

    const handleToggleAccordion = (stepId) => {
        setOpenStep(openStep === stepId ? null : stepId);
    };

    const handleToggleStepCompletion = (stepId) => {
        setCompletedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    const progressPercentage = (completedCount / developmentSteps.length) * 100;

    return (
        <div className="card p-6 md:p-8">
            <div className="text-center md:text-left mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">The Business Minds Website Development Process</h2>
                <p className="text-[var(--text-soft)] mt-2">Your vision, brought to life — with clarity and speed.</p>
            </div>
            
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-[var(--text-main)]">Progress</span>
                    <span className="font-bold text-[var(--primary-gold)]">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                        className="bg-[var(--primary-gold)] h-2.5 rounded-full transition-all duration-500" 
                        style={{width: `${progressPercentage}%`}}>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {developmentSteps.map((step) => {
                    const isComplete = completedSteps[step.id];
                    const isOpen = openStep === step.id;

                    return (
                        <div key={step.id} className={`border rounded-lg ${isOpen ? 'border-[var(--primary-gold)]' : 'border-gray-200 dark:border-gray-700'}`}>
                            <button
                                onClick={() => handleToggleAccordion(step.id)}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <div className="flex items-center space-x-3">
                                    {isComplete ? (
                                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    ) : (
                                        <div className="w-6 h-6 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center font-bold text-sm text-[var(--text-main)]">
                                            {developmentSteps.indexOf(step) + 1}
                                        </div>
                                    )}
                                    <span className={`font-semibold ${isComplete ? 'line-through text-[var(--text-soft)]' : 'text-[var(--text-main)]'}`}>
                                        {step.title}
                                    </span>
                                </div>
                                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4">
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <step.content />
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`step-complete-${step.id}`}
                                                checked={!!isComplete}
                                                onChange={() => handleToggleStepCompletion(step.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                                            />
                                            <label htmlFor={`step-complete-${step.id}`} className="ml-2 block text-sm font-medium text-[var(--text-soft)]">
                                                Mark this step as complete
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

             <div className="mt-8 card p-4 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-[var(--primary-gold)] mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-[var(--text-main)]">A Quick Summary</h4>
                        <p className="text-sm text-[var(--text-soft)] mt-1">
                            <strong>✅ Your Role:</strong> Provide access, brand assets, inspiration examples, and content within the timelines.
                        </p>
                        <p className="text-sm text-[var(--text-soft)] mt-1">
                           <strong>✅ Our Role:</strong> Design, build, and deliver a professional website that matches your vision and works to grow your business.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteDevelopmentGuide;
