import React, { useState } from 'react';
import { Plus, Clock, MoreVertical, Play, Calendar } from 'lucide-react';
import { LectureSession } from '../../types';

interface MyLecturesViewProps {
  lectures: LectureSession[];
  onCreateClick: () => void;
  onStartLecture: (session: LectureSession) => void;
}

export const MyLecturesView: React.FC<MyLecturesViewProps> = ({
  lectures,
  onCreateClick,
  onStartLecture,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'drafts'>('upcoming');

  const filtered = lectures.filter((l) => {
    if (activeTab === 'upcoming') return l.isUpcoming;
    if (activeTab === 'past') return !l.isUpcoming && l.status === 'past';
    if (activeTab === 'drafts') return l.status === 'draft';
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Create Lecture Button matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Lectures</h1>
          <p className="text-sm text-slate-500 mt-1">
            Plan, host, and revisit your learning sessions.
          </p>
        </div>

        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create lecture</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'upcoming'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Upcoming (3)
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'past'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Past (12)
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
            activeTab === 'drafts'
              ? 'text-blue-900 font-bold border-b-2 border-blue-900'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Drafts (2)
        </button>
      </div>

      {/* Lectures List matching screenshot */}
      <div className="space-y-4">
        {filtered.map((lecture) => (
          <div
            key={lecture.id}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            {/* Left: Date box & Details */}
            <div className="flex items-start gap-5">
              {/* Date Box matching screenshot */}
              <div className="w-16 h-18 rounded-2xl bg-[#EAF2FB] flex flex-col items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-slate-900">{lecture.day}</span>
                <span className="text-xs text-slate-500 font-medium">{lecture.month}</span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900">{lecture.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{lecture.timeSlot} · Online</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-medium">
                    {lecture.courseTopic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                    {lecture.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Registered count & Start button */}
            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
              <div className="text-right">
                <div className="text-base font-bold text-slate-900">{lecture.registeredCount}</div>
                <div className="text-[11px] text-slate-400">Registered</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartLecture(lecture)}
                  className="px-6 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Start
                </button>

                <button
                  onClick={() => alert('Options: Edit session, Export attendee list, Cancel.')}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
