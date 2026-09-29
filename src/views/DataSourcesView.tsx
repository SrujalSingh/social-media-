import React from 'react';

export const DataSourcesView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Data Sources</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Manage connected social media APIs, streaming feeds, and offline dataset ingest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#172033] text-sm">Platform A Stream</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF7F2] text-[#35A879]">
              Active
            </span>
          </div>
          <p className="text-xs text-[#667085]">Live public feed ingestion stream.</p>
          <div className="pt-2 text-[11px] text-[#98A2B3] flex justify-between border-t border-[#E1E7EF]">
            <span>128,410 posts</span>
            <span>Latency: 12ms</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#172033] text-sm">Platform B Stream</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF7F2] text-[#35A879]">
              Active
            </span>
          </div>
          <p className="text-xs text-[#667085]">Broadcast channel crawler.</p>
          <div className="pt-2 text-[11px] text-[#98A2B3] flex justify-between border-t border-[#E1E7EF]">
            <span>84,200 posts</span>
            <span>Latency: 28ms</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E1E7EF] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#172033] text-sm">Platform C Stream</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF7F2] text-[#35A879]">
              Active
            </span>
          </div>
          <p className="text-xs text-[#667085]">RSS & Public Web Forum news parser.</p>
          <div className="pt-2 text-[11px] text-[#98A2B3] flex justify-between border-t border-[#E1E7EF]">
            <span>36,002 posts</span>
            <span>Latency: 45ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
