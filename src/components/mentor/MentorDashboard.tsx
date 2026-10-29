import React from 'react';
import { Users, BookOpen, Calendar, GraduationCap, ChevronRight, Play } from 'lucide-react';
import { LectureSession } from '../../types';

interface MentorDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onStartLecture: (session: LectureSession) => void;
  upcomingLectures: LectureSession[];
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  onNavigateTab,
  onStartLecture,
  upcomingLectures,
}) => {
  const recentActivity = [
    { name: 'Amina N.', initials: 'AN', text: 'completed Digital Literacy Quiz', time: '10 min ago' },
    { name: 'John K.', initials: 'JK', text: 'submitted an assignment', time: '2 hours ago' },
    { name: 'Sarah M.', initials: 'SM', text: 'joined AI for Youth course', time: '3 hours ago' },
    { name: 'David O.', initials: 'DO', text: 'asked a question in discussion', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Greeting Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Hello, Daniel
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Thank you for making a difference!
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
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">My students</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">6</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Active courses</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">3</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Upcoming lectures</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">92%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Student engagement</div>
          </div>
        </div>
      </div>

      {/* Recent Student Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent student activity</h2>
          <button
            onClick={() => onNavigateTab('student_progress')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {recentActivity.map((act, idx) => (
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

      {/* Upcoming Lectures Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Upcoming lectures</h2>
          <button
            onClick={() => onNavigateTab('lectures')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {upcomingLectures.map((session) => (
            <div
              key={session.id}
              onClick={() => onStartLecture(session)}
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
