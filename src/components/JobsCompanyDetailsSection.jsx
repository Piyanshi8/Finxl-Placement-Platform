import { useState } from 'react';
import { Search, Check } from 'lucide-react';

// ==========================================
// SECTION: Job and Company Details Component
// ==========================================
export default function JobsCompanyDetailsSection({ setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Initial list of jobs matching your platform design
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Financial Analyst',
      company: 'Accenture',
      portal: 'Naukari',
      location: 'Pune',
      logoText: 'acc',
      logoBg: 'bg-black text-white',
      jd: `Financial Analysis and interpretation, Market and industry Research, Compliance check, Report drafting and presentation, preparation of proposal with scope, Business development activities. Review balance sheet, income statement and changes in financial position/budget variance analysis.\n\n- Analysis of Financial Statement of companies or Firms\n- Analysis of Debt profile, Credit Ratios of companies\n- Statutory Compliance Check (GST, VAT, Excise, Service Tax).\n- ROC Check, Public Domain Research for Industry and companies\n- Good Presentation Skills to give clear picture of reports to the clients.\n- Prepare financial reports, charts, tables and other exhibits as requested.\n- Analyze data to ensure proper accounting procedures have been followed.\n\n- Responsible for performing special projects to improve process efficiency and performance Projects as assigned by Management.\n- Maintain and develop various financial models and standard templates distributed for use by all of Finance during the planning processes, ensuring quality, accuracy and focused analytic review.`,
      skills: ['Research', 'Forensic Audit', 'Drafting Report', 'ROC Check'],
    },
    {
      id: 2,
      title: 'Consultant',
      company: 'Deloitte',
      portal: 'Indeed',
      location: 'Mumbai',
      logoText: 'D.',
      logoBg: 'bg-emerald-600 text-white',
      jd: `Collaborate with cross-functional client teams to diagnose operational bottlenecks, build high-impact strategic advisory frameworks, and lead client presentations.\n\n- Conduct deep-dive market sizing and competitive benchmarking analysis.\n- Design valuation models and optimize corporate workflows.\n- Prepare detailed pitch books and executive summaries for C-suite stakeholders.`,
      skills: ['Strategy', 'Valuation', 'Client Pitching', 'Excel Modelling'],
    },
    {
      id: 3,
      title: 'Financial Analyst',
      company: 'TCS',
      portal: 'Shine',
      location: 'Pune',
      logoText: 'tcs',
      logoBg: 'bg-red-600 text-white',
      jd: `Provide end-to-end financial reporting support, budget tracking, variance analysis, and audit support for large-scale enterprise clients.\n\n- Perform monthly general ledger reconciliations and financial forecasting.\n- Track capital expenditures and assist in internal compliance reviews.`,
      skills: ['Financial Reporting', 'Budgeting', 'Auditing', 'GL Reconciliation'],
    },
    {
      id: 4,
      title: 'Finance Intern',
      company: 'Accenture',
      portal: 'Internshala',
      location: 'Bangalore',
      logoText: 'acc',
      logoBg: 'bg-black text-white',
      jd: `Assist financial controllers in preparing daily cash flow statements, updating accounts receivable sheets, and supporting quarter-end closing routines.\n\n- Learn corporate finance operations and assist senior analysts with Excel tracking dashboards.`,
      skills: ['Excel', 'Cash Flow', 'Accounting Basics', 'Reporting'],
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  // Form states for adding a new job
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPortal, setNewPortal] = useState('Naukari');
  const [newLocation, setNewLocation] = useState('');
  const [newJd, setNewJd] = useState('');

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.portal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;

    const newJobItem = {
      id: jobs.length + 1,
      title: newTitle,
      company: newCompany,
      portal: newPortal,
      location: newLocation || 'Remote',
      logoText: newCompany.substring(0, 3).toUpperCase(),
      logoBg: 'bg-blue-600 text-white',
      jd: newJd || 'Standard job description imported via portal sync integration.',
      skills: ['Analysis', 'Communication', 'Domain Knowledge'],
    };

    setJobs([newJobItem, ...jobs]);
    setSelectedJob(newJobItem);
    setIsAddModalOpen(false);

    // Reset form fields
    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewJd('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Job & Company Details</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            JDs fetched from portals & companies — source for auto resume generation
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer w-fit"
        >
          <span className="text-sm">+</span> Add Job
        </button>
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Search Bar & Interactive Job Cards List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-xs">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students, jobs, sessions..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            />
          </div>

          {/* Cards Container */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredJobs.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                No jobs found matching your search.
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`bg-white p-4 rounded-2xl border transition cursor-pointer shadow-xs hover:border-blue-300 ${
                      isSelected
                        ? 'border-blue-600 ring-2 ring-blue-500/10 bg-blue-50/20'
                        : 'border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Company Logo Badge */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0 ${job.logoBg}`}>
                        {job.logoText}
                      </div>

                      {/* Job Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 truncate">{job.title}</h3>
                        <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                          Company Name: {job.company}
                        </p>

                        {/* Portal & Location Tags */}
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                            {job.portal}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 truncate max-w-[140px]">
                            Location: {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Job Description Panel */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          {selectedJob ? (
            <>
              {/* Panel Header & Auto-Generate CTA */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    SELECTED ROLE
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">
                    {selectedJob.title} at {selectedJob.company}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab && setActiveTab('Resume Builder')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>⚡</span> Auto-Generate Resumes
                </button>
              </div>

              {/* Job Description Text Area */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 tracking-wider">JOB DESCRIPTION</h3>
                <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/60 p-4 rounded-xl border border-slate-100 max-h-[380px] overflow-y-auto">
                  {selectedJob.jd}
                </div>
              </div>

              {/* Key Skills Tags */}
              <div className="space-y-2.5 pt-2">
                <h3 className="text-xs font-bold text-slate-900">KEY SKILLS & TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-lg text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-24 text-slate-400 text-xs">
              Select a job card from the left list to inspect full details.
            </div>
          )}
        </div>
      </div>

      {/* Add Job Modal Popup */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Add New Job & Portal Listing</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Quantitative Risk Analyst"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Goldman Sachs"
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Portal</label>
                  <select
                    value={newPortal}
                    onChange={(e) => setNewPortal(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                  >
                    <option value="Naukari">Naukri</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Shine">Shine</option>
                    <option value="Internshala">Internshala</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Mumbai / Remote"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Description Requirements</label>
                <textarea
                  value={newJd}
                  onChange={(e) => setNewJd(e.target.value)}
                  rows={4}
                  placeholder="Paste detailed requirements and responsibilities..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}