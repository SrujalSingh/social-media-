import React from 'react';
import { Search, Bell, Play, Database, Clock, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopHeader: React.FC = () => {
  const {
    activePage,
    globalSearch,
    setGlobalSearch,
    runDemoAnalysis,
    isDemoRunning,
    demoProgress,
    demoStageName
  } = useApp();

  const getPageBreadcrumb = () => {
    switch (activePage) {
      case 'dashboard':
        return { category: 'OVERVIEW', title: 'Social Media Intelligence Overview' };
      case 'feed':
        return { category: 'SOCIAL INTELLIGENCE', title: 'Social Media Feed' };
      case 'sentiment':
        return { category: 'SOCIAL INTELLIGENCE', title: 'Sentiment Analysis' };
      case 'audience':
        return { category: 'SOCIAL INTELLIGENCE', title: 'Audience Demographics & Profiling' };
      case 'narratives':
        return { category: 'SOCIAL INTELLIGENCE', title: 'Trending Narrative Intelligence' };
      case 'network':
        return { category: 'NETWORK ANALYSIS', title: 'Link & Network Analysis' };
      case 'communities':
        return { category: 'NETWORK ANALYSIS', title: 'Network Communities' };
      case 'propagation':
        return { category: 'NETWORK ANALYSIS', title: 'Narrative Propagation Analysis' };
      case 'workspace':
        return { category: 'ANALYSIS', title: 'Analytics Workspace' };
      case 'reports':
        return { category: 'ANALYSIS', title: 'Social Intelligence Report' };
      case 'datasources':
        return { category: 'SYSTEM', title: 'Data Sources Management' };
      case 'settings':
        return { category: 'SYSTEM', title: 'System Settings' };
      default:
        return { category: 'SYSTEM', title: 'Social Media Analytics' };
    }
  };

  const breadcrumb = getPageBreadcrumb();

  return (
    <header className="h-[66px] bg-white border-b border-[#E1E7EF] flex items-center justify-between px-6 fixed top-0 left-60 right-0 z-20 shadow-xs">
      {/* LEFT: Breadcrumb & Title */}
      <div className="flex flex-col justify-center">
        <span className="text-[11px] font-semibold text-[#98A2B3] tracking-wide uppercase">
          {breadcrumb.category}
        </span>
        <h2 className="text-base font-bold text-[#172033] tracking-tight">{breadcrumb.title}</h2>
      </div>

      {/* CENTER: Universal Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search users, hashtags, keywords, narratives..."
            className="w-full bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#172033] placeholder-[#98A2B3] focus:outline-none focus:border-[#1678A8] transition-colors"
          />
        </div>
      </div>

      {/* RIGHT: Meta info + Actions */}
      <div className="flex items-center space-x-4">
        {/* Run Demo Button / Progress Bar */}
        {isDemoRunning ? (
          <div className="flex items-center space-x-2 bg-[#E8F4F9] border border-[#B5E0F2] rounded-lg px-3 py-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#1678A8] animate-spin" />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#1678A8] leading-tight truncate max-w-[140px]">
                {demoStageName}
              </span>
              <div className="w-24 h-1 bg-[#D5DCB6] rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-[#1678A8] transition-all duration-300"
                  style={{ width: `${demoProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={runDemoAnalysis}
            className="flex items-center space-x-1.5 bg-[#1678A8] hover:bg-[#12628a] text-white rounded-lg px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Demo Analysis</span>
          </button>
        )}

        <div className="h-4 w-px bg-[#E1E7EF]" />

        {/* Dataset Meta */}
        <div className="hidden lg:flex items-center space-x-3 text-xs text-[#667085]">
          <div className="flex items-center space-x-1 bg-[#F6F8FB] border border-[#E1E7EF] px-2 py-1 rounded-md text-[11px] font-medium text-[#172033]">
            <Database className="w-3 h-3 text-[#179B8A]" />
            <span>Dataset: Demo</span>
          </div>

          <div className="flex items-center space-x-1 text-[11px] text-[#98A2B3]">
            <Clock className="w-3 h-3" />
            <span>2 min ago</span>
          </div>
        </div>

        {/* Notification Icon */}
        <button className="relative p-1.5 text-[#75849A] hover:text-[#172033] hover:bg-[#F6F8FB] rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E96368]" />
        </button>

        {/* Analyst Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#E1E7EF]">
          <div className="w-7 h-7 rounded-full bg-[#E8F4F9] border border-[#B5E0F2] text-[#1678A8] font-bold text-xs flex items-center justify-center">
            NT
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-semibold text-[#172033] leading-none">NTRO Analyst</span>
            <span className="text-[10px] text-[#667085]">Cyber Intel Unit</span>
          </div>
        </div>
      </div>
    </header>
  );
};
