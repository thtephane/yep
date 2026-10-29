import React from 'react';
import { BookOpen, GraduationCap, Target, Trophy, Calendar, ChevronRight, Play } from 'lucide-react';
import { Course, LectureSession } from '../../types';

interface StudentDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onOpenCourse: (course: Course) => void;
  onJoinSession: (session: LectureSession) => void;
  courses: Course[];
  upcomingSessions: LectureSession[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenCourse,
  onJoinSession,
  courses,
  upcomingSessions,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Greeting Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Hello, Amina
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep going—you're building skills that create change.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-400">
          Mon, 12 May 2025
        </div>
      </div>

      {/* 4 Stat Cards matching screenshot layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">3</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Active courses</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">68%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Overall progress</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">2</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Active projects</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">7</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Day learning streak</div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Continue learning</h2>
          <button
            onClick={() => onNavigateTab('learning')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {courses.slice(0, 2).map((course, idx) => (
            <div
              key={course.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF2FB] text-blue-800 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{course.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Next: {course.nextLessonTitle}</p>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-36 sm:w-48 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          idx === 0 ? 'bg-blue-600' : 'bg-rose-500'
                        }`}
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">
                      {course.progressPercent}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenCourse(course)}
                className="px-6 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Upcoming sessions</h2>
          <button
            onClick={() => onNavigateTab('learning')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onJoinSession(session)}
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
