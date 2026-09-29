import React from 'react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#172033] tracking-tight">System Settings</h1>
        <p className="text-xs text-[#667085] mt-0.5">
          Configure analytical thresholds, alert triggers, and classification permissions.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E1E7EF] p-6 shadow-xs space-y-6 max-w-2xl text-xs">
        <div className="space-y-4">
          <h3 className="font-bold text-[#172033] text-sm">Analytical Model Thresholds</h3>

          <div className="flex items-center justify-between p-3 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
            <div>
              <span className="font-semibold text-[#172033] block">Sentiment Shift Sensitivity</span>
              <span className="text-[11px] text-[#667085]">Trigger alert when delta &gt; 10% shift in 1 hour</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded accent-[#1678A8]" />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F6F8FB] rounded-lg border border-[#E1E7EF]">
            <div>
              <span className="font-semibold text-[#172033] block">Narrative Acceleration Alert</span>
              <span className="text-[11px] text-[#667085]">Flag narratives with &gt; 30% velocity growth</span>
            </div>
            <input type="checkbox" defaultChecked className="rounded accent-[#1678A8]" />
          </div>
        </div>
      </div>
    </div>
  );
};
