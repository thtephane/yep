import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Target,
  GraduationCap,
  MessageSquare,
  FileText,
  User as UserIcon,
  Settings,
  LogOut,
  Calendar,
  X,
  FileSpreadsheet,
  PlusCircle,
  Award,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentRole: UserRole;
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onLogout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  currentTab,
  onSelectTab,
  onLogout,
  isOpenMobile,
  onCloseMobile,
  unreadCount = 2,
}) => {
  const getNavItems = () => {
    switch (currentRole) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'learning', label: 'My Learning', icon: BookOpen },
          { id: 'team', label: 'My Team', icon: Users },
          { id: 'projects', label: 'My Projects', icon: Target },
          { id: 'progress', label: 'My Progress', icon: GraduationCap },
          { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
          { id: 'resources', label: 'Resources', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserIcon },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'mentor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'lectures', label: 'My Lectures', icon: BookOpen },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'student_progress', label: 'Student Progress', icon: GraduationCap },
          { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
          { id: 'resources', label: 'Resources', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserIcon },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'admin_students', label: 'Students', icon: GraduationCap },
          { id: 'admin_mentors', label: 'Mentors', icon: Users },
          { id: 'programs', label: 'Programs', icon: BookOpen },
          { id: 'new_program', label: 'New program', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
          { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
          { id: 'resources', label: 'Resources', icon: FileText },
          { id: 'profile', label: 'Profile', icon: UserIcon },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Brand */}
        <div>
          <div className="p-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-extrabold tracking-tight text-[#162744]">
                YEP
              </div>
              <div className="text-[11px] font-semibold text-slate-700 leading-tight border-l border-slate-300 pl-2.5">
                Youth<br />Empowerment<br />Project
              </div>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              title="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="px-3 pt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#EAF2FB] text-[#1E3A8A] font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-[18px] h-[18px] ${
                        isActive ? 'text-[#1E3A8A]' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-100">
          {/* Log out */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px] text-slate-400" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
