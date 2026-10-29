import React, { useState } from 'react';
import { User, Eye, EyeOff, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginViewProps {
  onLogin: (role: UserRole, email: string) => void;
  onExploreDemo: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onExploreDemo }) => {
  const [email, setEmail] = useState('Joshua@yep.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regName, setRegName] = useState('');
  const [regCountry, setRegCountry] = useState('Uganda');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('nadia')) {
      onLogin('admin', email);
    } else if (email.toLowerCase().includes('mentor') || email.toLowerCase().includes('daniel')) {
      onLogin('mentor', email);
    } else {
      onLogin(selectedRole, email);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F7FB]">
      {/* Left Branding Hero Section - Replicating Login_db18d931.png */}
      <div className="lg:w-1/2 bg-linear-to-b from-[#0B1A2C] via-[#10273F] to-[#163351] text-white p-8 sm:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Subtle background ambient radial light */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-tight text-white">YEP</span>
          <div className="text-[11px] font-semibold text-slate-300 leading-tight border-l border-slate-500 pl-2.5">
            Youth<br />Empowerment<br />Project
          </div>
        </div>

        {/* Central Hero Typography */}
        <div className="relative z-10 my-8 lg:my-0 max-w-xl">
          <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-300 mb-4">
            LEARN · CONNECT · CREATE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-light tracking-tight leading-[1.12] mb-5 text-white">
            A brighter future <br />
            <span className="font-light text-white">starts with you.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-md">
            Build digital skills, exchange ideas and create lasting impact alongside young people across East Africa.
          </p>

          {/* Authentic Vector Illustration Matching Login_db18d931.png */}
          <div className="mt-12 flex justify-center">
            <div className="relative w-80 h-52 flex items-end justify-center">
              {/* Thin Wireframe Globe */}
              <svg
                className="absolute top-0 w-44 h-44 text-slate-400/30"
                viewBox="0 0 160 160"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="80" cy="80" r="76" />
                <ellipse cx="80" cy="80" rx="36" ry="76" />
                <line x1="4" y1="80" x2="156" y2="80" />
                <line x1="16" y1="42" x2="144" y2="42" />
                <line x1="16" y1="118" x2="144" y2="118" />
              </svg>

              {/* 4 Youth Silhouettes in Soft Slate-Blue */}
              <div className="flex items-end gap-1.5 z-10 -mb-2">
                {/* Person 1 (Far Left) */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-[#8CA4BE]" />
                  <div className="w-14 h-16 bg-[#6C86A1] rounded-t-3xl -mt-1" />
                </div>

                {/* Person 2 (Center Left) */}
                <div className="flex flex-col items-center -mx-1 z-20">
                  <div className="w-13 h-13 rounded-full bg-[#A2B9D1]" />
                  <div className="w-18 h-22 bg-[#8CA4BE] rounded-t-3xl -mt-1 flex items-center justify-center shadow-xs" />
                </div>

                {/* Person 3 (Center Right) */}
                <div className="flex flex-col items-center -mx-1 z-20">
                  <div className="w-13 h-13 rounded-full bg-[#A2B9D1]" />
                  <div className="w-18 h-22 bg-[#8CA4BE] rounded-t-3xl -mt-1 flex items-center justify-center shadow-xs" />
                </div>

                {/* Person 4 (Far Right) */}
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-[#8CA4BE]" />
                  <div className="w-14 h-16 bg-[#6C86A1] rounded-t-3xl -mt-1" />
                </div>
              </div>

              {/* Open Laptop In Front */}
              <div className="absolute bottom-0 z-30 flex flex-col items-center">
                <div className="w-48 h-28 bg-linear-to-b from-[#C4D5E7] to-[#AEC3D8] rounded-t-xl border border-white/60 shadow-lg flex items-center justify-center">
                  <span className="text-sm font-extrabold tracking-widest text-[#2B4969]">YEP</span>
                </div>
                <div className="w-56 h-3 bg-[#E2ECF6] rounded-b-md shadow-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="relative z-10 text-xs text-slate-400 max-w-sm leading-relaxed">
          Empowering young people in Uganda and East Africa through digital learning and global collaboration.
        </div>
      </div>

      {/* Right Sign-in / Sign-up Card Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-[450px] bg-white rounded-3xl p-8 sm:p-11 shadow-sm border border-slate-200/80">
          {!isRegisterMode ? (
            <>
              <div className="mb-8">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#2563EB] uppercase block">
                  WELCOME BACK
                </span>
                <h2 className="text-3xl font-light text-slate-900 mt-1.5 tracking-tight">
                  Sign in to your account
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email or username
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Joshua@yep.org"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to your email.')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#132A44] hover:bg-[#0D1F33] text-white font-medium text-sm transition-all shadow-xs cursor-pointer mt-2"
                >
                  Sign in
                </button>
              </form>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-slate-400">or</span>
              </div>

              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all cursor-pointer"
              >
                Create an account
              </button>

              <div className="mt-6 text-center text-xs text-slate-500">
                New to YEP?{' '}
                <button
                  onClick={onExploreDemo}
                  className="text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Explore the platform
                </button>
              </div>

              {/* Instant Role Access Bar */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Quick demo sign in:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onLogin('student', 'amina@example.com')}
                    className="p-2.5 rounded-xl text-xs border border-blue-100 bg-blue-50/70 hover:bg-blue-100 text-blue-900 transition-colors text-center cursor-pointer"
                  >
                    <div className="font-bold">Student</div>
                    <div className="text-[10px] text-blue-700">Amina N.</div>
                  </button>

                  <button
                    onClick={() => onLogin('mentor', 'daniel@yep.org')}
                    className="p-2.5 rounded-xl text-xs border border-emerald-100 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 transition-colors text-center cursor-pointer"
                  >
                    <div className="font-bold">Mentor</div>
                    <div className="text-[10px] text-emerald-700">Daniel K.</div>
                  </button>

                  <button
                    onClick={() => onLogin('admin', 'nadia@yep.org')}
                    className="p-2.5 rounded-xl text-xs border border-purple-100 bg-purple-50/70 hover:bg-purple-100 text-purple-900 transition-colors text-center cursor-pointer"
                  >
                    <div className="font-bold">Admin</div>
                    <div className="text-[10px] text-purple-700">Nadia A.</div>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#2563EB] uppercase block">
                  JOIN YEP EAST AFRICA
                </span>
                <h2 className="text-2xl font-light text-slate-900 mt-1.5 tracking-tight">
                  Create your account
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Youth empowerment through digital skilling and regional collaboration.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin(selectedRole, email);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Amina Namaganda"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amina@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Role
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="student">Youth Participant (18-35)</option>
                      <option value="mentor">Mentor / Facilitator</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Country
                    </label>
                    <select
                      value={regCountry}
                      onChange={(e) => setRegCountry(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="Uganda">Uganda</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Burundi">Burundi</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#132A44] hover:bg-[#0D1F33] text-white font-medium text-sm transition-all mt-3 cursor-pointer shadow-xs"
                >
                  Register &amp; Get Started
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    &larr; Already have an account? Sign in
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
