import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Lightbulb, ArrowLeft, CheckCircle, Clock, Target, Save, Zap, Sparkles, AlertCircle, BookOpen, TrendingUp } from "lucide-react";

const quickLessons = {
  "domain-name": {
    title: "How to Choose the Right Domain Name",
    readTime: "8 min read",
    category: "Branding",
    overview: "Your domain name is your digital real estate address. It's often the first impression potential customers have of your business online. A well-chosen domain can boost credibility, improve SEO rankings, and make your brand memorable. Think of it as the digital equivalent of choosing a physical location for your store—you want something that's easy to find, easy to remember, and represents your brand well.",
    whyItHelps: "A strong domain name builds instant trust with visitors, improves brand recall by up to 70%, and makes it easier for customers to find and remember your business. It also impacts your search engine rankings significantly. According to research, businesses with clear, memorable domains get 25% more direct traffic than those with complex or confusing names.",
    deepDive: "Your domain isn't just a web address—it's a critical branding and marketing asset. Companies like Amazon, Google, and Apple succeeded partly because their domain names are short, memorable, and easy to spell. A good domain name should be: easy to say over the phone, easy to type on a keyboard, free of hyphens and numbers, and immediately give people an idea of what you do. The psychology behind memorable domains involves simplicity, clarity, and emotional resonance. Research shows people remember 'chunked' information better—shorter domain names with fewer syllables stick in memory more effectively.",
    actionSteps: [
      "**Brainstorm Keywords:** List 10-15 words that describe your business, products, or services. Include industry terms and the benefits you provide. For example, if you're a virtual assistant, keywords might include: 'virtual,' 'assist,' 'remote,' 'help,' 'support,' 'admin,' 'executive,' etc.",
      "**Keep It Short and Simple:** Aim for 6-14 characters total. Shorter domains are easier to type, remember, and less prone to typos. Test this: if you can't say it clearly over the phone without spelling it out, it's probably too complex. Think 'Google' not 'SearchEngineCompany.'",
      "**Choose the Right Extension:** .com is still king for businesses—it's what people instinctively type. Only consider .net, .org, or industry-specific extensions like .tech or .shop if .com isn't available. .co can work but prepare for people accidentally typing .com instead.",
      "**Avoid Hyphens and Numbers:** These make domains harder to remember and communicate verbally. When you tell someone 'go to my-awesome-business-2024.com,' they'll forget the hyphens or get the number wrong. Keep it clean: 'myawesomebusiness.com' or better yet, 'awesomebiz.com.'",
      "**Check Availability Across Platforms:** Use tools like Namecheap, GoDaddy, or Google Domains to check if your preferred names are available. But also check social media handles—you want consistency across Instagram, Facebook, Twitter/X, LinkedIn, etc.",
      "**Test It Out Loud:** Say your domain name to 5 different people. Can they spell it correctly? Do they understand what you do? If they hesitate or guess wrong, reconsider. The 'Radio Test' is simple: if you can't say it on the radio and have listeners find you, it's too complicated."
    ],
    practicalTips: [
      "Use domain generators like NameMesh, Lean Domain Search, or Bust a Name for creative ideas when you're stuck",
      "Check trademark databases before committing to avoid legal issues—use USPTO.gov for U.S. trademarks",
      "Consider buying multiple extensions (.com, .net, .org) and plural/singular versions to protect your brand from competitors",
      "Test pronunciation with people from different backgrounds—some words sound different in various accents",
      "Look at competitor domains in your industry for naming patterns and differentiation opportunities"
    ],
    commonMistakes: [
      "Choosing a name that's too similar to competitors—you'll lose traffic to them",
      "Not checking if the social media handles match your domain name",
      "Using trademarked terms without permission (can result in losing your domain)",
      "Picking a name that's too specific to your current offering (limits future growth)"
    ],
    tools: [
      { name: "The Command Hub Website Builder", description: "Choose from professional templates and customize with drag & drop editor" },
      { name: "Namecheap", description: "Domain registration and availability checking" },
      { name: "Google Domains", description: "Google's domain registration service" }
    ]
  },
  "morning-routine": {
    title: "The Entrepreneur's Morning Routine",
    readTime: "10 min read",
    category: "Productivity",
    overview: "How you start your morning sets the tone for your entire day as an entrepreneur. A structured morning routine helps you maintain peak performance, reduce stress, and consistently work on your most important goals before distractions take over. Research from the American Psychological Association shows that people who follow a morning routine report 31% higher productivity and 40% lower stress levels throughout the day. This isn't about waking up at 4 AM—it's about creating a consistent start that energizes you and prepares your mind for success.",
    whyItHelps: "A powerful morning routine gives you control over your day instead of reacting to whatever comes at you. It reduces decision fatigue (saving mental energy for important business decisions), boosts energy levels naturally, and ensures you tackle high-priority tasks when your willpower is strongest. Successful entrepreneurs like Tim Ferriss, Arianna Huffington, and Mark Zuckerberg all credit structured morning routines as a key to their success.",
    deepDive: "Your body runs on a circadian rhythm—a 24-hour internal clock that affects energy, focus, and hormone levels. The first 60-90 minutes after waking are critical because cortisol (alertness hormone) is naturally highest then. If you immediately check emails or dive into reactive tasks, you're using your peak mental state on low-value activities. Instead, successful entrepreneurs use this time for: physical movement (increases blood flow and oxygen to the brain), mental clarity practices (meditation or journaling), and strategic planning (setting daily priorities). The key is consistency—your brain thrives on routine and begins to anticipate and prepare for activities it knows are coming.",
    actionSteps: [
      "**Wake Up Consistently:** Choose a wake-up time and stick to it 7 days a week, even weekends. Your body's circadian rhythm needs consistency to regulate properly. If you vary your wake time by 2+ hours, you're essentially giving yourself jet lag. Start with a realistic time—if you currently wake at 8 AM, don't jump to 5 AM. Try 7:30 AM first and adjust gradually.",
      "**Hydrate First:** Keep a large glass of water (16-24 oz) by your bed. Drink it immediately upon waking. Add lemon if you want extra benefits (vitamin C, aids digestion). Your body is dehydrated after 7-8 hours without water—hydration improves alertness and cognitive function faster than coffee.",
      "**Move Your Body:** Spend 10-20 minutes on physical activity. This doesn't mean an intense workout. Try: gentle stretching, yoga, a walk around the block, or 10 push-ups. Movement increases blood flow to your brain, releases endorphins (natural mood boosters), and signals to your body that it's time to be alert and active.",
      "**Practice Mindfulness:** Dedicate 5-15 minutes to meditation, deep breathing, or journaling. If you're new to meditation, try guided apps like Calm or Headspace. If meditation isn't your thing, try journaling: write 3 things you're grateful for and your top 3 priorities for the day. This centers your mind and reduces anxiety.",
      "**Review Your Goals:** Spend 5 minutes reviewing your top 3 priorities for the day. Ask yourself: 'If I only accomplish 3 things today, what would have the biggest impact on my business?' Write them down. This ensures you start with intention instead of reacting to urgent-but-not-important tasks.",
      "**Eat a Healthy Breakfast:** Fuel your body with protein (eggs, Greek yogurt, nuts), healthy fats (avocado, olive oil), and complex carbs (oatmeal, whole grain). Avoid sugar-heavy breakfasts—they cause energy crashes around 10-11 AM that kill productivity."
    ],
    practicalTips: [
      "Prepare everything the night before: lay out clothes, prep breakfast ingredients, charge devices by the door",
      "Start small: begin with just 2-3 elements (hydrate, move, review goals) and gradually add more over weeks",
      "Track your routine for 30 days using a habit tracker app or simple calendar X's—building the habit is more important than perfection",
      "Adjust timing based on your chronotype (natural energy patterns): 'night owls' might need a later start time",
      "Protect your morning routine fiercely: don't schedule early meetings or calls during this sacred time"
    ],
    commonMistakes: [
      "Trying to implement too many changes at once and burning out after 3 days",
      "Immediately checking email or social media upon waking (puts you in reactive mode)",
      "Skipping the routine on weekends (consistency is key for habit formation)",
      "Making your routine too rigid—allow flexibility for life's unexpected events"
    ],
    tools: [
      { name: "The Command Hub Mobile App", description: "Set daily reminders and track your routine on the go" },
      { name: "The Command Hub Calendar", description: "Schedule your morning routine blocks and set reminders" },
      { name: "Headspace or Calm", description: "Guided meditation and mindfulness exercises for beginners and advanced practitioners" }
    ]
  }
};

export default function QuickLessonPage() {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [notes, setNotes] = useState('');
  const [lessonId, setLessonId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lesson = urlParams.get('lesson');
    
    if (lesson && quickLessons[lesson]) {
      setCurrentLesson(quickLessons[lesson]);
      setLessonId(lesson);
    } else {
      navigate(createPageUrl("QuickLessons"));
    }

    const savedSteps = localStorage.getItem(`quick_lesson_${lesson}_steps`);
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }

    const savedNotes = localStorage.getItem(`quick_lesson_${lesson}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [navigate]);

  const handleStepToggle = (stepIndex) => {
    const newCompletedSteps = {
      ...completedSteps,
      [stepIndex]: !completedSteps[stepIndex]
    };
    setCompletedSteps(newCompletedSteps);
    if (lessonId) {
      localStorage.setItem(`quick_lesson_${lessonId}_steps`, JSON.stringify(newCompletedSteps));
    }
  };

  const handleSaveNotes = () => {
    if (lessonId) {
      localStorage.setItem(`quick_lesson_${lessonId}_notes`, notes);
      const button = document.getElementById('save-notes-btn');
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Saved!</span>';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    }
  };

  if (!currentLesson) {
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
  const totalSteps = currentLesson.actionSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedStepsCount / totalSteps) * 100) : 0;
  const isMorningRoutineLesson = lessonId === 'morning-routine';

  return (
    <div className="px-4 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="card p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <button
              onClick={() => navigate(createPageUrl("QuickLessons"))}
              className="btn btn-ghost mb-4 sm:mb-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Quick Lessons</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[var(--text-soft)]" />
              <span className="text-sm text-[var(--text-soft)]">{currentLesson.readTime}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-1">
              <Lightbulb className="w-8 h-8 text-[var(--primary-gold)]" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">{currentLesson.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-soft)]">
                <span>{currentLesson.category}</span>
                <span>•</span>
                <span>{completedStepsCount}/{totalSteps} steps completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Morning Routine Interactive CTA */}
        {isMorningRoutineLesson && (
          <div className="card p-6 bg-gradient-to-r from-[var(--primary-gold)] to-yellow-600 text-white">
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">🎯 Build Your Custom Morning Routine!</h3>
                <p className="text-white/90 mb-4">
                  Don't just read about it - create your personalized morning routine with our interactive builder. 
                  Design your perfect morning step-by-step and track your progress daily.
                </p>
                <button
                  onClick={() => navigate(createPageUrl('MorningRoutineBuilder'))}
                  className="btn bg-white text-[var(--primary-gold)] hover:bg-gray-100"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Build My Morning Routine →
                </button>
              </div>
            </div>
          </div>
        )}

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
            {currentLesson.overview}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-6 rounded-md">
            <h3 className="font-bold text-[var(--text-main)] mb-2 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Why This Helps Your Business
            </h3>
            <p className="text-[var(--text-main)] leading-relaxed">{currentLesson.whyItHelps}</p>
          </div>
        </div>

        {/* Deep Dive Section */}
        {currentLesson.deepDive && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-[var(--primary-gold)]" />
              Deep Dive: Understanding the Details
            </h2>
            <p className="text-[var(--text-main)] leading-relaxed text-base">
              {currentLesson.deepDive}
            </p>
          </div>
        )}

        {/* Action Steps */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Step-by-Step Action Plan</h2>
          <div className="space-y-4">
            {currentLesson.actionSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-black rounded-md text-white">
                <div className="flex-1">
                  <p className="leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}></p>
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
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Practical Tips for Success</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-6 rounded-md">
            <ul className="space-y-3">
              {currentLesson.practicalTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-[var(--primary-gold)] mt-0.5 flex-shrink-0" />
                  <span className="text-[var(--text-main)] text-base">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Mistakes */}
        {currentLesson.commonMistakes && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
              Common Mistakes to Avoid
            </h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-6 rounded-md">
              <ul className="space-y-3">
                {currentLesson.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-600 font-bold text-lg">×</span>
                    <span className="text-[var(--text-main)] text-base">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tools & Resources */}
        {currentLesson.tools && (
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-6">Recommended Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                  <h4 className="font-semibold text-[var(--text-main)] mb-2">{tool.name}</h4>
                  <p className="text-sm text-[var(--text-soft)]">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Notes & Action Items</h2>
            <button
              id="save-notes-btn"
              onClick={handleSaveNotes}
              className="btn btn-secondary"
            >
              <Save className="w-4 h-4" />
              <span>Save Notes</span>
            </button>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your personal notes, insights, and action items from this lesson..."
            className="form-input h-32 resize-none mb-4"
          />
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-md">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Make the Most of This Lesson</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Write down specific action items you'll implement this week</li>
              <li>• Set deadlines for completing each action step</li>
              <li>• Note any tools or resources you want to explore further</li>
              <li>• Track results and iterate based on what you learn</li>
            </ul>
          </div>
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="card p-8 text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 inline-block rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Lesson Complete!</h3>
            <p className="text-[var(--text-soft)] mb-4">
              Great job completing this lesson. Now it's time to implement what you've learned!
            </p>
            <button
              onClick={() => navigate(createPageUrl("QuickLessons"))}
              className="btn btn-primary"
            >
              Explore More Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
}