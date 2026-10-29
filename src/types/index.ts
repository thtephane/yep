export type UserRole = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarText: string;
  avatarUrl?: string;
  tagline: string;
  bio: string;
  country: string;
  status: 'active' | 'at_risk' | 'pending';
  joinedDate: string;
  interests?: string[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  mentorName: string;
  mentorId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  nextLessonTitle: string;
  bannerColor: string; // 'navy' | 'blue' | 'green'
  description: string;
  level: 'Level 1' | 'Level 2';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  type: 'video' | 'reading' | 'quiz' | 'discussion';
  summary: string;
}

export interface Project {
  id: string;
  title: string;
  category: string; // 'Digital inclusion' | 'Climate action' | 'Health' | 'AgriTech'
  status: 'in_progress' | 'planning' | 'completed' | 'review';
  nextTask: string;
  progressPercent: number;
  dueDate: string;
  bannerColor: string;
  description: string;
  teamId: string;
  teamName: string;
  tasks: ProjectTask[];
  beneficiariesTarget: number;
  communityLocation: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  assignedTo: string;
  completed: boolean;
  dueDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleTitle: string;
  focusArea: string;
  status: 'online' | 'away' | 'offline';
  initials: string;
  isCurrentUser?: boolean;
}

export interface LectureSession {
  id: string;
  title: string;
  day: string;
  month: string;
  fullDate: string;
  timeSlot: string;
  type: 'Webinar' | 'Workshop' | 'Clinic' | 'Live Session';
  courseTopic: string;
  mentorName: string;
  registeredCount: number;
  capacity?: number;
  isUpcoming: boolean;
  status: 'upcoming' | 'live' | 'past' | 'draft';
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'PDF' | 'DOCX' | 'PPT' | 'ZIP' | 'Link';
  fileSize: string;
  authorOrSource: string;
  dateAdded: string;
  category: 'course_materials' | 'project_tools' | 'staff_resources' | 'student_library';
  downloadUrl?: string;
  saved?: boolean;
  published?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
  attachmentName?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  name: string;
  avatarText: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  unreadCount?: number;
  isGroup?: boolean;
  messages: ChatMessage[];
}

export interface StudentProgressRecord {
  id: string;
  name: string;
  email: string;
  initials: string;
  enrolledCoursesCount: number;
  courseName: string;
  progressPercent: number;
  lastActivity: string;
  status: 'active' | 'at_risk';
  mentorName?: string;
}

export interface MentorRecord {
  id: string;
  name: string;
  email: string;
  initials: string;
  location: string;
  studentsCount: number;
  programsCount: number;
  status: 'active' | 'pending';
  specialization: string;
}

export interface ProgramRecord {
  id: string;
  title: string;
  category: string;
  leadMentor: string;
  registeredCount: number;
  status: 'upcoming' | 'past' | 'draft';
  dateString: string;
  day: string;
  month: string;
  timeSlot: string;
  format: string;
}
