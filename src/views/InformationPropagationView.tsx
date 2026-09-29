import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROPAGATION_STEPS, NETWORK_NODES, NETWORK_EDGES } from '../data/mockData';

export const InformationPropagationView: React.FC = () => {
  const { openAccountDetail } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPropagatorPath] = useState<string | null>('@student_voice');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < PROPAGATION_STEPS.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = PROPAGATION_STEPS[currentStepIndex];

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
          Narrative Propagation Analysis
        </h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Visualize how narrative #ExamPaperLeak spreads from origin accounts through communities over time.
        </p>
      </div>

      {/* MAIN LAYOUT: CANVAS & CONTROLS (75%) vs SUMMARY & PATH (25%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRAPH CANVAS & ANIMATION TIMELINE (75%) */}
        <div className="lg:col-span-9 bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs flex flex-col justify-between min-h-[580px] relative overflow-hidden">
          {/* Top Info Banner */}
          <div className="flex items-center justify-between bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg px-4 py-2.5 z-10">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#172033]">Target Narrative:</span>
              <span className="text-xs font-bold text-[#1678A8] bg-[#E8F4F9] px-2 py-0.5 rounded">
                #ExamPaperLeak
              </span>
            </div>
            <div className="text-xs text-[#667085]">
              Active Timeframe: <strong className="text-[#172033] font-mono">{activeStep.time} UTC</strong>
            </div>
          </div>

          {/* Light Network Canvas */}
          <div className="w-full h-[460px] my-3 relative bg-[#FFFFFF] rounded-lg border border-[#F1F4F8] overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 950 500">
              <defs>
                <pattern id="propGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F6F8FB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#propGrid)" />

              {/* Render Network Edges */}
              {NETWORK_EDGES.map((edge) => {
                const sourceNode = NETWORK_NODES.find((n) => n.id === edge.source);
                const targetNode = NETWORK_NODES.find((n) => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                const isSourceActive = activeStep.activeNodeIds.includes(edge.source);
                const isTargetActive = activeStep.activeNodeIds.includes(edge.target);
                const isEdgeActive = isSourceActive && isTargetActive;

                const isPathHighlighted =
                  selectedPropagatorPath === '@student_voice' &&
                  ((edge.source === 'node-1' && edge.target === 'node-2') ||
                    (edge.source === 'node-2' && edge.target === 'node-5') ||
                    (edge.source === 'node-5' && edge.target === 'node-7'));

                return (
                  <line
                    key={edge.id}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={
                      isPathHighlighted
                        ? '#E96368'
                        : isEdgeActive
                        ? '#1678A8'
                        : '#CBD5E1'
                    }
                    strokeWidth={isPathHighlighted ? 3.5 : isEdgeActive ? 2 : 1}
                    strokeOpacity={isEdgeActive ? 0.9 : 0.15}
                  />
                );
              })}

              {/* Render Nodes */}
              {NETWORK_NODES.map((node) => {
                const isActive = activeStep.activeNodeIds.includes(node.id);
                const isOrigin = node.id === 'node-4' || node.id === 'node-3';

                return (
                  <g
                    key={node.id}
                    className={`transition-all duration-500 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                    }`}
                  >
                    {/* Origin Pulse */}
                    {isOrigin && isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="32"
                        fill="none"
                        stroke="#E96368"
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isOrigin ? 22 : 16}
                      fill={
                        isOrigin
                          ? '#E96368'
                          : isActive
                          ? '#1678A8'
                          : '#98A2B3'
                      }
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y ? node.y + 30 : 0}
                      textAnchor="middle"
                      fontSize={11}
                      fontWeight={isActive ? 'bold' : 'normal'}
                      fill={isActive ? '#172033' : '#98A2B3'}
                    >
                      {node.handle}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* BOTTOM TIMELINE PLAYER CONTROLS */}
          <div className="bg-[#F6F8FB] border border-[#E1E7EF] rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-lg bg-[#1678A8] hover:bg-[#12628a] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E1E7EF] hover:bg-[#E1E7EF] text-[#667085] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Step Description */}
              <div className="text-xs text-[#172033] font-medium flex-1 mx-4 truncate">
                {activeStep.description}
              </div>

              <span className="text-xs font-mono font-bold text-[#1678A8]">
                {activeStep.cumulativeAccounts.toLocaleString()} accounts reached
              </span>
            </div>

            {/* Timeline Slider Buttons */}
            <div className="grid grid-cols-6 gap-2 pt-1">
              {PROPAGATION_STEPS.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isPassed = idx <= currentStepIndex;
                return (
                  <button
                    key={step.time}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(idx);
                    }}
                    className={`py-1.5 rounded text-xs font-mono font-bold transition-all ${
                      isActive
                        ? 'bg-[#1678A8] text-white shadow-xs'
                        : isPassed
                        ? 'bg-[#E8F4F9] text-[#1678A8] border border-[#B5E0F2]'
                        : 'bg-white border border-[#E1E7EF] text-[#98A2B3]'
                    }`}
                  >
                    {step.time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PROPAGATION SUMMARY & PATH (25%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Propagation Summary Card */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#172033]">Propagation Summary</h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E1E7EF]">
                <span className="text-[#667085]">First Detected:</span>
                <span className="font-mono font-bold text-[#172033]">09:14 UTC</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E1E7EF]">
                <span className="text-[#667085]">Origin Accounts:</span>
                <span className="font-bold text-[#E96368]">12 origin nodes</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E1E7EF]">
                <span className="text-[#667085]">Early Amplifiers:</span>
                <span className="font-bold text-[#172033]">38 accounts</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E1E7EF]">
                <span className="text-[#667085]">Communities Reached:</span>
                <span className="font-bold text-[#6D70D8]">6 communities</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E1E7EF]">
                <span className="text-[#667085]">Accounts Reached:</span>
                <span className="font-bold text-[#1678A8]">7,284 total</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#667085]">Peak Propagation:</span>
                <span className="font-mono font-bold text-[#E3A33B]">12:47 UTC</span>
              </div>
            </div>
          </div>

          {/* Top Propagators List */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#172033]">Top Propagators</h3>

            <div className="space-y-2">
              {['@student_voice', '@exam_newsdesk', '@candidate_forum', '@education_watch'].map((handle) => (
                <div
                  key={handle}
                  onClick={() => openAccountDetail(handle)}
                  className="flex items-center justify-between p-2.5 bg-[#F6F8FB] border border-[#E1E7EF] hover:border-[#1678A8] rounded-lg cursor-pointer text-xs"
                >
                  <span className="font-bold text-[#1678A8]">{handle}</span>
                  <span className="text-[10px] text-[#667085]">Trace</span>
                </div>
              ))}
            </div>
          </div>

          {/* Propagation Path Trace Panel */}
          <div className="bg-white rounded-xl border border-[#E1E7EF] p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#172033]">Propagation Path Trace</h3>

            <div className="p-3 bg-[#E8F4F9] border border-[#B5E0F2] rounded-lg text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#1678A8] block">
                Selected Chain (@student_voice)
              </span>

              <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#172033]">
                <span>@student_voice</span>
                <ArrowRight className="w-3 h-3 text-[#1678A8]" />
                <span>@exam_newsdesk</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#172033]">
                <ArrowRight className="w-3 h-3 text-[#1678A8] ml-3" />
                <span>Cluster C2</span>
                <ArrowRight className="w-3 h-3 text-[#1678A8]" />
                <span>Cluster C3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
