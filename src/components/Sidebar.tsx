import React from 'react';
import {
  LayoutDashboard,
  Rss,
  LineChart,
  Users,
  TrendingUp,
  Share2,
  Network,
  GitBranch,
  Layers,
  FileText,
  Database,
  Settings,
  User,
  HelpCircle,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ActivePage } from '../context/AppContext';

interface NavItem {
  id: ActivePage;
  label: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const sections: NavSection[] = [
    {
      title: 'OVERVIEW',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }]
    },
    {
      title: 'SOCIAL INTELLIGENCE',
      items: [
        { id: 'feed', label: 'Social Feed', icon: Rss },
        { id: 'sentiment', label: 'Sentiment Analysis', icon: LineChart },
        { id: 'audience', label: 'Audience Profiling', icon: Users },
        { id: 'narratives', label: 'Trending Narratives', icon: TrendingUp }
      ]
    },
    {
      title: 'NETWORK ANALYSIS',
      items: [
        { id: 'network', label: 'Link Analysis', icon: Share2 },
        { id: 'communities', label: 'Network Communities', icon: Network },
        { id: 'propagation', label: 'Information Propagation', icon: GitBranch }
      ]
    },
    {
      title: 'ANALYSIS',
      items: [
        { id: 'workspace', label: 'Analytics Workspace', icon: Layers },
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'datasources', label: 'Data Sources', icon: Database },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#E1E7EF] flex flex-col fixed left-0 top-0 z-30 select-none">
      {/* Top Header Branding */}
      <div className="p-4 border-b border-[#E1E7EF] flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-[#1678A8] text-white flex items-center justify-center font-bold text-base shadow-sm">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-[#172033]">SIH26152</h1>
          <p className="text-xs text-[#667085] font-medium">Social Media Analytics</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-2 mb-1.5 text-[11px] font-semibold tracking-wider text-[#98A2B3] uppercase">
              {section.title}
            </p>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E8F4F9] text-[#1678A8] font-semibold'
                        : 'text-[#667085] hover:bg-[#F6F8FB] hover:text-[#172033]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1678A8]' : 'text-[#75849A]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Profile / System Links */}
      <div className="p-3 border-t border-[#E1E7EF] bg-[#F6F8FB] space-y-1">
        <div className="flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-white text-xs text-[#172033] font-medium cursor-pointer">
          <User className="w-4 h-4 text-[#1678A8]" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate text-[#172033]">Analyst Profile</p>
            <p className="text-[11px] text-[#667085] truncate">NTRO Unit 04</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#667085] px-2 py-1.5">
          <button className="flex items-center space-x-1.5 hover:text-[#1678A8]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-[#E96368]">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
