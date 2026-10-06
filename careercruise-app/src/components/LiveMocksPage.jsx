import React, { useState } from 'react';
import { 
  Video, Sparkles, UserCheck, Clock, ShieldCheck, 
  Play, Radio, Users, X, ArrowRight, Bell, AlertCircle 
} from 'lucide-react';

const LIVE_AI_SESSIONS = [
  {
    id: 1,
    studentName: "Pranav Pawar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    mode: "AI Interview",
    topic: "Financial Analysis and Planning",
    duration: "14 mins elapsed",
    status: "LIVE",
    type: "ai"
  },
  {
    id: 2,
    studentName: "Rishi Chavan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    mode: "AI Interview",
    topic: "Financial Modelling",
    duration: "08 mins elapsed",
    status: "LIVE",
    type: "ai"
  },
  {
    id: 3,
    studentName: "Yash Sinha",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    mode: "AI Interview",
    topic: "Financial Analysis and Planning",
    duration: "22 mins elapsed",
    status: "LIVE",
    type: "ai"
  }
];

const LIVE_HUMAN_SESSIONS = [
  {
    id: 4,
    studentName: "Siddhu Dukare",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120",
    mode: "Human Interview",
    role: "Consultant",
    company: "JP Morgan Chase",
    interviewer: "Anurag Singh",
    duration: "35 mins elapsed",
    status: "LIVE",
    type: "human"
  }
];

const UPCOMING_NEXT_HOUR = [
  {
    id: 101,
    studentName: "Piyanshi Vegad",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    mode: "AI Interview",
    topic: "Advanced Valuation & M&A",
    startsIn: "In 15 mins",
    type: "ai"
  },
  {
    id: 102,
    studentName: "Amit Deshmukh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
    mode: "Human Interview",
    role: "Equity Research Associate",
    company: "Morgan Stanley",
    interviewer: "Neha Sharma",
    startsIn: "In 40 mins",
    type: "human"
  }
];

export default function LiveMocksPage() {
  const [activeModalSession, setActiveModalSession] = useState(null);
  const [remindedSessions, setRemindedSessions] = useState({});

  const handleToggleReminder = (id) => {
    setRemindedSessions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Mock Interviews</h1>
            <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-black rounded-full flex items-center gap-1.5 border border-orange-200 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> LIVE NOW
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">Real-time view of AI and human-led mock sessions currently in progress across the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100 flex items-center gap-2">
            <Radio size={14} className="text-indigo-600 animate-pulse" /> 4 Active Sessions
          </span>
        </div>
      </div>

      {/* SECTION 1: AI Mock Interviews */}
      <div className="space-y-4">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-600" /> Active AI Mock Interviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LIVE_AI_SESSIONS.map((session) => (
            <div 
              key={session.id} 
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between gap-5 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={session.avatar} 
                    alt={session.studentName} 
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-50 shrink-0 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">{session.studentName}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{session.mode}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[11px] font-black rounded-full border border-orange-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span> LIVE
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <p className="text-xs text-slate-400 font-medium">Topic Focus:</p>
                <p className="text-xs font-bold text-slate-800">{session.topic}</p>
                <p className="text-[11px] text-slate-400 pt-1 flex items-center gap-1 font-medium">
                  <Clock size={12} /> {session.duration}
                </p>
              </div>

              <button 
                onClick={() => setActiveModalSession(session)}
                className="w-full py-3 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Video size={15} /> Observe Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Human Mentor Mock Interviews */}
      <div className="space-y-4 pt-2">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <UserCheck size={18} className="text-indigo-600" /> Human Mentor Mock Interviews
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LIVE_HUMAN_SESSIONS.map((session) => (
            <div 
              key={session.id} 
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between gap-5 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={session.avatar} 
                    alt={session.studentName} 
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-50 shrink-0 shadow-sm" 
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">{session.studentName}</h3>
                    <p className="text-xs text-emerald-600 font-semibold">{session.mode}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[11px] font-black rounded-full border border-orange-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span> LIVE
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Role:</span>
                  <span className="font-bold text-slate-800">{session.role}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Company:</span>
                  <span className="font-bold text-slate-800">{session.company}</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-200/60">
                  <span className="text-slate-400 font-medium">Mentor:</span>
                  <span className="font-bold text-indigo-600">{session.interviewer}</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveModalSession(session)}
                className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Video size={15} /> Observe Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Starting in Next Hour */}
      <div className="space-y-4 pt-4">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Clock size={18} className="text-indigo-600" /> Starting in Next Hour
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UPCOMING_NEXT_HOUR.map((item) => {
            const isReminded = remindedSessions[item.id];
            return (
              <div 
                key={item.id} 
                className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={item.avatar} 
                    alt={item.studentName} 
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-100 shrink-0" 
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{item.studentName}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md">
                        {item.startsIn}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.mode} • <span className="text-slate-800 font-semibold">{item.topic || item.role + ' at ' + item.company}</span>
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleToggleReminder(item.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                    isReminded 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Bell size={14} className={isReminded ? 'fill-current' : ''} /> 
                  {isReminded ? 'Reminder Set' : 'Remind Me'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE OBSERVE SESSION MODAL */}
      {activeModalSession && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white text-slate-900 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> LIVE OBSERVATION
                </span>
                <h3 className="font-bold text-sm">{activeModalSession.studentName}’s Mock Interview</h3>
              </div>
              <button 
                onClick={() => setActiveModalSession(null)}
                className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Simulated Live Video Container */}
              <div className="media-canvas relative aspect-video bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                <img 
                  src={activeModalSession.avatar} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm scale-105"
                />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Video size={28} />
                  </div>
                  <h4 className="text-white font-bold text-base">Live Stream Feed Connected</h4>
                  <p className="text-slate-300 text-xs max-w-xs mx-auto">
                    You are observing an active {activeModalSession.mode.toLowerCase()} session in read-only audit mode.
                  </p>
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-semibold flex items-center gap-2">
                  <Users size={12} /> 3 Mentors Observing
                </div>
              </div>

              {/* Session Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Focus</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{activeModalSession.topic || activeModalSession.role}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Session Duration</p>
                  <p className="text-sm font-bold text-indigo-600 mt-0.5">{activeModalSession.duration}</p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  onClick={() => setActiveModalSession(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Close Viewer
                </button>
                <button 
                  onClick={() => {
                    alert(`Joined live notes channel for ${activeModalSession.studentName}`);
                    setActiveModalSession(null);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-indigo-100 flex items-center gap-2"
                >
                  Open Live Rubric & Notes <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}