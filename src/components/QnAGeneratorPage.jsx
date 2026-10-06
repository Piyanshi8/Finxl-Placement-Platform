import React, { useState } from 'react';
import {
  Sparkles,
  Paperclip,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  MessageSquare,
  FileText
} from 'lucide-react';

export default function QnAGeneratorPage() {
  const [jdText, setJdText] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('Gemini AI');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    if (file.type === 'text/plain') {
      setJdFile(null);
      const reader = new FileReader();
      reader.onload = (event) => setJdText(event.target.result);
      reader.readAsText(file);
    } else {
      setJdFile(file);
    }
    e.target.value = '';
  };

    const handleGenerate = async (e) => {
    e.preventDefault();
    if (!jdText.trim() && !jdFile) return;

    setIsGenerating(true);
    setGeneratedData(null);
    setError('');

    try {
      const form = new FormData();
      form.append('mode', selectedEngine === 'Gemini AI' ? 'gemini' : 'rule');
      form.append('jd_text', jdText);
      if (jdFile) form.append('jd_file', jdFile);

      const res = await fetch('/generate', { method: 'POST', body: form });
      const json = await res.json().catch(() => null);
      if (!json) throw new Error('Cannot reach the backend. Is python app.py running?');
      if (!res.ok || !json.success) throw new Error(json.error || 'Generation failed');

      const data = json.data;
      setGeneratedData({
        jobRole: data.job_role,
        skillsDetected: (data.skills || []).map((s) => (typeof s === 'string' ? s : s.name)),
        questions: (data.questions || []).map((q, i) => ({
          id: i + 1,
          category: q.skill || q.category || 'General',
          question: q.question,
          answer: q.answer,
          keyConcepts: q.keyConcepts || q.key_concepts || [q.difficulty, q.type].filter(Boolean),
        })),
      });
      setExpandedIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Top Tag Header */}
      <div className="flex justify-end">
        <span className="bg-blue-50 text-blue-600 font-semibold text-xs px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm">
          AI Interview Preparation
        </span>
      </div>

      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Blue Banner */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
              Financial Career Intelligence
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              Turn Financial JDs into <span className="text-blue-400">Interview Preparation</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Analyze a financial job description and generate role-specific skills, interview questions, and suggested answers.
            </p>
          </div>
        </div>

        {/* Right How It Works Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800">How it works</h3>

          <div className="space-y-3">
            {[
              { num: '01', title: 'Analyze Job Description' },
              { num: '02', title: 'Detect Financial Skills' },
              { num: '03', title: 'Generate Questions' },
              { num: '04', title: 'Prepare Answers' }
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
                  {step.num}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Description Input Form */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Job Description</h2>
            <p className="text-xs text-slate-400 mt-0.5">Paste a financial JD or upload a document.</p>
          </div>

          <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSelectedEngine('Rule Engine')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                selectedEngine === 'Rule Engine'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Rule Engine
            </button>
            <button
              type="button"
              onClick={() => setSelectedEngine('Gemini AI')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                selectedEngine === 'Gemini AI'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              ✦ Gemini AI
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <textarea
            rows={7}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste the financial job description here...&#10;&#10;Example:&#10;Financial Analyst required to support budgeting, forecasting, financial reporting and financial modelling."
            className="w-full border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-y font-normal leading-relaxed placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-slate-500" />
              Upload JD
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-slate-400">
              Supported formats: TXT, PDF, DOCX
              <span className="text-[11px] text-slate-400">
             {jdFile ? `Selected: ${jdFile.name}` : 'Supported formats: TXT, PDF, DOCX'}
            </span>
            </span>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
              setJdText('');
              setJdFile(null);
              setError('');
              setGeneratedData(null);
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold px-4 py-2.5 rounded-xl transition"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || (!jdText.trim() && !jdFile)}              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                'Generate Interview Q&A →'
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded-2xl p-4">
          {error}
        </div>
      )}

      {/* Output Results */}
      {generatedData && (
        
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-slate-800">
              {generatedData.jobRole || 'Interview Questions'}
            </h3>
            <div className="flex gap-2">
              {['pdf', 'docx', 'txt', 'json'].map((t) => (
                <a
                  key={t}
                  href={`/download/${t}`}
                  className="text-[11px] font-semibold uppercase border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detected Skills & Topics
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {generatedData.skillsDetected.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {generatedData.questions.map((q, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 transition"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {q.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        Q{idx + 1}: {q.question}
                      </h4>
                    </div>
                    <div className="text-slate-400 pt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/30 space-y-3 text-xs">
                      <div className="bg-white border border-slate-200/70 rounded-xl p-3 space-y-1 mt-3">
                        <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1 uppercase tracking-wider">
                          <MessageSquare className="w-3 h-3" /> Suggested Answer
                        </span>
                        <p className="text-slate-700 font-normal leading-relaxed">{q.answer}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1">
                          {q.keyConcepts.map((kc, kIdx) => (
                            <span key={kIdx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                              {kc}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(`Q: ${q.question}\n\nA: ${q.answer}`, q.id)}
                          className="text-slate-500 hover:text-blue-600 text-[11px] font-semibold flex items-center gap-1"
                        >
                          {copiedId === q.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copiedId === q.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="text-center text-[11px] text-slate-400 pt-4">
        FINXL JD Interview Preparation Generator
      </div>
    </div>
  );
}
