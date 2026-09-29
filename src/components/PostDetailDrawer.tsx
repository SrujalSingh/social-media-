import React from 'react';
import { X, ThumbsUp, MessageSquare, Share2, Tag, User, TrendingUp, Network } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PostDetailDrawer: React.FC = () => {
  const { selectedPost, setSelectedPost, openAccountDetail, openNarrativeDetail, openNetworkContext } = useApp();

  if (!selectedPost) return null;

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-[1px] animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={() => setSelectedPost(null)} />

      {/* Sliding Drawer */}
      <div className="w-[450px] max-w-full bg-white h-full shadow-2xl border-l border-[#E1E7EF] flex flex-col justify-between overflow-y-auto z-50">
        {/* Drawer Header */}
        <div>
          <div className="p-5 border-b border-[#E1E7EF] flex items-center justify-between bg-[#F6F8FB]">
            <div>
              <span className="text-[11px] font-semibold text-[#98A2B3] tracking-wide uppercase">
                Post Intelligence Detail
              </span>
              <h3 className="text-sm font-bold text-[#172033]">
                Post #{selectedPost.id}
              </h3>
            </div>
            <button
              onClick={() => setSelectedPost(null)}
              className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            {/* Account Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#1678A8] text-white font-bold flex items-center justify-center text-sm">
                  {selectedPost.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#172033]">{selectedPost.account}</h4>
                  <p className="text-xs text-[#667085] font-mono">{selectedPost.handle}</p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#F6F8FB] border border-[#E1E7EF] text-[#667085] font-medium">
                {selectedPost.platform}
              </span>
            </div>

            {/* Post Content */}
            <div className="p-4 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
              <p className="text-xs leading-relaxed text-[#172033] whitespace-pre-line">
                "{selectedPost.postText}"
              </p>
              <div className="mt-3 pt-3 border-t border-[#E1E7EF] flex items-center justify-between text-[11px] text-[#667085]">
                <span>{selectedPost.timestamp}</span>
                <span>Region: {selectedPost.region}</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-[#E1E7EF] rounded-lg flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4 text-[#1678A8]" />
                <div>
                  <p className="text-[10px] text-[#667085]">Likes</p>
                  <p className="text-xs font-bold text-[#172033]">{selectedPost.likes.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-[#E1E7EF] rounded-lg flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#179B8A]" />
                <div>
                  <p className="text-[10px] text-[#667085]">Comments</p>
                  <p className="text-xs font-bold text-[#172033]">{selectedPost.comments.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-3 bg-white border border-[#E1E7EF] rounded-lg flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-[#6D70D8]" />
                <div>
                  <p className="text-[10px] text-[#667085]">Shares</p>
                  <p className="text-xs font-bold text-[#172033]">{selectedPost.shares.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Intelligence Signals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                Analytical Parameters
              </h5>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-[#E1E7EF] rounded-lg">
                  <span className="text-[10px] text-[#667085] block">Detected Sentiment</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${getSentimentBadge(selectedPost.sentiment)}`}>
                    {selectedPost.sentiment} ({Math.round(selectedPost.sentimentScore * 100)}% conf.)
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#E1E7EF] rounded-lg">
                  <span className="text-[10px] text-[#667085] block">Detected Narrative</span>
                  <span className="font-semibold text-[#1678A8] text-xs">
                    {selectedPost.narrative}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata tags */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-[#667085]">
                <Tag className="w-3.5 h-3.5 text-[#98A2B3]" />
                <span className="font-medium text-[11px]">Hashtags:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedPost.hashtags.map((h) => (
                    <span key={h} className="text-[#1678A8] bg-[#E8F4F9] px-1.5 py-0.5 rounded text-[10px] font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[#667085]">
                <User className="w-3.5 h-3.5 text-[#98A2B3]" />
                <span className="font-medium text-[11px]">Mentions:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedPost.mentions.length > 0 ? (
                    selectedPost.mentions.map((m) => (
                      <span key={m} className="text-[#179B8A] bg-[#EAF5F3] px-1.5 py-0.5 rounded text-[10px] font-medium">
                        {m}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-[#98A2B3]">None</span>
                  )}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#667085] flex justify-between">
                <span>Language: <strong className="text-[#172033]">{selectedPost.language}</strong></span>
                <span>Account Age: <strong className="text-[#172033]">{selectedPost.accountAge}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Action Buttons */}
        <div className="p-5 border-t border-[#E1E7EF] bg-[#F6F8FB] space-y-2">
          <p className="text-[10px] uppercase font-bold text-[#98A2B3] tracking-wider mb-2">
            Action Workflows
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                const handle = selectedPost.handle;
                setSelectedPost(null);
                openAccountDetail(handle);
              }}
              className="flex items-center justify-center space-x-1 py-2 px-2 bg-white border border-[#E1E7EF] hover:border-[#1678A8] hover:text-[#1678A8] text-[#172033] rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>View Account</span>
            </button>

            <button
              onClick={() => {
                const nar = selectedPost.narrative;
                setSelectedPost(null);
                openNarrativeDetail(nar);
              }}
              className="flex items-center justify-center space-x-1 py-2 px-2 bg-white border border-[#E1E7EF] hover:border-[#1678A8] hover:text-[#1678A8] text-[#172033] rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>View Narrative</span>
            </button>

            <button
              onClick={() => {
                const handle = selectedPost.handle;
                setSelectedPost(null);
                openNetworkContext(handle);
              }}
              className="flex items-center justify-center space-x-1 py-2 px-2 bg-[#1678A8] hover:bg-[#12628a] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Network Context</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
