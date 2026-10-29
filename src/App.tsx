import React, { useState } from 'react';
import { UserRole, User, Course, Project, LectureSession, ResourceItem, ProjectTask, StudentProgressRecord, MentorRecord, ProgramRecord } from './types';
import {
  currentUserStudent,
  currentUserMentor,
  currentUserAdmin,
  initialCourses,
  initialProjects,
  teamMembers,
  lectureSessions,
  initialResources,
  conversationsList,
  mentorConversationsList,
  adminConversationsList,
  studentList,
  mentorList,
  programsList,
} from './data/mockData';

// Layout
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Auth
import { LoginView } from './components/auth/LoginView';

// Common views & modals
import { MessagesView } from './components/common/MessagesView';
import { ResourcesView } from './components/common/ResourcesView';
import { SettingsView } from './components/common/SettingsView';
import { LessonPlayerModal } from './components/common/LessonPlayerModal';
import { ProjectWorkspaceModal } from './components/common/ProjectWorkspaceModal';
import { VirtualSessionModal } from './components/common/VirtualSessionModal';
import { CertificateModal } from './components/common/CertificateModal';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyLearningView } from './components/student/MyLearningView';
import { MyTeamView } from './components/student/MyTeamView';
import { MyProjectsView } from './components/student/MyProjectsView';
import { MyProgressView } from './components/student/MyProgressView';
import { StudentProfileView } from './components/student/StudentProfileView';

// Mentor Views
import { MentorDashboard } from './components/mentor/MentorDashboard';
import { MyStudentsView } from './components/mentor/MyStudentsView';
import { MyLecturesView } from './components/mentor/MyLecturesView';
import { CreateLectureWizard } from './components/mentor/CreateLectureWizard';
import { StudentProgressView } from './components/mentor/StudentProgressView';
import { MentorProfileView } from './components/mentor/MentorProfileView';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStudentsView } from './components/admin/AdminStudentsView';
import { AdminMentorsView } from './components/admin/AdminMentorsView';
import { AdminProgramsView } from './components/admin/AdminProgramsView';
import { CreateProgramWizard } from './components/admin/CreateProgramWizard';
import { ReportsInsightsView } from './components/admin/ReportsInsightsView';
import { AdminProfileView } from './components/admin/AdminProfileView';

export default function App() {
  // Session & Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<LectureSession | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Entities state
  const [studentUser, setStudentUser] = useState<User>(currentUserStudent);
  const [mentorUser, setMentorUser] = useState<User>(currentUserMentor);
  const [adminUser, setAdminUser] = useState<User>(currentUserAdmin);

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [lectures, setLectures] = useState<LectureSession[]>(lectureSessions);
  const [students, setStudents] = useState<StudentProgressRecord[]>(studentList);
  const [mentors, setMentors] = useState<MentorRecord[]>(mentorList);
  const [programs, setPrograms] = useState<ProgramRecord[]>(programsList);

  // Role-specific conversations
  const [studentConvs, setStudentConvs] = useState(conversationsList);
  const [mentorConvs, setMentorConvs] = useState(mentorConversationsList);
  const [adminConvs, setAdminConvs] = useState(adminConversationsList);

  // Active user reference
  const currentUser =
    currentRole === 'student'
      ? studentUser
      : currentRole === 'mentor'
      ? mentorUser
      : adminUser;

  const currentConversations =
    currentRole === 'student'
      ? studentConvs
      : currentRole === 'mentor'
      ? mentorConvs
      : adminConvs;

  // Role switcher
  const handleSwitchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setCurrentTab('dashboard');
    setIsMobileSidebarOpen(false);
  };

  const handleLogin = (role: UserRole, email: string) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Lesson completion handler
  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;
        const updatedLessons = c.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const compCount = updatedLessons.filter((l) => l.completed).length;
        const newPct = Math.min(100, Math.round((compCount / c.totalLessons) * 100));
        return {
          ...c,
          lessons: updatedLessons,
          completedLessons: compCount,
          progressPercent: newPct,
        };
      })
    );

    // Also update student record
    setStudents((prev) =>
      prev.map((s) => (s.id === 'std_01' ? { ...s, progressPercent: 78 } : s))
    );
  };

  // Project tasks update handler
  const handleUpdateTasks = (projectId: string, tasks: ProjectTask[]) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const comp = tasks.filter((t) => t.completed).length;
        const pct = Math.round((comp / tasks.length) * 100);
        return {
          ...p,
          tasks,
          progressPercent: pct,
        };
      })
    );
  };

  // Messaging send handler with simulated auto-reply
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
      isSelf: true,
    };

    const updateConvs = (convList: typeof currentConversations) =>
      convList.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: text,
          time: 'Just now',
          messages: [...c.messages, newMessage],
        };
      });

    if (currentRole === 'student') setStudentConvs(updateConvs);
    else if (currentRole === 'mentor') setMentorConvs(updateConvs);
    else setAdminConvs(updateConvs);

    // Simulate response after 1.5s
    setTimeout(() => {
      const replyMessage = {
        id: `reply_${Date.now()}`,
        senderId: 'partner',
        senderName: 'Collaborator',
        text: 'Received! Thanks for sharing this update with the cohort.',
        timestamp: 'Just now',
        isSelf: false,
      };
      const addReply = (convList: typeof currentConversations) =>
        convList.map((c) => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            lastMessage: replyMessage.text,
            time: 'Just now',
            messages: [...c.messages, replyMessage],
          };
        });
      if (currentRole === 'student') setStudentConvs(addReply);
      else if (currentRole === 'mentor') setMentorConvs(addReply);
      else setAdminConvs(addReply);
    }, 1500);
  };

  // Resources handlers
  const handleToggleSaveResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r))
    );
  };

  const handleAddResource = (newRes: ResourceItem) => {
    setResources((prev) => [newRes, ...prev]);
  };

  const handleTogglePublishResource = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r))
    );
  };

  // Mentor & Program approval handlers
  const handleApproveMentor = (mentorId: string) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === mentorId ? { ...m, status: 'active', studentsCount: 12 } : m))
    );
  };

  // If not logged in, render pixel-accurate Login screen
  if (!isLoggedIn) {
    return (
      <LoginView
        onLogin={handleLogin}
        onExploreDemo={() => {
          setIsLoggedIn(true);
          setCurrentRole('student');
        }}
      />
    );
  }

  // Render role-specific main view
  const renderMainContent = () => {
    // Shared tabs across roles
    if (currentTab === 'messages') {
      return (
        <MessagesView
          currentUser={currentUser}
          conversations={currentConversations}
          onSendMessage={handleSendMessage}
          onLaunchVirtualRoom={(title) => {
            setSelectedSessionForModal({
              id: 'quick_sync',
              title,
              day: 'Today',
              month: 'Live',
              fullDate: 'Right now',
              timeSlot: 'Live Session',
              type: 'Live Session',
              courseTopic: 'Virtual Exchange',
              mentorName: currentUser.role === 'mentor' ? currentUser.name : 'Daniel K.',
              registeredCount: 3,
              isUpcoming: true,
              status: 'live',
            });
          }}
        />
      );
    }

    if (currentTab === 'resources') {
      return (
        <ResourcesView
          currentUser={currentUser}
          resources={resources}
          onToggleSave={handleToggleSaveResource}
          onAddResource={handleAddResource}
          onTogglePublish={handleTogglePublishResource}
        />
      );
    }

    if (currentTab === 'settings') {
      return (
        <SettingsView
          currentUser={currentUser}
          onUpdateUser={(updated) => {
            if (currentRole === 'student') setStudentUser((prev) => ({ ...prev, ...updated }));
            else if (currentRole === 'mentor') setMentorUser((prev) => ({ ...prev, ...updated }));
            else setAdminUser((prev) => ({ ...prev, ...updated }));
          }}
        />
      );
    }

    // Role: Student
    if (currentRole === 'student') {
      switch (currentTab) {
        case 'dashboard':
          return (
            <StudentDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenCourse={(c) => setSelectedCourseForModal(c)}
              onJoinSession={(s) => setSelectedSessionForModal(s)}
              courses={courses}
              upcomingSessions={lectures}
            />
          );
        case 'learning':
          return (
            <MyLearningView
              courses={courses}
              onOpenCourse={(c) => setSelectedCourseForModal(c)}
            />
          );
        case 'team':
          return (
            <MyTeamView
              teamMembers={teamMembers}
              onMessageMember={(name) => setCurrentTab('messages')}
              onContactMentor={() => setCurrentTab('messages')}
            />
          );
        case 'projects':
          return (
            <MyProjectsView
              projects={projects}
              onOpenProject={(p) => setSelectedProjectForModal(p)}
            />
          );
        case 'progress':
          return (
            <MyProgressView
              courses={courses}
              onDownloadRecord={() => setIsCertificateModalOpen(true)}
            />
          );
        case 'profile':
          return (
            <StudentProfileView
              user={studentUser}
              onUpdateUser={(up) => setStudentUser((prev) => ({ ...prev, ...up }))}
            />
          );
        default:
          return (
            <StudentDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenCourse={(c) => setSelectedCourseForModal(c)}
              onJoinSession={(s) => setSelectedSessionForModal(s)}
              courses={courses}
              upcomingSessions={lectures}
            />
          );
      }
    }

    // Role: Mentor
    if (currentRole === 'mentor') {
      switch (currentTab) {
        case 'dashboard':
          return (
            <MentorDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onStartLecture={(s) => setSelectedSessionForModal(s)}
              upcomingLectures={lectures}
            />
          );
        case 'students':
          return (
            <MyStudentsView
              students={students}
              onAddStudent={(std) => setStudents((prev) => [std, ...prev])}
              onMessageStudent={() => setCurrentTab('messages')}
            />
          );
        case 'lectures':
          return (
            <MyLecturesView
              lectures={lectures}
              onCreateClick={() => setCurrentTab('create_lecture')}
              onStartLecture={(s) => setSelectedSessionForModal(s)}
            />
          );
        case 'create_lecture':
          return (
            <CreateLectureWizard
              onCancel={() => setCurrentTab('lectures')}
              onLectureCreated={(newLec) => {
                setLectures((prev) => [newLec, ...prev]);
                setCurrentTab('lectures');
              }}
            />
          );
        case 'schedule':
          return (
            <MyLecturesView
              lectures={lectures}
              onCreateClick={() => setCurrentTab('create_lecture')}
              onStartLecture={(s) => setSelectedSessionForModal(s)}
            />
          );
        case 'student_progress':
          return (
            <StudentProgressView
              students={students}
              onExport={() => alert('Student cohort performance exported to CSV/Excel.')}
              onViewStudent={() => setCurrentTab('students')}
            />
          );
        case 'profile':
          return (
            <MentorProfileView
              user={mentorUser}
              onUpdateUser={(up) => setMentorUser((prev) => ({ ...prev, ...up }))}
            />
          );
        default:
          return (
            <MentorDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onStartLecture={(s) => setSelectedSessionForModal(s)}
              upcomingLectures={lectures}
            />
          );
      }
    }

    // Role: Administrator
    if (currentRole === 'admin') {
      switch (currentTab) {
        case 'dashboard':
          return (
            <AdminDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onManageSession={(s) => setSelectedSessionForModal(s)}
              upcomingSessions={lectures}
            />
          );
        case 'admin_students':
          return (
            <AdminStudentsView
              students={students}
              onInviteStudent={(std) => setStudents((prev) => [std, ...prev])}
              onViewStudent={() => setCurrentTab('reports')}
            />
          );
        case 'admin_mentors':
          return (
            <AdminMentorsView
              mentors={mentors}
              onApproveMentor={handleApproveMentor}
              onInviteMentor={(m) => setMentors((prev) => [m, ...prev])}
            />
          );
        case 'programs':
          return (
            <AdminProgramsView
              programs={programs}
              onCreateProgramClick={() => setCurrentTab('new_program')}
              onManageProgram={(p) => alert(`Managing cohort: ${p.title}`)}
            />
          );
        case 'new_program':
          return (
            <CreateProgramWizard
              onCancel={() => setCurrentTab('programs')}
              onProgramCreated={(p) => {
                setPrograms((prev) => [p, ...prev]);
                setCurrentTab('programs');
              }}
            />
          );
        case 'reports':
          return (
            <ReportsInsightsView
              students={students}
              onExport={() => alert('Exporting regional YEP outcome analysis report.')}
              onViewStudent={() => setCurrentTab('admin_students')}
            />
          );
        case 'profile':
          return (
            <AdminProfileView
              user={adminUser}
              onUpdateUser={(up) => setAdminUser((prev) => ({ ...prev, ...up }))}
            />
          );
        default:
          return (
            <AdminDashboard
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onManageSession={(s) => setSelectedSessionForModal(s)}
              upcomingSessions={lectures}
            />
          );
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        currentRole={currentRole}
        currentTab={currentTab}
        onSelectTab={(tabId) => setCurrentTab(tabId)}
        onLogout={handleLogout}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header
          currentUser={currentUser}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onSwitchRole={handleSwitchRole}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {renderMainContent()}
        </main>
      </div>

      {/* Modals & Overlays */}
      <LessonPlayerModal
        course={selectedCourseForModal}
        isOpen={!!selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onCompleteLesson={handleCompleteLesson}
      />

      <ProjectWorkspaceModal
        project={selectedProjectForModal}
        isOpen={!!selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onUpdateTasks={handleUpdateTasks}
        onNavigateToMessages={() => setCurrentTab('messages')}
      />

      <VirtualSessionModal
        session={selectedSessionForModal}
        isOpen={!!selectedSessionForModal}
        onClose={() => setSelectedSessionForModal(null)}
        userName={currentUser.name}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        studentName={studentUser.name}
      />
    </div>
  );
}
