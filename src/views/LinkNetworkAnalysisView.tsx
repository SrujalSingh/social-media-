import React, { useState, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  User,
  GitBranch,
  Network as NetworkIcon,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NETWORK_NODES, NETWORK_EDGES } from '../data/mockData';

export const LinkNetworkAnalysisView: React.FC = () => {
  const {
    selectedNodeId,
    setSelectedNodeId,
    selectedNode,
    setActivePage,
    openPostDetail
  } = useApp();

  const [relationshipFilter, setRelationshipFilter] = useState<string>('All');
  const [communityFilter, setCommunityFilter] = useState<string>('All');
  const [minConnections, setMinConnections] = useState<number>(0);
  const [nodeSearch, setNodeSearch] = useState<string>('');
  const [highlightMode, setHighlightMode] = useState<'all' | 'direct'>('all');

  // Filtered Edges
  const filteredEdges = useMemo(() => {
    return NETWORK_EDGES.filter((e) => {
      if (relationshipFilter !== 'All' && e.relationship !== relationshipFilter) return false;
      return true;
    });
  }, [relationshipFilter]);

  // Filtered Nodes
  const filteredNodes = useMemo(() => {
    return NETWORK_NODES.filter((n) => {
      if (communityFilter !== 'All' && n.communityId !== communityFilter) return false;
      if (n.connections < minConnections) return false;
      if (nodeSearch && !n.handle.toLowerCase().includes(nodeSearch.toLowerCase()) && !n.label.toLowerCase().includes(nodeSearch.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [communityFilter, minConnections, nodeSearch]);

  // Active selected node & neighbors calculation for direct connection view
  const directNeighborIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const neighbors = new Set<string>();
    neighbors.add(selectedNodeId);
    NETWORK_EDGES.forEach((e) => {
      if (e.source === selectedNodeId) neighbors.add(e.target);
      if (e.target === selectedNodeId) neighbors.add(e.source);
    });
    return neighbors;
  }, [selectedNodeId]);

  const secondDegreeNeighborIds = useMemo(() => {
    if (!selectedNodeId || highlightMode !== 'direct') return new Set<string>();
    const secondDegree = new Set<string>();
    directNeighborIds.forEach((firstId) => {
      NETWORK_EDGES.forEach((e) => {
        if (e.source === firstId) secondDegree.add(e.target);
        if (e.target === firstId) secondDegree.add(e.source);
      });
    });
    return secondDegree;
  }, [selectedNodeId, directNeighborIds, highlightMode]);

  const getCommunityColor = (communityId: string) => {
    switch (communityId) {
      case 'C1':
        return '#E96368'; // Student Discussion
      case 'C2':
        return '#1678A8'; // Education News
      case 'C3':
        return '#35A879'; // Fact Checking
      case 'C4':
        return '#E3A33B'; // General Discussion
      case 'C5':
        return '#179B8A'; // Exam Prep
      case 'C6':
        return '#6D70D8'; // Official Info
      default:
        return '#179B8A';
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Link & Network Analysis</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Map account interactions, key influencers, and community structures.
        </p>
      </div>

      {/* TOP NETWORK CONTROLS TOOLBAR */}
      <div className="bg-white p-4 rounded-xl border border-[#E1E7EF] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Narrative Picker */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
                Narrative
              </label>
              <select className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none">
                <option value="#ExamPaperLeak">#ExamPaperLeak</option>
                <option value="#StudentsDemandAnswers">#StudentsDemandAnswers</option>
                <option value="Exam Authority Response">Exam Authority Response</option>
                <option value="Verification & Fact-Checking">Verification & Fact-Checking</option>
              </select>
            </div>

            {/* Relationship Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
                Relationship
              </label>
              <select
                value={relationshipFilter}
                onChange={(e) => setRelationshipFilter(e.target.value)}
                className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none"
              >
                <option value="All">All Relationships</option>
                <option value="Mentions">Mentions</option>
                <option value="Replies">Replies</option>
                <option value="Reposts">Reposts</option>
                <option value="Shared URLs">Shared URLs</option>
              </select>
            </div>

            {/* Community Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
                Community
              </label>
              <select
                value={communityFilter}
                onChange={(e) => setCommunityFilter(e.target.value)}
                className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-2.5 py-1.5 text-xs text-[#172033] focus:outline-none"
              >
                <option value="All">All Communities</option>
                <option value="C1">C1 (Student Discussion)</option>
                <option value="C2">C2 (Education News)</option>
                <option value="C3">C3 (Fact-Checking)</option>
                <option value="C4">C4 (General Discussion)</option>
                <option value="C5">C5 (Exam Preparation)</option>
                <option value="C6">C6 (Official Information)</option>
              </select>
            </div>

            {/* Minimum Connections Slider */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
                Min Connections: {minConnections}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={minConnections}
                onChange={(e) => setMinConnections(Number(e.target.value))}
                className="w-28 h-1.5 bg-[#E1E7EF] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Search Account */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#667085] uppercase mb-1">
                Search Account
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nodeSearch}
                  onChange={(e) => setNodeSearch(e.target.value)}
                  placeholder="e.g. @student_voice"
                  className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg pl-7 pr-2.5 py-1.5 text-xs text-[#172033] focus:outline-none w-36"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setHighlightMode('all');
                setSelectedNodeId(null);
                setCommunityFilter('All');
                setRelationshipFilter('All');
                setMinConnections(0);
                setNodeSearch('');
              }}
              className="px-3 py-1.5 bg-[#F6F8FB] border border-[#E1E7EF] hover:bg-[#E1E7EF] text-[#667085] rounded-lg text-xs font-semibold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN NETWORK SCREEN: 75% GRAPH CANVAS, 25% ANALYSIS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRAPH CANVAS (75%) */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] p-4 shadow-xs flex flex-col justify-between relative min-h-[580px] overflow-hidden">
          {/* Top Canvas Legend & Status Overlay */}
          <div className="flex items-center justify-between bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-4 py-2.5 z-10">
            <div className="flex items-center space-x-3 text-xs flex-wrap">
              <span className="font-bold text-[#172033]">Communities Legend:</span>
              <span className="flex items-center space-x-1 text-[#667085]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E96368]" />
                <span>C1 (Student Discussion)</span>
              </span>
              <span className="flex items-center space-x-1 text-[#667085]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1678A8]" />
                <span>C2 (Education News)</span>
              </span>
              <span className="flex items-center space-x-1 text-[#667085]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#35A879]" />
                <span>C3 (Fact-Checking)</span>
              </span>
              <span className="flex items-center space-x-1 text-[#667085]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3A33B]" />
                <span>C4 (General)</span>
              </span>
              <span className="flex items-center space-x-1 text-[#667085]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D70D8]" />
                <span>C6 (Official)</span>
              </span>
            </div>

            {/* Direct Connection Legend if Active */}
            {highlightMode === 'direct' && (
              <div className="flex items-center space-x-3 text-[11px] bg-white px-2.5 py-1 rounded border border-[#E1E7EF]">
                <span className="font-bold text-[#1678A8]">Selected</span>
                <span className="text-[#35A879] font-medium">1st-Degree</span>
                <span className="text-[#6D70D8] font-medium">2nd-Degree</span>
              </div>
            )}
          </div>

          {/* SVG/Canvas Force Interactive Network View */}
          <div className="w-full h-[500px] my-2 relative bg-[#FFFFFF] rounded-lg border border-[#F1F4F8] flex items-center justify-center select-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 950 560">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F6F8FB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Render Network Edges */}
              {filteredEdges.map((edge) => {
                const sourceNode = NETWORK_NODES.find((n) => n.id === edge.source);
                const targetNode = NETWORK_NODES.find((n) => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                const isConnectedToSelected =
                  selectedNodeId &&
                  (edge.source === selectedNodeId || edge.target === selectedNodeId);

                const isDimmed =
                  highlightMode === 'direct' && selectedNodeId && !isConnectedToSelected;

                return (
                  <g key={edge.id}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnectedToSelected ? '#1678A8' : '#CBD5E1'}
                      strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                      strokeOpacity={isDimmed ? 0.15 : isConnectedToSelected ? 0.9 : 0.6}
                      strokeDasharray={edge.relationship === 'Shared URLs' ? '4,4' : 'none'}
                    />
                  </g>
                );
              })}

              {/* Render Network Nodes */}
              {filteredNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isDirect = directNeighborIds.has(node.id);
                const isSecondDegree = secondDegreeNeighborIds.has(node.id);

                const isDimmed =
                  highlightMode === 'direct' &&
                  selectedNodeId &&
                  !isDirect &&
                  !isSecondDegree;

                const communityColor = getCommunityColor(node.communityId);
                const radius = Math.max(14, Math.min(32, node.degree * 0.65));

                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                    style={{ opacity: isDimmed ? 0.2 : 1 }}
                  >
                    {/* Selected Halo / Outer ring */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 8}
                        fill="none"
                        stroke="#1678A8"
                        strokeWidth="3"
                        strokeDasharray="4 2"
                        className="animate-spin-slow"
                      />
                    )}

                    {/* Direct Connection ring */}
                    {highlightMode === 'direct' && isDirect && !isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius + 5}
                        fill="none"
                        stroke="#35A879"
                        strokeWidth="2"
                      />
                    )}

                    {/* Node Body Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill={communityColor}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="shadow-sm"
                    />

                    {/* Node Handle Label */}
                    <text
                      x={node.x}
                      y={node.y ? node.y + radius + 14 : 0}
                      textAnchor="middle"
                      fill="#172033"
                      fontSize={11}
                      fontWeight={isSelected ? 'bold' : '600'}
                    >
                      {node.handle}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#667085] px-2">
            <span>Showing interactive layout (Light cool grey canvas)</span>
            <span>Click node to view account intelligence details</span>
          </div>
        </div>

        {/* ANALYSIS PANEL (25%) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              <div className="border-b border-[#E1E7EF] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#98A2B3] uppercase">
                    Account Detail
                  </span>
                  <h3 className="text-sm font-bold text-[#172033]">{selectedNode.label}</h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#1678A8]">
                  {selectedNode.handle}
                </span>
              </div>

              {/* Attributes Grid */}
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                  <span className="text-[10px] text-[#667085] block">Network Role</span>
                  <span className="font-bold text-[#1678A8] text-xs">
                    {selectedNode.role}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                    <span className="text-[10px] text-[#667085] block">Followers</span>
                    <span className="font-bold text-[#172033]">{selectedNode.followers}</span>
                  </div>
                  <div className="p-2.5 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                    <span className="text-[10px] text-[#667085] block">Connections</span>
                    <span className="font-bold text-[#172033]">
                      {selectedNode.connections.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                    <span className="text-[10px] text-[#667085] block">Community</span>
                    <span className="font-bold text-[#6D70D8]">{selectedNode.communityId}</span>
                  </div>
                  <div className="p-2.5 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                    <span className="text-[10px] text-[#667085] block">Sentiment</span>
                    <span
                      className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${getSentimentBadge(
                        selectedNode.sentiment
                      )}`}
                    >
                      {selectedNode.sentiment}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
                  <span className="text-[10px] text-[#667085] block">Main Narrative</span>
                  <span className="font-bold text-[#1678A8]">{selectedNode.mainNarrative}</span>
                </div>
              </div>

              {/* Functional Actions */}
              <div className="space-y-2 pt-2 border-t border-[#E1E7EF]">
                <p className="text-[10px] font-bold text-[#98A2B3] uppercase">Node Actions</p>

                <button
                  onClick={() => {
                    const post = {
                      id: 'post-1',
                      time: '12:43',
                      timestamp: '2026-09-29 12:43:10',
                      platform: 'Platform A' as const,
                      account: selectedNode.label,
                      handle: selectedNode.handle,
                      avatar: 'SV',
                      followers: selectedNode.followers,
                      postText:
                        'Candidates are asking for an official clarification regarding the circulating document.',
                      engagement: '4.8K',
                      likes: 3420,
                      comments: 890,
                      shares: 490,
                      sentiment: selectedNode.sentiment,
                      sentimentScore: 0.89,
                      narrative: selectedNode.mainNarrative,
                      language: 'English',
                      hashtags: ['#ExamPaperLeak', '#StudentsDemandAnswers'],
                      mentions: ['@exam_newsdesk'],
                      region: 'Delhi NCR',
                      accountAge: '3+ years'
                    };
                    openPostDetail(post);
                  }}
                  className="w-full py-2 px-3 bg-white border border-[#E1E7EF] hover:border-[#1678A8] text-[#172033] font-semibold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#1678A8]" />
                  <span>View Account Posts</span>
                </button>

                <button
                  onClick={() => {
                    setHighlightMode(highlightMode === 'direct' ? 'all' : 'direct');
                  }}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                    highlightMode === 'direct'
                      ? 'bg-[#35A879] text-white'
                      : 'bg-white border border-[#E1E7EF] text-[#172033] hover:border-[#35A879]'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>
                    {highlightMode === 'direct' ? 'Show Full Graph' : 'View Direct Connections'}
                  </span>
                </button>

                <button
                  onClick={() => setActivePage('propagation')}
                  className="w-full py-2 px-3 bg-[#1678A8] hover:bg-[#12628a] text-white font-semibold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Trace Propagation</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-[#667085] space-y-2">
              <NetworkIcon className="w-8 h-8 text-[#98A2B3] mx-auto" />
              <p className="text-xs">Click any node on the canvas to inspect account intelligence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
