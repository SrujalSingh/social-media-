import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Search, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NARRATIVES_DATA, SOCIAL_POSTS } from '../data/mockData';

export const TrendingNarrativesView: React.FC = () => {
  const { selectedNarrative, setSelectedNarrativeId, openPostDetail } = useApp();
  const [narrativeSearch, setNarrativeSearch] = useState<string>('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

  const filteredNarratives = NARRATIVES_DATA.filter((n) =>
    n.title.toLowerCase().includes(narrativeSearch.toLowerCase())
  );

  const subtopicPosts = SOCIAL_POSTS.filter(
    (p) => p.narrative === selectedNarrative.title
  );

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

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
          Trending Narrative Intelligence
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Detect emerging topics and understand how online discussions evolve.
        </p>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT 35% LIST, RIGHT 65% DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 35%: Detected Narratives List */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E1E7EF] p-4 shadow-xs space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#172033]">Detected Narratives</h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={narrativeSearch}
                onChange={(e) => setNarrativeSearch(e.target.value)}
                placeholder="Search Narrative..."
                className="w-full bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#172033] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredNarratives.map((nar) => {
              const isSelected = nar.id === selectedNarrative.id;
              return (
                <div
                  key={nar.id}
                  onClick={() => {
                    setSelectedNarrativeId(nar.id);
                    setSelectedSubtopic(null);
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#1678A8] bg-[#E8F4F9] shadow-xs'
                      : 'border-[#E1E7EF] bg-white hover:border-[#1678A8] hover:bg-[#F6F8FB]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#1678A8]' : 'text-[#172033]'
                      }`}
                    >
                      {nar.title}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusBadge(
                        nar.status
                      )}`}
                    >
                      {nar.status}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#667085]">
                    <span>{nar.mentions.toLocaleString()} mentions</span>
                    <span
                      className={`font-semibold ${
                        nar.growthValue > 0 ? 'text-[#E3A33B]' : 'text-[#667085]'
                      }`}
                    >
                      {nar.growth}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 65%: Selected Narrative Detail Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {/* Narrative Summary Header Panel */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs space-y-5">
            <div className="flex items-start justify-between border-b border-[#E1E7EF] pb-4">
              <div>
                <span className="text-[11px] font-semibold text-[#98A2B3] tracking-wider uppercase">
                  Selected Narrative Intelligence
                </span>
                <h2 className="text-xl font-bold text-[#1678A8] mt-0.5">
                  {selectedNarrative.title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF6EB] text-[#E3A33B] border border-[#FCDCA7]">
                Rapidly Rising
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                <span className="text-[10px] text-[#667085] block">Mentions</span>
                <span className="text-sm font-bold text-[#172033]">
                  {selectedNarrative.mentions.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                <span className="text-[10px] text-[#667085] block">Unique Accounts</span>
                <span className="text-sm font-bold text-[#172033]">
                  {selectedNarrative.uniqueAccounts.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                <span className="text-[10px] text-[#667085] block">Growth Velocity</span>
                <span className="text-sm font-bold text-[#E3A33B]">
                  {selectedNarrative.growth}
                </span>
              </div>
              <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                <span className="text-[10px] text-[#667085] block">Sentiment</span>
                <span className="text-sm font-bold text-[#E96368]">
                  {selectedNarrative.sentimentBreakdown.negative}% Neg
                </span>
              </div>
              <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                <span className="text-[10px] text-[#667085] block">First Detected</span>
                <span className="text-sm font-bold text-[#172033] font-mono">
                  {selectedNarrative.firstDetected}
                </span>
              </div>
            </div>

            {/* Narrative AI Summary */}
            <div className="p-4 bg-[#E8F4F9] border border-[#B5E0F2] rounded-lg">
              <div className="flex items-center space-x-2 text-[#1678A8] mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Narrative Analytical Summary
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#172033]">
                "{selectedNarrative.summary}"
              </p>
              <span className="text-[10px] text-[#98A2B3] mt-2 block font-medium">
                AI-generated analytical summary
              </span>
            </div>
          </div>

          {/* NARRATIVE TIMELINE GRAPH */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#172033]">Narrative Timeline</h3>
                <p className="text-xs text-[#667085]">Hourly mention trajectory volume</p>
              </div>
              <span className="text-xs font-semibold text-[#E3A33B] bg-[#FEF6EB] px-2.5 py-1 rounded border border-[#FCDCA7] flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1" />
                Trend acceleration detected
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedNarrative.hourlyTrend}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E1E7EF" vertical={false} />
                  <XAxis dataKey="time" stroke="#667085" fontSize={11} tickLine={false} />
                  <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E1E7EF',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mentions"
                    stroke="#1678A8"
                    strokeWidth={2.5}
                    dot={{ fill: '#1678A8', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KEYWORDS & TOP HASHTAGS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Keywords Tags */}
            <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[#172033] mb-3">Top Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {selectedNarrative.topKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 bg-[#F6F8FB] border border-[#E1E7EF] text-[#172033] rounded-md text-xs font-medium hover:border-[#1678A8] transition-colors"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Hashtags Table */}
            <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs">
              <h3 className="text-sm font-bold text-[#172033] mb-3">Top Hashtags</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                      <th className="py-2 px-2 font-semibold text-[#667085]">Hashtag</th>
                      <th className="py-2 px-2 font-semibold text-[#667085]">Mentions</th>
                      <th className="py-2 px-2 font-semibold text-[#667085]">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E7EF]">
                    {selectedNarrative.topHashtags.map((ht) => (
                      <tr key={ht.tag} className="hover:bg-[#F6F8FB]">
                        <td className="py-2 px-2 font-bold text-[#1678A8]">{ht.tag}</td>
                        <td className="py-2 px-2 font-mono text-[#172033]">
                          {ht.mentions.toLocaleString()}
                        </td>
                        <td className="py-2 px-2 font-semibold text-[#E3A33B]">{ht.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SUBTOPICS BREAKDOWN */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#172033]">Narrative Subtopics</h3>
              <p className="text-xs text-[#667085]">
                Fine-grained sub-themes identified within narrative corpus. Click subtopic to filter posts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {selectedNarrative.subtopics.map((sub) => {
                const isSubSelected = selectedSubtopic === sub.name;
                return (
                  <div
                    key={sub.name}
                    onClick={() =>
                      setSelectedSubtopic(isSubSelected ? null : sub.name)
                    }
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSubSelected
                        ? 'border-[#1678A8] bg-[#E8F4F9]'
                        : 'border-[#E1E7EF] bg-[#F6F8FB] hover:border-[#1678A8]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#172033] block">{sub.name}</span>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="font-mono text-[#1678A8] font-bold">
                        {sub.percentage}%
                      </span>
                      <span className="text-[11px] text-[#667085]">
                        {sub.mentions.toLocaleString()} posts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filtered Posts List under Subtopic */}
            {selectedSubtopic && (
              <div className="pt-4 border-t border-[#E1E7EF] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#172033]">
                    Posts under subtopic: "{selectedSubtopic}"
                  </span>
                  <button
                    onClick={() => setSelectedSubtopic(null)}
                    className="text-[#1678A8] hover:underline"
                  >
                    Clear filter
                  </button>
                </div>

                <div className="space-y-2">
                  {subtopicPosts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => openPostDetail(p)}
                      className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg hover:border-[#1678A8] cursor-pointer flex justify-between items-start text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#1678A8]">{p.handle}</span>
                        <p className="text-[#172033] mt-1">"{p.postText}"</p>
                      </div>
                      <span className="text-[10px] text-[#667085] ml-4 flex-shrink-0">
                        {p.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
