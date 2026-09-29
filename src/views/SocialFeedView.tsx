import React, { useState } from 'react';
import { Search, Filter, RotateCcw, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SOCIAL_POSTS } from '../data/mockData';

export const SocialFeedView: React.FC = () => {
  const { openPostDetail, globalSearch } = useApp();

  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');

  const activeSearch = globalSearch || localSearch;

  const filteredPosts = SOCIAL_POSTS.filter((post) => {
    if (platformFilter !== 'All' && post.platform !== platformFilter) return false;
    if (sentimentFilter !== 'All' && post.sentiment !== sentimentFilter) return false;
    if (languageFilter !== 'All' && post.language !== languageFilter) return false;

    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      const matchAccount = post.account.toLowerCase().includes(q) || post.handle.toLowerCase().includes(q);
      const matchText = post.postText.toLowerCase().includes(q);
      const matchNarrative = post.narrative.toLowerCase().includes(q);
      const matchHashtags = post.hashtags.some((h) => h.toLowerCase().includes(q));
      return matchAccount || matchText || matchNarrative || matchHashtags;
    }

    return true;
  });

  const handleReset = () => {
    setPlatformFilter('All');
    setSentimentFilter('All');
    setLanguageFilter('All');
    setLocalSearch('');
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Social Media Feed</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Explore and filter collected public social-media content.
        </p>
      </div>

      {/* TOP FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Platform Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
              Platform
            </label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none focus:border-[#1678A8]"
            >
              <option value="All">All Platforms</option>
              <option value="Platform A">Platform A</option>
              <option value="Platform B">Platform B</option>
              <option value="Platform C">Platform C</option>
            </select>
          </div>

          {/* Sentiment Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
              Sentiment
            </label>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none focus:border-[#1678A8]"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex flex-col">
            <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
              Language
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none focus:border-[#1678A8]"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>

          {/* Search Posts */}
          <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
              Search Posts or Accounts
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Type keyword, hashtag or @handle..."
                className="w-full bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#172033] focus:outline-none focus:border-[#1678A8]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-end space-x-2 pt-4">
            <button className="bg-[#1678A8] hover:bg-[#12628a] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              <span>Apply Filters</span>
            </button>
            <button
              onClick={handleReset}
              className="bg-[#F6F8FB] border border-[#E1E7EF] hover:bg-[#E1E7EF] text-[#667085] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* OPERATIONAL TABLE */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E7EF] flex items-center justify-between bg-[#F6F8FB]">
          <span className="text-xs font-bold text-[#172033]">
            Collected Social Media Posts ({filteredPosts.length})
          </span>
          <span className="text-[11px] text-[#667085]">
            Showing operational log rows
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E7EF] bg-[#F6F8FB]">
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Time</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Platform</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Account</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085] w-2/5">Post</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Engagement</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Sentiment</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085]">Narrative</th>
                <th className="py-2.5 px-3 font-semibold text-[#667085] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E7EF]">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F6F8FB] transition-colors">
                  <td className="py-3 px-3 text-[#667085] font-mono">{post.time}</td>
                  <td className="py-3 px-3 font-medium text-[#172033]">{post.platform}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#1678A8] block">{post.handle}</span>
                    <span className="text-[10px] text-[#98A2B3] truncate block max-w-[120px]">
                      {post.account}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <p className="line-clamp-2 text-[#172033] leading-relaxed">
                      "{post.postText}"
                    </p>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#172033]">
                    {post.engagement}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getSentimentBadge(
                        post.sentiment
                      )}`}
                    >
                      {post.sentiment}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#1678A8]">
                    {post.narrative}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => openPostDetail(post)}
                      className="px-2.5 py-1 bg-[#1678A8] hover:bg-[#12628a] text-white rounded text-[11px] font-semibold flex items-center space-x-1 mx-auto transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
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
