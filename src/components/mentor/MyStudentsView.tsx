import React, { useState } from 'react';
import { Plus, Search, CheckCircle2, AlertCircle, Eye, MessageSquare, X } from 'lucide-react';
import { StudentProgressRecord } from '../../types';

interface MyStudentsViewProps {
  students: StudentProgressRecord[];
  onAddStudent: (student: StudentProgressRecord) => void;
  onMessageStudent: (studentName: string) => void;
}

export const MyStudentsView: React.FC<MyStudentsViewProps> = ({
  students,
  onAddStudent,
  onMessageStudent,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'at_risk'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressRecord | null>(null);

  // New Student Form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCourse, setNewCourse] = useState('Digital Literacy');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return s.status === 'active';
    if (activeTab === 'at_risk') return s.status === 'at_risk';
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    const newStd: StudentProgressRecord = {
      id: `std_${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      initials: newName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      enrolledCoursesCount: 1,
      courseName: newCourse,
      progressPercent: 10,
      lastActivity: 'Today',
      status: 'active',
      mentorName: 'Daniel K.',
    };
    onAddStudent(newStd);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Add Student Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Students</h1>
          <p className="text-sm text-slate-500 mt-1">
            Keep track of every learner in your community.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add student</span>
        </button>
      </div>

      {/* Tabs and Search Bar row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        {/* Tabs */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'all'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All <span className="text-xs font-normal text-slate-400">24</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'active'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Active <span className="text-xs font-normal text-slate-400">20</span>
          </button>
          <button
            onClick={() => setActiveTab('at_risk')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'at_risk'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            At risk <span className="text-xs font-normal text-slate-400">3</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600"
          />
        </div>
      </div>

      {/* Students Table matching screenshot */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4 sm:px-6">NAME</th>
                <th className="p-4">EMAIL</th>
                <th className="p-4">ENROLLED IN</th>
                <th className="p-4 w-48">PROGRESS</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right sm:pr-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name + avatar */}
                  <td className="p-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#9bbddb] to-[#b8d4ea] text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {std.initials}
                      </div>
                      <span className="font-bold text-slate-900">{std.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-slate-500">{std.email}</td>

                  {/* Enrolled */}
                  <td className="p-4 text-slate-600">{std.enrolledCoursesCount} courses</td>

                  {/* Progress bar */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            std.status === 'at_risk' ? 'bg-rose-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${std.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">{std.progressPercent}%</span>
                    </div>
                  </td>

                  {/* Status pill */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        std.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {std.status === 'active' ? 'Active' : 'At risk'}
                    </span>
                  </td>

                  {/* Action view */}
                  <td className="p-4 text-right sm:pr-6">
                    <button
                      onClick={() => setSelectedStudent(std)}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-linear-to-tr from-blue-200 to-blue-300 text-blue-900 flex items-center justify-center font-bold text-sm">
                  {selectedStudent.initials}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedStudent.name}</h3>
                  <div className="text-xs text-slate-400">{selectedStudent.email}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500">Status</span>
                <span className="font-bold capitalize">{selectedStudent.status}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500">Enrolled Course</span>
                <span className="font-bold">{selectedStudent.courseName}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500">Course Progress</span>
                <span className="font-bold">{selectedStudent.progressPercent}%</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-slate-500">Last Active</span>
                <span className="font-bold">{selectedStudent.lastActivity}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const s = selectedStudent.name;
                  setSelectedStudent(null);
                  onMessageStudent(s);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Student</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Student Learner</h3>
            <p className="text-xs text-slate-500 mb-4">Enroll a new youth participant into your YEP cohort.</p>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Emmanuel O."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="emmanuel@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Course</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Digital Literacy">Digital Literacy</option>
                  <option value="AI for Youth">AI for Youth</option>
                  <option value="Career Readiness">Career Readiness</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                >
                  Enroll Learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
