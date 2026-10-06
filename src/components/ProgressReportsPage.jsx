import { Award, Mic, ShieldCheck, TrendingUp } from 'lucide-react';

// =---------------- PROGRESS REPORTS PAGE ----------------=
export default function ProgressReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Progress Report</h1>
        <p className="text-xs text-slate-500 mt-1">
          Student Name · Financial Analyst · Generated on 28-09-2026
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="metric-card bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">COURSES COMPLETED</span>
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Award size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">8/20</span>
        </div>

        <div className="metric-card bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MOCKS ATTEMPTED</span>
            <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><Mic size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">4</span>
        </div>

        <div className="metric-card bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AVG INTERVIEW SCORE</span>
            <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><TrendingUp size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">82%</span>
        </div>

        <div className="metric-card bg-white/90 p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ELIGIBILITY STATUS</span>
            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><ShieldCheck size={18} /></span>
          </div>
          <span className="text-base font-bold text-emerald-700 block mt-1">Eligible</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Mock Interview Score Trend */}
        <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 mb-4">Mock Interview Score Trend</h2>
          <div className="overview-chart-grid h-44 flex items-end justify-between px-4 pb-2 pt-6 gap-3 rounded-xl" role="img" aria-label="Mock interview scores rising from 55 percent to 88 percent across six sessions">
            {['55%', '60%', '52%', '70%', '78%'].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="chart-bar chart-bar-muted w-full max-w-[36px] rounded-t-md"
                  style={{ height: h }}
                />
              </div>
            ))}
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="chart-bar w-full max-w-[36px] rounded-t-md" style={{ height: '88%' }} />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">
            Last 6 mock sessions • bars above the line have cleared eligibility
          </p>
        </div>

        {/* Application Funnel & Certificates */}
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h2 className="text-xs font-bold text-slate-800 mb-2">Application Funnel</h2>
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Applied</span>
                <span className="font-bold">160</span>
              </div>
              <div className="flex justify-between">
                <span>Shortlisted</span>
                <span className="font-bold">120</span>
              </div>
              <div className="flex justify-between">
                <span>Interview</span>
                <span className="font-bold">72</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Offer</span>
                <span>44</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              CERTIFICATES & BADGES EARNED
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-amber-500">🏆</span>
                <span className="text-slate-600 font-medium">Completed [Date]</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-500">🏆</span>
                <span className="text-slate-600 font-medium">Completed [Date]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Ai Recommendations</h2>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
          <li>Improve Finance modeling — scored 60% below cohort average in last mock</li>
          <li>Retake ROC analytics quiz before next scheduled mock</li>
        </ul>
      </div>
    </div>
  );
}