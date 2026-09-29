import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  GLOBAL_STATS,
  SENTIMENT_OVER_TIME_DATA,
  SENTIMENT_SHIFT_EVENTS,
  SOCIAL_POSTS
} from '../data/mockData';
import type { SentimentType } from '../types';

export const SentimentAnalysisView: React.FC = () => {
  const { openPostDetail, openNarrativeDetail } = useApp();

  const [selectedNarrativeFilter, setSelectedNarrativeFilter] = useState<string>('All');
  const [selectedSentimentCategory, setSelectedSentimentCategory] = useState<SentimentType | null>(null);

  const filteredShiftEvents = SENTIMENT_SHIFT_EVENTS.filter((e) => {
    if (selectedNarrativeFilter !== 'All' && e.narrative !== selectedNarrativeFilter) return false;
    return true;
  });

  const postsContributing = SOCIAL_POSTS.filter((post) => {
    if (selectedSentimentCategory && post.sentiment !== selectedSentimentCategory) return false;
    if (selectedNarrativeFilter !== 'All' && post.narrative !== selectedNarrativeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Sentiment Analysis</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Track public sentiment and emotional change across narratives and time.
        </p>
      </div>

      {/* TOP FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs flex flex-wrap items-center gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Narrative
          </label>
          <select
            value={selectedNarrativeFilter}
            onChange={(e) => setSelectedNarrativeFilter(e.target.value)}
            className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none focus:border-[#1678A8]"
          >
            <option value="All">All Narratives</option>
            <option value="#ExamPaperLeak">#ExamPaperLeak</option>
            <option value="#StudentsDemandAnswers">#StudentsDemandAnswers</option>
            <option value="Exam Authority Response">Exam Authority Response</option>
            <option value="Verification & Fact-Checking">Verification & Fact-Checking</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Platform
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="All">All Platforms</option>
            <option value="Platform A">Platform A</option>
            <option value="Platform B">Platform B</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Date Range
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="Today">Today (Last 24h)</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
            Language
          </label>
          <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      {/* TOP SMALL SUMMARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() =>
            setSelectedSentimentCategory(
              selectedSentimentCategory === 'Positive' ? null : 'Positive'
            )
          }
          className={`bg-white p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            selectedSentimentCategory === 'Positive'
              ? 'border-[#35A879] ring-2 ring-[#35A879]/20'
              : 'border-[#E1E7EF] hover:border-[#35A879]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">Positive Sentiment</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#35A879]" />
          </div>
          <h3 className="text-2xl font-bold text-[#35A879] mt-1">
            {GLOBAL_STATS.overallSentiment.positive}%
          </h3>
          <p className="text-[11px] text-[#667085] mt-0.5">Click to view positive posts</p>
        </div>

        <div
          onClick={() =>
            setSelectedSentimentCategory(
              selectedSentimentCategory === 'Neutral' ? null : 'Neutral'
            )
          }
          className={`bg-white p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            selectedSentimentCategory === 'Neutral'
              ? 'border-[#75849A] ring-2 ring-[#75849A]/20'
              : 'border-[#E1E7EF] hover:border-[#75849A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">Neutral Sentiment</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#75849A]" />
          </div>
          <h3 className="text-2xl font-bold text-[#75849A] mt-1">
            {GLOBAL_STATS.overallSentiment.neutral}%
          </h3>
          <p className="text-[11px] text-[#667085] mt-0.5">Click to view neutral posts</p>
        </div>

        <div
          onClick={() =>
            setSelectedSentimentCategory(
              selectedSentimentCategory === 'Negative' ? null : 'Negative'
            )
          }
          className={`bg-white p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
            selectedSentimentCategory === 'Negative'
              ? 'border-[#E96368] ring-2 ring-[#E96368]/20'
              : 'border-[#E1E7EF] hover:border-[#E96368]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#667085]">Negative Sentiment</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E96368]" />
          </div>
          <h3 className="text-2xl font-bold text-[#E96368] mt-1">
            {GLOBAL_STATS.overallSentiment.negative}%
          </h3>
          <p className="text-[11px] text-[#E96368] mt-0.5 font-medium flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> Dominant (+12% shift in last 3h)
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT: SENTIMENT OVER TIME CHART (LEFT) & CURRENT SENTIMENT (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* MAIN LEFT: Sentiment Over Time Line/Area Chart */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#172033]">Sentiment Over Time</h3>
              <p className="text-xs text-[#667085]">Hourly sentiment proportions (% distribution)</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center space-x-1.5 text-[#35A879]">
                <span className="w-2.5 h-2.5 rounded bg-[#35A879]" />
                <span>Positive</span>
              </span>
              <span className="flex items-center space-x-1.5 text-[#75849A]">
                <span className="w-2.5 h-2.5 rounded bg-[#75849A]" />
                <span>Neutral</span>
              </span>
              <span className="flex items-center space-x-1.5 text-[#E96368]">
                <span className="w-2.5 h-2.5 rounded bg-[#E96368]" />
                <span>Negative</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SENTIMENT_OVER_TIME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E7EF" vertical={false} />
                <XAxis dataKey="time" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E1E7EF',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="Negative" stroke="#E96368" fill="#FDF0F1" strokeWidth={2} />
                <Area type="monotone" dataKey="Neutral" stroke="#75849A" fill="#F1F4F8" strokeWidth={2} />
                <Area type="monotone" dataKey="Positive" stroke="#35A879" fill="#EBF7F2" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Current Sentiment & Dominant Indicator */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Current Sentiment</h3>
            <p className="text-xs text-[#667085] mb-4">Latest aggregated baseline</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#E96368]">Negative</span>
                  <span className="text-[#172033]">61%</span>
                </div>
                <div className="w-full bg-[#F6F8FB] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E96368] h-full" style={{ width: '61%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#75849A]">Neutral</span>
                  <span className="text-[#172033]">22%</span>
                </div>
                <div className="w-full bg-[#F6F8FB] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#75849A] h-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#35A879]">Positive</span>
                  <span className="text-[#172033]">17%</span>
                </div>
                <div className="w-full bg-[#F6F8FB] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#35A879] h-full" style={{ width: '17%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-[#FDF0F1] border border-[#F8C3C5] rounded-lg">
            <div className="flex items-center space-x-2 text-[#E96368]">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Dominant Signal</span>
            </div>
            <p className="text-xs font-bold text-[#172033] mt-1">Dominant: Negative</p>
            <p className="text-[11px] text-[#667085] mt-0.5">
              Negative sentiment increased by 12% in the last 3 hours, mainly driven by uncertainty, frustration and demands for clarification.
            </p>
          </div>
        </div>
      </div>

      {/* MAJOR SENTIMENT CHANGES TABLE */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E7EF] flex items-center justify-between bg-[#F6F8FB]">
          <div>
            <h3 className="text-sm font-bold text-[#172033]">Major Sentiment Changes</h3>
            <p className="text-xs text-[#667085]">
              Detected statistical shifts exceeding threshold values
            </p>
          </div>
          <span className="text-[11px] text-[#667085]">Click row to open relevant posts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Time</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Narrative</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Previous</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Current</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Change</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E7EF]">
              {filteredShiftEvents.map((evt) => (
                <tr
                  key={evt.id}
                  onClick={() => openNarrativeDetail(evt.narrative)}
                  className="hover:bg-[#F6F8FB] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 text-[#667085] font-mono">{evt.time}</td>
                  <td className="py-3 px-3 font-bold text-[#1678A8]">{evt.narrative}</td>
                  <td className="py-3 px-3 text-[#667085]">{evt.previous}</td>
                  <td className="py-3 px-3 font-semibold text-[#E96368]">{evt.current}</td>
                  <td className="py-3 px-3 font-bold text-[#E96368]">{evt.change}</td>
                  <td className="py-3 px-3 font-medium text-[#172033]">
                    {evt.postsCount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERACTIVE SENTIMENT POSTS LIST */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E7EF] flex items-center justify-between bg-[#F6F8FB]">
          <div>
            <h3 className="text-sm font-bold text-[#172033]">
              {selectedSentimentCategory
                ? `Posts Contributing to ${selectedSentimentCategory} Sentiment`
                : 'Posts Contributing to Sentiment Model'}
            </h3>
            <p className="text-xs text-[#667085]">
              {selectedSentimentCategory
                ? `Filtered for ${selectedSentimentCategory.toLowerCase()} sentiment class`
                : 'Click any sentiment summary box above to filter specific post contributions'}
            </p>
          </div>
          {selectedSentimentCategory && (
            <button
              onClick={() => setSelectedSentimentCategory(null)}
              className="text-xs text-[#1678A8] hover:underline font-medium"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Account</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085] w-2/5">Post</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Engagement</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Narrative</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Confidence</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E7EF]">
              {postsContributing.map((post) => (
                <tr key={post.id} className="hover:bg-[#F6F8FB] transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#1678A8] block">{post.handle}</span>
                    <span className="text-[10px] text-[#98A2B3]">{post.platform}</span>
                  </td>
                  <td className="py-3 px-3 text-[#172033] leading-relaxed">
                    "{post.postText}"
                  </td>
                  <td className="py-3 px-3 font-medium text-[#172033]">{post.engagement}</td>
                  <td className="py-3 px-3 text-[#1678A8] font-medium">{post.narrative}</td>
                  <td className="py-3 px-3 font-mono text-[#179B8A] font-semibold">
                    {Math.round(post.sentimentScore * 100)}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => openPostDetail(post)}
                      className="px-2.5 py-1 bg-[#1678A8] hover:bg-[#12628a] text-white rounded text-[11px] font-semibold transition-colors cursor-pointer"
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
    </div>
  );
};
