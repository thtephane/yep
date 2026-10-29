import React from 'react';
import { BookOpen, Check, Target, Trophy, Download } from 'lucide-react';
import { Course } from '../../types';

interface MyProgressViewProps {
  courses: Course[];
  onDownloadRecord: () => void;
}

export const MyProgressView: React.FC<MyProgressViewProps> = ({ courses, onDownloadRecord }) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Title & Download Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Progress</h1>
          <p className="text-sm text-slate-500 mt-1">
            See your growth across learning, projects, and achievements.
          </p>
        </div>

        <button
          onClick={onDownloadRecord}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Download record</span>
        </button>
      </div>

      {/* 4 Stat Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">68%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Course completion</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">24</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Lessons completed</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">2</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Projects contributed</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF2FB] text-blue-700 flex items-center justify-center mb-6">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">7 days</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Current streak</div>
          </div>
        </div>
      </div>

      {/* Two-column Course progress & Latest achievement */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Course Progress list */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Course progress</h2>

          <div className="space-y-6">
            {courses.map((c, idx) => (
              <div key={c.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">{c.category}</div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">{c.progressPercent}%</span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      idx === 0 ? 'bg-blue-600' : 'bg-rose-500'
                    }`}
                    style={{ width: `${c.progressPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Latest Achievement Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Trophy className="w-7 h-7 text-amber-500" />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
              LATEST ACHIEVEMENT
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Digital Explorer</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Completed your first five Digital Literacy lessons.
            </p>
            <div className="text-[11px] text-blue-700 font-medium mt-3">
              Earned 10 May 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
