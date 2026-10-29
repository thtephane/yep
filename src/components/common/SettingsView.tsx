import React, { useState } from 'react';
import { User, Bell, Shield, Monitor, Lock, CheckCircle2 } from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsViewProps {
  currentUser: UserType;
  onUpdateUser: (updated: Partial<UserType>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onUpdateUser }) => {
  const [activeSubTab, setActiveSubTab] = useState<'account' | 'notifications' | 'security' | 'appearance'>('account');
  const [displayName, setDisplayName] = useState(currentUser.name);
  const [emailAddress, setEmailAddress] = useState(currentUser.email);
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('East Africa Time');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentUser.role === 'admin');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: displayName,
      email: emailAddress,
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const getSubheading = () => {
    switch (currentUser.role) {
      case 'student':
        return 'Manage your account, notifications, and portal preferences.';
      case 'mentor':
        return 'Manage your account, notifications, and portal preferences.';
      case 'admin':
        return 'Manage your administrator account and organization preferences.';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">{getSubheading()}</p>
      </div>

      {savedBanner && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your settings and preferences have been successfully updated.</span>
        </div>
      )}

      {/* Two-column layout matching wireframe */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Sub-navigation pill menu */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-3 shadow-xs space-y-1">
          <button
            onClick={() => setActiveSubTab('account')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-colors cursor-pointer ${
              activeSubTab === 'account'
                ? 'bg-[#EBF3FC] text-blue-900 font-semibold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activeSubTab === 'account' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Account</div>
                <div className="text-[11px] text-slate-400">Personal details</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">›</span>
          </button>

          <button
            onClick={() => setActiveSubTab('notifications')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-colors cursor-pointer ${
              activeSubTab === 'notifications'
                ? 'bg-[#EBF3FC] text-blue-900 font-semibold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activeSubTab === 'notifications' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Notifications</div>
                <div className="text-[11px] text-slate-400">Alerts and updates</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">›</span>
          </button>

          <button
            onClick={() => setActiveSubTab('security')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-colors cursor-pointer ${
              activeSubTab === 'security'
                ? 'bg-[#EBF3FC] text-blue-900 font-semibold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activeSubTab === 'security' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Security</div>
                <div className="text-[11px] text-slate-400">Password and access</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">›</span>
          </button>

          <button
            onClick={() => setActiveSubTab('appearance')}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-colors cursor-pointer ${
              activeSubTab === 'appearance'
                ? 'bg-[#EBF3FC] text-blue-900 font-semibold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activeSubTab === 'appearance' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Appearance</div>
                <div className="text-[11px] text-slate-400">Display preferences</div>
              </div>
            </div>
            <span className="text-slate-400 text-xs">›</span>
          </button>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {activeSubTab === 'account' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">ACCOUNT</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">Personal information</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Update the details used across your {currentUser.role} profile.
                </p>
              </div>

              {/* Profile Photo */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-linear-to-tr from-blue-300 to-blue-400 text-blue-900 flex items-center justify-center font-bold text-base shadow-xs">
                    {currentUser.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Profile photo</div>
                    <div className="text-[11px] text-slate-400">JPG or PNG, up to 5 MB.</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Photo upload dialog: Choose profile image')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Change photo
                </button>
              </div>

              {/* Form fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="English">English</option>
                    <option value="Swahili">Swahili (Kiswahili)</option>
                    <option value="Luganda">Luganda</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Time zone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white focus:outline-hidden focus:border-blue-600"
                  >
                    <option value="East Africa Time">East Africa Time (EAT)</option>
                    <option value="Central Africa Time">Central Africa Time (CAT)</option>
                    <option value="West Africa Time">West Africa Time (WAT)</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDisplayName(currentUser.name);
                    setEmailAddress(currentUser.email);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save changes</span>
                </button>
              </div>
            </form>
          )}

          {activeSubTab === 'security' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">SECURITY</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">Password and access</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Protect your {currentUser.role} account and privileged access.
                </p>
              </div>

              {/* Blue lock banner matching screenshot */}
              <div className="p-4 rounded-2xl bg-[#EBF3FC] border border-blue-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Your password was last changed 3 months ago</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Use a unique password you do not use elsewhere.
                  </div>
                </div>
              </div>

              {/* Passwords */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current password
                  </label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      New password
                    </label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Two-factor authentication</div>
                  <div className="text-[11px] text-slate-500">Add an extra verification step when signing in.</div>
                </div>

                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1C2D] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save changes</span>
                </button>
              </div>
            </form>
          )}

          {activeSubTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">NOTIFICATIONS</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">Alerts & communication</h2>
                <p className="text-xs text-slate-500 mt-1">Configure when you receive email & SMS reminders.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Upcoming Live Webinars', desc: 'Notify 1 hour before scheduled East Africa sessions.', active: true },
                  { title: 'Peer & Mentor Messages', desc: 'Real-time alert when a teammate posts in cohort chat.', active: true },
                  { title: 'Assignment Grading & Feedback', desc: 'Instant ping when mentor marks milestone deliverable.', active: true },
                  { title: 'Low-Data SMS Summaries', desc: 'Weekly SMS digest of upcoming tasks for areas with limited internet.', active: false },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked={item.active} className="w-4 h-4 text-blue-600 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">APPEARANCE</span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">Display & accessibility preferences</h2>
                <p className="text-xs text-slate-500 mt-1">Optimize for high readability and mobile network speeds.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Low-Bandwidth Mode</div>
                    <div className="text-[11px] text-slate-500">Compress images and pause non-essential background requests.</div>
                  </div>
                  <input type="checkbox" defaultChecked={true} className="w-4 h-4 text-blue-600 rounded" />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">High Contrast Text</div>
                    <div className="text-[11px] text-slate-500">Boosts contrast for outdoor solar or low-light conditions.</div>
                  </div>
                  <input type="checkbox" defaultChecked={false} className="w-4 h-4 text-blue-600 rounded" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
