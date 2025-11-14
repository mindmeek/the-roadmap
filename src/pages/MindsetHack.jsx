
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, ArrowLeft, CheckCircle, Clock, TrendingUp, Target, Save, Lightbulb, AlertCircle, BookOpen } from "lucide-react";

const mindsetHacks = {
  "8020-rule": {
    title: "The 80/20 Rule (Pareto Principle)",
    readTime: "5 min read",
    category: "Productivity",
    overview: "The 80/20 rule, also known as the Pareto Principle, is one of the most powerful concepts for business success. It states that roughly 80% of your results come from just 20% of your efforts. This means that a small portion of your activities, customers, products, or strategies are responsible for the majority of your outcomes. As an entrepreneur, understanding this principle can transform how you spend your time and energy. Instead of spreading yourself thin trying to do everything, you can identify which specific activities generate the most value and focus relentlessly on those. This isn't about working harder—it's about working smarter by eliminating or delegating the tasks that don't move the needle. When applied correctly, the 80/20 rule helps you achieve more with less effort, stress, and time.",
    deepDive: "Italian economist Vilfredo Pareto discovered this principle in 1896 when he noticed that 80% of Italy's land was owned by 20% of the population. The principle applies remarkably to business: 80% of your revenue comes from 20% of your customers. 80% of your results come from 20% of your efforts. 80% of your problems come from 20% of your clients. Understanding this allows you to ruthlessly focus on the vital few activities that drive the majority of your outcomes.",
    whyItHelps: "By identifying your high-impact activities, you can eliminate time-wasting tasks and dramatically increase your productivity and results. This principle helps entrepreneurs focus on what truly matters for business growth.",
    businessApplications: "In sales, focus on the 20% of customers who generate 80% of revenue. In product development, prioritize the 20% of features that 80% of users want. In marketing, double down on the 20% of channels that drive 80% of leads. In customer service, fix the 20% of issues that cause 80% of complaints.",
    actionSteps: [
      "**Audit Your Activities:** List all your daily business activities for one week. Track how much time you spend on each activity and the results each produces.",
      "**Identify Your 20%:** Analyze which activities generate the most revenue, customers, or business growth. These are your high-impact 20%. Be brutally honest about what's actually working.",
      "**Eliminate or Delegate the 80%:** Identify low-impact activities that consume time but don't drive results. Eliminate, automate, or delegate these tasks. Ask: 'What would happen if I stopped doing this?'",
      "**Focus Your Energy:** Dedicate more time and energy to your high-impact 20% activities. Block time in your calendar specifically for these priorities. Protect this time fiercely.",
      "**Apply to Customers:** Identify your top 20% of customers by revenue. How can you serve them better? Can you create a VIP program for them?",
      "**Review Monthly:** Re-evaluate your 80/20 analysis monthly. As your business evolves, your high-impact activities may change."
    ],
    practicalTips: [
      "Use the 'Revenue Per Hour' calculation to identify your most valuable activities",
      "Ask yourself: 'If I could only do 3 things today, what would move my business forward the most?'",
      "Review your 80/20 analysis monthly to stay focused on what matters most",
      "Track metrics for everything so you can identify your 20% based on data, not assumptions",
      "Don't feel guilty about eliminating or delegating the 80%—that's strategic focus, not laziness"
    ],
    commonMistakes: [
      "Trying to do everything equally well instead of focusing on high-leverage activities",
      "Not tracking data, making it impossible to identify the real 20%",
      "Feeling guilty about eliminating or delegating low-impact work",
      "Applying 80/20 once and never revisiting it as the business changes"
    ]
  },
  "growth-mindset": {
    title: "Growth vs Fixed Mindset",
    readTime: "6 min read",
    category: "Mindset",
    overview: "Your mindset—the beliefs you hold about your abilities—is one of the most important factors determining your success as an entrepreneur. A growth mindset is the belief that your abilities, intelligence, and skills can be developed through dedication, hard work, and learning from mistakes. In contrast, a fixed mindset assumes that your talents and abilities are static—you either have them or you don't. Entrepreneurs with a growth mindset see failures as learning opportunities, embrace challenges as chances to improve, and persist through obstacles. Those with a fixed mindset often give up when things get difficult, avoid challenges to protect their ego, and view criticism as a personal attack. The good news? Your mindset isn't fixed—you can develop a growth mindset through awareness and practice. This shift in thinking is transformative because it changes how you respond to every challenge, setback, and opportunity in your business journey.",
    deepDive: "Stanford psychologist Carol Dweck discovered that people's beliefs about their abilities significantly impact their success. Those with a growth mindset see challenges as opportunities to learn and improve, while those with a fixed mindset avoid challenges to protect their ego. In business, this distinction is critical. Entrepreneurs with growth mindsets pivot when needed, learn from customer feedback, and persist through setbacks. Those with fixed mindsets often give up when things get difficult, believing 'I'm just not cut out for this.'",
    whyItHelps: "Growth mindset enables you to see failures as learning opportunities, embrace challenges, and continuously improve. This resilience and adaptability are essential for building successful businesses in changing markets.",
    neuroscience: "Research shows that the brain is neuroplastic—it can form new neural connections throughout life. When you learn something new or overcome a challenge, your brain physically changes. This means your intelligence and abilities are not fixed; they can be developed. Understanding this science reinforces the growth mindset and gives you confidence that improvement is always possible.",
    actionSteps: [
      "**Reframe Failures:** When something doesn't work, ask 'What can I learn from this?' instead of 'I'm not good at this.' Keep a failure journal where you document lessons learned from each setback.",
      "**Embrace Challenges:** Actively seek out challenges that stretch your abilities. View difficult situations as opportunities to grow. Choose one skill outside your comfort zone to develop this quarter.",
      "**Focus on Process:** Celebrate the effort and learning process, not just the end results. Acknowledge progress and improvement, even if you haven't reached the goal yet.",
      "**Learn from Others:** Study successful entrepreneurs and ask 'How did they develop these skills?' instead of 'They're just naturally talented.' Read their stories and identify the deliberate practice they put in.",
      "**Replace Fixed Mindset Language:** Change your self-talk. 'I can't do this' becomes 'I can't do this yet.' 'This is too hard' becomes 'This will take time and effort.'",
      "**Seek Constructive Feedback:** Ask mentors, customers, and peers for honest feedback. View criticism as data for improvement, not a personal attack."
    ],
    practicalTips: [
      "Replace 'I don't know how' with 'I don't know how yet'",
      "Keep a learning journal to track what you discover from each challenge",
      "Surround yourself with people who challenge and inspire you to grow",
      "Read 'Mindset' by Carol Dweck for deeper understanding",
      "Share your growth mindset journey with your team to create a culture of learning"
    ],
    commonMistakes: [
      "Avoiding challenges to protect your ego from failure",
      "Comparing yourself to others instead of your past self",
      "Giving up at the first sign of difficulty",
      "Believing talent matters more than effort"
    ]
  },
  "three-ps": {
    title: "The Three P's of Time Management",
    readTime: "4 min read",
    category: "Productivity",
    overview: "The Three P's—Prioritize, Plan, and Perform—create a simple but powerful framework for managing your time and accomplishing what matters most. Most entrepreneurs feel overwhelmed by endless to-do lists and competing demands on their time. The Three P's solve this by creating a systematic daily routine. First, you Prioritize by identifying the most important tasks that will move your business forward. Second, you Plan by scheduling specific time blocks for those priorities. Third, you Perform by executing with focus and minimizing distractions. This framework eliminates the constant decision-making about 'what should I do next?' and replaces it with a clear, structured approach. The beauty of the Three P's is its simplicity—you can implement it immediately and see results within days. It transforms chaotic, reactive days into productive, intentional ones where you're consistently making progress on your most important goals.",
    deepDive: "Most people confuse being busy with being productive. The Three P's framework separates the two. Prioritize ensures you focus on high-impact activities. Plan gives structure to your day so you're not constantly deciding what to do next. Perform is about execution with focus and intention. Together, these three steps transform chaotic days into productive ones. Successful entrepreneurs like Elon Musk and Tim Cook credit their achievements to ruthless prioritization and structured planning.",
    whyItHelps: "This system eliminates decision fatigue, reduces overwhelm, and ensures you're consistently working on high-impact activities. It creates structure while maintaining flexibility for unexpected opportunities.",
    eisenhowerMatrix: "The Eisenhower Matrix divides tasks into four quadrants: 1) Urgent & Important (do first), 2) Important but Not Urgent (schedule), 3) Urgent but Not Important (delegate), 4) Neither (eliminate). Most entrepreneurs spend too much time in quadrant 3 and not enough in quadrant 2, which is where strategic growth happens.",
    actionSteps: [
      "**Prioritize:** Each evening, identify your top 3 priorities for the next day. Use the Eisenhower Matrix: importance vs urgency to rank tasks. Ask: 'Which 3 tasks will have the biggest impact tomorrow?'",
      "**Plan:** Time-block your calendar with specific tasks. Estimate how long each task will take and schedule accordingly. Include breaks and buffer time for unexpected issues.",
      "**Perform:** Execute your plan with focus. Work on one task at a time and minimize distractions during focus blocks. Close unnecessary tabs, silence notifications, and use a timer to stay on track.",
      "**Review and Adjust:** At the end of each day, review what worked and what didn't. Adjust your approach for tomorrow. Ask: 'Did I work on my top priorities? What distracted me? How can I improve?'"
    ],
    practicalTips: [
      "Use the Eisenhower Matrix to categorize tasks by importance and urgency",
      "Block similar tasks together (batch processing) for better efficiency",
      "Include buffer time in your schedule for unexpected tasks or delays",
      "Schedule your hardest task first thing in the morning ('Eat the frog')",
      "Review your priorities weekly, not just daily, to ensure long-term alignment"
    ],
    commonMistakes: [
      "Confusing urgent tasks with important tasks",
      "Over-scheduling and leaving no margin for flexibility",
      "Failing to protect your time blocks from interruptions",
      "Not reviewing and adjusting based on actual performance"
    ]
  },
  "two-minute-rule": {
    title: "The Two-Minute Rule",
    readTime: "3 min read",
    category: "Productivity",
    overview: "The Two-Minute Rule is a deceptively simple productivity technique with powerful results: if a task takes less than two minutes to complete, do it immediately rather than adding it to your to-do list. This one principle can dramatically reduce the mental clutter and overwhelm that entrepreneurs face daily. Think about how many quick tasks you encounter throughout the day—responding to a short email, approving an invoice, making a brief phone call, filing a document. Each time you think 'I'll do that later' and add it to your list, you're creating future work for yourself. The Two-Minute Rule eliminates this problem by having you handle small tasks on the spot. This prevents the accumulation of dozens of minor to-dos that collectively create stress and distraction. More importantly, it maintains momentum throughout your day, giving you a sense of completion and progress that fuels motivation and productivity.",
    deepDive: "David Allen's 'Getting Things Done' methodology popularized this rule. The logic is simple: it takes longer to write down a 2-minute task, add it to your to-do list, review that list later, and then finally do the task than it does to just do it immediately. By handling quick tasks on the spot, you prevent the psychological weight of an ever-growing to-do list and maintain a sense of control and completion throughout your day.",
    whyItHelps: "This rule prevents task pile-up, reduces mental clutter, and creates momentum. It's especially powerful for entrepreneurs who deal with many small decisions and quick tasks throughout the day.",
    twoWaysToApply: "1) If a task takes less than 2 minutes, do it now. 2) When starting a new habit, scale it down to something that takes less than 2 minutes (e.g., 'meditate for 30 minutes' becomes 'meditate for 2 minutes'). The first application prevents accumulation; the second makes habit formation easy.",
    actionSteps: [
      "**Immediate Assessment:** When a task comes up, immediately estimate if it takes less than 2 minutes to complete. Be honest—don't underestimate.",
      "**Do It Now:** If it's under 2 minutes, complete it immediately rather than writing it down or postponing it. This includes: replying to a quick email, filing a document, making a brief phone call, approving an invoice.",
      "**Schedule or Delegate:** If it takes longer than 2 minutes, either schedule it for a focused work block (use time-blocking) or delegate it to someone else.",
      "**Review Weekly:** Look at tasks that repeatedly take 'just 2 minutes'—these might need systematic solutions. If you're responding to the same question multiple times, create an FAQ or template.",
      "**Use for Habit Formation:** Scale down new habits to 2-minute versions. Want to write daily? Start with 'Write for 2 minutes.' Want to exercise? Start with '2 minutes of stretching.' Build from there."
    ],
    practicalTips: [
      "Set up templates for common quick tasks (email responses, invoice approvals)",
      "Use voice-to-text for quick notes and responses to save time",
      "Create standard operating procedures for recurring 2-minute tasks so others can handle them",
      "Be realistic about the 2-minute threshold—if it's actually 5 minutes, schedule it",
      "Use this rule to overcome procrastination on larger projects by committing to just 2 minutes"
    ],
    commonMistakes: [
      "Underestimating how long tasks take and getting stuck doing '2-minute tasks' all day",
      "Using the rule as an excuse to avoid deep work on important projects",
      "Not creating systems for recurring 2-minute tasks",
      "Letting 2-minute tasks interrupt flow sessions—batch them instead"
    ]
  },
  "energy-management": {
    title: "Energy Management Over Time Management",
    readTime: "7 min read",
    overview: "Traditional time management focuses on squeezing more tasks into your day. Energy management takes a smarter approach: aligning your most important work with your natural energy peaks and valleys. Here's the truth—not all hours of your day are equal. You have times when you're mentally sharp, creative, and focused, and other times when you're sluggish, distracted, and low-energy. Most entrepreneurs ignore this and try to power through all day, resulting in mediocre work and burnout. Energy management is about recognizing your unique energy patterns and strategically matching different types of work to your energy levels. High-energy periods are for your most important, creative, or complex work. Low-energy periods are for routine tasks like email, admin work, or meetings. This approach isn't about working more hours—it's about making your hours count by working with your biology instead of against it. The result? Higher quality output, better decision-making, and sustainable productivity without exhaustion.",
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
    overview: "Deep work is the ability to focus intensely on cognitively demanding tasks without distraction. In our hyperconnected world of constant notifications, messages, and interruptions, the capacity for deep work is becoming increasingly rare—and increasingly valuable. Deep work is where breakthrough ideas emerge, complex problems get solved, and your most important projects move forward. It's the opposite of shallow work (checking email, attending meetings, browsing social media), which fills your day but produces little meaningful progress. The challenge is that deep work doesn't come naturally in today's environment. Your brain has been trained to seek constant stimulation and quick dopamine hits from notifications. Breaking this pattern requires deliberate practice and environmental design. But the payoff is enormous: you can accomplish in 2-3 hours of deep work what might take an entire day of distracted work. Deep work is a superpower for entrepreneurs—it's how you create the products, strategies, and content that set your business apart.",
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
    category: "Mental Performance",
    overview: "As an entrepreneur, you make hundreds of decisions every single day—from trivial choices like what to eat for breakfast to critical decisions like whether to pivot your business model or hire a new employee. What most entrepreneurs don't realize is that every decision, regardless of size, depletes the same limited pool of mental energy. This phenomenon is called decision fatigue. As you make more decisions throughout the day, the quality of your decisions progressively deteriorates. You become more impulsive, more likely to avoid making decisions altogether, or more prone to choosing the easiest option rather than the best one. This is why you might make poor business choices late at night or why you feel mentally exhausted after a day of meetings. The good news? You can combat decision fatigue by reducing the number of trivial decisions you make, automating routine choices, and scheduling your most important decisions for times when your mental energy is highest. This isn't about being lazy—it's about preserving your mental resources for the decisions that truly matter.",
    deepDive: "Every decision you make—from what to eat for breakfast to whether to pivot your business model—uses the same mental energy. Studies show that judges are more likely to grant parole early in the day than late in the afternoon because their decision-making capacity is depleted. Steve Jobs and Mark Zuckerberg famously wore the same outfit daily to eliminate trivial decisions. Barack Obama said he only wears blue or gray suits because he has 'too many other decisions to make.' These leaders understood that preserving mental energy for high-impact decisions is a strategic advantage.",
    whyItHelps: "By reducing the number of trivial decisions you make, you preserve your mental energy for the high-stakes decisions that truly matter for your business's growth and success.",
    neuroscience: "Your prefrontal cortex—responsible for decision-making, planning, and self-control—has limited glucose reserves. Each decision depletes these reserves slightly. When glucose is low, your brain defaults to the easiest option (procrastination or impulsive choices). This is why you make better decisions in the morning and worse ones after a long day of meetings.",
    actionSteps: [
      "**Make Important Decisions Early:** Schedule your most critical thinking and decision-making tasks for the morning when your mind is fresh. Never make major business decisions late at night.",
      "**Automate Repetitive Decisions:** Use automation tools to handle routine tasks like email follow-ups and social media posting. Set up 'if-then' rules for common scenarios.",
      "**Standardize Your Processes:** Create Standard Operating Procedures (SOPs) for common business tasks so you don't have to reinvent the wheel each time. Document every repeatable process.",
      "**Limit Your Options:** When facing a decision, try to narrow it down to your top 2-3 choices instead of analyzing every possibility. Use frameworks like 'Hell Yes or No'—if it's not a 'hell yes,' it's a no.",
      "**Plan Your Week in Advance:** Plan your outfits, meals, and daily priorities on Sunday to reduce daily decision-making. Batch similar decisions together.",
      "**Trust Your Gut on Small Decisions:** For low-impact choices, make a quick decision and move on. Don't overthink it. Ask: 'Will this matter in 5 years?' If not, decide quickly."
    ],
    practicalTips: [
      "Create a 'decision journal' to track your choices and outcomes",
      "Delegate smaller decisions to team members or virtual assistants",
      "Establish clear principles and values for your business to guide your decisions",
      "Create decision-making frameworks for common scenarios (pricing, hiring, partnerships)",
      "Take breaks between major decisions to restore mental energy"
    ],
    commonMistakes: [
      "Making important decisions when tired, hungry, or stressed",
      "Trying to make too many decisions in one day",
      "Not delegating decisions that others could handle",
      "Overthinking trivial choices that don't significantly impact outcomes"
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
    category: "Boundaries",
    overview: "Saying 'no' is a critical skill for entrepreneurs. Every time you say 'yes' to something, you are saying 'no' to something else—often your own priorities. Learning to decline non-essential requests protects your time, energy, and focus.",
    deepDive: "Warren Buffett said, 'The difference between successful people and really successful people is that really successful people say no to almost everything.' Most entrepreneurs struggle with saying no because they fear missing opportunities, disappointing people, or appearing uncooperative. But the reality is that saying yes to everything leads to scattered focus, mediocre results, and burnout. Strategic refusal is about being selective with your commitments so you can excel at what truly matters.",
    whyItHelps: "Mastering the art of saying 'no' prevents burnout, keeps you focused on your most important goals, and ensures you are in control of your schedule, rather than letting others dictate your priorities.",
    psychologyBehind: "Humans have a natural desire to please others and avoid conflict. Saying 'no' triggers fear of rejection or social exclusion. However, research shows that people respect those who have clear boundaries more than those who agree to everything. When you say no to protect your priorities, you signal that your time is valuable and you're focused—traits that actually increase respect and opportunities.",
    actionSteps: [
      "**Define Your Priorities:** Get crystal clear on your goals for the quarter. If a request doesn't align with these goals, it's a candidate for a 'no.' Write down your top 3 business priorities and keep them visible.",
      "**Create a 'Not-To-Do' List:** List activities that drain your time or don't move your business forward. Commit to saying no to these things. Examples: attending every networking event, taking every phone call, accepting every speaking request.",
      "**Use Polite but Firm Scripts:** Prepare responses like, 'Thank you for thinking of me, but I can't commit to that right now as I'm focused on other priorities.' Practice these until they feel natural.",
      "**Offer an Alternative (Optional):** If appropriate, you can soften the 'no' by suggesting another resource or a different timeline. 'I can't help with that this week, but check out this tool...' or 'I can't do this, but [colleague] might be able to help.'",
      "**Delay Your Response:** Instead of an immediate 'yes', say 'Let me check my schedule and get back to you.' This gives you time to evaluate the request objectively.",
      "**Recognize the Cost of 'Yes':** Before agreeing, ask yourself: 'What am I saying no to by saying yes to this?' Every yes has an opportunity cost."
    ],
    practicalTips: [
      "Don't over-explain your 'no'. A simple, polite refusal is enough",
      "Remember that saying 'no' respects both your time and the other person's",
      "Practice saying no to low-stakes requests to build the skill",
      "Set clear boundaries upfront (e.g., 'I don't take calls after 5 PM')",
      "Remember: a polite 'no' now is better than a resentful 'yes' or a flaky cancellation later"
    ],
    commonMistakes: [
      "Saying yes immediately without evaluating the request",
      "Over-explaining or apologizing excessively for saying no",
      "Feeling guilty for protecting your time and priorities",
      "Failing to establish clear boundaries in advance"
    ]
  },
  "systems-thinking": {
    title: "Build Systems That Work Without You",
    readTime: "9 min read",
    category: "Business Strategy",
    overview: "Systems thinking is the process of building automated and repeatable processes for every aspect of your business. The goal is to create a business that can run and grow without your direct involvement in every single task.",
    deepDive: "Michael Gerber's 'The E-Myth' explains that most businesses fail because they're dependent on the owner doing everything. True business success comes from building systems that allow the business to operate independently. McDonald's succeeded not because they make the best burgers, but because they created a system that produces consistent results regardless of who's working. Your goal is to become the architect of systems, not the operator of tasks.",
    whyItHelps: "Building systems allows you to scale your business, free up your time to work ON the business instead of IN it, ensure consistent quality, and ultimately build a valuable asset that isn't dependent on you.",
    typesOfSystems: "Operations systems (how you deliver your product/service), Marketing systems (how you attract and convert customers), Sales systems (how you close deals), Financial systems (how you manage money), and HR systems (how you hire, train, and manage people). Each area needs documented, repeatable processes.",
    actionSteps: [
      "**Document Everything:** For one week, write down every single task you do, no matter how small. This will reveal what can be systematized. Note the time each task takes.",
      "**Identify Repetitive Tasks:** Look for tasks that you do over and over again. These are the first candidates for systemization. Examples: client onboarding, invoice creation, social media posting.",
      "**Create Checklists and Templates:** Document step-by-step checklists for common processes. Use tools to create templates for emails, contracts, proposals, and presentations.",
      "**Leverage Automation:** Use automation tools to handle lead capture, email nurturing, appointment scheduling, and follow-ups automatically.",
      "**Automate Your Onboarding:** Create an automated email sequence to welcome and onboard new clients or customers. Include welcome videos, setup guides, and FAQ documents.",
      "**Delegate with Clear Instructions:** Once a system is documented, you can delegate it to a team member or virtual assistant with clear instructions for success. Include screenshots or video walkthroughs.",
      "**Test and Refine:** Have someone else follow your system documentation. Where do they get confused? Update the system based on their feedback."
    ],
    practicalTips: [
      "Start with the most time-consuming or error-prone tasks first",
      "Regularly review and improve your systems every quarter",
      "Use screen recording software to create video SOPs for complex tasks",
      "Build a 'systems library' where all your processes are stored and accessible",
      "Remember: systems should enable creativity, not stifle it"
    ],
    commonMistakes: [
      "Trying to systematize everything at once instead of one process at a time",
      "Creating overly complex systems that no one follows",
      "Documenting a system but never delegating it",
      "Not updating systems as the business evolves"
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
    category: "Growth",
    overview: "The compound effect is the principle of reaping huge rewards from a series of small, smart choices. It's the idea that small, consistent actions over a long period of time lead to massive, transformative results.",
    deepDive: "Darren Hardy's book 'The Compound Effect' illustrates this with a simple example: if you improve by just 1% every day for a year, you'll end up 37 times better (not 365% better—that's the power of compounding). In business, this means that small, consistent actions like sending one prospecting email daily, creating one piece of content weekly, or improving one process monthly compound into dramatic results over time. The challenge is that results are often invisible for months, requiring patience and faith in the process.",
    whyItHelps: "This principle helps entrepreneurs stay motivated during the early stages when results aren't immediately obvious. It proves that you don't need to make huge, radical changes to achieve great success—you just need to be consistent.",
    mathematicsOfCompounding: "If you get 1% better each day: Day 1 = 1.00, Day 30 = 1.35, Day 365 = 37.78. If you get 1% worse each day: Day 1 = 1.00, Day 30 = 0.74, Day 365 = 0.03. Small choices, compounded over time, create vastly different outcomes. This is true for habits, skills, relationships, and revenue.",
    actionSteps: [
      "**Choose Your Key Habits:** Identify 2-3 small, positive habits that, if done consistently, will grow your business (e.g., contacting one potential partner a day, reading 10 pages, publishing one blog post weekly).",
      "**Track Your Actions Religiously:** Use a spreadsheet or app to track your consistency. Never miss a day. Visual tracking (like a calendar with X's for completed days) is powerful for maintaining streaks.",
      "**Focus on 1% Improvement:** Aim to get just 1% better each day. This small, achievable goal is the core of compounding. Ask: 'How can I improve this process by 1% today?'",
      "**Be Patient:** The biggest results from the compound effect don't show up for months or even years. Trust the process and stay consistent. Remind yourself that you're playing the long game.",
      "**Apply it to Multiple Areas:** Use the compound effect for marketing (e.g., one blog post a week = 52 posts a year), sales (e.g., 5 cold calls a day = 1,825 a year), and personal development (e.g., reading 10 pages a day = 12+ books a year).",
      "**Review Your Progress:** Look back at your progress over 3-6 months to see the compounding results. This reinforces the power of consistency and motivates you to keep going."
    ],
    practicalTips: [
      "Start with habits that are so small you can't say no (e.g., 1 push-up, 1 page)",
      "Create a visual tracker for your habits to stay motivated and see your streaks",
      "Remind yourself that every small action is a vote for the type of entrepreneur you want to become",
      "Focus on inputs (actions you control) rather than outputs (results you can't fully control)",
      "Share your commitment publicly to add accountability"
    ],
    commonMistakes: [
      "Expecting immediate results and quitting when you don't see them",
      "Starting too big and burning out instead of starting small and building",
      "Not tracking your consistency, which makes it hard to see the compound effect",
      "Giving up during the 'plateau of latent potential' where results aren't visible yet"
    ]
  },
  "mental-models": {
    title: "Essential Mental Models for Entrepreneurs",
    readTime: "10 min read",
    category: "Decision Making",
    overview: "Mental models are frameworks for thinking. They are simplified representations of how the world works that help you understand complex situations and make better decisions. Successful entrepreneurs use a toolbox of mental models to solve problems.",
    deepDive: "Charlie Munger, Warren Buffett's business partner, advocates for developing a 'latticework of mental models' from multiple disciplines. He believes that having 80-90 mental models from fields like psychology, economics, biology, physics, and mathematics allows you to see problems from multiple angles and make better decisions. Most people over-rely on a single way of thinking; multi-disciplinary thinkers have a massive advantage in business.",
    whyItHelps: "Using mental models helps you avoid common thinking errors, see problems from multiple perspectives, and make smarter strategic decisions. It's like having a set of proven software for your brain.",
    coreModels: "First Principles Thinking (break problems into fundamental truths), Second-Order Thinking (consider consequences of consequences), Inversion (think backwards from failure), Circle of Competence (know what you know), Occam's Razor (simplest explanation is usually correct), Margin of Safety (build in buffer for error), Opportunity Cost (what you give up by choosing one option).",
    actionSteps: [
      "**Learn 'First Principles Thinking':** Break down a problem into its most basic, fundamental truths and reason up from there. Don't rely on assumptions or 'how it's always been done.' Ask 'Why?' five times to get to the root.",
      "**Apply the 'Circle of Competence' Model:** Understand what you know and what you don't know. Make decisions within your circle of competence and seek expert advice for things outside it. Knowing your limits is powerful.",
      "**Use 'Second-Order Thinking':** For every action, don't just consider the immediate consequence. Ask, 'And then what?' Think through the second, third, and fourth-order effects of your decisions.",
      "**Employ 'Inversion':** Instead of thinking about how to achieve success, think about what would guarantee failure and then avoid those things. Charlie Munger says, 'All I want to know is where I'm going to die, so I'll never go there.'",
      "**Understand 'Occam's Razor':** When faced with competing explanations, the simplest one is usually the correct one. Don't overcomplicate things or create elaborate theories when simple explanations suffice.",
      "**Build Your Toolbox:** Commit to learning one new mental model each month. Read books from different disciplines, study case studies, and practice applying models to real business situations."
    ],
    practicalTips: [
      "Keep a journal of how you apply different mental models to business problems",
      "Discuss problems with a mentor and ask them what mental models they use",
      "Read 'Poor Charlie's Almanack' and 'Seeking Wisdom' by Peter Bevelin",
      "Create a personal 'mental models checklist' to reference before making big decisions",
      "Teach mental models to your team to improve organizational decision-making"
    ],
    commonMistakes: [
      "Learning models intellectually but not applying them to real decisions",
      "Using a single model in isolation instead of combining multiple models",
      "Relying only on models from one discipline (usually business) instead of diverse fields",
      "Not revisiting and refining your understanding of models over time"
    ]
  },
  "flow-state": {
    title: "Achieving Flow State",
    readTime: "7 min read",
    category: "Performance",
    overview: "Flow is a mental state where a person is fully immersed in an activity with energized focus, full involvement, and enjoyment. It's often called being 'in the zone,' and it's where you produce your best work.",
    deepDive: "Psychologist Mihaly Csikszentmihalyi identified flow as the optimal state of human performance. During flow, time seems to disappear, distractions fade away, and you feel a sense of complete control and effortless action. Elite athletes, artists, and entrepreneurs all describe experiencing flow during their best performances. The state is characterized by intense concentration, loss of self-consciousness, and intrinsic motivation.",
    whyItHelps: "Achieving a state of flow can make you up to 500% more productive. It boosts creativity, speeds up learning, and makes work feel effortless and enjoyable, which is crucial for long-term entrepreneurial stamina.",
    scienceOfFlow: "During flow, your brain releases neurochemicals including dopamine, norepinephrine, endorphins, anandamide, and serotonin. These chemicals enhance pattern recognition, accelerate learning, and create a powerful sense of satisfaction. Brain imaging shows increased activity in areas associated with focused attention and decreased activity in the prefrontal cortex (responsible for self-criticism), which explains why flow feels 'effortless.'",
    actionSteps: [
      "**Set a Clear, Specific Goal:** You need to know exactly what you're trying to accomplish in the session. 'Write a blog post' is vague. 'Write the introduction and three main points for the pricing strategy blog post' is specific.",
      "**Match the Challenge to Your Skill:** The task should be challenging enough to keep you engaged, but not so difficult that it becomes overwhelming. This is the 'sweet spot' for flow—about 4% beyond your current skill level.",
      "**Eliminate All Distractions:** This is non-negotiable. Turn off your phone, close email, put on noise-canceling headphones, and create a distraction-free environment. Tell people not to interrupt you.",
      "**Get Immediate Feedback:** Your work should provide immediate clues as to how you're doing. This is easier for tasks like coding, design, or writing where you can see progress immediately.",
      "**Block 90-120 Minutes:** Flow takes about 15-20 minutes to enter. Shorter sessions won't allow you to reach deep flow. Schedule uninterrupted blocks of at least 90 minutes.",
      "**Listen to Repetitive Music:** Music without lyrics, like electronic, lo-fi, or classical, can help induce a flow state for many people. Find what works for you."
    ],
    practicalTips: [
      "Figure out your 'chronotype' and schedule flow sessions during your biological peak time",
      "Ensure you are well-rested, hydrated, and fed before a flow session",
      "Start with a small, enjoyable part of the task to build momentum",
      "Use the Pomodoro Technique (25-minute focus, 5-minute break) to build up to longer flow sessions",
      "Track your flow sessions and the quality of work produced to identify optimal conditions"
    ],
    commonMistakes: [
      "Trying to force flow when you're exhausted or stressed",
      "Working on tasks that are too easy (leads to boredom) or too hard (leads to anxiety)",
      "Allowing interruptions during flow sessions",
      "Not creating environmental triggers that signal flow time to your brain"
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
    category: "Risk Management",
    overview: "Created by Tim Ferriss, fear-setting is an exercise for defining and overcoming your fears. Instead of setting goals, you define the worst-case scenarios of taking action, what you could do to prevent them, and how you would recover.",
    deepDive: "Most people avoid risk not because the actual consequences are devastating, but because their fears are vague and undefined. Fear-setting transforms abstract anxiety into concrete, manageable problems. Tim Ferriss used this exercise before leaving his corporate job to start his own business. He realized that even the worst-case scenario (running out of money and having to find a new job) was temporary and survivable. This clarity gave him the courage to take the leap, leading to massive success.",
    whyItHelps: "This exercise helps you realize that your fears are often exaggerated and manageable. It transforms vague anxieties into concrete, solvable problems, giving you the clarity and courage to take calculated risks.",
    whenToUse: "Use fear-setting before making major business decisions: launching a new product, quitting your job to go full-time, pivoting your business model, making a large investment, hiring your first employee, or any decision where fear is paralyzing you.",
    actionSteps: [
      "**Define Your Fear:** Write down the action you are afraid to take (e.g., 'Quitting my job to go full-time on my business,' 'Raising my prices by 50%').",
      "**List the Worst-Case Scenarios (Define):** In the first column, list 10-20 of the absolute worst things that could happen if you took that action. Be specific and realistic.",
      "**List Prevention Measures (Prevent):** In the second column, for each worst-case scenario, write down what you could do to prevent it from happening or minimize the damage. Most scenarios have preventable elements.",
      "**List Repair Actions (Repair):** In the third column, if the worst-case scenario did happen, what could you do to get back on track? Who could you ask for help? What resources would you use?",
      "**Analyze the Benefits of Action:** Now, write down all the potential benefits (professional, personal, financial) of taking the action, even if you only have partial success. Be exhaustive.",
      "**Consider the Cost of Inaction:** Finally, write down what it will cost you (financially, emotionally, physically) to not take this action in 6 months, 1 year, and 3 years. This is often the most powerful part."
    ],
    practicalTips: [
      "Be brutally honest with yourself during this exercise",
      "Share your fear-setting document with a trusted mentor for feedback",
      "Revisit this exercise quarterly to tackle new fears as your business grows",
      "Focus on permanent vs. temporary consequences—most worst-case scenarios are temporary",
      "After completing the exercise, set a deadline for making the decision to avoid analysis paralysis"
    ],
    commonMistakes: [
      "Defining fears that are too vague ('I might fail') instead of specific scenarios",
      "Not completing the 'Cost of Inaction' section, which is often the most motivating",
      "Skipping the prevention and repair columns, which show that scenarios are manageable",
      "Doing the exercise but not acting on the insights gained"
    ]
  },
  "minimum-viable-progress": {
    title: "Minimum Viable Progress",
    readTime: "5 min read",
    category: "Consistency",
    overview: "Minimum Viable Progress (MVP) is the smallest amount of progress you can make on a task to keep momentum, even on days when you feel unmotivated or overwhelmed. It's the antidote to procrastination.",
    deepDive: "The concept of 'Minimum Viable Progress' is adapted from the Lean Startup principle of 'Minimum Viable Product.' The insight is the same: something small is infinitely better than nothing. Many entrepreneurs fall into the trap of all-or-nothing thinking: 'If I can't work for 3 hours on this project, I won't work on it at all.' This leads to zero-progress days that kill momentum. MVP thinking says: even 2 minutes of work maintains your psychological momentum and compounds over time.",
    whyItHelps: "This technique bypasses the mental resistance of starting a large task. By committing to a tiny, non-intimidating step, you build momentum that often carries you much further than you initially planned, ensuring you never have a 'zero-progress' day.",
    psychologyBehind: "Starting is often harder than continuing. Once you begin a task, the Zeigarnik Effect kicks in—your brain wants to finish what it started. By committing to just a tiny MVP, you trick your brain into starting, and momentum usually carries you forward. Additionally, seeing consistent progress (even small) releases dopamine, which reinforces the behavior.",
    actionSteps: [
      "**Identify a Stalled Task:** Pick a big project or goal you've been procrastinating on. This could be writing a business plan, launching a website, or creating a course.",
      "**Define the MVP:** Ask yourself: 'What is the absolute smallest action I can take on this in 2 minutes?' (e.g., 'Open the document and write one sentence,' 'Draft one slide for the presentation,' 'Write one email subject line').",
      "**Commit Only to the MVP:** Tell yourself that you only have to do that one tiny thing. After that, you are free to stop. Remove the pressure of having to finish the whole task.",
      "**Execute the MVP:** Do the 2-minute task. More often than not, you'll find that starting was the hardest part, and you'll continue working. But even if you don't, you've made progress.",
      "**Track Your MVPs:** Log your 'MVP' for the day. This proves you are always moving forward, even on tough days. Celebrate consistency.",
      "**Apply it to Habit Formation:** Want to start a new workout habit? Your MVP could be 'Put on my workout clothes.' Want to read more? MVP: 'Read one page.'"
    ],
    practicalTips: [
      "Set a timer for 2-5 minutes and just work on the task for that long",
      "Use this technique on your most dreaded task first thing in the morning",
      "Celebrate completing the MVP, even if you don't do any more work on it that day",
      "Lower the bar so much that you can't say no—that's the secret",
      "Remember: 2 minutes is infinitely more than 0 minutes"
    ],
    commonMistakes: [
      "Setting the MVP too high (10-15 minutes instead of 2 minutes)",
      "Feeling guilty if you only do the MVP and don't continue",
      "Not tracking your MVPs, which makes it feel like you're not making progress",
      "Using MVP as an excuse to avoid deep work instead of as a momentum-starter"
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

    const savedSteps = localStorage.getItem(`mindset_hack_${hack}_completed`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    const savedNotes = localStorage.getItem(`mindset_hack_${hack}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [window.location.search, navigate]);

  const handleStepToggle = (stepIndex) => {
    if (!hackId) return;
    
    const newCompletedSteps = {
      ...completedSteps,
      [stepIndex]: !completedSteps[stepIndex]
    };
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem(`mindset_hack_${hackId}_completed`, JSON.stringify(newCompletedSteps));
  };

  const handleSaveNotes = () => {
    if (!hackId) return;
    localStorage.setItem(`mindset_hack_${hackId}_notes`, notes);
    const button = document.getElementById('save-notes-btn');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1="evenodd"></path></svg>Saved!</span>';
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
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-1">
              <Brain className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">{currentHack.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-soft)]">
                <span>{currentHack.category || "Mindset Hack"}</span>
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
          <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
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

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.whyItHelps}</p>
          </div>
        </div>

        {/* Deep Dive Section */}
        {currentHack.deepDive && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2 text-[var(--primary-gold)]" />
              Deep Dive
            </h2>
            <p className="text-[var(--text-main)] leading-relaxed">
              {currentHack.deepDive}
            </p>
          </div>
        )}

        {/* Additional Context Sections */}
        {(currentHack.neuroscience || currentHack.scienceOfFlow || currentHack.psychologyBehind || currentHack.mathematicsOfCompounding || currentHack.twoWaysToApply || currentHack.whenToUse) && (
          <div className="card p-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
              The Science Behind It / Context
            </h2>
            <p className="text-[var(--text-main)] leading-relaxed">
              {currentHack.neuroscience || currentHack.scienceOfFlow || currentHack.psychologyBehind || currentHack.mathematicsOfCompounding || currentHack.twoWaysToApply || currentHack.whenToUse}
            </p>
          </div>
        )}

        {/* Special Context Sections */}
        {currentHack.eisenhowerMatrix && (
          <div className="card p-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">📊 The Eisenhower Matrix</h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.eisenhowerMatrix}</p>
          </div>
        )}

        {currentHack.businessApplications && (
          <div className="card p-8 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">💼 Business Applications</h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.businessApplications}</p>
          </div>
        )}

        {currentHack.typesOfSystems && (
          <div className="card p-8 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">⚙️ Types of Systems</h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.typesOfSystems}</p>
          </div>
        )}

        {currentHack.coreModels && (
          <div className="card p-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
            <h3 className="font-bold text-lg text-[var(--text-main)] mb-3">🧠 Core Mental Models</h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentHack.coreModels}</p>
          </div>
        )}

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Action Steps</h2>
          <div className="space-y-4">
            {currentHack.actionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-black rounded-md text-white">
                <div className="flex-1">
                  <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}></p>
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
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-md">
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

        {/* Common Mistakes */}
        {currentHack.commonMistakes && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-6 rounded-md">
              <ul className="space-y-3">
                {currentHack.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-600 font-bold text-lg">×</span>
                    <span className="text-[var(--text-main)]">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

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
            className="form-input h-32 resize-none mb-4 w-full"
          />
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 rounded-md">
            <h4 className="font-semibold text-green-900 dark:text="green-100 mb-2">🧠 Reflection Questions</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
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
            <div className="bg-green-100 dark:bg-green-800 p-4 inline-block rounded-full mb-4">
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
