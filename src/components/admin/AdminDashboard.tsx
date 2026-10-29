import React from 'react';
import { GraduationCap, Users, BookOpen, Activity, ChevronRight, Calendar } from 'lucide-react';
import { LectureSession } from '../../types';

interface AdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onManageSession: (session: LectureSession) => void;
  upcomingSessions: LectureSession[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onManageSession,
  upcomingSessions,
}) => {
  const recentOrgActivity = [
    { name: 'Esther N.', initials: 'EN', text: 'submitted a mentor application', time: '10 min ago' },
    { name: 'John K.', initials: 'JK', text: 'was flagged for follow-up', time: '2 hours ago' },
    { name: 'Sarah M.', initials: 'SM', text: 'joined the Jinja 2025 cohort', time: '3 hours ago' },
    { name: 'Ruth A.', initials: 'RA', text: 'published a new program session', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Organization Overview Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Organization Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor YEP programs, people, and outcomes in one place.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-400">
          Mon, 12 May 2025
        </div>
      </div>

      {/* 4 Stat Cards matching screenshot layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">486</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Active students</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">32</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Active mentors</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">18</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Live programs</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">87%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Engagement rate</div>
          </div>
        </div>
      </div>

      {/* Recent Organization Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent organization activity</h2>
          <button
            onClick={() => onNavigateTab('reports')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {recentOrgActivity.map((act, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#9bbddb] to-[#b8d4ea] text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {act.initials}
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 mr-1.5">{act.name}</strong>
                  {act.text}
                </div>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0">{act.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Upcoming sessions</h2>
          <button
            onClick={() => onNavigateTab('programs')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onManageSession(session)}
              className="p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {session.title}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {session.fullDate} · {session.timeSlot}
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
