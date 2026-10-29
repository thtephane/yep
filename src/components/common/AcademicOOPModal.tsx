import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Layers,
  Code2,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Play,
  Terminal,
  Cpu,
  RefreshCw,
  FolderCode,
  FileCode2,
} from 'lucide-react';
import { academicOOPDoc } from '../../data/mockData';
import {
  StudentEntity,
  MentorEntity,
  AdministratorEntity,
  User,
} from '../../domain/oopClasses';

interface AcademicOOPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademicOOPModal: React.FC<AcademicOOPModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'uml_class' | 'oop_playground' | 'use_case' | 'erd_dfd' | 'java_files' | 'sources'
  >('overview');

  const [copiedFileName, setCopiedFileName] = useState<string | null>(null);
  const [selectedJavaFile, setSelectedJavaFile] = useState<string>('User.java');

  // Interactive OOP Engine state
  const [demoStudent] = useState(new StudentEntity('std_01', 'Amina N.', 'amina@example.com', 'Uganda', 68, 7));
  const [demoMentor] = useState(new MentorEntity('men_01', 'Daniel K.', 'daniel@yep.org', 'Digital Literacy & AI Ethics', 'Uganda'));
  const [demoAdmin] = useState(new AdministratorEntity('adm_01', 'Nadia A.', 'nadia@yep.org', 'East Africa Program Operations', 'Uganda'));

  const [polymorphicOutput, setPolymorphicOutput] = useState<string[]>([]);
  const [encapsulationFeedback, setEncapsulationFeedback] = useState<string | null>(null);
  const [testEmailInput, setTestEmailInput] = useState('amina.namaganda@yep.ac.ug');

  if (!isOpen) return null;

  // Run live polymorphic method dispatch
  const handleRunPolymorphicDispatch = () => {
    const polymorphicUsers: User[] = [demoStudent, demoMentor, demoAdmin];
    const results = polymorphicUsers.map((u) => {
      const primaryStat = u.getPrimaryStat();
      return `[Polymorphic Dispatch] -> ${u.constructor.name}.displayRoleSummary():\n"${u.displayRoleSummary()}"\nPrimary Stat: ${primaryStat.label} = ${primaryStat.value}\n`;
    });
    setPolymorphicOutput(results);
  };

  const handleTestEncapsulation = () => {
    try {
      demoStudent.updateProfile('Amina Namaganda', testEmailInput);
      setEncapsulationFeedback(`Success: Encapsulated setter validated and updated name to "${demoStudent.name}" and email to "${demoStudent.email}".`);
    } catch (err: any) {
      setEncapsulationFeedback(`Encapsulation Error: ${err.message}`);
    }
  };

  const javaSourceFiles: Record<string, string> = {
    'User.java': `/**
 * Package: org.yep.platform.domain
 * YouthEmpowermentProject (YEP) - Abstract Base Class
 * 
 * Demonstrates:
 * - Data Encapsulation via private state and validated mutators
 * - Polymorphism via abstract method contracts
 */
package org.yep.platform.domain;

import java.time.LocalDateTime;
import java.util.Objects;

public abstract class User {
    private final String id;
    private String name;
    private String email;
    private final String country;
    private final String role;
    private final LocalDateTime registeredAt;
    private String accountStatus; // ACTIVE, AT_RISK, PENDING

    protected User(String id, String name, String email, String country, String role) {
        if (id == null || id.isBlank()) throw new IllegalArgumentException("User ID cannot be empty");
        if (email == null || !email.contains("@")) throw new IllegalArgumentException("Invalid user email");
        this.id = id;
        this.name = Objects.requireNonNull(name, "Name required");
        this.email = email;
        this.country = country != null ? country : "Uganda";
        this.role = role;
        this.registeredAt = LocalDateTime.now();
        this.accountStatus = "ACTIVE";
    }

    // Encapsulated Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getCountry() { return country; }
    public String getRole() { return role; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public String getAccountStatus() { return accountStatus; }

    // Mutator with invariant validation
    public void setAccountStatus(String newStatus) {
        if (newStatus.equals("ACTIVE") || newStatus.equals("AT_RISK") || newStatus.equals("PENDING")) {
            this.accountStatus = newStatus;
        } else {
            throw new IllegalArgumentException("Invalid status transition: " + newStatus);
        }
    }

    public void updateContactInformation(String newName, String newEmail) {
        if (newName != null && newName.length() >= 2) this.name = newName;
        if (newEmail != null && newEmail.contains("@")) this.email = newEmail;
    }

    /**
     * Polymorphic contract: Subclasses must provide customized summary string.
     */
    public abstract String displayRoleSummary();

    /**
     * Polymorphic contract: Subclasses return primary KPI metric for dashboard.
     */
    public abstract String getPrimaryKpiMetric();
}`,
    'Student.java': `/**
 * Package: org.yep.platform.domain
 * Level 1 & Level 2 Youth Participant Class
 * Demonstrates Inheritance & Multiple Interface Realization
 */
package org.yep.platform.domain;

import org.yep.platform.contracts.Verifiable;
import org.yep.platform.contracts.Collaborative;
import java.util.*;

public class Student extends User implements Verifiable, Collaborative {
    private final List<String> enrolledCourseIds;
    private int completedLessonsCount;
    private double overallProgressPercent;
    private int dayStreak;
    private String assignedTeamId;

    public Student(String id, String name, String email, String country) {
        super(id, name, email, country, "STUDENT");
        this.enrolledCourseIds = new ArrayList<>(Arrays.asList("crs_dl_01", "crs_ai_02"));
        this.completedLessonsCount = 24;
        this.overallProgressPercent = 68.0;
        this.dayStreak = 7;
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Youth Participant %s (%s) | Progress: %.1f%% | Streak: %d days",
                getName(), getCountry(), overallProgressPercent, dayStreak);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%.1f%% Overall Completion", overallProgressPercent);
    }

    // Realizing Verifiable Interface
    @Override
    public boolean verifyEligibilityForCertificate() {
        return this.overallProgressPercent >= 65.0 && this.completedLessonsCount >= 10;
    }

    @Override
    public String generateDigitalCertificateCode() {
        return "CERT-YEP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Realizing Collaborative Interface
    @Override
    public void assignVirtualExchangeTeam(String teamId) {
        this.assignedTeamId = teamId;
    }

    @Override
    public double calculateImpactScore() {
        return (this.overallProgressPercent * 0.7) + (this.dayStreak * 2.5);
    }

    public void completeLesson(String courseId, String lessonId) {
        this.completedLessonsCount++;
        this.overallProgressPercent = Math.min(100.0, this.overallProgressPercent + 3.0);
    }
}`,
    'Mentor.java': `/**
 * Package: org.yep.platform.domain
 * Facilitator / Domain Specialist Entity
 */
package org.yep.platform.domain;

import java.util.*;

public class Mentor extends User {
    private final String specialization;
    private int activeMenteesCount;
    private int hostedSessionsCount;
    private double cohortEngagementRate;

    public Mentor(String id, String name, String email, String country, String specialization) {
        super(id, name, email, country, "MENTOR");
        this.specialization = specialization;
        this.activeMenteesCount = 24;
        this.hostedSessionsCount = 12;
        this.cohortEngagementRate = 92.0;
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Mentor %s | Spec: %s | Active Cohort: %d learners",
                getName(), specialization, activeMenteesCount);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%.1f%% Learner Engagement", cohortEngagementRate);
    }

    public void hostSession(String sessionTitle) {
        this.hostedSessionsCount++;
    }

    public String getSpecialization() {
        return specialization;
    }
}`,
    'Administrator.java': `/**
 * Package: org.yep.platform.domain
 * Institutional Administrator Entity
 */
package org.yep.platform.domain;

public class Administrator extends User {
    private final String regionalHub;
    private int totalSupervisedLearners;
    private int activeCohortsCount;

    public Administrator(String id, String name, String email, String country, String regionalHub) {
        super(id, name, email, country, "ADMINISTRATOR");
        this.regionalHub = regionalHub;
        this.totalSupervisedLearners = 486;
        this.activeCohortsCount = 18;
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Administrator %s | Hub: %s | Supervised: %d youth across %d cohorts",
                getName(), regionalHub, totalSupervisedLearners, activeCohortsCount);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Supervised Learners", totalSupervisedLearners);
    }

    public void approveMentorApplication(Mentor mentor) {
        mentor.setAccountStatus("ACTIVE");
    }
}`,
    'ImpactProject.java': `/**
 * Package: org.yep.platform.domain
 * Level 2 Collaborative Community Solution
 */
package org.yep.platform.domain;

import java.time.LocalDate;
import java.util.*;

public class ImpactProject {
    private final String projectId;
    private String title;
    private String thematicArea; // Digital Inclusion, Climate Action, Health, AgriTech
    private double progressPercentage;
    private final LocalDate targetDeadline;
    private final List<String> taskChecklist;

    public ImpactProject(String id, String title, String thematicArea, LocalDate deadline) {
        this.projectId = id;
        this.title = title;
        this.thematicArea = thematicArea;
        this.targetDeadline = deadline;
        this.progressPercentage = 0.0;
        this.taskChecklist = new ArrayList<>();
    }

    public void completeTask(String taskName) {
        if (!taskChecklist.contains(taskName)) {
            taskChecklist.add(taskName);
            this.progressPercentage = Math.min(100.0, this.progressPercentage + 15.0);
        }
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }
}`,
    'Verifiable.java': `/**
 * Package: org.yep.platform.contracts
 * Interface Contract for Credential Verification
 */
package org.yep.platform.contracts;

public interface Verifiable {
    boolean verifyEligibilityForCertificate();
    String generateDigitalCertificateCode();
}`,
  };

  const copyCode = (fileName: string) => {
    navigator.clipboard.writeText(javaSourceFiles[fileName] || '');
    setCopiedFileName(fileName);
    setTimeout(() => setCopiedFileName(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 px-6 bg-[#0E1E33] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <FolderCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-widest text-blue-300 uppercase">
                  Semester Assignment Specification & Design
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-100 font-semibold">
                  OOP in Java
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                YouthEmpowermentProject (YEP) – Technical Architecture & OOP Blueprint
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-2.5 border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. System Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('oop_playground')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'oop_playground'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>2. Live OOP Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('uml_class')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'uml_class'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            3. UML Class Diagram
          </button>
          <button
            onClick={() => setActiveTab('use_case')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'use_case'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            4. UML Use Cases
          </button>
          <button
            onClick={() => setActiveTab('erd_dfd')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'erd_dfd'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            5. ERD & DFD Architecture
          </button>
          <button
            onClick={() => setActiveTab('java_files')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'java_files'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>6. Complete Java Source</span>
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3.5 py-2.5 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-[#132A44] text-[#132A44] bg-white font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            7. Research Citations (5 Sources)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-sm space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base">
                    YouthEmpowermentProject (YEP) – East Africa Context
                  </h3>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                    Ages 18–35 Demographics
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Young people in Uganda and East Africa face persistent youth unemployment, regional digital skills mismatches, digital misinformation, and ethical AI challenges. The YEP web-based platform connects youth with structured, two-tiered Virtual Exchange tracks:
                  <br /><br />
                  <strong>• Level 1 Virtual Exchange:</strong> Large cohort digital literacy, responsible AI education, prompt hygiene, and cross-cultural communication sessions.
                  <br />
                  <strong>• Level 2 Impact Projects:</strong> Selected youth teams collaborating on tangible, real-world solutions in employment, education, agriculture, health, climate change, and digital inclusion across regional hubs (Kampala, Jinja, Gulu, and Mbarara).
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Functional Requirements (FR)
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {academicOOPDoc.functionalRequirements.map((fr, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-start gap-2.5 shadow-2xs">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug text-slate-800">{fr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Non-Functional Requirements (NFR)
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {academicOOPDoc.nonFunctionalRequirements.map((nfr, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs flex items-start gap-2.5 shadow-2xs">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-snug text-slate-800">{nfr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Stakeholder Needs Matrix
                </h4>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5 w-1/3">Stakeholder Group</th>
                        <th className="p-3.5">Key Responsibilities & System Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {academicOOPDoc.stakeholderAnalysis.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="p-3.5 font-semibold text-slate-900">{s.role}</td>
                          <td className="p-3.5 text-slate-600 leading-relaxed">{s.needs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE OOP ENGINE PLAYGROUND */}
          {activeTab === 'oop_playground' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>Interactive OOP Principles Demonstration</span>
                </div>
                <h3 className="text-base font-bold text-white">Live Domain Engine Execution</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Test and inspect the four core pillars of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, and Interface Abstraction) as they run inside the YEP platform model.
                </p>
              </div>

              {/* 1. Polymorphism Test */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      1. Polymorphism & Dynamic Method Dispatch
                    </h4>
                    <p className="text-xs text-slate-500">
                      An array of type <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">User[]</code> invokes <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">displayRoleSummary()</code> at runtime.
                    </p>
                  </div>
                  <button
                    onClick={handleRunPolymorphicDispatch}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#132A44] hover:bg-[#0D1F33] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Execute Polymorphism</span>
                  </button>
                </div>

                {polymorphicOutput.length > 0 ? (
                  <div className="bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {polymorphicOutput.join('\n')}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400 text-center">
                    Click &quot;Execute Polymorphism&quot; to invoke dynamic method dispatch across Student, Mentor, and Administrator entities.
                  </div>
                )}
              </div>

              {/* 2. Encapsulation Test */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  2. Encapsulation & Mutator Validation
                </h4>
                <p className="text-xs text-slate-500">
                  Private fields <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">_email</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">_overallProgress</code> are protected from outside mutation. Setters enforce domain validation.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <input
                    type="text"
                    value={testEmailInput}
                    onChange={(e) => setTestEmailInput(e.target.value)}
                    placeholder="Enter email to test setter validation"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                  <button
                    onClick={handleTestEncapsulation}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    Test updateProfile() Setter
                  </button>
                </div>

                {encapsulationFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-mono ${
                      encapsulationFeedback.startsWith('Success')
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {encapsulationFeedback}
                  </div>
                )}
              </div>

              {/* 3. Interface Verification Test */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  3. Interface Contracts (<code className="font-mono text-blue-700">IVerifiable</code> &amp; <code className="font-mono text-blue-700">ICollaborative</code>)
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block">StudentEntity.verifyCredentials()</span>
                    <span className="text-slate-500 block">Condition: Progress &ge; 65% and Lessons &ge; 10</span>
                    <span className="font-mono font-bold text-emerald-700 block mt-1">
                      Result: {demoStudent.verifyCredentials() ? 'true (Eligible)' : 'false'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block">StudentEntity.generateCertificateCode()</span>
                    <span className="text-slate-500 block">Contract: Returns unique verified digital hash</span>
                    <span className="font-mono font-bold text-blue-700 block mt-1 truncate">
                      Result: {demoStudent.generateCertificateCode()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UML CLASS DIAGRAM */}
          {activeTab === 'uml_class' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Complete UML Class Diagram</h3>
                  <p className="text-xs text-slate-500">
                    Object-Oriented Architecture showing Abstract Classes, Inheritance, Polymorphism, and Association.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  Assignment Objective 5
                </span>
              </div>

              <div className="p-6 bg-slate-950 rounded-2xl text-white font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <div className="min-w-[720px] space-y-6">
                  {/* Interfaces */}
                  <div className="flex justify-around gap-4">
                    <div className="border-2 border-emerald-500/80 rounded-xl p-3 bg-emerald-950/40 w-72">
                      <div className="text-center font-bold text-emerald-400 mb-1">
                        &laquo;interface&raquo;<br />Verifiable
                      </div>
                      <div className="border-t border-emerald-500/40 pt-1.5 text-[11px] text-slate-300">
                        + verifyEligibilityForCertificate(): boolean<br />
                        + generateDigitalCertificateCode(): String
                      </div>
                    </div>

                    <div className="border-2 border-emerald-500/80 rounded-xl p-3 bg-emerald-950/40 w-72">
                      <div className="text-center font-bold text-emerald-400 mb-1">
                        &laquo;interface&raquo;<br />Collaborative
                      </div>
                      <div className="border-t border-emerald-500/40 pt-1.5 text-[11px] text-slate-300">
                        + assignVirtualExchangeTeam(teamId: String): void<br />
                        + calculateImpactScore(): double
                      </div>
                    </div>
                  </div>

                  {/* Abstract Base Class */}
                  <div className="flex justify-center">
                    <div className="border-2 border-blue-400 rounded-xl p-4 bg-blue-950/70 w-96 shadow-lg">
                      <div className="text-center font-bold text-blue-300 mb-1">
                        &laquo;abstract&raquo;<br />User
                      </div>
                      <div className="border-t border-blue-400/40 pt-1.5 text-[11px] text-slate-300 space-y-0.5">
                        <div>- id: String</div>
                        <div>- name: String</div>
                        <div>- email: String</div>
                        <div>- country: String</div>
                        <div>- role: String</div>
                        <div>- accountStatus: String</div>
                      </div>
                      <div className="border-t border-blue-400/40 pt-1.5 text-[11px] text-blue-200 space-y-0.5">
                        <div>+ displayRoleSummary(): String (abstract)</div>
                        <div>+ getPrimaryKpiMetric(): String (abstract)</div>
                        <div>+ updateContactInformation(name, email): void</div>
                      </div>
                    </div>
                  </div>

                  {/* Inherited Classes */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-amber-400/80 rounded-xl p-3 bg-amber-950/40">
                      <div className="text-center font-bold text-amber-300 mb-1">Student &larr; User</div>
                      <div className="border-t border-amber-400/30 pt-1 text-[10px] text-slate-300">
                        - enrolledCourseIds: List&lt;String&gt;<br />
                        - completedLessons: int<br />
                        - overallProgress: double
                      </div>
                      <div className="border-t border-amber-400/30 pt-1 text-[10px] text-amber-200">
                        + displayRoleSummary(): String<br />
                        + verifyEligibility(): boolean<br />
                        + calculateImpactScore(): double
                      </div>
                    </div>

                    <div className="border-2 border-purple-400/80 rounded-xl p-3 bg-purple-950/40">
                      <div className="text-center font-bold text-purple-300 mb-1">Mentor &larr; User</div>
                      <div className="border-t border-purple-400/30 pt-1 text-[10px] text-slate-300">
                        - specialization: String<br />
                        - activeMenteesCount: int<br />
                        - cohortEngagementRate: double
                      </div>
                      <div className="border-t border-purple-400/30 pt-1 text-[10px] text-purple-200">
                        + displayRoleSummary(): String<br />
                        + hostSession(title): void<br />
                        + trackAtRiskStudents(): List
                      </div>
                    </div>

                    <div className="border-2 border-cyan-400/80 rounded-xl p-3 bg-cyan-950/40">
                      <div className="text-center font-bold text-cyan-300 mb-1">Administrator &larr; User</div>
                      <div className="border-t border-cyan-400/30 pt-1 text-[10px] text-slate-300">
                        - regionalHub: String<br />
                        - supervisedLearners: int<br />
                        - activeCohortsCount: int
                      </div>
                      <div className="border-t border-cyan-400/30 pt-1 text-[10px] text-cyan-200">
                        + displayRoleSummary(): String<br />
                        + approveMentor(mentor): void<br />
                        + generateOutcomeReport(): Report
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: USE CASE */}
          {activeTab === 'use_case' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">UML Use Case Specification</h3>
                  <p className="text-xs text-slate-500">
                    System boundary and primary user interactions across East African youth stakeholders.
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                  Assignment Objective 4
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-blue-900 flex items-center gap-2">
                    <span>Actor: Youth Participant (18–35)</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Register and create learner identity</li>
                    <li>Enroll in Level 1 courses (Digital Literacy &amp; AI)</li>
                    <li>Complete lesson quizzes &amp; track progress</li>
                    <li>Join Level 2 Virtual Exchange team</li>
                    <li>Collaborate on Impact Project workspace</li>
                    <li>Attend live webinar / mentor clinic</li>
                    <li>Message mentor and teammates</li>
                    <li>Download completion transcript &amp; badge</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-2">
                    <span>Actor: Mentor / Facilitator</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Create &amp; schedule lecture sessions</li>
                    <li>Launch live virtual exchange rooms</li>
                    <li>Review student progress &amp; flag at-risk learners</li>
                    <li>Provide milestone feedback on impact projects</li>
                    <li>Upload &amp; share learning resources</li>
                    <li>Communicate with mentee cohorts</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-purple-900 flex items-center gap-2">
                    <span>Actor: Administrator</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                    <li>Manage student enrollments &amp; cohort rosters</li>
                    <li>Review &amp; approve mentor applications</li>
                    <li>Create &amp; publish new regional programs</li>
                    <li>Oversee safeguarding alerts and engagement</li>
                    <li>Generate aggregate outcome &amp; impact reports</li>
                    <li>Configure security rules &amp; Two-Factor Auth</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ERD & DFD */}
          {activeTab === 'erd_dfd' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Entity-Relationship (ER) Schema</h3>
                <p className="text-xs text-slate-500 mb-3">Relational schema design matching Assignment Objective 6.</p>
                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 text-xs font-mono space-y-3">
                  <div className="text-blue-300 font-bold">USERS (user_id PK, full_name, email UNIQUE, role, country, phone, avatar_url, created_at)</div>
                  <div className="text-emerald-300 font-bold">COURSES (course_id PK, title, category, level, mentor_id FK &rarr; USERS, duration_hrs)</div>
                  <div className="text-amber-300 font-bold">ENROLLMENTS (enrollment_id PK, user_id FK &rarr; USERS, course_id FK &rarr; COURSES, progress_pct, status, completion_date)</div>
                  <div className="text-purple-300 font-bold">TEAMS (team_id PK, team_name, mentor_id FK &rarr; USERS, cohort_code, created_at)</div>
                  <div className="text-cyan-300 font-bold">PROJECTS (project_id PK, team_id FK &rarr; TEAMS, title, category, status, due_date, impact_metric)</div>
                  <div className="text-pink-300 font-bold">MESSAGES (msg_id PK, sender_id FK &rarr; USERS, conversation_id, content, sent_at, read_flag)</div>
                  <div className="text-orange-300 font-bold">CERTIFICATES (cert_id PK, student_id FK &rarr; USERS, course_id FK &rarr; COURSES, issue_date, cert_code UNIQUE)</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-1">Data Flow Diagram (DFD) Flow</h3>
                <p className="text-xs text-slate-500 mb-2">DFD Level 0 &amp; Level 1 Context Architecture</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                  <p><strong>Level 0 Context:</strong> Youth, Mentors, and Admins interact through the secure YEP Web Gateway. Inputs: Registrations, Quiz Submissions, Deliverables, Lecture Schedules. Outputs: Real-time Analytics, Certificates, Direct Messages, Notification Alerts.</p>
                  <p><strong>Level 1 Decomposition:</strong>
                    <br />&bull; Process 1.0: Auth &amp; Access Control
                    <br />&bull; Process 2.0: Virtual Exchange Learning Management
                    <br />&bull; Process 3.0: Team Formation &amp; Project Workspace Collaboration
                    <br />&bull; Process 4.0: Assessment, Grading &amp; Credential Issuance
                    <br />&bull; Process 5.0: Regional Impact &amp; Donor Reporting Analytics
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMPLETE JAVA SOURCE FILES */}
          {activeTab === 'java_files' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Complete Java OOP Source Code</h3>
                  <p className="text-xs text-slate-500">
                    Production-quality Java source code formatted for academic grading and OOP assessment.
                  </p>
                </div>
                <button
                  onClick={() => copyCode(selectedJavaFile)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#132A44] hover:bg-[#0D1F33] text-white transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedFileName === selectedJavaFile ? 'Copied File!' : `Copy ${selectedJavaFile}`}</span>
                </button>
              </div>

              {/* File Selector Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
                {Object.keys(javaSourceFiles).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setSelectedJavaFile(fileName)}
                    className={`px-3 py-1.5 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                      selectedJavaFile === fileName
                        ? 'bg-slate-900 text-blue-300 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {fileName}
                  </button>
                ))}
              </div>

              {/* Code viewer */}
              <div className="relative">
                <pre className="p-5 bg-slate-950 text-blue-200 font-mono text-xs rounded-2xl overflow-x-auto max-h-[460px] border border-slate-800 leading-relaxed">
                  <code>{javaSourceFiles[selectedJavaFile]}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 7: CITATIONS */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900">Five (5) Credible Research Citations</h3>
                <p className="text-xs text-slate-500">
                  Meeting Assignment Requirement: Government reports, international development agencies, and academic papers on East African youth digital empowerment.
                </p>
              </div>

              <div className="space-y-3">
                {academicOOPDoc.citations.map((cite, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue-700">{cite.source}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Ref #{idx + 1}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{cite.title}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>System Implication:</strong> {cite.keyTakeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            YEP Semester Project (OOP Using Java Programming) &bull; East Africa Digital Empowerment
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#132A44] text-white text-xs font-semibold hover:bg-[#0D1F33] transition-colors cursor-pointer"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
