/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AIConversationHistory from './pages/AIConversationHistory';
import AIStrategyHub from './pages/AIStrategyHub';
import AcceptTeamInvitation from './pages/AcceptTeamInvitation';
import Admin from './pages/Admin';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminContentManagement from './pages/AdminContentManagement';
import AdminCourseManagement from './pages/AdminCourseManagement';
import AdminMemberOfTheMonth from './pages/AdminMemberOfTheMonth';
import AdminNotifications from './pages/AdminNotifications';
import AdminPostScheduler from './pages/AdminPostScheduler';
import AdminRoadmapContent from './pages/AdminRoadmapContent';
import AdminTestSystems from './pages/AdminTestSystems';
import AdvertisingServices from './pages/AdvertisingServices';
import AnnualPlanning from './pages/AnnualPlanning';
import AssistantGuide from './pages/AssistantGuide';
import BeaconIntro from './pages/BeaconIntro';
import BeaconRadioSetup from './pages/BeaconRadioSetup';
import BeaconStudioBooking from './pages/BeaconStudioBooking';
import BrandKit from './pages/BrandKit';
import BusinessMindsPodcastBooking from './pages/BusinessMindsPodcastBooking';
import BusinessOverview from './pages/BusinessOverview';
import BusinessProfile from './pages/BusinessProfile';
import Community from './pages/Community';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import CourseDetails from './pages/CourseDetails';
import Courses from './pages/Courses';
import CreateSOP from './pages/CreateSOP';
import DailyTrack from './pages/DailyTrack';
import Dashboard from './pages/Dashboard';
import DfyServiceDetail from './pages/DfyServiceDetail';
import DfyServices from './pages/DfyServices';
import EditBusiness from './pages/EditBusiness';
import EditSOP from './pages/EditSOP';
import ElyzetAI from './pages/ElyzetAI';
import ElyzetAIAssistants from './pages/ElyzetAIAssistants';
import FinancialProjections from './pages/FinancialProjections';
import FocusedProgram from './pages/FocusedProgram';
import FocusedPrograms from './pages/FocusedPrograms';
import FreedomCalculator from './pages/FreedomCalculator';
import GoHighLevelUpgrade from './pages/GoHighLevelUpgrade';
import GrowthStrategySession from './pages/GrowthStrategySession';
import Guide from './pages/Guide';
import Guides from './pages/Guides';
import HQCustomerJourneyGuide from './pages/HQCustomerJourneyGuide';
import Home from './pages/Home';
import Journey from './pages/Journey';
import LiveWebinar from './pages/LiveWebinar';
import Magazine from './pages/Magazine';
import MarketingOverview from './pages/MarketingOverview';
import MemberDirectory from './pages/MemberDirectory';
import MemberOfTheMonthSubmission from './pages/MemberOfTheMonthSubmission';
import MemberProfile from './pages/MemberProfile';
import MindsetHack from './pages/MindsetHack';
import MindsetHacks from './pages/MindsetHacks';
import MorningRoutineBuilder from './pages/MorningRoutineBuilder';
import MyFoundation from './pages/MyFoundation';
import MyFoundationRoadmap from './pages/MyFoundationRoadmap';
import NicheRoadmap from './pages/NicheRoadmap';
import NicheRoadmapOverview from './pages/NicheRoadmapOverview';
import NicheRoadmaps from './pages/NicheRoadmaps';
import Onboarding from './pages/Onboarding';
import Partners from './pages/Partners';
import PartnershipDetail from './pages/PartnershipDetail';
import PaymentFailed from './pages/PaymentFailed';
import PaymentSuccess from './pages/PaymentSuccess';
import Profile from './pages/Profile';
import Progress from './pages/Progress';
import QuickLesson from './pages/QuickLesson';
import QuickLessons from './pages/QuickLessons';
import QuickStartFoundation from './pages/QuickStartFoundation';
import SOPPoliciesAI from './pages/SOPPoliciesAI';
import SOPs from './pages/SOPs';
import Schedule from './pages/Schedule';
import SocialMediaPlanner from './pages/SocialMediaPlanner';
import SocialMediaServices from './pages/SocialMediaServices';
import StartupStrategySession from './pages/StartupStrategySession';
import StrategyFormAffiliateProgram from './pages/StrategyFormAffiliateProgram';
import StrategyFormAutomation from './pages/StrategyFormAutomation';
import StrategyFormBrandIdentity from './pages/StrategyFormBrandIdentity';
import StrategyFormBrandKit from './pages/StrategyFormBrandKit';
import StrategyFormBusinessModelCanvas from './pages/StrategyFormBusinessModelCanvas';
import StrategyFormCommunityBuilding from './pages/StrategyFormCommunityBuilding';
import StrategyFormContentStrategy from './pages/StrategyFormContentStrategy';
import StrategyFormCustomerJourney from './pages/StrategyFormCustomerJourney';
import StrategyFormDefineYourWhy from './pages/StrategyFormDefineYourWhy';
import StrategyFormEmailMarketing from './pages/StrategyFormEmailMarketing';
import StrategyFormIdealClient from './pages/StrategyFormIdealClient';
import StrategyFormMissionVision from './pages/StrategyFormMissionVision';
import StrategyFormPricingStrategies from './pages/StrategyFormPricingStrategies';
import StrategyFormSWOTAnalysis from './pages/StrategyFormSWOTAnalysis';
import StrategyFormSocialMedia from './pages/StrategyFormSocialMedia';
import StrategyFormStrategicPartnerships from './pages/StrategyFormStrategicPartnerships';
import StrategyFormValueLadder from './pages/StrategyFormValueLadder';
import StrategyFormValueProposition from './pages/StrategyFormValueProposition';
import StrategyFormWebsiteLaunch from './pages/StrategyFormWebsiteLaunch';
import StrategySession from './pages/StrategySession';
import TestEmail from './pages/TestEmail';
import TheBeacon from './pages/TheBeacon';
import TheCommunity from './pages/TheCommunity';
import TheHQ from './pages/TheHQ';
import Upgrade from './pages/Upgrade';
import UserManagement from './pages/UserManagement';
import ViewSOP from './pages/ViewSOP';
import VisionStrategySession from './pages/VisionStrategySession';
import WebsiteDevelopmentGuidePage from './pages/WebsiteDevelopmentGuidePage';
import Week from './pages/Week';
import layout from './pages/layout';
import EmailMarketingPlanner from './pages/EmailMarketingPlanner';
import ContentStrategyPlanner from './pages/ContentStrategyPlanner';
import PaidAdvertisingPlanner from './pages/PaidAdvertisingPlanner';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AIConversationHistory": AIConversationHistory,
    "AIStrategyHub": AIStrategyHub,
    "AcceptTeamInvitation": AcceptTeamInvitation,
    "Admin": Admin,
    "AdminAnalytics": AdminAnalytics,
    "AdminContentManagement": AdminContentManagement,
    "AdminCourseManagement": AdminCourseManagement,
    "AdminMemberOfTheMonth": AdminMemberOfTheMonth,
    "AdminNotifications": AdminNotifications,
    "AdminPostScheduler": AdminPostScheduler,
    "AdminRoadmapContent": AdminRoadmapContent,
    "AdminTestSystems": AdminTestSystems,
    "AdvertisingServices": AdvertisingServices,
    "AnnualPlanning": AnnualPlanning,
    "AssistantGuide": AssistantGuide,
    "BeaconIntro": BeaconIntro,
    "BeaconRadioSetup": BeaconRadioSetup,
    "BeaconStudioBooking": BeaconStudioBooking,
    "BrandKit": BrandKit,
    "BusinessMindsPodcastBooking": BusinessMindsPodcastBooking,
    "BusinessOverview": BusinessOverview,
    "BusinessProfile": BusinessProfile,
    "Community": Community,
    "CompetitorAnalysis": CompetitorAnalysis,
    "CourseDetails": CourseDetails,
    "Courses": Courses,
    "CreateSOP": CreateSOP,
    "DailyTrack": DailyTrack,
    "Dashboard": Dashboard,
    "DfyServiceDetail": DfyServiceDetail,
    "DfyServices": DfyServices,
    "EditBusiness": EditBusiness,
    "EditSOP": EditSOP,
    "ElyzetAI": ElyzetAI,
    "ElyzetAIAssistants": ElyzetAIAssistants,
    "FinancialProjections": FinancialProjections,
    "FocusedProgram": FocusedProgram,
    "FocusedPrograms": FocusedPrograms,
    "FreedomCalculator": FreedomCalculator,
    "GoHighLevelUpgrade": GoHighLevelUpgrade,
    "GrowthStrategySession": GrowthStrategySession,
    "Guide": Guide,
    "Guides": Guides,
    "HQCustomerJourneyGuide": HQCustomerJourneyGuide,
    "Home": Home,
    "Journey": Journey,
    "LiveWebinar": LiveWebinar,
    "Magazine": Magazine,
    "MarketingOverview": MarketingOverview,
    "MemberDirectory": MemberDirectory,
    "MemberOfTheMonthSubmission": MemberOfTheMonthSubmission,
    "MemberProfile": MemberProfile,
    "MindsetHack": MindsetHack,
    "MindsetHacks": MindsetHacks,
    "MorningRoutineBuilder": MorningRoutineBuilder,
    "MyFoundation": MyFoundation,
    "MyFoundationRoadmap": MyFoundationRoadmap,
    "NicheRoadmap": NicheRoadmap,
    "NicheRoadmapOverview": NicheRoadmapOverview,
    "NicheRoadmaps": NicheRoadmaps,
    "Onboarding": Onboarding,
    "Partners": Partners,
    "PartnershipDetail": PartnershipDetail,
    "PaymentFailed": PaymentFailed,
    "PaymentSuccess": PaymentSuccess,
    "Profile": Profile,
    "Progress": Progress,
    "QuickLesson": QuickLesson,
    "QuickLessons": QuickLessons,
    "QuickStartFoundation": QuickStartFoundation,
    "SOPPoliciesAI": SOPPoliciesAI,
    "SOPs": SOPs,
    "Schedule": Schedule,
    "SocialMediaPlanner": SocialMediaPlanner,
    "SocialMediaServices": SocialMediaServices,
    "StartupStrategySession": StartupStrategySession,
    "StrategyFormAffiliateProgram": StrategyFormAffiliateProgram,
    "StrategyFormAutomation": StrategyFormAutomation,
    "StrategyFormBrandIdentity": StrategyFormBrandIdentity,
    "StrategyFormBrandKit": StrategyFormBrandKit,
    "StrategyFormBusinessModelCanvas": StrategyFormBusinessModelCanvas,
    "StrategyFormCommunityBuilding": StrategyFormCommunityBuilding,
    "StrategyFormContentStrategy": StrategyFormContentStrategy,
    "StrategyFormCustomerJourney": StrategyFormCustomerJourney,
    "StrategyFormDefineYourWhy": StrategyFormDefineYourWhy,
    "StrategyFormEmailMarketing": StrategyFormEmailMarketing,
    "StrategyFormIdealClient": StrategyFormIdealClient,
    "StrategyFormMissionVision": StrategyFormMissionVision,
    "StrategyFormPricingStrategies": StrategyFormPricingStrategies,
    "StrategyFormSWOTAnalysis": StrategyFormSWOTAnalysis,
    "StrategyFormSocialMedia": StrategyFormSocialMedia,
    "StrategyFormStrategicPartnerships": StrategyFormStrategicPartnerships,
    "StrategyFormValueLadder": StrategyFormValueLadder,
    "StrategyFormValueProposition": StrategyFormValueProposition,
    "StrategyFormWebsiteLaunch": StrategyFormWebsiteLaunch,
    "StrategySession": StrategySession,
    "TestEmail": TestEmail,
    "TheBeacon": TheBeacon,
    "TheCommunity": TheCommunity,
    "TheHQ": TheHQ,
    "Upgrade": Upgrade,
    "UserManagement": UserManagement,
    "ViewSOP": ViewSOP,
    "VisionStrategySession": VisionStrategySession,
    "WebsiteDevelopmentGuidePage": WebsiteDevelopmentGuidePage,
    "Week": Week,
    "layout": layout,
    "EmailMarketingPlanner": EmailMarketingPlanner,
    "ContentStrategyPlanner": ContentStrategyPlanner,
    "PaidAdvertisingPlanner": PaidAdvertisingPlanner,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};