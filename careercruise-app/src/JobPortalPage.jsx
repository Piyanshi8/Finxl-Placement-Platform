import React from 'react';

export default function JobPortalPage() {
  const jobCards = [
    { 
      id: 1, 
      title: 'Financial Analyst', 
      company: 'Company Name: Accenture', 
      source: 'Naukri', 
      location: 'Location: Pune' 
    },
    { 
      id: 2, 
      title: 'Senior Financial Associate', 
      company: 'Company Name: Deloitte', 
      source: 'LinkedIn', 
      location: 'Location: Mumbai' 
    },
    { 
      id: 3, 
      title: 'Risk & FP&A Specialist', 
      company: 'Company Name: KPMG', 
      source: 'Indeed', 
      location: 'Location: Bengaluru' 
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Job Portal & Applications</h1>
        <p className="text-xs text-slate-400 mt-1">
          Matched roles from Naukri, Shine & other portals, and application tracking
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Detailed Job Cards */}
        <div className="col-span-5 space-y-4">
          {jobCards.map((card) => (
            <div
              key={card.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-[10px] shrink-0 uppercase tracking-tighter">
                  {card.company.replace('Company Name: ', '').substring(0, 3)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {card.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                  {card.source}
                </span>
                <span className="px-3 py-1 border border-slate-300 text-slate-500 rounded-full font-medium">
                  {card.location}
                </span>
              </div>

              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition shadow-sm">
                Auto-Apply
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Applications Tracker Header & Skeleton Boards */}
        <div className="col-span-7 space-y-6">
          {/* Top Status Indicators / Counts */}
          <div className="flex items-center space-x-6 text-sm font-semibold text-slate-700 pt-1">
            <div className="flex items-center space-x-1.5">
              <span>Applied</span>
              <span className="text-slate-900 font-bold">- 2</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>Shortlisted</span>
              <span className="text-slate-900 font-bold">- 1</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>Reject</span>
              <span className="text-slate-900 font-bold">- 2</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>Offer Letter</span>
              <span className="text-slate-900 font-bold">- 3</span>
            </div>
          </div>

          {/* Skeleton Cards Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Column 1 Skeletons */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                <div className="h-2.5 bg-slate-100 rounded w-2/3 mt-2"></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                <div className="h-2.5 bg-slate-100 rounded w-2/3 mt-2"></div>
              </div>
            </div>

            {/* Column 2 Skeletons */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="h-3 bg-slate-200 rounded w-2/3"></div>
              </div>
            </div>

            {/* Column 3 Skeletons */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2.5">
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                <div className="h-2.5 bg-slate-100 rounded w-2/3 mt-2"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}