import React, { useState } from 'react';
import { Network, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NETWORK_COMMUNITIES } from '../data/mockData';
import type { NetworkCommunity } from '../types';

export const NetworkCommunitiesView: React.FC = () => {
  const { setSelectedClusterId, openNetworkContext, setActivePage } = useApp();
  const [selectedCommunity, setSelectedCommunity] = useState<NetworkCommunity>(
    NETWORK_COMMUNITIES[0]
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Network Communities</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Identify modular account clusters, inter-community bridges, and topic affinities.
        </p>
      </div>

      {/* COMMUNITY MAP CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {NETWORK_COMMUNITIES.map((comm) => {
          const isSelected = comm.id === selectedCommunity.id;
          return (
            <div
              key={comm.id}
              onClick={() => setSelectedCommunity(comm)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                isSelected
                  ? 'border-[#1678A8] bg-[#E8F4F9] ring-2 ring-[#1678A8]/20'
                  : 'border-[#E1E7EF] bg-white hover:border-[#1678A8] hover:bg-[#F6F8FB]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#1678A8]">{comm.id}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: comm.color }}
                />
              </div>

              <h4 className="text-xs font-bold text-[#172033] line-clamp-1">{comm.name}</h4>

              <div className="mt-3 pt-3 border-t border-[#E1E7EF] space-y-1 text-xs">
                <div className="flex justify-between text-[#667085]">
                  <span>Accounts:</span>
                  <span className="font-bold text-[#172033]">
                    {comm.accountsCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#667085]">
                  <span>Primary:</span>
                  <span className="font-medium text-[#1678A8] truncate max-w-[90px]">
                    {comm.primaryNarrative}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN COMMUNITY DETAILED PANEL */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-[#E1E7EF] pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
              style={{ backgroundColor: selectedCommunity.color }}
            >
              {selectedCommunity.id}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#172033]">{selectedCommunity.name}</h2>
              <p className="text-xs text-[#667085]">
                Internal Connections: {selectedCommunity.internalConnections.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedClusterId(selectedCommunity.id);
              setActivePage('network');
            }}
            className="px-4 py-2 bg-[#1678A8] hover:bg-[#12628a] text-white rounded-lg text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Network className="w-4 h-4" />
            <span>Open Link Analysis for {selectedCommunity.id}</span>
          </button>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Column 1: Core Specs */}
          <div className="space-y-4 bg-[#F6F8FB] p-4 rounded-xl border border-[#E1E7EF]">
            <h4 className="font-bold text-[#172033] uppercase text-[11px] tracking-wider">
              Community Attributes
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#667085]">Total Accounts:</span>
                <span className="font-bold text-[#172033]">
                  {selectedCommunity.accountsCount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Internal Density:</span>
                <span className="font-mono text-[#1678A8] font-bold">High (34.2K links)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Primary Narrative:</span>
                <span className="font-bold text-[#1678A8]">
                  {selectedCommunity.primaryNarrative}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[#667085] block mb-1">Top Hashtags:</span>
              <div className="flex flex-wrap gap-1">
                {selectedCommunity.topHashtags.map((h) => (
                  <span
                    key={h}
                    className="px-2 py-0.5 bg-white border border-[#E1E7EF] rounded text-[#1678A8] font-semibold text-[11px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Key Influential Accounts */}
          <div className="space-y-4 bg-[#F6F8FB] p-4 rounded-xl border border-[#E1E7EF]">
            <h4 className="font-bold text-[#172033] uppercase text-[11px] tracking-wider">
              Hub Accounts in {selectedCommunity.id}
            </h4>

            <div className="space-y-2">
              {selectedCommunity.topAccounts.map((acc) => (
                <div
                  key={acc}
                  onClick={() => openNetworkContext(acc)}
                  className="flex items-center justify-between p-2 bg-white rounded border border-[#E1E7EF] hover:border-[#1678A8] cursor-pointer"
                >
                  <span className="font-bold text-[#1678A8]">{acc}</span>
                  <span className="text-[10px] text-[#667085] flex items-center">
                    Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Cross-Community Links */}
          <div className="space-y-4 bg-[#F6F8FB] p-4 rounded-xl border border-[#E1E7EF]">
            <h4 className="font-bold text-[#172033] uppercase text-[11px] tracking-wider">
              Cross-Community Links
            </h4>

            <div className="space-y-2">
              {selectedCommunity.crossCommunityLinks.map((link) => (
                <div
                  key={link.targetCommunity}
                  className="flex items-center justify-between p-2 bg-white rounded border border-[#E1E7EF]"
                >
                  <span className="text-[#172033] font-medium">{link.targetCommunity}</span>
                  <span className="font-mono text-[#179B8A] font-bold">
                    {link.connectionsCount.toLocaleString()} links
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
