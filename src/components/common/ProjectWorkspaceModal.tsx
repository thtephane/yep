import React, { useState } from 'react';
import { X, Target, CheckSquare, Square, Users, MessageSquare, Plus, Upload, CheckCircle2, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, ProjectTask } from '../../types';

interface ProjectWorkspaceModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTasks: (projectId: string, tasks: ProjectTask[]) => void;
  onNavigateToMessages: () => void;
}

export const ProjectWorkspaceModal: React.FC<ProjectWorkspaceModalProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateTasks,
  onNavigateToMessages,
}) => {
  const [tasks, setTasks] = useState<ProjectTask[]>(project?.tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [submittedArtifact, setSubmittedArtifact] = useState(false);

  if (!isOpen || !project) return null;

  const toggleTask = (taskId: string) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    onUpdateTasks(project.id, updated);
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: ProjectTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle.trim(),
      assignedTo: 'Amina N.',
      completed: false,
      dueDate: '10 Jun 2025',
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setNewTaskTitle('');
    onUpdateTasks(project.id, updated);
  };

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedArtifact(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const taskProgress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-[#11253C] to-[#1E3E63] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Level 2 Virtual Exchange Project
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 font-semibold">
                  {project.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">{project.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Overview & Key Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-semibold text-slate-500">Cohort Team</div>
              <div className="text-base font-bold text-slate-900 mt-1">{project.teamName}</div>
              <div className="text-xs text-slate-500 mt-0.5">4 active East African collaborators</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-semibold text-slate-500">Target Beneficiaries</div>
              <div className="text-base font-bold text-slate-900 mt-1">
                {project.beneficiariesTarget.toLocaleString()} youth
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{project.communityLocation}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-semibold text-slate-500">Milestone Due Date</div>
              <div className="text-base font-bold text-slate-900 mt-1">{project.dueDate}</div>
              <div className="text-xs text-amber-600 font-semibold mt-0.5">Phase: {project.status.replace('_', ' ')}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
              <span>Overall Deliverable Progress</span>
              <span className="text-blue-700">{taskProgress}% ({completedCount}/{tasks.length} tasks)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* Tasks Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <span>Project Work Breakdown & Tasks</span>
              </h3>
              <span className="text-xs text-slate-500">Click to check off deliverables</span>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500 line-through'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{task.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-[11px]">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">
                      {task.assignedTo}
                    </span>
                    <span className="text-slate-400">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Task Form */}
            <form onSubmit={addTask} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add next project milestone task..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </form>
          </div>

          {/* Submit Deliverable Artifact */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Submit Phase Deliverable to Mentor (Daniel K.)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your group’s community interview transcripts, Figma low-fidelity prototype, or research brief for assessment.
            </p>

            {submittedArtifact ? (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Deliverable submitted successfully! Mentor feedback will appear in Messages.</span>
              </div>
            ) : (
              <form onSubmit={handleDeliverableSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  placeholder="Paste Google Drive / Figma / GitHub project URL"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit Deliverable</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateToMessages();
            }}
            className="flex items-center gap-2 text-xs font-semibold text-blue-700 hover:underline"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Team Chat Room</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
