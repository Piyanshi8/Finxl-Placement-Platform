import React, { useState } from 'react';
import { Plus, Search, ChevronRight, SlidersHorizontal, Users } from 'lucide-react';

// =---------------- STUDENT LIST PAGE ----------------=
export default function StudentListPage({ setActiveTab, setSelectedStudent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [eligibilityFilter, setEligibilityFilter] = useState('All');

  const students = [
    { id: 'D321', name: 'Riya Joshi', course: 'DSA', batch: 'D-08', mocksAttended: '8', score: '81%', status: 'YES' },
    { id: 'D322', name: 'Aarav Patel', course: 'Financial Modeling', batch: 'D-08', mocksAttended: '12', score: '88%', status: 'YES' },
    { id: 'D323', name: 'Siddharth Rao', course: 'Corporate Finance', batch: 'D-07', mocksAttended: '5', score: '58%', status: 'NO' },
    { id: 'D324', name: 'Neha Sharma', course: 'Equity Research', batch: 'D-08', mocksAttended: '10', score: '85%', status: 'YES' },
    { id: 'D325', name: 'Karan Mehta', course: 'DSA', batch: 'D-06', mocksAttended: '7', score: '72%', status: 'YES' },
  ];

  // Filtering logic for the search and dropdowns
  const filteredStudents = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'All' || st.course === courseFilter;
    const matchesEligibility = eligibilityFilter === 'All' || st.status === eligibilityFilter;
    return matchesSearch && matchesCourse && matchesEligibility;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn pb-12">
      
      {/* Top Header Banner with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-br from-white via-blue-50/70 to-sky-50/70 p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 text-slate-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">All Students Directory</h1>
          </div>
          <p className="text-xs text-slate-600 pl-10">Manage active student evaluations, placement mock scores, and criteria eligibility.</p>
        </div>
        
        <button 
          onClick={() => alert("Trigger Add Student Modal or Form")}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-105 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 active:scale-95 group"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filter Toolbar with Search & Dropdowns */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold px-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select 
            onChange={(e) => setCourseFilter(e.target.value.replace('Course: ', ''))}
            className="bg-slate-50/80 hover:bg-blue-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none transition cursor-pointer shadow-sm"
          >
            <option>Course: All</option>
            <option>DSA</option>
            <option>Financial Modeling</option>
            <option>Corporate Finance</option>
            <option>Equity Research</option>
          </select>

          <select 
            className="bg-slate-50/80 hover:bg-blue-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none transition cursor-pointer shadow-sm"
          >
            <option>Students: All</option>
          </select>

          <select 
            onChange={(e) => {
              const val = e.target.value;
              if (val.includes('YES')) setEligibilityFilter('YES');
              else if (val.includes('NO')) setEligibilityFilter('NO');
              else setEligibilityFilter('All');
            }}
            className="bg-slate-50/80 hover:bg-blue-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 outline-none transition cursor-pointer shadow-sm"
          >
            <option>Eligibility: All</option>
            <option>Eligible (YES)</option>
            <option>Not Eligible (NO)</option>
          </select>
        </div>
      </div>

      {/* Student Table Card */}
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-400 text-[11px] font-bold border-b border-slate-100 tracking-wider uppercase">
              <tr>
                <th className="py-4 px-5">Student ID</th>
                <th className="py-4 px-5">Student Name</th>
                <th className="py-4 px-5">Course</th>
                <th className="py-4 px-5">Batch</th>
                <th className="py-4 px-5">Mocks Attended</th>
                <th className="py-4 px-5">Avg Score</th>
                <th className="py-4 px-5">Eligibility</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      setSelectedStudent(st.name);
                      setActiveTab('Student Profile');
                    }}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors duration-200 group"
                  >
                    <td className="py-4 px-5 text-blue-600 font-mono font-bold">{st.id}</td>
                    <td className="py-4 px-5 font-bold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">
                        {st.name.charAt(0)}
                      </div>
                      {st.name}
                    </td>
                    <td className="py-4 px-5">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-blue-100">
                        {st.course}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-semibold text-slate-600">{st.batch}</td>
                    <td className="py-4 px-5 text-slate-600">{st.mocksAttended} Sessions</td>
                    <td className="py-4 px-5 font-bold text-slate-900">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        {st.score}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          st.status === 'YES'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm'
                            : 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 inline-flex items-center justify-center transition-all ml-auto">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Showing <strong className="text-slate-700">1-{filteredStudents.length}</strong> of total students</span>
          <div className="flex items-center gap-2">
            <button disabled className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-4 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-105 font-semibold rounded-lg transition text-white shadow-md shadow-blue-500/20">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}