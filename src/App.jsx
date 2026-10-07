import React, { useState } from 'react';
import { LayoutDashboard, Users, Video, UserCheck, BookOpen, Briefcase, BarChart2, FileText, Building2, Search, Bell, Plus, CheckCircle2, Clock, ChevronRight, TrendingUp, Award, UploadCloud, FileDown, Sparkles, PlayCircle, CheckCircle, XCircle, HelpCircle, LogOut, SlidersHorizontal, MapPin, DollarSign, Calendar, Eye, Send, MessageSquare, AlertCircle, Pencil, Download, Check, X, Loader2, RefreshCw, Mail, Phone, Printer, ChevronDown, User, Settings, Lock, Repeat, ShieldAlert, HelpCircle as QnAIcon } from 'lucide-react';
import OverviewPage from './components/OverviewPage.jsx';
import StudentListPage from './components/StudentListPage.jsx';
import Batches from './components/Batches.jsx';
import LiveMocksPage from './components/LiveMocksPage.jsx';
import StudentProfilePage from './components/StudentProfilePage.jsx';
import LearningModulesPage from './components/LearningModulesPage.jsx';
import JobPortalPage from './components/JobPortalPage.jsx';
import ProgressReportsPage from './components/ProgressReportsPage.jsx';
import ResumeBuilderPage from './components/ResumeBuilderPage.jsx';
import JobsCompanyDetailsSection from './components/JobsCompanyDetailsSection.jsx';
import QNAGeneratorPage from './components/QnAGeneratorPage.jsx';

export default function App() {
  // Navigation & Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('Admin'); // 'Admin' | 'Trainer' | 'Student'
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedStudent, setSelectedStudent] = useState('Riya Joshi');

  // Job Portal States
  const [jobSearch, setJobSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  // Resume Builder States
  const [jdText, setJdText] = useState('');
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);

  // Interactive Header Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Sample Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Interview Scheduled", desc: "Barclays scheduled your interview for tomorrow at 2:00 PM.", time: "10m ago", unread: true },
    { id: 2, title: "AI Auto-Apply Success", desc: "Successfully applied to Deloitte India for Financial Analyst.", time: "1h ago", unread: true },
    { id: 3, title: "Profile Match Updated", desc: "Your resume match score increased to 95% for top tech roles.", time: "1d ago", unread: false }
  ]);

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  // Handle Login Flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50/60 font-sans text-slate-800">
        {/* Left Dark Hero Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 via-white to-sky-50 text-slate-900 p-8 md:p-12 flex flex-col justify-between min-h-[300px] md:min-h-screen border-r border-slate-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
              F
            </div>
            <span className="font-semibold text-sm tracking-wide">Finxl Placement Platform</span>
          </div>

          <div className="my-auto max-w-lg py-12">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Get every student Job ready automatically.
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-normal">
              JD to resume, AI mock interviews and mentor scheduling - all in one platform.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            © 2026 Finxl Placement Platform. All rights reserved.
          </div>
        </div>

        {/* Right Authentication Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign-in to your Finxl Placement account
              </p>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAuthenticated(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Email or User ID
                </label>
                <input
                  type="email"
                  defaultValue="john12@gmail.com"
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  required
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-slate-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-105 text-white font-semibold py-2.5 rounded-xl text-xs transition shadow-md shadow-blue-500/20"
              >
                Sign In
              </button>
            </form>
            
            <div className="relative my-4 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-slate-50 px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider absolute">
                OR
              </span>
            </div>

            <button
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Items Sidebar (Fixed syntax)
  const navigationItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Student List', icon: Users },
    { name: 'Batches', icon: Users },
    { name: 'Live Mocks', icon: Video },
    { name: 'Student Profile', icon: UserCheck },
    { name: 'Learning Modules', icon: BookOpen },
    { name: 'Job Portal', icon: Briefcase },
    { name: 'Progress Reports', icon: BarChart2 },
    { name: 'Resume Builder', icon: FileText },
    { name: 'QnA Generator', icon: QnAIcon },
    { name: 'Company', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans flex text-slate-800">
      {/* Sidebar Component */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/80 flex flex-col justify-between hidden md:flex shrink-0 shadow-sm">
        <div>
          {/* Logo Brand */}
          <div className="p-5 flex items-center space-x-3 border-b border-slate-200/80">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
              F
            </div>
            <div>
              <h1 className="font-bold text-xs text-slate-900 leading-tight">
                Finxl Placement
              </h1>
              <span className="text-[10px] text-slate-400 block font-medium">Platform</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-slate-500 hover:bg-blue-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">Admin User</p>
              <span className="text-[10px] text-slate-400 font-medium">admin@finxl.com</span>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-slate-400 hover:text-blue-600 transition p-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main App Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
          {/* Search Bar Input */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, jobs, sessions..."
              className="w-full bg-slate-50/80 border border-slate-200/80 text-xs pl-9 pr-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/30 text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Top Actions */}
          <div className="flex items-center space-x-4 relative">
            
            {/* Notification Dropdown Component */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileModal(false);
                }}
                className="relative text-slate-500 hover:text-blue-700 transition p-1.5 rounded-lg hover:bg-blue-50 shadow-sm"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-blue-600" /> Notifications
                    </h3>
                    <button 
                      onClick={markAllNotificationsRead} 
                      className="text-[10px] text-blue-600 font-semibold hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-2.5 rounded-xl border transition text-left ${notif.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                          <span className="text-[9px] text-slate-400">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{notif.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Dropdown Component */}
            <div className="relative pl-2 border-l border-slate-200/80">
              <button 
                onClick={() => {
                  setShowProfileModal(!showProfileModal);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 focus:outline-none rounded-full ring-2 ring-transparent hover:ring-blue-500/30 transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="User Avatar"
                  className="w-7 h-7 rounded-full object-cover shadow-sm"
                />
              </button>

              {showProfileModal && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2 text-left">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Admin User</h4>
                      <p className="text-[10px] text-slate-400">admin@finxl.com</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-medium text-slate-600">
                    <button onClick={() => { alert("Opening Profile Settings..."); setShowProfileModal(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Profile
                    </button>
                    <button onClick={() => { alert("Opening Edit Options..."); setShowProfileModal(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                      <Pencil className="w-3.5 h-3.5 text-slate-500" /> Edit Profile
                    </button>
                    <button onClick={() => { alert("Opening Password Change..."); setShowProfileModal(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                      <Lock className="w-3.5 h-3.5 text-amber-500" /> Password Change
                    </button>
                    <button onClick={() => { alert("Opening Settings..."); setShowProfileModal(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                      <Settings className="w-3.5 h-3.5 text-indigo-500" /> Settings
                    </button>
                    <button onClick={() => { alert("Opening Switch Accounts..."); setShowProfileModal(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition">
                      <Repeat className="w-3.5 h-3.5 text-emerald-600" /> Switch Accounts
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        setShowProfileModal(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold py-2 rounded-xl transition"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Dynamic Main Workspace Content */}
        <main className="app-content flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'Overview' && <OverviewPage setActiveTab={setActiveTab} />}
          {activeTab === 'Student List' && (
            <StudentListPage
              setActiveTab={setActiveTab}
              setSelectedStudent={setSelectedStudent}
            />
          )}
          {activeTab === 'Batches' && <Batches />}
          {activeTab === 'Live Mocks' && <LiveMocksPage />}
          {activeTab === 'Student Profile' && (
            <StudentProfilePage studentName={selectedStudent} />
          )}
          {activeTab === 'Learning Modules' && <LearningModulesPage />}
          {activeTab === 'Job Portal' && (
            <JobPortalPage
              setSelectedJob={setSelectedJob}
              selectedJob={selectedJob}
            />
          )}
          {activeTab === 'Progress Reports' && <ProgressReportsPage />}
          {activeTab === 'Resume Builder' && (
            <ResumeBuilderPage
              jdText={jdText}
              setJdText={setJdText}
              isGeneratingResume={isGeneratingResume}
              setIsGeneratingResume={setIsGeneratingResume}
              resumeGenerated={resumeGenerated}
              setResumeGenerated={setResumeGenerated}
            />
          )}
          {activeTab === 'QnA Generator' && <QNAGeneratorPage />}
          {activeTab === 'Company' && <JobsCompanyDetailsSection setActiveTab={setActiveTab} />}
        </main>
      </div>

      {/* Double Verification Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Are you sure?</h3>
              <p className="text-xs text-slate-500">
                You will be signed out of your Finxl Placement account and redirected to the login screen.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  setIsAuthenticated(false);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-sm shadow-rose-600/20"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}