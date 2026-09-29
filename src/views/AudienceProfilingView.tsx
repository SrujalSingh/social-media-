import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { X, Network } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  AUDIENCE_SUMMARY,
  LANGUAGE_DISTRIBUTION,
  GEOGRAPHIC_DISTRIBUTION,
  ACCOUNT_AGE_DATA,
  AUDIENCE_ACTIVITY_HOURLY,
  AUDIENCE_CLUSTERS
} from '../data/mockData';
import type { AudienceCluster } from '../types';

export const AudienceProfilingView: React.FC = () => {
  const { openNetworkContext, setSelectedClusterId } = useApp();
  const [selectedClusterDetail, setSelectedClusterDetail] = useState<AudienceCluster | null>(null);

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
          Audience Demographics & Profiling
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Understand the audience participating in social-media discussions.
        </p>
      </div>

      {/* AUDIENCE SUMMARY ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs">
          <p className="text-xs font-semibold text-[#667085]">Accounts Analysed</p>
          <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
            {AUDIENCE_SUMMARY.accountsAnalysed}
          </h3>
          <p className="text-[11px] text-[#179B8A] mt-0.5 font-medium">Public profiles catalogued</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs">
          <p className="text-xs font-semibold text-[#667085]">Regions</p>
          <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
            {AUDIENCE_SUMMARY.regions}
          </h3>
          <p className="text-[11px] text-[#667085] mt-0.5">Maritime & inland zones</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs">
          <p className="text-xs font-semibold text-[#667085]">Languages</p>
          <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
            {AUDIENCE_SUMMARY.languages}
          </h3>
          <p className="text-[11px] text-[#667085] mt-0.5">Multi-lingual text NLP</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs">
          <p className="text-xs font-semibold text-[#667085]">Major Audience Clusters</p>
          <h3 className="text-2xl font-bold text-[#172033] mt-1 tracking-tight">
            {AUDIENCE_SUMMARY.majorClusters}
          </h3>
          <p className="text-[11px] text-[#6D70D8] mt-0.5 font-medium">Interest-based groupings</p>
        </div>
      </div>

      {/* DEMOGRAPHICS BALANCED TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Language Distribution Horizontal Bars */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[#172033]">Language Distribution</h3>
            <p className="text-xs text-[#667085]">Proportion of detected post languages</p>
          </div>

          <div className="space-y-3">
            {LANGUAGE_DISTRIBUTION.map((item) => (
              <div key={item.language} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#172033]">{item.language}</span>
                  <span className="font-mono text-[#667085]">
                    {item.percentage}% ({item.count.toLocaleString()} accounts)
                  </span>
                </div>
                <div className="w-full bg-[#F6F8FB] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1678A8] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Geographic Distribution Table */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[#172033]">Geographic Distribution</h3>
            <p className="text-xs text-[#667085]">Regional account concentrations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                  <th className="py-2.5 px-3 font-semibold text-[#667085]">Region / State</th>
                  <th className="py-2.5 px-3 font-semibold text-[#667085]">Percentage</th>
                  <th className="py-2.5 px-3 font-semibold text-[#667085]">Estimated Accounts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1E7EF]">
                {GEOGRAPHIC_DISTRIBUTION.map((geo) => (
                  <tr key={geo.region} className="hover:bg-[#F6F8FB]">
                    <td className="py-2.5 px-3 font-semibold text-[#172033]">{geo.region}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-[#F6F8FB] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#179B8A] h-full"
                            style={{ width: `${geo.percentage}%` }}
                          />
                        </div>
                        <span className="font-mono text-[#172033] font-bold">{geo.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[#667085]">
                      {geo.accounts.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ACCOUNT AGE & ACTIVE HOURS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Account Age Distribution */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[#172033]">Account Age Distribution</h3>
            <p className="text-xs text-[#667085]">Age structure of participating handles</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ACCOUNT_AGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E7EF" vertical={false} />
                <XAxis dataKey="group" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E1E7EF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="percentage" fill="#1678A8" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audience Activity Heatmap / Hourly Graph */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#172033]">Audience Activity</h3>
              <p className="text-xs text-[#667085]">24-hour activity pattern</p>
            </div>
            <span className="text-xs font-semibold text-[#1678A8] bg-[#E8F4F9] px-2.5 py-1 rounded">
              Peak: 18:00–22:00
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={AUDIENCE_ACTIVITY_HOURLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E7EF" vertical={false} />
                <XAxis dataKey="hour" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E1E7EF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="activity" stroke="#179B8A" fill="#EAF5F3" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* INTEREST / DISCUSSION CLUSTERS TABLE */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E7EF] flex items-center justify-between bg-[#F6F8FB]">
          <div>
            <h3 className="text-sm font-bold text-[#172033]">Interest / Discussion Clusters</h3>
            <p className="text-xs text-[#667085]">
              Algorithmic grouping of accounts based on topic affinities
            </p>
          </div>
          <span className="text-[11px] text-[#667085]">Click cluster to open detail view</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Cluster</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Accounts</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Main Topics</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Top Narrative</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Average Sentiment</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E7EF]">
              {AUDIENCE_CLUSTERS.map((cls) => (
                <tr
                  key={cls.id}
                  onClick={() => setSelectedClusterDetail(cls)}
                  className="hover:bg-[#F6F8FB] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#1678A8] block">{cls.id}</span>
                    <span className="text-[11px] text-[#172033] font-semibold">{cls.name}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#172033] font-semibold">
                    {cls.accountsCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-[#667085]">
                    {cls.mainTopics.join(', ')}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#1678A8]">{cls.topNarrative}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getSentimentBadge(
                        cls.averageSentiment
                      )}`}
                    >
                      {cls.averageSentiment}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClusterDetail(cls);
                      }}
                      className="px-2.5 py-1 bg-[#F6F8FB] border border-[#E1E7EF] hover:border-[#1678A8] hover:text-[#1678A8] text-[#172033] rounded text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLUSTER DETAIL MODAL / POPUP */}
      {selectedClusterDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4">
          <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-2xl max-w-lg w-full p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#E1E7EF] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#98A2B3] uppercase">
                  Cluster Detail
                </span>
                <h3 className="text-base font-bold text-[#172033]">
                  {selectedClusterDetail.id} — {selectedClusterDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedClusterDetail(null)}
                className="text-[#667085] hover:text-[#172033] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Total Accounts</span>
                  <span className="text-sm font-bold text-[#172033]">
                    {selectedClusterDetail.accountsCount.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
                  <span className="text-[10px] text-[#667085] block">Current Sentiment</span>
                  <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-semibold ${getSentimentBadge(selectedClusterDetail.averageSentiment)}`}>
                    {selectedClusterDetail.averageSentiment}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#172033] mb-1">Top Topics:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClusterDetail.mainTopics.map((t) => (
                    <span key={t} className="px-2 py-1 bg-[#F6F8FB] border border-[#E1E7EF] rounded text-[#172033] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#172033] mb-1">Top Hashtags:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClusterDetail.topHashtags.map((h) => (
                    <span key={h} className="px-2 py-1 bg-[#E8F4F9] text-[#1678A8] rounded font-semibold">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#172033] mb-2">Top Influential Accounts:</h4>
                <div className="space-y-1.5">
                  {selectedClusterDetail.topAccounts.map((acc) => (
                    <div key={acc.handle} className="flex items-center justify-between p-2 bg-[#F6F8FB] rounded border border-[#E1E7EF]">
                      <div>
                        <span className="font-bold text-[#1678A8]">{acc.handle}</span>
                        <span className="text-[11px] text-[#667085] ml-2">{acc.name}</span>
                      </div>
                      <span className="font-mono text-[#667085]">{acc.followers} followers</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E1E7EF] flex justify-end space-x-2">
              <button
                onClick={() => setSelectedClusterDetail(null)}
                className="px-4 py-1.5 bg-[#F6F8FB] text-[#667085] hover:text-[#172033] rounded-lg text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cid = selectedClusterDetail.id;
                  setSelectedClusterDetail(null);
                  setSelectedClusterId(cid);
                  openNetworkContext();
                }}
                className="px-4 py-1.5 bg-[#1678A8] hover:bg-[#12628a] text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5"
              >
                <Network className="w-3.5 h-3.5" />
                <span>View Network</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
