import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { StudentProgressRecord } from '../../types';

interface StudentProgressViewProps {
  students: StudentProgressRecord[];
  onExport: () => void;
  onViewStudent: (student: StudentProgressRecord) => void;
}

export const StudentProgressView: React.FC<StudentProgressViewProps> = ({
  students,
  onExport,
  onViewStudent,
}) => {
  const [reportingPeriod, setReportingPeriod] = useState('Last 30 days');

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Export Action matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Student Progress</h1>
          <p className="text-sm text-slate-500 mt-1">
            See where learners are thriving and where they need support.
          </p>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export</span>
        </button>
      </div>

      {/* Reporting Period Filter */}
      <div className="flex items-center justify-end gap-3 text-xs">
        <span className="text-slate-500 font-medium">Reporting period</span>
        <select
          value={reportingPeriod}
          onChange={(e) => setReportingPeriod(e.target.value)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden focus:border-blue-600"
        >
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 90 days">Last 90 days</option>
          <option value="All time">All time</option>
        </select>
      </div>

      {/* Table matching screenshot */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4 sm:px-6">NAME</th>
                <th className="p-4">COURSE</th>
                <th className="p-4 w-48">PROGRESS</th>
                <th className="p-4">LAST ACTIVITY</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right sm:pr-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {students.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name + avatar */}
                  <td className="p-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#9bbddb] to-[#b8d4ea] text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {std.initials}
                      </div>
                      <span className="font-bold text-slate-900">{std.name}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="p-4 text-slate-600">{std.courseName}</td>

                  {/* Progress bar */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            std.status === 'at_risk'
                              ? 'bg-rose-500'
                              : std.progressPercent < 70
                              ? 'bg-amber-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${std.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">{std.progressPercent}%</span>
                    </div>
                  </td>

                  {/* Last Activity */}
                  <td className="p-4 text-slate-500">{std.lastActivity}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        std.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {std.status === 'active' ? 'Active' : 'At risk'}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right sm:pr-6">
                    <button
                      onClick={() => onViewStudent(std)}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
