import './App.css'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AccountManager from '@/pages/AccountManager';
import AdminAccountManagers from '@/pages/AdminAccountManagers';
import MyBusinesses from '@/pages/MyBusinesses';
import SwitchBusiness from '@/pages/SwitchBusiness';
import TeamCollaboration from '@/pages/TeamCollaboration';
import BrandIdentityGuide from '@/pages/BrandIdentityGuide';
import MyFoundationRoadmap from '@/pages/MyFoundationRoadmap';
import StrategyFormDefineYourWhy from '@/pages/StrategyFormDefineYourWhy';
import StrategyFormMissionVision from '@/pages/StrategyFormMissionVision';
import StrategyFormBrandIdentity from '@/pages/StrategyFormBrandIdentity';
import StrategyFormIdealClient from '@/pages/StrategyFormIdealClient';
import StrategyFormValueProposition from '@/pages/StrategyFormValueProposition';
import StrategyFormValueLadder from '@/pages/StrategyFormValueLadder';
import StrategyFormSWOTAnalysis from '@/pages/StrategyFormSWOTAnalysis';
import StrategyFormBusinessModelCanvas from '@/pages/StrategyFormBusinessModelCanvas';
import FreedomCalculator from '@/pages/FreedomCalculator';
import StrategyFormCustomerJourney from '@/pages/StrategyFormCustomerJourney';
import StrategyFormContentStrategy from '@/pages/StrategyFormContentStrategy';
import StrategyFormWebsiteLaunch from '@/pages/StrategyFormWebsiteLaunch';
import StrategyFormEmailMarketing from '@/pages/StrategyFormEmailMarketing';
import StrategyFormSocialMedia from '@/pages/StrategyFormSocialMedia';
import StrategyFormPricingStrategies from '@/pages/StrategyFormPricingStrategies';
import StrategyFormCommunityBuilding from '@/pages/StrategyFormCommunityBuilding';
import StrategyFormAffiliateProgram from '@/pages/StrategyFormAffiliateProgram';
import StrategyFormStrategicPartnerships from '@/pages/StrategyFormStrategicPartnerships';
import StrategyFormAutomation from '@/pages/StrategyFormAutomation';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/AccountManager" element={<LayoutWrapper currentPageName="AccountManager"><AccountManager /></LayoutWrapper>} />
      <Route path="/AdminAccountManagers" element={<LayoutWrapper currentPageName="AdminAccountManagers"><AdminAccountManagers /></LayoutWrapper>} />
      <Route path="/MyBusinesses" element={<LayoutWrapper currentPageName="MyBusinesses"><MyBusinesses /></LayoutWrapper>} />
      <Route path="/SwitchBusiness" element={<LayoutWrapper currentPageName="SwitchBusiness"><SwitchBusiness /></LayoutWrapper>} />
      <Route path="/TeamCollaboration" element={<LayoutWrapper currentPageName="TeamCollaboration"><TeamCollaboration /></LayoutWrapper>} />
      <Route path="/BrandIdentityGuide" element={<LayoutWrapper currentPageName="BrandIdentityGuide"><BrandIdentityGuide /></LayoutWrapper>} />
      <Route path="/MyFoundationRoadmap" element={<LayoutWrapper currentPageName="MyFoundationRoadmap"><MyFoundationRoadmap /></LayoutWrapper>} />
      <Route path="/StrategyFormDefineYourWhy" element={<LayoutWrapper currentPageName="StrategyFormDefineYourWhy"><StrategyFormDefineYourWhy /></LayoutWrapper>} />
      <Route path="/StrategyFormMissionVision" element={<LayoutWrapper currentPageName="StrategyFormMissionVision"><StrategyFormMissionVision /></LayoutWrapper>} />
      <Route path="/StrategyFormBrandIdentity" element={<LayoutWrapper currentPageName="StrategyFormBrandIdentity"><StrategyFormBrandIdentity /></LayoutWrapper>} />
      <Route path="/StrategyFormIdealClient" element={<LayoutWrapper currentPageName="StrategyFormIdealClient"><StrategyFormIdealClient /></LayoutWrapper>} />
      <Route path="/StrategyFormValueProposition" element={<LayoutWrapper currentPageName="StrategyFormValueProposition"><StrategyFormValueProposition /></LayoutWrapper>} />
      <Route path="/StrategyFormValueLadder" element={<LayoutWrapper currentPageName="StrategyFormValueLadder"><StrategyFormValueLadder /></LayoutWrapper>} />
      <Route path="/StrategyFormSWOTAnalysis" element={<LayoutWrapper currentPageName="StrategyFormSWOTAnalysis"><StrategyFormSWOTAnalysis /></LayoutWrapper>} />
      <Route path="/StrategyFormBusinessModelCanvas" element={<LayoutWrapper currentPageName="StrategyFormBusinessModelCanvas"><StrategyFormBusinessModelCanvas /></LayoutWrapper>} />
      <Route path="/FreedomCalculator" element={<LayoutWrapper currentPageName="FreedomCalculator"><FreedomCalculator /></LayoutWrapper>} />
      <Route path="/StrategyFormCustomerJourney" element={<LayoutWrapper currentPageName="StrategyFormCustomerJourney"><StrategyFormCustomerJourney /></LayoutWrapper>} />
      <Route path="/StrategyFormContentStrategy" element={<LayoutWrapper currentPageName="StrategyFormContentStrategy"><StrategyFormContentStrategy /></LayoutWrapper>} />
      <Route path="/StrategyFormWebsiteLaunch" element={<LayoutWrapper currentPageName="StrategyFormWebsiteLaunch"><StrategyFormWebsiteLaunch /></LayoutWrapper>} />
      <Route path="/StrategyFormEmailMarketing" element={<LayoutWrapper currentPageName="StrategyFormEmailMarketing"><StrategyFormEmailMarketing /></LayoutWrapper>} />
      <Route path="/StrategyFormSocialMedia" element={<LayoutWrapper currentPageName="StrategyFormSocialMedia"><StrategyFormSocialMedia /></LayoutWrapper>} />
      <Route path="/StrategyFormPricingStrategies" element={<LayoutWrapper currentPageName="StrategyFormPricingStrategies"><StrategyFormPricingStrategies /></LayoutWrapper>} />
      <Route path="/StrategyFormCommunityBuilding" element={<LayoutWrapper currentPageName="StrategyFormCommunityBuilding"><StrategyFormCommunityBuilding /></LayoutWrapper>} />
      <Route path="/StrategyFormAffiliateProgram" element={<LayoutWrapper currentPageName="StrategyFormAffiliateProgram"><StrategyFormAffiliateProgram /></LayoutWrapper>} />
      <Route path="/StrategyFormStrategicPartnerships" element={<LayoutWrapper currentPageName="StrategyFormStrategicPartnerships"><StrategyFormStrategicPartnerships /></LayoutWrapper>} />
      <Route path="/StrategyFormAutomation" element={<LayoutWrapper currentPageName="StrategyFormAutomation"><StrategyFormAutomation /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App