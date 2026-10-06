import { useState, useEffect, useRef } from 'react';
import { FileText, Search, Plus, UploadCloud, Sparkles, MapPin, Pencil, Download, Check, X, Loader2, RefreshCw, Mail, Phone, Printer, ChevronDown } from 'lucide-react';

// =---------------- RESUME BUILDER PAGE ----------------=

// ---------- MOCK DATA ----------
const PORTAL_JOBS = [
  {
    id: 1, title: 'Financial Analyst', company: 'Accenture', portal: 'Naukri', location: 'Pune',
    jd: `Financial analysis and interpretation, market and industry research, compliance check, report drafting and presentation. Review balance sheet, income statement and budget variance analysis.

- Analysis of financial statements of companies or firms
- Analysis of debt profile and credit ratios of companies
- Statutory compliance check (GST, VAT, Excise)
- ROC check, public domain research for industry and companies
- Good presentation skills to give a clear picture of reports to clients
- Maintain and develop financial models and templates in Excel`,
  },
  {
    id: 2, title: 'Consultant', company: 'Deloitte', portal: 'Indeed', location: 'Mumbai',
    jd: `Collaborate with client teams to diagnose operational bottlenecks and build strategic advisory frameworks.

- Conduct market research and competitive benchmarking
- Build valuation models (DCF) and financial modeling in Excel
- Prepare pitch decks and client presentations for senior stakeholders
- Strong communication skills and Power BI dashboards are a plus`,
  },
  {
    id: 3, title: 'Financial Analyst', company: 'TCS', portal: 'Shine', location: 'Pune',
    jd: `Provide end-to-end financial reporting support, budgeting, variance analysis and audit support for enterprise clients.

- Monthly general ledger reconciliation and forecasting
- Budget tracking and variance analysis
- Assist internal audit and compliance reviews
- Working knowledge of SQL and SAP is preferred`,
  },
  {
    id: 4, title: 'Finance Intern', company: 'Accenture', portal: 'Internshala', location: 'Bangalore',
    jd: `Assist financial controllers with daily cash flow statements and quarter-end closing.

- Update tracking dashboards in Excel
- Support ratio analysis and report drafting
- Learn corporate finance operations and budgeting`,
  },
];

const CANDIDATE = {
  name: 'Riya Joshi',
  email: 'riya.j@gmail.com',
  phone: '+91 98230 11234',
  location: 'Pune, India',
  skills: [
    'Excel', 'Financial Modeling', 'Valuation', 'DCF', 'Ratio Analysis', 'Report Drafting',
    'Presentation', 'Market Research', 'Power BI', 'SQL', 'Variance Analysis', 'Budgeting',
    'Compliance', 'Communication',
  ],
  experience: [
    {
      role: 'Finance Intern', company: 'HDFC Bank', period: 'Jun 2023 – Aug 2023',
      bullets: [
        'Prepared monthly variance reports for 3 business units, cutting review time by 25%.',
        'Built Excel models to track budgets and flag overruns above 5%.',
        'Presented quarterly findings to the branch finance head.',
      ],
    },
    {
      role: 'Equity Research Trainee', company: 'Finxl Academy', period: 'Jan 2024 – Apr 2024',
      bullets: [
        'Valued 5 listed companies using DCF and peer multiples.',
        'Wrote 2-page research notes on sector trends and earnings.',
      ],
    },
  ],
  projects: [
    { name: 'Three-Statement Model – Consumer Retail Company', detail: 'Linked income statement, balance sheet and cash flow with scenario toggles in Excel.' },
    { name: 'Sales Dashboard', detail: 'Power BI dashboard tracking regional revenue, margin and monthly growth.' },
  ],
  education: [
    { degree: 'B.Com in Finance', school: 'Savitribai Phule Pune University', period: '2021 – 2024' },
  ],
};

const SKILL_KEYWORDS = {
  Excel: ['excel'],
  'Financial Modeling': ['financial model', 'modeling', 'modelling'],
  Valuation: ['valuation'],
  DCF: ['dcf'],
  'Ratio Analysis': ['ratio'],
  'Report Drafting': ['report drafting', 'drafting', 'reporting'],
  Presentation: ['presentation', 'pitch'],
  'Market Research': ['market research', 'industry research', 'research'],
  'Power BI': ['power bi'],
  SQL: ['sql'],
  'Variance Analysis': ['variance'],
  Budgeting: ['budget'],
  Compliance: ['compliance', 'statutory'],
  Communication: ['communication'],
  Audit: ['audit'],
  SAP: ['sap'],
  'ROC Check': ['roc check'],
  Bloomberg: ['bloomberg'],
  Tally: ['tally'],
  Python: ['python'],
};

// ---------- HELPERS ----------
function buildResume(jd, job) {
  const text = jd.toLowerCase();
  const jdSkills = Object.keys(SKILL_KEYWORDS).filter((skill) =>
    SKILL_KEYWORDS[skill].some((word) => text.includes(word))
  );
  const matched = jdSkills.filter((s) => CANDIDATE.skills.includes(s));
  const gaps = jdSkills.filter((s) => !CANDIDATE.skills.includes(s));
  const others = CANDIDATE.skills.filter((s) => !matched.includes(s));
  const skills = matched.length
    ? [...matched, ...others.slice(0, Math.max(0, 8 - matched.length))]
    : CANDIDATE.skills.slice(0, 8);
  const score = jdSkills.length
    ? Math.min(98, Math.round(60 + 38 * (matched.length / jdSkills.length)))
    : 62;

  const role = job ? job.title : 'Finance Professional';
  const target = job ? ` at ${job.company}` : '';
  const lead = matched.slice(0, 3).join(', ') || 'financial analysis';
  const summary = `Finance graduate with hands-on experience in ${lead}. Completed a finance internship at HDFC Bank and built valuation models for listed companies. Looking to contribute as a ${role}${target}, turning data into clear, decision-ready reports.`;

  const experience = CANDIDATE.experience.map((exp, i) =>
    i === 0 && matched.length
      ? { ...exp, bullets: [`Applied ${matched.slice(0, 2).join(' and ')} across daily work, aligned with ${role} responsibilities.`, ...exp.bullets] }
      : exp
  );

  return {
    role, company: job ? job.company : '', summary, skills, jdSkills, gaps, score,
    experience, projects: CANDIDATE.projects, education: CANDIDATE.education,
  };
}

function resumeToText(r) {
  const lines = [];
  lines.push(CANDIDATE.name.toUpperCase());
  lines.push(`${r.role}${r.company ? ' – ' + r.company : ''}`);
  lines.push(`${CANDIDATE.email} | ${CANDIDATE.phone} | ${CANDIDATE.location}`);
  lines.push('', 'SUMMARY', r.summary);
  lines.push('', 'SKILLS', r.skills.join(', '));
  lines.push('', 'EXPERIENCE');
  r.experience.forEach((e) => {
    lines.push(`${e.role}, ${e.company} (${e.period})`);
    e.bullets.forEach((b) => lines.push(`  - ${b}`));
  });
  lines.push('', 'PROJECTS');
  r.projects.forEach((p) => lines.push(`${p.name}: ${p.detail}`));
  lines.push('', 'EDUCATION');
  r.education.forEach((e) => lines.push(`${e.degree}, ${e.school} (${e.period})`));
  return lines.join('\n');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function resumeToHtml(r) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(CANDIDATE.name)} – Resume</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:760px;margin:32px auto;padding:0 24px;font-size:13px;line-height:1.5}
  h1{font-size:24px;margin:0} h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#475569;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin:20px 0 8px}
  .sub{color:#475569;margin:2px 0} .row{display:flex;justify-content:space-between;font-weight:600}
  ul{margin:4px 0 10px 18px;padding:0} .chip{display:inline-block;background:#f1f5f9;border-radius:4px;padding:2px 8px;margin:0 4px 4px 0;font-size:12px}
</style></head><body>
<h1>${esc(CANDIDATE.name)}</h1>
<div class="sub">${esc(r.role)}${r.company ? ' – ' + esc(r.company) : ''}</div>
<div class="sub">${esc(CANDIDATE.email)} | ${esc(CANDIDATE.phone)} | ${esc(CANDIDATE.location)}</div>
<h2>Summary</h2><p>${esc(r.summary)}</p>
<h2>Skills</h2>${r.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}
<h2>Experience</h2>${r.experience.map((e) => `<div class="row"><span>${esc(e.role)}, ${esc(e.company)}</span><span>${esc(e.period)}</span></div><ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`).join('')}
<h2>Projects</h2><ul>${r.projects.map((p) => `<li><b>${esc(p.name)}</b>: ${esc(p.detail)}</li>`).join('')}</ul>
<h2>Education</h2>${r.education.map((e) => `<div class="row"><span>${esc(e.degree)}, ${esc(e.school)}</span><span>${esc(e.period)}</span></div>`).join('')}
</body></html>`;
}

function ResumeSection({ title, children }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">{title}</h3>
      {children}
    </div>
  );
}

function ResumeSkeleton({ pulsing }) {
  const bar = `bg-slate-200 rounded-full ${pulsing ? 'animate-pulse' : ''}`;
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className={`h-3 w-40 ${bar}`} />
        <div className={`h-2 w-24 ${bar}`} />
      </div>
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase">Summary</span>
        <div className={`h-2 w-full ${bar}`} />
        <div className={`h-2 w-5/6 ${bar}`} />
        <div className={`h-2 w-2/3 ${bar}`} />
      </div>
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase">Skills – matched to JD</span>
        <div className="flex gap-2 pt-1">
          {['[Skill]', '[Skill]', '[Skill]', '[Skill]'].map((s, i) => (
            <span
              key={i}
              className={`text-[10px] px-2.5 py-1 rounded-full ${i < 3 ? 'bg-emerald-50' : 'bg-slate-100'} text-slate-400 ${pulsing ? 'animate-pulse' : ''}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase">Experience</span>
        <div className={`h-2 w-full ${bar}`} />
        <div className={`h-2 w-11/12 ${bar}`} />
        <div className={`h-2 w-3/4 ${bar}`} />
      </div>
      {!pulsing && (
        <p className="text-xs text-slate-400 pt-6">
          Add a job description and select “Generate Resume with Ai” to see your tailored resume here.
        </p>
      )}
    </div>
  );
}

// ---------- PAGE ----------
export default function ResumeBuilderPage() {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jdText, setJdText] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [resume, setResume] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const searchRef = useRef(null);
  const downloadRef = useRef(null);
  const fileRef = useRef(null);
  const genTimer = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setDropdownOpen(false);
      if (downloadRef.current && !downloadRef.current.contains(e.target)) setDownloadOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      clearTimeout(genTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const filteredJobs = PORTAL_JOBS.filter((j) =>
    `${j.title} ${j.company} ${j.portal} ${j.location}`.toLowerCase().includes(query.toLowerCase())
  );

  const pickJob = (job) => {
    setSelectedJob(job);
    setJdText(job.jd);
    setQuery(`${job.title} – ${job.company}`);
    setDropdownOpen(false);
  };

  const useTypedText = () => {
    setSelectedJob(null);
    setJdText(query);
    setDropdownOpen(false);
  };

  const handleFile = (file) => {
    if (!file) return;
    const isText = file.type.startsWith('text/') || /\.(txt|md)$/i.test(file.name);
    if (!isText) {
      showToast('Only .txt files can be read here. Paste the JD text for other formats.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setJdText(String(reader.result || ''));
      setSelectedJob(null);
      showToast(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files && e.dataTransfer.files[0]);
  };

  const clearJd = () => {
    setJdText('');
    setQuery('');
    setSelectedJob(null);
  };

  const generate = () => {
    if (!jdText.trim() || isGenerating) return;
    setEditing(false);
    setIsGenerating(true);
    clearTimeout(genTimer.current);
    genTimer.current = setTimeout(() => {
      setResume(buildResume(jdText, selectedJob));
      setIsGenerating(false);
      showToast('Resume generated and matched to the JD');
    }, 1800);
  };

  const updateResume = (patch) => setResume((r) => ({ ...r, ...patch }));

  const updateBullet = (expIndex, bulletIndex, value) => {
    setResume((r) => ({
      ...r,
      experience: r.experience.map((e, i) =>
        i !== expIndex ? e : { ...e, bullets: e.bullets.map((b, j) => (j === bulletIndex ? value : b)) }
      ),
    }));
  };

  const removeSkill = (skill) => updateResume({ skills: resume.skills.filter((s) => s !== skill) });

  const addSkill = () => {
    const value = newSkill.trim();
    if (!value) return;
    if (resume.skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      showToast('That skill is already on the resume', 'error');
      return;
    }
    updateResume({ skills: [...resume.skills, value] });
    setNewSkill('');
  };

  const downloadTxt = () => {
    const blob = new Blob([resumeToText(resume)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${CANDIDATE.name.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadOpen(false);
    showToast('Resume downloaded');
  };

  const printPdf = () => {
    const w = window.open('', '_blank');
    setDownloadOpen(false);
    if (!w) {
      showToast('Allow pop-ups to save as PDF', 'error');
      return;
    }
    w.document.write(resumeToHtml(resume));
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  const isMatched = (skill) => resume && resume.jdSkills.includes(skill);
  const canGenerate = jdText.trim().length > 0 && !isGenerating;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-slate-900">JD → Resume Builder</h1>
        <span className="text-[11px] font-semibold text-slate-700 bg-blue-100 px-3 py-1 rounded-full tracking-wide">
          AI-GENERATED
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ================= LEFT PANEL ================= */}
        <section className="bg-white border border-slate-300/70 rounded-2xl p-6 flex flex-col gap-5 min-h-[640px]">
          <div className="relative mt-8" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                placeholder="Paste JD text here or select from Job Portals"
                className="w-full bg-white border border-slate-300 rounded-lg pl-11 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
              {query && (
                <button
                  onClick={clearJd}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-slate-400">Job portals</p>
                <ul className="max-h-64 overflow-y-auto">
                  {filteredJobs.length === 0 && (
                    <li className="px-4 py-3 text-xs text-slate-400">No jobs match “{query}”.</li>
                  )}
                  {filteredJobs.map((job) => (
                    <li key={job.id}>
                      <button
                        onClick={() => pickJob(job)}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between gap-3"
                      >
                        <span>
                          <span className="block text-sm font-semibold text-slate-900">{job.title}</span>
                          <span className="block text-xs text-slate-500">{job.company} · {job.location}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                          {job.portal}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {query.trim().length > 0 && (
                  <button
                    onClick={useTypedText}
                    className="w-full text-left px-4 py-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Use what I typed as the job description
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Drop zone + textarea */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`relative flex-1 min-h-[320px] rounded-lg border transition ${
              dragging ? 'border-blue-500 bg-blue-50/60 border-dashed border-2' : 'border-slate-300 bg-white'
            }`}
          >
            <textarea
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value);
                setSelectedJob(null);
              }}
              className="absolute inset-0 w-full h-full resize-none bg-transparent rounded-lg p-5 pb-10 text-sm text-slate-700 leading-relaxed outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="Job description"
            />

            {!jdText && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <UploadCloud className="w-9 h-9 text-slate-300 mb-3" />
                <p className="text-sm text-slate-400">Drop JD file or paste text</p>
                <button
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="pointer-events-auto mt-3 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Browse .txt file
                </button>
              </div>
            )}

            {jdText && (
              <div className="absolute bottom-2 left-5 right-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  {jdText.length.toLocaleString()} characters
                  {selectedJob && ` · ${selectedJob.title}, ${selectedJob.company}`}
                </span>
                <button onClick={clearJd} className="font-semibold text-slate-500 hover:text-rose-600">
                  Clear
                </button>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md,text/plain"
              className="hidden"
              onChange={(e) => {
                handleFile(e.target.files && e.target.files[0]);
                e.target.value = '';
              }}
            />
          </div>

          {/* Generate */}
          <button
            onClick={generate}
            disabled={!canGenerate}
            className={`w-full py-4 rounded-lg text-base font-semibold text-white flex items-center justify-center gap-2 transition shadow-sm ${
              canGenerate ? 'bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 hover:opacity-95 active:scale-[0.99] shadow-lg shadow-pink-500/20' : 'bg-rose-200 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Tailoring resume to the JD…
              </>
            ) : resume ? (
              <>
                <RefreshCw className="w-5 h-5" />
                Regenerate Resume with Ai
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Resume with Ai
              </>
            )}
          </button>
          {!jdText.trim() && (
            <p className="text-center text-xs text-slate-400 -mt-2">Add a job description to enable generation.</p>
          )}
        </section>

        {/* ================= RIGHT PANEL ================= */}
        <section className="bg-white border border-slate-300/70 rounded-2xl p-5 flex flex-col min-h-[640px]">
          <div className="flex items-center justify-between pb-4">
            <span className="text-[11px] font-semibold text-slate-500 tracking-wide">AI-GENERATED RESUME PREVIEW</span>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setEditing((v) => !v)}
                disabled={!resume}
                className={`px-3 py-1.5 rounded-md border font-semibold flex items-center gap-1.5 transition ${
                  !resume
                    ? 'bg-white border-slate-200 text-slate-300 cursor-not-allowed'
                    : editing
                    ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {editing ? <Check className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                {editing ? 'Done' : 'Edit'}
              </button>

              <div className="relative" ref={downloadRef}>
                <button
                  onClick={() => setDownloadOpen((v) => !v)}
                  disabled={!resume}
                  className={`px-3 py-1.5 rounded-md border font-semibold flex items-center gap-1.5 transition ${
                    resume
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-white border-slate-200 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                  <ChevronDown className="w-3 h-3" />
                </button>
                {downloadOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-20">
                    <button
                      onClick={printPdf}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-400" />
                      Print / Save as PDF
                    </button>
                    <button
                      onClick={downloadTxt}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Download as .txt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-lg border border-slate-200/80 bg-white p-6 overflow-y-auto">
            {!resume ? (
              <ResumeSkeleton pulsing={isGenerating} />
            ) : (
              <div className="space-y-6 text-sm text-slate-700">
                {/* Identity + score */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{CANDIDATE.name}</h2>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">
                        {resume.role}
                        {resume.company && ` – ${resume.company}`}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-bold text-emerald-600 leading-none">{resume.score}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">JD match</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {CANDIDATE.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {CANDIDATE.phone}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {CANDIDATE.location}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${resume.score}%` }}
                    />
                  </div>
                </div>

                <ResumeSection title="Summary">
                  {editing ? (
                    <textarea
                      value={resume.summary}
                      onChange={(e) => updateResume({ summary: e.target.value })}
                      rows={4}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm leading-relaxed outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                    />
                  ) : (
                    <p className="leading-relaxed">{resume.summary}</p>
                  )}
                </ResumeSection>

                <ResumeSection title="Skills – matched to JD">
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          isMatched(skill)
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {skill}
                        {editing && (
                          <button onClick={() => removeSkill(skill)} className="hover:text-rose-600" aria-label={`Remove ${skill}`}>
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                    {editing && (
                      <span className="inline-flex items-center gap-1 border border-dashed border-slate-300 rounded-full pl-3 pr-1 py-0.5">
                        <input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                          placeholder="Add skill"
                          className="w-24 text-xs outline-none bg-transparent"
                        />
                        <button
                          onClick={addSkill}
                          className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700"
                          aria-label="Add skill"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Green skills appear in the job description.
                    {resume.gaps.length > 0 && (
                      <>
                        {' '}Not on your profile yet:{' '}
                        <span className="text-amber-600 font-medium">{resume.gaps.join(', ')}</span>.
                      </>
                    )}
                  </p>
                </ResumeSection>

                <ResumeSection title="Experience">
                  <div className="space-y-4">
                    {resume.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="font-semibold text-slate-900">
                            {exp.role}, <span className="font-medium">{exp.company}</span>
                          </h4>
                          <span className="text-xs text-slate-400 shrink-0">{exp.period}</span>
                        </div>
                        <ul className="mt-1.5 space-y-1.5">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="flex gap-2">
                              <span className="text-slate-300 mt-0.5">•</span>
                              {editing ? (
                                <input
                                  value={b}
                                  onChange={(e) => updateBullet(i, j, e.target.value)}
                                  className="flex-1 border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent pb-0.5"
                                />
                              ) : (
                                <span className="leading-relaxed">{b}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Projects">
                  <ul className="space-y-2">
                    {resume.projects.map((p, i) => (
                      <li key={i}>
                        <span className="font-semibold text-slate-900">{p.name}</span>
                        <span className="block text-slate-600">{p.detail}</span>
                      </li>
                    ))}
                  </ul>
                </ResumeSection>

                <ResumeSection title="Education">
                  {resume.education.map((e, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-3">
                      <span>
                        <span className="font-semibold text-slate-900">{e.degree}</span>, {e.school}
                      </span>
                      <span className="text-xs text-slate-400 shrink-0">{e.period}</span>
                    </div>
                  ))}
                </ResumeSection>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold text-white flex items-center gap-2 ${
            toast.type === 'error' ? 'bg-orange-500' : 'bg-slate-900 toast-surface'
          }`}
        >
          {toast.type === 'error' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4 text-emerald-400" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}