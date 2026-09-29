import React from 'react';
import { Download, Eye, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { REPORT_PREVIEW_DATA } from '../data/mockData';

export const ReportsView: React.FC = () => {
  const { addToast } = useApp();

  const handleExportPDF = () => {
    addToast('Generating Intelligence Report PDF...', 'Formatting document layout', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
            Social Intelligence Report
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Generate formal intelligence briefing for SIH26152 NTRO sponsorship assessment.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-[#E1E7EF] hover:border-[#1678A8] text-[#172033] font-semibold rounded-lg text-xs flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#1678A8]" />
            <span>Preview Report</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#1678A8] hover:bg-[#12628a] text-white font-semibold rounded-lg text-xs flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* REPORT DOCUMENT CONTAINER */}
      <div className="bg-white rounded-xl border border-[#E1E7EF] p-8 shadow-xs space-y-8 max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="border-b border-[#E1E7EF] pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#1678A8] mb-1">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider uppercase">
                National Technical Research Organisation (NTRO)
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#172033]">
              {REPORT_PREVIEW_DATA.reportTitle}
            </h2>
            <p className="text-xs text-[#667085] mt-1">
              Document ID: <strong className="font-mono text-[#172033]">{REPORT_PREVIEW_DATA.reportId}</strong>
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="inline-block px-2.5 py-1 bg-[#FEF6EB] text-[#E3A33B] border border-[#FCDCA7] font-bold rounded">
              {REPORT_PREVIEW_DATA.classification}
            </span>
            <p className="text-[11px] text-[#667085] mt-2">
              Generated: {REPORT_PREVIEW_DATA.dateGenerated}
            </p>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            1. Executive Summary
          </h3>
          <p className="text-xs leading-relaxed text-[#172033] bg-[#F6F8FB] p-4 rounded-lg border border-[#E1E7EF]">
            {REPORT_PREVIEW_DATA.executiveSummary}
          </p>
        </div>

        {/* Section 2: Dataset Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            2. Dataset Overview
          </h3>
          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
              <span className="text-[10px] text-[#667085] block">Total Posts</span>
              <span className="font-bold text-[#172033]">248,612</span>
            </div>
            <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
              <span className="text-[10px] text-[#667085] block">Accounts</span>
              <span className="font-bold text-[#172033]">61,483</span>
            </div>
            <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
              <span className="text-[10px] text-[#667085] block">Platforms</span>
              <span className="font-bold text-[#172033]">3</span>
            </div>
            <div className="p-3 bg-[#F6F8FB] border border-[#E1E7EF] rounded-lg">
              <span className="text-[10px] text-[#667085] block">Target Narrative</span>
              <span className="font-bold text-[#1678A8]">#ExamPaperLeak</span>
            </div>
          </div>
        </div>

        {/* Section 3: Sentiment Analysis */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            3. Sentiment Analysis
          </h3>
          <p className="text-xs text-[#172033] leading-relaxed">
            Public sentiment breakdown for #ExamPaperLeak: <strong>61% Negative</strong>, 22% Neutral, 17% Positive. A sentiment shift of +13% negative trajectory was recorded at 12:30 UTC driven by uncertainty and demands for official clarification.
          </p>
        </div>

        {/* Section 4: Audience Demographics */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            4. Audience Demographics
          </h3>
          <p className="text-xs text-[#172033] leading-relaxed">
            Dominant language: English (41%), followed by Hindi (32%) and Marathi (9%). Primary geographical focus: Delhi NCR (14%) and Maharashtra (13%).
          </p>
        </div>

        {/* Section 5: Trending Narratives */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            5. Trending Narratives
          </h3>
          <p className="text-xs text-[#172033] leading-relaxed">
            #ExamPaperLeak is currently the highest velocity narrative (+43% growth, 18,421 mentions). Related topics include #StudentsDemandAnswers (13,870 mentions) and Exam Authority Response (9,441 mentions).
          </p>
        </div>

        {/* Section 6 & 7: Network Communities & Influencers */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            6 & 7. Network Communities & Key Influencers
          </h3>
          <p className="text-xs text-[#172033] leading-relaxed">
            6 distinct communities identified. Student Discussion Cluster C1 (12,841 accounts) is led by high-connectivity hub account <strong>@student_voice</strong> (82.4K followers, 1,284 connections).
          </p>
        </div>

        {/* Section 8: Information Propagation */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            8. Information Propagation
          </h3>
          <p className="text-xs text-[#172033] leading-relaxed">
            Propagation originated at 09:14 UTC from 12 initial accounts, moving through @student_voice to Cluster C2 media bridge @exam_newsdesk, reaching 7,284 accounts by 14:00 UTC.
          </p>
        </div>

        {/* Section 9: Key Analytical Findings */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#1678A8]">
            9. Key Analytical Findings
          </h3>
          <ul className="list-disc pl-5 text-xs text-[#172033] space-y-1">
            {REPORT_PREVIEW_DATA.findings.map((finding, idx) => (
              <li key={idx}>{finding}</li>
            ))}
          </ul>
        </div>

        {/* Section 10: Data Limitations */}
        <div className="space-y-2 pt-4 border-t border-[#E1E7EF]">
          <h3 className="text-sm font-bold text-[#172033] uppercase tracking-wider text-[#98A2B3]">
            10. Data Limitations & Disclaimers
          </h3>
          <p className="text-[11px] text-[#667085] leading-relaxed">
            This report represents automated algorithmic intelligence derived from public social-media streams. Results describe online discussion patterns rather than factual validation of underlying claims.
          </p>
        </div>
      </div>
    </div>
  );
};
