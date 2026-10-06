import { useEffect, useState } from 'react';
import { CalendarDays, FileText, Radio, Send, UserCheck, Users } from 'lucide-react';

// =---------------- OVERVIEW PAGE ----------------=
export default function OverviewPage({ setActiveTab }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 520);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto" aria-label="Loading overview" aria-busy="true">
        <div className="space-y-2">
          <div className="skeleton h-7 w-36" />
          <div className="skeleton h-3 w-72 max-w-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton-card bg-white p-4 rounded-xl border border-slate-200/80">
              <div className="skeleton h-3 w-3/4 mb-3" />
              <div className="skeleton h-7 w-12" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="skeleton-card bg-white p-5 rounded-2xl border border-slate-200/80 min-h-40">
              <div className="skeleton h-4 w-40 mb-6" />
              <div className="space-y-3">
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
                <div className="skeleton h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time snapshot across onboarding, mocks, scoring and placement.
        </p>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Students</span>
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Users size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">80</span>
        </div>

        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Mocks...</span>
            <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Radio size={18} /></span>
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-2xl font-black text-slate-900">4</span>
            <span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" /> LIVE
            </span>
          </div>
        </div>

        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mocks Today</span>
            <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><CalendarDays size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">10</span>
        </div>

        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resumes Generated</span>
            <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileText size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">34</span>
        </div>

        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Eligible for Placement</span>
            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCheck size={18} /></span>
          </div>
          <span className="text-2xl font-black text-emerald-700">40</span>
        </div>

        <div className="metric-card bg-white/90 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applications Sent</span>
            <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Send size={18} /></span>
          </div>
          <span className="text-2xl font-black text-slate-900">160</span>
        </div>
      </div>

      {/* Balanced 2-Column Grid Layout (Removes all vertical gaps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column Cards */}
        <div className="space-y-5">
          {/* Interview Performance Chart Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 mb-4">
              Interview Performance chart
            </h2>
            <div className="overview-chart-grid h-44 flex items-end justify-between px-4 pb-2 pt-6 gap-3 rounded-xl" role="img" aria-label="Interview performance across the week, rising from 60 percent Monday to 92 percent Sunday">
              {[
                { day: 'Mon', h: '60%' },
                { day: 'Tue', h: '68%' },
                { day: 'Wed', h: '75%' },
                { day: 'Thu', h: '70%' },
                { day: 'Fri', h: '82%' },
                { day: 'Sat', h: '88%' },
                { day: 'Sun', h: '92%' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className="chart-bar w-full max-w-[36px] rounded-t-md transition-all hover:brightness-110"
                    style={{ height: bar.h }}
                  />
                  <span className="text-[10px] text-slate-400 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Score Distribution */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 mb-4">
              Skill Score Distribution
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Technical</span>
                  <span className="text-slate-800 font-bold">78%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Soft Skills</span>
                  <span className="text-slate-800 font-bold">65%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Behavioral</span>
                  <span className="text-slate-800 font-bold">82%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10b981] rounded-full" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Application Funnel Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 mb-3">Application Funnel</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Applied</span>
                <div className="flex items-center space-x-2 w-36">
                  <div className="h-4 bg-slate-600 rounded-sm w-full" />
                  <span className="font-bold text-slate-800 w-6 text-right">160</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Shortlisted</span>
                <div className="flex items-center space-x-2 w-36">
                  <div className="h-4 bg-slate-500 rounded-sm w-3/4" />
                  <span className="font-bold text-slate-800 w-6 text-right">120</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Interview</span>
                <div className="flex items-center space-x-2 w-36">
                  <div className="h-4 bg-slate-400 rounded-sm w-1/2" />
                  <span className="font-bold text-slate-800 w-6 text-right">72</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Offer</span>
                <div className="flex items-center space-x-2 w-36">
                  <div className="h-4 bg-emerald-500 rounded-sm w-1/4" />
                  <span className="font-bold text-slate-800 w-6 text-right">44</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Cards */}
        <div className="space-y-5">
          {/* Live Mocks Now */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-800">Live Mocks Now</h2>
              <button
                onClick={() => setActiveTab('Live Mocks')}
                className="text-[10px] text-slate-500 font-semibold hover:underline"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  name: 'Arjun Mehta',
                  sub: 'CFA module mock',
                  img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                },
                {
                  name: 'Sara Joshi',
                  sub: 'Finance Modeling Mock',
                  img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                },
                {
                  name: 'Dev Tripathi',
                  sub: 'Power Bi Mock',
                  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <img src={m.img} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">{m.name}</h3>
                      <p className="text-[10px] text-slate-400">{m.sub}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
                    LIVE
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Mock Scheduled */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 mb-3">Upcoming Mock Scheduled</h2>
            <div className="space-y-3">
              {[
                { name: 'Karan Wahi', role: 'Financial Analyst', time: '2:30 PM' },
                { name: 'Rahul Sharma', role: 'Business Analysts', time: '3:00 PM' },
                { name: 'Vinayak Koli', role: 'Finance Equity Research', time: '4:15 PM' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{item.role}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Alerts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <h2 className="text-xs font-bold text-slate-800 mb-3">Actionable Alerts</h2>
            <div className="space-y-3">
              {[
                {
                  name: 'Siya Sen',
                  sub: 'Requires attention',
                  tag: 'Inactive 5 days',
                  tagColor: 'bg-amber-100 text-amber-700',
                  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
                },
                {
                  name: 'Priya Patel',
                  sub: 'Requires attention',
                  tag: 'Resume Missing',
                  tagColor: 'bg-orange-100 text-orange-700',
                  img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
                },
                {
                  name: 'Riya Roy',
                  sub: 'Requires attention',
                  tag: 'Missed Mock',
                  tagColor: 'bg-orange-100 text-orange-700',
                  img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
                },
              ].map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img src={a.img} alt={a.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">{a.name}</h3>
                      <p className="text-[9px] text-slate-400">{a.sub}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${a.tagColor}`}>
                    {a.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dashboard Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Trainer Mentor Load */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 mb-4">Trainer Mentor Load</h2>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600 font-medium">Trainer 1</span>
                <span className="font-bold text-slate-800">8/10</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600 font-medium">Trainer 2</span>
                <span className="font-bold text-slate-800">5/10</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-600 font-medium">Trainer 3</span>
                <span className="font-bold text-slate-800">3/10</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Resume Approval Queue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-800 mb-2">Resume Approval Queue</h2>
            <div className="flex items-baseline space-x-2 my-2">
              <span className="text-2xl font-bold text-slate-900">5</span>
              <span className="text-xs text-slate-500 font-medium">Pending</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('Resume Builder')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-200/60"
          >
            Review Queue
          </button>
        </div>

        {/* Job Portal Sync */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xs font-bold text-slate-800 mb-3">JOB PORTAL SYNC</h2>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Naukri.com</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                synced 2 min ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Found it</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                synced 10 min ago
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Glassdoor</span>
              <span className="text-[10px] text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md font-bold">
                Sync Failed
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Shine</span>
              <span className="text-[10px] text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md font-bold">
                Sync Failed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
