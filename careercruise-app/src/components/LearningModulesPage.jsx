import React, { useState } from 'react';
import { 
  BookOpen, Clock, CheckCircle2, PlayCircle, ArrowLeft, 
  FileText, Award, BarChart, ChevronRight, Lock, Sparkles 
} from 'lucide-react';

// Enhanced Mock Data for Courses and their respective modules/lessons
const COURSES_DATA = [
  {
    id: 1,
    title: "Financial Modeling & Valuation",
    description: "Learn how to build integrated 3-statement financial models, discounted cash flow (DCF) valuation, and LBO models from scratch.",
    category: "Finance",
    instructor: "Rahul Sharma",
    progress: 85,
    totalLessons: 18,
    totalHours: "12 Hours",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600",
    modules: [
      {
        id: "m1",
        title: "Module 1: Introduction to Financial Statements",
        lessons: [
          { id: "l1", title: "Understanding the Income Statement", duration: "45 mins", completed: true, content: "Detailed overview of revenue recognition, COGS, operating expenses, and EBITDA calculations." },
          { id: "l2", title: "Balance Sheet Mechanics & Working Capital", duration: "60 mins", completed: true, content: "Analyzing assets, liabilities, equity balances, and managing working capital cycles." },
          { id: "l3", title: "Cash Flow Statement Deep Dive", duration: "50 mins", completed: true, content: "Operating, investing, and financing cash flows reconciliation with income statements." }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Forecasting & Schedule Building",
        lessons: [
          { id: "l4", title: "Revenue & Expense Growth Drivers", duration: "55 mins", completed: true, content: "Top-down vs bottom-up forecasting approaches and historical trend analysis." },
          { id: "l5", title: "Depreciation Schedule & PP&E Roll-forward", duration: "40 mins", completed: false, content: "Building capital expenditure schedules and tracking asset depreciation over time." }
        ]
      },
      {
        id: "m3",
        title: "Module 3: DCF Valuation & Output Sheets",
        lessons: [
          { id: "l6", title: "Calculating Weighted Average Cost of Capital (WACC)", duration: "65 mins", completed: false, content: "Cost of equity, cost of debt, capital structure weights, and beta calculations." },
          { id: "l7", title: "Terminal Value: Exit Multiple & Gordon Growth", duration: "50 mins", completed: false, content: "Estimating long-term cash flow growth and selecting appropriate enterprise multiples." }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Corporate Finance & Capital Structure",
    description: "Master capital budgeting, cost of capital optimization, dividend policies, and corporate restructuring strategies.",
    category: "Strategy",
    instructor: "Ananya Deshmukh",
    progress: 60,
    totalLessons: 14,
    totalHours: "9 Hours",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    modules: [
      {
        id: "m201",
        title: "Module 1: Capital Budgeting Principles",
        lessons: [
          { id: "l201", title: "NPV, IRR, and Payback Period Analysis", duration: "50 mins", completed: true, content: "Evaluating project viability using discounted cash flow metrics." },
          { id: "l202", title: "Risk Analysis in Capital Budgeting", duration: "45 mins", completed: true, content: "Sensitivity analysis, scenario analysis, and simulation techniques." }
        ]
      },
      {
        id: "m202",
        title: "Module 2: Capital Structure Optimization",
        lessons: [
          { id: "l203", title: "Modigliani-Miller Theorem", duration: "60 mins", completed: false, content: "Understanding capital structure relevance with and without taxes." },
          { id: "l204", title: "Trade-off Theory & Cost of Financial Distress", duration: "50 mins", completed: false, content: "Balancing tax shields against bankruptcy and agency costs." }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Equity Research & Analysis",
    description: "Learn industry analysis, equity valuation methodologies, and how to write institutional-grade equity research reports.",
    category: "Investment Banking",
    instructor: "Vikram Malhotra",
    progress: 30,
    totalLessons: 22,
    totalHours: "16 Hours",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600",
    modules: [
      {
        id: "m301",
        title: "Module 1: Industry Analysis & Competitive Landscape",
        lessons: [
          { id: "l301", title: "Porter's Five Forces Framework", duration: "40 mins", completed: true, content: "Assessing industry attractiveness and competitive intensity." },
          { id: "l302", title: "SWOT & Business Model Evaluation", duration: "45 mins", completed: false, content: "Deconstructing core monetization engines of public corporations." }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Excel Advanced Macros & Power Query",
    description: "Automate financial workflows using VBA macros, Power Query data transformation, and dynamic dashboard creation.",
    category: "Technical Tools",
    instructor: "Neha Kulkarni",
    progress: 100,
    totalLessons: 10,
    totalHours: "8 Hours",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    modules: [
      {
        id: "m401",
        title: "Module 1: Power Query Automation",
        lessons: [
          { id: "l401", title: "Data Cleaning & Transformation Pipelines", duration: "50 mins", completed: true, content: "Importing multiple CSV files, unpivoting tables, and handling missing datasets." },
          { id: "l402", title: "Merge & Append Operations", duration: "45 mins", completed: true, content: "Relational joins across disparate financial data sources." }
        ]
      }
    ]
  }
];

export default function LearningModulesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  // Handle opening a course
  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    if (course.modules && course.modules[0]?.lessons[0]) {
      setActiveLesson(course.modules[0].lessons[0]);
    }
  };

  // --- VIEW 2: COURSE DETAIL / LESSON PLAYER VIEW ---
  if (selectedCourse) {
    return (
      <div className="space-y-6">
        {/* Top Header / Back Button */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl text-sm"
          >
            <ArrowLeft size={18} /> Back to Courses
          </button>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
              {selectedCourse.category}
            </span>
            <span className="text-sm font-medium text-slate-500">Instructor: {selectedCourse.instructor}</span>
          </div>
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left / Center: Lesson Content / Video Player Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="media-canvas relative bg-slate-900 aspect-video flex items-center justify-center text-white">
                <div className="absolute inset-0 opacity-40">
                  <img src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 text-center p-6 space-y-3">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer hover:bg-indigo-500 transition-all hover:scale-105">
                    <PlayCircle size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{activeLesson ? activeLesson.title : selectedCourse.title}</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">Duration: {activeLesson?.duration || selectedCourse.totalHours}</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{activeLesson?.title || "Course Overview"}</h2>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={14} /> {activeLesson?.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                <hr className="border-slate-100" />
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Lesson Notes & Summary</h4>
                  <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {activeLesson?.content || selectedCourse.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modules & Lessons Sidebar */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6 h-fit">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{selectedCourse.title}</h3>
              <p className="text-slate-500 text-xs mt-1">{selectedCourse.totalLessons} Lessons • {selectedCourse.totalHours}</p>
              
              {/* Progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Overall Progress</span>
                  <span>{selectedCourse.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${selectedCourse.progress}%` }}></div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Accordion / Module List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {selectedCourse.modules.map((mod) => (
                <div key={mod.id} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{mod.title}</h4>
                  <div className="space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isSelected = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full text-left p-3 rounded-2xl text-sm flex items-center justify-between transition-all ${
                            isSelected 
                              ? 'bg-indigo-50 text-indigo-900 font-semibold border border-indigo-100 shadow-sm' 
                              : 'hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                            ) : (
                              <PlayCircle size={16} className={`shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-slate-400 shrink-0 ml-2">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // --- VIEW 1: COURSES GRID VIEW ---
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Learning Modules</h1>
          <p className="text-slate-500 text-sm mt-1">Structured curriculum, technical frameworks, and assessment modules.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-2xl flex items-center gap-2">
            <Sparkles size={16} /> 4 Active Enrolments
          </span>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COURSES_DATA.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Thumbnail Header */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
                {course.category}
              </div>
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                {course.progress}% Completed
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="space-y-4">
                {/* Meta info */}
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><BookOpen size={14} /> {course.totalLessons} Lessons</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {course.totalHours}</span>
                  <span>Instructor: <strong className="text-slate-600">{course.instructor}</strong></span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleOpenCourse(course)}
                  className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                >
                  <span>Continue Module</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}