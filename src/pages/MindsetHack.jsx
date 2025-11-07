
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, ArrowLeft, CheckCircle, Clock, TrendingUp, Target, Save } from "lucide-react";

const mindsetHacks = {
  "8020-rule": {
    title: "The 80/20 Rule (Pareto Principle)",
    readTime: "5 min read",
    overview: "The 80/20 rule states that 80% of results come from 20% of efforts. This principle helps you identify and focus on the activities that drive the most impact in your business and life.",
    whyItHelps: "By identifying your high-impact activities, you can eliminate time-wasting tasks and dramatically increase your productivity and results. This principle helps entrepreneurs focus on what truly matters for business growth.",
    actionSteps: [
      "**Audit Your Activities:** List all your daily business activities for one week. Track how much time you spend on each activity.",
      "**Identify Your 20%:** Analyze which activities generate the most revenue, customers, or business growth. These are your high-impact 20%.",
      "**Eliminate or Delegate the 80%:** Identify low-impact activities that consume time but don't drive results. Eliminate, automate, or delegate these tasks.",
      "**Focus Your Energy:** Dedicate more time and energy to your high-impact 20% activities. Block time in your calendar specifically for these priorities."
    ],
    practicalTips: [
      "Use the 'Revenue Per Hour' calculation to identify your most valuable activities",
      "Ask yourself: 'If I could only do 3 things today, what would move my business forward the most?'",
      "Review your 80/20 analysis monthly to stay focused on what matters most"
    ]
  },
  "growth-mindset": {
    title: "Growth vs Fixed Mindset",
    readTime: "6 min read",
    overview: "A growth mindset believes abilities can be developed through dedication and hard work. A fixed mindset believes abilities are static traits. Developing a growth mindset is crucial for entrepreneurial success.",
    whyItHelps: "Growth mindset enables you to see failures as learning opportunities, embrace challenges, and continuously improve. This resilience and adaptability are essential for building successful businesses in changing markets.",
    actionSteps: [
      "**Reframe Failures:** When something doesn't work, ask 'What can I learn from this?' instead of 'I'm not good at this.'",
      "**Embrace Challenges:** Actively seek out challenges that stretch your abilities. View difficult situations as opportunities to grow.",
      "**Focus on Process:** Celebrate the effort and learning process, not just the end results. Acknowledge progress and improvement.",
      "**Learn from Others:** Study successful entrepreneurs and ask 'How did they develop these skills?' instead of 'They're just naturally talented.'"
    ],
    practicalTips: [
      "Replace 'I don't know how' with 'I don't know how yet'",
      "Keep a learning journal to track what you discover from each challenge",
      "Surround yourself with people who challenge and inspire you to grow"
    ]
  },
  "three-ps": {
    title: "The Three P's of Time Management",
    readTime: "4 min read",
    overview: "The Three P's - Prioritize, Plan, and Perform - create a systematic approach to managing time and tasks effectively. This framework ensures you're working on the right things at the right time.",
    whyItHelps: "This system eliminates decision fatigue, reduces overwhelm, and ensures you're consistently working on high-impact activities. It creates structure while maintaining flexibility for unexpected opportunities.",
    actionSteps: [
      "**Prioritize:** Each evening, identify your top 3 priorities for the next day. Use importance vs urgency to rank tasks.",
      "**Plan:** Time-block your calendar with specific tasks. Estimate how long each task will take and schedule accordingly.",
      "**Perform:** Execute your plan with focus. Work on one task at a time and minimize distractions during focus blocks.",
      "**Review and Adjust:** At the end of each day, review what worked and adjust your approach for tomorrow."
    ],
    practicalTips: [
      "Use the Eisenhower Matrix to categorize tasks by importance and urgency",
      "Block similar tasks together (batch processing) for better efficiency",
      "Include buffer time in your schedule for unexpected tasks or delays"
    ]
  },
  "two-minute-rule": {
    title: "The Two-Minute Rule",
    readTime: "3 min read",
    overview: "If a task takes less than two minutes to complete, do it immediately rather than adding it to your to-do list. This prevents small tasks from accumulating and becoming overwhelming.",
    whyItHelps: "This rule prevents task pile-up, reduces mental clutter, and creates momentum. It's especially powerful for entrepreneurs who deal with many small decisions and quick tasks throughout the day.",
    actionSteps: [
      "**Immediate Assessment:** When a task comes up, immediately estimate if it takes less than 2 minutes to complete.",
      "**Do It Now:** If it's under 2 minutes, complete it immediately rather than writing it down or postponing it.",
      "**Schedule or Delegate:** If it takes longer than 2 minutes, either schedule it for a focused work block or delegate it to someone else.",
      "**Review Weekly:** Look at tasks that repeatedly take 'just 2 minutes' - these might need systematic solutions."
    ],
    practicalTips: [
      "Set up templates for common quick tasks (email responses, invoice approvals)",
      "Use voice-to-text for quick notes and responses to save time",
      "Create standard operating procedures for recurring 2-minute tasks"
    ]
  },
  "energy-management": {
    title: "Energy Management Over Time Management",
    readTime: "7 min read",
    overview: "Instead of just managing time, manage your energy levels. Work on your most important tasks when your energy is highest, and align different types of work with your natural energy rhythms.",
    whyItHelps: "Energy management leads to higher quality work, better decision-making, and reduced burnout. By working with your natural rhythms, you can accomplish more in less time while feeling more fulfilled.",
    actionSteps: [
      "**Track Your Energy:** For one week, note your energy levels every 2 hours on a scale of 1-10. Identify your natural peaks and valleys.",
      "**Match Tasks to Energy:** Schedule your most important, creative work during high-energy periods. Save routine tasks for low-energy times.",
      "**Protect Peak Hours:** Guard your high-energy times from meetings, emails, or interruptions. Use these for your most important work.",
      "**Manage Energy Drains:** Identify what drains your energy (difficult people, certain tasks, environments) and minimize or eliminate these when possible."
    ],
    practicalTips: [
      "Most people have peak energy 2-4 hours after waking up",
      "Take regular breaks to maintain energy throughout the day",
      "Notice how different foods, exercise, and sleep affect your energy levels"
    ]
  },
  "deep-work": {
    title: "Deep Work Principles",
    readTime: "8 min read",
    overview: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.",
    whyItHelps: "In a world of constant digital distraction, the ability to perform deep work is becoming increasingly rare and valuable. Mastering it allows you to produce high-quality, creative work that can't be easily replicated, giving you a massive competitive advantage.",
    actionSteps: [
      "**Schedule Deep Work Blocks:** Use The Command Hub Calendar to block out 90-minute to 2-hour windows for focused work. Treat these appointments as non-negotiable.",
      "**Choose Your Deep Work Ritual:** Create a routine to signal the start of deep work. This could be making a specific cup of tea, closing your office door, or turning on focus music.",
      "**Eliminate All Distractions:** Turn off your phone, close all unnecessary browser tabs, and disable notifications on your computer.",
      "**Use The Command Hub Social Planner:** Schedule your social media posts in advance using The Command Hub so you don't need to be on social media during deep work blocks.",
      "**Track Your Deep Work Hours:** Use a simple spreadsheet or The Command Hub's CRM to log your deep work hours each day. Aim to gradually increase the time.",
      "**Embrace Boredom:** Don't pull out your phone every time you have a spare moment. Allowing your mind to be bored can improve your ability to focus."
    ],
    practicalTips: [
      "Work in a dedicated space free from interruptions",
      "Inform your team or family about your deep work schedule",
      "Have a clear goal for each deep work session",
      "Use The Command Hub Mobile App to manage urgent tasks outside of your focus blocks"
    ]
  },
  "decision-fatigue": {
    title: "Overcoming Decision Fatigue",
    readTime: "5 min read",
    overview: "Decision fatigue refers to the deteriorating quality of decisions made by an individual after a long session of decision making. As an entrepreneur, you make hundreds of decisions a day, which can drain your mental energy.",
    whyItHelps: "By reducing the number of trivial decisions you make, you preserve your mental energy for the high-stakes decisions that truly matter for your business's growth and success.",
    actionSteps: [
      "**Make Important Decisions Early:** Schedule your most critical thinking and decision-making tasks for the morning when your mind is fresh.",
      "**Automate Repetitive Decisions:** Use The Command Hub's Marketing Automation to handle routine tasks like email follow-ups and social media posting.",
      "**Standardize Your Processes:** Create Standard Operating Procedures (SOPs) for common business tasks so you don't have to reinvent the wheel each time.",
      "**Limit Your Options:** When facing a decision, try to narrow it down to your top 2-3 choices instead of analyzing every possibility.",
      "**Plan Your Week in Advance:** Use The Command Hub Calendar to plan your outfits, meals, and daily priorities on Sunday to reduce daily decision-making.",
      "**Trust Your Gut on Small Decisions:** For low-impact choices, make a quick decision and move on. Don't overthink it."
    ],
    practicalTips: [
      "Create a 'decision journal' in The Command Hub CRM notes to track your choices and outcomes",
      "Delegate smaller decisions to team members or virtual assistants",
      "Establish clear principles and values for your business to guide your decisions"
    ]
  },
  "habit-stacking": {
    title: "Habit Stacking for Success",
    readTime: "6 min read",
    overview: "Habit stacking is a technique where you link a new desired habit to an existing habit you already do each day. The formula is: 'After [CURRENT HABIT], I will [NEW HABIT].'",
    whyItHelps: "This method leverages existing neural pathways in your brain, making it significantly easier to adopt new positive behaviors. It removes the need for motivation and makes habit formation feel more natural and automatic.",
    actionSteps: [
      "**Identify Your Existing Habits:** Make a list of things you do every day without fail (e.g., 'After I pour my morning coffee...', 'After I brush my teeth...').",
      "**Choose a Small New Habit:** Select a new habit that takes less than two minutes to complete (e.g., '...I will meditate for one minute.', '...I will write down my top priority for the day.').",
      "**Create Your Habit Stack Formula:** Clearly state your habit stack. For example: 'After I finish my morning coffee, I will open The Command Hub Calendar and review my top 3 priorities.'",
      "**Make It Obvious:** Set up your environment for success. If your new habit is to review your finances, have The Command Hub's payment dashboard open on your computer.",
      "**Start Small and Build Up:** Once the new habit is established, you can gradually increase its duration or difficulty.",
      "**Track Your Streak:** Use a journal or a simple checklist in The Command Hub notes to track your consistency. Don't break the chain!"
    ],
    practicalTips: [
      "Use The Command Hub Mobile App to set a reminder for your new habit stack",
      "Choose a current habit that has the same frequency as your desired new habit",
      "Be very specific. 'After I close my laptop for the day, I will write down one thing I'm grateful for.'"
    ]
  },
  "power-of-no": {
    title: "The Power of Saying No",
    readTime: "4 min read",
    overview: "Saying 'no' is a critical skill for entrepreneurs. Every time you say 'yes' to something, you are saying 'no' to something else—often your own priorities. Learning to decline non-essential requests protects your time, energy, and focus.",
    whyItHelps: "Mastering the art of saying 'no' prevents burnout, keeps you focused on your most important goals, and ensures you are in control of your schedule, rather than letting others dictate your priorities.",
    actionSteps: [
      "**Define Your Priorities:** Get crystal clear on your goals for the quarter. If a request doesn't align with these goals, it's a candidate for a 'no'.",
      "**Create a 'Not-To-Do' List:** List activities that drain your time or don't move your business forward. Commit to saying no to these things.",
      "**Use Polite but Firm Scripts:** Prepare responses like, 'Thank you for thinking of me, but I can't commit to that right now as I'm focused on other priorities.'",
      "**Offer an Alternative (Optional):** If appropriate, you can soften the 'no' by suggesting another resource or a different timeline. 'I can't help with that this week, but check out this tool...'",
      "**Delay Your Response:** Instead of an immediate 'yes', say 'Let me check my schedule in The Command Hub Calendar and get back to you.' This gives you time to evaluate the request.",
      "**Recognize the Cost of 'Yes':** Before agreeing, ask yourself: 'What am I saying no to by saying yes to this?'"
    ],
    practicalTips: [
      "Use The Command Hub's CRM to track requests and your responses",
      "Don't over-explain your 'no'. A simple, polite refusal is enough.",
      "Remember that saying 'no' respects both your time and the other person's."
    ]
  },
  "systems-thinking": {
    title: "Build Systems That Work Without You",
    readTime: "9 min read",
    overview: "Systems thinking is the process of building automated and repeatable processes for every aspect of your business. The goal is to create a business that can run and grow without your direct involvement in every single task.",
    whyItHelps: "Building systems allows you to scale your business, free up your time to work ON the business instead of IN it, ensure consistent quality, and ultimately build a valuable asset that isn't dependent on you.",
    actionSteps: [
      "**Document Everything:** For one week, write down every single task you do. This will reveal what can be systematized.",
      "**Identify Repetitive Tasks:** Look for tasks that you do over and over again. These are the first candidates for systemization.",
      "**Create Checklists and Templates:** Use The Command Hub's notes or document features to create step-by-step checklists for common processes.",
      "**Leverage The Command Hub Automation:** Use The Command Hub's Marketing Automation and Sales Funnels to automate lead capture, nurturing, and follow-ups.",
      "**Automate Your Onboarding:** Create an automated email sequence in The Command Hub to welcome and onboard new clients or customers.",
      "**Delegate with Clear Instructions:** Once a system is documented, you can delegate it to a team member or virtual assistant with clear instructions for success."
    ],
    practicalTips: [
      "Start with the most time-consuming or error-prone tasks first",
      "Regularly review and improve your systems every quarter",
      "Use The Command Hub's CRM to track the performance of your systems and team members"
    ]
  },
  "feedback-loops": {
    title: "Creating Effective Feedback Loops",
    readTime: "5 min read",
    overview: "A feedback loop is a process where the outputs of a system are circled back and used as inputs. In business, it means systematically collecting and using feedback from customers and data to continuously improve.",
    whyItHelps: "Effective feedback loops help you stay aligned with customer needs, identify problems before they become crises, innovate faster, and make data-driven decisions instead of relying on guesswork.",
    actionSteps: [
      "**Automate Customer Surveys:** Use The Command Hub's Form Builder and Marketing Automation to send a survey 7 days after a purchase or service completion.",
      "**Monitor Social Media:** Use The Command Hub's Social Media Planner to track mentions of your brand and competitors to gather unsolicited feedback.",
      "**Analyze Sales Data:** Regularly review your sales data in The Command Hub's Payment System and CRM to see what's selling and what's not.",
      "**Conduct 'Win/Loss' Analysis:** When you gain or lose a major client, use The Command Hub's CRM to document why. Look for patterns.",
      "**Schedule Regular Check-ins:** Use The Command Hub Calendar to schedule weekly team meetings and monthly customer check-in calls to actively ask for feedback.",
      "**Close the Loop:** When you implement a change based on feedback, let the customers or team members who suggested it know. This encourages more feedback."
    ],
    practicalTips: [
      "Make it easy for customers to give feedback with a simple form on your website",
      "Focus on trends, not individual comments",
      "Use The Command Hub's Review Management to centralize and analyze public feedback"
    ]
  },
  "compound-effect": {
    title: "The Compound Effect in Business",
    readTime: "6 min read",
    overview: "The compound effect is the principle of reaping huge rewards from a series of small, smart choices. It's the idea that small, consistent actions over a long period of time lead to massive, transformative results.",
    whyItHelps: "This principle helps entrepreneurs stay motivated during the early stages when results aren't immediately obvious. It proves that you don't need to make huge, radical changes to achieve great success—you just need to be consistent.",
    actionSteps: [
      "**Choose Your Key Habits:** Identify 2-3 small, positive habits that, if done consistently, will grow your business (e.g., contacting one potential partner a day).",
      "**Track Your Actions Religiously:** Use The Command Hub's CRM or a simple spreadsheet to track your consistency. Never miss a day.",
      "**Focus on 1% Improvement:** Aim to get just 1% better each day. This small, achievable goal is the core of compounding.",
      "**Be Patient:** The biggest results from the compound effect don't show up for months or even years. Trust the process and stay consistent.",
      "**Apply it to Multiple Areas:** Use the compound effect for marketing (e.g., one blog post a week), sales (e.g., 5 cold calls a day), and personal development (e.g., reading 10 pages a day).",
      "**Review Your Progress:** Use The Command Hub's analytics to look back at your progress over 3-6 months to see the compounding results."
    ],
    practicalTips: [
      "Start with habits that are so small you can't say no",
      "Create a visual tracker for your habits to stay motivated",
      "Remind yourself that every small action is a vote for the type of entrepreneur you want to become"
    ]
  },
  "mental-models": {
    title: "Essential Mental Models for Entrepreneurs",
    readTime: "10 min read",
    overview: "Mental models are frameworks for thinking. They are simplified representations of how the world works that help you understand complex situations and make better decisions. Successful entrepreneurs use a toolbox of mental models to solve problems.",
    whyItHelps: "Using mental models helps you avoid common thinking errors, see problems from multiple perspectives, and make smarter strategic decisions. It's like having a set of proven software for your brain.",
    actionSteps: [
      "**Learn 'First Principles Thinking':** Break down a problem into its most basic, fundamental truths and reason up from there. Don't rely on assumptions.",
      "**Apply the 'Circle of Competence' Model:** Understand what you know and what you don't know. Make decisions within your circle of competence and seek expert advice for things outside it.",
      "**Use 'Second-Order Thinking':** For every action, don't just consider the immediate consequence. Ask, 'And then what?' Think through the long-term effects.",
      "**Employ 'Inversion':** Instead of thinking about how to achieve success, think about what would guarantee failure and then avoid those things.",
      "**Understand 'Occam's Razor':** When faced with competing explanations, the simplest one is usually the correct one. Don't overcomplicate things.",
      "**Build Your Toolbox:** Commit to learning one new mental model each month. Use The Command Hub Courses to track your learning."
    ],
    practicalTips: [
      "Keep a journal of how you apply different mental models to business problems",
      "Discuss problems with a mentor and ask them what mental models they use",
      "Read books from different fields (psychology, economics, biology) to discover new models"
    ]
  },
  "flow-state": {
    title: "Achieving Flow State",
    readTime: "7 min read",
    overview: "Flow is a mental state where a person is fully immersed in an activity with energized focus, full involvement, and enjoyment. It's often called being 'in the zone,' and it's where you produce your best work.",
    whyItHelps: "Achieving a state of flow can make you up to 500% more productive. It boosts creativity, speeds up learning, and makes work feel effortless and enjoyable, which is crucial for long-term entrepreneurial stamina.",
    actionSteps: [
      "**Set a Clear, Specific Goal:** You need to know exactly what you're trying to accomplish in the session.",
      "**Match the Challenge to Your Skill:** The task should be challenging enough to keep you engaged, but not so difficult that it becomes overwhelming.",
      "**Eliminate All Distractions:** This is non-negotiable. Turn off your phone, close email, and create a distraction-free environment.",
      "**Get Immediate Feedback:** Your work should provide immediate clues as to how you're doing. This is easier for tasks like coding or design.",
      "**Use The Command Hub Calendar:** Block out a 90-120 minute 'Flow Session' in your calendar each day.",
      "**Listen to Repetitive Music:** Music without lyrics, like electronic or classical, can help induce a flow state for many people."
    ],
    practicalTips: [
      "Figure out your 'chronotype' and schedule flow sessions during your biological peak time",
      "Ensure you are well-rested, hydrated, and fed before a flow session",
      "Start with a small, enjoyable part of the task to build momentum"
    ]
  },
  "batch-processing": {
    title: "Batch Processing for Efficiency",
    readTime: "4 min read",
    overview: "Batch processing, or 'task batching,' is a productivity technique where you group similar tasks together and complete them in one dedicated time block, rather than spreading them throughout the day.",
    whyItHelps: "Every time you switch between different types of tasks (e.g., from writing an email to designing a graphic), your brain pays a 'cognitive switching penalty.' Batching minimizes this penalty, saving you time and mental energy.",
    actionSteps: [
      "**Identify Your Common Tasks:** Make a list of your recurring tasks, like answering emails, making sales calls, creating social media content, and paying invoices.",
      "**Group Similar Tasks into Batches:** Create logical groups. For example: 'Communications Batch' (emails, calls), 'Content Batch' (blogging, social posts), 'Admin Batch' (invoices, bookkeeping).",
      "**Schedule Your Batches:** Use The Command Hub Calendar to assign specific time blocks for each batch. For example, 'Monday 9-10 AM: Content Batch.'",
      "**Use The Command Hub's Tools:** Use the Social Media Planner to batch a whole week of content. Use the Payment System to handle all invoices at once.",
      "**Stick to the Batch:** When you are in a batch block, work only on those tasks. Avoid the temptation to check a quick email during your 'Content Batch'.",
      "**Prepare for Your Batches:** Gather everything you need for a batch before you start. For a 'Content Batch', have all your ideas and images ready to go."
    ],
    practicalTips: [
      "Start with just one or two batches, like an 'email batch'",
      "Use The Command Hub Mobile App to jot down ideas for future batches as they come to you",
      "Analyze your time for a week to see where batching could have the biggest impact"
    ]
  },
  "fear-setting": {
    title: "Fear Setting Exercise",
    readTime: "8 min read",
    overview: "Created by Tim Ferriss, fear-setting is an exercise for defining and overcoming your fears. Instead of setting goals, you define the worst-case scenarios of taking action, what you could do to prevent them, and how you would recover.",
    whyItHelps: "This exercise helps you realize that your fears are often exaggerated and manageable. It transforms vague anxieties into concrete, solvable problems, giving you the clarity and courage to take calculated risks.",
    actionSteps: [
      "**Define Your Fear:** On a piece of paper or in The Command Hub notes, write down the action you are afraid to take (e.g., 'Quitting my job to go full-time on my business').",
      "**List the Worst-Case Scenarios (Define):** In the first column, list 10-20 of the absolute worst things that could happen if you took that action.",
      "**List Prevention Measures (Prevent):** In the second column, for each worst-case scenario, write down what you could do to prevent it from happening or minimize the damage.",
      "**List Repair Actions (Repair):** In the third column, if the worst-case scenario did happen, what could you do to get back on track? Who could you ask for help?",
      "**Analyze the Benefits of Action:** Now, write down all the potential benefits (professional, personal, financial) of taking the action, even if you only have partial success.",
      "**Consider the Cost of Inaction:** Finally, write down what it will cost you (financially, emotionally, physically) to not take this action in 6 months, 1 year, and 3 years."
    ],
    practicalTips: [
      "Be brutally honest with yourself during this exercise",
      "Share your fear-setting document with a trusted mentor for feedback",
      "Use The Command Hub's CRM to track potential contacts who could help you 'repair' a worst-case scenario"
    ]
  },
  "minimum-viable-progress": {
    title: "Minimum Viable Progress",
    readTime: "5 min read",
    overview: "Minimum Viable Progress (MVP) is the smallest amount of progress you can make on a task to keep momentum, even on days when you feel unmotivated or overwhelmed. It's the antidote to procrastination.",
    whyItHelps: "This technique bypasses the mental resistance of starting a large task. By committing to a tiny, non-intimidating step, you build momentum that often carries you much further than you initially planned, ensuring you never have a 'zero-progress' day.",
    actionSteps: [
      "**Identify a Stalled Task:** Pick a big project or goal you've been procrastinating on.",
      "**Define the MVP:** Ask yourself: 'What is the absolute smallest action I can take on this in 2 minutes?' (e.g., 'Open the document and write one sentence,' 'Draft one slide for the presentation').",
      "**Commit Only to the MVP:** Tell yourself that you only have to do that one tiny thing. After that, you are free to stop.",
      "**Execute the MVP:** Do the 2-minute task. More often than not, you'll find that starting was the hardest part, and you'll continue working.",
      "**Track Your MVPs:** Use The Command Hub's daily tracking or notes feature to log your 'MVP' for the day. This proves you are always moving forward.",
      "**Apply it to Habit Formation:** Want to start a new workout habit? Your MVP could be 'Put on my workout clothes.'"
    ],
    practicalTips: [
      "Set a timer for 2-5 minutes and just work on the task for that long",
      "Use this technique on your most dreaded task first thing in the morning",
      "Celebrate completing the MVP, even if you don't do any more work on it that day"
    ]
  }
};

export default function MindsetHack() {
  const navigate = useNavigate();
  const [currentHack, setCurrentHack] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [notes, setNotes] = useState('');
  const [hackId, setHackId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hack = urlParams.get('hack');
    
    if (hack && mindsetHacks[hack]) {
      setCurrentHack(mindsetHacks[hack]);
      setHackId(hack);
    } else {
      navigate(createPageUrl("MindsetHacks"));
    }

    // Load completed steps from localStorage
    const savedSteps = localStorage.getItem(`mindset_hack_${hack}_completed`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    // Load saved notes
    const savedNotes = localStorage.getItem(`mindset_hack_${hack}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [window.location.search, navigate]); // Added navigate to dependency array

  const handleStepToggle = (stepIndex) => {
    // hackId is already in state from useEffect
    if (!hackId) return; // Should not happen if hackId is set correctly in useEffect
    
    const newCompletedSteps = {
      ...completedSteps,
      [stepIndex]: !completedSteps[stepIndex]
    };
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem(`mindset_hack_${hackId}_completed`, JSON.stringify(newCompletedSteps));
  };

  const handleSaveNotes = () => {
    if (!hackId) return; // Ensure hackId is available before saving
    localStorage.setItem(`mindset_hack_${hackId}_notes`, notes);
    const button = document.getElementById('save-notes-btn');
    if (button) { // Check if button exists to prevent error
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Saved!</span>';
      setTimeout(() => {
        button.innerHTML = originalText;
      }, 2000);
    }
  };

  if (!currentHack) {
    return (
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 text-center">
            <div className="animate-pulse text-[var(--text-soft)]">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = currentHack.actionSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <button
              onClick={() => navigate(createPageUrl("MindsetHacks"))}
              className="btn btn-ghost"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mindset Hacks</span>
            </button>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Clock className="w-4 h-4 text-[var(--text-soft)]" />
              <span className="text-sm text-[var(--text-soft)]">{currentHack.readTime}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 p-4 rounded-md mt-1">
              <Brain className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">{currentHack.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-soft)]">
                <span>Mindset Hack</span>
                <span>•</span>
                <span>{completedStepsCount}/{totalSteps} steps completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--text-main)]">Your Progress</h3>
            <span className="text-sm text-[var(--text-soft)]">{progressPercentage}% complete</span>
          </div>
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 bg-[var(--primary-gold)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Overview */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Overview</h2>
          <p className="text-[var(--text-main)] text-lg leading-relaxed mb-6">
            {currentHack.overview}
          </p>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.whyItHelps}</p>
          </div>
        </div>

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Action Steps</h2>
          <div className="space-y-4">
            {currentHack.actionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-black rounded-md text-white">
                <div className="flex-1">
                  <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: step.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-white">$1</strong>') }}></p>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={!!completedSteps[index]}
                    onChange={() => handleStepToggle(index)}
                    className="h-5 w-5 rounded border-gray-300 text-[var(--primary-gold)] focus:ring-[var(--primary-gold)]"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Tips */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Practical Tips</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-md">
            <ul className="space-y-3">
              {currentHack.practicalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--text-main)]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Notes & Insights</h2>
            <button
              id="save-notes-btn"
              onClick={handleSaveNotes}
              className="btn btn-secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              <span>Save Notes</span>
            </button>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record your insights, examples from your business, and how you'll apply this mindset hack..."
            className="form-input h-32 resize-none mb-4 w-full" // Added w-full for full width
          />
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h4 className="font-semibold text-green-900 mb-2">🧠 Reflection Questions</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• How does this mindset hack apply to your current business challenges?</li>
              <li>• What specific examples can you think of from your own experience?</li>
              <li>• What will you do differently starting this week?</li>
              <li>• How will you track the results of implementing this hack?</li>
            </ul>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="card p-8 text-center">
            <div className="bg-green-100 p-4 inline-block rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Mindset Hack Mastered!</h3>
            <p className="text-[var(--text-soft)] mb-4">
              You've completed this mindset hack. Apply these concepts consistently to see the best results.
            </p>
            <button
              onClick={() => navigate(createPageUrl("MindsetHacks"))}
              className="btn btn-primary"
            >
              Explore More Mindset Hacks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
