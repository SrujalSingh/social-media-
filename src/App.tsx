import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { PostDetailDrawer } from './components/PostDetailDrawer';
import { ToastContainer } from './components/ToastContainer';

import { DashboardView } from './views/DashboardView';
import { SocialFeedView } from './views/SocialFeedView';
import { SentimentAnalysisView } from './views/SentimentAnalysisView';
import { AudienceProfilingView } from './views/AudienceProfilingView';
import { TrendingNarrativesView } from './views/TrendingNarrativesView';
import { LinkNetworkAnalysisView } from './views/LinkNetworkAnalysisView';
import { NetworkCommunitiesView } from './views/NetworkCommunitiesView';
import { InformationPropagationView } from './views/InformationPropagationView';
import { AnalyticsWorkspaceView } from './views/AnalyticsWorkspaceView';
import { ReportsView } from './views/ReportsView';
import { DataSourcesView } from './views/DataSourcesView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  const renderView = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardView />;
      case 'feed':
        return <SocialFeedView />;
      case 'sentiment':
        return <SentimentAnalysisView />;
      case 'audience':
        return <AudienceProfilingView />;
      case 'narratives':
        return <TrendingNarrativesView />;
      case 'network':
        return <LinkNetworkAnalysisView />;
      case 'communities':
        return <NetworkCommunitiesView />;
      case 'propagation':
        return <InformationPropagationView />;
      case 'workspace':
        return <AnalyticsWorkspaceView />;
      case 'reports':
        return <ReportsView />;
      case 'datasources':
        return <DataSourcesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#172033] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 ml-60 flex flex-col min-w-0">
        {/* Fixed Top Header */}
        <TopHeader />

        {/* Main Content Workspace Container */}
        <main className="flex-1 pt-[82px] px-8 max-w-[1700px] w-full mx-auto">
          {renderView()}
        </main>
      </div>

      {/* Global Post Detail Drawer */}
      <PostDetailDrawer />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
