import React, { useState } from 'react';
import { UserPlus, Search, CheckCircle2, MapPin, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MentorRecord } from '../../types';

interface AdminMentorsViewProps {
  mentors: MentorRecord[];
  onApproveMentor: (mentorId: string) => void;
  onInviteMentor: (mentor: MentorRecord) => void;
}

export const AdminMentorsView: React.FC<AdminMentorsViewProps> = ({
  mentors,
  onApproveMentor,
  onInviteMentor,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('Kampala');
  const [newSpecialization, setNewSpecialization] = useState('Digital Literacy');

  const filtered = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return m.status === 'active';
    if (activeTab === 'pending') return m.status === 'pending';
    return true;
  });

  const handleApprove = (mentorId: string) => {
    onApproveMentor(mentorId);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleCreateMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;
    const newM: MentorRecord = {
      id: `men_${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      initials: newName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      location: newLocation,
      studentsCount: 0,
      programsCount: 0,
      status: 'pending',
      specialization: newSpecialization,
    };
    onInviteMentor(newM);
    setShowInviteModal(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Invite Button matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Mentors</h1>
          <p className="text-sm text-slate-500 mt-1">
            Approve mentors, review capacity, and oversee assignments.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite mentor</span>
        </button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'all'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All <span className="text-xs font-normal text-slate-400">32</span>
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'active'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Active <span className="text-xs font-normal text-slate-400">29</span>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'pending'
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Pending <span className="text-xs font-normal text-slate-400">3</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mentors..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600"
          />
        </div>
      </div>

      {/* Table matching screenshot */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4 sm:px-6">MENTOR</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4">STUDENTS</th>
                <th className="p-4">PROGRAMS</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right sm:pr-6">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((men) => (
                <tr key={men.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name + avatar + email */}
                  <td className="p-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#9bbddb] to-[#b8d4ea] text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {men.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{men.name}</span>
                        <span className="text-[11px] text-slate-400">{men.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="p-4 text-slate-600">{men.location}</td>

                  {/* Students */}
                  <td className="p-4 text-slate-600 font-semibold">{men.studentsCount}</td>

                  {/* Programs */}
                  <td className="p-4 text-slate-600 font-semibold">{men.programsCount}</td>

                  {/* Status pill */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        men.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {men.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>

                  {/* Action button */}
                  <td className="p-4 text-right sm:pr-6">
                    {men.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(men.id)}
                        className="px-4 py-1.5 rounded-lg bg-[#14263D] hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Viewing mentor portfolio for ${men.name} (${men.specialization})`)}
                        className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Mentor Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Invite New Facilitator / Mentor</h3>
            <p className="text-xs text-slate-500 mb-4">Onboard a regional domain specialist to mentor YEP cohorts.</p>

            <form onSubmit={handleCreateMentor} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mentor Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. Brian Kigozi"
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
                  placeholder="brian@yep.org"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hub Location</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Kampala">Kampala</option>
                    <option value="Jinja">Jinja</option>
                    <option value="Gulu">Gulu</option>
                    <option value="Mbarara">Mbarara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization</label>
                  <select
                    value={newSpecialization}
                    onChange={(e) => setNewSpecialization(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Digital Literacy">Digital Literacy</option>
                    <option value="AI & Robotics">AI & Robotics</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="Social Innovation">Social Innovation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                >
                  Send Onboarding Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
