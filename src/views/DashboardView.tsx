import React from 'react';
import {
  FileText,
  TrendingUp,
  Users,
  Network,
  ArrowUpRight,
  Zap,
  Clock,
  ChevronRight,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GLOBAL_STATS, NARRATIVES_DATA, INTELLIGENCE_SIGNALS, RECENT_ACTIVITIES } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const { openNarrativeDetail, setActivePage } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Rising':
        return 'badge-rising';
      case 'Emerging':
        return 'badge-emerging';
      case 'Stable':
        return 'badge-stable';
      case 'Declining':
        return 'badge-declining';
      default:
        return 'badge-neutral';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'badge-positive';
      case 'Negative':
        return 'badge-negative';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
          Social Media Intelligence Overview
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Real-time sentiment, narrative and network intelligence
        </p>
      </div>

      {/* TOP 4 COMPACT STATISTICS (NO CHARTS INSIDE CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#667085]">Posts Analysed</p>
            <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
              {GLOBAL_STATS.postsAnalysed}
            </h3>
            <p className="text-[11px] text-[#35A879] mt-0.5 flex items-center font-medium">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +14.2% from last cycle
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#E8F4F9] text-[#1678A8] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#667085]">Active Narratives</p>
            <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
              {GLOBAL_STATS.activeNarratives}
            </h3>
            <p className="text-[11px] text-[#E3A33B] mt-0.5 flex items-center font-medium">
              <Zap className="w-3 h-3 mr-0.5" /> 2 rapidly escalating
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FEF6EB] text-[#E3A33B] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#667085]">Accounts Analysed</p>
            <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
              {GLOBAL_STATS.accountsAnalysed}
            </h3>
            <p className="text-[11px] text-[#667085] mt-0.5 font-medium">
              Across 3 platforms
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#EAF5F3] text-[#179B8A] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#667085]">Network Communities</p>
            <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
              {GLOBAL_STATS.networkCommunities}
            </h3>
            <p className="text-[11px] text-[#6D70D8] mt-0.5 font-medium">
              5 major clusters identified
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#F2EEFB] text-[#6D70D8] flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT GRID (65% LEFT, 35% RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 65%: Trending Narratives Operational Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#172033]">Trending Narratives</h3>
                <p className="text-xs text-[#667085]">
                  Detected online narrative trajectories ordered by velocity
                </p>
              </div>
              <button
                onClick={() => setActivePage('narratives')}
                className="text-xs font-semibold text-[#1678A8] hover:underline flex items-center space-x-1"
              >
                <span>View all narratives</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">Narrative</th>
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">Mentions</th>
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">Growth</th>
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">Sentiment</th>
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">First Detected</th>
                    <th className="py-2.5 px-3 font-semibold text-[#667085]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E7EF]">
                  {NARRATIVES_DATA.slice(0, 4).map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => openNarrativeDetail(item.id)}
                      className="hover:bg-[#F6F8FB] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3 font-bold text-[#1678A8] hover:underline">
                        {item.title}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#172033]">
                        {item.mentions.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-semibold">
                        <span
                          className={
                            item.growthValue > 0
                              ? 'text-[#E3A33B]'
                              : item.growthValue < 0
                              ? 'text-[#667085]'
                              : 'text-[#1678A8]'
                          }
                        >
                          {item.growth}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getSentimentBadge(
                            item.sentiment
                          )}`}
                        >
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#667085] font-mono">{item.firstDetected}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT 35%: Live Intelligence Signals */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#1678A8]" />
                <h3 className="text-base font-bold text-[#172033]">Live Intelligence Signals</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#35A879] animate-pulse" />
            </div>

            <div className="space-y-3">
              {INTELLIGENCE_SIGNALS.map((sig) => (
                <div
                  key={sig.id}
                  className="p-3 rounded-lg border border-[#E1E7EF] bg-[#F6F8FB] hover:border-[#1678A8] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#172033] flex items-center space-x-1.5">
                      {sig.severity === 'critical' && (
                        <span className="w-2 h-2 rounded-full bg-[#E96368]" />
                      )}
                      {sig.severity === 'warning' && (
                        <span className="w-2 h-2 rounded-full bg-[#E3A33B]" />
                      )}
                      {sig.severity === 'info' && (
                        <span className="w-2 h-2 rounded-full bg-[#1678A8]" />
                      )}
                      <span>{sig.title}</span>
                    </span>
                    <span className="text-[10px] text-[#98A2B3] font-mono">{sig.time}</span>
                  </div>
                  <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                    {sig.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BELOW DASHBOARD: SENTIMENT OVERVIEW & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sentiment Overview Horizontal Bar */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-[#172033]">Sentiment Overview</h3>
              <p className="text-xs text-[#667085]">
                Aggregate emotional distribution across all collected posts
              </p>
            </div>
            <button
              onClick={() => setActivePage('sentiment')}
              className="text-xs font-semibold text-[#1678A8] hover:underline"
            >
              Analyze breakdown
            </button>
          </div>

          {/* Compact Horizontal Bar */}
          <div className="space-y-3 mt-4">
            <div className="w-full h-5 rounded-lg overflow-hidden flex text-xs font-bold text-white shadow-inner">
              <div
                className="bg-[#35A879] flex items-center justify-center transition-all"
                style={{ width: `${GLOBAL_STATS.overallSentiment.positive}%` }}
              >
                24%
              </div>
              <div
                className="bg-[#75849A] flex items-center justify-center transition-all"
                style={{ width: `${GLOBAL_STATS.overallSentiment.neutral}%` }}
              >
                31%
              </div>
              <div
                className="bg-[#E96368] flex items-center justify-center transition-all"
                style={{ width: `${GLOBAL_STATS.overallSentiment.negative}%` }}
              >
                45%
              </div>
            </div>

            <div className="flex items-center justify-around pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-[#35A879]" />
                <span className="text-[#667085]">Positive:</span>
                <span className="font-bold text-[#172033]">
                  {GLOBAL_STATS.overallSentiment.positive}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-[#75849A]" />
                <span className="text-[#667085]">Neutral:</span>
                <span className="font-bold text-[#172033]">
                  {GLOBAL_STATS.overallSentiment.neutral}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-[#E96368]" />
                <span className="text-[#667085]">Negative:</span>
                <span className="font-bold text-[#172033]">
                  {GLOBAL_STATS.overallSentiment.negative}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs">
          <div className="mb-3">
            <h3 className="text-base font-bold text-[#172033]">Recent Activity</h3>
            <p className="text-xs text-[#667085]">Automated pipeline execution timestamps</p>
          </div>

          <div className="divide-y divide-[#E1E7EF]">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#98A2B3]" />
                  <span className="font-medium text-[#172033]">{act.action}</span>
                </div>
                <span className="text-[11px] text-[#667085] font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
