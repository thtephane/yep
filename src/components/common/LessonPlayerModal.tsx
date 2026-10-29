import React, { useState } from 'react';
import { X, CheckCircle, Play, BookOpen, HelpCircle, ArrowRight, ArrowLeft, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course, Lesson } from '../../types';

interface LessonPlayerModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteLesson: (courseId: string, lessonId: string) => void;
}

export const LessonPlayerModal: React.FC<LessonPlayerModalProps> = ({
  course,
  isOpen,
  onClose,
  onCompleteLesson,
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen || !course) return null;

  const currentLesson: Lesson = course.lessons[selectedLessonIndex] || course.lessons[0];

  const handleMarkComplete = () => {
    onCompleteLesson(course.id, currentLesson.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const nextLesson = () => {
    if (selectedLessonIndex < course.lessons.length - 1) {
      setSelectedLessonIndex(selectedLessonIndex + 1);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  const prevLesson = () => {
    if (selectedLessonIndex > 0) {
      setSelectedLessonIndex(selectedLessonIndex - 1);
      setQuizAnswer(null);
      setQuizSubmitted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:px-6 bg-[#0F2238] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                {course.category} · {course.level}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">{course.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-column Lesson Browser */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Lesson List Sidebar */}
          <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Course Modules ({course.completedLessons}/{course.totalLessons} Completed)
            </div>
            <div className="space-y-1.5">
              {course.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLessonIndex(idx);
                    setQuizAnswer(null);
                    setQuizSubmitted(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 ${
                    selectedLessonIndex === idx
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'hover:bg-slate-200/70 text-slate-700 bg-white border border-slate-200/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {lesson.completed ? (
                      <CheckCircle className={`w-4 h-4 ${selectedLessonIndex === idx ? 'text-white' : 'text-emerald-600'}`} />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] ${
                        selectedLessonIndex === idx ? 'border-white text-white' : 'border-slate-400 text-slate-500'
                      }`}>
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="leading-snug">{lesson.title}</div>
                    <div className={`text-[10px] mt-1 ${selectedLessonIndex === idx ? 'text-blue-100' : 'text-slate-400'}`}>
                      {lesson.durationMinutes} min · {lesson.type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Lesson Content Area */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase">Lesson {selectedLessonIndex + 1} of {course.lessons.length}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{currentLesson.title}</h3>
                </div>
                {currentLesson.completed && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Completed
                  </span>
                )}
              </div>

              {/* Simulated Interactive Media / Content Player */}
              <div className="rounded-2xl bg-linear-to-tr from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 font-medium">Virtual Exchange Video Lecture</span>
                  <span>Mentor: {course.mentorName}</span>
                </div>

                <div className="my-auto flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                  <p className="text-xs text-slate-300 mt-3 font-medium">
                    Optimized for low-bandwidth mobile streaming in East Africa
                  </p>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Duration: {currentLesson.durationMinutes} mins</span>
                  <span>Audio Language: English / Swahili / Luganda subtitles</span>
                </div>
              </div>

              {/* Lesson Summary & Notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lesson Learning Objectives</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {currentLesson.summary} This lesson reinforces practical youth empowerment capabilities, equipping you with hands-on skills for Level 2 collaborative regional impact projects.
                </p>
              </div>

              {/* Interactive Quick Knowledge Check */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Module Knowledge Check</span>
                </div>
                <p className="text-xs text-slate-700">
                  What is the primary guideline for responsible AI application in regional youth community initiatives?
                </p>

                <div className="space-y-2">
                  {[
                    'Using localized context, transparent disclosure, and human oversight.',
                    'Copying unverified outputs directly into community project briefs.',
                    'Relying solely on external automated decisions without community feedback.',
                  ].map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        quizAnswer === optIdx
                          ? optIdx === 0 && quizSubmitted
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-blue-100/70 border-blue-400 text-blue-900 font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        checked={quizAnswer === optIdx}
                        onChange={() => setQuizAnswer(optIdx)}
                        className="text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={quizAnswer === null}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Check Answer
                  </button>
                  {quizSubmitted && (
                    <span className="text-xs font-semibold text-emerald-700">
                      ✓ Correct! Localized context and ethical accountability are key.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={prevLesson}
                disabled={selectedLessonIndex === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleMarkComplete}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                  currentLesson.completed
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-[#152B42] text-white hover:bg-slate-800'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {currentLesson.completed ? 'Lesson Completed ✓' : 'Mark as Complete'}
              </button>

              <button
                onClick={nextLesson}
                disabled={selectedLessonIndex === course.lessons.length - 1}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
