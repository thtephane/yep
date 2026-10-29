import React, { useState } from 'react';
import { Upload, Check } from 'lucide-react';
import { ProgramRecord } from '../../types';

interface CreateProgramWizardProps {
  onCancel: () => void;
  onProgramCreated: (prog: ProgramRecord) => void;
}

export const CreateProgramWizard: React.FC<CreateProgramWizardProps> = ({
  onCancel,
  onProgramCreated,
}) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Digital Literacy');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('Live session (webinar)');
  const [leadMentor, setLeadMentor] = useState('Daniel K.');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const newP: ProgramRecord = {
        id: `prog_${Date.now()}`,
        title: title || 'New East Africa Youth Cohort',
        category: category,
        leadMentor: leadMentor,
        registeredCount: 0,
        status: 'upcoming',
        dateString: '1 Jun',
        day: '01',
        month: 'Jun',
        timeSlot: '3:00 PM – 4:30 PM · Online',
        format: format,
      };
      onProgramCreated(newP);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">Create Program</h1>
        <p className="text-sm text-slate-500 mt-1">
          Create and assign a learning experience for a YEP cohort.
        </p>
      </div>

      {/* 4-Step Stepper matching screenshot */}
      <div className="flex items-center justify-center max-w-xl mx-auto py-4">
        {[
          { num: 1, label: 'Program info' },
          { num: 2, label: 'Content' },
          { num: 3, label: 'Assignment' },
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
              {/* Program title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Program title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter program title"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Program category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Program category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                >
                  <option value="Digital Literacy">Digital Literacy</option>
                  <option value="AI for Youth">AI for Youth</option>
                  <option value="Career Development">Career Development</option>
                  <option value="Climate Action">Climate Action</option>
                  <option value="AgriTech Innovation">AgriTech Innovation</option>
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
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the program goals and learning outcomes..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div className="space-y-5">
                {/* Delivery format */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Delivery format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Live session (webinar)">Live session (webinar)</option>
                    <option value="Self-paced cohort">Self-paced cohort</option>
                    <option value="Hybrid workshop">Hybrid workshop</option>
                  </select>
                </div>

                {/* Lead mentor */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Lead mentor
                  </label>
                  <select
                    value={leadMentor}
                    onChange={(e) => setLeadMentor(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="Daniel K.">Daniel K. (Digital Literacy)</option>
                    <option value="Ruth A.">Ruth A. (AI & Ethics)</option>
                    <option value="Moses T.">Moses T. (Career Readiness)</option>
                  </select>
                </div>

                {/* Cover image */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Cover image</span>
                    <span className="text-slate-400 font-normal">(optional)</span>
                  </div>

                  <div className="border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-2xl p-5 text-center text-xs cursor-pointer hover:bg-blue-50/40 transition-colors">
                    <Upload className="w-5 h-5 mx-auto text-blue-600 mb-1" />
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
            <h3 className="text-base font-bold text-slate-900">Curriculum & Course Tracks</h3>
            <p className="text-xs text-slate-500">Attach modular syllabus and virtual exchange benchmarks.</p>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
              <div className="font-semibold text-slate-800">Track 1: Foundation (Weeks 1–3)</div>
              <div className="text-slate-600">Digital safety, information verification, and team communication.</div>
              <div className="font-semibold text-slate-800 pt-1">Track 2: Level 2 Impact Project (Weeks 4–8)</div>
              <div className="text-slate-600">Cross-border student team formation and local community problem-solving.</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 max-w-lg mx-auto py-4">
            <h3 className="text-base font-bold text-slate-900">Target Cohort & Regional Hubs</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <label className="p-3 border rounded-xl flex items-center gap-2 cursor-pointer bg-blue-50/50 border-blue-200">
                <input type="checkbox" defaultChecked className="text-blue-600 rounded" />
                <span>Kampala Central & Suburban</span>
              </label>
              <label className="p-3 border rounded-xl flex items-center gap-2 cursor-pointer bg-blue-50/50 border-blue-200">
                <input type="checkbox" defaultChecked className="text-blue-600 rounded" />
                <span>Jinja & Eastern Hub</span>
              </label>
              <label className="p-3 border rounded-xl flex items-center gap-2 cursor-pointer bg-blue-50/50 border-blue-200">
                <input type="checkbox" defaultChecked className="text-blue-600 rounded" />
                <span>Gulu & Northern Region</span>
              </label>
              <label className="p-3 border rounded-xl flex items-center gap-2 cursor-pointer bg-blue-50/50 border-blue-200">
                <input type="checkbox" defaultChecked className="text-blue-600 rounded" />
                <span>Mbarara & Western Uganda</span>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 max-w-lg mx-auto py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ready to Publish Program</h3>
            <p className="text-xs text-slate-500">
              The program will be published into the YEP Catalog and opened for youth applicant enrollment.
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
            {step === 4 ? 'Publish Program' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
