import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';

interface MyProjectsViewProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const MyProjectsView: React.FC<MyProjectsViewProps> = ({ projects, onOpenProject }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Projects</h1>
        <p className="text-sm text-slate-500 mt-1">
          Turn your learning into practical solutions for your community.
        </p>
      </div>

      {/* Grid of Project Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => {
          const bannerGradient =
            idx === 0
              ? 'from-[#193A5E] to-[#254F7D]'
              : 'from-[#3E6C60] to-[#518577]';

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Top Banner with target icon & tag */}
              <div
                className={`h-36 bg-linear-to-r ${bannerGradient} p-5 flex items-start justify-between text-white relative`}
              >
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>

                <span className="text-xs text-white/90 font-medium">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Status pill */}
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-3 ${
                      project.status === 'in_progress'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {project.status === 'in_progress' ? 'In progress' : 'Planning'}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Next task: {project.nextTask}</span>
                  </div>
                </div>

                {/* Progress bar & due date */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{project.progressPercent}% complete</span>
                    <span className="text-slate-400 font-normal">Due {project.dueDate}</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        idx === 0 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onOpenProject(project)}
                  className="w-full py-3 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer text-center"
                >
                  {idx === 0 ? 'Project workspace open' : 'Open project'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
