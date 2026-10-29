import React, { useState } from 'react';
import { Edit3, CheckCircle2, Users, Shield } from 'lucide-react';
import { User } from '../../types';

interface AdminProfileViewProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tagline, setTagline] = useState(user.tagline);
  const [bio, setBio] = useState(user.bio);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ tagline, bio });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Edit Profile Button matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Administrator Profile</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your staff identity and organization contact details.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit profile</span>
        </button>
      </div>

      {/* Profile Layout matching screenshot */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Avatar & Summary Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-8 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-100 shadow-md mb-4 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          <div className="text-xs text-slate-500 mt-0.5">Program Administrator · {user.country}</div>

          <div className="mt-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              System administrator
            </span>
          </div>

          <div className="w-full border-t border-slate-100 my-6" />

          {/* 3 Stats columns matching screenshot: 18 Programs, 486 Students, 32 Mentors */}
          <div className="grid grid-cols-3 w-full gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-slate-900">18</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Programs</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">486</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Students</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">32</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Mentors</div>
            </div>
          </div>
        </div>

        {/* Right Column: Role Overview & Recent Administration Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Role Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
            <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
              ROLE OVERVIEW
            </span>
            <h3 className="text-xl font-bold text-slate-900">{user.tagline}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{user.bio}</p>

            {/* Tags matching screenshot */}
            <div className="flex flex-wrap gap-2 pt-2">
              {(user.interests || ['Program Operations', 'Safeguarding', 'Impact Reporting']).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Administration Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
                RECENT ADMINISTRATION
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Organization activity</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Published the May outcomes report
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">15 May 2025</p>
                </div>
              </div>

              <div className="w-full border-t border-slate-100" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Onboarded 6 new mentors
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">5 May 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Edit Administrator Profile</h3>
            <p className="text-xs text-slate-500 mb-4">
              Update organization identity and administrative responsibilities.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role Headline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Responsibilities / Bio</label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
