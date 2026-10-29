import React, { useState } from 'react';
import { Upload, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { LectureSession } from '../../types';

interface CreateLectureWizardProps {
  onCancel: () => void;
  onLectureCreated: (newLecture: LectureSession) => void;
}

export const CreateLectureWizard: React.FC<CreateLectureWizardProps> = ({
  onCancel,
  onLectureCreated,
}) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [courseTopic, setCourseTopic] = useState('Digital Literacy');
  const [description, setDescription] = useState('');
  const [sessionType, setSessionType] = useState<'Webinar' | 'Workshop' | 'Clinic' | 'Live Session'>('Webinar');
  const [date, setDate] = useState('28 May 2025');
  const [time, setTime] = useState('2:00 PM – 3:30 PM');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Publish
      const newLec: LectureSession = {
        id: `lec_${Date.now()}`,
        title: title || 'New Virtual Exchange Lecture',
        day: '28',
        month: 'May',
        fullDate: date,
        timeSlot: time,
        type: sessionType,
        courseTopic: courseTopic,
        mentorName: 'Daniel K.',
        registeredCount: 1,
        capacity: 40,
        isUpcoming: true,
        status: 'upcoming',
      };
      onLectureCreated(newLec);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">Create Lecture</h1>
        <p className="text-sm text-slate-500 mt-1">
          Build a focused, engaging learning session.
        </p>
      </div>

      {/* 4-Step Stepper matching screenshot */}
      <div className="flex items-center justify-center max-w-xl mx-auto py-4">
        {[
          { num: 1, label: 'Basic info' },
          { num: 2, label: 'Content' },
          { num: 3, label: 'Schedule' },
          { num: 4, label: 'Publish' },
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s.num
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-[11px] font-medium mt-1.5 ${
                  step === s.num ? 'text-blue-700 font-bold' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>

            {idx < 3 && (
              <div
                className={`flex-1 h-0.5 mx-3 -mt-4 transition-colors ${
                  step > s.num ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Container Card matching screenshot */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-10 space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Title Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter lecture title"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Course / topic dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Course / topic
                </label>
                <select
                  value={courseTopic}
                  onChange={(e) => setCourseTopic(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                >
                  <option value="Digital Literacy">Digital Literacy</option>
                  <option value="AI for Youth">AI for Youth</option>
                  <option value="Career Readiness">Career Readiness</option>
                  <option value="Community Innovation">Community Innovation</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-start">
              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a brief description about your lecture..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 leading-relaxed"
                />
              </div>

              {/* Type and Image Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Type
                  </label>
                  <select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Webinar">Live session (webinar)</option>
                    <option value="Workshop">Interactive workshop</option>
                    <option value="Clinic">Q&A clinic / Office hours</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Cover image</span>
                    <span className="text-slate-400 font-normal">(optional)</span>
                  </div>

                  <div className="border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-2xl p-6 text-center text-xs cursor-pointer hover:bg-blue-50/40 transition-colors">
                    <Upload className="w-6 h-6 mx-auto text-blue-600 mb-1.5" />
                    <div className="font-bold text-blue-900">Upload image</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Recommended size 1600 × 900</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 max-w-lg mx-auto py-4">
            <h3 className="text-base font-bold text-slate-900">Lecture Materials & Discussion Prompts</h3>
            <p className="text-xs text-slate-500">Provide downloadable slides or discussion questions for breakout rooms.</p>
            <textarea
              rows={5}
              placeholder="List pre-reading materials, links, or discussion points..."
              className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
              defaultValue="• Overview of responsible AI principles in East Africa&#10;• Case study: Youth-led agricultural sensors in Uganda&#10;• Group activity: Ethical impact assessment matrix"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 max-w-lg mx-auto py-4">
            <h3 className="text-base font-bold text-slate-900">Schedule & Virtual Room</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Session Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot (EAT)</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 max-w-lg mx-auto py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ready to Publish</h3>
            <p className="text-xs text-slate-500">
              Your lecture &quot;{title || 'Digital Skills Workshop'}&quot; will be notified to 24 enrolled students in your cohort.
            </p>
          </div>
        )}

        {/* Footer actions matching screenshot */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={step === 1 ? onCancel : () => setStep(step - 1)}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-7 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {step === 4 ? 'Publish Lecture' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
