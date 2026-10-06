import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  ExternalLink, 
  Globe, 
  Sparkles,
  CheckCircle2,
  Send,
  Pause,
  Play
} from 'lucide-react';

export default function JobPortalPage() {
  const [isPaused, setIsPaused] = useState(false);

  // List of external job portals with real URLs
  const jobPortals = [
    { name: 'Naukri.com', desc: 'India\'s No.1 Job Site', color: 'from-blue-600 to-indigo-700', badge: 'Popular', url: 'https://www.naukri.com' },
    { name: 'Placement India', desc: 'Job Placement & Hiring Portal', color: 'from-sky-500 to-blue-600', badge: 'Placement', url: 'https://www.placementindia.com' },
    { name: 'Instahyre', desc: 'AI-Powered Top Tech Hiring', color: 'from-emerald-500 to-teal-700', badge: 'AI Match', url: 'https://www.instahyre.com' },
    { name: 'iimjobs', desc: 'Management & Finance Jobs', color: 'from-amber-500 to-orange-600', badge: 'Executive', url: 'https://www.iimjobs.com' },
    { name: 'Wellfound', desc: 'Startup Jobs & Investment', color: 'from-rose-500 to-pink-600', badge: 'Startups', url: 'https://wellfound.com' },
    { name: 'JobGreen', desc: 'Freshers & Experienced Roles', color: 'from-green-600 to-emerald-800', badge: 'Verified', url: 'https://www.jobgreen.com' },
    { name: 'TodayWalkins', desc: 'Direct Walk-in Drive Alerts', color: 'from-violet-600 to-purple-700', badge: 'Walk-ins', url: 'https://www.todaywalkins.com' },
  ];

  // Expanded list of job openings with AI auto-apply capability
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Financial Analyst',
      company: 'Deloitte India',
      match: '92% Match',
      location: 'Mumbai, India',
      experience: '0-2 Yrs',
      package: '₹6 - 8 LPA',
      skills: ['Financial Modeling', 'Excel', 'Valuation'],
      applied: false
    },
    {
      id: 2,
      title: 'Risk Advisory Associate',
      company: 'PwC India',
      match: '85% Match',
      location: 'Pune, India',
      experience: '0-1 Yrs',
      package: '₹7 - 9 LPA',
      skills: ['Internal Audit', 'Compliance', 'SAP'],
      applied: false
    },
    {
      id: 3,
      title: 'Equity Research Analyst',
      company: 'HDFC Securities',
      match: '78% Match',
      location: 'Hybrid (Mumbai)',
      experience: '1-3 Yrs',
      package: '₹8 - 11 LPA',
      skills: ['Equity Analysis', 'Bloomberg', 'DCF'],
      applied: false
    },
    {
      id: 4,
      title: 'Investment Banking Associate',
      company: 'Goldman Sachs',
      match: '95% Match',
      location: 'Bengaluru / Pune',
      experience: '2-4 Yrs',
      package: '₹14 - 18 LPA',
      skills: ['M&A', 'Financial Analysis', 'Pitchbooks'],
      applied: false
    },
    {
      id: 5,
      title: 'Credit Risk Analyst',
      company: 'Barclays',
      match: '88% Match',
      location: 'Pune, India',
      experience: '1-2 Yrs',
      package: '₹9 - 12 LPA',
      skills: ['Credit Risk', 'SQL', 'Risk Modeling'],
      applied: false
    },
    {
      id: 6,
      title: 'Corporate Finance Intern',
      company: 'EY India',
      match: '91% Match',
      location: 'Mumbai, India',
      experience: '0-1 Yrs',
      package: '₹5 - 7 LPA',
      skills: ['Excel', 'Accounting', 'Corporate Finance'],
      applied: false
    }
  ]);

  const handleAutoApply = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, applied: true } : j));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-8 max-w-7xl mx-auto">
      
      {/* ================= PARTNER JOB PORTALS AUTO-SCROLL SECTION ================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-900">Partner Job Portals</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400">Auto-scrolling external drives</span>
            <button 
              onClick={() => setIsPaused(!isPaused)} 
              className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-sky-600 transition"
              title={isPaused ? "Resume Scroll" : "Pause Scroll"}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Marquee / Auto-scroll Container */}
        <div className="relative overflow-hidden w-full py-1">
          <div className={`flex gap-4 w-max ${isPaused ? '' : 'animate-marquee'}`}>
            {/* Render items twice to create a seamless infinite marquee effect */}
            {[...jobPortals, ...jobPortals].map((portal, idx) => (
              <a
                key={idx}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200/80 hover:border-sky-300 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden cursor-pointer w-48 shrink-0"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                      {portal.badge}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {portal.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1 font-medium mt-0.5">
                      {portal.desc}
                    </p>
                  </div>
                </div>

                {/* Accent Bottom Bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${portal.color} rounded-full mt-3 opacity-80 group-hover:opacity-100 transition-opacity`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Page Title & Main Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Job Portal <Sparkles className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Explore AI-matched finance opportunities with automated application agent</p>
        </div>

        <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-sky-500/20 active:scale-95">
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Expanded Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {job.match}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                  <span>{job.experience}</span>
                  <span className="text-slate-300">|</span>
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{job.package}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Auto-Apply Button */}
            <button 
              onClick={() => handleAutoApply(job.id)}
              disabled={job.applied}
              className={`w-full font-bold text-xs py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-2 ${
                job.applied 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default shadow-none' 
                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20 active:scale-95'
              }`}
            >
              {job.applied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Auto-Applied Successfully
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> AI Auto-Apply Now
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Tailwind Custom Marquee Animation Style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}