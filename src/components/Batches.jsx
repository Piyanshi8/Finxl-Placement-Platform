import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  MoreVertical,
  ChevronRight,
  PieChart as PieIcon
} from 'lucide-react';

export default function Batches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduleFilter, setScheduleFilter] = useState('All'); // 'All', 'Weekday', 'Weekend'

  // Sample data with total students and actual headcount breakdown across metrics
  const batches = [
    {
      id: 1,
      code: 'FIN-04',
      name: 'Financial Modeling & Valuation',
      trainer: 'Arjun Mehta',
      type: 'Weekday',
      schedule: 'Mon, Wed, Fri',
      time: '10:00 AM - 12:00 PM',
      status: 'Ongoing',
      totalStudents: 40,
      metrics: {
        completed: 18, // Course Completed
        mockGiven: 12, // Giving Mocks
        regular: 7,    // Regular to Classes
        absent: 3      // Absent / Lagging
      }
    },
    {
      id: 2,
      code: 'CFA-01',
      name: 'CFA Level 1 Intensive Batch',
      trainer: 'Sara Joshi',
      type: 'Weekend',
      schedule: 'Sat & Sun',
      time: '02:00 PM - 05:00 PM',
      status: 'Ongoing',
      totalStudents: 50,
      metrics: {
        completed: 20,
        mockGiven: 15,
        regular: 10,
        absent: 5
      }
    },
    {
      id: 3,
      code: 'PBI-02',
      name: 'Power BI & Advanced Excel',
      trainer: 'Dev Tripathi',
      type: 'Weekday',
      schedule: 'Mon - Fri',
      time: '05:00 PM - 06:30 PM',
      status: 'Upcoming',
      totalStudents: 35,
      metrics: {
        completed: 10,
        mockGiven: 12,
        regular: 8,
        absent: 5
      }
    },
    {
      id: 4,
      code: 'INV-09',
      name: 'Investment Banking & M&A',
      trainer: 'Neha Sharma',
      type: 'Weekend',
      schedule: 'Sat & Sun',
      time: '10:00 AM - 01:00 PM',
      status: 'Completed',
      totalStudents: 45,
      metrics: {
        completed: 30,
        mockGiven: 10,
        regular: 3,
        absent: 2
      }
    },
  ];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          batch.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          batch.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = scheduleFilter === 'All' || batch.type === scheduleFilter;
    return matchesSearch && matchesFilter;
  });

  // Helper function to generate SVG Pie Chart paths dynamically based on headcount values
  const renderPieChart = (metrics, total) => {
    const compVal = metrics.completed / total;
    const mockVal = metrics.mockGiven / total;
    const regVal = metrics.regular / total;
    const absVal = metrics.absent / total;

    const getCoordinatesForPercent = (percent) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };

    let cumulativePercent = 0;
    const getSlicePath = (percent) => {
      if (percent <= 0) return '';
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = percent > 0.5 ? 1 : 0;
      return `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
        {/* Huge SVG Donut Chart with Total Headcount in Center */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full -rotate-90 drop-shadow-sm">
            {/* Completed Course Slice */}
            <path d={getSlicePath(compVal)} fill="#10B981" className="transition-all hover:opacity-90" />
            {/* Giving Mocks Slice */}
            <path d={getSlicePath(mockVal)} fill="#3B82F6" className="transition-all hover:opacity-90" />
            {/* Regular to Classes Slice */}
            <path d={getSlicePath(regVal)} fill="#8B5CF6" className="transition-all hover:opacity-90" />
            {/* Absent / Needs Attention Slice */}
            <path d={getSlicePath(absVal)} fill="#F59E0B" className="transition-all hover:opacity-90" />
            {/* Inner Hollow Circle for Donut Effect */}
            <circle cx="0" cy="0" r="0.65" fill="white" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total</span>
            <span className="text-sm font-bold text-slate-800">{total} Students</span>
          </div>
        </div>

        {/* Headcount Legend Grid */}
        <div className="grid grid-cols-1 gap-2 w-full">
          <div className="flex items-center justify-between bg-emerald-50/60 px-3 py-1.5 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm" />
              <span className="text-xs font-semibold text-slate-700">Completed Course</span>
            </div>
            <span className="text-xs font-bold text-emerald-700">{metrics.completed} / {total}</span>
          </div>

          <div className="flex items-center justify-between bg-blue-50/60 px-3 py-1.5 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm" />
              <span className="text-xs font-semibold text-slate-700">Giving Mocks</span>
            </div>
            <span className="text-xs font-bold text-blue-700">{metrics.mockGiven} / {total}</span>
          </div>

          <div className="flex items-center justify-between bg-purple-50/60 px-3 py-1.5 rounded-xl border border-purple-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
              <span className="text-xs font-semibold text-slate-700">Regular to Classes</span>
            </div>
            <span className="text-xs font-bold text-purple-700">{metrics.regular} / {total}</span>
          </div>

          <div className="flex items-center justify-between bg-amber-50/60 px-3 py-1.5 rounded-xl border border-amber-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
              <span className="text-xs font-semibold text-slate-700">Absent / Irregular</span>
            </div>
            <span className="text-xs font-bold text-amber-700">{metrics.absent} / {total}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Batches</h1>
          <p className="text-sm text-slate-500 mt-1">Track student attendance, mock participation, and course completion headcount.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 hover:opacity-95 transition">
          <Plus size={18} />
          Create New Batch
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium">Total Batches</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium">Weekday Batches</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">8</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Calendar size={22} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 font-medium">Weekend Batches</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">4</h3>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Search and Weekday/Weekend Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by code, batch or trainer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'Weekday', 'Weekend'].map((filter) => (
            <button
              key={filter}
              onClick={() => setScheduleFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                scheduleFilter === filter 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {filter === 'All' ? 'All Batches' : `${filter}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => {
          const statusColor = 
            batch.status === 'Ongoing' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
            batch.status === 'Upcoming' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
            'bg-slate-100 text-slate-600 border-slate-200';

          const typeColor = batch.type === 'Weekday' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600';

          return (
            <div key={batch.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition flex flex-col justify-between">
              <div>
                {/* Header with Batch Code & Status */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {batch.code}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${typeColor}`}>
                      {batch.type}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusColor}`}>
                      {batch.status}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mt-2">{batch.name}</h3>
                <p className="text-sm text-slate-500 mb-4">Trainer: <span className="font-medium text-slate-700">{batch.trainer}</span></p>

                {/* Schedule info */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl text-xs text-slate-600 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{batch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span>{batch.time}</span>
                  </div>
                </div>

                {/* Pie Chart Section with Student Headcounts */}
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
                    <PieIcon size={16} className="text-blue-600" />
                    <span>Student Status Breakdown (Headcount)</span>
                  </div>
                  {renderPieChart(batch.metrics, batch.totalStudents)}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Overall Batch Health: Optimal</span>
                <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">
                  View Batch Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
