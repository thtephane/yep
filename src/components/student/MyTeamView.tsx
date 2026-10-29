import React from 'react';
import { MessageSquare, GraduationCap } from 'lucide-react';
import { TeamMember } from '../../types';

interface MyTeamViewProps {
  teamMembers: TeamMember[];
  onMessageMember: (memberName: string) => void;
  onContactMentor: () => void;
}

export const MyTeamView: React.FC<MyTeamViewProps> = ({
  teamMembers,
  onMessageMember,
  onContactMentor,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-light text-slate-900 tracking-tight">My Team</h1>
        <p className="text-sm text-slate-500 mt-1">
          Collaborate with the young people building your community project.
        </p>
      </div>

      {/* Current Team Banner matching screenshot */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
              CURRENT TEAM
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">Community Connect</h2>
            <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Designing a digital directory that helps young people find local opportunities and support.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 font-semibold self-start sm:self-auto bg-slate-50">
            Team YEP-24
          </span>
        </div>
      </div>

      {/* Grid of 4 Team Member Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col items-center text-center justify-between min-h-[260px] hover:shadow-md transition-shadow"
          >
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-[#9bbddb] to-[#b8d4ea] text-blue-950 flex items-center justify-center font-bold text-lg shadow-inner">
              {member.initials}
            </div>

            {/* Name & status */}
            <div className="space-y-1 my-3">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                {member.isCurrentUser ? (
                  <span className="text-[11px] text-slate-400 font-normal">You</span>
                ) : (
                  <span
                    className={`text-[10px] font-semibold ${
                      member.status === 'online' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {member.status === 'online' ? 'Online' : 'Away'}
                  </span>
                )}
              </div>

              <div className="text-xs font-bold text-slate-800">{member.roleTitle}</div>
              <div className="text-[11px] text-slate-400">{member.focusArea}</div>
            </div>

            {/* Message Button */}
            <button
              onClick={() => onMessageMember(member.name)}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Message</span>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Mentor Card matching screenshot */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF2FB] text-blue-800 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Your team mentor</div>
            <div className="text-sm font-bold text-slate-900">
              Daniel K. · Digital Skills Mentor
            </div>
          </div>
        </div>

        <button
          onClick={onContactMentor}
          className="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
        >
          Contact mentor
        </button>
      </div>
    </div>
  );
};
