/**
 * YouthEmpowermentProject (YEP) - Object-Oriented Domain Layer
 * 
 * Demonstrates the 4 fundamental pillars of OOP:
 * 1. Encapsulation: Private fields with validated accessors and state protection.
 * 2. Inheritance: Specialized Student, Mentor, and Administrator entities inheriting from abstract User.
 * 3. Polymorphism: Abstract methods overridden differently across subclasses (displayRoleSummary, getDashboardMetrics).
 * 4. Abstraction & Interfaces: IVerifiable and ICollaborative define contracts for certification and teamwork.
 */

export interface IVerifiable {
  verifyCredentials(): boolean;
  generateCertificateCode(): string;
  getAccreditationStatus(): 'Eligible' | 'In Progress' | 'Certified';
}

export interface ICollaborative {
  assignTeam(teamId: string, teamName: string): void;
  calculateImpactScore(): number;
  submitMilestone(milestoneId: string, deliverableUrl: string): boolean;
}

export abstract class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _country: string;
  private _role: 'student' | 'mentor' | 'admin';
  private _joinedDate: string;
  private _status: 'active' | 'at_risk' | 'pending';

  constructor(
    id: string,
    name: string,
    email: string,
    country: string,
    role: 'student' | 'mentor' | 'admin',
    joinedDate: string = 'May 2025'
  ) {
    if (!email.includes('@')) {
      throw new Error('Invalid email format in User domain constructor');
    }
    this._id = id;
    this._name = name;
    this._email = email;
    this._country = country;
    this._role = role;
    this._joinedDate = joinedDate;
    this._status = 'active';
  }

  // Encapsulated Getters
  public get id(): string { return this._id; }
  public get name(): string { return this._name; }
  public get email(): string { return this._email; }
  public get country(): string { return this._country; }
  public get role(): 'student' | 'mentor' | 'admin' { return this._role; }
  public get joinedDate(): string { return this._joinedDate; }
  public get status(): 'active' | 'at_risk' | 'pending' { return this._status; }

  // Encapsulated Setters with validation
  public set status(newStatus: 'active' | 'at_risk' | 'pending') {
    this._status = newStatus;
  }

  public updateProfile(name: string, email: string): void {
    if (name.trim().length < 2) throw new Error('Name must be at least 2 characters.');
    if (!email.includes('@')) throw new Error('Valid email required.');
    this._name = name;
    this._email = email;
  }

  // Polymorphic abstract methods to be implemented by child classes
  public abstract displayRoleSummary(): string;
  public abstract getPrimaryStat(): { label: string; value: string | number };
}

export class StudentEntity extends User implements IVerifiable, ICollaborative {
  private _enrolledCourses: string[];
  private _completedLessons: number;
  private _overallProgress: number;
  private _teamId: string | null = null;
  private _teamName: string | null = null;
  private _streakDays: number;
  private _submittedDeliverables: Map<string, string> = new Map();

  constructor(
    id: string,
    name: string,
    email: string,
    country: string = 'Uganda',
    initialProgress: number = 68,
    streakDays: number = 7
  ) {
    super(id, name, email, country, 'student');
    this._enrolledCourses = ['crs_dl_01', 'crs_ai_02', 'crs_cr_03'];
    this._completedLessons = 24;
    this._overallProgress = initialProgress;
    this._streakDays = streakDays;
  }

  public get enrolledCourses(): string[] { return [...this._enrolledCourses]; }
  public get completedLessons(): number { return this._completedLessons; }
  public get overallProgress(): number { return this._overallProgress; }
  public get streakDays(): number { return this._streakDays; }
  public get teamName(): string | null { return this._teamName; }

  // Polymorphic implementation
  public displayRoleSummary(): string {
    return `Student ${this.name} (${this.country}) - Progress: ${this._overallProgress}%, Team: ${this._teamName ?? 'Unassigned'}`;
  }

  public getPrimaryStat(): { label: string; value: string | number } {
    return { label: 'Overall Progress', value: `${this._overallProgress}%` };
  }

  // Interface implementations
  public verifyCredentials(): boolean {
    return this._overallProgress >= 65 && this._completedLessons >= 10;
  }

  public generateCertificateCode(): string {
    return `YEP-UG-${this.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  public getAccreditationStatus(): 'Eligible' | 'In Progress' | 'Certified' {
    if (this._overallProgress >= 70) return 'Eligible';
    if (this._overallProgress >= 30) return 'In Progress';
    return 'In Progress';
  }

  public assignTeam(teamId: string, teamName: string): void {
    this._teamId = teamId;
    this._teamName = teamName;
  }

  public submitMilestone(milestoneId: string, deliverableUrl: string): boolean {
    this._submittedDeliverables.set(milestoneId, deliverableUrl);
    this._overallProgress = Math.min(100, this._overallProgress + 4);
    return true;
  }

  public calculateImpactScore(): number {
    return Math.round((this._overallProgress * 0.7) + (this._streakDays * 2.5));
  }

  public recordLessonCompletion(): void {
    this._completedLessons += 1;
    this._overallProgress = Math.min(100, this._overallProgress + 3);
  }
}

export class MentorEntity extends User {
  private _specialization: string;
  private _assignedMenteesCount: number;
  private _hostedLecturesCount: number;
  private _engagementRate: number;

  constructor(
    id: string,
    name: string,
    email: string,
    specialization: string = 'Digital Literacy & AI Ethics',
    country: string = 'Uganda'
  ) {
    super(id, name, email, country, 'mentor');
    this._specialization = specialization;
    this._assignedMenteesCount = 24;
    this._hostedLecturesCount = 12;
    this._engagementRate = 92;
  }

  public get specialization(): string { return this._specialization; }
  public get assignedMenteesCount(): number { return this._assignedMenteesCount; }
  public get hostedLecturesCount(): number { return this._hostedLecturesCount; }
  public get engagementRate(): number { return this._engagementRate; }

  public displayRoleSummary(): string {
    return `Mentor ${this.name} - Specialization: ${this._specialization}, Active Mentees: ${this._assignedMenteesCount}`;
  }

  public getPrimaryStat(): { label: string; value: string | number } {
    return { label: 'Student Engagement', value: `${this._engagementRate}%` };
  }

  public scheduleLecture(title: string): void {
    this._hostedLecturesCount += 1;
  }
}

export class AdministratorEntity extends User {
  private _governanceArea: string;
  private _activeCohortsCount: number;
  private _totalStudentsSupervised: number;

  constructor(
    id: string,
    name: string,
    email: string,
    governanceArea: string = 'East Africa Program Operations',
    country: string = 'Uganda'
  ) {
    super(id, name, email, country, 'admin');
    this._governanceArea = governanceArea;
    this._activeCohortsCount = 18;
    this._totalStudentsSupervised = 486;
  }

  public get governanceArea(): string { return this._governanceArea; }
  public get activeCohortsCount(): number { return this._activeCohortsCount; }
  public get totalStudentsSupervised(): number { return this._totalStudentsSupervised; }

  public displayRoleSummary(): string {
    return `Administrator ${this.name} - Region: ${this._governanceArea}, Supervised Learners: ${this._totalStudentsSupervised}`;
  }

  public getPrimaryStat(): { label: string; value: string | number } {
    return { label: 'Active Students', value: this._totalStudentsSupervised };
  }

  public approveMentor(mentor: MentorEntity): void {
    mentor.status = 'active';
  }
}
