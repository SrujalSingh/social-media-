import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AnalyticsWorkspaceView: React.FC = () => {
  const { selectedNarrative } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'sentiment' | 'audience' | 'narrative' | 'network'>('summary');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Analytics Workspace</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Unified multi-dimensional investigation workbench.
        </p>
      </div>

      {/* COMPACT PICKERS BAR */}
      <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex flex-wrap items-center gap-4 text-xs">
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Target Narrative
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="#CoastalSafety">#CoastalSafety</option>
            <option value="#CleanOcean">#CleanOcean</option>
            <option value="Port Infrastructure">Port Infrastructure</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Date Range
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Platform Scope
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="All">All 3 Platforms</option>
            <option value="Platform A">Platform A Only</option>
          </select>
        </div>
      </div>

      {/* WORKSPACE TABS */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-xs overflow-hidden">
        <div className="flex border-b border-[#E1E7EF] bg-[#F6F8FB] text-xs">
          {(['summary', 'sentiment', 'audience', 'narrative', 'network'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#1678A8] text-[#1678A8] bg-white'
                  : 'border-transparent text-[#667085] hover:text-[#172033]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#172033]">
                Investigation Summary: {selectedNarrative.title}
              </h3>
              <p className="text-[#667085] leading-relaxed">
                Comprehensive synthesis of multi-source intelligence collected across platforms.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Mentions Volume</span>
                  <span className="text-lg font-bold text-[#172033]">
                    {selectedNarrative.mentions.toLocaleString()}
                  </span>
                </div>
                <div className="p-4 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Dominant Sentiment</span>
                  <span className="text-lg font-bold text-[#E96368]">61% Negative</span>
                </div>
                <div className="p-4 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Top Hub Account</span>
                  <span className="text-lg font-bold text-[#1678A8]">@coastwatch</span>
                </div>
                <div className="p-4 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Origin Cluster</span>
                  <span className="text-lg font-bold text-[#6D70D8]">Cluster C1</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#172033]">Sentiment Model Context</h3>
              <p className="text-[#667085]">
                Negative sentiment: 61%, Neutral: 22%, Positive: 17%. Spike detected at 12:30 UTC (+14% shift).
              </p>
            </div>
          )}

          {activeTab === 'audience' && (
            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#172033]">Audience Profile Context</h3>
              <p className="text-[#667085]">
                48% English, 27% Hindi, 12% Marathi. Highest concentration in Maharashtra (18%).
              </p>
            </div>
          )}

          {activeTab === 'narrative' && (
            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#172033]">Narrative Trajectory Context</h3>
              <p className="text-[#667085]">
                Velocity accelerating (+43% growth). Top hashtags: #CoastalSafety, #CleanOcean.
              </p>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#172033]">Network Topology Context</h3>
              <p className="text-[#667085]">
                5 connected communities. Key propagation path: @coastwatch → @marine_updates → Cluster C2.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
