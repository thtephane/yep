export interface JavaFileItem {
  name: string;
  packagePath: string;
  category: 'Entry & Service' | 'Domain Models' | 'Contracts & Interfaces' | 'Exceptions & Build';
  description: string;
  code: string;
}

export const JAVA_SOURCE_FILES: JavaFileItem[] = [
  {
    name: 'Main.java',
    packagePath: 'org.yep.Main',
    category: 'Entry & Service',
    description: 'Main executable demonstrating Encapsulation, Inheritance, Polymorphism, Abstraction, and Exception handling.',
    code: `package org.yep;

import org.yep.contracts.Assessable;
import org.yep.contracts.Verifiable;
import org.yep.exception.EnrollmentException;
import org.yep.model.Administrator;
import org.yep.model.Course;
import org.yep.model.DigitalCertificate;
import org.yep.model.ImpactProject;
import org.yep.model.Lesson;
import org.yep.model.Mentor;
import org.yep.model.Student;
import org.yep.model.Team;
import org.yep.model.User;
import org.yep.service.YEPPlatformService;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("YouthEmpowermentProject (YEP) - Java OOP System Demonstration");

        YEPPlatformService service = new YEPPlatformService();

        // 1. Instantiating Subclasses (Inheritance & Encapsulation)
        Student amina = new Student("u-student", "Amina N.", "amina@example.com", "Uganda", "/avatars/amina.png", 24, 7);
        Student brian = new Student("u-student-2", "Brian O.", "brian@example.ke", "Kenya", "/avatars/brian.png", 18, 5);
        Mentor daniel = new Mentor("u-mentor", "Daniel K.", "daniel@yep.org", "Uganda", "/avatars/daniel.png", "Digital Literacy & Web");
        Administrator nadia = new Administrator("u-admin", "Nadia A.", "nadia@yep.org", "Uganda", "/avatars/nadia.png", "Operations & Governance");

        // 2. Registering into the service
        service.registerUser(amina);
        service.registerUser(brian);
        service.registerUser(daniel);
        service.registerUser(nadia);

        // 3. Creating Courses and Lessons (Composition)
        Course digitalLit = new Course("c1", "Digital Literacy", "Digital Skills", daniel.getFullName());
        digitalLit.addLesson(new Lesson("l1", "Foundations of Online Safety", 45, "Password managers and 2FA"));
        digitalLit.addLesson(new Lesson("l2", "Critical Digital Information", 60, "Evaluating digital sources"));
        service.registerCourse(digitalLit);

        // 4. Enrollment & Exception Handling Demonstration
        try {
            service.enrollStudent(amina.getId(), digitalLit.getId());
            service.enrollStudent(amina.getId(), "non-existent-course-id");
        } catch (EnrollmentException ex) {
            System.out.println("-> Caught expected checked exception: " + ex.getMessage());
        }

        // 5. Cross-Border Virtual Exchange Team (Collaboration contract)
        Team communityTeam = service.createTeam("t-comm", "Community Connect East Africa", "Community Digital Access", daniel.getId());
        service.assignStudentToTeam(communityTeam.getId(), amina.getId());
        service.assignStudentToTeam(communityTeam.getId(), brian.getId());

        // 6. Impact Project Assessment (Assessable contract)
        ImpactProject project = new ImpactProject("p1", "Community Connect Portal", "Digital Inclusion", communityTeam.getId());
        project.submitArtifact("Needs_Assessment_Survey_Kampala.pdf");
        project.updateProgress(85, "Field Testing with 50 Local Youths", 92);

        // 7. Verifiable Digital Credential Issuance
        DigitalCertificate cert = service.issueCertificate(amina.getId(), "Youth Digital Empowerment - Level 1");

        // 8. Polymorphic User Hierarchy Reporting
        List<String> audit = service.generateAuditReport();
        for (String line : audit) {
            System.out.println(line);
        }
    }
}`
  },
  {
    name: 'User.java',
    packagePath: 'org.yep.model.User',
    category: 'Domain Models',
    description: 'Abstract base class: encapsulating ID, email, country, active state; declares abstract polymorphic methods.',
    code: `package org.yep.model;

import java.time.LocalDateTime;
import java.util.Objects;

public abstract class User {
    private final String id;
    private String fullName;
    private String email;
    private String country;
    private String avatarUrl;
    private boolean active;
    private final LocalDateTime registeredAt;

    public User(String id, String fullName, String email, String country, String avatarUrl) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or blank");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Valid email is required");
        }
        this.id = id;
        this.fullName = Objects.requireNonNull(fullName, "Full name cannot be null");
        this.email = email;
        this.country = country != null ? country : "Uganda";
        this.avatarUrl = avatarUrl;
        this.active = true;
        this.registeredAt = LocalDateTime.now();
    }

    public abstract String getRoleTitle();
    public abstract String displayRoleSummary();
    public abstract String getPrimaryKpiMetric();

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
}`
  },
  {
    name: 'Student.java',
    packagePath: 'org.yep.model.Student',
    category: 'Domain Models',
    description: 'Subclass extending User and implementing Verifiable and Collaborative interfaces.',
    code: `package org.yep.model;

import org.yep.contracts.Collaborative;
import org.yep.contracts.Verifiable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Student extends User implements Verifiable, Collaborative {
    private int completedLessons;
    private int currentStreakDays;
    private final List<String> enrolledCourseIds;
    private final List<String> projectIds;
    private String assignedTeamId;

    public Student(String id, String fullName, String email, String country, String avatarUrl,
                   int completedLessons, int currentStreakDays) {
        super(id, fullName, email, country, avatarUrl);
        this.completedLessons = Math.max(0, completedLessons);
        this.currentStreakDays = Math.max(0, currentStreakDays);
        this.enrolledCourseIds = new ArrayList<>();
        this.projectIds = new ArrayList<>();
    }

    @Override
    public String getRoleTitle() { return "Student"; }

    @Override
    public String displayRoleSummary() {
        return String.format("Youth Participant %s | Streak: %d days | Lessons: %d",
                getFullName(), currentStreakDays, completedLessons);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Lessons Done", completedLessons);
    }

    @Override
    public boolean verifyIdentity() {
        return isActive() && getEmail() != null && !getEmail().isEmpty();
    }

    @Override
    public String getVerificationHash() {
        return "HASH-STU-" + Integer.toHexString((getId() + getEmail()).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() { return getRegisteredAt(); }

    @Override
    public void joinTeam(String teamId) { this.assignedTeamId = teamId; }

    @Override
    public void leaveTeam() { this.assignedTeamId = null; }

    @Override
    public String getAssignedTeamId() { return assignedTeamId; }

    @Override
    public boolean isCrossBorderEligible() {
        return getCountry() != null && !getCountry().trim().isEmpty();
    }
}`
  },
  {
    name: 'Mentor.java',
    packagePath: 'org.yep.model.Mentor',
    category: 'Domain Models',
    description: 'Subclass extending User for course facilitators, lecture hosts, and evaluators.',
    code: `package org.yep.model;

import org.yep.contracts.Verifiable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Mentor extends User implements Verifiable {
    private String specialization;
    private final List<String> assignedMenteeIds = new ArrayList<>();
    private int lecturesConducted;

    public Mentor(String id, String fullName, String email, String country, String avatarUrl, String specialization) {
        super(id, fullName, email, country, avatarUrl);
        this.specialization = specialization != null ? specialization : "Digital Literacy";
    }

    @Override
    public String getRoleTitle() { return "Mentor"; }

    @Override
    public String displayRoleSummary() {
        return String.format("Instructor %s (%s) | %d Active Mentees", getFullName(), specialization, assignedMenteeIds.size());
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Active Mentees", assignedMenteeIds.size());
    }

    @Override
    public boolean verifyIdentity() { return isActive() && specialization != null; }

    @Override
    public String getVerificationHash() {
        return "HASH-MTR-" + Integer.toHexString((getId() + specialization).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() { return getRegisteredAt(); }
}`
  },
  {
    name: 'Administrator.java',
    packagePath: 'org.yep.model.Administrator',
    category: 'Domain Models',
    description: 'Subclass extending User for governance, cohort analytics, and curriculum approval.',
    code: `package org.yep.model;

import org.yep.contracts.Verifiable;
import java.time.LocalDateTime;

public class Administrator extends User implements Verifiable {
    private String department;
    private int approvedProgramsCount;

    public Administrator(String id, String fullName, String email, String country, String avatarUrl, String department) {
        super(id, fullName, email, country, avatarUrl);
        this.department = department != null ? department : "Operations";
    }

    @Override
    public String getRoleTitle() { return "Administrator"; }

    @Override
    public String displayRoleSummary() {
        return String.format("Admin %s | Dept: %s | Programs: %d", getFullName(), department, approvedProgramsCount);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Programs Supervised", approvedProgramsCount);
    }

    @Override
    public boolean verifyIdentity() { return isActive(); }

    @Override
    public String getVerificationHash() {
        return "HASH-ADM-" + Integer.toHexString((getId() + department).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() { return getRegisteredAt(); }
}`
  },
  {
    name: 'Course.java',
    packagePath: 'org.yep.model.Course',
    category: 'Domain Models',
    description: 'Course model demonstrating composition with multiple Lesson objects.',
    code: `package org.yep.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Course {
    private final String id;
    private String title;
    private String category;
    private String mentorName;
    private final List<Lesson> lessons = new ArrayList<>();
    private boolean active = true;

    public Course(String id, String title, String category, String mentorName) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.mentorName = mentorName;
    }

    public void addLesson(Lesson lesson) { lessons.add(lesson); }
    public String getId() { return id; }
    public String getTitle() { return title; }
    public List<Lesson> getLessons() { return Collections.unmodifiableList(lessons); }
}`
  },
  {
    name: 'ImpactProject.java',
    packagePath: 'org.yep.model.ImpactProject',
    category: 'Domain Models',
    description: 'Level 2 community project implementing Assessable interface for milestone and rubrics.',
    code: `package org.yep.model;

import org.yep.contracts.Assessable;
import java.util.ArrayList;
import java.util.List;

public class ImpactProject implements Assessable {
    private final String id;
    private String title;
    private String category;
    private String assignedTeamId;
    private int completionPercentage;
    private String nextTask;
    private final List<String> submittedArtifacts = new ArrayList<>();
    private int score;

    public ImpactProject(String id, String title, String category, String assignedTeamId) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.assignedTeamId = assignedTeamId;
    }

    @Override
    public int calculateScore() { return score; }

    @Override
    public boolean isPassed() { return score >= 60 && completionPercentage >= 80; }

    @Override
    public String getAssessmentSummary() {
        return String.format("Project '%s' Assessment: Completion %d%%, Score: %d/100, Status: %s",
                title, completionPercentage, score, isPassed() ? "APPROVED" : "IN_PROGRESS");
    }

    public void updateProgress(int newPercentage, String nextTask, int assignedScore) {
        this.completionPercentage = Math.min(100, Math.max(0, newPercentage));
        this.nextTask = nextTask;
        this.score = Math.min(100, Math.max(0, assignedScore));
    }

    public void submitArtifact(String docName) { submittedArtifacts.add(docName); }
}`
  },
  {
    name: 'Team.java',
    packagePath: 'org.yep.model.Team',
    category: 'Domain Models',
    description: 'Virtual Exchange team enforcing cross-border diversity checks.',
    code: `package org.yep.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Team {
    private final String id;
    private String name;
    private String focalTopic;
    private final List<Student> members = new ArrayList<>();
    private String mentorId;

    public Team(String id, String name, String focalTopic, String mentorId) {
        this.id = id;
        this.name = name;
        this.focalTopic = focalTopic;
        this.mentorId = mentorId;
    }

    public void addMember(Student student) {
        if (!members.contains(student)) {
            members.add(student);
            student.joinTeam(this.id);
        }
    }

    public boolean hasCrossBorderDiversity() {
        Set<String> countries = new HashSet<>();
        for (Student s : members) {
            if (s.getCountry() != null) countries.add(s.getCountry().trim().toLowerCase());
        }
        return countries.size() >= 2;
    }
}`
  },
  {
    name: 'Verifiable.java',
    packagePath: 'org.yep.contracts.Verifiable',
    category: 'Contracts & Interfaces',
    description: 'Interface contract for cryptographic and identity verification.',
    code: `package org.yep.contracts;

import java.time.LocalDateTime;

public interface Verifiable {
    boolean verifyIdentity();
    String getVerificationHash();
    LocalDateTime getVerificationTimestamp();
}`
  },
  {
    name: 'Collaborative.java',
    packagePath: 'org.yep.contracts.Collaborative',
    category: 'Contracts & Interfaces',
    description: 'Interface contract for virtual exchange team membership and cross-border participation.',
    code: `package org.yep.contracts;

public interface Collaborative {
    void joinTeam(String teamId);
    void leaveTeam();
    String getAssignedTeamId();
    boolean isCrossBorderEligible();
}`
  },
  {
    name: 'Assessable.java',
    packagePath: 'org.yep.contracts.Assessable',
    category: 'Contracts & Interfaces',
    description: 'Interface contract for evaluating quizzes, assignments, and impact milestone rubrics.',
    code: `package org.yep.contracts;

public interface Assessable {
    int calculateScore();
    boolean isPassed();
    String getAssessmentSummary();
}`
  },
  {
    name: 'EnrollmentException.java',
    packagePath: 'org.yep.exception.EnrollmentException',
    category: 'Exceptions & Build',
    description: 'Custom checked exception for handling course prerequisite and enrollment issues.',
    code: `package org.yep.exception;

public class EnrollmentException extends Exception {
    private final String courseId;
    private final String studentId;

    public EnrollmentException(String message, String courseId, String studentId) {
        super(String.format("%s [Course: %s, Student: %s]", message, courseId, studentId));
        this.courseId = courseId;
        this.studentId = studentId;
    }

    public String getCourseId() { return courseId; }
    public String getStudentId() { return studentId; }
}`
  },
  {
    name: 'pom.xml',
    packagePath: 'java/pom.xml',
    category: 'Exceptions & Build',
    description: 'Maven Project Object Model build descriptor configured with Java 17 and JUnit 5.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.yep</groupId>
    <artifactId>youth-empowerment-platform</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>`
  }
];
