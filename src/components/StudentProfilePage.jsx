import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, GraduationCap, Briefcase,
  CheckCircle2, PlayCircle, Clock, ChevronRight,
  Video, Eye, Sparkles, TrendingUp, BarChart3, Download,
  Calendar, Award, BookOpen, Edit, X, ExternalLink
} from 'lucide-react';

export default function StudentProfilePage({ studentName }) {
  // Navigation Tabs (Updated from 'Video Analytics' to 'Module Progress')
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  
  // Selected video for playing in modal
  const [activeVideo, setActiveVideo] = useState(null);

  // Module Progress Data
  const moduleStats = {
    totalVideos: 48,
    completed: 32,
    inProgress: 11,
    notStarted: 5,
    totalHoursWatched: '42.5 hrs',
    completionRate: 67
  };

  const moduleList = [
    {
      id: 1,
      title: 'Financial Modeling & Valuation Fundamentals',
      category: 'Finance',
      duration: '45 mins',
      status: 'Completed',
      watchedPercent: 100,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80',
      embedUrl: 'https://www.youtube.com/embed/g6BtbIiJ_rc' // Financial Modeling Tutorial
    },
    {
      id: 2,
      title: 'Advanced Excel & Financial Statement Analysis',
      category: 'Analytics',
      duration: '60 mins',
      status: 'Completed',
      watchedPercent: 100,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80',
      embedUrl: 'https://www.youtube.com/embed/Vl0H-qTclOg' // Excel Financial Analysis
    },
    {
      id: 3,
      title: 'Corporate Finance & Capital Structuring',
      category: 'Finance',
      duration: '50 mins',
      status: 'In Progress',
      watchedPercent: 65,
      thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&auto=format&fit=crop&q=80',
      embedUrl: 'https://www.youtube.com/embed/3U8P14T453E' // Corporate Finance Basics
    },
    {
      id: 4,
      title: 'Behavioral & Situational Interview Preparation',
      category: 'Soft Skills',
      duration: '35 mins',
      status: 'In Progress',
      watchedPercent: 40,
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      embedUrl: 'https://www.youtube.com/embed/HG68Ymazo18' // Behavioral Interview Prep
    },
    {
      id: 5,
      title: 'DCF Model Building Step-by-Step Guide',
      category: 'Finance',
      duration: '75 mins',
      status: 'Not Started',
      watchedPercent: 0,
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&auto=format&fit=crop&q=80',
      embedUrl: 'https://www.youtube.com/embed/0T1y38mZfC0' // DCF Modeling Tutorial
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6">
      
      {/* ================= TOP PROFILE BANNER ================= */}
      <div className="bg-white border border-slate-200/80 p-4 sm:p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Profile Info */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
              alt={studentName || 'Riya Joshi'}
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-50 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold" title="Eligible">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900">{studentName || 'Riya Joshi'}</h1>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                • Eligible for Placement
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student ID : <span className="font-semibold text-slate-800">D312</span> | Course :{' '}
              <span className="font-semibold text-slate-800">Financial Analysis and Planning</span> | Batch :{' '}
              <span className="font-semibold text-slate-800">D08</span>
            </p>
          </div>
        </div>

        {/* Responsive Action Buttons */}
        <div className="w-full sm:w-auto flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
          <button className="flex-1 sm:flex-none px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5 active:scale-95">
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Profile</span>
          </button>
          
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 active:scale-95">
            <Edit className="w-3.5 h-3.5" />
            <span>Manage</span>
          </button>
        </div>

      </div>

      {/* ================= SUB-NAVIGATION TABS ================= */}
      <div className="border-b border-slate-200 flex space-x-6 text-xs font-bold text-slate-500 overflow-x-auto no-scrollbar">
        {['Overview', 'Academic Skills', 'Resume', 'Mock History', 'Module Progress'].map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`pb-3 transition relative whitespace-nowrap flex items-center gap-1.5 ${
                isActive ? 'text-blue-600 border-b-2 border-blue-600 font-bold' : 'hover:text-slate-800'
              }`}
            >
              {tab === 'Module Progress' && <BookOpen className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
              {tab}
              {tab === 'Module Progress' && (
                <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-extrabold">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= OVERVIEW TAB ================= */}
      {activeSubTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Left Column (2 Grid Span) */}
          <div className="md:col-span-2 space-y-5">
            
            {/* Personal & Contact */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> Personal & Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Email Address</p>
                    <p className="font-bold text-slate-800">riya.j@gmail.com</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Phone Number</p>
                    <p className="font-bold text-slate-800">+91 98230 11234</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Current Location</p>
                    <p className="font-bold text-slate-800">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Education & Experience
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">B.Com in Finance</p>
                    <p className="text-slate-500">Savitribai Phule Pune University (2021 - 2024)</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                  <Briefcase className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Finance Intern</p>
                    <p className="text-slate-500">HDFC Bank (3 Months Internship)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Readiness */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" /> Career Readiness Progress
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Donut Score */}
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray="78, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-bold text-slate-900">78%</span>
                    <span className="block text-[8px] text-slate-400 font-bold uppercase">Ready</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex-1 w-full space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Resume</span>
                      <span className="text-slate-800 font-bold">78%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Skills</span>
                      <span className="text-slate-800 font-bold">65%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">JD Match</span>
                      <span className="text-slate-800 font-bold">95%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Interview Preps</span>
                      <span className="text-slate-800 font-bold">82%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Next Mock Interview & Mentor Session */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Next Mock Interview</h2>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-100">
                <h3 className="font-bold text-slate-900">Financial Analyst - Technical Round</h3>
                <p className="text-slate-500">📅 01-10-2026 | 🕒 2:00 PM | AI Interview | 12 Questions | ~20 mins</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition mt-2">
                  Join Interview
                </button>
              </div>

              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider pt-2">Upcoming Mentor Session</h2>
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs border border-slate-100">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Mentor"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">Priya Sharma</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Senior Finance Trainer</p>
                  </div>
                </div>
                <p className="text-slate-500">Topic: Resume & Interview Feedback | 📅 01-10-2026 | 🕒 2:00 PM</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition mt-2">
                  Join Session
                </button>
              </div>
            </div>

          </div>

          {/* Right Column Sidebar */}
          <div className="space-y-5">
            
            {/* Skill Score */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" /> Skill Score
              </h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600 font-medium">Technical</span>
                  <span className="font-bold text-slate-900">78%</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600 font-medium">Communication</span>
                  <span className="font-bold text-slate-900">65%</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-600 font-medium">Behavioral</span>
                  <span className="font-bold text-slate-900">82%</span>
                </div>
              </div>
            </div>

            {/* AI Coach Insights */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-blue-600" /> AI Coach Says
              </h2>
              <div className="space-y-2 text-xs font-semibold">
                <p className="text-orange-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  Improve: Financial Ratio Analysis
                </p>
                <p className="text-amber-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  Practice: SQL Interview Questions
                </p>
                <p className="text-emerald-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Strong: Excel & Communication
                </p>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>Resume</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Verified
                </span>
              </h2>

              <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-36 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&auto=format&fit=crop&q=80"
                  alt="Resume Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> Full View
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition border border-slate-200">
                  View Old
                </button>
                <button className="py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-sm">
                  View AI
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODULE PROGRESS TAB (RENAMED) ================= */}
      {activeSubTab === 'Module Progress' && (
        <div className="space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Modules</p>
                <h3 className="text-lg font-extrabold text-slate-900">{moduleStats.totalVideos} Videos</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
                <h3 className="text-lg font-extrabold text-emerald-600">{moduleStats.completed} Modules ({moduleStats.completionRate}%)</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
                <h3 className="text-lg font-extrabold text-amber-600">{moduleStats.inProgress} Modules</h3>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time Completed</p>
                <h3 className="text-lg font-extrabold text-slate-900">{moduleStats.totalHoursWatched}</h3>
              </div>
            </div>

          </div>

          {/* Module Videos List */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Course Modules & Embedded Video Lessons</h2>
                <p className="text-xs text-slate-500">Click any video module below to open and play the content.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                {moduleStats.notStarted} Modules Remaining
              </span>
            </div>

            {/* Video Module List */}
            <div className="space-y-3">
              {moduleList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900 group-hover:shadow-md transition">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:opacity-80 transition" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-white drop-shadow-md group-hover:scale-110 transition duration-200" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {item.category}
                      </span>
                      <h3 className="text-xs md:text-sm font-bold text-slate-800 mt-1 group-hover:text-blue-600 transition">{item.title}</h3>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                        <Clock className="w-3 h-3" /> Duration: {item.duration}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-60 space-y-1.5 shrink-0">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-slate-700 font-bold text-[11px]">{item.watchedPercent}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.watchedPercent === 100 ? 'bg-emerald-500' :
                          item.watchedPercent > 0 ? 'bg-amber-500' : 'bg-slate-300'
                        }`}
                        style={{ width: `${item.watchedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ================= EMBEDDED YOUTUBE VIDEO MODAL ================= */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-0 relative border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-blue-400">{activeVideo.category}</span>
                <h3 className="text-sm font-bold text-slate-100">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* iFrame Video Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${activeVideo.embedUrl}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Duration: {activeVideo.duration}</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
              >
                Close Lesson
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= OTHER SUB-TABS PLACEHOLDER ================= */}
      {['Academic Skills', 'Resume', 'Mock History'].includes(activeSubTab) && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 space-y-3">
          <Award className="w-10 h-10 text-blue-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">{activeSubTab} Details</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Content and analytics for {activeSubTab} will be displayed here.
          </p>
        </div>
      )}

    </div>
  );
}