package org.yep.service;

import org.yep.exception.EnrollmentException;
import org.yep.model.Course;
import org.yep.model.DigitalCertificate;
import org.yep.model.ImpactProject;
import org.yep.model.Mentor;
import org.yep.model.Student;
import org.yep.model.Team;
import org.yep.model.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Service Layer: YEPPlatformService
 * Demonstrates:
 * - Polymorphism in action: Managing collections of User subclasses uniformly.
 * - Business logic and constraint enforcement.
 * - Exception throwing and propagation.
 */
public class YEPPlatformService {
    private final Map<String, User> userRegistry = new HashMap<>();
    private final Map<String, Course> courseRegistry = new HashMap<>();
    private final Map<String, Team> teamRegistry = new HashMap<>();
    private final Map<String, ImpactProject> projectRegistry = new HashMap<>();
    private final List<DigitalCertificate> issuedCertificates = new ArrayList<>();

    public void registerUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        userRegistry.put(user.getId(), user);
    }

    public void registerCourse(Course course) {
        if (course == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }
        courseRegistry.put(course.getId(), course);
    }

    public void enrollStudent(String studentId, String courseId) throws EnrollmentException {
        User user = userRegistry.get(studentId);
        if (user == null) {
            throw new EnrollmentException("Student does not exist", courseId, studentId);
        }
        if (!(user instanceof Student student)) {
            throw new EnrollmentException("User is not a student role", courseId, studentId);
        }
        Course course = courseRegistry.get(courseId);
        if (course == null || !course.isActive()) {
            throw new EnrollmentException("Course not found or inactive", courseId, studentId);
        }

        student.enrollCourse(courseId);
    }

    public Team createTeam(String teamId, String teamName, String focalTopic, String mentorId) {
        Team team = new Team(teamId, teamName, focalTopic, mentorId);
        teamRegistry.put(teamId, team);
        return team;
    }

    public void assignStudentToTeam(String teamId, String studentId) {
        Team team = teamRegistry.get(teamId);
        User user = userRegistry.get(studentId);

        if (team == null) {
            throw new IllegalArgumentException("Team not found: " + teamId);
        }
        if (!(user instanceof Student student)) {
            throw new IllegalArgumentException("Cannot assign non-student to team: " + studentId);
        }

        team.addMember(student);
    }

    public DigitalCertificate issueCertificate(String studentId, String programTitle) {
        User user = userRegistry.get(studentId);
        if (!(user instanceof Student student)) {
            throw new IllegalArgumentException("Certificate recipient must be a student");
        }

        String certNum = "YEP-CERT-" + System.currentTimeMillis();
        DigitalCertificate cert = new DigitalCertificate(certNum, student.getFullName(), programTitle, "Youth Empowerment Project Board");
        issuedCertificates.add(cert);
        return cert;
    }

    /**
     * Polymorphic traversal: treats Students, Mentors, and Administrators
     * identically through the User abstract base class.
     */
    public List<String> generateAuditReport() {
        List<String> report = new ArrayList<>();
        report.add("=== YEP PLATFORM POLYMORPHIC AUDIT REPORT ===");
        for (User user : userRegistry.values()) {
            // Polymorphic dispatch: invokes overridden method on concrete instance
            report.add(String.format("User ID: %-8s | Role: %-12s | Summary: %s | KPI: %s",
                    user.getId(),
                    user.getRoleTitle(),
                    user.displayRoleSummary(),
                    user.getPrimaryKpiMetric()));
        }
        return report;
    }

    public Optional<User> getUserById(String id) {
        return Optional.ofNullable(userRegistry.get(id));
    }

    public List<User> getAllUsers() {
        return Collections.unmodifiableList(new ArrayList<>(userRegistry.values()));
    }

    public List<Course> getAllCourses() {
        return Collections.unmodifiableList(new ArrayList<>(courseRegistry.values()));
    }

    public List<Team> getAllTeams() {
        return Collections.unmodifiableList(new ArrayList<>(teamRegistry.values()));
    }

    public List<DigitalCertificate> getIssuedCertificates() {
        return Collections.unmodifiableList(issuedCertificates);
    }
}
