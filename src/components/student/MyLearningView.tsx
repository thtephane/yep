import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Bookmark, Clock, Users } from 'lucide-react';
import { Course } from '../../types';

interface MyLearningViewProps {
  courses: Course[];
  onOpenCourse: (course: Course) => void;
}

export const MyLearningView: React.FC<MyLearningViewProps> = ({ courses, onOpenCourse }) => {
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'in_progress') return c.progressPercent < 100;
    if (activeTab === 'completed') return c.progressPercent >= 100;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Learning</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore your courses, live sessions, and saved learning.
        </p>
      </div>

      {/* Tabs matching screenshot */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'in_progress'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          In progress
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'completed'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'saved'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Saved
        </button>
      </div>

      {/* Grid of Course Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => {
          const lessonsLeft = course.totalLessons - course.completedLessons;
          const bannerGradient =
            idx === 0
              ? 'from-[#193A5E] to-[#254F7D]'
              : idx === 1
              ? 'from-[#426588] to-[#587B9F]'
              : 'from-[#3E6C60] to-[#518577]';

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Top Banner with book and badge */}
              <div
                className={`h-36 bg-linear-to-r ${bannerGradient} p-5 flex items-start justify-between text-white relative`}
              >
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-medium tracking-wide">
                  {course.category}
                </span>

                <BookOpen className="w-6 h-6 text-white/90" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    {course.totalLessons} lessons · Mentor {course.mentorName}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{course.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Next up: {course.nextLessonTitle}
                  </p>
                </div>

                {/* Progress & Lessons left */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{course.progressPercent}% complete</span>
                    <span className="text-slate-400 font-normal">{lessonsLeft} lessons left</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        idx === 0 ? 'bg-blue-600' : 'bg-rose-500'
                      }`}
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onOpenCourse(course)}
                  className="w-full py-3 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
                >
                  Continue learning
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
